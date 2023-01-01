namespace ECommerce.BusinessLogics.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewtblSizeInfo : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SizeInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryId = c.Int(nullable: false),
                        Size = c.String(),
                        LabelTxt = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        AddDate = c.DateTime(),
                        UpdateDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SizeInfoes");
        }
    }
}
