const express= require('express');
const path = require('path')
const app= express();
require("./db/conn")
const hbs= require('hbs');
const auth= require("./models/auth")
const Fees = require("./models/register2");
const Register= require("./models/registers");
const { json } = require("express")
const cookieParser= require("cookie-parser")
const port=process.env.PORT || 3000;


const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("index.hbs")
});
app.get("/home",(req,res)=>{
    res.render("home.hbs")
})
app.get("/register",(req,res)=>{
    res.render("register")
});

app.post("/register", async (req,res)=>{
    try{

        const registerStudent = new Register({
            firstname : req.body.firstname,
            lastname: req.body.lastname,
            classname: req.body.classname,
            email: req.body.email,
           
            phonenumber: req.body.phonenumber,
            
           
        })
        console.log("the success part" + registerStudent);
        const token = await registerStudent.generateAuthToken();

       
       const registered= await registerStudent.save();
       res.status(201).render("register" )

    }catch (error){
        res.status(400).send(error);
    }
    
});

app.get("/logout", (req, res)=>{
    res.render("index")


})

app.get("/gallery",(req,res)=>{
    res.render("gallery")
})

app.get("/FeeSubmit",(req,res)=>{
    res.render("fees")
})
    
    
app.post("/feesubmit", async(req,res)=>{

    try{
        const registerMsg = new Fees({
            fullname : req.body.fullname,
            classname : req.body.classname,
            email : req.body.email,
            fees : req.body.fees,
        })
        const registeredd= await registerMsg.save();
        res.status(201).render("fees" )
    }catch(error){
        res.status(400).send(error);

    }


})


app.listen(port,()=>{
    console.log(`server is running at the ${port}`);
})