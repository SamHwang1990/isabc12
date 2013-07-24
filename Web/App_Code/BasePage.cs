using System;
using System.Collections.Generic;
using System.Web;
using Hope.BLL;
using Hope.Model;
using Hope.Util;
using System.Text;

namespace HPCMS.Web.App_Code
{
    /// <summary>
    /// 后台页面基础类，只检查是否已经登录，不检查是否具有权限
    /// </summary>
    public class BasePage : System.Web.UI.Page
    {


        #region 属性
        private SystemMessage _HandlerMessage;
        /// <summary>
        /// 系统信息，用于输出执行时的结果信息
        /// </summary>
        public SystemMessage HandlerMessage
        {
            set { _HandlerMessage = value; }
            get
            {
                if (_HandlerMessage == null)
                {
                    _HandlerMessage = new SystemMessage();
                }
                return _HandlerMessage;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        protected StringBuilder sb = new StringBuilder(); 

        #endregion

        public BasePage()
        {
            if (!IsPostBack)
            {
            }
        }

        #region 复写的方法

        /// <summary>
        /// 复写页面初始化的方法，检查是否已经登录
        /// </summary>
        /// <param name="e"></param>
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            //调试，暂不检查登录
            if (!IsLogin())
            {
                Response.Redirect("~/Admin/Login.aspx");
                Response.End();
                return;
            }
        }

        

        #endregion

        #region 方法

        /// <summary>
        /// 输出XML信息
        /// </summary>
        protected void OutputXmlMessage()
        {
            Response.ContentType = "text/xml";
            Response.Write(HandlerMessage.XmlDocument.OuterXml);
            Response.End();
        }

        /// <summary>
        /// 输出HandlerMessage的JSon形式
        /// </summary>
        protected void OutputJSonMessage()
        {
            Response.ContentType = "text/plain";
            Response.Write(HandlerMessage.JSon);
            Response.End();
        }

        /// <summary>
        /// 输出JSon数据
        /// </summary>
        protected void OutputJSonData()
        {
            Response.ContentType = "text/plain";
            Response.Write(sb.ToString());
            Response.End();
        }

        /// <summary>
        /// 添加到日志
        /// </summary>
        /// <param name="account">操作者帐号</param>
        /// <param name="msg">日志信息</param>
        protected bool AddLog(string account, string msg)
        {
            SysLogBLL bll = SysLogBLL.GetInstance();
            SysLogData data = new SysLogData();

            data.Account = account;
            data.Title = msg;
            data.Message = msg;
            data.Time = System.DateTime.Now;
            data.Remark = "";

            return bll.Add(data);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private bool IsLogin()
        {
            //是否登录
            if (Session[IKey.ACCOUNT] == null)
            {
                //如果Session为空，检查Cookie
                HttpCookie cookie = Response.Cookies.Get(IKey.ACCOUNT);
                string adminName = cookie.Values.Get(IKey.ADMIN_NAME);

                return adminName != null && SysAdminBLL.GetInstance().GetDataByName(adminName) != null;

            }
            return true;
        }

        /// <summary>
        /// 检验提交的参数
        /// </summary>
        protected virtual void ValidateInput()
        {
            
        }

        #endregion
    }
}