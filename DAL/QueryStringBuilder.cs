using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection;
using Hope.Util;
using Hope.DAL.DBUtil;

namespace Hope.DAL
{
    /// <summary>
    /// 创建搜索SQL字符串
    /// </summary>
    public class QueryStringBuilder<T, TKey> : IQuery<T, TKey>
    {
        #region 变量初始化

        /// <summary>
        /// 预定义整型值
        /// </summary>
        public static readonly int NoValue = -1;
        public static readonly int FirstRecordNumber = 1;
        public static readonly int MaxRecordCount = 9999;

        private static List<SimpleExpression> expres;
        private List<SqlParameter> parameters;
        private static List<Order> orders;
        private int firstResult = FirstRecordNumber;
        private int maxResult = MaxRecordCount;
        public string selectString = string.Empty;             // Field1,Field2,Field3......
        private string setString = string.Empty;             // Field1,Field2,Field3......        
        private string whereString = "1=1";                     // 用于一般查询的WHERE条件，使用参数
        private string filterString = "1=1";                    // 用于存储过程的过滤条件，直接使用SQL COMMAND TEXT
        private string valueString = string.Empty;              // @Field1,@Field2,@Field3.......
        private string groupbySelectString = string.Empty;
        private string groupbyString = string.Empty;
        private string orderbyString = string.Empty;
        private PropertyInfo[] propInfo;
        private PropertyInfo primaryProp;                       // 主键的属性        
        private string SP_GetPagedList = "sp_GetPagedList";
        private string SP_GetCount = "sp_GetCount";
        private bool isSelectFieldCustom = false;
        //private string cmdText_GetListByPager = "DECLARE @GetTotalSql NVARCHAR(300);SET @GetTotalSql='SELECT @TotalRecord=COUNT(*) FROM '+@TableNames;EXECUTE sp_executesql @GetTotalSql, N'@TotalRecord int output',@TotalRecord OUTPUT;EXECUTE sp_GetPagerList @TableNames,@PrimaryKey,@Fields,@PageSize,@CurrentPage,@Filter,@Group,@Order;";

        public List<string> selectFieldList;                   // 需要Select的字段
        private static List<string> selectFieldList_LowerCase;                   // 需要Select的字段
        public string tableName = string.Empty;
        private string tableNames = string.Empty;               // 关联表用
        public string primaryKeyName = string.Empty;
        bool needComma = false;

        // For Join
        List<string> selectFieldList4Join = new List<string>();
        List<string> selectFieldList4Join_LowerCase = new List<string>();
        string filterString4Join = "1=1";
        string orderbyString4Join = "";
        static string selectString4Join = "";

        string connectionString = "";     //数据库连接字符串

        //bool isAspNetPagerEnable = true;    //HopeCMS使用AspNetPager，其StartRecordIndex从1开始，针对MySQL则需要转换为0
        bool autoPK = true;

        #endregion

        #region 构造初始化

