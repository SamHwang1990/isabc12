using System;
using System.Collections.Generic;
using System.Text;
using Hope.Util;
using Newtonsoft.Json;

namespace Hope.Model
{
    public class SysTreeNodeData
    {
        /// <summary>
        /// Construstor
        /// </summary>
        public SysTreeNodeData()
        {
            SetDefaultValue();
        }
        
        /// <summary>
        /// 
        /// </summary>
        private int _id;
        public int id
        {
            get { return _id; }
            set { this._id = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        private string _text;
        public string text
        {
            get { return _text; }
            set { this._text = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        private string _type;
        public string Type
        {
            get { return _type; }
            set { this._type = value; }
        }

        /// <summary>
        /// href
        /// </summary>
        private string _href;
        public string href
        {
            get { return ApplicationConfig.WebMainPathURL + _href.Replace("~/", "/"); }
            set { this._href = value; }
        }

        /// <summary>
        /// 是否为叶节点
        /// </summary>
        public bool isLeaf
        {
            get { return this._children.Count == 0; }
        }

        /// <summary>
        /// 
        /// </summary>
        private List<SysTreeNodeData> _children = new List<SysTreeNodeData>();
        public List<SysTreeNodeData> children
        {
            get { return _children; }
            set { this._children = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="child"></param>
        public void AppendChild(SysTreeNodeData child)
        {
            if (child == null)
            {
                return;
            }
            _children.Add(child);
        }

        public string ToJSon()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");

            sb.AppendFormat("\"id\":\"{0}\"", this._id);
            sb.AppendFormat(",\"text\":\"{0}\"", this._text);
            string href = ApplicationConfig.WebMainPathURL + _href.Replace("~/", "/");
            sb.AppendFormat(",\"href\":\"{0}\"", href);
            sb.AppendFormat(",\"type\":\"{0}\"", this._type);
            sb.AppendFormat(",\"leaf\":{0}", (_children.Count < 1).ToString().ToLower());
            if (_children.Count > 0)
            {
                sb.AppendFormat(",\"children\":[");
                foreach (SysTreeNodeData child in _children)
                {
                    sb.Append(child.ToJSon());
                }
                sb.AppendFormat("]");
            }

            sb.Append("},");
            return sb.ToString();
        }

        public string ToJSon(bool showCheckedbox)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");

            sb.AppendFormat("\"id\":\"{0}\"", this._id);
            sb.AppendFormat(",\"text\":\"{0}\"", this._text);
            string href = ApplicationConfig.WebMainPathURL + _href.Replace("~/", "/");
            sb.AppendFormat(",\"href\":\"{0}\"", href);
            sb.AppendFormat(",\"type\":\"{0}\"", this._type);
            sb.AppendFormat(",\"leaf\":{0}", (_children.Count < 1).ToString().ToLower());
            if (_children.Count > 0)
            {
                sb.AppendFormat(",\"children\":[");
                foreach (SysTreeNodeData child in _children)
                {
                    sb.Append(child.ToJSon(true));
                }
                sb.AppendFormat("]");
            }

            sb.Append("},");
            return sb.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        private void SetDefaultValue()
        {
            this._children = new List<SysTreeNodeData>();
            this._href = string.Empty;
            this._id = 0;
            this._text = string.Empty;
            this._type = string.Empty;
        }
    }
}
