const mongoose = require("mongoose")
const DatabaseCon = mongoose.connect("mongodb+srv://schoolmanager:school123@schoolcluster.py2czfw.mongodb.net/school?retryWrites=true&w=majority&appName=Schoolcluster")
.then(()=>console.log("Database Connected Successfully"))
.catch((error)=>console.log("Unable to establish a connection",error))
module.exports = {
    DatabaseCon
}