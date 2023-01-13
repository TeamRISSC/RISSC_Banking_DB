const express = require('express')
const bodyParser = require('body-parser')
const {server_config} = require("./src/config/config")

// API route functions from the data models
const customerAPI = require('./data/models/customer')
const employeeAPI = require('./data/models/employee')
const managerAPI = require('./data/models/manager')
const adminAPI = require('./data/models/admin')
const branchAPI = require('./data/models/branch')
const fixedDepositAPI = require('./data/models/fixedDeposit')
const loanAPI = require('./data/models/loan')
const onlineLoanAPI = require('./data/models/onlineLoan')
const loanInstallmentAPI = require('./data/models/loanInstallment')
const onlineLoanInstallmentAPI = require('./data/models/onlineLoanInstallment')
const transactionAPI = require('./data/models/transaction')
const bankAccountAPI = require('./data/models/bankAccount')
const transferAPI = require('./data/models/transfer')
const withdrawalAPI = require('./data/models/withdrawal')
const depositAPI = require('./data/models/deposit')
const loanSuperAPI = require('./data/models/loanSuper')

const app = express()
const port = server_config.port

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());
// Accept these headers to avoid CORS errors on the client side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Default Route
app.get('/', (req, res) => res.send("Welcome to RISSC Banking API"))

// User routes
app.post('/api/user/signin', customerAPI.signInCustomerAsync)
app.get('/api/user', customerAPI.getCustomerAsync)
app.patch('/api/user', customerAPI.updateCustomerAsync)

// Employee routes
app.post('/api/employee/signin', employeeAPI.signInEmployeeAsync)
app.post('/api/employee/userRegister', employeeAPI.createCustomerAsync)
app.get('/api/employee', employeeAPI.getEmployeeAsync)
app.patch('/api/employee', employeeAPI.updateEmployeeAsync)
app.delete('/api/employee/deleteUser', employeeAPI.deleteCustomerAsync)

// Manager routes
app.post('/api/manager/signin', managerAPI.signInManagerAsync)
app.post('/api/manager/employeeRegister', managerAPI.createEmployeeAsync)
app.get('/api/manager', managerAPI.getManagerAsync)
app.patch('/api/manager', managerAPI.updateManagerAsync)
app.delete('/api/manager/employeeDelete', managerAPI.deleteEmployeeAsync)

// Admin routes
app.post('/api/admin/managerRegister', adminAPI.createManagerAsync)
app.delete('/api/admin/managerDelete', adminAPI.deleteManagerAsync)
app.post('/api/admin/branchRegister', branchAPI.createBranchAsync)
app.get('/api/admin/listUsers', customerAPI.getCustomersAsync)
app.get('/api/admin/listEmployees', employeeAPI.getEmployeesAsync)
app.get('/api/admin/listManagers', managerAPI.getManagersAsync)
app.get('/api/admin/listBranches', branchAPI.getBranchesAsync)
app.get('/api/admin/listFixedDeposits', fixedDepositAPI.getFixedDepositsAsync)
app.get('/api/admin/listLoans', loanAPI.getLoansAsync) // works

// Branch routes
app.get('/api/branch/:branchID', branchAPI.getBranchAsync)
app.patch('/api/branch/:branchID', branchAPI.updateBranchAsync)
app.delete('/api/branch/:branchID', branchAPI.deleteBranchAsync)

// fixed deposit routes
// app.get('/api/fixeddeposit/', fixedDepositAPI.getFixedDepositAsync)
app.delete('/api/fixeddeposit/:fixedDepositID', fixedDepositAPI.deleteFixedDepositAsync)
app.get('/api/fixedDeposits', fixedDepositAPI.getFixedDepositsByCustomerIDAsync)
app.get('/api/fixeddeposit/account/:linkedAccountID', fixedDepositAPI.getFixedDepositsByLinkedAccountIDAsync)
app.get('/api/admin/fixedDeposits/', fixedDepositAPI.getFixedDepositsAsync)
app.post('/api/admin/fixedDeposits/user', fixedDepositAPI.getFixedDepositsByCustomerIDForAdminAsync)

/////// test with fronted
app.post('/api/fixeddeposit', fixedDepositAPI.createFixedDepositAsync)
app.patch('/api/fixeddeposit/:fixedDepositID', fixedDepositAPI.updateFixedDepositAsync)

