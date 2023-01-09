const {Transaction} = require("./transaction");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {verifyToken} = require('../../src/services/utils')
const db = new MySQLDBMySQLDB()

class Transfer extends Transaction{
    constructor(req){
        super(req);
        this.fromAccountID = req.body.fromAccountID;
        this.toAccountID = req.body.toAccountID;
        this.remarks = req.body.remarks;
    }

    // setters and getters
    setFrom(fromAccountID){
        this.fromAccountID = fromAccountID;
    }
    getFrom(){
        return this.fromAccountID;
    }
    setTo(toAccountID){
        this.toAccountID = toAccountID;
    }
    getTo(){
        return this.toAccountID;
    }
    setRemarks(remarks){
        this.remarks = remarks;
    }
    getRemarks(){
        return this.remarks;
    }
}


// Async function to create a new transfer
const createTransferAsync = async (req, res) => {
  try{
    const token = req.headers.authorization.replace('Bearer ', '')
    const customer = verifyToken(token)
    const transfer = new Transfer(req)
    
    // checking if toAccount is valid
    // const [toACC] = await db.connection.query('SELECT * from bank_account where accountNumber = ?',[transfer.toAccountID])
    // const checkAcc = toACC[0]
    // if (!checkAcc){
    //   throw new Error ('Invaid Account number')
    // }
    
    // Insert the transfer into the transfer table
    await db.connection.beginTransaction()
    const [rows] = await db.connection.query('SELECT check_balance(?,?,?,?) as "check"', 
                        [transfer.fromAccountID, transfer.toAccountID, transfer.amount, customer.ID])

    const check = rows[0]["check"]
    if (check === -1){
      throw new Error('Insufficient balance')
    }
    
    if(check == -2){
      throw new Error('Invalid Account')
    }
    
    await db.connection.query('UPDATE bank_account SET balance = balance - ? WHERE accountNumber = ?', 
                            [transfer.amount, transfer.fromAccountID])
    // Add the transfer to the To Account
    await db.connection.query('UPDATE bank_account SET balance = balance + ? WHERE accountNumber = ?', 
                            [transfer.amount, transfer.toAccountID])
    const [result] = await db.connection.query('INSERT into transfer SET ?', transfer)
    const insertedTransferId = result.insertId;

    await db.connection.commit()
    res.status(200).json({
      message: `Transfer ${insertedTransferId} created successfully!`
    });

  } catch (error) {
    db.connection.rollback()
    res.status(500).json({
      error: error.message
    });
  }
};

// Async function to get a single transfer
const getTransferAsync = async (req, res) => {
    try{
    // Select the transfer fromAccountID the transfer table
    const transferID = req.body.transferID
    const [rows] = await db.connection.query('SELECT * FROM transfer WHERE id = ?', [transferID]);
    const transfer = rows[0];

    if (!transfer) {
      return res.status(404).json({
      message: 'Transfer not found'
     });
   }
   res.json(transfer);
    
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


module.exports = {
  Transfer,
  createTransferAsync
}