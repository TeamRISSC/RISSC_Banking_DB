const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()
class LoanSuper {
    constructor(req) {
        this.branchID = req.body.branchID;
        this.customerID = req.body.customerID;
        this.amount = req.body.amount;
        this.applyDate = req.body.applyDate;
        this.timePeriod = req.body.timePeriod;
    }

    // setters and getters
    setID(ID) {
        this.ID = ID;
    }
    getID() {
        return this.ID;
    }
    setBranchID(branchID) {
        this.branchID = branchID;
    }
    getBranchID() {
        return this.branchID;
    }
    setCustomerID(customerID) {
        this.customerID = customerID;
    }
    getCustomerID() {
        return this.customerID;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
    setApplyDate(applyDate) {
        this.applyDate = applyDate;
    }
    getApplyDate() {
        return this.applyDate;
    }
    setTimePeriod(timePeriod) {
        this.timePeriod = timePeriod;
    }
    getTimePeriod() {
        return this.timePeriod;
    }
}

// export
module.exports = {LoanSuper};