/******************************************************************
 *
 * 所在模块：Data Access (数据库访问模块)
 * 类 名 称：ContentTag(ContentTag)
 * 功能描述：
 * 
******************************************************************/

using System;
using System.Collections.Generic;

using Hope.Model;
using Hope.Enums;
using Hope.Util;

namespace Hope.DAL
{
	/// <summary>
    /// ContentTag
    /// </summary>
    public class ContentTagDAL : BaseDAL
    {
		#region Constructors

        private IQuery<ContentTagData, int> query;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ContentTagDAL ()
        {
            query = new QueryStringBuilder<ContentTagData, int>("Content_Tag", "TagID");
        }

        /// <summary>
        /// 提供数据库连接的构造函数
        /// </summary>
        /// <param name="conn"></param>
        public ContentTagDAL(string conn)
        {
            query = new QueryStringBuilder<ContentTagData, int>("Content_Tag", "TagID", conn);
        }

        #endregion
		
		#region CRUD Methods
		
		/// <summary>
		/// 添加单条记录
		/// </summary>
        /// <param name="data">需要添加的数据</param>
        /// <returns>是否添加成功</returns>
        public bool Add(ContentTagData data)
        {
            try
            {
                query.Save(data);
                return true;
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }
		
		/// <summary>
		/// 修改单条记录
		/// </summary>
        /// <param name="data">需要修改的数据</param>
        /// <returns>是否修改成功</returns>
        public bool Edit(ContentTagData data)
        {
           try
            {
                query.Update(data);
                return true;
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }
		
		/// <summary>
		/// 删除单条记录
		/// </summary>
        /// <param name="TagID">需要删除的数据记录ID</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(int TagID)
        {
            try
            {
                query.Delete(TagID);
                return true;
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }
		
		/// <summary>
		/// 删除多条记录
		/// </summary>
        /// <param name="id">需要删除的数据记录ID集</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(List<int> TagIDList)
        {
            try
            {
                query.Delete(TagIDList);
                return true;
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }		
		
		#endregion
		
		#region Get Count Methods
		
		/// <summary>
		/// 获取全部记录数数
		/// </summary>
        /// <returns>所有记录数数</returns>
        public int GetCount()
        {
            try
            {
                query.ClearExpression();
                return query.Count();
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }
		
		#endregion
		
		#region Get Data Methods
		
		/// <summary>
		/// 根据ID获取单条记录
		/// </summary>
        /// <param name="id">数据ID</param>
        /// <returns>符合条件的记录</returns>
        public ContentTagData GetDataById(int TagID)
        {
			try
            {
                query.ClearExpression();
                query.ClearOrder();

                return query.GetById(TagID);
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }
		
		/// <summary>
		/// 获取全部记录
		/// </summary>
        /// <returns>所有记录集</returns>
        public List<ContentTagData> GetAll()
        {
         	try
            {
                query.ClearExpression();
                query.ClearOrder();
                return query.ListALL();
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }
		
		/// <summary>
		/// 获取分页记录
		/// </summary>
        /// <param name="startIndex">当前页起始索引</param>
        /// <param name="endIndex">当前结束索引</param>
        /// <returns>所有分页记录集</returns>
        public List<ContentTagData> GetPagedList(int startIndex, int endIndex)
        {
			return GetPagedList(startIndex, endIndex, string.Empty, ColumnOrderType.DESC);
        }
		
		/// <summary>
		/// 获取分页记录
		/// </summary>
        /// <param name="startIndex">当前页起始索引</param>
        /// <param name="endIndex">当前结束索引</param>
        /// <param name="orderColumn">排序字段</param>
        /// <param name="orderType">排序方式 : ASC|DESC</param>
        /// <returns>所有分页记录集</returns>
        public List<ContentTagData> GetPagedList(int startIndex, int endIndex, string orderColumn, ColumnOrderType orderType)
        {
			try
            {
                query.ClearExpression();
                query.ClearOrder();

                query.SetFirstResult(startIndex).SetMaxResult(endIndex - startIndex + 1);
				
                if (!string.IsNullOrEmpty(orderColumn)) 
                {
                    query.AddOrder(orderColumn, ConvertHelper.ToBoolean(orderType));
                }

                return query.List();
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
        }
				
		#endregion		
    }
}