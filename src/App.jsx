import { useState } from 'react'
import './App.css'
import { calculateResult } from './data/scoring'
import ResultCard from './components/ResultCard'
import { supabase } from './supabase'
import CommunityStats from './CommunityStats'
import SushiConfessions from './SushiConfessions'

const questions = [
  {
    question: 'Your friend texts: "We need to talk." What’s your immediate reaction?',
    answers: [
      'Whatever happened, we’re booking a trip. I refuse to process emotional damage in my own postcode.',
      'Can you provide context, possible outcomes and an estimated duration? I need to know whether to cancel my afternoon.',
      'My stomach just dropped. I’ve apologised to people who haven’t even accused me of anything.',
      'Before you tell me yours, I need to tell you about the time this happened to me. It’s relevant. Probably.'
    ]
  },
  {
    question: 'You unexpectedly have an entire afternoon free. What happens?',
    answers: [
      'Book a spontaneous trip. My bank account says no, but my personality has already packed.',
      'Finally do all the things I’ve been avoiding. I love a productive afternoon almost as much as I love complaining about being busy.',
      'Cancel absolutely everything. I am unavailable for the foreseeable future. Please contact my duvet.',
      'Google one random question and end up knowing the tax laws of a country I’ve never visited.'
    ]
  },
  {
    question: 'You have to make a big life decision. How do you approach it?',
    answers: [
      'Make a pros and cons list, then question the list, then question why I’m questioning the list. Decision pending.',
      'Decide and execute. I don’t need a committee meeting with my own brain.',
      'Consider every possible life. I could move to Japan, become a baker or start a goat farm. All options remain open.',
      'My heart wants one thing, my head wants another, and my nervous system has called an emergency meeting.'
    ]
  },
  {
    question: 'You miss your train. What’s your reaction?',
    answers: [
      'Open the transport app and find another route. Deutsche Bahn may delay me, but it will not defeat my spreadsheet.',
      'Maybe this is fate. Maybe I’ll discover a new city. Maybe I’ll meet someone interesting. Maybe I’m just romanticising poor time management.',
      'I WAS THERE. I SAW THE TRAIN. I WATCHED THE DOORS CLOSE. This is now a personal matter.',
      'Find a bakery. If my plans are ruined, at least my blood sugar won’t be.'
    ]
  },
  {
    question: 'You’re hosting a dinner party. What’s your priority?',
    answers: [
      'Make sure everyone is comfortable. I can sense an awkward guest from three rooms away.',
      'Reservations, timings, dietary requirements, directions. If one person is late, I will be updating the imaginary project dashboard.',
      'I want this dinner referenced in future conversations. Ideally with the phrase, "Remember that night?"',
      'The food. I don’t care if everyone hates each other. At least they’ll remember the dessert.'
    ]
  },
  {
    question: 'Someone makes a joke at your expense in front of everyone.',
    answers: [
      'Laugh along. I’m secure enough to take a joke. This is not a legally binding statement.',
      'Give them a look so powerful they start reviewing their childhood decisions.',
      'Laugh now. Remember forever. Casually bring it up when they least expect it.',
      'Return fire immediately. I don’t start wars, but I do have excellent ammunition.'
    ]
  },
  {
    question: 'Your friend is moving house and asks for help.',
    answers: [
      'Bring snacks, help unpack and check everyone is okay. I’m a removal service with emotional intelligence.',
      'What’s the floor? Is there a lift? How many boxes? Why are we not hiring professionals?',
      'Take control of the music, organise everyone and somehow become the unpaid operations manager.',
      'Ask how long it’ll take. I need to know whether to bring lunch, dinner or a change of identity.'
    ]
  },
  {
    question: 'Someone at a party asks, "So, what do you do?"',
    answers: [
      'Explain my job, side projects, hobbies and three things I’m currently learning. They asked an innocent question. Rookie mistake.',
      'Give a short answer. I’m not conducting a performance review over cocktails.',
      'Mention my achievements. I didn’t go through all that character development for nothing.',
      'Turn the question around. I can get a stranger to reveal their entire life story before the starters arrive.'
    ]
  },
  {
    question: 'You find an old photo of yourself from five years ago.',
    answers: [
      'Suddenly miss a version of my life I didn’t even know I would miss. Rude.',
      'Investigate everyone in the photo. Where are they now? Are they married? Did they ever sort their lives out?',
      'Nice photo. Good hair. Anyway, moving on.',
      'Why am I emotional? What was happening in my life then? Why am I suddenly analysing a photo like it’s evidence in a criminal investigation?'
    ]
  },
  {
    question: 'Someone you love is upset but refuses to tell you what’s wrong.',
    answers: [
      'Give them space, but stay close. I’ll be here when they’re ready. No interrogation required.',
      'I cannot fix a problem that has not been disclosed. Please provide the incident report.',
      'Reconstruct every conversation we’ve had since 2018. Surely there’s a clue. It’s probably me. It might not be me. It’s definitely me.',
      'Deploy food, hugs and increasingly stupid memes. I will not rest until the smile returns.'
    ]
  },
  {
    question: 'Which feeling gets under your skin the most?',
    answers: [
      'Being replaceable. I don’t need to be everyone’s favourite, but I don’t want to feel like an optional subscription.',
      'Not being good enough. My inner critic has a full-time position and apparently unlimited annual leave.',
      'Being misunderstood. I could explain myself in five languages and someone would still miss the point.',
      'Feeling powerless. I can handle a disaster. I cannot handle being told there’s nothing I can do.'
    ]
  },
  {
    question: 'Your ideal weekend looks like...',
    answers: [
      'Somewhere I’ve never been, with a questionable itinerary and an aggressively full camera roll.',
      'A clean apartment, completed errands and the smug satisfaction of having my life together for approximately 36 hours.',
      'Good food, favourite people and no obligation to put on real trousers.',
      'Trying something new. I don’t need to be good at it. I just need a story and possibly a minor injury.'
    ]
  },
  {
    question: 'Someone takes ages to reply to your message.',
    answers: [
      'They’re probably busy. I have a life too. Anyway, let me check if my other 14 notifications are important.',
      'They used to reply in 12 minutes. Now it’s four hours. I have opened an investigation and reviewed the evidence.',
      'Send another message. I’m not competing in the Nonchalant World Championships.',
      'Forget I sent it. Their reply arrives three days later and I’m genuinely surprised to hear from them.'
    ]
  },
  {
    question: 'What motivates you most?',
    answers: [
      'New experiences. I want memories, not just a calendar full of meetings and dentist appointments.',
      'Achievement. I want results, recognition and proof that all this effort wasn’t just an elaborate character-building exercise.',
      'Connection. What’s the point of having everything if you have nobody to share it with?',
      'Freedom. I refuse to spend my one life following someone else’s instruction manual.'
    ]
  },
  {
    question: 'What’s your biggest weakness?',
    answers: [
      'Acting first and discovering the consequences later. Apparently, "it’ll be fine" is not a risk assessment.',
      'Overthinking until the opportunity expires. At least I considered every possible outcome.',
      'Caring too much. One sad message and suddenly my entire day has a new storyline.',
      'Getting bored the second things become predictable. My attention span has the commitment level of a situationship.'
    ]
  },
  {
    question: 'You realise you’ve made a mistake. What happens next?',
    answers: [
      'Own it, fix it and move on. I don’t have the budget for a three-season psychological drama.',
      'Replay the entire incident 87 times, then imagine 12 better responses I could have given.',
      'Make a joke about it before anyone else does. If I’m laughing, we’re all laughing.',
      'Learn from it. I may be a disaster, but I am a well-documented disaster.'
    ]
  },
  {
    question: 'What compliment secretly means the most to you?',
    answers: [
      'People feel safe being themselves around you.',
      'When you say you’ll do something, I know I can count on you.',
      'There’s something about you that people don’t forget.',
      'You notice things everyone else completely misses.'
    ]
  },
  {
    question: 'You get the opportunity to move to another country.',
    answers: [
      'New country, new chapter, new personality. Please allow 3–5 working days for reinvention.',
      'Research everything. I want to know the tax system before I know what the local coffee tastes like.',
      'Get excited, then remember everyone I’m leaving behind. Why does every good decision come with emotional damage?',
      'Buy the ticket first. Let future me deal with the administrative consequences.'
    ]
  },
  {
    question: 'How do you feel about rules?',
    answers: [
      'I respect rules. I just need to understand why someone made them before I agree to participate.',
      'Rules create structure. Chaos is just poor management wearing a fun outfit.',
      'I follow rules until they become inconvenient. I’m cooperative, not a hostage.',
      'If nobody can explain why the rule exists, I’m treating it as a suggestion.'
    ]
  },
  {
    question: 'Which sentence sounds most like you?',
    answers: [
      'I have the emotional stability of a Victorian widow, but you’ll never catch me admitting it.',
      'I’ve planned my entire life. Unfortunately, life has not received the memo.',
      'My life is 30% good decisions, 70% stories I cannot tell my mother.',
      'I don’t have a five-year plan. I barely have a five-minute plan. But somehow, we’re here.'
    ]
  }
]


