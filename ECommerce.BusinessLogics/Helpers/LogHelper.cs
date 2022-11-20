using Serilog;
using Serilog.Events;
using Serilog.Exceptions;
using Serilog.Sinks.MSSqlServer;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Data;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ECommerce.BusinessLogics.Helpers
{
    public static class LogHelper
    {
        private static readonly ILogger Log;

        static LogHelper()
        {

            // 5 MB = 5242880 bytes
            string ConStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            var options = new ColumnOptions();
            //options.Store.Remove(StandardColumn.Properties);
            options.Store.Add(StandardColumn.LogEvent);
            //options.LogEvent.DataLength = 2048;
            //options.PrimaryKey = options.TimeStamp;
            //options.TimeStamp.NonClusteredIndex = true;

            var columnOptions = new ColumnOptions
            {
                AdditionalColumns = new Collection<SqlColumn>
                {
                    new SqlColumn("UserName",SqlDbType.NVarChar,true,128),
                    new SqlColumn("RawData",SqlDbType.NVarChar,true)
                }


            };

            columnOptions.Store.Remove(StandardColumn.Properties);
            //options.AdditionalDataColumns.Add(new System.Data.DataColumn("RawData", typeof(string)));

            Log = new LoggerConfiguration()
                   .WriteTo.MSSqlServer(
                       connectionString: ConStr,
                       tableName: "Logs",
                       columnOptions: columnOptions,
                       autoCreateSqlTable: true
                   )
                   .Enrich.FromLogContext()
                   .Enrich.WithExceptionDetails()
                   .CreateLogger();
        }

        public static void Error(Exception ex, string Message)
        {
            //Error - indicating a failure within the application or connected system
            Log.Write(Serilog.Events.LogEventLevel.Error, ex.Message + "{0}", Message);
        }
        public static void Error(Exception ex)
        {
            //Error - indicating a failure within the application or connected system
            Log.Write(Serilog.Events.LogEventLevel.Error, ex.Message);
        }
        public static void Error(string message)
        {
            //Error - indicating a failure within the application or connected system
            Log.Write(Serilog.Events.LogEventLevel.Error, message);
        }

        public static void Error(DbEntityValidationException e)
        {
            var errorMessages = e.EntityValidationErrors
                   .SelectMany(x => x.ValidationErrors)
                   .Select(x => "P: " + x.PropertyName + " Error: " + x.ErrorMessage);
            var fullErrorMessage = string.Join("; ", errorMessages);
            Log.Write(Serilog.Events.LogEventLevel.Error, fullErrorMessage);
        }

        public static void Warning(Exception ex, string message)
        {
            //Warning - indicators of possible issues or service / functionality degradation
            Log.Write(Serilog.Events.LogEventLevel.Warning, ex, message);
        }

        public static void Debug(Exception ex, string message)
        {
            //Debug - internal control flow and diagnostic state dumps to facilitate  pinpointing of recognised problems
            Log.Write(Serilog.Events.LogEventLevel.Debug, ex, message);
        }

        public static void Verbose(Exception ex, string message)
        {
            // Verbose - tracing information and debugging minutiae; 
            //             generally only switched on in unusual situations
            Log.Write(Serilog.Events.LogEventLevel.Verbose, ex, message);
        }

        public static void Fatal(Exception ex, string message)
        {
            //Fatal - critical errors causing complete failure of the application
            Log.Write(Serilog.Events.LogEventLevel.Fatal, ex, message);
        }

        public static void Information(Exception ex, string message)
        {
            //Fatal - critical errors causing complete failure of the application
            Log.Write(Serilog.Events.LogEventLevel.Fatal, ex, message);
        }
        public static void Information(string message)
        {
            string UserName = HttpContext.Current.User.Identity.Name;
            string UserId = HttpContext.Current.User.Identity.Name;

            Log.Information(message + " By: {UserName} ", UserName);
        }
        public static void Information(string message, string UserName)
        {
            Log.Information(message + " By: {UserName} ", UserName);
        }
        public static void Information(string message, string UserName, string RawData)
        {
            Log.Information(message + " By: {UserName} {RawData}", UserName, RawData);
        }

        public static void Information(string message, params object[] Params)
        {
            //Fatal - critical errors causing complete failure of the application
            Log.Information(message, Params);
        }
    }
}
