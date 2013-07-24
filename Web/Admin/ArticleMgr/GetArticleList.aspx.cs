using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;

public partial class Admin_ArticleMgr_GetArticleList : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //ValidateInput();

            BuildData();

            OutputJSonData();
        }
    }

    private void BuildData()
    {
        ContentNodeBLL nodeBll = ContentNodeBLL.GetInstance();
        ContentArticleBLL articleBll = ContentArticleBLL.GetInstance();
        List<ContentArticleData> list = null;
        int nodeID = RequestUtil.RequestInt(Request, "NodeID", -1);

        if (nodeBll.GetDataById(nodeID) != null)
        {
            list = articleBll.GetDatasByNodeID(nodeID);
        }
        else
        {
            list = articleBll.GetDatas();
        }

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", list.Count);

        sb.Append("root: [");
        foreach (ContentArticleData data in list)
        {
            sb.Append(data.ToJSon());
            sb.Append(",");
        }
        sb.Append("]}");
    }
}