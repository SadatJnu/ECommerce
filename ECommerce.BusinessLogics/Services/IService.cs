using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace ECommerce.BusinessLogics.Services
{
    public interface IService<TEntity> where TEntity : class
    {
        bool Add(TEntity entity);
        bool Update(TEntity entity);

        bool Remove(long Id);

        IEnumerable<TEntity> Filter(Expression<Func<TEntity, bool>> filter, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy= null, string[] Children=null);
		
    }
}