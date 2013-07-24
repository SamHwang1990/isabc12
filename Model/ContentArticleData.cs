/******************************************************************
 * 日　　期：2013年02月17日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentArticle
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
    /// DataEntity  ContentArticle
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentArticleData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentArticleData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _GeneralID;
		/// <summary>
		/// GeneralID
		/// </summary>
		public int GeneralID
		{
			set{_GeneralID = value;}
			get{return _GeneralID;}
		}
		
				private int _NodeID;
		/// <summary>
		/// NodeID
		/// </summary>
		public int NodeID
		{
			set{_NodeID = value;}
			get{return _NodeID;}
		}
		
				private int _ItemID;
		/// <summary>
		/// ItemID
		/// </summary>
		public int ItemID
		{
			set{_ItemID = value;}
			get{return _ItemID;}
		}
		
				private string _Title;
		/// <summary>
		/// Title
		/// </summary>
		public string Title
		{
			set{_Title = value;}
			get{return _Title;}
		}
		
				private string _Inputor;
		/// <summary>
		/// Inputor
		/// </summary>
		public string Inputor
		{
			set{_Inputor = value;}
			get{return _Inputor;}
		}
		
				private string _Editor;
		/// <summary>
		/// Editor
		/// </summary>
		public string Editor
		{
			set{_Editor = value;}
			get{return _Editor;}
		}
		
				private int _Hits;
		/// <summary>
		/// Hits
		/// </summary>
		public int Hits
		{
			set{_Hits = value;}
			get{return _Hits;}
		}
		
				private DateTime _CreateTime;
		/// <summary>
		/// CreateTime
		/// </summary>
		public DateTime CreateTime
		{
			set{_CreateTime = value;}
			get{return _CreateTime;}
		}
		
				private DateTime _UpdateTime;
		/// <summary>
		/// UpdateTime
		/// </summary>
		public DateTime UpdateTime
		{
			set{_UpdateTime = value;}
			get{return _UpdateTime;}
		}
		
				private int _Status;
		/// <summary>
		/// Status
		/// </summary>
		public int Status
		{
			set{_Status = value;}
			get{return _Status;}
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
			            _GeneralID = (int) dr["GeneralID"];
			            _NodeID = (int) dr["NodeID"];
			            _ItemID = (int) dr["ItemID"];
			            _Title = (string) dr["Title"];
			            _Inputor = (string) dr["Inputor"];
			            _Editor = (string) dr["Editor"];
			            _Hits = (int) dr["Hits"];
			            _CreateTime = (DateTime) dr["CreateTime"];
			            _UpdateTime = (DateTime) dr["UpdateTime"];
			            _Status = (int) dr["Status"];
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
			            xe = xmlDoc.CreateElement("GeneralID");
            xe.InnerText = ConvertHelper.ToString(_GeneralID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("NodeID");
            xe.InnerText = ConvertHelper.ToString(_NodeID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ItemID");
            xe.InnerText = ConvertHelper.ToString(_ItemID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Title");
            xe.InnerText = ConvertHelper.ToString(_Title);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Inputor");
            xe.InnerText = ConvertHelper.ToString(_Inputor);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Editor");
            xe.InnerText = ConvertHelper.ToString(_Editor);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Hits");
            xe.InnerText = ConvertHelper.ToString(_Hits);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("CreateTime");
            xe.InnerText = ConvertHelper.ToString(_CreateTime);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("UpdateTime");
            xe.InnerText = ConvertHelper.ToString(_UpdateTime);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Status");
            xe.InnerText = ConvertHelper.ToString(_Status);
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
						_GeneralID = 0;
						_NodeID = 0;
						_ItemID = 0;
						_Title = string.Empty;
						_Inputor = string.Empty;
						_Editor = string.Empty;
						_Hits = 0;
						_CreateTime = ConvertHelper.MinDateTime;
						_UpdateTime = ConvertHelper.MinDateTime;
						_Status = 0;
						_IsGenerate = false;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            GeneralID,
			            NodeID,
			            ItemID,
			            Title,
			            Inputor,
			            Editor,
			            Hits,
			            CreateTime,
			            UpdateTime,
			            Status,
			            IsGenerate,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentArticleData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.GeneralID = GeneralID == data.GeneralID;
						same.NodeID = NodeID == data.NodeID;
						same.ItemID = ItemID == data.ItemID;
						same.Title = Title == data.Title;
						same.Inputor = Inputor == data.Inputor;
						same.Editor = Editor == data.Editor;
						same.Hits = Hits == data.Hits;
						same.CreateTime = CreateTime == data.CreateTime;
						same.UpdateTime = UpdateTime == data.UpdateTime;
						same.Status = Status == data.Status;
						same.IsGenerate = IsGenerate == data.IsGenerate;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _GeneralID = false;
			/// <summary>
			/// GeneralID
			/// </summary>
			public bool GeneralID
			{
				set
				{
					_GeneralID = value;
				}
				get
				{
					return _GeneralID;
				}
			}
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
						private bool _ItemID = false;
			/// <summary>
			/// ItemID
			/// </summary>
			public bool ItemID
			{
				set
				{
					_ItemID = value;
				}
				get
				{
					return _ItemID;
				}
			}
						private bool _Title = false;
			/// <summary>
			/// Title
			/// </summary>
			public bool Title
			{
				set
				{
					_Title = value;
				}
				get
				{
					return _Title;
				}
			}
						private bool _Inputor = false;
			/// <summary>
			/// Inputor
			/// </summary>
			public bool Inputor
			{
				set
				{
					_Inputor = value;
				}
				get
				{
					return _Inputor;
				}
			}
						private bool _Editor = false;
			/// <summary>
			/// Editor
			/// </summary>
			public bool Editor
			{
				set
				{
					_Editor = value;
				}
				get
				{
					return _Editor;
				}
			}
						private bool _Hits = false;
			/// <summary>
			/// Hits
			/// </summary>
			public bool Hits
			{
				set
				{
					_Hits = value;
				}
				get
				{
					return _Hits;
				}
			}
						private bool _CreateTime = false;
			/// <summary>
			/// CreateTime
			/// </summary>
			public bool CreateTime
			{
				set
				{
					_CreateTime = value;
				}
				get
				{
					return _CreateTime;
				}
			}
						private bool _UpdateTime = false;
			/// <summary>
			/// UpdateTime
			/// </summary>
			public bool UpdateTime
			{
				set
				{
					_UpdateTime = value;
				}
				get
				{
					return _UpdateTime;
				}
			}
						private bool _Status = false;
			/// <summary>
			/// Status
			/// </summary>
			public bool Status
			{
				set
				{
					_Status = value;
				}
				get
				{
					return _Status;
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