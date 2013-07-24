<%@ WebHandler Language="C#" Class="Hotel" %>


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

public class Hotel : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
            string type = RequestUtil.RequestString(context.Request,"type","");
            switch (type)
            {
                case "hotel":
                     string hotelId = RequestUtil.RequestString(context.Request, "hotelId", "");
                     string responseRoomList = GetHotelRoomList(hotelId);
                     context.Response.Write(responseRoomList);
                    break;
                    
                case "room":
                    string roomType = RequestUtil.RequestString(context.Request,"roomType","");
                    string responseRoom = GetRoomPriceNum(roomType);
                    context.Response.Write(responseRoom);
                    break;
            }
            context.Response.End(); 
    }
    public string GetHotelRoomList(string hotelName)
    {
        string str = "";
        if (hotelName != "")
        {
            HPUHospitalListBLL HotelListBll = HPUHospitalListBLL.GetInstance();
            HPUHospitalListData hotelList = HotelListBll.GetDataByName(hotelName);
            
            HPUHospitalInfoBLL HotelInfoBll = HPUHospitalInfoBLL.GetInstance();

            List<HPUHospitalInfoData> HotelInfoList = HotelInfoBll.GetDatasByHotelID(hotelList.HospitalID);
            int i = 0;
            foreach (HPUHospitalInfoData hotelEntity in HotelInfoList)
            {
                if (i > 0) str += ",";
                str += hotelEntity.RoomType;
                i++;
            }
        }
        return str;    
    }

    public string GetRoomPriceNum( string roomType )
    {
        string str = "";
        if (roomType != "")
        {
            HPUHospitalInfoBLL HotelInfoBll = HPUHospitalInfoBLL.GetInstance();
            HPUHospitalInfoData HotelEntity = HotelInfoBll.GetDataByRoomType(roomType);
            str += HotelEntity.RoomPrice.ToString() + "," + HotelEntity.RoomRemain.ToString();
        }
        return str;
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}