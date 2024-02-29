import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
})

export const getUserSocketId = (Id) => {
    return userSocketMap[Id]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('A User is Connected', socket.id)

    const { userId } = socket.handshake.query

    if (userId != 'undefined') userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log('User Disconnect', socket.id)

        delete userSocketMap[userId]

        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})
