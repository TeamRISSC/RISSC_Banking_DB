const mysql = require('mysql2/promise');
const {azure_config} = require('../../src/config/config') 
const {admin_config} = require('../../src/config/config')


 class MySQLDBMySQLDB {
  constructor(config) {
     this.init(config)
  }

  async init(config=admin_config){
    this.connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    });
  }
}

module.exports={
    MySQLDBMySQLDB
}