import { useRef, useState } from 'react'
import './ResultCard.css'

export default function ResultCard({ result, onPlayAgain }) {
  const [sharing, setSharing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showManualCopy, setShowManualCopy] = useState(false)

  const captionRef = useRef(null)

  if (!result) return null

  const personality = result
  const cardImage = `/characters/${personality.id}.png`

  const shareText = [
    `🍣 I'm ${personality.name} — ${personality.title}!`,
    '',
    personality.vibe,
    '',
    personality.motto
      ? `My life motto: "${personality.motto}"`
      : '',
    '',
    "Now it's your turn! 👀",
    'Find your Sushi Mate and discover your food identity.',
    window.location.href
  ].filter(Boolean).join('\n')

  const downloadCard = () => {
    const link = document.createElement('a')
    link.href = cardImage
    link.download = `sushi-mate-${personality.id}.png`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const copyCaption = async () => {
    setCopied(false)

    // First try the modern clipboard API.
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setShowManualCopy(false)

        setTimeout(() => setCopied(false), 2500)
        return true
      }
    } catch (error) {
      console.warn('Modern clipboard unavailable:', error)
    }

    // If Safari blocks automatic copying, show the actual caption.
    setShowManualCopy(true)

    return false
  }

  const selectCaption = () => {
    if (captionRef.current) {
      captionRef.current.focus()
      captionRef.current.select()
      captionRef.current.setSelectionRange(0, shareText.length)
    }
  }

  const shareCard = async () => {
    setSharing(true)

    try {
      const response = await fetch(cardImage)

      if (!response.ok) {
        throw new Error('Could not load personality card')
      }

      const blob = await response.blob()
      const file = new File(
        [blob],
        `sushi-mate-${personality.id}.png`,
        { type: 'image/png' }
      )

      if (
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          title: `My Sushi Mate is ${personality.name}!`,
          text: shareText,
          files: [file]
        })
      } else if (navigator.share) {
        await navigator.share({
          title: `My Sushi Mate is ${personality.name}!`,
          text: shareText
        })
      } else {
        downloadCard()
        await copyCaption()
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Sharing failed:', error)
        downloadCard()
        await copyCaption()
      }
    } finally {
      setSharing(false)
    }
  }

  const prepareSocialPost = async (platform) => {
    downloadCard()
    await copyCaption()

    alert(
      `Your Sushi Mate card is ready for ${platform}! 🍣\n\n` +
      '1. Open ' + platform + '.\n' +
      '2. Create a new post or story.\n' +
      '3. Upload your downloaded Sushi Mate card.\n' +
      '4. Copy the caption shown below the result card.\n\n' +
      'Show everyone which sushi you are!'
    )
  }

  return (
    <main className="result-page">
      <div className="result-heading">
        <p className="result-kicker">YOUR RESULTS ARE IN</p>
        <h2>YOUR SUSHI MATE</h2>
        <p>Well, this is interesting...</p>
      </div>

      <div className="result-card-frame">
        <img
          className="finished-personality-card"
          src={cardImage}
          alt={`${personality.name} personality card`}
          onError={() =>
            console.error('Missing personality image:', cardImage)
          }
        />
      </div>

      <div className="result-actions">

        <button
          className="result-share-button"
          onClick={shareCard}
          disabled={sharing}
        >
          {sharing ? 'PREPARING...' : '↗ SHARE MY RESULT'}
        </button>

        <button
          className="result-download-button"
          onClick={downloadCard}
        >
          ↓ DOWNLOAD MY CARD
        </button>

        <button
          className="result-caption-button"
          onClick={copyCaption}
        >
          {copied ? '✓ CAPTION COPIED!' : 'COPY MY SHARE CAPTION'}
        </button>

        {showManualCopy && (
          <div
            className="manual-caption-box"
            style={{
              marginTop: '15px',
              padding: '16px',
              border: '1px solid #ff79b7',
              borderRadius: '8px',
              background: '#160d30',
              color: '#fff0dc',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <h3 style={{ color: '#ff9bc9', marginTop: 0 }}>
              Your caption is ready! 🍣
            </h3>

            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
              Automatic copying isn't available in this browser.
              Tap the text below, select all, and choose Copy.
            </p>

            <textarea
              ref={captionRef}
              readOnly
              value={shareText}
              onFocus={(event) => event.target.select()}
              onClick={selectCaption}
              rows={8}
              aria-label="Your Sushi Mate share caption"
              style={{
                display: 'block',
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px',
                border: '1px solid #ff79b7',
                borderRadius: '5px',
                background: '#090820',
                color: '#ffffff',
                fontSize: '14px',
                lineHeight: 1.6,
                resize: 'vertical',
                WebkitUserSelect: 'text',
                userSelect: 'text'
              }}
            />

            <button
              type="button"
              onClick={selectCaption}
              style={{
                marginTop: '12px',
                padding: '11px 18px',
                border: '1px solid #ff79b7',
                borderRadius: '5px',
                background: '#ff286b',
                color: 'white',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              SELECT CAPTION
            </button>
          </div>
        )}

        <div className="social-share-section">
          <p className="social-share-heading">
            SHOW OFF YOUR SUSHI IDENTITY
          </p>

          <button
            className="instagram-share-button"
            onClick={() => prepareSocialPost('Instagram')}
          >
            📸 PREPARE FOR INSTAGRAM
          </button>

          <button
            className="tiktok-share-button"
            onClick={() => prepareSocialPost('TikTok')}
          >
            ♪ PREPARE FOR TIKTOK
          </button>
        </div>

        <button
          className="result-restart-button"
          onClick={onPlayAgain}
        >
          ↻ TAKE THE TEST AGAIN
        </button>
      </div>
    </main>
  )
}