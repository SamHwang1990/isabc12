/**
 * @author: 江剑锋
 * @Date: 2013-02-08
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */

(function () {

    var root = new Ext.tree.AsyncTreeNode({
        text:"HPCMS",
        loader:new Ext.tree.TreeLoader({
            url:"GetModuleTree.aspx"
        })
    });
    root.expand(true);
    var treePanel = new Ext.tree.TreePanel({
        // title: "模块",
        region:"west",
        width:550,
        split:true,
        autoScroll:true,
        animate:true,
        root:root,
        rootVisible:false,
        border:false,
        lines:true,
        enableDD:false,
        containerScroll:true,
        tbar:["", "", {
            text:"添加模块",
            tooltip:"添加模块",
            iconCls:"addicon",
            handler:function () {
                addModule();
            }
        }, "", "", "", {
            text:"编辑模块",
            tooltip:"编辑模块",
            iconCls:"editicon",
            handler:function () {
                var sn = treePanel.getSelectionModel();
                if (sn.selNode == null || sn.selNode.id < 0) {
                    Ext.Msg.alert("提示", "请选择要编辑的模块");
                    return;
                }
                editModule(sn.selNode.id);
            }
        }, "", "", "", {
            text:"删除模块",
            tooltip:"删除模块",
            iconCls:"deleteicon",
            handler:function () {
                var sn = treePanel.getSelectionModel().selNode;
                //console.log(sn);
                if (sn == null || sn.id < 0) {
                    Ext.Msg.alert("提示", "请选择要删除的模块");
                    return;
                }
                deleteModule(sn.id);
            }
        }, "", "-", "", {
            text:"添加功能",
            tooltip:"添加功能",
            iconCls:"addicon",
            handler:function () {
                addFunction();
            }
        }, "", "", "", {
            text:"编辑功能",
            tooltip:"编辑功能",
            iconCls:"addicon",
            handler:function () {
                editFunction();
            }
        }, "", "", "", {
            text:"删除功能",
            tooltip:"删除功能",
            iconCls:"deleteicon",
            handler:function () {

            }
        }],
        listeners:{
            "click":function (node, event) {
                event.stopEvent();
                tp.overwrite(centerPanel.body, node.attributes);
            }
        }

    });

///////////////////////////////////////////////////////////////////////////////////////////////////

    //添加模块的表单
    var moduleStore = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:'GetModuleList.aspx'
        }),
        reader:new Ext.data.JsonReader({
                root:'root',
                id:'ModuleID'
            },
            [
                {
                    name:'ModuleID', mapping:'ModuleID'
                },
                {
                    name:'ParentID', mapping:'ParentID'
                },
                {
                    name:'ModuleName', mapping:'ModuleName'
                },
                {
                    name:"DefaultUrl", mapping:'DefaultUrl'
                },
                {
                    name:'Remark', mapping:'Remark'
                }
            ]
        )
    });
    moduleStore.load();
    var addForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:60,
        labelAlign:"right",
        baseCls:"x-plain",
        defaults:{anchor:"95%", msgTarget:"side"},
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"ModuleName",
                fieldLabel:"模块名称",
                allowBlank:false,
                blankText:"模块名称不允许为空"
            },
            {
                name:"DefaultUrl",
                fieldLabel:"URL"
            },
            {
                xtype:"combo",
                store:moduleStore,
                typeAhead:true,
                fieldLabel:'父模块',
                hiddenName:'ParentID',
                name:'ParentID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'选择父模块',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择父模块',
                displayField:'ModuleName',
                valueField:'ModuleID',
                mode:'remote'
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注信息"
            }
        ]
    });


