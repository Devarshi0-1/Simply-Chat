import { useEffect } from 'react'
import { TiMessages } from 'react-icons/ti'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation()

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [])

    return (
        <div className='flex flex-col md:min-w-[450px]'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className='mb-2 bg-slate-500 px-4 py-2'>
                        <span className='label-text'>To: </span>
                        <span className='font-bold text-gray-900'>
                            {selectedConversation.fullName.split(' ')[0]}
                        </span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}

const NoChatSelected = () => {
    const { authUser } = useAuthContext()
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='flex flex-col items-center gap-2 px-4 text-center font-semibold text-gray-200 sm:text-lg md:text-xl'>
                <p>Welcome👋 {authUser?.fullName.split(' ')[0]} ❄️</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-center text-3xl md:text-6xl' />
            </div>
        </div>
    )
}

export default MessageContainer
