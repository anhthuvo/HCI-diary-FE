export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const BOX_COLORS= ["bg-green-100", 'bg-purple-100', 'bg-blue-100']
export const WEEKDAYS = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Sat']
export const DIARY_STORAGE_KEY = 'diaries'
export const QUESTIONS_STORAGE_KEY = 'question'
export const initialQuestion = {
    q: "How was your day?",
    prompts: [
      "abd\n",
      "sfs"
    ]
  }
export const EMOTIONS = {
  "positive": [
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy",
      selected: true,
    },
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy",
      selected: false,
    },
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy",
      selected: false,
    }
  ],
  "negative": [
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy",
      selected: false,
    },
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy",
      selected: false,
    },
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy",
      selected: false,
    }
  ],
  "neutral": [
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy"
    },
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy"
    },
    {
      icon: '/assets/emotion-icon-happy.webp',
      label: "happy"
    }
  ]
}

export const BACKEND = {
  DOMAIN: "https://diary-chatbot.adaptable.app"
}
