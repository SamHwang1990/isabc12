using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;

public partial class Admin_NodeMgr_GetNodeList : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BuildData();

            OutputJSonData();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void BuildData()
    {
        ContentNodeBLL bll = ContentNodeBLL.GetInstance();
        List<ContentNodeData> nodeDatas = bll.GetDatas();

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", nodeDatas.Count);

        sb.Append("root: [");
        foreach (ContentNodeData data in nodeDatas)
        {
            sb.Append(data.ToJSon());
            sb.Append(",");
        }
        sb.Append("]}");
    }
}