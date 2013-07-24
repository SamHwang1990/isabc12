/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentNode
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
    /// DataEntity  ContentNode
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentNodeData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentNodeData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _NodeID;
		/// <summary>
		/// NodeID
		/// </summary>
		public int NodeID
		{
			set{_NodeID = value;}
			get{return _NodeID;}
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
		
				private string _NodeName;
		/// <summary>
		/// NodeName
		/// </summary>
		public string NodeName
		{
			set{_NodeName = value;}
			get{return _NodeName;}
		}
		
				private string _NodeEnName;
		/// <summary>
		/// NodeEnName
		/// </summary>
		public string NodeEnName
		{
			set{_NodeEnName = value;}
			get{return _NodeEnName;}
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
		
				private bool _OpenType;
		/// <summary>
		/// OpenType
		/// </summary>
		public bool OpenType
		{
			set{_OpenType = value;}
			get{return _OpenType;}
		}
		
				private int _ModelID;
		/// <summary>
		/// ModelID
		/// </summary>
		public int ModelID
		{
			set{_ModelID = value;}
			get{return _ModelID;}
		}
		
				private int _IndexTemplateID;
		/// <summary>
		/// IndexTemplateID
		/// </summary>
		public int IndexTemplateID
		{
			set{_IndexTemplateID = value;}
			get{return _IndexTemplateID;}
		}
		
				private int _ContentTemplateID;
		/// <summary>
		/// ContentTemplateID
		/// </summary>
		public int ContentTemplateID
		{
			set{_ContentTemplateID = value;}
			get{return _ContentTemplateID;}
		}
		
				private int _SearchTemplateID;
		/// <summary>
		/// SearchTemplateID
		/// </summary>
		public int SearchTemplateID
		{
			set{_SearchTemplateID = value;}
			get{return _SearchTemplateID;}
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
		
				private int _GenerateRegex;
		/// <summary>
		/// GenerateRegex
		/// </summary>
		public int GenerateRegex
		{
			set{_GenerateRegex = value;}
			get{return _GenerateRegex;}
		}
		
				private int _PageSize;
		/// <summary>
		/// PageSize
		/// </summary>
		public int PageSize
		{
			set{_PageSize = value;}
			get{return _PageSize;}
		}
		
				private string _Meta;
		/// <summary>
		/// Meta
		/// </summary>
		public string Meta
		{
			set{_Meta = value;}
			get{return _Meta;}
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
			            _NodeID = (int) dr["NodeID"];
			            _ParentID = (int) dr["ParentID"];
			            _NodeName = (string) dr["NodeName"];
			            _NodeEnName = (string) dr["NodeEnName"];
			            _DirName = (string) dr["DirName"];
			            _OpenType = (bool) dr["OpenType"];
			            _ModelID = (int) dr["ModelID"];
			            _IndexTemplateID = (int) dr["IndexTemplateID"];
			            _ContentTemplateID = (int) dr["ContentTemplateID"];
			            _SearchTemplateID = (int) dr["SearchTemplateID"];
			            _IsGenerate = (bool) dr["IsGenerate"];
			            _GenerateRegex = (int) dr["GenerateRegex"];
			            _PageSize = (int) dr["PageSize"];
			            _Meta = (string) dr["Meta"];
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
			            xe = xmlDoc.CreateElement("NodeID");
            xe.InnerText = ConvertHelper.ToString(_NodeID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ParentID");
            xe.InnerText = ConvertHelper.ToString(_ParentID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("NodeName");
            xe.InnerText = ConvertHelper.ToString(_NodeName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("NodeEnName");
            xe.InnerText = ConvertHelper.ToString(_NodeEnName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("DirName");
            xe.InnerText = ConvertHelper.ToString(_DirName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("OpenType");
            xe.InnerText = ConvertHelper.ToString(_OpenType);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ModelID");
            xe.InnerText = ConvertHelper.ToString(_ModelID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("IndexTemplateID");
            xe.InnerText = ConvertHelper.ToString(_IndexTemplateID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ContentTemplateID");
            xe.InnerText = ConvertHelper.ToString(_ContentTemplateID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("SearchTemplateID");
            xe.InnerText = ConvertHelper.ToString(_SearchTemplateID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("IsGenerate");
            xe.InnerText = ConvertHelper.ToString(_IsGenerate);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("GenerateRegex");
            xe.InnerText = ConvertHelper.ToString(_GenerateRegex);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("PageSize");
            xe.InnerText = ConvertHelper.ToString(_PageSize);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Meta");
            xe.InnerText = ConvertHelper.ToString(_Meta);
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
						_NodeID = 0;
						_ParentID = 0;
						_NodeName = string.Empty;
						_NodeEnName = string.Empty;
						_DirName = string.Empty;
						_OpenType = false;
						_ModelID = 0;
						_IndexTemplateID = 0;
						_ContentTemplateID = 0;
						_SearchTemplateID = 0;
						_IsGenerate = false;
						_GenerateRegex = 0;
						_PageSize = 0;
						_Meta = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            NodeID,
			            ParentID,
			            NodeName,
			            NodeEnName,
			            DirName,
			            OpenType,
			            ModelID,
			            IndexTemplateID,
			            ContentTemplateID,
			            SearchTemplateID,
			            IsGenerate,
			            GenerateRegex,
			            PageSize,
			            Meta,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentNodeData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.NodeID = NodeID == data.NodeID;
						same.ParentID = ParentID == data.ParentID;
						same.NodeName = NodeName == data.NodeName;
						same.NodeEnName = NodeEnName == data.NodeEnName;
						same.DirName = DirName == data.DirName;
						same.OpenType = OpenType == data.OpenType;
						same.ModelID = ModelID == data.ModelID;
						same.IndexTemplateID = IndexTemplateID == data.IndexTemplateID;
						same.ContentTemplateID = ContentTemplateID == data.ContentTemplateID;
						same.SearchTemplateID = SearchTemplateID == data.SearchTemplateID;
						same.IsGenerate = IsGenerate == data.IsGenerate;
						same.GenerateRegex = GenerateRegex == data.GenerateRegex;
						same.PageSize = PageSize == data.PageSize;
						same.Meta = Meta == data.Meta;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _NodeID = false;
			/// <summary>
			/// NodeID
			/// </summary>
			public bool NodeID
			{
				set
				{
					_NodeID = value;
				}
				get
				{
					return _NodeID;
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
						private bool _NodeName = false;
			/// <summary>
			/// NodeName
			/// </summary>
			public bool NodeName
			{
				set
				{
					_NodeName = value;
				}
				get
				{
					return _NodeName;
				}
			}
						private bool _NodeEnName = false;
			/// <summary>
			/// NodeEnName
			/// </summary>
			public bool NodeEnName
			{
				set
				{
					_NodeEnName = value;
				}
				get
				{
					return _NodeEnName;
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
						private bool _OpenType = false;
			/// <summary>
			/// OpenType
			/// </summary>
			public bool OpenType
			{
				set
				{
					_OpenType = value;
				}
				get
				{
					return _OpenType;
				}
			}
						private bool _ModelID = false;
			/// <summary>
			/// ModelID
			/// </summary>
			public bool ModelID
			{
				set
				{
					_ModelID = value;
				}
				get
				{
					return _ModelID;
				}
			}
						private bool _IndexTemplateID = false;
			/// <summary>
			/// IndexTemplateID
			/// </summary>
			public bool IndexTemplateID
			{
				set
				{
					_IndexTemplateID = value;
				}
				get
				{
					return _IndexTemplateID;
				}
			}
						private bool _ContentTemplateID = false;
			/// <summary>
			/// ContentTemplateID
			/// </summary>
			public bool ContentTemplateID
			{
				set
				{
					_ContentTemplateID = value;
				}
				get
				{
					return _ContentTemplateID;
				}
			}
						private bool _SearchTemplateID = false;
			/// <summary>
			/// SearchTemplateID
			/// </summary>
			public bool SearchTemplateID
			{
				set
				{
					_SearchTemplateID = value;
				}
				get
				{
					return _SearchTemplateID;
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
						private bool _GenerateRegex = false;
			/// <summary>
			/// GenerateRegex
			/// </summary>
			public bool GenerateRegex
			{
				set
				{
					_GenerateRegex = value;
				}
				get
				{
					return _GenerateRegex;
				}
			}
						private bool _PageSize = false;
			/// <summary>
			/// PageSize
			/// </summary>
			public bool PageSize
			{
				set
				{
					_PageSize = value;
				}
				get
				{
					return _PageSize;
				}
			}
						private bool _Meta = false;
			/// <summary>
			/// Meta
			/// </summary>
			public bool Meta
			{
				set
				{
					_Meta = value;
				}
				get
				{
					return _Meta;
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