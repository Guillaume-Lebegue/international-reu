import { Context } from "https://deno.land/x/oak@v7.5.0/mod.ts";

export const send = (
  ctx: Context,
  status: number,
  body: string,
): void => {
  ctx.response.status = status;
  ctx.response.body = body;
  return;
};
