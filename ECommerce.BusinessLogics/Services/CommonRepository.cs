using ECommerce.BusinessLogics.Models;
using ECommerce.BusinessLogics.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.BusinessLogics.Services
{
    public class CommonServices : IServiceCommon
    {
        private CommonRepository commonRepository;

        public CommonServices()
        {
            this.commonRepository = new CommonRepository();
        }

        public DataTable GetBySp(string SpName)
        {
            return this.commonRepository.GetBySp(SpName);
        }
        public DataTable GetBySpWithParam(string SpName, params object[] parameterValues)
        {
            return this.commonRepository.GetBySpWithParam(SpName, parameterValues);
        }
        public DataTable GetBySpWithSQLParam(string SpName, params SqlParameter[] parameterValues)
        {
            return this.commonRepository.GetBySpWithParam(SpName, parameterValues);
        }
        public CommonResponse getDatasetResponseBySp(string SpName, params object[] parameterValues)
        {
            return this.commonRepository.getDatasetResponseBySp(SpName, parameterValues);
        }
        public CommonResponse getDataTableResponseBySp(int pageno, int pagesize, string SpName, params object[] parameterValues)
        {
            return this.commonRepository.getDataTableResponseBySp(pageno, pagesize, SpName, parameterValues);
        }
        public DataSet GetDatasetBySp(string SpName, params object[] parameterValues)
        {
            return this.commonRepository.GetDatasetBySp(SpName, parameterValues);
        }
        public DataTable GetDatatableBySQL(string SQL)
        {
            return this.commonRepository.GetDatatableBySQL(SQL);
        }

        public DataTable GetDatatableBySQL(string Query, Dictionary<string, string> WhereClauses, params SqlParameter[] sqlParameterlist)
        {
            return this.commonRepository.GetDatatableBySQL(Query, WhereClauses, sqlParameterlist);
        }
        public dynamic ExecuteSQL(string SQL)
        {
            return this.commonRepository.ExecuteSQL(SQL);
        }
        public DataTable ExecuteSQLQUERY(string SQL)
        {
            return this.commonRepository.ExecuteSQLQUERY(SQL);
        }
        public dynamic ExecuteSQL(string SQL, params SqlParameter[] commandParameters)
        {
            return this.commonRepository.ExecuteSQL(SQL, commandParameters);
        }

        public CommonResponse GetResponseBySp(string SpName)
        {
            return this.commonRepository.getResponseBySp(SpName);
        }
        public CommonResponse GetResponseBySpWithParam(string SpName, params object[] parameterValues)
        {
            return this.commonRepository.getResponseBySpWithParam(SpName, parameterValues);
        }

        public object GetScalarValueBySP(string SpName)
        {
            return this.commonRepository.GetScalarValueBySP(SpName);
        }

        public bool IsExist(string TableName, string Col, int value)
        {
            return this.commonRepository.IsExist(TableName, Col, value);
        }


        public bool IsExist(string TableName, string Col, string value)
        {
            return this.commonRepository.IsExist(TableName, Col, value);
        }
        public bool IsExist(string TableName, string WhereClause)
        {
            return this.commonRepository.IsExist(TableName, WhereClause);
        }

        public bool WriteLog(int Vid, int SId, int ShId, int ClassId, int GroupId, int MainExamId, string Pid, string Msg, string AddBy)
        {
            return this.commonRepository.WriteLog(Vid, SId, ShId, ClassId, GroupId, MainExamId, Pid, Msg, AddBy);
        }

        public bool WriteLog(int Id, decimal DrAmount, decimal CrAmount, string Description, string AddBy)
        {
            return this.commonRepository.WriteLog(Id, DrAmount, CrAmount, Description, AddBy);
        }

        public bool WriteLog(string Message, string Status)
        {
            return this.commonRepository.WriteLog(Message, Status);
        }        
        public bool UpdateBySql(string TableName, Dictionary<string, string> Columns, Dictionary<string, string> WhereClauses, params SqlParameter[] sqlParameterlist)
        {
            return this.commonRepository.UpdateBySql(TableName, Columns, WhereClauses, sqlParameterlist);
        }
        public bool UpdateBySql(string TableName, Dictionary<string, string> Columns, Dictionary<string, string> WhereClauses, List<SqlParameter> sqlParameterlist)
        {

            return this.commonRepository.UpdateBySql(TableName, Columns, WhereClauses, sqlParameterlist.ToArray());
        }
    }
}
