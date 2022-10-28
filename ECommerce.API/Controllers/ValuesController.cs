using ECommerce.BusinessLogics.AppData;
using ECommerce.BusinessLogics.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ECommerce.API.Controllers
{
    [AllowAnonymous]
    public class ValuesController : ApiController
    {       

        [Route("Values/AddUpdateData/")]
        [HttpPost]
        public IHttpActionResult AddUpdateData(Product product)
        {
            try
            {
                if (product.Id > 0)
                {
                    var Exist = DataAccess.Instance.productService.Filter(e => e.IsDeleted == false && e.ProductName == product.ProductName && e.Id != product.Id).Count();
                    if(Exist > 0)
                    {
                        return Json(new { Status = "warning", Message = "Data Already Exist" });
                    }

                    var result = DataAccess.Instance.productService.Update(product);

                    return Json(new { Status = "success", Message = "Update Successful." });
                }
                else
                {
                    var Exist = DataAccess.Instance.productService.Filter(e => e.IsDeleted == false && e.ProductName == product.ProductName).Count();
                    if (Exist > 0)
                    {
                        return Json(new { Status = "warning", Message = "Data Already Exist" });
                    }

                    var result = DataAccess.Instance.productService.Add(product);

                    return Json(new { Status = "success", Message = "Save Successful." });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = "error", Message = ex.Message.ToString() });
            }
        }

        [Route("Values/GetProductList/")]
        [HttpGet]
        public IHttpActionResult GetProductList()
        {
            try
            {
                var result = DataAccess.Instance.productService.Filter(e => e.IsDeleted == false).ToList();

                return Json(new { result, Message = "Data Found." });
            }
            catch (Exception ex)
            {
                return Json(new { Status = "error", Message = ex.Message.ToString() });
            }
        }

        [Route("Values/GetCustomerList/")]
        [HttpGet]
        public IHttpActionResult GetCustomerList()
        {
            try
            {
                var result = DataAccess.Instance.customerService.Filter(e => e.IsDeleted == false).ToList();

                return Json(new { result, Message = "Data Found." });
            }
            catch (Exception ex)
            {
                return Json(new { Status = "error", Message = ex.Message.ToString() });
            }
        }


        [Route("Values/GetEditDataById/{Id}")]
        [HttpGet]
        public IHttpActionResult GetEditDataById(int Id)
        {
            try
            {
                var result = DataAccess.Instance.productService.Filter(a => a.IsDeleted == false && a.Id == Id).ToList();
                return Json(new { result, Message = result.Count + " Data Found." });
            }
            catch (Exception ex)
            {
                return Json(new { Status = "error", Message = ex.Message.ToString() });
            }
        }

        [Route("Values/DeletItem/{Id}")]
        [HttpDelete]
        public IHttpActionResult DeletItem(int Id)
        {
            try
            {
                bool results = DataAccess.Instance.productService.Remove(Id);
                return Json(new { Status = results, Message = "Delete Successful." });
            }
            catch (Exception ex)
            {
                return Json(new { Status = "error", Message = ex.Message.ToString() });
            }
        }


        [Route("Values/GetProductSellList/")]
        [HttpGet]
        public IHttpActionResult GetProductSellList()
        {
            try
            {
                DataTable dtResult = DataAccess.Instance.productService.GetBySp("SellSummeryList");

                return Json(new { dtResult, Message = "Data Found." });
            }
            catch (Exception ex)
            {
                return Json(new { Status = "error", Message = ex.Message.ToString() });
            }
        }

        [Route("Values/SaveSellingData/")]
        [HttpPost]
        public IHttpActionResult SaveSellingData(DailyMaster sell)
        {
            try
            {
                Sell lst = new Sell();

                foreach (var item in sell.sellList)
                {
                    lst.ProductId = item.ProductId;
                    lst.CustomerId = item.CustomerId;
                    lst.Quantity = item.Quantity;
                    lst.BuyingPrice = item.BuyingPrice;
                    lst.SellingPrice = item.SellingPrice;
                    lst.IsDeleted = false;
                    lst.AddDate = DateTime.Now;
                    var result = DataAccess.Instance.sellService.Add(lst);
                }

                return Json(new { Status = "success", Message = "Save Successful." });
            }
            catch (Exception ex)
            {
                return Json(new { Status = "error", Message = ex.Message.ToString() });
            }
        }

    }
}
