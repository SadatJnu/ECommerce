using Nancy.Json;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ECommerce.BusinessLogics
{
    public class APIUitility
    {


        public static int CalculateSmsPart(string text)
        {
            if (IsEnglishText(text))
            {
                return text.Length <= 160 ? 1 : Convert.ToInt32(Math.Ceiling(Convert.ToDouble(text.Length) / 153));
            }

            return text.Length <= 70 ? 1 : Convert.ToInt32(Math.Ceiling(Convert.ToDouble(text.Length) / 67));
        }


        public static bool IsEnglishText(string text)
        {
            return Regex.IsMatch(text, @"^[\u0000-\u007F]+$");
        }

        public static byte[] ToByte(HttpPostedFileBase img)
        {
            using (Stream inputStream = img.InputStream)
            {
                MemoryStream memoryStream = inputStream as MemoryStream;
                if (memoryStream == null)
                {
                    memoryStream = new MemoryStream();
                    inputStream.CopyTo(memoryStream);
                }
                return memoryStream.ToArray();
            }
        }

        public static byte[] ToByte(HttpPostedFile img)
        {
            using (Stream inputStream = img.InputStream)
            {
                MemoryStream memoryStream = inputStream as MemoryStream;
                if (memoryStream == null)
                {
                    memoryStream = new MemoryStream();
                    inputStream.CopyTo(memoryStream);
                }
                return memoryStream.ToArray();
            }
        }

        public static void ToByteWithPath(HttpPostedFileBase img, string path)
        {
            //if (!Directory.Exists(path))
            //{
            //    Directory.CreateDirectory(path);
            //}

            if (!String.IsNullOrEmpty(path))
            {
                img.SaveAs(path);
            }
        }

        public static byte[] ToByte(string path)
        {
            using (Stream inputStream = new FileStream(path, FileMode.Open))
            {
                MemoryStream memoryStream = inputStream as MemoryStream;
                if (memoryStream == null)
                {
                    memoryStream = new MemoryStream();
                    inputStream.CopyTo(memoryStream);
                }
                return memoryStream.ToArray();
            }
        }        

        public static string ViewToHtml(string viewToRender, ViewDataDictionary viewData, ControllerContext controllerContext)
        {
            var result = ViewEngines.Engines.FindView(controllerContext, viewToRender, null);

            StringWriter output;
            using (output = new StringWriter())
            {
                var viewContext = new ViewContext(controllerContext, result.View, viewData, controllerContext.Controller.TempData, output);
                result.View.Render(viewContext, output);
                result.ViewEngine.ReleaseView(controllerContext, result.View);
            }

            return output.ToString();
        }
        public static string JavaScriptSerialize(dynamic value)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string output = jss.Serialize(value);
            return output.ToString();
        }       

        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        public static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                    {
                        var aa = dr[column.ColumnName];
                        if (dr[column.ColumnName] == DBNull.Value)
                        {
                            if (column.DataType.Name == "Int32")
                            {
                                pro.SetValue(obj, 0, null);
                            }
                            else if (column.DataType.Name == "Decimal")
                            {
                                pro.SetValue(obj, Convert.ToDecimal(0.00), null);
                            }
                            else if (column.DataType.Name == "String")
                            {
                                pro.SetValue(obj, null, null);
                            }
                            else if (column.DataType.Name == "DateTime")
                            {
                                pro.SetValue(obj, null, null);
                            }
                            else if (column.DataType.Name == "Boolean")
                            {
                                pro.SetValue(obj, false, null);
                            }
                            else if (column.DataType.Name == "Byte[]")
                            {
                                pro.SetValue(obj, null, null);
                            }
                            else
                            {
                                pro.SetValue(obj, dr[column.ColumnName], null);
                            }
                        }
                        else
                        {
                            pro.SetValue(obj, dr[column.ColumnName], null);
                        }
                    }
                    else
                        continue;
                }
            }
            return obj;
        }

        //public static bool VerifyCaptcha(string Response)
        //{
        //    try
        //    {

        //        Dictionary<string, string> param = new Dictionary<string, string>();
        //        param.Add("secret", ConfigurationManager.AppSettings["reCaptchaSecret"]);
        //        param.Add("response", Response);

        //        var jsonObj = JsonConvert.SerializeObject(param);


        //        var client = new RestClient("https://www.google.com/recaptcha/api/siteverify");
        //        var request = new RestRequest((Method.Post);

        //        request.AddHeader("cache-control", "no-cache");
        //        request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
        //        request.AddParameter("secret", ConfigurationManager.AppSettings["reCaptchaSecret"]);
        //        request.AddParameter("response", Response);
        //        IRestResponse response = client.Execute(request);

        //        Dictionary<string, string> res = JsonConvert.DeserializeObject<Dictionary<string, string>>(response.Content);

        //        if (Convert.ToBoolean(res["success"]))
        //        {
        //            return true;
        //        }

        //        return false;
        //    }
        //    catch (Exception ex)
        //    {

        //        return false;
        //    }
        //}



    }
}
