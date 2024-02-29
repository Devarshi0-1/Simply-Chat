import { useSocketContext } from '../../context/SocketContext'
import useConversation, { Conversation } from '../../zustand/useConversation'

type ConversationPropTypes = {
    conversation: Conversation
    emoji: string
    lastIndex: boolean
}

const Conversation = ({ conversation, emoji, lastIndex }: ConversationPropTypes) => {
    const { selectedConversation, setSelectedConversation } = useConversation()

    const isSelected = selectedConversation?._id === conversation._id

    const { onlineUsers } = useSocketContext()

    const isOnline = onlineUsers?.includes(conversation._id)

    return (
        <>
            <div
                className={`flex cursor-pointer items-center gap-2 rounded px-2 py-2 hover:bg-sky-500 ${isSelected ? 'bg-sky-500' : ''}`}
                onClick={() => setSelectedConversation(conversation)}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full '>
                        <img src={conversation.profilePic} alt='User Avatar' />
                    </div>
                </div>
                <div className='flex flex-1 flex-col'>
                    <div className='flex justify-between gap-3'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>
            {lastIndex ? null : <div className='divider my-0 h-1 py-0' />}
        </>
    )
}
export default Conversation
