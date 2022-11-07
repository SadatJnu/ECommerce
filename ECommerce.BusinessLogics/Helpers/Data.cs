using ECommerce.BusinessLogics.ModelView;
using ECommerce.BusinessLogics.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Helpers
{
    public class Data
    {
        public IEnumerable<NavBarViewModel> NavbarItems(string userRole)
        {
            var menu = new List<NavBarViewModel>();

            menu = Data.GetNavbarListByFilter(userRole);

            return menu.ToList();
        }

        public static List<NavBarViewModel> GetNavbarListByFilter(string userRole)
        {
            List<NavBarViewModel> lstEntity = new Constants().GetNavbarListByFilter(userRole);
            return lstEntity;
        }        
    }    
}
