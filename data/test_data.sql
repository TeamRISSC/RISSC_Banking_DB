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
insert into customer values ('00001', 'Savings', 'Chathura', '001, Kandy', \
                             '076652613', 'Chathura', '12345');
insert into customer value ('00002', 'Savings', 'Kasun', '002, Colombo', \
                            '076652614', 'Kasun', '12345');
insert into customer value ('00003', 'Savings', 'Nimal', '003, Galle', \
                            '076652615', 'Nimal', '12345');

-- Insert bank_accounts
insert into bank_account values ('00001', '00001', '1000.00', 'Savings', \
                                 '2017-01-01', '2017-01-01', '2017-01-01');
insert into bank_account values ('00002', '00002', '2000.00', 'Savings', \
                                    '2017-01-01', '2017-01-01', '2017-01-01');  
insert into bank_account values ('00003', '00003', '3000.00', 'Savings', \
                                    '2017-01-01', '2017-01-01', '2017-01-01');  
                                    
