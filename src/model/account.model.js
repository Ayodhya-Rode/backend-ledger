import mongoose from "mongoose";


const accountSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        index:true, // Creates index on 'user' field to speed up queries like find({ user: id })(lightnng speed)
        required : [true, "Account must be associated with a user"]
    
    },
    status: {
        type: String,
        enum:{
            values :["ACTIVE", "FROZEN","CLOSED"],
            message:"Status can be either active, frozen or closed",
           
        },
         default:"ACTIVE"
    },
    currency:{
        type: String,
        required: [true, "Currency is required for creating account"],
        default:"INR"
    }
},{
    timestamps: true
})

/**
 * Compound Index :- Creates combined sorted index on 'user + status' for faster multi-field queries
* Speeds up search by 'user AND status' together
*/
accountSchema.index({user:1,status:1})

const accountModel = mongoose.model("account",accountSchema)

export default accountModel