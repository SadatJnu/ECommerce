namespace ECommerce.BusinessLogics.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "AddDate", c => c.DateTime());
            AddColumn("dbo.Customers", "UpdateDate", c => c.DateTime());
            AddColumn("dbo.Products", "AddDate", c => c.DateTime());
            AddColumn("dbo.Products", "UpdateDate", c => c.DateTime());
            AddColumn("dbo.Sells", "AddDate", c => c.DateTime());
            AddColumn("dbo.Sells", "UpdateDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sells", "UpdateDate");
            DropColumn("dbo.Sells", "AddDate");
            DropColumn("dbo.Products", "UpdateDate");
            DropColumn("dbo.Products", "AddDate");
            DropColumn("dbo.Customers", "UpdateDate");
            DropColumn("dbo.Customers", "AddDate");
        }
    }
}
