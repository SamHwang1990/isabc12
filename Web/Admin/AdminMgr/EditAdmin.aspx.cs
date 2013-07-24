using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_AdminMgr_EditAdmin : BaseAdminPage
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
        SysAdminData data = null;

        string adminName = RequestUtil.RequestString(Request, "AdminName", string.Empty);
        string password = RequestUtil.RequestString(Request, "Password", string.Empty);
        bool status = RequestUtil.RequestBoolean(Request, "Status", false);
        int roleID = RequestUtil.RequestInt(Request, "RoleID", -1);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);


        //判断当前名称是否已存在
        data = bll.GetDataByName(adminName);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前帐号不存在！";
            return;
        }

        if (password != "")
        {
            data.Password = CommonClass.md5(password, 32);
        }
        data.Status = status;
        data.RoleID = roleID;
        data.Remark = remark;

        if (bll.Edit(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "修改成功";
            return;
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "修改失败，未知错误！";
        }

    }


    /// <summary>
    /// 
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

        int roleID = RequestUtil.RequestInt(Request, "RoleID", -1);
        if (roleID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "角色不能为空";

            OutputJSonMessage();
            return;
        }
    }
}