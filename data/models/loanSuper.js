const {MySQLDBMySQLDB} = require('../../src/services/database')
const db = new MySQLDBMySQLDB()
const {signToken, verifyToken} = require('../../src/services/utils')
class LoanSuper {
    constructor(req) {
        this.branchID = req.body.branchID;
        this.customerID = req.body.customerID;
        this.amount = req.body.amount;
        this.applyDate = req.body.applyDate;
        this.timePeriod = req.body.timePeriod;
        this.linkedAccountID = req.body.linkedAccountID;
    }

    // setters and getters
    setID(ID) {
        this.ID = ID;
    }
    getID() {
        return this.ID;
    }
    setBranchID(branchID) {
        this.branchID = branchID;
    }
    getBranchID() {
        return this.branchID;
    }
    setCustomerID(customerID) {
        this.customerID = customerID;
    }
    getCustomerID() {
        return this.customerID;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
    setApplyDate(applyDate) {
        this.applyDate = applyDate;
    }
    getApplyDate() {
        return this.applyDate;
    }
    setTimePeriod(timePeriod) {
        this.timePeriod = timePeriod;
    }
    getTimePeriod() {
        return this.timePeriod;
    }
}

// get late loan installments based on managers branch
const getLateInstallmentsAsyncbyBranch = async (req, res) => {
    try{
      const token = req.headers.authorization.replace('Bearer ', '')
      console.log(token);
      const manager = verifyToken(token)
      const branchID = manager.branchID;
      console.log(manager);
      console.log(branchID);
      // Select all loan_installments from the loan_installment table
      const [rows2] = await db.connection.query('SELECT * FROM loan_installment WHERE status = "Late" AND loanID IN (SELECT id FROM loan WHERE branchID = ?)', [branchID]);
      const loan_installments = rows2;
        
      // select all onlineloan installments from the onlineloan_installment table
      const [rows3] = await db.connection.query('SELECT * FROM online_loan_installment WHERE status = "Late" AND onlineLoanID IN (SELECT id FROM online_loan WHERE branchID = ?)', [branchID]);
      const online_loan_installments = rows3;
      res.json({"loan_installments":loan_installments,
               "online_loan_installments":online_loan_installments});
  
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };

// export
module.exports = {
    LoanSuper,
    getLateInstallmentsAsyncbyBranch,
}; 