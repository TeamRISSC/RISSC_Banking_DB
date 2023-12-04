const mysql = require('mysql2/promise');
const {azure_config} = require('../../src/config/config') 
const {admin_config} = require('../../src/config/config')


 class MySQLDBMySQLDB {
  constructor(config) {
     this.init(config)
  }

  async init(config){
    this.connection = await mysql.createConnection(
      azure_config
    );
  }
}

module.exports={
    MySQLDBMySQLDB
}
