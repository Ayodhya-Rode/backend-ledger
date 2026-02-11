import dotenv from "dotenv";
dotenv.config()

import app from "./src/app.js";
import ConnectDB from "./src/DB/db.js";
ConnectDB()


app.listen(3000, ()=>{
    console.log("server started...");
    
})