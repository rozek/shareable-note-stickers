var gr = Object.defineProperty;
var fr = (r, e, t) => e in r ? gr(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var k = (r, e, t) => (fr(r, typeof e != "symbol" ? e + "" : e, t), t);
function H(r) {
  var e = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(r);
  if (e == null)
    throw new Error(r);
  var t = new Error(e[2]);
  throw t.name = e[1], t;
}
function He(r) {
  return typeof r == "boolean" || r instanceof Boolean;
}
function te(r) {
  return typeof r == "number" || r instanceof Number;
}
function O(r) {
  return (typeof r == "number" || r instanceof Number) && isFinite(r.valueOf());
}
function Lt(r, e, t, i, n) {
  if (i === void 0 && (i = !0), n === void 0 && (n = !0), !te(r) || isNaN(r))
    return !1;
  if (O(e)) {
    if (O(t)) {
      if (r < e || !i && r === e || r > t || !n && r === t)
        return !1;
    } else if (r < e || !i && r === e)
      return !1;
  } else if (O(t) && (r > t || !n && r === t))
    return !1;
  return !0;
}
function j(r) {
  return typeof r != "number" && !(r instanceof Number) ? !1 : (r = r.valueOf(), isFinite(r) && Math.round(r) === r);
}
function Nt(r, e, t) {
  if (!j(r) || isNaN(r))
    return !1;
  if (O(e)) {
    if (O(t)) {
      if (r < e || r > t)
        return !1;
    } else if (r < e)
      return !1;
  } else if (O(t) && r > t)
    return !1;
  return !0;
}
function de(r) {
  return typeof r != "number" && !(r instanceof Number) ? !1 : (r = r.valueOf(), isFinite(r) && Math.round(r) === r && r >= 0);
}
function pr(r) {
  return typeof r != "number" && !(r instanceof Number) ? !1 : (r = r.valueOf(), isFinite(r) && Math.round(r) === r && r >= 1);
}
function z(r) {
  return typeof r == "string" || r instanceof String;
}
function M(r, e) {
  return (typeof r == "string" || r instanceof String) && e.test(r.valueOf());
}
var Sr = /^[^\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function Ae(r) {
  return M(r, Sr);
}
var br = /^[^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function G(r) {
  return M(r, br);
}
function Te(r) {
  return typeof r == "function";
}
function at(r) {
  return r != null && typeof r == "object";
}
function he(r) {
  return r != null && typeof r == "object" && Object.getPrototypeOf(r) === Object.prototype;
}
var Ct = Array.isArray;
function Be(r, e, t) {
  if (Ct(r)) {
    for (var i = 0, n = r.length; i < n; i++)
      if (r[i] === void 0)
        return !1;
    return !0;
  }
  return !1;
}
function ge(r, e, t, i) {
  if (Ct(r))
    try {
      for (var n = 0, o = r.length; n < o; n++)
        if (e(r[n]) == !1)
          return !1;
      return !(t != null && r.length < t || i != null && r.length > i);
    } catch {
    }
  return !1;
}
function Vt(r, e) {
  return e.indexOf(r) >= 0;
}
function Ge(r) {
  return z(r) && (Vr.hasOwnProperty(r) || /^#[a-fA-F0-9]{6}$/.test(r) || /^#[a-fA-F0-9]{8}$/.test(r) || /^rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\)$/.test(r) || // not perfect
  /^rgba\([0-9]+,\s*[0-9]+,\s*[0-9]+,([01]|[0]?[.][0-9]+)\)$/.test(r));
}
var mr = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
function Dt(r) {
  return M(r, mr);
}
var vr = /^[^\s\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function st(r) {
  if (!M(r, vr) || r === "")
    return !1;
  try {
    return new URL(r, "file://"), !0;
  } catch {
    return !1;
  }
}
var B = !1, $ = !0;
function kr(r, e, t, i, n) {
  if (e == null) {
    if (i)
      return e;
    H("MissingArgument: no ".concat(D(r), " given"));
  } else if (t(e))
    switch (!0) {
      case e instanceof Boolean:
      case e instanceof Number:
      case e instanceof String:
        return e.valueOf();
      default:
        return e;
    }
  else
    H("InvalidArgument: the given ".concat(D(r), " is no valid ").concat(D(n)));
}
function v(r, e, t) {
  var i = function(u, s) {
    return kr(u, s, r, e, t);
  }, n = r.name;
  if (n != null && /^ValueIs/.test(n)) {
    var o = n.replace(
      // derive name from validator
      /^ValueIs/,
      e ? "allow" : "expect"
    );
    return _r(i, o);
  } else
    return i;
}
function _r(r, e) {
  if (r == null && H("MissingArgument: no function given"), typeof r != "function" && H("InvalidArgument: the given 1st Argument is not a JavaScript function"), e == null && H("MissingArgument: no desired name given"), typeof e != "string" && !(e instanceof String) && H("InvalidArgument: the given desired name is not a string"), r.name === e)
    return r;
  try {
    if (Object.defineProperty(r, "name", { value: e }), r.name === e)
      return r;
  } catch {
  }
  var t = new Function("originalFunction", "return function " + e + " () {return originalFunction.apply(this,Array.prototype.slice.apply(arguments))}");
  return t(r);
}
function Mt(r, e) {
  if (e == null)
    H("MissingArgument: no ".concat(D(r), " given"));
  else
    return e.valueOf();
}
var xr = /* @__PURE__ */ v(He, $, "boolean value"), Xe = /* @__PURE__ */ v(He, B, "boolean value"), me = /* @__PURE__ */ v(j, $, "integral numeric value"), Y = /* @__PURE__ */ v(j, B, "integral numeric value");
function wr(r, e, t, i) {
  return e == null ? e : $r(r, e, t, i);
}
function se(r, e, t, i) {
  if (Y(r, e), isNaN(e) && H("InvalidArgument: the given ".concat(D(r), " is not-a-number")), t != null && isFinite(t)) {
    if (i != null && isFinite(i)) {
      if (e < t || e > i)
        throw new RangeError("the given ".concat(D(r), " (").concat(e, ") is outside ") + "the allowed range (".concat(t, "...").concat(i, ")"));
    } else if (e < t)
      throw new RangeError("the given ".concat(D(r), " is below the allowed ") + "minimum (".concat(e, " < ").concat(t, ")"));
  } else if (i != null && isFinite(i) && e > i)
    throw new RangeError("the given ".concat(D(r), " exceeds the allowed ") + "maximum (".concat(e, " > ").concat(i, ")"));
  return e.valueOf();
}
var $r = se, Ie = /* @__PURE__ */ v(de, $, "ordinal number"), Pe = /* @__PURE__ */ v(de, B, "ordinal number"), vt = /* @__PURE__ */ v(pr, $, "cardinal number"), kt = /* @__PURE__ */ v(Ae, $, "literal text"), yr = /* @__PURE__ */ v(G, $, "single line of text"), Ke = /* @__PURE__ */ v(G, B, "single line of text"), ve = /* @__PURE__ */ v(Te, $, "JavaScript function"), oe = /* @__PURE__ */ v(Te, B, "JavaScript function"), Br = /* @__PURE__ */ v(he, $, '"plain" JavaScript object');
function Ir(r, e, t, i, n, o) {
  if (e == null && H("MissingArgument: no ".concat(D(r), " given")), ge(e, t, n, o))
    return e;
  H("InvalidArgument: the given ".concat(D(r), " is ") + (i == null ? "either not a list or contains invalid elements" : "no " + D(i)));
}
function Fr(r, e, t) {
  return e == null ? e : Nr(r, e, t);
}
function Lr(r, e, t) {
  if (e == null && H("MissingArgument: no ".concat(D(r), " given")), Vt(e, t))
    return (
      // unboxes any primitives
      e == null || typeof e.valueOf != "function" ? e : e.valueOf()
    );
  H("InvalidArgument: the given ".concat(D(r), " is not among the supported values"));
}
var Nr = Lr, _t = /* @__PURE__ */ v(Ge, $, "CSS color specification"), Wt = /* @__PURE__ */ v(st, $, "URL");
function D(r) {
  var e = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?/g, t = /[\x00-\x1f\x7f-\x9f]/g;
  return r.replace(e, function(i) {
    return i === "\\" ? "\\\\" : i;
  }).replace(t, function(i) {
    switch (i) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case `
`:
        return "\\n";
      case "\r":
        return "\\r";
      case "	":
        return "\\t";
      case "\v":
        return "\\v";
      default: {
        var n = i.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(n.length) + n;
      }
    }
  });
}
function Cr(r, e) {
  e === void 0 && (e = '"');
  var t = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|'/g, i = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|"/g, n = /[\x00-\x1f\x7f-\x9f]/g;
  return r.replace(e === "'" ? t : i, function(o) {
    switch (o) {
      case "'":
        return "\\'";
      case '"':
        return '\\"';
      case "\\":
        return "\\\\";
      default:
        return o;
    }
  }).replace(n, function(o) {
    switch (o) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case `
`:
        return "\\n";
      case "\r":
        return "\\r";
      case "	":
        return "\\t";
      case "\v":
        return "\\v";
      default: {
        var u = o.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(u.length) + u;
      }
    }
  });
}
function X(r, e) {
  return e === void 0 && (e = '"'), e + Cr(r, e) + e;
}
function ae(r, e, t) {
  if (r === e)
    return !1;
  var i = typeof r;
  if (i !== typeof e)
    return !0;
  function n(u, s, l) {
    if (!Array.isArray(s) || u.length !== s.length)
      return !0;
    for (var a = 0, d = u.length; a < d; a++)
      if (ae(u[a], s[a]))
        return !0;
    return !1;
  }
  function o(u, s, l) {
    if (Object.getPrototypeOf(u) !== Object.getPrototypeOf(s))
      return !0;
    for (var a in u)
      if (!(a in s))
        return !0;
    for (var a in s)
      if (!(a in u) || ae(u[a], s[a]))
        return !0;
    return !1;
  }
  switch (i) {
    case "undefined":
    case "boolean":
    case "string":
    case "function":
      return !0;
    case "number":
      return isNaN(r) !== isNaN(e) || Math.abs(r - e) > Number.EPSILON;
    case "object":
      return r == null || e == null ? !0 : Array.isArray(r) ? n(r, e) : o(r, e);
    default:
      return !0;
  }
  return !0;
}
var Vr = {
  transparent: "rgba(0,0,0,0,0.0)",
  aliceblue: "rgba(240,248,255,1.0)",
  lightpink: "rgba(255,182,193,1.0)",
  antiquewhite: "rgba(250,235,215,1.0)",
  lightsalmon: "rgba(255,160,122,1.0)",
  aqua: "rgba(0,255,255,1.0)",
  lightseagreen: "rgba(32,178,170,1.0)",
  aquamarine: "rgba(127,255,212,1.0)",
  lightskyblue: "rgba(135,206,250,1.0)",
  azure: "rgba(240,255,255,1.0)",
  lightslategray: "rgba(119,136,153,1.0)",
  beige: "rgba(245,245,220,1.0)",
  lightslategrey: "rgba(119,136,153,1.0)",
  bisque: "rgba(255,228,196,1.0)",
  lightsteelblue: "rgba(176,196,222,1.0)",
  black: "rgba(0,0,0,1.0)",
  lightyellow: "rgba(255,255,224,1.0)",
  blanchedalmond: "rgba(255,235,205,1.0)",
  lime: "rgba(0,255,0,1.0)",
  blue: "rgba(0,0,255,1.0)",
  limegreen: "rgba(50,205,50,1.0)",
  blueviolet: "rgba(138,43,226,1.0)",
  linen: "rgba(250,240,230,1.0)",
  brown: "rgba(165,42,42,1.0)",
  magenta: "rgba(255,0,255,1.0)",
  burlywood: "rgba(222,184,135,1.0)",
  maroon: "rgba(128,0,0,1.0)",
  cadetblue: "rgba(95,158,160,1.0)",
  mediumaquamarine: "rgba(102,205,170,1.0)",
  chartreuse: "rgba(127,255,0,1.0)",
  mediumblue: "rgba(0,0,205,1.0)",
  chocolate: "rgba(210,105,30,1.0)",
  mediumorchid: "rgba(186,85,211,1.0)",
  coral: "rgba(255,127,80,1.0)",
  mediumpurple: "rgba(147,112,219,1.0)",
  cornflowerblue: "rgba(100,149,237,1.0)",
  mediumseagreen: "rgba(60,179,113,1.0)",
  cornsilk: "rgba(255,248,220,1.0)",
  mediumslateblue: "rgba(123,104,238,1.0)",
  crimson: "rgba(220,20,60,1.0)",
  mediumspringgreen: "rgba(0,250,154,1.0)",
  cyan: "rgba(0,255,255,1.0)",
  mediumturquoise: "rgba(72,209,204,1.0)",
  darkblue: "rgba(0,0,139,1.0)",
  mediumvioletred: "rgba(199,21,133,1.0)",
  darkcyan: "rgba(0,139,139,1.0)",
  midnightblue: "rgba(25,25,112,1.0)",
  darkgoldenrod: "rgba(184,134,11,1.0)",
  mintcream: "rgba(245,255,250,1.0)",
  darkgray: "rgba(169,169,169,1.0)",
  mistyrose: "rgba(255,228,225,1.0)",
  darkgreen: "rgba(0,100,0,1.0)",
  moccasin: "rgba(255,228,181,1.0)",
  darkgrey: "rgba(169,169,169,1.0)",
  navajowhite: "rgba(255,222,173,1.0)",
  darkkhaki: "rgba(189,183,107,1.0)",
  navy: "rgba(0,0,128,1.0)",
  darkmagenta: "rgba(139,0,139,1.0)",
  oldlace: "rgba(253,245,230,1.0)",
  darkolivegreen: "rgba(85,107,47,1.0)",
  olive: "rgba(128,128,0,1.0)",
  darkorange: "rgba(255,140,0,1.0)",
  olivedrab: "rgba(107,142,35,1.0)",
  darkorchid: "rgba(153,50,204,1.0)",
  orange: "rgba(255,165,0,1.0)",
  darkred: "rgba(139,0,0,1.0)",
  orangered: "rgba(255,69,0,1.0)",
  darksalmon: "rgba(233,150,122,1.0)",
  orchid: "rgba(218,112,214,1.0)",
  darkseagreen: "rgba(143,188,143,1.0)",
  palegoldenrod: "rgba(238,232,170,1.0)",
  darkslateblue: "rgba(72,61,139,1.0)",
  palegreen: "rgba(152,251,152,1.0)",
  darkslategray: "rgba(47,79,79,1.0)",
  paleturquoise: "rgba(175,238,238,1.0)",
  darkslategrey: "rgba(47,79,79,1.0)",
  palevioletred: "rgba(219,112,147,1.0)",
  darkturquoise: "rgba(0,206,209,1.0)",
  papayawhip: "rgba(255,239,213,1.0)",
  darkviolet: "rgba(148,0,211,1.0)",
  peachpuff: "rgba(255,218,185,1.0)",
  deeppink: "rgba(255,20,147,1.0)",
  peru: "rgba(205,133,63,1.0)",
  deepskyblue: "rgba(0,191,255,1.0)",
  pink: "rgba(255,192,203,1.0)",
  dimgray: "rgba(105,105,105,1.0)",
  plum: "rgba(221,160,221,1.0)",
  dimgrey: "rgba(105,105,105,1.0)",
  powderblue: "rgba(176,224,230,1.0)",
  dodgerblue: "rgba(30,144,255,1.0)",
  purple: "rgba(128,0,128,1.0)",
  firebrick: "rgba(178,34,34,1.0)",
  red: "rgba(255,0,0,1.0)",
  floralwhite: "rgba(255,250,240,1.0)",
  rosybrown: "rgba(188,143,143,1.0)",
  forestgreen: "rgba(34,139,34,1.0)",
  royalblue: "rgba(65,105,225,1.0)",
  fuchsia: "rgba(255,0,255,1.0)",
  saddlebrown: "rgba(139,69,19,1.0)",
  gainsboro: "rgba(220,220,220,1.0)",
  salmon: "rgba(250,128,114,1.0)",
  ghostwhite: "rgba(248,248,255,1.0)",
  sandybrown: "rgba(244,164,96,1.0)",
  gold: "rgba(255,215,0,1.0)",
  seagreen: "rgba(46,139,87,1.0)",
  goldenrod: "rgba(218,165,32,1.0)",
  seashell: "rgba(255,245,238,1.0)",
  gray: "rgba(128,128,128,1.0)",
  sienna: "rgba(160,82,45,1.0)",
  green: "rgba(0,128,0,1.0)",
  silver: "rgba(192,192,192,1.0)",
  greenyellow: "rgba(173,255,47,1.0)",
  skyblue: "rgba(135,206,235,1.0)",
  grey: "rgba(128,128,128,1.0)",
  slateblue: "rgba(106,90,205,1.0)",
  honeydew: "rgba(240,255,240,1.0)",
  slategray: "rgba(112,128,144,1.0)",
  hotpink: "rgba(255,105,180,1.0)",
  slategrey: "rgba(112,128,144,1.0)",
  indianred: "rgba(205,92,92,1.0)",
  snow: "rgba(255,250,250,1.0)",
  indigo: "rgba(75,0,130,1.0)",
  springgreen: "rgba(0,255,127,1.0)",
  ivory: "rgba(255,255,240,1.0)",
  steelblue: "rgba(70,130,180,1.0)",
  khaki: "rgba(240,230,140,1.0)",
  tan: "rgba(210,180,140,1.0)",
  lavender: "rgba(230,230,250,1.0)",
  teal: "rgba(0,128,128,1.0)",
  lavenderblush: "rgba(255,240,245,1.0)",
  thistle: "rgba(216,191,216,1.0)",
  lawngreen: "rgba(124,252,0,1.0)",
  tomato: "rgba(255,99,71,1.0)",
  lemonchiffon: "rgba(255,250,205,1.0)",
  turquoise: "rgba(64,224,208,1.0)",
  lightblue: "rgba(173,216,230,1.0)",
  violet: "rgba(238,130,238,1.0)",
  lightcoral: "rgba(240,128,128,1.0)",
  wheat: "rgba(245,222,179,1.0)",
  lightcyan: "rgba(224,255,255,1.0)",
  white: "rgba(255,255,255,1.0)",
  lightgoldenrodyellow: "rgba(250,250,210,1.0)",
  whitesmoke: "rgba(245,245,245,1.0)",
  lightgray: "rgba(211,211,211,1.0)",
  yellow: "rgba(255,255,0,1.0)",
  lightgreen: "rgba(144,238,144,1.0)",
  yellowgreen: "rgba(154,205,50,1.0)",
  lightgrey: "rgba(211,211,211,1.0)"
}, Rt, Qe, Ht, Dr = [];
function Mr(r, e, t) {
  var i, n, o, u = {};
  for (o in e)
    o == "key" ? i = e[o] : o == "ref" ? n = e[o] : u[o] = e[o];
  if (arguments.length > 2 && (u.children = arguments.length > 3 ? Rt.call(arguments, 2) : t), typeof r == "function" && r.defaultProps != null)
    for (o in r.defaultProps)
      u[o] === void 0 && (u[o] = r.defaultProps[o]);
  return Wr(r, u, i, n, null);
}
function Wr(r, e, t, i, n) {
  var o = { type: r, props: e, key: t, ref: i, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: n ?? ++Ht, __i: -1, __u: 0 };
  return n == null && Qe.vnode != null && Qe.vnode(o), o;
}
Rt = Dr.slice, Qe = { __e: function(r, e, t, i) {
  for (var n, o, u; e = e.__; )
    if ((n = e.__c) && !n.__)
      try {
        if ((o = n.constructor) && o.getDerivedStateFromError != null && (n.setState(o.getDerivedStateFromError(r)), u = n.__d), n.componentDidCatch != null && (n.componentDidCatch(r, i || {}), u = n.__d), u)
          return n.__E = n;
      } catch (s) {
        r = s;
      }
  throw r;
} }, Ht = 0, typeof Promise == "function" && Promise.prototype.then.bind(Promise.resolve());
var At = function(r, e, t, i) {
  var n;
  e[0] = 0;
  for (var o = 1; o < e.length; o++) {
    var u = e[o++], s = e[o] ? (e[0] |= u ? 1 : 2, t[e[o++]]) : e[++o];
    u === 3 ? i[0] = s : u === 4 ? i[1] = Object.assign(i[1] || {}, s) : u === 5 ? (i[1] = i[1] || {})[e[++o]] = s : u === 6 ? i[1][e[++o]] += s + "" : u ? (n = r.apply(s, At(r, s, t, ["", null])), i.push(n), s[0] ? e[0] |= 2 : (e[o - 2] = 0, e[o] = n)) : i.push(s);
  }
  return i;
}, xt = /* @__PURE__ */ new Map();
function Rr(r) {
  var e = xt.get(this);
  return e || (e = /* @__PURE__ */ new Map(), xt.set(this, e)), (e = At(this, e.get(r) || (e.set(r, e = function(t) {
    for (var i, n, o = 1, u = "", s = "", l = [0], a = function(h) {
      o === 1 && (h || (u = u.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? l.push(0, h, u) : o === 3 && (h || u) ? (l.push(3, h, u), o = 2) : o === 2 && u === "..." && h ? l.push(4, h, 0) : o === 2 && u && !h ? l.push(5, 0, !0, u) : o >= 5 && ((u || !h && o === 5) && (l.push(o, 0, u, n), o = 6), h && (l.push(o, h, 0, n), o = 6)), u = "";
    }, d = 0; d < t.length; d++) {
      d && (o === 1 && a(), a(d));
      for (var c = 0; c < t[d].length; c++)
        i = t[d][c], o === 1 ? i === "<" ? (a(), l = [l], o = 3) : u += i : o === 4 ? u === "--" && i === ">" ? (o = 1, u = "") : u = i + u[0] : s ? i === s ? s = "" : u += i : i === '"' || i === "'" ? s = i : i === ">" ? (a(), o = 1) : o && (i === "=" ? (o = 5, n = u, u = "") : i === "/" && (o < 5 || t[d][c + 1] === ">") ? (a(), o === 3 && (l = l[0]), o = l, (l = l[0]).push(2, 0, o), o = 0) : i === " " || i === "	" || i === `
` || i === "\r" ? (a(), o = 2) : u += i), o === 3 && u === "!--" && (o = 4, l = l[0]);
    }
    return a(), l;
  }(r)), e), arguments, [])).length > 1 ? e : e[0];
}
var Ee = Rr.bind(Mr);
let Hr = (r) => crypto.getRandomValues(new Uint8Array(r)), Ar = (r, e, t) => {
  let i = (2 << Math.log(r.length - 1) / Math.LN2) - 1, n = -~(1.6 * i * e / r.length);
  return (o = e) => {
    let u = "";
    for (; ; ) {
      let s = t(n), l = n;
      for (; l--; )
        if (u += r[s[l] & i] || "", u.length === o)
          return u;
    }
  };
}, Tr = (r, e = 21) => Ar(r, e, Hr);
var Tt = "abcdefghijklmnopqrstuvwxyz", Gt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", Pt = "0123456789", Gr = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz", Pr = "6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz";
const Er = Pt, Ur = Tt, zr = Gt;
var Or = Er + Ur + zr, Zr = {
  lowercase: Tt,
  uppercase: Gt,
  numbers: Pt,
  nolookalikes: Gr,
  nolookalikesSafe: Pr,
  alphanumeric: Or
};
const qr = [
  "String",
  "Number",
  "Object",
  "Array",
  "Boolean",
  "Date"
];
function Ye(r) {
  return r && typeof r == "object";
}
function et(r, e, t) {
  Object.defineProperty(r, e, { value: t, enumerable: !1, configurable: !0 });
}
function wt(r, e, t) {
  et(r, "__key", e), et(r, "__parent", t);
}
function Xr(r) {
  return Object.getOwnPropertyNames(r).concat(
    Object.getPrototypeOf(r) && qr.indexOf(Object.getPrototypeOf(r).constructor.name) < 0 ? Object.getOwnPropertyNames(Object.getPrototypeOf(r)) : []
  ).filter((e) => e !== "constructor" && typeof r[e] == "function");
}
const lt = {
  computedStack: [],
  trackerSymbol: Symbol("tracker")
};
let ee = null;
const Fe = Symbol();
function tt() {
  if (ee) {
    for (const r of ee)
      r(), r[Fe] = !1;
    ee = null;
  }
}
function $t(r, e) {
  r[Fe] || (ee === null && (ee = [], e === !0 ? queueMicrotask(tt) : setTimeout(tt, e)), ee.push(r));
}
const { computedStack: be, trackerSymbol: je } = lt, Je = Symbol("__observed"), U = Symbol("modifiedProperty");
function ke(r, e = {}) {
  const {
    props: t,
    ignore: i,
    batch: n,
    deep: o = !0,
    bubble: u,
    bind: s
  } = e;
  if (r[Je])
    return r;
  const l = (h) => h !== Je && (t == null || t instanceof Array && t.includes(h)) && (i == null || i instanceof Array && !i.includes(h));
  o && Object.entries(r).forEach(function([h, g]) {
    Ye(g) && l(h) && (r[h] = ke(g, e), u && wt(r[h], h, r));
  });
  function a(h, g, f) {
    if (g === "__handler")
      et(h, "__handler", f);
    else if (!l(g))
      h[g] = f;
    else if (Array.isArray(h) && g === "length" || Yr(h[g], f)) {
      const S = g !== U && o && Ye(f), b = h[g];
      h[g] = S ? ke(f, e) : f, S && u && wt(h[g], g, h);
      const m = [g];
      let x = h;
      for (; x && !(x.__handler && x.__handler(m, f, b, c) === !1); )
        x.__key && x.__parent ? (m.unshift(x.__key), x = x.__parent) : x = null;
      const E = d.get(g);
      if (E)
        for (const A of E) {
          const T = A[je], K = T && T.get(h), Se = K && K.has(g);
          A.__disposed || T && !Se ? E.delete(A) : A !== be[0] && (typeof n < "u" && n !== !1 ? ($t(A, n), A[Fe] = !0) : A());
        }
      if (g !== U) {
        h[U] = g;
        const A = d.get(U);
        if (A)
          for (const T of A) {
            const K = T[je], Se = K && K.get(h), hr = Se && Se.has(U);
            T.__disposed || K && !hr ? A.delete(T) : T !== be[0] && (typeof n < "u" && n !== !1 ? ($t(T, n), T[Fe] = !0) : T());
          }
      }
    }
  }
  const d = /* @__PURE__ */ new Map(), c = new Proxy(r, {
    get(h, g) {
      if (g === Je)
        return !0;
      if (l(g) && be.length) {
        const f = be[0], S = f[je];
        if (S) {
          let m = S.get(r);
          m || (m = /* @__PURE__ */ new Set(), S.set(r, m)), m.add(g);
        }
        let b = d.get(g);
        b || (b = /* @__PURE__ */ new Set(), d.set(g, b)), b.add(f);
      }
      return r[g];
    },
    set(h, g, f) {
      return a(r, g, f), !0;
    },
    defineProperty(h, g, f) {
      if (g === "__handler")
        throw new Error("Don't track bubble handlers");
      if (l(g)) {
        if (!Array.isArray(r) || g === "length") {
          "value" in f && o && Ye(f.value) && (f = { ...f }, f.value = ke(f.value, e));
          const S = Reflect.defineProperty(r, g, f);
          return g !== U && (r[U] = g), S;
        }
      } else
        return Reflect.defineProperty(r, g, f);
      return !1;
    },
    deleteProperty(h, g) {
      if (g === U)
        throw new Error(
          'internal property Symbol("modifiedProperty") must not be deleted'
        );
      return g in r && a(r, g, void 0), Reflect.deleteProperty(h, g);
    }
  });
  return s && Xr(r).forEach((h) => r[h] = r[h].bind(c)), c;
}
function Yr(r, e, t) {
  const i = /* @__PURE__ */ new Map();
  function n(o, u, s) {
    if (o === u)
      return !1;
    let l = typeof o;
    if (l !== typeof u)
      return !0;
    function a(c, h, g) {
      if (!Array.isArray(h) || c.length !== h.length)
        return !0;
      if (i.has(c) || i.has(h)) {
        if (i.has(c) && i.get(c).has(h) || i.has(h) && i.get(h).has(c))
          return !1;
        i.has(c) || i.set(c, /* @__PURE__ */ new Set()), i.get(c).add(h);
      }
      for (let f = 0, S = c.length; f < S; f++)
        if (n(c[f], h[f], g))
          return !0;
      return !1;
    }
    function d(c, h, g = "by-value") {
      if (Object.getPrototypeOf(c) !== Object.getPrototypeOf(h))
        return !0;
      for (let f in c)
        if (!(f in h))
          return !0;
      for (let f in h)
        if (!(f in c))
          return !0;
      if (i.has(c) || i.has(h)) {
        if (i.has(c) && i.get(c).has(h) || i.has(h) && i.get(h).has(c))
          return !1;
        i.has(c) || i.set(c, /* @__PURE__ */ new Set()), i.get(c).add(h);
      }
      for (let f in c)
        if (n(c[f], h[f], g))
          return !0;
      return !1;
    }
    switch (l) {
      case "undefined":
      case "boolean":
      case "string":
      case "function":
        return !0;
      case "number":
        return isNaN(o) !== isNaN(u) || Math.abs(o - u) > Number.EPSILON;
      case "object":
        return o == null || u == null ? !0 : s === "by-value" && (o instanceof Boolean || o instanceof Number || o instanceof String) ? o.valueOf() !== u.valueOf() : Array.isArray(o) ? a(o, u, s) : s === "by-reference" ? !0 : d(o, u, s);
      default:
        return !0;
    }
    return !0;
  }
  return n(r, e, t);
}
const { computedStack: yt, trackerSymbol: jr } = lt;
function Jr(r, { autoRun: e = !0, callback: t, bind: i, disableTracking: n = !1 } = {}) {
  function o(l, a = []) {
    const d = t || s;
    n || (d[jr] = /* @__PURE__ */ new WeakMap()), yt.unshift(d), a.length > 0 ? a = [...a, u] : a = [u];
    const c = l ? l() : i ? r.apply(i, a) : r(...a);
    return yt.shift(), c;
  }
  const u = { computeAsync: o }, s = (...l) => o(null, l);
  return e && s(), s;
}
function Kr(r) {
  return r[lt.trackerSymbol] = null, r.__disposed = !0;
}
const Qr = {
  observe: ke,
  modifiedProperty: U,
  computed: Jr,
  dispose: Kr,
  batch: tt
}, Et = G, { observe: ei, computed: Ut, dispose: ti } = Qr, Le = document.createElement("style");
Le.innerHTML = `
/**** DefaultSticker ****/

  .SNS.DefaultSticker {
    left:0px; top:0px; right:0px; bottom:0px;
  }
`;
document.head.appendChild(Le);
const ri = ["normal", "italic"], ii = [
  "missing Behaviour",
  "Behaviour Execution Failure",
  "Script Compilation Failure",
  "Script Execution Failure",
  "Rendering Failure",
  "Event Handling Failure",
  '"onMount" Callback Failure',
  '"onUnmount" Callback Failure'
];
function C(r) {
  let e = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(r);
  if (e == null)
    throw new Error(r);
  {
    let t = new Error(e[2]);
    throw t.name = e[1], t;
  }
}
function _(r) {
  C(
    "ReadOnlyProperty: property " + X(r) + " must not be set"
  );
}
function zt(r) {
  return r instanceof ft;
}
const ni = v(
  zt,
  $,
  "SNS visual"
), Zi = ni, Ot = v(
  zt,
  B,
  "SNS visual"
), qi = Ot;
function le(r) {
  return r instanceof pt;
}
const oi = v(
  le,
  $,
  "SNS folder"
), Xi = oi, ut = v(
  le,
  B,
  "SNS folder"
), Yi = ut;
function fe(r) {
  return r instanceof qe;
}
const ai = v(
  fe,
  $,
  "SNS project"
), ji = ai, W = v(
  fe,
  B,
  "SNS project"
), Ji = W;
function Ne(r) {
  return r instanceof bt;
}
const si = v(
  Ne,
  $,
  "SNS board"
), Ki = si, ct = v(
  Ne,
  B,
  "SNS board"
), Qi = ct;
function Ce(r) {
  return r instanceof mt;
}
const li = v(
  Ce,
  $,
  "SNS sticker"
), en = li, Ue = v(
  Ce,
  B,
  "SNS sticker"
), tn = Ue;
function Zt(r) {
  return G(r);
}
const ui = v(
  Zt,
  $,
  "unique SNS id"
), qt = ui, I = v(
  Zt,
  B,
  "unique SNS id"
), rn = I, ci = /^[a-z$_][a-z$_0-9]*$/i;
function Xt(r) {
  return M(r, ci);
}
const di = v(
  Xt,
  $,
  "note stickers identifier"
), nn = di, re = v(
  Xt,
  B,
  "note stickers identifier"
), on = re;
function ze(r) {
  return G(r);
}
const Yt = v(
  ze,
  $,
  "SNS name"
), an = Yt, ue = v(
  ze,
  B,
  "SNS name"
), sn = ue;
function Z(r) {
  return O(r);
}
const hi = v(
  Z,
  $,
  "sticker coordinate"
), ln = hi, rt = v(
  Z,
  B,
  "sticker coordinate"
), un = rt;
function q(r) {
  return O(r) && r >= 0;
}
const ne = v(
  q,
  $,
  "sticker dimension"
), cn = ne, it = v(
  q,
  B,
  "sticker dimension"
), dn = it;
function jt(r) {
  return at(r) && Z(r.x) && Z(r.y);
}
const gi = v(
  jt,
  $,
  "sticker position"
), hn = gi, Jt = v(
  jt,
  B,
  "sticker position"
), gn = Jt;
function Kt(r) {
  return at(r) && q(r.Width) && q(r.Height);
}
const fi = v(
  Kt,
  $,
  "sticker size"
), fn = fi, Qt = v(
  Kt,
  B,
  "sticker size"
), pn = Qt;
function er(r) {
  return at(r) && Z(r.x) && q(r.Width) && Z(r.y) && q(r.Height);
}
const pi = v(
  er,
  $,
  "sticker geometry"
), Sn = pi, tr = v(
  er,
  B,
  "sticker geometry"
), bn = tr;
function rr(r) {
  return he(r) && Vt(r.Type, ii) && Ae(r.Message);
}
const nt = v(
  rr,
  $,
  "error descriptor"
), mn = nt, Si = v(
  rr,
  B,
  "error descriptor"
), vn = Si;
function ir(r) {
  return he(r);
}
const bi = v(
  ir,
  $,
  "serializable object"
), kn = bi, Oe = v(
  ir,
  B,
  "serializable object"
), _n = Oe, xn = [
  "createBoard",
  "configureFolder",
  "attachBoard",
  "detachBoard",
  "destroyBoard",
  "createSticker",
  "configureSticker",
  "attachSticker",
  "detachSticker",
  "destroySticker"
];
function wn(r, e) {
  if (W("SNS project", r), I("board id", e), e === r.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let t = r.BoardWithId(e);
  if (t != null) {
    console.error('a board with the given "BoardId" exists already');
    return;
  }
  t = new bt(r, e);
}
function $n(r, e, t, i) {
  W("SNS project", r), I("folder id", e), re("property identifier", t);
  let n = r.FolderWithId(e);
  if (n == null) {
    console.error('no folder with the given "FolderId" found');
    return;
  }
  const o = fe(n) ? dr : St;
  if (!(t in o)) {
    console.warn('unsupported folder property "' + t + '"');
    return;
  }
  try {
    n[t] = i;
  } catch {
    console.warn('unsupported "' + t + '" value received');
    return;
  }
}
function yn(r, e, t, i) {
  if (W("SNS project", r), I("board id", e), I("folder id", t), Pe("insertion index", i), e === r.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let n = r.BoardWithId(e);
  if (n == null) {
    console.error('no board with the given "BoardId" found');
    return;
  }
  let o = r.FolderWithId(t);
  if (o == null) {
    console.error('no folder with the given "FolderId" found');
    return;
  }
  if (n === o) {
    console.error("cannot attach a board to itself");
    return;
  }
  if (n.containsFolder(o)) {
    console.error("cannot attach an outer board to one of its inner boards");
    return;
  }
  const u = n.Folder;
  switch (!0) {
    case u === o:
      setTimeout(() => Bt(r, u, n, i), 0);
      break;
    case u != null:
      setTimeout(() => Bt(r, u, n), 0);
  }
  o._attachBoardAt(n, i);
}
function Bn(r, e, t, i) {
  if (W("SNS project", r), I("board id", e), I("folder id", t), Pe("insertion index", i), e === r.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let n = r.BoardWithId(e);
  if (n == null)
    return;
  let o = r.FolderWithId(t);
  o != null && n.Folder === o && o.Board(i) === n && o._detachBoardAt(i);
}
function In(r, e) {
  if (W("SNS project", r), I("board id", e), e === r.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let t = r.BoardWithId(e);
  if (t != null) {
    if (t.Folder != null || t.BoardCount > 0 || t.StickerCount > 0) {
      console.error("cannot destroy a board that is still in use");
      return;
    }
    t._Project = void 0, ar(t);
  }
}
function Fn(r, e) {
  W("SNS project", r), I("sticker id", e);
  let t = r.StickerWithId(e);
  if (t != null) {
    console.error('a sticker with the given "StickerId" exists already');
    return;
  }
  t = new mt(r, e);
}
function Ln(r, e, t, i) {
  W("SNS project", r), I("sticker id", e), re("property identifier", t);
  let n = r.StickerWithId(e);
  if (n == null) {
    console.error('no sticker with the given "StickerId" found');
    return;
  }
  if (!(t in zi)) {
    console.warn('unsupported sticker property "' + t + '"');
    return;
  }
  try {
    n[t] = i;
  } catch {
    console.warn('unsupported "' + t + '" value received');
    return;
  }
}
function Nn(r, e, t, i) {
  W("SNS project", r), I("sticker id", e), I("board id", t), Pe("insertion index", i);
  let n = r.StickerWithId(e);
  if (n == null) {
    console.error('no sticker with the given "StickerId" found');
    return;
  }
  let o = r.BoardWithId(t);
  if (o == null) {
    console.error('no board with the given "BoardId" found');
    return;
  }
  const u = n.Board;
  switch (!0) {
    case u === o:
      setTimeout(() => It(r, u, n, i), 0);
      break;
    case u != null:
      setTimeout(() => It(r, u, n), 0);
  }
  o._attachStickerAt(n, i);
}
function Cn(r, e, t, i) {
  W("SNS project", r), I("sticker id", e), I("board id", t), Pe("insertion index", i);
  let n = r.StickerWithId(e);
  if (n == null)
    return;
  let o = r.BoardWithId(t);
  o != null && n.Board === o && o.Sticker(i) === n && o._detachStickerAt(i);
}
function Vn(r, e) {
  W("SNS project", r), I("sticker id", e);
  let t = r.StickerWithId(e);
  if (t != null) {
    if (t.Board != null) {
      console.error("cannot destroy a sticker that is still in use");
      return;
    }
    t._Project = void 0, sr(t);
  }
}
function Bt(r, e, t, i) {
  W("SNS project", r), ut("folder", e), ct("board", t), Ie("index", i);
  let n = /* @__PURE__ */ new Set();
  const o = e.BoardList;
  for (let u = o.length - 1; u >= 0; u--) {
    const s = o[u];
    s.Folder !== e || //"Board" doesn't belong to "Folder"
    s === t && i !== u || n.has(s) ? e._detachBoardAt(u) : n.add(s);
  }
}
function It(r, e, t, i) {
  W("SNS project", r), ct("board", e), Ue("sticker", t), Ie("index", i);
  let n = /* @__PURE__ */ new Set();
  const o = e.StickerList;
  for (let u = o.length - 1; u >= 0; u--) {
    const s = o[u];
    s.Board !== e || // "Sticker" belongs elsewhere
    s === t && i !== u || n.has(s) ? e._detachStickerAt(u) : n.add(s);
  }
}
const Q = { x: 20, y: 20, Width: 80, Height: 60 }, mi = 10, vi = void 0, ki = 10, _i = void 0, xi = 10, wi = 10;
function $i(r, e) {
  return He(r) ? r : e;
}
function y(r, e) {
  return r == null ? void 0 : He(r) ? r : e;
}
function Ze(r, e) {
  return te(r) ? r : e;
}
function P(r, e) {
  return te(r) ? r : e;
}
function Dn(r, e, t = -1 / 0, i = 1 / 0, n = !1, o = !1) {
  return Lt(r, t, i, n, o) ? r : e;
}
function J(r, e, t = -1 / 0, i = 1 / 0, n = !1, o = !1) {
  return Lt(r, t, i, n, o) ? r : e;
}
function Mn(r, e) {
  return j(r) ? r : e;
}
function Wn(r, e) {
  return j(r) ? r : e;
}
function Rn(r, e, t = -1 / 0, i = 1 / 0) {
  return Nt(r, t, i) ? r : e;
}
function Hn(r, e, t = -1 / 0, i = 1 / 0) {
  return Nt(r, t, i) ? r : e;
}
function An(r, e) {
  return de(r) ? r : e;
}
function V(r, e) {
  return de(r) ? r : e;
}
function Tn(r, e) {
  return z(r) ? r : e;
}
function Gn(r, e) {
  return z(r) ? r : e;
}
function Pn(r, e) {
  return z(r) && r.trim() !== "" ? r : e;
}
function En(r, e) {
  return z(r) && r.trim() !== "" ? r : e;
}
function Un(r, e, t) {
  return M(r, t) ? r : e;
}
function L(r, e, t) {
  return M(r, t) ? r : e;
}
function pe(r, e) {
  return Ae(r) ? r : e;
}
function zn(r, e) {
  return Ae(r) ? r : e;
}
function N(r, e) {
  return (G(r) ? r : e).replace(
    /[\f\r\n\v\u0085\u2028\u2029].*$/,
    "..."
  );
}
function F(r, e) {
  const t = G(r) ? r : e;
  return t == null ? void 0 : t.replace(/[\f\r\n\v\u0085\u2028\u2029].*$/, "...");
}
function On(r, e) {
  return Te(r) ? r : e;
}
function Zn(r, e) {
  return Te(r) ? r : e;
}
function qn(r, e) {
  return Be(r) ? r : e;
}
function Xn(r, e) {
  return Be(r) ? r : e;
}
function nr(r, e, t) {
  return ge(r, t) ? r : e;
}
function R(r, e, t) {
  return ge(r, t) ? r : e;
}
function dt(r, e) {
  return Ge(r) ? r : e;
}
function yi(r, e) {
  return Ge(r) ? r : e;
}
function Bi(r, e) {
  return Dt(r) ? r : e;
}
function Ii(r, e) {
  return Et(r) ? r : e;
}
function ie(r, e) {
  return st(r) ? r : e;
}
function or() {
  return Ee`<div class="SNS DefaultSticker" style=${cr(this)}/>`;
}
function Ve() {
  const r = this.Error;
  return r == null ? or.call(this) : Ee`<div class="SNS DefaultSticker">
      <div class="SNS ErrorIndicator" onClick=${() => this.Project.showError(this, r)}/>
    </div>`;
}
const Fi = Tr(Zr.nolookalikesSafe, 21), De = /* @__PURE__ */ new WeakMap();
function Li(r, e) {
  let t = De.get(r);
  t == null && De.set(r, t = /* @__PURE__ */ Object.create(null));
  const i = e.Id;
  i in t && C(
    "NonUniqueId: the id of the given folder (" + X(i) + ") has already been registered"
  ), t[i] = e;
}
function ar(r) {
  const e = r.Project;
  let t = De.get(e);
  t != null && delete t[r.Id];
}
function Ft(r, e) {
  let t = De.get(r);
  if (t != null)
    return t[e];
}
const Me = /* @__PURE__ */ new WeakMap();
function Ni(r, e) {
  let t = Me.get(r);
  t == null && Me.set(r, t = /* @__PURE__ */ Object.create(null));
  const i = e.Id;
  i in t && C(
    "NonUniqueId: the id of the given sticker (" + X(i) + ") has already been registered"
  ), t[i] = e;
}
function sr(r) {
  const e = r.Project;
  let t = Me.get(e);
  t != null && delete t[r.Id];
}
function Ci(r, e) {
  let t = Me.get(r);
  if (t != null)
    return t[e];
}
function We(r) {
  Oe("serialization", r), delete r.Id, Be(r.BoardList) && r.BoardList.forEach(
    (e) => We(e)
  ), Be(r.StickerList) && r.StickerList.forEach(
    (e) => We(e)
  );
}
const ot = /* @__PURE__ */ new WeakMap();
function lr(r, e) {
  let t = ot.get(r);
  t == null && ot.set(r, t = []), t.push(e);
}
function ht(r) {
  let e = ot.get(r);
  e != null && e.forEach((t) => {
    ti(t);
  });
}
const Re = /* @__PURE__ */ Object.create(null), ce = /* @__PURE__ */ Object.create(null), ur = /* @__PURE__ */ Object.create(null);
function p(r, e, t, i, n, o) {
  Ke("behavior group label", r), Ke("behavior label", e), re("behavior name", t), Br("sticker template", i), ve("behavior function", n);
  const u = r.toLowerCase().replace(/\s/g, ""), s = t.toLowerCase(), l = { ...i };
  l.activeScript == null ? l.activeScript = `useBehavior('${t}')
` : l.activeScript = l.activeScript.replace(/^\s*\n/, "").replace(/\n\s*$/, `
`), s in ce && C(
    "BehaviorExists: behavior " + X(t) + " was already registered"
  );
  let a = Re[u];
  a == null && (Re[u] = a = {
    GroupLabel: r,
    BehaviorSet: /* @__PURE__ */ Object.create(null)
  }), a.BehaviorSet[t] = {
    Label: e,
    Executable: n,
    Template: l
  }, n != null && (ur[s] = l, ce[s] = n), o != null && Le.innerHTML.indexOf(o.trim()) < 0 && (Le.innerHTML += o);
}
function Yn() {
  const r = [];
  function e(t) {
    const i = [], n = t.BehaviorSet;
    for (let o in n)
      i.push({
        Label: n[o].Label,
        Name: o,
        disabled: !(o.toLowerCase() in ce)
      });
    return { GroupLabel: t.GroupLabel, BehaviorEntryList: i };
  }
  for (let t in Re)
    r.push(e(Re[t]));
  return r;
}
function Vi(r) {
  Ue("visual", this), re("behavior name", r);
  const e = ce[r.toLowerCase()];
  e == null && C(
    "NoSuchBehavior: no behavior called " + X(r) + " found"
  );
  const t = (u) => {
    oe("reactive function", u), lr(this, Ut(u));
  }, i = this.onRender.bind(this), n = this.onMount.bind(this), o = this.onUnmount.bind(this);
  e.call(this, this, this, Ee, t, i, n, o);
}
function jn(r) {
  re("behavior name", r);
  const e = r.toLowerCase();
  return ce[e] == null && C(
    "NoSuchBehavior: no behavior called " + X(r) + " found"
  ), ur[e];
}
p("basic Views", "plain Sticker", "plainSticker", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  activeScript: 'onRender(() => html`<div class="SNS Placeholder"></div>`)'
}, (r, e, t, i, n, o, u) => {
  n(() => t`<div class="SNS plainSticker"></div>`);
}, `
/**** plain Stickers ****/

  .SNS.plainSticker {
    border:dotted 1px gray;
  }
  `);
p("basic Views", "sticky Note", "stickyNote", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  minWidth: 20,
  minHeight: 10
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function(s) {
    const { builtinSelection: l, builtinDragging: a } = s, d = pe(e.Value, ""), c = (g) => {
      if (g.key === "Tab") {
        g.stopPropagation(), g.preventDefault();
        const f = g.target, { value: S, selectionStart: b, selectionEnd: m } = f;
        return f.value = S.slice(0, b) + "	" + S.slice(m), f.selectionStart = f.selectionEnd = b + 1, !1;
      }
    }, h = (g) => {
      e.Value = g.target.value;
    };
    return t`<div class="SNS NoteSticker" style=${cr(r)}
        onPointerDown=${l}
      >
        <div class="Header builtinDraggable"
          onPointerDown=${a} onPointerMove=${a}
          onPointerUp=${a} onPointerCancel=${a}
        />
        <textarea class="Editor" value=${d} tabindex=-1
          onKeyDown=${c} onInput=${h}
        ></textarea>
      </div>`;
  };
}, `
/**** "classical" Note Stickers ****/

  .SNS.NoteSticker {
    background:ivory;
    border:solid 1px darkgray;
    outline:none;
    font-family:'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size:14px; font-weight:normal; line-height:1.4; color:black;
  }

  .SNS.NoteSticker > .Header {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; height:10px;
    margin:0px; padding:0px;
    background:#000000; opacity:0.3;
  }

  .SNS.NoteSticker > .Editor {
    display:block; position:absolute;
    left:0px; top:10px; right:0px; bottom:0px;
    margin:0px; padding:2px;
    background:none; border:none;

    background-color:inherit; background-image:inherit;
    font-family:inherit; font-size:inherit; font-weight:inherit;
    line-height:inherit; color:inherit;

    tab-size:10px; resize:none;
  }
  `);
p("basic Views", "Placeholder", "Placeholder", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function(s) {
    const { builtinDragging: l } = s, { Width: a, Height: d } = e.Geometry;
    return t`<div class="SNS Placeholder builtinDraggable" style="
        line-height:${d}px;
      "
        onPointerDown=${l} onPointerMove=${l}
        onPointerUp=${l} onPointerCancel=${l}
      >${a}x${d}</div>`;
  };
}, `
/**** simple Placeholders ****/

  .SNS.Placeholder {
    border:dotted 1px gray;
    text-align:center;
  }
  `);
p("basic Views", "Title", "Title", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Title"
}, (r, e, t, i, n, o, u) => {
  n(() => {
    const s = N(e.Value, "");
    return t`<div class="SNS Title">${s}</div>`;
  });
}, `
/**** Title Views ****/

  .SNS.Sticker > .SNS.Title {
    font-size:22px; font-weight:bold; line-height:32px;
  }
  `);
p("basic Views", "Subtitle", "Subtitle", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Subtitle"
}, (r, e, t, i, n, o, u) => {
  n(() => {
    const s = N(e.Value, "");
    return t`<div class="SNS Subtitle">${s}</div>`;
  });
}, `
/**** Subtitle Views ****/

  .SNS.Sticker > .SNS.Subtitle {
    font-size:18px; font-weight:bold; line-height:27px;
  }
  `);
p("basic Views", "Label", "Label", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Label"
}, (r, e, t, i, n, o, u) => {
  n(() => {
    const s = N(e.Value, "");
    return t`<div class="SNS Label">${s}</div>`;
  });
}, `
/**** Label Views ****/

  .SNS.Sticker > .SNS.Label {
    font-size:14px; font-weight:bold; line-height:21px;
  }
  `);
p("basic Views", "Text", "Text", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Text"
}, (r, e, t, i, n, o, u) => {
  n(() => {
    const s = pe(e.Value, "");
    return t`<div class="SNS Text">${s}</div>`;
  });
}, `
/**** Text Views ****/

  .SNS.Sticker > .SNS.Text {
    font-size:14px; font-weight:normal; line-height:21px;
  }
  `);
p("basic Views", "FinePrint", "FinePrint", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "FinePrint"
}, (r, e, t, i, n, o, u) => {
  n(() => {
    const s = pe(e.Value, "");
    return t`<div class="SNS FinePrint">${s}</div>`;
  });
}, `
/**** FinePrint Views ****/

  .SNS.Sticker > .SNS.FinePrint {
    font-size:12px; font-weight:normal; line-height:18px;
  }
  `);
