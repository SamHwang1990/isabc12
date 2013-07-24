using System;
using System.Collections.Generic;
using System.Data.Common;
using Hope.Util;

namespace Hope.DAL
{
    public interface IQuery<T, TKey>
    {
        /// <summary>
        /// 设置SELECT的字段，覆盖实例的自动属性
        /// </summary>
        /// <param name="fileds">需要自定义SELECT的字段</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> SetSelectField(string fileds);

        /// <summary>
        /// 添加表达式
        /// </summary>
        /// <param name="exp">表达式</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddExp(SimpleExpression exp);

        /// <summary>
        /// 添加表达式
        /// </summary>
        /// <param name="exp">表达式</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddExp(List<SimpleExpression> exp);

        /// <summary>
        /// 设置第一个记录的位置
        /// </summary>
        /// <param name="firstResult">第一个记录的位置，默认是1，如果小于1则置为1</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> SetFirstResult(int firstResult);

        /// <summary>
        /// 设置获取最大记录数量
        /// </summary>
        /// <param name="maxResult">获取最大记录数量</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> SetMaxResult(int maxResult);

        /// <summary>
        /// 添加排序字段
        /// </summary>
        /// <param name="propertyName">排序字段</param>
        /// <param name="ascending">是否降序</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddOrder(string propertyName, bool descending);

        /// <summary>
        /// 按字段排序，默认为升序
        /// </summary>
        /// <param name="propertyName">记录字段</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddOrder(string propertyName);

        /// <summary>
        /// 添加按字段排序
        /// </summary>
        /// <param name="order">排序字段</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddOrder(Order order);

        /// <summary>
        /// 添加按字段排序
        /// </summary>
        /// <param name="order">排序字段</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddOrder(List<Order> order);

        /// <summary>
        /// 添加分组的字段，用于Group的字段
        /// </summary>
        /// <param name="propertyName">分组的字段</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddGroupBy(string propertyName);

        /// <summary>
        /// 添加分组的聚合方法，用于SELECT的内容
        /// </summary>
        /// <param name="aggregateName">聚合方法</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> AddGroupByAggr(string aggregateName);

        /// <summary>
        /// 执行查询操作，无分页
        /// </summary>
        /// <returns>命中记录列表</returns>
        List<T> ListALL();

        /// <summary>
        /// 执行分页查询操作
        /// </summary>
        /// <returns>命中记录列表</returns>
        List<T> List();

        /// <summary>
        /// 执行分页查询操作
        /// </summary>
        /// <param name="pager">PagerData</param>
        /// <returns>命中记录列表</returns>
        /// ]<remarks>用于PagerData分页</remarks>
        List<T> List(PagerData pager);

        /// <summary>
        /// 获取记录总数
        /// </summary>
        /// <returns>记录总数</returns>
        int Count();

        /// <summary>
        /// 根据主键获取记录
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns>具体的实体</returns>
        T GetById(TKey id);

        /// <summary>
        /// 根据条件获取记录
        /// </summary>
        /// <returns>具体的实体</returns>
        T Data();

        /// <summary>
        /// 获取第一条记录
        /// </summary>
        /// <returns>第一条记录数据</returns>
        T GetFirst();

        /// <summary>
        /// 获取前n条记录
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        List<T> GetTop(int count);

        /// <summary>
        /// 获取后n条记录
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        List<T> GetLast(int count);

        /// <summary>
        /// 获取最后一条记录
        /// </summary>
        /// <returns>最后一条记录数据</returns>
        T GetLast();

        /// <summary>
        /// 添加或保存，如果数据库已经存在，则使用 "更新" 操作，否则使用 "添加" 操作
        /// </summary>
        /// <param name="entity">添加或保存的实体</param>
        /// <returns>添加或保存后的实体</returns>
        T SaveOrUpdate(T entity);

        /// <summary>
        /// 添加或保存，如果数据库已经存在，则使用 "更新" 操作，否则使用 "添加" 操作
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="entity">添加或保存的实体</param>
        /// <returns>添加或保存后的实体</returns>
        T SaveOrUpdate(DbConnection conn, T entity);

        /// <summary>
        /// 添加或保存，如果数据库已经存在，则使用 "更新" 操作，否则使用 "添加" 操作
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="entity">添加或保存的实体</param>
        /// <returns>添加或保存后的实体</returns>
        T SaveOrUpdate(DbTransaction trans, T entity);

        /// <summary>
        /// 保存实例
        /// </summary>
        /// <param name="entity">需要添加的实体</param>
        /// <returns>添加后的实体</returns>
        T Save(T entity);

        /// <summary>
        /// 保存实例
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="entity">需要添加的实体</param>
        /// <returns>添加后的实体</returns>
        T Save(DbConnection conn, T entity);

