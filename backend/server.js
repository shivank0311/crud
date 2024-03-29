const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    const db = getMysqlConnection();
    db.connect((err) => {
        if (err) {
            throw err
        }
        const sql = "SELECT * FROM employee";
        db.query(sql, (err,data) => {
        if(err) return res.json("Error");

        console.log(`Data is === ${JSON.stringify(data)}`)
            return res.json(data);
        });
    })
});

//INSERTING DATA

app.post('/create', (req, res) => {
    const db = getMysqlConnection();
    db.connect((err) => {
        if (err) {
            throw err;
        }
    const sql = "INSERT INTO employee SET ?";
    const values = {
        name:req.body.name,
        email:req.body.email
    }
     db.query(sql, values, (err, data) => {
         if(err) return res.json(err.message);        
         return res.json(data);
     })
    })
})

//UPDATING DATA

app.put('/update/:id', (req, res) => { 
    const db = getMysqlConnection();
    db.connect((err) => {
        if (err) {
            throw err;
        }
        const sql = 'UPDATE employee SET Name = ? ,Email = ? Where ID = ?';
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
})

//DELETION OF THE DATA

app.delete('/employee/:id', (req, res) => {
    const db = getMysqlConnection();
    db.connect((err) => {
        if (err) {
            throw err;
        }
        const sql = 'DELETE FROM employee where ID = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, data) => {
            if(err) return res.json("error");        
            return res.json(data);
        })
    });
 })

getMysqlConnection = () => {
    return mysql.createConnection({
        host: "localhost",
        port:3306,
        user: "root",
        password: "password",
        database: "crud"
    })
}

app.listen(8081, () => {
    console.log("listening........");
})