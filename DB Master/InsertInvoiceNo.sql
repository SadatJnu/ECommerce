
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[InsertInvoiceNo]'))
BEGIN
DROP PROCEDURE  InsertInvoiceNo
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--			InsertInvoiceNo 1


CREATE PROCEDURE [dbo].[InsertInvoiceNo]  
(
	@CustomerId INT = 0,
	@TokenKey NVARCHAR(MAX) = ''
)
AS
BEGIN	

	DECLARE @newId VARCHAR(100) = '',@LastCount INT = 0;

	SET @LastCount = ( SELECT TOP 1 Id FROM Invoices ORDER BY Id DESC )
	IF(@LastCount IS NULL)
	BEGIN
		SET @LastCount = 1 ;
	END
	ELSE
	BEGIN
		SET @LastCount = @LastCount + 1  ;
	END

	PRINT @LastCount

	SELECT @newId = 'T-' + CAST( Day(GETDATE()) AS VARCHAR) + CAST(RIGHT(REPLICATE('0',2)+ CAST(Month(GETDATE()) AS VARCHAR(4)),2) AS VARCHAR(4))  
					+ CAST(Year(GETDATE()) AS VARCHAR) + RIGHT('00000'+ ISNULL(CAST(@LastCount AS VARCHAR(MAX)), ''),5) 
	
	PRINT @newId

	IF(@newId != '' OR @newId IS NULL)
	BEGIN
		INSERT INTO Invoices (CustomerId,InvoiceNo,TokenKey,IsDeleted,AddDate) VALUES (@CustomerId,@newId,@TokenKey,0,GETDATE())
	END
	ELSE
	BEGIN
		SELECT TOP 1 InvoiceNo FROM Invoices ORDER BY Id DESC
	END

	SELECT TOP 1 InvoiceNo FROM Invoices ORDER BY Id DESC

END