p("basic Views", "HTML View", "HTMLView", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  Value: "<b><u>HTML View</u></b>",
  activeScript: `
  useBehavior('HTMLView')
//my.Value = 'HTML Markup'
`
}, (r, e, t, i, n, o, u) => {
  e.Renderer = () => t`<div class="SNS HTMLView"
      dangerouslySetInnerHTML=${{ __html: pe(e.Value, "") }}
    />`;
});
p("basic Views", "Image View", "ImageView", {
  Geometry: { x: 20, y: 20, Width: 90, Height: 90 },
  Value: "https://www.rozek.de/Bangle.js/Mandelbrot_240x240.png",
  activeScript: `
  useBehavior('ImageView')
//my.Value = 'Image URL'
`
}, (r, e, t, i, n, o, u) => {
  e.Renderer = () => t`<img class="SNS ImageView" src=${ie(e.Value, "")}/>`;
}, `
/**** Image View ****/

  .SNS.Sticker > .SNS.ImageView {
    object-fit:contain; object-position:center;
  }
  `);
p("basic Views", "SVG View", "SVGView", {
  Geometry: { x: 20, y: 20, Width: 90, Height: 90 },
  activeScript: `
  useBehavior('SVGView')
//my.Value = 'SVG Document'
`
}, (r, e, t, i, n, o, u) => {
  e.Renderer = () => {
    const s = "data:image/svg+xml;base64," + btoa(pe(e.Value, ""));
    return t`<div class="SNS SVGView" src=${s}/>`;
  };
}, `
/**** SVG View ****/

  .SNS.Sticker > .SNS.SVGView {
    object-fit:contain; object-position:center;
  }
  `);
