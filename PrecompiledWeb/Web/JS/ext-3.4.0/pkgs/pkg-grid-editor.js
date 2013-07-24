/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.grid.CellSelectionModel = Ext.extend(Ext.grid.AbstractSelectionModel, {constructor:function (a) {
    Ext.apply(this, a);
    this.selection = null;
    this.addEvents("beforecellselect", "cellselect", "selectionchange");
    Ext.grid.CellSelectionModel.superclass.constructor.call(this)
}, initEvents:function () {
    this.grid.on("cellmousedown", this.handleMouseDown, this);
    this.grid.on(Ext.EventManager.getKeyEvent(), this.handleKeyDown, this);
    this.grid.getView().on({scope:this, refresh:this.onViewChange, rowupdated:this.onRowUpdated, beforerowremoved:this.clearSelections, beforerowsinserted:this.clearSelections});
    if (this.grid.isEditor) {
        this.grid.on("beforeedit", this.beforeEdit, this)
    }
}, beforeEdit:function (a) {
    this.select(a.row, a.column, false, true, a.record)
}, onRowUpdated:function (a, b, c) {
    if (this.selection && this.selection.record == c) {
        a.onCellSelect(b, this.selection.cell[1])
    }
}, onViewChange:function () {
    this.clearSelections(true)
}, getSelectedCell:function () {
    return this.selection ? this.selection.cell : null
}, clearSelections:function (b) {
    var a = this.selection;
    if (a) {
        if (b !== true) {
            this.grid.view.onCellDeselect(a.cell[0], a.cell[1])
        }
        this.selection = null;
        this.fireEvent("selectionchange", this, null)
    }
}, hasSelection:function () {
    return this.selection ? true : false
}, handleMouseDown:function (b, d, a, c) {
    if (c.button !== 0 || this.isLocked()) {
        return
    }
    this.select(d, a)
}, select:function (f, c, b, e, d) {
    if (this.fireEvent("beforecellselect", this, f, c) !== false) {
        this.clearSelections();
        d = d || this.grid.store.getAt(f);
        this.selection = {record:d, cell:[f, c]};
        if (!b) {
            var a = this.grid.getView();
            a.onCellSelect(f, c);
            if (e !== true) {
                a.focusCell(f, c)
            }
        }
        this.fireEvent("cellselect", this, f, c);
        this.fireEvent("selectionchange", this, this.selection)
    }
}, isSelectable:function (c, b, a) {
    return !a.isHidden(b)
}, onEditorKey:function (b, a) {
    if (a.getKey() == a.TAB) {
        this.handleKeyDown(a)
    }
}, handleKeyDown:function (i) {
    if (!i.isNavKeyPress()) {
        return
    }
    var d = i.getKey(), h = this.grid, o = this.selection, b = this, l = function (g, c, e) {
        return h.walkCells(g, c, e, h.isEditor && h.editing ? b.acceptsNav : b.isSelectable, b)
    }, n, f, a, j, m;
    switch (d) {
        case i.ESC:
        case i.PAGE_UP:
        case i.PAGE_DOWN:
            break;
        default:
            i.stopEvent();
            break
    }
    if (!o) {
        n = l(0, 0, 1);
        if (n) {
            this.select(n[0], n[1])
        }
        return
    }
    n = o.cell;
    a = n[0];
    j = n[1];
    switch (d) {
        case i.TAB:
            if (i.shiftKey) {
                f = l(a, j - 1, -1)
            } else {
                f = l(a, j + 1, 1)
            }
            break;
        case i.DOWN:
            f = l(a + 1, j, 1);
            break;
        case i.UP:
            f = l(a - 1, j, -1);
            break;
        case i.RIGHT:
            f = l(a, j + 1, 1);
            break;
        case i.LEFT:
            f = l(a, j - 1, -1);
            break;
        case i.ENTER:
            if (h.isEditor && !h.editing) {
                h.startEditing(a, j);
                return
            }
            break
    }
    if (f) {
        a = f[0];
        j = f[1];
        this.select(a, j);
        if (h.isEditor && h.editing) {
            m = h.activeEditor;
            if (m && m.field.triggerBlur) {
                m.field.triggerBlur()
            }
            h.startEditing(a, j)
        }
    }
}, acceptsNav:function (c, b, a) {
    return !a.isHidden(b) && a.isCellEditable(b, c)
}});
Ext.grid.EditorGridPanel = Ext.extend(Ext.grid.GridPanel, {clicksToEdit:2, forceValidation:false, isEditor:true, detectEdit:false, autoEncode:false, trackMouseOver:false, initComponent:function () {
    Ext.grid.EditorGridPanel.superclass.initComponent.call(this);
    if (!this.selModel) {
        this.selModel = new Ext.grid.CellSelectionModel()
    }
    this.activeEditor = null;
    this.addEvents("beforeedit", "afteredit", "validateedit")
}, initEvents:function () {
    Ext.grid.EditorGridPanel.superclass.initEvents.call(this);
    this.getGridEl().on("mousewheel", this.stopEditing.createDelegate(this, [true]), this);
    this.on("columnresize", this.stopEditing, this, [true]);
    if (this.clicksToEdit == 1) {
        this.on("cellclick", this.onCellDblClick, this)
    } else {
        var a = this.getView();
        if (this.clicksToEdit == "auto" && a.mainBody) {
            a.mainBody.on("mousedown", this.onAutoEditClick, this)
        }
        this.on("celldblclick", this.onCellDblClick, this)
    }
}, onResize:function () {
    Ext.grid.EditorGridPanel.superclass.onResize.apply(this, arguments);
    var a = this.activeEditor;
    if (this.editing && a) {
        a.realign(true)
    }
}, onCellDblClick:function (b, c, a) {
    this.startEditing(c, a)
}, onAutoEditClick:function (c, b) {
    if (c.button !== 0) {
        return
    }
    var f = this.view.findRowIndex(b), a = this.view.findCellIndex(b);
    if (f !== false && a !== false) {
        this.stopEditing();
        if (this.selModel.getSelectedCell) {
            var d = this.selModel.getSelectedCell();
            if (d && d[0] === f && d[1] === a) {
                this.startEditing(f, a)
            }
        } else {
            if (this.selModel.isSelected(f)) {
                this.startEditing(f, a)
            }
        }
    }
}, onEditComplete:function (b, d, a) {
    this.editing = false;
    this.lastActiveEditor = this.activeEditor;
    this.activeEditor = null;
    var c = b.record, g = this.colModel.getDataIndex(b.col);
    d = this.postEditValue(d, a, c, g);
    if (this.forceValidation === true || String(d) !== String(a)) {
        var f = {grid:this, record:c, field:g, originalValue:a, value:d, row:b.row, column:b.col, cancel:false};
        if (this.fireEvent("validateedit", f) !== false && !f.cancel && String(d) !== String(a)) {
            c.set(g, f.value);
            delete f.cancel;
            this.fireEvent("afteredit", f)
        }
    }
    this.view.focusCell(b.row, b.col)
}, startEditing:function (h, c) {
    this.stopEditing();
    if (this.colModel.isCellEditable(c, h)) {
        this.view.ensureVisible(h, c, true);
        var d = this.store.getAt(h), g = this.colModel.getDataIndex(c), f = {grid:this, record:d, field:g, value:d.data[g], row:h, column:c, cancel:false};
        if (this.fireEvent("beforeedit", f) !== false && !f.cancel) {
            this.editing = true;
            var b = this.colModel.getCellEditor(c, h);
            if (!b) {
                return
            }
            if (!b.rendered) {
                b.parentEl = this.view.getEditorParent(b);
                b.on({scope:this, render:{fn:function (e) {
                    e.field.focus(false, true)
                }, single:true, scope:this}, specialkey:function (j, i) {
                    this.getSelectionModel().onEditorKey(j, i)
                }, complete:this.onEditComplete, canceledit:this.stopEditing.createDelegate(this, [true])})
            }
            Ext.apply(b, {row:h, col:c, record:d});
            this.lastEdit = {row:h, col:c};
            this.activeEditor = b;
            b.selectSameEditor = (this.activeEditor == this.lastActiveEditor);
            var a = this.preEditValue(d, g);
            b.startEdit(this.view.getCell(h, c).firstChild, Ext.isDefined(a) ? a : "");
            (function () {
                delete b.selectSameEditor
            }).defer(50)
        }
    }
}, preEditValue:function (a, c) {
    var b = a.data[c];
    return this.autoEncode && Ext.isString(b) ? Ext.util.Format.htmlDecode(b) : b
}, postEditValue:function (c, a, b, d) {
    return this.autoEncode && Ext.isString(c) ? Ext.util.Format.htmlEncode(c) : c
}, stopEditing:function (b) {
    if (this.editing) {
        var a = this.lastActiveEditor = this.activeEditor;
        if (a) {
            a[b === true ? "cancelEdit" : "completeEdit"]();
            this.view.focusCell(a.row, a.col)
        }
        this.activeEditor = null
    }
    this.editing = false
}});
Ext.reg("editorgrid", Ext.grid.EditorGridPanel);
Ext.grid.GridEditor = function (b, a) {
    Ext.grid.GridEditor.superclass.constructor.call(this, b, a);
    b.monitorTab = false
};
Ext.extend(Ext.grid.GridEditor, Ext.Editor, {alignment:"tl-tl", autoSize:"width", hideEl:false, cls:"x-small-editor x-grid-editor", shim:false, shadow:false});