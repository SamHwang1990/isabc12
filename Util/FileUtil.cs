using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Hope.Util
{
    public class FileUtil
    {
        /// <summary>
        /// 将内容写入文件
        /// </summary>
        /// <param name="fullFileName">全文件名，包括盘符、目录和文件名</param>
        /// <param name="content">要写入的内容</param>
        public static bool WriteToFile(string fullFileName, string content)
        {
            string path = Path.GetDirectoryName(fullFileName);
            if (!Directory.Exists(path))
            {
                try
                {
                    DirectoryInfo dir = Directory.CreateDirectory(path);
                }
                catch (Exception)
                {
                    return false;
                }
            }

            try
            {
                using (StreamWriter sw = new StreamWriter(fullFileName, false, Encoding.GetEncoding("utf-8")))
                {
                    sw.WriteLine(content);
                }
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
    }
}
