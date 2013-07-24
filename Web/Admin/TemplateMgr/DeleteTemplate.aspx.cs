using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Util;

public partial class Admin_TemplateMgr_DeleteTemplate : BaseAdminPage
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
        ContentTemplateBLL bll = ContentTemplateBLL.GetInstance();
        string ids = RequestUtil.RequestString(Request, "IDs", string.Empty);
        List<int> idList = ConvertHelper.ToIntList(ids);
        
        if (bll.Remove(idList))
        {
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
    protected override void ValidateInput()
    {
        string ids = RequestUtil.RequestString(Request, "IDs", string.Empty);
        if (ids == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "请选择要删除的模板！";

            OutputJSonMessage();
            return;
        }
    }
}