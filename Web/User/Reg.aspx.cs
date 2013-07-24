using System;
using System.Collections.Generic;
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
            SetDefault();

        }
    }

    private void SetDefault()
    {
        this.SelectHotel.Items.Clear();
        this.SelectHotel.Items.Add("--Please Select Hotel--");
        this.SelectRoom.Items.Clear();
        this.SelectRoom.Items.Add("--Please Select Room--");

        HPUHospitalListBLL HotelBll = HPUHospitalListBLL.GetInstance();
        List<HPUHospitalListData> HotelList = HotelBll.GetDatas();
        foreach(HPUHospitalListData hotelEntity in HotelList)
        {
            this.SelectHotel.Items.Add(new ListItem(hotelEntity.HospitalName,hotelEntity.HospitalName.ToString()));
        }

    }

}
