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

//构造store
    var store = new Ext.data.JsonStore({
        root:'data',
        totalProperty:'totalPorperty',
        idProperty:'logID',
        fields:[
            {name:"ModelID", type:"int"},
            "ModelName",
            "TableName",
            "ItemName",
            "ItemUnit",
            "Remark"
        ],
        proxy:new Ext.data.HttpProxy({
            url:'GetModelList.aspx'
        })
    });
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
    //构造带分页功能的工具栏
    var pagingToolbar = new Ext.PagingToolbar({
        pageSize:pageSize,
        store:store,
        displayInfo:true,
        displayMsg:'第{0}-第{1}条，共{2}条',
        emptyMsg:"没有任何信息"
    });

    //构造带有分页工具栏的grid
    var grid = new Ext.grid.GridPanel({
        store:store,
        trackMouseOver:false,
        sm:sm,
        loadMask:true,
        cm:cm,
        viewConfig:{
            forceFit:true,
            enableRowBody:true,
            showPreview:true
        },
        // 在底部的分页工具栏
        bbar:pagingToolbar,
        tbar:["", "", {
            text:"添加",
            tooltip:"添加模型",
            iconCls:"addicon",
            handler:function () {
                //添加模型
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
                    }
                    // else{
                    // Ext.Msg.alert("提示", "放弃删除");
                    // }
                });
            }
        }]
    });

// 加载数据
    store.load({ params:{ start:0, limit:pageSize} });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    Ext.onReady(function () {
        var vp = new Ext.Viewport({
            layout:"fit",
            items:grid
        });

    });


})();