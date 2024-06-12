var ti = Object.defineProperty;
var ii = (i, e, t) => e in i ? ti(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var _ = (i, e, t) => (ii(i, typeof e != "symbol" ? e + "" : e, t), t);
import { ValidatorForClassifier as v, acceptNil as F, rejectNil as L, quoted as z, ValueIsTextline as G, ValueIsStringMatching as P, ValueIsFiniteNumber as vt, ValueIsObject as Ke, ValueIsPlainObject as Fe, ValueIsOneOf as ri, ValueIsText as Qe, expectOrdinal as Le, allowOrdinal as me, ValueIsBoolean as xt, ValueIsNumber as ne, ValueIsNumberInRange as wt, ValueIsInteger as Ne, ValueIsIntegerInRange as $t, ValueIsOrdinal as Je, ValueIsString as O, ValueIsFunction as Bt, ValueIsList as ke, ValueIsListSatisfying as De, ValueIsColor as et, ValueIsEMailAddress as yt, ValueIsURL as It, expectTextline as ze, allowPlainObject as ni, allowFunction as ue, allowColor as ht, allowURL as Vt, allowTextline as oi, allowIntegerInRange as ai, allowOneOf as si, ValuesDiffer as Te, allowText as gt, allowBoolean as li, allowCardinal as pt, expectValue as Ft, expectInteger as q, allowInteger as de, expectIntegerInRange as _e, expectListSatisfying as ui, expectFunction as ee, expectBoolean as Ge } from "javascript-interface-library";
import { h as di } from "preact";
import ci from "htm";
import { customAlphabet as hi } from "nanoid";
import { nolookalikesSafe as gi } from "nanoid-dictionary";
var Ce = ci.bind(di);
const pi = [
  "String",
  "Number",
  "Object",
  "Array",
  "Boolean",
  "Date"
];
function Pe(i) {
  return i && typeof i == "object";
}
function Oe(i, e, t) {
  Object.defineProperty(i, e, { value: t, enumerable: !1, configurable: !0 });
}
function ft(i, e, t) {
  Oe(i, "__key", e), Oe(i, "__parent", t);
}
function fi(i) {
  return Object.getOwnPropertyNames(i).concat(
    Object.getPrototypeOf(i) && pi.indexOf(Object.getPrototypeOf(i).constructor.name) < 0 ? Object.getOwnPropertyNames(Object.getPrototypeOf(i)) : []
  ).filter((e) => e !== "constructor" && typeof i[e] == "function");
}
const tt = {
  computedStack: [],
  trackerSymbol: Symbol("tracker")
};
let j = null;
const be = Symbol();
function Ze() {
  if (j) {
    for (const i of j)
      i(), i[be] = !1;
    j = null;
  }
}
function St(i, e) {
  i[be] || (j === null && (j = [], e === !0 ? queueMicrotask(Ze) : setTimeout(Ze, e)), j.push(i));
}
const { computedStack: le, trackerSymbol: Ee } = tt, Ue = Symbol("__observed"), T = Symbol("modifiedProperty");
function ce(i, e = {}) {
  const {
    props: t,
    ignore: r,
    batch: n,
    deep: a = !0,
    bubble: d,
    bind: s
  } = e;
  if (i[Ue])
    return i;
  const l = (h) => h !== Ue && (t == null || t instanceof Array && t.includes(h)) && (r == null || r instanceof Array && !r.includes(h));
  a && Object.entries(i).forEach(function([h, g]) {
    Pe(g) && l(h) && (i[h] = ce(g, e), d && ft(i[h], h, i));
  });
  function o(h, g, p) {
    if (g === "__handler")
      Oe(h, "__handler", p);
    else if (!l(g))
      h[g] = p;
    else if (Array.isArray(h) && g === "length" || Si(h[g], p)) {
      const S = g !== T && a && Pe(p), m = h[g];
      h[g] = S ? ce(p, e) : p, S && d && ft(h[g], g, h);
      const k = [g];
      let x = h;
      for (; x && !(x.__handler && x.__handler(k, p, m, u) === !1); )
        x.__key && x.__parent ? (k.unshift(x.__key), x = x.__parent) : x = null;
      const A = c.get(g);
      if (A)
        for (const W of A) {
          const R = W[Ee], X = R && R.get(h), se = X && X.has(g);
          W.__disposed || R && !se ? A.delete(W) : W !== le[0] && (typeof n < "u" && n !== !1 ? (St(W, n), W[be] = !0) : W());
        }
      if (g !== T) {
        h[T] = g;
        const W = c.get(T);
        if (W)
          for (const R of W) {
            const X = R[Ee], se = X && X.get(h), ei = se && se.has(T);
            R.__disposed || X && !ei ? W.delete(R) : R !== le[0] && (typeof n < "u" && n !== !1 ? (St(R, n), R[be] = !0) : R());
          }
      }
    }
  }
  const c = /* @__PURE__ */ new Map(), u = new Proxy(i, {
    get(h, g) {
      if (g === Ue)
        return !0;
      if (l(g) && le.length) {
        const p = le[0], S = p[Ee];
        if (S) {
          let k = S.get(i);
          k || (k = /* @__PURE__ */ new Set(), S.set(i, k)), k.add(g);
        }
        let m = c.get(g);
        m || (m = /* @__PURE__ */ new Set(), c.set(g, m)), m.add(p);
      }
      return i[g];
    },
    set(h, g, p) {
      return o(i, g, p), !0;
    },
    defineProperty(h, g, p) {
      if (g === "__handler")
        throw new Error("Don't track bubble handlers");
      if (l(g)) {
        if (!Array.isArray(i) || g === "length") {
          "value" in p && a && Pe(p.value) && (p = { ...p }, p.value = ce(p.value, e));
          const S = Reflect.defineProperty(i, g, p);
          return g !== T && (i[T] = g), S;
        }
      } else
        return Reflect.defineProperty(i, g, p);
      return !1;
    },
    deleteProperty(h, g) {
      if (g === T)
        throw new Error(
          'internal property Symbol("modifiedProperty") must not be deleted'
        );
      return g in i && o(i, g, void 0), Reflect.deleteProperty(h, g);
    }
  });
  return s && fi(i).forEach((h) => i[h] = i[h].bind(u)), u;
}
function Si(i, e, t) {
  const r = /* @__PURE__ */ new Map();
  function n(a, d, s) {
    if (a === d)
      return !1;
    let l = typeof a;
    if (l !== typeof d)
      return !0;
    function o(u, h, g) {
      if (!Array.isArray(h) || u.length !== h.length)
        return !0;
      if (r.has(u) || r.has(h)) {
        if (r.has(u) && r.get(u).has(h) || r.has(h) && r.get(h).has(u))
          return !1;
        r.has(u) || r.set(u, /* @__PURE__ */ new Set()), r.get(u).add(h);
      }
      for (let p = 0, S = u.length; p < S; p++)
        if (n(u[p], h[p], g))
          return !0;
      return !1;
    }
    function c(u, h, g = "by-value") {
      if (Object.getPrototypeOf(u) !== Object.getPrototypeOf(h))
        return !0;
      for (let p in u)
        if (!(p in h))
          return !0;
      for (let p in h)
        if (!(p in u))
          return !0;
      if (r.has(u) || r.has(h)) {
        if (r.has(u) && r.get(u).has(h) || r.has(h) && r.get(h).has(u))
          return !1;
        r.has(u) || r.set(u, /* @__PURE__ */ new Set()), r.get(u).add(h);
      }
      for (let p in u)
        if (n(u[p], h[p], g))
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
        return isNaN(a) !== isNaN(d) || Math.abs(a - d) > Number.EPSILON;
      case "object":
        return a == null || d == null ? !0 : s === "by-value" && (a instanceof Boolean || a instanceof Number || a instanceof String) ? a.valueOf() !== d.valueOf() : Array.isArray(a) ? o(a, d, s) : s === "by-reference" ? !0 : c(a, d, s);
      default:
        return !0;
    }
    return !0;
  }
  return n(i, e, t);
}
const { computedStack: mt, trackerSymbol: mi } = tt;
function ki(i, { autoRun: e = !0, callback: t, bind: r, disableTracking: n = !1 } = {}) {
  function a(l, o = []) {
    const c = t || s;
    n || (c[mi] = /* @__PURE__ */ new WeakMap()), mt.unshift(c), o.length > 0 ? o = [...o, d] : o = [d];
    const u = l ? l() : r ? i.apply(r, o) : i(...o);
    return mt.shift(), u;
  }
  const d = { computeAsync: a }, s = (...l) => a(null, l);
  return e && s(), s;
}
function _i(i) {
  return i[tt.trackerSymbol] = null, i.__disposed = !0;
}
const bi = {
  observe: ce,
  modifiedProperty: T,
  computed: ki,
  dispose: _i,
  batch: Ze
}, Lt = G, { observe: vi, computed: Nt, dispose: xi } = bi, ve = document.createElement("style");
ve.innerHTML = `
/**** DefaultSticker ****/

  .SNS.DefaultSticker {
    left:0px; top:0px; right:0px; bottom:0px;
  }
`;
document.head.appendChild(ve);
const wi = ["normal", "italic"], $i = [
  "missing Behaviour",
  "Behaviour Execution Failure",
  "Script Compilation Failure",
  "Script Execution Failure",
  "Rendering Failure",
  "Event Handling Failure",
  '"onMount" Callback Failure',
  '"onUnmount" Callback Failure'
];
function N(i) {
  let e = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(i);
  if (e == null)
    throw new Error(i);
  {
    let t = new Error(e[2]);
    throw t.name = e[1], t;
  }
}
function b(i) {
  N(
    "ReadOnlyProperty: property " + z(i) + " must not be set"
  );
}
function Dt(i) {
  return i instanceof st;
}
const Bi = v(
  Dt,
  F,
  "SNS visual"
), kr = Bi, Ct = v(
  Dt,
  L,
  "SNS visual"
), _r = Ct;
function te(i) {
  return i instanceof lt;
}
const yi = v(
  te,
  F,
  "SNS folder"
), br = yi, it = v(
  te,
  L,
  "SNS folder"
), vr = it;
function oe(i) {
  return i instanceof Ae;
}
const Ii = v(
  oe,
  F,
  "SNS project"
), xr = Ii, C = v(
  oe,
  L,
  "SNS project"
), wr = C;
function xe(i) {
  return i instanceof dt;
}
const Vi = v(
  xe,
  F,
  "SNS board"
), $r = Vi, rt = v(
  xe,
  L,
  "SNS board"
), Br = rt;
function we(i) {
  return i instanceof ct;
}
const Fi = v(
  we,
  F,
  "SNS sticker"
), yr = Fi, Me = v(
  we,
  L,
  "SNS sticker"
), Ir = Me;
function Mt(i) {
  return G(i);
}
const Li = v(
  Mt,
  F,
  "unique SNS id"
), Wt = Li, B = v(
  Mt,
  L,
  "unique SNS id"
), Vr = B, Ni = /^[a-z$_][a-z$_0-9]*$/i;
function Rt(i) {
  return P(i, Ni);
}
const Di = v(
  Rt,
  F,
  "note stickers identifier"
), Fr = Di, K = v(
  Rt,
  L,
  "note stickers identifier"
), Lr = K;
function We(i) {
  return G(i);
}
const Ht = v(
  We,
  F,
  "SNS name"
), Nr = Ht, ie = v(
  We,
  L,
  "SNS name"
), Dr = ie;
function E(i) {
  return vt(i);
}
const Ci = v(
  E,
  F,
  "sticker coordinate"
), Cr = Ci, Xe = v(
  E,
  L,
  "sticker coordinate"
), Mr = Xe;
function U(i) {
  return vt(i) && i >= 0;
}
const J = v(
  U,
  F,
  "sticker dimension"
), Wr = J, Ye = v(
  U,
  L,
  "sticker dimension"
), Rr = Ye;
function At(i) {
  return Ke(i) && E(i.x) && E(i.y);
}
const Mi = v(
  At,
  F,
  "sticker position"
), Hr = Mi, Tt = v(
  At,
  L,
  "sticker position"
), Ar = Tt;
function Gt(i) {
  return Ke(i) && U(i.Width) && U(i.Height);
}
const Wi = v(
  Gt,
  F,
  "sticker size"
), Tr = Wi, Pt = v(
  Gt,
  L,
  "sticker size"
), Gr = Pt;
function Et(i) {
  return Ke(i) && E(i.x) && U(i.Width) && E(i.y) && U(i.Height);
}
const Ri = v(
  Et,
  F,
  "sticker geometry"
), Pr = Ri, Ut = v(
  Et,
  L,
  "sticker geometry"
), Er = Ut;
function zt(i) {
  return Fe(i) && ri(i.Type, $i) && Qe(i.Message);
}
const qe = v(
  zt,
  F,
  "error descriptor"
), Ur = qe, Hi = v(
  zt,
  L,
  "error descriptor"
), zr = Hi;
function Ot(i) {
  return Fe(i);
}
const Ai = v(
  Ot,
  F,
  "serializable object"
), Or = Ai, Re = v(
  Ot,
  L,
  "serializable object"
), Zr = Re, Xr = [
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
function Yr(i, e) {
  if (C("SNS project", i), B("board id", e), e === i.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let t = i.BoardWithId(e);
  if (t != null) {
    console.error('a board with the given "BoardId" exists already');
    return;
  }
  t = new dt(i, e);
}
function qr(i, e, t, r) {
  C("SNS project", i), B("folder id", e), K("property identifier", t);
  let n = i.FolderWithId(e);
  if (n == null) {
    console.error('no folder with the given "FolderId" found');
    return;
  }
  const a = oe(n) ? Jt : ut;
  if (!(t in a)) {
    console.warn('unsupported folder property "' + t + '"');
    return;
  }
  try {
    n[t] = r;
  } catch {
    console.warn('unsupported "' + t + '" value received');
    return;
  }
}
function jr(i, e, t, r) {
  if (C("SNS project", i), B("board id", e), B("folder id", t), Le("insertion index", r), e === i.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let n = i.BoardWithId(e);
  if (n == null) {
    console.error('no board with the given "BoardId" found');
    return;
  }
  let a = i.FolderWithId(t);
  if (a == null) {
    console.error('no folder with the given "FolderId" found');
    return;
  }
  if (n === a) {
    console.error("cannot attach a board to itself");
    return;
  }
  if (n.containsFolder(a)) {
    console.error("cannot attach an outer board to one of its inner boards");
    return;
  }
  const d = n.Folder;
  switch (!0) {
    case d === a:
      setTimeout(() => kt(i, d, n, r), 0);
      break;
    case d != null:
      setTimeout(() => kt(i, d, n), 0);
  }
  a._attachBoardAt(n, r);
}
function Kr(i, e, t, r) {
  if (C("SNS project", i), B("board id", e), B("folder id", t), Le("insertion index", r), e === i.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let n = i.BoardWithId(e);
  if (n == null)
    return;
  let a = i.FolderWithId(t);
  a != null && n.Folder === a && a.Board(r) === n && a._detachBoardAt(r);
}
function Qr(i, e) {
  if (C("SNS project", i), B("board id", e), e === i.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let t = i.BoardWithId(e);
  if (t != null) {
    if (t.Folder != null || t.BoardCount > 0 || t.StickerCount > 0) {
      console.error("cannot destroy a board that is still in use");
      return;
    }
    t._Project = void 0, Yt(t);
  }
}
function Jr(i, e) {
  C("SNS project", i), B("sticker id", e);
  let t = i.StickerWithId(e);
  if (t != null) {
    console.error('a sticker with the given "StickerId" exists already');
    return;
  }
  t = new ct(i, e);
}
function en(i, e, t, r) {
  C("SNS project", i), B("sticker id", e), K("property identifier", t);
  let n = i.StickerWithId(e);
  if (n == null) {
    console.error('no sticker with the given "StickerId" found');
    return;
  }
  if (!(t in cr)) {
    console.warn('unsupported sticker property "' + t + '"');
    return;
  }
  try {
    n[t] = r;
  } catch {
    console.warn('unsupported "' + t + '" value received');
    return;
  }
}
function tn(i, e, t, r) {
  C("SNS project", i), B("sticker id", e), B("board id", t), Le("insertion index", r);
  let n = i.StickerWithId(e);
  if (n == null) {
    console.error('no sticker with the given "StickerId" found');
    return;
  }
  let a = i.BoardWithId(t);
  if (a == null) {
    console.error('no board with the given "BoardId" found');
    return;
  }
  const d = n.Board;
  switch (!0) {
    case d === a:
      setTimeout(() => _t(i, d, n, r), 0);
      break;
    case d != null:
      setTimeout(() => _t(i, d, n), 0);
  }
  a._attachStickerAt(n, r);
}
function rn(i, e, t, r) {
  C("SNS project", i), B("sticker id", e), B("board id", t), Le("insertion index", r);
  let n = i.StickerWithId(e);
  if (n == null)
    return;
  let a = i.BoardWithId(t);
  a != null && n.Board === a && a.Sticker(r) === n && a._detachStickerAt(r);
}
function nn(i, e) {
  C("SNS project", i), B("sticker id", e);
  let t = i.StickerWithId(e);
  if (t != null) {
    if (t.Board != null) {
      console.error("cannot destroy a sticker that is still in use");
      return;
    }
    t._Project = void 0, qt(t);
  }
}
function kt(i, e, t, r) {
  C("SNS project", i), it("folder", e), rt("board", t), me("index", r);
  let n = /* @__PURE__ */ new Set();
  const a = e.BoardList;
  for (let d = a.length - 1; d >= 0; d--) {
    const s = a[d];
    s.Folder !== e || //"Board" doesn't belong to "Folder"
    s === t && r !== d || n.has(s) ? e._detachBoardAt(d) : n.add(s);
  }
}
function _t(i, e, t, r) {
  C("SNS project", i), rt("board", e), Me("sticker", t), me("index", r);
  let n = /* @__PURE__ */ new Set();
  const a = e.StickerList;
  for (let d = a.length - 1; d >= 0; d--) {
    const s = a[d];
    s.Board !== e || // "Sticker" belongs elsewhere
    s === t && r !== d || n.has(s) ? e._detachStickerAt(d) : n.add(s);
  }
}
const Y = { x: 20, y: 20, Width: 80, Height: 60 }, Ti = 10, Gi = void 0, Pi = 10, Ei = void 0, Ui = 10, zi = 10;
function Oi(i, e) {
  return xt(i) ? i : e;
}
function $(i, e) {
  return i == null ? void 0 : xt(i) ? i : e;
}
function He(i, e) {
  return ne(i) ? i : e;
}
function H(i, e) {
  return ne(i) ? i : e;
}
function on(i, e, t = -1 / 0, r = 1 / 0, n = !1, a = !1) {
  return wt(i, t, r, n, a) ? i : e;
}
function Z(i, e, t = -1 / 0, r = 1 / 0, n = !1, a = !1) {
  return wt(i, t, r, n, a) ? i : e;
}
function an(i, e) {
  return Ne(i) ? i : e;
}
function sn(i, e) {
  return Ne(i) ? i : e;
}
function ln(i, e, t = -1 / 0, r = 1 / 0) {
  return $t(i, t, r) ? i : e;
}
function un(i, e, t = -1 / 0, r = 1 / 0) {
  return $t(i, t, r) ? i : e;
}
function dn(i, e) {
  return Je(i) ? i : e;
}
function D(i, e) {
  return Je(i) ? i : e;
}
function cn(i, e) {
  return O(i) ? i : e;
}
function hn(i, e) {
  return O(i) ? i : e;
}
function gn(i, e) {
  return O(i) && i.trim() !== "" ? i : e;
}
function pn(i, e) {
  return O(i) && i.trim() !== "" ? i : e;
}
function fn(i, e, t) {
  return P(i, t) ? i : e;
}
function I(i, e, t) {
  return P(i, t) ? i : e;
}
function ae(i, e) {
  return Qe(i) ? i : e;
}
function Sn(i, e) {
  return Qe(i) ? i : e;
}
function V(i, e) {
  return (G(i) ? i : e).replace(
    /[\f\r\n\v\u0085\u2028\u2029].*$/,
    "..."
  );
}
function y(i, e) {
  const t = G(i) ? i : e;
  return t == null ? void 0 : t.replace(/[\f\r\n\v\u0085\u2028\u2029].*$/, "...");
}
function mn(i, e) {
  return Bt(i) ? i : e;
}
function kn(i, e) {
  return Bt(i) ? i : e;
}
function _n(i, e) {
  return ke(i) ? i : e;
}
function bn(i, e) {
  return ke(i) ? i : e;
}
function Zt(i, e, t) {
  return De(i, t) ? i : e;
}
function M(i, e, t) {
  return De(i, t) ? i : e;
}
function nt(i, e) {
  return et(i) ? i : e;
}
function Zi(i, e) {
  return et(i) ? i : e;
}
function Xi(i, e) {
  return yt(i) ? i : e;
}
function Yi(i, e) {
  return Lt(i) ? i : e;
}
function Q(i, e) {
  return It(i) ? i : e;
}
function Xt() {
  return Ce`<div class="SNS DefaultSticker" style=${Qt(this)}/>`;
}
function $e() {
  const i = this.Error;
  return i == null ? Xt.call(this) : Ce`<div class="SNS DefaultSticker">
      <div class="SNS ErrorIndicator" onClick=${() => this.Project.showError(this, i)}/>
    </div>`;
}
const qi = hi(gi, 21), Be = /* @__PURE__ */ new WeakMap();
function ji(i, e) {
  let t = Be.get(i);
  t == null && Be.set(i, t = /* @__PURE__ */ Object.create(null));
  const r = e.Id;
  r in t && N(
    "NonUniqueId: the id of the given folder (" + z(r) + ") has already been registered"
  ), t[r] = e;
}
function Yt(i) {
  const e = i.Project;
  let t = Be.get(e);
  t != null && delete t[i.Id];
}
function bt(i, e) {
  let t = Be.get(i);
  if (t != null)
    return t[e];
}
const ye = /* @__PURE__ */ new WeakMap();
function Ki(i, e) {
  let t = ye.get(i);
  t == null && ye.set(i, t = /* @__PURE__ */ Object.create(null));
  const r = e.Id;
  r in t && N(
    "NonUniqueId: the id of the given sticker (" + z(r) + ") has already been registered"
  ), t[r] = e;
}
function qt(i) {
  const e = i.Project;
  let t = ye.get(e);
  t != null && delete t[i.Id];
}
function Qi(i, e) {
  let t = ye.get(i);
  if (t != null)
    return t[e];
}
function Ie(i) {
  Re("serialization", i), delete i.Id, ke(i.BoardList) && i.BoardList.forEach(
    (e) => Ie(e)
  ), ke(i.StickerList) && i.StickerList.forEach(
    (e) => Ie(e)
  );
}
const je = /* @__PURE__ */ new WeakMap();
function jt(i, e) {
  let t = je.get(i);
  t == null && je.set(i, t = []), t.push(e);
}
function ot(i) {
  let e = je.get(i);
  e != null && e.forEach((t) => {
    xi(t);
  });
}
const Ve = /* @__PURE__ */ Object.create(null), re = /* @__PURE__ */ Object.create(null), Kt = /* @__PURE__ */ Object.create(null);
function f(i, e, t, r, n, a) {
  ze("behavior group label", i), ze("behavior label", e), K("behavior name", t), ni("sticker template", r), ue("behavior function", n);
  const d = i.toLowerCase().replace(/\s/g, ""), s = t.toLowerCase(), l = { ...r };
  l.activeScript == null ? l.activeScript = `useBehavior('${t}')
` : l.activeScript = l.activeScript.replace(/^\s*\n/, "").replace(/\n\s*$/, `
`), s in re && N(
    "BehaviorExists: behavior " + z(t) + " was already registered"
  );
  let o = Ve[d];
  o == null && (Ve[d] = o = {
    GroupLabel: i,
    BehaviorSet: /* @__PURE__ */ Object.create(null)
  }), o.BehaviorSet[t] = {
    Label: e,
    Executable: n,
    Template: l
  }, n != null && (Kt[s] = l, re[s] = n), a != null && ve.innerHTML.indexOf(a.trim()) < 0 && (ve.innerHTML += a);
}
function vn() {
  const i = [];
  function e(t) {
    const r = [], n = t.BehaviorSet;
    for (let a in n)
      r.push({
        Label: n[a].Label,
        Name: a,
        disabled: !(a.toLowerCase() in re)
      });
    return { GroupLabel: t.GroupLabel, BehaviorEntryList: r };
  }
  for (let t in Ve)
    i.push(e(Ve[t]));
  return i;
}
function Ji(i) {
  Me("visual", this), K("behavior name", i);
  const e = re[i.toLowerCase()];
  e == null && N(
    "NoSuchBehavior: no behavior called " + z(i) + " found"
  );
  const t = (d) => {
    ee("reactive function", d), jt(this, Nt(d));
  }, r = this.onRender.bind(this), n = this.onMount.bind(this), a = this.onUnmount.bind(this);
  e.call(this, this, this, Ce, t, r, n, a);
}
function xn(i) {
  K("behavior name", i);
  const e = i.toLowerCase();
  return re[e] == null && N(
    "NoSuchBehavior: no behavior called " + z(i) + " found"
  ), Kt[e];
}
f("basic Views", "plain Sticker", "plainSticker", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  activeScript: 'onRender(() => html`<div class="SNS Placeholder"></div>`)'
}, (i, e, t, r, n, a, d) => {
  n(() => t`<div class="SNS plainSticker"></div>`);
}, `
/**** plain Stickers ****/

  .SNS.plainSticker {
    border:dotted 1px gray;
  }
  `);
f("basic Views", "sticky Note", "stickyNote", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  minWidth: 20,
  minHeight: 10
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function(s) {
    const { builtinSelection: l, builtinDragging: o } = s, c = ae(e.Value, ""), u = (g) => {
      if (g.key === "Tab") {
        g.stopPropagation(), g.preventDefault();
        const p = g.target, { value: S, selectionStart: m, selectionEnd: k } = p;
        return p.value = S.slice(0, m) + "	" + S.slice(k), p.selectionStart = p.selectionEnd = m + 1, !1;
      }
    }, h = (g) => {
      e.Value = g.target.value;
    };
    return t`<div class="SNS NoteSticker" style=${Qt(i)}
        onPointerDown=${l}
      >
        <div class="Header builtinDraggable"
          onPointerDown=${o} onPointerMove=${o}
          onPointerUp=${o} onPointerCancel=${o}
        />
        <textarea class="Editor" value=${c} tabindex=-1
          onKeyDown=${u} onInput=${h}
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
f("basic Views", "Placeholder", "Placeholder", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function(s) {
    const { builtinDragging: l } = s, { Width: o, Height: c } = e.Geometry;
    return t`<div class="SNS Placeholder builtinDraggable" style="
        line-height:${c}px;
      "
        onPointerDown=${l} onPointerMove=${l}
        onPointerUp=${l} onPointerCancel=${l}
      >${o}x${c}</div>`;
  };
}, `
/**** simple Placeholders ****/

  .SNS.Placeholder {
    border:dotted 1px gray;
    text-align:center;
  }
  `);
f("basic Views", "Title", "Title", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Title"
}, (i, e, t, r, n, a, d) => {
  n(() => {
    const s = V(e.Value, "");
    return t`<div class="SNS Title">${s}</div>`;
  });
}, `
/**** Title Views ****/

  .SNS.Sticker > .SNS.Title {
    font-size:22px; font-weight:bold; line-height:32px;
  }
  `);
f("basic Views", "Subtitle", "Subtitle", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Subtitle"
}, (i, e, t, r, n, a, d) => {
  n(() => {
    const s = V(e.Value, "");
    return t`<div class="SNS Subtitle">${s}</div>`;
  });
}, `
/**** Subtitle Views ****/

  .SNS.Sticker > .SNS.Subtitle {
    font-size:18px; font-weight:bold; line-height:27px;
  }
  `);
f("basic Views", "Label", "Label", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Label"
}, (i, e, t, r, n, a, d) => {
  n(() => {
    const s = V(e.Value, "");
    return t`<div class="SNS Label">${s}</div>`;
  });
}, `
/**** Label Views ****/

  .SNS.Sticker > .SNS.Label {
    font-size:14px; font-weight:bold; line-height:21px;
  }
  `);
f("basic Views", "Text", "Text", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Text"
}, (i, e, t, r, n, a, d) => {
  n(() => {
    const s = ae(e.Value, "");
    return t`<div class="SNS Text">${s}</div>`;
  });
}, `
/**** Text Views ****/

  .SNS.Sticker > .SNS.Text {
    font-size:14px; font-weight:normal; line-height:21px;
  }
  `);
f("basic Views", "FinePrint", "FinePrint", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "FinePrint"
}, (i, e, t, r, n, a, d) => {
  n(() => {
    const s = ae(e.Value, "");
    return t`<div class="SNS FinePrint">${s}</div>`;
  });
}, `
/**** FinePrint Views ****/

  .SNS.Sticker > .SNS.FinePrint {
    font-size:12px; font-weight:normal; line-height:18px;
  }
  `);
f("basic Views", "HTML View", "HTMLView", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  Value: "<b><u>HTML View</u></b>",
  activeScript: `
  useBehavior('HTMLView')
//my.Value = 'HTML Markup'
`
}, (i, e, t, r, n, a, d) => {
  e.Renderer = () => t`<div class="SNS HTMLView"
      dangerouslySetInnerHTML=${{ __html: ae(e.Value, "") }}
    />`;
});
f("basic Views", "Image View", "ImageView", {
  Geometry: { x: 20, y: 20, Width: 90, Height: 90 },
  Value: "https://www.rozek.de/Bangle.js/Mandelbrot_240x240.png",
  activeScript: `
  useBehavior('ImageView')
//my.Value = 'Image URL'
`
}, (i, e, t, r, n, a, d) => {
  e.Renderer = () => t`<img class="SNS ImageView" src=${Q(e.Value, "")}/>`;
}, `
/**** Image View ****/

  .SNS.Sticker > .SNS.ImageView {
    object-fit:contain; object-position:center;
  }
  `);
f("basic Views", "SVG View", "SVGView", {
  Geometry: { x: 20, y: 20, Width: 90, Height: 90 },
  activeScript: `
  useBehavior('SVGView')
//my.Value = 'SVG Document'
`
}, (i, e, t, r, n, a, d) => {
  e.Renderer = () => {
    const s = "data:image/svg+xml;base64," + btoa(ae(e.Value, ""));
    return t`<div class="SNS SVGView" src=${s}/>`;
  };
}, `
/**** SVG View ****/

  .SNS.Sticker > .SNS.SVGView {
    object-fit:contain; object-position:center;
  }
  `);
f("basic Views", "2D Canvas View", "Canvas2DView");
f("basic Views", "Web View", "WebView", {
  Geometry: { x: 20, y: 20, Width: 640, Height: 480 },
  minWidth: 120,
  minHeight: 80,
  Value: "https://www.rozek.de",
  activeScript: `
  useBehavior('WebView')
//my.Value = 'Document URL'
`
}, (i, e, t, r, n, a, d) => {
  e.Renderer = () => t`<iframe class="SNS WebView"
      src=${Q(e.Value, "")}
    />`;
});
f("basic Views", "Badge", "Badge", {
  Geometry: { x: 20, y: 20, Width: 30, Height: 30 },
  Value: 1,
  ForegroundColor: "red",
  BackgroundColor: "white"
}, (i, e, t, r, n, a, d) => {
  e.Renderer = () => {
    const s = ne(e.Value) ? "" + e.Value : V(e.Value, ""), l = Math.round(Math.min(e.Width, e.Height / 2));
    return t`<div class="SNS Badge" style="
        border-color:${e.ForegroundColor}; border-radius:${l}px;
        line-height:${e.Height - 4}px;
      ">${V(s, "")}</>`;
  };
}, `
/**** Badge ****/

  .SNS.Sticker > .SNS.Badge {
    font-size:18px; font-weight:bold; text-align:center;
    border:solid 2px black;
  }
  `);
f("basic Views", "Icon", "Icon", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('Icon')
//my.Value = 'icon image url'
//onClick(() => ...)
`
}, (i, e, t, r, n, a, d) => {
  function s(l) {
    e.Enabling != !1 && (e.Value = l.target.value, typeof e._onClick == "function" && e._onClick(l));
  }
  e.Renderer = () => {
    const l = Q(e.Value, "/img/pencil.png"), o = nt(e.Color, "black");
    return t`<div class="SNS Icon" style="
        -webkit-mask-image:url(${l}); mask-image:url(${l});
        background-color:${o};
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
f("basic Views", "horizontal Separator", "horizontalSeparator", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 10 },
  minWidth: 10
}, (i, e, t, r, n, a, d) => {
  n(() => t`<div class="SNS horizontalSeparator"></div>`);
}, `
/**** horizontal Separator ****/

  .SNS.horizontalSeparator {
    border:none; border-top:solid 1px black;
  }
  `);
f("basic Views", "vertical Separator", "verticalSeparator", {
  Geometry: { x: 20, y: 20, Width: 10, Height: 40 },
  minHeight: 10
}, (i, e, t, r, n, a, d) => {
  n(() => t`<div class="SNS verticalSeparator"></div>`);
}, `
/**** vertical Separator ****/

  .SNS.verticalSeparator {
    border:none; border-left:solid 1px black;
  }
  `);
f("basic Views", "Tab", "Tab");
f("basic Views", "Icon Tab", "IconTab");
f("native Controls", "Button", "Button", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Button",
  activeScript: `
  useBehavior('Button')
//my.Value = 'Label'
//onClick(() => ...)
`
}, (i, e, t, r, n, a, d) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    typeof e._onClick == "function" && e._onClick(l);
  }
  e.Renderer = () => {
    const l = V(e.Label || e.Value, "");
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
f("native Controls", "Checkbox", "Checkbox", {
  Geometry: { x: 20, y: 20, Width: 20, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Checkbox')
//my.Value = null/true/false
//onClick(() => ...)
`
}, (i, e, t, r, n, a, d) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    e.Value = l.target.checked, typeof e._onClick == "function" && e._onClick(l);
  }
  e.Renderer = () => {
    const l = $(e.Value), o = l == !0, c = l == null;
    return t`<input type="checkbox" class="SNS Checkbox"
        checked=${o} indeterminate=${c}
        disabled=${e.Enabling == !1} onClick=${s}
      />`;
  };
});
f("native Controls", "Radiobutton", "Radiobutton", {
  Geometry: { x: 20, y: 20, Width: 20, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Radiobutton')
//my.Value = true/false
//onClick(() => ...)
`
}, (i, e, t, r, n, a, d) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    e.Value = l.target.checked, typeof e._onClick == "function" && e._onClick(l);
  }
  e.Renderer = () => {
    const l = Oi(e.Value, !1);
    return t`<input type="radio" class="SNS Radiobutton"
        checked=${l == !0}
        disabled=${e.Enabling == !1} onClick=${s}
      />`;
  };
});
f("native Controls", "Gauge", "Gauge", {
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
}, (i, e, t, r, n, a, d) => {
  e.Renderer = () => {
    const s = He(
      O(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    ), l = H(e.Minimum), o = H(e.lowerBound), c = H(e.Optimum), u = H(e.upperBound), h = H(e.Maximum);
    return t`<meter class="SNS Gauge" value=${s}
        min=${l} low=${o} opt=${c}
        high=${u} max=${h}
      />`;
  };
});
f("native Controls", "Progressbar", "Progressbar", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 10 },
  Value: 0,
  activeScript: `
  useBehavior('Progressbar')
//my.Value   = 0
//my.Maximum = 1
`
}, (i, e, t, r, n, a, d) => {
  e.Renderer = () => {
    const s = He(
      O(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    ), l = H(e.Maximum);
    return t`<progress class="SNS Progressbar" value=${s} max=${l}/>`;
  };
});
const er = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/;
f("native Controls", "Slider", "Slider", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = 0;
  function s(c) {
    return P(c, er) || ne(c);
  }
  function l(c) {
    if (e.Enabling == !1)
      return w(c);
    e.Value = parseFloat(c.target.value), typeof e._onInput == "function" && e._onInput(c);
  }
  function o() {
    i.rerender();
  }
  e.Renderer = () => {
    let c = He(
      O(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    );
    const u = H(e.Minimum), h = Z(e.Stepping, void 0, 0), g = H(e.Maximum), p = M(
      e.Hashmarks,
      void 0,
      s
    );
    document.activeElement === e.View ? c = e.ValueToShow : e.ValueToShow = c;
    let S = "", m;
    return p != null && p.length > 0 && (m = e.Id + "-Hashmarks", S = t`\n<datalist id=${m}>
          ${p.map((k) => {
      k = "" + k;
      const x = k.replace(/:.*$/, "").trim(), A = k.replace(/^[^:]+:/, "").trim();
      return t`<option value=${x}>${A}</option>`;
    })}
        </datalist>`), t`<input type="range" class="SNS Slider"
        value=${c} min=${u} max=${g} step=${h}
        disabled=${e.Enabling == !1} onInput=${l} onBlur=${o}
        list=${m}
      />${S}`;
  };
});
f("native Controls", "Textline Input", "TextlineInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = V(e.Value, "");
    const c = y(e.Placeholder), u = $(e.readonly), h = D(e.minLength), g = D(e.maxLength), p = y(e.Pattern), S = $(e.SpellChecking), m = M(
      e.Suggestions,
      void 0,
      G
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let k = "", x;
    return m != null && m.length > 0 && (x = e.Id + "-Suggestions", k = t`<datalist id=${x}>
          ${m.map((A) => t`<option value=${A}></option>`)}
        </datalist>`), t`<input type="text" class="SNS TextlineInput"
        value=${o} minlength=${h} maxlength=${g}
        readonly=${u} placeholder=${c}
        pattern=${p} spellcheck=${S}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${x}
      />${k}`;
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
f("native Controls", "Password Input", "PasswordInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = V(e.Value, "");
    const c = y(e.Placeholder), u = $(e.readonly), h = D(e.minLength), g = D(e.maxLength), p = y(e.Pattern);
    return document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o, t`<input type="password" class="SNS PasswordInput"
        value=${o} minlength=${h} maxlength=${g}
        readonly=${u} placeholder=${c}
        pattern=${p}
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
f("native Controls", "Number Input", "NumberInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = 0;
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = parseFloat(o.target.value), typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = He(
      O(e.Value) ? parseFloat(e.Value) : e.Value,
      0
    );
    const c = y(e.Placeholder), u = $(e.readonly), h = H(e.Minimum), g = Z(e.Stepping, void 0, 0), p = H(e.Maximum), S = M(
      e.Suggestions,
      void 0,
      ne
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let m = "", k;
    return S != null && S.length > 0 && (k = e.Id + "-Suggestions", m = t`<datalist id=${k}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="number" class="SNS NumberInput"
        value=${o} min=${h} max=${p} step=${g}
        readonly=${u} placeholder=${c}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${k}
      />${m}`;
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
f("native Controls", "Phone Number Input", "PhoneNumberInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = Yi(e.Value, "");
    const c = y(e.Placeholder), u = $(e.readonly), h = D(e.minLength), g = D(e.maxLength), p = y(e.Pattern), S = M(
      e.Suggestions,
      void 0,
      Lt
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let m = "", k;
    return S != null && S.length > 0 && (k = e.Id + "-Suggestions", m = t`<datalist id=${k}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="tel" class="SNS PhoneNumberInput"
        value=${o} minlength=${h} maxlength=${g}
        readonly=${u} placeholder=${c}
        pattern=${p}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${k}
      />${m}`;
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
f("native Controls", "EMail Address Input", "EMailAddressInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = Xi(e.Value, "");
    const c = y(e.Placeholder), u = $(e.readonly), h = D(e.minLength), g = D(e.maxLength), p = y(e.Pattern), S = M(
      e.Suggestions,
      void 0,
      yt
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let m = "", k;
    return S != null && S.length > 0 && (k = e.Id + "-Suggestions", m = t`<datalist id=${k}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="email" class="SNS EMailAddressInput"
        value=${o} minlength=${h} maxlength=${g}
        readonly=${u} placeholder=${c}
        pattern=${p}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${k}
      />${m}`;
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
f("native Controls", "URL Input", "URLInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = Q(e.Value, "");
    const c = y(e.Placeholder), u = $(e.readonly), h = D(e.minLength), g = D(e.maxLength), p = y(e.Pattern), S = M(
      e.Suggestions,
      void 0,
      It
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let m = "", k;
    return S != null && S.length > 0 && (k = e.Id + "-Suggestions", m = t`<datalist id=${k}>
          ${S.map((x) => t`<option value=${x}></option>`)}
        </datalist>`), t`<input type="url" class="SNS URLInput"
        value=${o} minlength=${h} maxlength=${g}
        readonly=${u} placeholder=${c}
        pattern=${p}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${k}
      />${m}`;
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
const tr = "\\d{2}:\\d{2}", he = /\d{2}:\d{2}/;
function ir(i) {
  return P(i, he);
}
f("native Controls", "Time Input", "TimeInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = I(
      e.Value,
      void 0,
      he
    );
    const c = $(e.readonly), u = I(e.Minimum, void 0, he), h = Z(e.Stepping, void 0, 0), g = I(e.Maximum, void 0, he), p = M(
      e.Suggestions,
      void 0,
      ir
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let S = "", m;
    return p != null && p.length > 0 && (m = e.Id + "-Suggestions", S = t`<datalist id=${m}>
          ${p.map((k) => t`<option value=${k}></option>`)}
        </datalist>`), t`<input type="time" class="SNS TimeInput"
        value=${o} min=${u} max=${g} step=${h}
        readonly=${c} pattern=${tr}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
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
const rr = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}", ge = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
function nr(i) {
  return P(i, ge);
}
f("native Controls", "Date and Time Input", "DateTimeInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = I(
      e.Value,
      void 0,
      ge
    );
    const c = $(e.readonly), u = I(e.Minimum, void 0, ge), h = Z(e.Stepping, void 0, 0), g = I(e.Maximum, void 0, ge), p = M(
      e.Suggestions,
      void 0,
      nr
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let S = "", m;
    return p != null && p.length > 0 && (m = e.Id + "-Suggestions", S = t`<datalist id=${m}>
          ${p.map((k) => t`<option value=${k}></option>`)}
        </datalist>`), t`<input type="datetime-local" class="SNS DateTimeInput"
        value=${o} min=${u} max=${g} step=${h}
        readonly=${c} pattern=${rr}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
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
const or = "\\d{4}-\\d{2}-\\d{2}", pe = /\d{4}-\d{2}-\d{2}/;
function ar(i) {
  return P(i, pe);
}
f("native Controls", "Date Input", "DateInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = I(
      e.Value,
      void 0,
      pe
    );
    const c = $(e.readonly), u = I(e.Minimum, void 0, pe), h = Z(e.Stepping, void 0, 0), g = I(e.Maximum, void 0, pe), p = M(
      e.Suggestions,
      void 0,
      ar
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let S = "", m;
    return p != null && p.length > 0 && (m = e.Id + "-Suggestions", S = t`<datalist id=${m}>
          ${p.map((k) => t`<option value=${k}></option>`)}
        </datalist>`), t`<input type="date" class="SNS DateInput"
        value=${o} min=${u} max=${g} step=${h}
        readonly=${c} pattern=${or}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
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
const sr = "\\d{4}-W\\d{2}", fe = /\d{4}-W\d{2}/;
function lr(i) {
  return P(i, fe);
}
f("native Controls", "Week Input", "WeekInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = I(
      e.Value,
      void 0,
      fe
    );
    const c = $(e.readonly), u = I(e.Minimum, void 0, fe), h = Z(e.Stepping, void 0, 0), g = I(e.Maximum, void 0, fe), p = M(
      e.Suggestions,
      void 0,
      lr
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let S = "", m;
    return p != null && p.length > 0 && (m = e.Id + "-Suggestions", S = t`<datalist id=${m}>
          ${p.map((k) => t`<option value=${k}></option>`)}
        </datalist>`), t`<input type="week" class="SNS WeekInput"
        value=${o} min=${u} max=${g} step=${h}
        readonly=${c} pattern=${sr}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
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
const ur = "\\d{4}-\\d{2}", Se = /\d{4}-\d{2}/;
function dr(i) {
  return P(i, Se);
}
f("native Controls", "Month Input", "MonthInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = I(
      e.Value,
      void 0,
      Se
    );
    const c = $(e.readonly), u = I(e.Minimum, void 0, Se), h = Z(e.Stepping, void 0, 0), g = I(e.Maximum, void 0, Se), p = M(
      e.Suggestions,
      void 0,
      dr
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let S = "", m;
    return p != null && p.length > 0 && (m = e.Id + "-Suggestions", S = t`<datalist id=${m}>
          ${p.map((k) => t`<option value=${k}></option>`)}
        </datalist>`), t`<input type="month" class="SNS MonthInput"
        value=${o} min=${u} max=${g} step=${h}
        readonly=${c} pattern=${ur}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${m}
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
f("native Controls", "File Input", "FileInput", {
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
}, (i, e, t, r, n, a, d) => {
  function s(u) {
    if (e.Enabling == !1)
      return w(u);
    e.Value = u.target.value, typeof e._onInput == "function" && e._onInput(u, u.files);
  }
  function l(u) {
    return w(u);
  }
  function o(u) {
    return w(u);
  }
  function c(u) {
    at(u), e.Enabling != !1 && (e.Value = u.target.value, typeof e._onDrop == "function" && e._onDrop(u, u.dataTransfer.files));
  }
  e.Renderer = () => {
    let u = V(e.Value, "").trim();
    u = u.replace("C:\\fakepath\\", "");
    const h = V(e.Placeholder, "").trim(), g = y(e.acceptableTypes), p = $(e.multiple);
    return t`<label class="SNS FileInput"
        onDragEnter=${l} onDragOver=${o} onDrop=${c}
      >
        <input type="file" style="display:none"
          multiple=${p} accept=${g}
          onInput=${s}
        />
        ${u === "" ? h === "" ? "" : t`<span style="line-height:${e.Height}px">${h}</span>` : t`<span style="line-height:${e.Height}px">${u}</span>`}
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
f("native Controls", "Pseudo File Input", "PseudoFileInput", {
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
}, (i, e, t, r, n, a, d) => {
  function s(l) {
    if (e.Enabling == !1)
      return w(l);
    e.Value = l.target.value, typeof e._onInput == "function" && e._onInput(l, l.files);
  }
  e.Renderer = () => {
    const l = Q(e.Icon, "/img/arrow-up-from-bracket.png"), o = nt(e.Color, "black"), c = y(e.acceptableTypes), u = $(e.multiple);
    return t`<label class="SNS PseudoFileInput">
        <div style="
          -webkit-mask-image:url(${l}); mask-image:url(${l});
          background-color:${o};
        "></div>
        <input type="file" style="display:none"
          multiple=${u} accept=${c}
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
f("native Controls", "File Drop Area", "FileDropArea", {
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
}, (i, e, t, r, n, a, d) => {
  function s(u) {
    if (e.Enabling == !1)
      return w(u);
    e.Value = u.target.value, typeof e._onInput == "function" && e._onInput(u, u.files);
  }
  function l(u) {
    return w(u);
  }
  function o(u) {
    return w(u);
  }
  function c(u) {
    at(u), e.Enabling != !1 && (e.Value = u.target.value, typeof e._onDrop == "function" && e._onDrop(u, u.dataTransfer.files));
  }
  e.Renderer = () => {
    const u = V(e.Placeholder, "").trim(), h = y(e.acceptableTypes), g = $(e.multiple);
    return t`<label class="SNS FileDropArea"
        onDragEnter=${l} onDragOver=${o} onDrop=${c}>
        <input type="file"
          multiple=${g} accept=${h}
          onInput=${s}
        />
        <span>${u}</span>
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
f("native Controls", "Search Input", "SearchInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = V(e.Value, "");
    const c = y(e.Placeholder), u = $(e.readonly), h = D(e.minLength), g = D(e.maxLength), p = y(e.Pattern), S = $(e.SpellChecking), m = M(
      e.Suggestions,
      void 0,
      G
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let k = "", x;
    return m != null && m.length > 0 && (x = e.Id + "-Suggestions", k = t`<datalist id=${x}>
          ${m.map((A) => t`<option value=${A}></option>`)}
        </datalist>`), t`<input type="search" class="SNS SearchInput"
        value=${o} minlength=${h} maxlength=${g}
        readonly=${u} placeholder=${c}
        pattern=${p} spellcheck=${S}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${x}
      />${k}`;
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
f("native Controls", "Color Input", "ColorInput", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('ColorInput')
//my.Value       = ''
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = Zi(e.Value);
    const c = M(
      e.Suggestions,
      void 0,
      et
    );
    document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o;
    let u = "", h;
    return c != null && c.length > 0 && (h = e.Id + "-Suggestions", u = t`<datalist id=${h}>
          ${c.map((g) => t`<option value=${g}></option>`)}
        </datalist>`), t`<input type="color" class="SNS ColorInput"
        value=${o}
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        list=${h}
      />${u}`;
  };
}, `
/**** ColorInput ****/

  .SNS.Sticker > .SNS.ColorInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `);
f("native Controls", "DropDown", "DropDown", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('DropDown')
//my.Value   = '...'
//my.Options = ['...',...]
//onInput(() => ...)
`
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = V(e.Value, "");
    const c = Zt(
      e.Options,
      [],
      G
    );
    return document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o, t`<select class="SNS DropDown"
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
      >${c.map(
      (u) => {
        const h = u.replace(/:.*$/, "").trim(), g = u.replace(/^[^:]+:/, "").trim();
        return t`<option value=${h} selected=${h === o}>
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
f("native Controls", "Pseudo DropDown", "PseudoDropDown", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('PseudoDropDown')
//my.Value   = '...'
//my.Icon    = 'icon image url'
//my.Options = ['...',...]
//onInput(() => ...)
`
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = V(e.Value, "");
    const c = Q(e.Icon, "/img/menu.png"), u = nt(e.Color, "black"), h = Zt(
      e.Options,
      [],
      G
    );
    return document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o, t`<div class="SNS PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${c}); mask-image:url(${c});
          background-color:${u};
        "></div>
        <select disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}>
          ${h.map((g) => {
      const p = g.replace(/:.*\$/, "").trim(), S = g.replace(/^[^:]+:/, "").trim();
      return t`<option value=${p} selected=${p === o}>
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
f("native Controls", "Text Input", "TextInput", {
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
}, (i, e, t, r, n, a, d) => {
  e.ValueToShow = "";
  function s(o) {
    if (e.Enabling == !1)
      return w(o);
    e.Value = o.target.value, typeof e._onInput == "function" && e._onInput(o);
  }
  function l() {
    i.rerender();
  }
  e.Renderer = () => {
    let o = V(e.Value, "");
    const c = y(e.Placeholder), u = $(e.readonly), h = D(e.minLength), g = D(e.maxLength), p = $(e.LineWrapping), S = $(e.SpellChecking);
    return document.activeElement === e.View ? o = e.ValueToShow : e.ValueToShow = o, t`<textarea class="SNS TextInput"
        value=${o} minlength=${h} maxlength=${g}
        readonly=${u} placeholder=${c}
        spellcheck=${S} style="resize:none; ${p == !0 ? "white-space:pre; overflow-wrap:break-word; hyphens:auto" : void 0}"
        disabled=${e.Enabling == !1} onInput=${s} onBlur=${l}
        value=${o}
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
f("basic Shapes", "Line", "Line");
f("basic Shapes", "Polyline", "Polyline");
f("basic Shapes", "Arc", "Arc");
f("basic Shapes", "quadratic Bezier", "quadraticBezier");
f("basic Shapes", "cubic Bezier", "cubicBezier");
f("basic Shapes", "Box", "Box");
f("basic Shapes", "rounded Box", "roundedBox");
f("basic Shapes", "Oval", "Oval");
f("basic Shapes", "Chord", "Chord");
f("basic Shapes", "Pie", "Pie");
f("basic Shapes", "Polygon", "Polygon");
f("basic Shapes", "regular Polygon", "regularPolygon");
f("straight Arrows", "nw", "straightArrow_nw", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M ${s},${l}, L 0,0"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("straight Arrows", "n", "straightArrow_n", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M ${s / 2},${l}, L ${s / 2},0"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("straight Arrows", "ne", "straightArrow_ne", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M 0,${l}, L ${s},0"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("straight Arrows", "e", "straightArrow_e", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M 0,${l / 2}, L ${s},${l / 2}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("straight Arrows", "se", "straightArrow_se", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M 0,0, L ${s},${l}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("straight Arrows", "s", "straightArrow_s", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M ${s / 2},0, L ${s / 2},${l}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("straight Arrows", "sw", "straightArrow_sw", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M ${s},0, L 0,${l}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("straight Arrows", "w", "straightArrow_w", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}"
            d="M ${s},${l / 2}, L 0,${l / 2}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "cw n", "curvedArrow_cw_n", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M ${s},${l - 6}, A ${s - 6} ${l - 18} 0 0 1 6 12"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "cw e", "curvedArrow_cw_e", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M 6,${l}, A ${s - 18} ${l - 6} 0 0 1 ${s - 12} 6"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "cw s", "curvedArrow_cw_s", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M 0,6, A ${s - 6} ${l - 18} 0 0 1 ${s - 6} ${l - 12}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "cw w", "curvedArrow_cw_w", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M ${s - 6},0, A ${s - 18} ${l - 6} 0 0 1 12 ${l - 6}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "ccw n", "curvedArrow_ccw_n", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M 0,${l - 6}, A ${s - 6} ${l - 18} 0 0 0 ${s - 6} 12"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "ccw e", "curvedArrow_ccw_e", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M 6,0, A ${s - 18} ${l - 6} 0 0 0 ${s - 12} ${l - 6}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "ccw s", "curvedArrow_ccw_s", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M ${s},6, A ${s - 6} ${l - 18} 0 0 0 6 ${l - 12}"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("curved Arrows", "ccw w", "curvedArrow_ccw_w", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (i, e, t, r, n, a, d) => {
  e.Renderer = function() {
    const { Width: s, Height: l } = e.Geometry, o = e.ForegroundColor || "black", c = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${s}" height="${l}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${o}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${o}" fill="none"
            d="M ${s - 6},${l}, A ${s - 18} ${l - 8} 0 0 0 12 6"
          />
        </svg>
      `, u = "data:image/svg+xml;base64," + btoa(c);
    return t`<img class="SNS straightArrow" src=${u}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
f("complex Controls", "flat List View", "FlatListView");
f("complex Controls", "nested List View", "NestedListView");
f("complex Controls", "QR-Code View", "QRCodeView");
function Qt(i) {
  Ct("visual", i);
  let e = [];
  const {
    BackgroundColor: t,
    BackgroundTexture: r,
    ForegroundColor: n,
    FontFamily: a,
    FontSize: d,
    FontWeight: s,
    FontStyle: l,
    LineHeight: o
  } = i;
  return t != null && e.push(`background-color:${t}`), r != null && e.push(
    `background-image:${r}; background-repeat:repeat`
  ), n != null && e.push(`color:${n}`), a != null && e.push(`font-family:${a}`), d != null && e.push(`font-size:${d}px`), s != null && e.push(`font-weight:${s}`), l != null && e.push(`font-style:${l}`), o != null && e.push(`line-height:${o}px`), e.join(";");
}
function at(i) {
  i.stopPropagation(), i.preventDefault();
}
const w = at;
class st {
  constructor(e, t) {
    // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"
    /**** Id - for internal use only ****/
    _(this, "_Id");
    /**** Name ****/
    _(this, "_Name");
    /**** Project ****/
    _(this, "_Project");
    /**** Folder ****/
    _(this, "_Folder");
    /**** BackgroundColor ****/
    _(this, "_BackgroundColor");
    /**** BackgroundTexture ****/
    _(this, "_BackgroundTexture");
    /**** FontFamily ****/
    _(this, "_FontFamily");
    /**** FontSize ****/
    _(this, "_FontSize");
    /**** FontWeight ****/
    _(this, "_FontWeight");
    /**** FontStyle ****/
    _(this, "_FontStyle");
    /**** LineHeight ****/
    _(this, "_LineHeight");
    /**** ForegroundColor ****/
    _(this, "_ForegroundColor");
    /**** Value ****/
    _(this, "_Value", null);
    /**** observed ****/
    // @ts-ignore TS2564 allow "_observed" to be assigned upon first use
    _(this, "_observed");
    /**** unobserved ****/
    // @ts-ignore TS2564 allow "_unobserved" to be assigned upon first use
    _(this, "_unobserved");
    /**** activeScript ****/
    _(this, "_activeScript");
    /**** pendingScript ****/
    _(this, "_pendingScript");
    /**** ScriptError - for internal use only ****/
    _(this, "_ScriptError");
    /**** Renderer ****/
    _(this, "_Renderer");
    /**** View ****/
    _(this, "_View");
    /**** onMount ****/
    _(this, "_onMount");
    /**** onUnmount ****/
    _(this, "_onUnmount");
    /**** Error - for internal use only ****/
    _(this, "_Error");
    this._Project = e, this._Id = t || qi();
  }
  get Id() {
    return this._Id;
  }
  set Id(e) {
    b("Id");
  }
  get Name() {
    return this._Name;
  }
  set Name(e) {
    Ht("visual name", e), e != null && (e = e.trim(), e === "" && (e = void 0)), this._Name !== e && (this._Name = e, this._reportChange("configure", this, "Name", e), this.rerender());
  }
  get Project() {
    return this._Project;
  }
  set Project(e) {
    b("Project");
  }
  get Folder() {
    return this._Folder;
  }
  set Folder(e) {
    b("Folder");
  }
  /**** isAttached ****/
  get isAttached() {
    return this._Folder == null ? oe(this) : this._Folder.isAttached;
  }
  set isAttached(e) {
    b("isAttached");
  }
  get BackgroundColor() {
    return this._BackgroundColor == null ? this._Folder == null ? void 0 : this._Folder.BackgroundColor : this._BackgroundColor;
  }
  set BackgroundColor(e) {
    ht("visual background color", e), this._BackgroundColor !== e && (this._BackgroundColor = e, this._reportChange("configure", this, "BackgroundColor", e), this.rerender());
  }
  get BackgroundTexture() {
    return this._BackgroundTexture == null ? this._Folder == null ? void 0 : this._Folder.BackgroundTexture : this._BackgroundTexture;
  }
  set BackgroundTexture(e) {
    Vt("visual background texture", e), this._BackgroundTexture !== e && (this._BackgroundTexture = e, this._reportChange("configure", this, "BackgroundTexture", e), this.rerender());
  }
  get FontFamily() {
    return this._FontFamily == null ? this._Folder == null ? void 0 : this._Folder.FontFamily : this._FontFamily;
  }
  set FontFamily(e) {
    oi("visual font family", e), this._FontFamily !== e && (this._FontFamily = e, this._reportChange("configure", this, "FontFamily", e), this.rerender());
  }
  get FontSize() {
    return this._FontSize == null ? this._Folder == null ? void 0 : this._Folder.FontSize : this._FontSize;
  }
  set FontSize(e) {
    me("visual font size", e), this._FontSize !== e && (this._FontSize = e, this._reportChange("configure", this, "FontSize", e), this.rerender());
  }
  get FontWeight() {
    return this._FontWeight == null ? this._Folder == null ? void 0 : this._Folder.FontWeight : this._FontWeight;
  }
  set FontWeight(e) {
    ai("visual font weight", e, 1, 1e3), this._FontWeight !== e && (this._FontWeight = e, this._reportChange("configure", this, "FontWeight", e), this.rerender());
  }
  get FontStyle() {
    return this._FontStyle == null ? this._Folder == null ? void 0 : this._Folder.FontStyle : this._FontStyle;
  }
  set FontStyle(e) {
    si("visual font style", e, wi), this._FontStyle !== e && (this._FontStyle = e, this._reportChange("configure", this, "FontStyle", e), this.rerender());
  }
  get LineHeight() {
    return this._LineHeight == null ? this._Folder == null ? void 0 : this._Folder.LineHeight : this._LineHeight;
  }
  set LineHeight(e) {
    me("visual line height", e), this._LineHeight !== e && (this._LineHeight = e, this._reportChange("configure", this, "LineHeight", e), this.rerender());
  }
  get ForegroundColor() {
    return this._ForegroundColor == null ? this._Folder == null ? void 0 : this._Folder.ForegroundColor : this._ForegroundColor;
  }
  set ForegroundColor(e) {
    ht("visual foreground color", e), this._ForegroundColor !== e && (this._ForegroundColor = e, this._reportChange("configure", this, "ForegroundColor", e), this.rerender());
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
    Te(this._Value, e) && (this._Value = e, this._reportChange("configure", this, "Value", e), this.rerender());
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
    return this._observed == null && (this._observed = vi({})), this._observed;
  }
  set observed(e) {
    b("observed");
  }
  get unobserved() {
    return this._unobserved == null && (this._unobserved = {}), this._unobserved;
  }
  set unobserved(e) {
    b("unobserved");
  }
  /**** Script ****/
  get Script() {
    return this._pendingScript == null ? this._activeScript : this._pendingScript;
  }
  set Script(e) {
    b("Script");
  }
  get activeScript() {
    return this._activeScript;
  }
  set activeScript(e) {
    gt("visual script", e), e === "" && (e = void 0), this._activeScript !== e && (this._activeScript = e, this._reportChange("configure", this, "activeScript", e), this.rerender());
  }
  get pendingScript() {
    return this._pendingScript;
  }
  set pendingScript(e) {
    gt("visual script", e), this._pendingScript !== e && (this._pendingScript = e, this._reportChange("configure", this, "pendingScript", e), this.rerender());
  }
  /**** activateScript ****/
  activateScript() {
    let e = (this._activeScript || "").trim();
    if (this.Error = void 0, this._Renderer = void 0, ot(this), e != null) {
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
      const r = (s) => {
        ee("reactive function", s), jt(this, Nt(s));
      }, n = this.onRender.bind(this), a = this.onMount.bind(this), d = this.onUnmount.bind(this);
      try {
        t.call(
          this,
          this,
          this,
          Ce,
          r,
          n,
          a,
          d,
          Ji.bind(this)
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
    qe("script error setting", e), Te(this._ScriptError, e) && (this._ScriptError = e, this._reportChange("configure", this, "ScriptError", e), this.rerender());
  }
  get Renderer() {
    return this._Renderer;
  }
  set Renderer(e) {
    ue("visual renderer", e), this._Renderer !== e && (this._Renderer = e, this.rerender());
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
    b("View");
  }
  /**** isMounted ****/
  get isMounted() {
    return this._View != null;
  }
  set isMounted(e) {
    b("isMounted");
  }
  onMount(e) {
    ue('"onMount" callback', e), e == null ? this._onMount = void 0 : this._onMount = () => {
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
    ue('"onUnmount" callback', e), e == null ? this._onUnmount = void 0 : this._onUnmount = () => {
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
    qe("error setting", e), Te(this._Error, e) && (this._Error = e, this._reportChange("configure", this, "Error", e), this.rerender());
  }
  /**** hasError ****/
  get hasError() {
    return this._Error != null;
  }
  set hasError(e) {
    b("hasError");
  }
  /**** _reportChange ****/
  /* protected */
  _reportChange(e, ...t) {
    this._Project._reportChange(e, ...t);
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(e) {
    e.Id = this.Id;
    const t = (r) => {
      this["_" + r] != null && (e[r] = this[r]);
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
    ].forEach((r) => t(r));
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(e) {
    const t = (r) => {
      if (e[r] != null)
        try {
          this[r] = e[r];
        } catch {
          console.warn(
            "DeserializationError:invalid value for property " + z(r)
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
    ].forEach((r) => t(r));
  }
  // deserializing "activeScript" also automatically activates that script
}
class lt extends st {
  constructor(t, r) {
    super(t, r);
    /**** SnapToGrid - inherited from outer folders ****/
    _(this, "_SnapToGrid");
    /**** GridWidth ****/
    _(this, "_GridWidth");
    /**** GridHeight ****/
    _(this, "_GridHeight");
    /**** BoardList ****/
    _(this, "_BoardList", []);
  }
  // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"
  /**** Path ****/
  get Path() {
    const t = this._Folder;
    if (t == null)
      return "|";
    {
      const r = this.Name || "#" + this.Index, n = t.Path;
      return (n === "|" ? "" : n) + "|" + r;
    }
  }
  set Path(t) {
    b("Path");
  }
  /**** BoardAtPath ****/
  BoardAtPath(t) {
    if (ze("board path", t), t = t.trim(), t === "")
      return this._Folder == null ? void 0 : this;
    if (t.startsWith("|"))
      return this._Project.BoardAtPath(t.replace(/^(\s*\|)*/, ""));
    t = t.replace(/\|+/g, "|");
    const r = t.split("|").map(
      (a) => a.trim()
      // eliminate leading/trailing ws
    ).map(
      (a) => /^#\d+$/.test(a) ? parseInt(a.slice(1), 10) : a
    );
    let n;
    for (let a = 0, d = r.length; a < d; a++) {
      const s = r[a];
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
    b("IndexPath");
  }
  get SnapToGrid() {
    return this._SnapToGrid ? this._SnapToGrid == !0 : this._Folder == null ? !1 : this._Folder.SnapToGrid;
  }
  set SnapToGrid(t) {
    li("snap-to-grid setting", t), this._SnapToGrid !== t && (this._SnapToGrid = t, this._reportChange("configure", this, "SnapToGrid", t), this.rerender());
  }
  get GridWidth() {
    return this._GridWidth == null ? this._Folder == null ? Ui : this._Folder.GridWidth : this._GridWidth;
  }
  set GridWidth(t) {
    pt("snap-to-grid width", t), this._GridWidth !== t && (this._GridWidth = t, this._reportChange("configure", this, "GridWidth", t), this.rerender());
  }
  get GridHeight() {
    return this._GridHeight == null ? this._Folder == null ? zi : this._Folder.GridHeight : this._GridHeight;
  }
  set GridHeight(t) {
    pt("snap-to-grid height", t), this._GridHeight !== t && (this._GridHeight = t, this._reportChange("configure", this, "GridHeight", t), this.rerender());
  }
  /**** Index ****/
  get Index() {
    return this._Folder == null ? -1 : this._Folder.IndexOfBoard(this);
  }
  set Index(t) {
    b("Index");
  }
  /**** mayBeShiftedUp ****/
  get mayBeShiftedUp() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardUp(this);
  }
  set mayBeShiftedUp(t) {
    b("mayBeShiftedUp");
  }
  /**** mayBeShiftedDown ****/
  get mayBeShiftedDown() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardDown(this);
  }
  set mayBeShiftedDown(t) {
    b("mayBeShiftedDown");
  }
  /**** mayBeShiftedIn ****/
  get mayBeShiftedIn() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardIn(this);
  }
  set mayBeShiftedIn(t) {
    b("mayBeShiftedIn");
  }
  /**** mayBeShiftedOut ****/
  get mayBeShiftedOut() {
    return this._Folder == null ? !1 : this._Folder.mayShiftBoardOut(this);
  }
  set mayBeShiftedOut(t) {
    b("mayBeShiftedOut");
  }
  /**** containsFolder ****/
  containsFolder(t) {
    for (it("folder", t), t = t.Folder; t != null; ) {
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
    b("BoardList");
  }
  /**** BoardCount ****/
  get BoardCount() {
    return this._BoardList.length;
  }
  set BoardCount(t) {
    b("BoardCount");
  }
  /**** IndexOfBoard ****/
  IndexOfBoard(t) {
    const r = this.Board(t);
    return r == null ? -1 : this._BoardList.indexOf(r);
  }
  /**** Board ****/
  Board(t) {
    switch (Ft("board, name or index", t), !0) {
      case xe(t):
        const r = t;
        return r._Folder === this ? r : void 0;
      case Ne(t):
        let n = t;
        return n < 0 && (n += this._BoardList.length), this._BoardList[n];
      case We(t):
        return this.BoardNamed(t);
    }
    N(
      "InvalidArgument: no valid board, board name or board index given"
    );
  }
  /**** existingBoard ****/
  existingBoard(t) {
    let r = this.Board(t);
    return r == null && N(
      "BoardNotFound: the desired board could not be found"
    ), r;
  }
  /**** BoardNamed ****/
  BoardNamed(t) {
    ie("SNS board name", t), t = t.trim().toLowerCase();
    let r;
    return this._BoardList.forEach((n) => {
      r == null && n.Name != null && n.Name.toLowerCase() === t && (r = n);
    }), r;
  }
  /**** BoardAt ****/
  BoardAt(t) {
    return q("SNS board index", t), t < 0 && (t += this._BoardList.length), this._BoardList[t];
  }
  /**** hasBoard ****/
  hasBoard(t) {
    return this.Board(t) != null;
  }
  /**** newBoardAt ****/
  newBoardAt(t, r) {
    return r == null ? this.BoardDeserializedAt({}, t) : this.BoardDeserializedAt({ Id: r }, t);
  }
  /**** BoardDeserializedAt - nota bene: needs explicit script activation! ****/
  BoardDeserializedAt(t, r) {
    Re("board serialization", t), de("board insertionindex", r), r == null ? r = this._BoardList.length : (r < 0 && (r += this._BoardList.length), r = Math.max(0, Math.min(r, this._BoardList.length)));
    const n = Wt("board id", t.Id);
    let a = new dt(this._Project, n);
    return this._attachBoardAt(a, r), a._deserializeConfigurationFrom(t), a._deserializeStickersFrom(t), a._deserializeBoardsFrom(t), this.rerender(), a;
  }
  /**** DuplicateOfBoardAt ****/
  DuplicateOfBoardAt(t) {
    q("board index", t);
    const n = this.existingBoard(t).Serialization;
    return Ie(n), this.BoardDeserializedAt(n, t + 1);
  }
  /**** mayShiftBoardUp/Down ****/
  mayShiftBoardUp(t) {
    const r = this.existingBoard(t);
    return this._BoardList.indexOf(r) > 0;
  }
  mayShiftBoardDown(t) {
    const r = this.existingBoard(t), n = this._BoardList, a = n.indexOf(r);
    return a >= 0 && a < n.length - 1;
  }
  /**** shiftBoardToTop ****/
  shiftBoardToTop(t) {
    const r = this.existingBoard(t);
    if (this.mayShiftBoardUp(r)) {
      const n = this._BoardList.indexOf(r);
      this._detachBoardAt(n), this._attachBoardAt(r, 0), this.rerender();
    }
  }
  /**** shiftBoardUp ****/
  shiftBoardUp(t) {
    const r = this.existingBoard(t);
    if (this.mayShiftBoardUp(r)) {
      const n = this._BoardList.indexOf(r);
      this._detachBoardAt(n), this._attachBoardAt(r, n - 1), this.rerender();
    }
  }
  /**** shiftBoardDown ****/
  shiftBoardDown(t) {
    const r = this.existingBoard(t);
    if (this.mayShiftBoardDown(r)) {
      const n = this._BoardList.indexOf(r);
      this._detachBoardAt(n), this._attachBoardAt(r, n + 1), this.rerender();
    }
  }
  /**** shiftBoardToBottom ****/
  shiftBoardToBottom(t) {
    const r = this.existingBoard(t);
    if (this.mayShiftBoardDown(r)) {
      const n = this._BoardList.indexOf(r);
      this._detachBoardAt(n), this._attachBoardAt(r, this._BoardList.length), this.rerender();
    }
  }
  /**** shiftBoardTo ****/
  shiftBoardTo(t, r) {
    const n = this.existingBoard(t);
    q("SNS board index", r), r < 0 && (r += this._BoardList.length), r = Math.max(0, Math.min(r, this._BoardList.length));
    const a = this._BoardList.indexOf(n);
    a !== r && (this._detachBoardAt(a), this._attachBoardAt(n, r), this.rerender());
  }
  /**** shiftBoardsByIndex ****/
  shiftBoardsByIndex(t, r, n) {
    const a = this._BoardList.length;
    _e("old index", t, 0, a), _e("new index", r, 0, a);
    const d = this._BoardList.slice(t, t + n);
    d.forEach((s) => this._detachBoardAt(t)), r > t && (r -= n), d.forEach(
      (s, l) => this._attachBoardAt(s, r + l)
    ), this.rerender();
  }
  /**** mayShiftBoardIn/Out ****/
  mayShiftBoardIn(t) {
    const r = this.existingBoard(t);
    return this.mayShiftBoardDown(r);
  }
  mayShiftBoardOut(t) {
    return this._Folder != null;
  }
  /**** shiftBoardIn ****/
  shiftBoardIn(t) {
    const r = this.existingBoard(t);
    if (this.mayShiftBoardIn(r)) {
      const n = this._BoardList.indexOf(r), a = this._BoardList[n + 1];
      this._detachBoardAt(n), a._attachBoardAt(r, 0), this.rerender(), a.rerender();
    }
  }
  /**** shiftBoardOut ****/
  shiftBoardOut(t) {
    const r = this.existingBoard(t);
    if (this.mayShiftBoardOut(r)) {
      const n = this._BoardList.indexOf(r), a = this._Folder;
      this._detachBoardAt(n), a._attachBoardAt(r, a.Index), this.rerender(), a.rerender();
    }
  }
  /**** mayMoveBoardTo ****/
  mayMoveBoardTo(t, r, n) {
    const a = this.existingBoard(t), d = te(r) ? r : this.existingBoard(r);
    return de("insertion index", n), d.isAttached && d !== a && !a.containsFolder(d);
  }
  /**** moveBoardTo ****/
  moveBoardTo(t, r, n) {
    const a = this.existingBoard(t), d = te(r) ? r : this.existingBoard(r);
    if (de("insertion index", n), d.isAttached && d !== a && !a.containsFolder(d)) {
      const s = this._BoardList.indexOf(a);
      let l = n ?? d.BoardCount;
      l < 0 && (l += d.BoardCount), l = Math.max(0, Math.min(l, d.BoardCount)), this._detachBoardAt(s), d._attachBoardAt(a, l), this.rerender(), d.rerender();
    }
  }
  /**** destroyBoard ****/
  destroyBoard(t) {
    const r = this.Board(t);
    if (r == null) {
      xe(t) && N(
        "NoSuchBoard: the given board could not be found"
      );
      return;
    }
    r.clear(), ot(r);
    const n = this._BoardList.indexOf(r);
    this._detachBoardAt(n), Yt(r), r._Project = void 0, this._reportChange("destroyBoard", r), this.rerender();
  }
  /**** clear ****/
  clear() {
    for (let t = 0, r = this._BoardList.length; t < r; t++)
      this.destroyBoard(this._BoardList[0]);
  }
  /**** Rendering ****/
  Rendering(t) {
    if (this.hasError)
      return $e.call(this);
    let r = this._Renderer;
    if (r == null)
      return "";
    try {
      return r.call(this, t);
    } catch (n) {
      return this.Error = {
        Type: "Rendering Failure",
        Message: "" + n,
        Cause: n
      }, $e.call(this);
    }
  }
  /**** _attachBoardAt ****/
  /* protected */
  _attachBoardAt(t, r) {
    t._Folder = this, this._BoardList.splice(r, 0, t), this._reportChange("attachBoard", t, this, r);
  }
  /**** _detachBoardAt ****/
  /* protected */
  _detachBoardAt(t) {
    const r = this._BoardList.splice(t, 1)[0];
    r._Folder = void 0, this._reportChange("detachBoard", r, this, t);
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(t) {
    super._serializeConfigurationInto(t);
    const r = (n) => {
      this["_" + n] != null && (t[n] = this[n]);
    };
    [
      "SnapToGrid",
      "GridWidth",
      "GridHeight"
    ].forEach((n) => r(n));
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(t) {
    super._deserializeConfigurationFrom(t);
    const r = (n) => {
      if (t[n] != null)
        try {
          this[n] = t[n];
        } catch {
          console.warn(
            "DeserializationError:invalid value for property " + z(n)
          );
        }
    };
    [
      "SnapToGrid",
      "GridWidth",
      "GridHeight"
    ].forEach((n) => r(n));
  }
  /**** _serializeBoardsInto ****/
  _serializeBoardsInto(t) {
    const r = this._BoardList.slice();
    r.length > 0 && (t.BoardList = r.map(
      (n) => n.Serialization
    ));
  }
  /**** _deserializeBoardsFrom ****/
  _deserializeBoardsFrom(t) {
    this._BoardList.length > 0 && this.clear(), De(t.BoardList, Fe) && t.BoardList.length > 0 && t.BoardList.forEach(
      (n, a) => {
        this.BoardDeserializedAt(n, a);
      }
    );
  }
}
const Jt = /* @__PURE__ */ Object.create(null);
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
].forEach((i) => Jt[i] = !0);
class Ae extends lt {
  constructor(t) {
    super(void 0, void 0);
    /**** onChange ****/
    _(this, "_onChange", []);
    /**** onRender ****/
    _(this, "_onRender", []);
    /**** onError ****/
    _(this, "_onError", []);
    this._Project = this, ie("project name", t), this._Name = t;
  }
  /**** Name ****/
  get Name() {
    return this._Name;
  }
  set Name(t) {
    b("Name");
  }
  /**** IndexPath ****/
  get IndexPath() {
    return [];
  }
  set IndexPath(t) {
    b("IndexPath");
  }
  /**** BoardAtIndexPath ****/
  BoardAtIndexPath(t) {
    if (ui("board index path", t, Je), t.length !== 0) {
      let r;
      for (let n = 0, a = t.length; n < a; n++)
        if (r = (r || this).BoardAt(t[n]), r == null)
          return;
      return r;
    }
  }
  /**** FolderWithId ****/
  FolderWithId(t) {
    return B("folder id", t), bt(this, t);
  }
  /**** BoardWithId ****/
  BoardWithId(t) {
    const r = bt(this, t);
    return oe(r) && N(
      "NotABoard: the folder with the given id is not a board, but the project"
    ), r;
  }
  /**** StickerWithId ****/
  StickerWithId(t) {
    return B("sticker id", t), Qi(this, t);
  }
  /**** recursivelyActivateAllScripts ****/
  recursivelyActivateAllScripts() {
    this.activateScript(), this._BoardList.forEach(
      (t) => t.recursivelyActivateAllScripts()
    );
  }
  onChange(t) {
    ee('"onChange" callback', t), this._onChange.push(t);
  }
  /**** _reportChange ****/
  /* protected */
  _reportChange(t, r, ...n) {
    t === "configure" && (t = te(r) ? "configureFolder" : "configureSticker"), n.unshift(this, t, r), this._onChange.forEach(
      // @ts-ignore TS2345 skip checking of individual "ArgList" elements
      (a) => a.apply(this, n)
    );
  }
  onRender(t) {
    ee('"onRender" callback', t), this._onRender.push(t);
  }
  /**** rerender ****/
  rerender(t, r) {
    this._onRender.forEach(
      (n) => n(this, t, r)
    );
  }
  onError(t) {
    ee('"onError" callback', t), this._onError.push(t);
  }
  /**** showError ****/
  showError(t, r) {
    this._onError.forEach(
      (n) => n(this, t, r)
    );
  }
  /**** Serialization ****/
  get Serialization() {
    const t = {};
    return this._serializeConfigurationInto(t), this._serializeBoardsInto(t), delete t.Id, t;
  }
  set Serialization(t) {
    b("Serialization");
  }
  /**** deserializedFrom - nota bene: needs explicit script activation! ****/
  static deserializedFrom(t, r) {
    ie("project name", t);
    const n = new Ae(t);
    return delete r.Name, n._Name = t, n._deserializeConfigurationFrom(r), n._deserializeBoardsFrom(r), n;
  }
}
const ut = /* @__PURE__ */ Object.create(null);
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
].forEach((i) => ut[i] = !0);
class dt extends lt {
  /* protected */
  constructor(t, r) {
    super(t, r);
    /**** StickerList ****/
    _(this, "_StickerList", []);
    ji(t, this), t._reportChange("createBoard", this);
  }
  get StickerList() {
    return this._StickerList.slice();
  }
  set StickerList(t) {
    b("StickerList");
  }
  /**** StickerCount ****/
  get StickerCount() {
    return this._StickerList.length;
  }
  set StickerCount(t) {
    b("StickerCount");
  }
  /**** IndexOfSticker ****/
  IndexOfSticker(t) {
    return Me("SNS sticker to search for", t), this._StickerList.indexOf(t);
  }
  /**** Sticker ****/
  Sticker(t) {
    switch (Ft("sticker, name or index", t), !0) {
      case we(t):
        const r = t;
        return r.Board === this ? r : void 0;
      case Ne(t):
        const n = t;
        return this._StickerList[n];
      case We(t):
        return this.StickerNamed(t);
    }
    N(
      "InvalidArgument: no valid sticker, sticker name or sticker index given"
    );
  }
  /**** existingSticker ****/
  existingSticker(t) {
    let r = this.Sticker(t);
    return r == null && N(
      "StickerNotFound: the desired sticker could not be found"
    ), r;
  }
  /**** StickerNamed ****/
  StickerNamed(t) {
    ie("SNS sticker name", t), t = t.trim().toLowerCase();
    let r;
    return this._StickerList.forEach((n) => {
      r == null && n.Name != null && n.Name.toLowerCase() === t && (r = n);
    }), r;
  }
  /**** StickerAt ****/
  StickerAt(t) {
    return q("SNS sticker index", t), t < 0 && (t += this._StickerList.length), this._StickerList[t];
  }
  /**** hasSticker ****/
  hasSticker(t) {
    return this.Sticker(t) != null;
  }
  /**** newStickerAt ****/
  newStickerAt(t, r) {
    return r == null ? this.StickerDeserializedAt({}, t) : this.StickerDeserializedAt({ Id: r }, t);
  }
  /**** StickerDeserializedAt - nota bene: needs explicit script activation! ****/
  StickerDeserializedAt(t, r) {
    Re("sticker serialization", t), de("SNS sticker index", r), r == null ? r = this._StickerList.length : (r < 0 && (r += this._StickerList.length), r = Math.max(0, Math.min(r, this._StickerList.length)));
    const n = Wt("sticker id", t.Id);
    let a = new ct(this.Project, n);
    return this._attachStickerAt(a, r), a._deserializeConfigurationFrom(t), this.rerender(), a;
  }
  /**** DuplicateOfStickerAt ****/
  DuplicateOfStickerAt(t) {
    q("SNS sticker index", t);
    const n = this.existingSticker(t).Serialization;
    return Ie(n), this.StickerDeserializedAt(n, t + 1);
  }
  /**** mayShiftStickerUp/Down ****/
  mayShiftStickerUp(t) {
    const r = this.existingSticker(t);
    return this._StickerList.indexOf(r) > 0;
  }
  mayShiftStickerDown(t) {
    const r = this.existingSticker(t), n = this._StickerList, a = n.indexOf(r);
    return a >= 0 && a < n.length - 1;
  }
  /**** shiftStickerToTop ****/
  shiftStickerToTop(t) {
    const r = this.existingSticker(t);
    if (this.mayShiftStickerUp(r)) {
      const n = this._StickerList.indexOf(r);
      this._detachStickerAt(n), this._attachStickerAt(r, 0), this.rerender();
    }
  }
  /**** shiftStickerUp ****/
  shiftStickerUp(t) {
    const r = this.existingSticker(t);
    if (this.mayShiftStickerUp(r)) {
      const n = this._StickerList.indexOf(r);
      this._detachStickerAt(n), this._attachStickerAt(r, n - 1), this.rerender();
    }
  }
  /**** shiftStickerDown ****/
  shiftStickerDown(t) {
    const r = this.existingSticker(t);
    if (this.mayShiftStickerDown(r)) {
      const n = this._StickerList.indexOf(r);
      this._detachStickerAt(n), this._attachStickerAt(r, n + 1), this.rerender();
    }
  }
  /**** shiftStickerToBottom ****/
  shiftStickerToBottom(t) {
    const r = this.existingSticker(t);
    if (this.mayShiftStickerDown(r)) {
      const n = this._StickerList.indexOf(r);
      this._detachStickerAt(n), this._attachStickerAt(r, this._StickerList.length), this.rerender();
    }
  }
  /**** shiftStickerTo ****/
  shiftStickerTo(t, r) {
    const n = this.existingSticker(t);
    q("SNS sticker index", r), r < 0 && (r += this._StickerList.length), r = Math.max(0, Math.min(r, this._StickerList.length - 1));
    const a = this._StickerList.indexOf(n);
    a !== r && (this._detachStickerAt(a), this._attachStickerAt(n, r), this.rerender());
  }
  /**** shiftStickersByIndex ****/
  shiftStickersByIndex(t, r, n) {
    const a = this._StickerList.length;
    _e("old index", t, 0, a), _e("new index", r, 0, a);
    const d = this._StickerList.slice(t, t + n);
    d.forEach((s) => this._detachStickerAt(t)), r > t && (r -= n), d.forEach(
      (s, l) => this._attachStickerAt(s, r + l)
    ), this.rerender();
  }
  /**** destroySticker ****/
  destroySticker(t) {
    const r = this.Sticker(t);
    if (r == null) {
      we(t) && N(
        "NoSuchSticker: the given sticker could not be found"
      );
      return;
    }
    ot(r);
    const n = this._StickerList.indexOf(r);
    this._detachStickerAt(n), qt(r), r._Project = void 0, this._reportChange("destroySticker", r), this.rerender();
  }
  /**** clear ****/
  clear() {
    super.clear();
    for (let t = 0, r = this._StickerList.length; t < r; t++)
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
  _attachStickerAt(t, r) {
    t._Folder = this, this._StickerList.splice(r, 0, t), this._reportChange("attachSticker", t, this, r);
  }
  /**** _detachStickerAt ****/
  /* protected */
  _detachStickerAt(t) {
    const r = this._StickerList.splice(t, 1)[0];
    r._Folder = void 0, this._reportChange("detachSticker", r, this, t);
  }
  /**** Serialization ****/
  get Serialization() {
    const t = {};
    return this._serializeConfigurationInto(t), this._serializeBoardsInto(t), this._serializeStickersInto(t), t;
  }
  set Serialization(t) {
    b("Serialization");
  }
  /**** _serializeStickersInto ****/
  _serializeStickersInto(t) {
    const r = this._StickerList.slice();
    r.length > 0 && (t.StickerList = r.map(
      (n) => n.Serialization
    ));
  }
  /**** _deserializeStickersFrom ****/
  _deserializeStickersFrom(t) {
    this._StickerList.length > 0 && this.clear(), De(t.StickerList, Fe) && t.StickerList.length > 0 && t.StickerList.forEach(
      (n, a) => {
        this.StickerDeserializedAt(n, a);
      }
    );
  }
}
const cr = /* @__PURE__ */ Object.create(null);
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
].forEach((i) => ut[i] = !0);
class ct extends st {
  /* protected */
  constructor(t, r) {
    super(t, r);
    /**** minWidth ****/
    _(this, "_minWidth");
    /**** maxWidth ****/
    _(this, "_maxWidth", Gi);
    /**** minHeight ****/
    _(this, "_minHeight");
    /**** maxHeight ****/
    _(this, "_maxHeight", Ei);
    /**** Geometry ****/
    _(this, "_Geometry", { ...Y });
    /**** Lock ****/
    _(this, "_Lock", !1);
    /**** Visibility ****/
    _(this, "_Visibility", !0);
    /**** Enabling ****/
    _(this, "_Enabling", !0);
    Ki(t, this), t._reportChange("createSticker", this);
  }
  /**** Board ****/
  get Board() {
    return this._Folder;
  }
  set Board(t) {
    b("Board");
  }
  /**** BackgroundTexture ****/
  get BackgroundTexture() {
    return this._BackgroundTexture;
  }
  set BackgroundTexture(t) {
    Vt("visual background texture", t), this._BackgroundTexture !== t && (this._BackgroundTexture = t, this._reportChange("configure", this, "BackgroundTexture", t), this.rerender());
  }
  /**** Index ****/
  get Index() {
    return this._Folder.IndexOfSticker(this);
  }
  set Index(t) {
    b("Index");
  }
  /**** mayBeShiftedUp ****/
  get mayBeShiftedUp() {
    return this._Folder.mayShiftStickerUp(this);
  }
  set mayBeShiftedUp(t) {
    b("mayBeShiftedUp");
  }
  /**** mayBeShiftedDown ****/
  get mayBeShiftedDown() {
    return this._Folder.mayShiftStickerDown(this);
  }
  set mayBeShiftedDown(t) {
    b("mayBeShiftedDown");
  }
  get minWidth() {
    return this._minWidth == null ? Ti : this._minWidth;
  }
  set minWidth(t) {
    J("minimal sticker width", t), this._minWidth !== t && (this._minWidth = t, this._reportChange("configure", this, "minWidth", t), this._minWidth != null && this._maxWidth != null && this._maxWidth < this._minWidth && (this._maxWidth = t, this._reportChange("configure", this, "maxWidth", this._minWidth)), this._minWidth != null && this._Geometry.Width < this._minWidth && (this.Width = this._minWidth), this.rerender());
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(t) {
    J("maximal sticker width", t), t != null && this._minWidth != null && (t = Math.max(this._minWidth, t)), this._maxWidth !== t && (this._maxWidth = t, this._reportChange("configure", this, "maxWidth", this._maxWidth), this._maxWidth != null && this._Geometry.Width > this._maxWidth && (this.Width = this._maxWidth), this.rerender());
  }
  get minHeight() {
    return this._minHeight == null ? Pi : this._minHeight;
  }
  set minHeight(t) {
    J("minimal sticker height", t), this._minHeight !== t && (this._minHeight = t, this._reportChange("configure", this, "minHeight", t), this._minHeight != null && this._maxHeight != null && this._maxHeight < this._minHeight && (this._maxHeight = t, this._reportChange("configure", this, "maxHeight", this._minHeight)), this._minHeight != null && this._Geometry.Height < this._minHeight && (this.Height = this._minHeight), this.rerender());
  }
  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(t) {
    J("maximal sticker height", t), t != null && this._minHeight != null && (t = Math.max(this._minHeight, t)), this._maxHeight !== t && (this._maxHeight = t, this._reportChange("configure", this, "maxHeight", this._maxHeight), this._maxHeight != null && this._Geometry.Height > this._maxHeight && (this.Height = this._maxHeight), this.rerender());
  }
  /**** x ****/
  get x() {
    return this._Geometry.x;
  }
  set x(t) {
    Xe("sticker x coordinate", t), this.Geometry = { ...this.Geometry, x: t };
  }
  /**** y ****/
  get y() {
    return this._Geometry.y;
  }
  set y(t) {
    Xe("sticker y coordinate", t), this.Geometry = { ...this.Geometry, y: t };
  }
  /**** Width ****/
  get Width() {
    return this._Geometry.Width;
  }
  set Width(t) {
    Ye("sticker width", t), this.Geometry = { ...this.Geometry, Width: t };
  }
  /**** Height ****/
  get Height() {
    return this._Geometry.Height;
  }
  set Height(t) {
    Ye("sticker height", t), this.Geometry = { ...this.Geometry, Height: t };
  }
  /**** Position ****/
  get Position() {
    return { x: this._Geometry.x, y: this._Geometry.y };
  }
  set Position(t) {
    Tt("visual position", t), this.Geometry = { ...this.Geometry, x: t.x, y: t.y };
  }
  /**** Size ****/
  get Size() {
    return { Width: this._Geometry.Width, Height: this._Geometry.Height };
  }
  set Size(t) {
    Pt("visual size", t), this.Geometry = { ...this.Geometry, Width: t.Width, Height: t.Height };
  }
  get Geometry() {
    let { x: t, y: r, Width: n, Height: a } = this._Geometry;
    return this._minWidth != null && (n = Math.max(this._minWidth, n)), this._maxWidth != null && (n = Math.min(n, this._maxWidth)), this._minHeight != null && (a = Math.max(this._minHeight, a)), this._maxHeight != null && (a = Math.min(a, this._maxHeight)), { x: t, y: r, Width: n, Height: a };
  }
  set Geometry(t) {
    Ut("visual geometry", t);
    let { x: r, y: n, Width: a, Height: d } = this._Geometry;
    (r !== t.x || a !== t.Width || n !== t.y || d !== t.Height) && (this._Geometry = { ...t }, this._reportChange("configure", this, "Geometry", { ...t }), this.rerender());
  }
  get Lock() {
    return this._Lock;
  }
  set Lock(t) {
    Ge("sticker lock", t), this._Lock !== t && (this._Lock = t, this._reportChange("configure", this, "Lock", t), this.rerender());
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
    Ge("sticker visibility", t), this._Visibility !== t && (this._Visibility = t, this._reportChange("configure", this, "Visibility", t), this.rerender());
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
    Ge("sticker enabling", t), this._Enabling !== t && (this._Enabling = t, this._reportChange("configure", this, "Enabling", t), this.rerender());
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
      return $e.call(this);
    let r = this._Renderer || Xt;
    try {
      return r.call(this, t);
    } catch (n) {
      return this.Error = {
        Type: "Rendering Failure",
        Message: "" + n,
        Cause: n
      }, $e.call(this);
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
    b("Serialization");
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(t) {
    super._serializeConfigurationInto(t), t.Geometry = { ...this._Geometry }, this._minWidth != null && (t.minWidth = this._minWidth), this._maxWidth != null && (t.maxWidth = this._maxWidth), this._minHeight != null && (t.minHeight = this._minHeight), this._maxHeight != null && (t.maxHeight = this._maxHeight), this.isLocked && (t.Lock = !0), this.isVisible || (t.Visibility = !1), this.isEnabled || (t.Enabling = !1);
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(t) {
    super._deserializeConfigurationFrom(t);
    let { x: r, y: n, Width: a, Height: d } = t.Geometry || Y;
    E(r) || (r = Y.x), E(n) || (n = Y.y), U(a) || (a = Y.Width), U(d) || (d = Y.Height), this.Geometry = { x: r, y: n, Width: a, Height: d }, t.Lock != null && (this.Lock = t.Lock), t.Visibility != null && (this.Visibility = t.Visibility), t.Enabling != null && (this.Enabling = t.Enabling);
  }
}
const wn = ["not-ready", "disconnected", "connecting", "connected"];
class $n {
}
window.SNS = {
  throwError: N,
  throwReadOnlyError: b,
  SNS_Project: Ae
};
console.log("SNS is globally available now");
document.dispatchEvent(
  // @ts-ignore TS2339 allow global variable "SNS"
  new CustomEvent("SNS", { detail: window.SNS })
);
export {
  Qt as CSSStyleOfVisual,
  $n as SNS_Adapter,
  dt as SNS_Board,
  Xr as SNS_Changes,
  wn as SNS_ConnectionStates,
  $i as SNS_ErrorTypes,
  lt as SNS_Folder,
  wi as SNS_FontStyles,
  Ae as SNS_Project,
  ct as SNS_Sticker,
  st as SNS_Visual,
  xn as TemplateOfBehavior,
  xe as ValueIsBoard,
  U as ValueIsDimension,
  zt as ValueIsError,
  te as ValueIsFolder,
  Et as ValueIsGeometry,
  Mt as ValueIsId,
  Rt as ValueIsIdentifier,
  E as ValueIsLocation,
  We as ValueIsName,
  At as ValueIsPosition,
  oe as ValueIsProject,
  Ot as ValueIsSerializable,
  Gt as ValueIsSize,
  we as ValueIsSticker,
  Dt as ValueIsVisual,
  Oi as acceptableBoolean,
  nt as acceptableColor,
  Xi as acceptableEMailAddress,
  mn as acceptableFunction,
  an as acceptableInteger,
  ln as acceptableIntegerInRange,
  _n as acceptableList,
  Zt as acceptableListSatisfying,
  gn as acceptableNonEmptyString,
  He as acceptableNumber,
  on as acceptableNumberInRange,
  $ as acceptableOptionalBoolean,
  Zi as acceptableOptionalColor,
  kn as acceptableOptionalFunction,
  sn as acceptableOptionalInteger,
  un as acceptableOptionalIntegerInRange,
  bn as acceptableOptionalList,
  M as acceptableOptionalListSatisfying,
  pn as acceptableOptionalNonEmptyString,
  H as acceptableOptionalNumber,
  Z as acceptableOptionalNumberInRange,
  D as acceptableOptionalOrdinal,
  hn as acceptableOptionalString,
  I as acceptableOptionalStringMatching,
  Sn as acceptableOptionalText,
  y as acceptableOptionalTextline,
  dn as acceptableOrdinal,
  Yi as acceptablePhoneNumber,
  cn as acceptableString,
  fn as acceptableStringMatching,
  ae as acceptableText,
  V as acceptableTextline,
  Q as acceptableURL,
  Vi as allowBoard,
  J as allowDimension,
  qe as allowError,
  yi as allowFolder,
  Ri as allowGeometry,
  Li as allowId,
  Di as allowIdentifier,
  Ci as allowLocation,
  Ht as allowName,
  Mi as allowPosition,
  Ii as allowProject,
  Ai as allowSerializable,
  Wi as allowSize,
  Fi as allowSticker,
  Bi as allowVisual,
  $r as allowedBoard,
  Wr as allowedDimension,
  Ur as allowedError,
  br as allowedFolder,
  Pr as allowedGeometry,
  Wt as allowedId,
  Fr as allowedIdentifier,
  Cr as allowedLocation,
  Nr as allowedName,
  Hr as allowedPosition,
  xr as allowedProject,
  Or as allowedSerializable,
  Tr as allowedSize,
  yr as allowedSticker,
  kr as allowedVisual,
  jr as attachBoard,
  tn as attachSticker,
  qr as configureFolder,
  en as configureSticker,
  Yr as createBoard,
  Jr as createSticker,
  Qr as destroyBoard,
  nn as destroySticker,
  Kr as detachBoard,
  rn as detachSticker,
  rt as expectBoard,
  Ye as expectDimension,
  Hi as expectError,
  it as expectFolder,
  Ut as expectGeometry,
  B as expectId,
  K as expectIdentifier,
  Xe as expectLocation,
  ie as expectName,
  Tt as expectPosition,
  C as expectProject,
  Re as expectSerializable,
  Pt as expectSize,
  Me as expectSticker,
  Ct as expectVisual,
  Br as expectedBoard,
  Rr as expectedDimension,
  zr as expectedError,
  vr as expectedFolder,
  Er as expectedGeometry,
  Vr as expectedId,
  Lr as expectedIdentifier,
  Mr as expectedLocation,
  Dr as expectedName,
  Ar as expectedPosition,
  wr as expectedProject,
  Zr as expectedSerializable,
  Gr as expectedSize,
  Ir as expectedSticker,
  _r as expectedVisual,
  vn as groupedBehaviorEntryList,
  qi as newId,
  Ie as removeIdsFrom,
  kt as sanitizeBoardList,
  _t as sanitizeStickerList,
  N as throwError,
  b as throwReadOnlyError
};
//# sourceMappingURL=shareableNoteStickers.js.map
