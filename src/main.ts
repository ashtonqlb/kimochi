import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { htmx } from "elysia-htmx";

t; // silence eslint warning for now
// import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();
const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .use(htmx())
  .get("/", () => `default`)
//   .post(
//     "/upload",
//     async ({ body }) =>
//       db.user.create({
//         data: body,
//       }),
//     {
//       body: t.Object({
//         uuid: t.String(),
//         uploader: t.String(),
//         name: t.String(),
//       }),
//     }
//   )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
