using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;

public partial class Admin_UserMgr_GetUserList : BaseAdminPage
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
        SysUserBLL bll = SysUserBLL.GetInstance();
        List<SysUserData> list = bll.GetDatas();

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", list.Count);

        sb.Append("root: [");
        foreach (SysUserData data in list)
        {
            sb.Append(data.ToJSon());
            sb.Append(",");
        }
        sb.Append("]}");
    }
}