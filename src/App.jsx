
import { useState } from 'react'
import './App.css'
import { calculateResult } from './data/scoring'
import ResultCard from './components/ResultCard'

const sushi = [
  '🍣', '🍙', '🍤', '🍥', '🍱', '🥢',
  '🍣', '🍙', '🍤', '🍥', '🍣'
]

const questions = [
  {
    question: 'Your friend wants to quit their job tomorrow with no savings and no backup plan. Your reaction?',
    answers: [
      '"DO IT." Life is too short. We’ll figure it out afterwards.',
      '“Have you calculated your savings, notice period and monthly expenses?”',
      '“Wait, are you actually happy? What’s been happening? We need to talk.”',
      "I've done something similar. It was a disaster. Anyway, here's my story."
    ]
  },
  {
    question: 'You’re given a completely free afternoon. No responsibilities, no plans. What happens?',
    answers: [
      'I spontaneously book something. Staying home is becoming suspicious.',
      'I finally get around to the 17 things on my to-do list.',
      'I do absolutely nothing. I refuse to turn leisure into unpaid employment.',
      'I start researching something random and suddenly it’s 6 PM.'
    ]
  },
  {
    question: 'You have to make a big decision. What’s your biggest obstacle?',
    answers: [
      'I keep imagining every possible outcome, including ones that have never happened.',
      'I already know what I want. I just need to commit and execute.',
      'I keep changing my mind because another possibility sounds exciting.',
      'I know what I want, but my feelings are making the situation unnecessarily complicated.'
    ]
  },
  {
    question: 'You miss a train and the next one is in an hour.',
    answers: [
      'Find an alternative route. I refuse to let public transport defeat me.',
      "Excellent. An unexpected adventure. Let's see where this goes.",
      "I'm annoyed. I planned my day around this.",
      'Find somewhere comfortable, get a snack and accept my new temporary residence.'
    ]
  },
  {
    question: 'You’re hosting dinner with eight people who don’t know each other.',
    answers: [
      "I'll make sure everyone gets along. I can read the room.",
      "I'll organise the reservation, timings and logistics. Someone has to be competent.",
      "I'll make it an unforgettable evening. Nobody is leaving without a story.",
      "I'll find somewhere with exceptional food. I'm not compromising on quality."
    ]
  },
  {
    question: 'Someone makes a joke at your expense in front of everyone.',
    answers: [
      'Laugh along. No need to make things awkward.',
      'Give them a look that makes them reconsider their entire existence.',
      'Laugh, but remember it for the next 14 business days.',
      'Make an even better joke about them. Obviously.'
    ]
  },
  {
    question: 'Your friend asks you to help them move house on your only free weekend.',
    answers: [
      "Of course. I'll bring snacks and help them unpack too.",
      'Depends. Did they ask nicely, and do they understand that my time is valuable?',
      'Absolutely. But I am choosing the music and controlling the entire operation.',
      "I'll help, but I'm already mentally calculating how long this is going to take."
    ]
  },
  {
    question: 'You’re at a party and someone asks, “So, what do you do?”',
    answers: [
      'Tell them about my work, my side projects and the three hobbies I’m currently obsessed with.',
      "Give a simple answer. I don't need to turn my existence into a TED Talk.",
      'Somehow turn the conversation into a discussion about my latest achievement.',
      'Ask them about themselves. People are generally more interesting when they talk.'
    ]
  },
  {
    question: 'You find an old photograph of someone you haven’t seen in years.',
    answers: [
      'I remember exactly how that period felt. I miss those days.',
      'I wonder what they’re doing now and whether we could reconnect.',
      'I look at it, smile and move on. The past is the past.',
      'I start wondering why I still feel something about it. Great, another emotional investigation.'
    ]
  },
  {
    question: 'Someone you love is upset but refuses to explain why.',
    answers: [
      "Give them space, but make sure they know I'm there.",
      'Ask directly. I cannot work with mysterious emotional puzzles.',
      'Start imagining all the possible reasons. Did I do something? Are they okay?',
      'Try to cheer them up with food, affection and questionable jokes.'
    ]
  },
  {
    question: 'Which situation would hurt you the most?',
    answers: [
      'Someone making you feel like you’re easy to replace.',
      'Someone repeatedly misunderstanding your intentions.',
      'Someone being emotionally inconsistent after making promises.',
      'Someone treating your kindness as an unlimited subscription.'
    ]
  },
  {
    question: 'You get rejected from something you really wanted.',
    answers: [
      "I'll be disappointed, but I'll work harder and come back better.",
      'I take it personally. I need to know exactly why.',
      'I immediately start considering a completely different direction.',
      'I act unbothered. Privately, I may be having a small emotional earthquake.'
    ]
  },
  {
    question: 'You suddenly become very interested in something new. What’s your approach?',
    answers: [
      'Research it thoroughly, buy the equipment and create a routine.',
      'Buy everything immediately. I have no intention of being underprepared for my new obsession.',
      "Try it, get bored, discover something else and repeat. It's called range.",
      'Find the most beautiful version of it. If I’m doing this, it needs to look good.'
    ]
  },
  {
    question: 'What would make you feel most successful in life?',
    answers: [
      "Being exceptionally good at something I've worked hard to master.",
      "Being recognised and admired for what I've achieved.",
      'Having freedom, exciting experiences and stories worth telling.',
      'Having a peaceful life, meaningful relationships and enough money to enjoy it.'
    ]
  },
  {
    question: 'You have to choose one lifestyle permanently.',
    answers: [
      'A structured routine, ambitious goals and measurable progress.',
      'A life full of travel, surprises and spontaneous decisions.',
      'Beautiful surroundings, good food and a carefully curated lifestyle.',
      'A simple life with minimal responsibilities and maximum peace.'
    ]
  },
  {
    question: 'Your friends describe your spending habits as…',
    answers: [
      'Strategic. I know where my money goes.',
      'Emotionally motivated. Sometimes retail therapy is cheaper than therapy.',
      "Selective. I don't mind spending more if the quality is worth it.",
      'Reckless. But I prefer the word adventurous.'
    ]
  },
  {
    question: 'You’ve had an embarrassing public moment. What happens afterwards?',
    answers: [
      'I replay it repeatedly and wonder whether everyone remembers.',
      'I laugh about it. If anything, it makes a great story.',
      'I pretend it never happened. New identity, who dis?',
      'I get annoyed because people probably misunderstood what I was trying to do.'
    ]
  },
  {
    question: 'When life gets overwhelming, your instinct is to…',
    answers: [
      'Organise everything. If I can control my environment, I can control my life.',
      'Disappear for a while. Please respect the witness protection programme.',
      'Find someone to talk to. I need to get all these feelings out.',
      'Start something completely new. A fresh chapter will definitely solve everything.'
    ]
  },
  {
    question: 'What’s something people often get wrong about you?',
    answers: [
      "They think I'm cold, but I'm actually much more sensitive than I let on.",
      "They think I'm quiet, but I'm constantly observing everything.",
      'They think I’m confident, but I sometimes need reassurance too.',
      'They think I’m chaotic, but I know exactly what I’m doing. Mostly.'
    ]
  },
  {
    question: 'If you could eliminate one recurring problem from your life, what would it be?',
    answers: [
      'Getting emotionally attached to people and situations that don’t deserve it.',
      'My brain treating every minor event like an international investigation.',
      'My inability to stick to one plan, hobby or personal identity.',
      'Having to deal with people who lack common sense, standards or basic consideration.'
    ]
  }
]

