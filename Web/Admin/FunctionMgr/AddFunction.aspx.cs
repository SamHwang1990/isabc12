using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_FunctionMgr_AddFunction : BaseAdminPage
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
        string functionName = RequestUtil.RequestString(Request, "FunctionName", string.Empty);
        string url = RequestUtil.RequestString(Request, "DefaultUrl", string.Empty);
        int moduleID = RequestUtil.RequestInt(Request, "ModuleID", 0);
        int functionValue = RequestUtil.RequestInt(Request, "FunctionValue", -1);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);
        string functionKey = RequestUtil.RequestString(Request, "FunctionKey", string.Empty);

        SysFunctionBLL bll = SysFunctionBLL.GetInstance();
        SysFunctionData data = new SysFunctionData();

        data.FunctionName = functionName;
        data.DefaultUrl = url;
        data.ModuleID = moduleID;
        data.Remark = remark;
        data.FunctionKey = functionKey;
        data.FunctionValue = functionValue;

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
        string functionName = RequestUtil.RequestString(Request, "FunctionName", string.Empty);
        if (functionName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "功能名称不能为空";

            OutputJSonMessage();
            return;
        }

        string url = RequestUtil.RequestString(Request, "DefaultUrl", string.Empty);
        if (url == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "URL不能为空";

            OutputJSonMessage();
            return;
        }

        int moduleID = RequestUtil.RequestInt(Request, "ModuleID", -1);
        if (moduleID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "所属模块不能为空";

            OutputJSonMessage();
            return;
        }

        int functionValue = RequestUtil.RequestInt(Request, "FunctionValue", -1);
        if (functionValue == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "功能值不能为空";

            OutputJSonMessage();
            return;
        }
    }
}