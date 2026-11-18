
import { personalities } from './personalities'

// Each answer points to the personality that best represents that behaviour.
// The order of these rows matches the 20 questions in App.jsx.
// The order inside each row is A, B, C, D.

const answerMatches = [
  ['spicy-tuna', 'unagi', 'tamago', 'spicy-salmon'],
  ['extra-spicy-curry', 'bicep-sushi', 'plain-white-rice', 'takoyaki'],
  ['avocado-maki', 'unagi', 'takoyaki', 'ramen'],
  ['karaage', 'spicy-tuna', 'unagi', 'plain-white-rice'],
  ['california-roll', 'unagi', 'katsu-curry', 'matcha-tiramisu'],
  ['california-roll', 'spicy-salmon', 'avocado-maki', 'dynamite-roll'],
  ['tamago', 'karaage', 'katsu-curry', 'unagi'],
  ['takoyaki', 'plain-white-rice', 'katsu-curry', 'california-roll'],
  ['dorayaki', 'salmon-nigiri', 'plain-white-rice', 'ramen'],
  ['tamago', 'karaage', 'avocado-maki', 'mochi'],
  ['mochi', 'ramen', 'salmon-nigiri', 'karaage'],
  ['bicep-sushi', 'avocado-maki', 'pickled-ginger', 'shrimp-tempura'],
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
// This lets us compensate for personalities that have more opportunities
// to receive points than others.
const matchFrequency = {}

answerMatches.flat().forEach((personalityId) => {
  matchFrequency[personalityId] =
    (matchFrequency[personalityId] || 0) + 1
})

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
console.log(
  'ANSWER INDEXES:',
  answers.map((answer) => answer?.answerIndex)
)
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
console.log('SUSHI SCORES:', scores)
console.log('WINNER ID:', winningPersonalityId)

  const result = personalities.find(
    (personality) => personality.id === winningPersonalityId
  )

  // Safe fallback only if no valid answers were supplied.
  return result || personalities[0]
}
