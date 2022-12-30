const {hashPassword} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()

class Customer{
    constructor(req){
        this.type = req.body.type;
        this.name = req.body.name;
        this.address = req.body.address;
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
    setType(type){
        this.type = type;
    }
    getType(){
        return this.type;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setAddress(address){
        this.address = address;
    }
    getAddress(){
        return this.address;
    }
    setPhone(contactNumber){
        this.contactNumber = contactNumber;
    }
    getPhone(){
        return this.contactNumber;
    }
    setCustomername(username){
        this.username = username;
    }
    getCustomername(){
        return this.username;
    }
    setEmail(email){
        this.email = email;
    }
    getEmail(){
        return this.email;
    }
    setPassword(pw){
        this.password = pw;
    }
    getPassword(){
        return this.password;
    }

   

}

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

// Async function to get a single customer
const getCustomerAsync = async (req, res) => {
  try{
  // Select the customer from the customer table
  const [rows] = await db.connection.query('SELECT * FROM customer WHERE ID = ?', [req.params.customerID]);
  const customer = rows[0];

  if (!customer) {
    return res.status(404).json({
    message: 'Customer does not exist'
   });
 }
 res.status(200).json(customer);
  
} catch (error) {
  res.status(500).json({
    error: error
  });
}
};

// Async function to sign in a customer
const signInCustomerAsync = async (req, res) => {
    try{
    // Select the customer from the customer table
    const [rows] = await db.connection.query('SELECT * FROM customer WHERE username = ? AND password = ?', 
                                            [req.body.username, hashPassword(req.body.password)]);
    const customer = rows[0];

    if (!customer) {
      return res.status(404).json({
      message: 'Invalid Customer ID or Password'
     });
   }
   res.status(200).json(customer);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get all customers
const getCustomersAsync = async (req, res) => {
  try{
  // Select the customer from the customer table
  const [rows] = await db.connection.query('SELECT * FROM customer');
  res.status(200).json(rows);
  
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a customer
const updateCustomerAsync = async (req, res) => {
  try {
    // Update the customer in the customer table
    const customerID = req.params.customerID
    const updatedCustomer = new Customer(req)
    await db.connection.query('UPDATE customer SET ? WHERE ID = ?', [updatedCustomer, customerID]);

    // Select the updated customer from the customer table
    const [rows] = await db.connection.query('SELECT * FROM customer WHERE ID = ?', [customerID]);
    const customer = rows[0];

    res.status(200).json(customer);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a customer
const deleteCustomerAsync = async (req, res) => {
  try {
    // Delete the customer from the customer table
    const customerID = req.params.customerID
    await db.connection.query('DELETE FROM customer WHERE ID = ?', [customerID]);

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
  Customer,
  getCustomersAsync,
  createCustomerAsync,
  getCustomerAsync,
  signInCustomerAsync,
  updateCustomerAsync,
  deleteCustomerAsync
}
