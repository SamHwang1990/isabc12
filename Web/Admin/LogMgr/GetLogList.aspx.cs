using System;
using System.Collections.Generic;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;
using Newtonsoft.Json;

public partial class Admin_LogMgr_GetLogList : BaseAdminPage
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

    /// <summary>
    /// 
    /// </summary>
    private void BuildData()
    {
        SysLogBLL bll = SysLogBLL.GetInstance();
        int startIndex = RequestUtil.RequestInt(Request, "start", 0);
        int pageSize = RequestUtil.RequestInt(Request, "limit", 15);

        List<SysLogData> list = bll.GetList(startIndex, pageSize);
        int count = bll.GetCount();

        sb.Append("{");
        sb.AppendFormat("\"totalPorperty\": {0}, ", count);
        sb.Append("\"success\":\"true\", ");
        sb.AppendFormat("data:{0}", JsonConvert.SerializeObject(list));
        sb.Append("}");
    }

    /// <summary>
    /// 
    /// </summary>
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