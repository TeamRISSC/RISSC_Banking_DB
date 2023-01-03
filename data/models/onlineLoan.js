const {LoanSuper} = require("./loanSuper");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {verifyToken} = require('../../src/services/utils')
const db = new MySQLDBMySQLDB()
class OnlineLoan extends LoanSuper {
    constructor(req) {
        super(req);
        this.FDID = req.body.FDID;
    }

    // setters and getters
    setFDID(FDID) {
        this.FDID = FDID;
    }
    getFDID() {
        return this.FDID;
    }
}

// Async function to get all online_loans
const getOnlineLoansAsync = async (req, res) => {
  try{
  // Select all online_loans from the online_loan table
  const [rows] = await db.connection.query('SELECT * FROM online_loan');
  const online_loans = rows;
    
  if (!online_loans) {
    return res.status(404).json({
    message: 'OnlineLoans not found'
    });
  }
  res.json(online_loans);

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single online_loan
const getOnlineLoanAsync = async (req,res) => {
  try{
  // Select the online_loan from the online_loan table
  const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE ID = ?', [req.params.onlineLoanID]);
  const online_loan = rows[0];

  if (!online_loan) {
    return res.status(404).json({
    message: 'OnlineLoan not found'
   });
 }
 res.json(online_loan);
  
} catch (error) {
  res.status(500).json({
    error: error
  });
}
};

// Async function to get a single online_loan using customer ID
const getOnlineLoanByCustomerIDAsync = async (req,res) => {
  try{
    // Select the loan from the loan table
    const token = req.headers['x-access-token']
    console.log(token);
    const customer = verifyToken(token);
    console.log(customer)
    const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE customerID = ?', [customer.ID]);
    const loan = rows[0];
  
    if (!loan) {
      return res.status(404).json({
      message: `No online loans found for ${customer.ID}`
      });
    }
    res.json({"Online_loans": rows});
  
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
};

// Async function to get a single online_loan using FDID
const getOnlineLoanByFDIDAsync = async (req,res) => {
  try{
  // Select the online_loan from the online_loan table
  const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE FDID = ?', [req.params.FDID]);
  const online_loan = rows[0];
    
  if (!online_loan) {
    return res.status(404).json({
    message: `No online loans for FD ID : ${req.params.FDID}`
    });
  }
  res.json(online_loan);

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to delete an online_loan
const deleteOnlineLoanAsync = async (req,res) => {
  try {
    // check if the online_loan exists
    const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE ID = ?', [req.params.onlineLoanID]);
    const online_loan = rows[0];
    console.log(`onlineLoanID: ${req.params.onlineLoanID}`);

    if (!online_loan) {
      return res.status(404).json({
        message: `OnlineLoan ${req.params.onlineLoanID} not found`
      });
    }
    // Delete the online_loan from the online_loan table
    await db.connection.query('DELETE FROM online_loan WHERE ID = ?', [req.params.onlineLoanID]);
    
    res.status(200).json({
      message: `OnlineLoan ${req.params.onlineLoanID} deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};

//////////// WIP //////////////

// Async function to create a new online_loan
const createOnlineLoanAsync = async (req, res) => {
    try{  
    const online_loan = new OnlineLoan(req)
    
    // Insert the online_loan into the online_loan table
    const [result] = await db.connection.query('INSERT INTO online_loan SET ?', online_loan);
    const insertedOnlineLoanId = result.insertId;
    
    res.status(200).json({
      message: `OnlineLoan ${insertedOnlineLoanId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to update a online_loan
const updateOnlineLoanAsync = async (online_loanId, updatedOnlineLoan) => {
  try {
    // Update the online_loan in the online_loan table
    await db.connection.query('UPDATE online_loan SET ? WHERE id = ?', [updatedOnlineLoan, online_loanId]);

    // Select the updated online_loan from the online_loan table
    const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE id = ?', [online_loanId]);
    const online_loan = rows[0];

    res.json(online_loan);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};


module.exports = {
  OnlineLoan,
  createOnlineLoanAsync,
  getOnlineLoanAsync,
  updateOnlineLoanAsync,
  deleteOnlineLoanAsync,
  getOnlineLoansAsync,
  getOnlineLoanByCustomerIDAsync,
  getOnlineLoanByFDIDAsync
};