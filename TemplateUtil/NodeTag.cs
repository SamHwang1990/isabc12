using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hope.Model;
using Hope.BLL;
using Hope.Util;

namespace Hope.TemplateUtil
{
    /// <summary>
    /// 节点标签，使用范围：栏目页，个别标签在其他页面也可是使用
    /// </summary>
    public partial class HopeTag
    {
        #region 私有成员

        private ContentNodeData _nodeData = null;

        #endregion

        #region 构造方法

        /// <summary>
        /// 含参构造方法。如果当前页是栏目页，则调用此构造方法，传入当前节点ID
        /// 并完整实例化
        /// </summary>
        /// <param name="nodeID">当前节点ID</param>
        //public HopeTag(int nodeID)
        //{
        //    ContentNodeBLL bll = ContentNodeBLL.GetInstance();
        //    this.nodeData = bll.GetDataById(nodeID);
        //}

        /// <summary>
        /// 重载构造方法，传入节点实例
        /// </summary>
        /// <param name="nodeData"></param>
        public HopeTag(ContentNodeData nodeData)
        {
            this._nodeData = nodeData;
        }

        #endregion

        #region 获取节点基本信息的标签

        /// <summary>
        /// 获取当前节点的实例
        /// </summary>
        /// <returns></returns>
        public ContentNodeData GetCurrentNode()
        {
            return this._nodeData;
        }

        /// <summary>
        /// 根据传入的ID，获取节点实例的集合，每个ID以逗号“，”分隔开，组合成字符串作为参数。
        /// 适用范围：所有页面
        /// <example>
        /// 调用：${HopeTag.GetNodesByIDs('2,3,4,5')}
        /// </example>
        /// </summary>
        /// <param name="IDs">参数形式“1，2，3，4”</param>
        /// <returns></returns>
        public List<ContentNodeData> GetNodesByIDs(string IDs)
        {
            List<int> IDList = ConvertHelper.ToIntList(IDs);
            ContentNodeBLL bll = ContentNodeBLL.GetInstance();
            List<ContentNodeData> nodeDatas = new List<ContentNodeData>();

            foreach (int nodeID in IDList)
            {
                ContentNodeData nodeData = bll.GetDataById(nodeID);
                if (nodeData != null)
                {
                    nodeDatas.Add(nodeData);
                }
            }

            return nodeDatas;
        }


        /// <summary>
        /// 获取当前节点ID
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetCurrentNodeID()}
        /// </example>
        /// <returns>
        /// 如果nodeData本身为空，则返回-1；
        /// 正常返回：int型的当前节点ID
        /// </returns>
        public int GetCurrentNodeID()
        {
            return this._nodeData != null ? this._nodeData.NodeID : 0;
        }

        /// <summary>
        /// 获取当前节点名称
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetCurrentNodeName()}
        /// </example>
        /// <returns>
        /// 如果nodeData本身为空，则返回string.Empty；
        /// 正常返回：string型的当前节点名称
        /// </returns>
        public string GetCurrentNodeName()
        {
            return this._nodeData != null ? this._nodeData.NodeName : string.Empty;
        }

        /// <summary>
        /// 获取当前节点的英文名称
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetCurrentNodeEnName()}
        /// </example>
        /// <returns>
        /// 如果nodeData本身为空，则返回string.Empty；
        /// 正常返回：string型的当前节点英文名称
        /// </returns>
        public string GetCurrentNodeEnName()
        {
            return this._nodeData != null ? this._nodeData.NodeEnName : string.Empty;
        }

        /// <summary>
        /// 获取当前节点的完整访问路径，包含协议名，主机名，虚拟目录名，文件路径等
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetCurrentNodeUrl()}
        /// </example>
        /// <returns>
        /// 当前节点的完整访问路径，包含协议名，主机名，虚拟目录名，文件路径等
        /// 例如：http://ce.sysu.edu.cn/hope/Category/10.aspx
        /// 如果调用此方法的不是栏目页，则返回网站首页的url
        /// </returns>
        public string GetCurrentNodeUrl()
        {
            return GetNodeUrl(this._nodeData);
        }

        /// <summary>
        /// 获取指定节点的完整访问路径，包含协议名，主机名，虚拟目录名，文件路径等。
        /// 适用范围：所有页面
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetNodeUrl(ContentNodeData nodeData)}
        /// </example>
        /// <param name="nodeData">指定节点实例</param>
        /// <returns>
        /// 指定节点的完整访问路径，包含协议名，主机名，虚拟目录名，文件路径等
        /// 例如：http://ce.sysu.edu.cn/hope/Category/10.aspx
        /// 如果传入的参数为空，则返回首页的节点
        /// </returns>
        public string GetNodeUrl(ContentNodeData nodeData)
        {
            string url = string.Empty;

            //如果调用此方法的不是栏目页，则返回网站首页的url
            if (nodeData == null)
            {
                url = CommonClass.WebMainPathURL;
            }
            else
            {
                url = string.Format("{0}/{1}/{2}.aspx", CommonClass.WebMainPathURL, "Category", nodeData.NodeID);
            }

            return url;
        }

        #endregion

        #region 子节点操作相关标签

        /// <summary>
        /// 获取当前节点的直接子节点的集合。
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetSubNodes()}
        /// </example>
        /// <returns>
        /// 返回：当前节点直接子节点的集合，
        /// 特别地，如果在首页或者其他页面调用，则返回一级节点的集合
        /// </returns>
        public List<ContentNodeData> GetSubNodes()
        {
            ContentNodeBLL bll = ContentNodeBLL.GetInstance();
            List<ContentNodeData> nodeDatas = null;
            if (this._nodeData == null)
            {
                nodeDatas = bll.GetDatasByParentID(1);
            }
            else
            {
                nodeDatas = bll.GetDatasByParentID(this._nodeData.NodeID);
            }
            return nodeDatas;
        }

        /// <summary>
        /// 获取当前节点的直接子节点的集合。
        /// </summary>
        /// <param name="depth">节点深度，例如：为1时，表示获取当前节点下的一级节点的集合</param>
        /// <returns>
        /// 返回：当前节点的指定深度的子节点的集合
        /// </returns>
        public List<ContentNodeData> GetSubNodes(int depth)
        {
            ContentNodeBLL bll = ContentNodeBLL.GetInstance();
            List<ContentNodeData> nodeDatas = null;

            return nodeDatas;
        }

        #endregion
        
        #region 节点下的文章操作相关标签

        /// <summary>
        /// 获取当前栏目下，最新的文章实例的集合。不包含子栏目的文章
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetNeweastArticle(10)}
        /// 说明：获取本节点下，最新的前十篇文章。不包含子栏目。
        /// 备注：文章新旧顺序按创建时间排序
        /// </example>
        /// <param name="count">要获取的最新的文章数量</param>
        /// <returns></returns>
        public List<ContentArticleData> GetNewestArticles(int count)
        {
            return GetNewestArticles(this._nodeData, count);
        }

        /// <summary>
        /// 获取指定栏目下，最新文章实例的集合。
        /// </summary>
        /// <param name="nodeData"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<ContentArticleData> GetNewestArticles(ContentNodeData nodeData, int count)
        {
            ContentArticleBLL bll = ContentArticleBLL.GetInstance();
            List<ContentArticleData> articleDatas = new List<ContentArticleData>();
            if (nodeData == null)
            {
                return articleDatas;
            }

            articleDatas = bll.GetNewestDatasByNodeID(nodeData.NodeID, count);

            return articleDatas;
        }

        #endregion

    }
}
