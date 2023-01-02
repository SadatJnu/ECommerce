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
    public class SizeInfoService : IService<SizeInfo>
    {
        private SizeInfoRepository _SizeInfoRepository;

        public SizeInfoService()
        {
            _SizeInfoRepository = new SizeInfoRepository();
        }

        public bool Add(SizeInfo entity)
        {
            return _SizeInfoRepository.Add(entity);
        }

        public bool Update(SizeInfo entity)
        {
            return _SizeInfoRepository.Update(entity);
        }

        public IEnumerable<SizeInfo> Filter(Expression<Func<SizeInfo, bool>> filter, Func<IQueryable<SizeInfo>, IOrderedQueryable<SizeInfo>> orderBy = null, string[] Children = null)
        {
            return _SizeInfoRepository.Filter(filter, orderBy);
        }

        public bool Remove(long categoryId)
        {
            SizeInfo entity = new SizeInfo();
            entity = _SizeInfoRepository.SingleOrDefault(e => e.CategoryId == categoryId);
            entity.IsDeleted = true;
            entity.UpdateDate = DateTime.Now;
            return _SizeInfoRepository.Update(entity);
        }

        public DataTable GetBySpWithParam(string SpName, params object[] parameterValues)
        {
            return this._SizeInfoRepository.GetBySpWithParam(SpName, parameterValues);
        }

        public DataTable GetBySp(string SpName)
        {
            return this._SizeInfoRepository.GetBySp(SpName);
        }

    }
}