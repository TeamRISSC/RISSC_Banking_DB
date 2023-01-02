const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()

class LoanInstallment{
    constructor(req){
        this.loanID = req.body.loanID;
        this.payment = req.body.amount;
        this.date = req.body.date;
        this.installmentNumber = req.body.insNum
    }

    // setters and getters
    setLoanId(loanID){
        this.loanID = loanID;
    }
    getLoanId(){
        return this.loanID;
    }
    setPayment(amount){
        this.payment = amount;
    }
    getPayment(){
        return this.payment;
    }
    setDate(date){
        this.date = date;
    }
    getDate(){
        return this.date;
    }
    setInstallmentNumber(insNum){
        this.installmentNumber = insNum;
    }
    getInstallmentNumber(){
        return this.installmentNumber;
    }
}

// Async function to get all loan_installments
const getLoanInstallmentsAsync = async (req, res) => {
  try{
    // Select all loan_installments from the loan_installment table
    const [rows] = await db.connection.query('SELECT * FROM loan_installment');
    const loan_installments = rows;
    
    res.json(loan_installments);

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single loan_installment
const getLoanInstallmentAsync = async (req,res) => {
  try{
  // Select the loan_installment from the loan_installment table
  const [rows] = await db.connection.query('SELECT * FROM loan_installment WHERE id = ?', [req.params.loanInstallmentID]);
  const loan_installment = rows[0];

  if (!loan_installment) {
    return res.status(404).json({
    message: 'LoanInstallment not found'
   });
 }
 res.json(loan_installment);
  
} catch (error) {
  res.status(500).json({
    error: error
  });
}
};


// Async function to get loan installments by loan id
const getLoanInstallmentsByLoanIdAsync = async (req, res) => {
  try{
    // Select all loan_installments from the loan_installment table
    const [rows] = await db.connection.query('SELECT * FROM loan_installment WHERE loanID = ?', [req.params.loanID]);
    const loan_installments = rows;

    if (!loan_installments) {
      return res.status(404).json({
      message: `LoanInstallments not found for loanID ${req.params.loanID}`
        
      });
    }
    res.json(loan_installments);

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


///////////// WIP /////////////

// Async function to create a new loan_installment
const createLoanInstallmentAsync = async (req, res) => {
    try{  
    const loan_installment = new LoanInstallment(req)
    
    // Insert the loan_installment into the loan_installment table
    const [result] = await db.connection.query('INSERT INTO loan_installment SET ?', loan_installment);
    const insertedLoanInstallmentId = result.insertId;
    
    res.status(200).json({
      message: `LoanInstallment ${insertedLoanInstallmentId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to update a loan_installment
const updateLoanInstallmentAsync = async (loan_installmentId, updatedLoanInstallment) => {
  try {
    // Update the loan_installment in the loan_installment table
    await db.connection.query('UPDATE loan_installment SET ? WHERE id = ?', [updatedLoanInstallment, loan_installmentId]);

    // Select the updated loan_installment from the loan_installment table
    const [rows] = await db.connection.query('SELECT * FROM loan_installment WHERE id = ?', [loan_installmentId]);
    const loan_installment = rows[0];

    res.json(loan_installment);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a loan_installment
const deleteLoanInstallmentAsync = async (loan_installmentId) => {
  try {
    // Delete the loan_installment from the loan_installment table
    await db.connection.query('DELETE FROM loan_installment WHERE id = ?', [loan_installmentId]);
    
    res.status(200).json({
      message: `LoanInstallment ${insertedLoanInstallmentId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};

module.exports = {
  LoanInstallment,
  createLoanInstallmentAsync,
  getLoanInstallmentAsync,
  updateLoanInstallmentAsync,
  deleteLoanInstallmentAsync,
  getLoanInstallmentsByLoanIdAsync,
  getLoanInstallmentsAsync
};