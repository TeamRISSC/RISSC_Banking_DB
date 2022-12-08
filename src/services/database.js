const mysql = require("mysql")
const {configurations} = require("../config/config")

class MySQLDatabase {
    constructor (){
        this.connection = mysql.createConnection({
            host: configurations.host,
            user: configurations.user,
            password: configurations.password,
            database: configurations.database
        })

        this.connection.connect((err)=>{
            if(err) throw err;
            console.log("Connected");
        })
    }

    query(sql, callback){
        return this.connection.query(sql, callback);
    }

    preparedStatement(sql, values, callback){
        return this.connection.query(sql, values, callback)
    }
}

let db = new MySQLDatabase

db.query("Select * from bank_account", (err, results) =>{
    if(err) throw err;
    else console.log(results)
})