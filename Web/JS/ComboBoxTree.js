Ext.ns("OECP.ui");
/**
 * 下拉列表选择树
 * <br>
 * 依赖EXTJS3版本
 * @class OECP.ui.ComboBoxTree
 * @extends Ext.form.ComboBox
 * @author yongtree
 */
OECP.ui.ComboBoxTree = Ext.extend(Ext.form.ComboBox, {
    store:new Ext.data.SimpleStore({
        fields:[],
        data:[
            []
        ]
    }),
    editable:this.editable || false,
    mode:'local',
    fieldLabel:this.fieldLabel || "",
    emptyText:this.emptyText || "请选择",
    allowBlank:this.allowBlank || true,
    blankText:this.blankText || "必须输入!",
    triggerAction:'all',
    maxHeight:200,
    rootVisible:false,
    anchor:'95%',
    displayField:'text',
    //'leaf'
    selectMode:"all",
    valueField:'id',
    selectedClass:'',
    onSelect:Ext.emptyFn,
    rootText:this.rootText || 'root',
    treeUrl:this.treeUrl,
    tree:null,
    initComponent:function () {
        this.treeRenderId = Ext.id();
        this.tpl = "<tpl for='.'><div style='height:200px'><div id='" + this.treeRenderId + "'></div></div></tpl>",
            this.tree = new Ext.tree.TreePanel({
                height:200,
                scope:this,
                autoScroll:true,
                split:true,
                root:new Ext.tree.AsyncTreeNode({
                    expanded:true,
                    text:this.rootText
                }),

                loader:new Ext.tree.TreeLoader({
                    url:this.treeUrl
                }),
                rootVisible:this.rootVisible
            });

        var c = this;
        this.tree.on('click',
            function (node, event) {
                event.stopEvent();
                if (c.selectMode == "leaf" && !node.isLeaf()) {
                    return;
                }
                c.setValue(node.text);
                c.collapse();
            })

        this.on('expand',
            function () {
                this.tree.render(this.treeRenderId);
                console.log(this.tpl);
                this.tree.expandAll();
            });

        OECP.ui.ComboBoxTree.superclass.initComponent.call(this);
    }

});