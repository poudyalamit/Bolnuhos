const mongoose=require("mongoose");

const ConnectToDB=()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit();
    }
}

module.exports=ConnectToDB;