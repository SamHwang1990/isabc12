/**
 * @author: 江剑锋
 * @Date: 2013-02-10
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */

(function () {

    //登录面板
    function login() {
        loginPanel.form.submit({
            url:"checklogin.aspx",
            waitmsg:"正在登录，请稍候……",
            method:"post",
            success:function (form, action) {
                var flag = action.result.success;
                if (flag == "true") {
                    //登录成功
                    window.location.href = "Default.aspx";
                }
                else {
                    Ext.MessageBox.alert("提示", action.result.Text);
                }
            },
            failure:function (form, action) {
                Ext.MessageBox.alert("提示!", "登录失败");
            }
        });
    }

    var loginPanel = new Ext.form.FormPanel({
        frame:true,
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:45,
        baseCls:"x-plain",
        defaults:{anchor:"95%", msgTarget:"side"},
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"AdminName",
                fieldLabel:"帐号",
                allowBlank:false,
                blankText:"帐号不允许为空"
            },
            {
                name:"Password",
                fieldLabel:"密码",
                inputType:"password",
                allowBlank:false,
                blankText:"帐号不允许为空",
                listeners:{
                    "specialkey":function (textfield, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            login();
                        }
                    }
                }
            }
        ],
        buttons:[
            {
                text:"登录",
                minWidth:70,
                handler:function () {
                    if (loginPanel.getForm().isValid()) {
                       login();
                    }
                }
            },
            {
                text:"重置",
                minWidth:70,
                qtip:"重置数据",
                handler:function () {
                    loginPanel.getForm().reset();
                }
            }
        ]
    });

    var win = new Ext.Window({
        width:300,
        height:200,
        iconCls:"addicon",
        resizable:false,
        draggable:false,
        closable:false,
        title:"登录",
        modal:'true',
        buttonAlign:"center",
        bodyStyle:"padding:40px 0 0 20px",
        items:loginPanel
    });

    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            frame:true
        });
        win.show();
    });
})();
