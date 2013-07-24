using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_ModuleMgr_DeleteModule : BaseAdminPage
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
        SysModuleBLL bll = SysModuleBLL.GetInstance();
        int moduleID = RequestUtil.RequestInt(Request, "ModuleID", -1);
        SysModuleData data = bll.GetDataById(moduleID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "所要删除的模块不存在！";
            return;
        }

        if (bll.Remove(moduleID))
        {
            //功能也删除
            List<SysFunctionData> functionDatas = SysFunctionBLL.GetInstance().GetDatasByModuleID(moduleID);
            foreach (SysFunctionData functionData in functionDatas)
            {
                SysFunctionBLL.GetInstance().Remove(functionData.FunctionID);
            }

            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "删除成功！";
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "删除失败，原因不详！";
        }
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
            HandlerMessage.Text = "请选择要删除的模块！";

            OutputJSonMessage();
            return;
        }
    }

}