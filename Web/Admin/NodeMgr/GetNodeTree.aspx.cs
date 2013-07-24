using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Model;
using Hope.BLL;

public partial class Admin_NodeMgr_GetNodeTree : BaseAdminPage
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
        SysTreeData tree = new SysTreeData();
        SysTreeNodeData root = new SysTreeNodeData();
        List<SysTreeNodeData> childrenNodes = GetChildrenNode(0);
        root.children = childrenNodes;
        tree.Root = root;

        sb.Append(tree.ToJSon());
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentID"></param>
    /// <returns></returns>
    private List<SysTreeNodeData> GetChildrenNode(int parentID)
    {
        ContentNodeBLL nodeBll = ContentNodeBLL.GetInstance();
        List<SysTreeNodeData> nodes = new List<SysTreeNodeData>();
        List<ContentNodeData> nodeDatas = nodeBll.GetDatasByParentID(parentID);

        foreach (ContentNodeData data in nodeDatas)
        {
            SysTreeNodeData node = new SysTreeNodeData();
            node.id = data.NodeID;
            node.text = data.NodeName;
            List<SysTreeNodeData> children = GetChildrenNode(data.NodeID);

            node.children = children;
            nodes.Add(node);
        }

        return nodes;
    }
}