using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hope.BLL;
using Hope.Model;
using Hope.Util;

public partial class User_Reg : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //if (ValidateInput())
            //{
            //    Reg();
            //}
            

        }
    }

    //private void Reg()
    //{
    //    string Name = HttpContext.Current.Session["Name"].ToString();
    //    string title = HttpContext.Current.Session["title"].ToString();
    //    int gender = Int32.Parse(HttpContext.Current.Session["gender"].ToString());
    //    string participation = HttpContext.Current.Session["participation"].ToString();
    //    int accompanying = Int32.Parse(HttpContext.Current.Session["accompanying"].ToString());
    //    string institutionName = HttpContext.Current.Session["institutionName"].ToString();
    //    string institutionAddr = HttpContext.Current.Session["institutionAddr"].ToString();
    //    string phone = HttpContext.Current.Session["phone"].ToString();
    //    string eMail = HttpContext.Current.Session["eMail"].ToString();
    //    string fax = HttpContext.Current.Session["fax"].ToString();
    //    DateTime arrivalDate = DateTime.ParseExact(HttpContext.Current.Session["arrivalDate"].ToString(), "yyyy/M/d H:mm:ss", null);
    //    DateTime departureDate = DateTime.ParseExact(HttpContext.Current.Session["departureDate"].ToString(), "yyyy/M/d H:mm:ss", null);
    //    string presentation = HttpContext.Current.Session["presentation"].ToString();
    //    int paymentMode = Int32.Parse(HttpContext.Current.Session["paymentMode"].ToString());
    //    int totalFee = Int32.Parse(HttpContext.Current.Session["totalFee"].ToString());

    //    string hotel = RequestUtil.RequestString(Request, "Hotel", string.Empty);
    //    string roomType = RequestUtil.RequestString(Request, "RoomType", string.Empty);
    //    int price = RequestUtil.RequestInt(Request, "Price", 0);
    //    int availableRoom = RequestUtil.RequestInt(Request, "AvailableRoom", 0);
    //    int bookingRoom = RequestUtil.RequestInt(Request, "BookingRoom", 0);
    //    DateTime checkIn = RequestUtil.RequestDatetime(Request, "CheckIn", CommonClass.MinDateTime);
    //    DateTime checkOut = RequestUtil.RequestDatetime(Request, "CheckOut", CommonClass.MinDateTime);


    //    SysUserData data = new SysUserData();
    //    data.Name = Name;
    //    data.Title = title;
    //    data.Gender = gender;
    //    data.Participation = participation;
    //    data.Accompanying = accompanying;
    //    data.InstitutionName = institutionName;
    //    data.InstitutionAddr = institutionAddr;
    //    data.Phone = phone;
    //    data.EMail = eMail;
    //    data.Fax = fax;
    //    data.ArrivalDate = arrivalDate;
    //    data.DepartureDate = departureDate;
    //    data.Presentation = presentation;
    //    data.PaymentMode = paymentMode;
    //    data.TotalFee = totalFee;
    //    data.Hotel = hotel;
    //    data.RoomType = roomType;
    //    data.Price = price;
    //    data.AvailableRoom = availableRoom;
    //    data.BookingRoom = bookingRoom;
    //    data.CheckIn = checkIn;
    //    data.CheckOut = checkOut;
        

    //    SysUserBLL bll = SysUserBLL.GetInstance();
    //    if (bll.Add(data))
    //    {
    //        Response.Redirect("UserUpload.aspx");
    //        Response.End();
    //    }
    //    else
    //    {
    //        Response.Write("Registion Fail");
    //        Response.End();
    //    }
    //}

    //private bool ValidateInput()
    //{

        
    //    //int userID = RequestUtil.RequestInt( Request, "UserID", 0);
    //    string hotel = RequestUtil.RequestString( Request, "Hotel", string.Empty);
    //    if (hotel == string.Empty)
    //    {
    //        //CommonClass.RegScript(Page,"alert('Hotel can ont be null')");
    //        //Response.End();
    //        return false;
    //    }

    //    string roomType = RequestUtil.RequestString( Request, "RoomType", string.Empty);
    //    if (roomType == string.Empty)
    //    {
    //        //CommonClass.RegScript(Page, "alert('RoomType can ont be null')");
    //        //Response.End();
    //        return false;
    //    }

    //    int price = RequestUtil.RequestInt( Request, "Price", 0);
    //    int availableRoom = RequestUtil.RequestInt(Request, "AvailableRoom", 0);
    //    int bookingRoom = RequestUtil.RequestInt(Request, "BookingRoom", 0);

    //    DateTime checkIn = RequestUtil.RequestDatetime( Request, "CheckIn", CommonClass.MinDateTime);
    //    DateTime checkOut = RequestUtil.RequestDatetime( Request, "CheckOut", CommonClass.MinDateTime);
        

    //    return true;
    //}
}