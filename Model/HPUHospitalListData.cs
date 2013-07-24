/******************************************************************
 * 日　　期：2013年05月11日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：HPUHospitalList
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
    /// DataEntity  HPUHospitalList
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class HPUHospitalListData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public HPUHospitalListData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _HospitalID;
		/// <summary>
		/// HospitalID
		/// </summary>
		public int HospitalID
		{
			set{_HospitalID = value;}
			get{return _HospitalID;}
		}
		
				private string _HospitalName;
		/// <summary>
		/// HospitalName
		/// </summary>
		public string HospitalName
		{
			set{_HospitalName = value;}
			get{return _HospitalName;}
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
			            _HospitalID = (int) dr["HospitalID"];
			            _HospitalName = (string) dr["HospitalName"];
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
			            xe = xmlDoc.CreateElement("HospitalID");
            xe.InnerText = ConvertHelper.ToString(_HospitalID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("HospitalName");
            xe.InnerText = ConvertHelper.ToString(_HospitalName);
            xn.AppendChild(xe);
			            
            return xn;
        }
		
		/// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
						_HospitalID = 0;
						_HospitalName = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            HospitalID,
			            HospitalName,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(HPUHospitalListData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.HospitalID = HospitalID == data.HospitalID;
						same.HospitalName = HospitalName == data.HospitalName;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
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
						private bool _HospitalName = false;
			/// <summary>
			/// HospitalName
			/// </summary>
			public bool HospitalName
			{
				set
				{
					_HospitalName = value;
				}
				get
				{
					return _HospitalName;
				}
			}
					}
		
		
    }
}