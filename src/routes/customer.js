const {MySQLDatabase} = require('../services/database')
const db = MySQLDatabase.getInstance()


// Customer functions
const handleCustomerGet = (req, res, next) => {
    let context = {};
    db.query('SELECT name FROM bank_account', function(err, rows, fields){
        if(err){
        next(err);
        return;
        }
        context.results = rows;
        res.send(context);
    });
}

const handleCustomerPost = (req, res, next) => {
    
}

module.exports = {
    handleCustomerGet
}