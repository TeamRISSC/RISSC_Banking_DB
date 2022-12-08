const loanSuper = require("./loanSuper");

class loan extends loanSuper{
    constructor(ID, branchID, customerID, amount, applyDate, timePeriod, apprDate, loanType){
        super(ID, branchID, customerID, amount, applyDate, timePeriod);
        this.approveDate = apprDate;
        this.loanType = loanType;
    }

    // setters and getters
    setApproveDate(apprDate){
        this.approveDate = apprDate;
    }
    getApproveDate(){
        return this.approveDate;
    }
    setLoanType(loanType){
        this.loanType = loanType;
    }
    getLoanType(){
        return this.loanType;
    }
}

