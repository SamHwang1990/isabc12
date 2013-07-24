/******************************************************************
 * 日　　期：2013年05月12日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：SysUser
 * 功能描述：
 * 
******************************************************************/


using System;
using System.Data;
using System.Xml;
using System.Text;

using Hope.Enums;
using Hope.Util;
using Newtonsoft.Json;

namespace Hope.Model
{
    /// <summary>
    /// DataEntity  SysUser
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class SysUserData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public SysUserData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _UserID;
		/// <summary>
		/// UserID
		/// </summary>
		public int UserID
		{
			set{_UserID = value;}
			get{return _UserID;}
		}
		
				private string _Name;
		/// <summary>
		/// Name
		/// </summary>
		public string Name
		{
			set{_Name = value;}
			get{return _Name;}
		}
		
				private string _Gender;
		/// <summary>
		/// Gender
		/// </summary>
		public string Gender
		{
			set{_Gender = value;}
			get{return _Gender;}
		}
		
				private string _Title;
		/// <summary>
		/// Title
		/// </summary>
		public string Title
		{
			set{_Title = value;}
			get{return _Title;}
		}
		
				private string _Participation;
		/// <summary>
		/// Participation
		/// </summary>
		public string Participation
		{
			set{_Participation = value;}
			get{return _Participation;}
		}
		
				private int _Accompanying;
		/// <summary>
		/// Accompanying
		/// </summary>
		public int Accompanying
		{
			set{_Accompanying = value;}
			get{return _Accompanying;}
		}
		
				private string _InstitutionName;
		/// <summary>
		/// InstitutionName
		/// </summary>
		public string InstitutionName
		{
			set{_InstitutionName = value;}
			get{return _InstitutionName;}
		}
		
				private string _InstitutionAddr;
		/// <summary>
		/// InstitutionAddr
		/// </summary>
		public string InstitutionAddr
		{
			set{_InstitutionAddr = value;}
			get{return _InstitutionAddr;}
		}
		
				private string _Phone;
		/// <summary>
		/// Phone
		/// </summary>
		public string Phone
		{
			set{_Phone = value;}
			get{return _Phone;}
		}
		
				private string _EMail;
		/// <summary>
		/// EMail
		/// </summary>
		public string EMail
		{
			set{_EMail = value;}
			get{return _EMail;}
		}
		
				private string _Fax;
		/// <summary>
		/// Fax
		/// </summary>
		public string Fax
		{
			set{_Fax = value;}
			get{return _Fax;}
		}
		
				private DateTime _ArrivalDate;
		/// <summary>
		/// ArrivalDateTime
		/// </summary>
		public DateTime ArrivalDate
		{
			set{_ArrivalDate = value;}
			get{return _ArrivalDate;}
		}
		
				private DateTime _DepartureDate;
		/// <summary>
		/// DepartureDateTime
		/// </summary>
		public DateTime DepartureDate
		{
			set{_DepartureDate = value;}
			get{return _DepartureDate;}
		}
		
				private string _Presentation;
		/// <summary>
		/// Presentation
		/// </summary>
		public string Presentation
		{
			set{_Presentation = value;}
			get{return _Presentation;}
		}
		
				private string _TotalFee;
		/// <summary>
		/// TotalFee
		/// </summary>
		public string TotalFee
		{
			set{_TotalFee = value;}
			get{return _TotalFee;}
		}
		
				private string _PaymentMode;
		/// <summary>
		/// PaymentMode
		/// </summary>
		public string PaymentMode
		{
			set{_PaymentMode = value;}
			get{return _PaymentMode;}
		}
		
				private string _BankCard;
		/// <summary>
		/// BankCard
		/// </summary>
		public string BankCard
		{
			set{_BankCard = value;}
			get{return _BankCard;}
		}
		
				private string _BankCard2;
		/// <summary>
		/// BankCard2
		/// </summary>
		public string BankCard2
		{
			set{_BankCard2 = value;}
			get{return _BankCard2;}
		}
		
				private string _BankCard3;
		/// <summary>
		/// BankCard3
		/// </summary>
		public string BankCard3
		{
			set{_BankCard3 = value;}
			get{return _BankCard3;}
		}
		
				private string _Hotel;
		/// <summary>
		/// Hotel
		/// </summary>
		public string Hotel
		{
			set{_Hotel = value;}
			get{return _Hotel;}
		}
		
				private string _RoomType;
		/// <summary>
		/// RoomType
		/// </summary>
		public string RoomType
		{
			set{_RoomType = value;}
			get{return _RoomType;}
		}
		
