const {signToken, verifyToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {admin_config} = require('../../src/config/config') 
const {Manager} = require('./manager')
const db = new MySQLDBMySQLDB(admin_config)

class Admin{
    constructor(req){
        this.username = req.body.username;
        this.password = req.body.password;
    }
}

// Async function to create a new manager
const createManagerAsync = async (req, res) => {
    try{  
    const manager = new Manager(req)
    
    // Insert the manager into the manager table
    const [result] = await db.connection.query('INSERT INTO manager SET ?', manager);
    const insertedManagerId = result.insertId;
    
    res.status(200).json({
      message: `Manager ${insertedManagerId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to delete a manager
const deleteManagerAsync = async (req, res) => {
    try {
      const token = req.headers.authorization.replace('Bearer ', '')
      const manager = verifyToken(token)
      // Delete the manager from the manager table
      await db.connection.query('DELETE FROM manager WHERE ID = ?', [manager.ID]);
      
      res.status(200).json({
        message: `Manager deleted successfully!`
      });
  
    } catch (error) {
      res.status(500).json({
        error: error
      });
    } 
  };

const signInManagerAsync = async (req, res) => {
    try{
    // Select the manager from the manager table
    const [rows] = await db.connection.query('SELECT * FROM manager WHERE username = ? AND password = ?', 
                                            [req.body.username, req.body.password]);
    const manager = rows[0];

    if (!manager) {
        return res.status(404).json({
        message: 'Invalid Manager ID or Password'
        });
    }
    const token = signToken(manager)
    res.status(200).json({
      "token" : token,
      "role": "admin"
     });
        
    } catch (error) {
        res.status(500).json({
        error: error
        });
    }
};

module.exports = {
  Admin,
  createManagerAsync,
  deleteManagerAsync,
  signInManagerAsync
}