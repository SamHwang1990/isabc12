using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using HPCMS.Web.App_Code;
using Hope.BLL;
using Hope.Model;
using Hope.Util;

public partial class Admin_ArticleMgr_AddArticle : BaseAdminPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ValidateInput();

            Process();

            OutputJSonMessage();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    private void Process()
    {
        string title = RequestUtil.RequestString(Request, "Title", string.Empty);
        string nodeName = RequestUtil.RequestString(Request, "NodeName", string.Empty);
        string content = RequestUtil.RequestString(Request, "Content", string.Empty);

        //判断所属节点是否存在
        ContentNodeBLL nodeBll = ContentNodeBLL.GetInstance();
        ContentNodeData nodeData = nodeBll.GetDateByName(nodeName);
        if (nodeData == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "所属节点不存在！";
            return;
        }

        //添加到HP_U_Article表
        HPUArticleBLL articleBll = HPUArticleBLL.GetInstance();
        HPUArticleData articleData = new HPUArticleData();
        articleData.Content = content;
        articleData = articleBll.Add(articleData);
        if (articleData == null)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败，原因不详！";
            return;
        }

        //添加到Article表
        ContentArticleBLL bll = ContentArticleBLL.GetInstance();
        ContentArticleData data = new ContentArticleData();

        data.Title = title;
        data.NodeID = nodeData.NodeID;
        data.ItemID = articleData.ArticleID;
        data.CreateTime = System.DateTime.Now;
        data.Hits = 0;
        data.UpdateTime = System.DateTime.Now;

        if (bll.Add(data))
        {
            HandlerMessage.Succeed = true;
            HandlerMessage.Text = "添加成功！";
        }
        else
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "添加失败，原因不详！";
        }

    }

    /// <summary>
    /// 校验输入的参数
    /// </summary>
    protected override void ValidateInput()
    {
        string title = RequestUtil.RequestString(Request, "Title", string.Empty);
        if (title == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "文章标题不能为空！";

            OutputJSonMessage();
            return;
        }

        string nodeName = RequestUtil.RequestString(Request, "NodeName", string.Empty);
        if (nodeName == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "所属节点不能为空！";

            OutputJSonMessage();
            return;
        }

        string content = RequestUtil.RequestString(Request, "Content", string.Empty);
        if (content == string.Empty)
        {
            HandlerMessage.Succeed = false;
            HandlerMessage.Text = "内容不能为空！";

            OutputJSonMessage();
            return;
        }
    }
}