        /// <summary>
        /// 构造函数
        /// </summary>
        public QueryStringBuilder()
        {
            expres = new List<SimpleExpression>();
            parameters = new List<SqlParameter>();
            orders = new List<Order>();

            propInfo = typeof(T).GetProperties();
            selectFieldList = new List<string>();
            selectFieldList_LowerCase = new List<string>();

            try
            {
                this.connectionString = SqlHelper.ConnectionStringLocalTransaction;
            }
            catch (Exception)
            {
            }
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="primaryKeyName"></param>
        public QueryStringBuilder(string tableName, string primaryKeyName)
            : this()
        {
            this.tableName = tableName;
            this.primaryKeyName = primaryKeyName;

            // 初始化字段和主键字段
            foreach (PropertyInfo prop in propInfo)
            {
                if (prop.Name == primaryKeyName)
                {
                    primaryProp = prop;
                }

                if (!selectFieldList_LowerCase.Contains(prop.Name.ToLower()))
                {
                    selectFieldList.Add(prop.Name);
                    selectFieldList_LowerCase.Add(prop.Name.ToLower());
                }
            }
        }

        public QueryStringBuilder(string tableName, string primaryKeyName, string conn)
            : this(tableName, primaryKeyName)
        {
            this.connectionString = conn;
        }

        #endregion

        #region 预准备

        /// <summary>
        /// 设置SELECT的字段，覆盖实例的自动属性
        /// </summary>
        /// <param name="fileds"></param>
        /// <returns></returns>
        public IQuery<T, TKey> SetSelectField(string fileds)
        {
            if (!string.IsNullOrEmpty(fileds))
            {
                selectString = fileds;
                isSelectFieldCustom = true;
            }
            return this;
        }

        /// <summary>
        /// 添加表达式
        /// </summary>
        /// <param name="exp">表达式</param>
        /// <returns>自身实例</returns>
        public IQuery<T, TKey> AddExp(SimpleExpression exp)
        {
            if (!expres.Contains(exp))
            {
                expres.Add(exp);
            }
            return this;
        }

        /// <summary>
        /// 添加表达式
        /// </summary>
        /// <param name="exp">表达式</param>
        /// <returns>自身实例</returns>
        public IQuery<T, TKey> AddExp(List<SimpleExpression> exp)
        {
            expres.AddRange(exp);
            return this;
        }

        /// <summary>
        /// 设置第一个记录的位置
        /// </summary>
        /// <param name="firstResult">第一个记录的位置，默认是1，如果小于1则置为1</param>
        /// <returns>自身实例</returns>
        public IQuery<T, TKey> SetFirstResult(int firstResult)
        {
            this.firstResult = firstResult;
            return this;
        }

        /// <summary>
        /// 设置获取最大记录数量
        /// </summary>
        /// <param name="maxResult">获取最大记录数量</param>
        /// <returns>自身实例</returns>
        public IQuery<T, TKey> SetMaxResult(int maxResult)
        {
            this.maxResult = maxResult;
            return this;
        }

        /// <summary>
        /// 添加排序字段
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="descending">是否降序</param>
        /// <returns></returns>
        public IQuery<T, TKey> AddOrder(string propertyName, bool descending)
        {
            orders.Add(new Order(propertyName, descending));
            return this;
        }

        /// <summary>
        /// 按字段排序，默认为升序
        /// </summary>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public IQuery<T, TKey> AddOrder(string propertyName)
        {
            orders.Add(Order.Asc(propertyName));
            return this;
        }

        /// <summary>
        /// 添加按字段排序
        /// </summary>
        /// <param name="order">排序字段</param>
        /// <returns>自身实例</returns>
        public IQuery<T, TKey> AddOrder(Order order)
        {
            if (!orders.Contains(order))
            {
                orders.Add(order);
            }
            return this;
        }

        /// <summary>
        /// 添加按字段排序
        /// </summary>
        /// <param name="order">排序字段</param>
        /// <returns>自身实例</returns>
        public IQuery<T, TKey> AddOrder(List<Order> order)
        {
            orders.AddRange(order);
            return this;
        }

        /// <summary>
        /// 添加分组的字段，用于Group的字段
        /// </summary>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public IQuery<T, TKey> AddGroupBy(string propertyName)
        {
            bool needComma = false;

            if (!groupbyString.Contains(propertyName))
            {
                if (needComma)
                {
                    groupbyString += " ,";
                    groupbySelectString += " ,";
                }

                groupbyString += propertyName;                                          // 拼接GROUP BY字符串
                groupbySelectString += propertyName;                                    // 拼接SELECT字符串

                needComma = true;
            }

            return this;
        }

        /// <summary>
        /// 添加分组的聚合方法，用于SELECT的内容
        /// </summary>
        /// <param name="aggregateName"></param>
        /// <returns></returns>
        public IQuery<T, TKey> AddGroupByAggr(string aggregateName)
        {
            bool needComma = false;

            if (!groupbySelectString.Contains(aggregateName))
            {
                if (needComma)
                {
                    groupbySelectString += " ,";
                }

                groupbySelectString += aggregateName;                                    // 拼接SELECT字符串

                needComma = true;
            }

            return this;
        }

        /// <summary>
        /// 准备执行SQL命令的预处理
        /// </summary>
        private void PrepareCommand()
        {
            if (!isSelectFieldCustom)
            {
                // 设置Select语句
                SetSelectString();
            }
            SetSetString();
            SetWhereString();
            SetOrderByString();
        }

        #endregion

        #region 提取数据

        /// <summary>
        /// 执行查询操作
        /// </summary>
        /// <returns></returns>
        public List<T> ListALL()
        {
            List<T> list = new List<T>();
            T data = default(T);
            string commandText = this.ToString();

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, commandText, this.parameters.ToArray()))
                {
                    while (rdr.Read())
                    {
                        data = LoadData(rdr);
                        list.Add(data);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:ListALL()");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return list;
        }

        /// <summary>
        /// 执行分页查询操作
        /// </summary>
        /// <returns></returns>
        public List<T> List()
        {
            List<T> list = new List<T>();
            T data = default(T);

            PrepareCommand();

            SqlParameter[] param = new SqlParameter[]
            {
                new SqlParameter("@TableNames",SqlDbType.VarChar,500),
                new SqlParameter("@PrimaryKey",SqlDbType.VarChar,100),
                new SqlParameter("@Fields",SqlDbType.VarChar,8000),
                new SqlParameter("@StartIndex",SqlDbType.Int,4),
                new SqlParameter("@EndIndex",SqlDbType.Int,4),
                new SqlParameter("@Filter",SqlDbType.VarChar,1000),
                new SqlParameter("@Group",SqlDbType.VarChar,200),
                new SqlParameter("@Order",SqlDbType.VarChar,200),
            };

            param[0].Value = tableName;
            param[1].Value = primaryKeyName;
            param[2].Value = selectString;
            param[3].Value = firstResult;
            param[4].Value = firstResult + maxResult - 1; //当前页要显示的记录的结束索引;
            param[5].Value = filterString;
            param[6].Value = "";
            param[7].Value = orderbyString;

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.StoredProcedure, SP_GetPagedList, param))
                {
                    while (rdr.Read())
                    {
                        data = LoadData(rdr);
                        list.Add(data);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:List()");
                LogUtil.debug(string.Format("@TableNames:[{0}]; @PrimaryKey:[{1}]; @Fields:[{2}]; @StartIndex:[{3}]; @EndIndex:[{4}]; @Filter:[{5}]; @Group:[{6}]; @Order:[{7}]", tableName, primaryKeyName, selectString, firstResult, param[4].Value, filterString, "", orderbyString));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return list;
        }

       

        /// <summary>
        /// 执行分页查询操作
        /// </summary>
        /// <param name="pager"></param>
        /// <returns></returns>
        /// <remarks>用于PagerData分页</remarks>
        public List<T> List(PagerData pager)
        {
            List<T> list = new List<T>();
            T data = default(T);

            PrepareCommand();

            SqlParameter[] param = new SqlParameter[]
            {
                new SqlParameter("@TableNames",SqlDbType.VarChar,500),
                new SqlParameter("@PrimaryKey",SqlDbType.VarChar,100),
                new SqlParameter("@Fields",SqlDbType.VarChar,8000),
                new SqlParameter("@PageSize",SqlDbType.Int,4),
                new SqlParameter("@CurrentPage",SqlDbType.Int,4),
                new SqlParameter("@Filter",SqlDbType.VarChar,1000),
                new SqlParameter("@Group",SqlDbType.VarChar,200),
                new SqlParameter("@Order",SqlDbType.VarChar,200),
                new SqlParameter("@TotalRecord",SqlDbType.Int,4),
            };

            param[0].Value = tableName;
            param[1].Value = primaryKeyName;
            param[2].Value = selectString;
            param[3].Value = pager.PageSize;
            param[4].Value = pager.CurrentPage;
            param[5].Value = filterString;
            param[6].Value = "";
            param[7].Value = orderbyString;
            param[8].Direction = ParameterDirection.Output;

            try
            {
                //20120825，江剑锋添加
                string cmdText = string.Format("SELECT TOP({0}) {1} FROM {2} WHERE({4} NOT IN (SELECT TOP({3}) {4} FROM {2})) ORDER BY {5}", 
                    pager.PageSize, selectString, tableName, (pager.CurrentPage - 1)*pager.PageSize,primaryKeyName, orderbyString);

                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, /*cmdText_GetListByPager*/cmdText, /*param*/null))
                {
                    while (rdr.Read())
                    {
                        data = LoadData(rdr);
                        list.Add(data);
                    }
                }
                //pager.TotalRecord = (int)param[8].Value;    // 设置总页数

                LogUtil.info("Class:QueryStringBuilder; Method:List()");
                LogUtil.debug(string.Format("@TableNames:[{0}]; @PrimaryKey:[{1}]; @Fields:[{2}]; @StartIndex:[{3}]; @EndIndex:[{4}]; @Filter:[{5}]; @Group:[{6}]; @Order:[{7}]", tableName, primaryKeyName, selectString, firstResult, param[4].Value, filterString, "", orderbyString));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return list;
        }

