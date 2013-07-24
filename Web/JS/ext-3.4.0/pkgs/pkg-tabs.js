/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.TabPanel = Ext.extend(Ext.Panel, {deferredRender:true, tabWidth:120, minTabWidth:30, resizeTabs:false, enableTabScroll:false, scrollIncrement:0, scrollRepeatInterval:400, scrollDuration:0.35, animScroll:true, tabPosition:"top", baseCls:"x-tab-panel", autoTabs:false, autoTabSelector:"div.x-tab", activeTab:undefined, tabMargin:2, plain:false, wheelIncrement:20, idDelimiter:"__", itemCls:"x-tab-item", elements:"body", headerAsText:false, frame:false, hideBorders:true, initComponent:function () {
    this.frame = false;
    Ext.TabPanel.superclass.initComponent.call(this);
    this.addEvents("beforetabchange", "tabchange", "contextmenu");
    this.setLayout(new Ext.layout.CardLayout(Ext.apply({layoutOnCardChange:this.layoutOnTabChange, deferredRender:this.deferredRender}, this.layoutConfig)));
    if (this.tabPosition == "top") {
        this.elements += ",header";
        this.stripTarget = "header"
    } else {
        this.elements += ",footer";
        this.stripTarget = "footer"
    }
    if (!this.stack) {
        this.stack = Ext.TabPanel.AccessStack()
    }
    this.initItems()
}, onRender:function (c, a) {
    Ext.TabPanel.superclass.onRender.call(this, c, a);
    if (this.plain) {
        var f = this.tabPosition == "top" ? "header" : "footer";
        this[f].addClass("x-tab-panel-" + f + "-plain")
    }
    var b = this[this.stripTarget];
    this.stripWrap = b.createChild({cls:"x-tab-strip-wrap", cn:{tag:"ul", cls:"x-tab-strip x-tab-strip-" + this.tabPosition}});
    var e = (this.tabPosition == "bottom" ? this.stripWrap : null);
    b.createChild({cls:"x-tab-strip-spacer"}, e);
    this.strip = new Ext.Element(this.stripWrap.dom.firstChild);
    this.edge = this.strip.createChild({tag:"li", cls:"x-tab-edge", cn:[
        {tag:"span", cls:"x-tab-strip-text", cn:"&#160;"}
    ]});
    this.strip.createChild({cls:"x-clear"});
    this.body.addClass("x-tab-panel-body-" + this.tabPosition);
    if (!this.itemTpl) {
        var d = new Ext.Template('<li class="{cls}" id="{id}"><a class="x-tab-strip-close"></a>', '<a class="x-tab-right" href="#"><em class="x-tab-left">', '<span class="x-tab-strip-inner"><span class="x-tab-strip-text {iconCls}">{text}</span></span>', "</em></a></li>");
        d.disableFormats = true;
        d.compile();
        Ext.TabPanel.prototype.itemTpl = d
    }
    this.items.each(this.initTab, this)
}, afterRender:function () {
    Ext.TabPanel.superclass.afterRender.call(this);
    if (this.autoTabs) {
        this.readTabs(false)
    }
    if (this.activeTab !== undefined) {
        var a = Ext.isObject(this.activeTab) ? this.activeTab : this.items.get(this.activeTab);
        delete this.activeTab;
        this.setActiveTab(a)
    }
}, initEvents:function () {
    Ext.TabPanel.superclass.initEvents.call(this);
    this.mon(this.strip, {scope:this, mousedown:this.onStripMouseDown, contextmenu:this.onStripContextMenu});
    if (this.enableTabScroll) {
        this.mon(this.strip, "mousewheel", this.onWheel, this)
    }
}, findTargets:function (c) {
    var b = null, a = c.getTarget("li:not(.x-tab-edge)", this.strip);
    if (a) {
        b = this.getComponent(a.id.split(this.idDelimiter)[1]);
        if (b.disabled) {
            return{close:null, item:null, el:null}
        }
    }
    return{close:c.getTarget(".x-tab-strip-close", this.strip), item:b, el:a}
}, onStripMouseDown:function (b) {
    if (b.button !== 0) {
        return
    }
    b.preventDefault();
    var a = this.findTargets(b);
    if (a.close) {
        if (a.item.fireEvent("beforeclose", a.item) !== false) {
            a.item.fireEvent("close", a.item);
            this.remove(a.item)
        }
        return
    }
    if (a.item && a.item != this.activeTab) {
        this.setActiveTab(a.item)
    }
}, onStripContextMenu:function (b) {
    b.preventDefault();
    var a = this.findTargets(b);
    if (a.item) {
        this.fireEvent("contextmenu", this, a.item, b)
    }
}, readTabs:function (d) {
    if (d === true) {
        this.items.each(function (g) {
            this.remove(g)
        }, this)
    }
    var c = this.el.query(this.autoTabSelector);
    for (var b = 0, a = c.length; b < a; b++) {
        var e = c[b], f = e.getAttribute("title");
        e.removeAttribute("title");
        this.add({title:f, contentEl:e})
    }
}, initTab:function (d, b) {
    var e = this.strip.dom.childNodes[b], f = this.getTemplateArgs(d), c = e ? this.itemTpl.insertBefore(e, f) : this.itemTpl.append(this.strip, f), a = "x-tab-strip-over", g = Ext.get(c);
    g.hover(function () {
        if (!d.disabled) {
            g.addClass(a)
        }
    }, function () {
        g.removeClass(a)
    });
    if (d.tabTip) {
        g.child("span.x-tab-strip-text", true).qtip = d.tabTip
    }
    d.tabEl = c;
    g.select("a").on("click", function (h) {
        if (!h.getPageX()) {
            this.onStripMouseDown(h)
        }
    }, this, {preventDefault:true});
    d.on({scope:this, disable:this.onItemDisabled, enable:this.onItemEnabled, titlechange:this.onItemTitleChanged, iconchange:this.onItemIconChanged, beforeshow:this.onBeforeShowItem})
}, getTemplateArgs:function (b) {
    var a = b.closable ? "x-tab-strip-closable" : "";
    if (b.disabled) {
        a += " x-item-disabled"
    }
    if (b.iconCls) {
        a += " x-tab-with-icon"
    }
    if (b.tabCls) {
        a += " " + b.tabCls
    }
    return{id:this.id + this.idDelimiter + b.getItemId(), text:b.title, cls:a, iconCls:b.iconCls || ""}
}, onAdd:function (b) {
    Ext.TabPanel.superclass.onAdd.call(this, b);
    if (this.rendered) {
        var a = this.items;
        this.initTab(b, a.indexOf(b));
        this.delegateUpdates()
    }
}, onBeforeAdd:function (b) {
    var a = b.events ? (this.items.containsKey(b.getItemId()) ? b : null) : this.items.get(b);
    if (a) {
        this.setActiveTab(b);
        return false
    }
    Ext.TabPanel.superclass.onBeforeAdd.apply(this, arguments);
    var c = b.elements;
    b.elements = c ? c.replace(",header", "") : c;
    b.border = (b.border === true)
}, onRemove:function (d) {
    var b = Ext.get(d.tabEl);
    if (b) {
        b.select("a").removeAllListeners();
        Ext.destroy(b)
    }
    Ext.TabPanel.superclass.onRemove.call(this, d);
    this.stack.remove(d);
    delete d.tabEl;
    d.un("disable", this.onItemDisabled, this);
    d.un("enable", this.onItemEnabled, this);
    d.un("titlechange", this.onItemTitleChanged, this);
    d.un("iconchange", this.onItemIconChanged, this);
    d.un("beforeshow", this.onBeforeShowItem, this);
    if (d == this.activeTab) {
        var a = this.stack.next();
        if (a) {
            this.setActiveTab(a)
        } else {
            if (this.items.getCount() > 0) {
                this.setActiveTab(0)
            } else {
                this.setActiveTab(null)
            }
        }
    }
    if (!this.destroying) {
        this.delegateUpdates()
    }
}, onBeforeShowItem:function (a) {
    if (a != this.activeTab) {
        this.setActiveTab(a);
        return false
    }
}, onItemDisabled:function (b) {
    var a = this.getTabEl(b);
    if (a) {
        Ext.fly(a).addClass("x-item-disabled")
    }
    this.stack.remove(b)
}, onItemEnabled:function (b) {
    var a = this.getTabEl(b);
    if (a) {
        Ext.fly(a).removeClass("x-item-disabled")
    }
}, onItemTitleChanged:function (b) {
    var a = this.getTabEl(b);
    if (a) {
        Ext.fly(a).child("span.x-tab-strip-text", true).innerHTML = b.title
    }
}, onItemIconChanged:function (d, a, c) {
    var b = this.getTabEl(d);
    if (b) {
        b = Ext.get(b);
        b.child("span.x-tab-strip-text").replaceClass(c, a);
        b[Ext.isEmpty(a) ? "removeClass" : "addClass"]("x-tab-with-icon")
    }
}, getTabEl:function (a) {
    var b = this.getComponent(a);
    return b ? b.tabEl : null
}, onResize:function () {
    Ext.TabPanel.superclass.onResize.apply(this, arguments);
    this.delegateUpdates()
}, beginUpdate:function () {
    this.suspendUpdates = true
}, endUpdate:function () {
    this.suspendUpdates = false;
    this.delegateUpdates()
}, hideTabStripItem:function (b) {
    b = this.getComponent(b);
    var a = this.getTabEl(b);
    if (a) {
        a.style.display = "none";
        this.delegateUpdates()
    }
    this.stack.remove(b)
}, unhideTabStripItem:function (b) {
    b = this.getComponent(b);
    var a = this.getTabEl(b);
    if (a) {
        a.style.display = "";
        this.delegateUpdates()
    }
}, delegateUpdates:function () {
    var a = this.rendered;
    if (this.suspendUpdates) {
        return
    }
    if (this.resizeTabs && a) {
        this.autoSizeTabs()
    }
    if (this.enableTabScroll && a) {
        this.autoScrollTabs()
    }
}, autoSizeTabs:function () {
    var g = this.items.length, b = this.tabPosition != "bottom" ? "header" : "footer", c = this[b].dom.offsetWidth, a = this[b].dom.clientWidth;
    if (!this.resizeTabs || g < 1 || !a) {
        return
    }
    var j = Math.max(Math.min(Math.floor((a - 4) / g) - this.tabMargin, this.tabWidth), this.minTabWidth);
    this.lastTabWidth = j;
    var l = this.strip.query("li:not(.x-tab-edge)");
    for (var e = 0, h = l.length; e < h; e++) {
        var k = l[e], m = Ext.fly(k).child(".x-tab-strip-inner", true), f = k.offsetWidth, d = m.offsetWidth;
        m.style.width = (j - (f - d)) + "px"
    }
}, adjustBodyWidth:function (a) {
    if (this.header) {
        this.header.setWidth(a)
    }
    if (this.footer) {
        this.footer.setWidth(a)
    }
    return a
}, setActiveTab:function (c) {
    c = this.getComponent(c);
    if (this.fireEvent("beforetabchange", this, c, this.activeTab) === false) {
        return
    }
    if (!this.rendered) {
        this.activeTab = c;
        return
    }
    if (this.activeTab != c) {
        if (this.activeTab) {
            var a = this.getTabEl(this.activeTab);
            if (a) {
                Ext.fly(a).removeClass("x-tab-strip-active")
            }
        }
        this.activeTab = c;
        if (c) {
            var b = this.getTabEl(c);
            Ext.fly(b).addClass("x-tab-strip-active");
            this.stack.add(c);
            this.layout.setActiveItem(c);
            this.delegateUpdates();
            if (this.scrolling) {
                this.scrollToTab(c, this.animScroll)
            }
        }
        this.fireEvent("tabchange", this, c)
    }
}, getActiveTab:function () {
    return this.activeTab || null
}, getItem:function (a) {
    return this.getComponent(a)
}, autoScrollTabs:function () {
    this.pos = this.tabPosition == "bottom" ? this.footer : this.header;
    var g = this.items.length, d = this.pos.dom.offsetWidth, c = this.pos.dom.clientWidth, f = this.stripWrap, e = f.dom, b = e.offsetWidth, h = this.getScrollPos(), a = this.edge.getOffsetsTo(this.stripWrap)[0] + h;
    if (!this.enableTabScroll || b < 20) {
        return
    }
    if (g == 0 || a <= c) {
        e.scrollLeft = 0;
        f.setWidth(c);
        if (this.scrolling) {
            this.scrolling = false;
            this.pos.removeClass("x-tab-scrolling");
            this.scrollLeft.hide();
            this.scrollRight.hide();
            if (Ext.isAir || Ext.isWebKit) {
                e.style.marginLeft = "";
                e.style.marginRight = ""
            }
        }
    } else {
        if (!this.scrolling) {
            this.pos.addClass("x-tab-scrolling");
            if (Ext.isAir || Ext.isWebKit) {
                e.style.marginLeft = "18px";
                e.style.marginRight = "18px"
            }
        }
        c -= f.getMargins("lr");
        f.setWidth(c > 20 ? c : 20);
        if (!this.scrolling) {
            if (!this.scrollLeft) {
                this.createScrollers()
            } else {
                this.scrollLeft.show();
                this.scrollRight.show()
            }
        }
        this.scrolling = true;
        if (h > (a - c)) {
            e.scrollLeft = a - c
        } else {
            this.scrollToTab(this.activeTab, false)
        }
        this.updateScrollButtons()
    }
}, createScrollers:function () {
    this.pos.addClass("x-tab-scrolling-" + this.tabPosition);
    var c = this.stripWrap.dom.offsetHeight;
    var a = this.pos.insertFirst({cls:"x-tab-scroller-left"});
    a.setHeight(c);
    a.addClassOnOver("x-tab-scroller-left-over");
    this.leftRepeater = new Ext.util.ClickRepeater(a, {interval:this.scrollRepeatInterval, handler:this.onScrollLeft, scope:this});
    this.scrollLeft = a;
    var b = this.pos.insertFirst({cls:"x-tab-scroller-right"});
    b.setHeight(c);
    b.addClassOnOver("x-tab-scroller-right-over");
    this.rightRepeater = new Ext.util.ClickRepeater(b, {interval:this.scrollRepeatInterval, handler:this.onScrollRight, scope:this});
    this.scrollRight = b
}, getScrollWidth:function () {
    return this.edge.getOffsetsTo(this.stripWrap)[0] + this.getScrollPos()
}, getScrollPos:function () {
    return parseInt(this.stripWrap.dom.scrollLeft, 10) || 0
}, getScrollArea:function () {
    return parseInt(this.stripWrap.dom.clientWidth, 10) || 0
}, getScrollAnim:function () {
    return{duration:this.scrollDuration, callback:this.updateScrollButtons, scope:this}
}, getScrollIncrement:function () {
    return this.scrollIncrement || (this.resizeTabs ? this.lastTabWidth + 2 : 100)
}, scrollToTab:function (e, a) {
    if (!e) {
        return
    }
    var c = this.getTabEl(e), g = this.getScrollPos(), d = this.getScrollArea(), f = Ext.fly(c).getOffsetsTo(this.stripWrap)[0] + g, b = f + c.offsetWidth;
    if (f < g) {
        this.scrollTo(f, a)
    } else {
        if (b > (g + d)) {
            this.scrollTo(b - d, a)
        }
    }
}, scrollTo:function (b, a) {
    this.stripWrap.scrollTo("left", b, a ? this.getScrollAnim() : false);
    if (!a) {
        this.updateScrollButtons()
    }
}, onWheel:function (f) {
    var g = f.getWheelDelta() * this.wheelIncrement * -1;
    f.stopEvent();
    var h = this.getScrollPos(), c = h + g, a = this.getScrollWidth() - this.getScrollArea();
    var b = Math.max(0, Math.min(a, c));
    if (b != h) {
        this.scrollTo(b, false)
    }
}, onScrollRight:function () {
    var a = this.getScrollWidth() - this.getScrollArea(), c = this.getScrollPos(), b = Math.min(a, c + this.getScrollIncrement());
    if (b != c) {
        this.scrollTo(b, this.animScroll)
    }
}, onScrollLeft:function () {
    var b = this.getScrollPos(), a = Math.max(0, b - this.getScrollIncrement());
    if (a != b) {
        this.scrollTo(a, this.animScroll)
    }
}, updateScrollButtons:function () {
    var a = this.getScrollPos();
    this.scrollLeft[a === 0 ? "addClass" : "removeClass"]("x-tab-scroller-left-disabled");
    this.scrollRight[a >= (this.getScrollWidth() - this.getScrollArea()) ? "addClass" : "removeClass"]("x-tab-scroller-right-disabled")
}, beforeDestroy:function () {
    Ext.destroy(this.leftRepeater, this.rightRepeater);
    this.deleteMembers("strip", "edge", "scrollLeft", "scrollRight", "stripWrap");
    this.activeTab = null;
    Ext.TabPanel.superclass.beforeDestroy.apply(this)
}});
Ext.reg("tabpanel", Ext.TabPanel);
Ext.TabPanel.prototype.activate = Ext.TabPanel.prototype.setActiveTab;
Ext.TabPanel.AccessStack = function () {
    var a = [];
    return{add:function (b) {
        a.push(b);
        if (a.length > 10) {
            a.shift()
        }
    }, remove:function (e) {
        var d = [];
        for (var c = 0, b = a.length; c < b; c++) {
            if (a[c] != e) {
                d.push(a[c])
            }
        }
        a = d
    }, next:function () {
        return a.pop()
    }}
};