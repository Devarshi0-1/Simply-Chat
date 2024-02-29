import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

interface AuthContextProps {
    children: ReactNode
}

export type User = {
    _id: string
    username: string
    fullName: string
    gender: string
    profilePic: string
    password?: string
} | null

interface AuthUserContext {
    authUser: User
    setAuthUser: Dispatch<SetStateAction<User>>
}

const AuthContext = createContext<Partial<AuthUserContext>>({})

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<User>(
        JSON.parse(localStorage.getItem('chat-user')!),
    )

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
