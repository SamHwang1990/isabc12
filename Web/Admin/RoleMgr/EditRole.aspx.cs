using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_RoleMgr_EditRole : BaseAdminPage
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
        SysRoleData data = null;

        string roleName = RequestUtil.RequestString(Request, "RoleName", string.Empty);
        bool status = RequestUtil.RequestBoolean(Request, "Status", false);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);


        //判断当前名称是否已存在
        data = bll.GetDataByName(roleName);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前角色不存在！";
            return;
        }

        data.RoleName = roleName;
        data.Status = status;
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