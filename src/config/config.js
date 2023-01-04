// Contains the configurations for the server
const admin_config = {
    host:"localhost",
    port: process.env.WEBSITE_MYSQL_PORT || 51940,
    user:"admin",
    password:"admin",
    database:"bank"
}

const manager_config = {
    host:"localhost",
    port: process.env.WEBSITE_MYSQL_PORT || 51940,
    user:"manager",
    password:"manager",
    database:"bank"
}

const employee_config = {
    host:"localhost",
    port: process.env.WEBSITE_MYSQL_PORT || 51940,
    user:"employee",
    password:"employee",
    database:"bank"
}

const customer_config = {
    host:"localhost",
    port: process.env.WEBSITE_MYSQL_PORT || 51940,
    user:"customer",
    password:"customer",
    database:"bank"
}

const server_config = {
    port: process.env.PORT || 5000
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