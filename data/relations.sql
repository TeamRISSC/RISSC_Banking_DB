-- create the tables of the database
drop database bank;
create database bank;
use bank;
-- create the tables of the database

CREATE TABLE loan_installment (
  loan_ID                 VARCHAR(20),
  payment                 NUMERIC(10,2),
  date_time               DATETIME,
  installment_number      NUMERIC(3,0),
  PRIMARY KEY(loan_ID)
);

CREATE TABLE customer (
  customer_ID            VARCHAR(50),
  customer_type           VARCHAR(10)
      check (customer_type in ('Individual', 'Organization')),
  name                    VARCHAR(100) NOT NULL,
  address                 VARCHAR(500) NOT NULL,
  phone_number            CHAR(10) NULL,
  username                VARCHAR(30) NOT NULL,
  password                VARCHAR(256) NOT NULL,
  PRIMARY KEY(customer_ID),
  UNIQUE(username)
);

CREATE TABLE manager (
  manager_ID             VARCHAR(20),
  name                    VARCHAR(100),
  salary                  NUMERIC(10,2),
  contact_number          VARCHAR(10),
  PRIMARY KEY(manager_ID)
);

CREATE TABLE branch (
  branch_ID               VARCHAR(20) NOT NULL,
  name                    VARCHAR(50) NOT NULL,
  address                 VARCHAR(256) NOT NULL,
  manager_ID              VARCHAR(20),
  PRIMARY KEY(branch_ID),
  FOREIGN KEY (manager_ID) REFERENCES manager(manager_ID)
		on delete cascade 
);

CREATE TABLE employee (
  employee_ID             VARCHAR(20),
  branch_ID               VARCHAR(20),
  name                    VARCHAR(100),
  salary                  NUMERIC(10,2),
  contact_number          VARCHAR(10),
  PRIMARY KEY(employee_ID),
  FOREIGN KEY (branch_ID) REFERENCES branch(branch_ID)
);

CREATE TABLE bank_account (
  account_number          VARCHAR(10),
  customer_ID             VARCHAR(50) NOT NULL,
  branch_ID               VARCHAR(20) NOT NULL,
  name                    VARCHAR(100) NOT NULL,
  balance                 NUMERIC(10,2),
  min_balance             NUMERIC(10,2),
  account_type            VARCHAR(50)
      check (account_type in ('Savings', 'Checking')),
  interest_rate           NUMERIC(5,2),
  max_withdrawals         NUMERIC(10,0),
  current_withdrawals     NUMERIC(10,0),
  PRIMARY KEY(account_number),
  FOREIGN KEY (branch_ID) REFERENCES branch(branch_ID),
  FOREIGN KEY (customer_ID) REFERENCES customer(customer_ID)
);


CREATE TABLE fixed_deposit (
  fixed_deposit_ID        VARCHAR(10),
  linked_account_ID       VARCHAR(10),
  customer_ID             VARCHAR(50),
  amount                  NUMERIC(10,2)
      check(amount > 0),
  period                  VARCHAR(50)
      check(period > 0),
  interest_rate           NUMERIC(5,2),
  maturity_date           DATETIME,
  PRIMARY KEY(fixed_deposit_ID),
  FOREIGN KEY (linked_account_ID) REFERENCES bank_account(account_number),
  FOREIGN KEY (customer_ID) REFERENCES customer(customer_ID)
);

CREATE TABLE withdrawal (
  withdrawal_ID           VARCHAR(10),
  account_number          VARCHAR(10),
  amount                  NUMERIC(10,2)
    check(amount > 0),
  date_time               DATETIME,
  PRIMARY KEY(withdrawal_ID),
  FOREIGN KEY (account_number) REFERENCES bank_account(account_number)
);

CREATE TABLE online_loan (
  loan_ID                 VARCHAR(20),
  branch_ID               VARCHAR(20),
  customer_ID             VARCHAR(50),
  FD_ID                   VARCHAR(20),
  amount                  NUMERIC(10,2)
      check(amount > 0),
  apply_date              DATE,
  time_period             NUMERIC(3,0),
  PRIMARY KEY(loan_ID),
  FOREIGN KEY (customer_ID) REFERENCES customer(customer_ID)
);

CREATE TABLE deposit (
  deposit_ID              VARCHAR(10),
  account_number          VARCHAR(10),
  amount                  NUMERIC(10,2)
      check(amount > 0),
  date_time               DATETIME,
  FOREIGN KEY (account_number) REFERENCES bank_account(account_number)
);

CREATE TABLE transfer (
  invoice_ID              VARCHAR(50),
  from_account_ID         VARCHAR(50),
  to_account_ID           VARCHAR(50),
  date_time               DATETIME,
  amount                  NUMERIC(10,2),
  remarks                 VARCHAR(50),
  FOREIGN KEY (to_account_ID) REFERENCES bank_account(account_number),
  FOREIGN KEY (from_account_ID) REFERENCES bank_account(account_number)
);

CREATE TABLE loan (
  loan_ID                 VARCHAR(20),
  branch_ID               VARCHAR(20),
  customer_ID             VARCHAR(50),
  amount                  NUMERIC(10,2),
  apply_date              DATE,
  approve_date            DATE,
  time_period             NUMERIC(3,0),
  loan_type               VARCHAR(20),
  PRIMARY KEY(loan_ID),
  FOREIGN KEY (customer_ID) REFERENCES customer(customer_ID),
  FOREIGN KEY (branch_ID) REFERENCES branch(branch_ID)
);
