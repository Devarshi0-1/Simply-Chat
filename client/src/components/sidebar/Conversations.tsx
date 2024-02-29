import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'
import Conversation from './Conversation'

const Conversations = () => {
    const { loading, conversations } = useGetConversations()

    return (
        <div className='flex flex-col overflow-auto py-2'>
            {conversations.map((conversation, i) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIndex={i === conversations.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner' /> : null}
        </div>
    )
}
export default Conversations
