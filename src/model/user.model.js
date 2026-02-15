import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
   email:{
    type : String,
    required : [true, "Email is required for creating a User"],
    trim : true,
    lowercase : true,
    unique : [true, "email already exist"],
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invalid email address"   ]
   } ,
   name:{
    type : String,
    required : [true, "Name is required for creating a account"],
   },
   password:{
    type: String,
    required : [true, "Password is requird for creating an account"],
    minlength: [6, "password should be more than 6 charcters"],
    select : false  
    }
},{
    timestamps : true
})


// if user edit password then before saving that password this will run
userSchema.pre("save", async function () {
    

    if(!this.isModified("password")){   //check user change password or not
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10)   // if change, convert new password to hash and save it in db
    this.password = hash

    return 
})

userSchema.methods.comparePassword = async function(password) {
    console.log(password, this.password);
    
    return await bcrypt.compare(password, this.password)    // checks hash & user input password is same or not
}

const userModel =mongoose.model("user", userSchema);

export default userModel;