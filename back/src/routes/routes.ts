import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import errorMiddle from "../midlewares/error.middle.ts";

import authRoute from "./auth.route.ts";
import userRoute from "./user.route.ts";

const router = new Router();

router.use(errorMiddle);

router.use("/api/auth", authRoute.routes(), authRoute.allowedMethods());
router.use("/api/user", userRoute.routes(), userRoute.allowedMethods());

export default router;
