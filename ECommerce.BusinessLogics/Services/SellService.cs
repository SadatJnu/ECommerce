using ECommerce.BusinessLogics.DbContexts;
using ECommerce.BusinessLogics.Models;
using ECommerce.BusinessLogics.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace ECommerce.BusinessLogics.Services
{
    public class SellService : IService<Sell>
    {
        private SellRepository _SellRepository;

        public SellService()
        {
            _SellRepository = new SellRepository();
        }

        public bool Add(Sell entity)
        {           
            return _SellRepository.Add(entity);
        }

        public IEnumerable<Sell> Filter(Expression<Func<Sell, bool>> filter, Func<IQueryable<Sell>, IOrderedQueryable<Sell>> orderBy = null, string[] Children = null)
        {
            return _SellRepository.Filter(filter, orderBy);
        }

        public DataTable GetBySpWithParam(string SpName, params object[] parameterValues)
        {
            return this._SellRepository.GetBySpWithParam(SpName, parameterValues);
        }

        public bool Remove(long Id)
        {
            throw new NotImplementedException();
        }

        public bool Update(Sell entity)
        {
            throw new NotImplementedException();
        }
    }
}