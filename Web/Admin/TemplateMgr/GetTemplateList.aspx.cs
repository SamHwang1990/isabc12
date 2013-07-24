using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;
using Newtonsoft.Json;

public partial class Admin_TemplateMgr_GetTemplateList : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //ValidateInput();

            BuildData();

            OutputJSonData();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void BuildData()
    {
        ContentTemplateBLL bll = ContentTemplateBLL.GetInstance();
        ContentTemplateCategoryBLL categoryBll = ContentTemplateCategoryBLL.GetInstance();
        List<ContentTemplateData> list = null;
        int categoryID = RequestUtil.RequestInt(Request, "CategoryID", -1);
        int count = bll.GetCount();
        int startIndex = RequestUtil.RequestInt(Request, "start", 0);
        int pageSize = RequestUtil.RequestInt(Request, "limit", 15);

        if (categoryBll.GetDataById(categoryID) != null)
        {
            list = bll.GetPagedDatasByCategoryID(categoryID, startIndex, pageSize);
        }
        else
        {
            list = bll.GetList(startIndex, pageSize);
        }

        sb.Append("{");
        sb.AppendFormat("\"totalPorperty\": {0}, ", count);
        sb.Append("\"success\":\"true\", ");
        sb.AppendFormat("data:{0}", JsonConvert.SerializeObject(list));
        sb.Append("}");
    }

    /// <summary>
    /// 
    /// </summary>
    protected override void ValidateInput()
    {
        int startIndex = RequestUtil.RequestInt(Request, "start", -1);
        if (startIndex == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "参数错误";

            OutputJSonMessage();
            return;
        }

        int pageSize = RequestUtil.RequestInt(Request, "limit", -1);
        if (pageSize == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "参数错误";

            OutputJSonMessage();
            return;
        }
    }
}