p("basic Views", "2D Canvas View", "Canvas2DView");
p("basic Views", "Web View", "WebView", {
  Geometry: { x: 20, y: 20, Width: 640, Height: 480 },
  minWidth: 120,
  minHeight: 80,
  Value: "https://www.rozek.de",
  activeScript: `
  useBehavior('WebView')
//my.Value = 'Document URL'
`
}, (r, e, t, i, n, o, u) => {
  e.Renderer = () => t`<iframe class="SNS WebView"
      src=${ie(e.Value, "")}
    />`;
});
p("basic Views", "Badge", "Badge", {
  Geometry: { x: 20, y: 20, Width: 30, Height: 30 },
  Value: 1,
  ForegroundColor: "red",
  BackgroundColor: "white"
}, (r, e, t, i, n, o, u) => {
  e.Renderer = () => {
    const s = te(e.Value) ? "" + e.Value : N(e.Value, ""), l = Math.round(Math.min(e.Width, e.Height / 2));
    return t`<div class="SNS Badge" style="
        border-color:${e.ForegroundColor}; border-radius:${l}px;
        line-height:${e.Height - 4}px;
      ">${N(s, "")}</>`;
  };
}, `
/**** Badge ****/

  .SNS.Sticker > .SNS.Badge {
    font-size:18px; font-weight:bold; text-align:center;
    border:solid 2px black;
  }
  `);
