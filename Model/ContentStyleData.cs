/******************************************************************
 * 日　　期：2013年02月20日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentStyle
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
    /// DataEntity  ContentStyle
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentStyleData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentStyleData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _StyleID;
		/// <summary>
		/// StyleID
		/// </summary>
		public int StyleID
		{
			set{_StyleID = value;}
			get{return _StyleID;}
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
		
				private string _StyleName;
		/// <summary>
		/// StyleName
		/// </summary>
		public string StyleName
		{
			set{_StyleName = value;}
			get{return _StyleName;}
		}
		
				private string _StyleEnName;
		/// <summary>
		/// StyleEnName
		/// </summary>
		public string StyleEnName
		{
			set{_StyleEnName = value;}
			get{return _StyleEnName;}
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
			            _StyleID = (int) dr["StyleID"];
			            _CategoryID = (int) dr["CategoryID"];
			            _StyleName = (string) dr["StyleName"];
			            _StyleEnName = (string) dr["StyleEnName"];
			            _Content = (string) dr["Content"];
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
			            xe = xmlDoc.CreateElement("StyleID");
            xe.InnerText = ConvertHelper.ToString(_StyleID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("CategoryID");
            xe.InnerText = ConvertHelper.ToString(_CategoryID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("StyleName");
            xe.InnerText = ConvertHelper.ToString(_StyleName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("StyleEnName");
            xe.InnerText = ConvertHelper.ToString(_StyleEnName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Content");
            xe.InnerText = ConvertHelper.ToString(_Content);
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
						_StyleID = 0;
						_CategoryID = 0;
						_StyleName = string.Empty;
						_StyleEnName = string.Empty;
						_Content = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            StyleID,
			            CategoryID,
			            StyleName,
			            StyleEnName,
			            Content,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentStyleData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.StyleID = StyleID == data.StyleID;
						same.CategoryID = CategoryID == data.CategoryID;
						same.StyleName = StyleName == data.StyleName;
						same.StyleEnName = StyleEnName == data.StyleEnName;
						same.Content = Content == data.Content;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _StyleID = false;
			/// <summary>
			/// StyleID
			/// </summary>
			public bool StyleID
			{
				set
				{
					_StyleID = value;
				}
				get
				{
					return _StyleID;
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
						private bool _StyleName = false;
			/// <summary>
			/// StyleName
			/// </summary>
			public bool StyleName
			{
				set
				{
					_StyleName = value;
				}
				get
				{
					return _StyleName;
				}
			}
						private bool _StyleEnName = false;
			/// <summary>
			/// StyleEnName
			/// </summary>
			public bool StyleEnName
			{
				set
				{
					_StyleEnName = value;
				}
				get
				{
					return _StyleEnName;
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