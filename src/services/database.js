const mysql = require("mysql")
const {db_config} = require("../config/config")

class MySQLDatabase {
    constructor (){
        this.connection = mysql.createPool({
            host: db_config.host,
            user: db_config.user,
            password: db_config.password,
            database: db_config.database
        })
    }

    query(sql, callback){
        return this.connection.query(sql, callback);
    }

    preparedStatement(sql, params, callback){
        return this.connection.query(sql, params, callback)
    }
}

module.exports = {
    MySQLDatabase
}