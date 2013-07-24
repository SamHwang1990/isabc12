/**
* @author: 黄志源
* @Date: 2013-05-03
* @Description:
* (c) Copyright 2013 HopeStudio.
* All Rights Reserved.
*/

    function checkType() {
        

        //得到上传文件的值
        var fileName = document.getElementById("FileUpload1").value;

        //返回String对象中子字符串最后出现的位置.
        var seat = fileName.lastIndexOf(".");
        //返回位于String对象中指定位置的子字符串并转换为小写.
        var extension = fileName.substring(seat).toLowerCase();

        //判断允许上传的文件格式
        //if(extension!=".jpg"&&extension!=".jpeg"&&extension!=".gif"&&extension!=".png"&&extension!=".bmp"){
        //alert("不支持"+extension+"文件的上传!");
        //return false;
        //}else{
        //return true;
        //}

        var allowed = [".doc", ".docx"];
        for (var i = 0; i < allowed.length; i++) {
            if (!(allowed[i] != extension)) {
                return true;
            }
        }
        alert(".doc or docx only");
        return false;
    }