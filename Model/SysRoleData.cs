/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：SysRole
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
    /// DataEntity  SysRole
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class SysRoleData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public SysRoleData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _RoleID;
		/// <summary>
		/// RoleID
		/// </summary>
		public int RoleID
		{
			set{_RoleID = value;}
			get{return _RoleID;}
		}
		
				private string _RoleName;
		/// <summary>
		/// RoleName
		/// </summary>
		public string RoleName
		{
			set{_RoleName = value;}
			get{return _RoleName;}
		}
		
				private bool _Status;
		/// <summary>
		/// Status
		/// </summary>
		public bool Status
		{
			set{_Status = value;}
			get{return _Status;}
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
			            _RoleID = (int) dr["RoleID"];
			            _RoleName = (string) dr["RoleName"];
			            _Status = (bool) dr["Status"];
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
			            xe = xmlDoc.CreateElement("RoleID");
            xe.InnerText = ConvertHelper.ToString(_RoleID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("RoleName");
            xe.InnerText = ConvertHelper.ToString(_RoleName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Status");
            xe.InnerText = ConvertHelper.ToString(_Status);
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
						_RoleID = 0;
						_RoleName = string.Empty;
						_Status = false;
						_Remark = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            RoleID,
			            RoleName,
			            Status,
			            Remark,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(SysRoleData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.RoleID = RoleID == data.RoleID;
						same.RoleName = RoleName == data.RoleName;
						same.Status = Status == data.Status;
						same.Remark = Remark == data.Remark;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
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
						private bool _RoleName = false;
			/// <summary>
			/// RoleName
			/// </summary>
			public bool RoleName
			{
				set
				{
					_RoleName = value;
				}
				get
				{
					return _RoleName;
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