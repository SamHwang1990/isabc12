/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：ContentTemplate
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
    /// DataEntity  ContentTemplate
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class ContentTemplateData : IModel
    {

        /// <summary>
        /// DataEntity
        /// </summary>
        public ContentTemplateData()
        {
            SetDefaultValues();
        }

        #region 属性
        private int _TemplateID;
        /// <summary>
        /// TemplateID
        /// </summary>
        public int TemplateID
        {
            set { _TemplateID = value; }
            get { return _TemplateID; }
        }

        private int _CategoryID;
        /// <summary>
        /// CategoryID
        /// </summary>
        public int CategoryID
        {
            set { _CategoryID = value; }
            get { return _CategoryID; }
        }

        private string _TemplateName;
        /// <summary>
        /// TemplateName
        /// </summary>
        public string TemplateName
        {
            set { _TemplateName = value; }
            get { return _TemplateName; }
        }

        private string _TemplateContent;
        /// <summary>
        /// TemplateContent
        /// </summary>
        public string TemplateContent
        {
            set { _TemplateContent = value; }
            get { return _TemplateContent; }
        }

        private string _FileName;
        /// <summary>
        /// FileName
        /// </summary>
        public string FileName
        {
            set { _FileName = value; }
            get { return _FileName; }
        }

        private bool _IsGenerate;
        /// <summary>
        /// IsGenerate
        /// </summary>
        public bool IsGenerate
        {
            set { _IsGenerate = value; }
            get { return _IsGenerate; }
        }

        private string _Remark;
        /// <summary>
        /// Remark
        /// </summary>
        public string Remark
        {
            set { _Remark = value; }
            get { return _Remark; }
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
            _TemplateID = (int)dr["TemplateID"];
            _CategoryID = (int)dr["CategoryID"];
            _TemplateName = (string)dr["TemplateName"];
            _TemplateContent = (string)dr["TemplateContent"];
            _FileName = (string)dr["FileName"];
            _IsGenerate = (bool)dr["IsGenerate"];
            _Remark = (string)dr["Remark"];
        }

        /// <summary>
        /// 转换为XML节点
        /// </summary>
        /// <param name="parentDoc">父XML文档</param>
        /// <returns>返回XML文档节点</returns>
        public XmlNode ToXmlNode(XmlDocument parentDoc)
        {
            return ToXmlNode(parentDoc, "Item");
        }

        /// <summary>
        /// 转换为XML节点
        /// </summary>
        /// <param name="parentDoc">父XML文档</param>
        /// <param name="nodeName">节点名</param>
        /// <returns>返回XML文档节点</returns>
        public XmlNode ToXmlNode(XmlDocument parentDoc, string nodeName)
        {
            XmlDocument xmlDoc = parentDoc;
            if (xmlDoc == null)
            {
                xmlDoc = CommonClass.CreateXmlDoc();
            }
            XmlNode xn = parentDoc.CreateNode("element", nodeName, "");
            XmlElement xe;
            xe = xmlDoc.CreateElement("TemplateID");
            xe.InnerText = ConvertHelper.ToString(_TemplateID);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("CategoryID");
            xe.InnerText = ConvertHelper.ToString(_CategoryID);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("TemplateName");
            xe.InnerText = ConvertHelper.ToString(_TemplateName);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("TemplateContent");
            xe.InnerText = ConvertHelper.ToString(_TemplateContent);
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
            _TemplateID = 0;
            _CategoryID = 0;
            _TemplateName = string.Empty;
            _TemplateContent = string.Empty;
            _FileName = string.Empty;
            _IsGenerate = false;
            _Remark = string.Empty;
        }

        /// <summary>
        /// 字段枚举
        /// </summary>
        public enum Columns
        {
            TemplateID,
            CategoryID,
            TemplateName,
            TemplateContent,
            FileName,
            IsGenerate,
            Remark,
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Same Compare(ContentTemplateData data)
        {
            Same same = new Same();
            if (data == null)
            {
                return same;
            }
            same.TemplateID = TemplateID == data.TemplateID;
            same.CategoryID = CategoryID == data.CategoryID;
            same.TemplateName = TemplateName == data.TemplateName;
            same.TemplateContent = TemplateContent == data.TemplateContent;
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
            private bool _TemplateID = false;
            /// <summary>
            /// TemplateID
            /// </summary>
            public bool TemplateID
            {
                set
                {
                    _TemplateID = value;
                }
                get
                {
                    return _TemplateID;
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
            private bool _TemplateName = false;
            /// <summary>
            /// TemplateName
            /// </summary>
            public bool TemplateName
            {
                set
                {
                    _TemplateName = value;
                }
                get
                {
                    return _TemplateName;
                }
            }
            private bool _TemplateContent = false;
            /// <summary>
            /// TemplateContent
            /// </summary>
            public bool TemplateContent
            {
                set
                {
                    _TemplateContent = value;
                }
                get
                {
                    return _TemplateContent;
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