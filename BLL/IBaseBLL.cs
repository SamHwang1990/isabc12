
/******************************************************************
 * Copyright ? 2009, HPCMS 
 * ****************************************************************
 * 
 * �� �� �� IBaseBLL
 * �� �� �� ҵ���߼���ӿ�
 * 
 * Author �� wensaint
 * Date   �� 2009-12-3
 * Email  �� wensaint@126.com
 * MSN����:  wensaint@live.cn
 * 
 * ������־��
 * ��ʽ�� yyyy-MM-dd �������� [����]
 * 
******************************************************************/
using System;
using Hope.Util;

namespace Hope.BLL
{

    /// <summary>
    /// ҵ���߼��������ӿ�
    /// </summary>
    public interface IBaseBLL
    {

        /// <summary>
        /// ϵͳ��Ϣ
        /// </summary>
        SystemMessage HandlerMessage
        {
            set;
            get;
        }
    }
}
