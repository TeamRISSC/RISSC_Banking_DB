const express = require('express')
const bodyParser = require('body-parser')
const {server_config} = require("./src/config/config")

// API route functions from the data models
const customerAPI = require('./data/models/customer')
const employeeAPI = require('./data/models/employee')
const managerAPI = require('./data/models/manager')
const branchAPI = require('./data/models/branch')
const fixedDepositAPI = require('./data/models/fixedDeposit')
const loanAPI = require('./data/models/loan')
const onlineLoanAPI = require('./data/models/onlineLoan')
const loanInstallmentAPI = require('./data/models/loanInstallment')
const onlineLoanInstallmentAPI = require('./data/models/onlineLoanInstallment')
const transactionAPI = require('./data/models/transaction')
const bankAccountAPI = require('./data/models/bankAccount')


const app = express()
const port = server_config.port

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// Default Route
app.get('/', (req, res) => res.send("Welcome to RISSC Banking API"))

// User routes
app.get('/api/admin/listUsers', customerAPI.getCustomersAsync)
app.post('/api/user/signin', customerAPI.signInCustomerAsync)
app.get('/api/user', customerAPI.getCustomerAsync)
app.patch('/api/user', customerAPI.updateCustomerAsync)
app.delete('/api/user', customerAPI.deleteCustomerAsync)


// Employee routes
app.get('/api/employees', employeeAPI.getEmployeesAsync)
app.post('/api/employee/register', employeeAPI.createEmployeeAsync)
app.post('/api/employee/signin', employeeAPI.signInEmployeeAsync)
app.post('/api/employee/userRegister', employeeAPI.createCustomerAsync)
app.get('/api/employee', employeeAPI.getEmployeeAsync)
app.patch('/api/employee', employeeAPI.updateEmployeeAsync)
app.delete('/api/employee', employeeAPI.deleteEmployeeAsync)


// Manager routes
app.get('/api/managers', managerAPI.getManagersAsync)
app.post('/api/manager/register', managerAPI.createManagerAsync)
app.post('/api/manager/signin', managerAPI.signInManagerAsync)
app.get('/api/manager', managerAPI.getManagerAsync)
app.patch('/api/manager', managerAPI.updateManagerAsync)
app.delete('/api/manager', managerAPI.deleteManagerAsync)


// Branch routes
app.get('/api/branches', branchAPI.getBranchesAsync)
app.post('/api/branch/register', branchAPI.createBranchAsync)
app.get('/api/branch/:branchID', branchAPI.getBranchAsync)
app.patch('/api/branch/:branchID', branchAPI.updateBranchAsync)
app.delete('/api/branch/:branchID', branchAPI.deleteBranchAsync)

// fixed deposit routes
app.get('/api/fixeddeposits', fixedDepositAPI.getFixedDepositsAsync)
app.get('/api/fixeddeposit/', fixedDepositAPI.getFixedDepositAsync)
app.delete('/api/fixeddeposit/:fixedDepositID', fixedDepositAPI.deleteFixedDepositAsync)
app.get('/api/fixeddeposit/customer/', fixedDepositAPI.getFixedDepositsByCustomerIDAsync)
app.get('/api/fixeddeposit/account/:linkedAccountID', fixedDepositAPI.getFixedDepositsByLinkedAccountIDAsync)
/////// test with fronted
app.post('/api/fixeddeposit', fixedDepositAPI.createFixedDepositAsync)
app.patch('/api/fixeddeposit/:fixedDepositID', fixedDepositAPI.updateFixedDepositAsync)

// loan routes
app.get('/api/listLoans/', loanAPI.getLoansAsync) // works
app.get('/api/loan/', loanAPI.getLoanAsync) // works
app.delete('/api/loan/', loanAPI.deleteLoanAsync)
app.get('/api/userLoans', loanAPI.getLoanByCustomerIdAsync) // works
app.post('/api/loan', loanAPI.createLoanAsync)
app.patch('/api/loan/', loanAPI.updateLoanAsync)

// online loan routes
app.get('/api/listOnlineLoans/', onlineLoanAPI.getOnlineLoansAsync)
app.get('/api/onlineloan/:onlineLoanID', onlineLoanAPI.getOnlineLoanAsync)
app.get('/api/userOnlineLoans', onlineLoanAPI.getOnlineLoanByCustomerIDAsync)
app.get('/api/onlineloan/fixeddeposit/:FDID', onlineLoanAPI.getOnlineLoanByFDIDAsync)
app.delete('/api/onlineloan/:onlineLoanID', onlineLoanAPI.deleteOnlineLoanAsync)
// test with fronted
app.post('/api/onlineloan', onlineLoanAPI.createOnlineLoanAsync)
app.patch('/api/onlineloan/:onlineLoanID', onlineLoanAPI.updateOnlineLoanAsync)

// loan Installment routes
app.get('/api/loaninstallments', loanInstallmentAPI.getLoanInstallmentsAsync)
app.get('/api/loaninstallment/:loanInstallmentID', loanInstallmentAPI.getLoanInstallmentAsync)
app.get('/api/loaninstallment/loan/:loanID', loanInstallmentAPI.getLoanInstallmentsByLoanIdAsync)
app.delete('/api/loaninstallment/:loanInstallmentID', loanInstallmentAPI.deleteLoanInstallmentAsync)
app.post('/api/loaninstallment', loanInstallmentAPI.createLoanInstallmentAsync)
// if needed can get installments by customer id, just join with loan table and compare customer ID
// test with fronted
app.patch('/api/loaninstallment/:loanInstallmentID', loanInstallmentAPI.updateLoanInstallmentAsync)

// online loan Installment routes
app.get('/api/onlineloaninstallments', onlineLoanInstallmentAPI.getonlineLoanInstallmentIDsAsync)
app.get('/api/onlineloaninstallment/:onlineLoanInstallmentID', onlineLoanInstallmentAPI.getonlineLoanInstallmentIDAsync)
app.get('/api/onlineloaninstallment/onlineloan/:onlineLoanID', onlineLoanInstallmentAPI.getonlineLoanInstallmentIDsByonlineLoanIDAsync)
app.delete('/api/onlineloaninstallment/:onlineLoanInstallmentID', onlineLoanInstallmentAPI.deleteonlineLoanInstallmentIDAsync)
app.post('/api/onlineloaninstallment', onlineLoanInstallmentAPI.createonlineLoanInstallmentIDAsync)
// test with frontend
app.patch('/api/onlineloaninstallment/:onlineLoanInstallmentID', onlineLoanInstallmentAPI.updateonlineLoanInstallmentIDAsync) 

// transation routes
app.get('/api/transactions', transactionAPI.getTransactionsByCustomerIDAsync)

// bank account routes
app.get('/api/userSavingsAccounts', bankAccountAPI.getSavingsAccountsByCustomerIDAsync)
app.get('/api/userCurrentAccounts', bankAccountAPI.getCurrentAccountsByCustomerIDAsync)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})