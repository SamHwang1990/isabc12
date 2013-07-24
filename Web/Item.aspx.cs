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

public partial class Item : System.Web.UI.Page
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
        int itemID = RequestUtil.RequestInt(Request, "ID", -1);

        ContentArticleBLL articleBll = ContentArticleBLL.GetInstance();
        ContentArticleData articleData = articleBll.GetDataById(itemID);

        if (articleData == null)
        {
            sb.Append("该文章不存在！");
            return;
        }

        //文章所属节点
        ContentNodeBLL nodeBll = ContentNodeBLL.GetInstance();
        ContentNodeData nodeData = nodeBll.GetDataById(articleData.NodeID);
        if (nodeData == null)
        {
            sb.Append("该文章所在节点不存在！");
            return;
        }

        //模板
        ContentTemplateBLL templateBll = ContentTemplateBLL.GetInstance();
        ContentTemplateData templateData = templateBll.GetDataById(nodeData.ContentTemplateID);
        if (templateData == null)
        {
            sb.Append("该文章模板不存在！");
            return;
        }

        //读取模板分类
        ContentTemplateCategoryBLL categoryBll = ContentTemplateCategoryBLL.GetInstance();
        ContentTemplateCategoryData categoryData = categoryBll.GetDataById(templateData.CategoryID);
        if (templateData == null)
        {
            sb.Append("找不到模板类别！");
            return;
        }

        //构建模板路径
        string path = string.Format("{0}\\{1}", categoryData.DirName, templateData.FileName);
        VelocityHelper helper = new VelocityHelper();

        //传入系统内置标签HopeTag
        HopeTag hopeTag = new HopeTag(articleData);
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
        int itemID = RequestUtil.RequestInt(Request, "ID", -1);
        if (itemID == -1)
        {
            sb.Append("ID不能为空！");

            Output();
        }
    }

    #endregion
}