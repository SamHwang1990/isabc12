using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_TemplateMgr_EditTemplateCategory : BaseAdminPage
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
        ContentTemplateCategoryData data = null;

        int templateCategoryID = RequestUtil.RequestInt(Request, "TemplateCategoryID", 0);
        int parentID = RequestUtil.RequestInt(Request, "ParentID", 0);
        string dirName = RequestUtil.RequestString(Request, "DirName", string.Empty);
        string templateCategoryName = RequestUtil.RequestString(Request, "TemplateCategoryName", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);



        //判断当前名称是否已存在
        data = bll.GetDataById(templateCategoryID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前节点不存在！";
            return;
        }

        //判断父节点是否为自己，如果是，则返回
        if (parentID == templateCategoryID)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "不允许此操作";
            return;
        }

        data.ParentID = parentID;
        data.TemplateCategoryName = templateCategoryName;
        //data.DirName = dirName;
        data.Remark = remark;


        if (bll.Edit(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "修改成功";
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
        string templateCategoryName = RequestUtil.RequestString(Request, "TemplateCategoryName", string.Empty);
        if (templateCategoryName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "分类名称不能为空";

            OutputJSonMessage();
            return;
        }

        int templateCategoryID = RequestUtil.RequestInt(Request, "TemplateCategoryID", 0);
        if (templateCategoryID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "分类ID不能为空！";

            OutputJSonMessage();
            return;
        }

        /*int parentID = RequestUtil.RequestInt(Request, "ParentID", -1);
        if (parentID == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "父分类ID不能为空！";

            OutputJSonMessage();
            return;
        }*/
    }
}