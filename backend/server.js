const express = require("express");
const cors = require("cors");
const mysql = require("mysql");


const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "Shubham1997@",
    database: "crud"
})

app.get("/",(req, res) => {
   const sql = "SELECT * FROM student";
   db.query(sql, (err,data) => {
    if(err) return res.json("Error");
    return res.json(data);
   });
});

//INSERTING DATA

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student SET ?";
    
    const values = {
        name:req.body.name,
        email:req.body.email
        }
     db.query(sql, values, (err, data) => {
         if(err) return res.json("error");        
         return res.json(data);
     })
    })

//UPDATING DATA

app.put('/update/:id', (req, res) => {    
    
    const sql = 'UPDATE student SET Name = ? ,Email = ? Where ID = ?';
    var values = {
        name:req.body.name,
        email:req.body.email
  
     };
    var id = req.params.id;

    console.log(values.name +"  "+ values.email + " "+ values.id );

    db.query(sql, [values.name,values.email,id], function (error, data) {
       
        if (error) return res.json(error);
        console.log("Record updated!");
        return res.json(data);
        
    });    
})

//DELETION OF THE DATA

app.delete('/student/:id', (req, res) => {
        const sql = 'DELETE FROM student where ID = ?';
        const id = req.params.id;
    
         db.query(sql, [id], (err, data) => {
             if(err) return res.json("error");        
             return res.json(data);
         })
        })
        
app.listen(8081, () => {
    console.log("listening........");
})