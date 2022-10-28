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

--	SellSummeryList

CREATE PROCEDURE [dbo].[SellSummeryList]     
AS

BEGIN	

	 SELECT C.CustomerName,P.ProductName,P.BuyingPrice,S.SellingPrice,S.Quantity,(S.SellingPrice - P.BuyingPrice) TotalAmount
	 ,CAST(S.AddDate AS DATE) AddDate
	 ,(SELECT ((PS.SellingPrice - PS.BuyingPrice)*s.Quantity) FROM Products PS WHERE PS.Id=S.ProductId ) TotalProfit
	 FROM Products P
	 INNER JOIN Sells S ON P.Id=S.ProductId
	 INNER JOIN Customers C ON C.Id = S.CustomerId 	
END


----------------------------------------------------------------------------------------------------------------------

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[InvoiceSummary]'))
BEGIN
DROP PROCEDURE  InvoiceSummary
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--	InvoiceSummary 1

CREATE PROCEDURE [dbo].[InvoiceSummary]  
(
	@Id INT
)
AS

BEGIN	


	 SELECT  CONCAT('000' , ROW_NUMBER() OVER(ORDER BY (SELECT 1))) AS InvoiceNo,
	 C.CustomerName,P.ProductName,P.SellingPrice,S.SellingPrice AS TotalSellAmount,S.Quantity,CAST(S.AddDate AS DATE) AddDate
	 ,(SELECT ((PS.SellingPrice - PS.BuyingPrice)*s.Quantity) FROM Products PS WHERE PS.Id=S.ProductId ) TotalProfit
	 FROM Products P
	 INNER JOIN Sells S ON P.Id=S.ProductId
	 INNER JOIN Customers C ON C.Id = S.CustomerId 	
	 WHERE C.Id=@Id
END



Step - 5 : Run the application here you can see three Navbar name as (1. Product 2. Sell 3.Report)



