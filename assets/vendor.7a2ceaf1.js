function ji(e, t) {
  const r = Object.create(null),
    n = e.split(",");
  for (let a = 0; a < n.length; a++) r[n[a]] = !0;
  return t ? (a) => !!r[a.toLowerCase()] : (a) => !!r[a];
}
const $v =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ev = ji($v);
function Ro(e) {
  return !!e || e === "";
}
function J(e) {
  if (Se(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r],
        a = Je(n) ? Pv(n) : J(n);
      if (a) for (const i in a) t[i] = a[i];
    }
    return t;
  } else {
    if (Je(e)) return e;
    if (Qe(e)) return e;
  }
}
const Mv = /;(?![^(]*\))/g,
  Iv = /:(.+)/;
function Pv(e) {
  const t = {};
  return (
    e.split(Mv).forEach((r) => {
      if (r) {
        const n = r.split(Iv);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }),
    t
  );
}
function Y(e) {
  let t = "";
  if (Je(e)) t = e;
  else if (Se(e))
    for (let r = 0; r < e.length; r++) {
      const n = Y(e[r]);
      n && (t += n + " ");
    }
  else if (Qe(e)) for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
function Uo(e) {
  if (!e) return null;
  let { class: t, style: r } = e;
  return t && !Je(t) && (e.class = Y(t)), r && (e.style = J(r)), e;
}
const ie = (e) =>
    e == null
      ? ""
      : Se(e) || (Qe(e) && (e.toString === jo || !Me(e.toString)))
      ? JSON.stringify(e, Yo, 2)
      : String(e),
  Yo = (e, t) =>
    t && t.__v_isRef
      ? Yo(e, t.value)
      : ln(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (r, [n, a]) => ((r[`${n} =>`] = a), r),
            {}
          ),
        }
      : Ho(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Qe(t) && !Se(t) && !Ko(t)
      ? String(t)
      : t,
  Fe = {},
  an = [],
  Vt = () => {},
  Ov = () => !1,
  _v = /^on[^a-z]/,
  ja = (e) => _v.test(e),
  Ki = (e) => e.startsWith("onUpdate:"),
  tt = Object.assign,
  qi = (e, t) => {
    const r = e.indexOf(t);
    r > -1 && e.splice(r, 1);
  },
  Vv = Object.prototype.hasOwnProperty,
  De = (e, t) => Vv.call(e, t),
  Se = Array.isArray,
  ln = (e) => Ka(e) === "[object Map]",
  Ho = (e) => Ka(e) === "[object Set]",
  Me = (e) => typeof e == "function",
  Je = (e) => typeof e == "string",
  Xi = (e) => typeof e == "symbol",
  Qe = (e) => e !== null && typeof e == "object",
  Wo = (e) => Qe(e) && Me(e.then) && Me(e.catch),
  jo = Object.prototype.toString,
  Ka = (e) => jo.call(e),
  Nv = (e) => Ka(e).slice(8, -1),
  Ko = (e) => Ka(e) === "[object Object]",
  Gi = (e) =>
    Je(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  qa = ji(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Xa = (e) => {
    const t = Object.create(null);
    return (r) => t[r] || (t[r] = e(r));
  },
  Av = /-(\w)/g,
  jt = Xa((e) => e.replace(Av, (t, r) => (r ? r.toUpperCase() : ""))),
  Dv = /\B([A-Z])/g,
  Pr = Xa((e) => e.replace(Dv, "-$1").toLowerCase()),
  Ga = Xa((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Zi = Xa((e) => (e ? `on${Ga(e)}` : "")),
  pa = (e, t) => !Object.is(e, t),
  Za = (e, t) => {
    for (let r = 0; r < e.length; r++) e[r](t);
  },
  Ja = (e, t, r) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: r });
  },
  Qa = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let qo;
const Bv = () =>
  qo ||
  (qo =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let Or;
const xa = [];
class Fv {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        Or &&
        ((this.parent = Or),
        (this.index = (Or.scopes || (Or.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active)
      try {
        return this.on(), t();
      } finally {
        this.off();
      }
  }
  on() {
    this.active && (xa.push(this), (Or = this));
  }
  off() {
    this.active && (xa.pop(), (Or = xa[xa.length - 1]));
  }
  stop(t) {
    if (this.active) {
      if (
        (this.effects.forEach((r) => r.stop()),
        this.cleanups.forEach((r) => r()),
        this.scopes && this.scopes.forEach((r) => r.stop(!0)),
        this.parent && !t)
      ) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.active = !1;
    }
  }
}
function Lv(e, t) {
  (t = t || Or), t && t.active && t.effects.push(e);
}
const Ji = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Xo = (e) => (e.w & or) > 0,
  Go = (e) => (e.n & or) > 0,
  zv = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= or;
  },
  Rv = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let r = 0;
      for (let n = 0; n < t.length; n++) {
        const a = t[n];
        Xo(a) && !Go(a) ? a.delete(e) : (t[r++] = a),
          (a.w &= ~or),
          (a.n &= ~or);
      }
      t.length = r;
    }
  },
  Qi = new WeakMap();
let ma = 0,
  or = 1;
const xi = 30,
  ga = [];
let _r;
const Vr = Symbol(""),
  el = Symbol("");
class tl {
  constructor(t, r = null, n) {
    (this.fn = t),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      Lv(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    if (!ga.includes(this))
      try {
        return (
          ga.push((_r = this)),
          Uv(),
          (or = 1 << ++ma),
          ma <= xi ? zv(this) : Zo(this),
          this.fn()
        );
      } finally {
        ma <= xi && Rv(this), (or = 1 << --ma), Nr(), ga.pop();
        const t = ga.length;
        _r = t > 0 ? ga[t - 1] : void 0;
      }
  }
  stop() {
    this.active && (Zo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Zo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++) t[r].delete(e);
    t.length = 0;
  }
}
let on = !0;
const rl = [];
function sn() {
  rl.push(on), (on = !1);
}
function Uv() {
  rl.push(on), (on = !0);
}
function Nr() {
  const e = rl.pop();
  on = e === void 0 ? !0 : e;
}
function wt(e, t, r) {
  if (!Jo()) return;
  let n = Qi.get(e);
  n || Qi.set(e, (n = new Map()));
  let a = n.get(r);
  a || n.set(r, (a = Ji())), Qo(a);
}
function Jo() {
  return on && _r !== void 0;
}
function Qo(e, t) {
  let r = !1;
  ma <= xi ? Go(e) || ((e.n |= or), (r = !Xo(e))) : (r = !e.has(_r)),
    r && (e.add(_r), _r.deps.push(e));
}
function er(e, t, r, n, a, i) {
  const l = Qi.get(e);
  if (!l) return;
  let o = [];
  if (t === "clear") o = [...l.values()];
  else if (r === "length" && Se(e))
    l.forEach((s, u) => {
      (u === "length" || u >= n) && o.push(s);
    });
  else
    switch ((r !== void 0 && o.push(l.get(r)), t)) {
      case "add":
        Se(e)
          ? Gi(r) && o.push(l.get("length"))
          : (o.push(l.get(Vr)), ln(e) && o.push(l.get(el)));
        break;
      case "delete":
        Se(e) || (o.push(l.get(Vr)), ln(e) && o.push(l.get(el)));
        break;
      case "set":
        ln(e) && o.push(l.get(Vr));
        break;
    }
  if (o.length === 1) o[0] && nl(o[0]);
  else {
    const s = [];
    for (const u of o) u && s.push(...u);
    nl(Ji(s));
  }
}
function nl(e, t) {
  for (const r of Se(e) ? e : [...e])
    (r !== _r || r.allowRecurse) && (r.scheduler ? r.scheduler() : r.run());
}
const Yv = ji("__proto__,__v_isRef,__isVue"),
  xo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(Xi)
  ),
  Hv = al(),
  Wv = al(!1, !0),
  jv = al(!0),
  es = Kv();
function Kv() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...r) {
        const n = Ve(this);
        for (let i = 0, l = this.length; i < l; i++) wt(n, "get", i + "");
        const a = n[t](...r);
        return a === -1 || a === !1 ? n[t](...r.map(Ve)) : a;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...r) {
        sn();
        const n = Ve(this)[t].apply(this, r);
        return Nr(), n;
      };
    }),
    e
  );
}
function al(e = !1, t = !1) {
  return function (n, a, i) {
    if (a === "__v_isReactive") return !e;
    if (a === "__v_isReadonly") return e;
    if (a === "__v_raw" && i === (e ? (t ? sc : us) : t ? ss : os).get(n))
      return n;
    const l = Se(n);
    if (!e && l && De(es, a)) return Reflect.get(es, a, i);
    const o = Reflect.get(n, a, i);
    return (Xi(a) ? xo.has(a) : Yv(a)) || (e || wt(n, "get", a), t)
      ? o
      : vt(o)
      ? !l || !Gi(a)
        ? o.value
        : o
      : Qe(o)
      ? e
        ? ds(o)
        : qe(o)
      : o;
  };
}
const qv = ts(),
  Xv = ts(!0);
function ts(e = !1) {
  return function (r, n, a, i) {
    let l = r[n];
    if (!e && !sl(a) && ((a = Ve(a)), (l = Ve(l)), !Se(r) && vt(l) && !vt(a)))
      return (l.value = a), !0;
    const o = Se(r) && Gi(n) ? Number(n) < r.length : De(r, n),
      s = Reflect.set(r, n, a, i);
    return (
      r === Ve(i) && (o ? pa(a, l) && er(r, "set", n, a) : er(r, "add", n, a)),
      s
    );
  };
}
function Gv(e, t) {
  const r = De(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && r && er(e, "delete", t, void 0), n;
}
function Zv(e, t) {
  const r = Reflect.has(e, t);
  return (!Xi(t) || !xo.has(t)) && wt(e, "has", t), r;
}
function Jv(e) {
  return wt(e, "iterate", Se(e) ? "length" : Vr), Reflect.ownKeys(e);
}
const rs = { get: Hv, set: qv, deleteProperty: Gv, has: Zv, ownKeys: Jv },
  Qv = {
    get: jv,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  xv = tt({}, rs, { get: Wv, set: Xv }),
  il = (e) => e,
  ei = (e) => Reflect.getPrototypeOf(e);
function ti(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  const a = Ve(e),
    i = Ve(t);
  t !== i && !r && wt(a, "get", t), !r && wt(a, "get", i);
  const { has: l } = ei(a),
    o = n ? il : r ? ul : ya;
  if (l.call(a, t)) return o(e.get(t));
  if (l.call(a, i)) return o(e.get(i));
  e !== a && e.get(t);
}
function ri(e, t = !1) {
  const r = this.__v_raw,
    n = Ve(r),
    a = Ve(e);
  return (
    e !== a && !t && wt(n, "has", e),
    !t && wt(n, "has", a),
    e === a ? r.has(e) : r.has(e) || r.has(a)
  );
}
function ni(e, t = !1) {
  return (
    (e = e.__v_raw), !t && wt(Ve(e), "iterate", Vr), Reflect.get(e, "size", e)
  );
}
function ns(e) {
  e = Ve(e);
  const t = Ve(this);
  return ei(t).has.call(t, e) || (t.add(e), er(t, "add", e, e)), this;
}
function as(e, t) {
  t = Ve(t);
  const r = Ve(this),
    { has: n, get: a } = ei(r);
  let i = n.call(r, e);
  i || ((e = Ve(e)), (i = n.call(r, e)));
  const l = a.call(r, e);
  return (
    r.set(e, t), i ? pa(t, l) && er(r, "set", e, t) : er(r, "add", e, t), this
  );
}
function is(e) {
  const t = Ve(this),
    { has: r, get: n } = ei(t);
  let a = r.call(t, e);
  a || ((e = Ve(e)), (a = r.call(t, e))), n && n.call(t, e);
  const i = t.delete(e);
  return a && er(t, "delete", e, void 0), i;
}
function ls() {
  const e = Ve(this),
    t = e.size !== 0,
    r = e.clear();
  return t && er(e, "clear", void 0, void 0), r;
}
function ai(e, t) {
  return function (n, a) {
    const i = this,
      l = i.__v_raw,
      o = Ve(l),
      s = t ? il : e ? ul : ya;
    return (
      !e && wt(o, "iterate", Vr), l.forEach((u, d) => n.call(a, s(u), s(d), i))
    );
  };
}
function ii(e, t, r) {
  return function (...n) {
    const a = this.__v_raw,
      i = Ve(a),
      l = ln(i),
      o = e === "entries" || (e === Symbol.iterator && l),
      s = e === "keys" && l,
      u = a[e](...n),
      d = r ? il : t ? ul : ya;
    return (
      !t && wt(i, "iterate", s ? el : Vr),
      {
        next() {
          const { value: c, done: v } = u.next();
          return v
            ? { value: c, done: v }
            : { value: o ? [d(c[0]), d(c[1])] : d(c), done: v };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function sr(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ec() {
  const e = {
      get(i) {
        return ti(this, i);
      },
      get size() {
        return ni(this);
      },
      has: ri,
      add: ns,
      set: as,
      delete: is,
      clear: ls,
      forEach: ai(!1, !1),
    },
    t = {
      get(i) {
        return ti(this, i, !1, !0);
      },
      get size() {
        return ni(this);
      },
      has: ri,
      add: ns,
      set: as,
      delete: is,
      clear: ls,
      forEach: ai(!1, !0),
    },
    r = {
      get(i) {
        return ti(this, i, !0);
      },
      get size() {
        return ni(this, !0);
      },
      has(i) {
        return ri.call(this, i, !0);
      },
      add: sr("add"),
      set: sr("set"),
      delete: sr("delete"),
      clear: sr("clear"),
      forEach: ai(!0, !1),
    },
    n = {
      get(i) {
        return ti(this, i, !0, !0);
      },
      get size() {
        return ni(this, !0);
      },
      has(i) {
        return ri.call(this, i, !0);
      },
      add: sr("add"),
      set: sr("set"),
      delete: sr("delete"),
      clear: sr("clear"),
      forEach: ai(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = ii(i, !1, !1)),
        (r[i] = ii(i, !0, !1)),
        (t[i] = ii(i, !1, !0)),
        (n[i] = ii(i, !0, !0));
    }),
    [e, r, t, n]
  );
}
const [tc, rc, nc, ac] = ec();
function ll(e, t) {
  const r = t ? (e ? ac : nc) : e ? rc : tc;
  return (n, a, i) =>
    a === "__v_isReactive"
      ? !e
      : a === "__v_isReadonly"
      ? e
      : a === "__v_raw"
      ? n
      : Reflect.get(De(r, a) && a in n ? r : n, a, i);
}
const ic = { get: ll(!1, !1) },
  lc = { get: ll(!1, !0) },
  oc = { get: ll(!0, !1) },
  os = new WeakMap(),
  ss = new WeakMap(),
  us = new WeakMap(),
  sc = new WeakMap();
function uc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function dc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : uc(Nv(e));
}
function qe(e) {
  return e && e.__v_isReadonly ? e : ol(e, !1, rs, ic, os);
}
function vc(e) {
  return ol(e, !1, xv, lc, ss);
}
function ds(e) {
  return ol(e, !0, Qv, oc, us);
}
function ol(e, t, r, n, a) {
  if (!Qe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = a.get(e);
  if (i) return i;
  const l = dc(e);
  if (l === 0) return e;
  const o = new Proxy(e, l === 2 ? n : r);
  return a.set(e, o), o;
}
function un(e) {
  return sl(e) ? un(e.__v_raw) : !!(e && e.__v_isReactive);
}
function sl(e) {
  return !!(e && e.__v_isReadonly);
}
function vs(e) {
  return un(e) || sl(e);
}
function Ve(e) {
  const t = e && e.__v_raw;
  return t ? Ve(t) : e;
}
function cs(e) {
  return Ja(e, "__v_skip", !0), e;
}
const ya = (e) => (Qe(e) ? qe(e) : e),
  ul = (e) => (Qe(e) ? ds(e) : e);
function fs(e) {
  Jo() && ((e = Ve(e)), e.dep || (e.dep = Ji()), Qo(e.dep));
}
function hs(e, t) {
  (e = Ve(e)), e.dep && nl(e.dep);
}
function vt(e) {
  return Boolean(e && e.__v_isRef === !0);
}
function D(e) {
  return cc(e, !1);
}
function cc(e, t) {
  return vt(e) ? e : new fc(e, t);
}
class fc {
  constructor(t, r) {
    (this._shallow = r),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = r ? t : Ve(t)),
      (this._value = r ? t : ya(t));
  }
  get value() {
    return fs(this), this._value;
  }
  set value(t) {
    (t = this._shallow ? t : Ve(t)),
      pa(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this._shallow ? t : ya(t)),
        hs(this));
  }
}
function hc(e) {
  return vt(e) ? e.value : e;
}
const pc = {
  get: (e, t, r) => hc(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const a = e[t];
    return vt(a) && !vt(r) ? ((a.value = r), !0) : Reflect.set(e, t, r, n);
  },
};
function ps(e) {
  return un(e) ? e : new Proxy(e, pc);
}
function mc(e) {
  const t = Se(e) ? new Array(e.length) : {};
  for (const r in e) t[r] = yc(e, r);
  return t;
}
class gc {
  constructor(t, r, n) {
    (this._object = t),
      (this._key = r),
      (this._defaultValue = n),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function yc(e, t, r) {
  const n = e[t];
  return vt(n) ? n : new gc(e, t, r);
}
class bc {
  constructor(t, r, n) {
    (this._setter = r),
      (this.dep = void 0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = new tl(t, () => {
        this._dirty || ((this._dirty = !0), hs(this));
      })),
      (this.__v_isReadonly = n);
  }
  get value() {
    const t = Ve(this);
    return (
      fs(t),
      t._dirty && ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function j(e, t) {
  let r, n;
  const a = Me(e);
  return (
    a ? ((r = e), (n = Vt)) : ((r = e.get), (n = e.set)), new bc(r, n, a || !n)
  );
}
Promise.resolve();
function Cc(e, t, ...r) {
  const n = e.vnode.props || Fe;
  let a = r;
  const i = t.startsWith("update:"),
    l = i && t.slice(7);
  if (l && l in n) {
    const d = `${l === "modelValue" ? "model" : l}Modifiers`,
      { number: c, trim: v } = n[d] || Fe;
    v ? (a = r.map((f) => f.trim())) : c && (a = r.map(Qa));
  }
  let o,
    s = n[(o = Zi(t))] || n[(o = Zi(jt(t)))];
  !s && i && (s = n[(o = Zi(Pr(t)))]), s && Et(s, e, 6, a);
  const u = n[o + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    (e.emitted[o] = !0), Et(u, e, 6, a);
  }
}
function ms(e, t, r = !1) {
  const n = t.emitsCache,
    a = n.get(e);
  if (a !== void 0) return a;
  const i = e.emits;
  let l = {},
    o = !1;
  if (!Me(e)) {
    const s = (u) => {
      const d = ms(u, t, !0);
      d && ((o = !0), tt(l, d));
    };
    !r && t.mixins.length && t.mixins.forEach(s),
      e.extends && s(e.extends),
      e.mixins && e.mixins.forEach(s);
  }
  return !i && !o
    ? (n.set(e, null), null)
    : (Se(i) ? i.forEach((s) => (l[s] = null)) : tt(l, i), n.set(e, l), l);
}
function dl(e, t) {
  return !e || !ja(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      De(e, t[0].toLowerCase() + t.slice(1)) || De(e, Pr(t)) || De(e, t));
}
let kt = null,
  li = null;
function oi(e) {
  const t = kt;
  return (kt = e), (li = (e && e.type.__scopeId) || null), t;
}
function vl(e) {
  li = e;
}
function cl() {
  li = null;
}
function Ee(e, t = kt, r) {
  if (!t || e._n) return e;
  const n = (...a) => {
    n._d && Us(-1);
    const i = oi(t),
      l = e(...a);
    return oi(i), n._d && Us(1), l;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function fl(e) {
  const {
    type: t,
    vnode: r,
    proxy: n,
    withProxy: a,
    props: i,
    propsOptions: [l],
    slots: o,
    attrs: s,
    emit: u,
    render: d,
    renderCache: c,
    data: v,
    setupState: f,
    ctx: p,
    inheritAttrs: h,
  } = e;
  let g, m;
  const $ = oi(e);
  try {
    if (r.shapeFlag & 4) {
      const C = a || n;
      (g = qt(d.call(C, C, c, i, f, v, p))), (m = s);
    } else {
      const C = t;
      (g = qt(
        C.length > 1 ? C(i, { attrs: s, slots: o, emit: u }) : C(i, null)
      )),
        (m = t.props ? s : wc(s));
    }
  } catch (C) {
    (Ta.length = 0), Ci(C, e, 1), (g = ee(Nt));
  }
  let S = g;
  if (m && h !== !1) {
    const C = Object.keys(m),
      { shapeFlag: k } = S;
    C.length &&
      k & (1 | 6) &&
      (l && C.some(Ki) && (m = kc(m, l)), (S = dn(S, m)));
  }
  return (
    r.dirs && (S.dirs = S.dirs ? S.dirs.concat(r.dirs) : r.dirs),
    r.transition && (S.transition = r.transition),
    (g = S),
    oi($),
    g
  );
}
const wc = (e) => {
    let t;
    for (const r in e)
      (r === "class" || r === "style" || ja(r)) && ((t || (t = {}))[r] = e[r]);
    return t;
  },
  kc = (e, t) => {
    const r = {};
    for (const n in e) (!Ki(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
    return r;
  };
function Sc(e, t, r) {
  const { props: n, children: a, component: i } = e,
    { props: l, children: o, patchFlag: s } = t,
    u = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (r && s >= 0) {
    if (s & 1024) return !0;
    if (s & 16) return n ? gs(n, l, u) : !!l;
    if (s & 8) {
      const d = t.dynamicProps;
      for (let c = 0; c < d.length; c++) {
        const v = d[c];
        if (l[v] !== n[v] && !dl(u, v)) return !0;
      }
    }
  } else
    return (a || o) && (!o || !o.$stable)
      ? !0
      : n === l
      ? !1
      : n
      ? l
        ? gs(n, l, u)
        : !0
      : !!l;
  return !1;
}
function gs(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let a = 0; a < n.length; a++) {
    const i = n[a];
    if (t[i] !== e[i] && !dl(r, i)) return !0;
  }
  return !1;
}
function Tc({ vnode: e, parent: t }, r) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = r), (t = t.parent);
}
const $c = (e) => e.__isSuspense;
function Ec(e, t) {
  t && t.pendingBranch
    ? Se(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : mf(e);
}
function hl(e, t) {
  if (nt) {
    let r = nt.provides;
    const n = nt.parent && nt.parent.provides;
    n === r && (r = nt.provides = Object.create(n)), (r[e] = t);
  }
}
function ba(e, t, r = !1) {
  const n = nt || kt;
  if (n) {
    const a =
      n.parent == null
        ? n.vnode.appContext && n.vnode.appContext.provides
        : n.parent.provides;
    if (a && e in a) return a[e];
    if (arguments.length > 1) return r && Me(t) ? t.call(n.proxy) : t;
  }
}
function ys() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    rt(() => {
      e.isMounted = !0;
    }),
    ka(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const $t = [Function, Array],
  Mc = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: $t,
      onEnter: $t,
      onAfterEnter: $t,
      onEnterCancelled: $t,
      onBeforeLeave: $t,
      onLeave: $t,
      onAfterLeave: $t,
      onLeaveCancelled: $t,
      onBeforeAppear: $t,
      onAppear: $t,
      onAfterAppear: $t,
      onAppearCancelled: $t,
    },
    setup(e, { slots: t }) {
      const r = Rr(),
        n = ys();
      let a;
      return () => {
        const i = t.default && ml(t.default(), !0);
        if (!i || !i.length) return;
        const l = Ve(e),
          { mode: o } = l,
          s = i[0];
        if (n.isLeaving) return pl(s);
        const u = ws(s);
        if (!u) return pl(s);
        const d = Ca(u, l, n, r);
        wa(u, d);
        const c = r.subTree,
          v = c && ws(c);
        let f = !1;
        const { getTransitionKey: p } = u.type;
        if (p) {
          const h = p();
          a === void 0 ? (a = h) : h !== a && ((a = h), (f = !0));
        }
        if (v && v.type !== Nt && (!zr(u, v) || f)) {
          const h = Ca(v, l, n, r);
          if ((wa(v, h), o === "out-in"))
            return (
              (n.isLeaving = !0),
              (h.afterLeave = () => {
                (n.isLeaving = !1), r.update();
              }),
              pl(s)
            );
          o === "in-out" &&
            u.type !== Nt &&
            (h.delayLeave = (g, m, $) => {
              const S = Cs(n, v);
              (S[String(v.key)] = v),
                (g._leaveCb = () => {
                  m(), (g._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = $);
            });
        }
        return s;
      };
    },
  },
  bs = Mc;
function Cs(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || ((n = Object.create(null)), r.set(t.type, n)), n;
}
function Ca(e, t, r, n) {
  const {
      appear: a,
      mode: i,
      persisted: l = !1,
      onBeforeEnter: o,
      onEnter: s,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: c,
      onLeave: v,
      onAfterLeave: f,
      onLeaveCancelled: p,
      onBeforeAppear: h,
      onAppear: g,
      onAfterAppear: m,
      onAppearCancelled: $,
    } = t,
    S = String(e.key),
    C = Cs(r, e),
    k = (P, I) => {
      P && Et(P, n, 9, I);
    },
    M = {
      mode: i,
      persisted: l,
      beforeEnter(P) {
        let I = o;
        if (!r.isMounted)
          if (a) I = h || o;
          else return;
        P._leaveCb && P._leaveCb(!0);
        const N = C[S];
        N && zr(e, N) && N.el._leaveCb && N.el._leaveCb(), k(I, [P]);
      },
      enter(P) {
        let I = s,
          N = u,
          F = d;
        if (!r.isMounted)
          if (a) (I = g || s), (N = m || u), (F = $ || d);
          else return;
        let w = !1;
        const y = (P._enterCb = (z) => {
          w ||
            ((w = !0),
            z ? k(F, [P]) : k(N, [P]),
            M.delayedLeave && M.delayedLeave(),
            (P._enterCb = void 0));
        });
        I ? (I(P, y), I.length <= 1 && y()) : y();
      },
      leave(P, I) {
        const N = String(e.key);
        if ((P._enterCb && P._enterCb(!0), r.isUnmounting)) return I();
        k(c, [P]);
        let F = !1;
        const w = (P._leaveCb = (y) => {
          F ||
            ((F = !0),
            I(),
            y ? k(p, [P]) : k(f, [P]),
            (P._leaveCb = void 0),
            C[N] === e && delete C[N]);
        });
        (C[N] = e), v ? (v(P, w), v.length <= 1 && w()) : w();
      },
      clone(P) {
        return Ca(P, t, r, n);
      },
    };
  return M;
}
function pl(e) {
  if (si(e)) return (e = dn(e)), (e.children = null), e;
}
function ws(e) {
  return si(e) ? (e.children ? e.children[0] : void 0) : e;
}
function wa(e, t) {
  e.shapeFlag & 6 && e.component
    ? wa(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function ml(e, t = !1) {
  let r = [],
    n = 0;
  for (let a = 0; a < e.length; a++) {
    const i = e[a];
    i.type === Pe
      ? (i.patchFlag & 128 && n++, (r = r.concat(ml(i.children, t))))
      : (t || i.type !== Nt) && r.push(i);
  }
  if (n > 1) for (let a = 0; a < r.length; a++) r[a].patchFlag = -2;
  return r;
}
function ve(e) {
  return Me(e) ? { setup: e, name: e.name } : e;
}
const gl = (e) => !!e.type.__asyncLoader,
  si = (e) => e.type.__isKeepAlive;
function ui(e, t) {
  ks(e, "a", t);
}
function di(e, t) {
  ks(e, "da", t);
}
function ks(e, t, r = nt) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let a = r;
      for (; a; ) {
        if (a.isDeactivated) return;
        a = a.parent;
      }
      return e();
    });
  if ((vi(t, n, r), r)) {
    let a = r.parent;
    for (; a && a.parent; )
      si(a.parent.vnode) && Ic(n, t, r, a), (a = a.parent);
  }
}
function Ic(e, t, r, n) {
  const a = vi(t, e, n, !0);
  Kt(() => {
    qi(n[t], a);
  }, r);
}
function vi(e, t, r = nt, n = !1) {
  if (r) {
    const a = r[e] || (r[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...l) => {
          if (r.isUnmounted) return;
          sn(), vn(r);
          const o = Et(t, r, e, l);
          return Ur(), Nr(), o;
        });
    return n ? a.unshift(i) : a.push(i), i;
  }
}
const tr =
    (e) =>
    (t, r = nt) =>
      (!bi || e === "sp") && vi(e, t, r),
  Ss = tr("bm"),
  rt = tr("m"),
  Pc = tr("bu"),
  yl = tr("u"),
  ka = tr("bum"),
  Kt = tr("um"),
  Oc = tr("sp"),
  _c = tr("rtg"),
  Vc = tr("rtc");
function Nc(e, t = nt) {
  vi("ec", e, t);
}
let bl = !0;
function Ac(e) {
  const t = Es(e),
    r = e.proxy,
    n = e.ctx;
  (bl = !1), t.beforeCreate && Ts(t.beforeCreate, e, "bc");
  const {
    data: a,
    computed: i,
    methods: l,
    watch: o,
    provide: s,
    inject: u,
    created: d,
    beforeMount: c,
    mounted: v,
    beforeUpdate: f,
    updated: p,
    activated: h,
    deactivated: g,
    beforeDestroy: m,
    beforeUnmount: $,
    destroyed: S,
    unmounted: C,
    render: k,
    renderTracked: M,
    renderTriggered: P,
    errorCaptured: I,
    serverPrefetch: N,
    expose: F,
    inheritAttrs: w,
    components: y,
    directives: z,
    filters: te,
  } = t;
  if ((u && Dc(u, n, null, e.appContext.config.unwrapInjectedRef), l))
    for (const X in l) {
      const le = l[X];
      Me(le) && (n[X] = le.bind(r));
    }
  if (a) {
    const X = a.call(r, r);
    Qe(X) && (e.data = qe(X));
  }
  if (((bl = !0), i))
    for (const X in i) {
      const le = i[X],
        x = Me(le) ? le.bind(r, r) : Me(le.get) ? le.get.bind(r, r) : Vt,
        O = !Me(le) && Me(le.set) ? le.set.bind(r) : Vt,
        U = j({ get: x, set: O });
      Object.defineProperty(n, X, {
        enumerable: !0,
        configurable: !0,
        get: () => U.value,
        set: (re) => (U.value = re),
      });
    }
  if (o) for (const X in o) $s(o[X], n, r, X);
  if (s) {
    const X = Me(s) ? s.call(r) : s;
    Reflect.ownKeys(X).forEach((le) => {
      hl(le, X[le]);
    });
  }
  d && Ts(d, e, "c");
  function A(X, le) {
    Se(le) ? le.forEach((x) => X(x.bind(r))) : le && X(le.bind(r));
  }
  if (
    (A(Ss, c),
    A(rt, v),
    A(Pc, f),
    A(yl, p),
    A(ui, h),
    A(di, g),
    A(Nc, I),
    A(Vc, M),
    A(_c, P),
    A(ka, $),
    A(Kt, C),
    A(Oc, N),
    Se(F))
  )
    if (F.length) {
      const X = e.exposed || (e.exposed = {});
      F.forEach((le) => {
        Object.defineProperty(X, le, {
          get: () => r[le],
          set: (x) => (r[le] = x),
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === Vt && (e.render = k),
    w != null && (e.inheritAttrs = w),
    y && (e.components = y),
    z && (e.directives = z);
}
function Dc(e, t, r = Vt, n = !1) {
  Se(e) && (e = Cl(e));
  for (const a in e) {
    const i = e[a];
    let l;
    Qe(i)
      ? "default" in i
        ? (l = ba(i.from || a, i.default, !0))
        : (l = ba(i.from || a))
      : (l = ba(i)),
      vt(l) && n
        ? Object.defineProperty(t, a, {
            enumerable: !0,
            configurable: !0,
            get: () => l.value,
            set: (o) => (l.value = o),
          })
        : (t[a] = l);
  }
}
function Ts(e, t, r) {
  Et(Se(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function $s(e, t, r, n) {
  const a = n.includes(".") ? au(r, n) : () => r[n];
  if (Je(e)) {
    const i = t[e];
    Me(i) && me(a, i);
  } else if (Me(e)) me(a, e.bind(r));
  else if (Qe(e))
    if (Se(e)) e.forEach((i) => $s(i, t, r, n));
    else {
      const i = Me(e.handler) ? e.handler.bind(r) : t[e.handler];
      Me(i) && me(a, i, e);
    }
}
function Es(e) {
  const t = e.type,
    { mixins: r, extends: n } = t,
    {
      mixins: a,
      optionsCache: i,
      config: { optionMergeStrategies: l },
    } = e.appContext,
    o = i.get(t);
  let s;
  return (
    o
      ? (s = o)
      : !a.length && !r && !n
      ? (s = t)
      : ((s = {}), a.length && a.forEach((u) => ci(s, u, l, !0)), ci(s, t, l)),
    i.set(t, s),
    s
  );
}
function ci(e, t, r, n = !1) {
  const { mixins: a, extends: i } = t;
  i && ci(e, i, r, !0), a && a.forEach((l) => ci(e, l, r, !0));
  for (const l in t)
    if (!(n && l === "expose")) {
      const o = Bc[l] || (r && r[l]);
      e[l] = o ? o(e[l], t[l]) : t[l];
    }
  return e;
}
const Bc = {
  data: Ms,
  props: Ar,
  emits: Ar,
  methods: Ar,
  computed: Ar,
  beforeCreate: ft,
  created: ft,
  beforeMount: ft,
  mounted: ft,
  beforeUpdate: ft,
  updated: ft,
  beforeDestroy: ft,
  beforeUnmount: ft,
  destroyed: ft,
  unmounted: ft,
  activated: ft,
  deactivated: ft,
  errorCaptured: ft,
  serverPrefetch: ft,
  components: Ar,
  directives: Ar,
  watch: Lc,
  provide: Ms,
  inject: Fc,
};
function Ms(e, t) {
  return t
    ? e
      ? function () {
          return tt(
            Me(e) ? e.call(this, this) : e,
            Me(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Fc(e, t) {
  return Ar(Cl(e), Cl(t));
}
function Cl(e) {
  if (Se(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ft(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ar(e, t) {
  return e ? tt(tt(Object.create(null), e), t) : t;
}
function Lc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = tt(Object.create(null), e);
  for (const n in t) r[n] = ft(e[n], t[n]);
  return r;
}
function zc(e, t, r, n = !1) {
  const a = {},
    i = {};
  Ja(i, mi, 1), (e.propsDefaults = Object.create(null)), Is(e, t, a, i);
  for (const l in e.propsOptions[0]) l in a || (a[l] = void 0);
  r ? (e.props = n ? a : vc(a)) : e.type.props ? (e.props = a) : (e.props = i),
    (e.attrs = i);
}
function Rc(e, t, r, n) {
  const {
      props: a,
      attrs: i,
      vnode: { patchFlag: l },
    } = e,
    o = Ve(a),
    [s] = e.propsOptions;
  let u = !1;
  if ((n || l > 0) && !(l & 16)) {
    if (l & 8) {
      const d = e.vnode.dynamicProps;
      for (let c = 0; c < d.length; c++) {
        let v = d[c];
        const f = t[v];
        if (s)
          if (De(i, v)) f !== i[v] && ((i[v] = f), (u = !0));
          else {
            const p = jt(v);
            a[p] = wl(s, o, p, f, e, !1);
          }
        else f !== i[v] && ((i[v] = f), (u = !0));
      }
    }
  } else {
    Is(e, t, a, i) && (u = !0);
    let d;
    for (const c in o)
      (!t || (!De(t, c) && ((d = Pr(c)) === c || !De(t, d)))) &&
        (s
          ? r &&
            (r[c] !== void 0 || r[d] !== void 0) &&
            (a[c] = wl(s, o, c, void 0, e, !0))
          : delete a[c]);
    if (i !== o)
      for (const c in i) (!t || !De(t, c)) && (delete i[c], (u = !0));
  }
  u && er(e, "set", "$attrs");
}
function Is(e, t, r, n) {
  const [a, i] = e.propsOptions;
  let l = !1,
    o;
  if (t)
    for (let s in t) {
      if (qa(s)) continue;
      const u = t[s];
      let d;
      a && De(a, (d = jt(s)))
        ? !i || !i.includes(d)
          ? (r[d] = u)
          : ((o || (o = {}))[d] = u)
        : dl(e.emitsOptions, s) ||
          ((!(s in n) || u !== n[s]) && ((n[s] = u), (l = !0)));
    }
  if (i) {
    const s = Ve(r),
      u = o || Fe;
    for (let d = 0; d < i.length; d++) {
      const c = i[d];
      r[c] = wl(a, s, c, u[c], e, !De(u, c));
    }
  }
  return l;
}
function wl(e, t, r, n, a, i) {
  const l = e[r];
  if (l != null) {
    const o = De(l, "default");
    if (o && n === void 0) {
      const s = l.default;
      if (l.type !== Function && Me(s)) {
        const { propsDefaults: u } = a;
        r in u ? (n = u[r]) : (vn(a), (n = u[r] = s.call(null, t)), Ur());
      } else n = s;
    }
    l[0] &&
      (i && !o ? (n = !1) : l[1] && (n === "" || n === Pr(r)) && (n = !0));
  }
  return n;
}
function Ps(e, t, r = !1) {
  const n = t.propsCache,
    a = n.get(e);
  if (a) return a;
  const i = e.props,
    l = {},
    o = [];
  let s = !1;
  if (!Me(e)) {
    const d = (c) => {
      s = !0;
      const [v, f] = Ps(c, t, !0);
      tt(l, v), f && o.push(...f);
    };
    !r && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!i && !s) return n.set(e, an), an;
  if (Se(i))
    for (let d = 0; d < i.length; d++) {
      const c = jt(i[d]);
      Os(c) && (l[c] = Fe);
    }
  else if (i)
    for (const d in i) {
      const c = jt(d);
      if (Os(c)) {
        const v = i[d],
          f = (l[c] = Se(v) || Me(v) ? { type: v } : v);
        if (f) {
          const p = Ns(Boolean, f.type),
            h = Ns(String, f.type);
          (f[0] = p > -1),
            (f[1] = h < 0 || p < h),
            (p > -1 || De(f, "default")) && o.push(c);
        }
      }
    }
  const u = [l, o];
  return n.set(e, u), u;
}
function Os(e) {
  return e[0] !== "$";
}
function _s(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Vs(e, t) {
  return _s(e) === _s(t);
}
function Ns(e, t) {
  return Se(t) ? t.findIndex((r) => Vs(r, e)) : Me(t) && Vs(t, e) ? 0 : -1;
}
const As = (e) => e[0] === "_" || e === "$stable",
  kl = (e) => (Se(e) ? e.map(qt) : [qt(e)]),
  Uc = (e, t, r) => {
    const n = Ee((...a) => kl(t(...a)), r);
    return (n._c = !1), n;
  },
  Ds = (e, t, r) => {
    const n = e._ctx;
    for (const a in e) {
      if (As(a)) continue;
      const i = e[a];
      if (Me(i)) t[a] = Uc(a, i, n);
      else if (i != null) {
        const l = kl(i);
        t[a] = () => l;
      }
    }
  },
  Bs = (e, t) => {
    const r = kl(t);
    e.slots.default = () => r;
  },
  Yc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? ((e.slots = Ve(t)), Ja(t, "_", r)) : Ds(t, (e.slots = {}));
    } else (e.slots = {}), t && Bs(e, t);
    Ja(e.slots, mi, 1);
  },
  Hc = (e, t, r) => {
    const { vnode: n, slots: a } = e;
    let i = !0,
      l = Fe;
    if (n.shapeFlag & 32) {
      const o = t._;
      o
        ? r && o === 1
          ? (i = !1)
          : (tt(a, t), !r && o === 1 && delete a._)
        : ((i = !t.$stable), Ds(t, a)),
        (l = t);
    } else t && (Bs(e, t), (l = { default: 1 }));
    if (i) for (const o in a) !As(o) && !(o in l) && delete a[o];
  };
function Re(e, t) {
  const r = kt;
  if (r === null) return e;
  const n = r.proxy,
    a = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [l, o, s, u = Fe] = t[i];
    Me(l) && (l = { mounted: l, updated: l }),
      l.deep && Yr(o),
      a.push({
        dir: l,
        instance: n,
        value: o,
        oldValue: void 0,
        arg: s,
        modifiers: u,
      });
  }
  return e;
}
function Dr(e, t, r, n) {
  const a = e.dirs,
    i = t && t.dirs;
  for (let l = 0; l < a.length; l++) {
    const o = a[l];
    i && (o.oldValue = i[l].value);
    let s = o.dir[n];
    s && (sn(), Et(s, r, 8, [e.el, o, e, t]), Nr());
  }
}
function Fs() {
  return {
    app: null,
    config: {
      isNativeTag: Ov,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Wc = 0;
function jc(e, t) {
  return function (n, a = null) {
    a != null && !Qe(a) && (a = null);
    const i = Fs(),
      l = new Set();
    let o = !1;
    const s = (i.app = {
      _uid: Wc++,
      _component: n,
      _props: a,
      _container: null,
      _context: i,
      _instance: null,
      version: yf,
      get config() {
        return i.config;
      },
      set config(u) {},
      use(u, ...d) {
        return (
          l.has(u) ||
            (u && Me(u.install)
              ? (l.add(u), u.install(s, ...d))
              : Me(u) && (l.add(u), u(s, ...d))),
          s
        );
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), s;
      },
      component(u, d) {
        return d ? ((i.components[u] = d), s) : i.components[u];
      },
      directive(u, d) {
        return d ? ((i.directives[u] = d), s) : i.directives[u];
      },
      mount(u, d, c) {
        if (!o) {
          const v = ee(n, a);
          return (
            (v.appContext = i),
            d && t ? t(v, u) : e(v, u, c),
            (o = !0),
            (s._container = u),
            (u.__vue_app__ = s),
            Nl(v.component) || v.component.proxy
          );
        }
      },
      unmount() {
        o && (e(null, s._container), delete s._container.__vue_app__);
      },
      provide(u, d) {
        return (i.provides[u] = d), s;
      },
    });
    return s;
  };
}
function Sl(e, t, r, n, a = !1) {
  if (Se(e)) {
    e.forEach((v, f) => Sl(v, t && (Se(t) ? t[f] : t), r, n, a));
    return;
  }
  if (gl(n) && !a) return;
  const i = n.shapeFlag & 4 ? Nl(n.component) || n.component.proxy : n.el,
    l = a ? null : i,
    { i: o, r: s } = e,
    u = t && t.r,
    d = o.refs === Fe ? (o.refs = {}) : o.refs,
    c = o.setupState;
  if (
    (u != null &&
      u !== s &&
      (Je(u)
        ? ((d[u] = null), De(c, u) && (c[u] = null))
        : vt(u) && (u.value = null)),
    Me(s))
  )
    dr(s, o, 12, [l, d]);
  else {
    const v = Je(s),
      f = vt(s);
    if (v || f) {
      const p = () => {
        if (e.f) {
          const h = v ? d[s] : s.value;
          a
            ? Se(h) && qi(h, i)
            : Se(h)
            ? h.includes(i) || h.push(i)
            : v
            ? (d[s] = [i])
            : ((s.value = [i]), e.k && (d[e.k] = s.value));
        } else
          v
            ? ((d[s] = l), De(c, s) && (c[s] = l))
            : vt(s) && ((s.value = l), e.k && (d[e.k] = l));
      };
      l ? ((p.id = -1), mt(p, r)) : p();
    }
  }
}
const mt = Ec;
function Kc(e) {
  return qc(e);
}
function qc(e, t) {
  const r = Bv();
  r.__VUE__ = !0;
  const {
      insert: n,
      remove: a,
      patchProp: i,
      createElement: l,
      createText: o,
      createComment: s,
      setText: u,
      setElementText: d,
      parentNode: c,
      nextSibling: v,
      setScopeId: f = Vt,
      cloneNode: p,
      insertStaticContent: h,
    } = e,
    g = (
      b,
      E,
      L,
      W = null,
      K = null,
      ne = null,
      oe = !1,
      Q = null,
      ae = !!E.dynamicChildren
    ) => {
      if (b === E) return;
      b && !zr(b, E) && ((W = ke(b)), pe(b, K, ne, !0), (b = null)),
        E.patchFlag === -2 && ((ae = !1), (E.dynamicChildren = null));
      const { type: G, ref: be, shapeFlag: he } = E;
      switch (G) {
        case Pl:
          m(b, E, L, W);
          break;
        case Nt:
          $(b, E, L, W);
          break;
        case Ol:
          b == null && S(E, L, W, oe);
          break;
        case Pe:
          z(b, E, L, W, K, ne, oe, Q, ae);
          break;
        default:
          he & 1
            ? M(b, E, L, W, K, ne, oe, Q, ae)
            : he & 6
            ? te(b, E, L, W, K, ne, oe, Q, ae)
            : (he & 64 || he & 128) &&
              G.process(b, E, L, W, K, ne, oe, Q, ae, _e);
      }
      be != null && K && Sl(be, b && b.ref, ne, E || b, !E);
    },
    m = (b, E, L, W) => {
      if (b == null) n((E.el = o(E.children)), L, W);
      else {
        const K = (E.el = b.el);
        E.children !== b.children && u(K, E.children);
      }
    },
    $ = (b, E, L, W) => {
      b == null ? n((E.el = s(E.children || "")), L, W) : (E.el = b.el);
    },
    S = (b, E, L, W) => {
      [b.el, b.anchor] = h(b.children, E, L, W);
    },
    C = ({ el: b, anchor: E }, L, W) => {
      let K;
      for (; b && b !== E; ) (K = v(b)), n(b, L, W), (b = K);
      n(E, L, W);
    },
    k = ({ el: b, anchor: E }) => {
      let L;
      for (; b && b !== E; ) (L = v(b)), a(b), (b = L);
      a(E);
    },
    M = (b, E, L, W, K, ne, oe, Q, ae) => {
      (oe = oe || E.type === "svg"),
        b == null ? P(E, L, W, K, ne, oe, Q, ae) : F(b, E, K, ne, oe, Q, ae);
    },
    P = (b, E, L, W, K, ne, oe, Q) => {
      let ae, G;
      const {
        type: be,
        props: he,
        shapeFlag: Ce,
        transition: $e,
        patchFlag: Ae,
        dirs: je,
      } = b;
      if (b.el && p !== void 0 && Ae === -1) ae = b.el = p(b.el);
      else {
        if (
          ((ae = b.el = l(b.type, ne, he && he.is, he)),
          Ce & 8
            ? d(ae, b.children)
            : Ce & 16 &&
              N(
                b.children,
                ae,
                null,
                W,
                K,
                ne && be !== "foreignObject",
                oe,
                Q
              ),
          je && Dr(b, null, W, "created"),
          he)
        ) {
          for (const Ue in he)
            Ue !== "value" &&
              !qa(Ue) &&
              i(ae, Ue, null, he[Ue], ne, b.children, W, K, ue);
          "value" in he && i(ae, "value", null, he.value),
            (G = he.onVnodeBeforeMount) && Xt(G, W, b);
        }
        I(ae, b, b.scopeId, oe, W);
      }
      je && Dr(b, null, W, "beforeMount");
      const Be = (!K || (K && !K.pendingBranch)) && $e && !$e.persisted;
      Be && $e.beforeEnter(ae),
        n(ae, E, L),
        ((G = he && he.onVnodeMounted) || Be || je) &&
          mt(() => {
            G && Xt(G, W, b),
              Be && $e.enter(ae),
              je && Dr(b, null, W, "mounted");
          }, K);
    },
    I = (b, E, L, W, K) => {
      if ((L && f(b, L), W)) for (let ne = 0; ne < W.length; ne++) f(b, W[ne]);
      if (K) {
        let ne = K.subTree;
        if (E === ne) {
          const oe = K.vnode;
          I(b, oe, oe.scopeId, oe.slotScopeIds, K.parent);
        }
      }
    },
    N = (b, E, L, W, K, ne, oe, Q, ae = 0) => {
      for (let G = ae; G < b.length; G++) {
        const be = (b[G] = Q ? ur(b[G]) : qt(b[G]));
        g(null, be, E, L, W, K, ne, oe, Q);
      }
    },
    F = (b, E, L, W, K, ne, oe) => {
      const Q = (E.el = b.el);
      let { patchFlag: ae, dynamicChildren: G, dirs: be } = E;
      ae |= b.patchFlag & 16;
      const he = b.props || Fe,
        Ce = E.props || Fe;
      let $e;
      L && Br(L, !1),
        ($e = Ce.onVnodeBeforeUpdate) && Xt($e, L, E, b),
        be && Dr(E, b, L, "beforeUpdate"),
        L && Br(L, !0);
      const Ae = K && E.type !== "foreignObject";
      if (
        (G
          ? w(b.dynamicChildren, G, Q, L, W, Ae, ne)
          : oe || x(b, E, Q, null, L, W, Ae, ne, !1),
        ae > 0)
      ) {
        if (ae & 16) y(Q, E, he, Ce, L, W, K);
        else if (
          (ae & 2 && he.class !== Ce.class && i(Q, "class", null, Ce.class, K),
          ae & 4 && i(Q, "style", he.style, Ce.style, K),
          ae & 8)
        ) {
          const je = E.dynamicProps;
          for (let Be = 0; Be < je.length; Be++) {
            const Ue = je[Be],
              _t = he[Ue],
              nn = Ce[Ue];
            (nn !== _t || Ue === "value") &&
              i(Q, Ue, _t, nn, K, b.children, L, W, ue);
          }
        }
        ae & 1 && b.children !== E.children && d(Q, E.children);
      } else !oe && G == null && y(Q, E, he, Ce, L, W, K);
      (($e = Ce.onVnodeUpdated) || be) &&
        mt(() => {
          $e && Xt($e, L, E, b), be && Dr(E, b, L, "updated");
        }, W);
    },
    w = (b, E, L, W, K, ne, oe) => {
      for (let Q = 0; Q < E.length; Q++) {
        const ae = b[Q],
          G = E[Q],
          be =
            ae.el && (ae.type === Pe || !zr(ae, G) || ae.shapeFlag & (6 | 64))
              ? c(ae.el)
              : L;
        g(ae, G, be, null, W, K, ne, oe, !0);
      }
    },
    y = (b, E, L, W, K, ne, oe) => {
      if (L !== W) {
        for (const Q in W) {
          if (qa(Q)) continue;
          const ae = W[Q],
            G = L[Q];
          ae !== G &&
            Q !== "value" &&
            i(b, Q, G, ae, oe, E.children, K, ne, ue);
        }
        if (L !== Fe)
          for (const Q in L)
            !qa(Q) &&
              !(Q in W) &&
              i(b, Q, L[Q], null, oe, E.children, K, ne, ue);
        "value" in W && i(b, "value", L.value, W.value);
      }
    },
    z = (b, E, L, W, K, ne, oe, Q, ae) => {
      const G = (E.el = b ? b.el : o("")),
        be = (E.anchor = b ? b.anchor : o(""));
      let { patchFlag: he, dynamicChildren: Ce, slotScopeIds: $e } = E;
      $e && (Q = Q ? Q.concat($e) : $e),
        b == null
          ? (n(G, L, W), n(be, L, W), N(E.children, L, be, K, ne, oe, Q, ae))
          : he > 0 && he & 64 && Ce && b.dynamicChildren
          ? (w(b.dynamicChildren, Ce, L, K, ne, oe, Q),
            (E.key != null || (K && E === K.subTree)) && Tl(b, E, !0))
          : x(b, E, L, be, K, ne, oe, Q, ae);
    },
    te = (b, E, L, W, K, ne, oe, Q, ae) => {
      (E.slotScopeIds = Q),
        b == null
          ? E.shapeFlag & 512
            ? K.ctx.activate(E, L, W, oe, ae)
            : V(E, L, W, K, ne, oe, ae)
          : A(b, E, ae);
    },
    V = (b, E, L, W, K, ne, oe) => {
      const Q = (b.component = af(b, W, K));
      if ((si(b) && (Q.ctx.renderer = _e), lf(Q), Q.asyncDep)) {
        if ((K && K.registerDep(Q, X), !b.el)) {
          const ae = (Q.subTree = ee(Nt));
          $(null, ae, E, L);
        }
        return;
      }
      X(Q, b, E, L, K, ne, oe);
    },
    A = (b, E, L) => {
      const W = (E.component = b.component);
      if (Sc(b, E, L))
        if (W.asyncDep && !W.asyncResolved) {
          le(W, E, L);
          return;
        } else (W.next = E), hf(W.update), W.update();
      else (E.component = b.component), (E.el = b.el), (W.vnode = E);
    },
    X = (b, E, L, W, K, ne, oe) => {
      const Q = () => {
          if (b.isMounted) {
            let { next: be, bu: he, u: Ce, parent: $e, vnode: Ae } = b,
              je = be,
              Be;
            Br(b, !1),
              be ? ((be.el = Ae.el), le(b, be, oe)) : (be = Ae),
              he && Za(he),
              (Be = be.props && be.props.onVnodeBeforeUpdate) &&
                Xt(Be, $e, be, Ae),
              Br(b, !0);
            const Ue = fl(b),
              _t = b.subTree;
            (b.subTree = Ue),
              g(_t, Ue, c(_t.el), ke(_t), b, K, ne),
              (be.el = Ue.el),
              je === null && Tc(b, Ue.el),
              Ce && mt(Ce, K),
              (Be = be.props && be.props.onVnodeUpdated) &&
                mt(() => Xt(Be, $e, be, Ae), K);
          } else {
            let be;
            const { el: he, props: Ce } = E,
              { bm: $e, m: Ae, parent: je } = b,
              Be = gl(E);
            if (
              (Br(b, !1),
              $e && Za($e),
              !Be && (be = Ce && Ce.onVnodeBeforeMount) && Xt(be, je, E),
              Br(b, !0),
              he && Ke)
            ) {
              const Ue = () => {
                (b.subTree = fl(b)), Ke(he, b.subTree, b, K, null);
              };
              Be
                ? E.type.__asyncLoader().then(() => !b.isUnmounted && Ue())
                : Ue();
            } else {
              const Ue = (b.subTree = fl(b));
              g(null, Ue, L, W, b, K, ne), (E.el = Ue.el);
            }
            if ((Ae && mt(Ae, K), !Be && (be = Ce && Ce.onVnodeMounted))) {
              const Ue = E;
              mt(() => Xt(be, je, Ue), K);
            }
            E.shapeFlag & 256 && b.a && mt(b.a, K),
              (b.isMounted = !0),
              (E = L = W = null);
          }
        },
        ae = (b.effect = new tl(Q, () => Js(b.update), b.scope)),
        G = (b.update = ae.run.bind(ae));
      (G.id = b.uid), Br(b, !0), G();
    },
    le = (b, E, L) => {
      E.component = b;
      const W = b.vnode.props;
      (b.vnode = E),
        (b.next = null),
        Rc(b, E.props, W, L),
        Hc(b, E.children, L),
        sn(),
        Fl(void 0, b.update),
        Nr();
    },
    x = (b, E, L, W, K, ne, oe, Q, ae = !1) => {
      const G = b && b.children,
        be = b ? b.shapeFlag : 0,
        he = E.children,
        { patchFlag: Ce, shapeFlag: $e } = E;
      if (Ce > 0) {
        if (Ce & 128) {
          U(G, he, L, W, K, ne, oe, Q, ae);
          return;
        } else if (Ce & 256) {
          O(G, he, L, W, K, ne, oe, Q, ae);
          return;
        }
      }
      $e & 8
        ? (be & 16 && ue(G, K, ne), he !== G && d(L, he))
        : be & 16
        ? $e & 16
          ? U(G, he, L, W, K, ne, oe, Q, ae)
          : ue(G, K, ne, !0)
        : (be & 8 && d(L, ""), $e & 16 && N(he, L, W, K, ne, oe, Q, ae));
    },
    O = (b, E, L, W, K, ne, oe, Q, ae) => {
      (b = b || an), (E = E || an);
      const G = b.length,
        be = E.length,
        he = Math.min(G, be);
      let Ce;
      for (Ce = 0; Ce < he; Ce++) {
        const $e = (E[Ce] = ae ? ur(E[Ce]) : qt(E[Ce]));
        g(b[Ce], $e, L, null, K, ne, oe, Q, ae);
      }
      G > be ? ue(b, K, ne, !0, !1, he) : N(E, L, W, K, ne, oe, Q, ae, he);
    },
    U = (b, E, L, W, K, ne, oe, Q, ae) => {
      let G = 0;
      const be = E.length;
      let he = b.length - 1,
        Ce = be - 1;
      for (; G <= he && G <= Ce; ) {
        const $e = b[G],
          Ae = (E[G] = ae ? ur(E[G]) : qt(E[G]));
        if (zr($e, Ae)) g($e, Ae, L, null, K, ne, oe, Q, ae);
        else break;
        G++;
      }
      for (; G <= he && G <= Ce; ) {
        const $e = b[he],
          Ae = (E[Ce] = ae ? ur(E[Ce]) : qt(E[Ce]));
        if (zr($e, Ae)) g($e, Ae, L, null, K, ne, oe, Q, ae);
        else break;
        he--, Ce--;
      }
      if (G > he) {
        if (G <= Ce) {
          const $e = Ce + 1,
            Ae = $e < be ? E[$e].el : W;
          for (; G <= Ce; )
            g(null, (E[G] = ae ? ur(E[G]) : qt(E[G])), L, Ae, K, ne, oe, Q, ae),
              G++;
        }
      } else if (G > Ce) for (; G <= he; ) pe(b[G], K, ne, !0), G++;
      else {
        const $e = G,
          Ae = G,
          je = new Map();
        for (G = Ae; G <= Ce; G++) {
          const Ct = (E[G] = ae ? ur(E[G]) : qt(E[G]));
          Ct.key != null && je.set(Ct.key, G);
        }
        let Be,
          Ue = 0;
        const _t = Ce - Ae + 1;
        let nn = !1,
          Fo = 0;
        const ha = new Array(_t);
        for (G = 0; G < _t; G++) ha[G] = 0;
        for (G = $e; G <= he; G++) {
          const Ct = b[G];
          if (Ue >= _t) {
            pe(Ct, K, ne, !0);
            continue;
          }
          let Wt;
          if (Ct.key != null) Wt = je.get(Ct.key);
          else
            for (Be = Ae; Be <= Ce; Be++)
              if (ha[Be - Ae] === 0 && zr(Ct, E[Be])) {
                Wt = Be;
                break;
              }
          Wt === void 0
            ? pe(Ct, K, ne, !0)
            : ((ha[Wt - Ae] = G + 1),
              Wt >= Fo ? (Fo = Wt) : (nn = !0),
              g(Ct, E[Wt], L, null, K, ne, oe, Q, ae),
              Ue++);
        }
        const Lo = nn ? Xc(ha) : an;
        for (Be = Lo.length - 1, G = _t - 1; G >= 0; G--) {
          const Ct = Ae + G,
            Wt = E[Ct],
            zo = Ct + 1 < be ? E[Ct + 1].el : W;
          ha[G] === 0
            ? g(null, Wt, L, zo, K, ne, oe, Q, ae)
            : nn && (Be < 0 || G !== Lo[Be] ? re(Wt, L, zo, 2) : Be--);
        }
      }
    },
    re = (b, E, L, W, K = null) => {
      const { el: ne, type: oe, transition: Q, children: ae, shapeFlag: G } = b;
      if (G & 6) {
        re(b.component.subTree, E, L, W);
        return;
      }
      if (G & 128) {
        b.suspense.move(E, L, W);
        return;
      }
      if (G & 64) {
        oe.move(b, E, L, _e);
        return;
      }
      if (oe === Pe) {
        n(ne, E, L);
        for (let he = 0; he < ae.length; he++) re(ae[he], E, L, W);
        n(b.anchor, E, L);
        return;
      }
      if (oe === Ol) {
        C(b, E, L);
        return;
      }
      if (W !== 2 && G & 1 && Q)
        if (W === 0) Q.beforeEnter(ne), n(ne, E, L), mt(() => Q.enter(ne), K);
        else {
          const { leave: he, delayLeave: Ce, afterLeave: $e } = Q,
            Ae = () => n(ne, E, L),
            je = () => {
              he(ne, () => {
                Ae(), $e && $e();
              });
            };
          Ce ? Ce(ne, Ae, je) : je();
        }
      else n(ne, E, L);
    },
    pe = (b, E, L, W = !1, K = !1) => {
      const {
        type: ne,
        props: oe,
        ref: Q,
        children: ae,
        dynamicChildren: G,
        shapeFlag: be,
        patchFlag: he,
        dirs: Ce,
      } = b;
      if ((Q != null && Sl(Q, null, L, b, !0), be & 256)) {
        E.ctx.deactivate(b);
        return;
      }
      const $e = be & 1 && Ce,
        Ae = !gl(b);
      let je;
      if ((Ae && (je = oe && oe.onVnodeBeforeUnmount) && Xt(je, E, b), be & 6))
        ge(b.component, L, W);
      else {
        if (be & 128) {
          b.suspense.unmount(L, W);
          return;
        }
        $e && Dr(b, null, E, "beforeUnmount"),
          be & 64
            ? b.type.remove(b, E, L, K, _e, W)
            : G && (ne !== Pe || (he > 0 && he & 64))
            ? ue(G, E, L, !1, !0)
            : ((ne === Pe && he & (128 | 256)) || (!K && be & 16)) &&
              ue(ae, E, L),
          W && ce(b);
      }
      ((Ae && (je = oe && oe.onVnodeUnmounted)) || $e) &&
        mt(() => {
          je && Xt(je, E, b), $e && Dr(b, null, E, "unmounted");
        }, L);
    },
    ce = (b) => {
      const { type: E, el: L, anchor: W, transition: K } = b;
      if (E === Pe) {
        q(L, W);
        return;
      }
      if (E === Ol) {
        k(b);
        return;
      }
      const ne = () => {
        a(L), K && !K.persisted && K.afterLeave && K.afterLeave();
      };
      if (b.shapeFlag & 1 && K && !K.persisted) {
        const { leave: oe, delayLeave: Q } = K,
          ae = () => oe(L, ne);
        Q ? Q(b.el, ne, ae) : ae();
      } else ne();
    },
    q = (b, E) => {
      let L;
      for (; b !== E; ) (L = v(b)), a(b), (b = L);
      a(E);
    },
    ge = (b, E, L) => {
      const { bum: W, scope: K, update: ne, subTree: oe, um: Q } = b;
      W && Za(W),
        K.stop(),
        ne && ((ne.active = !1), pe(oe, b, E, L)),
        Q && mt(Q, E),
        mt(() => {
          b.isUnmounted = !0;
        }, E),
        E &&
          E.pendingBranch &&
          !E.isUnmounted &&
          b.asyncDep &&
          !b.asyncResolved &&
          b.suspenseId === E.pendingId &&
          (E.deps--, E.deps === 0 && E.resolve());
    },
    ue = (b, E, L, W = !1, K = !1, ne = 0) => {
      for (let oe = ne; oe < b.length; oe++) pe(b[oe], E, L, W, K);
    },
    ke = (b) =>
      b.shapeFlag & 6
        ? ke(b.component.subTree)
        : b.shapeFlag & 128
        ? b.suspense.next()
        : v(b.anchor || b.el),
    Ne = (b, E, L) => {
      b == null
        ? E._vnode && pe(E._vnode, null, null, !0)
        : g(E._vnode || null, b, E, null, null, null, L),
        eu(),
        (E._vnode = b);
    },
    _e = {
      p: g,
      um: pe,
      m: re,
      r: ce,
      mt: V,
      mc: N,
      pc: x,
      pbc: w,
      n: ke,
      o: e,
    };
  let it, Ke;
  return (
    t && ([it, Ke] = t(_e)), { render: Ne, hydrate: it, createApp: jc(Ne, it) }
  );
}
function Br({ effect: e, update: t }, r) {
  e.allowRecurse = t.allowRecurse = r;
}
function Tl(e, t, r = !1) {
  const n = e.children,
    a = t.children;
  if (Se(n) && Se(a))
    for (let i = 0; i < n.length; i++) {
      const l = n[i];
      let o = a[i];
      o.shapeFlag & 1 &&
        !o.dynamicChildren &&
        ((o.patchFlag <= 0 || o.patchFlag === 32) &&
          ((o = a[i] = ur(a[i])), (o.el = l.el)),
        r || Tl(l, o));
    }
}
function Xc(e) {
  const t = e.slice(),
    r = [0];
  let n, a, i, l, o;
  const s = e.length;
  for (n = 0; n < s; n++) {
    const u = e[n];
    if (u !== 0) {
      if (((a = r[r.length - 1]), e[a] < u)) {
        (t[n] = a), r.push(n);
        continue;
      }
      for (i = 0, l = r.length - 1; i < l; )
        (o = (i + l) >> 1), e[r[o]] < u ? (i = o + 1) : (l = o);
      u < e[r[i]] && (i > 0 && (t[n] = r[i - 1]), (r[i] = n));
    }
  }
  for (i = r.length, l = r[i - 1]; i-- > 0; ) (r[i] = l), (l = t[l]);
  return r;
}
const Gc = (e) => e.__isTeleport,
  Sa = (e) => e && (e.disabled || e.disabled === ""),
  Ls = (e) => typeof SVGElement != "undefined" && e instanceof SVGElement,
  $l = (e, t) => {
    const r = e && e.to;
    return Je(r) ? (t ? t(r) : null) : r;
  },
  Zc = {
    __isTeleport: !0,
    process(e, t, r, n, a, i, l, o, s, u) {
      const {
          mc: d,
          pc: c,
          pbc: v,
          o: { insert: f, querySelector: p, createText: h, createComment: g },
        } = u,
        m = Sa(t.props);
      let { shapeFlag: $, children: S, dynamicChildren: C } = t;
      if (e == null) {
        const k = (t.el = h("")),
          M = (t.anchor = h(""));
        f(k, r, n), f(M, r, n);
        const P = (t.target = $l(t.props, p)),
          I = (t.targetAnchor = h(""));
        P && (f(I, P), (l = l || Ls(P)));
        const N = (F, w) => {
          $ & 16 && d(S, F, w, a, i, l, o, s);
        };
        m ? N(r, M) : P && N(P, I);
      } else {
        t.el = e.el;
        const k = (t.anchor = e.anchor),
          M = (t.target = e.target),
          P = (t.targetAnchor = e.targetAnchor),
          I = Sa(e.props),
          N = I ? r : M,
          F = I ? k : P;
        if (
          ((l = l || Ls(M)),
          C
            ? (v(e.dynamicChildren, C, N, a, i, l, o), Tl(e, t, !0))
            : s || c(e, t, N, F, a, i, l, o, !1),
          m)
        )
          I || fi(t, r, k, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const w = (t.target = $l(t.props, p));
          w && fi(t, w, null, u, 0);
        } else I && fi(t, M, P, u, 1);
      }
    },
    remove(e, t, r, n, { um: a, o: { remove: i } }, l) {
      const {
        shapeFlag: o,
        children: s,
        anchor: u,
        targetAnchor: d,
        target: c,
        props: v,
      } = e;
      if ((c && i(d), (l || !Sa(v)) && (i(u), o & 16)))
        for (let f = 0; f < s.length; f++) {
          const p = s[f];
          a(p, t, r, !0, !!p.dynamicChildren);
        }
    },
    move: fi,
    hydrate: Jc,
  };
function fi(e, t, r, { o: { insert: n }, m: a }, i = 2) {
  i === 0 && n(e.targetAnchor, t, r);
  const { el: l, anchor: o, shapeFlag: s, children: u, props: d } = e,
    c = i === 2;
  if ((c && n(l, t, r), (!c || Sa(d)) && s & 16))
    for (let v = 0; v < u.length; v++) a(u[v], t, r, 2);
  c && n(o, t, r);
}
function Jc(
  e,
  t,
  r,
  n,
  a,
  i,
  { o: { nextSibling: l, parentNode: o, querySelector: s } },
  u
) {
  const d = (t.target = $l(t.props, s));
  if (d) {
    const c = d._lpa || d.firstChild;
    t.shapeFlag & 16 &&
      (Sa(t.props)
        ? ((t.anchor = u(l(e), t, o(e), r, n, a, i)), (t.targetAnchor = c))
        : ((t.anchor = l(e)), (t.targetAnchor = u(c, t, d, r, n, a, i))),
      (d._lpa = t.targetAnchor && l(t.targetAnchor)));
  }
  return t.anchor && l(t.anchor);
}
const El = Zc,
  Ml = "components",
  Qc = "directives";
function fe(e, t) {
  return Il(Ml, e, !0, t) || e;
}
const zs = Symbol();
function hi(e) {
  return Je(e) ? Il(Ml, e, !1) || e : e || zs;
}
function ht(e) {
  return Il(Qc, e);
}
function Il(e, t, r = !0, n = !1) {
  const a = kt || nt;
  if (a) {
    const i = a.type;
    if (e === Ml) {
      const o = df(i);
      if (o && (o === t || o === jt(t) || o === Ga(jt(t)))) return i;
    }
    const l = Rs(a[e] || i[e], t) || Rs(a.appContext[e], t);
    return !l && n ? i : l;
  }
}
function Rs(e, t) {
  return e && (e[t] || e[jt(t)] || e[Ga(jt(t))]);
}
const Pe = Symbol(void 0),
  Pl = Symbol(void 0),
  Nt = Symbol(void 0),
  Ol = Symbol(void 0),
  Ta = [];
let Fr = null;
function T(e = !1) {
  Ta.push((Fr = e ? null : []));
}
function xc() {
  Ta.pop(), (Fr = Ta[Ta.length - 1] || null);
}
let pi = 1;
function Us(e) {
  pi += e;
}
function Ys(e) {
  return (
    (e.dynamicChildren = pi > 0 ? Fr || an : null),
    xc(),
    pi > 0 && Fr && Fr.push(e),
    e
  );
}
function _(e, t, r, n, a, i) {
  return Ys(B(e, t, r, n, a, i, !0));
}
function Ie(e, t, r, n, a) {
  return Ys(ee(e, t, r, n, a, !0));
}
function Lr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function zr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const mi = "__vInternal",
  Hs = ({ key: e }) => (e != null ? e : null),
  gi = ({ ref: e, ref_key: t, ref_for: r }) =>
    e != null
      ? Je(e) || vt(e) || Me(e)
        ? { i: kt, r: e, k: t, f: !!r }
        : e
      : null;
function B(
  e,
  t = null,
  r = null,
  n = 0,
  a = null,
  i = e === Pe ? 0 : 1,
  l = !1,
  o = !1
) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Hs(t),
    ref: t && gi(t),
    scopeId: li,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: a,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    o
      ? (_l(s, r), i & 128 && e.normalize(s))
      : r && (s.shapeFlag |= Je(r) ? 8 : 16),
    pi > 0 &&
      !l &&
      Fr &&
      (s.patchFlag > 0 || i & 6) &&
      s.patchFlag !== 32 &&
      Fr.push(s),
    s
  );
}
const ee = ef;
function ef(e, t = null, r = null, n = 0, a = null, i = !1) {
  if (((!e || e === zs) && (e = Nt), Lr(e))) {
    const o = dn(e, t, !0);
    return r && _l(o, r), o;
  }
  if ((vf(e) && (e = e.__vccOpts), t)) {
    t = Ws(t);
    let { class: o, style: s } = t;
    o && !Je(o) && (t.class = Y(o)),
      Qe(s) && (vs(s) && !Se(s) && (s = tt({}, s)), (t.style = J(s)));
  }
  const l = Je(e) ? 1 : $c(e) ? 128 : Gc(e) ? 64 : Qe(e) ? 4 : Me(e) ? 2 : 0;
  return B(e, t, r, n, a, l, i, !0);
}
function Ws(e) {
  return e ? (vs(e) || mi in e ? tt({}, e) : e) : null;
}
function dn(e, t, r = !1) {
  const { props: n, ref: a, patchFlag: i, children: l } = e,
    o = t ? Xe(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: o,
    key: o && Hs(o),
    ref:
      t && t.ref
        ? r && a
          ? Se(a)
            ? a.concat(gi(t))
            : [a, gi(t)]
          : gi(t)
        : a,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Pe ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && dn(e.ssContent),
    ssFallback: e.ssFallback && dn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Oe(e = " ", t = 0) {
  return ee(Pl, null, e, t);
}
function de(e = "", t = !1) {
  return t ? (T(), Ie(Nt, null, e)) : ee(Nt, null, e);
}
function qt(e) {
  return e == null || typeof e == "boolean"
    ? ee(Nt)
    : Se(e)
    ? ee(Pe, null, e.slice())
    : typeof e == "object"
    ? ur(e)
    : ee(Pl, null, String(e));
}
function ur(e) {
  return e.el === null || e.memo ? e : dn(e);
}
function _l(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (Se(t)) r = 16;
  else if (typeof t == "object")
    if (n & (1 | 64)) {
      const a = t.default;
      a && (a._c && (a._d = !1), _l(e, a()), a._c && (a._d = !0));
      return;
    } else {
      r = 32;
      const a = t._;
      !a && !(mi in t)
        ? (t._ctx = kt)
        : a === 3 &&
          kt &&
          (kt.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Me(t)
      ? ((t = { default: t, _ctx: kt }), (r = 32))
      : ((t = String(t)), n & 64 ? ((r = 16), (t = [Oe(t)])) : (r = 8));
  (e.children = t), (e.shapeFlag |= r);
}
function Xe(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const a in n)
      if (a === "class")
        t.class !== n.class && (t.class = Y([t.class, n.class]));
      else if (a === "style") t.style = J([t.style, n.style]);
      else if (ja(a)) {
        const i = t[a],
          l = n[a];
        i !== l &&
          !(Se(i) && i.includes(l)) &&
          (t[a] = i ? [].concat(i, l) : l);
      } else a !== "" && (t[a] = n[a]);
  }
  return t;
}
function Xt(e, t, r, n = null) {
  Et(e, t, 7, [r, n]);
}
function Ze(e, t, r, n) {
  let a;
  const i = r && r[n];
  if (Se(e) || Je(e)) {
    a = new Array(e.length);
    for (let l = 0, o = e.length; l < o; l++)
      a[l] = t(e[l], l, void 0, i && i[l]);
  } else if (typeof e == "number") {
    a = new Array(e);
    for (let l = 0; l < e; l++) a[l] = t(l + 1, l, void 0, i && i[l]);
  } else if (Qe(e))
    if (e[Symbol.iterator])
      a = Array.from(e, (l, o) => t(l, o, void 0, i && i[o]));
    else {
      const l = Object.keys(e);
      a = new Array(l.length);
      for (let o = 0, s = l.length; o < s; o++) {
        const u = l[o];
        a[o] = t(e[u], u, o, i && i[o]);
      }
    }
  else a = [];
  return r && (r[n] = a), a;
}
function Z(e, t, r = {}, n, a) {
  if (kt.isCE)
    return ee("slot", t === "default" ? null : { name: t }, n && n());
  let i = e[t];
  i && i._c && (i._d = !1), T();
  const l = i && js(i(r)),
    o = Ie(
      Pe,
      { key: r.key || `_${t}` },
      l || (n ? n() : []),
      l && e._ === 1 ? 64 : -2
    );
  return (
    !a && o.scopeId && (o.slotScopeIds = [o.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    o
  );
}
function js(e) {
  return e.some((t) =>
    Lr(t) ? !(t.type === Nt || (t.type === Pe && !js(t.children))) : !0
  )
    ? e
    : null;
}
const Vl = (e) => (e ? (Ks(e) ? Nl(e) || e.proxy : Vl(e.parent)) : null),
  yi = tt(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Vl(e.parent),
    $root: (e) => Vl(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Es(e),
    $forceUpdate: (e) => () => Js(e.update),
    $nextTick: (e) => Ye.bind(e.proxy),
    $watch: (e) => gf.bind(e),
  }),
  tf = {
    get({ _: e }, t) {
      const {
        ctx: r,
        setupState: n,
        data: a,
        props: i,
        accessCache: l,
        type: o,
        appContext: s,
      } = e;
      let u;
      if (t[0] !== "$") {
        const f = l[t];
        if (f !== void 0)
          switch (f) {
            case 1:
              return n[t];
            case 2:
              return a[t];
            case 4:
              return r[t];
            case 3:
              return i[t];
          }
        else {
          if (n !== Fe && De(n, t)) return (l[t] = 1), n[t];
          if (a !== Fe && De(a, t)) return (l[t] = 2), a[t];
          if ((u = e.propsOptions[0]) && De(u, t)) return (l[t] = 3), i[t];
          if (r !== Fe && De(r, t)) return (l[t] = 4), r[t];
          bl && (l[t] = 0);
        }
      }
      const d = yi[t];
      let c, v;
      if (d) return t === "$attrs" && wt(e, "get", t), d(e);
      if ((c = o.__cssModules) && (c = c[t])) return c;
      if (r !== Fe && De(r, t)) return (l[t] = 4), r[t];
      if (((v = s.config.globalProperties), De(v, t))) return v[t];
    },
    set({ _: e }, t, r) {
      const { data: n, setupState: a, ctx: i } = e;
      if (a !== Fe && De(a, t)) a[t] = r;
      else if (n !== Fe && De(n, t)) n[t] = r;
      else if (De(e.props, t)) return !1;
      return t[0] === "$" && t.slice(1) in e ? !1 : ((i[t] = r), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: r,
          ctx: n,
          appContext: a,
          propsOptions: i,
        },
      },
      l
    ) {
      let o;
      return (
        !!r[l] ||
        (e !== Fe && De(e, l)) ||
        (t !== Fe && De(t, l)) ||
        ((o = i[0]) && De(o, l)) ||
        De(n, l) ||
        De(yi, l) ||
        De(a.config.globalProperties, l)
      );
    },
  },
  rf = Fs();
let nf = 0;
function af(e, t, r) {
  const n = e.type,
    a = (t ? t.appContext : e.appContext) || rf,
    i = {
      uid: nf++,
      vnode: e,
      type: n,
      parent: t,
      appContext: a,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Fv(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(a.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ps(n, a),
      emitsOptions: ms(n, a),
      emit: null,
      emitted: null,
      propsDefaults: Fe,
      inheritAttrs: n.inheritAttrs,
      ctx: Fe,
      data: Fe,
      props: Fe,
      attrs: Fe,
      slots: Fe,
      refs: Fe,
      setupState: Fe,
      setupContext: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Cc.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let nt = null;
const Rr = () => nt || kt,
  vn = (e) => {
    (nt = e), e.scope.on();
  },
  Ur = () => {
    nt && nt.scope.off(), (nt = null);
  };
function Ks(e) {
  return e.vnode.shapeFlag & 4;
}
let bi = !1;
function lf(e, t = !1) {
  bi = t;
  const { props: r, children: n } = e.vnode,
    a = Ks(e);
  zc(e, r, a, t), Yc(e, n);
  const i = a ? of(e, t) : void 0;
  return (bi = !1), i;
}
function of(e, t) {
  const r = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = cs(new Proxy(e.ctx, tf)));
  const { setup: n } = r;
  if (n) {
    const a = (e.setupContext = n.length > 1 ? uf(e) : null);
    vn(e), sn();
    const i = dr(n, e, 0, [e.props, a]);
    if ((Nr(), Ur(), Wo(i))) {
      if ((i.then(Ur, Ur), t))
        return i
          .then((l) => {
            qs(e, l, t);
          })
          .catch((l) => {
            Ci(l, e, 0);
          });
      e.asyncDep = i;
    } else qs(e, i, t);
  } else Gs(e, t);
}
function qs(e, t, r) {
  Me(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Qe(t) && (e.setupState = ps(t)),
    Gs(e, r);
}
let Xs;
function Gs(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && Xs && !n.render) {
      const a = n.template;
      if (a) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config,
          { delimiters: o, compilerOptions: s } = n,
          u = tt(tt({ isCustomElement: i, delimiters: o }, l), s);
        n.render = Xs(a, u);
      }
    }
    e.render = n.render || Vt;
  }
  vn(e), sn(), Ac(e), Nr(), Ur();
}
function sf(e) {
  return new Proxy(e.attrs, {
    get(t, r) {
      return wt(e, "get", "$attrs"), t[r];
    },
  });
}
function uf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  let r;
  return {
    get attrs() {
      return r || (r = sf(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Nl(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ps(cs(e.exposed)), {
        get(t, r) {
          if (r in t) return t[r];
          if (r in yi) return yi[r](e);
        },
      }))
    );
}
function df(e) {
  return (Me(e) && e.displayName) || e.name;
}
function vf(e) {
  return Me(e) && "__vccOpts" in e;
}
function dr(e, t, r, n) {
  let a;
  try {
    a = n ? e(...n) : e();
  } catch (i) {
    Ci(i, t, r);
  }
  return a;
}
function Et(e, t, r, n) {
  if (Me(e)) {
    const i = dr(e, t, r, n);
    return (
      i &&
        Wo(i) &&
        i.catch((l) => {
          Ci(l, t, r);
        }),
      i
    );
  }
  const a = [];
  for (let i = 0; i < e.length; i++) a.push(Et(e[i], t, r, n));
  return a;
}
function Ci(e, t, r, n = !0) {
  const a = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const l = t.proxy,
      o = r;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, l, o) === !1) return;
      }
      i = i.parent;
    }
    const s = t.appContext.config.errorHandler;
    if (s) {
      dr(s, null, 10, [e, l, o]);
      return;
    }
  }
  cf(e, r, a, n);
}
function cf(e, t, r, n = !0) {
  console.error(e);
}
let wi = !1,
  Al = !1;
const St = [];
let rr = 0;
const $a = [];
let Ea = null,
  cn = 0;
const Ma = [];
let vr = null,
  fn = 0;
const Zs = Promise.resolve();
let Dl = null,
  Bl = null;
function Ye(e) {
  const t = Dl || Zs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ff(e) {
  let t = rr + 1,
    r = St.length;
  for (; t < r; ) {
    const n = (t + r) >>> 1;
    Ia(St[n]) < e ? (t = n + 1) : (r = n);
  }
  return t;
}
function Js(e) {
  (!St.length || !St.includes(e, wi && e.allowRecurse ? rr + 1 : rr)) &&
    e !== Bl &&
    (e.id == null ? St.push(e) : St.splice(ff(e.id), 0, e), Qs());
}
function Qs() {
  !wi && !Al && ((Al = !0), (Dl = Zs.then(tu)));
}
function hf(e) {
  const t = St.indexOf(e);
  t > rr && St.splice(t, 1);
}
function xs(e, t, r, n) {
  Se(e)
    ? r.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? n + 1 : n)) && r.push(e),
    Qs();
}
function pf(e) {
  xs(e, Ea, $a, cn);
}
function mf(e) {
  xs(e, vr, Ma, fn);
}
function Fl(e, t = null) {
  if ($a.length) {
    for (
      Bl = t, Ea = [...new Set($a)], $a.length = 0, cn = 0;
      cn < Ea.length;
      cn++
    )
      Ea[cn]();
    (Ea = null), (cn = 0), (Bl = null), Fl(e, t);
  }
}
function eu(e) {
  if (Ma.length) {
    const t = [...new Set(Ma)];
    if (((Ma.length = 0), vr)) {
      vr.push(...t);
      return;
    }
    for (vr = t, vr.sort((r, n) => Ia(r) - Ia(n)), fn = 0; fn < vr.length; fn++)
      vr[fn]();
    (vr = null), (fn = 0);
  }
}
const Ia = (e) => (e.id == null ? 1 / 0 : e.id);
function tu(e) {
  (Al = !1), (wi = !0), Fl(e), St.sort((r, n) => Ia(r) - Ia(n));
  const t = Vt;
  try {
    for (rr = 0; rr < St.length; rr++) {
      const r = St[rr];
      r && r.active !== !1 && dr(r, null, 14);
    }
  } finally {
    (rr = 0),
      (St.length = 0),
      eu(),
      (wi = !1),
      (Dl = null),
      (St.length || $a.length || Ma.length) && tu(e);
  }
}
const ru = {};
function me(e, t, r) {
  return nu(e, t, r);
}
function nu(
  e,
  t,
  { immediate: r, deep: n, flush: a, onTrack: i, onTrigger: l } = Fe
) {
  const o = nt;
  let s,
    u = !1,
    d = !1;
  if (
    (vt(e)
      ? ((s = () => e.value), (u = !!e._shallow))
      : un(e)
      ? ((s = () => e), (n = !0))
      : Se(e)
      ? ((d = !0),
        (u = e.some(un)),
        (s = () =>
          e.map((m) => {
            if (vt(m)) return m.value;
            if (un(m)) return Yr(m);
            if (Me(m)) return dr(m, o, 2);
          })))
      : Me(e)
      ? t
        ? (s = () => dr(e, o, 2))
        : (s = () => {
            if (!(o && o.isUnmounted)) return c && c(), Et(e, o, 3, [v]);
          })
      : (s = Vt),
    t && n)
  ) {
    const m = s;
    s = () => Yr(m());
  }
  let c,
    v = (m) => {
      c = g.onStop = () => {
        dr(m, o, 4);
      };
    };
  if (bi)
    return (v = Vt), t ? r && Et(t, o, 3, [s(), d ? [] : void 0, v]) : s(), Vt;
  let f = d ? [] : ru;
  const p = () => {
    if (!!g.active)
      if (t) {
        const m = g.run();
        (n || u || (d ? m.some(($, S) => pa($, f[S])) : pa(m, f))) &&
          (c && c(), Et(t, o, 3, [m, f === ru ? void 0 : f, v]), (f = m));
      } else g.run();
  };
  p.allowRecurse = !!t;
  let h;
  a === "sync"
    ? (h = p)
    : a === "post"
    ? (h = () => mt(p, o && o.suspense))
    : (h = () => {
        !o || o.isMounted ? pf(p) : p();
      });
  const g = new tl(s, h);
  return (
    t
      ? r
        ? p()
        : (f = g.run())
      : a === "post"
      ? mt(g.run.bind(g), o && o.suspense)
      : g.run(),
    () => {
      g.stop(), o && o.scope && qi(o.scope.effects, g);
    }
  );
}
function gf(e, t, r) {
  const n = this.proxy,
    a = Je(e) ? (e.includes(".") ? au(n, e) : () => n[e]) : e.bind(n, n);
  let i;
  Me(t) ? (i = t) : ((i = t.handler), (r = t));
  const l = nt;
  vn(this);
  const o = nu(a, i.bind(n), r);
  return l ? vn(l) : Ur(), o;
}
function au(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let a = 0; a < r.length && n; a++) n = n[r[a]];
    return n;
  };
}
function Yr(e, t) {
  if (!Qe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), vt(e))) Yr(e.value, t);
  else if (Se(e)) for (let r = 0; r < e.length; r++) Yr(e[r], t);
  else if (Ho(e) || ln(e))
    e.forEach((r) => {
      Yr(r, t);
    });
  else if (Ko(e)) for (const r in e) Yr(e[r], t);
  return e;
}
function Ll(e, t, r) {
  const n = arguments.length;
  return n === 2
    ? Qe(t) && !Se(t)
      ? Lr(t)
        ? ee(e, null, [t])
        : ee(e, t)
      : ee(e, null, t)
    : (n > 3
        ? (r = Array.prototype.slice.call(arguments, 2))
        : n === 3 && Lr(r) && (r = [r]),
      ee(e, t, r));
}
const yf = "3.2.26",
  bf = "http://www.w3.org/2000/svg",
  hn = typeof document != "undefined" ? document : null,
  iu = new Map(),
  Cf = {
    insert: (e, t, r) => {
      t.insertBefore(e, r || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, r, n) => {
      const a = t
        ? hn.createElementNS(bf, e)
        : hn.createElement(e, r ? { is: r } : void 0);
      return (
        e === "select" &&
          n &&
          n.multiple != null &&
          a.setAttribute("multiple", n.multiple),
        a
      );
    },
    createText: (e) => hn.createTextNode(e),
    createComment: (e) => hn.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => hn.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, r, n) {
      const a = r ? r.previousSibling : t.lastChild;
      let i = iu.get(e);
      if (!i) {
        const l = hn.createElement("template");
        if (((l.innerHTML = n ? `<svg>${e}</svg>` : e), (i = l.content), n)) {
          const o = i.firstChild;
          for (; o.firstChild; ) i.appendChild(o.firstChild);
          i.removeChild(o);
        }
        iu.set(e, i);
      }
      return (
        t.insertBefore(i.cloneNode(!0), r),
        [a ? a.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild]
      );
    },
  };
function wf(e, t, r) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : r
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function kf(e, t, r) {
  const n = e.style,
    a = Je(r);
  if (r && !a) {
    for (const i in r) zl(n, i, r[i]);
    if (t && !Je(t)) for (const i in t) r[i] == null && zl(n, i, "");
  } else {
    const i = n.display;
    a ? t !== r && (n.cssText = r) : t && e.removeAttribute("style"),
      "_vod" in e && (n.display = i);
  }
}
const lu = /\s*!important$/;
function zl(e, t, r) {
  if (Se(r)) r.forEach((n) => zl(e, t, n));
  else if (t.startsWith("--")) e.setProperty(t, r);
  else {
    const n = Sf(e, t);
    lu.test(r)
      ? e.setProperty(Pr(n), r.replace(lu, ""), "important")
      : (e[n] = r);
  }
}
const ou = ["Webkit", "Moz", "ms"],
  Rl = {};
function Sf(e, t) {
  const r = Rl[t];
  if (r) return r;
  let n = jt(t);
  if (n !== "filter" && n in e) return (Rl[t] = n);
  n = Ga(n);
  for (let a = 0; a < ou.length; a++) {
    const i = ou[a] + n;
    if (i in e) return (Rl[t] = i);
  }
  return t;
}
const su = "http://www.w3.org/1999/xlink";
function Tf(e, t, r, n, a) {
  if (n && t.startsWith("xlink:"))
    r == null
      ? e.removeAttributeNS(su, t.slice(6, t.length))
      : e.setAttributeNS(su, t, r);
  else {
    const i = Ev(t);
    r == null || (i && !Ro(r))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : r);
  }
}
function $f(e, t, r, n, a, i, l) {
  if (t === "innerHTML" || t === "textContent") {
    n && l(n, a, i), (e[t] = r == null ? "" : r);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = r;
    const o = r == null ? "" : r;
    (e.value !== o || e.tagName === "OPTION") && (e.value = o),
      r == null && e.removeAttribute(t);
    return;
  }
  if (r === "" || r == null) {
    const o = typeof e[t];
    if (o === "boolean") {
      e[t] = Ro(r);
      return;
    } else if (r == null && o === "string") {
      (e[t] = ""), e.removeAttribute(t);
      return;
    } else if (o === "number") {
      try {
        e[t] = 0;
      } catch {}
      e.removeAttribute(t);
      return;
    }
  }
  try {
    e[t] = r;
  } catch {}
}
let ki = Date.now,
  uu = !1;
if (typeof window != "undefined") {
  ki() > document.createEvent("Event").timeStamp &&
    (ki = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  uu = !!(e && Number(e[1]) <= 53);
}
let Ul = 0;
const Ef = Promise.resolve(),
  Mf = () => {
    Ul = 0;
  },
  If = () => Ul || (Ef.then(Mf), (Ul = ki()));
function pn(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function Pf(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
function Of(e, t, r, n, a = null) {
  const i = e._vei || (e._vei = {}),
    l = i[t];
  if (n && l) l.value = n;
  else {
    const [o, s] = _f(t);
    if (n) {
      const u = (i[t] = Vf(n, a));
      pn(e, o, u, s);
    } else l && (Pf(e, o, l, s), (i[t] = void 0));
  }
}
const du = /(?:Once|Passive|Capture)$/;
function _f(e) {
  let t;
  if (du.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(du)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [Pr(e.slice(2)), t];
}
function Vf(e, t) {
  const r = (n) => {
    const a = n.timeStamp || ki();
    (uu || a >= r.attached - 1) && Et(Nf(n, r.value), t, 5, [n]);
  };
  return (r.value = e), (r.attached = If()), r;
}
function Nf(e, t) {
  if (Se(t)) {
    const r = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        r.call(e), (e._stopped = !0);
      }),
      t.map((n) => (a) => !a._stopped && n(a))
    );
  } else return t;
}
const vu = /^on[a-z]/,
  Af = (e, t, r, n, a = !1, i, l, o, s) => {
    t === "class"
      ? wf(e, n, a)
      : t === "style"
      ? kf(e, r, n)
      : ja(t)
      ? Ki(t) || Of(e, t, r, n, l)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Df(e, t, n, a)
        )
      ? $f(e, t, n, i, l, o, s)
      : (t === "true-value"
          ? (e._trueValue = n)
          : t === "false-value" && (e._falseValue = n),
        Tf(e, t, n, a));
  };
function Df(e, t, r, n) {
  return n
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && vu.test(t) && Me(r))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (vu.test(t) && Je(r))
    ? !1
    : t in e;
}
const cr = "transition",
  Pa = "animation",
  at = (e, { slots: t }) => Ll(bs, hu(e), t);
at.displayName = "Transition";
const cu = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Bf = (at.props = tt({}, bs.props, cu)),
  Hr = (e, t = []) => {
    Se(e) ? e.forEach((r) => r(...t)) : e && e(...t);
  },
  fu = (e) => (e ? (Se(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function hu(e) {
  const t = {};
  for (const y in e) y in cu || (t[y] = e[y]);
  if (e.css === !1) return t;
  const {
      name: r = "v",
      type: n,
      duration: a,
      enterFromClass: i = `${r}-enter-from`,
      enterActiveClass: l = `${r}-enter-active`,
      enterToClass: o = `${r}-enter-to`,
      appearFromClass: s = i,
      appearActiveClass: u = l,
      appearToClass: d = o,
      leaveFromClass: c = `${r}-leave-from`,
      leaveActiveClass: v = `${r}-leave-active`,
      leaveToClass: f = `${r}-leave-to`,
    } = e,
    p = Ff(a),
    h = p && p[0],
    g = p && p[1],
    {
      onBeforeEnter: m,
      onEnter: $,
      onEnterCancelled: S,
      onLeave: C,
      onLeaveCancelled: k,
      onBeforeAppear: M = m,
      onAppear: P = $,
      onAppearCancelled: I = S,
    } = t,
    N = (y, z, te) => {
      Wr(y, z ? d : o), Wr(y, z ? u : l), te && te();
    },
    F = (y, z) => {
      Wr(y, f), Wr(y, v), z && z();
    },
    w = (y) => (z, te) => {
      const V = y ? P : $,
        A = () => N(z, y, te);
      Hr(V, [z, A]),
        pu(() => {
          Wr(z, y ? s : i), nr(z, y ? d : o), fu(V) || mu(z, n, h, A);
        });
    };
  return tt(t, {
    onBeforeEnter(y) {
      Hr(m, [y]), nr(y, i), nr(y, l);
    },
    onBeforeAppear(y) {
      Hr(M, [y]), nr(y, s), nr(y, u);
    },
    onEnter: w(!1),
    onAppear: w(!0),
    onLeave(y, z) {
      const te = () => F(y, z);
      nr(y, c),
        Cu(),
        nr(y, v),
        pu(() => {
          Wr(y, c), nr(y, f), fu(C) || mu(y, n, g, te);
        }),
        Hr(C, [y, te]);
    },
    onEnterCancelled(y) {
      N(y, !1), Hr(S, [y]);
    },
    onAppearCancelled(y) {
      N(y, !0), Hr(I, [y]);
    },
    onLeaveCancelled(y) {
      F(y), Hr(k, [y]);
    },
  });
}
function Ff(e) {
  if (e == null) return null;
  if (Qe(e)) return [Yl(e.enter), Yl(e.leave)];
  {
    const t = Yl(e);
    return [t, t];
  }
}
function Yl(e) {
  return Qa(e);
}
function nr(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function Wr(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const { _vtc: r } = e;
  r && (r.delete(t), r.size || (e._vtc = void 0));
}
function pu(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Lf = 0;
function mu(e, t, r, n) {
  const a = (e._endId = ++Lf),
    i = () => {
      a === e._endId && n();
    };
  if (r) return setTimeout(i, r);
  const { type: l, timeout: o, propCount: s } = gu(e, t);
  if (!l) return n();
  const u = l + "end";
  let d = 0;
  const c = () => {
      e.removeEventListener(u, v), i();
    },
    v = (f) => {
      f.target === e && ++d >= s && c();
    };
  setTimeout(() => {
    d < s && c();
  }, o + 1),
    e.addEventListener(u, v);
}
function gu(e, t) {
  const r = window.getComputedStyle(e),
    n = (p) => (r[p] || "").split(", "),
    a = n(cr + "Delay"),
    i = n(cr + "Duration"),
    l = yu(a, i),
    o = n(Pa + "Delay"),
    s = n(Pa + "Duration"),
    u = yu(o, s);
  let d = null,
    c = 0,
    v = 0;
  t === cr
    ? l > 0 && ((d = cr), (c = l), (v = i.length))
    : t === Pa
    ? u > 0 && ((d = Pa), (c = u), (v = s.length))
    : ((c = Math.max(l, u)),
      (d = c > 0 ? (l > u ? cr : Pa) : null),
      (v = d ? (d === cr ? i.length : s.length) : 0));
  const f = d === cr && /\b(transform|all)(,|$)/.test(r[cr + "Property"]);
  return { type: d, timeout: c, propCount: v, hasTransform: f };
}
function yu(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((r, n) => bu(r) + bu(e[n])));
}
function bu(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Cu() {
  return document.body.offsetHeight;
}
const wu = new WeakMap(),
  ku = new WeakMap(),
  zf = {
    name: "TransitionGroup",
    props: tt({}, Bf, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const r = Rr(),
        n = ys();
      let a, i;
      return (
        yl(() => {
          if (!a.length) return;
          const l = e.moveClass || `${e.name || "v"}-move`;
          if (!Wf(a[0].el, r.vnode.el, l)) return;
          a.forEach(Uf), a.forEach(Yf);
          const o = a.filter(Hf);
          Cu(),
            o.forEach((s) => {
              const u = s.el,
                d = u.style;
              nr(u, l),
                (d.transform = d.webkitTransform = d.transitionDuration = "");
              const c = (u._moveCb = (v) => {
                (v && v.target !== u) ||
                  ((!v || /transform$/.test(v.propertyName)) &&
                    (u.removeEventListener("transitionend", c),
                    (u._moveCb = null),
                    Wr(u, l)));
              });
              u.addEventListener("transitionend", c);
            });
        }),
        () => {
          const l = Ve(e),
            o = hu(l);
          let s = l.tag || Pe;
          (a = i), (i = t.default ? ml(t.default()) : []);
          for (let u = 0; u < i.length; u++) {
            const d = i[u];
            d.key != null && wa(d, Ca(d, o, n, r));
          }
          if (a)
            for (let u = 0; u < a.length; u++) {
              const d = a[u];
              wa(d, Ca(d, o, n, r)), wu.set(d, d.el.getBoundingClientRect());
            }
          return ee(s, null, i);
        }
      );
    },
  },
  Rf = zf;
function Uf(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function Yf(e) {
  ku.set(e, e.el.getBoundingClientRect());
}
function Hf(e) {
  const t = wu.get(e),
    r = ku.get(e),
    n = t.left - r.left,
    a = t.top - r.top;
  if (n || a) {
    const i = e.el.style;
    return (
      (i.transform = i.webkitTransform = `translate(${n}px,${a}px)`),
      (i.transitionDuration = "0s"),
      e
    );
  }
}
function Wf(e, t, r) {
  const n = e.cloneNode();
  e._vtc &&
    e._vtc.forEach((l) => {
      l.split(/\s+/).forEach((o) => o && n.classList.remove(o));
    }),
    r.split(/\s+/).forEach((l) => l && n.classList.add(l)),
    (n.style.display = "none");
  const a = t.nodeType === 1 ? t : t.parentNode;
  a.appendChild(n);
  const { hasTransform: i } = gu(n);
  return a.removeChild(n), i;
}
const Su = (e) => {
  const t = e.props["onUpdate:modelValue"];
  return Se(t) ? (r) => Za(t, r) : t;
};
function jf(e) {
  e.target.composing = !0;
}
function Tu(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), Kf(t, "input"));
}
function Kf(e, t) {
  const r = document.createEvent("HTMLEvents");
  r.initEvent(t, !0, !0), e.dispatchEvent(r);
}
const qf = {
    created(e, { modifiers: { lazy: t, trim: r, number: n } }, a) {
      e._assign = Su(a);
      const i = n || (a.props && a.props.type === "number");
      pn(e, t ? "change" : "input", (l) => {
        if (l.target.composing) return;
        let o = e.value;
        r ? (o = o.trim()) : i && (o = Qa(o)), e._assign(o);
      }),
        r &&
          pn(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (pn(e, "compositionstart", jf),
          pn(e, "compositionend", Tu),
          pn(e, "change", Tu));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t;
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: r, trim: n, number: a } },
      i
    ) {
      if (
        ((e._assign = Su(i)),
        e.composing ||
          (document.activeElement === e &&
            (r ||
              (n && e.value.trim() === t) ||
              ((a || e.type === "number") && Qa(e.value) === t))))
      )
        return;
      const l = t == null ? "" : t;
      e.value !== l && (e.value = l);
    },
  },
  Xf = ["ctrl", "shift", "alt", "meta"],
  Gf = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => Xf.some((r) => e[`${r}Key`] && !t.includes(r)),
  },
  mn =
    (e, t) =>
    (r, ...n) => {
      for (let a = 0; a < t.length; a++) {
        const i = Gf[t[a]];
        if (i && i(r, t)) return;
      }
      return e(r, ...n);
    },
  Zf = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  $u = (e, t) => (r) => {
    if (!("key" in r)) return;
    const n = Pr(r.key);
    if (t.some((a) => a === n || Zf[a] === n)) return e(r);
  },
  Oa = {
    beforeMount(e, { value: t }, { transition: r }) {
      (e._vod = e.style.display === "none" ? "" : e.style.display),
        r && t ? r.beforeEnter(e) : _a(e, t);
    },
    mounted(e, { value: t }, { transition: r }) {
      r && t && r.enter(e);
    },
    updated(e, { value: t, oldValue: r }, { transition: n }) {
      !t != !r &&
        (n
          ? t
            ? (n.beforeEnter(e), _a(e, !0), n.enter(e))
            : n.leave(e, () => {
                _a(e, !1);
              })
          : _a(e, t));
    },
    beforeUnmount(e, { value: t }) {
      _a(e, t);
    },
  };
function _a(e, t) {
  e.style.display = t ? e._vod : "none";
}
const Jf = tt({ patchProp: Af }, Cf);
let Eu;
function Qf() {
  return Eu || (Eu = Kc(Jf));
}
const xf = (...e) => {
  const t = Qf().createApp(...e),
    { mount: r } = t;
  return (
    (t.mount = (n) => {
      const a = eh(n);
      if (!a) return;
      const i = t._component;
      !Me(i) && !i.render && !i.template && (i.template = a.innerHTML),
        (a.innerHTML = "");
      const l = r(a, !1, a instanceof SVGElement);
      return (
        a instanceof Element &&
          (a.removeAttribute("v-cloak"), a.setAttribute("data-v-app", "")),
        l
      );
    }),
    t
  );
};
function eh(e) {
  return Je(e) ? document.querySelector(e) : e;
}
var th =
  typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : {};
function rh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Mu = { exports: {} };
/*!
 *
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 *
 */ (function (e, t) {
  (function (n, a) {
    e.exports = a();
  })(th, function () {
    return (function (r) {
      var n = {};
      function a(i) {
        if (n[i]) return n[i].exports;
        var l = (n[i] = { exports: {}, id: i, loaded: !1 });
        return (
          r[i].call(l.exports, l, l.exports, a), (l.loaded = !0), l.exports
        );
      }
      return (a.m = r), (a.c = n), (a.p = ""), a(0);
    })([
      function (r, n, a) {
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i = (function () {
          function d(c, v) {
            for (var f = 0; f < v.length; f++) {
              var p = v[f];
              (p.enumerable = p.enumerable || !1),
                (p.configurable = !0),
                "value" in p && (p.writable = !0),
                Object.defineProperty(c, p.key, p);
            }
          }
          return function (c, v, f) {
            return v && d(c.prototype, v), f && d(c, f), c;
          };
        })();
        function l(d, c) {
          if (!(d instanceof c))
            throw new TypeError("Cannot call a class as a function");
        }
        var o = a(1),
          s = a(3),
          u = (function () {
            function d(c, v) {
              l(this, d), o.initializer.load(this, v, c), this.begin();
            }
            return (
              i(d, [
                {
                  key: "toggle",
                  value: function () {
                    this.pause.status ? this.start() : this.stop();
                  },
                },
                {
                  key: "stop",
                  value: function () {
                    this.typingComplete ||
                      this.pause.status ||
                      (this.toggleBlinking(!0),
                      (this.pause.status = !0),
                      this.options.onStop(this.arrayPos, this));
                  },
                },
                {
                  key: "start",
                  value: function () {
                    this.typingComplete ||
                      !this.pause.status ||
                      ((this.pause.status = !1),
                      this.pause.typewrite
                        ? this.typewrite(
                            this.pause.curString,
                            this.pause.curStrPos
                          )
                        : this.backspace(
                            this.pause.curString,
                            this.pause.curStrPos
                          ),
                      this.options.onStart(this.arrayPos, this));
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.reset(!1), this.options.onDestroy(this);
                  },
                },
                {
                  key: "reset",
                  value: function () {
                    var v =
                      arguments.length <= 0 || arguments[0] === void 0
                        ? !0
                        : arguments[0];
                    clearInterval(this.timeout),
                      this.replaceText(""),
                      this.cursor &&
                        this.cursor.parentNode &&
                        (this.cursor.parentNode.removeChild(this.cursor),
                        (this.cursor = null)),
                      (this.strPos = 0),
                      (this.arrayPos = 0),
                      (this.curLoop = 0),
                      v &&
                        (this.insertCursor(),
                        this.options.onReset(this),
                        this.begin());
                  },
                },
                {
                  key: "begin",
                  value: function () {
                    var v = this;
                    this.options.onBegin(this),
                      (this.typingComplete = !1),
                      this.shuffleStringsIfNeeded(this),
                      this.insertCursor(),
                      this.bindInputFocusEvents && this.bindFocusEvents(),
                      (this.timeout = setTimeout(function () {
                        !v.currentElContent || v.currentElContent.length === 0
                          ? v.typewrite(
                              v.strings[v.sequence[v.arrayPos]],
                              v.strPos
                            )
                          : v.backspace(
                              v.currentElContent,
                              v.currentElContent.length
                            );
                      }, this.startDelay));
                  },
                },
                {
                  key: "typewrite",
                  value: function (v, f) {
                    var p = this;
                    this.fadeOut &&
                      this.el.classList.contains(this.fadeOutClass) &&
                      (this.el.classList.remove(this.fadeOutClass),
                      this.cursor &&
                        this.cursor.classList.remove(this.fadeOutClass));
                    var h = this.humanizer(this.typeSpeed),
                      g = 1;
                    if (this.pause.status === !0) {
                      this.setPauseStatus(v, f, !0);
                      return;
                    }
                    this.timeout = setTimeout(function () {
                      f = s.htmlParser.typeHtmlChars(v, f, p);
                      var m = 0,
                        $ = v.substr(f);
                      if ($.charAt(0) === "^" && /^\^\d+/.test($)) {
                        var S = 1;
                        ($ = /\d+/.exec($)[0]),
                          (S += $.length),
                          (m = parseInt($)),
                          (p.temporaryPause = !0),
                          p.options.onTypingPaused(p.arrayPos, p),
                          (v = v.substring(0, f) + v.substring(f + S)),
                          p.toggleBlinking(!0);
                      }
                      if ($.charAt(0) === "`") {
                        for (
                          ;
                          v.substr(f + g).charAt(0) !== "`" &&
                          (g++, !(f + g > v.length));

                        );
                        var C = v.substring(0, f),
                          k = v.substring(C.length + 1, f + g),
                          M = v.substring(f + g + 1);
                        (v = C + k + M), g--;
                      }
                      p.timeout = setTimeout(function () {
                        p.toggleBlinking(!1),
                          f >= v.length
                            ? p.doneTyping(v, f)
                            : p.keepTyping(v, f, g),
                          p.temporaryPause &&
                            ((p.temporaryPause = !1),
                            p.options.onTypingResumed(p.arrayPos, p));
                      }, m);
                    }, h);
                  },
                },
                {
                  key: "keepTyping",
                  value: function (v, f, p) {
                    f === 0 &&
                      (this.toggleBlinking(!1),
                      this.options.preStringTyped(this.arrayPos, this)),
                      (f += p);
                    var h = v.substr(0, f);
                    this.replaceText(h), this.typewrite(v, f);
                  },
                },
                {
                  key: "doneTyping",
                  value: function (v, f) {
                    var p = this;
                    this.options.onStringTyped(this.arrayPos, this),
                      this.toggleBlinking(!0),
                      !(
                        this.arrayPos === this.strings.length - 1 &&
                        (this.complete(),
                        this.loop === !1 || this.curLoop === this.loopCount)
                      ) &&
                        (this.timeout = setTimeout(function () {
                          p.backspace(v, f);
                        }, this.backDelay));
                  },
                },
                {
                  key: "backspace",
                  value: function (v, f) {
                    var p = this;
                    if (this.pause.status === !0) {
                      this.setPauseStatus(v, f, !1);
                      return;
                    }
                    if (this.fadeOut) return this.initFadeOut();
                    this.toggleBlinking(!1);
                    var h = this.humanizer(this.backSpeed);
                    this.timeout = setTimeout(function () {
                      f = s.htmlParser.backSpaceHtmlChars(v, f, p);
                      var g = v.substr(0, f);
                      if ((p.replaceText(g), p.smartBackspace)) {
                        var m = p.strings[p.arrayPos + 1];
                        m && g === m.substr(0, f)
                          ? (p.stopNum = f)
                          : (p.stopNum = 0);
                      }
                      f > p.stopNum
                        ? (f--, p.backspace(v, f))
                        : f <= p.stopNum &&
                          (p.arrayPos++,
                          p.arrayPos === p.strings.length
                            ? ((p.arrayPos = 0),
                              p.options.onLastStringBackspaced(),
                              p.shuffleStringsIfNeeded(),
                              p.begin())
                            : p.typewrite(
                                p.strings[p.sequence[p.arrayPos]],
                                f
                              ));
                    }, h);
                  },
                },
                {
                  key: "complete",
                  value: function () {
                    this.options.onComplete(this),
                      this.loop ? this.curLoop++ : (this.typingComplete = !0);
                  },
                },
                {
                  key: "setPauseStatus",
                  value: function (v, f, p) {
                    (this.pause.typewrite = p),
                      (this.pause.curString = v),
                      (this.pause.curStrPos = f);
                  },
                },
                {
                  key: "toggleBlinking",
                  value: function (v) {
                    !this.cursor ||
                      this.pause.status ||
                      (this.cursorBlinking !== v &&
                        ((this.cursorBlinking = v),
                        v
                          ? this.cursor.classList.add("typed-cursor--blink")
                          : this.cursor.classList.remove(
                              "typed-cursor--blink"
                            )));
                  },
                },
                {
                  key: "humanizer",
                  value: function (v) {
                    return Math.round((Math.random() * v) / 2) + v;
                  },
                },
                {
                  key: "shuffleStringsIfNeeded",
                  value: function () {
                    !this.shuffle ||
                      (this.sequence = this.sequence.sort(function () {
                        return Math.random() - 0.5;
                      }));
                  },
                },
                {
                  key: "initFadeOut",
                  value: function () {
                    var v = this;
                    return (
                      (this.el.className += " " + this.fadeOutClass),
                      this.cursor &&
                        (this.cursor.className += " " + this.fadeOutClass),
                      setTimeout(function () {
                        v.arrayPos++,
                          v.replaceText(""),
                          v.strings.length > v.arrayPos
                            ? v.typewrite(v.strings[v.sequence[v.arrayPos]], 0)
                            : (v.typewrite(v.strings[0], 0), (v.arrayPos = 0));
                      }, this.fadeOutDelay)
                    );
                  },
                },
                {
                  key: "replaceText",
                  value: function (v) {
                    this.attr
                      ? this.el.setAttribute(this.attr, v)
                      : this.isInput
                      ? (this.el.value = v)
                      : this.contentType === "html"
                      ? (this.el.innerHTML = v)
                      : (this.el.textContent = v);
                  },
                },
                {
                  key: "bindFocusEvents",
                  value: function () {
                    var v = this;
                    !this.isInput ||
                      (this.el.addEventListener("focus", function (f) {
                        v.stop();
                      }),
                      this.el.addEventListener("blur", function (f) {
                        (v.el.value && v.el.value.length !== 0) || v.start();
                      }));
                  },
                },
                {
                  key: "insertCursor",
                  value: function () {
                    !this.showCursor ||
                      this.cursor ||
                      ((this.cursor = document.createElement("span")),
                      (this.cursor.className = "typed-cursor"),
                      this.cursor.setAttribute("aria-hidden", !0),
                      (this.cursor.innerHTML = this.cursorChar),
                      this.el.parentNode &&
                        this.el.parentNode.insertBefore(
                          this.cursor,
                          this.el.nextSibling
                        ));
                  },
                },
              ]),
              d
            );
          })();
        (n.default = u), (r.exports = n.default);
      },
      function (r, n, a) {
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i =
            Object.assign ||
            function (f) {
              for (var p = 1; p < arguments.length; p++) {
                var h = arguments[p];
                for (var g in h)
                  Object.prototype.hasOwnProperty.call(h, g) && (f[g] = h[g]);
              }
              return f;
            },
          l = (function () {
            function f(p, h) {
              for (var g = 0; g < h.length; g++) {
                var m = h[g];
                (m.enumerable = m.enumerable || !1),
                  (m.configurable = !0),
                  "value" in m && (m.writable = !0),
                  Object.defineProperty(p, m.key, m);
              }
            }
            return function (p, h, g) {
              return h && f(p.prototype, h), g && f(p, g), p;
            };
          })();
        function o(f) {
          return f && f.__esModule ? f : { default: f };
        }
        function s(f, p) {
          if (!(f instanceof p))
            throw new TypeError("Cannot call a class as a function");
        }
        var u = a(2),
          d = o(u),
          c = (function () {
            function f() {
              s(this, f);
            }
            return (
              l(f, [
                {
                  key: "load",
                  value: function (h, g, m) {
                    if (
                      (typeof m == "string"
                        ? (h.el = document.querySelector(m))
                        : (h.el = m),
                      (h.options = i({}, d.default, g)),
                      (h.isInput = h.el.tagName.toLowerCase() === "input"),
                      (h.attr = h.options.attr),
                      (h.bindInputFocusEvents = h.options.bindInputFocusEvents),
                      (h.showCursor = h.isInput ? !1 : h.options.showCursor),
                      (h.cursorChar = h.options.cursorChar),
                      (h.cursorBlinking = !0),
                      (h.elContent = h.attr
                        ? h.el.getAttribute(h.attr)
                        : h.el.textContent),
                      (h.contentType = h.options.contentType),
                      (h.typeSpeed = h.options.typeSpeed),
                      (h.startDelay = h.options.startDelay),
                      (h.backSpeed = h.options.backSpeed),
                      (h.smartBackspace = h.options.smartBackspace),
                      (h.backDelay = h.options.backDelay),
                      (h.fadeOut = h.options.fadeOut),
                      (h.fadeOutClass = h.options.fadeOutClass),
                      (h.fadeOutDelay = h.options.fadeOutDelay),
                      (h.isPaused = !1),
                      (h.strings = h.options.strings.map(function (M) {
                        return M.trim();
                      })),
                      typeof h.options.stringsElement == "string"
                        ? (h.stringsElement = document.querySelector(
                            h.options.stringsElement
                          ))
                        : (h.stringsElement = h.options.stringsElement),
                      h.stringsElement)
                    ) {
                      (h.strings = []),
                        (h.stringsElement.style.display = "none");
                      var $ = Array.prototype.slice.apply(
                          h.stringsElement.children
                        ),
                        S = $.length;
                      if (S)
                        for (var C = 0; C < S; C += 1) {
                          var k = $[C];
                          h.strings.push(k.innerHTML.trim());
                        }
                    }
                    (h.strPos = 0),
                      (h.arrayPos = 0),
                      (h.stopNum = 0),
                      (h.loop = h.options.loop),
                      (h.loopCount = h.options.loopCount),
                      (h.curLoop = 0),
                      (h.shuffle = h.options.shuffle),
                      (h.sequence = []),
                      (h.pause = {
                        status: !1,
                        typewrite: !0,
                        curString: "",
                        curStrPos: 0,
                      }),
                      (h.typingComplete = !1);
                    for (var C in h.strings) h.sequence[C] = C;
                    (h.currentElContent = this.getCurrentElContent(h)),
                      (h.autoInsertCss = h.options.autoInsertCss),
                      this.appendAnimationCss(h);
                  },
                },
                {
                  key: "getCurrentElContent",
                  value: function (h) {
                    var g = "";
                    return (
                      h.attr
                        ? (g = h.el.getAttribute(h.attr))
                        : h.isInput
                        ? (g = h.el.value)
                        : h.contentType === "html"
                        ? (g = h.el.innerHTML)
                        : (g = h.el.textContent),
                      g
                    );
                  },
                },
                {
                  key: "appendAnimationCss",
                  value: function (h) {
                    var g = "data-typed-js-css";
                    if (
                      !!h.autoInsertCss &&
                      !(!h.showCursor && !h.fadeOut) &&
                      !document.querySelector("[" + g + "]")
                    ) {
                      var m = document.createElement("style");
                      (m.type = "text/css"), m.setAttribute(g, !0);
                      var $ = "";
                      h.showCursor &&
                        ($ += `
        .typed-cursor{
          opacity: 1;
        }
        .typed-cursor.typed-cursor--blink{
          animation: typedjsBlink 0.7s infinite;
          -webkit-animation: typedjsBlink 0.7s infinite;
                  animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink{
          50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink{
          0% { opacity: 1; }
          50% { opacity: 0.0; }
          100% { opacity: 1; }
        }
      `),
                        h.fadeOut &&
                          ($ += `
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `),
                        m.length !== 0 &&
                          ((m.innerHTML = $), document.body.appendChild(m));
                    }
                  },
                },
              ]),
              f
            );
          })();
        n.default = c;
        var v = new c();
        n.initializer = v;
      },
      function (r, n) {
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = {
          strings: [
            "These are the default values...",
            "You know what you should do?",
            "Use your own!",
            "Have a great day!",
          ],
          stringsElement: null,
          typeSpeed: 0,
          startDelay: 0,
          backSpeed: 0,
          smartBackspace: !0,
          shuffle: !1,
          backDelay: 700,
          fadeOut: !1,
          fadeOutClass: "typed-fade-out",
          fadeOutDelay: 500,
          loop: !1,
          loopCount: 1 / 0,
          showCursor: !0,
          cursorChar: "|",
          autoInsertCss: !0,
          attr: null,
          bindInputFocusEvents: !1,
          contentType: "html",
          onBegin: function (l) {},
          onComplete: function (l) {},
          preStringTyped: function (l, o) {},
          onStringTyped: function (l, o) {},
          onLastStringBackspaced: function (l) {},
          onTypingPaused: function (l, o) {},
          onTypingResumed: function (l, o) {},
          onReset: function (l) {},
          onStop: function (l, o) {},
          onStart: function (l, o) {},
          onDestroy: function (l) {},
        };
        (n.default = a), (r.exports = n.default);
      },
      function (r, n) {
        Object.defineProperty(n, "__esModule", { value: !0 });
        var a = (function () {
          function s(u, d) {
            for (var c = 0; c < d.length; c++) {
              var v = d[c];
              (v.enumerable = v.enumerable || !1),
                (v.configurable = !0),
                "value" in v && (v.writable = !0),
                Object.defineProperty(u, v.key, v);
            }
          }
          return function (u, d, c) {
            return d && s(u.prototype, d), c && s(u, c), u;
          };
        })();
        function i(s, u) {
          if (!(s instanceof u))
            throw new TypeError("Cannot call a class as a function");
        }
        var l = (function () {
          function s() {
            i(this, s);
          }
          return (
            a(s, [
              {
                key: "typeHtmlChars",
                value: function (d, c, v) {
                  if (v.contentType !== "html") return c;
                  var f = d.substr(c).charAt(0);
                  if (f === "<" || f === "&") {
                    var p = "";
                    for (
                      f === "<" ? (p = ">") : (p = ";");
                      d.substr(c + 1).charAt(0) !== p &&
                      (c++, !(c + 1 > d.length));

                    );
                    c++;
                  }
                  return c;
                },
              },
              {
                key: "backSpaceHtmlChars",
                value: function (d, c, v) {
                  if (v.contentType !== "html") return c;
                  var f = d.substr(c).charAt(0);
                  if (f === ">" || f === ";") {
                    var p = "";
                    for (
                      f === ">" ? (p = "<") : (p = "&");
                      d.substr(c - 1).charAt(0) !== p && (c--, !(c < 0));

                    );
                    c--;
                  }
                  return c;
                },
              },
            ]),
            s
          );
        })();
        n.default = l;
        var o = new l();
        n.htmlParser = o;
      },
    ]);
  });
})(Mu);
var U1 = rh(Mu.exports),
  Iu = { locks: {}, zIndex: 2e3, touchmoveForbid: !0 };
qe(Iu);
var Mt = qe(Iu);
function Si() {
  return (
    (Si =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Si.apply(this, arguments)
  );
}
var Pu = 250;
function nh(e) {
  var { zIndex: t, position: r } = window.getComputedStyle(e);
  (e.style.overflow = "hidden"),
    (e.style.overflowX = "hidden"),
    (e.style.overflowY = "hidden"),
    r === "static" && (e.style.position = "relative"),
    t === "auto" && (e.style.zIndex = "1");
}
function ah(e, t) {
  var { top: r, left: n } = e.getBoundingClientRect(),
    { clientWidth: a, clientHeight: i } = e,
    l = Math.sqrt(Math.pow(a, 2) + Math.pow(i, 2)) / 2,
    o = l * 2,
    s = t.touches[0].clientX - n,
    u = t.touches[0].clientY - r,
    d = (a - l * 2) / 2,
    c = (i - l * 2) / 2,
    v = s - l,
    f = u - l;
  return { x: v, y: f, centerX: d, centerY: c, size: o };
}
function Ou(e) {
  var t = this._ripple;
  if ((t.removeRipple(), !(t.disabled || t.tasker))) {
    var r = () => {
      var n;
      t.tasker = null;
      var { x: a, y: i, centerX: l, centerY: o, size: s } = ah(this, e),
        u = document.createElement("div");
      u.classList.add("var-ripple"),
        (u.style.opacity = "0"),
        (u.style.transform =
          "translate(" + a + "px, " + i + "px) scale3d(.3, .3, .3)"),
        (u.style.width = s + "px"),
        (u.style.height = s + "px"),
        (u.style.backgroundColor = (n = t.color) != null ? n : "currentColor"),
        (u.dataset.createdAt = String(performance.now())),
        nh(this),
        this.appendChild(u),
        window.setTimeout(() => {
          (u.style.transform =
            "translate(" + l + "px, " + o + "px) scale3d(1, 1, 1)"),
            (u.style.opacity = ".25");
        }, 20);
    };
    t.tasker = window.setTimeout(r, 60);
  }
}
function Hl() {
  var e = this._ripple,
    t = () => {
      var r = this.querySelectorAll(".var-ripple");
      if (!!r.length) {
        var n = r[r.length - 1],
          a = Pu - performance.now() + Number(n.dataset.createdAt);
        setTimeout(() => {
          (n.style.opacity = "0"),
            setTimeout(() => {
              var i;
              return (i = n.parentNode) == null ? void 0 : i.removeChild(n);
            }, Pu);
        }, a);
      }
    };
  e.tasker ? setTimeout(t, 60) : t();
}
function _u() {
  var e = this._ripple;
  !e.touchmoveForbid ||
    (e.tasker && window.clearTimeout(e.tasker), (e.tasker = null));
}
function ih(e, t) {
  var r, n, a;
  (e._ripple = Si({ tasker: null }, (r = t.value) != null ? r : {}, {
    touchmoveForbid:
      (n = (a = t.value) == null ? void 0 : a.touchmoveForbid) != null
        ? n
        : Mt.touchmoveForbid,
    removeRipple: Hl.bind(e),
  })),
    e.addEventListener("touchstart", Ou, { passive: !0 }),
    e.addEventListener("touchmove", _u, { passive: !0 }),
    e.addEventListener("dragstart", Hl, { passive: !0 }),
    document.addEventListener("touchend", e._ripple.removeRipple, {
      passive: !0,
    }),
    document.addEventListener("touchcancel", e._ripple.removeRipple, {
      passive: !0,
    });
}
function lh(e) {
  e.removeEventListener("touchstart", Ou),
    e.removeEventListener("touchmove", _u),
    e.removeEventListener("dragstart", Hl),
    document.removeEventListener("touchend", e._ripple.removeRipple),
    document.removeEventListener("touchcancel", e._ripple.removeRipple);
}
function oh(e, t) {
  var r, n, a;
  e._ripple = Si({}, e._ripple, (r = t.value) != null ? r : {}, {
    touchmoveForbid:
      (n = (a = t.value) == null ? void 0 : a.touchmoveForbid) != null
        ? n
        : Mt.touchmoveForbid,
    tasker: null,
  });
}
var lt = {
  mounted: ih,
  unmounted: lh,
  updated: oh,
  install(e) {
    e.directive("ripple", this);
  },
};
function sh(e) {
  return ["top", "bottom", "right", "left", "center"].includes(e);
}
var Va = {
  show: { type: Boolean, default: !1 },
  position: { type: String, default: "center", validator: sh },
  transition: { type: String },
  overlay: { type: Boolean, default: !0 },
  overlayClass: { type: String },
  overlayStyle: { type: Object },
  lockScroll: { type: Boolean, default: !0 },
  closeOnClickOverlay: { type: Boolean, default: !0 },
  teleport: { type: String },
  onOpen: { type: Function },
  onOpened: { type: Function },
  onClose: { type: Function },
  onClosed: { type: Function },
  onClickOverlay: { type: Function },
  onRouteChange: { type: Function },
  "onUpdate:show": { type: Function },
};
function Vu() {
  var e = Object.keys(Mt.locks).length;
  e <= 0
    ? document.body.classList.remove("var--lock")
    : document.body.classList.add("var--lock");
}
function Ti(e) {
  (Mt.locks[e] = 1), Vu();
}
function $i(e) {
  delete Mt.locks[e], Vu();
}
function Nu(e, t, r) {
  var { uid: n } = Rr();
  r &&
    me(
      () => e[r],
      (a) => {
        a === !1 ? $i(n) : a === !0 && e[t] === !0 && Ti(n);
      }
    ),
    me(
      () => e[t],
      (a) => {
        (r && e[r] === !1) || (a === !0 ? Ti(n) : $i(n));
      }
    ),
    Ss(() => {
      (r && e[r] === !1) || (e[t] === !0 && Ti(n));
    }),
    Kt(() => {
      (r && e[r] === !1) || (e[t] === !0 && $i(n));
    }),
    ui(() => {
      (r && e[r] === !1) || (e[t] === !0 && Ti(n));
    }),
    di(() => {
      (r && e[r] === !1) || (e[t] === !0 && $i(n));
    });
}
function Wl(e, t) {
  var r = D(Mt.zIndex);
  return (
    me(
      e,
      (n) => {
        n && ((Mt.zIndex += t), (r.value = Mt.zIndex));
      },
      { immediate: !0 }
    ),
    { zIndex: r }
  );
}
var R = (e) =>
    e == null
      ? 0
      : Tt(e)
      ? ((e = parseFloat(e)), (e = Number.isNaN(e) ? 0 : e), e)
      : jl(e)
      ? Number(e)
      : e,
  Au = (e) =>
    e == null
      ? !1
      : e.startsWith("data:image") || /\.(png|jpg|gif|jpeg|svg)$/.test(e),
  Du = (e) =>
    e == null ? !1 : e.startsWith("data:video") || /\.(mp4|webm|ogg)$/.test(e),
  Tt = (e) => typeof e == "string",
  jl = (e) => typeof e == "boolean",
  At = (e) => typeof e == "number",
  Kl = (e) => Object.prototype.toString.call(e) === "[object Object]",
  He = (e) => Array.isArray(e),
  uh = (e) => (e ? /^(http)|(\.*\/)/.test(e) : !1),
  fr = (e) => e == null || e === "" || (Array.isArray(e) && !e.length),
  Ei = (e, t) => {
    if (e.length) {
      var r = e.indexOf(t);
      if (r > -1) return e.splice(r, 1);
    }
  },
  ql = (e, t = 200) => {
    var r,
      n = 0;
    return function a(...i) {
      var l = Date.now(),
        o = l - n;
      n || (n = l),
        r && window.clearTimeout(r),
        o >= t
          ? (e.apply(this, i), (n = l))
          : (r = window.setTimeout(() => {
              a.apply(this, i);
            }, t - o));
    };
  },
  dh = (e) => {
    var t = [];
    return {
      cache: t,
      has(r) {
        return this.cache.includes(r);
      },
      add(r) {
        this.has(r) ||
          (this.cache.length === e && t.shift(), this.cache.push(r));
      },
      remove(r) {
        this.has(r) && Ei(this.cache, r);
      },
      clear() {
        this.cache.length = 0;
      },
    };
  },
  Bu = (e) => e,
  Fu = (e) => Math.pow(e, 3),
  Lu = (e) => (e < 0.5 ? Fu(e * 2) / 2 : 1 - Fu((1 - e) * 2) / 2);
function vh(e, t) {
  var r = Object.values(t),
    n = ["DD", "HH", "mm", "ss"],
    a = [24, 60, 60, 1e3];
  if (
    (n.forEach((l, o) => {
      e.includes(l)
        ? (e = e.replace(l, String(r[o]).padStart(2, "0")))
        : (r[o + 1] += r[o] * a[o]);
    }),
    e.includes("S"))
  ) {
    var i = String(r[r.length - 1]).padStart(3, "0");
    e.includes("SSS")
      ? (e = e.replace("SSS", i))
      : e.includes("SS")
      ? (e = e.replace("SS", i.slice(0, 2)))
      : (e = e.replace("S", i.slice(0, 1)));
  }
  return e;
}
var Mi = (e, t) => (e == null ? t : e),
  Xl = () => typeof window != "undefined",
  zu = (e) => [...new Set(e)];
function ch(e) {
  var t = /([^-])([A-Z])/g;
  return e.replace(t, "$1-$2").replace(t, "$1-$2").toLowerCase();
}
var fh = ["collect", "clear"];
function Ru(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Uu(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        Ru(i, n, a, l, o, "next", s);
      }
      function o(s) {
        Ru(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
function hh(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    a,
    i;
  for (i = 0; i < n.length; i++)
    (a = n[i]), !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function Ii() {
  return (
    (Ii =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Ii.apply(this, arguments)
  );
}
function Dt(e, t) {
  return Array.isArray(t) ? t.reduce((r, n) => ((r[n] = e[n]), r), {}) : e[t];
}
function ph(e) {
  var t = xf(e),
    r = document.createElement("div");
  return (
    document.body.appendChild(r),
    {
      instance: t.mount(r),
      unmount() {
        t.unmount(), document.body.removeChild(r);
      },
    }
  );
}
function Na(e, t = {}, r = {}) {
  var n = {
      setup() {
        return () => Ll(e, Ii({}, t, r));
      },
    },
    { unmount: a } = ph(n);
  return { unmountInstance: a };
}
function mh(e) {
  var t = [],
    r = (n) => {
      if (n != null && n.component) {
        r(n == null ? void 0 : n.component.subTree);
        return;
      }
      Array.isArray(n == null ? void 0 : n.children) &&
        n.children.forEach((a) => {
          Lr(a) && (t.push(a), r(a));
        });
    };
  return r(e), t;
}
function Gt(e) {
  var t = qe([]),
    r = Rr(),
    n = () => {
      var o = mh(r.subTree);
      t.sort((s, u) => o.indexOf(s.vnode) - o.indexOf(u.vnode));
    },
    a = (o) => {
      t.push(o), n();
    },
    i = (o) => {
      Ei(t, o);
    };
  hl(e, { collect: a, clear: i, instances: t });
  var l = j(() => t.length);
  return { length: l };
}
function Zt(e) {
  if (!Yu(e)) return { index: null };
  var t = ba(e),
    { collect: r, clear: n, instances: a } = t,
    i = Rr();
  rt(() => {
    Ye().then(() => r(i));
  }),
    Kt(() => {
      Ye().then(() => n(i));
    });
  var l = j(() => a.indexOf(i));
  return { index: l };
}
function Bt(e) {
  var t = [],
    r = (i) => {
      t.push(i);
    },
    n = (i) => {
      Ei(t, i);
    },
    a = (i) => {
      hl(e, Ii({ collect: r, clear: n }, i));
    };
  return { childProviders: t, bindChildren: a };
}
function Ft(e) {
  if (!Yu(e)) return { parentProvider: null, bindParent: null };
  var t = ba(e),
    { collect: r, clear: n } = t,
    a = hh(t, fh),
    i = (l) => {
      rt(() => r(l)), ka(() => n(l));
    };
  return { parentProvider: a, bindParent: i };
}
function Yu(e) {
  var t = Rr();
  return e in t.provides;
}
function Lt() {
  var e = D(""),
    t = (function () {
      var a = Uu(function* (i, l, o) {
        if (!He(i) || !i.length) return !0;
        var s = yield Promise.all(i.map((u) => u(l, o)));
        return !s.some((u) => (u !== !0 ? ((e.value = String(u)), !0) : !1));
      });
      return function (l, o, s) {
        return a.apply(this, arguments);
      };
    })(),
    r = () => {
      e.value = "";
    },
    n = (function () {
      var a = Uu(function* (i, l, o, s, u) {
        i.includes(l) && (yield t(o, s, u)) && (e.value = "");
      });
      return function (l, o, s, u, d) {
        return a.apply(this, arguments);
      };
    })();
  return {
    errorMessage: e,
    validate: t,
    resetValidation: r,
    validateWithTrigger: n,
  };
}
function gh(e) {
  rt(() => {
    window.addEventListener("hashchange", e),
      window.addEventListener("popstate", e);
  }),
    Kt(() => {
      window.removeEventListener("hashchange", e),
        window.removeEventListener("popstate", e);
    });
}
function Gl() {
  var e = D(!1);
  return (
    ui(() => {
      e.value = !1;
    }),
    di(() => {
      e.value = !0;
    }),
    { disabled: e }
  );
}
function Zl() {
  return (
    (Zl =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Zl.apply(this, arguments)
  );
}
function yh(e) {
  return (
    typeof e == "function" ||
    (Object.prototype.toString.call(e) === "[object Object]" && !Lr(e))
  );
}
var zt = ve({
  name: "VarPopup",
  inheritAttrs: !1,
  props: Va,
  setup(e, { slots: t, attrs: r }) {
    var { zIndex: n } = Wl(() => e.show, 3),
      { disabled: a } = Gl(),
      i = () => {
        var u,
          { closeOnClickOverlay: d, onClickOverlay: c } = e;
        c == null || c(),
          !!d && ((u = e["onUpdate:show"]) == null || u.call(e, !1));
      };
    Nu(e, "show", "lockScroll"),
      me(
        () => e.show,
        (u) => {
          var { onOpen: d, onClose: c } = e;
          u ? d == null || d() : c == null || c();
        }
      ),
      gh(() => (e.onRouteChange == null ? void 0 : e.onRouteChange()));
    var l = () => {
        var { overlayClass: u, overlayStyle: d } = e;
        return ee(
          "div",
          {
            class: ["var-popup__overlay", u],
            style: Zl({ zIndex: n.value - 1 }, d),
            onClick: i,
          },
          null
        );
      },
      o = () =>
        ee(
          "div",
          Xe(
            {
              class: [
                "var-popup__content",
                "var-elevation--3",
                "var-popup--" + e.position,
              ],
              style: { zIndex: n.value },
            },
            r
          ),
          [t.default == null ? void 0 : t.default()]
        ),
      s = () => {
        var {
          onOpened: u,
          onClosed: d,
          show: c,
          overlay: v,
          transition: f,
          position: p,
        } = e;
        return ee(
          at,
          { name: "var-fade", onAfterEnter: u, onAfterLeave: d },
          {
            default: () => [
              Re(
                ee(
                  "div",
                  {
                    class: "var--box var-popup",
                    style: { zIndex: n.value - 2 },
                  },
                  [
                    v && l(),
                    ee(
                      at,
                      { name: f || "var-pop-" + p },
                      { default: () => [c && o()] }
                    ),
                  ]
                ),
                [[Oa, c]]
              ),
            ],
          }
        );
      };
    return () => {
      var { teleport: u } = e;
      if (u) {
        var d;
        return ee(
          El,
          { to: u, disabled: a.value },
          yh((d = s())) ? d : { default: () => [d] }
        );
      }
      return s();
    };
  },
});
zt.install = function (e) {
  e.component(zt.name, zt);
};
var Hu = {
  name: { type: String },
  size: { type: [Number, String] },
  color: { type: String },
  namespace: { type: String, default: "var-icon" },
  transition: { type: [Number, String], default: 0 },
  onClick: { type: Function },
};
function Wu(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function bh(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        Wu(i, n, a, l, o, "next", s);
      }
      function o(s) {
        Wu(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
function ju(e) {
  var { left: t } = e.getBoundingClientRect();
  return t + (document.body.scrollLeft || document.documentElement.scrollLeft);
}
function Ku(e) {
  var { top: t } = e.getBoundingClientRect();
  return t + (document.body.scrollTop || document.documentElement.scrollTop);
}
function Jl(e) {
  var t = "scrollTop" in e ? e.scrollTop : e.pageYOffset;
  return Math.max(t, 0);
}
function Ql(e) {
  var t = "scrollLeft" in e ? e.scrollLeft : e.pageXOffset;
  return Math.max(t, 0);
}
function Ch(e) {
  return xl.apply(this, arguments);
}
function xl() {
  return (
    (xl = bh(function* (e) {
      yield Eh();
      var { top: t, bottom: r, left: n, right: a } = e.getBoundingClientRect(),
        { innerWidth: i, innerHeight: l } = window,
        o = n <= i && a >= 0,
        s = t <= l && r >= 0;
      return o && s;
    })),
    xl.apply(this, arguments)
  );
}
function eo(e) {
  var { transform: t } = window.getComputedStyle(e);
  return +t.slice(t.lastIndexOf(",") + 2, t.length - 1);
}
function wh(e) {
  var { width: t, height: r } = e.getBoundingClientRect();
  return t === 0 && r === 0;
}
function Aa(e) {
  for (
    var t = e;
    t &&
    !(
      !t.parentNode ||
      ((t = t.parentNode),
      t === document.body || t === document.documentElement)
    );

  ) {
    var r = /(scroll|auto)/,
      { overflowY: n, overflow: a } = window.getComputedStyle(t);
    if (r.test(n) || r.test(a)) return t;
  }
  return window;
}
function kh(e) {
  for (var t = [], r = e; r !== window; ) (r = Aa(r)), t.push(r);
  return t;
}
var qu = (e) => Tt(e) && e.endsWith("rem"),
  Sh = (e) => (Tt(e) && e.endsWith("px")) || At(e),
  Th = (e) => Tt(e) && e.endsWith("%"),
  Xu = (e) => Tt(e) && e.endsWith("vw"),
  Gu = (e) => Tt(e) && e.endsWith("vh"),
  Jt = (e) => {
    if (At(e)) return e;
    if (Sh(e)) return +e.replace("px", "");
    if (Xu(e)) return (+e.replace("vw", "") * window.innerWidth) / 100;
    if (Gu(e)) return (+e.replace("vh", "") * window.innerHeight) / 100;
    if (qu(e)) {
      var t = +e.replace("rem", ""),
        r = window.getComputedStyle(document.documentElement).fontSize;
      return t * parseFloat(r);
    }
    return Tt(e) ? R(e) : 0;
  },
  ot = (e) => {
    if (e != null) return Th(e) || Xu(e) || Gu(e) || qu(e) ? e : Jt(e) + "px";
  };
function ar(e) {
  return globalThis.requestAnimationFrame
    ? globalThis.requestAnimationFrame(e)
    : globalThis.setTimeout(e, 16);
}
function $h(e) {
  globalThis.cancelAnimationFrame
    ? globalThis.cancelAnimationFrame(e)
    : globalThis.clearTimeout(e);
}
function Zu(e) {
  ar(() => {
    ar(e);
  });
}
function Eh() {
  return new Promise((e) => {
    ar(() => {
      ar(e);
    });
  });
}
function Pi(e, { top: t = 0, left: r = 0, duration: n = 300, animation: a }) {
  var i = Date.now(),
    l = Jl(e),
    o = Ql(e);
  return new Promise((s) => {
    var u = () => {
      var d = (Date.now() - i) / n;
      if (d < 1) {
        var c = l + (t - l) * a(d),
          v = o + (r - o) * a(d);
        e.scrollTo(v, c), ar(u);
      } else e.scrollTo(r, t), s();
    };
    ar(u);
  });
}
function Ju(e) {
  return Object.entries(e != null ? e : {}).reduce((t, [r, n]) => {
    var a = r.startsWith("--") ? r : "--" + ch(r);
    return (t[a] = n), t;
  }, {});
}
function Qu(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Mh(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        Qu(i, n, a, l, o, "next", s);
      }
      function o(s) {
        Qu(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
function Ih(e, t) {
  return (
    T(),
    Ie(
      hi(e.isURL(e.name) ? "img" : "i"),
      {
        class: Y([
          "var-icon",
          [
            e.namespace + "--set",
            e.isURL(e.name)
              ? "var-icon__image"
              : e.namespace + "-" + e.nextName,
            e.shrinking ? "var-icon--shrinking" : null,
          ],
        ]),
        style: J({
          color: e.color,
          transition: "transform " + e.toNumber(e.transition) + "ms",
          width: e.isURL(e.name) ? e.toSizeUnit(e.size) : null,
          height: e.isURL(e.name) ? e.toSizeUnit(e.size) : null,
          fontSize: e.toSizeUnit(e.size),
        }),
        src: e.isURL(e.name) ? e.nextName : null,
        onClick: e.onClick,
      },
      null,
      8,
      ["class", "style", "src", "onClick"]
    )
  );
}
var We = ve({
  render: Ih,
  name: "VarIcon",
  props: Hu,
  setup(e) {
    var t = D(""),
      r = D(!1),
      n = (function () {
        var a = Mh(function* (i, l) {
          var { transition: o } = e;
          if (l == null || R(o) === 0) {
            t.value = i;
            return;
          }
          (r.value = !0),
            yield Ye(),
            setTimeout(() => {
              l != null && (t.value = i), (r.value = !1);
            }, R(o));
        });
        return function (l, o) {
          return a.apply(this, arguments);
        };
      })();
    return (
      me(() => e.name, n, { immediate: !0 }),
      { nextName: t, shrinking: r, isURL: uh, toNumber: R, toSizeUnit: ot }
    );
  },
});
We.install = function (e) {
  e.component(We.name, We);
};
function to() {
  return (
    (to =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    to.apply(this, arguments)
  );
}
var Ph = to(
    {
      show: { type: Boolean, default: !1 },
      actions: { type: Array, default: () => [] },
      title: { type: String },
      closeOnClickAction: { type: Boolean, default: !0 },
      onSelect: { type: Function },
      "onUpdate:show": { type: Function },
    },
    Dt(Va, [
      "overlay",
      "overlayClass",
      "overlayStyle",
      "lockScroll",
      "closeOnClickOverlay",
      "teleport",
      "onOpen",
      "onClose",
      "onOpened",
      "onClosed",
      "onClickOverlay",
      "onRouteChange",
    ])
  ),
  Oh = {
    dialogTitle: "\u63D0\u793A",
    dialogConfirmButtonText: "\u786E\u8BA4",
    dialogCancelButtonText: "\u53D6\u6D88",
    actionSheetTitle: "\u8BF7\u9009\u62E9",
    listLoadingText: "\u52A0\u8F7D\u4E2D",
    listFinishedText: "\u6CA1\u6709\u66F4\u591A\u4E86",
    listErrorText: "\u52A0\u8F7D\u5931\u8D25",
    pickerTitle: "\u8BF7\u9009\u62E9",
    pickerConfirmButtonText: "\u786E\u8BA4",
    pickerCancelButtonText: "\u53D6\u6D88",
    datePickerMonthDict: {
      "01": { name: "\u4E00\u6708", abbr: "\u4E00\u6708" },
      "02": { name: "\u4E8C\u6708", abbr: "\u4E8C\u6708" },
      "03": { name: "\u4E09\u6708", abbr: "\u4E09\u6708" },
      "04": { name: "\u56DB\u6708", abbr: "\u56DB\u6708" },
      "05": { name: "\u4E94\u6708", abbr: "\u4E94\u6708" },
      "06": { name: "\u516D\u6708", abbr: "\u516D\u6708" },
      "07": { name: "\u4E03\u6708", abbr: "\u4E03\u6708" },
      "08": { name: "\u516B\u6708", abbr: "\u516B\u6708" },
      "09": { name: "\u4E5D\u6708", abbr: "\u4E5D\u6708" },
      10: { name: "\u5341\u6708", abbr: "\u5341\u6708" },
      11: { name: "\u5341\u4E00\u6708", abbr: "\u5341\u4E00\u6708" },
      12: { name: "\u5341\u4E8C\u6708", abbr: "\u5341\u4E8C\u6708" },
    },
    datePickerWeekDict: {
      0: { name: "\u661F\u671F\u65E5", abbr: "\u65E5" },
      1: { name: "\u661F\u671F\u4E00", abbr: "\u4E00" },
      2: { name: "\u661F\u671F\u4E8C", abbr: "\u4E8C" },
      3: { name: "\u661F\u671F\u4E09", abbr: "\u4E09" },
      4: { name: "\u661F\u671F\u56DB", abbr: "\u56DB" },
      5: { name: "\u661F\u671F\u4E94", abbr: "\u4E94" },
      6: { name: "\u661F\u671F\u516D", abbr: "\u516D" },
    },
    datePickerSelected: "\u4E2A\u88AB\u9009\u62E9",
    paginationItem: "\u6761",
    paginationPage: "\u9875",
    paginationJump: "\u524D\u5F80",
  };
function ro() {
  return (
    (ro =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    ro.apply(this, arguments)
  );
}
function xu() {
  var e = {},
    t = D({}),
    r = (i, l) => {
      (l.lang = i), (e[i] = l);
    },
    n = (i) => {
      if (!e[i])
        return (
          console.warn(
            "The " +
              i +
              " does not exist. You can mount a language package using the add method"
          ),
          {}
        );
      t.value = e[i];
    },
    a = (i, l) => {
      if (!e[i]) {
        console.warn(
          "The " +
            i +
            " does not exist. You can mount a language package using the add method"
        );
        return;
      }
      (e[i] = ro({}, e[i], l)), n(i);
    };
  return { packs: e, pack: t, add: r, use: n, merge: a };
}
var { packs: _h, pack: st, add: ed, use: td, merge: Vh } = xu();
ed("zh-CN", Oh);
td("zh-CN");
var no = { packs: _h, pack: st, add: ed, use: td, merge: Vh, useLocale: xu },
  Nh = { class: "var-action-sheet__title" },
  Ah = ["onClick"],
  Dh = { class: "var-action-sheet__action-name" };
function Bh(e, t) {
  var r = fe("var-icon"),
    n = fe("var-popup"),
    a = ht("ripple");
  return (
    T(),
    Ie(
      n,
      Xe(
        {
          class: "var-action-sheet__popup-radius",
          position: "bottom",
          overlay: e.overlay,
          "overlay-class": e.overlayClass,
          "overlay-style": e.overlayStyle,
          "lock-scroll": e.lockScroll,
          "close-on-click-overlay": e.closeOnClickOverlay,
          teleport: e.teleport,
          show: e.popupShow,
        },
        {
          "onUpdate:show": (i) => {
            var l, o;
            return (l = (o = e.$props)["onUpdate:show"]) == null
              ? void 0
              : l.call(o, i);
          },
        },
        {
          onOpen: e.onOpen,
          onClose: e.onClose,
          onClosed: e.onClosed,
          onOpened: e.onOpened,
          onRouteChange: e.onRouteChange,
        }
      ),
      {
        default: Ee(() => [
          B(
            "div",
            Xe({ class: "var-action-sheet var--box" }, e.$attrs),
            [
              Z(e.$slots, "title", {}, () => [
                B("div", Nh, ie(e.dt(e.title, e.pack.actionSheetTitle)), 1),
              ]),
              Z(e.$slots, "actions", {}, () => [
                (T(!0),
                _(
                  Pe,
                  null,
                  Ze(e.actions, (i) =>
                    Re(
                      (T(),
                      _(
                        "div",
                        {
                          class: Y([
                            "var-action-sheet__action-item",
                            [
                              i.className,
                              i.disabled ? "var-action-sheet--disabled" : null,
                            ],
                          ]),
                          key: i.name,
                          style: J({ color: i.color }),
                          onClick: (l) => e.handleSelect(i),
                        },
                        [
                          i.icon
                            ? (T(),
                              Ie(
                                r,
                                {
                                  key: 0,
                                  class: "var-action-sheet__action-icon",
                                  "var-action-sheet-cover": "",
                                  name: i.icon,
                                  size: i.iconSize,
                                },
                                null,
                                8,
                                ["name", "size"]
                              ))
                            : de("v-if", !0),
                          B("div", Dh, ie(i.name), 1),
                        ],
                        14,
                        Ah
                      )),
                      [[a, { disabled: i.disabled }]]
                    )
                  ),
                  128
                )),
              ]),
            ],
            16
          ),
        ]),
        _: 3,
      },
      16,
      [
        "overlay",
        "overlay-class",
        "overlay-style",
        "lock-scroll",
        "close-on-click-overlay",
        "teleport",
        "show",
        "onOpen",
        "onClose",
        "onClosed",
        "onOpened",
        "onRouteChange",
      ]
    )
  );
}
var jr = ve({
    render: Bh,
    name: "VarActionSheet",
    directives: { Ripple: lt },
    components: { VarPopup: zt, VarIcon: We },
    inheritAttrs: !1,
    props: Ph,
    setup(e) {
      var t = D(!1),
        r = (n) => {
          var a;
          if (!n.disabled) {
            var { closeOnClickAction: i, onSelect: l } = e;
            l == null || l(n),
              i && ((a = e["onUpdate:show"]) == null || a.call(e, !1));
          }
        };
      return (
        me(
          () => e.show,
          (n) => {
            t.value = n;
          },
          { immediate: !0 }
        ),
        { popupShow: t, pack: st, dt: Mi, handleSelect: r }
      );
    },
  }),
  hr;
function Kr(e) {
  return Xl()
    ? new Promise((t) => {
        Kr.close();
        var r = qe(e);
        (r.teleport = "body"), (hr = r);
        var { unmountInstance: n } = Na(jr, r, {
          onSelect: (a) => {
            r.onSelect == null || r.onSelect(a), t(a);
          },
          onClose: () => {
            r.onClose == null || r.onClose(), t("close");
          },
          onClosed: () => {
            r.onClosed == null || r.onClosed(), n(), hr === r && (hr = null);
          },
          onRouteChange: () => {
            n(), hr === r && (hr = null);
          },
          "onUpdate:show": (a) => {
            r.show = a;
          },
        });
        r.show = !0;
      })
    : Promise.resolve();
}
Kr.Component = jr;
jr.install = function (e) {
  e.component(jr.name, jr);
};
Kr.close = () => {
  if (hr != null) {
    var e = hr;
    (hr = null),
      Ye().then(() => {
        e.show = !1;
      });
  }
};
Kr.install = function (e) {
  e.component(jr.name, jr);
};
function Fh(e) {
  var t = ["left", "center", "right"];
  return t.includes(e);
}
var Lh = {
    color: { type: String },
    textColor: { type: String },
    title: { type: String },
    titlePosition: { type: String, default: "left", validator: Fh },
    elevation: { type: Boolean, default: !0 },
  },
  zh = { class: "var-app-bar__left" },
  Rh = { key: 0, class: "var-app-bar__title" },
  Uh = { class: "var-app-bar__right" };
function Yh(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: Y(["var-app-bar", { "var-elevation--3": e.elevation }]),
        style: J({ background: e.color, color: e.textColor }),
      },
      [
        B("div", zh, [
          Z(e.$slots, "left"),
          e.titlePosition === "left"
            ? (T(),
              _(
                "div",
                {
                  key: 0,
                  class: "var-app-bar__title",
                  style: J({ paddingLeft: e.$slots.left ? 0 : void 0 }),
                },
                [Z(e.$slots, "default", {}, () => [Oe(ie(e.title), 1)])],
                4
              ))
            : de("v-if", !0),
        ]),
        e.titlePosition === "center"
          ? (T(),
            _("div", Rh, [
              Z(e.$slots, "default", {}, () => [Oe(ie(e.title), 1)]),
            ]))
          : de("v-if", !0),
        B("div", Uh, [
          e.titlePosition === "right"
            ? (T(),
              _(
                "div",
                {
                  key: 0,
                  class: "var-app-bar__title",
                  style: J({ paddingRight: e.$slots.right ? 0 : void 0 }),
                },
                [Z(e.$slots, "default", {}, () => [Oe(ie(e.title), 1)])],
                4
              ))
            : de("v-if", !0),
          Z(e.$slots, "right"),
        ]),
      ],
      6
    )
  );
}
var gn = ve({ render: Yh, name: "VarAppBar", props: Lh });
gn.install = function (e) {
  e.component(gn.name, gn);
};
function Hh(e) {
  return ["circle", "wave", "cube", "rect", "disappear"].includes(e);
}
function Wh(e) {
  return ["normal", "mini", "small", "large"].includes(e);
}
var Da = {
    type: { type: String, default: "circle", validator: Hh },
    radius: { type: [String, Number] },
    size: { type: String, default: "normal", validator: Wh },
    color: { type: String, default: "currentColor" },
    description: { type: String },
    loading: { type: Boolean, default: !1 },
  },
  jh = (e) => (vl(""), (e = e()), cl(), e),
  Kh = { class: "var-loading" },
  qh = { key: 0, class: "var-loading__circle" },
  Xh = jh(() =>
    B(
      "svg",
      { viewBox: "25 25 50 50" },
      [B("circle", { cx: "50", cy: "50", r: "20", fill: "none" })],
      -1
    )
  ),
  Gh = [Xh];
function Zh(e, t) {
  return (
    T(),
    _("div", Kh, [
      e.$slots.default
        ? (T(),
          _(
            "div",
            {
              key: 0,
              class: Y([
                "var-loading__content",
                [e.loading ? "var-loading__content--active" : null],
              ]),
            },
            [Z(e.$slots, "default")],
            2
          ))
        : de("v-if", !0),
      e.isShow
        ? (T(),
          _(
            "div",
            {
              key: 1,
              class: Y([
                "var--box var-loading__body",
                [e.$slots.default ? "var-loading__inside" : null],
              ]),
            },
            [
              e.type === "circle"
                ? (T(),
                  _("div", qh, [
                    B(
                      "span",
                      {
                        class: "var-loading__circle-block",
                        style: J({
                          width: e.getRadius * 2 + "px",
                          height: e.getRadius * 2 + "px",
                          color: e.color,
                        }),
                      },
                      Gh,
                      4
                    ),
                  ]))
                : de("v-if", !0),
              (T(!0),
              _(
                Pe,
                null,
                Ze(
                  e.loadingTypeDict,
                  (r, n) => (
                    T(),
                    _(
                      Pe,
                      { key: n },
                      [
                        e.type === n
                          ? (T(),
                            _(
                              "div",
                              {
                                key: 0,
                                class: Y(
                                  "var-loading__" +
                                    n +
                                    " var-loading__" +
                                    n +
                                    "-" +
                                    e.size
                                ),
                              },
                              [
                                (T(!0),
                                _(
                                  Pe,
                                  null,
                                  Ze(
                                    r,
                                    (a) => (
                                      T(),
                                      _(
                                        "div",
                                        {
                                          key: a + n,
                                          style: J({
                                            backgroundColor: e.color,
                                          }),
                                          class: Y(
                                            "var-loading__" +
                                              n +
                                              "-item var-loading__" +
                                              n +
                                              "-item-" +
                                              e.size
                                          ),
                                        },
                                        null,
                                        6
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              2
                            ))
                          : de("v-if", !0),
                      ],
                      64
                    )
                  )
                ),
                128
              )),
              e.$slots.description || e.description
                ? (T(),
                  _(
                    "div",
                    {
                      key: 1,
                      class: Y([
                        "var-loading__description",
                        "var-loading__description--" + e.size,
                      ]),
                      style: J({ color: e.color }),
                    },
                    [
                      Z(e.$slots, "description", {}, () => [
                        Oe(ie(e.description), 1),
                      ]),
                    ],
                    6
                  ))
                : de("v-if", !0),
            ],
            2
          ))
        : de("v-if", !0),
    ])
  );
}
var Qt = ve({
  render: Zh,
  name: "VarLoading",
  props: Da,
  setup(e, { slots: t }) {
    var r = { wave: 5, cube: 4, rect: 8, disappear: 3 },
      n = { mini: 9, small: 12, normal: 15, large: 18 },
      a = j(() => (e.radius ? R(e.radius) : n[e.size])),
      i = j(() => (t.default != null && t.default() ? e.loading : !0));
    return { loadingTypeDict: r, getRadius: a, isShow: i };
  },
});
Qt.install = function (e) {
  e.component(Qt.name, Qt);
};
function Jh(e) {
  return [
    "default",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
  ].includes(e);
}
function Qh(e) {
  return ["normal", "mini", "small", "large"].includes(e);
}
var xh = {
    type: { type: String, default: "default", validator: Jh },
    size: { type: String, default: "normal", validator: Qh },
    loading: { type: Boolean, default: !1 },
    round: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 },
    text: { type: Boolean, default: !1 },
    outline: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    ripple: { type: Boolean, default: !0 },
    color: { type: String },
    textColor: { type: String },
    loadingRadius: { type: [Number, String], default: 12 },
    loadingType: Dt(Da, "type"),
    loadingSize: Dt(Da, "size"),
    onClick: { type: Function },
    onTouchstart: { type: Function },
  },
  ep = ["disabled"];
function tp(e, t) {
  var r = fe("var-loading"),
    n = ht("ripple");
  return Re(
    (T(),
    _(
      "button",
      {
        class: Y([
          "var-button var--box",
          [
            "var-button--" + e.size,
            e.block ? "var--flex var-button--block" : "var--inline-flex",
            e.disabled ? "var-button--disabled" : null,
            e.text ? "var-button--text-" + e.type : "var-button--" + e.type,
            e.text ? "var-button--text" : "var-elevation--2",
            e.text && e.disabled ? "var-button--text-disabled" : null,
            e.round ? "var-button--round" : null,
            e.outline ? "var-button--outline" : null,
          ],
        ]),
        style: J({ color: e.textColor, background: e.color }),
        disabled: e.disabled,
        onClick:
          t[0] || (t[0] = (...a) => e.handleClick && e.handleClick(...a)),
        onTouchstart:
          t[1] ||
          (t[1] = (...a) => e.handleTouchstart && e.handleTouchstart(...a)),
      },
      [
        e.loading
          ? (T(),
            Ie(
              r,
              {
                key: 0,
                class: "var-button__loading",
                type: e.loadingType,
                size: e.loadingSize,
                radius: e.loadingRadius,
              },
              null,
              8,
              ["type", "size", "radius"]
            ))
          : de("v-if", !0),
        B(
          "div",
          {
            class: Y([
              "var-button__content",
              [e.loading ? "var-button--hidden" : null],
            ]),
          },
          [Z(e.$slots, "default")],
          2
        ),
      ],
      46,
      ep
    )),
    [[n, { disabled: e.disabled || !e.ripple }]]
  );
}
var It = ve({
  render: tp,
  name: "VarButton",
  components: { VarLoading: Qt },
  directives: { Ripple: lt },
  props: xh,
  setup(e) {
    var t = (n) => {
        var { loading: a, disabled: i, onClick: l } = e;
        a || i || l == null || l(n);
      },
      r = (n) => {
        var { loading: a, disabled: i, onTouchstart: l } = e;
        a || i || l == null || l(n);
      };
    return { handleClick: t, handleTouchstart: r };
  },
});
It.install = function (e) {
  e.component(It.name, It);
};
var rp = {
  visibilityHeight: { type: [Number, String], default: 200 },
  duration: { type: Number, default: 300 },
  target: { type: String },
  onClick: { type: Function },
};
function np(e, t) {
  var r = fe("var-icon"),
    n = fe("var-button");
  return (
    T(),
    _(
      "div",
      {
        class: Y(["var-back-top", [e.show ? "var-back-top--active" : null]]),
        onClick:
          t[0] || (t[0] = mn((...a) => e.click && e.click(...a), ["stop"])),
      },
      [
        Z(e.$slots, "default", {}, () => [
          ee(
            n,
            { type: "primary", round: "", "var-back-top-cover": "" },
            { default: Ee(() => [ee(r, { name: "chevron-up" })]), _: 1 }
          ),
        ]),
      ],
      2
    )
  );
}
var yn = ve({
  render: np,
  name: "VarBackTop",
  components: { VarButton: It, VarIcon: We },
  props: rp,
  setup(e) {
    var t,
      r = D(!1),
      n = () => {
        e.onClick == null || e.onClick();
        var o = Ql(t);
        Pi(t, { left: o, duration: e.duration, animation: Lu });
      },
      a = () => {
        r.value = Jl(t) >= R(e.visibilityHeight);
      },
      i = ql(a, 200),
      l = () => {
        if (!Tt(e.target))
          throw Error(
            '[Varlet] BackTop: type of prop "target" should be a string'
          );
        var o = document.querySelector(e.target);
        if (!o) throw Error('[Varlet] BackTop: "target" should be a selector');
        return o;
      };
    return (
      rt(() => {
        (t = e.target ? l() : window), t.addEventListener("scroll", i);
      }),
      ka(() => {
        t.removeEventListener("scroll", i);
      }),
      { show: r, click: n }
    );
  },
});
yn.install = function (e) {
  e.component(yn.name, yn);
};
function ap(e) {
  return [
    "default",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
  ].includes(e);
}
function ip(e) {
  return ["right-top", "right-bottom", "left-top", "left-bottom"].includes(e);
}
var lp = {
    type: { type: String, default: "default", validator: ap },
    hidden: { type: Boolean, default: !1 },
    dot: { type: Boolean, default: !1 },
    value: { type: [String, Number], default: 0 },
    maxValue: { type: [String, Number] },
    color: { type: String },
    position: { type: String, default: "right-top", validator: ip },
    icon: { type: String },
  },
  op = { class: "var-badge var--box" },
  sp = { key: 1 };
function up(e, t) {
  var r = fe("var-icon");
  return (
    T(),
    _("div", op, [
      ee(
        at,
        { name: "var-badge-fade" },
        {
          default: Ee(() => [
            Re(
              B(
                "span",
                Xe(e.$attrs, {
                  class: ["var-badge__content", e.contentClass],
                  style: { background: e.color },
                }),
                [
                  e.icon && !e.dot
                    ? (T(),
                      Ie(r, { key: 0, name: e.icon, size: "10px" }, null, 8, [
                        "name",
                      ]))
                    : (T(), _("span", sp, ie(e.values), 1)),
                ],
                16
              ),
              [[Oa, !e.hidden]]
            ),
          ]),
          _: 1,
        }
      ),
      Z(e.$slots, "default"),
    ])
  );
}
var bn = ve({
  render: up,
  name: "VarBadge",
  components: { VarIcon: We },
  inheritAttrs: !1,
  props: lp,
  setup(e, { slots: t }) {
    var r = j(() => {
        var { type: i, position: l, dot: o, icon: s } = e,
          u =
            (t.default == null ? void 0 : t.default()) &&
            "var-badge__position var-badge--" + l,
          d = o && "var-badge__dot",
          c = a(),
          v = s && "var-badge__icon";
        return ["var-badge--" + i, u, d, c, v];
      }),
      n = j(() => {
        var { dot: i, value: l, maxValue: o } = e;
        return i ? "" : l !== void 0 && o !== void 0 && R(l) > o ? o + "+" : l;
      }),
      a = () => {
        var { position: i, dot: l } = e;
        if (l && i.includes("right")) return "var-badge__dot--right";
        if (l && i.includes("left")) return "var-badge__dot--left";
      };
    return { values: n, contentClass: r };
  },
});
bn.install = function (e) {
  e.component(bn.name, bn);
};
function dp(e) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(e);
}
var vp = {
    src: { type: String },
    fit: { type: String, validator: dp, default: "cover" },
    height: { type: [String, Number] },
    alt: { type: String },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    elevation: { type: [Number, String] },
    ripple: { type: Boolean, default: !1 },
    onClick: { type: Function },
  },
  cp = ["src", "alt"],
  fp = { key: 0, class: "var-card__title" },
  hp = { key: 0, class: "var-card__subtitle" },
  pp = { key: 0, class: "var-card__description" },
  mp = { key: 0, class: "var-card__footer" };
function gp(e, t) {
  var r = ht("ripple");
  return Re(
    (T(),
    _(
      "div",
      {
        class: Y([
          "var-card",
          [e.elevation ? "var-elevation--" + e.elevation : "var-elevation--2"],
        ]),
        onClick: t[0] || (t[0] = (...n) => e.onClick && e.onClick(...n)),
      },
      [
        Z(e.$slots, "image", {}, () => [
          e.src
            ? (T(),
              _(
                "img",
                {
                  key: 0,
                  class: "var-card__image",
                  style: J({
                    objectFit: e.fit,
                    height: e.toSizeUnit(e.height),
                  }),
                  src: e.src,
                  alt: e.alt,
                },
                null,
                12,
                cp
              ))
            : de("v-if", !0),
        ]),
        Z(e.$slots, "title", {}, () => [
          e.title ? (T(), _("div", fp, ie(e.title), 1)) : de("v-if", !0),
        ]),
        Z(e.$slots, "subtitle", {}, () => [
          e.subtitle ? (T(), _("div", hp, ie(e.subtitle), 1)) : de("v-if", !0),
        ]),
        Z(e.$slots, "description", {}, () => [
          e.description
            ? (T(), _("div", pp, ie(e.description), 1))
            : de("v-if", !0),
        ]),
        e.$slots.extra
          ? (T(), _("div", mp, [Z(e.$slots, "extra")]))
          : de("v-if", !0),
      ],
      2
    )),
    [[r, { disabled: !e.ripple }]]
  );
}
var Cn = ve({
  render: gp,
  name: "VarCard",
  directives: { Ripple: lt },
  props: vp,
  setup() {
    return { toSizeUnit: ot };
  },
});
Cn.install = function (e) {
  e.component(Cn.name, Cn);
};
var yp = {
    title: { type: [Number, String] },
    icon: { type: String },
    desc: { type: String },
    border: { type: Boolean, default: !1 },
    iconClass: { type: String },
    titleClass: { type: String },
    descClass: { type: String },
    extraClass: { type: String },
  },
  bp = { class: "var-cell__content" };
function Cp(e, t) {
  var r = fe("var-icon");
  return (
    T(),
    _(
      "div",
      { class: Y(["var-cell", [e.border ? "var-cell--border" : null]]) },
      [
        e.$slots.icon || e.icon
          ? (T(),
            _(
              "div",
              {
                key: 0,
                class: Y([
                  "var-cell__icon",
                  [e.iconClass ? e.iconClass : null],
                ]),
              },
              [
                Z(e.$slots, "icon", {}, () => [
                  ee(r, { class: "var--flex", name: e.icon }, null, 8, [
                    "name",
                  ]),
                ]),
              ],
              2
            ))
          : de("v-if", !0),
        B("div", bp, [
          B(
            "div",
            {
              class: Y([
                "var-cell__title",
                [e.titleClass ? e.titleClass : null],
              ]),
            },
            [Z(e.$slots, "default", {}, () => [Oe(ie(e.title), 1)])],
            2
          ),
          e.$slots.desc || e.desc
            ? (T(),
              _(
                "div",
                {
                  key: 0,
                  class: Y([
                    "var-cell__desc",
                    [e.descClass ? e.descClass : null],
                  ]),
                },
                [Z(e.$slots, "desc", {}, () => [Oe(ie(e.desc), 1)])],
                2
              ))
            : de("v-if", !0),
        ]),
        e.$slots.extra
          ? (T(),
            _(
              "div",
              {
                key: 1,
                class: Y([
                  "var-cell__extra",
                  [e.extraClass ? e.extraClass : null],
                ]),
              },
              [Z(e.$slots, "extra")],
              2
            ))
          : de("v-if", !0),
      ],
      2
    )
  );
}
var qr = ve({
  render: Cp,
  name: "VarCell",
  components: { VarIcon: We },
  props: yp,
});
qr.install = function (e) {
  e.component(qr.name, qr);
};
var wp = {
    errorMessage: { type: String, default: "" },
    maxlengthText: { type: String, default: "" },
  },
  kp = { key: 0, class: "var-form-details" },
  Sp = { class: "var-form-details__message" },
  Tp = { class: "var-form-details__length" };
function $p(e, t) {
  return (
    T(),
    Ie(
      at,
      { name: "var-form-details" },
      {
        default: Ee(() => [
          e.errorMessage || e.maxlengthText
            ? (T(),
              _("div", kp, [
                B("div", Sp, ie(e.errorMessage), 1),
                B("div", Tp, ie(e.maxlengthText), 1),
              ]))
            : de("v-if", !0),
        ]),
        _: 1,
      }
    )
  );
}
var ut = ve({ render: $p, name: "VarFormDetails", props: wp });
ut.install = function (e) {
  e.component(ut.name, ut);
};
var Ep = {
    modelValue: { type: [String, Number, Boolean, Object, Array], default: !1 },
    checkedValue: {
      type: [String, Number, Boolean, Object, Array],
      default: !0,
    },
    uncheckedValue: {
      type: [String, Number, Boolean, Object, Array],
      default: !1,
    },
    checkedColor: { type: String },
    uncheckedColor: { type: String },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    iconSize: { type: [String, Number] },
    ripple: { type: Boolean, default: !0 },
    validateTrigger: { type: Array, default: ["onChange"] },
    rules: { type: Array },
    onClick: { type: Function },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  rd = Symbol("CHECKBOX_GROUP_BIND_CHECKBOX_KEY"),
  nd = Symbol("CHECKBOX_GROUP_COUNT_CHECKBOX_KEY");
function Mp() {
  var { bindChildren: e, childProviders: t } = Bt(rd),
    { length: r } = Gt(nd);
  return { length: r, checkboxes: t, bindCheckboxes: e };
}
function Ip() {
  var { bindParent: e, parentProvider: t } = Ft(rd),
    { index: r } = Zt(nd);
  return { index: r, checkboxGroup: t, bindCheckboxGroup: e };
}
var ad = Symbol("FORM_BIND_FORM_ITEM_KEY");
function Rt() {
  var { bindParent: e, parentProvider: t } = Ft(ad);
  return { bindForm: e, form: t };
}
function Pp() {
  var { bindChildren: e, childProviders: t } = Bt(ad);
  return { formItems: t, bindFormItems: e };
}
var Op = { class: "var-checkbox" };
function _p(e, t) {
  var r = fe("var-icon"),
    n = fe("var-form-details"),
    a = ht("ripple");
  return (
    T(),
    _(
      "div",
      {
        class: "var-checkbox__wrap",
        onClick:
          t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i)),
      },
      [
        B("div", Op, [
          Re(
            B(
              "div",
              {
                class: Y([
                  "var-checkbox__action",
                  [
                    e.checked
                      ? "var-checkbox--checked"
                      : "var-checkbox--unchecked",
                    e.errorMessage || e.checkboxGroupErrorMessage
                      ? "var-checkbox--error"
                      : null,
                    e.formDisabled || e.disabled
                      ? "var-checkbox--disabled"
                      : null,
                  ],
                ]),
                style: J({
                  color: e.checked ? e.checkedColor : e.uncheckedColor,
                }),
              },
              [
                e.checked
                  ? Z(e.$slots, "checked-icon", { key: 0 }, () => [
                      ee(
                        r,
                        {
                          class: Y([
                            "var-checkbox__icon",
                            [
                              e.withAnimation
                                ? "var-checkbox--with-animation"
                                : null,
                            ],
                          ]),
                          name: "checkbox-marked",
                          size: e.iconSize,
                          "var-checkbox-cover": "",
                        },
                        null,
                        8,
                        ["class", "size"]
                      ),
                    ])
                  : Z(e.$slots, "unchecked-icon", { key: 1 }, () => [
                      ee(
                        r,
                        {
                          class: Y([
                            "var-checkbox__icon",
                            [
                              e.withAnimation
                                ? "var-checkbox--with-animation"
                                : null,
                            ],
                          ]),
                          name: "checkbox-blank-outline",
                          size: e.iconSize,
                          "var-checkbox-cover": "",
                        },
                        null,
                        8,
                        ["class", "size"]
                      ),
                    ]),
              ],
              6
            ),
            [
              [
                a,
                {
                  disabled:
                    e.formReadonly ||
                    e.readonly ||
                    e.formDisabled ||
                    e.disabled ||
                    !e.ripple,
                },
              ],
            ]
          ),
          B(
            "div",
            {
              class: Y([
                "var-checkbox__text",
                [
                  e.errorMessage || e.checkboxGroupErrorMessage
                    ? "var-checkbox--error"
                    : null,
                  e.formDisabled || e.disabled
                    ? "var-checkbox--disabled"
                    : null,
                ],
              ]),
            },
            [Z(e.$slots, "default")],
            2
          ),
        ]),
        ee(n, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
      ]
    )
  );
}
var Xr = ve({
  render: _p,
  name: "VarCheckbox",
  directives: { Ripple: lt },
  components: { VarIcon: We, VarFormDetails: ut },
  props: Ep,
  setup(e) {
    var t = D(!1),
      r = j(() => t.value === e.checkedValue),
      n = j(() => e.checkedValue),
      a = D(!1),
      { checkboxGroup: i, bindCheckboxGroup: l } = Ip(),
      { form: o, bindForm: s } = Rt(),
      {
        errorMessage: u,
        validateWithTrigger: d,
        validate: c,
        resetValidation: v,
      } = Lt(),
      f = (k) => {
        Ye(() => {
          var { validateTrigger: M, rules: P, modelValue: I } = e;
          d(M, k, P, I);
        });
      },
      p = (k) => {
        var M;
        t.value = k;
        var { checkedValue: P, onChange: I } = e;
        (M = e["onUpdate:modelValue"]) == null || M.call(e, t.value),
          I == null || I(t.value),
          f("onChange"),
          k === P ? i == null || i.onChecked(P) : i == null || i.onUnchecked(P);
      },
      h = (k) => {
        var {
          disabled: M,
          readonly: P,
          checkedValue: I,
          uncheckedValue: N,
          onClick: F,
        } = e;
        if (
          !((o != null && o.disabled.value) || M) &&
          (F == null || F(k), !((o != null && o.readonly.value) || P))
        ) {
          a.value = !0;
          var w = i ? i.checkedCount.value >= Number(i.max.value) : !1;
          (!r.value && w) || p(r.value ? N : I);
        }
      },
      g = (k) => {
        var { checkedValue: M, uncheckedValue: P } = e;
        t.value = k.includes(M) ? M : P;
      },
      m = () => {
        var k;
        (k = e["onUpdate:modelValue"]) == null || k.call(e, e.uncheckedValue),
          v();
      },
      $ = (k) => {
        var { checkedValue: M, uncheckedValue: P } = e,
          I = ![M, P].includes(k);
        I && (k = r.value ? P : M), p(k);
      },
      S = () => c(e.rules, e.modelValue);
    me(
      () => e.modelValue,
      (k) => {
        t.value = k;
      },
      { immediate: !0 }
    );
    var C = {
      checkedValue: n,
      checked: r,
      sync: g,
      validate: S,
      resetValidation: v,
      reset: m,
    };
    return (
      l == null || l(C),
      s == null || s(C),
      {
        withAnimation: a,
        checked: r,
        errorMessage: u,
        checkboxGroupErrorMessage: i == null ? void 0 : i.errorMessage,
        formDisabled: o == null ? void 0 : o.disabled,
        formReadonly: o == null ? void 0 : o.readonly,
        handleClick: h,
        toggle: $,
        reset: m,
        validate: S,
        resetValidation: v,
      }
    );
  },
});
Xr.install = function (e) {
  e.component(Xr.name, Xr);
};
function Vp(e) {
  return ["horizontal", "vertical"].includes(e);
}
var Np = {
    modelValue: { type: Array, default: () => [] },
    max: { type: [String, Number] },
    direction: { type: String, default: "horizontal", validator: Vp },
    validateTrigger: { type: Array, default: ["onChange"] },
    rules: { type: Array },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  Ap = { class: "var-checkbox-group__wrap" };
function Dp(e, t) {
  var r = fe("var-form-details");
  return (
    T(),
    _("div", Ap, [
      B(
        "div",
        {
          class: Y([
            "var-checkbox-group",
            ["var-checkbox-group--" + e.direction],
          ]),
        },
        [Z(e.$slots, "default")],
        2
      ),
      ee(r, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
    ])
  );
}
var wn = ve({
  render: Dp,
  name: "VarCheckboxGroup",
  components: { VarFormDetails: ut },
  props: Np,
  setup(e) {
    var t = j(() => e.max),
      r = j(() => e.modelValue.length),
      { length: n, checkboxes: a, bindCheckboxes: i } = Mp(),
      { bindForm: l } = Rt(),
      {
        errorMessage: o,
        validateWithTrigger: s,
        validate: u,
        resetValidation: d,
      } = Lt(),
      c = j(() => o.value),
      v = (M) => {
        Ye(() => {
          var { validateTrigger: P, rules: I, modelValue: N } = e;
          s(P, M, I, N);
        });
      },
      f = (M) => {
        var P;
        (P = e["onUpdate:modelValue"]) == null || P.call(e, M),
          e.onChange == null || e.onChange(M),
          v("onChange");
      },
      p = (M) => {
        var { modelValue: P } = e;
        P.includes(M) || f([...P, M]);
      },
      h = (M) => {
        var { modelValue: P } = e;
        !P.includes(M) || f(P.filter((I) => I !== M));
      },
      g = () => a.forEach(({ sync: M }) => M(e.modelValue)),
      m = () => {
        var M,
          P = a.map(({ checkedValue: N }) => N.value),
          I = zu(P);
        return (M = e["onUpdate:modelValue"]) == null || M.call(e, I), I;
      },
      $ = () => {
        var M,
          P = a
            .filter(({ checked: N }) => !N.value)
            .map(({ checkedValue: N }) => N.value),
          I = zu(P);
        return (M = e["onUpdate:modelValue"]) == null || M.call(e, I), I;
      },
      S = () => {
        var M;
        (M = e["onUpdate:modelValue"]) == null || M.call(e, []), d();
      },
      C = () => u(e.rules, e.modelValue);
    me(() => e.modelValue, g, { deep: !0 }), me(() => n.value, g);
    var k = {
      max: t,
      checkedCount: r,
      onChecked: p,
      onUnchecked: h,
      validate: C,
      resetValidation: d,
      reset: S,
      errorMessage: c,
    };
    return (
      i(k),
      l == null || l(k),
      {
        errorMessage: o,
        checkAll: m,
        inverseAll: $,
        reset: S,
        validate: C,
        resetValidation: d,
      }
    );
  },
});
wn.install = function (e) {
  e.component(wn.name, wn);
};
function Bp(e) {
  return [
    "default",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
  ].includes(e);
}
function Fp(e) {
  return ["normal", "mini", "small", "large"].includes(e);
}
var Lp = {
  type: { type: String, default: "default", validator: Bp },
  size: { type: String, default: "normal", validator: Fp },
  color: { type: String },
  textColor: { type: String },
  iconName: Dt(Hu, "name"),
  plain: { type: Boolean, default: !1 },
  round: { type: Boolean, default: !0 },
  block: { type: Boolean, default: !1 },
  closable: { type: Boolean, default: !1 },
  onClose: { type: Function },
};
function zp(e, t) {
  var r = fe("var-icon");
  return (
    T(),
    Ie(
      at,
      { name: "var-fade" },
      {
        default: Ee(() => [
          B(
            "span",
            Xe(
              {
                class: ["var-chip var--box", e.contentClass],
                style: e.chipStyles,
              },
              e.$attrs
            ),
            [
              Z(e.$slots, "left"),
              B(
                "span",
                { class: Y(["var-chip--text-" + e.size]) },
                [Z(e.$slots, "default")],
                2
              ),
              Z(e.$slots, "right"),
              e.closable
                ? (T(),
                  _(
                    "span",
                    {
                      key: 0,
                      class: "var-chip--close",
                      onClick:
                        t[0] || (t[0] = (...n) => e.onClose && e.onClose(...n)),
                    },
                    [
                      ee(
                        r,
                        {
                          name: "" + (e.iconName ? e.iconName : "close-circle"),
                        },
                        null,
                        8,
                        ["name"]
                      ),
                    ]
                  ))
                : de("v-if", !0),
            ],
            16
          ),
        ]),
        _: 3,
      }
    )
  );
}
var Gr = ve({
  render: zp,
  name: "VarChip",
  components: { VarIcon: We },
  inheritAttrs: !1,
  props: Lp,
  setup(e) {
    var t = j(() => {
        var { plain: n, textColor: a, color: i } = e;
        return n
          ? { color: a || i, borderColor: i }
          : { color: a, background: i };
      }),
      r = j(() => {
        var { size: n, block: a, type: i, plain: l, round: o } = e,
          s = a ? "var--flex" : "var--inline-flex",
          u = l ? "var-chip--plain var-chip--plain-" + i : "var-chip--" + i,
          d = o && "var-chip--round";
        return ["var-chip--" + n, s, u, d];
      });
    return { chipStyles: t, contentClass: r };
  },
});
Gr.install = function (e) {
  e.component(Gr.name, Gr);
};
var Rp = {
    span: { type: [String, Number], default: 24 },
    offset: { type: [String, Number], default: 0 },
    onClick: { type: Function },
  },
  id = Symbol("ROW_BIND_COL_KEY"),
  ld = Symbol("ROW_COUNT_COL_KEY");
function Up() {
  var { bindChildren: e, childProviders: t } = Bt(id),
    { length: r } = Gt(ld);
  return { length: r, cols: t, bindCols: e };
}
function Yp() {
  var { parentProvider: e, bindParent: t } = Ft(id),
    { index: r } = Zt(ld);
  return (
    (!e || !t || !r) && console.warn("col must in row"),
    { index: r, row: e, bindRow: t }
  );
}
function Hp(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: Y([
          "var-col var--box",
          [
            e.span ? "var-col--span-" + e.toNumber(e.span) : null,
            e.offset ? "var-col--offset-" + e.toNumber(e.offset) : null,
          ],
        ]),
        style: J({
          paddingLeft: e.toSizeUnit(e.padding.left),
          paddingRight: e.toSizeUnit(e.padding.right),
        }),
        onClick: t[0] || (t[0] = (...r) => e.onClick && e.onClick(...r)),
      },
      [Z(e.$slots, "default")],
      6
    )
  );
}
var kn = ve({
  render: Hp,
  name: "VarCol",
  props: Rp,
  setup(e) {
    var t = D({ left: 0, right: 0 }),
      r = j(() => R(e.span)),
      n = j(() => R(e.offset)),
      { row: a, bindRow: i } = Yp(),
      l = {
        span: r,
        offset: n,
        setPadding(o) {
          t.value = o;
        },
      };
    return (
      me([() => e.span, () => e.offset], () => {
        a == null || a.computePadding();
      }),
      i == null || i(l),
      { padding: t, toNumber: R, toSizeUnit: ot }
    );
  },
});
kn.install = function (e) {
  e.component(kn.name, kn);
};
var od = Symbol("COLLAPSE_BIND_COLLAPSE_ITEM_KEY"),
  sd = Symbol("COLLAPSE_COUNT_COLLAPSE_ITEM_KEY");
function Wp() {
  var { bindChildren: e, childProviders: t } = Bt(od),
    { length: r } = Gt(sd);
  return { length: r, collapseItem: t, bindCollapseItem: e };
}
var jp = {
    modelValue: { type: [Array, String, Number] },
    accordion: { type: Boolean, default: !1 },
    offset: { type: Boolean, default: !0 },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  Kp = { class: "var-collapse" };
function qp(e, t) {
  return T(), _("div", Kp, [Z(e.$slots, "default")]);
}
var Sn = ve({
  render: qp,
  name: "VarCollapse",
  props: jp,
  setup(e) {
    var { length: t, collapseItem: r, bindCollapseItem: n } = Wp(),
      a = j(() => e.modelValue),
      i = j(() => e.offset),
      l = () =>
        !e.accordion && !He(e.modelValue)
          ? (console.error(
              '[Varlet] Collapse: type of prop "modelValue" should be an Array'
            ),
            !1)
          : e.accordion && He(e.modelValue)
          ? (console.error(
              '[Varlet] Collapse: type of prop "modelValue" should be a String or Number'
            ),
            !1)
          : !0,
      o = (f, p) => {
        if (!!l())
          return p
            ? e.accordion
              ? f
              : [...e.modelValue, f]
            : e.accordion
            ? null
            : e.modelValue.filter((h) => h !== f);
      },
      s = (f, p) => {
        var h,
          g = o(f, p);
        (h = e["onUpdate:modelValue"]) == null || h.call(e, g),
          e.onChange == null || e.onChange(g);
      },
      u = () => {
        if (e.accordion)
          return r.find(({ name: p }) => e.modelValue === p.value);
        var f = r.filter(({ name: p }) =>
          p.value === void 0 ? !1 : e.modelValue.includes(p.value)
        );
        return f.length ? f : void 0;
      },
      d = () =>
        e.accordion
          ? r.find(({ index: f, name: p }) =>
              p.value === void 0 ? e.modelValue === f.value : !1
            )
          : r.filter(({ index: f, name: p }) =>
              p.value === void 0 ? e.modelValue.includes(f.value) : !1
            ),
      c = () => {
        if (!!l()) {
          var f = u() || d();
          if ((e.accordion && !f) || (!e.accordion && !f.length)) {
            r.forEach((p) => {
              p.init(e.accordion, !1);
            });
            return;
          }
          r.forEach((p) => {
            var h = e.accordion ? f === p : f.includes(p);
            p.init(e.accordion, h);
          });
        }
      },
      v = { active: a, offset: i, updateItem: s };
    n(v),
      me(
        () => t.value,
        () => Ye().then(c)
      ),
      me(
        () => e.modelValue,
        () => Ye().then(c)
      );
  },
});
Sn.install = function (e) {
  e.component(Sn.name, Sn);
};
function Xp() {
  var { parentProvider: e, bindParent: t } = Ft(od),
    { index: r } = Zt(sd);
  if (!e || !t || !r)
    throw Error(
      "[Varlet] Collapse: <var-collapse-item/> must in <var-collapse>"
    );
  return { index: r, collapse: e, bindCollapse: t };
}
var Gp = {
    name: { type: [String, Number] },
    title: { type: String },
    icon: { type: String, default: "chevron-down" },
    disabled: { type: Boolean, default: !1 },
  },
  Zp = { class: "var-collapse-item-header__title" },
  Jp = { class: "var-collapse-item-header__icon" },
  Qp = { class: "var-collapse-item__wrap" };
function xp(e, t) {
  var r = fe("var-icon");
  return (
    T(),
    _(
      "div",
      {
        class: Y({
          "var-collapse-item": !0,
          "var-collapse-item__active": e.offset && e.isShow,
          "var-collapse-item__disable": e.disabled,
        }),
      },
      [
        B(
          "div",
          {
            class: "var-collapse-item-header",
            onClick: t[0] || (t[0] = (n) => e.toggle()),
          },
          [
            B("div", Zp, [
              Z(e.$slots, "title", {}, () => [Oe(ie(e.title), 1)]),
            ]),
            B("div", Jp, [
              Z(e.$slots, "icon", {}, () => [
                ee(
                  r,
                  {
                    name: e.icon,
                    transition: 250,
                    class: Y({
                      "var-collapse-item-header__icon": !0,
                      "var-collapse-item-header__open":
                        e.isShow && e.icon === "chevron-down",
                      "var-collapse-item-header__disable": e.disabled,
                    }),
                  },
                  null,
                  8,
                  ["name", "class"]
                ),
              ]),
            ]),
          ]
        ),
        Re(
          B(
            "div",
            {
              class: "var-collapse-item-content",
              ref: "contentEl",
              onTransitionend:
                t[1] ||
                (t[1] = (...n) => e.transitionend && e.transitionend(...n)),
            },
            [B("div", Qp, [Z(e.$slots, "default")])],
            544
          ),
          [[Oa, e.show]]
        ),
      ],
      2
    )
  );
}
var Tn = ve({
  render: xp,
  name: "VarCollapseItem",
  components: { VarIcon: We },
  props: Gp,
  setup(e) {
    var { index: t, collapse: r, bindCollapse: n } = Xp(),
      a = D(null),
      i = D(!1),
      l = D(!1),
      { active: o, offset: s, updateItem: u } = r,
      d = j(() => e.name),
      c = (m, $) => {
        o.value === void 0 ||
          (m && He(o.value)) ||
          $ === l.value ||
          ((l.value = $), v(!0));
      },
      v = (m) => {
        e.disabled || m || u(e.name || t.value, !l.value);
      },
      f = () => {
        !a.value ||
          ((a.value.style.height = ""),
          (i.value = !0),
          Ye(() => {
            var { offsetHeight: m } = a.value;
            (a.value.style.height = 0 + "px"),
              ar(() => {
                a.value.style.height = m + "px";
              });
          }));
      },
      p = () => {
        !a.value || (a.value.style.height = 0 + "px");
      },
      h = () => {
        l.value || ((i.value = !1), (a.value.style.height = ""));
      },
      g = { index: t, name: d, init: c };
    return (
      n(g),
      me(l, (m) => {
        m ? f() : p();
      }),
      {
        show: i,
        isShow: l,
        offset: s,
        toggle: v,
        contentEl: a,
        transitionend: h,
      }
    );
  },
});
Tn.install = function (e) {
  e.component(Tn.name, Tn);
};
var em = {
    time: { type: [String, Number], default: 0 },
    format: { type: String, default: "HH : mm : ss" },
    autoStart: { type: Boolean, default: !0 },
    onEnd: { type: Function },
    onChange: { type: Function },
  },
  ao = 1e3,
  io = 60 * ao,
  lo = 60 * io,
  ud = 24 * lo,
  tm = { class: "var-countdown" };
function rm(e, t) {
  return (
    T(),
    _("div", tm, [
      Z(e.$slots, "default", Uo(Ws(e.timeData)), () => [Oe(ie(e.showTime), 1)]),
    ])
  );
}
var $n = ve({
  render: rm,
  name: "VarCountdown",
  props: em,
  setup(e) {
    var t = D(0),
      r = D(!1),
      n = D(""),
      a = D(0),
      i = D(0),
      l = D({}),
      o = (v) => {
        var f = Math.floor(v / ud),
          p = Math.floor((v % ud) / lo),
          h = Math.floor((v % lo) / io),
          g = Math.floor((v % io) / ao),
          m = Math.floor(v % ao),
          $ = { days: f, hours: p, minutes: h, seconds: g, milliseconds: m };
        (l.value = $),
          e.onChange == null || e.onChange(l.value),
          (n.value = vh(e.format, $));
      },
      s = () => {
        var { time: v, onEnd: f, autoStart: p } = e,
          h = Date.now();
        t.value || (t.value = h + R(v));
        var g = t.value - h;
        if ((g < 0 && (g = 0), (i.value = g), o(g), g === 0)) {
          f == null || f();
          return;
        }
        (p || r.value) && (a.value = ar(s));
      },
      u = () => {
        r.value ||
          ((r.value = !0),
          (t.value = Date.now() + (i.value || R(e.time))),
          s());
      },
      d = () => {
        r.value = !1;
      },
      c = () => {
        (t.value = 0), (r.value = !1), $h(a.value), s();
      };
    return (
      me(
        () => e.time,
        () => c(),
        { immediate: !0 }
      ),
      { showTime: n, timeData: l, start: u, pause: d, reset: c }
    );
  },
});
$n.install = function (e) {
  e.component($n.name, $n);
};
var En = 9e15,
  pr = 1e9,
  oo = "0123456789abcdef",
  Oi =
    "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
  _i =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
  so = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -En,
    maxE: En,
    crypto: !1,
  },
  dd,
  ir,
  Te = !0,
  Vi = "[DecimalError] ",
  mr = Vi + "Invalid argument: ",
  vd = Vi + "Precision limit exceeded",
  cd = Vi + "crypto unavailable",
  fd = "[object Decimal]",
  ct = Math.floor,
  et = Math.pow,
  nm = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  am = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  im = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  hd = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  Ut = 1e7,
  we = 7,
  lm = 9007199254740991,
  om = Oi.length - 1,
  uo = _i.length - 1,
  H = { toStringTag: fd };
H.absoluteValue = H.abs = function () {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), ye(e);
};
H.ceil = function () {
  return ye(new this.constructor(this), this.e + 1, 2);
};
H.clampedTo = H.clamp = function (e, t) {
  var r,
    n = this,
    a = n.constructor;
  if (((e = new a(e)), (t = new a(t)), !e.s || !t.s)) return new a(NaN);
  if (e.gt(t)) throw Error(mr + t);
  return (r = n.cmp(e)), r < 0 ? e : n.cmp(t) > 0 ? t : new a(n);
};
H.comparedTo = H.cmp = function (e) {
  var t,
    r,
    n,
    a,
    i = this,
    l = i.d,
    o = (e = new i.constructor(e)).d,
    s = i.s,
    u = e.s;
  if (!l || !o)
    return !s || !u ? NaN : s !== u ? s : l === o ? 0 : !l ^ (s < 0) ? 1 : -1;
  if (!l[0] || !o[0]) return l[0] ? s : o[0] ? -u : 0;
  if (s !== u) return s;
  if (i.e !== e.e) return (i.e > e.e) ^ (s < 0) ? 1 : -1;
  for (n = l.length, a = o.length, t = 0, r = n < a ? n : a; t < r; ++t)
    if (l[t] !== o[t]) return (l[t] > o[t]) ^ (s < 0) ? 1 : -1;
  return n === a ? 0 : (n > a) ^ (s < 0) ? 1 : -1;
};
H.cosine = H.cos = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.d
    ? r.d[0]
      ? ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + we),
        (n.rounding = 1),
        (r = sm(n, Cd(n, r))),
        (n.precision = e),
        (n.rounding = t),
        ye(ir == 2 || ir == 3 ? r.neg() : r, e, t, !0))
      : new n(1)
    : new n(NaN);
};
H.cubeRoot = H.cbrt = function () {
  var e,
    t,
    r,
    n,
    a,
    i,
    l,
    o,
    s,
    u,
    d = this,
    c = d.constructor;
  if (!d.isFinite() || d.isZero()) return new c(d);
  for (
    Te = !1,
      i = d.s * et(d.s * d, 1 / 3),
      !i || Math.abs(i) == 1 / 0
        ? ((r = dt(d.d)),
          (e = d.e),
          (i = (e - r.length + 1) % 3) && (r += i == 1 || i == -2 ? "0" : "00"),
          (i = et(r, 1 / 3)),
          (e = ct((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
          i == 1 / 0
            ? (r = "5e" + e)
            : ((r = i.toExponential()),
              (r = r.slice(0, r.indexOf("e") + 1) + e)),
          (n = new c(r)),
          (n.s = d.s))
        : (n = new c(i.toString())),
      l = (e = c.precision) + 3;
    ;

  )
    if (
      ((o = n),
      (s = o.times(o).times(o)),
      (u = s.plus(d)),
      (n = Le(u.plus(d).times(o), u.plus(s), l + 2, 1)),
      dt(o.d).slice(0, l) === (r = dt(n.d)).slice(0, l))
    )
      if (((r = r.slice(l - 3, l + 1)), r == "9999" || (!a && r == "4999"))) {
        if (!a && (ye(o, e + 1, 0), o.times(o).times(o).eq(d))) {
          n = o;
          break;
        }
        (l += 4), (a = 1);
      } else {
        (!+r || (!+r.slice(1) && r.charAt(0) == "5")) &&
          (ye(n, e + 1, 1), (t = !n.times(n).times(n).eq(d)));
        break;
      }
  return (Te = !0), ye(n, e, c.rounding, t);
};
H.decimalPlaces = H.dp = function () {
  var e,
    t = this.d,
    r = NaN;
  if (t) {
    if (((e = t.length - 1), (r = (e - ct(this.e / we)) * we), (e = t[e]), e))
      for (; e % 10 == 0; e /= 10) r--;
    r < 0 && (r = 0);
  }
  return r;
};
H.dividedBy = H.div = function (e) {
  return Le(this, new this.constructor(e));
};
H.dividedToIntegerBy = H.divToInt = function (e) {
  var t = this,
    r = t.constructor;
  return ye(Le(t, new r(e), 0, 1, 1), r.precision, r.rounding);
};
H.equals = H.eq = function (e) {
  return this.cmp(e) === 0;
};
H.floor = function () {
  return ye(new this.constructor(this), this.e + 1, 3);
};
H.greaterThan = H.gt = function (e) {
  return this.cmp(e) > 0;
};
H.greaterThanOrEqualTo = H.gte = function (e) {
  var t = this.cmp(e);
  return t == 1 || t === 0;
};
H.hyperbolicCosine = H.cosh = function () {
  var e,
    t,
    r,
    n,
    a,
    i = this,
    l = i.constructor,
    o = new l(1);
  if (!i.isFinite()) return new l(i.s ? 1 / 0 : NaN);
  if (i.isZero()) return o;
  (r = l.precision),
    (n = l.rounding),
    (l.precision = r + Math.max(i.e, i.sd()) + 4),
    (l.rounding = 1),
    (a = i.d.length),
    a < 32
      ? ((e = Math.ceil(a / 3)), (t = (1 / Bi(4, e)).toString()))
      : ((e = 16), (t = "2.3283064365386962890625e-10")),
    (i = Mn(l, 1, i.times(t), new l(1), !0));
  for (var s, u = e, d = new l(8); u--; )
    (s = i.times(i)), (i = o.minus(s.times(d.minus(s.times(d)))));
  return ye(i, (l.precision = r), (l.rounding = n), !0);
};
H.hyperbolicSine = H.sinh = function () {
  var e,
    t,
    r,
    n,
    a = this,
    i = a.constructor;
  if (!a.isFinite() || a.isZero()) return new i(a);
  if (
    ((t = i.precision),
    (r = i.rounding),
    (i.precision = t + Math.max(a.e, a.sd()) + 4),
    (i.rounding = 1),
    (n = a.d.length),
    n < 3)
  )
    a = Mn(i, 2, a, a, !0);
  else {
    (e = 1.4 * Math.sqrt(n)),
      (e = e > 16 ? 16 : e | 0),
      (a = a.times(1 / Bi(5, e))),
      (a = Mn(i, 2, a, a, !0));
    for (var l, o = new i(5), s = new i(16), u = new i(20); e--; )
      (l = a.times(a)), (a = a.times(o.plus(l.times(s.times(l).plus(u)))));
  }
  return (i.precision = t), (i.rounding = r), ye(a, t, r, !0);
};
H.hyperbolicTangent = H.tanh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 7),
        (n.rounding = 1),
        Le(r.sinh(), r.cosh(), (n.precision = e), (n.rounding = t)))
    : new n(r.s);
};
H.inverseCosine = H.acos = function () {
  var e,
    t = this,
    r = t.constructor,
    n = t.abs().cmp(1),
    a = r.precision,
    i = r.rounding;
  return n !== -1
    ? n === 0
      ? t.isNeg()
        ? Yt(r, a, i)
        : new r(0)
      : new r(NaN)
    : t.isZero()
    ? Yt(r, a + 4, i).times(0.5)
    : ((r.precision = a + 6),
      (r.rounding = 1),
      (t = t.asin()),
      (e = Yt(r, a + 4, i).times(0.5)),
      (r.precision = a),
      (r.rounding = i),
      e.minus(t));
};
H.inverseHyperbolicCosine = H.acosh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.lte(1)
    ? new n(r.eq(1) ? 0 : NaN)
    : r.isFinite()
    ? ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4),
      (n.rounding = 1),
      (Te = !1),
      (r = r.times(r).minus(1).sqrt().plus(r)),
      (Te = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln())
    : new n(r);
};
H.inverseHyperbolicSine = H.asinh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return !r.isFinite() || r.isZero()
    ? new n(r)
    : ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6),
      (n.rounding = 1),
      (Te = !1),
      (r = r.times(r).plus(1).sqrt().plus(r)),
      (Te = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln());
};
H.inverseHyperbolicTangent = H.atanh = function () {
  var e,
    t,
    r,
    n,
    a = this,
    i = a.constructor;
  return a.isFinite()
    ? a.e >= 0
      ? new i(a.abs().eq(1) ? a.s / 0 : a.isZero() ? a : NaN)
      : ((e = i.precision),
        (t = i.rounding),
        (n = a.sd()),
        Math.max(n, e) < 2 * -a.e - 1
          ? ye(new i(a), e, t, !0)
          : ((i.precision = r = n - a.e),
            (a = Le(a.plus(1), new i(1).minus(a), r + e, 1)),
            (i.precision = e + 4),
            (i.rounding = 1),
            (a = a.ln()),
            (i.precision = e),
            (i.rounding = t),
            a.times(0.5)))
    : new i(NaN);
};
H.inverseSine = H.asin = function () {
  var e,
    t,
    r,
    n,
    a = this,
    i = a.constructor;
  return a.isZero()
    ? new i(a)
    : ((t = a.abs().cmp(1)),
      (r = i.precision),
      (n = i.rounding),
      t !== -1
        ? t === 0
          ? ((e = Yt(i, r + 4, n).times(0.5)), (e.s = a.s), e)
          : new i(NaN)
        : ((i.precision = r + 6),
          (i.rounding = 1),
          (a = a.div(new i(1).minus(a.times(a)).sqrt().plus(1)).atan()),
          (i.precision = r),
          (i.rounding = n),
          a.times(2)));
};
H.inverseTangent = H.atan = function () {
  var e,
    t,
    r,
    n,
    a,
    i,
    l,
    o,
    s,
    u = this,
    d = u.constructor,
    c = d.precision,
    v = d.rounding;
  if (u.isFinite()) {
    if (u.isZero()) return new d(u);
    if (u.abs().eq(1) && c + 4 <= uo)
      return (l = Yt(d, c + 4, v).times(0.25)), (l.s = u.s), l;
  } else {
    if (!u.s) return new d(NaN);
    if (c + 4 <= uo) return (l = Yt(d, c + 4, v).times(0.5)), (l.s = u.s), l;
  }
  for (
    d.precision = o = c + 10,
      d.rounding = 1,
      r = Math.min(28, (o / we + 2) | 0),
      e = r;
    e;
    --e
  )
    u = u.div(u.times(u).plus(1).sqrt().plus(1));
  for (
    Te = !1, t = Math.ceil(o / we), n = 1, s = u.times(u), l = new d(u), a = u;
    e !== -1;

  )
    if (
      ((a = a.times(s)),
      (i = l.minus(a.div((n += 2)))),
      (a = a.times(s)),
      (l = i.plus(a.div((n += 2)))),
      l.d[t] !== void 0)
    )
      for (e = t; l.d[e] === i.d[e] && e--; );
  return (
    r && (l = l.times(2 << (r - 1))),
    (Te = !0),
    ye(l, (d.precision = c), (d.rounding = v), !0)
  );
};
H.isFinite = function () {
  return !!this.d;
};
H.isInteger = H.isInt = function () {
  return !!this.d && ct(this.e / we) > this.d.length - 2;
};
H.isNaN = function () {
  return !this.s;
};
H.isNegative = H.isNeg = function () {
  return this.s < 0;
};
H.isPositive = H.isPos = function () {
  return this.s > 0;
};
H.isZero = function () {
  return !!this.d && this.d[0] === 0;
};
H.lessThan = H.lt = function (e) {
  return this.cmp(e) < 0;
};
H.lessThanOrEqualTo = H.lte = function (e) {
  return this.cmp(e) < 1;
};
H.logarithm = H.log = function (e) {
  var t,
    r,
    n,
    a,
    i,
    l,
    o,
    s,
    u = this,
    d = u.constructor,
    c = d.precision,
    v = d.rounding,
    f = 5;
  if (e == null) (e = new d(10)), (t = !0);
  else {
    if (((e = new d(e)), (r = e.d), e.s < 0 || !r || !r[0] || e.eq(1)))
      return new d(NaN);
    t = e.eq(10);
  }
  if (((r = u.d), u.s < 0 || !r || !r[0] || u.eq(1)))
    return new d(r && !r[0] ? -1 / 0 : u.s != 1 ? NaN : r ? 0 : 1 / 0);
  if (t)
    if (r.length > 1) i = !0;
    else {
      for (a = r[0]; a % 10 == 0; ) a /= 10;
      i = a !== 1;
    }
  if (
    ((Te = !1),
    (o = c + f),
    (l = yr(u, o)),
    (n = t ? Di(d, o + 10) : yr(e, o)),
    (s = Le(l, n, o, 1)),
    Ba(s.d, (a = c), v))
  )
    do
      if (
        ((o += 10),
        (l = yr(u, o)),
        (n = t ? Di(d, o + 10) : yr(e, o)),
        (s = Le(l, n, o, 1)),
        !i)
      ) {
        +dt(s.d).slice(a + 1, a + 15) + 1 == 1e14 && (s = ye(s, c + 1, 0));
        break;
      }
    while (Ba(s.d, (a += 10), v));
  return (Te = !0), ye(s, c, v);
};
H.minus = H.sub = function (e) {
  var t,
    r,
    n,
    a,
    i,
    l,
    o,
    s,
    u,
    d,
    c,
    v,
    f = this,
    p = f.constructor;
  if (((e = new p(e)), !f.d || !e.d))
    return (
      !f.s || !e.s
        ? (e = new p(NaN))
        : f.d
        ? (e.s = -e.s)
        : (e = new p(e.d || f.s !== e.s ? f : NaN)),
      e
    );
  if (f.s != e.s) return (e.s = -e.s), f.plus(e);
  if (
    ((u = f.d), (v = e.d), (o = p.precision), (s = p.rounding), !u[0] || !v[0])
  ) {
    if (v[0]) e.s = -e.s;
    else if (u[0]) e = new p(f);
    else return new p(s === 3 ? -0 : 0);
    return Te ? ye(e, o, s) : e;
  }
  if (
    ((r = ct(e.e / we)), (d = ct(f.e / we)), (u = u.slice()), (i = d - r), i)
  ) {
    for (
      c = i < 0,
        c
          ? ((t = u), (i = -i), (l = v.length))
          : ((t = v), (r = d), (l = u.length)),
        n = Math.max(Math.ceil(o / we), l) + 2,
        i > n && ((i = n), (t.length = 1)),
        t.reverse(),
        n = i;
      n--;

    )
      t.push(0);
    t.reverse();
  } else {
    for (n = u.length, l = v.length, c = n < l, c && (l = n), n = 0; n < l; n++)
      if (u[n] != v[n]) {
        c = u[n] < v[n];
        break;
      }
    i = 0;
  }
  for (
    c && ((t = u), (u = v), (v = t), (e.s = -e.s)),
      l = u.length,
      n = v.length - l;
    n > 0;
    --n
  )
    u[l++] = 0;
  for (n = v.length; n > i; ) {
    if (u[--n] < v[n]) {
      for (a = n; a && u[--a] === 0; ) u[a] = Ut - 1;
      --u[a], (u[n] += Ut);
    }
    u[n] -= v[n];
  }
  for (; u[--l] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --r;
  return u[0]
    ? ((e.d = u), (e.e = Ai(u, r)), Te ? ye(e, o, s) : e)
    : new p(s === 3 ? -0 : 0);
};
H.modulo = H.mod = function (e) {
  var t,
    r = this,
    n = r.constructor;
  return (
    (e = new n(e)),
    !r.d || !e.s || (e.d && !e.d[0])
      ? new n(NaN)
      : !e.d || (r.d && !r.d[0])
      ? ye(new n(r), n.precision, n.rounding)
      : ((Te = !1),
        n.modulo == 9
          ? ((t = Le(r, e.abs(), 0, 3, 1)), (t.s *= e.s))
          : (t = Le(r, e, 0, n.modulo, 1)),
        (t = t.times(e)),
        (Te = !0),
        r.minus(t))
  );
};
H.naturalExponential = H.exp = function () {
  return vo(this);
};
H.naturalLogarithm = H.ln = function () {
  return yr(this);
};
H.negated = H.neg = function () {
  var e = new this.constructor(this);
  return (e.s = -e.s), ye(e);
};
H.plus = H.add = function (e) {
  var t,
    r,
    n,
    a,
    i,
    l,
    o,
    s,
    u,
    d,
    c = this,
    v = c.constructor;
  if (((e = new v(e)), !c.d || !e.d))
    return (
      !c.s || !e.s
        ? (e = new v(NaN))
        : c.d || (e = new v(e.d || c.s === e.s ? c : NaN)),
      e
    );
  if (c.s != e.s) return (e.s = -e.s), c.minus(e);
  if (
    ((u = c.d), (d = e.d), (o = v.precision), (s = v.rounding), !u[0] || !d[0])
  )
    return d[0] || (e = new v(c)), Te ? ye(e, o, s) : e;
  if (
    ((i = ct(c.e / we)), (n = ct(e.e / we)), (u = u.slice()), (a = i - n), a)
  ) {
    for (
      a < 0
        ? ((r = u), (a = -a), (l = d.length))
        : ((r = d), (n = i), (l = u.length)),
        i = Math.ceil(o / we),
        l = i > l ? i + 1 : l + 1,
        a > l && ((a = l), (r.length = 1)),
        r.reverse();
      a--;

    )
      r.push(0);
    r.reverse();
  }
  for (
    l = u.length,
      a = d.length,
      l - a < 0 && ((a = l), (r = d), (d = u), (u = r)),
      t = 0;
    a;

  )
    (t = ((u[--a] = u[a] + d[a] + t) / Ut) | 0), (u[a] %= Ut);
  for (t && (u.unshift(t), ++n), l = u.length; u[--l] == 0; ) u.pop();
  return (e.d = u), (e.e = Ai(u, n)), Te ? ye(e, o, s) : e;
};
H.precision = H.sd = function (e) {
  var t,
    r = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(mr + e);
  return (
    r.d ? ((t = pd(r.d)), e && r.e + 1 > t && (t = r.e + 1)) : (t = NaN), t
  );
};
H.round = function () {
  var e = this,
    t = e.constructor;
  return ye(new t(e), e.e + 1, t.rounding);
};
H.sine = H.sin = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + we),
        (n.rounding = 1),
        (r = dm(n, Cd(n, r))),
        (n.precision = e),
        (n.rounding = t),
        ye(ir > 2 ? r.neg() : r, e, t, !0))
    : new n(NaN);
};
H.squareRoot = H.sqrt = function () {
  var e,
    t,
    r,
    n,
    a,
    i,
    l = this,
    o = l.d,
    s = l.e,
    u = l.s,
    d = l.constructor;
  if (u !== 1 || !o || !o[0])
    return new d(!u || (u < 0 && (!o || o[0])) ? NaN : o ? l : 1 / 0);
  for (
    Te = !1,
      u = Math.sqrt(+l),
      u == 0 || u == 1 / 0
        ? ((t = dt(o)),
          (t.length + s) % 2 == 0 && (t += "0"),
          (u = Math.sqrt(t)),
          (s = ct((s + 1) / 2) - (s < 0 || s % 2)),
          u == 1 / 0
            ? (t = "5e" + s)
            : ((t = u.toExponential()),
              (t = t.slice(0, t.indexOf("e") + 1) + s)),
          (n = new d(t)))
        : (n = new d(u.toString())),
      r = (s = d.precision) + 3;
    ;

  )
    if (
      ((i = n),
      (n = i.plus(Le(l, i, r + 2, 1)).times(0.5)),
      dt(i.d).slice(0, r) === (t = dt(n.d)).slice(0, r))
    )
      if (((t = t.slice(r - 3, r + 1)), t == "9999" || (!a && t == "4999"))) {
        if (!a && (ye(i, s + 1, 0), i.times(i).eq(l))) {
          n = i;
          break;
        }
        (r += 4), (a = 1);
      } else {
        (!+t || (!+t.slice(1) && t.charAt(0) == "5")) &&
          (ye(n, s + 1, 1), (e = !n.times(n).eq(l)));
        break;
      }
  return (Te = !0), ye(n, s, d.rounding, e);
};
H.tangent = H.tan = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 10),
        (n.rounding = 1),
        (r = r.sin()),
        (r.s = 1),
        (r = Le(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0)),
        (n.precision = e),
        (n.rounding = t),
        ye(ir == 2 || ir == 4 ? r.neg() : r, e, t, !0))
    : new n(NaN);
};
H.times = H.mul = function (e) {
  var t,
    r,
    n,
    a,
    i,
    l,
    o,
    s,
    u,
    d = this,
    c = d.constructor,
    v = d.d,
    f = (e = new c(e)).d;
  if (((e.s *= d.s), !v || !v[0] || !f || !f[0]))
    return new c(
      !e.s || (v && !v[0] && !f) || (f && !f[0] && !v)
        ? NaN
        : !v || !f
        ? e.s / 0
        : e.s * 0
    );
  for (
    r = ct(d.e / we) + ct(e.e / we),
      s = v.length,
      u = f.length,
      s < u && ((i = v), (v = f), (f = i), (l = s), (s = u), (u = l)),
      i = [],
      l = s + u,
      n = l;
    n--;

  )
    i.push(0);
  for (n = u; --n >= 0; ) {
    for (t = 0, a = s + n; a > n; )
      (o = i[a] + f[n] * v[a - n - 1] + t),
        (i[a--] = o % Ut | 0),
        (t = (o / Ut) | 0);
    i[a] = (i[a] + t) % Ut | 0;
  }
  for (; !i[--l]; ) i.pop();
  return (
    t ? ++r : i.shift(),
    (e.d = i),
    (e.e = Ai(i, r)),
    Te ? ye(e, c.precision, c.rounding) : e
  );
};
H.toBinary = function (e, t) {
  return fo(this, 2, e, t);
};
H.toDecimalPlaces = H.toDP = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    (r = new n(r)),
    e === void 0
      ? r
      : (gt(e, 0, pr),
        t === void 0 ? (t = n.rounding) : gt(t, 0, 8),
        ye(r, e + r.e + 1, t))
  );
};
H.toExponential = function (e, t) {
  var r,
    n = this,
    a = n.constructor;
  return (
    e === void 0
      ? (r = xt(n, !0))
      : (gt(e, 0, pr),
        t === void 0 ? (t = a.rounding) : gt(t, 0, 8),
        (n = ye(new a(n), e + 1, t)),
        (r = xt(n, !0, e + 1))),
    n.isNeg() && !n.isZero() ? "-" + r : r
  );
};
H.toFixed = function (e, t) {
  var r,
    n,
    a = this,
    i = a.constructor;
  return (
    e === void 0
      ? (r = xt(a))
      : (gt(e, 0, pr),
        t === void 0 ? (t = i.rounding) : gt(t, 0, 8),
        (n = ye(new i(a), e + a.e + 1, t)),
        (r = xt(n, !1, e + n.e + 1))),
    a.isNeg() && !a.isZero() ? "-" + r : r
  );
};
H.toFraction = function (e) {
  var t,
    r,
    n,
    a,
    i,
    l,
    o,
    s,
    u,
    d,
    c,
    v,
    f = this,
    p = f.d,
    h = f.constructor;
  if (!p) return new h(f);
  if (
    ((u = r = new h(1)),
    (n = s = new h(0)),
    (t = new h(n)),
    (i = t.e = pd(p) - f.e - 1),
    (l = i % we),
    (t.d[0] = et(10, l < 0 ? we + l : l)),
    e == null)
  )
    e = i > 0 ? t : u;
  else {
    if (((o = new h(e)), !o.isInt() || o.lt(u))) throw Error(mr + o);
    e = o.gt(t) ? (i > 0 ? t : u) : o;
  }
  for (
    Te = !1,
      o = new h(dt(p)),
      d = h.precision,
      h.precision = i = p.length * we * 2;
    (c = Le(o, t, 0, 1, 1)), (a = r.plus(c.times(n))), a.cmp(e) != 1;

  )
    (r = n),
      (n = a),
      (a = u),
      (u = s.plus(c.times(a))),
      (s = a),
      (a = t),
      (t = o.minus(c.times(a))),
      (o = a);
  return (
    (a = Le(e.minus(r), n, 0, 1, 1)),
    (s = s.plus(a.times(u))),
    (r = r.plus(a.times(n))),
    (s.s = u.s = f.s),
    (v =
      Le(u, n, i, 1).minus(f).abs().cmp(Le(s, r, i, 1).minus(f).abs()) < 1
        ? [u, n]
        : [s, r]),
    (h.precision = d),
    (Te = !0),
    v
  );
};
H.toHexadecimal = H.toHex = function (e, t) {
  return fo(this, 16, e, t);
};
H.toNearest = function (e, t) {
  var r = this,
    n = r.constructor;
  if (((r = new n(r)), e == null)) {
    if (!r.d) return r;
    (e = new n(1)), (t = n.rounding);
  } else {
    if (((e = new n(e)), t === void 0 ? (t = n.rounding) : gt(t, 0, 8), !r.d))
      return e.s ? r : e;
    if (!e.d) return e.s && (e.s = r.s), e;
  }
  return (
    e.d[0]
      ? ((Te = !1), (r = Le(r, e, 0, t, 1).times(e)), (Te = !0), ye(r))
      : ((e.s = r.s), (r = e)),
    r
  );
};
H.toNumber = function () {
  return +this;
};
H.toOctal = function (e, t) {
  return fo(this, 8, e, t);
};
H.toPower = H.pow = function (e) {
  var t,
    r,
    n,
    a,
    i,
    l,
    o = this,
    s = o.constructor,
    u = +(e = new s(e));
  if (!o.d || !e.d || !o.d[0] || !e.d[0]) return new s(et(+o, u));
  if (((o = new s(o)), o.eq(1))) return o;
  if (((n = s.precision), (i = s.rounding), e.eq(1))) return ye(o, n, i);
  if (((t = ct(e.e / we)), t >= e.d.length - 1 && (r = u < 0 ? -u : u) <= lm))
    return (a = md(s, o, r, n)), e.s < 0 ? new s(1).div(a) : ye(a, n, i);
  if (((l = o.s), l < 0)) {
    if (t < e.d.length - 1) return new s(NaN);
    if (
      ((e.d[t] & 1) == 0 && (l = 1), o.e == 0 && o.d[0] == 1 && o.d.length == 1)
    )
      return (o.s = l), o;
  }
  return (
    (r = et(+o, u)),
    (t =
      r == 0 || !isFinite(r)
        ? ct(u * (Math.log("0." + dt(o.d)) / Math.LN10 + o.e + 1))
        : new s(r + "").e),
    t > s.maxE + 1 || t < s.minE - 1
      ? new s(t > 0 ? l / 0 : 0)
      : ((Te = !1),
        (s.rounding = o.s = 1),
        (r = Math.min(12, (t + "").length)),
        (a = vo(e.times(yr(o, n + r)), n)),
        a.d &&
          ((a = ye(a, n + 5, 1)),
          Ba(a.d, n, i) &&
            ((t = n + 10),
            (a = ye(vo(e.times(yr(o, t + r)), t), t + 5, 1)),
            +dt(a.d).slice(n + 1, n + 15) + 1 == 1e14 &&
              (a = ye(a, n + 1, 0)))),
        (a.s = l),
        (Te = !0),
        (s.rounding = i),
        ye(a, n, i))
  );
};
H.toPrecision = function (e, t) {
  var r,
    n = this,
    a = n.constructor;
  return (
    e === void 0
      ? (r = xt(n, n.e <= a.toExpNeg || n.e >= a.toExpPos))
      : (gt(e, 1, pr),
        t === void 0 ? (t = a.rounding) : gt(t, 0, 8),
        (n = ye(new a(n), e, t)),
        (r = xt(n, e <= n.e || n.e <= a.toExpNeg, e))),
    n.isNeg() && !n.isZero() ? "-" + r : r
  );
};
H.toSignificantDigits = H.toSD = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    e === void 0
      ? ((e = n.precision), (t = n.rounding))
      : (gt(e, 1, pr), t === void 0 ? (t = n.rounding) : gt(t, 0, 8)),
    ye(new n(r), e, t)
  );
};
H.toString = function () {
  var e = this,
    t = e.constructor,
    r = xt(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + r : r;
};
H.truncated = H.trunc = function () {
  return ye(new this.constructor(this), this.e + 1, 1);
};
H.valueOf = H.toJSON = function () {
  var e = this,
    t = e.constructor,
    r = xt(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() ? "-" + r : r;
};
function dt(e) {
  var t,
    r,
    n,
    a = e.length - 1,
    i = "",
    l = e[0];
  if (a > 0) {
    for (i += l, t = 1; t < a; t++)
      (n = e[t] + ""), (r = we - n.length), r && (i += gr(r)), (i += n);
    (l = e[t]), (n = l + ""), (r = we - n.length), r && (i += gr(r));
  } else if (l === 0) return "0";
  for (; l % 10 == 0; ) l /= 10;
  return i + l;
}
function gt(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(mr + e);
}
function Ba(e, t, r, n) {
  var a, i, l, o;
  for (i = e[0]; i >= 10; i /= 10) --t;
  return (
    --t < 0 ? ((t += we), (a = 0)) : ((a = Math.ceil((t + 1) / we)), (t %= we)),
    (i = et(10, we - t)),
    (o = e[a] % i | 0),
    n == null
      ? t < 3
        ? (t == 0 ? (o = (o / 100) | 0) : t == 1 && (o = (o / 10) | 0),
          (l =
            (r < 4 && o == 99999) ||
            (r > 3 && o == 49999) ||
            o == 5e4 ||
            o == 0))
        : (l =
            (((r < 4 && o + 1 == i) || (r > 3 && o + 1 == i / 2)) &&
              ((e[a + 1] / i / 100) | 0) == et(10, t - 2) - 1) ||
            ((o == i / 2 || o == 0) && ((e[a + 1] / i / 100) | 0) == 0))
      : t < 4
      ? (t == 0
          ? (o = (o / 1e3) | 0)
          : t == 1
          ? (o = (o / 100) | 0)
          : t == 2 && (o = (o / 10) | 0),
        (l = ((n || r < 4) && o == 9999) || (!n && r > 3 && o == 4999)))
      : (l =
          (((n || r < 4) && o + 1 == i) || (!n && r > 3 && o + 1 == i / 2)) &&
          ((e[a + 1] / i / 1e3) | 0) == et(10, t - 3) - 1),
    l
  );
}
function Ni(e, t, r) {
  for (var n, a = [0], i, l = 0, o = e.length; l < o; ) {
    for (i = a.length; i--; ) a[i] *= t;
    for (a[0] += oo.indexOf(e.charAt(l++)), n = 0; n < a.length; n++)
      a[n] > r - 1 &&
        (a[n + 1] === void 0 && (a[n + 1] = 0),
        (a[n + 1] += (a[n] / r) | 0),
        (a[n] %= r));
  }
  return a.reverse();
}
function sm(e, t) {
  var r, n, a;
  if (t.isZero()) return t;
  (n = t.d.length),
    n < 32
      ? ((r = Math.ceil(n / 3)), (a = (1 / Bi(4, r)).toString()))
      : ((r = 16), (a = "2.3283064365386962890625e-10")),
    (e.precision += r),
    (t = Mn(e, 1, t.times(a), new e(1)));
  for (var i = r; i--; ) {
    var l = t.times(t);
    t = l.times(l).minus(l).times(8).plus(1);
  }
  return (e.precision -= r), t;
}
var Le = (function () {
  function e(n, a, i) {
    var l,
      o = 0,
      s = n.length;
    for (n = n.slice(); s--; )
      (l = n[s] * a + o), (n[s] = l % i | 0), (o = (l / i) | 0);
    return o && n.unshift(o), n;
  }
  function t(n, a, i, l) {
    var o, s;
    if (i != l) s = i > l ? 1 : -1;
    else
      for (o = s = 0; o < i; o++)
        if (n[o] != a[o]) {
          s = n[o] > a[o] ? 1 : -1;
          break;
        }
    return s;
  }
  function r(n, a, i, l) {
    for (var o = 0; i--; )
      (n[i] -= o), (o = n[i] < a[i] ? 1 : 0), (n[i] = o * l + n[i] - a[i]);
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function (n, a, i, l, o, s) {
    var u,
      d,
      c,
      v,
      f,
      p,
      h,
      g,
      m,
      $,
      S,
      C,
      k,
      M,
      P,
      I,
      N,
      F,
      w,
      y,
      z = n.constructor,
      te = n.s == a.s ? 1 : -1,
      V = n.d,
      A = a.d;
    if (!V || !V[0] || !A || !A[0])
      return new z(
        !n.s || !a.s || (V ? A && V[0] == A[0] : !A)
          ? NaN
          : (V && V[0] == 0) || !A
          ? te * 0
          : te / 0
      );
    for (
      s
        ? ((f = 1), (d = n.e - a.e))
        : ((s = Ut), (f = we), (d = ct(n.e / f) - ct(a.e / f))),
        w = A.length,
        N = V.length,
        m = new z(te),
        $ = m.d = [],
        c = 0;
      A[c] == (V[c] || 0);
      c++
    );
    if (
      (A[c] > (V[c] || 0) && d--,
      i == null
        ? ((M = i = z.precision), (l = z.rounding))
        : o
        ? (M = i + (n.e - a.e) + 1)
        : (M = i),
      M < 0)
    )
      $.push(1), (p = !0);
    else {
      if (((M = (M / f + 2) | 0), (c = 0), w == 1)) {
        for (v = 0, A = A[0], M++; (c < N || v) && M--; c++)
          (P = v * s + (V[c] || 0)), ($[c] = (P / A) | 0), (v = P % A | 0);
        p = v || c < N;
      } else {
        for (
          v = (s / (A[0] + 1)) | 0,
            v > 1 &&
              ((A = e(A, v, s)),
              (V = e(V, v, s)),
              (w = A.length),
              (N = V.length)),
            I = w,
            S = V.slice(0, w),
            C = S.length;
          C < w;

        )
          S[C++] = 0;
        (y = A.slice()), y.unshift(0), (F = A[0]), A[1] >= s / 2 && ++F;
        do
          (v = 0),
            (u = t(A, S, w, C)),
            u < 0
              ? ((k = S[0]),
                w != C && (k = k * s + (S[1] || 0)),
                (v = (k / F) | 0),
                v > 1
                  ? (v >= s && (v = s - 1),
                    (h = e(A, v, s)),
                    (g = h.length),
                    (C = S.length),
                    (u = t(h, S, g, C)),
                    u == 1 && (v--, r(h, w < g ? y : A, g, s)))
                  : (v == 0 && (u = v = 1), (h = A.slice())),
                (g = h.length),
                g < C && h.unshift(0),
                r(S, h, C, s),
                u == -1 &&
                  ((C = S.length),
                  (u = t(A, S, w, C)),
                  u < 1 && (v++, r(S, w < C ? y : A, C, s))),
                (C = S.length))
              : u === 0 && (v++, (S = [0])),
            ($[c++] = v),
            u && S[0] ? (S[C++] = V[I] || 0) : ((S = [V[I]]), (C = 1));
        while ((I++ < N || S[0] !== void 0) && M--);
        p = S[0] !== void 0;
      }
      $[0] || $.shift();
    }
    if (f == 1) (m.e = d), (dd = p);
    else {
      for (c = 1, v = $[0]; v >= 10; v /= 10) c++;
      (m.e = c + d * f - 1), ye(m, o ? i + m.e + 1 : i, l, p);
    }
    return m;
  };
})();
function ye(e, t, r, n) {
  var a,
    i,
    l,
    o,
    s,
    u,
    d,
    c,
    v,
    f = e.constructor;
  e: if (t != null) {
    if (((c = e.d), !c)) return e;
    for (a = 1, o = c[0]; o >= 10; o /= 10) a++;
    if (((i = t - a), i < 0))
      (i += we),
        (l = t),
        (d = c[(v = 0)]),
        (s = (d / et(10, a - l - 1)) % 10 | 0);
    else if (((v = Math.ceil((i + 1) / we)), (o = c.length), v >= o))
      if (n) {
        for (; o++ <= v; ) c.push(0);
        (d = s = 0), (a = 1), (i %= we), (l = i - we + 1);
      } else break e;
    else {
      for (d = o = c[v], a = 1; o >= 10; o /= 10) a++;
      (i %= we),
        (l = i - we + a),
        (s = l < 0 ? 0 : (d / et(10, a - l - 1)) % 10 | 0);
    }
    if (
      ((n =
        n ||
        t < 0 ||
        c[v + 1] !== void 0 ||
        (l < 0 ? d : d % et(10, a - l - 1))),
      (u =
        r < 4
          ? (s || n) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : s > 5 ||
            (s == 5 &&
              (r == 4 ||
                n ||
                (r == 6 &&
                  (i > 0 ? (l > 0 ? d / et(10, a - l) : 0) : c[v - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7)))),
      t < 1 || !c[0])
    )
      return (
        (c.length = 0),
        u
          ? ((t -= e.e + 1),
            (c[0] = et(10, (we - (t % we)) % we)),
            (e.e = -t || 0))
          : (c[0] = e.e = 0),
        e
      );
    if (
      (i == 0
        ? ((c.length = v), (o = 1), v--)
        : ((c.length = v + 1),
          (o = et(10, we - i)),
          (c[v] = l > 0 ? ((d / et(10, a - l)) % et(10, l) | 0) * o : 0)),
      u)
    )
      for (;;)
        if (v == 0) {
          for (i = 1, l = c[0]; l >= 10; l /= 10) i++;
          for (l = c[0] += o, o = 1; l >= 10; l /= 10) o++;
          i != o && (e.e++, c[0] == Ut && (c[0] = 1));
          break;
        } else {
          if (((c[v] += o), c[v] != Ut)) break;
          (c[v--] = 0), (o = 1);
        }
    for (i = c.length; c[--i] === 0; ) c.pop();
  }
  return (
    Te &&
      (e.e > f.maxE
        ? ((e.d = null), (e.e = NaN))
        : e.e < f.minE && ((e.e = 0), (e.d = [0]))),
    e
  );
}
function xt(e, t, r) {
  if (!e.isFinite()) return bd(e);
  var n,
    a = e.e,
    i = dt(e.d),
    l = i.length;
  return (
    t
      ? (r && (n = r - l) > 0
          ? (i = i.charAt(0) + "." + i.slice(1) + gr(n))
          : l > 1 && (i = i.charAt(0) + "." + i.slice(1)),
        (i = i + (e.e < 0 ? "e" : "e+") + e.e))
      : a < 0
      ? ((i = "0." + gr(-a - 1) + i), r && (n = r - l) > 0 && (i += gr(n)))
      : a >= l
      ? ((i += gr(a + 1 - l)),
        r && (n = r - a - 1) > 0 && (i = i + "." + gr(n)))
      : ((n = a + 1) < l && (i = i.slice(0, n) + "." + i.slice(n)),
        r && (n = r - l) > 0 && (a + 1 === l && (i += "."), (i += gr(n)))),
    i
  );
}
function Ai(e, t) {
  var r = e[0];
  for (t *= we; r >= 10; r /= 10) t++;
  return t;
}
function Di(e, t, r) {
  if (t > om) throw ((Te = !0), r && (e.precision = r), Error(vd));
  return ye(new e(Oi), t, 1, !0);
}
function Yt(e, t, r) {
  if (t > uo) throw Error(vd);
  return ye(new e(_i), t, r, !0);
}
function pd(e) {
  var t = e.length - 1,
    r = t * we + 1;
  if (((t = e[t]), t)) {
    for (; t % 10 == 0; t /= 10) r--;
    for (t = e[0]; t >= 10; t /= 10) r++;
  }
  return r;
}
function gr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function md(e, t, r, n) {
  var a,
    i = new e(1),
    l = Math.ceil(n / we + 4);
  for (Te = !1; ; ) {
    if (
      (r % 2 && ((i = i.times(t)), wd(i.d, l) && (a = !0)),
      (r = ct(r / 2)),
      r === 0)
    ) {
      (r = i.d.length - 1), a && i.d[r] === 0 && ++i.d[r];
      break;
    }
    (t = t.times(t)), wd(t.d, l);
  }
  return (Te = !0), i;
}
function gd(e) {
  return e.d[e.d.length - 1] & 1;
}
function yd(e, t, r) {
  for (var n, a = new e(t[0]), i = 0; ++i < t.length; )
    if (((n = new e(t[i])), n.s)) a[r](n) && (a = n);
    else {
      a = n;
      break;
    }
  return a;
}
function vo(e, t) {
  var r,
    n,
    a,
    i,
    l,
    o,
    s,
    u = 0,
    d = 0,
    c = 0,
    v = e.constructor,
    f = v.rounding,
    p = v.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new v(
      e.d
        ? e.d[0]
          ? e.s < 0
            ? 0
            : 1 / 0
          : 1
        : e.s
        ? e.s < 0
          ? 0
          : e
        : 0 / 0
    );
  for (
    t == null ? ((Te = !1), (s = p)) : (s = t), o = new v(0.03125);
    e.e > -2;

  )
    (e = e.times(o)), (c += 5);
  for (
    n = ((Math.log(et(2, c)) / Math.LN10) * 2 + 5) | 0,
      s += n,
      r = i = l = new v(1),
      v.precision = s;
    ;

  ) {
    if (
      ((i = ye(i.times(e), s, 1)),
      (r = r.times(++d)),
      (o = l.plus(Le(i, r, s, 1))),
      dt(o.d).slice(0, s) === dt(l.d).slice(0, s))
    ) {
      for (a = c; a--; ) l = ye(l.times(l), s, 1);
      if (t == null)
        if (u < 3 && Ba(l.d, s - n, f, u))
          (v.precision = s += 10), (r = i = o = new v(1)), (d = 0), u++;
        else return ye(l, (v.precision = p), f, (Te = !0));
      else return (v.precision = p), l;
    }
    l = o;
  }
}
function yr(e, t) {
  var r,
    n,
    a,
    i,
    l,
    o,
    s,
    u,
    d,
    c,
    v,
    f = 1,
    p = 10,
    h = e,
    g = h.d,
    m = h.constructor,
    $ = m.rounding,
    S = m.precision;
  if (h.s < 0 || !g || !g[0] || (!h.e && g[0] == 1 && g.length == 1))
    return new m(g && !g[0] ? -1 / 0 : h.s != 1 ? NaN : g ? 0 : h);
  if (
    (t == null ? ((Te = !1), (d = S)) : (d = t),
    (m.precision = d += p),
    (r = dt(g)),
    (n = r.charAt(0)),
    Math.abs((i = h.e)) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (h = h.times(e)), (r = dt(h.d)), (n = r.charAt(0)), f++;
    (i = h.e),
      n > 1 ? ((h = new m("0." + r)), i++) : (h = new m(n + "." + r.slice(1)));
  } else
    return (
      (u = Di(m, d + 2, S).times(i + "")),
      (h = yr(new m(n + "." + r.slice(1)), d - p).plus(u)),
      (m.precision = S),
      t == null ? ye(h, S, $, (Te = !0)) : h
    );
  for (
    c = h,
      s = l = h = Le(h.minus(1), h.plus(1), d, 1),
      v = ye(h.times(h), d, 1),
      a = 3;
    ;

  ) {
    if (
      ((l = ye(l.times(v), d, 1)),
      (u = s.plus(Le(l, new m(a), d, 1))),
      dt(u.d).slice(0, d) === dt(s.d).slice(0, d))
    )
      if (
        ((s = s.times(2)),
        i !== 0 && (s = s.plus(Di(m, d + 2, S).times(i + ""))),
        (s = Le(s, new m(f), d, 1)),
        t == null)
      )
        if (Ba(s.d, d - p, $, o))
          (m.precision = d += p),
            (u = l = h = Le(c.minus(1), c.plus(1), d, 1)),
            (v = ye(h.times(h), d, 1)),
            (a = o = 1);
        else return ye(s, (m.precision = S), $, (Te = !0));
      else return (m.precision = S), s;
    (s = u), (a += 2);
  }
}
function bd(e) {
  return String((e.s * e.s) / 0);
}
function co(e, t) {
  var r, n, a;
  for (
    (r = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;
    n++
  );
  for (a = t.length; t.charCodeAt(a - 1) === 48; --a);
  if (((t = t.slice(n, a)), t)) {
    if (
      ((a -= n),
      (e.e = r = r - n - 1),
      (e.d = []),
      (n = (r + 1) % we),
      r < 0 && (n += we),
      n < a)
    ) {
      for (n && e.d.push(+t.slice(0, n)), a -= we; n < a; )
        e.d.push(+t.slice(n, (n += we)));
      (t = t.slice(n)), (n = we - t.length);
    } else n -= a;
    for (; n--; ) t += "0";
    e.d.push(+t),
      Te &&
        (e.e > e.constructor.maxE
          ? ((e.d = null), (e.e = NaN))
          : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])));
  } else (e.e = 0), (e.d = [0]);
  return e;
}
function um(e, t) {
  var r, n, a, i, l, o, s, u, d;
  if (t.indexOf("_") > -1) {
    if (((t = t.replace(/(\d)_(?=\d)/g, "$1")), hd.test(t))) return co(e, t);
  } else if (t === "Infinity" || t === "NaN")
    return +t || (e.s = NaN), (e.e = NaN), (e.d = null), e;
  if (am.test(t)) (r = 16), (t = t.toLowerCase());
  else if (nm.test(t)) r = 2;
  else if (im.test(t)) r = 8;
  else throw Error(mr + t);
  for (
    i = t.search(/p/i),
      i > 0
        ? ((s = +t.slice(i + 1)), (t = t.substring(2, i)))
        : (t = t.slice(2)),
      i = t.indexOf("."),
      l = i >= 0,
      n = e.constructor,
      l &&
        ((t = t.replace(".", "")),
        (o = t.length),
        (i = o - i),
        (a = md(n, new n(r), i, i * 2))),
      u = Ni(t, r, Ut),
      d = u.length - 1,
      i = d;
    u[i] === 0;
    --i
  )
    u.pop();
  return i < 0
    ? new n(e.s * 0)
    : ((e.e = Ai(u, d)),
      (e.d = u),
      (Te = !1),
      l && (e = Le(e, a, o * 4)),
      s && (e = e.times(Math.abs(s) < 54 ? et(2, s) : br.pow(2, s))),
      (Te = !0),
      e);
}
function dm(e, t) {
  var r,
    n = t.d.length;
  if (n < 3) return t.isZero() ? t : Mn(e, 2, t, t);
  (r = 1.4 * Math.sqrt(n)),
    (r = r > 16 ? 16 : r | 0),
    (t = t.times(1 / Bi(5, r))),
    (t = Mn(e, 2, t, t));
  for (var a, i = new e(5), l = new e(16), o = new e(20); r--; )
    (a = t.times(t)), (t = t.times(i.plus(a.times(l.times(a).minus(o)))));
  return t;
}
function Mn(e, t, r, n, a) {
  var i,
    l,
    o,
    s,
    u = e.precision,
    d = Math.ceil(u / we);
  for (Te = !1, s = r.times(r), o = new e(n); ; ) {
    if (
      ((l = Le(o.times(s), new e(t++ * t++), u, 1)),
      (o = a ? n.plus(l) : n.minus(l)),
      (n = Le(l.times(s), new e(t++ * t++), u, 1)),
      (l = o.plus(n)),
      l.d[d] !== void 0)
    ) {
      for (i = d; l.d[i] === o.d[i] && i--; );
      if (i == -1) break;
    }
    (i = o), (o = n), (n = l), (l = i);
  }
  return (Te = !0), (l.d.length = d + 1), l;
}
function Bi(e, t) {
  for (var r = e; --t; ) r *= e;
  return r;
}
function Cd(e, t) {
  var r,
    n = t.s < 0,
    a = Yt(e, e.precision, 1),
    i = a.times(0.5);
  if (((t = t.abs()), t.lte(i))) return (ir = n ? 4 : 1), t;
  if (((r = t.divToInt(a)), r.isZero())) ir = n ? 3 : 2;
  else {
    if (((t = t.minus(r.times(a))), t.lte(i)))
      return (ir = gd(r) ? (n ? 2 : 3) : n ? 4 : 1), t;
    ir = gd(r) ? (n ? 1 : 4) : n ? 3 : 2;
  }
  return t.minus(a).abs();
}
function fo(e, t, r, n) {
  var a,
    i,
    l,
    o,
    s,
    u,
    d,
    c,
    v,
    f = e.constructor,
    p = r !== void 0;
  if (
    (p
      ? (gt(r, 1, pr), n === void 0 ? (n = f.rounding) : gt(n, 0, 8))
      : ((r = f.precision), (n = f.rounding)),
    !e.isFinite())
  )
    d = bd(e);
  else {
    for (
      d = xt(e),
        l = d.indexOf("."),
        p
          ? ((a = 2), t == 16 ? (r = r * 4 - 3) : t == 8 && (r = r * 3 - 2))
          : (a = t),
        l >= 0 &&
          ((d = d.replace(".", "")),
          (v = new f(1)),
          (v.e = d.length - l),
          (v.d = Ni(xt(v), 10, a)),
          (v.e = v.d.length)),
        c = Ni(d, 10, a),
        i = s = c.length;
      c[--s] == 0;

    )
      c.pop();
    if (!c[0]) d = p ? "0p+0" : "0";
    else {
      if (
        (l < 0
          ? i--
          : ((e = new f(e)),
            (e.d = c),
            (e.e = i),
            (e = Le(e, v, r, n, 0, a)),
            (c = e.d),
            (i = e.e),
            (u = dd)),
        (l = c[r]),
        (o = a / 2),
        (u = u || c[r + 1] !== void 0),
        (u =
          n < 4
            ? (l !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2))
            : l > o ||
              (l === o &&
                (n === 4 ||
                  u ||
                  (n === 6 && c[r - 1] & 1) ||
                  n === (e.s < 0 ? 8 : 7)))),
        (c.length = r),
        u)
      )
        for (; ++c[--r] > a - 1; ) (c[r] = 0), r || (++i, c.unshift(1));
      for (s = c.length; !c[s - 1]; --s);
      for (l = 0, d = ""; l < s; l++) d += oo.charAt(c[l]);
      if (p) {
        if (s > 1)
          if (t == 16 || t == 8) {
            for (l = t == 16 ? 4 : 3, --s; s % l; s++) d += "0";
            for (c = Ni(d, a, t), s = c.length; !c[s - 1]; --s);
            for (l = 1, d = "1."; l < s; l++) d += oo.charAt(c[l]);
          } else d = d.charAt(0) + "." + d.slice(1);
        d = d + (i < 0 ? "p" : "p+") + i;
      } else if (i < 0) {
        for (; ++i; ) d = "0" + d;
        d = "0." + d;
      } else if (++i > s) for (i -= s; i--; ) d += "0";
      else i < s && (d = d.slice(0, i) + "." + d.slice(i));
    }
    d = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + d;
  }
  return e.s < 0 ? "-" + d : d;
}
function wd(e, t) {
  if (e.length > t) return (e.length = t), !0;
}
function vm(e) {
  return new this(e).abs();
}
function cm(e) {
  return new this(e).acos();
}
function fm(e) {
  return new this(e).acosh();
}
function hm(e, t) {
  return new this(e).plus(t);
}
function pm(e) {
  return new this(e).asin();
}
function mm(e) {
  return new this(e).asinh();
}
function gm(e) {
  return new this(e).atan();
}
function ym(e) {
  return new this(e).atanh();
}
function bm(e, t) {
  (e = new this(e)), (t = new this(t));
  var r,
    n = this.precision,
    a = this.rounding,
    i = n + 4;
  return (
    !e.s || !t.s
      ? (r = new this(NaN))
      : !e.d && !t.d
      ? ((r = Yt(this, i, 1).times(t.s > 0 ? 0.25 : 0.75)), (r.s = e.s))
      : !t.d || e.isZero()
      ? ((r = t.s < 0 ? Yt(this, n, a) : new this(0)), (r.s = e.s))
      : !e.d || t.isZero()
      ? ((r = Yt(this, i, 1).times(0.5)), (r.s = e.s))
      : t.s < 0
      ? ((this.precision = i),
        (this.rounding = 1),
        (r = this.atan(Le(e, t, i, 1))),
        (t = Yt(this, i, 1)),
        (this.precision = n),
        (this.rounding = a),
        (r = e.s < 0 ? r.minus(t) : r.plus(t)))
      : (r = this.atan(Le(e, t, i, 1))),
    r
  );
}
function Cm(e) {
  return new this(e).cbrt();
}
function wm(e) {
  return ye((e = new this(e)), e.e + 1, 2);
}
function km(e, t, r) {
  return new this(e).clamp(t, r);
}
function Sm(e) {
  if (!e || typeof e != "object") throw Error(Vi + "Object expected");
  var t,
    r,
    n,
    a = e.defaults === !0,
    i = [
      "precision",
      1,
      pr,
      "rounding",
      0,
      8,
      "toExpNeg",
      -En,
      0,
      "toExpPos",
      0,
      En,
      "maxE",
      0,
      En,
      "minE",
      -En,
      0,
      "modulo",
      0,
      9,
    ];
  for (t = 0; t < i.length; t += 3)
    if (((r = i[t]), a && (this[r] = so[r]), (n = e[r]) !== void 0))
      if (ct(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(mr + r + ": " + n);
  if (((r = "crypto"), a && (this[r] = so[r]), (n = e[r]) !== void 0))
    if (n === !0 || n === !1 || n === 0 || n === 1)
      if (n)
        if (
          typeof crypto != "undefined" &&
          crypto &&
          (crypto.getRandomValues || crypto.randomBytes)
        )
          this[r] = !0;
        else throw Error(cd);
      else this[r] = !1;
    else throw Error(mr + r + ": " + n);
  return this;
}
function Tm(e) {
  return new this(e).cos();
}
function $m(e) {
  return new this(e).cosh();
}
function kd(e) {
  var t, r, n;
  function a(i) {
    var l,
      o,
      s,
      u = this;
    if (!(u instanceof a)) return new a(i);
    if (((u.constructor = a), Sd(i))) {
      (u.s = i.s),
        Te
          ? !i.d || i.e > a.maxE
            ? ((u.e = NaN), (u.d = null))
            : i.e < a.minE
            ? ((u.e = 0), (u.d = [0]))
            : ((u.e = i.e), (u.d = i.d.slice()))
          : ((u.e = i.e), (u.d = i.d ? i.d.slice() : i.d));
      return;
    }
    if (((s = typeof i), s === "number")) {
      if (i === 0) {
        (u.s = 1 / i < 0 ? -1 : 1), (u.e = 0), (u.d = [0]);
        return;
      }
      if ((i < 0 ? ((i = -i), (u.s = -1)) : (u.s = 1), i === ~~i && i < 1e7)) {
        for (l = 0, o = i; o >= 10; o /= 10) l++;
        Te
          ? l > a.maxE
            ? ((u.e = NaN), (u.d = null))
            : l < a.minE
            ? ((u.e = 0), (u.d = [0]))
            : ((u.e = l), (u.d = [i]))
          : ((u.e = l), (u.d = [i]));
        return;
      } else if (i * 0 != 0) {
        i || (u.s = NaN), (u.e = NaN), (u.d = null);
        return;
      }
      return co(u, i.toString());
    } else if (s !== "string") throw Error(mr + i);
    return (
      (o = i.charCodeAt(0)) === 45
        ? ((i = i.slice(1)), (u.s = -1))
        : (o === 43 && (i = i.slice(1)), (u.s = 1)),
      hd.test(i) ? co(u, i) : um(u, i)
    );
  }
  if (
    ((a.prototype = H),
    (a.ROUND_UP = 0),
    (a.ROUND_DOWN = 1),
    (a.ROUND_CEIL = 2),
    (a.ROUND_FLOOR = 3),
    (a.ROUND_HALF_UP = 4),
    (a.ROUND_HALF_DOWN = 5),
    (a.ROUND_HALF_EVEN = 6),
    (a.ROUND_HALF_CEIL = 7),
    (a.ROUND_HALF_FLOOR = 8),
    (a.EUCLID = 9),
    (a.config = a.set = Sm),
    (a.clone = kd),
    (a.isDecimal = Sd),
    (a.abs = vm),
    (a.acos = cm),
    (a.acosh = fm),
    (a.add = hm),
    (a.asin = pm),
    (a.asinh = mm),
    (a.atan = gm),
    (a.atanh = ym),
    (a.atan2 = bm),
    (a.cbrt = Cm),
    (a.ceil = wm),
    (a.clamp = km),
    (a.cos = Tm),
    (a.cosh = $m),
    (a.div = Em),
    (a.exp = Mm),
    (a.floor = Im),
    (a.hypot = Pm),
    (a.ln = Om),
    (a.log = _m),
    (a.log10 = Nm),
    (a.log2 = Vm),
    (a.max = Am),
    (a.min = Dm),
    (a.mod = Bm),
    (a.mul = Fm),
    (a.pow = Lm),
    (a.random = zm),
    (a.round = Rm),
    (a.sign = Um),
    (a.sin = Ym),
    (a.sinh = Hm),
    (a.sqrt = Wm),
    (a.sub = jm),
    (a.sum = Km),
    (a.tan = qm),
    (a.tanh = Xm),
    (a.trunc = Gm),
    e === void 0 && (e = {}),
    e && e.defaults !== !0)
  )
    for (
      n = [
        "precision",
        "rounding",
        "toExpNeg",
        "toExpPos",
        "maxE",
        "minE",
        "modulo",
        "crypto",
      ],
        t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r]);
  return a.config(e), a;
}
function Em(e, t) {
  return new this(e).div(t);
}
function Mm(e) {
  return new this(e).exp();
}
function Im(e) {
  return ye((e = new this(e)), e.e + 1, 3);
}
function Pm() {
  var e,
    t,
    r = new this(0);
  for (Te = !1, e = 0; e < arguments.length; )
    if (((t = new this(arguments[e++])), t.d)) r.d && (r = r.plus(t.times(t)));
    else {
      if (t.s) return (Te = !0), new this(1 / 0);
      r = t;
    }
  return (Te = !0), r.sqrt();
}
function Sd(e) {
  return e instanceof br || (e && e.toStringTag === fd) || !1;
}
function Om(e) {
  return new this(e).ln();
}
function _m(e, t) {
  return new this(e).log(t);
}
function Vm(e) {
  return new this(e).log(2);
}
function Nm(e) {
  return new this(e).log(10);
}
function Am() {
  return yd(this, arguments, "lt");
}
function Dm() {
  return yd(this, arguments, "gt");
}
function Bm(e, t) {
  return new this(e).mod(t);
}
function Fm(e, t) {
  return new this(e).mul(t);
}
function Lm(e, t) {
  return new this(e).pow(t);
}
function zm(e) {
  var t,
    r,
    n,
    a,
    i = 0,
    l = new this(1),
    o = [];
  if (
    (e === void 0 ? (e = this.precision) : gt(e, 1, pr),
    (n = Math.ceil(e / we)),
    this.crypto)
  )
    if (crypto.getRandomValues)
      for (t = crypto.getRandomValues(new Uint32Array(n)); i < n; )
        (a = t[i]),
          a >= 429e7
            ? (t[i] = crypto.getRandomValues(new Uint32Array(1))[0])
            : (o[i++] = a % 1e7);
    else if (crypto.randomBytes) {
      for (t = crypto.randomBytes((n *= 4)); i < n; )
        (a =
          t[i] + (t[i + 1] << 8) + (t[i + 2] << 16) + ((t[i + 3] & 127) << 24)),
          a >= 214e7
            ? crypto.randomBytes(4).copy(t, i)
            : (o.push(a % 1e7), (i += 4));
      i = n / 4;
    } else throw Error(cd);
  else for (; i < n; ) o[i++] = (Math.random() * 1e7) | 0;
  for (
    n = o[--i],
      e %= we,
      n && e && ((a = et(10, we - e)), (o[i] = ((n / a) | 0) * a));
    o[i] === 0;
    i--
  )
    o.pop();
  if (i < 0) (r = 0), (o = [0]);
  else {
    for (r = -1; o[0] === 0; r -= we) o.shift();
    for (n = 1, a = o[0]; a >= 10; a /= 10) n++;
    n < we && (r -= we - n);
  }
  return (l.e = r), (l.d = o), l;
}
function Rm(e) {
  return ye((e = new this(e)), e.e + 1, this.rounding);
}
function Um(e) {
  return (e = new this(e)), e.d ? (e.d[0] ? e.s : 0 * e.s) : e.s || NaN;
}
function Ym(e) {
  return new this(e).sin();
}
function Hm(e) {
  return new this(e).sinh();
}
function Wm(e) {
  return new this(e).sqrt();
}
function jm(e, t) {
  return new this(e).sub(t);
}
function Km() {
  var e = 0,
    t = arguments,
    r = new this(t[e]);
  for (Te = !1; r.s && ++e < t.length; ) r = r.plus(t[e]);
  return (Te = !0), ye(r, this.precision, this.rounding);
}
function qm(e) {
  return new this(e).tan();
}
function Xm(e) {
  return new this(e).tanh();
}
function Gm(e) {
  return ye((e = new this(e)), e.e + 1, 1);
}
H[Symbol.for("nodejs.util.inspect.custom")] = H.toString;
H[Symbol.toStringTag] = "Decimal";
var br = (H.constructor = kd(so));
Oi = new br(Oi);
_i = new br(_i);
var Zm = {
    modelValue: { type: [String, Number], default: 0 },
    min: { type: [String, Number] },
    max: { type: [String, Number] },
    step: { type: [String, Number], default: 1 },
    color: { type: String },
    inputWidth: { type: [String, Number] },
    inputTextSize: { type: [String, Number] },
    buttonSize: { type: [String, Number] },
    decimalLength: { type: [String, Number] },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    disableIncrement: { type: Boolean, default: !1 },
    disableDecrement: { type: Boolean, default: !1 },
    disableInput: { type: Boolean, default: !1 },
    lazyChange: { type: Boolean, default: !1 },
    incrementButton: { type: Boolean, default: !0 },
    decrementButton: { type: Boolean, default: !0 },
    press: { type: Boolean, default: !0 },
    ripple: { type: Boolean, default: !0 },
    validateTrigger: {
      type: Array,
      default: () => [
        "onInputChange",
        "onLazyChange",
        "onIncrement",
        "onDecrement",
      ],
    },
    rules: { type: Array },
    onBeforeChange: { type: Function },
    onChange: { type: Function },
    onIncrement: { type: Function },
    onDecrement: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  Td = 100,
  $d = 600,
  Jm = { class: "var-counter var--box" },
  Qm = ["inputmode", "readonly", "disabled"];
function xm(e, t) {
  var r = fe("var-icon"),
    n = fe("var-form-details"),
    a = ht("ripple");
  return (
    T(),
    _("div", Jm, [
      B(
        "div",
        Xe(
          {
            class: [
              "var-counter__controller var-elevation--2",
              [
                e.disabled || e.formDisabled ? "var-counter--disabled" : null,
                e.errorMessage ? "var-counter--error" : null,
              ],
            ],
            style: { background: e.color ? e.color : void 0 },
          },
          e.$attrs
        ),
        [
          Re(
            ee(
              r,
              {
                class: Y([
                  "var-counter__decrement-button",
                  [e.decrementButton ? null : "var-counter--hidden"],
                ]),
                "var-counter-cover": "",
                name: "minus",
                style: J({
                  width: e.toSizeUnit(e.buttonSize),
                  height: e.toSizeUnit(e.buttonSize),
                }),
                onClick: e.decrement,
                onTouchstart: e.pressDecrement,
                onTouchend: e.releaseDecrement,
                onTouchcancel: e.releaseDecrement,
              },
              null,
              8,
              [
                "class",
                "style",
                "onClick",
                "onTouchstart",
                "onTouchend",
                "onTouchcancel",
              ]
            ),
            [
              [
                a,
                {
                  disabled:
                    !e.ripple ||
                    e.disabled ||
                    e.readonly ||
                    e.disableDecrement ||
                    !e.decrementButton ||
                    e.isMin,
                },
              ],
            ]
          ),
          Re(
            B(
              "input",
              {
                class: "var-counter__input",
                style: J({
                  width: e.toSizeUnit(e.inputWidth),
                  fontSize: e.toSizeUnit(e.inputTextSize),
                }),
                inputmode:
                  e.toNumber(e.decimalLength) === 0 ? "numeric" : "decimal",
                readonly: e.readonly || e.formReadonly,
                disabled: e.disabled || e.formDisabled || e.disableInput,
                "onUpdate:modelValue":
                  t[0] || (t[0] = (i) => (e.inputValue = i)),
                onChange:
                  t[1] ||
                  (t[1] = (...i) => e.handleChange && e.handleChange(...i)),
              },
              null,
              44,
              Qm
            ),
            [[qf, e.inputValue]]
          ),
          Re(
            ee(
              r,
              {
                class: Y([
                  "var-counter__increment-button",
                  [e.incrementButton ? null : "var-counter--hidden"],
                ]),
                "var-counter-cover": "",
                name: "plus",
                style: J({
                  width: e.toSizeUnit(e.buttonSize),
                  height: e.toSizeUnit(e.buttonSize),
                }),
                onClick: e.increment,
                onTouchstart: e.pressIncrement,
                onTouchend: e.releaseIncrement,
                onTouchcancel: e.releaseIncrement,
              },
              null,
              8,
              [
                "class",
                "style",
                "onClick",
                "onTouchstart",
                "onTouchend",
                "onTouchcancel",
              ]
            ),
            [
              [
                a,
                {
                  disabled:
                    !e.ripple ||
                    e.disabled ||
                    e.readonly ||
                    e.disableIncrement ||
                    !e.incrementButton ||
                    e.isMax,
                },
              ],
            ]
          ),
        ],
        16
      ),
      ee(n, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
    ])
  );
}
var In = ve({
  render: xm,
  name: "VarCounter",
  components: { VarIcon: We, VarFormDetails: ut },
  directives: { Ripple: lt },
  inheritAttrs: !1,
  props: Zm,
  setup(e) {
    var t = D(""),
      r,
      n,
      a,
      i,
      { bindForm: l, form: o } = Rt(),
      {
        errorMessage: s,
        validateWithTrigger: u,
        validate: d,
        resetValidation: c,
      } = Lt(),
      { readonly: v, disabled: f } = o != null ? o : {},
      p = () => d(e.rules, e.modelValue),
      h = (A) => {
        Ye(() => {
          var { validateTrigger: X, rules: le, modelValue: x } = e;
          u(X, A, le, x);
        });
      },
      g = () => {
        var A,
          { min: X } = e;
        (A = e["onUpdate:modelValue"]) == null ||
          A.call(e, X != null ? R(X) : 0),
          c();
      },
      m = { reset: g, validate: p, resetValidation: c },
      $ = j(() => {
        var { max: A, modelValue: X } = e;
        return A != null && R(X) >= R(A);
      }),
      S = j(() => {
        var { min: A, modelValue: X } = e;
        return A != null && R(X) <= R(A);
      }),
      C = (A) => {
        var { decimalLength: X, max: le, min: x } = e,
          O = R(A);
        return (
          le != null && O > R(le) && (O = R(le)),
          x != null && O < R(x) && (O = R(x)),
          (A = String(O)),
          X != null && (A = O.toFixed(R(X))),
          A
        );
      },
      k = (A) => {
        var { lazyChange: X, onBeforeChange: le } = e,
          { value: x } = A.target,
          O = C(x);
        X ? le == null || le(R(O), V) : te(O), h("onInputChange");
      },
      M = () => {
        var {
          disabled: A,
          readonly: X,
          disableDecrement: le,
          decrementButton: x,
          lazyChange: O,
          step: U,
          modelValue: re,
          onDecrement: pe,
          onBeforeChange: ce,
        } = e;
        if (
          !(
            (f != null && f.value) ||
            (v != null && v.value) ||
            A ||
            X ||
            le ||
            !x
          ) &&
          !S.value
        ) {
          var q = new br(R(re)).minus(new br(R(U))).toString(),
            ge = C(q),
            ue = R(ge);
          pe == null || pe(ue),
            O ? ce == null || ce(ue, V) : (te(ge), h("onDecrement"));
        }
      },
      P = () => {
        var {
          disabled: A,
          readonly: X,
          disableIncrement: le,
          incrementButton: x,
          lazyChange: O,
          step: U,
          modelValue: re,
          onIncrement: pe,
          onBeforeChange: ce,
        } = e;
        if (
          !(
            (f != null && f.value) ||
            (v != null && v.value) ||
            A ||
            X ||
            le ||
            !x
          ) &&
          !$.value
        ) {
          var q = new br(R(re)).plus(new br(R(U))).toString(),
            ge = C(q),
            ue = R(ge);
          pe == null || pe(ue),
            O ? ce == null || ce(ue, V) : (te(ge), h("onIncrement"));
        }
      },
      I = () => {
        var { press: A, lazyChange: X } = e;
        !A ||
          X ||
          (i = window.setTimeout(() => {
            z();
          }, $d));
      },
      N = () => {
        var { press: A, lazyChange: X } = e;
        !A ||
          X ||
          (a = window.setTimeout(() => {
            y();
          }, $d));
      },
      F = () => {
        n && clearTimeout(n), i && clearTimeout(i);
      },
      w = () => {
        r && clearTimeout(r), a && clearTimeout(a);
      },
      y = () => {
        r = window.setTimeout(() => {
          P(), y();
        }, Td);
      },
      z = () => {
        n = window.setTimeout(() => {
          M(), z();
        }, Td);
      },
      te = (A) => {
        var X;
        t.value = A;
        var le = R(A);
        (X = e["onUpdate:modelValue"]) == null || X.call(e, le);
      },
      V = (A) => {
        te(C(String(A))), h("onLazyChange");
      };
    return (
      l == null || l(m),
      me(
        () => e.modelValue,
        (A) => {
          te(C(String(A))), e.onChange == null || e.onChange(R(A));
        }
      ),
      te(C(String(e.modelValue))),
      {
        inputValue: t,
        errorMessage: s,
        formDisabled: f,
        formReadonly: v,
        isMax: $,
        isMin: S,
        validate: p,
        reset: g,
        resetValidation: c,
        handleChange: k,
        decrement: M,
        increment: P,
        pressDecrement: I,
        pressIncrement: N,
        releaseDecrement: F,
        releaseIncrement: w,
        toSizeUnit: ot,
        toNumber: R,
      }
    );
  },
});
In.install = function (e) {
  e.component(In.name, In);
};
var Ed = 60,
  Md = Ed * 60,
  Id = Md * 24,
  eg = Id * 7,
  Pn = 1e3,
  ho = Ed * Pn,
  Pd = Md * Pn,
  tg = Id * Pn,
  rg = eg * Pn,
  po = "millisecond",
  On = "second",
  _n = "minute",
  Vn = "hour",
  Cr = "day",
  Fi = "week",
  Ht = "month",
  Od = "quarter",
  wr = "year",
  Nn = "date",
  ng = "YYYY-MM-DDTHH:mm:ssZ",
  _d = "Invalid Date",
  ag =
    /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
  ig =
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
  lg = {
    name: "en",
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
      "_"
    ),
    months:
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ),
  },
  mo = function (t, r, n) {
    var a = String(t);
    return !a || a.length >= r ? t : "" + Array(r + 1 - a.length).join(n) + t;
  },
  og = function (t) {
    var r = -t.utcOffset(),
      n = Math.abs(r),
      a = Math.floor(n / 60),
      i = n % 60;
    return "" + (r <= 0 ? "+" : "-") + mo(a, 2, "0") + ":" + mo(i, 2, "0");
  },
  sg = function e(t, r) {
    if (t.date() < r.date()) return -e(r, t);
    var n = (r.year() - t.year()) * 12 + (r.month() - t.month()),
      a = t.clone().add(n, Ht),
      i = r - a < 0,
      l = t.clone().add(n + (i ? -1 : 1), Ht);
    return +(-(n + (r - a) / (i ? a - l : l - a)) || 0);
  },
  ug = function (t) {
    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
  },
  dg = function (t) {
    var r = {
      M: Ht,
      y: wr,
      w: Fi,
      d: Cr,
      D: Nn,
      h: Vn,
      m: _n,
      s: On,
      ms: po,
      Q: Od,
    };
    return (
      r[t] ||
      String(t || "")
        .toLowerCase()
        .replace(/s$/, "")
    );
  },
  vg = function (t) {
    return t === void 0;
  },
  cg = { s: mo, z: og, m: sg, a: ug, p: dg, u: vg },
  Fa = "en",
  Zr = {};
Zr[Fa] = lg;
var go = function (t) {
    return t instanceof zi;
  },
  Li = function (t, r, n) {
    var a;
    if (!t) return Fa;
    if (typeof t == "string") Zr[t] && (a = t), r && ((Zr[t] = r), (a = t));
    else {
      var i = t.name;
      (Zr[i] = t), (a = i);
    }
    return !n && a && (Fa = a), a || (!n && Fa);
  },
  se = function (t, r) {
    if (go(t)) return t.clone();
    var n = typeof r == "object" ? r : {};
    return (n.date = t), (n.args = arguments), new zi(n);
  },
  fg = function (t, r) {
    return se(t, { locale: r.$L, utc: r.$u, x: r.$x, $offset: r.$offset });
  },
  ze = cg;
ze.l = Li;
ze.i = go;
ze.w = fg;
var hg = function (t) {
    var r = t.date,
      n = t.utc;
    if (r === null) return new Date(NaN);
    if (ze.u(r)) return new Date();
    if (r instanceof Date) return new Date(r);
    if (typeof r == "string" && !/Z$/i.test(r)) {
      var a = r.match(ag);
      if (a) {
        var i = a[2] - 1 || 0,
          l = (a[7] || "0").substring(0, 3);
        return n
          ? new Date(
              Date.UTC(a[1], i, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, l)
            )
          : new Date(a[1], i, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, l);
      }
    }
    return new Date(r);
  },
  zi = (function () {
    function e(r) {
      (this.$L = Li(r.locale, null, !0)), this.parse(r);
    }
    var t = e.prototype;
    return (
      (t.parse = function (n) {
        (this.$d = hg(n)), (this.$x = n.x || {}), this.init();
      }),
      (t.init = function () {
        var n = this.$d;
        (this.$y = n.getFullYear()),
          (this.$M = n.getMonth()),
          (this.$D = n.getDate()),
          (this.$W = n.getDay()),
          (this.$H = n.getHours()),
          (this.$m = n.getMinutes()),
          (this.$s = n.getSeconds()),
          (this.$ms = n.getMilliseconds());
      }),
      (t.$utils = function () {
        return ze;
      }),
      (t.isValid = function () {
        return this.$d.toString() !== _d;
      }),
      (t.isSame = function (n, a) {
        var i = se(n);
        return this.startOf(a) <= i && i <= this.endOf(a);
      }),
      (t.isAfter = function (n, a) {
        return se(n) < this.startOf(a);
      }),
      (t.isBefore = function (n, a) {
        return this.endOf(a) < se(n);
      }),
      (t.$g = function (n, a, i) {
        return ze.u(n) ? this[a] : this.set(i, n);
      }),
      (t.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }),
      (t.valueOf = function () {
        return this.$d.getTime();
      }),
      (t.startOf = function (n, a) {
        var i = this,
          l = ze.u(a) ? !0 : a,
          o = ze.p(n),
          s = function (m, $) {
            var S = ze.w(i.$u ? Date.UTC(i.$y, $, m) : new Date(i.$y, $, m), i);
            return l ? S : S.endOf(Cr);
          },
          u = function (m, $) {
            var S = [0, 0, 0, 0],
              C = [23, 59, 59, 999];
            return ze.w(
              i.toDate()[m].apply(i.toDate("s"), (l ? S : C).slice($)),
              i
            );
          },
          d = this.$W,
          c = this.$M,
          v = this.$D,
          f = "set" + (this.$u ? "UTC" : "");
        switch (o) {
          case wr:
            return l ? s(1, 0) : s(31, 11);
          case Ht:
            return l ? s(1, c) : s(0, c + 1);
          case Fi: {
            var p = this.$locale().weekStart || 0,
              h = (d < p ? d + 7 : d) - p;
            return s(l ? v - h : v + (6 - h), c);
          }
          case Cr:
          case Nn:
            return u(f + "Hours", 0);
          case Vn:
            return u(f + "Minutes", 1);
          case _n:
            return u(f + "Seconds", 2);
          case On:
            return u(f + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }),
      (t.endOf = function (n) {
        return this.startOf(n, !1);
      }),
      (t.$set = function (n, a) {
        var i,
          l = ze.p(n),
          o = "set" + (this.$u ? "UTC" : ""),
          s = ((i = {}),
          (i[Cr] = o + "Date"),
          (i[Nn] = o + "Date"),
          (i[Ht] = o + "Month"),
          (i[wr] = o + "FullYear"),
          (i[Vn] = o + "Hours"),
          (i[_n] = o + "Minutes"),
          (i[On] = o + "Seconds"),
          (i[po] = o + "Milliseconds"),
          i)[l],
          u = l === Cr ? this.$D + (a - this.$W) : a;
        if (l === Ht || l === wr) {
          var d = this.clone().set(Nn, 1);
          d.$d[s](u),
            d.init(),
            (this.$d = d.set(Nn, Math.min(this.$D, d.daysInMonth())).$d);
        } else s && this.$d[s](u);
        return this.init(), this;
      }),
      (t.set = function (n, a) {
        return this.clone().$set(n, a);
      }),
      (t.get = function (n) {
        return this[ze.p(n)]();
      }),
      (t.add = function (n, a) {
        var i = this,
          l;
        n = Number(n);
        var o = ze.p(a),
          s = function (v) {
            var f = se(i);
            return ze.w(f.date(f.date() + Math.round(v * n)), i);
          };
        if (o === Ht) return this.set(Ht, this.$M + n);
        if (o === wr) return this.set(wr, this.$y + n);
        if (o === Cr) return s(1);
        if (o === Fi) return s(7);
        var u = ((l = {}), (l[_n] = ho), (l[Vn] = Pd), (l[On] = Pn), l)[o] || 1,
          d = this.$d.getTime() + n * u;
        return ze.w(d, this);
      }),
      (t.subtract = function (n, a) {
        return this.add(n * -1, a);
      }),
      (t.format = function (n) {
        var a = this,
          i = this.$locale();
        if (!this.isValid()) return i.invalidDate || _d;
        var l = n || ng,
          o = ze.z(this),
          s = this.$H,
          u = this.$m,
          d = this.$M,
          c = i.weekdays,
          v = i.months,
          f = i.meridiem,
          p = function (S, C, k, M) {
            return (S && (S[C] || S(a, l))) || k[C].substr(0, M);
          },
          h = function (S) {
            return ze.s(s % 12 || 12, S, "0");
          },
          g =
            f ||
            function ($, S, C) {
              var k = $ < 12 ? "AM" : "PM";
              return C ? k.toLowerCase() : k;
            },
          m = {
            YY: String(this.$y).slice(-2),
            YYYY: this.$y,
            M: d + 1,
            MM: ze.s(d + 1, 2, "0"),
            MMM: p(i.monthsShort, d, v, 3),
            MMMM: p(v, d),
            D: this.$D,
            DD: ze.s(this.$D, 2, "0"),
            d: String(this.$W),
            dd: p(i.weekdaysMin, this.$W, c, 2),
            ddd: p(i.weekdaysShort, this.$W, c, 3),
            dddd: c[this.$W],
            H: String(s),
            HH: ze.s(s, 2, "0"),
            h: h(1),
            hh: h(2),
            a: g(s, u, !0),
            A: g(s, u, !1),
            m: String(u),
            mm: ze.s(u, 2, "0"),
            s: String(this.$s),
            ss: ze.s(this.$s, 2, "0"),
            SSS: ze.s(this.$ms, 3, "0"),
            Z: o,
          };
        return l.replace(ig, function ($, S) {
          return S || m[$] || o.replace(":", "");
        });
      }),
      (t.utcOffset = function () {
        return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
      }),
      (t.diff = function (n, a, i) {
        var l,
          o = ze.p(a),
          s = se(n),
          u = (s.utcOffset() - this.utcOffset()) * ho,
          d = this - s,
          c = ze.m(this, s);
        return (
          (c =
            ((l = {}),
            (l[wr] = c / 12),
            (l[Ht] = c),
            (l[Od] = c / 3),
            (l[Fi] = (d - u) / rg),
            (l[Cr] = (d - u) / tg),
            (l[Vn] = d / Pd),
            (l[_n] = d / ho),
            (l[On] = d / Pn),
            l)[o] || d),
          i ? c : ze.a(c)
        );
      }),
      (t.daysInMonth = function () {
        return this.endOf(Ht).$D;
      }),
      (t.$locale = function () {
        return Zr[this.$L];
      }),
      (t.locale = function (n, a) {
        if (!n) return this.$L;
        var i = this.clone(),
          l = Li(n, a, !0);
        return l && (i.$L = l), i;
      }),
      (t.clone = function () {
        return ze.w(this.$d, this);
      }),
      (t.toDate = function () {
        return new Date(this.valueOf());
      }),
      (t.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }),
      (t.toISOString = function () {
        return this.$d.toISOString();
      }),
      (t.toString = function () {
        return this.$d.toUTCString();
      }),
      e
    );
  })(),
  Vd = zi.prototype;
se.prototype = Vd;
[
  ["$ms", po],
  ["$s", On],
  ["$m", _n],
  ["$H", Vn],
  ["$W", Cr],
  ["$M", Ht],
  ["$y", wr],
  ["$D", Nn],
].forEach(function (e) {
  Vd[e[1]] = function (t) {
    return this.$g(t, e[0], e[1]);
  };
});
se.extend = function (e, t) {
  return e.$i || (e(t, zi, se), (e.$i = !0)), se;
};
se.locale = Li;
se.isDayjs = go;
se.unix = function (e) {
  return se(e * 1e3);
};
se.en = Zr[Fa];
se.Ls = Zr;
se.p = {};
var Nd = function (e, t) {
    t.prototype.isSameOrBefore = function (r, n) {
      return this.isSame(r, n) || this.isBefore(r, n);
    };
  },
  Ad = function (e, t) {
    t.prototype.isSameOrAfter = function (r, n) {
      return this.isSame(r, n) || this.isAfter(r, n);
    };
  };
function pg(e) {
  return ["date", "month"].includes(e);
}
var Ri = [
    { index: "01" },
    { index: "02" },
    { index: "03" },
    { index: "04" },
    { index: "05" },
    { index: "06" },
    { index: "07" },
    { index: "08" },
    { index: "09" },
    { index: "10" },
    { index: "11" },
    { index: "12" },
  ],
  La = [
    { index: "0" },
    { index: "1" },
    { index: "2" },
    { index: "3" },
    { index: "4" },
    { index: "5" },
    { index: "6" },
  ],
  mg = {
    modelValue: { type: [String, Array] },
    type: { type: String, default: "date", validator: pg },
    allowedDates: { type: Function },
    color: { type: String },
    headerColor: { type: String },
    shadow: { type: Boolean, default: !1 },
    firstDayOfWeek: { type: [String, Number], default: 0 },
    min: { type: String },
    max: { type: String },
    showCurrent: { type: Boolean, default: !0 },
    readonly: { type: Boolean, default: !1 },
    multiple: { type: Boolean, default: !1 },
    range: { type: Boolean, default: !1 },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  gg = { class: "var-picker-header" };
function yg(e, t) {
  var r = fe("var-icon"),
    n = fe("var-button");
  return (
    T(),
    _("div", gg, [
      ee(
        n,
        {
          round: "",
          text: "",
          style: { filter: "opacity(0.54)" },
          disabled: e.disabled.left,
          onClick: t[0] || (t[0] = (a) => e.checkDate("prev")),
        },
        { default: Ee(() => [ee(r, { name: "chevron-left" })]), _: 1 },
        8,
        ["disabled"]
      ),
      B(
        "div",
        {
          class: "var-picker-header__value",
          onClick: t[1] || (t[1] = (a) => e.$emit("check-panel")),
        },
        [
          ee(
            at,
            {
              name: e.reverse
                ? "var-date-picker-reverse-translatex"
                : "var-date-picker-translatex",
            },
            {
              default: Ee(() => [
                (T(), _("div", { key: e.showDate }, ie(e.showDate), 1)),
              ]),
              _: 1,
            },
            8,
            ["name"]
          ),
        ]
      ),
      ee(
        n,
        {
          round: "",
          text: "",
          style: { filter: "opacity(0.54)" },
          disabled: e.disabled.right,
          onClick: t[2] || (t[2] = (a) => e.checkDate("next")),
        },
        { default: Ee(() => [ee(r, { name: "chevron-right" })]), _: 1 },
        8,
        ["disabled"]
      ),
    ])
  );
}
var Dd = ve({
  render: yg,
  name: "PanelHeader",
  components: { VarButton: It, VarIcon: We },
  props: {
    date: { type: Object, required: !0 },
    type: { type: String, default: "date" },
    disabled: { type: Object, required: !0 },
  },
  emits: ["check-panel", "check-date"],
  setup(e, { emit: t }) {
    var r = D(!1),
      n = D(0),
      a = j(() => {
        var l,
          { date: o, type: s } = e,
          { previewMonth: u, previewYear: d } = o;
        if (s === "month") return R(d) + n.value;
        var c =
          (l = st.value.datePickerMonthDict) == null ? void 0 : l[u.index].name;
        return st.value.lang === "zh-CN" ? d + " " + c : c + " " + d;
      }),
      i = (l) => {
        t("check-date", l),
          (r.value = l === "prev"),
          (n.value += l === "prev" ? -1 : 1);
      };
    return (
      me(
        () => e.date,
        () => {
          n.value = 0;
        }
      ),
      { reverse: r, showDate: a, checkDate: i }
    );
  },
});
function yo() {
  return (
    (yo =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    yo.apply(this, arguments)
  );
}
se.extend(Nd);
se.extend(Ad);
var bg = { class: "var-month-picker__panel" },
  Cg = { class: "var-month-picker__content" };
function wg(e, t) {
  var r = fe("panel-header"),
    n = fe("var-button");
  return (
    T(),
    _("div", bg, [
      B("div", Cg, [
        ee(
          r,
          {
            type: "month",
            date: e.preview,
            disabled: e.panelBtnDisabled,
            onCheckPanel: e.clickYear,
            onCheckDate: e.checkDate,
          },
          null,
          8,
          ["date", "disabled", "onCheckPanel", "onCheckDate"]
        ),
        ee(
          at,
          {
            name: e.reverse
              ? "var-date-picker-reverse-translatex"
              : "var-date-picker-translatex",
          },
          {
            default: Ee(() => [
              (T(),
              _("ul", { key: e.panelKey }, [
                (T(!0),
                _(
                  Pe,
                  null,
                  Ze(
                    e.MONTH_LIST,
                    (a) => (
                      T(),
                      _("li", { key: a.index }, [
                        ee(
                          n,
                          Xe(
                            {
                              type: "primary",
                              class: "var-month-picker__button",
                              "var-month-picker-cover": "",
                              ripple: !1,
                            },
                            yo({}, e.buttonProps(a.index)),
                            { onClick: (i) => e.chooseMonth(a) }
                          ),
                          {
                            default: Ee(() => [
                              Oe(ie(e.getMonthAbbr(a.index)), 1),
                            ]),
                            _: 2,
                          },
                          1040,
                          ["onClick"]
                        ),
                      ])
                    )
                  ),
                  128
                )),
              ])),
            ]),
            _: 1,
          },
          8,
          ["name"]
        ),
      ]),
    ])
  );
}
var kg = ve({
    render: wg,
    name: "MonthPickerPanel",
    components: { VarButton: It, PanelHeader: Dd },
    props: {
      choose: { type: Object, required: !0 },
      preview: { type: Object, required: !0 },
      current: { type: String, required: !0 },
      clickYear: { type: Function, required: !0 },
      componentProps: { type: Object, required: !0 },
    },
    emits: ["check-preview", "choose-month"],
    setup(e, { emit: t }) {
      var [r, n] = e.current.split("-"),
        a = D(!1),
        i = D(0),
        l = qe({ left: !1, right: !1 }),
        o = j(() => e.choose.chooseYear === e.preview.previewYear),
        s = j(() => e.preview.previewYear === r),
        u = (h) => {
          var g, m;
          return (g =
            (m = st.value.datePickerMonthDict) == null ? void 0 : m[h].abbr) !=
            null
            ? g
            : "";
        },
        d = (h) => {
          var {
              preview: { previewYear: g },
              componentProps: { min: m, max: $ },
            } = e,
            S = !0,
            C = !0,
            k = g + "-" + h;
          return (
            $ && (S = se(k).isSameOrBefore(se($), "month")),
            m && (C = se(k).isSameOrAfter(se(m), "month")),
            S && C
          );
        },
        c = (h) => {
          var {
            choose: { chooseMonths: g, chooseDays: m, chooseRangeMonth: $ },
            componentProps: { type: S, range: C },
          } = e;
          if (!$.length) return !1;
          if (C) {
            var k = se(h).isSameOrBefore(se($[1]), "month"),
              M = se(h).isSameOrAfter(se($[0]), "month");
            return k && M;
          }
          return S === "month" ? g.includes(h) : m.some((P) => P.includes(h));
        },
        v = (h) => {
          var {
              choose: { chooseMonth: g },
              preview: { previewYear: m },
              componentProps: {
                allowedDates: $,
                color: S,
                multiple: C,
                range: k,
              },
            } = e,
            M = m + "-" + h,
            P = () => (k || C ? c(M) : g.index === h && o.value),
            I = () => (d(h) ? ($ ? !$(M) : !1) : !0),
            N = I(),
            F = () => (N ? !0 : k || C ? !c(M) : !o.value || g.index !== h),
            w = () =>
              s.value && n === h && e.componentProps.showCurrent
                ? (k || C || o.value) && N
                  ? !0
                  : k || C
                  ? !c(M)
                  : o.value
                  ? g.index !== n
                  : !0
                : !1,
            y = () =>
              N
                ? ""
                : w()
                ? S != null
                  ? S
                  : ""
                : P()
                ? ""
                : "var-date-picker-color-cover",
            z = y().startsWith("var-date-picker");
          return {
            disabled: N,
            outline: w(),
            text: F(),
            color: F() ? "" : S,
            textColor: z ? "" : y(),
            "var-date-picker-color-cover": z,
          };
        },
        f = (h) => {
          t("choose-month", h);
        },
        p = (h) => {
          (a.value = h === "prev"),
            (i.value += h === "prev" ? -1 : 1),
            t("check-preview", "year", h);
        };
      return (
        me(
          () => e.preview.previewYear,
          (h) => {
            var {
              componentProps: { min: g, max: m },
            } = e;
            m && (l.right = !se("" + (R(h) + 1)).isSameOrBefore(se(m), "year")),
              g && (l.left = !se("" + (R(h) - 1)).isSameOrAfter(se(g), "year"));
          },
          { immediate: !0 }
        ),
        {
          pack: st,
          MONTH_LIST: Ri,
          reverse: a,
          panelKey: i,
          panelBtnDisabled: l,
          buttonProps: v,
          getMonthAbbr: u,
          chooseMonth: f,
          checkDate: p,
        }
      );
    },
  }),
  Sg = { class: "var-year-picker__panel" },
  Tg = ["onClick"];
function $g(e, t) {
  return (
    T(),
    _("ul", Sg, [
      (T(!0),
      _(
        Pe,
        null,
        Ze(
          e.yearList,
          (r) => (
            T(),
            _(
              "li",
              {
                key: r,
                class: Y([
                  r === e.toNumber(e.preview)
                    ? "var-year-picker__panel--active"
                    : null,
                ]),
                style: J({
                  color:
                    r === e.toNumber(e.preview) ? e.componentProps.color : "",
                }),
                onClick: (n) => e.chooseYear(r),
              },
              ie(r),
              15,
              Tg
            )
          )
        ),
        128
      )),
    ])
  );
}
var Eg = ve({
  render: $g,
  name: "YearPickerPanel",
  props: {
    preview: { type: String },
    componentProps: { type: Object, required: !0 },
  },
  emits: ["choose-year"],
  setup(e, { emit: t }) {
    var r = j(() => {
        var a = [],
          {
            preview: i,
            componentProps: { max: l, min: o },
          } = e;
        if (!i) return a;
        var s = [R(i) + 100, R(i) - 100];
        if (l) {
          var u = se(l).format("YYYY-MM-D"),
            d = R(u.split("-")[0]);
          if ((d < s[0] && d > s[1] && (s = [d, s[1]]), d <= s[1])) return [d];
        }
        if (o) {
          var c = se(o).format("YYYY-MM-D"),
            v = R(c.split("-")[0]);
          if ((v < s[0] && v > s[1] && (s = [s[0], v]), v >= s[0])) return [v];
        }
        for (var f = s[0]; f >= s[1]; f--) a.push(f);
        return a;
      }),
      n = (a) => {
        t("choose-year", a);
      };
    return (
      rt(() => {
        var a = document.querySelector(".var-year-picker__panel--active");
        a == null || a.scrollIntoView({ block: "center" });
      }),
      { yearList: r, chooseYear: n, toNumber: R }
    );
  },
});
function bo() {
  return (
    (bo =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    bo.apply(this, arguments)
  );
}
se.extend(Nd);
se.extend(Ad);
var Mg = { class: "var-day-picker__panel" },
  Ig = { class: "var-day-picker__content" },
  Pg = { class: "var-day-picker__head" },
  Og = { class: "var-day-picker__body" };
function _g(e, t) {
  var r = fe("panel-header"),
    n = fe("var-button");
  return (
    T(),
    _("div", Mg, [
      B("div", Ig, [
        ee(
          r,
          {
            type: "day",
            date: e.preview,
            disabled: e.panelBtnDisabled,
            onCheckPanel: e.clickMonth,
            onCheckDate: e.checkDate,
          },
          null,
          8,
          ["date", "disabled", "onCheckPanel", "onCheckDate"]
        ),
        ee(
          at,
          {
            name: e.reverse
              ? "var-date-picker-reverse-translatex"
              : "var-date-picker-translatex",
          },
          {
            default: Ee(() => [
              (T(),
              _("div", { key: e.panelKey }, [
                B("ul", Pg, [
                  (T(!0),
                  _(
                    Pe,
                    null,
                    Ze(
                      e.sortWeekList,
                      (a) => (
                        T(),
                        _("li", { key: a.index }, ie(e.getDayAbbr(a.index)), 1)
                      )
                    ),
                    128
                  )),
                ]),
                B("ul", Og, [
                  (T(!0),
                  _(
                    Pe,
                    null,
                    Ze(
                      e.days,
                      (a, i) => (
                        T(),
                        _("li", { key: i }, [
                          ee(
                            n,
                            Xe(
                              {
                                type: "primary",
                                class: [
                                  "var-day-picker__button",
                                  { "var-day-picker__button--usable": a > 0 },
                                ],
                                "var-day-picker-cover": "",
                                round: "",
                                ripple: !1,
                              },
                              bo({}, e.buttonProps(a)),
                              { onClick: (l) => e.chooseDay(a) }
                            ),
                            {
                              default: Ee(() => [Oe(ie(e.filterDay(a)), 1)]),
                              _: 2,
                            },
                            1040,
                            ["class", "onClick"]
                          ),
                        ])
                      )
                    ),
                    128
                  )),
                ]),
              ])),
            ]),
            _: 1,
          },
          8,
          ["name"]
        ),
      ]),
    ])
  );
}
var Vg = ve({
    render: _g,
    name: "DayPickerPanel",
    components: { VarButton: It, PanelHeader: Dd },
    props: {
      choose: { type: Object, required: !0 },
      preview: { type: Object, required: !0 },
      current: { type: String, required: !0 },
      clickMonth: { type: Function, required: !0 },
      componentProps: { type: Object, required: !0 },
    },
    emits: ["check-preview", "choose-day"],
    setup(e, { emit: t }) {
      var [r, n, a] = e.current.split("-"),
        i = D([]),
        l = D(!1),
        o = D(0),
        s = qe({ left: !1, right: !1 }),
        u = j(
          () =>
            e.preview.previewYear === r && e.preview.previewMonth.index === n
        ),
        d = j(
          () =>
            e.choose.chooseYear === e.preview.previewYear &&
            e.choose.chooseMonth.index === e.preview.previewMonth.index
        ),
        c = j(() => {
          var k = La.findIndex(
            (M) => M.index === e.componentProps.firstDayOfWeek
          );
          return k === -1 || k === 0 ? La : La.slice(k).concat(La.slice(0, k));
        }),
        v = (k) => {
          var M, P;
          return (M =
            (P = st.value.datePickerWeekDict) == null ? void 0 : P[k].abbr) !=
            null
            ? M
            : "";
        },
        f = (k) => (k > 0 ? k : ""),
        p = () => {
          var {
              preview: { previewMonth: k, previewYear: M },
            } = e,
            P = se(M + "-" + k.index).daysInMonth(),
            I = se(M + "-" + k.index + "-01").day(),
            N = c.value.findIndex((F) => F.index === "" + I);
          i.value = [
            ...Array(N).fill(-1),
            ...Array.from(Array(P + 1).keys()),
          ].filter((F) => F);
        },
        h = () => {
          var {
            preview: { previewYear: k, previewMonth: M },
            componentProps: { max: P, min: I },
          } = e;
          if (P) {
            var N = k + "-" + (R(M.index) + 1);
            s.right = !se(N).isSameOrBefore(se(P), "month");
          }
          if (I) {
            var F = k + "-" + (R(M.index) - 1);
            s.left = !se(F).isSameOrAfter(se(I), "month");
          }
        },
        g = (k) => {
          var {
              preview: { previewYear: M, previewMonth: P },
              componentProps: { min: I, max: N },
            } = e,
            F = !0,
            w = !0,
            y = M + "-" + P.index + "-" + k;
          return (
            N && (F = se(y).isSameOrBefore(se(N), "day")),
            I && (w = se(y).isSameOrAfter(se(I), "day")),
            F && w
          );
        },
        m = (k) => {
          var {
            choose: { chooseDays: M, chooseRangeDay: P },
            componentProps: { range: I },
          } = e;
          if (!P.length) return !1;
          if (I) {
            var N = se(k).isSameOrBefore(se(P[1]), "day"),
              F = se(k).isSameOrAfter(se(P[0]), "day");
            return N && F;
          }
          return M.includes(k);
        },
        $ = (k) => {
          if (k < 0) return { text: !0, outline: !1, textColor: "" };
          var {
              choose: { chooseDay: M },
              preview: { previewYear: P, previewMonth: I },
              componentProps: {
                allowedDates: N,
                color: F,
                multiple: w,
                range: y,
              },
            } = e,
            z = P + "-" + I.index + "-" + k,
            te = () => (y || w ? m(z) : R(M) === k && d.value),
            V = () => (g(k) ? (N ? !N(z) : !1) : !0),
            A = V(),
            X = () => (A ? !0 : y || w ? !m(z) : !d.value || R(M) !== k),
            le = () =>
              u.value && R(a) === k && e.componentProps.showCurrent
                ? (y || w || d.value) && A
                  ? !0
                  : y || w
                  ? !m(z)
                  : d.value
                  ? M !== a
                  : !0
                : !1,
            x = () =>
              A
                ? ""
                : le()
                ? F != null
                  ? F
                  : ""
                : te()
                ? ""
                : "var-date-picker-color-cover",
            O = x().startsWith("var-date-picker");
          return {
            disabled: A,
            text: X(),
            outline: le(),
            textColor: O ? "" : x(),
            "var-date-picker-color-cover": O,
          };
        },
        S = (k) => {
          (l.value = k === "prev"),
            (o.value += k === "prev" ? -1 : 1),
            t("check-preview", "month", k);
        },
        C = (k) => {
          t("choose-day", k);
        };
      return (
        rt(() => {
          p(), h();
        }),
        me(
          () => e.preview,
          () => {
            p(), h();
          }
        ),
        {
          days: i,
          reverse: l,
          panelKey: o,
          sortWeekList: c,
          panelBtnDisabled: s,
          filterDay: f,
          getDayAbbr: v,
          checkDate: S,
          chooseDay: C,
          buttonProps: $,
        }
      );
    },
  }),
  Ng = { class: "var-date-picker-body" };
function Ag(e, t) {
  var r = fe("year-picker-panel"),
    n = fe("month-picker-panel"),
    a = fe("day-picker-panel");
  return (
    T(),
    _(
      "div",
      { class: Y(["var-date-picker", [e.shadow ? "var-elevation--2" : null]]) },
      [
        B(
          "div",
          {
            class: "var-date-picker-title",
            style: J({ background: e.headerColor || e.color }),
          },
          [
            B(
              "div",
              {
                class: Y([
                  "var-date-picker-title__year",
                  [
                    e.isYearPanel
                      ? "var-date-picker-title__year--active"
                      : null,
                  ],
                ]),
                onClick: t[0] || (t[0] = (i) => e.clickEl("year")),
              },
              [
                Z(e.$slots, "year", { year: e.previewYear }, () => [
                  Oe(ie(e.previewYear), 1),
                ]),
              ],
              2
            ),
            B(
              "div",
              {
                class: Y([
                  "var-date-picker-title__date",
                  [
                    e.isYearPanel
                      ? null
                      : "var-date-picker-title__date--active",
                    e.range ? "var-date-picker-title__date--range" : null,
                  ],
                ]),
                onClick: t[1] || (t[1] = (i) => e.clickEl("date")),
              },
              [
                ee(
                  at,
                  {
                    name: e.multiple
                      ? ""
                      : e.reverse
                      ? "var-date-picker-reverse-translatey"
                      : "var-date-picker-translatey",
                  },
                  {
                    default: Ee(() => {
                      var i, l, o;
                      return [
                        e.type === "month"
                          ? (T(),
                            _(
                              "div",
                              {
                                key:
                                  e.chooseYear +
                                  ((i = e.chooseMonth) == null
                                    ? void 0
                                    : i.index),
                              },
                              [
                                e.range
                                  ? Z(
                                      e.$slots,
                                      "range",
                                      {
                                        key: 0,
                                        choose: e.getChoose.chooseRangeMonth,
                                      },
                                      () => [Oe(ie(e.getMonthTitle), 1)]
                                    )
                                  : e.multiple
                                  ? Z(
                                      e.$slots,
                                      "multiple",
                                      {
                                        key: 1,
                                        choose: e.getChoose.chooseMonths,
                                      },
                                      () => [Oe(ie(e.getMonthTitle), 1)]
                                    )
                                  : Z(
                                      e.$slots,
                                      "month",
                                      {
                                        key: 2,
                                        month:
                                          (l = e.chooseMonth) == null
                                            ? void 0
                                            : l.index,
                                        year: e.chooseYear,
                                      },
                                      () => [Oe(ie(e.getMonthTitle), 1)]
                                    ),
                              ]
                            ))
                          : (T(),
                            _(
                              "div",
                              {
                                key:
                                  e.chooseYear +
                                  ((o = e.chooseMonth) == null
                                    ? void 0
                                    : o.index) +
                                  e.chooseDay,
                              },
                              [
                                e.range
                                  ? Z(
                                      e.$slots,
                                      "range",
                                      { key: 0, choose: e.formatRange },
                                      () => [Oe(ie(e.getDateTitle), 1)]
                                    )
                                  : e.multiple
                                  ? Z(
                                      e.$slots,
                                      "multiple",
                                      {
                                        key: 1,
                                        choose: e.getChoose.chooseDays,
                                      },
                                      () => [Oe(ie(e.getDateTitle), 1)]
                                    )
                                  : Z(
                                      e.$slots,
                                      "date",
                                      Uo(Xe({ key: 2 }, e.slotProps)),
                                      () => [Oe(ie(e.getDateTitle), 1)]
                                    ),
                              ]
                            )),
                      ];
                    }),
                    _: 3,
                  },
                  8,
                  ["name"]
                ),
              ],
              2
            ),
          ],
          4
        ),
        B("div", Ng, [
          ee(
            at,
            { name: "var-date-picker-panel-fade" },
            {
              default: Ee(() => [
                e.isYearPanel
                  ? (T(),
                    Ie(
                      r,
                      {
                        key: 0,
                        "component-props": e.componentProps,
                        preview: e.previewYear,
                        onChooseYear: e.getChooseYear,
                      },
                      null,
                      8,
                      ["component-props", "preview", "onChooseYear"]
                    ))
                  : (!e.isYearPanel && e.type === "month") || e.isMonthPanel
                  ? (T(),
                    Ie(
                      n,
                      {
                        key: 1,
                        current: e.currentDate,
                        choose: e.getChoose,
                        preview: e.getPreview,
                        "click-year": () => e.clickEl("year"),
                        "component-props": e.componentProps,
                        onChooseMonth: e.getChooseMonth,
                        onCheckPreview: e.checkPreview,
                      },
                      null,
                      8,
                      [
                        "current",
                        "choose",
                        "preview",
                        "click-year",
                        "component-props",
                        "onChooseMonth",
                        "onCheckPreview",
                      ]
                    ))
                  : !e.isYearPanel && !e.isMonthPanel && e.type === "date"
                  ? (T(),
                    Ie(
                      a,
                      {
                        key: 2,
                        current: e.currentDate,
                        choose: e.getChoose,
                        preview: e.getPreview,
                        "component-props": e.componentProps,
                        "click-month": () => e.clickEl("month"),
                        onChooseDay: e.getChooseDay,
                        onCheckPreview: e.checkPreview,
                      },
                      null,
                      8,
                      [
                        "current",
                        "choose",
                        "preview",
                        "component-props",
                        "click-month",
                        "onChooseDay",
                        "onCheckPreview",
                      ]
                    ))
                  : de("v-if", !0),
              ]),
              _: 1,
            }
          ),
        ]),
      ],
      2
    )
  );
}
var An = ve({
  render: Ag,
  name: "VarDatePicker",
  components: { MonthPickerPanel: kg, YearPickerPanel: Eg, DayPickerPanel: Vg },
  props: mg,
  setup(e) {
    var t = se().format("YYYY-MM-D"),
      [r, n, a] = t.split("-"),
      i = Ri.find((q) => q.index === n),
      l = D(!1),
      o = D(!1),
      s = D(!0),
      u = D(i),
      d = D(r),
      c = D(a),
      v = D(i),
      f = D(r),
      p = D(!1),
      h = D([r + "-" + n]),
      g = D([t]),
      m = D([r + "-" + n]),
      $ = D([t]),
      S = qe({
        allowedDates: e.allowedDates,
        type: e.type,
        color: e.color,
        firstDayOfWeek: e.firstDayOfWeek,
        min: e.min,
        max: e.max,
        showCurrent: e.showCurrent,
        multiple: e.multiple,
        range: e.range,
      }),
      C = j(() => ({
        chooseMonth: u.value,
        chooseYear: d.value,
        chooseDay: c.value,
        chooseMonths: h.value,
        chooseDays: g.value,
        chooseRangeMonth: m.value,
        chooseRangeDay: $.value,
      })),
      k = j(() => ({ previewMonth: v.value, previewYear: f.value })),
      M = j(() => {
        var q,
          ge,
          { multiple: ue, range: ke } = e;
        if (ke) return m.value[0] + " ~ " + m.value[1];
        var Ne =
          (q =
            (ge = st.value.datePickerMonthDict) == null
              ? void 0
              : ge[u.value.index].name) != null
            ? q
            : "";
        return ue ? "" + h.value.length + st.value.datePickerSelected : Ne;
      }),
      P = j(() => {
        var q,
          ge,
          ue,
          ke,
          { multiple: Ne, range: _e } = e;
        if (_e)
          return (
            ($.value = $.value.map((W) => se(W).format("YYYY-MM-DD"))),
            $.value[0] + " ~ " + $.value[1]
          );
        if (Ne) return "" + g.value.length + st.value.datePickerSelected;
        var it = se(d.value + "-" + u.value.index + "-" + c.value).day(),
          Ke = La.find((W) => W.index === "" + it),
          b =
            (q =
              (ge = st.value.datePickerWeekDict) == null
                ? void 0
                : ge[Ke.index].name) != null
              ? q
              : "",
          E =
            (ue =
              (ke = st.value.datePickerMonthDict) == null
                ? void 0
                : ke[u.value.index].name) != null
              ? ue
              : "",
          L = c.value.padStart(2, "0");
        return st.value.lang === "zh-CN"
          ? u.value.index + "-" + L + " " + b.slice(0, 3)
          : b.slice(0, 3) + ", " + E.slice(0, 3) + " " + c.value;
      }),
      I = j(() => {
        var q = se(d.value + "-" + u.value.index + "-" + c.value).day();
        return {
          week: "" + q,
          year: d.value,
          month: u.value.index,
          date: c.value,
        };
      }),
      N = j(() =>
        C.value.chooseRangeDay.map((q) => se(q).format("YYYY-MM-DD"))
      ),
      F = j(() => d.value === f.value),
      w = j(() => u.value.index === v.value.index),
      y = (q) => {
        q === "year"
          ? (l.value = !0)
          : q === "month"
          ? (o.value = !0)
          : ((l.value = !1), (o.value = !1));
      },
      z = (q, ge) => {
        var ue = ge === "month" ? m : $;
        if (
          ((ue.value = s.value ? [q, q] : [ue.value[0], q]),
          (s.value = !s.value),
          s.value)
        ) {
          var ke,
            Ne = se(ue.value[0]).isAfter(ue.value[1]),
            _e = Ne ? [ue.value[1], ue.value[0]] : [...ue.value];
          (ke = e["onUpdate:modelValue"]) == null || ke.call(e, _e),
            e.onChange == null || e.onChange(_e);
        }
      },
      te = (q, ge) => {
        var ue,
          ke = ge === "month" ? h : g,
          Ne = ge === "month" ? "YYYY-MM" : "YYYY-MM-DD",
          _e = ke.value.map((Ke) => se(Ke).format(Ne)),
          it = _e.findIndex((Ke) => Ke === q);
        it === -1 ? _e.push(q) : _e.splice(it, 1),
          (ue = e["onUpdate:modelValue"]) == null || ue.call(e, _e),
          e.onChange == null || e.onChange(_e);
      },
      V = (q, ge) =>
        F.value
          ? q === "month"
            ? ge.index < u.value.index
            : w.value
            ? ge < R(c.value)
            : u.value.index > v.value.index
          : d.value > f.value,
      A = (q) => {
        var {
          readonly: ge,
          range: ue,
          multiple: ke,
          onChange: Ne,
          "onUpdate:modelValue": _e,
        } = e;
        if (!(q < 0 || ge)) {
          p.value = V("day", q);
          var it = f.value + "-" + v.value.index + "-" + q,
            Ke = se(it).format("YYYY-MM-DD");
          ue
            ? z(Ke, "day")
            : ke
            ? te(Ke, "day")
            : (_e == null || _e(Ke), Ne == null || Ne(Ke));
        }
      },
      X = (q) => {
        var {
          type: ge,
          readonly: ue,
          range: ke,
          multiple: Ne,
          onChange: _e,
          "onUpdate:modelValue": it,
        } = e;
        if (((p.value = V("month", q)), ge === "month" && !ue)) {
          var Ke = f.value + "-" + q.index;
          ke
            ? z(Ke, "month")
            : Ne
            ? te(Ke, "month")
            : (it == null || it(Ke), _e == null || _e(Ke));
        } else v.value = q;
        o.value = !1;
      },
      le = (q) => {
        (f.value = "" + q), (l.value = !1), (o.value = !0);
      },
      x = (q, ge) => {
        var ue = ge === "prev" ? -1 : 1;
        if (q === "year") f.value = "" + (R(f.value) + ue);
        else {
          var ke = R(v.value.index) + ue;
          ke < 1 && ((f.value = "" + (R(f.value) - 1)), (ke = 12)),
            ke > 12 && ((f.value = "" + (R(f.value) + 1)), (ke = 1)),
            (v.value = Ri.find((Ne) => R(Ne.index) === ke));
        }
      },
      O = () =>
        (e.multiple || e.range) && !He(e.modelValue)
          ? (console.error(
              '[Varlet] DatePicker: type of prop "modelValue" should be an Array'
            ),
            !1)
          : !e.multiple && !e.range && He(e.modelValue)
          ? (console.error(
              '[Varlet] DatePicker: type of prop "modelValue" should be a String'
            ),
            !1)
          : !0,
      U = (q) =>
        He(q)
          ? !1
          : q === void 0 || q === "Invalid Date"
          ? (console.error(
              '[Varlet] DatePicker: "modelValue" is an Invalid Date'
            ),
            !0)
          : !1,
      re = (q, ge) => {
        var ue = ge === "month" ? m : $,
          ke = ge === "month" ? "YYYY-MM" : "YYYY-MM-D",
          Ne = q.map((Ke) => se(Ke).format(ke)).slice(0, 2),
          _e = ue.value.some((Ke) => U(Ke));
        if (!_e) {
          ue.value = Ne;
          var it = se(ue.value[0]).isAfter(ue.value[1]);
          ue.value.length === 2 &&
            it &&
            (ue.value = [ue.value[1], ue.value[0]]);
        }
      },
      pe = (q, ge) => {
        var ue = ge === "month" ? h : g,
          ke = ge === "month" ? "YYYY-MM" : "YYYY-MM-D",
          Ne = Array.from(new Set(q.map((_e) => se(_e).format(ke))));
        ue.value = Ne.filter((_e) => _e !== "Invalid Date");
      },
      ce = (q) => {
        var ge = se(q).format("YYYY-MM-D");
        if (!U(ge)) {
          var [ue, ke, Ne] = ge.split("-"),
            _e = Ri.find((it) => it.index === ke);
          (u.value = _e),
            (d.value = ue),
            (c.value = Ne),
            (v.value = _e),
            (f.value = ue);
        }
      };
    return (
      me(
        () => e.modelValue,
        (q) => {
          if (!(!O() || U(q)))
            if (e.range) {
              if (!He(q)) return;
              (s.value = q.length !== 1), re(q, e.type);
            } else if (e.multiple) {
              if (!He(q)) return;
              pe(q, e.type);
            } else ce(q);
        },
        { immediate: !0 }
      ),
      {
        reverse: p,
        currentDate: t,
        chooseMonth: u,
        chooseYear: d,
        chooseDay: c,
        previewYear: f,
        isYearPanel: l,
        isMonthPanel: o,
        getMonthTitle: M,
        getDateTitle: P,
        getChoose: C,
        getPreview: k,
        componentProps: S,
        slotProps: I,
        formatRange: N,
        clickEl: y,
        getChooseDay: A,
        getChooseMonth: X,
        getChooseYear: le,
        checkPreview: x,
      }
    );
  },
});
An.install = function (e) {
  e.component(An.name, An);
};
function Co() {
  return (
    (Co =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Co.apply(this, arguments)
  );
}
function Dg(e) {
  return ["left", "center", "right"].includes(e);
}
var Bg = Co(
    {
      show: { type: Boolean, default: !1 },
      title: { type: String },
      message: { type: String },
      messageAlign: { type: String, default: "left", validator: Dg },
      confirmButton: { type: Boolean, default: !0 },
      cancelButton: { type: Boolean, default: !0 },
      confirmButtonText: { type: String },
      cancelButtonText: { type: String },
      confirmButtonTextColor: { type: String },
      cancelButtonTextColor: { type: String },
      confirmButtonColor: { type: String },
      cancelButtonColor: { type: String },
      onBeforeClose: { type: Function },
      onConfirm: { type: Function },
      onCancel: { type: Function },
      "onUpdate:show": { type: Function },
    },
    Dt(Va, [
      "overlay",
      "overlayClass",
      "overlayStyle",
      "lockScroll",
      "closeOnClickOverlay",
      "teleport",
      "onOpen",
      "onClose",
      "onOpened",
      "onClosed",
      "onClickOverlay",
      "onRouteChange",
    ])
  ),
  Fg = { class: "var-dialog__title" },
  Lg = { class: "var-dialog__actions" };
function zg(e, t) {
  var r = fe("var-button"),
    n = fe("var-popup");
  return (
    T(),
    Ie(
      n,
      {
        class: "var-dialog__popup-radius",
        "var-dialog-cover": "",
        show: e.popupShow,
        overlay: e.overlay,
        "overlay-class": e.overlayClass,
        "overlay-style": e.overlayStyle,
        "lock-scroll": e.lockScroll,
        "close-on-click-overlay": e.popupCloseOnClickOverlay,
        teleport: e.teleport,
        onOpen: e.onOpen,
        onClose: e.onClose,
        onClosed: e.onClosed,
        onOpened: e.onOpened,
        onRouteChange: e.onRouteChange,
        onClickOverlay: e.handleClickOverlay,
      },
      {
        default: Ee(() => [
          B(
            "div",
            Xe({ class: "var--box var-dialog" }, e.$attrs),
            [
              B("div", Fg, [
                Z(e.$slots, "title", {}, () => [
                  Oe(ie(e.dt(e.title, e.pack.dialogTitle)), 1),
                ]),
              ]),
              B(
                "div",
                {
                  class: "var-dialog__message",
                  style: J({ textAlign: e.messageAlign }),
                },
                [Z(e.$slots, "default", {}, () => [Oe(ie(e.message), 1)])],
                4
              ),
              B("div", Lg, [
                e.cancelButton
                  ? (T(),
                    Ie(
                      r,
                      {
                        key: 0,
                        class: "var-dialog__button var-dialog__cancel-button",
                        "var-dialog-cover": "",
                        text: "",
                        "text-color": e.cancelButtonTextColor,
                        color: e.cancelButtonColor,
                        onClick: e.cancel,
                      },
                      {
                        default: Ee(() => [
                          Oe(
                            ie(
                              e.dt(
                                e.cancelButtonText,
                                e.pack.dialogCancelButtonText
                              )
                            ),
                            1
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["text-color", "color", "onClick"]
                    ))
                  : de("v-if", !0),
                e.confirmButton
                  ? (T(),
                    Ie(
                      r,
                      {
                        key: 1,
                        class: "var-dialog__button var-dialog__confirm-button",
                        "var-dialog-cover": "",
                        text: "",
                        "text-color": e.confirmButtonTextColor,
                        color: e.confirmButtonColor,
                        onClick: e.confirm,
                      },
                      {
                        default: Ee(() => [
                          Oe(
                            ie(
                              e.dt(
                                e.confirmButtonText,
                                e.pack.dialogConfirmButtonText
                              )
                            ),
                            1
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["text-color", "color", "onClick"]
                    ))
                  : de("v-if", !0),
              ]),
            ],
            16
          ),
        ]),
        _: 3,
      },
      8,
      [
        "show",
        "overlay",
        "overlay-class",
        "overlay-style",
        "lock-scroll",
        "close-on-click-overlay",
        "teleport",
        "onOpen",
        "onClose",
        "onClosed",
        "onOpened",
        "onRouteChange",
        "onClickOverlay",
      ]
    )
  );
}
var Jr = ve({
    render: zg,
    name: "VarDialog",
    components: { VarPopup: zt, VarButton: It },
    inheritAttrs: !1,
    props: Bg,
    setup(e) {
      var t = D(!1),
        r = D(!1),
        n = () => {
          var o;
          return (o = e["onUpdate:show"]) == null ? void 0 : o.call(e, !1);
        },
        a = () => {
          var o,
            { closeOnClickOverlay: s, onClickOverlay: u, onBeforeClose: d } = e;
          if ((u == null || u(), !!s)) {
            if (d != null) {
              d("close", n);
              return;
            }
            (o = e["onUpdate:show"]) == null || o.call(e, !1);
          }
        },
        i = () => {
          var o,
            { onBeforeClose: s, onConfirm: u } = e;
          if ((u == null || u(), s != null)) {
            s("confirm", n);
            return;
          }
          (o = e["onUpdate:show"]) == null || o.call(e, !1);
        },
        l = () => {
          var o,
            { onBeforeClose: s, onCancel: u } = e;
          if ((u == null || u(), s != null)) {
            s("cancel", n);
            return;
          }
          (o = e["onUpdate:show"]) == null || o.call(e, !1);
        };
      return (
        me(
          () => e.show,
          (o) => {
            t.value = o;
          },
          { immediate: !0 }
        ),
        me(
          () => e.closeOnClickOverlay,
          (o) => {
            if (e.onBeforeClose != null) {
              r.value = !1;
              return;
            }
            r.value = o;
          },
          { immediate: !0 }
        ),
        {
          pack: st,
          dt: Mi,
          popupShow: t,
          popupCloseOnClickOverlay: r,
          handleClickOverlay: a,
          confirm: i,
          cancel: l,
        }
      );
    },
  }),
  kr;
function Qr(e) {
  return Xl()
    ? new Promise((t) => {
        Qr.close();
        var r = Tt(e) ? { message: e } : e,
          n = qe(r);
        (n.teleport = "body"), (kr = n);
        var { unmountInstance: a } = Na(Jr, n, {
          onConfirm: () => {
            n.onConfirm == null || n.onConfirm(), t("confirm");
          },
          onCancel: () => {
            n.onCancel == null || n.onCancel(), t("cancel");
          },
          onClose: () => {
            n.onClose == null || n.onClose(), t("close");
          },
          onClosed: () => {
            n.onClosed == null || n.onClosed(), a(), kr === n && (kr = null);
          },
          onRouteChange: () => {
            a(), kr === n && (kr = null);
          },
          "onUpdate:show": (i) => {
            n.show = i;
          },
        });
        n.show = !0;
      })
    : Promise.resolve();
}
Jr.install = function (e) {
  e.component(Jr.name, Jr);
};
Qr.install = function (e) {
  e.component(Jr.name, Jr);
};
Qr.close = () => {
  if (kr != null) {
    var e = kr;
    (kr = null),
      Ye().then(() => {
        e.show = !1;
      });
  }
};
Qr.Component = Jr;
var Rg = {
  inset: { type: [Boolean, Number, String], default: !1 },
  vertical: { type: Boolean, default: !1 },
  description: { type: String },
  margin: { type: String },
  dashed: { type: Boolean, default: !1 },
};
function Dn() {
  return (
    (Dn =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Dn.apply(this, arguments)
  );
}
var Ug = { key: 0, class: "var-divider__text" };
function Yg(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: Y([
          "var-divider var--box",
          [
            e.vertical ? "var-divider--vertical" : null,
            e.withText ? "var-divider--with-text" : null,
            e.isInset ? "var-divider--inset" : null,
            e.dashed ? "var-divider--dashed" : null,
          ],
        ]),
        style: J(e.style),
      },
      [
        Z(e.$slots, "default", {}, () => [
          e.description
            ? (T(), _("span", Ug, ie(e.description), 1))
            : de("v-if", !0),
        ]),
      ],
      6
    )
  );
}
var Bn = ve({
  render: Yg,
  name: "VarDivider",
  props: Rg,
  setup(e, { slots: t }) {
    var r = qe({ withText: !1 }),
      n = j(() => (jl(e.inset) ? e.inset : !0)),
      a = j(() => {
        var { inset: l, vertical: o, margin: s } = e,
          u = { margin: s };
        if (jl(l) || l === 0) return Dn({}, u);
        var d = R(l),
          c = Math.abs(d) + (l + "").replace(d + "", "");
        return o
          ? Dn({}, u, { height: "calc(80% - " + ot(c) + ")" })
          : Dn({}, u, {
              width: "calc(100% - " + ot(c) + ")",
              left: d > 0 ? ot(c) : ot(0),
            });
      }),
      i = () => {
        r.withText =
          Boolean(t.default == null ? void 0 : t.default().length) ||
          Boolean(e.description);
      };
    return (
      rt(() => {
        i();
      }),
      yl(() => {
        i();
      }),
      Dn({}, mc(r), { style: a, isInset: n })
    );
  },
});
Bn.install = function (e) {
  e.component(Bn.name, Bn);
};
var Hg = {
  disabled: { type: Boolean, default: !1 },
  readonly: { type: Boolean, default: !1 },
};
function Bd(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Wg(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        Bd(i, n, a, l, o, "next", s);
      }
      function o(s) {
        Bd(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
var jg = { class: "var-form" };
function Kg(e, t) {
  return T(), _("div", jg, [Z(e.$slots, "default")]);
}
var Fn = ve({
  render: Kg,
  name: "VarForm",
  props: Hg,
  setup(e) {
    var t = j(() => e.disabled),
      r = j(() => e.readonly),
      { formItems: n, bindFormItems: a } = Pp(),
      i = (function () {
        var u = Wg(function* () {
          var d = yield Promise.all(n.map(({ validate: c }) => c()));
          return d.every((c) => c === !0);
        });
        return function () {
          return u.apply(this, arguments);
        };
      })(),
      l = () => n.forEach(({ reset: u }) => u()),
      o = () => n.forEach(({ resetValidation: u }) => u()),
      s = { disabled: t, readonly: r };
    return a(s), { validate: i, reset: l, resetValidation: o };
  },
});
Fn.install = function (e) {
  e.component(Fn.name, Fn);
};
function Fd(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Ui(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        Fd(i, n, a, l, o, "next", s);
      }
      function o(s) {
        Fd(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
function wo() {
  return (
    (wo =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    wo.apply(this, arguments)
  );
}
var qg = "background-image",
  Xg = "lazy-loading",
  Gg = "lazy-error",
  Ld = "lazy-attempt",
  Zg = [
    "scroll",
    "wheel",
    "mousewheel",
    "resize",
    "animationend",
    "transitionend",
    "touchmove",
  ],
  ko =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
  Ln = [],
  Yi = [],
  zd = dh(100),
  xe = { loading: ko, error: ko, attempt: 3, throttleWait: 300, events: Zg },
  So = ql(za, xe.throttleWait);
function Hi(e, t) {
  e._lazy.arg === qg
    ? (e.style.backgroundImage = "url(" + t + ")")
    : e.setAttribute("src", t);
}
function Jg(e) {
  e._lazy.loading && Hi(e, e._lazy.loading), za();
}
function Qg(e) {
  e._lazy.error && Hi(e, e._lazy.error), (e._lazy.state = "error"), Mo(e), za();
}
function Rd(e, t) {
  Hi(e, t), (e._lazy.state = "success"), Mo(e), za();
}
function xg(e) {
  var t;
  Yi.includes(e) ||
    (Yi.push(e),
    (t = xe.events) == null ||
      t.forEach((r) => {
        e.addEventListener(r, So, { passive: !0 });
      }));
}
function ey() {
  Yi.forEach((e) => {
    var t;
    (t = xe.events) == null ||
      t.forEach((r) => {
        e.removeEventListener(r, So);
      });
  }),
    (Yi.length = 0);
}
function ty(e, t) {
  var r,
    n,
    a = {
      loading: (r = e.getAttribute(Xg)) != null ? r : xe.loading,
      error: (n = e.getAttribute(Gg)) != null ? n : xe.error,
      attempt: e.getAttribute(Ld) ? Number(e.getAttribute(Ld)) : xe.attempt,
    };
  (e._lazy = wo(
    {
      src: t.value,
      arg: t.arg,
      currentAttempt: 0,
      state: "pending",
      attemptLock: !1,
    },
    a
  )),
    Hi(e, ko),
    xe.filter == null || xe.filter(e._lazy);
}
function ry(e, t) {
  var r = new Image();
  (r.src = t),
    (e._lazy.preloadImage = r),
    r.addEventListener("load", () => {
      (e._lazy.attemptLock = !1), zd.add(t), Rd(e, t);
    }),
    r.addEventListener("error", () => {
      (e._lazy.attemptLock = !1),
        e._lazy.currentAttempt >= e._lazy.attempt ? Qg(e) : Ud(e);
    });
}
function Ud(e) {
  if (!e._lazy.attemptLock) {
    (e._lazy.attemptLock = !0), e._lazy.currentAttempt++;
    var { src: t } = e._lazy;
    if (zd.has(t)) {
      Rd(e, t), (e._lazy.attemptLock = !1);
      return;
    }
    Jg(e), ry(e, t);
  }
}
function To(e) {
  return $o.apply(this, arguments);
}
function $o() {
  return (
    ($o = Ui(function* (e) {
      (yield Ch(e)) && Ud(e);
    })),
    $o.apply(this, arguments)
  );
}
function za() {
  Ln.forEach((e) => To(e));
}
function ny(e) {
  return Eo.apply(this, arguments);
}
function Eo() {
  return (
    (Eo = Ui(function* (e) {
      !Ln.includes(e) && Ln.push(e), kh(e).forEach(xg), yield To(e);
    })),
    Eo.apply(this, arguments)
  );
}
function Mo(e) {
  Ei(Ln, e), Ln.length === 0 && ey();
}
function ay(e, t) {
  var { src: r, arg: n } = e._lazy;
  return r !== t.value || n !== t.arg;
}
function Yd(e, t) {
  return Io.apply(this, arguments);
}
function Io() {
  return (
    (Io = Ui(function* (e, t) {
      ty(e, t), yield ny(e);
    })),
    Io.apply(this, arguments)
  );
}
function iy(e, t) {
  return Po.apply(this, arguments);
}
function Po() {
  return (
    (Po = Ui(function* (e, t) {
      if (!ay(e, t)) {
        Ln.includes(e) && (yield To(e));
        return;
      }
      yield Yd(e, t);
    })),
    Po.apply(this, arguments)
  );
}
function ly(e = {}) {
  var {
    events: t,
    loading: r,
    error: n,
    attempt: a,
    throttleWait: i,
    filter: l,
  } = e;
  (xe.events = t != null ? t : xe.events),
    (xe.loading = r != null ? r : xe.loading),
    (xe.error = n != null ? n : xe.error),
    (xe.attempt = a != null ? a : xe.attempt),
    (xe.throttleWait = i != null ? i : xe.throttleWait),
    (xe.filter = l);
}
var Wi = {
  mounted: Yd,
  unmounted: Mo,
  updated: iy,
  install(e, t) {
    ly(t), (So = ql(za, xe.throttleWait)), e.directive("lazy", this);
  },
};
function oy(e) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(e);
}
var sy = {
    src: { type: String },
    fit: { type: String, validator: oy, default: "fill" },
    alt: { type: String },
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    radius: { type: [String, Number], default: 0 },
    loading: { type: String },
    error: { type: String },
    lazy: { type: Boolean, default: !1 },
    ripple: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !0 },
    onClick: { type: Function },
    onLoad: { type: Function },
    onError: { type: Function },
  },
  uy = ["alt", "lazy-error", "lazy-loading"],
  dy = ["alt", "src"];
function vy(e, t) {
  var r = ht("lazy"),
    n = ht("ripple");
  return Re(
    (T(),
    _(
      "div",
      {
        class: Y([
          "var-image var--box",
          [e.block ? null : "var--inline-block"],
        ]),
        style: J({
          width: e.toSizeUnit(e.width),
          height: e.toSizeUnit(e.height),
          "border-radius": e.toSizeUnit(e.radius),
        }),
      },
      [
        e.lazy
          ? Re(
              (T(),
              _(
                "img",
                {
                  key: 0,
                  class: "var-image__image",
                  alt: e.alt,
                  "lazy-error": e.error,
                  "lazy-loading": e.loading,
                  style: J({ objectFit: e.fit }),
                  onLoad:
                    t[0] ||
                    (t[0] = (...a) => e.handleLoad && e.handleLoad(...a)),
                  onError:
                    t[1] ||
                    (t[1] = (...a) => e.handleError && e.handleError(...a)),
                  onClick:
                    t[2] || (t[2] = (...a) => e.onClick && e.onClick(...a)),
                },
                null,
                44,
                uy
              )),
              [[r, e.src]]
            )
          : (T(),
            _(
              "img",
              {
                key: 1,
                class: "var-image__image",
                alt: e.alt,
                style: J({ objectFit: e.fit }),
                src: e.src,
                onLoad:
                  t[3] || (t[3] = (...a) => e.handleLoad && e.handleLoad(...a)),
                onError:
                  t[4] ||
                  (t[4] = (...a) => e.handleError && e.handleError(...a)),
                onClick:
                  t[5] || (t[5] = (...a) => e.onClick && e.onClick(...a)),
              },
              null,
              44,
              dy
            )),
      ],
      6
    )),
    [[n, { disabled: !e.ripple }]]
  );
}
var zn = ve({
  render: vy,
  name: "VarImage",
  directives: { Lazy: Wi, Ripple: lt },
  props: sy,
  setup(e) {
    var t = (n) => {
        var a = n.currentTarget,
          { lazy: i, onLoad: l, onError: o } = e;
        i
          ? (a._lazy.state === "success" && (l == null || l(n)),
            a._lazy.state === "error" && (o == null || o(n)))
          : l == null || l(n);
      },
      r = (n) => {
        var { lazy: a, onError: i } = e;
        !a && (i == null || i(n));
      };
    return { toSizeUnit: ot, handleLoad: t, handleError: r };
  },
});
zn.install = function (e) {
  e.component(zn.name, zn);
};
var Hd = Symbol("SWIPE_BIND_SWIPE_ITEM_KEY"),
  Wd = Symbol("SWIPE_COUNT_SWIPE_ITEM_KEY");
function cy() {
  var { childProviders: e, bindChildren: t } = Bt(Hd),
    { length: r } = Gt(Wd);
  return { length: r, swipeItems: e, bindSwipeItems: t };
}
var jd = {
    loop: { type: Boolean, default: !0 },
    autoplay: { type: [String, Number] },
    duration: { type: [String, Number], default: 300 },
    initialIndex: { type: [String, Number], default: 0 },
    indicator: { type: Boolean, default: !0 },
    indicatorColor: { type: String },
    vertical: { type: Boolean, default: !1 },
    touchable: { type: Boolean, default: !0 },
    onChange: { type: Function },
  },
  fy = 250,
  hy = 20,
  py = { class: "var-swipe", ref: "swipeEl" },
  my = ["onClick"];
function gy(e, t) {
  return (
    T(),
    _(
      "div",
      py,
      [
        B(
          "div",
          {
            class: Y([
              "var-swipe__track",
              [e.vertical ? "var-swipe--vertical" : null],
            ]),
            style: J({
              width: e.vertical ? void 0 : e.trackSize + "px",
              height: e.vertical ? e.trackSize + "px" : void 0,
              transform:
                "translate" +
                (e.vertical ? "Y" : "X") +
                "(" +
                e.translate +
                "px)",
              transitionDuration: e.lockDuration
                ? "0ms"
                : e.toNumber(e.duration) + "ms",
            }),
            onTouchstart:
              t[0] ||
              (t[0] = (...r) => e.handleTouchstart && e.handleTouchstart(...r)),
            onTouchmove:
              t[1] ||
              (t[1] = (...r) => e.handleTouchmove && e.handleTouchmove(...r)),
            onTouchend:
              t[2] ||
              (t[2] = (...r) => e.handleTouchend && e.handleTouchend(...r)),
          },
          [Z(e.$slots, "default")],
          38
        ),
        Z(e.$slots, "indicator", { index: e.index, length: e.length }, () => [
          e.indicator && e.length
            ? (T(),
              _(
                "div",
                {
                  key: 0,
                  class: Y([
                    "var-swipe__indicators",
                    [e.vertical ? "var-swipe--indicators-vertical" : null],
                  ]),
                },
                [
                  (T(!0),
                  _(
                    Pe,
                    null,
                    Ze(
                      e.length,
                      (r, n) => (
                        T(),
                        _(
                          "div",
                          {
                            class: Y([
                              "var-swipe__indicator",
                              [
                                e.index === n
                                  ? "var-swipe--indicator-active"
                                  : null,
                                e.vertical
                                  ? "var-swipe--indicator-vertical"
                                  : null,
                              ],
                            ]),
                            style: J({ background: e.indicatorColor }),
                            key: r,
                            onClick: (a) => e.to(n),
                          },
                          null,
                          14,
                          my
                        )
                      )
                    ),
                    128
                  )),
                ],
                2
              ))
            : de("v-if", !0),
        ]),
      ],
      512
    )
  );
}
var Sr = ve({
  render: gy,
  name: "VarSwipe",
  props: jd,
  setup(e) {
    var t = D(null),
      r = D(0),
      n = j(() => e.vertical),
      a = D(0),
      i = D(0),
      l = D(!1),
      o = D(0),
      { swipeItems: s, bindSwipeItems: u, length: d } = cy(),
      c = !1,
      v = -1,
      f,
      p,
      h,
      g,
      m,
      $ = (O) => s.find(({ index: U }) => U.value === O),
      S = () => {
        !e.loop ||
          (i.value >= 0 && $(d.value - 1).setTranslate(-a.value),
          i.value <= -(a.value - r.value) && $(0).setTranslate(a.value),
          i.value > -(a.value - r.value) &&
            i.value < 0 &&
            ($(d.value - 1).setTranslate(0), $(0).setTranslate(0)));
      },
      C = (O) => {
        var U = At(O) ? O : Math.floor((i.value - r.value / 2) / -r.value),
          { loop: re } = e;
        return U <= -1
          ? re
            ? -1
            : 0
          : U >= d.value
          ? re
            ? d.value
            : d.value - 1
          : U;
      },
      k = (O) => {
        var { loop: U } = e;
        return O === -1
          ? U
            ? d.value - 1
            : 0
          : O === d.value
          ? U
            ? 0
            : d.value - 1
          : O;
      },
      M = (O) => {
        var { loop: U } = e;
        return O < 0
          ? U
            ? d.value - 1
            : 0
          : O > d.value - 1
          ? U
            ? 0
            : d.value - 1
          : O;
      },
      P = (O) => {
        var U = i.value >= r.value,
          re = i.value <= -a.value,
          pe = 0,
          ce = -(a.value - r.value);
        (l.value = !0),
          (U || re) &&
            ((l.value = !0),
            (i.value = re ? pe : ce),
            $(0).setTranslate(0),
            $(d.value - 1).setTranslate(0)),
          Zu(() => {
            (l.value = !1), O == null || O();
          });
      },
      I = () => {
        o.value = M(R(e.initialIndex));
      },
      N = () => {
        var { autoplay: O } = e;
        !O ||
          d.value <= 1 ||
          (F(),
          (v = window.setTimeout(() => {
            A(), N();
          }, R(O))));
      },
      F = () => {
        v && clearInterval(v);
      },
      w = (O, U) => {
        if (O > U && O > 10) return "horizontal";
        if (U > O && U > 10) return "vertical";
      },
      y = (O) => {
        if (!(d.value <= 1 || !e.touchable)) {
          var { clientX: U, clientY: re } = O.touches[0];
          (f = U),
            (p = re),
            (h = performance.now()),
            (c = !0),
            F(),
            P(() => {
              l.value = !0;
            });
        }
      },
      z = (O) => {
        var { touchable: U, vertical: re } = e;
        if (!(!c || !U)) {
          var { clientX: pe, clientY: ce } = O.touches[0],
            q = Math.abs(pe - f),
            ge = Math.abs(ce - p),
            ue = w(q, ge),
            ke = re ? "vertical" : "horizontal";
          if (ue === ke) {
            O.preventDefault();
            var Ne = g !== void 0 ? pe - g : 0,
              _e = m !== void 0 ? ce - m : 0;
            (g = pe), (m = ce), (i.value += re ? _e : Ne), S();
          }
        }
      },
      te = () => {
        if (!!c) {
          var { vertical: O, onChange: U } = e,
            re = O ? m < p : g < f,
            pe = Math.abs(O ? p - m : f - g),
            ce = performance.now() - h <= fy && pe >= hy,
            q = ce ? C(re ? o.value + 1 : o.value - 1) : C();
          (c = !1),
            (l.value = !1),
            (g = void 0),
            (m = void 0),
            (i.value = q * -r.value);
          var ge = o.value;
          (o.value = k(q)), N(), ge !== o.value && (U == null || U(o.value));
        }
      },
      V = () => {
        (l.value = !0),
          (r.value = e.vertical ? t.value.offsetHeight : t.value.offsetWidth),
          (a.value = r.value * d.value),
          (i.value = o.value * -r.value),
          s.forEach((O) => {
            O.setTranslate(0);
          }),
          N(),
          setTimeout(() => {
            l.value = !1;
          });
      },
      A = () => {
        if (!(d.value <= 1)) {
          var { loop: O, onChange: U } = e,
            re = o.value;
          (o.value = M(re + 1)),
            U == null || U(o.value),
            P(() => {
              if (re === d.value - 1 && O) {
                $(0).setTranslate(a.value), (i.value = d.value * -r.value);
                return;
              }
              re !== d.value - 1 && (i.value = o.value * -r.value);
            });
        }
      },
      X = () => {
        if (!(d.value <= 1)) {
          var { loop: O, onChange: U } = e,
            re = o.value;
          (o.value = M(re - 1)),
            U == null || U(o.value),
            P(() => {
              if (re === 0 && O) {
                $(d.value - 1).setTranslate(-a.value), (i.value = r.value);
                return;
              }
              re !== 0 && (i.value = o.value * -r.value);
            });
        }
      },
      le = (O) => {
        if (!(d.value <= 1 || O === o.value)) {
          (O = O < 0 ? 0 : O), (O = O >= d.value ? d.value : O);
          var U = O > o.value ? A : X;
          Array.from({ length: Math.abs(O - o.value) }).forEach(U);
        }
      },
      x = { size: r, vertical: n };
    return (
      u(x),
      me(
        () => d.value,
        () => {
          I(), V();
        }
      ),
      rt(() => {
        window.addEventListener("resize", V);
      }),
      Kt(() => {
        window.removeEventListener("resize", V), F();
      }),
      {
        length: d,
        index: o,
        swipeEl: t,
        trackSize: a,
        translate: i,
        lockDuration: l,
        handleTouchstart: y,
        handleTouchmove: z,
        handleTouchend: te,
        next: A,
        prev: X,
        to: le,
        resize: V,
        toNumber: R,
      }
    );
  },
});
Sr.install = function (e) {
  e.component(Sr.name, Sr);
};
function yy() {
  var { bindParent: e, parentProvider: t } = Ft(Hd),
    { index: r } = Zt(Wd);
  if (!e || !t || !r) throw Error("<var-swipe-item/> must in <var-swipe/>");
  return { index: r, swipe: t, bindSwipe: e };
}
function by(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: "var-swipe-item",
        style: J({
          width: e.vertical ? void 0 : e.size + "px",
          height: e.vertical ? e.size + "px" : void 0,
          transform:
            "translate" + (e.vertical ? "Y" : "X") + "(" + e.translate + "px)",
        }),
      },
      [Z(e.$slots, "default")],
      4
    )
  );
}
var Tr = ve({
  render: by,
  name: "VarSwipeItem",
  setup() {
    var e = D(0),
      { swipe: t, bindSwipe: r, index: n } = yy(),
      { size: a, vertical: i } = t,
      l = (s) => {
        e.value = s;
      },
      o = { index: n, setTranslate: l };
    return r(o), { size: a, vertical: i, translate: e };
  },
});
Tr.install = function (e) {
  e.component(Tr.name, Tr);
};
function Oo() {
  return (
    (Oo =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Oo.apply(this, arguments)
  );
}
var Cy = Oo(
    {
      show: { type: Boolean, default: !1 },
      images: { type: Array, default: () => [] },
      current: { type: String },
      zoom: { type: [String, Number], default: 2 },
      closeable: { type: Boolean, default: !1 },
      "onUpdate:show": { type: Function },
    },
    Dt(jd, ["loop", "indicator", "onChange"]),
    Dt(Va, [
      "lockScroll",
      "teleport",
      "onOpen",
      "onClose",
      "onOpened",
      "onClosed",
      "onRouteChange",
    ])
  ),
  Kd = 12,
  qd = 200,
  Xd = 200,
  wy = ["src", "alt"],
  ky = { key: 0, class: "var-image-preview__indicators" };
function Sy(e, t) {
  var r = fe("var-swipe-item"),
    n = fe("var-swipe"),
    a = fe("var-icon"),
    i = fe("var-popup");
  return (
    T(),
    Ie(
      i,
      {
        class: "var-image-preview__popup",
        "var-image-preview-cover": "",
        transition: "var-fade",
        show: e.popupShow,
        overlay: !1,
        "close-on-click-overlay": !1,
        "lock-scroll": e.lockScroll,
        teleport: e.teleport,
        onOpen: e.onOpen,
        onClose: e.onClose,
        onClosed: e.onClosed,
        onOpened: e.onOpened,
        onRouteChange: e.onRouteChange,
      },
      {
        default: Ee(() => [
          ee(
            n,
            Xe(
              {
                class: "var-image-preview__swipe",
                "var-image-preview-cover": "",
                touchable: e.canSwipe,
                indicator: e.indicator && e.images.length > 1,
                "initial-index": e.initialIndex,
                loop: e.loop,
                onChange: e.onChange,
              },
              e.$attrs
            ),
            {
              default: Ee(() => [
                (T(!0),
                _(
                  Pe,
                  null,
                  Ze(
                    e.images,
                    (l) => (
                      T(),
                      Ie(
                        r,
                        {
                          class: "var-image-preview__swipe-item",
                          "var-image-preview-cover": "",
                          key: l,
                        },
                        {
                          default: Ee(() => [
                            B(
                              "div",
                              {
                                class: "var-image-preview__zoom-container",
                                style: J({
                                  transform:
                                    "scale(" +
                                    e.scale +
                                    ") translate(" +
                                    e.translateX +
                                    "px, " +
                                    e.translateY +
                                    "px)",
                                  transitionTimingFunction:
                                    e.transitionTimingFunction,
                                  transitionDuration: e.transitionDuration,
                                }),
                                onTouchstart:
                                  t[0] ||
                                  (t[0] = (...o) =>
                                    e.handleTouchstart &&
                                    e.handleTouchstart(...o)),
                                onTouchmove:
                                  t[1] ||
                                  (t[1] = (...o) =>
                                    e.handleTouchmove &&
                                    e.handleTouchmove(...o)),
                                onTouchend:
                                  t[2] ||
                                  (t[2] = (...o) =>
                                    e.handleTouchend && e.handleTouchend(...o)),
                              },
                              [
                                B(
                                  "img",
                                  {
                                    class: "var-image-preview__image",
                                    src: l,
                                    alt: l,
                                  },
                                  null,
                                  8,
                                  wy
                                ),
                              ],
                              36
                            ),
                          ]),
                          _: 2,
                        },
                        1024
                      )
                    )
                  ),
                  128
                )),
              ]),
              indicator: Ee(({ index: l, length: o }) => [
                Z(e.$slots, "indicator", { index: l, length: o }, () => [
                  e.indicator && e.images.length > 1
                    ? (T(), _("div", ky, ie(l + 1) + " / " + ie(o), 1))
                    : de("v-if", !0),
                ]),
              ]),
              _: 3,
            },
            16,
            ["touchable", "indicator", "initial-index", "loop", "onChange"]
          ),
          Z(e.$slots, "close-icon", {}, () => [
            e.closeable
              ? (T(),
                Ie(
                  a,
                  {
                    key: 0,
                    class: "var-image-preview__close-icon",
                    name: "close-circle",
                    "var-image-preview-cover": "",
                    onClick: e.close,
                  },
                  null,
                  8,
                  ["onClick"]
                ))
              : de("v-if", !0),
          ]),
        ]),
        _: 3,
      },
      8,
      [
        "show",
        "lock-scroll",
        "teleport",
        "onOpen",
        "onClose",
        "onClosed",
        "onOpened",
        "onRouteChange",
      ]
    )
  );
}
var xr = ve({
    render: Sy,
    name: "VarImagePreview",
    components: { VarSwipe: Sr, VarSwipeItem: Tr, VarPopup: zt, VarIcon: We },
    inheritAttrs: !1,
    props: Cy,
    setup(e) {
      var t = D(!1),
        r = j(() => {
          var { images: F, current: w } = e,
            y = F.findIndex((z) => z === w);
          return y >= 0 ? y : 0;
        }),
        n = D(1),
        a = D(0),
        i = D(0),
        l = D(void 0),
        o = D(void 0),
        s = D(!0),
        u = null,
        d = null,
        c = null,
        v = (F, w) => {
          var { clientX: y, clientY: z } = F,
            { clientX: te, clientY: V } = w;
          return Math.abs(Math.sqrt(Math.pow(te - y, 2) + Math.pow(V - z, 2)));
        },
        f = (F, w) => ({
          clientX: F.clientX,
          clientY: F.clientY,
          timestamp: Date.now(),
          target: w,
        }),
        p = () => {
          (n.value = R(e.zoom)),
            (s.value = !1),
            (d = null),
            window.setTimeout(() => {
              (l.value = "linear"), (o.value = "0s");
            }, Xd);
        },
        h = () => {
          (n.value = 1),
            (a.value = 0),
            (i.value = 0),
            (s.value = !0),
            (d = null),
            (l.value = void 0),
            (o.value = void 0);
        },
        g = (F) =>
          d
            ? v(d, F) <= Kd &&
              F.timestamp - d.timestamp <= qd &&
              d.target === F.target
            : !1,
        m = (F) =>
          !u || !d
            ? !1
            : v(u, d) <= Kd && (F === u.target || F.parentNode === u.target),
        $ = (F) => {
          c = window.setTimeout(() => {
            m(F.target) && N(), (u = null);
          }, qd);
        },
        S = (F) => {
          c && window.clearTimeout(c);
          var { touches: w } = F,
            y = f(w[0], F.currentTarget);
          if (((u = y), g(y))) {
            n.value > 1 ? h() : p();
            return;
          }
          d = y;
        },
        C = (F) => {
          var { offsetWidth: w, offsetHeight: y } = F,
            { naturalWidth: z, naturalHeight: te } = F.querySelector(
              ".var-image-preview__image"
            );
          return {
            width: w,
            height: y,
            imageRadio: te / z,
            rootRadio: y / w,
            zoom: R(e.zoom),
          };
        },
        k = (F) => {
          var {
            zoom: w,
            imageRadio: y,
            rootRadio: z,
            width: te,
            height: V,
          } = C(F);
          if (!y) return 0;
          var A = y > z ? V / y : te;
          return Math.max(0, (w * A - te) / 2) / w;
        },
        M = (F) => {
          var {
            zoom: w,
            imageRadio: y,
            rootRadio: z,
            width: te,
            height: V,
          } = C(F);
          if (!y) return 0;
          var A = y > z ? V : te * y;
          return Math.max(0, (w * A - V) / 2) / w;
        },
        P = (F, w, y) => (F + w >= y ? y : F + w <= -y ? -y : F + w),
        I = (F) => {
          if (!!d) {
            var w = F.currentTarget,
              { touches: y } = F,
              z = f(y[0], w);
            if (n.value > 1) {
              var te = z.clientX - d.clientX,
                V = z.clientY - d.clientY,
                A = k(w),
                X = M(w);
              (a.value = P(a.value, te, A)), (i.value = P(i.value, V, X));
            }
            d = z;
          }
        },
        N = () => {
          var F;
          if (n.value > 1) {
            h(),
              setTimeout(() => {
                var w;
                return (w = e["onUpdate:show"]) == null
                  ? void 0
                  : w.call(e, !1);
              }, Xd);
            return;
          }
          (F = e["onUpdate:show"]) == null || F.call(e, !1);
        };
      return (
        me(
          () => e.show,
          (F) => {
            t.value = F;
          },
          { immediate: !0 }
        ),
        {
          initialIndex: r,
          popupShow: t,
          scale: n,
          translateX: a,
          translateY: i,
          canSwipe: s,
          transitionTimingFunction: l,
          transitionDuration: o,
          handleTouchstart: S,
          handleTouchmove: I,
          handleTouchend: $,
          close: N,
        }
      );
    },
  }),
  $r;
function Er(e) {
  if (!!Xl()) {
    Er.close();
    var t = Tt(e) ? { images: [e] } : He(e) ? { images: e } : e,
      r = qe(t);
    (r.teleport = "body"), ($r = r);
    var { unmountInstance: n } = Na(xr, r, {
      onClose: () => (r.onClose == null ? void 0 : r.onClose()),
      onClosed: () => {
        r.onClosed == null || r.onClosed(), n(), $r === r && ($r = null);
      },
      onRouteChange: () => {
        n(), $r === r && ($r = null);
      },
      "onUpdate:show": (a) => {
        r.show = a;
      },
    });
    r.show = !0;
  }
}
Er.close = () => {
  if ($r != null) {
    var e = $r;
    ($r = null),
      Ye().then(() => {
        e.show = !1;
      });
  }
};
xr.install = function (e) {
  e.component(xr.name, xr);
};
Er.install = function (e) {
  e.component(xr.name, xr);
};
Er.Component = xr;
var Gd = {
  offsetTop: { type: [String, Number], default: 0 },
  zIndex: { type: [String, Number], default: 10 },
  cssMode: { type: Boolean, default: !1 },
  disabled: { type: Boolean, default: !1 },
  onScroll: { type: Function },
};
function Ty(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: Y([
          "var-sticky",
          [e.enableCSSMode ? "var-sticky--css-mode" : null],
        ]),
        ref: "stickyEl",
        style: J({
          zIndex: e.toNumber(e.zIndex),
          top: e.enableCSSMode ? e.offsetTop + "px" : void 0,
          width: e.enableFixedMode ? e.fixedWidth : void 0,
          height: e.enableFixedMode ? e.fixedHeight : void 0,
        }),
      },
      [
        B(
          "div",
          {
            class: "var-sticky__wrapper",
            ref: "wrapperEl",
            style: J({
              zIndex: e.toNumber(e.zIndex),
              position: e.enableFixedMode ? "fixed" : void 0,
              width: e.enableFixedMode ? e.fixedWrapperWidth : void 0,
              height: e.enableFixedMode ? e.fixedWrapperHeight : void 0,
              left: e.enableFixedMode ? e.fixedLeft : void 0,
              top: e.enableFixedMode ? e.fixedTop : void 0,
            }),
          },
          [Z(e.$slots, "default")],
          4
        ),
      ],
      6
    )
  );
}
var Mr = ve({
  render: Ty,
  name: "VarSticky",
  props: Gd,
  setup(e) {
    var t = D(null),
      r = D(null),
      n = D(!1),
      a = D("0px"),
      i = D("0px"),
      l = D("auto"),
      o = D("auto"),
      s = D("auto"),
      u = D("auto"),
      d = j(() => !e.disabled && e.cssMode),
      c = j(() => !e.disabled && n.value),
      v = j(() => Jt(e.offsetTop)),
      f,
      p = () => {
        var { onScroll: m, cssMode: $, disabled: S } = e;
        if (!S) {
          var C = 0;
          if (f !== window) {
            var { top: k } = f.getBoundingClientRect();
            C = k;
          }
          var M = r.value,
            P = t.value,
            { top: I, left: N } = P.getBoundingClientRect(),
            F = I - C;
          F <= v.value
            ? ($ ||
                ((l.value = P.offsetWidth + "px"),
                (o.value = P.offsetHeight + "px"),
                (a.value = C + v.value + "px"),
                (i.value = N + "px"),
                (s.value = M.offsetWidth + "px"),
                (u.value = M.offsetHeight + "px"),
                (n.value = !0)),
              m == null || m(v.value, !0))
            : ((n.value = !1), m == null || m(F, !1));
        }
      },
      h = () => {
        (f = Aa(t.value)),
          f !== window && f.addEventListener("scroll", p),
          window.addEventListener("scroll", p),
          p();
      },
      g = () => {
        f !== window && f.removeEventListener("scroll", p),
          window.removeEventListener("scroll", p);
      };
    return (
      me(() => e.disabled, p),
      ui(h),
      di(g),
      rt(h),
      Kt(g),
      {
        stickyEl: t,
        wrapperEl: r,
        isFixed: n,
        offsetTop: v,
        fixedTop: a,
        fixedLeft: i,
        fixedWidth: l,
        fixedHeight: o,
        fixedWrapperWidth: s,
        fixedWrapperHeight: u,
        enableCSSMode: d,
        enableFixedMode: c,
        toNumber: R,
      }
    );
  },
});
Mr.install = function (e) {
  e.component(Mr.name, Mr);
};
var Zd = Symbol("INDEX_BAR_BIND_INDEX_ANCHOR_KEY"),
  Jd = Symbol("INDEX_BAR_COUNT_INDEX_ANCHOR_KEY");
function $y() {
  var { bindChildren: e, childProviders: t } = Bt(Zd),
    { length: r } = Gt(Jd);
  return { length: r, indexAnchors: t, bindIndexAnchors: e };
}
function Ey() {
  var { parentProvider: e, bindParent: t } = Ft(Zd),
    { index: r } = Zt(Jd);
  if (!e || !t)
    throw Error(
      '[Varlet] IndexAnchor: You should use this component in "IndexBar"'
    );
  return { index: r, indexBar: e, bindIndexBar: t };
}
var My = { index: { type: [Number, String] } };
function Iy(e, t) {
  return (
    T(),
    Ie(
      hi(e.sticky ? "var-sticky" : e.Transition),
      {
        "offset-top": e.sticky ? e.stickyOffsetTop : null,
        "z-index": e.sticky ? e.zIndex : null,
        disabled: e.disabled && !e.cssMode,
        "css-mode": e.cssMode,
        ref: "anchorEl",
      },
      {
        default: Ee(() => [
          B(
            "div",
            Xe({ class: "var-index-anchor" }, e.$attrs),
            [Z(e.$slots, "default", {}, () => [Oe(ie(e.name), 1)])],
            16
          ),
        ]),
        _: 3,
      },
      8,
      ["offset-top", "z-index", "disabled", "css-mode"]
    )
  );
}
var Rn = ve({
  render: Iy,
  name: "VarIndexAnchor",
  components: { VarSticky: Mr },
  inheritAttrs: !1,
  props: My,
  setup(e) {
    var { index: t, indexBar: r, bindIndexBar: n } = Ey(),
      a = D(0),
      i = D(!1),
      l = j(() => e.index),
      o = D(null),
      { active: s, sticky: u, cssMode: d, stickyOffsetTop: c, zIndex: v } = r,
      f = () => {
        !o.value ||
          (a.value = o.value.$el ? o.value.$el.offsetTop : o.value.offsetTop);
      },
      p = (g) => {
        i.value = g;
      },
      h = { index: t, name: l, ownTop: a, setOwnTop: f, setDisabled: p };
    return (
      n(h),
      {
        name: l,
        anchorEl: o,
        active: s,
        sticky: u,
        zIndex: v,
        disabled: i,
        cssMode: d,
        stickyOffsetTop: c,
        Transition: at,
      }
    );
  },
});
Rn.install = function (e) {
  e.component(Rn.name, Rn);
};
var Py = {
  sticky: { type: Boolean, default: !0 },
  stickyOffsetTop: { type: Number, default: 0 },
  cssMode: { type: Boolean, default: !1 },
  hideList: { type: Boolean, default: !1 },
  zIndex: { type: [Number, String], default: 1 },
  highlightColor: { type: String },
  duration: { type: [Number, String], default: 0 },
  onClick: { type: Function },
  onChange: { type: Function },
};
function Qd(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Oy(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        Qd(i, n, a, l, o, "next", s);
      }
      function o(s) {
        Qd(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
var _y = { class: "var-index-bar", ref: "barEl" },
  Vy = ["onClick"];
function Ny(e, t) {
  return (
    T(),
    _(
      "div",
      _y,
      [
        Z(e.$slots, "default"),
        B(
          "ul",
          {
            class: "var-index-bar__anchor-list",
            style: J({
              zIndex: e.toNumber(e.zIndex) + 2,
              display: e.hideList ? "none" : "block",
            }),
          },
          [
            (T(!0),
            _(
              Pe,
              null,
              Ze(
                e.anchorNameList,
                (r) => (
                  T(),
                  _(
                    "li",
                    {
                      key: r,
                      class: Y([
                        "var-index-bar__anchor-item",
                        {
                          "var-index-bar__anchor-item--active": e.active === r,
                        },
                      ]),
                      style: J({
                        color:
                          e.active === r && e.highlightColor
                            ? e.highlightColor
                            : "",
                      }),
                      onClick: (n) => e.anchorClick(r),
                    },
                    ie(r),
                    15,
                    Vy
                  )
                )
              ),
              128
            )),
          ],
          4
        ),
      ],
      512
    )
  );
}
var Un = ve({
  render: Ny,
  name: "VarIndexBar",
  props: Py,
  setup(e) {
    var { length: t, indexAnchors: r, bindIndexAnchors: n } = $y(),
      a = D(null),
      i = D(""),
      l = D(null),
      o = D(null),
      s = D([]),
      u = D(),
      d = j(() => e.sticky),
      c = j(() => e.cssMode),
      v = j(() => e.stickyOffsetTop),
      f = j(() => e.zIndex),
      p = { active: u, sticky: d, cssMode: c, stickyOffsetTop: v, zIndex: f };
    n(p);
    var h = (S) => {
        var C = Kl(S) ? S.name.value : S;
        C !== u.value && ((u.value = C), e.onChange == null || e.onChange(C));
      },
      g = () => {
        var { scrollTop: S, scrollHeight: C } = a.value,
          { offsetTop: k } = o.value;
        r.forEach((M, P) => {
          var I = M.ownTop.value,
            N = S - I + v.value - k,
            F = P === r.length - 1 ? C : r[P + 1].ownTop.value - M.ownTop.value;
          N >= 0 &&
            N < F &&
            !i.value &&
            (P && !e.cssMode && r[P - 1].setDisabled(!0),
            M.setDisabled(!1),
            h(M));
        });
      },
      m = (function () {
        var S = Oy(function* (C, k) {
          if ((k && (e.onClick == null || e.onClick(C)), C !== u.value)) {
            var M = r.find(({ name: N }) => C === N.value);
            if (!!M) {
              var P = M.ownTop.value,
                I = Ql(a.value);
              (i.value = C),
                h(C),
                yield Pi(a.value, {
                  left: I,
                  top: P,
                  animation: Lu,
                  duration: R(e.duration),
                }),
                Zu(() => {
                  i.value = "";
                });
            }
          }
        });
        return function (k, M) {
          return S.apply(this, arguments);
        };
      })(),
      $ = (S) => {
        ar(() => m(S, !0));
      };
    return (
      me(
        () => t.value,
        () =>
          Ye(() => {
            r.forEach(({ name: S, setOwnTop: C }) => {
              S.value && s.value.push(S.value), C();
            });
          })
      ),
      rt(() => {
        var S;
        (l.value = Aa(o.value)),
          (a.value =
            l.value === window ? l.value.document.documentElement : l.value),
          (S = l.value) == null || S.addEventListener("scroll", g);
      }),
      ka(() => {
        var S;
        (S = l.value) == null || S.removeEventListener("scroll", g);
      }),
      {
        barEl: o,
        active: u,
        zIndex: f,
        anchorNameList: s,
        toNumber: R,
        scrollTo: $,
        anchorClick: m,
      }
    );
  },
});
Un.install = function (e) {
  e.component(Un.name, Un);
};
function Ay(e) {
  return ["text", "password", "number"].includes(e);
}
var Dy = {
    modelValue: { type: String },
    type: { type: String, default: "text", validator: Ay },
    textarea: { type: Boolean, default: !1 },
    rows: { type: [String, Number], default: 8 },
    placeholder: { type: String },
    line: { type: Boolean, default: !0 },
    hint: { type: Boolean, default: !0 },
    textColor: { type: String },
    focusColor: { type: String },
    blurColor: { type: String },
    maxlength: { type: [String, Number] },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    resize: { type: Boolean, default: !1 },
    validateTrigger: { type: Array, default: () => ["onInput", "onClear"] },
    rules: { type: Array },
    onFocus: { type: Function },
    onBlur: { type: Function },
    onClick: { type: Function },
    onClear: { type: Function },
    onInput: { type: Function },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  By = { key: 0, class: "var-input__autocomplete" },
  Fy = ["id", "disabled", "type", "value", "maxlength", "rows"],
  Ly = ["id", "disabled", "type", "value", "maxlength"],
  zy = ["for"];
function Ry(e, t) {
  var r = fe("var-icon"),
    n = fe("var-form-details");
  return (
    T(),
    _(
      "div",
      {
        class: Y([
          "var-input var--box",
          [e.disabled ? "var-input--disabled" : null],
        ]),
        onClick:
          t[8] || (t[8] = (...a) => e.handleClick && e.handleClick(...a)),
      },
      [
        B(
          "div",
          {
            class: Y([
              "var-input__controller",
              [
                e.isFocus ? "var-input--focus" : null,
                e.errorMessage ? "var-input--error" : null,
                e.formDisabled || e.disabled ? "var-input--disabled" : null,
              ],
            ]),
            style: J({
              color: e.errorMessage
                ? void 0
                : e.isFocus
                ? e.focusColor
                : e.blurColor,
            }),
          },
          [
            B(
              "div",
              {
                class: Y([
                  "var-input__icon",
                  [e.hint ? null : "var-input--non-hint"],
                ]),
              },
              [Z(e.$slots, "prepend-icon")],
              2
            ),
            B(
              "div",
              {
                class: Y([
                  "var-input__wrap",
                  [e.hint ? null : "var-input--non-hint"],
                ]),
              },
              [
                e.type === "password" ? (T(), _("input", By)) : de("v-if", !0),
                e.textarea
                  ? (T(),
                    _(
                      "textarea",
                      {
                        key: 1,
                        class: Y([
                          "var-input__input var-input--textarea",
                          [
                            e.formDisabled || e.disabled
                              ? "var-input--disabled"
                              : null,
                            e.errorMessage ? "var-input--caret-error" : null,
                          ],
                        ]),
                        ref: "el",
                        autocomplete: "new-password",
                        id: e.id,
                        disabled:
                          e.formDisabled ||
                          e.disabled ||
                          e.formReadonly ||
                          e.readonly,
                        type: e.type,
                        value: e.modelValue,
                        maxlength: e.maxlength,
                        rows: e.rows,
                        style: J({
                          color: e.textColor,
                          caretColor: e.errorMessage ? null : e.focusColor,
                          resize: e.resize ? "vertical" : "none",
                        }),
                        onFocus:
                          t[0] ||
                          (t[0] = (...a) =>
                            e.handleFocus && e.handleFocus(...a)),
                        onBlur:
                          t[1] ||
                          (t[1] = (...a) => e.handleBlur && e.handleBlur(...a)),
                        onInput:
                          t[2] ||
                          (t[2] = (...a) =>
                            e.handleInput && e.handleInput(...a)),
                        onChange:
                          t[3] ||
                          (t[3] = (...a) =>
                            e.handleChange && e.handleChange(...a)),
                      },
                      `
        `,
                      46,
                      Fy
                    ))
                  : (T(),
                    _(
                      "input",
                      {
                        key: 2,
                        class: Y([
                          "var-input__input",
                          [
                            e.formDisabled || e.disabled
                              ? "var-input--disabled"
                              : null,
                            e.errorMessage ? "var-input--caret-error" : null,
                          ],
                        ]),
                        ref: "el",
                        autocomplete: "new-password",
                        id: e.id,
                        disabled:
                          e.formDisabled ||
                          e.disabled ||
                          e.formReadonly ||
                          e.readonly,
                        type: e.type,
                        value: e.modelValue,
                        maxlength: e.maxlength,
                        style: J({
                          color: e.textColor,
                          caretColor: e.errorMessage ? null : e.focusColor,
                        }),
                        onFocus:
                          t[4] ||
                          (t[4] = (...a) =>
                            e.handleFocus && e.handleFocus(...a)),
                        onBlur:
                          t[5] ||
                          (t[5] = (...a) => e.handleBlur && e.handleBlur(...a)),
                        onInput:
                          t[6] ||
                          (t[6] = (...a) =>
                            e.handleInput && e.handleInput(...a)),
                        onChange:
                          t[7] ||
                          (t[7] = (...a) =>
                            e.handleChange && e.handleChange(...a)),
                      },
                      null,
                      46,
                      Ly
                    )),
                B(
                  "label",
                  {
                    class: Y([
                      "var--ellipsis",
                      [
                        e.textarea
                          ? "var-input__textarea-placeholder"
                          : "var-input__placeholder",
                        e.computePlaceholderState(),
                        e.hint ? null : "var-input--placeholder-non-hint",
                      ],
                    ]),
                    for: e.id,
                  },
                  ie(e.placeholder),
                  11,
                  zy
                ),
              ],
              2
            ),
            B(
              "div",
              {
                class: Y([
                  "var-input__icon",
                  [e.hint ? null : "var-input--non-hint"],
                ]),
              },
              [
                Z(e.$slots, "append-icon", {}, () => [
                  e.clearable && !e.isEmpty(e.modelValue)
                    ? (T(),
                      Ie(
                        r,
                        {
                          key: 0,
                          class: "var-input__clear-icon",
                          "var-input-cover": "",
                          name: "close-circle",
                          size: "14px",
                          onClick: e.handleClear,
                        },
                        null,
                        8,
                        ["onClick"]
                      ))
                    : de("v-if", !0),
                ]),
              ],
              2
            ),
          ],
          6
        ),
        e.line
          ? (T(),
            _(
              "div",
              {
                key: 0,
                class: Y([
                  "var-input__line",
                  [
                    e.formDisabled || e.disabled
                      ? "var-input--line-disabled"
                      : null,
                    e.errorMessage ? "var-input--line-error" : null,
                  ],
                ]),
                style: J({ background: e.errorMessage ? void 0 : e.blurColor }),
              },
              [
                B(
                  "div",
                  {
                    class: Y([
                      "var-input__dot",
                      [
                        e.isFocus ? "var-input--spread" : null,
                        e.formDisabled || e.disabled
                          ? "var-input--line-disabled"
                          : null,
                        e.errorMessage ? "var-input--line-error" : null,
                      ],
                    ]),
                    style: J({
                      background: e.errorMessage ? void 0 : e.focusColor,
                    }),
                  },
                  null,
                  6
                ),
              ],
              6
            ))
          : de("v-if", !0),
        ee(
          n,
          {
            "error-message": e.errorMessage,
            "maxlength-text": e.maxlengthText,
          },
          null,
          8,
          ["error-message", "maxlength-text"]
        ),
      ],
      2
    )
  );
}
var en = ve({
  render: Ry,
  name: "VarInput",
  components: { VarIcon: We, VarFormDetails: ut },
  props: Dy,
  setup(e) {
    var t = D("var-input-" + Rr().uid),
      r = D(null),
      n = D(!1),
      a = j(() => {
        var { maxlength: I, modelValue: N } = e;
        return I ? (fr(N) ? "0 / " + I : String(N).length + "/" + I) : "";
      }),
      { bindForm: i, form: l } = Rt(),
      {
        errorMessage: o,
        validateWithTrigger: s,
        validate: u,
        resetValidation: d,
      } = Lt(),
      c = (I) => {
        Ye(() => {
          var { validateTrigger: N, rules: F, modelValue: w } = e;
          s(N, I, F, w);
        });
      },
      v = () => {
        var { hint: I, modelValue: N } = e;
        if (!I && !fr(N)) return "var-input--placeholder-hidden";
        if (I && (!fr(N) || n.value)) return "var-input--placeholder-hint";
      },
      f = (I) => {
        (n.value = !0), e.onFocus == null || e.onFocus(I), c("onFocus");
      },
      p = (I) => {
        (n.value = !1), e.onBlur == null || e.onBlur(I), c("onBlur");
      },
      h = (I) => {
        var N,
          { value: F } = I.target;
        (N = e["onUpdate:modelValue"]) == null || N.call(e, F),
          e.onInput == null || e.onInput(F, I),
          c("onInput");
      },
      g = (I) => {
        var { value: N } = I.target;
        e.onChange == null || e.onChange(N, I), c("onChange");
      },
      m = () => {
        var I,
          { disabled: N, readonly: F, clearable: w, onClear: y } = e;
        (l != null && l.disabled.value) ||
          (l != null && l.readonly.value) ||
          N ||
          F ||
          !w ||
          ((I = e["onUpdate:modelValue"]) == null || I.call(e, ""),
          y == null || y(""),
          c("onClear"));
      },
      $ = (I) => {
        var { disabled: N, onClick: F } = e;
        (l != null && l.disabled.value) ||
          N ||
          (F == null || F(I), c("onClick"));
      },
      S = () => {
        var I;
        (I = e["onUpdate:modelValue"]) == null || I.call(e, ""), d();
      },
      C = () => u(e.rules, e.modelValue),
      k = () => {
        r.value.focus();
      },
      M = () => {
        r.value.blur();
      },
      P = { reset: S, validate: C, resetValidation: d };
    return (
      i == null || i(P),
      {
        el: r,
        id: t,
        isFocus: n,
        errorMessage: o,
        maxlengthText: a,
        formDisabled: l == null ? void 0 : l.disabled,
        formReadonly: l == null ? void 0 : l.readonly,
        isEmpty: fr,
        computePlaceholderState: v,
        handleFocus: f,
        handleBlur: p,
        handleInput: h,
        handleChange: g,
        handleClear: m,
        handleClick: $,
        validate: C,
        resetValidation: d,
        reset: S,
        focus: k,
        blur: M,
      }
    );
  },
});
en.install = function (e) {
  e.component(en.name, en);
};
var Uy = {
  loading: { type: Boolean, default: !1 },
  immediateCheck: { type: Boolean, default: !0 },
  finished: { type: Boolean, default: !1 },
  error: { type: Boolean, default: !1 },
  offset: { type: [String, Number], default: 0 },
  loadingText: { type: String },
  finishedText: { type: String },
  errorText: { type: String },
  onLoad: { type: Function },
  "onUpdate:loading": { type: Function },
  "onUpdate:error": { type: Function },
};
function xd(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Yy(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        xd(i, n, a, l, o, "next", s);
      }
      function o(s) {
        xd(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
var Hy = { class: "var-list var--box", ref: "listEl" },
  Wy = { class: "var-list__loading" },
  jy = { class: "var-list__loading-text" },
  Ky = { class: "var-list__finished" },
  qy = { class: "var-list__detector", ref: "detectorEl" };
function Xy(e, t) {
  var r = fe("var-loading"),
    n = ht("ripple");
  return (
    T(),
    _(
      "div",
      Hy,
      [
        Z(e.$slots, "default"),
        e.loading
          ? Z(e.$slots, "loading", { key: 0 }, () => [
              B("div", Wy, [
                B(
                  "div",
                  jy,
                  ie(e.dt(e.loadingText, e.pack.listLoadingText)),
                  1
                ),
                ee(r, { size: "mini", radius: 10 }),
              ]),
            ])
          : de("v-if", !0),
        e.finished
          ? Z(e.$slots, "finished", { key: 1 }, () => [
              B(
                "div",
                Ky,
                ie(e.dt(e.finishedText, e.pack.listFinishedText)),
                1
              ),
            ])
          : de("v-if", !0),
        e.error
          ? Z(e.$slots, "error", { key: 2 }, () => [
              Re(
                B(
                  "div",
                  {
                    class: "var-list__error",
                    onClick: t[0] || (t[0] = (...a) => e.load && e.load(...a)),
                  },
                  [Oe(ie(e.dt(e.errorText, e.pack.listErrorText)), 1)],
                  512
                ),
                [[n]]
              ),
            ])
          : de("v-if", !0),
        B("div", qy, null, 512),
      ],
      512
    )
  );
}
var Yn = ve({
  render: Xy,
  name: "VarList",
  directives: { Ripple: lt },
  components: { VarLoading: Qt },
  props: Uy,
  setup(e) {
    var t = D(null),
      r = D(null),
      n,
      a = () => {
        var o, s;
        (o = e["onUpdate:error"]) == null || o.call(e, !1),
          (s = e["onUpdate:loading"]) == null || s.call(e, !0),
          e.onLoad == null || e.onLoad();
      },
      i = () => {
        var o =
            n === window
              ? window.innerHeight
              : n.getBoundingClientRect().bottom,
          { bottom: s } = r.value.getBoundingClientRect();
        return s - Jt(e.offset) <= o;
      },
      l = (function () {
        var o = Yy(function* () {
          if ((yield Ye(), !wh(t.value))) {
            var { loading: s, finished: u, error: d } = e;
            !s && !u && !d && i() && a();
          }
        });
        return function () {
          return o.apply(this, arguments);
        };
      })();
    return (
      rt(() => {
        (n = Aa(t.value)),
          e.immediateCheck && l(),
          n.addEventListener("scroll", l);
      }),
      Kt(() => {
        n.removeEventListener("scroll", l);
      }),
      {
        pack: st,
        listEl: t,
        detectorEl: r,
        dt: Mi,
        isNumber: At,
        load: a,
        check: l,
      }
    );
  },
});
Yn.install = function (e) {
  e.component(Yn.name, Yn);
};
function Gy(e) {
  return ["top", "bottom"].includes(e);
}
var Zy = {
  show: { type: Boolean, default: !1 },
  alignment: { type: String, default: "top", validator: Gy },
  offsetX: { type: [Number, String], default: 0 },
  offsetY: { type: [Number, String], default: 0 },
  teleport: { type: String, default: "body" },
  onOpen: { type: Function },
  onOpened: { type: Function },
  onClose: { type: Function },
  onClosed: { type: Function },
  "onUpdate:show": { type: Function },
};
function ev(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Jy(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        ev(i, n, a, l, o, "next", s);
      }
      function o(s) {
        ev(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
function Qy(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: "var-menu",
        ref: "host",
        onClick:
          t[1] || (t[1] = (...r) => e.handleClick && e.handleClick(...r)),
      },
      [
        Z(e.$slots, "default"),
        (T(),
        Ie(
          El,
          { to: e.teleport, disabled: !e.teleport || e.disabled },
          [
            ee(
              at,
              {
                name: "var-menu",
                onAfterEnter: e.onOpened,
                onAfterLeave: e.onClosed,
              },
              {
                default: Ee(() => [
                  Re(
                    B(
                      "div",
                      {
                        class: "var-menu__menu var-elevation--3",
                        ref: "menu",
                        style: J({
                          top:
                            "calc(" +
                            e.top +
                            "px + " +
                            e.toSizeUnit(e.offsetY) +
                            ")",
                          left:
                            "calc(" +
                            e.left +
                            "px + " +
                            e.toSizeUnit(e.offsetX) +
                            ")",
                          zIndex: e.zIndex,
                        }),
                        onClick: t[0] || (t[0] = mn(() => {}, ["stop"])),
                      },
                      [Z(e.$slots, "menu")],
                      4
                    ),
                    [[Oa, e.show]]
                  ),
                ]),
                _: 3,
              },
              8,
              ["onAfterEnter", "onAfterLeave"]
            ),
          ],
          8,
          ["to", "disabled"]
        )),
      ],
      512
    )
  );
}
var Ir = ve({
  render: Qy,
  name: "VarMenu",
  props: Zy,
  setup(e) {
    var t = D(null),
      r = D(null),
      n = D(0),
      a = D(0),
      { zIndex: i } = Wl(() => e.show, 1),
      { disabled: l } = Gl(),
      o = !1,
      s = (v) =>
        v === "top" ? Ku(t.value) : Ku(t.value) - r.value.offsetHeight,
      u = () => {
        o = !0;
      },
      d = () => {
        var v;
        if (o) {
          o = !1;
          return;
        }
        !e.show || (v = e["onUpdate:show"]) == null || v.call(e, !1);
      },
      c = () => {
        (n.value = s(e.alignment)), (a.value = ju(t.value));
      };
    return (
      me(() => e.alignment, c),
      me(
        () => e.show,
        (function () {
          var v = Jy(function* (f) {
            var { onOpen: p, onClose: h } = e;
            f && c(), f ? p == null || p() : h == null || h();
          });
          return function (f) {
            return v.apply(this, arguments);
          };
        })()
      ),
      rt(() => {
        c(),
          document.addEventListener("click", d),
          window.addEventListener("resize", c);
      }),
      Kt(() => {
        document.removeEventListener("click", d),
          window.removeEventListener("resize", c);
      }),
      {
        disabled: l,
        zIndex: i,
        host: t,
        menu: r,
        top: n,
        left: a,
        toSizeUnit: ot,
        handleClick: u,
        resize: c,
      }
    );
  },
});
Ir.install = function (e) {
  e.component(Ir.name, Ir);
};
var tv = Symbol("SELECT_BIND_OPTION_KEY"),
  rv = Symbol("SELECT_COUNT_OPTION_KEY");
function xy() {
  var { bindChildren: e, childProviders: t } = Bt(tv),
    { length: r } = Gt(rv);
  return { length: r, options: t, bindOptions: e };
}
function e0() {
  var { bindParent: e, parentProvider: t } = Ft(tv),
    { index: r } = Zt(rv);
  if (!e || !t) throw Error("<var-option/> must in <var-select/>");
  return { index: r, select: t, bindSelect: e };
}
var t0 = { label: {}, value: {} },
  r0 = { class: "var-option__text" };
function n0(e, t) {
  var r = fe("var-checkbox"),
    n = ht("ripple");
  return Re(
    (T(),
    _(
      "div",
      {
        class: Y([
          "var-option var--box",
          [e.optionSelected ? "var-option--selected-color" : null],
        ]),
        style: J({
          width: e.wrapWidth,
          color: e.optionSelected ? e.focusColor : void 0,
        }),
        onClick:
          t[2] || (t[2] = (...a) => e.handleClick && e.handleClick(...a)),
      },
      [
        B(
          "div",
          {
            class: Y([
              "var-option__cover",
              [e.optionSelected ? "var-option--selected-background" : null],
            ]),
            style: J({ background: e.optionSelected ? e.focusColor : void 0 }),
          },
          null,
          6
        ),
        e.multiple
          ? (T(),
            Ie(
              r,
              {
                key: 0,
                ref: "checkbox",
                "checked-color": e.focusColor,
                modelValue: e.optionSelected,
                "onUpdate:modelValue":
                  t[0] || (t[0] = (a) => (e.optionSelected = a)),
                onClick: t[1] || (t[1] = mn(() => {}, ["stop"])),
                onChange: e.handleSelect,
              },
              null,
              8,
              ["checked-color", "modelValue", "onChange"]
            ))
          : de("v-if", !0),
        B("div", r0, [Z(e.$slots, "default", {}, () => [Oe(ie(e.label), 1)])]),
      ],
      6
    )),
    [[n]]
  );
}
var Hn = ve({
  render: n0,
  name: "VarOption",
  directives: { Ripple: lt },
  components: { VarCheckbox: Xr },
  props: t0,
  setup(e) {
    var t = D(!1),
      r = j(() => t.value),
      n = j(() => e.label),
      a = j(() => e.value),
      { select: i, bindSelect: l } = e0(),
      { wrapWidth: o, multiple: s, focusColor: u, onSelect: d } = i,
      c = () => {
        (t.value = !t.value), d(p);
      },
      v = () => d(p),
      f = (h) => {
        t.value = h;
      },
      p = { label: n, value: a, selected: r, sync: f };
    return (
      me(
        [() => e.label, () => e.value],
        () => {
          if (e.label == null && e.value == null)
            throw Error(`Props label and value can't both be undefined
`);
        },
        { immediate: !0 }
      ),
      l(p),
      {
        optionSelected: t,
        wrapWidth: o,
        multiple: s,
        focusColor: u,
        handleClick: c,
        handleSelect: v,
      }
    );
  },
});
Hn.install = function (e) {
  e.component(Hn.name, Hn);
};
var a0 = {
    current: { type: [Number, String] },
    size: { type: [Number, String], default: 10 },
    total: { type: [Number, String], default: 0 },
    maxPagerCount: { type: Number, default: 3 },
    disabled: { type: Boolean, default: !1 },
    simple: { type: Boolean, default: !0 },
    showSizeChanger: { type: Boolean, default: !0 },
    showQuickJumper: { type: Boolean, default: !1 },
    sizeOption: { type: Array, default: () => [10, 20, 50, 100] },
    showTotal: { type: Function },
    onChange: { type: Function },
  },
  i0 = { class: "var-pagination" },
  l0 = ["item-mode", "onClick"],
  o0 = { key: 4, class: "var-pagination__total" };
function s0(e, t) {
  var r = fe("var-icon"),
    n = fe("var-input"),
    a = fe("var-cell"),
    i = fe("var-menu"),
    l = ht("ripple");
  return (
    T(),
    _("ul", i0, [
      Re(
        B(
          "li",
          {
            class: Y([
              "var-pagination__item var-pagination__prev",
              {
                "var-pagination__item-disabled": e.current <= 1 || e.disabled,
                "var-pagination__item-hover": e.simple,
                "var-elevation--2": !e.simple,
              },
            ]),
            onClick: t[0] || (t[0] = (o) => e.clickItem("prev")),
          },
          [Z(e.$slots, "prev", {}, () => [ee(r, { name: "chevron-left" })])],
          2
        ),
        [[l, { disabled: e.current <= 1 || e.disabled }]]
      ),
      e.simple
        ? (T(),
          _(
            "li",
            {
              key: 0,
              class: Y([
                "var-pagination__simple",
                { "var-pagination__item-disabled": e.disabled },
              ]),
            },
            [
              ee(
                n,
                {
                  modelValue: e.simpleValue,
                  "onUpdate:modelValue":
                    t[1] || (t[1] = (o) => (e.simpleValue = o)),
                  disabled: e.disabled,
                  "var-pagination-cover": "",
                  onBlur:
                    t[2] ||
                    (t[2] = (o) => e.setPage("simple", e.simpleValue, o)),
                  onKeydown:
                    t[3] ||
                    (t[3] = $u(
                      (o) => e.setPage("simple", e.simpleValue, o),
                      ["enter"]
                    )),
                },
                null,
                8,
                ["modelValue", "disabled"]
              ),
              B("span", null, "/ " + ie(e.pageCount), 1),
            ],
            2
          ))
        : (T(!0),
          _(
            Pe,
            { key: 1 },
            Ze(e.pageList, (o, s) =>
              Re(
                (T(),
                _(
                  "li",
                  {
                    key: e.toNumber(o) + s,
                    "item-mode": e.getMode(o, s),
                    class: Y([
                      "var-pagination__item var-elevation--2",
                      {
                        "var-pagination__item-active":
                          o === e.current && !e.disabled,
                        "var-pagination__item-hide": e.isHideEllipsis(o, s),
                        "var-pagination__item-disabled": e.disabled,
                        "var-pagination__item-disabled-active":
                          o === e.current && e.disabled,
                      },
                    ]),
                    onClick: (u) => e.clickItem(o, s),
                  },
                  [Oe(ie(o), 1)],
                  10,
                  l0
                )),
                [[l, { disabled: e.disabled }]]
              )
            ),
            128
          )),
      Re(
        B(
          "li",
          {
            class: Y([
              "var-pagination__item var-pagination__next",
              {
                "var-pagination__item-disabled":
                  e.current >= e.pageCount || e.disabled,
                "var-pagination__item-hover": e.simple,
                "var-elevation--2": !e.simple,
              },
            ]),
            onClick: t[4] || (t[4] = (o) => e.clickItem("next")),
          },
          [Z(e.$slots, "next", {}, () => [ee(r, { name: "chevron-right" })])],
          2
        ),
        [[l, { disabled: e.current >= e.pageCount || e.disabled }]]
      ),
      e.showSizeChanger
        ? (T(),
          _(
            "li",
            {
              key: 2,
              class: Y([
                "var-pagination__size",
                { "var-pagination__item-disabled": e.disabled },
              ]),
            },
            [
              ee(
                i,
                {
                  show: e.menuVisible,
                  "onUpdate:show": t[6] || (t[6] = (o) => (e.menuVisible = o)),
                  "offset-x": -4,
                },
                {
                  menu: Ee(() => [
                    (T(!0),
                    _(
                      Pe,
                      null,
                      Ze(e.sizeOption, (o, s) =>
                        Re(
                          (T(),
                          Ie(
                            a,
                            {
                              class: Y([
                                "var-pagination__list",
                                { "var-pagination__list-active": e.size === o },
                              ]),
                              key: s,
                              onClick: (u) => e.clickSize(o),
                            },
                            {
                              default: Ee(() => [
                                Oe(
                                  ie(o) +
                                    ie(e.pack.paginationItem) +
                                    " / " +
                                    ie(e.pack.paginationPage),
                                  1
                                ),
                              ]),
                              _: 2,
                            },
                            1032,
                            ["class", "onClick"]
                          )),
                          [[l]]
                        )
                      ),
                      128
                    )),
                  ]),
                  default: Ee(() => [
                    B(
                      "div",
                      {
                        class: "var-pagination__size-open",
                        style: { display: "flex" },
                        onClick:
                          t[5] ||
                          (t[5] = (...o) => e.showMenu && e.showMenu(...o)),
                      },
                      [
                        B(
                          "span",
                          null,
                          ie(e.size) +
                            ie(e.pack.paginationItem) +
                            " / " +
                            ie(e.pack.paginationPage),
                          1
                        ),
                        ee(r, {
                          class: "var-pagination__size-open-icon",
                          "var-pagination-cover": "",
                          name: "menu-down",
                        }),
                      ]
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["show"]
              ),
            ],
            2
          ))
        : de("v-if", !0),
      e.showQuickJumper && !e.simple
        ? (T(),
          _(
            "li",
            {
              key: 3,
              class: Y([
                "var-pagination__quickly",
                { "var-pagination__item-disabled": e.disabled },
              ]),
            },
            [
              Oe(ie(e.pack.paginationJump) + " ", 1),
              ee(
                n,
                {
                  modelValue: e.inputValue,
                  "onUpdate:modelValue":
                    t[7] || (t[7] = (o) => (e.inputValue = o)),
                  disabled: e.disabled,
                  "var-pagination-cover": "",
                  onBlur:
                    t[8] || (t[8] = (o) => e.setPage("quick", e.inputValue, o)),
                  onKeydown:
                    t[9] ||
                    (t[9] = $u(
                      (o) => e.setPage("quick", e.inputValue, o),
                      ["enter"]
                    )),
                },
                null,
                8,
                ["modelValue", "disabled"]
              ),
            ],
            2
          ))
        : de("v-if", !0),
      e.totalText ? (T(), _("li", o0, ie(e.totalText), 1)) : de("v-if", !0),
    ])
  );
}
var Wn = ve({
  render: s0,
  name: "VarPagination",
  components: { VarMenu: Ir, VarIcon: We, VarCell: qr, VarInput: en },
  directives: { Ripple: lt },
  props: a0,
  setup(e) {
    var t = D(!1),
      r = D(""),
      n = D("1"),
      a = D(!1),
      i = D(!1),
      l = D(R(e.current) || 1),
      o = D(R(e.size) || 10),
      s = D([]),
      u = j(() => Math.ceil(e.maxPagerCount / 2)),
      d = j(() => Math.ceil(R(e.total) / R(o.value))),
      c = j(() => {
        var C = o.value * (l.value - 1) + 1,
          k = Math.min(o.value * l.value, R(e.total));
        return [C, k];
      }),
      v = j(() => (e.showTotal ? e.showTotal(R(e.total), c.value) : "")),
      f = (C, k) => (At(C) ? !1 : k === 1 ? a.value : i.value),
      p = (C, k) => (At(C) ? "basic" : k === 1 ? "head" : "tail"),
      h = (C, k) => {
        C === l.value ||
          e.disabled ||
          (At(C)
            ? (l.value = C)
            : C === "prev"
            ? l.value > 1 && (l.value -= 1)
            : C === "next"
            ? l.value < d.value && (l.value += 1)
            : C === "..." &&
              (k === 1
                ? (l.value = Math.max(l.value - e.maxPagerCount, 1))
                : (l.value = Math.min(l.value + e.maxPagerCount, d.value))));
      },
      g = () => {
        e.disabled || (t.value = !0);
      },
      m = (C) => {
        (o.value = C), (t.value = !1);
      },
      $ = (C) => {
        var k = /^[1-9][0-9]*$/;
        return k.test(C);
      },
      S = (C, k, M) => {
        if ((M.target.blur(), $(k))) {
          var P = R(k);
          P > d.value && ((P = d.value), (n.value = "" + P)),
            P !== l.value && (l.value = P);
        }
        C === "quick" && (r.value = ""),
          C === "simple" && !$(k) && (n.value = "" + l.value);
      };
    return (
      me([() => e.current, () => e.size], ([C, k]) => {
        (l.value = R(C) || 1), (o.value = R(k || 10));
      }),
      me(
        [l, d],
        ([C, k], [M, P]) => {
          if (C > k) {
            l.value = k;
            return;
          }
          var I = [],
            { maxPagerCount: N } = e,
            F = k - (N - u.value) - 1;
          if (((n.value = "" + C), k - 2 > N)) {
            if (M === void 0 || k !== P)
              for (var w = 2; w < N + 2; w++) I.push(w);
            if (C <= N && C < F) {
              I = [];
              for (var y = 1; y < N + 1; y++) I.push(y + 1);
              (a.value = !0), (i.value = !1);
            }
            if (C > N && C < F) {
              I = [];
              for (var z = 1; z < N + 1; z++) I.push(C + z - u.value);
              (a.value = C === 2 && N === 1), (i.value = !1);
            }
            if (C >= F) {
              I = [];
              for (var te = 1; te < N + 1; te++) I.push(k - (N - te) - 1);
              (a.value = !1), (i.value = !0);
            }
            I = [1, "...", ...I, "...", k];
          } else for (var V = 1; V <= k; V++) I.push(V);
          (s.value = I),
            M !== void 0 && (e.onChange == null || e.onChange(C, o.value));
        },
        { immediate: !0 }
      ),
      {
        pack: st,
        current: l,
        menuVisible: t,
        size: o,
        pageCount: d,
        pageList: s,
        inputValue: r,
        simpleValue: n,
        totalText: v,
        getMode: p,
        isHideEllipsis: f,
        clickItem: h,
        showMenu: g,
        clickSize: m,
        setPage: S,
        toNumber: R,
      }
    );
  },
});
Wn.install = function (e) {
  e.component(Wn.name, Wn);
};
function _o() {
  return (
    (_o =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    _o.apply(this, arguments)
  );
}
var u0 = _o(
    {
      columns: { type: Array, default: () => [] },
      title: { type: String },
      textKey: { type: String, default: "text" },
      toolbar: { type: Boolean, default: !0 },
      cascade: { type: Boolean, default: !1 },
      optionHeight: { type: [Number, String], default: 44 },
      optionCount: { type: [Number, String], default: 6 },
      confirmButtonText: { type: String },
      cancelButtonText: { type: String },
      confirmButtonTextColor: { type: String },
      cancelButtonTextColor: { type: String },
      dynamic: { type: Boolean, default: !1 },
      onChange: { type: Function },
      onConfirm: { type: Function },
      onCancel: { type: Function },
    },
    Dt(Va, [
      "show",
      "onUpdate:show",
      "closeOnClickOverlay",
      "teleport",
      "onOpen",
      "onClose",
      "onOpened",
      "onClosed",
      "onClickOverlay",
      "onRouteChange",
    ])
  ),
  nv = 300,
  d0 = 15,
  av = 0,
  v0 = { class: "var-picker__toolbar" },
  c0 = { class: "var-picker__title" },
  f0 = ["onTouchstart", "onTouchmove", "onTouchend"],
  h0 = ["onTransitionend"],
  p0 = { class: "var-picker__text" };
function m0(e, t) {
  var r = fe("var-button");
  return (
    T(),
    Ie(
      hi(e.dynamic ? "var-popup" : e.Transition),
      Xe(
        e.dynamic
          ? {
              onOpen: e.onOpen,
              onOpened: e.onOpened,
              onClose: e.onClose,
              onClosed: e.onClosed,
              onClickOverlay: e.onClickOverlay,
              onRouteChange: e.onRouteChange,
              closeOnClickOverlay: e.closeOnClickOverlay,
              teleport: e.teleport,
              show: e.show,
              "onUpdate:show": e.handlePopupUpdateShow,
              position: "bottom",
              class: "var-picker__popup",
            }
          : null,
        { "var-picker-cover": "" }
      ),
      {
        default: Ee(() => [
          B(
            "div",
            Xe({ class: "var-picker" }, e.$attrs),
            [
              B("div", v0, [
                Z(e.$slots, "cancel", {}, () => [
                  ee(
                    r,
                    {
                      class: "var-picker__cancel-button",
                      "var-picker-cover": "",
                      text: "",
                      "text-color": e.cancelButtonTextColor,
                      onClick: e.cancel,
                    },
                    {
                      default: Ee(() => [
                        Oe(
                          ie(
                            e.dt(
                              e.cancelButtonText,
                              e.pack.pickerCancelButtonText
                            )
                          ),
                          1
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["text-color", "onClick"]
                  ),
                ]),
                Z(e.$slots, "title", {}, () => [
                  B("div", c0, ie(e.dt(e.title, e.pack.pickerTitle)), 1),
                ]),
                Z(e.$slots, "confirm", {}, () => [
                  ee(
                    r,
                    {
                      class: "var-picker__confirm-button",
                      text: "",
                      "var-picker-cover": "",
                      "text-color": e.confirmButtonTextColor,
                      onClick: e.confirm,
                    },
                    {
                      default: Ee(() => [
                        Oe(
                          ie(
                            e.dt(
                              e.confirmButtonText,
                              e.pack.pickerConfirmButtonText
                            )
                          ),
                          1
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["text-color", "onClick"]
                  ),
                ]),
              ]),
              B(
                "div",
                {
                  class: "var-picker__columns",
                  style: J({ height: e.columnHeight + "px" }),
                },
                [
                  (T(!0),
                  _(
                    Pe,
                    null,
                    Ze(
                      e.scrollColumns,
                      (n) => (
                        T(),
                        _(
                          "div",
                          {
                            class: "var-picker__column",
                            key: n.id,
                            onTouchstart: (a) => e.handleTouchstart(a, n),
                            onTouchmove: mn(
                              (a) => e.handleTouchmove(a, n),
                              ["prevent"]
                            ),
                            onTouchend: (a) => e.handleTouchend(a, n),
                          },
                          [
                            B(
                              "div",
                              {
                                class: "var-picker__scroller",
                                ref: (a) => e.getScrollEl(a, n),
                                style: J({
                                  transform:
                                    "translateY(" + n.translate + "px)",
                                  transitionDuration: n.duration + "ms",
                                  transitionProperty: n.duration
                                    ? "transform"
                                    : "none",
                                }),
                                onTransitionend: (a) =>
                                  e.handleTransitionend(n),
                              },
                              [
                                (T(!0),
                                _(
                                  Pe,
                                  null,
                                  Ze(
                                    n.column.texts,
                                    (a) => (
                                      T(),
                                      _(
                                        "div",
                                        {
                                          class: "var-picker__option",
                                          style: J({
                                            height: e.optionHeight + "px",
                                          }),
                                          key: a,
                                        },
                                        [B("div", p0, ie(a), 1)],
                                        4
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              44,
                              h0
                            ),
                          ],
                          40,
                          f0
                        )
                      )
                    ),
                    128
                  )),
                  B(
                    "div",
                    {
                      class: "var-picker__picked",
                      style: J({
                        top: e.center + "px",
                        height: e.optionHeight + "px",
                      }),
                    },
                    null,
                    4
                  ),
                  B(
                    "div",
                    {
                      class: "var-picker__mask",
                      style: J({
                        backgroundSize:
                          "100% " +
                          (e.columnHeight - e.optionHeight) / 2 +
                          "px",
                      }),
                    },
                    null,
                    4
                  ),
                ],
                4
              ),
            ],
            16
          ),
        ]),
        _: 3,
      },
      16
    )
  );
}
var tn = ve({
    render: m0,
    name: "VarPicker",
    components: { VarButton: It, VarPopup: zt },
    inheritAttrs: !1,
    props: u0,
    setup(e) {
      var t = D([]),
        r = j(() => Jt(e.optionHeight)),
        n = j(() => Jt(e.optionCount)),
        a = j(() => (n.value * r.value) / 2 - r.value / 2),
        i = j(() => n.value * r.value),
        l = [],
        o = (w, y) => {
          y.scrollEl = w;
        },
        s = (w) => {
          var y;
          (y = e["onUpdate:show"]) == null || y.call(e, w);
        },
        u = (w) => {
          var y = r.value + a.value,
            z = a.value - w.column.texts.length * r.value;
          w.translate >= y && (w.translate = y),
            w.translate <= z && (w.translate = z);
        },
        d = (w, y) => {
          var { length: z } = w.column.texts;
          return (y = y >= z ? z - 1 : y), (y = y <= 0 ? 0 : y), y;
        },
        c = (w) => {
          var y = Math.round((a.value - w.translate) / r.value);
          return d(w, y);
        },
        v = () => {
          var w = t.value.map((z) => z.column.texts[z.index]),
            y = t.value.map((z) => z.index);
          return { texts: w, indexes: y };
        },
        f = (w, y, z, te = !1) => {
          var V = a.value - d(w, y) * r.value;
          V === w.translate && ((w.scrolling = !1), !te && P(w)),
            (w.translate = V),
            (w.duration = z);
        },
        p = (w, y, z) => {
          w.translate += (Math.abs(y / z) / 0.003) * (y < 0 ? -1 : 1);
        },
        h = (w, y) => {
          (y.touching = !0),
            (y.scrolling = !1),
            (y.duration = 0),
            (y.translate = eo(y.scrollEl));
        },
        g = (w, y) => {
          if (!!y.touching) {
            var { clientY: z } = w.touches[0],
              te = y.prevY !== void 0 ? z - y.prevY : 0;
            (y.prevY = z), (y.translate += te), u(y);
            var V = performance.now();
            V - y.momentumTime > nv &&
              ((y.momentumTime = V), (y.momentumPrevY = y.translate));
          }
        },
        m = (w, y) => {
          (y.touching = !1), (y.scrolling = !0), (y.prevY = void 0);
          var z = y.translate - y.momentumPrevY,
            te = performance.now() - y.momentumTime,
            V = Math.abs(z) >= d0 && te <= nv;
          V && p(y, z, te), (y.index = c(y)), f(y, y.index, V ? 1e3 : 200);
        },
        $ = (w) => {
          (w.scrolling = !1), P(w);
        },
        S = (w) =>
          w.map((y) => {
            var z,
              te = He(y) ? { texts: y } : y,
              V = {
                id: av++,
                prevY: void 0,
                momentumPrevY: void 0,
                touching: !1,
                translate: a.value,
                index: (z = te.initialIndex) != null ? z : 0,
                duration: 0,
                momentumTime: 0,
                column: te,
                scrollEl: null,
                scrolling: !1,
              };
            return f(V, V.index, 200), V;
          }),
        C = (w) => {
          var y = [];
          return k(y, w), y;
        },
        k = (w, y) => {
          if (He(y) && y.length) {
            var z = {
              id: av++,
              prevY: void 0,
              momentumPrevY: void 0,
              touching: !1,
              translate: a.value,
              index: 0,
              duration: 0,
              momentumTime: 0,
              column: { texts: y.map((te) => te[e.textKey]) },
              columns: y,
              scrollEl: null,
              scrolling: !1,
            };
            w.push(z), k(w, z.columns[z.index].children);
          }
        },
        M = (w) => {
          t.value.splice(t.value.indexOf(w) + 1),
            k(t.value, w.columns[w.index].children);
        },
        P = (w) => {
          var { cascade: y, onChange: z } = e;
          y && M(w);
          var te = t.value.some((le) => le.scrolling);
          if (!te) {
            var { texts: V, indexes: A } = v(),
              X = A.every((le, x) => le === l[x]);
            X || ((l = [...A]), z == null || z(V, A));
          }
        },
        I = () => {
          if (e.cascade) {
            var w = t.value.find((y) => y.scrolling);
            w &&
              ((w.translate = eo(w.scrollEl)),
              (w.index = c(w)),
              f(w, w.index, 0, !0),
              (w.scrolling = !1),
              M(w));
          } else
            t.value.forEach((y) => {
              (y.translate = eo(y.scrollEl)),
                (y.index = c(y)),
                f(y, y.index, 0);
            });
        },
        N = () => {
          I();
          var { texts: w, indexes: y } = v();
          (l = [...y]), e.onConfirm == null || e.onConfirm(w, y);
        },
        F = () => {
          I();
          var { texts: w, indexes: y } = v();
          (l = [...y]), e.onCancel == null || e.onCancel(w, y);
        };
      return (
        me(
          () => e.columns,
          (w) => {
            t.value = e.cascade ? C(Ve(w)) : S(Ve(w));
            var { indexes: y } = v();
            l = [...y];
          },
          { immediate: !0 }
        ),
        {
          pack: st,
          optionHeight: r,
          optionCount: n,
          scrollColumns: t,
          columnHeight: i,
          center: a,
          Transition: at,
          getScrollEl: o,
          handlePopupUpdateShow: s,
          handleTouchstart: h,
          handleTouchmove: g,
          handleTouchend: m,
          handleTransitionend: $,
          confirm: N,
          cancel: F,
          dt: Mi,
        }
      );
    },
  }),
  yt;
function rn(e) {
  return new Promise((t) => {
    rn.close();
    var r = He(e) ? { columns: e } : e,
      n = qe(r);
    (n.dynamic = !0), (n.teleport = "body"), (yt = n);
    var { unmountInstance: a } = Na(tn, n, {
      onConfirm: (i, l) => {
        n.onConfirm == null || n.onConfirm(i, l),
          t({ state: "confirm", texts: i, indexes: l }),
          (n.show = !1),
          yt === n && (yt = null);
      },
      onCancel: (i, l) => {
        n.onCancel == null || n.onCancel(i, l),
          t({ state: "cancel", texts: i, indexes: l }),
          (n.show = !1),
          yt === n && (yt = null);
      },
      onClose: () => {
        n.onClose == null || n.onClose(),
          t({ state: "close" }),
          yt === n && (yt = null);
      },
      onClosed: () => {
        n.onClosed == null || n.onClosed(), a(), yt === n && (yt = null);
      },
      onRouteChange: () => {
        a(), yt === n && (yt = null);
      },
      "onUpdate:show": (i) => {
        n.show = i;
      },
    });
    n.show = !0;
  });
}
tn.install = function (e) {
  e.component(tn.name, tn);
};
rn.Component = tn;
rn.install = function (e) {
  e.component(tn.name, tn);
};
rn.close = () => {
  if (yt != null) {
    var e = yt;
    (yt = null),
      Ye().then(() => {
        e.show = !1;
      });
  }
};
function g0(e) {
  return ["linear", "circle"].includes(e);
}
var y0 = {
    mode: { type: String, default: "linear", validator: g0 },
    lineWidth: { type: [Number, String], default: 4 },
    color: { type: String },
    trackColor: { type: String },
    ripple: { type: Boolean, default: !1 },
    value: { type: [Number, String], default: 0 },
    label: { type: Boolean, default: !1 },
    size: { type: Number, default: 40 },
    rotate: { type: Number, default: 0 },
    track: { type: Boolean, default: !0 },
  },
  b0 = { class: "var-progress" },
  C0 = { key: 0, class: "var-progress-linear" },
  w0 = ["viewBox"],
  k0 = ["cx", "cy", "r", "stroke-width"],
  S0 = ["cx", "cy", "r", "stroke-width"];
function T0(e, t) {
  return (
    T(),
    _("div", b0, [
      e.mode === "linear"
        ? (T(),
          _("div", C0, [
            B(
              "div",
              Xe(
                {
                  class: "var-progress-linear__block",
                  style: { height: e.lineWidth + "px" },
                },
                e.$attrs
              ),
              [
                e.track
                  ? (T(),
                    _(
                      "div",
                      {
                        key: 0,
                        class: "var-progress-linear__background",
                        style: J({ background: e.trackColor }),
                      },
                      null,
                      4
                    ))
                  : de("v-if", !0),
                B(
                  "div",
                  {
                    class: Y(
                      "var-progress-linear__certain" +
                        (e.ripple ? " var-progress-linear__ripple" : "")
                    ),
                    style: J({
                      background: e.color,
                      width: e.linearProps.width,
                    }),
                  },
                  null,
                  6
                ),
              ],
              16
            ),
            e.label
              ? (T(),
                _(
                  "div",
                  Xe({ key: 0, class: "var-progress-linear__label" }, e.$attrs),
                  [
                    Z(e.$slots, "default", {}, () => [
                      Oe(ie(e.linearProps.roundValue), 1),
                    ]),
                  ],
                  16
                ))
              : de("v-if", !0),
          ]))
        : de("v-if", !0),
      e.mode === "circle"
        ? (T(),
          _(
            "div",
            {
              key: 1,
              class: "var-progress-circle",
              style: J({ width: e.size + "px", height: e.size + "px" }),
            },
            [
              (T(),
              _(
                "svg",
                {
                  class: "var-progress-circle__svg",
                  style: J({ transform: "rotate(" + (e.rotate - 90) + "deg)" }),
                  viewBox: e.circleProps.viewBox,
                },
                [
                  e.track
                    ? (T(),
                      _(
                        "circle",
                        {
                          key: 0,
                          class: "var-progress-circle__background",
                          cx: e.size / 2,
                          cy: e.size / 2,
                          r: e.circleProps.radius,
                          fill: "transparent",
                          "stroke-width": e.lineWidth,
                          style: J({
                            strokeDasharray: e.circleProps.perimeter,
                            stroke: e.trackColor,
                          }),
                        },
                        null,
                        12,
                        k0
                      ))
                    : de("v-if", !0),
                  B(
                    "circle",
                    {
                      class: "var-progress-circle__certain",
                      cx: e.size / 2,
                      cy: e.size / 2,
                      r: e.circleProps.radius,
                      fill: "transparent",
                      "stroke-width": e.lineWidth,
                      style: J({
                        strokeDasharray: e.circleProps.strokeDasharray,
                        stroke: e.color,
                      }),
                    },
                    null,
                    12,
                    S0
                  ),
                ],
                12,
                w0
              )),
              e.label
                ? (T(),
                  _(
                    "div",
                    Xe(
                      { key: 0, class: "var-progress-circle__label" },
                      e.$attrs
                    ),
                    [
                      Z(e.$slots, "default", {}, () => [
                        Oe(ie(e.circleProps.roundValue), 1),
                      ]),
                    ],
                    16
                  ))
                : de("v-if", !0),
            ],
            4
          ))
        : de("v-if", !0),
    ])
  );
}
var jn = ve({
  render: T0,
  name: "VarProgress",
  inheritAttrs: !1,
  props: y0,
  setup(e) {
    var t = j(() => {
        var n = R(e.value),
          a = n > 100 ? 100 : n,
          i = n > 100 ? 100 : Math.round(n);
        return { width: a + "%", roundValue: i + "%" };
      }),
      r = j(() => {
        var { size: n, lineWidth: a, value: i } = e,
          l = "0 0 " + n + " " + n,
          o = R(i) > 100 ? 100 : Math.round(R(i)),
          s = (n - R(a)) / 2,
          u = 2 * Math.PI * s,
          d = (o / 100) * u + ", " + u;
        return {
          viewBox: l,
          radius: s,
          strokeDasharray: d,
          perimeter: u,
          roundValue: o + "%",
        };
      });
    return { linearProps: t, circleProps: r };
  },
});
jn.install = function (e) {
  e.component(jn.name, jn);
};
var $0 = {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    animationDuration: { type: [Number, String], default: 300 },
    successDuration: { type: [Number, String], default: 2e3 },
    bgColor: { type: String },
    successBgColor: { type: String },
    color: { type: String },
    successColor: { type: String },
    onRefresh: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  Ra = 100,
  Ua = -50,
  iv;
function E0(e, t) {
  var r = fe("var-icon");
  return (
    T(),
    _(
      "div",
      {
        ref: "freshNode",
        class: "var-pull-refresh",
        onTouchstart:
          t[0] || (t[0] = (...n) => e.touchStart && e.touchStart(...n)),
        onTouchmove:
          t[1] || (t[1] = (...n) => e.touchMove && e.touchMove(...n)),
        onTouchend: t[2] || (t[2] = (...n) => e.touchEnd && e.touchEnd(...n)),
        onTouchcancel:
          t[3] || (t[3] = (...n) => e.touchEnd && e.touchEnd(...n)),
      },
      [
        B(
          "div",
          {
            class: Y([
              "var-pull-refresh__control var-elevation--2",
              [e.isSuccess ? "var-pull-refresh__control-success" : null],
            ]),
            style: J(e.controlStyle),
          },
          [
            ee(
              r,
              {
                name: e.iconName,
                transition: 200,
                class: Y(e.iconClass),
                "var-pull-refresh-cover": "",
              },
              null,
              8,
              ["name", "class"]
            ),
          ],
          6
        ),
        Z(e.$slots, "default"),
      ],
      544
    )
  );
}
var Kn = ve({
  render: E0,
  name: "VarPullRefresh",
  components: { VarIcon: We },
  props: $0,
  setup(e) {
    var t = D(null),
      r = D(0),
      n = D(Ua),
      a = D("arrow-down"),
      i = D("default"),
      l = D(!1),
      o = j(
        () => i.value !== "loading" && i.value !== "success" && !e.disabled
      ),
      s = j(() => ({
        "var-pull-refresh__icon": !0,
        "var-pull-refresh__animation": i.value === "loading",
      })),
      u = j(() => ({
        transform:
          "translate3d(0px, " + n.value + "px, 0px) translate(-50%, 0)",
        transition: l.value
          ? "transform " + e.animationDuration + "ms"
          : void 0,
        background: e.successBgColor || e.bgColor,
        color: e.successColor || e.color,
      })),
      d = j(() => i.value === "success"),
      c = (h) => {
        !o.value || ((i.value = "pulling"), (r.value = h.touches[0].clientY));
      },
      v = (h) => {
        var g = Jl(iv);
        if (!(g > 0 || !o.value)) {
          g === 0 && n.value > Ua && h.cancelable && h.preventDefault();
          var m = (h.touches[0].clientY - r.value) / 2 + Ua;
          (n.value = m >= Ra ? Ra : m),
            (a.value = n.value >= Ra * 0.2 ? "refresh" : "arrow-down");
        }
      },
      f = () => {
        if (!!o.value)
          if (((l.value = !0), n.value >= Ra * 0.2)) {
            var h;
            (i.value = "loading"),
              (n.value = Ra * 0.3),
              (h = e["onUpdate:modelValue"]) == null || h.call(e, !0),
              e.onRefresh == null || e.onRefresh();
          } else
            (i.value = "loosing"),
              (a.value = "arrow-down"),
              (n.value = Ua),
              setTimeout(() => {
                l.value = !1;
              }, R(e.animationDuration));
      },
      p = () => {
        setTimeout(() => {
          (i.value = "default"), (a.value = "arrow-down"), (l.value = !1);
        }, R(e.animationDuration));
      };
    return (
      me(
        () => e.modelValue,
        (h) => {
          h === !1 &&
            ((l.value = !0),
            (i.value = "success"),
            (a.value = "checkbox-marked-circle"),
            setTimeout(() => {
              (n.value = Ua), p();
            }, R(e.successDuration)));
        }
      ),
      rt(() => {
        iv = Aa(t.value);
      }),
      {
        freshNode: t,
        touchStart: c,
        touchMove: v,
        touchEnd: f,
        iconName: a,
        iconClass: s,
        controlStyle: u,
        isSuccess: d,
      }
    );
  },
});
Kn.install = function (e) {
  e.component(Kn.name, Kn);
};
var M0 = {
    modelValue: { type: [String, Number, Boolean, Object, Array], default: !1 },
    checkedValue: {
      type: [String, Number, Boolean, Object, Array],
      default: !0,
    },
    uncheckedValue: {
      type: [String, Number, Boolean, Object, Array],
      default: !1,
    },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    checkedColor: { type: String },
    uncheckedColor: { type: String },
    iconSize: { type: [String, Number] },
    ripple: { type: Boolean, default: !0 },
    validateTrigger: { type: Array, default: () => ["onChange"] },
    rules: { type: Array },
    onClick: { type: Function },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  lv = Symbol("RADIO_GROUP_BIND_RADIO_KEY"),
  ov = Symbol("RADIO_GROUP_COUNT_RADIO_KEY");
function I0() {
  var { bindChildren: e, childProviders: t } = Bt(lv),
    { length: r } = Gt(ov);
  return { length: r, radios: t, bindRadios: e };
}
function P0() {
  var { bindParent: e, parentProvider: t } = Ft(lv),
    { index: r } = Zt(ov);
  return { index: r, radioGroup: t, bindRadioGroup: e };
}
var O0 = { class: "var-radio__wrap" };
function _0(e, t) {
  var r = fe("var-icon"),
    n = fe("var-form-details"),
    a = ht("ripple");
  return (
    T(),
    _("div", O0, [
      B(
        "div",
        Xe(
          {
            class: "var-radio",
            onClick:
              t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i)),
          },
          e.$attrs
        ),
        [
          Re(
            B(
              "div",
              {
                class: Y([
                  "var-radio__action",
                  [
                    e.checked ? "var-radio--checked" : "var-radio--unchecked",
                    e.errorMessage || e.radioGroupErrorMessage
                      ? "var-radio--error"
                      : null,
                    e.formDisabled || e.disabled ? "var-radio--disabled" : null,
                  ],
                ]),
                style: J({
                  color: e.checked ? e.checkedColor : e.uncheckedColor,
                }),
              },
              [
                e.checked
                  ? Z(e.$slots, "checked-icon", { key: 0 }, () => [
                      ee(
                        r,
                        {
                          class: Y([
                            "var-radio__icon",
                            [
                              e.withAnimation
                                ? "var-radio--with-animation"
                                : null,
                            ],
                          ]),
                          "var-radio-cover": "",
                          name: "radio-marked",
                          size: e.iconSize,
                        },
                        null,
                        8,
                        ["class", "size"]
                      ),
                    ])
                  : Z(e.$slots, "unchecked-icon", { key: 1 }, () => [
                      ee(
                        r,
                        {
                          class: Y([
                            "var-radio__icon",
                            [
                              e.withAnimation
                                ? "var-radio--with-animation"
                                : null,
                            ],
                          ]),
                          "var-radio-cover": "",
                          name: "radio-blank",
                          size: e.iconSize,
                        },
                        null,
                        8,
                        ["class", "size"]
                      ),
                    ]),
              ],
              6
            ),
            [
              [
                a,
                {
                  disabled:
                    e.formReadonly ||
                    e.readonly ||
                    e.formDisabled ||
                    e.disabled ||
                    !e.ripple,
                },
              ],
            ]
          ),
          B(
            "div",
            {
              class: Y([
                "var-radio__text",
                [
                  e.errorMessage || e.radioGroupErrorMessage
                    ? "var-radio--error"
                    : null,
                  e.formDisabled || e.disabled ? "var-radio--disabled" : null,
                ],
              ]),
            },
            [Z(e.$slots, "default")],
            2
          ),
        ],
        16
      ),
      ee(n, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
    ])
  );
}
var qn = ve({
  render: _0,
  name: "VarRadio",
  directives: { Ripple: lt },
  components: { VarIcon: We, VarFormDetails: ut },
  inheritAttrs: !1,
  props: M0,
  setup(e) {
    var t = D(!1),
      r = j(() => t.value === e.checkedValue),
      n = D(!1),
      { radioGroup: a, bindRadioGroup: i } = P0(),
      { form: l, bindForm: o } = Rt(),
      {
        errorMessage: s,
        validateWithTrigger: u,
        validate: d,
        resetValidation: c,
      } = Lt(),
      v = (C) => {
        Ye(() => {
          var { validateTrigger: k, rules: M, modelValue: P } = e;
          u(k, C, M, P);
        });
      },
      f = (C) => {
        var k,
          { checkedValue: M, onChange: P } = e;
        (a && t.value === M) ||
          ((t.value = C),
          (k = e["onUpdate:modelValue"]) == null || k.call(e, t.value),
          P == null || P(t.value),
          a == null || a.onToggle(M),
          v("onChange"));
      },
      p = (C) => {
        var {
          disabled: k,
          readonly: M,
          uncheckedValue: P,
          checkedValue: I,
          onClick: N,
        } = e;
        (l != null && l.disabled.value) ||
          k ||
          (N == null || N(C),
          !((l != null && l.readonly.value) || M) &&
            ((n.value = !0), f(r.value ? P : I)));
      },
      h = (C) => {
        var { checkedValue: k, uncheckedValue: M } = e;
        t.value = C === k ? k : M;
      },
      g = () => {
        var C;
        (C = e["onUpdate:modelValue"]) == null || C.call(e, e.uncheckedValue),
          c();
      },
      m = () => d(e.rules, e.modelValue),
      $ = (C) => {
        var { uncheckedValue: k, checkedValue: M } = e,
          P = ![k, M].includes(C);
        P && (C = r.value ? k : M), f(C);
      };
    me(
      () => e.modelValue,
      (C) => {
        t.value = C;
      },
      { immediate: !0 }
    );
    var S = { sync: h, validate: m, resetValidation: c, reset: g };
    return (
      i == null || i(S),
      o == null || o(S),
      {
        withAnimation: n,
        checked: r,
        errorMessage: s,
        radioGroupErrorMessage: a == null ? void 0 : a.errorMessage,
        formDisabled: l == null ? void 0 : l.disabled,
        formReadonly: l == null ? void 0 : l.readonly,
        handleClick: p,
        toggle: $,
        reset: g,
        validate: m,
        resetValidation: c,
      }
    );
  },
});
qn.install = function (e) {
  e.component(qn.name, qn);
};
function V0(e) {
  return ["horizontal", "vertical"].includes(e);
}
var N0 = {
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: void 0,
    },
    direction: { type: String, default: "horizontal", validator: V0 },
    validateTrigger: { type: Array, default: () => ["onChange"] },
    rules: { type: Array },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  A0 = { class: "var-radio-group__wrap" };
function D0(e, t) {
  var r = fe("var-form-details");
  return (
    T(),
    _("div", A0, [
      B(
        "div",
        { class: Y(["var-radio-group", ["var-radio-group--" + e.direction]]) },
        [Z(e.$slots, "default")],
        2
      ),
      ee(r, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
    ])
  );
}
var Xn = ve({
  render: D0,
  name: "VarRadioGroup",
  components: { VarFormDetails: ut },
  props: N0,
  setup(e) {
    var { length: t, radios: r, bindRadios: n } = I0(),
      { bindForm: a } = Rt(),
      {
        errorMessage: i,
        validateWithTrigger: l,
        validate: o,
        resetValidation: s,
      } = Lt(),
      u = j(() => i.value),
      d = (g) => {
        Ye(() => {
          var { validateTrigger: m, rules: $, modelValue: S } = e;
          l(m, g, $, S);
        });
      },
      c = () => r.forEach(({ sync: g }) => g(e.modelValue)),
      v = (g) => {
        var m;
        (m = e["onUpdate:modelValue"]) == null || m.call(e, g),
          e.onChange == null || e.onChange(g),
          d("onChange");
      },
      f = () => o(e.rules, e.modelValue),
      p = () => {
        var g;
        (g = e["onUpdate:modelValue"]) == null || g.call(e, void 0), s();
      };
    me(() => e.modelValue, c), me(() => t.value, c);
    var h = {
      onToggle: v,
      validate: f,
      reset: p,
      resetValidation: s,
      errorMessage: u,
    };
    return (
      a == null || a(h),
      n(h),
      { errorMessage: i, reset: p, validate: f, resetValidation: s }
    );
  },
});
Xn.install = function (e) {
  e.component(Xn.name, Xn);
};
var B0 = {
    modelValue: { type: [String, Number], default: 0 },
    count: { type: [String, Number], default: 5 },
    color: { type: String },
    icon: { type: String, default: "star" },
    emptyColor: { type: String },
    emptyIcon: { type: String, default: "star-outline" },
    size: { type: [String, Number], default: "24" },
    gap: { type: [String, Number], default: "2" },
    half: { type: Boolean, default: !1 },
    halfIcon: { type: String, default: "star-half-full" },
    disabled: { type: Boolean, default: !1 },
    disabledColor: { type: String },
    readonly: { type: Boolean, default: !1 },
    ripple: { type: Boolean, default: !0 },
    rules: { type: Array },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  F0 = { class: "var-rate__warp" },
  L0 = { class: "var-rate" },
  z0 = ["onClick"];
function R0(e, t) {
  var r = fe("var-icon"),
    n = fe("var-form-details"),
    a = ht("ripple");
  return (
    T(),
    _("div", F0, [
      B("div", L0, [
        (T(!0),
        _(
          Pe,
          null,
          Ze(e.toNumber(e.count), (i) =>
            Re(
              (T(),
              _(
                "div",
                {
                  key: i,
                  style: J(e.getStyle(i)),
                  class: Y(e.getClass(i)),
                  onClick: (l) => e.handleClick(i, l),
                },
                [
                  ee(
                    r,
                    {
                      transition: 0,
                      name: e.getIconName(i),
                      style: J({ fontSize: e.toSizeUnit(e.size) }),
                    },
                    null,
                    8,
                    ["name", "style"]
                  ),
                ],
                14,
                z0
              )),
              [
                [
                  a,
                  {
                    disabled:
                      e.formReadonly ||
                      e.readonly ||
                      e.formDisabled ||
                      e.disabled ||
                      !e.ripple,
                  },
                ],
              ]
            )
          ),
          128
        )),
      ]),
      ee(n, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
    ])
  );
}
var Gn = ve({
  render: R0,
  name: "VarRate",
  components: { VarIcon: We, VarFormDetails: ut },
  directives: { Ripple: lt },
  props: B0,
  setup(e) {
    var { form: t, bindForm: r } = Rt(),
      {
        errorMessage: n,
        validateWithTrigger: a,
        validate: i,
        resetValidation: l,
      } = Lt(),
      o = (m) => {
        var { count: $, size: S, gap: C } = e;
        return {
          color: d(m).color,
          marginRight: m !== R($) ? ot(C) : 0,
          width: ot(S),
          height: ot(S),
          borderRadius: "50%",
        };
      },
      s = (m) => {
        var { type: $, color: S } = d(m);
        return {
          "var-rate__content": !0,
          "var-rate--disabled": t == null ? void 0 : t.disabled.value,
          "var-rate--error": n.value,
          "var-rate--primary": $ !== "empty" && !S,
        };
      },
      u = (m) => {
        var { type: $ } = d(m),
          { icon: S, halfIcon: C, emptyIcon: k } = e;
        return $ === "full" ? S : $ === "half" ? C : k;
      },
      d = (m) => {
        var {
            modelValue: $,
            disabled: S,
            disabledColor: C,
            color: k,
            half: M,
            emptyColor: P,
          } = e,
          I;
        return (
          S || (t != null && t.disabled.value) ? (I = C) : k && (I = k),
          m <= R($)
            ? { type: "full", score: m, color: I }
            : M && m <= R($) + 0.5
            ? { type: "half", score: m, color: I }
            : {
                type: "empty",
                score: m,
                color: S || (t != null && t.disabled.value) ? C : P,
              }
        );
      },
      c = (m, $) => {
        var S;
        if (e.half) {
          var { offsetWidth: C } = $.target;
          $.offsetX <= Math.floor(C / 2) && (m -= 0.5);
        }
        (S = e["onUpdate:modelValue"]) == null || S.call(e, m);
      },
      v = () => i(e.rules, R(e.modelValue)),
      f = () => Ye(() => a(["onChange"], "onChange", e.rules, e.modelValue)),
      p = (m, $) => {
        var { readonly: S, disabled: C, onChange: k } = e;
        S ||
          C ||
          (t != null && t.disabled.value) ||
          (t != null && t.readonly.value) ||
          (c(m, $), k == null || k(m), f());
      },
      h = () => {
        var m;
        (m = e["onUpdate:modelValue"]) == null || m.call(e, 0), l();
      },
      g = { reset: h, validate: v, resetValidation: l };
    return (
      r == null || r(g),
      {
        errorMessage: n,
        formDisabled: t == null ? void 0 : t.disabled,
        formReadonly: t == null ? void 0 : t.readonly,
        getStyle: o,
        getClass: s,
        getIconName: u,
        handleClick: p,
        reset: h,
        validate: v,
        resetValidation: l,
        toSizeUnit: ot,
        toNumber: R,
      }
    );
  },
});
Gn.install = function (e) {
  e.component(Gn.name, Gn);
};
function U0(e) {
  return [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
  ].includes(e);
}
function Y0(e) {
  return ["flex-start", "center", "flex-end"].includes(e);
}
var H0 = {
  gutter: { type: [String, Number], default: 0 },
  justify: { type: String, default: "flex-start", validator: U0 },
  align: { type: String, default: "flex-start", validator: Y0 },
  onClick: { type: Function },
};
function W0(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: "var-row var--box",
        style: J({ justifyContent: e.justify, alignItems: e.align }),
        onClick: t[0] || (t[0] = (...r) => e.onClick && e.onClick(...r)),
      },
      [Z(e.$slots, "default")],
      4
    )
  );
}
var Zn = ve({
  render: W0,
  name: "VarRow",
  props: H0,
  setup(e) {
    var { cols: t, bindCols: r, length: n } = Up(),
      a = () => {
        var o = [[]],
          s = 0;
        return (
          t.forEach((u) => {
            var d = u.span.value + u.offset.value,
              c = s + d;
            c > 24
              ? (o.push([u]), (s = d))
              : (o[o.length - 1].push(u), (s += d));
          }),
          o
        );
      },
      i = () => {
        var o = a(),
          s = Jt(e.gutter),
          u = s / 2;
        o.forEach((d) => {
          d.forEach((c, v) => {
            d.length <= 1 ||
              (v === 0 && c.setPadding({ left: 0, right: u }),
              v === d.length - 1 && c.setPadding({ left: u, right: 0 }),
              v > 0 && v < d.length - 1 && c.setPadding({ left: u, right: u }));
          });
        });
      },
      l = { computePadding: i };
    me(() => n.value, i), me(() => e.gutter, i), r(l);
  },
});
Zn.install = function (e) {
  e.component(Zn.name, Zn);
};
function j0(e) {
  return ["left", "right", "center"].includes(e);
}
var K0 = {
    modelValue: { default: void 0 },
    placeholder: { type: String },
    multiple: { type: Boolean, default: !1 },
    chip: { type: Boolean, default: !1 },
    line: { type: Boolean, default: !0 },
    hint: { type: Boolean, default: !0 },
    textColor: { type: String },
    focusColor: { type: String },
    blurColor: { type: String },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    separator: { type: String, default: "," },
    textAlign: { type: String, default: "left", validator: j0 },
    validateTrigger: {
      type: Array,
      default: () => ["onChange", "onClear", "onClose"],
    },
    rules: { type: Array },
    onFocus: { type: Function },
    onBlur: { type: Function },
    onClick: { type: Function },
    onClear: { type: Function },
    onClose: { type: Function },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  q0 = { key: 0 },
  X0 = { key: 0, class: "var-select__chips" },
  G0 = { key: 1, class: "var-select__values" },
  Z0 = { key: 1 },
  J0 = { class: "var-select__scroller" };
function Q0(e, t) {
  var r = fe("var-chip"),
    n = fe("var-icon"),
    a = fe("var-menu"),
    i = fe("var-form-details");
  return (
    T(),
    _(
      "div",
      {
        class: Y([
          "var-select var--box",
          [e.formDisabled || e.disabled ? "var-select--disabled" : null],
        ]),
        onClick:
          t[3] || (t[3] = (...l) => e.handleClick && e.handleClick(...l)),
      },
      [
        B(
          "div",
          {
            class: Y([
              "var-select__controller",
              [
                e.isFocus ? "var-select--focus" : null,
                e.errorMessage ? "var-select--error" : null,
                e.formDisabled || e.disabled ? "var-select--disabled" : null,
              ],
            ]),
            style: J({
              color: e.errorMessage
                ? void 0
                : e.isFocus
                ? e.focusColor
                : e.blurColor,
            }),
          },
          [
            B(
              "div",
              {
                class: Y([
                  "var-select__icon",
                  [e.hint ? null : "var-select--non-hint"],
                ]),
              },
              [Z(e.$slots, "prepend-icon")],
              2
            ),
            ee(
              a,
              {
                class: "var-select__menu",
                "var-select-cover": "",
                "offset-y": e.offsetY,
                show: e.isFocus,
                "onUpdate:show": t[2] || (t[2] = (l) => (e.isFocus = l)),
                onClose: e.handleBlur,
              },
              {
                menu: Ee(() => [B("div", J0, [Z(e.$slots, "default")])]),
                default: Ee(() => [
                  B(
                    "div",
                    {
                      class: Y([
                        "var-select__wrap",
                        [e.hint ? null : "var-select--non-hint"],
                      ]),
                      ref: "wrapEl",
                      onClick:
                        t[1] ||
                        (t[1] = (...l) => e.handleFocus && e.handleFocus(...l)),
                    },
                    [
                      B(
                        "div",
                        {
                          class: Y([
                            "var-select__select",
                            [
                              e.errorMessage ? "var-select--error" : null,
                              e.formDisabled || e.disabled
                                ? "var-select--disabled"
                                : null,
                            ],
                          ]),
                          style: J({
                            textAlign: e.textAlign,
                            color: e.textColor,
                          }),
                        },
                        [
                          e.multiple
                            ? (T(),
                              _("div", q0, [
                                e.chip
                                  ? (T(),
                                    _("div", X0, [
                                      (T(!0),
                                      _(
                                        Pe,
                                        null,
                                        Ze(
                                          e.labels,
                                          (l) => (
                                            T(),
                                            Ie(
                                              r,
                                              {
                                                class: "var-select__chip",
                                                "var-select-cover": "",
                                                closable: "",
                                                size: "small",
                                                type: e.errorMessage
                                                  ? "danger"
                                                  : void 0,
                                                key: l,
                                                onClick:
                                                  t[0] ||
                                                  (t[0] = mn(() => {}, [
                                                    "stop",
                                                  ])),
                                                onClose: (o) =>
                                                  e.handleClose(l),
                                              },
                                              {
                                                default: Ee(() => [
                                                  Oe(ie(l), 1),
                                                ]),
                                                _: 2,
                                              },
                                              1032,
                                              ["type", "onClose"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]))
                                  : (T(),
                                    _(
                                      "div",
                                      G0,
                                      ie(e.labels.join(e.separator)),
                                      1
                                    )),
                              ]))
                            : (T(), _("span", Z0, ie(e.label), 1)),
                          ee(
                            n,
                            {
                              class: Y([
                                "var-select__arrow",
                                [e.isFocus ? "var-select--arrow-rotate" : null],
                              ]),
                              "var-select-cover": "",
                              name: "menu-down",
                              transition: 300,
                            },
                            null,
                            8,
                            ["class"]
                          ),
                        ],
                        6
                      ),
                      B(
                        "label",
                        {
                          class: Y([
                            "var-select__placeholder var--ellipsis",
                            [
                              e.formDisabled || e.disabled
                                ? "var-select--disabled"
                                : null,
                              e.computePlaceholderState(),
                              e.hint
                                ? null
                                : "var-select--placeholder-non-hint",
                            ],
                          ]),
                        },
                        ie(e.placeholder),
                        3
                      ),
                    ],
                    2
                  ),
                ]),
                _: 3,
              },
              8,
              ["offset-y", "show", "onClose"]
            ),
            B(
              "div",
              {
                class: Y([
                  "var-select__icon",
                  [e.hint ? null : "var-select--non-hint"],
                ]),
              },
              [
                Z(e.$slots, "append-icon", {}, () => [
                  e.clearable
                    ? (T(),
                      Ie(
                        n,
                        {
                          key: 0,
                          class: "var-select__clear-icon",
                          name: "close-circle",
                          size: "14px",
                          onClick: e.handleClear,
                        },
                        null,
                        8,
                        ["onClick"]
                      ))
                    : de("v-if", !0),
                ]),
              ],
              2
            ),
          ],
          6
        ),
        e.line
          ? (T(),
            _(
              "div",
              {
                key: 0,
                class: Y([
                  "var-select__line",
                  [
                    e.formDisabled || e.disabled
                      ? "var-select--line-disabled"
                      : null,
                    e.errorMessage ? "var-select--line-error" : null,
                  ],
                ]),
                style: J({ background: e.errorMessage ? void 0 : e.blurColor }),
              },
              [
                B(
                  "div",
                  {
                    class: Y([
                      "var-select__dot",
                      [
                        e.isFocus ? "var-select--spread" : null,
                        e.formDisabled || e.disabled
                          ? "var-select--line-disabled"
                          : null,
                        e.errorMessage ? "var-select--line-error" : null,
                      ],
                    ]),
                    style: J({
                      background: e.errorMessage ? void 0 : e.focusColor,
                    }),
                  },
                  null,
                  6
                ),
              ],
              6
            ))
          : de("v-if", !0),
        ee(i, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
      ],
      2
    )
  );
}
var Jn = ve({
  render: Q0,
  name: "VarSelect",
  components: { VarIcon: We, VarMenu: Ir, VarChip: Gr, VarFormDetails: ut },
  props: K0,
  setup(e) {
    var t = D(null),
      r = D(!1),
      n = j(() => e.multiple),
      a = j(() => e.focusColor),
      i = D(""),
      l = D([]),
      o = j(() => (t.value && window.getComputedStyle(t.value).width) || "0px"),
      s = j(() => {
        var x =
          (t.value && window.getComputedStyle(t.value).paddingTop) || "0px";
        return Jt(x) * 1.5;
      }),
      { bindForm: u, form: d } = Rt(),
      { length: c, options: v, bindOptions: f } = xy(),
      {
        errorMessage: p,
        validateWithTrigger: h,
        validate: g,
        resetValidation: m,
      } = Lt(),
      $ = () => {
        var { multiple: x, modelValue: O } = e;
        if (x) {
          var U = O;
          l.value = U.map(k);
        }
        !x && !fr(O) && (i.value = k(O)), !x && fr(O) && (i.value = "");
      },
      S = (x) => {
        Ye(() => {
          var { validateTrigger: O, rules: U, modelValue: re } = e;
          h(O, x, U, re);
        });
      },
      C = ({ value: x, label: O }) => (x.value != null ? x.value : O.value),
      k = (x) => {
        var O = v.find(({ value: U }) => U.value === x);
        return (
          O || (O = v.find(({ label: U }) => U.value === x)), O.label.value
        );
      },
      M = () => {
        var { hint: x, modelValue: O } = e;
        if (!x && !fr(O)) return "var-select--placeholder-hidden";
        if (x && (!fr(O) || r.value)) return "var-select--placeholder-hint";
      },
      P = () => {
        var { disabled: x, readonly: O, onFocus: U } = e;
        (d != null && d.disabled.value) ||
          (d != null && d.readonly.value) ||
          x ||
          O ||
          ((r.value = !0), U == null || U(), S("onFocus"));
      },
      I = () => {
        var { disabled: x, readonly: O, onBlur: U } = e;
        (d != null && d.disabled.value) ||
          (d != null && d.readonly.value) ||
          x ||
          O ||
          (U == null || U(), S("onBlur"));
      },
      N = (x) => {
        var O,
          { disabled: U, readonly: re, multiple: pe, onChange: ce } = e;
        if (
          !(
            (d != null && d.disabled.value) ||
            (d != null && d.readonly.value) ||
            U ||
            re
          )
        ) {
          var q = pe ? v.filter(({ selected: ge }) => ge.value).map(C) : C(x);
          (O = e["onUpdate:modelValue"]) == null || O.call(e, q),
            ce == null || ce(q),
            S("onChange"),
            !pe && (r.value = !1);
        }
      },
      F = () => {
        var x,
          {
            disabled: O,
            readonly: U,
            multiple: re,
            clearable: pe,
            onClear: ce,
          } = e;
        if (
          !(
            (d != null && d.disabled.value) ||
            (d != null && d.readonly.value) ||
            O ||
            U ||
            !pe
          )
        ) {
          var q = re ? [] : void 0;
          (x = e["onUpdate:modelValue"]) == null || x.call(e, q),
            ce == null || ce(q),
            S("onClear");
        }
      },
      w = (x) => {
        var { disabled: O, onClick: U } = e;
        (d != null && d.disabled.value) ||
          O ||
          (U == null || U(x), S("onClick"));
      },
      y = (x) => {
        var O,
          { disabled: U, readonly: re, modelValue: pe, onClose: ce } = e;
        if (
          !(
            (d != null && d.disabled.value) ||
            (d != null && d.readonly.value) ||
            U ||
            re
          )
        ) {
          var q = pe,
            ge = v.find(({ label: ke }) => ke.value === x),
            ue = q.filter((ke) => {
              var Ne;
              return (
                ke !== ((Ne = ge.value.value) != null ? Ne : ge.label.value)
              );
            });
          (O = e["onUpdate:modelValue"]) == null || O.call(e, ue),
            ce == null || ce(ue),
            S("onClose");
        }
      },
      z = () => {
        var { multiple: x, modelValue: O } = e;
        if (x) {
          var U = O;
          v.forEach((re) => re.sync(U.includes(C(re))));
        } else v.forEach((re) => re.sync(O === C(re)));
        $();
      },
      te = () => {
        r.value = !0;
      },
      V = () => {
        r.value = !1;
      },
      A = () => g(e.rules, e.modelValue),
      X = () => {
        var x;
        (x = e["onUpdate:modelValue"]) == null ||
          x.call(e, e.multiple ? [] : void 0),
          m();
      };
    me(
      () => e.multiple,
      () => {
        var { multiple: x, modelValue: O } = e;
        if (x && !He(O))
          throw Error("The modelValue must be an array when multiple is true");
      }
    ),
      me(() => e.modelValue, z, { deep: !0 }),
      me(() => c.value, z);
    var le = {
      wrapWidth: o,
      multiple: n,
      focusColor: a,
      onSelect: N,
      reset: X,
      validate: A,
      resetValidation: m,
    };
    return (
      f(le),
      u == null || u(le),
      {
        wrapEl: t,
        offsetY: s,
        isFocus: r,
        errorMessage: p,
        formDisabled: d == null ? void 0 : d.disabled,
        label: i,
        labels: l,
        computePlaceholderState: M,
        handleFocus: P,
        handleBlur: I,
        handleClear: F,
        handleClick: w,
        handleClose: y,
        reset: X,
        validate: A,
        resetValidation: m,
        focus: te,
        blur: V,
      }
    );
  },
});
Jn.install = function (e) {
  e.component(Jn.name, Jn);
};
var x0 = {
    loading: { type: Boolean, default: !0 },
    title: { type: Boolean, default: !1 },
    card: { type: Boolean, default: !1 },
    avatar: { type: Boolean, default: !1 },
    fullscreen: { type: Boolean, default: !1 },
    titleWidth: { type: [Number, String] },
    cardHeight: { type: [Number, String] },
    avatarSize: { type: [Number, String] },
    rows: { type: [Number, String], default: 3 },
    rowsWidth: { type: Array, default: () => [] },
  },
  Ya = (e) => (vl(""), (e = e()), cl(), e),
  eb = { class: "var--box var-skeleton" },
  tb = { key: 0, class: "var-skeleton__data" },
  rb = { key: 1, class: "var-skeleton__content" },
  nb = Ya(() => B("div", { class: "var-skeleton--animation" }, null, -1)),
  ab = [nb],
  ib = { class: "var-skeleton__article" },
  lb = Ya(() => B("div", { class: "var-skeleton--animation" }, null, -1)),
  ob = [lb],
  sb = { class: "var-skeleton__section" },
  ub = Ya(() => B("div", { class: "var-skeleton--animation" }, null, -1)),
  db = [ub],
  vb = Ya(() => B("div", { class: "var-skeleton--animation" }, null, -1)),
  cb = [vb],
  fb = { key: 2, class: "var-skeleton__fullscreen" },
  hb = Ya(() => B("div", { class: "var-skeleton--animation" }, null, -1)),
  pb = [hb];
function mb(e, t) {
  return (
    T(),
    _("div", eb, [
      e.loading
        ? de("v-if", !0)
        : (T(), _("div", tb, [Z(e.$slots, "default")])),
      e.loading && !e.fullscreen
        ? (T(),
          _("div", rb, [
            e.card
              ? (T(),
                _(
                  "div",
                  {
                    key: 0,
                    class: "var-skeleton__card",
                    style: J({ height: e.toSizeUnit(e.cardHeight) }),
                  },
                  ab,
                  4
                ))
              : de("v-if", !0),
            B("div", ib, [
              e.avatar
                ? (T(),
                  _(
                    "div",
                    {
                      key: 0,
                      class: "var-skeleton__avatar",
                      style: J({
                        width: e.toSizeUnit(e.avatarSize),
                        height: e.toSizeUnit(e.avatarSize),
                      }),
                    },
                    ob,
                    4
                  ))
                : de("v-if", !0),
              B("div", sb, [
                e.title
                  ? (T(),
                    _(
                      "div",
                      {
                        key: 0,
                        class: "var-skeleton__title",
                        style: J({ width: e.toSizeUnit(e.titleWidth) }),
                      },
                      db,
                      4
                    ))
                  : de("v-if", !0),
                (T(!0),
                _(
                  Pe,
                  null,
                  Ze(
                    e.toNumber(e.rows),
                    (r, n) => (
                      T(),
                      _(
                        "div",
                        {
                          class: "var-skeleton__row",
                          key: r,
                          style: J({ width: e.toSizeUnit(e.rowsWidth[n]) }),
                        },
                        cb,
                        4
                      )
                    )
                  ),
                  128
                )),
              ]),
            ]),
          ]))
        : de("v-if", !0),
      e.loading && e.fullscreen ? (T(), _("div", fb, pb)) : de("v-if", !0),
    ])
  );
}
var Qn = ve({
  render: mb,
  name: "VarSkeleton",
  props: x0,
  setup() {
    return { toSizeUnit: ot, toNumber: R };
  },
});
Qn.install = function (e) {
  e.component(Qn.name, Qn);
};
function gb(e) {
  return ["always", "normal", "never"].includes(e);
}
var yb = {
    modelValue: { type: [Number, Array], default: 0 },
    step: { type: [Number, String], default: 1 },
    range: { type: Boolean, default: !1 },
    labelVisible: { type: String, default: "normal", validator: gb },
    activeColor: { type: String },
    trackColor: { type: String },
    thumbColor: { type: String },
    labelColor: { type: String },
    labelTextColor: { type: String },
    trackHeight: { type: [String, Number] },
    thumbSize: { type: [String, Number] },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    rules: { type: Array },
    onChange: { type: Function },
    onStart: { type: Function },
    onEnd: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  Ge;
(function (e) {
  (e.First = "1"), (e.Second = "2");
})(Ge || (Ge = {}));
var bb = { class: "var-slider" },
  Cb = { class: "var-slider__track" },
  wb = ["onTouchstart", "onTouchmove", "onTouchend", "onTouchcancel"];
function kb(e, t) {
  var r = fe("var-form-details");
  return (
    T(),
    _("div", bb, [
      B(
        "div",
        {
          class: Y([
            "var-slider-block",
            [
              e.isDisabled ? "var-slider__disable" : null,
              e.errorMessage ? "var-slider__error" : null,
            ],
          ]),
          style: J({
            height:
              e.thumbSize === void 0
                ? e.thumbSize
                : 3 * e.toNumber(e.thumbSize) + "px",
            margin:
              e.thumbSize === void 0
                ? e.thumbSize
                : "0 " + e.toNumber(e.thumbSize) / 2 + "px",
          }),
          ref: "sliderEl",
          onClick: t[0] || (t[0] = (...n) => e.click && e.click(...n)),
        },
        [
          B("div", Cb, [
            B(
              "div",
              {
                class: "var-slider__track-background",
                style: J({
                  background: e.trackColor,
                  height: e.trackHeight + "px",
                }),
              },
              null,
              4
            ),
            B(
              "div",
              { class: "var-slider__track-fill", style: J(e.getFillStyle) },
              null,
              4
            ),
          ]),
          (T(!0),
          _(
            Pe,
            null,
            Ze(
              e.thumbList,
              (n) => (
                T(),
                _(
                  "div",
                  {
                    class: "var-slider__thumb",
                    key: n.enumValue,
                    style: J({
                      left: n.value + "%",
                      zIndex: e.thumbsProps[n.enumValue].active ? 1 : void 0,
                    }),
                    onTouchstart: (a) => e.start(a, n.enumValue),
                    onTouchmove: (a) => e.move(a, n.enumValue),
                    onTouchend: (a) => e.end(n.enumValue),
                    onTouchcancel: (a) => e.end(n.enumValue),
                  },
                  [
                    Z(e.$slots, "button", { currentValue: n.value }, () => [
                      B(
                        "div",
                        {
                          class: "var-slider__thumb-block",
                          style: J({
                            background: e.thumbColor,
                            height: e.thumbSize + "px",
                            width: e.thumbSize + "px",
                          }),
                        },
                        null,
                        4
                      ),
                      B(
                        "div",
                        {
                          class: Y([
                            "var-slider__thumb-ripple",
                            [
                              e.thumbsProps[n.enumValue].active
                                ? "var-slider__thumb-ripple-active"
                                : null,
                            ],
                          ]),
                          style: J({
                            background: e.thumbColor,
                            height:
                              e.thumbSize === void 0
                                ? void 0
                                : e.thumbsProps[n.enumValue].active
                                ? 3 * e.toNumber(e.thumbSize) + "px"
                                : "0px",
                            width:
                              e.thumbSize === void 0
                                ? void 0
                                : e.thumbsProps[n.enumValue].active
                                ? 3 * e.toNumber(e.thumbSize) + "px"
                                : "0px",
                          }),
                        },
                        null,
                        6
                      ),
                      B(
                        "div",
                        {
                          class: Y([
                            "var-slider__thumb-label",
                            [
                              e.showLabel(n.enumValue)
                                ? "var-slider__thumb-label-active"
                                : null,
                            ],
                          ]),
                          style: J({
                            background: e.labelColor,
                            color: e.labelTextColor,
                            height:
                              e.thumbSize === void 0
                                ? e.thumbSize
                                : 2 * e.toNumber(e.thumbSize) + "px",
                            width:
                              e.thumbSize === void 0
                                ? e.thumbSize
                                : 2 * e.toNumber(e.thumbSize) + "px",
                          }),
                        },
                        [B("span", null, ie(n.value), 1)],
                        6
                      ),
                    ]),
                  ],
                  44,
                  wb
                )
              )
            ),
            128
          )),
        ],
        6
      ),
      ee(
        r,
        {
          "error-message": e.errorMessage,
          class: "var-slider__form",
          "var-slider-cover": "",
        },
        null,
        8,
        ["error-message"]
      ),
    ])
  );
}
var xn = ve({
  render: kb,
  name: "VarSlider",
  components: { VarFormDetails: ut },
  props: yb,
  setup(e) {
    var { bindForm: t, form: r } = Rt(),
      {
        errorMessage: n,
        validateWithTrigger: a,
        validate: i,
        resetValidation: l,
      } = Lt(),
      o = () => i(e.rules, e.modelValue),
      s = () => ({
        startPosition: 0,
        currentLeft: 0,
        active: !1,
        percentValue: 0,
      }),
      u = () => Ye(() => a(["onChange"], "onChange", e.rules, e.modelValue)),
      d = D(null),
      c = D(0),
      v = D(!1),
      f = qe({ [Ge.First]: s(), [Ge.Second]: s() }),
      p = j(() => (c.value / 100) * R(e.step)),
      h = j(() => {
        var V = [{ value: e.modelValue, enumValue: Ge.First }];
        return (
          e.range &&
            He(e.modelValue) &&
            (V = [
              { value: e.modelValue[0], enumValue: Ge.First },
              { value: e.modelValue[1], enumValue: Ge.Second },
            ]),
          V
        );
      }),
      g = (V) =>
        e.labelVisible === "always"
          ? !0
          : e.labelVisible === "never"
          ? !1
          : f[V].active,
      m = j(() => {
        var { activeColor: V, range: A, modelValue: X } = e,
          le = A && He(X) ? Math.abs(X[0] - X[1]) : X,
          x = A && He(X) ? Math.min(X[0], X[1]) : 0;
        return { width: le + "%", left: x + "%", background: V };
      }),
      $ = j(() => e.disabled || (r == null ? void 0 : r.disabled.value)),
      S = j(() => e.readonly || (r == null ? void 0 : r.readonly.value)),
      C = (V, A) => {
        var X = [],
          { step: le, range: x, modelValue: O, onChange: U } = e,
          re = R(le),
          pe = Math.round(V / p.value),
          ce = pe * re,
          q = f[A].percentValue;
        if (
          ((f[A].percentValue = ce / re),
          x && He(O) && (X = A === Ge.First ? [ce, O[1]] : [O[0], ce]),
          q !== ce)
        ) {
          var ge,
            ue = x ? X : ce;
          U == null || U(ue),
            (ge = e["onUpdate:modelValue"]) == null || ge.call(e, ue),
            u();
        }
      },
      k = (V) => {
        if (!e.range) return Ge.First;
        var A = f[Ge.First].percentValue * p.value,
          X = f[Ge.Second].percentValue * p.value,
          le = Math.abs(V - A),
          x = Math.abs(V - X);
        return le <= x ? Ge.First : Ge.Second;
      },
      M = (V, A) => {
        c.value || (c.value = d.value.offsetWidth),
          !($.value || S.value) &&
            (e.onStart == null || e.onStart(),
            (v.value = !0),
            (f[A].startPosition = V.touches[0].clientX));
      },
      P = (V, A) => {
        if (!($.value || S.value || !v.value)) {
          var X = V.touches[0].clientX - f[A].startPosition + f[A].currentLeft;
          (f[A].active = !0),
            X <= 0 ? (X = 0) : X >= c.value && (X = c.value),
            C(X, A);
        }
      },
      I = (V) => {
        var { range: A, modelValue: X, onEnd: le } = e;
        if (!($.value || S.value)) {
          var x = [];
          (f[V].currentLeft = f[V].percentValue * p.value), (f[V].active = !1);
          var O = f[V].percentValue;
          A && He(X) && (x = V === Ge.First ? [O, X[1]] : [X[0], O]),
            le == null || le(A ? x : O),
            (v.value = !1);
        }
      },
      N = (V) => {
        if (!($.value || S.value) && !V.target.closest(".var-slider__thumb")) {
          var A = V.clientX - ju(V.currentTarget),
            X = k(A);
          C(A, X), I(X);
        }
      },
      F = () => {
        var V = R(e.step);
        return isNaN(V)
          ? (console.warn(
              '[Varlet] Slider: type of prop "step" should be Number'
            ),
            !1)
          : V < 1 || V > 100
          ? (console.warn('[Varlet] Slider: "step" should be >= 0 and <= 100'),
            !1)
          : parseInt("" + e.step, 10) !== V
          ? (console.warn('[Varlet] Slider: "step" should be an Integer'), !1)
          : !0;
      },
      w = () => {
        var { range: V, modelValue: A } = e;
        return V && !He(A)
          ? (console.error('[Varlet] Slider: "modelValue" should be an Array'),
            !1)
          : !V && He(A)
          ? (console.error('[Varlet] Slider: "modelValue" should be a Number'),
            !1)
          : V && He(A) && A.length < 2
          ? (console.error(
              '[Varlet] Slider: "modelValue" should have two value'
            ),
            !1)
          : !0;
      },
      y = (V = e.modelValue, A = R(e.step)) => {
        e.range && He(V)
          ? ((f[Ge.First].percentValue = V[0] / A),
            (f[Ge.First].currentLeft = f[Ge.First].percentValue * p.value),
            (f[Ge.Second].percentValue = V[1] / A),
            (f[Ge.Second].currentLeft = f[Ge.Second].percentValue * p.value))
          : At(V) && (f[Ge.First].currentLeft = (V / A) * p.value);
      };
    me([() => e.modelValue, () => e.step], ([V, A]) => {
      !F() || !w() || v.value || y(V, R(A));
    }),
      me(c, () => y()),
      rt(() => {
        !F() || !w() || (c.value = d.value.offsetWidth);
      });
    var z = () => {
        var V,
          A = e.range ? [0, 0] : 0;
        (V = e["onUpdate:modelValue"]) == null || V.call(e, A), l();
      },
      te = { reset: z, validate: o, resetValidation: l };
    return (
      t == null || t(te),
      {
        Thumbs: Ge,
        sliderEl: d,
        getFillStyle: m,
        isDisabled: $,
        errorMessage: n,
        thumbsProps: f,
        thumbList: h,
        toNumber: R,
        showLabel: g,
        start: M,
        move: P,
        end: I,
        click: N,
      }
    );
  },
});
xn.install = function (e) {
  e.component(xn.name, xn);
};
function Sb(e) {
  var t = ["top", "center", "bottom"];
  return t.includes(e);
}
function Tb(e) {
  return Vo.includes(e);
}
var sv = {
    type: { type: String, validator: Tb },
    position: { type: String, default: "top", validator: Sb },
    content: { type: String },
    contentClass: { type: String },
    duration: { type: Number, default: 3e3 },
    vertical: { type: Boolean, default: !1 },
    loadingType: Dt(Da, "type"),
    loadingSize: Dt(Da, "size"),
    lockScroll: { type: Boolean, default: !1 },
    show: { type: Boolean, default: !1 },
    teleport: { type: String, default: "body" },
    forbidClick: { type: Boolean, default: !1 },
    onOpen: { type: Function, default: () => {} },
    onOpened: { type: Function, default: () => {} },
    onClose: { type: Function, default: () => {} },
    onClosed: { type: Function, default: () => {} },
    "onUpdate:show": { type: Function },
    _update: { type: String },
  },
  $b = {
    success: "checkbox-marked-circle",
    warning: "warning",
    info: "information",
    error: "error",
    loading: "",
  },
  Eb = { class: "var-snackbar__action" };
function Mb(e, t) {
  var r = fe("var-icon"),
    n = fe("var-loading");
  return Re(
    (T(),
    _(
      "div",
      {
        class: "var-snackbar",
        style: J({
          pointerEvents: e.isForbidClick ? "auto" : "none",
          zIndex: e.zIndex,
        }),
      },
      [
        B(
          "div",
          { class: Y(e.snackbarClass), style: J({ zIndex: e.zIndex }) },
          [
            B(
              "div",
              { class: Y(["var-snackbar__content", [e.contentClass]]) },
              [Z(e.$slots, "default", {}, () => [Oe(ie(e.content), 1)])],
              2
            ),
            B("div", Eb, [
              e.iconName
                ? (T(), Ie(r, { key: 0, name: e.iconName }, null, 8, ["name"]))
                : de("v-if", !0),
              e.type === "loading"
                ? (T(),
                  Ie(
                    n,
                    { key: 1, type: e.loadingType, size: e.loadingSize },
                    null,
                    8,
                    ["type", "size"]
                  ))
                : de("v-if", !0),
              Z(e.$slots, "action"),
            ]),
          ],
          6
        ),
      ],
      4
    )),
    [[Oa, e.show]]
  );
}
var uv = ve({
  render: Mb,
  name: "VarSnackbarCore",
  components: { VarLoading: Qt, VarIcon: We },
  props: sv,
  setup(e) {
    var t = D(null),
      { zIndex: r } = Wl(() => e.show, 1);
    Nu(e, "show", "lockScroll");
    var n = j(() => {
        var { position: o, vertical: s, type: u } = e,
          d =
            "var-snackbar__wrapper var-snackbar__wrapper-" +
            o +
            " var-elevation--4",
          c = s ? " var-snackbar__vertical" : "",
          v = u && Vo.includes(u) ? " var-snackbar__wrapper-" + u : "";
        return "" + d + c + v;
      }),
      a = j(() => e.type === "loading" || e.forbidClick),
      i = j(() => (e.type ? $b[e.type] : "")),
      l = () => {
        t.value = setTimeout(() => {
          var o;
          e.type !== "loading" &&
            ((o = e["onUpdate:show"]) == null || o.call(e, !1));
        }, e.duration);
      };
    return (
      me(
        () => e.show,
        (o) => {
          o
            ? (e.onOpen == null || e.onOpen(), l())
            : o === !1 &&
              (clearTimeout(t.value), e.onClose == null || e.onClose());
        }
      ),
      me(
        () => e._update,
        () => {
          clearTimeout(t.value), l();
        }
      ),
      rt(() => {
        e.show && (e.onOpen == null || e.onOpen(), l());
      }),
      { zIndex: r, snackbarClass: n, iconName: i, isForbidClick: a }
    );
  },
});
function Ib(e, t) {
  var r = fe("var-snackbar-core");
  return (
    T(),
    Ie(
      El,
      { to: e.teleport, disabled: e.disabled },
      [
        ee(
          at,
          {
            name: "var-snackbar-fade",
            onAfterEnter: e.onOpened,
            onAfterLeave: e.onClosed,
          },
          {
            default: Ee(() => [
              ee(
                r,
                Xe(e.$props, { class: "var-snackbar-transition" }),
                {
                  action: Ee(() => [Z(e.$slots, "action")]),
                  default: Ee(() => [
                    Z(e.$slots, "default", {}, () => [Oe(ie(e.content), 1)]),
                  ]),
                  _: 3,
                },
                16
              ),
            ]),
            _: 3,
          },
          8,
          ["onAfterEnter", "onAfterLeave"]
        ),
      ],
      8,
      ["to", "disabled"]
    )
  );
}
var ea = ve({
  render: Ib,
  name: "VarSnackbar",
  components: { VarSnackbarCore: uv },
  props: sv,
  setup() {
    var { disabled: e } = Gl();
    return { disabled: e };
  },
});
function Ha() {
  return (
    (Ha =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Ha.apply(this, arguments)
  );
}
function Pb(e) {
  return (
    typeof e == "function" ||
    (Object.prototype.toString.call(e) === "[object Object]" && !Lr(e))
  );
}
var Vo = ["loading", "success", "warning", "info", "error"],
  dv = 0,
  No = !1,
  Ao,
  ta = !1,
  Pt = qe([]),
  Ob = {
    type: void 0,
    content: "",
    position: "top",
    duration: 3e3,
    vertical: !1,
    contentClass: void 0,
    loadingType: "circle",
    loadingSize: "normal",
    lockScroll: !1,
    teleport: "body",
    forbidClick: !1,
    onOpen: () => {},
    onOpened: () => {},
    onClose: () => {},
    onClosed: () => {},
  },
  _b = { name: "var-snackbar-fade", tag: "div", class: "var-transition-group" },
  Vb = {
    setup() {
      return () => {
        var e = Pt.map(({ id: r, reactiveSnackOptions: n, _update: a }) => {
            var i = document.querySelector(".var-transition-group");
            n.forbidClick || n.type === "loading"
              ? i.classList.add("var-pointer-auto")
              : i.classList.remove("var-pointer-auto"),
              ta && (n.position = "top");
            var l = ta ? "relative" : "absolute",
              o = Ha({ position: l }, Fb(n.position));
            return ee(
              uv,
              Xe(n, {
                key: r,
                style: o,
                "data-id": r,
                _update: a,
                show: n.show,
                "onUpdate:show": (s) => (n.show = s),
              }),
              null
            );
          }),
          t = Mt.zIndex;
        return ee(
          Rf,
          Xe(_b, { style: { zIndex: t }, onAfterEnter: Nb, onAfterLeave: Ab }),
          Pb(e) ? e : { default: () => [e] }
        );
      };
    },
  },
  lr = function (e) {
    var t = Kl(e) ? e : { content: e },
      r = qe(Ha({}, Ob, t));
    (r.show = !0), No || ((No = !0), (Ao = Na(Vb).unmountInstance));
    var { length: n } = Pt,
      a = { id: dv++, reactiveSnackOptions: r };
    if (n === 0 || ta) Db(a);
    else {
      var i = "update-" + dv;
      Bb(r, i);
    }
    return {
      clear() {
        !ta && Pt.length
          ? (Pt[0].reactiveSnackOptions.show = !1)
          : (r.show = !1);
      },
    };
  };
Vo.forEach((e) => {
  lr[e] = (t) => (Kl(t) ? (t.type = e) : (t = { content: t, type: e }), lr(t));
});
lr.install = function (e) {
  e.component(ea.name, ea);
};
lr.allowMultiple = function (e = !1) {
  e !== ta &&
    (Pt.forEach((t) => {
      t.reactiveSnackOptions.show = !1;
    }),
    (ta = e));
};
lr.clear = function () {
  Pt.forEach((e) => {
    e.reactiveSnackOptions.show = !1;
  });
};
lr.Component = ea;
function Nb(e) {
  var t = e.getAttribute("data-id"),
    r = Pt.find((n) => n.id === R(t));
  r &&
    (r.reactiveSnackOptions.onOpened == null ||
      r.reactiveSnackOptions.onOpened());
}
function Ab(e) {
  e.parentElement && e.parentElement.classList.remove("var-pointer-auto");
  var t = e.getAttribute("data-id"),
    r = Pt.find((a) => a.id === R(t));
  r &&
    ((r.animationEnd = !0),
    r.reactiveSnackOptions.onClosed == null ||
      r.reactiveSnackOptions.onClosed());
  var n = Pt.every((a) => a.animationEnd);
  n && (Ao == null || Ao(), (Pt = qe([])), (No = !1));
}
function Db(e) {
  Pt.push(e);
}
function Bb(e, t) {
  var [r] = Pt;
  (r.reactiveSnackOptions = Ha({}, r.reactiveSnackOptions, e)), (r._update = t);
}
function Fb(e = "top") {
  return e === "bottom" ? { [e]: "5%" } : { top: e === "top" ? "5%" : "45%" };
}
ea.install = function (e) {
  e.component(ea.name, ea);
};
var vv = (e) => ["mini", "small", "normal", "large"].includes(e),
  Lb = (e) => vv(e) || He(e) || At(e) || Tt(e),
  zb = (e) =>
    ["start", "end", "center", "space-around", "space-between"].includes(e),
  Rb = {
    align: { type: String },
    size: { type: [String, Number, Array], default: "normal", validator: Lb },
    wrap: { type: Boolean, default: !0 },
    direction: { type: String, default: "row" },
    justify: { type: String, default: "start", validator: zb },
    inline: { type: Boolean, default: !1 },
  },
  Ub = { mini: [4, 4], small: [6, 6], normal: [8, 12], large: [12, 20] },
  ra = ve({
    name: "VarSpace",
    props: Rb,
    setup(e, { slots: t }) {
      var r = (n, a) => (a ? Ub[n] : He(n) ? n.map(Jt) : [Jt(n), Jt(n)]);
      return () => {
        var n,
          {
            inline: a,
            justify: i,
            align: l,
            wrap: o,
            direction: s,
            size: u,
          } = e,
          d = (n = t.default == null ? void 0 : t.default()) != null ? n : [],
          c = d.length - 1,
          v = vv(u),
          [f, p] = r(u, v),
          h = d.map((g, m) => {
            var $ = "0";
            return (
              s === "row" &&
                (i === "start" || i === "center" || i === "end"
                  ? m !== c
                    ? ($ = f / 2 + "px " + p + "px " + f / 2 + "px 0")
                    : ($ = f / 2 + "px 0")
                  : i === "space-around"
                  ? ($ = f / 2 + "px " + p / 2 + "px")
                  : i === "space-between" &&
                    (m === 0
                      ? ($ = f / 2 + "px " + p / 2 + "px " + f / 2 + "px 0")
                      : m === c
                      ? ($ = f / 2 + "px 0 " + f / 2 + "px " + p / 2 + "px")
                      : ($ = f / 2 + "px " + p / 2 + "px"))),
              s === "column" && m !== c && ($ = "0 0 " + f + "px 0"),
              ee("div", { style: { margin: $ } }, [g])
            );
          });
        return ee(
          "div",
          {
            class: ["var-space", "var--box", a ? "var-space--inline" : null],
            style: {
              flexDirection: s,
              justifyContent: i,
              alignItems: l,
              flexWrap: o ? "wrap" : "nowrap",
              margin: s === "row" ? "-" + f / 2 + "px 0" : void 0,
            },
          },
          [h]
        );
      };
    },
  });
ra.install = function (e) {
  e.component(ra.name, ra);
};
var Yb = {
    activeIcon: { type: String, default: "check" },
    currentIcon: { type: String },
    inactiveIcon: { type: String },
  },
  cv = Symbol("STEPS_BIND_STEP_KEY"),
  fv = Symbol("STEPS_COUNT_STEP_KEY");
function Hb() {
  var { bindChildren: e, childProviders: t } = Bt(cv),
    { length: r } = Gt(fv);
  return { length: r, step: t, bindStep: e };
}
function Wb() {
  var { parentProvider: e, bindParent: t } = Ft(cv),
    { index: r } = Zt(fv);
  if (!e || !t || !r) throw Error("[Varlet] Steps: <step/> must in <steps>");
  return { index: r, steps: e, bindSteps: t };
}
var jb = { class: "var-step" },
  Kb = { key: 3 };
function qb(e, t) {
  var r = fe("var-icon");
  return (
    T(),
    _("div", jb, [
      B(
        "div",
        { class: Y("var-step-" + e.direction) },
        [
          B(
            "div",
            { class: Y("var-step-" + e.direction + "__main"), ref: e.getRef },
            [
              B(
                "div",
                {
                  class: Y({
                    ["var-step-" + e.direction + "__tag"]: !0,
                    ["var-step-" + e.direction + "__tag--active"]:
                      e.isActive || e.isCurrent,
                  }),
                  style: J({
                    backgroundColor:
                      e.isActive || e.isCurrent
                        ? e.activeColor
                        : e.inactiveColor,
                  }),
                  onClick: t[0] || (t[0] = (...n) => e.click && e.click(...n)),
                },
                [
                  e.isActive
                    ? (T(),
                      Ie(
                        r,
                        {
                          key: 0,
                          class: "var-step__icon",
                          "var-step-cover": "",
                          name: e.activeIcon,
                        },
                        null,
                        8,
                        ["name"]
                      ))
                    : e.isCurrent && e.currentIcon
                    ? (T(),
                      Ie(
                        r,
                        {
                          key: 1,
                          class: "var-step__icon",
                          "var-step-cover": "",
                          name: e.currentIcon,
                        },
                        null,
                        8,
                        ["name"]
                      ))
                    : e.inactiveIcon
                    ? (T(),
                      Ie(
                        r,
                        {
                          key: 2,
                          class: "var-step__icon",
                          "var-step-cover": "",
                          name: e.inactiveIcon,
                        },
                        null,
                        8,
                        ["name"]
                      ))
                    : (T(), _("span", Kb, ie(e.index + 1), 1)),
                ],
                6
              ),
              B(
                "div",
                {
                  class: Y({
                    ["var-step-" + e.direction + "__content"]: !0,
                    ["var-step-" + e.direction + "__content--active"]:
                      e.isActive || e.isCurrent,
                  }),
                  onClick: t[1] || (t[1] = (...n) => e.click && e.click(...n)),
                },
                [Z(e.$slots, "default")],
                2
              ),
            ],
            2
          ),
          e.isLastChild
            ? de("v-if", !0)
            : (T(),
              _(
                "div",
                {
                  key: 0,
                  class: Y("var-step-" + e.direction + "__line"),
                  style: J({ margin: e.lineMargin }),
                },
                null,
                6
              )),
        ],
        2
      ),
    ])
  );
}
var na = ve({
  render: qb,
  name: "VarStep",
  components: { VarIcon: We },
  props: Yb,
  setup() {
    var e = D(null),
      t = D(""),
      r = D(!1),
      { index: n, steps: a, bindSteps: i } = Wb(),
      {
        active: l,
        length: o,
        activeColor: s,
        inactiveColor: u,
        direction: d,
        clickStep: c,
      } = a,
      v = j(() => l.value === n.value),
      f = j(() => n.value !== -1 && l.value > n.value),
      p = { index: n },
      h = () => c(n.value),
      g = (m) => {
        d.value === "horizontal" && (e.value = m);
      };
    return (
      i(p),
      me(o, (m) => {
        if (((r.value = m - 1 === n.value), e.value)) {
          var $ = e.value.offsetWidth / 2 - 14;
          t.value = "0 -" + $ + "px";
        }
      }),
      {
        main: e,
        index: n,
        isActive: f,
        isCurrent: v,
        direction: d,
        lineMargin: t,
        activeColor: s,
        inactiveColor: u,
        isLastChild: r,
        click: h,
        getRef: g,
      }
    );
  },
});
na.install = function (e) {
  e.component(na.name, na);
};
function Xb(e) {
  return ["horizontal", "vertical"].includes(e);
}
var Gb = {
  active: { type: [String, Number], default: 0 },
  direction: { type: String, default: "horizontal", validator: Xb },
  activeColor: { type: String },
  inactiveColor: { type: String },
  onClickStep: { type: Function },
};
function Zb(e, t) {
  return (
    T(),
    _(
      "div",
      {
        class: "var-steps",
        style: J({
          flexDirection: e.direction === "horizontal" ? "row" : "column",
        }),
      },
      [Z(e.$slots, "default")],
      4
    )
  );
}
var aa = ve({
  render: Zb,
  name: "VarSteps",
  props: Gb,
  setup(e) {
    var t = j(() => e.active),
      r = j(() => e.activeColor),
      n = j(() => e.inactiveColor),
      a = j(() => e.direction),
      { length: i, bindStep: l } = Hb(),
      o = (u) => {
        e.onClickStep == null || e.onClickStep(u);
      },
      s = {
        active: t,
        length: i,
        direction: a,
        activeColor: r,
        inactiveColor: n,
        clickStep: o,
      };
    l(s);
  },
});
aa.install = function (e) {
  e.component(aa.name, aa);
};
var ia = ve({
    name: "VarStyleProvider",
    props: { styleVars: { type: Object, default: () => ({}) } },
    setup(e, { slots: t }) {
      return () =>
        Ll(
          "div",
          { class: "var-style-provider", style: Ju(e.styleVars) },
          t.default == null ? void 0 : t.default()
        );
    },
  }),
  Do = [];
function Wa(e = {}) {
  Do.forEach((r) => document.documentElement.style.removeProperty(r)),
    (Do.length = 0);
  var t = Ju(e);
  Object.entries(t).forEach(([r, n]) => {
    document.documentElement.style.setProperty(r, n), Do.push(r);
  });
}
Wa.Component = ia;
ia.install = function (e) {
  e.component(ia.name, ia);
};
Wa.install = function (e) {
  e.component(ia.name, ia);
};
var Jb = {
    modelValue: { default: !1 },
    activeValue: { default: !0 },
    inactiveValue: { default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    color: { type: String },
    loadingColor: { type: String },
    closeColor: { type: String },
    size: { type: [String, Number], default: 20 },
    rules: { type: Array },
    ripple: { type: Boolean, default: !0 },
    onClick: { type: Function },
    onChange: { type: Function },
    "onUpdate:modelValue": { type: Function },
  },
  Qb = { class: "var-switch" };
function xb(e, t) {
  var r = fe("var-loading"),
    n = fe("var-form-details"),
    a = ht("ripple");
  return (
    T(),
    _("div", Qb, [
      B(
        "div",
        {
          class: Y([
            "var-switch-block",
            [e.disabled || e.formDisabled ? "var-switch__disable" : null],
          ]),
          onClick:
            t[0] || (t[0] = (...i) => e.switchActive && e.switchActive(...i)),
          style: J(e.styleComputed.switch),
        },
        [
          B(
            "div",
            {
              style: J(e.styleComputed.track),
              class: Y([
                "var-switch__track",
                [
                  e.modelValue === e.activeValue
                    ? "var-switch__track-active"
                    : null,
                  e.errorMessage ? "var-switch__track-error" : null,
                ],
              ]),
            },
            null,
            6
          ),
          Re(
            B(
              "div",
              { class: "var-switch__ripple", style: J(e.styleComputed.ripple) },
              [
                B(
                  "div",
                  {
                    style: J(e.styleComputed.handle),
                    class: Y([
                      "var-switch__handle var-elevation--2",
                      [
                        e.modelValue === e.activeValue
                          ? "var-switch__handle-active"
                          : null,
                        e.errorMessage ? "var-switch__handle-error" : null,
                      ],
                    ]),
                  },
                  [
                    e.loading
                      ? (T(),
                        Ie(
                          r,
                          { key: 0, radius: e.toNumber(e.size) / 2 - 2 },
                          null,
                          8,
                          ["radius"]
                        ))
                      : de("v-if", !0),
                  ],
                  6
                ),
              ],
              4
            ),
            [
              [
                a,
                {
                  disabled:
                    !e.ripple || e.disabled || e.loading || e.formDisabled,
                },
              ],
            ]
          ),
        ],
        6
      ),
      ee(n, { "error-message": e.errorMessage }, null, 8, ["error-message"]),
    ])
  );
}
var la = ve({
  render: xb,
  name: "VarSwitch",
  components: { VarLoading: Qt, VarFormDetails: ut },
  directives: { Ripple: lt },
  props: Jb,
  setup(e) {
    var { bindForm: t, form: r } = Rt(),
      {
        errorMessage: n,
        validateWithTrigger: a,
        validate: i,
        resetValidation: l,
      } = Lt(),
      o = () => i(e.rules, e.modelValue),
      s = () => Ye(() => a(["onChange"], "onChange", e.rules, e.modelValue)),
      u = j(() => {
        var {
            size: f,
            modelValue: p,
            color: h,
            closeColor: g,
            loadingColor: m,
            activeValue: $,
          } = e,
          S = R(f),
          C = S * 2,
          k = S * 1.2;
        return {
          handle: {
            width: f + "px",
            height: f + "px",
            backgroundColor: p === $ ? h || "" : g || "",
            color: m && m,
          },
          ripple: {
            left: p === $ ? S / 2 + "px" : "-" + S / 2 + "px",
            color: p === $ ? h || "" : g || "#999",
            width: S * 2 + "px",
            height: S * 2 + "px",
          },
          track: {
            height: k * 0.6 + "px",
            width: C - 2 + "px",
            borderRadius: C / 3 + "px",
            filter:
              p === $ || (n != null && n.value)
                ? "opacity(.6)"
                : "brightness(.6)",
            backgroundColor: p === $ ? h || "" : g || "",
          },
          switch: { height: k + "px", width: C + "px" },
        };
      }),
      d = () => {
        var {
          onClick: f,
          onChange: p,
          disabled: h,
          loading: g,
          readonly: m,
          modelValue: $,
          activeValue: S,
          inactiveValue: C,
          "onUpdate:modelValue": k,
        } = e;
        if (
          (f == null || f(),
          !(
            h ||
            g ||
            m ||
            (r != null && r.disabled.value) ||
            (r != null && r.readonly.value)
          ))
        ) {
          var M = $ === S ? C : S;
          p == null || p(M), k == null || k(M), s();
        }
      },
      c = () => {
        var f;
        (f = e["onUpdate:modelValue"]) == null || f.call(e, e.inactiveValue),
          l();
      },
      v = { reset: c, validate: o, resetValidation: l };
    return (
      t == null || t(v),
      {
        switchActive: d,
        toNumber: R,
        styleComputed: u,
        errorMessage: n,
        formDisabled: r == null ? void 0 : r.disabled,
        formReadonly: r == null ? void 0 : r.readonly,
      }
    );
  },
});
la.install = function (e) {
  e.component(la.name, la);
};
var e1 = {
    name: { type: [String, Number] },
    disabled: { type: Boolean, default: !1 },
    onClick: { type: Function },
  },
  hv = Symbol("TABS_BIND_TAB_KEY"),
  pv = Symbol("TABS_COUNT_TAB_KEY");
function t1() {
  var { childProviders: e, bindChildren: t } = Bt(hv),
    { length: r } = Gt(pv);
  return { length: r, tabList: e, bindTabList: t };
}
function r1() {
  var { parentProvider: e, bindParent: t } = Ft(hv),
    { index: r } = Zt(pv);
  if (!e || !t || !r) throw Error("<var-tab/> must in <var-tabs/>");
  return { index: r, tabs: e, bindTabs: t };
}
function n1(e, t) {
  var r = ht("ripple");
  return Re(
    (T(),
    _(
      "div",
      {
        class: Y([
          "var-tab var--box",
          [e.computeColorClass(), "var-tab--" + e.itemDirection],
        ]),
        ref: "tabEl",
        style: J({ color: e.computeColorStyle() }),
        onClick:
          t[0] || (t[0] = (...n) => e.handleClick && e.handleClick(...n)),
      },
      [Z(e.$slots, "default")],
      6
    )),
    [[r, { disabled: e.disabled }]]
  );
}
var oa = ve({
  render: n1,
  name: "VarTab",
  directives: { Ripple: lt },
  props: e1,
  setup(e) {
    var t = D(null),
      r = j(() => e.name),
      n = j(() => e.disabled),
      a = j(() => t.value),
      { index: i, tabs: l, bindTabs: o } = r1(),
      {
        onTabClick: s,
        active: u,
        activeColor: d,
        inactiveColor: c,
        disabledColor: v,
        itemDirection: f,
        resize: p,
      } = l,
      h = { name: r, index: i, disabled: n, element: a };
    o(h);
    var g = () => {
        var { disabled: S, name: C } = e;
        return S
          ? v.value
          : u.value === C || u.value === (i == null ? void 0 : i.value)
          ? d.value
          : c.value;
      },
      m = () => {
        var { disabled: S, name: C } = e;
        return S
          ? "var-tab--disabled"
          : u.value === C || u.value === (i == null ? void 0 : i.value)
          ? "var-tab--active"
          : "var-tab--inactive";
      },
      $ = (S) => {
        var { disabled: C, name: k, onClick: M } = e;
        C || (M == null || M(k != null ? k : i.value, S), s(h));
      };
    return (
      me(() => e.name, p),
      me(() => e.disabled, p),
      {
        tabEl: t,
        active: u,
        activeColor: d,
        inactiveColor: c,
        itemDirection: f,
        computeColorStyle: g,
        computeColorClass: m,
        handleClick: $,
      }
    );
  },
});
oa.install = function (e) {
  e.component(oa.name, oa);
};
var mv = Symbol("TABS_ITEMS_BIND_TAB_ITEM_KEY"),
  gv = Symbol("TABS_ITEMS_COUNT_TAB_ITEM_KEY");
function a1() {
  var { bindChildren: e, childProviders: t } = Bt(mv),
    { length: r } = Gt(gv);
  return { length: r, tabItemList: t, bindTabItem: e };
}
function i1() {
  var { parentProvider: e, bindParent: t } = Ft(mv),
    { index: r } = Zt(gv);
  if (!e || !t || !r) throw Error("<var-tab-item/> must in <var-tabs-items/>");
  return { index: r, tabsItems: e, bindTabsItems: t };
}
var l1 = { name: { type: [String, Number] } };
function o1(e, t) {
  var r = fe("var-swipe-item");
  return (
    T(),
    Ie(
      r,
      {
        class: Y(["var-tab-item", [!e.current && "var-tab-item--inactive"]]),
        "var-tab-item-cover": "",
      },
      {
        default: Ee(() => [
          e.initSlot ? Z(e.$slots, "default", { key: 0 }) : de("v-if", !0),
        ]),
        _: 3,
      },
      8,
      ["class"]
    )
  );
}
var sa = ve({
  render: o1,
  name: "VarTabItem",
  components: { VarSwipeItem: Tr },
  props: l1,
  setup(e) {
    var t = D(!1),
      r = D(!1),
      n = j(() => e.name),
      { index: a, bindTabsItems: i } = i1(),
      l = (s) => {
        !r.value && s && (r.value = !0), (t.value = s);
      },
      o = { index: a, name: n, setCurrent: l };
    return i(o), { current: t, initSlot: r };
  },
});
sa.install = function (e) {
  e.component(sa.name, sa);
};
var s1 = { class: "var-table var-elevation--1 var--box" },
  u1 = { class: "var-table__main" },
  d1 = { key: 0, class: "var-table__footer" };
function v1(e, t) {
  return (
    T(),
    _("div", s1, [
      B("div", u1, [
        B(
          "table",
          {
            class: "var-table__table",
            style: J({ width: e.toSizeUnit(e.fullWidth) }),
          },
          [Z(e.$slots, "default")],
          4
        ),
      ]),
      e.$slots.footer
        ? (T(), _("div", d1, [Z(e.$slots, "footer")]))
        : de("v-if", !0),
    ])
  );
}
var ua = ve({
  render: v1,
  name: "VarTable",
  props: { fullWidth: { type: [Number, String], default: "100%" } },
  setup() {
    return { toSizeUnit: ot };
  },
});
ua.install = function (e) {
  e.component(ua.name, ua);
};
function yv(e) {
  return ["horizontal", "vertical"].includes(e);
}
var c1 = {
  active: { type: [String, Number], default: 0 },
  layoutDirection: { type: String, default: "horizontal", validator: yv },
  itemDirection: { type: String, default: "horizontal", validator: yv },
  fixedBottom: { type: Boolean, default: !1 },
  activeColor: { type: String },
  inactiveColor: { type: String },
  disabledColor: { type: String },
  color: { type: String },
  indicatorColor: { type: String },
  indicatorSize: { type: [String, Number] },
  elevation: { type: Boolean, default: !1 },
  sticky: { type: Boolean, default: !1 },
  offsetTop: Dt(Gd, "offsetTop"),
  onClick: { type: Function },
  onChange: { type: Function },
  "onUpdate:active": { type: Function },
};
function f1(e, t) {
  return (
    T(),
    Ie(
      hi(e.sticky ? "var-sticky" : e.Transition),
      { "offset-top": e.sticky ? e.offsetTop : null },
      {
        default: Ee(() => [
          B(
            "div",
            Xe(
              {
                class: [
                  "var-tabs var--box",
                  [
                    "var-tabs--item-" + e.itemDirection,
                    "var-tabs--layout-" + e.layoutDirection + "-padding",
                    e.elevation ? "var-elevation--4" : null,
                    e.fixedBottom ? "var-tabs--fixed-bottom" : null,
                  ],
                ],
                style: { background: e.color },
              },
              e.$attrs
            ),
            [
              B(
                "div",
                {
                  class: Y([
                    "var-tabs__tab-wrap",
                    [
                      e.scrollable
                        ? "var-tabs--layout-" +
                          e.layoutDirection +
                          "-scrollable"
                        : null,
                      "var-tabs--layout-" + e.layoutDirection,
                    ],
                  ]),
                  ref: "scrollerEl",
                },
                [
                  Z(e.$slots, "default"),
                  B(
                    "div",
                    {
                      class: Y([
                        "var-tabs__indicator",
                        [
                          "var-tabs--layout-" +
                            e.layoutDirection +
                            "-indicator",
                        ],
                      ]),
                      style: J({
                        width:
                          e.layoutDirection === "horizontal"
                            ? e.indicatorWidth
                            : e.toSizeUnit(e.indicatorSize),
                        height:
                          e.layoutDirection === "horizontal"
                            ? e.toSizeUnit(e.indicatorSize)
                            : e.indicatorHeight,
                        transform:
                          e.layoutDirection === "horizontal"
                            ? "translateX(" + e.indicatorX + ")"
                            : "translateY(" + e.indicatorY + ")",
                        background: e.indicatorColor || e.activeColor,
                      }),
                    },
                    null,
                    6
                  ),
                ],
                2
              ),
            ],
            16
          ),
        ]),
        _: 3,
      },
      8,
      ["offset-top"]
    )
  );
}
var da = ve({
  render: f1,
  name: "VarTabs",
  components: { VarSticky: Mr },
  inheritAttrs: !1,
  props: c1,
  setup(e) {
    var t = D("0px"),
      r = D("0px"),
      n = D("0px"),
      a = D("0px"),
      i = D(!1),
      l = D(null),
      o = j(() => e.active),
      s = j(() => e.activeColor),
      u = j(() => e.inactiveColor),
      d = j(() => e.disabledColor),
      c = j(() => e.itemDirection),
      { tabList: v, bindTabList: f, length: p } = t1(),
      h = (I) => {
        var N,
          F,
          w = (N = I.name.value) != null ? N : I.index.value,
          { active: y, onChange: z, onClick: te } = e;
        (F = e["onUpdate:active"]) == null || F.call(e, w),
          te == null || te(w),
          w !== y && (z == null || z(w));
      },
      g = () => v.find(({ name: I }) => e.active === I.value),
      m = () => v.find(({ index: I }) => e.active === I.value),
      $ = () => {
        var I, N;
        if (p.value !== 0) {
          var { active: F } = e;
          return (
            At(F) &&
              (F > p.value - 1
                ? (I = e["onUpdate:active"]) == null || I.call(e, p.value - 1)
                : (N = e["onUpdate:active"]) == null || N.call(e, 0)),
            m()
          );
        }
      },
      S = () => {
        i.value = v.length >= 5;
      },
      C = ({ element: I }) => {
        var N = I.value;
        e.layoutDirection === "horizontal"
          ? ((t.value = (N == null ? void 0 : N.offsetWidth) + "px"),
            (n.value = (N == null ? void 0 : N.offsetLeft) + "px"))
          : ((r.value = (N == null ? void 0 : N.offsetHeight) + "px"),
            (a.value = (N == null ? void 0 : N.offsetTop) + "px"));
      },
      k = ({ element: I }) => {
        if (!!i.value) {
          var N = l.value,
            F = I.value;
          if (e.layoutDirection === "horizontal") {
            var w = F.offsetLeft + F.offsetWidth / 2 - N.offsetWidth / 2;
            Pi(N, { left: w, animation: Bu });
          } else {
            var y = F.offsetTop + F.offsetHeight / 2 - N.offsetHeight / 2;
            Pi(N, { top: y, animation: Bu });
          }
        }
      },
      M = () => {
        var I = g() || m() || $();
        !I || I.disabled.value || (S(), C(I), k(I));
      },
      P = {
        active: o,
        activeColor: s,
        inactiveColor: u,
        disabledColor: d,
        itemDirection: c,
        resize: M,
        onTabClick: h,
      };
    return (
      f(P),
      me(
        () => p.value,
        () => Ye().then(M)
      ),
      me(() => e.active, M),
      rt(() => window.addEventListener("resize", M)),
      Kt(() => window.removeEventListener("resize", M)),
      {
        indicatorWidth: t,
        indicatorHeight: r,
        indicatorX: n,
        indicatorY: a,
        scrollable: i,
        scrollerEl: l,
        Transition: at,
        toSizeUnit: ot,
        resize: M,
      }
    );
  },
});
da.install = function (e) {
  e.component(da.name, da);
};
var h1 = {
  active: { type: [String, Number], default: 0 },
  canSwipe: { type: Boolean, default: !0 },
  loop: { type: Boolean, default: !1 },
  "onUpdate:active": { type: Function },
};
function p1(e, t) {
  var r = fe("var-swipe");
  return (
    T(),
    Ie(
      r,
      {
        class: "var-tabs-items",
        ref: "swipe",
        loop: e.loop,
        touchable: e.canSwipe,
        indicator: !1,
        onChange: e.handleSwipeChange,
      },
      { default: Ee(() => [Z(e.$slots, "default")]), _: 3 },
      8,
      ["loop", "touchable", "onChange"]
    )
  );
}
var va = ve({
  render: p1,
  name: "VarTabsItems",
  components: { VarSwipe: Sr },
  props: h1,
  setup(e) {
    var t = D(null),
      { tabItemList: r, bindTabItem: n, length: a } = a1(),
      i = (c) => r.find(({ name: v }) => c === v.value),
      l = (c) => r.find(({ index: v }) => c === v.value),
      o = (c) => i(c) || l(c),
      s = (c) => {
        var v,
          f = o(c);
        !f ||
          (r.forEach(({ setCurrent: p }) => p(!1)),
          f.setCurrent(!0),
          (v = t.value) == null || v.to(f.index.value));
      },
      u = (c) => {
        var v,
          f,
          p = r.find(({ index: g }) => g.value === c),
          h = (v = p.name.value) != null ? v : p.index.value;
        (f = e["onUpdate:active"]) == null || f.call(e, h);
      },
      d = {};
    return (
      n(d),
      me(() => e.active, s),
      me(
        () => a.value,
        () => s(e.active)
      ),
      { swipe: t, handleSwipeChange: u }
    );
  },
});
va.install = function (e) {
  e.component(va.name, va);
};
var Ot = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
  pt = ["00", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
  bv = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
function m1(e) {
  return ["ampm", "24hr"].includes(e);
}
var g1 = {
    modelValue: { type: String },
    shadow: { type: Boolean, default: !1 },
    color: { type: String },
    headerColor: { type: String },
    format: { type: String, default: "ampm", validator: m1 },
    allowedTime: { type: Object },
    min: { type: String },
    max: { type: String },
    useSeconds: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    "onUpdate:modelValue": { type: Function },
    onChange: { type: Function },
  },
  Cv = (e, t) => e === "24hr" || t === "am",
  Bo = (e, t, r) => {
    var n = Ot.findIndex((i) => R(i) === R(r)),
      a = Cv(e, t) ? r : pt[n];
    return { hourStr: a, hourNum: R(a) };
  },
  bt = (e) => {
    var [t, r, n] = e.split(":");
    return { hour: R(t), minute: R(r), second: R(n) };
  },
  wv = (e) => {
    var t,
      r,
      {
        time: n,
        format: a,
        ampm: i,
        hour: l,
        max: o,
        min: s,
        disableHour: u,
      } = e,
      { hourStr: d, hourNum: c } = Bo(a, i, l),
      v = !1,
      f = !1;
    if (u.includes(d)) return !0;
    if (o && !s) {
      var { hour: p, minute: h } = bt(o);
      v = p === c && n > h;
    }
    if (!o && s) {
      var { hour: g, minute: m } = bt(s);
      v = g === c && n < m;
    }
    if (o && s) {
      var { hour: $, minute: S } = bt(o),
        { hour: C, minute: k } = bt(s);
      v = (C === c && n < k) || ($ === c && n > S);
    }
    return (
      (t = e.allowedTime) != null &&
        t.minutes &&
        (f = (r = e.allowedTime) == null ? void 0 : r.minutes(n)),
      v || f
    );
  },
  kv = (e) => {
    var t,
      r,
      {
        time: n,
        format: a,
        ampm: i,
        hour: l,
        minute: o,
        max: s,
        min: u,
        disableHour: d,
      } = e,
      { hourStr: c, hourNum: v } = Bo(a, i, l),
      f = !1,
      p = !1;
    if (d.includes(c)) return !0;
    if (s && !u) {
      var { hour: h, minute: g, second: m } = bt(s);
      f = (h === v && g < o) || (g === o && n > m);
    }
    if (!s && u) {
      var { hour: $, minute: S, second: C } = bt(u);
      f = ($ === v && S > o) || (S === o && n > C);
    }
    if (s && u) {
      var { hour: k, minute: M, second: P } = bt(s),
        { hour: I, minute: N, second: F } = bt(u);
      f =
        (k === v && M < o) ||
        (I === v && N > o) ||
        (k === v && M === o && n > P) ||
        (I === v && N === o && n < F);
    }
    return (
      (t = e.allowedTime) != null &&
        t.seconds &&
        (p = (r = e.allowedTime) == null ? void 0 : r.seconds(n)),
      f || p
    );
  },
  y1 = { class: "var-time-picker-clock" },
  b1 = { key: 0, class: "var-time-picker-clock__inner", ref: "inner" };
function C1(e, t) {
  return (
    T(),
    _("div", y1, [
      B(
        "div",
        { class: "var-time-picker-clock__hand", style: J(e.handStyle) },
        null,
        4
      ),
      (T(!0),
      _(
        Pe,
        null,
        Ze(
          e.timeScales,
          (r, n) => (
            T(),
            _(
              "div",
              {
                class: Y([
                  "var-time-picker-clock__item",
                  [
                    e.isActive(n, !1)
                      ? "var-time-picker-clock__item--active"
                      : null,
                    e.isDisable(r)
                      ? "var-time-picker-clock__item--disable"
                      : null,
                  ],
                ]),
                key: r,
                style: J(e.getStyle(n, r, !1)),
              },
              ie(r),
              7
            )
          )
        ),
        128
      )),
      e.format === "24hr" && e.type === "hour"
        ? (T(),
          _(
            "div",
            b1,
            [
              (T(!0),
              _(
                Pe,
                null,
                Ze(
                  e.hours24,
                  (r, n) => (
                    T(),
                    _(
                      "div",
                      {
                        class: Y([
                          "var-time-picker-clock__item",
                          [
                            e.isActive(n, !0)
                              ? "var-time-picker-clock__item--active"
                              : null,
                            e.isDisable(r)
                              ? "var-time-picker-clock__item--disable"
                              : null,
                          ],
                        ]),
                        key: r,
                        style: J(e.getStyle(n, r, !0)),
                      },
                      ie(r),
                      7
                    )
                  )
                ),
                128
              )),
            ],
            512
          ))
        : de("v-if", !0),
    ])
  );
}
var w1 = ve({
    render: C1,
    name: "Clock",
    props: {
      isInner: { type: Boolean, required: !0 },
      rad: { type: Number },
      format: { type: String, default: "ampm" },
      allowedTime: { type: Object },
      time: { type: Object, required: !0 },
      useSeconds: { type: Boolean, default: !1 },
      preventNextUpdate: { type: Boolean, default: !1 },
      type: { type: String, default: "hour" },
      ampm: { type: String, default: "am" },
      color: { type: String },
      min: { type: String },
      max: { type: String },
    },
    emits: ["update", "change-prevent-update"],
    setup(e, { emit: t }) {
      var r = D(null),
        n = D([]),
        a = D([]),
        i = j(() => ({
          transform: "rotate(" + R(e.rad) + "deg)",
          height:
            e.isInner && e.type === "hour"
              ? "calc(50% - 40px)"
              : "calc(50% - 4px)",
          backgroundColor: u(),
          borderColor: u(),
        })),
        l = j(() => {
          if (e.rad !== void 0) {
            var h = e.rad / 30;
            return h >= 0 ? h : h + 12;
          }
        }),
        o = j(() => (e.type === "hour" ? Ot : bv)),
        s = (h, g) => {
          var m;
          h =
            (m = h) != null
              ? m
              : e.type === "minute"
              ? e.time.minute
              : e.time.second;
          var $ = e.type === "minute" ? wv : kv,
            S = {
              time: R(h),
              format: e.format,
              ampm: e.ampm,
              hour: e.time.hour,
              minute: R(e.time.minute),
              max: e.max,
              min: e.min,
              allowedTime: e.allowedTime,
              disableHour: n.value,
            };
          return (
            g && e.type === "minute" && Reflect.deleteProperty(S, "minute"),
            $(S)
          );
        },
        u = () => {
          if (l.value === void 0) return e.color;
          var h = e.isInner ? pt[l.value] : o.value[l.value];
          return o.value === bv
            ? s()
              ? "#bdbdbd"
              : e.color
            : c(h)
            ? "#bdbdbd"
            : e.color;
        },
        d = (h, g) =>
          g
            ? l.value === h && e.isInner
            : l.value === h && (!e.isInner || e.type !== "hour"),
        c = (h) => {
          if (e.type === "hour") {
            if (Cv(e.format, e.ampm)) return n.value.includes(h);
            var g = Ot.findIndex((m) => m === h);
            return a.value.includes(g);
          }
          return s(h, !0);
        },
        v = (h, g, m) => {
          var $ = ((2 * Math.PI) / 12) * h - Math.PI / 2,
            S = 50 * (1 + Math.cos($)),
            C = 50 * (1 + Math.sin($)),
            k = () =>
              d(h, m)
                ? c(g)
                  ? { backgroundColor: "#bdbdbd", color: "#fff" }
                  : { backgroundColor: e.color, color: void 0 }
                : { backgroundColor: void 0, color: void 0 },
            { backgroundColor: M, color: P } = k();
          return { left: S + "%", top: C + "%", backgroundColor: M, color: P };
        },
        f = () => {
          var { width: h, height: g } = r.value.getBoundingClientRect();
          return { width: h, height: g };
        },
        p = () => {
          if (l.value !== void 0) {
            var h = e.ampm === "am" ? Ot : pt;
            return h[l.value].padStart(2, "0");
          }
        };
      return (
        me([l, () => e.isInner], ([h, g], [m, $]) => {
          var S = h === m && g === $;
          if (!(S || e.type !== "hour" || l.value === void 0)) {
            var C = g ? pt[l.value] : p(),
              k = e.useSeconds ? ":" + e.time.second : "",
              M = C + ":" + e.time.minute + k;
            e.preventNextUpdate || t("update", M), t("change-prevent-update");
          }
        }),
        me(
          () => e.rad,
          (h, g) => {
            if (!(e.type === "hour" || h === void 0 || g === void 0)) {
              var m = h / 6 >= 0 ? h / 6 : h / 6 + 60,
                $ = g / 6 >= 0 ? g / 6 : g / 6 + 60;
              if (m !== $) {
                var S,
                  { hourStr: C } = Bo(e.format, e.ampm, e.time.hour);
                if (e.type === "minute") {
                  var k = se().minute(m).format("mm"),
                    M = e.useSeconds ? ":" + e.time.second : "";
                  S = C + ":" + k + M;
                }
                if (e.type === "second") {
                  var P = se().second(m).format("ss"),
                    I = e.useSeconds ? ":" + P : "";
                  S = C + ":" + e.time.minute + I;
                }
                t("update", S);
              }
            }
          }
        ),
        me(
          [() => e.max, () => e.min, () => e.allowedTime],
          ([h, g, m]) => {
            if (((n.value = []), h && !g)) {
              var { hour: $ } = bt(h),
                S = Ot.filter((V) => R(V) > $),
                C = pt.filter((V) => R(V) > $);
              n.value = [...S, ...C];
            }
            if (!h && g) {
              var { hour: k } = bt(g),
                M = Ot.filter((V) => R(V) < k),
                P = pt.filter((V) => R(V) < k);
              n.value = [...M, ...P];
            }
            if (h && g) {
              var { hour: I } = bt(h),
                { hour: N } = bt(g),
                F = Ot.filter((V) => R(V) < N || R(V) > I),
                w = pt.filter((V) => R(V) < N || R(V) > I);
              n.value = [...F, ...w];
            }
            if (m != null && m.hours) {
              var { hours: y } = m,
                z = Ot.filter((V) => !y(R(V))),
                te = pt.filter((V) => !y(R(V)));
              n.value = [...new Set([...n.value, ...z, ...te])];
            }
            a.value = n.value
              .map((V) => pt.findIndex((A) => V === A))
              .filter((V) => V >= 0);
          },
          { immediate: !0 }
        ),
        {
          hours24: pt,
          timeScales: o,
          inner: r,
          handStyle: i,
          disableHour: n,
          isActive: d,
          isDisable: c,
          getSize: f,
          getStyle: v,
          activeItemIndex: l,
        }
      );
    },
  }),
  k1 = (e) => (vl(""), (e = e()), cl(), e),
  S1 = { class: "var-time-picker-title__time" },
  T1 = k1(() => B("span", null, ":", -1)),
  $1 = { key: 0 },
  E1 = { key: 0, class: "var-time-picker-title__ampm" },
  M1 = { class: "var-time-picker-body" };
function I1(e, t) {
  var r = fe("clock");
  return (
    T(),
    _(
      "div",
      {
        class: Y(["var-time-picker", [e.shadow ? "var-elevation--2" : null]]),
        ref: "picker",
      },
      [
        B(
          "div",
          {
            class: "var-time-picker-title",
            style: J({ background: e.headerColor || e.color }),
          },
          [
            B("div", S1, [
              B(
                "div",
                {
                  class: Y([
                    "var-time-picker-title__btn",
                    e.type === "hour"
                      ? "var-time-picker-title__btn--active"
                      : null,
                  ]),
                  onClick: t[0] || (t[0] = (n) => e.checkPanel("hour")),
                },
                ie(e.time.hour),
                3
              ),
              T1,
              B(
                "div",
                {
                  class: Y([
                    "var-time-picker-title__btn",
                    e.type === "minute"
                      ? "var-time-picker-title__btn--active"
                      : null,
                  ]),
                  onClick: t[1] || (t[1] = (n) => e.checkPanel("minute")),
                },
                ie(e.time.minute),
                3
              ),
              e.useSeconds ? (T(), _("span", $1, ":")) : de("v-if", !0),
              e.useSeconds
                ? (T(),
                  _(
                    "div",
                    {
                      key: 1,
                      class: Y([
                        "var-time-picker-title__btn",
                        e.type === "second"
                          ? "var-time-picker-title__btn--active"
                          : null,
                      ]),
                      onClick: t[2] || (t[2] = (n) => e.checkPanel("second")),
                    },
                    ie(e.time.second),
                    3
                  ))
                : de("v-if", !0),
            ]),
            e.format === "ampm"
              ? (T(),
                _("div", E1, [
                  B(
                    "div",
                    {
                      class: Y([
                        "var-time-picker-title__btn",
                        e.ampm === "am"
                          ? "var-time-picker-title__btn--active"
                          : null,
                      ]),
                      onClick: t[3] || (t[3] = (n) => e.checkAmpm("am")),
                    },
                    " AM ",
                    2
                  ),
                  B(
                    "div",
                    {
                      class: Y([
                        "var-time-picker-title__btn",
                        e.ampm === "pm"
                          ? "var-time-picker-title__btn--active"
                          : null,
                      ]),
                      onClick: t[4] || (t[4] = (n) => e.checkAmpm("pm")),
                    },
                    " PM ",
                    2
                  ),
                ]))
              : de("v-if", !0),
          ],
          4
        ),
        B("div", M1, [
          B(
            "div",
            {
              class: "var-time-picker-clock__container",
              onTouchstart:
                t[5] || (t[5] = (...n) => e.moveHand && e.moveHand(...n)),
              onTouchmove:
                t[6] || (t[6] = (...n) => e.moveHand && e.moveHand(...n)),
              onTouchend: t[7] || (t[7] = (...n) => e.end && e.end(...n)),
              ref: "container",
            },
            [
              ee(
                at,
                { name: "var-time-picker-panel-fade" },
                {
                  default: Ee(() => [
                    ee(
                      r,
                      {
                        key: e.type,
                        ref: "inner",
                        type: e.type,
                        ampm: e.ampm,
                        color: e.color,
                        "is-inner": e.isInner,
                        format: e.format,
                        "allowed-time": e.allowedTime,
                        rad: e.getRad,
                        time: e.time,
                        "prevent-next-update": e.isPreventNextUpdate,
                        "use-seconds": e.useSeconds,
                        max: e.max,
                        min: e.min,
                        onUpdate: e.update,
                        onChangePreventUpdate: e.changePreventUpdate,
                      },
                      null,
                      8,
                      [
                        "type",
                        "ampm",
                        "color",
                        "is-inner",
                        "format",
                        "allowed-time",
                        "rad",
                        "time",
                        "prevent-next-update",
                        "use-seconds",
                        "max",
                        "min",
                        "onUpdate",
                        "onChangePreventUpdate",
                      ]
                    ),
                  ]),
                  _: 1,
                }
              ),
            ],
            544
          ),
        ]),
      ],
      2
    )
  );
}
var ca = ve({
  render: I1,
  name: "VarTimePicker",
  components: { Clock: w1 },
  props: g1,
  setup(e) {
    var t = D(null),
      r = D(null),
      n = D(null),
      a = D(!1),
      i = D(!1),
      l = D(!1),
      o = D(!1),
      s = D(!1),
      u = D(void 0),
      d = D(0),
      c = D(0),
      v = D("hour"),
      f = D("am"),
      p = D(!1),
      h = D(!1),
      g = D({ hour: "00", minute: "00", second: "00" }),
      m = qe({ x: 0, y: 0 }),
      $ = qe({ x: [], y: [] }),
      S = j(() =>
        v.value === "hour" ? u.value : v.value === "minute" ? d.value : c.value
      ),
      C = (O) => {
        var U;
        (U = e["onUpdate:modelValue"]) == null || U.call(e, O),
          e.onChange == null || e.onChange(O);
      },
      k = (O) => O * 57.29577951308232,
      M = (O) => {
        (o.value = !1), (h.value = !1), (v.value = O);
      },
      P = (O) => {
        var { disableHour: U } = n.value,
          re = Ot.findIndex((q) => R(q) === R(g.value.hour)),
          pe = O === "am" ? Ot : pt,
          ce = [...pe.slice(re), ...pe.slice(0, re)];
        return ce.find((q, ge) => ((i.value = ge !== 0), !U.includes(q)));
      },
      I = (O) => {
        if (!e.readonly) {
          f.value = O;
          var U = P(O);
          if (!!U) {
            var re = e.useSeconds ? ":" + g.value.second : "",
              pe = U.padStart(2, "0") + ":" + g.value.minute + re;
            C(pe);
          }
        }
      },
      N = (O, U) => {
        var re = O >= $.x[0] && O <= $.x[1],
          pe = U >= $.y[0] && U <= $.y[1];
        return re && pe;
      },
      F = (O) => {
        var U = e.format === "24hr" ? "HH" : "hh",
          { hour: re, minute: pe, second: ce } = bt(O);
        return {
          hour: se().hour(re).format(U),
          minute: se().minute(pe).format("mm"),
          second: se().second(ce).format("ss"),
        };
      },
      w = (O) => {
        var U = O / 30;
        return U >= 0 ? U : U + 12;
      },
      y = () => {
        var { width: O, height: U } = n.value.getSize(),
          re = m.x - O / 2 - 8,
          pe = m.x + O / 2 + 8,
          ce = m.y - U / 2 - 8,
          q = m.y + U / 2 + 8;
        return { rangeXMin: re, rangeXMax: pe, rangeYMin: ce, rangeYMax: q };
      },
      z = (O, U, re) => {
        var { disableHour: pe } = n.value;
        l.value = N(O, U);
        var ce = Math.round(re / 30) * 30 + 90,
          q = w(ce),
          ge = a.value ? Ot[q] : pt[q];
        if (
          (pe.includes(ge) || (a.value = e.format === "24hr" ? N(O, U) : !1),
          a.value === l.value)
        ) {
          var ue = a.value || f.value === "pm" ? pt[q] : Ot[q];
          (p.value = pe.includes(ue)),
            !p.value && ((u.value = ce), (o.value = !0));
        }
      },
      te = (O) => {
        var { disableHour: U } = n.value,
          re = Math.round(O / 6) * 6 + 90,
          pe = re / 6 >= 0 ? re / 6 : re / 6 + 60,
          ce = {
            time: pe,
            format: e.format,
            ampm: f.value,
            hour: g.value.hour,
            max: e.max,
            min: e.min,
            disableHour: U,
            allowedTime: e.allowedTime,
          };
        (h.value = wv(ce)), !h.value && ((d.value = re), (s.value = !0));
      },
      V = (O) => {
        var { disableHour: U } = n.value,
          re = Math.round(O / 6) * 6 + 90,
          pe = re / 6 >= 0 ? re / 6 : re / 6 + 60,
          ce = {
            time: pe,
            format: e.format,
            ampm: f.value,
            hour: g.value.hour,
            minute: R(g.value.minute),
            max: e.max,
            min: e.min,
            disableHour: U,
            allowedTime: e.allowedTime,
          };
        kv(ce) || (c.value = re);
      },
      A = () => {
        var {
          left: O,
          top: U,
          width: re,
          height: pe,
        } = t.value.getBoundingClientRect();
        if (
          ((m.x = O + re / 2),
          (m.y = U + pe / 2),
          v.value === "hour" && e.format === "24hr")
        ) {
          var {
            rangeXMin: ce,
            rangeXMax: q,
            rangeYMin: ge,
            rangeYMax: ue,
          } = y();
          ($.x = [ce, q]), ($.y = [ge, ue]);
        }
      },
      X = (O) => {
        if ((O.preventDefault(), !e.readonly)) {
          A();
          var { clientX: U, clientY: re } = O.touches[0],
            pe = U - m.x,
            ce = re - m.y,
            q = Math.round(k(Math.atan2(ce, pe)));
          v.value === "hour"
            ? z(U, re, q)
            : v.value === "minute"
            ? te(q)
            : V(q);
        }
      },
      le = () => {
        if (!e.readonly) {
          if (v.value === "hour" && o.value) {
            v.value = "minute";
            return;
          }
          v.value === "minute" &&
            e.useSeconds &&
            s.value &&
            (v.value = "second");
        }
      },
      x = () => {
        i.value = !1;
      };
    return (
      me(
        () => e.modelValue,
        (O) => {
          if (O) {
            var { hour: U, minute: re, second: pe } = bt(O),
              ce = se().hour(U).format("hh"),
              q = se().hour(U).format("HH"),
              ge = se().minute(re).format("mm"),
              ue = se().second(pe).format("ss");
            (u.value = (ce === "12" ? 0 : R(ce)) * 30),
              (d.value = R(ge) * 6),
              (c.value = R(ue) * 6),
              (g.value = F(O)),
              e.format !== "24hr" &&
                (f.value =
                  ("" + U).padStart(2, "0") === q && pt.includes(q)
                    ? "pm"
                    : "am"),
              (a.value = e.format === "24hr" && pt.includes(q));
          }
        },
        { immediate: !0 }
      ),
      {
        getRad: S,
        time: g,
        container: t,
        inner: n,
        picker: r,
        isInner: a,
        type: v,
        ampm: f,
        isPreventNextUpdate: i,
        moveHand: X,
        checkPanel: M,
        checkAmpm: I,
        end: le,
        update: C,
        changePreventUpdate: x,
      }
    );
  },
});
ca.install = function (e) {
  e.component(ca.name, ca);
};
var P1 = {
  modelValue: { type: Array, default: () => [] },
  accept: { type: String, default: "image/*" },
  capture: { type: [String, Boolean], default: void 0 },
  multiple: { type: Boolean, default: !1 },
  readonly: { type: Boolean, default: !1 },
  disabled: { type: Boolean, default: !1 },
  removable: { type: Boolean, default: !0 },
  maxlength: { type: [Number, String] },
  maxsize: { type: [Number, String] },
  previewed: { type: Boolean, default: !0 },
  ripple: { type: Boolean, default: !0 },
  validateTrigger: { type: Array, default: () => ["onChange", "onRemove"] },
  rules: { type: Array },
  onBeforeRead: { type: Function },
  onAfterRead: { type: Function },
  onBeforeRemove: { type: Function },
  onRemove: { type: Function },
  onOversize: { type: Function },
  "onUpdate:modelValue": { type: Function },
};
function Sv(e, t, r, n, a, i, l) {
  try {
    var o = e[i](l),
      s = o.value;
  } catch (u) {
    r(u);
    return;
  }
  o.done ? t(s) : Promise.resolve(s).then(n, a);
}
function Tv(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (n, a) {
      var i = e.apply(t, r);
      function l(s) {
        Sv(i, n, a, l, o, "next", s);
      }
      function o(s) {
        Sv(i, n, a, l, o, "throw", s);
      }
      l(void 0);
    });
  };
}
var O1 = 0,
  _1 = { class: "var-uploader var--box" },
  V1 = { class: "var-uploader__file-list" },
  N1 = ["onClick"],
  A1 = { class: "var-uploader__file-name" },
  D1 = ["onClick"],
  B1 = ["src", "alt"],
  F1 = ["multiple", "accept", "capture", "disabled"],
  L1 = ["src"];
function z1(e, t) {
  var r = fe("var-icon"),
    n = fe("var-form-details"),
    a = fe("var-popup"),
    i = ht("ripple");
  return (
    T(),
    _("div", _1, [
      B("div", V1, [
        (T(!0),
        _(
          Pe,
          null,
          Ze(e.modelValue, (l) =>
            Re(
              (T(),
              _(
                "div",
                {
                  class: Y([
                    "var-uploader__file var-elevation--2",
                    [l.state === "loading" ? "var-uploader--loading" : null],
                  ]),
                  key: l.id,
                  onClick: (o) => e.preview(l),
                },
                [
                  B("div", A1, ie(l.name || l.url), 1),
                  e.removable
                    ? (T(),
                      _(
                        "div",
                        {
                          key: 0,
                          class: "var-uploader__file-close",
                          onClick: mn((o) => e.handleRemove(l), ["stop"]),
                        },
                        [
                          ee(r, {
                            class: "var-uploader__file-close-icon",
                            "var-uploader-cover": "",
                            name: "delete",
                          }),
                        ],
                        8,
                        D1
                      ))
                    : de("v-if", !0),
                  l.cover
                    ? (T(),
                      _(
                        "img",
                        {
                          key: 1,
                          class: "var-uploader__file-cover",
                          style: J({ objectFit: l.fit }),
                          src: l.cover,
                          alt: l.name,
                        },
                        null,
                        12,
                        B1
                      ))
                    : de("v-if", !0),
                  B(
                    "div",
                    {
                      class: Y([
                        "var-uploader__file-indicator",
                        [
                          l.state === "success"
                            ? "var-uploader--success"
                            : null,
                          l.state === "error" ? "var-uploader--error" : null,
                        ],
                      ]),
                    },
                    null,
                    2
                  ),
                ],
                10,
                N1
              )),
              [
                [
                  i,
                  {
                    disabled:
                      e.disabled ||
                      e.formDisabled ||
                      e.readonly ||
                      e.formReadonly ||
                      !e.ripple,
                  },
                ],
              ]
            )
          ),
          128
        )),
        !e.maxlength || e.modelValue.length < e.maxlength
          ? Re(
              (T(),
              _(
                "div",
                {
                  key: 0,
                  class: Y([
                    "var--relative",
                    [
                      e.$slots.default
                        ? null
                        : "var-uploader__action var-elevation--2",
                      e.disabled || e.formDisabled
                        ? "var-uploader--disabled"
                        : null,
                    ],
                  ]),
                },
                [
                  B(
                    "input",
                    {
                      class: "var-uploader__action-input",
                      type: "file",
                      multiple: e.multiple,
                      accept: e.accept,
                      capture: e.capture,
                      disabled:
                        e.disabled ||
                        e.formDisabled ||
                        e.readonly ||
                        e.formReadonly,
                      onChange:
                        t[0] ||
                        (t[0] = (...l) =>
                          e.handleChange && e.handleChange(...l)),
                    },
                    null,
                    40,
                    F1
                  ),
                  Z(e.$slots, "default", {}, () => [
                    ee(r, {
                      class: "var-uploader__action-icon",
                      "var-uploader-cover": "",
                      name: "plus",
                    }),
                  ]),
                ],
                2
              )),
              [
                [
                  i,
                  {
                    disabled:
                      e.disabled ||
                      e.formDisabled ||
                      e.readonly ||
                      e.formReadonly ||
                      !e.ripple ||
                      e.$slots.default,
                  },
                ],
              ]
            )
          : de("v-if", !0),
      ]),
      ee(
        n,
        { "error-message": e.errorMessage, "maxlength-text": e.maxlengthText },
        null,
        8,
        ["error-message", "maxlength-text"]
      ),
      ee(
        a,
        {
          class: "var-uploader__preview",
          "var-uploader-cover": "",
          position: "center",
          show: e.showPreview,
          "onUpdate:show": t[1] || (t[1] = (l) => (e.showPreview = l)),
          onClosed: t[2] || (t[2] = (l) => (e.currentPreview = null)),
        },
        {
          default: Ee(() => {
            var l, o;
            return [
              e.currentPreview &&
              e.isHTMLSupportVideo(
                (l = e.currentPreview) == null ? void 0 : l.url
              )
                ? (T(),
                  _(
                    "video",
                    {
                      key: 0,
                      class: "var-uploader__preview-video",
                      playsinline: "true",
                      "webkit-playsinline": "true",
                      "x5-playsinline": "true",
                      "x5-video-player-type": "h5",
                      "x5-video-player-fullscreen": "false",
                      controls: "",
                      src: (o = e.currentPreview) == null ? void 0 : o.url,
                    },
                    null,
                    8,
                    L1
                  ))
                : de("v-if", !0),
            ];
          }),
          _: 1,
        },
        8,
        ["show"]
      ),
    ])
  );
}
var fa = ve({
  render: z1,
  name: "VarUploader",
  directives: { Ripple: lt },
  components: { VarIcon: We, VarPopup: zt, VarFormDetails: ut },
  props: P1,
  setup(e) {
    var t = D(!1),
      r = D(null),
      n = j(() => {
        var {
          maxlength: w,
          modelValue: { length: y },
        } = e;
        return At(w) ? y + " / " + w : "";
      }),
      { form: a, bindForm: i } = Rt(),
      {
        errorMessage: l,
        validateWithTrigger: o,
        validate: s,
        resetValidation: u,
      } = Lt(),
      d = (w) => {
        var { disabled: y, readonly: z, previewed: te } = e;
        if (
          !(
            (a != null && a.disabled.value) ||
            (a != null && a.readonly.value) ||
            y ||
            z ||
            !te
          )
        ) {
          var { url: V } = w;
          if (Tt(V) && Au(V)) {
            Er(V);
            return;
          }
          Tt(V) && Du(V) && ((r.value = w), (t.value = !0));
        }
      },
      c = (w) => ({ id: O1++, url: "", cover: "", name: w.name, file: w }),
      v = (w) => {
        var y = w.target,
          { files: z } = y;
        return Array.from(z);
      },
      f = (w) =>
        new Promise((y) => {
          var z = new FileReader();
          (z.onload = () => {
            var te = z.result;
            w.file.type.startsWith("image") && (w.cover = te),
              (w.url = te),
              y(w);
          }),
            z.readAsDataURL(w.file);
        }),
      p = (w) => w.map(f),
      h = (w) => {
        var { onBeforeRead: y } = e;
        return w.map(
          (z) =>
            new Promise((te) => {
              var V = y ? y(qe(z)) : !0;
              Promise.resolve(V).then((A) => te({ valid: A, varFile: z }));
            })
        );
      },
      g = (function () {
        var w = Tv(function* (y) {
          var z,
            {
              maxsize: te,
              maxlength: V,
              modelValue: A,
              onOversize: X,
              onAfterRead: le,
              readonly: x,
              disabled: O,
            } = e;
          if (
            !(
              (a != null && a.disabled.value) ||
              (a != null && a.readonly.value) ||
              O ||
              x
            )
          ) {
            var U = (ke) =>
                ke.filter((Ne) =>
                  Ne.file.size > R(te) ? (X == null || X(qe(Ne)), !1) : !0
                ),
              re = (ke) => {
                var Ne = Math.min(ke.length, R(V) - A.length);
                return ke.slice(0, Ne);
              },
              pe = v(y),
              ce = pe.map(c);
            (ce = te != null ? U(ce) : ce), (ce = V != null ? re(ce) : ce);
            var q = yield Promise.all(p(ce)),
              ge = yield Promise.all(h(q)),
              ue = ge
                .filter(({ valid: ke }) => ke)
                .map(({ varFile: ke }) => ke);
            (z = e["onUpdate:modelValue"]) == null || z.call(e, [...A, ...ue]),
              (y.target.value = ""),
              ue.forEach((ke) => (le == null ? void 0 : le(qe(ke))));
          }
        });
        return function (z) {
          return w.apply(this, arguments);
        };
      })(),
      m = (function () {
        var w = Tv(function* (y) {
          var z,
            {
              disabled: te,
              readonly: V,
              modelValue: A,
              onBeforeRemove: X,
              onRemove: le,
            } = e;
          if (
            !(
              (a != null && a.disabled.value) ||
              (a != null && a.readonly.value) ||
              te ||
              V
            ) &&
            !(X && !(yield X(y)))
          ) {
            var x = A.filter((O) => O !== y);
            le == null || le(y),
              M("onRemove"),
              (z = e["onUpdate:modelValue"]) == null || z.call(e, x);
          }
        });
        return function (z) {
          return w.apply(this, arguments);
        };
      })(),
      $ = () => e.modelValue.filter((w) => w.state === "success"),
      S = () => e.modelValue.filter((w) => w.state === "error"),
      C = () => e.modelValue.filter((w) => w.state === "loading"),
      k = { getSuccess: $, getError: S, getLoading: C },
      M = (w) => {
        Ye(() => {
          var { validateTrigger: y, rules: z, modelValue: te } = e;
          o(y, w, z, te, k);
        });
      },
      P = !1,
      I = () => s(e.rules, e.modelValue, k),
      N = () => {
        var w;
        (P = !0), (w = e["onUpdate:modelValue"]) == null || w.call(e, []), u();
      },
      F = { validate: I, resetValidation: u, reset: N };
    return (
      i == null || i(F),
      me(
        () => e.modelValue,
        () => {
          !P && M("onChange"), (P = !1);
        },
        { deep: !0 }
      ),
      {
        showPreview: t,
        currentPreview: r,
        errorMessage: l,
        maxlengthText: n,
        isHTMLSupportVideo: Du,
        isHTMLSupportImage: Au,
        formDisabled: a == null ? void 0 : a.disabled,
        formReadonly: a == null ? void 0 : a.readonly,
        preview: d,
        handleChange: g,
        handleRemove: m,
        getSuccess: $,
        getError: S,
        getLoading: C,
        validate: I,
        resetValidation: u,
        reset: N,
      }
    );
  },
});
fa.install = function (e) {
  e.component(fa.name, fa);
};
function R1(e) {
  Kr.install && e.use(Kr),
    gn.install && e.use(gn),
    yn.install && e.use(yn),
    bn.install && e.use(bn),
    It.install && e.use(It),
    Cn.install && e.use(Cn),
    qr.install && e.use(qr),
    Xr.install && e.use(Xr),
    wn.install && e.use(wn),
    Gr.install && e.use(Gr),
    kn.install && e.use(kn),
    Sn.install && e.use(Sn),
    Tn.install && e.use(Tn),
    Mt.install && e.use(Mt),
    $n.install && e.use($n),
    In.install && e.use(In),
    An.install && e.use(An),
    Qr.install && e.use(Qr),
    Bn.install && e.use(Bn),
    Fn.install && e.use(Fn),
    ut.install && e.use(ut),
    We.install && e.use(We),
    zn.install && e.use(zn),
    Er.install && e.use(Er),
    Rn.install && e.use(Rn),
    Un.install && e.use(Un),
    en.install && e.use(en),
    Wi.install && e.use(Wi),
    Yn.install && e.use(Yn),
    Qt.install && e.use(Qt),
    no.install && e.use(no),
    Ir.install && e.use(Ir),
    Hn.install && e.use(Hn),
    Wn.install && e.use(Wn),
    rn.install && e.use(rn),
    zt.install && e.use(zt),
    jn.install && e.use(jn),
    Kn.install && e.use(Kn),
    qn.install && e.use(qn),
    Xn.install && e.use(Xn),
    Gn.install && e.use(Gn),
    lt.install && e.use(lt),
    Zn.install && e.use(Zn),
    Jn.install && e.use(Jn),
    Qn.install && e.use(Qn),
    xn.install && e.use(xn),
    lr.install && e.use(lr),
    ra.install && e.use(ra),
    na.install && e.use(na),
    aa.install && e.use(aa),
    Mr.install && e.use(Mr),
    Wa.install && e.use(Wa),
    Sr.install && e.use(Sr),
    Tr.install && e.use(Tr),
    la.install && e.use(la),
    oa.install && e.use(oa),
    sa.install && e.use(sa),
    ua.install && e.use(ua),
    da.install && e.use(da),
    va.install && e.use(va),
    ca.install && e.use(ca),
    fa.install && e.use(fa);
}
var Y1 = {
  install: R1,
  ActionSheet: Kr,
  AppBar: gn,
  BackTop: yn,
  Badge: bn,
  Button: It,
  Card: Cn,
  Cell: qr,
  Checkbox: Xr,
  CheckboxGroup: wn,
  Chip: Gr,
  Col: kn,
  Collapse: Sn,
  CollapseItem: Tn,
  Context: Mt,
  Countdown: $n,
  Counter: In,
  DatePicker: An,
  Dialog: Qr,
  Divider: Bn,
  Form: Fn,
  FormDetails: ut,
  Icon: We,
  Image: zn,
  ImagePreview: Er,
  IndexAnchor: Rn,
  IndexBar: Un,
  Input: en,
  Lazy: Wi,
  List: Yn,
  Loading: Qt,
  Locale: no,
  Menu: Ir,
  Option: Hn,
  Pagination: Wn,
  Picker: rn,
  Popup: zt,
  Progress: jn,
  PullRefresh: Kn,
  Radio: qn,
  RadioGroup: Xn,
  Rate: Gn,
  Ripple: lt,
  Row: Zn,
  Select: Jn,
  Skeleton: Qn,
  Slider: xn,
  Snackbar: lr,
  Space: ra,
  Step: na,
  Steps: aa,
  Sticky: Mr,
  StyleProvider: Wa,
  Swipe: Sr,
  SwipeItem: Tr,
  Switch: la,
  Tab: oa,
  TabItem: sa,
  Table: ua,
  Tabs: da,
  TabsItems: va,
  TimePicker: ca,
  Uploader: fa,
};
export {
  Pe as F,
  U1 as T,
  Y1 as V,
  B as a,
  ee as b,
  _ as c,
  Ze as d,
  Ie as e,
  de as f,
  J as g,
  hi as h,
  Ee as i,
  Oe as j,
  D as k,
  rt as l,
  Xe as m,
  Y as n,
  T as o,
  xf as p,
  fe as r,
  ie as t,
  hc as u,
  Oa as v,
  Re as w,
};
