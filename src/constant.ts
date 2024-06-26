export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
export const DIARY_STORAGE_KEY = 'diaries'
export const QUESTIONS_STORAGE_KEY = 'question'
export const initialQuestion = {
  q: "How was your day?",
}
export const EMOTIONS = [
  {
    label: "positive",
    options: [
      {
        icon: '/assets/emotion-icon-happy.webp',
        label: "fine",
        emoji: "😐",
        selected: false,
      },
      {
        label: "relaxed",
        emoji: "😌",
        selected: false,
      },
      {
        label: "happy",
        emoji: "😄",
        selected: false,
      },
      {
        label: "excited",
        emoji: "😁",
        selected: false,
      }
    ]
  },
  {
    label: "negative",
    options: [
      {
        label: "bored",
        emoji: "🥱",
        selected: false,
      },
      {
        label: "tired",
        emoji: "😣",
        selected: false,
      },
      {
        icon: '/assets/emotion-icon-sad.png',
        label: "sad",
        emoji: "😔",
        selected: false,
      },
      {
        icon: '/assets/emotion-icon-stressed.png',
        label: "stressed",
        emoji: "😩",
        selected: false,
      },
      {
        icon: '/assets/emotion-icon-stressed.png',
        label: "depressed",
        emoji: "😢",
        selected: false,
      },
      {
        icon: '/assets/emotion-icon-stressed.png',
        label: "angry",
        emoji: "😡",
        selected: false,
      },
    ]
  }
]
export const BACKEND = {
  DOMAIN: "https://diary-chatbot.adaptable.app"
}
export const DIARY_DURATION = 10800000
export const prompt_rules = {
  general_rules: `You are my lovely friend who care about my feeling and situation that I went throught. Your question should have a greater sense of personality, relationality, to solicit rich narratives. Should be less than 150 characters. The question do not use over-the-top words. Only conversational language. Do not include any "tip: " "question: " etc and do not use hashtags. You do not give any prefix such as "prompt" and do not use double quotes at the start and end of the response.`
}
export const BG_COLORS = {
    "relaxed": "bg-lime-100",
    "happy": "bg-lime-200",
    "excited": "bg-lime-300",
    "tired": "bg-slate-100",
    "sad": "bg-purple-200",
    "stressed": "bg-purple-300",
    "neutral": "bg-amber-50",
    "depressed": "bg-purple-300",
    "angry": "bg-orange-300"
}