import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { isEmpty } from '../utils/userValidation'
import useConversation, { Message } from '../zustand/useConversation'

type SendMessageData = {
    success: boolean
    data: Message
    message: string
    isError: boolean
    error: {
        message: string
    }
}

type sendMessage = (message: string) => Promise<void>

type HandleInputErrors = (message: string) => boolean

const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    const sendMessage: sendMessage = async (message) => {
        const validationErrors: boolean = handleInputErrors(message)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.post<SendMessageData>(
                `/api/v1/messages/send/${selectedConversation?._id}`,
                {
                    message,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            setMessages([...messages, data.data])
        } catch (error: any) {
            if (error?.response?.data?.error?.message)
                toast.error(error.response.data.error.message)
            toast.error(error.messaged)
        } finally {
            setLoading(false)
        }
    }

    return { loading, sendMessage }
}

const handleInputErrors: HandleInputErrors = (message: string) => {
    if (isEmpty(message)) {
        toast.error('Please Fill All The Fields!')
        return false
    }

    return true
}

export default useSendMessage
