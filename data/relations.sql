-- create the tables of the database
drop database bank;
create database bank;
use bank;
-- create the tables of the database

CREATE TABLE admin (
  ID            INT NOT NULL AUTO_INCREMENT,
  username                VARCHAR(30) NOT NULL,
  password                VARCHAR(256) NOT NULL,
  PRIMARY KEY(ID),
  UNIQUE(username)
);


CREATE TABLE customer (
  ID            INT NOT NULL AUTO_INCREMENT,
  type           VARCHAR(10)
      check (type in ('Individual', 'Organization')),
  name                    VARCHAR(100) NOT NULL,
  address                 VARCHAR(500) NOT NULL,
  contactNumber            CHAR(10) NULL,
  username                VARCHAR(30) NOT NULL,
  email                VARCHAR(256) NOT NULL,
  password                VARCHAR(256) NOT NULL,
  PRIMARY KEY(ID),
  UNIQUE(username)
);

CREATE TABLE branch (
  ID                 INT NOT NULL AUTO_INCREMENT,
  branchCode         INT NOT NULL,
  name               VARCHAR(50) NOT NULL,
  address            VARCHAR(256) NOT NULL,
  PRIMARY KEY(ID),
  UNIQUE(branchCode)
);

CREATE TABLE manager (
  ID                    INT NOT NULL AUTO_INCREMENT,
  name                    VARCHAR(100),
  salary                  NUMERIC(10,2),
  contactNumber          VARCHAR(10),
  branchID         INT NOT NULL,
  username                VARCHAR(30) NOT NULL,
  email                VARCHAR(256) NOT NULL,
  password                VARCHAR(256) NOT NULL,
  FOREIGN KEY (branchID) REFERENCES branch(ID),
  PRIMARY KEY(ID),
  UNIQUE(username)
);

CREATE TABLE employee (
  ID                    INT NOT NULL AUTO_INCREMENT,
  branchID              INT NOT NULL,
  name                    VARCHAR(100),
  salary                  NUMERIC(10,2),
  contactNumber          VARCHAR(10),
  username                VARCHAR(30) NOT NULL,
  email                VARCHAR(256) NOT NULL,
  password                VARCHAR(256) NOT NULL,
  FOREIGN KEY (branchID) REFERENCES branch(ID),
  PRIMARY KEY(ID),
  UNIQUE(username)
);

CREATE TABLE bank_account (
  accountNumber          VARCHAR(10),
  customerID             INT NOT NULL,
  branchID               INT NOT NULL,
  name                    VARCHAR(100) NOT NULL,
  balance                 NUMERIC(10,2),
  minBalance             NUMERIC(10,2),
  accountType            VARCHAR(50)
      check (accountType in ('Savings', 'Checking')),
  createdDate            DATETIME,
  interestRate           NUMERIC(5,2),
  maxWithdrawals         NUMERIC(10,0),
  currentWithdrawals     NUMERIC(10,0),
  PRIMARY KEY(accountNumber),
  FOREIGN KEY (branchID) REFERENCES branch(ID),
  FOREIGN KEY (customerID) REFERENCES customer(ID)
);


CREATE TABLE fixed_deposit (
  ID        INT NOT NULL AUTO_INCREMENT,
  linkedAccountID       VARCHAR(10),
  customerID           INT NOT NULL,
  amount                  NUMERIC(10,2)
      check(amount > 0),
  period                  VARCHAR(50)
      check(period > 0),
  interestRate           NUMERIC(5,2),
  maturityDate           DATETIME,
  PRIMARY KEY(ID),
  FOREIGN KEY (linkedAccountID) REFERENCES bank_account(accountNumber),
  FOREIGN KEY (customerID) REFERENCES customer(ID)
);

CREATE TABLE withdrawal (
  ID            INT NOT NULL AUTO_INCREMENT,
  accountNumber          VARCHAR(10),
  amount                  NUMERIC(10,2)
    check(amount > 0),
  date                    DATETIME,
  PRIMARY KEY(ID),
  FOREIGN KEY (accountNumber) REFERENCES bank_account(accountNumber)
);

