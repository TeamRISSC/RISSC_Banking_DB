const express = require('express')
const {server_config} = require("./src/config/config")
const { handleCustomerGet } = require("./src/routes/customer")

const app = express()
const port = server_config.port

// User routes
app.get('/api/users', handleCustomerGet)

// Transaction routes
app.get('api/transactions', handleTransactionGet)
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = {db}