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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<ModelDbContext>(null);
            base.OnModelCreating(modelBuilder);
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
        public DbSet<Logs> Logs { get; set; }
        public DbSet<DivCreate> DivCreate { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<SizeInfo> SizeInfo { get; set; }
    }
}