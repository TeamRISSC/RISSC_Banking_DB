// Contains the configurations for the server
// txt file is a reference for the format
const admin_config = {
    host:"127.0.0.1",
    port:51940,
    user:"admin",
    password:"admin",
    database:"bank"
}

const manager_config = {
    host:"127.0.0.1",
    port:51940,
    user:"manager",
    password:"manager",
    database:"bank"
}

const employee_config = {
    host:"127.0.0.1",
    port:51940,
    user:"employee",
    password:"employee",
    database:"bank"
}

const customer_config = {
    host:"127.0.0.1",
    port:51940,
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