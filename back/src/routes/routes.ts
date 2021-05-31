import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import errorMiddle from "../midlewares/error.middle.ts";

import authRoute from "./auth.route.ts";
import { send } from "../utils.ts";

const router = new Router();

router.use(errorMiddle);

router.use("/api/auth", authRoute.routes(), authRoute.allowedMethods());

export default router;
