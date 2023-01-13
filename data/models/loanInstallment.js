const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()
const {signToken, verifyToken} = require('../../src/services/utils')

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
  // Verify the token
  const token = req.headers.authorization.replace('Bearer ', '')
  console.log(token);
  const customer = verifyToken(token)
  let rows;

  // Select the loan_installment from the loan_installment table
  const type = req.body.loanType;
  if(type == "loan"){
    [rows] = await db.connection.query('SELECT * FROM loan_installment WHERE loanID IN (SELECT ID from loan WHERE ID = ? AND customerID = ?)', 
                                            [req.body.loanID, customer.ID]);
  }
  else{
    // Select the online_loan_installment from the online_loan_installment table
    [rows] = await db.connection.query('SELECT * FROM online_loan_installment WHERE onlineLoanID IN (SELECT ID from online_loan WHERE ID=? AND customerID = ?) ',
                                               [req.body.loanID, customer.ID]);
  }
  
  if (!rows[0]) {
    return res.status(404).json({
    message: 'Loan Installment not found'
   });
 }
 res.json({
  installments: rows
 });
  
} catch (error) {
  res.status(500).json({
    error: error.message
  });
}
};


// Async function to get loan installments by loan id
const getLoanInstallmentsByLoanIdAsync = async (req, res) => {
  try{
    // Select all loan_installments from the loan_installment table
    const [rows] = await db.connection.query('SELECT * FROM loan_installment WHERE loanID = ?', [req.body.loanID]);
    const loan_installments = rows;

    if (!loan_installments) {
      return res.status(404).json({
      message: `LoanInstallments not found for loanID ${req.body.loanID}`
        
      });
    }
    res.json(loan_installments);

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to delete a loan_installment
const deleteLoanInstallmentAsync = async (req,res) => {
  try {
    // Delete the loan_installment from the loan_installment table
    console.log(req.body.loanInstallmentID);
    await db.connection.query('DELETE FROM loan_installment WHERE id = ?', [req.body.loanInstallmentID]);
    
    res.status(200).json({
      message: `LoanInstallment ${req.body.loanInstallmentID} deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};

const payLoanInstallments = async (req, res) => {
  try{
      const token = req.headers.authorization.replace('Bearer ', '')
      console.log(token);
      const customer = verifyToken(token)

      // Get details on the installment
      let [rows] = await db.connection.query('SELECT * from loan_installment WHERE ID=?', [req.body.ID])
      const installment = rows[0]
      if(!installment) throw new Error("Invalid Installment ID")

      // Get the linked account id
      [rows] = await db.connection.query('SELECT * from bank_account WHERE ID IN (SELECT linkedAccountID from loan WHERE loanID=?)', [installment.loanID])
      const account = rows[0]

      // if balance is not enough
      if(account.balance - installment.payment < account.minBalance) throw new Error("Invalid Balance")

      await db.connection.beginTransaction()
      // Subtract the payment from the account
      db.connection.query('UPDATE bank_account SET balance = balance - ? WHERE accountNumber=?', [installment.payment, account.accountNumber])
      
      // Update the status of the loan
      const today = new Date()
      const duedate = new Date(installment.date)
      if(today <= duedate)
        db.connection.query('UPDATE loan_installment SET status=? WHERE ID=?', ['OnTime', installment.ID])
      else
        db.connection.query('UPDATE loan_installment SET status=? WHERE ID=?', [ 'Late', installment.ID])
      
      db.connection.commit()
      res.status(200).json({
        message: "Payment Successful"
      })
  }catch(error){
      db.connection.rollback()
      res.status(500).json({
          error: error.message
        });
  }
}



module.exports = {
  getLoanInstallmentAsync,
  deleteLoanInstallmentAsync,
  getLoanInstallmentsByLoanIdAsync,
  getLoanInstallmentsAsync,
  payLoanInstallments
};