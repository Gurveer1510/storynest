import { Hono } from "hono";
import hashPassword, { verifyPassword } from "../utils/helper";
import { Jwt } from "hono/utils/jwt";
import { signUpInput, signInInput } from "@gurveer1510/inkspot-common"

const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    prisma: any
  }
}>();

userRoute.post("/signup", async (c) => {

  const prisma = c.get('prisma')
  const body = await c.req.json();
  try {
    const { success } = signUpInput.safeParse(body)
    if (!success) {
      return c.json({
        msg: "inputs not correct"
      }, 400)
    }
    const hashedPassword = await hashPassword(body.password)
    const account = await prisma.user.create({
      data: {
        email: body.email,
        name: body.username,
        password: hashedPassword,
      },
    });
    if (account) {
      const jwt = await Jwt.sign({
        id: account.id
      }, c.env.JWT_SECRET)
      return c.json(
        {
          userId: account.id,
          token: jwt,
          name: account.name
        },
        201
      );
    }
  } catch (error) {
    console.log(`error while creating a user ${error}`);

    return c.json({
      msg: "Account creation failed, email already in use."
    }, 403);
  } finally {
    prisma.$disconnect()
  }

});

userRoute.get("/:id", async(c) => {
  const prisma = c.get("prisma")
  const param = c.req.param("id")
  const blogs = await prisma.user.findMany({
    where:{
      id: param
    },
    select:{
      posts: true
    }
  })

  return c.json(blogs, 200)
})

userRoute.post("/signin", async (c) => {

  const prisma = c.get("prisma")
  const body = await c.req.json()

  try {
    const { success } = signInInput.safeParse(body)
    if (!success) {
      return c.json({
        msg: "inputs not correct"
      }, 400)
    }
    const account = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })


    if (account) {
      const passwordMatch = await verifyPassword(body.password, account.password)
      if (passwordMatch) {
        const jwt = await Jwt.sign({
          id: account.id
        }, c.env.JWT_SECRET)
        return c.json({
          userId: account.id ,
          token: jwt,
          name: account.name
        }, 200)
      }

    } else {
      return c.json({
        error: "user not found"
      }, 403)
    }
  } catch (error) {
    return c.json({
      error: "sign in failed"
    }, 500)
  }

});

export default userRoute;
