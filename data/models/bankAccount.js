class bankAccount{
    constructor(accountNumber, CustomerID, branchID, name, balance, min_balance, accountType, intRate, maxWithdrawals, currentWithdrawals){
        this.accountNumber = accountNumber;
        this.CustomerID = CustomerID;
        this.branchID = branchID;
        this.name = name;
        this.balance = balance;
        this.min_balance = min_balance;
        this.accountType = accountType;
        this.intRate = intRate;
        this.maxWithdrawals = maxWithdrawals;
        this.currentWithdrawals = currentWithdrawals;
    }
    // setters and getters
    setAccountNumber(accountNumber){
        this.accountNumber = accountNumber;
    }
    getAccountNumber(){
        return this.accountNumber;
    }
    setCustomerID(CustomerID){
        this.CustomerID = CustomerID;
    }
    getCustomerID(){
        return this.CustomerID;
    }
    setBranchID(branchID){
        this.branchID = branchID;
    }
    getBranchID(){
        return this.branchID;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setBalance(balance){
        this.balance = balance;
    }
    getBalance(){
        return this.balance;
    }
    setMinBalance(min_balance){
        this.min_balance = min_balance;
    }
    getMinBalance(){
        return this.min_balance;
    }
    setAccountType(accountType){
        this.accountType = accountType;
    }
    getAccountType(){
        return this.accountType;
    }
    setIntRate(intRate){
        this.intRate = intRate;
    }
    getIntRate(){
        return this.intRate;
    }
    setMaxWithdrawals(maxWithdrawals){
        this.maxWithdrawals = maxWithdrawals;
    }
    getMaxWithdrawals(){
        return this.maxWithdrawals;
    }
    setCurrentWithdrawals(currentWithdrawals){
        this.currentWithdrawals = currentWithdrawals;
    }
    getCurrentWithdrawals(){
        return this.currentWithdrawals;
    }
    
}