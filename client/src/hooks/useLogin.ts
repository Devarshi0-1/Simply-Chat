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

type login = (username: string, password: string) => Promise<void>

type HandleInputErrors = (username: string, password: string) => boolean

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const login: login = async (username, password) => {
        const validationErrors: boolean = handleInputErrors(username, password)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.post<LoginSignUpData>(
                '/api/v1/auth/login',
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            toast.success(data.message)
            localStorage.setItem('chat-user', JSON.stringify(data.data))
            if (setAuthUser) setAuthUser(data.data)
        } catch (error: any) {
            if (error?.response?.data?.error?.message) {
                toast.error(error.response.data.error.message)
                return
            }
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

const handleInputErrors: HandleInputErrors = (username, password) => {
    if (isEmpty(username, password)) {
        toast.error('Please Fill All The Fields!')
        return false
    }

    return true
}

export default useLogin
