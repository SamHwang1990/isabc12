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
        proxy: new Ext.data.HttpProxy({
            url: 'GetNodeList.aspx'
        }),
        reader: new Ext.data.JsonReader({
                root: 'root',
                id: 'NodeID'
            },
            [
                {
                    name: 'NodeID',
                    mapping: 'NodeID'
                },
                {
                    name: 'ParentID',
                    mapping: 'ParentID'
                },
                {
                    name: 'NodeName',
                    mapping: 'NodeName'
                },
                {
                    name: 'Remark',
                    mapping: 'Remark'
                }
            ])
    });
    nodeStore.load();
    var addForm = new Ext.form.FormPanel({
        width: 315,
        height: 270,
        plain: true,
        layout: "form",
        defaultType: "textfield",
        labelWidth: 60,
        labelAlign: "right",
        baseCls: "x-plain",
        defaults: {
            anchor: "95%",
            msgTarget: "side"
        },
        buttonAlign: "center",
        bodyStyle: "padding:0 0 0 0",
        items: [
            {
                name: "NodeName",
                fieldLabel: "节点名称",
                allowBlank: false,
                blankText: "节点名称不允许为空"
            },
            new OECP.ui.ComboBoxTree({
                treeUrl: "GetNodeTree.aspx",
                fieldLabel: '所属节点',
                editable: false,
                hiddenName: 'ParentNodeName',
                name: 'ParentNodeName',
                valueField: "NodeID",
                displayField: "NodeName"
            }),
            {
                xtype: "textarea",
                name: "Remark",
                fieldLabel: "备注"
            }
        ]
    });

    //添加节点
    function addNode() {
        nodeStore.load();
        var win = new Ext.Window({
            title: "添加节点",
            width: 400,
            height: 250,
            plain: true,
            iconCls: "addicon",
            resizable: false,
            draggable: true,
            defaultType: "textfield",
            labelWidth: 100,
            collapsible: true,
            closeAction: 'hide',
            closable: true,
            plain: true,
            modal: 'true',
            buttonAlign: "center",
            bodyStyle: "padding:10px 0 0 15px",
            items: addForm,
            listeners: {
                "show": function () {
                    addForm.getForm().reset();
                }
            },
            buttons: [
                {
                    text: "添加",
                    minWidth: 70,
                    handler: function () {
                        if (addForm.getForm().isValid()) {
                            addForm.getForm().submit({
                                url: "AddNode.aspx",
                                waitMsg: '正在添加，请稍等...',
                                method: "POST",
                                success: function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text,
                                            function () {
                                                win.hide();
                                            });
                                    } else {
                                        Ext.MessageBox.alert("提示", action.result.Text);
                                    }
                                },
                                failure: function (form, action) {
                                    Ext.MessageBox.alert("提示!", "添加新节点失败!");
                                }
                            });
                        }
                    }
                },
                {
                    text: "取 消",
                    minWidth: 70,
                    handler: function () {
                        win.hide();
                    }
                }
            ]
        });
        win.show();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var root = new Ext.tree.AsyncTreeNode({
        text: "HPCMS",
        loader: new Ext.tree.TreeLoader({
            url: "GetNodeTree.aspx"
        })
    });
    root.expand(true, true);
    var treePanel = new Ext.tree.TreePanel({
        frame: true,
        region: "west",
        width: 200,
        split: true,
        autoScroll: true,
        animate: true,
        root: root,
        rootVisible: false,
        border: false,
        animate: true,
        lines: true,
        enableDD: false,
        containerScroll: true,
        tbar: ["", "", {
            text: "添加",
            tooltip: "添加节点",
            iconCls: "addicon",
            handler: function () {
                addNode();
            }
        },
            "", "", {
                text: "刷新",
                tooltip: "刷新节点",
                iconCls: "refreshicon",
                handler: function () {
                }
            },
            "", "-", "", {
                text: "删除",
                tooltip: "删除节点",
                iconCls: "deleteicon",
                handler: function () {
                    var sn = treePanel.getSelectionModel().selNode;
                    if (sn == null) {
                        Ext.Msg.alert("提示", "请选择要删除的节点");
                        return;
                    }
                    Ext.Msg.confirm("提示", "确定要删除选定的" + sn.text + "节点？",
                        function (btn) {
                            if (btn == "yes") {
                                Ext.Ajax.request({
                                    url: "DeleteNode.aspx",
                                    waitMsg: '正在删除，请稍等...',
                                    method: "POST",
                                    params: {
                                        NodeID: sn.id
                                    },
                                    success: function () {
                                        Ext.Msg.alert("提示", "已删除",
                                            function () {
                                            });
                                    },
                                    failure: function () {
                                        Ext.Msg.alert("提示", "删除失败!");
                                    }
                                });
                            }
                        });
                }
            }],
        listeners: {
            "click": function (node, event) {
                event.stopEvent();
                basicInfoPanel.getForm().load({
                    url: "GetNodeInfo.aspx",
                    params: {
                        NodeID: node.attributes.id
                    }
                });
                //节点选项
                nodeSettingPanel.getForm().load({
                    url: "GetNodeInfo.aspx",
                    method: "POST",
                    params: {
                        NodeID: node.attributes.id
                    }
                });
                //模板选项
                templatePanel.getForm().load({
                    url: "GetNodeInfo.aspx",
                    method: "POST",
                    params: {
                        NodeID: node.attributes.id
                    }
                });
            }
        }

    });

    //基本信息面板
    var basicInfoPanel = new Ext.form.FormPanel({
        title: "基本信息",
        layout: "form",
        frame: true,
        defaultType: "textfield",
        labelWidth: 200,
        defaults: {
            anchor: "95%",
            msgTarget: "side"
        },
        items: [
            {
                name: "NodeID",
                fieldLabel: "节点ID",
                readOnly: true,
                allowBlank: false,
                blankText: "节点ID不允许为空"
            },
            new OECP.ui.ComboBoxTree({
                treeUrl: "GetNodeTree.aspx",
                fieldLabel: '所属节点',
                editable: false,
                hiddenName: 'ParentNodeName',
                name: 'ParentNodeName',
                emptyText: "不修改",
                valueField: "NodeID",
                displayField: "NodeName"
            }),
            {
                name: "NodeName",
                fieldLabel: "节点名称",
                allowBlank: false,
                blankText: "节点名称不允许为空"
            },
            {
                name: "NodeEnName",
                fieldLabel: "节点英文名称"
            },
            {
                name: "DirName",
                fieldLabel: "节点目录名称"
            },
            {
                xtype: "textarea",
                name: "Meta",
                fieldLabel: "Meta信息"
            },
            {
                xtype: "textarea",
                name: "Remark",
                fieldLabel: "备注信息"
            }
        ],
        buttonAlign: "center",
        buttons: [
            {
                text: "保存信息",
                minWidth: 70,
                handler: function () {
                    if (basicInfoPanel.getForm().isValid()) {
                        basicInfoPanel.getForm().submit({
                            url: "EditBasic.aspx",
                            waitMsg: "正在保存，请稍等...",
                            method: "POST",
                            success: function (form, action) {
                                var flag = action.result.success;
                                if (flag == "true") {
                                    Ext.MessageBox.alert("提示", action.result.Text,
                                        function () {
                                        });
                                } else {
                                    Ext.MessageBox.alert("提示", action.result.Text);
                                }
                            },
                            failure: function (form, action) {
                                Ext.MessageBox.alert("提示!", "保存基本信息失败!");
                            }
                        });

                    }
                }
            },
            {
                text: "取 消",
                minWidth: 70,
                handler: function () {

                }
            }
        ]
    });

    //栏目选项面板
    var nodeSettingPanel = new Ext.form.FormPanel({
        title: "节点选项",
        frame: true,
        defaultType: "textfield",
        labelWidth: 200,
        defaults: {
            anchor: "95%",
            msgTarget: "side"
        },
        items: [
            {
                name: "NodeID",
                fieldLabel: "节点ID",
                hidden: true,
                readOnly: true,
                allowBlank: false,
                blankText: "节点ID不允许为空"
            },
            {
                name: "OpenType",
                xtype: "combo",
                fieldLabel: "打开方式",
                editable: false,
                typeAhead: true,
                //传入后台真实值value field /value
                hiddenName: "OpenType",
                mode: "local",
                displayField: "show",
                valueField: "value",
                triggerAction: "all",
                value: false,
                store: new Ext.data.SimpleStore({
                    fields: ["show", "value"],
                    data: [
                        ["原窗口打开", true],
                        ["新窗口打开", false]
                    ]
                })
            },
            {
                name: "PageSize",
                fieldLabel: "每页显示数量",
                xtype: "numberfield",
                allowBlank: false,
                blankText: "每页显示数量不允许为空"
            }
        ],
        buttonAlign: "center",
        buttons: [
            {
                text: "保存信息",
                minWidth: 70,
                handler: function () {
                    if (nodeSettingPanel.getForm().isValid()) {
                        //弹出效果
                        Ext.MessageBox.show({
                            msg: '正在保存，请稍等...',
                            progressText: 'Saving...',
                            width: 300,
                            wait: true,
                            waitConfig: {
                                interval: 100
                            },
                            icon: 'download',
                            animEl: 'saving'
                        });
                        nodeSettingPanel.getForm().submit({
                            url: "EditSetting.aspx",
                            method: "POST",
                            success: function (form, action) {
                                var flag = action.result.success;
                                if (flag == "true") {
                                    Ext.MessageBox.alert("提示", action.result.Text,
                                        function () {
                                        });
                                } else {
                                    Ext.MessageBox.alert("提示", action.result.Text);
                                }
                            },
                            failure: function (form, action) {
                                Ext.MessageBox.alert("提示!", "保存节点选项失败!");
                            }
                        });

                    }
                }
            },
            {
                text: "取 消",
                minWidth: 70,
                handler: function () {

                }
            }
        ]
    });

    //模板选项面板
    var modelStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '../ModelMgr/GetModelList.aspx'
        }),
        reader: new Ext.data.JsonReader({
                root: 'root',
                id: 'ModelID'
            },
            [
                {
                    name: 'ModelID',
                    mapping: 'ModelID'
                },
                {
                    name: 'ModelName',
                    mapping: 'ModelName'
                },
                {
                    name: 'TableName',
                    mapping: 'TableName'
                },
                {
                    name: 'ItemName',
                    mapping: 'ItemName'
                },
                {
                    name: 'ItemUnit',
                    mapping: 'ItemUnit'
                },
                {
                    name: 'Remark',
                    mapping: 'Remark'
                }
            ])
    });
    modelStore.load();
    var templateStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: "../TemplateMgr/GetTemplateList.aspx"
        }),
        reader: new Ext.data.JsonReader({
                root: 'root',
                id: 'TemplateID'
            },
            [
                {
                    name: 'TemplateID',
                    mapping: 'TemplateID'
                },
                {
                    name: 'CategoryID',
                    mapping: 'CategoryID'
                },
                {
                    name: 'TemplateName',
                    mapping: 'TemplateName'
                },
                {
                    name: 'TemplateContent',
                    mapping: 'TemplateContent'
                },
                {
                    name: 'FileName',
                    mapping: 'FileName'
                },
                {
                    name: 'IsGenerate',
                    mapping: 'IsGenerate'
                },
                {
                    name: 'Remark',
                    mapping: 'Remark'
                }
            ])
    });
    templateStore.load();
    var templatePanel = new Ext.form.FormPanel({
        title: "模板选项",
        frame: true,
        layout: 'form',
        items: [
            {
                layout: 'column',
                items: [
                    {
                        layout: "form",
                        columnWidth: .55,
                        items: {
                            xtype: 'textfield',
                            fieldLabel: '内容模型 ',
                            name: 'ModuleName',
                            anchor: '100%'
                        }
                    },
                    {
                        xtype: 'button',
                        columnWidth: .05,
                        text: "浏览",
                        anchor: '95%'
                    }
                ]
            },
            {
                layout: 'column',
                items: [
                    {
                        layout: "form",
                        columnWidth: .55,
                        items: {
                            xtype: 'textfield',
                            fieldLabel: '首页模板 ',
                            name: 'last',
                            anchor: '100%'
                        }
                    },
                    {
                        xtype: 'button',
                        columnWidth: .05,
                        text: "浏览",
                        anchor: '95%'
                    }
                ]
            },
            {
                layout: 'column',
                items: [
                    {
                        layout: "form",
                        columnWidth: .55,
                        items: {
                            xtype: 'textfield',
                            fieldLabel: '栏目页模板',
                            name: 'last',
                            anchor: '100%'
                        }
                    },
                    {
                        xtype: 'button',
                        columnWidth: .05,
                        text: "浏览",
                        anchor: '95%'
                    }
                ]
            },
            {
                layout: 'column',
                items: [
                    {
                        layout: "form",
                        columnWidth: .55,
                        items: {
                            xtype: 'textfield',
                            fieldLabel: '内容页模板',
                            name: 'last',
                            anchor: '100%'
                        }
                    },
                    {
                        xtype: 'button',
                        columnWidth: .05,
                        text: "浏览",
                        anchor: '95%'
                    }
                ]
            },
            {
                layout: 'column',
                items: [
                    {
                        layout: "form",
                        columnWidth: .55,
                        items: {
                            xtype: 'textfield',
                            fieldLabel: '搜索页模板',
                            name: 'last',
                            anchor: '100%'
                        }
                    },
                    {
                        xtype: 'button',
                        columnWidth: .05,
                        text: "浏览",
                        anchor: '95%'
                    }
                ]
            }
        ],
        buttonAlign: "center",
        buttons: [
            {
                text: "保存信息",
                minWidth: 70,
                handler: function () {
                    if (templatePanel.getForm().isValid()) {
                        templatePanel.getForm().submit({
                            url: "EditTemplateSetting.aspx",
                            waitMsg: '正在保存，请稍等...',
                            method: "POST",
                            success: function (form, action) {
                                Ext.MessageBox.alert("提示", action.result.Text);
                            },
                            failure: function (form, action) {
                                Ext.MessageBox.alert("提示!", "保存模板选项失败!");
                            }
                        });

                    }
                }
            },
            {
                text: "取 消",
                minWidth: 70,
                handler: function () {

                }
            }
        ]
    });

    //Tab面板
    var tabPanel = new Ext.TabPanel({
        activeTab: 0,
        region: "center",
        items: [basicInfoPanel, nodeSettingPanel, templatePanel],
        border: false
    });

    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            layout: "border",
            items: [treePanel, tabPanel]
        });
    });

})();