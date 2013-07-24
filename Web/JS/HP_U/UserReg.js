var $ = jQuery.noConflict();

function SetFileName() {
    var fileName = document.getElementById("fileToUpload").value;
    if (fileName.match(/fakepath/)) {
        // update the file-path text using case-insensitive regex
        fileName = fileName.replace(/C:\\fakepath\\/i, '');
    }
    var fileNameInput = $("#file_text");
    fileNameInput.val(fileName);
}

function checkType() {
    //得到上传文件的值
    var fileName = document.getElementById("fileToUpload").value;

    //返回String对象中子字符串最后出现的位置.
    var seat = fileName.lastIndexOf(".");
    //返回位于String对象中指定位置的子字符串并转换为小写.
    var extension = fileName.substring(seat).toLowerCase();
    var typePermit = false;
//    var allowed = [".doc", ".docx"];
//    for (var i = 0; i < allowed.length; i++) {
//        if (!(allowed[i] != extension)) {
//            return true;
//        }
    //    }
    if (extension == ".doc" || extension == ".docx") {
        ajaxFileUpload();
        return false;
    }
    alert(".doc or .docx only");
    return false;
}

//获取选取的Participation值
var FGetParticipation = function () {
    var ESelect = document.getElementById("SelParticipation");
    var EIndex = ESelect.selectedIndex;
    var EValue = ESelect.options[EIndex].value;
    return EValue;
}

function SetRegFee() {
    var ERegFee = $("#txtTotalFee");
	var accompany = $("#txtAccompany").val();
	var totalFee;
	var ERegPart = FGetParticipation();
	
	totalFee = accompany*300;
	if(ERegPart == "full"){
		totalFee += 600;
	}
	if(ERegPart == "Emertus_retired"){
		totalFee += 300;
	}
	if(ERegPart == "phD"){
		totalFee += 300;
	}	
	ERegFee.val("$" + totalFee);
}

function changeHotel(){
	var hotelId = $("#SelectHotel").val();
	$("#SelectRoom").empty();
	$("#SelectRoom option").remove();
	$("#txtUnitPrice").val("");
	$("#txtAvailableRoom").val("");
	$("#txtBookingRoom").val("");
	$("<option value='0'>--Please Select Room--</option>").appendTo($("#SelectRoom"));
	$.ajax({
	    type: 'POST',
	    url: "../Ajax/Hotel.ashx?type=hotel&hotelId=" + hotelId,
	    data: "",
	    success: function (data) {
	        var str = data.split(",");
	        for (var i = 0; i < str.length; i++) {
	            $("<option value='" + str[i] + "'>" + str[i] + "</option>").appendTo($("#SelectRoom"));
	        }
	    }
	})
}

function changePriceRoom() {
    var roomName = $("#SelectRoom").val();
    $("#txtUnitPrice").val();
    $("#txtAvailableRoom").val();
    $.ajax({
        type: 'POST',
        url: "../Ajax/Hotel.ashx?type=room&roomType=" + roomName,
        data: "",
        success: function (data) {
            var str = data.split(",");
            $("#txtUnitPrice").val(str[0]);
            $("#txtAvailableRoom").val(str[1]);
            if (str[1] == 0) {
                $("#txtBookingRoom").css("display", "none");
                $("#txtBookingRoom").val(0);
            }
            else {
                $("#txtBookingRoom").css("display", "block");
            }
        }
    })
}

function ajaxFileUpload (){
    $.ajaxFileUpload({
        url: 'UploadHandler.aspx',
        secureuri: false,
        fileElementId: 'fileToUpload',
        dataType: 'json',
        success: function (data, status) {
			json = eval("(" + data + ")");
            if (typeof (json.error) != 'undefined') {
                if (json.error != "") {
                    alert(json.error);
                } else {
                    $("#fileName").val(json.filename);
                    $("#filePath").val(json.filePath);
                    $("#fileType").val(json.fileType);
                }
            }
        },
        error: function (data, status, e) {
            alert(e);
        }
    })
}

