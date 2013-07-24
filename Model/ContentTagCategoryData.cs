/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentTagCategory
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
    /// DataEntity  ContentTagCategory
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentTagCategoryData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentTagCategoryData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _TagCategoryID;
		/// <summary>
		/// TagCategoryID
		/// </summary>
		public int TagCategoryID
		{
			set{_TagCategoryID = value;}
			get{return _TagCategoryID;}
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
		
				private string _TagCategoryName;
		/// <summary>
		/// TagCategoryName
		/// </summary>
		public string TagCategoryName
		{
			set{_TagCategoryName = value;}
			get{return _TagCategoryName;}
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
			            _TagCategoryID = (int) dr["TagCategoryID"];
			            _ParentID = (int) dr["ParentID"];
			            _TagCategoryName = (string) dr["TagCategoryName"];
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
			            xe = xmlDoc.CreateElement("TagCategoryID");
            xe.InnerText = ConvertHelper.ToString(_TagCategoryID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ParentID");
            xe.InnerText = ConvertHelper.ToString(_ParentID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("TagCategoryName");
            xe.InnerText = ConvertHelper.ToString(_TagCategoryName);
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
						_TagCategoryID = 0;
						_ParentID = 0;
						_TagCategoryName = string.Empty;
						_DirName = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            TagCategoryID,
			            ParentID,
			            TagCategoryName,
			            DirName,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentTagCategoryData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.TagCategoryID = TagCategoryID == data.TagCategoryID;
						same.ParentID = ParentID == data.ParentID;
						same.TagCategoryName = TagCategoryName == data.TagCategoryName;
						same.DirName = DirName == data.DirName;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _TagCategoryID = false;
			/// <summary>
			/// TagCategoryID
			/// </summary>
			public bool TagCategoryID
			{
				set
				{
					_TagCategoryID = value;
				}
				get
				{
					return _TagCategoryID;
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
						private bool _TagCategoryName = false;
			/// <summary>
			/// TagCategoryName
			/// </summary>
			public bool TagCategoryName
			{
				set
				{
					_TagCategoryName = value;
				}
				get
				{
					return _TagCategoryName;
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