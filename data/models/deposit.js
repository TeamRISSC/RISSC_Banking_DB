const {Transaction} = require("./transaction");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()

class Deposit extends Transaction{
    constructor(req){
        super(req);
        this.accountNumber = req.body.accountNumber;
        this.type = "deposit";
    }

    // setters and getters
    setAccountNumber(accountNumber){
        this.accountNumber = accountNumber;
    }
    getAccountNumber(){
        return this.accountNumber;
    }
}


module.exports = {Deposit}

// Async function to create a new deposit
exports.createDepositAsync = async (req, res) => {
    try{  
    const deposit = new Deposit(req)
    
    // Insert the deposit into the deposit table
    const [result] = await db.connection.query('INSERT INTO deposit SET ?', deposit);
    const insertedDepositId = result.insertId;
    
    res.status(200).json({
      message: `Deposit ${insertedDepositId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single deposit
exports.getDepositAsync = async (depositId) => {
    try{
    // Select the deposit from the deposit table
    const [rows] = await db.connection.query('SELECT * FROM deposit WHERE id = ?', [depositId]);
    const deposit = rows[0];

    if (!deposit) {
      return res.status(404).json({
      message: 'Deposit not found'
     });
   }
   res.json(deposit);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a deposit
exports.updateDepositAsync = async (depositId, updatedDeposit) => {
  try {
    // Update the deposit in the deposit table
    await db.connection.query('UPDATE deposit SET ? WHERE id = ?', [updatedDeposit, depositId]);

    // Select the updated deposit from the deposit table
    const [rows] = await db.connection.query('SELECT * FROM deposit WHERE id = ?', [depositId]);
    const deposit = rows[0];

    res.json(deposit);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a deposit
exports.deleteDepositAsync = async (depositId) => {
  try {
    // Delete the deposit from the deposit table
    await db.connection.query('DELETE FROM deposit WHERE id = ?', [depositId]);
    
    res.status(200).json({
      message: `Deposit ${insertedDepositId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
