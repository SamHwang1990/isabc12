using System;
using System.Collections.Generic;
using System.Text;

namespace Hope.Util
{
    /// <summary>
    /// 日志记录
    /// </summary>
    public partial class LogUtil
    {
        /// <summary>
        /// 致命的, 重大的
        /// </summary>
        /// <param name="message"></param>
        public static void fatal(string message)
        {
            log4net.ILog log = log4net.LogManager.GetLogger("Log4NetHope.LogBase");
            if (log.IsFatalEnabled)
            {
                log.Fatal(message);
            }
            log = null;
        }

        /// <summary>
        /// 错误
        /// </summary>
        /// <param name="message"></param>
        public static void error(string message)
        {
            log4net.ILog log = log4net.LogManager.GetLogger("Log4NetHope.LogBase");
            if (log.IsErrorEnabled)
            {
                log.Error(message);
            }
            log = null;
        }

        /// <summary>
        /// 警告
        /// </summary>
        /// <param name="message"></param>
        public static void warn(string message)
        {
            log4net.ILog log = log4net.LogManager.GetLogger("Log4NetHope.LogBase");
            if (log.IsWarnEnabled)
            {
                log.Warn(message);
            }
            log = null;
        }

        /// <summary>
        /// 调试
        /// </summary>
        /// <param name="message"></param>
        public static void debug(string message)
        {
            log4net.ILog log = log4net.LogManager.GetLogger("Log4NetHope.LogBase");
            if (log.IsDebugEnabled)
            {
                log.Debug(message);
            }
            log = null;
        }

        /// <summary>
        /// 一般信息
        /// </summary>
        /// <param name="message"></param>
        public static void info(string message)
        {
            log4net.ILog log = log4net.LogManager.GetLogger("Hope.Log");
            if (log.IsInfoEnabled)
            {
                log.Info(message);
            }
            log = null;
        }        
    }
}
