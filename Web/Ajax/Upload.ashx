<%@ WebHandler Language="C#" Class="Upload" %>

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

public class Upload : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        HttpFileCollection files = context.Request.Files;
        if (files[0] != null)
        {
            if (files[0].ContentLength < 41943040)
            {
                string fileName =Convert.ToString( files[0].FileName);
               // string filePath = Convert.ToString(System.Web.UI.Page.Server.MapPath("~/UploadFiles/")
              //          + fileName);
            }
            else
            {
                context.Response.Write("{");
                context.Response.Write("msg:’" + files[0].FileName + "‘,");
                context.Response.Write("error:’Upload Failed’");
                context.Response.Write("}");
            }
        }
        else
        {
            context.Response.Write("{");
            context.Response.Write("msg:'No File'");
            context.Response.Write("error:’Upload Failed’");
            context.Response.Write("}");
        }
        context.Response.End();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}