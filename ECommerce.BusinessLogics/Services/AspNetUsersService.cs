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
    public class AspNetUsersService : IService<AspNetUsers>
    {
        private AspNetUsersRepository AspNetUsersRepository;

        public AspNetUsersService()
        {
            AspNetUsersRepository = new AspNetUsersRepository();
        }
        public bool Add(AspNetUsers entity)
        {
            return AspNetUsersRepository.Add(entity);
        }

        public IEnumerable<AspNetUsers> Filter(Expression<Func<AspNetUsers, bool>> filter, Func<IQueryable<AspNetUsers>, IOrderedQueryable<AspNetUsers>> orderBy = null, string[] Children = null)
        {
            return AspNetUsersRepository.Filter(filter, orderBy);
        }

        public AspNetUsers Get(long id)
        {
            return AspNetUsersRepository.Get(id);
        }

        public IEnumerable<AspNetUsers> GetAll()
        {
            return AspNetUsersRepository.GetAll();
        }

        public IEnumerable<AspNetUsers> GetByPage(int pageno, int pagesize)
        {
            return AspNetUsersRepository.GetByPage(pageno, pagesize);
        }

        public CommonResponse getPageResponse(int pageno, int pagesize)
        {
            return AspNetUsersRepository.getPageResponse(pageno, pagesize);
        }

        public CommonResponse getResponseBySp(string SpName)
        {
            return AspNetUsersRepository.getResponseBySp(SpName);
        }

        public CommonResponse getResponseBySpWithParam(string SpName, params object[] parameterValues)
        {
            return AspNetUsersRepository.getResponseBySpWithParam(SpName, parameterValues);
        }

        public bool Remove(long id)
        {
            AspNetUsers entity = new AspNetUsers();
            entity = AspNetUsersRepository.SingleOrDefault(e => e.StudentId == id);
            return AspNetUsersRepository.Remove(entity);
        }

        public AspNetUsers SingleOrDefault(Expression<Func<AspNetUsers, bool>> filter)
        {
            return AspNetUsersRepository.SingleOrDefault(filter);
        }

        public bool Update(AspNetUsers entity)
        {
            return AspNetUsersRepository.Update(entity);
        }

    }
}
