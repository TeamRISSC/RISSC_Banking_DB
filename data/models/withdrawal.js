const {Transaction} = require("./transaction");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()
class Withdrawal extends Transaction{
    constructor(req){
        super(req);
        this.accountNumber = req.body.accountNumber;
    }

    // setters and getters
    setAccountNumber(accountNumber){
        this.accountNumber = accountNumber;
    }
    getAccountNumber(){
        return this.accountNumber;
    }
}


module.exports = {Withdrawal}

// Async function to create a new withdrawal
exports.createWithdrawalAsync = async (req, res) => {
    try{  
    const withdrawal = new Withdrawal(req)
    
    // Insert the withdrawal into the withdrawal table
    const [result] = await db.connection.query('INSERT INTO withdrawal SET ?', withdrawal);
    const insertedWithdrawalId = result.insertId;
    
    res.status(200).json({
      message: `Withdrawal ${insertedWithdrawalId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single withdrawal
exports.getWithdrawalAsync = async (withdrawalId) => {
    try{
    // Select the withdrawal from the withdrawal table
    const [rows] = await db.connection.query('SELECT * FROM withdrawal WHERE id = ?', [withdrawalId]);
    const withdrawal = rows[0];

    if (!withdrawal) {
      return res.status(404).json({
      message: 'Withdrawal not found'
     });
   }
   res.json(withdrawal);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a withdrawal
exports.updateWithdrawalAsync = async (withdrawalId, updatedWithdrawal) => {
  try {
    // Update the withdrawal in the withdrawal table
    await db.connection.query('UPDATE withdrawal SET ? WHERE id = ?', [updatedWithdrawal, withdrawalId]);

    // Select the updated withdrawal from the withdrawal table
    const [rows] = await db.connection.query('SELECT * FROM withdrawal WHERE id = ?', [withdrawalId]);
    const withdrawal = rows[0];

    res.json(withdrawal);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a withdrawal
exports.deleteWithdrawalAsync = async (withdrawalId) => {
  try {
    // Delete the withdrawal from the withdrawal table
    await db.connection.query('DELETE FROM withdrawal WHERE id = ?', [withdrawalId]);
    
    res.status(200).json({
      message: `Withdrawal ${insertedWithdrawalId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
