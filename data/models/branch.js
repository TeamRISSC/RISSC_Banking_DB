class Branch{
    constructor(req){
        this.name = req.body.name;
        this.address = req.body.address;
        this.ID = req.body.ID;
        this.managerID = req.body.managerID;
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

module.exports = {Branch}

// Async function to create a new branch
exports.createBranchAsync = async (req, res) => {
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
exports.getBranchAsync = async (branchId) => {
    try{
    // Select the branch from the branch table
    const [rows] = await db.connection.query('SELECT * FROM branch WHERE ID = ?', [branchId]);
    const branch = rows[0];

    if (!branch) {
      return res.status(404).json({
      message: 'Branch not found'
     });
   }
   res.json(branch);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a branch
exports.updateBranchAsync = async (branchId, updatedBranch) => {
  try {
    // Update the branch in the branch table
    await db.connection.query('UPDATE branch SET ? WHERE ID = ?', [updatedBranch, branchId]);

    // Select the updated branch from the branch table
    const [rows] = await db.connection.query('SELECT * FROM branch WHERE ID = ?', [branchId]);
    const branch = rows[0];

    res.json(branch);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a branch
exports.deleteBranchAsync = async (branchId) => {
  try {
    // Delete the branch from the branch table
    await db.connection.query('DELETE FROM branch WHERE ID = ?', [branchId]);
    
    res.status(200).json({
      message: `Branch ${insertedBranchId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
