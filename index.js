const express = require('express')
const bodyParser = require('body-parser')
const {server_config} = require("./src/config/config")

// API route functions from the data models
const customerAPI = require('./data/models/customer')
const employeeAPI = require('./data/models/employee')
const managerAPI = require('./data/models/manager')

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


// Employee routes
app.get('/api/employees', employeeAPI.getEmployeesAsync)
app.post('/api/employee/register', employeeAPI.createEmployeeAsync)
app.post('/api/employee/signin', employeeAPI.signInEmployeeAsync)
app.get('/api/employee/:employeeID', employeeAPI.getEmployeeAsync)
app.patch('/api/employee/:employeeID', employeeAPI.updateEmployeeAsync)
app.delete('/api/employee/:employeeID', employeeAPI.deleteEmployeeAsync)


// Manager routes
app.get('/api/managers', managerAPI.getManagersAsync)
app.post('/api/manager/register', managerAPI.createManagerAsync)
app.post('/api/manager/signin', managerAPI.signInManagerAsync)
app.get('/api/manager/:managerID', managerAPI.getManagerAsync)
app.patch('/api/manager/:managerID', managerAPI.updateManagerAsync)
app.delete('/api/manager/:managerID', managerAPI.deleteManagerAsync)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})