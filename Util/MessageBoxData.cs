
using System;
using System.Collections.Generic;
using System.Text;

namespace Hope.Util
{
    /// <summary>
    /// 信息提示实体类
    /// </summary>
    [Serializable]
    public class MessageBoxData
    {

        private string _title = "信息提示标题(空)";
        private string _message = "信息提示内容(空)";
        private string _navigationUrl;
        private bool _isWriteToLog = false;


        /// <summary>
        /// 信息提示标题
        /// </summary>
        public string Title
        {
            get
            {
                return _title;
            }
            set
            {
                _title = value;
            }
        }

        /// <summary>
        /// 信息提示内容
        /// </summary>
        public string Message
        {
            get
            {
                return _message;
            }
            set
            {
                _message = value;
            }
        }

          
        /// <summary>
        /// 关闭后返回的URL，为空为返回上一页
        /// </summary>
        public string NavigationUrl
        {
            get
            {
                return _navigationUrl;
            }
            set
            {
                _navigationUrl = value;
            }
        }


        /// <summary>
        /// 是否需要写入当前日志数据库,默认为true
        /// </summary>
        public bool IsWriteToLog
        {
            get
            {
                return _isWriteToLog;
            }
            set
            {
                _isWriteToLog = value;
            }
        }
    }
}
