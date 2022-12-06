using ECommerce.API.App_Start;
using ECommerce.BusinessLogics.AppData;
using ECommerce.BusinessLogics.DbContexts;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using ZXing;
using ZXing.QrCode;

namespace ECommerce.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private ModelDbContext db = new ModelDbContext();

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }


        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Sell()
        {
            return View();
        }

        public ActionResult Report()
        {
            return View();
        }

        public FileResult SellSummeryList()
        {
            DataTable dtResult = DataAccess.Instance.productService.GetBySp("SellSummeryList");
            ReportViewer rptViewer = new ReportViewer();

            rptViewer.ProcessingMode = ProcessingMode.Local;
            rptViewer.Width = Unit.Percentage(100);
            rptViewer.LocalReport.ReportPath = Server.MapPath("~/Report/rptSellSummary.rdlc");
            rptViewer.LocalReport.EnableExternalImages = true;

            dtResult.Columns.Add(new DataColumn("QrCode", typeof(byte[])));
            dtResult.Columns.Add(new DataColumn("BarCode", typeof(byte[])));
            foreach (DataRow dr in dtResult.Rows)
            {
                string value = "Invoice : " + dr["CustomerName"].ToString() + " , " + dr["InvoiceNo"].ToString();
                dr["QrCode"] = GetQrCode(value);
                dr["BarCode"] = GetBarCode(value);
            }

            rptViewer.LocalReport.DataSources.Add(new ReportDataSource("SPResults", dtResult));
            rptViewer.LocalReport.Refresh();

            return File(GetPdf(rptViewer), "application/pdf");
        }

        public FileResult InvoiceSummary(int Id, string getDate, string TokenKey)
        {
            string InvoiceNo = string.Empty;
            DataTable dt = DataAccess.Instance.productService.GetBySpWithParam("InvoiceSummary", new object[] { Id, getDate, TokenKey });

            ReportViewer rptViewer = new ReportViewer();
            List<ReportParameter> parameters = new List<ReportParameter>();

            rptViewer.ProcessingMode = ProcessingMode.Local;
            rptViewer.Width = Unit.Percentage(100);
            rptViewer.LocalReport.ReportPath = Server.MapPath("~/Report/rptInvoiceSummary.rdlc");
            rptViewer.LocalReport.EnableExternalImages = true;

            dt.Columns.Add(new DataColumn("QrCode", typeof(byte[])));
            dt.Columns.Add(new DataColumn("BarCode", typeof(byte[])));
            foreach (DataRow dr in dt.Rows)
            {
                string value = "Invoice : " + dr["CustomerName"].ToString() + " , " + TokenKey;
                dr["QrCode"] = GetQrCode(value);
                dr["BarCode"] = GetBarCode(value);
            }

            rptViewer.LocalReport.DataSources.Add(new ReportDataSource("SPResults", dt));
            parameters.Add(new ReportParameter("InvoiceNo", InvoiceNo));
            rptViewer.LocalReport.SetParameters(parameters);
            rptViewer.LocalReport.Refresh();

            return File(GetPdf(rptViewer), "application/pdf");
        }

        private byte[] GetPdf(ReportViewer rpt)
        {
            Warning[] warnings;
            string[] streamIds;
            string mimeType = string.Empty;
            string encoding = string.Empty;
            string extension = string.Empty;
            return rpt.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamIds, out warnings);
        }

        private byte[] GetQrCode(string Content)
        {
            try
            {
                var qr = new BarcodeWriter();
                qr.Options = new QrCodeEncodingOptions
                {
                    DisableECI = true,
                    CharacterSet = "UTF-8",
                    Width = 230,
                    Height = 230,
                };
                qr.Format = BarcodeFormat.QR_CODE;

                using (MemoryStream ms = new MemoryStream())
                {
                    using (Bitmap bm = new Bitmap(qr.Write(Content)))
                    {
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                        return ms.ToArray();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private byte[] GetBarCode(string Content)
        {
            try
            {
                var bar = new BarcodeWriter();
                bar.Options = new QrCodeEncodingOptions
                {
                    DisableECI = true,
                    CharacterSet = "UTF-8",
                    Width = 230,
                    Height = 500,
                    PureBarcode = false
                };
                bar.Format = BarcodeFormat.CODE_128;

                using (MemoryStream ms = new MemoryStream())
                {
                    using (Bitmap bm = new Bitmap(bar.Write(Content)))
                    {
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                        return ms.ToArray();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
