const {MySQLDBMySQLDB} = require('database.js')
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

module.exports = {BankAccount}

// Async function to create a new account
exports.createAccountAsync = async (req, res) => {
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
exports.getAccountAsync = async (accountId) => {
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
exports.updateAccountAsync = async (accountId, updatedAccount) => {
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
exports.deleteAccountAsync = async (accountId) => {
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
