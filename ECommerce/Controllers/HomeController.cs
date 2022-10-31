using ECommerce.BusinessLogics.AppData;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace ECommerce.Controllers
{
    public class HomeController : Controller
    {
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
            rptViewer.LocalReport.DataSources.Add(new ReportDataSource("SPResults", dtResult));
            rptViewer.LocalReport.Refresh();

            return File(GetPdf(rptViewer), "application/pdf");
        }

        public FileResult InvoiceSummary(int Id, string getDate)
        {
            string InvoiceNo = string.Empty;
            DataTable dt = DataAccess.Instance.productService.GetBySpWithParam("InvoiceSummary", new object[] { Id, getDate });

            if (dt.Rows.Count > 0)
            {
                DataTable dtResult = DataAccess.Instance.productService.GetBySp("getInvoiceNo");
                InvoiceNo = dtResult.Rows[0][0].ToString();
            }

            ReportViewer rptViewer = new ReportViewer();
            List<ReportParameter> parameters = new List<ReportParameter>();

            rptViewer.ProcessingMode = ProcessingMode.Local;
            rptViewer.Width = Unit.Percentage(100);
            rptViewer.LocalReport.ReportPath = Server.MapPath("~/Report/rptInvoiceSummary.rdlc");
            rptViewer.LocalReport.EnableExternalImages = true;
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

    }
}
