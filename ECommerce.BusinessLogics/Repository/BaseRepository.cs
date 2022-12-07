using ECommerce.BusinessLogics.DbContexts;
using ECommerce.BusinessLogics.Helpers;
using ECommerce.BusinessLogics.Models;
using ECommerce.BusinessLogics.ModelView;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Web;

namespace ECommerce.BusinessLogics.Repository
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private DbContext _context;
        public BaseRepository(DbContext context)
        {
            this._context = context;
        }

        ~BaseRepository()
        {
            _context = null;
        }

        public DbSet<TEntity> Set
        {
            get { return this._context.Set<TEntity>(); }
        }

        public DbContext contexts()
        {
            return this._context;
        }

        public bool Add(TEntity entity)
        {
            try
            {
                using (var _context = new ModelDbContext())
                {

                    _context.Set<TEntity>().Add(entity);
                    var res = _context.SaveChanges();
                    if (res > 0)
                    {
                        string ClassName = typeof(TEntity).GetAttributeValue((ClassName e) => e.Name);
                    }
                    return res > 0;
                }

            }
            catch (DbEntityValidationException e)
            {
                throw e;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

		public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> filter)
        {
            try
            {
                return Set.AsNoTracking().SingleOrDefault(filter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
		
		public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter)
        {
            try
            {
                var table = Set.AsNoTracking<TEntity>().SingleOrDefault(filter);

                return table;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        

        public IEnumerable<TEntity> Filter(Expression<Func<TEntity, bool>> filter, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, string[] Children = null)
        {

            try
            {
                var query = _context.Set<TEntity>().AsNoTracking().AsQueryable();
                if (Children != null)
                {
                    for (int i = 0; Children.Count() > i; i++)
                    {
                        query = query.Include(Children[i]);
                    }
                }

                if (filter != null)
                {
                    query = query.Where(filter);
                }

                if (orderBy != null)
                {
                    query = orderBy(query);
                }
                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Remove(TEntity entity)
        {
            try
            {

                Set.Attach(entity);
                Set.Remove(entity);
                int res = _context.SaveChanges();
                if (res > 0)
                {
                    string ClassName = typeof(TEntity).GetAttributeValue((ClassName e) => e.Name);
                    return true;
                }
                return false;
            }
            catch (DbEntityValidationException e)
            {
                throw e;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool Update(TEntity entity)
        {
            try
            {
                using (var _context = new ModelDbContext())
                {
                    _context.Entry(entity).State = EntityState.Modified;
                    int res = _context.SaveChanges();
                    if (res > 0)
                    {
                        string ClassName = typeof(TEntity).GetAttributeValue((ClassName e) => e.Name);
                        return true;
                    }
                    return false;
                }
            }
            catch (DbEntityValidationException e)
            {
                throw e;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataTable GetBySpWithParam(string SpName, params object[] parameterValues)
        {
            try
            {
                DataTable result = SqlHelper.ExecuteDataTable(ConStr, SpName, parameterValues);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetBySp(string SpName)
        {
            try
            {
                DataTable result = SqlHelper.ExecuteDataTable(ConStr, SpName);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public TEntity Get(long id)
        {
            try
            {
                return Set.Find(id);
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex.Message.ToString());
                throw ex;
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            try
            {
                var query = _context.Set<TEntity>().AsNoTracking().AsQueryable();
                return query;
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex.Message.ToString());
                throw ex;
            }
        }

        public IEnumerable<TEntity> GetByPage(int pageno, int pagesize)
        {
            try
            {
                return Set.ToList().Skip(pagesize * (pageno - 1)).Take(pagesize).ToList();
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex.Message.ToString());

                throw ex;
            }
        }

        public CommonResponse getPageResponse(int pageno, int pagesize)
        {
            try
            {
                CommonResponse cr = new CommonResponse();
                List<TEntity> result = new List<TEntity>();
                IEnumerable<TEntity> _res;
                if (pagesize != -1)
                {
                    result = Set.AsNoTracking().ToList().Skip(pagesize * (pageno - 1)).Take(pagesize).ToList();
                    cr.results = result;
                }
                else
                {
                    _res = Set.AsNoTracking();
                    cr.results = _res;
                }
                cr.httpStatusCode = HttpStatusCode.OK;
                cr.pageno = pageno;
                cr.pagesize = pagesize;
                cr.totalcount = GetCount();
                cr.totalSum = 0;
                cr.message = string.Empty;

                return cr;
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex.Message.ToString());
                throw ex;
            }
        }

        public int GetCount()
        {
            return Set.Count();
        }

        public CommonResponse getResponseBySp(string SpName)
        {
            try
            {
                DataTable result = SqlHelper.ExecuteDataTable(ConStr, SpName, null);
                List<TEntity> lstData = ConvertDataTable<TEntity>(result);
                CommonResponse cr = new CommonResponse(lstData.Count > 0 ? HttpStatusCode.Accepted : HttpStatusCode.NoContent);
                cr.pageno = 0;
                cr.totalcount = 0;
                cr.totalSum = 0;
                cr.message = string.Empty;
                cr.results = lstData;
                return cr;
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex.Message.ToString());
                CommonResponse cr = new CommonResponse(HttpStatusCode.BadRequest);
                cr.results = null;
                cr.HasError = true;
                cr.message = ex.Message;
                return cr;
            }
        }

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }

        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                    {
                        var aa = dr[column.ColumnName];
                        if (dr[column.ColumnName] == DBNull.Value)
                        {
                            if (column.DataType.Name == "Int32")
                            {
                                pro.SetValue(obj, 0, null);
                            }
                            else if (column.DataType.Name == "Decimal")
                            {
                                pro.SetValue(obj, Convert.ToDecimal(0.00), null);
                            }
                            else if (column.DataType.Name == "String")
                            {
                                pro.SetValue(obj, null, null);
                            }
                            else if (column.DataType.Name == "DateTime")
                            {
                                pro.SetValue(obj, null, null);
                            }
                            else if (column.DataType.Name == "Boolean")
                            {
                                pro.SetValue(obj, false, null);
                            }
                            else
                            {
                                pro.SetValue(obj, dr[column.ColumnName], null);
                            }
                        }
                        else
                        {
                            pro.SetValue(obj, dr[column.ColumnName], null);
                        }
                    }

                    else
                        continue;
                }
            }
            return obj;
        }

        public CommonResponse getResponseBySpWithParam(string SpName, params object[] parameterValues)
        {
            try
            {
                DataTable result = SqlHelper.ExecuteDataTable(ConStr, SpName, parameterValues);
                List<TEntity> lstData = ConvertDataTable<TEntity>(result);
                CommonResponse cr = new CommonResponse(lstData.Count > 0 ? HttpStatusCode.Accepted : HttpStatusCode.NoContent);
                cr.pageno = 0;
                cr.totalcount = 0;
                cr.totalSum = 0;
                cr.message = string.Empty;
                cr.results = lstData;
                return cr;
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex.Message.ToString());
                CommonResponse cr = new CommonResponse(HttpStatusCode.BadRequest);
                cr.results = null;
                cr.HasError = true;
                cr.message = ex.Message;
                return cr;
            }
        }

        public CommonResponse Filter(int pageno, int pagesize, Expression<Func<TEntity, bool>> filter, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            try
            {
                var result = _context.Set<TEntity>().AsQueryable();

                if (filter != null)
                {
                    result = result.Where(filter);
                }

                if (orderBy != null)
                {
                    result = orderBy(result);
                }
                if (pagesize != -1)
                {
                    result = result.Select(e => e).Skip(pagesize * (pageno - 1)).Take(pagesize);
                }
                CommonResponse cr = new CommonResponse(result.Count() > 0 ? HttpStatusCode.OK : HttpStatusCode.NoContent);
                cr.pageno = pageno;
                cr.pagesize = pagesize;
                cr.totalcount = filter != null ? result.Count() : GetCount();
                cr.totalSum = 0; cr.message = string.Empty;
                cr.results = result.AsNoTracking().ToList();
                return cr;
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex.Message.ToString());
                throw ex;
            }
        }

        public string ConStr
        {
            get
            {
                try
                {
                    return ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
        }       

    }
}