p("basic Views", "Icon", "Icon", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('Icon')
//my.Value = 'icon image url'
//onClick(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  function s(l) {
    e.Enabling != !1 && (e.Value = l.target.value, typeof e._onClick == "function" && e._onClick(l));
  }
  e.Renderer = () => {
    const l = ie(e.Value, "/img/pencil.png"), a = dt(e.Color, "black");
    return t`<div class="SNS Icon" style="
        -webkit-mask-image:url(${l}); mask-image:url(${l});
        background-color:${a};
      " disabled=${e.Enabling == !1} onClick=${s}
      />`;
  };
}, `
/**** Icon ****/

  .SNS.Sticker > .SNS.Icon {
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `);
p("basic Views", "horizontal Separator", "horizontalSeparator", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 10 },
  minWidth: 10
}, (r, e, t, i, n, o, u) => {
  n(() => t`<div class="SNS horizontalSeparator"></div>`);
}, `
/**** horizontal Separator ****/

  .SNS.horizontalSeparator {
    border:none; border-top:solid 1px black;
  }
  `);
p("basic Views", "vertical Separator", "verticalSeparator", {
  Geometry: { x: 20, y: 20, Width: 10, Height: 40 },
  minHeight: 10
}, (r, e, t, i, n, o, u) => {
  n(() => t`<div class="SNS verticalSeparator"></div>`);
}, `
/**** vertical Separator ****/

  .SNS.verticalSeparator {
    border:none; border-left:solid 1px black;
  }
  `);
p("basic Views", "Tab", "Tab");
p("basic Views", "Icon Tab", "IconTab");
p("native Controls", "Button", "Button", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Button",
  activeScript: `
  useBehavior('Button')
//my.Value = 'Label'
//onClick(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    typeof e._onClick == "function" && e._onClick(l);
  }
  e.Renderer = () => {
    const l = N(e.Label || e.Value, "");
    return t`<button class="SNS Button" style="
        line-height:${e.LineHeight || e.Height}px;
      " disabled=${e.Enabling == !1} onClick=${s}
      >${l}</>`;
  };
}, `
/**** Button ****/

  .SNS.Sticker > .SNS.Button {
    border:solid 1px black; border-radius:4px;
    background:white;
    font-weight:bold; color:black;
    text-align.center;
  }
  `);
p("native Controls", "Checkbox", "Checkbox", {
  Geometry: { x: 20, y: 20, Width: 20, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Checkbox')
//my.Value = null/true/false
//onClick(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    e.Value = l.target.checked, typeof e._onClick == "function" && e._onClick(l);
  }
  e.Renderer = () => {
    const l = y(e.Value), a = l == !0, d = l == null;
    return t`<input type="checkbox" class="SNS Checkbox"
        checked=${a} indeterminate=${d}
        disabled=${e.Enabling == !1} onClick=${s}
      />`;
  };
});
p("native Controls", "Radiobutton", "Radiobutton", {
  Geometry: { x: 20, y: 20, Width: 20, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Radiobutton')
//my.Value = true/false
//onClick(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    e.Value = l.target.checked, typeof e._onClick == "function" && e._onClick(l);
  }
  e.Renderer = () => {
    const l = $i(e.Value, !1);
    return t`<input type="radio" class="SNS Radiobutton"
        checked=${l == !0}
        disabled=${e.Enabling == !1} onClick=${s}
      />`;
  };
});
p("native Controls", "Gauge", "Gauge", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 20 },
  Value: 0,
  activeScript: `
  useBehavior('Gauge')
//my.Value      = 0
//my.Minimum    = 0
//my.lowerBound = 0
//my.Optimum    = undefined
//my.upperBound = 1
//my.Maximum    = 1
`
}, (r, e, t, i, n, o, u) => {
  e.Renderer = () => {
    const s = Ze(
      z(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    ), l = P(e.Minimum), a = P(e.lowerBound), d = P(e.Optimum), c = P(e.upperBound), h = P(e.Maximum);
    return t`<meter class="SNS Gauge" value=${s}
        min=${l} low=${a} opt=${d}
        high=${c} max=${h}
      />`;
  };
});
p("native Controls", "Progressbar", "Progressbar", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 10 },
  Value: 0,
  activeScript: `
  useBehavior('Progressbar')
//my.Value   = 0
//my.Maximum = 1
`
}, (r, e, t, i, n, o, u) => {
  e.Renderer = () => {
    const s = Ze(
      z(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    ), l = P(e.Maximum);
    return t`<progress class="SNS Progressbar" value=${s} max=${l}/>`;
  };
});
const Di = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/;
p("native Controls", "Slider", "Slider", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Slider')
//my.Value     = 0
//my.Minimum   = undefined
//my.Stepping  = undefined
//my.Maximum   = undefined
//my.Hashmarks = [0:'zero',1,2]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = 0;
  function s(d) {
    return M(d, Di) || te(d);
  }
  function l(d) {
    if (e.Enabling == !1)
      return w(d);
    e.Value = parseFloat(d.target.value), typeof e._onInput == "function" && e._onInput(d);
  }
  function a() {
    r.rerender();
  }
  e.Renderer = () => {
    let d = Ze(
      z(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    );
    const c = P(e.Minimum), h = J(e.Stepping, void 0, 0), g = P(e.Maximum), f = R(
      e.Hashmarks,
      void 0,
      s
    );
    document.activeElement === e.View ? d = e.ValueToShow : e.ValueToShow = d;
    let S = "", b;
    return f != null && f.length > 0 && (b = e.Id + "-Hashmarks", S = t`\n<datalist id=${b}>
          ${f.map((m) => {
      m = "" + m;
      const x = m.replace(/:.*$/, "").trim(), E = m.replace(/^[^:]+:/, "").trim();
      return t`<option value=${x}>${E}</option>`;
    })}
        </datalist>`), t`<input type="range" class="SNS Slider"
        value=${d} min=${c} max=${g} step=${h}
        disabled=${e.Enabling == !1} onInput=${l} onBlur=${a}
        list=${b}
      />${S}`;
  };
});
p("native Controls", "Textline Input", "TextlineInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('TextlineInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.Pattern       = '.*'
//my.SpellChecking = undefined
//my.Suggestions   = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = N(e.Value, "");
    const d = F(e.Placeholder), c = y(e.readonly), h = V(e.minLength), g = V(e.maxLength), f = F(e.Pattern), S = y(e.SpellChecking), b = R(
      e.Suggestions,
      void 0,
      G
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let m = "", x;
    return b != null && b.length > 0 && (x = e.Id + "-Suggestions", m = t`<datalist id=${x}>
          ${b.map((E) => t`<option value=${E}></option>`)}
        </datalist>`), t`<input type="text" class="SNS TextlineInput"
        value=${a} minlength=${h} maxlength=${g}
        readonly=${c} placeholder=${d}
        pattern=${f} spellcheck=${S}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${x}
      />${m}`;
  };
}, `
/**** TextlineInput ****/

  .SNS.Sticker > .SNS.TextlineInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TextlineInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "Password Input", "PasswordInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('PasswordInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = N(e.Value, "");
    const d = F(e.Placeholder), c = y(e.readonly), h = V(e.minLength), g = V(e.maxLength), f = F(e.Pattern);
    return document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a, t`<input type="password" class="SNS PasswordInput"
        value=${a} minlength=${h} maxlength=${g}
        readonly=${c} placeholder=${d}
        pattern=${f}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
      />`;
  };
}, `
/**** PasswordInput ****/

  .SNS.Sticker > .SNS.PasswordInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.PasswordInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "Number Input", "NumberInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('NumberInput')
//my.Value       = 0
//my.Placeholder = undefined
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = [0,...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = 0;
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = parseFloat(a.target.value), typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = Ze(
      z(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    );
    const d = F(e.Placeholder), c = y(e.readonly), h = P(e.Minimum), g = J(e.Stepping, void 0, 0), f = P(e.Maximum), S = R(
      e.Suggestions,
      void 0,
      te
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let b = "", m;
    return S != null && S.length > 0 && (m = e.Id + "-Suggestions", b = t`<datalist id=${m}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="number" class="SNS NumberInput"
        value=${a} min=${h} max=${f} step=${g}
        readonly=${c} placeholder=${d}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
      />${b}`;
  };
}, `
/**** NumberInput ****/

  .SNS.Sticker > .SNS.NumberInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.NumberInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "Phone Number Input", "PhoneNumberInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('PhoneNumberInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.Pattern       = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = Ii(e.Value, "");
    const d = F(e.Placeholder), c = y(e.readonly), h = V(e.minLength), g = V(e.maxLength), f = F(e.Pattern), S = R(
      e.Suggestions,
      void 0,
      Et
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let b = "", m;
    return S != null && S.length > 0 && (m = e.Id + "-Suggestions", b = t`<datalist id=${m}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="tel" class="SNS PhoneNumberInput"
        value=${a} minlength=${h} maxlength=${g}
        readonly=${c} placeholder=${d}
        pattern=${f}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
      />${b}`;
  };
}, `
/**** PhoneNumberInput ****/

  .SNS.Sticker > .SNS.PhoneNumberInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.PhoneNumberInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "EMail Address Input", "EMailAddressInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('EMailAddressInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = Bi(e.Value, "");
    const d = F(e.Placeholder), c = y(e.readonly), h = V(e.minLength), g = V(e.maxLength), f = F(e.Pattern), S = R(
      e.Suggestions,
      void 0,
      Dt
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let b = "", m;
    return S != null && S.length > 0 && (m = e.Id + "-Suggestions", b = t`<datalist id=${m}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="email" class="SNS EMailAddressInput"
        value=${a} minlength=${h} maxlength=${g}
        readonly=${c} placeholder=${d}
        pattern=${f}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
      />${b}`;
  };
}, `
/**** EMailAddressInput ****/

  .SNS.Sticker > .SNS.EMailAddressInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.EMailAddressInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "URL Input", "URLInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('URLInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = ie(e.Value, "");
    const d = F(e.Placeholder), c = y(e.readonly), h = V(e.minLength), g = V(e.maxLength), f = F(e.Pattern), S = R(
      e.Suggestions,
      void 0,
      st
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let b = "", m;
    return S != null && S.length > 0 && (m = e.Id + "-Suggestions", b = t`<datalist id=${m}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="url" class="SNS URLInput"
        value=${a} minlength=${h} maxlength=${g}
        readonly=${c} placeholder=${d}
        pattern=${f}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
      />${b}`;
  };
}, `
/**** URLInput ****/

  .SNS.Sticker > .SNS.URLInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.URLInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const Mi = "\\d{2}:\\d{2}", _e = /\d{2}:\d{2}/;
function Wi(r) {
  return M(r, _e);
}
p("native Controls", "Time Input", "TimeInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('TimeInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = L(
      e.Value,
      void 0,
      _e
    );
    const d = y(e.readonly), c = L(e.Minimum, void 0, _e), h = J(e.Stepping, void 0, 0), g = L(e.Maximum, void 0, _e), f = R(
      e.Suggestions,
      void 0,
      Wi
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let S = "", b;
    return f != null && f.length > 0 && (b = e.Id + "-Suggestions", S = t`<datalist id=${b}>
          ${f.map((m) => t`<option value=${m}></option>`)}
        </datalist>`), t`<input type="time" class="SNS TimeInput"
        value=${a} min=${c} max=${g} step=${h}
        readonly=${d} pattern=${Mi}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${b}
      />${S}`;
  };
}, `
/**** TimeInput ****/

  .SNS.Sticker > .SNS.TimeInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TimeInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const Ri = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}", xe = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
