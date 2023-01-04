// Contains the configurations for the server
// txt file is a reference for the format
const admin_config = {
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"bank"
}

const manager_config = {
    host:"localhost",
    user:"manager",
    password:"manager",
    database:"bank"
}

const employee_config = {
    host:"localhost",
    user:"employee",
    password:"employee",
    database:"bank"
}

const customer_config = {
    host:"localhost",
    user:"customer",
    password:"customer",
    database:"bank"
}

const server_config = {
    port:5000
}

const secret = 'secret'

module.exports = {
    customer_config,
    employee_config,
    manager_config,
    admin_config,
    server_config,
    secret
}