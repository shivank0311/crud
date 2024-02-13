const mysql = require("mysql");

export class StorageConnection {

    static getMysqlConnection() {
        const db = mysql.createConnection({
            host: "localhost",
            port:3306,
            user: "root",
            password: "Shubham1997@",
            database: "crud"
        })

        return db.connect();
    }
}