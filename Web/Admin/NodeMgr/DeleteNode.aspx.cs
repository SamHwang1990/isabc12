using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_NodeMgr_DeleteNode : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            Process();

            OutputJSonMessage();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void Process()
    {
        ContentNodeBLL bll = ContentNodeBLL.GetInstance();
        int nodeID = RequestUtil.RequestInt(Request, "NodeID", -1);
        ContentNodeData data = bll.GetDataById(nodeID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "所要删除的节点不存在！";
            return;
        }

        if (bll.Remove(nodeID))
        {
            //将子节点的父ID设置为上一节点的ID
            List<ContentNodeData> childrenDatas = bll.GetDatasByParentID(nodeID);
            foreach (ContentNodeData child in childrenDatas)
            {
                child.ParentID = data.ParentID;
                bll.Edit(child);
            }

            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "删除成功！";
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "删除失败，原因不详！";
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentNodeName"></param>
    protected override void ValidateInput()
    {
        int nodeID = RequestUtil.RequestInt(Request, "NodeID", -1);
        if (nodeID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "请选择要删除的节点！";

            OutputJSonMessage();
            return;
        }
        else if (nodeID == 1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "不能删除根节点！";

            OutputJSonMessage();
            return;
        }
    }

}