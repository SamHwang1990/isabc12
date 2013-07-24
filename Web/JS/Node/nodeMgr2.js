/**
 * @author: 江剑锋
 * @Date: 2013-02-08
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //添加节点的表单
    var nodeStore = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:'GetNodeList.aspx'
        }),
        reader:new Ext.data.JsonReader({
                root:'root',
                id:'NodeID'
            },
            [
                {name:'NodeID', mapping:'NodeID'},
                {name:'ParentID', mapping:'ParentID'},
                {name:'NodeName', mapping:'NodeName'},
                {name:'Remark', mapping:'Remark'}
            ]
        )
    });
    nodeStore.load();
    var addForm = new Ext.form.FormPanel({
        width:315,
        height:270,
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
                name:"NodeName",
                fieldLabel:"节点名称",
                allowBlank:false,
                blankText:"节点名称不允许为空"
            },
            {
                xtype:"combo",
                store:nodeStore,
                typeAhead:true,
                fieldLabel:'父节点',
                hiddenName:'ParentID',
                name:'ParentID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'选择父节点',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'选择父节点',
                displayField:'NodeName',
                valueField:'NodeID',
                mode:'remote'
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注"
            }
        ]
    });

    //添加节点
    function addNode() {
        nodeStore.load();
        var win = new Ext.Window({
            title:"添加节点",
            width:400,
            height:250,
            plain:true,
            iconCls:"addicon",
            resizable:false,
            draggable:true,
            defaultType:"textfield",
            labelWidth:100,
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
                    addForm.getForm().reset();
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
                                url:"AddNode.aspx",
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
                                    Ext.MessageBox.alert("提示!", "添加新节点失败!");
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////
    var root = new Ext.tree.AsyncTreeNode({
        text:"HPCMS",
        loader:new Ext.tree.TreeLoader({
            url:"GetNodeTree.aspx"
        })
    });
    root.expand(true, true);
    var treePanel = new Ext.tree.TreePanel({
        region:"west",
        width:200,
        split:true,
        autoScroll:true,
        animate:true,
        root:root,
        rootVisible:false,
        border:false,
        animate:true,
        lines:true,
        enableDD:false,
        containerScroll:true,
        tbar:["", "", {
            text:"添加",
            tooltip:"添加节点",
            iconCls:"addicon",
            handler:function () {
                addNode();
            }
        }, "", "", {
            text:"刷新",
            tooltip:"刷新节点",
            iconCls:"refreshicon",
            handler:function () {
                //treePanel.getLoader().load(root);
            }
        }, "", "-", "", {
            text:"删除",
            tooltip:"删除节点",
            iconCls:"deleteicon",
            handler:function () {
                var sn = treePanel.getSelectionModel().selNode;
                if (sn == null) {
                    Ext.Msg.alert("提示", "请选择要删除的节点");
                    return;
                }
                Ext.Msg.confirm("提示", "确定要删除选定的" + sn.text + "节点？", function (btn) {
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
                            url:"DeleteNode.aspx",
                            method:"POST",
                            params:{
                                NodeID:sn.id
                            },
                            success:function () {
                                Ext.Msg.alert("提示", "已删除", function () {
                                    //store.reload();
                                });
                            },
                            failure:function () {
                                Ext.Msg.alert("提示", "删除失败!");
                            }
                        });
                    }
                });
            }
        }],
        listeners:{
            "click":function (node, event) {
                event.stopEvent();
                basicInfoPanel.getForm().load({
                    url:"GetNodeInfo.aspx",
                    params:{
                        NodeID:node.attributes.id
                    }
                });
                console.log(node);
            }
        }

    });


    //基本信息面板
    var basicInfoPanel = new Ext.form.FormPanel({
        title:"基本信息",
        layout:"column",
        frame:true,
        padding:10,
        items:[
            {
                columnWidth:.4,
                xtype:'label',
                text:"节点ID",
                cls:"tableCell"
            },
            {
                columnWidth:.3,
                xtype:'textfield',
                name:'NodeID',
                readOnly:true,
                height:35,
                cls:"tableCell"
            },
            {
                columnWidth:.4,
                xtype:'label',
                text:"节点名称",
                cls:"tableCell"
            },
            {
                columnWidth:.5,
                xtype:'textfield',
                name:'NodeName',
                height:40,
                cls:"tableCell"
            },
            {
                columnWidth:.4,
                xtype:'label',
                text:"英文名称",
                cls:"tableCell"
            },
            {
                columnWidth:.5,
                xtype:'textfield',
                name:'NodeEnName',
                height:40,
                cls:"tableCell"
            },
            {
                columnWidth:.4,
                xtype:'label',
                text:"所属节点",
                cls:"tableCell"
            },
            {
                columnWidth:.5,
                store:nodeStore,
                xtype:"combo",
                typeAhead:true,
                hiddenName:'ParentID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'选择所属节点',
                selectOnFocus:true,
                editable:false,
                allowBlank:false,
                blankText:'请选择所属节点',
                displayField:'NodeName',
                valueField:'NodeID',
                mode:'remote',
                name:'ParentID',
                height:40,
                cls:"tableCell"
            },
            {
                columnWidth:.4,
                xtype:'label',
                text:"目录名称",
                cls:"tableCell"
            },
            {
                columnWidth:.5,
                xtype:'textfield',
                name:'DirName',
                height:40,
                cls:"tableCell"
            },
            {
                columnWidth:.4,
                xtype:'label',
                text:"Meta信息",
                cls:"tableCell"
            },
            {
                columnWidth:.5,
                xtype:'textarea',
                name:'Meta',
                cls:"tableCell"
            },
            {
                columnWidth:.4,
                xtype:'label',
                text:"备注信息",
                cls:"tableCell"
            },
            {
                columnWidth:.5,
                xtype:'textarea',
                name:'Remark',
                cls:"tableCell"
            }
        ]
    });


    //栏目选项面板
    var nodeSettingPanel = new Ext.Panel({
        title:"栏目选项",
        html:"hello "
    });

    //模板选项面板
    var templatePanel = new Ext.Panel({
        title:"模板选项",
        layout:"fit"
    });

    var tabPanel = new Ext.TabPanel({
        activeTab:0,
        region:"center",
        items:[basicInfoPanel, nodeSettingPanel, templatePanel],
        border:false
    });


    //按钮面板
    var buttonPanel = new Ext.Panel({
        region:"south",
        buttonAlign:"center",
        border:false,
        buttons:[
            {
                text:"保存信息",
                minWidth:70,
                handler:function () {
                    if (basicInfoPanel.getForm().isValid()) {
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
                        basicInfoPanel.getForm().submit({
                            url:"EditNode.aspx",
                            method:"POST",
                            success:function (form, action) {
                                var flag = action.result.success;
                                if (flag == "true") {
                                    Ext.MessageBox.alert("提示", action.result.Text, function () {
                                    });
                                }
                                else {
                                    Ext.MessageBox.alert("提示", action.result.Text);
                                }
                            }, failure:function (form, action) {
                                Ext.MessageBox.alert("提示!", "添加新节点失败!");
                            }
                        });

                    }
                }
            },
            {
                text:"取 消",
                minWidth:70,
                handler:function () {

                }
            }
        ]
    });

    var centerPanel = new Ext.Panel({
        region:"center",
        layout:"border",
        items:[tabPanel, buttonPanel]
    });

    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            layout:"border",
            items:[treePanel, centerPanel]
        });
    });

})();