/**
 * @author: 江剑锋
 * @Date: 2013-02-10
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */
(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
    var pageSize = 15;
    var sm = new Ext.grid.CheckboxSelectionModel();
    var cm = new Ext.grid.ColumnModel([sm, {
        header:"ID",
        dataIndex:"ModelID",
        sortable:true
    }, {
        header:"模型名称",
        dataIndex:"ModelName",
        sortable:true
    }, {
        header:"表名",
        dataIndex:"TableName",
        sortable:true
    }, {
        header:"项目名称",
        dataIndex:"ItemName",
        sortable:true
    }, {
        header:"项目单位",
        dataIndex:"ItemUnit",
        sortable:true
    }, {
        header:"备注",
        dataIndex:"Remark"
    }]
    );
    var fields = ["ModelID", "ModelName", "TableName", "ItemName", "ItemUnit", "Remark"];
    var store = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:"GetModelList.aspx",
            method:"GET"
        }),
        reader:new Ext.data.JsonReader({
            fields:fields,
            root:"root",
            idProperty:"ID",
            totalPorperty:"totalPorperty"
        })
    });
    store.load({params:{start:0, limit:pageSize}});

    var grid = new Ext.grid.GridPanel({
        store:store,
        sm:sm,
        cm:cm,
        border:false,
        viewConfig:{
            columnsText:"显示/隐藏列",
            sortAscText:"正序排列",
            sortDescText:"倒序排列",
            forceFit:true
        },
        //分页
        bbar:new Ext.PagingToolbar({
            store:store,
            pageSize:pageSize,
            //显示右下角信息
            displayInfo:true,
            displayMsg:'当前记录 {0} -- {1} 条 共 {2} 条记录',
            emptyMsg:"No results to display",
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
            tooltip:"添加模型",
            iconCls:"addicon",
            handler:function () {
                //添加模型
                addModel();
            }
        }, "", "-", "", {
            text:"编辑",
            tooltip:"编辑模型",
            iconCls:"editicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要编辑的模型!");
                    return;
                }
                if (rows.length > 1) {
                    Ext.Msg.alert("提示", "只能同时编辑一个！");
                    return;
                }
                //编辑模型
                editModel(rows[0]);
            }
        }, "", "-", "", {
            text:"删除",
            tooltip:"删除模型",
            iconCls:"deleteicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要删除的模型!");
                    return;
                }
                Ext.Msg.confirm("提示", "确定要删除选定的模型？", function (btn) {
                    if (btn == "yes") {
                        deleteModel(rows);
                    }
                    // else{
                    // Ext.Msg.alert("提示", "放弃删除");
                    // }
                });
            }
        }]
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //编辑模型的表单
    var editForm = new Ext.form.FormPanel({
        width:350,
        height:350,
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:60,
        baseCls:"x-plain",
        defaults:{anchor:"95%", msgTarget:"side"},
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"ModelID",
                fieldLabel:"模型ID",
                allowBlank:false,
                readOnly:true,
                blankText:"模型ID不允许为空"
            },
            {
                name:"ModelName",
                fieldLabel:"模型名称",
                allowBlank:false,
                blankText:"模型名称不允许为空"
            },
            {
                name:"TableName",
                fieldLabel:"表名称",
                allowBlank:false,
                blankText:"表名称不允许为空"
            },
            {
                name:"ItemName",
                fieldLabel:"项目名称",
                allowBlank:false,
                blankText:"项目名称不允许为空"
            },
            {
                name:"ItemUnit",
                fieldLabel:"项目单位",
                allowBlank:false,
                blankText:"项目单位不允许为空"
            },
            {
                name:"Remark",
                xtype:"textarea",
                fieldLabel:"备注信息"
            }
        ]
    });


    //添加模型的表单
    var addForm = new Ext.form.FormPanel({
        width:350,
        height:350,
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
                name:"ModelName",
                fieldLabel:"模型名称",
                allowBlank:false,
                blankText:"模型名称不允许为空"
            },
            {
                name:"TableName",
                fieldLabel:"表名称",
                allowBlank:false,
                blankText:"表名称不允许为空"
            },
            {
                name:"ItemName",
                fieldLabel:"项目名称",
                allowBlank:false,
                blankText:"项目名称不允许为空"
            },
            {
                name:"ItemUnit",
                fieldLabel:"项目单位",
                allowBlank:false,
                blankText:"项目单位不允许为空"
            },
            {
                name:"Remark",
                xtype:"textarea",
                fieldLabel:"备注信息"
            }
        ]
    });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //编辑模型
    function editModel(row) {
        var win = new Ext.Window({
            title:"编辑模型",
            width:400,
            height:250,
            plain:true,
            layout:"fit",
            iconCls:"addicon",
            //不可以随意改变大小
            resizable:false,
            //是否可以拖动
            draggable:true,
            defaultType:"textfield",
            labelWidth:100,
            collapsible:true, //允许缩放条
            closeAction:'hide',
            closable:true,
            plain:true,
            //弹出模态窗体
            modal:'true',
            buttonAlign:"center",
            bodyStyle:"padding:10px 0 0 15px",
            items:editForm,
            listeners:{
                "show":function () {
                    //当window show事件发生时清空一下表单
                    editForm.getForm().loadRecord(row);
                    // console.log(row);
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
                                url:"EditModel.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("恭喜", action.result.Text, function () {
                                            store.load({params:{start:0, limit:pageSize}});
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
                        editForm.getForm().loadRecord(row);
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


    //添加模型
    function addModel() {
        var win = new Ext.Window({
            title:"添加模型",
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
                                url:"AddModel.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text, function () {
                                            store.load({params:{start:0, limit:pageSize}});
                                            win.hide();
                                        });
                                    }
                                    else {
                                        Ext.MessageBox.alert("提示", action.result.Text);
                                    }
                                }, failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", "添加新模型失败!");
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


    //删除模型
    function deleteModel(rows) {
        var deletesplit = "";
        for (var i = 0; i < rows.length; i++) {
            if (rows.length == 1) {
                deletesplit = rows[i].data.ModelID;
            }
            else {
                if (i < (rows.length - 1)) {
                    deletesplit = rows[i].data.ModelID + "," + deletesplit;
                }
                if (i == (rows.length - 1)) {
                    deletesplit = deletesplit + rows[i].data.ModelID;
                }
            }
        }
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
            url:"DeleteModel.aspx",
            method:"POST",
            params:{
                IDs:deletesplit
            },
            success:function () {
                Ext.Msg.alert("提示", "已删除", function () {
                    store.reload();
                });
            },
            failure:function () {
                Ext.Msg.alert("提示", "删除失败!");
            }
        });
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            id:"desktop",
            layout:"fit",
            items:grid
        });

    });


})();