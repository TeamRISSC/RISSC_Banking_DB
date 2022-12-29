const express = require('express')
const bodyParser = require('body-parser')
const {server_config} = require("./src/config/config")
const customerAPI = require("./data/models/customer") 

const app = express()
const port = server_config.port

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// Default Route
app.get('/', (req, res) => res.send("Welcome to RISSC Banking API"))

// User routes
app.get('/api/users', customerAPI.getCustomersAsync)
app.post('/api/user/register', customerAPI.createCustomerAsync)
app.post('/api/user/signin', customerAPI.getCustomerAsync)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})