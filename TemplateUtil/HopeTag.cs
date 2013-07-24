using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hope.Model;
using Hope.Util;

namespace Hope.TemplateUtil
{
    /// <summary>
    /// HopeTag系统内置标签
    /// 通用API，适用范围：所有页面
    /// </summary>
    public partial class HopeTag
    {
        #region 构造方法

        /// <summary>
        /// 无参构造方法
        /// </summary>
        public HopeTag()
        { 
        
        }

        #endregion

        #region 网站配置信息标签

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetSiteName()
        {
            return SiteConfig.SiteName;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetMasterName()
        {
            return SiteConfig.MasterName;
        }

        public string GetCopyright()
        {
            return SiteConfig.Copyright;
        }

        #endregion

        #region 风格操作标签

        /// <summary>
        /// 取得默认风格的完整url，包括协议名，主机名，虚拟目录，文件路径
        /// </summary>
        /// <returns></returns>
        public string GetDefaultStyleUrl()
        {
            return string.Empty;
        }

        /// <summary>
        /// 取得指定风格的完整url，包括协议名，主机名，虚拟目录，文件路径
        /// </summary>
        /// <param name="styleName"></param>
        /// <returns></returns>
        public string GetStyleUrl(string styleName)
        {
            return string.Empty;
        }

        #endregion

        #region 字符串操作工具标签
        
        /// <summary>
        /// 截取字符串指定长度，截取掉的部分，用指定的字符替换掉
        /// </summary>
        /// <example>
        /// 调用：${HopeTag.SubString("今天是个好日子", 3, "...")}
        /// 返回：“今天是...”
        /// </example>
        /// <param name="value">原字符串</param>
        /// <param name="length">剩余的长度</param>
        /// <param name="replaceChar">替换字符</param>
        /// <returns></returns>
        public string SubString(string value, int length, string replaceChar)
        {
            if (value.Length <= length)
            {
                return value;
            }
            
            string result = value.Substring(0, length);
            result += replaceChar;

            return result;
        }

        /// <summary>
        /// 重载方法，如果不传入替换字符串，则使用“...”代替
        /// </summary>
        /// <param name="value"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        public string SubString(string value, int length)
        {
            return SubString(value, length, "...");
        }

        #endregion
    }
}
