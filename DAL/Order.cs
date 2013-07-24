using System;

namespace Hope.DAL
{
    /// <summary>
    /// Represents an order
    /// result set.
    /// </summary>
    [Serializable]
    public class Order
    {
        public bool descending;
        public string propertyName;

        /// <summary>
        /// Constructor for Order.
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="descending"></param>
        public Order(string propertyName, bool descending)
        {
            this.propertyName = propertyName;
            this.descending = descending;
        }

        public override string ToString()
        {
            return propertyName + (descending ? " DESC" : " ASC");
        }

        /// <summary>
        /// Ascending order
        /// </summary>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public static Order Asc(string propertyName)
        {
            return new Order(propertyName, false);
        }

        /// <summary>
        /// Descending order
        /// </summary>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public static Order Desc(string propertyName)
        {
            return new Order(propertyName, true);
        }

    }
}