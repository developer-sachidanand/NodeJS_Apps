// all imports done here
const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const ejs = require('ejs');
const PORT = 4000;
const app = express();
const User = require("./models/user");

// front-end setup
app.use(express.static('public'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

// database connection setup
mongoose.connect('mongodb://localhost:27017/dbApp1',{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true
}).then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log(err.message);
})

// get routes here
app.get("/",(req,res)=>{
    res.render('home');
})

app.get("/signup",(req,res)=>{
    res.render('signup');
})

app.get("/login",(req,res)=>{
    res.render('login');
})

// post routes here

app.post('/signup',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email:email,password:password
    });
    newUser.save((err,result)=>{
        if(err){
            res.status(401).render("failure");
        }else{
            res.status(200).render("success");
        }
    })
})

app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email,password:password})
    .then((success)=>{
        res.status(200).render('success')
    })
    .catch((err)=>{
        res.status(400).render('failure');
        console.log(err.message);
    })
})

// started the server
app.listen(PORT,()=>{console.log(`app is listening on port ${PORT}`)});