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
    public class ProductService : IService<Product>
    {
        private ProductRepository _ProductRepository;

        public ProductService()
        {
            _ProductRepository = new ProductRepository();
        }

        public bool Add(Product entity)
        {
            Product lst = new Product();
            lst.ProductName = entity.ProductName.Trim();
            lst.BuyingPrice = entity.BuyingPrice;
            lst.SellingPrice = entity.SellingPrice;
            lst.IsDeleted = false;
            lst.AddDate = DateTime.Now;
            return _ProductRepository.Add(lst);
        }

        public bool Update(Product entity)
        {
            Product lst = new Product();
            lst.Id = entity.Id;
            lst.ProductName = entity.ProductName.Trim();
            lst.BuyingPrice = entity.BuyingPrice;
            lst.SellingPrice = entity.SellingPrice;
            lst.UpdateDate = DateTime.Now;
            return _ProductRepository.Update(lst);
        }

        public IEnumerable<Product> Filter(Expression<Func<Product, bool>> filter, Func<IQueryable<Product>, IOrderedQueryable<Product>> orderBy = null, string[] Children = null)
        {
            return _ProductRepository.Filter(filter, orderBy);
        }

        public bool Remove(long id)
        {
            Product entity = new Product();
            entity = _ProductRepository.SingleOrDefault(e => e.Id == id);
            entity.IsDeleted = true;
            entity.UpdateDate = DateTime.Now;
            return _ProductRepository.Update(entity);
            //return _ProductRepository.Remove(entity);
        }

        public DataTable GetBySpWithParam(string SpName, params object[] parameterValues)
        {
            return this._ProductRepository.GetBySpWithParam(SpName, parameterValues);
        }

        public DataTable GetBySp(string SpName)
        {
            return this._ProductRepository.GetBySp(SpName);
        }

    }
}