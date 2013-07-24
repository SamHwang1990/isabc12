/******************************************************************
 *
 * 所在模块：Business Logic (业务逻辑处理模块)
 * 类 名 称：SysUser (SysUserBLL)
 * 功能描述：
 * 
******************************************************************/

using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;

using Hope.DAL;
using Hope.Model;
using Hope.Enums;
using Hope.Util;
using Hope.DAL.DBUtil;

using org.in2bits.MyXls;
using org.in2bits.MyOle2;

namespace Hope.BLL
{

	/// <summary>
    /// Business Handler SysUser
    /// </summary>
    public class SysUserBLL : BaseBLL
    {
        /// <summary>
        /// 数据访问层接口 IQuery
        /// </summary>
        private IQuery<SysUserData, int> query;

        private SysUserDAL Provider;

        private static SysUserBLL instance = null;

        /// <summary>
        /// Business Handler SysUserHandler 
        /// </summary>
        private SysUserBLL()
        {
            query = new QueryStringBuilder<SysUserData, int>("Sys_User", "UserID");
            Provider = new SysUserDAL(ApplicationConfig.DBConnectionString);
            HandlerMessage = new SystemMessage();
        }

        /// <summary>
        /// 获取实例
        /// </summary>
        public static SysUserBLL GetInstance()
        {
            if (instance == null)
            {
                instance = new SysUserBLL();
            }

            return instance;
        }

        /// <summary>
        /// 添加记录
        /// </summary>
        /// <param name="data"></param>
        /// <returns>return the handler result</returns>
        public bool Add( SysUserData data )
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "添加成功！";
            HandlerMessage.Succeed = true;
            if (!Provider.Add(data))
            {
                HandlerMessage.Code = "01";
                HandlerMessage.Text = "添加失败！";
                HandlerMessage.Succeed = false;
                return false;
            }

            return true;
        }

        /// <summary>
        /// 修改记录
        /// </summary>
        /// <param name="data"></param>
        /// <returns>return the handler result</returns>
        public bool Edit( SysUserData data )
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "编辑成功！";
            HandlerMessage.Succeed = true;
            if (!Provider.Edit(data))
            {
                HandlerMessage.Code = "01";
                HandlerMessage.Text = "编辑失败！";
                HandlerMessage.Succeed = false;
                return false;
            }

            return true;
        }

        /// <summary>
        /// 删除单条记录
        /// </summary>
        /// <returns>return the handler result</returns>
        public bool Remove( int UserID )
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "删除成功！";
            HandlerMessage.Succeed = true;
            if (!Provider.Delete(UserID))
            {
                HandlerMessage.Code = "01";
                HandlerMessage.Text = "删除失败！";
                HandlerMessage.Succeed = false;
                return false;
            }

            return true;
        }

        /// <summary>
        /// 删除多条记录
        /// </summary>
        /// <param name="<%=strPrimaryKeyName%>List"></param>
        /// <returns>return the handler result</returns>
        public bool Remove( List<int> UserIDList )
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "删除成功！";
            HandlerMessage.Succeed = true;
            if (!Provider.Delete(UserIDList))
            {
                HandlerMessage.Code = "01";
                HandlerMessage.Text = "删除失败！";
                HandlerMessage.Succeed = false;
                return false;
            }

            return true;
        }

        /// <summary>
        /// 根据ID获取单条记录
        /// </summary>
        /// <returns></returns>
        public SysUserData GetDataById( int UserID )
        {
            return Provider.GetDataById(UserID);
        }

        /// <summary>
        /// 根据名称获取记录
        /// </summary>
        /// <param name="adminName"></param>
        /// <returns></returns>
        public SysUserData GetDataByName( string userName )
        {
            query.Clear();
            SimpleExpression exp = new SimpleExpression("Name", userName, "=");
            query.AddExp(exp);

            return query.Data();
        }

        /// <summary>
        /// 根据条件获取记录总数
        /// </summary>
        /// <param name="exps">条件</param>
        /// <returns>记录总数</returns>
        public int GetCount( List<SimpleExpression> exps )
        {
            query.ClearExpression();

            foreach (SimpleExpression exp in exps)
            {
                query.AddExp(exp);
            }

            return query.Count();
        }

        /// <summary>
        /// 获取记录总数
        /// </summary>
        /// <returns>记录总数</returns>
        public int GetCount()
        {
            return Provider.GetCount();
        }

        /// <summary>
        /// 获取所有记录列表
        /// </summary>
        /// <returns></returns>
        public List<SysUserData> GetDatas()
        {
            return Provider.GetAll();
        }

        /// <summary>
        /// 获取所有记录分页列表
        /// </summary>
        /// <param name="pager">Pager Info</param>
        /// <returns></returns>
        public List<SysUserData> GetList( int startIndex, int pageSize )
        {
            int endIndex = startIndex + pageSize - 1; //当前页要显示的记录的结束索引
            return Provider.GetPagedList(startIndex, endIndex, "", ColumnOrderType.ASC);
        }

        /// <summary>
        /// 获取所有记录分页列表
        /// </summary>
        /// <param name="pager">Pager Info</param>
        /// <param name="orderColumn"></param>
        /// <param name="orderType"></param>
        /// <returns></returns>
        public List<SysUserData> GetList( int startIndex, int pageSize, string orderColumn, ColumnOrderType orderType )
        {
            int endIndex = startIndex + pageSize - 1; //当前页要显示的记录的结束索引
            return Provider.GetPagedList(startIndex, endIndex, orderColumn, orderType);
        }

        public void ExportUser( string xlsName, string sheetName )
        {
            string strSql = "Select * From Sys_User order by UserID ASC";  //Sql语句
            string conStr = ApplicationConfig.DBConnectionString;
            SqlDataReader rdr = SqlHelper.ExecuteReader(conStr, CommandType.Text, strSql, null);
            XlsDocument xls = xlsGridview(rdr, xlsName, sheetName);
            xls.Send();
        }

        private XlsDocument xlsGridview( SqlDataReader sdr, string xlsName, string sheetName )
        {
            XlsDocument xls = new XlsDocument();
            xls.FileName = xlsName;

            Worksheet sheet = xls.Workbook.Worksheets.AddNamed(sheetName);      //设置表的名称
            Cells cells = sheet.Cells;

            for (int i = 1; i < sdr.FieldCount; i++)
            {
                cells.AddValueCell(1, i, sdr.GetName(i));
            }
            int rowIndex = 1;
            while (sdr.Read())
            {
                rowIndex++;
                for (int j = 1; j < sdr.FieldCount; j++)
                {
                    Cell cell = cells.AddValueCell(rowIndex, j, (sdr[j].ToString()));
                }
            }

            return xls;
        }
    }

}