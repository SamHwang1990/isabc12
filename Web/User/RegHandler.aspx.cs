using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HPCMS.Web.App_Code;
using System.Xml;
using System.Xml.Linq;
using System.Net.Mail;

using Hope.Util;
using Hope.BLL;
using Hope.Model;

public partial class User_RegHandler : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Process();
        }
    }
    protected void OutputJSonMessage( SystemMessage HandlerMessage )
    {
        Response.ContentType = "text/plain";
        Response.Write(HandlerMessage.JSon);
        Response.End();
    }
    private void Process() 
    {
        string name = RequestUtil.RequestString(Request, "Name", "");
        string gender = RequestUtil.RequestString(Request,"Gender","");
        string title = RequestUtil.RequestString(Request, "Title", "");
        string participation = RequestUtil.RequestString(Request, "Participation", "");
        int accompany = RequestUtil.RequestInt(Request, "Accompany", 0);
        string institutionName = RequestUtil.RequestString(Request, "InstitutionName", "");
        string institutionAddr = RequestUtil.RequestString(Request, "InstitutionAddr", "");
        string phone = RequestUtil.RequestString(Request, "Phone", "");
        string email = RequestUtil.RequestString(Request, "Email", "");
        string fax = RequestUtil.RequestString(Request, "Fax", "");
        DateTime ArriveDate = RequestUtil.RequestDatetime(Request, "ArriveDate", DateTime.Now);
        DateTime DepartDate = RequestUtil.RequestDatetime(Request, "DepartDate", DateTime.Now);
        string PrePlan = RequestUtil.RequestString(Request, "PrePlan", "");
        string TotalFee = RequestUtil.RequestString(Request, "TotalFee", "");
        string PaymentMode = RequestUtil.RequestString(Request, "PaymentMode", "");
        string Hotel = RequestUtil.RequestString(Request, "Hotel", "");
        string RoomType = RequestUtil.RequestString(Request, "RoomType", "");
        string UnitPrice = RequestUtil.RequestString(Request, "UnitPrice", "");
        int AvailableRoom = RequestUtil.RequestInt(Request, "AvailableRoom", 0);
        int BookingRoom = RequestUtil.RequestInt(Request, "BookingRoom", 0);
        DateTime CheckIn = RequestUtil.RequestDatetime(Request, "CheckIn", DateTime.Now);
        DateTime CheckOut = RequestUtil.RequestDatetime(Request, "CheckOut", DateTime.Now);
        string fileName = RequestUtil.RequestString(Request, "fileName", "");
        string filePath = RequestUtil.RequestString(Request, "filePath", "");
        string fileType = RequestUtil.RequestString(Request, "fileType", "");
        string fileTopic = RequestUtil.RequestString(Request, "fileTopic", "");

        SysUserBLL UserBll = SysUserBLL.GetInstance();
        SysUserData UserEntity = new SysUserData();
        SystemMessage HandlerMessage = new SystemMessage();

        //判断当前名称是否已存在
        if (UserBll.GetDataByName(name) != null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "Current user name has been existed！";
            OutputXml(HandlerMessage);
            return;
        }
        HPUHospitalInfoBLL hotelBll = HPUHospitalInfoBLL.GetInstance();
        HPUHospitalInfoData hotelData = hotelBll.GetDataByRoomType(RoomType);
        //并发检验
        if (BookingRoom>hotelData.RoomRemain)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "Sorry, room remaining is  fewer than the amount you want to book!";
            OutputXml(HandlerMessage);
            return;
        }

        UserEntity.Name = name;
        UserEntity.Gender = gender;
        UserEntity.Title = title;
        UserEntity.Participation = participation;
        UserEntity.Accompanying = accompany;
        UserEntity.InstitutionName = institutionName;
        UserEntity.InstitutionAddr = institutionAddr;
        UserEntity.Phone = phone;
        UserEntity.EMail = email;
        UserEntity.Fax = fax;
        UserEntity.ArrivalDate = ArriveDate;
        UserEntity.ArrivalDate = DepartDate;
        UserEntity.Presentation = PrePlan;
        UserEntity.TotalFee = TotalFee;
        UserEntity.PaymentMode = PaymentMode;
        UserEntity.Hotel = Hotel;
        UserEntity.RoomType = RoomType;
        UserEntity.UnitPrice = UnitPrice;
        UserEntity.AvailableRoom = AvailableRoom-BookingRoom;
        UserEntity.BookingRoom = BookingRoom;
        UserEntity.CheckIn = CheckIn;
        UserEntity.CheckOut = CheckOut;
        UserEntity.FileName = fileName;
        UserEntity.FilePath = filePath;
        UserEntity.FileType = fileType;
        UserEntity.Data = fileTopic;

        if (UserBll.Add(UserEntity))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "Register successfully!";
            //更新剩余的房间数
            hotelData.RoomRemain = hotelData.RoomRemain - BookingRoom;
            if (hotelBll.Edit(hotelData))
            {
                HandlerMessage.Succeed = true;
                //HandlerMessage.Text = "HotelInfo alter successed!";

                SysUserData entity = UserBll.GetDataByName(UserEntity.Name);

                if (SetEmail(entity))
                {
                    HandlerMessage.Succeed = true;
                    HandlerMessage.Text += "Email has send successful !";
                    OutputXml(HandlerMessage);
                }
                else
                {
                    HandlerMessage.Succeed = false;
                    HandlerMessage.Text += "Error happened! Email can't send !";
                    OutputXml(HandlerMessage);
                }
            }
            else
            {
                HandlerMessage.Succeed = false;
                HandlerMessage.Text += "HotelInfo modifying failed!";
                OutputXml(HandlerMessage);
            }
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败，未知错误！";
            OutputXml(HandlerMessage);
        }
    }

    private bool SetEmail( SysUserData user )
    {
        //根据用户输入来设置邮件正文
        StringBuilder sb = new StringBuilder();
        sb.Append("Hello <span style=\"color:#86b239;\">" + user.Name + "</span>! <br />");
        sb.Append("Your ID is <span style=\"color:#86b239;\">" + user.UserID + "</span>.<br />");
        sb.Append("The Category of Participation you chose is <span style=\"color:#86b239;\">" + user.Participation + "</span>, the number of accompanying people you chose is <span style=\"color:#86b239;\">" + user.Accompanying.ToString() + "</span>, and the total amount of registration fee is <span style=\"color:#86b239;\">" + user.TotalFee.ToString() + "</span>. <br />");
        sb.Append("Your arrival date is <span style=\"color:#86b239;\">" + user.ArrivalDate.ToString("dddd,dd MMMM,yyyy", new System.Globalization.DateTimeFormatInfo()) + "</span>, and your departure date is <span style=\"color:#86b239;\">" + user.DepartureDate.ToString("dddd,dd MMMM,yyyy", new System.Globalization.DateTimeFormatInfo()) + "</span>.<br />");
        sb.Append("Your plan for presentation is <span style=\"color:#86b239;\">" + user.Presentation + "</span>.<br />");
        sb.Append("The room type you chose is <span style=\"color:#86b239;\">" + user.Hotel + "&nbsp;" + user.RoomType + "</span>, the number of rooms you booked is <span style=\"color:#86b239;\">" + user.BookingRoom + "</span>, and the cost of per room is <span style=\"color:#86b239;\">" + user.UnitPrice + "</span>.<br />");
        sb.Append("Your checkin date is <span style=\"color:#86b239;\">" + user.CheckIn.ToString("dddd,dd MMMM,yyyy", new System.Globalization.DateTimeFormatInfo()) + "</span>, and your checkout date is <span style=\"color:#86b239;\">" + user.CheckOut.ToString("dddd,dd MMMM,yyyy", new System.Globalization.DateTimeFormatInfo()) + "</span>.<br />");
        sb.Append("The topic of your presentation is <span style=\"color:#86b239;\">" + user.Data + "</span>, and the file you suploaded is <span style=\"color:#86b239;\">" + user.FileName + "</span>.<br />");
        sb.Append("If the information you submitted(listed above) is correct, there's no need to reply this email. Please remember to pay your fees within 7 days, thank you for your participation.");

        string emailSetPath = CommonClass.GetWebFullPath() + "App_Data\\Config\\SetEmail.xml";
        XmlUtil util = new XmlUtil(emailSetPath);    //读取配置文件

        string to  = user.EMail;   //用户的邮箱
        string content = sb.ToString();     //邮件正文
        string title = util.Read("EmailConfig/EmailTitle").Trim();  //邮件标题
        string strHost = util.Read("EmailConfig/EmailHost").Trim(); //邮件smtp服务器
        string strAccount = util.Read("EmailConfig/EmailAccount").Trim();   //发送方邮箱账号
        string strPwd = util.Read("EmailConfig/EmailPwd").Trim();   //发送方邮箱密码
        string strFrom = util.Read("EmailConfig/EmailFrom").Trim(); //邮件发送方的邮箱地址

        bool emailResult = sendMail(to, title, content, strHost, strAccount, strPwd, strFrom);
        return emailResult;

    }

    /// <summary>
    /// 发送邮件
    /// </summary>
    /// <param name="to">接收方邮件地址</param>
    /// <param name="title">邮件标题</param>
    /// <param name="content">邮件正文内容</param>
    /// <returns></returns>
    /// <author>Jailu</author>
    /// <date>2007-04-10</date>
    static bool sendMail( string to, string title, string content, string strHost, string strAccount, string strPwd, string strFrom )
    {
        SmtpClient _smtpClient = new SmtpClient();
        _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
        _smtpClient.Host = strHost; ;//指定SMTP服务器
        _smtpClient.Credentials = new System.Net.NetworkCredential(strAccount, strPwd);//用户名和密码

        MailMessage _mailMessage = new MailMessage(strFrom, to);
        _mailMessage.Subject = title;//主题
        _mailMessage.Body = content;//内容
        _mailMessage.BodyEncoding = System.Text.Encoding.UTF8;//正文编码
        _mailMessage.IsBodyHtml = true;//设置为HTML格式
        _mailMessage.Priority = MailPriority.High;//优先级

        try
        {
            _smtpClient.Send(_mailMessage);
            return true;
        }
        catch
        {
            return false;
        }
    }


    #region output xml ...

    protected void OutputXml( SystemMessage HandlerMessage )
    {
        Response.ContentType = "text/xml";
        Response.Write(HandlerMessage.XmlDocument.OuterXml);
        Response.End();
    }

    #endregion
}