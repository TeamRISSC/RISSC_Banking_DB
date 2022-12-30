const mysql = require('mysql2/promise');
const {db_config} = require("../config/config");

 class MySQLDBMySQLDB {
  constructor() {
     if (!MySQLDBMySQLDB.instance) {
       this.init()
     }
     return MySQLDBMySQLDB.instance;
  }

  async init(){
    this.connection = await mysql.createConnection({
      host: db_config.host,
      user: db_config.user,
      password: db_config.password,
      database: db_config.database
    });
    MySQLDBMySQLDB.instance = this;
  }
}

module.exports={
    MySQLDBMySQLDB
}