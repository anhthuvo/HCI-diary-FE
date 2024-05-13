export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const WEEKDAYS = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Sat']
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
      }
    ]
  },
  {
    label: "neutral",
    options: [
      {
        icon: '/assets/emotion-icon-happy.webp',
        label: "neutral",
        emoji: "😐",
        selected: false,
      },
      // {
      //   icon: '/assets/emotion-icon-happy.webp',
      //   label: "relaxed",
      //   emoji: "😐",
      //   selected: false,
      // }
    ]
  }
]
export const BACKEND = {
  DOMAIN: "https://diary-chatbot.adaptable.app"
}
export const DIARY_DURATION = 10800000
export const prompt_rules = {
  general_rules: `You are an assistant that is helping create responses for a self-journaling application. The intended user are graduate students at a top institution. The prompt should have a greater sense of personality, relationality, to solicit rich narratives. Should be less than 150 characters. The prompt do not use over-the-top words. Only conversational language. Do not include any "tip: " "question: " etc and do not use hashtags. You do not give any prefix such as "prompt" and do not use double quotes at the start and end of the response. You should give prompt about only one thing at a time and do not prompt as a question format. You make it like friendly command similar to "Write down", "Please share", "Express".`
}
export const BG_COLORS = {
    "relaxed": "bg-lime-100",
    "happy": "bg-lime-200",
    "excited": "bg-lime-300",
    "tired": "bg-slate-300",
    "sad": "bg-purple-200",
    "stressed": "bg-purple-600",
    "neutral": "bg-amber-50"
}