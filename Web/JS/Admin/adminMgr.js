/**
 * @author: 江剑锋
 * @Date: 2013-01-19
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
        dataIndex:"AdminID",
        //可以进行排序
        sortable:true
    },
        {
            header:"角色",
            dataIndex:"RoleID",
            //可以进行排序
            sortable:true
        },
        {
            header:"管理员名称",
            dataIndex:"AdminName",
            //可以进行排序
            sortable:true
        },
        {
            header:"注册时间",
            dataIndex:"RegTime",
            renderer:Ext.util.Format.dateRenderer('Y年m月d日'),
            //可以进行排序
            sortable:true
        },
        {
            header:"登录次数",
            dataIndex:"LoginTimes",
            //可以进行排序
            sortable:true
        },
        {
            header:"上次登录时间",
            dataIndex:"LastLoginTime",
            //可以进行排序
            sortable:true,
            renderer:Ext.util.Format.dateRenderer('Y年m月d日')
        },
        {
            header:"帐号状态",
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
        },
        {
            header:"备注",
            dataIndex:"Remark"
        }]);
    var fields = ["AdminID", "RoleID", "AdminName", "RegTime", "LoginTimes", "LastLoginTime", "Status", "Remark"];
    var store = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:"GetAdminList.aspx",
            method:"GET"
        }),
        reader:new Ext.data.JsonReader({
            fields:fields,
            root:"root",
            idProperty:"ID",
            totalPorperty:"totalPorperty"
        })
    });
    store.load({
        params:{
            start:0,
            limit:pageSize
        }
    });

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
            tooltip:"添加管理员",
            iconCls:"addicon",
            handler:function () {
                //添加管理员
                addAdmin();
            }
        },
            "", "-", "", {
                text:"编辑",
                tooltip:"编辑管理员",
                iconCls:"editicon",
                handler:function () {
                    var rows = grid.getSelectionModel().getSelections();
                    if (rows.length == 0) {
                        Ext.Msg.alert("提示", "请选中要编辑的管理员!");
                        return;
                    }
                    if (rows.length > 1) {
                        Ext.Msg.alert("提示", "只能同时编辑一个！");
                        return;
                    }
                    //编辑管理员
                    editAdmin(rows[0]);
                }
            },
            "", "-", "", {
                text:"删除",
                tooltip:"删除管理员",
                iconCls:"deleteicon",
                handler:function () {
                    var rows = grid.getSelectionModel().getSelections();
                    if (rows.length == 0) {
                        Ext.Msg.alert("提示", "请选中要删除的管理员!");
                        return;
                    }
                    Ext.Msg.confirm("提示", "确定要删除选定的管理员？",
                        function (btn) {
                            if (btn == "yes") {
                                deleteAdmin(rows);
                            }
                            // else{
                            // Ext.Msg.alert("提示", "放弃删除");
                            // }
                        });
                }
            }]
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //编辑管理员的表单
    var roleStore = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:'../RoleMgr/GetRoleList.aspx'
        }),
        reader:new Ext.data.JsonReader({
                root:'root',
                id:'RoleID'
            },
            [
                {
                    name:'RoleID',
                    mapping:'RoleID'
                },
                {
                    name:'RoleName',
                    mapping:'RoleName'
                },
                {
                    name:'Remark',
                    mapping:'Remark'
                }
            ])
    });
    roleStore.load();
    var editForm = new Ext.form.FormPanel({
        width:315,
        height:270,
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:45,
        baseCls:"x-plain",
        defaults:{
            anchor:"95%",
            msgTarget:"side"
        },
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"AdminName",
                fieldLabel:"帐号",
                allowBlank:false,
                readOnly:true,
                blankText:"帐号不允许为空"
            },
            {
                name:"Password",
                fieldLabel:"密码",
                inputType:"password"
            },
            {
                name:"Status",
                xtype:"combo",
                fieldLabel:"状态",
                editable:false,
                typeAhead:true,
                //传入后台真实值value field /value
                hiddenName:"Status",
                mode:"local",
                displayField:"show",
                valueField:"value",
                triggerAction:"all",
                value:"0",
                store:new Ext.data.SimpleStore({
                    fields:["show", "value"],
                    data:[
                        ["正常", "True"],
                        ["禁用", "False"]
                    ]
                })
            },
            {
                xtype:"combo",
                store:roleStore,
                typeAhead:true,
                fieldLabel:'角色',
                hiddenName:'RoleID',
                name:'RoleID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'选择角色类型',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择角色类型',
                displayField:'RoleName',
                valueField:'RoleID',
                mode:'remote'
            },
            {
                xtype:"textarea",
                name:"Remark",
                fieldLabel:"备注"
            }
        ]
    });

    //添加管理员的表单
    var addForm = new Ext.form.FormPanel({
        width:315,
        height:270,
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:45,
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
                name:"AdminName",
                fieldLabel:"帐号",
                allowBlank:false,
                blankText:"帐号不允许为空"
            },
            {
                name:"Password",
                id:"Password",
                fieldLabel:"密码",
                allowBlank:false,
                blankText:"密码不能为空",
                inputType:"password"
            },
            {
                name:"CmfPassword",
                id:"CmfPassword",
                fieldLabel:"确认",
                inputType:"password",
                allowBlank:false,
                blankText:"确认密码不能为空",
                invalidText:'两次密码不一致！',
                validator:function () {
                    return Ext.get('Password').dom.value == Ext.get('CmfPassword').dom.value;
                }
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
                value:"False",
                store:new Ext.data.SimpleStore({
                    fields:["show", "value"],
                    data:[
                        ["正常", "True"],
                        ["禁用", "False"]
                    ]
                })
            },
            {
                xtype:"combo",
                store:roleStore,
                typeAhead:true,
                fieldLabel:'角色',
                hiddenName:'RoleID',
                name:'RoleID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'选择角色类型',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择角色类型',
                displayField:'RoleName',
                valueField:'RoleID',
                mode:'remote'
            }
        ]
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //编辑管理员
    function editAdmin(row) {
        var win = new Ext.Window({
            title:"编辑管理员",
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
            collapsible:true,
            //允许缩放条
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
                                waitConfig:{
                                    interval:100
                                },
                                icon:'download',
                                animEl:'saving'
                            });
                            editForm.form.submit({
                                url:"EditAdmin.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("恭喜", action.result.Text,
                                            function () {
                                                store.load({
                                                    params:{
                                                        start:0,
                                                        limit:pageSize
                                                    }
                                                });
                                                win.hide();
                                            });
                                    }
                                },
                                failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", "保存失败");
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

    //添加管理员
    function addAdmin() {
        var win = new Ext.Window({
            title:"添加管理员",
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
                                waitConfig:{
                                    interval:100
                                },
                                icon:'download',
                                animEl:'saving'
                            });
                            addForm.getForm().submit({
                                url:"AddAdmin.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text,
                                            function () {
                                                store.load({
                                                    params:{
                                                        start:0,
                                                        limit:pageSize
                                                    }
                                                });
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

    //删除管理员
    function deleteAdmin(rows) {
        var deletesplit = "";
        for (var i = 0; i < rows.length; i++) {
            if (rows.length == 1) {
                deletesplit = rows[i].data.AdminID;
            } else {
                if (i < (rows.length - 1)) {
                    deletesplit = rows[i].data.AdminID + "," + deletesplit;
                }
                if (i == (rows.length - 1)) {
                    deletesplit = deletesplit + rows[i].data.AdminID;
                }
            }
        }
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
            url:"DeleteAdmin.aspx",
            method:"POST",
            params:{
                IDs:deletesplit
            },
            success:function () {
                Ext.Msg.alert("提示", "已删除",
                    function () {
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