import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation, { Message } from '../zustand/useConversation'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        socket?.on('newMessage', (newMessage: Message) => {
            if (selectedConversation?._id === newMessage.senderId)
                return setMessages([...messages, newMessage])
        })

        return () => {
            socket?.off('newMessage')
        }
    }, [socket, setMessages, messages])
}

export default useListenMessages
