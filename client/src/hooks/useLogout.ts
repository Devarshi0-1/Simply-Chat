import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

type LogOutData = {
    success: boolean
    data: null
    message: string
    isError: boolean
    error: {
        message: string
    }
}

type logout = () => Promise<void>

const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const logout: logout = async () => {
        setLoading(true)
        try {
            await axios.post<LogOutData>(
                '/api/v1/auth/logout',
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            )

            localStorage.removeItem('chat-user')
            if (setAuthUser) setAuthUser(null)
        } catch (error: any) {
            if (error.response?.data?.error?.message) {
                toast.error(error.response.data.error.message)
                return
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}
export default useLogout
