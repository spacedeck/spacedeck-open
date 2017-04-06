!function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = "length" in e && e.length, n = Z.type(e);
        return "function" !== n && !Z.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e));
    }
    function r(e, t, n) {
        if (Z.isFunction(t)) return Z.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n;
        });
        if (t.nodeType) return Z.grep(e, function(e) {
            return e === t !== n;
        });
        if ("string" == typeof t) {
            if (ae.test(t)) return Z.filter(t, e, n);
            t = Z.filter(t, e);
        }
        return Z.grep(e, function(e) {
            return U.call(t, e) >= 0 !== n;
        });
    }
    function i(e, t) {
        for (;(e = e[t]) && 1 !== e.nodeType; ) ;
        return e;
    }
    function o(e) {
        var t = he[e] = {};
        return Z.each(e.match(de) || [], function(e, n) {
            t[n] = !0;
        }), t;
    }
    function s() {
        J.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1), 
        Z.ready();
    }
    function a() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = Z.expando + a.uid++;
    }
    function u(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(be, "-$1").toLowerCase(), 
        n = e.getAttribute(r), "string" == typeof n) {
            try {
                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : xe.test(n) ? Z.parseJSON(n) : n);
            } catch (i) {}
            ye.set(e, t, n);
        } else n = void 0;
        return n;
    }
    function l() {
        return !0;
    }
    function c() {
        return !1;
    }
    function f() {
        try {
            return J.activeElement;
        } catch (e) {}
    }
    function p(e, t) {
        return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function d(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
    }
    function h(e) {
        var t = Pe.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function g(e, t) {
        for (var n = 0, r = e.length; r > n; n++) ve.set(e[n], "globalEval", !t || ve.get(t[n], "globalEval"));
    }
    function m(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (ve.hasData(e) && (o = ve.access(e), s = ve.set(t, o), l = o.events)) {
                delete s.handle, s.events = {};
                for (i in l) for (n = 0, r = l[i].length; r > n; n++) Z.event.add(t, i, l[i][n]);
            }
            ye.hasData(e) && (a = ye.access(e), u = Z.extend({}, a), ye.set(t, u));
        }
    }
    function v(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && Z.nodeName(e, t) ? Z.merge([ e ], n) : n;
    }
    function y(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ne.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
    }
    function x(t, n) {
        var r, i = Z(n.createElement(t)).appendTo(n.body), o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : Z.css(i[0], "display");
        return i.detach(), o;
    }
    function b(e) {
        var t = J, n = $e[e];
        return n || (n = x(e, t), "none" !== n && n || (We = (We || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), 
        t = We[0].contentDocument, t.write(), t.close(), n = x(e, t), We.detach()), $e[e] = n), 
        n;
    }
    function w(e, t, n) {
        var r, i, o, s, a = e.style;
        return n = n || _e(e), n && (s = n.getPropertyValue(t) || n[t]), n && ("" !== s || Z.contains(e.ownerDocument, e) || (s = Z.style(e, t)), 
        Be.test(s) && Ie.test(t) && (r = a.width, i = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, 
        s = n.width, a.width = r, a.minWidth = i, a.maxWidth = o)), void 0 !== s ? s + "" : s;
    }
    function T(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments);
            }
        };
    }
    function C(e, t) {
        if (t in e) return t;
        for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Ge.length; i--; ) if (t = Ge[i] + n, 
        t in e) return t;
        return r;
    }
    function N(e, t, n) {
        var r = Xe.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
    }
    function k(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > o; o += 2) "margin" === n && (s += Z.css(e, n + Te[o], !0, i)), 
        r ? ("content" === n && (s -= Z.css(e, "padding" + Te[o], !0, i)), "margin" !== n && (s -= Z.css(e, "border" + Te[o] + "Width", !0, i))) : (s += Z.css(e, "padding" + Te[o], !0, i), 
        "padding" !== n && (s += Z.css(e, "border" + Te[o] + "Width", !0, i)));
        return s;
    }
    function E(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = _e(e), s = "border-box" === Z.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = w(e, t, o), (0 > i || null == i) && (i = e.style[t]), Be.test(i)) return i;
            r = s && (Q.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0;
        }
        return i + k(e, t, n || (s ? "border" : "content"), r, o) + "px";
    }
    function S(e, t) {
        for (var n, r, i, o = [], s = 0, a = e.length; a > s; s++) r = e[s], r.style && (o[s] = ve.get(r, "olddisplay"), 
        n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ce(r) && (o[s] = ve.access(r, "olddisplay", b(r.nodeName)))) : (i = Ce(r), 
        "none" === n && i || ve.set(r, "olddisplay", i ? n : Z.css(r, "display"))));
        for (s = 0; a > s; s++) r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e;
    }
    function D(e, t, n, r, i) {
        return new D.prototype.init(e, t, n, r, i);
    }
    function j() {
        return setTimeout(function() {
            Qe = void 0;
        }), Qe = Z.now();
    }
    function A(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Te[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i;
    }
    function L(e, t, n) {
        for (var r, i = (nt[t] || []).concat(nt["*"]), o = 0, s = i.length; s > o; o++) if (r = i[o].call(n, t, e)) return r;
    }
    function q(e, t, n) {
        var r, i, o, s, a, u, l, c, f = this, p = {}, d = e.style, h = e.nodeType && Ce(e), g = ve.get(e, "fxshow");
        n.queue || (a = Z._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, 
        a.empty.fire = function() {
            a.unqueued || u();
        }), a.unqueued++, f.always(function() {
            f.always(function() {
                a.unqueued--, Z.queue(e, "fx").length || a.empty.fire();
            });
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [ d.overflow, d.overflowX, d.overflowY ], 
        l = Z.css(e, "display"), c = "none" === l ? ve.get(e, "olddisplay") || b(e.nodeName) : l, 
        "inline" === c && "none" === Z.css(e, "float") && (d.display = "inline-block")), 
        n.overflow && (d.overflow = "hidden", f.always(function() {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2];
        }));
        for (r in t) if (i = t[r], Ke.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                if ("show" !== i || !g || void 0 === g[r]) continue;
                h = !0;
            }
            p[r] = g && g[r] || Z.style(e, r);
        } else l = void 0;
        if (Z.isEmptyObject(p)) "inline" === ("none" === l ? b(e.nodeName) : l) && (d.display = l); else {
            g ? "hidden" in g && (h = g.hidden) : g = ve.access(e, "fxshow", {}), o && (g.hidden = !h), 
            h ? Z(e).show() : f.done(function() {
                Z(e).hide();
            }), f.done(function() {
                var t;
                ve.remove(e, "fxshow");
                for (t in p) Z.style(e, t, p[t]);
            });
            for (r in p) s = L(h ? g[r] : 0, r, f), r in g || (g[r] = s.start, h && (s.end = s.start, 
            s.start = "width" === r || "height" === r ? 1 : 0));
        }
    }
    function H(e, t) {
        var n, r, i, o, s;
        for (n in e) if (r = Z.camelCase(n), i = t[r], o = e[n], Z.isArray(o) && (i = o[1], 
        o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = Z.cssHooks[r], s && "expand" in s) {
            o = s.expand(o), delete e[r];
            for (n in o) n in e || (e[n] = o[n], t[n] = i);
        } else t[r] = i;
    }
    function O(e, t, n) {
        var r, i, o = 0, s = tt.length, a = Z.Deferred().always(function() {
            delete u.elem;
        }), u = function() {
            if (i) return !1;
            for (var t = Qe || j(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, s = 0, u = l.tweens.length; u > s; s++) l.tweens[s].run(o);
            return a.notifyWith(e, [ l, o, n ]), 1 > o && u ? n : (a.resolveWith(e, [ l ]), 
            !1);
        }, l = a.promise({
            elem: e,
            props: Z.extend({}, t),
            opts: Z.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Qe || j(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = Z.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r), r;
            },
            stop: function(t) {
                var n = 0, r = t ? l.tweens.length : 0;
                if (i) return this;
                for (i = !0; r > n; n++) l.tweens[n].run(1);
                return t ? a.resolveWith(e, [ l, t ]) : a.rejectWith(e, [ l, t ]), this;
            }
        }), c = l.props;
        for (H(c, l.opts.specialEasing); s > o; o++) if (r = tt[o].call(l, e, c, l.opts)) return r;
        return Z.map(c, L, l), Z.isFunction(l.opts.start) && l.opts.start.call(e, l), Z.fx.timer(Z.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
    }
    function F(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(de) || [];
            if (Z.isFunction(n)) for (;r = o[i++]; ) "+" === r[0] ? (r = r.slice(1) || "*", 
            (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
        };
    }
    function P(e, t, n, r) {
        function i(a) {
            var u;
            return o[a] = !0, Z.each(e[a] || [], function(e, a) {
                var l = a(t, n, r);
                return "string" != typeof l || s || o[l] ? s ? !(u = l) : void 0 : (t.dataTypes.unshift(l), 
                i(l), !1);
            }), u;
        }
        var o = {}, s = e === xt;
        return i(t.dataTypes[0]) || !o["*"] && i("*");
    }
    function R(e, t) {
        var n, r, i = Z.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && Z.extend(!0, e, r), e;
    }
    function M(e, t, n) {
        for (var r, i, o, s, a = e.contents, u = e.dataTypes; "*" === u[0]; ) u.shift(), 
        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r) for (i in a) if (a[i] && a[i].test(r)) {
            u.unshift(i);
            break;
        }
        if (u[0] in n) o = u[0]; else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break;
                }
                s || (s = i);
            }
            o = o || s;
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0;
    }
    function W(e, t, n, r) {
        var i, o, s, a, u, l = {}, c = e.dataTypes.slice();
        if (c[1]) for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
        for (o = c.shift(); o; ) if (e.responseFields[o] && (n[e.responseFields[o]] = t), 
        !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) {
            if (s = l[u + " " + o] || l["* " + o], !s) for (i in l) if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                break;
            }
            if (s !== !0) if (s && e["throws"]) t = s(t); else try {
                t = s(t);
            } catch (f) {
                return {
                    state: "parsererror",
                    error: s ? f : "No conversion from " + u + " to " + o
                };
            }
        }
        return {
            state: "success",
            data: t
        };
    }
    function $(e, t, n, r) {
        var i;
        if (Z.isArray(t)) Z.each(t, function(t, i) {
            n || Nt.test(e) ? r(e, i) : $(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
        }); else if (n || "object" !== Z.type(t)) r(e, t); else for (i in t) $(e + "[" + i + "]", t[i], n, r);
    }
    function I(e) {
        return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    var B = [], _ = B.slice, z = B.concat, X = B.push, U = B.indexOf, V = {}, Y = V.toString, G = V.hasOwnProperty, Q = {}, J = e.document, K = "2.1.4", Z = function(e, t) {
        return new Z.fn.init(e, t);
    }, ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, te = /^-ms-/, ne = /-([\da-z])/gi, re = function(e, t) {
        return t.toUpperCase();
    };
    Z.fn = Z.prototype = {
        jquery: K,
        constructor: Z,
        selector: "",
        length: 0,
        toArray: function() {
            return _.call(this);
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : _.call(this);
        },
        pushStack: function(e) {
            var t = Z.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t;
        },
        each: function(e, t) {
            return Z.each(this, e, t);
        },
        map: function(e) {
            return this.pushStack(Z.map(this, function(t, n) {
                return e.call(t, n, t);
            }));
        },
        slice: function() {
            return this.pushStack(_.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [ this[n] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: X,
        sort: B.sort,
        splice: B.splice
    }, Z.extend = Z.fn.extend = function() {
        var e, t, n, r, i, o, s = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[a] || {}, a++), "object" == typeof s || Z.isFunction(s) || (s = {}), 
        a === u && (s = this, a--); u > a; a++) if (null != (e = arguments[a])) for (t in e) n = s[t], 
        r = e[t], s !== r && (l && r && (Z.isPlainObject(r) || (i = Z.isArray(r))) ? (i ? (i = !1, 
        o = n && Z.isArray(n) ? n : []) : o = n && Z.isPlainObject(n) ? n : {}, s[t] = Z.extend(l, o, r)) : void 0 !== r && (s[t] = r));
        return s;
    }, Z.extend({
        expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === Z.type(e);
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window;
        },
        isNumeric: function(e) {
            return !Z.isArray(e) && e - parseFloat(e) + 1 >= 0;
        },
        isPlainObject: function(e) {
            return "object" === Z.type(e) && !e.nodeType && !Z.isWindow(e) && !(e.constructor && !G.call(e.constructor.prototype, "isPrototypeOf"));
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? V[Y.call(e)] || "object" : typeof e;
        },
        globalEval: function(e) {
            var t, n = eval;
            e = Z.trim(e), e && (1 === e.indexOf("use strict") ? (t = J.createElement("script"), 
            t.text = e, J.head.appendChild(t).parentNode.removeChild(t)) : n(e));
        },
        camelCase: function(e) {
            return e.replace(te, "ms-").replace(ne, re);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t, r) {
            var i, o = 0, s = e.length, a = n(e);
            if (r) {
                if (a) for (;s > o && (i = t.apply(e[o], r), i !== !1); o++) ; else for (o in e) if (i = t.apply(e[o], r), 
                i === !1) break;
            } else if (a) for (;s > o && (i = t.call(e[o], o, e[o]), i !== !1); o++) ; else for (o in e) if (i = t.call(e[o], o, e[o]), 
            i === !1) break;
            return e;
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(ee, "");
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? Z.merge(r, "string" == typeof e ? [ e ] : e) : X.call(r, e)), 
            r;
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : U.call(t, e, n);
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
            return e.length = i, e;
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, s = e.length, a = !n; s > o; o++) r = !t(e[o], o), r !== a && i.push(e[o]);
            return i;
        },
        map: function(e, t, r) {
            var i, o = 0, s = e.length, a = n(e), u = [];
            if (a) for (;s > o; o++) i = t(e[o], o, r), null != i && u.push(i); else for (o in e) i = t(e[o], o, r), 
            null != i && u.push(i);
            return z.apply([], u);
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), Z.isFunction(e) ? (r = _.call(arguments, 2), 
            i = function() {
                return e.apply(t || this, r.concat(_.call(arguments)));
            }, i.guid = e.guid = e.guid || Z.guid++, i) : void 0;
        },
        now: Date.now,
        support: Q
    }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        V["[object " + t + "]"] = t.toLowerCase();
    });
    var ie = function(e) {
        function t(e, t, n, r) {
            var i, o, s, a, u, l, f, d, h, g;
            if ((t ? t.ownerDocument || t : $) !== q && L(t), t = t || q, n = n || [], a = t.nodeType, 
            "string" != typeof e || !e || 1 !== a && 9 !== a && 11 !== a) return n;
            if (!r && O) {
                if (11 !== a && (i = ye.exec(e))) if (s = i[1]) {
                    if (9 === a) {
                        if (o = t.getElementById(s), !o || !o.parentNode) return n;
                        if (o.id === s) return n.push(o), n;
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && M(t, o) && o.id === s) return n.push(o), 
                    n;
                } else {
                    if (i[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                    if ((s = i[3]) && w.getElementsByClassName) return K.apply(n, t.getElementsByClassName(s)), 
                    n;
                }
                if (w.qsa && (!F || !F.test(e))) {
                    if (d = f = W, h = t, g = 1 !== a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        for (l = k(e), (f = t.getAttribute("id")) ? d = f.replace(be, "\\$&") : t.setAttribute("id", d), 
                        d = "[id='" + d + "'] ", u = l.length; u--; ) l[u] = d + p(l[u]);
                        h = xe.test(e) && c(t.parentNode) || t, g = l.join(",");
                    }
                    if (g) try {
                        return K.apply(n, h.querySelectorAll(g)), n;
                    } catch (m) {} finally {
                        f || t.removeAttribute("id");
                    }
                }
            }
            return S(e.replace(ue, "$1"), t, n, r);
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r;
            }
            var t = [];
            return e;
        }
        function r(e) {
            return e[W] = !0, e;
        }
        function i(e) {
            var t = q.createElement("div");
            try {
                return !!e(t);
            } catch (n) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--; ) T.attrHandle[n[r]] = t;
        }
        function s(e, t) {
            var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (r) return r;
            if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function a(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e;
            };
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
            };
        }
        function l(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var i, o = e([], n.length, t), s = o.length; s--; ) n[i = o[s]] && (n[i] = !(r[i] = n[i]));
                });
            });
        }
        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e;
        }
        function f() {}
        function p(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r;
        }
        function d(e, t, n) {
            var r = t.dir, i = n && "parentNode" === r, o = B++;
            return t.first ? function(t, n, o) {
                for (;t = t[r]; ) if (1 === t.nodeType || i) return e(t, n, o);
            } : function(t, n, s) {
                var a, u, l = [ I, o ];
                if (s) {
                    for (;t = t[r]; ) if ((1 === t.nodeType || i) && e(t, n, s)) return !0;
                } else for (;t = t[r]; ) if (1 === t.nodeType || i) {
                    if (u = t[W] || (t[W] = {}), (a = u[r]) && a[0] === I && a[1] === o) return l[2] = a[2];
                    if (u[r] = l, l[2] = e(t, n, s)) return !0;
                }
            };
        }
        function h(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
                return !0;
            } : e[0];
        }
        function g(e, n, r) {
            for (var i = 0, o = n.length; o > i; i++) t(e, n[i], r);
            return r;
        }
        function m(e, t, n, r, i) {
            for (var o, s = [], a = 0, u = e.length, l = null != t; u > a; a++) (o = e[a]) && (!n || n(o, r, i)) && (s.push(o), 
            l && t.push(a));
            return s;
        }
        function v(e, t, n, i, o, s) {
            return i && !i[W] && (i = v(i)), o && !o[W] && (o = v(o, s)), r(function(r, s, a, u) {
                var l, c, f, p = [], d = [], h = s.length, v = r || g(t || "*", a.nodeType ? [ a ] : a, []), y = !e || !r && t ? v : m(v, p, e, a, u), x = n ? o || (r ? e : h || i) ? [] : s : y;
                if (n && n(y, x, a, u), i) for (l = m(x, d), i(l, [], a, u), c = l.length; c--; ) (f = l[c]) && (x[d[c]] = !(y[d[c]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [], c = x.length; c--; ) (f = x[c]) && l.push(y[c] = f);
                            o(null, x = [], l, u);
                        }
                        for (c = x.length; c--; ) (f = x[c]) && (l = o ? ee(r, f) : p[c]) > -1 && (r[l] = !(s[l] = f));
                    }
                } else x = m(x === s ? x.splice(h, x.length) : x), o ? o(null, s, x, u) : K.apply(s, x);
            });
        }
        function y(e) {
            for (var t, n, r, i = e.length, o = T.relative[e[0].type], s = o || T.relative[" "], a = o ? 1 : 0, u = d(function(e) {
                return e === t;
            }, s, !0), l = d(function(e) {
                return ee(t, e) > -1;
            }, s, !0), c = [ function(e, n, r) {
                var i = !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                return t = null, i;
            } ]; i > a; a++) if (n = T.relative[e[a].type]) c = [ d(h(c), n) ]; else {
                if (n = T.filter[e[a].type].apply(null, e[a].matches), n[W]) {
                    for (r = ++a; i > r && !T.relative[e[r].type]; r++) ;
                    return v(a > 1 && h(c), a > 1 && p(e.slice(0, a - 1).concat({
                        value: " " === e[a - 2].type ? "*" : ""
                    })).replace(ue, "$1"), n, r > a && y(e.slice(a, r)), i > r && y(e = e.slice(r)), i > r && p(e));
                }
                c.push(n);
            }
            return h(c);
        }
        function x(e, n) {
            var i = n.length > 0, o = e.length > 0, s = function(r, s, a, u, l) {
                var c, f, p, d = 0, h = "0", g = r && [], v = [], y = D, x = r || o && T.find.TAG("*", l), b = I += null == y ? 1 : Math.random() || .1, w = x.length;
                for (l && (D = s !== q && s); h !== w && null != (c = x[h]); h++) {
                    if (o && c) {
                        for (f = 0; p = e[f++]; ) if (p(c, s, a)) {
                            u.push(c);
                            break;
                        }
                        l && (I = b);
                    }
                    i && ((c = !p && c) && d--, r && g.push(c));
                }
                if (d += h, i && h !== d) {
                    for (f = 0; p = n[f++]; ) p(g, v, s, a);
                    if (r) {
                        if (d > 0) for (;h--; ) g[h] || v[h] || (v[h] = Q.call(u));
                        v = m(v);
                    }
                    K.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u);
                }
                return l && (I = b, D = y), g;
            };
            return i ? r(s) : s;
        }
        var b, w, T, C, N, k, E, S, D, j, A, L, q, H, O, F, P, R, M, W = "sizzle" + 1 * new Date(), $ = e.document, I = 0, B = 0, _ = n(), z = n(), X = n(), U = function(e, t) {
            return e === t && (A = !0), 0;
        }, V = 1 << 31, Y = {}.hasOwnProperty, G = [], Q = G.pop, J = G.push, K = G.push, Z = G.slice, ee = function(e, t) {
            for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return n;
            return -1;
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = re.replace("w", "w#"), oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", se = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)", ae = new RegExp(ne + "+", "g"), ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), le = new RegExp("^" + ne + "*," + ne + "*"), ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), fe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), pe = new RegExp(se), de = new RegExp("^" + ie + "$"), he = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + oe),
            PSEUDO: new RegExp("^" + se),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + te + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        }, ge = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xe = /[+~]/, be = /'|\\/g, we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), Te = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
        }, Ce = function() {
            L();
        };
        try {
            K.apply(G = Z.call($.childNodes), $.childNodes), G[$.childNodes.length].nodeType;
        } catch (Ne) {
            K = {
                apply: G.length ? function(e, t) {
                    J.apply(e, Z.call(t));
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; ) ;
                    e.length = n - 1;
                }
            };
        }
        w = t.support = {}, N = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName;
        }, L = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : $;
            return r !== q && 9 === r.nodeType && r.documentElement ? (q = r, H = r.documentElement, 
            n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)), 
            O = !N(r), w.attributes = i(function(e) {
                return e.className = "i", !e.getAttribute("className");
            }), w.getElementsByTagName = i(function(e) {
                return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length;
            }), w.getElementsByClassName = ve.test(r.getElementsByClassName), w.getById = i(function(e) {
                return H.appendChild(e).id = W, !r.getElementsByName || !r.getElementsByName(W).length;
            }), w.getById ? (T.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && O) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [ n ] : [];
                }
            }, T.filter.ID = function(e) {
                var t = e.replace(we, Te);
                return function(e) {
                    return e.getAttribute("id") === t;
                };
            }) : (delete T.find.ID, T.filter.ID = function(e) {
                var t = e.replace(we, Te);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t;
                };
            }), T.find.TAG = w.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0;
            } : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (;n = o[i++]; ) 1 === n.nodeType && r.push(n);
                    return r;
                }
                return o;
            }, T.find.CLASS = w.getElementsByClassName && function(e, t) {
                return O ? t.getElementsByClassName(e) : void 0;
            }, P = [], F = [], (w.qsa = ve.test(r.querySelectorAll)) && (i(function(e) {
                H.appendChild(e).innerHTML = "<a id='" + W + "'></a><select id='" + W + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                e.querySelectorAll("[msallowcapture^='']").length && F.push("[*^$]=" + ne + "*(?:''|\"\")"), 
                e.querySelectorAll("[selected]").length || F.push("\\[" + ne + "*(?:value|" + te + ")"), 
                e.querySelectorAll("[id~=" + W + "-]").length || F.push("~="), e.querySelectorAll(":checked").length || F.push(":checked"), 
                e.querySelectorAll("a#" + W + "+*").length || F.push(".#.+[+~]");
            }), i(function(e) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && F.push("name" + ne + "*[*^$|!~]?="), 
                e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
                F.push(",.*:");
            })), (w.matchesSelector = ve.test(R = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && i(function(e) {
                w.disconnectedMatch = R.call(e, "div"), R.call(e, "[s!='']:x"), P.push("!=", se);
            }), F = F.length && new RegExp(F.join("|")), P = P.length && new RegExp(P.join("|")), 
            t = ve.test(H.compareDocumentPosition), M = t || ve.test(H.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
            } : function(e, t) {
                if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                return !1;
            }, U = t ? function(e, t) {
                if (e === t) return A = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 
                1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === $ && M($, e) ? -1 : t === r || t.ownerDocument === $ && M($, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1);
            } : function(e, t) {
                if (e === t) return A = !0, 0;
                var n, i = 0, o = e.parentNode, a = t.parentNode, u = [ e ], l = [ t ];
                if (!o || !a) return e === r ? -1 : t === r ? 1 : o ? -1 : a ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                if (o === a) return s(e, t);
                for (n = e; n = n.parentNode; ) u.unshift(n);
                for (n = t; n = n.parentNode; ) l.unshift(n);
                for (;u[i] === l[i]; ) i++;
                return i ? s(u[i], l[i]) : u[i] === $ ? -1 : l[i] === $ ? 1 : 0;
            }, r) : q;
        }, t.matches = function(e, n) {
            return t(e, null, null, n);
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== q && L(e), n = n.replace(fe, "='$1']"), !(!w.matchesSelector || !O || P && P.test(n) || F && F.test(n))) try {
                var r = R.call(e, n);
                if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
            } catch (i) {}
            return t(n, q, null, [ e ]).length > 0;
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== q && L(e), M(e, t);
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== q && L(e);
            var n = T.attrHandle[t.toLowerCase()], r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
            return void 0 !== r ? r : w.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, t.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (A = !w.detectDuplicates, j = !w.sortStable && e.slice(0), e.sort(U), A) {
                for (;t = e[i++]; ) t === e[i] && (r = n.push(i));
                for (;r--; ) e.splice(n[r], 1);
            }
            return j = null, e;
        }, C = t.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e);
                } else if (3 === i || 4 === i) return e.nodeValue;
            } else for (;t = e[r++]; ) n += C(t);
            return n;
        }, T = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: he,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(we, Te), e[3] = (e[3] || e[4] || e[5] || "").replace(we, Te), 
                    "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), 
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), 
                    e;
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                    e[2] = n.slice(0, t)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, Te).toLowerCase();
                    return "*" === e ? function() {
                        return !0;
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = _[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && _(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"));
                    };
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode;
                    } : function(t, n, u) {
                        var l, c, f, p, d, h, g = o !== s ? "nextSibling" : "previousSibling", m = t.parentNode, v = a && t.nodeName.toLowerCase(), y = !u && !a;
                        if (m) {
                            if (o) {
                                for (;g; ) {
                                    for (f = t; f = f[g]; ) if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling";
                                }
                                return !0;
                            }
                            if (h = [ s ? m.firstChild : m.lastChild ], s && y) {
                                for (c = m[W] || (m[W] = {}), l = c[e] || [], d = l[0] === I && l[1], p = l[0] === I && l[2], 
                                f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop(); ) if (1 === f.nodeType && ++p && f === t) {
                                    c[e] = [ I, d, p ];
                                    break;
                                }
                            } else if (y && (l = (t[W] || (t[W] = {}))[e]) && l[0] === I) p = l[1]; else for (;(f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((a ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++p || (y && ((f[W] || (f[W] = {}))[e] = [ I, p ]), 
                            f !== t)); ) ;
                            return p -= i, p === r || p % r === 0 && p / r >= 0;
                        }
                    };
                },
                PSEUDO: function(e, n) {
                    var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[W] ? o(n) : o.length > 1 ? (i = [ e, e, "", n ], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), s = i.length; s--; ) r = ee(e, i[s]), e[r] = !(t[r] = i[s]);
                    }) : function(e) {
                        return o(e, 0, i);
                    }) : o;
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [], n = [], i = E(e.replace(ue, "$1"));
                    return i[W] ? r(function(e, t, n, r) {
                        for (var o, s = i(e, null, r, []), a = e.length; a--; ) (o = s[a]) && (e[a] = !(t[a] = o));
                    }) : function(e, r, o) {
                        return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop();
                    };
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0;
                    };
                }),
                contains: r(function(e) {
                    return e = e.replace(we, Te), function(t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1;
                    };
                }),
                lang: r(function(e) {
                    return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, Te).toLowerCase(), 
                    function(t) {
                        var n;
                        do if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), 
                        n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                    };
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                },
                root: function(e) {
                    return e === H;
                },
                focus: function(e) {
                    return e === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return e.disabled === !1;
                },
                disabled: function(e) {
                    return e.disabled === !0;
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected;
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(e) {
                    return !T.pseudos.empty(e);
                },
                header: function(e) {
                    return me.test(e.nodeName);
                },
                input: function(e) {
                    return ge.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: l(function() {
                    return [ 0 ];
                }),
                last: l(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: l(function(e, t, n) {
                    return [ 0 > n ? n + t : n ];
                }),
                even: l(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e;
                }),
                odd: l(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e;
                }),
                lt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0; ) e.push(r);
                    return e;
                }),
                gt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t; ) e.push(r);
                    return e;
                })
            }
        }, T.pseudos.nth = T.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) T.pseudos[b] = a(b);
        for (b in {
            submit: !0,
            reset: !0
        }) T.pseudos[b] = u(b);
        return f.prototype = T.filters = T.pseudos, T.setFilters = new f(), k = t.tokenize = function(e, n) {
            var r, i, o, s, a, u, l, c = z[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (a = e, u = [], l = T.preFilter; a; ) {
                (!r || (i = le.exec(a))) && (i && (a = a.slice(i[0].length) || a), u.push(o = [])), 
                r = !1, (i = ce.exec(a)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(ue, " ")
                }), a = a.slice(r.length));
                for (s in T.filter) !(i = he[s].exec(a)) || l[s] && !(i = l[s](i)) || (r = i.shift(), 
                o.push({
                    value: r,
                    type: s,
                    matches: i
                }), a = a.slice(r.length));
                if (!r) break;
            }
            return n ? a.length : a ? t.error(e) : z(e, u).slice(0);
        }, E = t.compile = function(e, t) {
            var n, r = [], i = [], o = X[e + " "];
            if (!o) {
                for (t || (t = k(e)), n = t.length; n--; ) o = y(t[n]), o[W] ? r.push(o) : i.push(o);
                o = X(e, x(i, r)), o.selector = e;
            }
            return o;
        }, S = t.select = function(e, t, n, r) {
            var i, o, s, a, u, l = "function" == typeof e && e, f = !r && k(e = l.selector || e);
            if (n = n || [], 1 === f.length) {
                if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && w.getById && 9 === t.nodeType && O && T.relative[o[1].type]) {
                    if (t = (T.find.ID(s.matches[0].replace(we, Te), t) || [])[0], !t) return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length);
                }
                for (i = he.needsContext.test(e) ? 0 : o.length; i-- && (s = o[i], !T.relative[a = s.type]); ) if ((u = T.find[a]) && (r = u(s.matches[0].replace(we, Te), xe.test(o[0].type) && c(t.parentNode) || t))) {
                    if (o.splice(i, 1), e = r.length && p(o), !e) return K.apply(n, r), n;
                    break;
                }
            }
            return (l || E(e, f))(r, t, !O, n, xe.test(e) && c(t.parentNode) || t), n;
        }, w.sortStable = W.split("").sort(U).join("") === W, w.detectDuplicates = !!A, 
        L(), w.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(q.createElement("div"));
        }), i(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || o("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), w.attributes && i(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || o("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
        }), i(function(e) {
            return null == e.getAttribute("disabled");
        }) || o(te, function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
        }), t;
    }(e);
    Z.find = ie, Z.expr = ie.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = ie.uniqueSort, 
    Z.text = ie.getText, Z.isXMLDoc = ie.isXML, Z.contains = ie.contains;
    var oe = Z.expr.match.needsContext, se = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ae = /^.[^:#\[\.,]*$/;
    Z.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Z.find.matchesSelector(r, e) ? [ r ] : [] : Z.find.matches(e, Z.grep(t, function(e) {
            return 1 === e.nodeType;
        }));
    }, Z.fn.extend({
        find: function(e) {
            var t, n = this.length, r = [], i = this;
            if ("string" != typeof e) return this.pushStack(Z(e).filter(function() {
                for (t = 0; n > t; t++) if (Z.contains(i[t], this)) return !0;
            }));
            for (t = 0; n > t; t++) Z.find(e, i[t], r);
            return r = this.pushStack(n > 1 ? Z.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, 
            r;
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0));
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && oe.test(e) ? Z(e) : e || [], !1).length;
        }
    });
    var ue, le = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ce = Z.fn.init = function(e, t) {
        var n, r;
        if (!e) return this;
        if ("string" == typeof e) {
            if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [ null, e, null ] : le.exec(e), 
            !n || !n[1] && t) return !t || t.jquery ? (t || ue).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof Z ? t[0] : t, Z.merge(this, Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : J, !0)), 
                se.test(n[1]) && Z.isPlainObject(t)) for (n in t) Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this;
            }
            return r = J.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), 
            this.context = J, this.selector = e, this;
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Z.isFunction(e) ? "undefined" != typeof ue.ready ? ue.ready(e) : e(Z) : (void 0 !== e.selector && (this.selector = e.selector, 
        this.context = e.context), Z.makeArray(e, this));
    };
    ce.prototype = Z.fn, ue = Z(J);
    var fe = /^(?:parents|prev(?:Until|All))/, pe = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    Z.extend({
        dir: function(e, t, n) {
            for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
                if (i && Z(e).is(n)) break;
                r.push(e);
            }
            return r;
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n;
        }
    }), Z.fn.extend({
        has: function(e) {
            var t = Z(e, this), n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++) if (Z.contains(this, t[e])) return !0;
            });
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], s = oe.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) {
                o.push(n);
                break;
            }
            return this.pushStack(o.length > 1 ? Z.unique(o) : o);
        },
        index: function(e) {
            return e ? "string" == typeof e ? U.call(Z(e), this[0]) : U.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t))));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    }), Z.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return Z.dir(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return Z.dir(e, "parentNode", n);
        },
        next: function(e) {
            return i(e, "nextSibling");
        },
        prev: function(e) {
            return i(e, "previousSibling");
        },
        nextAll: function(e) {
            return Z.dir(e, "nextSibling");
        },
        prevAll: function(e) {
            return Z.dir(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return Z.dir(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return Z.dir(e, "previousSibling", n);
        },
        siblings: function(e) {
            return Z.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return Z.sibling(e.firstChild);
        },
        contents: function(e) {
            return e.contentDocument || Z.merge([], e.childNodes);
        }
    }, function(e, t) {
        Z.fn[e] = function(n, r) {
            var i = Z.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = Z.filter(r, i)), 
            this.length > 1 && (pe[e] || Z.unique(i), fe.test(e) && i.reverse()), this.pushStack(i);
        };
    });
    var de = /\S+/g, he = {};
    Z.Callbacks = function(e) {
        e = "string" == typeof e ? he[e] || o(e) : Z.extend({}, e);
        var t, n, r, i, s, a, u = [], l = !e.once && [], c = function(o) {
            for (t = e.memory && o, n = !0, a = i || 0, i = 0, s = u.length, r = !0; u && s > a; a++) if (u[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                t = !1;
                break;
            }
            r = !1, u && (l ? l.length && c(l.shift()) : t ? u = [] : f.disable());
        }, f = {
            add: function() {
                if (u) {
                    var n = u.length;
                    !function o(t) {
                        Z.each(t, function(t, n) {
                            var r = Z.type(n);
                            "function" === r ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n);
                        });
                    }(arguments), r ? s = u.length : t && (i = n, c(t));
                }
                return this;
            },
            remove: function() {
                return u && Z.each(arguments, function(e, t) {
                    for (var n; (n = Z.inArray(t, u, n)) > -1; ) u.splice(n, 1), r && (s >= n && s--, 
                    a >= n && a--);
                }), this;
            },
            has: function(e) {
                return e ? Z.inArray(e, u) > -1 : !(!u || !u.length);
            },
            empty: function() {
                return u = [], s = 0, this;
            },
            disable: function() {
                return u = l = t = void 0, this;
            },
            disabled: function() {
                return !u;
            },
            lock: function() {
                return l = void 0, t || f.disable(), this;
            },
            locked: function() {
                return !l;
            },
            fireWith: function(e, t) {
                return !u || n && !l || (t = t || [], t = [ e, t.slice ? t.slice() : t ], r ? l.push(t) : c(t)), 
                this;
            },
            fire: function() {
                return f.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!n;
            }
        };
        return f;
    }, Z.extend({
        Deferred: function(e) {
            var t = [ [ "resolve", "done", Z.Callbacks("once memory"), "resolved" ], [ "reject", "fail", Z.Callbacks("once memory"), "rejected" ], [ "notify", "progress", Z.Callbacks("memory") ] ], n = "pending", r = {
                state: function() {
                    return n;
                },
                always: function() {
                    return i.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var e = arguments;
                    return Z.Deferred(function(n) {
                        Z.each(t, function(t, o) {
                            var s = Z.isFunction(e[t]) && e[t];
                            i[o[1]](function() {
                                var e = s && s.apply(this, arguments);
                                e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, s ? [ e ] : arguments);
                            });
                        }), e = null;
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? Z.extend(e, r) : r;
                }
            }, i = {};
            return r.pipe = r.then, Z.each(t, function(e, o) {
                var s = o[2], a = o[3];
                r[o[1]] = s.add, a && s.add(function() {
                    n = a;
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this;
                }, i[o[0] + "With"] = s.fireWith;
            }), r.promise(i), e && e.call(i, i), i;
        },
        when: function(e) {
            var t, n, r, i = 0, o = _.call(arguments), s = o.length, a = 1 !== s || e && Z.isFunction(e.promise) ? s : 0, u = 1 === a ? e : Z.Deferred(), l = function(e, n, r) {
                return function(i) {
                    n[e] = this, r[e] = arguments.length > 1 ? _.call(arguments) : i, r === t ? u.notifyWith(n, r) : --a || u.resolveWith(n, r);
                };
            };
            if (s > 1) for (t = new Array(s), n = new Array(s), r = new Array(s); s > i; i++) o[i] && Z.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --a;
            return a || u.resolveWith(r, o), u.promise();
        }
    });
    var ge;
    Z.fn.ready = function(e) {
        return Z.ready.promise().done(e), this;
    }, Z.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? Z.readyWait++ : Z.ready(!0);
        },
        ready: function(e) {
            (e === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (ge.resolveWith(J, [ Z ]), 
            Z.fn.triggerHandler && (Z(J).triggerHandler("ready"), Z(J).off("ready"))));
        }
    }), Z.ready.promise = function(t) {
        return ge || (ge = Z.Deferred(), "complete" === J.readyState ? setTimeout(Z.ready) : (J.addEventListener("DOMContentLoaded", s, !1), 
        e.addEventListener("load", s, !1))), ge.promise(t);
    }, Z.ready.promise();
    var me = Z.access = function(e, t, n, r, i, o, s) {
        var a = 0, u = e.length, l = null == n;
        if ("object" === Z.type(n)) {
            i = !0;
            for (a in n) Z.access(e, t, a, n[a], !0, o, s);
        } else if (void 0 !== r && (i = !0, Z.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), 
        t = null) : (l = t, t = function(e, t, n) {
            return l.call(Z(e), n);
        })), t)) for (;u > a; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    };
    Z.acceptData = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }, a.uid = 1, a.accepts = Z.acceptData, a.prototype = {
        key: function(e) {
            if (!a.accepts(e)) return 0;
            var t = {}, n = e[this.expando];
            if (!n) {
                n = a.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t);
                } catch (r) {
                    t[this.expando] = n, Z.extend(e, t);
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n;
        },
        set: function(e, t, n) {
            var r, i = this.key(e), o = this.cache[i];
            if ("string" == typeof t) o[t] = n; else if (Z.isEmptyObject(o)) Z.extend(this.cache[i], t); else for (r in t) o[r] = t[r];
            return o;
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return void 0 === t ? n : n[t];
        },
        access: function(e, t, n) {
            var r;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), 
            void 0 !== r ? r : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t);
        },
        remove: function(e, t) {
            var n, r, i, o = this.key(e), s = this.cache[o];
            if (void 0 === t) this.cache[o] = {}; else {
                Z.isArray(t) ? r = t.concat(t.map(Z.camelCase)) : (i = Z.camelCase(t), t in s ? r = [ t, i ] : (r = i, 
                r = r in s ? [ r ] : r.match(de) || [])), n = r.length;
                for (;n--; ) delete s[r[n]];
            }
        },
        hasData: function(e) {
            return !Z.isEmptyObject(this.cache[e[this.expando]] || {});
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]];
        }
    };
    var ve = new a(), ye = new a(), xe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, be = /([A-Z])/g;
    Z.extend({
        hasData: function(e) {
            return ye.hasData(e) || ve.hasData(e);
        },
        data: function(e, t, n) {
            return ye.access(e, t, n);
        },
        removeData: function(e, t) {
            ye.remove(e, t);
        },
        _data: function(e, t, n) {
            return ve.access(e, t, n);
        },
        _removeData: function(e, t) {
            ve.remove(e, t);
        }
    }), Z.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0], s = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = ye.get(o), 1 === o.nodeType && !ve.get(o, "hasDataAttrs"))) {
                    for (n = s.length; n--; ) s[n] && (r = s[n].name, 0 === r.indexOf("data-") && (r = Z.camelCase(r.slice(5)), 
                    u(o, r, i[r])));
                    ve.set(o, "hasDataAttrs", !0);
                }
                return i;
            }
            return "object" == typeof e ? this.each(function() {
                ye.set(this, e);
            }) : me(this, function(t) {
                var n, r = Z.camelCase(e);
                if (o && void 0 === t) {
                    if (n = ye.get(o, e), void 0 !== n) return n;
                    if (n = ye.get(o, r), void 0 !== n) return n;
                    if (n = u(o, r, void 0), void 0 !== n) return n;
                } else this.each(function() {
                    var n = ye.get(this, r);
                    ye.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && ye.set(this, e, t);
                });
            }, null, t, arguments.length > 1, null, !0);
        },
        removeData: function(e) {
            return this.each(function() {
                ye.remove(this, e);
            });
        }
    }), Z.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = ve.get(e, t), n && (!r || Z.isArray(n) ? r = ve.access(e, t, Z.makeArray(n)) : r.push(n)), 
            r || []) : void 0;
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = Z.queue(e, t), r = n.length, i = n.shift(), o = Z._queueHooks(e, t), s = function() {
                Z.dequeue(e, t);
            };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), 
            delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ve.get(e, n) || ve.access(e, n, {
                empty: Z.Callbacks("once memory").add(function() {
                    ve.remove(e, [ t + "queue", n ]);
                })
            });
        }
    }), Z.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = Z.queue(this, e, t);
                Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                Z.dequeue(this, e);
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, t) {
            var n, r = 1, i = Z.Deferred(), o = this, s = this.length, a = function() {
                --r || i.resolveWith(o, [ o ]);
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--; ) n = ve.get(o[s], e + "queueHooks"), 
            n && n.empty && (r++, n.empty.add(a));
            return a(), i.promise(t);
        }
    });
    var we = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Te = [ "Top", "Right", "Bottom", "Left" ], Ce = function(e, t) {
        return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e);
    }, Ne = /^(?:checkbox|radio)$/i;
    !function() {
        var e = J.createDocumentFragment(), t = e.appendChild(J.createElement("div")), n = J.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), 
        t.appendChild(n), Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
    }();
    var ke = "undefined";
    Q.focusinBubbles = "onfocusin" in e;
    var Ee = /^key/, Se = /^(?:mouse|pointer|contextmenu)|click/, De = /^(?:focusinfocus|focusoutblur)$/, je = /^([^.]*)(?:\.(.+)|)$/;
    Z.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, s, a, u, l, c, f, p, d, h, g, m = ve.get(e);
            if (m) for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = Z.guid++), 
            (u = m.events) || (u = m.events = {}), (s = m.handle) || (s = m.handle = function(t) {
                return typeof Z !== ke && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0;
            }), t = (t || "").match(de) || [ "" ], l = t.length; l--; ) a = je.exec(t[l]) || [], 
            d = g = a[1], h = (a[2] || "").split(".").sort(), d && (f = Z.event.special[d] || {}, 
            d = (i ? f.delegateType : f.bindType) || d, f = Z.event.special[d] || {}, c = Z.extend({
                type: d,
                origType: g,
                data: r,
                handler: n,
                guid: n.guid,
                selector: i,
                needsContext: i && Z.expr.match.needsContext.test(i),
                namespace: h.join(".")
            }, o), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, s) !== !1 || e.addEventListener && e.addEventListener(d, s, !1)), 
            f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), 
            Z.event.global[d] = !0);
        },
        remove: function(e, t, n, r, i) {
            var o, s, a, u, l, c, f, p, d, h, g, m = ve.hasData(e) && ve.get(e);
            if (m && (u = m.events)) {
                for (t = (t || "").match(de) || [ "" ], l = t.length; l--; ) if (a = je.exec(t[l]) || [], 
                d = g = a[1], h = (a[2] || "").split(".").sort(), d) {
                    for (f = Z.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], 
                    a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--; ) c = p[o], 
                    !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), 
                    c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                    s && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || Z.removeEvent(e, d, m.handle), 
                    delete u[d]);
                } else for (d in u) Z.event.remove(e, d + t[l], n, r, !0);
                Z.isEmptyObject(u) && (delete m.handle, ve.remove(e, "events"));
            }
        },
        trigger: function(t, n, r, i) {
            var o, s, a, u, l, c, f, p = [ r || J ], d = G.call(t, "type") ? t.type : t, h = G.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = a = r = r || J, 3 !== r.nodeType && 8 !== r.nodeType && !De.test(d + Z.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), 
            d = h.shift(), h.sort()), l = d.indexOf(":") < 0 && "on" + d, t = t[Z.expando] ? t : new Z.Event(d, "object" == typeof t && t), 
            t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            t.result = void 0, t.target || (t.target = r), n = null == n ? [ t ] : Z.makeArray(n, [ t ]), 
            f = Z.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !Z.isWindow(r)) {
                    for (u = f.delegateType || d, De.test(u + d) || (s = s.parentNode); s; s = s.parentNode) p.push(s), 
                    a = s;
                    a === (r.ownerDocument || J) && p.push(a.defaultView || a.parentWindow || e);
                }
                for (o = 0; (s = p[o++]) && !t.isPropagationStopped(); ) t.type = o > 1 ? u : f.bindType || d, 
                c = (ve.get(s, "events") || {})[t.type] && ve.get(s, "handle"), c && c.apply(s, n), 
                c = l && s[l], c && c.apply && Z.acceptData(s) && (t.result = c.apply(s, n), t.result === !1 && t.preventDefault());
                return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !Z.acceptData(r) || l && Z.isFunction(r[d]) && !Z.isWindow(r) && (a = r[l], 
                a && (r[l] = null), Z.event.triggered = d, r[d](), Z.event.triggered = void 0, a && (r[l] = a)), 
                t.result;
            }
        },
        dispatch: function(e) {
            e = Z.event.fix(e);
            var t, n, r, i, o, s = [], a = _.call(arguments), u = (ve.get(this, "events") || {})[e.type] || [], l = Z.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (s = Z.event.handlers.call(this, e, u), t = 0; (i = s[t++]) && !e.isPropagationStopped(); ) for (e.currentTarget = i.elem, 
                n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, 
                e.data = o.data, r = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), 
                void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, s = [], a = t.delegateCount, u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type)) for (;u !== this; u = u.parentNode || this) if (u.disabled !== !0 || "click" !== e.type) {
                for (r = [], n = 0; a > n; n++) o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? Z(i, this).index(u) >= 0 : Z.find(i, this, null, [ u ]).length), 
                r[i] && r.push(o);
                r.length && s.push({
                    elem: u,
                    handlers: r
                });
            }
            return a < t.length && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), 
                e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, o = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || J, 
                r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), 
                e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), 
                e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e;
            }
        },
        fix: function(e) {
            if (e[Z.expando]) return e;
            var t, n, r, i = e.type, o = e, s = this.fixHooks[i];
            for (s || (this.fixHooks[i] = s = Se.test(i) ? this.mouseHooks : Ee.test(i) ? this.keyHooks : {}), 
            r = s.props ? this.props.concat(s.props) : this.props, e = new Z.Event(o), t = r.length; t--; ) n = r[t], 
            e[n] = o[n];
            return e.target || (e.target = J), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
            s.filter ? s.filter(e, o) : e;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== f() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(e) {
                    return Z.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = Z.extend(new Z.Event(), n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? Z.event.trigger(i, null, t) : Z.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
        }
    }, Z.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1);
    }, Z.Event = function(e, t) {
        return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? l : c) : this.type = e, 
        t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void (this[Z.expando] = !0)) : new Z.Event(e, t);
    }, Z.Event.prototype = {
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = l, e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = l, e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = l, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, Z.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        Z.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return (!i || i !== r && !Z.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), 
                e.type = t), n;
            }
        };
    }), Q.focusinBubbles || Z.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            Z.event.simulate(t, e.target, Z.event.fix(e), !0);
        };
        Z.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this, i = ve.access(r, t);
                i || r.addEventListener(e, n, !0), ve.access(r, t, (i || 0) + 1);
            },
            teardown: function() {
                var r = this.ownerDocument || this, i = ve.access(r, t) - 1;
                i ? ve.access(r, t, i) : (r.removeEventListener(e, n, !0), ve.remove(r, t));
            }
        };
    }), Z.fn.extend({
        on: function(e, t, n, r, i) {
            var o, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (s in e) this.on(s, t, n, e[s], i);
                return this;
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, 
            n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = c; else if (!r) return this;
            return 1 === i && (o = r, r = function(e) {
                return Z().off(e), o.apply(this, arguments);
            }, r.guid = o.guid || (o.guid = Z.guid++)), this.each(function() {
                Z.event.add(this, e, r, n, t);
            });
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1);
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, Z(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), 
            this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this;
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), 
            this.each(function() {
                Z.event.remove(this, e, n, t);
            });
        },
        trigger: function(e, t) {
            return this.each(function() {
                Z.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? Z.event.trigger(e, t, n, !0) : void 0;
        }
    });
    var Ae = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Le = /<([\w:]+)/, qe = /<|&#?\w+;/, He = /<(?:script|style|link)/i, Oe = /checked\s*(?:[^=]|=\s*.checked.)/i, Fe = /^$|\/(?:java|ecma)script/i, Pe = /^true\/(.*)/, Re = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Me = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    Me.optgroup = Me.option, Me.tbody = Me.tfoot = Me.colgroup = Me.caption = Me.thead, 
    Me.th = Me.td, Z.extend({
        clone: function(e, t, n) {
            var r, i, o, s, a = e.cloneNode(!0), u = Z.contains(e.ownerDocument, e);
            if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e))) for (s = v(a), 
            o = v(e), r = 0, i = o.length; i > r; r++) y(o[r], s[r]);
            if (t) if (n) for (o = o || v(e), s = s || v(a), r = 0, i = o.length; i > r; r++) m(o[r], s[r]); else m(e, a);
            return s = v(a, "script"), s.length > 0 && g(s, !u && v(e, "script")), a;
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, s, a, u, l, c = t.createDocumentFragment(), f = [], p = 0, d = e.length; d > p; p++) if (i = e[p], 
            i || 0 === i) if ("object" === Z.type(i)) Z.merge(f, i.nodeType ? [ i ] : i); else if (qe.test(i)) {
                for (o = o || c.appendChild(t.createElement("div")), s = (Le.exec(i) || [ "", "" ])[1].toLowerCase(), 
                a = Me[s] || Me._default, o.innerHTML = a[1] + i.replace(Ae, "<$1></$2>") + a[2], 
                l = a[0]; l--; ) o = o.lastChild;
                Z.merge(f, o.childNodes), o = c.firstChild, o.textContent = "";
            } else f.push(t.createTextNode(i));
            for (c.textContent = "", p = 0; i = f[p++]; ) if ((!r || -1 === Z.inArray(i, r)) && (u = Z.contains(i.ownerDocument, i), 
            o = v(c.appendChild(i), "script"), u && g(o), n)) for (l = 0; i = o[l++]; ) Fe.test(i.type || "") && n.push(i);
            return c;
        },
        cleanData: function(e) {
            for (var t, n, r, i, o = Z.event.special, s = 0; void 0 !== (n = e[s]); s++) {
                if (Z.acceptData(n) && (i = n[ve.expando], i && (t = ve.cache[i]))) {
                    if (t.events) for (r in t.events) o[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, t.handle);
                    ve.cache[i] && delete ve.cache[i];
                }
                delete ye.cache[n[ye.expando]];
            }
        }
    }), Z.fn.extend({
        text: function(e) {
            return me(this, function(e) {
                return void 0 === e ? Z.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e);
                });
            }, null, e, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = p(this, e);
                    t.appendChild(e);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = p(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        remove: function(e, t) {
            for (var n, r = e ? Z.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || Z.cleanData(v(n)), 
            n.parentNode && (t && Z.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
            return this;
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Z.cleanData(v(e, !1)), 
            e.textContent = "");
            return this;
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return Z.clone(this, e, t);
            });
        },
        html: function(e) {
            return me(this, function(e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !He.test(e) && !Me[(Le.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                    e = e.replace(Ae, "<$1></$2>");
                    try {
                        for (;r > n; n++) t = this[n] || {}, 1 === t.nodeType && (Z.cleanData(v(t, !1)), 
                        t.innerHTML = e);
                        t = 0;
                    } catch (i) {}
                }
                t && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, Z.cleanData(v(this)), e && e.replaceChild(t, this);
            }), e && (e.length || e.nodeType) ? this : this.remove();
        },
        detach: function(e) {
            return this.remove(e, !0);
        },
        domManip: function(e, t) {
            e = z.apply([], e);
            var n, r, i, o, s, a, u = 0, l = this.length, c = this, f = l - 1, p = e[0], g = Z.isFunction(p);
            if (g || l > 1 && "string" == typeof p && !Q.checkClone && Oe.test(p)) return this.each(function(n) {
                var r = c.eq(n);
                g && (e[0] = p.call(this, n, r.html())), r.domManip(e, t);
            });
            if (l && (n = Z.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 
            1 === n.childNodes.length && (n = r), r)) {
                for (i = Z.map(v(n, "script"), d), o = i.length; l > u; u++) s = n, u !== f && (s = Z.clone(s, !0, !0), 
                o && Z.merge(i, v(s, "script"))), t.call(this[u], s, u);
                if (o) for (a = i[i.length - 1].ownerDocument, Z.map(i, h), u = 0; o > u; u++) s = i[u], 
                Fe.test(s.type || "") && !ve.access(s, "globalEval") && Z.contains(a, s) && (s.src ? Z._evalUrl && Z._evalUrl(s.src) : Z.globalEval(s.textContent.replace(Re, "")));
            }
            return this;
        }
    }), Z.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        Z.fn[e] = function(e) {
            for (var n, r = [], i = Z(e), o = i.length - 1, s = 0; o >= s; s++) n = s === o ? this : this.clone(!0), 
            Z(i[s])[t](n), X.apply(r, n.get());
            return this.pushStack(r);
        };
    });
    var We, $e = {}, Ie = /^margin/, Be = new RegExp("^(" + we + ")(?!px)[a-z%]+$", "i"), _e = function(t) {
        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null);
    };
    !function() {
        function t() {
            s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            s.innerHTML = "", i.appendChild(o);
            var t = e.getComputedStyle(s, null);
            n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(o);
        }
        var n, r, i = J.documentElement, o = J.createElement("div"), s = J.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", 
        Q.clearCloneStyle = "content-box" === s.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
        o.appendChild(s), e.getComputedStyle && Z.extend(Q, {
            pixelPosition: function() {
                return t(), n;
            },
            boxSizingReliable: function() {
                return null == r && t(), r;
            },
            reliableMarginRight: function() {
                var t, n = s.appendChild(J.createElement("div"));
                return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                n.style.marginRight = n.style.width = "0", s.style.width = "1px", i.appendChild(o), 
                t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(o), s.removeChild(n), 
                t;
            }
        }));
    }(), Z.swap = function(e, t, n, r) {
        var i, o, s = {};
        for (o in t) s[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t) e.style[o] = s[o];
        return i;
    };
    var ze = /^(none|table(?!-c[ea]).+)/, Xe = new RegExp("^(" + we + ")(.*)$", "i"), Ue = new RegExp("^([+-])=(" + we + ")", "i"), Ve = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Ye = {
        letterSpacing: "0",
        fontWeight: "400"
    }, Ge = [ "Webkit", "O", "Moz", "ms" ];
    Z.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = w(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, s, a = Z.camelCase(t), u = e.style;
                return t = Z.cssProps[a] || (Z.cssProps[a] = C(u, a)), s = Z.cssHooks[t] || Z.cssHooks[a], 
                void 0 === n ? s && "get" in s && void 0 !== (i = s.get(e, !1, r)) ? i : u[t] : (o = typeof n, 
                "string" === o && (i = Ue.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(Z.css(e, t)), 
                o = "number"), void (null != n && n === n && ("number" !== o || Z.cssNumber[a] || (n += "px"), 
                Q.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), 
                s && "set" in s && void 0 === (n = s.set(e, n, r)) || (u[t] = n))));
            }
        },
        css: function(e, t, n, r) {
            var i, o, s, a = Z.camelCase(t);
            return t = Z.cssProps[a] || (Z.cssProps[a] = C(e.style, a)), s = Z.cssHooks[t] || Z.cssHooks[a], 
            s && "get" in s && (i = s.get(e, !0, n)), void 0 === i && (i = w(e, t, r)), "normal" === i && t in Ye && (i = Ye[t]), 
            "" === n || n ? (o = parseFloat(i), n === !0 || Z.isNumeric(o) ? o || 0 : i) : i;
        }
    }), Z.each([ "height", "width" ], function(e, t) {
        Z.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? ze.test(Z.css(e, "display")) && 0 === e.offsetWidth ? Z.swap(e, Ve, function() {
                    return E(e, t, r);
                }) : E(e, t, r) : void 0;
            },
            set: function(e, n, r) {
                var i = r && _e(e);
                return N(e, n, r ? k(e, t, r, "border-box" === Z.css(e, "boxSizing", !1, i), i) : 0);
            }
        };
    }), Z.cssHooks.marginRight = T(Q.reliableMarginRight, function(e, t) {
        return t ? Z.swap(e, {
            display: "inline-block"
        }, w, [ e, "marginRight" ]) : void 0;
    }), Z.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        Z.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [ n ]; 4 > r; r++) i[e + Te[r] + t] = o[r] || o[r - 2] || o[0];
                return i;
            }
        }, Ie.test(e) || (Z.cssHooks[e + t].set = N);
    }), Z.fn.extend({
        css: function(e, t) {
            return me(this, function(e, t, n) {
                var r, i, o = {}, s = 0;
                if (Z.isArray(t)) {
                    for (r = _e(e), i = t.length; i > s; s++) o[t[s]] = Z.css(e, t[s], !1, r);
                    return o;
                }
                return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t);
            }, e, t, arguments.length > 1);
        },
        show: function() {
            return S(this, !0);
        },
        hide: function() {
            return S(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Ce(this) ? Z(this).show() : Z(this).hide();
            });
        }
    }), Z.Tween = D, D.prototype = {
        constructor: D,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), 
            this.end = r, this.unit = o || (Z.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = D.propHooks[this.prop];
            return e && e.get ? e.get(this) : D.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = D.propHooks[this.prop];
            return this.options.duration ? this.pos = t = Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
            this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            n && n.set ? n.set(this) : D.propHooks._default.set(this), this;
        }
    }, D.prototype.init.prototype = D.prototype, D.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, ""), 
                t && "auto" !== t ? t : 0) : e.elem[e.prop];
            },
            set: function(e) {
                Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, Z.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }
    }, Z.fx = D.prototype.init, Z.fx.step = {};
    var Qe, Je, Ke = /^(?:toggle|show|hide)$/, Ze = new RegExp("^(?:([+-])=|)(" + we + ")([a-z%]*)$", "i"), et = /queueHooks$/, tt = [ q ], nt = {
        "*": [ function(e, t) {
            var n = this.createTween(e, t), r = n.cur(), i = Ze.exec(t), o = i && i[3] || (Z.cssNumber[e] ? "" : "px"), s = (Z.cssNumber[e] || "px" !== o && +r) && Ze.exec(Z.css(n.elem, e)), a = 1, u = 20;
            if (s && s[3] !== o) {
                o = o || s[3], i = i || [], s = +r || 1;
                do a = a || ".5", s /= a, Z.style(n.elem, e, s + o); while (a !== (a = n.cur() / r) && 1 !== a && --u);
            }
            return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), 
            n;
        } ]
    };
    Z.Animation = Z.extend(O, {
        tweener: function(e, t) {
            Z.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++) n = e[r], nt[n] = nt[n] || [], nt[n].unshift(t);
        },
        prefilter: function(e, t) {
            t ? tt.unshift(e) : tt.push(e);
        }
    }), Z.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? Z.extend({}, e) : {
            complete: n || !n && t || Z.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !Z.isFunction(t) && t
        };
        return r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default, 
        (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue);
        }, r;
    }, Z.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Ce).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function(e, t, n, r) {
            var i = Z.isEmptyObject(e), o = Z.speed(t, n, r), s = function() {
                var t = O(this, Z.extend({}, e), o);
                (i || ve.get(this, "finish")) && t.stop(!0);
            };
            return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s);
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n);
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), 
            this.each(function() {
                var t = !0, i = null != e && e + "queueHooks", o = Z.timers, s = ve.get(this);
                if (i) s[i] && s[i].stop && r(s[i]); else for (i in s) s[i] && s[i].stop && et.test(i) && r(s[i]);
                for (i = o.length; i--; ) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), 
                t = !1, o.splice(i, 1));
                (t || !n) && Z.dequeue(this, e);
            });
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = ve.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = Z.timers, s = r ? r.length : 0;
                for (n.finish = !0, Z.queue(this, e, []), i && i.stop && i.stop.call(this, !0), 
                t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), 
                o.splice(t, 1));
                for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish;
            });
        }
    }), Z.each([ "toggle", "show", "hide" ], function(e, t) {
        var n = Z.fn[t];
        Z.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, r, i);
        };
    }), Z.each({
        slideDown: A("show"),
        slideUp: A("hide"),
        slideToggle: A("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        Z.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r);
        };
    }), Z.timers = [], Z.fx.tick = function() {
        var e, t = 0, n = Z.timers;
        for (Qe = Z.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
        n.length || Z.fx.stop(), Qe = void 0;
    }, Z.fx.timer = function(e) {
        Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop();
    }, Z.fx.interval = 13, Z.fx.start = function() {
        Je || (Je = setInterval(Z.fx.tick, Z.fx.interval));
    }, Z.fx.stop = function() {
        clearInterval(Je), Je = null;
    }, Z.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, Z.fn.delay = function(e, t) {
        return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
            var r = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(r);
            };
        });
    }, function() {
        var e = J.createElement("input"), t = J.createElement("select"), n = t.appendChild(J.createElement("option"));
        e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = n.selected, t.disabled = !0, 
        Q.optDisabled = !n.disabled, e = J.createElement("input"), e.value = "t", e.type = "radio", 
        Q.radioValue = "t" === e.value;
    }();
    var rt, it, ot = Z.expr.attrHandle;
    Z.fn.extend({
        attr: function(e, t) {
            return me(this, Z.attr, e, t, arguments.length > 1);
        },
        removeAttr: function(e) {
            return this.each(function() {
                Z.removeAttr(this, e);
            });
        }
    }), Z.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === ke ? Z.prop(e, t, n) : (1 === o && Z.isXMLDoc(e) || (t = t.toLowerCase(), 
            r = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? it : rt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = Z.find.attr(e, t), 
            null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), 
            n) : void Z.removeAttr(e, t));
        },
        removeAttr: function(e, t) {
            var n, r, i = 0, o = t && t.match(de);
            if (o && 1 === e.nodeType) for (;n = o[i++]; ) r = Z.propFix[n] || n, Z.expr.match.bool.test(n) && (e[r] = !1), 
            e.removeAttribute(n);
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!Q.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        }
    }), it = {
        set: function(e, t, n) {
            return t === !1 ? Z.removeAttr(e, n) : e.setAttribute(n, n), n;
        }
    }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = ot[t] || Z.find.attr;
        ot[t] = function(e, t, r) {
            var i, o;
            return r || (o = ot[t], ot[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, 
            ot[t] = o), i;
        };
    });
    var st = /^(?:input|select|textarea|button)$/i;
    Z.fn.extend({
        prop: function(e, t) {
            return me(this, Z.prop, e, t, arguments.length > 1);
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[Z.propFix[e] || e];
            });
        }
    }), Z.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !Z.isXMLDoc(e), o && (t = Z.propFix[t] || t, 
            i = Z.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || st.test(e.nodeName) || e.href ? e.tabIndex : -1;
                }
            }
        }
    }), Q.optSelected || (Z.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
        }
    }), Z.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        Z.propFix[this.toLowerCase()] = this;
    });
    var at = /[\t\r\n\f]/g;
    Z.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, s, a = "string" == typeof e && e, u = 0, l = this.length;
            if (Z.isFunction(e)) return this.each(function(t) {
                Z(this).addClass(e.call(this, t, this.className));
            });
            if (a) for (t = (e || "").match(de) || []; l > u; u++) if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(at, " ") : " ")) {
                for (o = 0; i = t[o++]; ) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                s = Z.trim(r), n.className !== s && (n.className = s);
            }
            return this;
        },
        removeClass: function(e) {
            var t, n, r, i, o, s, a = 0 === arguments.length || "string" == typeof e && e, u = 0, l = this.length;
            if (Z.isFunction(e)) return this.each(function(t) {
                Z(this).removeClass(e.call(this, t, this.className));
            });
            if (a) for (t = (e || "").match(de) || []; l > u; u++) if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(at, " ") : "")) {
                for (o = 0; i = t[o++]; ) for (;r.indexOf(" " + i + " ") >= 0; ) r = r.replace(" " + i + " ", " ");
                s = e ? Z.trim(r) : "", n.className !== s && (n.className = s);
            }
            return this;
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(Z.isFunction(e) ? function(n) {
                Z(this).toggleClass(e.call(this, n, this.className, t), t);
            } : function() {
                if ("string" === n) for (var t, r = 0, i = Z(this), o = e.match(de) || []; t = o[r++]; ) i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else (n === ke || "boolean" === n) && (this.className && ve.set(this, "__className__", this.className), 
                this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || "");
            });
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(at, " ").indexOf(t) >= 0) return !0;
            return !1;
        }
    });
    var ut = /\r/g;
    Z.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = Z.isFunction(e), this.each(function(n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, Z(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Z.isArray(i) && (i = Z.map(i, function(e) {
                    return null == e ? "" : e + "";
                })), t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i));
            })) : i ? (t = Z.valHooks[i.type] || Z.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, 
            "string" == typeof n ? n.replace(ut, "") : null == n ? "" : n)) : void 0;
        }
    }), Z.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = Z.find.attr(e, "value");
                    return null != t ? t : Z.trim(Z.text(e));
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, s = o ? null : [], a = o ? i + 1 : r.length, u = 0 > i ? a : o ? i : 0; a > u; u++) if (n = r[u], 
                    !(!n.selected && u !== i || (Q.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
                        if (t = Z(n).val(), o) return t;
                        s.push(t);
                    }
                    return s;
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = Z.makeArray(t), s = i.length; s--; ) r = i[s], 
                    (r.selected = Z.inArray(r.value, o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o;
                }
            }
        }
    }), Z.each([ "radio", "checkbox" ], function() {
        Z.valHooks[this] = {
            set: function(e, t) {
                return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0;
            }
        }, Q.checkOn || (Z.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        Z.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
    }), Z.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        }
    });
    var lt = Z.now(), ct = /\?/;
    Z.parseJSON = function(e) {
        return JSON.parse(e + "");
    }, Z.parseXML = function(e) {
        var t, n;
        if (!e || "string" != typeof e) return null;
        try {
            n = new DOMParser(), t = n.parseFromString(e, "text/xml");
        } catch (r) {
            t = void 0;
        }
        return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), 
        t;
    };
    var ft = /#.*$/, pt = /([?&])_=[^&]*/, dt = /^(.*?):[ \t]*([^\r\n]*)$/gm, ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, gt = /^(?:GET|HEAD)$/, mt = /^\/\//, vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, yt = {}, xt = {}, bt = "*/".concat("*"), wt = e.location.href, Tt = vt.exec(wt.toLowerCase()) || [];
    Z.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: wt,
            type: "GET",
            isLocal: ht.test(Tt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": bt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": Z.parseJSON,
                "text xml": Z.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? R(R(e, Z.ajaxSettings), t) : R(Z.ajaxSettings, e);
        },
        ajaxPrefilter: F(yt),
        ajaxTransport: F(xt),
        ajax: function(e, t) {
            function n(e, t, n, s) {
                var u, c, v, y, b, T = t;
                2 !== x && (x = 2, a && clearTimeout(a), r = void 0, o = s || "", w.readyState = e > 0 ? 4 : 0, 
                u = e >= 200 && 300 > e || 304 === e, n && (y = M(f, w, n)), y = W(f, y, w, u), 
                u ? (f.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (Z.lastModified[i] = b), 
                b = w.getResponseHeader("etag"), b && (Z.etag[i] = b)), 204 === e || "HEAD" === f.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, 
                c = y.data, v = y.error, u = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), 
                w.status = e, w.statusText = (t || T) + "", u ? h.resolveWith(p, [ c, T, w ]) : h.rejectWith(p, [ w, T, v ]), 
                w.statusCode(m), m = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [ w, f, u ? c : v ]), 
                g.fireWith(p, [ w, T ]), l && (d.trigger("ajaxComplete", [ w, f ]), --Z.active || Z.event.trigger("ajaxStop")));
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var r, i, o, s, a, u, l, c, f = Z.ajaxSetup({}, t), p = f.context || f, d = f.context && (p.nodeType || p.jquery) ? Z(p) : Z.event, h = Z.Deferred(), g = Z.Callbacks("once memory"), m = f.statusCode || {}, v = {}, y = {}, x = 0, b = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === x) {
                        if (!s) for (s = {}; t = dt.exec(o); ) s[t[1].toLowerCase()] = t[2];
                        t = s[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return 2 === x ? o : null;
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return x || (e = y[n] = y[n] || e, v[e] = t), this;
                },
                overrideMimeType: function(e) {
                    return x || (f.mimeType = e), this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (2 > x) for (t in e) m[t] = [ m[t], e[t] ]; else w.always(e[w.status]);
                    return this;
                },
                abort: function(e) {
                    var t = e || b;
                    return r && r.abort(t), n(0, t), this;
                }
            };
            if (h.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || wt) + "").replace(ft, "").replace(mt, Tt[1] + "//"), 
            f.type = t.method || t.type || f.method || f.type, f.dataTypes = Z.trim(f.dataType || "*").toLowerCase().match(de) || [ "" ], 
            null == f.crossDomain && (u = vt.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === Tt[1] && u[2] === Tt[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (Tt[3] || ("http:" === Tt[1] ? "80" : "443")))), 
            f.data && f.processData && "string" != typeof f.data && (f.data = Z.param(f.data, f.traditional)), 
            P(yt, f, t, w), 2 === x) return w;
            l = Z.event && f.global, l && 0 === Z.active++ && Z.event.trigger("ajaxStart"), 
            f.type = f.type.toUpperCase(), f.hasContent = !gt.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (ct.test(i) ? "&" : "?") + f.data, 
            delete f.data), f.cache === !1 && (f.url = pt.test(i) ? i.replace(pt, "$1_=" + lt++) : i + (ct.test(i) ? "&" : "?") + "_=" + lt++)), 
            f.ifModified && (Z.lastModified[i] && w.setRequestHeader("If-Modified-Since", Z.lastModified[i]), 
            Z.etag[i] && w.setRequestHeader("If-None-Match", Z.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), 
            w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + bt + "; q=0.01" : "") : f.accepts["*"]);
            for (c in f.headers) w.setRequestHeader(c, f.headers[c]);
            if (f.beforeSend && (f.beforeSend.call(p, w, f) === !1 || 2 === x)) return w.abort();
            b = "abort";
            for (c in {
                success: 1,
                error: 1,
                complete: 1
            }) w[c](f[c]);
            if (r = P(xt, f, t, w)) {
                w.readyState = 1, l && d.trigger("ajaxSend", [ w, f ]), f.async && f.timeout > 0 && (a = setTimeout(function() {
                    w.abort("timeout");
                }, f.timeout));
                try {
                    x = 1, r.send(v, n);
                } catch (T) {
                    if (!(2 > x)) throw T;
                    n(-1, T);
                }
            } else n(-1, "No Transport");
            return w;
        },
        getJSON: function(e, t, n) {
            return Z.get(e, t, n, "json");
        },
        getScript: function(e, t) {
            return Z.get(e, void 0, t, "script");
        }
    }), Z.each([ "get", "post" ], function(e, t) {
        Z[t] = function(e, n, r, i) {
            return Z.isFunction(n) && (i = i || r, r = n, n = void 0), Z.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            });
        };
    }), Z._evalUrl = function(e) {
        return Z.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, Z.fn.extend({
        wrapAll: function(e) {
            var t;
            return Z.isFunction(e) ? this.each(function(t) {
                Z(this).wrapAll(e.call(this, t));
            }) : (this[0] && (t = Z(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), 
            t.map(function() {
                for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                return e;
            }).append(this)), this);
        },
        wrapInner: function(e) {
            return this.each(Z.isFunction(e) ? function(t) {
                Z(this).wrapInner(e.call(this, t));
            } : function() {
                var t = Z(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function(e) {
            var t = Z.isFunction(e);
            return this.each(function(n) {
                Z(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes);
            }).end();
        }
    }), Z.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0;
    }, Z.expr.filters.visible = function(e) {
        return !Z.expr.filters.hidden(e);
    };
    var Ct = /%20/g, Nt = /\[\]$/, kt = /\r?\n/g, Et = /^(?:submit|button|image|reset|file)$/i, St = /^(?:input|select|textarea|keygen)/i;
    Z.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            t = Z.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        };
        if (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function() {
            i(this.name, this.value);
        }); else for (n in e) $(n, e[n], t, i);
        return r.join("&").replace(Ct, "+");
    }, Z.fn.extend({
        serialize: function() {
            return Z.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = Z.prop(this, "elements");
                return e ? Z.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !Z(this).is(":disabled") && St.test(this.nodeName) && !Et.test(e) && (this.checked || !Ne.test(e));
            }).map(function(e, t) {
                var n = Z(this).val();
                return null == n ? null : Z.isArray(n) ? Z.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(kt, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(kt, "\r\n")
                };
            }).get();
        }
    }), Z.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var Dt = 0, jt = {}, At = {
        0: 200,
        1223: 204
    }, Lt = Z.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in jt) jt[e]();
    }), Q.cors = !!Lt && "withCredentials" in Lt, Q.ajax = Lt = !!Lt, Z.ajaxTransport(function(e) {
        var t;
        return Q.cors || Lt && !e.crossDomain ? {
            send: function(n, r) {
                var i, o = e.xhr(), s = ++Dt;
                if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (i in e.xhrFields) o[i] = e.xhrFields[i];
                e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) o.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete jt[s], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(At[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                            text: o.responseText
                        } : void 0, o.getAllResponseHeaders()));
                    };
                }, o.onload = t(), o.onerror = t("error"), t = jt[s] = t("abort");
                try {
                    o.send(e.hasContent && e.data || null);
                } catch (a) {
                    if (t) throw a;
                }
            },
            abort: function() {
                t && t();
            }
        } : void 0;
    }), Z.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return Z.globalEval(e), e;
            }
        }
    }), Z.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }), Z.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = Z("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type);
                    }), J.head.appendChild(t[0]);
                },
                abort: function() {
                    n && n();
                }
            };
        }
    });
    var qt = [], Ht = /(=)\?(?=&|$)|\?\?/;
    Z.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = qt.pop() || Z.expando + "_" + lt++;
            return this[e] = !0, e;
        }
    }), Z.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, s, a = t.jsonp !== !1 && (Ht.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ht.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, 
        a ? t[a] = t[a].replace(Ht, "$1" + i) : t.jsonp !== !1 && (t.url += (ct.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), 
        t.converters["script json"] = function() {
            return s || Z.error(i + " was not called"), s[0];
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            s = arguments;
        }, r.always(function() {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, qt.push(i)), s && Z.isFunction(o) && o(s[0]), 
            s = o = void 0;
        }), "script") : void 0;
    }), Z.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || J;
        var r = se.exec(e), i = !n && [];
        return r ? [ t.createElement(r[1]) ] : (r = Z.buildFragment([ e ], t, i), i && i.length && Z(i).remove(), 
        Z.merge([], r.childNodes));
    };
    var Ot = Z.fn.load;
    Z.fn.load = function(e, t, n) {
        if ("string" != typeof e && Ot) return Ot.apply(this, arguments);
        var r, i, o, s = this, a = e.indexOf(" ");
        return a >= 0 && (r = Z.trim(e.slice(a)), e = e.slice(0, a)), Z.isFunction(t) ? (n = t, 
        t = void 0) : t && "object" == typeof t && (i = "POST"), s.length > 0 && Z.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, s.html(r ? Z("<div>").append(Z.parseHTML(e)).find(r) : e);
        }).complete(n && function(e, t) {
            s.each(n, o || [ e.responseText, t, e ]);
        }), this;
    }, Z.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        Z.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), Z.expr.filters.animated = function(e) {
        return Z.grep(Z.timers, function(t) {
            return e === t.elem;
        }).length;
    };
    var Ft = e.document.documentElement;
    Z.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, s, a, u, l, c = Z.css(e, "position"), f = Z(e), p = {};
            "static" === c && (e.style.position = "relative"), a = f.offset(), o = Z.css(e, "top"), 
            u = Z.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, 
            l ? (r = f.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), 
            Z.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), 
            null != t.left && (p.left = t.left - a.left + i), "using" in t ? t.using.call(e, p) : f.css(p);
        }
    }, Z.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                Z.offset.setOffset(this, e, t);
            });
            var t, n, r = this[0], i = {
                top: 0,
                left: 0
            }, o = r && r.ownerDocument;
            return o ? (t = o.documentElement, Z.contains(t, r) ? (typeof r.getBoundingClientRect !== ke && (i = r.getBoundingClientRect()), 
            n = I(o), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }) : i) : void 0;
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0], r = {
                    top: 0,
                    left: 0
                };
                return "fixed" === Z.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), Z.nodeName(e[0], "html") || (r = e.offset()), r.top += Z.css(e[0], "borderTopWidth", !0), 
                r.left += Z.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - Z.css(n, "marginTop", !0),
                    left: t.left - r.left - Z.css(n, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Ft; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position"); ) e = e.offsetParent;
                return e || Ft;
            });
        }
    }), Z.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var r = "pageYOffset" === n;
        Z.fn[t] = function(i) {
            return me(this, function(t, i, o) {
                var s = I(t);
                return void 0 === o ? s ? s[n] : t[i] : void (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o);
            }, t, i, arguments.length, null);
        };
    }), Z.each([ "top", "left" ], function(e, t) {
        Z.cssHooks[t] = T(Q.pixelPosition, function(e, n) {
            return n ? (n = w(e, t), Be.test(n) ? Z(e).position()[t] + "px" : n) : void 0;
        });
    }), Z.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        Z.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            Z.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r), s = n || (r === !0 || i === !0 ? "margin" : "border");
                return me(this, function(t, n, r) {
                    var i;
                    return Z.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, 
                    Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? Z.css(t, n, s) : Z.style(t, n, r, s);
                }, t, o ? r : void 0, o, null);
            };
        });
    }), Z.fn.size = function() {
        return this.length;
    }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return Z;
    });
    var Pt = e.jQuery, Rt = e.$;
    return Z.noConflict = function(t) {
        return e.$ === Z && (e.$ = Rt), t && e.jQuery === Z && (e.jQuery = Pt), Z;
    }, typeof t === ke && (e.jQuery = e.$ = Z), Z;
});
!function(e) {
    function n(e, n) {
        if (!n || "function" == typeof n) return e;
        for (var t in n) e[t] = n[t];
        return e;
    }
    function t(e, n, r) {
        for (var a in n) a in e ? "string" == typeof e[a] || e[a] instanceof String || "string" == typeof n[a] || n[a] instanceof String ? r && (e[a] = n[a]) : t(e[a], n[a], r) : e[a] = n[a];
        return e;
    }
    function r(e, n, t) {
        var r, a = 0, o = e.length, i = void 0 === o || "[object Array]" !== Object.prototype.toString.apply(e) || "function" == typeof e;
        if (t) if (i) {
            for (r in e) if (n.apply(e[r], t) === !1) break;
        } else for (;a < o && n.apply(e[a++], t) !== !1; ) ; else if (i) {
            for (r in e) if (n.call(e[r], r, e[r]) === !1) break;
        } else for (;a < o && n.call(e[a], a, e[a++]) !== !1; ) ;
        return e;
    }
    function a(e) {
        return "string" == typeof e ? e.replace(/[&<>"'\/]/g, function(e) {
            return J[e];
        }) : e;
    }
    function o(e) {
        var n = function(e) {
            if (window.XMLHttpRequest) return e(null, new XMLHttpRequest());
            if (window.ActiveXObject) try {
                return e(null, new ActiveXObject("Msxml2.XMLHTTP"));
            } catch (n) {
                return e(null, new ActiveXObject("Microsoft.XMLHTTP"));
            }
            return e(new Error());
        }, t = function(e) {
            if ("string" == typeof e) return e;
            var n = [];
            for (var t in e) e.hasOwnProperty(t) && n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
            return n.join("&");
        }, r = function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var n = "", t = 0; t < e.length; t++) {
                var r = e.charCodeAt(t);
                r < 128 ? n += String.fromCharCode(r) : r > 127 && r < 2048 ? (n += String.fromCharCode(r >> 6 | 192), 
                n += String.fromCharCode(63 & r | 128)) : (n += String.fromCharCode(r >> 12 | 224), 
                n += String.fromCharCode(r >> 6 & 63 | 128), n += String.fromCharCode(63 & r | 128));
            }
            return n;
        }, a = function(e) {
            var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            e = r(e);
            var t, a, o, i, s, u, l, f = "", c = 0;
            do t = e.charCodeAt(c++), a = e.charCodeAt(c++), o = e.charCodeAt(c++), i = t >> 2, 
            s = (3 & t) << 4 | a >> 4, u = (15 & a) << 2 | o >> 6, l = 63 & o, isNaN(a) ? u = l = 64 : isNaN(o) && (l = 64), 
            f += n.charAt(i) + n.charAt(s) + n.charAt(u) + n.charAt(l), t = a = o = "", i = s = u = l = ""; while (c < e.length);
            return f;
        }, o = function() {
            for (var e = arguments[0], n = 1; n < arguments.length; n++) {
                var t = arguments[n];
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
            }
            return e;
        }, i = function(e, r, a, s) {
            "function" == typeof a && (s = a, a = {}), a.cache = a.cache || !1, a.data = a.data || {}, 
            a.headers = a.headers || {}, a.jsonp = a.jsonp || !1, a.async = void 0 === a.async || a.async;
            var u, l = o({
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            }, i.headers, a.headers);
            if (u = "application/json" === l["content-type"] ? JSON.stringify(a.data) : t(a.data), 
            "GET" === e) {
                var f = [];
                if (u && (f.push(u), u = null), a.cache || f.push("_=" + new Date().getTime()), 
                a.jsonp && (f.push("callback=" + a.jsonp), f.push("jsonp=" + a.jsonp)), f = f.join("&"), 
                f.length > 1 && (r += r.indexOf("?") > -1 ? "&" + f : "?" + f), a.jsonp) {
                    var c = document.getElementsByTagName("head")[0], p = document.createElement("script");
                    return p.type = "text/javascript", p.src = r, void c.appendChild(p);
                }
            }
            n(function(n, t) {
                if (n) return s(n);
                t.open(e, r, a.async);
                for (var o in l) l.hasOwnProperty(o) && t.setRequestHeader(o, l[o]);
                t.onreadystatechange = function() {
                    if (4 === t.readyState) {
                        var e = t.responseText || "";
                        if (!s) return;
                        s(t.status, {
                            text: function() {
                                return e;
                            },
                            json: function() {
                                try {
                                    return JSON.parse(e);
                                } catch (n) {
                                    return W.error("Can not parse JSON. URL: " + r), {};
                                }
                            }
                        });
                    }
                }, t.send(u);
            });
        }, s = {
            authBasic: function(e, n) {
                i.headers.Authorization = "Basic " + a(e + ":" + n);
            },
            connect: function(e, n, t) {
                return i("CONNECT", e, n, t);
            },
            del: function(e, n, t) {
                return i("DELETE", e, n, t);
            },
            get: function(e, n, t) {
                return i("GET", e, n, t);
            },
            head: function(e, n, t) {
                return i("HEAD", e, n, t);
            },
            headers: function(e) {
                i.headers = e || {};
            },
            isAllowed: function(e, n, t) {
                this.options(e, function(e, r) {
                    t(r.text().indexOf(n) !== -1);
                });
            },
            options: function(e, n, t) {
                return i("OPTIONS", e, n, t);
            },
            patch: function(e, n, t) {
                return i("PATCH", e, n, t);
            },
            post: function(e, n, t) {
                return i("POST", e, n, t);
            },
            put: function(e, n, t) {
                return i("PUT", e, n, t);
            },
            trace: function(e, n, t) {
                return i("TRACE", e, n, t);
            }
        }, u = e.type ? e.type.toLowerCase() : "get";
        s[u](e.url, e, function(n, t) {
            200 === n || 0 === n && t.text() ? e.success(t.json(), n, null) : e.error(t.text(), n, null);
        });
    }
    function i(e, n) {
        "function" == typeof e && (n = e, e = {}), e = e || {}, W.extend(U, e), delete U.fixLng, 
        U.functions && (delete U.functions, W.extend(W, e.functions)), "string" == typeof U.ns && (U.ns = {
            namespaces: [ U.ns ],
            defaultNs: U.ns
        }), "string" == typeof U.fallbackNS && (U.fallbackNS = [ U.fallbackNS ]), "string" != typeof U.fallbackLng && "boolean" != typeof U.fallbackLng || (U.fallbackLng = [ U.fallbackLng ]), 
        U.interpolationPrefixEscaped = W.regexEscape(U.interpolationPrefix), U.interpolationSuffixEscaped = W.regexEscape(U.interpolationSuffix), 
        U.lng || (U.lng = W.detectLanguage()), K = W.toLanguages(U.lng), I = K[0], W.log("currentLng set to: " + I), 
        U.useCookie && W.cookie.read(U.cookieName) !== I && W.cookie.create(U.cookieName, I, U.cookieExpirationTime, U.cookieDomain), 
        U.detectLngFromLocalStorage && "undefined" != typeof document && window.localStorage && W.localStorage.setItem("i18next_lng", I);
        var t = _;
        e.fixLng && (t = function(e, n) {
            return n = n || {}, n.lng = n.lng || t.lng, _(e, n);
        }, t.lng = I), Z.setCurrentLng(I), V && U.setJqueryExt ? S && S() : w && w();
        var r;
        if (V && V.Deferred && (r = V.Deferred()), U.resStore) {
            if (z = U.resStore, B = !0, n && n(null, t), r && r.resolve(t), r) return r.promise();
        } else {
            var a = W.toLanguages(U.lng);
            "string" == typeof U.preload && (U.preload = [ U.preload ]);
            for (var o = 0, i = U.preload.length; o < i; o++) for (var s = W.toLanguages(U.preload[o]), u = 0, l = s.length; u < l; u++) a.indexOf(s[u]) < 0 && a.push(s[u]);
            if (H.sync.load(a, U, function(e, a) {
                z = a, B = !0, n && n(e, t), r && (e ? r.reject : r.resolve)(e || t);
            }), r) return r.promise();
        }
    }
    function s() {
        return B;
    }
    function u(e, n) {
        "string" == typeof e && (e = [ e ]);
        for (var t = 0, r = e.length; t < r; t++) U.preload.indexOf(e[t]) < 0 && U.preload.push(e[t]);
        return i(n);
    }
    function l(e, n, t, r, a) {
        "string" != typeof n ? (t = n, n = U.ns.defaultNs) : U.ns.namespaces.indexOf(n) < 0 && U.ns.namespaces.push(n), 
        z[e] = z[e] || {}, z[e][n] = z[e][n] || {}, r ? W.deepExtend(z[e][n], t, a) : W.extend(z[e][n], t), 
        U.useLocalStorage && G._storeLocal(z);
    }
    function f(e, n) {
        "string" != typeof n && (n = U.ns.defaultNs), z[e] = z[e] || {};
        var t = z[e][n] || {}, r = !1;
        for (var a in t) t.hasOwnProperty(a) && (r = !0);
        return r;
    }
    function c(e, n) {
        return "string" != typeof n && (n = U.ns.defaultNs), z[e] = z[e] || {}, W.extend({}, z[e][n]);
    }
    function p(e, n) {
        "string" != typeof n && (n = U.ns.defaultNs), z[e] = z[e] || {}, z[e][n] = {}, U.useLocalStorage && G._storeLocal(z);
    }
    function d(e, n, t, r) {
        "string" != typeof n ? (resource = n, n = U.ns.defaultNs) : U.ns.namespaces.indexOf(n) < 0 && U.ns.namespaces.push(n), 
        z[e] = z[e] || {}, z[e][n] = z[e][n] || {};
        for (var a = t.split(U.keyseparator), o = 0, i = z[e][n]; a[o]; ) o == a.length - 1 ? i[a[o]] = r : (null == i[a[o]] && (i[a[o]] = {}), 
        i = i[a[o]]), o++;
        U.useLocalStorage && G._storeLocal(z);
    }
    function g(e, n, t) {
        "string" != typeof n ? (t = n, n = U.ns.defaultNs) : U.ns.namespaces.indexOf(n) < 0 && U.ns.namespaces.push(n);
        for (var r in t) "string" == typeof t[r] && d(e, n, r, t[r]);
    }
    function h(e) {
        U.ns.defaultNs = e;
    }
    function y(e, n) {
        m([ e ], n);
    }
    function m(e, n) {
        var t = {
            dynamicLoad: U.dynamicLoad,
            resGetPath: U.resGetPath,
            getAsync: U.getAsync,
            customLoad: U.customLoad,
            ns: {
                namespaces: e,
                defaultNs: ""
            }
        }, r = W.toLanguages(U.lng);
        "string" == typeof U.preload && (U.preload = [ U.preload ]);
        for (var a = 0, o = U.preload.length; a < o; a++) for (var i = W.toLanguages(U.preload[a]), s = 0, u = i.length; s < u; s++) r.indexOf(i[s]) < 0 && r.push(i[s]);
        for (var l = [], f = 0, c = r.length; f < c; f++) {
            var p = !1, d = z[r[f]];
            if (d) for (var g = 0, h = e.length; g < h; g++) d[e[g]] || (p = !0); else p = !0;
            p && l.push(r[f]);
        }
        l.length ? H.sync._fetch(l, t, function(t, r) {
            var a = e.length * l.length;
            W.each(e, function(e, t) {
                U.ns.namespaces.indexOf(t) < 0 && U.ns.namespaces.push(t), W.each(l, function(e, o) {
                    z[o] = z[o] || {}, z[o][t] = r[o][t], a--, 0 === a && n && (U.useLocalStorage && H.sync._storeLocal(z), 
                    n());
                });
            });
        }) : n && n();
    }
    function v(e, n, t) {
        return "function" == typeof n ? (t = n, n = {}) : n || (n = {}), n.lng = e, i(n, t);
    }
    function x() {
        return I;
    }
    function b() {
        var e = [ "ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam" ];
        return e.some(function(e) {
            return new RegExp("^" + e).test(I);
        }) ? "rtl" : "ltr";
    }
    function k(e) {
        z = {}, v(I, e);
    }
    function L() {
        window.i18next = window.i18n, q ? window.i18n = q : delete window.i18n;
    }
    function S() {
        function e(e, n, t) {
            if (0 !== n.length) {
                var r = "text";
                if (0 === n.indexOf("[")) {
                    var a = n.split("]");
                    n = a[1], r = a[0].substr(1, a[0].length - 1);
                }
                n.indexOf(";") === n.length - 1 && (n = n.substr(0, n.length - 2));
                var o;
                if ("html" === r) o = U.defaultValueFromContent ? V.extend({
                    defaultValue: e.html()
                }, t) : t, e.html(V.t(n, o)); else if ("text" === r) o = U.defaultValueFromContent ? V.extend({
                    defaultValue: e.text()
                }, t) : t, e.text(V.t(n, o)); else if ("prepend" === r) o = U.defaultValueFromContent ? V.extend({
                    defaultValue: e.html()
                }, t) : t, e.prepend(V.t(n, o)); else if ("append" === r) o = U.defaultValueFromContent ? V.extend({
                    defaultValue: e.html()
                }, t) : t, e.append(V.t(n, o)); else if (0 === r.indexOf("data-")) {
                    var i = r.substr("data-".length);
                    o = U.defaultValueFromContent ? V.extend({
                        defaultValue: e.data(i)
                    }, t) : t;
                    var s = V.t(n, o);
                    e.data(i, s), e.attr(r, s);
                } else o = U.defaultValueFromContent ? V.extend({
                    defaultValue: e.attr(r)
                }, t) : t, e.attr(r, V.t(n, o));
            }
        }
        function n(n, t) {
            var r = n.attr(U.selectorAttr);
            if (r || "undefined" == typeof r || r === !1 || (r = n.text() || n.val()), r) {
                var a = n, o = n.data("i18n-target");
                if (o && (a = n.find(o) || n), t || U.useDataAttrOptions !== !0 || (t = n.data("i18n-options")), 
                t = t || {}, r.indexOf(";") >= 0) {
                    var i = r.split(";");
                    V.each(i, function(n, r) {
                        "" !== r && e(a, r, t);
                    });
                } else e(a, r, t);
                if (U.useDataAttrOptions === !0) {
                    var s = V.extend({
                        lng: "non",
                        lngs: [],
                        _origLng: "non"
                    }, t);
                    delete s.lng, delete s.lngs, delete s._origLng, n.data("i18n-options", s);
                }
            }
        }
        V.t = V.t || _, V.fn.i18n = function(e) {
            return this.each(function() {
                n(V(this), e);
                var t = V(this).find("[" + U.selectorAttr + "]");
                t.each(function() {
                    n(V(this), e);
                });
            });
        };
    }
    function w() {
        function e(e, n, t) {
            if (0 !== n.length) {
                var r = "text";
                if (0 === n.indexOf("[")) {
                    var a = n.split("]");
                    n = a[1], r = a[0].substr(1, a[0].length - 1);
                }
                n.indexOf(";") === n.length - 1 && (n = n.substr(0, n.length - 2)), "html" === r ? e.innerHTML = _(n, t) : "text" === r ? e.textContent = _(n, t) : "prepend" === r ? e.insertAdjacentHTML(_(n, t), "afterbegin") : "append" === r ? e.insertAdjacentHTML(_(n, t), "beforeend") : e.setAttribute(r, _(n, t));
            }
        }
        function n(n, t) {
            var r = n.getAttribute(U.selectorAttr);
            if (r || "undefined" == typeof r || r === !1 || (r = n.textContent || n.value), 
            r) {
                var a = n, o = n.getAttribute("i18n-target");
                if (o && (a = n.querySelector(o) || n), r.indexOf(";") >= 0) for (var i = r.split(";"), s = 0, u = i.length; s < u; s++) "" !== i[s] && e(a, i[s], t); else e(a, r, t);
            }
        }
        H.translateObject = function(e, t) {
            for (var r = e.querySelectorAll("[" + U.selectorAttr + "]"), a = 0, o = r.length; a < o; a++) n(r[a], t);
        };
    }
    function O(e, n, t, r) {
        if (!e) return e;
        if (r = r || n, e.indexOf(r.interpolationPrefix || U.interpolationPrefix) < 0) return e;
        var a = r.interpolationPrefix ? W.regexEscape(r.interpolationPrefix) : U.interpolationPrefixEscaped, o = r.interpolationSuffix ? W.regexEscape(r.interpolationSuffix) : U.interpolationSuffixEscaped, i = r.keyseparator || U.keyseparator, s = n.replace && "object" == typeof n.replace ? n.replace : n, u = new RegExp([ a, "(.+?)", "(HTML)?", o ].join(""), "g"), l = r.escapeInterpolation || U.escapeInterpolation;
        return e.replace(u, function(e, n, t) {
            for (var r = s, a = n; a.indexOf(i) >= 0 && "object" == typeof r && r; ) {
                var o = a.slice(0, a.indexOf(i));
                a = a.slice(a.indexOf(i) + 1), r = r[o];
            }
            if (r && "object" == typeof r && r.hasOwnProperty(a)) {
                r[a];
                return l && !t ? W.escape(r[a]) : r[a];
            }
            return e;
        });
    }
    function N(e, n) {
        var t = ",", r = "{", a = "}", o = W.extend({}, n);
        for (delete o.postProcess, delete o.isFallbackLookup; e.indexOf(U.reusePrefix) != -1 && (D++, 
        !(D > U.maxRecursion)); ) {
            var i = e.lastIndexOf(U.reusePrefix), s = e.indexOf(U.reuseSuffix, i) + U.reuseSuffix.length, u = e.substring(i, s), l = u.replace(U.reusePrefix, "").replace(U.reuseSuffix, "");
            if (s <= i) return W.error("there is an missing closing in following translation value", e), 
            "";
            if (l.indexOf(t) != -1) {
                var f = l.indexOf(t);
                if (l.indexOf(r, f) != -1 && l.indexOf(a, f) != -1) {
                    var c = l.indexOf(r, f), p = l.indexOf(a, c) + a.length;
                    try {
                        o = W.extend(o, JSON.parse(l.substring(c, p))), l = l.substring(0, f);
                    } catch (d) {}
                }
            }
            var g = E(l, o);
            e = e.replace(u, W.regexReplacementEscape(g));
        }
        return e;
    }
    function j(e) {
        return e.context && ("string" == typeof e.context || "number" == typeof e.context);
    }
    function P(e, n) {
        return void 0 !== e.count && "string" != typeof e.count;
    }
    function C(e) {
        return void 0 !== e.indefinite_article && "string" != typeof e.indefinite_article && e.indefinite_article;
    }
    function T(e, n) {
        n = n || {};
        var t = A(e, n), r = F(e, n);
        return void 0 !== r || r === t;
    }
    function _(e, n) {
        return B ? (D = 0, E.apply(null, arguments)) : (W.log("i18next not finished initialization. you might have called t function before loading resources finished."), 
        n && n.defaultValue ? n.detaultValue : "");
    }
    function A(e, n) {
        return void 0 !== n.defaultValue ? n.defaultValue : e;
    }
    function M() {
        for (var e = [], n = 1; n < arguments.length; n++) e.push(arguments[n]);
        return {
            postProcess: "sprintf",
            sprintf: e
        };
    }
    function E(e, n) {
        if ("undefined" != typeof n && "object" != typeof n ? "sprintf" === U.shortcutFunction ? n = M.apply(null, arguments) : "defaultValue" === U.shortcutFunction && (n = {
            defaultValue: n
        }) : n = n || {}, "object" == typeof U.defaultVariables && (n = W.extend({}, U.defaultVariables, n)), 
        void 0 === e || null === e || "" === e) return "";
        "number" == typeof e && (e = String(e)), "string" == typeof e && (e = [ e ]);
        var t = e[0];
        if (e.length > 1) for (var r = 0; r < e.length && (t = e[r], !T(t, n)); r++) ;
        var a, o = A(t, n), i = F(t, n), s = n.nsseparator || U.nsseparator, u = n.lng ? W.toLanguages(n.lng, n.fallbackLng) : K, l = n.ns || U.ns.defaultNs;
        t.indexOf(s) > -1 && (a = t.split(s), l = a[0], t = a[1]), void 0 === i && U.sendMissing && "function" == typeof U.missingKeyHandler && (n.lng ? U.missingKeyHandler(u[0], l, t, o, u) : U.missingKeyHandler(U.lng, l, t, o, u));
        var f, c, p;
        if (f = "string" == typeof U.postProcess && "" !== U.postProcess ? [ U.postProcess ] : "array" == typeof U.postProcess || "object" == typeof U.postProcess ? U.postProcess : [], 
        "string" == typeof n.postProcess && "" !== n.postProcess ? f = f.concat([ n.postProcess ]) : "array" != typeof n.postProcess && "object" != typeof n.postProcess || (f = f.concat(n.postProcess)), 
        void 0 !== i && f.length) for (p = 0; p < f.length; p += 1) c = f[p], ee[c] && (i = ee[c](i, t, n));
        var d = o;
        if (o.indexOf(s) > -1 && (a = o.split(s), d = a[1]), d === t && U.parseMissingKey && (o = U.parseMissingKey(o)), 
        void 0 === i && (o = O(o, n), o = N(o, n), f.length)) for (i = A(t, n), p = 0; p < f.length; p += 1) c = f[p], 
        ee[c] && (i = ee[c](i, t, n));
        return void 0 !== i ? i : o;
    }
    function F(e, n) {
        n = n || {};
        var t, r, a = A(e, n), o = K;
        if (!z) return a;
        if ("cimode" === o[0].toLowerCase()) return a;
        if (n.lngs && (o = n.lngs), n.lng && (o = W.toLanguages(n.lng, n.fallbackLng), !z[o[0]])) {
            var i = U.getAsync;
            U.getAsync = !1, H.sync.load(o, U, function(e, n) {
                W.extend(z, n), U.getAsync = i;
            });
        }
        var s = n.ns || U.ns.defaultNs, u = n.nsseparator || U.nsseparator;
        if (e.indexOf(u) > -1) {
            var l = e.split(u);
            s = l[0], e = l[1];
        }
        if (j(n)) {
            t = W.extend({}, n), delete t.context, t.defaultValue = U.contextNotFound;
            var f = s + u + e + "_" + n.context;
            if (r = _(f, t), r != U.contextNotFound) return O(r, {
                context: n.context
            });
        }
        if (P(n, o[0])) {
            t = W.extend({
                lngs: [ o[0] ]
            }, n), delete t.count, t._origLng = t._origLng || t.lng || o[0], delete t.lng, t.defaultValue = U.pluralNotFound;
            var c;
            if (Z.needsPlural(o[0], n.count)) {
                c = s + u + e + U.pluralSuffix;
                var p = Z.get(o[0], n.count);
                p >= 0 ? c = c + "_" + p : 1 === p && (c = s + u + e);
            } else c = s + u + e;
            if (r = _(c, t), r != U.pluralNotFound) return O(r, {
                count: n.count,
                interpolationPrefix: n.interpolationPrefix,
                interpolationSuffix: n.interpolationSuffix
            });
            if (!(o.length > 1)) return t.lng = t._origLng, delete t._origLng, r = _(s + u + e, t), 
            O(r, {
                count: n.count,
                interpolationPrefix: n.interpolationPrefix,
                interpolationSuffix: n.interpolationSuffix
            });
            var d = o.slice();
            if (d.shift(), n = W.extend(n, {
                lngs: d
            }), n._origLng = t._origLng, delete n.lng, r = _(s + u + e, n), r != U.pluralNotFound) return r;
        }
        if (C(n)) {
            var g = W.extend({}, n);
            delete g.indefinite_article, g.defaultValue = U.indefiniteNotFound;
            var h = s + u + e + (n.count && !P(n, o[0]) || !n.count ? U.indefiniteSuffix : "");
            if (r = _(h, g), r != U.indefiniteNotFound) return r;
        }
        for (var y, m = n.keyseparator || U.keyseparator, v = e.split(m), x = 0, b = o.length; x < b && void 0 === y; x++) {
            for (var k = o[x], L = 0, S = z[k] && z[k][s]; v[L]; ) S = S && S[v[L]], L++;
            if (void 0 !== S && (!U.showKeyIfEmpty || "" !== S)) {
                var w = Object.prototype.toString.apply(S);
                if ("string" == typeof S) S = O(S, n), S = N(S, n); else if ("[object Array]" !== w || U.returnObjectTrees || n.returnObjectTrees) {
                    if (null === S && U.fallbackOnNull === !0) S = void 0; else if (null !== S) if (U.returnObjectTrees || n.returnObjectTrees) {
                        if ("[object Number]" !== w && "[object Function]" !== w && "[object RegExp]" !== w) {
                            var T = "[object Array]" === w ? [] : {};
                            W.each(S, function(t) {
                                T[t] = E(s + u + e + m + t, n);
                            }), S = T;
                        }
                    } else U.objectTreeKeyHandler && "function" == typeof U.objectTreeKeyHandler ? S = U.objectTreeKeyHandler(e, S, k, s, n) : (S = "key '" + s + ":" + e + " (" + k + ")' returned an object instead of string.", 
                    W.log(S));
                } else S = S.join("\n"), S = O(S, n), S = N(S, n);
                "string" == typeof S && "" === S.trim() && U.fallbackOnEmpty === !0 && (S = void 0), 
                y = S;
            }
        }
        if (void 0 === y && !n.isFallbackLookup && (U.fallbackToDefaultNS === !0 || U.fallbackNS && U.fallbackNS.length > 0)) {
            if (n.isFallbackLookup = !0, U.fallbackNS.length) {
                for (var M = 0, R = U.fallbackNS.length; M < R; M++) if (y = F(U.fallbackNS[M] + u + e, n), 
                y || "" === y && U.fallbackOnEmpty === !1) {
                    var I = y.indexOf(u) > -1 ? y.split(u)[1] : y, V = a.indexOf(u) > -1 ? a.split(u)[1] : a;
                    if (I !== V) break;
                }
            } else n.ns = U.ns.defaultNs, y = F(e, n);
            n.isFallbackLookup = !1;
        }
        return y;
    }
    function R() {
        var e, n = U.lngWhitelist || [], t = [];
        if ("undefined" != typeof window && !function() {
            for (var e = window.location.search.substring(1), n = e.split("&"), r = 0; r < n.length; r++) {
                var a = n[r].indexOf("=");
                if (a > 0) {
                    var o = n[r].substring(0, a);
                    o == U.detectLngQS && t.push(n[r].substring(a + 1));
                }
            }
        }(), U.useCookie && "undefined" != typeof document) {
            var r = W.cookie.read(U.cookieName);
            r && t.push(r);
        }
        if (U.detectLngFromLocalStorage && "undefined" != typeof window && window.localStorage) {
            var a = W.localStorage.getItem("i18next_lng");
            a && t.push(a);
        }
        if ("undefined" != typeof navigator) {
            if (navigator.languages) for (var o = 0; o < navigator.languages.length; o++) t.push(navigator.languages[o]);
            navigator.userLanguage && t.push(navigator.userLanguage), navigator.language && t.push(navigator.language);
        }
        return function() {
            for (var r = 0; r < t.length; r++) {
                var a = t[r];
                if (a.indexOf("-") > -1) {
                    var o = a.split("-");
                    a = U.lowerCaseLng ? o[0].toLowerCase() + "-" + o[1].toLowerCase() : o[0].toLowerCase() + "-" + o[1].toUpperCase();
                }
                if (0 === n.length || n.indexOf(a) > -1) {
                    e = a;
                    break;
                }
            }
        }(), e || (e = U.fallbackLng[0]), e;
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        "use strict";
        if (null == this) throw new TypeError();
        var n = Object(this), t = n.length >>> 0;
        if (0 === t) return -1;
        var r = 0;
        if (arguments.length > 0 && (r = Number(arguments[1]), r != r ? r = 0 : 0 != r && r != 1 / 0 && r != -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), 
        r >= t) return -1;
        for (var a = r >= 0 ? r : Math.max(t - Math.abs(r), 0); a < t; a++) if (a in n && n[a] === e) return a;
        return -1;
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(e) {
        "use strict";
        if (null == this) throw new TypeError();
        var n = Object(this), t = n.length >>> 0;
        if (0 === t) return -1;
        var r = t;
        arguments.length > 1 && (r = Number(arguments[1]), r != r ? r = 0 : 0 != r && r != 1 / 0 && r != -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
        for (var a = r >= 0 ? Math.min(r, t - 1) : t - Math.abs(r); a >= 0; a--) if (a in n && n[a] === e) return a;
        return -1;
    }), "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    });
    var I, V = e.jQuery || e.Zepto, H = {}, z = {}, D = 0, K = [], B = !1, G = {}, q = null;
    "undefined" != typeof module && module.exports ? module.exports = H : (V && (V.i18n = V.i18n || H), 
    e.i18n && (q = e.i18n), e.i18n = H), G = {
        load: function(e, n, t) {
            n.useLocalStorage ? G._loadLocal(e, n, function(r, a) {
                for (var o = [], i = 0, s = e.length; i < s; i++) a[e[i]] || o.push(e[i]);
                o.length > 0 ? G._fetch(o, n, function(e, n) {
                    W.extend(a, n), G._storeLocal(n), t(e, a);
                }) : t(r, a);
            }) : G._fetch(e, n, function(e, n) {
                t(e, n);
            });
        },
        _loadLocal: function(e, n, t) {
            var r = {}, a = new Date().getTime();
            if (window.localStorage) {
                var o = e.length;
                W.each(e, function(e, i) {
                    var s = W.localStorage.getItem("res_" + i);
                    s && (s = JSON.parse(s), s.i18nStamp && s.i18nStamp + n.localStorageExpirationTime > a && (r[i] = s)), 
                    o--, 0 === o && t(null, r);
                });
            }
        },
        _storeLocal: function(e) {
            if (window.localStorage) for (var n in e) e[n].i18nStamp = new Date().getTime(), 
            W.localStorage.setItem("res_" + n, JSON.stringify(e[n]));
        },
        _fetch: function(e, n, t) {
            var r = n.ns, a = {};
            if (n.dynamicLoad) {
                var o = function(e, n) {
                    t(e, n);
                };
                if ("function" == typeof n.customLoad) n.customLoad(e, r.namespaces, n, o); else {
                    var i = O(n.resGetPath, {
                        lng: e.join("+"),
                        ns: r.namespaces.join("+")
                    });
                    W.ajax({
                        url: i,
                        cache: n.cache,
                        success: function(e, n, t) {
                            W.log("loaded: " + i), o(null, e);
                        },
                        error: function(e, n, t) {
                            W.log("failed loading: " + i), o("failed loading resource.json error: " + t);
                        },
                        dataType: "json",
                        async: n.getAsync,
                        timeout: n.ajaxTimeout
                    });
                }
            } else {
                var s, u = r.namespaces.length * e.length;
                W.each(r.namespaces, function(r, o) {
                    W.each(e, function(e, r) {
                        var i = function(e, n) {
                            e && (s = s || [], s.push(e)), a[r] = a[r] || {}, a[r][o] = n, u--, 0 === u && t(s, a);
                        };
                        "function" == typeof n.customLoad ? n.customLoad(r, o, n, i) : G._fetchOne(r, o, n, i);
                    });
                });
            }
        },
        _fetchOne: function(e, n, t, r) {
            var a = O(t.resGetPath, {
                lng: e,
                ns: n
            });
            W.ajax({
                url: a,
                cache: t.cache,
                success: function(e, n, t) {
                    W.log("loaded: " + a), r(null, e);
                },
                error: function(e, n, t) {
                    if (n && 200 == n || e && e.status && 200 == e.status) W.error("There is a typo in: " + a); else if (n && 404 == n || e && e.status && 404 == e.status) W.log("Does not exist: " + a); else {
                        var o = n ? n : e && e.status ? e.status : null;
                        W.log(o + " when loading " + a);
                    }
                    r(t, {});
                },
                dataType: "json",
                async: t.getAsync,
                timeout: t.ajaxTimeout,
                headers: t.headers
            });
        },
        postMissing: function(e, n, t, r, a) {
            var o = {};
            o[t] = r;
            var i = [];
            if ("fallback" === U.sendMissingTo && U.fallbackLng[0] !== !1) for (var s = 0; s < U.fallbackLng.length; s++) i.push({
                lng: U.fallbackLng[s],
                url: O(U.resPostPath, {
                    lng: U.fallbackLng[s],
                    ns: n
                })
            }); else if ("current" === U.sendMissingTo || "fallback" === U.sendMissingTo && U.fallbackLng[0] === !1) i.push({
                lng: e,
                url: O(U.resPostPath, {
                    lng: e,
                    ns: n
                })
            }); else if ("all" === U.sendMissingTo) for (var s = 0, u = a.length; s < u; s++) i.push({
                lng: a[s],
                url: O(U.resPostPath, {
                    lng: a[s],
                    ns: n
                })
            });
            for (var l = 0, f = i.length; l < f; l++) {
                var c = i[l];
                W.ajax({
                    url: c.url,
                    type: U.sendType,
                    data: o,
                    success: function(e, a, o) {
                        W.log("posted missing key '" + t + "' to: " + c.url);
                        for (var i = t.split("."), s = 0, u = z[c.lng][n]; i[s]; ) u = s === i.length - 1 ? u[i[s]] = r : u[i[s]] = u[i[s]] || {}, 
                        s++;
                    },
                    error: function(e, n, r) {
                        W.log("failed posting missing key '" + t + "' to: " + c.url);
                    },
                    dataType: "json",
                    async: U.postAsync,
                    timeout: U.ajaxTimeout
                });
            }
        },
        reload: k
    };
    var U = {
        lng: void 0,
        load: "all",
        preload: [],
        lowerCaseLng: !1,
        returnObjectTrees: !1,
        fallbackLng: [ "dev" ],
        fallbackNS: [],
        detectLngQS: "setLng",
        detectLngFromLocalStorage: !1,
        ns: {
            namespaces: [ "translation" ],
            defaultNs: "translation"
        },
        fallbackOnNull: !0,
        fallbackOnEmpty: !1,
        fallbackToDefaultNS: !1,
        showKeyIfEmpty: !1,
        nsseparator: ":",
        keyseparator: ".",
        selectorAttr: "data-i18n",
        debug: !1,
        resGetPath: "locales/__lng__/__ns__.json",
        resPostPath: "locales/add/__lng__/__ns__",
        getAsync: !0,
        postAsync: !0,
        resStore: void 0,
        useLocalStorage: !1,
        localStorageExpirationTime: 6048e5,
        dynamicLoad: !1,
        sendMissing: !1,
        sendMissingTo: "fallback",
        sendType: "POST",
        interpolationPrefix: "__",
        interpolationSuffix: "__",
        defaultVariables: !1,
        reusePrefix: "$t(",
        reuseSuffix: ")",
        pluralSuffix: "_plural",
        pluralNotFound: [ "plural_not_found", Math.random() ].join(""),
        contextNotFound: [ "context_not_found", Math.random() ].join(""),
        escapeInterpolation: !1,
        indefiniteSuffix: "_indefinite",
        indefiniteNotFound: [ "indefinite_not_found", Math.random() ].join(""),
        setJqueryExt: !0,
        defaultValueFromContent: !0,
        useDataAttrOptions: !1,
        cookieExpirationTime: void 0,
        useCookie: !0,
        cookieName: "i18next",
        cookieDomain: void 0,
        objectTreeKeyHandler: void 0,
        postProcess: void 0,
        parseMissingKey: void 0,
        missingKeyHandler: G.postMissing,
        ajaxTimeout: 0,
        shortcutFunction: "sprintf"
    }, J = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    }, $ = {
        create: function(e, n, t, r) {
            var a;
            if (t) {
                var o = new Date();
                o.setTime(o.getTime() + 60 * t * 1e3), a = "; expires=" + o.toGMTString();
            } else a = "";
            r = r ? "domain=" + r + ";" : "", document.cookie = e + "=" + n + a + ";" + r + "path=/";
        },
        read: function(e) {
            for (var n = e + "=", t = document.cookie.split(";"), r = 0; r < t.length; r++) {
                for (var a = t[r]; " " == a.charAt(0); ) a = a.substring(1, a.length);
                if (0 === a.indexOf(n)) return a.substring(n.length, a.length);
            }
            return null;
        },
        remove: function(e) {
            this.create(e, "", -1);
        }
    }, X = {
        create: function(e, n, t, r) {},
        read: function(e) {
            return null;
        },
        remove: function(e) {}
    }, W = {
        extend: V ? V.extend : n,
        deepExtend: t,
        each: V ? V.each : r,
        ajax: V ? V.ajax : "undefined" != typeof document ? o : function() {},
        cookie: "undefined" != typeof document ? $ : X,
        detectLanguage: R,
        escape: a,
        log: function(e) {
            U.debug && "undefined" != typeof console && console.log(e);
        },
        error: function(e) {
            "undefined" != typeof console && console.error(e);
        },
        getCountyIndexOfLng: function(e) {
            var n = 0;
            return "nb-NO" !== e && "nn-NO" !== e && "nb-no" !== e && "nn-no" !== e || (n = 1), 
            n;
        },
        toLanguages: function(e, n) {
            function t(e) {
                var n = e;
                if ("string" == typeof e && e.indexOf("-") > -1) {
                    var t = e.split("-");
                    n = U.lowerCaseLng ? t[0].toLowerCase() + "-" + t[1].toLowerCase() : t[0].toLowerCase() + "-" + t[1].toUpperCase();
                } else n = U.lowerCaseLng ? e.toLowerCase() : e;
                return n;
            }
            var r = this.log;
            n = n || U.fallbackLng, "string" == typeof n && (n = [ n ]);
            var a = [], o = U.lngWhitelist || !1, i = function(e) {
                !o || o.indexOf(e) > -1 ? a.push(e) : r("rejecting non-whitelisted language: " + e);
            };
            if ("string" == typeof e && e.indexOf("-") > -1) {
                var s = e.split("-");
                "unspecific" !== U.load && i(t(e)), "current" !== U.load && i(t(s[this.getCountyIndexOfLng(e)]));
            } else i(t(e));
            for (var u = 0; u < n.length; u++) a.indexOf(n[u]) === -1 && n[u] && a.push(t(n[u]));
            return a;
        },
        regexEscape: function(e) {
            return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        regexReplacementEscape: function(e) {
            return "string" == typeof e ? e.replace(/\$/g, "$$$$") : e;
        },
        localStorage: {
            setItem: function(e, n) {
                if (window.localStorage) try {
                    window.localStorage.setItem(e, n);
                } catch (t) {
                    W.log('failed to set value for key "' + e + '" to localStorage.');
                }
            },
            getItem: function(e, n) {
                if (window.localStorage) try {
                    return window.localStorage.getItem(e, n);
                } catch (t) {
                    return void W.log('failed to get value for key "' + e + '" from localStorage.');
                }
            }
        }
    };
    W.applyReplacement = O;
    var Q = [ [ "ach", "Acholi", [ 1, 2 ], 1 ], [ "af", "Afrikaans", [ 1, 2 ], 2 ], [ "ak", "Akan", [ 1, 2 ], 1 ], [ "am", "Amharic", [ 1, 2 ], 1 ], [ "an", "Aragonese", [ 1, 2 ], 2 ], [ "ar", "Arabic", [ 0, 1, 2, 3, 11, 100 ], 5 ], [ "arn", "Mapudungun", [ 1, 2 ], 1 ], [ "ast", "Asturian", [ 1, 2 ], 2 ], [ "ay", "Aymará", [ 1 ], 3 ], [ "az", "Azerbaijani", [ 1, 2 ], 2 ], [ "be", "Belarusian", [ 1, 2, 5 ], 4 ], [ "bg", "Bulgarian", [ 1, 2 ], 2 ], [ "bn", "Bengali", [ 1, 2 ], 2 ], [ "bo", "Tibetan", [ 1 ], 3 ], [ "br", "Breton", [ 1, 2 ], 1 ], [ "bs", "Bosnian", [ 1, 2, 5 ], 4 ], [ "ca", "Catalan", [ 1, 2 ], 2 ], [ "cgg", "Chiga", [ 1 ], 3 ], [ "cs", "Czech", [ 1, 2, 5 ], 6 ], [ "csb", "Kashubian", [ 1, 2, 5 ], 7 ], [ "cy", "Welsh", [ 1, 2, 3, 8 ], 8 ], [ "da", "Danish", [ 1, 2 ], 2 ], [ "de", "German", [ 1, 2 ], 2 ], [ "dev", "Development Fallback", [ 1, 2 ], 2 ], [ "dz", "Dzongkha", [ 1 ], 3 ], [ "el", "Greek", [ 1, 2 ], 2 ], [ "en", "English", [ 1, 2 ], 2 ], [ "eo", "Esperanto", [ 1, 2 ], 2 ], [ "es", "Spanish", [ 1, 2 ], 2 ], [ "es_ar", "Argentinean Spanish", [ 1, 2 ], 2 ], [ "et", "Estonian", [ 1, 2 ], 2 ], [ "eu", "Basque", [ 1, 2 ], 2 ], [ "fa", "Persian", [ 1 ], 3 ], [ "fi", "Finnish", [ 1, 2 ], 2 ], [ "fil", "Filipino", [ 1, 2 ], 1 ], [ "fo", "Faroese", [ 1, 2 ], 2 ], [ "fr", "French", [ 1, 2 ], 9 ], [ "fur", "Friulian", [ 1, 2 ], 2 ], [ "fy", "Frisian", [ 1, 2 ], 2 ], [ "ga", "Irish", [ 1, 2, 3, 7, 11 ], 10 ], [ "gd", "Scottish Gaelic", [ 1, 2, 3, 20 ], 11 ], [ "gl", "Galician", [ 1, 2 ], 2 ], [ "gu", "Gujarati", [ 1, 2 ], 2 ], [ "gun", "Gun", [ 1, 2 ], 1 ], [ "ha", "Hausa", [ 1, 2 ], 2 ], [ "he", "Hebrew", [ 1, 2 ], 2 ], [ "hi", "Hindi", [ 1, 2 ], 2 ], [ "hr", "Croatian", [ 1, 2, 5 ], 4 ], [ "hu", "Hungarian", [ 1, 2 ], 2 ], [ "hy", "Armenian", [ 1, 2 ], 2 ], [ "ia", "Interlingua", [ 1, 2 ], 2 ], [ "id", "Indonesian", [ 1 ], 3 ], [ "is", "Icelandic", [ 1, 2 ], 12 ], [ "it", "Italian", [ 1, 2 ], 2 ], [ "ja", "Japanese", [ 1 ], 3 ], [ "jbo", "Lojban", [ 1 ], 3 ], [ "jv", "Javanese", [ 0, 1 ], 13 ], [ "ka", "Georgian", [ 1 ], 3 ], [ "kk", "Kazakh", [ 1 ], 3 ], [ "km", "Khmer", [ 1 ], 3 ], [ "kn", "Kannada", [ 1, 2 ], 2 ], [ "ko", "Korean", [ 1 ], 3 ], [ "ku", "Kurdish", [ 1, 2 ], 2 ], [ "kw", "Cornish", [ 1, 2, 3, 4 ], 14 ], [ "ky", "Kyrgyz", [ 1 ], 3 ], [ "lb", "Letzeburgesch", [ 1, 2 ], 2 ], [ "ln", "Lingala", [ 1, 2 ], 1 ], [ "lo", "Lao", [ 1 ], 3 ], [ "lt", "Lithuanian", [ 1, 2, 10 ], 15 ], [ "lv", "Latvian", [ 1, 2, 0 ], 16 ], [ "mai", "Maithili", [ 1, 2 ], 2 ], [ "mfe", "Mauritian Creole", [ 1, 2 ], 1 ], [ "mg", "Malagasy", [ 1, 2 ], 1 ], [ "mi", "Maori", [ 1, 2 ], 1 ], [ "mk", "Macedonian", [ 1, 2 ], 17 ], [ "ml", "Malayalam", [ 1, 2 ], 2 ], [ "mn", "Mongolian", [ 1, 2 ], 2 ], [ "mnk", "Mandinka", [ 0, 1, 2 ], 18 ], [ "mr", "Marathi", [ 1, 2 ], 2 ], [ "ms", "Malay", [ 1 ], 3 ], [ "mt", "Maltese", [ 1, 2, 11, 20 ], 19 ], [ "nah", "Nahuatl", [ 1, 2 ], 2 ], [ "nap", "Neapolitan", [ 1, 2 ], 2 ], [ "nb", "Norwegian Bokmal", [ 1, 2 ], 2 ], [ "ne", "Nepali", [ 1, 2 ], 2 ], [ "nl", "Dutch", [ 1, 2 ], 2 ], [ "nn", "Norwegian Nynorsk", [ 1, 2 ], 2 ], [ "no", "Norwegian", [ 1, 2 ], 2 ], [ "nso", "Northern Sotho", [ 1, 2 ], 2 ], [ "oc", "Occitan", [ 1, 2 ], 1 ], [ "or", "Oriya", [ 2, 1 ], 2 ], [ "pa", "Punjabi", [ 1, 2 ], 2 ], [ "pap", "Papiamento", [ 1, 2 ], 2 ], [ "pl", "Polish", [ 1, 2, 5 ], 7 ], [ "pms", "Piemontese", [ 1, 2 ], 2 ], [ "ps", "Pashto", [ 1, 2 ], 2 ], [ "pt", "Portuguese", [ 1, 2 ], 2 ], [ "pt_br", "Brazilian Portuguese", [ 1, 2 ], 2 ], [ "rm", "Romansh", [ 1, 2 ], 2 ], [ "ro", "Romanian", [ 1, 2, 20 ], 20 ], [ "ru", "Russian", [ 1, 2, 5 ], 4 ], [ "sah", "Yakut", [ 1 ], 3 ], [ "sco", "Scots", [ 1, 2 ], 2 ], [ "se", "Northern Sami", [ 1, 2 ], 2 ], [ "si", "Sinhala", [ 1, 2 ], 2 ], [ "sk", "Slovak", [ 1, 2, 5 ], 6 ], [ "sl", "Slovenian", [ 5, 1, 2, 3 ], 21 ], [ "so", "Somali", [ 1, 2 ], 2 ], [ "son", "Songhay", [ 1, 2 ], 2 ], [ "sq", "Albanian", [ 1, 2 ], 2 ], [ "sr", "Serbian", [ 1, 2, 5 ], 4 ], [ "su", "Sundanese", [ 1 ], 3 ], [ "sv", "Swedish", [ 1, 2 ], 2 ], [ "sw", "Swahili", [ 1, 2 ], 2 ], [ "ta", "Tamil", [ 1, 2 ], 2 ], [ "te", "Telugu", [ 1, 2 ], 2 ], [ "tg", "Tajik", [ 1, 2 ], 1 ], [ "th", "Thai", [ 1 ], 3 ], [ "ti", "Tigrinya", [ 1, 2 ], 1 ], [ "tk", "Turkmen", [ 1, 2 ], 2 ], [ "tr", "Turkish", [ 1, 2 ], 1 ], [ "tt", "Tatar", [ 1 ], 3 ], [ "ug", "Uyghur", [ 1 ], 3 ], [ "uk", "Ukrainian", [ 1, 2, 5 ], 4 ], [ "ur", "Urdu", [ 1, 2 ], 2 ], [ "uz", "Uzbek", [ 1, 2 ], 1 ], [ "vi", "Vietnamese", [ 1 ], 3 ], [ "wa", "Walloon", [ 1, 2 ], 1 ], [ "wo", "Wolof", [ 1 ], 3 ], [ "yo", "Yoruba", [ 1, 2 ], 2 ], [ "zh", "Chinese", [ 1 ], 3 ] ], Y = {
        1: function(e) {
            return Number(e > 1);
        },
        2: function(e) {
            return Number(1 != e);
        },
        3: function(e) {
            return 0;
        },
        4: function(e) {
            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
        },
        5: function(e) {
            return Number(0 === e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5);
        },
        6: function(e) {
            return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2);
        },
        7: function(e) {
            return Number(1 == e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
        },
        8: function(e) {
            return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3);
        },
        9: function(e) {
            return Number(e >= 2);
        },
        10: function(e) {
            return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4);
        },
        11: function(e) {
            return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && e < 20 ? 2 : 3);
        },
        12: function(e) {
            return Number(e % 10 != 1 || e % 100 == 11);
        },
        13: function(e) {
            return Number(0 !== e);
        },
        14: function(e) {
            return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3);
        },
        15: function(e) {
            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
        },
        16: function(e) {
            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2);
        },
        17: function(e) {
            return Number(1 == e || e % 10 == 1 ? 0 : 1);
        },
        18: function(e) {
            return Number(0 == e ? 0 : 1 == e ? 1 : 2);
        },
        19: function(e) {
            return Number(1 == e ? 0 : 0 === e || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3);
        },
        20: function(e) {
            return Number(1 == e ? 0 : 0 === e || e % 100 > 0 && e % 100 < 20 ? 1 : 2);
        },
        21: function(e) {
            return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0);
        }
    }, Z = {
        rules: function() {
            var e, n = {};
            for (e = Q.length; e--; ) n[Q[e][0]] = {
                name: Q[e][1],
                numbers: Q[e][2],
                plurals: Y[Q[e][3]]
            };
            return n;
        }(),
        addRule: function(e, n) {
            Z.rules[e] = n;
        },
        setCurrentLng: function(e) {
            if (!Z.currentRule || Z.currentRule.lng !== e) {
                var n = e.split("-");
                Z.currentRule = {
                    lng: e,
                    rule: Z.rules[n[0]]
                };
            }
        },
        needsPlural: function(e, n) {
            var t, r = e.split("-");
            return t = Z.currentRule && Z.currentRule.lng === e ? Z.currentRule.rule : Z.rules[r[W.getCountyIndexOfLng(e)]], 
            !(t && t.numbers.length <= 1) && 1 !== this.get(e, n);
        },
        get: function(e, n) {
            function t(n, t) {
                var r;
                if (r = Z.currentRule && Z.currentRule.lng === e ? Z.currentRule.rule : Z.rules[n]) {
                    var a;
                    a = r.noAbs ? r.plurals(t) : r.plurals(Math.abs(t));
                    var o = r.numbers[a];
                    return 2 === r.numbers.length && 1 === r.numbers[0] && (2 === o ? o = -1 : 1 === o && (o = 1)), 
                    o;
                }
                return 1 === t ? "1" : "-1";
            }
            var r = e.split("-");
            return t(r[W.getCountyIndexOfLng(e)], n);
        }
    }, ee = {}, ne = function(e, n) {
        ee[e] = n;
    }, te = function() {
        function e(e) {
            return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
        }
        function n(e, n) {
            for (var t = []; n > 0; t[--n] = e) ;
            return t.join("");
        }
        var t = function() {
            return t.cache.hasOwnProperty(arguments[0]) || (t.cache[arguments[0]] = t.parse(arguments[0])), 
            t.format.call(null, t.cache[arguments[0]], arguments);
        };
        return t.format = function(t, r) {
            var a, o, i, s, u, l, f, c = 1, p = t.length, d = "", g = [];
            for (o = 0; o < p; o++) if (d = e(t[o]), "string" === d) g.push(t[o]); else if ("array" === d) {
                if (s = t[o], s[2]) for (a = r[c], i = 0; i < s[2].length; i++) {
                    if (!a.hasOwnProperty(s[2][i])) throw te('[sprintf] property "%s" does not exist', s[2][i]);
                    a = a[s[2][i]];
                } else a = s[1] ? r[s[1]] : r[c++];
                if (/[^s]/.test(s[8]) && "number" != e(a)) throw te("[sprintf] expecting number but found %s", e(a));
                switch (s[8]) {
                  case "b":
                    a = a.toString(2);
                    break;

                  case "c":
                    a = String.fromCharCode(a);
                    break;

                  case "d":
                    a = parseInt(a, 10);
                    break;

                  case "e":
                    a = s[7] ? a.toExponential(s[7]) : a.toExponential();
                    break;

                  case "f":
                    a = s[7] ? parseFloat(a).toFixed(s[7]) : parseFloat(a);
                    break;

                  case "o":
                    a = a.toString(8);
                    break;

                  case "s":
                    a = (a = String(a)) && s[7] ? a.substring(0, s[7]) : a;
                    break;

                  case "u":
                    a = Math.abs(a);
                    break;

                  case "x":
                    a = a.toString(16);
                    break;

                  case "X":
                    a = a.toString(16).toUpperCase();
                }
                a = /[def]/.test(s[8]) && s[3] && a >= 0 ? "+" + a : a, l = s[4] ? "0" == s[4] ? "0" : s[4].charAt(1) : " ", 
                f = s[6] - String(a).length, u = s[6] ? n(l, f) : "", g.push(s[5] ? a + u : u + a);
            }
            return g.join("");
        }, t.cache = {}, t.parse = function(e) {
            for (var n = e, t = [], r = [], a = 0; n; ) {
                if (null !== (t = /^[^\x25]+/.exec(n))) r.push(t[0]); else if (null !== (t = /^\x25{2}/.exec(n))) r.push("%"); else {
                    if (null === (t = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(n))) throw "[sprintf] huh?";
                    if (t[2]) {
                        a |= 1;
                        var o = [], i = t[2], s = [];
                        if (null === (s = /^([a-z_][a-z_\d]*)/i.exec(i))) throw "[sprintf] huh?";
                        for (o.push(s[1]); "" !== (i = i.substring(s[0].length)); ) if (null !== (s = /^\.([a-z_][a-z_\d]*)/i.exec(i))) o.push(s[1]); else {
                            if (null === (s = /^\[(\d+)\]/.exec(i))) throw "[sprintf] huh?";
                            o.push(s[1]);
                        }
                        t[2] = o;
                    } else a |= 2;
                    if (3 === a) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                    r.push(t);
                }
                n = n.substring(t[0].length);
            }
            return r;
        }, t;
    }(), re = function(e, n) {
        return n.unshift(e), te.apply(null, n);
    };
    ne("sprintf", function(e, n, t) {
        return t.sprintf ? "[object Array]" === Object.prototype.toString.apply(t.sprintf) ? re(e, t.sprintf) : "object" == typeof t.sprintf ? te(e, t.sprintf) : e : e;
    }), H.init = i, H.isInitialized = s, H.setLng = v, H.preload = u, H.addResourceBundle = l, 
    H.hasResourceBundle = f, H.getResourceBundle = c, H.addResource = d, H.addResources = g, 
    H.removeResourceBundle = p, H.loadNamespace = y, H.loadNamespaces = m, H.setDefaultNamespace = h, 
    H.t = _, H.translate = _, H.exists = T, H.detectLanguage = W.detectLanguage, H.pluralExtensions = Z, 
    H.sync = G, H.functions = W, H.lng = x, H.dir = b, H.addPostProcessor = ne, H.applyReplacement = W.applyReplacement, 
    H.options = U, H.noConflict = L;
}("undefined" == typeof exports ? window : exports);
!function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, 
        e.Clipboard = t();
    }
}(function() {
    return function t(e, n, o) {
        function r(c, a) {
            if (!n[c]) {
                if (!e[c]) {
                    var s = "function" == typeof require && require;
                    if (!a && s) return s(c, !0);
                    if (i) return i(c, !0);
                    var u = new Error("Cannot find module '" + c + "'");
                    throw u.code = "MODULE_NOT_FOUND", u;
                }
                var l = n[c] = {
                    exports: {}
                };
                e[c][0].call(l.exports, function(t) {
                    var n = e[c][1][t];
                    return r(n ? n : t);
                }, l, l.exports, t, e, n, o);
            }
            return n[c].exports;
        }
        for (var i = "function" == typeof require && require, c = 0; c < o.length; c++) r(o[c]);
        return r;
    }({
        1: [ function(t, e, n) {
            var o = t("matches-selector");
            e.exports = function(t, e, n) {
                for (var r = n ? t : t.parentNode; r && r !== document; ) {
                    if (o(r, e)) return r;
                    r = r.parentNode;
                }
            };
        }, {
            "matches-selector": 2
        } ],
        2: [ function(t, e, n) {
            function o(t, e) {
                if (i) return i.call(t, e);
                for (var n = t.parentNode.querySelectorAll(e), o = 0; o < n.length; ++o) if (n[o] == t) return !0;
                return !1;
            }
            var r = Element.prototype, i = r.matchesSelector || r.webkitMatchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector;
            e.exports = o;
        }, {} ],
        3: [ function(t, e, n) {
            function o(t, e, n, o) {
                var i = r.apply(this, arguments);
                return t.addEventListener(n, i), {
                    destroy: function() {
                        t.removeEventListener(n, i);
                    }
                };
            }
            function r(t, e, n, o) {
                return function(n) {
                    n.delegateTarget = i(n.target, e, !0), n.delegateTarget && o.call(t, n);
                };
            }
            var i = t("closest");
            e.exports = o;
        }, {
            closest: 1
        } ],
        4: [ function(t, e, n) {
            n.node = function(t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;
            }, n.nodeList = function(t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]));
            }, n.string = function(t) {
                return "string" == typeof t || t instanceof String;
            }, n["function"] = function(t) {
                var e = Object.prototype.toString.call(t);
                return "[object Function]" === e;
            };
        }, {} ],
        5: [ function(t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!a.string(e)) throw new TypeError("Second argument must be a String");
                if (!a["function"](n)) throw new TypeError("Third argument must be a Function");
                if (a.node(t)) return r(t, e, n);
                if (a.nodeList(t)) return i(t, e, n);
                if (a.string(t)) return c(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
            }
            function r(t, e, n) {
                return t.addEventListener(e, n), {
                    destroy: function() {
                        t.removeEventListener(e, n);
                    }
                };
            }
            function i(t, e, n) {
                return Array.prototype.forEach.call(t, function(t) {
                    t.addEventListener(e, n);
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(t, function(t) {
                            t.removeEventListener(e, n);
                        });
                    }
                };
            }
            function c(t, e, n) {
                return s(document.body, t, e, n);
            }
            var a = t("./is"), s = t("delegate");
            e.exports = o;
        }, {
            "./is": 4,
            delegate: 3
        } ],
        6: [ function(t, e, n) {
            function o(t) {
                var e;
                if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) t.focus(), t.setSelectionRange(0, t.value.length), 
                e = t.value; else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var n = window.getSelection(), o = document.createRange();
                    o.selectNodeContents(t), n.removeAllRanges(), n.addRange(o), e = n.toString();
                }
                return e;
            }
            e.exports = o;
        }, {} ],
        7: [ function(t, e, n) {
            function o() {}
            o.prototype = {
                on: function(t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({
                        fn: e,
                        ctx: n
                    }), this;
                },
                once: function(t, e, n) {
                    function o() {
                        r.off(t, o), e.apply(n, arguments);
                    }
                    var r = this;
                    return o._ = e, this.on(t, o, n);
                },
                emit: function(t) {
                    var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, r = n.length;
                    for (o; o < r; o++) n[o].fn.apply(n[o].ctx, e);
                    return this;
                },
                off: function(t, e) {
                    var n = this.e || (this.e = {}), o = n[t], r = [];
                    if (o && e) for (var i = 0, c = o.length; i < c; i++) o[i].fn !== e && o[i].fn._ !== e && r.push(o[i]);
                    return r.length ? n[t] = r : delete n[t], this;
                }
            }, e.exports = o;
        }, {} ],
        8: [ function(t, e, n) {
            "use strict";
            function o(t) {
                return t && t.__esModule ? t : {
                    "default": t
                };
            }
            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            n.__esModule = !0;
            var i = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                        Object.defineProperty(t, o.key, o);
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e;
                };
            }(), c = t("select"), a = o(c), s = function() {
                function t(e) {
                    r(this, t), this.resolveOptions(e), this.initSelection();
                }
                return t.prototype.resolveOptions = function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    this.action = t.action, this.emitter = t.emitter, this.target = t.target, this.text = t.text, 
                    this.trigger = t.trigger, this.selectedText = "";
                }, t.prototype.initSelection = function() {
                    if (this.text && this.target) throw new Error('Multiple attributes declared, use either "target" or "text"');
                    if (this.text) this.selectFake(); else {
                        if (!this.target) throw new Error('Missing required attributes, use either "target" or "text"');
                        this.selectTarget();
                    }
                }, t.prototype.selectFake = function() {
                    var t = this;
                    this.removeFake(), this.fakeHandler = document.body.addEventListener("click", function() {
                        return t.removeFake();
                    }), this.fakeElem = document.createElement("textarea"), this.fakeElem.style.position = "absolute", 
                    this.fakeElem.style.left = "-9999px", this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px", 
                    this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), 
                    this.selectedText = a["default"](this.fakeElem), this.copyText();
                }, t.prototype.removeFake = function() {
                    this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null), 
                    this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null);
                }, t.prototype.selectTarget = function() {
                    this.selectedText = a["default"](this.target), this.copyText();
                }, t.prototype.copyText = function() {
                    var t = void 0;
                    try {
                        t = document.execCommand(this.action);
                    } catch (e) {
                        t = !1;
                    }
                    this.handleResult(t);
                }, t.prototype.handleResult = function(t) {
                    t ? this.emitter.emit("success", {
                        action: this.action,
                        text: this.selectedText,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this)
                    }) : this.emitter.emit("error", {
                        action: this.action,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this)
                    });
                }, t.prototype.clearSelection = function() {
                    this.target && this.target.blur(), window.getSelection().removeAllRanges();
                }, t.prototype.destroy = function() {
                    this.removeFake();
                }, i(t, [ {
                    key: "action",
                    set: function() {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                        if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    },
                    get: function() {
                        return this._action;
                    }
                }, {
                    key: "target",
                    set: function(t) {
                        if (void 0 !== t) {
                            if (!t || "object" != typeof t || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                            this._target = t;
                        }
                    },
                    get: function() {
                        return this._target;
                    }
                } ]), t;
            }();
            n["default"] = s, e.exports = n["default"];
        }, {
            select: 6
        } ],
        9: [ function(t, e, n) {
            "use strict";
            function o(t) {
                return t && t.__esModule ? t : {
                    "default": t
                };
            }
            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
            }
            function c(t, e) {
                var n = "data-clipboard-" + t;
                if (e.hasAttribute(n)) return e.getAttribute(n);
            }
            n.__esModule = !0;
            var a = t("./clipboard-action"), s = o(a), u = t("tiny-emitter"), l = o(u), f = t("good-listener"), d = o(f), h = function(t) {
                function e(n, o) {
                    r(this, e), t.call(this), this.resolveOptions(o), this.listenClick(n);
                }
                return i(e, t), e.prototype.resolveOptions = function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, 
                    this.text = "function" == typeof t.text ? t.text : this.defaultText;
                }, e.prototype.listenClick = function(t) {
                    var e = this;
                    this.listener = d["default"](t, "click", function(t) {
                        return e.onClick(t);
                    });
                }, e.prototype.onClick = function(t) {
                    var e = t.delegateTarget || t.currentTarget;
                    this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new s["default"]({
                        action: this.action(e),
                        target: this.target(e),
                        text: this.text(e),
                        trigger: e,
                        emitter: this
                    });
                }, e.prototype.defaultAction = function(t) {
                    return c("action", t);
                }, e.prototype.defaultTarget = function(t) {
                    var e = c("target", t);
                    if (e) return document.querySelector(e);
                }, e.prototype.defaultText = function(t) {
                    return c("text", t);
                }, e.prototype.destroy = function() {
                    this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), 
                    this.clipboardAction = null);
                }, e;
            }(l["default"]);
            n["default"] = h, e.exports = n["default"];
        }, {
            "./clipboard-action": 8,
            "good-listener": 5,
            "tiny-emitter": 7
        } ]
    }, {}, [ 9 ])(9);
});
(function() {
    function n(n, r, e) {
        for (var t = (e || 0) - 1, o = n ? n.length : 0; ++t < o; ) if (n[t] === r) return t;
        return -1;
    }
    function r(r, e) {
        var t = typeof e;
        if (r = r.cache, "boolean" == t || null == e) return r[e] ? 0 : -1;
        "number" != t && "string" != t && (t = "object");
        var o = "number" == t ? e : _ + e;
        return r = (r = r[t]) && r[o], "object" == t ? r && n(r, e) > -1 ? 0 : -1 : r ? 0 : -1;
    }
    function e(n) {
        var r = this.cache, e = typeof n;
        if ("boolean" == e || null == n) r[n] = !0; else {
            "number" != e && "string" != e && (e = "object");
            var t = "number" == e ? n : _ + n, o = r[e] || (r[e] = {});
            "object" == e ? (o[t] || (o[t] = [])).push(n) : o[t] = !0;
        }
    }
    function t(n) {
        return n.charCodeAt(0);
    }
    function o(n, r) {
        for (var e = n.criteria, t = r.criteria, o = -1, u = e.length; ++o < u; ) {
            var a = e[o], i = t[o];
            if (a !== i) {
                if (a > i || "undefined" == typeof a) return 1;
                if (a < i || "undefined" == typeof i) return -1;
            }
        }
        return n.index - r.index;
    }
    function u(n) {
        var r = -1, t = n.length, o = n[0], u = n[t / 2 | 0], a = n[t - 1];
        if (o && "object" == typeof o && u && "object" == typeof u && a && "object" == typeof a) return !1;
        var i = l();
        i["false"] = i["null"] = i["true"] = i.undefined = !1;
        var c = l();
        for (c.array = n, c.cache = i, c.push = e; ++r < t; ) c.push(n[r]);
        return c;
    }
    function a(n) {
        return "\\" + Z[n];
    }
    function i() {
        return v.pop() || [];
    }
    function l() {
        return y.pop() || {
            array: null,
            cache: null,
            criteria: null,
            "false": !1,
            index: 0,
            "null": !1,
            number: null,
            object: null,
            push: null,
            string: null,
            "true": !1,
            undefined: !1,
            value: null
        };
    }
    function c(n) {
        return "function" != typeof n.toString && "string" == typeof (n + "");
    }
    function f(n) {
        n.length = 0, v.length < w && v.push(n);
    }
    function s(n) {
        var r = n.cache;
        r && s(r), n.array = n.cache = n.criteria = n.object = n.number = n.string = n.value = null, 
        y.length < w && y.push(n);
    }
    function p(n, r, e) {
        r || (r = 0), "undefined" == typeof e && (e = n ? n.length : 0);
        for (var t = -1, o = e - r || 0, u = Array(o < 0 ? 0 : o); ++t < o; ) u[t] = n[r + t];
        return u;
    }
    function h(e) {
        function v(n) {
            return n && "object" == typeof n && !st(n) && Ke.call(n, "__wrapped__") ? n : new y(n);
        }
        function y(n, r) {
            this.__chain__ = !!r, this.__wrapped__ = n;
        }
        function w(n) {
            function r() {
                if (t) {
                    var n = p(t);
                    Ue.apply(n, arguments);
                }
                if (this instanceof r) {
                    var u = rn(e.prototype), a = e.apply(u, n || arguments);
                    return Bn(a) ? a : u;
                }
                return e.apply(o, n || arguments);
            }
            var e = n[0], t = n[2], o = n[4];
            return ft(r, n), r;
        }
        function Z(n, r, e, t, o) {
            if (e) {
                var u = e(n);
                if ("undefined" != typeof u) return u;
            }
            var a = Bn(n);
            if (!a) return n;
            var l = $e.call(n);
            if (!G[l] || !lt.nodeClass && c(n)) return n;
            var s = at[l];
            switch (l) {
              case H:
              case W:
                return new s((+n));

              case K:
              case V:
                return new s(n);

              case M:
                return u = s(n.source, O.exec(n)), u.lastIndex = n.lastIndex, u;
            }
            var h = st(n);
            if (r) {
                var g = !t;
                t || (t = i()), o || (o = i());
                for (var v = t.length; v--; ) if (t[v] == n) return o[v];
                u = h ? s(n.length) : {};
            } else u = h ? p(n) : xt({}, n);
            return h && (Ke.call(n, "index") && (u.index = n.index), Ke.call(n, "input") && (u.input = n.input)), 
            r ? (t.push(n), o.push(u), (h ? wt : Ct)(n, function(n, a) {
                u[a] = Z(n, r, e, t, o);
            }), g && (f(t), f(o)), u) : u;
        }
        function rn(n, r) {
            return Bn(n) ? Xe(n) : {};
        }
        function en(n, r, e) {
            if ("function" != typeof n) return ue;
            if ("undefined" == typeof r || !("prototype" in n)) return n;
            var t = n.__bindData__;
            if ("undefined" == typeof t && (lt.funcNames && (t = !n.name), t = t || !lt.funcDecomp, 
            !t)) {
                var o = qe.call(n);
                lt.funcNames || (t = !S.test(o)), t || (t = N.test(o), ft(n, t));
            }
            if (t === !1 || t !== !0 && 1 & t[1]) return n;
            switch (e) {
              case 1:
                return function(e) {
                    return n.call(r, e);
                };

              case 2:
                return function(e, t) {
                    return n.call(r, e, t);
                };

              case 3:
                return function(e, t, o) {
                    return n.call(r, e, t, o);
                };

              case 4:
                return function(e, t, o, u) {
                    return n.call(r, e, t, o, u);
                };
            }
            return qr(n, r);
        }
        function tn(n) {
            function r() {
                var n = l ? a : this;
                if (o) {
                    var g = p(o);
                    Ue.apply(g, arguments);
                }
                if ((u || f) && (g || (g = p(arguments)), u && Ue.apply(g, u), f && g.length < i)) return t |= 16, 
                tn([ e, s ? t : t & -4, g, null, a, i ]);
                if (g || (g = arguments), c && (e = n[h]), this instanceof r) {
                    n = rn(e.prototype);
                    var v = e.apply(n, g);
                    return Bn(v) ? v : n;
                }
                return e.apply(n, g);
            }
            var e = n[0], t = n[1], o = n[2], u = n[3], a = n[4], i = n[5], l = 1 & t, c = 2 & t, f = 4 & t, s = 8 & t, h = e;
            return ft(r, n), r;
        }
        function on(e, t) {
            var o = -1, a = yn(), i = e ? e.length : 0, l = i >= m && a === n, c = [];
            if (l) {
                var f = u(t);
                f ? (a = r, t = f) : l = !1;
            }
            for (;++o < i; ) {
                var p = e[o];
                a(t, p) < 0 && c.push(p);
            }
            return l && s(t), c;
        }
        function an(n, r, e, t) {
            for (var o = (t || 0) - 1, u = n ? n.length : 0, a = []; ++o < u; ) {
                var i = n[o];
                if (i && "object" == typeof i && "number" == typeof i.length && (st(i) || mn(i))) {
                    r || (i = an(i, r, e));
                    var l = -1, c = i.length, f = a.length;
                    for (a.length += c; ++l < c; ) a[f++] = i[l];
                } else e || a.push(i);
            }
            return a;
        }
        function ln(n, r, e, t, o, u) {
            if (e) {
                var a = e(n, r);
                if ("undefined" != typeof a) return !!a;
            }
            if (n === r) return 0 !== n || 1 / n == 1 / r;
            var l = typeof n, s = typeof r;
            if (!(n !== n || n && Y[l] || r && Y[s])) return !1;
            if (null == n || null == r) return n === r;
            var p = $e.call(n), h = $e.call(r);
            if (p == B && (p = U), h == B && (h = U), p != h) return !1;
            switch (p) {
              case H:
              case W:
                return +n == +r;

              case K:
                return n != +n ? r != +r : 0 == n ? 1 / n == 1 / r : n == +r;

              case M:
              case V:
                return n == Ae(r);
            }
            var g = p == F;
            if (!g) {
                var v = Ke.call(n, "__wrapped__"), y = Ke.call(r, "__wrapped__");
                if (v || y) return ln(v ? n.__wrapped__ : n, y ? r.__wrapped__ : r, e, t, o, u);
                if (p != U || !lt.nodeClass && (c(n) || c(r))) return !1;
                var b = !lt.argsObject && mn(n) ? Oe : n.constructor, d = !lt.argsObject && mn(r) ? Oe : r.constructor;
                if (b != d && !($n(b) && b instanceof b && $n(d) && d instanceof d) && "constructor" in n && "constructor" in r) return !1;
            }
            var _ = !o;
            o || (o = i()), u || (u = i());
            for (var m = o.length; m--; ) if (o[m] == n) return u[m] == r;
            var w = 0;
            if (a = !0, o.push(n), u.push(r), g) {
                if (m = n.length, w = r.length, a = w == m, a || t) for (;w--; ) {
                    var x = m, j = r[w];
                    if (t) for (;x-- && !(a = ln(n[x], j, e, t, o, u)); ) ; else if (!(a = ln(n[w], j, e, t, o, u))) break;
                }
            } else kt(r, function(r, i, l) {
                if (Ke.call(l, i)) return w++, a = Ke.call(n, i) && ln(n[i], r, e, t, o, u);
            }), a && !t && kt(n, function(n, r, e) {
                if (Ke.call(e, r)) return a = --w > -1;
            });
            return o.pop(), u.pop(), _ && (f(o), f(u)), a;
        }
        function cn(n, r, e, t, o) {
            (st(r) ? or : Ct)(r, function(r, u) {
                var a, i, l = r, c = n[u];
                if (r && ((i = st(r)) || Pt(r))) {
                    for (var f = t.length; f--; ) if (a = t[f] == r) {
                        c = o[f];
                        break;
                    }
                    if (!a) {
                        var s;
                        e && (l = e(c, r), (s = "undefined" != typeof l) && (c = l)), s || (c = i ? st(c) ? c : [] : Pt(c) ? c : {}), 
                        t.push(r), o.push(c), s || cn(c, r, e, t, o);
                    }
                } else e && (l = e(c, r), "undefined" == typeof l && (l = r)), "undefined" != typeof l && (c = l);
                n[u] = c;
            });
        }
        function fn(n, r) {
            return n + We(ut() * (r - n + 1));
        }
        function sn(e, t, o) {
            var a = -1, l = yn(), c = e ? e.length : 0, p = [], h = !t && c >= m && l === n, g = o || h ? i() : p;
            if (h) {
                var v = u(g);
                l = r, g = v;
            }
            for (;++a < c; ) {
                var y = e[a], b = o ? o(y, a, e) : y;
                (t ? !a || g[g.length - 1] !== b : l(g, b) < 0) && ((o || h) && g.push(b), p.push(y));
            }
            return h ? (f(g.array), s(g)) : o && f(g), p;
        }
        function pn(n) {
            return function(r, e, t) {
                var o = {};
                if (e = v.createCallback(e, t, 3), st(r)) for (var u = -1, a = r.length; ++u < a; ) {
                    var i = r[u];
                    n(o, i, e(i, u, r), r);
                } else wt(r, function(r, t, u) {
                    n(o, r, e(r, t, u), u);
                });
                return o;
            };
        }
        function hn(n, r, e, t, o, u) {
            var a = 1 & r, i = 2 & r, l = 4 & r, c = 16 & r, f = 32 & r;
            if (!i && !$n(n)) throw new Ie();
            c && !e.length && (r &= -17, c = e = !1), f && !t.length && (r &= -33, f = t = !1);
            var s = n && n.__bindData__;
            if (s && s !== !0) return s = p(s), s[2] && (s[2] = p(s[2])), s[3] && (s[3] = p(s[3])), 
            !a || 1 & s[1] || (s[4] = o), !a && 1 & s[1] && (r |= 8), !l || 4 & s[1] || (s[5] = u), 
            c && Ue.apply(s[2] || (s[2] = []), e), f && Je.apply(s[3] || (s[3] = []), t), s[1] |= r, 
            hn.apply(null, s);
            var h = 1 == r || 17 === r ? w : tn;
            return h([ n, r, e, t, o, u ]);
        }
        function gn() {
            X.shadowedProps = D, X.array = X.bottom = X.loop = X.top = "", X.init = "iterable", 
            X.useHas = !0;
            for (var n, r = 0; n = arguments[r]; r++) for (var e in n) X[e] = n[e];
            var t = X.args;
            X.firstArg = /^[^,]+/.exec(t)[0];
            var o = Ce("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString", "return function(" + t + ") {\n" + ct(X) + "\n}");
            return o(en, q, Ne, Ke, d, mn, st, zn, X.keys, Re, Y, it, V, Te, $e);
        }
        function vn(n) {
            return bt[n];
        }
        function yn() {
            var r = (r = v.indexOf) === Cr ? n : r;
            return r;
        }
        function bn(n) {
            return "function" == typeof n && Be.test(n);
        }
        function dn(n) {
            var r, e;
            return !(!(n && $e.call(n) == U && (r = n.constructor, !$n(r) || r instanceof r)) || !lt.argsClass && mn(n) || !lt.nodeClass && c(n)) && (lt.ownLast ? (kt(n, function(n, r, t) {
                return e = Ke.call(t, r), !1;
            }), e !== !1) : (kt(n, function(n, r) {
                e = r;
            }), "undefined" == typeof e || Ke.call(n, e)));
        }
        function _n(n) {
            return dt[n];
        }
        function mn(n) {
            return n && "object" == typeof n && "number" == typeof n.length && $e.call(n) == B || !1;
        }
        function wn(n, r, e, t) {
            return "boolean" != typeof r && null != r && (t = e, e = r, r = !1), Z(n, r, "function" == typeof e && en(e, t, 1));
        }
        function xn(n, r, e) {
            return Z(n, !0, "function" == typeof r && en(r, e, 1));
        }
        function jn(n, r) {
            var e = rn(n);
            return r ? xt(e, r) : e;
        }
        function kn(n, r, e) {
            var t;
            return r = v.createCallback(r, e, 3), Ct(n, function(n, e, o) {
                if (r(n, e, o)) return t = e, !1;
            }), t;
        }
        function Cn(n, r, e) {
            var t;
            return r = v.createCallback(r, e, 3), En(n, function(n, e, o) {
                if (r(n, e, o)) return t = e, !1;
            }), t;
        }
        function Pn(n, r, e) {
            var t = [];
            kt(n, function(n, r) {
                t.push(r, n);
            });
            var o = t.length;
            for (r = en(r, e, 3); o-- && r(t[o--], t[o], n) !== !1; ) ;
            return n;
        }
        function En(n, r, e) {
            var t = ht(n), o = t.length;
            for (r = en(r, e, 3); o--; ) {
                var u = t[o];
                if (r(n[u], u, n) === !1) break;
            }
            return n;
        }
        function On(n) {
            var r = [];
            return kt(n, function(n, e) {
                $n(n) && r.push(e);
            }), r.sort();
        }
        function Sn(n, r) {
            return !!n && Ke.call(n, r);
        }
        function An(n) {
            for (var r = -1, e = ht(n), t = e.length, o = {}; ++r < t; ) {
                var u = e[r];
                o[n[u]] = u;
            }
            return o;
        }
        function In(n) {
            return n === !0 || n === !1 || n && "object" == typeof n && $e.call(n) == H || !1;
        }
        function Ln(n) {
            return n && "object" == typeof n && $e.call(n) == W || !1;
        }
        function Nn(n) {
            return n && 1 === n.nodeType || !1;
        }
        function Rn(n) {
            var r = !0;
            if (!n) return r;
            var e = $e.call(n), t = n.length;
            return e == F || e == V || (lt.argsClass ? e == B : mn(n)) || e == U && "number" == typeof t && $n(n.splice) ? !t : (Ct(n, function() {
                return r = !1;
            }), r);
        }
        function Tn(n, r, e, t) {
            return ln(n, r, "function" == typeof e && en(e, t, 2));
        }
        function Dn(n) {
            return Ze(n) && !nt(parseFloat(n));
        }
        function $n(n) {
            return "function" == typeof n;
        }
        function Bn(n) {
            return !(!n || !Y[typeof n]);
        }
        function Fn(n) {
            return Wn(n) && n != +n;
        }
        function Hn(n) {
            return null === n;
        }
        function Wn(n) {
            return "number" == typeof n || n && "object" == typeof n && $e.call(n) == K || !1;
        }
        function qn(n) {
            return n && Y[typeof n] && $e.call(n) == M || !1;
        }
        function zn(n) {
            return "string" == typeof n || n && "object" == typeof n && $e.call(n) == V || !1;
        }
        function Kn(n) {
            return "undefined" == typeof n;
        }
        function Un(n, r, e) {
            var t = {};
            return r = v.createCallback(r, e, 3), Ct(n, function(n, e, o) {
                t[e] = r(n, e, o);
            }), t;
        }
        function Mn(n) {
            var r = arguments, e = 2;
            if (!Bn(n)) return n;
            if ("number" != typeof r[2] && (e = r.length), e > 3 && "function" == typeof r[e - 2]) var t = en(r[--e - 1], r[e--], 2); else e > 2 && "function" == typeof r[e - 1] && (t = r[--e]);
            for (var o = p(arguments, 1, e), u = -1, a = i(), l = i(); ++u < e; ) cn(n, o[u], t, a, l);
            return f(a), f(l), n;
        }
        function Vn(n, r, e) {
            var t = {};
            if ("function" != typeof r) {
                var o = [];
                kt(n, function(n, r) {
                    o.push(r);
                }), o = on(o, an(arguments, !0, !1, 1));
                for (var u = -1, a = o.length; ++u < a; ) {
                    var i = o[u];
                    t[i] = n[i];
                }
            } else r = v.createCallback(r, e, 3), kt(n, function(n, e, o) {
                r(n, e, o) || (t[e] = n);
            });
            return t;
        }
        function Gn(n) {
            for (var r = -1, e = ht(n), t = e.length, o = we(t); ++r < t; ) {
                var u = e[r];
                o[r] = [ u, n[u] ];
            }
            return o;
        }
        function Jn(n, r, e) {
            var t = {};
            if ("function" != typeof r) for (var o = -1, u = an(arguments, !0, !1, 1), a = Bn(n) ? u.length : 0; ++o < a; ) {
                var i = u[o];
                i in n && (t[i] = n[i]);
            } else r = v.createCallback(r, e, 3), kt(n, function(n, e, o) {
                r(n, e, o) && (t[e] = n);
            });
            return t;
        }
        function Qn(n, r, e, t) {
            var o = st(n);
            if (null == e) if (o) e = []; else {
                var u = n && n.constructor, a = u && u.prototype;
                e = rn(a);
            }
            return r && (r = v.createCallback(r, t, 4), (o ? wt : Ct)(n, function(n, t, o) {
                return r(e, n, t, o);
            })), e;
        }
        function Xn(n) {
            for (var r = -1, e = ht(n), t = e.length, o = we(t); ++r < t; ) o[r] = n[e[r]];
            return o;
        }
        function Yn(n) {
            var r = arguments, e = -1, t = an(r, !0, !1, 1), o = r[2] && r[2][r[1]] === n ? 1 : t.length, u = we(o);
            for (lt.unindexedChars && zn(n) && (n = n.split("")); ++e < o; ) u[e] = n[t[e]];
            return u;
        }
        function Zn(n, r, e) {
            var t = -1, o = yn(), u = n ? n.length : 0, a = !1;
            return e = (e < 0 ? et(0, u + e) : e) || 0, st(n) ? a = o(n, r, e) > -1 : "number" == typeof u ? a = (zn(n) ? n.indexOf(r, e) : o(n, r, e)) > -1 : wt(n, function(n) {
                if (++t >= e) return !(a = n === r);
            }), a;
        }
        function nr(n, r, e) {
            var t = !0;
            if (r = v.createCallback(r, e, 3), st(n)) for (var o = -1, u = n.length; ++o < u && (t = !!r(n[o], o, n)); ) ; else wt(n, function(n, e, o) {
                return t = !!r(n, e, o);
            });
            return t;
        }
        function rr(n, r, e) {
            var t = [];
            if (r = v.createCallback(r, e, 3), st(n)) for (var o = -1, u = n.length; ++o < u; ) {
                var a = n[o];
                r(a, o, n) && t.push(a);
            } else wt(n, function(n, e, o) {
                r(n, e, o) && t.push(n);
            });
            return t;
        }
        function er(n, r, e) {
            if (r = v.createCallback(r, e, 3), !st(n)) {
                var t;
                return wt(n, function(n, e, o) {
                    if (r(n, e, o)) return t = n, !1;
                }), t;
            }
            for (var o = -1, u = n.length; ++o < u; ) {
                var a = n[o];
                if (r(a, o, n)) return a;
            }
        }
        function tr(n, r, e) {
            var t;
            return r = v.createCallback(r, e, 3), ur(n, function(n, e, o) {
                if (r(n, e, o)) return t = n, !1;
            }), t;
        }
        function or(n, r, e) {
            if (r && "undefined" == typeof e && st(n)) for (var t = -1, o = n.length; ++t < o && r(n[t], t, n) !== !1; ) ; else wt(n, r, e);
            return n;
        }
        function ur(n, r, e) {
            var t = n, o = n ? n.length : 0;
            if (r = r && "undefined" == typeof e ? r : en(r, e, 3), st(n)) for (;o-- && r(n[o], o, n) !== !1; ) ; else {
                if ("number" != typeof o) {
                    var u = ht(n);
                    o = u.length;
                } else lt.unindexedChars && zn(n) && (t = n.split(""));
                wt(n, function(n, e, a) {
                    return e = u ? u[--o] : --o, r(t[e], e, a);
                });
            }
            return n;
        }
        function ar(n, r) {
            var e = p(arguments, 2), t = -1, o = "function" == typeof r, u = n ? n.length : 0, a = we("number" == typeof u ? u : 0);
            return or(n, function(n) {
                a[++t] = (o ? r : n[r]).apply(n, e);
            }), a;
        }
        function ir(n, r, e) {
            var t = -1, o = n ? n.length : 0, u = we("number" == typeof o ? o : 0);
            if (r = v.createCallback(r, e, 3), st(n)) for (;++t < o; ) u[t] = r(n[t], t, n); else wt(n, function(n, e, o) {
                u[++t] = r(n, e, o);
            });
            return u;
        }
        function lr(n, r, e) {
            var o = -(1 / 0), u = o;
            if ("function" != typeof r && e && e[r] === n && (r = null), null == r && st(n)) for (var a = -1, i = n.length; ++a < i; ) {
                var l = n[a];
                l > u && (u = l);
            } else r = null == r && zn(n) ? t : v.createCallback(r, e, 3), wt(n, function(n, e, t) {
                var a = r(n, e, t);
                a > o && (o = a, u = n);
            });
            return u;
        }
        function cr(n, r, e) {
            var o = 1 / 0, u = o;
            if ("function" != typeof r && e && e[r] === n && (r = null), null == r && st(n)) for (var a = -1, i = n.length; ++a < i; ) {
                var l = n[a];
                l < u && (u = l);
            } else r = null == r && zn(n) ? t : v.createCallback(r, e, 3), wt(n, function(n, e, t) {
                var a = r(n, e, t);
                a < o && (o = a, u = n);
            });
            return u;
        }
        function fr(n, r, e, t) {
            var o = arguments.length < 3;
            if (r = v.createCallback(r, t, 4), st(n)) {
                var u = -1, a = n.length;
                for (o && (e = n[++u]); ++u < a; ) e = r(e, n[u], u, n);
            } else wt(n, function(n, t, u) {
                e = o ? (o = !1, n) : r(e, n, t, u);
            });
            return e;
        }
        function sr(n, r, e, t) {
            var o = arguments.length < 3;
            return r = v.createCallback(r, t, 4), ur(n, function(n, t, u) {
                e = o ? (o = !1, n) : r(e, n, t, u);
            }), e;
        }
        function pr(n, r, e) {
            return r = v.createCallback(r, e, 3), rr(n, function(n, e, t) {
                return !r(n, e, t);
            });
        }
        function hr(n, r, e) {
            if (n && "number" != typeof n.length ? n = Xn(n) : lt.unindexedChars && zn(n) && (n = n.split("")), 
            null == r || e) return n ? n[fn(0, n.length - 1)] : g;
            var t = gr(n);
            return t.length = tt(et(0, r), t.length), t;
        }
        function gr(n) {
            var r = -1, e = n ? n.length : 0, t = we("number" == typeof e ? e : 0);
            return or(n, function(n) {
                var e = fn(0, ++r);
                t[r] = t[e], t[e] = n;
            }), t;
        }
        function vr(n) {
            var r = n ? n.length : 0;
            return "number" == typeof r ? r : ht(n).length;
        }
        function yr(n, r, e) {
            var t;
            if (r = v.createCallback(r, e, 3), st(n)) for (var o = -1, u = n.length; ++o < u && !(t = r(n[o], o, n)); ) ; else wt(n, function(n, e, o) {
                return !(t = r(n, e, o));
            });
            return !!t;
        }
        function br(n, r, e) {
            var t = -1, u = st(r), a = n ? n.length : 0, c = we("number" == typeof a ? a : 0);
            for (u || (r = v.createCallback(r, e, 3)), or(n, function(n, e, o) {
                var a = c[++t] = l();
                u ? a.criteria = ir(r, function(r) {
                    return n[r];
                }) : (a.criteria = i())[0] = r(n, e, o), a.index = t, a.value = n;
            }), a = c.length, c.sort(o); a--; ) {
                var p = c[a];
                c[a] = p.value, u || f(p.criteria), s(p);
            }
            return c;
        }
        function dr(n) {
            return n && "number" == typeof n.length ? lt.unindexedChars && zn(n) ? n.split("") : p(n) : Xn(n);
        }
        function _r(n) {
            for (var r = -1, e = n ? n.length : 0, t = []; ++r < e; ) {
                var o = n[r];
                o && t.push(o);
            }
            return t;
        }
        function mr(n) {
            return on(n, an(arguments, !0, !0, 1));
        }
        function wr(n, r, e) {
            var t = -1, o = n ? n.length : 0;
            for (r = v.createCallback(r, e, 3); ++t < o; ) if (r(n[t], t, n)) return t;
            return -1;
        }
        function xr(n, r, e) {
            var t = n ? n.length : 0;
            for (r = v.createCallback(r, e, 3); t--; ) if (r(n[t], t, n)) return t;
            return -1;
        }
        function jr(n, r, e) {
            var t = 0, o = n ? n.length : 0;
            if ("number" != typeof r && null != r) {
                var u = -1;
                for (r = v.createCallback(r, e, 3); ++u < o && r(n[u], u, n); ) t++;
            } else if (t = r, null == t || e) return n ? n[0] : g;
            return p(n, 0, tt(et(0, t), o));
        }
        function kr(n, r, e, t) {
            return "boolean" != typeof r && null != r && (t = e, e = "function" != typeof r && t && t[r] === n ? null : r, 
            r = !1), null != e && (n = ir(n, e, t)), an(n, r);
        }
        function Cr(r, e, t) {
            if ("number" == typeof t) {
                var o = r ? r.length : 0;
                t = t < 0 ? et(0, o + t) : t || 0;
            } else if (t) {
                var u = Rr(r, e);
                return r[u] === e ? u : -1;
            }
            return n(r, e, t);
        }
        function Pr(n, r, e) {
            var t = 0, o = n ? n.length : 0;
            if ("number" != typeof r && null != r) {
                var u = o;
                for (r = v.createCallback(r, e, 3); u-- && r(n[u], u, n); ) t++;
            } else t = null == r || e ? 1 : r || t;
            return p(n, 0, tt(et(0, o - t), o));
        }
        function Er() {
            for (var e = [], t = -1, o = arguments.length, a = i(), l = yn(), c = l === n, p = i(); ++t < o; ) {
                var h = arguments[t];
                (st(h) || mn(h)) && (e.push(h), a.push(c && h.length >= m && u(t ? e[t] : p)));
            }
            var g = e[0], v = -1, y = g ? g.length : 0, b = [];
            n: for (;++v < y; ) {
                var d = a[0];
                if (h = g[v], (d ? r(d, h) : l(p, h)) < 0) {
                    for (t = o, (d || p).push(h); --t; ) if (d = a[t], (d ? r(d, h) : l(e[t], h)) < 0) continue n;
                    b.push(h);
                }
            }
            for (;o--; ) d = a[o], d && s(d);
            return f(a), f(p), b;
        }
        function Or(n, r, e) {
            var t = 0, o = n ? n.length : 0;
            if ("number" != typeof r && null != r) {
                var u = o;
                for (r = v.createCallback(r, e, 3); u-- && r(n[u], u, n); ) t++;
            } else if (t = r, null == t || e) return n ? n[o - 1] : g;
            return p(n, et(0, o - t));
        }
        function Sr(n, r, e) {
            var t = n ? n.length : 0;
            for ("number" == typeof e && (t = (e < 0 ? et(0, t + e) : tt(e, t - 1)) + 1); t--; ) if (n[t] === r) return t;
            return -1;
        }
        function Ar(n) {
            for (var r = arguments, e = 0, t = r.length, o = n ? n.length : 0; ++e < t; ) for (var u = -1, a = r[e]; ++u < o; ) n[u] === a && (Ge.call(n, u--, 1), 
            o--);
            return n;
        }
        function Ir(n, r, e) {
            n = +n || 0, e = "number" == typeof e ? e : +e || 1, null == r && (r = n, n = 0);
            for (var t = -1, o = et(0, Fe((r - n) / (e || 1))), u = we(o); ++t < o; ) u[t] = n, 
            n += e;
            return u;
        }
        function Lr(n, r, e) {
            var t = -1, o = n ? n.length : 0, u = [];
            for (r = v.createCallback(r, e, 3); ++t < o; ) {
                var a = n[t];
                r(a, t, n) && (u.push(a), Ge.call(n, t--, 1), o--);
            }
            return u;
        }
        function Nr(n, r, e) {
            if ("number" != typeof r && null != r) {
                var t = 0, o = -1, u = n ? n.length : 0;
                for (r = v.createCallback(r, e, 3); ++o < u && r(n[o], o, n); ) t++;
            } else t = null == r || e ? 1 : et(0, r);
            return p(n, t);
        }
        function Rr(n, r, e, t) {
            var o = 0, u = n ? n.length : o;
            for (e = e ? v.createCallback(e, t, 1) : ue, r = e(r); o < u; ) {
                var a = o + u >>> 1;
                e(n[a]) < r ? o = a + 1 : u = a;
            }
            return o;
        }
        function Tr() {
            return sn(an(arguments, !0, !0));
        }
        function Dr(n, r, e, t) {
            return "boolean" != typeof r && null != r && (t = e, e = "function" != typeof r && t && t[r] === n ? null : r, 
            r = !1), null != e && (e = v.createCallback(e, t, 3)), sn(n, r, e);
        }
        function $r(n) {
            return on(n, p(arguments, 1));
        }
        function Br() {
            for (var n = -1, r = arguments.length; ++n < r; ) {
                var e = arguments[n];
                if (st(e) || mn(e)) var t = t ? sn(on(t, e).concat(on(e, t))) : e;
            }
            return t || [];
        }
        function Fr() {
            for (var n = arguments.length > 1 ? arguments : arguments[0], r = -1, e = n ? lr(At(n, "length")) : 0, t = we(e < 0 ? 0 : e); ++r < e; ) t[r] = At(n, r);
            return t;
        }
        function Hr(n, r) {
            var e = -1, t = n ? n.length : 0, o = {};
            for (r || !t || st(n[0]) || (r = []); ++e < t; ) {
                var u = n[e];
                r ? o[u] = r[e] : u && (o[u[0]] = u[1]);
            }
            return o;
        }
        function Wr(n, r) {
            if (!$n(r)) throw new Ie();
            return function() {
                if (--n < 1) return r.apply(this, arguments);
            };
        }
        function qr(n, r) {
            return arguments.length > 2 ? hn(n, 17, p(arguments, 2), null, r) : hn(n, 1, null, null, r);
        }
        function zr(n) {
            for (var r = arguments.length > 1 ? an(arguments, !0, !1, 1) : On(n), e = -1, t = r.length; ++e < t; ) {
                var o = r[e];
                n[o] = hn(n[o], 1, null, null, n);
            }
            return n;
        }
        function Kr(n, r) {
            return arguments.length > 2 ? hn(r, 19, p(arguments, 2), null, n) : hn(r, 3, null, null, n);
        }
        function Ur() {
            for (var n = arguments, r = n.length; r--; ) if (!$n(n[r])) throw new Ie();
            return function() {
                for (var r = arguments, e = n.length; e--; ) r = [ n[e].apply(this, r) ];
                return r[0];
            };
        }
        function Mr(n, r) {
            return r = "number" == typeof r ? r : +r || n.length, hn(n, 4, null, null, null, r);
        }
        function Vr(n, r, e) {
            var t, o, u, a, i, l, c, f = 0, s = !1, p = !0;
            if (!$n(n)) throw new Ie();
            if (r = et(0, r) || 0, e === !0) {
                var h = !0;
                p = !1;
            } else Bn(e) && (h = e.leading, s = "maxWait" in e && (et(r, e.maxWait) || 0), p = "trailing" in e ? e.trailing : p);
            var v = function() {
                var e = r - (Lt() - a);
                if (e <= 0) {
                    o && He(o);
                    var s = c;
                    o = l = c = g, s && (f = Lt(), u = n.apply(i, t), l || o || (t = i = null));
                } else l = Ve(v, e);
            }, y = function() {
                l && He(l), o = l = c = g, (p || s !== r) && (f = Lt(), u = n.apply(i, t), l || o || (t = i = null));
            };
            return function() {
                if (t = arguments, a = Lt(), i = this, c = p && (l || !h), s === !1) var e = h && !l; else {
                    o || h || (f = a);
                    var g = s - (a - f), b = g <= 0;
                    b ? (o && (o = He(o)), f = a, u = n.apply(i, t)) : o || (o = Ve(y, g));
                }
                return b && l ? l = He(l) : l || r === s || (l = Ve(v, r)), e && (b = !0, u = n.apply(i, t)), 
                !b || l || o || (t = i = null), u;
            };
        }
        function Gr(n) {
            if (!$n(n)) throw new Ie();
            var r = p(arguments, 1);
            return Ve(function() {
                n.apply(g, r);
            }, 1);
        }
        function Jr(n, r) {
            if (!$n(n)) throw new Ie();
            var e = p(arguments, 2);
            return Ve(function() {
                n.apply(g, e);
            }, r);
        }
        function Qr(n, r) {
            if (!$n(n)) throw new Ie();
            var e = function() {
                var t = e.cache, o = r ? r.apply(this, arguments) : _ + arguments[0];
                return Ke.call(t, o) ? t[o] : t[o] = n.apply(this, arguments);
            };
            return e.cache = {}, e;
        }
        function Xr(n) {
            var r, e;
            if (!$n(n)) throw new Ie();
            return function() {
                return r ? e : (r = !0, e = n.apply(this, arguments), n = null, e);
            };
        }
        function Yr(n) {
            return hn(n, 16, p(arguments, 1));
        }
        function Zr(n) {
            return hn(n, 32, null, p(arguments, 1));
        }
        function ne(n, r, e) {
            var t = !0, o = !0;
            if (!$n(n)) throw new Ie();
            return e === !1 ? t = !1 : Bn(e) && (t = "leading" in e ? e.leading : t, o = "trailing" in e ? e.trailing : o), 
            J.leading = t, J.maxWait = r, J.trailing = o, Vr(n, r, J);
        }
        function re(n, r) {
            return hn(r, 16, [ n ]);
        }
        function ee(n) {
            return function() {
                return n;
            };
        }
        function te(n, r, e) {
            var t = typeof n;
            if (null == n || "function" == t) return en(n, r, e);
            if ("object" != t) return ce(n);
            var o = ht(n), u = o[0], a = n[u];
            return 1 != o.length || a !== a || Bn(a) ? function(r) {
                for (var e = o.length, t = !1; e-- && (t = ln(r[o[e]], n[o[e]], null, !0)); ) ;
                return t;
            } : function(n) {
                var r = n[u];
                return a === r && (0 !== a || 1 / a == 1 / r);
            };
        }
        function oe(n) {
            return null == n ? "" : Ae(n).replace(mt, vn);
        }
        function ue(n) {
            return n;
        }
        function ae(n, r, e) {
            var t = !0, o = r && On(r);
            r && (e || o.length) || (null == e && (e = r), u = y, r = n, n = v, o = On(r)), 
            e === !1 ? t = !1 : Bn(e) && "chain" in e && (t = e.chain);
            var u = n, a = $n(u);
            or(o, function(e) {
                var o = n[e] = r[e];
                a && (u.prototype[e] = function() {
                    var r = this.__chain__, e = this.__wrapped__, a = [ e ];
                    Ue.apply(a, arguments);
                    var i = o.apply(n, a);
                    if (t || r) {
                        if (e === i && Bn(i)) return this;
                        i = new u(i), i.__chain__ = r;
                    }
                    return i;
                });
            });
        }
        function ie() {
            return e._ = De, this;
        }
        function le() {}
        function ce(n) {
            return function(r) {
                return r[n];
            };
        }
        function fe(n, r, e) {
            var t = null == n, o = null == r;
            if (null == e && ("boolean" == typeof n && o ? (e = n, n = 1) : o || "boolean" != typeof r || (e = r, 
            o = !0)), t && o && (r = 1), n = +n || 0, o ? (r = n, n = 0) : r = +r || 0, e || n % 1 || r % 1) {
                var u = ut();
                return tt(n + u * (r - n + parseFloat("1e-" + ((u + "").length - 1))), r);
            }
            return fn(n, r);
        }
        function se(n, r) {
            if (n) {
                var e = n[r];
                return $n(e) ? n[r]() : e;
            }
        }
        function pe(n, r, e) {
            var t = v.templateSettings;
            n = Ae(n || ""), e = jt({}, e, t);
            var o, u = jt({}, e.imports, t.imports), i = ht(u), l = Xn(u), c = 0, f = e.interpolate || L, s = "__p += '", p = Se((e.escape || L).source + "|" + f.source + "|" + (f === A ? E : L).source + "|" + (e.evaluate || L).source + "|$", "g");
            n.replace(p, function(r, e, t, u, i, l) {
                return t || (t = u), s += n.slice(c, l).replace(R, a), e && (s += "' +\n__e(" + e + ") +\n'"), 
                i && (o = !0, s += "';\n" + i + ";\n__p += '"), t && (s += "' +\n((__t = (" + t + ")) == null ? '' : __t) +\n'"), 
                c = l + r.length, r;
            }), s += "';\n";
            var h = e.variable, y = h;
            y || (h = "obj", s = "with (" + h + ") {\n" + s + "\n}\n"), s = (o ? s.replace(j, "") : s).replace(C, "$1").replace(P, "$1;"), 
            s = "function(" + h + ") {\n" + (y ? "" : h + " || (" + h + " = {});\n") + "var __t, __p = '', __e = _.escape" + (o ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + s + "return __p\n}";
            var b = "\n/*\n//# sourceURL=" + (e.sourceURL || "/lodash/template/source[" + $++ + "]") + "\n*/";
            try {
                var d = Ce(i, "return " + s + b).apply(g, l);
            } catch (_) {
                throw _.source = s, _;
            }
            return r ? d(r) : (d.source = s, d);
        }
        function he(n, r, e) {
            n = (n = +n) > -1 ? n : 0;
            var t = -1, o = we(n);
            for (r = en(r, e, 1); ++t < n; ) o[t] = r(t);
            return o;
        }
        function ge(n) {
            return null == n ? "" : Ae(n).replace(_t, _n);
        }
        function ve(n) {
            var r = ++b;
            return Ae(null == n ? "" : n) + r;
        }
        function ye(n) {
            return n = new y(n), n.__chain__ = !0, n;
        }
        function be(n, r) {
            return r(n), n;
        }
        function de() {
            return this.__chain__ = !0, this;
        }
        function _e() {
            return Ae(this.__wrapped__);
        }
        function me() {
            return this.__wrapped__;
        }
        e = e ? un.defaults(nn.Object(), e, un.pick(nn, T)) : nn;
        var we = e.Array, xe = e.Boolean, je = e.Date, ke = e.Error, Ce = e.Function, Pe = e.Math, Ee = e.Number, Oe = e.Object, Se = e.RegExp, Ae = e.String, Ie = e.TypeError, Le = [], Ne = ke.prototype, Re = Oe.prototype, Te = Ae.prototype, De = e._, $e = Re.toString, Be = Se("^" + Ae($e).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), Fe = Pe.ceil, He = e.clearTimeout, We = Pe.floor, qe = Ce.prototype.toString, ze = bn(ze = Oe.getPrototypeOf) && ze, Ke = Re.hasOwnProperty, Ue = Le.push, Me = Re.propertyIsEnumerable, Ve = e.setTimeout, Ge = Le.splice, Je = Le.unshift, Qe = function() {
            try {
                var n = {}, r = bn(r = Oe.defineProperty) && r, e = r(n, n, n) && r;
            } catch (t) {}
            return e;
        }(), Xe = bn(Xe = Oe.create) && Xe, Ye = bn(Ye = we.isArray) && Ye, Ze = e.isFinite, nt = e.isNaN, rt = bn(rt = Oe.keys) && rt, et = Pe.max, tt = Pe.min, ot = e.parseInt, ut = Pe.random, at = {};
        at[F] = we, at[H] = xe, at[W] = je, at[z] = Ce, at[U] = Oe, at[K] = Ee, at[M] = Se, 
        at[V] = Ae;
        var it = {};
        it[F] = it[W] = it[K] = {
            constructor: !0,
            toLocaleString: !0,
            toString: !0,
            valueOf: !0
        }, it[H] = it[V] = {
            constructor: !0,
            toString: !0,
            valueOf: !0
        }, it[q] = it[z] = it[M] = {
            constructor: !0,
            toString: !0
        }, it[U] = {
            constructor: !0
        }, function() {
            for (var n = D.length; n--; ) {
                var r = D[n];
                for (var e in it) Ke.call(it, e) && !Ke.call(it[e], r) && (it[e][r] = !1);
            }
        }(), y.prototype = v.prototype;
        var lt = v.support = {};
        !function() {
            var n = function() {
                this.x = 1;
            }, r = {
                "0": 1,
                length: 1
            }, t = [];
            n.prototype = {
                valueOf: 1,
                y: 1
            };
            for (var o in new n()) t.push(o);
            for (o in arguments) ;
            lt.argsClass = $e.call(arguments) == B, lt.argsObject = arguments.constructor == Oe && !(arguments instanceof we), 
            lt.enumErrorProps = Me.call(Ne, "message") || Me.call(Ne, "name"), lt.enumPrototypes = Me.call(n, "prototype"), 
            lt.funcDecomp = !bn(e.WinRTError) && N.test(h), lt.funcNames = "string" == typeof Ce.name, 
            lt.nonEnumArgs = 0 != o, lt.nonEnumShadows = !/valueOf/.test(t), lt.ownLast = "x" != t[0], 
            lt.spliceObjects = (Le.splice.call(r, 0, 1), !r[0]), lt.unindexedChars = "x"[0] + Oe("x")[0] != "xx";
            try {
                lt.nodeClass = !($e.call(document) == U && !({
                    toString: 0
                } + ""));
            } catch (u) {
                lt.nodeClass = !0;
            }
        }(1), v.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: A,
            variable: "",
            imports: {
                _: v
            }
        };
        var ct = function(n) {
            var r = "var index, iterable = " + n.firstArg + ", result = " + n.init + ";\nif (!iterable) return result;\n" + n.top + ";";
            n.array ? (r += "\nvar length = iterable.length; index = -1;\nif (" + n.array + ") {  ", 
            lt.unindexedChars && (r += "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "), 
            r += "\n  while (++index < length) {\n    " + n.loop + ";\n  }\n}\nelse {  ") : lt.nonEnumArgs && (r += "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " + n.loop + ";\n    }\n  } else {  "), 
            lt.enumPrototypes && (r += "\n  var skipProto = typeof iterable == 'function';\n  "), 
            lt.enumErrorProps && (r += "\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");
            var e = [];
            if (lt.enumPrototypes && e.push('!(skipProto && index == "prototype")'), lt.enumErrorProps && e.push('!(skipErrorProps && (index == "message" || index == "name"))'), 
            n.useHas && n.keys) r += "\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n", 
            e.length && (r += "    if (" + e.join(" && ") + ") {\n  "), r += n.loop + ";    ", 
            e.length && (r += "\n    }"), r += "\n  }  "; else if (r += "\n  for (index in iterable) {\n", 
            n.useHas && e.push("hasOwnProperty.call(iterable, index)"), e.length && (r += "    if (" + e.join(" && ") + ") {\n  "), 
            r += n.loop + ";    ", e.length && (r += "\n    }"), r += "\n  }    ", lt.nonEnumShadows) {
                for (r += "\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ", 
                k = 0; k < 7; k++) r += "\n    index = '" + n.shadowedProps[k] + "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))", 
                n.useHas || (r += " || (!nonEnum[index] && iterable[index] !== objectProto[index])"), 
                r += ") {\n      " + n.loop + ";\n    }      ";
                r += "\n  }    ";
            }
            return (n.array || lt.nonEnumArgs) && (r += "\n}"), r += n.bottom + ";\nreturn result";
        };
        Xe || (rn = function() {
            function n() {}
            return function(r) {
                if (Bn(r)) {
                    n.prototype = r;
                    var t = new n();
                    n.prototype = null;
                }
                return t || e.Object();
            };
        }());
        var ft = Qe ? function(n, r) {
            Q.value = r, Qe(n, "__bindData__", Q);
        } : le;
        lt.argsClass || (mn = function(n) {
            return n && "object" == typeof n && "number" == typeof n.length && Ke.call(n, "callee") && !Me.call(n, "callee") || !1;
        });
        var st = Ye || function(n) {
            return n && "object" == typeof n && "number" == typeof n.length && $e.call(n) == F || !1;
        }, pt = gn({
            args: "object",
            init: "[]",
            top: "if (!(objectTypes[typeof object])) return result",
            loop: "result.push(index)"
        }), ht = rt ? function(n) {
            return Bn(n) ? lt.enumPrototypes && "function" == typeof n || lt.nonEnumArgs && n.length && mn(n) ? pt(n) : rt(n) : [];
        } : pt, gt = {
            args: "collection, callback, thisArg",
            top: "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
            array: "typeof length == 'number'",
            keys: ht,
            loop: "if (callback(iterable[index], index, collection) === false) return result"
        }, vt = {
            args: "object, source, guard",
            top: "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",
            keys: ht,
            loop: "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
            bottom: "  }\n}"
        }, yt = {
            top: "if (!objectTypes[typeof iterable]) return result;\n" + gt.top,
            array: !1
        }, bt = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }, dt = An(bt), _t = Se("(" + ht(dt).join("|") + ")", "g"), mt = Se("[" + ht(bt).join("") + "]", "g"), wt = gn(gt), xt = gn(vt, {
            top: vt.top.replace(";", ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),
            loop: "result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"
        }), jt = gn(vt), kt = gn(gt, yt, {
            useHas: !1
        }), Ct = gn(gt, yt);
        $n(/x/) && ($n = function(n) {
            return "function" == typeof n && $e.call(n) == z;
        });
        var Pt = ze ? function(n) {
            if (!n || $e.call(n) != U || !lt.argsClass && mn(n)) return !1;
            var r = n.valueOf, e = bn(r) && (e = ze(r)) && ze(e);
            return e ? n == e || ze(n) == e : dn(n);
        } : dn, Et = pn(function(n, r, e) {
            Ke.call(n, e) ? n[e]++ : n[e] = 1;
        }), Ot = pn(function(n, r, e) {
            (Ke.call(n, e) ? n[e] : n[e] = []).push(r);
        }), St = pn(function(n, r, e) {
            n[e] = r;
        }), At = ir, It = rr, Lt = bn(Lt = je.now) && Lt || function() {
            return new je().getTime();
        }, Nt = 8 == ot(x + "08") ? ot : function(n, r) {
            return ot(zn(n) ? n.replace(I, "") : n, r || 0);
        };
        return v.after = Wr, v.assign = xt, v.at = Yn, v.bind = qr, v.bindAll = zr, v.bindKey = Kr, 
        v.chain = ye, v.compact = _r, v.compose = Ur, v.constant = ee, v.countBy = Et, v.create = jn, 
        v.createCallback = te, v.curry = Mr, v.debounce = Vr, v.defaults = jt, v.defer = Gr, 
        v.delay = Jr, v.difference = mr, v.filter = rr, v.flatten = kr, v.forEach = or, 
        v.forEachRight = ur, v.forIn = kt, v.forInRight = Pn, v.forOwn = Ct, v.forOwnRight = En, 
        v.functions = On, v.groupBy = Ot, v.indexBy = St, v.initial = Pr, v.intersection = Er, 
        v.invert = An, v.invoke = ar, v.keys = ht, v.map = ir, v.mapValues = Un, v.max = lr, 
        v.memoize = Qr, v.merge = Mn, v.min = cr, v.omit = Vn, v.once = Xr, v.pairs = Gn, 
        v.partial = Yr, v.partialRight = Zr, v.pick = Jn, v.pluck = At, v.property = ce, 
        v.pull = Ar, v.range = Ir, v.reject = pr, v.remove = Lr, v.rest = Nr, v.shuffle = gr, 
        v.sortBy = br, v.tap = be, v.throttle = ne, v.times = he, v.toArray = dr, v.transform = Qn, 
        v.union = Tr, v.uniq = Dr, v.values = Xn, v.where = It, v.without = $r, v.wrap = re, 
        v.xor = Br, v.zip = Fr, v.zipObject = Hr, v.collect = ir, v.drop = Nr, v.each = or, 
        v.eachRight = ur, v.extend = xt, v.methods = On, v.object = Hr, v.select = rr, v.tail = Nr, 
        v.unique = Dr, v.unzip = Fr, ae(v), v.clone = wn, v.cloneDeep = xn, v.contains = Zn, 
        v.escape = oe, v.every = nr, v.find = er, v.findIndex = wr, v.findKey = kn, v.findLast = tr, 
        v.findLastIndex = xr, v.findLastKey = Cn, v.has = Sn, v.identity = ue, v.indexOf = Cr, 
        v.isArguments = mn, v.isArray = st, v.isBoolean = In, v.isDate = Ln, v.isElement = Nn, 
        v.isEmpty = Rn, v.isEqual = Tn, v.isFinite = Dn, v.isFunction = $n, v.isNaN = Fn, 
        v.isNull = Hn, v.isNumber = Wn, v.isObject = Bn, v.isPlainObject = Pt, v.isRegExp = qn, 
        v.isString = zn, v.isUndefined = Kn, v.lastIndexOf = Sr, v.mixin = ae, v.noConflict = ie, 
        v.noop = le, v.now = Lt, v.parseInt = Nt, v.random = fe, v.reduce = fr, v.reduceRight = sr, 
        v.result = se, v.runInContext = h, v.size = vr, v.some = yr, v.sortedIndex = Rr, 
        v.template = pe, v.unescape = ge, v.uniqueId = ve, v.all = nr, v.any = yr, v.detect = er, 
        v.findWhere = er, v.foldl = fr, v.foldr = sr, v.include = Zn, v.inject = fr, ae(function() {
            var n = {};
            return Ct(v, function(r, e) {
                v.prototype[e] || (n[e] = r);
            }), n;
        }(), !1), v.first = jr, v.last = Or, v.sample = hr, v.take = jr, v.head = jr, Ct(v, function(n, r) {
            var e = "sample" !== r;
            v.prototype[r] || (v.prototype[r] = function(r, t) {
                var o = this.__chain__, u = n(this.__wrapped__, r, t);
                return o || null != r && (!t || e && "function" == typeof r) ? new y(u, o) : u;
            });
        }), v.VERSION = "2.4.1", v.prototype.chain = de, v.prototype.toString = _e, v.prototype.value = me, 
        v.prototype.valueOf = me, wt([ "join", "pop", "shift" ], function(n) {
            var r = Le[n];
            v.prototype[n] = function() {
                var n = this.__chain__, e = r.apply(this.__wrapped__, arguments);
                return n ? new y(e, n) : e;
            };
        }), wt([ "push", "reverse", "sort", "unshift" ], function(n) {
            var r = Le[n];
            v.prototype[n] = function() {
                return r.apply(this.__wrapped__, arguments), this;
            };
        }), wt([ "concat", "slice", "splice" ], function(n) {
            var r = Le[n];
            v.prototype[n] = function() {
                return new y(r.apply(this.__wrapped__, arguments), this.__chain__);
            };
        }), lt.spliceObjects || wt([ "pop", "shift", "splice" ], function(n) {
            var r = Le[n], e = "splice" == n;
            v.prototype[n] = function() {
                var n = this.__chain__, t = this.__wrapped__, o = r.apply(t, arguments);
                return 0 === t.length && delete t[0], n || e ? new y(o, n) : o;
            };
        }), v;
    }
    var g, v = [], y = [], b = 0, d = {}, _ = +new Date() + "", m = 75, w = 40, x = " \t\x0B\f \ufeff\n\r\u2028\u2029 ᠎             　", j = /\b__p \+= '';/g, C = /\b(__p \+=) '' \+/g, P = /(__e\(.*?\)|\b__t\)) \+\n'';/g, E = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, O = /\w*$/, S = /^\s*function[ \n\r\t]+\w/, A = /<%=([\s\S]+?)%>/g, I = RegExp("^[" + x + "]*0+(?=.$)"), L = /($^)/, N = /\bthis\b/, R = /['\n\r\t\u2028\u2029\\]/g, T = [ "Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout" ], D = [ "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf" ], $ = 0, B = "[object Arguments]", F = "[object Array]", H = "[object Boolean]", W = "[object Date]", q = "[object Error]", z = "[object Function]", K = "[object Number]", U = "[object Object]", M = "[object RegExp]", V = "[object String]", G = {};
    G[z] = !1, G[B] = G[F] = G[H] = G[W] = G[K] = G[U] = G[M] = G[V] = !0;
    var J = {
        leading: !1,
        maxWait: 0,
        trailing: !1
    }, Q = {
        configurable: !1,
        enumerable: !1,
        value: null,
        writable: !1
    }, X = {
        args: "",
        array: null,
        bottom: "",
        firstArg: "",
        init: "",
        keys: null,
        loop: "",
        shadowedProps: null,
        support: null,
        top: "",
        useHas: !1
    }, Y = {
        "boolean": !1,
        "function": !0,
        object: !0,
        number: !1,
        string: !1,
        undefined: !1
    }, Z = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, nn = Y[typeof window] && window || this, rn = Y[typeof exports] && exports && !exports.nodeType && exports, en = Y[typeof module] && module && !module.nodeType && module, tn = en && en.exports === rn && rn, on = Y[typeof global] && global;
    !on || on.global !== on && on.window !== on || (nn = on);
    var un = h();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (nn._ = un, 
    define(function() {
        return un;
    })) : rn && en ? tn ? (en.exports = un)._ = un : rn._ = un : nn._ = un;
}).call(this);
!function() {
    "use strict";
    function t(e, o) {
        function i(t, e) {
            return function() {
                return t.apply(e, arguments);
            };
        }
        var r;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, 
        this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, 
        this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, 
        !t.notNeeded(e)) {
            for (var a = [ "onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel" ], c = this, s = 0, u = a.length; s < u; s++) c[a[s]] = i(c[a[s]], c);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), 
            e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), 
            e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), 
            e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), 
            Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o);
            }, e.addEventListener = function(t, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t);
                }), o) : i.call(e, t, n, o);
            }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) {
                r(t);
            }, !1), e.onclick = null);
        }
    }
    var e = navigator.userAgent.indexOf("Windows Phone") >= 0, n = navigator.userAgent.indexOf("Android") > 0 && !e, o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e, i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent), r = o && /OS [6-7]_\d/.test(navigator.userAgent), a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function(t) {
        switch (t.nodeName.toLowerCase()) {
          case "button":
          case "select":
          case "textarea":
            if (t.disabled) return !0;
            break;

          case "input":
            if (o && "file" === t.type || t.disabled) return !0;
            break;

          case "label":
          case "iframe":
          case "video":
            return !0;
        }
        return /\bneedsclick\b/.test(t.className);
    }, t.prototype.needsFocus = function(t) {
        switch (t.nodeName.toLowerCase()) {
          case "textarea":
            return !0;

          case "select":
            return !n;

          case "input":
            switch (t.type) {
              case "button":
              case "checkbox":
              case "file":
              case "image":
              case "radio":
              case "submit":
                return !1;
            }
            return !t.disabled && !t.readOnly;

          default:
            return /\bneedsfocus\b/.test(t.className);
        }
    }, t.prototype.sendClick = function(t, e) {
        var n, o;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), 
        o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), 
        n.forwardedTouchEvent = !0, t.dispatchEvent(n);
    }, t.prototype.determineEventType = function(t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click";
    }, t.prototype.focus = function(t) {
        var e;
        o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, 
        t.setSelectionRange(e, e)) : t.focus();
    }, t.prototype.updateScrollParent = function(t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break;
                }
                n = n.parentElement;
            } while (n);
        }
        e && (e.fastClickLastScrollTop = e.scrollTop);
    }, t.prototype.getTargetElementFromEventTarget = function(t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t;
    }, t.prototype.onTouchStart = function(t) {
        var e, n, r;
        if (t.targetTouches.length > 1) return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], 
        o) {
            if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), 
                !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e);
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, 
        this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), 
        !0;
    }, t.prototype.touchHasMoved = function(t) {
        var e = t.changedTouches[0], n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n;
    }, t.prototype.onTouchMove = function(t) {
        return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, 
        this.targetElement = null), !0);
    }, t.prototype.findControl = function(t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
    }, t.prototype.onTouchEnd = function(t) {
        var e, a, c, s, u, l = this.targetElement;
        if (!this.trackingClick) return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, 
        !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, 
        this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], 
        l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, 
        l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), 
        "label" === c) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n) return !1;
                l = e;
            }
        } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, 
        !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, 
        t.preventDefault()), !1);
        return !(!o || i || (s = l.fastClickScrollParent, !s || s.fastClickLastScrollTop === s.scrollTop)) || (this.needsClick(l) || (t.preventDefault(), 
        this.sendClick(l, t)), !1);
    }, t.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null;
    }, t.prototype.onMouse = function(t) {
        return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, 
        t.stopPropagation(), t.preventDefault(), !1))));
    }, t.prototype.onClick = function(t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, 
        !0) : "submit" === t.target.type && 0 === t.detail || (e = this.onMouse(t), e || (this.targetElement = null), 
        e);
    }, t.prototype.destroy = function() {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), 
        t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), 
        t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), 
        t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1);
    }, t.notNeeded = function(t) {
        var e, o, i, r;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1]) {
            if (!n) return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (e.content.indexOf("user-scalable=no") !== -1) return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0;
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (e.content.indexOf("user-scalable=no") !== -1) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1], 
        !!(r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (e.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) || ("none" === t.style.touchAction || "manipulation" === t.style.touchAction));
    }, t.attach = function(e, n) {
        return new t(e, n);
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t;
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, 
    module.exports.FastClick = t) : window.FastClick = t;
}();
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Vue = e();
}(this, function() {
    "use strict";
    function t(e, n, r) {
        if (i(e, n)) return void (e[n] = r);
        if (e._isVue) return void t(e._data, n, r);
        var s = e.__ob__;
        if (!s) return void (e[n] = r);
        if (s.convert(n, r), s.dep.notify(), s.vms) for (var o = s.vms.length; o--; ) {
            var a = s.vms[o];
            a._proxy(n), a._digest();
        }
        return r;
    }
    function e(t, e) {
        if (i(t, e)) {
            delete t[e];
            var n = t.__ob__;
            if (!n) return void (t._isVue && (delete t._data[e], t._digest()));
            if (n.dep.notify(), n.vms) for (var r = n.vms.length; r--; ) {
                var s = n.vms[r];
                s._unproxy(e), s._digest();
            }
        }
    }
    function i(t, e) {
        return Oi.call(t, e);
    }
    function n(t) {
        return Ni.test(t);
    }
    function r(t) {
        var e = (t + "").charCodeAt(0);
        return 36 === e || 95 === e;
    }
    function s(t) {
        return null == t ? "" : t.toString();
    }
    function o(t) {
        if ("string" != typeof t) return t;
        var e = Number(t);
        return isNaN(e) ? t : e;
    }
    function a(t) {
        return "true" === t || "false" !== t && t;
    }
    function h(t) {
        var e = t.charCodeAt(0), i = t.charCodeAt(t.length - 1);
        return e !== i || 34 !== e && 39 !== e ? t : t.slice(1, -1);
    }
    function l(t) {
        return t.replace(ji, c);
    }
    function c(t, e) {
        return e ? e.toUpperCase() : "";
    }
    function u(t) {
        return t.replace(Ei, "$1-$2").toLowerCase();
    }
    function f(t) {
        return t.replace(Si, c);
    }
    function p(t, e) {
        return function(i) {
            var n = arguments.length;
            return n ? n > 1 ? t.apply(e, arguments) : t.call(e, i) : t.call(e);
        };
    }
    function d(t, e) {
        e = e || 0;
        for (var i = t.length - e, n = new Array(i); i--; ) n[i] = t[i + e];
        return n;
    }
    function v(t, e) {
        for (var i = Object.keys(e), n = i.length; n--; ) t[i[n]] = e[i[n]];
        return t;
    }
    function m(t) {
        return null !== t && "object" == typeof t;
    }
    function g(t) {
        return Di.call(t) === Fi;
    }
    function _(t, e, i, n) {
        Object.defineProperty(t, e, {
            value: i,
            enumerable: !!n,
            writable: !0,
            configurable: !0
        });
    }
    function b(t, e) {
        var i, n, r, s, o, a = function h() {
            var a = Date.now() - s;
            a < e && a >= 0 ? i = setTimeout(h, e - a) : (i = null, o = t.apply(r, n), i || (r = n = null));
        };
        return function() {
            return r = this, n = arguments, s = Date.now(), i || (i = setTimeout(a, e)), o;
        };
    }
    function y(t, e) {
        for (var i = t.length; i--; ) if (t[i] === e) return i;
        return -1;
    }
    function w(t) {
        var e = function i() {
            if (!i.cancelled) return t.apply(this, arguments);
        };
        return e.cancel = function() {
            e.cancelled = !0;
        }, e;
    }
    function C(t, e) {
        return t == e || !(!m(t) || !m(e)) && JSON.stringify(t) === JSON.stringify(e);
    }
    function $(t) {
        this.size = 0, this.limit = t, this.head = this.tail = void 0, this._keymap = Object.create(null);
    }
    function k() {
        var t, e = Ki.slice(on, rn).trim();
        if (e) {
            t = {};
            var i = e.match(pn);
            t.name = i[0], i.length > 1 && (t.args = i.slice(1).map(x));
        }
        t && (tn.filters = tn.filters || []).push(t), on = rn + 1;
    }
    function x(t) {
        if (dn.test(t)) return {
            value: o(t),
            dynamic: !1
        };
        var e = h(t), i = e === t;
        return {
            value: i ? t : e,
            dynamic: i
        };
    }
    function A(t) {
        var e = fn.get(t);
        if (e) return e;
        for (Ki = t, an = hn = !1, ln = cn = un = 0, on = 0, tn = {}, rn = 0, sn = Ki.length; rn < sn; rn++) if (nn = en, 
        en = Ki.charCodeAt(rn), an) 39 === en && 92 !== nn && (an = !an); else if (hn) 34 === en && 92 !== nn && (hn = !hn); else if (124 === en && 124 !== Ki.charCodeAt(rn + 1) && 124 !== Ki.charCodeAt(rn - 1)) null == tn.expression ? (on = rn + 1, 
        tn.expression = Ki.slice(0, rn).trim()) : k(); else switch (en) {
          case 34:
            hn = !0;
            break;

          case 39:
            an = !0;
            break;

          case 40:
            un++;
            break;

          case 41:
            un--;
            break;

          case 91:
            cn++;
            break;

          case 93:
            cn--;
            break;

          case 123:
            ln++;
            break;

          case 125:
            ln--;
        }
        return null == tn.expression ? tn.expression = Ki.slice(0, rn).trim() : 0 !== on && k(), 
        fn.put(t, tn), tn;
    }
    function T(t) {
        return t.replace(mn, "\\$&");
    }
    function O() {
        var t = T(kn.delimiters[0]), e = T(kn.delimiters[1]), i = T(kn.unsafeDelimiters[0]), n = T(kn.unsafeDelimiters[1]);
        _n = new RegExp(i + "((?:.|\\n)+?)" + n + "|" + t + "((?:.|\\n)+?)" + e, "g"), bn = new RegExp("^" + i + ".*" + n + "$"), 
        gn = new $(1e3);
    }
    function N(t) {
        gn || O();
        var e = gn.get(t);
        if (e) return e;
        if (!_n.test(t)) return null;
        for (var i, n, r, s, o, a, h = [], l = _n.lastIndex = 0; i = _n.exec(t); ) n = i.index, 
        n > l && h.push({
            value: t.slice(l, n)
        }), r = bn.test(i[0]), s = r ? i[1] : i[2], o = s.charCodeAt(0), a = 42 === o, s = a ? s.slice(1) : s, 
        h.push({
            tag: !0,
            value: s.trim(),
            html: r,
            oneTime: a
        }), l = n + i[0].length;
        return l < t.length && h.push({
            value: t.slice(l)
        }), gn.put(t, h), h;
    }
    function j(t, e) {
        return t.length > 1 ? t.map(function(t) {
            return E(t, e);
        }).join("+") : E(t[0], e, !0);
    }
    function E(t, e, i) {
        return t.tag ? t.oneTime && e ? '"' + e.$eval(t.value) + '"' : S(t.value, i) : '"' + t.value + '"';
    }
    function S(t, e) {
        if (yn.test(t)) {
            var i = A(t);
            return i.filters ? "this._applyFilters(" + i.expression + ",null," + JSON.stringify(i.filters) + ",false)" : "(" + t + ")";
        }
        return e ? t : "(" + t + ")";
    }
    function D(t, e, i, n) {
        R(t, 1, function() {
            e.appendChild(t);
        }, i, n);
    }
    function F(t, e, i, n) {
        R(t, 1, function() {
            V(t, e);
        }, i, n);
    }
    function P(t, e, i) {
        R(t, -1, function() {
            U(t);
        }, e, i);
    }
    function R(t, e, i, n, r) {
        var s = t.__v_trans;
        if (!s || !s.hooks && !zi || !n._isCompiled || n.$parent && !n.$parent._isCompiled) return i(), 
        void (r && r());
        var o = e > 0 ? "enter" : "leave";
        s[o](i, r);
    }
    function L(t) {
        if ("string" == typeof t) {
            var e = t;
            t = document.querySelector(t), t || xn("Cannot find element: " + e);
        }
        return t;
    }
    function I(t) {
        if (!t) return !1;
        var e = t.ownerDocument.documentElement, i = t.parentNode;
        return e === t || e === i || !(!i || 1 !== i.nodeType || !e.contains(i));
    }
    function H(t, e) {
        var i = t.getAttribute(e);
        return null !== i && t.removeAttribute(e), i;
    }
    function M(t, e) {
        var i = H(t, ":" + e);
        return null === i && (i = H(t, "v-bind:" + e)), i;
    }
    function W(t, e) {
        return t.hasAttribute(e) || t.hasAttribute(":" + e) || t.hasAttribute("v-bind:" + e);
    }
    function V(t, e) {
        e.parentNode && e.parentNode.insertBefore(t, e);
    }
    function B(t, e) {
        e.nextSibling ? V(t, e.nextSibling) : e.parentNode.appendChild(t);
    }
    function U(t) {
        t.parentNode && t.parentNode.removeChild(t);
    }
    function z(t, e) {
        e.firstChild ? V(t, e.firstChild) : e.appendChild(t);
    }
    function q(t, e) {
        var i = t.parentNode;
        i && i.replaceChild(e, t);
    }
    function J(t, e, i, n) {
        t.addEventListener(e, i, n);
    }
    function Y(t, e, i) {
        t.removeEventListener(e, i);
    }
    function Q(t) {
        var e = t.className;
        return "object" == typeof e && (e = e.baseVal || ""), e;
    }
    function Z(t, e) {
        Mi && !/svg$/.test(t.namespaceURI) ? t.className = e : t.setAttribute("class", e);
    }
    function G(t, e) {
        if (t.classList) t.classList.add(e); else {
            var i = " " + Q(t) + " ";
            i.indexOf(" " + e + " ") < 0 && Z(t, (i + e).trim());
        }
    }
    function X(t, e) {
        if (t.classList) t.classList.remove(e); else {
            for (var i = " " + Q(t) + " ", n = " " + e + " "; i.indexOf(n) >= 0; ) i = i.replace(n, " ");
            Z(t, i.trim());
        }
        t.className || t.removeAttribute("class");
    }
    function K(t, e) {
        var i, n;
        if (it(t) && at(t.content) && (t = t.content), t.hasChildNodes()) for (tt(t), n = e ? document.createDocumentFragment() : document.createElement("div"); i = t.firstChild; ) n.appendChild(i);
        return n;
    }
    function tt(t) {
        for (var e; e = t.firstChild, et(e); ) t.removeChild(e);
        for (;e = t.lastChild, et(e); ) t.removeChild(e);
    }
    function et(t) {
        return t && (3 === t.nodeType && !t.data.trim() || 8 === t.nodeType);
    }
    function it(t) {
        return t.tagName && "template" === t.tagName.toLowerCase();
    }
    function nt(t, e) {
        var i = kn.debug ? document.createComment(t) : document.createTextNode(e ? " " : "");
        return i.__v_anchor = !0, i;
    }
    function rt(t) {
        if (t.hasAttributes()) for (var e = t.attributes, i = 0, n = e.length; i < n; i++) {
            var r = e[i].name;
            if (On.test(r)) return l(r.replace(On, ""));
        }
    }
    function st(t, e, i) {
        for (var n; t !== e; ) n = t.nextSibling, i(t), t = n;
        i(e);
    }
    function ot(t, e, i, n, r) {
        function s() {
            if (a++, o && a >= h.length) {
                for (var t = 0; t < h.length; t++) n.appendChild(h[t]);
                r && r();
            }
        }
        var o = !1, a = 0, h = [];
        st(t, e, function(t) {
            t === e && (o = !0), h.push(t), P(t, i, s);
        });
    }
    function at(t) {
        return t && 11 === t.nodeType;
    }
    function ht(t) {
        if (t.outerHTML) return t.outerHTML;
        var e = document.createElement("div");
        return e.appendChild(t.cloneNode(!0)), e.innerHTML;
    }
    function lt(t, e) {
        var i = t.tagName.toLowerCase(), n = t.hasAttributes();
        if (Nn.test(i) || jn.test(i)) {
            if (n) return ct(t, e);
        } else {
            if (gt(e, "components", i)) return {
                id: i
            };
            var r = n && ct(t, e);
            if (r) return r;
            var s = e._componentNameMap && e._componentNameMap[i];
            s ? xn("Unknown custom element: <" + i + "> - did you mean <" + s + ">? HTML is case-insensitive, remember to use kebab-case in templates.") : En(t, i) && xn("Unknown custom element: <" + i + '> - did you register the component correctly? For recursive components, make sure to provide the "name" option.');
        }
    }
    function ct(t, e) {
        var i = t.getAttribute("is");
        if (null != i) {
            if (gt(e, "components", i)) return t.removeAttribute("is"), {
                id: i
            };
        } else if (i = M(t, "is"), null != i) return {
            id: i,
            dynamic: !0
        };
    }
    function ut(e, n) {
        var r, s, o;
        for (r in n) s = e[r], o = n[r], i(e, r) ? m(s) && m(o) && ut(s, o) : t(e, r, o);
        return e;
    }
    function ft(t, e) {
        var i = Object.create(t || null);
        return e ? v(i, vt(e)) : i;
    }
    function pt(t) {
        if (t.components) for (var e, i = t.components = vt(t.components), n = Object.keys(i), r = t._componentNameMap = {}, s = 0, o = n.length; s < o; s++) {
            var a = n[s];
            Nn.test(a) || jn.test(a) ? xn("Do not use built-in or reserved HTML elements as component id: " + a) : (r[a.replace(/-/g, "").toLowerCase()] = u(a), 
            e = i[a], g(e) && (i[a] = Ci.extend(e)));
        }
    }
    function dt(t) {
        var e, i, n = t.props;
        if (Pi(n)) for (t.props = {}, e = n.length; e--; ) i = n[e], "string" == typeof i ? t.props[i] = null : i.name && (t.props[i.name] = i); else if (g(n)) {
            var r = Object.keys(n);
            for (e = r.length; e--; ) i = n[r[e]], "function" == typeof i && (n[r[e]] = {
                type: i
            });
        }
    }
    function vt(t) {
        if (Pi(t)) {
            for (var e, i = {}, n = t.length; n--; ) {
                e = t[n];
                var r = "function" == typeof e ? e.options && e.options.name || e.id : e.name || e.id;
                r ? i[r] = e : xn('Array-syntax assets must provide a "name" or "id" field.');
            }
            return i;
        }
        return t;
    }
    function mt(t, e, n) {
        function r(i) {
            var r = Sn[i] || Dn;
            o[i] = r(t[i], e[i], n, i);
        }
        pt(e), dt(e), e.propsData && !n && xn("propsData can only be used as an instantiation option.");
        var s, o = {};
        if (e["extends"] && (t = "function" == typeof e["extends"] ? mt(t, e["extends"].options, n) : mt(t, e["extends"], n)), 
        e.mixins) for (var a = 0, h = e.mixins.length; a < h; a++) t = mt(t, e.mixins[a], n);
        for (s in t) r(s);
        for (s in e) i(t, s) || r(s);
        return o;
    }
    function gt(t, e, i, n) {
        if ("string" == typeof i) {
            var r, s = t[e], o = s[i] || s[r = l(i)] || s[r.charAt(0).toUpperCase() + r.slice(1)];
            return n && !o && xn("Failed to resolve " + e.slice(0, -1) + ": " + i, t), o;
        }
    }
    function _t() {
        this.id = Fn++, this.subs = [];
    }
    function bt(t) {
        In = !1, t(), In = !0;
    }
    function yt(t) {
        if (this.value = t, this.dep = new _t(), _(t, "__ob__", this), Pi(t)) {
            var e = Ri ? wt : Ct;
            e(t, Rn, Ln), this.observeArray(t);
        } else this.walk(t);
    }
    function wt(t, e) {
        t.__proto__ = e;
    }
    function Ct(t, e, i) {
        for (var n = 0, r = i.length; n < r; n++) {
            var s = i[n];
            _(t, s, e[s]);
        }
    }
    function $t(t, e) {
        if (t && "object" == typeof t) {
            var n;
            return i(t, "__ob__") && t.__ob__ instanceof yt ? n = t.__ob__ : In && (Pi(t) || g(t)) && Object.isExtensible(t) && !t._isVue && (n = new yt(t)), 
            n && e && n.addVm(e), n;
        }
    }
    function kt(t, e, i) {
        var n = new _t(), r = Object.getOwnPropertyDescriptor(t, e);
        if (!r || r.configurable !== !1) {
            var s = r && r.get, o = r && r.set, a = $t(i);
            Object.defineProperty(t, e, {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    var e = s ? s.call(t) : i;
                    if (_t.target && (n.depend(), a && a.dep.depend(), Pi(e))) for (var r, o = 0, h = e.length; o < h; o++) r = e[o], 
                    r && r.__ob__ && r.__ob__.dep.depend();
                    return e;
                },
                set: function(e) {
                    var r = s ? s.call(t) : i;
                    e !== r && (o ? o.call(t, e) : i = e, a = $t(e), n.notify());
                }
            });
        }
    }
    function xt(t) {
        t.prototype._init = function(t) {
            t = t || {}, this.$el = null, this.$parent = t.parent, this.$root = this.$parent ? this.$parent.$root : this, 
            this.$children = [], this.$refs = {}, this.$els = {}, this._watchers = [], this._directives = [], 
            this._uid = Mn++, this._isVue = !0, this._events = {}, this._eventsCount = {}, this._isFragment = !1, 
            this._fragment = this._fragmentStart = this._fragmentEnd = null, this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = !1, 
            this._unlinkFn = null, this._context = t._context || this.$parent, this._scope = t._scope, 
            this._frag = t._frag, this._frag && this._frag.children.push(this), this.$parent && this.$parent.$children.push(this), 
            t = this.$options = mt(this.constructor.options, t, this), this._updateRef(), this._data = {}, 
            this._callHook("init"), this._initState(), this._initEvents(), this._callHook("created"), 
            t.el && this.$mount(t.el);
        };
    }
    function At(t) {
        if (void 0 === t) return "eof";
        var e = t.charCodeAt(0);
        switch (e) {
          case 91:
          case 93:
          case 46:
          case 34:
          case 39:
          case 48:
            return t;

          case 95:
          case 36:
            return "ident";

          case 32:
          case 9:
          case 10:
          case 13:
          case 160:
          case 65279:
          case 8232:
          case 8233:
            return "ws";
        }
        return e >= 97 && e <= 122 || e >= 65 && e <= 90 ? "ident" : e >= 49 && e <= 57 ? "number" : "else";
    }
    function Tt(t) {
        var e = t.trim();
        return ("0" !== t.charAt(0) || !isNaN(t)) && (n(e) ? h(e) : "*" + e);
    }
    function Ot(t) {
        function e() {
            var e = t[c + 1];
            if (u === Gn && "'" === e || u === Xn && '"' === e) return c++, n = "\\" + e, p[Vn](), 
            !0;
        }
        var i, n, r, s, o, a, h, l = [], c = -1, u = qn, f = 0, p = [];
        for (p[Bn] = function() {
            void 0 !== r && (l.push(r), r = void 0);
        }, p[Vn] = function() {
            void 0 === r ? r = n : r += n;
        }, p[Un] = function() {
            p[Vn](), f++;
        }, p[zn] = function() {
            if (f > 0) f--, u = Zn, p[Vn](); else {
                if (f = 0, r = Tt(r), r === !1) return !1;
                p[Bn]();
            }
        }; null != u; ) if (c++, i = t[c], "\\" !== i || !e()) {
            if (s = At(i), h = er[u], o = h[s] || h["else"] || tr, o === tr) return;
            if (u = o[0], a = p[o[1]], a && (n = o[2], n = void 0 === n ? i : n, a() === !1)) return;
            if (u === Kn) return l.raw = t, l;
        }
    }
    function Nt(t) {
        var e = Wn.get(t);
        return e || (e = Ot(t), e && Wn.put(t, e)), e;
    }
    function jt(t, e) {
        return It(e).get(t);
    }
    function Et(e, i, n) {
        var r = e;
        if ("string" == typeof i && (i = Ot(i)), !i || !m(e)) return !1;
        for (var s, o, a = 0, h = i.length; a < h; a++) s = e, o = i[a], "*" === o.charAt(0) && (o = It(o.slice(1)).get.call(r, r)), 
        a < h - 1 ? (e = e[o], m(e) || (e = {}, s._isVue && ir(i, s), t(s, o, e))) : Pi(e) ? e.$set(o, n) : o in e ? e[o] = n : (e._isVue && ir(i, e), 
        t(e, o, n));
        return !0;
    }
    function St(t, e) {
        var i = mr.length;
        return mr[i] = e ? t.replace(cr, "\\n") : t, '"' + i + '"';
    }
    function Dt(t) {
        var e = t.charAt(0), i = t.slice(1);
        return or.test(i) ? t : (i = i.indexOf('"') > -1 ? i.replace(fr, Ft) : i, e + "scope." + i);
    }
    function Ft(t, e) {
        return mr[e];
    }
    function Pt(t) {
        hr.test(t) && xn("Avoid using reserved keywords in expression: " + t), mr.length = 0;
        var e = t.replace(ur, St).replace(lr, "");
        return e = (" " + e).replace(dr, Dt).replace(fr, Ft), Rt(e);
    }
    function Rt(t) {
        try {
            return new Function("scope", "return " + t + ";");
        } catch (e) {
            xn("Invalid expression. Generated function body: " + t);
        }
    }
    function Lt(t) {
        var e = Nt(t);
        return e ? function(t, i) {
            Et(t, e, i);
        } : void xn("Invalid setter expression: " + t);
    }
    function It(t, e) {
        t = t.trim();
        var i = rr.get(t);
        if (i) return e && !i.set && (i.set = Lt(i.exp)), i;
        var n = {
            exp: t
        };
        return n.get = Ht(t) && t.indexOf("[") < 0 ? Rt("scope." + t) : Pt(t), e && (n.set = Lt(t)), 
        rr.put(t, n), n;
    }
    function Ht(t) {
        return pr.test(t) && !vr.test(t) && "Math." !== t.slice(0, 5);
    }
    function Mt() {
        _r.length = 0, br.length = 0, yr = {}, wr = {}, Cr = !1;
    }
    function Wt() {
        for (var t = !0; t; ) t = !1, Vt(_r), Vt(br), _r.length ? t = !0 : (Ii && kn.devtools && Ii.emit("flush"), 
        Mt());
    }
    function Vt(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e], n = i.id;
            if (yr[n] = null, i.run(), null != yr[n] && (wr[n] = (wr[n] || 0) + 1, wr[n] > kn._maxUpdateCount)) {
                xn('You may have an infinite update loop for watcher with expression "' + i.expression + '"', i.vm);
                break;
            }
        }
        t.length = 0;
    }
    function Bt(t) {
        var e = t.id;
        if (null == yr[e]) {
            var i = t.user ? br : _r;
            yr[e] = i.length, i.push(t), Cr || (Cr = !0, Zi(Wt));
        }
    }
    function Ut(t, e, i, n) {
        n && v(this, n);
        var r = "function" == typeof e;
        if (this.vm = t, t._watchers.push(this), this.expression = e, this.cb = i, this.id = ++$r, 
        this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new Gi(), 
        this.newDepIds = new Gi(), this.prevError = null, r) this.getter = e, this.setter = void 0; else {
            var s = It(e, this.twoWay);
            this.getter = s.get, this.setter = s.set;
        }
        this.value = this.lazy ? void 0 : this.get(), this.queued = this.shallow = !1;
    }
    function zt(t, e) {
        var i = void 0, n = void 0;
        e || (e = kr, e.clear());
        var r = Pi(t), s = m(t);
        if (r || s) {
            if (t.__ob__) {
                var o = t.__ob__.dep.id;
                if (e.has(o)) return;
                e.add(o);
            }
            if (r) for (i = t.length; i--; ) zt(t[i], e); else if (s) for (n = Object.keys(t), 
            i = n.length; i--; ) zt(t[n[i]], e);
        }
    }
    function qt(t) {
        return it(t) && at(t.content);
    }
    function Jt(t, e) {
        var i = e ? t : t.trim(), n = Ar.get(i);
        if (n) return n;
        var r = document.createDocumentFragment(), s = t.match(Nr), o = jr.test(t);
        if (s || o) {
            var a = s && s[1], h = Or[a] || Or.efault, l = h[0], c = h[1], u = h[2], f = document.createElement("div");
            for (f.innerHTML = c + t + u; l--; ) f = f.lastChild;
            for (var p; p = f.firstChild; ) r.appendChild(p);
        } else r.appendChild(document.createTextNode(t));
        return e || tt(r), Ar.put(i, r), r;
    }
    function Yt(t) {
        if (qt(t)) return Jt(t.innerHTML);
        if ("SCRIPT" === t.tagName) return Jt(t.textContent);
        for (var e, i = Qt(t), n = document.createDocumentFragment(); e = i.firstChild; ) n.appendChild(e);
        return tt(n), n;
    }
    function Qt(t) {
        if (!t.querySelectorAll) return t.cloneNode();
        var e, i, n, r = t.cloneNode(!0);
        if (Er) {
            var s = r;
            if (qt(t) && (t = t.content, s = r.content), i = t.querySelectorAll("template"), 
            i.length) for (n = s.querySelectorAll("template"), e = n.length; e--; ) n[e].parentNode.replaceChild(Qt(i[e]), n[e]);
        }
        if (Sr) if ("TEXTAREA" === t.tagName) r.value = t.value; else if (i = t.querySelectorAll("textarea"), 
        i.length) for (n = r.querySelectorAll("textarea"), e = n.length; e--; ) n[e].value = i[e].value;
        return r;
    }
    function Zt(t, e, i) {
        var n, r;
        return at(t) ? (tt(t), e ? Qt(t) : t) : ("string" == typeof t ? i || "#" !== t.charAt(0) ? r = Jt(t, i) : (r = Tr.get(t), 
        r || (n = document.getElementById(t.slice(1)), n && (r = Yt(n), Tr.put(t, r)))) : t.nodeType && (r = Yt(t)), 
        r && e ? Qt(r) : r);
    }
    function Gt(t, e, i, n, r, s) {
        this.children = [], this.childFrags = [], this.vm = e, this.scope = r, this.inserted = !1, 
        this.parentFrag = s, s && s.childFrags.push(this), this.unlink = t(e, i, n, r, this);
        var o = this.single = 1 === i.childNodes.length && !i.childNodes[0].__v_anchor;
        o ? (this.node = i.childNodes[0], this.before = Xt, this.remove = Kt) : (this.node = nt("fragment-start"), 
        this.end = nt("fragment-end"), this.frag = i, z(this.node, i), i.appendChild(this.end), 
        this.before = te, this.remove = ee), this.node.__v_frag = this;
    }
    function Xt(t, e) {
        this.inserted = !0;
        var i = e !== !1 ? F : V;
        i(this.node, t, this.vm), I(this.node) && this.callHook(ie);
    }
    function Kt() {
        this.inserted = !1;
        var t = I(this.node), e = this;
        this.beforeRemove(), P(this.node, this.vm, function() {
            t && e.callHook(ne), e.destroy();
        });
    }
    function te(t, e) {
        this.inserted = !0;
        var i = this.vm, n = e !== !1 ? F : V;
        st(this.node, this.end, function(e) {
            n(e, t, i);
        }), I(this.node) && this.callHook(ie);
    }
    function ee() {
        this.inserted = !1;
        var t = this, e = I(this.node);
        this.beforeRemove(), ot(this.node, this.end, this.vm, this.frag, function() {
            e && t.callHook(ne), t.destroy();
        });
    }
    function ie(t) {
        !t._isAttached && I(t.$el) && t._callHook("attached");
    }
    function ne(t) {
        t._isAttached && !I(t.$el) && t._callHook("detached");
    }
    function re(t, e) {
        this.vm = t;
        var i, n = "string" == typeof e;
        n || it(e) && !e.hasAttribute("v-if") ? i = Zt(e, !0) : (i = document.createDocumentFragment(), 
        i.appendChild(e)), this.template = i;
        var r, s = t.constructor.cid;
        if (s > 0) {
            var o = s + (n ? e : ht(e));
            r = Pr.get(o), r || (r = Pe(i, t.$options, !0), Pr.put(o, r));
        } else r = Pe(i, t.$options, !0);
        this.linker = r;
    }
    function se(t, e, i) {
        var n = t.node.previousSibling;
        if (n) {
            for (t = n.__v_frag; !(t && t.forId === i && t.inserted || n === e); ) {
                if (n = n.previousSibling, !n) return;
                t = n.__v_frag;
            }
            return t;
        }
    }
    function oe(t) {
        var e = t.node;
        if (t.end) for (;!e.__vue__ && e !== t.end && e.nextSibling; ) e = e.nextSibling;
        return e.__vue__;
    }
    function ae(t) {
        for (var e = -1, i = new Array(Math.floor(t)); ++e < t; ) i[e] = e;
        return i;
    }
    function he(t, e, i, n) {
        return n ? "$index" === n ? t : n.charAt(0).match(/\w/) ? jt(i, n) : i[n] : e || i;
    }
    function le(t, e, i) {
        for (var n, r, s, o = e ? [] : null, a = 0, h = t.options.length; a < h; a++) if (n = t.options[a], 
        s = i ? n.hasAttribute("selected") : n.selected) {
            if (r = n.hasOwnProperty("_value") ? n._value : n.value, !e) return r;
            o.push(r);
        }
        return o;
    }
    function ce(t, e) {
        for (var i = t.length; i--; ) if (C(t[i], e)) return i;
        return -1;
    }
    function ue(t, e) {
        var i = e.map(function(t) {
            var e = t.charCodeAt(0);
            return e > 47 && e < 58 ? parseInt(t, 10) : 1 === t.length && (e = t.toUpperCase().charCodeAt(0), 
            e > 64 && e < 91) ? e : is[t];
        });
        return i = [].concat.apply([], i), function(e) {
            if (i.indexOf(e.keyCode) > -1) return t.call(this, e);
        };
    }
    function fe(t) {
        return function(e) {
            return e.stopPropagation(), t.call(this, e);
        };
    }
    function pe(t) {
        return function(e) {
            return e.preventDefault(), t.call(this, e);
        };
    }
    function de(t) {
        return function(e) {
            if (e.target === e.currentTarget) return t.call(this, e);
        };
    }
    function ve(t) {
        if (as[t]) return as[t];
        var e = me(t);
        return as[t] = as[e] = e, e;
    }
    function me(t) {
        t = u(t);
        var e = l(t), i = e.charAt(0).toUpperCase() + e.slice(1);
        hs || (hs = document.createElement("div"));
        var n, r = rs.length;
        if ("filter" !== e && e in hs.style) return {
            kebab: t,
            camel: e
        };
        for (;r--; ) if (n = ss[r] + i, n in hs.style) return {
            kebab: rs[r] + t,
            camel: n
        };
    }
    function ge(t) {
        var e = [];
        if (Pi(t)) for (var i = 0, n = t.length; i < n; i++) {
            var r = t[i];
            if (r) if ("string" == typeof r) e.push(r); else for (var s in r) r[s] && e.push(s);
        } else if (m(t)) for (var o in t) t[o] && e.push(o);
        return e;
    }
    function _e(t, e, i) {
        if (e = e.trim(), e.indexOf(" ") === -1) return void i(t, e);
        for (var n = e.split(/\s+/), r = 0, s = n.length; r < s; r++) i(t, n[r]);
    }
    function be(t, e, i) {
        function n() {
            ++s >= r ? i() : t[s].call(e, n);
        }
        var r = t.length, s = 0;
        t[0].call(e, n);
    }
    function ye(t, e, i) {
        for (var r, s, o, a, h, c, f, p = [], d = Object.keys(e), v = d.length; v--; ) if (s = d[v], 
        r = e[s] || ks, "$data" !== s) if (h = l(s), xs.test(h)) {
            if (f = {
                name: s,
                path: h,
                options: r,
                mode: $s.ONE_WAY,
                raw: null
            }, o = u(s), null === (a = M(t, o)) && (null !== (a = M(t, o + ".sync")) ? f.mode = $s.TWO_WAY : null !== (a = M(t, o + ".once")) && (f.mode = $s.ONE_TIME)), 
            null !== a) f.raw = a, c = A(a), a = c.expression, f.filters = c.filters, n(a) && !c.filters ? f.optimizedLiteral = !0 : (f.dynamic = !0, 
            f.mode !== $s.TWO_WAY || As.test(a) || (f.mode = $s.ONE_WAY, xn("Cannot bind two-way prop with non-settable parent path: " + a, i))), 
            f.parentPath = a, r.twoWay && f.mode !== $s.TWO_WAY && xn('Prop "' + s + '" expects a two-way binding type.', i); else if (null !== (a = H(t, o))) f.raw = a; else {
                var m = h.toLowerCase();
                a = /[A-Z\-]/.test(s) && (t.getAttribute(m) || t.getAttribute(":" + m) || t.getAttribute("v-bind:" + m) || t.getAttribute(":" + m + ".once") || t.getAttribute("v-bind:" + m + ".once") || t.getAttribute(":" + m + ".sync") || t.getAttribute("v-bind:" + m + ".sync")), 
                a ? xn("Possible usage error for prop `" + m + "` - did you mean `" + o + "`? HTML is case-insensitive, remember to use kebab-case for props in templates.", i) : r.required && xn("Missing required prop: " + s, i);
            }
            p.push(f);
        } else xn('Invalid prop key: "' + s + '". Prop keys must be valid identifiers.', i); else xn("Do not use $data as prop.", i);
        return we(p);
    }
    function we(t) {
        return function(e, n) {
            e._props = {};
            for (var r, s, l, c, f, p = e.$options.propsData, d = t.length; d--; ) if (r = t[d], 
            f = r.raw, s = r.path, l = r.options, e._props[s] = r, p && i(p, s) && $e(e, r, p[s]), 
            null === f) $e(e, r, void 0); else if (r.dynamic) r.mode === $s.ONE_TIME ? (c = (n || e._context || e).$get(r.parentPath), 
            $e(e, r, c)) : e._context ? e._bindDir({
                name: "prop",
                def: Os,
                prop: r
            }, null, null, n) : $e(e, r, e.$get(r.parentPath)); else if (r.optimizedLiteral) {
                var v = h(f);
                c = v === f ? a(o(f)) : v, $e(e, r, c);
            } else c = l.type === Boolean && ("" === f || f === u(r.name)) || f, $e(e, r, c);
        };
    }
    function Ce(t, e, i, n) {
        var r = e.dynamic && Ht(e.parentPath), s = i;
        void 0 === s && (s = xe(t, e)), s = Te(e, s);
        var o = s !== i;
        Ae(e, s, t) || (s = void 0), r && !o ? bt(function() {
            n(s);
        }) : n(s);
    }
    function $e(t, e, i) {
        Ce(t, e, i, function(i) {
            kt(t, e.path, i);
        });
    }
    function ke(t, e, i) {
        Ce(t, e, i, function(i) {
            t[e.path] = i;
        });
    }
    function xe(t, e) {
        var n = e.options;
        if (!i(n, "default")) return n.type !== Boolean && void 0;
        var r = n["default"];
        return m(r) && xn('Invalid default value for prop "' + e.name + '": Props with type Object/Array must use a factory function to return the default value.', t), 
        "function" == typeof r && n.type !== Function ? r.call(t) : r;
    }
    function Ae(t, e, i) {
        if (!t.options.required && (null === t.raw || null == e)) return !0;
        var n = t.options, r = n.type, s = !r, o = [];
        if (r) {
            Pi(r) || (r = [ r ]);
            for (var a = 0; a < r.length && !s; a++) {
                var h = Oe(e, r[a]);
                o.push(h.expectedType), s = h.valid;
            }
        }
        if (!s) return xn('Invalid prop: type check failed for prop "' + t.name + '". Expected ' + o.map(Ne).join(", ") + ", got " + je(e) + ".", i), 
        !1;
        var l = n.validator;
        return !(l && !l(e)) || (xn('Invalid prop: custom validator check failed for prop "' + t.name + '".', i), 
        !1);
    }
    function Te(t, e) {
        var i = t.options.coerce;
        return i ? i(e) : e;
    }
    function Oe(t, e) {
        var i, n;
        return e === String ? (n = "string", i = typeof t === n) : e === Number ? (n = "number", 
        i = typeof t === n) : e === Boolean ? (n = "boolean", i = typeof t === n) : e === Function ? (n = "function", 
        i = typeof t === n) : e === Object ? (n = "object", i = g(t)) : e === Array ? (n = "array", 
        i = Pi(t)) : i = t instanceof e, {
            valid: i,
            expectedType: n
        };
    }
    function Ne(t) {
        return t ? t.charAt(0).toUpperCase() + t.slice(1) : "custom type";
    }
    function je(t) {
        return Object.prototype.toString.call(t).slice(8, -1);
    }
    function Ee(t) {
        Ns.push(t), js || (js = !0, Zi(Se));
    }
    function Se() {
        for (var t = document.documentElement.offsetHeight, e = 0; e < Ns.length; e++) Ns[e]();
        return Ns = [], js = !1, t;
    }
    function De(t, e, i, n) {
        this.id = e, this.el = t, this.enterClass = i && i.enterClass || e + "-enter", this.leaveClass = i && i.leaveClass || e + "-leave", 
        this.hooks = i, this.vm = n, this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null, 
        this.justEntered = !1, this.entered = this.left = !1, this.typeCache = {}, this.type = i && i.type, 
        this.type && this.type !== Es && this.type !== Ss && xn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, n);
        var r = this;
        [ "enterNextTick", "enterDone", "leaveNextTick", "leaveDone" ].forEach(function(t) {
            r[t] = p(r[t], r);
        });
    }
    function Fe(t) {
        if (/svg$/.test(t.namespaceURI)) {
            var e = t.getBoundingClientRect();
            return !(e.width || e.height);
        }
        return !(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
    }
    function Pe(t, e, i) {
        var n = i || !e._asComponent ? Ve(t, e) : null, r = n && n.terminal || si(t) || !t.hasChildNodes() ? null : Ye(t.childNodes, e);
        return function(t, e, i, s, o) {
            var a = d(e.childNodes), h = Re(function() {
                n && n(t, e, i, s, o), r && r(t, a, i, s, o);
            }, t);
            return Ie(t, h);
        };
    }
    function Re(t, e) {
        var i = e._directives.length;
        t();
        var n = e._directives.slice(i);
        n.sort(Le);
        for (var r = 0, s = n.length; r < s; r++) n[r]._bind();
        return n;
    }
    function Le(t, e) {
        return t = t.descriptor.def.priority || zs, e = e.descriptor.def.priority || zs, 
        t > e ? -1 : t === e ? 0 : 1;
    }
    function Ie(t, e, i, n) {
        function r(r) {
            He(t, e, r), i && n && He(i, n);
        }
        return r.dirs = e, r;
    }
    function He(t, e, i) {
        for (var n = e.length; n--; ) e[n]._teardown(), i || t._directives.$remove(e[n]);
    }
    function Me(t, e, i, n) {
        var r = ye(e, i, t), s = Re(function() {
            r(t, n);
        }, t);
        return Ie(t, s);
    }
    function We(t, e, i) {
        var n, r, s = e._containerAttrs, o = e._replacerAttrs;
        if (11 !== t.nodeType) e._asComponent ? (s && i && (n = ei(s, i)), o && (r = ei(o, e))) : r = ei(t.attributes, e); else if (s) {
            var a = s.filter(function(t) {
                return t.name.indexOf("_v-") < 0 && !Ws.test(t.name) && "slot" !== t.name;
            }).map(function(t) {
                return '"' + t.name + '"';
            });
            if (a.length) {
                var h = a.length > 1;
                xn("Attribute" + (h ? "s " : " ") + a.join(", ") + (h ? " are" : " is") + " ignored on component <" + e.el.tagName.toLowerCase() + "> because the component is a fragment instance: http://vuejs.org/guide/components.html#Fragment-Instance");
            }
        }
        return e._containerAttrs = e._replacerAttrs = null, function(t, e, i) {
            var s, o = t._context;
            o && n && (s = Re(function() {
                n(o, e, null, i);
            }, o));
            var a = Re(function() {
                r && r(t, e);
            }, t);
            return Ie(t, a, o, s);
        };
    }
    function Ve(t, e) {
        var i = t.nodeType;
        return 1 !== i || si(t) ? 3 === i && t.data.trim() ? Ue(t, e) : null : Be(t, e);
    }
    function Be(t, e) {
        if ("TEXTAREA" === t.tagName) {
            var i = N(t.value);
            i && (t.setAttribute(":value", j(i)), t.value = "");
        }
        var n, r = t.hasAttributes(), s = r && d(t.attributes);
        return r && (n = Xe(t, s, e)), n || (n = Ze(t, e)), n || (n = Ge(t, e)), !n && r && (n = ei(s, e)), 
        n;
    }
    function Ue(t, e) {
        if (t._skip) return ze;
        var i = N(t.wholeText);
        if (!i) return null;
        for (var n = t.nextSibling; n && 3 === n.nodeType; ) n._skip = !0, n = n.nextSibling;
        for (var r, s, o = document.createDocumentFragment(), a = 0, h = i.length; a < h; a++) s = i[a], 
        r = s.tag ? qe(s, e) : document.createTextNode(s.value), o.appendChild(r);
        return Je(i, o, e);
    }
    function ze(t, e) {
        U(e);
    }
    function qe(t, e) {
        function i(e) {
            if (!t.descriptor) {
                var i = A(t.value);
                t.descriptor = {
                    name: e,
                    def: ys[e],
                    expression: i.expression,
                    filters: i.filters
                };
            }
        }
        var n;
        return t.oneTime ? n = document.createTextNode(t.value) : t.html ? (n = document.createComment("v-html"), 
        i("html")) : (n = document.createTextNode(" "), i("text")), n;
    }
    function Je(t, e) {
        return function(i, n, r, s) {
            for (var o, a, h, l = e.cloneNode(!0), c = d(l.childNodes), u = 0, f = t.length; u < f; u++) o = t[u], 
            a = o.value, o.tag && (h = c[u], o.oneTime ? (a = (s || i).$eval(a), o.html ? q(h, Zt(a, !0)) : h.data = a) : i._bindDir(o.descriptor, h, r, s));
            q(n, l);
        };
    }
    function Ye(t, e) {
        for (var i, n, r, s = [], o = 0, a = t.length; o < a; o++) r = t[o], i = Ve(r, e), 
        n = i && i.terminal || "SCRIPT" === r.tagName || !r.hasChildNodes() ? null : Ye(r.childNodes, e), 
        s.push(i, n);
        return s.length ? Qe(s) : null;
    }
    function Qe(t) {
        return function(e, i, n, r, s) {
            for (var o, a, h, l = 0, c = 0, u = t.length; l < u; c++) {
                o = i[c], a = t[l++], h = t[l++];
                var f = d(o.childNodes);
                a && a(e, o, n, r, s), h && h(e, f, n, r, s);
            }
        };
    }
    function Ze(t, e) {
        var i = t.tagName.toLowerCase();
        if (!Nn.test(i)) {
            var n = gt(e, "elementDirectives", i);
            return n ? ti(t, i, "", e, n) : void 0;
        }
    }
    function Ge(t, e) {
        var i = lt(t, e);
        if (i) {
            var n = rt(t), r = {
                name: "component",
                ref: n,
                expression: i.id,
                def: Hs.component,
                modifiers: {
                    literal: !i.dynamic
                }
            }, s = function(t, e, i, s, o) {
                n && kt((s || t).$refs, n, null), t._bindDir(r, e, i, s, o);
            };
            return s.terminal = !0, s;
        }
    }
    function Xe(t, e, i) {
        if (null !== H(t, "v-pre")) return Ke;
        if (t.hasAttribute("v-else")) {
            var n = t.previousElementSibling;
            if (n && n.hasAttribute("v-if")) return Ke;
        }
        for (var r, s, o, a, h, l, c, u, f, p, d = 0, v = e.length; d < v; d++) r = e[d], 
        s = r.name.replace(Bs, ""), (h = s.match(Vs)) && (f = gt(i, "directives", h[1]), 
        f && f.terminal && (!p || (f.priority || qs) > p.priority) && (p = f, c = r.name, 
        a = ii(r.name), o = r.value, l = h[1], u = h[2]));
        return p ? ti(t, l, o, i, p, c, u, a) : void 0;
    }
    function Ke() {}
    function ti(t, e, i, n, r, s, o, a) {
        var h = A(i), l = {
            name: e,
            arg: o,
            expression: h.expression,
            filters: h.filters,
            raw: i,
            attr: s,
            modifiers: a,
            def: r
        };
        "for" !== e && "router-view" !== e || (l.ref = rt(t));
        var c = function(t, e, i, n, r) {
            l.ref && kt((n || t).$refs, l.ref, null), t._bindDir(l, e, i, n, r);
        };
        return c.terminal = !0, c;
    }
    function ei(t, e) {
        function i(t, e, i) {
            var n = i && ri(i), r = !n && A(s);
            v.push({
                name: t,
                attr: o,
                raw: a,
                def: e,
                arg: l,
                modifiers: c,
                expression: r && r.expression,
                filters: r && r.filters,
                interp: i,
                hasOneTime: n
            });
        }
        for (var n, r, s, o, a, h, l, c, u, f, p, d = t.length, v = []; d--; ) if (n = t[d], 
        r = o = n.name, s = a = n.value, f = N(s), l = null, c = ii(r), r = r.replace(Bs, ""), 
        f) s = j(f), l = r, i("bind", ys.bind, f), "class" === r && Array.prototype.some.call(t, function(t) {
            return ":class" === t.name || "v-bind:class" === t.name;
        }) && xn('class="' + a + '": Do not mix mustache interpolation and v-bind for "class" on the same element. Use one or the other.', e); else if (Us.test(r)) c.literal = !Ms.test(r), 
        i("transition", Hs.transition); else if (Ws.test(r)) l = r.replace(Ws, ""), i("on", ys.on); else if (Ms.test(r)) h = r.replace(Ms, ""), 
        "style" === h || "class" === h ? i(h, Hs[h]) : (l = h, i("bind", ys.bind)); else if (p = r.match(Vs)) {
            if (h = p[1], l = p[2], "else" === h) continue;
            u = gt(e, "directives", h, !0), u && i(h, u);
        }
        if (v.length) return ni(v);
    }
    function ii(t) {
        var e = Object.create(null), i = t.match(Bs);
        if (i) for (var n = i.length; n--; ) e[i[n].slice(1)] = !0;
        return e;
    }
    function ni(t) {
        return function(e, i, n, r, s) {
            for (var o = t.length; o--; ) e._bindDir(t[o], i, n, r, s);
        };
    }
    function ri(t) {
        for (var e = t.length; e--; ) if (t[e].oneTime) return !0;
    }
    function si(t) {
        return "SCRIPT" === t.tagName && (!t.hasAttribute("type") || "text/javascript" === t.getAttribute("type"));
    }
    function oi(t, e) {
        return e && (e._containerAttrs = hi(t)), it(t) && (t = Zt(t)), e && (e._asComponent && !e.template && (e.template = "<slot></slot>"), 
        e.template && (e._content = K(t), t = ai(t, e))), at(t) && (z(nt("v-start", !0), t), 
        t.appendChild(nt("v-end", !0))), t;
    }
    function ai(t, e) {
        var i = e.template, n = Zt(i, !0);
        if (n) {
            var r = n.firstChild, s = r.tagName && r.tagName.toLowerCase();
            return e.replace ? (t === document.body && xn("You are mounting an instance with a template to <body>. This will replace <body> entirely. You should probably use `replace: false` here."), 
            n.childNodes.length > 1 || 1 !== r.nodeType || "component" === s || gt(e, "components", s) || W(r, "is") || gt(e, "elementDirectives", s) || r.hasAttribute("v-for") || r.hasAttribute("v-if") ? n : (e._replacerAttrs = hi(r), 
            li(t, r), r)) : (t.appendChild(n), t);
        }
        xn("Invalid template option: " + i);
    }
    function hi(t) {
        if (1 === t.nodeType && t.hasAttributes()) return d(t.attributes);
    }
    function li(t, e) {
        for (var i, n, r = t.attributes, s = r.length; s--; ) i = r[s].name, n = r[s].value, 
        e.hasAttribute(i) || Js.test(i) ? "class" === i && !N(n) && (n = n.trim()) && n.split(/\s+/).forEach(function(t) {
            G(e, t);
        }) : e.setAttribute(i, n);
    }
    function ci(t, e) {
        if (e) {
            for (var i, n, r = t._slotContents = Object.create(null), s = 0, o = e.children.length; s < o; s++) i = e.children[s], 
            (n = i.getAttribute("slot")) && (r[n] || (r[n] = [])).push(i), M(i, "slot") && xn('The "slot" attribute must be static.', t.$parent);
            for (n in r) r[n] = ui(r[n], e);
            if (e.hasChildNodes()) {
                var a = e.childNodes;
                if (1 === a.length && 3 === a[0].nodeType && !a[0].data.trim()) return;
                r["default"] = ui(e.childNodes, e);
            }
        }
    }
    function ui(t, e) {
        var i = document.createDocumentFragment();
        t = d(t);
        for (var n = 0, r = t.length; n < r; n++) {
            var s = t[n];
            !it(s) || s.hasAttribute("v-if") || s.hasAttribute("v-for") || (e.removeChild(s), 
            s = Zt(s, !0)), i.appendChild(s);
        }
        return i;
    }
    function fi(t) {
        function e() {}
        function n(t, e) {
            var i = new Ut(e, t, null, {
                lazy: !0
            });
            return function() {
                return i.dirty && i.evaluate(), _t.target && i.depend(), i.value;
            };
        }
        Object.defineProperty(t.prototype, "$data", {
            get: function() {
                return this._data;
            },
            set: function(t) {
                t !== this._data && this._setData(t);
            }
        }), t.prototype._initState = function() {
            this._initProps(), this._initMeta(), this._initMethods(), this._initData(), this._initComputed();
        }, t.prototype._initProps = function() {
            var t = this.$options, e = t.el, i = t.props;
            i && !e && xn("Props will not be compiled if no `el` option is provided at instantiation.", this), 
            e = t.el = L(e), this._propsUnlinkFn = e && 1 === e.nodeType && i ? Me(this, e, i, this._scope) : null;
        }, t.prototype._initData = function() {
            var t = this.$options.data, e = this._data = t ? t() : {};
            g(e) || (e = {}, xn("data functions should return an object.", this));
            var n, r, s = this._props, o = Object.keys(e);
            for (n = o.length; n--; ) r = o[n], s && i(s, r) ? xn('Data field "' + r + '" is already defined as a prop. To provide default value for a prop, use the "default" prop option; if you want to pass prop values to an instantiation call, use the "propsData" option.', this) : this._proxy(r);
            $t(e, this);
        }, t.prototype._setData = function(t) {
            t = t || {};
            var e = this._data;
            this._data = t;
            var n, r, s;
            for (n = Object.keys(e), s = n.length; s--; ) r = n[s], r in t || this._unproxy(r);
            for (n = Object.keys(t), s = n.length; s--; ) r = n[s], i(this, r) || this._proxy(r);
            e.__ob__.removeVm(this), $t(t, this), this._digest();
        }, t.prototype._proxy = function(t) {
            if (!r(t)) {
                var e = this;
                Object.defineProperty(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return e._data[t];
                    },
                    set: function(i) {
                        e._data[t] = i;
                    }
                });
            }
        }, t.prototype._unproxy = function(t) {
            r(t) || delete this[t];
        }, t.prototype._digest = function() {
            for (var t = 0, e = this._watchers.length; t < e; t++) this._watchers[t].update(!0);
        }, t.prototype._initComputed = function() {
            var t = this.$options.computed;
            if (t) for (var i in t) {
                var r = t[i], s = {
                    enumerable: !0,
                    configurable: !0
                };
                "function" == typeof r ? (s.get = n(r, this), s.set = e) : (s.get = r.get ? r.cache !== !1 ? n(r.get, this) : p(r.get, this) : e, 
                s.set = r.set ? p(r.set, this) : e), Object.defineProperty(this, i, s);
            }
        }, t.prototype._initMethods = function() {
            var t = this.$options.methods;
            if (t) for (var e in t) this[e] = p(t[e], this);
        }, t.prototype._initMeta = function() {
            var t = this.$options._meta;
            if (t) for (var e in t) kt(this, e, t[e]);
        };
    }
    function pi(t) {
        function e(t, e) {
            for (var i, n, r, s = e.attributes, o = 0, a = s.length; o < a; o++) i = s[o].name, 
            Qs.test(i) && (i = i.replace(Qs, ""), n = s[o].value, Ht(n) && (n += ".apply(this, $arguments)"), 
            r = (t._scope || t._context).$eval(n, !0), r._fromParent = !0, t.$on(i.replace(Qs), r));
        }
        function i(t, e, i) {
            if (i) {
                var r, s, o, a;
                for (s in i) if (r = i[s], Pi(r)) for (o = 0, a = r.length; o < a; o++) n(t, e, s, r[o]); else n(t, e, s, r);
            }
        }
        function n(t, e, i, r, s) {
            var o = typeof r;
            if ("function" === o) t[e](i, r, s); else if ("string" === o) {
                var a = t.$options.methods, h = a && a[r];
                h ? t[e](i, h, s) : xn('Unknown method: "' + r + '" when registering callback for ' + e + ': "' + i + '".', t);
            } else r && "object" === o && n(t, e, i, r.handler, r);
        }
        function r() {
            this._isAttached || (this._isAttached = !0, this.$children.forEach(s));
        }
        function s(t) {
            !t._isAttached && I(t.$el) && t._callHook("attached");
        }
        function o() {
            this._isAttached && (this._isAttached = !1, this.$children.forEach(a));
        }
        function a(t) {
            t._isAttached && !I(t.$el) && t._callHook("detached");
        }
        t.prototype._initEvents = function() {
            var t = this.$options;
            t._asComponent && e(this, t.el), i(this, "$on", t.events), i(this, "$watch", t.watch);
        }, t.prototype._initDOMHooks = function() {
            this.$on("hook:attached", r), this.$on("hook:detached", o);
        }, t.prototype._callHook = function(t) {
            this.$emit("pre-hook:" + t);
            var e = this.$options[t];
            if (e) for (var i = 0, n = e.length; i < n; i++) e[i].call(this);
            this.$emit("hook:" + t);
        };
    }
    function di() {}
    function vi(t, e, i, n, r, s) {
        this.vm = e, this.el = i, this.descriptor = t, this.name = t.name, this.expression = t.expression, 
        this.arg = t.arg, this.modifiers = t.modifiers, this.filters = t.filters, this.literal = this.modifiers && this.modifiers.literal, 
        this._locked = !1, this._bound = !1, this._listeners = null, this._host = n, this._scope = r, 
        this._frag = s, this.el && (this.el._vue_directives = this.el._vue_directives || [], 
        this.el._vue_directives.push(this));
    }
    function mi(t) {
        t.prototype._updateRef = function(t) {
            var e = this.$options._ref;
            if (e) {
                var i = (this._scope || this._context).$refs;
                t ? i[e] === this && (i[e] = null) : i[e] = this;
            }
        }, t.prototype._compile = function(t) {
            var e = this.$options, i = t;
            if (t = oi(t, e), this._initElement(t), 1 !== t.nodeType || null === H(t, "v-pre")) {
                var n = this._context && this._context.$options, r = We(t, e, n);
                ci(this, e._content);
                var s, o = this.constructor;
                e._linkerCachable && (s = o.linker, s || (s = o.linker = Pe(t, e)));
                var a = r(this, t, this._scope), h = s ? s(this, t) : Pe(t, e)(this, t);
                this._unlinkFn = function() {
                    a(), h(!0);
                }, e.replace && q(i, t), this._isCompiled = !0, this._callHook("compiled");
            }
        }, t.prototype._initElement = function(t) {
            at(t) ? (this._isFragment = !0, this.$el = this._fragmentStart = t.firstChild, this._fragmentEnd = t.lastChild, 
            3 === this._fragmentStart.nodeType && (this._fragmentStart.data = this._fragmentEnd.data = ""), 
            this._fragment = t) : this.$el = t, this.$el.__vue__ = this, this._callHook("beforeCompile");
        }, t.prototype._bindDir = function(t, e, i, n, r) {
            this._directives.push(new vi(t, this, e, i, n, r));
        }, t.prototype._destroy = function(t, e) {
            if (this._isBeingDestroyed) return void (e || this._cleanup());
            var i, n, r = this, s = function() {
                !i || n || e || r._cleanup();
            };
            t && this.$el && (n = !0, this.$remove(function() {
                n = !1, s();
            })), this._callHook("beforeDestroy"), this._isBeingDestroyed = !0;
            var o, a = this.$parent;
            for (a && !a._isBeingDestroyed && (a.$children.$remove(this), this._updateRef(!0)), 
            o = this.$children.length; o--; ) this.$children[o].$destroy();
            for (this._propsUnlinkFn && this._propsUnlinkFn(), this._unlinkFn && this._unlinkFn(), 
            o = this._watchers.length; o--; ) this._watchers[o].teardown();
            this.$el && (this.$el.__vue__ = null), i = !0, s();
        }, t.prototype._cleanup = function() {
            this._isDestroyed || (this._frag && this._frag.children.$remove(this), this._data && this._data.__ob__ && this._data.__ob__.removeVm(this), 
            this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null, 
            this._isDestroyed = !0, this._callHook("destroyed"), this.$off());
        };
    }
    function gi(t) {
        t.prototype._applyFilters = function(t, e, i, n) {
            var r, s, o, a, h, l, c, u, f;
            for (l = 0, c = i.length; l < c; l++) if (r = i[n ? c - l - 1 : l], s = gt(this.$options, "filters", r.name, !0), 
            s && (s = n ? s.write : s.read || s, "function" == typeof s)) {
                if (o = n ? [ t, e ] : [ t ], h = n ? 2 : 1, r.args) for (u = 0, f = r.args.length; u < f; u++) a = r.args[u], 
                o[u + h] = a.dynamic ? this.$get(a.value) : a.value;
                t = s.apply(this, o);
            }
            return t;
        }, t.prototype._resolveComponent = function(e, i) {
            var n;
            if (n = "function" == typeof e ? e : gt(this.$options, "components", e, !0)) if (n.options) i(n); else if (n.resolved) i(n.resolved); else if (n.requested) n.pendingCallbacks.push(i); else {
                n.requested = !0;
                var r = n.pendingCallbacks = [ i ];
                n.call(this, function(e) {
                    g(e) && (e = t.extend(e)), n.resolved = e;
                    for (var i = 0, s = r.length; i < s; i++) r[i](e);
                }, function(t) {
                    xn("Failed to resolve async component" + ("string" == typeof e ? ": " + e : "") + ". " + (t ? "\nReason: " + t : ""));
                });
            }
        };
    }
    function _i(t) {
        function i(t) {
            return JSON.parse(JSON.stringify(t));
        }
        t.prototype.$get = function(t, e) {
            var i = It(t);
            if (i) {
                if (e) {
                    var n = this;
                    return function() {
                        n.$arguments = d(arguments);
                        var t = i.get.call(n, n);
                        return n.$arguments = null, t;
                    };
                }
                try {
                    return i.get.call(this, this);
                } catch (r) {}
            }
        }, t.prototype.$set = function(t, e) {
            var i = It(t, !0);
            i && i.set && i.set.call(this, this, e);
        }, t.prototype.$delete = function(t) {
            e(this._data, t);
        }, t.prototype.$watch = function(t, e, i) {
            var n, r = this;
            "string" == typeof t && (n = A(t), t = n.expression);
            var s = new Ut(r, t, e, {
                deep: i && i.deep,
                sync: i && i.sync,
                filters: n && n.filters,
                user: !i || i.user !== !1
            });
            return i && i.immediate && e.call(r, s.value), function() {
                s.teardown();
            };
        }, t.prototype.$eval = function(t, e) {
            if (Zs.test(t)) {
                var i = A(t), n = this.$get(i.expression, e);
                return i.filters ? this._applyFilters(n, null, i.filters) : n;
            }
            return this.$get(t, e);
        }, t.prototype.$interpolate = function(t) {
            var e = N(t), i = this;
            return e ? 1 === e.length ? i.$eval(e[0].value) + "" : e.map(function(t) {
                return t.tag ? i.$eval(t.value) : t.value;
            }).join("") : t;
        }, t.prototype.$log = function(t) {
            var e = t ? jt(this._data, t) : this._data;
            if (e && (e = i(e)), !t) {
                var n;
                for (n in this.$options.computed) e[n] = i(this[n]);
                if (this._props) for (n in this._props) e[n] = i(this[n]);
            }
            console.log(e);
        };
    }
    function bi(t) {
        function e(t, e, n, r, s, o) {
            e = i(e);
            var a = !I(e), h = r === !1 || a ? s : o, l = !a && !t._isAttached && !I(t.$el);
            return t._isFragment ? (st(t._fragmentStart, t._fragmentEnd, function(i) {
                h(i, e, t);
            }), n && n()) : h(t.$el, e, t, n), l && t._callHook("attached"), t;
        }
        function i(t) {
            return "string" == typeof t ? document.querySelector(t) : t;
        }
        function n(t, e, i, n) {
            e.appendChild(t), n && n();
        }
        function r(t, e, i, n) {
            V(t, e), n && n();
        }
        function s(t, e, i) {
            U(t), i && i();
        }
        t.prototype.$nextTick = function(t) {
            Zi(t, this);
        }, t.prototype.$appendTo = function(t, i, r) {
            return e(this, t, i, r, n, D);
        }, t.prototype.$prependTo = function(t, e, n) {
            return t = i(t), t.hasChildNodes() ? this.$before(t.firstChild, e, n) : this.$appendTo(t, e, n), 
            this;
        }, t.prototype.$before = function(t, i, n) {
            return e(this, t, i, n, r, F);
        }, t.prototype.$after = function(t, e, n) {
            return t = i(t), t.nextSibling ? this.$before(t.nextSibling, e, n) : this.$appendTo(t.parentNode, e, n), 
            this;
        }, t.prototype.$remove = function(t, e) {
            if (!this.$el.parentNode) return t && t();
            var i = this._isAttached && I(this.$el);
            i || (e = !1);
            var n = this, r = function() {
                i && n._callHook("detached"), t && t();
            };
            if (this._isFragment) ot(this._fragmentStart, this._fragmentEnd, this, this._fragment, r); else {
                var o = e === !1 ? s : P;
                o(this.$el, this, r);
            }
            return this;
        };
    }
    function yi(t) {
        function e(t, e, n) {
            var r = t.$parent;
            if (r && n && !i.test(e)) for (;r; ) r._eventsCount[e] = (r._eventsCount[e] || 0) + n, 
            r = r.$parent;
        }
        t.prototype.$on = function(t, i) {
            return (this._events[t] || (this._events[t] = [])).push(i), e(this, t, 1), this;
        }, t.prototype.$once = function(t, e) {
            function i() {
                n.$off(t, i), e.apply(this, arguments);
            }
            var n = this;
            return i.fn = e, this.$on(t, i), this;
        }, t.prototype.$off = function(t, i) {
            var n;
            if (!arguments.length) {
                if (this.$parent) for (t in this._events) n = this._events[t], n && e(this, t, -n.length);
                return this._events = {}, this;
            }
            if (n = this._events[t], !n) return this;
            if (1 === arguments.length) return e(this, t, -n.length), this._events[t] = null, 
            this;
            for (var r, s = n.length; s--; ) if (r = n[s], r === i || r.fn === i) {
                e(this, t, -1), n.splice(s, 1);
                break;
            }
            return this;
        }, t.prototype.$emit = function(t) {
            var e = "string" == typeof t;
            t = e ? t : t.name;
            var i = this._events[t], n = e || !i;
            if (i) {
                i = i.length > 1 ? d(i) : i;
                var r = e && i.some(function(t) {
                    return t._fromParent;
                });
                r && (n = !1);
                for (var s = d(arguments, 1), o = 0, a = i.length; o < a; o++) {
                    var h = i[o], l = h.apply(this, s);
                    l !== !0 || r && !h._fromParent || (n = !0);
                }
            }
            return n;
        }, t.prototype.$broadcast = function(t) {
            var e = "string" == typeof t;
            if (t = e ? t : t.name, this._eventsCount[t]) {
                var i = this.$children, n = d(arguments);
                e && (n[0] = {
                    name: t,
                    source: this
                });
                for (var r = 0, s = i.length; r < s; r++) {
                    var o = i[r], a = o.$emit.apply(o, n);
                    a && o.$broadcast.apply(o, n);
                }
                return this;
            }
        }, t.prototype.$dispatch = function(t) {
            var e = this.$emit.apply(this, arguments);
            if (e) {
                var i = this.$parent, n = d(arguments);
                for (n[0] = {
                    name: t,
                    source: this
                }; i; ) e = i.$emit.apply(i, n), i = e ? i.$parent : null;
                return this;
            }
        };
        var i = /^hook:/;
    }
    function wi(t) {
        function e() {
            this._isAttached = !0, this._isReady = !0, this._callHook("ready");
        }
        t.prototype.$mount = function(t) {
            return this._isCompiled ? void xn("$mount() should be called only once.", this) : (t = L(t), 
            t || (t = document.createElement("div")), this._compile(t), this._initDOMHooks(), 
            I(this.$el) ? (this._callHook("attached"), e.call(this)) : this.$once("hook:attached", e), 
            this);
        }, t.prototype.$destroy = function(t, e) {
            this._destroy(t, e);
        }, t.prototype.$compile = function(t, e, i, n) {
            return Pe(t, this.$options, !0)(this, t, e, i, n);
        };
    }
    function Ci(t) {
        this._init(t);
    }
    function $i(t, e, i) {
        return i = i ? parseInt(i, 10) : 0, e = o(e), "number" == typeof e ? t.slice(i, i + e) : t;
    }
    function ki(t, e, i) {
        if (t = to(t), null == e) return t;
        if ("function" == typeof e) return t.filter(e);
        e = ("" + e).toLowerCase();
        for (var n, r, s, o, a = "in" === i ? 3 : 2, h = Array.prototype.concat.apply([], d(arguments, a)), l = [], c = 0, u = t.length; c < u; c++) if (n = t[c], 
        s = n && n.$value || n, o = h.length) {
            for (;o--; ) if (r = h[o], "$key" === r && Ai(n.$key, e) || Ai(jt(s, r), e)) {
                l.push(n);
                break;
            }
        } else Ai(n, e) && l.push(n);
        return l;
    }
    function xi(t) {
        function e(t, e, i) {
            var r = n[i];
            return r && ("$key" !== r && (m(t) && "$value" in t && (t = t.$value), m(e) && "$value" in e && (e = e.$value)), 
            t = m(t) ? jt(t, r) : t, e = m(e) ? jt(e, r) : e), t === e ? 0 : t > e ? s : -s;
        }
        var i = null, n = void 0;
        t = to(t);
        var r = d(arguments, 1), s = r[r.length - 1];
        "number" == typeof s ? (s = s < 0 ? -1 : 1, r = r.length > 1 ? r.slice(0, -1) : r) : s = 1;
        var o = r[0];
        return o ? ("function" == typeof o ? i = function(t, e) {
            return o(t, e) * s;
        } : (n = Array.prototype.concat.apply([], r), i = function(t, r, s) {
            return s = s || 0, s >= n.length - 1 ? e(t, r, s) : e(t, r, s) || i(t, r, s + 1);
        }), t.slice().sort(i)) : t;
    }
    function Ai(t, e) {
        var i;
        if (g(t)) {
            var n = Object.keys(t);
            for (i = n.length; i--; ) if (Ai(t[n[i]], e)) return !0;
        } else if (Pi(t)) {
            for (i = t.length; i--; ) if (Ai(t[i], e)) return !0;
        } else if (null != t) return t.toString().toLowerCase().indexOf(e) > -1;
    }
    function Ti(i) {
        function n(t) {
            return new Function("return function " + f(t) + " (options) { this._init(options) }")();
        }
        i.options = {
            directives: ys,
            elementDirectives: Ks,
            filters: io,
            transitions: {},
            components: {},
            partials: {},
            replace: !0
        }, i.util = Hn, i.config = kn, i.set = t, i["delete"] = e, i.nextTick = Zi, i.compiler = Ys, 
        i.FragmentFactory = re, i.internalDirectives = Hs, i.parsers = {
            path: nr,
            text: wn,
            template: Dr,
            directive: vn,
            expression: gr
        }, i.cid = 0;
        var r = 1;
        i.extend = function(t) {
            t = t || {};
            var e = this, i = 0 === e.cid;
            if (i && t._Ctor) return t._Ctor;
            var s = t.name || e.options.name;
            /^[a-zA-Z][\w-]*$/.test(s) || (xn('Invalid component name: "' + s + '". Component names can only contain alphanumeric characaters and the hyphen.'), 
            s = null);
            var o = n(s || "VueComponent");
            return o.prototype = Object.create(e.prototype), o.prototype.constructor = o, o.cid = r++, 
            o.options = mt(e.options, t), o["super"] = e, o.extend = e.extend, kn._assetTypes.forEach(function(t) {
                o[t] = e[t];
            }), s && (o.options.components[s] = o), i && (t._Ctor = o), o;
        }, i.use = function(t) {
            if (!t.installed) {
                var e = d(arguments, 1);
                return e.unshift(this), "function" == typeof t.install ? t.install.apply(t, e) : t.apply(null, e), 
                t.installed = !0, this;
            }
        }, i.mixin = function(t) {
            i.options = mt(i.options, t);
        }, kn._assetTypes.forEach(function(t) {
            i[t] = function(e, n) {
                return n ? ("component" === t && (Nn.test(e) || jn.test(e)) && xn("Do not use built-in or reserved HTML elements as component id: " + e), 
                "component" === t && g(n) && (n.name = e, n = i.extend(n)), this.options[t + "s"][e] = n, 
                n) : this.options[t + "s"][e];
            };
        }), v(i.transition, Tn);
    }
    var Oi = Object.prototype.hasOwnProperty, Ni = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/, ji = /-(\w)/g, Ei = /([a-z\d])([A-Z])/g, Si = /(?:^|[-_\/])(\w)/g, Di = Object.prototype.toString, Fi = "[object Object]", Pi = Array.isArray, Ri = "__proto__" in {}, Li = "undefined" != typeof window && "[object Object]" !== Object.prototype.toString.call(window), Ii = Li && window.__VUE_DEVTOOLS_GLOBAL_HOOK__, Hi = Li && window.navigator.userAgent.toLowerCase(), Mi = Hi && Hi.indexOf("msie 9.0") > 0, Wi = Hi && Hi.indexOf("android") > 0, Vi = Hi && /(iphone|ipad|ipod|ios)/i.test(Hi), Bi = Hi && Hi.indexOf("micromessenger") > 0, Ui = void 0, zi = void 0, qi = void 0, Ji = void 0;
    if (Li && !Mi) {
        var Yi = void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend, Qi = void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend;
        Ui = Yi ? "WebkitTransition" : "transition", zi = Yi ? "webkitTransitionEnd" : "transitionend", 
        qi = Qi ? "WebkitAnimation" : "animation", Ji = Qi ? "webkitAnimationEnd" : "animationend";
    }
    var Zi = function() {
        function t() {
            n = !1;
            var t = i.slice(0);
            i = [];
            for (var e = 0; e < t.length; e++) t[e]();
        }
        var e, i = [], n = !1;
        if ("undefined" == typeof MutationObserver || Bi && Vi) {
            var r = Li ? window : "undefined" != typeof global ? global : {};
            e = r.setImmediate || setTimeout;
        } else {
            var s = 1, o = new MutationObserver(t), a = document.createTextNode(s);
            o.observe(a, {
                characterData: !0
            }), e = function() {
                s = (s + 1) % 2, a.data = s;
            };
        }
        return function(r, s) {
            var o = s ? function() {
                r.call(s);
            } : r;
            i.push(o), n || (n = !0, e(t, 0));
        };
    }(), Gi = void 0;
    "undefined" != typeof Set && Set.toString().match(/native code/) ? Gi = Set : (Gi = function() {
        this.set = Object.create(null);
    }, Gi.prototype.has = function(t) {
        return void 0 !== this.set[t];
    }, Gi.prototype.add = function(t) {
        this.set[t] = 1;
    }, Gi.prototype.clear = function() {
        this.set = Object.create(null);
    });
    var Xi = $.prototype;
    Xi.put = function(t, e) {
        var i;
        this.size === this.limit && (i = this.shift());
        var n = this.get(t, !0);
        return n || (n = {
            key: t
        }, this._keymap[t] = n, this.tail ? (this.tail.newer = n, n.older = this.tail) : this.head = n, 
        this.tail = n, this.size++), n.value = e, i;
    }, Xi.shift = function() {
        var t = this.head;
        return t && (this.head = this.head.newer, this.head.older = void 0, t.newer = t.older = void 0, 
        this._keymap[t.key] = void 0, this.size--), t;
    }, Xi.get = function(t, e) {
        var i = this._keymap[t];
        if (void 0 !== i) return i === this.tail ? e ? i : i.value : (i.newer && (i === this.head && (this.head = i.newer), 
        i.newer.older = i.older), i.older && (i.older.newer = i.newer), i.newer = void 0, 
        i.older = this.tail, this.tail && (this.tail.newer = i), this.tail = i, e ? i : i.value);
    };
    var Ki, tn, en, nn, rn, sn, on, an, hn, ln, cn, un, fn = new $(1e3), pn = /[^\s'"]+|'[^']*'|"[^"]*"/g, dn = /^in$|^-?\d+/, vn = Object.freeze({
        parseDirective: A
    }), mn = /[-.*+?^${}()|[\]\/\\]/g, gn = void 0, _n = void 0, bn = void 0, yn = /[^|]\|[^|]/, wn = Object.freeze({
        compileRegex: O,
        parseText: N,
        tokensToExp: j
    }), Cn = [ "{{", "}}" ], $n = [ "{{{", "}}}" ], kn = Object.defineProperties({
        debug: !1,
        silent: !1,
        async: !0,
        warnExpressionErrors: !0,
        devtools: !0,
        _delimitersChanged: !0,
        _assetTypes: [ "component", "directive", "elementDirective", "filter", "transition", "partial" ],
        _propBindingModes: {
            ONE_WAY: 0,
            TWO_WAY: 1,
            ONE_TIME: 2
        },
        _maxUpdateCount: 100
    }, {
        delimiters: {
            get: function() {
                return Cn;
            },
            set: function(t) {
                Cn = t, O();
            },
            configurable: !0,
            enumerable: !0
        },
        unsafeDelimiters: {
            get: function() {
                return $n;
            },
            set: function(t) {
                $n = t, O();
            },
            configurable: !0,
            enumerable: !0
        }
    }), xn = void 0, An = void 0;
    !function() {
        var t = "undefined" != typeof console;
        xn = function(e, i) {
            t && !kn.silent && console.error("[Vue warn]: " + e + (i ? An(i) : ""));
        }, An = function(t) {
            var e = t._isVue ? t.$options.name : t.name;
            return e ? " (found in component: <" + u(e) + ">)" : "";
        };
    }();
    var Tn = Object.freeze({
        appendWithTransition: D,
        beforeWithTransition: F,
        removeWithTransition: P,
        applyTransition: R
    }), On = /^v-ref:/, Nn = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i, jn = /^(slot|partial|component)$/i, En = void 0;
    En = function(t, e) {
        return e.indexOf("-") > -1 ? t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : /HTMLUnknownElement/.test(t.toString()) && !/^(data|time|rtc|rb)$/.test(e);
    };
    var Sn = kn.optionMergeStrategies = Object.create(null);
    Sn.data = function(t, e, i) {
        return i ? t || e ? function() {
            var n = "function" == typeof e ? e.call(i) : e, r = "function" == typeof t ? t.call(i) : void 0;
            return n ? ut(n, r) : r;
        } : void 0 : e ? "function" != typeof e ? (xn('The "data" option should be a function that returns a per-instance value in component definitions.', i), 
        t) : t ? function() {
            return ut(e.call(this), t.call(this));
        } : e : t;
    }, Sn.el = function(t, e, i) {
        if (!i && e && "function" != typeof e) return void xn('The "el" option should be a function that returns a per-instance value in component definitions.', i);
        var n = e || t;
        return i && "function" == typeof n ? n.call(i) : n;
    }, Sn.init = Sn.created = Sn.ready = Sn.attached = Sn.detached = Sn.beforeCompile = Sn.compiled = Sn.beforeDestroy = Sn.destroyed = Sn.activate = function(t, e) {
        return e ? t ? t.concat(e) : Pi(e) ? e : [ e ] : t;
    }, kn._assetTypes.forEach(function(t) {
        Sn[t + "s"] = ft;
    }), Sn.watch = Sn.events = function(t, e) {
        if (!e) return t;
        if (!t) return e;
        var i = {};
        v(i, t);
        for (var n in e) {
            var r = i[n], s = e[n];
            r && !Pi(r) && (r = [ r ]), i[n] = r ? r.concat(s) : [ s ];
        }
        return i;
    }, Sn.props = Sn.methods = Sn.computed = function(t, e) {
        if (!e) return t;
        if (!t) return e;
        var i = Object.create(null);
        return v(i, t), v(i, e), i;
    };
    var Dn = function(t, e) {
        return void 0 === e ? t : e;
    }, Fn = 0;
    _t.target = null, _t.prototype.addSub = function(t) {
        this.subs.push(t);
    }, _t.prototype.removeSub = function(t) {
        this.subs.$remove(t);
    }, _t.prototype.depend = function() {
        _t.target.addDep(this);
    }, _t.prototype.notify = function() {
        for (var t = d(this.subs), e = 0, i = t.length; e < i; e++) t[e].update();
    };
    var Pn = Array.prototype, Rn = Object.create(Pn);
    [ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(t) {
        var e = Pn[t];
        _(Rn, t, function() {
            for (var i = arguments.length, n = new Array(i); i--; ) n[i] = arguments[i];
            var r, s = e.apply(this, n), o = this.__ob__;
            switch (t) {
              case "push":
                r = n;
                break;

              case "unshift":
                r = n;
                break;

              case "splice":
                r = n.slice(2);
            }
            return r && o.observeArray(r), o.dep.notify(), s;
        });
    }), _(Pn, "$set", function(t, e) {
        return t >= this.length && (this.length = Number(t) + 1), this.splice(t, 1, e)[0];
    }), _(Pn, "$remove", function(t) {
        if (this.length) {
            var e = y(this, t);
            return e > -1 ? this.splice(e, 1) : void 0;
        }
    });
    var Ln = Object.getOwnPropertyNames(Rn), In = !0;
    yt.prototype.walk = function(t) {
        for (var e = Object.keys(t), i = 0, n = e.length; i < n; i++) this.convert(e[i], t[e[i]]);
    }, yt.prototype.observeArray = function(t) {
        for (var e = 0, i = t.length; e < i; e++) $t(t[e]);
    }, yt.prototype.convert = function(t, e) {
        kt(this.value, t, e);
    }, yt.prototype.addVm = function(t) {
        (this.vms || (this.vms = [])).push(t);
    }, yt.prototype.removeVm = function(t) {
        this.vms.$remove(t);
    };
    var Hn = Object.freeze({
        defineReactive: kt,
        set: t,
        del: e,
        hasOwn: i,
        isLiteral: n,
        isReserved: r,
        _toString: s,
        toNumber: o,
        toBoolean: a,
        stripQuotes: h,
        camelize: l,
        hyphenate: u,
        classify: f,
        bind: p,
        toArray: d,
        extend: v,
        isObject: m,
        isPlainObject: g,
        def: _,
        debounce: b,
        indexOf: y,
        cancellable: w,
        looseEqual: C,
        isArray: Pi,
        hasProto: Ri,
        inBrowser: Li,
        devtools: Ii,
        isIE9: Mi,
        isAndroid: Wi,
        isIos: Vi,
        isWechat: Bi,
        get transitionProp() {
            return Ui;
        },
        get transitionEndEvent() {
            return zi;
        },
        get animationProp() {
            return qi;
        },
        get animationEndEvent() {
            return Ji;
        },
        nextTick: Zi,
        get _Set() {
            return Gi;
        },
        query: L,
        inDoc: I,
        getAttr: H,
        getBindAttr: M,
        hasBindAttr: W,
        before: V,
        after: B,
        remove: U,
        prepend: z,
        replace: q,
        on: J,
        off: Y,
        setClass: Z,
        addClass: G,
        removeClass: X,
        extractContent: K,
        trimNode: tt,
        isTemplate: it,
        createAnchor: nt,
        findRef: rt,
        mapNodeRange: st,
        removeNodeRange: ot,
        isFragment: at,
        getOuterHTML: ht,
        mergeOptions: mt,
        resolveAsset: gt,
        checkComponentAttr: lt,
        commonTagRE: Nn,
        reservedTagRE: jn,
        get warn() {
            return xn;
        }
    }), Mn = 0, Wn = new $(1e3), Vn = 0, Bn = 1, Un = 2, zn = 3, qn = 0, Jn = 1, Yn = 2, Qn = 3, Zn = 4, Gn = 5, Xn = 6, Kn = 7, tr = 8, er = [];
    er[qn] = {
        ws: [ qn ],
        ident: [ Qn, Vn ],
        "[": [ Zn ],
        eof: [ Kn ]
    }, er[Jn] = {
        ws: [ Jn ],
        ".": [ Yn ],
        "[": [ Zn ],
        eof: [ Kn ]
    }, er[Yn] = {
        ws: [ Yn ],
        ident: [ Qn, Vn ]
    }, er[Qn] = {
        ident: [ Qn, Vn ],
        "0": [ Qn, Vn ],
        number: [ Qn, Vn ],
        ws: [ Jn, Bn ],
        ".": [ Yn, Bn ],
        "[": [ Zn, Bn ],
        eof: [ Kn, Bn ]
    }, er[Zn] = {
        "'": [ Gn, Vn ],
        '"': [ Xn, Vn ],
        "[": [ Zn, Un ],
        "]": [ Jn, zn ],
        eof: tr,
        "else": [ Zn, Vn ]
    }, er[Gn] = {
        "'": [ Zn, Vn ],
        eof: tr,
        "else": [ Gn, Vn ]
    }, er[Xn] = {
        '"': [ Zn, Vn ],
        eof: tr,
        "else": [ Xn, Vn ]
    };
    var ir;
    ir = function(t, e) {
        xn('You are setting a non-existent path "' + t.raw + '" on a vm instance. Consider pre-initializing the property with the "data" option for more reliable reactivity and better performance.', e);
    };
    var nr = Object.freeze({
        parsePath: Nt,
        getPath: jt,
        setPath: Et
    }), rr = new $(1e3), sr = "Math,Date,this,true,false,null,undefined,Infinity,NaN,isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,parseInt,parseFloat", or = new RegExp("^(" + sr.replace(/,/g, "\\b|") + "\\b)"), ar = "break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,protected,static,interface,private,public", hr = new RegExp("^(" + ar.replace(/,/g, "\\b|") + "\\b)"), lr = /\s/g, cr = /\n/g, ur = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g, fr = /"(\d+)"/g, pr = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/, dr = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g, vr = /^(?:true|false)$/, mr = [], gr = Object.freeze({
        parseExpression: It,
        isSimplePath: Ht
    }), _r = [], br = [], yr = {}, wr = {}, Cr = !1, $r = 0;
    Ut.prototype.get = function() {
        this.beforeGet();
        var t, e = this.scope || this.vm;
        try {
            t = this.getter.call(e, e);
        } catch (i) {
            kn.warnExpressionErrors && xn('Error when evaluating expression "' + this.expression + '": ' + i.toString(), this.vm);
        }
        return this.deep && zt(t), this.preProcess && (t = this.preProcess(t)), this.filters && (t = e._applyFilters(t, null, this.filters, !1)), 
        this.postProcess && (t = this.postProcess(t)), this.afterGet(), t;
    }, Ut.prototype.set = function(t) {
        var e = this.scope || this.vm;
        this.filters && (t = e._applyFilters(t, this.value, this.filters, !0));
        try {
            this.setter.call(e, e, t);
        } catch (i) {
            kn.warnExpressionErrors && xn('Error when evaluating setter "' + this.expression + '": ' + i.toString(), this.vm);
        }
        var n = e.$forContext;
        if (n && n.alias === this.expression) {
            if (n.filters) return void xn("It seems you are using two-way binding on a v-for alias (" + this.expression + "), and the v-for has filters. This will not work properly. Either remove the filters or use an array of objects and bind to object properties instead.", this.vm);
            n._withLock(function() {
                e.$key ? n.rawValue[e.$key] = t : n.rawValue.$set(e.$index, t);
            });
        }
    }, Ut.prototype.beforeGet = function() {
        _t.target = this;
    }, Ut.prototype.addDep = function(t) {
        var e = t.id;
        this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this));
    }, Ut.prototype.afterGet = function() {
        _t.target = null;
        for (var t = this.deps.length; t--; ) {
            var e = this.deps[t];
            this.newDepIds.has(e.id) || e.removeSub(this);
        }
        var i = this.depIds;
        this.depIds = this.newDepIds, this.newDepIds = i, this.newDepIds.clear(), i = this.deps, 
        this.deps = this.newDeps, this.newDeps = i, this.newDeps.length = 0;
    }, Ut.prototype.update = function(t) {
        this.lazy ? this.dirty = !0 : this.sync || !kn.async ? this.run() : (this.shallow = this.queued ? !!t && this.shallow : !!t, 
        this.queued = !0, kn.debug && (this.prevError = new Error("[vue] async stack trace")), 
        Bt(this));
    }, Ut.prototype.run = function() {
        if (this.active) {
            var t = this.get();
            if (t !== this.value || (m(t) || this.deep) && !this.shallow) {
                var e = this.value;
                this.value = t;
                var i = this.prevError;
                if (kn.debug && i) {
                    this.prevError = null;
                    try {
                        this.cb.call(this.vm, t, e);
                    } catch (n) {
                        throw Zi(function() {
                            throw i;
                        }, 0), n;
                    }
                } else this.cb.call(this.vm, t, e);
            }
            this.queued = this.shallow = !1;
        }
    }, Ut.prototype.evaluate = function() {
        var t = _t.target;
        this.value = this.get(), this.dirty = !1, _t.target = t;
    }, Ut.prototype.depend = function() {
        for (var t = this.deps.length; t--; ) this.deps[t].depend();
    }, Ut.prototype.teardown = function() {
        if (this.active) {
            this.vm._isBeingDestroyed || this.vm._vForRemoving || this.vm._watchers.$remove(this);
            for (var t = this.deps.length; t--; ) this.deps[t].removeSub(this);
            this.active = !1, this.vm = this.cb = this.value = null;
        }
    };
    var kr = new Gi(), xr = {
        bind: function() {
            this.attr = 3 === this.el.nodeType ? "data" : "textContent";
        },
        update: function(t) {
            this.el[this.attr] = s(t);
        }
    }, Ar = new $(1e3), Tr = new $(1e3), Or = {
        efault: [ 0, "", "" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ]
    };
    Or.td = Or.th = [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ], Or.option = Or.optgroup = [ 1, '<select multiple="multiple">', "</select>" ], 
    Or.thead = Or.tbody = Or.colgroup = Or.caption = Or.tfoot = [ 1, "<table>", "</table>" ], 
    Or.g = Or.defs = Or.symbol = Or.use = Or.image = Or.text = Or.circle = Or.ellipse = Or.line = Or.path = Or.polygon = Or.polyline = Or.rect = [ 1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"version="1.1">', "</svg>" ];
    var Nr = /<([\w:-]+)/, jr = /&#?\w+?;/, Er = function() {
        if (Li) {
            var t = document.createElement("div");
            return t.innerHTML = "<template>1</template>", !t.cloneNode(!0).firstChild.innerHTML;
        }
        return !1;
    }(), Sr = function() {
        if (Li) {
            var t = document.createElement("textarea");
            return t.placeholder = "t", "t" === t.cloneNode(!0).value;
        }
        return !1;
    }(), Dr = Object.freeze({
        cloneNode: Qt,
        parseTemplate: Zt
    }), Fr = {
        bind: function() {
            8 === this.el.nodeType && (this.nodes = [], this.anchor = nt("v-html"), q(this.el, this.anchor));
        },
        update: function(t) {
            t = s(t), this.nodes ? this.swap(t) : this.el.innerHTML = t;
        },
        swap: function(t) {
            for (var e = this.nodes.length; e--; ) U(this.nodes[e]);
            var i = Zt(t, !0, !0);
            this.nodes = d(i.childNodes), V(i, this.anchor);
        }
    };
    Gt.prototype.callHook = function(t) {
        var e, i;
        for (e = 0, i = this.childFrags.length; e < i; e++) this.childFrags[e].callHook(t);
        for (e = 0, i = this.children.length; e < i; e++) t(this.children[e]);
    }, Gt.prototype.beforeRemove = function() {
        var t, e;
        for (t = 0, e = this.childFrags.length; t < e; t++) this.childFrags[t].beforeRemove(!1);
        for (t = 0, e = this.children.length; t < e; t++) this.children[t].$destroy(!1, !0);
        var i = this.unlink.dirs;
        for (t = 0, e = i.length; t < e; t++) i[t]._watcher && i[t]._watcher.teardown();
    }, Gt.prototype.destroy = function() {
        this.parentFrag && this.parentFrag.childFrags.$remove(this), this.node.__v_frag = null, 
        this.unlink();
    };
    var Pr = new $(5e3);
    re.prototype.create = function(t, e, i) {
        var n = Qt(this.template);
        return new Gt(this.linker, this.vm, n, t, e, i);
    };
    var Rr = 700, Lr = 800, Ir = 850, Hr = 1100, Mr = 1500, Wr = 1500, Vr = 1750, Br = 2100, Ur = 2200, zr = 2300, qr = 0, Jr = {
        priority: Ur,
        terminal: !0,
        params: [ "track-by", "stagger", "enter-stagger", "leave-stagger" ],
        bind: function() {
            var t = this.expression.match(/(.*) (?:in|of) (.*)/);
            if (t) {
                var e = t[1].match(/\((.*),(.*)\)/);
                e ? (this.iterator = e[1].trim(), this.alias = e[2].trim()) : this.alias = t[1].trim(), 
                this.expression = t[2];
            }
            if (!this.alias) return void xn('Invalid v-for expression "' + this.descriptor.raw + '": alias is required.', this.vm);
            this.id = "__v-for__" + ++qr;
            var i = this.el.tagName;
            this.isOption = ("OPTION" === i || "OPTGROUP" === i) && "SELECT" === this.el.parentNode.tagName, 
            this.start = nt("v-for-start"), this.end = nt("v-for-end"), q(this.el, this.end), 
            V(this.start, this.end), this.cache = Object.create(null), this.factory = new re(this.vm, this.el);
        },
        update: function(t) {
            this.diff(t), this.updateRef(), this.updateModel();
        },
        diff: function(t) {
            var e, n, r, s, o, a, h = t[0], l = this.fromObject = m(h) && i(h, "$key") && i(h, "$value"), c = this.params.trackBy, u = this.frags, f = this.frags = new Array(t.length), p = this.alias, d = this.iterator, v = this.start, g = this.end, _ = I(v), b = !u;
            for (e = 0, n = t.length; e < n; e++) h = t[e], s = l ? h.$key : null, o = l ? h.$value : h, 
            a = !m(o), r = !b && this.getCachedFrag(o, e, s), r ? (r.reused = !0, r.scope.$index = e, 
            s && (r.scope.$key = s), d && (r.scope[d] = null !== s ? s : e), (c || l || a) && bt(function() {
                r.scope[p] = o;
            })) : (r = this.create(o, p, e, s), r.fresh = !b), f[e] = r, b && r.before(g);
            if (!b) {
                var y = 0, w = u.length - f.length;
                for (this.vm._vForRemoving = !0, e = 0, n = u.length; e < n; e++) r = u[e], r.reused || (this.deleteCachedFrag(r), 
                this.remove(r, y++, w, _));
                this.vm._vForRemoving = !1, y && (this.vm._watchers = this.vm._watchers.filter(function(t) {
                    return t.active;
                }));
                var C, $, k, x = 0;
                for (e = 0, n = f.length; e < n; e++) r = f[e], C = f[e - 1], $ = C ? C.staggerCb ? C.staggerAnchor : C.end || C.node : v, 
                r.reused && !r.staggerCb ? (k = se(r, v, this.id), k === C || k && se(k, v, this.id) === C || this.move(r, $)) : this.insert(r, x++, $, _), 
                r.reused = r.fresh = !1;
            }
        },
        create: function(t, e, i, n) {
            var r = this._host, s = this._scope || this.vm, o = Object.create(s);
            o.$refs = Object.create(s.$refs), o.$els = Object.create(s.$els), o.$parent = s, 
            o.$forContext = this, bt(function() {
                kt(o, e, t);
            }), kt(o, "$index", i), n ? kt(o, "$key", n) : o.$key && _(o, "$key", null), this.iterator && kt(o, this.iterator, null !== n ? n : i);
            var a = this.factory.create(r, o, this._frag);
            return a.forId = this.id, this.cacheFrag(t, a, i, n), a;
        },
        updateRef: function() {
            var t = this.descriptor.ref;
            if (t) {
                var e, i = (this._scope || this.vm).$refs;
                this.fromObject ? (e = {}, this.frags.forEach(function(t) {
                    e[t.scope.$key] = oe(t);
                })) : e = this.frags.map(oe), i[t] = e;
            }
        },
        updateModel: function() {
            if (this.isOption) {
                var t = this.start.parentNode, e = t && t.__v_model;
                e && e.forceUpdate();
            }
        },
        insert: function(t, e, i, n) {
            t.staggerCb && (t.staggerCb.cancel(), t.staggerCb = null);
            var r = this.getStagger(t, e, null, "enter");
            if (n && r) {
                var s = t.staggerAnchor;
                s || (s = t.staggerAnchor = nt("stagger-anchor"), s.__v_frag = t), B(s, i);
                var o = t.staggerCb = w(function() {
                    t.staggerCb = null, t.before(s), U(s);
                });
                setTimeout(o, r);
            } else {
                var a = i.nextSibling;
                a || (B(this.end, i), a = this.end), t.before(a);
            }
        },
        remove: function(t, e, i, n) {
            if (t.staggerCb) return t.staggerCb.cancel(), void (t.staggerCb = null);
            var r = this.getStagger(t, e, i, "leave");
            if (n && r) {
                var s = t.staggerCb = w(function() {
                    t.staggerCb = null, t.remove();
                });
                setTimeout(s, r);
            } else t.remove();
        },
        move: function(t, e) {
            e.nextSibling || this.end.parentNode.appendChild(this.end), t.before(e.nextSibling, !1);
        },
        cacheFrag: function(t, e, n, r) {
            var s, o = this.params.trackBy, a = this.cache, h = !m(t);
            r || o || h ? (s = he(n, r, t, o), a[s] ? "$index" !== o && this.warnDuplicate(t) : a[s] = e) : (s = this.id, 
            i(t, s) ? null === t[s] ? t[s] = e : this.warnDuplicate(t) : Object.isExtensible(t) ? _(t, s, e) : xn("Frozen v-for objects cannot be automatically tracked, make sure to provide a track-by key.")), 
            e.raw = t;
        },
        getCachedFrag: function(t, e, i) {
            var n, r = this.params.trackBy, s = !m(t);
            if (i || r || s) {
                var o = he(e, i, t, r);
                n = this.cache[o];
            } else n = t[this.id];
            return n && (n.reused || n.fresh) && this.warnDuplicate(t), n;
        },
        deleteCachedFrag: function(t) {
            var e = t.raw, n = this.params.trackBy, r = t.scope, s = r.$index, o = i(r, "$key") && r.$key, a = !m(e);
            if (n || o || a) {
                var h = he(s, o, e, n);
                this.cache[h] = null;
            } else e[this.id] = null, t.raw = null;
        },
        getStagger: function(t, e, i, n) {
            n += "Stagger";
            var r = t.node.__v_trans, s = r && r.hooks, o = s && (s[n] || s.stagger);
            return o ? o.call(t, e, i) : e * parseInt(this.params[n] || this.params.stagger, 10);
        },
        _preProcess: function(t) {
            return this.rawValue = t, t;
        },
        _postProcess: function(t) {
            if (Pi(t)) return t;
            if (g(t)) {
                for (var e, i = Object.keys(t), n = i.length, r = new Array(n); n--; ) e = i[n], 
                r[n] = {
                    $key: e,
                    $value: t[e]
                };
                return r;
            }
            return "number" != typeof t || isNaN(t) || (t = ae(t)), t || [];
        },
        unbind: function() {
            if (this.descriptor.ref && ((this._scope || this.vm).$refs[this.descriptor.ref] = null), 
            this.frags) for (var t, e = this.frags.length; e--; ) t = this.frags[e], this.deleteCachedFrag(t), 
            t.destroy();
        }
    };
    Jr.warnDuplicate = function(t) {
        xn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(t) + '. Use track-by="$index" if you are expecting duplicate values.', this.vm);
    };
    var Yr = {
        priority: Br,
        terminal: !0,
        bind: function() {
            var t = this.el;
            if (t.__vue__) xn('v-if="' + this.expression + '" cannot be used on an instance root element.', this.vm), 
            this.invalid = !0; else {
                var e = t.nextElementSibling;
                e && null !== H(e, "v-else") && (U(e), this.elseEl = e), this.anchor = nt("v-if"), 
                q(t, this.anchor);
            }
        },
        update: function(t) {
            this.invalid || (t ? this.frag || this.insert() : this.remove());
        },
        insert: function() {
            this.elseFrag && (this.elseFrag.remove(), this.elseFrag = null), this.factory || (this.factory = new re(this.vm, this.el)), 
            this.frag = this.factory.create(this._host, this._scope, this._frag), this.frag.before(this.anchor);
        },
        remove: function() {
            this.frag && (this.frag.remove(), this.frag = null), this.elseEl && !this.elseFrag && (this.elseFactory || (this.elseFactory = new re(this.elseEl._context || this.vm, this.elseEl)), 
            this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag), this.elseFrag.before(this.anchor));
        },
        unbind: function() {
            this.frag && this.frag.destroy(), this.elseFrag && this.elseFrag.destroy();
        }
    }, Qr = {
        bind: function() {
            var t = this.el.nextElementSibling;
            t && null !== H(t, "v-else") && (this.elseEl = t);
        },
        update: function(t) {
            this.apply(this.el, t), this.elseEl && this.apply(this.elseEl, !t);
        },
        apply: function(t, e) {
            function i() {
                t.style.display = e ? "" : "none";
            }
            I(t) ? R(t, e ? 1 : -1, i, this.vm) : i();
        }
    }, Zr = {
        bind: function() {
            var t = this, e = this.el, i = "range" === e.type, n = this.params.lazy, r = this.params.number, s = this.params.debounce, a = !1;
            if (Wi || i || (this.on("compositionstart", function() {
                a = !0;
            }), this.on("compositionend", function() {
                a = !1, n || t.listener();
            })), this.focused = !1, i || n || (this.on("focus", function() {
                t.focused = !0;
            }), this.on("blur", function() {
                t.focused = !1, t._frag && !t._frag.inserted || t.rawListener();
            })), this.listener = this.rawListener = function() {
                if (!a && t._bound) {
                    var n = r || i ? o(e.value) : e.value;
                    t.set(n), Zi(function() {
                        t._bound && !t.focused && t.update(t._watcher.value);
                    });
                }
            }, s && (this.listener = b(this.listener, s)), this.hasjQuery = "function" == typeof jQuery, 
            this.hasjQuery) {
                var h = jQuery.fn.on ? "on" : "bind";
                jQuery(e)[h]("change", this.rawListener), n || jQuery(e)[h]("input", this.listener);
            } else this.on("change", this.rawListener), n || this.on("input", this.listener);
            !n && Mi && (this.on("cut", function() {
                Zi(t.listener);
            }), this.on("keyup", function(e) {
                46 !== e.keyCode && 8 !== e.keyCode || t.listener();
            })), (e.hasAttribute("value") || "TEXTAREA" === e.tagName && e.value.trim()) && (this.afterBind = this.listener);
        },
        update: function(t) {
            this.el.value = s(t);
        },
        unbind: function() {
            var t = this.el;
            if (this.hasjQuery) {
                var e = jQuery.fn.off ? "off" : "unbind";
                jQuery(t)[e]("change", this.listener), jQuery(t)[e]("input", this.listener);
            }
        }
    }, Gr = {
        bind: function() {
            var t = this, e = this.el;
            this.getValue = function() {
                if (e.hasOwnProperty("_value")) return e._value;
                var i = e.value;
                return t.params.number && (i = o(i)), i;
            }, this.listener = function() {
                t.set(t.getValue());
            }, this.on("change", this.listener), e.hasAttribute("checked") && (this.afterBind = this.listener);
        },
        update: function(t) {
            this.el.checked = C(t, this.getValue());
        }
    }, Xr = {
        bind: function() {
            var t = this, e = this.el;
            this.forceUpdate = function() {
                t._watcher && t.update(t._watcher.get());
            };
            var i = this.multiple = e.hasAttribute("multiple");
            this.listener = function() {
                var n = le(e, i);
                n = t.params.number ? Pi(n) ? n.map(o) : o(n) : n, t.set(n);
            }, this.on("change", this.listener);
            var n = le(e, i, !0);
            (i && n.length || !i && null !== n) && (this.afterBind = this.listener), this.vm.$on("hook:attached", this.forceUpdate);
        },
        update: function(t) {
            var e = this.el;
            e.selectedIndex = -1;
            for (var i, n, r = this.multiple && Pi(t), s = e.options, o = s.length; o--; ) i = s[o], 
            n = i.hasOwnProperty("_value") ? i._value : i.value, i.selected = r ? ce(t, n) > -1 : C(t, n);
        },
        unbind: function() {
            this.vm.$off("hook:attached", this.forceUpdate);
        }
    }, Kr = {
        bind: function() {
            function t() {
                var t = i.checked;
                return t && i.hasOwnProperty("_trueValue") ? i._trueValue : !t && i.hasOwnProperty("_falseValue") ? i._falseValue : t;
            }
            var e = this, i = this.el;
            this.getValue = function() {
                return i.hasOwnProperty("_value") ? i._value : e.params.number ? o(i.value) : i.value;
            }, this.listener = function() {
                var n = e._watcher.value;
                if (Pi(n)) {
                    var r = e.getValue();
                    i.checked ? y(n, r) < 0 && n.push(r) : n.$remove(r);
                } else e.set(t());
            }, this.on("change", this.listener), i.hasAttribute("checked") && (this.afterBind = this.listener);
        },
        update: function(t) {
            var e = this.el;
            Pi(t) ? e.checked = y(t, this.getValue()) > -1 : e.hasOwnProperty("_trueValue") ? e.checked = C(t, e._trueValue) : e.checked = !!t;
        }
    }, ts = {
        text: Zr,
        radio: Gr,
        select: Xr,
        checkbox: Kr
    }, es = {
        priority: Lr,
        twoWay: !0,
        handlers: ts,
        params: [ "lazy", "number", "debounce" ],
        bind: function() {
            this.checkFilters(), this.hasRead && !this.hasWrite && xn('It seems you are using a read-only filter with v-model="' + this.descriptor.raw + '". You might want to use a two-way filter to ensure correct behavior.', this.vm);
            var t, e = this.el, i = e.tagName;
            if ("INPUT" === i) t = ts[e.type] || ts.text; else if ("SELECT" === i) t = ts.select; else {
                if ("TEXTAREA" !== i) return void xn("v-model does not support element type: " + i, this.vm);
                t = ts.text;
            }
            e.__v_model = this, t.bind.call(this), this.update = t.update, this._unbind = t.unbind;
        },
        checkFilters: function() {
            var t = this.filters;
            if (t) for (var e = t.length; e--; ) {
                var i = gt(this.vm.$options, "filters", t[e].name);
                ("function" == typeof i || i.read) && (this.hasRead = !0), i.write && (this.hasWrite = !0);
            }
        },
        unbind: function() {
            this.el.__v_model = null, this._unbind && this._unbind();
        }
    }, is = {
        esc: 27,
        tab: 9,
        enter: 13,
        space: 32,
        "delete": [ 8, 46 ],
        up: 38,
        left: 37,
        right: 39,
        down: 40
    }, ns = {
        priority: Rr,
        acceptStatement: !0,
        keyCodes: is,
        bind: function() {
            if ("IFRAME" === this.el.tagName && "load" !== this.arg) {
                var t = this;
                this.iframeBind = function() {
                    J(t.el.contentWindow, t.arg, t.handler, t.modifiers.capture);
                }, this.on("load", this.iframeBind);
            }
        },
        update: function(t) {
            if (this.descriptor.raw || (t = function() {}), "function" != typeof t) return void xn("v-on:" + this.arg + '="' + this.expression + '" expects a function value, got ' + t, this.vm);
            this.modifiers.stop && (t = fe(t)), this.modifiers.prevent && (t = pe(t)), this.modifiers.self && (t = de(t));
            var e = Object.keys(this.modifiers).filter(function(t) {
                return "stop" !== t && "prevent" !== t && "self" !== t && "capture" !== t;
            });
            e.length && (t = ue(t, e)), this.reset(), this.handler = t, this.iframeBind ? this.iframeBind() : J(this.el, this.arg, this.handler, this.modifiers.capture);
        },
        reset: function() {
            var t = this.iframeBind ? this.el.contentWindow : this.el;
            this.handler && Y(t, this.arg, this.handler);
        },
        unbind: function() {
            this.reset();
        }
    }, rs = [ "-webkit-", "-moz-", "-ms-" ], ss = [ "Webkit", "Moz", "ms" ], os = /!important;?$/, as = Object.create(null), hs = null, ls = {
        deep: !0,
        update: function(t) {
            "string" == typeof t ? this.el.style.cssText = t : Pi(t) ? this.handleObject(t.reduce(v, {})) : this.handleObject(t || {});
        },
        handleObject: function(t) {
            var e, i, n = this.cache || (this.cache = {});
            for (e in n) e in t || (this.handleSingle(e, null), delete n[e]);
            for (e in t) i = t[e], i !== n[e] && (n[e] = i, this.handleSingle(e, i));
        },
        handleSingle: function(t, e) {
            if (t = ve(t)) if (null != e && (e += ""), e) {
                var i = os.test(e) ? "important" : "";
                i ? (xn("It's probably a bad idea to use !important with inline rules. This feature will be deprecated in a future version of Vue."), 
                e = e.replace(os, "").trim(), this.el.style.setProperty(t.kebab, e, i)) : this.el.style[t.camel] = e;
            } else this.el.style[t.camel] = "";
        }
    }, cs = "http://www.w3.org/1999/xlink", us = /^xlink:/, fs = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/, ps = /^(?:value|checked|selected|muted)$/, ds = /^(?:draggable|contenteditable|spellcheck)$/, vs = {
        value: "_value",
        "true-value": "_trueValue",
        "false-value": "_falseValue"
    }, ms = {
        priority: Ir,
        bind: function() {
            var t = this.arg, e = this.el.tagName;
            t || (this.deep = !0);
            var i = this.descriptor, n = i.interp;
            if (n) {
                i.hasOneTime && (this.expression = j(n, this._scope || this.vm)), (fs.test(t) || "name" === t && ("PARTIAL" === e || "SLOT" === e)) && (xn(t + '="' + i.raw + '": attribute interpolation is not allowed in Vue.js directives and special attributes.', this.vm), 
                this.el.removeAttribute(t), this.invalid = !0);
                var r = t + '="' + i.raw + '": ';
                "src" === t && xn(r + 'interpolation in "src" attribute will cause a 404 request. Use v-bind:src instead.', this.vm), 
                "style" === t && xn(r + 'interpolation in "style" attribute will cause the attribute to be discarded in Internet Explorer. Use v-bind:style instead.', this.vm);
            }
        },
        update: function(t) {
            if (!this.invalid) {
                var e = this.arg;
                this.arg ? this.handleSingle(e, t) : this.handleObject(t || {});
            }
        },
        handleObject: ls.handleObject,
        handleSingle: function(t, e) {
            var i = this.el, n = this.descriptor.interp;
            if (this.modifiers.camel && (t = l(t)), !n && ps.test(t) && t in i) {
                var r = "value" === t && null == e ? "" : e;
                i[t] !== r && (i[t] = r);
            }
            var s = vs[t];
            if (!n && s) {
                i[s] = e;
                var o = i.__v_model;
                o && o.listener();
            }
            return "value" === t && "TEXTAREA" === i.tagName ? void i.removeAttribute(t) : void (ds.test(t) ? i.setAttribute(t, e ? "true" : "false") : null != e && e !== !1 ? "class" === t ? (i.__v_trans && (e += " " + i.__v_trans.id + "-transition"), 
            Z(i, e)) : us.test(t) ? i.setAttributeNS(cs, t, e === !0 ? "" : e) : i.setAttribute(t, e === !0 ? "" : e) : i.removeAttribute(t));
        }
    }, gs = {
        priority: Mr,
        bind: function() {
            if (this.arg) {
                var t = this.id = l(this.arg), e = (this._scope || this.vm).$els;
                i(e, t) ? e[t] = this.el : kt(e, t, this.el);
            }
        },
        unbind: function() {
            var t = (this._scope || this.vm).$els;
            t[this.id] === this.el && (t[this.id] = null);
        }
    }, _s = {
        bind: function() {
            xn("v-ref:" + this.arg + " must be used on a child component. Found on <" + this.el.tagName.toLowerCase() + ">.", this.vm);
        }
    }, bs = {
        bind: function() {
            var t = this.el;
            this.vm.$once("pre-hook:compiled", function() {
                t.removeAttribute("v-cloak");
            });
        }
    }, ys = {
        text: xr,
        html: Fr,
        "for": Jr,
        "if": Yr,
        show: Qr,
        model: es,
        on: ns,
        bind: ms,
        el: gs,
        ref: _s,
        cloak: bs
    }, ws = {
        deep: !0,
        update: function(t) {
            t ? "string" == typeof t ? this.setClass(t.trim().split(/\s+/)) : this.setClass(ge(t)) : this.cleanup();
        },
        setClass: function(t) {
            this.cleanup(t);
            for (var e = 0, i = t.length; e < i; e++) {
                var n = t[e];
                n && _e(this.el, n, G);
            }
            this.prevKeys = t;
        },
        cleanup: function(t) {
            var e = this.prevKeys;
            if (e) for (var i = e.length; i--; ) {
                var n = e[i];
                (!t || t.indexOf(n) < 0) && _e(this.el, n, X);
            }
        }
    }, Cs = {
        priority: Wr,
        params: [ "keep-alive", "transition-mode", "inline-template" ],
        bind: function() {
            this.el.__vue__ ? xn('cannot mount component "' + this.expression + '" on already mounted element: ' + this.el) : (this.keepAlive = this.params.keepAlive, 
            this.keepAlive && (this.cache = {}), this.params.inlineTemplate && (this.inlineTemplate = K(this.el, !0)), 
            this.pendingComponentCb = this.Component = null, this.pendingRemovals = 0, this.pendingRemovalCb = null, 
            this.anchor = nt("v-component"), q(this.el, this.anchor), this.el.removeAttribute("is"), 
            this.el.removeAttribute(":is"), this.descriptor.ref && this.el.removeAttribute("v-ref:" + u(this.descriptor.ref)), 
            this.literal && this.setComponent(this.expression));
        },
        update: function(t) {
            this.literal || this.setComponent(t);
        },
        setComponent: function(t, e) {
            if (this.invalidatePending(), t) {
                var i = this;
                this.resolveComponent(t, function() {
                    i.mountComponent(e);
                });
            } else this.unbuild(!0), this.remove(this.childVM, e), this.childVM = null;
        },
        resolveComponent: function(t, e) {
            var i = this;
            this.pendingComponentCb = w(function(n) {
                i.ComponentName = n.options.name || ("string" == typeof t ? t : null), i.Component = n, 
                e();
            }), this.vm._resolveComponent(t, this.pendingComponentCb);
        },
        mountComponent: function(t) {
            this.unbuild(!0);
            var e = this, i = this.Component.options.activate, n = this.getCached(), r = this.build();
            i && !n ? (this.waitingFor = r, be(i, r, function() {
                e.waitingFor === r && (e.waitingFor = null, e.transition(r, t));
            })) : (n && r._updateRef(), this.transition(r, t));
        },
        invalidatePending: function() {
            this.pendingComponentCb && (this.pendingComponentCb.cancel(), this.pendingComponentCb = null);
        },
        build: function(t) {
            var e = this.getCached();
            if (e) return e;
            if (this.Component) {
                var i = {
                    name: this.ComponentName,
                    el: Qt(this.el),
                    template: this.inlineTemplate,
                    parent: this._host || this.vm,
                    _linkerCachable: !this.inlineTemplate,
                    _ref: this.descriptor.ref,
                    _asComponent: !0,
                    _isRouterView: this._isRouterView,
                    _context: this.vm,
                    _scope: this._scope,
                    _frag: this._frag
                };
                t && v(i, t);
                var n = new this.Component(i);
                return this.keepAlive && (this.cache[this.Component.cid] = n), this.el.hasAttribute("transition") && n._isFragment && xn("Transitions will not work on a fragment instance. Template: " + n.$options.template, n), 
                n;
            }
        },
        getCached: function() {
            return this.keepAlive && this.cache[this.Component.cid];
        },
        unbuild: function(t) {
            this.waitingFor && (this.keepAlive || this.waitingFor.$destroy(), this.waitingFor = null);
            var e = this.childVM;
            return !e || this.keepAlive ? void (e && (e._inactive = !0, e._updateRef(!0))) : void e.$destroy(!1, t);
        },
        remove: function(t, e) {
            var i = this.keepAlive;
            if (t) {
                this.pendingRemovals++, this.pendingRemovalCb = e;
                var n = this;
                t.$remove(function() {
                    n.pendingRemovals--, i || t._cleanup(), !n.pendingRemovals && n.pendingRemovalCb && (n.pendingRemovalCb(), 
                    n.pendingRemovalCb = null);
                });
            } else e && e();
        },
        transition: function(t, e) {
            var i = this, n = this.childVM;
            switch (n && (n._inactive = !0), t._inactive = !1, this.childVM = t, i.params.transitionMode) {
              case "in-out":
                t.$before(i.anchor, function() {
                    i.remove(n, e);
                });
                break;

              case "out-in":
                i.remove(n, function() {
                    t.$before(i.anchor, e);
                });
                break;

              default:
                i.remove(n), t.$before(i.anchor, e);
            }
        },
        unbind: function() {
            if (this.invalidatePending(), this.unbuild(), this.cache) {
                for (var t in this.cache) this.cache[t].$destroy();
                this.cache = null;
            }
        }
    }, $s = kn._propBindingModes, ks = {}, xs = /^[$_a-zA-Z]+[\w$]*$/, As = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/, Ts = kn._propBindingModes, Os = {
        bind: function() {
            var t = this.vm, e = t._context, i = this.descriptor.prop, n = i.path, r = i.parentPath, s = i.mode === Ts.TWO_WAY, o = this.parentWatcher = new Ut(e, r, function(e) {
                ke(t, i, e);
            }, {
                twoWay: s,
                filters: i.filters,
                scope: this._scope
            });
            if ($e(t, i, o.value), s) {
                var a = this;
                t.$once("pre-hook:created", function() {
                    a.childWatcher = new Ut(t, n, function(t) {
                        o.set(t);
                    }, {
                        sync: !0
                    });
                });
            }
        },
        unbind: function() {
            this.parentWatcher.teardown(), this.childWatcher && this.childWatcher.teardown();
        }
    }, Ns = [], js = !1, Es = "transition", Ss = "animation", Ds = Ui + "Duration", Fs = qi + "Duration", Ps = Li && window.requestAnimationFrame, Rs = Ps ? function(t) {
        Ps(function() {
            Ps(t);
        });
    } : function(t) {
        setTimeout(t, 50);
    }, Ls = De.prototype;
    Ls.enter = function(t, e) {
        this.cancelPending(), this.callHook("beforeEnter"), this.cb = e, G(this.el, this.enterClass), 
        t(), this.entered = !1, this.callHookWithCb("enter"), this.entered || (this.cancel = this.hooks && this.hooks.enterCancelled, 
        Ee(this.enterNextTick));
    }, Ls.enterNextTick = function() {
        var t = this;
        this.justEntered = !0, Rs(function() {
            t.justEntered = !1;
        });
        var e = this.enterDone, i = this.getCssTransitionType(this.enterClass);
        this.pendingJsCb ? i === Es && X(this.el, this.enterClass) : i === Es ? (X(this.el, this.enterClass), 
        this.setupCssCb(zi, e)) : i === Ss ? this.setupCssCb(Ji, e) : e();
    }, Ls.enterDone = function() {
        this.entered = !0, this.cancel = this.pendingJsCb = null, X(this.el, this.enterClass), 
        this.callHook("afterEnter"), this.cb && this.cb();
    }, Ls.leave = function(t, e) {
        this.cancelPending(), this.callHook("beforeLeave"), this.op = t, this.cb = e, G(this.el, this.leaveClass), 
        this.left = !1, this.callHookWithCb("leave"), this.left || (this.cancel = this.hooks && this.hooks.leaveCancelled, 
        this.op && !this.pendingJsCb && (this.justEntered ? this.leaveDone() : Ee(this.leaveNextTick)));
    }, Ls.leaveNextTick = function() {
        var t = this.getCssTransitionType(this.leaveClass);
        if (t) {
            var e = t === Es ? zi : Ji;
            this.setupCssCb(e, this.leaveDone);
        } else this.leaveDone();
    }, Ls.leaveDone = function() {
        this.left = !0, this.cancel = this.pendingJsCb = null, this.op(), X(this.el, this.leaveClass), 
        this.callHook("afterLeave"), this.cb && this.cb(), this.op = null;
    }, Ls.cancelPending = function() {
        this.op = this.cb = null;
        var t = !1;
        this.pendingCssCb && (t = !0, Y(this.el, this.pendingCssEvent, this.pendingCssCb), 
        this.pendingCssEvent = this.pendingCssCb = null), this.pendingJsCb && (t = !0, this.pendingJsCb.cancel(), 
        this.pendingJsCb = null), t && (X(this.el, this.enterClass), X(this.el, this.leaveClass)), 
        this.cancel && (this.cancel.call(this.vm, this.el), this.cancel = null);
    }, Ls.callHook = function(t) {
        this.hooks && this.hooks[t] && this.hooks[t].call(this.vm, this.el);
    }, Ls.callHookWithCb = function(t) {
        var e = this.hooks && this.hooks[t];
        e && (e.length > 1 && (this.pendingJsCb = w(this[t + "Done"])), e.call(this.vm, this.el, this.pendingJsCb));
    }, Ls.getCssTransitionType = function(t) {
        if (!(!zi || document.hidden || this.hooks && this.hooks.css === !1 || Fe(this.el))) {
            var e = this.type || this.typeCache[t];
            if (e) return e;
            var i = this.el.style, n = window.getComputedStyle(this.el), r = i[Ds] || n[Ds];
            if (r && "0s" !== r) e = Es; else {
                var s = i[Fs] || n[Fs];
                s && "0s" !== s && (e = Ss);
            }
            return e && (this.typeCache[t] = e), e;
        }
    }, Ls.setupCssCb = function(t, e) {
        this.pendingCssEvent = t;
        var i = this, n = this.el, r = this.pendingCssCb = function(s) {
            s.target === n && (Y(n, t, r), i.pendingCssEvent = i.pendingCssCb = null, !i.pendingJsCb && e && e());
        };
        J(n, t, r);
    };
    var Is = {
        priority: Hr,
        update: function(t, e) {
            var i = this.el, n = gt(this.vm.$options, "transitions", t);
            t = t || "v", i.__v_trans = new De(i, t, n, this.vm), e && X(i, e + "-transition"), 
            G(i, t + "-transition");
        }
    }, Hs = {
        style: ls,
        "class": ws,
        component: Cs,
        prop: Os,
        transition: Is
    }, Ms = /^v-bind:|^:/, Ws = /^v-on:|^@/, Vs = /^v-([^:]+)(?:$|:(.*)$)/, Bs = /\.[^\.]+/g, Us = /^(v-bind:|:)?transition$/, zs = 1e3, qs = 2e3;
    Ke.terminal = !0;
    var Js = /[^\w\-:\.]/, Ys = Object.freeze({
        compile: Pe,
        compileAndLinkProps: Me,
        compileRoot: We,
        transclude: oi,
        resolveSlots: ci
    }), Qs = /^v-on:|^@/;
    vi.prototype._bind = function() {
        var t = this.name, e = this.descriptor;
        if (("cloak" !== t || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
            var i = e.attr || "v-" + t;
            this.el.removeAttribute(i);
        }
        var n = e.def;
        if ("function" == typeof n ? this.update = n : v(this, n), this._setupParams(), 
        this.bind && this.bind(), this._bound = !0, this.literal) this.update && this.update(e.raw); else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
            var r = this;
            this.update ? this._update = function(t, e) {
                r._locked || r.update(t, e);
            } : this._update = di;
            var s = this._preProcess ? p(this._preProcess, this) : null, o = this._postProcess ? p(this._postProcess, this) : null, a = this._watcher = new Ut(this.vm, this.expression, this._update, {
                filters: this.filters,
                twoWay: this.twoWay,
                deep: this.deep,
                preProcess: s,
                postProcess: o,
                scope: this._scope
            });
            this.afterBind ? this.afterBind() : this.update && this.update(a.value);
        }
    }, vi.prototype._setupParams = function() {
        if (this.params) {
            var t = this.params;
            this.params = Object.create(null);
            for (var e, i, n, r = t.length; r--; ) e = u(t[r]), n = l(e), i = M(this.el, e), 
            null != i ? this._setupParamWatcher(n, i) : (i = H(this.el, e), null != i && (this.params[n] = "" === i || i));
        }
    }, vi.prototype._setupParamWatcher = function(t, e) {
        var i = this, n = !1, r = (this._scope || this.vm).$watch(e, function(e, r) {
            if (i.params[t] = e, n) {
                var s = i.paramWatchers && i.paramWatchers[t];
                s && s.call(i, e, r);
            } else n = !0;
        }, {
            immediate: !0,
            user: !1
        });
        (this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(r);
    }, vi.prototype._checkStatement = function() {
        var t = this.expression;
        if (t && this.acceptStatement && !Ht(t)) {
            var e = It(t).get, i = this._scope || this.vm, n = function(t) {
                i.$event = t, e.call(i, i), i.$event = null;
            };
            return this.filters && (n = i._applyFilters(n, null, this.filters)), this.update(n), 
            !0;
        }
    }, vi.prototype.set = function(t) {
        this.twoWay ? this._withLock(function() {
            this._watcher.set(t);
        }) : xn("Directive.set() can only be used inside twoWaydirectives.");
    }, vi.prototype._withLock = function(t) {
        var e = this;
        e._locked = !0, t.call(e), Zi(function() {
            e._locked = !1;
        });
    }, vi.prototype.on = function(t, e, i) {
        J(this.el, t, e, i), (this._listeners || (this._listeners = [])).push([ t, e ]);
    }, vi.prototype._teardown = function() {
        if (this._bound) {
            this._bound = !1, this.unbind && this.unbind(), this._watcher && this._watcher.teardown();
            var t, e = this._listeners;
            if (e) for (t = e.length; t--; ) Y(this.el, e[t][0], e[t][1]);
            var i = this._paramUnwatchFns;
            if (i) for (t = i.length; t--; ) i[t]();
            this.el && this.el._vue_directives.$remove(this), this.vm = this.el = this._watcher = this._listeners = null;
        }
    };
    var Zs = /[^|]\|[^|]/;
    xt(Ci), fi(Ci), pi(Ci), mi(Ci), gi(Ci), _i(Ci), bi(Ci), yi(Ci), wi(Ci);
    var Gs = {
        priority: zr,
        params: [ "name" ],
        bind: function() {
            var t = this.params.name || "default", e = this.vm._slotContents && this.vm._slotContents[t];
            e && e.hasChildNodes() ? this.compile(e.cloneNode(!0), this.vm._context, this.vm) : this.fallback();
        },
        compile: function(t, e, i) {
            if (t && e) {
                if (this.el.hasChildNodes() && 1 === t.childNodes.length && 1 === t.childNodes[0].nodeType && t.childNodes[0].hasAttribute("v-if")) {
                    var n = document.createElement("template");
                    n.setAttribute("v-else", ""), n.innerHTML = this.el.innerHTML, n._context = this.vm, 
                    t.appendChild(n);
                }
                var r = i ? i._scope : this._scope;
                this.unlink = e.$compile(t, i, r, this._frag);
            }
            t ? q(this.el, t) : U(this.el);
        },
        fallback: function() {
            this.compile(K(this.el, !0), this.vm);
        },
        unbind: function() {
            this.unlink && this.unlink();
        }
    }, Xs = {
        priority: Vr,
        params: [ "name" ],
        paramWatchers: {
            name: function(t) {
                Yr.remove.call(this), t && this.insert(t);
            }
        },
        bind: function() {
            this.anchor = nt("v-partial"), q(this.el, this.anchor), this.insert(this.params.name);
        },
        insert: function(t) {
            var e = gt(this.vm.$options, "partials", t, !0);
            e && (this.factory = new re(this.vm, e), Yr.insert.call(this));
        },
        unbind: function() {
            this.frag && this.frag.destroy();
        }
    }, Ks = {
        slot: Gs,
        partial: Xs
    }, to = Jr._postProcess, eo = /(\d{3})(?=\d)/g, io = {
        orderBy: xi,
        filterBy: ki,
        limitBy: $i,
        json: {
            read: function(t, e) {
                return "string" == typeof t ? t : JSON.stringify(t, null, Number(e) || 2);
            },
            write: function(t) {
                try {
                    return JSON.parse(t);
                } catch (e) {
                    return t;
                }
            }
        },
        capitalize: function(t) {
            return t || 0 === t ? (t = t.toString(), t.charAt(0).toUpperCase() + t.slice(1)) : "";
        },
        uppercase: function(t) {
            return t || 0 === t ? t.toString().toUpperCase() : "";
        },
        lowercase: function(t) {
            return t || 0 === t ? t.toString().toLowerCase() : "";
        },
        currency: function(t, e, i) {
            if (t = parseFloat(t), !isFinite(t) || !t && 0 !== t) return "";
            e = null != e ? e : "$", i = null != i ? i : 2;
            var n = Math.abs(t).toFixed(i), r = i ? n.slice(0, -1 - i) : n, s = r.length % 3, o = s > 0 ? r.slice(0, s) + (r.length > 3 ? "," : "") : "", a = i ? n.slice(-1 - i) : "", h = t < 0 ? "-" : "";
            return h + e + o + r.slice(s).replace(eo, "$1,") + a;
        },
        pluralize: function(t) {
            var e = d(arguments, 1);
            return e.length > 1 ? e[t % 10 - 1] || e[e.length - 1] : e[0] + (1 === t ? "" : "s");
        },
        debounce: function(t, e) {
            if (t) return e || (e = 300), b(t, e);
        }
    };
    return Ti(Ci), Ci.version = "1.0.24", setTimeout(function() {
        kn.devtools && (Ii ? Ii.emit("init", Ci) : Li && /Chrome\/\d+/.test(window.navigator.userAgent) && console.log("Download the Vue Devtools for a better development experience:\nhttps://github.com/vuejs/vue-devtools"));
    }, 0), Ci;
});
(function(e) {
    function t(e, t, n) {
        switch (arguments.length) {
          case 2:
            return null != e ? e : t;

          case 3:
            return null != e ? e : null != t ? t : n;

          default:
            throw new Error("Implement me");
        }
    }
    function n() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        };
    }
    function r(e, t) {
        function n() {
            he.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
        }
        var r = !0;
        return d(function() {
            return r && (n(), r = !1), t.apply(this, arguments);
        }, t);
    }
    function s(e, t) {
        return function(n) {
            return h(e.call(this, n), t);
        };
    }
    function a(e, t) {
        return function(n) {
            return this.lang().ordinal(e.call(this, n), t);
        };
    }
    function i() {}
    function o(e) {
        b(e), d(this, e);
    }
    function u(e) {
        var t = g(e), n = t.year || 0, r = t.quarter || 0, s = t.month || 0, a = t.week || 0, i = t.day || 0, o = t.hour || 0, u = t.minute || 0, d = t.second || 0, c = t.millisecond || 0;
        this._milliseconds = +c + 1e3 * d + 6e4 * u + 36e5 * o, this._days = +i + 7 * a, 
        this._months = +s + 3 * r + 12 * n, this._data = {}, this._bubble();
    }
    function d(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return t.hasOwnProperty("toString") && (e.toString = t.toString), t.hasOwnProperty("valueOf") && (e.valueOf = t.valueOf), 
        e;
    }
    function c(e) {
        var t, n = {};
        for (t in e) e.hasOwnProperty(t) && Se.hasOwnProperty(t) && (n[t] = e[t]);
        return n;
    }
    function f(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
    }
    function h(e, t, n) {
        for (var r = "" + Math.abs(e), s = e >= 0; r.length < t; ) r = "0" + r;
        return (s ? n ? "+" : "" : "-") + r;
    }
    function l(e, t, n, r) {
        var s = t._milliseconds, a = t._days, i = t._months;
        r = null == r || r, s && e._d.setTime(+e._d + s * n), a && oe(e, "Date", ie(e, "Date") + a * n), 
        i && ae(e, ie(e, "Month") + i * n), r && he.updateOffset(e, a || i);
    }
    function _(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }
    function m(e) {
        return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date;
    }
    function y(e, t, n) {
        var r, s = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), i = 0;
        for (r = 0; r < s; r++) (n && e[r] !== t[r] || !n && w(e[r]) !== w(t[r])) && i++;
        return i + a;
    }
    function p(e) {
        if (e) {
            var t = e.toLowerCase().replace(/(.)s$/, "$1");
            e = tt[e] || nt[t] || t;
        }
        return e;
    }
    function g(e) {
        var t, n, r = {};
        for (n in e) e.hasOwnProperty(n) && (t = p(n), t && (r[t] = e[n]));
        return r;
    }
    function Y(t) {
        var n, r;
        if (0 === t.indexOf("week")) n = 7, r = "day"; else {
            if (0 !== t.indexOf("month")) return;
            n = 12, r = "month";
        }
        he[t] = function(s, a) {
            var i, o, u = he.fn._lang[t], d = [];
            if ("number" == typeof s && (a = s, s = e), o = function(e) {
                var t = he().utc().set(r, e);
                return u.call(he.fn._lang, t, s || "");
            }, null != a) return o(a);
            for (i = 0; i < n; i++) d.push(o(i));
            return d;
        };
    }
    function w(e) {
        var t = +e, n = 0;
        return 0 !== t && isFinite(t) && (n = t >= 0 ? Math.floor(t) : Math.ceil(t)), n;
    }
    function M(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
    }
    function D(e, t, n) {
        return te(he([ e, 11, 31 + t - n ]), t, n).week;
    }
    function v(e) {
        return k(e) ? 366 : 365;
    }
    function k(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
    }
    function b(e) {
        var t;
        e._a && e._pf.overflow === -2 && (t = e._a[Ye] < 0 || e._a[Ye] > 11 ? Ye : e._a[we] < 1 || e._a[we] > M(e._a[ge], e._a[Ye]) ? we : e._a[Me] < 0 || e._a[Me] > 23 ? Me : e._a[De] < 0 || e._a[De] > 59 ? De : e._a[ve] < 0 || e._a[ve] > 59 ? ve : e._a[ke] < 0 || e._a[ke] > 999 ? ke : -1, 
        e._pf._overflowDayOfYear && (t < ge || t > we) && (t = we), e._pf.overflow = t);
    }
    function S(e) {
        return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, 
        e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length)), 
        e._isValid;
    }
    function T(e) {
        return e ? e.toLowerCase().replace("_", "-") : e;
    }
    function O(e, t) {
        return t._isUTC ? he(e).zone(t._offset || 0) : he(e).local();
    }
    function W(e, t) {
        return t.abbr = e, be[e] || (be[e] = new i()), be[e].set(t), be[e];
    }
    function G(e) {
        delete be[e];
    }
    function F(e) {
        var t, n, r, s, a = 0, i = function(e) {
            if (!be[e] && Te) try {
                require("./lang/" + e);
            } catch (t) {}
            return be[e];
        };
        if (!e) return he.fn._lang;
        if (!_(e)) {
            if (n = i(e)) return n;
            e = [ e ];
        }
        for (;a < e.length; ) {
            for (s = T(e[a]).split("-"), t = s.length, r = T(e[a + 1]), r = r ? r.split("-") : null; t > 0; ) {
                if (n = i(s.slice(0, t).join("-"))) return n;
                if (r && r.length >= t && y(s, r, !0) >= t - 1) break;
                t--;
            }
            a++;
        }
        return he.fn._lang;
    }
    function C(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
    }
    function P(e) {
        var t, n, r = e.match(Fe);
        for (t = 0, n = r.length; t < n; t++) ot[r[t]] ? r[t] = ot[r[t]] : r[t] = C(r[t]);
        return function(s) {
            var a = "";
            for (t = 0; t < n; t++) a += r[t] instanceof Function ? r[t].call(s, e) : r[t];
            return a;
        };
    }
    function U(e, t) {
        return e.isValid() ? (t = z(t, e.lang()), rt[t] || (rt[t] = P(t)), rt[t](e)) : e.lang().invalidDate();
    }
    function z(e, t) {
        function n(e) {
            return t.longDateFormat(e) || e;
        }
        var r = 5;
        for (Ce.lastIndex = 0; r >= 0 && Ce.test(e); ) e = e.replace(Ce, n), Ce.lastIndex = 0, 
        r -= 1;
        return e;
    }
    function L(e, t) {
        var n, r = t._strict;
        switch (e) {
          case "Q":
            return Ee;

          case "DDDD":
            return Ve;

          case "YYYY":
          case "GGGG":
          case "gggg":
            return r ? qe : ze;

          case "Y":
          case "G":
          case "g":
            return Je;

          case "YYYYYY":
          case "YYYYY":
          case "GGGGG":
          case "ggggg":
            return r ? $e : Le;

          case "S":
            if (r) return Ee;

          case "SS":
            if (r) return je;

          case "SSS":
            if (r) return Ve;

          case "DDD":
            return Ue;

          case "MMM":
          case "MMMM":
          case "dd":
          case "ddd":
          case "dddd":
            return Ie;

          case "a":
          case "A":
            return F(t._l)._meridiemParse;

          case "X":
            return Ne;

          case "Z":
          case "ZZ":
            return xe;

          case "T":
            return Ae;

          case "SSSS":
            return He;

          case "MM":
          case "DD":
          case "YY":
          case "GG":
          case "gg":
          case "HH":
          case "hh":
          case "mm":
          case "ss":
          case "ww":
          case "WW":
            return r ? je : Pe;

          case "M":
          case "D":
          case "d":
          case "H":
          case "h":
          case "m":
          case "s":
          case "w":
          case "W":
          case "e":
          case "E":
            return Pe;

          case "Do":
            return Ze;

          default:
            return n = new RegExp(V(j(e.replace("\\", "")), "i"));
        }
    }
    function H(e) {
        e = e || "";
        var t = e.match(xe) || [], n = t[t.length - 1] || [], r = (n + "").match(Ke) || [ "-", 0, 0 ], s = +(60 * r[1]) + w(r[2]);
        return "+" === r[0] ? -s : s;
    }
    function I(e, t, n) {
        var r, s = n._a;
        switch (e) {
          case "Q":
            null != t && (s[Ye] = 3 * (w(t) - 1));
            break;

          case "M":
          case "MM":
            null != t && (s[Ye] = w(t) - 1);
            break;

          case "MMM":
          case "MMMM":
            r = F(n._l).monthsParse(t), null != r ? s[Ye] = r : n._pf.invalidMonth = t;
            break;

          case "D":
          case "DD":
            null != t && (s[we] = w(t));
            break;

          case "Do":
            null != t && (s[we] = w(parseInt(t, 10)));
            break;

          case "DDD":
          case "DDDD":
            null != t && (n._dayOfYear = w(t));
            break;

          case "YY":
            s[ge] = he.parseTwoDigitYear(t);
            break;

          case "YYYY":
          case "YYYYY":
          case "YYYYYY":
            s[ge] = w(t);
            break;

          case "a":
          case "A":
            n._isPm = F(n._l).isPM(t);
            break;

          case "H":
          case "HH":
          case "h":
          case "hh":
            s[Me] = w(t);
            break;

          case "m":
          case "mm":
            s[De] = w(t);
            break;

          case "s":
          case "ss":
            s[ve] = w(t);
            break;

          case "S":
          case "SS":
          case "SSS":
          case "SSSS":
            s[ke] = w(1e3 * ("0." + t));
            break;

          case "X":
            n._d = new Date(1e3 * parseFloat(t));
            break;

          case "Z":
          case "ZZ":
            n._useUTC = !0, n._tzm = H(t);
            break;

          case "dd":
          case "ddd":
          case "dddd":
            r = F(n._l).weekdaysParse(t), null != r ? (n._w = n._w || {}, n._w.d = r) : n._pf.invalidWeekday = t;
            break;

          case "w":
          case "ww":
          case "W":
          case "WW":
          case "d":
          case "e":
          case "E":
            e = e.substr(0, 1);

          case "gggg":
          case "GGGG":
          case "GGGGG":
            e = e.substr(0, 2), t && (n._w = n._w || {}, n._w[e] = w(t));
            break;

          case "gg":
          case "GG":
            n._w = n._w || {}, n._w[e] = he.parseTwoDigitYear(t);
        }
    }
    function x(e) {
        var n, r, s, a, i, o, u, d;
        n = e._w, null != n.GG || null != n.W || null != n.E ? (i = 1, o = 4, r = t(n.GG, e._a[ge], te(he(), 1, 4).year), 
        s = t(n.W, 1), a = t(n.E, 1)) : (d = F(e._l), i = d._week.dow, o = d._week.doy, 
        r = t(n.gg, e._a[ge], te(he(), i, o).year), s = t(n.w, 1), null != n.d ? (a = n.d, 
        a < i && ++s) : a = null != n.e ? n.e + i : i), u = ne(r, s, a, o, i), e._a[ge] = u.year, 
        e._dayOfYear = u.dayOfYear;
    }
    function A(e) {
        var n, r, s, a, i = [];
        if (!e._d) {
            for (s = Z(e), e._w && null == e._a[we] && null == e._a[Ye] && x(e), e._dayOfYear && (a = t(e._a[ge], s[ge]), 
            e._dayOfYear > v(a) && (e._pf._overflowDayOfYear = !0), r = R(a, 0, e._dayOfYear), 
            e._a[Ye] = r.getUTCMonth(), e._a[we] = r.getUTCDate()), n = 0; n < 3 && null == e._a[n]; ++n) e._a[n] = i[n] = s[n];
            for (;n < 7; n++) e._a[n] = i[n] = null == e._a[n] ? 2 === n ? 1 : 0 : e._a[n];
            e._d = (e._useUTC ? R : X).apply(null, i), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() + e._tzm);
        }
    }
    function N(e) {
        var t;
        e._d || (t = g(e._i), e._a = [ t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond ], 
        A(e));
    }
    function Z(e) {
        var t = new Date();
        return e._useUTC ? [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ] : [ t.getFullYear(), t.getMonth(), t.getDate() ];
    }
    function E(e) {
        if (e._f === he.ISO_8601) return void $(e);
        e._a = [], e._pf.empty = !0;
        var t, n, r, s, a, i = F(e._l), o = "" + e._i, u = o.length, d = 0;
        for (r = z(e._f, i).match(Fe) || [], t = 0; t < r.length; t++) s = r[t], n = (o.match(L(s, e)) || [])[0], 
        n && (a = o.substr(0, o.indexOf(n)), a.length > 0 && e._pf.unusedInput.push(a), 
        o = o.slice(o.indexOf(n) + n.length), d += n.length), ot[s] ? (n ? e._pf.empty = !1 : e._pf.unusedTokens.push(s), 
        I(s, n, e)) : e._strict && !n && e._pf.unusedTokens.push(s);
        e._pf.charsLeftOver = u - d, o.length > 0 && e._pf.unusedInput.push(o), e._isPm && e._a[Me] < 12 && (e._a[Me] += 12), 
        e._isPm === !1 && 12 === e._a[Me] && (e._a[Me] = 0), A(e), b(e);
    }
    function j(e) {
        return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, r, s) {
            return t || n || r || s;
        });
    }
    function V(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function q(e) {
        var t, r, s, a, i;
        if (0 === e._f.length) return e._pf.invalidFormat = !0, void (e._d = new Date(NaN));
        for (a = 0; a < e._f.length; a++) i = 0, t = d({}, e), t._pf = n(), t._f = e._f[a], 
        E(t), S(t) && (i += t._pf.charsLeftOver, i += 10 * t._pf.unusedTokens.length, t._pf.score = i, 
        (null == s || i < s) && (s = i, r = t));
        d(e, r || t);
    }
    function $(e) {
        var t, n, r = e._i, s = Qe.exec(r);
        if (s) {
            for (e._pf.iso = !0, t = 0, n = Re.length; t < n; t++) if (Re[t][1].exec(r)) {
                e._f = Re[t][0] + (s[6] || " ");
                break;
            }
            for (t = 0, n = Be.length; t < n; t++) if (Be[t][1].exec(r)) {
                e._f += Be[t][0];
                break;
            }
            r.match(xe) && (e._f += "Z"), E(e);
        } else e._isValid = !1;
    }
    function J(e) {
        $(e), e._isValid === !1 && (delete e._isValid, he.createFromInputFallback(e));
    }
    function Q(t) {
        var n = t._i, r = Oe.exec(n);
        n === e ? t._d = new Date() : r ? t._d = new Date((+r[1])) : "string" == typeof n ? J(t) : _(n) ? (t._a = n.slice(0), 
        A(t)) : m(n) ? t._d = new Date((+n)) : "object" == typeof n ? N(t) : "number" == typeof n ? t._d = new Date(n) : he.createFromInputFallback(t);
    }
    function X(e, t, n, r, s, a, i) {
        var o = new Date(e, t, n, r, s, a, i);
        return e < 1970 && o.setFullYear(e), o;
    }
    function R(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return e < 1970 && t.setUTCFullYear(e), t;
    }
    function B(e, t) {
        if ("string" == typeof e) if (isNaN(e)) {
            if (e = t.weekdaysParse(e), "number" != typeof e) return null;
        } else e = parseInt(e, 10);
        return e;
    }
    function K(e, t, n, r, s) {
        return s.relativeTime(t || 1, !!n, e, r);
    }
    function ee(e, t, n) {
        var r = pe(Math.abs(e) / 1e3), s = pe(r / 60), a = pe(s / 60), i = pe(a / 24), o = pe(i / 365), u = r < st.s && [ "s", r ] || 1 === s && [ "m" ] || s < st.m && [ "mm", s ] || 1 === a && [ "h" ] || a < st.h && [ "hh", a ] || 1 === i && [ "d" ] || i <= st.dd && [ "dd", i ] || i <= st.dm && [ "M" ] || i < st.dy && [ "MM", pe(i / 30) ] || 1 === o && [ "y" ] || [ "yy", o ];
        return u[2] = t, u[3] = e > 0, u[4] = n, K.apply({}, u);
    }
    function te(e, t, n) {
        var r, s = n - t, a = n - e.day();
        return a > s && (a -= 7), a < s - 7 && (a += 7), r = he(e).add("d", a), {
            week: Math.ceil(r.dayOfYear() / 7),
            year: r.year()
        };
    }
    function ne(e, t, n, r, s) {
        var a, i, o = R(e, 0, 1).getUTCDay();
        return o = 0 === o ? 7 : o, n = null != n ? n : s, a = s - o + (o > r ? 7 : 0) - (o < s ? 7 : 0), 
        i = 7 * (t - 1) + (n - s) + a + 1, {
            year: i > 0 ? e : e - 1,
            dayOfYear: i > 0 ? i : v(e - 1) + i
        };
    }
    function re(t) {
        var n = t._i, r = t._f;
        return null === n || r === e && "" === n ? he.invalid({
            nullInput: !0
        }) : ("string" == typeof n && (t._i = n = F().preparse(n)), he.isMoment(n) ? (t = c(n), 
        t._d = new Date((+n._d))) : r ? _(r) ? q(t) : E(t) : Q(t), new o(t));
    }
    function se(e, t) {
        var n, r;
        if (1 === t.length && _(t[0]) && (t = t[0]), !t.length) return he();
        for (n = t[0], r = 1; r < t.length; ++r) t[r][e](n) && (n = t[r]);
        return n;
    }
    function ae(e, t) {
        var n;
        return "string" == typeof t && (t = e.lang().monthsParse(t), "number" != typeof t) ? e : (n = Math.min(e.date(), M(e.year(), t)), 
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e);
    }
    function ie(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]();
    }
    function oe(e, t, n) {
        return "Month" === t ? ae(e, n) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n);
    }
    function ue(e, t) {
        return function(n) {
            return null != n ? (oe(this, e, n), he.updateOffset(this, t), this) : ie(this, e);
        };
    }
    function de(e) {
        he.duration.fn[e] = function() {
            return this._data[e];
        };
    }
    function ce(e, t) {
        he.duration.fn["as" + e] = function() {
            return +this / t;
        };
    }
    function fe(e) {
        "undefined" == typeof ender && (le = ye.moment, e ? ye.moment = r("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", he) : ye.moment = he);
    }
    for (var he, le, _e, me = "2.7.0", ye = "undefined" != typeof global ? global : this, pe = Math.round, ge = 0, Ye = 1, we = 2, Me = 3, De = 4, ve = 5, ke = 6, be = {}, Se = {
        _isAMomentObject: null,
        _i: null,
        _f: null,
        _l: null,
        _strict: null,
        _tzm: null,
        _isUTC: null,
        _offset: null,
        _pf: null,
        _lang: null
    }, Te = "undefined" != typeof module && module.exports, Oe = /^\/?Date\((\-?\d+)/i, We = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ge = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Fe = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Ce = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Pe = /\d\d?/, Ue = /\d{1,3}/, ze = /\d{1,4}/, Le = /[+\-]?\d{1,6}/, He = /\d+/, Ie = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, xe = /Z|[\+\-]\d\d:?\d\d/gi, Ae = /T/i, Ne = /[\+\-]?\d+(\.\d{1,3})?/, Ze = /\d{1,2}/, Ee = /\d/, je = /\d\d/, Ve = /\d{3}/, qe = /\d{4}/, $e = /[+-]?\d{6}/, Je = /[+-]?\d+/, Qe = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Xe = "YYYY-MM-DDTHH:mm:ssZ", Re = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], Be = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], Ke = /([\+\-]|\d\d)/gi, et = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), 
    {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }), tt = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, nt = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, rt = {}, st = {
        s: 45,
        m: 45,
        h: 22,
        dd: 25,
        dm: 45,
        dy: 345
    }, at = "DDD w W M D d".split(" "), it = "M D H h m s w W".split(" "), ot = {
        M: function() {
            return this.month() + 1;
        },
        MMM: function(e) {
            return this.lang().monthsShort(this, e);
        },
        MMMM: function(e) {
            return this.lang().months(this, e);
        },
        D: function() {
            return this.date();
        },
        DDD: function() {
            return this.dayOfYear();
        },
        d: function() {
            return this.day();
        },
        dd: function(e) {
            return this.lang().weekdaysMin(this, e);
        },
        ddd: function(e) {
            return this.lang().weekdaysShort(this, e);
        },
        dddd: function(e) {
            return this.lang().weekdays(this, e);
        },
        w: function() {
            return this.week();
        },
        W: function() {
            return this.isoWeek();
        },
        YY: function() {
            return h(this.year() % 100, 2);
        },
        YYYY: function() {
            return h(this.year(), 4);
        },
        YYYYY: function() {
            return h(this.year(), 5);
        },
        YYYYYY: function() {
            var e = this.year(), t = e >= 0 ? "+" : "-";
            return t + h(Math.abs(e), 6);
        },
        gg: function() {
            return h(this.weekYear() % 100, 2);
        },
        gggg: function() {
            return h(this.weekYear(), 4);
        },
        ggggg: function() {
            return h(this.weekYear(), 5);
        },
        GG: function() {
            return h(this.isoWeekYear() % 100, 2);
        },
        GGGG: function() {
            return h(this.isoWeekYear(), 4);
        },
        GGGGG: function() {
            return h(this.isoWeekYear(), 5);
        },
        e: function() {
            return this.weekday();
        },
        E: function() {
            return this.isoWeekday();
        },
        a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0);
        },
        A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1);
        },
        H: function() {
            return this.hours();
        },
        h: function() {
            return this.hours() % 12 || 12;
        },
        m: function() {
            return this.minutes();
        },
        s: function() {
            return this.seconds();
        },
        S: function() {
            return w(this.milliseconds() / 100);
        },
        SS: function() {
            return h(w(this.milliseconds() / 10), 2);
        },
        SSS: function() {
            return h(this.milliseconds(), 3);
        },
        SSSS: function() {
            return h(this.milliseconds(), 3);
        },
        Z: function() {
            var e = -this.zone(), t = "+";
            return e < 0 && (e = -e, t = "-"), t + h(w(e / 60), 2) + ":" + h(w(e) % 60, 2);
        },
        ZZ: function() {
            var e = -this.zone(), t = "+";
            return e < 0 && (e = -e, t = "-"), t + h(w(e / 60), 2) + h(w(e) % 60, 2);
        },
        z: function() {
            return this.zoneAbbr();
        },
        zz: function() {
            return this.zoneName();
        },
        X: function() {
            return this.unix();
        },
        Q: function() {
            return this.quarter();
        }
    }, ut = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; at.length; ) _e = at.pop(), 
    ot[_e + "o"] = a(ot[_e], _e);
    for (;it.length; ) _e = it.pop(), ot[_e + _e] = s(ot[_e], 2);
    for (ot.DDDD = s(ot.DDD, 3), d(i.prototype, {
        set: function(e) {
            var t, n;
            for (n in e) t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t;
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(e) {
            return this._months[e.month()];
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(e) {
            return this._monthsShort[e.month()];
        },
        monthsParse: function(e) {
            var t, n, r;
            for (this._monthsParse || (this._monthsParse = []), t = 0; t < 12; t++) if (this._monthsParse[t] || (n = he.utc([ 2e3, t ]), 
            r = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(r.replace(".", ""), "i")), 
            this._monthsParse[t].test(e)) return t;
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(e) {
            return this._weekdays[e.day()];
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(e) {
            return this._weekdaysShort[e.day()];
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(e) {
            return this._weekdaysMin[e.day()];
        },
        weekdaysParse: function(e) {
            var t, n, r;
            for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; t < 7; t++) if (this._weekdaysParse[t] || (n = he([ 2e3, 1 ]).day(t), 
            r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), 
            this._weekdaysParse[t] = new RegExp(r.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t;
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        longDateFormat: function(e) {
            var t = this._longDateFormat[e];
            return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
                return e.slice(1);
            }), this._longDateFormat[e] = t), t;
        },
        isPM: function(e) {
            return "p" === (e + "").toLowerCase().charAt(0);
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(e, t, n) {
            return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(e, t) {
            var n = this._calendar[e];
            return "function" == typeof n ? n.apply(t) : n;
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(e, t, n, r) {
            var s = this._relativeTime[n];
            return "function" == typeof s ? s(e, t, n, r) : s.replace(/%d/i, e);
        },
        pastFuture: function(e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return "function" == typeof n ? n(t) : n.replace(/%s/i, t);
        },
        ordinal: function(e) {
            return this._ordinal.replace("%d", e);
        },
        _ordinal: "%d",
        preparse: function(e) {
            return e;
        },
        postformat: function(e) {
            return e;
        },
        week: function(e) {
            return te(e, this._week.dow, this._week.doy).week;
        },
        _week: {
            dow: 0,
            doy: 6
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate;
        }
    }), he = function(t, r, s, a) {
        var i;
        return "boolean" == typeof s && (a = s, s = e), i = {}, i._isAMomentObject = !0, 
        i._i = t, i._f = r, i._l = s, i._strict = a, i._isUTC = !1, i._pf = n(), re(i);
    }, he.suppressDeprecationWarnings = !1, he.createFromInputFallback = r("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
        e._d = new Date(e._i);
    }), he.min = function() {
        var e = [].slice.call(arguments, 0);
        return se("isBefore", e);
    }, he.max = function() {
        var e = [].slice.call(arguments, 0);
        return se("isAfter", e);
    }, he.utc = function(t, r, s, a) {
        var i;
        return "boolean" == typeof s && (a = s, s = e), i = {}, i._isAMomentObject = !0, 
        i._useUTC = !0, i._isUTC = !0, i._l = s, i._i = t, i._f = r, i._strict = a, i._pf = n(), 
        re(i).utc();
    }, he.unix = function(e) {
        return he(1e3 * e);
    }, he.duration = function(e, t) {
        var n, r, s, a = e, i = null;
        return he.isDuration(e) ? a = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : "number" == typeof e ? (a = {}, t ? a[t] = e : a.milliseconds = e) : (i = We.exec(e)) ? (n = "-" === i[1] ? -1 : 1, 
        a = {
            y: 0,
            d: w(i[we]) * n,
            h: w(i[Me]) * n,
            m: w(i[De]) * n,
            s: w(i[ve]) * n,
            ms: w(i[ke]) * n
        }) : (i = Ge.exec(e)) && (n = "-" === i[1] ? -1 : 1, s = function(e) {
            var t = e && parseFloat(e.replace(",", "."));
            return (isNaN(t) ? 0 : t) * n;
        }, a = {
            y: s(i[2]),
            M: s(i[3]),
            d: s(i[4]),
            h: s(i[5]),
            m: s(i[6]),
            s: s(i[7]),
            w: s(i[8])
        }), r = new u(a), he.isDuration(e) && e.hasOwnProperty("_lang") && (r._lang = e._lang), 
        r;
    }, he.version = me, he.defaultFormat = Xe, he.ISO_8601 = function() {}, he.momentProperties = Se, 
    he.updateOffset = function() {}, he.relativeTimeThreshold = function(t, n) {
        return st[t] !== e && (st[t] = n, !0);
    }, he.lang = function(e, t) {
        var n;
        return e ? (t ? W(T(e), t) : null === t ? (G(e), e = "en") : be[e] || F(e), n = he.duration.fn._lang = he.fn._lang = F(e), 
        n._abbr) : he.fn._lang._abbr;
    }, he.langData = function(e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), F(e);
    }, he.isMoment = function(e) {
        return e instanceof o || null != e && e.hasOwnProperty("_isAMomentObject");
    }, he.isDuration = function(e) {
        return e instanceof u;
    }, _e = ut.length - 1; _e >= 0; --_e) Y(ut[_e]);
    he.normalizeUnits = function(e) {
        return p(e);
    }, he.invalid = function(e) {
        var t = he.utc(NaN);
        return null != e ? d(t._pf, e) : t._pf.userInvalidated = !0, t;
    }, he.parseZone = function() {
        return he.apply(null, arguments).parseZone();
    }, he.parseTwoDigitYear = function(e) {
        return w(e) + (w(e) > 68 ? 1900 : 2e3);
    }, d(he.fn = o.prototype, {
        clone: function() {
            return he(this);
        },
        valueOf: function() {
            return +this._d + 6e4 * (this._offset || 0);
        },
        unix: function() {
            return Math.floor(+this / 1e3);
        },
        toString: function() {
            return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },
        toDate: function() {
            return this._offset ? new Date((+this)) : this._d;
        },
        toISOString: function() {
            var e = he(this).utc();
            return 0 < e.year() && e.year() <= 9999 ? U(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : U(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        },
        toArray: function() {
            var e = this;
            return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds() ];
        },
        isValid: function() {
            return S(this);
        },
        isDSTShifted: function() {
            return !!this._a && (this.isValid() && y(this._a, (this._isUTC ? he.utc(this._a) : he(this._a)).toArray()) > 0);
        },
        parsingFlags: function() {
            return d({}, this._pf);
        },
        invalidAt: function() {
            return this._pf.overflow;
        },
        utc: function() {
            return this.zone(0);
        },
        local: function() {
            return this.zone(0), this._isUTC = !1, this;
        },
        format: function(e) {
            var t = U(this, e || he.defaultFormat);
            return this.lang().postformat(t);
        },
        add: function(e, t) {
            var n;
            return n = "string" == typeof e && "string" == typeof t ? he.duration(isNaN(+t) ? +e : +t, isNaN(+t) ? t : e) : "string" == typeof e ? he.duration(+t, e) : he.duration(e, t), 
            l(this, n, 1), this;
        },
        subtract: function(e, t) {
            var n;
            return n = "string" == typeof e && "string" == typeof t ? he.duration(isNaN(+t) ? +e : +t, isNaN(+t) ? t : e) : "string" == typeof e ? he.duration(+t, e) : he.duration(e, t), 
            l(this, n, -1), this;
        },
        diff: function(e, t, n) {
            var r, s, a = O(e, this), i = 6e4 * (this.zone() - a.zone());
            return t = p(t), "year" === t || "month" === t ? (r = 432e5 * (this.daysInMonth() + a.daysInMonth()), 
            s = 12 * (this.year() - a.year()) + (this.month() - a.month()), s += (this - he(this).startOf("month") - (a - he(a).startOf("month"))) / r, 
            s -= 6e4 * (this.zone() - he(this).startOf("month").zone() - (a.zone() - he(a).startOf("month").zone())) / r, 
            "year" === t && (s /= 12)) : (r = this - a, s = "second" === t ? r / 1e3 : "minute" === t ? r / 6e4 : "hour" === t ? r / 36e5 : "day" === t ? (r - i) / 864e5 : "week" === t ? (r - i) / 6048e5 : r), 
            n ? s : f(s);
        },
        from: function(e, t) {
            return he.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t);
        },
        fromNow: function(e) {
            return this.from(he(), e);
        },
        calendar: function(e) {
            var t = e || he(), n = O(t, this).startOf("day"), r = this.diff(n, "days", !0), s = r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
            return this.format(this.lang().calendar(s, this));
        },
        isLeapYear: function() {
            return k(this.year());
        },
        isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
        },
        day: function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e ? (e = B(e, this.lang()), this.add({
                d: e - t
            })) : t;
        },
        month: ue("Month", !0),
        startOf: function(e) {
            switch (e = p(e)) {
              case "year":
                this.month(0);

              case "quarter":
              case "month":
                this.date(1);

              case "week":
              case "isoWeek":
              case "day":
                this.hours(0);

              case "hour":
                this.minutes(0);

              case "minute":
                this.seconds(0);

              case "second":
                this.milliseconds(0);
            }
            return "week" === e ? this.weekday(0) : "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), 
            this;
        },
        endOf: function(e) {
            return e = p(e), this.startOf(e).add("isoWeek" === e ? "week" : e, 1).subtract("ms", 1);
        },
        isAfter: function(e, t) {
            return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +he(e).startOf(t);
        },
        isBefore: function(e, t) {
            return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +he(e).startOf(t);
        },
        isSame: function(e, t) {
            return t = t || "ms", +this.clone().startOf(t) === +O(e, this).startOf(t);
        },
        min: r("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(e) {
            return e = he.apply(null, arguments), e < this ? this : e;
        }),
        max: r("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(e) {
            return e = he.apply(null, arguments), e > this ? this : e;
        }),
        zone: function(e, t) {
            var n = this._offset || 0;
            return null == e ? this._isUTC ? n : this._d.getTimezoneOffset() : ("string" == typeof e && (e = H(e)), 
            Math.abs(e) < 16 && (e = 60 * e), this._offset = e, this._isUTC = !0, n !== e && (!t || this._changeInProgress ? l(this, he.duration(n - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
            he.updateOffset(this, !0), this._changeInProgress = null)), this);
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : "";
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },
        parseZone: function() {
            return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), 
            this;
        },
        hasAlignedHourOffset: function(e) {
            return e = e ? he(e).zone() : 0, (this.zone() - e) % 60 === 0;
        },
        daysInMonth: function() {
            return M(this.year(), this.month());
        },
        dayOfYear: function(e) {
            var t = pe((he(this).startOf("day") - he(this).startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add("d", e - t);
        },
        quarter: function(e) {
            return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);
        },
        weekYear: function(e) {
            var t = te(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return null == e ? t : this.add("y", e - t);
        },
        isoWeekYear: function(e) {
            var t = te(this, 1, 4).year;
            return null == e ? t : this.add("y", e - t);
        },
        week: function(e) {
            var t = this.lang().week(this);
            return null == e ? t : this.add("d", 7 * (e - t));
        },
        isoWeek: function(e) {
            var t = te(this, 1, 4).week;
            return null == e ? t : this.add("d", 7 * (e - t));
        },
        weekday: function(e) {
            var t = (this.day() + 7 - this.lang()._week.dow) % 7;
            return null == e ? t : this.add("d", e - t);
        },
        isoWeekday: function(e) {
            return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7);
        },
        isoWeeksInYear: function() {
            return D(this.year(), 1, 4);
        },
        weeksInYear: function() {
            var e = this._lang._week;
            return D(this.year(), e.dow, e.doy);
        },
        get: function(e) {
            return e = p(e), this[e]();
        },
        set: function(e, t) {
            return e = p(e), "function" == typeof this[e] && this[e](t), this;
        },
        lang: function(t) {
            return t === e ? this._lang : (this._lang = F(t), this);
        }
    }), he.fn.millisecond = he.fn.milliseconds = ue("Milliseconds", !1), he.fn.second = he.fn.seconds = ue("Seconds", !1), 
    he.fn.minute = he.fn.minutes = ue("Minutes", !1), he.fn.hour = he.fn.hours = ue("Hours", !0), 
    he.fn.date = ue("Date", !0), he.fn.dates = r("dates accessor is deprecated. Use date instead.", ue("Date", !0)), 
    he.fn.year = ue("FullYear", !0), he.fn.years = r("years accessor is deprecated. Use year instead.", ue("FullYear", !0)), 
    he.fn.days = he.fn.day, he.fn.months = he.fn.month, he.fn.weeks = he.fn.week, he.fn.isoWeeks = he.fn.isoWeek, 
    he.fn.quarters = he.fn.quarter, he.fn.toJSON = he.fn.toISOString, d(he.duration.fn = u.prototype, {
        _bubble: function() {
            var e, t, n, r, s = this._milliseconds, a = this._days, i = this._months, o = this._data;
            o.milliseconds = s % 1e3, e = f(s / 1e3), o.seconds = e % 60, t = f(e / 60), o.minutes = t % 60, 
            n = f(t / 60), o.hours = n % 24, a += f(n / 24), o.days = a % 30, i += f(a / 30), 
            o.months = i % 12, r = f(i / 12), o.years = r;
        },
        weeks: function() {
            return f(this.days() / 7);
        },
        valueOf: function() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * w(this._months / 12);
        },
        humanize: function(e) {
            var t = +this, n = ee(t, !e, this.lang());
            return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n);
        },
        add: function(e, t) {
            var n = he.duration(e, t);
            return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, 
            this._bubble(), this;
        },
        subtract: function(e, t) {
            var n = he.duration(e, t);
            return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, 
            this._bubble(), this;
        },
        get: function(e) {
            return e = p(e), this[e.toLowerCase() + "s"]();
        },
        as: function(e) {
            return e = p(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]();
        },
        lang: he.fn.lang,
        toIsoString: function() {
            var e = Math.abs(this.years()), t = Math.abs(this.months()), n = Math.abs(this.days()), r = Math.abs(this.hours()), s = Math.abs(this.minutes()), a = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (n ? n + "D" : "") + (r || s || a ? "T" : "") + (r ? r + "H" : "") + (s ? s + "M" : "") + (a ? a + "S" : "") : "P0D";
        }
    });
    for (_e in et) et.hasOwnProperty(_e) && (ce(_e, et[_e]), de(_e.toLowerCase()));
    ce("Weeks", 6048e5), he.duration.fn.asMonths = function() {
        return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years();
    }, he.lang("en", {
        ordinal: function(e) {
            var t = e % 10, n = 1 === w(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
            return e + n;
        }
    }), Te ? module.exports = he : "function" == typeof define && define.amd ? (define("moment", function(e, t, n) {
        return n.config && n.config() && n.config().noGlobal === !0 && (ye.moment = le), 
        he;
    }), fe(!0)) : fe();
}).call(this);
(function(e, t) {
    "use strict";
    var n = function() {
        var n = function(e) {
            return e.replace(/^\s+|\s+$/g, "");
        }, i = function(e, t) {
            for (var n = e.length; n--; ) if (e[n] === t) return !0;
            return !1;
        }, r = e.rangy || null, o = e.Undo || null, a = !r || !o, l = e.Key = {
            backspace: 8,
            tab: 9,
            enter: 13,
            shift: 16,
            ctrl: 17,
            alt: 18,
            pause: 19,
            capsLock: 20,
            escape: 27,
            pageUp: 33,
            pageDown: 34,
            end: 35,
            home: 36,
            leftArrow: 37,
            upArrow: 38,
            rightArrow: 39,
            downArrow: 40,
            insert: 45,
            "delete": 46,
            "0": 48,
            "1": 49,
            "2": 50,
            "3": 51,
            "4": 52,
            "5": 53,
            "6": 54,
            "7": 55,
            "8": 56,
            "9": 57,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            leftWindow: 91,
            rightWindowKey: 92,
            select: 93,
            numpad0: 96,
            numpad1: 97,
            numpad2: 98,
            numpad3: 99,
            numpad4: 100,
            numpad5: 101,
            numpad6: 102,
            numpad7: 103,
            numpad8: 104,
            numpad9: 105,
            multiply: 106,
            add: 107,
            subtract: 109,
            decimalPoint: 110,
            divide: 111,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            numLock: 144,
            scrollLock: 145,
            semiColon: 186,
            equalSign: 187,
            comma: 188,
            dash: 189,
            period: 190,
            forwardSlash: 191,
            graveAccent: 192,
            openBracket: 219,
            backSlash: 220,
            closeBraket: 221,
            singleQuote: 222
        }, s = function(t) {
            var n, i, r, o = this, c = new s.Action(), d = new s.Cache(), u = new s.Cursor(), h = new s.HtmlAssistant(), m = new s.Utilities(), f = new s.Selection(), p = {
                focus: function(t) {
                    t = t || e.event, s.activeElement = n;
                },
                blur: function(t) {
                    t = t || e.event, s.activeElement === n && (s.activeElement = null), h.placeholders();
                },
                down: function(t) {
                    t = t || e.event;
                    var n = !0;
                    if (229 !== t.keyCode) {
                        if (m.isCommand(t, function() {
                            d.cmd = !0;
                        }, function() {
                            d.cmd = !1;
                        }), m.isShift(t, function() {
                            d.shift = !0;
                        }, function() {
                            d.shift = !1;
                        }), m.isModifier(t, function(e) {
                            if (d.cmd) {
                                if ((v.mode === s.inlineMode || v.mode === s.partialMode) && "paste" !== e) return void m.preventDefaultEvent(t);
                                var i = typeof e, r = null;
                                r = "function" === i ? e : p.command[e], n = r.call(o, t), n === !1 && (m.preventDefaultEvent(t), 
                                m.stopPropagation(t));
                            }
                        }), v.maxLength !== -1) {
                            var i = h.text().length, r = !1, a = e.getSelection();
                            if (a && (r = !a.isCollapsed), i >= v.maxLength && !m.isSpecial(t) && !m.isNavigational(t) && !r) return m.preventDefaultEvent(t);
                        }
                        switch (t.keyCode) {
                          case l.enter:
                            p.enterKey(t);
                            break;

                          case l.backspace:
                          case l["delete"]:
                            p.backspaceOrDeleteKey(t);
                        }
                        return n;
                    }
                },
                up: function(t) {
                    t = t || e.event, m.isCommand(t, function() {
                        d.cmd = !1;
                    }, function() {
                        d.cmd = !0;
                    }), h.clean(), h.placeholders();
                    var n;
                    if (null !== v.keyContext && (n = v.keyContext[t.keyCode])) {
                        var i = u.parent();
                        i && n.call(o, t, i);
                    }
                    c.preserveElementFocus();
                },
                command: {
                    bold: function(e) {
                        m.preventDefaultEvent(e), new s.Element(o, "bold").setClean(!1).invoke(v.beforeInvokeElement);
                    },
                    underline: function(e) {
                        m.preventDefaultEvent(e), new s.Element(o, "underline").setClean(!1).invoke(v.beforeInvokeElement);
                    },
                    italicize: function(e) {
                        m.preventDefaultEvent(e), new s.Element(o, "italic").setClean(!1).invoke(v.beforeInvokeElement);
                    },
                    quote: function(e) {},
                    paste: function(e) {
                        if (o.makeUndoable(), v.pasteAsText) {
                            var t = m.selection.saveSelection();
                            m.pasteHook(function(e) {
                                m.selection.restoreSelection(t), e = e.replace(/\n/g, "<br>"), new s.Html(o, e).setClean(!1).insert(v.beforeInsertHtml, !0), 
                                h.clean(), h.placeholders();
                            });
                        } else h.clean(), h.placeholders();
                    }
                },
                enterKey: function(e) {
                    if (v.mode === s.inlineMode) return m.preventDefaultEvent(e);
                    if (!d.shift) {
                        var t, i, r, o = h.atCaret() || {}, a = n.children, l = o === n.lastChild ? n.lastChild : null;
                        l && l !== n.firstChild && v.autoHR && "partial" !== v.mode && v.tags.horizontalRule && (m.preventDefaultEvent(e), 
                        t = "" === h.text(l) && l.nodeName.toLowerCase() === v.tags.paragraph, t && a.length >= 2 && (i = a[a.length - 2], 
                        i.nodeName.toLowerCase() === v.tags.horizontalRule && (t = !1)), t && (h.addTag(v.tags.horizontalRule, !1, !0, o), 
                        o = o.nextSibling), null !== (r = h.addTag(v.tags.paragraph, !0, null, o)) && (r.innerHTML = "", 
                        u.set(0, r)));
                    }
                    return !0;
                },
                backspaceOrDeleteKey: function(e) {
                    if (null !== n.lastChild) {
                        var t = n.lastChild, i = t.previousSibling;
                        t && v.tags.horizontalRule && t.nodeName.toLocaleLowerCase() === v.tags.horizontalRule ? n.removeChild(t) : t && i && m.html.text(t).length < 1 && i.nodeName.toLowerCase() === v.tags.horizontalRule && t.nodeName.toLowerCase() === v.tags.paragraph && (n.removeChild(t), 
                        n.removeChild(i));
                    }
                }
            }, g = {
                element: null,
                modifier: "auto",
                placeholder: "",
                autofocus: !1,
                autoHR: !0,
                mode: s.richMode,
                maxLength: -1,
                modifiers: {
                    b: "bold",
                    i: "italicize",
                    u: "underline",
                    v: "paste"
                },
                tags: {
                    "break": "br",
                    horizontalRule: "hr",
                    paragraph: "p",
                    outerLevel: [ "pre", "blockquote", "figure" ],
                    innerLevel: [ "a", "b", "u", "i", "img", "strong" ]
                },
                cssClasses: {
                    editor: "Medium",
                    pasteHook: "Medium-paste-hook",
                    placeholder: "Medium-placeholder",
                    clear: "Medium-clear"
                },
                attributes: {
                    remove: [ "style", "class" ]
                },
                pasteAsText: !0,
                beforeInvokeElement: function() {},
                beforeInsertHtml: function() {},
                beforeAddTag: function(e, t, n, i) {},
                keyContext: null,
                pasteEventHandler: function(t) {
                    t = t || e.event, o.makeUndoable();
                    var i, r = o.value().length;
                    if (v.pasteAsText) {
                        m.preventDefaultEvent(t);
                        var a = m.selection.saveSelection(), l = prompt(s.Messages.pastHere) || "";
                        if (l.length > 0) return n.focus(), s.activeElement = n, m.selection.restoreSelection(a), 
                        l = h.encodeHtml(l), i = l.length + r, v.maxLength > 0 && i > v.maxLength && (l = l.substring(0, v.maxLength - r)), 
                        v.mode !== s.inlineMode && (l = l.replace(/\n/g, "<br>")), new s.Html(o, l).setClean(!1).insert(v.beforeInsertHtml, !0), 
                        h.clean(), h.placeholders(), !1;
                    } else setTimeout(function() {
                        h.clean(), h.placeholders();
                    }, 20);
                }
            }, v = m.deepExtend(g, t), b = {};
            for (r in g) "object" != typeof g[r] && g.hasOwnProperty(r) && v.element.getAttribute("data-medium-" + l) && (i = v.element.getAttribute("data-medium-" + l), 
            "false" !== i.toLowerCase() && "true" !== i.toLowerCase() || (i = "true" === i.toLowerCase()), 
            v[r] = i);
            if (v.modifiers) for (r in v.modifiers) "undefined" != typeof l[r] && (v.modifiers[l[r]] = v.modifiers[r]);
            if (v.keyContext) for (r in v.keyContext) "undefined" != typeof l[r] && (v.keyContext[l[r]] = v.keyContext[r]);
            n = v.element, n.contentEditable = !0, n.className += " " + v.cssClasses.editor + (" " + v.cssClasses.editor + "-" + v.mode), 
            v.tags = v.tags || {}, v.tags.outerLevel && (v.tags.outerLevel = v.tags.outerLevel.concat([ v.tags.paragraph, v.tags.horizontalRule ])), 
            this.settings = v, this.element = n, this.intercept = p, this.action = c, this.cache = d, 
            this.cursor = u, this.html = h, this.utils = m, this.selection = f, b.element = n, 
            b.medium = this, b.settings = v, b.action = c, b.cache = d, b.cursor = u, b.html = h, 
            b.intercept = p, b.utils = m, b.selection = f, c.setBridge(b), d.setBridge(b), u.setBridge(b), 
            h.setBridge(b), m.setBridge(b), f.setBridge(b), h.clean(), h.placeholders(), c.preserveElementFocus(), 
            c.listen(), a ? this.makeUndoable = function() {} : (this.dirty = !1, this.undoable = new s.Undoable(this), 
            this.undo = this.undoable.undo, this.redo = this.undoable.redo, this.makeUndoable = this.undoable.makeUndoable), 
            n.medium = this, d.initialized = !0;
        };
        return s.prototype = {
            insertHtml: function(e, t) {
                var n = new s.Html(this, e).insert(this.settings.beforeInsertHtml);
                return this.utils.triggerEvent(this.element, "change"), t && t.apply(n), this;
            },
            invokeElement: function(e, t) {
                var n = this.settings, t = t || {}, r = t.remove || [];
                switch (n.mode) {
                  case s.inlineMode:
                  case s.partialMode:
                    return this;
                }
                return r.length > 0 && (i(n, "class") || r.push("class")), new s.Element(this, e, t).invoke(this.settings.beforeInvokeElement), 
                this.utils.triggerEvent(this.element, "change"), this;
            },
            behavior: function() {
                return a ? "wild" : "domesticated";
            },
            value: function(e) {
                return "undefined" == typeof e ? this.element.innerHTML : (this.element.innerHTML = e, 
                this.html.clean(), this.html.placeholders(), this);
            },
            focus: function() {
                var e = this.element;
                return e.focus(), this;
            },
            select: function() {
                var n, i, r = this.element;
                return r.focus(), t.body.createTextRange ? (n = t.body.createTextRange(), n.moveToElementText(r), 
                n.select()) : e.getSelection && (i = e.getSelection(), n = t.createRange(), n.selectNodeContents(r), 
                i.removeAllRanges(), i.addRange(n)), this;
            },
            isActive: function() {
                return s.activeElement === this.element;
            },
            destroy: function() {
                var e = this.element, t = this.intercept, i = this.settings, r = this.placeholder || null;
                null !== r && r.setup && (r.parentNode.removeChild(r), delete e.placeHolderActive), 
                e.removeAttribute("contenteditable"), e.className = n(e.className.replace(i.cssClasses.editor, "").replace(i.cssClasses.clear, "").replace(i.cssClasses.editor + "-" + i.mode, "")), 
                this.utils.removeEvent(e, "keyup", t.up).removeEvent(e, "keydown", t.down).removeEvent(e, "focus", t.focus).removeEvent(e, "blur", t.focus).removeEvent(e, "paste", i.pasteEventHandler);
            },
            clear: function() {
                this.element.innerHTML = "", this.html.placeholders();
            }
        }, s.Element = function(e, t, n) {
            if (this.medium = e, this.element = e.settings.element, a) this.tagName = t; else switch (t.toLowerCase()) {
              case "bold":
                this.tagName = "b";
                break;

              case "italic":
                this.tagName = "i";
                break;

              case "underline":
                this.tagName = "u";
                break;

              default:
                this.tagName = t;
            }
            this.attributes = n || {}, this.clean = !0;
        }, s.Html = function(e, t) {
            this.medium = e, this.element = e.settings.element, this.html = t, this.clean = !0;
        }, s.Injector = function() {}, a ? (s.Element.prototype = {
            invoke: function(e) {
                s.activeElement === this.element && (e && e.apply(this), t.execCommand(this.tagName, !1));
            },
            setClean: function() {
                return this;
            }
        }, s.Injector.prototype = {
            inject: function(e, t) {
                return this.insertHTML(e, t), null;
            }
        }, s.Undoable = function() {}) : (r.rangePrototype.insertNodeAtEnd = function(e) {
            var t = this.cloneRange();
            t.collapse(!1), t.insertNode(e), t.detach(), this.setEndAfter(e);
        }, s.Element.prototype = {
            invoke: function(t) {
                if (s.activeElement === this.element) {
                    t && t.apply(this);
                    var n, i, o = this.attributes, a = this.tagName.toLowerCase();
                    void 0 !== o.className ? (i = (o.className.split[" "] || [ o.className ]).shift(), 
                    delete o.className) : i = "medium-" + a, n = r.createClassApplier(i, {
                        elementTagName: a,
                        elementAttributes: this.attributes
                    }), this.medium.makeUndoable(), n.toggleSelection(e), this.clean && (this.medium.html.clean(), 
                    this.medium.html.placeholders());
                }
            },
            setClean: function(e) {
                return this.clean = e, this;
            }
        }, s.Injector.prototype = {
            inject: function(e) {
                var n, i = !1;
                if ("string" == typeof e) {
                    var r = t.createElement("div");
                    r.innerHTML = e, n = r.childNodes, i = !0;
                } else n = e;
                this.insertHTML('<span id="wedge"></span>');
                var o = t.getElementById("wedge"), a = o.parentNode, l = 0;
                if (o.removeAttribute("id"), i) for (;l < n.length; ) a.insertBefore(n[l], o); else a.insertBefore(n, o);
                return a.removeChild(o), o = null, n;
            }
        }, s.Undoable = function(e) {
            var t, n = this, i = e.settings.element, r = e.utils, o = r.addEvent, a = i.innerHTML, s = new Undo.Stack(), c = Undo.Command.extend({
                constructor: function(e, t) {
                    this.oldValue = e, this.newValue = t;
                },
                execute: function() {},
                undo: function() {
                    i.innerHTML = this.oldValue, e.canUndo = s.canUndo(), e.canRedo = s.canRedo(), e.dirty = s.dirty();
                },
                redo: function() {
                    i.innerHTML = this.newValue, e.canUndo = s.canUndo(), e.canRedo = s.canRedo(), e.dirty = s.dirty();
                }
            }), d = function() {
                var t = i.innerHTML;
                t != a && (n.movingThroughStack || (s.execute(new c(a, t)), a = t, e.dirty = s.dirty()), 
                r.triggerEvent(e.settings.element, "change"));
            };
            this.medium = e, this.timer = t, this.stack = s, this.makeUndoable = d, this.EditCommand = c, 
            this.movingThroughStack = !1, o(i, "keyup", function(e) {
                return e.ctrlKey || e.keyCode === l.z ? void r.preventDefaultEvent(e) : (clearTimeout(t), 
                void (t = setTimeout(function() {
                    d();
                }, 250)));
            }), o(i, "keydown", function(e) {
                return e.ctrlKey && e.keyCode === l.z ? (r.preventDefaultEvent(e), n.movingThroughStack = !0, 
                void (e.shiftKey ? s.canRedo() && s.redo() : s.canUndo() && s.undo())) : (n.movingThroughStack = !1, 
                !0);
            });
        }), s.Injector.prototype.insertHTML = function(n, i) {
            var r, o;
            if (e.getSelection) {
                if (r = e.getSelection(), r.getRangeAt && r.rangeCount) {
                    o = r.getRangeAt(0), o.deleteContents();
                    var a = t.createElement("div");
                    a.innerHTML = n;
                    for (var l, s, c = t.createDocumentFragment(); l = a.firstChild; ) s = c.appendChild(l);
                    var d = c.firstChild;
                    o.insertNode(c), s && (o = o.cloneRange(), o.setStartAfter(s), i ? o.setStartBefore(d) : o.collapse(!0), 
                    r.removeAllRanges(), r.addRange(o));
                }
            } else if ((r = t.selection) && "Control" != r.type) {
                var u = r.createRange();
                u.collapse(!0), r.createRange().pasteHTML(n), i && (o = r.createRange(), o.setEndPoint("StartToStart", u), 
                o.select());
            }
        }, s.Html.prototype = {
            setBridge: function(e) {
                for (var t in e) this[t] = e[t];
            },
            insert: function(e, t) {
                if (s.activeElement === this.element) {
                    e && e.apply(this);
                    var n = this.injector.inject(this.html, t);
                    return this.clean && (this.medium.html.clean(), this.medium.html.placeholders()), 
                    this.medium.makeUndoable(), n;
                }
                return null;
            },
            injector: new s.Injector(),
            setClean: function(e) {
                return this.clean = e, this;
            }
        }, s.Utilities = function() {}, s.Utilities.prototype = {
            setBridge: function(e) {
                for (var t in e) this[t] = e[t];
            },
            isCommand: function(e, t, n) {
                var i = this.settings;
                return "ctrl" === i.modifier && e.ctrlKey || "cmd" === i.modifier && e.metaKey || "auto" === i.modifier && (e.ctrlKey || e.metaKey) ? t.call() : n.call();
            },
            isShift: function(e, t, n) {
                return e.shiftKey ? t.call() : n.call();
            },
            isModifier: function(e, t) {
                var n = this.settings.modifiers[e.keyCode];
                return !!n && t.call(null, n);
            },
            special: function() {
                var e = {};
                return e[l.backspace] = !0, e[l.shift] = !0, e[l.ctrl] = !0, e[l.alt] = !0, e[l["delete"]] = !0, 
                e[l.cmd] = !0, e;
            }(),
            isSpecial: function(e) {
                return !!this.cache.cmd || "undefined" != typeof this.special[e.keyCode];
            },
            navigational: function() {
                var e = {};
                return e[l.upArrow] = !0, e[l.downArrow] = !0, e[l.leftArrow] = !0, e[l.rightArrow] = !0, 
                e;
            }(),
            isNavigational: function(e) {
                return "undefined" != typeof this.navigational[e.keyCode];
            },
            addEvent: function(e, t, n) {
                return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n, 
                this;
            },
            removeEvent: function(e, t, n) {
                return e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null, 
                this;
            },
            preventDefaultEvent: function(e) {
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this;
            },
            stopPropagation: function(e) {
                e = e || window.event, e.cancelBubble = !0, void 0 !== e.stopPropagation && e.stopPropagation();
            },
            triggerEvent: function(e, n) {
                var i;
                return t.createEvent ? (i = t.createEvent("HTMLEvents"), i.initEvent(n, !0, !0), 
                i.eventName = n, e.dispatchEvent(i)) : (i = t.createEventObject(), e.fireEvent("on" + n, i)), 
                this;
            },
            deepExtend: function(e, t) {
                for (var n in t) t[n] && t[n].constructor && t[n].constructor === Object ? (e[n] = e[n] || {}, 
                this.deepExtend(e[n], t[n])) : e[n] = t[n];
                return e;
            },
            pasteHook: function(e) {
                var n, i, r, o = t.createElement("textarea"), l = this.element, s = this.settings, c = this.medium, d = this.html;
                o.className = s.cssClasses.pasteHook, l.parentNode.appendChild(o), o.focus(), a || c.makeUndoable(), 
                setTimeout(function() {
                    l.focus(), s.maxLength > 0 && (n = d.text(l), i = n.length, r = i + o.value.length, 
                    r > i && (o.value = o.value.substring(0, s.maxLength - i))), e(o.value), d.deleteNode(o);
                }, 2);
            },
            setupContents: function() {
                var e, n = this.element, i = n.children, r = n.childNodes;
                !this.settings.tags.paragraph || i.length > 0 || this.settings.mode === s.inlineMode || (r.length > 0 ? (e = t.createElement(this.settings.tags.paragraph), 
                n.innerHTML.match("^[&]nbsp[;]") && (n.innerHTML = n.innerHTML.substring(6, n.innerHTML.length - 1)), 
                e.innerHTML = n.innerHTML, n.innerHTML = "", n.appendChild(e), this.cursor.set(e.innerHTML.length, e)) : (e = t.createElement(this.settings.tags.paragraph), 
                e.innerHTML = "&nbsp;", n.appendChild(e)));
            },
            traverseAll: function(e, t, n) {
                var i, r = e.childNodes, o = r.length, a = 0, n = n || 1;
                if (t = t || {}, o > 0) for (;a < o; a++) {
                    switch (i = r[a], i.nodeType) {
                      case 1:
                        this.traverseAll(i, t, n + 1), void 0 !== t.element && t.element(i, a, n, e);
                        break;

                      case 3:
                        void 0 !== t.fragment && t.fragment(i, a, n, e);
                    }
                    o = r.length, i === e.lastChild && (a = o);
                }
            }
        }, s.Selection = function() {}, s.Selection.prototype = {
            setBridge: function(e) {
                for (var t in e) this[t] = e[t];
            },
            saveSelection: function() {
                if (e.getSelection) {
                    var n = e.getSelection();
                    if (n.rangeCount > 0) return n.getRangeAt(0);
                } else if (t.selection && t.selection.createRange) return t.selection.createRange();
                return null;
            },
            restoreSelection: function(n) {
                if (n) if (e.getSelection) {
                    var i = e.getSelection();
                    i.removeAllRanges(), i.addRange(n);
                } else t.selection && n.select && n.select();
            }
        }, s.Cursor = function() {}, s.Cursor.prototype = {
            setBridge: function(e) {
                for (var t in e) this[t] = e[t];
            },
            set: function(n, i) {
                var r, o = this.html;
                if (t.createRange) {
                    var a = e.getSelection(), l = o.lastChild(), s = o.text(l).length - 1, c = i ? i : l, d = "undefined" != typeof n && null !== n ? n : s;
                    r = t.createRange();
                    try {
                        r.setStart(c, d);
                    } catch (u) {}
                    r.collapse(!0), a.removeAllRanges(), a.addRange(r);
                } else r = t.body.createTextRange(), r.moveToElementText(i), r.collapse(!1), r.select();
            },
            parent: function() {
                var n, i = null;
                return e.getSelection ? (n = e.getSelection().getRangeAt(0), i = n.commonAncestorContainer, 
                i = 1 === i.nodeType ? i : i.parentNode) : t.selection && (i = t.selection.createRange().parentElement()), 
                "SPAN" == i.tagName && (i = i.parentNode), i;
            },
            caretToBeginning: function(e) {
                this.set(0, e);
            },
            caretToEnd: function(e) {
                this.set(this.html.text(e).length, e);
            }
        }, s.HtmlAssistant = function() {}, s.HtmlAssistant.prototype = {
            setBridge: function(e) {
                for (var t in e) this[t] = e[t];
            },
            encodeHtml: function(e) {
                return t.createElement("a").appendChild(t.createTextNode(e)).parentNode.innerHTML;
            },
            text: function(e, t) {
                if (e = e || this.settings.element, t) e.textContent && "undefined" != typeof e.textContent ? e.textContent = t : e.innerText = t; else {
                    if (e.innerText) return n(e.innerText);
                    if (e.textContent) return n(e.textContent);
                    if (e.data) return n(e.data);
                }
                return "";
            },
            changeTag: function(e, n) {
                var i, r, o = t.createElement(n);
                for (i = e.firstChild; i; ) r = i.nextSibling, o.appendChild(i), i = r;
                return e.parentNode.insertBefore(o, e), e.parentNode.removeChild(e), o;
            },
            deleteNode: function(e) {
                e.parentNode.removeChild(e);
            },
            placeholders: function() {
                if (e.getComputedStyle) {
                    var i = this.settings, r = this.medium.placeholder || (this.medium.placeholder = t.createElement("div")), o = i.element, a = r.style, l = e.getComputedStyle(o, null), c = function(e) {
                        return l.getPropertyValue(e);
                    }, d = this.utils, u = d.html.text(o), h = this.cursor, m = o.children.length;
                    if (o.placeholder = r, u.length < 1 && m < 2) {
                        if (o.placeHolderActive) return;
                        o.innerHTML.match("<" + i.tags.paragraph) || (o.innerHTML = ""), i.placeholder.length > 0 && (r.setup || (r.setup = !0, 
                        a.background = c("background"), a.backgroundColor = c("background-color"), a.fontSize = c("font-size"), 
                        a.color = l.color, a.marginTop = c("margin-top"), a.marginBottom = c("margin-bottom"), 
                        a.marginLeft = c("margin-left"), a.marginRight = c("margin-right"), a.paddingTop = c("padding-top"), 
                        a.paddingBottom = c("padding-bottom"), a.paddingLeft = c("padding-left"), a.paddingRight = c("padding-right"), 
                        a.borderTopWidth = c("border-top-width"), a.borderTopColor = c("border-top-color"), 
                        a.borderTopStyle = c("border-top-style"), a.borderBottomWidth = c("border-bottom-width"), 
                        a.borderBottomColor = c("border-bottom-color"), a.borderBottomStyle = c("border-bottom-style"), 
                        a.borderLeftWidth = c("border-left-width"), a.borderLeftColor = c("border-left-color"), 
                        a.borderLeftStyle = c("border-left-style"), a.borderRightWidth = c("border-right-width"), 
                        a.borderRightColor = c("border-right-color"), a.borderRightStyle = c("border-right-style"), 
                        r.className = i.cssClasses.placeholder + " " + i.cssClasses.placeholder + "-" + i.mode, 
                        r.innerHTML = "<div>" + i.placeholder + "</div>", o.parentNode.insertBefore(r, o)), 
                        o.className += " " + i.cssClasses.clear, a.display = "", a.minHeight = o.clientHeight + "px", 
                        a.minWidth = o.clientWidth + "px", i.mode !== s.inlineMode && (d.setupContents(), 
                        0 === m && o.firstChild && h.set(0, o.firstChild))), o.placeHolderActive = !0;
                    } else o.placeHolderActive && (o.placeHolderActive = !1, a.display = "none", o.className = n(o.className.replace(i.cssClasses.clear, "")), 
                    d.setupContents());
                }
            },
            clean: function(t) {
                var n, i, r, o = this.settings, a = o.cssClasses.placeholder, l = (o.attributes || {}).remove || [], s = o.tags || {}, c = s.outerLevel || null, d = s.innerLevel || null, u = {}, h = {}, m = (s.paragraph || "").toUpperCase(), f = this.html;
                if (t = t || o.element, null !== c) for (r = 0; r < c.length; r++) u[c[r].toUpperCase()] = !0;
                if (null !== d) for (r = 0; r < d.length; r++) h[d[r].toUpperCase()] = !0;
                this.utils.traverseAll(t, {
                    element: function(t, o, s, p) {
                        var g = t.nodeName, v = !0;
                        for (r = 0; r < l.length; r++) n = l[r], t.hasAttribute(n) && t.getAttribute(n) !== a && t.removeAttribute(n);
                        if ((null !== c || null !== d) && (1 === s && void 0 !== u[g] ? v = !1 : s > 1 && void 0 !== h[g] && (v = !1), 
                        v)) if ("block" === e.getComputedStyle(t, null).getPropertyValue("display")) {
                            if (m.length > 0 && m !== g && f.changeTag(t, m), s > 1) for (;p.childNodes.length > o; ) p.parentNode.insertBefore(p.lastChild, p.nextSibling);
                        } else switch (g) {
                          case "BR":
                            if (t === t.parentNode.lastChild) {
                                if (t === t.parentNode.firstChild) break;
                                i = document.createTextNode(""), i.innerHTML = "&nbsp", p.insertBefore(i, t);
                                break;
                            }

                          default:
                            for (;null !== t.firstChild; ) p.insertBefore(t.firstChild, t);
                            f.deleteNode(t);
                        }
                    }
                });
            },
            lastChild: function() {
                return this.element.lastChild;
            },
            addTag: function(e, n, i, r) {
                if (!this.settings.beforeAddTag(e, n, i, r)) {
                    var o, a = t.createElement(e);
                    return "undefined" != typeof i && i === !1 && (a.contentEditable = !1), 0 == a.innerHTML.length && (a.innerHTML = " "), 
                    r && r.nextSibling ? (r.parentNode.insertBefore(a, r.nextSibling), o = r.nextSibling) : (this.settings.element.appendChild(a), 
                    o = this.html.lastChild()), n && (this.cache.focusedElement = o, this.cursor.set(0, o)), 
                    a;
                }
                return null;
            },
            baseAtCaret: function() {
                if (!this.medium.isActive()) return null;
                var t = e.getSelection ? e.getSelection() : document.selection;
                if (t.rangeCount) {
                    var n = t.getRangeAt(0), i = n.endContainer;
                    switch (i.nodeType) {
                      case 3:
                        if (i.data && i.data.length != n.endOffset) return !1;
                    }
                    return i;
                }
                return null;
            },
            atCaret: function() {
                var e = this.baseAtCaret() || {}, t = this.element;
                if (e === !1) return null;
                for (;e && e.parentNode !== t; ) e = e.parentNode;
                return e && 1 == e.nodeType ? e : null;
            }
        }, s.Action = function() {}, s.Action.prototype = {
            setBridge: function(e) {
                for (var t in e) this[t] = e[t];
            },
            listen: function() {
                var e = this.element, t = this.intercept;
                this.utils.addEvent(e, "keyup", t.up).addEvent(e, "keydown", t.down).addEvent(e, "focus", t.focus).addEvent(e, "blur", t.blur).addEvent(e, "paste", this.settings.pasteEventHandler);
            },
            preserveElementFocus: function() {
                var n = e.getSelection ? e.getSelection().anchorNode : t.activeElement;
                if (n) {
                    var i, r = this.medium.cache, o = this.settings, a = n.parentNode, l = o.element.children, s = a !== r.focusedElement, c = 0;
                    for (a === o.element && (a = n), i = 0; i < l.length; i++) if (a === l[i]) {
                        c = i;
                        break;
                    }
                    s && (r.focusedElement = a, r.focusedElementIndex = c);
                }
            }
        }, s.Cache = function() {
            this.initialized = !1, this.cmd = !1, this.focusedElement = null;
        }, s.Cache.prototype = {
            setBridge: function(e) {
                for (var t in e) this[t] = e[t];
            }
        }, s.inlineMode = "inline", s.partialMode = "partial", s.richMode = "rich", s.Messages = {
            pastHere: "Paste Here"
        }, s;
    }();
    "function" == typeof define && define.amd ? define(function() {
        return n;
    }) : "undefined" != typeof module && module.exports ? module.exports = n : "undefined" != typeof this && (this.Medium = n);
}).call(this, window, document);
!function(t) {
    "use strict";
    function e(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    }
    function r(t) {
        this.string = t;
    }
    function n(t) {
        this.name = t;
    }
    function a(t) {
        this.name = t;
    }
    function s() {}
    function i(t, e, i) {
        "/" === t.charAt(0) && (t = t.substr(1));
        for (var h = t.split("/"), o = [], u = 0, c = h.length; u < c; u++) {
            var p, f = h[u];
            (p = f.match(/^:([^\/]+)$/)) ? (o.push(new n(p[1])), e.push(p[1]), i.dynamics++) : (p = f.match(/^\*([^\/]+)$/)) ? (o.push(new a(p[1])), 
            e.push(p[1]), i.stars++) : "" === f ? o.push(new s()) : (o.push(new r(f)), i.statics++);
        }
        return o;
    }
    function h(t) {
        this.charSpec = t, this.nextStates = [];
    }
    function o(t) {
        return t.sort(function(t, e) {
            if (t.types.stars !== e.types.stars) return t.types.stars - e.types.stars;
            if (t.types.stars) {
                if (t.types.statics !== e.types.statics) return e.types.statics - t.types.statics;
                if (t.types.dynamics !== e.types.dynamics) return e.types.dynamics - t.types.dynamics;
            }
            return t.types.dynamics !== e.types.dynamics ? t.types.dynamics - e.types.dynamics : t.types.statics !== e.types.statics ? e.types.statics - t.types.statics : 0;
        });
    }
    function u(t, e) {
        for (var r = [], n = 0, a = t.length; n < a; n++) {
            var s = t[n];
            r = r.concat(s.match(e));
        }
        return r;
    }
    function c(t) {
        this.queryParams = t || {};
    }
    function p(t, e, r) {
        for (var n = t.handlers, a = t.regex, s = e.match(a), i = 1, h = new c(r), o = 0, u = n.length; o < u; o++) {
            for (var p = n[o], f = p.names, l = {}, d = 0, g = f.length; d < g; d++) l[f[d]] = s[i++];
            h.push({
                handler: p.handler,
                params: l,
                isDynamic: !!f.length
            });
        }
        return h;
    }
    function f(t, e) {
        return e.eachChar(function(e) {
            t = t.put(e);
        }), t;
    }
    function l(t, e, r) {
        this.path = t, this.matcher = e, this.delegate = r;
    }
    function d(t) {
        this.routes = {}, this.children = {}, this.target = t;
    }
    function g(t, e, r) {
        return function(n, a) {
            var s = t + n;
            return a ? void a(g(s, e, r)) : new l(t + n, e, r);
        };
    }
    function y(t, e, r) {
        for (var n = 0, a = 0, s = t.length; a < s; a++) n += t[a].path.length;
        e = e.substr(n);
        var i = {
            path: e,
            handler: r
        };
        t.push(i);
    }
    function v(t, e, r, n) {
        var a = e.routes;
        for (var s in a) if (a.hasOwnProperty(s)) {
            var i = t.slice();
            y(i, s, a[s]), e.children[s] ? v(i, e.children[s], r, n) : r.call(n, i);
        }
    }
    var m = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\" ], w = new RegExp("(\\" + m.join("|\\") + ")", "g");
    r.prototype = {
        eachChar: function(t) {
            for (var e, r = this.string, n = 0, a = r.length; n < a; n++) e = r.charAt(n), t({
                validChars: e
            });
        },
        regex: function() {
            return this.string.replace(w, "\\$1");
        },
        generate: function() {
            return this.string;
        }
    }, n.prototype = {
        eachChar: function(t) {
            t({
                invalidChars: "/",
                repeat: !0
            });
        },
        regex: function() {
            return "([^/]+)";
        },
        generate: function(t) {
            return t[this.name];
        }
    }, a.prototype = {
        eachChar: function(t) {
            t({
                invalidChars: "",
                repeat: !0
            });
        },
        regex: function() {
            return "(.+)";
        },
        generate: function(t) {
            return t[this.name];
        }
    }, s.prototype = {
        eachChar: function() {},
        regex: function() {
            return "";
        },
        generate: function() {
            return "";
        }
    }, h.prototype = {
        get: function(t) {
            for (var e = this.nextStates, r = 0, n = e.length; r < n; r++) {
                var a = e[r], s = a.charSpec.validChars === t.validChars;
                if (s = s && a.charSpec.invalidChars === t.invalidChars) return a;
            }
        },
        put: function(t) {
            var e;
            return (e = this.get(t)) ? e : (e = new h(t), this.nextStates.push(e), t.repeat && e.nextStates.push(e), 
            e);
        },
        match: function(t) {
            for (var e, r, n, a = this.nextStates, s = [], i = 0, h = a.length; i < h; i++) e = a[i], 
            r = e.charSpec, "undefined" != typeof (n = r.validChars) ? n.indexOf(t) !== -1 && s.push(e) : "undefined" != typeof (n = r.invalidChars) && n.indexOf(t) === -1 && s.push(e);
            return s;
        }
    };
    var C = Object.create || function(t) {
        function e() {}
        return e.prototype = t, new e();
    };
    c.prototype = C({
        splice: Array.prototype.splice,
        slice: Array.prototype.slice,
        push: Array.prototype.push,
        length: 0,
        queryParams: null
    });
    var x = function() {
        this.rootState = new h(), this.names = {};
    };
    x.prototype = {
        add: function(t, e) {
            for (var r, n = this.rootState, a = "^", h = {
                statics: 0,
                dynamics: 0,
                stars: 0
            }, o = [], u = [], c = !0, p = 0, l = t.length; p < l; p++) {
                var d = t[p], g = [], y = i(d.path, g, h);
                u = u.concat(y);
                for (var v = 0, m = y.length; v < m; v++) {
                    var w = y[v];
                    w instanceof s || (c = !1, n = n.put({
                        validChars: "/"
                    }), a += "/", n = f(n, w), a += w.regex());
                }
                var C = {
                    handler: d.handler,
                    names: g
                };
                o.push(C);
            }
            c && (n = n.put({
                validChars: "/"
            }), a += "/"), n.handlers = o, n.regex = new RegExp(a + "$"), n.types = h, (r = e && e.as) && (this.names[r] = {
                segments: u,
                handlers: o
            });
        },
        handlersFor: function(t) {
            var e = this.names[t], r = [];
            if (!e) throw new Error("There is no route named " + t);
            for (var n = 0, a = e.handlers.length; n < a; n++) r.push(e.handlers[n]);
            return r;
        },
        hasRoute: function(t) {
            return !!this.names[t];
        },
        generate: function(t, e) {
            var r = this.names[t], n = "";
            if (!r) throw new Error("There is no route named " + t);
            for (var a = r.segments, i = 0, h = a.length; i < h; i++) {
                var o = a[i];
                o instanceof s || (n += "/", n += o.generate(e));
            }
            return "/" !== n.charAt(0) && (n = "/" + n), e && e.queryParams && (n += this.generateQueryString(e.queryParams, r.handlers)), 
            n;
        },
        generateQueryString: function(t, r) {
            var n = [], a = [];
            for (var s in t) t.hasOwnProperty(s) && a.push(s);
            a.sort();
            for (var i = 0, h = a.length; i < h; i++) {
                s = a[i];
                var o = t[s];
                if (null != o) {
                    var u = s;
                    if (e(o)) for (var c = 0, p = o.length; c < p; c++) {
                        var f = s + "[]=" + encodeURIComponent(o[c]);
                        n.push(f);
                    } else u += "=" + encodeURIComponent(o), n.push(u);
                }
            }
            return 0 === n.length ? "" : "?" + n.join("&");
        },
        parseQueryString: function(t) {
            for (var e = t.split("&"), r = {}, n = 0; n < e.length; n++) {
                var a, s = e[n].split("="), i = decodeURIComponent(s[0]), h = i.length, o = !1;
                1 === s.length ? a = "true" : (h > 2 && "[]" === i.slice(h - 2) && (o = !0, i = i.slice(0, h - 2), 
                r[i] || (r[i] = [])), a = s[1] ? decodeURIComponent(s[1]) : ""), o ? r[i].push(a) : r[i] = decodeURIComponent(a);
            }
            return r;
        },
        recognize: function(t) {
            var e, r, n, a, s = [ this.rootState ], i = {}, h = !1;
            if (t = decodeURI(t), a = t.indexOf("?"), a !== -1) {
                var c = t.substr(a + 1, t.length);
                t = t.substr(0, a), i = this.parseQueryString(c);
            }
            for ("/" !== t.charAt(0) && (t = "/" + t), e = t.length, e > 1 && "/" === t.charAt(e - 1) && (t = t.substr(0, e - 1), 
            h = !0), r = 0, n = t.length; r < n && (s = u(s, t.charAt(r)), s.length); r++) ;
            var f = [];
            for (r = 0, n = s.length; r < n; r++) s[r].handlers && f.push(s[r]);
            s = o(f);
            var l = f[0];
            if (l && l.handlers) return h && "(.+)$" === l.regex.source.slice(-5) && (t += "/"), 
            p(l, t, i);
        }
    }, t.RouteRecognizer = x, l.prototype = {
        to: function(t, e) {
            var r = this.delegate;
            if (r && r.willAddRoute && (t = r.willAddRoute(this.matcher.target, t)), this.matcher.add(this.path, t), 
            e) {
                if (0 === e.length) throw new Error("You must have an argument in the function passed to `to`");
                this.matcher.addChild(this.path, t, e, this.delegate);
            }
            return this;
        }
    }, d.prototype = {
        add: function(t, e) {
            this.routes[t] = e;
        },
        addChild: function(t, e, r, n) {
            var a = new d(e);
            this.children[t] = a;
            var s = g(t, a, n);
            n && n.contextEntered && n.contextEntered(e, s), r(s);
        }
    }, x.prototype.map = function(t, e) {
        var r = new d();
        t(g("", r, this.delegate)), v([], r, function(t) {
            e ? e(this, t) : this.add(t);
        }, this);
    };
}(window);
function load_resource(e, s, o, a, t, n) {
    var c = new XMLHttpRequest();
    c.onload = function(e, s, n) {
        if (c.status >= 200 && c.status <= 299) {
            var r = null;
            try {
                var r = JSON.parse(c.response);
            } catch (i) {}
            o && r && r._id && (o._id = r._id), a && a(r, c);
        } else t && t(c);
    }, c.onerror = function(e) {
        console.log(e, e.target), window._spacedeck_location_change || (window.spacedeck && window.spacedeck.active_space ? window.spacedeck.offline = !0 : alert("Could not connect to Spacedeck. Please reconnect and try again.")), 
        t && t(c);
    }, c.withCredentials = !0, c.open(e, api_endpoint + "/api" + s, !0), api_token && c.setRequestHeader("X-Spacedeck-Auth", api_token), 
    space_auth && (console.log("set space auth", space_auth), c.setRequestHeader("X-Spacedeck-Space-Auth", space_auth)), 
    channel_id && c.setRequestHeader("X-Spacedeck-Channel", channel_id), csrf_token && c.setRequestHeader("X-csrf-token", csrf_token);
    try {
        o ? "[object File]" == o.toString() ? (c.setRequestHeader("Content-type", o.type), 
        c.setRequestHeader("Accepts", "application/json"), c.upload.onprogress = function(e) {
            console.log("upload progress: ", e.loaded, e.total), n && n(e);
        }, c.send(o)) : (c.setRequestHeader("Content-type", "application/json"), c.send(JSON.stringify(o))) : c.send();
    } catch (r) {
        if (!t) throw r;
        t(c, r);
    }
}

function get_resource(e, s, o, a) {
    load_resource("get", e, null, s, o, a);
}

function load_profile(e, s, o) {
    load_resource("get", "/users/slug?slug=" + e, null, s, o);
}

function load_current_user(e, s) {
    load_resource("get", "/users/current", null, e, s);
}

function load_space(e, s, o) {
    if (!e || "undefined" == e) return void console.error("load_space id:", e);
    var a = "/spaces/" + e;
    load_resource("get", a, null, function(e, o) {
        var a = o.getResponseHeader("x-spacedeck-space-role");
        s(e, a);
    }, o);
}

function load_space_path(e, s, o) {
    var a = "/spaces/" + e + "/path";
    load_resource("get", a, null, function(e, o) {
        s(e);
    }, o);
}

function load_spaces(e, s, o, a) {
    if (!e || "undefined" == e) return void console.error("load_spaces id:", e);
    var t = "?parent_space_id=" + e;
    load_resource("get", "/spaces" + t, null, function(e) {
        o(e);
    }, a);
}

function load_writable_folders(e, s) {
    load_resource("get", "/spaces?writablefolders=true", null, e, s);
}

function load_history(e, s, o) {
    load_resource("get", "/spaces/" + e._id + "/digest", null, s, o);
}

function load_filtered_spaces(e, s, o) {
    load_resource("get", "/spaces?filter=" + e, null, s, o);
}

function load_spaces_search(e, s, o) {
    load_resource("get", "/spaces?search=" + e, null, s, o);
}

function load_artifacts(e, s, o) {
    load_resource("get", "/spaces/" + e + "/artifacts", null, s, o);
}

function save_artifact(e, s, o) {
    e._id ? load_resource("put", "/spaces/" + e.space_id + "/artifacts/" + e._id, e, s, o) : load_resource("post", "/spaces/" + e.space_id + "/artifacts", e, s, o);
}

function save_pdf_file(e, s, o, a, t, n, c) {
    load_resource("post", "/spaces/" + e._id + "/artifacts-pdf?filename=" + o.name + "&x=" + s.x + "&y=" + s.y + "&zones=" + a, o, t, n, c);
}

function save_artifact_file(e, s, o, a, t, n) {
    load_resource("post", "/spaces/" + e.space_id + "/artifacts/" + e._id + "/payload?filename=" + o, s, a, t, n);
}

function save_space(e, s, o) {
    e._id ? (delete e.artifacts, load_resource("put", "/spaces/" + e._id, e, s, o)) : load_resource("post", "/spaces", e, s, o);
}

function delete_space(e, s, o) {
    load_resource("delete", "/spaces/" + e._id, null, s, o);
}

function delete_artifact(e, s, o) {
    load_resource("delete", "/spaces/" + e.space_id + "/artifacts/" + e._id);
}

function duplicate_space(e, s, o, a) {
    var t = "/spaces/" + e._id + "/duplicate";
    s && (t += "?parent_space_id=" + s), load_resource("post", t, null, o, a);
}

function load_members(e, s, o) {
    load_resource("get", "/spaces/" + e._id + "/memberships", null, s, o);
}

function create_membership(e, s, o, a) {
    load_resource("post", "/spaces/" + e._id + "/memberships", s, o, a);
}

function save_membership(e, s, o, a) {
    load_resource("put", "/spaces/" + e._id + "/memberships/" + s._id, s, o, a);
}

function delete_membership(e, s, o, a) {
    load_resource("delete", "/spaces/" + e._id + "/memberships/" + s._id, s, o, a);
}

function accept_invitation(e, s, o, a) {
    load_resource("get", "/memberships/" + e + "/accept?code=" + s, null, o, a);
}

function get_join_link(e, s, o) {
    load_resource("get", "/invitation_codes?space_id=" + e, null, s, o);
}

function create_join_link(e, s, o, a) {
    load_resource("post", "/invitation_codes", {
        join_role: s,
        sticky: !0,
        space_id: e
    }, o, a);
}

function delete_join_link(e, s, o) {
    load_resource("delete", "/invitation_codes/" + e, null, s, o);
}

function load_team_members(e, s, o) {
    load_resource("get", "/teams/" + e + "/memberships", null, function(e) {
        s(e);
    }, o);
}

function save_avatar_file(e, s, o, a, t) {
    load_resource("post", "/" + e + "s/" + s._id + "/avatar", o, a, t);
}

function remove_avatar_file(e, s, o, a) {
    load_resource("delete", "/" + e + "s/" + s._id + "/avatar", null, o, a);
}

function save_space_background_file(e, s, o, a) {
    load_resource("post", "/spaces/" + e._id + "/background?filename=" + s.name, s, o, a);
}

function save_user_background_file(e, s, o, a) {
    load_resource("post", "/users/" + e._id + "/background", s, o, a);
}

function save_user_password(e, s, o, a, t) {
    load_resource("post", "/users/" + e._id + "/password", {
        old_password: s,
        new_password: o
    }, a, t);
}

function get_featured_users(e, s) {
    load_resource("get", "/users/featured", null, e, s);
}

function save_user(e, s, o) {
    load_resource("put", "/users/" + e._id, e, s, o);
}

function delete_user(e, s, o, a) {
    load_resource("delete", "/users/" + e._id + "?password=" + s, null, o, a);
}

function create_user(e, s, o, a, t, n) {
    load_resource("post", "/users", {
        email: s,
        nickname: e,
        password: o,
        password_confirmation: a
    }, t, n);
}

function create_session(e, s, o, a) {
    load_resource("post", "/sessions", {
        email: e,
        password: s
    }, o, a);
}

function delete_session(e, s) {
    load_resource("delete", "/sessions/current", null, e, s);
}

function create_oauthtoken(e, s) {
    load_resource("get", "/users/oauth2callback/url", null, e, s);
}

function create_session_for_oauthtoken(e, s, o) {
    load_resource("get", "/users/loginorsignupviagoogle?code=" + e, null, s, o);
}

function create_password_reset(e, s, o) {
    load_resource("post", "/users/password_reset_requests?email=" + encodeURIComponent(e), null, s, o);
}

function confirm_password_reset(e, s, o, a) {
    load_resource("post", "/users/password_reset_requests/" + s + "/confirm", {
        password: e
    }, o, a);
}

function confirm_user(e, s, o, a) {
    load_resource("put", "/users/" + e._id + "/confirm", {
        token: s
    }, o, a);
}

function resent_confirm_mail(e, s, o) {
    load_resource("post", "/users/" + e._id + "/confirm", {}, s, o);
}

function create_feedback(e, s, o, a) {
    load_resource("post", "/users/feedback", {
        text: s
    }, o, a);
}

function save_team(e, s, o) {
    load_resource("put", "/teams/" + e._id, e, s, o);
}

function load_comments(e, s, o) {
    load_resource("get", "/spaces/" + e + "/messages", null, s, o);
}

function save_comment(e, s, o, a) {
    load_resource("post", "/spaces/" + e + "/messages", s, o, a);
}

function delete_comment(e, s, o, a) {
    load_resource("delete", "/spaces/" + e + "/messages/" + s, null, o, a);
}

function update_comment(e, s, o, a) {
    load_resource("post", "/spaces/" + e + "/messages/" + s._id, s, o, a);
}

function load_notifications(e, s, o) {
    load_resource("get", "/notifications", null, s, o);
}

var api_endpoint = ENV.apiEndpoint, api_socket_endpoint = ENV.websocketsEndpoint, api_token = null, websocket = null, channel_id = null, space_auth = null;
function parse_link(e) {
    if (null == e) return "";
    var o = e, r = 400, a = 300, t = "", i = null, l = !1, s = /embed\:(https?\:\/\/[^ <]+)/, d = /(https?\:\/\/[^ <]+)/, c = "unknown", n = "unknown";
    if (isDataFileUrl = function(e) {
        var o, r;
        try {
            if (e.split("/").length < 4) return !1;
            if (o = _.last(e.split("/")), o.indexOf(".") < 0) return !1;
            if (r = _.last(o.split(".")), !r) return !1;
            if (_.include([ "png", "jpg", "jpeg", "gif", "zip", "rar", "7z", "tar", "tgz", "gz", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "mp3", "ogg", "oga", "ogv", "pdf", "dmg", "exe", "iso", "dxf", "ipa", "mov", "wmv", "wma", "wav", "aiff", "mp4", "m4a", "prg", "bin", "dat", "psd", "ai", "eps", "key" ], r)) return !0;
        } catch (a) {}
        return !1;
    }, m = e.match(s)) embedUri = m[1], o = "<iframe width='100%' height='100%' src=\"" + embedUri + '" seamless="1" allowfullscreen="1"></iframe>', 
    r = 320, a = 195, i = embedUri, t = "external-embed"; else if (e.match(/http/) && e.replace(/[^<]/g, "").length < 3) if (youtubeMatcher = /youtube\.com\/.*v=([^&<]+)/, 
    youtubeMatcher2 = /youtu\.be\/([^&<]+)/, soundcloudMatcher = /soundcloud\.com\/([^<]+)/, 
    vimeoMatcher = /vimeo.com\/([^<]*)/, dailyMotionMatcher = /dailymotion.com\/video\/([^<]*)/, 
    googleMapsMatcher = /google.com\/maps\?([^<]*)/, spacedeckMatcher = new RegExp(location.host + "/(spaces|folders)/([0-9a-f]{24})"), 
    m = e.match(youtubeMatcher) || (m = e.match(youtubeMatcher2))) videoId = m[1], o = '<iframe src="https://www.youtube.com/embed/' + videoId + '?html5=1&rel=0&showinfo=0&autohide=1" frameborder="0" allowfullscreen="1"></iframe>', 
    r = 320, a = 195, n = "youtube", c = "video"; else if (m = e.match(dailyMotionMatcher)) videoId = m[1], 
    o = '<iframe src="https://www.dailymotion.com/embed/video/' + videoId + '" frameborder="0"></iframe>', 
    r = 268, a = 151, n = "dailymotion", c = "video"; else if (m = e.match(vimeoMatcher)) videoId = m[1], 
    o = '<iframe src="https://player.vimeo.com/video/' + videoId + '" frameborder="0"></iframe>', 
    r = 268, a = 151, n = "vimeo", c = "video"; else if (m = e.match(soundcloudMatcher)) {
        var u, p = "https://" + m[0];
        u = m[0].indexOf("soundcloud.com/player") >= 0 ? "https://w." + m[0] : "https://w.soundcloud.com/player/?url=" + encodeURI(p), 
        o = '<iframe scrolling="no" frameborder="no" src="' + u + '"></iframe>', r = 360, 
        a = 184, i = p, n = "soundcloud", c = "audio";
    } else (m = e.match(googleMapsMatcher)) ? (mapsParams = m[1], o = '<iframe src="https://maps-api-ssl.google.com/maps?' + mapsParams + '" seamless="1" allowfullscreen="1"></iframe>', 
    r = 320, a = 195, n = "google", c = "map") : (m = e.match(d)) && !isDataFileUrl(m[1]) ? (uri = m[1], 
    grabUri = uri, endPoint = "/api/webgrabber/" + encodeURIComponent(btoa(grabUri)), 
    o = e.replace(uri, ' <img src="' + endPoint + '" title="' + uri + '"/> '), r = 300, 
    a = 300, i = uri) : l = !0; else l = !0;
    return l ? null : (result = {
        html: o,
        thumbnail_width: r,
        thumbnail_height: a,
        type: c,
        provider_name: n,
        url: i
    }, result);
}
function vec2_add(r, e) {
    return {
        dx: r.dx + e.dx,
        dy: r.dy + e.dy
    };
}

function vec2_sub(r, e) {
    return {
        dx: r.dx - e.dx,
        dy: r.dy - e.dy
    };
}

function vec2_mul(r, e) {
    return {
        dx: r.dx * e,
        dy: r.dy * e
    };
}

function vec2_magn(r) {
    return Math.sqrt(r.dx * r.dx + r.dy * r.dy);
}

function vec2_unit(r) {
    var e = vec2_magn(r);
    return 0 == e ? {
        dx: 0,
        dy: 0
    } : {
        dx: r.dx / e,
        dy: r.dy / e
    };
}

function vec2_angle(r) {
    return 0 == r.dx ? Math.atan2(r.dx + .01, r.dy) : Math.atan2(r.dx, r.dy);
}

function render_vector_drawing(r, e) {
    var t = r.style.shape || "", n = [], o = r.control_points[0];
    if (!o) return "";
    if (n.push("M" + (o.dx + e) + "," + (o.dy + e) + " "), t.match("arrow")) {
        var c = r.control_points[0], a = r.control_points[1], d = r.control_points[2];
        d || (d = a);
        var u = r._id, _ = c, v = a, s = vec2_sub(v, _), i = vec2_magn(s), l = vec2_mul(vec2_unit(s), i / 2), h = vec2_add(_, l), f = vec2_sub(d, h), p = vec2_add(vec2_mul(f, 2), h), g = "M" + (c.dx + e) + "," + (c.dy + e) + " Q" + (p.dx + e) + "," + (p.dy + e) + " " + (a.dx + e) + "," + (a.dy + e), y = "<defs><marker id='ae" + u + '\' refX="0.1" refY="3" markerWidth="3" markerHeight="6" orient="auto">';
        y += '<path d="M-3,0 V6 L3,3 Z" fill="' + r.style.stroke_color + '" stroke-width="0"/></marker></defs>';
        var x = y + "<path d='" + g + "' style='stroke-width:" + r.style.stroke + ";' marker-end='url(#ae" + u + ")'/>";
        return x;
    }
    for (var b, o, o, b = 0; b < r.control_points.length; b++) {
        var o = r.control_points[b], m = 0 == b ? "M" : "L";
        n.push(m + (o.dx + e) + "," + (o.dy + e));
    }
    return "<path d='" + n.join(" ") + "'>";
}

function render_vector_star(r, e, t, n) {
    r *= 2;
    for (var o = [], c = 360 / r, a = 0; a < r; a++) {
        var d = a * c - 90, u = e, _ = t;
        a % 2 && (20 == r ? (u /= 1.5, _ /= 1.5) : (u /= 2.8, _ /= 2.8));
        var v = n + e + u * Math.cos(d * Math.PI / 180), s = n + t + _ * Math.sin(d * Math.PI / 180);
        o.push(v + "," + s);
    }
    return "<polygon points='" + o.join(" ") + "'/>";
}

function transform_vector_template(r, e, t, n) {
    for (var o = "", c = 0; c < r.length; c += 2) {
        for (var a = r[c + 1], d = 0; d < a.length; d += 2) a[d] *= 2 * e / 100, a[d + 1] *= 2 * t / 100;
        o += r[c] + r[c + 1].join(",") + " ";
    }
    return o;
}

function render_vector_heart(r, e, t) {
    var n = [ "M", [ 50.141, 98.5 ], "c", [ 0, 0, -49, -38.334, -49, -67.982 ], "C", [ 1.141, 15.333, 14.356, 1, 30.659, 1 ], "c", [ 7.437, 0, 14.244, 2.791, 19.435, 7.33 ], "l", [ 0, 0 ], "C", [ 55.296, 3.742, 62.141, 1, 69.622, 1 ], "c", [ 16.303, 0, 29.519, 14.166, 29.519, 29.518 ], "C", [ 99.141, 60.334, 50.141, 98.5, 50.141, 98.5 ], "z", [] ];
    return svg = "<path d='" + transform_vector_template(n, r, e, t) + "'/>", svg;
}

function render_vector_cloud(r, e, t) {
    var n = [ "M", [ 17.544, 99.729 ], "c", [ 0, 0, -17.544, 6.929, -17.544, -36.699 ], "c", [ 0, -18.698, 19.298, -28.047, 19.298, -9.35 ], "c", [ 0, 0, -3.508, -54.46, 26.316, -53.672 ], "C", [ 71.93, .704, 68.421, 34.983, 68.421, 34.983 ], "S", [ 100, 25.634, 100, 72.379 ], "c", [ 0, 28.047, -21.053, 27.351, -21.053, 27.351 ], "z", [] ];
    return svg = "<path d='" + transform_vector_template(n, r, e, t) + "'/>", svg;
}

function render_vector_ellipse(r, e, t) {
    return svg = "<ellipse cx=" + (r + t) + " cy=" + (e + t) + " rx=" + r + " ry=" + e + ">", 
    svg;
}

function render_vector_speechbubble(r, e, t) {
    var n = [ "M", [ 100, 50 ], "c", [ 0, 9.5, -2.7, 18, -7.4, 26 ], "C", [ 90, 80, 100, 100, 100, 100 ], "s", [ -23.194, -6.417, -28, -4.162 ], "c", [ -6.375, 3, -13.5, 4.7, -21, 4.7 ], "C", [ 23, 100, .5, 77, .5, 50 ], "C", [ .5, 23, 23, .5, 50, .5 ], "C", [ 77, .5, 100, 23, 100, 50 ], "z", [] ];
    return svg = "<path d='" + transform_vector_template(n, r, e, t) + "'/>", svg;
}

function render_vector_ngon(r, e, t, n) {
    for (var o = [], c = 360 / r, a = 0; a < r; a++) {
        var d = a * c - 90, u = n + e + e * Math.cos(d * Math.PI / 180), _ = n + t + t * Math.sin(d * Math.PI / 180);
        o.push(u + "," + _);
    }
    return "<polygon points='" + o.join(" ") + "'/>";
}

function render_vector_rect(r, e, t) {
    return "<rect x='0' y='0' width='" + 2 * r + "' height='" + 2 * r + "'/>";
}

function render_vector_shape(r) {
    var e = parseInt(r.style.stroke) + 4, t = e / 2, n = (r.board.w - e) / 2, o = (r.board.h - e) / 2, c = {
        ellipse: function() {
            return render_vector_ellipse(n, o, t);
        },
        pentagon: function() {
            return render_vector_ngon(5, n, o, t);
        },
        hexagon: function() {
            return render_vector_ngon(6, n, o, t);
        },
        octagon: function() {
            return render_vector_ngon(8, n, o, t);
        },
        diamond: function() {
            return render_vector_ngon(4, n, o, t);
        },
        square: function() {
            return "";
        },
        triangle: function() {
            return render_vector_ngon(3, n, o, t);
        },
        star: function() {
            return render_vector_star(5, n, o, t);
        },
        burst: function() {
            return render_vector_star(10, n, o, t);
        },
        speechbubble: function() {
            return render_vector_speechbubble(n, o, t);
        },
        heart: function() {
            return render_vector_heart(n, o, t);
        },
        cloud: function() {
            return render_vector_cloud(n, o, t);
        }
    }, a = c[r.style.shape];
    return a ? a() : "";
}

function simplify_scribble_points(r) {
    for (var e = [], t = 2, n = 0; n < r.length; n++) {
        var o = r[n], c = r[n + 1];
        if (n > 0) var a = r[n - 1];
        c && a ? (dprev = vec2_sub(o, a), dnext = vec2_sub(c, o), aprev = vec2_angle(dprev), 
        anext = vec2_angle(dnext), delta = Math.abs(Math.abs(aprev) - Math.abs(anext)), 
        delta2 = vec2_magn(vec2_sub(o, a)), delta2 > t && delta > .1 && e.push(o)) : e.push(o);
    }
    return e;
}

"undefined" == typeof window && (exports.render_vector_shape = render_vector_shape, 
exports.render_vector_drawing = render_vector_drawing);
!function(e, t, n) {
    function r(e, t, n) {
        return e.addEventListener ? void e.addEventListener(t, n, !1) : void e.attachEvent("on" + t, n);
    }
    function o(e) {
        if ("keypress" == e.type) {
            var t = String.fromCharCode(e.which);
            return e.shiftKey || (t = t.toLowerCase()), t;
        }
        return q[e.which] ? q[e.which] : P[e.which] ? P[e.which] : String.fromCharCode(e.which).toLowerCase();
    }
    function i(e, t) {
        return e.sort().join(",") === t.sort().join(",");
    }
    function a(e) {
        e = e || {};
        var t, n = !1;
        for (t in M) e[t] ? n = !0 : M[t] = 0;
        n || (x = !1);
    }
    function c(e, t, n, r, o, a) {
        var c, u, s = [], f = n.type;
        if (!N[e]) return [];
        for ("keyup" == f && d(e) && (t = [ e ]), c = 0; c < N[e].length; ++c) if (u = N[e][c], 
        (r || !u.seq || M[u.seq] == u.level) && f == u.action && ("keypress" == f && !n.metaKey && !n.ctrlKey || i(t, u.modifiers))) {
            var l = !r && u.combo == o, p = r && u.seq == r && u.level == a;
            (l || p) && N[e].splice(c, 1), s.push(u);
        }
        return s;
    }
    function u(e) {
        var t = [];
        return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), 
        e.metaKey && t.push("meta"), t;
    }
    function s(e) {
        return e.preventDefault ? void e.preventDefault() : void (e.returnValue = !1);
    }
    function f(e) {
        return e.stopPropagation ? void e.stopPropagation() : void (e.cancelBubble = !0);
    }
    function l(e, t, n, r) {
        O.stopCallback(t, t.target || t.srcElement, n, r) || e(t, n) === !1 && (s(t), f(t));
    }
    function p(e, t, n) {
        var r, o = c(e, t, n), i = {}, u = 0, s = !1;
        for (r = 0; r < o.length; ++r) o[r].seq && (u = Math.max(u, o[r].level));
        for (r = 0; r < o.length; ++r) if (o[r].seq) {
            if (o[r].level != u) continue;
            s = !0, i[o[r].seq] = 1, l(o[r].callback, n, o[r].combo, o[r].seq);
        } else s || l(o[r].callback, n, o[r].combo);
        var f = "keypress" == n.type && j;
        n.type != x || d(e) || f || a(i), j = s && "keydown" == n.type;
    }
    function h(e) {
        "number" != typeof e.which && (e.which = e.keyCode);
        var t = o(e);
        if (t) return "keyup" == e.type && S === t ? void (S = !1) : void O.handleKey(t, u(e), e);
    }
    function d(e) {
        return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
    }
    function y() {
        clearTimeout(K), K = setTimeout(a, 1e3);
    }
    function v() {
        if (!E) {
            E = {};
            for (var e in q) e > 95 && e < 112 || q.hasOwnProperty(e) && (E[q[e]] = e);
        }
        return E;
    }
    function m(e, t, n) {
        return n || (n = v()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), 
        n;
    }
    function k(e, t, n, r) {
        function i(t) {
            return function() {
                x = t, ++M[e], y();
            };
        }
        function c(t) {
            l(n, t, e), "keyup" !== r && (S = o(t)), setTimeout(a, 10);
        }
        M[e] = 0;
        for (var u = 0; u < t.length; ++u) {
            var s = u + 1 === t.length, f = s ? c : i(r || w(t[u + 1]).action);
            b(t[u], f, r, e, u);
        }
    }
    function g(e) {
        var t = e.split("+");
        return "+" === e[e.length - 1] && (t.pop(), t.length && t.pop(), t.push("+")), t;
    }
    function w(e, t) {
        var n, r, o, i = [];
        for (n = g(e), o = 0; o < n.length; ++o) r = n[o], L[r] && (r = L[r]), t && "keypress" != t && T[r] && (r = T[r], 
        i.push("shift")), d(r) && i.push(r);
        return t = m(r, i, t), {
            key: r,
            modifiers: i,
            action: t
        };
    }
    function b(e, t, n, r, o) {
        A[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
        var i, a = e.split(" ");
        return a.length > 1 ? void k(e, a, t, n) : (i = w(e, n), N[i.key] = N[i.key] || [], 
        c(i.key, i.modifiers, {
            type: i.action
        }, r, e, o), void N[i.key][r ? "unshift" : "push"]({
            callback: t,
            modifiers: i.modifiers,
            action: i.action,
            seq: r,
            level: o,
            combo: e
        }));
    }
    function C(e, t, n) {
        for (var r = 0; r < e.length; ++r) b(e[r], t, n);
    }
    for (var E, K, q = {
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "ins",
        46: "del",
        91: "meta",
        93: "meta",
        224: "meta"
    }, P = {
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    }, T = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        $: "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        _: "-",
        "+": "=",
        ":": ";",
        '"': "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
    }, L = {
        option: "alt",
        command: "meta",
        "return": "enter",
        escape: "esc",
        mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
    }, N = {}, A = {}, M = {}, S = !1, j = !1, x = !1, D = 1; D < 20; ++D) q[111 + D] = "f" + D;
    for (D = 0; D <= 9; ++D) q[D + 96] = D;
    r(t, "keypress", h), r(t, "keydown", h), r(t, "keyup", h);
    var O = {
        bind: function(e, t, n) {
            return e = e instanceof Array ? e : [ e ], C(e, t, n), this;
        },
        unbind: function(e, t) {
            return O.bind(e, function() {}, t);
        },
        trigger: function(e, t) {
            return A[e + ":" + t] && A[e + ":" + t]({}, e), this;
        },
        reset: function() {
            return N = {}, A = {}, this;
        },
        stopCallback: function(e, t) {
            return !((" " + t.className + " ").indexOf(" mousetrap ") > -1) && ("INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.isContentEditable);
        },
        handleKey: p
    };
    e.Mousetrap = O;
}(window, document);
!function(e, n) {
    var t = {
        smoketimeout: [],
        init: !1,
        zindex: 4e4,
        i: 0,
        bodyload: function(e) {
            var i = n.createElement("div");
            i.setAttribute("id", "smoke-out-" + e), i.className = "smoke-base", i.style.zIndex = t.zindex, 
            t.zindex++, n.body.appendChild(i);
        },
        newdialog: function() {
            var n = new Date().getTime();
            return n = Math.random(1, 99) + n, t.init ? t.bodyload(n) : t.listen(e, "load", function() {
                t.bodyload(n);
            }), n;
        },
        forceload: function() {},
        build: function(n, i) {
            t.i++, i.stack = t.i, n = n.replace(/\n/g, "<br />"), n = n.replace(/\r/g, "<br />");
            var o, a = "", d = "OK", l = "Cancel", c = "", u = "";
            "prompt" === i.type && (a = '<div class="smoke-dialog-prompt"><input class="input" id="smoke-dialog-input-' + i.newid + '" type="text" ' + (i.params.value ? 'value="' + i.params.value + '"' : "") + " /></div>"), 
            i.params.ok && (d = i.params.ok), i.params.cancel && (l = i.params.cancel), i.params.classname && (c = i.params.classname), 
            "signal" !== i.type && (u = '<div class="smoke-dialog-buttons">', "alert" === i.type ? u += '<button class="btn btn-md btn-round" id="alert-ok-' + i.newid + '">' + d + "</button>" : "quiz" === i.type ? (i.params.button_1 && (u += '<button class="btn btn-md btn-round quiz-button" id="' + i.type + "-ok1-" + i.newid + '">' + i.params.button_1 + "</button>"), 
            i.params.button_2 && (u += '<button class="btn btn-md btn-round quiz-button" id="' + i.type + "-ok2-" + i.newid + '">' + i.params.button_2 + "</button>"), 
            i.params.button_3 && (u += '<button class="btn btn-md btn-round quiz-button" id="' + i.type + "-ok3-" + i.newid + '">' + i.params.button_3 + "</button>"), 
            i.params.button_cancel && (u += '<button id="' + i.type + "-cancel-" + i.newid + '" class="btn btn-md btn-round cancel">' + i.params.button_cancel + "</button>")) : "prompt" !== i.type && "confirm" !== i.type || (u += i.params.reverseButtons ? '<button class="btn btn-md btn-round btn-primary" id="' + i.type + "-ok-" + i.newid + '">' + d + '</button><button class="btn btn-md btn-round cancel" id="' + i.type + "-cancel-" + i.newid + '">' + l + "</button>" : '<button class="btn btn-md btn-round cancel" id="' + i.type + "-cancel-" + i.newid + '">' + l + '</button><button class="btn btn-md btn-round btn-primary" id="' + i.type + "-ok-" + i.newid + '">' + d + "</button>"), 
            u += "</div>"), o = '<div class="smoke-dialog smoke ' + c + '"><div class="smoke-dialog-inner">' + n + a + u + "</div></div>", 
            t.init ? t.finishbuild(n, i, o) : t.listen(e, "load", function() {
                t.finishbuild(n, i, o);
            });
        },
        finishbuild: function(e, i, o) {
            var a = n.getElementById("smoke-out-" + i.newid);
            for (a.className = "smoke-base smoke-visible  smoke-" + i.type, a.innerHTML = o; "" === a.innerHTML; ) a.innerHTML = o;
            switch (t.smoketimeout[i.newid] && clearTimeout(t.smoketimeout[i.newid]), i.type) {
              case "alert":
                t.finishbuildAlert(e, i, o);
                break;

              case "confirm":
                t.finishbuildConfirm(e, i, o);
                break;

              case "quiz":
                t.finishbuildQuiz(e, i, o);
                break;

              case "prompt":
                t.finishbuildPrompt(e, i, o);
                break;

              case "signal":
                t.finishbuildSignal(e, i, o);
                break;

              default:
                throw "Unknown type: " + i.type;
            }
        },
        finishbuildAlert: function(i, o, a) {
            t.listen(n.getElementById("alert-ok-" + o.newid), "click", function() {
                t.destroy(o.type, o.newid), "undefined" != typeof o.callback && o.callback();
            }), n.onkeyup = function(n) {
                n || (n = e.event), 13 !== n.keyCode && 32 !== n.keyCode && 27 !== n.keyCode || (t.destroy(o.type, o.newid), 
                "undefined" != typeof o.callback && o.callback());
            };
        },
        finishbuildConfirm: function(i, o, a) {
            t.listen(n.getElementById("confirm-cancel-" + o.newid), "click", function() {
                t.destroy(o.type, o.newid), o.callback(!1);
            }), t.listen(n.getElementById("confirm-ok-" + o.newid), "click", function() {
                t.destroy(o.type, o.newid), o.callback(!0);
            }), n.onkeyup = function(n) {
                n || (n = e.event), 13 === n.keyCode || 32 === n.keyCode ? (t.destroy(o.type, o.newid), 
                o.callback(!0)) : 27 === n.keyCode && (t.destroy(o.type, o.newid), o.callback(!1));
            };
        },
        finishbuildQuiz: function(i, o, a) {
            var d, l, c;
            t.listen(n.getElementById("quiz-cancel-" + o.newid), "click", function() {
                t.destroy(o.type, o.newid), o.callback(!1);
            }), (d = n.getElementById("quiz-ok1-" + o.newid)) && t.listen(d, "click", function() {
                t.destroy(o.type, o.newid), o.callback(d.innerHTML);
            }), (l = n.getElementById("quiz-ok2-" + o.newid)) && t.listen(l, "click", function() {
                t.destroy(o.type, o.newid), o.callback(l.innerHTML);
            }), (c = n.getElementById("quiz-ok3-" + o.newid)) && t.listen(c, "click", function() {
                t.destroy(o.type, o.newid), o.callback(c.innerHTML);
            }), n.onkeyup = function(n) {
                n || (n = e.event), 27 === n.keyCode && (t.destroy(o.type, o.newid), o.callback(!1));
            };
        },
        finishbuildPrompt: function(i, o, a) {
            var d = n.getElementById("smoke-dialog-input-" + o.newid);
            setTimeout(function() {
                d.focus(), d.select();
            }, 100), t.listen(n.getElementById("prompt-cancel-" + o.newid), "click", function() {
                t.destroy(o.type, o.newid), o.callback(!1);
            }), t.listen(n.getElementById("prompt-ok-" + o.newid), "click", function() {
                t.destroy(o.type, o.newid), o.callback(d.value);
            }), n.onkeyup = function(n) {
                n || (n = e.event), 13 === n.keyCode ? (t.destroy(o.type, o.newid), o.callback(d.value)) : 27 === n.keyCode && (t.destroy(o.type, o.newid), 
                o.callback(!1));
            };
        },
        finishbuildSignal: function(i, o, a) {
            n.onkeyup = function(n) {
                n || (n = e.event), 27 === n.keyCode && (t.destroy(o.type, o.newid), "undefined" != typeof o.callback && o.callback());
            }, t.smoketimeout[o.newid] = setTimeout(function() {
                t.destroy(o.type, o.newid), "undefined" != typeof o.callback && o.callback();
            }, o.timeout);
        },
        destroy: function(e, i) {
            var o = n.getElementById("smoke-out-" + i);
            if ("quiz" !== e) var a = n.getElementById(e + "-ok-" + i);
            var d = n.getElementById(e + "-cancel-" + i);
            if (o.className = "smoke-base", a && (t.stoplistening(a, "click", function() {}), 
            n.onkeyup = null), "quiz" === e) for (var l = n.getElementsByClassName("quiz-button"), c = 0; c < l.length; c++) t.stoplistening(l[c], "click", function() {}), 
            n.onkeyup = null;
            d && t.stoplistening(d, "click", function() {}), t.i = 0, o.innerHTML = "";
        },
        alert: function(e, n, i) {
            "object" != typeof i && (i = !1);
            var o = t.newdialog();
            t.build(e, {
                type: "alert",
                callback: n,
                params: i,
                newid: o
            });
        },
        signal: function(e, n, i) {
            "object" != typeof i && (i = !1);
            var o = 5e3;
            "undefined" !== i.duration && (o = i.duration);
            var a = t.newdialog();
            t.build(e, {
                type: "signal",
                callback: n,
                timeout: o,
                params: i,
                newid: a
            });
        },
        confirm: function(e, n, i) {
            "object" != typeof i && (i = !1);
            var o = t.newdialog();
            t.build(e, {
                type: "confirm",
                callback: n,
                params: i,
                newid: o
            });
        },
        quiz: function(e, n, i) {
            "object" != typeof i && (i = !1);
            var o = t.newdialog();
            t.build(e, {
                type: "quiz",
                callback: n,
                params: i,
                newid: o
            });
        },
        prompt: function(e, n, i) {
            "object" != typeof i && (i = !1);
            var o = t.newdialog();
            return t.build(e, {
                type: "prompt",
                callback: n,
                params: i,
                newid: o
            });
        },
        listen: function(e, n, t) {
            return e.addEventListener ? e.addEventListener(n, t, !1) : !!e.attachEvent && e.attachEvent("on" + n, t);
        },
        stoplistening: function(e, n, t) {
            return e.removeEventListener ? e.removeEventListener(n, t, !1) : !!e.detachEvent && e.detachEvent("on" + n, t);
        }
    };
    t.init = !0, "undefined" != typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd ? define("smoke", [], function() {
        return t;
    }) : this.smoke = t;
}(window, document);
function validateEmail(e) {
    var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return t.test(e);
}

function zero_pad(e) {
    return zero = 2 - e.toString().length + 1, Array(+(zero > 0 && zero)).join("0") + e;
}

function format_time(e) {
    return isNaN(e) && (e = 0), zero_pad(parseInt(e / 60)) + ":" + zero_pad(parseInt(e % 60));
}

function urls_to_links(e) {
    return e.replace(url_to_links_rx, "$1<a target='_blank' href='$2'>$2</a>");
}

function get_query_param(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = new RegExp("[\\?&]" + e + "=([^&#]*)"), r = t.exec(location.search);
    return null == r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "));
}

function random_string(e) {
    for (var t = "", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!-_", a = 0; a < e; a++) t += r.charAt(Math.floor(Math.random() * r.length));
    return t;
}

function fixup_touches(e) {
    var t = e;
    return e.originalEvent && (t = e.originalEvent), e = {
        pageX: e.pageX,
        pageY: e.pageY,
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        clientX: e.clientX,
        clientY: e.clientY,
        layerX: e.layerX,
        layerY: e.layerY,
        target: e.target,
        currentTarget: e.currentTarget
    }, t.changedTouches && t.changedTouches.length ? (e.pageX = t.changedTouches[0].pageX, 
    e.pageY = t.changedTouches[0].pageY) : t.touches && t.touches.length && (e.pageX = t.touches[0].pageX, 
    e.pageY = t.touches[0].pageY), e;
}

function rgb_to_hex(e, t, r) {
    return ((1 << 24) + (parseInt(e) << 16) + (parseInt(t) << 8) + parseInt(r)).toString(16).slice(1);
}

function hex_to_rgba(e) {
    if (!e || "transparent" == e) return {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    };
    if (e.match("rgb\\(")) return e = e.replace("rgb(", "").replace(")", "").split(","), 
    {
        r: e[0],
        g: e[1],
        b: e[2],
        a: 255
    };
    if (e.match("rgba\\(")) return e = e.replace("rgba(", "").replace(")", "").split(","), 
    {
        r: e[0],
        g: e[1],
        b: e[2],
        a: 255 * e[3]
    };
    var t = parseInt(e.substr(1, 2), 16), r = parseInt(e.substr(3, 2), 16), a = parseInt(e.substr(5, 2), 16), n = 255;
    return e.length > 7 && (n = parseInt(e.substr(7, 2), 16)), {
        r: t,
        g: r,
        b: a,
        a: n
    };
}

function rgb_to_hsv() {
    var e, t, r, a, n, o = arguments[0] / 255, c = arguments[1] / 255, i = arguments[2] / 255, s = Math.max(o, c, i), l = s - Math.min(o, c, i), g = function(e) {
        return (s - e) / 6 / l + .5;
    };
    return 0 == l ? a = n = 0 : (n = l / s, e = g(o), t = g(c), r = g(i), o === s ? a = r - t : c === s ? a = 1 / 3 + e - r : i === s && (a = 2 / 3 + t - e), 
    a < 0 ? a += 1 : a > 1 && (a -= 1)), {
        h: a || 0,
        s: n || 0,
        v: s || 0
    };
}

function hsv_to_rgb(e, t, r) {
    var a, n, o, c, i, s, l, g;
    switch (e && void 0 === t && void 0 === r && (t = e.s, r = e.v, e = e.h), c = Math.floor(6 * e), 
    i = 6 * e - c, s = r * (1 - t), l = r * (1 - i * t), g = r * (1 - (1 - i) * t), 
    c % 6) {
      case 0:
        a = r, n = g, o = s;
        break;

      case 1:
        a = l, n = r, o = s;
        break;

      case 2:
        a = s, n = r, o = g;
        break;

      case 3:
        a = s, n = l, o = r;
        break;

      case 4:
        a = g, n = s, o = r;
        break;

      case 5:
        a = r, n = s, o = l;
    }
    return {
        r: Math.round(255 * a),
        g: Math.round(255 * n),
        b: Math.round(255 * o)
    };
}

function render_grid(e, t, r) {
    temp_grid_canvas.width = e, temp_grid_canvas.height = t;
    var a = e / r, n = temp_grid_canvas.getContext("2d");
    n.strokeStyle = "#f0f0f0", n.lineWidth = 1;
    for (var o = "rgba(60,60,60,0.125)", c = "rgba(60,60,60,0.075)", i = 0; i < t; i += a) 0 == i ? n.fillStyle = o : n.fillStyle = c, 
    n.fillRect(0, i, e, 1);
    for (var s = 0; s < t; s += a) 0 == s ? n.fillStyle = o : n.fillStyle = c, n.fillRect(s, 0, 1, t);
    var l = temp_grid_canvas.toDataURL();
    return l;
}

function focus_contenteditable(e, t) {
    if (range = document.createRange(), range && e) {
        var r = $(e).find("p");
        r.length && (r = r[r.length - 1], range.selectNodeContents(r), selection = window.getSelection(), 
        selection.removeAllRanges(), "Text" != range.toString() && range.collapse(!1), selection.addRange(range), 
        e.focus());
    }
}

function setup_exclusive_audio_video_playback() {
    document.addEventListener("play", function(e) {
        for (var t = [ "audio", "video" ], r = 0; r < t.length; r++) for (var a = t[r], n = document.getElementsByTagName(a), r = 0, o = n.length; r < o; r++) n[r] != e.target && n[r].pause();
    }, !0);
}

var url_to_links_rx = /(^|[\s\n]|>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;

temp_grid_canvas = document.createElement("canvas");
GrowingPacker = function() {}, GrowingPacker.prototype = {
    fit: function(o) {
        var t, i, h, r = o.length, n = r > 0 ? o[0].w : 0, s = r > 0 ? o[0].h : 0;
        for (this.root = {
            x: 0,
            y: 0,
            w: n,
            h: s
        }, t = 0; t < r; t++) h = o[t], (i = this.findNode(this.root, h.w, h.h)) ? h.fit = this.splitNode(i, h.w, h.h) : h.fit = this.growNode(h.w, h.h);
    },
    findNode: function(o, t, i) {
        return o.used ? this.findNode(o.right, t, i) || this.findNode(o.down, t, i) : t <= o.w && i <= o.h ? o : null;
    },
    splitNode: function(o, t, i) {
        return o.used = !0, o.down = {
            x: o.x,
            y: o.y + i,
            w: o.w,
            h: o.h - i
        }, o.right = {
            x: o.x + t,
            y: o.y,
            w: o.w - t,
            h: i
        }, o;
    },
    growNode: function(o, t) {
        var i = o <= this.root.w, h = t <= this.root.h, r = h && this.root.h >= this.root.w + o, n = i && this.root.w >= this.root.h + t;
        return r ? this.growRight(o, t) : n ? this.growDown(o, t) : h ? this.growRight(o, t) : i ? this.growDown(o, t) : null;
    },
    growRight: function(o, t) {
        return this.root = {
            used: !0,
            x: 0,
            y: 0,
            w: this.root.w + o,
            h: this.root.h,
            down: this.root,
            right: {
                x: this.root.w,
                y: 0,
                w: o,
                h: this.root.h
            }
        }, (node = this.findNode(this.root, o, t)) ? this.splitNode(node, o, t) : null;
    },
    growDown: function(o, t) {
        return this.root = {
            used: !0,
            x: 0,
            y: 0,
            w: this.root.w,
            h: this.root.h + t,
            down: {
                x: 0,
                y: this.root.h,
                w: this.root.w,
                h: t
            },
            right: this.root
        }, (node = this.findNode(this.root, o, t)) ? this.splitNode(node, o, t) : null;
    }
};
var SpacedeckRoutes = {
    internal_route: function(t, i) {
        this.router || (this.router = new RouteRecognizer(), this.router.add([ {
            path: "/spaces/:id",
            handler: function(t, i) {
                this.load_space(t.id, i);
            }.bind(this)
        } ]), this.router.add([ {
            path: "/confirm/:token",
            handler: function(t) {
                this.logged_in ? this.confirm_account(t.token) : this.redirect_to("/login");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/password-confirm/:token",
            handler: function(t) {
                console.log(t.token), this.logged_in ? this.redirect_to("/spaces") : (this.reset_token = t.token, 
                this.active_view = "password-confirm");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/password-reset",
            handler: function(t, i) {
                this.logged_in || (this.active_view = "password-reset");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/accept/:membership_id",
            handler: function(t, i) {
                if (this.logged_in) {
                    var e = get_query_param("code");
                    accept_invitation(t.membership_id, e, function(t) {
                        window._spacedeck_location_change = !0, location.href = "/spaces/" + t.space._id;
                    }.bind(this), function(t) {
                        smoke.alert("Error (" + t.status + ")", function() {
                            this.redirect_to("/spaces");
                        }.bind(this));
                    }.bind(this));
                } else this.redirect_to("/login");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/signup",
            handler: function(t) {
                var i = get_query_param("code");
                i && (this.invitation_token = i), this.logged_in ? this.redirect_to("/spaces") : this.active_view = "signup";
            }.bind(this)
        } ]), this.router.add([ {
            path: "/login",
            handler: function(t) {
                this.logged_in ? this.invitation_token ? accept_invitation(this.accept_invitation, function(t) {
                    window._spacedeck_location_change = !0, location.href = "spaces/" + t.space_id;
                }.bind(this), function(t) {
                    console.error(t);
                }) : this.redirect_to("/spaces") : (this.active_view = "login", token = get_query_param("code"), 
                token && this.login_with_token(token));
            }.bind(this)
        } ]), this.router.add([ {
            path: "/logout",
            handler: function(t) {
                this.logged_in ? this.logout(function(t) {
                    this.redirect_to("/login");
                }.bind(this), function(t) {
                    console.error(t);
                }) : this.redirect_to("/login");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/spaces",
            handler: function(t) {
                this.logged_in ? this.logged_in && this.user.home_folder_id ? this.load_space(this.user.home_folder_id) : location.href = "/" : (window._spacedeck_location_change = !0, 
                location.href = "/login");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/account",
            handler: function(t) {
                this.logged_in ? (this.active_view = "account", this.load_subscription()) : (window._spacedeck_location_change = !0, 
                location.href = "/");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/team",
            handler: function(t) {
                this.logged_in ? (this.active_view = "team", this.load_team()) : (window._spacedeck_location_change = !0, 
                location.href = "/");
            }.bind(this)
        } ]), this.router.add([ {
            path: "/folders/:id",
            handler: function(t) {
                this.load_space(t.id, null, function(t) {
                    console.log("couldn't load folder: " + t.status), this.redirect_to("/spaces", function() {});
                }.bind(this));
            }.bind(this)
        } ]), this.router.add([ {
            path: "/",
            handler: function(t) {
                location.href = "/";
            }.bind(this)
        } ]), this.router.add([ {
            path: "/terms",
            handler: function(t) {
                location.href = "/terms";
            }.bind(this)
        } ]), this.router.add([ {
            path: "/privacy",
            handler: function(t) {
                location.href = "/privacy";
            }.bind(this)
        } ]));
        var e = this.router.recognize(t);
        e ? e[0].handler(e[0].params, i) : location.href = "/not_found";
    },
    route: function() {
        if (window.onpopstate = function(t) {
            t.preventDefault(), this.internal_route(location.pathname);
        }.bind(this), $("body").on("click", "a", function(t) {
            t.currentTarget.hash && t.currentTarget.hash.length > 1 || (console.log("clicked", t.currentTarget.pathname), 
            t.currentTarget.host == location.host && (t.metaKey || t.ctrlKey || t.shiftKey || t.currentTarget.pathname.match(/^\/t\//) || (this.internal_route(t.currentTarget.pathname), 
            history.pushState(null, null, t.currentTarget.pathname), t.preventDefault())));
        }.bind(this)), location.host != ENV.webHost) {
            if (!subdomainTeam) return void (location.href = ENV.webEndpoint);
            if (!subdomainTeam.subdomain) return void (location.href = ENV.webEndpoint);
            var t = subdomainTeam.subdomain + "." + ENV.webHost;
            if (location.host != t) return void (location.href = t);
        }
        if (this.logged_in && this.user.team && this.user.team.subdomain && this.user.team.subdomain.length > 0) {
            var t = this.user.team.subdomain + "." + ENV.webHost;
            if (location.host != t) return void (location.href = location.protocol + "//" + t + location.pathname);
        }
        this.internal_route(location.pathname);
    },
    open_url: function(t) {
        window.open(t, "_blank");
    },
    redirect_to: function(t, i) {
        i ? (this.internal_route(t, i), history.pushState(null, null, t)) : (window._spacedeck_location_change = !0, 
        location.href = t);
    },
    link_to_parent_folder: function(t) {
        return "/folders/" + t;
    },
    link_to_space: function(t) {
        return "/" + t.space_type + "s/" + t._id;
    }
};
var SpacedeckFormatting = {
    apply_formatting: function(e, o, t, a) {
        console.log("apply_formatting: ", e, o);
        var n = _scribe_handle_for_object[e._id], c = n.getCommand(o);
        "createLink" == o && (t = prompt("Link URL?")), n.el.focus(), c.execute(t, a);
    }
};
var SpacedeckSections = {
    data: {
        MAX_COLUMNS: 20,
        redo_stack: [],
        undo_stack: [],
        opened_dialog: "none",
        color_options_picker: !1,
        advanced_properties: !1,
        embed_code_html: "",
        active_tool: "pointer",
        lightbox_artifact: {},
        snap_ruler_y: -1e3,
        snap_ruler_x: -1e3,
        minimap_width: 100,
        minimap_height: 200,
        minimap_scale: 10,
        scroll_left: 0,
        scroll_top: 0,
        window_width: 800,
        window_height: 600,
        bounds_margin_horiz: 0,
        bounds_margin_vert: 0,
        editing_artifact_id: null,
        selected_artifacts_dict: {},
        first_selected_artifact: null,
        selection_metrics: {
            contains_text: !1,
            contains_images: !1,
            contains_audio: !1,
            contains_vectors: !1,
            contains_shapes: !1,
            borders_stylable: !0,
            count: 0,
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            style: "display:none",
            vector_points: [ {}, {} ],
            vector_selection: !1
        },
        selected_artifacts_json: "",
        zones: [],
        user_cursors: [],
        default_style: {},
        active_style: {
            border_radius: 0,
            stroke: 0,
            font_family: "Avenir W01",
            font_size: 18,
            line_height: 1.5,
            letter_spacing: 0,
            stroke_color: "#000000",
            fill_color: "#00000000",
            text_color: "#000000",
            background_color: "#ffffff",
            padding: 0,
            padding_horz: 0,
            padding_vert: 0,
            padding_top: 0,
            padding_left: 0,
            padding_right: 0,
            padding_bottom: 0,
            margin: 0,
            margin_horz: 0,
            margin_vert: 0,
            margin_top: 0,
            margin_left: 0,
            margin_right: 0,
            margin_bottom: 0,
            brightness: 100,
            contrast: 100,
            opacity: 100,
            saturation: 100,
            blur: 0,
            hue: 0,
            columns: 1,
            column_width: 900,
            row_height: 0,
            gutter: 0
        },
        color_picker_target: "fill_color",
        color_picker_saturation: 255,
        color_picker_value: 255,
        color_picker_hue: 127,
        color_picker_opacity: 255,
        swatches: [ {
            id: 0,
            hex: "#4a2f7e"
        }, {
            id: 1,
            hex: "#9b59b6"
        }, {
            id: 2,
            hex: "#3498db"
        }, {
            id: 3,
            hex: "#2ecc71"
        }, {
            id: 4,
            hex: "#f1c40f"
        }, {
            id: 5,
            hex: "#e67e22"
        }, {
            id: 6,
            hex: "#d55c4b"
        }, {
            id: 7,
            hex: "#6f4021"
        }, {
            id: 8,
            hex: "#ffffff"
        }, {
            id: 9,
            hex: "#95a5a6"
        }, {
            id: 10,
            hex: "#252525"
        }, {
            id: 11,
            hex: "rgba(0,0,0,0)"
        } ],
        swatches_text: [ {
            id: 1,
            hex: "#9b59b6"
        }, {
            id: 2,
            hex: "#3498db"
        }, {
            id: 3,
            hex: "#2ecc71"
        }, {
            id: 4,
            hex: "#f1c40f"
        }, {
            id: 5,
            hex: "#e67e22"
        }, {
            id: 6,
            hex: "#d55c4b"
        }, {
            id: 8,
            hex: "#ffffff"
        }, {
            id: 10,
            hex: "#252525"
        } ],
        fonts: [ "Arial", "Courier", "Georgia", "Verdana", "Comic Sans MS", "Montserrat", "Lato", "Roboto", "Crimson Text", "EB Garamond", "Vollkorn", "Avenir W01" ],
        detected_text_formats: {},
        active_text_format_name: "Paragraph",
        image_search_results: [],
        video_search_results: [],
        audio_search_results: [],
        generic_search_query: "",
        media_search_target: "google",
        search_loading: !1,
        viewport_zoom: 1,
        viewport_zoom_percent: 100,
        bounds_zoom: 1,
        current_zone_idx: -1,
        margin_mode: "global",
        padding_mode: "global",
        delete_artifact: "unconfirmed",
        color_mode: "palette",
        background_mode: "image",
        layout_mode: "layout",
        follow_mode: !0,
        space_background_uploading: !1,
        toolbar_props_x: 0,
        toolbar_props_y: 0,
        toolbar_props_in: !1,
        toolbar_artifacts_x: "-1000px",
        toolbar_artifacts_y: "-1000px",
        toolbar_artifacts_in: !1
    },
    methods: {
        setup_section_module: function() {
            this.default_style = _.clone(this.active_style), Mousetrap.bind("del", function(t) {
                this.if_editable(function() {
                    this.delete_selected_artifacts(t);
                });
            }.bind(this)), Mousetrap.bind("backspace", function(t) {
                this.if_editable(function() {
                    this.delete_selected_artifacts(t);
                });
            }.bind(this)), Mousetrap.bind([ "command+d", "ctrl+d" ], function(t) {
                t.preventDefault(), t.stopPropagation(), this.if_editable(function() {
                    this.duplicate_selected_artifacts();
                });
            }.bind(this)), Mousetrap.bind([ "command+z", "ctrl+z" ], function(t) {
                this.if_editable(function() {
                    this.undo();
                });
            }.bind(this)), Mousetrap.bind([ "command+shift+z", "ctrl+shift+z" ], function(t) {
                this.if_editable(function() {
                    this.redo();
                });
            }.bind(this)), Mousetrap.bind([ "command+a", "ctrl+a" ], function(t) {
                this.if_editable(function() {
                    this.select_all_artifacts();
                });
            }.bind(this)), Mousetrap.bind([ "command+e", "ctrl+e" ], function(t) {
                this.if_editable(function() {
                    this.toggle_full_width();
                });
            }.bind(this)), Mousetrap.bind([ "command+=", "ctrl+=" ], function(t) {
                t.preventDefault(), t.stopPropagation(), this.zoom_in();
            }.bind(this)), Mousetrap.bind([ "command+-", "ctrl+-" ], function(t) {
                t.preventDefault(), t.stopPropagation(), this.zoom_out();
            }.bind(this)), Mousetrap.bind("+", function(t) {
                t.preventDefault(), t.stopPropagation(), this.zoom_in();
            }.bind(this)), Mousetrap.bind("-", function(t) {
                t.preventDefault(), t.stopPropagation(), this.zoom_out();
            }.bind(this)), Mousetrap.bind("up", function(t) {
                this.nudge_selected_artifacts(0, -1, t);
            }.bind(this)), Mousetrap.bind("down", function(t) {
                this.nudge_selected_artifacts(0, 1, t);
            }.bind(this)), Mousetrap.bind("left", function(t) {
                this.nudge_selected_artifacts(-1, 0, t);
            }.bind(this)), Mousetrap.bind("right", function(t) {
                this.nudge_selected_artifacts(1, 0, t);
            }.bind(this)), Mousetrap.bind("shift+up", function(t) {
                this.if_editable(function() {
                    this.nudge_selected_artifacts(0, -10, t);
                });
            }.bind(this)), Mousetrap.bind("shift+down", function(t) {
                this.if_editable(function() {
                    this.nudge_selected_artifacts(0, 10, t);
                });
            }.bind(this)), Mousetrap.bind("shift+left", function(t) {
                this.if_editable(function() {
                    this.nudge_selected_artifacts(-10, 0, t);
                });
            }.bind(this)), Mousetrap.bind("shift+right", function(t) {
                this.if_editable(function() {
                    this.nudge_selected_artifacts(10, 0, t);
                });
            }.bind(this)), Mousetrap.bind("space", function(t) {
                this.activate_pan_tool(t);
            }.bind(this)), $(document).bind("beforecopy", this.handle_onbeforecopy.bind(this)), 
            $(window).bind("beforeunload", this.handle_onunload.bind(this)), $(window).bind("resize", this.handle_window_resize.bind(this));
        },
        setup_watches: function() {
            this.$watch("active_style.stroke", function(t, i) {
                this.set_artifact_style_prop("stroke", parseInt(this.active_style.stroke));
            }.bind(this)), this.$watch("active_style.border_radius", function(t, i) {
                this.set_artifact_style_prop("border_radius", parseInt(this.active_style.border_radius));
            }.bind(this)), this.$watch("active_style.padding", function(t, i) {
                this.active_style.padding_horz = this.active_style.padding, this.active_style.padding_vert = this.active_style.padding;
            }.bind(this)), this.$watch("active_style.padding_horz", function(t, i) {
                this.active_style.padding_left = this.active_style.padding_horz, this.active_style.padding_right = this.active_style.padding_horz;
            }.bind(this)), this.$watch("active_style.padding_vert", function(t, i) {
                this.active_style.padding_top = this.active_style.padding_vert, this.active_style.padding_bottom = this.active_style.padding_vert;
            }.bind(this)), this.$watch("active_style.padding_top", function(t, i) {
                this.set_artifact_style_prop("padding_top", parseInt(this.active_style.padding_top));
            }.bind(this)), this.$watch("active_style.padding_bottom", function(t, i) {
                this.set_artifact_style_prop("padding_bottom", parseInt(this.active_style.padding_bottom));
            }.bind(this)), this.$watch("active_style.padding_left", function(t, i) {
                this.set_artifact_style_prop("padding_left", parseInt(this.active_style.padding_left));
            }.bind(this)), this.$watch("active_style.padding_right", function(t, i) {
                this.set_artifact_style_prop("padding_right", parseInt(this.active_style.padding_right));
            }.bind(this)), this.$watch("active_style.margin", function(t, i) {
                this.active_style.margin_horz = this.active_style.margin, this.active_style.margin_vert = this.active_style.margin;
            }.bind(this)), this.$watch("active_style.margin_horz", function(t, i) {
                this.active_style.margin_left = this.active_style.margin_horz, this.active_style.margin_right = this.active_style.margin_horz;
            }.bind(this)), this.$watch("active_style.margin_vert", function(t, i) {
                this.active_style.margin_top = this.active_style.margin_vert, this.active_style.margin_bottom = this.active_style.margin_vert;
            }.bind(this)), this.$watch("active_style.margin_top", function(t, i) {
                this.set_artifact_style_prop("margin_top", parseInt(this.active_style.margin_top));
            }.bind(this)), this.$watch("active_style.margin_bottom", function(t, i) {
                this.set_artifact_style_prop("margin_bottom", parseInt(this.active_style.margin_bottom));
            }.bind(this)), this.$watch("active_style.margin_left", function(t, i) {
                this.set_artifact_style_prop("margin_left", parseInt(this.active_style.margin_left));
            }.bind(this)), this.$watch("active_style.margin_right", function(t, i) {
                this.set_artifact_style_prop("margin_right", parseInt(this.active_style.margin_right));
            }.bind(this)), this.$watch("active_style.stroke_color", function(t, i) {
                this.set_artifact_style_prop("stroke_color", this.active_style.stroke_color);
                var e = hex_to_rgba(this.active_style.stroke_color), a = rgb_to_hsv(e.r, e.g, e.b);
                this.active_style.stroke_color_hsv = a;
            }.bind(this)), this.$watch("active_style.fill_color", function(t, i) {
                this.set_artifact_style_prop("fill_color", this.active_style.fill_color);
                var e = hex_to_rgba(this.active_style.fill_color), a = rgb_to_hsv(e.r, e.g, e.b);
                this.active_style.fill_color_hsv = a;
            }.bind(this)), this.$watch("active_style.text_color", function(t, i) {
                this.set_artifact_style_prop("text_color", this.active_style.text_color), this.apply_formatting(null, "forecolor", this.active_style.text_color);
                var e = hex_to_rgba(this.active_style.text_color), a = rgb_to_hsv(e.r, e.g, e.b);
                this.active_style.text_color_hsv = a;
            }.bind(this)), this.$watch("active_style.font_size", function(t, i) {
                this.apply_formatting(null, "preciseFontSize", this.active_style.font_size + "px");
            }.bind(this)), this.$watch("active_style.line_height", function(t, i) {
                this.apply_formatting(null, "lineHeight", this.active_style.line_height + "em");
            }.bind(this)), this.$watch("active_style.letter_spacing", function(t, i) {
                this.apply_formatting(null, "letterSpacing", this.active_style.letter_spacing + "px");
            }.bind(this)), this.$watch("color_picker_hue", function(t, i) {
                this.apply_color_picker();
            }.bind(this)), this.$watch("color_picker_value", function(t, i) {
                this.apply_color_picker();
            }.bind(this)), this.$watch("color_picker_saturation", function(t, i) {
                this.apply_color_picker();
            }.bind(this)), this.$watch("color_picker_opacity", function(t, i) {
                this.apply_color_picker();
            }.bind(this)), this.$watch("active_style.brightness", function(t, i) {
                this.set_artifact_style_prop("brightness", parseInt(this.active_style.brightness));
            }.bind(this)), this.$watch("active_style.blur", function(t, i) {
                this.set_artifact_style_prop("blur", parseInt(this.active_style.blur));
            }.bind(this)), this.$watch("active_style.contrast", function(t, i) {
                this.set_artifact_style_prop("contrast", parseInt(this.active_style.contrast));
            }.bind(this)), this.$watch("active_style.saturation", function(t, i) {
                this.set_artifact_style_prop("saturation", parseInt(this.active_style.saturation));
            }.bind(this)), this.$watch("active_style.hue", function(t, i) {
                this.set_artifact_style_prop("hue", parseInt(this.active_style.hue));
            }.bind(this)), this.$watch("active_style.opacity", function(t, i) {
                this.set_artifact_style_prop("opacity", parseInt(this.active_style.opacity));
            }.bind(this)), this.throttled_save_active_space = _.throttle(function() {
                save_space(this.active_space);
            }.bind(this), 2e3), this.$watch("active_style.background_color", function(t, i) {
                this.active_style.background_color != this.active_space.advanced.background_color && (this.$set("active_space.advanced.background_color", this.active_style.background_color), 
                this.throttled_save_active_space());
                var e = hex_to_rgba(this.active_style.background_color), a = rgb_to_hsv(e.r, e.g, e.b);
                this.active_style.background_color_hsv = a;
            }.bind(this));
        },
        if_editable: function(t) {
            "viewer" != this.active_space_role && t.bind(this)();
        },
        background_image_style: function(t) {
            if (!t) return null;
            isNaN(t.length) && (t = [ t ]);
            for (var i = 0; i < t.length; i++) if (t[i] && t[i].length > 0) return "background-image: url(" + t[i] + ")";
        },
        space_thumbnail_style: function(t) {
            return t.avatar_thumb_uri && t.avatar_thumb_uri.length > 0 ? "background-image:url('" + t.avatar_thumb_uri + "')" : "folder" == t.space_type ? "" : "background-image:url('/api/spaces/" + t._id + "/png')";
        },
        reset_artifact_filters: function() {
            this.active_style.brightness = this.default_style.brightness, this.active_style.contrast = this.default_style.contrast, 
            this.active_style.opacity = this.default_style.opacity, this.active_style.saturation = this.default_style.saturation, 
            this.active_style.blur = this.default_style.blur, this.active_style.hue = this.default_style.hue;
        },
        increase_columns: function() {
            this.active_style.columns < this.MAX_COLUMNS && this.active_style.columns++;
        },
        decrease_columns: function() {
            this.active_style.columns > 1 && this.active_style.columns--;
        },
        extract_properties_from_selection: function() {
            this.skip_formatting = !0;
            var t = this.selected_artifacts();
            if (window.setTimeout(function() {
                this.skip_formatting = !1;
            }.bind(this), 10), t.length) {
                if (1 == t.length) {
                    for (var i = t[0], e = [ "stroke", "border_radius", "letter_spacing", "stroke_color", "fill_color", "text_color" ], a = 0; a < e.length; a++) {
                        var s = e[a];
                        this.active_style[s] = i.style[s];
                    }
                    this.active_style.font_size = this.default_style.font_size, this.active_style.line_height = this.default_style.line_height, 
                    this.active_style.letter_spacing = this.default_style.letter_spacing, this.active_style.padding_top = i.style.padding_top || 0, 
                    this.active_style.padding_bottom = i.style.padding_bottom || 0, this.active_style.padding_left = i.style.padding_left || 0, 
                    this.active_style.padding_right = i.style.padding_right || 0, this.active_style.padding_top == this.active_style.padding_bottom && (this.active_style.padding_vert = this.active_style.padding_top), 
                    this.active_style.padding_left == this.active_style.padding_right && (this.active_style.padding_horz = this.active_style.padding_left), 
                    this.active_style.padding_top == this.active_style.padding_bottom && this.active_style.padding_left == this.active_style.padding_right && this.active_style.padding_left == this.active_style.padding_top && (this.active_style.padding = this.active_style.padding_top), 
                    this.active_style.margin_top = i.style.margin_top || 0, this.active_style.margin_bottom = i.style.margin_bottom || 0, 
                    this.active_style.margin_left = i.style.margin_left || 0, this.active_style.margin_right = i.style.margin_right || 0, 
                    this.active_style.margin_top == this.active_style.margin_bottom && (this.active_style.margin_vert = this.active_style.margin_top), 
                    this.active_style.margin_left == this.active_style.margin_right && (this.active_style.margin_horz = this.active_style.margin_left), 
                    this.active_style.margin_top == this.active_style.margin_bottom && this.active_style.margin_left == this.active_style.margin_right && this.active_style.margin_left == this.active_style.margin_top && (this.active_style.margin = this.active_style.margin_top);
                }
                this.update_selection_metrics(), this.selection_metrics.contains_text = !1, this.selection_metrics.contains_images = !1, 
                this.selection_metrics.contains_audio = !1, this.selection_metrics.contains_embeds = !1, 
                this.selection_metrics.contains_vectors = !1, this.selection_metrics.contains_shapes = !1, 
                this.selection_metrics.borders_stylable = !1;
                var o = _.filter(t, function(t) {
                    return "text/html" == t.mime || "x-spacedeck/shape" == t.mime;
                });
                if (o.length >= 1 && (this.selection_metrics.contains_text = !0, 1 == o.length)) {
                    var i = o[0], n = $("<div>" + i.description + "</div>")[0], r = n.firstChild;
                    do r && r.style && (r.style.fontSize && (this.active_style.font_size = parseInt(r.style.fontSize)), 
                    r.style.fontFamily && (this.active_style.font_family = r.style.fontFamily), r.style.letterSpacing && (this.active_style.letter_spacing = parseInt(r.style.letterSpacing)), 
                    r.style.lineHeight && (this.active_style.line_height = parseFloat(r.style.lineHeight)), 
                    r.style.color && (this.active_style.text_color = r.style.color)); while (r && (r = n.nextSibling));
                }
                1 == t.length && this.extract_color_picker_from_selection();
                var c = _.filter(t, function(t) {
                    return t.mime.match("image");
                });
                c.length >= 1 && (this.selection_metrics.contains_images = !0);
                var l = _.filter(t, function(t) {
                    return t.mime.match("audio");
                });
                l.length >= 1 && (this.selection_metrics.contains_audio = !0);
                var h = _.filter(t, function(t) {
                    return t.mime.match("embed");
                });
                h.length >= 1 && (this.selection_metrics.contains_embeds = !0);
                var h = _.filter(t, function(t) {
                    return "x-spacedeck/vector" == t.mime;
                });
                h.length >= 1 && (this.selection_metrics.contains_vectors = !0);
                var h = _.filter(t, function(t) {
                    return "x-spacedeck/shape" == t.mime;
                });
                h.length >= 1 && (this.selection_metrics.contains_shapes = !0);
                var d = this.selection_metrics;
                this.selection_metrics.borders_stylable = !(d.contains_vectors || d.contains_shapes);
            }
        },
        increase_letter_spacing: function(t) {
            this.active_style.letter_spacing++;
        },
        decrease_letter_spacing: function(t) {
            this.active_style.letter_spacing--;
        },
        apply_font: function(t, i) {
            this.apply_formatting(t, "fontName", i), this.active_style.font_family = i;
        },
        toggle_advanced_properties: function() {
            this.advanced_properties = !this.advanced_properties;
        },
        open_dialog: function(t, i) {
            return i && (i.stopPropagation(), i.preventDefault()), this.active_tool = "pointer", 
            this.opened_dialog == t ? void (this.opened_dialog = "none") : (_.contains([ "mobile", "shapes", "zones" ], t) && this.deselect(), 
            this.opened_dialog = t, (t.match("color") || t.match("background")) && (this.color_picker_target = t.replace("color-", "") + "_color", 
            this.color_mode = "palette", this.extract_color_picker_from_selection()), _.contains([ "audio", "video", "image", "search" ], t) && $("#" + t + " input")[0] && $("#" + t + " input")[0].focus(), 
            "background" == this.opened_dialog && (this.color_picker_target = "background_color", 
            this.background_mode = "color"), void ("info" == this.opened_dialog && (this.access_settings_space = this.active_space, 
            this.access_settings_memberships = this.active_space_memberships, this.editors_section = "list", 
            this.active_space_is_readonly || this.embedded ? this.space_info_section = "info" : "admin" == this.active_space_role && (this.space_info_section = "access"))));
        },
        toggle_color_options: function() {
            this.color_options_picker = !this.color_options_picker;
        },
        close_lightbox: function() {
            this.lightbox_artifact = {}, this.close_modal();
        },
        prepare_clipboard: function() {
            "ontouchstart" in window || (this.selected_artifacts_json = JSON.stringify(this.selected_artifacts()), 
            this.prepare_clipboard_step2());
        },
        prepare_clipboard_step2: function() {
            "ontouchstart" in window || setTimeout(function() {
                $("#space-clipboard > textarea").length && ($("#space-clipboard > textarea")[0].focus(), 
                $("#space-clipboard > textarea")[0].select());
            }, 100);
        },
        handle_section_keydown: function(t) {
            return 67 == t.keyCode && (t.ctrlKey || t.metaKey) && (this.prepare_clipboard(), 
            this.prepare_clipboard_step2()), !0;
        },
        handle_onbeforecopy: function(t) {
            if (!this.editing_artifact_id) {
                var i = t.target.nodeName.toLowerCase();
                "body" == i && (this.prepare_clipboard_step2(), window.setTimeout(function() {
                    $("#space-clipboard > textarea").length && $("#space-clipboard > textarea")[0].blur();
                }, 10));
            }
        },
        handle_onunload: function(t) {
            if (window.artifact_save_queue) {
                var i = Object.keys(window.artifact_save_queue).length;
                if (i > 0) {
                    var e = "There are " + i + " changes that are still being saved. Discard them?";
                    return t.returnValue = e, e;
                }
                window._spacedeck_location_change = !0;
            }
        },
        handle_window_resize: function(t) {
            this.adjust_bounds_zoom();
        },
        handle_scroll: function(t) {
            "space" == this.active_view && $("#space").length && (el = $("#space")[0], this.scroll_left = el.scrollLeft / this.viewport_zoom, 
            this.scroll_top = el.scrollTop / this.viewport_zoom, this.window_width = window.innerWidth / this.viewport_zoom, 
            this.window_height = window.innerHeight / this.viewport_zoom, this.resize_minimap(), 
            this.logged_in && this.present_mode && "viewer" != this.active_space_role && this.presenter_send_viewport());
        },
        presenter_send_viewport: function() {
            name = this.user.nickname || this.user.email;
            var t = {
                action: "viewport",
                x: this.scroll_left,
                y: this.scroll_top,
                w: this.window_width,
                h: this.window_height,
                zoom: this.viewport_zoom,
                name: name,
                id: this.user._id
            }, i = JSON.stringify(t);
            i != this._old_viewport_msg && (this._old_viewport_msg = i, this.present_mode && "viewer" != this.active_space_role && this.websocket_send(t));
        },
        presenter_send_media_action: function(t, i, e, a) {
            name = this.user.nickname || this.user.email;
            var s = {
                action: "media",
                artifact_id: t,
                type: i,
                command: e,
                time: a,
                name: name,
                id: this.user._id
            };
            this.present_mode && "viewer" != this.active_space_role && this.websocket_send(s);
        },
        resize_minimap: function() {
            this.active_space && this.active_space.advanced && (this.minimap_scale = this.active_space.advanced.width / 100);
        },
        handle_minimap_mouseup: function(t) {
            this.minimap_mouse_state = "idle";
        },
        handle_minimap_mousemove: function(t) {
            "pressed" == this.minimap_mouse_state && this.handle_minimap_mousedown(t);
        },
        handle_minimap_mousedown: function(t) {
            if ($("#space").length) {
                this.minimap_mouse_state = "pressed", el = $("#space")[0], t = fixup_touches(t);
                var i = $(t.target).offset(), e = t.pageX - i.left, a = t.pageY - i.top;
                el.scrollLeft = (e - this.window_width / (2 * this.minimap_scale)) * this.minimap_scale * this.viewport_zoom, 
                el.scrollTop = (a - this.window_height / (2 * this.minimap_scale)) * this.minimap_scale * this.viewport_zoom, 
                this.handle_scroll();
            }
        },
        handle_user_cursor_update: function(t) {
            var i = new Date().getTime();
            t.t = i;
            for (var e = !1, a = 0; a < this.user_cursors.length; a++) {
                var s = this.user_cursors[a];
                s.id == t.id ? (s.x = t.x, s.y = t.y, s.t = i, s.name = t.name, e = !0) : i - s.t > 5e3 && (s.x = -1e4);
            }
            e || this.user_cursors.push(_.clone(t));
        },
        handle_presenter_viewport_update: function(t) {
            this.zoom_to_rect({
                x1: t.x,
                y1: t.y,
                x2: t.x + t.w,
                y2: t.y + t.h
            });
        },
        handle_presenter_media_update: function(t) {
            if (this.follow_mode) {
                if ("audio" == t.type) {
                    var i = "#artifact-" + t.artifact_id + " .audio";
                    try {
                        $(i)[0].dispatchEvent(new Event("remote_" + t.command)), console.log("event dispatched");
                    } catch (e) {}
                }
                if ("video" == t.type) {
                    var i = "#artifact-" + t.artifact_id + " .video";
                    try {
                        $(i)[0].dispatchEvent(new Event("remote_" + t.command)), console.log("event dispatched");
                    } catch (e) {}
                }
            } else console.log("ignore media update, muted");
        },
        may_select: function(t) {
            return !!t && (!!this.active_space && (!("viewer" == this.active_space_role || t.locked && "admin" != this.active_space_role) && !(this.active_space.editors_locking && !this.logged_in && this.guest_nickname != t.editor_name)));
        },
        select: function(t, i) {
            this.may_select(i) && (t && !t.shiftKey && this.is_selected(i) || (t && t.shiftKey || this.deselect(), 
            t && t.shiftKey && this.selected_artifacts_dict[i._id] ? delete this.selected_artifacts_dict[i._id] : this.selected_artifacts_dict[i._id] = !0, 
            this.update_board_artifact_viewmodel(i), this.extract_properties_from_selection(), 
            this.update_selection_metrics(), this.prepare_clipboard(), this.show_toolbar_props()));
        },
        select_all_artifacts: function(t) {
            this.deselect();
            for (var i = 0; i < this.active_space_artifacts.length; i++) {
                var e = this.active_space_artifacts[i];
                this.may_select(e) && (this.selected_artifacts_dict[e._id] = !0, this.update_board_artifact_viewmodel(e));
            }
            this.update_selection_metrics(), this.extract_properties_from_selection(), this.prepare_clipboard(), 
            this.show_toolbar_props();
        },
        multi_select: function(t) {
            for (var i = 0; i < t.length; i++) {
                var e = t[i];
                this.may_select(e) && (this.selected_artifacts_dict[e._id] = !0, this.update_board_artifact_viewmodel(e));
            }
            this.extract_properties_from_selection(), this.update_selection_metrics(), this.prepare_clipboard(), 
            this.show_toolbar_props();
        },
        discover_zones: function() {
            this.zones = _.sortBy(_.filter(this.active_space_artifacts, function(t) {
                return "x-spacedeck/zone" == t.mime;
            }), function(t) {
                return t.style.order;
            });
        },
        artifact_plaintext: function(t) {
            if (!t) return "";
            var i = $("<div>" + t.description + "</div>").text();
            return i || "";
        },
        deselect: function(t) {
            if (window._sd_fader_moving) return void (window._sd_fader_moving = !1);
            this.hide_toolbar_props(), document.getSelection().removeAllRanges(), blur(), this.prepare_clipboard_step2(), 
            this.discover_zones();
            var i = this.selected_artifacts();
            this.selected_artifacts_dict = {};
            for (var e = 0; e < i.length; e++) {
                var a = i[e], s = !0;
                if (a && "text/html" == a.mime) {
                    var o = this.artifact_plaintext(a);
                    0 == o.length && (s = !0);
                }
                s || (this.selected_artifacts_dict[a._id] = a);
            }
            this.delete_selected_artifacts(null, !0), this.selected_artifacts_dict = {}, this.editing_artifact_id = null, 
            this.opened_dialog = "none";
            for (var e = 0; e < i.length; e++) this.update_board_artifact_viewmodel(i[e]);
            this.selection_metrics.contains_text = !1, this.selection_metrics.count = 0, t && (this.active_tool = "pointer", 
            this.mouse_state = "idle"), this.update_selection_metrics();
        },
        is_selected: function(t) {
            if (t) return !!this.selected_artifacts_dict[t._id];
        },
        unselected_artifacts: function() {
            return this.active_space_artifacts.filter(function(t) {
                return !this.is_selected(t);
            }.bind(this));
        },
        selection_rect_style: function() {
            var t = this.selection_rect();
            return null == t ? "display:none" : "left:" + t.x1 + "px;top:" + t.y1 + "px;width:" + (t.x2 - t.x1) + "px;height:" + (t.y2 - t.y1) + "px;";
        },
        selection_rect: function() {
            return this.enclosing_rect(this.selected_artifacts());
        },
        enclosing_rect: function(t) {
            return 0 == t.length ? null : (t = _.filter(t), {
                x1: parseInt(_.min(t.map(function(t) {
                    return t.board && t.board.x ? t.board.x : 0;
                }))),
                y1: parseInt(_.min(t.map(function(t) {
                    return t.board && t.board.y ? t.board.y : 0;
                }))),
                x2: parseInt(_.max(t.map(function(t) {
                    return t.board ? t.board.x + t.board.w : 0;
                }))),
                y2: parseInt(_.max(t.map(function(t) {
                    return t.board ? t.board.y + t.board.h : 0;
                })))
            });
        },
        update_selection_metrics: function(t) {
            if ("scribble" == this.active_tool) return void (this.selection_metrics.count = 1);
            var i = this.selection_rect() || {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                style: "display:none"
            };
            if (i.x1 || i.x2) {
                i.w = i.x2 - i.x1, i.h = i.y2 - i.y1, i.style = this.selection_rect_style();
                var e = this.space_point_to_window(i.x1 + i.w / 2, i.y2), a = this.space_point_to_window(i.x1 + i.w / 2, i.y1);
                e.x -= 260, e.y -= 10, e.y >= window.innerHeight - 300 && (e.y = a.y - 100), e.x < 0 && (e.x = 0), 
                e.y < 0 && (e.y = 0), this.toolbar_props_x = e.x + "px", this.toolbar_props_y = e.y + "px", 
                this.hide_toolbar_artifacts();
            }
            this.selection_metrics.x1 = i.x1, this.selection_metrics.x2 = i.x2, this.selection_metrics.y1 = i.y1, 
            this.selection_metrics.y2 = i.y2, this.selection_metrics.x = i.x, this.selection_metrics.y = i.y, 
            this.selection_metrics.w = i.w, this.selection_metrics.h = i.h, this.selection_metrics.style = i.style, 
            t || (t = this.selected_artifacts()), this.first_selected_artifact = t[0], this.selection_metrics.count = t.length, 
            this.selection_metrics.scribble_selection = !1, 1 == t.length && "x-spacedeck/vector" == t[0].mime ? ("scribble" == t[0].style.shape && (this.selection_metrics.scribble_selection = !0), 
            this.selection_metrics.vector_points = t[0].control_points, this.selection_metrics.vector_selection = !0) : (this.selection_metrics.vector_points = [ {}, {} ], 
            this.selection_metrics.vector_selection = !1), this.selection_metrics.has_link = !1, 
            this.insert_link_url = "", 1 == t.length && t[0].meta && t[0].meta.link_uri && t[0].meta.link_uri.length > 0 && (this.selection_metrics.has_link = !0, 
            this.insert_link_url = t[0].meta.link_uri);
        },
        begin_transaction: function() {
            this.transaction_running = !0, this.undo_stack.length && "empty" == this.undo_stack[this.undo_stack.length - 1].action || this.undo_stack.push({
                action: "empty"
            }), this.redo_stack = [], this.artifacts_before_transaction = this.active_space_artifacts.map(function(t) {
                return _.cloneDeep(t);
            });
        },
        fixup_space_size: function() {
            this.active_space && (this.active_space.advanced.width = Math.max(this.active_space.advanced.width, window.innerWidth), 
            this.active_space.advanced.height = Math.max(this.active_space.advanced.height, window.innerHeight));
        },
        end_transaction: function() {
            if (this.transaction_running = !1, this.throttled_process_artifact_save_queue(), 
            this.active_space) {
                var t = this.enclosing_rect(this.active_space_artifacts);
                t && (this.active_space.advanced.width = Math.max(t.x2 + 100, window.innerWidth), 
                this.active_space.advanced.height = Math.max(t.y2 + 100, window.innerHeight), this._last_bounds_width == this.active_space.advanced.width && this._last_bounds_height == this.active_space.advanced.height || (this._last_bounds_width = this.active_space.advanced.width, 
                this._last_bounds_height = this.active_space.advanced.height, save_space(this.active_space)), 
                this.resize_minimap(), this.discover_zones());
            }
        },
        find_artifact_before_transaction: function(t) {
            return this.find_artifact_in_array(this.artifacts_before_transaction, t);
        },
        find_artifact_in_array: function(t, i) {
            var e = _.find(t, function(t) {
                return i._id && t._id == i._id;
            });
            return e;
        },
        unsaved_transactions: function() {
            return window.artifact_save_queue ? Object.keys(window.artifact_save_queue).length : 0;
        },
        process_artifact_save_queue: function() {
            if (window.artifact_save_queue) {
                if (this.transaction_running) return void console.log("not saving, transaction still in progress.");
                for (var t = Object.keys(window.artifact_save_queue), i = 0; i < t.length; i++) {
                    var e = t[i], a = window.artifact_save_queue[e];
                    this.guest_nickname && (a.editor_name = this.guest_nickname), save_artifact(a, function() {
                        delete window.artifact_save_queue[e];
                    }.bind(this), function(t) {
                        t && 404 == t.status ? delete window.artifact_save_queue[e] : console.log("could not save artifact, will try again:", a, t);
                    });
                }
                this.active_space && (this.active_space.updated_at = new Date().getTime());
            }
        },
        throttled_process_artifact_save_queue: function() {
            this._throttled_process_artifact_save_queue || (this._throttled_process_artifact_save_queue = _.throttle(this.process_artifact_save_queue, 500)), 
            this._throttled_process_artifact_save_queue();
        },
        queue_artifact_for_save: function(t) {
            window.artifact_save_queue || (window.artifact_save_queue = {}), t._id || console.log("warning: illegal artifact queued for save"), 
            t.view && t.view.vector_svg && (t.style.shape_svg = t.view.vector_svg), window.artifact_save_queue[t._id] = t;
        },
        update_properties: function(t, i) {
            for (var e = 0; e < t.length; e++) {
                var a = t[e], s = this.find_artifact_by_id(a);
                if (s) {
                    var o = !1;
                    for (k in i[e]) s[k] = i[e][k], o = !0;
                    this.update_board_artifact_viewmodel(s), o && this.queue_artifact_for_save(s);
                }
            }
        },
        update_artifacts: function(t, i) {
            for (var e = [], a = [], s = 0; s < t.length; s++) {
                var o = t[s], n = i(o);
                n && (e.push(o._id), a.push(n));
            }
            a.length && this.push_to_undo({
                action: "update",
                artifact_ids: e,
                changes: a,
                snapshot: this.artifacts_before_transaction
            }), a.length && this.update_properties(e, a);
        },
        push_to_undo: function(t) {
            this.undo_stack[this.undo_stack.length - 1] = t;
        },
        undo: function() {
            if (!this.undo_stack.length || "empty" == this.undo_stack[this.undo_stack.length - 1].action) return void console.log("nothing to undo!");
            var t = this.undo_stack.pop();
            console.log("undo popped: ", t), this.redo_stack.push(t);
            for (var i = 0; i < t.artifact_ids.length; i++) {
                var e = t.artifact_ids[i], a = this.find_artifact_in_array(t.snapshot, {
                    _id: e
                });
                "update" == t.action ? a && this.update_properties([ e ], [ a ]) : (delete a._id, 
                save_artifact(a, function(t) {
                    this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t);
                }.bind(this)));
            }
            this.update_selection_metrics();
        },
        redo: function() {
            if (!this.redo_stack.length) return void console.log("nothing to redo!");
            var t = this.redo_stack.pop();
            console.log("redo popped: ", t), this.undo_stack.push(t), this.update_properties(t.artifact_ids, t.changes), 
            this.update_selection_metrics();
        },
        set_artifact_prop: function(t, i) {
            this.begin_transaction(), this.update_selected_artifacts(function(e) {
                var a = {};
                return a[t] != i ? (a[t] = i, a) : null;
            });
        },
        set_artifact_style_prop: function(t, i) {
            this.begin_transaction(), this.update_selected_artifacts(function(e) {
                var a = {
                    style: e.style || {}
                };
                return a.style[t] != i ? (a.style[t] = i, a) : null;
            });
        },
        activate_color_mode: function(t) {
            this.color_mode = t, "picker" == t && 0 == this.color_picker_hue && 0 == this.color_picker_saturation && 0 == this.color_picker_value && 0 == this.color_picker_opacity && (this.color_picker_opacity = 255, 
            this.color_picker_value = 255);
        },
        reset_stroke: function() {
            this.active_style.stroke = 0, this.active_style.border_radius = 0, this.active_style.stroke_style = "solid";
        },
        apply_font_size: function(t) {
            this.apply_formatting(null, "preciseFontSize", t + "px");
        },
        apply_swatch_color: function(t) {
            var i = hex_to_rgba(t.hex), e = rgb_to_hsv(i.r, i.g, i.b);
            this.color_picker_hue = parseFloat(255 * e.h), this.color_picker_saturation = parseFloat(255 * e.s), 
            this.color_picker_value = parseFloat(255 * e.v), this.color_picker_opacity = 255 * i.a, 
            this.color_picker_rgb = rgb_to_hex(i.r, i.g, i.b), this.active_style[this.color_picker_target] = t.hex, 
            "stroke_color" == this.color_picker_target && (this.active_style.stroke || (this.active_style.stroke = 2));
        },
        apply_color_picker: function() {
            var t = hsv_to_rgb(this.color_picker_hue / 255, this.color_picker_saturation / 255, this.color_picker_value / 255), i = this.color_picker_opacity / 255;
            this.active_style[this.color_picker_target] = "rgba(" + [ t.r, t.g, t.b, i ].join(",") + ")";
        },
        extract_color_picker_from_selection: function() {
            if (1 == this.selected_artifacts().length || "background" == this.opened_dialog) {
                "background" == this.opened_dialog ? this.active_style[this.color_picker_target] = this.active_space.advanced.background_color : this.active_style[this.color_picker_target] || (this.active_style[this.color_picker_target] = this.default_style[this.color_picker_target]);
                var t = hex_to_rgba(this.active_style[this.color_picker_target]), i = rgb_to_hsv(t.r, t.g, t.b);
                this.color_picker_hue = parseFloat(255 * i.h), this.color_picker_saturation = parseFloat(255 * i.s), 
                this.color_picker_value = parseFloat(255 * i.v), this.color_picker_opacity = parseInt(t.a), 
                this.color_picker_rgb = rgb_to_hex(t.r, t.g, t.b);
            }
        },
        update_selected_artifacts: function(t, i) {
            var e = this.selected_artifacts(!i);
            e.length && (this.update_artifacts(e, t), this.update_selection_metrics());
        },
        nudge_selected_artifacts: function(t, i, e) {
            if (this.present_mode) {
                if (t > 0 || i > 0) return void this.go_to_next_zone();
                if (t < 0 || i < 0) return void this.go_to_previous_zone();
            }
            if (!this.selected_artifacts().length) {
                if (!$("#space").length) return;
                var a = $("#space")[0];
                return a.scrollLeft += 100 * t, void (a.scrollTop += 100 * i);
            }
            this.active_space_is_readonly || (e && (e.preventDefault(), e.stopPropagation()), 
            this.begin_transaction(), this.update_selected_artifacts(function(e) {
                return {
                    board: _.extend(e.board, {
                        x: e.board.x + t,
                        y: e.board.y + i
                    })
                };
            }));
        },
        highest_z: function() {
            var t = _.max(this.active_space_artifacts.map(function(t) {
                return t.board.z || 0;
            }));
            return t < 0 && (t = 0), t > 999 && (t = 999), t;
        },
        find_place_for_item: function(t, i) {
            var e = this.active_space_artifacts, a = window.innerWidth, s = window.innerHeight, o = $("#space")[0];
            if (!o) return {
                x: 0,
                y: 0,
                z: 1
            };
            var n = $(".wrapper"), _ = parseInt(n.css("margin-left")), r = parseInt(n.css("margin-top")), c = parseInt((o.scrollLeft + a / 2) / this.viewport_zoom - t / 2 - _ / this.viewport_zoom), l = parseInt((o.scrollTop + s / 2) / this.viewport_zoom - i / 2 - r / this.viewport_zoom), h = this.highest_z() + 1;
            return 0 == e.length ? {
                x: c,
                y: l
            } : (c += parseInt(20 * Math.random()) - 10, l += parseInt(20 * Math.random()) - 10, 
            {
                x: c,
                y: l,
                z: h
            });
        },
        save_audio_edit: function(t) {
            this.opened_dialog = "none", this.update_board_artifact_viewmodel(t), save_artifact(t);
        },
        save_artifact: function(t, i) {
            this.guest_nickname && (t.editor_name = this.guest_nickname), this.update_board_artifact_viewmodel(t), 
            save_artifact(t, i);
        },
        add_artifact: function(t, i, e, a) {
            if (this.active_tool = "pointer", this.mouse_state = "idle", this.hide_toolbar_artifacts(), 
            e || "image" != i && "video" != i && "embed" != i || (e = prompt("URL?"), e && e.length)) {
                var s = 300, o = 200, n = this.highest_z() + 1;
                mimes = {
                    text: "text/html",
                    note: "text/html",
                    image: "image/jpg",
                    video: "video/mp4"
                };
                var _ = {
                    mime: mimes[i],
                    description: "",
                    payload_uri: e,
                    payload_thumbnail_medium_uri: e || null,
                    payload_thumbnail_web_uri: e || null,
                    space_id: t._id,
                    style: {
                        order: this.active_space_artifacts.length + 1,
                        valign: "middle",
                        align: "center"
                    }
                };
                if ("text/html" == mimes[i] && (_.style.padding_left = 10, _.style.padding_top = 10, 
                _.style.padding_right = 10, _.style.padding_bottom = 10, _.style.fill_color = "rgba(255,255,255,1)", 
                _.description = "<p>Text</p>"), a) {
                    var r = this.cursor_point_to_space(a);
                    r.x -= 100, r.y -= 100;
                } else {
                    var r = this.find_place_for_item(s, o);
                    n = r.z;
                }
                _.board = {
                    x: parseInt(r.x),
                    y: parseInt(r.y),
                    w: s,
                    h: o,
                    z: n
                }, this.guest_nickname && (_.editor_name = this.guest_nickname), save_artifact(_, function(t) {
                    this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t), e || this.select(null, t), 
                    i.match("text") && (this.editing_artifact_id = t._id, window.setTimeout(function() {
                        var i = $("#artifact-" + t._id + " .text-editing");
                        focus_contenteditable(i[0], !1);
                    }, 400));
                }.bind(this));
            }
        },
        go_to_first_zone: function() {
            this.discover_zones(), this.zones.length && this.zoom_to_zone(this.zones[0]);
        },
        go_to_previous_zone: function() {
            if (this.discover_zones(), this.zones.length) {
                var t = this.current_zone_idx - 1;
                t < 0 && (t = this.zones.length - 1), this.current_zone_idx = t, this.zoom_to_zone(this.zones[this.current_zone_idx]);
            }
        },
        go_to_next_zone: function() {
            if (this.discover_zones(), this.zones.length) {
                var t = (this.current_zone_idx + 1) % this.zones.length;
                this.current_zone_idx = t, this.zoom_to_zone(this.zones[this.current_zone_idx]);
            }
        },
        sort_zone_up: function(t) {
            var i = this.zones.indexOf(t);
            if (!(i < 1)) {
                for (var e = _.flatten([ this.zones.slice(0, i - 1), [ t ], this.zones[i - 1], this.zones.slice(i + 1, this.zones.length) ]), a = 0; a < e.length; a++) e[a] && (e[a].style || (e[a].style = {}), 
                e[a].style.order = a, save_artifact(e[a]));
                this.discover_zones();
            }
        },
        sort_zone_down: function(t) {
            var i = this.zones.indexOf(t);
            if (!(i >= this.zones.length)) {
                for (var e = _.flatten([ this.zones.slice(0, i), this.zones[i + 1], [ t ], this.zones.slice(i + 2, this.zones.length) ]), a = 0; a < e.length; a++) e[a] && (e[a].style || (e[a].style = {}), 
                e[a].style.order = a, save_artifact(e[a]));
                this.discover_zones();
            }
        },
        add_zone: function() {
            var t = 600, i = 600, e = this.find_place_for_item(t, i), a = {
                space_id: this.active_space._id,
                mime: "x-spacedeck/zone",
                description: "Zone " + (this.zones.length + 1),
                board: {
                    x: e.x,
                    y: e.y,
                    w: t,
                    h: i,
                    z: 0
                },
                style: {
                    valign: "middle",
                    align: "center"
                }
            };
            this.guest_nickname && (a.editor_name = this.guest_nickname), save_artifact(a, function(t) {
                this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t), this.select(null, t);
            }.bind(this));
        },
        add_shape: function(t, i) {
            var e = 200, a = 200;
            "cloud" == t && (e = 400);
            var s = this.cursor_point_to_space(i), o = {
                space_id: this.active_space._id,
                mime: "x-spacedeck/shape",
                description: "Text",
                board: {
                    x: s.x,
                    y: s.y,
                    z: s.z,
                    w: e,
                    h: a
                },
                style: {
                    stroke_color: "#ffffff",
                    text_color: "#ffffff",
                    stroke: 0,
                    fill_color: "#000000",
                    shape: t,
                    valign: "middle",
                    align: "center"
                }
            };
            this.guest_nickname && (o.editor_name = this.guest_nickname), save_artifact(o, function(t) {
                this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t), this.select(null, t);
            }.bind(this));
        },
        cursor_point_to_space: function(t) {
            if (!t) return {
                x: 0,
                y: 0
            };
            if (!$("#space").length) return {
                x: 0,
                y: 0
            };
            var i = $("#space")[0], e = parseInt($("#space").css("padding-top")), a = t.pageX, s = t.pageY;
            !("pageX" in t) && "originalEvent" in t && (a = t.originalEvent.pageX, s = t.originalEvent.pageY);
            var o = (a + i.scrollLeft - this.bounds_margin_horiz) / this.viewport_zoom, n = (s + i.scrollTop - e - this.bounds_margin_vert) / this.viewport_zoom;
            return {
                x: o,
                y: n
            };
        },
        space_point_to_window: function(t, i) {
            var e = 0, a = 0, s = $("#space")[0];
            return e = t * this.viewport_zoom - s.scrollLeft + this.bounds_margin_horiz, a = i * this.viewport_zoom - s.scrollTop + this.bounds_margin_vert, 
            {
                x: e,
                y: a
            };
        },
        create_artifact_via_upload: function(t, i, e) {
            if ("viewer" == this.active_space_role) return !1;
            this.hide_toolbar_artifacts();
            var a = 300, s = 150, o = "transparent";
            i.type.match("audio") && (a = 600, s = 150, o = "#ffffff");
            var n = this.cursor_point_to_space(t);
            n.x -= a / 2, n.y -= s / 2, e && (n = this.find_place_for_item(a, s));
            var _ = {
                space_id: this.active_space._id,
                mime: i.type,
                description: "Uploading…",
                state: "uploading",
                payload_thumbnail_medium_uri: null,
                payload_thumbnail_web_uri: null,
                board: {
                    x: n.x,
                    y: n.y,
                    w: a,
                    h: s,
                    z: n.z
                },
                style: {
                    order: this.active_space_artifacts.length + 1,
                    fill_color: o
                }
            };
            this.update_board_artifact_viewmodel(_), this.guest_nickname && (_.editor_name = this.guest_nickname), 
            save_artifact(_, function(t) {
                _ = t, this.update_board_artifact_viewmodel(_), this.active_space_artifacts.push(_), 
                save_artifact_file(_, i, i.name, function(t) {
                    console.log("file saved. result: ", t), _.payload_uri = t.payload_uri, _.payload_thumbnail_web_uri = t.payload_thumbnail_web_uri, 
                    _.payload_thumbnail_medium_uri = t.payload_thumbnail_medium_uri, _.payload_thumbnail_big_uri = t.payload_thumbnail_big_uri, 
                    _.payload_alternatives = t.payload_alternatives, _.mime = t.mime, _.board = t.board, 
                    _.state = t.state, this.update_board_artifact_viewmodel(_);
                }.bind(this), null, function(t) {
                    var i = t.loaded / t.total;
                    (i = 1) ? _.description = "Converting Media…" : _.description = "Upload " + parseInt(100 * i) + "%", 
                    this.update_board_artifact_viewmodel(_), _.view.progress = parseInt(100 * i);
                }.bind(this));
            }.bind(this), this.display_saving_error);
        },
        delete_selected_artifacts: function(t, i) {
            if (this.active_space) {
                t && (t.preventDefault(), t.stopPropagation()), this.begin_transaction();
                var e = this.selected_artifacts().map(function(t) {
                    return t._id;
                }), a = [], s = [];
                if (!(e.length > 1) || i || confirm("Delete " + e.length + " items?")) {
                    for (var o = 0; o < e.length; o++) if (this.selected_artifacts_dict[e[o]]) {
                        var n = e[o], _ = this.find_artifact_by_id(n);
                        _ && (a.push(_), s.push(n), delete_artifact(_));
                        var r = this.active_space_artifacts.indexOf(_);
                        this.active_space_artifacts.splice(r, 1);
                    }
                    this.push_to_undo({
                        action: "delete",
                        artifact_ids: s,
                        snapshot: a
                    }), i || this.deselect();
                }
            }
        },
        find_artifact_by_id: function(t) {
            for (var i = this.active_space_artifacts, e = 0; e < i.length; e++) {
                var a = i[e];
                if (a._id == t) return a;
            }
            return null;
        },
        selected_artifacts: function(t) {
            return this.active_space && this.active_space_artifacts ? this.active_space_artifacts.filter(function(i) {
                var e = this.artifact_is_selected(i);
                return e && i.locked ? !t : e;
            }.bind(this)) : [];
        },
        delayed_edit_artifact: function(t) {
            t.stopPropagation(), t.preventDefault();
            var i = this.selected_artifacts()[0], e = $("#ios-focuser-" + i._id);
            e.focus(), e.select(), this.toggle_selected_artifact_editing(!0, !0);
        },
        toggle_selected_artifact_editing: function(t, i) {
            var e = this.selected_artifacts()[0];
            if (!e) return void (this.editing_artifact_id = null);
            if (this.editing_artifact_id == e._id && !t) return void (this.editing_artifact_id = null);
            if (!e.locked && _.include([ "text/html", "x-spacedeck/shape", "x-spacedeck/zone" ], e.mime) && this.editing_artifact_id != e._id) {
                this.editing_artifact_id = e._id;
                var a = 100;
                i && (a = 500), window.setTimeout(function() {
                    var t = $("#artifact-" + e._id + " .text-editing");
                    t[0] ? focus_contenteditable(t[0], !0) : window.setTimeout(function() {
                        var t = $("#artifact-" + e._id + " .text-editing");
                        focus_contenteditable(t[0], !0);
                    }, a);
                }, a);
            }
        },
        clear_formatting_walk: function(t, i, e, a) {
            if (t && t.style && ("preciseFontSize" == i ? t.style.fontSize = null : "letterSpacing" == i ? t.style.letterSpacing = null : "lineHeight" == i ? t.style.lineHeight = null : "fontName" == i ? t.style.fontFamily = null : "fontWeight" == i ? (t.style.fontWeight = null, 
            t.style.fontStyle = null) : "bold" == i ? t.style.fontWeight = null : "italic" == i ? t.style.fontStyle = null : "underline" == i ? t.style.textDecoration = null : "strikeThrough" == i ? t.style.textDecoration = null : "forecolor" == i && (t.style.color = null)), 
            t && t.childNodes) for (var s = 0; s < t.childNodes.length; s++) this.clear_formatting_walk(t.childNodes[s], i, e, a);
        },
        apply_formatting: function(t, i, e, a) {
            if (t && (t.preventDefault(), t.stopPropagation()), !this.skip_formatting && ("createlink" != i || (e = prompt("Link URL?")))) {
                var s = this.selected_artifacts(), o = !1;
                if (window.selection && "Caret" != window.selection.type && "None" != window.selection.type || (o = !0), 
                this.editing_artifact_id && "preciseFontSize" != i && "forecolor" != i) {
                    if (this.editing_artifact_id) {
                        var n = this.find_artifact_by_id(this.editing_artifact_id), _ = this.medium_for_object[n._id];
                        _ && n && (_.focus(), _.element.focus(), _.invokeElement(i), n.description = _.value(), 
                        this.queue_artifact_for_save(n));
                    }
                } else for (var r = 0; r < s.length; r++) {
                    var n = s[r], c = $("<div>" + n.description + "</div>")[0], l = c.firstChild;
                    do {
                        if (l && l.childNodes) for (var h = 0; h < l.childNodes.length; h++) this.clear_formatting_walk(l.childNodes[h], i, e, a);
                        l && l.style && ("preciseFontSize" == i ? e == this.default_style.font_size + "px" ? l.style.fontSize = null : l.style.fontSize = e : "letterSpacing" == i ? e == this.default_style.letter_spacing + "px" ? l.style.letterSpacing = null : l.style.letterSpacing = e : "lineHeight" == i ? e == this.default_style.line_height + "em" ? l.style.lineHeight = null : l.style.lineHeight = e : "fontName" == i ? l.style.fontFamily = e : "fontWeight" == i ? (l.style.fontWeight = e, 
                        l.style.fontStyle = a) : "bold" == i ? l.style.fontWeight = "bold" != l.style.fontWeight ? "bold" : "normal" : "italic" == i ? l.style.fontStyle = "italic" != l.style.fontStyle ? "italic" : "normal" : "underline" == i ? l.style.textDecoration = "underline" != l.style.textDecoration ? "underline" : "none" : "strikeThrough" == i ? l.style.textDecoration = "line-through" != l.style.textDecoration ? "line-through" : "none" : "forecolor" == i && (l.style.color = e));
                    } while (l && (l = l.nextSibling));
                    if (n.description != c.innerHTML && (n.description = c.innerHTML, this.update_board_artifact_viewmodel(n), 
                    this.queue_artifact_for_save(n), this.editing_artifact_id)) {
                        var n = this.find_artifact_by_id(this.editing_artifact_id), _ = this.medium_for_object[n._id];
                        _ && n && _.value(n.description);
                    }
                }
                this.extract_text_format_from_selection();
            }
        },
        remove_link_from_selected_artifacts: function() {
            this.update_selected_artifacts(function(t) {
                var i = t.meta || {};
                return delete i.link_uri, {
                    meta: i
                };
            });
        },
        create_link_on_selected_artifacts: function() {
            var t = "", i = this.selected_artifacts();
            i.length >= 1 && i[0].meta && i[0].meta.link_uri && (t = i[0].meta.link_uri);
            var e = prompt("URL:", t);
            this.update_selected_artifacts(function(t) {
                var i = t.meta || {};
                i.link_uri = e;
                var a = {
                    meta: i
                };
                if (t.payload_uri && t.payload_uri.match("webgrabber")) {
                    var s = encodeURIComponent(btoa(e)), o = ENV.apiEndpoint + "/api/webgrabber/" + s;
                    a.payload_uri = o, a.payload_thumbnail_web_uri = o, a.payload_thumbnail_medium_uri = o, 
                    a.payload_thumbnail_big_uri = o;
                }
                return a;
            }), this.opened_dialog = "none";
        },
        clone_artifact: function(t, i, e, a) {
            var s = _.cloneDeep(t);
            return delete s.$index, delete s._id, i && (s.board.x += i), e && (s.board.y += e), 
            s.style || (s.style = {}), s.style.order = this.active_space_artifacts.length + 1, 
            this.guest_nickname && (s.editor_name = this.guest_nickname), s.space_id = this.active_space._id, 
            save_artifact(s, function(t) {
                this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t), a ? a(t) : this.select(null, t);
            }.bind(this)), s;
        },
        toggle_lock_of_selected_artifacts: function() {
            this.update_selected_artifacts(function(t) {
                return {
                    locked: !t.locked
                };
            }, !0);
        },
        duplicate_selected_artifacts: function() {
            for (var t = this.selected_artifacts(), i = 0; i < t.length; i++) {
                var e = t[i];
                this.clone_artifact(e, 50, 50);
            }
        },
        copy_selected_artifacts_to_clipboard: function() {
            "ontouchstart" in window || ($("#space-clipboard").focus(), $("#space-clipboard").select());
        },
        handle_section_click: function(t) {
            t.target == t.currentTarget && this.deselect();
        },
        handle_space_doubleclick: function(t) {
            this.selected_artifacts().length || this.guest_nickname || this.active_space && "public" == this.active_space.access_mode;
        },
        handle_body_click: function(t) {
            "space" == this.active_view && this.handle_section_click(t), this.close_dropdown(t);
        },
        extract_text_format_from_selection: function() {
            if (window.selection) {
                var t = $(window.selection.baseNode).parents().toArray();
                this.detected_text_formats = {};
                for (var i = {
                    p: "Paragraph",
                    h1: "Headline 1",
                    h2: "Headline 2",
                    h3: "Headline 3",
                    h4: "Headline 4",
                    h5: "Headline 5",
                    h6: "Headline 6",
                    ul: "Bullet List",
                    ol: "Numbered List",
                    blockquote: "Blockquote"
                }, e = 0; e < t.length; e++) {
                    var a = t[e];
                    if ("true" == a.contentEditable) break;
                    var s = a.nodeName.toLowerCase();
                    i[s] && (this.detected_text_formats[s] = !0, this.active_text_format_name = i[s]);
                }
            }
        },
        save_edited_artifact_text: function(t) {
            if (this.editing_artifact_id) {
                var i = this.find_artifact_by_id(this.editing_artifact_id);
                i && this.queue_artifact_for_save(i), this.extract_text_format_from_selection();
            }
        },
        handle_section_paste: function(t) {
            if (!this.editing_artifact_id) {
                var i = null;
                try {
                    i = t.clipboardData.getData("text/plain");
                } catch (e) {}
                i && (i.match(/<[a-zA-Z]+>/g) || (i = i.replace(/\n/g, "<br>")), this.insert_embedded_artifact(i));
            }
        },
        insert_embedded_artifact: function(t) {
            var i = this.active_space;
            if (i) {
                if ("[" == t[0] || "{" == t[0]) try {
                    parsed = JSON.parse(t), "{" == t[0] && (parsed = [ parsed ]), this.deselect();
                    for (var e = 0; e < parsed.length; e++) if (parsed[e].mime) {
                        var a = this.highest_z() + 1;
                        if (1 == parsed.length) {
                            var s = parsed[e].board.w, o = parsed[e].board.h, n = this.find_place_for_item(s, o);
                            parsed[e].board.x = n.x, parsed[e].board.y = n.y, parsed[e].board.z = n.z;
                        } else parsed[e].board.x = parsed[e].board.x + 50, parsed[e].board.y = parsed[e].board.y + 50, 
                        parsed[e].board.y = parsed[e].board.z + a;
                        this.clone_artifact(parsed[e], 0, 0, function(t) {
                            this.multi_select([ t ]);
                        }.bind(this));
                    }
                    return;
                } catch (_) {}
                if (t.match(/^http[s]*\:\/\//)) return void this.create_artifact_via_embed_url(t);
                var r = {
                    mime: "text/html",
                    description: t.replace("\n", "<br />"),
                    title: "",
                    space_id: i._id
                }, s = 400, o = 300, n = this.find_place_for_item(s, o);
                r.board = {
                    x: n.x,
                    y: n.y,
                    w: s,
                    h: o,
                    z: n.z
                }, this.guest_nickname && (r.editor_name = this.guest_nickname), save_artifact(r, function(t) {
                    this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t);
                }.bind(this));
            }
        },
        create_artifact_via_embed_url: function(t) {
            this.close_modal();
            var i = this.find_place_for_item(200, 200), e = this.highest_z() + 1, a = {
                space_id: this.active_space._id,
                mime: "image/png",
                description: t,
                state: "uploading",
                board: {
                    x: i.x,
                    y: i.y,
                    w: 200,
                    h: 200,
                    z: e
                },
                style: {
                    order: this.active_space_artifacts.length
                }
            }, s = parse_link(t);
            if (s) {
                if ("unknown" == s.type) {
                    var o = encodeURIComponent(btoa(t));
                    return a.meta = {
                        link_uri: t
                    }, this.guest_nickname && (a.editor_name = this.guest_nickname), void save_artifact(a, function(t) {
                        this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t);
                        var i = ENV.apiEndpoint + "/api/webgrabber/" + o;
                        t.state = "idle", t.payload_uri = i, t.payload_thumbnail_web_uri = i, t.payload_thumbnail_medium_uri = i, 
                        t.payload_thumbnail_big_uri = i, save_artifact(t, function(i) {
                            this.update_board_artifact_viewmodel(t);
                        }.bind(this));
                    }.bind(this));
                }
                var n = s.thumbnail_width || 200, r = s.thumbnail_height || 200;
                n < 200 && (n = 200), r < 200 && (r = 200), "soundcloud" == s.provider_name && (n = 500, 
                r = 150), a = _.extend(a, {
                    mime: "oembed/" + s.type + "-" + s.provider_name,
                    description: s.url || t,
                    payload_thumbnail_medium_uri: s.thumbnail_url,
                    payload_thumbnail_web_uri: s.thumbnail_url,
                    state: "idle",
                    meta: {
                        title: s.title,
                        link_uri: s.url || t
                    },
                    board: {
                        x: i.x - n / 2,
                        y: i.y - r / 2,
                        w: n,
                        h: r
                    }
                }), this.guest_nickname && (a.editor_name = this.guest_nickname), save_artifact(a, function(t) {
                    this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t);
                }.bind(this));
            }
        },
        create_artifact_via_payload_url: function(t, i) {
            this.add_artifact(this.active_space, t, i, null);
        },
        handle_touch_select_background_image: function() {
            $("#background-uploader").click();
        },
        handle_insert_image_url: function(t) {
            return t && t.length ? (this.create_artifact_via_payload_url("image", t), void (this.insert_image_url = "")) : void $("#image_file_upload").click();
        },
        handle_insert_video_url: function(t) {
            if (!t.length) return void $("#video_file_upload").click();
            var i = parse_link(t);
            i ? this.create_artifact_via_embed_url(t) : this.create_artifact_via_payload_url("video", t), 
            this.insert_video_url = "";
        },
        handle_insert_audio_url: function(t) {
            if (!t.length) return void $("#audio_file_upload").click();
            var i = parse_link(t);
            i ? this.create_artifact_via_embed_url(t) : this.create_artifact_via_payload_url("audio", t), 
            this.insert_audio_url = "";
        },
        handle_generic_file_upload: function(t) {
            var i = t.target.files;
            if (this.opened_dialog = "none", i && i.length) {
                console.log("file: ", i[0]);
                for (var e = 0; e < i.length; e++) {
                    var a = i[e];
                    if ("application/pdf" === a.type) {
                        var s = {
                            x: 100,
                            y: 100
                        };
                        this.dropped_point = s, this.pending_pdf_file = a, this.activate_modal("pdfoptions");
                    } else this.create_artifact_via_upload(null, a, !0);
                }
            }
        },
        handle_image_file_upload: function(t) {
            this.handle_generic_file_upload(t);
        },
        handle_video_file_upload: function(t) {
            this.handle_generic_file_upload(t);
        },
        handle_audio_file_upload: function(t) {
            this.handle_generic_file_upload(t);
        },
        handle_section_background_upload: function(t) {
            var i = t.target.files[0];
            this.space_background_uploading = !0, save_space_background_file(this.active_space, i, function(t) {
                this.active_space = t, this.space_background_uploading = !1;
            }.bind(this));
        },
        remove_section_background: function() {
            this.active_space.advanced.background_uri = null, save_space(this.active_space);
        },
        show_toolbar_props: function() {
            if (0 != this.selection_metrics.count) {
                arts = this.selected_artifacts();
                for (var t = 0; t < arts.length; t++) if ("x-spacedeck/zone" == arts[t].mime) return;
                this.toolbar_props_in = !0;
            }
        },
        hide_toolbar_props: function() {
            this.toolbar_props_in = !1;
        },
        show_toolbar_artifacts: function(t, i) {
            this.toolbar_artifacts_x = t - 175 + "px", this.toolbar_artifacts_y = i + "px", 
            this.toolbar_artifacts_in = !0;
        },
        hide_toolbar_artifacts: function() {
            this.toolbar_artifacts_in = !1;
        },
        start_adding_artifact: function(t) {
            return t = fixup_touches(t), this.toolbar_artifacts_in ? void this.hide_toolbar_artifacts() : void this.show_toolbar_artifacts(t.pageX, t.pageY);
        },
        start_drawing_scribble: function(t) {
            this.hide_toolbar_artifacts(), this.active_tool = "scribble", this.opened_dialog = "none";
        },
        start_drawing_arrow: function(t) {
            this.hide_toolbar_artifacts(), this.active_tool = "arrow", this.opened_dialog = "none";
        },
        start_drawing_line: function(t) {
            this.hide_toolbar_artifacts(), this.active_tool = "line", this.opened_dialog = "none";
        },
        adjust_bounds_zoom: function() {
            if (this.active_space) {
                this.bounds_zoom = this.viewport_zoom;
                var t = this.active_space.advanced.width * this.viewport_zoom, i = this.active_space.advanced.height * this.viewport_zoom;
                window.innerWidth > t ? this.bounds_margin_horiz = (window.innerWidth - t) / 2 : this.bounds_margin_horiz = 0, 
                window.innerHeight - 80 > i ? this.bounds_margin_vert = (window.innerHeight - i) / 2 - 80 : this.bounds_margin_vert = 0;
            }
        },
        zoom_to_original: function() {
            var t = this.viewport_zoom;
            this.viewport_zoom = 1, this.viewport_zoom_percent = parseInt(100 * this.viewport_zoom), 
            this.adjust_bounds_zoom(), this.zoom_adjust_scroll(this.viewport_zoom / t);
        },
        zoom_to_fit: function() {
            var t = this.enclosing_rect(this.active_space_artifacts);
            if (t) {
                var i = 200;
                t.x1 -= i, t.y1 -= i - 100, t.x2 += i, t.y2 += i + 100, this.zoom_to_rect(t, 1);
            }
        },
        zoom_to_zone: function(t) {
            if ($("#space").length) {
                var i = this.enclosing_rect([ t ]), e = $("#space")[0], a = {
                    x1: e.scrollLeft / this.viewport_zoom,
                    y1: e.scrollTop / this.viewport_zoom,
                    x2: (e.scrollLeft + window.innerWidth) / this.viewport_zoom,
                    y2: (e.scrollTop + window.innerHeight) / this.viewport_zoom
                }, s = 10;
                i.x1 -= s, i.y1 -= s, i.x2 += s, i.y2 += s, this.animation_running || (this.animation_running = !0, 
                this.animate_zoom_to_rect(i, 200, a), this.current_zone_idx = this.zones.indexOf(t));
            }
        },
        zoom_to_rect: function(t, i) {
            if ($("#space").length) {
                var e = $("#space")[0], a = t.x2 - t.x1, s = t.y2 - t.y1;
                if (a > s ? (this.viewport_zoom = window.innerWidth / a, window.innerHeight < s * this.viewport_zoom && (this.viewport_zoom = window.innerHeight / s)) : (this.viewport_zoom = window.innerHeight / s, 
                window.innerWidth < a * this.viewport_zoom && (this.viewport_zoom = window.innerWidth / a)), 
                i && this.viewport_zoom > i && (this.viewport_zoom = i), this.viewport_zoom < .05 && (this.viewport_zoom = .05), 
                this.viewport_zoom_percent = parseInt(100 * this.viewport_zoom), this.adjust_bounds_zoom(), 
                e) {
                    var o = function() {
                        e.scrollTop = (t.y1 + s / 2) * this.viewport_zoom - window.innerHeight / 2, e.scrollLeft = (t.x1 + a / 2) * this.viewport_zoom - window.innerWidth / 2, 
                        this.handle_scroll();
                    }.bind(this);
                    "requestAnimationFrame" in window ? window.requestAnimationFrame(o) : o();
                }
            }
        },
        animate_zoom_to_rect: function(t, i, e, a) {
            if ($("#space").length) {
                var s = ($("#space")[0], 20);
                if (a || (a = 0), i > a) {
                    window.setTimeout(function() {
                        this.animate_zoom_to_rect(t, i, e, a + s);
                    }.bind(this), s);
                    var o = (t.x1 - e.x1) / i * a, n = (t.x2 - e.x2) / i * a, _ = (t.y1 - e.y1) / i * a, r = (t.y2 - e.y2) / i * a, c = {
                        x1: e.x1 + o,
                        x2: e.x2 + n,
                        y1: e.y1 + _,
                        y2: e.y2 + r
                    };
                    this.zoom_to_rect(c);
                } else this.zoom_to_rect(t), this.animation_running = !1;
            }
        },
        zoom_to_point: function(t, i) {
            var e = $("#space")[0], a = e.scrollLeft / this.viewport_zoom, s = e.scrollTop / this.viewport_zoom, o = window.innerWidth / this.viewport_zoom, n = window.innerHeight / this.viewport_zoom, _ = (t.x - (a + o / 2)) * i, r = (t.y - (s + n / 2)) * i, c = -_, l = -r, h = {
                x1: t.x - o / 2 * i + c,
                y1: t.y - n / 2 * i + l,
                x2: t.x + o / 2 * i + c,
                y2: t.y + n / 2 * i + l
            };
            this.zoom_to_rect(h, 2);
        },
        throttled_zoom_to_point: _.throttle(function(t, i) {
            this.zoom_to_point(t, i);
        }, 50),
        zoom_to_cursor: function(t, i) {
            var e = this.cursor_point_to_space(t);
            this.throttled_zoom_to_point.bind(this)(e, i);
        },
        zoom_adjust_scroll: function(t) {
            var i = function() {
                if ($("#space").length && this.active_space && this.active_space_loaded) {
                    var i = $("#space")[0], e = this.active_space.advanced.width * this.viewport_zoom, a = this.active_space.advanced.height * this.viewport_zoom, s = i.scrollLeft, o = i.scrollTop, n = window.innerWidth / 2, _ = window.innerHeight / 2, r = t * (s + n) - n, c = t * (o + _) - _;
                    e < window.innerWidth && (r = 0), a < window.innerHeight && (c = 0), i.scrollLeft = r, 
                    i.scrollTop = c, this.handle_scroll();
                }
            };
            "requestAnimationFrame" in window ? window.requestAnimationFrame(i.bind(this)) : i();
        },
        zoom_in: function() {
            this.viewport_zoom || (this.viewport_zoom = 1);
            var t = this.viewport_zoom;
            this.viewport_zoom *= 1.5, this.viewport_zoom >= 2 && (this.viewport_zoom = 2), 
            this.viewport_zoom_percent = parseInt(100 * this.viewport_zoom), this.adjust_bounds_zoom(), 
            this.zoom_adjust_scroll(this.viewport_zoom / t);
        },
        zoom_out: function() {
            this.viewport_zoom || (this.viewport_zoom = 1);
            var t = this.viewport_zoom;
            this.viewport_zoom /= 1.5, this.viewport_zoom < .05 && (this.viewport_zoom = .05), 
            this.viewport_zoom_percent = parseInt(100 * this.viewport_zoom), this.adjust_bounds_zoom(), 
            this.zoom_adjust_scroll(this.viewport_zoom / t);
        },
        activate_pan_tool: function(t) {
            t && (t.stopPropagation(), t.preventDefault()), this.active_tool = "pan", this.stop_pan_timeout && window.clearTimeout(this.stop_pan_timeout), 
            this.stop_pan_timeout = window.setTimeout(function() {
                "pan" == this.active_tool && (this.active_tool = "pointer");
            }.bind(this), 500);
        },
        approve_pdf_upload: function(t, i, e) {
            this.close_modal(), "classic" == e && this.create_artifact_via_upload(t, this.pending_pdf_file, !1), 
            "grid" == e && (this.global_spinner = !0, save_pdf_file(this.active_space, this.dropped_point, this.pending_pdf_file, i, function(t) {
                this.global_spinner = !1, _.each(t, function(t) {
                    this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t);
                }.bind(this));
            }.bind(this), function(t) {
                this.global_spinner = !1, alert("Error PDF (" + t.status + ")");
            }.bind(this)));
        },
        handle_data_drop: function(t) {
            if ("viewer" == this.active_space_role) return !1;
            var i = t.dataTransfer.getData("application/json"), e = (this.active_space, t.dataTransfer.files);
            if (e && e.length) for (var a = 0; a < e.length; a++) {
                var s = e[a];
                if ("application/pdf" === s.type) {
                    var o = this.cursor_point_to_space(t);
                    this.dropped_point = o, this.pending_pdf_file = s, this.activate_modal("pdfoptions");
                } else this.create_artifact_via_upload(t, s, e.length > 1);
            } else {
                var i = t.dataTransfer.getData("application/json");
                if (i) {
                    var n = JSON.parse(i);
                    delete n._id, n.space_id = this.active_space._id;
                    var _ = 300, r = 200;
                    n.board && n.board.w && n.board.h && (_ = n.board.w, r = n.board.h);
                    var o = this.cursor_point_to_space(t);
                    return o.x -= _ / 2, o.y -= r / 2, n.board = {
                        x: o.x,
                        y: o.y,
                        w: _,
                        h: r,
                        z: 20
                    }, this.guest_nickname && (n.editor_name = this.guest_nickname), void save_artifact(n, function(t) {
                        this.update_board_artifact_viewmodel(t), this.active_space_artifacts.push(t);
                    }.bind(this));
                }
                var c = t.dataTransfer.getData("text/html");
                if (c) {
                    var l = /src="([^"]+)"/g, h = l.exec(c);
                    h && this.add_artifact(this.active_space, "image", h[1], t);
                }
            }
        },
        clear_search_results: function() {
            this.image_search_results = [], this.audio_search_results = [], this.video_search_results = [];
        },
        download_selected_artifacts: function() {
            var t = this.selected_artifacts();
            if (1 == t.length && t[0].payload_uri) try {
                window.open(t[0].payload_uri);
            } catch (i) {}
        }
    }
};
var SpacedeckSpaces = {
    data: {
        active_space: {
            advanced: {}
        },
        active_space_loaded: !1,
        active_space_role: "viewer",
        active_space_version_dirty: !0,
        active_space_messages: [],
        active_space_memberships: [],
        active_folder_history_items: [],
        active_space_users: [],
        active_space_artifacts: [],
        active_space_path: [],
        access_settings_space: null,
        access_settings_memberships: [],
        duplicate_folders: [],
        duplicate_folder_id: "",
        pending_pdf_files: [],
        meta_visible: !1,
        meta_unseen: 0,
        present_mode: !1,
        space_editing_title: !1,
        create_space_title: "",
        folder_reverse: 1,
        embedded: !1,
        remix_cta: "Create Reply",
        publish_cta: "Publish",
        remix_copying: !0,
        remix_style: "",
        guest_signup_enabled: !1,
        space_embed_html: "",
        share_base: location.origin,
        share_base_url: location.origin + "/spaces/",
        share_base_url_enc: encodeURIComponent(location.origin + "/spaces/"),
        social_bar: !0,
        can_add_comment: !1,
        space_info_section: "access",
        editors_section: "list",
        selected_member: null,
        invite_member_role: "viewer",
        invite_email_error: null,
        invite_email: "",
        invite_message: "",
        active_join_link: "",
        join_link_role: "viewer",
        mouse_state: "idle",
        active_folder: null,
        folder_sorting: "updated_at",
        folder_spaces_filter: null,
        active_path_length: 0,
        space_comment: "",
        folder_spaces_search: "",
        medium_for_object: {}
    },
    methods: {
        search_spaces: function() {
            var e = this.folder_spaces_search;
            console.log("search query: ", e), load_spaces_search(e, function(e) {
                console.log("results: ", e), this.active_profile_spaces = e;
            }.bind(this));
        },
        guest_logout: function() {
            "localStorage" in window && localStorage && delete localStorage.guest_nickname, 
            this.guest_nickname = "", location.reload();
        },
        ask_guestname: function(e, i) {
            console.log("ask_guestname");
            var t = "Spacedeck";
            subdomainTeam && (t = subdomainTeam.name), smoke.prompt(__("what_is_your_name", t), function(t) {
                if (t && 0 !== t.length) {
                    if (this.guest_nickname = t, "localStorage" in window && localStorage) try {
                        localStorage.guest_nickname = this.guest_nickname;
                    } catch (s) {
                        console.error(s);
                    }
                    i && i();
                } else this.ask_guestname(e, i);
            }.bind(this), {
                value: e || "Guest " + parseInt(1e4 * Math.random()),
                ok: __("ok"),
                cancel: __("cancel")
            });
        },
        load_space: function(e, i, t) {
            console.log("load space: ", e), this.folder_spaces_filter = "", this.folder_spaces_search = "", 
            space_auth = get_query_param("spaceAuth");
            var s = function() {
                if (get_query_param("embedded") && (this.embedded = !0, this.guest_signup_enabled = !0, 
                get_query_param("publish_cta") && (this.publish_cta = get_query_param("publish_cta")), 
                get_query_param("nosocial") && (this.social_bar = !1)), get_query_param("confirm") && this.logged_in) {
                    var s = get_query_param("confirm");
                    return void confirm_user(this.user, s, function() {
                        this.redirect_to("/spaces/" + e + "?show_access=1");
                    }.bind(this), function() {
                        alert("An error occured confirming your email with the given token.");
                    });
                }
                this.close_dropdown(), this.active_space_loaded = !1, this.viewport_zoom = 1, this.viewport_zoom_percent = 100, 
                this.loading_space_id = e, this.present_mode = !1, this.active_space_is_readonly = !0, 
                this.opened_dialog = "none", this.open_space_dialog = "none", this.selected_artifacts_dict = {}, 
                this.update_selection_metrics(), this.can_add_comment = !1;
                var a = !1;
                this.user && (a = e == this.user.home_folder_id), document.title = "Loading… | Spacedeck", 
                load_space(e, function(t, s) {
                    if (document.title = t.name, this.active_space_role = s || "viewer", this.space_embed_html = '<iframe width="1024" height="768" seamless src="' + ENV.webEndpoint + "/spaces/" + t._id + '?embedded=1"></iframe>', 
                    a || load_members(t, function(e) {
                        this.active_space_memberships = e;
                    }.bind(this)), console.log("[websocket] auth start"), "folder" == t.space_type) {
                        if (this.active_space = {
                            advanced: {}
                        }, document.title = "Spacedeck", load_spaces(e, a, function(e) {
                            t.children = e, this.loading_space_id = null, this.active_profile_spaces = t.children, 
                            this.active_folder = t, this.access_settings_space = t, this.auth_websocket(this.active_folder), 
                            this.load_space_path(this.active_folder), a && (this.root_folder = t), load_history(t, function(e) {
                                if (console.log("loaded digest", e), this.active_folder_history_items = e, this.meta_unseen = 0, 
                                "localStorage" in window && localStorage) var i = parseInt(localStorage[this.meta_last_seen_key()], 10); else var i = 0;
                                for (var t = 0; t < e.length; t++) {
                                    var s = e[t], a = new Date(s.last_action).getTime(), n = !1;
                                    1 == s.users.length && "you" == s.users[0] && (n = !0), a > i && !n && this.meta_unseen++;
                                }
                            }.bind(this)), this.active_view = "folders";
                        }.bind(this)), "localStorage" in window) {
                            var n = "folder_sorting_" + e, o = "folder_reverse_" + e;
                            localStorage[n] && localStorage[o] && (this.folder_sorting = localStorage[n], this.folder_reverse = parseInt(localStorage[o]), 
                            console.log("loaded folder sorting: ", this.folder_sorting, this.folder_reverse));
                        }
                        "opened_at" == this.folder_sorting && (this.folder_sorting = "name");
                    } else "space" == t.space_type && (this.artifacts = [], this.loading_space_id = null, 
                    document.title = t.name, (space_auth || this.logged_in) && (this.can_add_comment = !0), 
                    this.setup_watches(), load_artifacts(t._id, function(e) {
                        e || (e = []);
                        for (var s = 0; s < e.length; s++) this.update_board_artifact_viewmodel(e[s]);
                        this.active_space_artifacts = e, this.$set("active_space", t), this.active_space = t, 
                        this.auth_websocket(this.active_space), this.active_view = "space", this.fixup_space_size(), 
                        t._id != this.active_space._id ? (this.present_mode = !0, this.active_space_is_readonly = !0) : this.active_space_is_readonly = !1, 
                        this.discover_zones(), window.setTimeout(function() {
                            this.zoom_to_fit();
                        }.bind(this), 10), i && i(), this.active_space_loaded = !0, this.extract_properties_from_selection(), 
                        load_comments(t._id, function(e) {
                            e || (e = []), this.active_space_messages = e, this.refresh_space_comments();
                        }.bind(this), function(e) {
                            console.error(e);
                        });
                    }.bind(this)), "editor" != this.active_space_role && "admin" != this.active_space_role || (this.present_mode = !1, 
                    this.active_space_is_readonly = !1), this.active_join_link = "", this.join_link_role = "viewer", 
                    "admin" == this.active_space_role ? this.space_info_section = "access" : "editor" == this.active_space_role || (this.space_info_section = "info"));
                }.bind(this), function(i) {
                    return t ? t(i) : void (403 == i.status ? this.logged_in ? this.redirect_to("/") : this.redirect_to("/login?space_id=" + e) : (this.redirect_to("/not_found"), 
                    console.error(i)));
                }.bind(this));
            }.bind(this), a = "";
            "localStorage" in window && localStorage && localStorage.guest_nickname && (this.guest_nickname = localStorage.guest_nickname, 
            a = this.guest_nickname, s()), space_auth ? this.guest_nickname ? s() : this.ask_guestname(a, function() {
                s();
            }) : (this.guest_nickname = "", s());
        },
        refresh_space_comments: function() {
            this.meta_unseen = 0;
            var e = this.active_space_messages, i = 0;
            "localStorage" in window && localStorage && (i = parseInt(localStorage[this.meta_last_seen_key()], 10));
            for (var t = 0; t < e.length; t++) {
                var s = e[t], a = new Date(s.updated_at).getTime(), n = !1;
                this.user && this.user._id != s.user_id && !s.editor_name && (n = !0), a > i && !n && this.meta_unseen++;
            }
        },
        go_to_next_space: function() {
            var e = this.active_folder.children.map(function(e) {
                return e._id;
            }), i = e.indexOf(this.active_space._id);
            console.log("index: ", i);
            for (var t = i, s = !1; !s; ) {
                var a = this.active_folder.children[(i + 1) % e.length];
                "folder" == a.space_type ? (s = !1, i++) : s = !0, t == i && (s = !0);
            }
            this.load_space(a._id);
        },
        go_to_previous_space: function() {
            var e = this.active_folder.children.map(function(e) {
                return e._id;
            }), i = e.indexOf(this.active_space._id);
            console.log("index: ", i);
            for (var t = i, s = !1; !s; ) {
                var i = (i < 1 ? e.length : i) - 1, a = this.active_folder.children[i];
                "folder" == a.space_type ? (s = !1, i--) : s = !0, t == i && (s = !0);
            }
            this.load_space(a._id);
        },
        filtered_folder_children: function(e) {
            var e = e || "space";
            return _.filter(this.active_folder.children, function(i) {
                return i.space_type == e;
            });
        },
        load_space_path: function(e) {
            return e ? void load_space_path(e._id, function(e) {
                this.active_space_path = e;
            }.bind(this), function() {
                console.log("could not load folder path");
            }) : [];
        },
        is_active_space_role: function(e) {
            return !!this.active_space && this.active_space_role == e;
        },
        create_space: function(e) {
            if (this.active_folder) {
                this.close_modal(), this.folder_spaces_filter = "", this.active_folder.children || (this.active_folder.children = []), 
                e || (e = "space");
                var i = {
                    name: "space" == e ? __("untitled_space") : __("untitled_folder"),
                    artifacts: [],
                    space_type: e,
                    parent_space_id: this.active_folder._id
                };
                this.create_space_title.length && (i.name = this.create_space_title), save_space(i, function(i) {
                    this.active_folder.children.push(i), "folder" != e ? this.redirect_to("/" + i.space_type + "s/" + i._id, function(e) {}) : this.rename_folder(i);
                }.bind(this), function(e) {
                    alert("Error: Could not create Space (" + e.status + ").");
                }.bind(this));
            }
        },
        save_space: function(e) {
            save_space(e);
        },
        create_space_version: function() {
            if (!this.is_pro(this.user)) return void smoke.confirm(__("spacedeck_pro_ad_versions"), function(e) {
                e && this.show_upgrade_modal();
            }.bind(this));
            this.version_saving = !0, this.present_mode = !1;
            var e = this.active_space.draft_space;
            console.log("create_space_version:", e), duplicate_space(e, null, function(e) {
                load_spaces(this.active_space._id, !1, function(e) {
                    this.version_saving = !1, this.activate_space_version(e, e.draft_space), alert("Version saved.");
                }.bind(this));
            }.bind(this), function(e) {
                console.error(e);
            }.bind(this));
        },
        finalize_folder_profile_edit: function() {
            save_space(this.active_folder, function(e) {
                this.close_modal();
            }.bind(this));
        },
        finalize_space_profile_edit: function() {
            save_space(this.active_space, function(e) {
                this.close_modal();
            }.bind(this));
        },
        delete_space: function(e) {
            smoke.confirm("Really delete " + e.name + "?", function(i) {
                if (i) {
                    var t = this.active_folder.children.indexOf(e);
                    delete_space(e, function() {
                        e.parent_space_id ? this.redirect_to("/folders/" + e.parent_space_id, function(e) {}) : this.redirect_to("/spaces", function(e) {}), 
                        this.close_modal(), this.active_folder.children.splice(t, 1);
                    }.bind(this));
                }
            }.bind(this));
        },
        duplicate_space: function(e) {
            duplicate_space(e, null, function(e) {
                this.active_folder.children.push(e);
            }.bind(this), function(e) {
                console.error(e);
            }.bind(this));
        },
        remove_avatar: function(e) {
            remove_avatar_file("space", e, function(e) {
                this.active_space = e;
            }.bind(this));
        },
        rename_space: function(e) {
            return this.close_dropdown(), "folder" == e.space_type ? this.rename_folder(e) : void smoke.prompt(__("new_space_title"), function(i) {
                i && i.length && (e.name = i, save_space(e));
            }.bind(this), {
                value: e.name
            });
        },
        rename_folder: function(e) {
            this.close_dropdown(), smoke.prompt(__("new_folder_title"), function(i) {
                i && i.length && (e.name = i, save_space(e));
            }.bind(this), {
                value: e.name
            });
        },
        edit_space_title: function() {
            this.close_dropdown(), "editor" != this.active_space_role && "admin" != this.active_space_role || (this.space_editing_title = !0, 
            $("#space-title").focus());
        },
        save_space_title: function(e) {
            this.active_space.name = e, save_space(this.active_space, function() {
                this.space_editing_title = !1;
            }.bind(this));
        },
        save_space_keydown: function(e) {
            if (e) {
                if (13 != e.keyCode) return void (this.space_editing_title = !0);
                e.preventDefault(), e.stopPropagation(), e.target.blur();
            }
            save_space(this.active_space, function(e) {
                this.active_space.edit_slug = e.edit_slug, this.space_editing_title = !1;
            }.bind(this));
        },
        save_space_description: function(e) {
            e.preventDefault(), e.stopPropagation();
            var i = e.target.innerText;
            e.target.blur(), this.active_space.description = i, save_space(this.active_space);
        },
        save_space_domain: function(e) {
            e.preventDefault(), e.stopPropagation();
            var i = e.target.innerText;
            e.target.blur(), this.active_space.domain = i, save_space(this.active_space);
        },
        download_space: function() {
            smoke.quiz(__("download_space"), function(e, i) {
                "PDF" == e ? this.download_space_as_pdf(this.active_space) : "ZIP" == e ? this.download_space_as_zip(this.active_space) : "TXT" == e && this.download_space_as_list(this.active_space);
            }.bind(this), {
                button_1: "PDF",
                button_2: "ZIP",
                button_3: "TXT",
                button_cancel: __("cancel")
            });
        },
        download_space_as_png: function(e) {
            window.open(ENV.apiEndpoint + "/api/spaces/" + e._id + "/png");
        },
        download_space_as_pdf: function(e) {
            this.global_spinner = !0, get_resource("/spaces/" + e._id + "/pdf", function(e) {
                this.global_spinner = !1, location.href = e.url;
            }.bind(this), function(e) {
                this.global_spinner = !1, alert("PDF export problem (" + e.status + ").");
            }.bind(this));
        },
        download_space_as_zip: function(e) {
            this.global_spinner = !0, get_resource("/spaces/" + e._id + "/zip", function(e) {
                this.global_spinner = !1, location.href = e.url;
            }.bind(this), function(e) {
                this.global_spinner = !1, alert("ZIP export problem (" + e.status + ").");
            }.bind(this));
        },
        download_space_as_list: function(e) {
            this.global_spinner = !0, location.href = "/api/spaces/" + e._id + "/list";
        },
        duplicate_space_into_folder: function() {
            load_writable_folders(function(e) {
                this.duplicate_folders = _.sortBy(e, function(e) {
                    return e.name;
                });
            }.bind(this), function(e) {
                console.error(e);
            });
        },
        duplicate_folder_confirm: function() {
            var e = this.duplicate_folder_id, i = _.findIndex(this.duplicate_folders, function(i) {
                return i._id == e;
            });
            i < 0 && (i = 0);
            var t = this.duplicate_folders[i];
            console.log("df f", t), t && duplicate_space(this.active_space, t._id, function(e) {
                this.duplicate_folders = [], this.duplicate_folder = null, smoke.quiz(__("duplicate_success", this.active_space.name, t.name), function(i, s) {
                    i == __("goto_space", e.name) ? this.redirect_to("/spaces/" + e._id) : i == __("goto_folder", t.name) && this.redirect_to("/folders/" + t._id);
                }.bind(this), {
                    button_1: __("goto_space", e.name),
                    button_2: __("goto_folder", t.name),
                    button_cancel: __("stay_here")
                });
            }.bind(this), function(e) {
                console.error(e), smoke.prompt("error: " + e.statusText);
            }.bind(this));
        },
        toggle_follow_mode: function() {
            this.deselect(), this.follow_mode = !this.follow_mode;
        },
        toggle_present_mode: function() {
            this.deselect(), this.present_mode = !this.present_mode, this.present_mode;
        },
        meta_last_seen_key: function() {
            var e = "meta-seen-";
            if ("space" == this.active_view) {
                if (!this.active_space) return "invalid";
                e += this.active_space._id;
            } else if ("folders" == this.active_view) {
                if (!this.active_folder) return "invalid";
                e += this.active_folder._id;
            }
            return e;
        },
        toggle_meta: function() {
            if (this.meta_visible = !this.meta_visible, this.meta_visible) {
                var e = this.meta_last_seen_key();
                "localStorage" in window && localStorage && (localStorage[e] = new Date().getTime(), 
                console.log("seen_key: ", e, localStorage[e]), this.meta_last_seen = localStorage[e]), 
                this.meta_unseen = 0;
            }
        },
        toggle_space_access_mode: function() {
            this.access_settings_space.access_mode = "public" == this.access_settings_space.access_mode ? "private" : "public", 
            save_space(this.access_settings_space);
        },
        save_space_access_mode: function(e) {
            this.access_settings_space.access_mode = e.currentTarget.value, save_space(this.access_settings_space);
        },
        save_space_editors_locking: function(e) {
            this.access_settings_space.editors_locking = e.currentTarget.checked, save_space(this.access_settings_space);
        },
        create_join_link: function() {
            create_join_link(this.active_space._id, this.join_link_role, function(e) {
                this.active_join_link = "https://" + location.host + "/invitations/" + e.code + "/accept";
            }.bind(this));
        },
        delete_join_link: function() {
            get_join_link(this.active_space._id, function(e) {
                e && e.length && delete_join_link(e[e.length - 1]._id, function() {
                    this.active_join_link = "";
                }.bind(this));
            }.bind(this));
        },
        invite_member: function(e, i, t, s) {
            this.invite_email_error = null;
            var a = i.split(","), n = !1;
            _.each(a, function(i) {
                if (i = i.trim(), !validateEmail(i)) return void (this.invite_email_error = "Please enter a valid address.");
                var a = {
                    email_invited: i,
                    personal_message: t,
                    role: s
                };
                create_membership(e, a, function(e) {
                    this.access_settings_memberships.push(e), console.log("membership created:", e), 
                    this.editors_section = "list", n || (n = !0, smoke.alert("Invitation(s) sent."), 
                    this.invite_email = "", this.invite_message = "");
                }.bind(this), function(e) {
                    text = JSON.stringify(e.responseText), smoke.alert("Error: " + text);
                }.bind(this));
            }.bind(this));
        },
        update_member: function(e, i, t) {
            i.role = t, save_membership(e, i, function() {
                console.log("saved");
            }.bind(this), function(e) {
                console.error(e);
            }.bind(this));
        },
        remove_member: function(e, i) {
            delete_membership(e, i, function() {
                this.access_settings_memberships.splice(this.access_settings_memberships.indexOf(i), 1);
            }.bind(this), function(e) {
                console.error(e);
            }.bind(this));
        },
        history_back: function() {
            window.history.back();
        },
        create_space_comment: function(e) {
            if (e.length) {
                var i = {
                    space: this.active_space._id,
                    message: e,
                    editor_name: this.guest_nickname,
                    user: this.user
                };
                save_comment(this.active_space._id, i, function(e) {
                    console.log("comment saved: ", e.created_at), this.active_space_messages.push(e), 
                    this.space_comment = "";
                }.bind(this), function(e) {
                    console.error(e);
                }.bind(this));
            }
        },
        remove_space_comment: function(e) {
            delete_comment(this.active_space._id, e._id, function() {
                console.log("comment id:", e._id), this.active_space_messages = _.filter(this.active_space_messages, function(i) {
                    return i._id != e._id;
                });
            }.bind(this), function(e) {
                console.error(e);
            }.bind(this));
        },
        emojified_comment: function(e) {
            return twemoji.parse(e);
        },
        set_folder_sorting: function(e, i) {
            this.folder_sorting = e, this.folder_reverse = i ? -1 : 1, console.log(e, i), "localStorage" in window && (localStorage["folder_sorting_" + this.active_folder._id] = this.folder_sorting, 
            localStorage["folder_reverse_" + this.active_folder._id] = this.folder_reverse);
        },
        activate_space_info_section: function(e) {
            this.space_info_section = e, this.editors_section = "list", "versions" == e && load_spaces(this.active_space._id, null, function(e) {
                this.active_space.children = e.children, console.log("loaded: ", e);
            }.bind(this));
        },
        handle_folder_drop: function(e, i) {
            try {
                var t = JSON.parse(e.dataTransfer.getData("application/json"));
            } catch (s) {
                return;
            }
            if (t && t._id && t.parent_space_id && i._id && t._id != i._id) {
                if ("folder" != i.space_type) return void alert("Spaces can only be moved into folders.");
                t.parent_space_id = i._id, save_space(t, function() {
                    var e = _.findIndex(this.active_folder.children, function(e) {
                        return e._id == t._id;
                    });
                    e >= 0 && (this.active_folder.children.splice(e, 1), console.log("spliced: ", e));
                }.bind(this));
            }
        },
        activate_access: function() {
            if (this.activate_modal("access"), this.active_space._id) this.access_settings_space = this.active_space; else {
                if (!this.active_folder || !this.active_folder._id) return;
                this.access_settings_space = this.active_folder;
            }
            this.access_settings_memberships = this.active_space_memberships;
        },
        close_access: function() {
            this.close_modal();
        },
        show_offline_help: function() {
            smoke.confirm(__("was_offline"), function(e) {
                e && location.reload();
            });
        }
    }
};
var SpacedeckTeams = {
    data: {
        team_members: [],
        team_loading: !1,
        team_logo: "",
        team_emails: "",
        team_email_invited: !1,
        team_plan_calculation: ""
    },
    methods: {
        is_admin: function(e) {
            return _.filter(e.team.admins, function(t) {
                return t == e._id;
            }).length > 0;
        },
        calculate_team: function() {
            this.team_plan_calculation = "";
        },
        load_team: function() {
            this.user.team && load_resource("GET", "/teams/" + this.user.team._id + "/memberships", null, function(e) {
                this.team_members = e, this.calculate_team();
            }.bind(this), function(e, t, i) {
                console.log(e, t, i);
            });
        },
        team_save: function() {
            load_resource("PUT", "/teams/" + this.user.team._id, this.user.team, function(e, t) {
                alert("Team updated.");
            }.bind(this), function(e) {
                console.error(e), alert("Could not update Team.");
            });
        },
        team_update_member: function(e) {
            load_resource("PUT", "/teams/" + this.user.team._id + "/memberships/" + e._id, e, function(e, t) {
                console.log("members updated");
            }.bind(this), function(e) {
                console.error(e);
            });
        },
        team_invite_members: function(e) {
            var t = e.split(",");
            for (_i = 0, _len = t.length; _i < _len; _i++) if (email = t[_i], email = email.replace(new RegExp(" ", "g"), "").toLowerCase(), 
            validateEmail(email)) {
                var i = {
                    email: email
                };
                load_resource("POST", "/teams/" + this.user.team._id + "/memberships", i, function(e, t) {
                    this.team_email_invited = !0, this.team_members.push(e);
                    window.setTimeout(function() {
                        this.team_email_invited = !1;
                    }.bind(this), 1e3);
                    this.team_emails = "";
                }.bind(this), function(e, t, i) {
                    console.log(e, t, i), this.team_invite_error = JSON.parse(e.responseText).error;
                }.bind(this));
            }
        },
        team_promote_member: function(e) {
            load_resource("GET", "/teams/" + this.user.team._id + "/memberships/" + e._id + "/promote", null, function(e, t) {
                this.load_user(function() {
                    this.load_team();
                }.bind(this));
            }.bind(this), function(e) {
                console.error(e);
            });
        },
        team_demote_member: function(e) {
            load_resource("GET", "/teams/" + this.user.team._id + "/memberships/" + e._id + "/demote", null, function(e, t) {
                this.load_user(function() {
                    this.load_team();
                }.bind(this));
            }.bind(this), function(e) {
                console.error(e);
            });
        },
        team_remove_member: function(e) {
            confirm("Really delete this member?") && (e.user_id && "active" === e.state ? load_resource("DELETE", "/users/" + e._id, null, function(t, i) {
                var s = this.team_members.indexOf(e);
                this.team_members.splice(s, 1);
            }.bind(this), function(e) {
                console.error(e);
            }) : load_resource("DELETE", "/teams/" + this.user.team._id + "/memberships/" + e._id, null, function(t, i) {
                var s = this.team_members.indexOf(e);
                this.team_members.splice(s, 1);
            }.bind(this), function(e) {
                console.error(e);
            }));
        }
    }
};
var SpacedeckBoardArtifacts = {
    update_board_artifact_viewmodel: function(t) {
        var e = this.artifact_major_type(t);
        if (t.view = {
            _id: t._id,
            classes: this.artifact_classes(t),
            style: this.artifact_style(t),
            grid_style: this.artifact_style(t, !0),
            inner_style: this.artifact_inner_style(t),
            text_cell_style: this.artifact_text_cell_style(t),
            vector_svg: this.artifact_vector_svg(t),
            payload_uri: t.payload_uri,
            thumbnail_uri: this.artifact_thumbnail_uri(t),
            major_type: e,
            text_blank: this.artifact_is_text_blank(t),
            payload_alternatives: t.payload_alternatives,
            filename: this.artifact_filename(t),
            oembed_html: this.artifact_oembed_html(t),
            link: this.artifact_link(t),
            link_caption: this.artifact_link_caption(t),
            interactive: 0
        }, "audio" != e && "video" != e || t.player_view || (t.player_view = {
            state: "stop",
            current_time_string: "",
            total_time_string: "",
            current_time_float: 0,
            inpoint_float: 0,
            outpoint_float: 0
        }), "medium_for_object" in this) {
            var a = this.medium_for_object[t._id];
            a && t._id != this.editing_artifact_id && a.value(t.description);
        }
    },
    is_artifact_audio: function(t) {
        return !!t && t.mime.match("audio");
    },
    artifact_filename: function(t) {
        return t.payload_uri ? t.payload_uri.replace(/.*\//g, "") : "";
    },
    artifact_link: function(t) {
        return t.meta && t.meta.link_uri ? t.meta.link_uri : "";
    },
    artifact_link_caption: function(t) {
        if (t.meta && t.meta.link_uri) {
            var e = t.meta.link_uri.split("/");
            return e.length > 2 ? e[2] : "Link";
        }
        return "";
    },
    artifact_is_selected: function(t) {
        return !!t && !!this.selected_artifacts_dict[t._id];
    },
    artifact_is_text_blank: function(t) {
        if (t.description) {
            var e = t.description.replace(/<[^>]+>/g, "").replace(/\s/g, "");
            return e.length < 1;
        }
        return !1;
    },
    artifact_classes: function(t) {
        return clzs = [ "artifact", "artifact-" + this.artifact_major_type(t), t.mime.replace("/", "-") ], 
        this.artifact_is_selected(t) && this.editing_artifact_id != t._id && clzs.push("selected"), 
        t._id || clzs.push("creating"), t.style && (clzs.push("align-" + t.style.align), 
        clzs.push("align-" + t.style.valign)), clzs.push("state-" + t.state), this.artifact_is_text_blank(t) && clzs.push("text-blank"), 
        t.locked && clzs.push("locked"), clzs.join(" ");
    },
    artifact_inner_style: function(t) {
        var e = [];
        if (t.style) {
            var a = (t.mime.match("vector") || t.mime.match("shape")) && "square" != t.style.shape;
            a || (t.style.stroke && (e.push("border-width:" + t.style.stroke + "px"), e.push("border-style:" + (t.style.stroke_style || "solid"))), 
            t.style.stroke_color && e.push("border-color:" + t.style.stroke_color), t.style.border_radius && e.push("border-radius:" + t.style.border_radius + "px")), 
            t.style.fill_color && !a && e.push("background-color:" + t.style.fill_color), t.style.text_color && e.push("color:" + t.style.text_color);
            var r = [];
            isNaN(t.style.brightness) || 100 == t.style.brightness || r.push("brightness(" + t.style.brightness + "%)"), 
            isNaN(t.style.contrast) || 100 == t.style.contrast || r.push("contrast(" + t.style.contrast + "%)"), 
            isNaN(t.style.opacity) || 100 == t.style.opacity || r.push("opacity(" + t.style.opacity + "%)"), 
            !isNaN(t.style.hue) && t.style.hue && r.push("hue-rotate(" + t.style.hue + "deg)"), 
            isNaN(t.style.saturation) || 100 == t.style.saturation || r.push("saturate(" + t.style.saturation + "%)"), 
            !isNaN(t.style.blur) && t.style.blur && r.push("blur(" + t.style.blur + "px)"), 
            r.length && (e.push("-webkit-filter:" + r.join(" ")), e.push("filter:" + r.join(" ")));
        }
        return e.join(";");
    },
    artifact_text_cell_style: function(t, e) {
        var a = [];
        return t.style && (t.style.padding_left && a.push("padding-left:" + t.style.padding_left + "px"), 
        t.style.padding_right && a.push("padding-right:" + t.style.padding_right + "px"), 
        t.style.padding_top && a.push("padding-top:" + t.style.padding_top + "px"), t.style.padding_bottom && a.push("padding-bottom:" + t.style.padding_bottom + "px")), 
        a.join(";");
    },
    artifact_style: function(t, e) {
        var a = [], r = 0;
        return t.board && (r = t.board.z, r < 0 && (r = 0), a = [ "left:" + t.board.x + "px", "top:" + t.board.y + "px", "width:" + t.board.w + "px", "height:" + t.board.h + "px", "z-index:" + r ]), 
        t.style && (t.style.margin_left && a.push("margin-left:" + t.style.margin_left + "px"), 
        t.style.margin_right && a.push("margin-right:" + t.style.margin_right + "px"), t.style.margin_top && a.push("margin-top:" + t.style.margin_top + "px"), 
        t.style.margin_bottom && a.push("margin-bottom:" + t.style.margin_bottom + "px")), 
        t.mime.match("vector") && a.push("overflow:visible"), a.join(";");
    },
    artifact_major_type: function(t) {
        return t.mime.match("oembed") ? "oembed" : t.mime.match("zone") ? "zone" : t.mime.match("svg") ? "svg" : t.mime.match("image") ? "image" : t.mime.match("pdf") ? "image" : t.mime.match("video") ? "video" : t.mime.match("audio") ? "audio" : t.mime.match("website") ? "website" : t.mime.match("vector") ? "vector" : t.mime.match("shape") ? "shape" : t.mime.match("placeholder") ? "placeholder" : t.mime.match("text") || t.mime.match("note") ? "text" : "file";
    },
    artifact_thumbnail_uri: function(t) {
        return t.payload_thumbnail_big_uri && t.board && t.board.w > 800 ? t.payload_thumbnail_big_uri : t.payload_thumbnail_medium_uri || t.payload_thumbnail_big_uri || t.payload_thumbnail_web_uri || "";
    },
    artifact_oembed_html: function(t) {
        if ("oembed" != this.artifact_major_type(t)) return "";
        var e = t.mime.split("/")[1].split("-"), a = e[0], r = e[1];
        if (!t.meta || !t.meta.link_uri) return console.log("missing meta / link_uri: ", t), 
        console.log("type/provider: ", a, r), "missing metadata: " + t._id;
        if ("youtube" == r) {
            var i = t.meta.link_uri.match(/(v=|\/)([a-zA-Z0-9\-_]{11})/);
            if (i && i.length > 2) {
                var n = "https://youtube.com/embed/" + i[2];
                return '<iframe frameborder=0 allowfullscreen src="' + n + '?showinfo=0&rel=0&controls=0"></iframe>';
            }
            return "Can't resolve: " + t.payload_uri;
        }
        if ("dailymotion" == r) {
            var o = t.meta.link_uri.match(/dailymotion.com\/video\/([^<]*)/);
            if (o && o.length > 1) {
                var n = "https://www.dailymotion.com/embed/video/" + o[1];
                return '<iframe frameborder=0 allowfullscreen src="' + n + '"></iframe>';
            }
            return "Can't resolve: " + t.payload_uri;
        }
        if ("vimeo" == r) {
            var o = t.meta.link_uri.match(/https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/);
            if (o) {
                var n = "https://player.vimeo.com/video/" + o[2];
                return '<iframe frameborder=0 allowfullscreen src="' + n + '"></iframe>';
            }
            return "Can't resolve: " + t.payload_uri;
        }
        return "soundcloud" == r ? '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + t.meta.link_uri.replace(":", "%3A") + '"></iframe>' : "spacedeck" == r ? "" : "Don't know how to embed " + t.mime + ".";
    },
    artifact_vector_svg: function(t) {
        var e = this.artifact_major_type(t);
        if ("vector" != e && "shape" != e) return "";
        var a, r = (t.style.shape || "", 32 + 2 * t.style.stroke), i = "";
        "vector" == e ? (a = render_vector_drawing(t, r), i = "fill:none") : (a = render_vector_shape(t, r), 
        i = "fill:" + t.style.fill_color + ";", r = 0);
        var n = r, o = "<svg xmlns='http://www.w3.org/2000/svg' width='" + (t.board.w + 2 * r) + "' height='" + (t.board.h + 2 * r) + "' ";
        return o += "style='margin-left:" + -n + "px;margin-top:" + -n + "px;stroke-width:" + t.style.stroke + ";stroke:" + t.style.stroke_color + ";" + i + "'>", 
        o += a, o += "</svg>";
    },
    artifact_enclosing_rect: function(t) {
        return 0 == t.length ? null : (r = {
            x1: parseInt(_.min(t.map(function(t) {
                return t.board.x;
            }))),
            y1: parseInt(_.min(t.map(function(t) {
                return t.board.y;
            }))),
            x2: parseInt(_.max(t.map(function(t) {
                return t.board.x + t.board.w;
            }))),
            y2: parseInt(_.max(t.map(function(t) {
                return t.board.y + t.board.h;
            })))
        }, r.x = r.x1, r.y = r.y1, r.w = r.x2 - r.x1, r.h = r.y2 - r.y1, r);
    },
    artifact_selection_rect: function() {
        return this.artifact_enclosing_rect(this.selected_artifacts());
    },
    rects_intersecting: function(t, e) {
        return !(t.x + t.w < e.x || t.x > e.x + e.w || t.y + t.h < e.y || t.y > e.y + e.h);
    },
    artifacts_in_rect: function(t) {
        return _.filter(this.active_space_artifacts, function(e) {
            return this.rects_intersecting(e.board, t);
        }.bind(this));
    },
    layout_stack_top: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect(), e = _.filter(this.artifacts_in_rect(t), function(t) {
            return !this.is_selected(t);
        }.bind(this)), a = _.max(e, function(t) {
            return t.board.z;
        });
        a = a.board ? a.board.z + 1 : 1, this.update_selected_artifacts(function(t) {
            return {
                board: _.extend(t.board, {
                    z: a
                })
            };
        });
    },
    layout_stack_bottom: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect(), e = _.filter(this.artifacts_in_rect(t), function(t) {
            return !this.is_selected(t);
        }.bind(this)), a = _.min(e, function(t) {
            return t.board ? t.board.z : 0;
        });
        a = a.board ? a.board.z - 1 : 0;
        var r = _.max(this.selected_artifacts(), function(t) {
            t.board ? t.board.z : 0;
        });
        return r = r.board ? r.board.z - 1 : 0, a < 0 ? void this.update_artifacts(e, function(t) {
            return {
                board: _.extend(t.board, {
                    z: r + (t.board ? t.board.z : 0) + 1
                })
            };
        }) : void this.update_selected_artifacts(function(t) {
            return {
                board: _.extend(t.board, {
                    z: a
                })
            };
        });
    },
    layout_align_left: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect();
        this.update_selected_artifacts(function(e) {
            return {
                board: _.extend(e.board, {
                    x: t.x1
                })
            };
        });
    },
    layout_align_top: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect();
        this.update_selected_artifacts(function(e) {
            return {
                board: _.extend(e.board, {
                    y: t.y1
                })
            };
        });
    },
    layout_align_right: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect();
        this.update_selected_artifacts(function(e) {
            return {
                board: _.extend(e.board, {
                    x: t.x2 - e.board.w
                })
            };
        });
    },
    layout_align_bottom: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect();
        this.update_selected_artifacts(function(e) {
            return {
                board: _.extend(e.board, {
                    y: t.y2 - e.board.h
                })
            };
        });
    },
    layout_align_center: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect(), e = t.x1 + (t.x2 - t.x1) / 2;
        this.update_selected_artifacts(function(t) {
            return {
                board: _.extend(t.board, {
                    x: e - t.board.w / 2
                })
            };
        });
    },
    layout_align_middle: function() {
        this.begin_transaction();
        var t = this.artifact_selection_rect(), e = t.y1 + (t.y2 - t.y1) / 2;
        this.update_selected_artifacts(function(t) {
            return {
                board: _.extend(t.board, {
                    y: e - t.board.h / 2
                })
            };
        });
    },
    layout_match_size_horiz: function() {
        this.begin_transaction();
        var t = this.selected_artifacts();
        if (!(t.length < 2)) {
            var e = _.reduce(t, function(t, e) {
                return t + e.board.w;
            }, 0), a = e / t.length;
            this.update_selected_artifacts(function(t) {
                return {
                    board: _.extend(t.board, {
                        w: a
                    })
                };
            });
        }
    },
    layout_match_size_vert: function() {
        this.begin_transaction();
        var t = this.selected_artifacts();
        if (!(t.length < 2)) {
            var e = _.reduce(t, function(t, e) {
                return t + e.board.h;
            }, 0), a = e / t.length;
            this.update_selected_artifacts(function(t) {
                return {
                    board: _.extend(t.board, {
                        h: a
                    })
                };
            });
        }
    },
    layout_match_size_both: function() {
        this.layout_match_size_horiz(), this.layout_match_size_vert();
    },
    layout_distribute_horizontal: function() {
        this.begin_transaction();
        var t = this.selected_artifacts();
        if (!(t.length < 3)) for (var e = _.sortBy(t, function(t) {
            return t.board.x;
        }), a = e[0].board.x + e[0].board.w / 2, r = _.last(e).board.x + _.last(e).board.w / 2, i = (r - a) / (e.length - 1), n = 1; n < e.length - 1; n++) {
            var o = e[n], s = a + i * n - o.board.w / 2;
            this.update_artifacts([ o ], function(t) {
                return {
                    board: _.extend(t.board, {
                        x: s
                    })
                };
            });
        }
    },
    layout_distribute_vertical: function() {
        this.begin_transaction();
        var t = this.selected_artifacts();
        if (!(t.length < 3)) for (var e = _.sortBy(t, function(t) {
            return t.board.y;
        }), a = e[0].board.y + e[0].board.h / 2, r = _.last(e).board.y + _.last(e).board.h / 2, i = (r - a) / (e.length - 1), n = 1; n < e.length - 1; n++) {
            var o = e[n], s = a + i * n - o.board.h / 2;
            this.update_artifacts([ o ], function(t) {
                return {
                    board: _.extend(t.board, {
                        y: s
                    })
                };
            });
        }
    },
    layout_distribute_horizontal_spacing: function() {
        this.begin_transaction();
        var t = this.selected_artifacts();
        if (!(t.length < 3)) for (var e = _.sortBy(t, function(t) {
            return t.board.x;
        }), a = e[0].board.x, r = _.last(e).board.x + _.last(e).board.w, i = r - a, n = _.reduce(e, function(t, e) {
            return t + e.board.w;
        }, 0), o = (i - n) / (e.length - 1), s = a + e[0].board.w, c = 1; c < e.length - 1; c++) {
            var l = e[c], d = s + o;
            this.update_artifacts([ l ], function(t) {
                return {
                    board: _.extend(t.board, {
                        x: d
                    })
                };
            }), s = d + l.board.w;
        }
    },
    layout_distribute_vertical_spacing: function() {
        this.begin_transaction();
        var t = this.selected_artifacts();
        if (!(t.length < 3)) for (var e = _.sortBy(t, function(t) {
            return t.board.y;
        }), a = e[0].board.y, r = _.last(e).board.y + _.last(e).board.h, i = r - a, n = _.reduce(e, function(t, e) {
            return t + e.board.h;
        }, 0), o = (i - n) / (e.length - 1), s = a + e[0].board.h, c = 1; c < e.length - 1; c++) {
            var l = e[c], d = s + o;
            this.update_artifacts([ l ], function(t) {
                return {
                    board: _.extend(t.board, {
                        y: d
                    })
                };
            }), s = d + l.board.h;
        }
    },
    layout_auto: function() {
        this.begin_transaction();
        var t = this.selected_artifacts();
        if (!(t.length < 2)) {
            for (var e = _.sortBy(t, function(t) {
                return t.board.x + t.board.y * this.active_space.advanced.width;
            }.bind(this)), a = e[0].board.x, r = e[0].board.y, e = _.sortBy(t, function(t) {
                return -Math.max(t.board.w, t.board.h);
            }.bind(this)), i = [], n = 0; n < e.length; n++) {
                var o = e[n];
                i.push({
                    w: o.board.w,
                    h: o.board.h,
                    a: o
                });
            }
            var s = new GrowingPacker();
            s.fit(i);
            for (var n = 0; n < i.length; n++) {
                var c = i[n];
                if (c.fit) {
                    var o = c.a;
                    this.update_artifacts([ o ], function(t) {
                        return {
                            board: _.extend(t.board, {
                                x: a + c.fit.x,
                                y: r + c.fit.y
                            })
                        };
                    });
                }
            }
        }
    },
    show_artifact_comments: function(t) {
        t.preventDefault(), t.stopPropagation();
        var e = this.selected_artifacts()[0];
        this.selected_artifact = e, this.activate_modal("artifact");
    },
    create_artifact_comment: function(t, e) {
        var a = {
            artifact_id: t._id,
            space_id: this.active_space._id,
            message: e,
            user: this.user
        };
        save_comment(this.active_space._id, a, function(t) {
            this.active_space_messages.push(t), this.artifact_comment = "";
        }.bind(this), function(t) {
            console.error(t);
        }.bind(this));
    },
    remove_artifact_comment: function(t) {
        delete_comment(this.active_space._id, t._id, function(t) {
            this.active_space_messages.pop(t);
        }.bind(this), function(t) {
            console.error(t);
        }.bind(this));
    }
};

"undefined" == typeof window && (exports.SpacedeckBoardArtifacts = SpacedeckBoardArtifacts);
SpacedeckUsers = {
    data: {
        user_forms_email: "",
        user_forms_name: "",
        invitation_token: null,
        login_email: "",
        login_password: "",
        signup_password: "",
        signup_password_confirmation: "",
        account_remove_error: null,
        loading_user: !1,
        password_reset_confirm_error: "",
        password_reset_error: ""
    },
    methods: {
        load_user: function(t, e) {
            this.loading_user = !0, load_current_user(function(e) {
                this.user = e, this.loading_user = !1, this.logged_in = !0, t && t(e);
            }.bind(this), function() {
                this.loading_user = !1, this.logout(), e && e();
            }.bind(this));
        },
        login_google: function(t) {
            this.loading_user = !0, create_oauthtoken(function(t) {
                this.loading_user = !1, location.href = t.url;
            }, function(t) {
                this.loading_user = !1, alert("could not get oauth token");
            });
        },
        finalize_login: function(t, e) {
            window.socket_auth && "" != window.socket_auth && "null" != window.socket_auth || (window.socket_auth = t), 
            this.load_user(function(t) {
                this.invitation_token ? accept_invitation(this.invitation_token, function(t) {
                    this.redirect_to("/spaces/" + t.space_id);
                }.bind(this), function(t) {
                    console.error(t), alert("Could not accept invitation. Maybe it was already accepted?"), 
                    this.redirect_to("/spaces");
                }.bind(this)) : e ? e(this.user) : get_query_param("space_id") && 24 == get_query_param("space_id").length ? this.redirect_to("/spaces/" + get_query_param("space_id")) : this.redirect_to("/spaces", function() {});
            }.bind(this));
        },
        login_with_token: function(t) {
            create_session_for_oauthtoken(t, function(t) {
                this.session = t, this.finalize_login(t.token);
            }.bind(this), function(t) {}.bind(this));
        },
        login_submit: function(t, e, s, i) {
            this.loading_user = !0, this.login_error = null, s && (s.preventDefault(), s.stopPropagation()), 
            create_session(t, e, function(t) {
                console.log("session: ", t), this.loading_user = !1, this.session = t, this.finalize_login(t.token, i);
            }.bind(this), function(t) {
                this.loading_user = !1;
                var e = "";
                if (t.status >= 403) var e = "error_unknown_email"; else try {
                    var e = "error_" + JSON.parse(t.responseText).error;
                } catch (s) {
                    var e = (t.responseText || "Unknown Error.").replace(/,/g, " ");
                }
                this.login_error = __(e);
            }.bind(this));
        },
        login_submit_modal: function(t, e) {
            this.login_submit(t, e, null, function() {
                location.reload();
            });
        },
        signup_guest: function(t) {},
        signup_submit: function(t, e, s, i, r, o) {
            this.creating_user = !0, this.signup_error = null, "localStorage" in window && localStorage && (localStorage.sd_api_token = null), 
            api_token = null, t && (t.preventDefault(), t.stopPropagation()), create_user(e, s, i, r, function(t) {
                this.creating_user = !1, this.login_submit(s, i, null, o);
            }.bind(this), function(t) {
                this.creating_user = !1;
                try {
                    var e = "error_" + JSON.parse(t.responseText).error;
                } catch (s) {
                    var e = (t.responseText || "Unknown Error.").replace(/,/g, " ");
                }
                var e = __(e);
                this.signup_error = e;
            }.bind(this));
        },
        signup_submit_modal: function(t, e, s, i, r) {
            this.signup_submit(t, e, s, i, r, function() {
                alert("Success."), location.reload();
            });
        },
        password_reset_submit: function(t, e) {
            return t && (t.preventDefault(), t.stopPropagation()), this.password_reset_error = null, 
            this.password_reset_send = !1, void 0 === e || e.length < 3 ? void (this.password_reset_error = "This is not a valid email address") : void create_password_reset(e, function(t, e) {
                201 == e.status && (this.password_reset_send = !0);
            }.bind(this), function(t) {
                if (console.log(t.status), 404 == t.status) var e = "error_unknown_email"; else try {
                    var e = "error_" + JSON.parse(t.responseText).error;
                } catch (s) {
                    var e = (t.responseText || "Unknown Error.").replace(/,/g, " ");
                }
                this.password_reset_error = __(e);
            }.bind(this));
        },
        password_reset_confirm: function(t, e, s) {
            return t && (t.preventDefault(), t.stopPropagation()), this.password_reset_confirm_error = null, 
            this.password_reset_send = !1, e != s ? void (this.password_reset_confirm_error = "Passwords do not match.") : e.length < 5 ? void (this.password_reset_confirm_error = "Password too short (must have at least 5 characters).") : void confirm_password_reset(e, this.reset_token, function(t, e) {
                201 == e.status && (this.active_view = "login");
            }.bind(this), function(t) {
                if (404 == t.status) var e = "user not found"; else var e = "error: " + t.statusText;
                this.password_reset_confirm_error = e;
            }.bind(this));
        },
        logout: function() {
            this.active_view = "login", this.logged_in = !1, delete_session(function() {
                this.active_space = {
                    advanced: {}
                }, this.active_space_loaded = !1, this.active_sidebar_item = "none", this.sidebar_state = "closed", 
                this.loading_user = !1, api_token = null, this.user = {}, this.active_content_type = "login", 
                this.redirect_to("/");
            }.bind(this));
        },
        send_feedback: function(t) {
            t.length > 0 && create_feedback(this.user, t, function(t) {
                alert(__("feedback_sent")), this.close_modal();
            }.bind(this), function(t) {
                console.error(t);
            });
        },
        remove_account: function(t, e) {
            return this.account_remove_error = null, e && e.length && e.length > 1 && create_feedback(this.user, e, function(t) {
                console.log("feedback sent");
            }, function(t) {}), t ? void delete_user(this.user, t, function(t) {
                alert("Sorry to see you go. Goodbye!"), this.logout();
            }.bind(this), function(t) {
                this.account_remove_error = "Password not correct (" + t.status + ")";
            }.bind(this)) : void (this.account_remove_error = "Password not correct");
        },
        user_avatar_image: function(t) {
            return t.avatar_thumb_uri;
        },
        user_initials: function(t) {
            var e = (t ? t.nickname || t.email : "anonymous").replace(/[^a-zA-Z]/g, " ").replace(/ +/g, " ").split(" ");
            return e.length > 1 ? e[0][0] + e[1][0] : e[0].substring(0, 2);
        },
        has_avatar_image: function(t) {
            return !!(t && t.avatar_thumb_uri && t.avatar_thumb_uri.length > 0);
        },
        is_pro: function(t) {
            return !0;
        }
    }
};
SpacedeckAccount = {
    data: {
        account_confirmed_sent: !1,
        account_tab: "invoices",
        password_change_error: null,
        feedback_text: ""
    },
    methods: {
        show_account: function(s) {
            this.activate_dropdown("account"), this.load_subscription(), this.load_billing();
        },
        account_save_user_digest: function(s) {
            this.user.preferences.daily_digest = s, this.save_user(function() {});
        },
        account_save_user_notifications: function(s) {
            this.user.preferences.email_notifications = s, this.save_user(function() {});
        },
        save_user_email: function() {
            this.save_user(function() {}.bind(this));
        },
        save_user_language: function(s) {
            localStorage.lang = s, this.user.preferences && (this.user.preferences.language = s, 
            this.save_user(function() {
                window._spacedeck_location_change = !0, location.href = "/spaces";
            }.bind(this)));
        },
        save_user: function(s) {
            this.user.email_changed && (this.user.confirmed_at = null), window._spacedeck_location_change = !0, 
            save_user(this.user, function(e) {
                s ? s() : location.href = "/spaces";
            }.bind(this), function(s) {
                console.error(s);
            });
        },
        save_user_password: function(s, e, n) {
            return this.password_change_error = null, s ? e && n ? e != n ? void (this.password_change_error = "New Passwords do not match") : e.length < 6 ? void (this.password_change_error = "New Password to short") : void save_user_password(this.user, s, e, function() {
                alert("OK. Password Changed."), this.password_change_current = "", this.password_change_new = "", 
                this.password_change_new_confirmation = "";
            }.bind(this), function(s) {
                403 == s.status ? this.password_change_error = "Old Password not correct" : this.password_change_error = "Something went wrong. Please try again later.";
            }.bind(this)) : void (this.password_change_error = "New password/password confirmation required") : void (this.password_change_error = "Current password required");
        },
        confirm_again: function() {
            resent_confirm_mail(this.user, function(s) {
                this.account_confirmed_sent = !0, alert(__("confirm_again"));
            }.bind(this), function(s) {
                console.error(s), alert("Something went wrong, please try again.");
            });
        },
        confirm_account: function(s) {
            confirm_user(this.user, s, function(s) {
                smoke.alert(__("confirmed"), function() {
                    this.redirect_to("/spaces");
                }.bind(this));
            }.bind(this), function(s) {
                console.error(s), alert(s.responseText), this.redirect_to("/spaces");
            }.bind(this));
        }
    }
};
var SpacedeckModals = {
    data: {
        active_modal: null,
        active_account_section: "user",
        active_space_profile_section: null,
        account_sections: [ {
            id: "user",
            title: "Profile",
            icon: "icon-user"
        }, {
            id: "language",
            title: "Language",
            icon: "icon-globe"
        }, {
            id: "email-notifications",
            title: "Notifications",
            icon: "icon-bell"
        }, {
            id: "reset-password",
            title: "Password",
            icon: "icon-lock-closed"
        }, {
            id: "remove-account",
            title: "Terminate",
            icon: "icon-logout"
        } ],
        folder_profile_sections: [ {
            id: "editors",
            title: "Editors",
            icon: "icon-user-group",
            count: 1
        }, {
            id: "visibility",
            title: "Visibility",
            icon: "icon-eye-open",
            count: 1
        } ],
        space_profile_sections: [ {
            id: "comments",
            title: "Comments",
            icon: "icon-messages",
            count: 1
        }, {
            id: "history",
            title: "History",
            icon: "icon-history",
            count: 1
        }, {
            id: "editors",
            title: "Editors",
            icon: "icon-user-group",
            count: 1
        }, {
            id: "visibility",
            title: "Visibility",
            icon: "icon-eye-open",
            count: 1
        } ]
    },
    methods: {
        activate_modal: function(i) {
            this.active_modal = i, "folder-settings" == i && (this.access_settings_space = this.active_folder, 
            this.access_settings_memberships = this.active_space_memberships, this.editors_section = "list");
        },
        close_modal: function() {
            this.active_modal = null;
        },
        activate_account_section: function(i) {
            this.active_account_section = i;
        },
        activate_space_profile_section: function(i) {
            this.active_space_profile_section = i;
        }
    }
};
var SpacedeckAvatars = {
    data: {
        uploading_avatar: !1,
        uploading_folder_avatar: !1,
        uploading_cover: !1
    },
    methods: {
        save_avatar_image: function(a, i, e) {
            if (a.files.length > 0) {
                var t = a.files[0], r = function() {
                    this.uploading_avatar = !1, this.uploading_cover = !1, this.uploading_folder_avatar = !1;
                }.bind(this);
                if (!_.include([ "image/jpeg", "image/jpg", "image/png", "image/gif" ], t.type)) return alert("Unsupported file type. Please upload JPEG, PNG or GIF."), 
                void r();
                if (t.size > 3145728) return alert("File must be smaller than 3 megabytes."), void r();
                save_avatar_file(i, e, t, function(a) {
                    r(), this.uploading_avatar = !1, this.uploading_cover = !1;
                    var i = a.avatar_thumb_uri;
                    e.avatar_thumb_uri = i + "?cachebuster=" + Math.random();
                }.bind(this), function(a) {
                    alert("Upload failed: " + a), r();
                });
            }
        },
        save_space_avatar_image: function(a) {
            this.uploading_avatar = !0;
            var i = this.save_avatar_image.bind(this);
            i(a.$event.target, "space", this.active_space);
        },
        save_folder_avatar_image: function(a) {
            this.uploading_folder_avatar = !0;
            var i = this.save_avatar_image.bind(this);
            i(a.$event.target, "space", this.active_folder);
        },
        save_user_avatar_image: function(a) {
            this.uploading_avatar = !0;
            var i = this.save_avatar_image.bind(this);
            i(a.$event.target, "user", a.$root.user);
        },
        delete_user_avatar_image: function() {
            this.user.avatar_original_uri = "", this.user.avatar_thumb_uri = "", save_user(this.user, function(a) {}.bind(this));
        },
        save_user_background_image: function(a) {
            var i = a.$event.target;
            this.uploading_cover = !0;
            var e = i.files[0];
            save_user_background_file(this.user, e, function(a) {
                this.user.background_original_uri = a.background_original_uri, this.uploading_cover = !1;
            }.bind(this));
        }
    }
};
SpacedeckWebsockets = {
    data: {
        users_online: {}
    },
    methods: {
        handle_live_updates: function(e) {
            if ("Space" == e.model && e.object && "space" == e.object.space_type && this.active_space && this.active_space._id == e.object._id && (this.active_space = _.merge(this.active_space, e.object)), 
            "Message" == e.model && "create" == e.action && e.object) {
                var t = e.object;
                this.active_space && this.active_space._id == t.space._id ? (this.active_space_messages.push(t), 
                this.refresh_space_comments()) : console.log("message created in another space.");
            }
            if ("Artifact" == e.model) if ("create" == e.action && e.object) {
                var i = e.object;
                if (this.active_space && this.active_space._id == i.space_id) {
                    var s = i;
                    s._id && !this.find_artifact_by_id(s._id) ? (this.update_board_artifact_viewmodel(i), 
                    this.active_space_artifacts.push(i)) : (console.log("warning: got create on existing artifact."), 
                    e.action = "update");
                } else console.log("artifact created in another space.");
            } else if ("update" == e.action && e.object) {
                if (this.active_space) {
                    var s = e.object;
                    if (s && s._id) {
                        var c = this.find_artifact_by_id(s._id);
                        if (c) for (key in s) c[key] = s[key], this.update_board_artifact_viewmodel(c); else c = s;
                    }
                }
            } else if ("delete" == e.action && e.object && this.active_space) {
                var s = e.object;
                if (s._id) {
                    var c = this.find_artifact_by_id(s._id);
                    if (c) {
                        var o = this.active_space_artifacts.indexOf(c);
                        this.active_space_artifacts.splice(o, 1);
                    } else console.log("existing artifact to delete not found");
                } else console.error("object without _id");
            }
        },
        subscribe: function(e) {
            this.websocket && 1 == this.websocket.readyState ? this.websocket.send(JSON.stringify({
                action: "subscribe",
                space_id: e._id
            })) : console.error("socket not ready yet. (subscribe)");
        },
        is_member_online: function(e, t) {
            if (!t.user) return !1;
            if (!this.users_online[e._id]) return !1;
            var i = _.find(this.users_online[e._id], function(e) {
                return e._id == t.user._id;
            });
            return i;
        },
        auth_websocket: function(e) {
            if (this.websocket || this.init_websocket(), this.websocket && 1 == this.websocket.readyState) {
                var t = {
                    action: "auth",
                    editor_auth: space_auth,
                    editor_name: this.guest_nickname,
                    auth_token: window.socket_auth,
                    space_id: e._id
                };
                console.log("[websocket] auth space"), this.websocket.send(JSON.stringify(t));
            }
        },
        websocket_send: function(e) {
            if (this.websocket && 1 == this.websocket.readyState) try {
                this.websocket.send(JSON.stringify(e));
            } catch (t) {}
        },
        init_websocket: function() {
            this.websocket && (this.websocket = null), this.current_timeout && (clearTimeout(this.current_timeout), 
            this.current_timeout = null);
            try {
                this.websocket = new WebSocket(ENV.websocketsEndpoint + "/socket");
            } catch (e) {
                console.log("[websocket] cannot establish websocket connection: ", e), this.current_timeout = setTimeout(function() {
                    console.log("[websocket] reconnecting", e), this.init_websocket();
                }.bind(this), 5e3);
            }
            return this.websocket ? (this.websocket.onopen = function(e) {
                this.current_timeout && (clearTimeout(this.current_timeout), this.current_timeout = null), 
                this.active_space_loaded && this.auth_websocket(this.active_space), this.online = !0;
            }.bind(this), this.websocket.onclose = function(e) {
                window._spacedeck_location_change || (this.online = !1), this.current_timeout || (this.current_timeout = setTimeout(function() {
                    console.log("[websocket] onclose: reconnecting", e), this.init_websocket();
                }.bind(this), 5e3));
            }.bind(this), this.websocket.onmessage = function(e) {
                this.online = !0;
                try {
                    var t = JSON.parse(e.data);
                } catch (i) {
                    return void console.log("[websocket] malformed message: ", e.data);
                }
                if (t.channel_id != channel_id && ("cursor" == t.action ? this.handle_user_cursor_update(t) : "viewport" == t.action ? this.handle_presenter_viewport_update(t) : "media" == t.action && this.handle_presenter_media_update(t), 
                "update" != t.action && "create" != t.action && "delete" != t.action || this.handle_live_updates(t), 
                "init" == t.action && (channel_id = t.channel_id), "auth_valid" == t.action && this.active_space && (this.subscribe(this.active_space), 
                this.unsaved_transactions() && (console.log("[websockets-saver] found unsaved transactions, triggering save."), 
                this.process_artifact_save_queue())), "subscription_valid" == t.action && console.log("subscription_valid"), 
                "status_update" == t.action)) {
                    var s = t.space_id, c = t.users;
                    this.user && this.user._id && (c = _.filter(c, function(e) {
                        return e && e._id != this.user._id;
                    }.bind(this))), c = _.filter(c, function(e) {
                        return e && (e._id || e.nickname);
                    }), this.users_online[s] = c, this.active_space && this.active_space._id == s && (this.active_space_users = c);
                }
            }.bind(this), void (this.websocket.onerror = function(e) {
                console.log("websocket.onerror:", e), window._spacedeck_location_change || (this.online = !1, 
                this.was_offline = !0), this.current_timeout || (this.current_timeout = setTimeout(function() {
                    console.log("websocket.onerror: reconnecting", e), this.init_websocket();
                }.bind(this), 5e3));
            }.bind(this))) : void console.log("[websocket] no websocket support?");
        }
    }
};
function setup_whiteboard_directives() {
    if ("ontouchstart" in window) var t = "touchstart", e = "touchmove", s = "touchend"; else var t = "mousedown", e = "mousemove", s = "mouseup";
    Vue.directive("sd-whiteboard", {
        bind: function() {
            var o = this.el;
            $(o).on(t, ".artifact", this.handle_mouse_down_artifact.bind(this)), $(o).on("dblclick", ".artifact", this.handle_double_click_artifact.bind(this)), 
            $(o).on("keyup", ".artifact", this.handle_key_up_artifact.bind(this)), $(o).on("keydown", ".artifact", this.handle_key_down_artifact.bind(this)), 
            $(o).bind(t, this.handle_mouse_down_space.bind(this)), $(o).bind(e, this.handle_mouse_move.bind(this)), 
            $(o).bind(s, this.handle_mouse_up_space.bind(this)), $(o).bind("wheel", this.handle_wheel_space.bind(this)), 
            $(document.body).bind("mouseleave", this.handle_mouse_leave.bind(this)), $(o).find(".handle.resize-nw").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 1, 1);
            }.bind(this)), $(o).find(".handle.resize-n").bind(t, function(t) {
                this.handle_transform_mouse_down(t, .5, 1);
            }.bind(this)), $(o).find(".handle.resize-ne").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 0, 1);
            }.bind(this)), $(o).find(".handle.resize-e").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 0, .5);
            }.bind(this)), $(o).find(".handle.resize-se").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 0, 0);
            }.bind(this)), $(o).find(".handle.resize-s").bind(t, function(t) {
                this.handle_transform_mouse_down(t, .5, 0);
            }.bind(this)), $(o).find(".handle.resize-sw").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 1, 0);
            }.bind(this)), $(o).find(".handle.resize-w").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 1, .5);
            }.bind(this)), $(o).find(".edge-handle.resize-n").bind(t, function(t) {
                this.handle_transform_mouse_down(t, .5, 1);
            }.bind(this)), $(o).find(".edge-handle.resize-s").bind(t, function(t) {
                this.handle_transform_mouse_down(t, .5, 0);
            }.bind(this)), $(o).find(".edge-handle.resize-e").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 0, .5);
            }.bind(this)), $(o).find(".edge-handle.resize-w").bind(t, function(t) {
                this.handle_transform_mouse_down(t, 1, .5);
            }.bind(this)), $(o).on(t, ".vector-handle", function(t) {
                this.handle_vector_transform_mouse_down(t);
            }.bind(this));
            var i = this.vm.$root;
            this.space_zoom = 1, this.artifacts_before_transaction = [], i.active_tool = "pointer";
        },
        update: function() {},
        unbind: function() {
            var o = this.el;
            $(o).off(t + " " + e + " " + s + " keyup keydown mouseleave"), $(document.body).unbind("mouseleave");
        },
        handle_key_down_artifact: function(t) {
            this.vm.$root;
        },
        handle_key_up_artifact: function(t) {
            this.vm.$root;
        },
        handle_mouse_down_artifact: function(t) {
            var e = this.vm.$root;
            e.editing_artifact_id || (t.preventDefault(), t.stopPropagation());
            var s = e.find_artifact_by_id(t.currentTarget.id.replace("artifact-", ""));
            if ("zoom" != e.active_tool) {
                if ("eyedrop" == e.active_tool) {
                    var o = e.selected_artifacts();
                    if (!e.is_selected(s) && o.length > 0) return e.begin_transaction(), e.update_selected_artifacts(function(t) {
                        t.style = _.clone(s.style);
                    }), void (e.active_tool = "pointer");
                }
                if ("pan" == e.active_tool) return void this.start_pan(t);
                "pointer" == e.active_tool && (e.is_selected(s) && !t.shiftKey || this.select(t, s), 
                t.altKey && (s = e.clone_artifact(s), this.select(t, s))), e.begin_transaction();
                var i = this.cursor_point_to_space(t);
                e.mouse_ox = i.x, e.mouse_oy = i.y, e.mouse_moved = !1, this.mouse_state = "move", 
                t.stopPropagation();
            }
        },
        handle_double_click_artifact: function(t) {
            var e = this.vm.$root, s = e.find_artifact_by_id(t.currentTarget.id.replace("artifact-", ""));
            s && (s.payload_uri && e.download_selected_artifacts(), e.toggle_selected_artifact_editing(!0));
        },
        handle_transform_mouse_down: function(t, e, s) {
            t.stopPropagation(), t.preventDefault();
            var o = this.vm.$root;
            o.begin_transaction();
            var i = this.cursor_point_to_space(t);
            this.mouse_state = "transform", o.mouse_ox = i.x, o.mouse_oy = i.y, o.transform_ox = e, 
            o.transform_oy = s;
        },
        handle_vector_transform_mouse_down: function(t) {
            t.stopPropagation(), t.preventDefault();
            var e = this.vm.$root, s = parseInt($(t.currentTarget).attr("data-idx"));
            e.selected_control_point_idx = s, e.begin_transaction();
            var o = this.cursor_point_to_space(t);
            this.mouse_state = "vector_transform", e.mouse_ox = o.x, e.mouse_oy = o.y;
        },
        handle_wheel_space: function(t) {
            var e = this.vm.$root;
            if (t.ctrlKey || t.shiftKey) {
                t.preventDefault(), t.stopPropagation();
                var s = 1, o = t.originalEvent.deltaY;
                if (o > 0) {
                    if (s = 1.2, e.viewport_zoom <= .05) return !1;
                } else {
                    if (!(o < 0)) return !1;
                    if (s = .9, e.viewport_zoom >= 2) return !1;
                }
                e.zoom_to_cursor(t, s);
            }
        },
        handle_mouse_down_space: function(t) {
            if (t.target == t.currentTarget || _.include([ "wrapper" ], t.target.className)) {
                var e = this.vm.$root;
                e.opened_dialog = "none";
                var s = this.cursor_point_to_space(t);
                if (e.mouse_ox = s.x, e.mouse_oy = s.y, 2 != t.which && 4 != t.buttons || (e.active_tool = "pan"), 
                "note" == e.active_tool) return this.deselect(), this.mouse_state = "transform", 
                e.mouse_state = this.mouse_state, void this.start_adding_note(t);
                if ("arrow" == e.active_tool) return this.deselect(), this.mouse_state = "vector_transform", 
                e.mouse_state = this.mouse_state, void this.start_drawing_arrow(t);
                if ("line" == e.active_tool) return this.deselect(), this.mouse_state = "vector_transform", 
                e.mouse_state = this.mouse_state, void this.start_drawing_line(t);
                if ("scribble" == e.active_tool) return this.deselect(), this.mouse_state = "scribble", 
                e.mouse_state = this.mouse_state, void this.start_drawing_scribble(t);
                if ("zoom" == e.active_tool) return void (t.altKey ? e.zoom_out() : e.zoom_in());
                if ("pointer" == e.active_tool) this.mouse_state = "lasso", this.start_lasso(t); else {
                    if ("zone" == e.active_tool) return this.deselect(), this.mouse_state = "transform", 
                    void e.start_adding_zone(t);
                    if ("image" == e.active_tool) return this.deselect(), this.mouse_state = "transform", 
                    void e.start_adding_placeholder(t);
                    if ("pan" == e.active_tool) return void this.start_pan(t);
                }
                e.selection_metrics.count > 0 && (this._no_artifact_toolbar_this_round = !0), this.deselect();
            }
        },
        start_pan: function(t) {
            var e = this.vm.$root;
            el = $("#space")[0], el && (this.mouse_state = "pan", this.old_panx = el.scrollLeft, 
            this.old_pany = el.scrollTop);
            var s = this.cursor_point_to_space(t);
            e.mouse_ox = s.x, e.mouse_oy = s.y, e.mouse_moved = !1;
        },
        deselect: function() {
            var t = this.vm.$root;
            t.deselect();
        },
        select: function(t, e) {
            var s = this.vm.$root;
            s.select(t, e);
        },
        multi_select: function(t) {
            var e = this.vm.$root;
            e.multi_select(t);
        },
        start_lasso: function(t) {
            var e = this.cursor_point_to_space(t);
            this.lasso = {
                x: e.x,
                y: e.y,
                w: 0,
                h: 0
            };
        },
        rects_intersecting: function(t, e) {
            return !(!t || !e) && !(t.x + t.w < e.x || t.x > e.x + e.w || t.y + t.h < e.y || t.y > e.y + e.h);
        },
        artifacts_in_rect: function(t) {
            if (!t) return [];
            var e = this.vm.$root;
            return _.filter(e.active_space_artifacts, function(e) {
                return this.rects_intersecting(e.board, t);
            }.bind(this));
        },
        abs_rect: function(t) {
            var e = {
                x: t.x,
                y: t.y,
                w: Math.abs(t.w),
                h: Math.abs(t.h)
            };
            return t.w < 0 && (e.x += t.w), t.h < 0 && (e.y += t.h), e;
        },
        lasso_style: function() {
            var t = this.vm.$root;
            if (!this.lasso) return "";
            var e = {
                x: this.lasso.x,
                y: this.lasso.y,
                w: this.lasso.w * t.viewport_zoom,
                h: this.lasso.h * t.viewport_zoom
            };
            e = this.abs_rect(e), e.x += t.bounds_margin_horiz, e.y += t.bounds_margin_vert;
            var s = "left:" + e.x + "px;";
            return s += "top:" + e.y + "px;", s += "width:" + e.w + "px;", s += "height:" + e.h + "px;", 
            s += "opacity: 1;";
        },
        render_lasso: function() {
            return this.lasso ? ($("#lasso").attr("style", this.lasso_style()), void $("#lasso").show()) : void $("#lasso").hide();
        },
        cursor_point_to_space: function(t) {
            var e = this.vm.$root, s = {
                left: 0,
                top: 0
            };
            return t = fixup_touches(t), {
                x: (parseInt(t.pageX) - parseInt(s.left) - e.bounds_margin_horiz) / this.space_zoom,
                y: (parseInt(t.pageY) - parseInt(s.top) - e.bounds_margin_vert) / this.space_zoom
            };
        },
        rect_to_points: function(t) {
            return [ {
                x: t.x,
                y: t.y
            }, {
                x: t.x + t.w,
                y: t.y
            }, {
                x: t.x,
                y: t.y + t.h
            }, {
                x: t.x + t.w,
                y: t.y + t.h
            } ];
        },
        old_selection_rect: function() {
            var t = this.vm.$root, e = t.selected_artifacts().map(function(e) {
                return t.find_artifact_before_transaction(e);
            }.bind(this));
            return t.enclosing_rect(e);
        },
        snap_point: function(t, e, s) {
            var o = this.vm.$root, i = 8, a = [];
            if (s && a.push([ [ t - window.innerWidth / 2, Math.abs(e - window.innerHeight / 2) ], [ t - window.innerWidth / 2, Math.abs(e - window.innerHeight / 2) ] ]), 
            o.grid_active) {
                var n = o.grid.spacing / o.grid.subdivisions, r = o.grid.spacing / o.grid.subdivisions, d = parseInt(t / n) * n, c = parseInt(e / r) * r, h = (parseInt(t / n) + 1) * n, l = (parseInt(e / r) + 1) * r;
                a = [ [ [ Math.abs(d - t), d ], [ Math.abs(c - e), c ] ], [ [ Math.abs(h - t), h ], [ Math.abs(l - e), l ] ] ];
            } else a = o.unselected_artifacts().map(function(o) {
                var i = this.rect_to_points(o.board), a = Math.abs(i[0].x - t), n = Math.abs(i[1].x - t), r = Math.abs(i[0].x + o.board.w / 2 - t), _ = Math.abs(i[0].y - e), d = Math.abs(i[2].y - e), c = Math.abs(i[0].y + o.board.h / 2 - e);
                if (!s) {
                    if (n < a) var h = n, l = i[1].x; else var h = a, l = i[0].x;
                    if (d < _) var u = d, f = i[2].y; else var u = _, f = i[0].y;
                }
                if (s) var h = r, l = i[0].x + o.board.w / 2, u = c, f = i[0].y + o.board.h / 2;
                return [ [ h, l ], [ u, f ] ];
            }.bind(this));
            a.push([ [ Math.abs(t), 0 ], [ Math.abs(e), 0 ] ]);
            var u = _.unzip(a), f = _.sortBy(u[0], function(t) {
                return t[0];
            }), p = _.sortBy(u[1], function(t) {
                return t[0];
            }), m = {
                snapx: f[0],
                snapy: p[0]
            };
            return (!f[0] || f[0][0] > i) && (m.snapx = [ 0, t ]), (!p[0] || p[0][0] > i) && (m.snapy = [ 0, e ]), 
            m;
        },
        offset_point_in_wrapper: function(t) {
            var e = this.vm.$root, s = $(this.el)[0], o = e.viewport_zoom, i = parseInt($("#space").css("padding-top"));
            return t.y = (t.y + s.scrollTop - i) / o, t.x = (t.x + s.scrollLeft) / o, t;
        },
        start_drawing_scribble: function(t) {
            t.preventDefault(), t.stopPropagation();
            var e = this.vm.$root, s = this.offset_point_in_wrapper(this.cursor_point_to_space(t)), o = e.highest_z() + 1;
            e.deselect();
            var i = {
                space_id: e.active_space._id,
                mime: "x-spacedeck/vector",
                description: "",
                control_points: [ {
                    dx: 0,
                    dy: 0
                } ],
                board: {
                    x: s.x,
                    y: s.y,
                    z: o,
                    w: 64,
                    h: 64
                },
                style: {
                    stroke_color: "#000000",
                    stroke: 2,
                    shape: "scribble"
                }
            };
            e.save_artifact(i, function(s) {
                e.update_board_artifact_viewmodel(s), e.active_space_artifacts.push(s), this.select(t, s), 
                e.transform_ox = 0, e.transform_oy = 0, e.begin_transaction();
            }.bind(this));
        },
        start_drawing_arrow: function(t) {
            t.preventDefault(), t.stopPropagation();
            var e = this.vm.$root, s = this.cursor_point_to_space(t);
            this.offset_point_in_wrapper(s);
            var o = e.highest_z() + 1, i = {
                space_id: e.active_space._id,
                mime: "x-spacedeck/vector",
                description: "",
                control_points: [ {
                    dx: 0,
                    dy: 0
                }, {
                    dx: 0,
                    dy: 0
                }, {
                    dx: 0,
                    dy: 0
                } ],
                board: {
                    x: s.x,
                    y: s.y,
                    z: o,
                    w: 64,
                    h: 64
                },
                style: {
                    stroke_color: "#000000",
                    stroke: 2,
                    shape: "arrow"
                }
            };
            e.save_artifact(i, function(s) {
                e.update_board_artifact_viewmodel(s), e.active_space_artifacts.push(s), e.select(t, i), 
                e.selected_control_point_idx = 1, e.transform_ox = 0, e.transform_oy = 0, e.begin_transaction();
            }.bind(this));
        },
        start_drawing_line: function(t) {
            t.preventDefault(), t.stopPropagation();
            var e = this.vm.$root, s = this.cursor_point_to_space(t);
            this.offset_point_in_wrapper(s);
            var o = e.highest_z() + 1, i = {
                space_id: e.active_space._id,
                mime: "x-spacedeck/vector",
                description: "",
                control_points: [ {
                    dx: 0,
                    dy: 0
                }, {
                    dx: 0,
                    dy: 0
                } ],
                board: {
                    x: s.x,
                    y: s.y,
                    z: o,
                    w: 64,
                    h: 64
                },
                style: {
                    stroke_color: "#000000",
                    stroke: 2,
                    shape: "line"
                }
            };
            e.save_artifact(i, function(s) {
                e.update_board_artifact_viewmodel(s), e.active_space_artifacts.push(s), e.select(t, i), 
                e.selected_control_point_idx = 1, e.transform_ox = 0, e.transform_oy = 0, e.begin_transaction();
            }.bind(this));
        },
        snap_point_simple: function(t) {
            var e = this.snap_point(t.x, t.y);
            return {
                x: e.snapx[1],
                y: e.snapy[1]
            };
        },
        handle_mouse_up_space: function(t) {
            var e = this.vm.$root;
            if (t.preventDefault(), "lasso" == this.mouse_state) {
                var s = this.abs_rect(this.offset_point_in_wrapper(this.lasso));
                if (s.w > 0 && s.h > 0) {
                    var o = this.artifacts_in_rect(s);
                    this.multi_select(o);
                } else this._no_artifact_toolbar_this_round ? this._no_artifact_toolbar_this_round = !1 : e.start_adding_artifact(t);
                this.lasso = null, this.render_lasso();
            } else if (_.include([ "transform", "move", "vector_transform", "scribble" ], this.mouse_state)) for (var i = e.selected_artifacts(), a = 0; a < i.length; a++) _.include([ "text", "placeholder" ], e.artifact_major_type(i[a])) && (i[a].board.w < 10 && (i[a].board.w = 10), 
            i[a].board.h < 10 && (i[a].board.h = 10));
            if ("text_editor" != this.mouse_state) {
                if (_.include([ "zoom" ], e.active_tool)) return this.mouse_state = "idle", e.mouse_state = this.mouse_state, 
                e.end_transaction(), void e.deselect();
                this.mouse_state = "idle", e.mouse_state = this.mouse_state, this.lasso = null, 
                e.active_tool = "pointer", e.end_transaction(), e.show_toolbar_props();
            }
        },
        handle_mouse_leave: function(t) {
            var e = this.vm.$root;
            this.mouse_state = "idle", this.lasso = null, e.active_tool = "pointer", e.end_transaction(), 
            this.render_lasso();
        },
        handle_mouse_move: function(t) {
            var e = this.vm.$root;
            if (e.active_space) {
                e.editing_artifact_id || (t.preventDefault(), t.stopPropagation()), e.handle_scroll();
                var s = this.cursor_point_to_space(t), o = s.x - e.mouse_ox, i = s.y - e.mouse_oy, a = new Date().getTime() - this.last_mouse_move_time;
                this.last_mouse_move_time = new Date().getTime();
                var n = e.viewport_zoom || 1;
                if (n && (o /= n, i /= n), o > 10 || i > 10 || a > 100) {
                    var r = "anonymous";
                    r = e.logged_in ? e.user.nickname || e.user.email : e.guest_nickname || "anonymous";
                    var d = {
                        action: "cursor",
                        x: s.x / n,
                        y: s.y / n,
                        name: r,
                        id: e.user._id || r
                    };
                    e.websocket_send(d);
                }
                if (e.snap_ruler_x = -1e3, e.snap_ruler_y = -1e3, e.mouse_moved = !0, e.transform_lock = t.shiftKey, 
                e.transform_lock && ("transform" == this.mouse_state || (Math.abs(i) > Math.abs(o) ? o = 0 : i = 0)), 
                "move" == this.mouse_state) {
                    e.hide_toolbar_props();
                    var c = 0, h = 0, l = e.selected_artifacts(), u = this.old_selection_rect();
                    if (l.length && l[0]._id == e.editing_artifact_id) return;
                    if (u) {
                        var f = u.x1 + (u.x2 - u.x1) / 2, p = u.y1 + (u.y2 - u.y1) / 2, m = this.snap_point(u.x1 + o, u.y1 + i, !1), v = this.snap_point(u.x2 + o, u.y2 + i, !1), b = this.snap_point(f + o, p + i, !0);
                        c = b.snapx[0] > 0 ? f + o - b.snapx[1] : v.snapx[0] > 0 ? u.x2 + o - v.snapx[1] : u.x1 + o - m.snapx[1], 
                        h = b.snapy[0] > 0 ? p + i - b.snapy[1] : v.snapy[0] > 0 ? u.y2 + i - v.snapy[1] : u.y1 + i - m.snapy[1];
                    }
                    e.update_selected_artifacts(function(t) {
                        var s = e.find_artifact_before_transaction(t);
                        return s ? {
                            board: _.extend(t.board, {
                                x: s.board.x + o - c,
                                y: s.board.y + i - h
                            })
                        } : {};
                    }.bind(this));
                } else if ("transform" == this.mouse_state) {
                    var l = e.selected_artifacts(), y = this.old_selection_rect();
                    if (!y) return void (this.mouse_state = "idle");
                    e.hide_toolbar_props();
                    var x = y.x2 - y.x1, w = y.y2 - y.y1, g = y.x1 + x * e.transform_ox, z = y.y1 + w * e.transform_oy, k = y.x1 + x * (1 - e.transform_ox) - g, M = y.y1 + w * (1 - e.transform_oy) - z, D = this.snap_point(g + k + o, z + M + i), I = D.snapx[1] - g, P = D.snapy[1] - z, T = k ? I / k : 1, K = M ? P / M : 1;
                    e.transform_lock && (K = T), e.update_selected_artifacts(function(t) {
                        var s = e.find_artifact_before_transaction(t), o = g + (s.board.x - g) * T, i = z + (s.board.y - z) * K, a = g + (s.board.x + s.board.w - g) * T, n = z + (s.board.y + s.board.h - z) * K;
                        if (o > a) {
                            var r = o;
                            o = a, a = r;
                        }
                        if (i > n) {
                            var r = i;
                            i = n, n = r;
                        }
                        return {
                            board: _.extend(t.board, {
                                x: o,
                                y: i,
                                w: a - o,
                                h: n - i
                            })
                        };
                    }.bind(this));
                } else if ("lasso" == this.mouse_state) this.lasso.w = o, this.lasso.h = i, this.render_lasso(); else if ("vector_transform" == this.mouse_state) {
                    e.hide_toolbar_props();
                    var L = this;
                    e.update_selected_artifacts(function(t) {
                        var s = e.find_artifact_before_transaction(t), a = _.cloneDeep(s.control_points), n = _.clone(s.board), r = a[e.selected_control_point_idx], d = L.snap_point(n.x + r.dx + o, n.y + r.dy + i);
                        return o = d.snapx[1] - (n.x + r.dx), i = d.snapy[1] - (n.y + r.dy), r.dx += o, 
                        r.dy += i, "arrow" == t.style.shape && 2 != e.selected_control_point_idx && (a[2].dx = (a[0].dx + a[1].dx) / 2, 
                        a[2].dy = (a[0].dy + a[1].dy) / 2), L.normalize_control_points(a, n);
                    });
                } else if ("scribble" == this.mouse_state) {
                    e.update_selected_artifacts(function(t) {
                        var e = t, o = _.cloneDeep(e.control_points), i = _.clone(e.board), a = this.offset_point_in_wrapper({
                            x: s.x,
                            y: s.y
                        });
                        return o.push({
                            dx: a.x - i.x,
                            dy: a.y - i.y
                        }), this.normalize_control_points(simplify_scribble_points(o), i);
                    }.bind(this));
                    var B = e.selected_artifacts();
                    B.length && e.update_board_artifact_viewmodel(B[0]);
                } else if ("pan" == this.mouse_state) {
                    if (!$("#space").length) return;
                    el = $("#space")[0], el.scrollLeft = this.old_panx - o * e.viewport_zoom, el.scrollTop = this.old_pany - i * e.viewport_zoom, 
                    e.handle_scroll();
                }
            }
        },
        normalize_control_points: function(t, e) {
            var s = _.min(t, "dx").dx, o = _.min(t, "dy").dy, i = _.max(t, "dx").dx, a = _.max(t, "dy").dy, n = -s, r = -o, d = t.map(function(t) {
                return {
                    dx: t.dx + n,
                    dy: t.dy + r
                };
            }), c = Math.abs(i - s), h = Math.abs(a - o), l = 0, u = 0;
            e.w < 0 && (l = -e.w), e.h < 0 && (u = -e.h);
            var f = {
                x: e.x + l - n,
                y: e.y + u - r,
                w: c,
                h: h,
                z: e.z
            };
            return {
                board: f,
                control_points: d
            };
        }
    });
}
function setup_directives() {
    if (Vue.directive("clipboard", {
        bind: function() {
            this.clipboard = new Clipboard(".clipboard-btn");
        },
        update: function(e) {},
        unbind: function() {
            this.clipboard.destroy();
        }
    }), Vue.directive("t", {
        update: function(e, t) {
            this.el.innerHTML = t;
        }
    }), "ontouchstart" in window) var e = "touchstart", t = "touchmove", a = "touchend"; else var e = "mousedown", t = "mousemove", a = "mouseup";
    Vue.directive("videoplayer", {
        update: function(t) {
            var a = this.el, i = (this.vm.$root, a.querySelectorAll("video")[0]), r = a.querySelectorAll(".play")[0], n = a.querySelectorAll(".pause")[0], o = a.querySelectorAll(".stop")[0], d = "stop", s = function() {
                try {
                    t.player_view || (t.player_view = {}), t.player_view.state = d;
                } catch (e) {}
            }, c = function() {
                i.play(), d = "playing", s();
            }, u = function() {
                try {
                    i.pause(), d = "paused", s();
                } catch (e) {}
            }, l = function() {
                try {
                    d = "stop", i.pause(), i.currentTime = 0, s();
                } catch (e) {}
            };
            a.addEventListener("remote_play", c), a.addEventListener("remote_pause", u), a.addEventListener("remote_stop", l), 
            r.addEventListener(e, function(e) {
                try {
                    c(), spacedeck.presenter_send_media_action(t._id, "video", "play", i.currentTime);
                } catch (a) {}
            }, !1), n.addEventListener(e, function(e) {
                u(), spacedeck.presenter_send_media_action(t._id, "video", "pause", i.currentTime);
            }, !1), o.addEventListener(e, function(e) {
                l(), spacedeck.presenter_send_media_action(t._id, "video", "stop", 0);
            }, !1);
        }
    }), Vue.directive("audioplayer", {
        update: function(t) {
            var a = this.el, i = this.vm.$root, r = a.querySelectorAll(".play")[0], n = a.querySelectorAll(".pause")[0], o = a.querySelectorAll(".stop")[0], d = a.querySelectorAll(".timeline")[0], s = a.querySelectorAll(".set-inpoint")[0], c = a.querySelectorAll(".set-outpoint")[0], u = a.querySelectorAll(".reset-points")[0], l = "stop", p = 0, f = 0, m = a.querySelectorAll("audio")[0], v = function() {
                try {
                    t.meta ? (t.meta.play_to || (t.meta.play_to = m.duration), p = parseFloat(t.meta.play_from) || 0, 
                    f = parseFloat(t.meta.play_to) || 0) : (p = 0, f = parseFloat(m.duration) || 0, 
                    t.meta = {});
                } catch (e) {}
            }, _ = function() {
                try {
                    t.player_view || (t.player_view = {}), t.player_view.state = l, t.player_view.total_time_string = format_time(m.duration), 
                    t.player_view.current_time_string = format_time(m.currentTime), t.player_view.current_time_float = m.currentTime / m.duration, 
                    t.player_view.inpoint_float = p / m.duration, t.player_view.outpoint_float = f / m.duration, 
                    t.player_view.duration = m.duration;
                } catch (e) {}
            }, h = function() {
                try {
                    m.pause(), l = "paused";
                } catch (e) {}
                _();
            }, y = function() {
                try {
                    m.currentTime = p, m.pause(), l = "stop";
                } catch (e) {}
                _();
            };
            _(), m.addEventListener("loadedmetadata", function(e) {
                v(), _();
            }, !1), m.addEventListener("timeupdate", function(e) {
                try {
                    v(), m.currentTime >= f && "playing" == l && y(), _();
                } catch (t) {}
            }, !1);
            var g = function() {
                "stop" == l && (m.currentTime = p), l = "playing", v(), m.play(), _();
            }, b = function() {
                h(), _();
            }, w = function() {
                y(), _();
            };
            a.addEventListener("remote_play", g), a.addEventListener("remote_pause", b), a.addEventListener("remote_stop", w), 
            r.addEventListener(e, function(e) {
                try {
                    g(), spacedeck.presenter_send_media_action(t._id, "audio", "play", m.currentTime);
                } catch (a) {}
            }, !1), n.addEventListener(e, function(e) {
                b(), spacedeck.presenter_send_media_action(t._id, "audio", "pause", m.currentTime);
            }, !1), o.addEventListener(e, function(e) {
                w(), spacedeck.presenter_send_media_action(t._id, "audio", "stop", 0);
            }, !1), d.addEventListener(e, function(e) {
                var t = parseFloat(e.offsetX) / e.currentTarget.offsetWidth * m.duration;
                isNaN(t) && (t = 0);
                try {
                    m.currentTime = t;
                } catch (a) {}
            }, !1), s.addEventListener(e, function(e) {
                t.meta || (t.meta = {}), t.meta.play_from = m.currentTime, t.meta.play_to < t.meta.play_from && (t.meta.play_to = m.duration), 
                v(), y(), _(), i.save_artifact(t);
            }, !1), c.addEventListener(e, function(e) {
                t.meta || (t.meta = {}), t.meta.play_to = m.currentTime, t.meta.play_to < t.meta.play_from && (t.meta.play_from = 0), 
                v(), y(), _(), i.save_artifact(t);
            }, !1), u.addEventListener(e, function(e) {
                t.meta || (t.meta = {}), t.meta.play_from = 0, t.meta.play_to = m.duration, v(), 
                y(), _(), i.save_artifact(t);
            }, !1);
        }
    }), Vue.directive("sd-richtext", {
        twoWay: !0,
        update: function(e) {
            this.mode = "rich", $(this.el).addClass("text-editing"), this.medium = new Medium({
                element: this.el,
                mode: Medium.richMode,
                attributes: {
                    remove: [ "class", "href", "onclick", "onmousedown", "onmouseup" ]
                }
            }), this.medium.value(e.description), this.medium.element.addEventListener("keyup", function() {
                e.description = this.medium.value(), spacedeck.queue_artifact_for_save(e);
            }.bind(this)), spacedeck.medium_for_object[e._id] = this.medium;
        }
    }), Vue.directive("focus", {
        bind: function() {
            var e = this.el;
            window.setTimeout(function() {
                if (e.contentEditable && "inherit" != e.contentEditable) {
                    var t = document.createRange();
                    t.selectNodeContents(e);
                } else e.focus(), e.select();
            }, 500);
        }
    }), Vue.directive("sd-draggable", {
        update: function(e) {
            var t = this.el;
            t.addEventListener("dragstart", function(a) {
                return $(t).find(".text-editing").length ? (a.stopPropagation(), void a.preventDefault()) : (a.dataTransfer.setData("application/json", JSON.stringify(e)), 
                void $(t).addClass("dragging"));
            }, !1);
        }
    }), Vue.directive("sd-droppable", {
        isFn: !0,
        bind: function() {
            var e = this.el, t = this.expression, a = t.split(";"), i = a[0], r = a[1];
            e.addEventListener("dragover", function(t) {
                return t.dataTransfer.dropEffect = "copy", t.preventDefault && t.preventDefault(), 
                e.classList.add("over"), !1;
            }.bind(this), !1), e.addEventListener("dragenter", function(t) {
                return e.classList.add("over"), !1;
            }.bind(this), !1), e.addEventListener("dragleave", function(t) {
                return e.classList.remove("over"), !1;
            }, !1), e.addEventListener("drop", function(e) {
                e.stopPropagation(), e.preventDefault(), $(e.currentTarget).find(".over").removeClass("over"), 
                $(e.currentTarget).find(".dragging").removeClass("dragging");
                var t = this.vm.$root[i].bind(this.vm.$root);
                if (this._scope) var a = this._scope[r]; else var a = this.vm[r];
                return t(e, a), !1;
            }.bind(this), !1);
        }
    }), Vue.directive("sd-fader", {
        bind: function(i) {
            function r(e, t, a) {
                return Math.max(t, Math.min(a, e));
            }
            var n = this.vm.$root;
            this.fader_state = "idle", this.fader_mx = 0, this.fader_my = 0;
            var o = $(this.el), d = o.find(".fader-selector"), s = o.find(".fader-indicator"), c = o.find(".fader-constraint");
            c.length || (c = o);
            var u = o.attr("sd-fader-var-x"), l = o.attr("sd-fader-var-y"), p = 0, f = 0, m = 0, v = 0, _ = 0, h = 0;
            g && (h = n.$get(u));
            var y = 0;
            b && (y = n.$get(l));
            var g = !!u, b = !!l, w = !d[0], L = parseFloat(o.attr("sd-fader-step")) || 1, E = parseFloat(o.attr("sd-fader-sens")) || 1, x = function() {
                f = parseInt(o.attr("sd-fader-min-x")) || 0, m = parseInt(o.attr("sd-fader-min-y")) || 0, 
                v = parseInt(o.attr("sd-fader-max-x")) || c.width() - 1, _ = parseInt(o.attr("sd-fader-max-y")) || c.height() - 1;
            }, T = function() {
                x(), h && !isNaN(h) || (h = 0), y && !isNaN(y) || (y = 0), d[0] && (g && (d[0].style.left = h + "px"), 
                b && (d[0].style.top = _ - y + "px")), s[0] && (s[0].style.height = y + "px");
            }.bind(this), q = function(e, t) {
                x(), g && (h = r(e, f, v), n.$set(u, h)), b && (y = r(t, m, _), L < 1 && (y = y.toFixed(1)), 
                n.$set(l, y));
            }.bind(this), S = function(e) {
                e = fixup_touches(e);
                var t = parseInt((e.pageX - this.fader_mx) * E), a = parseInt((e.pageY - this.fader_my) * E);
                t *= L, a *= L, q(this.fader_oldx + t, this.fader_oldy - a);
            }.bind(this), A = function(e) {
                this.fader_state = "idle", $("body").off(t, S), $("body").off("mouseleave " + a + " blur", A), 
                window._sd_fader_moving = !1;
            }.bind(this);
            o.on(e, function(e) {
                e.preventDefault(), e.stopPropagation(), e = fixup_touches(e);
                var i = $(e.target).offset();
                this.fader_state = "drag", w || q(e.pageX - i.left, _ - (e.pageY - i.top) + p / 2), 
                b && (y = n.$get(l)), $("body").on(t, S), $("body").on("mouseleave " + a + " blur", A), 
                this.fader_mx = e.pageX, this.fader_my = e.pageY, this.fader_oldx = h || 0, this.fader_oldy = y || 0, 
                window._sd_fader_moving = !0;
            }.bind(this)), T(), g && n.$watch(u, function(e) {
                h = parseInt(n.$get(u)), T();
            }), b && n.$watch(l, function(e) {
                y = parseInt(n.$get(l)), T();
            });
        },
        unbind: function() {
            var e = (this.vm.$root, $(this.el));
            e.attr("sd-fader-var-x"), e.attr("sd-fader-var-y");
        }
    });
}
function boot_spacedeck() {
    console.log("booting..."), setup_directives(), setup_whiteboard_directives(), setup_exclusive_audio_video_playback();
    var data = {
        active_view: null,
        online: !0,
        was_offline: !1,
        account: "profile",
        logged_in: !1,
        guest_nickname: null,
        user: {},
        active_profile: null,
        active_profile_spaces: [],
        active_dropdown: "none",
        creating_user: !1,
        signup_error: null,
        login_error: null,
        password_reset_send: !1,
        password_reset_error: null,
        password_reset_email: null,
        password_reset_confirm_error: null,
        reset_token: null,
        global_spinner: !1
    }, methods = {
        activate_dropdown: function(e, t) {
            return this.active_dropdown == e ? void (this.active_dropdown = "none") : void (this.active_dropdown = e);
        },
        close_dropdown: function(e) {
            e && $(e.target).parents(".dropdown").length || (this.active_dropdown = "none");
        },
        translate: function() {
            return i18n.t(arguments);
        }
    };
    methods = _.extend(methods, SpacedeckUsers.methods), methods = _.extend(methods, SpacedeckWebsockets.methods), 
    methods = _.extend(methods, SpacedeckSpaces.methods), methods = _.extend(methods, SpacedeckTeams.methods), 
    methods = _.extend(methods, SpacedeckBoardArtifacts), methods = _.extend(methods, SpacedeckFormatting), 
    methods = _.extend(methods, SpacedeckSections.methods), methods = _.extend(methods, SpacedeckAvatars.methods), 
    methods = _.extend(methods, SpacedeckModals.methods), methods = _.extend(methods, SpacedeckAccount.methods), 
    methods = _.extend(methods, SpacedeckRoutes), data = _.extend(data, SpacedeckUsers.data), 
    data = _.extend(data, SpacedeckAccount.data), data = _.extend(data, SpacedeckWebsockets.data), 
    data = _.extend(data, SpacedeckSpaces.data), data = _.extend(data, SpacedeckTeams.data), 
    data = _.extend(data, SpacedeckSections.data), data = _.extend(data, SpacedeckAvatars.data), 
    data = _.extend(data, SpacedeckModals.data), Vue.filter("select", function(array, key, operant, value) {
        var res = _.filter(array, function(e) {
            var test = eval(e[key] + " " + operant + " " + value);
            return test;
        });
        return res;
    }), Vue.filter("date", function(e, t) {
        var a = moment(e);
        return a.format(t).replace("'", "").replace("'", "");
    }), Vue.filter("exceptFilter", function(e, t) {
        var a = _.filter(e, function(e) {
            return void 0 == e[t];
        });
        return a;
    }), Vue.filter("size", function(e) {
        return e.length;
    }), Vue.filter("empty?", function(e) {
        return 0 == e.length;
    }), Vue.filter("urls_to_links", function(e) {
        return urls_to_links(e);
    }), window.spacedeck = new Vue({
        el: "body",
        data: data,
        methods: methods
    });
    var lang = "en";
    window.refreshLocale = function() {
        spacedeck && spacedeck.user && spacedeck.user.preferences ? lang = spacedeck.user.preferences.language || "en" : window.browser_lang && (lang = window.browser_lang);
    }, window.refreshLocale(), i18n.init({
        lng: lang,
        resStore: window.locales
    }, function(e, t) {
        console.log("i18n initialized: " + lang);
    }), window.__ = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.shift(), window.refreshLocale(), i18n.t(arguments[0], {
            postProcess: "sprintf",
            sprintf: e
        });
    }, spacedeck.setup_section_module(), spacedeck.load_user(function() {
        spacedeck.route();
    }, function() {
        spacedeck.route();
    }), window.addEventListener("paste", function(e) {
        "INPUT" == e.target.nodeName || "TEXTAREA" == e.target.nodeName && "clipboard-ta" != e.target.id || e.target.contenteditable || spacedeck.active_space && spacedeck.handle_section_paste(e);
    });
}

$(document).ready(function() {
    window.smoke = smoke, window.alert = smoke.alert, FastClick.attach(document.body), 
    boot_spacedeck();
});