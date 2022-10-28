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

	 SELECT C.CustomerName,P.ProductName,P.BuyingPrice,S.SellingPrice,S.Quantity,(S.SellingPrice - P.BuyingPrice) TotalProfit  FROM Products P
	 INNER JOIN Sells S ON P.Id=S.ProductId
	 INNER JOIN Customers C ON C.Id = S.CustomerId 	
END

