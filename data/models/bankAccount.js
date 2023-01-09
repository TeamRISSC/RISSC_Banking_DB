const {LoanSuper} = require("./loanSuper");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {verifyToken} = require('../../src/services/utils')
const db = new MySQLDBMySQLDB()

class BankAccount{
    constructor(req){
        this.accountNumber = req.body.accountNumber;
        this.customerID = req.body.customerID;
        this.branchID = req.body.branchID;
        this.name = req.body.name;
        this.balance = req.body.balance;
        this.minBalance = req.body.minBalance;
        this.accountType = req.body.accountType;
        this.interestRate = req.body.interestRate;
        this.maxWithdrawals = req.body.maxWithdrawals;
        this.currentWithdrawals = req.body.currentWithdrawals;
    }
    // setters and getters
    setAccountNumber(accountNumber){
        this.accountNumber = accountNumber;
    }
    getAccountNumber(){
        return this.accountNumber;
    }
    setCustomerID(customerID){
        this.customerID = customerID;
    }
    getCustomerID(){
        return this.customerID;
    }
    setBranchID(branchID){
        this.branchID = branchID;
    }
    getBranchID(){
        return this.branchID;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setBalance(balance){
        this.balance = balance;
    }
    getBalance(){
        return this.balance;
    }
    setMinBalance(minBalance){
        this.minBalance = minBalance;
    }
    getMinBalance(){
        return this.minBalance;
    }
    setAccountType(accountType){
        this.accountType = accountType;
    }
    getAccountType(){
        return this.accountType;
    }
    setIntRate(interestRate){
        this.interestRate = interestRate;
    }
    getIntRate(){
        return this.interestRate;
    }
    setMaxWithdrawals(maxWithdrawals){
        this.maxWithdrawals = maxWithdrawals;
    }
    getMaxWithdrawals(){
        return this.maxWithdrawals;
    }
    setCurrentWithdrawals(currentWithdrawals){
        this.currentWithdrawals = currentWithdrawals;
    }
    getCurrentWithdrawals(){
        return this.currentWithdrawals;
    }
    
}


// Async function to create a new account
const createAccountAsync = async (req, res) => {
    try{  
    const account = new BankAccount(req)
    
    // Insert the account into the bank_account table
    const [result] = await db.connection.query('INSERT INTO bank_account SET ?', account);
    const insertedAccountId = result.insertId;
  
    res.status(200).json({
      message: `Account ${insertedAccountId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single account
const getAccountAsync = async (accountId) => {
    try{
    // Select the account from the bank_account table
    const [rows] = await db.connection.query('SELECT * FROM bank_account WHERE id = ?', [accountId]);
    const account = rows[0];

    if (!account) {
      return res.status(404).json({
      message: 'Customer not found'
     });
   }
   res.json(account);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a account
const updateAccountAsync = async (accountId, updatedAccount) => {
  try {
    // Update the account in the bank_account table
    await db.connection.query('UPDATE bank_account SET ? WHERE id = ?', [updatedAccount, accountId]);

    // Select the updated account from the bank_account table
    const [rows] = await db.connection.query('SELECT * FROM bank_account WHERE id = ?', [accountId]);
    const account = rows[0];

    res.json(account);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a account
const deleteAccountAsync = async (accountId) => {
  try {
    // Delete the account from the bank_account table
    await db.connection.query('DELETE FROM bank_account WHERE id = ?', [accountId]);
    
    res.status(200).json({
      message: `Account ${insertedAccountId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};

// Async function to get all savings accounts by customer ID
const getSavingsAccountsByCustomerIDAsync = async (req,res) => {
    try{
    // Select the account from the bank_account table
    console.log(req);
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log(token);
    const customer = verifyToken(token);
    console.log(customer)
    const [rows] = await db.connection.query('SELECT * FROM bank_account WHERE customerID = ? AND accountType = ?', [customer.ID, "Savings"]);
    const account = rows[0];
    const accounts = rows;

    let total = 0;    
    // add int value of balance to total
    rows.forEach((e)=>(total += parseInt(e.balance)))
    // get branch from branch table
    // and add to accounts object
    for (let i = 0; i < accounts.length; i++) {
      console.log(accounts[i].branchID)
      const branch = await db.connection.query('SELECT name FROM branch WHERE id = ?', [accounts[i].branchID]);
      accounts[i].branch = branch[0][0].name;
    }

    if (!account) {
      return res.status(404).json({
      message: `no savings accounts found for customer ${customer.ID}`
     });
   }
   res.status(200).json({"accounts":rows, "totalBalance":total});
    
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

// Async function to get all current accounts by customer ID
const getCurrentAccountsByCustomerIDAsync = async (req,res) => {
  try{
    // Select the account from the bank_account table
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log(token);
    const customer = verifyToken(token);
    console.log(customer)
    const [rows] = await db.connection.query('SELECT * FROM bank_account WHERE customerID = ? AND accountType = ?', [customer.ID, "Checking"]);
    const account = rows[0];
    const accounts = rows;

    let total = 0;    
    // add int value of balance to total
    rows.forEach((e)=>(total += parseInt(e.balance)))
    // get branch from branch table
    // and add to accounts object
    for (let i = 0; i < accounts.length; i++) {
      console.log(accounts[i].branchID)
      const branch = await db.connection.query('SELECT name FROM branch WHERE id = ?', [accounts[i].branchID]);
      accounts[i].branch = branch[0][0].name;
    }

    if (!account) {
      return res.status(404).json({
      message: `no current accounts found for customer ${customer.ID}`
     });
   }
   res.status(200).json({"accounts":rows, "total":total});
    
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

// Async function to get all accounts
// modified to get all from the branch of the employee
const getAllAccountsAsync = async (req, res) => {
  try {
    // Select all accounts from the bank_account table
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log(token);
    const employee = verifyToken(token);
    console.log(employee)
    const [rows] = await db.connection.query('SELECT * FROM bank_account WHERE branchID = ?', [employee.branchID]);
    const accounts = rows;

    // get branch from branch table
    // and add to accounts object
    for (let i = 0; i < accounts.length; i++) {
      console.log(accounts[i].branchID)
      const branch = await db.connection.query('SELECT name FROM branch WHERE id = ?', [accounts[i].branchID]);
      accounts[i].branch = branch[0][0].name;
    }

    res.status(200).json({"accounts":accounts});

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get all accounts by customer ID for admin
const getAccountsByCustomerIDForAdminAsync = async (req, res) => {
  try {
    // Select all accounts from the bank_account table
    const [rows] = await db.connection.query('SELECT * FROM bank_account WHERE customerID = ?', [req.body.customerID]);
    const accounts = rows;

    // get branch from branch table
    // and add to accounts object
    for (let i = 0; i < accounts.length; i++) {
      const branch = await db.connection.query('SELECT name FROM branch WHERE id = ?', [accounts[i].branchID]);
      accounts[i].branch = branch[0][0].name;
    }

    res.status(200).json({"accounts":accounts});

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// exports
module.exports = {
    BankAccount,
    createAccountAsync,
    getAccountAsync,
    updateAccountAsync,
    deleteAccountAsync,
    getSavingsAccountsByCustomerIDAsync,
    getCurrentAccountsByCustomerIDAsync,
    getAllAccountsAsync,
    getAccountsByCustomerIDForAdminAsync
}