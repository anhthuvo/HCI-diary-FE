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
