<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Reg.aspx.cs" Inherits="User_Reg" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISABC REGISTER</title>
<link href="http://ce.sysu.edu.cn/skin/hope_isabc12/isabc2012.css" style="text/css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../CSS/userReg.css"/>
<script language="javascript" type="text/javascript" src="../JS/jquery/jquery.js"></script>
<script language="javascript" type="text/javascript" src="../JS/jquery/ajaxfileupload.js"></script>
<script type="text/javascript" src="../JS/jquery/jquery.ui.mtabs.min.js"></script>
<script language="javascript" type="text/javascript" src="../JS/HP_U/UserReg.js"></script>
<script language="javascript" type="text/javascript" src="http://ce.sysu.edu.cn/isabc12/slider.js"></script>
<script language="javascript" type="text/javascript" src="../JS/My97DatePicker/WdatePicker.js"></script>
<link href="../JS/Style/jquery.ui.some.min.css" rel="stylesheet" type="text/css" />
</head>
<style type="text/css">

</style>
<body>
<div id="wrap">
    <!--banner-->
	<div class="header divcenter">
    </div>
    <div id="main" class="divcenter">
      <!--left_col begin-->
        <div id="left_col">
            <!--slider begin -->
            <div id="slider">
                <div id="idTransformView2" style="overflow: hidden; position: relative;">
                    <ul id="idSlider2" style="position: absolute; top: 0px; left: -800px;">
                        <li>
                            <img src="http://ce.sysu.edu.cn/Skin/Hope_isabc12/images/slider001.jpg"></li>
                        <li>
                            <img src="http://ce.sysu.edu.cn/Skin/Hope_isabc12/images/slider002.jpg"></li>
                        <li>
                            <img src="http://ce.sysu.edu.cn/Skin/Hope_isabc12/images/slider003.jpg"></li>
                        <li>
                            <img src="http://ce.sysu.edu.cn/Skin/Hope_isabc12/images/slider004.jpg"></li>
                    </ul>
                    <ul id="idNum12">
                        <li class="on">1</li>
                        <li class="">2</li>
                        <li class="">3</li>
                        <li class="">4</li>
                    </ul>
                </div>
            </div>
            <!--slider end -->
            <!--nav begin -->
            <ul id="nav">
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Index.html">Welcome</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/General information.html">General information</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Important Dates.html">Important Dates</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Organizing Committees.html">Organizing Committees</a>
                </li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Scientific Program.html">Scientific Program</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Plenary lecturers.html">Plenary lecturers</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Keynotes.html">Keynotes</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Abstracts.html">Abstracts</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Registration.html">Registration</a> </li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Accommodation.html">Accommodation</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Location and travel.html">Location and travel</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Awards.html">Awards</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Sponsors.html">Sponsors</a></li>
                <li class="underl"><a href="http://ce.sysu.edu.cn/isabc12/Contact us.html">Contact us</a></li>
            </ul>
            <!--nav end -->
        </div>
        <!--left_col end--> 
        <form action="Reg.aspx" method="post" runat="server">
            <h1>Welcome To Register</h1>
            <p class="link">Please use Browser like <strong><a href="http://support.apple.com/downloads/#internet">Safari</a></strong>, 
