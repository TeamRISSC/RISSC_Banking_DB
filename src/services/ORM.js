import mysql from 'mysql';

class MySQLDatabase {
    connection;

    constructor (host, db, user, pwd){
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: pwd,
            database: db
        })
    }

    query(sql, callback){
        return this.connection.query(sql, callback);
    }

    preparedStatement(sql, values, callback){
        return this.connection.query(sql, values, callback)
    }
}