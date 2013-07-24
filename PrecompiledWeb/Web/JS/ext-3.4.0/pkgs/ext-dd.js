/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(function () {
    var a = Ext.EventManager;
    var b = Ext.lib.Dom;
    Ext.dd.DragDrop = function (e, c, d) {
        if (e) {
            this.init(e, c, d)
        }
    };
    Ext.dd.DragDrop.prototype = {id:null, config:null, dragElId:null, handleElId:null, invalidHandleTypes:null, invalidHandleIds:null, invalidHandleClasses:null, startPageX:0, startPageY:0, groups:null, locked:false, lock:function () {
        this.locked = true
    }, moveOnly:false, unlock:function () {
        this.locked = false
    }, isTarget:true, padding:null, _domRef:null, __ygDragDrop:true, constrainX:false, constrainY:false, minX:0, maxX:0, minY:0, maxY:0, maintainOffset:false, xTicks:null, yTicks:null, primaryButtonOnly:true, available:false, hasOuterHandles:false, b4StartDrag:function (c, d) {
    }, startDrag:function (c, d) {
    }, b4Drag:function (c) {
    }, onDrag:function (c) {
    }, onDragEnter:function (c, d) {
    }, b4DragOver:function (c) {
    }, onDragOver:function (c, d) {
    }, b4DragOut:function (c) {
    }, onDragOut:function (c, d) {
    }, b4DragDrop:function (c) {
    }, onDragDrop:function (c, d) {
    }, onInvalidDrop:function (c) {
    }, b4EndDrag:function (c) {
    }, endDrag:function (c) {
    }, b4MouseDown:function (c) {
    }, onMouseDown:function (c) {
    }, onMouseUp:function (c) {
    }, onAvailable:function () {
    }, defaultPadding:{left:0, right:0, top:0, bottom:0}, constrainTo:function (i, g, n) {
        if (Ext.isNumber(g)) {
            g = {left:g, right:g, top:g, bottom:g}
        }
        g = g || this.defaultPadding;
        var k = Ext.get(this.getEl()).getBox(), d = Ext.get(i), m = d.getScroll(), j, e = d.dom;
        if (e == document.body) {
            j = {x:m.left, y:m.top, width:Ext.lib.Dom.getViewWidth(), height:Ext.lib.Dom.getViewHeight()}
        } else {
            var l = d.getXY();
            j = {x:l[0], y:l[1], width:e.clientWidth, height:e.clientHeight}
        }
        var h = k.y - j.y, f = k.x - j.x;
        this.resetConstraints();
        this.setXConstraint(f - (g.left || 0), j.width - f - k.width - (g.right || 0), this.xTickSize);
        this.setYConstraint(h - (g.top || 0), j.height - h - k.height - (g.bottom || 0), this.yTickSize)
    }, getEl:function () {
        if (!this._domRef) {
            this._domRef = Ext.getDom(this.id)
        }
        return this._domRef
    }, getDragEl:function () {
        return Ext.getDom(this.dragElId)
    }, init:function (e, c, d) {
        this.initTarget(e, c, d);
        a.on(this.id, "mousedown", this.handleMouseDown, this)
    }, initTarget:function (e, c, d) {
        this.config = d || {};
        this.DDM = Ext.dd.DDM;
        this.groups = {};
        if (typeof e !== "string") {
            e = Ext.id(e)
        }
        this.id = e;
        this.addToGroup((c) ? c : "default");
        this.handleElId = e;
        this.setDragElId(e);
        this.invalidHandleTypes = {A:"A"};
        this.invalidHandleIds = {};
        this.invalidHandleClasses = [];
        this.applyConfig();
        this.handleOnAvailable()
    }, applyConfig:function () {
        this.padding = this.config.padding || [0, 0, 0, 0];
        this.isTarget = (this.config.isTarget !== false);
        this.maintainOffset = (this.config.maintainOffset);
        this.primaryButtonOnly = (this.config.primaryButtonOnly !== false)
    }, handleOnAvailable:function () {
        this.available = true;
        this.resetConstraints();
        this.onAvailable()
    }, setPadding:function (e, c, f, d) {
        if (!c && 0 !== c) {
            this.padding = [e, e, e, e]
        } else {
            if (!f && 0 !== f) {
                this.padding = [e, c, e, c]
            } else {
                this.padding = [e, c, f, d]
            }
        }
    }, setInitPosition:function (f, e) {
        var g = this.getEl();
        if (!this.DDM.verifyEl(g)) {
            return
        }
        var d = f || 0;
        var c = e || 0;
        var h = b.getXY(g);
        this.initPageX = h[0] - d;
        this.initPageY = h[1] - c;
        this.lastPageX = h[0];
        this.lastPageY = h[1];
        this.setStartPosition(h)
    }, setStartPosition:function (d) {
        var c = d || b.getXY(this.getEl());
        this.deltaSetXY = null;
        this.startPageX = c[0];
        this.startPageY = c[1]
    }, addToGroup:function (c) {
        this.groups[c] = true;
        this.DDM.regDragDrop(this, c)
    }, removeFromGroup:function (c) {
        if (this.groups[c]) {
            delete this.groups[c]
        }
        this.DDM.removeDDFromGroup(this, c)
    }, setDragElId:function (c) {
        this.dragElId = c
    }, setHandleElId:function (c) {
        if (typeof c !== "string") {
            c = Ext.id(c)
        }
        this.handleElId = c;
        this.DDM.regHandle(this.id, c)
    }, setOuterHandleElId:function (c) {
        if (typeof c !== "string") {
            c = Ext.id(c)
        }
        a.on(c, "mousedown", this.handleMouseDown, this);
        this.setHandleElId(c);
        this.hasOuterHandles = true
    }, unreg:function () {
        a.un(this.id, "mousedown", this.handleMouseDown);
        this._domRef = null;
        this.DDM._remove(this)
    }, destroy:function () {
        this.unreg()
    }, isLocked:function () {
        return(this.DDM.isLocked() || this.locked)
    }, handleMouseDown:function (f, d) {
        if (this.primaryButtonOnly && f.button != 0) {
            return
        }
        if (this.isLocked()) {
            return
        }
        this.DDM.refreshCache(this.groups);
        var c = new Ext.lib.Point(Ext.lib.Event.getPageX(f), Ext.lib.Event.getPageY(f));
        if (!this.hasOuterHandles && !this.DDM.isOverTarget(c, this)) {
        } else {
            if (this.clickValidator(f)) {
                this.setStartPosition();
                this.b4MouseDown(f);
                this.onMouseDown(f);
                this.DDM.handleMouseDown(f, this);
                this.DDM.stopEvent(f)
            } else {
            }
        }
    }, clickValidator:function (d) {
        var c = d.getTarget();
        return(this.isValidHandleChild(c) && (this.id == this.handleElId || this.DDM.handleWasClicked(c, this.id)))
    }, addInvalidHandleType:function (c) {
        var d = c.toUpperCase();
        this.invalidHandleTypes[d] = d
    }, addInvalidHandleId:function (c) {
        if (typeof c !== "string") {
            c = Ext.id(c)
        }
        this.invalidHandleIds[c] = c
    }, addInvalidHandleClass:function (c) {
        this.invalidHandleClasses.push(c)
    }, removeInvalidHandleType:function (c) {
        var d = c.toUpperCase();
        delete this.invalidHandleTypes[d]
    }, removeInvalidHandleId:function (c) {
        if (typeof c !== "string") {
            c = Ext.id(c)
        }
        delete this.invalidHandleIds[c]
    }, removeInvalidHandleClass:function (d) {
        for (var e = 0, c = this.invalidHandleClasses.length; e < c; ++e) {
            if (this.invalidHandleClasses[e] == d) {
                delete this.invalidHandleClasses[e]
            }
        }
    }, isValidHandleChild:function (g) {
        var f = true;
        var j;
        try {
            j = g.nodeName.toUpperCase()
        } catch (h) {
            j = g.nodeName
        }
        f = f && !this.invalidHandleTypes[j];
        f = f && !this.invalidHandleIds[g.id];
        for (var d = 0, c = this.invalidHandleClasses.length; f && d < c; ++d) {
            f = !Ext.fly(g).hasClass(this.invalidHandleClasses[d])
        }
        return f
    }, setXTicks:function (f, c) {
        this.xTicks = [];
        this.xTickSize = c;
        var e = {};
        for (var d = this.initPageX; d >= this.minX; d = d - c) {
            if (!e[d]) {
                this.xTicks[this.xTicks.length] = d;
                e[d] = true
            }
        }
        for (d = this.initPageX; d <= this.maxX; d = d + c) {
            if (!e[d]) {
                this.xTicks[this.xTicks.length] = d;
                e[d] = true
            }
        }
        this.xTicks.sort(this.DDM.numericSort)
    }, setYTicks:function (f, c) {
        this.yTicks = [];
        this.yTickSize = c;
        var e = {};
        for (var d = this.initPageY; d >= this.minY; d = d - c) {
            if (!e[d]) {
                this.yTicks[this.yTicks.length] = d;
                e[d] = true
            }
        }
        for (d = this.initPageY; d <= this.maxY; d = d + c) {
            if (!e[d]) {
                this.yTicks[this.yTicks.length] = d;
                e[d] = true
            }
        }
        this.yTicks.sort(this.DDM.numericSort)
    }, setXConstraint:function (e, d, c) {
        this.leftConstraint = e;
        this.rightConstraint = d;
        this.minX = this.initPageX - e;
        this.maxX = this.initPageX + d;
        if (c) {
            this.setXTicks(this.initPageX, c)
        }
        this.constrainX = true
    }, clearConstraints:function () {
        this.constrainX = false;
        this.constrainY = false;
        this.clearTicks()
    }, clearTicks:function () {
        this.xTicks = null;
        this.yTicks = null;
        this.xTickSize = 0;
        this.yTickSize = 0
    }, setYConstraint:function (c, e, d) {
        this.topConstraint = c;
        this.bottomConstraint = e;
        this.minY = this.initPageY - c;
        this.maxY = this.initPageY + e;
        if (d) {
            this.setYTicks(this.initPageY, d)
        }
        this.constrainY = true
    }, resetConstraints:function () {
        if (this.initPageX || this.initPageX === 0) {
            var d = (this.maintainOffset) ? this.lastPageX - this.initPageX : 0;
            var c = (this.maintainOffset) ? this.lastPageY - this.initPageY : 0;
            this.setInitPosition(d, c)
        } else {
            this.setInitPosition()
        }
        if (this.constrainX) {
            this.setXConstraint(this.leftConstraint, this.rightConstraint, this.xTickSize)
        }
        if (this.constrainY) {
            this.setYConstraint(this.topConstraint, this.bottomConstraint, this.yTickSize)
        }
    }, getTick:function (j, f) {
        if (!f) {
            return j
        } else {
            if (f[0] >= j) {
                return f[0]
            } else {
                for (var d = 0, c = f.length; d < c; ++d) {
                    var e = d + 1;
                    if (f[e] && f[e] >= j) {
                        var h = j - f[d];
                        var g = f[e] - j;
                        return(g > h) ? f[d] : f[e]
                    }
                }
                return f[f.length - 1]
            }
        }
    }, toString:function () {
        return("DragDrop " + this.id)
    }}
})();
if (!Ext.dd.DragDropMgr) {
    Ext.dd.DragDropMgr = function () {
        var a = Ext.EventManager;
        return{ids:{}, handleIds:{}, dragCurrent:null, dragOvers:{}, deltaX:0, deltaY:0, preventDefault:true, stopPropagation:true, initialized:false, locked:false, init:function () {
            this.initialized = true
        }, POINT:0, INTERSECT:1, mode:0, _execOnAll:function (d, c) {
            for (var e in this.ids) {
                for (var b in this.ids[e]) {
                    var f = this.ids[e][b];
                    if (!this.isTypeOfDD(f)) {
                        continue
                    }
                    f[d].apply(f, c)
                }
            }
        }, _onLoad:function () {
            this.init();
            a.on(document, "mouseup", this.handleMouseUp, this, true);
            a.on(document, "mousemove", this.handleMouseMove, this, true);
            a.on(window, "unload", this._onUnload, this, true);
            a.on(window, "resize", this._onResize, this, true)
        }, _onResize:function (b) {
            this._execOnAll("resetConstraints", [])
        }, lock:function () {
            this.locked = true
        }, unlock:function () {
            this.locked = false
        }, isLocked:function () {
            return this.locked
        }, locationCache:{}, useCache:true, clickPixelThresh:3, clickTimeThresh:350, dragThreshMet:false, clickTimeout:null, startX:0, startY:0, regDragDrop:function (c, b) {
            if (!this.initialized) {
                this.init()
            }
            if (!this.ids[b]) {
                this.ids[b] = {}
            }
            this.ids[b][c.id] = c
        }, removeDDFromGroup:function (d, b) {
            if (!this.ids[b]) {
                this.ids[b] = {}
            }
            var c = this.ids[b];
            if (c && c[d.id]) {
                delete c[d.id]
            }
        }, _remove:function (c) {
            for (var b in c.groups) {
                if (b && this.ids[b] && this.ids[b][c.id]) {
                    delete this.ids[b][c.id]
                }
            }
            delete this.handleIds[c.id]
        }, regHandle:function (c, b) {
            if (!this.handleIds[c]) {
                this.handleIds[c] = {}
            }
            this.handleIds[c][b] = b
        }, isDragDrop:function (b) {
            return(this.getDDById(b)) ? true : false
        }, getRelated:function (g, c) {
            var f = [];
            for (var e in g.groups) {
                for (var d in this.ids[e]) {
                    var b = this.ids[e][d];
                    if (!this.isTypeOfDD(b)) {
                        continue
                    }
                    if (!c || b.isTarget) {
                        f[f.length] = b
                    }
                }
            }
            return f
        }, isLegalTarget:function (f, e) {
            var c = this.getRelated(f, true);
            for (var d = 0, b = c.length; d < b; ++d) {
                if (c[d].id == e.id) {
                    return true
                }
            }
            return false
        }, isTypeOfDD:function (b) {
            return(b && b.__ygDragDrop)
        }, isHandle:function (c, b) {
            return(this.handleIds[c] && this.handleIds[c][b])
        }, getDDById:function (c) {
            for (var b in this.ids) {
                if (this.ids[b][c]) {
                    return this.ids[b][c]
                }
            }
            return null
        }, handleMouseDown:function (d, c) {
            if (Ext.QuickTips) {
                Ext.QuickTips.ddDisable()
            }
            if (this.dragCurrent) {
                this.handleMouseUp(d)
            }
            this.currentTarget = d.getTarget();
            this.dragCurrent = c;
            var b = c.getEl();
            this.startX = d.getPageX();
            this.startY = d.getPageY();
            this.deltaX = this.startX - b.offsetLeft;
            this.deltaY = this.startY - b.offsetTop;
            this.dragThreshMet = false;
            this.clickTimeout = setTimeout(function () {
                var e = Ext.dd.DDM;
                e.startDrag(e.startX, e.startY)
            }, this.clickTimeThresh)
        }, startDrag:function (b, c) {
            clearTimeout(this.clickTimeout);
            if (this.dragCurrent) {
                this.dragCurrent.b4StartDrag(b, c);
                this.dragCurrent.startDrag(b, c)
            }
            this.dragThreshMet = true
        }, handleMouseUp:function (b) {
            if (Ext.QuickTips) {
                Ext.QuickTips.ddEnable()
            }
            if (!this.dragCurrent) {
                return
            }
            clearTimeout(this.clickTimeout);
            if (this.dragThreshMet) {
                this.fireEvents(b, true)
            } else {
            }
            this.stopDrag(b);
            this.stopEvent(b)
        }, stopEvent:function (b) {
            if (this.stopPropagation) {
                b.stopPropagation()
            }
            if (this.preventDefault) {
                b.preventDefault()
            }
        }, stopDrag:function (b) {
            if (this.dragCurrent) {
                if (this.dragThreshMet) {
                    this.dragCurrent.b4EndDrag(b);
                    this.dragCurrent.endDrag(b)
                }
                this.dragCurrent.onMouseUp(b)
            }
            this.dragCurrent = null;
            this.dragOvers = {}
        }, handleMouseMove:function (d) {
            if (!this.dragCurrent) {
                return true
            }
            if (Ext.isIE && (d.button !== 0 && d.button !== 1 && d.button !== 2)) {
                this.stopEvent(d);
                return this.handleMouseUp(d)
            }
            if (!this.dragThreshMet) {
                var c = Math.abs(this.startX - d.getPageX());
                var b = Math.abs(this.startY - d.getPageY());
                if (c > this.clickPixelThresh || b > this.clickPixelThresh) {
                    this.startDrag(this.startX, this.startY)
                }
            }
            if (this.dragThreshMet) {
                this.dragCurrent.b4Drag(d);
                this.dragCurrent.onDrag(d);
                if (!this.dragCurrent.moveOnly) {
                    this.fireEvents(d, false)
                }
            }
            this.stopEvent(d);
            return true
        }, fireEvents:function (m, n) {
            var p = this.dragCurrent;
            if (!p || p.isLocked()) {
                return
            }
            var q = m.getPoint();
            var b = [];
            var f = [];
            var k = [];
            var h = [];
            var d = [];
            for (var g in this.dragOvers) {
                var c = this.dragOvers[g];
                if (!this.isTypeOfDD(c)) {
                    continue
                }
                if (!this.isOverTarget(q, c, this.mode)) {
                    f.push(c)
                }
                b[g] = true;
                delete this.dragOvers[g]
            }
            for (var o in p.groups) {
                if ("string" != typeof o) {
                    continue
                }
                for (g in this.ids[o]) {
                    var j = this.ids[o][g];
                    if (!this.isTypeOfDD(j)) {
                        continue
                    }
                    if (j.isTarget && !j.isLocked() && ((j != p) || (p.ignoreSelf === false))) {
                        if (this.isOverTarget(q, j, this.mode)) {
                            if (n) {
                                h.push(j)
                            } else {
                                if (!b[j.id]) {
                                    d.push(j)
                                } else {
                                    k.push(j)
                                }
                                this.dragOvers[j.id] = j
                            }
                        }
                    }
                }
            }
            if (this.mode) {
                if (f.length) {
                    p.b4DragOut(m, f);
                    p.onDragOut(m, f)
                }
                if (d.length) {
                    p.onDragEnter(m, d)
                }
                if (k.length) {
                    p.b4DragOver(m, k);
                    p.onDragOver(m, k)
                }
                if (h.length) {
                    p.b4DragDrop(m, h);
                    p.onDragDrop(m, h)
                }
            } else {
                var l = 0;
                for (g = 0, l = f.length; g < l; ++g) {
                    p.b4DragOut(m, f[g].id);
                    p.onDragOut(m, f[g].id)
                }
                for (g = 0, l = d.length; g < l; ++g) {
                    p.onDragEnter(m, d[g].id)
                }
                for (g = 0, l = k.length; g < l; ++g) {
                    p.b4DragOver(m, k[g].id);
                    p.onDragOver(m, k[g].id)
                }
                for (g = 0, l = h.length; g < l; ++g) {
                    p.b4DragDrop(m, h[g].id);
                    p.onDragDrop(m, h[g].id)
                }
            }
            if (n && !h.length) {
                p.onInvalidDrop(m)
            }
        }, getBestMatch:function (d) {
            var f = null;
            var c = d.length;
            if (c == 1) {
                f = d[0]
            } else {
                for (var e = 0; e < c; ++e) {
                    var b = d[e];
                    if (b.cursorIsOver) {
                        f = b;
                        break
                    } else {
                        if (!f || f.overlap.getArea() < b.overlap.getArea()) {
                            f = b
                        }
                    }
                }
            }
            return f
        }, refreshCache:function (c) {
            for (var b in c) {
                if ("string" != typeof b) {
                    continue
                }
                for (var d in this.ids[b]) {
                    var e = this.ids[b][d];
                    if (this.isTypeOfDD(e)) {
                        var f = this.getLocation(e);
                        if (f) {
                            this.locationCache[e.id] = f
                        } else {
                            delete this.locationCache[e.id]
                        }
                    }
                }
            }
        }, verifyEl:function (c) {
            if (c) {
                var b;
                if (Ext.isIE) {
                    try {
                        b = c.offsetParent
                    } catch (d) {
                    }
                } else {
                    b = c.offsetParent
                }
                if (b) {
                    return true
                }
            }
            return false
        }, getLocation:function (i) {
            if (!this.isTypeOfDD(i)) {
                return null
            }
            var g = i.getEl(), n, f, d, p, o, q, c, m, h, k;
            try {
                n = Ext.lib.Dom.getXY(g)
            } catch (j) {
            }
            if (!n) {
                return null
            }
            f = n[0];
            d = f + g.offsetWidth;
            p = n[1];
            o = p + g.offsetHeight;
            q = p - i.padding[0];
            c = d + i.padding[1];
            m = o + i.padding[2];
            h = f - i.padding[3];
            k = new Ext.lib.Region(q, c, m, h);
            g = Ext.get(g.parentNode);
            while (g && k) {
                if (g.isScrollable()) {
                    k = k.intersect(g.getRegion())
                }
                g = g.parent()
            }
            return k
        }, isOverTarget:function (j, b, d) {
            var f = this.locationCache[b.id];
            if (!f || !this.useCache) {
                f = this.getLocation(b);
                this.locationCache[b.id] = f
            }
            if (!f) {
                return false
            }
            b.cursorIsOver = f.contains(j);
            var i = this.dragCurrent;
            if (!i || !i.getTargetCoord || (!d && !i.constrainX && !i.constrainY)) {
                return b.cursorIsOver
            }
            b.overlap = null;
            var g = i.getTargetCoord(j.x, j.y);
            var c = i.getDragEl();
            var e = new Ext.lib.Region(g.y, g.x + c.offsetWidth, g.y + c.offsetHeight, g.x);
            var h = e.intersect(f);
            if (h) {
                b.overlap = h;
                return(d) ? true : b.cursorIsOver
            } else {
                return false
            }
        }, _onUnload:function (c, b) {
            a.removeListener(document, "mouseup", this.handleMouseUp, this);
            a.removeListener(document, "mousemove", this.handleMouseMove, this);
            a.removeListener(window, "resize", this._onResize, this);
            Ext.dd.DragDropMgr.unregAll()
        }, unregAll:function () {
            if (this.dragCurrent) {
                this.stopDrag();
                this.dragCurrent = null
            }
            this._execOnAll("unreg", []);
            for (var b in this.elementCache) {
                delete this.elementCache[b]
            }
            this.elementCache = {};
            this.ids = {}
        }, elementCache:{}, getElWrapper:function (c) {
            var b = this.elementCache[c];
            if (!b || !b.el) {
                b = this.elementCache[c] = new this.ElementWrapper(Ext.getDom(c))
            }
            return b
        }, getElement:function (b) {
            return Ext.getDom(b)
        }, getCss:function (c) {
            var b = Ext.getDom(c);
            return(b) ? b.style : null
        }, ElementWrapper:function (b) {
            this.el = b || null;
            this.id = this.el && b.id;
            this.css = this.el && b.style
        }, getPosX:function (b) {
            return Ext.lib.Dom.getX(b)
        }, getPosY:function (b) {
            return Ext.lib.Dom.getY(b)
        }, swapNode:function (d, b) {
            if (d.swapNode) {
                d.swapNode(b)
            } else {
                var e = b.parentNode;
                var c = b.nextSibling;
                if (c == d) {
                    e.insertBefore(d, b)
                } else {
                    if (b == d.nextSibling) {
                        e.insertBefore(b, d)
                    } else {
                        d.parentNode.replaceChild(b, d);
                        e.insertBefore(d, c)
                    }
                }
            }
        }, getScroll:function () {
            var d, b, e = document.documentElement, c = document.body;
            if (e && (e.scrollTop || e.scrollLeft)) {
                d = e.scrollTop;
                b = e.scrollLeft
            } else {
                if (c) {
                    d = c.scrollTop;
                    b = c.scrollLeft
                } else {
                }
            }
            return{top:d, left:b}
        }, getStyle:function (c, b) {
            return Ext.fly(c).getStyle(b)
        }, getScrollTop:function () {
            return this.getScroll().top
        }, getScrollLeft:function () {
            return this.getScroll().left
        }, moveToEl:function (b, d) {
            var c = Ext.lib.Dom.getXY(d);
            Ext.lib.Dom.setXY(b, c)
        }, numericSort:function (d, c) {
            return(d - c)
        }, _timeoutCount:0, _addListeners:function () {
            var b = Ext.dd.DDM;
            if (Ext.lib.Event && document) {
                b._onLoad()
            } else {
                if (b._timeoutCount > 2000) {
                } else {
                    setTimeout(b._addListeners, 10);
                    if (document && document.body) {
                        b._timeoutCount += 1
                    }
                }
            }
        }, handleWasClicked:function (b, d) {
            if (this.isHandle(d, b.id)) {
                return true
            } else {
                var c = b.parentNode;
                while (c) {
                    if (this.isHandle(d, c.id)) {
                        return true
                    } else {
                        c = c.parentNode
                    }
                }
            }
            return false
        }}
    }();
    Ext.dd.DDM = Ext.dd.DragDropMgr;
    Ext.dd.DDM._addListeners()
}
Ext.dd.DD = function (c, a, b) {
    if (c) {
        this.init(c, a, b)
    }
};
Ext.extend(Ext.dd.DD, Ext.dd.DragDrop, {scroll:true, autoOffset:function (c, b) {
    var a = c - this.startPageX;
    var d = b - this.startPageY;
    this.setDelta(a, d)
}, setDelta:function (b, a) {
    this.deltaX = b;
    this.deltaY = a
}, setDragElPos:function (c, b) {
    var a = this.getDragEl();
    this.alignElWithMouse(a, c, b)
}, alignElWithMouse:function (c, g, f) {
    var e = this.getTargetCoord(g, f);
    var b = c.dom ? c : Ext.fly(c, "_dd");
    if (!this.deltaSetXY) {
        var h = [e.x, e.y];
        b.setXY(h);
        var d = b.getLeft(true);
        var a = b.getTop(true);
        this.deltaSetXY = [d - e.x, a - e.y]
    } else {
        b.setLeftTop(e.x + this.deltaSetXY[0], e.y + this.deltaSetXY[1])
    }
    this.cachePosition(e.x, e.y);
    this.autoScroll(e.x, e.y, c.offsetHeight, c.offsetWidth);
    return e
}, cachePosition:function (b, a) {
    if (b) {
        this.lastPageX = b;
        this.lastPageY = a
    } else {
        var c = Ext.lib.Dom.getXY(this.getEl());
        this.lastPageX = c[0];
        this.lastPageY = c[1]
    }
}, autoScroll:function (k, j, e, l) {
    if (this.scroll) {
        var m = Ext.lib.Dom.getViewHeight();
        var b = Ext.lib.Dom.getViewWidth();
        var o = this.DDM.getScrollTop();
        var d = this.DDM.getScrollLeft();
        var i = e + j;
        var n = l + k;
        var g = (m + o - j - this.deltaY);
        var f = (b + d - k - this.deltaX);
        var c = 40;
        var a = (document.all) ? 80 : 30;
        if (i > m && g < c) {
            window.scrollTo(d, o + a)
        }
        if (j < o && o > 0 && j - o < c) {
            window.scrollTo(d, o - a)
        }
        if (n > b && f < c) {
            window.scrollTo(d + a, o)
        }
        if (k < d && d > 0 && k - d < c) {
            window.scrollTo(d - a, o)
        }
    }
}, getTargetCoord:function (c, b) {
    var a = c - this.deltaX;
    var d = b - this.deltaY;
    if (this.constrainX) {
        if (a < this.minX) {
            a = this.minX
        }
        if (a > this.maxX) {
            a = this.maxX
        }
    }
    if (this.constrainY) {
        if (d < this.minY) {
            d = this.minY
        }
        if (d > this.maxY) {
            d = this.maxY
        }
    }
    a = this.getTick(a, this.xTicks);
    d = this.getTick(d, this.yTicks);
    return{x:a, y:d}
}, applyConfig:function () {
    Ext.dd.DD.superclass.applyConfig.call(this);
    this.scroll = (this.config.scroll !== false)
}, b4MouseDown:function (a) {
    this.autoOffset(a.getPageX(), a.getPageY())
}, b4Drag:function (a) {
    this.setDragElPos(a.getPageX(), a.getPageY())
}, toString:function () {
    return("DD " + this.id)
}});
Ext.dd.DDProxy = function (c, a, b) {
    if (c) {
        this.init(c, a, b);
        this.initFrame()
    }
};
Ext.dd.DDProxy.dragElId = "ygddfdiv";
Ext.extend(Ext.dd.DDProxy, Ext.dd.DD, {resizeFrame:true, centerFrame:false, createFrame:function () {
    var b = this;
    var a = document.body;
    if (!a || !a.firstChild) {
        setTimeout(function () {
            b.createFrame()
        }, 50);
        return
    }
    var d = this.getDragEl();
    if (!d) {
        d = document.createElement("div");
        d.id = this.dragElId;
        var c = d.style;
        c.position = "absolute";
        c.visibility = "hidden";
        c.cursor = "move";
        c.border = "2px solid #aaa";
        c.zIndex = 999;
        a.insertBefore(d, a.firstChild)
    }
}, initFrame:function () {
    this.createFrame()
}, applyConfig:function () {
    Ext.dd.DDProxy.superclass.applyConfig.call(this);
    this.resizeFrame = (this.config.resizeFrame !== false);
    this.centerFrame = (this.config.centerFrame);
    this.setDragElId(this.config.dragElId || Ext.dd.DDProxy.dragElId)
}, showFrame:function (e, d) {
    var c = this.getEl();
    var a = this.getDragEl();
    var b = a.style;
    this._resizeProxy();
    if (this.centerFrame) {
        this.setDelta(Math.round(parseInt(b.width, 10) / 2), Math.round(parseInt(b.height, 10) / 2))
    }
    this.setDragElPos(e, d);
    Ext.fly(a).show()
}, _resizeProxy:function () {
    if (this.resizeFrame) {
        var a = this.getEl();
        Ext.fly(this.getDragEl()).setSize(a.offsetWidth, a.offsetHeight)
    }
}, b4MouseDown:function (b) {
    var a = b.getPageX();
    var c = b.getPageY();
    this.autoOffset(a, c);
    this.setDragElPos(a, c)
}, b4StartDrag:function (a, b) {
    this.showFrame(a, b)
}, b4EndDrag:function (a) {
    Ext.fly(this.getDragEl()).hide()
}, endDrag:function (c) {
    var b = this.getEl();
    var a = this.getDragEl();
    a.style.visibility = "";
    this.beforeMove();
    b.style.visibility = "hidden";
    Ext.dd.DDM.moveToEl(b, a);
    a.style.visibility = "hidden";
    b.style.visibility = "";
    this.afterDrag()
}, beforeMove:function () {
}, afterDrag:function () {
}, toString:function () {
    return("DDProxy " + this.id)
}});
Ext.dd.DDTarget = function (c, a, b) {
    if (c) {
        this.initTarget(c, a, b)
    }
};
Ext.extend(Ext.dd.DDTarget, Ext.dd.DragDrop, {getDragEl:Ext.emptyFn, isValidHandleChild:Ext.emptyFn, startDrag:Ext.emptyFn, endDrag:Ext.emptyFn, onDrag:Ext.emptyFn, onDragDrop:Ext.emptyFn, onDragEnter:Ext.emptyFn, onDragOut:Ext.emptyFn, onDragOver:Ext.emptyFn, onInvalidDrop:Ext.emptyFn, onMouseDown:Ext.emptyFn, onMouseUp:Ext.emptyFn, setXConstraint:Ext.emptyFn, setYConstraint:Ext.emptyFn, resetConstraints:Ext.emptyFn, clearConstraints:Ext.emptyFn, clearTicks:Ext.emptyFn, setInitPosition:Ext.emptyFn, setDragElId:Ext.emptyFn, setHandleElId:Ext.emptyFn, setOuterHandleElId:Ext.emptyFn, addInvalidHandleClass:Ext.emptyFn, addInvalidHandleId:Ext.emptyFn, addInvalidHandleType:Ext.emptyFn, removeInvalidHandleClass:Ext.emptyFn, removeInvalidHandleId:Ext.emptyFn, removeInvalidHandleType:Ext.emptyFn, toString:function () {
    return("DDTarget " + this.id)
}});
Ext.dd.DragTracker = Ext.extend(Ext.util.Observable, {active:false, tolerance:5, autoStart:false, constructor:function (a) {
    Ext.apply(this, a);
    this.addEvents("mousedown", "mouseup", "mousemove", "dragstart", "dragend", "drag");
    this.dragRegion = new Ext.lib.Region(0, 0, 0, 0);
    if (this.el) {
        this.initEl(this.el)
    }
    Ext.dd.DragTracker.superclass.constructor.call(this, a)
}, initEl:function (a) {
    this.el = Ext.get(a);
    a.on("mousedown", this.onMouseDown, this, this.delegate ? {delegate:this.delegate} : undefined)
}, destroy:function () {
    this.el.un("mousedown", this.onMouseDown, this);
    delete this.el
}, onMouseDown:function (b, a) {
    if (this.fireEvent("mousedown", this, b) !== false && this.onBeforeStart(b) !== false) {
        this.startXY = this.lastXY = b.getXY();
        this.dragTarget = this.delegate ? a : this.el.dom;
        if (this.preventDefault !== false) {
            b.preventDefault()
        }
        Ext.getDoc().on({scope:this, mouseup:this.onMouseUp, mousemove:this.onMouseMove, selectstart:this.stopSelect});
        if (this.autoStart) {
            this.timer = this.triggerStart.defer(this.autoStart === true ? 1000 : this.autoStart, this, [b])
        }
    }
}, onMouseMove:function (d, c) {
    if (this.active && Ext.isIE && !d.browserEvent.button) {
        d.preventDefault();
        this.onMouseUp(d);
        return
    }
    d.preventDefault();
    var b = d.getXY(), a = this.startXY;
    this.lastXY = b;
    if (!this.active) {
        if (Math.abs(a[0] - b[0]) > this.tolerance || Math.abs(a[1] - b[1]) > this.tolerance) {
            this.triggerStart(d)
        } else {
            return
        }
    }
    this.fireEvent("mousemove", this, d);
    this.onDrag(d);
    this.fireEvent("drag", this, d)
}, onMouseUp:function (c) {
    var b = Ext.getDoc(), a = this.active;
    b.un("mousemove", this.onMouseMove, this);
    b.un("mouseup", this.onMouseUp, this);
    b.un("selectstart", this.stopSelect, this);
    c.preventDefault();
    this.clearStart();
    this.active = false;
    delete this.elRegion;
    this.fireEvent("mouseup", this, c);
    if (a) {
        this.onEnd(c);
        this.fireEvent("dragend", this, c)
    }
}, triggerStart:function (a) {
    this.clearStart();
    this.active = true;
    this.onStart(a);
    this.fireEvent("dragstart", this, a)
}, clearStart:function () {
    if (this.timer) {
        clearTimeout(this.timer);
        delete this.timer
    }
}, stopSelect:function (a) {
    a.stopEvent();
    return false
}, onBeforeStart:function (a) {
}, onStart:function (a) {
}, onDrag:function (a) {
}, onEnd:function (a) {
}, getDragTarget:function () {
    return this.dragTarget
}, getDragCt:function () {
    return this.el
}, getXY:function (a) {
    return a ? this.constrainModes[a].call(this, this.lastXY) : this.lastXY
}, getOffset:function (c) {
    var b = this.getXY(c), a = this.startXY;
    return[a[0] - b[0], a[1] - b[1]]
}, constrainModes:{point:function (b) {
    if (!this.elRegion) {
        this.elRegion = this.getDragCt().getRegion()
    }
    var a = this.dragRegion;
    a.left = b[0];
    a.top = b[1];
    a.right = b[0];
    a.bottom = b[1];
    a.constrainTo(this.elRegion);
    return[a.left, a.top]
}}});
Ext.dd.ScrollManager = function () {
    var c = Ext.dd.DragDropMgr;
    var e = {};
    var b = null;
    var h = {};
    var g = function (k) {
        b = null;
        a()
    };
    var i = function () {
        if (c.dragCurrent) {
            c.refreshCache(c.dragCurrent.groups)
        }
    };
    var d = function () {
        if (c.dragCurrent) {
            var k = Ext.dd.ScrollManager;
            var l = h.el.ddScrollConfig ? h.el.ddScrollConfig.increment : k.increment;
            if (!k.animate) {
                if (h.el.scroll(h.dir, l)) {
                    i()
                }
            } else {
                h.el.scroll(h.dir, l, true, k.animDuration, i)
            }
        }
    };
    var a = function () {
        if (h.id) {
            clearInterval(h.id)
        }
        h.id = 0;
        h.el = null;
        h.dir = ""
    };
    var f = function (l, k) {
        a();
        h.el = l;
        h.dir = k;
        var n = l.ddScrollConfig ? l.ddScrollConfig.ddGroup : undefined, m = (l.ddScrollConfig && l.ddScrollConfig.frequency) ? l.ddScrollConfig.frequency : Ext.dd.ScrollManager.frequency;
        if (n === undefined || c.dragCurrent.ddGroup == n) {
            h.id = setInterval(d, m)
        }
    };
    var j = function (n, p) {
        if (p || !c.dragCurrent) {
            return
        }
        var q = Ext.dd.ScrollManager;
        if (!b || b != c.dragCurrent) {
            b = c.dragCurrent;
            q.refreshCache()
        }
        var s = Ext.lib.Event.getXY(n);
        var t = new Ext.lib.Point(s[0], s[1]);
        for (var l in e) {
            var m = e[l], k = m._region;
            var o = m.ddScrollConfig ? m.ddScrollConfig : q;
            if (k && k.contains(t) && m.isScrollable()) {
                if (k.bottom - t.y <= o.vthresh) {
                    if (h.el != m) {
                        f(m, "down")
                    }
                    return
                } else {
                    if (k.right - t.x <= o.hthresh) {
                        if (h.el != m) {
                            f(m, "left")
                        }
                        return
                    } else {
                        if (t.y - k.top <= o.vthresh) {
                            if (h.el != m) {
                                f(m, "up")
                            }
                            return
                        } else {
                            if (t.x - k.left <= o.hthresh) {
                                if (h.el != m) {
                                    f(m, "right")
                                }
                                return
                            }
                        }
                    }
                }
            }
        }
        a()
    };
    c.fireEvents = c.fireEvents.createSequence(j, c);
    c.stopDrag = c.stopDrag.createSequence(g, c);
    return{register:function (m) {
        if (Ext.isArray(m)) {
            for (var l = 0, k = m.length; l < k; l++) {
                this.register(m[l])
            }
        } else {
            m = Ext.get(m);
            e[m.id] = m
        }
    }, unregister:function (m) {
        if (Ext.isArray(m)) {
            for (var l = 0, k = m.length; l < k; l++) {
                this.unregister(m[l])
            }
        } else {
            m = Ext.get(m);
            delete e[m.id]
        }
    }, vthresh:25, hthresh:25, increment:100, frequency:500, animate:true, animDuration:0.4, ddGroup:undefined, refreshCache:function () {
        for (var k in e) {
            if (typeof e[k] == "object") {
                e[k]._region = e[k].getRegion()
            }
        }
    }}
}();
Ext.dd.Registry = function () {
    var d = {};
    var b = {};
    var a = 0;
    var c = function (f, e) {
        if (typeof f == "string") {
            return f
        }
        var g = f.id;
        if (!g && e !== false) {
            g = "extdd-" + (++a);
            f.id = g
        }
        return g
    };
    return{register:function (h, j) {
        j = j || {};
        if (typeof h == "string") {
            h = document.getElementById(h)
        }
        j.ddel = h;
        d[c(h)] = j;
        if (j.isHandle !== false) {
            b[j.ddel.id] = j
        }
        if (j.handles) {
            var g = j.handles;
            for (var f = 0, e = g.length; f < e; f++) {
                b[c(g[f])] = j
            }
        }
    }, unregister:function (h) {
        var k = c(h, false);
        var j = d[k];
        if (j) {
            delete d[k];
            if (j.handles) {
                var g = j.handles;
                for (var f = 0, e = g.length; f < e; f++) {
                    delete b[c(g[f], false)]
                }
            }
        }
    }, getHandle:function (e) {
        if (typeof e != "string") {
            e = e.id
        }
        return b[e]
    }, getHandleFromEvent:function (g) {
        var f = Ext.lib.Event.getTarget(g);
        return f ? b[f.id] : null
    }, getTarget:function (e) {
        if (typeof e != "string") {
            e = e.id
        }
        return d[e]
    }, getTargetFromEvent:function (g) {
        var f = Ext.lib.Event.getTarget(g);
        return f ? d[f.id] || b[f.id] : null
    }}
}();
Ext.dd.StatusProxy = function (a) {
    Ext.apply(this, a);
    this.id = this.id || Ext.id();
    this.el = new Ext.Layer({dh:{id:this.id, tag:"div", cls:"x-dd-drag-proxy " + this.dropNotAllowed, children:[
        {tag:"div", cls:"x-dd-drop-icon"},
        {tag:"div", cls:"x-dd-drag-ghost"}
    ]}, shadow:!a || a.shadow !== false});
    this.ghost = Ext.get(this.el.dom.childNodes[1]);
    this.dropStatus = this.dropNotAllowed
};
Ext.dd.StatusProxy.prototype = {dropAllowed:"x-dd-drop-ok", dropNotAllowed:"x-dd-drop-nodrop", setStatus:function (a) {
    a = a || this.dropNotAllowed;
    if (this.dropStatus != a) {
        this.el.replaceClass(this.dropStatus, a);
        this.dropStatus = a
    }
}, reset:function (a) {
    this.el.dom.className = "x-dd-drag-proxy " + this.dropNotAllowed;
    this.dropStatus = this.dropNotAllowed;
    if (a) {
        this.ghost.update("")
    }
}, update:function (a) {
    if (typeof a == "string") {
        this.ghost.update(a)
    } else {
        this.ghost.update("");
        a.style.margin = "0";
        this.ghost.dom.appendChild(a)
    }
    var b = this.ghost.dom.firstChild;
    if (b) {
        Ext.fly(b).setStyle("float", "none")
    }
}, getEl:function () {
    return this.el
}, getGhost:function () {
    return this.ghost
}, hide:function (a) {
    this.el.hide();
    if (a) {
        this.reset(true)
    }
}, stop:function () {
    if (this.anim && this.anim.isAnimated && this.anim.isAnimated()) {
        this.anim.stop()
    }
}, show:function () {
    this.el.show()
}, sync:function () {
    this.el.sync()
}, repair:function (b, c, a) {
    this.callback = c;
    this.scope = a;
    if (b && this.animRepair !== false) {
        this.el.addClass("x-dd-drag-repair");
        this.el.hideUnders(true);
        this.anim = this.el.shift({duration:this.repairDuration || 0.5, easing:"easeOut", xy:b, stopFx:true, callback:this.afterRepair, scope:this})
    } else {
        this.afterRepair()
    }
}, afterRepair:function () {
    this.hide(true);
    if (typeof this.callback == "function") {
        this.callback.call(this.scope || this)
    }
    this.callback = null;
    this.scope = null
}, destroy:function () {
    Ext.destroy(this.ghost, this.el)
}};
Ext.dd.DragSource = function (b, a) {
    this.el = Ext.get(b);
    if (!this.dragData) {
        this.dragData = {}
    }
    Ext.apply(this, a);
    if (!this.proxy) {
        this.proxy = new Ext.dd.StatusProxy()
    }
    Ext.dd.DragSource.superclass.constructor.call(this, this.el.dom, this.ddGroup || this.group, {dragElId:this.proxy.id, resizeFrame:false, isTarget:false, scroll:this.scroll === true});
    this.dragging = false
};
Ext.extend(Ext.dd.DragSource, Ext.dd.DDProxy, {dropAllowed:"x-dd-drop-ok", dropNotAllowed:"x-dd-drop-nodrop", getDragData:function (a) {
    return this.dragData
}, onDragEnter:function (c, d) {
    var b = Ext.dd.DragDropMgr.getDDById(d);
    this.cachedTarget = b;
    if (this.beforeDragEnter(b, c, d) !== false) {
        if (b.isNotifyTarget) {
            var a = b.notifyEnter(this, c, this.dragData);
            this.proxy.setStatus(a)
        } else {
            this.proxy.setStatus(this.dropAllowed)
        }
        if (this.afterDragEnter) {
            this.afterDragEnter(b, c, d)
        }
    }
}, beforeDragEnter:function (b, a, c) {
    return true
}, alignElWithMouse:function () {
    Ext.dd.DragSource.superclass.alignElWithMouse.apply(this, arguments);
    this.proxy.sync()
}, onDragOver:function (c, d) {
    var b = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(d);
    if (this.beforeDragOver(b, c, d) !== false) {
        if (b.isNotifyTarget) {
            var a = b.notifyOver(this, c, this.dragData);
            this.proxy.setStatus(a)
        }
        if (this.afterDragOver) {
            this.afterDragOver(b, c, d)
        }
    }
}, beforeDragOver:function (b, a, c) {
    return true
}, onDragOut:function (b, c) {
    var a = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(c);
    if (this.beforeDragOut(a, b, c) !== false) {
        if (a.isNotifyTarget) {
            a.notifyOut(this, b, this.dragData)
        }
        this.proxy.reset();
        if (this.afterDragOut) {
            this.afterDragOut(a, b, c)
        }
    }
    this.cachedTarget = null
}, beforeDragOut:function (b, a, c) {
    return true
}, onDragDrop:function (b, c) {
    var a = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(c);
    if (this.beforeDragDrop(a, b, c) !== false) {
        if (a.isNotifyTarget) {
            if (a.notifyDrop(this, b, this.dragData)) {
                this.onValidDrop(a, b, c)
            } else {
                this.onInvalidDrop(a, b, c)
            }
        } else {
            this.onValidDrop(a, b, c)
        }
        if (this.afterDragDrop) {
            this.afterDragDrop(a, b, c)
        }
    }
    delete this.cachedTarget
}, beforeDragDrop:function (b, a, c) {
    return true
}, onValidDrop:function (b, a, c) {
    this.hideProxy();
    if (this.afterValidDrop) {
        this.afterValidDrop(b, a, c)
    }
}, getRepairXY:function (b, a) {
    return this.el.getXY()
}, onInvalidDrop:function (b, a, c) {
    this.beforeInvalidDrop(b, a, c);
    if (this.cachedTarget) {
        if (this.cachedTarget.isNotifyTarget) {
            this.cachedTarget.notifyOut(this, a, this.dragData)
        }
        this.cacheTarget = null
    }
    this.proxy.repair(this.getRepairXY(a, this.dragData), this.afterRepair, this);
    if (this.afterInvalidDrop) {
        this.afterInvalidDrop(a, c)
    }
}, afterRepair:function () {
    if (Ext.enableFx) {
        this.el.highlight(this.hlColor || "c3daf9")
    }
    this.dragging = false
}, beforeInvalidDrop:function (b, a, c) {
    return true
}, handleMouseDown:function (b) {
    if (this.dragging) {
        return
    }
    var a = this.getDragData(b);
    if (a && this.onBeforeDrag(a, b) !== false) {
        this.dragData = a;
        this.proxy.stop();
        Ext.dd.DragSource.superclass.handleMouseDown.apply(this, arguments)
    }
}, onBeforeDrag:function (a, b) {
    return true
}, onStartDrag:Ext.emptyFn, startDrag:function (a, b) {
    this.proxy.reset();
    this.dragging = true;
    this.proxy.update("");
    this.onInitDrag(a, b);
    this.proxy.show()
}, onInitDrag:function (a, c) {
    var b = this.el.dom.cloneNode(true);
    b.id = Ext.id();
    this.proxy.update(b);
    this.onStartDrag(a, c);
    return true
}, getProxy:function () {
    return this.proxy
}, hideProxy:function () {
    this.proxy.hide();
    this.proxy.reset(true);
    this.dragging = false
}, triggerCacheRefresh:function () {
    Ext.dd.DDM.refreshCache(this.groups)
}, b4EndDrag:function (a) {
}, endDrag:function (a) {
    this.onEndDrag(this.dragData, a)
}, onEndDrag:function (a, b) {
}, autoOffset:function (a, b) {
    this.setDelta(-12, -20)
}, destroy:function () {
    Ext.dd.DragSource.superclass.destroy.call(this);
    Ext.destroy(this.proxy)
}});
Ext.dd.DropTarget = Ext.extend(Ext.dd.DDTarget, {constructor:function (b, a) {
    this.el = Ext.get(b);
    Ext.apply(this, a);
    if (this.containerScroll) {
        Ext.dd.ScrollManager.register(this.el)
    }
    Ext.dd.DropTarget.superclass.constructor.call(this, this.el.dom, this.ddGroup || this.group, {isTarget:true})
}, dropAllowed:"x-dd-drop-ok", dropNotAllowed:"x-dd-drop-nodrop", isTarget:true, isNotifyTarget:true, notifyEnter:function (a, c, b) {
    if (this.overClass) {
        this.el.addClass(this.overClass)
    }
    return this.dropAllowed
}, notifyOver:function (a, c, b) {
    return this.dropAllowed
}, notifyOut:function (a, c, b) {
    if (this.overClass) {
        this.el.removeClass(this.overClass)
    }
}, notifyDrop:function (a, c, b) {
    return false
}, destroy:function () {
    Ext.dd.DropTarget.superclass.destroy.call(this);
    if (this.containerScroll) {
        Ext.dd.ScrollManager.unregister(this.el)
    }
}});
Ext.dd.DragZone = Ext.extend(Ext.dd.DragSource, {constructor:function (b, a) {
    Ext.dd.DragZone.superclass.constructor.call(this, b, a);
    if (this.containerScroll) {
        Ext.dd.ScrollManager.register(this.el)
    }
}, getDragData:function (a) {
    return Ext.dd.Registry.getHandleFromEvent(a)
}, onInitDrag:function (a, b) {
    this.proxy.update(this.dragData.ddel.cloneNode(true));
    this.onStartDrag(a, b);
    return true
}, afterRepair:function () {
    if (Ext.enableFx) {
        Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor || "c3daf9")
    }
    this.dragging = false
}, getRepairXY:function (a) {
    return Ext.Element.fly(this.dragData.ddel).getXY()
}, destroy:function () {
    Ext.dd.DragZone.superclass.destroy.call(this);
    if (this.containerScroll) {
        Ext.dd.ScrollManager.unregister(this.el)
    }
}});
Ext.dd.DropZone = function (b, a) {
    Ext.dd.DropZone.superclass.constructor.call(this, b, a)
};
Ext.extend(Ext.dd.DropZone, Ext.dd.DropTarget, {getTargetFromEvent:function (a) {
    return Ext.dd.Registry.getTargetFromEvent(a)
}, onNodeEnter:function (d, a, c, b) {
}, onNodeOver:function (d, a, c, b) {
    return this.dropAllowed
}, onNodeOut:function (d, a, c, b) {
}, onNodeDrop:function (d, a, c, b) {
    return false
}, onContainerOver:function (a, c, b) {
    return this.dropNotAllowed
}, onContainerDrop:function (a, c, b) {
    return false
}, notifyEnter:function (a, c, b) {
    return this.dropNotAllowed
}, notifyOver:function (a, c, b) {
    var d = this.getTargetFromEvent(c);
    if (!d) {
        if (this.lastOverNode) {
            this.onNodeOut(this.lastOverNode, a, c, b);
            this.lastOverNode = null
        }
        return this.onContainerOver(a, c, b)
    }
    if (this.lastOverNode != d) {
        if (this.lastOverNode) {
            this.onNodeOut(this.lastOverNode, a, c, b)
        }
        this.onNodeEnter(d, a, c, b);
        this.lastOverNode = d
    }
    return this.onNodeOver(d, a, c, b)
}, notifyOut:function (a, c, b) {
    if (this.lastOverNode) {
        this.onNodeOut(this.lastOverNode, a, c, b);
        this.lastOverNode = null
    }
}, notifyDrop:function (a, c, b) {
    if (this.lastOverNode) {
        this.onNodeOut(this.lastOverNode, a, c, b);
        this.lastOverNode = null
    }
    var d = this.getTargetFromEvent(c);
    return d ? this.onNodeDrop(d, a, c, b) : this.onContainerDrop(a, c, b)
}, triggerCacheRefresh:function () {
    Ext.dd.DDM.refreshCache(this.groups)
}});
Ext.Element.addMethods({initDD:function (c, b, d) {
    var a = new Ext.dd.DD(Ext.id(this.dom), c, b);
    return Ext.apply(a, d)
}, initDDProxy:function (c, b, d) {
    var a = new Ext.dd.DDProxy(Ext.id(this.dom), c, b);
    return Ext.apply(a, d)
}, initDDTarget:function (c, b, d) {
    var a = new Ext.dd.DDTarget(Ext.id(this.dom), c, b);
    return Ext.apply(a, d)
}});