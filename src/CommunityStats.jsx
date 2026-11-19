
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { personalities } from './data/personalities'

function CommunityStats() {
  const [stats, setStats] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const { data, error } = await supabase.rpc('get_quiz_stats')

      if (error) {
        console.error('Could not load community stats:', error)
        setLoading(false)
        return
      }

      setStats(data || [])
      setTotal(data?.[0]?.total_quizzes || 0)
      setLoading(false)
    }

    loadStats()
  }, [])

  if (loading) {
    return <p>Loading community statistics...</p>
  }

  const rankedPersonalities = personalities
    .map((personality) => {
      const match = stats.find(
        (item) => item.personality_id === personality.id
      )

      return {
        ...personality,
        count: match?.result_count || 0
      }
    })
    .sort((a, b) => b.count - a.count)

  return (
    <section className="community-stats">
      <div className="community-stats-heading">
        <span>🍣 THE COMMUNITY</span>
        <h2>YOUR FELLOW SUSHI CITIZENS.</h2>
        <p>Which sushi personality are we really?</p>
      </div>

      <div className="community-total">
        <strong>{total.toLocaleString()}</strong>
        <span>QUIZZES COMPLETED</span>
      </div>

      <div className="community-ranking">
        {rankedPersonalities.map((personality) => {
          const percentage = total > 0
            ? (personality.count / total) * 100
            : 0

          return (
            <div className="community-row" key={personality.id}>
              <div className="community-row-info">
                <span>
                  {personality.emoji} {personality.name}
                </span>
                <span>
                  {personality.count} · {percentage.toFixed(1)}%
                </span>
              </div>

              <div className="community-bar">
                <div
                  className="community-bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CommunityStats
