/******************************************************************
 *
 * 所在模块：Business Logic (业务逻辑处理模块)
 * 类 名 称：SysFunction (SysFunctionBLL)
 * 功能描述：
 * 
******************************************************************/

using System;
using System.Collections.Generic;
using System.Text;

using Hope.DAL;
using Hope.Model;
using Hope.Enums;
using Hope.Util;

namespace Hope.BLL
{

	/// <summary>
    /// Business Handler SysFunction
    /// </summary>
    public class SysFunctionBLL : BaseBLL
    {
		/// <summary>
        /// 数据访问层接口 IQuery
        /// </summary>
        private IQuery<SysFunctionData, int> query;
		
        private SysFunctionDAL Provider;
		
		private static SysFunctionBLL instance = null;
		
		/// <summary>
        /// Business Handler SysFunctionHandler 
        /// </summary>
        private SysFunctionBLL()
        {
			query = new QueryStringBuilder<SysFunctionData, int>("Sys_Function", "FunctionID");
            Provider = new SysFunctionDAL(ApplicationConfig.DBConnectionString);
            HandlerMessage = new SystemMessage();
        }
		
		/// <summary>
        /// 获取实例
        /// </summary>
		public static SysFunctionBLL GetInstance()
		{
			if(instance == null)
			{
				instance = new SysFunctionBLL();
			}
			
			return instance;
		}
		
		/// <summary>
        /// 添加记录
        /// </summary>
        /// <param name="data"></param>
        /// <returns>return the handler result</returns>
        public bool Add(SysFunctionData data)
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
        public bool Edit(SysFunctionData data)
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
        public bool Remove(int FunctionID)
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "删除成功！";
			HandlerMessage.Succeed = true;
            if (!Provider.Delete(FunctionID))
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
        public bool Remove(List<int> FunctionIDList)
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "删除成功！";
			HandlerMessage.Succeed = true;
            if (!Provider.Delete(FunctionIDList))
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
        public SysFunctionData GetDataById(int FunctionID)
        {
            return Provider.GetDataById(FunctionID);
        }


        /// <summary>
        /// 根据DefaultUrl获取记录
        /// </summary>
        /// <param name="defaultUrl"></param>
        /// <returns></returns>
        public SysFunctionData GetDataByDefaultUrl(string defaultUrl)
        {
            query.Clear();
            SimpleExpression exp = new SimpleExpression("DefaultUrl", defaultUrl, "=");
            query.AddExp(exp);

            return query.Data();
        }

        /// <summary>
        /// 根据模块ID获取多条记录
        /// </summary>
        /// <param name="moduleID"></param>
        /// <returns></returns>
        public List<SysFunctionData> GetDatasByModuleID(int moduleID)
        {
            query.Clear();
            SimpleExpression exp = new SimpleExpression("ModuleID", moduleID, "=");
            query.AddExp(exp);

            return query.ListALL(); ;
        }

		/// <summary>
        /// 根据条件获取记录总数
        /// </summary>
        /// <param name="exps">条件</param>
        /// <returns>记录总数</returns>
        public int GetCount(List<SimpleExpression> exps)
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
        public List<SysFunctionData> GetDatas()
        {
            return Provider.GetAll();
        }
		
		/// <summary>
        /// 获取所有记录分页列表
        /// </summary>
        /// <param name="pager">Pager Info</param>
        /// <returns></returns>
        public List<SysFunctionData> GetList(int startIndex, int pageSize)
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
        public List<SysFunctionData> GetList(int startIndex, int pageSize,string orderColumn, ColumnOrderType orderType)
        {
			int endIndex = startIndex + pageSize - 1; //当前页要显示的记录的结束索引
            return Provider.GetPagedList(startIndex, endIndex, orderColumn, orderType);
        }
		
	}

}