/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：SysFunctionValue
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
    /// DataEntity  SysFunctionValue
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class SysFunctionValueData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public SysFunctionValueData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _ValueID;
		/// <summary>
		/// ValueID
		/// </summary>
		public int ValueID
		{
			set{_ValueID = value;}
			get{return _ValueID;}
		}
		
				private int _RoleID;
		/// <summary>
		/// RoleID
		/// </summary>
		public int RoleID
		{
			set{_RoleID = value;}
			get{return _RoleID;}
		}
		
				private int _ModuleID;
		/// <summary>
		/// ModuleID
		/// </summary>
		public int ModuleID
		{
			set{_ModuleID = value;}
			get{return _ModuleID;}
		}
		
				private int _FunctionValues;
		/// <summary>
		/// FunctionValues
		/// </summary>
		public int FunctionValues
		{
			set{_FunctionValues = value;}
			get{return _FunctionValues;}
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
			            _ValueID = (int) dr["ValueID"];
			            _RoleID = (int) dr["RoleID"];
			            _ModuleID = (int) dr["ModuleID"];
			            _FunctionValues = (int) dr["FunctionValues"];
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
			            xe = xmlDoc.CreateElement("ValueID");
            xe.InnerText = ConvertHelper.ToString(_ValueID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("RoleID");
            xe.InnerText = ConvertHelper.ToString(_RoleID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("ModuleID");
            xe.InnerText = ConvertHelper.ToString(_ModuleID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FunctionValues");
            xe.InnerText = ConvertHelper.ToString(_FunctionValues);
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
						_ValueID = 0;
						_RoleID = 0;
						_ModuleID = 0;
						_FunctionValues = 0;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            ValueID,
			            RoleID,
			            ModuleID,
			            FunctionValues,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(SysFunctionValueData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.ValueID = ValueID == data.ValueID;
						same.RoleID = RoleID == data.RoleID;
						same.ModuleID = ModuleID == data.ModuleID;
						same.FunctionValues = FunctionValues == data.FunctionValues;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _ValueID = false;
			/// <summary>
			/// ValueID
			/// </summary>
			public bool ValueID
			{
				set
				{
					_ValueID = value;
				}
				get
				{
					return _ValueID;
				}
			}
						private bool _RoleID = false;
			/// <summary>
			/// RoleID
			/// </summary>
			public bool RoleID
			{
				set
				{
					_RoleID = value;
				}
				get
				{
					return _RoleID;
				}
			}
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
						private bool _FunctionValues = false;
			/// <summary>
			/// FunctionValues
			/// </summary>
			public bool FunctionValues
			{
				set
				{
					_FunctionValues = value;
				}
				get
				{
					return _FunctionValues;
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