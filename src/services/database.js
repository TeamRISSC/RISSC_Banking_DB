const mysql = require('mysql2/promise');

 class MySQLDBMySQLDB {
  constructor() {
     if (!MySQLDBMySQLDB.instance) {
       this.init()
     }
     return MySQLDBMySQLDB.instance;
  }

  async init(){
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bank'
    });
    MySQLDBMySQLDB.instance = this;
  }
}

module.exports={
    MySQLDBMySQLDB
}