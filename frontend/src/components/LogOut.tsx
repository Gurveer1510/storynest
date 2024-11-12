import { logout } from "../requests"
import { useNavigate } from "react-router-dom"

const LogOut = () => {
    const navigate = useNavigate()
    const clickHandler = () =>{
        logout()
        navigate("/")
    }
    return (
        <button onClick={clickHandler} className={`h-fit mt-6 px-4 md:px-6 py-2 text-lg bg-black text-white rounded-lg hover:bg-slate-800 disabled:cursor-not-allowed `}>Log out</button>
    )
}

export default LogOut