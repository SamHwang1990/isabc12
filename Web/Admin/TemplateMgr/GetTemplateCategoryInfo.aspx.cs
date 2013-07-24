using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Util;
using Hope.Model;

public partial class Admin_TemplateMgr_GetTemplateCategoryInfo : BaseAdminPage
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
        ContentTemplateCategoryBLL bll = ContentTemplateCategoryBLL.GetInstance();
        int categoryID = RequestUtil.RequestInt(Request, "TemplateCategoryID", -1);
        ContentTemplateCategoryData data = bll.GetDataById(categoryID);

        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "该分类不存在！";

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
        int nodeID = RequestUtil.RequestInt(Request, "TemplateCategoryID", -1);

        if (nodeID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "分类ID不能为空！";

            OutputJSonMessage();

            return;
        }
    }
}