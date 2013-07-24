<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UserUpload.aspx.cs" Inherits="UploadFiles_UserUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script language="javascript" type="text/javascript" src="../JS/HP_U/uploadMgr.js"></script>
    
</head>
<body>
<a href="http://ce.sysu.edu.cn/isabc12/">Home</a>
<div class="fileUpload-box">
    <form id="form1" runat="server">
    <asp:FileUpload ID="FileUpload1" class="inputUpload" runat="server" name="file" />
    <asp:Button ID="btnSubmit" runat="server" Text="File Upload"  
        OnClientClick="return checkType()" onclick="btnSubmit_Click" />
    <asp:Label ID="lblUploadResult" runat="server" Text="Label"></asp:Label>
    </form>
</div>
</body>
</html>
