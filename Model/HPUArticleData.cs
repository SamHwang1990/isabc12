/******************************************************************
 * 日　　期：2013年02月17日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：HPUArticle
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
    /// DataEntity  HPUArticle
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class HPUArticleData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public HPUArticleData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _ArticleID;
		/// <summary>
		/// ArticleID
		/// </summary>
		public int ArticleID
		{
			set{_ArticleID = value;}
			get{return _ArticleID;}
		}
		
				private string _Content;
		/// <summary>
		/// Content
		/// </summary>
		public string Content
		{
			set{_Content = value;}
			get{return _Content;}
		}
		
				private string _SubTitle;
		/// <summary>
		/// SubTitle
		/// </summary>
		public string SubTitle
		{
			set{_SubTitle = value;}
			get{return _SubTitle;}
		}
		
				private string _Author;
		/// <summary>
		/// Author
		/// </summary>
		public string Author
		{
			set{_Author = value;}
			get{return _Author;}
		}
		
				private string _CopyFrom;
		/// <summary>
		/// CopyFrom
		/// </summary>
		public string CopyFrom
		{
			set{_CopyFrom = value;}
			get{return _CopyFrom;}
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
			            _ArticleID = (int) dr["ArticleID"];
			            _Content = (string) dr["Content"];
			            _SubTitle = (string) dr["SubTitle"];
			            _Author = (string) dr["Author"];
			            _CopyFrom = (string) dr["CopyFrom"];
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
			            xe = xmlDoc.CreateElement("ArticleID");
            xe.InnerText = ConvertHelper.ToString(_ArticleID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Content");
            xe.InnerText = ConvertHelper.ToString(_Content);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("SubTitle");
            xe.InnerText = ConvertHelper.ToString(_SubTitle);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Author");
            xe.InnerText = ConvertHelper.ToString(_Author);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("CopyFrom");
            xe.InnerText = ConvertHelper.ToString(_CopyFrom);
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
						_ArticleID = 0;
						_Content = string.Empty;
						_SubTitle = string.Empty;
						_Author = string.Empty;
						_CopyFrom = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            ArticleID,
			            Content,
			            SubTitle,
			            Author,
			            CopyFrom,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(HPUArticleData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.ArticleID = ArticleID == data.ArticleID;
						same.Content = Content == data.Content;
						same.SubTitle = SubTitle == data.SubTitle;
						same.Author = Author == data.Author;
						same.CopyFrom = CopyFrom == data.CopyFrom;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _ArticleID = false;
			/// <summary>
			/// ArticleID
			/// </summary>
			public bool ArticleID
			{
				set
				{
					_ArticleID = value;
				}
				get
				{
					return _ArticleID;
				}
			}
						private bool _Content = false;
			/// <summary>
			/// Content
			/// </summary>
			public bool Content
			{
				set
				{
					_Content = value;
				}
				get
				{
					return _Content;
				}
			}
						private bool _SubTitle = false;
			/// <summary>
			/// SubTitle
			/// </summary>
			public bool SubTitle
			{
				set
				{
					_SubTitle = value;
				}
				get
				{
					return _SubTitle;
				}
			}
						private bool _Author = false;
			/// <summary>
			/// Author
			/// </summary>
			public bool Author
			{
				set
				{
					_Author = value;
				}
				get
				{
					return _Author;
				}
			}
						private bool _CopyFrom = false;
			/// <summary>
			/// CopyFrom
			/// </summary>
			public bool CopyFrom
			{
				set
				{
					_CopyFrom = value;
				}
				get
				{
					return _CopyFrom;
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