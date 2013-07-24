/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentModel
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
    /// DataEntity  ContentModel
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentModelData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentModelData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _ModelID;
		/// <summary>
		/// ModelID
		/// </summary>
		public int ModelID
		{
			set{_ModelID = value;}
			get{return _ModelID;}
		}
		
				private string _ModelName;
		/// <summary>
		/// ModelName
		/// </summary>
		public string ModelName
		{
			set{_ModelName = value;}
			get{return _ModelName;}
		}
		
				private string _TableName;
		/// <summary>
		/// TableName
		/// </summary>
		public string TableName
		{
			set{_TableName = value;}
			get{return _TableName;}
		}
		
				private string _ItemName;
		/// <summary>
		/// ItemName
		/// </summary>
		public string ItemName
		{
			set{_ItemName = value;}
			get{return _ItemName;}
		}
		
				private string _ItemUnit;
		/// <summary>
		/// ItemUnit
		/// </summary>
		public string ItemUnit
		{
			set{_ItemUnit = value;}
			get{return _ItemUnit;}
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
			            _ModelID = (int) dr["ModelID"];
			            _ModelName = (string) dr["ModelName"];
			            _TableName = (string) dr["TableName"];
			            _ItemName = (string) dr["ItemName"];
			            _ItemUnit = (string) dr["ItemUnit"];
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
			            xe = xmlDoc.CreateElement("ModelID");
            xe.InnerText = ConvertHelper.ToString(_ModelID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ModelName");
            xe.InnerText = ConvertHelper.ToString(_ModelName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("TableName");
            xe.InnerText = ConvertHelper.ToString(_TableName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ItemName");
            xe.InnerText = ConvertHelper.ToString(_ItemName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ItemUnit");
            xe.InnerText = ConvertHelper.ToString(_ItemUnit);
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
						_ModelID = 0;
						_ModelName = string.Empty;
						_TableName = string.Empty;
						_ItemName = string.Empty;
						_ItemUnit = string.Empty;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            ModelID,
			            ModelName,
			            TableName,
			            ItemName,
			            ItemUnit,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(ContentModelData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.ModelID = ModelID == data.ModelID;
						same.ModelName = ModelName == data.ModelName;
						same.TableName = TableName == data.TableName;
						same.ItemName = ItemName == data.ItemName;
						same.ItemUnit = ItemUnit == data.ItemUnit;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
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
						private bool _ModelName = false;
			/// <summary>
			/// ModelName
			/// </summary>
			public bool ModelName
			{
				set
				{
					_ModelName = value;
				}
				get
				{
					return _ModelName;
				}
			}
						private bool _TableName = false;
			/// <summary>
			/// TableName
			/// </summary>
			public bool TableName
			{
				set
				{
					_TableName = value;
				}
				get
				{
					return _TableName;
				}
			}
						private bool _ItemName = false;
			/// <summary>
			/// ItemName
			/// </summary>
			public bool ItemName
			{
				set
				{
					_ItemName = value;
				}
				get
				{
					return _ItemName;
				}
			}
						private bool _ItemUnit = false;
			/// <summary>
			/// ItemUnit
			/// </summary>
			public bool ItemUnit
			{
				set
				{
					_ItemUnit = value;
				}
				get
				{
					return _ItemUnit;
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