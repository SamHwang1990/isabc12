/******************************************************************
 * 日　　期：2013年02月20日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentStyleCategory
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
    /// DataEntity  ContentStyleCategory
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentStyleCategoryData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentStyleCategoryData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _StyleCategoryID;
		/// <summary>
		/// StyleCategoryID
		/// </summary>
		public int StyleCategoryID
		{
			set{_StyleCategoryID = value;}
			get{return _StyleCategoryID;}
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
		
				private string _StyleCategoryName;
		/// <summary>
		/// StyleCategoryName
		/// </summary>
		public string StyleCategoryName
		{
			set{_StyleCategoryName = value;}
			get{return _StyleCategoryName;}
		}
		
				private string _StyleCategoryEnName;
		/// <summary>
		/// StyleCategoryEnName
		/// </summary>
		public string StyleCategoryEnName
		{
			set{_StyleCategoryEnName = value;}
			get{return _StyleCategoryEnName;}
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
			            _StyleCategoryID = (int) dr["StyleCategoryID"];
			            _ParentID = (int) dr["ParentID"];
			            _StyleCategoryName = (string) dr["StyleCategoryName"];
			            _StyleCategoryEnName = (string) dr["StyleCategoryEnName"];
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
			            xe = xmlDoc.CreateElement("StyleCategoryID");
            xe.InnerText = ConvertHelper.ToString(_StyleCategoryID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ParentID");
            xe.InnerText = ConvertHelper.ToString(_ParentID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("StyleCategoryName");
            xe.InnerText = ConvertHelper.ToString(_StyleCategoryName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("StyleCategoryEnName");
            xe.InnerText = ConvertHelper.ToString(_StyleCategoryEnName);
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
						_StyleCategoryID = 0;
						_ParentID = 0;
						_StyleCategoryName = string.Empty;
						_StyleCategoryEnName = string.Empty;
						_DirName = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            StyleCategoryID,
			            ParentID,
			            StyleCategoryName,
			            StyleCategoryEnName,
			            DirName,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentStyleCategoryData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.StyleCategoryID = StyleCategoryID == data.StyleCategoryID;
						same.ParentID = ParentID == data.ParentID;
						same.StyleCategoryName = StyleCategoryName == data.StyleCategoryName;
						same.StyleCategoryEnName = StyleCategoryEnName == data.StyleCategoryEnName;
						same.DirName = DirName == data.DirName;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _StyleCategoryID = false;
			/// <summary>
			/// StyleCategoryID
			/// </summary>
			public bool StyleCategoryID
			{
				set
				{
					_StyleCategoryID = value;
				}
				get
				{
					return _StyleCategoryID;
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
						private bool _StyleCategoryName = false;
			/// <summary>
			/// StyleCategoryName
			/// </summary>
			public bool StyleCategoryName
			{
				set
				{
					_StyleCategoryName = value;
				}
				get
				{
					return _StyleCategoryName;
				}
			}
						private bool _StyleCategoryEnName = false;
			/// <summary>
			/// StyleCategoryEnName
			/// </summary>
			public bool StyleCategoryEnName
			{
				set
				{
					_StyleCategoryEnName = value;
				}
				get
				{
					return _StyleCategoryEnName;
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