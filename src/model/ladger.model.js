import mongoose from "mongoose";

const ladgerSchema = mongoose.Schema({
    account :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Ledger must be associated with an account"],
        index:true,
        immutable: true,
    },
    amount :{
        type: Number,
        required: [true, "Amount is required for ledger entry"],
        immutable: true,
    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "Ledger must be associated with a transaction"],
        index:true,
        immutable: true,
    },
    type:{
        type: String,
        enum:{
            values :["DEBIT", "CREDIT"],
            message:"Ledger type can be either debit or credit",
        },
        required: [true, "Ledger type is required"],
        immutable: true,
    }
})

function preventLedgerModification(){
    throw new Error("Ledger entries cannot be modified or deleted once created")
}
ladgerSchema.pre("findOneAndUpdate", preventLedgerModification)
ladgerSchema.pre("remove", preventLedgerModification)
ladgerSchema.pre("deleteOne", preventLedgerModification)
ladgerSchema.pre("deleteMany", preventLedgerModification)
ladgerSchema.pre("updateOne", preventLedgerModification)
ladgerSchema.pre("updateMany", preventLedgerModification)
ladgerSchema.pre("findOneAndDelete", preventLedgerModification)
ladgerSchema.pre("findOneAndReplace", preventLedgerModification)


const ladgerModel = mongoose.model("ladger", ladgerSchema)

export default ladgerModel