// Contains the configurations for the server
let db_config = {
    host:"localhost",
    user:"root",
    password:"root",
    database:"bank",
};

let server_config = {
    port:5000,
    baseURI:"api/rissc/"
}

module.exports = {
    db_config,
    server_config
};