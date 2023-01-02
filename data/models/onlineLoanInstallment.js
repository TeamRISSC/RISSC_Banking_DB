const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()

class onlineLoanInstallmentID{
    constructor(req){
        this.onlineLoanID = req.body.onlineLoanID;
        this.payment = req.body.amount;
        this.date = req.body.date;
        this.installmentNumber = req.body.insNum
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

///////////// WIP /////////////

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


// Async function to update a online_loan_installment
const updateonlineLoanInstallmentIDAsync = async (online_loan_installmentId, updatedonlineLoanInstallmentID) => {
  try {
    // Update the online_loan_installment in the online_loan_installment table
    await db.connection.query('UPDATE online_loan_installment SET ? WHERE id = ?', [updatedonlineLoanInstallmentID, online_loan_installmentId]);

    // Select the updated online_loan_installment from the online_loan_installment table
    const [rows] = await db.connection.query('SELECT * FROM online_loan_installment WHERE id = ?', [online_loan_installmentId]);
    const online_loan_installment = rows[0];

    res.json(online_loan_installment);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

module.exports = {
  onlineLoanInstallmentID,
  createonlineLoanInstallmentIDAsync,
  getonlineLoanInstallmentIDAsync,
  updateonlineLoanInstallmentIDAsync,
  deleteonlineLoanInstallmentIDAsync,
  getonlineLoanInstallmentIDsByonlineLoanIDAsync,
  getonlineLoanInstallmentIDsAsync
};