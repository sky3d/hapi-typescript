import { google } from 'googleapis'
import { promisify } from 'util'
import { GoogleApiCredentials, GoogleSheetRange, GoogleSheetRow } from './interfaces'


promisify(google.auth.JWT.prototype.authorize)

const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

export const createClient = async (config: GoogleApiCredentials): Promise<any> => {
    const auth = new google.auth.JWT(config.email, null, config.key, SCOPE)
    try {
        const tokens = await auth.authorize()
        console.log('authorization tokens successfully retrieved')
        return google.sheets({ version: 'v4', auth })
    } catch (err) {
        console.log('auth error:', err)
    }
    return auth
}

export const readRange = async (client: any, sheetRange: GoogleSheetRange) => {
    const { spreadsheetId, range } = sheetRange

    const options = {
        spreadsheetId,
        range,
    }

    try {
        const data = await client.spreadsheets.values.get(options)
        return data.data.values
    } catch (err) {
        console.log('reading spreadsheet data error', err)
        return err?.message
    }
}

export const updateRange = async (client: any, sheetRange: GoogleSheetRange, update: any): Promise<any> => {
    const { spreadsheetId, range } = sheetRange

    const updateOptions = {
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values: update }
    }

    try {
        const res = await client.spreadsheets.values.update(updateOptions)
        return res.data
    } catch (err) {
        console.log('update spreadsheet data error', err)
        return err?.message
    }
}
