using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hope.BLL;
using Hope.Model;
using Hope.Util;
using Hope.TemplateUtil;
using System.Text;


public partial class _Default : System.Web.UI.Page
{
    private StringBuilder sb = new StringBuilder();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BuildData();

            Output();
        }
    }

    /// <summary>
    /// 处理请求
    /// </summary>
    private void BuildData()
    {
        //获取首页节点
        ContentNodeData nodeData = ContentNodeBLL.GetInstance().GetDataById(1);
        if(nodeData == null)
        {
            sb.Append("糟糕，找不到节点！");
            return;
        }

        //获取首页节点的模板
        ContentTemplateData templateData = ContentTemplateBLL.GetInstance().GetDataById(nodeData.IndexTemplateID);
        if (templateData == null)
        {
            sb.Append("糟糕，找不到模板！");
            return;
        }

        ////获取首页节点的模板分类
        //ContentTemplateCategoryData categoryData = ContentTemplateCategoryBLL.GetInstance().GetDataById(templateData.CategoryID);
        //if (categoryData == null)
        //{
        //    sb.Append("糟糕，找不到模板类别！");
        //    return;
        //}

        //构建模板路径
        string path = TemplateHelper.GetInstance().GetTemplateCategoryDirName(templateData);
        VelocityHelper helper = new VelocityHelper();

        //添加系统内置标签HopeTag
        HopeTag hopeTag = new HopeTag();
        helper.Put("HopeTag", hopeTag);

        string html = helper.GetTemplateContent(path);
        sb.Append(html);
    }

    private void Output()
    {
        Response.Write(sb.ToString());
        Response.Flush();
        Response.End();
    }
}