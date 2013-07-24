/******************************************************************
 * 日　　期：2013年02月16日
 * 所在模块：DataEntity (数据实体)
 * 类 名 称：SysAdmin
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
    /// DataEntity  SysAdmin
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class SysAdminData : IModel
    {

        /// <summary>
        /// DataEntity
        /// </summary>
        public SysAdminData()
        {
            SetDefaultValues();
        }

        #region 属性
        private int _AdminID;
        /// <summary>
        /// AdminID
        /// </summary>
        public int AdminID
        {
            set { _AdminID = value; }
            get { return _AdminID; }
        }

        private int _RoleID;
        /// <summary>
        /// RoleID
        /// </summary>
        public int RoleID
        {
            set { _RoleID = value; }
            get { return _RoleID; }
        }

        private string _AdminName;
        /// <summary>
        /// AdminName
        /// </summary>
        public string AdminName
        {
            set { _AdminName = value; }
            get { return _AdminName; }
        }

        private string _Password;
        /// <summary>
        /// Password
        /// </summary>
        public string Password
        {
            set { _Password = value; }
            get { return _Password; }
        }

        private DateTime _RegTime;
        /// <summary>
        /// RegTime
        /// </summary>
        public DateTime RegTime
        {
            set { _RegTime = value; }
            get { return _RegTime; }
        }

        private int _LoginTimes;
        /// <summary>
        /// LoginTimes
        /// </summary>
        public int LoginTimes
        {
            set { _LoginTimes = value; }
            get { return _LoginTimes; }
        }

        private DateTime _LastLoginTime;
        /// <summary>
        /// LastLoginTime
        /// </summary>
        public DateTime LastLoginTime
        {
            set { _LastLoginTime = value; }
            get { return _LastLoginTime; }
        }

        private bool _Status;
        /// <summary>
        /// Status
        /// </summary>
        public bool Status
        {
            set { _Status = value; }
            get { return _Status; }
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
            _AdminID = (int)dr["AdminID"];
            _RoleID = (int)dr["RoleID"];
            _AdminName = (string)dr["AdminName"];
            _Password = (string)dr["Password"];
            _RegTime = (DateTime)dr["RegTime"];
            _LoginTimes = (int)dr["LoginTimes"];
            _LastLoginTime = (DateTime)dr["LastLoginTime"];
            _Status = (bool)dr["Status"];
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
            xe = xmlDoc.CreateElement("AdminID");
            xe.InnerText = ConvertHelper.ToString(_AdminID);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("RoleID");
            xe.InnerText = ConvertHelper.ToString(_RoleID);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("AdminName");
            xe.InnerText = ConvertHelper.ToString(_AdminName);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("Password");
            xe.InnerText = ConvertHelper.ToString(_Password);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("RegTime");
            xe.InnerText = ConvertHelper.ToString(_RegTime);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("LoginTimes");
            xe.InnerText = ConvertHelper.ToString(_LoginTimes);
            xn.AppendChild(xe);
            xe = xmlDoc.CreateElement("LastLoginTime");
            xe.InnerText = ConvertHelper.ToString(_LastLoginTime);
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
            _AdminID = 0;
            _RoleID = 0;
            _AdminName = string.Empty;
            _Password = string.Empty;
            _RegTime = ConvertHelper.MinDateTime;
            _LoginTimes = 0;
            _LastLoginTime = ConvertHelper.MinDateTime;
            _Status = false;
            _Remark = string.Empty;
        }

        /// <summary>
        /// 字段枚举
        /// </summary>
        public enum Columns
        {
            AdminID,
            RoleID,
            AdminName,
            Password,
            RegTime,
            LoginTimes,
            LastLoginTime,
            Status,
            Remark,
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Same Compare(SysAdminData data)
        {
            Same same = new Same();
            if (data == null)
            {
                return same;
            }
            same.AdminID = AdminID == data.AdminID;
            same.RoleID = RoleID == data.RoleID;
            same.AdminName = AdminName == data.AdminName;
            same.Password = Password == data.Password;
            same.RegTime = RegTime == data.RegTime;
            same.LoginTimes = LoginTimes == data.LoginTimes;
            same.LastLoginTime = LastLoginTime == data.LastLoginTime;
            same.Status = Status == data.Status;
            same.Remark = Remark == data.Remark;

            return same;
        }

        /// <summary>
        /// 
        /// </summary>
        public class Same
        {
            private bool _AdminID = false;
            /// <summary>
            /// AdminID
            /// </summary>
            public bool AdminID
            {
                set
                {
                    _AdminID = value;
                }
                get
                {
                    return _AdminID;
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
            private bool _AdminName = false;
            /// <summary>
            /// AdminName
            /// </summary>
            public bool AdminName
            {
                set
                {
                    _AdminName = value;
                }
                get
                {
                    return _AdminName;
                }
            }
            private bool _Password = false;
            /// <summary>
            /// Password
            /// </summary>
            public bool Password
            {
                set
                {
                    _Password = value;
                }
                get
                {
                    return _Password;
                }
            }
            private bool _RegTime = false;
            /// <summary>
            /// RegTime
            /// </summary>
            public bool RegTime
            {
                set
                {
                    _RegTime = value;
                }
                get
                {
                    return _RegTime;
                }
            }
            private bool _LoginTimes = false;
            /// <summary>
            /// LoginTimes
            /// </summary>
            public bool LoginTimes
            {
                set
                {
                    _LoginTimes = value;
                }
                get
                {
                    return _LoginTimes;
                }
            }
            private bool _LastLoginTime = false;
            /// <summary>
            /// LastLoginTime
            /// </summary>
            public bool LastLoginTime
            {
                set
                {
                    _LastLoginTime = value;
                }
                get
                {
                    return _LastLoginTime;
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