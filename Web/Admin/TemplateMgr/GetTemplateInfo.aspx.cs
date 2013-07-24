using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;

public partial class Admin_TemplateMgr_GetTemplateInfo : BaseAdminPage
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
        int templateID = RequestUtil.RequestInt(Request, "TemplateID", -1);
        ContentTemplateBLL bll = ContentTemplateBLL.GetInstance();
        ContentTemplateData data = bll.GetDataById(templateID);

        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "该模板不存在！";
            OutputJSonMessage();

            return;
        }

        sb.Append("{");
        sb.Append("success: true,");
        sb.Append("data: ");
        sb.Append(data.ToJSon());
        sb.Append("}");

    }


    protected override void ValidateInput()
    {
        int templateID = RequestUtil.RequestInt(Request, "TemplateID", -1);
        if (templateID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模板ID不能为空";
            OutputJSonMessage();

            return;
        }
    }
}