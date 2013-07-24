using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_NodeMgr_GetNodeInfo : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            BuildData();

            OutputJSonData();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void BuildData()
    {
        ContentNodeBLL bll = ContentNodeBLL.GetInstance();
        int nodeID = RequestUtil.RequestInt(Request, "NodeID", -1);
        ContentNodeData data = bll.GetDataById(nodeID);

        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "该节点不存在！";

            OutputJSonMessage();
            return;
        }

        sb.Append("{");
        sb.Append("success: true,");
        sb.Append("data: ");
        sb.Append(data.ToJSon());
        sb.Append("}");
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
            HandlerMessage.Text = "节点ID不能为空！";

            OutputJSonMessage();

            return;
        }
    }
}