const sushiPlates = [
  {
    id: 'salmon-nigiri',
    name: 'Salmon Nigiri',
    title: 'The Hopeless Romantic',
    description: 'Falls in love with potential. And sometimes the potential is imaginary.',
    image: '/characters/pixel-sushi/salmon-nigiri.png'
  },
  {
    id: 'spicy-tuna',
    name: 'Spicy Tuna',
    title: 'The Chaos Agent',
    description: 'Makes questionable decisions with impressive confidence.',
    image: '/characters/pixel-sushi/spicy-tuna.png'
  },
  {
    id: 'avocado-maki',
    name: 'Avocado Maki',
    title: 'The Overthinker',
    description: 'Has already analysed 17 possible meanings of your last message.',
    image: '/characters/pixel-sushi/avocado-maki.png'
  },
  {
    id: 'shrimp-tempura',
    name: 'Shrimp Tempura',
    title: 'The Crispy Softie',
    description: 'Acts unbothered. Is, in fact, bothered.',
    image: '/characters/pixel-sushi/shrimp-tempura.png'
  },
  {
    id: 'tamago',
    name: 'Tamago',
    title: 'The Comfort Person',
    description: 'The dependable one everyone secretly needs.',
    image: '/characters/pixel-sushi/tamago-nigiri.png'
  },
  {
    id: 'unagi',
    name: 'Unagi',
    title: 'The Quiet Achiever',
    description: 'Does the work. Gets the results. Skips the announcement.',
    image: '/characters/pixel-sushi/unagi.png'
  }
]






