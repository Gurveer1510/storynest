import { Hono } from "hono";
import userRoute from "./routes/user";
import { cors } from "hono/cors";
import blogRoute from "./routes/blog";

import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET : string
  },
  Variables: {
    user_id: any | string;
    prisma: any
  }
}>();



app.use("/*", cors());


app.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  c.set("prisma", prisma)
  await next()
})




app.route("/api/v1/user", userRoute);

app.route("/api/v1/blog", blogRoute);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
