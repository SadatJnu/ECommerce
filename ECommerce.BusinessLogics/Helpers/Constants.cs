using ECommerce.BusinessLogics.ModelView;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Helpers
{
    public class Constants
    {
        public static string ConnectionString
        {
            get { return ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString(); }
        }

        public List<NavBarViewModel> GetNavbarListByFilter(string userRole)
        {
            List<NavBarViewModel> lstEntity = null;
            string sqlString = string.Empty;

            sqlString = @" SP_GET_NAVBAR_LIST '" + userRole + "'";

            SqlDataReader reader = SqlHelper.ExecuteReader(Constants.ConnectionString, CommandType.Text, sqlString);

            lstEntity = ObjectMapHelper<NavBarViewModel>.MapObject(reader);

            return lstEntity;
        }
    }
}