function App() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState(null)

  function chooseAnswer(answerIndex) {
    const updatedAnswers = [...answers]

    updatedAnswers[currentQuestion] = {
      questionIndex: currentQuestion,
      answerIndex,
      answer: questions[currentQuestion].answers[answerIndex]
    }

    setAnswers(updatedAnswers)
  }

  function nextQuestion() {
    if (!answers[currentQuestion]) return

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const calculatedResult = calculateResult(answers)
      setResult(calculatedResult)
      setFinished(true)
    }
  }

  function restartQuiz() {
    setStarted(false)
    setCurrentQuestion(0)
    setAnswers([])
    setFinished(false)
    setResult(null)
  }

  return (
    <main className={`landing-page ${started ? 'quiz-mode' : ''}`}>
      {!started && (
        <div className="floating-sushi" aria-hidden="true">
          {sushi.map((item, index) => (
            <span key={index} className={`sushi sushi-${index + 1}`}>
              {item}
            </span>
          ))}
        </div>
      )}

      <nav className="navbar">
        <div className="brand">🍣 THE SUSHI TEST</div>
        <span className="edition">PERSONALITY CLASSIFIER v1.0</span>
      </nav>

      {!started ? (
        <section className="hero">
          <div className="eyebrow">
            <span className="status-dot"></span>
            22 PERSONALITIES · 9 REAL · 13 IMPOSTORS
          </div>

          <h1>
            THINK YOU'RE
            <span className="sushi-word"> SUSHI?</span>
            <br />
            <span className="prove-word">PROVE IT.</span>
          </h1>

          <p className="intro">
            Answer a few questionable questions.
            Discover your true food identity.
            Prepare to be exposed.
          </p>

          <button
            className="start-button"
            type="button"
            onClick={() => setStarted(true)}
          >
            TAKE THE TEST <span>→</span>
          </button>

          <p className="disclaimer">
            NO PRESSURE. YOUR RESULT MIGHT BE EMBARRASSING.
          </p>
        </section>
      ) : (
        <section className="quiz-panel">
          {!finished ? (
            <>
              <div className="quiz-topline">
                <span>THE SUSHI TEST</span>
                <span>
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`
                  }}
                />
              </div>

              <p className="question-number">
                QUESTION {String(currentQuestion + 1).padStart(2, '0')}
              </p>

              <h2>{questions[currentQuestion].question}</h2>

              <div className="answer-list">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`answer-option ${
                      answers[currentQuestion]?.answerIndex === index
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => chooseAnswer(index)}
                  >
                    <span className="answer-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {answer}
                  </button>
                ))}
              </div>

              <div className="quiz-actions">
                <button
                  className="back-button"
                  type="button"
                  onClick={() => {
                    if (currentQuestion === 0) {
                      setStarted(false)
                    } else {
                      setCurrentQuestion(currentQuestion - 1)
                    }
                  }}
                >
                  ← BACK
                </button>

                <button
                  className="start-button"
                  type="button"
                  disabled={!answers[currentQuestion]}
                  onClick={nextQuestion}
                >
                  {currentQuestion === questions.length - 1
                    ? 'FINISH TEST'
                    : 'NEXT QUESTION →'}
                </button>
              </div>
            </>
          ) : (
            result && (
              <ResultCard
                result={result}
                onPlayAgain={restartQuiz}
              />
            )
          )}
        </section>
      )}

      <footer>
        <span>THE SUSHI TEST © 2026</span>
        <span>IDENTITY IS A SPECTRUM. SUSHI IS NOT.</span>
      </footer>
    </main>
  )
}

export default App
