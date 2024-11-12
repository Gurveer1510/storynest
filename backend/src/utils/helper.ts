
import { Jwt } from "hono/utils/jwt"



const encodeTo64 = (arrayBuffer : ArrayBuffer) =>{
    return btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
    )
}

const hashPassword = async(password: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    return encodeTo64(hashBuffer)
}

export const verifyPassword = async(password: string, storedHash: string) => {
    const hash = await hashPassword(password)
    return hash === storedHash
}

export const tokenVerification = async(token :string | any, secret: string) => {
    try {
      const payload = await Jwt.verify(token, secret )
      return payload
    } catch (error) {
      return {
        msg: "bearer autorizaion not valid"
      }
    }
  }
  

export default hashPassword
