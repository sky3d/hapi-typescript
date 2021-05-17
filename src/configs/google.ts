require('dotenv').config()

export const google = {
  credentials: {
    email: process.env.GOOGLE_API_EMAIL,
    key: process.env.GOOGLE_API_KEY,
  },
  spreadsheets: {
    demo: process.env.SPREADSHEET_ID,
    sheet: process.env.SPREADSHEET_NAME,
    rangeStart: process.env.SPREADSHEET_RANGE_START,
    rangeEnd: process.env.SPREADSHEET_RANGE_END
  },
}
