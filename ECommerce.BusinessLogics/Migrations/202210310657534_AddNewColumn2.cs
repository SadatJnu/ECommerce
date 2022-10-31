namespace ECommerce.BusinessLogics.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewColumn2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Invoices", "TokenKey", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Invoices", "TokenKey");
        }
    }
}
