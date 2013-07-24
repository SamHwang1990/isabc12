/******************************************************************
 * 日　　期：2013年05月11日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：HPUHospitalInfo
 * 功能描述：
 * 
******************************************************************/


using System;
using System.Data;
using System.Xml;
using System.Text;

using Hope.Enums;
using Hope.Model;
using Hope.Util;
using Newtonsoft.Json;

namespace Hope.Model
{
    /// <summary>
    /// DataEntity  HPUHospitalInfo
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class HPUHospitalInfoData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public HPUHospitalInfoData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _ID;
		/// <summary>
		/// ID
		/// </summary>
		public int ID
		{
			set{_ID = value;}
			get{return _ID;}
		}
		
				private int _HospitalID;
		/// <summary>
		/// HospitalID
		/// </summary>
		public int HospitalID
		{
			set{_HospitalID = value;}
			get{return _HospitalID;}
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
		
				private int _RoomRemain;
		/// <summary>
		/// RoomRemain
		/// </summary>
		public int RoomRemain
		{
			set{_RoomRemain = value;}
			get{return _RoomRemain;}
		}
		
				private string _RoomPrice;
		/// <summary>
		/// RoomPrice
		/// </summary>
		public string RoomPrice
		{
			set{_RoomPrice = value;}
			get{return _RoomPrice;}
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
			            _ID = (int) dr["ID"];
			            _HospitalID = (int) dr["HospitalID"];
			            _RoomType = (string) dr["RoomType"];
			            _RoomRemain = (int) dr["RoomRemain"];
			            _RoomPrice = (string) dr["RoomPrice"];
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
			            xe = xmlDoc.CreateElement("ID");
            xe.InnerText = ConvertHelper.ToString(_ID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("HospitalID");
            xe.InnerText = ConvertHelper.ToString(_HospitalID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("RoomType");
            xe.InnerText = ConvertHelper.ToString(_RoomType);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("RoomRemain");
            xe.InnerText = ConvertHelper.ToString(_RoomRemain);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("RoomPrice");
            xe.InnerText = ConvertHelper.ToString(_RoomPrice);
            xn.AppendChild(xe);
			            
            return xn;
        }
		
		/// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
						_ID = 0;
						_HospitalID = 0;
						_RoomType = string.Empty;
						_RoomRemain = 0;
						_RoomPrice = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            ID,
			            HospitalID,
			            RoomType,
			            RoomRemain,
			            RoomPrice,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(HPUHospitalInfoData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.ID = ID == data.ID;
						same.HospitalID = HospitalID == data.HospitalID;
						same.RoomType = RoomType == data.RoomType;
						same.RoomRemain = RoomRemain == data.RoomRemain;
						same.RoomPrice = RoomPrice == data.RoomPrice;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _ID = false;
			/// <summary>
			/// ID
			/// </summary>
			public bool ID
			{
				set
				{
					_ID = value;
				}
				get
				{
					return _ID;
				}
			}
						private bool _HospitalID = false;
			/// <summary>
			/// HospitalID
			/// </summary>
			public bool HospitalID
			{
				set
				{
					_HospitalID = value;
				}
				get
				{
					return _HospitalID;
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
						private bool _RoomRemain = false;
			/// <summary>
			/// RoomRemain
			/// </summary>
			public bool RoomRemain
			{
				set
				{
					_RoomRemain = value;
				}
				get
				{
					return _RoomRemain;
				}
			}
						private bool _RoomPrice = false;
			/// <summary>
			/// RoomPrice
			/// </summary>
			public bool RoomPrice
			{
				set
				{
					_RoomPrice = value;
				}
				get
				{
					return _RoomPrice;
				}
			}
					}
		
		
    }
}