$String = {
    // is all char is Number,no dot,return bool
    isAllNum: function (str) {
        var reg = /^[0-9]+$/
        return reg.test(str);
    },
    trimLeft: function (str) {
        return typeof str == "string" ? str.replace(/^\s+/, '') : str;
    },
    trimRight: function (str) {
        return typeof str == "string" ? str.replace(/\s+$/g, '') : str;
    },
    trim: function (str) {
        return typeof str == "string" ? this.trimRight(this.trimLeft(str)) : str;
    },
    isEmail: function (str) {
        if (typeof this.trim(str) == "string") {
            var reg = /^[\w\.]+@[\w-]+(\.\w+){0,3}(\.[a-zA-Z]+){1,3}$/;
            return reg.test(this.trim(str));
        }
        return false;
    },
    isPhoneNum: function (str) {
        var reg = /^(\+)?([\d]*[-]?)*\d+$/;
        return reg.test(this.trim(str));
    },
    isDate: function (str) {
        var reg = /^201\d{1}-[01]{1}\d{1}-[0123]{1}\d{1}$/;
        return reg.test(this.trim(str));
    }
};

function RegSubmit(){
    var firstName = $("#txtUserFirstName").val().trim();
    var familyName = $("#txtUserFamilyName").val().trim();
    var name = firstName + " " + familyName;
	var gender = $("#SelGender").val();
	var title = $("#SelTitle").val();
	var participate = $("#SelParticipation").val();
	var accompany = $("#txtAccompany").val();
	var institutionName = $("#txtInstitutionName").val();
	var institutionAddr = $("#txtInstitutionAddr").val();
	var phone = $("#txtPhone").val();
	var email = $("#txtEmail").val();
	var fax = $("#txtFax").val();
	var arriveDate = $("#txtArrivalDate").val();
	var departureDate = $("#txtDepartureDate").val();
	var presentationPlan = $("#selPrePlan").val();
	var totalFee = $("#txtTotalFee").val();
	var modePay = $("#SelPaymentMode").val();
	var hotel = $("#SelectHotel").val();
	var roomType = $("#SelectRoom").val();
	var unitPrice = $("#txtUnitPrice").val();
	var available = $("#txtAvailableRoom").val();
	var book = $("#txtBookingRoom").val();
	var checkIn = $("#txtCheckIn").val();
	var checkOut = $("#txtCheckOut").val();
	var fileName = $("#fileName").val();
	var filePath = $("#filePath").val();
	var fileType = $("#fileType").val();
	var fileTopic = $("#selTopic").val();
	
	var ajaxData = "Name="+name+"&Gender="+gender+"&Title="+title+"&Participation="+participate+"&Accompany="+accompany+
	"&InstitutionName="+institutionName+"&InstitutionAddr="+institutionAddr+"&Phone="+phone+"&Email="+email+"&Fax="+fax+
	"&ArriveDate="+arriveDate+"&DepartDate="+departureDate+"&PrePlan="+presentationPlan+"&TotalFee="+totalFee+"&PaymentMode="+modePay+
	"&Hotel=" + hotel + "&RoomType=" + roomType + "&UnitPrice=" + unitPrice + "&AvailableRoom=" + available + "&BookingRoom=" + book + "&CheckIn=" + checkIn +
	"&CheckOut="+checkOut+"&fileName="+fileName+"&filePath="+filePath+"&fileType="+fileType+"&fileTopic="+ fileTopic;
	$.ajax({
        type: 'POST',
        url: "RegHandler.aspx",
        data: ajaxData,
        success:function (form) {
                var flag = $(form).find("Succeed").text();
                if (flag == "true") {
                    //登录成功
                    window.location.href = "http://ce.sysu.edu.cn/isabc12/SRR.html";
                }
                else {
                    alert($(form).find("Text").text(), $(form).find("Text").text());
                }
            },
            failure:function (form) {
                alert("Message!", "Register Failed");
            }
    })
}