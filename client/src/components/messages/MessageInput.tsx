import { FormEvent, useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
    const [message, setMessage] = useState<string>('')
    const { loading, sendMessage } = useSendMessage()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await sendMessage(message)
        setMessage('')
    }

    return (
        <form className='my-3 px-4' onSubmit={handleSubmit}>
            <div className='relative w-full'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type='text'
                    className='block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white'
                    placeholder='Send a message'
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {loading ? <span className='loading loading-spinner' /> : <BsSend />}
                </button>
            </div>
        </form>
    )
}
export default MessageInput
