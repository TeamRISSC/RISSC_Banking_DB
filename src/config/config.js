// Contains the configurations for the server
const azure_config = {
    host:"127.0.0.1",
    port: process.env.WEBSITE_MYSQL_PORT || 51940,
    user:"azure",
    password:"6#vWHD_$",
    database:"localdb"
}
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
    port: process.env.PORT || 5000
}

const secret = 'secret'

module.exports = {
    azure_config,
    customer_config,
    employee_config,
    manager_config,
    admin_config,
    server_config,
    secret
}