///////////////////////////////////////////////////////////////////////////////////////////////////

    //添加功能的表单
    var addFunctionForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:60,
        labelAlign:"right",
        baseCls:"x-plain",
        defaults:{anchor:"95%", msgTarget:"side"},
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"FunctionName",
                fieldLabel:"功能名称",
                allowBlank:false,
                blankText:"功能名称不允许为空"
            },
            {
                name:"DefaultUrl",
                fieldLabel:"URL",
                llowBlank:false,
                blankText:"URL不允许为空"
            },
            {
                name:"FunctionKey",
                fieldLabel:"功能键"
            },
            {
                name:"FunctionValue",
                fieldLabel:"功能值",
                allowBlank:false,
                regex:/^[0-9.]$/,
                blankText:"功能值不允许为空",
                regexText:"功能值为数字"
            },
            {
                xtype:"combo",
                store:moduleStore,
                typeAhead:true,
                fieldLabel:'所属模块',
                hiddenName:'ModuleID',
                name:'ModuleID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'选择所属模块',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择所属模块',
                displayField:'ModuleName',
                valueField:'ModuleID',
                mode:'remote'
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注信息"
            }
        ]
    });


///////////////////////////////////////////////////////////////////////////////////////////////////

    //编辑模块的表单
    var editForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:60,
        labelAlign:"right",
        baseCls:"x-plain",
        defaults:{anchor:"95%", msgTarget:"side"},
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"ModuleID",
                fieldLabel:"模块ID",
                allowBlank:false,
                readOnly:true,
                hidden:true,
                blankText:"模块ID不允许为空"
            },
            {
                name:"ModuleName",
                fieldLabel:"模块名称",
                allowBlank:false,
                blankText:"模块名称不允许为空"
            },
            {
                name:"DefaultUrl",
                fieldLabel:"URL"
            },
            {
                xtype:"combo",
                store:moduleStore,
                typeAhead:true,
                fieldLabel:'父模块',
                hiddenName:'ParentID',
                name:'ParentID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'选择父模块',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择父模块',
                displayField:'ModuleName',
                valueField:'ModuleID',
                mode:'remote'
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注信息"
            }
        ]
    });

    //添加模块
    function addModule() {

        var win = new Ext.Window({
            title:"添加模块",
            width:400,
            height:280,
            plain:true,
            layout:"fit",
            iconCls:"addicon",
            resizable:false,
            draggable:true,
            defaultType:"textfield",
            labelWidth:150,
            collapsible:true,
            closeAction:'hide',
            closable:true,
            plain:true,
            modal:'true',
            buttonAlign:"center",
            bodyStyle:"padding:10px 0 0 15px",
            items:addForm,
            listeners:{
                "show":function () {
                    // addForm.getForm().reset();
                }
            },
            buttons:[
                {
                    text:"添加",
                    minWidth:70,
                    handler:function () {
                        if (addForm.getForm().isValid()) {
                            //弹出效果
                            Ext.MessageBox.show({
                                    msg:'正在添加，请稍等...',
                                    progressText:'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig:{interval:100},
                                    icon:'download',
                                    animEl:'saving'
                                }
                            );
                            addForm.getForm().submit({
                                url:"AddModule.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text, function () {
                                            // treePanel.getLoader().load(root);
                                            win.hide();
                                        });
                                    }
                                    else {
                                        Ext.MessageBox.alert("提示", action.result.Text);
                                    }
                                }, failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", "添加新用户失败!");
                                }
                            });
                        }
                    }
                },
                {
                    text:"取 消",
                    minWidth:70,
                    handler:function () {
                        win.hide();
                    }
                }
            ]
        });
        win.show();

    }


    //编辑模块
    function editModule(moduleID) {
        var win = new Ext.Window({
            title:"编辑模块",
            width:400,
            height:250,
            plain:true,
            layout:"fit",
            iconCls:"addicon",
            resizable:false,
            draggable:true,
            defaultType:"textfield",
            labelWidth:100,
            collapsible:true, //允许缩放条
            closeAction:'hide',
            closable:true,
            plain:true,
            modal:'true',
            buttonAlign:"center",
            bodyStyle:"padding:10px 0 0 15px",
            items:editForm,
            listeners:{
                "show":function () {
                    editForm.getForm().load({
                        url:"GetModuleInfo.aspx",
                        params:{
                            ModuleID:moduleID
                        }
                    });
                }
            },
            buttons:[
                {
                    text:"保存信息",
                    minWidth:70,
                    handler:function () {
                        if (editForm.getForm().isValid()) {
                            //弹出效果
                            Ext.MessageBox.show({
                                    msg:'正在保存，请稍等...',
                                    progressText:'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig:{interval:100},
                                    icon:'download',
                                    animEl:'saving'
                                }
                            );
                            editForm.form.submit({
                                url:"EditModule.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("恭喜", action.result.Text, function () {
                                            win.hide();
                                        });
                                    }
                                },
                                failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", action.result.Text);
                                }
                            });
                        }
                    }
                },
                {
                    text:"重置",
                    minWidth:70,
                    qtip:"重置数据",
                    handler:function () {
                        editForm.getForm().load({
                            url:"GetModuleInfo.aspx",
                            params:{
                                ModuleID:moduleID
                            }
                        });
                    }
                },
                {
                    text:"取 消",
                    minWidth:70,
                    handler:function () {
                        win.hide();
                    }
                }
            ]
        });
        win.show();
    }


    //删除功能
    function deleteModule(moduleID) {
        Ext.Msg.confirm("提示", "确定要删除选定的模块？", function (btn) {
            if (btn == "yes") {
                //弹出效果
                Ext.MessageBox.show({
                        msg:'正在删除，请稍等...',
                        progressText:'Saving...',
                        width:300,
                        wait:true,
                        waitConfig:{interval:100},
                        icon:'download',
                        animEl:'saving'
                    }
                );
                Ext.Ajax.request({
                    url:"DeleteModule.aspx",
                    method:"POST",
                    params:{
                        ModuleID:moduleID
                    },
                    success:function () {
                        Ext.Msg.alert("提示", "已删除", function () {
                        });
                    },
                    failure:function () {
                        Ext.Msg.alert("提示", "删除失败!");
                    }
                });
            }
        });
    }


