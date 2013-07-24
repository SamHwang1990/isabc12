
/******************************************************************
 *
 * 所在模块：
 * 类 名 称：SystemMessage(系统处理消息)
 * 功能描述：系统处理过程中响应的消息
 * 
 * ------------创建信息------------------
 * 作    者：Xiaogug
 * 日    期：2008-07-20
 * xiaogug@163.com
 * MSN:xiaogug@hotmail.com
 * QQ:31805204
 * ------------编辑修改信息--------------
 * 作    者：江剑锋
 * 日    期：2013-01-12
 * 内    容：添加转为JSon的方法和属性
******************************************************************/
using System;
using System.Xml;
using System.Text;

namespace Hope.Util
{

    /// <summary>
    /// 系统响应信息
    /// </summary>
    public class SystemMessage
    {

        /// <summary>
        /// 系统响应信息
        /// </summary>
        public SystemMessage()
        {
            SetDefaultValues();
        }

        private string _Code;
        /// <summary>
        /// 消息代码
        /// </summary>
        public string Code
        {
            set { _Code = value; }
            get { return _Code; }
        }

        private string _Text;
        /// <summary>
        /// 消息内容
        /// </summary>
        public string Text
        {
            set { _Text = value; }
            get { return _Text; }
        }

        private bool _Succeed;
        /// <summary>
        /// 处理是否成功
        /// </summary>
        public bool Succeed
        {
            set { _Succeed = value; }
            get { return _Succeed; }
        }

        private string _Data1;
        /// <summary>
        /// 其他数据
        /// </summary>
        public string Data1
        {
            set { _Data1 = value; }
            get { return _Data1; }
        }

        private string _Data2;
        /// <summary>
        /// 其他数据
        /// </summary>
        public string Data2
        {
            set { _Data2 = value; }
            get { return _Data2; }
        }

        private string _Data3;
        /// <summary>
        /// 其他数据
        /// </summary>
        public string Data3
        {
            set { _Data3 = value; }
            get { return _Data3; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private XmlDocument ToXmlDocument()
        {
            try
            {
                XmlDocument xmlDoc = CommonClass.CreateXmlDoc();
                XmlNode xn = xmlDoc.CreateNode("element", "Item", "");

                XmlElement xe = xmlDoc.CreateElement("Code");
                xe.InnerText = _Code;
                xn.AppendChild(xe);

                xe = xmlDoc.CreateElement("Text");
                xe.InnerText = Text;
                xn.AppendChild(xe);

                xe = xmlDoc.CreateElement("Succeed");
                xe.InnerText = Succeed.ToString().ToLower();
                xn.AppendChild(xe);

                xe = xmlDoc.CreateElement("Data1");
                xe.InnerText = Data1.ToString().ToLower();
                xn.AppendChild(xe);

                xe = xmlDoc.CreateElement("Data2");
                xe.InnerText = Data2.ToString().ToLower();
                xn.AppendChild(xe);

                xe = xmlDoc.CreateElement("Data3");
                xe.InnerText = Data3.ToString().ToLower();
                xn.AppendChild(xe);     

                xmlDoc.DocumentElement.AppendChild(xn);
                return xmlDoc;
            }
            catch (Exception e)
            {
                LogUtil.error(e.Message);
                LogUtil.debug(e.Message);
                throw;
            }            
        }

        private XmlDocument _XmlDocument;
        /// <summary>
        /// 获取XML节点文档
        /// </summary>
        public XmlDocument XmlDocument
        {
            get
            {
                _XmlDocument = ToXmlDocument();
                return _XmlDocument;
            }
        }

        /// <summary>
        /// 转为json
        /// </summary>
        /// <returns></returns>
        private string ToJSon()
        {
            StringBuilder sb = new StringBuilder();

            sb.Append("{");
            sb.AppendFormat("\"Code\":\"{0}\"", Code);
            sb.AppendFormat(",\"success\":\"{0}\"", Succeed.ToString().ToLower());
            sb.AppendFormat(",\"Text\":\"{0}\"", Text);
            sb.AppendFormat(",\"Succeed\":\"{0}\"", Succeed.ToString().ToLower());
            sb.AppendFormat(",\"Data1\":\"{0}\"", Data1);
            sb.AppendFormat(",\"Data2\":\"{0}\"", Data2);
            sb.AppendFormat(",\"Data3\":\"{0}\"", Data3);
            sb.Append("}");

            return sb.ToString();
        }

        /// <summary>
        /// JSON
        /// </summary>
        private string _json;
        public string JSon
        {
            get 
            {
                _json = ToJSon();
                return _json;
            }
        }

        /// <summary>
        /// 设置默认值
        /// </summary>
        private void SetDefaultValues()
        {
            _Code = string.Empty;
            _Text = string.Empty;
            _Succeed = false;
            _Data1 = string.Empty;
            _Data2 = string.Empty;
            _Data3 = string.Empty;

        }
    }
}
