class branch{
    constructor(id,name, address){
        this.name = name;
        this.address = address;
        this.id = id;
    }
    // setters and getters
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setAddress(address){
        this.address = address;
    }
    getAddress(){
        return this.address;
    }
    setID(id){
        this.id = id;
    }
    getID(){
        return this.id;
    }
    
}