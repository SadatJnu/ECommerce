namespace ECommerce.BusinessLogics.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewColumn1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Invoices", "CustomerId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Invoices", "CustomerId");
        }
    }
}
