using ECommerce.BusinessLogics.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.AppData
{
    public class DataAccess
    {
        private static DataAccess _DataAccess;


        public ProductService productService = new ProductService();

        public CustomerService customerService = new CustomerService();

        public SellService sellService = new SellService();

        public AspNetUsersService aspNetUsersService = new AspNetUsersService();

        public SizeInfoService sizeInfoService = new SizeInfoService();


        private static object _sync = new object();
        public static DataAccess Instance
        {
            get
            {
                if(_DataAccess == null)
                {
                    lock(_sync)
                    {
                        if(_DataAccess == null)
                        {
                            _DataAccess = new DataAccess();
                        }
                    }
                }
                return _DataAccess;
            }
        }
    }
}
