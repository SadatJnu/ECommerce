using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Models
{
    [Table("NavBar")]
    public partial class NavBar :BaseEntity
    {
        public string DisplayName { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Area { get; set; }
        public bool Status { get; set; }
        public bool IsParent { get; set; }
        public bool PullLeft { get; set; }
        public int DisplayOrder { get; set; }
        public int RoleId { get; set; }
    }
}
