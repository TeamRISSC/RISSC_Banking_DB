const {signToken, verifyToken} = require('../../src/services/utils')
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {customer_config} = require('../../src/config/config') 

const db = new MySQLDBMySQLDB(customer_config)

class Customer{
    constructor(req){
        this.type = req.body.type;
        this.name = req.body.name;
        this.address = req.body.address;
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

// Async function to get a single customer
const getCustomerAsync = async (req, res) => {
  try{
  // Verify the token
  const token = req.headers.authorization.replace('Bearer ', '')
  console.log(token);
  const customer = verifyToken(token)

  console.log(customer);
  res.status(200).json(customer);
    
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Async function to sign in a customer
const signInCustomerAsync = async (req, res) => {
    try{
    // Select the customer from the customer table
    const [rows] = await db.connection.query('SELECT * FROM customer WHERE username = ? AND password = ?', 
                                            [req.body.username,req.body.password]);
    const customer = rows[0];

    if (!customer) {
      return res.status(404).json({
      message: 'Invalid Customer ID or Password'
     });
   }
   const token = signToken(customer)
   res.status(200).json({
    "token" : token,
    "role": "customer"
   });
    
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
  res.status(200).json({"users":rows});
  
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a customer
const updateCustomerAsync = async (req, res) => {
  try {
    // Verify the token
    const token = req.headers.authorization.replace('Bearer ', '')
    let customer = verifyToken(token)

    // Update the customer in the customer table
    const updatedCustomer = new Customer(req)
    await db.connection.query('UPDATE customer SET ? WHERE ID = ?', [updatedCustomer, customer.ID]);

    // Select the updated customer from the customer table
    const [rows] = await db.connection.query('SELECT * FROM customer WHERE ID = ?', [customer.ID]);
    customer = rows[0];

    res.status(200).json(customer);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

module.exports = {
  Customer,
  getCustomersAsync,
  getCustomerAsync,
  signInCustomerAsync,
  updateCustomerAsync
}
