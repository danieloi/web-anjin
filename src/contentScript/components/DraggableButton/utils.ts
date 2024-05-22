type HOLIDAYS = 'HOLIDAY_MEMORIAL' | 'HOLIDAY_INDEPENDENCE' | 'HOLIDAY_NEW_YEAR' | 'HOLIDAY_NONE'

const getEmojiFromFlags = (holidays: HOLIDAYS) => {
  switch (holidays) {
    case 'HOLIDAY_MEMORIAL':
      return '🪖'
    case 'HOLIDAY_INDEPENDENCE':
      return '🇺🇸'
    case 'HOLIDAY_NEW_YEAR':
      return '🥳'
    default:
      return null
  }
}

const getBgColorFromHolidays = (holidays: HOLIDAYS) => {
  switch (holidays) {
    case 'HOLIDAY_MEMORIAL':
      return 'green'
    case 'HOLIDAY_INDEPENDENCE':
      return 'blue'
    case 'HOLIDAY_NEW_YEAR':
      return 'blue'
    default:
      return 'blue'
  }
}

export { getEmojiFromFlags, getBgColorFromHolidays }
