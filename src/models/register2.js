const mongoose= require('mongoose');

const feesSubmit = new mongoose.Schema({

    fullname:{
        type:String,
    },
    classname:{
        type:String,

    },
    email:{
        type:String,
        
        unique:true

    },
    fees:{
        type:String,
        required:true,
    }

})

const Fees = new mongoose.model("Shukla",feesSubmit);

module.exports = Fees;