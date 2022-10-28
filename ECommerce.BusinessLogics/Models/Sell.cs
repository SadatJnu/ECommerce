using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.Models
{
    public class Sell : BaseEntity
    {
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int Quantity { get; set; }
        public decimal BuyingPrice { get; set; }
        public decimal SellingPrice { get; set; }


    }

    public class DailyMaster
    {
        public virtual ICollection<Sell> sellList { get; set; }

    }

}