using System;
using System.Collections.Generic;
using System.Web;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

namespace HPCMS.Web.App_Code
{
    /// <summary>
    /// 后台页面的基础页面，继承自BasePage，由BasePage的OnInit()方法检查是否已经登录，
    /// 而本类进行检查是否有权限访问的当前Url
    /// </summary>
    public class BaseAdminPage:BasePage
    {
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);            

            //是否有权限
            if (!CheckPermission())
            {
                Response.Write("无权操作");
                Response.Flush();
                Response.End();
                return;
            }
        }

        /// <summary>
        /// 检查当前角色是否具有访问当前URL的权限
        /// </summary>
        /// <returns></returns>
        private bool CheckPermission()
        {
            SysAdminData account = (SysAdminData)Session[IKey.ACCOUNT];
            string url = CommonClass.GetRequestShotUrl();

            //根据url，获取功能
            SysFunctionBLL functionBll = SysFunctionBLL.GetInstance();
            SysFunctionData functionData = functionBll.GetDataByDefaultUrl(url);

            if (functionData == null)
            {
                return false;
            }
            
            return IsPermission(account.RoleID, functionData);
        }

        /// <summary>
        /// 判断指定角色是否拥有该功能权限
        /// </summary>
        /// <param name="roldID"></param>
        /// <param name="functionData"></param>
        /// <returns></returns>
        protected bool IsPermission(int roldID, SysFunctionData functionData)
        {
            SysFunctionValueBLL functionValueBll = SysFunctionValueBLL.GetInstance();
            SysFunctionValueData functionValuesData = functionValueBll.GetData(roldID, functionData.ModuleID);
            if (functionValuesData == null)
            {
                return false;
            }

            return (functionValuesData.FunctionValues & functionData.FunctionValue) > 0;
        }
    }
}