CREATE TABLE `loan_installment` (
  `loan_ID` VARCHAR(20),
  `payment` DECIMAL(10,2),
  `date_time` DATETIME,
  `installment _number` INT(3)
);

CREATE TABLE `branch` (
  `manager_ID` VARCHAR(20),
  `branch_name` VARCHAR(50),
  `branch_ID` VARCHAR(20),
  `address` VARCHAR(256)
);

CREATE TABLE `customer` (
  `custormer_ID` VARCHAR(50),
  `customer_type` VARCHAR(10),
  `name` VARCHAR(100),
  `address` VARCHAR(500),
  `phone_number` VARCHAR(10,2),
  `username` VARCHAR(30),
  `password` VARCHAR(256)
);

CREATE TABLE `bank_account` (
  `customer_ID` VARCHAR(50),
  `branch_ID` VARCHAR(20),
  `account_number` VARCHAR(10),
  `name` VARCHAR(100),
  `balance` DECIMAL(10,2),
  `min_balance` DECIMAL(10,2),
  `account_type` VARCHAR(50),
  `interest_rate` DECIMAL(2,2),
  `max_withdrawals` INT(10),
  `current_withdrawals` INT(10),
  FOREIGN KEY (`branch_ID`) REFERENCES `branch`(`branch_ID`),
  FOREIGN KEY (`customer_ID`) REFERENCES `customer`(`custormer_ID`)
);

CREATE TABLE `fixed_deposit` (
  `customer_ID` VARCHAR(50),
  `fixed_deposit_ID` VARCHAR(10),
  `linked_account_ID` VARCHAR(10),
  `amount` DECIMAL(10,2),
  `period` VARCHAR(50),
  `interest_rate` DECIMAL(2,2),
  `maturity_date` DATETIME,
  FOREIGN KEY (`linked_account_ID`) REFERENCES `bank_account`(`account_number`)
);

CREATE TABLE `withdrawal` (
  `withdrawal_ID` VARCHAR(10),
  `account_number` VARCHAR(10),
  `amount` DECIMAL(10,2),
  `date_time` DATETIME,
  FOREIGN KEY (`account_number`) REFERENCES `bank_account`(`account_number`)
);

CREATE TABLE `online_loan` (
  `loan_ID` VARCHAR(20),
  `branch_ID` VARCHAR(20),
  `customer_ID` VARCHAR(50),
  `FD_ID` VARCHAR(20),
  `amount` DECIMAL(10,2),
  `apply_date` DATE,
  `time_period` YEAR,
  FOREIGN KEY (`customer_ID`) REFERENCES `customer`(`custormer_ID`)
);

CREATE TABLE `deposit` (
  `deposit_ID` VARCHAR(10),
  `account_number` VARCHAR(10),
  `amount` DECIMAL(10,2),
  `date_time` DATETIME,
  FOREIGN KEY (`account_number`) REFERENCES `bank_account`(`account_number`)
);

CREATE TABLE `loan` (
  `loan_ID` VARCHAR(20),
  `branch_ID` VARCHAR(20),
  `customer_ID` VARCHAR(50),
  `amount` DECIMAL(10,2),
  `apply_date` DATE,
  `approve_date` DATE,
  `time_period` YEAR,
  `loan_type` VARCHAR(20),
  FOREIGN KEY (`customer_ID`) REFERENCES `customer`(`custormer_ID`)
);

CREATE TABLE `employee` (
  `employee_ID` VARCHAR(20),
  `branch_ID` VARCHAR(20),
  `name` VARCHAR(100),
  `salary` Type,
  `contact_number` VARCHAR(10),
  FOREIGN KEY (`branch_ID`) REFERENCES `branch`(`branch_ID`)
);

CREATE TABLE `transfer` (
  `invoice_ID` VARCHAR(50),
  `from_account_ID` VARCHAR(50),
  `to_account_ID` VARCHAR(50),
  `date_time` DATETIME,
  `amount` DECIMAL(10,2),
  `remarks` VARCHAR(50),
  FOREIGN KEY (`to_account_ID`) REFERENCES `bank_account`(`account_number`),
  FOREIGN KEY (`from_account_ID`) REFERENCES `bank_account`(`account_number`)
);