class Employee{
    constructor(req){
        this.ID = req.body.ID;
        this.branchID = req.body.branchID;
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


module.exports = {Employee}

// Async function to create a new employee
exports.createEmployeeAsync = async (req, res) => {
    try{  
    const employee = new Employee(req)
    
    // Insert the employee into the employee table
    const [result] = await db.connection.query('INSERT INTO employee SET ?', employee);
    const insertedEmployeeId = result.insertId;
    
    res.status(200).json({
      message: `Employee ${insertedEmployeeId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single employee
exports.getEmployeeAsync = async (employeeId) => {
    try{
    // Select the employee from the employee table
    const [rows] = await db.connection.query('SELECT * FROM employee WHERE ID = ?', [employeeId]);
    const employee = rows[0];

    if (!employee) {
      return res.status(404).json({
      message: 'Employee not found'
     });
   }
   res.json(employee);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a employee
exports.updateEmployeeAsync = async (employeeId, updatedEmployee) => {
  try {
    // Update the employee in the employee table
    await db.connection.query('UPDATE employee SET ? WHERE ID = ?', [updatedEmployee, employeeId]);

    // Select the updated employee from the employee table
    const [rows] = await db.connection.query('SELECT * FROM employee WHERE ID = ?', [employeeId]);
    const employee = rows[0];

    res.json(employee);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a employee
exports.deleteEmployeeAsync = async (employeeId) => {
  try {
    // Delete the employee from the employee table
    await db.connection.query('DELETE FROM employee WHERE ID = ?', [employeeId]);
    
    res.status(200).json({
      message: `Employee ${insertedEmployeeId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
