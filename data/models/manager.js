const {signToken, verifyToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {manager_config} = require('../../src/config/config') 
const {Employee} = require('./employee')
const db = new MySQLDBMySQLDB(manager_config)
class Manager{
    constructor(req){
        this.branchID = req.body.branchID;
        this.name = req.body.name;
        this.salary = req.body.salary;
        this.contactNumber = req.body.contactNumber;
        this.username = req.body.username;
        this.email = req.body.email;
        this.password = req.body.password;
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



// Async function to create a new employee
const createEmployeeAsync = async (req, res) => {
  try{  
  const employee = new Employee(req)
  
  // Insert the employee into the employee table
  const [result] = await db.connection.query('INSERT INTO employee SET ?', employee);
  const insertedEmployeeId = result.insertId;
  
  res.status(200).json({
    message: `Employee ${insertedEmployeeId} created successfully!`
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
    const token = req.headers.authorization.replace('Bearer ', '')
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
                                          [req.body.username, req.body.password]);
  const manager = rows[0];

  if (!manager) {
    return res.status(404).json({
    message: 'Invalid Manager ID or Password'
   });
  }
  const token = signToken(manager)
  res.status(200).json(token);
    
  } catch (error) {
    res.status(200).json({
      "token" : token,
      "role": "manager"
     });
  }
};

// Async function to update a manager
const updateManagerAsync = async (req, res) => {
  try {
    // Verify the token
    const token = req.headers.authorization.replace('Bearer ', '')
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

// Async function to delete a employee
const deleteEmployeeAsync = async (req, res) => {
  try {
    // Delete the employee from the employee table
    const token = req.headers.authorization.replace('Bearer ', '')
    const employee = verifyToken(token)
    await db.connection.query('DELETE FROM employee WHERE ID = ?', [employee.ID]);
    
    res.status(200).json({
      message: `Employee deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};



module.exports = {
  Manager,
  createEmployeeAsync,
  signInManagerAsync,
  getManagerAsync,
  getManagersAsync,
  updateManagerAsync,
  deleteEmployeeAsync
}