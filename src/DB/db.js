import mongoose from "mongoose";

async function ConnectDB() {
    
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("db connected");
        })
        .catch((error) =>{
            console.log("error to connect db",error);
            processexit(1)
        })  
}


export default ConnectDB;
