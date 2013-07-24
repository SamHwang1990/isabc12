using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.Model;
using Hope.BLL;

public partial class Admin_TemplateMgr_AddTemplateCategory : BaseAdminPage
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
        ContentTemplateCategoryData data = new ContentTemplateCategoryData();

        string parentCategoryName = RequestUtil.RequestString(Request, "ParentCategoryName", string.Empty);
        string categoryName = RequestUtil.RequestString(Request, "TemplateCategoryName", string.Empty);
        string dirName = RequestUtil.RequestString(Request, "DirName", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);

        if (parentCategoryName != string.Empty)
        {
            //判断所属分类
            ContentTemplateCategoryData parentCategoryData = bll.GetDataByCategoryName(parentCategoryName);
            if (parentCategoryData == null)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "所属分类不存在！";
                return;
            }
            //类别已经存在
            if (parentCategoryData.TemplateCategoryName == categoryName)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "分类已经存在";
                return;
            }
            data.ParentID = parentCategoryData.TemplateCategoryID; 
        }
        else
        {
            data.ParentID = 0;
        }

        data.TemplateCategoryName = categoryName;
        data.DirName = dirName;
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
    protected override void ValidateInput()
    {
        string categoryName = RequestUtil.RequestString(Request, "TemplateCategoryName", string.Empty);
        if (categoryName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "分类名称不能为空";

            OutputJSonMessage();
            return;
        }


        //string parentCategoryName = RequestUtil.RequestString(Request, "ParentCategoryName", string.Empty);
        //if (parentCategoryName == string.Empty)
        //{
        //    HandlerMessage.Succeed = false;
        //    HandlerMessage.Text = "所属分类不能为空";

        //    OutputJSonMessage();
        //    return;
        //}
    }
}