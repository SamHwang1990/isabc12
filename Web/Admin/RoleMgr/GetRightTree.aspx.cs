using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_RoleMgr_GetRightTree : BaseAdminPage
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
        //获取角色ID
        int roleID = RequestUtil.RequestInt(Request, "RoleID", -1);
        if( roleID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "角色ID不能为空！";

            OutputJSonMessage();
            return;
        }

        SysTreeData tree = new SysTreeData();
        SysTreeNodeData root = new SysTreeNodeData();
        List<SysTreeNodeData> childrenNodes = GetChildrenNode(0);
        root.children = childrenNodes;
        tree.Root = root;

        sb.Append(tree.ToJSon(true));
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentID"></param>
    /// <returns></returns>
    private List<SysTreeNodeData> GetChildrenNode(int parentID)
    {
        int roleID = RequestUtil.RequestInt(Request, "RoleID", -1);
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
            if (children.Count == 0)
            {
                List<SysFunctionData> functionDatas = functionBll.GetDatasByModuleID(data.ModuleID);
                foreach (SysFunctionData fData in functionDatas)
                {
                    SysTreeNodeData fNode = new SysTreeNodeData();
                    fNode.id = fData.FunctionID;
                    fNode.text = fData.FunctionName;
                    fNode.href = fData.DefaultUrl;
                    fNode.Type = "Function";
                    //fNode.Checked = IsPermission(roleID, fData);

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