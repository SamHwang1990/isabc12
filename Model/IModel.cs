using System.Data;
using System.Xml;

namespace Hope.Model
{
    /// <summary>
    /// 数据实体基类接口
    /// </summary>
    public interface IModel
    {
        /// <summary>
        /// 加载数据
        /// </summary>
        /// <param name="dr">数据库记录</param>
        void LoadData(IDataRecord dr);

        /// <summary>
        /// XML文档
        /// </summary>
        /// <param name="parentDoc">XML文档</param>
        /// <returns>返回XML节点</returns>
        XmlNode ToXmlNode(XmlDocument parentDoc);
    }
}
