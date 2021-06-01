import { RouterContext } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import User, { JsonUser } from "../models/user.model.ts";
import { send } from "../utils.ts";

export const createUser = async (ctx: RouterContext, newUser: JsonUser) => {
  if (
    !newUser.email || !newUser.name || !newUser.surname || !newUser.timeOffset
  ) {
    return send(ctx, 400, "Missing parameter");
  }

  const exist = await User.where("email", newUser.email).first();

  if (exist) return send(ctx, 400, "Email already in use");

  const user = new User();
  user.email = newUser.email;
  user.name = newUser.name;
  user.surname = newUser.surname;
  user.timeOffset = newUser.timeOffset;

  try {
    const created = await user.save();
    return send(ctx, 200, created);
  } catch (err) {
    console.error("Creating user: ", err);
    return send(ctx, 500, "Server error");
  }
};
