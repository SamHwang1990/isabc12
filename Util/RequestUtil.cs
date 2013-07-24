using System;
using System.Collections.Generic;
using System.Text;

namespace Hope.Util
{
    public class RequestUtil
    {

        #region Constructor
        /// <summary>
        /// Constructor
        /// </summary>
        public RequestUtil()
        {

        }

        #endregion
    

        #region 数据请求Request数据读取

        /// <summary>
        /// 获取请求的字符串参数
        /// </summary>
        /// <param name="ARequest"></param>
        /// <param name="AKey"></param>
        /// <param name="ADefault"></param>
        /// <returns></returns>
        public static string RequestString(System.Web.HttpRequest ARequest, string AKey, string ADefault)
        {
            if (ARequest[AKey] == null)
            {
                return ADefault;
            }
            else
            {
                return ARequest[AKey].ToString();
            }
        }

        /// <summary>
        /// 获取请求的整型参数
        /// </summary>
        /// <param name="ARequest"></param>
        /// <param name="AKey"></param>
        /// <param name="ADefault"></param>
        /// <returns></returns>
        public static int RequestInt(System.Web.HttpRequest ARequest, string AKey, int ADefault)
        {
            string sValue = RequestString(ARequest, AKey, ADefault.ToString());
            return ConvertHelper.ToInt(sValue, ADefault);
        }

        /// <summary>
        /// 获取请求的长整型参数
        /// </summary>
        /// <param name="ARequest"></param>
        /// <param name="AKey"></param>
        /// <param name="ADefault"></param>
        /// <returns></returns>
        public static long RequestLong(System.Web.HttpRequest ARequest, string AKey, int ADefault)
        {
            string sValue = RequestString(ARequest, AKey, ADefault.ToString());
            return ConvertHelper.ToLong(sValue, ADefault);
        }

        /// <summary>
        /// 获取请求的布尔值参数
        /// </summary>
        /// <param name="ARequest"></param>
        /// <param name="AKey"></param>
        /// <param name="ADefault"></param>
        /// <returns></returns>
        public static bool RequestBoolean(System.Web.HttpRequest ARequest, string AKey, bool ADefault)
        {
            string sValue = RequestString(ARequest, AKey, "false");
            return ConvertHelper.ToBoolean(sValue, false);
        }

        /// <summary>
        /// 获取请求的时间日期参数
        /// </summary>
        /// <param name="ARequest"></param>
        /// <param name="AKey"></param>
        /// <param name="ADefault"></param>
        /// <returns></returns>
        public static DateTime RequestDatetime(System.Web.HttpRequest ARequest, string AKey, DateTime ADefault)
        {
            if (ARequest[AKey] == null)
            {
                return ADefault;
            }
            else
            {
                return ConvertHelper.ToDateTime(ARequest[AKey].ToString());
            }
        }

        #endregion
        
    }
}
