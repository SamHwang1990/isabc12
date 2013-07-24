using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;

public partial class Admin_RoleMgr_AddRole : BaseAdminPage
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
        SysRoleBLL bll = SysRoleBLL.GetInstance();
        SysRoleData data = new SysRoleData();

        string roleName = RequestUtil.RequestString(Request, "RoleName", string.Empty);
        bool status = RequestUtil.RequestBoolean(Request, "Status", true);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);

        data.RoleName = roleName;
        data.Status = status;
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
        string roleName = RequestUtil.RequestString(Request, "RoleName", string.Empty);
        if (roleName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "角色名称不能为空";

            OutputJSonMessage();
            return;
        }
    }
}