import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";
import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import dbService from "./src/services/db.service.ts";

import router from "./src/routes/routes.ts";

config({ export: true });

dbService.connect();
const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", (app) => {
  console.info(`Server started on ${app.port}`);
});

const port = Number(Deno.env.get("PORT")) || 3000;
await app.listen({
  port,
});
