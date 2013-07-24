/**
 * @author: 江剑锋
 * @Date: 2013-01-19
 * @Description:
 * (c) Copyright 2013 HopeStudio.
 * All Rights Reserved.
 */


(function () {
    Ext.ns("hope.hpcms");
    /**
     *
     */
    var northPanel = new Ext.Panel({
        region:"north",
        height:80
    });

    /**
     *
     */
    var westPanel = new Ext.Panel({
        region:"west",
        width:150,
        id:"westPanel",
        collapsible:true,
        title:"菜单",
        layout:'accordion',
        split:true,
        layoutConfig:{
            animate:true
        }
    });

    /**
     * 主面板
     */
    var centerPanel = new Ext.TabPanel({
        activeTab:0,
        region:"center",
        id:"TabPanelID",
        items:[
            {
                xtype:"panel",
                layout:'fit',
                title:"首页",
                border:false,
                frame:false,
                iconCls:'panel_icon',
                html:"<iframe scrolling='no' width='100%' height='100%'  frameborder='0' src=''></iframe>"
            }
        ],
        plugins: new Ext.ux.TabCloseMenu()
    });

    /**
     *
     */
    var copyrightPanel = new Ext.Panel({
        region:"south",
        height:20
    });

    /**
     *
     */
    var loadPanelWest = function () {
        Ext.Ajax.request({
            url:'Common/GetMenu.aspx',
            success:function (response, options) {
                try {

                    var data = Ext.util.JSON.decode(response.responseText);

                    for (var i = 0; i < data.length; i++) {
                        var mp = new Ext.Panel({
                            title:data[i].text,
                            layout:'fit',
                            border:false,
                            frame:true,
                            items:[
                                {
                                    xtype:'treepanel',
                                    singleExpand:true,
                                    animate:true,
                                    autoScroll:true,
                                    containerScroll:true,
                                    enableDD:false,
                                    dropConfig:{
                                        appendOnly:true
                                    },
                                    rootVisible:false,
                                    root:new Ext.tree.AsyncTreeNode({
                                        id:data[i].id,
                                        text:data[i].text,
                                        draggable:false,
                                        expanded:true,
                                        children:data[i].children
                                    }),
                                    listeners:{
                                        "click":function (node, e) {
                                            e.stopEvent();
                                            var id = node.attributes.id;
                                            var text = node.attributes.text;
                                            var href = node.attributes.href;
                                            var tab = centerPanel.getComponent(id);
                                            if (tab) {
                                                centerPanel.setActiveTab(tab);
                                            } else {
                                                var p = this.add(new Ext.Panel({
                                                    id:id,
                                                    title:text,
                                                    closable:true,
                                                    frame:true,
                                                    html:"<iframe src='" + href + "' frameborder='0' width='100%' height='100%'></iframe>"
                                                }));
                                                centerPanel.add(p);
                                                centerPanel.setActiveTab(p);
                                            }
                                        }
                                    }
                                }
                            ]
                        })
                        westPanel.add(mp);
                    }
                    westPanel.doLayout();
                } catch (e) {

                }
            }
        });
    };

    Ext.onReady(function () {
        var viewport = new Ext.Viewport({
            layout:"border",
            items:[northPanel, westPanel, centerPanel, copyrightPanel]
        });

        loadPanelWest();
    });
})();
