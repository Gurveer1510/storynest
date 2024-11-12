import { useBlogsOfUser } from '../hooks/useBlog'
import LogOut from '../components/LogOut'
import { useParams, useNavigate } from 'react-router-dom'
import BlogsOnProfile from '../components/BlogsOnProfile'
import AppBar from '../components/AppBar'

const Profile = () => {
    const { userId } = useParams()
    const { loading, error, blogs } = useBlogsOfUser(userId!!)
    const navigate = useNavigate()

    const refresh = () => {
        navigate(0)
    }
    return (
        <>
            <AppBar />
            <div className='w-screen mt-4'>
                    <div className='px-12 text-xl md:text-3xl font-bold '>
                        <p>
                            {localStorage.getItem("username")}
                        </p>
                    </div>
                <div className='w-screen p-12 pt-2 md:pt-4'>
                    <div>
                        <div className="pb-2 md:pb-4 self-start text-xl font-semibold border-b-2">
                            Your stories: {blogs && blogs?.length > 0 ? blogs?.length : 0}
                        </div>
                        <BlogsOnProfile
                            refreshFunc={refresh}
                            loading={loading}
                            error={error}
                            blogs={blogs}
                        />
                    </div>
                    <LogOut />
                </div>
            </div>
        </>
    )
}

export default Profile
