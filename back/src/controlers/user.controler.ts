import { RouterContext } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import User, { JsonUser } from "../models/user.model.ts";
import { send } from "../utils.ts";

export const createUser = async (ctx: RouterContext, newUser: JsonUser) => {
  if (
    !newUser.email || !newUser.name || !newUser.surname ||
    newUser.timeOffset === undefined || !newUser.timezone
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
  user.timezone = newUser.timezone;

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

export const deleteUser = async (ctx: RouterContext, userId?: string) => {
  if (!userId) return send(ctx, 400, "Missing parameter");

  try {
    const user = await User.where("_id", userId).first();

    if (!user) return send(ctx, 404, "User not found");

    await user.delete();
    return send(ctx, 200, "OK");
  } catch (err) {
    console.error(`delete user: ${userId}: `, err);
    return send(ctx, 500, "Server error");
  }
};

export const updateOffset = async (
  ctx: RouterContext,
  userId?: string,
  newOffset?: number,
  newTimezone?: string,
) => {
  if (!userId || !newOffset || !newTimezone) {
    return send(ctx, 400, "Missing parameter");
  }

  const user = await User.where("_id", userId).first();

  if (!user) {
    return send(ctx, 404, "User not found");
  }

  try {
    user.timeOffset = newOffset;
    user.timezone = newTimezone;
    user.save();
    return send(ctx, 200, user);
  } catch (err) {
    console.error(`Update offset, for user ${user._id}: `, err);
    return send(ctx, 500, "Server error");
  }
};
