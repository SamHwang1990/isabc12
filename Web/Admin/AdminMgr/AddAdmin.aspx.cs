using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hope.Util;
using Hope.Model;
using Hope.BLL;
using HPCMS.Web.App_Code;

public partial class Admin_AdminMgr_AddAdmin : BaseAdminPage
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

        SysAdminBLL bll = SysAdminBLL.GetInstance();
        SysAdminData data = new SysAdminData();

        string adminName = RequestUtil.RequestString(Request, "AdminName", string.Empty);
        string password = RequestUtil.RequestString(Request, "Password", string.Empty);
        bool status = RequestUtil.RequestBoolean(Request, "Status", false);
        int roleID = RequestUtil.RequestInt(Request, "RoleID", -1);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);


        //判断当前名称是否已存在
        if (bll.GetDataByName(adminName) != null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前帐号已经存在！";
            return;
        }

        data.AdminName = adminName;
        data.Password = CommonClass.md5(password, 32);
        data.Status = status;
        data.RoleID = roleID;
        data.RegTime = System.DateTime.Now;
        data.Remark = remark;

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
        string adminName = RequestUtil.RequestString(Request, "AdminName", string.Empty);
        if (adminName == string.Empty)
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

        int roleID = RequestUtil.RequestInt(Request, "RoleID", -1);
        if (roleID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "状态不能为空";

            OutputJSonMessage();
            return;
        }
    }
}