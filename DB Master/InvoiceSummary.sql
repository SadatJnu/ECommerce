
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[InvoiceSummary]'))
BEGIN
DROP PROCEDURE  InvoiceSummary
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--			InvoiceSummary 1,'2023-01-02 20:11:40.967','T-201202300001'


CREATE PROCEDURE [dbo].[InvoiceSummary]  
(
	@Id INT = 0,
	@getDate DATETIME = NULL,
	@TokenKey NVARCHAR(MAX) = ''
)
AS
BEGIN	

	 SELECT
	 (SELECT TOP 1 I.InvoiceNo FROM Invoices I INNER JOIN Sells SS ON I.CustomerId = @Id AND I.TokenKey = ISNULL(@TokenKey,I.TokenKey) AND SS.IsDeleted=0 AND I.IsDeleted=0 ORDER BY I.Id DESC) InvoiceNo,
	 C.CustomerName,P.ProductName,P.BuyingPrice,P.SellingPrice,S.SellingPrice AS TotalSellAmount,S.Quantity,CAST(S.AddDate AS DATE) AddDate
	 ,(SELECT ((PS.SellingPrice - PS.BuyingPrice)*s.Quantity) FROM Products PS WHERE PS.Id=S.ProductId ) TotalProfit
	 FROM Products P
	 INNER JOIN Sells S ON P.Id=S.ProductId
	 INNER JOIN Customers C ON C.Id = S.CustomerId 
	 WHERE C.Id=@Id AND CAST(S.AddDate AS DATE) = ISNULL(CAST(@getDate AS DATE),CAST(S.AddDate AS DATE))
END
