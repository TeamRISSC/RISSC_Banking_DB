class employee{
    constructor(id, branchId, name, salary, contactNumber){
        this.id = id;
        this.branchId = branchId;
        this.name = name;
        this.salary = salary;
        this.contactNumber = contactNumber;
    }
    // setters and getters
    setID(id){
        this.id = id;
    }
    getID(){
        return this.id;
    }
    setBranchID(branchId){
        this.branchId = branchId;
    }
    getBranchID(){
        return this.branchId;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setSalary(salary){
        this.salary = salary;
    }
    getSalary(){
        return this.salary;
    }
    setContactNumber(contactNumber){
        this.contactNumber = contactNumber;
    }
    getContactNumber(){
        return this.contactNumber;
    }
    
}