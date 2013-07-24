/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentTemplateCategory
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
    /// DataEntity  ContentTemplateCategory
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentTemplateCategoryData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentTemplateCategoryData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _TemplateCategoryID;
		/// <summary>
		/// TemplateCategoryID
		/// </summary>
		public int TemplateCategoryID
		{
			set{_TemplateCategoryID = value;}
			get{return _TemplateCategoryID;}
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
		
				private string _TemplateCategoryName;
		/// <summary>
		/// TemplateCategoryName
		/// </summary>
		public string TemplateCategoryName
		{
			set{_TemplateCategoryName = value;}
			get{return _TemplateCategoryName;}
		}
		
				private string _DirName;
		/// <summary>
		/// DirName
		/// </summary>
		public string DirName
		{
			set{_DirName = value;}
			get{return _DirName;}
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
			            _TemplateCategoryID = (int) dr["TemplateCategoryID"];
			            _ParentID = (int) dr["ParentID"];
			            _TemplateCategoryName = (string) dr["TemplateCategoryName"];
			            _DirName = (string) dr["DirName"];
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
			            xe = xmlDoc.CreateElement("TemplateCategoryID");
            xe.InnerText = ConvertHelper.ToString(_TemplateCategoryID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ParentID");
            xe.InnerText = ConvertHelper.ToString(_ParentID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("TemplateCategoryName");
            xe.InnerText = ConvertHelper.ToString(_TemplateCategoryName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("DirName");
            xe.InnerText = ConvertHelper.ToString(_DirName);
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
						_TemplateCategoryID = 0;
						_ParentID = 0;
						_TemplateCategoryName = string.Empty;
						_DirName = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            TemplateCategoryID,
			            ParentID,
			            TemplateCategoryName,
			            DirName,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentTemplateCategoryData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.TemplateCategoryID = TemplateCategoryID == data.TemplateCategoryID;
						same.ParentID = ParentID == data.ParentID;
						same.TemplateCategoryName = TemplateCategoryName == data.TemplateCategoryName;
						same.DirName = DirName == data.DirName;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _TemplateCategoryID = false;
			/// <summary>
			/// TemplateCategoryID
			/// </summary>
			public bool TemplateCategoryID
			{
				set
				{
					_TemplateCategoryID = value;
				}
				get
				{
					return _TemplateCategoryID;
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
						private bool _TemplateCategoryName = false;
			/// <summary>
			/// TemplateCategoryName
			/// </summary>
			public bool TemplateCategoryName
			{
				set
				{
					_TemplateCategoryName = value;
				}
				get
				{
					return _TemplateCategoryName;
				}
			}
						private bool _DirName = false;
			/// <summary>
			/// DirName
			/// </summary>
			public bool DirName
			{
				set
				{
					_DirName = value;
				}
				get
				{
					return _DirName;
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