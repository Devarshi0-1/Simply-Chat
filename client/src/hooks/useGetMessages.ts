import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useConversation, { Message } from '../zustand/useConversation'

type MessagesData = {
    success: boolean
    data: Message[]
    message: string
    isError: boolean
    error: {
        message: string
    }
}

type getMessages = () => Promise<void>

const useGetMessages = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        const getMessages: getMessages = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get<MessagesData>(
                    `/api/v1/messages/${selectedConversation?._id}`,
                )

                setMessages(data.data)
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

        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages])

    return { loading, messages }
}

export default useGetMessages
