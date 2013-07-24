<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Accommdation.aspx.cs" Inherits="User_Reg" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISABC REGISTER</title>
</head>
<style type="text/css">
body,html{margin:0;padding:0;background-color:rgb(238,238,238);font-family: "Times New Roman", Times, serif;}
h1{ margin:0;}
a{ text-decoration:none;}
.divcenter{ width:960px; margin-left:auto;margin-right:auto;}
.header{ height:215px;width: 960px;
background-image:url(../Images/User/banner_C_otmzd.jpg);
	background-repeat: no-repeat;}
#main h1{ line-height:60px;color:#070;}
#main .nav{ }
#main .nav a{font-size:14px; margin-right:25px;color:#070;}
#main{background-color:#FFF;}
#main hr{margin-left:-30px;}
#main form{  padding:20px 0 30px 30px;}
#main form table{ margin-top:30px;}
#main form table tr td{ height:25px;}
#main form table tr td:first-child{ text-align:right;}
#main form .s_form{ margin-left:150px;}
#main form .s_form input{ margin-left:30px;}
.footer{ height:42px; text-align:center; border:1px solid #999; background-color:#FFF;}
</style>
<body>

<div id="wrap">
	<div class="header divcenter">
    	
    </div>
    <div id="main" class="divcenter">
    <form action="Accommdation.aspx" method="post">
    <h1>Welcome To Register</h1>
    <div class="nav">
    <a href="http://ce.sysu.edu.cn/isabc12">Home</a><a href="#">Help</a>
    </div>
    <hr/>
    <table>
    	<tr>
    		<td>Hotel:</td>
    		<td><select name="Hotel" id="Hotel">
            		<option value="Ritz">Ritz-Carlton Hotel</option>
                    <option value="Ramada">Ramada Pearl Hotel</option>
            	</select>
            </td>
    	</tr>
        <!--<tr>
    		<td>RoomType:</td>
    		<td>
            	<select name="RoomType" id="SelectRoom">
            		<option value="1">1</option>
                    <option value="2">2</option>
            	</select>
            </td>
    	</tr>-->
    	<tr>
    		<td>Price:</td>
    		<td>
            <input type="text" name="Price" id="Price" value="" />
            </td>
    	</tr>
    	<tr>
    		<td>Available Room:</td>
    		<td>
            	<input type="text" name="AvailableRoom" id="" />
            </td>
    	</tr>
    	<tr>
    		<td>Booking Room:</td>
    		<td><input type="text" name="BookingRoom" id="" /></td>
    	</tr>
    	
    	<tr>
    		<td>Check In:</td>
    		<td><input type="text" name="CheckIn" id="" /></td>
    	</tr>
        <tr>
    		<td>Check Out:</td>
    		<td><input type="text" name="CheckOut" id="Text1" /></td>
    	</tr>
    	<tr>
    		<td>FileAddr:</td>
    		<td><input type="text" name="Phone" id="" /></td>
    	</tr>
    	
        
        <tr>
        	<td></td>
        	<td></td>
        </tr>
    </table>
    <div class="s_form">
    	<input type="reset" value="reset" title="reset" />
    	<input type="submit" value="submit" title="submit" />
    </div>
    </form>
    </div>
    <div class="footer divcenter">
    	<p><a href="mailto:isabc12@mail.sysu.edu.cn">Contact us: <span style="COLOR: #070; TEXT-DECORATION: underline">isabc12@mail.sysu.edu.cn</span></a></p>
    </div>
</div>

</body>
</html>
