const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()
class Branch{
    constructor(req){
      this.branchCode = req.body.branchCode
      this.name = req.body.name;
      this.address = req.body.address;
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
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
    }
    setManagerID(managerID){
      this.managerID = managerID;
    }
    getManagerID(){
      return this.managerID;
    }
    
}

// Async function to create a new branch
const createBranchAsync = async (req, res) => {
    try{  
    const branch = new Branch(req)
    
    // Insert the branch into the branch table
    const [result] = await db.connection.query('INSERT INTO branch SET ?', branch);
    const insertedBranchId = result.insertId;
    
    res.status(200).json({
      message: `Branch ${insertedBranchId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single branch
const getBranchAsync = async (req, res) => {
    try{
    // Select the branch from the branch table
    const [rows] = await db.connection.query('SELECT * FROM branch WHERE ID = ?', [req.params.branchID]);
    const branch = rows[0];

    if (!branch) {
      return res.status(404).json({
      message: 'Branch not found'
     });
   }
   res.status(200).json(branch);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to get all branches
const getBranchesAsync = async (req, res) => {
  try{
  // Select the branch from the branch table
  const [rows] = await db.connection.query('SELECT * FROM branch');
  res.status(200).json(rows);
  
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};


// Async function to update a branch
const updateBranchAsync = async (req, res) => {
  try {
    // Update the branch in the branch table
    const branchID = req.params.branchID
    const updatedBranch = new Branch(req)
    await db.connection.query('UPDATE branch SET ? WHERE ID = ?', [updatedBranch, branchID]);

    // Select the updated branch from the branch table
    const [rows] = await db.connection.query('SELECT * FROM branch WHERE ID = ?', [branchID]);
    const branch = rows[0];

    res.status(200).json(branch);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a branch
const deleteBranchAsync = async (req, res) => {
  try {
    // Branch should be free of any manager and employee to be deleted
    const [resManager] = await db.connection.query('SELECT COUNT(ID) from manager WHERE branchID = ?', [req.params.branchID])
    const [resEmployee] = await db.connection.query('SELECT COUNT(ID) from employee WHERE branchID = ?', [req.params.branchID])
    
    const managerCount = resManager[0]['COUNT(ID)'];
    const employeeCount = resEmployee[0]['COUNT(ID)'];
    
    if (managerCount + employeeCount != 0){
      res.status(400).json({
        message:"Cannot delete branch as employed staff has not been released"
      })
      return
    }
    
    // Delete the branch from the branch table
    await db.connection.query('DELETE FROM branch WHERE ID = ?', [req.params.branchID]);
    
    res.status(200).json({
      message: `Branch deleted successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};


module.exports = {
  Branch,
  createBranchAsync,
  getBranchAsync,
  getBranchesAsync,
  updateBranchAsync,
  deleteBranchAsync
}