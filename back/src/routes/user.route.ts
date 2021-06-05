import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { send } from "../utils.ts";

import {
  createUser,
  deleteUser,
  getAllUser,
  updateOffset,
} from "../controlers/user.controler.ts";

const router = new Router();

router.post("/", async (ctx) => {
  if (!ctx.request.hasBody) return send(ctx, 400, "Missing body");

  const body = await ctx.request.body({ type: "json" }).value;

  const { email, name, surname, timeOffset } = body;

  await createUser(ctx, { email, name, surname, timeOffset });
});

router.get("/", async (ctx) => {
  await getAllUser(ctx);
});

router.delete("/:id", async (ctx) => {
  const userId = ctx.params.id;

  await deleteUser(ctx, userId);
});

router.post("/:id/offset", async (ctx) => {
  if (!ctx.request.hasBody) return send(ctx, 400, "Missing body");

  const userId = ctx.params.id;

  const body = await ctx.request.body({ type: "json" }).value;

  const { offset } = body;

  await updateOffset(ctx, userId, offset);
});

export default router;