// loan routes
app.get('/api/loans', loanAPI.getLoanAsync) // works
app.delete('/api/loan/', loanAPI.deleteLoanAsync)
app.get('/api/userLoans', loanAPI.getLoanByCustomerIdAsync) // works
app.post('/api/employee/createLoanRequest', loanAPI.createLoanAsync)
app.patch('/api/loan/', loanAPI.updateLoanAsync)
app.post('/api/admin/listLoans/user', loanAPI.getLoanByCustomerIdForAdminAsync)
app.get('/api/listLoans/', loanAPI.getLoansAsync)
app.post('/api/manager/approveLoan', loanAPI.approveLoanAsync)

// online loan routes
app.get('/api/listOnlineLoans/', onlineLoanAPI.getOnlineLoansAsync)
app.get('/api/onlineloan/:onlineLoanID', onlineLoanAPI.getOnlineLoanAsync)
app.get('/api/userOnlineLoans', onlineLoanAPI.getOnlineLoanByCustomerIDAsync)
app.get('/api/onlineloan/fixeddeposit/:FDID', onlineLoanAPI.getOnlineLoanByFDIDAsync)
app.delete('/api/onlineloan/:onlineLoanID', onlineLoanAPI.deleteOnlineLoanAsync)
app.post('/api/payonlineloaninstallments', onlineLoanInstallmentAPI.payOnlineLoanInstallments)

// test with fronted
app.post('/api/createOnlineLoan', onlineLoanAPI.createOnlineLoanAsync)
app.patch('/api/onlineloan/:onlineLoanID', onlineLoanAPI.updateOnlineLoanAsync)

// loan Installment routes
app.post('/api/loaninstallments', loanInstallmentAPI.getLoanInstallmentAsync)
app.get('/api/loaninstallment/loan/:loanID', loanInstallmentAPI.getLoanInstallmentsByLoanIdAsync)
app.delete('/api/loaninstallment/:loanInstallmentID', loanInstallmentAPI.deleteLoanInstallmentAsync)
// if needed can get installments by customer id, just join with loan table and compare customer ID

// get late installments
app.get('/api/manager/installments/late', loanSuperAPI.getLateInstallmentsAsyncbyBranch)

// online loan Installment routes
app.get('/api/onlineloaninstallments', onlineLoanInstallmentAPI.getonlineLoanInstallmentIDsAsync)
app.get('/api/onlineloaninstallment/:onlineLoanInstallmentID', onlineLoanInstallmentAPI.getonlineLoanInstallmentIDAsync)
app.get('/api/onlineloaninstallment/onlineloan/:onlineLoanID', onlineLoanInstallmentAPI.getonlineLoanInstallmentIDsByonlineLoanIDAsync)
app.delete('/api/onlineloaninstallment/:onlineLoanInstallmentID', onlineLoanInstallmentAPI.deleteonlineLoanInstallmentIDAsync)
app.post('/api/onlineloaninstallment', onlineLoanInstallmentAPI.createonlineLoanInstallmentIDAsync)

// transation routes
app.get('/api/transactions', transactionAPI.getTransactionsByCustomerIDAsync)
app.get('/api/admin/listTransactions/', transactionAPI.getTransactionsAsync)
app.post('/api/admin/listTransactions/user', transactionAPI.getTransactionsByCustomerIDForAdminAsync)
// get all transactions for employee by branch
app.get('/api/employee/listTransactions/', transactionAPI.getTransactionsByBranchAsync)

// bank account routes
app.get('/api/userSavingsAccounts', bankAccountAPI.getSavingsAccountsByCustomerIDAsync)
app.get('/api/userCurrentAccounts', bankAccountAPI.getCurrentAccountsByCustomerIDAsync)
app.get('/api/admin/listAccounts/', bankAccountAPI.getAllAccountsAsync)
app.post('/api/admin/listAccounts/user', bankAccountAPI.getAccountsByCustomerIDForAdminAsync)


// Transfer routes
app.post('/api/transfer', transferAPI.createTransferAsync)

// Withdrawal routes
app.post('/api/withdraw', withdrawalAPI.createWithdrawalAsync)

// Deposit routes
app.post('/api/deposit', depositAPI.createDepositAsync)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})