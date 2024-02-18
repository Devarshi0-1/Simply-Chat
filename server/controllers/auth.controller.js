import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { httpCode } from '../utils/httpCodes.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/response.js'
import { isEmpty } from '../utils/userValidation.js'
import { generateCookie } from '../utils/sendCookie.js'

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 */

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body

        if (isEmpty(fullName, username, password, confirmPassword, gender))
            return sendErrorResponse(res, httpCode.badRequest, 'Required fields is/are empty!')

        if (gender !== 'male' && gender !== 'female')
            return sendErrorResponse(res, httpCode.badRequest, 'Gender Can only be Male or Female!')

        if (password !== confirmPassword)
            return sendErrorResponse(res, httpCode.badRequest, 'Password do not match!')

        let user = await User.findOne({ username })

        if (user) return sendErrorResponse(res, httpCode.badRequest, 'User already exists!')

        const hashedPassword = await bcryptjs.hash(password, 10)

        let profilePic = ''
        if (gender === 'male')
            profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        else profilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        user = await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic,
        })

        generateCookie(user._id, res)

        return sendSuccessResponse(
            res,
            httpCode.resourceCreated,
            {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePic: user.profilePic,
                createdAt: user.createdAt,
            },
            'Account Created!'
        )
    } catch (error) {
        console.log('Error In Auth Controller, at function signup: ', error.message)
        return sendErrorResponse(res, httpCode.internalServerError, 'Internal Server Error!')
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *  @returns {import('express').Response}
 */

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (isEmpty(username, password))
            return sendErrorResponse(res, httpCode.badRequest, 'Required fields is/are empty!')

        const user = await User.findOne({ username })

        if (!user)
            return sendErrorResponse(
                res,
                httpCode.badRequest,
                'User with that username does not exits!'
            )

        const isPassword = bcryptjs.compare(password, user.password)

        if (!isPassword) return sendErrorResponse(res, httpCode.notAuthorized, 'Wrong Password!')

        generateCookie(user._id, res)

        return sendSuccessResponse(
            res,
            httpCode.successful,
            {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePic: user.profilePic,
                createdAt: user.createdAt,
            },
            `Welcome back, ${user.fullName.split(' ')[0]}`
        )
    } catch (error) {
        console.log('Error In User Controller, at function login: ', error.message)
        return sendErrorResponse(res, httpCode.internalServerError, 'Internal Server Error!')
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *  @returns {import('express').Response}
 */

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            expires: new Date(Date.now()),
            maxAge: 0,
            sameSite: process.env.NODE_ENV === 'DEVELOPMENT' ? 'none' : 'strict',
            secure: process.env.NODE_ENV !== 'DEVELOPMENT',
        })

        return sendSuccessResponse(res, httpCode.successful, null, 'Logged Out!')
    } catch (error) {
        console.log('Error In User Controller, at function logout: ', error.message)
        return sendErrorResponse(res, httpCode.internalServerError, 'Internal Server Error!')
    }
}
