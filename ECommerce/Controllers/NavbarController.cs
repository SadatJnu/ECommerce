using ECommerce.BusinessLogics;
using ECommerce.BusinessLogics.AppData;
using ECommerce.BusinessLogics.Helpers;
using ECommerce.BusinessLogics.ModelView;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECommerce.Controllers
{
    public class NavbarController : Controller
    {
        // GET: Navbar
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LeftSideBar()
        {
            try
            {
                string userRole = "1";

                var data = new Data();
                return PartialView("_LeftNavbar", data.NavbarItems(userRole).ToList());
            }
            catch (Exception ex)
            {
                return PartialView(ex.Message);
            }
        }

        public ActionResult RightSideBar()
        {
            try
            {
                List<NavBarViewModel> lst = new List<NavBarViewModel>();
                string userRole = "2";
                DataTable dt = DataAccess.Instance.sellService.GetBySpWithParam("SP_GET_NAVBAR_LIST", new object[] { userRole });
                lst = APIUitility.ConvertDataTable<NavBarViewModel>(dt);
                return PartialView("_LeftNavbar", lst);
            }
            catch (Exception ex)
            {
                return PartialView(ex.Message);
            }
        }

    }
}
