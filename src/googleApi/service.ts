import { GoogleApiConfig, GoogleSheetBool, GoogleSheetRow } from './interfaces'
import { readRange, createClient, updateRange } from './client'
import { google as config } from '../configs/google'


let instance: GoogleApiService | null = null


const setStatus = (sourceRow: GoogleSheetRow, index: number, activeIndex: number): GoogleSheetRow => {
    const status: GoogleSheetBool = index === activeIndex ? 'TRUE' : 'FALSE'
    sourceRow[0] = status
    return sourceRow
}

export class GoogleApiService {
    config: GoogleApiConfig

    public client: Object | null = null

    public isConnected = false

    constructor(config: GoogleApiConfig) {
        this.config = config
        console.log('googleApi service is created')
    }

    public async connect(): Promise<Boolean> {
        this.client = await createClient(this.config.credentials)
        this.isConnected = this.client !== null

        console.log('spreadsheet authorizing:', this.isConnected)

        if (!this.isConnected) {
            console.log(`google api is not authorized`.red)
        } else {
            console.log(`google api successfully connected`.green)
        }
        return this.isConnected
    }

    public async load(): Promise<GoogleSheetRow[]> {
        if (!this.isConnected) {
            return []
        }

        const spreadsheetId = this.config.spreadsheets['demo']

        const s = config.spreadsheets
        const range = `${s.sheet}!${s.rangeStart}:${s.rangeEnd}`

        console.log('read from google spreadsheet %s %s', spreadsheetId, range)

        return readRange(this.client, { spreadsheetId, range })
    }

    public async update(): Promise<void> {
        if (!this.isConnected) {
            return
        }

        const spreadsheetId = this.config.spreadsheets['demo']

        const s = config.spreadsheets
        const range = `${s.sheet}!${s.rangeStart}:${s.rangeEnd}`

        const data = await readRange(this.client, { spreadsheetId, range })
        const filtered = data.filter(x => x.length >= 2)

        const activeIndex = Math.floor(Math.random() * filtered.length)
        console.log(`set active status for ${activeIndex} index`)

        let update = filtered.map((x, index) => setStatus(x, index, activeIndex))

        console.log('update google spreadsheet %s:', JSON.stringify(update))
        const res = await updateRange(this.client, { spreadsheetId, range }, update)
        return res
    }
}


export function getSheetApi(): GoogleApiService | never {
    if (instance instanceof GoogleApiService) {
        return instance
    }

    instance = new GoogleApiService(config)
    return instance
    //throw new Error('SpreadSheet is not initialized')

}
