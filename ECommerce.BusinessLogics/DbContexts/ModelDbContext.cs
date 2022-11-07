using ECommerce.BusinessLogics.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.DbContexts
{
    public class ModelDbContext : DbContext
    {

        public ModelDbContext() : base("name=DefaultConnection")
        {
            Database.SetInitializer<ModelDbContext>(null);
        }     

        public ModelDbContext(string connString)
        {
            this.Database.Connection.ConnectionString = connString;
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Sell> Sells { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<NavBar> NavBar { get; set; }
    }
}