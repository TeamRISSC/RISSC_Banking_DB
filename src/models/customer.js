class customer{
    constructor(id, type, name, email, phone, username, address, pw){
        this.id = id;
        this.type = type;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.username = username;
        this.email = email;
        this.password = pw;
    }

    // setters and getters
    setID(id){
        this.id = id;
    }
    getID(){
        return this.id;
    }
    setType(type){
        this.type = type;
    }
    getType(){
        return this.type;
    }
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
    setPhone(phone){
        this.phone = phone;
    }
    getPhone(){
        return this.phone;
    }
    setUsername(username){
        this.username = username;
    }
    getUsername(){
        return this.username;
    }
    setEmail(email){
        this.email = email;
    }
    getEmail(){
        return this.email;
    }
    setPassword(pw){
        this.password = pw;
    }
    getPassword(){
        return this.password;
    }
}