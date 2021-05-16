import * as Hapi from '@hapi/hapi'
import { Server, Request, ResponseToolkit } from 'hapi'
import 'colors'
import { get } from 'node-emoji'


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
