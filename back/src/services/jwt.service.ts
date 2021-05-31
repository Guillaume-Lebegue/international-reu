import {
  create,
  getNumericDate,
  verify,
} from "https://deno.land/x/djwt@v2.2/mod.ts";

type Algo = "HS256";

export const jwtOptions = {
  header: "Authorization",
  schema: "Bearer",
  expiration: 60 * 60 * 24,
  key: Deno.env.get("JWTSECRET") || "secret",
  alg: "HS256" as Algo,
};

export const createJwt = () =>
  create({ alg: jwtOptions.alg, type: "JWT" }, {
    exp: getNumericDate(jwtOptions.expiration),
  }, jwtOptions.key);

export const decodeJwt = async (token: string): Promise<void> => {
  await verify(token, jwtOptions.key, jwtOptions.alg);
};
