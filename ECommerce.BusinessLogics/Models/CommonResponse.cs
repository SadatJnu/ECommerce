using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Models
{
    public class CommonResponse
    {
        public CommonResponse(HttpStatusCode httpStatusCode)
        {
            this.httpStatusCode = httpStatusCode;
        }
        public CommonResponse()
        {
            ttype = "success";
        }
        public HttpStatusCode httpStatusCode;

        public int status { get; set; }
        public int pageno { get; set; }
        public int pagesize { get; set; }
        public int totalcount { get; set; }
        public double totalSum { get; set; }
        public string message { get; set; }
        public dynamic results { get; set; }
        public string returnvalue { get; set; }
        public Boolean HasError { get; set; }
        public string ttype { get; set; }/// success , error,warning

    }
}
