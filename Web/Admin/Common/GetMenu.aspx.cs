using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Newtonsoft.Json;

public partial class Admin_Common_GetMenu : BasePage
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
        //SysTreeData tree = new SysTreeData();
        //SysTreeNodeData root = new SysTreeNodeData();
        List<SysTreeNodeData> childrenNodes = GetChildrenNode(0);
        //root.Children = childrenNodes;
        //tree.Root = root;

        //sb.Append(tree.ToJSon());
        sb.Append(JsonConvert.SerializeObject(childrenNodes));
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentID"></param>
    /// <returns></returns>
    private List<SysTreeNodeData> GetChildrenNode(int parentID)
    {
        SysModuleBLL bll = SysModuleBLL.GetInstance();
        List<SysTreeNodeData> nodes = new List<SysTreeNodeData>();
        List<SysModuleData> moduleDatas = bll.GetDataByParentID(parentID);

        foreach (SysModuleData data in moduleDatas)
        {
            //检查当前用户是否拥有该节点的权限

            SysTreeNodeData node = new SysTreeNodeData();
            node.id = data.ModuleID;
            node.text = data.ModuleName;
            node.href = data.DefaultUrl;
            node.Type = "Module";
            List<SysTreeNodeData> children = GetChildrenNode(data.ModuleID);
            node.children = children;
            nodes.Add(node);
        }

        return nodes;
    }
}