function Hi(r) {
  return M(r, xe);
}
p("native Controls", "Date and Time Input", "DateTimeInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('DateTimeInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = L(
      e.Value,
      void 0,
      xe
    );
    const d = y(e.readonly), c = L(e.Minimum, void 0, xe), h = J(e.Stepping, void 0, 0), g = L(e.Maximum, void 0, xe), f = R(
      e.Suggestions,
      void 0,
      Hi
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let S = "", b;
    return f != null && f.length > 0 && (b = e.Id + "-Suggestions", S = t`<datalist id=${b}>
          ${f.map((m) => t`<option value=${m}></option>`)}
        </datalist>`), t`<input type="datetime-local" class="SNS DateTimeInput"
        value=${a} min=${c} max=${g} step=${h}
        readonly=${d} pattern=${Ri}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${b}
      />${S}`;
  };
}, `
/**** DateTimeInput ****/

  .SNS.Sticker > .SNS.DateTimeInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.DateTimeInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const Ai = "\\d{4}-\\d{2}-\\d{2}", we = /\d{4}-\d{2}-\d{2}/;
function Ti(r) {
  return M(r, we);
}
p("native Controls", "Date Input", "DateInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('DateInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = L(
      e.Value,
      void 0,
      we
    );
    const d = y(e.readonly), c = L(e.Minimum, void 0, we), h = J(e.Stepping, void 0, 0), g = L(e.Maximum, void 0, we), f = R(
      e.Suggestions,
      void 0,
      Ti
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let S = "", b;
    return f != null && f.length > 0 && (b = e.Id + "-Suggestions", S = t`<datalist id=${b}>
          ${f.map((m) => t`<option value=${m}></option>`)}
        </datalist>`), t`<input type="date" class="SNS DateInput"
        value=${a} min=${c} max=${g} step=${h}
        readonly=${d} pattern=${Ai}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${b}
      />${S}`;
  };
}, `
/**** DateInput ****/

  .SNS.Sticker > .SNS.DateInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.DateInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const Gi = "\\d{4}-W\\d{2}", $e = /\d{4}-W\d{2}/;
function Pi(r) {
  return M(r, $e);
}
p("native Controls", "Week Input", "WeekInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('WeekInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = L(
      e.Value,
      void 0,
      $e
    );
    const d = y(e.readonly), c = L(e.Minimum, void 0, $e), h = J(e.Stepping, void 0, 0), g = L(e.Maximum, void 0, $e), f = R(
      e.Suggestions,
      void 0,
      Pi
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let S = "", b;
    return f != null && f.length > 0 && (b = e.Id + "-Suggestions", S = t`<datalist id=${b}>
          ${f.map((m) => t`<option value=${m}></option>`)}
        </datalist>`), t`<input type="week" class="SNS WeekInput"
        value=${a} min=${c} max=${g} step=${h}
        readonly=${d} pattern=${Gi}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${b}
      />${S}`;
  };
}, `
/**** WeekInput ****/

  .SNS.Sticker > .SNS.WeekInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.WeekInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const Ei = "\\d{4}-\\d{2}", ye = /\d{4}-\d{2}/;
function Ui(r) {
  return M(r, ye);
}
p("native Controls", "Month Input", "MonthInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('MonthInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = L(
      e.Value,
      void 0,
      ye
    );
    const d = y(e.readonly), c = L(e.Minimum, void 0, ye), h = J(e.Stepping, void 0, 0), g = L(e.Maximum, void 0, ye), f = R(
      e.Suggestions,
      void 0,
      Ui
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let S = "", b;
    return f != null && f.length > 0 && (b = e.Id + "-Suggestions", S = t`<datalist id=${b}>
          ${f.map((m) => t`<option value=${m}></option>`)}
        </datalist>`), t`<input type="month" class="SNS MonthInput"
        value=${a} min=${c} max=${g} step=${h}
        readonly=${d} pattern=${Ei}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${b}
      />${S}`;
  };
}, `
/**** MonthInput ****/

  .SNS.Sticker > .SNS.MonthInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.MonthInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "File Input", "FileInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('FileInput')
//my.Value           = ''
//my.Placeholder     = undefined
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
//onDrop(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  function s(c) {
    if (e.Enabling == !1)
      return w(c);
    e.Value = c.target.value, typeof e._onInput == "function" && e._onInput(c, c.files);
  }
  function l(c) {
    return w(c);
  }
  function a(c) {
    return w(c);
  }
  function d(c) {
    gt(c), e.Enabling != !1 && (e.Value = c.target.value, typeof e._onDrop == "function" && e._onDrop(c, c.dataTransfer.files));
  }
  e.Renderer = () => {
    let c = N(e.Value, "").trim();
    c = c.replace("C:\\fakepath\\", "");
    const h = N(e.Placeholder, "").trim(), g = F(e.acceptableTypes), f = y(e.multiple);
    return t`<label class="SNS FileInput"
        onDragEnter=${l} onDragOver=${a} onDrop=${d}
      >
        <input type="file" style="display:none"
          multiple=${f} accept=${g}
          onInput=${s}
        />
        ${c === "" ? h === "" ? "" : t`<span style="line-height:${e.Height}px">${h}</span>` : t`<span style="line-height:${e.Height}px">${c}</span>`}
      </label>`;
  };
}, `
/**** FileInput ****/

  .SNS.Sticker > .SNS.FileInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  .SNS.Sticker > .SNS.FileInput > span {
    display:block; position:absolute; overflow:hidden;
    left:0px; top:0px; width:100%; height:100%;
    padding:0px 2px 0px 2px; white-space:pre; text-overflow:ellipsis;
  }
  `);
p("native Controls", "Pseudo File Input", "PseudoFileInput", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('PseudoFileInput')
//my.Value           = ''
//my.Icon            = 'icon image url'
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    e.Value = l.target.value, typeof e._onInput == "function" && e._onInput(l, l.files);
  }
  e.Renderer = () => {
    const l = ie(e.Icon, "/img/arrow-up-from-bracket.png"), a = dt(e.Color, "black"), d = F(e.acceptableTypes), c = y(e.multiple);
    return t`<label class="SNS PseudoFileInput">
        <div style="
          -webkit-mask-image:url(${l}); mask-image:url(${l});
          background-color:${a};
        "></div>
        <input type="file" style="display:none"
          multiple=${c} accept=${d}
          onInput=${s}
        />
      </label>`;
  };
}, `
/**** PseudoFileInput ****/

  .SNS.Sticker > .SNS.PseudoFileInput > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `);
p("native Controls", "File Drop Area", "FileDropArea", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  Value: null,
  activeScript: `
  useBehavior('FileDropArea')
//my.Value           = ''
//my.Placeholder     = undefined
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
//onDrop(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  function s(c) {
    if (e.Enabling == !1)
      return w(c);
    e.Value = c.target.value, typeof e._onInput == "function" && e._onInput(c, c.files);
  }
  function l(c) {
    return w(c);
  }
  function a(c) {
    return w(c);
  }
  function d(c) {
    gt(c), e.Enabling != !1 && (e.Value = c.target.value, typeof e._onDrop == "function" && e._onDrop(c, c.dataTransfer.files));
  }
  e.Renderer = () => {
    const c = N(e.Placeholder, "").trim(), h = F(e.acceptableTypes), g = y(e.multiple);
    return t`<label class="SNS FileDropArea"
        onDragEnter=${l} onDragOver=${a} onDrop=${d}>
        <input type="file"
          multiple=${g} accept=${h}
          onInput=${s}
        />
        <span>${c}</span>
      </label>`;
  };
}, `
/**** FileDropArea ****/

  .SNS.Sticker > .SNS.FileDropArea {
    display:flex; flex-flow:column nowrap;
      justify-content:center; align-items:center;
    border:dashed 4px #DDDDDD; border-radius:4px;
    color:#DDDDDD; background:white;
  }

  .SNS.Sticker > .SNS.FileDropArea * { pointer-events:none }

  .SNS.Sticker > .SNS.FileDropArea > input[type="file"] {
    display:block; position:absolute; appearance:none;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }
  `);
p("native Controls", "Search Input", "SearchInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('SearchInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.Pattern       = '.*'
//my.SpellChecking = undefined
//my.Suggestions   = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = N(e.Value, "");
    const d = F(e.Placeholder), c = y(e.readonly), h = V(e.minLength), g = V(e.maxLength), f = F(e.Pattern), S = y(e.SpellChecking), b = R(
      e.Suggestions,
      void 0,
      G
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let m = "", x;
    return b != null && b.length > 0 && (x = e.Id + "-Suggestions", m = t`<datalist id=${x}>
          ${b.map((E) => t`<option value=${E}></option>`)}
        </datalist>`), t`<input type="search" class="SNS SearchInput"
        value=${a} minlength=${h} maxlength=${g}
        readonly=${c} placeholder=${d}
        pattern=${f} spellcheck=${S}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${x}
      />${m}`;
  };
}, `
/**** SearchInput ****/

  .SNS.Sticker > .SNS.SearchInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.SearchInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "Color Input", "ColorInput", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('ColorInput')
//my.Value       = ''
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = yi(e.Value);
    const d = R(
      e.Suggestions,
      void 0,
      Ge
    );
    document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a;
    let c = "", h;
    return d != null && d.length > 0 && (h = e.Id + "-Suggestions", c = t`<datalist id=${h}>
          ${d.map((g) => t`<option value=${g}></option>`)}
        </datalist>`), t`<input type="color" class="SNS ColorInput"
        value=${a}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${h}
      />${c}`;
  };
}, `
/**** ColorInput ****/

  .SNS.Sticker > .SNS.ColorInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `);
