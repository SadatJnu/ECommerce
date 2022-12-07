using ECommerce.BusinessLogics.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Services
{
    public interface IServiceCommon
    {
        CommonResponse GetResponseBySp(string SpName);
        CommonResponse GetResponseBySpWithParam(string SpName, params object[] parameterValues);
        DataTable GetBySp(string SpName);
        DataTable GetBySpWithParam(string SpName, params object[] parameterValues);
        object GetScalarValueBySP(string SpName);
        DataTable GetDatatableBySQL(string SQL);
        bool IsExist(string TableName, string Col, string value);
        bool IsExist(string TableName, string Col, int value);

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
