import { useBlogSingle } from '../hooks/useBlog'
import FullBlog from '../components/FullBlog'
import { useParams } from 'react-router-dom'
import AppBar from '../components/AppBar'
import Skeleton from '../components/Skeleton'

function Blog() {
  const {id}   = useParams()
  const {loading, error, blog}  = useBlogSingle({id: id || ""})

  if(loading){

    return <div className='w-screen'>
        <AppBar />
        <div className=" w-full flex flex-col items-center">
        < Skeleton />
        < Skeleton />
        < Skeleton />
        < Skeleton />
        < Skeleton />
    </div>
    </div>
}

  if(error) return <div>Error</div>
  return (
    <div>
      
      <FullBlog 
        title={blog.title}
        content={blog.content}
        authorName={blog.author.name}
        authorId={blog.author.id}
        publishedDate={blog.created_at}
      />
    </div>
  )
}

export default Blog