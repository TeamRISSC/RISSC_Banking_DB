const mysql = require('mysql2/promise');

class MySQLDBMySQLDB {
  constructor() {
     if (!MySQLDBMySQLDB.instance) {
       this.connection = awaitmysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: '',
         database: 'mydatabase'
       });
       MySQLDBMySQLDB.instance = this;
     }
     
     return MySQLDBMySQLDB.instance;
  }
}

module.exports={
    MySQLDBMySQLDB
}