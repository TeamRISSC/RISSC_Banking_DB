const transaction = require("./transaction");

class deposit extends transaction{
    constructor(id, date, amount, accNo){
        super(id, date, amount);
        this.accountNumber = accNo;
    }

    // setters and getters
    setAccountNumber(accNo){
        this.accountNumber = accNo;
    }
    getAccountNumber(){
        return this.accountNumber;
    }
}