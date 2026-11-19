
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { personalities } from './data/personalities'

const REACTIONS = ['🍣', '🔥', '💀']

async function getVisitorId() {
  const { data, error } = await supabase.auth.getSession()

  if (error) throw error

  if (data.session) return data.session.user.id

  const { data: authData, error: authError } =
    await supabase.auth.signInAnonymously()

  if (authError) throw authError

  return authData.user.id
}

function SushiConfessions({ personalityId }) {
  const [comment, setComment] = useState('')
  const [visitorId, setVisitorId] = useState(null)
  const [confessions, setConfessions] = useState([])
  const [reactions, setReactions] = useState([])
  const [replies, setReplies] = useState([])
  const [expandedReplies, setExpandedReplies] = useState({})
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyDrafts, setReplyDrafts] = useState({})
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [postingReply, setPostingReply] = useState(null)
  const [activeTab, setActiveTab] = useState('community')
  const [message, setMessage] = useState('')

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  const personality = personalities.find(
    (item) => item.id === personalityId
  )

  function getPersonality(id) {
    return personalities.find((item) => item.id === id)
  }

  async function loadReplies(confessionIds) {
    if (confessionIds.length === 0) {
      setReplies([])
      return
    }

    const { data, error } = await supabase
      .from('sushi_replies')
      .select('id, confession_id, personality_id, comment, visitor_id, created_at')
      .in('confession_id', confessionIds)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Could not load replies:', error)
      return
    }

    setReplies(data || [])
  }

  async function loadConfessions() {
    const { data, error } = await supabase
      .from('sushi_confessions')
      .select('id, personality_id, comment, visitor_id, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Could not load confessions:', error)
      setMessage('Could not load the community feed.')
      setLoading(false)
      return
    }

    const confessionData = data || []
    setConfessions(confessionData)

    const { data: reactionData, error: reactionError } = await supabase
      .from('sushi_reactions')
      .select('confession_id, visitor_id, reaction')

    if (reactionError) {
      console.error('Could not load reactions:', reactionError)
    } else {
      setReactions(reactionData || [])
    }

    await loadReplies(confessionData.map((item) => item.id))
    setLoading(false)
  }

  // Initialise visitor and restore admin status after refresh
  useEffect(() => {
    async function initialize() {
      try {
        const id = await getVisitorId()
        setVisitorId(id)

        const { data: adminCheck, error: adminError } =
          await supabase.rpc('is_sushi_admin')

        if (!adminError && adminCheck === true) {
          setIsAdmin(true)
          setAdminLoggedIn(true)
        }
      } catch (error) {
        console.error('Authentication failed:', error)
      }
    }

    initialize()
    loadConfessions()
  }, [])

  // Admin login
  async function adminLogin(event) {
    event.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    })

    if (error) {
      setMessage('Admin login failed. Check your email and password.')
      return
    }

    const { data: adminCheck, error: adminError } =
      await supabase.rpc('is_sushi_admin')

    if (adminError || adminCheck !== true) {
      await supabase.auth.signOut()
      setIsAdmin(false)
      setAdminLoggedIn(false)
      setMessage('This account does not have admin permissions.')
      return
    }

    setVisitorId(data.user.id)
    setIsAdmin(true)
    setAdminLoggedIn(true)
    setShowAdminLogin(false)
    setAdminPassword('')
    setMessage('ADMIN ACCESS GRANTED 🍣')
  }

  // Admin logout
  async function adminLogout() {
    await supabase.auth.signOut()

    setIsAdmin(false)
    setAdminLoggedIn(false)
    setShowAdminLogin(false)
    setVisitorId(null)
    setMessage('Admin logged out.')

    try {
      const id = await getVisitorId()
      setVisitorId(id)
    } catch (error) {
      console.error('Visitor session could not be restored:', error)
    }
  }

  async function postConfession(event) {
    event.preventDefault()

    if (!comment.trim() || posting || !visitorId) return

    setPosting(true)
    setMessage('')

    const { error } = await supabase
      .from('sushi_confessions')
      .insert({
        personality_id: personalityId,
        comment: comment.trim(),
        visitor_id: visitorId
      })

    if (error) {
      console.error('Could not post confession:', error)
      setMessage('Transmission failed. Try again.')
    } else {
      setComment('')
      setMessage('Transmission received! 🍣')
      await loadConfessions()
    }

    setPosting(false)
  }

  async function deleteConfession(confessionId) {
    const confirmed = window.confirm(
      'Delete this confession permanently?'
    )

    if (!confirmed) return

    let deleteQuery = supabase
      .from('sushi_confessions')
      .delete()
      .eq('id', confessionId)

    if (!isAdmin) {
      deleteQuery = deleteQuery.eq('visitor_id', visitorId)
    }

    const { error } = await deleteQuery

    if (error) {
      console.error('Could not delete confession:', error)
      setMessage('Deletion failed. Please try again.')
      return
    }

    setConfessions((previous) =>
      previous.filter((item) => item.id !== confessionId)
    )

    setReplies((previous) =>
      previous.filter((reply) => reply.confession_id !== confessionId)
    )

    setReactions((previous) =>
      previous.filter((reaction) => reaction.confession_id !== confessionId)
    )

    setMessage('Confession deleted successfully.')
  }

  async function addReaction(confessionId, reaction) {
    const alreadyReacted = reactions.some(
      (item) =>
        item.confession_id === confessionId &&
        item.visitor_id === visitorId &&
        item.reaction === reaction
    )

    if (alreadyReacted) return

    const { error } = await supabase
      .from('sushi_reactions')
      .insert({
        confession_id: confessionId,
        visitor_id: visitorId,
        reaction
      })

    if (error) {
      console.error('Could not add reaction:', error)
      return
    }

    setReactions((previous) => [
      ...previous,
      { confession_id: confessionId, visitor_id: visitorId, reaction }
    ])
  }

  async function deleteReply(replyId) {
    const confirmed = window.confirm(
      'Delete this reply permanently?'
    )

    if (!confirmed) return

    let deleteQuery = supabase
      .from('sushi_replies')
      .delete()
      .eq('id', replyId)

    if (!isAdmin) {
      deleteQuery = deleteQuery.eq('visitor_id', visitorId)
    }

    const { error } = await deleteQuery

    if (error) {
      console.error('Could not delete reply:', error)
      setMessage('Reply deletion failed. Please try again.')
      return
    }

    setReplies((previous) =>
      previous.filter((reply) => reply.id !== replyId)
    )

    setMessage('Reply deleted successfully.')
  }

  function toggleReplies(confessionId) {
    setExpandedReplies((previous) => ({
      ...previous,
      [confessionId]: !previous[confessionId]
    }))
  }

  async function postReply(event, confessionId) {
    event.preventDefault()

    const replyText = (replyDrafts[confessionId] || '').trim()

    if (!replyText || postingReply || !visitorId) return

    setPostingReply(confessionId)

    const { error } = await supabase
      .from('sushi_replies')
      .insert({
        confession_id: confessionId,
        personality_id: personalityId,
        comment: replyText,
        visitor_id: visitorId
      })

    if (error) {
      console.error('Could not post reply:', error)
      setMessage('Reply failed to send. Try again.')
    } else {
      setReplyDrafts((previous) => ({
        ...previous,
        [confessionId]: ''
      }))

      await loadReplies([confessionId])

      setExpandedReplies((previous) => ({
        ...previous,
        [confessionId]: true
      }))
    }

    setPostingReply(null)
  }

  const visibleConfessions = activeTab === 'mine'
    ? confessions.filter((item) => item.visitor_id === visitorId)
    : confessions

  return (
    <section className="sushi-confessions">

      <div className="confessions-heading">
        <span>/// NEON DISTRICT · CHANNEL 07</span>
        <h2>SUSHI AFTER DARK</h2>
        <p>The rice is cooked. The opinions are raw.</p>
      </div>

      <div className="confessions-compose">
        <div className="confessions-label">
          🍣 ANONYMOUS TRANSMISSION
        </div>

        <p>
          Posting as {personality?.emoji} {personality?.name || 'Unknown Sushi'}
        </p>

        <form className="confessions-form" onSubmit={postConfession}>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Hot take: California rolls are..."
            maxLength={300}
          />

          <div className="confessions-footer">
            <span>{comment.length}/300</span>

            <button type="submit" disabled={!comment.trim() || posting}>
              {posting ? 'TRANSMITTING...' : 'TRANSMIT ↗'}
            </button>
          </div>
        </form>

        {message && <p className="confessions-message">{message}</p>}
      </div>

      <div className="confessions-tabs">
        <button
          type="button"
          className={activeTab === 'community' ? 'active' : ''}
          onClick={() => setActiveTab('community')}
        >
          COMMUNITY FEED
        </button>

        <button
          type="button"
          className={activeTab === 'mine' ? 'active' : ''}
          onClick={() => setActiveTab('mine')}
        >
          MY CONFESSIONS
        </button>
      </div>

      <div className="confessions-feed">
        {loading ? (
          <p>Loading transmissions...</p>
        ) : visibleConfessions.length === 0 ? (
          <p>
            {activeTab === 'mine'
              ? 'No confessions from you yet. Break the silence.'
              : 'The channel is suspiciously quiet. Be the first to confess.'}
          </p>
        ) : (
          visibleConfessions.map((item) => {
            const author = getPersonality(item.personality_id)

            const confessionReplies = replies.filter(
              (reply) => reply.confession_id === item.id
            )

            const isExpanded = expandedReplies[item.id]
            const draft = replyDrafts[item.id] || ''

            return (
              <article className="confession-post" key={item.id}>
                <div className="confession-author">
                  <span>
                    {author?.emoji || '🍣'} {author?.name || 'Mystery Sushi'}
                  </span>
                  <span>ANONYMOUS</span>
                </div>

                {(isAdmin || item.visitor_id === visitorId) && (
                  <button
                    type="button"
                    className="delete-confession-button"
                    onClick={() => deleteConfession(item.id)}
                  >
                    DELETE ✕
                  </button>
                )}

                <p>{item.comment}</p>

                <div className="confession-reactions">
                  {REACTIONS.map((reaction) => {
                    const count = reactions.filter(
                      (entry) =>
                        entry.confession_id === item.id &&
                        entry.reaction === reaction
                    ).length

                    const selected = reactions.some(
                      (entry) =>
                        entry.confession_id === item.id &&
                        entry.visitor_id === visitorId &&
                        entry.reaction === reaction
                    )

                    return (
                      <button
                        type="button"
                        key={reaction}
                        className={selected ? 'reacted' : ''}
                        onClick={() => addReaction(item.id, reaction)}
                        disabled={selected}
                      >
                        {reaction} {count}
                      </button>
                    )
                  })}

                  <button
                    type="button"
                    className="reply-toggle"
                    onClick={() => toggleReplies(item.id)}
                  >
                    ↳ {confessionReplies.length} REPLIES
                  </button>
                </div>

                {isExpanded && (
                  <div className="confession-reply-section">
                    <div className="reply-heading">
                      /// THE CONVERSATION
                    </div>

                    {confessionReplies.length === 0 ? (
                      <p className="no-replies">
                        No replies yet. Be the first to join in.
                      </p>
                    ) : (
                      confessionReplies.map((reply) => {
                        const replyAuthor = getPersonality(
                          reply.personality_id
                        )

                        return (
                          <div className="confession-reply" key={reply.id}>
                            <div className="reply-author">
                              {replyAuthor?.emoji || '🍣'}{' '}
                              {replyAuthor?.name || 'Mystery Sushi'}
                              <span>ANONYMOUS</span>
                            </div>

                            {(isAdmin || reply.visitor_id === visitorId) && (
                              <button
                                type="button"
                                className="delete-confession-button"
                                onClick={() => deleteReply(reply.id)}
                              >
                                DELETE ✕
                              </button>
                            )}

                            <p>{reply.comment}</p>
                          </div>
                        )
                      })
                    )}

                    {replyingTo === item.id ? (
                      <form
                        className="confession-reply-form"
                        onSubmit={(event) => postReply(event, item.id)}
                      >
                        <textarea
                          value={draft}
                          onChange={(event) =>
                            setReplyDrafts((previous) => ({
                              ...previous,
                              [item.id]: event.target.value
                            }))
                          }
                          placeholder="Add something to the conversation..."
                          maxLength={300}
                          autoFocus
                        />

                        <div className="reply-form-footer">
                          <span>{draft.length}/300</span>

                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                          >
                            CANCEL
                          </button>

                          <button
                            type="submit"
                            disabled={!draft.trim() || postingReply === item.id}
                          >
                            {postingReply === item.id
                              ? 'SENDING...'
                              : 'SEND REPLY ↗'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        type="button"
                        className="write-reply-button"
                        onClick={() => setReplyingTo(item.id)}
                      >
                        ＋ REPLY TO THIS TAKE
                      </button>
                    )}
                  </div>
                )}
              </article>
            )
          })
        )}
      </div>

      {/* Admin controls: moved to the bottom of the section */}
      <div className="admin-access">
        {adminLoggedIn ? (
          <div className="admin-status">
            <span>🔐 ADMIN ACTIVE</span>
            <button type="button" onClick={adminLogout}>
              LOG OUT
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="admin-key-button"
              onClick={() => setShowAdminLogin((previous) => !previous)}
              title="Admin access"
            >
              🔑
            </button>

            {showAdminLogin && (
              <form
                onSubmit={adminLogin}
                className="admin-login-panel"
              >
                <input
                  type="email"
                  placeholder="Admin email"
                  value={adminEmail}
                  onChange={(event) => setAdminEmail(event.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  required
                />

                <button type="submit">LOGIN</button>
              </form>
            )}
          </>
        )}
      </div>

    </section>
  )
}

export default SushiConfessions
