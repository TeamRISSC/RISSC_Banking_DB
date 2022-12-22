const transaction = require("./transaction");

class transfer extends transaction{
    constructor(id, date, amount, from, to, remarks){
        super(id, date, amount);
        this.from = from;
        this.to = to;
        this.remarks = remarks;
    }

    // setters and getters
    setFrom(from){
        this.from = from;
    }
    getFrom(){
        return this.from;
    }
    setTo(to){
        this.to = to;
    }
    getTo(){
        return this.to;
    }
    setRemarks(remarks){
        this.remarks = remarks;
    }
    getRemarks(){
        return this.remarks;
    }
}