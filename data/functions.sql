CREATE DEFINER=`admin`@`localhost` FUNCTION `check_balance`(account_number VARCHAR(10), to_account_number VARCHAR(10), amount DECIMAL, customer_ID DECIMAL) RETURNS int
    DETERMINISTIC
BEGIN
  DECLARE acc_balance, min_balance DECIMAL DEFAULT 0;
  DECLARE to_account VARCHAR(10) DEFAULT '';
  
  -- Get the balance of the account
  SELECT balance, minBalance INTO acc_balance, min_balance 
  FROM bank_account 
  WHERE accountNumber = account_number AND customerID = customer_ID;
  
  -- Check if the to account is valid
  SELECT accountNumber into to_account
  FROM bank_account
  WHERE accountNumber = to_account_number;
  
  -- If invalid account is requested
  IF not acc_balance THEN
	RETURN -2;
  ELSEIF not to_account THEN
	RETURN -2;
  -- If the balance is not sufficient, throw an error
  ELSEIF (acc_balance - amount) < min_balance THEN
    RETURN -1;
  END IF;
  RETURN 1;
END


-- Function to check if the withdrawal is valid
CREATE DEFINER=`admin`@`localhost` FUNCTION `check_withdrawal`(
account_number VARCHAR(10), amount DECIMAL, customer_ID DECIMAL) RETURNS int
    DETERMINISTIC
BEGIN
  DECLARE acc_balance, min_balance, num_withdrawals, max_withdrawals DECIMAL DEFAULT 0;
  -- Get the balance of the account
  
  SELECT balance, minBalance, currentWithdrawals, maxWithdrawals 
  INTO acc_balance, min_balance, num_withdrawals, max_withdrawals 
  FROM bank_account 
  WHERE accountNumber = account_number AND customerID = customer_ID;
  
  -- If maximum number of withdrawals is reached
  IF num_withdrawals >= max_withdrawals THEN
	Return -3;
  -- If invalid account is requested
  ELSEIF not acc_balance THEN
	RETURN -2;
  -- If the balance is not sufficient, throw an error
  ELSEIF (acc_balance - amount) < min_balance THEN
    RETURN -1;
  END IF;
  RETURN 1;
END

-- Create 
CREATE DEFINER=`admin`@`localhost` TRIGGER `online_loan_AFTER_INSERT` AFTER INSERT ON `online_loan` FOR EACH ROW BEGIN
  DECLARE i int;
  DECLARE installment int;
  set i = 1;
  set installment = new.amount * (1+new.interestRate) / new.timePeriod;
  
  
  while i <= new.timePeriod*12 do
	insert into online_loan_installment(onlineLoanID, payment, date, installmentNumber, status)
    values (new.ID, installment, adddate(new.applyDate, interval i month), i, 'UnPaid');
    set i = i+1;
 end while;
END

-- Trigger to add loan installaments
CREATE DEFINER=`root`@`localhost` TRIGGER `loan_AFTER_UPDATE` AFTER UPDATE ON `loan` FOR EACH ROW BEGIN
  DECLARE i int;
  DECLARE installment int;
  iF (new.isApproved = true) THEN
    set i = 1;
    set installment = new.amount * (1+new.interestRate) / new.timePeriod;
    
    while i <= new.timePeriod*12 do
    insert into loan_installment(loanID, payment, date, installmentNumber, status)
      values (new.ID, installment, adddate(new.approveDate, interval i month), i, 'UnPaid');
      set i = i+1;
    end while;
  end if;
END

-- Event to add monthly interest to bank account
CREATE EVENT add_interest
    ON SCHEDULE EVERY 30 DAY
    STARTS '2022-01-01 00:00:00'
    DO
      UPDATE bank_account
      SET balance = balance * (1 + interestRate)
      WHERE DATEDIFF(CURDATE(), createdDate) % 30 = 0;

ALTER EVENT add_interest
    ENABLE;