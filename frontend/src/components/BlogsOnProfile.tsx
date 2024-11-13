
import BlogCard from "./BlogCard"
import { deleteBlog } from "../requests"
import Loading from "./Loading"
import Error from "./Error"
import NoUploads from "./NoUploads"
import DeleteIcon from "./DeleteIcon"

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
        <div className=" md:pb-4 flex flex-col items-center ">
            <div className="min-w-full border-b-2 px-8 py-4 flex flex-col justify-center items-center ">
                { blogs  && blogs?.length > 0 ? (
                    blogs?.map((blog) => (
                        <div className="min-w-full border-b flex justify-between">
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                publishedDate={blog.created_at}
                                title={blog.title}
                            />
                            <button 
                            onClick={() => clickHandler(blog.id)}
                            title="delete">
                                <DeleteIcon />
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
