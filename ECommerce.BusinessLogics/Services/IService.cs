using ECommerce.BusinessLogics.Models;
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

        //TEntity Get(long id);
        //TEntity SingleOrDefault(Expression<Func<TEntity, bool>> filter);
        //IEnumerable<TEntity> GetAll();
        //IEnumerable<TEntity> GetByPage(int pageno, int pagesize);
        //CommonResponse getPageResponse(int pageno, int pagesize);
        //CommonResponse Filter(int pageno, int pagesize, Expression<Func<TEntity, bool>> filter, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null);
        //CommonResponse getResponseBySp(string SpName);
        //CommonResponse getResponseBySpWithParam(string SpName, params object[] parameterValues);
    }
}