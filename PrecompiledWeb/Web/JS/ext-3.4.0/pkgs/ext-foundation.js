/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ns("Ext.grid", "Ext.list", "Ext.dd", "Ext.tree", "Ext.form", "Ext.menu", "Ext.state", "Ext.layout.boxOverflow", "Ext.app", "Ext.ux", "Ext.chart", "Ext.direct", "Ext.slider");
Ext.apply(Ext, function () {
    var c = Ext, a = 0, b = null;
    return{emptyFn:function () {
    }, BLANK_IMAGE_URL:Ext.isIE6 || Ext.isIE7 || Ext.isAir ? "http://www.extjs.com/s.gif" : "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", extendX:function (d, e) {
        return Ext.extend(d, e(d.prototype))
    }, getDoc:function () {
        return Ext.get(document)
    }, num:function (e, d) {
        e = Number(Ext.isEmpty(e) || Ext.isArray(e) || typeof e == "boolean" || (typeof e == "string" && e.trim().length == 0) ? NaN : e);
        return isNaN(e) ? d : e
    }, value:function (f, d, e) {
        return Ext.isEmpty(f, e) ? d : f
    }, escapeRe:function (d) {
        return d.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
    }, sequence:function (g, d, f, e) {
        g[d] = g[d].createSequence(f, e)
    }, addBehaviors:function (h) {
        if (!Ext.isReady) {
            Ext.onReady(function () {
                Ext.addBehaviors(h)
            })
        } else {
            var e = {}, g, d, f;
            for (d in h) {
                if ((g = d.split("@"))[1]) {
                    f = g[0];
                    if (!e[f]) {
                        e[f] = Ext.select(f)
                    }
                    e[f].on(g[1], h[d])
                }
            }
            e = null
        }
    }, getScrollBarWidth:function (f) {
        if (!Ext.isReady) {
            return 0
        }
        if (f === true || b === null) {
            var h = Ext.getBody().createChild('<div class="x-hide-offsets" style="width:100px;height:50px;overflow:hidden;"><div style="height:200px;"></div></div>'), g = h.child("div", true);
            var e = g.offsetWidth;
            h.setStyle("overflow", (Ext.isWebKit || Ext.isGecko) ? "auto" : "scroll");
            var d = g.offsetWidth;
            h.remove();
            b = e - d + 2
        }
        return b
    }, combine:function () {
        var f = arguments, e = f.length, h = [];
        for (var g = 0; g < e; g++) {
            var d = f[g];
            if (Ext.isArray(d)) {
                h = h.concat(d)
            } else {
                if (d.length !== undefined && !d.substr) {
                    h = h.concat(Array.prototype.slice.call(d, 0))
                } else {
                    h.push(d)
                }
            }
        }
        return h
    }, copyTo:function (d, e, f) {
        if (typeof f == "string") {
            f = f.split(/[,;\s]/)
        }
        Ext.each(f, function (g) {
            if (e.hasOwnProperty(g)) {
                d[g] = e[g]
            }
        }, this);
        return d
    }, destroy:function () {
        Ext.each(arguments, function (d) {
            if (d) {
                if (Ext.isArray(d)) {
                    this.destroy.apply(this, d)
                } else {
                    if (typeof d.destroy == "function") {
                        d.destroy()
                    } else {
                        if (d.dom) {
                            d.remove()
                        }
                    }
                }
            }
        }, this)
    }, destroyMembers:function (k, h, f, g) {
        for (var j = 1, e = arguments, d = e.length; j < d; j++) {
            Ext.destroy(k[e[j]]);
            delete k[e[j]]
        }
    }, clean:function (d) {
        var e = [];
        Ext.each(d, function (f) {
            if (!!f) {
                e.push(f)
            }
        });
        return e
    }, unique:function (d) {
        var e = [], f = {};
        Ext.each(d, function (g) {
            if (!f[g]) {
                e.push(g)
            }
            f[g] = true
        });
        return e
    }, flatten:function (d) {
        var f = [];

        function e(g) {
            Ext.each(g, function (h) {
                if (Ext.isArray(h)) {
                    e(h)
                } else {
                    f.push(h)
                }
            });
            return f
        }

        return e(d)
    }, min:function (d, e) {
        var f = d[0];
        e = e || function (h, g) {
            return h < g ? -1 : 1
        };
        Ext.each(d, function (g) {
            f = e(f, g) == -1 ? f : g
        });
        return f
    }, max:function (d, e) {
        var f = d[0];
        e = e || function (h, g) {
            return h > g ? 1 : -1
        };
        Ext.each(d, function (g) {
            f = e(f, g) == 1 ? f : g
        });
        return f
    }, mean:function (d) {
        return d.length > 0 ? Ext.sum(d) / d.length : undefined
    }, sum:function (d) {
        var e = 0;
        Ext.each(d, function (f) {
            e += f
        });
        return e
    }, partition:function (d, e) {
        var f = [
            [],
            []
        ];
        Ext.each(d, function (h, j, g) {
            f[(e && e(h, j, g)) || (!e && h) ? 0 : 1].push(h)
        });
        return f
    }, invoke:function (d, e) {
        var g = [], f = Array.prototype.slice.call(arguments, 2);
        Ext.each(d, function (h, j) {
            if (h && typeof h[e] == "function") {
                g.push(h[e].apply(h, f))
            } else {
                g.push(undefined)
            }
        });
        return g
    }, pluck:function (d, f) {
        var e = [];
        Ext.each(d, function (g) {
            e.push(g[f])
        });
        return e
    }, zip:function () {
        var m = Ext.partition(arguments, function (i) {
            return typeof i != "function"
        }), h = m[0], l = m[1][0], d = Ext.max(Ext.pluck(h, "length")), g = [];
        for (var k = 0; k < d; k++) {
            g[k] = [];
            if (l) {
                g[k] = l.apply(l, Ext.pluck(h, k))
            } else {
                for (var f = 0, e = h.length; f < e; f++) {
                    g[k].push(h[f][k])
                }
            }
        }
        return g
    }, getCmp:function (d) {
        return Ext.ComponentMgr.get(d)
    }, useShims:c.isIE6 || (c.isMac && c.isGecko2), type:function (e) {
        if (e === undefined || e === null) {
            return false
        }
        if (e.htmlElement) {
            return"element"
        }
        var d = typeof e;
        if (d == "object" && e.nodeName) {
            switch (e.nodeType) {
                case 1:
                    return"element";
                case 3:
                    return(/\S/).test(e.nodeValue) ? "textnode" : "whitespace"
            }
        }
        if (d == "object" || d == "function") {
            switch (e.constructor) {
                case Array:
                    return"array";
                case RegExp:
                    return"regexp";
                case Date:
                    return"date"
            }
            if (typeof e.length == "number" && typeof e.item == "function") {
                return"nodelist"
            }
        }
        return d
    }, intercept:function (g, d, f, e) {
        g[d] = g[d].createInterceptor(f, e)
    }, callback:function (d, g, f, e) {
        if (typeof d == "function") {
            if (e) {
                d.defer(e, g, f || [])
            } else {
                d.apply(g, f || [])
            }
        }
    }}
}());
Ext.apply(Function.prototype, {createSequence:function (b, a) {
    var c = this;
    return(typeof b != "function") ? this : function () {
        var d = c.apply(this || window, arguments);
        b.apply(a || this || window, arguments);
        return d
    }
}});
Ext.applyIf(String, {escape:function (a) {
    return a.replace(/('|\\)/g, "\\$1")
}, leftPad:function (d, b, c) {
    var a = String(d);
    if (!c) {
        c = " "
    }
    while (a.length < b) {
        a = c + a
    }
    return a
}});
String.prototype.toggle = function (b, a) {
    return this == b ? a : b
};
String.prototype.trim = function () {
    var a = /^\s+|\s+$/g;
    return function () {
        return this.replace(a, "")
    }
}();
Date.prototype.getElapsed = function (a) {
    return Math.abs((a || new Date()).getTime() - this.getTime())
};
Ext.applyIf(Number.prototype, {constrain:function (b, a) {
    return Math.min(Math.max(this, b), a)
}});
Ext.lib.Dom.getRegion = function (a) {
    return Ext.lib.Region.getRegion(a)
};
Ext.lib.Region = function (d, f, a, c) {
    var e = this;
    e.top = d;
    e[1] = d;
    e.right = f;
    e.bottom = a;
    e.left = c;
    e[0] = c
};
Ext.lib.Region.prototype = {contains:function (b) {
    var a = this;
    return(b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom)
}, getArea:function () {
    var a = this;
    return((a.bottom - a.top) * (a.right - a.left))
}, intersect:function (g) {
    var f = this, d = Math.max(f.top, g.top), e = Math.min(f.right, g.right), a = Math.min(f.bottom, g.bottom), c = Math.max(f.left, g.left);
    if (a >= d && e >= c) {
        return new Ext.lib.Region(d, e, a, c)
    }
}, union:function (g) {
    var f = this, d = Math.min(f.top, g.top), e = Math.max(f.right, g.right), a = Math.max(f.bottom, g.bottom), c = Math.min(f.left, g.left);
    return new Ext.lib.Region(d, e, a, c)
}, constrainTo:function (b) {
    var a = this;
    a.top = a.top.constrain(b.top, b.bottom);
    a.bottom = a.bottom.constrain(b.top, b.bottom);
    a.left = a.left.constrain(b.left, b.right);
    a.right = a.right.constrain(b.left, b.right);
    return a
}, adjust:function (d, c, a, f) {
    var e = this;
    e.top += d;
    e.left += c;
    e.right += f;
    e.bottom += a;
    return e
}};
Ext.lib.Region.getRegion = function (e) {
    var g = Ext.lib.Dom.getXY(e), d = g[1], f = g[0] + e.offsetWidth, a = g[1] + e.offsetHeight, c = g[0];
    return new Ext.lib.Region(d, f, a, c)
};
Ext.lib.Point = function (a, c) {
    if (Ext.isArray(a)) {
        c = a[1];
        a = a[0]
    }
    var b = this;
    b.x = b.right = b.left = b[0] = a;
    b.y = b.top = b.bottom = b[1] = c
};
Ext.lib.Point.prototype = new Ext.lib.Region();
Ext.apply(Ext.DomHelper, function () {
    var e, a = "afterbegin", g = "afterend", h = "beforebegin", d = "beforeend", b = /tag|children|cn|html$/i;

    function f(l, n, m, p, k, i) {
        l = Ext.getDom(l);
        var j;
        if (e.useDom) {
            j = c(n, null);
            if (i) {
                l.appendChild(j)
            } else {
                (k == "firstChild" ? l : l.parentNode).insertBefore(j, l[k] || l)
            }
        } else {
            j = Ext.DomHelper.insertHtml(p, l, Ext.DomHelper.createHtml(n))
        }
        return m ? Ext.get(j, true) : j
    }

    function c(j, r) {
        var k, u = document, p, s, m, t;
        if (Ext.isArray(j)) {
            k = u.createDocumentFragment();
            for (var q = 0, n = j.length; q < n; q++) {
                c(j[q], k)
            }
        } else {
            if (typeof j == "string") {
                k = u.createTextNode(j)
            } else {
                k = u.createElement(j.tag || "div");
                p = !!k.setAttribute;
                for (var s in j) {
                    if (!b.test(s)) {
                        m = j[s];
                        if (s == "cls") {
                            k.className = m
                        } else {
                            if (p) {
                                k.setAttribute(s, m)
                            } else {
                                k[s] = m
                            }
                        }
                    }
                }
                Ext.DomHelper.applyStyles(k, j.style);
                if ((t = j.children || j.cn)) {
                    c(t, k)
                } else {
                    if (j.html) {
                        k.innerHTML = j.html
                    }
                }
            }
        }
        if (r) {
            r.appendChild(k)
        }
        return k
    }

    e = {createTemplate:function (j) {
        var i = Ext.DomHelper.createHtml(j);
        return new Ext.Template(i)
    }, useDom:false, insertBefore:function (i, k, j) {
        return f(i, k, j, h)
    }, insertAfter:function (i, k, j) {
        return f(i, k, j, g, "nextSibling")
    }, insertFirst:function (i, k, j) {
        return f(i, k, j, a, "firstChild")
    }, append:function (i, k, j) {
        return f(i, k, j, d, "", true)
    }, createDom:c};
    return e
}());
Ext.apply(Ext.Template.prototype, {disableFormats:false, re:/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, argsRe:/^\s*['"](.*)["']\s*$/, compileARe:/\\/g, compileBRe:/(\r\n|\n)/g, compileCRe:/'/g, applyTemplate:function (b) {
    var f = this, a = f.disableFormats !== true, e = Ext.util.Format, c = f;
    if (f.compiled) {
        return f.compiled(b)
    }
    function d(h, k, o, j) {
        if (o && a) {
            if (o.substr(0, 5) == "this.") {
                return c.call(o.substr(5), b[k], b)
            } else {
                if (j) {
                    var n = f.argsRe;
                    j = j.split(",");
                    for (var l = 0, g = j.length; l < g; l++) {
                        j[l] = j[l].replace(n, "$1")
                    }
                    j = [b[k]].concat(j)
                } else {
                    j = [b[k]]
                }
                return e[o].apply(e, j)
            }
        } else {
            return b[k] !== undefined ? b[k] : ""
        }
    }

    return f.html.replace(f.re, d)
}, compile:function () {
    var me = this, fm = Ext.util.Format, useF = me.disableFormats !== true, sep = Ext.isGecko ? "+" : ",", body;

    function fn(m, name, format, args) {
        if (format && useF) {
            args = args ? "," + args : "";
            if (format.substr(0, 5) != "this.") {
                format = "fm." + format + "("
            } else {
                format = 'this.call("' + format.substr(5) + '", ';
                args = ", values"
            }
        } else {
            args = "";
            format = "(values['" + name + "'] == undefined ? '' : "
        }
        return"'" + sep + format + "values['" + name + "']" + args + ")" + sep + "'"
    }

    if (Ext.isGecko) {
        body = "this.compiled = function(values){ return '" + me.html.replace(me.compileARe, "\\\\").replace(me.compileBRe, "\\n").replace(me.compileCRe, "\\'").replace(me.re, fn) + "';};"
    } else {
        body = ["this.compiled = function(values){ return ['"];
        body.push(me.html.replace(me.compileARe, "\\\\").replace(me.compileBRe, "\\n").replace(me.compileCRe, "\\'").replace(me.re, fn));
        body.push("'].join('');};");
        body = body.join("")
    }
    eval(body);
    return me
}, call:function (c, b, a) {
    return this[c](b, a)
}});
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.util.Functions = {createInterceptor:function (c, b, a) {
    var d = c;
    if (!Ext.isFunction(b)) {
        return c
    } else {
        return function () {
            var f = this, e = arguments;
            b.target = f;
            b.method = c;
            return(b.apply(a || f || window, e) !== false) ? c.apply(f || window, e) : null
        }
    }
}, createDelegate:function (c, d, b, a) {
    if (!Ext.isFunction(c)) {
        return c
    }
    return function () {
        var f = b || arguments;
        if (a === true) {
            f = Array.prototype.slice.call(arguments, 0);
            f = f.concat(b)
        } else {
            if (Ext.isNumber(a)) {
                f = Array.prototype.slice.call(arguments, 0);
                var e = [a, 0].concat(b);
                Array.prototype.splice.apply(f, e)
            }
        }
        return c.apply(d || window, f)
    }
}, defer:function (d, c, e, b, a) {
    d = Ext.util.Functions.createDelegate(d, e, b, a);
    if (c > 0) {
        return setTimeout(d, c)
    }
    d();
    return 0
}, createSequence:function (c, b, a) {
    if (!Ext.isFunction(b)) {
        return c
    } else {
        return function () {
            var d = c.apply(this || window, arguments);
            b.apply(a || this || window, arguments);
            return d
        }
    }
}};
Ext.defer = Ext.util.Functions.defer;
Ext.createInterceptor = Ext.util.Functions.createInterceptor;
Ext.createSequence = Ext.util.Functions.createSequence;
Ext.createDelegate = Ext.util.Functions.createDelegate;
Ext.apply(Ext.util.Observable.prototype, function () {
    function a(i) {
        var h = (this.methodEvents = this.methodEvents || {})[i], d, c, f, g = this;
        if (!h) {
            this.methodEvents[i] = h = {};
            h.originalFn = this[i];
            h.methodName = i;
            h.before = [];
            h.after = [];
            var b = function (k, j, e) {
                if ((c = k.apply(j || g, e)) !== undefined) {
                    if (typeof c == "object") {
                        if (c.returnValue !== undefined) {
                            d = c.returnValue
                        } else {
                            d = c
                        }
                        f = !!c.cancel
                    } else {
                        if (c === false) {
                            f = true
                        } else {
                            d = c
                        }
                    }
                }
            };
            this[i] = function () {
                var k = Array.prototype.slice.call(arguments, 0), j;
                d = c = undefined;
                f = false;
                for (var l = 0, e = h.before.length; l < e; l++) {
                    j = h.before[l];
                    b(j.fn, j.scope, k);
                    if (f) {
                        return d
                    }
                }
                if ((c = h.originalFn.apply(g, k)) !== undefined) {
                    d = c
                }
                for (var l = 0, e = h.after.length; l < e; l++) {
                    j = h.after[l];
                    b(j.fn, j.scope, k);
                    if (f) {
                        return d
                    }
                }
                return d
            }
        }
        return h
    }

    return{beforeMethod:function (d, c, b) {
        a.call(this, d).before.push({fn:c, scope:b})
    }, afterMethod:function (d, c, b) {
        a.call(this, d).after.push({fn:c, scope:b})
    }, removeMethodListener:function (h, f, d) {
        var g = this.getMethodEvent(h);
        for (var c = 0, b = g.before.length; c < b; c++) {
            if (g.before[c].fn == f && g.before[c].scope == d) {
                g.before.splice(c, 1);
                return
            }
        }
        for (var c = 0, b = g.after.length; c < b; c++) {
            if (g.after[c].fn == f && g.after[c].scope == d) {
                g.after.splice(c, 1);
                return
            }
        }
    }, relayEvents:function (h, e) {
        var g = this;

        function f(i) {
            return function () {
                return g.fireEvent.apply(g, [i].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }

        for (var d = 0, b = e.length; d < b; d++) {
            var c = e[d];
            g.events[c] = g.events[c] || true;
            h.on(c, f(c), g)
        }
    }, enableBubble:function (e) {
        var f = this;
        if (!Ext.isEmpty(e)) {
            e = Ext.isArray(e) ? e : Array.prototype.slice.call(arguments, 0);
            for (var d = 0, b = e.length; d < b; d++) {
                var c = e[d];
                c = c.toLowerCase();
                var g = f.events[c] || true;
                if (typeof g == "boolean") {
                    g = new Ext.util.Event(f, c);
                    f.events[c] = g
                }
                g.bubble = true
            }
        }
    }}
}());
Ext.util.Observable.capture = function (c, b, a) {
    c.fireEvent = c.fireEvent.createInterceptor(b, a)
};
Ext.util.Observable.observeClass = function (b, a) {
    if (b) {
        if (!b.fireEvent) {
            Ext.apply(b, new Ext.util.Observable());
            Ext.util.Observable.capture(b.prototype, b.fireEvent, b)
        }
        if (typeof a == "object") {
            b.on(a)
        }
        return b
    }
};
Ext.apply(Ext.EventManager, function () {
    var d, j, f, b, a = Ext.lib.Dom, i = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/, c = Ext.EventManager._unload, h = 0, g = 0, e = Ext.isWebKit ? Ext.num(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1]) >= 525 : !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera);
    return{_unload:function () {
        Ext.EventManager.un(window, "resize", this.fireWindowResize, this);
        c.call(Ext.EventManager)
    }, doResizeEvent:function () {
        var l = a.getViewHeight(), k = a.getViewWidth();
        if (g != l || h != k) {
            d.fire(h = k, g = l)
        }
    }, onWindowResize:function (m, l, k) {
        if (!d) {
            d = new Ext.util.Event();
            j = new Ext.util.DelayedTask(this.doResizeEvent);
            Ext.EventManager.on(window, "resize", this.fireWindowResize, this)
        }
        d.addListener(m, l, k)
    }, fireWindowResize:function () {
        if (d) {
            j.delay(100)
        }
    }, onTextResize:function (n, m, k) {
        if (!f) {
            f = new Ext.util.Event();
            var l = new Ext.Element(document.createElement("div"));
            l.dom.className = "x-text-resize";
            l.dom.innerHTML = "X";
            l.appendTo(document.body);
            b = l.dom.offsetHeight;
            setInterval(function () {
                if (l.dom.offsetHeight != b) {
                    f.fire(b, b = l.dom.offsetHeight)
                }
            }, this.textResizeInterval)
        }
        f.addListener(n, m, k)
    }, removeResizeListener:function (l, k) {
        if (d) {
            d.removeListener(l, k)
        }
    }, fireResize:function () {
        if (d) {
            d.fire(a.getViewWidth(), a.getViewHeight())
        }
    }, textResizeInterval:50, ieDeferSrc:false, getKeyEvent:function () {
        return e ? "keydown" : "keypress"
    }, useKeydown:e}
}());
Ext.EventManager.on = Ext.EventManager.addListener;
Ext.apply(Ext.EventObjectImpl.prototype, {BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, RETURN:13, SHIFT:16, CTRL:17, CONTROL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGEUP:33, PAGE_DOWN:34, PAGEDOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, V:86, W:87, X:88, Y:89, Z:90, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, isNavKeyPress:function () {
    var b = this, a = this.normalizeKey(b.keyCode);
    return(a >= 33 && a <= 40) || a == b.RETURN || a == b.TAB || a == b.ESC
}, isSpecialKey:function () {
    var a = this.normalizeKey(this.keyCode);
    return(this.type == "keypress" && this.ctrlKey) || this.isNavKeyPress() || (a == this.BACKSPACE) || (a >= 16 && a <= 20) || (a >= 44 && a <= 46)
}, getPoint:function () {
    return new Ext.lib.Point(this.xy[0], this.xy[1])
}, hasModifier:function () {
    return((this.ctrlKey || this.altKey) || this.shiftKey)
}});
Ext.Element.addMethods({swallowEvent:function (a, b) {
    var d = this;

    function c(f) {
        f.stopPropagation();
        if (b) {
            f.preventDefault()
        }
    }

    if (Ext.isArray(a)) {
        Ext.each(a, function (f) {
            d.on(f, c)
        });
        return d
    }
    d.on(a, c);
    return d
}, relayEvent:function (a, b) {
    this.on(a, function (c) {
        b.fireEvent(a, c)
    })
}, clean:function (b) {
    var d = this, e = d.dom, f = e.firstChild, c = -1;
    if (Ext.Element.data(e, "isCleaned") && b !== true) {
        return d
    }
    while (f) {
        var a = f.nextSibling;
        if (f.nodeType == 3 && !(/\S/.test(f.nodeValue))) {
            e.removeChild(f)
        } else {
            f.nodeIndex = ++c
        }
        f = a
    }
    Ext.Element.data(e, "isCleaned", true);
    return d
}, load:function () {
    var a = this.getUpdater();
    a.update.apply(a, arguments);
    return this
}, getUpdater:function () {
    return this.updateManager || (this.updateManager = new Ext.Updater(this))
}, update:function (html, loadScripts, callback) {
    if (!this.dom) {
        return this
    }
    html = html || "";
    if (loadScripts !== true) {
        this.dom.innerHTML = html;
        if (typeof callback == "function") {
            callback()
        }
        return this
    }
    var id = Ext.id(), dom = this.dom;
    html += '<span id="' + id + '"></span>';
    Ext.lib.Event.onAvailable(id, function () {
        var DOC = document, hd = DOC.getElementsByTagName("head")[0], re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig, srcRe = /\ssrc=([\'\"])(.*?)\1/i, typeRe = /\stype=([\'\"])(.*?)\1/i, match, attrs, srcMatch, typeMatch, el, s;
        while ((match = re.exec(html))) {
            attrs = match[1];
            srcMatch = attrs ? attrs.match(srcRe) : false;
            if (srcMatch && srcMatch[2]) {
                s = DOC.createElement("script");
                s.src = srcMatch[2];
                typeMatch = attrs.match(typeRe);
                if (typeMatch && typeMatch[2]) {
                    s.type = typeMatch[2]
                }
                hd.appendChild(s)
            } else {
                if (match[2] && match[2].length > 0) {
                    if (window.execScript) {
                        window.execScript(match[2])
                    } else {
                        window.eval(match[2])
                    }
                }
            }
        }
        el = DOC.getElementById(id);
        if (el) {
            Ext.removeNode(el)
        }
        if (typeof callback == "function") {
            callback()
        }
    });
    dom.innerHTML = html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
    return this
}, removeAllListeners:function () {
    this.removeAnchor();
    Ext.EventManager.removeAll(this.dom);
    return this
}, createProxy:function (a, e, d) {
    a = (typeof a == "object") ? a : {tag:"div", cls:a};
    var c = this, b = e ? Ext.DomHelper.append(e, a, true) : Ext.DomHelper.insertBefore(c.dom, a, true);
    if (d && c.setBox && c.getBox) {
        b.setBox(c.getBox())
    }
    return b
}});
Ext.Element.prototype.getUpdateManager = Ext.Element.prototype.getUpdater;
Ext.Element.addMethods({getAnchorXY:function (e, k, p) {
    e = (e || "tl").toLowerCase();
    p = p || {};
    var j = this, b = j.dom == document.body || j.dom == document, m = p.width || b ? Ext.lib.Dom.getViewWidth() : j.getWidth(), g = p.height || b ? Ext.lib.Dom.getViewHeight() : j.getHeight(), n, a = Math.round, c = j.getXY(), l = j.getScroll(), i = b ? l.left : !k ? c[0] : 0, f = b ? l.top : !k ? c[1] : 0, d = {c:[a(m * 0.5), a(g * 0.5)], t:[a(m * 0.5), 0], l:[0, a(g * 0.5)], r:[m, a(g * 0.5)], b:[a(m * 0.5), g], tl:[0, 0], bl:[0, g], br:[m, g], tr:[m, 0]};
    n = d[e];
    return[n[0] + i, n[1] + f]
}, anchorTo:function (b, g, c, a, j, k) {
    var h = this, e = h.dom, i = !Ext.isEmpty(j), d = function () {
        Ext.fly(e).alignTo(b, g, c, a);
        Ext.callback(k, Ext.fly(e))
    }, f = this.getAnchor();
    this.removeAnchor();
    Ext.apply(f, {fn:d, scroll:i});
    Ext.EventManager.onWindowResize(d, null);
    if (i) {
        Ext.EventManager.on(window, "scroll", d, null, {buffer:!isNaN(j) ? j : 50})
    }
    d.call(h);
    return h
}, removeAnchor:function () {
    var b = this, a = this.getAnchor();
    if (a && a.fn) {
        Ext.EventManager.removeResizeListener(a.fn);
        if (a.scroll) {
            Ext.EventManager.un(window, "scroll", a.fn)
        }
        delete a.fn
    }
    return b
}, getAnchor:function () {
    var b = Ext.Element.data, c = this.dom;
    if (!c) {
        return
    }
    var a = b(c, "_anchor");
    if (!a) {
        a = b(c, "_anchor", {})
    }
    return a
}, getAlignToXY:function (f, z, A) {
    f = Ext.get(f);
    if (!f || !f.dom) {
        throw"Element.alignToXY with an element that doesn't exist"
    }
    A = A || [0, 0];
    z = (!z || z == "?" ? "tl-bl?" : (!(/-/).test(z) && z !== "" ? "tl-" + z : z || "tl-bl")).toLowerCase();
    var J = this, G = J.dom, L, K, l, k, q, E, u, s = Ext.lib.Dom.getViewWidth() - 10, F = Ext.lib.Dom.getViewHeight() - 10, b, g, i, j, t, v, M = document, I = M.documentElement, n = M.body, D = (I.scrollLeft || n.scrollLeft || 0) + 5, C = (I.scrollTop || n.scrollTop || 0) + 5, H = false, e = "", a = "", B = z.match(/^([a-z]+)-([a-z]+)(\?)?$/);
    if (!B) {
        throw"Element.alignTo with an invalid alignment " + z
    }
    e = B[1];
    a = B[2];
    H = !!B[3];
    L = J.getAnchorXY(e, true);
    K = f.getAnchorXY(a, false);
    l = K[0] - L[0] + A[0];
    k = K[1] - L[1] + A[1];
    if (H) {
        q = J.getWidth();
        E = J.getHeight();
        u = f.getRegion();
        b = e.charAt(0);
        g = e.charAt(e.length - 1);
        i = a.charAt(0);
        j = a.charAt(a.length - 1);
        t = ((b == "t" && i == "b") || (b == "b" && i == "t"));
        v = ((g == "r" && j == "l") || (g == "l" && j == "r"));
        if (l + q > s + D) {
            l = v ? u.left - q : s + D - q
        }
        if (l < D) {
            l = v ? u.right : D
        }
        if (k + E > F + C) {
            k = t ? u.top - E : F + C - E
        }
        if (k < C) {
            k = t ? u.bottom : C
        }
    }
    return[l, k]
}, alignTo:function (c, a, e, b) {
    var d = this;
    return d.setXY(d.getAlignToXY(c, a, e), d.preanim && !!b ? d.preanim(arguments, 3) : false)
}, adjustForConstraints:function (c, a, b) {
    return this.getConstrainToXY(a || document, false, b, c) || c
}, getConstrainToXY:function (b, a, c, e) {
    var d = {top:0, left:0, bottom:0, right:0};
    return function (g, z, k, m) {
        g = Ext.get(g);
        k = k ? Ext.applyIf(k, d) : d;
        var v, C, u = 0, t = 0;
        if (g.dom == document.body || g.dom == document) {
            v = Ext.lib.Dom.getViewWidth();
            C = Ext.lib.Dom.getViewHeight()
        } else {
            v = g.dom.clientWidth;
            C = g.dom.clientHeight;
            if (!z) {
                var r = g.getXY();
                u = r[0];
                t = r[1]
            }
        }
        var q = g.getScroll();
        u += k.left + q.left;
        t += k.top + q.top;
        v -= k.right;
        C -= k.bottom;
        var A = u + v, f = t + C, i = m || (!z ? this.getXY() : [this.getLeft(true), this.getTop(true)]), o = i[0], n = i[1], j = this.getConstrainOffset(), p = this.dom.offsetWidth + j, B = this.dom.offsetHeight + j;
        var l = false;
        if ((o + p) > A) {
            o = A - p;
            l = true
        }
        if ((n + B) > f) {
            n = f - B;
            l = true
        }
        if (o < u) {
            o = u;
            l = true
        }
        if (n < t) {
            n = t;
            l = true
        }
        return l ? [o, n] : false
    }
}(), getConstrainOffset:function () {
    return 0
}, getCenterXY:function () {
    return this.getAlignToXY(document, "c-c")
}, center:function (a) {
    return this.alignTo(a || document, "c-c")
}});
Ext.Element.addMethods({select:function (a, b) {
    return Ext.Element.select(a, b, this.dom)
}});
Ext.apply(Ext.Element.prototype, function () {
    var c = Ext.getDom, a = Ext.get, b = Ext.DomHelper;
    return{insertSibling:function (h, f, g) {
        var i = this, e, d = (f || "before").toLowerCase() == "after", j;
        if (Ext.isArray(h)) {
            j = i;
            Ext.each(h, function (k) {
                e = Ext.fly(j, "_internal").insertSibling(k, f, g);
                if (d) {
                    j = e
                }
            });
            return e
        }
        h = h || {};
        if (h.nodeType || h.dom) {
            e = i.dom.parentNode.insertBefore(c(h), d ? i.dom.nextSibling : i.dom);
            if (!g) {
                e = a(e)
            }
        } else {
            if (d && !i.dom.nextSibling) {
                e = b.append(i.dom.parentNode, h, !g)
            } else {
                e = b[d ? "insertAfter" : "insertBefore"](i.dom, h, !g)
            }
        }
        return e
    }}
}());
Ext.Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
Ext.Element.addMethods(function () {
    var a = "_internal", b = /(\d+\.?\d+)px/;
    return{applyStyles:function (c) {
        Ext.DomHelper.applyStyles(this.dom, c);
        return this
    }, getStyles:function () {
        var c = {};
        Ext.each(arguments, function (d) {
            c[d] = this.getStyle(d)
        }, this);
        return c
    }, setOverflow:function (c) {
        var d = this.dom;
        if (c == "auto" && Ext.isMac && Ext.isGecko2) {
            d.style.overflow = "hidden";
            (function () {
                d.style.overflow = "auto"
            }).defer(1)
        } else {
            d.style.overflow = c
        }
    }, boxWrap:function (c) {
        c = c || "x-box";
        var d = Ext.get(this.insertHtml("beforeBegin", "<div class='" + c + "'>" + String.format(Ext.Element.boxMarkup, c) + "</div>"));
        Ext.DomQuery.selectNode("." + c + "-mc", d.dom).appendChild(this.dom);
        return d
    }, setSize:function (e, c, d) {
        var f = this;
        if (typeof e == "object") {
            c = e.height;
            e = e.width
        }
        e = f.adjustWidth(e);
        c = f.adjustHeight(c);
        if (!d || !f.anim) {
            f.dom.style.width = f.addUnits(e);
            f.dom.style.height = f.addUnits(c)
        } else {
            f.anim({width:{to:e}, height:{to:c}}, f.preanim(arguments, 2))
        }
        return f
    }, getComputedHeight:function () {
        var d = this, c = Math.max(d.dom.offsetHeight, d.dom.clientHeight);
        if (!c) {
            c = parseFloat(d.getStyle("height")) || 0;
            if (!d.isBorderBox()) {
                c += d.getFrameWidth("tb")
            }
        }
        return c
    }, getComputedWidth:function () {
        var c = Math.max(this.dom.offsetWidth, this.dom.clientWidth);
        if (!c) {
            c = parseFloat(this.getStyle("width")) || 0;
            if (!this.isBorderBox()) {
                c += this.getFrameWidth("lr")
            }
        }
        return c
    }, getFrameWidth:function (d, c) {
        return c && this.isBorderBox() ? 0 : (this.getPadding(d) + this.getBorderWidth(d))
    }, addClassOnOver:function (c) {
        this.hover(function () {
            Ext.fly(this, a).addClass(c)
        }, function () {
            Ext.fly(this, a).removeClass(c)
        });
        return this
    }, addClassOnFocus:function (c) {
        this.on("focus", function () {
            Ext.fly(this, a).addClass(c)
        }, this.dom);
        this.on("blur", function () {
            Ext.fly(this, a).removeClass(c)
        }, this.dom);
        return this
    }, addClassOnClick:function (c) {
        var d = this.dom;
        this.on("mousedown", function () {
            Ext.fly(d, a).addClass(c);
            var f = Ext.getDoc(), e = function () {
                Ext.fly(d, a).removeClass(c);
                f.removeListener("mouseup", e)
            };
            f.on("mouseup", e)
        });
        return this
    }, getViewSize:function () {
        var f = document, g = this.dom, c = (g == f || g == f.body);
        if (c) {
            var e = Ext.lib.Dom;
            return{width:e.getViewWidth(), height:e.getViewHeight()}
        } else {
            return{width:g.clientWidth, height:g.clientHeight}
        }
    }, getStyleSize:function () {
        var i = this, c, g, k = document, l = this.dom, e = (l == k || l == k.body), f = l.style;
        if (e) {
            var j = Ext.lib.Dom;
            return{width:j.getViewWidth(), height:j.getViewHeight()}
        }
        if (f.width && f.width != "auto") {
            c = parseFloat(f.width);
            if (i.isBorderBox()) {
                c -= i.getFrameWidth("lr")
            }
        }
        if (f.height && f.height != "auto") {
            g = parseFloat(f.height);
            if (i.isBorderBox()) {
                g -= i.getFrameWidth("tb")
            }
        }
        return{width:c || i.getWidth(true), height:g || i.getHeight(true)}
    }, getSize:function (c) {
        return{width:this.getWidth(c), height:this.getHeight(c)}
    }, repaint:function () {
        var c = this.dom;
        this.addClass("x-repaint");
        setTimeout(function () {
            Ext.fly(c).removeClass("x-repaint")
        }, 1);
        return this
    }, unselectable:function () {
        this.dom.unselectable = "on";
        return this.swallowEvent("selectstart", true).applyStyles("-moz-user-select:none;-khtml-user-select:none;").addClass("x-unselectable")
    }, getMargins:function (d) {
        var e = this, c, f = {t:"top", l:"left", r:"right", b:"bottom"}, g = {};
        if (!d) {
            for (c in e.margins) {
                g[f[c]] = parseFloat(e.getStyle(e.margins[c])) || 0
            }
            return g
        } else {
            return e.addStyles.call(e, d, e.margins)
        }
    }}
}());
Ext.Element.addMethods({setBox:function (e, f, b) {
    var d = this, a = e.width, c = e.height;
    if ((f && !d.autoBoxAdjust) && !d.isBorderBox()) {
        a -= (d.getBorderWidth("lr") + d.getPadding("lr"));
        c -= (d.getBorderWidth("tb") + d.getPadding("tb"))
    }
    d.setBounds(e.x, e.y, a, c, d.animTest.call(d, arguments, b, 2));
    return d
}, getBox:function (i, o) {
    var k = this, u, e, n, d = k.getBorderWidth, p = k.getPadding, f, a, s, m;
    if (!o) {
        u = k.getXY()
    } else {
        e = parseInt(k.getStyle("left"), 10) || 0;
        n = parseInt(k.getStyle("top"), 10) || 0;
        u = [e, n]
    }
    var c = k.dom, q = c.offsetWidth, g = c.offsetHeight, j;
    if (!i) {
        j = {x:u[0], y:u[1], 0:u[0], 1:u[1], width:q, height:g}
    } else {
        f = d.call(k, "l") + p.call(k, "l");
        a = d.call(k, "r") + p.call(k, "r");
        s = d.call(k, "t") + p.call(k, "t");
        m = d.call(k, "b") + p.call(k, "b");
        j = {x:u[0] + f, y:u[1] + s, 0:u[0] + f, 1:u[1] + s, width:q - (f + a), height:g - (s + m)}
    }
    j.right = j.x + j.width;
    j.bottom = j.y + j.height;
    return j
}, move:function (i, b, c) {
    var f = this, l = f.getXY(), j = l[0], h = l[1], d = [j - b, h], k = [j + b, h], g = [j, h - b], a = [j, h + b], e = {l:d, left:d, r:k, right:k, t:g, top:g, up:g, b:a, bottom:a, down:a};
    i = i.toLowerCase();
    f.moveTo(e[i][0], e[i][1], f.animTest.call(f, arguments, c, 2))
}, setLeftTop:function (d, c) {
    var b = this, a = b.dom.style;
    a.left = b.addUnits(d);
    a.top = b.addUnits(c);
    return b
}, getRegion:function () {
    return Ext.lib.Dom.getRegion(this.dom)
}, setBounds:function (b, f, d, a, c) {
    var e = this;
    if (!c || !e.anim) {
        e.setSize(d, a);
        e.setLocation(b, f)
    } else {
        e.anim({points:{to:[b, f]}, width:{to:e.adjustWidth(d)}, height:{to:e.adjustHeight(a)}}, e.preanim(arguments, 4), "motion")
    }
    return e
}, setRegion:function (b, a) {
    return this.setBounds(b.left, b.top, b.right - b.left, b.bottom - b.top, this.animTest.call(this, arguments, a, 1))
}});
Ext.Element.addMethods({scrollTo:function (b, d, a) {
    var e = /top/i.test(b), c = this, f = c.dom, g;
    if (!a || !c.anim) {
        g = "scroll" + (e ? "Top" : "Left");
        f[g] = d
    } else {
        g = "scroll" + (e ? "Left" : "Top");
        c.anim({scroll:{to:e ? [f[g], d] : [d, f[g]]}}, c.preanim(arguments, 2), "scroll")
    }
    return c
}, scrollIntoView:function (e, h) {
    var n = Ext.getDom(e) || Ext.getBody().dom, g = this.dom, f = this.getOffsetsTo(n), j = f[0] + n.scrollLeft, s = f[1] + n.scrollTop, p = s + g.offsetHeight, d = j + g.offsetWidth, a = n.clientHeight, k = parseInt(n.scrollTop, 10), q = parseInt(n.scrollLeft, 10), i = k + a, m = q + n.clientWidth;
    if (g.offsetHeight > a || s < k) {
        n.scrollTop = s
    } else {
        if (p > i) {
            n.scrollTop = p - a
        }
    }
    n.scrollTop = n.scrollTop;
    if (h !== false) {
        if (g.offsetWidth > n.clientWidth || j < q) {
            n.scrollLeft = j
        } else {
            if (d > m) {
                n.scrollLeft = d - n.clientWidth
            }
        }
        n.scrollLeft = n.scrollLeft
    }
    return this
}, scrollChildIntoView:function (b, a) {
    Ext.fly(b, "_scrollChildIntoView").scrollIntoView(this, a)
}, scroll:function (k, b, d) {
    if (!this.isScrollable()) {
        return false
    }
    var e = this.dom, f = e.scrollLeft, o = e.scrollTop, m = e.scrollWidth, j = e.scrollHeight, g = e.clientWidth, a = e.clientHeight, c = false, n, i = {l:Math.min(f + b, m - g), r:n = Math.max(f - b, 0), t:Math.max(o - b, 0), b:Math.min(o + b, j - a)};
    i.d = i.b;
    i.u = i.t;
    k = k.substr(0, 1);
    if ((n = i[k]) > -1) {
        c = true;
        this.scrollTo(k == "l" || k == "r" ? "left" : "top", n, this.preanim(arguments, 2))
    }
    return c
}});
Ext.Element.addMethods(function () {
    var d = "visibility", b = "display", a = "hidden", g = "none", c = "x-masked", f = "x-masked-relative", e = Ext.Element.data;
    return{isVisible:function (h) {
        var i = !this.isStyle(d, a) && !this.isStyle(b, g), j = this.dom.parentNode;
        if (h !== true || !i) {
            return i
        }
        while (j && !(/^body/i.test(j.tagName))) {
            if (!Ext.fly(j, "_isVisible").isVisible()) {
                return false
            }
            j = j.parentNode
        }
        return true
    }, isDisplayed:function () {
        return !this.isStyle(b, g)
    }, enableDisplayMode:function (h) {
        this.setVisibilityMode(Ext.Element.DISPLAY);
        if (!Ext.isEmpty(h)) {
            e(this.dom, "originalDisplay", h)
        }
        return this
    }, mask:function (i, m) {
        var o = this, k = o.dom, n = Ext.DomHelper, l = "ext-el-mask-msg", h, p;
        if (!/^body/i.test(k.tagName) && o.getStyle("position") == "static") {
            o.addClass(f)
        }
        if (h = e(k, "maskMsg")) {
            h.remove()
        }
        if (h = e(k, "mask")) {
            h.remove()
        }
        p = n.append(k, {cls:"ext-el-mask"}, true);
        e(k, "mask", p);
        o.addClass(c);
        p.setDisplayed(true);
        if (typeof i == "string") {
            var j = n.append(k, {cls:l, cn:{tag:"div"}}, true);
            e(k, "maskMsg", j);
            j.dom.className = m ? l + " " + m : l;
            j.dom.firstChild.innerHTML = i;
            j.setDisplayed(true);
            j.center(o)
        }
        if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict) && o.getStyle("height") == "auto") {
            p.setSize(undefined, o.getHeight())
        }
        return p
    }, unmask:function () {
        var j = this, k = j.dom, h = e(k, "mask"), i = e(k, "maskMsg");
        if (h) {
            if (i) {
                i.remove();
                e(k, "maskMsg", undefined)
            }
            h.remove();
            e(k, "mask", undefined);
            j.removeClass([c, f])
        }
    }, isMasked:function () {
        var h = e(this.dom, "mask");
        return h && h.isVisible()
    }, createShim:function () {
        var h = document.createElement("iframe"), i;
        h.frameBorder = "0";
        h.className = "ext-shim";
        h.src = Ext.SSL_SECURE_URL;
        i = Ext.get(this.dom.parentNode.insertBefore(h, this.dom));
        i.autoBoxAdjust = false;
        return i
    }}
}());
Ext.Element.addMethods({addKeyListener:function (b, d, c) {
    var a;
    if (typeof b != "object" || Ext.isArray(b)) {
        a = {key:b, fn:d, scope:c}
    } else {
        a = {key:b.key, shift:b.shift, ctrl:b.ctrl, alt:b.alt, fn:d, scope:c}
    }
    return new Ext.KeyMap(this, a)
}, addKeyMap:function (a) {
    return new Ext.KeyMap(this, a)
}});
Ext.CompositeElementLite.importElementMethods();
Ext.apply(Ext.CompositeElementLite.prototype, {addElements:function (c, a) {
    if (!c) {
        return this
    }
    if (typeof c == "string") {
        c = Ext.Element.selectorFunction(c, a)
    }
    var b = this.elements;
    Ext.each(c, function (d) {
        b.push(Ext.get(d))
    });
    return this
}, first:function () {
    return this.item(0)
}, last:function () {
    return this.item(this.getCount() - 1)
}, contains:function (a) {
    return this.indexOf(a) != -1
}, removeElement:function (d, e) {
    var c = this, a = this.elements, b;
    Ext.each(d, function (f) {
        if ((b = (a[f] || a[f = c.indexOf(f)]))) {
            if (e) {
                if (b.dom) {
                    b.remove()
                } else {
                    Ext.removeNode(b)
                }
            }
            a.splice(f, 1)
        }
    });
    return this
}});
Ext.CompositeElement = Ext.extend(Ext.CompositeElementLite, {constructor:function (b, a) {
    this.elements = [];
    this.add(b, a)
}, getElement:function (a) {
    return a
}, transformElement:function (a) {
    return Ext.get(a)
}});
Ext.Element.select = function (a, d, b) {
    var c;
    if (typeof a == "string") {
        c = Ext.Element.selectorFunction(a, b)
    } else {
        if (a.length !== undefined) {
            c = a
        } else {
            throw"Invalid selector"
        }
    }
    return(d === true) ? new Ext.CompositeElement(c) : new Ext.CompositeElementLite(c)
};
Ext.select = Ext.Element.select;
Ext.UpdateManager = Ext.Updater = Ext.extend(Ext.util.Observable, function () {
    var b = "beforeupdate", d = "update", c = "failure";

    function a(g) {
        var h = this;
        h.transaction = null;
        if (g.argument.form && g.argument.reset) {
            try {
                g.argument.form.reset()
            } catch (i) {
            }
        }
        if (h.loadScripts) {
            h.renderer.render(h.el, g, h, f.createDelegate(h, [g]))
        } else {
            h.renderer.render(h.el, g, h);
            f.call(h, g)
        }
    }

    function f(g, h, i) {
        this.fireEvent(h || d, this.el, g);
        if (Ext.isFunction(g.argument.callback)) {
            g.argument.callback.call(g.argument.scope, this.el, Ext.isEmpty(i) ? true : false, g, g.argument.options)
        }
    }

    function e(g) {
        f.call(this, g, c, !!(this.transaction = null))
    }

    return{constructor:function (h, g) {
        var i = this;
        h = Ext.get(h);
        if (!g && h.updateManager) {
            return h.updateManager
        }
        i.el = h;
        i.defaultUrl = null;
        i.addEvents(b, d, c);
        Ext.apply(i, Ext.Updater.defaults);
        i.transaction = null;
        i.refreshDelegate = i.refresh.createDelegate(i);
        i.updateDelegate = i.update.createDelegate(i);
        i.formUpdateDelegate = (i.formUpdate || function () {
        }).createDelegate(i);
        i.renderer = i.renderer || i.getDefaultRenderer();
        Ext.Updater.superclass.constructor.call(i)
    }, setRenderer:function (g) {
        this.renderer = g
    }, getRenderer:function () {
        return this.renderer
    }, getDefaultRenderer:function () {
        return new Ext.Updater.BasicRenderer()
    }, setDefaultUrl:function (g) {
        this.defaultUrl = g
    }, getEl:function () {
        return this.el
    }, update:function (h, m, n, k) {
        var j = this, g, i;
        if (j.fireEvent(b, j.el, h, m) !== false) {
            if (Ext.isObject(h)) {
                g = h;
                h = g.url;
                m = m || g.params;
                n = n || g.callback;
                k = k || g.discardUrl;
                i = g.scope;
                if (!Ext.isEmpty(g.nocache)) {
                    j.disableCaching = g.nocache
                }
                if (!Ext.isEmpty(g.text)) {
                    j.indicatorText = '<div class="loading-indicator">' + g.text + "</div>"
                }
                if (!Ext.isEmpty(g.scripts)) {
                    j.loadScripts = g.scripts
                }
                if (!Ext.isEmpty(g.timeout)) {
                    j.timeout = g.timeout
                }
            }
            j.showLoading();
            if (!k) {
                j.defaultUrl = h
            }
            if (Ext.isFunction(h)) {
                h = h.call(j)
            }
            var l = Ext.apply({}, {url:h, params:(Ext.isFunction(m) && i) ? m.createDelegate(i) : m, success:a, failure:e, scope:j, callback:undefined, timeout:(j.timeout * 1000), disableCaching:j.disableCaching, argument:{options:g, url:h, form:null, callback:n, scope:i || window, params:m}}, g);
            j.transaction = Ext.Ajax.request(l)
        }
    }, formUpdate:function (j, g, i, k) {
        var h = this;
        if (h.fireEvent(b, h.el, j, g) !== false) {
            if (Ext.isFunction(g)) {
                g = g.call(h)
            }
            j = Ext.getDom(j);
            h.transaction = Ext.Ajax.request({form:j, url:g, success:a, failure:e, scope:h, timeout:(h.timeout * 1000), argument:{url:g, form:j, callback:k, reset:i}});
            h.showLoading.defer(1, h)
        }
    }, startAutoRefresh:function (h, i, k, l, g) {
        var j = this;
        if (g) {
            j.update(i || j.defaultUrl, k, l, true)
        }
        if (j.autoRefreshProcId) {
            clearInterval(j.autoRefreshProcId)
        }
        j.autoRefreshProcId = setInterval(j.update.createDelegate(j, [i || j.defaultUrl, k, l, true]), h * 1000)
    }, stopAutoRefresh:function () {
        if (this.autoRefreshProcId) {
            clearInterval(this.autoRefreshProcId);
            delete this.autoRefreshProcId
        }
    }, isAutoRefreshing:function () {
        return !!this.autoRefreshProcId
    }, showLoading:function () {
        if (this.showLoadIndicator) {
            this.el.dom.innerHTML = this.indicatorText
        }
    }, abort:function () {
        if (this.transaction) {
            Ext.Ajax.abort(this.transaction)
        }
    }, isUpdating:function () {
        return this.transaction ? Ext.Ajax.isLoading(this.transaction) : false
    }, refresh:function (g) {
        if (this.defaultUrl) {
            this.update(this.defaultUrl, null, g, true)
        }
    }}
}());
Ext.Updater.defaults = {timeout:30, disableCaching:false, showLoadIndicator:true, indicatorText:'<div class="loading-indicator">Loading...</div>', loadScripts:false, sslBlankUrl:Ext.SSL_SECURE_URL};
Ext.Updater.updateElement = function (d, c, e, b) {
    var a = Ext.get(d).getUpdater();
    Ext.apply(a, b);
    a.update(c, e, b ? b.callback : null)
};
Ext.Updater.BasicRenderer = function () {
};
Ext.Updater.BasicRenderer.prototype = {render:function (c, a, b, d) {
    c.update(a.responseText, b.loadScripts, d)
}};
(function () {
    Date.useStrict = false;
    function b(d) {
        var c = Array.prototype.slice.call(arguments, 1);
        return d.replace(/\{(\d+)\}/g, function (e, f) {
            return c[f]
        })
    }

    Date.formatCodeToRegex = function (d, c) {
        var e = Date.parseCodes[d];
        if (e) {
            e = typeof e == "function" ? e() : e;
            Date.parseCodes[d] = e
        }
        return e ? Ext.applyIf({c:e.c ? b(e.c, c || "{0}") : e.c}, e) : {g:0, c:null, s:Ext.escapeRe(d)}
    };
    var a = Date.formatCodeToRegex;
    Ext.apply(Date, {parseFunctions:{"M$":function (d, c) {
        var e = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
        var f = (d || "").match(e);
        return f ? new Date(((f[1] || "") + f[2]) * 1) : null
    }}, parseRegexes:[], formatFunctions:{"M$":function () {
        return"\\/Date(" + this.getTime() + ")\\/"
    }}, y2kYear:50, MILLI:"ms", SECOND:"s", MINUTE:"mi", HOUR:"h", DAY:"d", MONTH:"mo", YEAR:"y", defaults:{}, dayNames:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNumbers:{Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11}, getShortMonthName:function (c) {
        return Date.monthNames[c].substring(0, 3)
    }, getShortDayName:function (c) {
        return Date.dayNames[c].substring(0, 3)
    }, getMonthNumber:function (c) {
        return Date.monthNumbers[c.substring(0, 1).toUpperCase() + c.substring(1, 3).toLowerCase()]
    }, formatContainsHourInfo:(function () {
        var d = /(\\.)/g, c = /([gGhHisucUOPZ]|M\$)/;
        return function (e) {
            return c.test(e.replace(d, ""))
        }
    })(), formatCodes:{d:"String.leftPad(this.getDate(), 2, '0')", D:"Date.getShortDayName(this.getDay())", j:"this.getDate()", l:"Date.dayNames[this.getDay()]", N:"(this.getDay() ? this.getDay() : 7)", S:"this.getSuffix()", w:"this.getDay()", z:"this.getDayOfYear()", W:"String.leftPad(this.getWeekOfYear(), 2, '0')", F:"Date.monthNames[this.getMonth()]", m:"String.leftPad(this.getMonth() + 1, 2, '0')", M:"Date.getShortMonthName(this.getMonth())", n:"(this.getMonth() + 1)", t:"this.getDaysInMonth()", L:"(this.isLeapYear() ? 1 : 0)", o:"(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))", Y:"String.leftPad(this.getFullYear(), 4, '0')", y:"('' + this.getFullYear()).substring(2, 4)", a:"(this.getHours() < 12 ? 'am' : 'pm')", A:"(this.getHours() < 12 ? 'AM' : 'PM')", g:"((this.getHours() % 12) ? this.getHours() % 12 : 12)", G:"this.getHours()", h:"String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')", H:"String.leftPad(this.getHours(), 2, '0')", i:"String.leftPad(this.getMinutes(), 2, '0')", s:"String.leftPad(this.getSeconds(), 2, '0')", u:"String.leftPad(this.getMilliseconds(), 3, '0')", O:"this.getGMTOffset()", P:"this.getGMTOffset(true)", T:"this.getTimezone()", Z:"(this.getTimezoneOffset() * -60)", c:function () {
        for (var j = "Y-m-dTH:i:sP", g = [], f = 0, d = j.length; f < d; ++f) {
            var h = j.charAt(f);
            g.push(h == "T" ? "'T'" : Date.getFormatCode(h))
        }
        return g.join(" + ")
    }, U:"Math.round(this.getTime() / 1000)"}, isValid:function (n, c, l, j, f, g, e) {
        j = j || 0;
        f = f || 0;
        g = g || 0;
        e = e || 0;
        var k = new Date(n < 100 ? 100 : n, c - 1, l, j, f, g, e).add(Date.YEAR, n < 100 ? n - 100 : 0);
        return n == k.getFullYear() && c == k.getMonth() + 1 && l == k.getDate() && j == k.getHours() && f == k.getMinutes() && g == k.getSeconds() && e == k.getMilliseconds()
    }, parseDate:function (d, f, c) {
        var e = Date.parseFunctions;
        if (e[f] == null) {
            Date.createParser(f)
        }
        return e[f](d, Ext.isDefined(c) ? c : Date.useStrict)
    }, getFormatCode:function (d) {
        var c = Date.formatCodes[d];
        if (c) {
            c = typeof c == "function" ? c() : c;
            Date.formatCodes[d] = c
        }
        return c || ("'" + String.escape(d) + "'")
    }, createFormat:function (g) {
        var f = [], c = false, e = "";
        for (var d = 0; d < g.length; ++d) {
            e = g.charAt(d);
            if (!c && e == "\\") {
                c = true
            } else {
                if (c) {
                    c = false;
                    f.push("'" + String.escape(e) + "'")
                } else {
                    f.push(Date.getFormatCode(e))
                }
            }
        }
        Date.formatFunctions[g] = new Function("return " + f.join("+"))
    }, createParser:function () {
        var c = ["var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,", "def = Date.defaults,", "results = String(input).match(Date.parseRegexes[{0}]);", "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);", "}else{", "dt = (new Date()).clearTime();", "y = Ext.num(y, Ext.num(def.y, dt.getFullYear()));", "m = Ext.num(m, Ext.num(def.m - 1, dt.getMonth()));", "d = Ext.num(d, Ext.num(def.d, dt.getDate()));", "h  = Ext.num(h, Ext.num(def.h, dt.getHours()));", "i  = Ext.num(i, Ext.num(def.i, dt.getMinutes()));", "s  = Ext.num(s, Ext.num(def.s, dt.getSeconds()));", "ms = Ext.num(ms, Ext.num(def.ms, dt.getMilliseconds()));", "if(z >= 0 && y >= 0){", "v = new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms).add(Date.YEAR, y < 100 ? y - 100 : 0);", "v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);", "}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){", "v = null;", "}else{", "v = new Date(y < 100 ? 100 : y, m, d, h, i, s, ms).add(Date.YEAR, y < 100 ? y - 100 : 0);", "}", "}", "}", "if(v){", "if(zz != null){", "v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);", "}else if(o){", "v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));", "}", "}", "return v;"].join("\n");
        return function (l) {
            var e = Date.parseRegexes.length, n = 1, f = [], k = [], j = false, d = "", h = 0, g, m;
            for (; h < l.length; ++h) {
                d = l.charAt(h);
                if (!j && d == "\\") {
                    j = true
                } else {
                    if (j) {
                        j = false;
                        k.push(String.escape(d))
                    } else {
                        g = a(d, n);
                        n += g.g;
                        k.push(g.s);
                        if (g.g && g.c) {
                            if (g.calcLast) {
                                m = g.c
                            } else {
                                f.push(g.c)
                            }
                        }
                    }
                }
            }
            if (m) {
                f.push(m)
            }
            Date.parseRegexes[e] = new RegExp("^" + k.join("") + "$", "i");
            Date.parseFunctions[l] = new Function("input", "strict", b(c, e, f.join("")))
        }
    }(), parseCodes:{d:{g:1, c:"d = parseInt(results[{0}], 10);\n", s:"(\\d{2})"}, j:{g:1, c:"d = parseInt(results[{0}], 10);\n", s:"(\\d{1,2})"}, D:function () {
        for (var c = [], d = 0; d < 7; c.push(Date.getShortDayName(d)), ++d) {
        }
        return{g:0, c:null, s:"(?:" + c.join("|") + ")"}
    }, l:function () {
        return{g:0, c:null, s:"(?:" + Date.dayNames.join("|") + ")"}
    }, N:{g:0, c:null, s:"[1-7]"}, S:{g:0, c:null, s:"(?:st|nd|rd|th)"}, w:{g:0, c:null, s:"[0-6]"}, z:{g:1, c:"z = parseInt(results[{0}], 10);\n", s:"(\\d{1,3})"}, W:{g:0, c:null, s:"(?:\\d{2})"}, F:function () {
        return{g:1, c:"m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n", s:"(" + Date.monthNames.join("|") + ")"}
    }, M:function () {
        for (var c = [], d = 0; d < 12; c.push(Date.getShortMonthName(d)), ++d) {
        }
        return Ext.applyIf({s:"(" + c.join("|") + ")"}, a("F"))
    }, m:{g:1, c:"m = parseInt(results[{0}], 10) - 1;\n", s:"(\\d{2})"}, n:{g:1, c:"m = parseInt(results[{0}], 10) - 1;\n", s:"(\\d{1,2})"}, t:{g:0, c:null, s:"(?:\\d{2})"}, L:{g:0, c:null, s:"(?:1|0)"}, o:function () {
        return a("Y")
    }, Y:{g:1, c:"y = parseInt(results[{0}], 10);\n", s:"(\\d{4})"}, y:{g:1, c:"var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n", s:"(\\d{1,2})"}, a:function () {
        return a("A")
    }, A:{calcLast:true, g:1, c:"if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}", s:"(AM|PM|am|pm)"}, g:function () {
        return a("G")
    }, G:{g:1, c:"h = parseInt(results[{0}], 10);\n", s:"(\\d{1,2})"}, h:function () {
        return a("H")
    }, H:{g:1, c:"h = parseInt(results[{0}], 10);\n", s:"(\\d{2})"}, i:{g:1, c:"i = parseInt(results[{0}], 10);\n", s:"(\\d{2})"}, s:{g:1, c:"s = parseInt(results[{0}], 10);\n", s:"(\\d{2})"}, u:{g:1, c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n", s:"(\\d+)"}, O:{g:1, c:["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", "mn = o.substring(3,5) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"), s:"([+-]\\d{4})"}, P:{g:1, c:["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", "mn = o.substring(4,6) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"), s:"([+-]\\d{2}:\\d{2})"}, T:{g:0, c:null, s:"[A-Z]{1,4}"}, Z:{g:1, c:"zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n", s:"([+-]?\\d{1,5})"}, c:function () {
        var e = [], c = [a("Y", 1), a("m", 2), a("d", 3), a("h", 4), a("i", 5), a("s", 6), {c:"ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"}, {c:["if(results[8]) {", "if(results[8] == 'Z'){", "zz = 0;", "}else if (results[8].indexOf(':') > -1){", a("P", 8).c, "}else{", a("O", 8).c, "}", "}"].join("\n")}];
        for (var f = 0, d = c.length; f < d; ++f) {
            e.push(c[f].c)
        }
        return{g:1, c:e.join(""), s:[c[0].s, "(?:", "-", c[1].s, "(?:", "-", c[2].s, "(?:", "(?:T| )?", c[3].s, ":", c[4].s, "(?::", c[5].s, ")?", "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"].join("")}
    }, U:{g:1, c:"u = parseInt(results[{0}], 10);\n", s:"(-?\\d+)"}}})
}());
Ext.apply(Date.prototype, {dateFormat:function (a) {
    if (Date.formatFunctions[a] == null) {
        Date.createFormat(a)
    }
    return Date.formatFunctions[a].call(this)
}, getTimezone:function () {
    return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "")
}, getGMTOffset:function (a) {
    return(this.getTimezoneOffset() > 0 ? "-" : "+") + String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0") + (a ? ":" : "") + String.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2, "0")
}, getDayOfYear:function () {
    var b = 0, e = this.clone(), a = this.getMonth(), c;
    for (c = 0, e.setDate(1), e.setMonth(0); c < a; e.setMonth(++c)) {
        b += e.getDaysInMonth()
    }
    return b + this.getDate() - 1
}, getWeekOfYear:function () {
    var a = 86400000, b = 7 * a;
    return function () {
        var d = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / a, c = Math.floor(d / 7), e = new Date(c * b).getUTCFullYear();
        return c - Math.floor(Date.UTC(e, 0, 7) / b) + 1
    }
}(), isLeapYear:function () {
    var a = this.getFullYear();
    return !!((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)))
}, getFirstDayOfMonth:function () {
    var a = (this.getDay() - (this.getDate() - 1)) % 7;
    return(a < 0) ? (a + 7) : a
}, getLastDayOfMonth:function () {
    return this.getLastDateOfMonth().getDay()
}, getFirstDateOfMonth:function () {
    return new Date(this.getFullYear(), this.getMonth(), 1)
}, getLastDateOfMonth:function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth())
}, getDaysInMonth:function () {
    var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return function () {
        var b = this.getMonth();
        return b == 1 && this.isLeapYear() ? 29 : a[b]
    }
}(), getSuffix:function () {
    switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return"st";
        case 2:
        case 22:
            return"nd";
        case 3:
        case 23:
            return"rd";
        default:
            return"th"
    }
}, clone:function () {
    return new Date(this.getTime())
}, isDST:function () {
    return new Date(this.getFullYear(), 0, 1).getTimezoneOffset() != this.getTimezoneOffset()
}, clearTime:function (f) {
    if (f) {
        return this.clone().clearTime()
    }
    var b = this.getDate();
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    if (this.getDate() != b) {
        for (var a = 1, e = this.add(Date.HOUR, a); e.getDate() != b; a++, e = this.add(Date.HOUR, a)) {
        }
        this.setDate(b);
        this.setHours(e.getHours())
    }
    return this
}, add:function (b, c) {
    var e = this.clone();
    if (!b || c === 0) {
        return e
    }
    switch (b.toLowerCase()) {
        case Date.MILLI:
            e.setMilliseconds(this.getMilliseconds() + c);
            break;
        case Date.SECOND:
            e.setSeconds(this.getSeconds() + c);
            break;
        case Date.MINUTE:
            e.setMinutes(this.getMinutes() + c);
            break;
        case Date.HOUR:
            e.setHours(this.getHours() + c);
            break;
        case Date.DAY:
            e.setDate(this.getDate() + c);
            break;
        case Date.MONTH:
            var a = this.getDate();
            if (a > 28) {
                a = Math.min(a, this.getFirstDateOfMonth().add("mo", c).getLastDateOfMonth().getDate())
            }
            e.setDate(a);
            e.setMonth(this.getMonth() + c);
            break;
        case Date.YEAR:
            e.setFullYear(this.getFullYear() + c);
            break
    }
    return e
}, between:function (c, a) {
    var b = this.getTime();
    return c.getTime() <= b && b <= a.getTime()
}});
Date.prototype.format = Date.prototype.dateFormat;
if (Ext.isSafari && (navigator.userAgent.match(/WebKit\/(\d+)/)[1] || NaN) < 420) {
    Ext.apply(Date.prototype, {_xMonth:Date.prototype.setMonth, _xDate:Date.prototype.setDate, setMonth:function (a) {
        if (a <= -1) {
            var d = Math.ceil(-a), c = Math.ceil(d / 12), b = (d % 12) ? 12 - d % 12 : 0;
            this.setFullYear(this.getFullYear() - c);
            return this._xMonth(b)
        } else {
            return this._xMonth(a)
        }
    }, setDate:function (a) {
        return this.setTime(this.getTime() - (this.getDate() - a) * 86400000)
    }})
}
Ext.util.MixedCollection = function (b, a) {
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents("clear", "add", "replace", "remove", "sort");
    this.allowFunctions = b === true;
    if (a) {
        this.getKey = a
    }
    Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection, Ext.util.Observable, {allowFunctions:false, add:function (b, c) {
    if (arguments.length == 1) {
        c = arguments[0];
        b = this.getKey(c)
    }
    if (typeof b != "undefined" && b !== null) {
        var a = this.map[b];
        if (typeof a != "undefined") {
            return this.replace(b, c)
        }
        this.map[b] = c
    }
    this.length++;
    this.items.push(c);
    this.keys.push(b);
    this.fireEvent("add", this.length - 1, c, b);
    return c
}, getKey:function (a) {
    return a.id
}, replace:function (c, d) {
    if (arguments.length == 1) {
        d = arguments[0];
        c = this.getKey(d)
    }
    var a = this.map[c];
    if (typeof c == "undefined" || c === null || typeof a == "undefined") {
        return this.add(c, d)
    }
    var b = this.indexOfKey(c);
    this.items[b] = d;
    this.map[c] = d;
    this.fireEvent("replace", c, a, d);
    return d
}, addAll:function (e) {
    if (arguments.length > 1 || Ext.isArray(e)) {
        var b = arguments.length > 1 ? arguments : e;
        for (var d = 0, a = b.length; d < a; d++) {
            this.add(b[d])
        }
    } else {
        for (var c in e) {
            if (this.allowFunctions || typeof e[c] != "function") {
                this.add(c, e[c])
            }
        }
    }
}, each:function (e, d) {
    var b = [].concat(this.items);
    for (var c = 0, a = b.length; c < a; c++) {
        if (e.call(d || b[c], b[c], c, a) === false) {
            break
        }
    }
}, eachKey:function (d, c) {
    for (var b = 0, a = this.keys.length; b < a; b++) {
        d.call(c || window, this.keys[b], this.items[b], b, a)
    }
}, find:function (d, c) {
    for (var b = 0, a = this.items.length; b < a; b++) {
        if (d.call(c || window, this.items[b], this.keys[b])) {
            return this.items[b]
        }
    }
    return null
}, insert:function (a, b, c) {
    if (arguments.length == 2) {
        c = arguments[1];
        b = this.getKey(c)
    }
    if (this.containsKey(b)) {
        this.suspendEvents();
        this.removeKey(b);
        this.resumeEvents()
    }
    if (a >= this.length) {
        return this.add(b, c)
    }
    this.length++;
    this.items.splice(a, 0, c);
    if (typeof b != "undefined" && b !== null) {
        this.map[b] = c
    }
    this.keys.splice(a, 0, b);
    this.fireEvent("add", a, c, b);
    return c
}, remove:function (a) {
    return this.removeAt(this.indexOf(a))
}, removeAt:function (a) {
    if (a < this.length && a >= 0) {
        this.length--;
        var c = this.items[a];
        this.items.splice(a, 1);
        var b = this.keys[a];
        if (typeof b != "undefined") {
            delete this.map[b]
        }
        this.keys.splice(a, 1);
        this.fireEvent("remove", c, b);
        return c
    }
    return false
}, removeKey:function (a) {
    return this.removeAt(this.indexOfKey(a))
}, getCount:function () {
    return this.length
}, indexOf:function (a) {
    return this.items.indexOf(a)
}, indexOfKey:function (a) {
    return this.keys.indexOf(a)
}, item:function (b) {
    var a = this.map[b], c = a !== undefined ? a : (typeof b == "number") ? this.items[b] : undefined;
    return typeof c != "function" || this.allowFunctions ? c : null
}, itemAt:function (a) {
    return this.items[a]
}, key:function (a) {
    return this.map[a]
}, contains:function (a) {
    return this.indexOf(a) != -1
}, containsKey:function (a) {
    return typeof this.map[a] != "undefined"
}, clear:function () {
    this.length = 0;
    this.items = [];
    this.keys = [];
    this.map = {};
    this.fireEvent("clear")
}, first:function () {
    return this.items[0]
}, last:function () {
    return this.items[this.length - 1]
}, _sort:function (j, a, h) {
    var d, e, b = String(a).toUpperCase() == "DESC" ? -1 : 1, g = [], k = this.keys, f = this.items;
    h = h || function (i, c) {
        return i - c
    };
    for (d = 0, e = f.length; d < e; d++) {
        g[g.length] = {key:k[d], value:f[d], index:d}
    }
    g.sort(function (i, c) {
        var l = h(i[j], c[j]) * b;
        if (l === 0) {
            l = (i.index < c.index ? -1 : 1)
        }
        return l
    });
    for (d = 0, e = g.length; d < e; d++) {
        f[d] = g[d].value;
        k[d] = g[d].key
    }
    this.fireEvent("sort", this)
}, sort:function (a, b) {
    this._sort("value", a, b)
}, reorder:function (d) {
    this.suspendEvents();
    var b = this.items, c = 0, f = b.length, a = [], e = [], g;
    for (g in d) {
        a[d[g]] = b[g]
    }
    for (c = 0; c < f; c++) {
        if (d[c] == undefined) {
            e.push(b[c])
        }
    }
    for (c = 0; c < f; c++) {
        if (a[c] == undefined) {
            a[c] = e.shift()
        }
    }
    this.clear();
    this.addAll(a);
    this.resumeEvents();
    this.fireEvent("sort", this)
}, keySort:function (a, b) {
    this._sort("key", a, b || function (d, c) {
        var f = String(d).toUpperCase(), e = String(c).toUpperCase();
        return f > e ? 1 : (f < e ? -1 : 0)
    })
}, getRange:function (e, a) {
    var b = this.items;
    if (b.length < 1) {
        return[]
    }
    e = e || 0;
    a = Math.min(typeof a == "undefined" ? this.length - 1 : a, this.length - 1);
    var c, d = [];
    if (e <= a) {
        for (c = e; c <= a; c++) {
            d[d.length] = b[c]
        }
    } else {
        for (c = e; c >= a; c--) {
            d[d.length] = b[c]
        }
    }
    return d
}, filter:function (c, b, d, a) {
    if (Ext.isEmpty(b, false)) {
        return this.clone()
    }
    b = this.createValueMatcher(b, d, a);
    return this.filterBy(function (e) {
        return e && b.test(e[c])
    })
}, filterBy:function (f, e) {
    var g = new Ext.util.MixedCollection();
    g.getKey = this.getKey;
    var b = this.keys, d = this.items;
    for (var c = 0, a = d.length; c < a; c++) {
        if (f.call(e || this, d[c], b[c])) {
            g.add(b[c], d[c])
        }
    }
    return g
}, findIndex:function (c, b, e, d, a) {
    if (Ext.isEmpty(b, false)) {
        return -1
    }
    b = this.createValueMatcher(b, d, a);
    return this.findIndexBy(function (f) {
        return f && b.test(f[c])
    }, null, e)
}, findIndexBy:function (f, e, g) {
    var b = this.keys, d = this.items;
    for (var c = (g || 0), a = d.length; c < a; c++) {
        if (f.call(e || this, d[c], b[c])) {
            return c
        }
    }
    return -1
}, createValueMatcher:function (c, e, a, b) {
    if (!c.exec) {
        var d = Ext.escapeRe;
        c = String(c);
        if (e === true) {
            c = d(c)
        } else {
            c = "^" + d(c);
            if (b === true) {
                c += "$"
            }
        }
        c = new RegExp(c, a ? "" : "i")
    }
    return c
}, clone:function () {
    var e = new Ext.util.MixedCollection();
    var b = this.keys, d = this.items;
    for (var c = 0, a = d.length; c < a; c++) {
        e.add(b[c], d[c])
    }
    e.getKey = this.getKey;
    return e
}});
Ext.util.MixedCollection.prototype.get = Ext.util.MixedCollection.prototype.item;
Ext.AbstractManager = Ext.extend(Object, {typeName:"type", constructor:function (a) {
    Ext.apply(this, a || {});
    this.all = new Ext.util.MixedCollection();
    this.types = {}
}, get:function (a) {
    return this.all.get(a)
}, register:function (a) {
    this.all.add(a)
}, unregister:function (a) {
    this.all.remove(a)
}, registerType:function (b, a) {
    this.types[b] = a;
    a[this.typeName] = b
}, isRegistered:function (a) {
    return this.types[a] !== undefined
}, create:function (a, d) {
    var b = a[this.typeName] || a.type || d, c = this.types[b];
    if (c == undefined) {
        throw new Error(String.format("The '{0}' type has not been registered with this manager", b))
    }
    return new c(a)
}, onAvailable:function (d, c, b) {
    var a = this.all;
    a.on("add", function (e, f) {
        if (f.id == d) {
            c.call(b || f, f);
            a.un("add", c, b)
        }
    })
}});
Ext.util.Format = function () {
    var trimRe = /^\s+|\s+$/g, stripTagsRE = /<\/?[^>]+>/gi, stripScriptsRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, nl2brRe = /\r?\n/g;
    return{ellipsis:function (value, len, word) {
        if (value && value.length > len) {
            if (word) {
                var vs = value.substr(0, len - 2), index = Math.max(vs.lastIndexOf(" "), vs.lastIndexOf("."), vs.lastIndexOf("!"), vs.lastIndexOf("?"));
                if (index == -1 || index < (len - 15)) {
                    return value.substr(0, len - 3) + "..."
                } else {
                    return vs.substr(0, index) + "..."
                }
            } else {
                return value.substr(0, len - 3) + "..."
            }
        }
        return value
    }, undef:function (value) {
        return value !== undefined ? value : ""
    }, defaultValue:function (value, defaultValue) {
        return value !== undefined && value !== "" ? value : defaultValue
    }, htmlEncode:function (value) {
        return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
    }, htmlDecode:function (value) {
        return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    }, trim:function (value) {
        return String(value).replace(trimRe, "")
    }, substr:function (value, start, length) {
        return String(value).substr(start, length)
    }, lowercase:function (value) {
        return String(value).toLowerCase()
    }, uppercase:function (value) {
        return String(value).toUpperCase()
    }, capitalize:function (value) {
        return !value ? value : value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
    }, call:function (value, fn) {
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            args.unshift(value);
            return eval(fn).apply(window, args)
        } else {
            return eval(fn).call(window, value)
        }
    }, usMoney:function (v) {
        v = (Math.round((v - 0) * 100)) / 100;
        v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
        v = String(v);
        var ps = v.split("."), whole = ps[0], sub = ps[1] ? "." + ps[1] : ".00", r = /(\d+)(\d{3})/;
        while (r.test(whole)) {
            whole = whole.replace(r, "$1,$2")
        }
        v = whole + sub;
        if (v.charAt(0) == "-") {
            return"-$" + v.substr(1)
        }
        return"$" + v
    }, date:function (v, format) {
        if (!v) {
            return""
        }
        if (!Ext.isDate(v)) {
            v = new Date(Date.parse(v))
        }
        return v.dateFormat(format || "m/d/Y")
    }, dateRenderer:function (format) {
        return function (v) {
            return Ext.util.Format.date(v, format)
        }
    }, stripTags:function (v) {
        return !v ? v : String(v).replace(stripTagsRE, "")
    }, stripScripts:function (v) {
        return !v ? v : String(v).replace(stripScriptsRe, "")
    }, fileSize:function (size) {
        if (size < 1024) {
            return size + " bytes"
        } else {
            if (size < 1048576) {
                return(Math.round(((size * 10) / 1024)) / 10) + " KB"
            } else {
                return(Math.round(((size * 10) / 1048576)) / 10) + " MB"
            }
        }
    }, math:function () {
        var fns = {};
        return function (v, a) {
            if (!fns[a]) {
                fns[a] = new Function("v", "return v " + a + ";")
            }
            return fns[a](v)
        }
    }(), round:function (value, precision) {
        var result = Number(value);
        if (typeof precision == "number") {
            precision = Math.pow(10, precision);
            result = Math.round(value * precision) / precision
        }
        return result
    }, number:function (v, format) {
        if (!format) {
            return v
        }
        v = Ext.num(v, NaN);
        if (isNaN(v)) {
            return""
        }
        var comma = ",", dec = ".", i18n = false, neg = v < 0;
        v = Math.abs(v);
        if (format.substr(format.length - 2) == "/i") {
            format = format.substr(0, format.length - 2);
            i18n = true;
            comma = ".";
            dec = ","
        }
        var hasComma = format.indexOf(comma) != -1, psplit = (i18n ? format.replace(/[^\d\,]/g, "") : format.replace(/[^\d\.]/g, "")).split(dec);
        if (1 < psplit.length) {
            v = v.toFixed(psplit[1].length)
        } else {
            if (2 < psplit.length) {
                throw ("NumberFormatException: invalid format, formats should have no more than 1 period: " + format)
            } else {
                v = v.toFixed(0)
            }
        }
        var fnum = v.toString();
        psplit = fnum.split(".");
        if (hasComma) {
            var cnum = psplit[0], parr = [], j = cnum.length, m = Math.floor(j / 3), n = cnum.length % 3 || 3, i;
            for (i = 0; i < j; i += n) {
                if (i != 0) {
                    n = 3
                }
                parr[parr.length] = cnum.substr(i, n);
                m -= 1
            }
            fnum = parr.join(comma);
            if (psplit[1]) {
                fnum += dec + psplit[1]
            }
        } else {
            if (psplit[1]) {
                fnum = psplit[0] + dec + psplit[1]
            }
        }
        return(neg ? "-" : "") + format.replace(/[\d,?\.?]+/, fnum)
    }, numberRenderer:function (format) {
        return function (v) {
            return Ext.util.Format.number(v, format)
        }
    }, plural:function (v, s, p) {
        return v + " " + (v == 1 ? s : (p ? p : s + "s"))
    }, nl2br:function (v) {
        return Ext.isEmpty(v) ? "" : v.replace(nl2brRe, "<br/>")
    }}
}();
Ext.XTemplate = function () {
    Ext.XTemplate.superclass.constructor.apply(this, arguments);
    var x = this, h = x.html, p = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/, d = /^<tpl\b[^>]*?for="(.*?)"/, u = /^<tpl\b[^>]*?if="(.*?)"/, w = /^<tpl\b[^>]*?exec="(.*?)"/, q, o = 0, j = [], n = "values", v = "parent", k = "xindex", l = "xcount", e = "return ", c = "with(values){ ";
    h = ["<tpl>", h, "</tpl>"].join("");
    while ((q = h.match(p))) {
        var b = q[0].match(d), a = q[0].match(u), z = q[0].match(w), f = null, g = null, r = null, y = b && b[1] ? b[1] : "";
        if (a) {
            f = a && a[1] ? a[1] : null;
            if (f) {
                g = new Function(n, v, k, l, c + e + (Ext.util.Format.htmlDecode(f)) + "; }")
            }
        }
        if (z) {
            f = z && z[1] ? z[1] : null;
            if (f) {
                r = new Function(n, v, k, l, c + (Ext.util.Format.htmlDecode(f)) + "; }")
            }
        }
        if (y) {
            switch (y) {
                case".":
                    y = new Function(n, v, c + e + n + "; }");
                    break;
                case"..":
                    y = new Function(n, v, c + e + v + "; }");
                    break;
                default:
                    y = new Function(n, v, c + e + y + "; }")
            }
        }
        j.push({id:o, target:y, exec:r, test:g, body:q[1] || ""});
        h = h.replace(q[0], "{xtpl" + o + "}");
        ++o
    }
    for (var t = j.length - 1; t >= 0; --t) {
        x.compileTpl(j[t])
    }
    x.master = j[j.length - 1];
    x.tpls = j
};
Ext.extend(Ext.XTemplate, Ext.Template, {re:/\{([\w\-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g, codeRe:/\{\[((?:\\\]|.|\n)*?)\]\}/g, applySubTemplate:function (a, j, h, d, c) {
    var g = this, f, l = g.tpls[a], k, b = [];
    if ((l.test && !l.test.call(g, j, h, d, c)) || (l.exec && l.exec.call(g, j, h, d, c))) {
        return""
    }
    k = l.target ? l.target.call(g, j, h) : j;
    f = k.length;
    h = l.target ? j : h;
    if (l.target && Ext.isArray(k)) {
        for (var e = 0, f = k.length; e < f; e++) {
            b[b.length] = l.compiled.call(g, k[e], h, e + 1, f)
        }
        return b.join("")
    }
    return l.compiled.call(g, k, h, d, c)
}, compileTpl:function (tpl) {
    var fm = Ext.util.Format, useF = this.disableFormats !== true, sep = Ext.isGecko ? "+" : ",", body;

    function fn(m, name, format, args, math) {
        if (name.substr(0, 4) == "xtpl") {
            return"'" + sep + "this.applySubTemplate(" + name.substr(4) + ", values, parent, xindex, xcount)" + sep + "'"
        }
        var v;
        if (name === ".") {
            v = "values"
        } else {
            if (name === "#") {
                v = "xindex"
            } else {
                if (name.indexOf(".") != -1) {
                    v = name
                } else {
                    v = "values['" + name + "']"
                }
            }
        }
        if (math) {
            v = "(" + v + math + ")"
        }
        if (format && useF) {
            args = args ? "," + args : "";
            if (format.substr(0, 5) != "this.") {
                format = "fm." + format + "("
            } else {
                format = 'this.call("' + format.substr(5) + '", ';
                args = ", values"
            }
        } else {
            args = "";
            format = "(" + v + " === undefined ? '' : "
        }
        return"'" + sep + format + v + args + ")" + sep + "'"
    }

    function codeFn(m, code) {
        return"'" + sep + "(" + code.replace(/\\'/g, "'") + ")" + sep + "'"
    }

    if (Ext.isGecko) {
        body = "tpl.compiled = function(values, parent, xindex, xcount){ return '" + tpl.body.replace(/(\r\n|\n)/g, "\\n").replace(/'/g, "\\'").replace(this.re, fn).replace(this.codeRe, codeFn) + "';};"
    } else {
        body = ["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
        body.push(tpl.body.replace(/(\r\n|\n)/g, "\\n").replace(/'/g, "\\'").replace(this.re, fn).replace(this.codeRe, codeFn));
        body.push("'].join('');};");
        body = body.join("")
    }
    eval(body);
    return this
}, applyTemplate:function (a) {
    return this.master.compiled.call(this, a, {}, 1, 1)
}, compile:function () {
    return this
}});
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from = function (a) {
    a = Ext.getDom(a);
    return new Ext.XTemplate(a.value || a.innerHTML)
};
Ext.util.CSS = function () {
    var d = null;
    var c = document;
    var b = /(-[a-z])/gi;
    var a = function (e, f) {
        return f.charAt(1).toUpperCase()
    };
    return{createStyleSheet:function (h, k) {
        var g;
        var f = c.getElementsByTagName("head")[0];
        var j = c.createElement("style");
        j.setAttribute("type", "text/css");
        if (k) {
            j.setAttribute("id", k)
        }
        if (Ext.isIE) {
            f.appendChild(j);
            g = j.styleSheet;
            g.cssText = h
        } else {
            try {
                j.appendChild(c.createTextNode(h))
            } catch (i) {
                j.cssText = h
            }
            f.appendChild(j);
            g = j.styleSheet ? j.styleSheet : (j.sheet || c.styleSheets[c.styleSheets.length - 1])
        }
        this.cacheStyleSheet(g);
        return g
    }, removeStyleSheet:function (f) {
        var e = c.getElementById(f);
        if (e) {
            e.parentNode.removeChild(e)
        }
    }, swapStyleSheet:function (g, e) {
        this.removeStyleSheet(g);
        var f = c.createElement("link");
        f.setAttribute("rel", "stylesheet");
        f.setAttribute("type", "text/css");
        f.setAttribute("id", g);
        f.setAttribute("href", e);
        c.getElementsByTagName("head")[0].appendChild(f)
    }, refreshCache:function () {
        return this.getRules(true)
    }, cacheStyleSheet:function (g) {
        if (!d) {
            d = {}
        }
        try {
            var i = g.cssRules || g.rules;
            for (var f = i.length - 1; f >= 0; --f) {
                d[i[f].selectorText.toLowerCase()] = i[f]
            }
        } catch (h) {
        }
    }, getRules:function (g) {
        if (d === null || g) {
            d = {};
            var j = c.styleSheets;
            for (var h = 0, f = j.length; h < f; h++) {
                try {
                    this.cacheStyleSheet(j[h])
                } catch (k) {
                }
            }
        }
        return d
    }, getRule:function (e, g) {
        var f = this.getRules(g);
        if (!Ext.isArray(e)) {
            return f[e.toLowerCase()]
        }
        for (var h = 0; h < e.length; h++) {
            if (f[e[h]]) {
                return f[e[h].toLowerCase()]
            }
        }
        return null
    }, updateRule:function (e, h, g) {
        if (!Ext.isArray(e)) {
            var j = this.getRule(e);
            if (j) {
                j.style[h.replace(b, a)] = g;
                return true
            }
        } else {
            for (var f = 0; f < e.length; f++) {
                if (this.updateRule(e[f], h, g)) {
                    return true
                }
            }
        }
        return false
    }}
}();
Ext.util.ClickRepeater = Ext.extend(Ext.util.Observable, {constructor:function (b, a) {
    this.el = Ext.get(b);
    this.el.unselectable();
    Ext.apply(this, a);
    this.addEvents("mousedown", "click", "mouseup");
    if (!this.disabled) {
        this.disabled = true;
        this.enable()
    }
    if (this.handler) {
        this.on("click", this.handler, this.scope || this)
    }
    Ext.util.ClickRepeater.superclass.constructor.call(this)
}, interval:20, delay:250, preventDefault:true, stopDefault:false, timer:0, enable:function () {
    if (this.disabled) {
        this.el.on("mousedown", this.handleMouseDown, this);
        if (Ext.isIE) {
            this.el.on("dblclick", this.handleDblClick, this)
        }
        if (this.preventDefault || this.stopDefault) {
            this.el.on("click", this.eventOptions, this)
        }
    }
    this.disabled = false
}, disable:function (a) {
    if (a || !this.disabled) {
        clearTimeout(this.timer);
        if (this.pressClass) {
            this.el.removeClass(this.pressClass)
        }
        Ext.getDoc().un("mouseup", this.handleMouseUp, this);
        this.el.removeAllListeners()
    }
    this.disabled = true
}, setDisabled:function (a) {
    this[a ? "disable" : "enable"]()
}, eventOptions:function (a) {
    if (this.preventDefault) {
        a.preventDefault()
    }
    if (this.stopDefault) {
        a.stopEvent()
    }
}, destroy:function () {
    this.disable(true);
    Ext.destroy(this.el);
    this.purgeListeners()
}, handleDblClick:function (a) {
    clearTimeout(this.timer);
    this.el.blur();
    this.fireEvent("mousedown", this, a);
    this.fireEvent("click", this, a)
}, handleMouseDown:function (a) {
    clearTimeout(this.timer);
    this.el.blur();
    if (this.pressClass) {
        this.el.addClass(this.pressClass)
    }
    this.mousedownTime = new Date();
    Ext.getDoc().on("mouseup", this.handleMouseUp, this);
    this.el.on("mouseout", this.handleMouseOut, this);
    this.fireEvent("mousedown", this, a);
    this.fireEvent("click", this, a);
    if (this.accelerate) {
        this.delay = 400
    }
    this.timer = this.click.defer(this.delay || this.interval, this, [a])
}, click:function (a) {
    this.fireEvent("click", this, a);
    this.timer = this.click.defer(this.accelerate ? this.easeOutExpo(this.mousedownTime.getElapsed(), 400, -390, 12000) : this.interval, this, [a])
}, easeOutExpo:function (e, a, g, f) {
    return(e == f) ? a + g : g * (-Math.pow(2, -10 * e / f) + 1) + a
}, handleMouseOut:function () {
    clearTimeout(this.timer);
    if (this.pressClass) {
        this.el.removeClass(this.pressClass)
    }
    this.el.on("mouseover", this.handleMouseReturn, this)
}, handleMouseReturn:function () {
    this.el.un("mouseover", this.handleMouseReturn, this);
    if (this.pressClass) {
        this.el.addClass(this.pressClass)
    }
    this.click()
}, handleMouseUp:function (a) {
    clearTimeout(this.timer);
    this.el.un("mouseover", this.handleMouseReturn, this);
    this.el.un("mouseout", this.handleMouseOut, this);
    Ext.getDoc().un("mouseup", this.handleMouseUp, this);
    this.el.removeClass(this.pressClass);
    this.fireEvent("mouseup", this, a)
}});
Ext.KeyNav = function (b, a) {
    this.el = Ext.get(b);
    Ext.apply(this, a);
    if (!this.disabled) {
        this.disabled = true;
        this.enable()
    }
};
Ext.KeyNav.prototype = {disabled:false, defaultEventAction:"stopEvent", forceKeyDown:false, relay:function (c) {
    var a = c.getKey(), b = this.keyToHandler[a];
    if (b && this[b]) {
        if (this.doRelay(c, this[b], b) !== true) {
            c[this.defaultEventAction]()
        }
    }
}, doRelay:function (c, b, a) {
    return b.call(this.scope || this, c, a)
}, enter:false, left:false, right:false, up:false, down:false, tab:false, esc:false, pageUp:false, pageDown:false, del:false, home:false, end:false, space:false, keyToHandler:{37:"left", 39:"right", 38:"up", 40:"down", 33:"pageUp", 34:"pageDown", 46:"del", 36:"home", 35:"end", 13:"enter", 27:"esc", 9:"tab", 32:"space"}, stopKeyUp:function (b) {
    var a = b.getKey();
    if (a >= 37 && a <= 40) {
        b.stopEvent()
    }
}, destroy:function () {
    this.disable()
}, enable:function () {
    if (this.disabled) {
        if (Ext.isSafari2) {
            this.el.on("keyup", this.stopKeyUp, this)
        }
        this.el.on(this.isKeydown() ? "keydown" : "keypress", this.relay, this);
        this.disabled = false
    }
}, disable:function () {
    if (!this.disabled) {
        if (Ext.isSafari2) {
            this.el.un("keyup", this.stopKeyUp, this)
        }
        this.el.un(this.isKeydown() ? "keydown" : "keypress", this.relay, this);
        this.disabled = true
    }
}, setDisabled:function (a) {
    this[a ? "disable" : "enable"]()
}, isKeydown:function () {
    return this.forceKeyDown || Ext.EventManager.useKeydown
}};
Ext.KeyMap = function (c, b, a) {
    this.el = Ext.get(c);
    this.eventName = a || "keydown";
    this.bindings = [];
    if (b) {
        this.addBinding(b)
    }
    this.enable()
};
Ext.KeyMap.prototype = {stopEvent:false, addBinding:function (b) {
    if (Ext.isArray(b)) {
        Ext.each(b, function (j) {
            this.addBinding(j)
        }, this);
        return
    }
    var i = b.key, f = b.fn || b.handler, k = b.scope;
    if (b.stopEvent) {
        this.stopEvent = b.stopEvent
    }
    if (typeof i == "string") {
        var g = [];
        var e = i.toUpperCase();
        for (var c = 0, d = e.length; c < d; c++) {
            g.push(e.charCodeAt(c))
        }
        i = g
    }
    var a = Ext.isArray(i);
    var h = function (n) {
        if (this.checkModifiers(b, n)) {
            var l = n.getKey();
            if (a) {
                for (var m = 0, j = i.length; m < j; m++) {
                    if (i[m] == l) {
                        if (this.stopEvent) {
                            n.stopEvent()
                        }
                        f.call(k || window, l, n);
                        return
                    }
                }
            } else {
                if (l == i) {
                    if (this.stopEvent) {
                        n.stopEvent()
                    }
                    f.call(k || window, l, n)
                }
            }
        }
    };
    this.bindings.push(h)
}, checkModifiers:function (b, g) {
    var h, d, f = ["shift", "ctrl", "alt"];
    for (var c = 0, a = f.length; c < a; ++c) {
        d = f[c];
        h = b[d];
        if (!(h === undefined || (h === g[d + "Key"]))) {
            return false
        }
    }
    return true
}, on:function (b, d, c) {
    var g, a, e, f;
    if (typeof b == "object" && !Ext.isArray(b)) {
        g = b.key;
        a = b.shift;
        e = b.ctrl;
        f = b.alt
    } else {
        g = b
    }
    this.addBinding({key:g, shift:a, ctrl:e, alt:f, fn:d, scope:c})
}, handleKeyDown:function (f) {
    if (this.enabled) {
        var c = this.bindings;
        for (var d = 0, a = c.length; d < a; d++) {
            c[d].call(this, f)
        }
    }
}, isEnabled:function () {
    return this.enabled
}, enable:function () {
    if (!this.enabled) {
        this.el.on(this.eventName, this.handleKeyDown, this);
        this.enabled = true
    }
}, disable:function () {
    if (this.enabled) {
        this.el.removeListener(this.eventName, this.handleKeyDown, this);
        this.enabled = false
    }
}, setDisabled:function (a) {
    this[a ? "disable" : "enable"]()
}};
Ext.util.TextMetrics = function () {
    var a;
    return{measure:function (b, c, d) {
        if (!a) {
            a = Ext.util.TextMetrics.Instance(b, d)
        }
        a.bind(b);
        a.setFixedWidth(d || "auto");
        return a.getSize(c)
    }, createInstance:function (b, c) {
        return Ext.util.TextMetrics.Instance(b, c)
    }}
}();
Ext.util.TextMetrics.Instance = function (b, d) {
    var c = new Ext.Element(document.createElement("div"));
    document.body.appendChild(c.dom);
    c.position("absolute");
    c.setLeftTop(-1000, -1000);
    c.hide();
    if (d) {
        c.setWidth(d)
    }
    var a = {getSize:function (f) {
        c.update(f);
        var e = c.getSize();
        c.update("");
        return e
    }, bind:function (e) {
        c.setStyle(Ext.fly(e).getStyles("font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"))
    }, setFixedWidth:function (e) {
        c.setWidth(e)
    }, getWidth:function (e) {
        c.dom.style.width = "auto";
        return this.getSize(e).width
    }, getHeight:function (e) {
        return this.getSize(e).height
    }};
    a.bind(b);
    return a
};
Ext.Element.addMethods({getTextWidth:function (c, b, a) {
    return(Ext.util.TextMetrics.measure(this.dom, Ext.value(c, this.dom.innerHTML, true)).width).constrain(b || 0, a || 1000000)
}});
Ext.util.Cookies = {set:function (c, e) {
    var a = arguments;
    var h = arguments.length;
    var b = (h > 2) ? a[2] : null;
    var g = (h > 3) ? a[3] : "/";
    var d = (h > 4) ? a[4] : null;
    var f = (h > 5) ? a[5] : false;
    document.cookie = c + "=" + escape(e) + ((b === null) ? "" : ("; expires=" + b.toGMTString())) + ((g === null) ? "" : ("; path=" + g)) + ((d === null) ? "" : ("; domain=" + d)) + ((f === true) ? "; secure" : "")
}, get:function (d) {
    var b = d + "=";
    var f = b.length;
    var a = document.cookie.length;
    var e = 0;
    var c = 0;
    while (e < a) {
        c = e + f;
        if (document.cookie.substring(e, c) == b) {
            return Ext.util.Cookies.getCookieVal(c)
        }
        e = document.cookie.indexOf(" ", e) + 1;
        if (e === 0) {
            break
        }
    }
    return null
}, clear:function (a) {
    if (Ext.util.Cookies.get(a)) {
        document.cookie = a + "=; expires=Thu, 01-Jan-70 00:00:01 GMT"
    }
}, getCookieVal:function (b) {
    var a = document.cookie.indexOf(";", b);
    if (a == -1) {
        a = document.cookie.length
    }
    return unescape(document.cookie.substring(b, a))
}};
Ext.handleError = function (a) {
    throw a
};
Ext.Error = function (a) {
    this.message = (this.lang[a]) ? this.lang[a] : a
};
Ext.Error.prototype = new Error();
Ext.apply(Ext.Error.prototype, {lang:{}, name:"Ext.Error", getName:function () {
    return this.name
}, getMessage:function () {
    return this.message
}, toJson:function () {
    return Ext.encode(this)
}});