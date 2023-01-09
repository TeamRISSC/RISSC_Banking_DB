const {LoanSuper} = require("./loanSuper");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {verifyToken} = require('../../src/services/utils')
const db = new MySQLDBMySQLDB()

class Loan extends LoanSuper{
    constructor(req){
        super(req);
        this.approveDate = req.body.apprDate;
        this.loanType = req.body.loanType;
    }

    // setters and getters
    setApproveDate(apprDate){
        this.approveDate = apprDate;
    }
    getApproveDate(){
        return this.approveDate;
    }
    setLoanType(loanType){
        this.loanType = loanType;
    }
    getLoanType(){
        return this.loanType;
    }
}

// Async function to get a single loan
const getLoanAsync = async (req,res) => {
  try{
  // Select the loan from the loan table
  const [rows] = await db.connection.query('SELECT * FROM loan WHERE id = ?', [req.body.loanID]);
  const loan = rows[0];

  if (!loan) {
    return res.status(404).json({
    message: 'Loan not found'
    });
  }
  res.json(loan);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get all loans
const getLoansAsync = async (req, res) => {
  try{
  // Select the loan from the loan table
  const [rows] = await db.connection.query('SELECT * FROM loan');
  // add loanType to the loan object as "loan"
  rows.forEach(row => {row.loanType = "loan";});
  res.status(200).json({"loans":rows});

  } catch (error) {
    res.status(500).json({
      message : "Error",
      error: error
    });
  }
};

// Async function to delete a loan
const deleteLoanAsync = async (req,res) => {
  try {
    // Delete the loan from the loan table
    await db.connection.query('DELETE FROM loan WHERE id = ?', [req.body.loanID]);
    
    res.status(200).json({
      message: `Loan ${req.body.loanID} deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};


// Async function to get loan by customer id
const getLoanByCustomerIdAsync = async (req, res) => {
  try{
  // Select the loan from the loan table
  const token = req.headers.authorization.replace('Bearer ', '')
  console.log(token);
  const customer = verifyToken(token);
  console.log(customer)
  const [rows] = await db.connection.query('SELECT * FROM loan WHERE customerID = ?', [customer.ID]);
  const loan = rows[0];

  if (!loan) {
    return res.status(404).json({
    message: `No loans found for ${customer.ID}`
    });
  }
  // add loan type to the loan object as "loan"
  rows.forEach(row => {row.loanType = "loan";});
  res.json({"loans": rows});

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Asyn function to get loan by customer id for admin
const getLoanByCustomerIdForAdminAsync = async (req, res) => {
  try{
  // Select the loan from the loan table
  const [rows] = await db.connection.query('SELECT * FROM loan WHERE customerID = ?', [req.body.customerID]);
  const loan = rows[0];

  if (!loan) {
    return res.status(404).json({
    message: `No loans found for ${req.body.customerID}`
      
    });
  }
  res.json({"loans": rows});

  } catch (error) {
    res.status(500).json({
      error: error

    });
  }
};

///// WIP below this point ////////////////

// Async function to create a new loan
const createLoanAsync = async (req, res) => {
    try{  
    const loan = new Loan(req)
    
    // Insert the loan into the loan table
    const [result] = await db.connection.query('INSERT INTO loan SET ?', loan);
    const insertedLoanId = result.insertId;
    
    res.status(200).json({
      message: `Loan ${insertedLoanId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to update a loan
const updateLoanAsync = async (loanId, updatedLoan) => {
  try {
    // Update the loan in the loan table
    await db.connection.query('UPDATE loan SET ? WHERE id = ?', [updatedLoan, loanId]);

    // Select the updated loan from the loan table
    const [rows] = await db.connection.query('SELECT * FROM loan WHERE id = ?', [loanId]);
    const loan = rows[0];

    res.json(loan);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to approve a loan
const approveLoanAsync = async (req, res) => {
  try {

    console.log(req.body)
    // get the loan from the loan table
    const [rows1] = await db.connection.query('SELECT * FROM loan WHERE id = ?', [req.body.loanID]);
    const loan = rows1[0];

    console.log(loan)
    if (!loan) {
      return res.status(404).json({
      message: 'Loan not found'
      });
    }

    // change loan status to approved
    loan.isApproved = '1'

    // set approved date to today
    loan.approveDate = req.body.approveDate

    console.log(loan)

    // Update the loan in the loan table
    await db.connection.query('UPDATE loan SET ? WHERE id = ?', [loan, loan.ID]);

    // Select the updated loan from the loan table
    const [rows2] = await db.connection.query('SELECT * FROM loan WHERE id = ?', [loan.ID]);
    const updatedLoan = rows2[0];

    res.json(updatedLoan);
    
    } catch (error) {
    res.status(500).json({
      error: error.message
    });
    }
};


module.exports = {
    Loan,
    createLoanAsync,
    getLoanAsync,
    updateLoanAsync,
    deleteLoanAsync,
    getLoansAsync,
    getLoanByCustomerIdAsync,
    getLoanByCustomerIdForAdminAsync,
    approveLoanAsync
}