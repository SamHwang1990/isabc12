/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentTag
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
    /// DataEntity  ContentTag
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentTagData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentTagData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _TagID;
		/// <summary>
		/// TagID
		/// </summary>
		public int TagID
		{
			set{_TagID = value;}
			get{return _TagID;}
		}
		
				private int _CategoryID;
		/// <summary>
		/// CategoryID
		/// </summary>
		public int CategoryID
		{
			set{_CategoryID = value;}
			get{return _CategoryID;}
		}
		
				private string _TagName;
		/// <summary>
		/// TagName
		/// </summary>
		public string TagName
		{
			set{_TagName = value;}
			get{return _TagName;}
		}
		
				private string _TagContent;
		/// <summary>
		/// TagContent
		/// </summary>
		public string TagContent
		{
			set{_TagContent = value;}
			get{return _TagContent;}
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
		
				private bool _IsGenerate;
		/// <summary>
		/// IsGenerate
		/// </summary>
		public bool IsGenerate
		{
			set{_IsGenerate = value;}
			get{return _IsGenerate;}
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
			            _TagID = (int) dr["TagID"];
			            _CategoryID = (int) dr["CategoryID"];
			            _TagName = (string) dr["TagName"];
			            _TagContent = (string) dr["TagContent"];
			            _FileName = (string) dr["FileName"];
			            _IsGenerate = (bool) dr["IsGenerate"];
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
			            xe = xmlDoc.CreateElement("TagID");
            xe.InnerText = ConvertHelper.ToString(_TagID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("CategoryID");
            xe.InnerText = ConvertHelper.ToString(_CategoryID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("TagName");
            xe.InnerText = ConvertHelper.ToString(_TagName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("TagContent");
            xe.InnerText = ConvertHelper.ToString(_TagContent);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FileName");
            xe.InnerText = ConvertHelper.ToString(_FileName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("IsGenerate");
            xe.InnerText = ConvertHelper.ToString(_IsGenerate);
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
						_TagID = 0;
						_CategoryID = 0;
						_TagName = string.Empty;
						_TagContent = string.Empty;
						_FileName = string.Empty;
						_IsGenerate = false;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            TagID,
			            CategoryID,
			            TagName,
			            TagContent,
			            FileName,
			            IsGenerate,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentTagData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.TagID = TagID == data.TagID;
						same.CategoryID = CategoryID == data.CategoryID;
						same.TagName = TagName == data.TagName;
						same.TagContent = TagContent == data.TagContent;
						same.FileName = FileName == data.FileName;
						same.IsGenerate = IsGenerate == data.IsGenerate;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _TagID = false;
			/// <summary>
			/// TagID
			/// </summary>
			public bool TagID
			{
				set
				{
					_TagID = value;
				}
				get
				{
					return _TagID;
				}
			}
						private bool _CategoryID = false;
			/// <summary>
			/// CategoryID
			/// </summary>
			public bool CategoryID
			{
				set
				{
					_CategoryID = value;
				}
				get
				{
					return _CategoryID;
				}
			}
						private bool _TagName = false;
			/// <summary>
			/// TagName
			/// </summary>
			public bool TagName
			{
				set
				{
					_TagName = value;
				}
				get
				{
					return _TagName;
				}
			}
						private bool _TagContent = false;
			/// <summary>
			/// TagContent
			/// </summary>
			public bool TagContent
			{
				set
				{
					_TagContent = value;
				}
				get
				{
					return _TagContent;
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
						private bool _IsGenerate = false;
			/// <summary>
			/// IsGenerate
			/// </summary>
			public bool IsGenerate
			{
				set
				{
					_IsGenerate = value;
				}
				get
				{
					return _IsGenerate;
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