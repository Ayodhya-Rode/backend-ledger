import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";

const transactionRouter = Router()

transactionRouter.post("/", authMiddleware.authMiddleware)



export default transactionRouter;