function App() {
  const [started, setStarted] = useState(false)
  const [showSocialClub, setShowSocialClub] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(() => {
  const savedResult = localStorage.getItem('sushi_mate_result')
  return savedResult ? JSON.parse(savedResult) : null
})
  const [selectedPlate, setSelectedPlate] = useState(null)


  const nextQuestion = async () => {
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  } else {
    const finalResult = calculateResult(answers)
    setResult(finalResult)
    localStorage.setItem('sushi_mate_result', JSON.stringify(finalResult))

    const { error } = await supabase
      .from('quiz_results')
      .insert({ personality_id: finalResult.id })

    if (error) {
      console.error('Could not save quiz result:', error)
    }
  }
}


  const restartQuiz = () => {
    setStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
    setSelectedPlate(null)
  }

const chooseAnswer = (answerIndex) => {
  setAnswers({
    ...answers,
    [currentQuestion]: {
      answerIndex: answerIndex
    }
  })
}

  return (
    <main className="app-shell">
      
<header className="top-bar">
  <div className="brand-mark">🍣 SUSHI MATE</div>

  <div className="top-bar-actions">
   <button
  className="social-club-nav"
  type="button"
  onClick={() => setShowSocialClub(true)}
>
  <span className="lantern-icon">🏮</span>
  <span className="lantern-label">SOCIAL CLUB</span>
</button>

    <span className="version-label">
      PERSONALITY CLASSIFIER V1.0
    </span>
  </div>
</header>












{showSocialClub && (
  <section className="social-club-screen">
    <div className="social-club-header">
      <button
        className="social-club-back"
        type="button"
        onClick={() => setShowSocialClub(false)}
      >
        ← BACK TO HOME
      </button>
    </div>



    <CommunityStats />

    <SushiConfessions
      personalityId={result?.id || null}
    />
  </section>
)}

      {!started && !result && !showSocialClub && (
        <section className="landing-screen">
          <div className="hero-copy">
            <div className="japanese-kicker">— スシメイト —</div>

            <div className="personality-count">
              <span className="status-dot" />
              22 PERSONALITIES · 9 REAL · 13 IMPOSTORS
            </div>

            <div className="hero-logo-wrap">
              <img
                src="/backgrounds/sushi-mate-logo.png"
                alt="SUSHI MATE"
                className="hero-logo-img"
              />
            </div>

            <div className="quiz-label">
              <span className="quiz-decoration">⌒⌒</span>
              PERSONALITY QUIZ
              <span className="quiz-decoration">⌒⌒</span>
            </div>

            <h2>Which sushi are you?</h2>
            <p>
              A 20-question personality quiz to find your
              <br />
              Sushi soulmate, best match and worst match.
            </p>
          </div>







          <div className="sushi-restaurant">
            <div className="sakura-layer" aria-hidden="true">
              {Array.from({ length: 14 }, (_, index) => (
                <span
                  className="sakura-petal"
                  key={index}
                  style={{
                    '--petal-left': `${(index * 37 + 5) % 100}%`,
                    '--petal-delay': `${(index % 7) * -2.1}s`,
                    '--petal-duration': `${12 + (index % 5) * 2}s`,
                    '--petal-size': `${9 + (index % 4) * 3}px`
                  }}
                />
              ))}
            </div>

            <div className="conveyor-belt">
              <svg
                className="conveyor-svg"
                viewBox="0 0 1050 390"
                role="group"
                aria-label="Moving U-shaped sushi conveyor. Select a plate to preview its personality."
              >
                <defs>
                  <path
                    id="sushi-conveyor-loop"
                    d="M 155 326 C 115 305 92 278 92 235 V 150 C 92 76 160 42 250 42 H 800 C 890 42 958 76 958 150 V 235 C 958 278 935 305 895 326"
                  />

                  <path
                    id="conveyor-deck-shape"
                    d="M 150 350 C 85 322 48 286 48 230 V 145 C 48 57 125 18 245 18 H 805 C 925 18 1002 57 1002 145 V 230 C 1002 286 965 322 900 350 L 900 270 C 947 248 958 225 958 195 V 150 C 958 96 895 66 805 66 H 245 C 155 66 92 96 92 150 V 195 C 92 225 103 248 150 270 Z"
                  />

                  <linearGradient
                    id="conveyor-deck-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#76264f" />
                    <stop offset="50%" stopColor="#4b1940" />
                    <stop offset="100%" stopColor="#29102f" />
                  </linearGradient>
                </defs>

                <use
                  href="#conveyor-deck-shape"
                  className="conveyor-structure-shadow"
                  transform="translate(0 22)"
                />
                <use
                  href="#conveyor-deck-shape"
                  className="conveyor-sidewall"
                  transform="translate(0 17)"
                />
                <use
                  href="#conveyor-deck-shape"
                  className="conveyor-deck"
                />

                <g className="conveyor-panel-seams">
                  <path d="M 180 25 V 66 M 300 20 V 66 M 430 20 V 66 M 560 20 V 66 M 690 20 V 66 M 820 25 V 66" />
                </g>

                <use
                  href="#conveyor-deck-shape"
                  className="conveyor-edge-glow"
                />
                <use
                  href="#conveyor-deck-shape"
                  className="conveyor-edge-light"
                />
                <use
                  href="#sushi-conveyor-loop"
                  className="conveyor-motion"
                />

                <path
                  className="conveyor-arrow"
                  d="M 115 220 l 15 12 -15 12 M 935 220 l -15 12 15 12"
                />

                {sushiPlates.map((plate, index) => (
                  <g className="conveyor-moving-plate" key={plate.id}>
                    <animateMotion
                      dur="36s"
                      begin={`${index * -6}s`}
                      repeatCount="indefinite"
                      rotate="0"
                    >
                      <mpath href="#sushi-conveyor-loop" />
                    </animateMotion>

                    <foreignObject
                      x="-130"
                      y="-125"
                      width="260"
                      height="240"
                      overflow="visible"
                    >
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'visible'
                        }}
                      >
                        <button
                          className={`sushi-plate ${
                            selectedPlate?.id === plate.id ? 'is-selected' : ''
                          }`}
                          type="button"
                          onClick={() =>
                            setSelectedPlate(
                              selectedPlate?.id === plate.id ? null : plate
                            )
                          }
                          aria-label={`Select ${plate.name}`}
                          aria-pressed={selectedPlate?.id === plate.id}
                        >
                          <img
                            className="pixel-sushi-image"
                            src={plate.image}
                            alt={plate.name}
                            draggable="false"
                          />

                          <span className="plate-preview">
                            <strong>{plate.name}</strong>
                            <span>{plate.title}</span>
                          </span>
                        </button>
                      </div>
                    </foreignObject>
                  </g>
                ))}
              </svg>
            </div>

            <button
              className="restaurant-start-button"
              type="button"
              onClick={() => {
                setSelectedPlate(null)
                setStarted(true)
              }}
            >
              TAKE THE TEST <span>→</span>
            </button>








{localStorage.getItem('sushi_mate_result') && (
  <button
    className="restaurant-start-button"
    type="button"
    onClick={() => {
      setResult(JSON.parse(localStorage.getItem('sushi_mate_result')))
    }}
  >
    RETURN TO MY SUSHI <span>→</span>
  </button>
)}





            {selectedPlate && (
              <div className="selected-preview">
                <strong>{selectedPlate.name}</strong>
                <span>{selectedPlate.title}</span>
                <p>{selectedPlate.description}</p>
                <button
                  type="button"
                  onClick={() => setSelectedPlate(null)}
                >
                  CLEAR SELECTION ×
                </button>
              </div>
            )}

            <div className="sushi-diner">
              <div className="diner-glow" />
              <div className="diner-seat">YOUR SEAT</div>
            </div>

            <div
              className="dining-table"
              aria-label="Pixel-art sushi tableware"
            >
              <img
                className="pixel-tableware"
                src="/backgrounds/pixel-tableware.png"
                alt="Matcha cup, soy sauce bottle, chopsticks and dipping bowl"
              />
              <span className="chopstick-rest" aria-hidden="true" />
            </div>
          </div>

          <p className="disclaimer">
            No worries. Your sushi won't judge you. Much.
          </p>
        </section>
      )}

      {started && !result && (
        <section className="quiz-screen">
          <div className="quiz-progress">
            <span>
              QUESTION {currentQuestion + 1} / {questions.length}
            </span>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="question-card">
            <span className="question-number">
              QUESTION {String(currentQuestion + 1).padStart(2, '0')}
            </span>

            <h2>{questions[currentQuestion].question}</h2>

            <div className="answer-list">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  className={`answer-option ${
                    answers[currentQuestion]?.answerIndex === index? 'selected' : ''
                  }`}
                  type="button"
                  key={index}
                  onClick={() => chooseAnswer(index)}
                >
                  <span className="answer-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{answer}</span>
                </button>
              ))}
            </div>

            <div className="quiz-navigation">
              <button
                className="back-button"
                type="button"
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1)
                  } else {
                    setStarted(false)
                  }
                }}
              >
                ← BACK
              </button>

              <button
                className="start-button"
                type="button"
                disabled={answers[currentQuestion] === undefined}
                onClick={nextQuestion}
              >
                {currentQuestion === questions.length - 1
                  ? 'FINISH TEST'
                  : 'NEXT QUESTION →'}
              </button>
            </div>
          </div>
        </section>
      )}

{result && (
  <section className="result-screen">
    <ResultCard
      result={result}
      onPlayAgain={restartQuiz}
    />

    <div className="result-sidebar">
      <CommunityStats />

      <SushiConfessions personalityId={result.id} />
    </div>
  </section>
)}

      <footer>
        <span>SUSHI MATE © 2026</span>
        <span>IDENTITY IS A SPECTRUM. SUSHI IS NOT.</span>
      </footer>
    </main>
  )
}

export default App
