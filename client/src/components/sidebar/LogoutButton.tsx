import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {
    const { loading, logout } = useLogout()

    return (
        <div className='mt-auto'>
            {loading ? (
                <span className='loading loading-spinner'></span>
            ) : (
                <BiLogOut onClick={logout} className='h-6 w-6 cursor-pointer text-white' />
            )}
        </div>
    )
}
export default LogoutButton
