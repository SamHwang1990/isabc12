using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_NodeMgr_EditSetting : BaseAdminPage
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
        ContentNodeData data = null;

        int nodeID = RequestUtil.RequestInt(Request, "NodeID", 0);
        bool openType = RequestUtil.RequestBoolean(Request, "OpenType", false);
        int pageSize = RequestUtil.RequestInt(Request, "PageSize", 0);


        //判断当前名称是否已存在
        data = bll.GetDataById(nodeID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前节点不存在！";
            return;
        }


        data.OpenType = openType;
        data.PageSize = pageSize;


        if (bll.Edit(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "修改节点选项成功";
            return;
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "修改失败，未知错误！";
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
            HandlerMessage.Text = "节点ID不能为空！";

            OutputJSonMessage();
            return;
        }
        
        int pageSize = RequestUtil.RequestInt(Request, "PageSize", -1);
        if (pageSize < 0)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "每页显示数不合法！";

            OutputJSonMessage();
            return;
        }
    }
}