/**
 * @author: 江剑锋
 * @Date: 2013-02-19
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */

(function () {
    Ext.ns("hope.hpcms");

    hope.hpcms.Grid = Ext.extend(Ext.grid.GridPanel, {

        url:this.url || "",

        fields:this.fields || [],

        pageSize:this.pageSize || 20,

        sm:this.sm || new Ext.grid.CheckboxSelectionModel(),

        cm:this.cm || [],


        tbar:["", "", {
            text:"添加",
            iconCls:"addicon",
            handler:this.addHandler
        }, "", "-", "", {
            text:"编辑",
            iconCls:"editicon",
            handler:this.editHandler
        }, "", "-", "", {
            text:"删除",
            iconCls:"deleteicon",
            handler:this.deleteHandler
        }],
        scope:this,
        bbar:new Ext.PagingToolbar({
            pageSize:this.pageSize,
            scope:this,
            store:this.store,
            displayInfo:true,
            //显示右下角信息
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

        initComponent:function () {

            hope.hpcms.Grid.superclass.initComponent.call(this);


            this.store = new Ext.data.JsonStore({
                root:'data',
                totalProperty:'totalPorperty',
                idProperty:'ID',
                fields:this.fields,
                proxy:new Ext.data.HttpProxy({
                    url:this.url
                })
            });
            this.getStore().load({ params:{ start:0, limit:this.pageSize} });
        }
    });
})()