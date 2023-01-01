using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Models
{
    public class SizeInfo : BaseEntity
    {
        public int CategoryId { get; set; }
        public string Size { get; set; }
        public string LabelTxt { get; set; }
    }
}
