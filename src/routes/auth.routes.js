import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = express.Router()

/** POST /api/auth/register */
router.post("/register", authControllers.userRegisterController)

/** POST /api/auth/login */
router.post("/login",authControllers.userLoginController)


export default router