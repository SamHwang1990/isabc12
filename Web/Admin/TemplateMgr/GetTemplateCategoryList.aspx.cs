using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;

public partial class Admin_TemplateMgr_GetTemplateCategoryList : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
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
        List<ContentTemplateCategoryData> categoryDatas = bll.GetDatas();
        ContentTemplateCategoryData blankData = new ContentTemplateCategoryData();
        blankData.ParentID = 0; ;
        blankData.TemplateCategoryID = 0;
        blankData.TemplateCategoryName = "不属于任何分类";
        categoryDatas.Insert(0, blankData);

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", categoryDatas.Count);

        sb.Append("root: [");
        foreach (ContentTemplateCategoryData data in categoryDatas)
        {
            sb.Append(data.ToJSon());
            sb.Append(",");
        }
        sb.Append("]}");
    }
}