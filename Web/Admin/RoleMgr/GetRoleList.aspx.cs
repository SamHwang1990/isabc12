using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;

public partial class Admin_RoleMgr_GetRoleList : BaseAdminPage
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
        SysRoleBLL bll = SysRoleBLL.GetInstance();
        List<SysRoleData> list = bll.GetDatas();

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", list.Count);

        sb.Append("root: [");
        foreach (SysRoleData data in list)
        {
            sb.Append(data.ToJSon());
            sb.Append(",");
        }
        sb.Append("]}");
    }
}