const {MySQLDBMySQLDB} = require('database.js')
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
        this.password = req.body.pw;
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

module.exports = {Customer}

// Async function to create a new customer
exports.createCustomerAsync = async (req, res) => {
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
      error: error
    });
  }
};

// Async function to get a single customer
exports.getCustomerAsync = async (customerId) => {
    try{
    // Select the customer from the customer table
    const [rows] = await db.connection.query('SELECT * FROM customer WHERE ID = ?', [customerId]);
    const customer = rows[0];

    if (!customer) {
      return res.status(404).json({
      message: 'Customer not found'
     });
   }
   res.json(customer);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a customer
exports.updateCustomerAsync = async (customerId, updatedCustomer) => {
  try {
    // Update the customer in the customer table
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
exports.deleteCustomerAsync = async (customerId) => {
  try {
    // Delete the customer from the customer table
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
