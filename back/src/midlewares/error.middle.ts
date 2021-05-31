import { Middleware } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { send } from "../utils.ts";

const errorMiddle: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.message) {
      case "Not found":
        return send(ctx, 404, "Not found");
      default:
        console.error("Error middleware: ", err);
        return send(ctx, 500, "Internal Server Error");
    }
  }
};

export default errorMiddle;
