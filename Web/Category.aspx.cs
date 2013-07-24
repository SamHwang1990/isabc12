using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hope.Util;
using System.Text;
using Hope.BLL;
using Hope.Model;
using Hope.TemplateUtil;

public partial class Category : System.Web.UI.Page
{
    private StringBuilder sb = new StringBuilder();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            BuildData();

            Output();
        }
    }

    private void BuildData()
    {
        int nodeID = RequestUtil.RequestInt(Request, "ID", -1);
        ContentNodeBLL nodeBll = ContentNodeBLL.GetInstance();
        //根据节点ID，获取节点信息
        ContentNodeData nodeData = nodeBll.GetDataById(nodeID);

        //判断节点是否为空
        if (nodeData == null)
        {
            sb.Append("栏目不存在！");
            Output();
        }

        //读取栏目的默认模板
        ContentTemplateBLL templateBll = ContentTemplateBLL.GetInstance();
        ContentTemplateData templateData = templateBll.GetDataById(nodeData.IndexTemplateID);

        //判断模板是否为空
        if (templateData == null)
        {
            sb.Append("模板不存在！");
            Output();
        }

        //读取模板分类
        //ContentTemplateCategoryBLL categoryBll = ContentTemplateCategoryBLL.GetInstance();
        //ContentTemplateCategoryData categoryData = categoryBll.GetDataById(templateData.CategoryID);
        //if (categoryData == null)
        //{
        //    sb.Append("找不到模板类别！");
        //    return;
        //}

        //构建模板路径
        string path = TemplateHelper.GetInstance().GetTemplateCategoryDirName(templateData);
        VelocityHelper helper = new VelocityHelper();

        //传入系统内置标签HopeTag
        HopeTag hopeTag = new HopeTag(nodeData);
        helper.Put("HopeTag", hopeTag);

        string html = helper.GetTemplateContent(path);
        sb.Append(html);
    }


    #region 私有方法
    private void Output()
    {
        Response.Write(sb.ToString());
        Response.Flush();
        Response.End();
    }

    /// <summary>
    /// 检查输入的参数
    /// </summary>
    private void ValidateInput()
    {
        int nodeID = RequestUtil.RequestInt(Request, "ID", -1);
        if (nodeID == -1)
        {
            sb.Append("栏目ID不能为空！");

            Output();
        }
    }

    #endregion
}