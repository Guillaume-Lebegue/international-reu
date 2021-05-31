import { RouterContext } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { createJwt } from "../services/jwt.service.ts";
import { send } from "../utils.ts";

export const login = async (ctx: RouterContext, password: string | null) => {
  if (!password) {
    return send(ctx, 400, "Missing password");
  }

  if (password !== Deno.env.get("PASSWORD")) {
    return send(ctx, 401, "Bad password");
  }

  return send(ctx, 200, await createJwt());
};
