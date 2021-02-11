// all the imports are done here

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 4000;

// setting the view of mvc
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


// db connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sachidanand',
  password: '',
  database: 'dbApp2'
})

db.connect((err,success)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(success)
    }
});

// routes defined here
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
    let post = {email,password};
    const sql = `INSERT INTO users SET ?`;
    db.query(sql,post,(err,result)=>{
        if(err){
            res.render('failure');
        }
        else{
            res.render('success');
        }
    })
   
    
})

app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    let sql =  `select * from users where email = "${email}" and password = "${password}"`;
    db.query(sql,(err,results)=>{
        if(err){
            res.render('failure');
        }
        else{
            res.render('success');
        }
    })
    
})

app.listen(port,()=>{console.log(`app is listening on ${port}`)});