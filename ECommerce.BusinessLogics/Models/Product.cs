using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.Models
{
    public class Product : BaseEntity
    {
        public string ProductName { get; set; }
        public decimal BuyingPrice { get; set; }
        public decimal SellingPrice { get; set; }
    }
}