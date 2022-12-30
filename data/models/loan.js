const {LoanSuper} = require("./loanSuper");
const {MySQLDBMySQLDB} = require('../../src/services/database')
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
  const [rows] = await db.connection.query('SELECT * FROM loan WHERE id = ?', [req.params.loanID]);
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
  const [rows] = await db.connection.query('SELECT * FROM bank.loan');
  res.status(200).json(rows);

  } catch (error) {
    res.status(500).json({
      message : "Error",
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

// Async function to delete a loan
const deleteLoanAsync = async (loanId) => {
  try {
    // Delete the loan from the loan table
    await db.connection.query('DELETE FROM loan WHERE id = ?', [loanId]);
    
    res.status(200).json({
      message: `Loan ${insertedLoanId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};

module.exports = {
    Loan,
    createLoanAsync,
    getLoanAsync,
    updateLoanAsync,
    deleteLoanAsync,
    getLoansAsync
}