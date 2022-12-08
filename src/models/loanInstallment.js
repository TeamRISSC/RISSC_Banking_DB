class lonaInstallment{
    constructor(loanId, amount, date, insNum){
        this.loanId = loanId;
        this.payment = amount;
        this.date = date;
        this.installmentNumber = insNum
    }

    // setters and getters
    setLoanId(loanId){
        this.loanId = loanId;
    }
    getLoanId(){
        return this.loanId;
    }
    setPayment(amount){
        this.payment = amount;
    }
    getPayment(){
        return this.payment;
    }
    setDate(date){
        this.date = date;
    }
    getDate(){
        return this.date;
    }
    setInstallmentNumber(insNum){
        this.installmentNumber = insNum;
    }
    getInstallmentNumber(){
        return this.installmentNumber;
    }
}