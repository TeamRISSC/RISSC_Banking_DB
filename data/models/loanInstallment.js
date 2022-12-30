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


module.exports = {LoanInstallment}

// Async function to create a new loan_installment
exports.createLoanInstallmentAsync = async (req, res) => {
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

// Async function to get a single loan_installment
exports.getLoanInstallmentAsync = async (loan_installmentId) => {
    try{
    // Select the loan_installment from the loan_installment table
    const [rows] = await db.connection.query('SELECT * FROM loan_installment WHERE id = ?', [loan_installmentId]);
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

// Async function to update a loan_installment
exports.updateLoanInstallmentAsync = async (loan_installmentId, updatedLoanInstallment) => {
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
exports.deleteLoanInstallmentAsync = async (loan_installmentId) => {
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
