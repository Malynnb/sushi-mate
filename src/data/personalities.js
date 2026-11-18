
export const personalities = [
  // 01 — 10: REAL SUSHI
  {
    id: 'salmon-nigiri',
    number: 1,
    name: 'Salmon Nigiri',
    title: 'The Hopeless Romantic',
    emoji: '🍣',
    type: 'sushi',
    color: '#ff6b9d',
    vibe: 'Feels everything. Remembers everything. Falls in love with potential and occasionally ignores reality.',
    stats: [
      { label: 'Romanticism', value: 96 },
      { label: 'Emotional depth', value: 94 },
      { label: 'Loyalty', value: 91 },
      { label: 'Overthinking', value: 82 },
      { label: 'Moving on', value: 28 }
    ],
    questionableTraits: [
      'Overinvests too fast',
      'Romanticises red flags',
      "Can't let go"
    ],
    motto: 'I believe in love. Unfortunately.',
    bestMatch: {
      id: 'tamago',
      explanation: 'Your soft heart deserves someone who makes it feel safe.'
    },
    worstMatch: {
      id: 'wasabi',
      explanation: 'Your feelings are not built for this level of emotional spice.'
    }
  },
  {
    id: 'spicy-tuna',
    number: 2,
    name: 'Spicy Tuna',
    title: 'The Chaos Agent',
    emoji: '🌶️',
    type: 'sushi',
    color: '#ff526d',
    vibe: 'Makes questionable decisions with confidence. Somehow turns every ordinary day into an incident.',
    stats: [
      { label: 'Spontaneity', value: 98 },
      { label: 'Confidence', value: 94 },
      { label: 'Risk-taking', value: 96 },
      { label: 'Patience', value: 18 },
      { label: 'Self-control', value: 24 }
    ],
    questionableTraits: [
      'Stirs drama accidentally',
      'Says "just this once" a lot',
      'Thrives in chaos'
    ],
    motto: 'I did not come here to behave.',
    bestMatch: {
      id: 'dynamite-roll',
      explanation: 'Together, you could turn a quiet Tuesday into breaking news.'
    },
    worstMatch: {
      id: 'plain-white-rice',
      explanation: 'You need excitement. They need absolutely nothing.'
    }
  },
  {
    id: 'avocado-maki',
    number: 3,
    name: 'Avocado Maki',
    title: 'The Overthinker',
    emoji: '🥑',
    type: 'sushi',
    color: '#9be46e',
    vibe: 'Has 47 scenarios running simultaneously. Analyses every detail and somehow creates a new problem.',
    stats: [
      { label: 'Overthinking', value: 98 },
      { label: 'Self-awareness', value: 88 },
      { label: 'Attention to detail', value: 92 },
      { label: 'Decision speed', value: 32 },
      { label: 'Mental rest', value: 12 }
    ],
    questionableTraits: [
      'Overanalyses texts',
      'Creates problems in their head',
      "Can't make a simple decision"
    ],
    motto: 'What if everything means something?',
    bestMatch: {
      id: 'matcha-latte',
      explanation: 'Someone needs to remind you to breathe and drink water.'
    },
    worstMatch: {
      id: 'katsu-curry',
      explanation: 'Their main-character energy leaves no room for your internal monologue.'
    }
  },
  {
    id: 'california-roll',
    number: 4,
    name: 'California Roll',
    title: 'The Social Chameleon',
    emoji: '🍣',
    type: 'sushi',
    color: '#ff8da8',
    vibe: 'Everyone likes you, but who are you really? You adapt to every crowd and somehow belong everywhere.',
    stats: [
      { label: 'Adaptability', value: 98 },
      { label: 'Social skills', value: 96 },
      { label: 'Charm', value: 91 },
      { label: 'People pleasing', value: 87 },
      { label: 'Authenticity', value: 62 }
    ],
    questionableTraits: [
      'Adapts to every crowd',
      'Fears being "boring"',
      'Sometimes loses themselves'
    ],
    motto: 'A little bit of everyone, a mystery to myself.',
    bestMatch: {
      id: 'takoyaki',
      explanation: 'You bring the social skills. They bring the stories.'
    },
    worstMatch: {
      id: 'unagi',
      explanation: 'You want everyone involved. They prefer quiet execution.'
    }
  },
  {
    id: 'unagi',
    number: 5,
    name: 'Unagi',
    title: 'The Quiet Achiever',
    emoji: '🍱',
    type: 'sushi',
    color: '#c58a9c',
    vibe: "Doesn't announce plans. Just executes. Quietly ambitious and allergic to unnecessary attention.",
    stats: [
      { label: 'Discipline', value: 97 },
      { label: 'Independence', value: 94 },
      { label: 'Focus', value: 96 },
      { label: 'Reliability', value: 93 },
      { label: 'Need for attention', value: 14 }
    ],
    questionableTraits: [
      'Bottles up stress',
      'Expects a lot (silently)',
      'Forgets to celebrate wins'
    ],
    motto: 'No announcement. Just results.',
    bestMatch: {
      id: 'tamago',
      explanation: 'A little warmth balances your serious side.'
    },
    worstMatch: {
      id: 'spicy-tuna',
      explanation: 'Their chaos is your productivity nightmare.'
    }
  },
  {
    id: 'tamago',
    number: 6,
    name: 'Tamago',
    title: 'The Comfort Person',
    emoji: '🍳',
    type: 'sushi',
    color: '#ffd166',
    vibe: "Reliable, sweet and everyone's safe place. You make people feel at home, sometimes forgetting yourself.",
    stats: [
      { label: 'Kindness', value: 98 },
      { label: 'Reliability', value: 96 },
      { label: 'Empathy', value: 95 },
      { label: 'Boundaries', value: 48 },
      { label: 'Conflict avoidance', value: 82 }
    ],
    questionableTraits: [
      'Puts others first (too much)',
      'Avoids confrontation',
      'Stays in the comfort zone'
    ],
    motto: 'Soft heart. Strong boundaries. Eventually.',
    bestMatch: {
      id: 'salmon-nigiri',
      explanation: 'Someone who appreciates the love you give.'
    },
    worstMatch: {
      id: 'wasabi',
      explanation: 'You cannot keep soothing someone who enjoys causing fires.'
    }
  },
  {
    id: 'shrimp-tempura',
    number: 7,
    name: 'Shrimp Tempura',
    title: 'The Crispy Softie',
    emoji: '🍤',
    type: 'sushi',
    color: '#ffad75',
    vibe: 'Tough exterior, soft interior. Looks unbothered but secretly cares about absolutely everything.',
    stats: [
      { label: 'Resilience', value: 92 },
      { label: 'Sensitivity', value: 89 },
      { label: 'Ambition', value: 88 },
      { label: 'Emotional openness', value: 42 },
      { label: 'Hidden softness', value: 99 }
    ],
    questionableTraits: [
      "Acts unbothered (but isn't)",
      'Takes a while to open up',
      'Has a sentimental side'
    ],
    motto: 'Crunchy outside. Feelings inside.',
    bestMatch: {
      id: 'mochi',
      explanation: 'Their softness understands yours.'
    },
    worstMatch: {
      id: 'plain-white-rice',
      explanation: 'You need a little emotional flavour.'
    }
  },

  // 11 — 22: IMPOSTORS
  {
    id: 'katsu-curry',
    number: 8,
    name: 'Katsu Curry',
    title: 'The Main Character',
    emoji: '🍛',
    type: 'impostor',
    color: '#f4a261',
    vibe: 'Everything somehow becomes your story. You are not dramatic. The world simply needs better supporting characters.',
    stats: [
      { label: 'Confidence', value: 98 },
      { label: 'Ambition', value: 94 },
      { label: 'Self-belief', value: 99 },
      { label: 'Humility', value: 21 },
      { label: 'Need for attention', value: 96 }
    ],
    questionableTraits: [
      'Dramatises the smallest things',
      'Needs to be the protagonist',
      'Overcommits (then gets tired)'
    ],
    motto: 'If it is not about me, why am I here?',
    bestMatch: {
      id: 'dynamite-roll',
      explanation: 'Two dramatic personalities. One extremely entertaining disaster.'
    },
    worstMatch: {
      id: 'avocado-maki',
      explanation: 'They are too busy analysing your every move.'
    }
  },
  {
    id: 'takoyaki',
    number: 9,
    name: 'Takoyaki',
    title: 'The Multi-Interest',
    emoji: '🐙',
    type: 'impostor',
    color: '#f78fb3',
    vibe: 'Socially unpredictable. Collects hobbies, interests and unfinished projects like souvenirs.',
    stats: [
      { label: 'Curiosity', value: 99 },
      { label: 'Creativity', value: 94 },
      { label: 'Sociability', value: 91 },
      { label: 'Consistency', value: 28 },
      { label: 'Attention span', value: 32 }
    ],
    questionableTraits: [
      'Starts 5 new hobbies a month',
      'Gets easily distracted',
      'Says yes to everything'
    ],
    motto: 'Why have one personality when you can have twelve?',
    bestMatch: {
      id: 'california-roll',
      explanation: 'You both make every gathering more interesting.'
    },
    worstMatch: {
      id: 'unagi',
      explanation: 'Your unfinished projects are their personal nightmare.'
    }
  },
  {
    id: 'wasabi',
    number: 10,
    name: 'Wasabi',
    title: 'The Intensity',
    emoji: '🟢',
    type: 'impostor',
    color: '#b9e769',
    vibe: 'Small package, disproportionate reaction. Speaks their mind loudly and has absolutely no volume control.',
    stats: [
      { label: 'Intensity', value: 99 },
      { label: 'Honesty', value: 96 },
      { label: 'Confidence', value: 92 },
      { label: 'Tact', value: 14 },
      { label: 'Patience', value: 19 }
    ],
    questionableTraits: [
      'Zero chill',
      'Speaks their mind (loudly)',
      'Can be a bit much'
    ],
    motto: 'I am not too much. You are too sensitive.',
    bestMatch: {
      id: 'spicy-tuna',
      explanation: 'Two agents of chaos. Everyone else should be warned.'
    },
    worstMatch: {
      id: 'tamago',
      explanation: 'Their peaceful energy cannot survive your intensity.'
    }
  },
  {
    id: 'matcha-latte',
    number: 11,
    name: 'Matcha Latte',
    title: 'The Wellness Enthusiast',
    emoji: '🍵',
    type: 'impostor',
    color: '#83d6b0',
    vibe: 'Healing, journaling and spending €7 on a drink. Your personal growth has excellent lighting.',
    stats: [
      { label: 'Self-awareness', value: 92 },
      { label: 'Wellness obsession', value: 99 },
      { label: 'Aesthetic sense', value: 96 },
      { label: 'Spontaneity', value: 34 },
      { label: 'Budget discipline', value: 22 }
    ],
    questionableTraits: [
      'Romanticises self-care',
      'Buys "just one more" matcha',
      'Believes in new routines'
    ],
    motto: 'Healing, but make it aesthetic.',
    bestMatch: {
      id: 'pickled-ginger',
      explanation: 'You both believe every new era deserves a fresh start.'
    },
    worstMatch: {
      id: 'wasabi',
      explanation: 'Their energy is not exactly nervous-system friendly.'
    }
  },
  {
    id: 'matcha-tiramisu',
    number: 12,
    name: 'Matcha Tiramisu',
    title: 'The Acquired Taste',
    emoji: '🍰',
    type: 'impostor',
    color: '#d9a0c5',
    vibe: 'A little pretentious, surprisingly lovable. You appreciate the finer things and have expensive opinions.',
    stats: [
      { label: 'Taste', value: 99 },
      { label: 'Luxury standards', value: 98 },
      { label: 'Aesthetic sense', value: 96 },
      { label: 'Practicality', value: 34 },
      { label: 'Simplicity', value: 18 }
    ],
    questionableTraits: [
      'Has strong opinions',
      'A bit high-maintenance',
      'Claims it is a lifestyle'
    ],
    motto: 'It is called having standards.',
    bestMatch: {
      id: 'mochi',
      explanation: 'A little softness balances your refined taste.'
    },
    worstMatch: {
      id: 'plain-white-rice',
      explanation: 'Their idea of luxury is simply existing.'
    }
  },
  {
    id: 'mochi',
    number: 13,
    name: 'Mochi',
    title: 'The Softie',
    emoji: '🍡',
    type: 'impostor',
    color: '#f6a6cb',
    vibe: 'Wants affection but pretends to be independent. A soft little mystery with a surprisingly complicated emotional world.',
    stats: [
      { label: 'Affection', value: 99 },
      { label: 'Empathy', value: 96 },
      { label: 'Sensitivity', value: 98 },
      { label: 'Independence', value: 42 },
      { label: 'Emotional resilience', value: 38 }
    ],
    questionableTraits: [
      'Becomes clingy (sometimes)',
      'Hides their feelings',
      'Says "I am fine" (but is not)'
    ],
    motto: 'Cute outside. Emotional damage inside.',
    bestMatch: {
      id: 'matcha-tiramisu',
      explanation: 'You bring softness. They bring a little sophistication.'
    },
    worstMatch: {
      id: 'katsu-curry',
      explanation: 'Their main-character energy might overshadow your feelings.'
    }
  },
  {
    id: 'dorayaki',
    number: 14,
    name: 'Dorayaki',
    title: 'The Old Soul',
    emoji: '🥞',
    type: 'impostor',
    color: '#c99579',
    vibe: 'Romanticises things that happened in 2019. Nostalgic, sentimental and emotionally attached to old playlists.',
    stats: [
      { label: 'Nostalgia', value: 99 },
      { label: 'Sentimentality', value: 95 },
      { label: 'Romanticism', value: 89 },
      { label: 'Adaptability', value: 36 },
      { label: 'Letting go', value: 22 }
    ],
    questionableTraits: [
      'Lives in the past a little',
      'Emotionally nostalgic',
      'Rewatches the same shows'
    ],
    motto: 'The past had better lighting.',
    bestMatch: {
      id: 'tamago',
      explanation: 'You both appreciate warmth, comfort and sincerity.'
    },
    worstMatch: {
      id: 'spicy-tuna',
      explanation: 'They move too fast for your sentimental heart.'
    }
  },
  {
    id: 'plain-white-rice',
    number: 15,
    name: 'Plain White Rice',
    title: 'The Minimalist',
    emoji: '🍚',
    type: 'impostor',
    color: '#b7dbe8',
    vibe: "You're not boring. You're just not participating in the circus anymore. Calm, simple and impossible to impress.",
    stats: [
      { label: 'Calmness', value: 99 },
      { label: 'Simplicity', value: 98 },
      { label: 'Reliability', value: 91 },
      { label: 'Drama tolerance', value: 8 },
      { label: 'Need for excitement', value: 12 }
    ],
    questionableTraits: [
      'Low effort (by choice)',
      'Emotionally neutral',
      'Avoids unnecessary drama'
    ],
    motto: 'I am not boring. I am at peace.',
    bestMatch: {
      id: 'unagi',
      explanation: 'Two quietly capable personalities who understand each other.'
    },
    worstMatch: {
      id: 'dynamite-roll',
      explanation: 'Their chaos is exactly what you have been avoiding.'
    }
  },
  {
    id: 'ramen',
    number: 16,
    name: 'Ramen',
    title: 'The Complicated One',
    emoji: '🍜',
    type: 'impostor',
    color: '#f08a9d',
    vibe: 'A whole situation. Nobody knows how to handle you, including yourself. Deep feelings, many layers.',
    stats: [
      { label: 'Emotional depth', value: 98 },
      { label: 'Complexity', value: 99 },
      { label: 'Overthinking', value: 95 },
      { label: 'Clarity', value: 24 },
      { label: 'Predictability', value: 16 }
    ],
    questionableTraits: [
      'Emotionally intense',
      'A mix of everything',
      'Can be a lot (in a good way)'
    ],
    motto: 'It is never just one thing.',
    bestMatch: {
      id: 'spicy-salmon',
      explanation: 'They understand that complicated feelings need room.'
    },
    worstMatch: {
      id: 'plain-white-rice',
      explanation: 'They would prefer a much simpler conversation.'
    }
  },
  {
    id: 'spicy-salmon',
    number: 17,
    name: 'Spicy Salmon',
    title: 'The Hot-Headed',
    emoji: '🌶️',
    type: 'sushi',
    color: '#ff758f',
    vibe: 'Dramatic, passionate and always has something to say. You feel strongly and make sure everyone knows it.',
    stats: [
      { label: 'Passion', value: 99 },
      { label: 'Assertiveness', value: 96 },
      { label: 'Energy', value: 94 },
      { label: 'Patience', value: 19 },
      { label: 'Emotional control', value: 32 }
    ],
    questionableTraits: [
      'Gets heated easily',
      'Overreacts (a little)',
      'Turns small things into big things'
    ],
    motto: 'If I feel it, you will hear about it.',
    bestMatch: {
      id: 'wasabi',
      explanation: 'Two intense personalities. Sparks are practically guaranteed.'
    },
    worstMatch: {
      id: 'avocado-maki',
      explanation: 'They will analyse your reaction for the next six hours.'
    }
  },
  {
    id: 'bicep-sushi',
    number: 18,
    name: 'Bicep Sushi',
    title: 'The Committed One',
    emoji: '💪',
    type: 'sushi',
    color: '#e6a0c4',
    vibe: 'Questionable aesthetic decisions that you fully commit to. You work hard, show up and refuse to do things halfway.',
    stats: [
      { label: 'Determination', value: 99 },
      { label: 'Discipline', value: 96 },
      { label: 'Confidence', value: 91 },
      { label: 'Flexibility', value: 38 },
      { label: 'Resting', value: 22 }
    ],
    questionableTraits: [
      'Does things for the bit',
      'A little extra (in all the best ways)',
      'No regrets (ever)'
    ],
    motto: 'If you commit, commit completely.',
    bestMatch: {
      id: 'katsu-curry',
      explanation: 'Two confident personalities who understand ambition.'
    },
    worstMatch: {
      id: 'matcha-latte',
      explanation: 'They want balance. You want another personal best.'
    }
  },
  {
    id: 'dynamite-roll',
    number: 19,
    name: 'Dynamite Roll',
    title: 'The Overreactor',
    emoji: '🍣',
    type: 'sushi',
    color: '#ff6bba',
    vibe: 'Acts first, asks questions later. Somehow makes every ordinary situation entertaining.',
    stats: [
      { label: 'Dramatic energy', value: 99 },
      { label: 'Spontaneity', value: 96 },
      { label: 'Expressiveness', value: 98 },
      { label: 'Impulse control', value: 18 },
      { label: 'Chill', value: 6 }
    ],
    questionableTraits: [
      'All or nothing',
      'Turns plans into chaos',
      'Brings main character energy'
    ],
    motto: 'Why react normally when you can react spectacularly?',
    bestMatch: {
      id: 'spicy-tuna',
      explanation: 'Together you are an incident waiting to happen.'
    },
    worstMatch: {
      id: 'unagi',
      explanation: 'They would like you to lower your volume. Forever.'
    }
  },
  {
    id: 'extra-spicy-curry',
    number: 20,
    name: 'Extra Spicy Curry',
    title: 'The Chaos Lover',
    emoji: '🍛',
    type: 'impostor',
    color: '#ff9b54',
    vibe: "You don't want peace. You want a little chaos with extra chilli oil. Life should never be predictable.",
    stats: [
      { label: 'Adventure', value: 99 },
      { label: 'Risk-taking', value: 98 },
      { label: 'Intensity', value: 97 },
      { label: 'Routine', value: 12 },
      { label: 'Caution', value: 9 }
    ],
    questionableTraits: [
      'Enjoys a bit of suffering',
      'Seeks intensity',
      "Says 'I can handle it' (questionable)"
    ],
    motto: 'Peace is overrated. Add more chilli.',
    bestMatch: {
      id: 'dynamite-roll',
      explanation: 'Neither of you has ever met a situation you could not escalate.'
    },
    worstMatch: {
      id: 'tamago',
      explanation: 'They would like one quiet evening, please.'
    }
  },
  {
    id: 'karaage',
    number: 21,
    name: 'Karaage',
    title: 'The Approachable Menace',
    emoji: '🍗',
    type: 'impostor',
    color: '#e9ae72',
    vibe: 'Looks approachable. Has absolutely no patience. Friendly on the surface, ruthless about personal boundaries.',
    stats: [
      { label: 'Confidence', value: 93 },
      { label: 'Independence', value: 97 },
      { label: 'Directness', value: 96 },
      { label: 'Patience', value: 16 },
      { label: 'People pleasing', value: 8 }
    ],
    questionableTraits: [
      'Friendly but easily annoyed',
      'Low tolerance for nonsense',
      "Says what everyone's thinking"
    ],
    motto: 'I am nice. Do not test it.',
    bestMatch: {
      id: 'shrimp-tempura',
      explanation: 'A little crunch and a little softness. Excellent balance.'
    },
    worstMatch: {
      id: 'plain-white-rice',
      explanation: 'Their calmness might make you suspicious.'
    }
  },
  {
    id: 'pickled-ginger',
    number: 22,
    name: 'Pickled Ginger',
    title: 'The Reinvention Specialist',
    emoji: '🫚',
    type: 'impostor',
    color: '#f38dbb',
    vibe: 'New era. Same unresolved issues. Constantly changing aesthetics, hobbies and life philosophies. Calls it growth.',
    stats: [
      { label: 'Reinvention', value: 98 },
      { label: 'Curiosity', value: 94 },
      { label: 'Self-awareness', value: 76 },
      { label: 'Commitment to new era', value: 42 },
      { label: 'Impulse control', value: 19 }
    ],
    questionableTraits: [
      'Mistakes a new aesthetic for change',
      'Gets bored... easily',
      'Announces a new era every 3–5 days'
    ],
    motto: 'If it does not work, rebrand.',
    bestMatch: {
      id: 'mochi',
      explanation: 'Someone has to love every version of you.'
    },
    worstMatch: {
      id: 'unagi',
      explanation: 'They prefer consistency. You prefer a complete rebrand.'
    }
  }
]