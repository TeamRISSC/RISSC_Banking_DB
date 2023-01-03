const {signToken, verifyToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {admin_config} = require('../../src/config/config') 
const {Admin} = require('./admin')
const db = new MySQLDBMySQLDB(admin_config)

class Admin{
    constructor(req){
        this.username = req.body.username;
        this.password = req.body.password;
    }
}

// Async function to create a new admin
const createAdminAsync = async (req, res) => {
    try{  
    const admin = new Admin(req)
    
    // Insert the admin into the admin table
    const [result] = await db.connection.query('INSERT INTO admin SET ?', admin);
    const insertedAdminId = result.insertId;
    
    res.status(200).json({
      message: `Admin ${insertedAdminId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to delete a admin
const deleteAdminAsync = async (req, res) => {
    try {
      const token = req.headers['x-access-token']
      const admin = verifyToken(token)
      // Delete the admin from the admin table
      await db.connection.query('DELETE FROM admin WHERE ID = ?', [admin.ID]);
      
      res.status(200).json({
        message: `Admin deleted successfully!`
      });
  
    } catch (error) {
      res.status(500).json({
        error: error
      });
    } 
  };

const signInAdminAsync = async (req, res) => {
    try{
    // Select the admin from the admin table
    const [rows] = await db.connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', 
                                            [req.body.username, req.body.password]);
    const admin = rows[0];

    if (!admin) {
        return res.status(404).json({
        message: 'Invalid Admin ID or Password'
        });
    }
    const token = signToken(admin)
    res.status(200).json(token);
        
    } catch (error) {
        res.status(500).json({
        error: error
        });
    }
};

// Async function to create a new branch
const createBranchAsync = async (req, res) => {
    try{  
    const branch = new Branch(req)
    
    // Insert the branch into the branch table
    const [result] = await db.connection.query('INSERT INTO branch SET ?', branch);
    const insertedBranchId = result.insertId;
    
    res.status(200).json({
      message: `Branch ${insertedBranchId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


module.exports = {
    Admin,
    signInAdminAsync,
    createAdminAsync,
    deleteAdminAsync,
}