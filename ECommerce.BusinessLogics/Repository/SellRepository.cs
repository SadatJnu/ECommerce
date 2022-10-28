using ECommerce.BusinessLogics.DbContexts;
using ECommerce.BusinessLogics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.Repository
{
    public class SellRepository : BaseRepository<Sell>, IDisposable
    {
        public static ModelDbContext _context = new ModelDbContext();

        public SellRepository() : base ( _context = new ModelDbContext())
        {
            //
        }

        private bool disposedValue = false;
        protected virtual void Dispose(bool disposing)
        {
            if(!disposedValue)
            {
                if(disposing)
                {
                    _context.Dispose();
                }
                disposedValue = true;
            }
        }


        ~SellRepository()
        {
            Dispose(true);
        }
        public void Dispose()
        {
            Dispose(true);
        }		
		
    }
}