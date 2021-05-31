import { Middleware } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { decodeJwt, jwtOptions } from "../services/jwt.service.ts";

const authMiddle: Middleware = async (ctx, next) => {
  const token = ctx.request.headers
    .get(jwtOptions.header)
    ?.replace(`${jwtOptions.schema} `, "");

  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = "Unauthorized";
    return;
  }

  try {
    await decodeJwt(token);
  } catch (err) {
    console.error("Invalid auth token: ", err);
    ctx.response.status = 401;
    ctx.response.body = "Invalid token";
    return;
  }

  next();
};

export default authMiddle;
