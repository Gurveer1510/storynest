
import BlogCard from "./BlogCard"
import { deleteBlog } from "../requests"
import Loading from "./Loading"
import Error from "./Error"
import NoUploads from "./NoUploads"

interface BlogType {
    id: string
    title: string
    content: string
    published: boolean
    author_id: string
    created_at: string
}

interface BlogsOnProfileProps {
    loading: boolean
    error: boolean
    blogs: BlogType[] | undefined
    refreshFunc: () => {} | void
}

const BlogsOnProfile: React.FC<BlogsOnProfileProps> = ({
    loading,
    error,
    blogs,
    refreshFunc
}) => {

    const clickHandler = async (id: string) => {
        await deleteBlog(id)
        refreshFunc()
    }

    if (loading) {
        return (
            <div className="w-full flex justify-center">
                <Loading />
            </div>
        )
    }
    if (error) {
        return (
            <div className="w-full flex justify-center">
                <Error />
            </div>
        )
    }
    return (
        <div className="pb-2 md:pb-4 flex flex-col items-center border-b-2">
            <div className="px-8 py-4 flex flex-col justify-center items-center ">
                { blogs  && blogs?.length > 0 ? (
                    blogs?.map((blog) => (
                        <div className=" flex">
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                publishedDate={blog.created_at}
                                title={blog.title}
                            />
                            <button 
                            onClick={() => clickHandler(blog.id)}
                            title="delete">
                                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="28px" height="28px" viewBox="0 0 408.483 408.483" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path> <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path> </g> </g> </g></svg>
                            </button>
                        </div>
                    ))
                ) : <NoUploads />
                    
                }
            </div>
        </div>
    )
}

export default BlogsOnProfile
