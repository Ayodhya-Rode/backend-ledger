import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
// import emailService from "../services/email.services.js"; 

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

    // await emailService.sendRegistrationEmail(user.email,user.name)
}

/**
 * - User login controller
 * - POST /api/auth/login
 */

async function userLoginController(req,res) {
  const {email,password} = req.body;  

  // check is email already exist or not
  const user = await userModel.findOne({email}).select("+password")

  if(!user){
    return res.status(401).json({
        message: "Email or Password is Invalid"
    })
  }
  
  //if user present then check password
  const isValidPassword = await user.comparePassword(password)  //comparePassword=> method in model

   if(!isValidPassword){
    return res.status(401).json({
        message: "Email or Password is Invalid"
    })
  }

  //if email& password verify (login) => then token generate
  const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY,{expiresIn :"3d"})

    res.cookie("token",token)
 
    res.status(200).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        }
    })

}

export default {
    userRegisterController,
    userLoginController
}


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-16-digit-app-password' // Paste the code here
//   }
// });
// app password
// ixvs rbrm fnqf dfnv