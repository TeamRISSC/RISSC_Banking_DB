const crypto = require('crypto');
const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()

class Customer{
    constructor(req){
        this.ID = req.body.ID;
        this.type = req.body.type;
        this.name = req.body.name;
        this.address = req.body.address;
        this.phone = req.body.phone;
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
    setPhone(phone){
        this.phone = phone;
    }
    getPhone(){
        return this.phone;
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


// Hashing the passwords
const hashPassword = (password) => crypto.pbkdf2Sync(password, 'salt', 1000, 32, 'sha256').toString('hex');  

// Async function to create a new customer
const createCustomerAsync = async (req, res) => {
    try{  
    console.log(req.body);
    const customer = new Customer(req)
    
    // Insert the customer into the customer table
    const [result] = await db.connection.query('INSERT INTO customer SET ?', {...customer});
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
    const [rows] = await db.connection.query('SELECT * FROM customer WHERE username = ? AND password = ?', 
                                            [req.body.username, hashPassword(req.body.password)]);
    const customer = rows[0];

    if (!customer) {
      return res.status(404).json({
      message: 'Invalid Customer ID or Password'
     });
   }
   res.json(customer);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get all customer
const getCustomersAsync = async (req, res) => {
  try{
  // Select the customer from the customer table
  const [rows] = await db.connection.query('SELECT * FROM customer');
  res.json(rows);
  
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
    const customerId = req.params.customerId
    const updatedCustomer = new Customer(req)
    await db.connection.query('UPDATE customer SET ? WHERE ID = ?', [updatedCustomer, customerId]);

    // Select the updated customer from the customer table
    const [rows] = await db.connection.query('SELECT * FROM customer WHERE ID = ?', [customerId]);
    const customer = rows[0];

    res.json(customer);
    
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
    const customerId = req.params.customerId
    await db.connection.query('DELETE FROM customer WHERE ID = ?', [customerId]);
    
    res.status(200).json({
      message: `Customer ${insertedCustomerId} created successfully!`
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
  getCustomerAsync
}
