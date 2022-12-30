const {signToken, verifyToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()
class Manager{
    constructor(req){
        this.branchID = req.body.branchID;
        this.name = req.body.name;
        this.salary = req.body.salary;
        this.contactNumber = req.body.contactNumber;
        this.username = req.body.username;
        this.email = req.body.email;
        this.password = hashPassword(req.body.password);
    }
    // setters and getters
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setSalary(salary){
        this.salary = salary;
    }
    getSalary(){
        return this.salary;
    }
    setContactNumber(contactNumber){
        this.contactNumber = contactNumber;
    }
    getContactNumber(){
        return this.contactNumber;
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

// Async function to get a single manager
const getManagerAsync = async (req, res) => {
    try{
    // Select the manager from the manager table
    const token = req.headers['x-access-token']
    const manager = verifyToken(token)
    res.status(200).json(manager);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get all managers
const getManagersAsync = async (req, res) => {
  try{
  // Select the manager from the manager table
  const [rows] = await db.connection.query('SELECT * FROM manager');
  res.status(200).json(rows);
  
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
                                          [req.body.username, hashPassword(req.body.password)]);
  const manager = rows[0];

  if (!manager) {
    return res.status(404).json({
    message: 'Invalid Manager ID or Password'
   });
  }
  const token = signToken(manager)
  res.status(200).json(token);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a manager
const updateManagerAsync = async (req, res) => {
  try {
    // Verify the token
    const token = req.headers['x-access-token']
    let manager = verifyToken(token)
    // Update the manager in the manager table
    const updatedManager = new Manager(req)
    await db.connection.query('UPDATE manager SET ? WHERE ID = ?', [updatedManager, manager.ID]);

    // Select the updated manager from the manager table
    const [rows] = await db.connection.query('SELECT * FROM manager WHERE ID = ?', [manager.ID]);
    manager = rows[0];

    res.status(200).json(manager);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a manager
const deleteManagerAsync = async (req, res) => {
  try {
    const token = req.headers['x-access-token']
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


module.exports = {
  Manager,
  createManagerAsync,
  signInManagerAsync,
  getManagerAsync,
  getManagersAsync,
  updateManagerAsync,
  deleteManagerAsync
}