        /// <summary>
        /// 获取记录总数
        /// </summary>
        /// <returns>记录总数</returns>
        public int Count()
        {
            // 设置filterString
            SetWhereString();

            int count = 0;

            SqlParameter[] param = new SqlParameter[]
            {
                new SqlParameter("@TableName",SqlDbType.NVarChar,500),
                new SqlParameter("@PrimaryKey",SqlDbType.NVarChar,100),
                new SqlParameter("@StrWhere",SqlDbType.NVarChar,2000),
            };

            param[0].Value = tableName;
            param[1].Value = primaryKeyName;
            param[2].Value = filterString;

            try
            {
                //count = (int)SqlHelper.ExecuteScalar(ConnectionString, CommandType.StoredProcedure, SP_GetCount, param);
                PrepareCommand();
                string cmdText = string.Format("SELECT COUNT({0}) FROM {1} WHERE {2}", primaryKeyName, tableName, filterString);
                count = (int)SqlHelper.ExecuteScalar(ConnectionString, CommandType.Text, cmdText, param);

                LogUtil.info("Class:QueryStringBuilder; Method:Count()");
                LogUtil.debug(string.Format("@TableNames:[{0}]; @PrimaryKey:[{1}]; @StrWhere:[{2}]", tableName, primaryKeyName, filterString));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return count;
        }

        /// <summary>
        /// 根据主键获取记录
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns>具体的实体</returns>
        public T GetById(TKey id)
        {
            T data = default(T);
            SetSelectString();

            SqlParameter param = new SqlParameter("@" + primaryKeyName, id);

            string commandText = string.Format("SELECT {0} FROM {1} WHERE {2}=@{2}", selectString, tableName, primaryKeyName);

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, commandText, param))
                {
                    if (rdr.Read())
                    {
                        data = LoadData(rdr);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:GetById(TKey id)");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return data;
        }

        /// <summary>
        /// 根据条件获取记录
        /// </summary>
        /// <returns>具体的实体</returns>
        public T Data()
        {
            T data = default(T);
            PrepareCommand();

            string commandText = string.Format("SELECT {0} FROM {1} WHERE {2}", selectString, tableName, filterString);

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, commandText, null))
                {
                    if (rdr.Read())
                    {
                        data = LoadData(rdr);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:Data()");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return data;
        }

        /// <summary>
        /// 获取第一条记录
        /// </summary>
        /// <returns></returns>
        public T GetFirst()
        {
            T data = default(T);

            AddOrder(primaryKeyName, true);                   // 默认按主键升序排列
            SetOrderByString();

            string commandText = string.Format("SELECT TOP 1 * FROM {0} ORDER BY {1}", tableName, orderbyString);

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, commandText, null))
                {
                    if (rdr.Read())
                    {
                        data = LoadData(rdr);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:GetFirst()");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return data;
        }

        /// <summary>
        /// 获取前n条记录的集合
        /// </summary>
        /// <param name="count">前n条</param>
        /// <returns></returns>
        public List<T> GetTop(int count)
        {
            List<T> list = new List<T>();
            T data = default(T);

            AddOrder(primaryKeyName, false);                   // 默认按主键升序排列
            SetOrderByString();

            string commandText = string.Format("SELECT TOP {0} * FROM {1} WHERE {2}  ORDER BY {3}", count, tableName, filterString, orderbyString);

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, commandText, null))
                {
                    while (rdr.Read())
                    {
                        data = LoadData(rdr);
                        list.Add(data);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:GetFirst()");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return list;
        }

        /// <summary>
        /// 获取后n条记录的集合
        /// </summary>
        /// <param name="count">后n条</param>
        /// <returns></returns>
        public List<T> GetLast(int count)
        {
            List<T> list = new List<T>();
            T data = default(T);

            // 默认按主键降序排列
            AddOrder(primaryKeyName, true);                   

            //调用该方法，拼接查询字段、查询条件和排序要求            
            PrepareCommand();

            string commandText = string.Format("SELECT TOP {0} * FROM {1} WHERE {2}  ORDER BY {3}", count, tableName, filterString, orderbyString);

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, commandText, null))
                {
                    while (rdr.Read())
                    {
                        data = LoadData(rdr);
                        list.Add(data);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:GetFirst()");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return list;
        }

        /// <summary>
        /// 获取最后一条记录
        /// </summary>
        /// <returns></returns>
        public T GetLast()
        {
            T data = default(T);

            // 默认按主键降序排列
            AddOrder(primaryKeyName, false);                   

            //调用该方法，拼接查询字段、查询条件和排序要求
            PrepareCommand();

            string commandText = string.Format("SELECT TOP 1 * FROM {0} ORDER BY {1}", tableName, orderbyString);

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, commandText, null))
                {
                    if (rdr.Read())
                    {
                        data = LoadData(rdr);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:GetLast()");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return data;
        }

        #endregion

        #region CRUD

        /// <summary>
        /// 添加或保存，如果数据库已经存在，则使用 "更新" 操作，否则使用 "添加" 操作
        /// </summary>
        /// <param name="entity">添加或保存的实体</param>
        /// <returns>添加或保存后的实体</returns>
        public T SaveOrUpdate(T entity)
        {
            object primaryKeyValue = entity.GetType().GetProperty(primaryKeyName).GetValue(entity, null);

            if (primaryKeyValue != null && !primaryKeyValue.Equals(-1))
            {
                return Update(entity);
            }

            return Save(entity);
        }

        /// <summary>
        /// 添加或保存，如果数据库已经存在，则使用 "更新" 操作，否则使用 "添加" 操作
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="entity">添加或保存的实体</param>
        /// <returns>添加或保存后的实体</returns>
        public T SaveOrUpdate(DbConnection conn, T entity)
        {
            object primaryKeyValue = entity.GetType().GetProperty(primaryKeyName).GetValue(entity, null);

            if (primaryKeyValue != null && !primaryKeyValue.Equals(-1))
            {
                return Update(conn, entity);
            }

            return Save(conn, entity);
        }

        /// <summary>
        /// 添加或保存，如果数据库已经存在，则使用 "更新" 操作，否则使用 "添加" 操作
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="entity">添加或保存的实体</param>
        /// <returns>添加或保存后的实体</returns>
        public T SaveOrUpdate(DbTransaction trans, T entity)
        {
            object primaryKeyValue = entity.GetType().GetProperty(primaryKeyName).GetValue(entity, null);

            if (primaryKeyValue != null && !primaryKeyValue.Equals(-1))
            {
                return Update(trans, entity);
            }

            return Save(trans, entity);
        }

        /// <summary>
        /// 保存实例
        /// </summary>
        /// <param name="entity">需要添加的实体</param>
        /// <returns>添加后的实体</returns>
        public T Save(T entity)
        {
            T returnObject = default(T);

            // 初始化字段
            if (AutoPK) selectFieldList.Remove(primaryKeyName);         //排除主键

            SetSelectString();

            List<SqlParameter> param = new List<SqlParameter>();

            foreach (PropertyInfo prop in propInfo)
            {
                SqlParameter par = null;

                if (prop.Name == primaryKeyName)
                {
                    par = new SqlParameter();
                    par.ParameterName = "@" + prop.Name;
                    par.Direction = ParameterDirection.InputOutput;

                    par.Value = prop.GetValue(entity, null);
                    //if (!AutoPK) par.Value= prop.GetValue(entity, null);
                }
                else
                {
                    par = new SqlParameter();
                    par.ParameterName = "@" + prop.Name;
                    par.Value = prop.GetValue(entity, null);
                }

                param.Add(par);
            }

            string commandText = string.Format("INSERT INTO {0}({1}) VALUES({2});", tableName, selectString, valueString);
            if (AutoPK) commandText += string.Format("SET @{0}=@@IDENTITY;", primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, commandText, param.ToArray());
                if (i > 0)
                {
                    returnObject = entity;
                    primaryProp.SetValue(returnObject, param[0].Value, null);
                }

                LogUtil.info("Class:QueryStringBuilder; Method:Save(T entity)");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            if (AutoPK) selectFieldList.Add(primaryKeyName);         //重新添加主键
            return returnObject;
        }

        /// <summary>
        /// 保存实例
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="entity">需要添加的实体</param>
        /// <returns>添加后的实体</returns>
        public T Save(DbConnection conn, T entity)
        {
            T returnObject = default(T);

            // 初始化字段
            if (AutoPK) selectFieldList.Remove(primaryKeyName);         //排除主键
            SetSelectString();

            List<SqlParameter> param = new List<SqlParameter>();

            foreach (PropertyInfo prop in propInfo)
            {
                SqlParameter par = null;

                if (prop.Name == primaryKeyName)
                {
                    par = new SqlParameter();
                    par.ParameterName = "@" + prop.Name;
                    par.Direction = ParameterDirection.InputOutput;
                    if (!AutoPK) par.Value = prop.GetValue(entity, null);
                }
                else
                {
                    par = new SqlParameter();
                    par.ParameterName = "@" + prop.Name;
                    par.Value = prop.GetValue(entity, null);
                }

                param.Add(par);
            }

            string commandText = string.Format("INSERT INTO {0}({1}) VALUES({2});", tableName, selectString, valueString);
            if (AutoPK) commandText += string.Format("SET @{0}=@@IDENTITY;", primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery((conn as SqlConnection), CommandType.Text, commandText, param.ToArray());
                if (i > 0)
                {
                    returnObject = entity;
                    primaryProp.SetValue(returnObject, param[0].Value, null);
                }

                LogUtil.info("Class:QueryStringBuilder; Method:Save(DbConnection conn, T entity)");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            if (AutoPK) selectFieldList.Add(primaryKeyName);         //重新添加主键
            return returnObject;
        }

        /// <summary>
        /// 保存实例
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="entity">需要添加的实体</param>
        /// <returns>添加后的实体</returns>
        public T Save(DbTransaction trans, T entity)
        {
            T returnObject = default(T);

            // 初始化字段
            if (AutoPK) selectFieldList.Remove(primaryKeyName);         //排除主键
            SetSelectString();

            List<SqlParameter> param = new List<SqlParameter>();

            foreach (PropertyInfo prop in propInfo)
            {
                SqlParameter par = null;

                if (prop.Name == primaryKeyName)
                {
                    if (AutoPK)
                    {
                        par = new SqlParameter("@" + prop.Name, SqlDbType.Int, 4);
                        par.Direction = ParameterDirection.Output;
                    }
                    else
                    {
                        par = new SqlParameter();
                        par.ParameterName = "@" + prop.Name;
                        par.Value = prop.GetValue(entity, null);
                    }
                }
                else
                {
                    par = new SqlParameter();
                    par.ParameterName = "@" + prop.Name;
                    par.Value = prop.GetValue(entity, null);
                }

                param.Add(par);
            }

            string commandText = string.Format("INSERT INTO {0}({1}) VALUES({2});", tableName, selectString, valueString);
            if (AutoPK) commandText += string.Format("SET @{0}=@@IDENTITY;", primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery((trans as SqlTransaction), CommandType.Text, commandText, param.ToArray());
                if (i > 0)
                {
                    returnObject = entity;
                    primaryProp.SetValue(returnObject, param[0].Value, null);
                }

                LogUtil.info("Class:QueryStringBuilder; Method:Save(DbTransaction trans, T entity)");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            if (AutoPK) selectFieldList.Add(primaryKeyName);         //重新添加主键
            return returnObject;
        }

        /// <summary>
        /// 更新字段
        /// </summary>
        /// <param name="entity">需要更新的实体</param>
        /// <returns>更新后的实体</returns>
        public T Update(T entity)
        {

            string pk = primaryKeyName;
            if (primaryKeyName.Contains("."))
            {
                pk = primaryKeyName.Substring(primaryKeyName.LastIndexOf('.') + 1);
            }

            // 初始化字段
            if (AutoPK) selectFieldList.Remove(pk);         //排除主键
            SetSetString();

            List<SqlParameter> param = new List<SqlParameter>();

            foreach (PropertyInfo prop in propInfo)
            {
                SqlParameter par = new SqlParameter();
                par.ParameterName = "@" + prop.Name;
                par.Value = prop.GetValue(entity, null);
                param.Add(par);
            }
            string commandText = string.Format("UPDATE {0} SET {1} WHERE {2}=@{2};", tableName, setString, pk);

            try
            {
                int i = SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, commandText, param.ToArray());

                LogUtil.info("Class:QueryStringBuilder; Method:Update(T entity)");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            if (AutoPK) selectFieldList.Add(pk);         //重新添加主键
            return entity;
        }

        /// <summary>
        /// 更新字段
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="entity">需要更新的实体</param>
        /// <returns>更新后的实体</returns>
        public T Update(DbConnection conn, T entity)
        {
            // 初始化字段
            if (AutoPK) selectFieldList.Remove(primaryKeyName);         //排除主键
            SetSetString();

            List<SqlParameter> param = new List<SqlParameter>();

            foreach (PropertyInfo prop in propInfo)
            {
                SqlParameter par = new SqlParameter();
                par.ParameterName = "@" + prop.Name;
                par.Value = prop.GetValue(entity, null);
                param.Add(par);
            }

            string commandText = string.Format("UPDATE {0} SET {1} WHERE {2}=@{2};", tableName, setString, primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery((conn as SqlConnection), CommandType.Text, commandText, param.ToArray());

                LogUtil.info("Class:QueryStringBuilder; Method:Update(DbConnection conn, T entity)");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            if (AutoPK) selectFieldList.Add(primaryKeyName);         //重新添加主键
            return entity;
        }

        /// <summary>
        /// 更新字段
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="entity">需要更新的实体</param>
        /// <returns>更新后的实体</returns>
        public T Update(DbTransaction trans, T entity)
        {
            // 初始化字段
            if (AutoPK) selectFieldList.Remove(primaryKeyName);         //排除主键
            SetSetString();

            List<SqlParameter> param = new List<SqlParameter>();

            foreach (PropertyInfo prop in propInfo)
            {
                SqlParameter par = new SqlParameter();
                par.ParameterName = "@" + prop.Name;
                par.Value = prop.GetValue(entity, null);
                param.Add(par);
            }

            string commandText = string.Format("UPDATE {0} SET {1} WHERE {2}=@{2};", tableName, setString, primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery((trans as SqlTransaction), CommandType.Text, commandText, param.ToArray());

                LogUtil.info("Class:QueryStringBuilder; Method:Update(DbTransaction trans, T entity)");
                LogUtil.debug(string.Format("commandText:[{0}];", commandText));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            if (AutoPK) selectFieldList.Add(primaryKeyName);         //重新添加主键
            return entity;
        }

        /// <summary>
        /// 删除指定实体
        /// </summary>
        /// <param name="entity">需要删除的实体</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(T entity)
        {
            object primaryKeyValue = entity.GetType().GetProperty(primaryKeyName).GetValue(entity, null);

            // 如果ID值不存在或不合法， 则不执行删除，直接退出
            if (primaryKeyValue == null && primaryKeyValue.Equals(-1))
            {
                return false;
            }

            bool bResult = false;
            SqlParameter param = new SqlParameter("@" + primaryKeyName, primaryKeyValue);
            string commandText = string.Format("DELETE FROM {0} WHERE {1}=@{1};", tableName, primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, commandText, param);
                if (i > 0)
                {
                    bResult = true;
                }

                LogUtil.info("Class:QueryStringBuilder; Method:Delete(T entity)");
                LogUtil.debug(string.Format("commandText:[{0}]; @{1}:[{2}]", commandText, primaryKeyName, primaryKeyValue));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return bResult;
        }

        /// <summary>
        /// 删除指定实体
        /// </summary>
        /// <param name="id">需要删除的实体ID</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(TKey id)
        {
            bool bResult = false;
            SqlParameter param = new SqlParameter("@" + primaryKeyName, id);
            string commandText = string.Format("DELETE FROM {0} WHERE {1}=@{1};", tableName, primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, commandText, param);
                if (i > 0)
                {
                    bResult = true;
                }

                LogUtil.info("Class:QueryStringBuilder; Method:Delete(T entity)");
                LogUtil.debug(string.Format("commandText:[{0}]; @{1}:[{2}]", commandText, primaryKeyName, id));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return bResult;
        }

        /// <summary>
        /// 删除指定实体
        /// </summary>
        /// <param name="conn">数据库连接</param>
        /// <param name="id">需要删除的实体ID</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(DbConnection conn, TKey id)
        {
            bool bResult = false;
            SqlParameter param = new SqlParameter("@" + primaryKeyName, id);
            string commandText = string.Format("DELETE FROM {0} WHERE {1}=@{1};", tableName, primaryKeyName);

            try
            {
                int i = SqlHelper.ExecuteNonQuery((conn as SqlConnection), CommandType.Text, commandText, param);
                if (i > 0)
                {
                    bResult = true;
                }
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return bResult;
        }

        /// <summary>
        /// 批量删除实例列表
        /// </summary>
        /// <param name="entityList">实例列表</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(List<T> entityList)
        {
            bool bResult = false;

            SqlParameter param = null;
            string commandText = string.Format("DELETE FROM {0} WHERE {1}=@{1};", tableName, primaryKeyName);

            SqlConnection conn = new SqlConnection(ConnectionString);
            conn.Open();
            SqlTransaction trans = conn.BeginTransaction("DELETELIST");

            try
            {
                foreach (T entity in entityList)
                {
                    object primaryKeyValue = entity.GetType().GetProperty(primaryKeyName).GetValue(entity, null);

                    // 如果ID值不存在或不合法， 则不执行删除，直接退出
                    if (primaryKeyValue == null && primaryKeyValue.Equals(-1))
                    {
                        throw new Exception("Invalid Entities List!");
                    }

                    param = new SqlParameter("@" + primaryKeyName, primaryKeyValue);

                    SqlHelper.ExecuteNonQuery(trans, CommandType.Text, commandText, param);

                    LogUtil.info("Class:QueryStringBuilder; Method:Delete(List<T> entityList)");
                    LogUtil.debug(string.Format("commandText:[{0}]; @{1}:[{2}]", commandText, primaryKeyName, primaryKeyValue));
                }
                trans.Commit();

                bResult = true;
            }
            catch (Exception ex)
            {
                trans.Rollback("DELETELIST");
                LogUtil.error(ex.Message);
                throw;
            }
            finally
            {
                conn.Close();
            }
            return bResult;
        }

        /// <summary>
        /// 批量删除实例列表
        /// </summary>
        /// <param name="ids">实例ID列表</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(List<TKey> ids)
        {
            bool bResult = false;

            SqlParameter param = null;
            string commandText = string.Format("DELETE FROM {0} WHERE {1}=@{1};", tableName, primaryKeyName);

            SqlConnection conn = new SqlConnection(ConnectionString);
            conn.Open();
            SqlTransaction trans = conn.BeginTransaction("DELETELIST");

            try
            {
                foreach (TKey id in ids)
                {
                    param = new SqlParameter("@" + primaryKeyName, id);

                    SqlHelper.ExecuteNonQuery(trans, CommandType.Text, commandText, param);

                    LogUtil.info("Class:QueryStringBuilder; Method:Delete(List<TKey> ids)");
                    LogUtil.debug(string.Format("commandText:[{0}]; @{1}:[{2}]", commandText, primaryKeyName, id));
                }
                trans.Commit();

                bResult = true;
            }
            catch (Exception ex)
            {
                trans.Rollback("DELETELIST");
                LogUtil.error(ex.Message);
                throw;
            }
            finally
            {
                conn.Close();
            }
            return bResult;
        }

        /// <summary>
        /// 按照指定条件删除特定记录
        /// </summary>
        /// <returns>是否删除成功</returns>
        public bool Delete()
        {
            PrepareCommand();

            bool bResult = false;

            string commandText = string.Format("DELETE FROM {0}", tableName);
            if (filterString != "")
            {
                commandText += " WHERE " + filterString;
            }
            else
            {
                commandText += " WHERE 1==0";
            }

            try
            {
                int i = SqlHelper.ExecuteNonQuery(connectionString, CommandType.Text, commandText, null);
                if (i > 0)
                {
                    bResult = true;
                }
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return bResult;
        }

        /// <summary>
        /// 按照指定条件删除特定记录
        /// </summary>
        /// <returns>是否删除成功</returns>
        public bool Delete(DbConnection conn)
        {
            PrepareCommand();

            bool bResult = false;

            string commandText = string.Format("DELETE FROM {0}", tableName);
            if (filterString != "")
            {
                commandText += " WHERE " + filterString;
            }
            else
            {
                commandText += " WHERE 1==0";
            }

            try
            {
                int i = SqlHelper.ExecuteNonQuery((conn as SqlConnection), CommandType.Text, commandText, null);
                if (i > 0)
                {
                    bResult = true;
                }
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }
            return bResult;
        }
        #endregion

        #region 通用工具，受保护方法

        private T LoadData(SqlDataReader rdr)
        {
            T returnObject = (T)Assembly.GetAssembly(typeof(T)).CreateInstance(typeof(T).ToString());
            object obj = null;
            foreach (PropertyInfo prop in propInfo)
            {
                switch (prop.PropertyType.FullName)
                {
                    case "System.Int16":
                        obj = ConvertHelper.ToShort(rdr[prop.Name]);
                        break;

                    case "System.Int32":
                        obj = ConvertHelper.ToInt(rdr[prop.Name]);
                        break;

                    case "System.Int64":
                        obj = ConvertHelper.ToLong(rdr[prop.Name]);
                        break;

                    case "System.Boolean":
                        obj = ConvertHelper.ToBoolean(rdr[prop.Name]);
                        break;

                    case "System.String":
                        obj = ConvertHelper.ToString(rdr[prop.Name]);
                        break;

                    case "System.Byte":
                        obj = ConvertHelper.ToByte(rdr[prop.Name]);
                        break;

                    case "System.DateTime":
                        obj = ConvertHelper.ToDateTime(rdr[prop.Name]);
                        break;

                    case "System.Decimal":
                        obj = ConvertHelper.ToDecimal(rdr[prop.Name]);
                        break;

                    case "System.Double":
                        obj = ConvertHelper.ToDouble(rdr[prop.Name]);
                        break;

                    case "System.Single":
                        obj = ConvertHelper.ToFloat(rdr[prop.Name]);
                        break;

                    default: if (rdr[prop.Name].ToString() != "") obj = rdr[prop.Name].ToString();
                        break;
                }

                if (obj != null)
                {
                    try
                    {
                        prop.SetValue(returnObject, obj, null);
                    }
                    catch (Exception)
                    {
                        obj = ConvertHelper.ToInt(obj);
                        prop.SetValue(returnObject, obj, null);
                    }

                }
            }

            return returnObject;
        }

        /// <summary>
        /// 设置Select语句
        /// </summary>
        private void SetSelectString()
        {
            bool needComma = false;
            selectString = valueString = "";

            foreach (string fieldName in selectFieldList)
            {
                if (needComma)
                {
                    selectString += " ,";
                    valueString += " ,";
                }
                selectString += fieldName;                                          // 拼接字符串
                valueString += "@" + fieldName;

                needComma = true;
            }
        }

        /// <summary>
        /// 设置Where语句
        /// </summary>
        private void SetWhereString()
        {
            //检查参数
            CheckExpression();

            filterString = "1=1";
            whereString = "1=1";
            parameters.Clear();

            foreach (SimpleExpression exp in expres)
            {
                whereString += string.Format(" {0} {1}", exp.JoinType, exp.ToParamString());      // 拼接含参数字符串

                parameters.Add(new SqlParameter(exp.ParamName, exp.Value));                    // 添加参数

                foreach (SimpleExpression sib in exp.Siblings)
                {
                    parameters.Add(new SqlParameter(sib.ParamName, sib.Value));                // 添加复合参数
                }

                filterString += string.Format(" {0} {1}", exp.JoinType, exp.ToString());          // 拼接SQL COMMAND TEXT
            }
        }

        /// <summary>
        /// 确保参数名不包含表名和句点.，确保条件不会重复
        /// </summary>
        private void CheckExpression()
        {
            Hashtable temp = new Hashtable();
            int index = 10;
            foreach (SimpleExpression ex in expres)
            {
                if (ex.PropertyName.Contains("."))
                {
                    ex.ParamName = ex.PropertyName.Substring(ex.PropertyName.LastIndexOf('.') + 1) + index.ToString();
                }
                else
                {
                    ex.ParamName = ex.PropertyName + index.ToString();
                }

                foreach (SimpleExpression sib in ex.Siblings)
                {
                    if (sib.PropertyName.Contains("."))
                    {
                        sib.ParamName = sib.PropertyName.Substring(sib.PropertyName.LastIndexOf('.') + 1) + index.ToString() + index.ToString();
                    }
                    else
                    {
                        sib.ParamName = sib.PropertyName + index.ToString() + index.ToString();
                    }
                }

                temp.Add(ex.ParamName, ex);

                index += 10;
            }

            //以下判断只是为了双重保险
            if (temp.Count != expres.Count)
            {
                expres.Clear();

                foreach (DictionaryEntry de in temp)
                {
                    expres.Add((SimpleExpression)de.Value);
                }
            }
        }

        /// <summary>
        /// 设置OrderBy语句
        /// </summary>
        private void SetOrderByString()
        {
            bool needAnd = false;
            orderbyString = "";

            foreach (Order order in orders)
            {
                if (!orderbyString.Contains(order.propertyName))
                {
                    if (needAnd)
                    {
                        orderbyString += " ,";
                    }

                    if (!orderbyString.Contains(order.ToString()))
                    {
                        orderbyString += string.Format(" {0}", order.ToString());
                    }

                    needAnd = true;
                }
            }

            // 如果没有设置Order，按主键升序排序
            if (!isSelectFieldCustom && string.IsNullOrEmpty(orderbyString))
            {
                orderbyString += Order.Asc(primaryKeyName).ToString();
            }
        }

        /// <summary>
        /// Update字段的Set字符串
        /// </summary>
        private void SetSetString()
        {
            bool needComma = false;
            setString = "";

            foreach (string fieldName in selectFieldList)
            {
                if (needComma)
                {
                    setString += " ,";
                }

                setString += "[" + fieldName + "]" + "=@" + fieldName;

                needComma = true;
            }
        }

        #endregion

        /// <summary>
        /// 根据模型字段自动设置SELECT语句
        /// </summary>
        public override string ToString()
        {
            PrepareCommand();

            return string.Format("SELECT {0} FROM {1} WHERE {2} ORDER BY {3}", selectString, tableName, whereString, orderbyString);
        }

        #region 不被覆盖的方法

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
        public IQuery<T, TKey> Join(string joinType, object querySecond, string leftField, string rightField)
        {
            // -------------------------------------------------- 获取第二个对象的变量 -------------------------------------------------------

            List<string> rightSelectFieldList = (List<string>)querySecond.GetType().GetField("selectFieldList").GetValue(querySecond);

            string rightTableName = querySecond.GetType().GetField("tableName").GetValue(querySecond).ToString();

            // -------------------------------------------------- 构造@TableNames -------------------------------------------------------

            this.tableNames = string.Format("{0} {1} JOIN {2} ON {3}.{4}={2}.{5}", this.tableName, joinType, rightTableName, this.tableName, leftField, rightField);

            // -------------------------------------------------- 构造@Fields -------------------------------------------------------

            // 添加主表的字段

            //List<string> selectFieldList4Join = new List<string>();
            //List<string> selectFieldList4Join_LowerCase = new List<string>();
            selectFieldList4Join.Clear();
            selectFieldList4Join_LowerCase.Clear();

            // 初始化字段和主键字段
            foreach (PropertyInfo prop in propInfo)
            {
                if (prop.Name == primaryKeyName)
                {
                    primaryProp = prop;
                }

                if (!selectFieldList4Join_LowerCase.Contains(prop.Name.ToLower()))
                {
                    selectFieldList4Join.Add(prop.Name);
                    selectFieldList4Join_LowerCase.Add(prop.Name.ToLower());
                }
            }

            needComma = false;
            selectString4Join = "";

            foreach (string fieldName in selectFieldList)
            {
                if (needComma)
                {
                    selectString4Join += " ,";
                }

                selectString4Join += string.Format("{0}.{1}", this.tableName, fieldName);                                          // 拼接字符串

                needComma = true;
            }

            //
            // 关联表
            //
            needComma = !string.IsNullOrEmpty(selectString4Join);

            // 添加关联表的字段，构造@Field
            foreach (string fieldName in rightSelectFieldList)
            {
                if (!selectFieldList4Join_LowerCase.Contains(fieldName.ToLower()))
                {
                    selectFieldList4Join.Add(fieldName);
                    selectFieldList4Join_LowerCase.Add(fieldName.ToLower());

                    if (needComma)
                    {
                        selectString4Join += " ,";
                    }

                    selectString4Join += string.Format("{0}.{1}", rightTableName, fieldName);                                          // 拼接字符串
                    needComma = true;
                }
            }

            // -------------------------------------------------- 构造@Filter -------------------------------------------------------
            filterString4Join = "1=1";
            foreach (SimpleExpression exp in expres)
            {
                if (filterString4Join.Contains(valueString.ToString()))
                {
                    continue;
                }
                filterString4Join += string.Format(" {0} {1}", exp.JoinType, exp.ToString());           // 拼接SQL COMMAND TEXT
            }

            // -------------------------------------------------- 构造@Order -------------------------------------------------------
            // 如果没有设置Order，按主键升序排序
            needComma = false;

            orderbyString4Join = "";
            foreach (Order order in orders)
            {
                if (orderbyString4Join.Contains(orders.ToString()))
                {
                    continue;
                }
                if (needComma)
                {
                    orderbyString4Join += " ,";
                }

                orderbyString4Join += string.Format(" {0}.{1}", this.tableName, order.ToString());

                needComma = true;
            }
            if (string.IsNullOrEmpty(orderbyString4Join))
            {
                orderbyString4Join += string.Format(" {0}.{1}", this.tableName, Order.Asc(primaryKeyName).ToString());
            }

            return this;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jointTables"></param>
        /// <param name="jointString"></param>
        /// <param name="types"></param>
        /// <param name="extraFields"></param>
        /// <returns></returns>
        public IQuery<T, TKey> Join(string[] jointTables, string jointString, Type[] types, string extraFields)
        {
            // 表名
            this.tableNames = this.tableName + " " + jointString;

            selectFieldList4Join.Clear();
            selectFieldList4Join_LowerCase.Clear();


            // 初始化字段和主键字段
            foreach (PropertyInfo prop in propInfo)
            {
                if (prop.Name == primaryKeyName)
                {
                    primaryProp = prop;
                }

                if (!selectFieldList4Join_LowerCase.Contains(prop.Name.ToLower()))
                {
                    selectFieldList4Join.Add(prop.Name);
                    selectFieldList4Join_LowerCase.Add(prop.Name.ToLower());
                }
            }

            needComma = false;
            selectString4Join = "";

            foreach (string fieldName in selectFieldList)
            {
                if (needComma)
                {
                    selectString4Join += " ,";
                }

                selectString4Join += string.Format("{0}.{1}", this.tableName, fieldName);                                          // 拼接字符串

                needComma = true;
            }

            //
            // 关联表
            //
            needComma = !string.IsNullOrEmpty(selectString4Join);

            // 添加关联表的字段，构造@Field
            int tableIndex = 0;
            foreach (Type type in types)
            {
                // 初始化字段和主键字段
                foreach (PropertyInfo prop in type.GetProperties())
                {
                    if (!selectFieldList4Join_LowerCase.Contains(prop.Name.ToLower()))
                    {
                        selectFieldList4Join.Add(prop.Name);
                        selectFieldList4Join_LowerCase.Add(prop.Name.ToLower());

                        if (needComma)
                        {
                            selectString4Join += " ,";
                        }

                        selectString4Join += string.Format("{0}.{1}", jointTables[tableIndex], prop.Name);                                          // 拼接字符串
                        needComma = true;
                    }
                }
                ++tableIndex;
            }

            if (!string.IsNullOrEmpty(extraFields))
            {
                selectString4Join += ", " + extraFields;
            }

            PrepareCommand();

            return this;
        }

        private object LoadData(SqlDataReader rdr, Type type)
        {
            object returnObject = Assembly.GetAssembly(type).CreateInstance(type.ToString());

            PropertyInfo[] props = returnObject.GetType().GetProperties();

            object obj = null;
            foreach (PropertyInfo prop in props)
            {
                switch (prop.PropertyType.FullName)
                {
                    case "System.Int16":
                        obj = ConvertHelper.ToShort(rdr[prop.Name]);
                        break;

                    case "System.Int32":
                        obj = ConvertHelper.ToInt(rdr[prop.Name]);
                        break;

                    case "System.Int64":
                        obj = ConvertHelper.ToLong(rdr[prop.Name]);
                        break;

                    case "System.Boolean":
                        obj = ConvertHelper.ToBoolean(rdr[prop.Name]);
                        break;

                    case "System.String":
                        obj = ConvertHelper.ToString(rdr[prop.Name]);
                        break;

                    case "System.Byte":
                        obj = ConvertHelper.ToByte(rdr[prop.Name]);
                        break;

                    case "System.DateTime":
                        obj = ConvertHelper.ToDateTime(rdr[prop.Name]);
                        break;

                    case "System.Decimal":
                        obj = ConvertHelper.ToDecimal(rdr[prop.Name]);
                        break;

                    case "System.Double":
                        obj = ConvertHelper.ToDouble(rdr[prop.Name]);
                        break;

                    case "System.Single":
                        obj = ConvertHelper.ToFloat(rdr[prop.Name]);
                        break;

                    default: if (rdr[prop.Name].ToString() != "") obj = rdr[prop.Name].ToString();
                        break;
                }

                if (obj != null)
                {
                    try
                    {
                        prop.SetValue(returnObject, obj, null);
                    }
                    catch (Exception)
                    {
                        obj = ConvertHelper.ToInt(obj);
                        prop.SetValue(returnObject, obj, null);
                    }
                }
            }

            return returnObject;
        }

        /// <summary>
        /// 获取关联查询返回的总记录数
        /// </summary>
        /// <returns>关联查询返回的总记录数</returns>
        public int Count4Join()
        {
            int count = 0;

            SqlParameter[] param = new SqlParameter[]
            {
                new SqlParameter("@TableName",SqlDbType.NVarChar,500),
                new SqlParameter("@PrimaryKey",SqlDbType.NVarChar,100),
                new SqlParameter("@StrWhere",SqlDbType.NVarChar,2000),
            };

            param[0].Value = tableNames;
            param[1].Value = primaryKeyName;
            param[2].Value = filterString;

            try
            {
                count = (int)SqlHelper.ExecuteScalar(ConnectionString, CommandType.StoredProcedure, SP_GetCount, param);

                LogUtil.info("Class:QueryStringBuilder; Method:Count4Join()");
                LogUtil.debug(string.Format("@TableNames:[{0}]; @PrimaryKey:[{1}]; @StrWhere:[{2}]", tableName, primaryKeyName, filterString));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return count;
        }

        public List<T> List4Join()
        {
            List<T> list = new List<T>();
            T data = default(T);

            SqlParameter[] param = new SqlParameter[]
            {
                new SqlParameter("@TableNames",SqlDbType.VarChar,500),
                new SqlParameter("@PrimaryKey",SqlDbType.VarChar,100),
                new SqlParameter("@Fields",SqlDbType.VarChar,8000),
                new SqlParameter("@StartIndex",SqlDbType.Int,4),
                new SqlParameter("@EndIndex",SqlDbType.Int,4),
                new SqlParameter("@Filter",SqlDbType.VarChar,1000),
                new SqlParameter("@Group",SqlDbType.VarChar,200),
                new SqlParameter("@Order",SqlDbType.VarChar,200),
            };

            param[0].Value = tableNames;
            param[1].Value = primaryKeyName;
            param[2].Value = selectString4Join;
            param[3].Value = firstResult;
            param[4].Value = firstResult + maxResult - 1; //当前页要显示的记录的结束索引;
            param[5].Value = filterString;
            param[6].Value = "";
            param[7].Value = orderbyString;

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.StoredProcedure, SP_GetPagedList, param))
                {
                    while (rdr.Read())
                    {
                        // 主表
                        data = (T)LoadData(rdr, typeof(T));
                        list.Add(data);
                    }
                }

                LogUtil.info("Class:QueryStringBuilder; Method:List4Join()");
                LogUtil.debug(string.Format("@TableNames:[{0}]; @PrimaryKey:[{1}]; @Fields:[{2}]; @StartIndex:[{3}]; @EndIndex:[{4}]; @Filter:[{5}]; @Group:[{6}]; @Order:[{7}]", tableName, primaryKeyName, selectString4Join, firstResult, param[4].Value, filterString, param[6].Value, orderbyString));
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            return list;
        }

        /// <summary>
        /// 双表关联查询获取记录集
        /// </summary>
        /// <param name="entityType">关联表的实例类型</param>
        /// <param name="entityRight">关联表的实例，返回时将关联表的数据写入到此参数中</param>
        /// <param name="querySecond">关联表的查询实例</param>
        /// <returns>主表的数据</returns>
        public List<T> List4Join(Type entityType, ref object entityRight, object querySecond)
        {
            //
            // 主表
            //
            List<T> list = new List<T>();
            T data = default(T);

            //
            // 关联表
            //
            List<object> listRight = new List<object>();
            List<object> listPreventRepeat = new List<object>();
            object dataRight = Assembly.GetAssembly(entityType).CreateInstance(entityType.ToString());
            string rightPrimaryKeyName = querySecond.GetType().GetField("primaryKeyName").GetValue(querySecond).ToString();

            SqlParameter[] param = new SqlParameter[]
            {
                new SqlParameter("@TableNames",SqlDbType.VarChar,500),
                new SqlParameter("@PrimaryKey",SqlDbType.VarChar,100),
                new SqlParameter("@Fields",SqlDbType.VarChar,9999),
                new SqlParameter("@StartIndex",SqlDbType.Int,4),
                new SqlParameter("@EndIndex",SqlDbType.Int,4),
                new SqlParameter("@Filter",SqlDbType.VarChar,1000),
                new SqlParameter("@Group",SqlDbType.VarChar,200),
                new SqlParameter("@Order",SqlDbType.VarChar,200),
            };

            param[0].Value = tableNames;
            param[1].Value = primaryKeyName;
            param[2].Value = selectString4Join;
            param[3].Value = firstResult;
            param[4].Value = firstResult + maxResult - 1; //当前页要显示的记录的结束索引;
            param[5].Value = filterString4Join;
            param[6].Value = "";
            param[7].Value = orderbyString4Join;

            try
            {
                using (SqlDataReader rdr = SqlHelper.ExecuteReader(ConnectionString, CommandType.StoredProcedure, SP_GetPagedList, param))
                {
                    while (rdr.Read())
                    {
                        // 主表
                        data = (T)LoadData(rdr, typeof(T));
                        list.Add(data);

                        // 关联表
                        object id = rdr[rightPrimaryKeyName];

                        if (!listPreventRepeat.Contains(id))
                        {
                            dataRight = LoadData(rdr, entityType);
                            listRight.Add(dataRight);
                            listPreventRepeat.Add(id);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                LogUtil.error(ex.Message);
                throw;
            }

            entityRight = listRight;

            return list;
        }

        #endregion

        #region 公开属性

        /// <summary>
        /// 排序
        /// </summary>
        public List<Order> Orders
        {
            get { return orders; }
        }

        /// <summary>
        /// 排序
        /// </summary>
        public List<SimpleExpression> Expressions
        {
            get { return expres; }
        }

        /// <summary>
        /// 数据库连接字符串
        /// </summary>
        public string ConnectionString
        {
            get
            {
                return connectionString;
            }
        }

        /// <summary>
        /// 是否自动增长主键
        /// </summary>
        public bool AutoPK
        {
            get
            {
                return autoPK;
            }
            set
            {
                autoPK = value;
            }
        }

        #endregion

        #region Clear方法

        /// <summary>
        /// 移除所有条件表达式和所有排序字段
        /// 取消分页信息
        /// </summary>
        /// <returns></returns>
        public IQuery<T, TKey> Reset()
        {
            firstResult = FirstRecordNumber;
            maxResult = MaxRecordCount;
            return Clear();
        }

        /// <summary>
        /// 移除所有条件表达式和所有排序字段
        /// </summary>
        /// <returns></returns>
        public IQuery<T, TKey> Clear()
        {
            ClearExpression();
            ClearOrder();
            return this;
        }

        /// <summary>
        /// 移除所有条件表达式
        /// </summary>
        public void ClearExpression()
        {
            expres = new List<SimpleExpression>();
        }

        /// <summary>
        /// 移除所有排序字段
        /// </summary>
        public void ClearOrder()
        {
            orders = new List<Order>();
        }
        #endregion
    }
}