/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.grid.GridPanel = Ext.extend(Ext.Panel, {autoExpandColumn:false, autoExpandMax:1000, autoExpandMin:50, columnLines:false, ddText:"{0} selected row{1}", deferRowRender:true, enableColumnHide:true, enableColumnMove:true, enableDragDrop:false, enableHdMenu:true, loadMask:false, minColumnWidth:25, stripeRows:false, trackMouseOver:true, stateEvents:["columnmove", "columnresize", "sortchange", "groupchange"], view:null, bubbleEvents:[], rendered:false, viewReady:false, initComponent:function () {
    Ext.grid.GridPanel.superclass.initComponent.call(this);
    if (this.columnLines) {
        this.cls = (this.cls || "") + " x-grid-with-col-lines"
    }
    this.autoScroll = false;
    this.autoWidth = false;
    if (Ext.isArray(this.columns)) {
        this.colModel = new Ext.grid.ColumnModel(this.columns);
        delete this.columns
    }
    if (this.ds) {
        this.store = this.ds;
        delete this.ds
    }
    if (this.cm) {
        this.colModel = this.cm;
        delete this.cm
    }
    if (this.sm) {
        this.selModel = this.sm;
        delete this.sm
    }
    this.store = Ext.StoreMgr.lookup(this.store);
    this.addEvents("click", "dblclick", "contextmenu", "mousedown", "mouseup", "mouseover", "mouseout", "keypress", "keydown", "cellmousedown", "rowmousedown", "headermousedown", "groupmousedown", "rowbodymousedown", "containermousedown", "cellclick", "celldblclick", "rowclick", "rowdblclick", "headerclick", "headerdblclick", "groupclick", "groupdblclick", "containerclick", "containerdblclick", "rowbodyclick", "rowbodydblclick", "rowcontextmenu", "cellcontextmenu", "headercontextmenu", "groupcontextmenu", "containercontextmenu", "rowbodycontextmenu", "bodyscroll", "columnresize", "columnmove", "sortchange", "groupchange", "reconfigure", "viewready")
}, onRender:function (d, a) {
    Ext.grid.GridPanel.superclass.onRender.apply(this, arguments);
    var e = this.getGridEl();
    this.el.addClass("x-grid-panel");
    this.mon(e, {scope:this, mousedown:this.onMouseDown, click:this.onClick, dblclick:this.onDblClick, contextmenu:this.onContextMenu});
    this.relayEvents(e, ["mousedown", "mouseup", "mouseover", "mouseout", "keypress", "keydown"]);
    var b = this.getView();
    b.init(this);
    b.render();
    this.getSelectionModel().init(this)
}, initEvents:function () {
    Ext.grid.GridPanel.superclass.initEvents.call(this);
    if (this.loadMask) {
        this.loadMask = new Ext.LoadMask(this.bwrap, Ext.apply({store:this.store}, this.loadMask))
    }
}, initStateEvents:function () {
    Ext.grid.GridPanel.superclass.initStateEvents.call(this);
    this.mon(this.colModel, "hiddenchange", this.saveState, this, {delay:100})
}, applyState:function (a) {
    var j = this.colModel, f = a.columns, h = this.store, l, g, k;
    if (f) {
        for (var d = 0, e = f.length; d < e; d++) {
            l = f[d];
            g = j.getColumnById(l.id);
            if (g) {
                k = j.getIndexById(l.id);
                j.setState(k, {hidden:l.hidden, width:l.width, sortable:l.sortable});
                if (k != d) {
                    j.moveColumn(k, d)
                }
            }
        }
    }
    if (h) {
        l = a.sort;
        if (l) {
            h[h.remoteSort ? "setDefaultSort" : "sort"](l.field, l.direction)
        }
        l = a.group;
        if (h.groupBy) {
            if (l) {
                h.groupBy(l)
            } else {
                h.clearGrouping()
            }
        }
    }
    var b = Ext.apply({}, a);
    delete b.columns;
    delete b.sort;
    Ext.grid.GridPanel.superclass.applyState.call(this, b)
}, getState:function () {
    var f = {columns:[]}, b = this.store, e, a;
    for (var d = 0, g; (g = this.colModel.config[d]); d++) {
        f.columns[d] = {id:g.id, width:g.width};
        if (g.hidden) {
            f.columns[d].hidden = true
        }
        if (g.sortable) {
            f.columns[d].sortable = true
        }
    }
    if (b) {
        e = b.getSortState();
        if (e) {
            f.sort = e
        }
        if (b.getGroupState) {
            a = b.getGroupState();
            if (a) {
                f.group = a
            }
        }
    }
    return f
}, afterRender:function () {
    Ext.grid.GridPanel.superclass.afterRender.call(this);
    var a = this.view;
    this.on("bodyresize", a.layout, a);
    a.layout(true);
    if (this.deferRowRender) {
        if (!this.deferRowRenderTask) {
            this.deferRowRenderTask = new Ext.util.DelayedTask(a.afterRender, this.view)
        }
        this.deferRowRenderTask.delay(10)
    } else {
        a.afterRender()
    }
    this.viewReady = true
}, reconfigure:function (a, b) {
    var c = this.rendered;
    if (c) {
        if (this.loadMask) {
            this.loadMask.destroy();
            this.loadMask = new Ext.LoadMask(this.bwrap, Ext.apply({}, {store:a}, this.initialConfig.loadMask))
        }
    }
    if (this.view) {
        this.view.initData(a, b)
    }
    this.store = a;
    this.colModel = b;
    if (c) {
        this.view.refresh(true)
    }
    this.fireEvent("reconfigure", this, a, b)
}, onDestroy:function () {
    if (this.deferRowRenderTask && this.deferRowRenderTask.cancel) {
        this.deferRowRenderTask.cancel()
    }
    if (this.rendered) {
        Ext.destroy(this.view, this.loadMask)
    } else {
        if (this.store && this.store.autoDestroy) {
            this.store.destroy()
        }
    }
    Ext.destroy(this.colModel, this.selModel);
    this.store = this.selModel = this.colModel = this.view = this.loadMask = null;
    Ext.grid.GridPanel.superclass.onDestroy.call(this)
}, processEvent:function (a, b) {
    this.view.processEvent(a, b)
}, onClick:function (a) {
    this.processEvent("click", a)
}, onMouseDown:function (a) {
    this.processEvent("mousedown", a)
}, onContextMenu:function (b, a) {
    this.processEvent("contextmenu", b)
}, onDblClick:function (a) {
    this.processEvent("dblclick", a)
}, walkCells:function (j, c, b, e, i) {
    var h = this.colModel, f = h.getColumnCount(), a = this.store, g = a.getCount(), d = true;
    if (b < 0) {
        if (c < 0) {
            j--;
            d = false
        }
        while (j >= 0) {
            if (!d) {
                c = f - 1
            }
            d = false;
            while (c >= 0) {
                if (e.call(i || this, j, c, h) === true) {
                    return[j, c]
                }
                c--
            }
            j--
        }
    } else {
        if (c >= f) {
            j++;
            d = false
        }
        while (j < g) {
            if (!d) {
                c = 0
            }
            d = false;
            while (c < f) {
                if (e.call(i || this, j, c, h) === true) {
                    return[j, c]
                }
                c++
            }
            j++
        }
    }
    return null
}, getGridEl:function () {
    return this.body
}, stopEditing:Ext.emptyFn, getSelectionModel:function () {
    if (!this.selModel) {
        this.selModel = new Ext.grid.RowSelectionModel(this.disableSelection ? {selectRow:Ext.emptyFn} : null)
    }
    return this.selModel
}, getStore:function () {
    return this.store
}, getColumnModel:function () {
    return this.colModel
}, getView:function () {
    if (!this.view) {
        this.view = new Ext.grid.GridView(this.viewConfig)
    }
    return this.view
}, getDragDropText:function () {
    var a = this.selModel.getCount();
    return String.format(this.ddText, a, a == 1 ? "" : "s")
}});
Ext.reg("grid", Ext.grid.GridPanel);
Ext.grid.PivotGrid = Ext.extend(Ext.grid.GridPanel, {aggregator:"sum", renderer:undefined, initComponent:function () {
    Ext.grid.PivotGrid.superclass.initComponent.apply(this, arguments);
    this.initAxes();
    this.enableColumnResize = false;
    this.viewConfig = Ext.apply(this.viewConfig || {}, {forceFit:true});
    this.colModel = new Ext.grid.ColumnModel({})
}, getAggregator:function () {
    if (typeof this.aggregator == "string") {
        return Ext.grid.PivotAggregatorMgr.types[this.aggregator]
    } else {
        return this.aggregator
    }
}, setAggregator:function (a) {
    this.aggregator = a
}, setMeasure:function (a) {
    this.measure = a
}, setLeftAxis:function (b, a) {
    this.leftAxis = b;
    if (a) {
        this.view.refresh()
    }
}, setTopAxis:function (b, a) {
    this.topAxis = b;
    if (a) {
        this.view.refresh()
    }
}, initAxes:function () {
    var a = Ext.grid.PivotAxis;
    if (!(this.leftAxis instanceof a)) {
        this.setLeftAxis(new a({orientation:"vertical", dimensions:this.leftAxis || [], store:this.store}))
    }
    if (!(this.topAxis instanceof a)) {
        this.setTopAxis(new a({orientation:"horizontal", dimensions:this.topAxis || [], store:this.store}))
    }
}, extractData:function () {
    var c = this.store.data.items, r = c.length, p = [], g, f, e, d;
    if (r == 0) {
        return[]
    }
    var h = this.leftAxis.getTuples(), n = h.length, l = this.topAxis.getTuples(), a = l.length, b = this.getAggregator();
    for (f = 0; f < r; f++) {
        g = c[f];
        for (e = 0; e < n; e++) {
            p[e] = p[e] || [];
            if (h[e].matcher(g) === true) {
                for (d = 0; d < a; d++) {
                    p[e][d] = p[e][d] || [];
                    if (l[d].matcher(g)) {
                        p[e][d].push(g)
                    }
                }
            }
        }
    }
    var m = p.length, o, q;
    for (f = 0; f < m; f++) {
        q = p[f];
        o = q.length;
        for (e = 0; e < o; e++) {
            p[f][e] = b(p[f][e], this.measure)
        }
    }
    return p
}, getView:function () {
    if (!this.view) {
        this.view = new Ext.grid.PivotGridView(this.viewConfig)
    }
    return this.view
}});
Ext.reg("pivotgrid", Ext.grid.PivotGrid);
Ext.grid.PivotAggregatorMgr = new Ext.AbstractManager();
Ext.grid.PivotAggregatorMgr.registerType("sum", function (a, c) {
    var e = a.length, d = 0, b;
    for (b = 0; b < e; b++) {
        d += a[b].get(c)
    }
    return d
});
Ext.grid.PivotAggregatorMgr.registerType("avg", function (a, c) {
    var e = a.length, d = 0, b;
    for (b = 0; b < e; b++) {
        d += a[b].get(c)
    }
    return(d / e) || "n/a"
});
Ext.grid.PivotAggregatorMgr.registerType("min", function (a, c) {
    var e = [], d = a.length, b;
    for (b = 0; b < d; b++) {
        e.push(a[b].get(c))
    }
    return Math.min.apply(this, e) || "n/a"
});
Ext.grid.PivotAggregatorMgr.registerType("max", function (a, c) {
    var e = [], d = a.length, b;
    for (b = 0; b < d; b++) {
        e.push(a[b].get(c))
    }
    return Math.max.apply(this, e) || "n/a"
});
Ext.grid.PivotAggregatorMgr.registerType("count", function (a, b) {
    return a.length
});
Ext.grid.GridView = Ext.extend(Ext.util.Observable, {deferEmptyText:true, scrollOffset:undefined, autoFill:false, forceFit:false, sortClasses:["sort-asc", "sort-desc"], sortAscText:"Sort Ascending", sortDescText:"Sort Descending", columnsText:"Columns", selectedRowClass:"x-grid3-row-selected", borderWidth:2, tdClass:"x-grid3-cell", hdCls:"x-grid3-hd", markDirty:true, cellSelectorDepth:4, rowSelectorDepth:10, rowBodySelectorDepth:10, cellSelector:"td.x-grid3-cell", rowSelector:"div.x-grid3-row", rowBodySelector:"div.x-grid3-row-body", firstRowCls:"x-grid3-row-first", lastRowCls:"x-grid3-row-last", rowClsRe:/(?:^|\s+)x-grid3-row-(first|last|alt)(?:\s+|$)/g, headerMenuOpenCls:"x-grid3-hd-menu-open", rowOverCls:"x-grid3-row-over", constructor:function (a) {
    Ext.apply(this, a);
    this.addEvents("beforerowremoved", "beforerowsinserted", "beforerefresh", "rowremoved", "rowsinserted", "rowupdated", "refresh");
    Ext.grid.GridView.superclass.constructor.call(this)
}, masterTpl:new Ext.Template('<div class="x-grid3" hidefocus="true">', '<div class="x-grid3-viewport">', '<div class="x-grid3-header">', '<div class="x-grid3-header-inner">', '<div class="x-grid3-header-offset" style="{ostyle}">{header}</div>', "</div>", '<div class="x-clear"></div>', "</div>", '<div class="x-grid3-scroller">', '<div class="x-grid3-body" style="{bstyle}">{body}</div>', '<a href="#" class="x-grid3-focus" tabIndex="-1"></a>', "</div>", "</div>", '<div class="x-grid3-resize-marker">&#160;</div>', '<div class="x-grid3-resize-proxy">&#160;</div>', "</div>"), headerTpl:new Ext.Template('<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">', "<thead>", '<tr class="x-grid3-hd-row">{cells}</tr>', "</thead>", "</table>"), bodyTpl:new Ext.Template("{rows}"), cellTpl:new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>', '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>', "</td>"), initTemplates:function () {
    var c = this.templates || {}, d, b, f = new Ext.Template('<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}">', '<div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">', this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>' : "", "{value}", '<img alt="" class="x-grid3-sort-icon" src="', Ext.BLANK_IMAGE_URL, '" />', "</div>", "</td>"), a = ['<tr class="x-grid3-row-body-tr" style="{bodyStyle}">', '<td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on">', '<div class="x-grid3-row-body">{body}</div>', "</td>", "</tr>"].join(""), e = ['<table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">', "<tbody>", "<tr>{cells}</tr>", this.enableRowBody ? a : "", "</tbody>", "</table>"].join("");
    Ext.applyIf(c, {hcell:f, cell:this.cellTpl, body:this.bodyTpl, header:this.headerTpl, master:this.masterTpl, row:new Ext.Template('<div class="x-grid3-row {alt}" style="{tstyle}">' + e + "</div>"), rowInner:new Ext.Template(e)});
    for (b in c) {
        d = c[b];
        if (d && Ext.isFunction(d.compile) && !d.compiled) {
            d.disableFormats = true;
            d.compile()
        }
    }
    this.templates = c;
    this.colRe = new RegExp("x-grid3-td-([^\\s]+)", "")
}, fly:function (a) {
    if (!this._flyweight) {
        this._flyweight = new Ext.Element.Flyweight(document.body)
    }
    this._flyweight.dom = a;
    return this._flyweight
}, getEditorParent:function () {
    return this.scroller.dom
}, initElements:function () {
    var b = Ext.Element, d = Ext.get(this.grid.getGridEl().dom.firstChild), e = new b(d.child("div.x-grid3-viewport")), c = new b(e.child("div.x-grid3-header")), a = new b(e.child("div.x-grid3-scroller"));
    if (this.grid.hideHeaders) {
        c.setDisplayed(false)
    }
    if (this.forceFit) {
        a.setStyle("overflow-x", "hidden")
    }
    Ext.apply(this, {el:d, mainWrap:e, scroller:a, mainHd:c, innerHd:c.child("div.x-grid3-header-inner").dom, mainBody:new b(b.fly(a).child("div.x-grid3-body")), focusEl:new b(b.fly(a).child("a")), resizeMarker:new b(d.child("div.x-grid3-resize-marker")), resizeProxy:new b(d.child("div.x-grid3-resize-proxy"))});
    this.focusEl.swallowEvent("click", true)
}, getRows:function () {
    return this.hasRows() ? this.mainBody.dom.childNodes : []
}, findCell:function (a) {
    if (!a) {
        return false
    }
    return this.fly(a).findParent(this.cellSelector, this.cellSelectorDepth)
}, findCellIndex:function (d, c) {
    var b = this.findCell(d), a;
    if (b) {
        a = this.fly(b).hasClass(c);
        if (!c || a) {
            return this.getCellIndex(b)
        }
    }
    return false
}, getCellIndex:function (b) {
    if (b) {
        var a = b.className.match(this.colRe);
        if (a && a[1]) {
            return this.cm.getIndexById(a[1])
        }
    }
    return false
}, findHeaderCell:function (b) {
    var a = this.findCell(b);
    return a && this.fly(a).hasClass(this.hdCls) ? a : null
}, findHeaderIndex:function (a) {
    return this.findCellIndex(a, this.hdCls)
}, findRow:function (a) {
    if (!a) {
        return false
    }
    return this.fly(a).findParent(this.rowSelector, this.rowSelectorDepth)
}, findRowIndex:function (a) {
    var b = this.findRow(a);
    return b ? b.rowIndex : false
}, findRowBody:function (a) {
    if (!a) {
        return false
    }
    return this.fly(a).findParent(this.rowBodySelector, this.rowBodySelectorDepth)
}, getRow:function (a) {
    return this.getRows()[a]
}, getCell:function (b, a) {
    return Ext.fly(this.getRow(b)).query(this.cellSelector)[a]
}, getHeaderCell:function (a) {
    return this.mainHd.dom.getElementsByTagName("td")[a]
}, addRowClass:function (b, a) {
    var c = this.getRow(b);
    if (c) {
        this.fly(c).addClass(a)
    }
}, removeRowClass:function (c, a) {
    var b = this.getRow(c);
    if (b) {
        this.fly(b).removeClass(a)
    }
}, removeRow:function (a) {
    Ext.removeNode(this.getRow(a));
    this.syncFocusEl(a)
}, removeRows:function (c, a) {
    var b = this.mainBody.dom, d;
    for (d = c; d <= a; d++) {
        Ext.removeNode(b.childNodes[c])
    }
    this.syncFocusEl(c)
}, getScrollState:function () {
    var a = this.scroller.dom;
    return{left:a.scrollLeft, top:a.scrollTop}
}, restoreScroll:function (a) {
    var b = this.scroller.dom;
    b.scrollLeft = a.left;
    b.scrollTop = a.top
}, scrollToTop:function () {
    var a = this.scroller.dom;
    a.scrollTop = 0;
    a.scrollLeft = 0
}, syncScroll:function () {
    this.syncHeaderScroll();
    var a = this.scroller.dom;
    this.grid.fireEvent("bodyscroll", a.scrollLeft, a.scrollTop)
}, syncHeaderScroll:function () {
    var a = this.innerHd, b = this.scroller.dom.scrollLeft;
    a.scrollLeft = b;
    a.scrollLeft = b
}, updateSortIcon:function (d, c) {
    var a = this.sortClasses, b = a[c == "DESC" ? 1 : 0], e = this.mainHd.select("td").removeClass(a);
    e.item(d).addClass(b)
}, updateAllColumnWidths:function () {
    var e = this.getTotalWidth(), h = this.cm.getColumnCount(), l = this.getRows(), f = l.length, b = [], k, a, g, d, c;
    for (d = 0; d < h; d++) {
        b[d] = this.getColumnWidth(d);
        this.getHeaderCell(d).style.width = b[d]
    }
    this.updateHeaderWidth();
    for (d = 0; d < f; d++) {
        k = l[d];
        k.style.width = e;
        a = k.firstChild;
        if (a) {
            a.style.width = e;
            g = a.rows[0];
            for (c = 0; c < h; c++) {
                g.childNodes[c].style.width = b[c]
            }
        }
    }
    this.onAllColumnWidthsUpdated(b, e)
}, updateColumnWidth:function (d, b) {
    var c = this.getColumnWidth(d), h = this.getTotalWidth(), g = this.getHeaderCell(d), a = this.getRows(), e = a.length, k, f, j;
    this.updateHeaderWidth();
    g.style.width = c;
    for (f = 0; f < e; f++) {
        k = a[f];
        j = k.firstChild;
        k.style.width = h;
        if (j) {
            j.style.width = h;
            j.rows[0].childNodes[d].style.width = c
        }
    }
    this.onColumnWidthUpdated(d, c, h)
}, updateColumnHidden:function (b, h) {
    var g = this.getTotalWidth(), j = h ? "none" : "", f = this.getHeaderCell(b), a = this.getRows(), d = a.length, k, c, e;
    this.updateHeaderWidth();
    f.style.display = j;
    for (e = 0; e < d; e++) {
        k = a[e];
        k.style.width = g;
        c = k.firstChild;
        if (c) {
            c.style.width = g;
            c.rows[0].childNodes[b].style.display = j
        }
    }
    this.onColumnHiddenUpdated(b, h, g);
    delete this.lastViewWidth;
    this.layout()
}, doRender:function (d, u, l, a, q, s) {
    var g = this.templates, c = g.cell, x = g.row, n = q - 1, b = "width:" + this.getTotalWidth() + ";", h = [], k = [], m = {tstyle:b}, p = {}, v = u.length, w, f, e, t, r, o;
    for (r = 0; r < v; r++) {
        e = u[r];
        k = [];
        o = r + a;
        for (t = 0; t < q; t++) {
            f = d[t];
            p.id = f.id;
            p.css = t === 0 ? "x-grid3-cell-first " : (t == n ? "x-grid3-cell-last " : "");
            p.attr = p.cellAttr = "";
            p.style = f.style;
            p.value = f.renderer.call(f.scope, e.data[f.name], p, e, o, t, l);
            if (Ext.isEmpty(p.value)) {
                p.value = "&#160;"
            }
            if (this.markDirty && e.dirty && typeof e.modified[f.name] != "undefined") {
                p.css += " x-grid3-dirty-cell"
            }
            k[k.length] = c.apply(p)
        }
        w = [];
        if (s && ((o + 1) % 2 === 0)) {
            w[0] = "x-grid3-row-alt"
        }
        if (e.dirty) {
            w[1] = " x-grid3-dirty-row"
        }
        m.cols = q;
        if (this.getRowClass) {
            w[2] = this.getRowClass(e, o, m, l)
        }
        m.alt = w.join(" ");
        m.cells = k.join("");
        h[h.length] = x.apply(m)
    }
    return h.join("")
}, processRows:function (a, f) {
    if (!this.ds || this.ds.getCount() < 1) {
        return
    }
    var d = this.getRows(), c = d.length, e, b;
    f = f || !this.grid.stripeRows;
    a = a || 0;
    for (b = 0; b < c; b++) {
        e = d[b];
        if (e) {
            e.rowIndex = b;
            if (!f) {
                e.className = e.className.replace(this.rowClsRe, " ");
                if ((b + 1) % 2 === 0) {
                    e.className += " x-grid3-row-alt"
                }
            }
        }
    }
    if (a === 0) {
        Ext.fly(d[0]).addClass(this.firstRowCls)
    }
    Ext.fly(d[c - 1]).addClass(this.lastRowCls)
}, afterRender:function () {
    if (!this.ds || !this.cm) {
        return
    }
    this.mainBody.dom.innerHTML = this.renderBody() || "&#160;";
    this.processRows(0, true);
    if (this.deferEmptyText !== true) {
        this.applyEmptyText()
    }
    this.grid.fireEvent("viewready", this.grid)
}, afterRenderUI:function () {
    var a = this.grid;
    this.initElements();
    Ext.fly(this.innerHd).on("click", this.handleHdDown, this);
    this.mainHd.on({scope:this, mouseover:this.handleHdOver, mouseout:this.handleHdOut, mousemove:this.handleHdMove});
    this.scroller.on("scroll", this.syncScroll, this);
    if (a.enableColumnResize !== false) {
        this.splitZone = new Ext.grid.GridView.SplitDragZone(a, this.mainHd.dom)
    }
    if (a.enableColumnMove) {
        this.columnDrag = new Ext.grid.GridView.ColumnDragZone(a, this.innerHd);
        this.columnDrop = new Ext.grid.HeaderDropZone(a, this.mainHd.dom)
    }
    if (a.enableHdMenu !== false) {
        this.hmenu = new Ext.menu.Menu({id:a.id + "-hctx"});
        this.hmenu.add({itemId:"asc", text:this.sortAscText, cls:"xg-hmenu-sort-asc"}, {itemId:"desc", text:this.sortDescText, cls:"xg-hmenu-sort-desc"});
        if (a.enableColumnHide !== false) {
            this.colMenu = new Ext.menu.Menu({id:a.id + "-hcols-menu"});
            this.colMenu.on({scope:this, beforeshow:this.beforeColMenuShow, itemclick:this.handleHdMenuClick});
            this.hmenu.add("-", {itemId:"columns", hideOnClick:false, text:this.columnsText, menu:this.colMenu, iconCls:"x-cols-icon"})
        }
        this.hmenu.on("itemclick", this.handleHdMenuClick, this)
    }
    if (a.trackMouseOver) {
        this.mainBody.on({scope:this, mouseover:this.onRowOver, mouseout:this.onRowOut})
    }
    if (a.enableDragDrop || a.enableDrag) {
        this.dragZone = new Ext.grid.GridDragZone(a, {ddGroup:a.ddGroup || "GridDD"})
    }
    this.updateHeaderSortState()
}, renderUI:function () {
    var a = this.templates;
    return a.master.apply({body:a.body.apply({rows:"&#160;"}), header:this.renderHeaders(), ostyle:"width:" + this.getOffsetWidth() + ";", bstyle:"width:" + this.getTotalWidth() + ";"})
}, processEvent:function (b, g) {
    var h = g.getTarget(), a = this.grid, d = this.findHeaderIndex(h), j, i, c, f;
    a.fireEvent(b, g);
    if (d !== false) {
        a.fireEvent("header" + b, a, d, g)
    } else {
        j = this.findRowIndex(h);
        if (j !== false) {
            i = this.findCellIndex(h);
            if (i !== false) {
                c = a.colModel.getColumnAt(i);
                if (a.fireEvent("cell" + b, a, j, i, g) !== false) {
                    if (!c || (c.processEvent && (c.processEvent(b, g, a, j, i) !== false))) {
                        a.fireEvent("row" + b, a, j, g)
                    }
                }
            } else {
                if (a.fireEvent("row" + b, a, j, g) !== false) {
                    (f = this.findRowBody(h)) && a.fireEvent("rowbody" + b, a, j, g)
                }
            }
        } else {
            a.fireEvent("container" + b, a, g)
        }
    }
}, layout:function (i) {
    if (!this.mainBody) {
        return
    }
    var a = this.grid, d = a.getGridEl(), c = d.getSize(true), h = c.width, b = c.height, g = this.scroller, f, e, j;
    if (h < 20 || b < 20) {
        return
    }
    if (a.autoHeight) {
        f = g.dom.style;
        f.overflow = "visible";
        if (Ext.isWebKit) {
            f.position = "static"
        }
    } else {
        this.el.setSize(h, b);
        e = this.mainHd.getHeight();
        j = b - e;
        g.setSize(h, j);
        if (this.innerHd) {
            this.innerHd.style.width = (h) + "px"
        }
    }
    if (this.forceFit || (i === true && this.autoFill)) {
        if (this.lastViewWidth != h) {
            this.fitColumns(false, false);
            this.lastViewWidth = h
        }
    } else {
        this.autoExpand();
        this.syncHeaderScroll()
    }
    this.onLayout(h, j)
}, onLayout:function (a, b) {
}, onColumnWidthUpdated:function (c, a, b) {
}, onAllColumnWidthsUpdated:function (a, b) {
}, onColumnHiddenUpdated:function (b, c, a) {
}, updateColumnText:function (a, b) {
}, afterMove:function (a) {
}, init:function (a) {
    this.grid = a;
    this.initTemplates();
    this.initData(a.store, a.colModel);
    this.initUI(a)
}, getColumnId:function (a) {
    return this.cm.getColumnId(a)
}, getOffsetWidth:function () {
    return(this.cm.getTotalWidth() + this.getScrollOffset()) + "px"
}, getScrollOffset:function () {
    return Ext.num(this.scrollOffset, Ext.getScrollBarWidth())
}, renderHeaders:function () {
    var e = this.cm, f = this.templates, a = f.hcell, d = {}, g = e.getColumnCount(), h = g - 1, j = [], c, b;
    for (c = 0; c < g; c++) {
        if (c == 0) {
            b = "x-grid3-cell-first "
        } else {
            b = c == h ? "x-grid3-cell-last " : ""
        }
        d = {id:e.getColumnId(c), value:e.getColumnHeader(c) || "", style:this.getColumnStyle(c, true), css:b, tooltip:this.getColumnTooltip(c)};
        if (e.config[c].align == "right") {
            d.istyle = "padding-right: 16px;"
        } else {
            delete d.istyle
        }
        j[c] = a.apply(d)
    }
    return f.header.apply({cells:j.join(""), tstyle:String.format("width: {0};", this.getTotalWidth())})
}, getColumnTooltip:function (a) {
    var b = this.cm.getColumnTooltip(a);
    if (b) {
        if (Ext.QuickTips.isEnabled()) {
            return'ext:qtip="' + b + '"'
        } else {
            return'title="' + b + '"'
        }
    }
    return""
}, beforeUpdate:function () {
    this.grid.stopEditing(true)
}, updateHeaders:function () {
    this.innerHd.firstChild.innerHTML = this.renderHeaders();
    this.updateHeaderWidth(false)
}, updateHeaderWidth:function (c) {
    var b = this.innerHd.firstChild, a = this.getTotalWidth();
    b.style.width = this.getOffsetWidth();
    b.firstChild.style.width = a;
    if (c !== false) {
        this.mainBody.dom.style.width = a
    }
}, focusRow:function (a) {
    this.focusCell(a, 0, false)
}, focusCell:function (d, b, c) {
    this.syncFocusEl(this.ensureVisible(d, b, c));
    var a = this.focusEl;
    if (Ext.isGecko) {
        a.focus()
    } else {
        a.focus.defer(1, a)
    }
}, resolveCell:function (g, d, f) {
    if (!Ext.isNumber(g)) {
        g = g.rowIndex
    }
    if (!this.ds) {
        return null
    }
    if (g < 0 || g >= this.ds.getCount()) {
        return null
    }
    d = (d !== undefined ? d : 0);
    var c = this.getRow(g), b = this.cm, e = b.getColumnCount(), a;
    if (!(f === false && d === 0)) {
        while (d < e && b.isHidden(d)) {
            d++
        }
        a = this.getCell(g, d)
    }
    return{row:c, cell:a}
}, getResolvedXY:function (b) {
    if (!b) {
        return null
    }
    var a = b.cell, c = b.row;
    if (a) {
        return Ext.fly(a).getXY()
    } else {
        return[this.el.getX(), Ext.fly(c).getY()]
    }
}, syncFocusEl:function (d, a, c) {
    var b = d;
    if (!Ext.isArray(b)) {
        d = Math.min(d, Math.max(0, this.getRows().length - 1));
        if (isNaN(d)) {
            return
        }
        b = this.getResolvedXY(this.resolveCell(d, a, c))
    }
    this.focusEl.setXY(b || this.scroller.getXY())
}, ensureVisible:function (s, f, e) {
    var q = this.resolveCell(s, f, e);
    if (!q || !q.row) {
        return null
    }
    var j = q.row, g = q.cell, m = this.scroller.dom, d = j, r = 0, n = this.el.dom;
    while (d && d != n) {
        r += d.offsetTop;
        d = d.offsetParent
    }
    r -= this.mainHd.dom.offsetHeight;
    n = parseInt(m.scrollTop, 10);
    var o = r + j.offsetHeight, a = m.clientHeight, l = n + a;
    if (r < n) {
        m.scrollTop = r
    } else {
        if (o > l) {
            m.scrollTop = o - a
        }
    }
    if (e !== false) {
        var k = parseInt(g.offsetLeft, 10), i = k + g.offsetWidth, h = parseInt(m.scrollLeft, 10), b = h + m.clientWidth;
        if (k < h) {
            m.scrollLeft = k
        } else {
            if (i > b) {
                m.scrollLeft = i - m.clientWidth
            }
        }
    }
    return this.getResolvedXY(q)
}, insertRows:function (a, h, e, g) {
    var d = a.getCount() - 1;
    if (!g && h === 0 && e >= d) {
        this.fireEvent("beforerowsinserted", this, h, e);
        this.refresh();
        this.fireEvent("rowsinserted", this, h, e)
    } else {
        if (!g) {
            this.fireEvent("beforerowsinserted", this, h, e)
        }
        var b = this.renderRows(h, e), f = this.getRow(h);
        if (f) {
            if (h === 0) {
                Ext.fly(this.getRow(0)).removeClass(this.firstRowCls)
            }
            Ext.DomHelper.insertHtml("beforeBegin", f, b)
        } else {
            var c = this.getRow(d - 1);
            if (c) {
                Ext.fly(c).removeClass(this.lastRowCls)
            }
            Ext.DomHelper.insertHtml("beforeEnd", this.mainBody.dom, b)
        }
        if (!g) {
            this.processRows(h);
            this.fireEvent("rowsinserted", this, h, e)
        } else {
            if (h === 0 || h >= d) {
                Ext.fly(this.getRow(h)).addClass(h === 0 ? this.firstRowCls : this.lastRowCls)
            }
        }
    }
    this.syncFocusEl(h)
}, deleteRows:function (a, c, b) {
    if (a.getRowCount() < 1) {
        this.refresh()
    } else {
        this.fireEvent("beforerowsdeleted", this, c, b);
        this.removeRows(c, b);
        this.processRows(c);
        this.fireEvent("rowsdeleted", this, c, b)
    }
}, getColumnStyle:function (b, d) {
    var a = this.cm, f = a.config, c = d ? "" : f[b].css || "", e = f[b].align;
    c += String.format("width: {0};", this.getColumnWidth(b));
    if (a.isHidden(b)) {
        c += "display: none; "
    }
    if (e) {
        c += String.format("text-align: {0};", e)
    }
    return c
}, getColumnWidth:function (b) {
    var c = this.cm.getColumnWidth(b), a = this.borderWidth;
    if (Ext.isNumber(c)) {
        if (Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2)) {
            return c + "px"
        } else {
            return Math.max(c - a, 0) + "px"
        }
    } else {
        return c
    }
}, getTotalWidth:function () {
    return this.cm.getTotalWidth() + "px"
}, fitColumns:function (f, h, g) {
    var a = this.grid, k = this.cm, r = k.getTotalWidth(false), p = this.getGridInnerWidth(), q = p - r, c = [], n = 0, m = 0, t, d, o;
    if (p < 20 || q === 0) {
        return false
    }
    var e = k.getColumnCount(true), l = k.getColumnCount(false), b = e - (Ext.isNumber(g) ? 1 : 0);
    if (b === 0) {
        b = 1;
        g = undefined
    }
    for (o = 0; o < l; o++) {
        if (!k.isFixed(o) && o !== g) {
            t = k.getColumnWidth(o);
            c.push(o, t);
            if (!k.isHidden(o)) {
                n = o;
                m += t
            }
        }
    }
    d = (p - k.getTotalWidth()) / m;
    while (c.length) {
        t = c.pop();
        o = c.pop();
        k.setColumnWidth(o, Math.max(a.minColumnWidth, Math.floor(t + t * d)), true)
    }
    r = k.getTotalWidth(false);
    if (r > p) {
        var s = (b == e) ? n : g, j = Math.max(1, k.getColumnWidth(s) - (r - p));
        k.setColumnWidth(s, j, true)
    }
    if (f !== true) {
        this.updateAllColumnWidths()
    }
    return true
}, autoExpand:function (j) {
    var a = this.grid, h = this.cm, e = this.getGridInnerWidth(), c = h.getTotalWidth(false), f = a.autoExpandColumn;
    if (!this.userResized && f) {
        if (e != c) {
            var i = h.getIndexById(f), b = h.getColumnWidth(i), g = e - c + b, d = Math.min(Math.max(g, a.autoExpandMin), a.autoExpandMax);
            if (b != d) {
                h.setColumnWidth(i, d, true);
                if (j !== true) {
                    this.updateColumnWidth(i, d)
                }
            }
        }
    }
}, getGridInnerWidth:function () {
    return this.grid.getGridEl().getWidth(true) - this.getScrollOffset()
}, getColumnData:function () {
    var e = [], c = this.cm, f = c.getColumnCount(), a = this.ds.fields, d, b;
    for (d = 0; d < f; d++) {
        b = c.getDataIndex(d);
        e[d] = {name:Ext.isDefined(b) ? b : (a.get(d) ? a.get(d).name : undefined), renderer:c.getRenderer(d), scope:c.getRendererScope(d), id:c.getColumnId(d), style:this.getColumnStyle(d)}
    }
    return e
}, renderRows:function (h, c) {
    var a = this.grid, f = a.store, i = a.stripeRows, e = a.colModel, g = e.getColumnCount(), d = f.getCount(), b;
    if (d < 1) {
        return""
    }
    h = h || 0;
    c = Ext.isDefined(c) ? c : d - 1;
    b = f.getRange(h, c);
    return this.doRender(this.getColumnData(), b, f, h, g, i)
}, renderBody:function () {
    var a = this.renderRows() || "&#160;";
    return this.templates.body.apply({rows:a})
}, refreshRow:function (f) {
    var k = this.ds, l = this.cm.getColumnCount(), c = this.getColumnData(), m = l - 1, o = ["x-grid3-row"], e = {tstyle:String.format("width: {0};", this.getTotalWidth())}, a = [], j = this.templates.cell, h, p, b, n, g, d;
    if (Ext.isNumber(f)) {
        h = f;
        f = k.getAt(h)
    } else {
        h = k.indexOf(f)
    }
    if (!f || h < 0) {
        return
    }
    for (d = 0; d < l; d++) {
        b = c[d];
        if (d == 0) {
            g = "x-grid3-cell-first"
        } else {
            g = (d == m) ? "x-grid3-cell-last " : ""
        }
        n = {id:b.id, style:b.style, css:g, attr:"", cellAttr:""};
        n.value = b.renderer.call(b.scope, f.data[b.name], n, f, h, d, k);
        if (Ext.isEmpty(n.value)) {
            n.value = "&#160;"
        }
        if (this.markDirty && f.dirty && typeof f.modified[b.name] != "undefined") {
            n.css += " x-grid3-dirty-cell"
        }
        a[d] = j.apply(n)
    }
    p = this.getRow(h);
    p.className = "";
    if (this.grid.stripeRows && ((h + 1) % 2 === 0)) {
        o.push("x-grid3-row-alt")
    }
    if (this.getRowClass) {
        e.cols = l;
        o.push(this.getRowClass(f, h, e, k))
    }
    this.fly(p).addClass(o).setStyle(e.tstyle);
    e.cells = a.join("");
    p.innerHTML = this.templates.rowInner.apply(e);
    this.fireEvent("rowupdated", this, h, f)
}, refresh:function (b) {
    this.fireEvent("beforerefresh", this);
    this.grid.stopEditing(true);
    var a = this.renderBody();
    this.mainBody.update(a).setWidth(this.getTotalWidth());
    if (b === true) {
        this.updateHeaders();
        this.updateHeaderSortState()
    }
    this.processRows(0, true);
    this.layout();
    this.applyEmptyText();
    this.fireEvent("refresh", this)
}, applyEmptyText:function () {
    if (this.emptyText && !this.hasRows()) {
        this.mainBody.update('<div class="x-grid-empty">' + this.emptyText + "</div>")
    }
}, updateHeaderSortState:function () {
    var b = this.ds.getSortState();
    if (!b) {
        return
    }
    if (!this.sortState || (this.sortState.field != b.field || this.sortState.direction != b.direction)) {
        this.grid.fireEvent("sortchange", this.grid, b)
    }
    this.sortState = b;
    var c = this.cm.findColumnIndex(b.field);
    if (c != -1) {
        var a = b.direction;
        this.updateSortIcon(c, a)
    }
}, clearHeaderSortState:function () {
    if (!this.sortState) {
        return
    }
    this.grid.fireEvent("sortchange", this.grid, null);
    this.mainHd.select("td").removeClass(this.sortClasses);
    delete this.sortState
}, destroy:function () {
    var i = this, a = i.grid, d = a.getGridEl(), h = i.dragZone, f = i.splitZone, g = i.columnDrag, e = i.columnDrop, j = i.scrollToTopTask, c, b;
    if (j && j.cancel) {
        j.cancel()
    }
    Ext.destroyMembers(i, "colMenu", "hmenu");
    i.initData(null, null);
    i.purgeListeners();
    Ext.fly(i.innerHd).un("click", i.handleHdDown, i);
    if (a.enableColumnMove) {
        c = g.dragData;
        b = g.proxy;
        Ext.destroy(g.el, b.ghost, b.el, e.el, e.proxyTop, e.proxyBottom, c.ddel, c.header);
        if (b.anim) {
            Ext.destroy(b.anim)
        }
        delete b.ghost;
        delete c.ddel;
        delete c.header;
        g.destroy();
        delete Ext.dd.DDM.locationCache[g.id];
        delete g._domRef;
        delete e.proxyTop;
        delete e.proxyBottom;
        e.destroy();
        delete Ext.dd.DDM.locationCache["gridHeader" + d.id];
        delete e._domRef;
        delete Ext.dd.DDM.ids[e.ddGroup]
    }
    if (f) {
        f.destroy();
        delete f._domRef;
        delete Ext.dd.DDM.ids["gridSplitters" + d.id]
    }
    Ext.fly(i.innerHd).removeAllListeners();
    Ext.removeNode(i.innerHd);
    delete i.innerHd;
    Ext.destroy(i.el, i.mainWrap, i.mainHd, i.scroller, i.mainBody, i.focusEl, i.resizeMarker, i.resizeProxy, i.activeHdBtn, i._flyweight, h, f);
    delete a.container;
    if (h) {
        h.destroy()
    }
    Ext.dd.DDM.currentTarget = null;
    delete Ext.dd.DDM.locationCache[d.id];
    Ext.EventManager.removeResizeListener(i.onWindowResize, i)
}, onDenyColumnHide:function () {
}, render:function () {
    if (this.autoFill) {
        var a = this.grid.ownerCt;
        if (a && a.getLayout()) {
            a.on("afterlayout", function () {
                this.fitColumns(true, true);
                this.updateHeaders();
                this.updateHeaderSortState()
            }, this, {single:true})
        }
    } else {
        if (this.forceFit) {
            this.fitColumns(true, false)
        } else {
            if (this.grid.autoExpandColumn) {
                this.autoExpand(true)
            }
        }
    }
    this.grid.getGridEl().dom.innerHTML = this.renderUI();
    this.afterRenderUI()
}, initData:function (a, e) {
    var b = this;
    if (b.ds) {
        var d = b.ds;
        d.un("add", b.onAdd, b);
        d.un("load", b.onLoad, b);
        d.un("clear", b.onClear, b);
        d.un("remove", b.onRemove, b);
        d.un("update", b.onUpdate, b);
        d.un("datachanged", b.onDataChange, b);
        if (d !== a && d.autoDestroy) {
            d.destroy()
        }
    }
    if (a) {
        a.on({scope:b, load:b.onLoad, add:b.onAdd, remove:b.onRemove, update:b.onUpdate, clear:b.onClear, datachanged:b.onDataChange})
    }
    if (b.cm) {
        var c = b.cm;
        c.un("configchange", b.onColConfigChange, b);
        c.un("widthchange", b.onColWidthChange, b);
        c.un("headerchange", b.onHeaderChange, b);
        c.un("hiddenchange", b.onHiddenChange, b);
        c.un("columnmoved", b.onColumnMove, b)
    }
    if (e) {
        delete b.lastViewWidth;
        e.on({scope:b, configchange:b.onColConfigChange, widthchange:b.onColWidthChange, headerchange:b.onHeaderChange, hiddenchange:b.onHiddenChange, columnmoved:b.onColumnMove})
    }
    b.ds = a;
    b.cm = e
}, onDataChange:function () {
    this.refresh(true);
    this.updateHeaderSortState();
    this.syncFocusEl(0)
}, onClear:function () {
    this.refresh();
    this.syncFocusEl(0)
}, onUpdate:function (b, a) {
    this.refreshRow(a)
}, onAdd:function (b, a, c) {
    this.insertRows(b, c, c + (a.length - 1))
}, onRemove:function (b, a, c, d) {
    if (d !== true) {
        this.fireEvent("beforerowremoved", this, c, a)
    }
    this.removeRow(c);
    if (d !== true) {
        this.processRows(c);
        this.applyEmptyText();
        this.fireEvent("rowremoved", this, c, a)
    }
}, onLoad:function () {
    if (Ext.isGecko) {
        if (!this.scrollToTopTask) {
            this.scrollToTopTask = new Ext.util.DelayedTask(this.scrollToTop, this)
        }
        this.scrollToTopTask.delay(1)
    } else {
        this.scrollToTop()
    }
}, onColWidthChange:function (a, b, c) {
    this.updateColumnWidth(b, c)
}, onHeaderChange:function (a, b, c) {
    this.updateHeaders()
}, onHiddenChange:function (a, b, c) {
    this.updateColumnHidden(b, c)
}, onColumnMove:function (a, c, b) {
    this.indexMap = null;
    this.refresh(true);
    this.restoreScroll(this.getScrollState());
    this.afterMove(b);
    this.grid.fireEvent("columnmove", c, b)
}, onColConfigChange:function () {
    delete this.lastViewWidth;
    this.indexMap = null;
    this.refresh(true)
}, initUI:function (a) {
    a.on("headerclick", this.onHeaderClick, this)
}, initEvents:Ext.emptyFn, onHeaderClick:function (b, a) {
    if (this.headersDisabled || !this.cm.isSortable(a)) {
        return
    }
    b.stopEditing(true);
    b.store.sort(this.cm.getDataIndex(a))
}, onRowOver:function (b, a) {
    var c = this.findRowIndex(a);
    if (c !== false) {
        this.addRowClass(c, this.rowOverCls)
    }
}, onRowOut:function (b, a) {
    var c = this.findRowIndex(a);
    if (c !== false && !b.within(this.getRow(c), true)) {
        this.removeRowClass(c, this.rowOverCls)
    }
}, onRowSelect:function (a) {
    this.addRowClass(a, this.selectedRowClass)
}, onRowDeselect:function (a) {
    this.removeRowClass(a, this.selectedRowClass)
}, onCellSelect:function (c, b) {
    var a = this.getCell(c, b);
    if (a) {
        this.fly(a).addClass("x-grid3-cell-selected")
    }
}, onCellDeselect:function (c, b) {
    var a = this.getCell(c, b);
    if (a) {
        this.fly(a).removeClass("x-grid3-cell-selected")
    }
}, handleWheel:function (a) {
    a.stopPropagation()
}, onColumnSplitterMoved:function (a, b) {
    this.userResized = true;
    this.grid.colModel.setColumnWidth(a, b, true);
    if (this.forceFit) {
        this.fitColumns(true, false, a);
        this.updateAllColumnWidths()
    } else {
        this.updateColumnWidth(a, b);
        this.syncHeaderScroll()
    }
    this.grid.fireEvent("columnresize", a, b)
}, beforeColMenuShow:function () {
    var b = this.cm, d = b.getColumnCount(), a = this.colMenu, c;
    a.removeAll();
    for (c = 0; c < d; c++) {
        if (b.config[c].hideable !== false) {
            a.add(new Ext.menu.CheckItem({text:b.getColumnHeader(c), itemId:"col-" + b.getColumnId(c), checked:!b.isHidden(c), disabled:b.config[c].hideable === false, hideOnClick:false}))
        }
    }
}, handleHdMenuClick:function (c) {
    var a = this.ds, b = this.cm.getDataIndex(this.hdCtxIndex);
    switch (c.getItemId()) {
        case"asc":
            a.sort(b, "ASC");
            break;
        case"desc":
            a.sort(b, "DESC");
            break;
        default:
            this.handleHdMenuClickDefault(c)
    }
    return true
}, handleHdMenuClickDefault:function (c) {
    var b = this.cm, d = c.getItemId(), a = b.getIndexById(d.substr(4));
    if (a != -1) {
        if (c.checked && b.getColumnsBy(this.isHideableColumn, this).length <= 1) {
            this.onDenyColumnHide();
            return
        }
        b.setHidden(a, c.checked)
    }
}, handleHdDown:function (h, i) {
    if (Ext.fly(i).hasClass("x-grid3-hd-btn")) {
        h.stopEvent();
        var j = this.cm, f = this.findHeaderCell(i), g = this.getCellIndex(f), d = j.isSortable(g), c = this.hmenu, b = c.items, a = this.headerMenuOpenCls;
        this.hdCtxIndex = g;
        Ext.fly(f).addClass(a);
        b.get("asc").setDisabled(!d);
        b.get("desc").setDisabled(!d);
        c.on("hide", function () {
            Ext.fly(f).removeClass(a)
        }, this, {single:true});
        c.show(i, "tl-bl?")
    }
}, handleHdMove:function (j) {
    var h = this.findHeaderCell(this.activeHdRef);
    if (h && !this.headersDisabled) {
        var k = this.splitHandleWidth || 5, i = this.activeHdRegion, o = h.style, l = this.cm, n = "", f = j.getPageX();
        if (this.grid.enableColumnResize !== false) {
            var a = this.activeHdIndex, b = this.getPreviousVisible(a), m = l.isResizable(a), c = b && l.isResizable(b), d = f - i.left <= k, g = i.right - f <= (!this.activeHdBtn ? k : 2);
            if (d && c) {
                n = Ext.isAir ? "move" : Ext.isWebKit ? "e-resize" : "col-resize"
            } else {
                if (g && m) {
                    n = Ext.isAir ? "move" : Ext.isWebKit ? "w-resize" : "col-resize"
                }
            }
        }
        o.cursor = n
    }
}, getPreviousVisible:function (a) {
    while (a > 0) {
        if (!this.cm.isHidden(a - 1)) {
            return a
        }
        a--
    }
    return undefined
}, handleHdOver:function (c, b) {
    var d = this.findHeaderCell(b);
    if (d && !this.headersDisabled) {
        var a = this.fly(d);
        this.activeHdRef = b;
        this.activeHdIndex = this.getCellIndex(d);
        this.activeHdRegion = a.getRegion();
        if (!this.isMenuDisabled(this.activeHdIndex, a)) {
            a.addClass("x-grid3-hd-over");
            this.activeHdBtn = a.child(".x-grid3-hd-btn");
            if (this.activeHdBtn) {
                this.activeHdBtn.dom.style.height = (d.firstChild.offsetHeight - 1) + "px"
            }
        }
    }
}, handleHdOut:function (b, a) {
    var c = this.findHeaderCell(a);
    if (c && (!Ext.isIE || !b.within(c, true))) {
        this.activeHdRef = null;
        this.fly(c).removeClass("x-grid3-hd-over");
        c.style.cursor = ""
    }
}, isMenuDisabled:function (a, b) {
    return this.cm.isMenuDisabled(a)
}, hasRows:function () {
    var a = this.mainBody.dom.firstChild;
    return a && a.nodeType == 1 && a.className != "x-grid-empty"
}, isHideableColumn:function (a) {
    return !a.hidden
}, bind:function (a, b) {
    this.initData(a, b)
}});
Ext.grid.GridView.SplitDragZone = Ext.extend(Ext.dd.DDProxy, {constructor:function (a, b) {
    this.grid = a;
    this.view = a.getView();
    this.marker = this.view.resizeMarker;
    this.proxy = this.view.resizeProxy;
    Ext.grid.GridView.SplitDragZone.superclass.constructor.call(this, b, "gridSplitters" + this.grid.getGridEl().id, {dragElId:Ext.id(this.proxy.dom), resizeFrame:false});
    this.scroll = false;
    this.hw = this.view.splitHandleWidth || 5
}, b4StartDrag:function (a, e) {
    this.dragHeadersDisabled = this.view.headersDisabled;
    this.view.headersDisabled = true;
    var d = this.view.mainWrap.getHeight();
    this.marker.setHeight(d);
    this.marker.show();
    this.marker.alignTo(this.view.getHeaderCell(this.cellIndex), "tl-tl", [-2, 0]);
    this.proxy.setHeight(d);
    var b = this.cm.getColumnWidth(this.cellIndex), c = Math.max(b - this.grid.minColumnWidth, 0);
    this.resetConstraints();
    this.setXConstraint(c, 1000);
    this.setYConstraint(0, 0);
    this.minX = a - c;
    this.maxX = a + 1000;
    this.startPos = a;
    Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, e)
}, allowHeaderDrag:function (a) {
    return true
}, handleMouseDown:function (a) {
    var g = this.view.findHeaderCell(a.getTarget());
    if (g && this.allowHeaderDrag(a)) {
        var j = this.view.fly(g).getXY(), c = j[0], h = a.getXY(), b = h[0], f = g.offsetWidth, d = false;
        if ((b - c) <= this.hw) {
            d = -1
        } else {
            if ((c + f) - b <= this.hw) {
                d = 0
            }
        }
        if (d !== false) {
            this.cm = this.grid.colModel;
            var i = this.view.getCellIndex(g);
            if (d == -1) {
                if (i + d < 0) {
                    return
                }
                while (this.cm.isHidden(i + d)) {
                    --d;
                    if (i + d < 0) {
                        return
                    }
                }
            }
            this.cellIndex = i + d;
            this.split = g.dom;
            if (this.cm.isResizable(this.cellIndex) && !this.cm.isFixed(this.cellIndex)) {
                Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown.apply(this, arguments)
            }
        } else {
            if (this.view.columnDrag) {
                this.view.columnDrag.callHandleMouseDown(a)
            }
        }
    }
}, endDrag:function (f) {
    this.marker.hide();
    var a = this.view, c = Math.max(this.minX, f.getPageX()), d = c - this.startPos, b = this.dragHeadersDisabled;
    a.onColumnSplitterMoved(this.cellIndex, this.cm.getColumnWidth(this.cellIndex) + d);
    setTimeout(function () {
        a.headersDisabled = b
    }, 50)
}, autoOffset:function () {
    this.setDelta(0, 0)
}});
Ext.grid.PivotGridView = Ext.extend(Ext.grid.GridView, {colHeaderCellCls:"grid-hd-group-cell", title:"", getColumnHeaders:function () {
    return this.grid.topAxis.buildHeaders()
}, getRowHeaders:function () {
    return this.grid.leftAxis.buildHeaders()
}, renderRows:function (a, s) {
    var b = this.grid, n = b.extractData(), o = n.length, f = this.templates, r = b.renderer, g = typeof r == "function", v = this.getCellCls, m = typeof v == "function", d = f.cell, w = f.row, h = [], p = {}, c = "width:" + this.getGridInnerWidth() + "px;", k, q, e, u, l;
    a = a || 0;
    s = Ext.isDefined(s) ? s : o - 1;
    for (u = 0; u < o; u++) {
        l = n[u];
        q = l.length;
        k = [];
        for (var t = 0; t < q; t++) {
            p.id = u + "-" + t;
            p.css = t === 0 ? "x-grid3-cell-first " : (t == (q - 1) ? "x-grid3-cell-last " : "");
            p.attr = p.cellAttr = "";
            p.value = l[t];
            if (Ext.isEmpty(p.value)) {
                p.value = "&#160;"
            }
            if (g) {
                p.value = r(p.value)
            }
            if (m) {
                p.css += v(p.value) + " "
            }
            k[k.length] = d.apply(p)
        }
        h[h.length] = w.apply({tstyle:c, cols:q, cells:k.join(""), alt:""})
    }
    return h.join("")
}, masterTpl:new Ext.Template('<div class="x-grid3 x-pivotgrid" hidefocus="true">', '<div class="x-grid3-viewport">', '<div class="x-grid3-header">', '<div class="x-grid3-header-title"><span>{title}</span></div>', '<div class="x-grid3-header-inner">', '<div class="x-grid3-header-offset" style="{ostyle}"></div>', "</div>", '<div class="x-clear"></div>', "</div>", '<div class="x-grid3-scroller">', '<div class="x-grid3-row-headers"></div>', '<div class="x-grid3-body" style="{bstyle}">{body}</div>', '<a href="#" class="x-grid3-focus" tabIndex="-1"></a>', "</div>", "</div>", '<div class="x-grid3-resize-marker">&#160;</div>', '<div class="x-grid3-resize-proxy">&#160;</div>', "</div>"), initTemplates:function () {
    Ext.grid.PivotGridView.superclass.initTemplates.apply(this, arguments);
    var a = this.templates || {};
    if (!a.gcell) {
        a.gcell = new Ext.XTemplate('<td class="x-grid3-hd x-grid3-gcell x-grid3-td-{id} ux-grid-hd-group-row-{row} ' + this.colHeaderCellCls + '" style="{style}">', '<div {tooltip} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">', this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>' : "", "{value}", "</div>", "</td>")
    }
    this.templates = a;
    this.hrowRe = new RegExp("ux-grid-hd-group-row-(\\d+)", "")
}, initElements:function () {
    Ext.grid.PivotGridView.superclass.initElements.apply(this, arguments);
    this.rowHeadersEl = new Ext.Element(this.scroller.child("div.x-grid3-row-headers"));
    this.headerTitleEl = new Ext.Element(this.mainHd.child("div.x-grid3-header-title"))
}, getGridInnerWidth:function () {
    var a = Ext.grid.PivotGridView.superclass.getGridInnerWidth.apply(this, arguments);
    return a - this.getTotalRowHeaderWidth()
}, getTotalRowHeaderWidth:function () {
    var d = this.getRowHeaders(), c = d.length, b = 0, a;
    for (a = 0; a < c; a++) {
        b += d[a].width
    }
    return b
}, getTotalColumnHeaderHeight:function () {
    return this.getColumnHeaders().length * 21
}, getCellIndex:function (b) {
    if (b) {
        var a = b.className.match(this.colRe), c;
        if (a && (c = a[1])) {
            return parseInt(c.split("-")[1], 10)
        }
    }
    return false
}, renderUI:function () {
    var b = this.templates, a = this.getGridInnerWidth();
    return b.master.apply({body:b.body.apply({rows:"&#160;"}), ostyle:"width:" + a + "px", bstyle:"width:" + a + "px"})
}, onLayout:function (b, a) {
    Ext.grid.PivotGridView.superclass.onLayout.apply(this, arguments);
    var b = this.getGridInnerWidth();
    this.resizeColumnHeaders(b);
    this.resizeAllRows(b)
}, refresh:function (b) {
    this.fireEvent("beforerefresh", this);
    this.grid.stopEditing(true);
    var a = this.renderBody();
    this.mainBody.update(a).setWidth(this.getGridInnerWidth());
    if (b === true) {
        this.updateHeaders();
        this.updateHeaderSortState()
    }
    this.processRows(0, true);
    this.layout();
    this.applyEmptyText();
    this.fireEvent("refresh", this)
}, renderHeaders:Ext.emptyFn, fitColumns:Ext.emptyFn, resizeColumnHeaders:function (b) {
    var a = this.grid.topAxis;
    if (a.rendered) {
        a.el.setWidth(b)
    }
}, resizeRowHeaders:function () {
    var a = this.getTotalRowHeaderWidth(), b = String.format("margin-left: {0}px;", a);
    this.rowHeadersEl.setWidth(a);
    this.mainBody.applyStyles(b);
    Ext.fly(this.innerHd).applyStyles(b);
    this.headerTitleEl.setWidth(a);
    this.headerTitleEl.setHeight(this.getTotalColumnHeaderHeight())
}, resizeAllRows:function (b) {
    var d = this.getRows(), c = d.length, a;
    for (a = 0; a < c; a++) {
        Ext.fly(d[a]).setWidth(b);
        Ext.fly(d[a]).child("table").setWidth(b)
    }
}, updateHeaders:function () {
    this.renderGroupRowHeaders();
    this.renderGroupColumnHeaders()
}, renderGroupRowHeaders:function () {
    var a = this.grid.leftAxis;
    this.resizeRowHeaders();
    a.rendered = false;
    a.render(this.rowHeadersEl);
    this.setTitle(this.title)
}, setTitle:function (a) {
    this.headerTitleEl.child("span").dom.innerHTML = a
}, renderGroupColumnHeaders:function () {
    var a = this.grid.topAxis;
    a.rendered = false;
    a.render(this.innerHd.firstChild)
}, isMenuDisabled:function (a, b) {
    return true
}});
Ext.grid.PivotAxis = Ext.extend(Ext.Component, {orientation:"horizontal", defaultHeaderWidth:80, paddingWidth:7, setDimensions:function (a) {
    this.dimensions = a
}, onRender:function (b, a) {
    var c = this.orientation == "horizontal" ? this.renderHorizontalRows() : this.renderVerticalRows();
    this.el = Ext.DomHelper.overwrite(b.dom, {tag:"table", cn:c}, true)
}, renderHorizontalRows:function () {
    var h = this.buildHeaders(), a = h.length, f = [], c, g, e, d, b;
    for (d = 0; d < a; d++) {
        c = [];
        g = h[d].items;
        e = g.length;
        for (b = 0; b < e; b++) {
            c.push({tag:"td", html:g[b].header, colspan:g[b].span})
        }
        f[d] = {tag:"tr", cn:c}
    }
    return f
}, renderVerticalRows:function () {
    var b = this.buildHeaders(), h = b.length, a = [], l = [], g, c, k, f, e, d;
    for (e = 0; e < h; e++) {
        c = b[e];
        f = c.width || 80;
        g = c.items.length;
        for (d = 0; d < g; d++) {
            k = c.items[d];
            a[k.start] = a[k.start] || [];
            a[k.start].push({tag:"td", html:k.header, rowspan:k.span, width:Ext.isBorderBox ? f : f - this.paddingWidth})
        }
    }
    g = a.length;
    for (e = 0; e < g; e++) {
        l[e] = {tag:"tr", cn:a[e]}
    }
    return l
}, getTuples:function () {
    var b = new Ext.data.Store({});
    b.data = this.store.data.clone();
    b.fields = this.store.fields;
    var k = [], a = this.dimensions, c = a.length, h;
    for (h = 0; h < c; h++) {
        k.push({field:a[h].dataIndex, direction:a[h].direction || "ASC"})
    }
    b.sort(k);
    var e = b.data.items, m = [], j = [], n, g, d, f, l;
    c = e.length;
    for (h = 0; h < c; h++) {
        d = this.getRecordInfo(e[h]);
        f = d.data;
        g = "";
        for (l in f) {
            g += f[l] + "---"
        }
        if (m.indexOf(g) == -1) {
            m.push(g);
            j.push(d)
        }
    }
    b.destroy();
    return j
}, getRecordInfo:function (a) {
    var e = this.dimensions, d = e.length, g = {}, h, c, b;
    for (b = 0; b < d; b++) {
        h = e[b];
        c = h.dataIndex;
        g[c] = a.get(c)
    }
    var f = function (i) {
        return function (j) {
            for (var k in i) {
                if (j.get(k) != i[k]) {
                    return false
                }
            }
            return true
        }
    };
    return{data:g, matcher:f(g)}
}, buildHeaders:function () {
    var k = this.getTuples(), l = k.length, a = this.dimensions, e, q = a.length, c = [], n, r, m, p, o, b, h, g, f, d;
    for (f = 0; f < q; f++) {
        e = a[f];
        r = [];
        o = 0;
        b = 0;
        for (d = 0; d < l; d++) {
            n = k[d];
            h = d == (l - 1);
            m = n.data[e.dataIndex];
            g = p != undefined && p != m;
            if (f > 0 && d > 0) {
                g = g || n.data[a[f - 1].dataIndex] != k[d - 1].data[a[f - 1].dataIndex]
            }
            if (g) {
                r.push({header:p, span:o, start:b});
                b += o;
                o = 0
            }
            if (h) {
                r.push({header:m, span:o + 1, start:b});
                b += o;
                o = 0
            }
            p = m;
            o++
        }
        c.push({items:r, width:e.width || this.defaultHeaderWidth});
        p = undefined
    }
    return c
}});
Ext.grid.HeaderDragZone = Ext.extend(Ext.dd.DragZone, {maxDragWidth:120, constructor:function (a, c, b) {
    this.grid = a;
    this.view = a.getView();
    this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
    Ext.grid.HeaderDragZone.superclass.constructor.call(this, c);
    if (b) {
        this.setHandleElId(Ext.id(c));
        this.setOuterHandleElId(Ext.id(b))
    }
    this.scroll = false
}, getDragData:function (c) {
    var a = Ext.lib.Event.getTarget(c), b = this.view.findHeaderCell(a);
    if (b) {
        return{ddel:b.firstChild, header:b}
    }
    return false
}, onInitDrag:function (a) {
    this.dragHeadersDisabled = this.view.headersDisabled;
    this.view.headersDisabled = true;
    var b = this.dragData.ddel.cloneNode(true);
    b.id = Ext.id();
    b.style.width = Math.min(this.dragData.header.offsetWidth, this.maxDragWidth) + "px";
    this.proxy.update(b);
    return true
}, afterValidDrop:function () {
    this.completeDrop()
}, afterInvalidDrop:function () {
    this.completeDrop()
}, completeDrop:function () {
    var a = this.view, b = this.dragHeadersDisabled;
    setTimeout(function () {
        a.headersDisabled = b
    }, 50)
}});
Ext.grid.HeaderDropZone = Ext.extend(Ext.dd.DropZone, {proxyOffsets:[-4, -9], fly:Ext.Element.fly, constructor:function (a, c, b) {
    this.grid = a;
    this.view = a.getView();
    this.proxyTop = Ext.DomHelper.append(document.body, {cls:"col-move-top", html:"&#160;"}, true);
    this.proxyBottom = Ext.DomHelper.append(document.body, {cls:"col-move-bottom", html:"&#160;"}, true);
    this.proxyTop.hide = this.proxyBottom.hide = function () {
        this.setLeftTop(-100, -100);
        this.setStyle("visibility", "hidden")
    };
    this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
    Ext.grid.HeaderDropZone.superclass.constructor.call(this, a.getGridEl().dom)
}, getTargetFromEvent:function (c) {
    var a = Ext.lib.Event.getTarget(c), b = this.view.findCellIndex(a);
    if (b !== false) {
        return this.view.getHeaderCell(b)
    }
}, nextVisible:function (c) {
    var b = this.view, a = this.grid.colModel;
    c = c.nextSibling;
    while (c) {
        if (!a.isHidden(b.getCellIndex(c))) {
            return c
        }
        c = c.nextSibling
    }
    return null
}, prevVisible:function (c) {
    var b = this.view, a = this.grid.colModel;
    c = c.prevSibling;
    while (c) {
        if (!a.isHidden(b.getCellIndex(c))) {
            return c
        }
        c = c.prevSibling
    }
    return null
}, positionIndicator:function (d, j, i) {
    var a = Ext.lib.Event.getPageX(i), f = Ext.lib.Dom.getRegion(j.firstChild), c, g, b = f.top + this.proxyOffsets[1];
    if ((f.right - a) <= (f.right - f.left) / 2) {
        c = f.right + this.view.borderWidth;
        g = "after"
    } else {
        c = f.left;
        g = "before"
    }
    if (this.grid.colModel.isFixed(this.view.getCellIndex(j))) {
        return false
    }
    c += this.proxyOffsets[0];
    this.proxyTop.setLeftTop(c, b);
    this.proxyTop.show();
    if (!this.bottomOffset) {
        this.bottomOffset = this.view.mainHd.getHeight()
    }
    this.proxyBottom.setLeftTop(c, b + this.proxyTop.dom.offsetHeight + this.bottomOffset);
    this.proxyBottom.show();
    return g
}, onNodeEnter:function (d, a, c, b) {
    if (b.header != d) {
        this.positionIndicator(b.header, d, c)
    }
}, onNodeOver:function (f, b, d, c) {
    var a = false;
    if (c.header != f) {
        a = this.positionIndicator(c.header, f, d)
    }
    if (!a) {
        this.proxyTop.hide();
        this.proxyBottom.hide()
    }
    return a ? this.dropAllowed : this.dropNotAllowed
}, onNodeOut:function (d, a, c, b) {
    this.proxyTop.hide();
    this.proxyBottom.hide()
}, onNodeDrop:function (b, l, f, c) {
    var d = c.header;
    if (d != b) {
        var j = this.grid.colModel, i = Ext.lib.Event.getPageX(f), a = Ext.lib.Dom.getRegion(b.firstChild), m = (a.right - i) <= ((a.right - a.left) / 2) ? "after" : "before", g = this.view.getCellIndex(d), k = this.view.getCellIndex(b);
        if (m == "after") {
            k++
        }
        if (g < k) {
            k--
        }
        j.moveColumn(g, k);
        return true
    }
    return false
}});
Ext.grid.GridView.ColumnDragZone = Ext.extend(Ext.grid.HeaderDragZone, {constructor:function (a, b) {
    Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(this, a, b, null);
    this.proxy.el.addClass("x-grid3-col-dd")
}, handleMouseDown:function (a) {
}, callHandleMouseDown:function (a) {
    Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this, a)
}});
Ext.grid.SplitDragZone = Ext.extend(Ext.dd.DDProxy, {fly:Ext.Element.fly, constructor:function (a, c, b) {
    this.grid = a;
    this.view = a.getView();
    this.proxy = this.view.resizeProxy;
    Ext.grid.SplitDragZone.superclass.constructor.call(this, c, "gridSplitters" + this.grid.getGridEl().id, {dragElId:Ext.id(this.proxy.dom), resizeFrame:false});
    this.setHandleElId(Ext.id(c));
    this.setOuterHandleElId(Ext.id(b));
    this.scroll = false
}, b4StartDrag:function (a, d) {
    this.view.headersDisabled = true;
    this.proxy.setHeight(this.view.mainWrap.getHeight());
    var b = this.cm.getColumnWidth(this.cellIndex);
    var c = Math.max(b - this.grid.minColumnWidth, 0);
    this.resetConstraints();
    this.setXConstraint(c, 1000);
    this.setYConstraint(0, 0);
    this.minX = a - c;
    this.maxX = a + 1000;
    this.startPos = a;
    Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, d)
}, handleMouseDown:function (c) {
    var b = Ext.EventObject.setEvent(c);
    var a = this.fly(b.getTarget());
    if (a.hasClass("x-grid-split")) {
        this.cellIndex = this.view.getCellIndex(a.dom);
        this.split = a.dom;
        this.cm = this.grid.colModel;
        if (this.cm.isResizable(this.cellIndex) && !this.cm.isFixed(this.cellIndex)) {
            Ext.grid.SplitDragZone.superclass.handleMouseDown.apply(this, arguments)
        }
    }
}, endDrag:function (c) {
    this.view.headersDisabled = false;
    var a = Math.max(this.minX, Ext.lib.Event.getPageX(c));
    var b = a - this.startPos;
    this.view.onColumnSplitterMoved(this.cellIndex, this.cm.getColumnWidth(this.cellIndex) + b)
}, autoOffset:function () {
    this.setDelta(0, 0)
}});
Ext.grid.GridDragZone = function (b, a) {
    this.view = b.getView();
    Ext.grid.GridDragZone.superclass.constructor.call(this, this.view.mainBody.dom, a);
    this.scroll = false;
    this.grid = b;
    this.ddel = document.createElement("div");
    this.ddel.className = "x-grid-dd-wrap"
};
Ext.extend(Ext.grid.GridDragZone, Ext.dd.DragZone, {ddGroup:"GridDD", getDragData:function (b) {
    var a = Ext.lib.Event.getTarget(b);
    var d = this.view.findRowIndex(a);
    if (d !== false) {
        var c = this.grid.selModel;
        if (!c.isSelected(d) || b.hasModifier()) {
            c.handleMouseDown(this.grid, d, b)
        }
        return{grid:this.grid, ddel:this.ddel, rowIndex:d, selections:c.getSelections()}
    }
    return false
}, onInitDrag:function (b) {
    var a = this.dragData;
    this.ddel.innerHTML = this.grid.getDragDropText();
    this.proxy.update(this.ddel)
}, afterRepair:function () {
    this.dragging = false
}, getRepairXY:function (b, a) {
    return false
}, onEndDrag:function (a, b) {
}, onValidDrop:function (a, b, c) {
    this.hideProxy()
}, beforeInvalidDrop:function (a, b) {
}});
Ext.grid.ColumnModel = Ext.extend(Ext.util.Observable, {defaultWidth:100, defaultSortable:false, constructor:function (a) {
    if (a.columns) {
        Ext.apply(this, a);
        this.setConfig(a.columns, true)
    } else {
        this.setConfig(a, true)
    }
    this.addEvents("widthchange", "headerchange", "hiddenchange", "columnmoved", "configchange");
    Ext.grid.ColumnModel.superclass.constructor.call(this)
}, getColumnId:function (a) {
    return this.config[a].id
}, getColumnAt:function (a) {
    return this.config[a]
}, setConfig:function (d, b) {
    var e, g, a;
    if (!b) {
        delete this.totalWidth;
        for (e = 0, a = this.config.length; e < a; e++) {
            g = this.config[e];
            if (g.setEditor) {
                g.setEditor(null)
            }
        }
    }
    this.defaults = Ext.apply({width:this.defaultWidth, sortable:this.defaultSortable}, this.defaults);
    this.config = d;
    this.lookup = {};
    for (e = 0, a = d.length; e < a; e++) {
        g = Ext.applyIf(d[e], this.defaults);
        if (Ext.isEmpty(g.id)) {
            g.id = e
        }
        if (!g.isColumn) {
            var f = Ext.grid.Column.types[g.xtype || "gridcolumn"];
            g = new f(g);
            d[e] = g
        }
        this.lookup[g.id] = g
    }
    if (!b) {
        this.fireEvent("configchange", this)
    }
}, getColumnById:function (a) {
    return this.lookup[a]
}, getIndexById:function (c) {
    for (var b = 0, a = this.config.length; b < a; b++) {
        if (this.config[b].id == c) {
            return b
        }
    }
    return -1
}, moveColumn:function (e, b) {
    var a = this.config, d = a[e];
    a.splice(e, 1);
    a.splice(b, 0, d);
    this.dataMap = null;
    this.fireEvent("columnmoved", this, e, b)
}, getColumnCount:function (b) {
    var d = this.config.length, e = 0, a;
    if (b === true) {
        for (a = 0; a < d; a++) {
            if (!this.isHidden(a)) {
                e++
            }
        }
        return e
    }
    return d
}, getColumnsBy:function (f, e) {
    var b = this.config, g = b.length, a = [], d, h;
    for (d = 0; d < g; d++) {
        h = b[d];
        if (f.call(e || this, h, d) === true) {
            a[a.length] = h
        }
    }
    return a
}, isSortable:function (a) {
    return !!this.config[a].sortable
}, isMenuDisabled:function (a) {
    return !!this.config[a].menuDisabled
}, getRenderer:function (a) {
    return this.config[a].renderer || Ext.grid.ColumnModel.defaultRenderer
}, getRendererScope:function (a) {
    return this.config[a].scope
}, setRenderer:function (a, b) {
    this.config[a].renderer = b
}, getColumnWidth:function (a) {
    var b = this.config[a].width;
    if (typeof b != "number") {
        b = this.defaultWidth
    }
    return b
}, setColumnWidth:function (b, c, a) {
    this.config[b].width = c;
    this.totalWidth = null;
    if (!a) {
        this.fireEvent("widthchange", this, b, c)
    }
}, getTotalWidth:function (b) {
    if (!this.totalWidth) {
        this.totalWidth = 0;
        for (var c = 0, a = this.config.length; c < a; c++) {
            if (b || !this.isHidden(c)) {
                this.totalWidth += this.getColumnWidth(c)
            }
        }
    }
    return this.totalWidth
}, getColumnHeader:function (a) {
    return this.config[a].header
}, setColumnHeader:function (a, b) {
    this.config[a].header = b;
    this.fireEvent("headerchange", this, a, b)
}, getColumnTooltip:function (a) {
    return this.config[a].tooltip
}, setColumnTooltip:function (a, b) {
    this.config[a].tooltip = b
}, getDataIndex:function (a) {
    return this.config[a].dataIndex
}, setDataIndex:function (a, b) {
    this.config[a].dataIndex = b
}, findColumnIndex:function (d) {
    var e = this.config;
    for (var b = 0, a = e.length; b < a; b++) {
        if (e[b].dataIndex == d) {
            return b
        }
    }
    return -1
}, isCellEditable:function (b, e) {
    var d = this.config[b], a = d.editable;
    return !!(a || (!Ext.isDefined(a) && d.editor))
}, getCellEditor:function (a, b) {
    return this.config[a].getCellEditor(b)
}, setEditable:function (a, b) {
    this.config[a].editable = b
}, isHidden:function (a) {
    return !!this.config[a].hidden
}, isFixed:function (a) {
    return !!this.config[a].fixed
}, isResizable:function (a) {
    return a >= 0 && this.config[a].resizable !== false && this.config[a].fixed !== true
}, setHidden:function (a, b) {
    var d = this.config[a];
    if (d.hidden !== b) {
        d.hidden = b;
        this.totalWidth = null;
        this.fireEvent("hiddenchange", this, a, b)
    }
}, setEditor:function (a, b) {
    this.config[a].setEditor(b)
}, destroy:function () {
    var b = this.config.length, a = 0;
    for (; a < b; a++) {
        this.config[a].destroy()
    }
    delete this.config;
    delete this.lookup;
    this.purgeListeners()
}, setState:function (a, b) {
    b = Ext.applyIf(b, this.defaults);
    Ext.apply(this.config[a], b)
}});
Ext.grid.ColumnModel.defaultRenderer = function (a) {
    if (typeof a == "string" && a.length < 1) {
        return"&#160;"
    }
    return a
};
Ext.grid.AbstractSelectionModel = Ext.extend(Ext.util.Observable, {constructor:function () {
    this.locked = false;
    Ext.grid.AbstractSelectionModel.superclass.constructor.call(this)
}, init:function (a) {
    this.grid = a;
    if (this.lockOnInit) {
        delete this.lockOnInit;
        this.locked = false;
        this.lock()
    }
    this.initEvents()
}, lock:function () {
    if (!this.locked) {
        this.locked = true;
        var a = this.grid;
        if (a) {
            a.getView().on({scope:this, beforerefresh:this.sortUnLock, refresh:this.sortLock})
        } else {
            this.lockOnInit = true
        }
    }
}, sortLock:function () {
    this.locked = true
}, sortUnLock:function () {
    this.locked = false
}, unlock:function () {
    if (this.locked) {
        this.locked = false;
        var a = this.grid, b;
        if (a) {
            b = a.getView();
            b.un("beforerefresh", this.sortUnLock, this);
            b.un("refresh", this.sortLock, this)
        } else {
            delete this.lockOnInit
        }
    }
}, isLocked:function () {
    return this.locked
}, destroy:function () {
    this.unlock();
    this.purgeListeners()
}});
Ext.grid.RowSelectionModel = Ext.extend(Ext.grid.AbstractSelectionModel, {singleSelect:false, constructor:function (a) {
    Ext.apply(this, a);
    this.selections = new Ext.util.MixedCollection(false, function (b) {
        return b.id
    });
    this.last = false;
    this.lastActive = false;
    this.addEvents("selectionchange", "beforerowselect", "rowselect", "rowdeselect");
    Ext.grid.RowSelectionModel.superclass.constructor.call(this)
}, initEvents:function () {
    if (!this.grid.enableDragDrop && !this.grid.enableDrag) {
        this.grid.on("rowmousedown", this.handleMouseDown, this)
    }
    this.rowNav = new Ext.KeyNav(this.grid.getGridEl(), {up:this.onKeyPress, down:this.onKeyPress, scope:this});
    this.grid.getView().on({scope:this, refresh:this.onRefresh, rowupdated:this.onRowUpdated, rowremoved:this.onRemove})
}, onKeyPress:function (f, b) {
    var a = b == "up", g = a ? "selectPrevious" : "selectNext", d = a ? -1 : 1, c;
    if (!f.shiftKey || this.singleSelect) {
        this[g](false)
    } else {
        if (this.last !== false && this.lastActive !== false) {
            c = this.last;
            this.selectRange(this.last, this.lastActive + d);
            this.grid.getView().focusRow(this.lastActive);
            if (c !== false) {
                this.last = c
            }
        } else {
            this.selectFirstRow()
        }
    }
}, onRefresh:function () {
    var f = this.grid.store, d = this.getSelections(), c = 0, a = d.length, b, e;
    this.silent = true;
    this.clearSelections(true);
    for (; c < a; c++) {
        e = d[c];
        if ((b = f.indexOfId(e.id)) != -1) {
            this.selectRow(b, true)
        }
    }
    if (d.length != this.selections.getCount()) {
        this.fireEvent("selectionchange", this)
    }
    this.silent = false
}, onRemove:function (a, b, c) {
    if (this.selections.remove(c) !== false) {
        this.fireEvent("selectionchange", this)
    }
}, onRowUpdated:function (a, b, c) {
    if (this.isSelected(c)) {
        a.onRowSelect(b)
    }
}, selectRecords:function (b, e) {
    if (!e) {
        this.clearSelections()
    }
    var d = this.grid.store, c = 0, a = b.length;
    for (; c < a; c++) {
        this.selectRow(d.indexOf(b[c]), true)
    }
}, getCount:function () {
    return this.selections.length
}, selectFirstRow:function () {
    this.selectRow(0)
}, selectLastRow:function (a) {
    this.selectRow(this.grid.store.getCount() - 1, a)
}, selectNext:function (a) {
    if (this.hasNext()) {
        this.selectRow(this.last + 1, a);
        this.grid.getView().focusRow(this.last);
        return true
    }
    return false
}, selectPrevious:function (a) {
    if (this.hasPrevious()) {
        this.selectRow(this.last - 1, a);
        this.grid.getView().focusRow(this.last);
        return true
    }
    return false
}, hasNext:function () {
    return this.last !== false && (this.last + 1) < this.grid.store.getCount()
}, hasPrevious:function () {
    return !!this.last
}, getSelections:function () {
    return[].concat(this.selections.items)
}, getSelected:function () {
    return this.selections.itemAt(0)
}, each:function (e, d) {
    var c = this.getSelections(), b = 0, a = c.length;
    for (; b < a; b++) {
        if (e.call(d || this, c[b], b) === false) {
            return false
        }
    }
    return true
}, clearSelections:function (a) {
    if (this.isLocked()) {
        return
    }
    if (a !== true) {
        var c = this.grid.store, b = this.selections;
        b.each(function (d) {
            this.deselectRow(c.indexOfId(d.id))
        }, this);
        b.clear()
    } else {
        this.selections.clear()
    }
    this.last = false
}, selectAll:function () {
    if (this.isLocked()) {
        return
    }
    this.selections.clear();
    for (var b = 0, a = this.grid.store.getCount(); b < a; b++) {
        this.selectRow(b, true)
    }
}, hasSelection:function () {
    return this.selections.length > 0
}, isSelected:function (a) {
    var b = Ext.isNumber(a) ? this.grid.store.getAt(a) : a;
    return(b && this.selections.key(b.id) ? true : false)
}, isIdSelected:function (a) {
    return(this.selections.key(a) ? true : false)
}, handleMouseDown:function (d, h, f) {
    if (f.button !== 0 || this.isLocked()) {
        return
    }
    var a = this.grid.getView();
    if (f.shiftKey && !this.singleSelect && this.last !== false) {
        var c = this.last;
        this.selectRange(c, h, f.ctrlKey);
        this.last = c;
        a.focusRow(h)
    } else {
        var b = this.isSelected(h);
        if (f.ctrlKey && b) {
            this.deselectRow(h)
        } else {
            if (!b || this.getCount() > 1) {
                this.selectRow(h, f.ctrlKey || f.shiftKey);
                a.focusRow(h)
            }
        }
    }
}, selectRows:function (c, d) {
    if (!d) {
        this.clearSelections()
    }
    for (var b = 0, a = c.length; b < a; b++) {
        this.selectRow(c[b], true)
    }
}, selectRange:function (b, a, d) {
    var c;
    if (this.isLocked()) {
        return
    }
    if (!d) {
        this.clearSelections()
    }
    if (b <= a) {
        for (c = b; c <= a; c++) {
            this.selectRow(c, true)
        }
    } else {
        for (c = b; c >= a; c--) {
            this.selectRow(c, true)
        }
    }
}, deselectRange:function (c, b, a) {
    if (this.isLocked()) {
        return
    }
    for (var d = c; d <= b; d++) {
        this.deselectRow(d, a)
    }
}, selectRow:function (b, d, a) {
    if (this.isLocked() || (b < 0 || b >= this.grid.store.getCount()) || (d && this.isSelected(b))) {
        return
    }
    var c = this.grid.store.getAt(b);
    if (c && this.fireEvent("beforerowselect", this, b, d, c) !== false) {
        if (!d || this.singleSelect) {
            this.clearSelections()
        }
        this.selections.add(c);
        this.last = this.lastActive = b;
        if (!a) {
            this.grid.getView().onRowSelect(b)
        }
        if (!this.silent) {
            this.fireEvent("rowselect", this, b, c);
            this.fireEvent("selectionchange", this)
        }
    }
}, deselectRow:function (b, a) {
    if (this.isLocked()) {
        return
    }
    if (this.last == b) {
        this.last = false
    }
    if (this.lastActive == b) {
        this.lastActive = false
    }
    var c = this.grid.store.getAt(b);
    if (c) {
        this.selections.remove(c);
        if (!a) {
            this.grid.getView().onRowDeselect(b)
        }
        this.fireEvent("rowdeselect", this, b, c);
        this.fireEvent("selectionchange", this)
    }
}, acceptsNav:function (c, b, a) {
    return !a.isHidden(b) && a.isCellEditable(b, c)
}, onEditorKey:function (m, j) {
    var d = j.getKey(), f, h = this.grid, o = h.lastEdit, i = h.activeEditor, b = j.shiftKey, n, o, a, l;
    if (d == j.TAB) {
        j.stopEvent();
        i.completeEdit();
        if (b) {
            f = h.walkCells(i.row, i.col - 1, -1, this.acceptsNav, this)
        } else {
            f = h.walkCells(i.row, i.col + 1, 1, this.acceptsNav, this)
        }
    } else {
        if (d == j.ENTER) {
            if (this.moveEditorOnEnter !== false) {
                if (b) {
                    f = h.walkCells(o.row - 1, o.col, -1, this.acceptsNav, this)
                } else {
                    f = h.walkCells(o.row + 1, o.col, 1, this.acceptsNav, this)
                }
            }
        }
    }
    if (f) {
        a = f[0];
        l = f[1];
        this.onEditorSelect(a, o.row);
        if (h.isEditor && h.editing) {
            n = h.activeEditor;
            if (n && n.field.triggerBlur) {
                n.field.triggerBlur()
            }
        }
        h.startEditing(a, l)
    }
}, onEditorSelect:function (b, a) {
    if (a != b) {
        this.selectRow(b)
    }
}, destroy:function () {
    Ext.destroy(this.rowNav);
    this.rowNav = null;
    Ext.grid.RowSelectionModel.superclass.destroy.call(this)
}});
Ext.grid.Column = Ext.extend(Ext.util.Observable, {isColumn:true, constructor:function (b) {
    Ext.apply(this, b);
    if (Ext.isString(this.renderer)) {
        this.renderer = Ext.util.Format[this.renderer]
    } else {
        if (Ext.isObject(this.renderer)) {
            this.scope = this.renderer.scope;
            this.renderer = this.renderer.fn
        }
    }
    if (!this.scope) {
        this.scope = this
    }
    var a = this.editor;
    delete this.editor;
    this.setEditor(a);
    this.addEvents("click", "contextmenu", "dblclick", "mousedown");
    Ext.grid.Column.superclass.constructor.call(this)
}, processEvent:function (b, d, c, f, a) {
    return this.fireEvent(b, this, c, f, d)
}, destroy:function () {
    if (this.setEditor) {
        this.setEditor(null)
    }
    this.purgeListeners()
}, renderer:function (a) {
    return a
}, getEditor:function (a) {
    return this.editable !== false ? this.editor : null
}, setEditor:function (b) {
    var a = this.editor;
    if (a) {
        if (a.gridEditor) {
            a.gridEditor.destroy();
            delete a.gridEditor
        } else {
            a.destroy()
        }
    }
    this.editor = null;
    if (b) {
        if (!b.isXType) {
            b = Ext.create(b, "textfield")
        }
        this.editor = b
    }
}, getCellEditor:function (b) {
    var a = this.getEditor(b);
    if (a) {
        if (!a.startEdit) {
            if (!a.gridEditor) {
                a.gridEditor = new Ext.grid.GridEditor(a)
            }
            a = a.gridEditor
        }
    }
    return a
}});
Ext.grid.BooleanColumn = Ext.extend(Ext.grid.Column, {trueText:"true", falseText:"false", undefinedText:"&#160;", constructor:function (a) {
    Ext.grid.BooleanColumn.superclass.constructor.call(this, a);
    var c = this.trueText, d = this.falseText, b = this.undefinedText;
    this.renderer = function (e) {
        if (e === undefined) {
            return b
        }
        if (!e || e === "false") {
            return d
        }
        return c
    }
}});
Ext.grid.NumberColumn = Ext.extend(Ext.grid.Column, {format:"0,000.00", constructor:function (a) {
    Ext.grid.NumberColumn.superclass.constructor.call(this, a);
    this.renderer = Ext.util.Format.numberRenderer(this.format)
}});
Ext.grid.DateColumn = Ext.extend(Ext.grid.Column, {format:"m/d/Y", constructor:function (a) {
    Ext.grid.DateColumn.superclass.constructor.call(this, a);
    this.renderer = Ext.util.Format.dateRenderer(this.format)
}});
Ext.grid.TemplateColumn = Ext.extend(Ext.grid.Column, {constructor:function (a) {
    Ext.grid.TemplateColumn.superclass.constructor.call(this, a);
    var b = (!Ext.isPrimitive(this.tpl) && this.tpl.compile) ? this.tpl : new Ext.XTemplate(this.tpl);
    this.renderer = function (d, e, c) {
        return b.apply(c.data)
    };
    this.tpl = b
}});
Ext.grid.ActionColumn = Ext.extend(Ext.grid.Column, {header:"&#160;", actionIdRe:/x-action-col-(\d+)/, altText:"", constructor:function (b) {
    var f = this, c = b.items || (f.items = [f]), a = c.length, d, e;
    Ext.grid.ActionColumn.superclass.constructor.call(f, b);
    f.renderer = function (g, h) {
        g = Ext.isFunction(b.renderer) ? b.renderer.apply(this, arguments) || "" : "";
        h.css += " x-action-col-cell";
        for (d = 0; d < a; d++) {
            e = c[d];
            g += '<img alt="' + (e.altText || f.altText) + '" src="' + (e.icon || Ext.BLANK_IMAGE_URL) + '" class="x-action-col-icon x-action-col-' + String(d) + " " + (e.iconCls || "") + " " + (Ext.isFunction(e.getClass) ? e.getClass.apply(e.scope || this.scope || this, arguments) : "") + '"' + ((e.tooltip) ? ' ext:qtip="' + e.tooltip + '"' : "") + " />"
        }
        return g
    }
}, destroy:function () {
    delete this.items;
    delete this.renderer;
    return Ext.grid.ActionColumn.superclass.destroy.apply(this, arguments)
}, processEvent:function (c, h, d, i, b) {
    var a = h.getTarget().className.match(this.actionIdRe), g, f;
    if (a && (g = this.items[parseInt(a[1], 10)])) {
        if (c == "click") {
            (f = g.handler || this.handler) && f.call(g.scope || this.scope || this, d, i, b, g, h)
        } else {
            if ((c == "mousedown") && (g.stopSelection !== false)) {
                return false
            }
        }
    }
    return Ext.grid.ActionColumn.superclass.processEvent.apply(this, arguments)
}});
Ext.grid.Column.types = {gridcolumn:Ext.grid.Column, booleancolumn:Ext.grid.BooleanColumn, numbercolumn:Ext.grid.NumberColumn, datecolumn:Ext.grid.DateColumn, templatecolumn:Ext.grid.TemplateColumn, actioncolumn:Ext.grid.ActionColumn};
Ext.grid.RowNumberer = Ext.extend(Object, {header:"", width:23, sortable:false, constructor:function (a) {
    Ext.apply(this, a);
    if (this.rowspan) {
        this.renderer = this.renderer.createDelegate(this)
    }
}, fixed:true, hideable:false, menuDisabled:true, dataIndex:"", id:"numberer", rowspan:undefined, renderer:function (b, c, a, d) {
    if (this.rowspan) {
        c.cellAttr = 'rowspan="' + this.rowspan + '"'
    }
    return d + 1
}});
Ext.grid.CheckboxSelectionModel = Ext.extend(Ext.grid.RowSelectionModel, {header:'<div class="x-grid3-hd-checker">&#160;</div>', width:20, sortable:false, menuDisabled:true, fixed:true, hideable:false, dataIndex:"", id:"checker", isColumn:true, constructor:function () {
    Ext.grid.CheckboxSelectionModel.superclass.constructor.apply(this, arguments);
    if (this.checkOnly) {
        this.handleMouseDown = Ext.emptyFn
    }
}, initEvents:function () {
    Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this);
    this.grid.on("render", function () {
        Ext.fly(this.grid.getView().innerHd).on("mousedown", this.onHdMouseDown, this)
    }, this)
}, processEvent:function (b, d, c, f, a) {
    if (b == "mousedown") {
        this.onMouseDown(d, d.getTarget());
        return false
    } else {
        return Ext.grid.Column.prototype.processEvent.apply(this, arguments)
    }
}, onMouseDown:function (c, b) {
    if (c.button === 0 && b.className == "x-grid3-row-checker") {
        c.stopEvent();
        var d = c.getTarget(".x-grid3-row");
        if (d) {
            var a = d.rowIndex;
            if (this.isSelected(a)) {
                this.deselectRow(a)
            } else {
                this.selectRow(a, true);
                this.grid.getView().focusRow(a)
            }
        }
    }
}, onHdMouseDown:function (c, a) {
    if (a.className == "x-grid3-hd-checker") {
        c.stopEvent();
        var b = Ext.fly(a.parentNode);
        var d = b.hasClass("x-grid3-hd-checker-on");
        if (d) {
            b.removeClass("x-grid3-hd-checker-on");
            this.clearSelections()
        } else {
            b.addClass("x-grid3-hd-checker-on");
            this.selectAll()
        }
    }
}, renderer:function (b, c, a) {
    return'<div class="x-grid3-row-checker">&#160;</div>'
}, onEditorSelect:function (b, a) {
    if (a != b && !this.checkOnly) {
        this.selectRow(b)
    }
}});