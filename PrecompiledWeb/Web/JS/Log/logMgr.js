/**
 * @author: 江剑锋
 * @Date: 2013年02月20日
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
        idProperty:'LogID',
        fields:["LogID", "Account", "Title", "Message", "Time", "Remark", ],
        proxy:new Ext.data.HttpProxy({
            url:'GetLogList.aspx'
        })
    });
    var sm = new Ext.grid.CheckboxSelectionModel();
    var cm = new Ext.grid.ColumnModel([sm, {header:"ID", dataIndex:"LogID", sortable:true},
        {header:"操作帐号", dataIndex:"Account", sortable:true},
        {header:"标题", dataIndex:"Title", sortable:true},
        {header:"信息", dataIndex:"Message", sortable:true},
        {header:"时间", dataIndex:"Time", sortable:true},
        {header:"备注", dataIndex:"Remark", sortable:true},
    ]
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
            text:"删除",
            iconCls:"deleteicon",
            handler:function () {
                var rows = grid.getSelectionModel().getSelections();
                if (rows.length == 0) {
                    Ext.Msg.alert("提示", "请选中要删除的!");
                    return;
                }
                Ext.Msg.confirm("提示", "确定要删除选定的？", function (btn) {
                    if (btn == "yes") {
                        deleteData(rows);
                    }
                });
            }
        }]
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function deleteData(rows) {
        var deletesplit = "";
        for (var i = 0; i < rows.length; i++) {
            if (rows.length == 1) {
                deletesplit = rows[i].data.LogID;
            }
            else {
                if (i < (rows.length - 1)) {
                    deletesplit = rows[i].data.LogID + "," + deletesplit;
                }
                if (i == (rows.length - 1)) {
                    deletesplit = deletesplit + rows[i].data.LogID;
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
            url:'DeleteLog.aspx',
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