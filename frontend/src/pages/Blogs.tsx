import BlogCard from "../components/BlogCard"
import AppBar from "../components/AppBar"
import { useBlogs } from "../hooks/useBlog"
import Skeleton from "../components/Skeleton"
import NotLoggedIn from "../components/NotLoggedIn"

// interface useBlogTypes {
//     loading : Boolean
//     error: Boolean
//     blogs: any[]
// }
function Blogs() {
    const { loading, error, blogs } = useBlogs()



    if (loading) {

        return <div className="w-screen">
            <AppBar />
            <div className="w-full flex flex-col items-center">
                < Skeleton />
                < Skeleton />
                < Skeleton />
                < Skeleton />
                < Skeleton />
            </div>
        </div>
    }
    if (error) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <NotLoggedIn />
            </div>
        )
    }

    if (blogs.length == 0) {
        return <div className="text-center font-xl font-custom">
            <AppBar />
            No Blogs created yet
        </div>
    }

    return (
        <div>
            <AppBar />
            {
                blogs.map((blog: any) => {
                    return (
                        <div key={blog.id}>
                            <BlogCard id={blog.id}
                                title={blog.title}
                                content={blog.content}
                                authorName={blog.author.name}
                                publishedDate={blog.created_at || ""}
                            />

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Blogs