CREATE TABLE online_loan (
  ID                 INT NOT NULL AUTO_INCREMENT,
  branchID           INT NOT NULL,
  customerID         INT NOT NULL,
  FDID               INT NOT NULL,
  amount                  NUMERIC(10,2)
      check(amount > 0),
  applyDate              DATE,
  timePeriod             NUMERIC(3,0),
  interestRate           NUMERIC(5,2) DEFAULT 0.1,
  linkedAccountID       VARCHAR(10),
  PRIMARY KEY(ID),
  FOREIGN KEY (customerID) REFERENCES customer(ID),
  FOREIGN KEY (branchID) REFERENCES branch(ID),
  FOREIGN KEY (FDID) REFERENCES fixed_deposit(ID),
  FOREIGN KEY (linkedAccountID) REFERENCES bank_account(accountNumber)
);

CREATE TABLE deposit (
  ID                    INT NOT NULL AUTO_INCREMENT,
  accountNumber          VARCHAR(10),
  amount                 NUMERIC(10,2)
      check(amount > 0),
  date                    DATETIME,
  PRIMARY KEY(ID),
  FOREIGN KEY (accountNumber) REFERENCES bank_account(accountNumber)
);

CREATE TABLE transfer (
  ID              INT NOT NULL AUTO_INCREMENT,
  fromAccountID         VARCHAR(10) NOT NULL,
  toAccountID           VARCHAR(10) NOT NULL,
  date                    DATETIME,
  amount                  NUMERIC(10,2),
  remarks                 VARCHAR(50),
  PRIMARY KEY(ID),
  FOREIGN KEY (toAccountID) REFERENCES bank_account(accountNumber),
  FOREIGN KEY (fromAccountID) REFERENCES bank_account(accountNumber)
);

CREATE TABLE loan (
  ID                INT NOT NULL AUTO_INCREMENT,
  branchID               INT NOT NULL,
  customerID             INT NOT NULL,
  amount                  NUMERIC(10,2),
  applyDate               DATE,
  approveDate            DATE DEFAULT NULL,
  timePeriod             NUMERIC(3,0),
  interestRate           NUMERIC(5,2) DEFAULT 0.1,
  loanType               VARCHAR(20),
  linkedAccountID        VARCHAR(10),
  isApproved             BOOLEAN DEFAULT false,
  PRIMARY KEY(ID),
  FOREIGN KEY (customerID) REFERENCES customer(ID),
  FOREIGN KEY (branchID) REFERENCES branch(ID),
  FOREIGN KEY (linkedAccountID) REFERENCES bank_account(accountNumber)
);

CREATE TABLE loan_installment (
  ID                 INT NOT NULL AUTO_INCREMENT,
  loanID             INT NOT NULL,
  payment                 NUMERIC(10,2),
  date                    DATETIME,
  installmentNumber       NUMERIC(3,0),
  status                  VARCHAR(20),
  check (status in ('UnPaid', 'OnTime', 'Late')),
  PRIMARY KEY(ID),
  FOREIGN KEY(loanID) REFERENCES loan(ID)
  );

CREATE TABLE online_loan_installment (
  ID                 INT NOT NULL AUTO_INCREMENT,
  onlineLoanID             INT NOT NULL,
  payment                 NUMERIC(10,2),
  date                    DATETIME,
  installmentNumber       NUMERIC(3,0),
  status                  VARCHAR(20),
  check (status in ('UnPaid', 'OnTime', 'Late')),
  PRIMARY KEY(ID),
  FOREIGN KEY(onlineLoanID) REFERENCES online_loan(ID)
);

-- drop users and flush previleges
drop user 'admin'@'localhost';
drop user 'employee'@'localhost';
drop user 'manager'@'localhost';
drop user 'customer'@'localhost';


-- Users for the database
CREATE USER 'customer'@'localhost' IDENTIFIED BY 'customer';
flush privileges;
CREATE USER 'employee'@'localhost' IDENTIFIED BY 'employee';
flush privileges;
CREATE USER 'manager'@'localhost' IDENTIFIED BY 'manager';
flush privileges;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
flush privileges;

-- Grant all priviledges for all users
grant all privileges on bank.* to 'admin'@'localhost';
grant all privileges on bank.* to 'manager'@'localhost';
grant all privileges on bank.* to 'employee'@'localhost';
grant all privileges on bank.* to 'customer'@'localhost';