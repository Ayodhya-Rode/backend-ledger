import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken"

/**
* - user register controller
* - POST /api/auth/register
*/
async function userRegisterController(req,res){
    const {name,email,password} = req.body;
 
    //checks user already present or  not
    const isExist = await userModel.findOne({
        email: email
    })

    if(isExist){
        return res.status(422).json({
            message: "User already exists with this email",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email,name,password
    })

    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY,{expiresIn :"3d"})

    res.cookie("token",token)
 
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        }
    })
}

export default {
    userRegisterController
}