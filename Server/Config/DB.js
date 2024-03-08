const mongoose = require("mongoose")
const DatabaseCon = mongoose.connect("mongodb://127.0.0.1:27017/Chat")
.then(()=>console.log("Database Connected Successfully"))
.catch((error)=>console.log("Unable to establish a connection",error))
module.exports = {
    DatabaseCon
}