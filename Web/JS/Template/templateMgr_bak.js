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
            url:"GetTemplateCategoryTree.aspx"
        })
    });
    root.expand(true);
    var treePanel = new Ext.tree.TreePanel({
        region:"west",
        width:280,
        frame:true,
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
            text:"添加分类",
            tooltip:"添加分类",
            iconCls:"addicon",
            handler:function () {
                addCategory();
            }
        },
            "", "", "", {
                text:"编辑分类",
                tooltip:"编辑分类",
                iconCls:"editicon",
                handler:function () {
                    var sn = treePanel.getSelectionModel().selNode;
                    if (sn == null) {
                        Ext.Msg.alert("提示", "请选择要编辑的分类");
                        return;
                    }
                    editCategory(sn.id);
                }
            },
            "", "", "", {
                text:"删除分类",
                tooltip:"删除分类",
                iconCls:"deleteicon",
                handler:function () {
                    var sn = treePanel.getSelectionModel().selNode;
                    if (sn == null) {
                        Ext.Msg.alert("提示", "请选择要删除的分类");
                        return;
                    }
                    deleteCategory(sn);

                }
            }],
        listeners:{
            "click":function (node, event) {
                event.stopEvent();
                templateStore.load({
                    params:{
                        CategoryID:node.attributes.id
                    }
                });
            }
        }

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //添加模板分类的表单
    var categoryStore = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:'GetTemplateCategoryList.aspx'
        }),
        reader:new Ext.data.JsonReader({
                root:'root',
                id:'CategoryID'
            },
            [
                {
                    name:'TemplateCategoryID',
                    mapping:'TemplateCategoryID'
                },
                {
                    name:'ParentID',
                    mapping:'ParentID'
                },
                {
                    name:'TemplateCategoryName',
                    mapping:'TemplateCategoryName'
                },
                {
                    name:'Remark',
                    mapping:'Remark'
                }
            ])
    });
    categoryStore.load();
    var addForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:60,
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
                name:"TemplateCategoryName",
                fieldLabel:"分类名称",
                allowBlank:false,
                blankText:"分类名称不允许为空"
            },
            {
                name:"DirName",
                fieldLabel:"目录名称",
                allowBlank:false,
                blankText:"目录名称不允许为空"
            },
            {
                xtype:"combo",
                store:categoryStore,
                typeAhead:true,
                fieldLabel:'所属分类',
                hiddenName:'ParentID',
                name:'ParentID',
                forceSelection:false,
                triggerAction:'all',
                emptyText:'不属于任何分类',
                selectOnFocus:true,
                width:130,
                editable:false,
                displayField:'TemplateCategoryName',
                valueField:'TemplateCategoryID',
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
    //编辑模板分类的表单
    var editForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:60,
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
                name:"TemplateCategoryID",
                fieldLabel:"分类ID",
                allowBlank:false,
                readOnly:true,
                blankText:"分类ID不允许为空"
            },
            {
                name:"DirName",
                fieldLabel:"目录名称",
                allowBlank:false,
                readOnly:true,
                blankText:"目录名称不允许为空"
            },
            {
                name:"TemplateCategoryName",
                fieldLabel:"分类名称",
                allowBlank:false,
                blankText:"分类名称不允许为空"
            },
            {
                xtype:"combo",
                store:categoryStore,
                typeAhead:true,
                fieldLabel:'所属分类',
                hiddenName:'ParentID',
                name:'ParentID',
                forceSelection:false,
                triggerAction:'all',
                emptyText:'不属于任何分类',
                selectOnFocus:true,
                width:130,
                editable:false,
                valueNotFoundText:"不属于任何分类",
                displayField:'TemplateCategoryName',
                valueField:'TemplateCategoryID',
                mode:'remote'
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注信息"
            }
        ]
    });

    //添加模板分类
    function addCategory() {

        var win = new Ext.Window({
            title:"添加分类",
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
            buttons:[
                {
                    text:"添加",
                    minWidth:70,
                    handler:function () {
                        if (addForm.getForm().isValid()) {
                            addForm.getForm().submit({
                                url:"AddTemplateCategory.aspx",
                                waitMsg:'正在添加，请稍等...',
                                method:"POST",
                                success:function (form, action) {
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
                                failure:function (form, action) {
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

    //编辑模板分类
    function editCategory(categoryId) {
        var win = new Ext.Window({
            title:"编辑模板分类",
            width:400,
            height:250,
            plain:true,
            layout:"fit",
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
            items:editForm,
            listeners:{
                "show":function () {
                    editForm.getForm().load({
                        url:"GetTemplateCategoryInfo.aspx",
                        params:{
                            TemplateCategoryID:categoryId
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
                            editForm.form.submit({
                                url:"EditTemplateCategory.aspx",
                                waitMsg:'正在保存，请稍等...',
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text,
                                            function () {
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
                            url:"GetTemplateCategoryInfo.aspx",
                            params:{
                                TemplateCategoryID:categoryId
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    //删除分类
    function deleteCategory(sn) {
        Ext.Msg.confirm("提示", "确定要删除选定的" + sn.text + "分类？",
            function (btn) {
                if (btn == "yes") {
                    //弹出效果
                    Ext.MessageBox.show({
                        msg:'正在删除，请稍等...',
                        progressText:'Saving...',
                        width:300,
                        wait:true,
                        waitConfig:{
                            interval:100
                        },
                        icon:'download',
                        animEl:'saving'
                    });
                    Ext.Ajax.request({
                        url:"DeleteTemplateCategory.aspx",
                        method:"POST",
                        params:{
                            TemplateCategoryID:sn.id
                        },
                        success:function () {
                            Ext.Msg.alert("提示", "已删除",
                                function () {
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
    //模板分类信息面板
    var pageSize = 15;
    var sm = new Ext.grid.CheckboxSelectionModel();
    var cm = new Ext.grid.ColumnModel([sm, {
        header:"ID",
        dataIndex:"TemplateID",
        sortable:true
    },
        {
            header:"模板名称",
            dataIndex:"TemplateName",
            sortable:true
        },
        {
            header:"文件名称",
            dataIndex:"FileName",
            sortable:true
        },
        {
            header:"是否已生成",
            dataIndex:"IsGenerate",
            sortable:true,
            renderer:function (value) {
                if (value) {
                    return "<span style='color: green;'>已生成</span>";
                } else {
                    return "<span style='color: red;'>未生成</span>";
                }
            }
        },
        {
            header:"备注",
            dataIndex:"Remark"
        }]);
    var fields = ["TemplateID", "CategoryID", "TemplateName", "FileName", "IsGenerate", "Remark"];
    var templateStore = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:"GetTemplateList.aspx",
            method:"POST"
        }),
        reader:new Ext.data.JsonReader({
            fields:fields,
            root:"root",
            idProperty:"ID",
            totalPorperty:"totalPorperty"
        })
    });
    templateStore.load({
        params:{
            start:0,
            limit:pageSize
        }
    });

    var centerPanel = new Ext.grid.GridPanel({
        region:"center",
        store:templateStore,
        sm:sm,
        cm:cm,
        border:false,
        viewConfig:{
            columnsText:"显示/隐藏列",
            sortAscText:"正序排列",
            sortDescText:"倒序排列",
            forceFit:true
        },
        bbar:new Ext.PagingToolbar({
            store:templateStore,
            pageSize:pageSize,
            displayInfo:true,
            displayMsg:'当前记录 {0} -- {1} 条 共 {2} 条记录',
            emptyMsg:"没有任何信息",
            prevText:"上一页",
            nextText:"下一页",
            refreshText:"刷新",
            lastText:"最后页",
            firstText:"第一页",
            beforePageText:"当前页",
            afterPageText:"共{0}页"

        }),
        tbar:["", "", {
            text:"添加",
            tooltip:"添加模板",
            iconCls:"addicon",
            handler:function () {
                addTemplate();
            }
        },
            "", "-", "", {
                text:"编辑",
                tooltip:"编辑模板",
                iconCls:"editicon",
                handler:function () {
                    var rows = centerPanel.getSelectionModel().getSelections();
                    if (rows.length == 0) {
                        Ext.Msg.alert("提示", "请选中要编辑的模板!");
                        return;
                    }
                    if (rows.length > 1) {
                        Ext.Msg.alert("提示", "只能同时编辑一个！");
                        return;
                    }
                    //编辑模板
                    editTemplate(rows[0]);
                }
            },
            "", "-", "", {
                text:"删除",
                tooltip:"删除模板",
                iconCls:"deleteicon",
                handler:function () {
                    var rows = centerPanel.getSelectionModel().getSelections();
                    if (rows.length == 0) {
                        Ext.Msg.alert("提示", "请选中要删除的模板!");
                        return;
                    }
                    Ext.Msg.confirm("提示", "确定要删除选定的模板？",
                        function (btn) {
                            if (btn == "yes") {

                            }
                        });
                }
            }]
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //添加模板分类的表单
    var categoryStore2 = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:'GetTemplateCategoryList2.aspx'
        }),
        reader:new Ext.data.JsonReader({
                root:'root',
                id:'CategoryID'
            },
            [
                {
                    name:'TemplateCategoryID',
                    mapping:'TemplateCategoryID'
                },
                {
                    name:'ParentID',
                    mapping:'ParentID'
                },
                {
                    name:'TemplateCategoryName',
                    mapping:'TemplateCategoryName'
                },
                {
                    name:'Remark',
                    mapping:'Remark'
                }
            ])
    });
    categoryStore2.load();
    //添加模板的表单
    var addTemplateForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
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
                name:"TemplateName",
                fieldLabel:"模板名称",
                allowBlank:false,
                blankText:"模板名称不允许为空"
            },
            {
                name:"FileName",
                fieldLabel:"文件名称",
                allowBlank:false,
                blankText:"文件名称不能为空"
            },
            {
                xtype:"combo",
                store:categoryStore2,
                typeAhead:true,
                fieldLabel:'分类',
                hiddenName:'CategoryID',
                name:'CategoryID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'请选择分类',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择分类',
                displayField:'TemplateCategoryName',
                valueField:'TemplateCategoryID',
                mode:'remote'
            },
            {
                xtype:'textarea',
                fieldLabel:'模板内容',
                height:400,
                name:'TemplateContent'
            },
            {
                xtype:'textarea',
                fieldLabel:'备注信息',
                name:'Remark'
            }
        ]
    });

    //添加模板
    function addTemplate() {
        var win = new Ext.Window({
            title:"添加模板",
            plain:true,
            iconCls:"addicon",
            resizable:false,
            draggable:true,
            defaultType:"textfield",
            labelWidth:100,
            maximized:true,
            closeAction:'hide',
            closable:true,
            plain:true,
            modal:'true',
            buttonAlign:"center",
            bodyStyle:"padding:10px 0 0 15px",
            items:addTemplateForm,
            listeners:{
                "show":function () {
                    addTemplateForm.getForm().reset();
                }
            },
            buttons:[
                {
                    text:"添加",
                    minWidth:70,
                    handler:function () {
                        if (addTemplateForm.getForm().isValid()) {
                            addTemplateForm.getForm().submit({
                                url:"AddTemplate.aspx",
                                waitMsg:'正在添加，请稍等...',
                                method:"POST",
                                success:function (form, action) {
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
                                failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", "添加新模板失败!");
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //编辑模板的表单
    var editTemplateForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
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
                name:"TemplateID",
                fieldLabel:"模板ID",
                allowBlank:false,
                readOnly:true,
                blankText:"模板名称不允许为空"
            },
            {
                name:"TemplateName",
                fieldLabel:"模板名称",
                allowBlank:false,
                blankText:"模板名称不允许为空"
            },
            {
                name:"FileName",
                fieldLabel:"文件名称",
                allowBlank:false,
                blankText:"文件名称不能为空"
            },
            {
                name:"IsGenerate",
                xtype:"combo",
                fieldLabel:"是否生成文件",
                editable:false,
                readOnly:true,
                typeAhead:true,
                //传入后台真实值value field /value
                hiddenName:"IsGenerate",
                mode:"local",
                displayField:"show",
                valueField:"value",
                triggerAction:"all",
                value:false,
                store:new Ext.data.SimpleStore({
                    fields:["show", "value"],
                    data:[
                        ["生成", true],
                        ["未生成", false]
                    ]
                })
            },
            {
                xtype:"combo",
                store:categoryStore2,
                typeAhead:true,
                fieldLabel:'分类',
                hiddenName:'CategoryID',
                name:'CategoryID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'请选择分类',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择分类',
                displayField:'TemplateCategoryName',
                valueField:'TemplateCategoryID',
                mode:'remote'
            },
            {
                xtype:'textarea',
                fieldLabel:'模板内容',
                height:400,
                name:'TemplateContent'
            },
            {
                xtype:'textarea',
                fieldLabel:'备注信息',
                name:'Remark'
            }
        ]
    });

    //编辑模板
    function editTemplate(row) {
        console.log(row);
        var win = new Ext.Window({
            title:"编辑模板",
            plain:true,
            iconCls:"addicon",
            resizable:false,
            draggable:true,
            defaultType:"textfield",
            labelWidth:100,
            autoScroll:true,
            maximized:true,
            closeAction:'hide',
            closable:true,
            plain:true,
            modal:'true',
            buttonAlign:"center",
            bodyStyle:"padding:10px 0 0 15px",
            items:editTemplateForm,
            listeners:{
                "show":function () {
                    editTemplateForm.getForm().load({
                        url:"GetTemplateInfo.aspx",
                        params:{
                            TemplateID:row.json.TemplateID
                        }
                    });
                }
            },
            buttons:[
                {
                    text:"编辑",
                    minWidth:70,
                    handler:function () {
                        if (editTemplateForm.getForm().isValid()) {
                            editTemplateForm.getForm().submit({
                                url:"EditTemplate.aspx",
                                waitMsg:'正在编辑，请稍等...',
                                method:"POST",
                                success:function (form, action) {
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
                                failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", "编辑模板失败!");
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            layout:"border",
            items:[treePanel, centerPanel]
        });
    });

})();