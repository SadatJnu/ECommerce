using ECommerce.BusinessLogics.DbContexts;
using ECommerce.BusinessLogics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.Repository
{
    public class SizeInfoRepository : BaseRepository<SizeInfo>, IDisposable
    {
        public static ModelDbContext _context = new ModelDbContext();

        public SizeInfoRepository() : base ( _context = new ModelDbContext())
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


        ~SizeInfoRepository()
        {
            Dispose(true);
        }
        public void Dispose()
        {
            Dispose(true);
        }		
		
    }
}