<strong><a href="http://www.mozilla.org/en-US/firefox/all/">Firefox</a></strong>, 
<strong><a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a></strong>, 
<strong><a href="http://www.microsoft.com/en-us/download/internet-explorer.aspx">8 or higher version of IE</a></strong>to finish the table. If it still doesn't work, please <strong><a href="mailto:isabc12@mail.sysu.edu.cn">contact us</a></strong>.</p>
            <div id="tab">
                <ul>
                    <li><a href="#tab1">Registration</a></li>
                    <li><a href="#tab2">Accommodation</a></li>
                    <li><a href="#tab3">Abstract</a></li>
                    <li><a href="#tab4">Preview</a></li>
                </ul>
                <div id="tab1">
                    <table>
                        <tr>
                            <td>
                                <span class="required">*</span>First Name:
                            </td>
                            <td>
                                <input type="text" name="UserFirstName" id="txtUserFirstName" runat="server" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                               <span class="required">*</span>Last Name:
                            </td>
                            <td>
                                <input type="text" name="UserFamilyName" id="txtUserFamilyName" runat="server" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Gender:
                            </td>
                            <td>
                                <select name="Gender" id="SelGender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Title:
                            </td>
                            <td>
                                <select name="Title" id="SelTitle">
                                    <option value="prof">Prof.</option>
                                    <option value="dr">Dr.</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Ms">Ms.</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Number of Accompanying Persons:
                            </td>
                            <td>
                                <input type="text" name="Accompany" id="txtAccompany" onblur="SetRegFee();" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Category of Participation:
                            </td>
                            <td>
                                <select name="Participation" id="SelParticipation" onchange="SetRegFee();">
                                    <option value="full" selected="selected">Full Participant</option>
                                    <option value="Emertus_retired">Emertus/Retired(above the age of 65)</option>
                                    <option value="phD">PhD Student</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Name of the Institution:
                            </td>
                            <td>
                                <input type="text" name="InstitutionName" id="txtInstitutionName" style="width: 18em;" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Address of the Institution:
                            </td>
                            <td>
                                <input type="text" name="InstitutionAddr" id="txtInstitutionAddr" style="width: 18em;" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Phone:
                            </td>
                            <td>
                                <input type="text" name="Phone" id="txtPhone" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>E-mail:
                            </td>
                            <td>
                                <input type="text" name="Email" id="txtEmail" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Fax:
                            </td>
                            <td>
                                <input type="text" name="Fax" id="txtFax" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Arrival Date:
                            </td>
                            <td>
                                <input type="text" class="dateType" name="ArrivalDate" id="txtArrivalDate" onClick="WdatePicker({lang:'en'})" />YYYY-MM-DD(e.g.2013-08-22)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Departure Date:
                            </td>
                            <td>
                                <input type="text" class="dateType" name="DepartureDate" id="txtDepartureDate" onClick="WdatePicker({lang:'en'})" />YYYY-MM-DD(e.g.2013-08-22)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Plan for Presentation:
                            </td>
                            <td>
                                <select name="PrePlan" id="selPrePlan">
                                    <option value="Plenary Lecture" selected="selected">Plenary Lecture</option>
                                    <option value="Keynote Lecture">Keynote Lecture</option>
                                    <option value="Invited Lecture">Invited Lecture</option>
                                    <option value="Oral Report">Oral Report</option>
                                    <option value="Poster">Poster</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total Amount of Registration Fee:
                            </td>
                            <td>
                                <input type="text" name="TotalFee" value="$600" id="txtTotalFee" readonly="readonly" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Mode of Payment:
                            </td>
                            <td>
                                <select name="PaymentMode" id="SelPaymentMode">
                                    <option value="transfer" selected="selected">Bank Transfer</option>
                                    <option value="card">Credit Card</option>
                                    <option value="cash">Cash</option>
                                </select>
                                <span id="MyAccount">3602000309000507804</span>
                            </td>
                        </tr>
                    </table>
                    <input type="button" value="Next" style="margin-left: 18em" onclick="javascript:conferForm(0,1);" />
                </div>
                <div id="tab2">
                    <table>
                        <!-- 住宿部分开始 -->
                        <tr>
                            <td>
                                <span class="required">*</span>Accommodation:
                            </td>
                            <td>
                                Hotel:
                                <select name="Hotel" id="SelectHotel" runat="server" onchange="changeHotel();">
                                </select>
                                RoomType:
                                <select name="RoomType" id="SelectRoom" runat="server" onchange="changePriceRoom();">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Unit Price:
                            </td>
                            <td>
                                <input type="text" id="txtUnitPrice" name="UnitPrice" readonly="readonly" class="redonly-from" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Available Room:
                            </td>
                            <td>
                                <input type="text" id="txtAvailableRoom" name="AvailableRoom" readonly="readonly"
                                    class="redonly-from" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Booking Room:
                            </td>
                            <td>
                                <input type="text" name="BookingRoom" id="txtBookingRoom" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Check In:
                            </td>
                            <td>
                                <input type="text" name="CheckIn" id="txtCheckIn" onClick="WdatePicker({lang:'en'})"/>YYYY-MM-DD
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="required">*</span>Check Out:
                            </td>
                            <td>
                                <input type="text" name="CheckOut" id="txtCheckOut" onClick="WdatePicker({lang:'en'})"/>YYYY-MM-DD
                            </td>
                        </tr>
                        <tr>
                           <strong>
                            The Accommodation fee will be charged by Hotel.
                           </strong>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <!-- 住宿部分结束 -->
                    </table>
                    <input type="button" value="Prev" style="margin-left: 5em; margin-right: 5em;" onclick="javascript:conferForm(1,0);" />
                    <input type="button" value="Next" onclick="javascript:conferForm(1,2);" />
                </div>
                <div id="tab3">
                    <table>
                        <tr>
                            <td>
                                <p>
                                    Please upload you Abstract</p>
                            </td>
                        </tr>
                        <tr>
                             <td>
                                <span class="required">*</span>Topic:&nbsp;&nbsp;<select name="Topic" id="selTopic">
                                    <option selected="selected" value="Metals in medicine, diagnosis, and therapy">Metals in medicine, diagnosis, and therapy</option>
                                    <option value="Metalloproteins and diseases">Metalloproteins and diseases</option>
                                    <option value="Bio-inspired metal complexes">Bio-inspired metal complexes</option>
                                    <option value="Metal transport and metabolism">Metal transport and metabolism</option>
                                    <option value="Metal regulation on structures and functions of genes">Metal regulation on structures and functions of genes</option>
                                    <option value="Bioinorganic chemistry and nanotechnology">Bioinorganic chemistry and nanotechnology</option>
                                    <option value="Biomineralization and related applications">Biomineralization and related applications</option>
                                    <option value="Metal ion interactions with nucleic acids and related topics">Metal ion interactions with nucleic acids and related topics</option>
                                    <option value="Environmental and toxicological aspects of metal ions">Environmental and toxicological aspects of metal ions</option>
                                </select>
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div id="fileWrap">
                                <input type="button" class="btn" value="Browse" />
                                <input type="text" class="ipt_text" id="file_text" readonly="readonly" />
                                <input type="file" name="fileToUpload" id="fileToUpload" title="choose file"  onchange="SetFileName();" />
                                <input type="button" id="Button1" value="Upload" onclick="return checkType();" />
                                <span id="filetype_prompt">(.doc|.docx)</span>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                File Name:<input type="text" class="redonly-from" id="fileName" name="fileName" readonly="readonly"/><br />
                                File Type:<input type="text" class="redonly-from" id="fileType" name="fileType" readonly="readonly" />
								<input type="text" class="redonly-from" id="filePath" name="filePath" readonly="readonly" style="visibility:hidden;"/>
                            </td>
                        </tr>
                        <!-- 上传文件结束 -->
                    </table>
                    <input type="button" value="Prev" style="margin-left: 5em; margin-right: 5em;" onclick="javascript:conferForm(2,1);" />
                    <input type="button" value="Next" onclick="javascript:conferForm(2,3);" />

                    <!-- <input type="button" value="Prev" style="margin-left: 5em; margin-right: 5em;" onclick="javascript:conferForm(2,1);" />
                    <input type="submit" value="Submit" title="submit" id="Submit1" onclick="return conferForm(2,99)" /> -->
                </div>
                <div id="tab4">
                    <table>
                        <!-- 提交前预览 开始 -->
                        <tr>
                            <td>name:</td><td><span class="preName"></span></td>
                        </tr>
                        <tr>
                            <td>Gender:</td><td><span class="preGender"></span></td>
                        </tr>
                        <tr>
                            <td>Title:</td><td><span class="preTitle"></span></td>
                        </tr>
                        <tr>
                            <td>Category of Participation:</td><td><span class="preParticipation"></span></td>
                        </tr>
                        <tr>
                            <td>Number of Accompanying Persons:</td><td><span class="preAccompany"></span></td>
                        </tr>
                        <tr>
                            <td>Name of Institution:</td><td><span class="preInstitutionName"></span></td>
                        </tr>
                        <tr>
                            <td>Address of Institution:</td><td><span class="preInstitutionAddress"></span></td>
                        </tr>
                        <tr>
                            <td>
                                Phone:</td><td><span class="prePhone"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email:</td><td><span class="preEmail"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Fax:</td><td><span class="preFax"></span>
                            </td>
                        </tr>

                        <tr>
                            <td>Arrival Date:</td><td><span class="preArrival"></span></td>
                        </tr>
                        <tr>
                            <td>Departure Date:</td><td><span class="preDeparture"></span></td>
                        </tr>

                        <tr>
                            <td>Plan for Presentation:</td><td><span class="prePlan"></span></td>
                        </tr>


                        <tr>
                            <td>Total Amount of Registration Fee:</td><td><span class="preTotalFee"></span></td>
                        </tr>
                        <tr>
                            <td>Mode of Payment:</td><td><span class="prePayment"></span></td>
                        </tr>


                        <tr>
                            <td>
                                Hotel:</td><td><span class="preHotel"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Room Type:</td><td><span class="preRoomType"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Booking Room:</td><td><span class="preBooking"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Unit Price:</td><td><span class="preUnitPrice"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Check in Date:</td><td><span class="preCheckin"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Check out Date:</td><td><span class="preCheckout"></span>
                            </td>
                        </tr>

						<tr>
							<td>
								Topic:</td><td><span class="preTopic"></span>
							</td>
						</tr>
                        <tr>
							<td>
								File Name:</td><td><span class="preFileName"></span>
							</td>
						</tr>
                        <tr>
                            <td>
                                
                            </td>
                        </tr>
                        <!-- 提交前预览 结束 -->
                    </table>
                    <input type="button" value="Prev" style="margin-left: 5em; margin-right: 5em;" onclick="javascript:conferForm(3,2);" />
                    <input type="submit" value="Submit" title="submit" id="Submit2" onclick="return conferForm(3,99)" />
                </div>
            </div>
        </form>
    </div>

    <div class="footer divcenter">
    	<p><a href="mailto:isabc12@mail.sysu.edu.cn">Contact us: <span style="COLOR: #070; TEXT-DECORATION: underline">isabc12@mail.sysu.edu.cn</span></a><p>
    </div>
