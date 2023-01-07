const {Transaction} = require("./transaction");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {verifyToken} = require('../../src/services/utils')

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


// Async function to create a new withdrawal
const createWithdrawalAsync = async (req, res) => {
  try{
    const token = req.headers.authorization.replace('Bearer ', '')
    const customer = verifyToken(token)  
    const withdrawal = new Withdrawal(req)
    
    // Insert the withdrawal into the withdrawal table
    await db.connection.beginTransaction()
    const [rows] = await db.connection.query('SELECT check_withdrawal(?,?,?) as "check"', 
                        [withdrawal.accountNumber, transfer.amount, customer.ID])

    const check = rows[0]["check"]
    if (check === -1){
      throw new Error('Insufficient balance')
    }
    
    else if(check == -2){
      throw new Error('Invalid Account')
    }
    else if(check == -3){
      throw new Error('Maximum number of withdrawals reached')
    }
    await db.connection.query('UPDATE bank_account SET balance = balance - ? currentWithdrawals = currentWithdrawals + 1 WHERE accountNumber = ?', 
                            [withdrawal.amount, withdrawal.accountNumber])
    const [result] = await db.connection.query('INSERT into withdrawal SET ?', withdrawal)
    const insertedWithdrawalId = result.insertId;

    await db.connection.commit()
    res.status(200).json({
      message: `Withdrawal ${insertedWithdrawalId} created successfully!`
    });

  } catch (error) {
    db.connection.rollback()
    res.status(500).json({
      error: error.message
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

module.exports = {
  Withdrawal,
  createWithdrawalAsync
}

