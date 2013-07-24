using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Util;
using Hope.Model;

public partial class Admin_ModuleMgr_GetModuleInfo : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            BuildData();

            OutputJSonData();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void BuildData()
    {
        SysModuleBLL bll = SysModuleBLL.GetInstance();
        int moduleID = RequestUtil.RequestInt(Request, "ModuleID", -1);
        SysModuleData data = bll.GetDataById(moduleID);

        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "该模块不存在！";

            OutputJSonMessage();
            return;
        }

        sb.Append("{");
        sb.Append("success: true,");
        sb.Append("data: ");
        sb.Append(data.ToJSon());
        sb.Append("}");
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentNodeName"></param>
    protected override void ValidateInput()
    {
        int moduleID = RequestUtil.RequestInt(Request, "ModuleID", -1);

        if (moduleID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模块ID不能为空！";

            OutputJSonMessage();

            return;
        }
    }
}