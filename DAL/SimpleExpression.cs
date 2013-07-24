using System;
using System.Collections.Generic;
using System.Data.SqlTypes;

namespace Hope.DAL
{
    /// <summary>
    /// 搜索条件，用户组合SQL WHERE条件
    /// </summary>
    [Serializable]
    public class SimpleExpression
    {
        #region Declaration

        private readonly string propertyName;       // 属性名-字段名
        private readonly object value;              // 属性值-字段值
        private bool ignoreCase;                    // 忽略大小写
        private readonly string op;                 // 操作符
        private string joinType = "AND";           // 联合类型 AND|OR
        private string paramName = "";               // 参数名
        private List<SimpleExpression> siblings = new List<SimpleExpression>(); // 复合条件
        //private SqlParameter param;                 // 转化为参数

        #endregion

        #region Constructor

        /// <summary>
        /// 构造函数
        /// </summary>
        public SimpleExpression() { }

        /// <summary>
        /// Initialize a new instance of the <see cref="SimpleExpression" /> class for a named
        /// Property and its value.
        /// </summary>
        /// <param name="propertyName">The name of the Property in the class.</param>
        /// <param name="value">The value for the Property.</param>
        /// <param name="op">The SQL operation.</param>
        public SimpleExpression(string propertyName, object value, string op)
            : this()
        {
            this.propertyName = propertyName;
            this.value = value;
            this.op = op;
            //param = new SqlParameter(propertyName,value);
        }

        /// <summary>
        /// Initialize a new instance of the <see cref="SimpleExpression" /> class for a named
        /// Property and its value.
        /// </summary>
        /// <param name="propertyName">The name of the Property in the class.</param>
        /// <param name="datetime">The value for the Property.</param>
        /// <param name="op">The SQL operation.</param>
        public SimpleExpression(string propertyName, DateTime datetime, string op)
            : this()
        {
            this.propertyName = propertyName;
            this.value = datetime.ToString();
            this.op = op;
        }

        /// <summary>
        /// Initialize a new instance of the <see cref="SimpleExpression" /> class for a named
        /// Property and its value.
        /// </summary>
        /// <param name="propertyName">The name of the Property in the class.</param>
        /// <param name="value">The value for the Property.</param>
        /// <param name="op">The SQL operation.</param>
        /// <param name="joinType">Joint Type : AND | OR</param>
        public SimpleExpression(string propertyName, object value, string op, string joinType)
            : this()
        {
            this.propertyName = propertyName;
            this.value = value;
            this.op = op;
            this.joinType = joinType;
        }

        /// <summary>
        /// Initialize a new instance of the <see cref="SimpleExpression" /> class for a named
        /// Property and its value.
        /// </summary>
        /// <param name="propertyName">The name of the Property in the class.</param>
        /// <param name="value">The value for the Property.</param>
        /// <param name="op">The SQL operation.</param>
        /// <param name="joinType">Joint Type : AND | OR</param>
        public SimpleExpression(string propertyName, DateTime dateTime, string op, string joinType)
            : this()
        {
            this.propertyName = propertyName;
            this.value = dateTime.ToString();
            this.op = op;
            this.joinType = joinType;
        }

        /// <summary>
        /// Initialize a new instance of the <see cref="SimpleExpression" /> class for a named Property and its value.
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="value"></param>
        /// <param name="op"></param>
        /// <param name="ignoreCase">is Case Sensitive</param>
        public SimpleExpression(string propertyName, object value, string op, bool ignoreCase)
            : this(propertyName, value, op)
        {
            this.ignoreCase = ignoreCase;
        }

        /// <summary>
        /// Initialize a new instance of the <see cref="SimpleExpression" /> class for a named Property and its value.
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="value"></param>
        /// <param name="op"></param>
        /// <param name="ignoreCase">is Case Sensitive</param>
        public SimpleExpression(string propertyName, DateTime dateTime, string op, bool ignoreCase)
            : this(propertyName, dateTime, op)
        {
            this.ignoreCase = ignoreCase;
        }

        #endregion

        #region Methods

        /// <summary>
        /// 添加复合条件
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="value"></param>
        /// <param name="op"></param>
        /// <param name="joinType"></param>
        /// <returns>自身实例</returns>
        public SimpleExpression AddSiblings(string propertyName, object value, string op, string joinType)
        {
            SimpleExpression exp = new SimpleExpression(propertyName, value, op, joinType);
            siblings.Add(exp);

            return this;
        }

        /// <summary>
        /// Converts the SimpleExpression to a <see cref="SqlString"/>.
        /// </summary>
        /// <returns>A SqlString that contains a valid Sql fragment.</returns>
        public override string ToString()
        {
            string output = "";
            if (siblings.Count > 0)
            {
                output = string.Format(" ({0} {1}) ", PrepareToString(), "{0}");

                foreach (SimpleExpression ex in siblings)
                {
                    output = string.Format(output, ex.joinType + " " + ex.ToString() + " {0}");
                }

                return string.Format(output, "");
            }
            else
            {
                return PrepareToString();
            }
        }

        private string PrepareToString()
        {
            object newValue = value;
            if (op.ToLower() == "in")
            {
                newValue = string.Format(" {0} ", value);
            }
            else if (value is string)
            {
                newValue = string.Format("'{0}'", value);
            }
            else if (value is bool)
            {
                newValue = string.Format(" {0} ", (bool)value ? 1 : 0);
            }

            return string.Format("{0} {1} {2}", propertyName, op, newValue);
        }

        /// <summary>
        /// Converts the SimpleExpression to String contains Parameter
        /// </summary>
        /// <returns></returns>
        public string ToParamString()
        {
            object newValue = value;
            return string.Format("{0} {1} @{2}", propertyName, op, ParamName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public SimpleExpression IgnoreCase()
        {
            ignoreCase = true;
            return this;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets the named Property for the Expression.
        /// </summary>
        /// <value>A string that is the name of the Property.</value>
        public string PropertyName
        {
            get { return propertyName; }
        }

        /// <summary>
        /// Gets the Value for the Expression.
        /// </summary>
        /// <value>An object that is the value for the Expression.</value>
        public object Value
        {
            get { return value; }
        }

        /// <summary>
        /// Get the Sql operator to use for the specific 
        /// subclass of <see cref="SimpleExpression"/>.
        /// </summary>
        protected virtual string Op
        {
            get { return op; }
        }

        /// <summary>
        /// Join Type : AND | OR
        /// </summary>
        public virtual string JoinType
        {
            get { return joinType; }
        }

        /// <summary>
        /// Get the Sql parameter name to use for the specific 
        /// subclass of <see cref="SimpleExpression"/>.
        /// </summary>
        public virtual string ParamName
        {
            get
            {
                if (paramName.Equals(""))
                    paramName = PropertyName;
                return paramName;
            }
            set { paramName = value; }
        }

        /// <summary>
        /// 返回复合查询
        /// </summary>
        public List<SimpleExpression> Siblings
        {
            get
            {
                return siblings;
            }
        }

        ///// <summary>
        ///// Convert to Parameter
        ///// </summary>
        //public SqlParameter Parameter
        //{
        //    get
        //    {
        //        return param;
        //    }
        //}
        #endregion
    }
}