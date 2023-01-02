IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[GetTotalSizeInfoList]'))
BEGIN
DROP PROCEDURE  GetTotalSizeInfoList
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--		GetTotalSizeInfoList

CREATE PROCEDURE [dbo].[GetTotalSizeInfoList]     
AS
BEGIN	

	 SELECT DISTINCT SI.CategoryId,C.Name,
	 (SELECT
					STUFF ((
					SELECT ', ' + S.LabelTxt + ' : ' + S.Size
					FROM dbo.SizeInfoes S 	
					WHERE S.CategoryId=SI.CategoryId
					GROUP BY S.CategoryId,S.Size,S.LabelTxt
					FOR XML PATH (''), Type).value('.', 'NVARCHAR(Max)'), 1, 1, '') AS Result) Descriptions
	 FROM SizeInfoes SI
	 INNER JOIN Categories C ON C.Id=SI.CategoryId
	 WHERE SI.IsDeleted=0

END