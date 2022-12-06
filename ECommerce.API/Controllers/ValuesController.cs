using ECommerce.API.App_Start;
using ECommerce.BusinessLogics.AppData;
using ECommerce.BusinessLogics.DbContexts;
using ECommerce.BusinessLogics.Helpers;
using ECommerce.BusinessLogics.Models;
using ECommerce.BusinessLogics.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ECommerce.API.Controllers
{
    [AllowAnonymous]
    public class ValuesController : ApiController
    {

        [Route("Values/AddUpdateData/")]
        [HttpPut]
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
                //return BadRequest(ex.Message.ToString());
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

        List<Customer> lstItem = new List<Customer>
          {
            new Customer {Id =1, CustomerName = "Abdul Karim", IsDeleted = false, AddDate = DateTime.Now },

            new Customer {Id =2, CustomerName = "Abdur Rahim",  IsDeleted = false, AddDate = DateTime.Now },

            new Customer {Id =3, CustomerName = "Abdur Rahman",  IsDeleted = false, AddDate = DateTime.Now },

            new Customer {Id =4, CustomerName = "Abdul Hakim",  IsDeleted = false, AddDate = DateTime.Now },

            new Customer {Id =5, CustomerName = "Sadat Abdulla",  IsDeleted = false, AddDate = DateTime.Now }
          };
        [Route("Values/GetCustomerList/")]
        [HttpGet]
        public IHttpActionResult GetCustomerList()
        {
            try
            {
                var result = DataAccess.Instance.customerService.Filter(e => e.IsDeleted == false).ToList();

                if(result.Count == 0)
                {
                    foreach(var item in lstItem)
                    {
                        Customer entity = new Customer();
                        entity.CustomerName = item.CustomerName.Trim();
                        entity.IsDeleted = false;
                        entity.AddDate = DateTime.Now;
                        var res = DataAccess.Instance.customerService.Add(entity);
                    }                    
                }

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
                bool res = false;
                int custId = 0;

                foreach (var item in sell.sellList)
                {
                    custId = item.CustomerId;
                    lst.ProductId = item.ProductId;
                    lst.CustomerId = item.CustomerId;
                    lst.Quantity = item.Quantity;
                    lst.BuyingPrice = item.BuyingPrice;
                    lst.SellingPrice = item.SellingPrice;
                    lst.IsDeleted = false;
                    lst.AddDate = DateTime.Now;
                    res = DataAccess.Instance.sellService.Add(lst);
                }

                if(res)
                {
                    try
                    {                      
                        SqlHelper.ExecuteNonQuery(Constants.ConnectionString, CommandType.Text, "EXEC InsertInvoiceNo @CustomerId = " + custId + ", @TokenKey = " + sell.TokenKey + " ");
                    }
                    catch (Exception ex)
                    {
                        return Json(new { Status = "error", Message = ex.Message.ToString() });
                    }
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
