/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ns("Ext.calendar");
(function () {
    Ext.apply(Ext.calendar, {Date:{diffDays:function (b, a) {
        day = 1000 * 60 * 60 * 24;
        diff = a.clearTime(true).getTime() - b.clearTime(true).getTime();
        return Math.ceil(diff / day)
    }, copyTime:function (c, b) {
        var a = b.clone();
        a.setHours(c.getHours(), c.getMinutes(), c.getSeconds(), c.getMilliseconds());
        return a
    }, compare:function (c, b, a) {
        if (a !== true) {
            c = c.clone();
            c.setMilliseconds(0);
            b = b.clone();
            b.setMilliseconds(0)
        }
        return b.getTime() - c.getTime()
    }, maxOrMin:function (a) {
        var f = (a ? 0 : Number.MAX_VALUE), c = 0, b = arguments[1], e = b.length;
        for (; c < e; c++) {
            f = Math[a ? "max" : "min"](f, b[c].getTime())
        }
        return new Date(f)
    }, max:function () {
        return this.maxOrMin.apply(this, [true, arguments])
    }, min:function () {
        return this.maxOrMin.apply(this, [false, arguments])
    }}})
})();
Ext.calendar.DayHeaderTemplate = function (a) {
    Ext.apply(this, a);
    this.allDayTpl = new Ext.calendar.BoxLayoutTemplate(a);
    this.allDayTpl.compile();
    Ext.calendar.DayHeaderTemplate.superclass.constructor.call(this, '<div class="ext-cal-hd-ct">', '<table class="ext-cal-hd-days-tbl" cellspacing="0" cellpadding="0">', "<tbody>", "<tr>", '<td class="ext-cal-gutter"></td>', '<td class="ext-cal-hd-days-td"><div class="ext-cal-hd-ad-inner">{allDayTpl}</div></td>', '<td class="ext-cal-gutter-rt"></td>', "</tr>", "</tobdy>", "</table>", "</div>")
};
Ext.extend(Ext.calendar.DayHeaderTemplate, Ext.XTemplate, {applyTemplate:function (a) {
    return Ext.calendar.DayHeaderTemplate.superclass.applyTemplate.call(this, {allDayTpl:this.allDayTpl.apply(a)})
}});
Ext.calendar.DayHeaderTemplate.prototype.apply = Ext.calendar.DayHeaderTemplate.prototype.applyTemplate;
Ext.calendar.DayBodyTemplate = function (a) {
    Ext.apply(this, a);
    Ext.calendar.DayBodyTemplate.superclass.constructor.call(this, '<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0">', "<tbody>", '<tr height="1">', '<td class="ext-cal-gutter"></td>', '<td colspan="{dayCount}">', '<div class="ext-cal-bg-rows">', '<div class="ext-cal-bg-rows-inner">', '<tpl for="times">', '<div class="ext-cal-bg-row">', '<div class="ext-cal-bg-row-div ext-row-{[xindex]}"></div>', "</div>", "</tpl>", "</div>", "</div>", "</td>", "</tr>", "<tr>", '<td class="ext-cal-day-times">', '<tpl for="times">', '<div class="ext-cal-bg-row">', '<div class="ext-cal-day-time-inner">{.}</div>', "</div>", "</tpl>", "</td>", '<tpl for="days">', '<td class="ext-cal-day-col">', '<div class="ext-cal-day-col-inner">', '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter"></div>', "</div>", "</td>", "</tpl>", "</tr>", "</tbody>", "</table>")
};
Ext.extend(Ext.calendar.DayBodyTemplate, Ext.XTemplate, {applyTemplate:function (e) {
    this.today = new Date().clearTime();
    this.dayCount = this.dayCount || 1;
    var a = 0, f = [], b = e.viewStart.clone(), c;
    for (; a < this.dayCount; a++) {
        f[a] = b.add(Date.DAY, a)
    }
    c = [];
    b = new Date().clearTime();
    for (a = 0; a < 24; a++) {
        c.push(b.format("ga"));
        b = b.add(Date.HOUR, 1)
    }
    return Ext.calendar.DayBodyTemplate.superclass.applyTemplate.call(this, {days:f, dayCount:f.length, times:c})
}});
Ext.calendar.DayBodyTemplate.prototype.apply = Ext.calendar.DayBodyTemplate.prototype.applyTemplate;
Ext.calendar.DayViewTemplate = function (a) {
    Ext.apply(this, a);
    this.headerTpl = new Ext.calendar.DayHeaderTemplate(a);
    this.headerTpl.compile();
    this.bodyTpl = new Ext.calendar.DayBodyTemplate(a);
    this.bodyTpl.compile();
    Ext.calendar.DayViewTemplate.superclass.constructor.call(this, '<div class="ext-cal-inner-ct">', "{headerTpl}", "{bodyTpl}", "</div>")
};
Ext.extend(Ext.calendar.DayViewTemplate, Ext.XTemplate, {applyTemplate:function (a) {
    return Ext.calendar.DayViewTemplate.superclass.applyTemplate.call(this, {headerTpl:this.headerTpl.apply(a), bodyTpl:this.bodyTpl.apply(a)})
}});
Ext.calendar.DayViewTemplate.prototype.apply = Ext.calendar.DayViewTemplate.prototype.applyTemplate;
Ext.calendar.BoxLayoutTemplate = function (a) {
    Ext.apply(this, a);
    var b = this.showWeekLinks ? '<div id="{weekLinkId}" class="ext-cal-week-link">{weekNum}</div>' : "";
    Ext.calendar.BoxLayoutTemplate.superclass.constructor.call(this, '<tpl for="weeks">', '<div id="{[this.id]}-wk-{[xindex-1]}" class="ext-cal-wk-ct" style="top:{[this.getRowTop(xindex, xcount)]}%; height:{[this.getRowHeight(xcount)]}%;">', b, '<table class="ext-cal-bg-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for=".">', '<td id="{[this.id]}-day-{date:date("Ymd")}" class="{cellCls}">&nbsp;</td>', "</tpl>", "</tr>", "</tbody>", "</table>", '<table class="ext-cal-evt-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for=".">', '<td id="{[this.id]}-ev-day-{date:date("Ymd")}" class="{titleCls}"><div>{title}</div></td>', "</tpl>", "</tr>", "</tbody>", "</table>", "</div>", "</tpl>", {getRowTop:function (c, e) {
        return((c - 1) * (100 / e))
    }, getRowHeight:function (c) {
        return 100 / c
    }})
};
Ext.extend(Ext.calendar.BoxLayoutTemplate, Ext.XTemplate, {applyTemplate:function (e) {
    Ext.apply(this, e);
    var n = 0, m = "", h = true, j = false, f = false, g = false, i = false, a = [
        []
    ], l = new Date().clearTime(), c = this.viewStart.clone(), b = this.startDate.getMonth();
    for (; n < this.weekCount || this.weekCount == -1; n++) {
        if (c > this.viewEnd) {
            break
        }
        a[n] = [];
        for (var k = 0; k < this.dayCount; k++) {
            j = c.getTime() === l.getTime();
            f = h || (c.getDate() == 1);
            g = (c.getMonth() < b) && this.weekCount == -1;
            i = (c.getMonth() > b) && this.weekCount == -1;
            if (c.getDay() == 1) {
                a[n].weekNum = this.showWeekNumbers ? c.format("W") : "&nbsp;";
                a[n].weekLinkId = "ext-cal-week-" + c.format("Ymd")
            }
            if (f) {
                if (j) {
                    m = this.getTodayText()
                } else {
                    m = c.format(this.dayCount == 1 ? "l, F j, Y" : (h ? "M j, Y" : "M j"))
                }
            } else {
                var p = (n == 0 && this.showHeader !== true) ? "D j" : "j";
                m = j ? this.getTodayText() : c.format(p)
            }
            a[n].push({title:m, date:c.clone(), titleCls:"ext-cal-dtitle " + (j ? " ext-cal-dtitle-today" : "") + (n == 0 ? " ext-cal-dtitle-first" : "") + (g ? " ext-cal-dtitle-prev" : "") + (i ? " ext-cal-dtitle-next" : ""), cellCls:"ext-cal-day " + (j ? " ext-cal-day-today" : "") + (k == 0 ? " ext-cal-day-first" : "") + (g ? " ext-cal-day-prev" : "") + (i ? " ext-cal-day-next" : "")});
            c = c.add(Date.DAY, 1);
            h = false
        }
    }
    return Ext.calendar.BoxLayoutTemplate.superclass.applyTemplate.call(this, {weeks:a})
}, getTodayText:function () {
    var b = new Date().format("l, F j, Y"), c = this.showTodayText !== false ? this.todayText : "", a = this.showTime !== false ? ' <span id="' + this.id + '-clock" class="ext-cal-dtitle-time">' + new Date().format("g:i a") + "</span>" : "", e = c.length > 0 || a.length > 0 ? " &mdash; " : "";
    if (this.dayCount == 1) {
        return b + e + c + a
    }
    fmt = this.weekCount == 1 ? "D j" : "j";
    return c.length > 0 ? c + a : new Date().format(fmt) + a
}});
Ext.calendar.BoxLayoutTemplate.prototype.apply = Ext.calendar.BoxLayoutTemplate.prototype.applyTemplate;
Ext.calendar.MonthViewTemplate = function (a) {
    Ext.apply(this, a);
    this.weekTpl = new Ext.calendar.BoxLayoutTemplate(a);
    this.weekTpl.compile();
    var b = this.showWeekLinks ? '<div class="ext-cal-week-link-hd">&nbsp;</div>' : "";
    Ext.calendar.MonthViewTemplate.superclass.constructor.call(this, '<div class="ext-cal-inner-ct {extraClasses}">', '<div class="ext-cal-hd-ct ext-cal-month-hd">', b, '<table class="ext-cal-hd-days-tbl" cellpadding="0" cellspacing="0">', "<tbody>", "<tr>", '<tpl for="days">', '<th class="ext-cal-hd-day{[xindex==1 ? " ext-cal-day-first" : ""]}" title="{.:date("l, F j, Y")}">{.:date("D")}</th>', "</tpl>", "</tr>", "</tbody>", "</table>", "</div>", '<div class="ext-cal-body-ct">{weeks}</div>', "</div>")
};
Ext.extend(Ext.calendar.MonthViewTemplate, Ext.XTemplate, {applyTemplate:function (f) {
    var g = [], e = this.weekTpl.apply(f), c = f.viewStart;
    for (var b = 0; b < 7; b++) {
        g.push(c.add(Date.DAY, b))
    }
    var a = this.showHeader === true ? "" : "ext-cal-noheader";
    if (this.showWeekLinks) {
        a += " ext-cal-week-links"
    }
    return Ext.calendar.MonthViewTemplate.superclass.applyTemplate.call(this, {days:g, weeks:e, extraClasses:a})
}});
Ext.calendar.MonthViewTemplate.prototype.apply = Ext.calendar.MonthViewTemplate.prototype.applyTemplate;
Ext.dd.ScrollManager = function () {
    var c = Ext.dd.DragDropMgr, f = {}, b = null, i = {}, h = function (l) {
        b = null;
        a()
    }, j = function () {
        if (c.dragCurrent) {
            c.refreshCache(c.dragCurrent.groups)
        }
    }, e = function () {
        if (c.dragCurrent) {
            var l = Ext.dd.ScrollManager, m = i.el.ddScrollConfig ? i.el.ddScrollConfig.increment : l.increment;
            if (!l.animate) {
                if (i.el.scroll(i.dir, m)) {
                    j()
                }
            } else {
                i.el.scroll(i.dir, m, true, l.animDuration, j)
            }
        }
    }, a = function () {
        if (i.id) {
            clearInterval(i.id)
        }
        i.id = 0;
        i.el = null;
        i.dir = ""
    }, g = function (m, l) {
        a();
        i.el = m;
        i.dir = l;
        var o = (m.ddScrollConfig && m.ddScrollConfig.frequency) ? m.ddScrollConfig.frequency : Ext.dd.ScrollManager.frequency, n = m.ddScrollConfig ? m.ddScrollConfig.ddGroup : undefined;
        if (n === undefined || c.dragCurrent.ddGroup == n) {
            i.id = setInterval(e, o)
        }
    }, k = function (o, q) {
        if (q || !c.dragCurrent) {
            return
        }
        var s = Ext.dd.ScrollManager;
        if (!b || b != c.dragCurrent) {
            b = c.dragCurrent;
            s.refreshCache()
        }
        var t = Ext.lib.Event.getXY(o), u = new Ext.lib.Point(t[0], t[1]), m, n, l, p;
        for (m in f) {
            if (f.hasOwnProperty(m)) {
                n = f[m];
                l = n._region;
                p = n.ddScrollConfig ? n.ddScrollConfig : s;
                if (l && l.contains(u) && n.isScrollable()) {
                    if (l.bottom - u.y <= p.vthresh) {
                        if (i.el != n) {
                            g(n, "down")
                        }
                        return
                    } else {
                        if (l.right - u.x <= p.hthresh) {
                            if (i.el != n) {
                                g(n, "left")
                            }
                            return
                        } else {
                            if (u.y - l.top <= p.vthresh) {
                                if (i.el != n) {
                                    g(n, "up")
                                }
                                return
                            } else {
                                if (u.x - l.left <= p.hthresh) {
                                    if (i.el != n) {
                                        g(n, "right")
                                    }
                                    return
                                }
                            }
                        }
                    }
                }
            }
        }
        a()
    };
    c.fireEvents = c.fireEvents.createSequence(k, c);
    c.stopDrag = c.stopDrag.createSequence(h, c);
    return{register:function (n) {
        if (Ext.isArray(n)) {
            var m = 0, l = n.length;
            for (; m < l; m++) {
                this.register(n[m])
            }
        } else {
            n = Ext.get(n);
            f[n.id] = n
        }
    }, unregister:function (n) {
        if (Ext.isArray(n)) {
            var m = 0, l = n.length;
            for (; m < l; m++) {
                this.unregister(n[m])
            }
        } else {
            n = Ext.get(n);
            delete f[n.id]
        }
    }, vthresh:25, hthresh:25, increment:100, frequency:500, animate:true, animDuration:0.4, refreshCache:function () {
        var l;
        for (l in f) {
            if (f.hasOwnProperty(l)) {
                if (typeof f[l] == "object") {
                    f[l]._region = f[l].getRegion()
                }
            }
        }
    }}
}();
Ext.calendar.StatusProxy = function (a) {
    Ext.apply(this, a);
    this.id = this.id || Ext.id();
    this.el = new Ext.Layer({dh:{id:this.id, cls:"ext-dd-drag-proxy x-dd-drag-proxy " + this.dropNotAllowed, cn:[
        {cls:"x-dd-drop-icon"},
        {cls:"ext-dd-ghost-ct", cn:[
            {cls:"x-dd-drag-ghost"},
            {cls:"ext-dd-msg"}
        ]}
    ]}, shadow:!a || a.shadow !== false});
    this.ghost = Ext.get(this.el.dom.childNodes[1].childNodes[0]);
    this.message = Ext.get(this.el.dom.childNodes[1].childNodes[1]);
    this.dropStatus = this.dropNotAllowed
};
Ext.extend(Ext.calendar.StatusProxy, Ext.dd.StatusProxy, {moveEventCls:"ext-cal-dd-move", addEventCls:"ext-cal-dd-add", update:function (a) {
    if (typeof a == "string") {
        this.ghost.update(a)
    } else {
        this.ghost.update("");
        a.style.margin = "0";
        this.ghost.dom.appendChild(a)
    }
    var b = this.ghost.dom.firstChild;
    if (b) {
        Ext.fly(b).setStyle("float", "none").setHeight("auto");
        Ext.getDom(b).id += "-ddproxy"
    }
}, updateMsg:function (a) {
    this.message.update(a)
}});
Ext.calendar.DragZone = Ext.extend(Ext.dd.DragZone, {ddGroup:"CalendarDD", eventSelector:".ext-cal-evt", constructor:function (b, a) {
    if (!Ext.calendar._statusProxyInstance) {
        Ext.calendar._statusProxyInstance = new Ext.calendar.StatusProxy()
    }
    this.proxy = Ext.calendar._statusProxyInstance;
    Ext.calendar.DragZone.superclass.constructor.call(this, b, a)
}, getDragData:function (b) {
    var a = b.getTarget(this.eventSelector, 3);
    if (a) {
        var c = this.view.getEventRecordFromEl(a);
        return{type:"eventdrag", ddel:a, eventStart:c.data[Ext.calendar.EventMappings.StartDate.name], eventEnd:c.data[Ext.calendar.EventMappings.EndDate.name], proxy:this.proxy}
    }
    a = this.view.getDayAt(b.getPageX(), b.getPageY());
    if (a.el) {
        return{type:"caldrag", start:a.date, proxy:this.proxy}
    }
    return null
}, onInitDrag:function (a, e) {
    if (this.dragData.ddel) {
        var b = this.dragData.ddel.cloneNode(true), c = Ext.fly(b).child("dl");
        Ext.fly(b).setWidth("auto");
        if (c) {
            c.setHeight("auto")
        }
        this.proxy.update(b);
        this.onStartDrag(a, e)
    } else {
        if (this.dragData.start) {
            this.onStartDrag(a, e)
        }
    }
    this.view.onInitDrag();
    return true
}, afterRepair:function () {
    if (Ext.enableFx && this.dragData.ddel) {
        Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor || "c3daf9")
    }
    this.dragging = false
}, getRepairXY:function (a) {
    if (this.dragData.ddel) {
        return Ext.Element.fly(this.dragData.ddel).getXY()
    }
}, afterInvalidDrop:function (a, b) {
    Ext.select(".ext-dd-shim").hide()
}});
Ext.calendar.DropZone = Ext.extend(Ext.dd.DropZone, {ddGroup:"CalendarDD", eventSelector:".ext-cal-evt", shims:[], getTargetFromEvent:function (b) {
    var a = this.dragOffset || 0, f = b.getPageY() - a, c = this.view.getDayAt(b.getPageX(), f);
    return c.el ? c : null
}, onNodeOver:function (f, k, j, h) {
    var a = Ext.calendar.Date, b = h.type == "eventdrag" ? f.date : a.min(h.start, f.date), g = h.type == "eventdrag" ? f.date.add(Date.DAY, a.diffDays(h.eventStart, h.eventEnd)) : a.max(h.start, f.date);
    if (!this.dragStartDate || !this.dragEndDate || (a.diffDays(b, this.dragStartDate) != 0) || (a.diffDays(g, this.dragEndDate) != 0)) {
        this.dragStartDate = b;
        this.dragEndDate = g.clearTime().add(Date.DAY, 1).add(Date.MILLI, -1);
        this.shim(b, g);
        var i = b.format("n/j");
        if (a.diffDays(b, g) > 0) {
            i += "-" + g.format("n/j")
        }
        var c = String.format(h.type == "eventdrag" ? this.moveText : this.createText, i);
        h.proxy.updateMsg(c)
    }
    return this.dropAllowed
}, shim:function (a, f) {
    this.currWeek = -1;
    var b = a.clone(), g = 0, e, h, c = Ext.calendar.Date.diffDays(b, f) + 1;
    Ext.each(this.shims, function (i) {
        if (i) {
            i.isActive = false
        }
    });
    while (g++ < c) {
        var j = this.view.getDayEl(b);
        if (j) {
            var k = this.view.getWeekIndex(b);
            e = this.shims[k];
            if (!e) {
                e = this.createShim();
                this.shims[k] = e
            }
            if (k != this.currWeek) {
                e.boxInfo = j.getBox();
                this.currWeek = k
            } else {
                h = j.getBox();
                e.boxInfo.right = h.right;
                e.boxInfo.width = h.right - e.boxInfo.x
            }
            e.isActive = true
        }
        b = b.add(Date.DAY, 1)
    }
    Ext.each(this.shims, function (i) {
        if (i) {
            if (i.isActive) {
                i.show();
                i.setBox(i.boxInfo)
            } else {
                if (i.isVisible()) {
                    i.hide()
                }
            }
        }
    })
}, createShim:function () {
    if (!this.shimCt) {
        this.shimCt = Ext.get("ext-dd-shim-ct");
        if (!this.shimCt) {
            this.shimCt = document.createElement("div");
            this.shimCt.id = "ext-dd-shim-ct";
            Ext.getBody().appendChild(this.shimCt)
        }
    }
    var a = document.createElement("div");
    a.className = "ext-dd-shim";
    this.shimCt.appendChild(a);
    return new Ext.Layer({shadow:false, useDisplay:true, constrain:false}, a)
}, clearShims:function () {
    Ext.each(this.shims, function (a) {
        if (a) {
            a.hide()
        }
    })
}, onContainerOver:function (a, c, b) {
    return this.dropAllowed
}, onCalendarDragComplete:function () {
    delete this.dragStartDate;
    delete this.dragEndDate;
    this.clearShims()
}, onNodeDrop:function (h, a, f, c) {
    if (h && c) {
        if (c.type == "eventdrag") {
            var g = this.view.getEventRecordFromEl(c.ddel), b = Ext.calendar.Date.copyTime(g.data[Ext.calendar.EventMappings.StartDate.name], h.date);
            this.view.onEventDrop(g, b);
            this.onCalendarDragComplete();
            return true
        }
        if (c.type == "caldrag") {
            this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, this.onCalendarDragComplete.createDelegate(this));
            return true
        }
    }
    this.onCalendarDragComplete();
    return false
}, onContainerDrop:function (a, c, b) {
    this.onCalendarDragComplete();
    return false
}, destroy:function () {
    Ext.calendar.DropZone.superclass.destroy.call(this);
    Ext.destroy(this.shimCt)
}});
Ext.calendar.DayViewDragZone = Ext.extend(Ext.calendar.DragZone, {ddGroup:"DayViewDD", resizeSelector:".ext-evt-rsz", getDragData:function (c) {
    var a = c.getTarget(this.resizeSelector, 2, true), b, f;
    if (a) {
        b = a.parent(this.eventSelector);
        f = this.view.getEventRecordFromEl(b);
        return{type:"eventresize", ddel:b.dom, eventStart:f.data[Ext.calendar.EventMappings.StartDate.name], eventEnd:f.data[Ext.calendar.EventMappings.EndDate.name], proxy:this.proxy}
    }
    a = c.getTarget(this.eventSelector, 3);
    if (a) {
        f = this.view.getEventRecordFromEl(a);
        return{type:"eventdrag", ddel:a, eventStart:f.data[Ext.calendar.EventMappings.StartDate.name], eventEnd:f.data[Ext.calendar.EventMappings.EndDate.name], proxy:this.proxy}
    }
    a = this.view.getDayAt(c.getPageX(), c.getPageY());
    if (a.el) {
        return{type:"caldrag", dayInfo:a, proxy:this.proxy}
    }
    return null
}});
Ext.calendar.DayViewDropZone = Ext.extend(Ext.calendar.DropZone, {ddGroup:"DayViewDD", onNodeOver:function (c, k, j, g) {
    var b, h, i, l = this.createText, p, a, f, o, m;
    if (g.type == "caldrag") {
        if (!this.dragStartMarker) {
            this.dragStartMarker = c.el.parent().createChild({style:"position:absolute;"});
            this.dragStartMarker.setBox(c.timeBox);
            this.dragCreateDt = c.date
        }
        h = this.dragStartMarker.getBox();
        h.height = Math.ceil(Math.abs(j.xy[1] - h.y) / c.timeBox.height) * c.timeBox.height;
        if (j.xy[1] < h.y) {
            h.height += c.timeBox.height;
            h.y = h.y - h.height + c.timeBox.height;
            i = this.dragCreateDt.add(Date.MINUTE, 30)
        } else {
            c.date = c.date.add(Date.MINUTE, 30)
        }
        this.shim(this.dragCreateDt, h);
        p = Ext.calendar.Date.copyTime(c.date, this.dragCreateDt);
        this.dragStartDate = Ext.calendar.Date.min(this.dragCreateDt, p);
        this.dragEndDate = i || Ext.calendar.Date.max(this.dragCreateDt, p);
        b = this.dragStartDate.format("g:ia-") + this.dragEndDate.format("g:ia")
    } else {
        o = Ext.get(g.ddel);
        m = o.parent().parent();
        h = o.getBox();
        h.width = m.getWidth();
        if (g.type == "eventdrag") {
            if (this.dragOffset === undefined) {
                this.dragOffset = c.timeBox.y - h.y;
                h.y = c.timeBox.y - this.dragOffset
            } else {
                h.y = c.timeBox.y
            }
            b = c.date.format("n/j g:ia");
            h.x = c.el.getLeft();
            this.shim(c.date, h);
            l = this.moveText
        }
        if (g.type == "eventresize") {
            if (!this.resizeDt) {
                this.resizeDt = c.date
            }
            h.x = m.getLeft();
            h.height = Math.ceil(Math.abs(j.xy[1] - h.y) / c.timeBox.height) * c.timeBox.height;
            if (j.xy[1] < h.y) {
                h.y -= h.height
            } else {
                c.date = c.date.add(Date.MINUTE, 30)
            }
            this.shim(this.resizeDt, h);
            p = Ext.calendar.Date.copyTime(c.date, this.resizeDt);
            a = Ext.calendar.Date.min(g.eventStart, p);
            f = Ext.calendar.Date.max(g.eventStart, p);
            g.resizeDates = {StartDate:a, EndDate:f};
            b = a.format("g:ia-") + f.format("g:ia");
            l = this.resizeText
        }
    }
    g.proxy.updateMsg(String.format(l, b));
    return this.dropAllowed
}, shim:function (b, a) {
    Ext.each(this.shims, function (e) {
        if (e) {
            e.isActive = false;
            e.hide()
        }
    });
    var c = this.shims[0];
    if (!c) {
        c = this.createShim();
        this.shims[0] = c
    }
    c.isActive = true;
    c.show();
    c.setBox(a)
}, onNodeDrop:function (g, a, c, b) {
    var f;
    if (g && b) {
        if (b.type == "eventdrag") {
            f = this.view.getEventRecordFromEl(b.ddel);
            this.view.onEventDrop(f, g.date);
            this.onCalendarDragComplete();
            delete this.dragOffset;
            return true
        }
        if (b.type == "eventresize") {
            f = this.view.getEventRecordFromEl(b.ddel);
            this.view.onEventResize(f, b.resizeDates);
            this.onCalendarDragComplete();
            delete this.resizeDt;
            return true
        }
        if (b.type == "caldrag") {
            Ext.destroy(this.dragStartMarker);
            delete this.dragStartMarker;
            delete this.dragCreateDt;
            this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate, this.onCalendarDragComplete.createDelegate(this));
            return true
        }
    }
    this.onCalendarDragComplete();
    return false
}});
Ext.calendar.EventMappings = {EventId:{name:"EventId", mapping:"id", type:"int"}, CalendarId:{name:"CalendarId", mapping:"cid", type:"int"}, Title:{name:"Title", mapping:"title", type:"string"}, StartDate:{name:"StartDate", mapping:"start", type:"date", dateFormat:"c"}, EndDate:{name:"EndDate", mapping:"end", type:"date", dateFormat:"c"}, Location:{name:"Location", mapping:"loc", type:"string"}, Notes:{name:"Notes", mapping:"notes", type:"string"}, Url:{name:"Url", mapping:"url", type:"string"}, IsAllDay:{name:"IsAllDay", mapping:"ad", type:"boolean"}, Reminder:{name:"Reminder", mapping:"rem", type:"string"}, IsNew:{name:"IsNew", mapping:"n", type:"boolean"}};
(function () {
    var a = Ext.calendar.EventMappings;
    Ext.calendar.EventRecord = Ext.data.Record.create([a.EventId, a.CalendarId, a.Title, a.StartDate, a.EndDate, a.Location, a.Notes, a.Url, a.IsAllDay, a.Reminder, a.IsNew]);
    Ext.calendar.EventRecord.reconfigure = function () {
        Ext.calendar.EventRecord = Ext.data.Record.create([a.EventId, a.CalendarId, a.Title, a.StartDate, a.EndDate, a.Location, a.Notes, a.Url, a.IsAllDay, a.Reminder, a.IsNew])
    }
})();
Ext.calendar.MonthDayDetailView = Ext.extend(Ext.BoxComponent, {initComponent:function () {
    Ext.calendar.CalendarView.superclass.initComponent.call(this);
    this.addEvents({eventsrendered:true});
    if (!this.el) {
        this.el = document.createElement("div")
    }
}, afterRender:function () {
    this.tpl = this.getTemplate();
    Ext.calendar.MonthDayDetailView.superclass.afterRender.call(this);
    this.el.on({click:this.view.onClick, mouseover:this.view.onMouseOver, mouseout:this.view.onMouseOut, scope:this.view})
}, getTemplate:function () {
    if (!this.tpl) {
        this.tpl = new Ext.XTemplate('<div class="ext-cal-mdv x-unselectable">', '<table class="ext-cal-mvd-tbl" cellpadding="0" cellspacing="0">', "<tbody>", '<tpl for=".">', '<tr><td class="ext-cal-ev">{markup}</td></tr>', "</tpl>", "</tbody>", "</table>", "</div>")
    }
    this.tpl.compile();
    return this.tpl
}, update:function (a) {
    this.date = a;
    this.refresh()
}, refresh:function () {
    if (!this.rendered) {
        return
    }
    var a = this.view.getEventTemplate(), b = [];
    evts = this.store.queryBy(function (i) {
        var f = this.date.clearTime(true).getTime(), e = i.data[Ext.calendar.EventMappings.StartDate.name].clearTime(true).getTime(), g = (f == e), h = false;
        if (!g) {
            var c = i.data[Ext.calendar.EventMappings.EndDate.name].clearTime(true).getTime();
            h = e < f && c >= f
        }
        return g || h
    }, this);
    evts.each(function (c) {
        var e = c.data, f = Ext.calendar.EventMappings;
        e._renderAsAllDay = e[f.IsAllDay.name] || Ext.calendar.Date.diffDays(e[f.StartDate.name], e[f.EndDate.name]) > 0;
        e.spanLeft = Ext.calendar.Date.diffDays(e[f.StartDate.name], this.date) > 0;
        e.spanRight = Ext.calendar.Date.diffDays(this.date, e[f.EndDate.name]) > 0;
        e.spanCls = (e.spanLeft ? (e.spanRight ? "ext-cal-ev-spanboth" : "ext-cal-ev-spanleft") : (e.spanRight ? "ext-cal-ev-spanright" : ""));
        b.push({markup:a.apply(this.getTemplateEventData(e))})
    }, this);
    this.tpl.overwrite(this.el, b);
    this.fireEvent("eventsrendered", this, this.date, evts.getCount())
}, getTemplateEventData:function (a) {
    var b = this.view.getTemplateEventData(a);
    b._elId = "dtl-" + b._elId;
    return b
}});
Ext.reg("monthdaydetailview", Ext.calendar.MonthDayDetailView);
Ext.calendar.CalendarPicker = Ext.extend(Ext.form.ComboBox, {fieldLabel:"Calendar", valueField:"CalendarId", displayField:"Title", triggerAction:"all", mode:"local", forceSelection:true, width:200, initComponent:function () {
    Ext.calendar.CalendarPicker.superclass.initComponent.call(this);
    this.tpl = this.tpl || '<tpl for="."><div class="x-combo-list-item ext-color-{' + this.valueField + '}"><div class="ext-cal-picker-icon">&nbsp;</div>{' + this.displayField + "}</div></tpl>"
}, afterRender:function () {
    Ext.calendar.CalendarPicker.superclass.afterRender.call(this);
    this.wrap = this.el.up(".x-form-field-wrap");
    this.wrap.addClass("ext-calendar-picker");
    this.icon = Ext.DomHelper.append(this.wrap, {tag:"div", cls:"ext-cal-picker-icon ext-cal-picker-mainicon"})
}, setValue:function (a) {
    this.wrap.removeClass("ext-color-" + this.getValue());
    if (!a && this.store !== undefined) {
        a = this.store.getAt(0).data.CalendarId
    }
    Ext.calendar.CalendarPicker.superclass.setValue.call(this, a);
    this.wrap.addClass("ext-color-" + a)
}});
Ext.reg("calendarpicker", Ext.calendar.CalendarPicker);
Ext.calendar.WeekEventRenderer = function () {
    var a = function (i, f, e) {
        var h = 1, c, b = Ext.get(i + "-wk-" + f);
        if (b) {
            var g = b.child(".ext-cal-evt-tbl", true);
            c = g.tBodies[0].childNodes[e + h];
            if (!c) {
                c = Ext.DomHelper.append(g.tBodies[0], "<tr></tr>")
            }
        }
        return Ext.get(c)
    };
    return{render:function (m) {
        var g = 0, b = m.eventGrid, k = m.viewStart.clone(), l = m.tpl, q = m.maxEventsPerDay != undefined ? m.maxEventsPerDay : 999, s = m.weekCount < 1 ? 6 : m.weekCount, n = m.weekCount == 1 ? m.dayCount : 7, p;
        for (; g < s; g++) {
            if (!b[g] || b[g].length == 0) {
                if (s == 1) {
                    f = a(m.id, g, 0);
                    p = {tag:"td", cls:"ext-cal-ev", id:m.id + "-empty-0-day-" + k.format("Ymd"), html:"&nbsp;"};
                    if (n > 1) {
                        p.colspan = n
                    }
                    Ext.DomHelper.append(f, p)
                }
                k = k.add(Date.DAY, 7)
            } else {
                var f, x = 0, c = b[g], z = k.clone(), h = z.add(Date.DAY, n).add(Date.MILLI, -1);
                for (; x < n; x++) {
                    if (c[x]) {
                        var v = emptyCells = skipped = 0, r = c[x], e = r.length, j;
                        for (; v < e; v++) {
                            if (!r[v]) {
                                emptyCells++;
                                continue
                            }
                            if (emptyCells > 0 && v - emptyCells < q) {
                                f = a(m.id, g, v - emptyCells);
                                p = {tag:"td", cls:"ext-cal-ev", id:m.id + "-empty-" + e + "-day-" + k.format("Ymd")};
                                if (emptyCells > 1 && q - v > emptyCells) {
                                    p.rowspan = Math.min(emptyCells, q - v)
                                }
                                Ext.DomHelper.append(f, p);
                                emptyCells = 0
                            }
                            if (v >= q) {
                                skipped++;
                                continue
                            }
                            j = r[v];
                            if (!j.isSpan || j.isSpanStart) {
                                var u = j.data || j.event.data;
                                u._weekIndex = g;
                                u._renderAsAllDay = u[Ext.calendar.EventMappings.IsAllDay.name] || j.isSpanStart;
                                u.spanLeft = u[Ext.calendar.EventMappings.StartDate.name].getTime() < z.getTime();
                                u.spanRight = u[Ext.calendar.EventMappings.EndDate.name].getTime() > h.getTime();
                                u.spanCls = (u.spanLeft ? (u.spanRight ? "ext-cal-ev-spanboth" : "ext-cal-ev-spanleft") : (u.spanRight ? "ext-cal-ev-spanright" : ""));
                                f = a(m.id, g, v);
                                p = {tag:"td", cls:"ext-cal-ev", cn:l.apply(m.templateDataFn(u))};
                                var i = Ext.calendar.Date.diffDays(k, u[Ext.calendar.EventMappings.EndDate.name]) + 1, t = Math.min(i, n - x);
                                if (t > 1) {
                                    p.colspan = t
                                }
                                Ext.DomHelper.append(f, p)
                            }
                        }
                        if (v > q) {
                            f = a(m.id, g, q);
                            Ext.DomHelper.append(f, {tag:"td", cls:"ext-cal-ev-more", id:"ext-cal-ev-more-" + k.format("Ymd"), cn:{tag:"a", html:"+" + skipped + " more..."}})
                        }
                        if (e < m.evtMaxCount[g]) {
                            f = a(m.id, g, e);
                            if (f) {
                                p = {tag:"td", cls:"ext-cal-ev", id:m.id + "-empty-" + (e + 1) + "-day-" + k.format("Ymd")};
                                var y = m.evtMaxCount[g] - e;
                                if (y > 1) {
                                    p.rowspan = y
                                }
                                Ext.DomHelper.append(f, p)
                            }
                        }
                    } else {
                        f = a(m.id, g, 0);
                        if (f) {
                            p = {tag:"td", cls:"ext-cal-ev", id:m.id + "-empty-day-" + k.format("Ymd")};
                            if (m.evtMaxCount[g] > 1) {
                                p.rowSpan = m.evtMaxCount[g]
                            }
                            Ext.DomHelper.append(f, p)
                        }
                    }
                    k = k.add(Date.DAY, 1)
                }
            }
        }
    }}
}();
Ext.calendar.CalendarView = Ext.extend(Ext.BoxComponent, {startDay:0, spansHavePriority:false, trackMouseOver:true, enableFx:true, enableAddFx:true, enableUpdateFx:false, enableRemoveFx:true, enableDD:true, monitorResize:true, ddCreateEventText:"Create event for {0}", ddMoveEventText:"Move event to {0}", ddResizeEventText:"Update event to {0}", weekCount:1, dayCount:1, eventSelector:".ext-cal-evt", eventOverClass:"ext-evt-over", eventElIdDelimiter:"-evt-", dayElIdDelimiter:"-day-", getEventBodyMarkup:Ext.emptyFn, getEventTemplate:Ext.emptyFn, initComponent:function () {
    this.setStartDate(this.startDate || new Date());
    Ext.calendar.CalendarView.superclass.initComponent.call(this);
    this.addEvents({eventsrendered:true, eventclick:true, eventover:true, eventout:true, datechange:true, rangeselect:true, eventmove:true, initdrag:true, dayover:true, dayout:true})
}, afterRender:function () {
    Ext.calendar.CalendarView.superclass.afterRender.call(this);
    this.renderTemplate();
    if (this.store) {
        this.setStore(this.store, true)
    }
    this.el.on({mouseover:this.onMouseOver, mouseout:this.onMouseOut, click:this.onClick, resize:this.onResize, scope:this});
    this.el.unselectable();
    if (this.enableDD && this.initDD) {
        this.initDD()
    }
    this.on("eventsrendered", this.forceSize);
    this.forceSize.defer(100, this)
}, forceSize:function () {
    if (this.el && this.el.child) {
        var e = this.el.child(".ext-cal-hd-ct"), b = this.el.child(".ext-cal-body-ct");
        if (b == null || e == null) {
            return
        }
        var a = e.getHeight(), c = this.el.parent().getSize();
        b.setHeight(c.height - a)
    }
}, refresh:function () {
    this.prepareData();
    this.renderTemplate();
    this.renderItems()
}, getWeekCount:function () {
    var a = Ext.calendar.Date.diffDays(this.viewStart, this.viewEnd);
    return Math.ceil(a / this.dayCount)
}, prepareData:function () {
    var h = this.startDate.getLastDateOfMonth(), c = 0, g = 0, f = this.viewStart.clone(), e = this.weekCount < 1 ? 6 : this.weekCount;
    this.eventGrid = [
        []
    ];
    this.allDayGrid = [
        []
    ];
    this.evtMaxCount = [];
    var b = this.store.queryBy(function (i) {
        return this.isEventVisible(i.data)
    }, this);
    for (; c < e; c++) {
        this.evtMaxCount[c] = 0;
        if (this.weekCount == -1 && f > h) {
            break
        }
        this.eventGrid[c] = this.eventGrid[c] || [];
        this.allDayGrid[c] = this.allDayGrid[c] || [];
        for (d = 0; d < this.dayCount; d++) {
            if (b.getCount() > 0) {
                var a = b.filterBy(function (k) {
                    var j = (f.getTime() == k.data[Ext.calendar.EventMappings.StartDate.name].clearTime(true).getTime());
                    var i = (c == 0 && d == 0 && (f > k.data[Ext.calendar.EventMappings.StartDate.name]));
                    return j || i
                }, this);
                this.sortEventRecordsForDay(a);
                this.prepareEventGrid(a, c, d)
            }
            f = f.add(Date.DAY, 1)
        }
    }
    this.currentWeekCount = c
}, prepareEventGrid:function (c, b, g) {
    var f = 0, e = this.viewStart.clone(), a = this.maxEventsPerDay ? this.maxEventsPerDay : 999;
    c.each(function (h) {
        var j = Ext.calendar.EventMappings, i = Ext.calendar.Date.diffDays(Ext.calendar.Date.max(this.viewStart, h.data[j.StartDate.name]), Ext.calendar.Date.min(this.viewEnd, h.data[j.EndDate.name])) + 1;
        if (i > 1 || Ext.calendar.Date.diffDays(h.data[j.StartDate.name], h.data[j.EndDate.name]) > 1) {
            this.prepareEventGridSpans(h, this.eventGrid, b, g, i);
            this.prepareEventGridSpans(h, this.allDayGrid, b, g, i, true)
        } else {
            f = this.findEmptyRowIndex(b, g);
            this.eventGrid[b][g] = this.eventGrid[b][g] || [];
            this.eventGrid[b][g][f] = h;
            if (h.data[j.IsAllDay.name]) {
                f = this.findEmptyRowIndex(b, g, true);
                this.allDayGrid[b][g] = this.allDayGrid[b][g] || [];
                this.allDayGrid[b][g][f] = h
            }
        }
        if (this.evtMaxCount[b] < this.eventGrid[b][g].length) {
            this.evtMaxCount[b] = Math.min(a + 1, this.eventGrid[b][g].length)
        }
        return true
    }, this)
}, prepareEventGridSpans:function (i, a, h, g, j, k) {
    var f = h, b = g, l = this.findEmptyRowIndex(h, g, k), e = this.viewStart.clone();
    var c = {event:i, isSpan:true, isSpanStart:true, spanLeft:false, spanRight:(g == 6)};
    a[h][g] = a[h][g] || [];
    a[h][g][l] = c;
    while (--j) {
        e = e.add(Date.DAY, 1);
        if (e > this.viewEnd) {
            break
        }
        if (++b > 6) {
            b = 0;
            f++;
            l = this.findEmptyRowIndex(f, 0)
        }
        a[f] = a[f] || [];
        a[f][b] = a[f][b] || [];
        a[f][b][l] = {event:i, isSpan:true, isSpanStart:(b == 0), spanLeft:(f > h) && (b % 7 == 0), spanRight:(b == 6) && (j > 1)}
    }
}, findEmptyRowIndex:function (b, h, a) {
    var f = a ? this.allDayGrid : this.eventGrid, c = f[b] ? f[b][h] || [] : [], e = 0, g = c.length;
    for (; e < g; e++) {
        if (c[e] == null) {
            return e
        }
    }
    return g
}, renderTemplate:function () {
    if (this.tpl) {
        this.tpl.overwrite(this.el, this.getParams());
        this.lastRenderStart = this.viewStart.clone();
        this.lastRenderEnd = this.viewEnd.clone()
    }
}, disableStoreEvents:function () {
    this.monitorStoreEvents = false
}, enableStoreEvents:function (a) {
    this.monitorStoreEvents = true;
    if (a === true) {
        this.refresh()
    }
}, onResize:function () {
    this.refresh()
}, onInitDrag:function () {
    this.fireEvent("initdrag", this)
}, onEventDrop:function (c, a) {
    if (Ext.calendar.Date.compare(c.data[Ext.calendar.EventMappings.StartDate.name], a) === 0) {
        return
    }
    var b = a.getTime() - c.data[Ext.calendar.EventMappings.StartDate.name].getTime();
    c.set(Ext.calendar.EventMappings.StartDate.name, a);
    c.set(Ext.calendar.EventMappings.EndDate.name, c.data[Ext.calendar.EventMappings.EndDate.name].add(Date.MILLI, b));
    this.fireEvent("eventmove", this, c)
}, onCalendarEndDrag:function (e, a, b) {
    this.dragPending = true;
    var c = {};
    c[Ext.calendar.EventMappings.StartDate.name] = e;
    c[Ext.calendar.EventMappings.EndDate.name] = a;
    this.fireEvent("rangeselect", this, c, this.onCalendarEndDragComplete.createDelegate(this, [b]))
}, onCalendarEndDragComplete:function (a) {
    a();
    this.dragPending = false
}, onUpdate:function (b, c, a) {
    if (this.monitorStoreEvents === false) {
        return
    }
    if (a == Ext.data.Record.COMMIT) {
        this.refresh();
        if (this.enableFx && this.enableUpdateFx) {
            this.doUpdateFx(this.getEventEls(c.data[Ext.calendar.EventMappings.EventId.name]), {scope:this})
        }
    }
}, doUpdateFx:function (a, b) {
    this.highlightEvent(a, null, b)
}, onAdd:function (c, a, b) {
    if (this.monitorStoreEvents === false) {
        return
    }
    var e = a[0];
    this.tempEventId = e.id;
    this.refresh();
    if (this.enableFx && this.enableAddFx) {
        this.doAddFx(this.getEventEls(e.data[Ext.calendar.EventMappings.EventId.name]), {scope:this})
    }
}, doAddFx:function (a, b) {
    a.fadeIn(Ext.apply(b, {duration:2}))
}, onRemove:function (a, b) {
    if (this.monitorStoreEvents === false) {
        return
    }
    if (this.enableFx && this.enableRemoveFx) {
        this.doRemoveFx(this.getEventEls(b.data[Ext.calendar.EventMappings.EventId.name]), {remove:true, scope:this, callback:this.refresh})
    } else {
        this.getEventEls(b.data[Ext.calendar.EventMappings.EventId.name]).remove();
        this.refresh()
    }
}, doRemoveFx:function (a, b) {
    a.fadeOut(b)
}, highlightEvent:function (b, a, e) {
    if (this.enableFx) {
        var f;
        !(Ext.isIE || Ext.isOpera) ? b.highlight(a, e) : b.each(function (c) {
            c.highlight(a, Ext.applyIf({attr:"color"}, e));
            f = c.child(".ext-cal-evm");
            if (f) {
                f.highlight(a, e)
            }
        }, this)
    }
}, getEventIdFromEl:function (a) {
    a = Ext.get(a);
    var b = a.id.split(this.eventElIdDelimiter)[1];
    if (b.indexOf("-") > -1) {
        b = b.split("-")[0]
    }
    return b
}, getEventId:function (a) {
    if (a === undefined && this.tempEventId) {
        a = this.tempEventId
    }
    return a
}, getEventSelectorCls:function (b, a) {
    var c = a ? "." : "";
    return c + this.id + this.eventElIdDelimiter + this.getEventId(b)
}, getEventEls:function (b) {
    var a = Ext.select(this.getEventSelectorCls(this.getEventId(b), true), false, this.el.id);
    return new Ext.CompositeElement(a)
}, isToday:function () {
    var a = new Date().clearTime().getTime();
    return this.viewStart.getTime() <= a && this.viewEnd.getTime() >= a
}, onDataChanged:function (a) {
    this.refresh()
}, isEventVisible:function (i) {
    var b = this.viewStart.getTime(), e = this.viewEnd.getTime(), g = Ext.calendar.EventMappings, j = (i.data ? i.data[g.StartDate.name] : i[g.StartDate.name]).getTime(), h = (i.data ? i.data[g.EndDate.name] : i[g.EndDate.name]).add(Date.SECOND, -1).getTime(), c = (j >= b && j <= e), a = (h >= b && h <= e), f = (j < b && h > e);
    return(c || a || f)
}, isOverlapping:function (l, k) {
    var j = l.data ? l.data : l, i = k.data ? k.data : k, g = Ext.calendar.EventMappings, c = j[g.StartDate.name].getTime(), h = j[g.EndDate.name].add(Date.SECOND, -1).getTime(), b = i[g.StartDate.name].getTime(), f = i[g.EndDate.name].add(Date.SECOND, -1).getTime();
    if (h < c) {
        h = c
    }
    if (f < b) {
        f = b
    }
    var e = (c >= b && c <= f), m = (h >= b && h <= f), a = (c < b && h > f);
    return(e || m || a)
}, getDayEl:function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId:function (a) {
    if (Ext.isDate(a)) {
        a = a.format("Ymd")
    }
    return this.id + this.dayElIdDelimiter + a
}, getStartDate:function () {
    return this.startDate
}, setStartDate:function (b, a) {
    this.startDate = b.clearTime();
    this.setViewBounds(b);
    this.store.load({params:{start:this.viewStart.format("m-d-Y"), end:this.viewEnd.format("m-d-Y")}});
    if (a === true) {
        this.refresh()
    }
    this.fireEvent("datechange", this, this.startDate, this.viewStart, this.viewEnd)
}, setViewBounds:function (a) {
    var e = a || this.startDate, c = e.getDay() - this.startDay;
    switch (this.weekCount) {
        case 0:
        case 1:
            this.viewStart = this.dayCount < 7 ? e : e.add(Date.DAY, -c).clearTime(true);
            this.viewEnd = this.viewStart.add(Date.DAY, this.dayCount || 7).add(Date.SECOND, -1);
            return;
        case -1:
            e = e.getFirstDateOfMonth();
            c = e.getDay() - this.startDay;
            if (c < 0) {
                c += 7
            }
            this.viewStart = e.add(Date.DAY, -c).clearTime(true);
            var b = e.add(Date.MONTH, 1).add(Date.SECOND, -1);
            c = this.startDay;
            if (c > b.getDay()) {
                c -= 7
            }
            this.viewEnd = b.add(Date.DAY, 6 - b.getDay() + c);
            return;
        default:
            this.viewStart = e.add(Date.DAY, -c).clearTime(true);
            this.viewEnd = this.viewStart.add(Date.DAY, this.weekCount * 7).add(Date.SECOND, -1)
    }
}, getViewBounds:function () {
    return{start:this.viewStart, end:this.viewEnd}
}, sortEventRecordsForDay:function (a) {
    if (a.length < 2) {
        return
    }
    a.sort("ASC", function (g, f) {
        var e = g.data, c = f.data, i = Ext.calendar.EventMappings;
        if (e[i.IsAllDay.name]) {
            return -1
        } else {
            if (c[i.IsAllDay.name]) {
                return 1
            }
        }
        if (this.spansHavePriority) {
            var h = Ext.calendar.Date.diffDays;
            if (h(e[i.StartDate.name], e[i.EndDate.name]) > 0) {
                if (h(c[i.StartDate.name], c[i.EndDate.name]) > 0) {
                    if (e[i.StartDate.name].getTime() == c[i.StartDate.name].getTime()) {
                        return c[i.EndDate.name].getTime() - e[i.EndDate.name].getTime()
                    }
                    return e[i.StartDate.name].getTime() - c[i.StartDate.name].getTime()
                }
                return -1
            } else {
                if (h(c[i.StartDate.name], c[i.EndDate.name]) > 0) {
                    return 1
                }
            }
            return e[i.StartDate.name].getTime() - c[i.StartDate.name].getTime()
        } else {
            return e[i.StartDate.name].getTime() - c[i.StartDate.name].getTime()
        }
    }.createDelegate(this))
}, moveTo:function (b, a) {
    if (Ext.isDate(b)) {
        this.setStartDate(b);
        if (a !== false) {
            this.refresh()
        }
        return this.startDate
    }
    return b
}, moveNext:function (a) {
    return this.moveTo(this.viewEnd.add(Date.DAY, 1))
}, movePrev:function (a) {
    var b = Ext.calendar.Date.diffDays(this.viewStart, this.viewEnd) + 1;
    return this.moveDays(-b, a)
}, moveMonths:function (b, a) {
    return this.moveTo(this.startDate.add(Date.MONTH, b), a)
}, moveWeeks:function (b, a) {
    return this.moveTo(this.startDate.add(Date.DAY, b * 7), a)
}, moveDays:function (b, a) {
    return this.moveTo(this.startDate.add(Date.DAY, b), a)
}, moveToday:function (a) {
    return this.moveTo(new Date(), a)
}, setStore:function (a, b) {
    if (!b && this.store) {
        this.store.un("datachanged", this.onDataChanged, this);
        this.store.un("add", this.onAdd, this);
        this.store.un("remove", this.onRemove, this);
        this.store.un("update", this.onUpdate, this);
        this.store.un("clear", this.refresh, this)
    }
    if (a) {
        a.on("datachanged", this.onDataChanged, this);
        a.on("add", this.onAdd, this);
        a.on("remove", this.onRemove, this);
        a.on("update", this.onUpdate, this);
        a.on("clear", this.refresh, this)
    }
    this.store = a;
    if (a && a.getCount() > 0) {
        this.refresh()
    }
}, getEventRecord:function (b) {
    var a = this.store.find(Ext.calendar.EventMappings.EventId.name, b);
    return this.store.getAt(a)
}, getEventRecordFromEl:function (a) {
    return this.getEventRecord(this.getEventIdFromEl(a))
}, getParams:function () {
    return{viewStart:this.viewStart, viewEnd:this.viewEnd, startDate:this.startDate, dayCount:this.dayCount, weekCount:this.weekCount, title:this.getTitle()}
}, getTitle:function () {
    return this.startDate.format("F Y")
}, onClick:function (c, a) {
    var b = c.getTarget(this.eventSelector, 5);
    if (b) {
        var f = this.getEventIdFromEl(b);
        this.fireEvent("eventclick", this, this.getEventRecord(f), b);
        return true
    }
}, onMouseOver:function (b, a) {
    if (this.trackMouseOver !== false && (this.dragZone == undefined || !this.dragZone.dragging)) {
        if (!this.handleEventMouseEvent(b, a, "over")) {
            this.handleDayMouseEvent(b, a, "over")
        }
    }
}, onMouseOut:function (b, a) {
    if (this.trackMouseOver !== false && (this.dragZone == undefined || !this.dragZone.dragging)) {
        if (!this.handleEventMouseEvent(b, a, "out")) {
            this.handleDayMouseEvent(b, a, "out")
        }
    }
}, handleEventMouseEvent:function (h, c, g) {
    var f = h.getTarget(this.eventSelector, 5, true), a, b, i;
    if (f) {
        a = Ext.get(h.getRelatedTarget());
        if (f == a || f.contains(a)) {
            return true
        }
        i = this.getEventIdFromEl(f);
        if (this.eventOverClass != "") {
            b = this.getEventEls(i);
            b[g == "over" ? "addClass" : "removeClass"](this.eventOverClass)
        }
        this.fireEvent("event" + g, this, this.getEventRecord(i), f);
        return true
    }
    return false
}, getDateFromId:function (c, b) {
    var a = c.split(b);
    return a[a.length - 1]
}, handleDayMouseEvent:function (j, f, h) {
    f = j.getTarget("td", 3);
    if (f) {
        if (f.id && f.id.indexOf(this.dayElIdDelimiter) > -1) {
            var i = this.getDateFromId(f.id, this.dayElIdDelimiter), a = Ext.get(j.getRelatedTarget()), c, b;
            if (a) {
                c = a.is("td") ? a : a.up("td", 3);
                b = c && c.id ? this.getDateFromId(c.id, this.dayElIdDelimiter) : ""
            }
            if (!a || i != b) {
                var g = this.getDayEl(i);
                if (g && this.dayOverClass != "") {
                    g[h == "over" ? "addClass" : "removeClass"](this.dayOverClass)
                }
                this.fireEvent("day" + h, this, Date.parseDate(i, "Ymd"), g)
            }
        }
    }
}, renderItems:function () {
    throw"This method must be implemented by a subclass"
}});
Ext.calendar.MonthView = Ext.extend(Ext.calendar.CalendarView, {showTime:true, showTodayText:true, todayText:"Today", showHeader:false, showWeekLinks:false, showWeekNumbers:false, weekLinkOverClass:"ext-week-link-over", daySelector:".ext-cal-day", moreSelector:".ext-cal-ev-more", weekLinkSelector:".ext-cal-week-link", weekCount:-1, dayCount:7, moreElIdDelimiter:"-more-", weekLinkIdDelimiter:"ext-cal-week-", initComponent:function () {
    Ext.calendar.MonthView.superclass.initComponent.call(this);
    this.addEvents({dayclick:true, weekclick:true, dayover:true, dayout:true})
}, initDD:function () {
    var a = {view:this, createText:this.ddCreateEventText, moveText:this.ddMoveEventText, ddGroup:"MonthViewDD"};
    this.dragZone = new Ext.calendar.DragZone(this.el, a);
    this.dropZone = new Ext.calendar.DropZone(this.el, a)
}, onDestroy:function () {
    Ext.destroy(this.ddSelector);
    Ext.destroy(this.dragZone);
    Ext.destroy(this.dropZone);
    Ext.calendar.MonthView.superclass.onDestroy.call(this)
}, afterRender:function () {
    if (!this.tpl) {
        this.tpl = new Ext.calendar.MonthViewTemplate({id:this.id, showTodayText:this.showTodayText, todayText:this.todayText, showTime:this.showTime, showHeader:this.showHeader, showWeekLinks:this.showWeekLinks, showWeekNumbers:this.showWeekNumbers})
    }
    this.tpl.compile();
    this.addClass("ext-cal-monthview ext-cal-ct");
    Ext.calendar.MonthView.superclass.afterRender.call(this)
}, onResize:function () {
    if (this.monitorResize) {
        this.maxEventsPerDay = this.getMaxEventsPerDay();
        this.refresh()
    }
}, forceSize:function () {
    if (this.showWeekLinks && this.el && this.el.child) {
        var f = this.el.select(".ext-cal-hd-days-tbl"), e = this.el.select(".ext-cal-bg-tbl"), c = this.el.select(".ext-cal-evt-tbl"), b = this.el.child(".ext-cal-week-link").getWidth(), a = this.el.getWidth() - b;
        f.setWidth(a);
        e.setWidth(a);
        c.setWidth(a)
    }
    Ext.calendar.MonthView.superclass.forceSize.call(this)
}, initClock:function () {
    if (Ext.fly(this.id + "-clock") !== null) {
        this.prevClockDay = new Date().getDay();
        if (this.clockTask) {
            Ext.TaskMgr.stop(this.clockTask)
        }
        this.clockTask = Ext.TaskMgr.start({run:function () {
            var b = Ext.fly(this.id + "-clock"), a = new Date();
            if (a.getDay() == this.prevClockDay) {
                if (b) {
                    b.update(a.format("g:i a"))
                }
            } else {
                this.prevClockDay = a.getDay();
                this.moveTo(a)
            }
        }, scope:this, interval:1000})
    }
}, getEventBodyMarkup:function () {
    if (!this.eventBodyMarkup) {
        this.eventBodyMarkup = ["{Title}", '<tpl if="_isReminder">', '<i class="ext-cal-ic ext-cal-ic-rem">&nbsp;</i>', "</tpl>", '<tpl if="_isRecurring">', '<i class="ext-cal-ic ext-cal-ic-rcr">&nbsp;</i>', "</tpl>", '<tpl if="spanLeft">', '<i class="ext-cal-spl">&nbsp;</i>', "</tpl>", '<tpl if="spanRight">', '<i class="ext-cal-spr">&nbsp;</i>', "</tpl>"].join("")
    }
    return this.eventBodyMarkup
}, getEventTemplate:function () {
    if (!this.eventTpl) {
        var b, a = this.getEventBodyMarkup();
        b = !(Ext.isIE || Ext.isOpera) ? new Ext.XTemplate('<div id="{_elId}" class="{_selectorCls} {_colorCls} {values.spanCls} ext-cal-evt ext-cal-evr">', a, "</div>") : new Ext.XTemplate('<tpl if="_renderAsAllDay">', '<div id="{_elId}" class="{_selectorCls} {values.spanCls} {_colorCls} ext-cal-evt ext-cal-evo">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">', "</tpl>", '<tpl if="!_renderAsAllDay">', '<div id="{_elId}" class="{_selectorCls} {_colorCls} ext-cal-evt ext-cal-evr">', "</tpl>", a, '<tpl if="_renderAsAllDay">', "</div>", "</div>", "</tpl>", "</div>");
        b.compile();
        this.eventTpl = b
    }
    return this.eventTpl
}, getTemplateEventData:function (b) {
    var e = Ext.calendar.EventMappings, a = this.getEventSelectorCls(b[e.EventId.name]), c = b[e.Title.name];
    return Ext.applyIf({_selectorCls:a, _colorCls:"ext-color-" + (b[e.CalendarId.name] ? b[e.CalendarId.name] : "default") + (b._renderAsAllDay ? "-ad" : ""), _elId:a + "-" + b._weekIndex, _isRecurring:b.Recurrence && b.Recurrence != "", _isReminder:b[e.Reminder.name] && b[e.Reminder.name] != "", Title:(b[e.IsAllDay.name] ? "" : b[e.StartDate.name].format("g:ia ")) + (!c || c.length == 0 ? "(No title)" : c)}, b)
}, refresh:function () {
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
    Ext.calendar.MonthView.superclass.refresh.call(this);
    if (this.showTime !== false) {
        this.initClock()
    }
}, renderItems:function () {
    Ext.calendar.WeekEventRenderer.render({eventGrid:this.allDayOnly ? this.allDayGrid : this.eventGrid, viewStart:this.viewStart, tpl:this.getEventTemplate(), maxEventsPerDay:this.maxEventsPerDay, id:this.id, templateDataFn:this.getTemplateEventData.createDelegate(this), evtMaxCount:this.evtMaxCount, weekCount:this.weekCount, dayCount:this.dayCount});
    this.fireEvent("eventsrendered", this)
}, getDayEl:function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId:function (a) {
    if (Ext.isDate(a)) {
        a = a.format("Ymd")
    }
    return this.id + this.dayElIdDelimiter + a
}, getWeekIndex:function (b) {
    var a = this.getDayEl(b).up(".ext-cal-wk-ct");
    return parseInt(a.id.split("-wk-")[1], 10)
}, getDaySize:function (f) {
    var c = this.el.getBox(), a = c.width / this.dayCount, b = c.height / this.getWeekCount();
    if (f) {
        var e = this.el.select(".ext-cal-dtitle").first().parent("tr");
        b = e ? b - e.getHeight(true) : b
    }
    return{height:b, width:a}
}, getEventHeight:function () {
    if (!this.eventHeight) {
        var a = this.el.select(".ext-cal-evt").first();
        this.eventHeight = a ? a.parent("tr").getHeight() : 18
    }
    return this.eventHeight
}, getMaxEventsPerDay:function () {
    var b = this.getDaySize(true).height, c = this.getEventHeight(), a = Math.max(Math.floor((b - c) / c), 0);
    return a
}, getDayAt:function (a, i) {
    var f = this.el.getBox(), b = this.getDaySize(), c = Math.floor(((a - f.x) / b.width)), g = Math.floor(((i - f.y) / b.height)), h = (g * 7) + c, e = this.viewStart.add(Date.DAY, h);
    return{date:e, el:this.getDayEl(e)}
}, moveNext:function () {
    return this.moveMonths(1)
}, movePrev:function () {
    return this.moveMonths(-1)
}, onInitDrag:function () {
    Ext.calendar.MonthView.superclass.onInitDrag.call(this);
    Ext.select(this.daySelector).removeClass(this.dayOverClass);
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
}, onMoreClick:function (a) {
    if (!this.detailPanel) {
        this.detailPanel = new Ext.Panel({id:this.id + "-details-panel", title:a.format("F j"), layout:"fit", floating:true, renderTo:Ext.getBody(), tools:[
            {id:"close", handler:function (f, b, c) {
                c.hide()
            }}
        ], items:{xtype:"monthdaydetailview", id:this.id + "-details-view", date:a, view:this, store:this.store, listeners:{eventsrendered:this.onDetailViewUpdated.createDelegate(this)}}})
    } else {
        this.detailPanel.setTitle(a.format("F j"))
    }
    this.detailPanel.getComponent(this.id + "-details-view").update(a)
}, onDetailViewUpdated:function (h, c, i) {
    var b = this.detailPanel, f = b.getFrameHeight(), j = this.getEventHeight(), a = f + (i * j) + 3, g = this.getDayEl(c), e = g.getBox();
    b.updateBox(e);
    b.setHeight(a);
    b.setWidth(Math.max(e.width, 220));
    b.show();
    b.getPositionEl().alignTo(g, "t-t?")
}, onHide:function () {
    Ext.calendar.MonthView.superclass.onHide.call(this);
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
}, onClick:function (g, a) {
    if (this.detailPanel) {
        this.detailPanel.hide()
    }
    if (Ext.calendar.MonthView.superclass.onClick.apply(this, arguments)) {
        return
    }
    if (this.dropZone) {
        this.dropZone.clearShims()
    }
    var b = g.getTarget(this.weekLinkSelector, 3), c, f;
    if (b) {
        c = b.id.split(this.weekLinkIdDelimiter)[1];
        this.fireEvent("weekclick", this, Date.parseDate(c, "Ymd"));
        return
    }
    b = g.getTarget(this.moreSelector, 3);
    if (b) {
        c = b.id.split(this.moreElIdDelimiter)[1];
        this.onMoreClick(Date.parseDate(c, "Ymd"));
        return
    }
    b = g.getTarget("td", 3);
    if (b) {
        if (b.id && b.id.indexOf(this.dayElIdDelimiter) > -1) {
            f = b.id.split(this.dayElIdDelimiter);
            c = f[f.length - 1];
            this.fireEvent("dayclick", this, Date.parseDate(c, "Ymd"), false, Ext.get(this.getDayId(c)));
            return
        }
    }
}, handleDayMouseEvent:function (f, a, c) {
    var b = f.getTarget(this.weekLinkSelector, 3, true);
    if (b) {
        b[c == "over" ? "addClass" : "removeClass"](this.weekLinkOverClass);
        return
    }
    Ext.calendar.MonthView.superclass.handleDayMouseEvent.apply(this, arguments)
}});
Ext.reg("monthview", Ext.calendar.MonthView);
Ext.calendar.DayHeaderView = Ext.extend(Ext.calendar.MonthView, {weekCount:1, dayCount:1, allDayOnly:true, monitorResize:false, afterRender:function () {
    if (!this.tpl) {
        this.tpl = new Ext.calendar.DayHeaderTemplate({id:this.id, showTodayText:this.showTodayText, todayText:this.todayText, showTime:this.showTime})
    }
    this.tpl.compile();
    this.addClass("ext-cal-day-header");
    Ext.calendar.DayHeaderView.superclass.afterRender.call(this)
}, forceSize:Ext.emptyFn, refresh:function () {
    Ext.calendar.DayHeaderView.superclass.refresh.call(this);
    this.recalcHeaderBox()
}, recalcHeaderBox:function () {
    var b = this.el.child(".ext-cal-evt-tbl"), a = b.getHeight();
    this.el.setHeight(a + 7);
    if (Ext.isIE && Ext.isStrict) {
        this.el.child(".ext-cal-hd-ad-inner").setHeight(a + 4)
    }
    if (Ext.isOpera) {
    }
}, moveNext:function (a) {
    this.moveDays(this.dayCount, a)
}, movePrev:function (a) {
    this.moveDays(-this.dayCount, a)
}, onClick:function (g, a) {
    var b = g.getTarget("td", 3), f, c;
    if (b) {
        if (b.id && b.id.indexOf(this.dayElIdDelimiter) > -1) {
            f = b.id.split(this.dayElIdDelimiter);
            c = f[f.length - 1];
            this.fireEvent("dayclick", this, Date.parseDate(c, "Ymd"), true, Ext.get(this.getDayId(c)));
            return
        }
    }
    Ext.calendar.DayHeaderView.superclass.onClick.apply(this, arguments)
}});
Ext.reg("dayheaderview", Ext.calendar.DayHeaderView);
Ext.calendar.DayBodyView = Ext.extend(Ext.calendar.CalendarView, {dayColumnElIdDelimiter:"-day-col-", initComponent:function () {
    Ext.calendar.DayBodyView.superclass.initComponent.call(this);
    this.addEvents({eventresize:true, dayclick:true})
}, initDD:function () {
    var a = {createText:this.ddCreateEventText, moveText:this.ddMoveEventText, resizeText:this.ddResizeEventText};
    this.el.ddScrollConfig = {vthresh:Ext.isIE || Ext.isOpera ? 100 : 40, hthresh:-1, frequency:50, increment:100, ddGroup:"DayViewDD"};
    this.dragZone = new Ext.calendar.DayViewDragZone(this.el, Ext.apply({view:this, containerScroll:true}, a));
    this.dropZone = new Ext.calendar.DayViewDropZone(this.el, Ext.apply({view:this}, a))
}, refresh:function () {
    var a = this.el.getScroll().top;
    this.prepareData();
    this.renderTemplate();
    this.renderItems();
    if (this.scrollReady) {
        this.scrollTo(a)
    }
}, scrollTo:function (b, a) {
    a = a || (Ext.isIE || Ext.isOpera);
    if (a) {
        (function () {
            this.el.scrollTo("top", b);
            this.scrollReady = true
        }).defer(10, this)
    } else {
        this.el.scrollTo("top", b);
        this.scrollReady = true
    }
}, afterRender:function () {
    if (!this.tpl) {
        this.tpl = new Ext.calendar.DayBodyTemplate({id:this.id, dayCount:this.dayCount, showTodayText:this.showTodayText, todayText:this.todayText, showTime:this.showTime})
    }
    this.tpl.compile();
    this.addClass("ext-cal-body-ct");
    Ext.calendar.DayBodyView.superclass.afterRender.call(this);
    this.scrollTo(7 * 42)
}, forceSize:Ext.emptyFn, onEventResize:function (e, b) {
    var c = Ext.calendar.Date, f = Ext.calendar.EventMappings.StartDate.name, a = Ext.calendar.EventMappings.EndDate.name;
    if (c.compare(e.data[f], b.StartDate) === 0 && c.compare(e.data[a], b.EndDate) === 0) {
        return
    }
    e.set(f, b.StartDate);
    e.set(a, b.EndDate);
    this.fireEvent("eventresize", this, e)
}, getEventBodyMarkup:function () {
    if (!this.eventBodyMarkup) {
        this.eventBodyMarkup = ["{Title}", '<tpl if="_isReminder">', '<i class="ext-cal-ic ext-cal-ic-rem">&nbsp;</i>', "</tpl>", '<tpl if="_isRecurring">', '<i class="ext-cal-ic ext-cal-ic-rcr">&nbsp;</i>', "</tpl>"].join("")
    }
    return this.eventBodyMarkup
}, getEventTemplate:function () {
    if (!this.eventTpl) {
        this.eventTpl = !(Ext.isIE || Ext.isOpera) ? new Ext.XTemplate('<div id="{_elId}" class="{_selectorCls} {_colorCls} ext-cal-evt ext-cal-evr" style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', '<div class="ext-evt-bd">', this.getEventBodyMarkup(), "</div>", '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&nbsp;</div></div>', "</div>") : new Ext.XTemplate('<div id="{_elId}" class="ext-cal-evt {_selectorCls} {_colorCls}-x" style="left: {_left}%; width: {_width}%; top: {_top}px;">', '<div class="ext-cal-evb">&nbsp;</div>', '<dl style="height: {_height}px;" class="ext-cal-evdm">', '<dd class="ext-evt-bd">', this.getEventBodyMarkup(), "</dd>", '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&nbsp;</div></div>', "</dl>", '<div class="ext-cal-evb">&nbsp;</div>', "</div>");
        this.eventTpl.compile()
    }
    return this.eventTpl
}, getEventAllDayTemplate:function () {
    if (!this.eventAllDayTpl) {
        var b, a = this.getEventBodyMarkup();
        b = !(Ext.isIE || Ext.isOpera) ? new Ext.XTemplate('<div id="{_elId}" class="{_selectorCls} {_colorCls} {values.spanCls} ext-cal-evt ext-cal-evr" style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', a, "</div>") : new Ext.XTemplate('<div id="{_elId}" class="ext-cal-evt" style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">', '<div class="{_selectorCls} {values.spanCls} {_colorCls} ext-cal-evo">', '<div class="ext-cal-evm">', '<div class="ext-cal-evi">', a, "</div>", "</div>", "</div></div>");
        b.compile();
        this.eventAllDayTpl = b
    }
    return this.eventAllDayTpl
}, getTemplateEventData:function (b) {
    var a = this.getEventSelectorCls(b[Ext.calendar.EventMappings.EventId.name]), c = {}, f = Ext.calendar.EventMappings;
    this.getTemplateEventBox(b);
    c._selectorCls = a;
    c._colorCls = "ext-color-" + b[f.CalendarId.name] + (b._renderAsAllDay ? "-ad" : "");
    c._elId = a + (b._weekIndex ? "-" + b._weekIndex : "");
    c._isRecurring = b.Recurrence && b.Recurrence != "";
    c._isReminder = b[f.Reminder.name] && b[f.Reminder.name] != "";
    var e = b[f.Title.name];
    c.Title = (b[f.IsAllDay.name] ? "" : b[f.StartDate.name].format("g:ia ")) + (!e || e.length == 0 ? "(No title)" : e);
    return Ext.applyIf(c, b)
}, getTemplateEventBox:function (c) {
    var g = 0.7, h = c[Ext.calendar.EventMappings.StartDate.name], b = c[Ext.calendar.EventMappings.EndDate.name], f = h.getHours() * 60 + h.getMinutes(), a = b.getHours() * 60 + b.getMinutes(), e = a - f;
    c._left = 0;
    c._width = 100;
    c._top = Math.round(f * g) + 1;
    c._height = Math.max((e * g) - 2, 15)
}, renderItems:function () {
    var p = 0, s = [], o, n, k, r, h, e, b, a, c, g, f, q, m;
    for (; p < this.dayCount; p++) {
        o = emptyCells = skipped = 0;
        n = this.eventGrid[0][p];
        k = n ? n.length : 0;
        for (; o < k; o++) {
            evt = n[o];
            if (!evt) {
                continue
            }
            r = evt.data || evt.event.data;
            if (r._renderAsAllDay) {
                continue
            }
            Ext.apply(r, {cls:"ext-cal-ev", _positioned:true});
            s.push({data:this.getTemplateEventData(r), date:this.viewStart.add(Date.DAY, p)})
        }
    }
    h = e = a = c = 0;
    b = s.length;
    for (; h < b; h++) {
        evt = s[h].data;
        evt2 = null;
        c = a;
        for (e = 0; e < b; e++) {
            if (h == e) {
                continue
            }
            evt2 = s[e].data;
            if (this.isOverlapping(evt, evt2)) {
                evt._overlap = evt._overlap == undefined ? 1 : evt._overlap + 1;
                if (h < e) {
                    if (evt._overcol === undefined) {
                        evt._overcol = 0
                    }
                    evt2._overcol = evt._overcol + 1;
                    a = Math.max(a, evt2._overcol)
                }
            }
        }
    }
    for (h = 0; h < b; h++) {
        evt = s[h].data;
        if (evt._overlap !== undefined) {
            g = 100 / (a + 1);
            f = 100 - (g * evt._overlap);
            evt._width = g;
            evt._left = g * evt._overcol
        }
        q = this.getEventTemplate().apply(evt);
        m = this.id + "-day-col-" + s[h].date.format("Ymd");
        Ext.DomHelper.append(m, q)
    }
    this.fireEvent("eventsrendered", this)
}, getDayEl:function (a) {
    return Ext.get(this.getDayId(a))
}, getDayId:function (a) {
    if (Ext.isDate(a)) {
        a = a.format("Ymd")
    }
    return this.id + this.dayColumnElIdDelimiter + a
}, getDaySize:function () {
    var a = this.el.child(".ext-cal-day-col-inner").getBox();
    return{height:a.height, width:a.width}
}, getDayAt:function (n, j) {
    var f = ".ext-cal-body-ct", h = this.el.child(".ext-cal-day-times").getWidth(), r = this.el.getBox(), m = this.getDaySize(false), o = n - r.x - h, a = Math.floor(o / m.width), l = this.el.getScroll(), q = this.el.child(".ext-cal-bg-row"), p = q.getHeight() / 2, k = j - r.y - p + l.top, i = Math.max(0, Math.ceil(k / p)), b = i * 30, e = this.viewStart.add(Date.DAY, a).add(Date.MINUTE, b), c = this.getDayEl(e), g = n;
    if (c) {
        g = c.getLeft()
    }
    return{date:e, el:c, timeBox:{x:g, y:(i * 21) + r.y - l.top, width:m.width, height:p}}
}, onClick:function (g, b) {
    if (this.dragPending || Ext.calendar.DayBodyView.superclass.onClick.apply(this, arguments)) {
        return
    }
    if (g.getTarget(".ext-cal-day-times", 3) !== null) {
        return
    }
    var c = g.getTarget("td", 3);
    if (c) {
        if (c.id && c.id.indexOf(this.dayElIdDelimiter) > -1) {
            var f = this.getDateFromId(c.id, this.dayElIdDelimiter);
            this.fireEvent("dayclick", this, Date.parseDate(f, "Ymd"), true, Ext.get(this.getDayId(f, true)));
            return
        }
    }
    var a = this.getDayAt(g.xy[0], g.xy[1]);
    if (a && a.date) {
        this.fireEvent("dayclick", this, a.date, false, null)
    }
}});
Ext.reg("daybodyview", Ext.calendar.DayBodyView);
Ext.calendar.DayView = Ext.extend(Ext.Container, {showTime:true, showTodayText:true, todayText:"Today", ddCreateEventText:"Create event for {0}", ddMoveEventText:"Move event to {0}", dayCount:1, initComponent:function () {
    this.dayCount = this.dayCount > 7 ? 7 : this.dayCount;
    var b = Ext.apply({}, this.initialConfig);
    b.showTime = this.showTime;
    b.showTodatText = this.showTodayText;
    b.todayText = this.todayText;
    b.dayCount = this.dayCount;
    b.wekkCount = 1;
    var c = Ext.applyIf({xtype:"dayheaderview", id:this.id + "-hd"}, b);
    var a = Ext.applyIf({xtype:"daybodyview", id:this.id + "-bd"}, b);
    this.items = [c, a];
    this.addClass("ext-cal-dayview ext-cal-ct");
    Ext.calendar.DayView.superclass.initComponent.call(this)
}, afterRender:function () {
    Ext.calendar.DayView.superclass.afterRender.call(this);
    this.header = Ext.getCmp(this.id + "-hd");
    this.body = Ext.getCmp(this.id + "-bd");
    this.body.on("eventsrendered", this.forceSize, this)
}, refresh:function () {
    this.header.refresh();
    this.body.refresh()
}, forceSize:function () {
    (function () {
        var a = this.el.up(".x-panel-body"), c = this.el.child(".ext-cal-day-header"), b = a.getHeight() - c.getHeight();
        this.el.child(".ext-cal-body-ct").setHeight(b)
    }).defer(10, this)
}, onResize:function () {
    this.forceSize()
}, getViewBounds:function () {
    return this.header.getViewBounds()
}, getStartDate:function () {
    return this.header.getStartDate()
}, setStartDate:function (a) {
    this.header.setStartDate(a, true);
    this.body.setStartDate(a, true)
}, renderItems:function () {
    this.header.renderItems();
    this.body.renderItems()
}, isToday:function () {
    return this.header.isToday()
}, moveTo:function (b, a) {
    this.header.moveTo(b, a);
    this.body.moveTo(b, a)
}, moveNext:function (a) {
    this.header.moveNext(a);
    this.body.moveNext(a)
}, movePrev:function (a) {
    this.header.movePrev(a);
    this.body.movePrev(a)
}, moveDays:function (b, a) {
    this.header.moveDays(b, a);
    this.body.moveDays(b, a)
}, moveToday:function (a) {
    this.header.moveToday(a);
    this.body.moveToday(a)
}});
Ext.reg("dayview", Ext.calendar.DayView);
Ext.calendar.WeekView = Ext.extend(Ext.calendar.DayView, {dayCount:7});
Ext.reg("weekview", Ext.calendar.WeekView);
Ext.calendar.DateRangeField = Ext.extend(Ext.form.Field, {toText:"to", allDayText:"All day", onRender:function (b, a) {
    if (!this.el) {
        this.startDate = new Ext.form.DateField({id:this.id + "-start-date", format:"n/j/Y", width:100, listeners:{change:{fn:function () {
            this.checkDates("date", "start")
        }, scope:this}}});
        this.startTime = new Ext.form.TimeField({id:this.id + "-start-time", hidden:this.showTimes === false, labelWidth:0, hideLabel:true, width:90, listeners:{select:{fn:function () {
            this.checkDates("time", "start")
        }, scope:this}}});
        this.endTime = new Ext.form.TimeField({id:this.id + "-end-time", hidden:this.showTimes === false, labelWidth:0, hideLabel:true, width:90, listeners:{select:{fn:function () {
            this.checkDates("time", "end")
        }, scope:this}}});
        this.endDate = new Ext.form.DateField({id:this.id + "-end-date", format:"n/j/Y", hideLabel:true, width:100, listeners:{change:{fn:function () {
            this.checkDates("date", "end")
        }, scope:this}}});
        this.allDay = new Ext.form.Checkbox({id:this.id + "-allday", hidden:this.showTimes === false || this.showAllDay === false, boxLabel:this.allDayText, handler:function (c, e) {
            this.startTime.setVisible(!e);
            this.endTime.setVisible(!e)
        }, scope:this});
        this.toLabel = new Ext.form.Label({xtype:"label", id:this.id + "-to-label", text:this.toText});
        this.fieldCt = new Ext.Container({autoEl:{id:this.id}, cls:"ext-dt-range", renderTo:b, layout:"table", layoutConfig:{columns:6}, defaults:{hideParent:true}, items:[this.startDate, this.startTime, this.toLabel, this.endTime, this.endDate, this.allDay]});
        this.fieldCt.ownerCt = this;
        this.el = this.fieldCt.getEl();
        this.items = new Ext.util.MixedCollection();
        this.items.addAll([this.startDate, this.endDate, this.toLabel, this.startTime, this.endTime, this.allDay])
    }
    Ext.calendar.DateRangeField.superclass.onRender.call(this, b, a)
}, checkDates:function (f, g) {
    var e = Ext.getCmp(this.id + "-start-" + f), b = Ext.getCmp(this.id + "-end-" + f), c = this.getDT("start"), a = this.getDT("end");
    if (c > a) {
        if (g == "start") {
            b.setValue(c)
        } else {
            e.setValue(a);
            this.checkDates(f, "start")
        }
    }
    if (f == "date") {
        this.checkDates("time", g)
    }
}, getValue:function () {
    return[this.getDT("start"), this.getDT("end"), this.allDay.getValue()]
}, getDT:function (c) {
    var b = this[c + "Time"].getValue(), a = this[c + "Date"].getValue();
    if (Ext.isDate(a)) {
        a = a.format(this[c + "Date"].format)
    } else {
        return null
    }
    if (b != "" && this[c + "Time"].isVisible()) {
        return Date.parseDate(a + " " + b, this[c + "Date"].format + " " + this[c + "Time"].format)
    }
    return Date.parseDate(a, this[c + "Date"].format)
}, setValue:function (a) {
    if (Ext.isArray(a)) {
        this.setDT(a[0], "start");
        this.setDT(a[1], "end");
        this.allDay.setValue(!!a[2])
    } else {
        if (Ext.isDate(a)) {
            this.setDT(a, "start");
            this.setDT(a, "end");
            this.allDay.setValue(false)
        } else {
            if (a[Ext.calendar.EventMappings.StartDate.name]) {
                this.setDT(a[Ext.calendar.EventMappings.StartDate.name], "start");
                if (!this.setDT(a[Ext.calendar.EventMappings.EndDate.name], "end")) {
                    this.setDT(a[Ext.calendar.EventMappings.StartDate.name], "end")
                }
                this.allDay.setValue(!!a[Ext.calendar.EventMappings.IsAllDay.name])
            }
        }
    }
}, setDT:function (a, b) {
    if (a && Ext.isDate(a)) {
        this[b + "Date"].setValue(a);
        this[b + "Time"].setValue(a.format(this[b + "Time"].format));
        return true
    }
}, isDirty:function () {
    var a = false;
    if (this.rendered && !this.disabled) {
        this.items.each(function (b) {
            if (b.isDirty()) {
                a = true;
                return false
            }
        })
    }
    return a
}, onDisable:function () {
    this.delegateFn("disable")
}, onEnable:function () {
    this.delegateFn("enable")
}, reset:function () {
    this.delegateFn("reset")
}, delegateFn:function (a) {
    this.items.each(function (b) {
        if (b[a]) {
            b[a]()
        }
    })
}, beforeDestroy:function () {
    Ext.destroy(this.fieldCt);
    Ext.calendar.DateRangeField.superclass.beforeDestroy.call(this)
}, getRawValue:Ext.emptyFn, setRawValue:Ext.emptyFn});
Ext.reg("daterangefield", Ext.calendar.DateRangeField);
Ext.calendar.ReminderField = Ext.extend(Ext.form.ComboBox, {width:200, fieldLabel:"Reminder", mode:"local", triggerAction:"all", forceSelection:true, displayField:"desc", valueField:"value", initComponent:function () {
    Ext.calendar.ReminderField.superclass.initComponent.call(this);
    this.store = this.store || new Ext.data.ArrayStore({fields:["value", "desc"], idIndex:0, data:[
        ["", "None"],
        ["0", "At start time"],
        ["5", "5 minutes before start"],
        ["15", "15 minutes before start"],
        ["30", "30 minutes before start"],
        ["60", "1 hour before start"],
        ["90", "1.5 hours before start"],
        ["120", "2 hours before start"],
        ["180", "3 hours before start"],
        ["360", "6 hours before start"],
        ["720", "12 hours before start"],
        ["1440", "1 day before start"],
        ["2880", "2 days before start"],
        ["4320", "3 days before start"],
        ["5760", "4 days before start"],
        ["7200", "5 days before start"],
        ["10080", "1 week before start"],
        ["20160", "2 weeks before start"]
    ]})
}, initValue:function () {
    if (this.value !== undefined) {
        this.setValue(this.value)
    } else {
        this.setValue("")
    }
    this.originalValue = this.getValue()
}});
Ext.reg("reminderfield", Ext.calendar.ReminderField);
Ext.calendar.EventEditForm = Ext.extend(Ext.form.FormPanel, {labelWidth:65, title:"Event Form", titleTextAdd:"Add Event", titleTextEdit:"Edit Event", bodyStyle:"background:transparent;padding:20px 20px 10px;", border:false, buttonAlign:"center", autoHeight:true, cls:"ext-evt-edit-form", newId:10000, layout:"column", initComponent:function () {
    this.addEvents({eventadd:true, eventupdate:true, eventdelete:true, eventcancel:true});
    this.titleField = new Ext.form.TextField({fieldLabel:"Title", name:Ext.calendar.EventMappings.Title.name, anchor:"90%"});
    this.dateRangeField = new Ext.calendar.DateRangeField({fieldLabel:"When", anchor:"90%"});
    this.reminderField = new Ext.calendar.ReminderField({name:"Reminder"});
    this.notesField = new Ext.form.TextArea({fieldLabel:"Notes", name:Ext.calendar.EventMappings.Notes.name, grow:true, growMax:150, anchor:"100%"});
    this.locationField = new Ext.form.TextField({fieldLabel:"Location", name:Ext.calendar.EventMappings.Location.name, anchor:"100%"});
    this.urlField = new Ext.form.TextField({fieldLabel:"Web Link", name:Ext.calendar.EventMappings.Url.name, anchor:"100%"});
    var a = [this.titleField, this.dateRangeField, this.reminderField], b = [this.notesField, this.locationField, this.urlField];
    if (this.calendarStore) {
        this.calendarField = new Ext.calendar.CalendarPicker({store:this.calendarStore, name:Ext.calendar.EventMappings.CalendarId.name});
        a.splice(2, 0, this.calendarField)
    }
    this.items = [
        {id:"left-col", columnWidth:0.65, layout:"form", border:false, items:a},
        {id:"right-col", columnWidth:0.35, layout:"form", border:false, items:b}
    ];
    this.fbar = [
        {text:"Save", scope:this, handler:this.onSave},
        {cls:"ext-del-btn", text:"Delete", scope:this, handler:this.onDelete},
        {text:"Cancel", scope:this, handler:this.onCancel}
    ];
    Ext.calendar.EventEditForm.superclass.initComponent.call(this)
}, loadRecord:function (a) {
    this.form.loadRecord.apply(this.form, arguments);
    this.activeRecord = a;
    this.dateRangeField.setValue(a.data);
    if (this.calendarStore) {
        this.form.setValues({calendar:a.data[Ext.calendar.EventMappings.CalendarId.name]})
    }
    this.isAdd = !!a.data[Ext.calendar.EventMappings.IsNew.name];
    if (this.isAdd) {
        a.markDirty();
        this.setTitle(this.titleTextAdd);
        Ext.select(".ext-del-btn").setDisplayed(false)
    } else {
        this.setTitle(this.titleTextEdit);
        Ext.select(".ext-del-btn").setDisplayed(true)
    }
    this.titleField.focus()
}, updateRecord:function () {
    var a = this.dateRangeField.getValue();
    this.form.updateRecord(this.activeRecord);
    this.activeRecord.set(Ext.calendar.EventMappings.StartDate.name, a[0]);
    this.activeRecord.set(Ext.calendar.EventMappings.EndDate.name, a[1]);
    this.activeRecord.set(Ext.calendar.EventMappings.IsAllDay.name, a[2])
}, onCancel:function () {
    this.cleanup(true);
    this.fireEvent("eventcancel", this, this.activeRecord)
}, cleanup:function (a) {
    if (this.activeRecord && this.activeRecord.dirty) {
        this.activeRecord.reject()
    }
    delete this.activeRecord;
    if (this.form.isDirty()) {
        this.form.reset()
    }
}, onSave:function () {
    if (!this.form.isValid()) {
        return
    }
    this.updateRecord();
    if (!this.activeRecord.dirty) {
        this.onCancel();
        return
    }
    this.fireEvent(this.isAdd ? "eventadd" : "eventupdate", this, this.activeRecord)
}, onDelete:function () {
    this.fireEvent("eventdelete", this, this.activeRecord)
}});
Ext.reg("eventeditform", Ext.calendar.EventEditForm);
Ext.calendar.EventEditWindow = function (b) {
    var a = {xtype:"form", labelWidth:65, frame:false, bodyStyle:"background:transparent;padding:5px 10px 10px;", bodyBorder:false, border:false, items:[
        {id:"title", name:Ext.calendar.EventMappings.Title.name, fieldLabel:"Title", xtype:"textfield", anchor:"100%"},
        {xtype:"daterangefield", id:"date-range", anchor:"100%", fieldLabel:"When"}
    ]};
    if (b.calendarStore) {
        this.calendarStore = b.calendarStore;
        delete b.calendarStore;
        a.items.push({xtype:"calendarpicker", id:"calendar", name:"calendar", anchor:"100%", store:this.calendarStore})
    }
    Ext.calendar.EventEditWindow.superclass.constructor.call(this, Ext.apply({titleTextAdd:"Add Event", titleTextEdit:"Edit Event", width:600, autocreate:true, border:true, closeAction:"hide", modal:false, resizable:false, buttonAlign:"left", savingMessage:"Saving changes...", deletingMessage:"Deleting event...", fbar:[
        {xtype:"tbtext", text:'<a href="#" id="tblink">Edit Details...</a>'},
        "->",
        {text:"Save", disabled:false, handler:this.onSave, scope:this},
        {id:"delete-btn", text:"Delete", disabled:false, handler:this.onDelete, scope:this, hideMode:"offsets"},
        {text:"Cancel", disabled:false, handler:this.onCancel, scope:this}
    ], items:a}, b))
};
Ext.extend(Ext.calendar.EventEditWindow, Ext.Window, {newId:10000, initComponent:function () {
    Ext.calendar.EventEditWindow.superclass.initComponent.call(this);
    this.formPanel = this.items.items[0];
    this.addEvents({eventadd:true, eventupdate:true, eventdelete:true, eventcancel:true, editdetails:true})
}, afterRender:function () {
    Ext.calendar.EventEditWindow.superclass.afterRender.call(this);
    this.el.addClass("ext-cal-event-win");
    Ext.get("tblink").on("click", function (a) {
        a.stopEvent();
        this.updateRecord();
        this.fireEvent("editdetails", this, this.activeRecord)
    }, this)
}, show:function (c, e) {
    var i = (Ext.isIE8 && Ext.isStrict) ? null : e;
    Ext.calendar.EventEditWindow.superclass.show.call(this, i, function () {
        Ext.getCmp("title").focus(false, 100)
    });
    Ext.getCmp("delete-btn")[c.data && c.data[Ext.calendar.EventMappings.EventId.name] ? "show" : "hide"]();
    var h, j = this.formPanel.form;
    if (c.data) {
        h = c;
        this.isAdd = !!h.data[Ext.calendar.EventMappings.IsNew.name];
        if (this.isAdd) {
            h.markDirty();
            this.setTitle(this.titleTextAdd)
        } else {
            this.setTitle(this.titleTextEdit)
        }
        j.loadRecord(h)
    } else {
        this.isAdd = true;
        this.setTitle(this.titleTextAdd);
        var k = Ext.calendar.EventMappings, a = k.EventId.name, b = c[k.StartDate.name], g = c[k.EndDate.name] || b.add("h", 1);
        h = new Ext.calendar.EventRecord();
        h.data[k.EventId.name] = this.newId++;
        h.data[k.StartDate.name] = b;
        h.data[k.EndDate.name] = g;
        h.data[k.IsAllDay.name] = !!c[k.IsAllDay.name] || b.getDate() != g.clone().add(Date.MILLI, 1).getDate();
        h.data[k.IsNew.name] = true;
        j.reset();
        j.loadRecord(h)
    }
    if (this.calendarStore) {
        Ext.getCmp("calendar").setValue(h.data[Ext.calendar.EventMappings.CalendarId.name])
    }
    Ext.getCmp("date-range").setValue(h.data);
    this.activeRecord = h;
    return this
}, roundTime:function (b, c) {
    c = c || 15;
    var a = parseInt(b.getMinutes(), 10);
    return b.add("mi", c - (a % c))
}, onCancel:function () {
    this.cleanup(true);
    this.fireEvent("eventcancel", this)
}, cleanup:function (a) {
    if (this.activeRecord && this.activeRecord.dirty) {
        this.activeRecord.reject()
    }
    delete this.activeRecord;
    if (a === true) {
        this.hide()
    }
}, updateRecord:function () {
    var a = this.formPanel.form, b = Ext.getCmp("date-range").getValue(), c = Ext.calendar.EventMappings;
    a.updateRecord(this.activeRecord);
    this.activeRecord.set(c.StartDate.name, b[0]);
    this.activeRecord.set(c.EndDate.name, b[1]);
    this.activeRecord.set(c.IsAllDay.name, b[2]);
    this.activeRecord.set(c.CalendarId.name, this.formPanel.form.findField("calendar").getValue())
}, onSave:function () {
    if (!this.formPanel.form.isValid()) {
        return
    }
    this.updateRecord();
    if (!this.activeRecord.dirty) {
        this.onCancel();
        return
    }
    this.fireEvent(this.isAdd ? "eventadd" : "eventupdate", this, this.activeRecord)
}, onDelete:function () {
    this.fireEvent("eventdelete", this, this.activeRecord)
}});
Ext.calendar.CalendarPanel = Ext.extend(Ext.Panel, {showDayView:true, showWeekView:true, showMonthView:true, showNavBar:true, todayText:"Today", showTodayText:true, showTime:true, dayText:"Day", weekText:"Week", monthText:"Month", layoutConfig:{layoutOnCardChange:true, deferredRender:true}, startDate:new Date(), initComponent:function () {
    this.tbar = {cls:"ext-cal-toolbar", border:true, buttonAlign:"center", items:[
        {id:this.id + "-tb-prev", handler:this.onPrevClick, scope:this, iconCls:"x-tbar-page-prev"}
    ]};
    this.viewCount = 0;
    if (this.showDayView) {
        this.tbar.items.push({id:this.id + "-tb-day", text:this.dayText, handler:this.onDayClick, scope:this, toggleGroup:"tb-views"});
        this.viewCount++
    }
    if (this.showWeekView) {
        this.tbar.items.push({id:this.id + "-tb-week", text:this.weekText, handler:this.onWeekClick, scope:this, toggleGroup:"tb-views"});
        this.viewCount++
    }
    if (this.showMonthView || this.viewCount == 0) {
        this.tbar.items.push({id:this.id + "-tb-month", text:this.monthText, handler:this.onMonthClick, scope:this, toggleGroup:"tb-views"});
        this.viewCount++;
        this.showMonthView = true
    }
    this.tbar.items.push({id:this.id + "-tb-next", handler:this.onNextClick, scope:this, iconCls:"x-tbar-page-next"});
    this.tbar.items.push("->");
    var a = this.viewCount - 1;
    this.activeItem = this.activeItem === undefined ? a : (this.activeItem > a ? a : this.activeItem);
    if (this.showNavBar === false) {
        delete this.tbar;
        this.addClass("x-calendar-nonav")
    }
    Ext.calendar.CalendarPanel.superclass.initComponent.call(this);
    this.addEvents({eventadd:true, eventupdate:true, eventdelete:true, eventcancel:true, viewchange:true});
    this.layout = "card";
    if (this.showDayView) {
        var b = Ext.apply({xtype:"dayview", title:this.dayText, showToday:this.showToday, showTodayText:this.showTodayText, showTime:this.showTime}, this.dayViewCfg);
        b.id = this.id + "-day";
        b.store = b.store || this.eventStore;
        this.initEventRelay(b);
        this.add(b)
    }
    if (this.showWeekView) {
        var e = Ext.applyIf({xtype:"weekview", title:this.weekText, showToday:this.showToday, showTodayText:this.showTodayText, showTime:this.showTime}, this.weekViewCfg);
        e.id = this.id + "-week";
        e.store = e.store || this.eventStore;
        this.initEventRelay(e);
        this.add(e)
    }
    if (this.showMonthView) {
        var c = Ext.applyIf({xtype:"monthview", title:this.monthText, showToday:this.showToday, showTodayText:this.showTodayText, showTime:this.showTime, listeners:{weekclick:{fn:function (g, f) {
            this.showWeek(f)
        }, scope:this}}}, this.monthViewCfg);
        c.id = this.id + "-month";
        c.store = c.store || this.eventStore;
        this.initEventRelay(c);
        this.add(c)
    }
    this.add(Ext.applyIf({xtype:"eventeditform", id:this.id + "-edit", calendarStore:this.calendarStore, listeners:{eventadd:{scope:this, fn:this.onEventAdd}, eventupdate:{scope:this, fn:this.onEventUpdate}, eventdelete:{scope:this, fn:this.onEventDelete}, eventcancel:{scope:this, fn:this.onEventCancel}}}, this.editViewCfg))
}, initEventRelay:function (a) {
    a.listeners = a.listeners || {};
    a.listeners.afterrender = {fn:function (b) {
        this.relayEvents(b, ["eventsrendered", "eventclick", "eventover", "eventout", "dayclick", "eventmove", "datechange", "rangeselect", "eventdelete", "eventresize", "initdrag"])
    }, scope:this, single:true}
}, afterRender:function () {
    Ext.calendar.CalendarPanel.superclass.afterRender.call(this);
    this.fireViewChange()
}, onLayout:function () {
    Ext.calendar.CalendarPanel.superclass.onLayout.call(this);
    if (!this.navInitComplete) {
        this.updateNavState();
        this.navInitComplete = true
    }
}, onEventAdd:function (a, b) {
    b.data[Ext.calendar.EventMappings.IsNew.name] = false;
    this.eventStore.add(b);
    this.hideEditForm();
    this.fireEvent("eventadd", this, b)
}, onEventUpdate:function (a, b) {
    b.commit();
    this.hideEditForm();
    this.fireEvent("eventupdate", this, b)
}, onEventDelete:function (a, b) {
    this.eventStore.remove(b);
    this.hideEditForm();
    this.fireEvent("eventdelete", this, b)
}, onEventCancel:function (a, b) {
    this.hideEditForm();
    this.fireEvent("eventcancel", this, b)
}, showEditForm:function (a) {
    this.preEditView = this.layout.activeItem.id;
    this.setActiveView(this.id + "-edit");
    this.layout.activeItem.loadRecord(a);
    return this
}, hideEditForm:function () {
    if (this.preEditView) {
        this.setActiveView(this.preEditView);
        delete this.preEditView
    }
    return this
}, setActiveView:function (b) {
    var a = this.layout;
    a.setActiveItem(b);
    if (b == this.id + "-edit") {
        this.getTopToolbar().hide();
        this.doLayout()
    } else {
        a.activeItem.refresh();
        this.getTopToolbar().show();
        this.updateNavState()
    }
    this.activeView = a.activeItem;
    this.fireViewChange()
}, fireViewChange:function () {
    var b = null, a = this.layout.activeItem;
    if (a.getViewBounds) {
        vb = a.getViewBounds();
        b = {activeDate:a.getStartDate(), viewStart:vb.start, viewEnd:vb.end}
    }
    this.fireEvent("viewchange", this, a, b)
}, updateNavState:function () {
    if (this.showNavBar !== false) {
        var b = this.layout.activeItem, c = b.id.split(this.id + "-")[1];
        var a = Ext.getCmp(this.id + "-tb-" + c);
        a.toggle(true)
    }
}, setStartDate:function (a) {
    this.layout.activeItem.setStartDate(a, true);
    this.updateNavState();
    this.fireViewChange()
}, showWeek:function (a) {
    this.setActiveView(this.id + "-week");
    this.setStartDate(a)
}, onPrevClick:function () {
    this.startDate = this.layout.activeItem.movePrev();
    this.updateNavState();
    this.fireViewChange()
}, onNextClick:function () {
    this.startDate = this.layout.activeItem.moveNext();
    this.updateNavState();
    this.fireViewChange()
}, onDayClick:function () {
    this.setActiveView(this.id + "-day")
}, onWeekClick:function () {
    this.setActiveView(this.id + "-week")
}, onMonthClick:function () {
    this.setActiveView(this.id + "-month")
}, getActiveView:function () {
    return this.layout.activeItem
}});
Ext.reg("calendarpanel", Ext.calendar.CalendarPanel);