</div>

<script type="text/javascript">
    $("#tab").tabs({disabled:[1,2,3]});
    //param:index tab index,int
    function conferForm(tabIndex, toIndex) {
        switch (tabIndex) {
            case 0:
                var txtInputs = $("#tab1 table input");
                $("#tab1 table span.err").remove();
                for (var i = 0; i < txtInputs.size(); i++) {
                    if (txtInputs.eq(i).attr('id') == 'txtPhone' || txtInputs.eq(i).attr('id') == 'txtFax' || txtInputs.eq(i).attr('id') == 'txtArrivalDate' || txtInputs.eq(i).attr('id') == 'txtDepartureDate') {
                        if (txtInputs.eq(i).attr('id') == 'txtPhone' || txtInputs.eq(i).attr('id') == 'txtFax') {
                            if (txtInputs.eq(i).attr('value') === "") {
                                continue;
                            } else if (!$String.isPhoneNum(txtInputs.eq(i).attr('value'))) {
                                txtInputs.eq(i).after("<span class='err'>*Error, only allows[0-9+-]</span>");
                                txtInputs.eq(i).focus();
                                break;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                    else {
                        if (txtInputs.eq(i).attr('value') === "") {
                            txtInputs.eq(i).focus();
                            txtInputs.eq(i).after("<span class='err'>*Require Field</span>");
                            break;
                        }
                        if (txtInputs.eq(i).attr('id') == 'txtAccompany' && !$String.isAllNum(txtInputs.eq(i).val())) {
                            txtInputs.eq(i).after("<span class='err'>*Number Type</span>");
                            txtInputs.eq(i).focus();
                            break;
                        }
                        if ((txtInputs.eq(i).attr('id') == 'txtPhone' || txtInputs.eq(i).attr('id') == 'txtFax') && !$String.isPhoneNum(txtInputs.eq(i).attr('value'))) {
                            txtInputs.eq(i).after("<span class='err'>*Error, only allows[0-9+-]</span>");
                            txtInputs.eq(i).focus();
                            break;
                        }
                        if (txtInputs.eq(i).hasClass("dateType") && !$String.isDate(txtInputs.eq(i).attr('value'))) {
                            txtInputs.eq(i).after("<span class='err'>*Error Date</span>");
                            txtInputs.eq(i).focus();
                            break;
                        }
                        if (txtInputs.eq(i).attr("name") == 'Email' && !$String.isEmail(txtInputs.eq(i).attr("value"))) {
                            txtInputs.eq(i).after("<span class='err'>*Error Email</span>");
                            txtInputs.eq(i).focus();
                            break;
                        }
                     }
                    
                }
                if ($("#tab1 table span.err").size() === 0 && toIndex === 1)
                    $("#tab").tabs({ disabled: [0, 2, 3] }).tabs("select", 1);
                break;
            case 1:
                var txtInputs = $("#tab2 table input");
                //var selects = $("#tab2 table select");
                $("#tab2 table span.err").remove();
                if ($("#SelectHotel").val() == "--Please Select Hotel--" || $("#SelectRoom").val() == "0") {
                    $("#SelectRoom").after("<span class='err'>*Please choose</span>");
                    break;
                }
                if (!$String.isAllNum($("#txtBookingRoom").val()) || (parseInt($("#txtBookingRoom").val()) > 3 || parseInt($("#txtBookingRoom").val()) < 0)) {
                    $("#txtBookingRoom").after("<span class='err'>*Number of room,most 3</span>");
                    $("#txtBookingRoom").focus();
                    break;
                }
                if (parseInt($("#txtBookingRoom").val()) > parseInt($("#txtAvailableRoom").val())) {
                    $("#txtBookingRoom").after("<span class='err'>*Number of booking can't be larger than available number</span>");
                    $("#txtBookingRoom").focus();
                    break;
                }
                if (!$String.isDate($("#txtCheckIn").val())) {
                    $("#txtCheckIn").after("<span class='err'>*Error Date</span>");
                    $("#txtCheckIn").focus();
                    break;
                }
                if (!$String.isDate($("#txtCheckOut").val())) {
                    $("#txtCheckOut").after("<span class='err'>*Error Date</span>");
                    $("#txtCheckOut").focus();
                    break;
                }
                if ($("#tab1 table span.err").size() === 0) {
                    switch (toIndex) {
                        case 0:
                            $("#tab").tabs({disabled:[1,2,3]}).tabs("select", 0);
                            break;
                        case 2: 
                            $("#tab").tabs({disabled:[0,1,3]}).tabs("select", 2);
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 2:
                $("#tab3 table span.err").remove();
                if ($("#fileName").val() == "") {
                    $("#filetype_prompt").after("<span class='err'>*please upload your file</span>");
                    $("#fileToUpload").focus();
                    return false;
                }
                if ($("#tab1 table span.err").size() === 0) {
                    switch (toIndex) {
                        case 1:
                            $("#tab").tabs({ disabled: [0,2,3] }).tabs("select", 1);
                            break;
                        case 3:
                            $("#tab").tabs({ disabled: [0,1,2] }).tabs("select", 3);
							SetPreview();
                            break;
                        default:
                            break;
                    }
                }
                break;

            case 3:
                $("#tab4 table span.err").remove();
                
                if (toIndex == 2) {
                    $("#tab").tabs({ disabled: [0,1,3] }).tabs("select", 2);
                }
                //提交将触发
                if (toIndex == 99) {
                    RegSubmit();
                }
                break;
        }
		return false;
    }
	
	function SetPreview(){
	    $(".preName").text($("#txtUserFirstName").val() + " " + $("#txtUserFamilyName").val());
	    $(".preGender").text($("#SelGender").val());
		$(".preTitle").text($("#SelTitle").val());
		$(".preParticipation").text($("#SelParticipation").val());
		$(".preAccompany").text($("#txtAccompany").val());
		$(".preInstitutionAddress").text($("#txtInstitutionAddr").val());
		$(".preInstitutionName").text($("#txtInstitutionName").val());
		$(".prePhone").text($("#txtPhone").val());
		$(".preEmail").text($("#txtEmail").val());
		$(".preFax").text($("#txtFax").val());
		$(".preArrival").text($("#txtArrivalDate").val());
		$(".preDeparture").text($("#txtDepartureDate").val());
		$(".prePlan").text($("#selPrePlan").val());
		$(".preTotalFee").text($("#txtTotalFee").val());
		$(".prePayment").text($("#SelPaymentMode").val());
		$(".preHotel").text($("#SelectHotel").val());
		$(".preRoomType").text($("#SelectRoom").val());
		$(".preBooking").text($("#txtBookingRoom").val());
		$(".preUnitPrice").text($("#txtUnitPrice").val());
		$(".preCheckin").text($("#txtCheckIn").val());
		$(".preCheckout").text($("#txtCheckOut").val());
		$(".preTopic").text($("#selTopic").val());
		$(".preFileName").text($("#fileName").val());
		
	}

</script>
</body>
</html>
