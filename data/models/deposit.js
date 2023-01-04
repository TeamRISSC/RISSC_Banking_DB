const {Transaction} = require("./transaction");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()
class Deposit extends Transaction{
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



// Async function to create a new deposit
// Async function to create a new deposit
const createDepositAsync = async (req, res) => {
  try{  
    const deposit = new Deposit(req)
    console.log (deposit)
    // Insert the deposit into the deposit table
    await db.connection.beginTransaction()
    
    await db.connection.query('UPDATE bank_account SET balance = balance + ? WHERE accountNumber = ?', 
                            [deposit.amount, deposit.accountNumber])

    const [result] = await db.connection.query('INSERT into deposit SET ?', deposit)
    const inserteddepositId = result.insertId;

    await db.connection.commit()
    res.status(200).json({
      message: `deposit ${inserteddepositId} created successfully!`
    });

  } catch (error) {
    db.connection.rollback()
    res.status(500).json({
      error: error.message
    });
  }
};

// Async function to get a single deposit
const getDepositAsync = async (depositId) => {
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



module.exports = {
    createDepositAsync,
    getDepositAsync,
}