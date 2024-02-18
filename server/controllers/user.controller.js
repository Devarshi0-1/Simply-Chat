import User from '../models/user.model.js'
import { httpCode } from '../utils/httpCodes.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/response.js'
import { isEmpty } from '../utils/userValidation.js'

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 */

export const getUserForSideBad = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        if (isEmpty(loggedInUserId.toString()))
            return sendErrorResponse(res, httpCode.notAuthorized, 'Login first!')

        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

        return sendSuccessResponse(
            res,
            httpCode.successful,
            allUsers,
            'All Uses Fetched Successfully!'
        )
    } catch (error) {
        console.log('Error In User Controller, at function getUserForSideBad: ', error.message)
        return sendErrorResponse(res, httpCode.internalServerError, 'Internal Server Error!')
    }
}
