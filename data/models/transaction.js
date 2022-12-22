class transaction{
    static count = 0;
    constructor(id, date, amount){
        this.id = id;
        this.date = date;
        this.amount = amount;
    }   

    // setters and getters
    setID(id){
        this.id = id;
    }
    getID(){
        return this.id;
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
module.exports = transaction;