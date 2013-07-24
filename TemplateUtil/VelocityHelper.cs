using System;
using System.Web;
using System.IO;
using System.Text;

using NVelocity;
using NVelocity.App;
using NVelocity.Context;
using NVelocity.Runtime;
using Commons.Collections;
using Hope.Util;
using System.Collections.Generic;
using NVelocity.Runtime.Parser.Node;
using Hope.Model;
using Hope.BLL;

namespace Hope.TemplateUtil
{
    /// <summary>
    /// VelocityHelper 的摘要说明
    /// </summary>
    public class VelocityHelper
    {
        private VelocityEngine velocity = null;
        private IContext context = null;
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="templatDirectory">模板文件夹路径，要以路径分隔符结尾，例如D:\Web\Template\</param>
        public VelocityHelper(string templatDirectory)
        {
            Init(templatDirectory);
        }

        /// <summary>
        /// 无参构造函数，读取系统配置的模板根目录
        /// </summary>
        public VelocityHelper()
        {
            string templateRootDir = ApplicationConfig.TemplateRootDir;
            Init(templateRootDir);
        }

        /// <summary>
        /// 初始话NVelocity模块
        /// </summary>
        /// <param name="templatDirectory">模板文件夹路径，要以路径分隔符结尾，例如D:\Web\Template\</param>
        public void Init(string templatDirectory)
        {
            //创建VelocityEngine实例对象
            velocity = new VelocityEngine();

            //使用设置初始化VelocityEngine
            ExtendedProperties props = new ExtendedProperties();
            props.AddProperty(RuntimeConstants.RESOURCE_LOADER, "file");
            //props.AddProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, HttpContext.Current.Server.MapPath(templatDir));
            props.AddProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, templatDirectory);
            props.AddProperty(RuntimeConstants.INPUT_ENCODING, "utf-8");
            props.AddProperty(RuntimeConstants.OUTPUT_ENCODING, "utf-8");
            velocity.Init(props);

            //为模板变量赋值
            context = new VelocityContext();
        }
        /// <summary>
        /// 给模板变量赋值
        /// </summary>
        /// <param name="key">模板变量</param>
        /// <param name="value">模板变量值</param>
        public void Put(string key, object value)
        {
            if (context == null)
            {
                context = new VelocityContext();
            }
            context.Put(key, value);
        }


        /// <summary>
        /// 读取模板内容
        /// </summary>
        /// <param name="templatFileName">模板文件的名称，仅文件名（含扩展名）</param>
        public string GetTemplateContent(string templatFileName)
        {
            //从文件中读取模板
            Template template = velocity.GetTemplate(templatFileName);
            
            //系统内置标签HopeTag由外部调用Put()方法传入

            //找出模板中的自定义标签
            List<string> tags = FindCustomTag(template);

            //解析自定义标签
            foreach (string tag in tags)
            {
                ParseTag(tag);
            }

            //合并模板
            StringWriter writer = new StringWriter();
            template.Merge(context, writer);
            //输出
            return writer.ToString();
        }


        /// <summary>
        /// 解析标签
        /// </summary>
        private void ParseTag(string tagName)
        { 
            ContentTagBLL tagBll = ContentTagBLL.GetInstance();
            ContentTagData tagData = tagBll.GetDataByName(tagName);

            if (tagData == null)
            {
                return;
            }

            Put(tagName, tagData.TagContent);
        }


        /// <summary>
        /// 找出模板中全部自定义的标签，不包括${HopeTag}标签
        /// </summary>
        /// <param name="temp"></param>
        /// <returns></returns>
        private List<string> FindCustomTag(Template temp)
        {
            List<string> tags = new List<string>();
            ASTprocess astProcess = (ASTprocess)temp.Data;

            for (int i = 0; i < astProcess.ChildrenCount; i++)
            {
                if ("NVelocity.Runtime.Parser.Node.ASTReference".Equals(astProcess.GetChild(i).ToString()))
                {
                    //如果标签的写法如${HopeTag.Get()}，那么astProcess.GetChild(i).FirstToken.ToString()
                    //取出来的是“${”，就需要astProcess.GetChild(i).FirstToken.Next.ToString()，才能取出标签的名称“HopeTag”
                    //如果表情的写法如$Name，那么astProcess.GetChild(i).FirstToken.ToString()
                    //取出来的就是$Name，需要将“$”符去掉，tag.Substring(1)，得到标签的名称“Name”
                    string tag = astProcess.GetChild(i).FirstToken.ToString();

                    if (tag == "${")
                    {
                        tag = astProcess.GetChild(i).FirstToken.Next.ToString();
                    }
                    else
                    {
                        tag = tag.Substring(1);
                    }

                    //HopeTag为系统内置标签，无需包含在自定义标签当中
                    if (tag == "HopeTag")
                    {
                        continue;
                    }

                    tags.Add(tag);
                }
            }

            return tags;
        }
    }
}
