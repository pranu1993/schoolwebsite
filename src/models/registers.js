
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema= new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true

    },

    classname:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        Unique : true
      

    },
   
    phonenumber: {
        type:Number,
        required:true,
        unique: true

    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
 
})


studentSchema.methods.generateAuthToken = async function ()
{
    try{
        const token = jwt.sign({_id:this._id.toString()},"mynameispraneshkumarshuklwebdeveloper")
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch(error){
        res.send("the error part "+ error);
        console.log(res.send("the error part" + error));

    }
}
const Register= new mongoose.model("Pranu", studentSchema); 
module.exports= Register;