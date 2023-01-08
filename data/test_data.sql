-- delete data from existing tables
USE bank;
delete from admin;
delete from deposit;
delete from fixed_deposit;
delete from transfer;
delete from loan;
delete from withdrawal;
delete from online_loan;
delete from employee;
delete from bank_account;
delete from branch;

delete from customer;
delete from loan_installment;
delete from manager;

-- Insert branches  
insert into branch (branchCode,name,address) values ('692','Kandy', '100, Kandy');
insert into branch (branchCode,name,address) values ('512','Colombo', '200, Colombo');

-- Insert managers
insert into manager (name,salary,contactNumber, branchID, username, email, password) values ('Supun',1000,'0771234561','1','supun','supun@gmail.com','12345');
insert into manager (name,salary,contactNumber, branchID, username, email, password) values ('Kasun',1000,'0771234562','2','kasun','kasun@gmail.com','12345');

-- Insert admins
insert into admin (username, password) values ('Chathura', '12345');
insert into admin (username, password) values ('Isuru', '12345');
insert into admin (username, password) values ('Supun', '12345');
insert into admin (username, password) values ('Rovin', '12345');

-- Insert customers
insert into customer (type,name,address, contactNumber, username, email, password) values ('Individual', 'Chathura', '001, Kandy',
                             '076652613', 'Chathura','chathura@gmail.com', '12345');
insert into customer (type,name,address, contactNumber, username,email, password) value ('Individual', 'Kumara', '002, Colombo',
                            '076652614', 'Kumara','kumara@gmail.com', '12345');
 
-- Insert bank_accounts
insert into bank_account values ('00001', '00001', '001', 'Chathura', 2000, 1000, 'Savings', curdate(),5,10,2);
insert into bank_account values ('00002', '00002', '002', 'Kasun', 20000, 1000, 'Savings', curdate(),5,10,2); 
insert into bank_account values ('00007', '00001', '001', 'Chathura', 10000, 1000, 'Savings', curdate(),5,10,2);
insert into bank_account values ('00008', '00002', '002', 'Kasun', 20000, 1000, 'Savings', curdate(),5,10,2);
-- some current accounts
insert into bank_account values ('00003', '00001', '001', 'Chathura', 10000, 1000, 'Checking',curdate(), 5,10,2);
insert into bank_account values ('00004', '00002', '002', 'Kasun', 20000, 1000, 'Checking',curdate(), 5,10,2);
insert into bank_account values ('00005', '00001', '001', 'Chathura', 10000, 1000, 'Checking', curdate(),5,10,2);
insert into bank_account values ('00006', '00002', '002', 'Kasun', 20000, 1000, 'Checking', curdate(),5,10,2);

-- Insert fixed deposits
insert into fixed_deposit (linkedAccountID,customerID,amount,period,interestRate,maturityDate) values ('00001', '00001', 10000, 1, 5,
                                  '2023-12-31');
insert into fixed_deposit (linkedAccountID,customerID,amount,period,interestRate,maturityDate) values ('00002', '00002', 20000, 2, 5,
                                    '2023-12-31');
insert into fixed_deposit (linkedAccountID,customerID,amount,period,interestRate,maturityDate) values ('00003', '00001', 10000, 1, 5,
                                  '2023-12-31');
                                    
-- Insert online_loans 
insert into online_loan (branchID,customerID,FDID,amount,applyDate,timePeriod,linkedAccountID) values ('00001', '00001','00001',10000,'2022-11-23', 5,'00001');
insert into online_loan (branchID,customerID,FDID,amount,applyDate,timePeriod,linkedAccountID) values ('00002', '00002','00002',20000,'2022-11-23', 5,'00002');
                                    
-- Insert transfers
insert into transfer (fromAccountID,toAccountID,date,amount,remarks) values ('00001', '00002', '2017-01-02', 1000.00,"opening account");
insert into transfer (fromAccountID,toAccountID,date,amount,remarks) values ('00002', '00001', '2017-01-05', 2000.00,"returning open account amount");

