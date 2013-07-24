/**
 * @author: 江剑锋
 * @Date: 2013-02-10
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */
(function () {
    var pageSize = 15;

//构造store
    var store = new Ext.data.JsonStore({
        root:'data',
        totalProperty:'totalPorperty',
        idProperty:'logID',
        fields:[
            {name:"StyleID", type:"int"},
            "CategoryID",
            "StyleName",
            "StyleEnName",
            "Content",
            "Remark",
        ],
        proxy:new Ext.data.HttpProxy({
            url:'GetStyleList.aspx'
        })
    });
    var sm = new Ext.grid.CheckboxSelectionModel();
    var cm = new Ext.grid.ColumnModel([sm, {
        header:"ID",
        dataIndex:"StyleID",
        sortable:true
    }, {
        header:"风格类别",
        dataIndex:"CategoryID",
        sortable:true
    }, {
        header:"风格名称",
        dataIndex:"StyleName",
        sortable:true
    }, {
        header:"英文名称",
        dataIndex:"StyleEnName",
        sortable:true
    }, {
        header:"备注",
        dataIndex:"Remark",
        sortable:true
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
            tooltip:"添加风格",
            iconCls:"addicon",
            handler:function () {
                //添加风格
            }
        }, "", "-", "", {
            text:"编辑",
            tooltip:"编辑风格",
            iconCls:"editicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要编辑的风格!");
                    return;
                }
                if (rows.length > 1) {
                    Ext.Msg.alert("提示", "只能同时编辑一个！");
                    return;
                }
                //编辑风格
            }
        }, "", "-", "", {
            text:"删除",
            tooltip:"删除风格",
            iconCls:"deleteicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要删除的风格!");
                    return;
                }
                Ext.Msg.confirm("提示", "确定要删除选定的风格？", function (btn) {
                    if (btn == "yes") {
                    }
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