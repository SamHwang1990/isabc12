using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;

public partial class Admin_ModelMgr_DeleteModel : BaseAdminPage
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
        string ids = RequestUtil.RequestString(Request, "IDs", string.Empty);
        List<int> idList = ConvertHelper.ToIntList(ids);

        //防止删除模型Hope_U_Article
        if (idList.Contains(1))
        {
            idList.Remove(1);
        }

        if (bll.Remove(idList))
        {
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
        string ids = RequestUtil.RequestString(Request, "IDs", string.Empty);
        if (ids == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "请选择要删除的模型！";

            OutputJSonMessage();
            return;
        }
    }
}