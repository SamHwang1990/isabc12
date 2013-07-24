using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Model;
using System.Collections.Generic;
using Hope.BLL;
using Newtonsoft.Json;

public partial class Admin_TemplateMgr_GetTemplateCategoryTree : BaseAdminPage
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

        sb.Append(JsonConvert.SerializeObject(childrenNodes));
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentID"></param>
    /// <returns></returns>
    private List<SysTreeNodeData> GetChildrenNode(int parentID)
    {
        ContentTemplateCategoryBLL bll = ContentTemplateCategoryBLL.GetInstance();
        List<SysTreeNodeData> nodes = new List<SysTreeNodeData>();
        List<ContentTemplateCategoryData> nodeDatas = bll.GetDatasByParentID(parentID);

        foreach (ContentTemplateCategoryData data in nodeDatas)
        {
            SysTreeNodeData node = new SysTreeNodeData();
            node.id = data.TemplateCategoryID;
            node.text = data.TemplateCategoryName;
            List<SysTreeNodeData> children = GetChildrenNode(data.TemplateCategoryID);

            node.children = children;
            nodes.Add(node);
        }

        return nodes;
    }
}