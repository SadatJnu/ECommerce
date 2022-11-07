using ECommerce.BusinessLogics.Helpers;
using System;
using System.Collections.Generic;
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

    }
}
