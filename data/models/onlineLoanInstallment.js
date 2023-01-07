const {MySQLDBMySQLDB} = require('../../src/services/database');
const { verifyToken } = require('../../src/services/utils');
const db = new MySQLDBMySQLDB()

class onlineLoanInstallmentID{
    constructor(req){
        this.onlineLoanID = req.body.onlineLoanID;
        this.payment = req.body.payment;
        this.date = req.body.date;
        this.installmentNumber = req.body.installmentNumber
    }

    // setters and getters
    setonlineLoanID(onlineLoanID){
        this.onlineLoanID = onlineLoanID;
    }
    getonlineLoanID(){
        return this.onlineLoanID;
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

// Async function to get all online_loan_installments
const getonlineLoanInstallmentIDsAsync = async (req, res) => {
  try{
    // Select all online_loan_installments from the online_loan_installment table
    const [rows] = await db.connection.query('SELECT * FROM online_loan_installment');
    const online_loan_installments = rows;
    
    res.json(online_loan_installments);

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single online_loan_installment
const getonlineLoanInstallmentIDAsync = async (req,res) => {
  try{
  // Select the online_loan_installment from the online_loan_installment table
  console.log (req.params.onlineLoanInstallmentID)
  const [rows] = await db.connection.query('SELECT * FROM online_loan_installment WHERE ID = ?', [req.params.onlineLoanInstallmentID]);
  const online_loan_installment = rows[0];

  if (!online_loan_installment) {
    return res.status(404).json({
    message: 'onlineLoanInstallmentID not found'
   });
 }
 res.json(online_loan_installment);
  
} catch (error) {
  res.status(500).json({
    error: error
  });
}
};


// Async function to get loan installments by loan id
const getonlineLoanInstallmentIDsByonlineLoanIDAsync = async (req, res) => {
  try{
    // Select all online_loan_installments from the online_loan_installment table
    console.log (`onlineLoanID: ${req.params.onlineLoanID}`)
    const [rows] = await db.connection.query('SELECT * FROM online_loan_installment WHERE onlineLoanID = ?', [req.params.onlineLoanID]);
    const online_loan_installments = rows;

    if (!online_loan_installments) {
      return res.status(404).json({
      message: `onlineLoanInstallmentIDs not found for onlineLoanID ${req.params.onlineLoanID}`
        
      });
    }
    res.json(online_loan_installments);

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to delete a online_loan_installment
const deleteonlineLoanInstallmentIDAsync = async (req,res) => {
  try {
    // Delete the online_loan_installment from the online_loan_installment table
    console.log(req.params.onlineLoanInstallmentID);
    await db.connection.query('DELETE FROM online_loan_installment WHERE id = ?', [req.params.onlineLoanInstallmentID]);
    
    res.status(200).json({
      message: `onlineLoanInstallmentID ${req.params.onlineLoanInstallmentID} deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};

// Async function to create a new online_loan_installment
const createonlineLoanInstallmentIDAsync = async (req, res) => {
  try{  
  const online_loan_installment = new onlineLoanInstallmentID(req)
  
  // Insert the online_loan_installment into the online_loan_installment table
  const [result] = await db.connection.query('INSERT INTO online_loan_installment SET ?', online_loan_installment);
  const insertedonlineLoanInstallmentIDId = result.insertId;
  
  res.status(200).json({
    message: `onlineLoanInstallmentID ${insertedonlineLoanInstallmentIDId} created successfully!`
  });

} catch (error) {
  res.status(500).json({
    error: error
  });
}
};


const payOnlineLoanInstallments = async (req, res) => {
  try{
      const token = req.headers.authorization.replace('Bearer ', '')
      console.log(token);
      const customer = verifyToken(token)

      // Get details on the installment
      let [rows] = await db.connection.query('SELECT * from online_loan_installment WHERE ID=?', [req.body.ID])
      const installment = rows[0]
      if(!installment) throw new Error("Invalid Installment ID")

      // Get the linked account id
      [rows] = await db.connection.query('SELECT * from bank_account WHERE ID IN (SELECT linkedAccountID from loan WHERE onlineLoanID=?)', [installment.onlineLoanID])
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
        db.connection.query('UPDATE online_loan_installment SET status=? WHERE ID=?', ['OnTime', installment.ID])
      else
        db.connection.query('UPDATE online_loan_installment SET status=? WHERE ID=?', [ 'Late', installment.ID])
      
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
  onlineLoanInstallmentID,
  createonlineLoanInstallmentIDAsync,
  getonlineLoanInstallmentIDAsync,
  deleteonlineLoanInstallmentIDAsync,
  getonlineLoanInstallmentIDsByonlineLoanIDAsync,
  getonlineLoanInstallmentIDsAsync,
  payOnlineLoanInstallments
};