const express = require('express')
const bodyParser = require('body-parser')
const {server_config} = require("./src/config/config")
const customerAPI = require("./data/models/customer") 
const FixedDepositAPI = require('./data/models/fixedDeposit')

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
app.get('/api/user/:customerID', customerAPI.getCustomerAsync)
app.patch('/api/user/:customerID', customerAPI.updateCustomerAsync)
app.delete('/api/user/:customerID', customerAPI.deleteCustomerAsync)

// fixed deposit routes
app.get('/api/fixeddeposits', FixedDepositAPI.getFixedDepositsAsync)
app.get('/api/fixeddeposit/:fixedDepositID', FixedDepositAPI.getFixedDepositAsync)
app.delete('/api/fixeddeposit/:fixedDepositID', FixedDepositAPI.deleteFixedDepositAsync)
app.get('/api/fixeddeposit/customer/:customerID', FixedDepositAPI.getFixedDepositsByCustomerIDAsync)
app.get('/api/fixeddeposit/account/:linkedAccountID', FixedDepositAPI.getFixedDepositsByLinkedAccountIDAsync)
/////// test with fronted
app.post('/api/fixeddeposit', FixedDepositAPI.createFixedDepositAsync)
app.patch('/api/fixeddeposit/:fixedDepositID', FixedDepositAPI.updateFixedDepositAsync)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})