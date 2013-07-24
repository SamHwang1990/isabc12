/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Toolbar = function (a) {
    if (Ext.isArray(a)) {
        a = {items:a, layout:"toolbar"}
    } else {
        a = Ext.apply({layout:"toolbar"}, a);
        if (a.buttons) {
            a.items = a.buttons
        }
    }
    Ext.Toolbar.superclass.constructor.call(this, a)
};
(function () {
    var a = Ext.Toolbar;
    Ext.extend(a, Ext.Container, {defaultType:"button", enableOverflow:false, trackMenus:true, internalDefaults:{removeMode:"container", hideParent:true}, toolbarCls:"x-toolbar", initComponent:function () {
        a.superclass.initComponent.call(this);
        this.addEvents("overflowchange")
    }, onRender:function (c, b) {
        if (!this.el) {
            if (!this.autoCreate) {
                this.autoCreate = {cls:this.toolbarCls + " x-small-editor"}
            }
            this.el = c.createChild(Ext.apply({id:this.id}, this.autoCreate), b);
            Ext.Toolbar.superclass.onRender.apply(this, arguments)
        }
    }, lookupComponent:function (b) {
        if (Ext.isString(b)) {
            if (b == "-") {
                b = new a.Separator()
            } else {
                if (b == " ") {
                    b = new a.Spacer()
                } else {
                    if (b == "->") {
                        b = new a.Fill()
                    } else {
                        b = new a.TextItem(b)
                    }
                }
            }
            this.applyDefaults(b)
        } else {
            if (b.isFormField || b.render) {
                b = this.createComponent(b)
            } else {
                if (b.tag) {
                    b = new a.Item({autoEl:b})
                } else {
                    if (b.tagName) {
                        b = new a.Item({el:b})
                    } else {
                        if (Ext.isObject(b)) {
                            b = b.xtype ? this.createComponent(b) : this.constructButton(b)
                        }
                    }
                }
            }
        }
        return b
    }, applyDefaults:function (e) {
        if (!Ext.isString(e)) {
            e = Ext.Toolbar.superclass.applyDefaults.call(this, e);
            var b = this.internalDefaults;
            if (e.events) {
                Ext.applyIf(e.initialConfig, b);
                Ext.apply(e, b)
            } else {
                Ext.applyIf(e, b)
            }
        }
        return e
    }, addSeparator:function () {
        return this.add(new a.Separator())
    }, addSpacer:function () {
        return this.add(new a.Spacer())
    }, addFill:function () {
        this.add(new a.Fill())
    }, addElement:function (b) {
        return this.addItem(new a.Item({el:b}))
    }, addItem:function (b) {
        return this.add.apply(this, arguments)
    }, addButton:function (c) {
        if (Ext.isArray(c)) {
            var e = [];
            for (var d = 0, b = c.length; d < b; d++) {
                e.push(this.addButton(c[d]))
            }
            return e
        }
        return this.add(this.constructButton(c))
    }, addText:function (b) {
        return this.addItem(new a.TextItem(b))
    }, addDom:function (b) {
        return this.add(new a.Item({autoEl:b}))
    }, addField:function (b) {
        return this.add(b)
    }, insertButton:function (c, f) {
        if (Ext.isArray(f)) {
            var e = [];
            for (var d = 0, b = f.length; d < b; d++) {
                e.push(this.insertButton(c + d, f[d]))
            }
            return e
        }
        return Ext.Toolbar.superclass.insert.call(this, c, f)
    }, trackMenu:function (c, b) {
        if (this.trackMenus && c.menu) {
            var d = b ? "mun" : "mon";
            this[d](c, "menutriggerover", this.onButtonTriggerOver, this);
            this[d](c, "menushow", this.onButtonMenuShow, this);
            this[d](c, "menuhide", this.onButtonMenuHide, this)
        }
    }, constructButton:function (d) {
        var c = d.events ? d : this.createComponent(d, d.split ? "splitbutton" : this.defaultType);
        return c
    }, onAdd:function (b) {
        Ext.Toolbar.superclass.onAdd.call(this);
        this.trackMenu(b);
        if (this.disabled) {
            b.disable()
        }
    }, onRemove:function (b) {
        Ext.Toolbar.superclass.onRemove.call(this);
        if (b == this.activeMenuBtn) {
            delete this.activeMenuBtn
        }
        this.trackMenu(b, true)
    }, onDisable:function () {
        this.items.each(function (b) {
            if (b.disable) {
                b.disable()
            }
        })
    }, onEnable:function () {
        this.items.each(function (b) {
            if (b.enable) {
                b.enable()
            }
        })
    }, onButtonTriggerOver:function (b) {
        if (this.activeMenuBtn && this.activeMenuBtn != b) {
            this.activeMenuBtn.hideMenu();
            b.showMenu();
            this.activeMenuBtn = b
        }
    }, onButtonMenuShow:function (b) {
        this.activeMenuBtn = b
    }, onButtonMenuHide:function (b) {
        delete this.activeMenuBtn
    }});
    Ext.reg("toolbar", Ext.Toolbar);
    a.Item = Ext.extend(Ext.BoxComponent, {hideParent:true, enable:Ext.emptyFn, disable:Ext.emptyFn, focus:Ext.emptyFn});
    Ext.reg("tbitem", a.Item);
    a.Separator = Ext.extend(a.Item, {onRender:function (c, b) {
        this.el = c.createChild({tag:"span", cls:"xtb-sep"}, b)
    }});
    Ext.reg("tbseparator", a.Separator);
    a.Spacer = Ext.extend(a.Item, {onRender:function (c, b) {
        this.el = c.createChild({tag:"div", cls:"xtb-spacer", style:this.width ? "width:" + this.width + "px" : ""}, b)
    }});
    Ext.reg("tbspacer", a.Spacer);
    a.Fill = Ext.extend(a.Item, {render:Ext.emptyFn, isFill:true});
    Ext.reg("tbfill", a.Fill);
    a.TextItem = Ext.extend(a.Item, {constructor:function (b) {
        a.TextItem.superclass.constructor.call(this, Ext.isString(b) ? {text:b} : b)
    }, onRender:function (c, b) {
        this.autoEl = {cls:"xtb-text", html:this.text || ""};
        a.TextItem.superclass.onRender.call(this, c, b)
    }, setText:function (b) {
        if (this.rendered) {
            this.el.update(b)
        } else {
            this.text = b
        }
    }});
    Ext.reg("tbtext", a.TextItem);
    a.Button = Ext.extend(Ext.Button, {});
    a.SplitButton = Ext.extend(Ext.SplitButton, {});
    Ext.reg("tbbutton", a.Button);
    Ext.reg("tbsplit", a.SplitButton)
})();
Ext.ButtonGroup = Ext.extend(Ext.Panel, {baseCls:"x-btn-group", layout:"table", defaultType:"button", frame:true, internalDefaults:{removeMode:"container", hideParent:true}, initComponent:function () {
    this.layoutConfig = this.layoutConfig || {};
    Ext.applyIf(this.layoutConfig, {columns:this.columns});
    if (!this.title) {
        this.addClass("x-btn-group-notitle")
    }
    this.on("afterlayout", this.onAfterLayout, this);
    Ext.ButtonGroup.superclass.initComponent.call(this)
}, applyDefaults:function (b) {
    b = Ext.ButtonGroup.superclass.applyDefaults.call(this, b);
    var a = this.internalDefaults;
    if (b.events) {
        Ext.applyIf(b.initialConfig, a);
        Ext.apply(b, a)
    } else {
        Ext.applyIf(b, a)
    }
    return b
}, onAfterLayout:function () {
    var a = this.body.getFrameWidth("lr") + this.body.dom.firstChild.offsetWidth;
    this.body.setWidth(a);
    this.el.setWidth(a + this.getFrameWidth())
}});
Ext.reg("buttongroup", Ext.ButtonGroup);
(function () {
    var a = Ext.Toolbar;
    Ext.PagingToolbar = Ext.extend(Ext.Toolbar, {pageSize:20, displayMsg:"Displaying {0} - {1} of {2}", emptyMsg:"No data to display", beforePageText:"Page", afterPageText:"of {0}", firstText:"First Page", prevText:"Previous Page", nextText:"Next Page", lastText:"Last Page", refreshText:"Refresh", initComponent:function () {
        var c = [this.first = new a.Button({tooltip:this.firstText, overflowText:this.firstText, iconCls:"x-tbar-page-first", disabled:true, handler:this.moveFirst, scope:this}), this.prev = new a.Button({tooltip:this.prevText, overflowText:this.prevText, iconCls:"x-tbar-page-prev", disabled:true, handler:this.movePrevious, scope:this}), "-", this.beforePageText, this.inputItem = new Ext.form.NumberField({cls:"x-tbar-page-number", allowDecimals:false, allowNegative:false, enableKeyEvents:true, selectOnFocus:true, submitValue:false, listeners:{scope:this, keydown:this.onPagingKeyDown, blur:this.onPagingBlur}}), this.afterTextItem = new a.TextItem({text:String.format(this.afterPageText, 1)}), "-", this.next = new a.Button({tooltip:this.nextText, overflowText:this.nextText, iconCls:"x-tbar-page-next", disabled:true, handler:this.moveNext, scope:this}), this.last = new a.Button({tooltip:this.lastText, overflowText:this.lastText, iconCls:"x-tbar-page-last", disabled:true, handler:this.moveLast, scope:this}), "-", this.refresh = new a.Button({tooltip:this.refreshText, overflowText:this.refreshText, iconCls:"x-tbar-loading", handler:this.doRefresh, scope:this})];
        var b = this.items || this.buttons || [];
        if (this.prependButtons) {
            this.items = b.concat(c)
        } else {
            this.items = c.concat(b)
        }
        delete this.buttons;
        if (this.displayInfo) {
            this.items.push("->");
            this.items.push(this.displayItem = new a.TextItem({}))
        }
        Ext.PagingToolbar.superclass.initComponent.call(this);
        this.addEvents("change", "beforechange");
        this.on("afterlayout", this.onFirstLayout, this, {single:true});
        this.cursor = 0;
        this.bindStore(this.store, true)
    }, onFirstLayout:function () {
        if (this.dsLoaded) {
            this.onLoad.apply(this, this.dsLoaded)
        }
    }, updateInfo:function () {
        if (this.displayItem) {
            var b = this.store.getCount();
            var c = b == 0 ? this.emptyMsg : String.format(this.displayMsg, this.cursor + 1, this.cursor + b, this.store.getTotalCount());
            this.displayItem.setText(c)
        }
    }, onLoad:function (b, e, i) {
        if (!this.rendered) {
            this.dsLoaded = [b, e, i];
            return
        }
        var f = this.getParams();
        this.cursor = (i.params && i.params[f.start]) ? i.params[f.start] : 0;
        var h = this.getPageData(), c = h.activePage, g = h.pages;
        this.afterTextItem.setText(String.format(this.afterPageText, h.pages));
        this.inputItem.setValue(c);
        this.first.setDisabled(c == 1);
        this.prev.setDisabled(c == 1);
        this.next.setDisabled(c == g);
        this.last.setDisabled(c == g);
        this.refresh.enable();
        this.updateInfo();
        this.fireEvent("change", this, h)
    }, getPageData:function () {
        var b = this.store.getTotalCount();
        return{total:b, activePage:Math.ceil((this.cursor + this.pageSize) / this.pageSize), pages:b < this.pageSize ? 1 : Math.ceil(b / this.pageSize)}
    }, changePage:function (b) {
        this.doLoad(((b - 1) * this.pageSize).constrain(0, this.store.getTotalCount()))
    }, onLoadError:function () {
        if (!this.rendered) {
            return
        }
        this.refresh.enable()
    }, readPage:function (e) {
        var b = this.inputItem.getValue(), c;
        if (!b || isNaN(c = parseInt(b, 10))) {
            this.inputItem.setValue(e.activePage);
            return false
        }
        return c
    }, onPagingFocus:function () {
        this.inputItem.select()
    }, onPagingBlur:function (b) {
        this.inputItem.setValue(this.getPageData().activePage)
    }, onPagingKeyDown:function (h, g) {
        var c = g.getKey(), i = this.getPageData(), f;
        if (c == g.RETURN) {
            g.stopEvent();
            f = this.readPage(i);
            if (f !== false) {
                f = Math.min(Math.max(1, f), i.pages) - 1;
                this.doLoad(f * this.pageSize)
            }
        } else {
            if (c == g.HOME || c == g.END) {
                g.stopEvent();
                f = c == g.HOME ? 1 : i.pages;
                h.setValue(f)
            } else {
                if (c == g.UP || c == g.PAGEUP || c == g.DOWN || c == g.PAGEDOWN) {
                    g.stopEvent();
                    if ((f = this.readPage(i))) {
                        var b = g.shiftKey ? 10 : 1;
                        if (c == g.DOWN || c == g.PAGEDOWN) {
                            b *= -1
                        }
                        f += b;
                        if (f >= 1 & f <= i.pages) {
                            h.setValue(f)
                        }
                    }
                }
            }
        }
    }, getParams:function () {
        return this.paramNames || this.store.paramNames
    }, beforeLoad:function () {
        if (this.rendered && this.refresh) {
            this.refresh.disable()
        }
    }, doLoad:function (d) {
        var c = {}, b = this.getParams();
        c[b.start] = d;
        c[b.limit] = this.pageSize;
        if (this.fireEvent("beforechange", this, c) !== false) {
            this.store.load({params:c})
        }
    }, moveFirst:function () {
        this.doLoad(0)
    }, movePrevious:function () {
        this.doLoad(Math.max(0, this.cursor - this.pageSize))
    }, moveNext:function () {
        this.doLoad(this.cursor + this.pageSize)
    }, moveLast:function () {
        var c = this.store.getTotalCount(), b = c % this.pageSize;
        this.doLoad(b ? (c - b) : c - this.pageSize)
    }, doRefresh:function () {
        this.doLoad(this.cursor)
    }, bindStore:function (c, d) {
        var b;
        if (!d && this.store) {
            if (c !== this.store && this.store.autoDestroy) {
                this.store.destroy()
            } else {
                this.store.un("beforeload", this.beforeLoad, this);
                this.store.un("load", this.onLoad, this);
                this.store.un("exception", this.onLoadError, this)
            }
            if (!c) {
                this.store = null
            }
        }
        if (c) {
            c = Ext.StoreMgr.lookup(c);
            c.on({scope:this, beforeload:this.beforeLoad, load:this.onLoad, exception:this.onLoadError});
            b = true
        }
        this.store = c;
        if (b) {
            this.onLoad(c, null, {})
        }
    }, unbind:function (b) {
        this.bindStore(null)
    }, bind:function (b) {
        this.bindStore(b)
    }, onDestroy:function () {
        this.bindStore(null);
        Ext.PagingToolbar.superclass.onDestroy.call(this)
    }})
})();
Ext.reg("paging", Ext.PagingToolbar);