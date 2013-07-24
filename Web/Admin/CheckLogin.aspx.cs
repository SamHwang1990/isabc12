using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

/// <summary>
/// 继承自BasePage，由于BasePage的OnInit方法要检查是否登录，
/// 不适用于本类，所要要复写父类的OnInit()方法
/// </summary>
public partial class Admin_CheckLogin : BasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            Process();
        }
    }

    /// <summary>
    /// 复写父类的方法，且不能调用父类的该方法
    /// </summary>
    /// <param name="e"></param>
    protected override void OnInit(EventArgs e)
    {

    }

    /// <summary>
    /// 
    /// </summary>
    private void Process()
    {
        string adminName = RequestUtil.RequestString(Request, "AdminName", string.Empty);
        string password = RequestUtil.RequestString(Request, "Password", string.Empty);

        SysAdminBLL bll = SysAdminBLL.GetInstance();
        SysAdminData data = bll.GetDataByName(adminName);

        //判断帐号是否存在
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前帐号不存在";

            OutputJSonMessage();
            return;
        }

        //判断当前管理员的状态是禁用还是正常
        if (!data.Status)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前帐号被禁用";

            OutputJSonMessage();
            return;
        }

        if (data.Password != CommonClass.md5(password, 32))
        {
            //写入日志
            AddLog(adminName, "登录密码错误");

            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "密码错误";

            OutputJSonMessage();
            return;
        }

        //登录成功
        //写入数据库
        data.LastLoginTime = System.DateTime.Now;
        data.LoginTimes += 1;
        bll.Edit(data);

        //写入Session和Cookie
        Session[IKey.ACCOUNT] = data;
        AddCookie(adminName);

        //写入日志
        AddLog(adminName, "登录成功");

        HandlerMessage.Succeed = true;
        HandlerMessage.Text = "登录成功";
        OutputJSonMessage();
        return;
    }

    /// <summary>
    /// 添加到cookie
    /// </summary>
    /// <param name="adminName"></param>
    private void AddCookie(string adminName)
    {
        HttpCookie cookie = new HttpCookie(IKey.ACCOUNT);
        //20分钟过期
        cookie.Expires = System.DateTime.Now.AddMinutes(2000);
        cookie.Values.Add(IKey.ADMIN_NAME, CommonClass.URLEncode(adminName));
        Response.Cookies.Add(cookie);
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentNodeName"></param>
    protected override void ValidateInput()
    {
        string adminName = RequestUtil.RequestString(Request, "AdminName", string.Empty);
        if(adminName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "管理员名称不能为空";

            OutputJSonMessage();
            return;
        }

        string password = RequestUtil.RequestString(Request, "Password", string.Empty);
        if (password == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "密码不能为空";

            OutputJSonMessage();
            return;
        }
    }


}