				private string _UnitPrice;
		/// <summary>
		/// UnitPrice
		/// </summary>
		public string UnitPrice
		{
			set{_UnitPrice = value;}
			get{return _UnitPrice;}
		}
		
				private int _AvailableRoom;
		/// <summary>
		/// AvailableRoom
		/// </summary>
		public int AvailableRoom
		{
			set{_AvailableRoom = value;}
			get{return _AvailableRoom;}
		}
		
				private int _BookingRoom;
		/// <summary>
		/// BookingRoom
		/// </summary>
		public int BookingRoom
		{
			set{_BookingRoom = value;}
			get{return _BookingRoom;}
		}
		
				private DateTime _CheckIn;
		/// <summary>
		/// CheckIn
		/// </summary>
		public DateTime CheckIn
		{
			set{_CheckIn = value;}
			get{return _CheckIn;}
		}
		
				private DateTime _CheckOut;
		/// <summary>
		/// CheckOut
		/// </summary>
		public DateTime CheckOut
		{
			set{_CheckOut = value;}
			get{return _CheckOut;}
		}
		
				private string _FileName;
		/// <summary>
		/// FileName
		/// </summary>
		public string FileName
		{
			set{_FileName = value;}
			get{return _FileName;}
		}
		
				private string _FilePath;
		/// <summary>
		/// FilePath
		/// </summary>
		public string FilePath
		{
			set{_FilePath = value;}
			get{return _FilePath;}
		}
		
				private string _FileType;
		/// <summary>
		/// FileType
		/// </summary>
		public string FileType
		{
			set{_FileType = value;}
			get{return _FileType;}
		}
		
				private string _Data;
		/// <summary>
		/// Data
		/// </summary>
		public string Data
		{
			set{_Data = value;}
			get{return _Data;}
		}
		
				#endregion
	
		public string ToJSon()
		{
			return JsonConvert.SerializeObject(this);
		}
		
		
		
		/// <summary>
        /// 加载数据
        /// </summary>
        /// <param name="dr">数据库记录</param>
        public void LoadData(IDataRecord dr)
        {
			            _UserID = (int) dr["UserID"];
			            _Name = (string) dr["Name"];
			            _Gender = (string) dr["Gender"];
			            _Title = (string) dr["Title"];
			            _Participation = (string) dr["Participation"];
			            _Accompanying = (int) dr["Accompanying"];
			            _InstitutionName = (string) dr["InstitutionName"];
			            _InstitutionAddr = (string) dr["InstitutionAddr"];
			            _Phone = (string) dr["Phone"];
			            _EMail = (string) dr["EMail"];
			            _Fax = (string) dr["Fax"];
			            _ArrivalDate = (DateTime) dr["ArrivalDateTime"];
			            _DepartureDate = (DateTime) dr["DepartureDateTime"];
			            _Presentation = (string) dr["Presentation"];
			            _TotalFee = (string) dr["TotalFee"];
			            _PaymentMode = (string) dr["PaymentMode"];
			            _BankCard = (string) dr["BankCard"];
			            _BankCard2 = (string) dr["BankCard2"];
			            _BankCard3 = (string) dr["BankCard3"];
			            _Hotel = (string) dr["Hotel"];
			            _RoomType = (string) dr["RoomType"];
			            _UnitPrice = (string) dr["UnitPrice"];
			            _AvailableRoom = (int) dr["AvailableRoom"];
			            _BookingRoom = (int) dr["BookingRoom"];
			            _CheckIn = (DateTime) dr["CheckIn"];
			            _CheckOut = (DateTime) dr["CheckOut"];
			            _FileName = (string) dr["FileName"];
			            _FilePath = (string) dr["FilePath"];
			            _FileType = (string) dr["FileType"];
			            _Data = (string) dr["Data"];
			        }
		
		/// <summary>
        /// 转换为XML节点
        /// </summary>
        /// <param name="parentDoc">父XML文档</param>
        /// <returns>返回XML文档节点</returns>
        public XmlNode ToXmlNode(XmlDocument parentDoc)
        {
            return ToXmlNode(parentDoc,"Item");
        }
        
