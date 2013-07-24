using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;

public partial class Admin_UserMgr_AddUser : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            Process();

            OutputJSonMessage();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void Process()
    {

        SysUserBLL bll = SysUserBLL.GetInstance();
        SysUserData data = new SysUserData();

        string Name = RequestUtil.RequestString(Request, "Name", string.Empty);
        
        string title = RequestUtil.RequestString(Request, "Title", string.Empty);


        //判断当前名称是否已存在

        data.Name = Name;
        data.Name = Name;
        data.Title = title;

        if (bll.Add(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "添加成功";
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败，未知错误！";
        }

    }

    /// <summary>
    /// 验证输入信息是否合法
    /// </summary>
    /// <param name="parentNodeName"></param>
    protected override void ValidateInput()
    {
        string Name = RequestUtil.RequestString(Request, "Name", string.Empty);
        if (Name == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "Name不能为空";

            OutputJSonMessage();
            return;
        }

       

        string title = RequestUtil.RequestString(Request, "Title", string.Empty);
        if (title == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "Title不能为空";

            OutputJSonMessage();
            return;
        }
    }
}