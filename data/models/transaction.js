const {LoanSuper} = require("./loanSuper");
const {MySQLDBMySQLDB} = require('../../src/services/database')
const {verifyToken} = require('../../src/services/utils')
const db = new MySQLDBMySQLDB()
class Transaction{
    static count = 0;
    constructor(req){
        this.date = req.body.date;
        this.amount = req.body.amount;
    }   

    // setters and getters
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
    }
    setDate(date){
        this.date = date;
    }
    getDate(){
        return this.date;
    }
    setAmount(amount){
        this.amount = amount;
    }
    getAmount(){
        return this.amount;
    }
}

// Async function to get transactions by customer ID
const getTransactionsByCustomerIDAsync = async (req, res) => {
    try{
        // Select the loan from the loan table
        const token = req.headers['x-access-token']
        console.log(token);
        const customer = verifyToken(token);
        console.log(customer)
        const [deposits] = await db.connection.query('SELECT * FROM bank.deposit WHERE accountNumber IN (select accountNumber FROM bank.bank_account WHERE customerID = ?)', [customer.ID]);
        const [withdrawals] = await db.connection.query('SELECT ID,accountNumber,amount*-1,date FROM bank.withdrawal WHERE accountNumber IN (select accountNumber FROM bank.bank_account WHERE customerID = ?)', [customer.ID]);
        const [transferIN] = await db.connection.query('SELECT * FROM bank.transfer WHERE toAccountID IN (select accountNumber FROM bank.bank_account WHERE customerID = ?)', [customer.ID]);
        const [transferOUT] = await db.connection.query('SELECT ID,fromAccountID,toAccountID,date,amount*-1,remarks FROM bank.transfer WHERE fromAccountID IN (select accountNumber FROM bank.bank_account WHERE customerID = ?)', [customer.ID]);

        // add type parameter to each transaction
        deposits.forEach((deposit) => {
            deposit.type = "deposit";
        });
        withdrawals.forEach((withdrawal) => {
            withdrawal.type = "withdrawal";
        });
        transferIN.forEach((transfer) => {
            transfer.type = "transferIN";
        });
        transferOUT.forEach((transfer) => {
            transfer.type = "transferOUT";
        });

        // combine all transactions
        const transactions = deposits.concat(withdrawals, transferIN, transferOUT);

        // sort by date most recent first
        transactions.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
        
        res.status(200).json({"transactions":transactions});

    } catch (error) {
        res.status(500).json({
            message : "Error",
            error: error
        });
    }
};


const getTransactionsAsync = async (req, res) => {
    try{
        // select all withdrawals from the withdrawal table
        const [withdrawals] = await db.connection.query('SELECT * FROM bank.withdrawal');
        // select all deposits from the deposit table
        const [deposits] = await db.connection.query('SELECT * FROM bank.deposit');
        // select all transfers from the transfer table
        const [transfers] = await db.connection.query('SELECT * FROM bank.transfer');
        // combine all transactions
        const transactions = withdrawals.concat(deposits, transfers);
        // sort by date most recent first

        deposits.forEach((deposit) => {
            deposit.type = "deposit";
        });
        withdrawals.forEach((withdrawal) => {
            withdrawal.type = "withdrawal";
        });
        transfers.forEach((transfer) => {
            transfer.type = "transfer";
        });
        transactions.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
        res.status(200).json({"transactions":transactions});

    } catch (error) {
        res.status(500).json({
            message : "Error",
            
            error: error
        });
    }
};

// export 
module.exports = { 
    Transaction,
    getTransactionsByCustomerIDAsync,
    getTransactionsAsync
 };