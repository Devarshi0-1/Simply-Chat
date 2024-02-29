import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'

const App = () => {
    const { authUser } = useAuthContext()

    return (
        <div className='flex h-screen items-center justify-center p-4'>
            <Routes>
                <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
                <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
                <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
            </Routes>
            <Toaster />
        </div>
    )
}

export default App

// https://youtu.be/HwCqsOis894?list=PLNlku42qGYOOkrUiTIp64l0wMy9R17ZOG&t=15267