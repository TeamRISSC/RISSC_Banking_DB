-- Holds the sample insert statements to test the database

-- delete data from existing tables
delete from loan_installment;
delete from customer;
delete from branch;
delete from bank_account;
delete from fixed_deposit;
delete from withdrawal;
delete from online_loan;
delete from deposit;
delete from loan;
delete from employee;
delete from transfer;

-- Insert branches  
insert into branch values ('001', 'Kandy', '100, Kandy', '00001');
insert into branch values ('002', 'Colombo', '200, Colombo', '00002');
insert into branch values ('003', 'Galle', '300, Galle', '00003');
insert into branch values ('004', 'Jaffna', '400, Jaffna', '00004');
insert into branch values ('005', 'Matara', '500, Matara', '00005');
insert into branch values ('006', 'Kurunegala', '600, Kurunegala', '00006');
insert into branch values ('007', 'Gampaha', '700, Gampaha', '00007');

-- Insert customers
insert into customer values ('00001', 'Individual', 'Chathura', '001, Kandy', \
                             '076652613', 'Chathura', '12345');
insert into customer value ('00002', 'Individual', 'Kasun', '002, Colombo', \
                            '076652614', 'Kasun', '12345');
insert into customer value ('00003', 'Organisation', 'Nimal pvt ltd', '003, Galle', \
                            '076652615', 'Nimal', '12345');

-- Insert fixed deposits
insert into fixed_deposit values ('00001', '00001', '00001', 10000, 1, 5, \
                                  '2023-12-31');
insert into fixed_deposit values ('00002', '00002', '00002', 20000, 2, 5, \
                                    '2023-12-31');
   

-- Insert online_loans 
insert into online_loan values ('00001', '00001', '00001','00001',10000,'2022-11-23', 5);
insert into online_loan values ('00002', '00002', '00002','00002',20000,'2022-11-23', 5);

-- Insert bank_accounts
insert into bank_account values ('00001', '00001', '001', 'Chathura', 10000, 1000, 'Savings', 5,10,2);
insert into bank_account values ('00002', '00002', '002', 'Kasun', 20000, 1000, 'Savings', 5,10,2);
                                    
-- Insert transfers
insert into transfer values ('12345', '00001', '00002', '2017-01-01', 1000.00,"opening account");
insert into transfer values ('12346', '00002', '00001', '2017-01-01', 2000.00,"returning open account amount");
insert into transfer values ('12347', '00001', '00003', '2017-01-01', 1000.00,"education expense");

-- Insert deposits
insert into deposit value ('00001', '00001', 1000, '2017-01-01');
insert into deposit value ('00002', '00002', 2000, '2017-01-01');

-- Insert managers
insert into manager values ('00001', 'Supun',1000,'0771234561');
insert into manager values ('00002', 'Kasun',1000,'0771234562');


-- Insert employees
insert into employee values ('00001', '001', 'Sandun', 1000, '0771234561');
insert into employee values ('00002', '002', 'Saman', 1000, '0771234562');

-- Insert loans
insert into loan values ('00001', '001', '00001', 10000,'2022-11-23','2022-11-25',5,'Business');
insert into loan values ('00002', '002', '00002', 20000,'2022-11-23','2022-11-25',5,'Personal');