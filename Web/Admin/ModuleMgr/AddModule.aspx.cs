using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_ModuleMgr_AddModule : BaseAdminPage
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
    /// 处理请求
    /// </summary>
    private void Process()
    {
        SysModuleBLL bll = SysModuleBLL.GetInstance();
        SysModuleData data = new SysModuleData();

        string moduleName = RequestUtil.RequestString(Request, "ModuleName", string.Empty);
        string defaultUrl = RequestUtil.RequestString(Request, "DefaultUrl", string.Empty);
        int parentID = RequestUtil.RequestInt(Request, "ParentID", 0);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);

        data.ModuleName = moduleName;
        data.DefaultUrl = defaultUrl;
        data.ParentID = parentID;
        data.Remark = remark;

        if (bll.Add(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "添加成功！";

        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败！原因不详";
        }

    }

    /// <summary>
    /// 验证输入信息是否合法
    /// </summary>
    /// <param name="parentNodeName"></param>
    protected override void ValidateInput()
    {
        string moduleName = RequestUtil.RequestString(Request, "ModuleName", string.Empty);
        if (moduleName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模块名称不能为空";

            OutputJSonMessage();
            return;
        }

        int parentID = RequestUtil.RequestInt(Request, "ParentID", -1);
        if (parentID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "父模块不能为空";

            OutputJSonMessage();
            return;
        }
    }
}