CREATE FUNCTION transfer_funds(
    fromAccount INT, toAccount INT, amount DECIMAL,
    date DATETIME, remarks VARCHAR(50))
RETURNS INT
BEGIN
  DECLARE numRows INT DEFAULT 0;
  
  -- Start a transaction
  START TRANSACTION;
  
  -- Update the balance of the fromAccount
  UPDATE accounts
  SET balance = balance - amount
  WHERE account_number = fromAccount;
  
  -- Update the balance of the toAccount
  UPDATE accounts
  SET balance = balance + amount
  WHERE account_number = toAccount;
  
  -- Insert a new row into the transactions table
  INSERT INTO transactions SET
    from_account = fromAccount,
    to_account = toAccount,
    amount = amount,
    transaction_time = NOW();
  
  -- Get the number of rows affected by the UPDATE and INSERT statements
  SELECT ROW_COUNT() INTO numRows;
  
  -- If both UPDATE and INSERT statements were successful, commit the transaction
  IF numRows = 3 THEN
    COMMIT;
  ELSE
    -- Otherwise, roll back the transaction
    ROLLBACK;
  END IF;
  
  RETURN numRows;
END
