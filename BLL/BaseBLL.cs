/******************************************************************
 * Copyright ? 2009, HPCMSCMS 
 * ****************************************************************
 * 
 * 类 名 ： BaseBLL
 * 描 述 ： 业务层基础类，实现IBaseBLL，可在此建立通用方法
 * 
 * Author ： AJ
 * Date   ： 2009-10-28
 * Email  ： ajj82@163.com
 * 
 * 更新日志：
 * 格式： yyyy-MM-dd 更新内容 [作者]
 * 
******************************************************************/

using System;
using System.Collections.Generic;
using System.Text;

using Hope.Util;

namespace Hope.BLL
{
    /// <summary>
    /// 业务逻辑层基类
    /// </summary>
    public class BaseBLL : IBaseBLL
    {

        #region Override interface ...

        private SystemMessage _HandlerMessage;
        /// <summary>
        /// 系统信息，用于输出执行时的结果信息
        /// </summary>
        public SystemMessage HandlerMessage
        {
            set { _HandlerMessage = value; }
            get {
                if(_HandlerMessage == null)
                {
                    _HandlerMessage = new SystemMessage();
                }
                return _HandlerMessage; 
            }
        }


        #endregion

    }
}
