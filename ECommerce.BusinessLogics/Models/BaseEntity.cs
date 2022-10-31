using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.Models
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? AddDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }


    public class Invoice : BaseEntity
    {
        public int CustomerId { get; set; }
        public string InvoiceNo { get; set; }
        public string TokenKey { get; set; }

    }
}