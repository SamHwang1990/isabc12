using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_NodeMgr_EditTemplateSetting : BaseAdminPage
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

        ContentNodeBLL nodeBll = ContentNodeBLL.GetInstance();
        ContentTemplateBLL templateBll = ContentTemplateBLL.GetInstance();
        ContentNodeData data = null;

        int nodeID = RequestUtil.RequestInt(Request, "NodeID", 0);
        int modelID = RequestUtil.RequestInt(Request, "ModelID", 0);
        string indexTemplateName = RequestUtil.RequestString(Request, "IndexTemplateName", string.Empty);
        string contentTemplateName = RequestUtil.RequestString(Request, "ContentTemplateName", string.Empty);
        string searchTemplateName = RequestUtil.RequestString(Request, "SearchTemplateName", string.Empty);


        //判断当前名称是否已存在
        data = nodeBll.GetDataById(nodeID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前节点不存在！";
            return;
        }

        //首页模板
        if (indexTemplateName != string.Empty)
        {
            ContentTemplateData indexTemplateData = templateBll.GetDataByTemplateName(indexTemplateName);
            if (indexTemplateData == null)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "所选首页模板不存在";
                return;
            }
            data.IndexTemplateID = indexTemplateData.TemplateID;
        }

        //内容页模板
        if (contentTemplateName != string.Empty)
        {
            ContentTemplateData contentTemplateData = templateBll.GetDataByTemplateName(contentTemplateName);
            if (contentTemplateData == null)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "所选内容页模板不存在";
                return;
            }
            data.ContentTemplateID = contentTemplateData.TemplateID;
        }

        //搜索页模板
        if (indexTemplateName != string.Empty)
        {
            ContentTemplateData searchTemplateData = templateBll.GetDataByTemplateName(searchTemplateName);
            if (searchTemplateData == null)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "所选搜索页模板不存在";
                return;
            }
            data.SearchTemplateID = searchTemplateData.TemplateID;
        }

        data.ModelID = modelID;

        if (nodeBll.Edit(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "修改节点模板选项成功";
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