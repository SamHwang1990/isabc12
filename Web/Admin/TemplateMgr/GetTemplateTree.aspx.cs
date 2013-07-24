using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Newtonsoft.Json;

public partial class Admin_TemplateMgr_GetTemplateTree : BaseAdminPage
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
        List<SysTreeNodeData> childrenNodes = GetChildrenNode(0);

        sb.Append("[");
        foreach (SysTreeNodeData nodeData in childrenNodes)
        {
            sb.Append(nodeData.ToJSon());
        }
        sb.Append("]");

    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentID"></param>
    /// <returns></returns>
    private List<SysTreeNodeData> GetChildrenNode(int parentID)
    {
        ContentTemplateCategoryBLL categoryBll = ContentTemplateCategoryBLL.GetInstance();
        ContentTemplateBLL templateBll = ContentTemplateBLL.GetInstance();
        List<SysTreeNodeData> nodes = new List<SysTreeNodeData>();
        List<ContentTemplateCategoryData> categoryDatas = categoryBll.GetDatasByParentID(parentID);

        foreach (ContentTemplateCategoryData categoryData in categoryDatas)
        {
            SysTreeNodeData categoryNode = new SysTreeNodeData();
            categoryNode.id = categoryData.TemplateCategoryID;
            categoryNode.text = categoryData.TemplateCategoryName;
            List<SysTreeNodeData> children = GetChildrenNode(categoryData.TemplateCategoryID);

            //获取该分类下的模板
            List<ContentTemplateData> templateDatas = templateBll.GetDatasByCategoryID(categoryData.TemplateCategoryID);
            foreach (ContentTemplateData templateData in templateDatas)
            {
                SysTreeNodeData templateNode = new SysTreeNodeData();
                templateNode.id = templateData.TemplateID;
                templateNode.text = templateData.TemplateName;

                children.Add(templateNode);
            }

            categoryNode.children = children;
            nodes.Add(categoryNode);
        }

        return nodes;
    }
}