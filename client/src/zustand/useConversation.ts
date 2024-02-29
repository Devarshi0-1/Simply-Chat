import { create } from 'zustand'

export type Conversation = {
    createdAt: Date
    fullName: string
    gender: string
    profilePic: string
    updatedAt: Date
    username: string
    __v: number
    _id: string
}

export type Message = {
    senderId: string
    receiverId: string
    message: string
    createdAt: Date
    updatedAt: Date
    seen: boolean
    __v: number
    _id: string
}

interface ConversationStore {
    selectedConversation: Conversation | null
    setSelectedConversation: (selectedConversation: Conversation | null) => void
    messages: Message[] | []
    setMessages: (messages: Message[] | []) => void
}

const useConversation = create<ConversationStore>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}))

export default useConversation
