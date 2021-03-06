﻿using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;

public partial class Admin_TemplateMgr_GetTemplateCategoryList2 : BaseAdminPage
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