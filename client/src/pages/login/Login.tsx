import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { loading, login } = useLogin()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <div className='mx-auto flex min-w-96 flex-col items-center justify-center'>
            <div className='w-full rounded-lg bg-gray-400 bg-opacity-0 bg-clip-padding p-6 shadow-md backdrop-blur-lg backdrop-filter'>
                <h1 className='text-center text-3xl font-semibold text-gray-300'>
                    Login
                    <span className='text-blue-500'> Chat App</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2' htmlFor='loginUsername'>
                            <span className='label-text text-base'>Username</span>
                        </label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            type='text'
                            placeholder='Enter Username'
                            id='loginUsername'
                            className='input input-bordered h-10 w-full'
                            required
                        />
                    </div>
                    <div>
                        <label className='label p-2' htmlFor='loginPassword'>
                            <span className='label-text text-base'>Password</span>
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            placeholder='Enter Password'
                            id='loginPassword'
                            className='input input-bordered h-10 w-full'
                            required
                        />
                    </div>
                    <Link
                        to='/signup'
                        className='link mt-2 inline-block text-sm hover:text-blue-600 hover:underline'>
                        Don't have an account?
                    </Link>
                    <div>
                        <button disabled={loading} className='btn btn-block btn-sm mt-2'>
                            {loading ? <span className='loading loading-spinner'></span> : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
