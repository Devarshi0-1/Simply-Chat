import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Conversation } from '../zustand/useConversation'

const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [conversations, setConversations] = useState<Conversation[]>([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('/api/v1/users')

                setConversations(data.data)
            } catch (error: any) {
                if (error.response?.data?.error?.message) {
                    toast.error(error.response.data.error.message)
                    return
                }
                toast.error(error.response)
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    }, [])

    return { loading, conversations }
}
export default useGetConversations
