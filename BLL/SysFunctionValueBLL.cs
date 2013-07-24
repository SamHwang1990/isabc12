/******************************************************************
 *
 * 所在模块：Business Logic (业务逻辑处理模块)
 * 类 名 称：SysFunctionValue (SysFunctionValueBLL)
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
    /// Business Handler SysFunctionValue
    /// </summary>
    public class SysFunctionValueBLL : BaseBLL
    {
		/// <summary>
        /// 数据访问层接口 IQuery
        /// </summary>
        private IQuery<SysFunctionValueData, int> query;
		
        private SysFunctionValueDAL Provider;
		
		private static SysFunctionValueBLL instance = null;
		
		/// <summary>
        /// Business Handler SysFunctionValueHandler 
        /// </summary>
        private SysFunctionValueBLL()
        {
			query = new QueryStringBuilder<SysFunctionValueData, int>("Sys_FunctionValue", "ValueID");
            Provider = new SysFunctionValueDAL(ApplicationConfig.DBConnectionString);
            HandlerMessage = new SystemMessage();
        }
		
		/// <summary>
        /// 获取实例
        /// </summary>
		public static SysFunctionValueBLL GetInstance()
		{
			if(instance == null)
			{
				instance = new SysFunctionValueBLL();
			}
			
			return instance;
		}
		
		/// <summary>
        /// 添加记录
        /// </summary>
        /// <param name="data"></param>
        /// <returns>return the handler result</returns>
        public bool Add(SysFunctionValueData data)
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
        public bool Edit(SysFunctionValueData data)
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
        public bool Remove(int ValueID)
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "删除成功！";
			HandlerMessage.Succeed = true;
            if (!Provider.Delete(ValueID))
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
        public bool Remove(List<int> ValueIDList)
        {
            HandlerMessage.Code = "00";
            HandlerMessage.Text = "删除成功！";
			HandlerMessage.Succeed = true;
            if (!Provider.Delete(ValueIDList))
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
        public SysFunctionValueData GetDataById(int ValueID)
        {
            return Provider.GetDataById(ValueID);
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
        /// 根据角色ID和模块ID获取记录
        /// </summary>
        /// <param name="roleID"></param>
        /// <param name="moduleID"></param>
        /// <returns></returns>
        public SysFunctionValueData GetData(int roleID, int moduleID)
        {
            query.Clear();
            SimpleExpression exp1 = new SimpleExpression("RoleID", roleID, "=");
            SimpleExpression exp2 = new SimpleExpression("ModuleID", moduleID, "=");

            query.AddExp(exp1);
            query.AddExp(exp2);

            return query.Data();
        }

		/// <summary>
        /// 获取所有记录列表
        /// </summary>
        /// <returns></returns>
        public List<SysFunctionValueData> GetDatas()
        {
            return Provider.GetAll();
        }
		
		/// <summary>
        /// 获取所有记录分页列表
        /// </summary>
        /// <param name="pager">Pager Info</param>
        /// <returns></returns>
        public List<SysFunctionValueData> GetList(int startIndex, int pageSize)
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
        public List<SysFunctionValueData> GetList(int startIndex, int pageSize,string orderColumn, ColumnOrderType orderType)
        {
			int endIndex = startIndex + pageSize - 1; //当前页要显示的记录的结束索引
            return Provider.GetPagedList(startIndex, endIndex, orderColumn, orderType);
        }
		
	}

}