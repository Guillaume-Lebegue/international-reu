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

export const getAllUser = async (ctx: RouterContext) => {
  try {
    const users = await User.all();
    return send(ctx, 200, { users });
  } catch (err) {
    console.error("Getting all users: ", err);
    return send(ctx, 500, "Server error");
  }
};

export const updateOffset = async (
  ctx: RouterContext,
  userId?: string,
  newOffset?: number,
) => {
  if (!userId || !newOffset) return send(ctx, 400, "Missing parameter");

  const user = await User.where("_id", userId).first();

  if (!user) {
    return send(ctx, 404, "User not found");
  }

  try {
    user.timeOffset = newOffset;
    user.save();
    return send(ctx, 200, user);
  } catch (err) {
    console.error(`Update offset, for user ${user._id}: `, err);
    return send(ctx, 500, "Server error");
  }
};
