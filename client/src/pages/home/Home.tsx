import MessageContainer from '../../components/messages/MessageContainer'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
    return (
        <div className='flex overflow-hidden rounded-lg bg-gray-400 bg-opacity-0 bg-clip-padding backdrop-blur-lg backdrop-filter sm:h-[450px] md:h-[550px]'>
            <Sidebar />
            <MessageContainer/>
        </div>
    )
}
export default Home
