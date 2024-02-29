import jwt from 'jsonwebtoken';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */

export const generateCookie = (userId, res) => {
	const maxAge = 15 * 24 * 60 * 60 * 1000; // 15 days in ms

	const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
		expiresIn: '15d',
	});

    res.cookie("jwt", token, {
		maxAge,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "DEVELOPMENT",
	});
};
