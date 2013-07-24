using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hope.BLL;
using Hope.Model;
using Hope.Util;

namespace Hope.TemplateUtil
{
    public class TemplateHelper
    {
        private static TemplateHelper instance = null;

        private TemplateHelper()
        {
            
        }

        public static TemplateHelper GetInstance()
        {
            return instance ?? (instance = new TemplateHelper());
        }

        /// <summary>
        /// 根据模板，获取模板的完整路径，包括盘符，目录路径，文件名
        /// </summary>
        /// <example>
        /// 例如：系统配置的模板根目录为：D:\Work\DotNet\Src\HPCMS\Web\Template，模板文件为D:\Work\DotNet\Src\HPCMS\Web\Template\Index\Default下
        /// 的Index.html文件，则返回的是D:\Work\DotNet\Src\HPCMS\Web\Template\Index\Default\Index.html
        /// </example>
        /// <param name="templateData"></param>
        /// <returns></returns>
        public string GetTemplateCategoryFullDirName(ContentTemplateData templateData)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("{0}{1}", ApplicationConfig.TemplateRootDir, GetTemplateCategoryDirName(templateData));

            return sb.ToString();
        }


        /// <summary>
        /// 根据模板，以模板根目录为相对路径，获取模板路径，不包括系统配置的路径
        /// </summary>
        /// <example>
        /// 例如：系统配置的模板根目录为：D:\Work\DotNet\Src\HPCMS\Web\Template，模板文件为D:\Work\DotNet\Src\HPCMS\Web\Template\Index\Default下
        /// 的Index.html文件，则返回的是Index\Default\Index.html
        /// </example>
        /// <param name="templateData"></param>
        /// <returns></returns>
        public string GetTemplateCategoryDirName(ContentTemplateData templateData)
        {
            ContentTemplateCategoryBLL bll = ContentTemplateCategoryBLL.GetInstance();
            ContentTemplateCategoryData categoryData = bll.GetDataById(templateData.CategoryID);

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("{0}{1}", FormateCategoryDirName(categoryData), templateData.FileName);

            return sb.ToString();
        }

        /// <summary>
        /// 遍历出全部节点分类的目录，拼接出路径，以“\”结尾
        /// </summary>
        /// <param name="categoryData"></param>
        /// <returns></returns>
        private string FormateCategoryDirName(ContentTemplateCategoryData categoryData)
        {
            StringBuilder sb = new StringBuilder();
            ContentTemplateCategoryBLL bll = ContentTemplateCategoryBLL.GetInstance();
            ContentTemplateCategoryData parentCategoryData = bll.GetDataById(categoryData.ParentID);
            if (parentCategoryData == null)
            {
                sb.AppendFormat("{0}\\",categoryData.DirName);
                return sb.ToString();
            }
            else
            {
                sb.Append(FormateCategoryDirName(parentCategoryData));
                sb.AppendFormat("{0}\\", categoryData.DirName);
                return sb.ToString();
            }

        }
    }
}
