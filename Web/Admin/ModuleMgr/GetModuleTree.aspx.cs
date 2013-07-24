using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Model;
using Hope.BLL;

public partial class Admin_ModuleMgr_GetModuleTree : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
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
        SysModuleBLL moduleBll = SysModuleBLL.GetInstance();
        SysFunctionBLL functionBll = SysFunctionBLL.GetInstance();
        List<SysTreeNodeData> nodes = new List<SysTreeNodeData>();
        List<SysModuleData> moduleDatas = moduleBll.GetDataByParentID(parentID);

        foreach (SysModuleData data in moduleDatas)
        {
            SysTreeNodeData node = new SysTreeNodeData();
            node.id = data.ModuleID;
            node.text = data.ModuleName;
            node.href = data.DefaultUrl;
            node.Type = "Module";
            List<SysTreeNodeData> children = GetChildrenNode(data.ModuleID);

            //如果是叶节点
            if(children.Count == 0)
            {
                List<SysFunctionData> functionDatas = functionBll.GetDatasByModuleID(data.ModuleID);
                foreach (SysFunctionData fData in functionDatas)
                {
                    SysTreeNodeData fNode = new SysTreeNodeData();
                    fNode.id = -fData.FunctionID;
                    fNode.text = fData.FunctionName;
                    fNode.href = fData.DefaultUrl;
                    fNode.Type = "Function";
                    fNode.children = new List<SysTreeNodeData>();

                    children.Add(fNode);
                }
            }

            node.children = children;
            nodes.Add(node);
        }

        return nodes;
    }

}