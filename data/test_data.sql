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

-- Insert customers
insert into customer values ('00001', 'Savings', 'Chathura', '001, Kandy', \
                             '076652613', 'Chathura', '12345');

-- Insert 