using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.Model;
using Hope.BLL;

public partial class Admin_ModelMgr_AddModel : BaseAdminPage
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

        ContentModelBLL bll = ContentModelBLL.GetInstance();
        ContentModelData data = new ContentModelData();

        string modelName = RequestUtil.RequestString(Request, "ModelName", string.Empty);
        string tableName = RequestUtil.RequestString(Request, "TableName", string.Empty);
        string itemName = RequestUtil.RequestString(Request, "ItemName", string.Empty);
        string itemUnit = RequestUtil.RequestString(Request, "ItemUnit", string.Empty);
        string remark = RequestUtil.RequestString(Request, "Remark", string.Empty);


        //判断当前名称是否已存在
        if (bll.GetDataByName(modelName) != null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "当前模型已经存在！";
            return;
        }

        data.ModelName = modelName;
        data.TableName = tableName;
        data.ItemName = itemName;
        data.ItemUnit = itemUnit;
        data.Remark = remark;

        if (CreateTable(tableName))
        {
            if (bll.Add(data))
            {
                HandlerMessage.Succeed = true;
                HandlerMessage.Text = "添加成功";
                return;
            }
            else
            {
                HandlerMessage.Succeed = true;
                HandlerMessage.Text = "添加表成功，添加记录失败！";
                return;
            }
        }        
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败，未知错误！";
        }

    }

    /// <summary>
    /// 创建表
    /// </summary>
    /// <param name="tableName"></param>
    /// <returns></returns>
    private bool CreateTable(string tableName)
    {
        return true;
    }


    /// <summary>
    /// 验证输入信息是否合法
    /// </summary>
    /// <param name="parentNodeName"></param>
    protected override void ValidateInput()
    {
        string modelName = RequestUtil.RequestString(Request, "ModelName", string.Empty);
        if (modelName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "模型名称不能为空";

            OutputJSonMessage();
            return;
        }

        string tableName = RequestUtil.RequestString(Request, "TableName", string.Empty);
        if (tableName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "表名称不能为空";

            OutputJSonMessage();
            return;
        }

        string itemName = RequestUtil.RequestString(Request, "ItemName", string.Empty);
        if (itemName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "项目名称不能为空";

            OutputJSonMessage();
            return;
        }

        string itemUnit = RequestUtil.RequestString(Request, "ItemUnit", string.Empty);
        if (itemUnit == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "单位不能为空";

            OutputJSonMessage();
            return;
        }
    }
}