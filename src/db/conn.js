const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/secondapp",{
    
}).then(()=>{
    console.log(`connection is sucessful`);
}).catch((e)=>{
    console.log("no connection")
})