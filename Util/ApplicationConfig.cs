using System;
using System.Configuration;
using System.Text;
using System.Web;

namespace Hope.Util
{
    /// <summary>
    /// 系统应用配置
    /// </summary>
    public class ApplicationConfig
    {
        /// <summary>
        /// 系统应用配置
        /// </summary>
        public ApplicationConfig() { }


        private static string _TemplateRootDir;
        /// <summary>
        /// 网站模板物理根目录，全路径，以盘符开头，以路径分隔符结尾
        /// </summary>
        public static string TemplateRootDir
        {
            get
            {
                if (_TemplateRootDir == null || _TemplateRootDir == string.Empty)
                {
                    _TemplateRootDir = CommonClass.GetMapPath(ConfigurationManager.AppSettings["TemplateRootDir"]);
                    if (!_TemplateRootDir.EndsWith(@"\"))
                    {
                        _TemplateRootDir += @"\";
                    }
                }

                return _TemplateRootDir;
            }
        }

        private static string _SiteConfigPath;
        /// <summary>
        /// 网站配置信息路径
        /// </summary>
        public static string SiteConfigPath
        {
            get
            {
                if (_SiteConfigPath == null || _SiteConfigPath == string.Empty)
                {
                    _SiteConfigPath = CommonClass.GetMapPath(ConfigurationManager.AppSettings["SiteConfigPath"]);
                }

                return _SiteConfigPath;
            }
        }

        private static string _DBType;
        /// <summary>
        /// 获取当前使用数据库类型
        /// </summary>
        public static string DBType
        {
            get
            {
                if (_DBType == null || _DBType == string.Empty)
                {
                    _DBType = ConfigurationManager.AppSettings["DBType"];
                }
                return _DBType;
            }
        }

        private static string _WebMainPathURL;
        /// <summary>
        /// 获取当前WEB应用主目录地址
        /// <!--WebMainPathURL 后不需要反斜杠 / -->
        /// </summary>
        /// <remarks>
        /// 应用于在服务器端使用~/代替
        /// </remarks>
        public static string WebMainPathURL
        {
            get
            {
                if (_WebMainPathURL == null)
                {
                    if (CommonClass.GetServerPort == 80)
                    {
                        _WebMainPathURL = string.Format("http://{0}{1}", CommonClass.GetServerHost, HttpContext.Current.Request.ApplicationPath); 
                    }
                    else
                    {
                        _WebMainPathURL = string.Format("http://{0}:{1}{2}", CommonClass.GetServerHost, CommonClass.GetServerPort, HttpContext.Current.Request.ApplicationPath);
                    }
                }

                return _WebMainPathURL;
            }
        }

        private static string _DBConnectionString;
        /// <summary>
        /// 数据库连接字串
        /// </summary>
        public static string DBConnectionString
        {
            get
            {
                if (_DBConnectionString == null || _DBConnectionString == string.Empty)
                {
                    _DBConnectionString = ConfigurationManager.ConnectionStrings["SQLConnString"].ConnectionString;
                }
                return _DBConnectionString;
            }
        }

        private static string _ApplicationVersion;
        /// <summary>
        /// 程序的版本号
        /// </summary>
        public static string ApplicationVersion
        {
            get
            {
                if (_ApplicationVersion == null)
                {
                    _ApplicationVersion += ConfigurationManager.AppSettings["MainVersion"];
                    _ApplicationVersion += string.Format(".{0}", ConfigurationManager.AppSettings["MinorVersion"]);
                    _ApplicationVersion += string.Format(".{0}", ConfigurationManager.AppSettings["BuildVersion"]);
                    _ApplicationVersion += string.Format(" {0}", ConfigurationManager.AppSettings["Version"]);
                }

                return _ApplicationVersion;
            }
        }

    }
}
