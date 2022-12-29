const {MySQLDBMySQLDB} = require('database.js')
const db = new MySQLDBMySQLDB()
class Transaction{
    static count = 0;
    constructor(req){
        this.ID = req.body.ID;
        this.date = req.body.date;
        this.amount = req.body.amount;
    }   

    // setters and getters
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
    }
    setDate(date){
        this.date = date;
    }
    getDate(){
        return this.date;
    }
    setAmount(amount){
        this.amount = amount;
    }
    getAmount(){
        return this.amount;
    }
}

// export 
module.exports = { Transaction };