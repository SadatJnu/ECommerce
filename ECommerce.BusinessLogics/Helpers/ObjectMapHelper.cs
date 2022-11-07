using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Helpers
{
    public class ObjectMapHelper<T> where T : new()
    {
        public static List<T> MapObject(SqlDataReader reader)
        {
            List<T> lstObject = new List<T>();
            Type objectType = typeof(T);

            PropertyInfo[] properties = objectType.GetProperties();

            while (reader.Read())
            {
                T t = new T();
                foreach (PropertyInfo pi in properties)
                {
                    object value = null;
                    try
                    {
                        if (DBNull.Value.Equals(reader[pi.Name]))
                        {
                            if (pi.PropertyType.Name.Equals("String"))
                                pi.SetValue(t, string.Empty, null);
                            continue;
                        }

                        value = reader[pi.Name];
                    }
                    catch
                    {

                    }
                    pi.SetValue(t, value, null);
                }
                lstObject.Add(t);

            }
            return lstObject;
        }

        public static List<T> MapObject(DataSet dataset)
        {
            DataTable table = null;
            List<T> lstObject = new List<T>();
            Type objectType = typeof(T);

            PropertyInfo[] properties = objectType.GetProperties();
            Dictionary<string, PropertyInfo> dicPropertyInfo = new Dictionary<string, PropertyInfo>();
            foreach (PropertyInfo pi in properties)
            {
                dicPropertyInfo[pi.Name] = pi;
            }

            table = dataset.Tables[0];

            foreach (DataRow row in table.Rows)
            {
                T t = new T();
                foreach (string key in dicPropertyInfo.Keys)
                {
                    PropertyInfo pi = dicPropertyInfo[key];

                    if (table.Columns.Contains(key))
                    {
                        object value = row[key];
                        if (null == value)
                            continue;
                        pi.SetValue(t, value, null);
                    }

                }
                lstObject.Add(t);
            }

            return lstObject;
        }
    }
}
