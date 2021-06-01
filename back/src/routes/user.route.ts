import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { send } from "../utils.ts";

import { createUser } from "../controlers/user.controler.ts";

const router = new Router();

router.post("/", async (ctx) => {
  if (!ctx.request.hasBody) return send(ctx, 400, "Missing body");

  const body = await ctx.request.body({ type: "json" }).value;

  const { email, name, surname, timeOffset } = body;

  await createUser(ctx, { email, name, surname, timeOffset });
});

export default router;
