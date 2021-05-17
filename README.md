# How to read/update data from Google Sheets 

This project uses:

- typescript
- hapi server
- googleapis
- colors
- node-emoji

## Compile

`yarn compile` 

## Run 

`yarn start` 
`yarn start-dev` 

## Routes

Main page`http://localhost:3000/`


GET `/data` - retrieve data

GET `/data/status` - update random status

# Enviroment

Define `.env` file 

Example:

```
GOOGLE_API_EMAIL=your-account@fake-project.iam.gserviceaccount.com
GOOGLE_API_KEY="__PUT__PRIVATE_KEY_HERE__"
SPREADSHEET_NAME='Sheet1'
SPREADSHEET_RANGE_START='A1'
SPREADSHEET_RANGE_END='D10'
```
