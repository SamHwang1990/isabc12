using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.TemplateUtil;
using Hope.Util;
using Hope.Model;
using Hope.BLL;

public partial class Admin_TemplateMgr_AddTemplate : BaseAdminPage
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
        ContentTemplateBLL bll = ContentTemplateBLL.GetInstance();
        ContentTemplateData data = new ContentTemplateData();

        string categoryName = RequestUtil.RequestString(Request, "CategoryName", string.Empty);
        string templateName = RequestUtil.RequestString(Request, "TemplateName", string.Empty);
        string templateContent = RequestUtil.RequestString(Request, "TemplateContent", string.Empty);
        string fileName = RequestUtil.RequestString(Request, "FileName", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);

        //判断类别是否存在
        ContentTemplateCategoryData categoryData =
            ContentTemplateCategoryBLL.GetInstance().GetDataByCategoryName(categoryName);
        if (categoryData == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败，所选分类不存在！";

            return;
        }

        data.CategoryID = categoryData.TemplateCategoryID;
        data.TemplateName = templateName;
        data.TemplateContent = templateContent;
        data.FileName = fileName;
        data.Remark = remark;
        
        //写入文件
        string fullFileName = TemplateHelper.GetInstance().GetTemplateCategoryFullDirName(data);

        if (FileUtil.WriteToFile(fullFileName, templateContent))
        {
            data.IsGenerate = true;
            if (bll.Add(data))
            {
                HandlerMessage.Succeed = true;
                HandlerMessage.Text = "添加成功";
            }
            else
            {
                HandlerMessage.Succeed = true;
                HandlerMessage.Text = "写入文件成功，添加失败！";
            }
            
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
        string templateName = RequestUtil.RequestString(Request, "TemplateName", string.Empty);
        if (templateName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模板名称不能为空";

            OutputJSonMessage();
            return;
        }

        string categoryName = RequestUtil.RequestString(Request, "CategoryName", string.Empty);
        if (categoryName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模板分类不能为空";

            OutputJSonMessage();
            return;
        }

        string templatePath = RequestUtil.RequestString(Request, "FileName", string.Empty);
        if (templatePath == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "文件名称不能为空";

            OutputJSonMessage();
            return;
        }
    }

    
}