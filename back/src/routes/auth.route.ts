import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { login } from "../controlers/auth.controler.ts";

const router = new Router();

router.post("/login", async (ctx) => {
  const password = ctx.request.hasBody
    ? (await ctx.request.body({ type: "json" }).value)?.password
    : undefined;

  await login(ctx, password);
});

export default router;