p("native Controls", "DropDown", "DropDown", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('DropDown')
//my.Value   = '...'
//my.Options = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = N(e.Value, "");
    const d = nr(
      e.Options,
      [],
      G
    );
    return document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a, t`<select class="SNS DropDown"
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
      >${d.map(
      (c) => {
        const h = c.replace(/:.*$/, "").trim(), g = c.replace(/^[^:]+:/, "").trim();
        return t`<option value=${h} selected=${h === a}>
            ${g}
          </option>`;
      }
    )}</select>`;
  };
}, `
/**** DropDown ****/

  .SNS.Sticker > .SNS.DropDown {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.SearchInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("native Controls", "Pseudo DropDown", "PseudoDropDown", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('PseudoDropDown')
//my.Value   = '...'
//my.Icon    = 'icon image url'
//my.Options = ['...',...]
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = N(e.Value, "");
    const d = ie(e.Icon, "/img/menu.png"), c = dt(e.Color, "black"), h = nr(
      e.Options,
      [],
      G
    );
    return document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a, t`<div class="SNS PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${d}); mask-image:url(${d});
          background-color:${c};
        "></div>
        <select disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}>
          ${h.map((g) => {
      const f = g.replace(/:.*\$/, "").trim(), S = g.replace(/^[^:]+:/, "").trim();
      return t`<option value=${f} selected=${f === a}>
              ${S}
            </option>`;
    })}
        </select>
      </div>`;
  };
}, `
/**** PseudoDropDown ****/

  .SNS.Sticker > .SNS.PseudoDropDown > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }

  .SNS.Sticker > .SNS.PseudoDropDown > select {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }
  `);
p("native Controls", "Text Input", "TextInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('TextInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.LineWrapping  = false
//my.SpellChecking = undefined
//onInput(() => ...)
`
}, (r, e, t, i, n, o, u) => {
  e.ValueToShow = "";
  function s(a) {
    if (e.Enabling == !1)
      return w(a);
    e.Value = a.target.value, typeof e._onInput == "function" && e._onInput(a);
  }
  function l() {
    r.rerender();
  }
  e.Renderer = () => {
    let a = N(e.Value, "");
    const d = F(e.Placeholder), c = y(e.readonly), h = V(e.minLength), g = V(e.maxLength), f = y(e.LineWrapping), S = y(e.SpellChecking);
    return document.activeElement === e.View ? a = e.ValueToShow : e.ValueToShow = a, t`<textarea class="SNS TextInput"
        value=${a} minlength=${h} maxlength=${g}
        readonly=${c} placeholder=${d}
        spellcheck=${S} style="resize:none; ${f == !0 ? "white-space:pre; overflow-wrap:break-word; hyphens:auto" : void 0}"
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        value=${a}
      />`;
  };
}, `
/**** TextInput ****/

  .SNS.Sticker > .SNS.TextInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TextInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
p("basic Shapes", "Line", "Line");
p("basic Shapes", "Polyline", "Polyline");
p("basic Shapes", "Arc", "Arc");
p("basic Shapes", "quadratic Bezier", "quadraticBezier");
p("basic Shapes", "cubic Bezier", "cubicBezier");
p("basic Shapes", "Box", "Box");
p("basic Shapes", "rounded Box", "roundedBox");
p("basic Shapes", "Oval", "Oval");
p("basic Shapes", "Chord", "Chord");
p("basic Shapes", "Pie", "Pie");
p("basic Shapes", "Polygon", "Polygon");
p("basic Shapes", "regular Polygon", "regularPolygon");
p("straight Arrows", "nw", "straightArrow_nw", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M ${s},${l}, L 0,0"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("straight Arrows", "n", "straightArrow_n", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M ${s / 2},${l}, L ${s / 2},0"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("straight Arrows", "ne", "straightArrow_ne", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M 0,${l}, L ${s},0"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("straight Arrows", "e", "straightArrow_e", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M 0,${l / 2}, L ${s},${l / 2}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("straight Arrows", "se", "straightArrow_se", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M 0,0, L ${s},${l}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("straight Arrows", "s", "straightArrow_s", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M ${s / 2},0, L ${s / 2},${l}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("straight Arrows", "sw", "straightArrow_sw", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M ${s},0, L 0,${l}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("straight Arrows", "w", "straightArrow_w", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}"
            d="M ${s},${l / 2}, L 0,${l / 2}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "cw n", "curvedArrow_cw_n", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M ${s},${l - 6}, A ${s - 6} ${l - 18} 0 0 1 6 12"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "cw e", "curvedArrow_cw_e", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M 6,${l}, A ${s - 18} ${l - 6} 0 0 1 ${s - 12} 6"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "cw s", "curvedArrow_cw_s", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M 0,6, A ${s - 6} ${l - 18} 0 0 1 ${s - 6} ${l - 12}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "cw w", "curvedArrow_cw_w", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M ${s - 6},0, A ${s - 18} ${l - 6} 0 0 1 12 ${l - 6}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "ccw n", "curvedArrow_ccw_n", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M 0,${l - 6}, A ${s - 6} ${l - 18} 0 0 0 ${s - 6} 12"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "ccw e", "curvedArrow_ccw_e", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M 6,0, A ${s - 18} ${l - 6} 0 0 0 ${s - 12} ${l - 6}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "ccw s", "curvedArrow_ccw_s", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M ${s},6, A ${s - 6} ${l - 18} 0 0 0 6 ${l - 12}"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("curved Arrows", "ccw w", "curvedArrow_ccw_w", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (r, e, t, i, n, o, u) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, a = e.ForegroundColor || "black", d = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${a}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${a}" fill="none"
            d="M ${s - 6},${l}, A ${s - 18} ${l - 8} 0 0 0 12 6"
          />
        </svg>
      `, c = "data:image/svg+xml;base64," + btoa(d);
    return t`<img class="SNS straightArrow" src=${c}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
p("complex Controls", "flat List View", "FlatListView");
p("complex Controls", "nested List View", "NestedListView");
p("complex Controls", "QR-Code View", "QRCodeView");
function cr(r) {
  Ot("visual", r);
  let e = [];
  const {
    BackgroundColor: t,
    BackgroundTexture: i,
    ForegroundColor: n,
    FontFamily: o,
    FontSize: u,
    FontWeight: s,
    FontStyle: l,
    LineHeight: a
  } = r;
  return t != null && e.push(`background-color:${t}`), i != null && e.push(
    `background-image:${i}; background-repeat:repeat`
  ), n != null && e.push(`color:${n}`), o != null && e.push(`font-family:${o}`), u != null && e.push(`font-size:${u}px`), s != null && e.push(`font-weight:${s}`), l != null && e.push(`font-style:${l}`), a != null && e.push(`line-height:${a}px`), e.join(";");
}
function gt(r) {
  r.stopPropagation(), r.preventDefault();
}
const w = gt;
class ft {
  constructor(e, t) {
    // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"
    /**** Id - for internal use only ****/
    k(this, "_Id");
    /**** Name ****/
    k(this, "_Name");
    /**** Project ****/
    k(this, "_Project");
    /**** Folder ****/
    k(this, "_Folder");
    /**** BackgroundColor ****/
    k(this, "_BackgroundColor");
    /**** BackgroundTexture ****/
    k(this, "_BackgroundTexture");
    /**** FontFamily ****/
    k(this, "_FontFamily");
    /**** FontSize ****/
    k(this, "_FontSize");
    /**** FontWeight ****/
    k(this, "_FontWeight");
    /**** FontStyle ****/
    k(this, "_FontStyle");
    /**** LineHeight ****/
    k(this, "_LineHeight");
    /**** ForegroundColor ****/
    k(this, "_ForegroundColor");
    /**** Value ****/
    k(this, "_Value", null);
    /**** observed ****/
    // @ts-ignore TS2564 allow "_observed" to be assigned upon first use
    k(this, "_observed");
    /**** unobserved ****/
    // @ts-ignore TS2564 allow "_unobserved" to be assigned upon first use
    k(this, "_unobserved");
    /**** activeScript ****/
    k(this, "_activeScript");
    /**** pendingScript ****/
    k(this, "_pendingScript");
    /**** ScriptError - for internal use only ****/
    k(this, "_ScriptError");
    /**** Renderer ****/
    k(this, "_Renderer");
    /**** View ****/
    k(this, "_View");
    /**** onMount ****/
    k(this, "_onMount");
    /**** onUnmount ****/
    k(this, "_onUnmount");
    /**** Error - for internal use only ****/
    k(this, "_Error");
    this._Project = e, this._Id = t || Fi();
  }
  get Id() {
    return this._Id;
  }
  set Id(e) {
    _("Id");
  }
  get Name() {
    return this._Name;
  }
  set Name(e) {
    Yt("visual name", e), e != null && (e = e.trim(), e === "" && (e = void 0)), this._Name !== e && (this._Name = e, this._reportChange("configure", this, "Name", e), this.rerender());
  }
  get Project() {
    return this._Project;
  }
  set Project(e) {
    _("Project");
  }
  get Folder() {
    return this._Folder;
  }
  set Folder(e) {
    _("Folder");
  }
  /**** isAttached ****/
  get isAttached() {
    return this._Folder == null ? fe(this) : this._Folder.isAttached;
  }
  set isAttached(e) {
    _("isAttached");
  }
  get BackgroundColor() {
    return this._BackgroundColor == null ? this._Folder == null ? void 0 : this._Folder.BackgroundColor : this._BackgroundColor;
  }
  set BackgroundColor(e) {
    _t("visual background color", e), this._BackgroundColor !== e && (this._BackgroundColor = e, this._reportChange("configure", this, "BackgroundColor", e), this.rerender());
  }
  get BackgroundTexture() {
    return this._BackgroundTexture == null ? this._Folder == null ? void 0 : this._Folder.BackgroundTexture : this._BackgroundTexture;
  }
  set BackgroundTexture(e) {
    Wt("visual background texture", e), this._BackgroundTexture !== e && (this._BackgroundTexture = e, this._reportChange("configure", this, "BackgroundTexture", e), this.rerender());
  }
  get FontFamily() {
    return this._FontFamily == null ? this._Folder == null ? void 0 : this._Folder.FontFamily : this._FontFamily;
  }
  set FontFamily(e) {
    yr("visual font family", e), this._FontFamily !== e && (this._FontFamily = e, this._reportChange("configure", this, "FontFamily", e), this.rerender());
  }
  get FontSize() {
    return this._FontSize == null ? this._Folder == null ? void 0 : this._Folder.FontSize : this._FontSize;
  }
  set FontSize(e) {
    Ie("visual font size", e), this._FontSize !== e && (this._FontSize = e, this._reportChange("configure", this, "FontSize", e), this.rerender());
  }
  get FontWeight() {
    return this._FontWeight == null ? this._Folder == null ? void 0 : this._Folder.FontWeight : this._FontWeight;
  }
  set FontWeight(e) {
    wr("visual font weight", e, 1, 1e3), this._FontWeight !== e && (this._FontWeight = e, this._reportChange("configure", this, "FontWeight", e), this.rerender());
  }
  get FontStyle() {
    return this._FontStyle == null ? this._Folder == null ? void 0 : this._Folder.FontStyle : this._FontStyle;
  }
  set FontStyle(e) {
    Fr("visual font style", e, ri), this._FontStyle !== e && (this._FontStyle = e, this._reportChange("configure", this, "FontStyle", e), this.rerender());
  }
  get LineHeight() {
    return this._LineHeight == null ? this._Folder == null ? void 0 : this._Folder.LineHeight : this._LineHeight;
  }
  set LineHeight(e) {
    Ie("visual line height", e), this._LineHeight !== e && (this._LineHeight = e, this._reportChange("configure", this, "LineHeight", e), this.rerender());
  }
  get ForegroundColor() {
    return this._ForegroundColor == null ? this._Folder == null ? void 0 : this._Folder.ForegroundColor : this._ForegroundColor;
  }
  set ForegroundColor(e) {
    _t("visual foreground color", e), this._ForegroundColor !== e && (this._ForegroundColor = e, this._reportChange("configure", this, "ForegroundColor", e), this.rerender());
  }
  /**** Color ****/
  get Color() {
    return this.ForegroundColor;
  }
  set Color(e) {
    this.ForegroundColor = e;
  }
  get Value() {
    return this._Value;
  }
  set Value(e) {
    ae(this._Value, e) && (this._Value = e, this._reportChange("configure", this, "Value", e), this.rerender());
  }
  /**** editableValue (may be overwritten) ****/
  get editableValue() {
    return this._Value == null ? "" : "" + this._Value;
  }
  // stringify non-literal values before returning them
  set editableValue(e) {
    this.Value = e;
  }
  get observed() {
    return this._observed == null && (this._observed = ei({})), this._observed;
  }
  set observed(e) {
    _("observed");
  }
  get unobserved() {
    return this._unobserved == null && (this._unobserved = {}), this._unobserved;
  }
  set unobserved(e) {
    _("unobserved");
  }
  /**** Script ****/
  get Script() {
    return this._pendingScript == null ? this._activeScript : this._pendingScript;
  }
  set Script(e) {
    _("Script");
  }
  get activeScript() {
    return this._activeScript;
  }
  set activeScript(e) {
    kt("visual script", e), e === "" && (e = void 0), this._activeScript !== e && (this._activeScript = e, this._reportChange("configure", this, "activeScript", e), this.rerender());
  }
  get pendingScript() {
    return this._pendingScript;
  }
  set pendingScript(e) {
    kt("visual script", e), this._pendingScript !== e && (this._pendingScript = e, this._reportChange("configure", this, "pendingScript", e), this.rerender());
  }
  /**** activateScript ****/
  activateScript() {
    let e = (this._activeScript || "").trim();
    if (this.Error = void 0, this._Renderer = void 0, ht(this), e != null) {
      let t;
      try {
        t = new Function(
          "me,my, html,reactively, onRender,onMount,onUnmount, useBehavior",
          e
        );
      } catch (s) {
        console.error("visual script compilation failure", s), this.Error = {
          Type: "Script Compilation Failure",
          Message: "" + s,
          Cause: s
        };
        return;
      }
      const i = (s) => {
        oe("reactive function", s), lr(this, Ut(s));
      }, n = this.onRender.bind(this), o = this.onMount.bind(this), u = this.onUnmount.bind(this);
      try {
        t.call(
          this,
          this,
          this,
          Ee,
          i,
          n,
          o,
          u,
          Vi.bind(this)
        );
      } catch (s) {
        console.error("visual script execution failure", s), this.Error = {
          Type: "Script Execution Failure",
          Message: "" + s,
          Cause: s
        };
        return;
      }
    }
    this.rerender();
  }
  get ScriptError() {
    return this._ScriptError == null ? void 0 : { ...this._ScriptError };
  }
  set ScriptError(e) {
    nt("script error setting", e), ae(this._ScriptError, e) && (this._ScriptError = e, this._reportChange("configure", this, "ScriptError", e), this.rerender());
  }
  get Renderer() {
    return this._Renderer;
  }
  set Renderer(e) {
    ve("visual renderer", e), this._Renderer !== e && (this._Renderer = e, this.rerender());
  }
  /**** onRender ****/
  onRender(e) {
    this.Renderer = e;
  }
  /**** Rendering (to be overwritten) ****/
  // @ts-ignore TS2564 allow "PropSet" to be never read
  Rendering(e) {
    return "";
  }
  /**** rerender (to be overwritten) ****/
  // @ts-ignore TS2564 allow "Board" and "Sticker" to be never read
  rerender(e, t) {
  }
  get View() {
    return this._View;
  }
  set View(e) {
    _("View");
  }
  /**** isMounted ****/
  get isMounted() {
    return this._View != null;
  }
  set isMounted(e) {
    _("isMounted");
  }
  onMount(e) {
    ve('"onMount" callback', e), e == null ? this._onMount = void 0 : this._onMount = () => {
      try {
        e.call(this);
      } catch (t) {
        this.Error = {
          Type: '"onMount" Callback Failure',
          Message: "" + t,
          Cause: t
        }, this.rerender();
      }
    };
  }
  onUnmount(e) {
    ve('"onUnmount" callback', e), e == null ? this._onUnmount = void 0 : this._onUnmount = () => {
      try {
        e.call(this);
      } catch (t) {
        this.Error = {
          Type: '"onUnmount" Callback Failure',
          Message: "" + t,
          Cause: t
        };
      }
    };
  }
  get Error() {
    return this._Error == null ? void 0 : { ...this._Error };
  }
  set Error(e) {
    nt("error setting", e), ae(this._Error, e) && (this._Error = e, this._reportChange("configure", this, "Error", e), this.rerender());
  }
  /**** hasError ****/
  get hasError() {
    return this._Error != null;
  }
  set hasError(e) {
    _("hasError");
  }
  /**** _reportChange ****/
  /* protected */
  _reportChange(e, ...t) {
    this._Project._reportChange(e, ...t);
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(e) {
    e.Id = this.Id;
    const t = (i) => {
      this["_" + i] != null && (e[i] = this[i]);
    };
    [
      "Name",
      "BackgroundColor",
      "BackgroundTexture",
      "FontFamily",
      "FontSize",
      "FontWeight",
      "FontStyle",
      "LineHeight",
      "ForegroundColor",
      "Value",
      "activeScript",
      "pendingScript"
    ].forEach((i) => t(i));
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(e) {
    const t = (i) => {
      if (e[i] != null)
        try {
          this[i] = e[i];
        } catch {
          console.warn(
            "DeserializationError:invalid value for property " + X(i)
          );
        }
    };
    t("activeScript"), [
      "Name",
      "BackgroundColor",
      "BackgroundTexture",
      "FontFamily",
      "FontSize",
      "FontWeight",
      "FontStyle",
      "LineHeight",
      "ForegroundColor",
      "Value",
      "pendingScript"
    ].forEach((i) => t(i));
  }
  // deserializing "activeScript" also automatically activates that script
}
class pt extends ft {
  constructor(t, i) {
    super(t, i);
    /**** SnapToGrid - inherited from outer folders ****/
    k(this, "_SnapToGrid");
    /**** GridWidth ****/
    k(this, "_GridWidth");
    /**** GridHeight ****/
    k(this, "_GridHeight");
    /**** BoardList ****/
    k(this, "_BoardList", []);
  }
  // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"
  /**** Path ****/
  get Path() {
    const t = this._Folder;
    if (t == null)
      return "|";
    {
      const i = this.Name || "#" + this.Index, n = t.Path;
      return (n === "|" ? "" : n) + "|" + i;
    }
  }
  set Path(t) {
    _("Path");
  }
  /**** BoardAtPath ****/
  BoardAtPath(t) {
    if (Ke("board path", t), t = t.trim(), t === "")
      return this._Folder == null ? void 0 : this;
    if (t.startsWith("|"))
      return this._Project.BoardAtPath(t.replace(/^(\s*\|)*/, ""));
    t = t.replace(/\|+/g, "|");
    const i = t.split("|").map(
      (o) => o.trim()
      // eliminate leading/trailing ws
    ).map(
      (o) => /^#\d+$/.test(o) ? parseInt(o.slice(1), 10) : o
    );
    let n;
    for (let o = 0, u = i.length; o < u; o++) {
      const s = i[o];
      if (typeof s == "number" ? n = (n || this).BoardAt(s) : n = (n || this).BoardNamed(s), n == null)
        return;
    }
    return n;
  }
  /**** IndexPath ****/
  get IndexPath() {
    const t = this._Folder;
    return t == null ? [] : t.IndexPath.concat(this.Index);
  }
  set IndexPath(t) {
    _("IndexPath");
  }
  get SnapToGrid() {
    return this._SnapToGrid ? this._SnapToGrid == !0 : this._Folder == null ? !1 : this._Folder.SnapToGrid;
  }
  set SnapToGrid(t) {
    xr("snap-to-grid setting", t), this._SnapToGrid !== t && (this._SnapToGrid = t, this._reportChange("configure", this, "SnapToGrid", t), this.rerender());
  }
  get GridWidth() {
    return this._GridWidth == null ? this._Folder == null ? xi : this._Folder.GridWidth : this._GridWidth;
  }
  set GridWidth(t) {
    vt("snap-to-grid width", t), this._GridWidth !== t && (this._GridWidth = t, this._reportChange("configure", this, "GridWidth", t), this.rerender());
  }
  get GridHeight() {
    return this._GridHeight == null ? this._Folder == null ? wi : this._Folder.GridHeight : this._GridHeight;
  }
  set GridHeight(t) {
    vt("snap-to-grid height", t), this._GridHeight !== t && (this._GridHeight = t, this._reportChange("configure", this, "GridHeight", t), this.rerender());
  }
  /**** Index ****/
  get Index() {
    return this._Folder == null ? -1 : this._Folder.IndexOfBoard(this);
  }
  set Index(t) {
    _("Index");
  }
  /**** mayBeShiftedUp ****/
  get mayBeShiftedUp() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardUp(this);
  }
  set mayBeShiftedUp(t) {
    _("mayBeShiftedUp");
  }
  /**** mayBeShiftedDown ****/
  get mayBeShiftedDown() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardDown(this);
  }
  set mayBeShiftedDown(t) {
    _("mayBeShiftedDown");
  }
  /**** mayBeShiftedIn ****/
  get mayBeShiftedIn() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardIn(this);
  }
  set mayBeShiftedIn(t) {
    _("mayBeShiftedIn");
  }
  /**** mayBeShiftedOut ****/
  get mayBeShiftedOut() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardOut(this);
  }
  set mayBeShiftedOut(t) {
    _("mayBeShiftedOut");
  }
  /**** containsFolder ****/
  containsFolder(t) {
    for (ut("folder", t), t = t.Folder; t != null; ) {
      if (t === this)
        return !0;
      t = t.Folder;
    }
    return !1;
  }
  get BoardList() {
    return this._BoardList.slice();
  }
  set BoardList(t) {
    _("BoardList");
  }
  /**** BoardCount ****/
  get BoardCount() {
    return this._BoardList.length;
  }
  set BoardCount(t) {
    _("BoardCount");
  }
  /**** IndexOfBoard ****/
  IndexOfBoard(t) {
    const i = this.Board(t);
    return i == null ? -1 : this._BoardList.indexOf(i);
  }
  /**** Board ****/
  Board(t) {
    switch (Mt("board, name or index", t), !0) {
      case Ne(t):
        const i = t;
        return i._Folder === this ? i : void 0;
      case j(t):
        let n = t;
        return n < 0 && (n += this._BoardList.length), this._BoardList[n];
      case ze(t):
        return this.BoardNamed(t);
    }
    C(
      "InvalidArgument: no valid board, board name or board index given"
    );
  }
  /**** existingBoard ****/
  existingBoard(t) {
    let i = this.Board(t);
    return i == null && C(
      "BoardNotFound: the desired board could not be found"
    ), i;
  }
  /**** BoardNamed ****/
  BoardNamed(t) {
    ue("SNS board name", t), t = t.trim().toLowerCase();
    let i;
    return this._BoardList.forEach((n) => {
      i == null && n.Name != null && n.Name.toLowerCase() === t && (i = n);
    }), i;
  }
  /**** BoardAt ****/
  BoardAt(t) {
    return Y("SNS board index", t), t < 0 && (t += this._BoardList.length), this._BoardList[t];
  }
  /**** hasBoard ****/
  hasBoard(t) {
    return this.Board(t) != null;
  }
  /**** newBoardAt ****/
  newBoardAt(t, i) {
    return i == null ? this.BoardDeserializedAt({}, t) : this.BoardDeserializedAt({ Id: i }, t);
  }
  /**** BoardDeserializedAt - nota bene: needs explicit script activation! ****/
  BoardDeserializedAt(t, i) {
    Oe("board serialization", t), me("board insertionindex", i), i == null ? i = this._BoardList.length : (i < 0 && (i += this._BoardList.length), i = Math.max(0, Math.min(i, this._BoardList.length)));
    const n = qt("board id", t.Id);
    let o = new bt(this._Project, n);
    return this._attachBoardAt(o, i), o._deserializeConfigurationFrom(t), o._deserializeStickersFrom(t), o._deserializeBoardsFrom(t), this.rerender(), o;
  }
  /**** DuplicateOfBoardAt ****/
  DuplicateOfBoardAt(t) {
    Y("board index", t);
    const n = this.existingBoard(t).Serialization;
    return We(n), this.BoardDeserializedAt(n, t + 1);
  }
  /**** mayShiftBoardUp/Down ****/
  mayShiftBoardUp(t) {
    const i = this.existingBoard(t);
    return this._BoardList.indexOf(i) > 0;
  }
  mayShiftBoardDown(t) {
    const i = this.existingBoard(t), n = this._BoardList, o = n.indexOf(i);
    return o >= 0 && o < n.length - 1;
  }
  /**** shiftBoardToTop ****/
  shiftBoardToTop(t) {
    const i = this.existingBoard(t);
    if (this.mayShiftBoardUp(i)) {
      const n = this._BoardList.indexOf(i);
      this._detachBoardAt(n), this._attachBoardAt(i, 0), this.rerender();
    }
  }
  /**** shiftBoardUp ****/
  shiftBoardUp(t) {
    const i = this.existingBoard(t);
    if (this.mayShiftBoardUp(i)) {
      const n = this._BoardList.indexOf(i);
      this._detachBoardAt(n), this._attachBoardAt(i, n - 1), this.rerender();
    }
  }
  /**** shiftBoardDown ****/
  shiftBoardDown(t) {
    const i = this.existingBoard(t);
    if (this.mayShiftBoardDown(i)) {
      const n = this._BoardList.indexOf(i);
      this._detachBoardAt(n), this._attachBoardAt(i, n + 1), this.rerender();
    }
  }
  /**** shiftBoardToBottom ****/
  shiftBoardToBottom(t) {
    const i = this.existingBoard(t);
    if (this.mayShiftBoardDown(i)) {
      const n = this._BoardList.indexOf(i);
      this._detachBoardAt(n), this._attachBoardAt(i, this._BoardList.length), this.rerender();
    }
  }
  /**** shiftBoardTo ****/
  shiftBoardTo(t, i) {
    const n = this.existingBoard(t);
    Y("SNS board index", i), i < 0 && (i += this._BoardList.length), i = Math.max(0, Math.min(i, this._BoardList.length));
    const o = this._BoardList.indexOf(n);
    o !== i && (this._detachBoardAt(o), this._attachBoardAt(n, i), this.rerender());
  }
  /**** shiftBoardsByIndex ****/
  shiftBoardsByIndex(t, i, n) {
    const o = this._BoardList.length;
    se("old index", t, 0, o), se("new index", i, 0, o);
    const u = this._BoardList.slice(t, t + n);
    u.forEach((s) => this._detachBoardAt(t)), i > t && (i -= n), u.forEach(
      (s, l) => this._attachBoardAt(s, i + l)
    ), this.rerender();
  }
  /**** mayShiftBoardIn/Out ****/
  mayShiftBoardIn(t) {
    const i = this.existingBoard(t);
    return this.mayShiftBoardDown(i);
  }
  mayShiftBoardOut(t) {
    return this._Folder != null;
  }
  /**** shiftBoardIn ****/
  shiftBoardIn(t) {
    const i = this.existingBoard(t);
    if (this.mayShiftBoardIn(i)) {
      const n = this._BoardList.indexOf(i), o = this._BoardList[n + 1];
      this._detachBoardAt(n), o._attachBoardAt(i, 0), this.rerender(), o.rerender();
    }
  }
  /**** shiftBoardOut ****/
  shiftBoardOut(t) {
    const i = this.existingBoard(t);
    if (this.mayShiftBoardOut(i)) {
      const n = this._BoardList.indexOf(i), o = this._Folder;
      this._detachBoardAt(n), o._attachBoardAt(i, o.Index), this.rerender(), o.rerender();
    }
  }
  /**** mayMoveBoardTo ****/
  mayMoveBoardTo(t, i, n) {
    const o = this.existingBoard(t), u = le(i) ? i : this.existingBoard(i);
    return me("insertion index", n), u.isAttached && u !== o && !o.containsFolder(u);
  }
  /**** moveBoardTo ****/
  moveBoardTo(t, i, n) {
    const o = this.existingBoard(t), u = le(i) ? i : this.existingBoard(i);
    if (me("insertion index", n), u.isAttached && u !== o && !o.containsFolder(u)) {
      const s = this._BoardList.indexOf(o);
      let l = n ?? u.BoardCount;
      l < 0 && (l += u.BoardCount), l = Math.max(0, Math.min(l, u.BoardCount)), this._detachBoardAt(s), u._attachBoardAt(o, l), this.rerender(), u.rerender();
    }
  }
  /**** destroyBoard ****/
  destroyBoard(t) {
    const i = this.Board(t);
    if (i == null) {
      Ne(t) && C(
        "NoSuchBoard: the given board could not be found"
      );
      return;
    }
    i.clear(), ht(i);
    const n = this._BoardList.indexOf(i);
    this._detachBoardAt(n), ar(i), i._Project = void 0, this._reportChange("destroyBoard", i), this.rerender();
  }
  /**** clear ****/
  clear() {
    for (let t = 0, i = this._BoardList.length; t < i; t++)
      this.destroyBoard(this._BoardList[0]);
  }
  /**** Rendering ****/
  Rendering(t) {
    if (this.hasError)
      return Ve.call(this);
    let i = this._Renderer;
    if (i == null)
      return "";
    try {
      return i.call(this, t);
    } catch (n) {
      return this.Error = {
        Type: "Rendering Failure",
        Message: "" + n,
        Cause: n
      }, Ve.call(this);
    }
  }
  /**** _attachBoardAt ****/
  /* protected */
  _attachBoardAt(t, i) {
    t._Folder = this, this._BoardList.splice(i, 0, t), this._reportChange("attachBoard", t, this, i);
  }
  /**** _detachBoardAt ****/
  /* protected */
  _detachBoardAt(t) {
    const i = this._BoardList.splice(t, 1)[0];
    i._Folder = void 0, this._reportChange("detachBoard", i, this, t);
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(t) {
    super._serializeConfigurationInto(t);
    const i = (n) => {
      this["_" + n] != null && (t[n] = this[n]);
    };
    [
      "SnapToGrid",
      "GridWidth",
      "GridHeight"
    ].forEach((n) => i(n));
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(t) {
    super._deserializeConfigurationFrom(t);
    const i = (n) => {
      if (t[n] != null)
        try {
          this[n] = t[n];
        } catch {
          console.warn(
            "DeserializationError:invalid value for property " + X(n)
          );
        }
    };
    [
      "SnapToGrid",
      "GridWidth",
      "GridHeight"
    ].forEach((n) => i(n));
  }
  /**** _serializeBoardsInto ****/
  _serializeBoardsInto(t) {
    const i = this._BoardList.slice();
    i.length > 0 && (t.BoardList = i.map(
      (n) => n.Serialization
    ));
  }
  /**** _deserializeBoardsFrom ****/
  _deserializeBoardsFrom(t) {
    this._BoardList.length > 0 && this.clear(), ge(t.BoardList, he) && t.BoardList.length > 0 && t.BoardList.forEach(
      (n, o) => {
        this.BoardDeserializedAt(n, o);
      }
    );
  }
}
const dr = /* @__PURE__ */ Object.create(null);
[
  "Name",
  "BackgroundColor",
  "BackgroundTexture",
  "FontFamily",
  "FontSize",
  "FontWeight",
  "FontStyle",
  "LineHeight",
  "ForegroundColor",
  "Value",
  "activeScript",
  "pendingScript",
  "SnapToGrid",
  "GridWidth",
  "GridHeight"
].forEach((r) => dr[r] = !0);
class qe extends pt {
  constructor(t) {
    super(void 0, void 0);
    /**** onChange ****/
    k(this, "_onChange", []);
    /**** onRender ****/
    k(this, "_onRender", []);
    /**** onError ****/
    k(this, "_onError", []);
    this._Project = this, ue("project name", t), this._Name = t;
  }
  /**** Name ****/
  get Name() {
    return this._Name;
  }
  set Name(t) {
    _("Name");
  }
  /**** IndexPath ****/
  get IndexPath() {
    return [];
  }
  set IndexPath(t) {
    _("IndexPath");
  }
  /**** BoardAtIndexPath ****/
  BoardAtIndexPath(t) {
    if (Ir("board index path", t, de), t.length !== 0) {
      let i;
      for (let n = 0, o = t.length; n < o; n++)
        if (i = (i || this).BoardAt(t[n]), i == null)
          return;
      return i;
    }
  }
  /**** FolderWithId ****/
  FolderWithId(t) {
    return I("folder id", t), Ft(this, t);
  }
  /**** BoardWithId ****/
  BoardWithId(t) {
    const i = Ft(this, t);
    return fe(i) && C(
      "NotABoard: the folder with the given id is not a board, but the project"
    ), i;
  }
  /**** StickerWithId ****/
  StickerWithId(t) {
    return I("sticker id", t), Ci(this, t);
  }
  /**** recursivelyActivateAllScripts ****/
  recursivelyActivateAllScripts() {
    this.activateScript(), this._BoardList.forEach(
      (t) => t.recursivelyActivateAllScripts()
    );
  }
  onChange(t) {
    oe('"onChange" callback', t), this._onChange.push(t);
  }
  /**** _reportChange ****/
  /* protected */
  _reportChange(t, i, ...n) {
    t === "configure" && (t = le(i) ? "configureFolder" : "configureSticker"), n.unshift(this, t, i), this._onChange.forEach(
      // @ts-ignore TS2345 skip checking of individual "ArgList" elements
      (o) => o.apply(this, n)
    );
  }
  onRender(t) {
    oe('"onRender" callback', t), this._onRender.push(t);
  }
  /**** rerender ****/
  rerender(t, i) {
    this._onRender.forEach(
      (n) => n(this, t, i)
    );
  }
  onError(t) {
    oe('"onError" callback', t), this._onError.push(t);
  }
  /**** showError ****/
  showError(t, i) {
    this._onError.forEach(
      (n) => n(this, t, i)
    );
  }
  /**** Serialization ****/
  get Serialization() {
    const t = {};
    return this._serializeConfigurationInto(t), this._serializeBoardsInto(t), delete t.Id, t;
  }
  set Serialization(t) {
    _("Serialization");
  }
  /**** deserializedFrom - nota bene: needs explicit script activation! ****/
  static deserializedFrom(t, i) {
    ue("project name", t);
    const n = new qe(t);
    return delete i.Name, n._Name = t, n._deserializeConfigurationFrom(i), n._deserializeBoardsFrom(i), n;
  }
}
const St = /* @__PURE__ */ Object.create(null);
[
  "Name",
  "BackgroundColor",
  "BackgroundTexture",
  "FontFamily",
  "FontSize",
  "FontWeight",
  "FontStyle",
  "LineHeight",
  "ForegroundColor",
  "Value",
  "activeScript",
  "pendingScript",
  "SnapToGrid",
  "GridWidth",
  "GridHeight"
].forEach((r) => St[r] = !0);
class bt extends pt {
  /* protected */
  constructor(t, i) {
    super(t, i);
    /**** StickerList ****/
    k(this, "_StickerList", []);
    Li(t, this), t._reportChange("createBoard", this);
  }
  get StickerList() {
    return this._StickerList.slice();
  }
  set StickerList(t) {
    _("StickerList");
  }
  /**** StickerCount ****/
  get StickerCount() {
    return this._StickerList.length;
  }
  set StickerCount(t) {
    _("StickerCount");
  }
  /**** IndexOfSticker ****/
  IndexOfSticker(t) {
    return Ue("SNS sticker to search for", t), this._StickerList.indexOf(t);
  }
  /**** Sticker ****/
  Sticker(t) {
    switch (Mt("sticker, name or index", t), !0) {
      case Ce(t):
        const i = t;
        return i.Board === this ? i : void 0;
      case j(t):
        const n = t;
        return this._StickerList[n];
      case ze(t):
        return this.StickerNamed(t);
    }
    C(
      "InvalidArgument: no valid sticker, sticker name or sticker index given"
    );
  }
  /**** existingSticker ****/
  existingSticker(t) {
    let i = this.Sticker(t);
    return i == null && C(
      "StickerNotFound: the desired sticker could not be found"
    ), i;
  }
  /**** StickerNamed ****/
  StickerNamed(t) {
    ue("SNS sticker name", t), t = t.trim().toLowerCase();
    let i;
    return this._StickerList.forEach((n) => {
      i == null && n.Name != null && n.Name.toLowerCase() === t && (i = n);
    }), i;
  }
  /**** StickerAt ****/
  StickerAt(t) {
    return Y("SNS sticker index", t), t < 0 && (t += this._StickerList.length), this._StickerList[t];
  }
  /**** hasSticker ****/
  hasSticker(t) {
    return this.Sticker(t) != null;
  }
  /**** newStickerAt ****/
  newStickerAt(t, i) {
    return i == null ? this.StickerDeserializedAt({}, t) : this.StickerDeserializedAt({ Id: i }, t);
  }
  /**** StickerDeserializedAt - nota bene: needs explicit script activation! ****/
  StickerDeserializedAt(t, i) {
    Oe("sticker serialization", t), me("SNS sticker index", i), i == null ? i = this._StickerList.length : (i < 0 && (i += this._StickerList.length), i = Math.max(0, Math.min(i, this._StickerList.length)));
    const n = qt("sticker id", t.Id);
    let o = new mt(this.Project, n);
    return this._attachStickerAt(o, i), o._deserializeConfigurationFrom(t), this.rerender(), o;
  }
  /**** DuplicateOfStickerAt ****/
  DuplicateOfStickerAt(t) {
    Y("SNS sticker index", t);
    const n = this.existingSticker(t).Serialization;
    return We(n), this.StickerDeserializedAt(n, t + 1);
  }
  /**** mayShiftStickerUp/Down ****/
  mayShiftStickerUp(t) {
    const i = this.existingSticker(t);
    return this._StickerList.indexOf(i) > 0;
  }
  mayShiftStickerDown(t) {
    const i = this.existingSticker(t), n = this._StickerList, o = n.indexOf(i);
    return o >= 0 && o < n.length - 1;
  }
  /**** shiftStickerToTop ****/
  shiftStickerToTop(t) {
    const i = this.existingSticker(t);
    if (this.mayShiftStickerUp(i)) {
      const n = this._StickerList.indexOf(i);
      this._detachStickerAt(n), this._attachStickerAt(i, 0), this.rerender();
    }
  }
  /**** shiftStickerUp ****/
  shiftStickerUp(t) {
    const i = this.existingSticker(t);
    if (this.mayShiftStickerUp(i)) {
      const n = this._StickerList.indexOf(i);
      this._detachStickerAt(n), this._attachStickerAt(i, n - 1), this.rerender();
    }
  }
  /**** shiftStickerDown ****/
  shiftStickerDown(t) {
    const i = this.existingSticker(t);
    if (this.mayShiftStickerDown(i)) {
      const n = this._StickerList.indexOf(i);
      this._detachStickerAt(n), this._attachStickerAt(i, n + 1), this.rerender();
    }
  }
  /**** shiftStickerToBottom ****/
  shiftStickerToBottom(t) {
    const i = this.existingSticker(t);
    if (this.mayShiftStickerDown(i)) {
      const n = this._StickerList.indexOf(i);
      this._detachStickerAt(n), this._attachStickerAt(i, this._StickerList.length), this.rerender();
    }
  }
  /**** shiftStickerTo ****/
  shiftStickerTo(t, i) {
    const n = this.existingSticker(t);
    Y("SNS sticker index", i), i < 0 && (i += this._StickerList.length), i = Math.max(0, Math.min(i, this._StickerList.length - 1));
    const o = this._StickerList.indexOf(n);
    o !== i && (this._detachStickerAt(o), this._attachStickerAt(n, i), this.rerender());
  }
  /**** shiftStickersByIndex ****/
  shiftStickersByIndex(t, i, n) {
    const o = this._StickerList.length;
    se("old index", t, 0, o), se("new index", i, 0, o);
    const u = this._StickerList.slice(t, t + n);
    u.forEach((s) => this._detachStickerAt(t)), i > t && (i -= n), u.forEach(
      (s, l) => this._attachStickerAt(s, i + l)
    ), this.rerender();
  }
  /**** destroySticker ****/
  destroySticker(t) {
    const i = this.Sticker(t);
    if (i == null) {
      Ce(t) && C(
        "NoSuchSticker: the given sticker could not be found"
      );
      return;
    }
    ht(i);
    const n = this._StickerList.indexOf(i);
    this._detachStickerAt(n), sr(i), i._Project = void 0, this._reportChange("destroySticker", i), this.rerender();
  }
  /**** clear ****/
  clear() {
    super.clear();
    for (let t = 0, i = this._StickerList.length; t < i; t++)
      this.destroySticker(this._StickerList[0]);
  }
  /**** recursivelyActivateAllScripts ****/
  recursivelyActivateAllScripts() {
    this.activateScript(), this._BoardList.forEach(
      (t) => t.recursivelyActivateAllScripts()
    ), this._StickerList.forEach(
      (t) => t.activateScript()
    );
  }
  /**** rerender ****/
  rerender() {
    this.Project.rerender(this);
  }
  /**** _attachStickerAt ****/
  /* protected */
  _attachStickerAt(t, i) {
    t._Folder = this, this._StickerList.splice(i, 0, t), this._reportChange("attachSticker", t, this, i);
  }
  /**** _detachStickerAt ****/
  /* protected */
  _detachStickerAt(t) {
    const i = this._StickerList.splice(t, 1)[0];
    i._Folder = void 0, this._reportChange("detachSticker", i, this, t);
  }
  /**** Serialization ****/
  get Serialization() {
    const t = {};
    return this._serializeConfigurationInto(t), this._serializeBoardsInto(t), this._serializeStickersInto(t), t;
  }
  set Serialization(t) {
    _("Serialization");
  }
  /**** _serializeStickersInto ****/
  _serializeStickersInto(t) {
    const i = this._StickerList.slice();
    i.length > 0 && (t.StickerList = i.map(
      (n) => n.Serialization
    ));
  }
  /**** _deserializeStickersFrom ****/
  _deserializeStickersFrom(t) {
    this._StickerList.length > 0 && this.clear(), ge(t.StickerList, he) && t.StickerList.length > 0 && t.StickerList.forEach(
      (n, o) => {
        this.StickerDeserializedAt(n, o);
      }
    );
  }
}
const zi = /* @__PURE__ */ Object.create(null);
[
  "Name",
  "BackgroundColor",
  "BackgroundTexture",
  "FontFamily",
  "FontSize",
  "FontWeight",
  "FontStyle",
  "LineHeight",
  "ForegroundColor",
  "Value",
  "activeScript",
  "pendingScript",
  "SnapToGrid",
  "GridWidth",
  "GridHeight"
].forEach((r) => St[r] = !0);
class mt extends ft {
  /* protected */
  constructor(t, i) {
    super(t, i);
    /**** minWidth ****/
    k(this, "_minWidth");
    /**** maxWidth ****/
    k(this, "_maxWidth", vi);
    /**** minHeight ****/
    k(this, "_minHeight");
    /**** maxHeight ****/
    k(this, "_maxHeight", _i);
    /**** Geometry ****/
    k(this, "_Geometry", { ...Q });
    /**** Lock ****/
    k(this, "_Lock", !1);
    /**** Visibility ****/
    k(this, "_Visibility", !0);
    /**** Enabling ****/
    k(this, "_Enabling", !0);
    Ni(t, this), t._reportChange("createSticker", this);
  }
  /**** Board ****/
  get Board() {
    return this._Folder;
  }
  set Board(t) {
    _("Board");
  }
  /**** BackgroundTexture ****/
  get BackgroundTexture() {
    return this._BackgroundTexture;
  }
  set BackgroundTexture(t) {
    Wt("visual background texture", t), this._BackgroundTexture !== t && (this._BackgroundTexture = t, this._reportChange("configure", this, "BackgroundTexture", t), this.rerender());
  }
  /**** Index ****/
  get Index() {
    return this._Folder.IndexOfSticker(this);
  }
  set Index(t) {
    _("Index");
  }
  /**** mayBeShiftedUp ****/
  get mayBeShiftedUp() {
    return this._Folder.mayShiftStickerUp(this);
  }
  set mayBeShiftedUp(t) {
    _("mayBeShiftedUp");
  }
  /**** mayBeShiftedDown ****/
  get mayBeShiftedDown() {
    return this._Folder.mayShiftStickerDown(this);
  }
  set mayBeShiftedDown(t) {
    _("mayBeShiftedDown");
  }
  get minWidth() {
    return this._minWidth == null ? mi : this._minWidth;
  }
  set minWidth(t) {
    ne("minimal sticker width", t), this._minWidth !== t && (this._minWidth = t, this._reportChange("configure", this, "minWidth", t), this._minWidth != null && this._maxWidth != null && this._maxWidth < this._minWidth && (this._maxWidth = t, this._reportChange("configure", this, "maxWidth", this._minWidth)), this._minWidth != null && this._Geometry.Width < this._minWidth && (this.Width = this._minWidth), this.rerender());
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(t) {
    ne("maximal sticker width", t), t != null && this._minWidth != null && (t = Math.max(this._minWidth, t)), this._maxWidth !== t && (this._maxWidth = t, this._reportChange("configure", this, "maxWidth", this._maxWidth), this._maxWidth != null && this._Geometry.Width > this._maxWidth && (this.Width = this._maxWidth), this.rerender());
  }
  get minHeight() {
    return this._minHeight == null ? ki : this._minHeight;
  }
  set minHeight(t) {
    ne("minimal sticker height", t), this._minHeight !== t && (this._minHeight = t, this._reportChange("configure", this, "minHeight", t), this._minHeight != null && this._maxHeight != null && this._maxHeight < this._minHeight && (this._maxHeight = t, this._reportChange("configure", this, "maxHeight", this._minHeight)), this._minHeight != null && this._Geometry.Height < this._minHeight && (this.Height = this._minHeight), this.rerender());
  }
  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(t) {
    ne("maximal sticker height", t), t != null && this._minHeight != null && (t = Math.max(this._minHeight, t)), this._maxHeight !== t && (this._maxHeight = t, this._reportChange("configure", this, "maxHeight", this._maxHeight), this._maxHeight != null && this._Geometry.Height > this._maxHeight && (this.Height = this._maxHeight), this.rerender());
  }
  /**** x ****/
  get x() {
    return this._Geometry.x;
  }
  set x(t) {
    rt("sticker x coordinate", t), this.Geometry = { ...this.Geometry, x: t };
  }
  /**** y ****/
  get y() {
    return this._Geometry.y;
  }
  set y(t) {
    rt("sticker y coordinate", t), this.Geometry = { ...this.Geometry, y: t };
  }
  /**** Width ****/
  get Width() {
    return this._Geometry.Width;
  }
  set Width(t) {
    it("sticker width", t), this.Geometry = { ...this.Geometry, Width: t };
  }
  /**** Height ****/
  get Height() {
    return this._Geometry.Height;
  }
  set Height(t) {
    it("sticker height", t), this.Geometry = { ...this.Geometry, Height: t };
  }
  /**** Position ****/
  get Position() {
    return { x: this._Geometry.x, y: this._Geometry.y };
  }
  set Position(t) {
    Jt("visual position", t), this.Geometry = { ...this.Geometry, x: t.x, y: t.y };
  }
  /**** Size ****/
  get Size() {
    return { Width: this._Geometry.Width, Height: this._Geometry.Height };
  }
  set Size(t) {
    Qt("visual size", t), this.Geometry = { ...this.Geometry, Width: t.Width, Height: t.Height };
  }
  get Geometry() {
    let { x: t, y: i, Width: n, Height: o } = this._Geometry;
    return this._minWidth != null && (n = Math.max(this._minWidth, n)), this._maxWidth != null && (n = Math.min(n, this._maxWidth)), this._minHeight != null && (o = Math.max(this._minHeight, o)), this._maxHeight != null && (o = Math.min(o, this._maxHeight)), { x: t, y: i, Width: n, Height: o };
  }
  set Geometry(t) {
    tr("visual geometry", t);
    let { x: i, y: n, Width: o, Height: u } = this._Geometry;
    (i !== t.x || o !== t.Width || n !== t.y || u !== t.Height) && (this._Geometry = { ...t }, this._reportChange("configure", this, "Geometry", { ...t }), this.rerender());
  }
  get Lock() {
    return this._Lock;
  }
  set Lock(t) {
    Xe("sticker lock", t), this._Lock !== t && (this._Lock = t, this._reportChange("configure", this, "Lock", t), this.rerender());
  }
  /**** lock/unlock ****/
  lock() {
    this.Lock = !0;
  }
  unlock() {
    this.Lock = !1;
  }
  /**** isLocked ****/
  get isLocked() {
    return this._Lock;
  }
  set isLocked(t) {
    this.Lock = t;
  }
  get Visibility() {
    return this._Visibility;
  }
  set Visibility(t) {
    Xe("sticker visibility", t), this._Visibility !== t && (this._Visibility = t, this._reportChange("configure", this, "Visibility", t), this.rerender());
  }
  /**** show/hide ****/
  show() {
    this.Visibility = !0;
  }
  hide() {
    this.Visibility = !1;
  }
  /**** isVisible ****/
  get isVisible() {
    return this._Visibility;
  }
  set isVisible(t) {
    this.Visibility = t;
  }
  get Enabling() {
    return this._Enabling;
  }
  set Enabling(t) {
    Xe("sticker enabling", t), this._Enabling !== t && (this._Enabling = t, this._reportChange("configure", this, "Enabling", t), this.rerender());
  }
  /**** enable/disable ****/
  enable() {
    this.Enabling = !0;
  }
  disable() {
    this.Enabling = !1;
  }
  /**** isEnabled ****/
  get isEnabled() {
    return this._Enabling;
  }
  set isEnabled(t) {
    this.Enabling = t;
  }
  /**** Rendering ****/
  Rendering(t) {
    if (this.hasError)
      return Ve.call(this);
    let i = this._Renderer || or;
    try {
      return i.call(this, t);
    } catch (n) {
      return this.Error = {
        Type: "Rendering Failure",
        Message: "" + n,
        Cause: n
      }, Ve.call(this);
    }
  }
  /**** rerender ****/
  rerender() {
    this._Project.rerender(this._Folder, this);
  }
  /**** Serialization ****/
  get Serialization() {
    const t = {};
    return this._serializeConfigurationInto(t), t;
  }
  set Serialization(t) {
    _("Serialization");
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(t) {
    super._serializeConfigurationInto(t), t.Geometry = { ...this._Geometry }, this._minWidth != null && (t.minWidth = this._minWidth), this._maxWidth != null && (t.maxWidth = this._maxWidth), this._minHeight != null && (t.minHeight = this._minHeight), this._maxHeight != null && (t.maxHeight = this._maxHeight), this.isLocked && (t.Lock = !0), this.isVisible || (t.Visibility = !1), this.isEnabled || (t.Enabling = !1);
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(t) {
    super._deserializeConfigurationFrom(t);
    let { x: i, y: n, Width: o, Height: u } = t.Geometry || Q;
    Z(i) || (i = Q.x), Z(n) || (n = Q.y), q(o) || (o = Q.Width), q(u) || (u = Q.Height), this.Geometry = { x: i, y: n, Width: o, Height: u }, t.Lock != null && (this.Lock = t.Lock), t.Visibility != null && (this.Visibility = t.Visibility), t.Enabling != null && (this.Enabling = t.Enabling);
  }
}
const Jn = ["not-ready", "disconnected", "connecting", "connected"];
class Kn {
}
window.SNS = {
  throwError: C,
  throwReadOnlyError: _,
  SNS_Project: qe
};
console.log("SNS is globally available now");
document.dispatchEvent(
  // @ts-ignore TS2339 allow global variable "SNS"
  new CustomEvent("SNS", { detail: window.SNS })
);
export {
  cr as CSSStyleOfVisual,
  Kn as SNS_Adapter,
  bt as SNS_Board,
  xn as SNS_Changes,
  Jn as SNS_ConnectionStates,
  ii as SNS_ErrorTypes,
  pt as SNS_Folder,
  ri as SNS_FontStyles,
  qe as SNS_Project,
  mt as SNS_Sticker,
  ft as SNS_Visual,
  jn as TemplateOfBehavior,
  Ne as ValueIsBoard,
  q as ValueIsDimension,
  rr as ValueIsError,
  le as ValueIsFolder,
  er as ValueIsGeometry,
  Zt as ValueIsId,
  Xt as ValueIsIdentifier,
  Z as ValueIsLocation,
  ze as ValueIsName,
  jt as ValueIsPosition,
  fe as ValueIsProject,
  ir as ValueIsSerializable,
  Kt as ValueIsSize,
  Ce as ValueIsSticker,
  zt as ValueIsVisual,
  $i as acceptableBoolean,
  dt as acceptableColor,
  Bi as acceptableEMailAddress,
  On as acceptableFunction,
  Mn as acceptableInteger,
  Rn as acceptableIntegerInRange,
  qn as acceptableList,
  nr as acceptableListSatisfying,
  Pn as acceptableNonEmptyString,
  Ze as acceptableNumber,
  Dn as acceptableNumberInRange,
  y as acceptableOptionalBoolean,
  yi as acceptableOptionalColor,
  Zn as acceptableOptionalFunction,
  Wn as acceptableOptionalInteger,
  Hn as acceptableOptionalIntegerInRange,
  Xn as acceptableOptionalList,
  R as acceptableOptionalListSatisfying,
  En as acceptableOptionalNonEmptyString,
  P as acceptableOptionalNumber,
  J as acceptableOptionalNumberInRange,
  V as acceptableOptionalOrdinal,
  Gn as acceptableOptionalString,
  L as acceptableOptionalStringMatching,
  zn as acceptableOptionalText,
  F as acceptableOptionalTextline,
  An as acceptableOrdinal,
  Ii as acceptablePhoneNumber,
  Tn as acceptableString,
  Un as acceptableStringMatching,
  pe as acceptableText,
  N as acceptableTextline,
  ie as acceptableURL,
  si as allowBoard,
  ne as allowDimension,
  nt as allowError,
  oi as allowFolder,
  pi as allowGeometry,
  ui as allowId,
  di as allowIdentifier,
  hi as allowLocation,
  Yt as allowName,
  gi as allowPosition,
  ai as allowProject,
  bi as allowSerializable,
  fi as allowSize,
  li as allowSticker,
  ni as allowVisual,
  Ki as allowedBoard,
  cn as allowedDimension,
  mn as allowedError,
  Xi as allowedFolder,
  Sn as allowedGeometry,
  qt as allowedId,
  nn as allowedIdentifier,
  ln as allowedLocation,
  an as allowedName,
  hn as allowedPosition,
  ji as allowedProject,
  kn as allowedSerializable,
  fn as allowedSize,
  en as allowedSticker,
  Zi as allowedVisual,
  yn as attachBoard,
  Nn as attachSticker,
  $n as configureFolder,
  Ln as configureSticker,
  wn as createBoard,
  Fn as createSticker,
  In as destroyBoard,
  Vn as destroySticker,
  Bn as detachBoard,
  Cn as detachSticker,
  ct as expectBoard,
  it as expectDimension,
  Si as expectError,
  ut as expectFolder,
  tr as expectGeometry,
  I as expectId,
  re as expectIdentifier,
  rt as expectLocation,
  ue as expectName,
  Jt as expectPosition,
  W as expectProject,
  Oe as expectSerializable,
  Qt as expectSize,
  Ue as expectSticker,
  Ot as expectVisual,
  Qi as expectedBoard,
  dn as expectedDimension,
  vn as expectedError,
  Yi as expectedFolder,
  bn as expectedGeometry,
  rn as expectedId,
  on as expectedIdentifier,
  un as expectedLocation,
  sn as expectedName,
  gn as expectedPosition,
  Ji as expectedProject,
  _n as expectedSerializable,
  pn as expectedSize,
  tn as expectedSticker,
  qi as expectedVisual,
  Yn as groupedBehaviorEntryList,
  Fi as newId,
  We as removeIdsFrom,
  Bt as sanitizeBoardList,
  It as sanitizeStickerList,
  C as throwError,
  _ as throwReadOnlyError
};
//# sourceMappingURL=shareableNoteStickers.js.map
