using ECommerce.BusinessLogics.DbContexts;
using ECommerce.BusinessLogics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.Repository
{
    public class CustomerRepository : BaseRepository<Customer>, IDisposable
    {
        public static ModelDbContext _context = new ModelDbContext();

        public CustomerRepository() : base ( _context = new ModelDbContext())
        {
            // Context = _context;
        }

        private bool disposeValue = false;
        protected virtual void Dispose(bool disposing)
        {
            if(!disposeValue)
            {
                if(disposing)
                {
                    _context.Dispose();
                }
                disposeValue = true;
            }
        }


        ~CustomerRepository()
        {
            Dispose(true);
        }
        public void Dispose()
        {
            Dispose(true);
        }

    }
}