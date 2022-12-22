const express = require('express')
const {server_config} = require("./src/config/config")
const { handleCustomerGet } = require("./src/routes/customer")

const app = express()
const port = server_config.port

// Default Route
app.get('/', (req, res, next) => res.send("Welcome to RISSC Banking API"))

// User routes
app.get('/api/users', handleCustomerGet)

  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})