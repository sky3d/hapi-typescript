import * as Hapi from '@hapi/hapi'
import { Server, Request, ResponseToolkit } from 'hapi'
import 'colors'
import { get } from 'node-emoji'
import { getSheetApi } from './googleApi/service'


const init = async () => {
    const server: Server = Hapi.server({
        port: 3000,
        host: 'localhost',
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit, err?: Error) => {
            return { msg: 'Rocketship launched' }
        }
    })
    server.route({
        method: 'GET',
        path: '/data',
        handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
            const apis = getSheetApi()

            await apis.connect()
            const data = await apis.load()
            return { data: JSON.stringify(data) }
        }
    })

    server.route({
        method: 'GET',
        path: '/data/status',
        handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
            const apis = getSheetApi()

            await apis.connect()
            const data = await apis.update()
            return { updated: JSON.stringify(data) }
        }
    })


    await server.start()

    console.log(
        get('rocket'),
        `Server running on ${server.info.uri}`.green,
        get('rocket')
    )
}

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit()
})

init()
