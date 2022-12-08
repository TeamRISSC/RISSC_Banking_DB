import mysql from 'mysql';

class MySQLDatabase {
    connection;

    constructor (host: string, db: string, user: string, pwd: string){
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: pwd,
            database: db
        })
    }

    query(sql:string, callback:Function){
        return this.connection.query(sql, callback);
    }

    preparedStatement(sql:string, values:string, callback:Function){
        return this.connection.query(sql, values, callback)
    }
}