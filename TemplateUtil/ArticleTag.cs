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
    /// 文章类标签，适用范围：内容页。
    /// 部分标签在其他页面也适用
    /// </summary>
    public partial class HopeTag
    {
        #region 私有成员

        private ContentArticleData _articleData = null;

        #endregion

        #region 构造方法

        /// <summary>
        /// 含参构造方法
        /// </summary>
        /// <param name="articleData"></param>
        public HopeTag(ContentArticleData articleData)
        {
            this._articleData = articleData;
        }

        #endregion

        #region 获取文章基本信息的标签

        /// <summary>
        /// 获取当前文章的实例
        /// </summary>
        /// <returns></returns>
        public ContentArticleData GetCurrentArticle()
        {
            return this._articleData;
        }

        /// <summary>
        /// 获取当前文章的标题
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetCurrentArticleTitle()}
        /// </example>
        /// <returns>当前文章的标题</returns>
        public string GetCurrentArticleTitle()
        {
            if (this._articleData == null)
            {
                return string.Empty;
            }

            return this._articleData.Title;
        }

        /// <summary>
        /// 获取当前文章的录入者
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetCurrentArticleInput()}
        /// </example>
        /// <returns></returns>
        public string GetCurrentArticleInput()
        {
            if (this._articleData == null)
            {
                return string.Empty;
            }

            return this._articleData.Inputor;
        }

        /// <summary>
        /// 获取当前文章的点击次数
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.GetCurrentArticleHits()}
        /// </example>
        /// <returns></returns>
        public int GetCurrentArticleHits()
        {
            if (this._articleData == null)
            {
                return 0;
            }

            return this._articleData.Hits;
        }

        /// <summary>
        /// 获取当前文章的更新时间
        /// </summary>
        /// <returns></returns>
        public DateTime GetCurrentArticleUpdateTime()
        {
            if (this._articleData == null)
            {
                return CommonClass.MinDateTime;
            }

            return this._articleData.UpdateTime;
        }

        /// <summary>
        /// 获取指定文章的url全路径
        /// </summary>
        /// <param name="articleData"></param>
        /// <returns></returns>
        public string GetArticleUrl(ContentArticleData articleData)
        {
            string url = string.Empty;

            //如果调用此方法的不是栏目页，则返回网站首页的url
            if (articleData == null)
            {
                url = CommonClass.WebMainPathURL;
            }
            else
            {
                url = string.Format("{0}/{1}/{2}.aspx", CommonClass.WebMainPathURL, "Item", articleData.GeneralID);
            }

            return url;
        }

        /// <summary>
        /// 获取当前文章的url全路径
        /// </summary>
        /// <returns></returns>
        public string GetCurrentArticleUrl()
        {
            return GetArticleUrl(this._articleData);
        }

        #endregion

    }
}
