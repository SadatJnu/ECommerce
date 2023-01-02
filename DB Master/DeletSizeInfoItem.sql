IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[DeletSizeInfoItem]'))
BEGIN
DROP PROCEDURE  DeletSizeInfoItem
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--		DeletSizeInfoItem 3

CREATE PROCEDURE [dbo].[DeletSizeInfoItem]   
(
  @CategoryId INT = 0
)
AS
BEGIN	

		UPDATE SizeInfoes SET IsDeleted = 1 , UpdateDate = GETDATE() WHERE CategoryId = @CategoryId;

		SELECT @CategoryId CategoryId

END