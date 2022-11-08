# ECommerce
Product Purchase & Invoice Generate

Step - 1 : Open Visual Studio 2019

Step - 2 : Connect your Database Connection within Web config file

Step - 3 : Update-Database 

Step - 4 : Run the Store Procedure


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[SellSummeryList]'))
BEGIN
DROP PROCEDURE  SellSummeryList
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SellSummeryList]     
AS
BEGIN	

	 SELECT C.CustomerName,P.ProductName,P.BuyingPrice,S.SellingPrice,S.Quantity,(S.SellingPrice - P.BuyingPrice) TotalAmount,CAST(S.AddDate AS DATE) AddDate
	 ,(SELECT ((PS.SellingPrice - PS.BuyingPrice)*s.Quantity) FROM Products PS WHERE PS.Id=S.ProductId ) TotalProfit
	 FROM Products P
	 INNER JOIN Sells S ON P.Id=S.ProductId
	 INNER JOIN Customers C ON C.Id = S.CustomerId 	
END

--------------------------------------------------------------------------------------------


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[InvoiceSummary]'))
BEGIN
DROP PROCEDURE  InvoiceSummary
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--			InvoiceSummary 1,'2022-10-19 20:11:40.967'

--			InvoiceSummary 1,'2022-10-31 20:11:40.967'

CREATE PROCEDURE [dbo].[InvoiceSummary]  
(
	@Id INT = 0,
	@getDate DATETIME = NULL
)
AS
BEGIN	

	 SELECT  CONCAT('000' , ROW_NUMBER() OVER(ORDER BY (SELECT 1))) AS InvoiceNo,
	 C.CustomerName,P.ProductName,P.BuyingPrice,P.SellingPrice,S.SellingPrice AS TotalSellAmount,S.Quantity,CAST(S.AddDate AS DATE) AddDate
	 ,(SELECT ((PS.SellingPrice - PS.BuyingPrice)*s.Quantity) FROM Products PS WHERE PS.Id=S.ProductId ) TotalProfit
	 FROM Products P
	 INNER JOIN Sells S ON P.Id=S.ProductId
	 INNER JOIN Customers C ON C.Id = S.CustomerId 	
	 WHERE C.Id=@Id AND CAST(S.AddDate AS DATE) = ISNULL(CAST(@getDate AS DATE),CAST(S.AddDate AS DATE))
END

----------------------------------------------------------------------------------------------------------------


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[getInvoiceNo]'))
BEGIN
DROP PROCEDURE  getInvoiceNo
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--			getInvoiceNo 


CREATE PROCEDURE [dbo].[getInvoiceNo]  
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
		INSERT INTO Invoices (InvoiceNo,IsDeleted,AddDate) VALUES (@newId,0,GETDATE())
	END
	ELSE
	BEGIN
		SELECT TOP 1 InvoiceNo FROM Invoices ORDER BY Id DESC
	END

	SELECT TOP 1 InvoiceNo FROM Invoices ORDER BY Id DESC

END




----------------------------------------------------------------------------------------------------------------

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[SP_GET_NAVBAR_LIST]'))
BEGIN
DROP PROCEDURE  SP_GET_NAVBAR_LIST
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--			SP_GET_NAVBAR_LIST '1'


CREATE PROCEDURE [dbo].[SP_GET_NAVBAR_LIST]  
(
@RoleId INT
)
AS
BEGIN	

	SELECT * FROM Navbar WHERE IsDeleted = 0 AND RoleId = @RoleId ORDER BY DisplayOrder ASC;

END







Step - 5 : Run the application here you can see three Navbar name as (1. Product 2. Sell 3.Report)



