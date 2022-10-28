using ECommerce.BusinessLogics.DbContexts;
using ECommerce.BusinessLogics.Models;
using ECommerce.BusinessLogics.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace ECommerce.BusinessLogics.Services
{
    public class CustomerService : IService<Customer>
    {
        private CustomerRepository _CustomerRepository;

        private ModelDbContext _context;

        public CustomerService()
        {
            _CustomerRepository = new CustomerRepository();
        }

        public bool Add(Customer entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> Filter(Expression<Func<Customer, bool>> filter, Func<IQueryable<Customer>, IOrderedQueryable<Customer>> orderBy = null, string[] Children = null)
        {            
            return _CustomerRepository.Filter( filter, orderBy = null,  Children = null);
        }

        public bool Remove(Customer entity)
        {
            throw new NotImplementedException();
        }

        public bool Remove(long Id)
        {
            throw new NotImplementedException();
        }

        public bool Update(Customer entity)
        {
            throw new NotImplementedException();
        }
    }
}