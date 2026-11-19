
import { personalities } from './personalities'

// Each answer points to the personality that best represents that behaviour.
// The order of these rows matches the 20 questions in App.jsx.
// The order inside each row is A, B, C, D.

const answerMatches = [
  ['spicy-tuna', 'unagi', 'tamago', 'spicy-salmon'],
  ['extra-spicy-curry', 'bicep-sushi', 'plain-white-rice', 'dorayaki'],
  ['avocado-maki', 'unagi', 'takoyaki', 'ramen'],
  ['karaage', 'spicy-tuna', 'unagi', 'plain-white-rice'],
  ['california-roll', 'unagi', 'katsu-curry', 'matcha-tiramisu'],
  ['california-roll', 'spicy-salmon', 'avocado-maki', 'dynamite-roll'],
  ['tamago', 'karaage', 'katsu-curry', 'unagi'],
  ['takoyaki', 'plain-white-rice', 'katsu-curry', 'california-roll'],
  ['dorayaki', 'salmon-nigiri', 'plain-white-rice', 'ramen'],
  ['tamago', 'karaage', 'avocado-maki', 'mochi'],
  ['mochi', 'ramen', 'salmon-nigiri', 'karaage'],
  ['bicep-sushi', 'avocado-maki', 'matcha-latte', 'shrimp-tempura'],
  ['matcha-latte', 'takoyaki', 'pickled-ginger', 'matcha-tiramisu'],
  ['bicep-sushi', 'katsu-curry', 'extra-spicy-curry', 'tamago'],
  ['bicep-sushi', 'extra-spicy-curry', 'matcha-tiramisu', 'plain-white-rice'],
  ['plain-white-rice', 'salmon-nigiri', 'matcha-tiramisu', 'spicy-tuna'],
  ['avocado-maki', 'dynamite-roll', 'pickled-ginger', 'wasabi'],
  ['unagi', 'shrimp-tempura', 'tamago', 'pickled-ginger'],
  ['shrimp-tempura', 'avocado-maki', 'mochi', 'spicy-tuna'],
  ['salmon-nigiri', 'avocado-maki', 'takoyaki', 'karaage']
]

// Count how often each personality appears in the answer map.
const matchFrequency = {}

answerMatches.flat().forEach((personalityId) => {
  matchFrequency[personalityId] =
    (matchFrequency[personalityId] || 0) + 1
})

// Main quiz scoring function.
export function calculateResult(answers) {
  const scores = {}
  const directMatches = {}
  const firstMatchOrder = {}

  answerMatches.forEach((matches, questionIndex) => {
    const selectedAnswer = answers[questionIndex]

    if (
      !selectedAnswer ||
      !Number.isInteger(selectedAnswer.answerIndex) ||
      selectedAnswer.answerIndex < 0 ||
      selectedAnswer.answerIndex > 3
    ) {
      return
    }

    const personalityId = matches[selectedAnswer.answerIndex]
    const frequency = matchFrequency[personalityId] || 1

    // Frequency adjustment prevents common personalities from dominating.
    const adjustedPoints = 1 / Math.pow(frequency, 0.6)

    scores[personalityId] =
      (scores[personalityId] || 0) + adjustedPoints

    directMatches[personalityId] =
      (directMatches[personalityId] || 0) + 1

    if (firstMatchOrder[personalityId] === undefined) {
      firstMatchOrder[personalityId] = questionIndex
    }
  })

  const winningPersonalityId = Object.keys(scores).sort((a, b) => {
    // First: highest adjusted score.
    const scoreDifference = scores[b] - scores[a]

    if (Math.abs(scoreDifference) > 0.000001) {
      return scoreDifference
    }

    // Second: most direct answer matches.
    const matchDifference =
      (directMatches[b] || 0) - (directMatches[a] || 0)

    if (matchDifference !== 0) {
      return matchDifference
    }

    // Third: whichever personality received a match first.
    return firstMatchOrder[a] - firstMatchOrder[b]
  })[0]

  const result = personalities.find(
    (personality) => personality.id === winningPersonalityId
  )

  // Safe fallback only if no valid answers were supplied.
  return result || personalities[0]
}

// --------------------------------------------------
// TEMPORARY DEVELOPMENT TEST
// Run 10,000 random quiz combinations.
// This does NOT change the actual scoring algorithm.
// --------------------------------------------------

if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.runSushiSimulation = (iterations = 10000) => {
    const counts = {}

    for (let i = 0; i < iterations; i++) {
      const randomAnswers = {}

      for (let question = 0; question < 20; question++) {
        randomAnswers[question] = {
          answerIndex: Math.floor(Math.random() * 4)
        }
      }

      const result = calculateResult(randomAnswers)

      if (result) {
        counts[result.id] = (counts[result.id] || 0) + 1
      }
    }

    const report = personalities.map((personality) => ({
      personality: personality.id,
      wins: counts[personality.id] || 0,
      percentage:
        ((counts[personality.id] || 0) / iterations * 100).toFixed(2) + '%'
    }))

    console.table(report)

    return report
  }
}
