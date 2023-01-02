IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[SellSummeryList]'))
BEGIN
DROP PROCEDURE  SellSummeryList
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--		SellSummeryList

CREATE PROCEDURE [dbo].[SellSummeryList]     
AS
BEGIN	

	 SELECT C.CustomerName,P.ProductName,P.BuyingPrice,S.SellingPrice,S.Quantity,(S.SellingPrice - P.BuyingPrice) TotalAmount,CAST(S.AddDate AS DATE) AddDate
	 ,(SELECT ((PS.SellingPrice - PS.BuyingPrice)*s.Quantity) FROM Products PS WHERE PS.Id=S.ProductId ) TotalProfit
	 ,(SELECT TOP 1 I.InvoiceNo FROM Invoices I INNER JOIN Sells SS ON I.CustomerId = C.Id AND SS.IsDeleted=0 AND I.IsDeleted=0 ORDER BY I.Id DESC) InvoiceNo
	 FROM Products P
	 INNER JOIN Sells S ON P.Id=S.ProductId
	 INNER JOIN Customers C ON C.Id = S.CustomerId 	
END