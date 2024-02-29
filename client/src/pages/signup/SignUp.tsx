import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import useSignUp from './../../hooks/useSignUp'
import GenderCheckBox from './GenderCheckBox'

type Gender = 'male' | 'female' | ''

const SignUp = () => {
    const [fullName, setFullName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [gender, setGender] = useState<Gender>('')

    const { loading, signUp } = useSignUp()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signUp(fullName, username, password, confirmPassword, gender)
    }

    return (
        <div className='mx-auto flex min-w-96 flex-col items-center justify-center'>
            <div className='w-full rounded-lg bg-gray-400 bg-opacity-0 bg-clip-padding p-6 shadow-md backdrop-blur-lg backdrop-filter'>
                <h1 className='text-center text-3xl font-semibold text-gray-300'>
                    Sign Up
                    <span className='text-blue-500'> Chat App</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2' htmlFor='signUpFullName'>
                            <span className='label-text text-base'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            id='signUpFullName'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className='input input-bordered h-10 w-full'
                            required
                        />
                    </div>
                    <div>
                        <label className='label p-2' htmlFor='signUpUsername'>
                            <span className='label-text text-base'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            id='signUpUsername'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='input input-bordered h-10 w-full'
                            required
                        />
                    </div>
                    <div>
                        <label className='label p-2' htmlFor='signUpPassword'>
                            <span className='label-text text-base'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            id='signUpPassword'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='input input-bordered h-10 w-full'
                            required
                        />
                    </div>
                    <div>
                        <label className='label p-2' htmlFor='signUpConfirmPassword'>
                            <span className='label-text text-base'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            id='signUpConfirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='input input-bordered h-10 w-full'
                            required
                        />
                    </div>
                    <GenderCheckBox gender={gender} setGender={setGender} />
                    <Link
                        to='/login'
                        className='link mt-2 inline-block text-sm hover:text-blue-600 hover:underline'>
                        Already have an account?
                    </Link>
                    <div>
                        <button disabled={loading} className='btn btn-block btn-sm mt-2'>
                            {loading ? (
                                <span className='loading loading-spinner'></span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignUp
