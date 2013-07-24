using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;
using Newtonsoft.Json;

public partial class Admin_StyleMgr_GetStyleList : BaseAdminPage 
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            BuildData();

            OutputJSonData();
        }
    }

    private void BuildData()
    {
        ContentStyleBLL bll = ContentStyleBLL.GetInstance();
        int startIndex = RequestUtil.RequestInt(Request, "start", -1);
        int pageSize = RequestUtil.RequestInt(Request, "limit", -1);

        List<ContentStyleData> list = bll.GetList(startIndex, pageSize);
        int count = bll.GetCount();

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", count);

        sb.Append("data: ");
        sb.Append(JsonConvert.SerializeObject(list));
        sb.Append("}");
    }

    protected override void ValidateInput()
    {
        int startIndex = RequestUtil.RequestInt(Request, "start", -1);
        if (startIndex == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "参数错误";

            OutputJSonMessage();
            return;
        }

        int pageSize = RequestUtil.RequestInt(Request, "limit", -1);
        if (pageSize == -1)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "参数错误";

            OutputJSonMessage();
            return;
        }
    }
}