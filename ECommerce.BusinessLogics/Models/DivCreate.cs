using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Models
{
    public class DivCreate : BaseEntity
    {
        public int CategoryId { get; set; }
        public string LabelTxt { get; set; }
        public int? Total { get; set; }
    }
}
