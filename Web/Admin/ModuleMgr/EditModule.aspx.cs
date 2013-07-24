using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_ModuleMgr_EditModule : BaseAdminPage
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
        int moduleID = RequestUtil.RequestInt(Request, "ModuleID", -1);
        int parentID = RequestUtil.RequestInt(Request, "ParentID", -1);
        string moduleName = RequestUtil.RequestString(Request, "ModuleName", string.Empty);
        string defaultUrl = RequestUtil.RequestString(Request, "DefaultUrl", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);

        SysModuleBLL bll = SysModuleBLL.GetInstance();
        SysModuleData data = bll.GetDataById(moduleID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前模块不存在！";
            return;
        }

        if (bll.GetDataById(parentID) == null && parentID != 0)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "父模块ID非法！";
            return;
        }

        if (moduleID == parentID)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "父模块不允许为自己！";
            return;
        }


        data.ParentID = parentID;
        data.ModuleName = moduleName;
        data.DefaultUrl = defaultUrl;
        data.Remark = remark;

       if (bll.Edit(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "编辑成功";
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
        string moduleName = RequestUtil.RequestString(Request, "ModuleName", string.Empty);
        if (moduleName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模板名称不能为空";

            OutputJSonMessage();
            return;
        }

        int moduleID = RequestUtil.RequestInt(Request, "ModuleID", -1);
        if (moduleID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模板分类不能为空";

            OutputJSonMessage();
            return;
        }
    }
}