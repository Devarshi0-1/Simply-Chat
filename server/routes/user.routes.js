import express from 'express'
import { getUserForSideBad } from '../controllers/user.controller.js'
import { protectRoute } from '../middlewares/protectRoute.middleware.js'

const router = express.Router()

router.get('/', protectRoute, getUserForSideBad)

export default router
