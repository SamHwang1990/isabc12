/**
 * @author: 江剑锋
 * @Date: 2013-02-16
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */

(function () {

    var editor = null;
    //编辑文章的表单
    var addForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        frame:true,
        labelWidth:100,
        labelAlign:"right",
        baseCls:"x-plain",
        defaults:{
            anchor:"95%",
            msgTarget:"side"
        },
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"Title",
                fieldLabel:"文章标题",
                allowBlank:false,
                blankText:"文章标题不允许为空"
            },
            {
                xtype:"hidden",
                name:"NodeID",
                id:"NodeID"
            },
            new OECP.ui.ComboBoxTree({
                treeUrl:"../NodeMgr/GetNodeTree.aspx",
                fieldLabel:'所属节点',
                editable:false,
                hiddenName:'NodeName',
                name:'NodeName',
                valueField:"NodeID",
                selectMode:"leaf",
                displayField:"NodeName"
            }),
            {
                xtype:'textarea',
                fieldLabel:'文章内容',
                height:450,
                id:"Content",
                name:'Content'
            },
            {
                xtype:'textarea',
                fieldLabel:'备注信息',
                name:'Remark'
            }
        ],
        buttons:[
            {
                text:"确定",
                handler:function () {
                    if (!addForm.getForm().isValid()) {
                        return;
                    }
                    if (!editor.hasContents()) { //此处以非空为例
                        Ext.Msg.alert("提示", "文章内容不能为空！");
                        return;
                    }
                    //弹出效果
                    Ext.MessageBox.show({
                        msg:'正在添加，请稍等...',
                        progressText:'Saving...',
                        width:300,
                        wait:true,
                        waitConfig:{
                            interval:100
                        },
                        icon:'download',
                        animEl:'saving'
                    });
                    editor.sync(); //同步内容
                    addForm.getForm().submit({
                        url:"AddArticle.aspx",
                        method:"POST",
                        success:function (form, action) {
                            var flag = action.result.success;
                            if (flag == "true") {
                                Ext.MessageBox.alert("提示", action.result.Text,
                                    function () {
                                        window.location.href = "Default.aspx";
                                    });
                            } else {
                                Ext.MessageBox.alert("提示", action.result.Text);
                            }
                        },
                        failure:function (form, action) {
                            Ext.MessageBox.alert("提示!", "添加新文章失败!");
                        }
                    });

                }
            },
            {
                text:"返回",
                handler:function () {
                    window.location.href = "Default.aspx";
                }
            }
        ]
    });

    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            layout:"fit",
            frame:true,
            items:addForm
        });

        editor = editor = new UE.ui.Editor();
        editor.render("Content");

    });

})()