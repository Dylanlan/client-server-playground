import { Application, Router } from "./deps.ts";
import {
  createThing,
  deleteThing,
  getAllThings,
  getThing,
  updateThing,
} from "./routes.ts";
import { bold, cyan, green, yellow } from "./deps.ts";

const app = new Application();
const router = new Router();
const host = "localhost";
const port = 8000;

router.get("/", (ctx) => {
  ctx.response.body = "Hello from Deno";
})
  // these functions does not exist yet, we will create them later
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
// app.listen({ port });
// console.log(`Server is running on port ${port}`);

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: " + yellow(serverType)));
});

await app.listen({ hostname: "127.0.0.1", port: 8000 });
console.log(bold("Finished."));
