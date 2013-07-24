/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：SysFunction
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
    /// DataEntity  SysFunction
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class SysFunctionData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public SysFunctionData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _FunctionID;
		/// <summary>
		/// FunctionID
		/// </summary>
		public int FunctionID
		{
			set{_FunctionID = value;}
			get{return _FunctionID;}
		}
		
				private int _ModuleID;
		/// <summary>
		/// ModuleID
		/// </summary>
		public int ModuleID
		{
			set{_ModuleID = value;}
			get{return _ModuleID;}
		}
		
				private string _FunctionName;
		/// <summary>
		/// FunctionName
		/// </summary>
		public string FunctionName
		{
			set{_FunctionName = value;}
			get{return _FunctionName;}
		}
		
				private string _FunctionKey;
		/// <summary>
		/// FunctionKey
		/// </summary>
		public string FunctionKey
		{
			set{_FunctionKey = value;}
			get{return _FunctionKey;}
		}
		
				private int _FunctionValue;
		/// <summary>
		/// FunctionValue
		/// </summary>
		public int FunctionValue
		{
			set{_FunctionValue = value;}
			get{return _FunctionValue;}
		}
		
				private string _DefaultUrl;
		/// <summary>
		/// DefaultUrl
		/// </summary>
		public string DefaultUrl
		{
			set{_DefaultUrl = value;}
			get{return _DefaultUrl;}
		}
		
				private string _Remark;
		/// <summary>
		/// Remark
		/// </summary>
		public string Remark
		{
			set{_Remark = value;}
			get{return _Remark;}
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
			            _FunctionID = (int) dr["FunctionID"];
			            _ModuleID = (int) dr["ModuleID"];
			            _FunctionName = (string) dr["FunctionName"];
			            _FunctionKey = (string) dr["FunctionKey"];
			            _FunctionValue = (int) dr["FunctionValue"];
			            _DefaultUrl = (string) dr["DefaultUrl"];
			            _Remark = (string) dr["Remark"];
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
			            xe = xmlDoc.CreateElement("FunctionID");
            xe.InnerText = ConvertHelper.ToString(_FunctionID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ModuleID");
            xe.InnerText = ConvertHelper.ToString(_ModuleID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FunctionName");
            xe.InnerText = ConvertHelper.ToString(_FunctionName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FunctionKey");
            xe.InnerText = ConvertHelper.ToString(_FunctionKey);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FunctionValue");
            xe.InnerText = ConvertHelper.ToString(_FunctionValue);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("DefaultUrl");
            xe.InnerText = ConvertHelper.ToString(_DefaultUrl);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Remark");
            xe.InnerText = ConvertHelper.ToString(_Remark);
            xn.AppendChild(xe);
			            
            return xn;
        }
		
		/// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
						_FunctionID = 0;
						_ModuleID = 0;
						_FunctionName = string.Empty;
						_FunctionKey = string.Empty;
						_FunctionValue = 0;
						_DefaultUrl = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            FunctionID,
			            ModuleID,
			            FunctionName,
			            FunctionKey,
			            FunctionValue,
			            DefaultUrl,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(SysFunctionData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.FunctionID = FunctionID == data.FunctionID;
						same.ModuleID = ModuleID == data.ModuleID;
						same.FunctionName = FunctionName == data.FunctionName;
						same.FunctionKey = FunctionKey == data.FunctionKey;
						same.FunctionValue = FunctionValue == data.FunctionValue;
						same.DefaultUrl = DefaultUrl == data.DefaultUrl;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _FunctionID = false;
			/// <summary>
			/// FunctionID
			/// </summary>
			public bool FunctionID
			{
				set
				{
					_FunctionID = value;
				}
				get
				{
					return _FunctionID;
				}
			}
						private bool _ModuleID = false;
			/// <summary>
			/// ModuleID
			/// </summary>
			public bool ModuleID
			{
				set
				{
					_ModuleID = value;
				}
				get
				{
					return _ModuleID;
				}
			}
						private bool _FunctionName = false;
			/// <summary>
			/// FunctionName
			/// </summary>
			public bool FunctionName
			{
				set
				{
					_FunctionName = value;
				}
				get
				{
					return _FunctionName;
				}
			}
						private bool _FunctionKey = false;
			/// <summary>
			/// FunctionKey
			/// </summary>
			public bool FunctionKey
			{
				set
				{
					_FunctionKey = value;
				}
				get
				{
					return _FunctionKey;
				}
			}
						private bool _FunctionValue = false;
			/// <summary>
			/// FunctionValue
			/// </summary>
			public bool FunctionValue
			{
				set
				{
					_FunctionValue = value;
				}
				get
				{
					return _FunctionValue;
				}
			}
						private bool _DefaultUrl = false;
			/// <summary>
			/// DefaultUrl
			/// </summary>
			public bool DefaultUrl
			{
				set
				{
					_DefaultUrl = value;
				}
				get
				{
					return _DefaultUrl;
				}
			}
						private bool _Remark = false;
			/// <summary>
			/// Remark
			/// </summary>
			public bool Remark
			{
				set
				{
					_Remark = value;
				}
				get
				{
					return _Remark;
				}
			}
					}
		
		
    }
}