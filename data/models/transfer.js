const {Transaction} = require("./transaction");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()

class Transfer extends Transaction{
    constructor(req){
        super(req);
        this.fromAccountID = req.body.fromAccountID;
        this.toAccountID = req.body.toAccountID;
        this.remarks = req.body.remarks;
        this.type = "Transfer";
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


module.exports = {Transfer}

// Async function to create a new transfer
exports.createTransferAsync = async (req, res) => {
    try{  
    const transfer = new Transfer(req)
    
    // Insert the transfer into the transfer table
    const [result] = await db.connection.query('INSERT INTO transfer SET ?', transfer);
    const insertedTransferId = result.insertId;
    
    res.status(200).json({
      message: `Transfer ${insertedTransferId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single transfer
exports.getTransferAsync = async (transferId) => {
    try{
    // Select the transfer fromAccountID the transfer table
    const [rows] = await db.connection.query('SELECT * FROM transfer WHERE id = ?', [transferId]);
    const transfer = rows[0];

    if (!transfer) {
      return res.status(404).json({
      message: 'Transfer not found'
     });
   }
   res.json(transfer);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a transfer
exports.updateTransferAsync = async (transferId, updatedTransfer) => {
  try {
    // Update the transfer in the transfer table
    await db.connection.query('UPDATE transfer SET ? WHERE id = ?', [updatedTransfer, transferId]);

    // Select the updated transfer fromAccountID the transfer table
    const [rows] = await db.connection.query('SELECT * FROM transfer WHERE id = ?', [transferId]);
    const transfer = rows[0];

    res.json(transfer);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a transfer
exports.deleteTransferAsync = async (transferId) => {
  try {
    // Delete the transfer fromAccountID the transfer table
    await db.connection.query('DELETE FROM transfer WHERE id = ?', [transferId]);
    
    res.status(200).json({
      message: `Transfer ${insertedTransferId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
