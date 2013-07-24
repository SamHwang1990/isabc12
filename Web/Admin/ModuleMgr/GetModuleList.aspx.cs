using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;

public partial class Admin_ModuleMgr_GetModuleList : BaseAdminPage
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
        SysModuleBLL bll = SysModuleBLL.GetInstance();
        List<SysModuleData> moduleDatas = bll.GetDatas();

        sb.Append("{");
        sb.AppendFormat("totalPorperty: {0},", moduleDatas.Count);

        sb.Append("root: [");
        foreach (SysModuleData data in moduleDatas)
        {
            sb.Append(data.ToJSon());
            sb.Append(",");
        }
        sb.Append("]}");
    }
}