import axios from "axios"
import { SignUpType } from "@gurveer1510/inkspot-common"
import { toast } from "react-toastify"


export const deleteBlog = async (id: string) => {
    try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
    } catch (error) {
        console.log("blog delete error", error)
    }
}

export const postAccount = async (inputs: SignUpType, type: string) => {

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type == "SignIn" ? "signin" : "signup"}`,
            inputs,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const { token, userId, name } = response.data;
        if (!token) throw Error;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId)
        localStorage.setItem("username", name)

    } catch (error) {
        toast.error("👎 invalid inputs!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
}