        /// <summary>
        /// 保存实例
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="entity">需要添加的实体</param>
        /// <returns>添加后的实体</returns>
        T Save(DbTransaction trans, T entity);

        /// <summary>
        /// 更新字段
        /// </summary>
        /// <param name="entity">需要更新的实体</param>
        /// <returns>更新后的实体</returns>
        T Update(T entity);

        /// <summary>
        /// 更新字段
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="entity">需要更新的实体</param>
        /// <returns>更新后的实体</returns>
        T Update(DbConnection conn, T entity);

        /// <summary>
        /// 更新字段
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="entity">需要更新的实体</param>
        /// <returns>更新后的实体</returns>
        T Update(DbTransaction trans, T entity);

        /// <summary>
        /// 删除指定实体
        /// </summary>
        /// <param name="entity">需要删除的实体</param>
        /// <returns>是否删除成功</returns>
        bool Delete(T entity);

        /// <summary>
        /// 删除指定实体
        /// </summary>
        /// <param name="id">需要删除的实体ID</param>
        /// <returns>是否删除成功</returns>
        bool Delete(TKey id);

        /// <summary>
        /// 删除指定实体
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="id">需要删除的实体ID</param>
        /// <returns>是否删除成功</returns>
        bool Delete(DbConnection conn, TKey id);

        /// <summary>
        /// 批量删除实例列表
        /// </summary>
        /// <param name="entityList">实例列表</param>
        /// <returns>是否删除成功</returns>
        bool Delete(List<T> entityList);

        /// <summary>
        /// 批量删除实例列表
        /// </summary>
        /// <param name="ids">实例ID列表</param>
        /// <returns>是否删除成功</returns>
        bool Delete(List<TKey> ids);

        /// <summary>
        /// 按照指定条件删除特定记录
        /// </summary>
        /// <returns>是否删除成功</returns>
        bool Delete();

        /// <summary>
        /// 按照指定条件删除特定记录
        /// </summary>
        /// <returns>是否删除成功</returns>
        bool Delete(DbConnection conn);

        /// <summary>
        /// 根据模型字段输出普通查询语句
        /// </summary>
        /// <example>
        ///     SELECT {0} FROM {1} WHERE {2} ORDER BY{3}
        /// </example>
        /// <returns></returns>
        string ToString();

        /// <summary>
        /// 双表关联查询预处理
        /// </summary>
        /// <param name="joinType">关联类型：空|INNER|LEFT|RIGHT|FULL|OUTER</param>
        /// <param name="querySecond">关联表的查询实例</param>
        /// <param name="leftField">主表的关联字段</param>
        /// <param name="rightField">关联表的关联字段</param>
        /// <param name="exps">条件</param>
        /// <param name="orders">排序</param>
        /// <returns>自身实例</returns>
        IQuery<T, TKey> Join(string joinType, object querySecond, string leftField, string rightField);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jointTables"></param>
        /// <param name="jointString"></param>
        /// <param name="types"></param>
        /// <param name="extraFields"></param>
        /// <returns></returns>
        IQuery<T, TKey> Join(string[] jointTables, string jointString, Type[] types, string extraFields);

        /// <summary>
        /// 获取关联查询返回的总记录数
        /// </summary>
        /// <returns>关联查询返回的总记录数</returns>
        int Count4Join();

        /// <summary>
        /// 双表关联查询获取记录集
        /// </summary>
        /// <param name="entityType">关联表的实例类型</param>
        /// <param name="entityRight">关联表的实例，返回时将关联表的数据写入到此参数中</param>
        /// <param name="querySecond">关联表的查询实例</param>
        /// <returns>主表的数据</returns>
        List<T> List4Join(Type entityType, ref object entityRight, object querySecond);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        List<T> List4Join();

        /// <summary>
        /// 排序
        /// </summary>
        List<Order> Orders { get; }

        /// <summary>
        /// 条件表达式
        /// </summary>
        List<SimpleExpression> Expressions { get; }

        /// <summary>
        /// 数据库连接字符串
        /// </summary>
        string ConnectionString { get; }

        /// <summary>
        /// 是否自动增长主键
        /// </summary>
        bool AutoPK { get; set; }

        /// <summary>
        /// 移除所有条件表达式和所有排序字段
        /// 取消分页信息
        /// </summary>
        /// <returns></returns>
        IQuery<T, TKey> Reset();

        /// <summary>
        /// 移除所有条件表达式和所有排序字段
        /// </summary>
        /// <returns></returns>
        IQuery<T, TKey> Clear();

        /// <summary>
        /// 移除所有条件表达式
        /// </summary>
        void ClearExpression();

        /// <summary>
        /// 移除所有排序字段
        /// </summary>
        void ClearOrder();
    }
}