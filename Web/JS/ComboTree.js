Ext.namespace("Ext.ux.form");

Ext.ux.form.ComboTree = Ext.extend(Ext.form.ComboBox, {
    initComponent:function (ct, position) {
        this.divId = 'tree-' + Ext.id();
        if (isNaN(this.maxHeight)) this.maxHeight = 200;
        Ext.apply(this, {
            tpl:'<tpl>' + '<div style="height:' + this.maxHeight + 'px;">' + '<div id="' + this.divId + '"></div>' + '</div></tpl>'
        });
        var root = new Ext.tree.AsyncTreeNode({
            text:this.rootText,
            id:this.rootId,
            loader:new Ext.tree.TreeLoader({
                dataUrl:this.treeUrl,
                clearOnLoad:true
            })
        });

        this.tree = new Ext.tree.TreePanel({
            border:false,
            root:root,
            rootVisible:this.rootVisible,
            listeners:{
                scope:this,
                click:function (node) {
                    this.setValue(node);
                    this.collapse();
                }
            }
        });

        Ext.ux.form.ComboTree.superclass.initComponent.call(this);
    },

    onRender:function (ct, position) {
        Ext.ux.form.ComboTree.superclass.onRender.call(this, ct, position);

        this.on("expand",
            function () {
                if (!this.tree.rendered) {
                    this.tree.render(this.divId);
                }
            },
            this);

    },

    /*以下代码是为了将tree的node设置到combo中 因为我还有一些其他的作用，所以我是将这部分的代码重写到其他地方了 
     setValue : function(node) {
     if (typeof node == "object") {
     this.setRawValue(node.text);
     if (this.hiddenField) {
     this.hiddenField.value = node.id;
     }
     } else {
     this.setRawValue(node);
     }
     }
     */

});
Ext.reg('uxcombotree', Ext.ux.form.ComboTree);
Ext.override(Ext.form.ComboBox, {
    setValue:function (node) {
        if (typeof node == "object") {
            // 当node为object对象时 node和tree里面的对应  
            this.lastSelectionText = node.text;
            // 设置显示文本为node的text  
            this.setRawValue(node.text);
            if (this.hiddenField) {
                // 设置隐藏值为node的id  
                this.hiddenField.value = node.id;
            }
            this.value = node.id;
            return this;
        } else {
            // 当node为文本时 这段代码是从combo的源码中拷贝过来的 具体作用不细说了  
            var text = node;
            if (this.valueField) {
                var r = this.findRecord(this.valueField, node);
                if (r) {
                    text = r.data[this.displayField];
                } else if (Ext.isDefined(this.valueNotFoundText)) {
                    text = this.valueNotFoundText;
                }
            }
            this.lastSelectionText = text;
            if (this.hiddenField) {
                this.hiddenField.value = node;
            }
            Ext.form.ComboBox.superclass.setValue.call(this, text);
            this.value = node;
            return this;
        }
    }
})