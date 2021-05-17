export interface GoogleApiCredentials {
  email: string
  key: string
}

export interface OrganizationSpreadsheets {
  [organizationId: string]: string
}

export interface GoogleApiConfig {
  credentials: GoogleApiCredentials
  spreadsheets: OrganizationSpreadsheets
}

export interface GoogleSheetRange {
  spreadsheetId: string,
  range: string
}

export type GoogleSheetRow = Array<string | null>

export type GoogleSheetBool = 'FALSE' | 'TRUE' | ''
