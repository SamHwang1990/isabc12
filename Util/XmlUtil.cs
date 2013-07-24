using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.IO;

namespace Hope.Util
{
    /// <summary>
    /// Xml工具类，一个实例对应于一个xml文件
    /// </summary>
    public class XmlUtil
    {
        private string path;

        private XmlDocument xmlDoc;

        /// <summary>
        /// 含参构造函数
        /// </summary>
        /// <param name="path">xml的完整物理路径</param>
        public XmlUtil(string path)
        {
            this.path = path;
            Init();    
        }

        /// <summary>
        /// 初始化
        /// </summary>
        private void Init()
        {
            xmlDoc = new XmlDocument();

            if(!File.Exists(path))
            {
                //创建xml 声明节点
                XmlNode xmlnode = xmlDoc.CreateNode(System.Xml.XmlNodeType.XmlDeclaration, "", "");
                //添加上述创建和 xml声明节点
                xmlDoc.AppendChild(xmlnode);
                //创建xml dbGuest 元素（根节点）
                XmlElement xmlelem = xmlDoc.CreateElement("", "Root", "");
                xmlDoc.AppendChild(xmlelem);
                try
                {
                    xmlDoc.Save(path);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            xmlDoc.Load(path);
        }
        
        /// <summary>
        /// 根据路径，读取节点的文本信息
        /// </summary>
        /// <param name="xpath"></param>
        /// <returns></returns>
        public string Read(string xpath)
        {
            XmlNode node = xmlDoc.SelectSingleNode(xpath);

            return node.InnerText;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void SetValue(string key, string value)
        {
            string xpath = string.Format("/{0}", key);
            xmlDoc.SelectSingleNode(xpath).InnerText = value;
        }

        /// <summary>
        /// 保存
        /// </summary>
        /// <returns></returns>
        public bool Save()
        {
            try
            {
                xmlDoc.Save(path);
            }
            catch (Exception e)
            {
                return false;
            }

            return true;
        }
    }
}
