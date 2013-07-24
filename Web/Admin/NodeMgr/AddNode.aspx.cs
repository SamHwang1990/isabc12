using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_NodeMgr_AddNode : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            Process(RequestUtil.RequestString(Request, "ParentNodeName", string.Empty));

            OutputJSonMessage();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="parentNodeName"></param>
    private void Process(string parentNodeName)
    {
        ContentNodeBLL bll = ContentNodeBLL.GetInstance();
        ContentNodeData data = new ContentNodeData();

        string nodeName = RequestUtil.RequestString(Request, "NodeName", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);

        if (parentNodeName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "父节点不能为空";
            return;
        }

        ContentNodeData parentNodeData = bll.GetDateByName(parentNodeName);
        if (parentNodeData == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "父节点不存在";
            return;
        }

        data.NodeName = nodeName;
        data.ParentID = parentNodeData.NodeID;
        data.Remark = remark;

        if (bll.Add(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "添加成功";
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败，未知错误！";
        }
    }

    /// <summary>
    /// 验证输入信息是否合法
    /// </summary>
    /// <param name="parentNodeName"></param>
    protected override void ValidateInput()
    {
        string nodeName = RequestUtil.RequestString(Request, "NodeName", string.Empty);
        if (nodeName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "节点名称不能为空";

            OutputJSonMessage();
            return;
        }

        //string parentName = RequestUtil.RequestString(Request, "ParentNodeName", string.Empty);
        //if (parentName == string.Empty)
        //{
        //    HandlerMessage.Succeed = false;
        //    HandlerMessage.Text = "父节点不能为空！";

        //    OutputJSonMessage();
        //    return;
        //}
    }
}