
import { useState } from 'react'
import './ResultCard.css'

export default function ResultCard({ result, onPlayAgain }) {
  const [sharing, setSharing] = useState(false)
  const [copied, setCopied] = useState(false)

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
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
      return true
    } catch (error) {
      console.error('Could not copy caption:', error)
      alert('Please copy the caption manually.')
      return false
    }
  }

  // Open the phone's native sharing menu.
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
        alert(
          'Your result card has been downloaded. ' +
          'Your caption is ready to copy!'
        )
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Sharing failed:', error)
        alert(
          'Sharing is unavailable. ' +
          'Please download your card and copy your caption.'
        )
      }
    } finally {
      setSharing(false)
    }
  }

  // Prepare the image and caption for a social media upload.
  const prepareSocialPost = async (platform) => {
    downloadCard()
    await copyCaption()

    alert(
      `Your Sushi Mate card is ready for ${platform}! 🍣\n\n` +
      '1. Open ' + platform + '.\n' +
      '2. Create a new post or story.\n' +
      '3. Upload your downloaded Sushi Mate card.\n' +
      '4. Paste your copied caption.\n\n' +
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
