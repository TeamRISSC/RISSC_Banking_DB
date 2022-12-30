-- create the tables of the database
drop database bank;
create database bank;
use bank;
-- create the tables of the database

CREATE TABLE loan_installment (
  ID                 INT NOT NULL AUTO_INCREMENT,
  payment                 NUMERIC(10,2),
  date                    DATETIME,
  installmentNumber       NUMERIC(3,0),
  PRIMARY KEY(ID)
);

CREATE TABLE customer (
  ID            INT NOT NULL AUTO_INCREMENT,
  type           VARCHAR(10)
      check (type in ('Individual', 'Organization')),
  name                    VARCHAR(100) NOT NULL,
  address                 VARCHAR(500) NOT NULL,
  phone            CHAR(10) NULL,
  username                VARCHAR(30) NOT NULL,
  email                VARCHAR(256) NOT NULL,
  password                VARCHAR(256) NOT NULL,
  PRIMARY KEY(ID),
  UNIQUE(username)
);

CREATE TABLE manager (
  ID                    INT NOT NULL AUTO_INCREMENT,
  name                    VARCHAR(100),
  salary                  NUMERIC(10,2),
  contactNumber          VARCHAR(10),
  PRIMARY KEY(ID)
);

CREATE TABLE branch (
  ID                 INT NOT NULL AUTO_INCREMENT,
  name               VARCHAR(50) NOT NULL,
  address            VARCHAR(256) NOT NULL,
  manager_ID         INT NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY (manager_ID) REFERENCES manager(ID)
		on delete cascade 
);

CREATE TABLE employee (
  ID                    INT NOT NULL AUTO_INCREMENT,
  branchID              INT NOT NULL,
  name                    VARCHAR(100),
  salary                  NUMERIC(10,2),
  contactNumber          VARCHAR(10),
  PRIMARY KEY(ID),
  FOREIGN KEY (branchID) REFERENCES branch(ID)
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
  ID           VARCHAR(10),
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
  FDID                   VARCHAR(20),
  amount                  NUMERIC(10,2)
      check(amount > 0),
  applyDate              DATE,
  timePeriod             NUMERIC(3,0),
  PRIMARY KEY(ID),
  FOREIGN KEY (customerID) REFERENCES customer(ID)
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
  approveDate            DATE,
  timePeriod             NUMERIC(3,0),
  loanType               VARCHAR(20),
  PRIMARY KEY(ID),
  FOREIGN KEY (customerID) REFERENCES customer(ID),
  FOREIGN KEY (branchID) REFERENCES branch(ID)
);
