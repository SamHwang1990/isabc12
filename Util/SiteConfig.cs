using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Hope.Util
{
    /// <summary>
    /// 网站配置信息，读写同步
    /// </summary>
    public class SiteConfig
    {
        private static XmlUtil util = new XmlUtil(ApplicationConfig.SiteConfigPath);

        public static string SiteName
        {
            get 
            {
                return util.Read("SiteConfig/SiteName");
            }

            set
            {
                util.SetValue("SiteConfig/SiteName", value);
                util.Save();
            }
        }

        public static string MasterName
        {
            get
            {
                return util.Read("SiteConfig/MasterName");
            }

            set
            {
                util.SetValue("SiteConfig/MasterName", value);
                util.Save();
            }
        }

        public static string MasterEmail
        {
            get
            {
                return util.Read("SiteConfig/MasterEmail");
            }

            set
            {
                util.SetValue("SiteConfig/MasterEmail", value);
                util.Save();
            }
        }

        public static string MetaKeywords
        {
            get
            {
                return util.Read("SiteConfig/MetaKeywords");
            }

            set
            {
                util.SetValue("SiteConfig/MetaKeywords", value);
                util.Save();
            }
        }

        public static string Copyright
        {
            get
            {
                return util.Read("SiteConfig/Copyright");
            }

            set
            {
                util.SetValue("SiteConfig/Copyright", value);
                util.Save();
            }
        }
    }
}
