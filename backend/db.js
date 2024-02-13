const mysql = require("mysql");


let DB_CON = null;

function getMysqlConnection() {
    if (DB_CON !== null) {
        const db = mysql.createConnection({
            host: "localhost",
            port:3306,
            user: "root",
            password: "Shubham1997@",
            database: "crud"
        })
        DB_CON = db.connect();
    }
    return DB_CON;
}