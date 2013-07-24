/**
 * @author: 江剑锋
 * @Date: 2013-02-12
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */

(function () {

    var root = new Ext.tree.AsyncTreeNode({
        text:"HPCMS",
        loader:new Ext.tree.TreeLoader({
            url:"../NodeMgr/GetNodeTree.aspx"
        })
    });
    root.expand(true, true);
    var treePanel = new Ext.tree.TreePanel({
        frame:true,
        title:"节点",
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
        listeners:{
            "click":function (node, event) {
                event.stopEvent();

                articleStore.load({
                    params:{
                        NodeID:node.attributes.id
                    }
                });
            }
        }

    });

///////////////////////////////////////////////////////////////////////////////////////////////////

    //文章列表信息面板
    var pageSize = 15;
    var sm = new Ext.grid.CheckboxSelectionModel();
    var cm = new Ext.grid.ColumnModel([sm, {
        header:"ID",
        dataIndex:"GeneralID",
        sortable:true
    }, {
        header:"文章标题",
        dataIndex:"Title",
        sortable:true
    }, {
        header:"录入者",
        dataIndex:"Inputor",
        sortable:true
    }, {
        header:"是否已生成",
        dataIndex:"IsGenerate",
        sortable:true,
        renderer:function (value) {
            if (value == "True") {
                return "<span style='color: green;'>已生成</span>";
            } else {
                return "<span style='color: red;'>未生成</span>";
            }
        }
    }, {
        header:"备注",
        dataIndex:"Remark"
    }
    ]);
    var fields = ["GeneralID", "Title", "Inputor", "Hits", "IsGenerate", "Remark"];
    var articleStore = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:"GetArticleList.aspx",
            method:"POST"
        }),
        reader:new Ext.data.JsonReader({
            fields:fields,
            root:"root",
            idProperty:"ID",
            totalPorperty:"totalPorperty"
        })
    });
    articleStore.load();


    var centerPanel = new Ext.grid.GridPanel({
        region:"center",
        store:articleStore,
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
            store:articleStore,
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
            tooltip:"添加文章",
            iconCls:"addicon",
            handler:function () {
                //添加文章
                addArticle();
            }
        }, "", "-", "", {
            text:"编辑",
            tooltip:"编辑文章",
            iconCls:"editicon",
            handler:function () {
                var rows = centerPanel.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要编辑的文章!");
                    return;
                }
                if (rows.length > 1) {
                    Ext.Msg.alert("提示", "只能同时编辑一个！");
                    return;
                }
                //编辑文章
                editTemplate(rows[0]);
            }
        }, "", "-", "", {
            text:"删除",
            tooltip:"删除文章",
            iconCls:"deleteicon",
            handler:function () {
                var rows = centerPanel.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要删除的文章!");
                    return;
                }
                Ext.Msg.confirm("提示", "确定要删除选定的文章？", function (btn) {
                    if (btn == "yes") {
                        // deleteAdmin(rows);
                    }
                });
            }
        }]
    });


