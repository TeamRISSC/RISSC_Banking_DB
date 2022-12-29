const LoanSuper = require("./loanSuper");

class OnlineLoan extends LoanSuper {
    constructor(req) {
        super(req);
        this.FDID = req.body.FDID;
    }

    // setters and getters
    setFDID(FDID) {
        this.FDID = FDID;
    }
    getFDID() {
        return this.FDID;
    }
}


module.exports = {OnlineLoan}

// Async function to create a new online_loan
exports.createOnlineLoanAsync = async (req, res) => {
    try{  
    const online_loan = new OnlineLoan(req)
    
    // Insert the online_loan into the online_loan table
    const [result] = await db.connection.query('INSERT INTO online_loan SET ?', online_loan);
    const insertedOnlineLoanId = result.insertId;
    
    res.status(200).json({
      message: `OnlineLoan ${insertedOnlineLoanId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to get a single online_loan
exports.getOnlineLoanAsync = async (online_loanId) => {
    try{
    // Select the online_loan from the online_loan table
    const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE id = ?', [online_loanId]);
    const online_loan = rows[0];

    if (!online_loan) {
      return res.status(404).json({
      message: 'OnlineLoan not found'
     });
   }
   res.json(online_loan);
    
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// Async function to update a online_loan
exports.updateOnlineLoanAsync = async (online_loanId, updatedOnlineLoan) => {
  try {
    // Update the online_loan in the online_loan table
    await db.connection.query('UPDATE online_loan SET ? WHERE id = ?', [updatedOnlineLoan, online_loanId]);

    // Select the updated online_loan from the online_loan table
    const [rows] = await db.connection.query('SELECT * FROM online_loan WHERE id = ?', [online_loanId]);
    const online_loan = rows[0];

    res.json(online_loan);
    
    } catch (error) {
    res.status(500).json({
      error: error
    });
    }
};

// Async function to delete a online_loan
exports.deleteOnlineLoanAsync = async (online_loanId) => {
  try {
    // Delete the online_loan from the online_loan table
    await db.connection.query('DELETE FROM online_loan WHERE id = ?', [online_loanId]);
    
    res.status(200).json({
      message: `OnlineLoan ${insertedOnlineLoanId} created successfully!`
    });

  } catch (error) {
    res.status(500).json({
      error: error
    });
  } 
};
