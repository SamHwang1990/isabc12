<%@ page language="C#" autoeventwireup="true" inherits="User_Reg, App_Web_lywviggl" %>

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
.header{ height:160px;width: 960px;	background-image: url(images/banner.jpg);
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
    <form action="Reg.aspx" method="post">
    <h1>Welcome To Register</h1>
    <div class="nav">
    <a href="#">Home</a><a href="#">Login</a><a href="#">Help</a>
    </div>
    <hr/>
    <table>
    	<tr>
    		<td>Family Name:</td>
    		<td><input type="text" name="FamilyName" id="" /></td>
    	</tr>
    	<tr>
    		<td>First(middle) Names:</td>
    		<td><input type="text" name="FirstName" id="" /></td>
    	</tr>
    	<tr>
    		<td>Title:</td>
    		<td>
            <select name="Title" id="">
    			<option value="prof">Prof.</option>
                <option value="dr">Dr.</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
    		</select>
            </td>
    	</tr>
    	<tr>
    		<td>Category of Participation:</td>
    		<td>
            	<select name="Participation" id="">
            		<option value="active">Active</option>
                    <option value="full">Full Participant</option>
                    <option value="young" >Young Scientist(below the age of 30)</option>
                    <option value="retired">Retired(above the age of 65)</option>
            	</select>
            </td>
    	</tr>
    	<tr>
    		<td>Number of Accompanying Persons:</td>
    		<td><input type="text" name="Accompanying" id="" /></td>
    	</tr>
    	<tr>
    		<td>Sex:</td>
    		<td>
            	<select name="Sex" id="">
            		<option value="1">Male</option>
                    <option value="0">Female</option>
            	</select>
            </td>
    	</tr>
    	<tr>
    		<td>Name of the Institution:</td>
    		<td><input type="text" name="InstitutionName" id="" /></td>
    	</tr>
        <tr>
    		<td>Address of the Institution:</td>
    		<td><input type="text" name="InstitutionAddr" id="Text1" /></td>
    	</tr>
    	<tr>
    		<td>Phone:</td>
    		<td><input type="text" name="Phone" id="" /></td>
    	</tr>
    	<tr>
    		<td>Fax:</td>
    		<td><input type="text" name="Fax" id="" /></td>
    	</tr>
    	<tr>
    		<td>E-mail:</td>
    		<td><input type="text" name="Email" id="" /></td>
    	</tr>
    	<tr>
    		<td>Arrival Date:</td>
    		<td><input type="text" name="ArrivalDate" id="" /></td>
    	</tr>
    	<tr>
    		<td>Departure Date:</td>
    		<td><input type="text" name="DepartureDate" id="" /></td>
    	</tr>
    	<tr>
    		<td>Plan for Presentation:</td>
    		<td><input type="text" name="Presentation" id="" /></td>
    	</tr>
    	<tr>
    		<td>Mode of Payment:</td>
    		<td>
            	<select name="PaymentMode" id="">
            		<option value="transfer">Bank Transfer</option>
                    <option value="card">Credit Card</option>
            	</select>
            </td>
    	</tr>
    	<tr>
    		<td>Total Amount of Registration Fee:</td>
    		<td><input type="text" name="TotalFee" id="" /></td>
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
    	<p>◇<a href="mailto:isabc12@mail.sysu.edu.cn">Contact us: <span style="COLOR: #070; TEXT-DECORATION: underline">isabc12@mail.sysu.edu.cn</span></a><a href="/CEAdmin/Login.aspx">◇</a><p>
    </div>
</div>

</body>
</html>
