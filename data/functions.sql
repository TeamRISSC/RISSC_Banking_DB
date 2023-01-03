CREATE DEFINER=`admin`@`localhost` FUNCTION `check_balance`(account_number VARCHAR(10), amount DECIMAL) RETURNS int
    DETERMINISTIC
BEGIN
  DECLARE acc_balance, min_balance DECIMAL;
  -- Get the balance of the account
  
  SELECT balance, minBalance INTO acc_balance, min_balance 
  FROM bank_account WHERE accountNumber = account_number;
  
  -- If the balance is not sufficient, throw an error
  IF (acc_balance - amount) < min_balance THEN
    RETURN -1;
  END IF;
  RETURN 1;
END