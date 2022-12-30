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

const app = express()
const port = server_config.port

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// Default Route
app.get('/', (req, res) => res.send("Welcome to RISSC Banking API"))

// User routes
app.get('/api/users', customerAPI.getCustomersAsync)
app.post('/api/user/register', customerAPI.createCustomerAsync)
app.post('/api/user/signin', customerAPI.signInCustomerAsync)
app.get('/api/user', customerAPI.getCustomerAsync)
app.patch('/api/user', customerAPI.updateCustomerAsync)
app.delete('/api/user', customerAPI.deleteCustomerAsync)

// fixed deposit routes
app.get('/api/fixeddeposits', fixedDepositAPI.getFixedDepositsAsync)
app.get('/api/fixeddeposit/:fixedDepositID', fixedDepositAPI.getFixedDepositAsync)
app.delete('/api/fixeddeposit/:fixedDepositID', fixedDepositAPI.deleteFixedDepositAsync)
app.get('/api/fixeddeposit/customer/:customerID', fixedDepositAPI.getFixedDepositsByCustomerIDAsync)
app.get('/api/fixeddeposit/account/:linkedAccountID', fixedDepositAPI.getFixedDepositsByLinkedAccountIDAsync)
/////// test with fronted
app.post('/api/fixeddeposit', fixedDepositAPI.createFixedDepositAsync)
app.patch('/api/fixeddeposit/:fixedDepositID', fixedDepositAPI.updateFixedDepositAsync)


// Employee routes
app.get('/api/employees', employeeAPI.getEmployeesAsync)
app.post('/api/employee/register', employeeAPI.createEmployeeAsync)
app.post('/api/employee/signin', employeeAPI.signInEmployeeAsync)
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

// loan routes
app.get('/api/loans', loanAPI.getLoansAsync)
app.get('/api/loan/:loanID', loanAPI.getLoanAsync)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})