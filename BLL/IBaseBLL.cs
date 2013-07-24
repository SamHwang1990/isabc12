
/******************************************************************
 * Copyright ? 2009, HPCMS 
 * ****************************************************************
 * 
 * 类 名 ： IBaseBLL
 * 描 述 ： 业务逻辑层接口
 * 
 * Author ： wensaint
 * Date   ： 2009-12-3
 * Email  ： wensaint@126.com
 * MSN　　:  wensaint@live.cn
 * 
 * 更新日志：
 * 格式： yyyy-MM-dd 更新内容 [作者]
 * 
******************************************************************/
using System;
using Hope.Util;

namespace Hope.BLL
{

    /// <summary>
    /// 业务逻辑处理基类接口
    /// </summary>
    public interface IBaseBLL
    {

        /// <summary>
        /// 系统消息
        /// </summary>
        SystemMessage HandlerMessage
        {
            set;
            get;
        }
    }
}
