/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：SysModule
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
    /// DataEntity  SysModule
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class SysModuleData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public SysModuleData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _ModuleID;
		/// <summary>
		/// ModuleID
		/// </summary>
		public int ModuleID
		{
			set{_ModuleID = value;}
			get{return _ModuleID;}
		}
		
				private int _ParentID;
		/// <summary>
		/// ParentID
		/// </summary>
		public int ParentID
		{
			set{_ParentID = value;}
			get{return _ParentID;}
		}
		
				private string _ModuleName;
		/// <summary>
		/// ModuleName
		/// </summary>
		public string ModuleName
		{
			set{_ModuleName = value;}
			get{return _ModuleName;}
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
			            _ModuleID = (int) dr["ModuleID"];
			            _ParentID = (int) dr["ParentID"];
			            _ModuleName = (string) dr["ModuleName"];
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
			            xe = xmlDoc.CreateElement("ModuleID");
            xe.InnerText = ConvertHelper.ToString(_ModuleID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ParentID");
            xe.InnerText = ConvertHelper.ToString(_ParentID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ModuleName");
            xe.InnerText = ConvertHelper.ToString(_ModuleName);
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
						_ModuleID = 0;
						_ParentID = 0;
						_ModuleName = string.Empty;
						_DefaultUrl = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            ModuleID,
			            ParentID,
			            ModuleName,
			            DefaultUrl,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(SysModuleData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.ModuleID = ModuleID == data.ModuleID;
						same.ParentID = ParentID == data.ParentID;
						same.ModuleName = ModuleName == data.ModuleName;
						same.DefaultUrl = DefaultUrl == data.DefaultUrl;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
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
						private bool _ParentID = false;
			/// <summary>
			/// ParentID
			/// </summary>
			public bool ParentID
			{
				set
				{
					_ParentID = value;
				}
				get
				{
					return _ParentID;
				}
			}
						private bool _ModuleName = false;
			/// <summary>
			/// ModuleName
			/// </summary>
			public bool ModuleName
			{
				set
				{
					_ModuleName = value;
				}
				get
				{
					return _ModuleName;
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