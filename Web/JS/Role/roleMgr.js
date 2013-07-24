/**
 * @author: 江剑锋
 * @Date: 2013-02-08
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
        dataIndex:"RoleID",
        //可以进行排序
        sortable:true
    }, {
        header:"角色名称",
        dataIndex:"RoleName",
        //可以进行排序
        sortable:true
    }, {
        header:"角色状态",
        dataIndex:"Status",
        //可以进行排序
        sortable:true,
        renderer:function (value) {
            if (value) {
                return "<span style='color: green;'>正常</span>";
            } else {
                return "<span style='color: red;'>禁用</span>";
            }
        }
    }, {
        header:"备注",
        dataIndex:"Remark",
        sortable:true
    }]);
    var fields = ["RoleID", "RoleName", "Status", "Remark"];
    var store = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:"GetRoleList.aspx",
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
            tooltip:"添加角色",
            iconCls:"addicon",
            handler:function () {
                //添加角色
                addAdmin();
            }
        }, "", "-", "", {
            text:"编辑",
            tooltip:"编辑角色",
            iconCls:"editicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要编辑的角色!");
                    return;
                }
                if (rows.length > 1) {
                    Ext.Msg.alert("提示", "只能同时编辑一个！");
                    return;
                }
                //编辑角色
                editRole(rows[0]);
            }
        }, "", "-", "", {
            text:"分配权限",
            tooltip:"分配权限",
            iconCls:"editicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要编辑的角色!");
                    return;
                }
                if (rows.length > 1) {
                    Ext.Msg.alert("提示", "只能同时编辑一个！");
                    return;
                }
                //分配权限
                editRight(rows[0]);
            }
        }, "", "-", "", {
            text:"删除",
            tooltip:"删除角色",
            iconCls:"deleteicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要删除的角色!");
                    return;
                }
                Ext.Msg.confirm("提示", "确定要删除选定的角色？", function (btn) {
                    if (btn == "yes") {
                        deleteRole(rows);
                    }
                    // else{
                    // Ext.Msg.alert("提示", "放弃删除");
                    // }
                });
            }
        }]
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //编辑角色的表单
    var editForm = new Ext.form.FormPanel({
        width:315,
        height:270,
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
                name:"RoleName",
                fieldLabel:"角色",
                allowBlank:false,
                readOnly:true,
                blankText:"角色名称不允许为空"
            },
            {

                name:"Status",
                xtype:"combo",
                fieldLabel:"状态",
                //传入后台真实值value field /value
                hiddenName:"Status",
                editable:false,
                mode:"local",
                displayField:"show",
                valueField:"value",
                triggerAction:"all",
                value:true,
                store:new Ext.data.SimpleStore({
                    fields:["show", "value"],
                    data:[
                        ["正常", true],
                        ["禁用", false]
                    ]
                })
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注"
            }
        ]
    });


    //添加角色的表单
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
                name:"RoleName",
                fieldLabel:"角色",
                allowBlank:false,
                blankText:"角色名称不允许为空"
            },
            {

                name:"Status",
                xtype:"combo",
                fieldLabel:"状态",
                //传入后台真实值value field /value
                hiddenName:"Status",
                editable:false,
                mode:"local",
                displayField:"show",
                valueField:"value",
                triggerAction:"all",
                value:"True",
                store:new Ext.data.SimpleStore({
                    fields:["show", "value"],
                    data:[
                        ["正常", "True"],
                        ["禁用", "False"]
                    ]
                })
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注"
            }
        ]
    });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //编辑角色
    function editRole(row) {
        var win = new Ext.Window({
            title:"编辑角色",
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
                                url:"EditRole.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text, function () {
                                            store.load({params:{start:0, limit:pageSize}});
                                            win.hide();
                                        });
                                    } else {
                                        Ext.MessageBox.alert("提示", action.result.Text);
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


    //添加角色
    function addAdmin() {
        var win = new Ext.Window({
            title:"添加角色",
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
                                url:"AddRole.aspx",
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
                                    Ext.MessageBox.alert("提示!", "添加新角色失败!");
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


    //删除角色
    function deleteRole(rows) {
        var deletesplit = "";
        for (var i = 0; i < rows.length; i++) {
            if (rows.length == 1) {
                deletesplit = rows[i].data.RoleID;
            }
            else {
                if (i < (rows.length - 1)) {
                    deletesplit = rows[i].data.RoleID + "," + deletesplit;
                }
                if (i == (rows.length - 1)) {
                    deletesplit = deletesplit + rows[i].data.RoleID;
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
            url:"DeleteRole.aspx",
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


    //权限树

    //分配权限
    function editRight(row) {

        var rightTreePanel = new Ext.tree.TreePanel({
            autoScroll:true,
            animate:true,
            root:new Ext.tree.AsyncTreeNode({
                text:"HPCMS",
                loader:new Ext.tree.TreeLoader({
                    url:"GetRightTree.aspx",
                    baseParams:{
                        "RoleID":row.json.RoleID
                    }
                })
            }),
            rootVisible:false,
            border:false,
            animate:true,
            lines:true,
            enableDD:false,
            containerScroll:true,
            listeners:{
                "click":function (node, event) {
                    event.stopEvent();
                },
                "checkchange":function (node, checked) {
                    console.log(node);
                    //node.expand();
                    //node.attributes.checked = checked;
                    node.eachChild(function (child) {
                        console.log(child);
                        child.ui.toggleCheck(checked);
                        child.attributes.checked = checked;
                        child.fireEvent('checkchange', child, checked);
                    });
                }
            }
        });

        var win = new Ext.Window({
            title:row.json.RoleName + "权限",
            maximizable:true,
            width:300,
            height:400,
            mplain:true,
            iconCls:"addicon",
            resizable:false,
            draggable:true,
            labelWidth:100,
            collapsible:true,
            closeAction:'hide',
            closable:true,
            plain:true,
            modal:'true',
            layout:"fit",
            buttonAlign:"center",
            bodyStyle:"padding:0px 0 0 15px",
            items:rightTreePanel,
            buttons:[
                {
                    text:"添加",
                    minWidth:70,
                    handler:function () {
                        if (true) {
                            //弹出效果
                            Ext.MessageBox.show({
                                    msg:'正在编辑，请稍等...',
                                    progressText:'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig:{interval:100},
                                    icon:'download',
                                    animEl:'saving'
                                }
                            );
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
        rightTreePanel.getRootNode().expand(true, true);
        // win.maximize();
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