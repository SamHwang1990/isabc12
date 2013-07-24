using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;

public partial class Admin_AdminMgr_GetAdminList : BaseAdminPage
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
        SysAdminBLL bll = SysAdminBLL.GetInstance();
        List<SysAdminData> list = bll.GetDatas();

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", list.Count);

        sb.Append("root: [");
        foreach (SysAdminData data in list)
        {
            sb.Append(data.ToJSon());
            sb.Append(",");
        }
        sb.Append("]}");
    }
}