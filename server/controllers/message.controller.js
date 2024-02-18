import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { httpCode } from '../utils/httpCodes.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/response.js'
import { isEmpty } from '../utils/userValidation.js'

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 */

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const { message } = req.body
        const senderId = req.user._id.toString()

        if (isEmpty(message, receiverId, senderId))
            return sendErrorResponse(res, httpCode.badRequest, 'Message or User Id Empty!')

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation)
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([await newMessage.save(), await conversation.save()])

        return sendSuccessResponse(
            res,
            httpCode.resourceCreated,
            newMessage,
            'Message Sent Successfully!'
        )
    } catch (error) {
        console.log('Error In Message Controller, at function sendMessage: ', error.message)
        return sendErrorResponse(res, httpCode.internalServerError, 'Internal Server Error!')
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 */

export const getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params
        const senderId = req.user._id.toString()

        if (isEmpty(userToChat, senderId))
            return sendErrorResponse(res, httpCode.badRequest, 'Empty Id!')

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChat] },
        }).populate('messages')

        if (!conversation)
            return sendSuccessResponse(
                res,
                httpCode.successful,
                [],
                'Messages fetched Successfully!'
            )

        return sendSuccessResponse(
            res,
            httpCode.successful,
            conversation.messages,
            'Messages fetched Successfully!'
        )
    } catch (error) {
        console.log('Error In Message Controller, at function getMessages: ', error.message)
        return sendErrorResponse(res, httpCode.internalServerError, 'Internal Server Error!')
    }
}
