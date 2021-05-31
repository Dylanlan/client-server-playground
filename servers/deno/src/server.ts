import { Application, Router } from "./deps.ts";
import {
  createThing,
  deleteThing,
  getAllThings,
  getThing,
  updateThing,
} from "./routes.ts";
import { bold, cyan, green, yellow } from "./deps.ts";
import { oakCors } from "./deps.ts";
import { db } from "./db.ts";

const app = new Application();
const router = new Router();
const host = "localhost";
const port = 8000;

// TODO: configure CORS: https://github.com/tajpouria/cors/blob/v1.2.2/README.md
app.use(oakCors());

router.get("/", (ctx) => {
  ctx.response.body = "Hello from Deno";
})
  .get("/things", getAllThings)
  .get("/thing/:id", getThing)
  .post("/thing", createThing)
  .put("/thing/:id", updateThing)
  .delete("/thing/:id", deleteThing);

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${
      bold(
        String(rt),
      )
    }`,
  );
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Here, we are telling our application to use the router
app.use(router.routes());
app.use(router.allowedMethods());

await db.sync({ drop: true });

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(
    bold("Listening on ") + yellow(`${hostname}:${port}`),
  );
});

await app.listen({ hostname: "127.0.0.1", port: 8000 });
console.log(bold("Finished."));
