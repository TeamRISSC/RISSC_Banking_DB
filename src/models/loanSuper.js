class loanSuper {
    constructor(ID, branchID, customerID, amount, applyDate, timePeriod) {
        this.ID = ID;
        this.branchID = branchID;
        this.customerID = customerID;
        this.amount = amount;
        this.applyDate = applyDate;
        this.timePeriod = timePeriod;
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
module.exports = loanSuper;