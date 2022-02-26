const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { append } = require('express/lib/response');
const Connection = require('mysql/lib/Connection');
const { param } = require('express/lib/router');
const PORT = 5000;
const app = express();
  
app.use(bodyParser.json())
// creating the connectionto the database
const database = mysql.createConnection({
    host : "//insert the localhost",
    user : "//insert the username",
    password : "//insert your password",
    database : "rca",
    
})

database.connect((error )=>{
    if(error) throw error
    
    console.log('Database is connected....');
})


//reading data in the database
app.get('/student/:id' ,   (req , res)=>{
    database.query('select * from student ' , [req.params.id], (err , rows , fields)=>{
        if (!err) {
            console.log(rows);
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})

//deleting info in the database
app.delete('/student/:id' , (req , res)=>[
    database.query('DELETE FROM student WHERE id =  ?' , [req.params.id] , (err , rows , fields)=>{
        if (!err) {
            res.send("they were terminated succesfully so we are good to go")
        }else{
            console.log(err);
        }
    })
])

//adding the user or info to database  manually
app.post('/student' , (req , res)=>{
    database.query('insert into student(id , name , age , image) values (3 , "joly Balbine" , 3 , "balbine.png")' , (err , rows , field)=>{
        if (!err) {
            res.send('THe user has been added greatly');
        }else{
            console.log(err);
        }

    })
})

app.post('/' , (req , res)=>{
    
})

 
app.listen(PORT , ()=>{
    console.log('Server Connected......... ');
})