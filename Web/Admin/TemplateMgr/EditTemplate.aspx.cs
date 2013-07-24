using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class Admin_TemplateMgr_EditTemplate : BaseAdminPage
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
        int templateID = RequestUtil.RequestInt(Request, "TemplateID", 0);
        string categoryName = RequestUtil.RequestString(Request, "ParentCategoryName", string.Empty);
        string templateName = RequestUtil.RequestString(Request, "TemplateName", string.Empty);
        string templateContent = RequestUtil.RequestString(Request, "TemplateContent", string.Empty);
        string fileName = RequestUtil.RequestString(Request, "FileName", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);

        ContentTemplateBLL bll = ContentTemplateBLL.GetInstance();
        ContentTemplateData data = bll.GetDataById(templateID);
        if (data == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前模板不存在！";
            return;
        }

        if (categoryName != string.Empty)
        {
            //判断类别是否存在
            ContentTemplateCategoryData categoryData = ContentTemplateCategoryBLL.GetInstance().GetDataByCategoryName(categoryName);
            if (categoryData == null)
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text = "所选分类不存在！";

                return;
            }

            data.CategoryID = categoryData.TemplateCategoryID; 
        }

        data.TemplateName = templateName;
        data.TemplateContent = templateContent;
        data.FileName = fileName;
        data.Remark = remark;

        //写入文件
        ContentTemplateCategoryData cData = ContentTemplateCategoryBLL.GetInstance().GetDataById(data.CategoryID);
        string fullFileName = string.Format("{0}{1}\\{2}", ApplicationConfig.TemplateRootDir, cData.DirName, fileName);

        if (FileUtil.WriteToFile(fullFileName, templateContent))
        {
            data.IsGenerate = true;
            if (bll.Edit(data))
            {
                HandlerMessage.Succeed = true;
                HandlerMessage.Text = "编辑成功";
            }
            else
            {
                HandlerMessage.Succeed = true;
                HandlerMessage.Text = "写入文件成功，编辑失败！";
            }

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
        string templateName = RequestUtil.RequestString(Request, "TemplateName", string.Empty);
        if (templateName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模板名称不能为空";

            OutputJSonMessage();
            return;
        }

        //string categoryName = RequestUtil.RequestString(Request, "ParentCategoryName", string.Empty);
        //if (categoryName == string.Empty)
        //{
        //    HandlerMessage.Succeed = false;
        //    HandlerMessage.Text = "模板分类不能为空";

        //    OutputJSonMessage();
        //    return;
        //}
    }
}