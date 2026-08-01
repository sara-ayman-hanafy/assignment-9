import { Router } from "express";
import * as userService from "./user.service.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", userService.signup);

router.post("/login", userService.login);

router.get("/", auth, userService.getUser);

router.patch("/", auth, userService.updateUser);

router.delete("/", auth, userService.deleteUser);

export default router;