        /// <summary>
        /// 转换为XML节点
        /// </summary>
        /// <param name="parentDoc">父XML文档</param>
        /// <param name="nodeName">节点名</param>
        /// <returns>返回XML文档节点</returns>
        public XmlNode ToXmlNode(XmlDocument parentDoc,string nodeName)
        {
            XmlDocument xmlDoc = parentDoc;
            if(xmlDoc == null)
            {
                xmlDoc = CommonClass.CreateXmlDoc();
            }
            XmlNode xn = parentDoc.CreateNode("element", nodeName, "");
            XmlElement xe;
			            xe = xmlDoc.CreateElement("UserID");
            xe.InnerText = ConvertHelper.ToString(_UserID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Name");
            xe.InnerText = ConvertHelper.ToString(_Name);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Gender");
            xe.InnerText = ConvertHelper.ToString(_Gender);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Title");
            xe.InnerText = ConvertHelper.ToString(_Title);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Participation");
            xe.InnerText = ConvertHelper.ToString(_Participation);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Accompanying");
            xe.InnerText = ConvertHelper.ToString(_Accompanying);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("InstitutionName");
            xe.InnerText = ConvertHelper.ToString(_InstitutionName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("InstitutionAddr");
            xe.InnerText = ConvertHelper.ToString(_InstitutionAddr);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Phone");
            xe.InnerText = ConvertHelper.ToString(_Phone);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("EMail");
            xe.InnerText = ConvertHelper.ToString(_EMail);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Fax");
            xe.InnerText = ConvertHelper.ToString(_Fax);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ArrivalDateTime");
            xe.InnerText = ConvertHelper.ToString(_ArrivalDate);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("DepartureDateTime");
            xe.InnerText = ConvertHelper.ToString(_DepartureDate);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Presentation");
            xe.InnerText = ConvertHelper.ToString(_Presentation);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("TotalFee");
            xe.InnerText = ConvertHelper.ToString(_TotalFee);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("PaymentMode");
            xe.InnerText = ConvertHelper.ToString(_PaymentMode);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("BankCard");
            xe.InnerText = ConvertHelper.ToString(_BankCard);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("BankCard2");
            xe.InnerText = ConvertHelper.ToString(_BankCard2);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("BankCard3");
            xe.InnerText = ConvertHelper.ToString(_BankCard3);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Hotel");
            xe.InnerText = ConvertHelper.ToString(_Hotel);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("RoomType");
            xe.InnerText = ConvertHelper.ToString(_RoomType);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("UnitPrice");
            xe.InnerText = ConvertHelper.ToString(_UnitPrice);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("AvailableRoom");
            xe.InnerText = ConvertHelper.ToString(_AvailableRoom);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("BookingRoom");
            xe.InnerText = ConvertHelper.ToString(_BookingRoom);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("CheckIn");
            xe.InnerText = ConvertHelper.ToString(_CheckIn);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("CheckOut");
            xe.InnerText = ConvertHelper.ToString(_CheckOut);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FileName");
            xe.InnerText = ConvertHelper.ToString(_FileName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FilePath");
            xe.InnerText = ConvertHelper.ToString(_FilePath);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FileType");
            xe.InnerText = ConvertHelper.ToString(_FileType);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Data");
            xe.InnerText = ConvertHelper.ToString(_Data);
            xn.AppendChild(xe);
			            
            return xn;
        }
		
		/// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
						_UserID = 0;
						_Name = string.Empty;
						_Gender = string.Empty;
						_Title = string.Empty;
						_Participation = string.Empty;
						_Accompanying = 0;
						_InstitutionName = string.Empty;
						_InstitutionAddr = string.Empty;
						_Phone = string.Empty;
						_EMail = string.Empty;
						_Fax = string.Empty;
						_ArrivalDate = DateTime.Now;
						_DepartureDate = DateTime.Now;
						_Presentation = string.Empty;
						_TotalFee = string.Empty;
						_PaymentMode = string.Empty;
						_BankCard = string.Empty;
						_BankCard2 = string.Empty;
						_BankCard3 = string.Empty;
						_Hotel = string.Empty;
						_RoomType = string.Empty;
						_UnitPrice = string.Empty;
						_AvailableRoom = 0;
						_BookingRoom = 0;
						_CheckIn = ConvertHelper.MinDateTime;
						_CheckOut = ConvertHelper.MinDateTime;
						_FileName = string.Empty;
						_FilePath = string.Empty;
						_FileType = string.Empty;
						_Data = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            UserID,
			            Name,
			            Gender,
			            Title,
			            Participation,
			            Accompanying,
			            InstitutionName,
			            InstitutionAddr,
			            Phone,
			            EMail,
			            Fax,
			            ArrivalDateTime,
			            DepartureDateTime,
			            Presentation,
			            TotalFee,
			            PaymentMode,
			            BankCard,
			            BankCard2,
			            BankCard3,
			            Hotel,
			            RoomType,
			            UnitPrice,
			            AvailableRoom,
			            BookingRoom,
			            CheckIn,
			            CheckOut,
			            FileName,
			            FilePath,
			            FileType,
			            Data,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(SysUserData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.UserID = UserID == data.UserID;
						same.Name = Name == data.Name;
						same.Gender = Gender == data.Gender;
						same.Title = Title == data.Title;
						same.Participation = Participation == data.Participation;
						same.Accompanying = Accompanying == data.Accompanying;
						same.InstitutionName = InstitutionName == data.InstitutionName;
						same.InstitutionAddr = InstitutionAddr == data.InstitutionAddr;
						same.Phone = Phone == data.Phone;
						same.EMail = EMail == data.EMail;
						same.Fax = Fax == data.Fax;
						same.ArrivalDateTime = ArrivalDate == data.ArrivalDate;
						same.DepartureDateTime = DepartureDate == data.DepartureDate;
						same.Presentation = Presentation == data.Presentation;
						same.TotalFee = TotalFee == data.TotalFee;
						same.PaymentMode = PaymentMode == data.PaymentMode;
						same.BankCard = BankCard == data.BankCard;
						same.BankCard2 = BankCard2 == data.BankCard2;
						same.BankCard3 = BankCard3 == data.BankCard3;
						same.Hotel = Hotel == data.Hotel;
						same.RoomType = RoomType == data.RoomType;
						same.UnitPrice = UnitPrice == data.UnitPrice;
						same.AvailableRoom = AvailableRoom == data.AvailableRoom;
						same.BookingRoom = BookingRoom == data.BookingRoom;
						same.CheckIn = CheckIn == data.CheckIn;
						same.CheckOut = CheckOut == data.CheckOut;
						same.FileName = FileName == data.FileName;
						same.FilePath = FilePath == data.FilePath;
						same.FileType = FileType == data.FileType;
						same.Data = Data == data.Data;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _UserID = false;
			/// <summary>
			/// UserID
			/// </summary>
			public bool UserID
			{
				set
				{
					_UserID = value;
				}
				get
				{
					return _UserID;
				}
			}
						private bool _Name = false;
			/// <summary>
			/// Name
			/// </summary>
			public bool Name
			{
				set
				{
					_Name = value;
				}
				get
				{
					return _Name;
				}
			}
						private bool _Gender = false;
			/// <summary>
			/// Gender
			/// </summary>
			public bool Gender
			{
				set
				{
					_Gender = value;
				}
				get
				{
					return _Gender;
				}
			}
						private bool _Title = false;
			/// <summary>
			/// Title
			/// </summary>
			public bool Title
			{
				set
				{
					_Title = value;
				}
				get
				{
					return _Title;
				}
			}
						private bool _Participation = false;
			/// <summary>
			/// Participation
			/// </summary>
			public bool Participation
			{
				set
				{
					_Participation = value;
				}
				get
				{
					return _Participation;
				}
			}
						private bool _Accompanying = false;
			/// <summary>
			/// Accompanying
			/// </summary>
			public bool Accompanying
			{
				set
				{
					_Accompanying = value;
				}
				get
				{
					return _Accompanying;
				}
			}
						private bool _InstitutionName = false;
			/// <summary>
			/// InstitutionName
			/// </summary>
			public bool InstitutionName
			{
				set
				{
					_InstitutionName = value;
				}
				get
				{
					return _InstitutionName;
				}
			}
						private bool _InstitutionAddr = false;
			/// <summary>
			/// InstitutionAddr
			/// </summary>
			public bool InstitutionAddr
			{
				set
				{
					_InstitutionAddr = value;
				}
				get
				{
					return _InstitutionAddr;
				}
			}
						private bool _Phone = false;
			/// <summary>
			/// Phone
			/// </summary>
			public bool Phone
			{
				set
				{
					_Phone = value;
				}
				get
				{
					return _Phone;
				}
			}
						private bool _EMail = false;
			/// <summary>
			/// EMail
			/// </summary>
			public bool EMail
			{
				set
				{
					_EMail = value;
				}
				get
				{
					return _EMail;
				}
			}
						private bool _Fax = false;
			/// <summary>
			/// Fax
			/// </summary>
			public bool Fax
			{
				set
				{
					_Fax = value;
				}
				get
				{
					return _Fax;
				}
			}
						private bool _ArrivalDateTime = false;
			/// <summary>
			/// ArrivalDateTime
			/// </summary>
			public bool ArrivalDateTime
			{
				set
				{
					_ArrivalDateTime = value;
				}
				get
				{
					return _ArrivalDateTime;
				}
			}
						private bool _DepartureDateTime = false;
			/// <summary>
			/// DepartureDateTime
			/// </summary>
			public bool DepartureDateTime
			{
				set
				{
					_DepartureDateTime = value;
				}
				get
				{
					return _DepartureDateTime;
				}
			}
						private bool _Presentation = false;
			/// <summary>
			/// Presentation
			/// </summary>
			public bool Presentation
			{
				set
				{
					_Presentation = value;
				}
				get
				{
					return _Presentation;
				}
			}
						private bool _TotalFee = false;
			/// <summary>
			/// TotalFee
			/// </summary>
			public bool TotalFee
			{
				set
				{
					_TotalFee = value;
				}
				get
				{
					return _TotalFee;
				}
			}
						private bool _PaymentMode = false;
			/// <summary>
			/// PaymentMode
			/// </summary>
			public bool PaymentMode
			{
				set
				{
					_PaymentMode = value;
				}
				get
				{
					return _PaymentMode;
				}
			}
						private bool _BankCard = false;
			/// <summary>
			/// BankCard
			/// </summary>
			public bool BankCard
			{
				set
				{
					_BankCard = value;
				}
				get
				{
					return _BankCard;
				}
			}
						private bool _BankCard2 = false;
			/// <summary>
			/// BankCard2
			/// </summary>
			public bool BankCard2
			{
				set
				{
					_BankCard2 = value;
				}
				get
				{
					return _BankCard2;
				}
			}
						private bool _BankCard3 = false;
			/// <summary>
			/// BankCard3
			/// </summary>
			public bool BankCard3
			{
				set
				{
					_BankCard3 = value;
				}
				get
				{
					return _BankCard3;
				}
			}
						private bool _Hotel = false;
			/// <summary>
			/// Hotel
			/// </summary>
			public bool Hotel
			{
				set
				{
					_Hotel = value;
				}
				get
				{
					return _Hotel;
				}
			}
						private bool _RoomType = false;
			/// <summary>
			/// RoomType
			/// </summary>
			public bool RoomType
			{
				set
				{
					_RoomType = value;
				}
				get
				{
					return _RoomType;
				}
			}
						private bool _UnitPrice = false;
			/// <summary>
			/// UnitPrice
			/// </summary>
			public bool UnitPrice
			{
				set
				{
					_UnitPrice = value;
				}
				get
				{
					return _UnitPrice;
				}
			}
						private bool _AvailableRoom = false;
			/// <summary>
			/// AvailableRoom
			/// </summary>
			public bool AvailableRoom
			{
				set
				{
					_AvailableRoom = value;
				}
				get
				{
					return _AvailableRoom;
				}
			}
						private bool _BookingRoom = false;
			/// <summary>
			/// BookingRoom
			/// </summary>
			public bool BookingRoom
			{
				set
				{
					_BookingRoom = value;
				}
				get
				{
					return _BookingRoom;
				}
			}
						private bool _CheckIn = false;
			/// <summary>
			/// CheckIn
			/// </summary>
			public bool CheckIn
			{
				set
				{
					_CheckIn = value;
				}
				get
				{
					return _CheckIn;
				}
			}
						private bool _CheckOut = false;
			/// <summary>
			/// CheckOut
			/// </summary>
			public bool CheckOut
			{
				set
				{
					_CheckOut = value;
				}
				get
				{
					return _CheckOut;
				}
			}
						private bool _FileName = false;
			/// <summary>
			/// FileName
			/// </summary>
			public bool FileName
			{
				set
				{
					_FileName = value;
				}
				get
				{
					return _FileName;
				}
			}
						private bool _FilePath = false;
			/// <summary>
			/// FilePath
			/// </summary>
			public bool FilePath
			{
				set
				{
					_FilePath = value;
				}
				get
				{
					return _FilePath;
				}
			}
						private bool _FileType = false;
			/// <summary>
			/// FileType
			/// </summary>
			public bool FileType
			{
				set
				{
					_FileType = value;
				}
				get
				{
					return _FileType;
				}
			}
						private bool _Data = false;
			/// <summary>
			/// Data
			/// </summary>
			public bool Data
			{
				set
				{
					_Data = value;
				}
				get
				{
					return _Data;
				}
			}
					}
		
		
    }
}