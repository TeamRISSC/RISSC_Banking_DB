const loanSuper = require("./loanSuper");

class onlineLoan extends loanSuper {
    constructor(ID, branchID, customerID, amount, applyDate, timePeriod, FDID) {
        super(ID, branchID, customerID, amount, applyDate, timePeriod);
        this.FDID = FDID;
    }

    // setters and getters
    setFDID(FDID) {
        this.FDID = FDID;
    }
    getFDID() {
        return this.FDID;
    }
}