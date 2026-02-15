import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken"


async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
     return res.status(401).json({ message: "Unauthorized access, token is missing" })
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
       const user = await userModel.findById(decoded.userId)    //cookie's data
       req.user = user
        return next()
    } catch (err) {
       return res.status(401).json({
        message: "Unauthorized access, invalid token"
       }) 
    }
}

export default {
    authMiddleware
}