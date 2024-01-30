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
   // Really basic map of the application. None of this will stay
  .get("/", () => Bun.file('public/pages/upload.html'))
  .get("/report", () => Bun.file('public/pages/report.html'))
  .get("/banned", () => Bun.file('public/pages/banned.html'))
  .get("/uuid", () => Bun.file('public/pages/download.html'))
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
