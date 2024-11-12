import { z } from "zod"

export const signUpInput = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string()
})

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type SignUpType = z.infer<typeof signUpInput>
export type SignInType = z.infer<typeof signInInput>
export type CreateBlogType = z.infer<typeof createBlogInput>
export type uypdateBlogType = z.infer<typeof updateBlogInput>