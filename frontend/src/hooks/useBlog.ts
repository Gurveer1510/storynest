import { useState, useEffect } from "react";
import axios from "axios";


// interface BlogType {
//     title: string
//     content: string
//     created_at : string
//     author: {
//         name:{
//             type: string
//         }
//     }
// }
// interface useBlogTypes {
//     blogs: BlogType[]
// }

const useBlogsOfUser = (id: string) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [blogs, setBlogs] = useState<[] | undefined>([])

    useEffect(() => {
        const getBlogs = async (id: string) => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${id}`,{
                    headers: {
                        "Authorization" : localStorage.getItem("token")
                    }
                })
                if(response.data){
                    setBlogs(response.data[0].posts)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        getBlogs(id)
    }, [id])
    return {loading, error, blogs}
}

function useBlogs(){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {

        const getBlogs =  async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,{headers:{
                    "Authorization" : localStorage.getItem("token")
                }})
                if(response.data){
                    setBlogs(response.data)
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            } finally{
                setLoading(false)
            }
        }

        getBlogs()
    } ,[])

    return {loading, error, blogs}
}

function useBlogSingle({id}: {id:string}){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [blog, setBlog] = useState({
        title: "",
        content: "",
        created_at: "",
        author: {
            name: "",
            id: ""
        }
    })

    useEffect(() => {

        const getBlogs =  async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,{headers:{
                    "Authorization" : localStorage.getItem("token")
                }})
                if(response.data){
                    setBlog(response.data)
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            } finally{
                setLoading(false)
            }
        }

        getBlogs()
    } ,[])

    return {loading, error, blog}
}



export  {
    useBlogs,
    useBlogSingle,
    useBlogsOfUser
}