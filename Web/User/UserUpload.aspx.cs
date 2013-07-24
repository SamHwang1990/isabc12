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

public partial class UploadFiles_UserUpload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            SetDefault();
        }
    }

    private void SetDefault()
    {
        lblUploadResult.Text = "";
    }
    protected void btnSubmit_Click( object sender, EventArgs e )
    {
        string fileName=Convert.ToString(FileUpload1.FileName);
        string filePath = Convert.ToString(Server.MapPath("~/UploadFiles/")
                        + FileUpload1.FileName);
        string fileSummary = "";
        string fileType = System.IO.Path.GetExtension(FileUpload1.FileName);
        int userID = 5;   //设置默认userID

        int typeIndex = fileName.IndexOf(fileType);     //文档类型索引
        string fileName2 = fileName.Substring(0, typeIndex);        //除去文档类型后的文件名

        HPUUploadBLL bll = HPUUploadBLL.GetInstance();
        HPUUploadData data = new HPUUploadData();

        if (FileUpload1.HasFile)
        {
            //判断文件是否小于10Mb  
            if (FileUpload1.PostedFile.ContentLength < 41943040)
            {
                try
                {
                    if (System.IO.File.Exists(Server.MapPath("~/UploadFiles/")
                           + FileUpload1.FileName))
                    {
                        FileUpload1.SaveAs(Server.MapPath("~/UploadFiles/") + fileName2 + DateTime.Now.ToString("yyyy-MM-dd HHmmtt") + fileType);
                    }
                    else
                    {
                        FileUpload1.PostedFile.SaveAs(Server.MapPath("~/UploadFiles/")
                           + FileUpload1.FileName);
                    }
                    data.FileName = fileName;
                    data.FilePath = filePath;
                    data.FileType = fileType;
                    data.Summary = fileSummary;
                    data.UserID = userID;


                    if (bll.Add(data))
                    {
                        lblUploadResult.Text = "Upload Successfully!";
                    }
                    else
                    {
                        lblUploadResult.Text = "Upload Failed!";
                    }
                }
                catch (Exception ex)
                {
                    lblUploadResult.Text = "Throw Exception, Upload failed! Please Try Again!";
                    //lblMessage.Text += ex.Message;  
                }

            }
            else
            {
                lblUploadResult.Text = "The maximun size of single file is 40MB!";
            }
        }
        else
        {
            lblUploadResult.Text = "Please Select a file!";
        }  
    }
}