////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var nodeStore = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:'../NodeMgr/GetNodeList.aspx'
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

    var addArticleForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:100,
        labelAlign:"right",
        baseCls:"x-plain",
        defaults:{anchor:"95%", msgTarget:"side"},
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
                xtype:"combo",
                store:nodeStore,
                typeAhead:true,
                fieldLabel:'所属节点',
                hiddenName:'NodeID',
                name:'NodeID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'请选择节点',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择节点',
                displayField:'NodeName',
                valueField:'NodeID',
                mode:'remote'
            },
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
        ]
    });

    //添加文章
    function addArticle() {
        window.location.href = "AddArticlePage.aspx";
        /*var win = new Ext.Window({
         title:"添加文章",
         plain:true,
         iconCls:"addicon",
         resizable:false,
         draggable:true,
         defaultType:"textfield",
         labelWidth:100,
         maximized: true,
         closeAction : 'hide',
         closable:true,
         plain : true,
         modal: 'true',
         buttonAlign:"center",
         bodyStyle:"padding:10px 0 0 15px",
         items:addArticleForm,
         listeners:{
         "show":function(){
         addArticleForm.getForm().reset();
         }
         },
         buttons:[{
         text:"添加",
         minWidth:70,
         handler:function(){
         if(addArticleForm.getForm().isValid()){
         //弹出效果
         Ext.MessageBox.show({
         msg: '正在添加，请稍等...',
         progressText: 'Saving...',
         width:300,
         wait:true,
         waitConfig: {interval:100},
         icon:'download',
         animEl: 'saving'
         }
         );
         addArticleForm.getForm().submit({
         url:"AddArticle.aspx",
         method:"POST",
         success:function(form,action){
         var flag=action.result.success;
         if(flag=="true"){
         Ext.MessageBox.alert("提示",action.result.Text, function(){
         win.hide();
         });
         }
         else{
         Ext.MessageBox.alert("提示",action.result.Text);
         }
         },failure:function(form,action){
         Ext.MessageBox.alert("提示!","添加新文章失败!");
         }
         });
         }
         }
         },{
         text:"取 消",
         minWidth:70,
         handler:function(){
         win.hide();
         }
         }]
         });
         win.show();
         //实例化富文本编辑器
         var editor = new UE.ui.Editor();
         editor.render("Content");*/
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //编辑文章的表单


    var editArticleForm = new Ext.form.FormPanel({
        plain:true,
        layout:"form",
        defaultType:"textfield",
        labelWidth:100,
        labelAlign:"right",
        baseCls:"x-plain",
        defaults:{anchor:"95%", msgTarget:"side"},
        buttonAlign:"center",
        bodyStyle:"padding:0 0 0 0",
        items:[
            {
                name:"GeneralID",
                fieldLabel:"文章ID",
                allowBlank:false,
                readOnly:true,
                blankText:"文章ID不允许为空"
            },
            {
                name:"Title",
                fieldLabel:"文章标题",
                allowBlank:false,
                blankText:"文章标题不允许为空"
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
                value:"0",
                store:new Ext.data.SimpleStore({
                    fields:["show", "value"],
                    data:[
                        ["生成", "True"],
                        ["未生成", "False"]
                    ]
                })
            },
            {
                xtype:"combo",
                store:nodeStore,
                typeAhead:true,
                fieldLabel:'节点',
                hiddenName:'NodeID',
                name:'NodeID',
                forceSelection:true,
                triggerAction:'all',
                emptyText:'请选择节点',
                selectOnFocus:true,
                width:130,
                editable:false,
                allowBlank:false,
                blankText:'请选择节点',
                displayField:'NodeName',
                valueField:'NodeID',
                mode:'remote'
            },
            {
                xtype:'textarea',
                fieldLabel:'备注信息',
                name:'Remark'
            }
        ]
    });

    //编辑文章
    function editArticle(row) {
        console.log(row);
        var win = new Ext.Window({
            title:"编辑文章",
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
                    editArticleForm.getForm().load({
                        url:"GetArticleInfo.aspx",
                        params:{
                            GeneralID:row.json.GeneralID
                        }
                    });
                }
            },
            buttons:[
                {
                    text:"编辑",
                    minWidth:70,
                    handler:function () {
                        if (editArticleForm.getForm().isValid()) {
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
                            editArticleForm.getForm().submit({
                                url:"EditArticle.aspx",
                                method:"POST",
                                success:function (form, action) {
                                    var flag = action.result.success;
                                    if (flag == "true") {
                                        Ext.MessageBox.alert("提示", action.result.Text, function () {
                                            win.hide();
                                        });
                                    }
                                    else {
                                        Ext.MessageBox.alert("提示", action.result.Text);
                                    }
                                }, failure:function (form, action) {
                                    Ext.MessageBox.alert("提示!", "编辑文章失败!");
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