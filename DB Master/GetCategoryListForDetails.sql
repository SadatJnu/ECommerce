IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[GetCategoryListForDetails]'))
BEGIN
DROP PROCEDURE  GetCategoryListForDetails
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--	 GetCategoryListForDetails 1

CREATE PROCEDURE [dbo].[GetCategoryListForDetails]    
(
	@CategoryId INT = 0
)
AS
BEGIN	

	 SELECT CategoryId,LabelTxt,Size
	 FROM SizeInfoes WHERE CategoryId = @CategoryId AND IsDeleted=0 	
END