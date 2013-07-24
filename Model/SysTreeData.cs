using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace Hope.Model
{
    public class SysTreeData
    {
        /// <summary>
        /// 树根
        /// </summary>
        private SysTreeNodeData _root;
        public SysTreeNodeData Root
        {
            get { return _root; }
            set{this._root = value;}
        }

        public string ToJSon()
        {
            //return JsonConvert.SerializeObject(this);

            StringBuilder sb = new StringBuilder();
            sb.Append("[");
            foreach(SysTreeNodeData child in _root.children)
            {
                sb.Append(child.ToJSon());
                //sb.Append(",");
            }
            sb.Append("]");
            return sb.ToString();
        }

        public string ToJSon(bool showCheckedbox)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("[");
            foreach (SysTreeNodeData child in _root.children)
            {
                sb.Append(child.ToJSon(true));
            }
            sb.Append("]");
            return sb.ToString();
        }
    }
}
