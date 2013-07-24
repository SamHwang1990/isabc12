using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web;
using System.Globalization;
using System.Web.SessionState;
using System.Security;
using System.Security.Cryptography;
using System.IO;
using System.Threading;
using System.Configuration;
using System.Text.RegularExpressions;
using System.Net.Mail;
using Microsoft.Win32;
using System.Xml;
using System.Web.UI;

namespace Hope.Util
{

    /// <summary>
    /// CommonClass 的摘要说明
    /// </summary>
    public class CommonClass
    {
        #region

        #endregion

        /// <summary>
        /// 构造函数
        /// </summary>
        public CommonClass()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
        }

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
        /// 获取请求的字符串参数
        /// </summary>
        /// <param name="ARequest"></param>
        /// <param name="AKey"></param>
        /// <returns></returns>
        public static string RequestString(System.Web.HttpRequest ARequest, string AKey)
        {
            return RequestString(ARequest, AKey, "");
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
            return ConvertToInt32(sValue, ADefault);
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
            return ConvertToBoolean(sValue, false);
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
                return CommonClass.ConvertToDateTime(ARequest[AKey].ToString());
            }
        }

        #endregion

        #region 数据库类型转换Convert

        /// <summary>
        /// 转化为Byte，数值范围：0～255，转化失败则默认为0
        /// </summary>
        /// <param name="objValue"></param>
        /// <returns>defautl value = -1</returns>
        public static byte ConvertToByte(object objValue)
        {
            byte result = 0;
            try
            {
                result = Convert.ToByte(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为Byte，数值范围：0～255，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static byte ConvertToByte(object objValue, byte defaultValue)
        {
            byte result = defaultValue;
            try
            {
                result = Convert.ToByte(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为16位Int，数值范围：-32768～32767，转化失败则默认为0
        /// </summary>
        /// <param name="objValue"></param>
        /// <returns>defautl value = -1</returns>
        public static short ConvertToInt16(object objValue)
        {
            short result = 0;
            try
            {
                result = Convert.ToInt16(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为16位Int，数值范围：-32768～32767，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static short ConvertToInt16(object objValue, short defaultValue)
        {
            short result = defaultValue;
            try
            {
                result = Convert.ToInt16(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为32位Int，数值范围：-2147483648～2147483647，转化失败则默认为-1
        /// </summary>
        /// <param name="objValue"></param>
        /// <returns>defautl value = -1</returns>
        public static int ConvertToInt32(object objValue)
        {
            int result = 0;
            try
            {
                result = Convert.ToInt32(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为32位Int，数值范围：-2147483648～2147483647，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static int ConvertToInt32(object objValue, int defaultValue)
        {
            int result;
            try
            {
                result = Convert.ToInt32(objValue);
            }
            catch
            {
                result = defaultValue;
            }
            return result;
        }

        /// <summary>
        /// 转化为64位Int(long)，数值范围：-9223372036854775808～9223372036854775807，转化失败则默认为0
        /// </summary>
        /// <param name="objValue"></param>
        /// <returns></returns>
        public static long ConvertToInt64(object objValue)
        {
            long result = 0;
            try
            {
                result = Convert.ToInt64(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为64位Int(long)，数值范围：-9223372036854775808～9223372036854775807，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static long ConvertToInt64(object objValue, long defaultValue)
        {
            long result;    
            try
            {
                result = Convert.ToInt64(objValue);
            }
            catch
            {
                result = defaultValue;
            }
            return result;
        }

        /// <summary>
        /// 转化为Double，转化失败则默认为0.0
        /// </summary>
        /// <param name="objValue"></param>
        /// <returns></returns>
        public static double ConvertToDouble(object objValue)
        {
            double result = 0.0;
            try
            {
                result = Convert.ToDouble(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为Double，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static double ConvertToDouble(object objValue, double defaultValue)
        {
            double result;
            try
            {
                result = Convert.ToDouble(objValue);
            }
            catch
            {
                result = defaultValue;
            }
            return result;
        }

        /// <summary>
        /// /// 转化为Float，转化失败则默认为0.0F
        /// </summary>
        /// <param name="objValue"></param>
        /// <returns></returns>
        public static float ConvertToFloat(object objValue)
        {
            float result = 0.0F;
            try
            {
                result = Convert.ToSingle(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为Float，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static float ConvertToFloat(object objValue, float defaultValue)
        {
            float result;
            try
            {
                result = Convert.ToSingle(objValue);
            }
            catch
            {
                result = defaultValue;
            }
            return result;
        }

        /// <summary>
        /// /// 转化为Decimal，转化失败则默认为0m
        /// </summary>
        /// <param name="objValue"></param>        
        /// <returns>default Value</returns>
        public static decimal ConvertToDecimal(object objValue)
        {
            decimal result = 0m;
            try
            {
                result = Convert.ToDecimal(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为Decimal，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static decimal ConvertToDecimal(object objValue, decimal defaultValue)
        {
            decimal result;
            try
            {
                result = Convert.ToDecimal(objValue);
            }
            catch
            {
                result = defaultValue;
            }
            return result;
        }

        /// <summary>
        /// 转化为String，默认值为空
        /// </summary>
        /// <param name="objValue"></param>       
        /// <returns>default value = ""</returns>
        public static string ConvertToString(object objValue)
        {
            string result = "";

            try
            {
                result = Convert.ToString(objValue).Trim();
            }
            catch
            { }

            return result;
        }

        /// <summary>
        /// 转化为String，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static string ConvertToString(object objValue, string defaultValue)
        {
            string result;

            try
            {
                result = Convert.ToString(objValue).Trim();
            }
            catch
            {
                result = defaultValue;
            }
            return result;
        }

        /// <summary>
        /// 转化为DateTime，默认值为 "1900-01-01 00:00:00"
        /// </summary>
        /// <param name="objValue"></param>
        /// <returns></returns>
        public static DateTime ConvertToDateTime(object objValue)
        {
            DateTime result = Convert.ToDateTime("1900-01-01 00:00:00");
 
            try
            {
                result = Convert.ToDateTime(objValue);
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为Boolean，默认值为false
        /// </summary>
        /// <param name="objValue"></param>        
        /// <returns>default Value = false</returns>
        public static bool ConvertToBoolean(object objValue)
        {
            bool result = false;
            try
            {
                if (objValue.ToString() == "1")
                {
                    result = true;
                }
                else
                {
                    result = Convert.ToBoolean(objValue);
                }                
            }
            catch
            { }
            return result;
        }

        /// <summary>
        /// 转化为Boolean，需提供默认值
        /// </summary>
        /// <param name="objValue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static bool ConvertToBoolean(object objValue, bool defaultValue)
        {
            bool result;
            try
            {
                if (objValue.ToString() == "1")
                {
                    result = true;
                }
                else
                {
                    result = Convert.ToBoolean(objValue);
                }                
            }
            catch
            {
                result = defaultValue;
            }
            return result;
        }

        #endregion

        #region 信息提示，使用页面跳转的方法

        /// <summary>
        /// 显示信息提示页
        /// </summary>
        /// <param name="ATitle"></param>
        /// <param name="AMessage">提示信息</param>
        public static void ShowMessagePage(string ATitle, string AMessage)
        {
            string messagePageUrl = ApplicationConfig.WebMainPathURL + "/Common/MessagePage.aspx";
             MessageBoxData msgData = null;
             if (HttpContext.Current.Session["_MessageBoxData"] == null)
            {
                msgData = new MessageBoxData();                
            }
            else
            {
                msgData = (MessageBoxData)HttpContext.Current.Session["_MessageBoxData"];
            }

            msgData.Title = ATitle;
            msgData.Message = AMessage;

            HttpContext.Current.Session["_MessageBoxData"] = msgData;
           
            System.Web.HttpContext.Current.Response.Redirect(messagePageUrl);
        }
        #endregion

        #region "获得Web目录物理路径"
        /// <summary>
        /// 获得Web目录物理路径
        /// </summary>
        /// <returns>Web目录物理路径</returns>
        public static string GetWebFullPath()
        {
            string AppDir = System.AppDomain.CurrentDomain.BaseDirectory;
            return AppDir;
        }
        #endregion
        
        #region 获取Web.config的网站路径
        /// <summary>
        /// 系统虚拟目录，包含协议名，主机名，虚拟目录，不以“/”结尾
        /// 例如：http://ce.sysu.edu.cn/hope
        /// </summary>
        public static string WebMainPathURL
        {
            get
            {
                return ApplicationConfig.WebMainPathURL;
            }
        }
        #endregion

        #region 给字符串加单引号

        /// <summary>
        /// 给字符串加单引号
        /// </summary>
        /// <param name="AStr"></param>
        /// <returns></returns>
        public static string QuoteStr(string AStr)
        {
            return "'" + AStr + "'";
        }

        #endregion

        #region 截取字符串
        /// <summary>
        /// 截取字符串
        /// </summary>
        /// <param name="str_value"></param>
        /// <param name="str_len"></param>
        /// <returns></returns>
        public static string Leftx(string str_value, int str_len)
        {
            int p_num = 0;
            int i;
            string New_Str_value = "";

            if (str_value == "")
            {
                New_Str_value = "";
            }
            else
            {
                int Len_Num = str_value.Length;
                for (i = 0; i <= Len_Num - 1; i++)
                {
                    if (i > Len_Num) break;
                    char c = Convert.ToChar(str_value.Substring(i, 1));
                    if (((int)c > 255) || ((int)c < 0))
                        p_num = p_num + 2;
                    else
                        p_num = p_num + 1;



                    if (p_num >= str_len)
                    {

                        New_Str_value = str_value.Substring(0, i + 1);
                        break;
                    }
                    else
                    {
                        New_Str_value = str_value;
                    }

                }

            }
            return New_Str_value;
        }
        #endregion

        #region 检测用户提交页面
        /// <summary>
        /// 检测用户提交页面
        /// </summary>
        /// <param name="rq"></param>
        public static void Check_Post_Url(HttpContext rq)
        {
            string WebHost = "";
            if (rq.Request.ServerVariables["SERVER_NAME"] != null)
            {
                WebHost = rq.Request.ServerVariables["SERVER_NAME"].ToString();
            }

            string From_Url = "";
            if (rq.Request.UrlReferrer != null)
            {
                From_Url = rq.Request.UrlReferrer.ToString();
            }

            if (From_Url == "" || WebHost == "")
            {
                rq.Response.Write("禁止外部提交数据!");
                rq.Response.End();
            }
            else
            {
                WebHost = "HTTP://" + WebHost.ToUpper();
                From_Url = From_Url.ToUpper();
                int a = From_Url.IndexOf(WebHost);
                if (From_Url.IndexOf(WebHost) < 0)
                {
                    rq.Response.Write("禁止外部提交数据!");
                    rq.Response.End();
                }
            }

        }
        #endregion

        #region 验证是否为网址格式
        /// <summary>
        /// 验证是否为网址格式
        /// </summary>
        /// <param name="strIn">被验证文本</param>
        /// <returns>返回验证结果 true:有效 false:无效</returns>
        public static bool IsValidUrl(string strIn)
        {
            return Regex.IsMatch(strIn, @"(http)|(https)://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?");
        }
        #endregion

        #region 日期处理
        /// <summary>
        /// 格式化日期为2006-12-22
        /// </summary>
        /// <param name="dTime"></param>
        /// <returns></returns>
        public static string FormatDate(DateTime dTime)
        {
            string rStr;
            rStr = dTime.Year + "-" + dTime.Month + "-" + dTime.Day;
            return rStr;
        }

        /// <summary>
        /// 获取日期
        /// </summary>
        /// <param name="sDate"></param>
        /// <returns></returns>
        public static string GetWeek(DateTime sDate)
        {
            Calendar myCal = CultureInfo.InvariantCulture.Calendar;


            string rStr = "";
            switch (myCal.GetDayOfWeek(sDate).ToString())
            {
                case "Sunday":
                    rStr = "星期日";
                    break;
                case "Monday":
                    rStr = "星期一";
                    break;
                case "Tuesday":
                    rStr = "星期二";
                    break;
                case "Wednesday":
                    rStr = "星期三";
                    break;
                case "Thursday":
                    rStr = "星期四";
                    break;
                case "Friday":
                    rStr = "星期五";
                    break;
                case "Saturday":
                    rStr = "星期六";
                    break;
            }
            return rStr;
        }

        #endregion

        #region 验证是否为日期、时间格式
        /// <summary>
        /// 验证是否为日期时间格式
        /// yyyy-MM-dd HH:mm:ss
        /// </summary>
        /// <param name="strIn">被验证文本</param>
        /// <returns>返回验证结果 true:有效 false:无效</returns>
        public static bool IsValidDateTime(string strIn)
        {
            return Regex.IsMatch(strIn, @"^\d{4}\-(\d|\d{2})\-(\d|\d{2}) \d{2}:\d{2}:\d{2}");
        }

        /// <summary>
        /// 时间格式是否有效
        /// HH:mm:ss
        /// </summary>
        /// <param name="strIn">被验证文本</param>
        /// <returns>返回判断结果 true：有效 false：无效</returns>
        public bool IsValidTime(string strIn)
        {
            return Regex.IsMatch(strIn, @"^\d{2}:\d{2}:\d{2}");
        }
        #endregion

        #region "判断是否是Decimal类型"
        /// <summary>
        /// 判断是否是Decimal类型
        /// </summary>
        /// <param name="TBstr0">判断数据字符</param>
        /// <returns>true是false否</returns>
        public static bool IsDecimal(string TBstr0)
        {
            bool IsBool = false;
            string Intstr0 = "1234567890";
            string IntSign0, StrInt, StrDecimal;
            int IntIndex0, IntSubstr, IndexInt;
            int decimalbool = 0;
            int db = 0;
            bool Bf, Bl;
            if (TBstr0.Length > 2)
            {
                IntIndex0 = TBstr0.IndexOf(".");
                if (IntIndex0 != -1)
                {
                    string StrArr = ".";
                    char[] CharArr = StrArr.ToCharArray();
                    string[] NumArr = TBstr0.Split(CharArr);
                    IndexInt = NumArr.GetUpperBound(0);
                    if (IndexInt > 1)
                    {
                        decimalbool = 1;
                    }
                    else
                    {
                        StrInt = NumArr[0].ToString();
                        StrDecimal = NumArr[1].ToString();
                        //--- 整数部分－－－－－
                        if (StrInt.Length > 0)
                        {
                            if (StrInt.Length == 1)
                            {
                                IntSubstr = Intstr0.IndexOf(StrInt);
                                if (IntSubstr != -1)
                                {
                                    Bf = true;
                                }
                                else
                                {
                                    Bf = false;
                                }
                            }
                            else
                            {
                                for (int i = 0; i <= StrInt.Length - 1; i++)
                                {
                                    IntSign0 = StrInt.Substring(i, 1).ToString();
                                    IntSubstr = Intstr0.IndexOf(IntSign0);
                                    if (IntSubstr != -1)
                                    {
                                        db = db + 0;
                                    }
                                    else
                                    {
                                        db = i + 1;
                                        break;
                                    }
                                }

                                if (db == 0)
                                {
                                    Bf = true;
                                }
                                else
                                {
                                    Bf = false;
                                }
                            }
                        }
                        else
                        {
                            Bf = true;
                        }
                        //----小数部分－－－－
                        if (StrDecimal.Length > 0)
                        {
                            for (int j = 0; j <= StrDecimal.Length - 1; j++)
                            {
                                IntSign0 = StrDecimal.Substring(j, 1).ToString();
                                IntSubstr = Intstr0.IndexOf(IntSign0);
                                if (IntSubstr != -1)
                                {
                                    db = db + 0;
                                }
                                else
                                {
                                    db = j + 1;
                                    break;
                                }
                            }
                            if (db == 0)
                            {
                                Bl = true;
                            }
                            else
                            {
                                Bl = false;
                            }
                        }
                        else
                        {
                            Bl = false;
                        }
                        if ((Bf && Bl) == true)
                        {
                            decimalbool = 0;
                        }
                        else
                        {
                            decimalbool = 1;
                        }

                    }

                }
                else
                {
                    decimalbool = 1;
                }

            }
            else
            {
                decimalbool = 1;
            }

            if (decimalbool == 0)
            {
                IsBool = true;
            }
            else
            {
                IsBool = false;
            }

            return IsBool;
        }
        #endregion

        #region "获取随机数"
        /// <summary>
        /// 获取随机数
        /// </summary>
        /// <param name="length">随机数长度</param>
        /// <returns></returns>
        public static string GetRandomNum(int length)
        {
            byte[] random = new Byte[length / 2];
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            rng.GetNonZeroBytes(random);

            StringBuilder sb = new StringBuilder(length);
            int i;
            for (i = 0; i < random.Length; i++)
            {
                sb.Append(String.Format("{0:X2}", random[i]));
            }
            return sb.ToString();
        }
        #endregion

        #region "获取用户IP地址"
        /// <summary>
        /// 获取用户IP地址
        /// </summary>
        /// <returns></returns>
        public static string GetClientIPAddress()
        {

            string user_IP = string.Empty;
            if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_VIA"] != null)
            {
                if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
                {
                    user_IP = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
                }
                else
                {
                    user_IP = System.Web.HttpContext.Current.Request.UserHostAddress;
                }
            }
            else
            {
                user_IP = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString();
            }
            return user_IP;
        }
        #endregion

        #region 获取请求的Url
        /// <summary>
        /// 获取请求的Url，完整形式，包括协议名，主机名，虚拟目录，文件路径
        /// 如：http://www.ce.sysu.edu.cn/hope/Default.aspx
        /// </summary>
        /// <returns></returns>
        public static string GetRequestUrl()
        {
            return HttpContext.Current.Request.Url.ToString();
        }
        #endregion

        #region 获取请求的URL的简短形式，以“~/”开头

        /// <summary>
        /// 获取请求的URL的简短形式，以“~/”开头
        /// 不包括请求参数
        /// 例如：~/Admin/AdminMgr/Default.aspx
        /// </summary>
        /// <returns></returns>
        public static string GetRequestShotUrl()
        {
            string url = GetRequestUrl();

            url = url.Replace(WebMainPathURL, "");
            if (!url.StartsWith("/"))
            {
                url = "~/" + url;
            }
            else
            {
                url = "~"+url;
            }
            int index = url.IndexOf("?");
            if (index > 0)
            {
                url = url.Substring(0, index);
            }

            return url;
        }

        #endregion

        #region "3des加密字符串"


        /// <summary>
        /// DES加密字符串
        /// </summary>
        /// <param name="encryptString">待加密的字符串</param>
        /// <param name="encryptKey">加密密钥,要求为8位</param>
        /// <returns>加密成功返回加密后的字符串，失败返回源串</returns>
        public static string Encrypt3desString(string encryptString, string encryptKey)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 8));
                byte[] rgbIV = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
                byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
                DESCryptoServiceProvider dCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, dCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Convert.ToBase64String(mStream.ToArray());
            }
            catch
            {
                return encryptString;
            }
        }
        #endregion

        #region "3des解密字符串"
        /// <summary>
        /// DES解密字符串
        /// </summary>
        /// <param name="decryptString">待解密的字符串</param>
        /// <param name="decryptKey">解密密钥,要求为8位,和加密密钥相同</param>
        /// <returns>解密成功返回解密后的字符串，失败返源串</returns>
        public static string Decrypt3desString(string decryptString, string decryptKey)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes(decryptKey.Substring(0, 8));
                byte[] rgbIV = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
                byte[] inputByteArray = Convert.FromBase64String(decryptString);
                DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Encoding.UTF8.GetString(mStream.ToArray());
            }
            catch
            {
                return decryptString;
            }
        }

        #endregion

        #region "MD5加密"
        /// <summary>
        /// MD5加密
        /// </summary>
        /// <param name="str">加密字符</param>
        /// <param name="code">加密位数16/32</param>
        /// <returns></returns>
        public static string md5(string str, int code)
        {
            string strEncrypt = string.Empty;
            if (code == 16)
            {
                strEncrypt = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(str, "MD5").Substring(8, 16);
            }

            if (code == 32)
            {
                strEncrypt = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(str, "MD5");
            }

            return strEncrypt;
        }
        #endregion

        #region "检测是否为有效邮件地址格式"
        /// <summary>
        /// 检测是否为有效邮件地址格式
        /// </summary>
        /// <param name="strIn">输入邮件地址</param>
        /// <returns></returns>
        public static bool IsValidEmail(string strIn)
        {
            return Regex.IsMatch(strIn, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
        }
        #endregion

        #region "设置页面不被缓存"
        /// <summary>
        /// 设置页面不被缓存
        /// </summary>
        public static void SetPageNoCache()
        {

            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            HttpContext.Current.Response.Expires = 0;
            HttpContext.Current.Response.CacheControl = "no-cache";
            HttpContext.Current.Response.AddHeader("Pragma", "No-Cache");
        }
        #endregion

        #region "按字符串位数补0"
        /// <summary>
        /// 按字符串位数补0
        /// </summary>
        /// <param name="CharTxt">字符串</param>
        /// <param name="CharLen">字符长度</param>
        /// <returns></returns>
        public static string PaddingStr(string CharTxt, int CharLen)
        {
            if (CharTxt.Length < CharLen)
            {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < CharLen - CharTxt.Length; i++)
                {
                    sb.Append("0");
                }
                sb.Append(CharTxt);
                return sb.ToString();
            }
            else
            {
                return CharTxt;
            }
        }

        #endregion

        #region "产生GUID"
        /// <summary>
        /// 获取一个GUID字符串
        /// </summary>
        public static string GetGUID
        {
            get
            {
                return Guid.NewGuid().ToString();
            }
        }
        #endregion

        #region "获取服务器IP"
        /// <summary>
        /// 获取服务器IP
        /// </summary>
        public static string GetServerIp
        {
            get
            {
                return HttpContext.Current.Request.ServerVariables["LOCAL_ADDR"].ToString();
            }
        }
        #endregion

        #region "获取服务器操作系统"
        /// <summary>
        /// 获取服务器操作系统
        /// </summary>
        public static string GetServerOS
        {
            get
            {
                return Environment.OSVersion.VersionString;
            }
        }
        #endregion

        #region "获取服务器域名"
        /// <summary>
        /// 获取服务器域名
        /// </summary>
        public static string GetServerHost
        {
            get
            {
                return HttpContext.Current.Request.ServerVariables["SERVER_NAME"].ToString();
            }
        }
        #endregion

        #region 获取服务器端口号

        public static int GetServerPort
        {
            get { return ConvertToInt32(HttpContext.Current.Request.ServerVariables["server_port"]); }
        }

        #endregion

        #region "根据文件扩展名获取当前目录下的文件列表"
        /// <summary>
        /// 根据文件扩展名获取当前目录下的文件列表
        /// </summary>
        /// <param name="filePath">文件目录</param>
        /// <param name="FileExt">文件扩展名</param>
        /// <returns>返回文件列表</returns>
        public static List<string> GetDirFileList(string filePath, string FileExt)
        {
            List<string> FilesList = new List<string>();
            string[] Files = Directory.GetFiles(filePath, string.Format("*.{0}", FileExt));
            foreach (string var in Files)
            {
                FilesList.Add(System.IO.Path.GetFileName(var).ToLower());
            }
            return FilesList;
        }
        #endregion

        #region "根据文件扩展名获得文件的content-type"
        /// <summary>
        /// 根据文件扩展名获得文件的content-type
        /// </summary>
        /// <param name="fileextension">文件扩展名如.gif</param>
        /// <returns>文件对应的content-type 如:application/gif</returns>
        public static string GetFileMIME(string fileextension)
        {
            //set the default content-type
            const string DEFAULT_CONTENT_TYPE = "application/unknown";

            RegistryKey regkey, fileextkey;
            string filecontenttype;

            //the file extension to lookup


            try
            {
                //look in HKCR
                regkey = Registry.ClassesRoot;

                //look for extension
                fileextkey = regkey.OpenSubKey(fileextension);

                //retrieve Content Type value
                filecontenttype = fileextkey.GetValue("Content Type", DEFAULT_CONTENT_TYPE).ToString();

                //cleanup
                fileextkey = null;
                regkey = null;
            }
            catch
            {
                filecontenttype = DEFAULT_CONTENT_TYPE;
            }

            return filecontenttype;
        }
        #endregion

        #region "获得客户端操作系统"
        /// <summary>
        /// 获得操作系统
        /// </summary>
        /// <returns>操作系统名称</returns>
        public static string GetClientSystem
        {
            get
            {
                string s = HttpContext.Current.Request.UserAgent.Trim().Replace("(", "").Replace(")", "");
                string[] sArray = s.Split(';');
                switch (sArray[2].Trim())
                {
                    case "Windows 4.10":
                        s = "Windows 98";
                        break;
                    case "Windows 4.9":
                        s = "Windows Me";
                        break;
                    case "Windows NT 5.0":
                        s = "Windows 2000";
                        break;
                    case "Windows NT 5.1":
                        s = "Windows XP";
                        break;
                    case "Windows NT 5.2":
                        s = "Windows 2003";
                        break;
                    case "Windows NT 6.0":
                        s = "Windows Vista";
                        break;
                    default:
                        s = "Other";
                        break;
                }
                return s;
            }
        }


        #endregion

        #region 获得当前Sessionid
        /// <summary>
        /// 获得sessionid
        /// </summary>
        public static string GetSessionID
        {
            get
            {
                return HttpContext.Current.Session.SessionID;
            }
        }
        #endregion

        #region XML函数

        /// <summary>
        /// 创建XML
        /// </summary>
        /// <returns></returns>
        public static XmlDocument CreateXmlDoc()
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<?xml version=\"1.0\" encoding=\"utf-8\" ?><Root></Root>");
            return xmlDoc;
        }

        /// <summary>
        /// 创建XML
        /// </summary>
        /// <returns></returns>
        public static XmlDocument CreateXmlDoc(string nodeName)
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<?xml version=\"1.0\" encoding=\"utf-8\" ?><" + nodeName + "></" + nodeName + ">");
            return xmlDoc;
        }

        /// <summary>
        /// 添加节点
        /// </summary>
        /// <param name="xmlDoc"></param>
        /// <param name="parentNode"></param>
        /// <param name="nodeName"></param>
        /// <param name="nodeValue"></param>
        public static void AddAttributeXMLNode(XmlDocument xmlDoc, XmlNode parentNode, string nodeName, string nodeValue)
        {
            XmlNode temNode = xmlDoc.CreateNode(XmlNodeType.Attribute, nodeName, "");
            temNode.Value = nodeValue;
            parentNode.Attributes.SetNamedItem(temNode);
        }

        #endregion

        #region 系统时间最大最小值
        /// <summary>
        /// 系统最小时间值
        /// </summary>
        public static DateTime MinDateTime = Convert.ToDateTime("1900-01-01 00:00:00");
        /// <summary>
        /// 系统最大时间值
        /// </summary>
        public static DateTime MaxDateTime = Convert.ToDateTime("9999-12-31 23:59:59");
        #endregion...

        #region encrypt password ...

        

        /// <summary>
        /// 3DES加密处理
        /// </summary>
        /// <param name="strData">将被加密的字符串</param>
        /// <param name="key">密钥</param>
        /// <param name="IV">算法的初始化向量</param>
        /// <returns>返回加密后的密文</returns>
        public static byte[] TripleDESEncrpty2Binary(string strData, byte[] key, byte[] IV)
        {
            //创建内存流
            MemoryStream mStream = new MemoryStream();
            //创建加密流
            CryptoStream cStream = new CryptoStream(mStream, new TripleDESCryptoServiceProvider().CreateEncryptor(key, IV), CryptoStreamMode.Write);
            byte[] byteData = new ASCIIEncoding().GetBytes(strData);
            cStream.Write(byteData, 0, byteData.Length);
            cStream.FlushFinalBlock();

            byteData = mStream.ToArray();
            cStream.Close();
            mStream.Close();

            return byteData;
        }

        /// <summary>
        /// 3DES加密处理
        /// </summary>
        /// <param name="strData">将被加密的字符串</param>
        /// <param name="key">密钥</param>
        /// <param name="IV">算法的初始化向量</param>
        /// <returns>返回加密后的密文</returns>
        public static string TripleDESEncrpty2String(string strData, byte[] key, byte[] IV)
        {
            byte[] byteData = TripleDESEncrpty2Binary(strData, key, IV);
            StringBuilder sb = new StringBuilder();
            foreach (byte b in byteData)
            {
                sb.Append(b.ToString("X2"));
            }
            //return Convert.ToBase64String(byteData);
            return sb.ToString();
        }

        /// <summary>
        /// 3DES解密处理
        /// </summary>
        /// <param name="data">将被解密数据</param>
        /// <param name="key">密钥</param>
        /// <param name="IV">算法的初始化向量</param>
        /// <returns>返回解密后的密文</returns>
        public static string TripleDESDecrpty(byte[] data, byte[] key, byte[] IV)
        {
            //创建内存流
            MemoryStream mStream = new MemoryStream(data);
            //创建解密流
            CryptoStream cStream = new CryptoStream(mStream, new TripleDESCryptoServiceProvider().CreateDecryptor(key, IV), CryptoStreamMode.Read);

            byte[] resultData = new byte[data.Length];
            cStream.Read(resultData, 0, resultData.Length);

            return new ASCIIEncoding().GetString(resultData);
        }

        /// <summary>
        /// 3DES解密处理
        /// </summary>
        /// <param name="strData">将被解密的字符串</param>
        /// <param name="key">密钥</param>
        /// <param name="IV">算法的初始化向量</param>
        /// <returns>返回解密后的密文</returns>
        public static string TripleDESDecrpty(string strData, byte[] key, byte[] IV)
        {
            //创建内存流
            byte[] byteData = new byte[strData.Length / 2];
            int startIndex = 0;
            for (int index = 0; index < byteData.Length; index++)
            {
                startIndex = index * 2;
                byteData[index] = Convert.ToByte(strData.Substring(startIndex, 2), 16);
            }

            string strResult = TripleDESDecrpty(byteData, key, IV);
            return strResult;
        }

        #endregion

        #region 字符检查与过滤...

        /**************************************************
            函数：FoundInArr
            作  用：检查一个数组中所有元素是否包含指定字符串
            参  数：strArr     ----存储数据数据的字串
                   strToFind    ----要查找的字符串
                   strSplit    ----数组的分隔符
            返回值：True,False
            **************************************************/
        /// <summary>
        /// 检查一个数组中所有元素是否包含指定字符串
        /// </summary>
        /// <param name="strArr"></param>
        /// <param name="strToFind"></param>
        /// <param name="strSplit"></param>
        /// <returns></returns>
        public static bool FoundInArr(string strArr, string strToFind, char strSplit)
        {
            bool canFind = false;
            if (strArr.IndexOf(strSplit) >= 0)
            {
                string[] strArray = strArr.Split(strSplit);
                foreach (string i2 in strArray)
                {
                    if (i2.ToLower() == strToFind.ToLower())
                    {
                        canFind = true;
                        break;
                    }
                }
            }
            else
            {
                if (strArr.ToLower() == strToFind.ToLower())
                {
                    canFind = true;
                }
            }
            return canFind;
        }
        /**************************************************
        '函数名：FindBadChar
        '作  用：查找非法的SQL字符
        '参  数：strChar-----要查找的字符串
        '返回值：true代表存在非法的字符，flase代表没有非法字符
        '**************************************************/
        /// <summary>
        /// 查找非法的SQL字符
        /// </summary>
        /// <param name="strChar"></param>
        /// <returns></returns>
        public static bool FindBadChar(string strChar)
        {
            if (strChar.Equals(null) || strChar.Equals(""))
            {
                return false;
            }
            else
            {
                string strBadChar = "\',%,^,&,?,(,),<,>,[,],{,},/,\\,;,:,\",\0";
                string[] BadArr = strBadChar.Split(',');
                bool b = false;
                foreach (string i in BadArr)
                {
                    if (strChar.IndexOf(i) >= 0)
                    {
                        b = true;
                        break;
                    }
                }
                return b;
            }

        }
        /**************************************************
        '函数名：ReplaceBadChar
        '作  用：过滤非法的SQL字符
        '参  数：strChar-----要过滤的字符
        '返回值：过滤后的字符
        '**************************************************/
        /// <summary>
        /// 过滤非法的SQL字符
        /// </summary>
        /// <param name="strChar"></param>
        /// <returns></returns>
        public static string ReplaceBadChar(string strChar)
        {
            if (strChar.Equals(null) || strChar.Equals(""))
            {
                return "";
            }
            else
            {
                string strBadChar = "\',%,^,&,?,(,),<,>,[,],{,},/,\\,;,:,\",\0";
                string[] badArray = strBadChar.Split(',');
                string tempChar = strChar;
                foreach (string i in badArray)
                {
                    tempChar = tempChar.Replace(i, "");
                }
                return tempChar;
            }
        }

        /************************************************
        '功能：格式化字符串，按指定字符与位数将字符串补足
        '参数说明：
        'str			源字符串	
        'destLen		要求的字符串长度
        'placeholder	占位符
        '************************************************/
        /// <summary>
        /// 格式化字符串，按指定字符与位数将字符串补足
        /// </summary>
        /// <param name="str"></param>
        /// <param name="destlen"></param>
        /// <param name="placeholder"></param>
        /// <returns></returns>
        public static string FormatStr(string str, int destlen, string placeholder)
        {
            int len = str.Length;
            int i = 0;
            string tempStr = str;
            while (i < destlen - len)
            {
                tempStr = tempStr + placeholder;
                i++;
            }
            return tempStr;
        }
        /**************************************************
        '函数名：FixStr
        '作  用：格式化字符串，将超过指定长度的字符串用指定字符串补足
        '参  数：str ----要格式化的字符串
        '		 length--需要的字符串长度
        '		 c ------如果不足用c字符串填充
        '返回值：  ----处理好的字符串
        '**************************************************/
        /// <summary>
        /// 格式化字符串，将超过指定长度的字符串用指定字符串补足
        /// </summary>
        /// <param name="str"></param>
        /// <param name="length"></param>
        /// <param name="c"></param>
        /// <returns></returns>
        public static string FixStr(string str, int length, string c)
        {
            int len = str.Length;
            if (len > length)
            {
                return str.Substring(0, length) + c;
            }
            else
                return str;
        }
        /**************************************************
        '函数名：CheckStr
        '作  用：检查字符串中的单引号，为SQL处理做准备
        '参  数：str ----要处理的字符串
        '返回值： 处理好之后的字符串
        '**************************************************/
        /// <summary>
        /// 检查字符串中的单引号，为SQL处理做准备
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string CheckStr(string str)
        {
            if (str.Equals(null))
                return "";
            else
            {
                return str.Replace("\0", "").Replace("\'", "");
            }
        }
        /**************************************************
        '函数名：AbbrStr
        '作  用：检查字符串是否超长，将超长部分以省略号表示
        '参  数：str ----要处理的字符串
        '		 length--所需的字符串长度
        '返回值： 处理好之后的字符串
        '**************************************************/
        /// <summary>
        /// 检查字符串是否超长，将超长部分以省略号表示
        /// </summary>
        /// <param name="str"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        public static string AbbrStr(string str, int length)
        {
            if (str.Equals(null) || str.Equals(""))
                return "";
            else
            {
                if (str.Length > length)
                {
                    return str.Substring(0, length) + "...";
                }
                else
                {
                    return str;
                }
            }
        }
        /**************************************************
        '函数名：iHTMLEncode
        '作  用：用于字符串的过滤，不带脏话过滤
        '参  数：str ----要处理的字符串
        '返回值： 处理好之后的字符串
        '**************************************************/
        /// <summary>
        /// 用于字符串的过滤，不带脏话过滤
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string iHTMLEncode(string str)
        {
            string tempStr = str;
            char[] c = new char[] { (char)32, (char)9, (char)34, (char)39, (char)13, (char)10 };
            if (str.Equals(null) || str.Equals(""))
                return "";
            tempStr = tempStr.Replace(">", "&gt;");
            tempStr = tempStr.Replace("<", "&lt;");
            tempStr = tempStr.Replace(c[0].ToString(), "&nbsp;");
            tempStr = tempStr.Replace(c[1].ToString(), " ");
            tempStr = tempStr.Replace(c[2].ToString(), "&quot;");
            tempStr = tempStr.Replace(c[3].ToString(), "&#39;");
            tempStr = tempStr.Replace(c[4].ToString(), "");
            tempStr = tempStr.Replace(c[5].ToString() + c[5].ToString(), "</p><p>");
            tempStr = tempStr.Replace(c[5].ToString(), "<br />");
            return tempStr;
        }
        #endregion...

        #region 注册页面JS脚本 
        /* 如果你的脚本有与页面对象(doucument对象)进行交互的语句（这在我们后面的例子中看到），则推荐使用RegisterStartupScript，
        * 反之如果要想客户端脚本尽可能早的执行，则可以使用RegisterClientScriptBlock或Response.Write。
        *
        * 应为页面上的所有 JavaScript 指定唯一的关键字，        * 这一点十分重要（这可通过该方法中要求的 key 参数来实现）。        * 如果多个 JavaScript 具有相同的关键字名称，则只会在页面中嵌入第一个 JavaScript。
        */

        /// <summary>
        /// 在 Page 对象的 元素的开始标记后立即发出客户端脚本。 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="handler"></param>
        public static void RegScript(Page page, string handler)
        {
            page.ClientScript.RegisterClientScriptBlock(page.GetType(), "gogo", "<script language=\"javascript\" type=\"text/javascript\">" + handler + "</script>");
        }

        /// <summary>
        /// 在 Page 对象的 元素的结束标记前发出客户端脚本。 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="key"></param>
        /// <param name="handler"></param>
        public static void RegScript(Page page,string key, string handler)
        {
            page.ClientScript.RegisterClientScriptBlock(page.GetType(), key, "<script language=\"javascript\" type=\"text/javascript\">" + handler + "</script>");
        }

        /// <summary>
        /// 在Page 对象的 元素的结束标记之前发出该脚本。 
        /// 在页面的底部、表单 (form) 的最后，嵌入了一个 JavaScript 函数。
        /// </summary>
        /// <param name="page"></param>
        /// <param name="handler"></param>
        public static void RegStartupScript(Page page, string handler)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "gogo", "<script language=\"javascript\" type=\"text/javascript\">" + handler + "</script>");
        }

        /// <summary>
        /// 在 Page 对象的 元素的开始标记后立即发出客户端脚本。 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="key"></param>
        /// <param name="handler"></param>
        public static void RegStartupScript(Page page,string key, string handler)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), key, "<script language=\"javascript\" type=\"text/javascript\">" + handler + "</script>");
        }
        #endregion

        #region 分页
        /// <summary>
        /// 分页用
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="controls"></param>
        public static void SetSortColumn(Page currentPage, params System.Web.UI.WebControls.Panel[] controls)
        {
            string orderType = "ASC";
            string orderColumn = currentPage.Request["OrderColumn"] == null ? "" : currentPage.Request["OrderColumn"];
            if (currentPage.Request["OrderType"] != null)
            {
                orderType = currentPage.Request["OrderType"];
            }
            foreach (System.Web.UI.WebControls.WebControl control in controls)
            {
                if (control == null)
                {
                    continue;
                }
                else if (control.Attributes["OrderColumn"] == null || control.Attributes["OrderColumn"] != orderColumn)
                {
                    continue;
                }
                System.Web.UI.WebControls.Image img = new System.Web.UI.WebControls.Image();
                img.Height = System.Web.UI.WebControls.Unit.Pixel(12);
                img.Width = System.Web.UI.WebControls.Unit.Pixel(12);
                img.BorderStyle = System.Web.UI.WebControls.BorderStyle.None;
                img.ImageUrl = string.Format("~/Images/Order{0}.gif", orderType);
                control.Controls.Add(img);
            }

            string strQuery = currentPage.Request.Url.Query;
            string strPrefix = currentPage.Request.Url.ToString();
            if (strQuery != string.Empty)
            {
                strPrefix = strPrefix.Replace(strQuery, "");
                strQuery = strQuery.Replace("?", "&");
            }
            if (orderColumn != string.Empty)
            {
                strQuery = strQuery.Replace(string.Format("&{0}={1}", "OrderColumn", currentPage.Request["OrderColumn"]), "");
                strQuery = strQuery.Replace(string.Format("&{0}={1}", "OrderType", currentPage.Request["OrderType"]), "");
            }

            currentPage.ClientScript.RegisterClientScriptBlock(currentPage.GetType(), "", string.Format("<script language=\"javascript\" type=\"text/javascript\">currentOrderColumn = \"{0}\";currentOrderType=\"{1}\";currentPageUrl=\"{2}?{3}\";</script>", orderColumn, orderType, strPrefix, strQuery));
        }
        #endregion

        #region 将html 转化成纯文本
        /// <summary>
        /// 将html 转化成纯文本
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string ConvertHtml2Txt(string source)
        {
            string result = source;

            //remove line breaks,tabs
            result = source.Replace("\r", " ");
            result = result.Replace("\n", " ");
            result = result.Replace("\t", " ");

            //remove the header
            result = Regex.Replace(result, "(<head>).*(</head>)", string.Empty, RegexOptions.IgnoreCase);

            result = Regex.Replace(result, @"<( )*script([^>])*>", "<script>", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"(<script>).*(</script>)", string.Empty, RegexOptions.IgnoreCase);

            //remove all styles
            result = Regex.Replace(result, @"<( )*style([^>])*>", "<style>", RegexOptions.IgnoreCase); //clearing attributes
            result = Regex.Replace(result, "(<style>).*(</style>)", string.Empty, RegexOptions.IgnoreCase);

            //insert tabs in spaces of <td> tags
            result = Regex.Replace(result, @"<( )*td([^>])*>", " ", RegexOptions.IgnoreCase);

            //insert line breaks in places of <br> and <li> tags
            result = Regex.Replace(result, @"<( )*br( )*>", "\r", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"<( )*li( )*>", "\r", RegexOptions.IgnoreCase);

            //insert line paragraphs in places of <tr> and <p> tags
            result = Regex.Replace(result, @"<( )*tr([^>])*>", "\r\r", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"<( )*p([^>])*>", "\r\r", RegexOptions.IgnoreCase);

            //remove anything thats enclosed inside < >
            result = Regex.Replace(result, @"<[^>]*>", string.Empty, RegexOptions.IgnoreCase);

            //replace special characters:
            result = Regex.Replace(result, @"&amp;", "&", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"&nbsp;", " ", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"&lt;", "<", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"&gt;", ">", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"&(.{2,6});", string.Empty, RegexOptions.IgnoreCase);

            //remove extra line breaks and tabs
            result = Regex.Replace(result, @" ( )+", " ");
            result = Regex.Replace(result, "(\r)( )+(\r)", "\r\r");
            result = Regex.Replace(result, @"(\r\r)+", "\r\n");

            return result;
        }
        #endregion...

        #region URLEncode

        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string URLEncode(string value)
        {
            return System.Web.HttpUtility.UrlEncode(value, Encoding.UTF8);
        }

        #endregion

        #region URLDecode

        public static string URLDecode(string value)
        {
            return System.Web.HttpUtility.UrlDecode(value, Encoding.UTF8);
        }

        #endregion

        #region.取得客户端真实IP。如果有代理则取第一个非内网地址

        /// <summary>
        /// 取得客户端真实IP。如果有代理则取第一个非内网地址
        /// </summary>
        public static string IPAddress
        {
            get
            {
                string result = String.Empty;
                result = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (result != null && result != String.Empty)
                {
                    //可能有代理
                    if (result.IndexOf(".") == -1)     //没有“.”肯定是非IPv4格式
                        result = null;
                    else
                    {
                        if (result.IndexOf(",") != -1)
                        {
                            //有“,”，估计多个代理。取第一个不是内网的IP。
                            result = result.Replace(" ", "").Replace("'", "");
                            string[] temparyip = result.Split(",;".ToCharArray());
                            for (int i = 0; i < temparyip.Length; i++)
                            {
                                if (IsIPAddress(temparyip[i])
                                && temparyip[i].Substring(0, 3) != "10."
                                && temparyip[i].Substring(0, 7) != "192.168"
                                && temparyip[i].Substring(0, 7) != "172.16.")
                                {
                                    return temparyip[i];     //找到不是内网的地址
                                }
                            }
                        }
                        else if (IsIPAddress(result)) //代理即是IP格式
                            return result;
                        else
                            result = null;     //代理中的内容 非IP，取IP
                    }
                }

                string IpAddress = (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null && HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != String.Empty) ? HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] : HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                if (null == result || result == String.Empty)
                    result = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                if (result == null || result == String.Empty)
                    result = HttpContext.Current.Request.UserHostAddress;
                return result;
            }
        }
        #endregion...

        #region bool IsIPAddress(str1) 判断是否是IP格式

        /// 判断是否是IP地址格式 0.0.0.0
        /// <param name="str1">待判断的IP地址</param>
        /// <returns>true or false</returns>
        public static bool IsIPAddress(string str1)
        {
            if (str1 == null || str1 == string.Empty || str1.Length < 7 || str1.Length > 15) return false;
            string regformat = @"^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$";
            Regex regex = new Regex(regformat, RegexOptions.IgnoreCase);
            return regex.IsMatch(str1);
        }
        #endregion

        #region 字符串分割成数组

        /// <summary>
        /// 分割字符串，接受任意char做分隔符，值唯一
        /// </summary>
        /// <param name="text">要处理的字符串</param>
        /// <returns>唯一的Int数组</returns>
        public static List<int> SplitString(string text)
        {
            List<int> exclude = new List<int>();

            List<int> result = SplitString(text,exclude);            

            return result;
        }

        /// <summary>
        /// 分割字符串，接受任意char做分隔符，值唯一
        /// </summary>
        /// <param name="text">要处理的字符串</param>
        /// <param name="splitter">分隔符</param>
        /// <returns>唯一的Int数组</returns>
        public static List<int> SplitString(string text, char splitter)
        {
            List<int> exclude = new List<int>();
            List<int> result = SplitString(text, splitter, exclude);

            return result;
        }

        /// <summary>
        /// 分割字符串，以逗号做分隔符，值唯一，可排除不需要的数值
        /// </summary>
        /// <param name="text">要处理的字符串</param>
        /// <param name="exclude">排除值</param>
        /// <returns>唯一的Int数组</returns>
        public static List<int> SplitString(string text, int exclude)
        {
            List<int> exc = new List<int>();
            exc.Add(exclude);
            char splitter = ',';
            List<int> result = SplitString(text, splitter, exc);

            return result;
        }

        /// <summary>
        /// 分割字符串，以逗号做分隔符，值唯一，可排除不需要的数值
        /// </summary>
        /// <param name="text">要处理的字符串</param>
        /// <param name="exclude">排除值</param>
        /// <returns>唯一的Int数组</returns>
        public static List<int> SplitString(string text, List<int> exclude)
        {
            char splitter = ',';
            List<int> result = SplitString(text,splitter,exclude);
            
            return result;
        }

        /// <summary>
        /// 分割字符串，接受任意char做分隔符，值唯一，可排除不需要的数值
        /// </summary>
        /// <param name="text">要处理的字符串</param>
        /// <param name="splitter">分隔符</param>
        /// <param name="exclude">排除值</param>
        /// <returns>唯一的Int数组</returns>
        public static List<int> SplitString(string text, char splitter, List<int> exclude)
        {
            List<int> result = null;
            if (!string.IsNullOrEmpty(text))
            {
                result = new List<int>();
                string[] arr = text.Split(splitter);
                foreach (string str in arr)
                {
                    // 排除空值
                    if (string.IsNullOrEmpty(str))
                    {
                        continue;
                    }
                    int to_add = ConvertToInt32(str, 0);

                    // 排除，如除0
                    if (exclude.Contains(to_add))
                    {
                        continue;
                    }

                    // 排除相同值
                    if (!result.Contains(to_add))
                    {
                        result.Add(to_add);
                    }                    
                }
            }
            return result;
        }
        #endregion

        #region 替换指定的字符串
        /// <summary>
        /// 替换指定的字符串
        /// </summary>
        /// <param name="originalStr">原字符串</param>
        /// <param name="oldStr">旧字符串</param>
        /// <param name="newStr">新字符串</param>
        /// <returns></returns>
        public static string ReplaceStr(string originalStr, string oldStr, string newStr)
        {
            if (string.IsNullOrEmpty(oldStr))
            {
                return "";
            }
            return originalStr.Replace(oldStr, newStr);
        }
        #endregion

        #region 返回文件扩展名，不含“.”
        /// <summary>
        /// 返回文件扩展名，不含“.”
        /// </summary>
        /// <param name="_filepath">文件名称</param>
        /// <returns>string</returns>
        public static string GetFileExt(string _filepath)
        {
            if (string.IsNullOrEmpty(_filepath))
            {
                return "";
            }
            if (_filepath.LastIndexOf(".") > 0)
            {
                return _filepath.Substring(_filepath.LastIndexOf(".") + 1); //文件扩展名，不含“.”
            }
            return "";
        }
        #endregion
        

        #region 获得当前绝对路径
        /// <summary>
        /// 获得当前绝对路径
        /// </summary>
        /// <param name="strPath">指定的路径</param>
        /// <returns>绝对路径</returns>
        public static string GetMapPath(string strPath)
        {
            if (strPath.ToLower().StartsWith("http://"))
            {
                return strPath;
            }
            if (HttpContext.Current != null)
            {
                return HttpContext.Current.Server.MapPath(strPath);
            }
            else //非web程序引用
            {
                strPath = strPath.Replace("/", "\\");
                if (strPath.StartsWith("\\"))
                {
                    strPath = strPath.Substring(strPath.IndexOf('\\', 1)).TrimStart('\\');
                }
                return System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, strPath);
            }
        }
        #endregion

        #region 文件操作
        /// <summary>
        /// 删除单个文件
        /// </summary>
        /// <param name="_filepath">文件相对路径</param>
        public static bool DeleteFile(string _filepath)
        {
            if (string.IsNullOrEmpty(_filepath))
            {
                return false;
            }
            string fullpath = GetMapPath(_filepath);
            if (File.Exists(fullpath))
            {
                File.Delete(fullpath);
                return true;
            }
            return false;
        }

        /// <summary>
        /// 返回文件大小KB
        /// </summary>
        /// <param name="_filepath">文件相对路径</param>
        /// <returns>int</returns>
        public static int GetFileSize(string _filepath)
        {
            if (string.IsNullOrEmpty(_filepath))
            {
                return 0;
            }
            string fullpath = GetMapPath(_filepath);
            if (File.Exists(fullpath))
            {
                FileInfo fileInfo = new FileInfo(fullpath);
                return ((int)fileInfo.Length) / 1024;
            }
            return 0;
        }
        #endregion

        /// <summary>
        /// 获取数据库版本
        /// </summary>
        /// <returns></returns>
        public static string GetDBVersion
        {
            get
            {
                return "SQL Server 2008 R2 SP1";
            }
        }

        public static List<int> ConvertToIntList(string orgion)
        {
            string[] list = orgion.Split(',');

            List<int> result = new List<int>();

            foreach (string str in list)
            {
                if(str.Contains("M"))
                {
                    continue;
                }
                result.Add(ConvertToInt32(str.Replace("F", "")));
            }

            return result;
        }

    }
}