-- Insert deposits
insert into deposit (accountNumber,amount,date) value ('00001', 654, '2017-01-01');
insert into deposit (accountNumber,amount,date) value ('00002', 550, '2017-01-01');
insert into deposit (accountNumber,amount,date) value ('00001', 456, '2017-02-01');
insert into deposit (accountNumber,amount,date) value ('00002', 400, '2017-02-01');
insert into deposit (accountNumber,amount,date) value ('00001', 987, '2017-03-01');
insert into deposit (accountNumber,amount,date) value ('00002', 600, '2017-03-01');
insert into deposit (accountNumber,amount,date) value ('00001', 850, '2017-04-01');
insert into deposit (accountNumber,amount,date) value ('00002', 120, '2017-04-01');
insert into deposit (accountNumber,amount,date) value ('00001', 950, '2017-05-01');
insert into deposit (accountNumber,amount,date) value ('00002', 253, '2017-05-01');
insert into deposit (accountNumber,amount,date) value ('00001', 350, '2017-06-01');
insert into deposit (accountNumber,amount,date) value ('00002', 573, '2017-06-01');
insert into deposit (accountNumber,amount,date) value ('00001', 688, '2017-07-01');
insert into deposit (accountNumber,amount,date) value ('00002', 987, '2017-07-01');
insert into deposit (accountNumber,amount,date) value ('00001', 955, '2017-08-01');
insert into deposit (accountNumber,amount,date) value ('00002', 456, '2017-08-01');
insert into deposit (accountNumber,amount,date) value ('00001', 789, '2017-09-01');
insert into deposit (accountNumber,amount,date) value ('00002', 312, '2017-09-01');
insert into deposit (accountNumber,amount,date) value ('00001', 658, '2017-10-01');
insert into deposit (accountNumber,amount,date) value ('00002', 786, '2017-10-01');
insert into deposit (accountNumber,amount,date) value ('00001', 1200, '2017-11-01');
insert into deposit (accountNumber,amount,date) value ('00002', 546, '2017-11-01');
insert into deposit (accountNumber,amount,date) value ('00001', 350, '2017-12-01');
insert into deposit (accountNumber,amount,date) value ('00002', 123, '2017-12-01');

   
-- Insert withdrawals
insert into withdrawal (accountNumber,amount,date) value ('00001', 1000, '2017-01-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 123, '2017-01-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 500, '2017-02-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 978, '2017-02-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 650, '2017-03-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 456, '2017-03-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 250, '2017-04-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 352, '2017-04-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 850, '2017-05-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 762, '2017-05-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 560, '2017-06-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 456, '2017-06-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 250, '2017-07-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 978, '2017-07-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 566, '2017-08-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 564, '2017-08-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 987, '2017-09-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 321, '2017-09-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 456, '2017-10-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 350, '2017-10-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 321, '2017-11-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 450, '2017-11-01');
insert into withdrawal (accountNumber,amount,date) value ('00001', 564, '2017-12-01');
insert into withdrawal (accountNumber,amount,date) value ('00002', 500, '2017-12-01');


-- Insert employees
insert into employee (branchID,name,salary,contactNumber,username,email,password) values ('001', 'Sandun', 1000, '0771234561','sandun','sandun@gmail.com','12345');
insert into employee (branchID,name,salary,contactNumber,username,email,password) values ('002', 'Saman', 1000, '0771234562','saman','saman@gmail.com','12345');

-- Insert loans
insert into loan (branchID,customerID,amount,applyDate,approveDate,timePeriod,loanType,linkedAccountID,isApproved) values ('001', '00001', 10000,'2022-11-23','2022-11-25',5,'Business','00001','1');
insert into loan (branchID,customerID,amount,applyDate,approveDate,timePeriod,loanType,linkedAccountID,isApproved) values ('002', '00002', 20000,'2022-11-23','2022-11-25',5,'Personal','00002','1');

-- Insert loan_installments
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00001', 1000, '2022-11-25', 1,"OnTime");
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00002', 2000, '2022-11-25', 1,"OnTime");
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00001', 1000, '2022-12-25', 2,"OnTime");
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00002', 2000, '2022-12-25', 2,"Late");
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00001', 1000, '2023-01-25', 3,"OnTime");
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00002', 2000, '2023-01-25', 3,"Late");
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00001', 1000, '2023-02-25', 4,"Late");
insert into loan_installment (loanID,payment,date,installmentNumber,status) values ('00002', 2000, '2023-02-25', 4,"OnTime");

-- Insert online_loan_installments
insert into online_loan_installment (onlineLoanID,payment,date,installmentNumber,status) values ('00001', 1000, '2022-11-25', 1,"OnTime");
insert into online_loan_installment (onlineLoanID,payment,date,installmentNumber,status) values ('00002', 2000, '2022-11-25', 1,"OnTime");
insert into online_loan_installment (onlineLoanID,payment,date,installmentNumber,status) values ('00001', 1000, '2022-12-25', 2,"Late");
insert into online_loan_installment (onlineLoanID,payment,date,installmentNumber,status) values ('00002', 2000, '2022-12-25', 2,"OnTime");
insert into online_loan_installment (onlineLoanID,payment,date,installmentNumber,status) values ('00001', 1000, '2023-01-25', 3,"Late");
insert into online_loan_installment (onlineLoanID,payment,date,installmentNumber,status) values ('00002', 2000, '2023-01-25', 3,"OnTime");