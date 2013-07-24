/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Button = Ext.extend(Ext.BoxComponent, {hidden:false, disabled:false, pressed:false, enableToggle:false, menuAlign:"tl-bl?", type:"button", menuClassTarget:"tr:nth(2)", clickEvent:"click", handleMouseEvents:true, tooltipType:"qtip", buttonSelector:"button:first-child", scale:"small", iconAlign:"left", arrowAlign:"right", initComponent:function () {
    if (this.menu) {
        if (Ext.isArray(this.menu)) {
            this.menu = {items:this.menu}
        }
        if (Ext.isObject(this.menu)) {
            this.menu.ownerCt = this
        }
        this.menu = Ext.menu.MenuMgr.get(this.menu);
        this.menu.ownerCt = undefined
    }
    Ext.Button.superclass.initComponent.call(this);
    this.addEvents("click", "toggle", "mouseover", "mouseout", "menushow", "menuhide", "menutriggerover", "menutriggerout");
    if (Ext.isString(this.toggleGroup)) {
        this.enableToggle = true
    }
}, getTemplateArgs:function () {
    return[this.type, "x-btn-" + this.scale + " x-btn-icon-" + this.scale + "-" + this.iconAlign, this.getMenuClass(), this.cls, this.id]
}, setButtonClass:function () {
    if (this.useSetClass) {
        if (!Ext.isEmpty(this.oldCls)) {
            this.el.removeClass([this.oldCls, "x-btn-pressed"])
        }
        this.oldCls = (this.iconCls || this.icon) ? (this.text ? "x-btn-text-icon" : "x-btn-icon") : "x-btn-noicon";
        this.el.addClass([this.oldCls, this.pressed ? "x-btn-pressed" : null])
    }
}, getMenuClass:function () {
    return this.menu ? (this.arrowAlign != "bottom" ? "x-btn-arrow" : "x-btn-arrow-bottom") : ""
}, onRender:function (c, a) {
    if (!this.template) {
        if (!Ext.Button.buttonTemplate) {
            Ext.Button.buttonTemplate = new Ext.Template('<table id="{4}" cellspacing="0" class="x-btn {3}"><tbody class="{1}">', '<tr><td class="x-btn-tl"><i>&#160;</i></td><td class="x-btn-tc"></td><td class="x-btn-tr"><i>&#160;</i></td></tr>', '<tr><td class="x-btn-ml"><i>&#160;</i></td><td class="x-btn-mc"><em class="{2}" unselectable="on"><button type="{0}"></button></em></td><td class="x-btn-mr"><i>&#160;</i></td></tr>', '<tr><td class="x-btn-bl"><i>&#160;</i></td><td class="x-btn-bc"></td><td class="x-btn-br"><i>&#160;</i></td></tr>', "</tbody></table>");
            Ext.Button.buttonTemplate.compile()
        }
        this.template = Ext.Button.buttonTemplate
    }
    var b, d = this.getTemplateArgs();
    if (a) {
        b = this.template.insertBefore(a, d, true)
    } else {
        b = this.template.append(c, d, true)
    }
    this.btnEl = b.child(this.buttonSelector);
    this.mon(this.btnEl, {scope:this, focus:this.onFocus, blur:this.onBlur});
    this.initButtonEl(b, this.btnEl);
    Ext.ButtonToggleMgr.register(this)
}, initButtonEl:function (b, c) {
    this.el = b;
    this.setIcon(this.icon);
    this.setText(this.text);
    this.setIconClass(this.iconCls);
    if (Ext.isDefined(this.tabIndex)) {
        c.dom.tabIndex = this.tabIndex
    }
    if (this.tooltip) {
        this.setTooltip(this.tooltip, true)
    }
    if (this.handleMouseEvents) {
        this.mon(b, {scope:this, mouseover:this.onMouseOver, mousedown:this.onMouseDown})
    }
    if (this.menu) {
        this.mon(this.menu, {scope:this, show:this.onMenuShow, hide:this.onMenuHide})
    }
    if (this.repeat) {
        var a = new Ext.util.ClickRepeater(b, Ext.isObject(this.repeat) ? this.repeat : {});
        this.mon(a, "click", this.onRepeatClick, this)
    } else {
        this.mon(b, this.clickEvent, this.onClick, this)
    }
}, afterRender:function () {
    Ext.Button.superclass.afterRender.call(this);
    this.useSetClass = true;
    this.setButtonClass();
    this.doc = Ext.getDoc();
    this.doAutoWidth()
}, setIconClass:function (a) {
    this.iconCls = a;
    if (this.el) {
        this.btnEl.dom.className = "";
        this.btnEl.addClass(["x-btn-text", a || ""]);
        this.setButtonClass()
    }
    return this
}, setTooltip:function (b, a) {
    if (this.rendered) {
        if (!a) {
            this.clearTip()
        }
        if (Ext.isObject(b)) {
            Ext.QuickTips.register(Ext.apply({target:this.btnEl.id}, b));
            this.tooltip = b
        } else {
            this.btnEl.dom[this.tooltipType] = b
        }
    } else {
        this.tooltip = b
    }
    return this
}, clearTip:function () {
    if (Ext.isObject(this.tooltip)) {
        Ext.QuickTips.unregister(this.btnEl)
    }
}, beforeDestroy:function () {
    if (this.rendered) {
        this.clearTip()
    }
    if (this.menu && this.destroyMenu !== false) {
        Ext.destroy(this.btnEl, this.menu)
    }
    Ext.destroy(this.repeater)
}, onDestroy:function () {
    if (this.rendered) {
        this.doc.un("mouseover", this.monitorMouseOver, this);
        this.doc.un("mouseup", this.onMouseUp, this);
        delete this.doc;
        delete this.btnEl;
        Ext.ButtonToggleMgr.unregister(this)
    }
    Ext.Button.superclass.onDestroy.call(this)
}, doAutoWidth:function () {
    if (this.autoWidth !== false && this.el && this.text && this.width === undefined) {
        this.el.setWidth("auto");
        if (Ext.isIE7 && Ext.isStrict) {
            var a = this.btnEl;
            if (a && a.getWidth() > 20) {
                a.clip();
                a.setWidth(Ext.util.TextMetrics.measure(a, this.text).width + a.getFrameWidth("lr"))
            }
        }
        if (this.minWidth) {
            if (this.el.getWidth() < this.minWidth) {
                this.el.setWidth(this.minWidth)
            }
        }
    }
}, setHandler:function (b, a) {
    this.handler = b;
    this.scope = a;
    return this
}, setText:function (a) {
    this.text = a;
    if (this.el) {
        this.btnEl.update(a || "&#160;");
        this.setButtonClass()
    }
    this.doAutoWidth();
    return this
}, setIcon:function (a) {
    this.icon = a;
    if (this.el) {
        this.btnEl.setStyle("background-image", a ? "url(" + a + ")" : "");
        this.setButtonClass()
    }
    return this
}, getText:function () {
    return this.text
}, toggle:function (b, a) {
    b = b === undefined ? !this.pressed : !!b;
    if (b != this.pressed) {
        if (this.rendered) {
            this.el[b ? "addClass" : "removeClass"]("x-btn-pressed")
        }
        this.pressed = b;
        if (!a) {
            this.fireEvent("toggle", this, b);
            if (this.toggleHandler) {
                this.toggleHandler.call(this.scope || this, this, b)
            }
        }
    }
    return this
}, onDisable:function () {
    this.onDisableChange(true)
}, onEnable:function () {
    this.onDisableChange(false)
}, onDisableChange:function (a) {
    if (this.el) {
        if (!Ext.isIE6 || !this.text) {
            this.el[a ? "addClass" : "removeClass"](this.disabledClass)
        }
        this.el.dom.disabled = a
    }
    this.disabled = a
}, showMenu:function () {
    if (this.rendered && this.menu) {
        if (this.tooltip) {
            Ext.QuickTips.getQuickTip().cancelShow(this.btnEl)
        }
        if (this.menu.isVisible()) {
            this.menu.hide()
        }
        this.menu.ownerCt = this;
        this.menu.show(this.el, this.menuAlign)
    }
    return this
}, hideMenu:function () {
    if (this.hasVisibleMenu()) {
        this.menu.hide()
    }
    return this
}, hasVisibleMenu:function () {
    return this.menu && this.menu.ownerCt == this && this.menu.isVisible()
}, onRepeatClick:function (a, b) {
    this.onClick(b)
}, onClick:function (a) {
    if (a) {
        a.preventDefault()
    }
    if (a.button !== 0) {
        return
    }
    if (!this.disabled) {
        this.doToggle();
        if (this.menu && !this.hasVisibleMenu() && !this.ignoreNextClick) {
            this.showMenu()
        }
        this.fireEvent("click", this, a);
        if (this.handler) {
            this.handler.call(this.scope || this, this, a)
        }
    }
}, doToggle:function () {
    if (this.enableToggle && (this.allowDepress !== false || !this.pressed)) {
        this.toggle()
    }
}, isMenuTriggerOver:function (b, a) {
    return this.menu && !a
}, isMenuTriggerOut:function (b, a) {
    return this.menu && !a
}, onMouseOver:function (b) {
    if (!this.disabled) {
        var a = b.within(this.el, true);
        if (!a) {
            this.el.addClass("x-btn-over");
            if (!this.monitoringMouseOver) {
                this.doc.on("mouseover", this.monitorMouseOver, this);
                this.monitoringMouseOver = true
            }
            this.fireEvent("mouseover", this, b)
        }
        if (this.isMenuTriggerOver(b, a)) {
            this.fireEvent("menutriggerover", this, this.menu, b)
        }
    }
}, monitorMouseOver:function (a) {
    if (a.target != this.el.dom && !a.within(this.el)) {
        if (this.monitoringMouseOver) {
            this.doc.un("mouseover", this.monitorMouseOver, this);
            this.monitoringMouseOver = false
        }
        this.onMouseOut(a)
    }
}, onMouseOut:function (b) {
    var a = b.within(this.el) && b.target != this.el.dom;
    this.el.removeClass("x-btn-over");
    this.fireEvent("mouseout", this, b);
    if (this.isMenuTriggerOut(b, a)) {
        this.fireEvent("menutriggerout", this, this.menu, b)
    }
}, focus:function () {
    this.btnEl.focus()
}, blur:function () {
    this.btnEl.blur()
}, onFocus:function (a) {
    if (!this.disabled) {
        this.el.addClass("x-btn-focus")
    }
}, onBlur:function (a) {
    this.el.removeClass("x-btn-focus")
}, getClickEl:function (b, a) {
    return this.el
}, onMouseDown:function (a) {
    if (!this.disabled && a.button === 0) {
        this.getClickEl(a).addClass("x-btn-click");
        this.doc.on("mouseup", this.onMouseUp, this)
    }
}, onMouseUp:function (a) {
    if (a.button === 0) {
        this.getClickEl(a, true).removeClass("x-btn-click");
        this.doc.un("mouseup", this.onMouseUp, this)
    }
}, onMenuShow:function (a) {
    if (this.menu.ownerCt == this) {
        this.menu.ownerCt = this;
        this.ignoreNextClick = 0;
        this.el.addClass("x-btn-menu-active");
        this.fireEvent("menushow", this, this.menu)
    }
}, onMenuHide:function (a) {
    if (this.menu.ownerCt == this) {
        this.el.removeClass("x-btn-menu-active");
        this.ignoreNextClick = this.restoreClick.defer(250, this);
        this.fireEvent("menuhide", this, this.menu);
        delete this.menu.ownerCt
    }
}, restoreClick:function () {
    this.ignoreNextClick = 0
}});
Ext.reg("button", Ext.Button);
Ext.ButtonToggleMgr = function () {
    var a = {};

    function b(e, h) {
        if (h) {
            var f = a[e.toggleGroup];
            for (var d = 0, c = f.length; d < c; d++) {
                if (f[d] != e) {
                    f[d].toggle(false)
                }
            }
        }
    }

    return{register:function (c) {
        if (!c.toggleGroup) {
            return
        }
        var d = a[c.toggleGroup];
        if (!d) {
            d = a[c.toggleGroup] = []
        }
        d.push(c);
        c.on("toggle", b)
    }, unregister:function (c) {
        if (!c.toggleGroup) {
            return
        }
        var d = a[c.toggleGroup];
        if (d) {
            d.remove(c);
            c.un("toggle", b)
        }
    }, getPressed:function (f) {
        var e = a[f];
        if (e) {
            for (var d = 0, c = e.length; d < c; d++) {
                if (e[d].pressed === true) {
                    return e[d]
                }
            }
        }
        return null
    }}
}();
Ext.SplitButton = Ext.extend(Ext.Button, {arrowSelector:"em", split:true, initComponent:function () {
    Ext.SplitButton.superclass.initComponent.call(this);
    this.addEvents("arrowclick")
}, onRender:function () {
    Ext.SplitButton.superclass.onRender.apply(this, arguments);
    if (this.arrowTooltip) {
        this.el.child(this.arrowSelector).dom[this.tooltipType] = this.arrowTooltip
    }
}, setArrowHandler:function (b, a) {
    this.arrowHandler = b;
    this.scope = a
}, getMenuClass:function () {
    return"x-btn-split" + (this.arrowAlign == "bottom" ? "-bottom" : "")
}, isClickOnArrow:function (c) {
    if (this.arrowAlign != "bottom") {
        var b = this.el.child("em.x-btn-split");
        var a = b.getRegion().right - b.getPadding("r");
        return c.getPageX() > a
    } else {
        return c.getPageY() > this.btnEl.getRegion().bottom
    }
}, onClick:function (b, a) {
    b.preventDefault();
    if (!this.disabled) {
        if (this.isClickOnArrow(b)) {
            if (this.menu && !this.menu.isVisible() && !this.ignoreNextClick) {
                this.showMenu()
            }
            this.fireEvent("arrowclick", this, b);
            if (this.arrowHandler) {
                this.arrowHandler.call(this.scope || this, this, b)
            }
        } else {
            this.doToggle();
            this.fireEvent("click", this, b);
            if (this.handler) {
                this.handler.call(this.scope || this, this, b)
            }
        }
    }
}, isMenuTriggerOver:function (a) {
    return this.menu && a.target.tagName == this.arrowSelector
}, isMenuTriggerOut:function (b, a) {
    return this.menu && b.target.tagName != this.arrowSelector
}});
Ext.reg("splitbutton", Ext.SplitButton);
Ext.CycleButton = Ext.extend(Ext.SplitButton, {getItemText:function (a) {
    if (a && this.showText === true) {
        var b = "";
        if (this.prependText) {
            b += this.prependText
        }
        b += a.text;
        return b
    }
    return undefined
}, setActiveItem:function (c, a) {
    if (!Ext.isObject(c)) {
        c = this.menu.getComponent(c)
    }
    if (c) {
        if (!this.rendered) {
            this.text = this.getItemText(c);
            this.iconCls = c.iconCls
        } else {
            var b = this.getItemText(c);
            if (b) {
                this.setText(b)
            }
            this.setIconClass(c.iconCls)
        }
        this.activeItem = c;
        if (!c.checked) {
            c.setChecked(true, a)
        }
        if (this.forceIcon) {
            this.setIconClass(this.forceIcon)
        }
        if (!a) {
            this.fireEvent("change", this, c)
        }
    }
}, getActiveItem:function () {
    return this.activeItem
}, initComponent:function () {
    this.addEvents("change");
    if (this.changeHandler) {
        this.on("change", this.changeHandler, this.scope || this);
        delete this.changeHandler
    }
    this.itemCount = this.items.length;
    this.menu = {cls:"x-cycle-menu", items:[]};
    var a = 0;
    Ext.each(this.items, function (c, b) {
        Ext.apply(c, {group:c.group || this.id, itemIndex:b, checkHandler:this.checkHandler, scope:this, checked:c.checked || false});
        this.menu.items.push(c);
        if (c.checked) {
            a = b
        }
    }, this);
    Ext.CycleButton.superclass.initComponent.call(this);
    this.on("click", this.toggleSelected, this);
    this.setActiveItem(a, true)
}, checkHandler:function (a, b) {
    if (b) {
        this.setActiveItem(a)
    }
}, toggleSelected:function () {
    var a = this.menu;
    a.render();
    if (!a.hasLayout) {
        a.doLayout()
    }
    var d, b;
    for (var c = 1; c < this.itemCount; c++) {
        d = (this.activeItem.itemIndex + c) % this.itemCount;
        b = a.items.itemAt(d);
        if (!b.disabled) {
            b.setChecked(true);
            break
        }
    }
}});
Ext.reg("cycle", Ext.CycleButton);