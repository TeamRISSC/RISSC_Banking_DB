class Manager{
    constructor(req){
        this.ID = req.body.ID;
        this.name = req.body.name;
        this.salary = req.body.salary;
        this.contactNumber = req.body.contactNumber;
    }
    // setters and getters
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
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


module.exports = {Manager}

// Async function to create a new manager
exports.createManagerAsync = async (req, res) => {
    try{  
    const manager = new Manager(req)
    
    // Insert the manager into the manager table
    const [result] = await db.connection.query('INSERT INTO manager SET ?', manager);
    const insertedManagerId = result.insertId;
    
    res.status(200).json({
      message: `Manager ${insertedManagerId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single manager
exports.getManagerAsync = async (managerId) => {
    try{
    // Select the manager from the manager table
    const [rows] = await db.connection.query('SELECT * FROM manager WHERE ID = ?', [managerId]);
    const manager = rows[0];

    if (!manager) {
      return res.status(404).json({
      message: 'Manager not found'
     });
   }
   res.json(manager);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a manager
exports.updateManagerAsync = async (managerId, updatedManager) => {
  try {
    // Update the manager in the manager table
    await db.connection.query('UPDATE manager SET ? WHERE ID = ?', [updatedManager, managerId]);

    // Select the updated manager from the manager table
    const [rows] = await db.connection.query('SELECT * FROM manager WHERE ID = ?', [managerId]);
    const manager = rows[0];

    res.json(manager);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a manager
exports.deleteManagerAsync = async (managerId) => {
  try {
    // Delete the manager from the manager table
    await db.connection.query('DELETE FROM manager WHERE ID = ?', [managerId]);
    
    res.status(200).json({
      message: `Manager ${insertedManagerId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
