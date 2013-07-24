using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

/// <summary>
/// 编辑节点基本信息
/// </summary>
public partial class Admin_NodeMgr_EditBasic : BaseAdminPage
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

        int nodeID = RequestUtil.RequestInt(Request, "NodeID", -1);
        string parentNodeName = RequestUtil.RequestString(Request, "ParentNodeName", string.Empty);
        string nodeName = RequestUtil.RequestString(Request, "NodeName", string.Empty);
        string nodeEnName = RequestUtil.RequestString(Request, "NodeEnName", string.Empty);
        string dirName = RequestUtil.RequestString(Request, "DirName", string.Empty);        
        string meta = RequestUtil.RequestString(Request, "Meta", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);



        //判断当前名称是否已存在
        data = bll.GetDataById(nodeID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前节点不存在！";
            return;
        }

        if (parentNodeName != string.Empty)
        {
            //判断父节点是否存在
            ContentNodeData parentNodeData = bll.GetDateByName(parentNodeName);
            if (parentNodeData == null)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "父节点不存在";
                return;
            }

            //判断父节点是否为自己，如果是，则返回
            if (parentNodeData.NodeID == data.NodeID)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "不允许将父节点设为自己";
                return;
            }
            data.ParentID = parentNodeData.NodeID; 
        }

        data.NodeName = nodeName;
        data.NodeEnName = nodeEnName;
        data.DirName = dirName;
        data.Meta = meta;
        data.Remark = remark;


        if (bll.Edit(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "修改基本信息成功";
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