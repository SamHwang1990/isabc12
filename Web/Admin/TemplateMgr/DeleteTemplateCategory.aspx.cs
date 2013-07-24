using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_TemplateMgr_DeleteTemplateCategory : BaseAdminPage
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
        ContentTemplateCategoryBLL bll = ContentTemplateCategoryBLL.GetInstance();
        int categoryID = RequestUtil.RequestInt(Request, "TemplateCategoryID", -1);
        ContentTemplateCategoryData data = bll.GetDataById(categoryID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "所要删除的分类不存在！";
            return;
        }

        if (bll.Remove(categoryID))
        {
            //将子节点的父ID设置为上一节点的ID
            List<ContentTemplateCategoryData> childrenDatas = bll.GetDatasByParentID(categoryID);
            foreach (ContentTemplateCategoryData child in childrenDatas)
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
        int categoryID = RequestUtil.RequestInt(Request, "TemplateCategoryID", -1);
        if (categoryID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "请选择要删除的分类！";

            OutputJSonMessage();
            return;
        }
    }

}