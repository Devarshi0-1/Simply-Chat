import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'
import { extractTime } from '../../utils/extractTime'
import useConversation, { Message } from '../../zustand/useConversation'

type MessagePropType = {
    message: Message
}

const Message = ({ message }: MessagePropType) => {
    const { authUser } = useAuthContext()
    const { messages, setMessages, selectedConversation } = useConversation()
    const { socket } = useSocketContext()
    const [seen, setSeen] = useState<boolean>(false)

    const fromMe = authUser?._id === message?.senderId
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
    const bubbleBgColor = fromMe ? 'bg-blue-500' : ''

    useEffect(() => {
        if (!message.seen && !fromMe) {
            axios.post(`/api/v1/messages/mark-read/${message?.senderId}/${message._id}`)
        }
    }, [])

    useEffect(() => {
        socket?.on('updatedMessage', () => {
            setSeen(true)
        })

        return () => {
            socket?.off('updatedMessage')
        }
    }, [socket, setMessages, messages])

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePic} alt='Tailwind CSS chat bubble Component' />
                </div>
            </div>
            <div className={`chat-bubble ${bubbleBgColor} text-white pb-2`}>{message.message}</div>
            <div className='chat-footer flex items-center gap-1 text-xs opacity-50'>
                {extractTime(message.createdAt.toString())}{' '}
                {seen || (fromMe && message.seen) ? 'Seen' : ''}
            </div>
        </div>
    )
}

export default Message
