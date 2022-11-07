namespace ECommerce.BusinessLogics.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewTableNavbar : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NavBar",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DisplayName = c.String(),
                        Controller = c.String(),
                        Action = c.String(),
                        Area = c.String(),
                        Status = c.Boolean(nullable: false),
                        IsParent = c.Boolean(nullable: false),
                        PullLeft = c.Boolean(nullable: false),
                        DisplayOrder = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        AddDate = c.DateTime(),
                        UpdateDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.NavBar");
        }
    }
}
