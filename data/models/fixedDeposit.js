class fixedDeposit {
    constructor(ID, linked_account,customer_ID,amount,period,interest_rate,maturity){
        this.ID = ID;
        this.linked_account = linked_account;
        this.customer_ID = customer_ID;
        this.amount = amount;
        this.period = period;
        this.interest_rate = interest_rate;
        this.maturity = maturity;
    }
    // setters and getters
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
    }
    setLinkedAccount(linked_account){
        this.linked_account = linked_account;
    }
    getLinkedAccount(){
        return this.linked_account;
    }
    setCustomerID(customer_ID){
        this.customer_ID = customer_ID;
    }
    getCustomerID(){
        return this.customer_ID;
    }
    setAmount(amount){
        this.amount = amount;
    }
    getAmount(){
        return this.amount;
    }
    setPeriod(period){
        this.period = period;
    }
    getPeriod(){
        return this.period;
    }
    setInterestRate(interest_rate){
        this.interest_rate = interest_rate;
    }
    getInterestRate(){
        return this.interest_rate;
    }
    setMaturity(maturity){
        this.maturity = maturity;
    }
    getMaturity(){
        return this.maturity;
    }

}