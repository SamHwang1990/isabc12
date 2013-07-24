<%@ WebHandler Language="C#" Class="Export" %>

using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using System.Data;
using System.Data.SqlClient;
using Hope.Util;
using Hope.BLL;
using Hope.Model;
using Hope.DAL.DBUtil;

using org.in2bits.MyXls;
using org.in2bits.MyOle2;

public class Export : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        
        SysUserBLL userBll = SysUserBLL.GetInstance();
        string xlsName = "UserList_ISABC12";  //Excel文件名称
        string sheetName = "UserList";  //表名称
        userBll.ExportUser(xlsName, sheetName);
    }

 
    public bool IsReusable {
        get {
            return false;
        }
    }
    
    

}