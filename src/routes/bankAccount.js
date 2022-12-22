const {MySQLDatabase} = require("../services/database")
const db = new MySQLDatabase()

const handleBankAccountGet = (req, res, next) => {
    let context = {};
    db.query('SELECT * FROM bank_account', function(err, rows, fields){
        if(err){
        next(err);
        return;
        }
        context.results = rows;
        res.send(context);
    });
}

const handleBankAccountPost = (req, res, next) => {
    
}

const handleBankAccountPut = (req, res, next) => {

}

const handleBankAccountDelete = (req, res, next) => {
    
}

