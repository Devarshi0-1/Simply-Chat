import express from 'express'
import { getMessages, markMessageAsRead, sendMessage } from '../controllers/message.controller.js'
import { protectRoute } from '../middlewares/protectRoute.middleware.js'

const router = express.Router()

router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, sendMessage)

router.post('/mark-read/:userId/:id', protectRoute, markMessageAsRead)

export default router
