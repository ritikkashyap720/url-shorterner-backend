const mongoose = require("mongoose")

async function connectDatabase(URL){
    try {
        await mongoose.connect(URL)
        
    } catch (error) {
        console.log("MongoDb error : ",error)
    }
}

module.exports = connectDatabase