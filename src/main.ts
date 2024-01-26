import { Elysia } from 'elysia'
import { Eta } from "eta";

const view_path = Bun.main + "/../templates"
const eta = new Eta({ views: view_path, cache: true}); //This is super ugly. Maybe ask someone nicely for an alternative solution
const app = new Elysia()
    .get('/', () => eta.render("./upload", { name: "Ben" }))
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)