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