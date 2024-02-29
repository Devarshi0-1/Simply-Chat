import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { User, useAuthContext } from '../context/AuthContext'
import { isEmpty } from '../utils/userValidation'

type LoginSignUpData = {
    success: boolean
    data: User
    message: string
    isError: boolean
    error: {
        message: string
    }
}

type SignUp = (
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string,
) => Promise<void>

type HandleInputErrors = (
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string,
) => boolean

const useSignUp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const signUp: SignUp = async (fullName, username, password, confirmPassword, gender) => {
        const validationErrors: boolean = handleInputErrors(
            fullName,
            username,
            password,
            confirmPassword,
            gender,
        )

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.post<LoginSignUpData>(
                '/api/v1/auth/signup',
                {
                    fullName,
                    username,
                    password,
                    confirmPassword,
                    gender,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            localStorage.setItem('chat-user', JSON.stringify(data.data))
            if (setAuthUser) setAuthUser(data.data)
        } catch (error: any) {
            if (error.response?.data?.error?.message) {
                toast.error(error.response.data.error.message)
                return
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, signUp }
}

const handleInputErrors: HandleInputErrors = (
    fullName,
    username,
    password,
    confirmPassword,
    gender,
) => {
    if (isEmpty(fullName, username, password, confirmPassword, gender)) {
        toast.error('Please Fill All The Fields!')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match!')
        return false
    }

    if (password.length < 6) {
        toast.error('Passwords must be at least 6 characters!')
        return false
    }

    return true
}

export default useSignUp