///////////////////////////////////////////////////////////////////////////////////////////////////

    //添加功能
    function addFunction() {
        var win = new Ext.Window({
            title:"添加功能",
            width:400,
            height:280,
            plain:true,
            layout:"fit",
            iconCls:"addicon",
            resizable:false,
            draggable:true,
            defaultType:"textfield",
            labelWidth:150,
            collapsible:true,
            closeAction:'hide',
            closable:true,
            plain:true,
            modal:'true',
            buttonAlign:"center",
            bodyStyle:"padding:10px 0 0 15px",
            items:addFunctionForm,
            listeners:{
                "show":function () {
                }
            },
            buttons:[
                {
                    text:"添加",
                    minWidth:70,
                    handler:function () {
                        if (addFunctionForm.getForm().isValid()) {
                            //弹出效果
                            Ext.MessageBox.show({
                                    msg:'正在添加，请稍等...',
                                    progressText:'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig:{interval:100},
                                    icon:'download',
                                    animEl:'saving'
                                }
                            );
                            addFunctionForm.getForm().submit({
                                url:"../FunctionMgr/AddFunction.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text, function () {
                                            //treePanel.getLoader().load(root);
                                            win.hide();
                                        });
                                    }
                                    else {
                                        Ext.MessageBox.alert("提示", action.result.Text);
                                    }
                                }, failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", "添加新用户失败!");
                                }
                            });
                        }
                    }
                },
                {
                    text:"取 消",
                    minWidth:70,
                    handler:function () {
                        win.hide();
                    }
                }
            ]
        });
        win.show();
    }


///////////////////////////////////////////////////////////////////////////////////////////////////

    //模块信息面板
    var tp = new Ext.XTemplate(
        '<p>　　</p>',
        '<p>　　类型: {type}</p>',
        '<p>　　</p>',
        '<p>　　ID: {id}</p>',
        '<p>　　</p>',
        '<p>　　名称: {text}</p>',
        '<p>　　</p>',
        '<p>　　URL: {href} </p>'
    );

    var centerPanel = new Ext.Panel({
        region:"center",
        title:"信息",
        layout:"fit",
        items:tp
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            layout:"border",
            items:[treePanel, centerPanel]
        });
    });


})();