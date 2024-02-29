import { useEffect, useRef } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import Message from './Message'

const Messages = () => {
    const { loading, messages } = useGetMessages()
    const lastMessageRef = useRef<HTMLDivElement>(null)
    useListenMessages()
    
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 0)
    }, [messages])

    return (
        <div className='flex-1 overflow-auto px-4'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(4)].map((_, i) => <MessageSkeleton key={i} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start a conversation!</p>
            )}
        </div>
    )
}
export default Messages
