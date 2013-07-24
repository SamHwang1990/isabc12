using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class User_UploadHandler : System.Web.UI.Page
{
    protected void Page_Load( object sender, EventArgs e )
    {
        if (!IsPostBack)
        {
            Process();
        }
    }

    private void Process()
    {
        HttpFileCollection files = HttpContext.Current.Request.Files;
        if (files != null)
        {
            if (files[0].ContentLength < 41943040)
            {
                string fileName = Convert.ToString(files[0].FileName);
                string filePath = Convert.ToString(Server.MapPath("~/UploadFiles/")
                        + fileName);
                string fileType = System.IO.Path.GetExtension(fileName);

                int typeIndex = fileName.IndexOf(fileType);     //文档类型索引
                string fileName2 = fileName.Substring(0, typeIndex);        //除去文档类型后的文件名
                string finalName;
                if (System.IO.File.Exists(filePath))
                {
                    files[0].SaveAs(Server.MapPath("~/UploadFiles/") + fileName2 + DateTime.Now.ToString("yyyy-MM-dd HHmmtt") + fileType);
                    finalName = fileName2;
                }
                else
                {
                    files[0].SaveAs(filePath);
                    finalName = fileName;
                }

                Response.Write("{");
                Response.Write("msg:'a',");
                Response.Write("filename:'" + finalName + "',");
                Response.Write("fileType:'" + fileType + "',");
                Response.Write("filePath:'" + Convert.ToString(Server.MapPath("~/UploadFiles/") + finalName) + "',");
                Response.Write("error:''");
                Response.Write("}");
            }
            else
            {
                Response.Write("{");
                Response.Write("msg:'" + files[0].FileName + "',");
                Response.Write("error:'Upload Failed'");
                Response.Write("}");
            }
        }
        else
        {
            Response.Write("{");
            Response.Write("msg:'No File'");
            Response.Write("error:'Upload Failed'");
            Response.Write("}");
        }
        Response.End();
    }
}