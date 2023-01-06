const {signToken, verifyToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {employee_config} = require('../../src/config/config') 
const {Customer} = require('./customer')

const db = new MySQLDBMySQLDB(employee_config)

class Employee{
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
    setBranchID(branchID){
        this.branchID = branchID;
    }
    getBranchID(){
        return this.branchID;
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

// Async function to get a single employee
const getEmployeeAsync = async (req, res) => {
    try{
    // Select the employee from the employee table
    const token = req.headers.authorization.replace('Bearer ', '')
    let employee = verifyToken(token)
    res.status(200).json(employee);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get all employees
const getEmployeesAsync = async (req, res) => {
  try{
  // Select the employee from the employee table
  const [rows] = await db.connection.query('SELECT * FROM employee');
  res.status(200).json(rows);
  
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

const signInEmployeeAsync = async (req, res) => {
  try{
  // Select the employee from the employee table
  const [rows] = await db.connection.query('SELECT * FROM employee WHERE username = ? AND password = ?', 
                                          [req.body.username, req.body.password]);
  const employee = rows[0];

  // Select the manager from the manager table
  const [rows2] = await db.connection.query('SELECT * FROM manager WHERE username = ? AND password = ?', 
                                          [req.body.username, req.body.password]);
  const manager = rows2[0];

    // check if he is an employee
    if (employee) {
      const token = signToken(employee)
      res.status(200).json({
        "token" : token,
        "role": "employee"
    });
    }
      
    // check if he is a manager
    if (manager) {
      const token = signToken(manager)
      res.status(200).json({
        "token" : token,
        "role": "manager"
    });
    }

  if (!employee && !manager) {
    return res.status(404).json({
    message: 'Invalid Employee ID or Password'
   });
  }

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// Async function to update a employee
const updateEmployeeAsync = async (req, res) => {
  try {
    // Update the employee in the employee table
    const token = req.headers.authorization.replace('Bearer ', '')
    let employee = verifyToken(token)

    const updatedEmployee = new Employee(req)
    await db.connection.query('UPDATE employee SET ? WHERE ID = ?', [updatedEmployee, employee.ID]);

    // Select the updated employee from the employee table
    const [rows] = await db.connection.query('SELECT * FROM employee WHERE ID = ?', [employee.ID]);
    employee = rows[0];

    res.status(200).json(employee);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to create a new customer
const createCustomerAsync = async (req, res) => {
  try{  
  const customer = new Customer(req)
  
  // Insert the customer into the customer table
  const [result] = await db.connection.query('INSERT INTO customer SET ?', customer);
  const insertedCustomerId = result.insertId;
  
  res.status(200).json({
    message: `Customer ${insertedCustomerId} created successfully!`
  });

  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// Async function to delete a customer
const deleteCustomerAsync = async (req, res) => {
  try {
    // Delete the customer from the customer table
    const token = req.headers.authorization.replace('Bearer ', '')
    const customer = verifyToken(token)
    await db.connection.query('DELETE FROM customer WHERE ID = ?', [customer.ID]);

    res.status(200).json({
      message: `Customer deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};


module.exports = {
  Employee,
  createCustomerAsync,
  getEmployeeAsync,
  getEmployeesAsync,
  signInEmployeeAsync,
  updateEmployeeAsync,
  deleteCustomerAsync
}

