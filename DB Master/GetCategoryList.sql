IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[GetCategoryList]'))
BEGIN
DROP PROCEDURE  GetCategoryList
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--	 GetCategoryList 1

CREATE PROCEDURE [dbo].[GetCategoryList]    
(
	@Id INT = 0
)
AS
BEGIN	

	 SELECT DC.CategoryId,C.Name,DC.LabelTxt,DC.Total
	 FROM DivCreates DC
	 INNER JOIN Categories C ON C.Id = DC.CategoryId AND C.IsDeleted=0 	
	 WHERE DC.CategoryId = @Id
	 AND DC.IsDeleted=0 	
END