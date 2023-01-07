const {LoanSuper} = require("./loanSuper");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {verifyToken} = require('../../src/services/utils')
const db = new MySQLDBMySQLDB()
class FixedDeposit {
    constructor(req){
        // this.ID = req.body.ID;
        this.linkedAccountID = req.body.linkedAccountID;
        this.customerID = req.body.customerID;
        this.amount = req.body.amount;
        this.period = req.body.period;
        this.interestRate = req.body.interestRate;
        this.maturityDate = req.body.maturityDate;
    }
    // setters and getters
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
    }
    setLinkedAccountID(linkedAccountID){
        this.linkedAccountID = linkedAccountID;
    }
    getLinkedAccountID(){
        return this.linkedAccountID;
    }
    setCustomerID(customerID){
        this.customerID = customerID;
    }
    getCustomerID(){
        return this.customerID;
    }
    setAmount(amount){
        this.amount = amount;
    }
    getAmount(){
        return this.amount;
    }
    setPeriod(period){
        this.period = period;
    }
    getPeriod(){
        return this.period;
    }
    setInterestRate(interestRate){
        this.interestRate = interestRate;
    }
    getInterestRate(){
        return this.interestRate;
    }
    setMaturity(maturityDate){
        this.maturityDate = maturityDate;
    }
    getMaturity(){
        return this.maturityDate;
    }

}

// Async function to get all fixed_deposits
const getFixedDepositsAsync = async (req, res) => {
    try{
    // Select all fixed_deposits from the fixed_deposit table
    const [rows] = await db.connection.query('SELECT * FROM fixed_deposit');
    res.json({"fixed_deposits":rows});
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single fixed_deposit
const getFixedDepositAsync = async (req,res) => {
  try{
  // Select the fixed_deposit from the fixed_deposit table
  console.log(req.params)
  const [rows] = await db.connection.query('SELECT * FROM fixed_deposit WHERE id = ?', [req.params.fixedDepositID]);
  const fixed_deposit = rows[0];

  if (!fixed_deposit) {
    return res.status(404).json({
    message: 'FixedDeposit not found'
   });
 }
 res.json(fixed_deposit);
  
} catch (error) {
  res.status(500).json({
    error: error
  });
}
};

// Async function to delete a fixed_deposit
const deleteFixedDepositAsync = async (req,res) => {
  try {
    // Delete the fixed_deposit from the fixed_deposit table
    fixedDepositID = req.params.fixedDepositID

    // check if there are online_loans for this fd
    const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE FDID = ?', [fixedDepositID]);
    const online_loan = rows[0];

    if (online_loan) {
      return res.status(404).json({
      message: 'Cannot delete FixedDeposit with online loan'
      });
    }

    await db.connection.query('DELETE FROM fixed_deposit WHERE id = ?', [fixedDepositID]);
    
    res.status(200).json({
      message: `FixedDeposit ${fixedDepositID} deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};

// Async function to get fixed deposits by customer ID
const getFixedDepositsByCustomerIDAsync = async (req, res) => {
  try{
  // Select all fixed_deposits from the fixed_deposit table
  const token = req.headers.authorization.replace('Bearer ', '')
  console.log(token);
  const customer = verifyToken(token);
  const [rows] = await db.connection.query('SELECT * FROM fixed_deposit WHERE customerID = ?', [customer.ID]);
  res.json({"fixed_deposits":rows});

  if (!rows[0]) {
    return res.status(404).json({
    message: 'No Fixed Deposits found'
   });
  }
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// Async function to get fixed deposits by linked account ID
const getFixedDepositsByLinkedAccountIDAsync = async (req, res) => {
  try{
  // Select all fixed_deposits from the fixed_deposit table
  console.log(req.params)
  const [rows] = await db.connection.query('SELECT * FROM fixed_deposit WHERE linkedAccountID = ?', [req.params.linkedAccountID]);
  res.json(rows);

  if (!rows[0]) {
    return res.status(404).json({
    message: 'No Fixed Deposits found'
    });
  }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


/// WIP bellow this point /////////////////////////////

// Async function to create a new fixed_deposit
const createFixedDepositAsync = async (req, res) => {
    try{  
    const fixed_deposit = new FixedDeposit(req)
    
    // Insert the fixed_deposit into the fixed_deposit table
    const [result] = await db.connection.query('INSERT INTO fixed_deposit SET ?', fixed_deposit);
    const insertedFixedDepositId = result.insertId;
    
    res.status(200).json({
      message: `FixedDeposit ${insertedFixedDepositId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to update a fixed_deposit
const updateFixedDepositAsync = async (req, res) => {
  try {
    // Update the fixed_deposit in the fixed_deposit table
    await db.connection.query('UPDATE fixed_deposit SET ? WHERE id = ?', [updatedFixedDeposit, fixed_depositId]);

    // Select the updated fixed_deposit from the fixed_deposit table
    const [rows] = await db.connection.query('SELECT * FROM fixed_deposit WHERE id = ?', [fixed_depositId]);
    const fixed_deposit = rows[0];

    res.json(fixed_deposit);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to get fixed deposits by customer ID for admin
const getFixedDepositsByCustomerIDForAdminAsync = async (req, res) => {
  try{
  // Select all fixed_deposits from the fixed_deposit table
  console.log(req.body)
  const [rows] = await db.connection.query('SELECT * FROM fixed_deposit WHERE customerID = ?', [req.body.customerID]);
  res.json({"fixed_deposits":rows});

  if (!rows[0]) {
    return res.status(404).json({
    message: 'No Fixed Deposits found'
   });
  }
  }
  catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

module.exports = {
  FixedDeposit,
  getFixedDepositsAsync,
  createFixedDepositAsync,
  getFixedDepositAsync,
  getFixedDepositsByCustomerIDAsync,
  getFixedDepositsByLinkedAccountIDAsync,
  updateFixedDepositAsync,
  deleteFixedDepositAsync,
  getFixedDepositsByCustomerIDForAdminAsync
};