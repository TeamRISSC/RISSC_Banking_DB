const mysql = require('mysql2/promise');
const {azure_config} = require('../../src/config/config') 


 class MySQLDBMySQLDB {
  constructor(config) {
     this.init(config)
  }

  async init(config=azure_config){
    this.connection = await mysql.createConnection(azure_config);
  }
}

module.exports={
    MySQLDBMySQLDB
}