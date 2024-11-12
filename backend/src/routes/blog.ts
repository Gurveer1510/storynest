import { Hono } from "hono";
import { tokenVerification } from "../utils/helper";
import { createBlogInput, updateBlogInput } from "@gurveer1510/inkspot-common";


const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        user_id: string | any
        prisma: any
    }
}>()


blogRoute.use("/*", async (c, next) => {
    const data = await tokenVerification(c.req.header("authorization")?.replace("Bearer ", ""), c.env.JWT_SECRET)
    if (data.id) {
        console.log(data.id);

        c.set("user_id", data.id)

        await next()
    } else {
        return c.json(data, 403)
    }
})


blogRoute.get('/bulk', async (c) => {

    const prisma = c.get("prisma")
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            created_at: true,
            author: {
                select: {
                    name: true,

                }
            }
        }
    })
    return c.json(blogs, 200)
})

blogRoute.post("/", async (c) => {

    const prisma = c.get("prisma")
    const body = await c.req.json()
    try {
        const { success } = createBlogInput.safeParse(body)
        if (!success) {
            return c.json({
                msg: "inputs not correct"
            }, 400)
        }
        const userId = c.get('user_id')


        const { title, content } = body

        const blog = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author_id: userId
            }
        })

        return c.json(blog, 201)
    } catch (error) {
        console.log(error)
        return c.json({}, 500)
    }

})

blogRoute.put('/', async (c) => {

    try {
        const prisma = c.get("prisma")
        const body = await c.req.json()
        const { success } = updateBlogInput.safeParse(body)
        if (!success) {
            return c.json({
                msg: "inputs not correct"
            }, 400)
        }
        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id,
                author_id: c.get("user_id")
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json(updatedBlog, 200)
    } catch (error) {
        return c.json({
            msg: "not the original author of the article"
        }, 403)
    }
})

blogRoute.get('/:id', async (c) => {

    const prisma = c.get("prisma")
    const param = c.req.param("id")
    const blog = await prisma.post.findUnique({
        where: {
            id: param,
        },
        select: {
            id: true,
            title: true,
            content: true,
            created_at: true,
            author: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })
    return c.json(blog, 200)
})

blogRoute.delete("/:id", async(c) => {
    const prisma = c.get("prisma")
    const param = c.req.param("id")
    try {
        await prisma.post.delete({
            where:{
                id: param
            }
        })

        c.json("", 200)
    } catch (error) {
        c.json({
            error: "Something went wrong"
        }, 500)
    }
})

export default blogRoute