class FixedDeposit {
    constructor(req){
        this.ID = req.body.ID;
        this.linkedAccountID = req.body.linkedAccountID;
        this.customer_ID = req.body.customer_ID;
        this.amount = req.body.amount;
        this.period = req.body.period;
        this.interestRate = req.body.interestRate;
        this.maturityDate = req.body.maturityDate;
    }
    // setters and getters
    setID(ID){
        this.ID = ID;
    }
    getID(){
        return this.ID;
    }
    setLinkedAccountID(linkedAccountID){
        this.linkedAccountID = linkedAccountID;
    }
    getLinkedAccountID(){
        return this.linkedAccountID;
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
    setInterestRate(interestRate){
        this.interestRate = interestRate;
    }
    getInterestRate(){
        return this.interestRate;
    }
    setMaturity(maturityDate){
        this.maturityDate = maturityDate;
    }
    getMaturity(){
        return this.maturityDate;
    }

}


module.exports = {FixedDeposit}

// Async function to create a new fixed_deposit
exports.createFixedDepositAsync = async (req, res) => {
    try{  
    const fixed_deposit = new FixedDeposit(req)
    
    // Insert the fixed_deposit into the fixed_deposit table
    const [result] = await db.connection.query('INSERT INTO fixed_deposit SET ?', fixed_deposit);
    const insertedFixedDepositId = result.insertId;
    
    res.status(200).json({
      message: `FixedDeposit ${insertedFixedDepositId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single fixed_deposit
exports.getFixedDepositAsync = async (fixed_depositId) => {
    try{
    // Select the fixed_deposit from the fixed_deposit table
    const [rows] = await db.connection.query('SELECT * FROM fixed_deposit WHERE id = ?', [fixed_depositId]);
    const fixed_deposit = rows[0];

    if (!fixed_deposit) {
      return res.status(404).json({
      message: 'FixedDeposit not found'
     });
   }
   res.json(fixed_deposit);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a fixed_deposit
exports.updateFixedDepositAsync = async (fixed_depositId, updatedFixedDeposit) => {
  try {
    // Update the fixed_deposit in the fixed_deposit table
    await db.connection.query('UPDATE fixed_deposit SET ? WHERE id = ?', [updatedFixedDeposit, fixed_depositId]);

    // Select the updated fixed_deposit from the fixed_deposit table
    const [rows] = await db.connection.query('SELECT * FROM fixed_deposit WHERE id = ?', [fixed_depositId]);
    const fixed_deposit = rows[0];

    res.json(fixed_deposit);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a fixed_deposit
exports.deleteFixedDepositAsync = async (fixed_depositId) => {
  try {
    // Delete the fixed_deposit from the fixed_deposit table
    await db.connection.query('DELETE FROM fixed_deposit WHERE id = ?', [fixed_depositId]);
    
    res.status(200).json({
      message: `FixedDeposit ${insertedFixedDepositId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
