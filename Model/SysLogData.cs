/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：SysLog
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
    /// DataEntity  SysLog
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class SysLogData : IModel
    {

        /// <summary>
        /// DataEntity
        /// </summary>
        public SysLogData()
        {
            SetDefaultValues();
        }

        #region 属性
        private long _LogID;
        /// <summary>
        /// LogID
        /// </summary>
        public long LogID
        {
            set { _LogID = value; }
            get { return _LogID; }
        }

        private string _Account;
        /// <summary>
        /// Account
        /// </summary>
        public string Account
        {
            set { _Account = value; }
            get { return _Account; }
        }

        private string _Title;
        /// <summary>
        /// Title
        /// </summary>
        public string Title
        {
            set { _Title = value; }
            get { return _Title; }
        }

        private string _Message;
        /// <summary>
        /// Message
        /// </summary>
        public string Message
        {
            set { _Message = value; }
            get { return _Message; }
        }

        private DateTime _Time;
        /// <summary>
        /// Time
        /// </summary>
        public DateTime Time
        {
            set { _Time = value; }
            get { return _Time; }
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
            _LogID = (long)dr["LogID"];
            _Account = (string)dr["Account"];
            _Title = (string)dr["Title"];
            _Message = (string)dr["Message"];
            _Time = (DateTime)dr["Time"];
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
            xe = xmlDoc.CreateElement("LogID");
            xe.InnerText = ConvertHelper.ToString(_LogID);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("Account");
            xe.InnerText = ConvertHelper.ToString(_Account);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("Title");
            xe.InnerText = ConvertHelper.ToString(_Title);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("Message");
            xe.InnerText = ConvertHelper.ToString(_Message);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("Time");
            xe.InnerText = ConvertHelper.ToString(_Time);
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
            _LogID = 0;
            _Account = string.Empty;
            _Title = string.Empty;
            _Message = string.Empty;
            _Time = ConvertHelper.MinDateTime;
            _Remark = string.Empty;
        }

        /// <summary>
        /// 字段枚举
        /// </summary>
        public enum Columns
        {
            LogID,
            Account,
            Title,
            Message,
            Time,
            Remark,
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Same Compare(SysLogData data)
        {
            Same same = new Same();
            if (data == null)
            {
                return same;
            }
            same.LogID = LogID == data.LogID;
            same.Account = Account == data.Account;
            same.Title = Title == data.Title;
            same.Message = Message == data.Message;
            same.Time = Time == data.Time;
            same.Remark = Remark == data.Remark;

            return same;
        }

        /// <summary>
        /// 
        /// </summary>
        public class Same
        {
            private bool _LogID = false;
            /// <summary>
            /// LogID
            /// </summary>
            public bool LogID
            {
                set
                {
                    _LogID = value;
                }
                get
                {
                    return _LogID;
                }
            }
            private bool _Account = false;
            /// <summary>
            /// Account
            /// </summary>
            public bool Account
            {
                set
                {
                    _Account = value;
                }
                get
                {
                    return _Account;
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
            private bool _Message = false;
            /// <summary>
            /// Message
            /// </summary>
            public bool Message
            {
                set
                {
                    _Message = value;
                }
                get
                {
                    return _Message;
                }
            }
            private bool _Time = false;
            /// <summary>
            /// Time
            /// </summary>
            public bool Time
            {
                set
                {
                    _Time = value;
                }
                get
                {
                    return _Time;
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