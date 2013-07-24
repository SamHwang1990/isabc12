/******************************************************************
 * 日　　期：2013年05月03日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：HPUUpload
 * 功能描述：
 * 
******************************************************************/


using System;
using System.Data;
using System.Xml;
using System.Text;

using Hope.Enums;
using Hope.Model;
using Hope.Util;
using Newtonsoft.Json;

namespace Hope.Model
{
    /// <summary>
    /// DataEntity  HPUUpload
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class HPUUploadData : IModel
    {
        
        /// <summary>
        /// DataEntity
        /// </summary>
        public HPUUploadData()
        {
            SetDefaultValues();
        }
        
        #region 属性
				private int _FileID;
		/// <summary>
		/// FileID
		/// </summary>
		public int FileID
		{
			set{_FileID = value;}
			get{return _FileID;}
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
		
				private string _FilePath;
		/// <summary>
		/// FilePath
		/// </summary>
		public string FilePath
		{
			set{_FilePath = value;}
			get{return _FilePath;}
		}
		
				private string _FileType;
		/// <summary>
		/// FileType
		/// </summary>
		public string FileType
		{
			set{_FileType = value;}
			get{return _FileType;}
		}
		
				private int _UserID;
		/// <summary>
		/// UserID
		/// </summary>
		public int UserID
		{
			set{_UserID = value;}
			get{return _UserID;}
		}
		
				private string _Summary;
		/// <summary>
		/// Summary
		/// </summary>
		public string Summary
		{
			set{_Summary = value;}
			get{return _Summary;}
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
			            _FileID = (int) dr["FileID"];
			            _FileName = (string) dr["FileName"];
			            _FilePath = (string) dr["FilePath"];
			            _FileType = (string) dr["FileType"];
			            _UserID = (int) dr["UserID"];
			            _Summary = (string) dr["Summary"];
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
			            xe = xmlDoc.CreateElement("FileID");
            xe.InnerText = ConvertHelper.ToString(_FileID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FileName");
            xe.InnerText = ConvertHelper.ToString(_FileName);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FilePath");
            xe.InnerText = ConvertHelper.ToString(_FilePath);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("FileType");
            xe.InnerText = ConvertHelper.ToString(_FileType);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("UserID");
            xe.InnerText = ConvertHelper.ToString(_UserID);
            xn.AppendChild(xe);
			            xe = xmlDoc.CreateElement("Summary");
            xe.InnerText = ConvertHelper.ToString(_Summary);
            xn.AppendChild(xe);
			            
            return xn;
        }
		
		/// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
						_FileID = 0;
						_FileName = string.Empty;
						_FilePath = string.Empty;
						_FileType = string.Empty;
						_UserID = 0;
						_Summary = string.Empty;
					}
		
		/// <summary>
        /// 字段枚举
        /// </summary>
		public enum Columns
		{
			            FileID,
			            FileName,
			            FilePath,
			            FileType,
			            UserID,
			            Summary,
					}
		
		/// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
		public Same Compare(HPUUploadData data)
        {
			Same same = new Same();
			if(data == null)
			{
				return same;
			}
						same.FileID = FileID == data.FileID;
						same.FileName = FileName == data.FileName;
						same.FilePath = FilePath == data.FilePath;
						same.FileType = FileType == data.FileType;
						same.UserID = UserID == data.UserID;
						same.Summary = Summary == data.Summary;
						
			return same;
		}
		
		/// <summary>
        /// 
        /// </summary>
		public class Same
        {
						private bool _FileID = false;
			/// <summary>
			/// FileID
			/// </summary>
			public bool FileID
			{
				set
				{
					_FileID = value;
				}
				get
				{
					return _FileID;
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
						private bool _FilePath = false;
			/// <summary>
			/// FilePath
			/// </summary>
			public bool FilePath
			{
				set
				{
					_FilePath = value;
				}
				get
				{
					return _FilePath;
				}
			}
						private bool _FileType = false;
			/// <summary>
			/// FileType
			/// </summary>
			public bool FileType
			{
				set
				{
					_FileType = value;
				}
				get
				{
					return _FileType;
				}
			}
						private bool _UserID = false;
			/// <summary>
			/// UserID
			/// </summary>
			public bool UserID
			{
				set
				{
					_UserID = value;
				}
				get
				{
					return _UserID;
				}
			}
						private bool _Summary = false;
			/// <summary>
			/// Summary
			/// </summary>
			public bool Summary
			{
				set
				{
					_Summary = value;
				}
				get
				{
					return _Summary;
				}
			}
					}
		
		
    }
}