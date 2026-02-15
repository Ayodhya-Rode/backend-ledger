import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import accountControllers from "../controllers/account.controllers.js"



const router = express.Router()

/**
 * - POST /api/accounts
 * - Create a new account
 * - Protected Route
 */
router.post("/",authMiddleware.authMiddleware,accountControllers.createAccountController)

export default router