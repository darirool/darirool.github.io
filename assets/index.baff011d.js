import {
  o as a,
  c as u,
  a as l,
  t as I,
  n as O,
  r as d,
  b as g,
  T as D,
  F as T,
  d as L,
  e as v,
  f as C,
  w as M,
  v as b,
  m as A,
  g as V,
  h as H,
  i as k,
  j as R,
  k as z,
  l as F,
  u as N,
  p as B,
  V as X,
} from "./vendor.7a2ceaf1.js";
const q = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList")
        for (const r of o.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && i(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(n) {
    const o = {};
    return (
      n.integrity && (o.integrity = n.integrity),
      n.referrerpolicy && (o.referrerPolicy = n.referrerpolicy),
      n.crossorigin === "use-credentials"
        ? (o.credentials = "include")
        : n.crossorigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const o = s(n);
    fetch(n.href, o);
  }
};
q();
var y = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of t) s[i] = n;
  return s;
};
const K = { props: { openTip: String, flap: Boolean } },
  G = { class: "envelope" },
  J = { class: "card" },
  Y = l("span", { class: "fa fa-close close-icon" }, null, -1),
  Q = { class: "text" },
  W = l("div", { class: "heart" }, null, -1);
function Z(e, t, s, i, n, o) {
  return (
    a(),
    u(
      "div",
      {
        class: O([{ flap: s.flap }, "animate__animated animate__zoomIn"]),
        onClick: t[0] || (t[0] = (r) => e.$emit("open")),
      },
      [
        l("div", G, [
          l("div", J, [Y, l("div", Q, I(s.openTip || "opening...."), 1)]),
          W,
        ]),
      ],
      2
    )
  );
}
var E = y(K, [["render", Z]]);
const ee = { props: { src: String } },
  te = { class: "vlog-cover" },
  ne = { class: "vlog-cover-action" },
  se = ["src"];
function oe(e, t, s, i, n, o) {
  const r = d("var-icon");
  return (
    a(),
    u("div", te, [
      l("div", ne, [
        g(r, {
          name: "play-circle-outline",
          onClick: t[0] || (t[0] = (p) => e.$emit("open")),
          style: { "font-size": "55px", color: "aliceblue" },
        }),
      ]),
      l("img", { src: `${s.src}.jpg`, class: "vlog-cover-img" }, null, 8, se),
    ])
  );
}
var ie = y(ee, [["render", oe]]);
const re = {
    props: { title: String, paragraphs: Array, speed: Number },
    data() {
      return { contents: [], finish: !1 };
    },
    methods: {
      append(e, t) {
        return new Promise((s) => {
          const i = new D(e, {
            strings: ["", t],
            typeSpeed: this.speed,
            backSpeed: this.speed,
            showCursor: !1,
            onComplete: () => {
              i.stop(), setTimeout(() => s(), 500);
            },
          });
        });
      },
      initContent() {
        let e = Promise.resolve();
        (e = e.then(() =>
          this.append(this.$refs["letter-title"], this.title, 120)
        )),
          this.paragraphs.forEach((t, s) => {
            e = e.then(
              () =>
                new Promise((i) => {
                  if (/<img[^>]+>/.test(t)) {
                    const o = {
                      type: "img",
                      loading: !0,
                      content: t,
                      ref: `paragraph-img-${s}`,
                    };
                    this.contents.push(o),
                      setTimeout(() => {
                        (o.loading = !1),
                          this.$nextTick(() => {
                            (o.dom = this.$refs[o.ref][0]),
                              i(),
                              this.autoScroll();
                          });
                      }, 1200);
                  } else {
                    const o = {
                      type: "text",
                      content: t,
                      ref: `paragraph-text-${s}`,
                    };
                    this.contents.push(o),
                      this.$nextTick(() => {
                        (o.dom = this.$refs[o.ref][0]),
                          this.append(o.dom, t).then(() => {
                            this.autoScroll(), i();
                          });
                      });
                  }
                })
            );
          }),
          e.then(() => (this.finish = !0));
      },
      autoScroll() {
        this.$nextTick(() => {
          this.computeDistance().then((e) => {
            const t = 250,
              s = Date.now();
            console.log("auto scroll", e);
            const i =
              document.body.scrollTop + document.documentElement.scrollTop;
            requestAnimationFrame(function n() {
              const o = Math.min(1, (Date.now() - s) / t);
              (document.body.scrollTop = i + e * o),
                (document.documentElement.scrollTop = i + e * o),
                o < 1 && requestAnimationFrame(n);
            });
          });
        });
      },
      computeDistance() {
        return new Promise((e) => {
          const t = this.contents.length - 1;
          if (t === this.paragraphs.length - 1) {
            e(0);
            return;
          }
          const s = this.contents[t];
          if (s.type === "img") {
            const i = s.dom.children[0];
            this.onImageLoad(i).then(() => {
              setTimeout(() => {
                e(s.dom.offsetHeight);
              }, 100);
            });
          } else e(s.dom.offsetHeight);
        });
      },
      onImageLoad(e) {
        const t = $(e);
        return new Promise((s) => {
          t.one("load", s).each((i, n) => {
            n.complete && $(n).trigger("load");
          });
        });
      },
    },
    mounted() {
      this.initContent();
    },
  },
  le = { class: "letter-content animate__animated animate__fadeInUp" },
  ce = { class: "letter-title", ref: "letter-title" },
  ae = { class: "letter-detail" },
  pe = { key: 1, style: { "text-align": "center" } },
  ue = ["innerHTML"],
  de = l("text", null, "\u56DE\u5230\u804A\u5929\u9875", -1),
  he = { class: "letter-action" };
function ge(e, t, s, i, n, o) {
  const r = d("var-loading"),
    p = d("var-icon"),
    h = d("var-back-top");
  return (
    a(),
    u("div", le, [
      l("div", ce, null, 512),
      l("div", ae, [
        (a(!0),
        u(
          T,
          null,
          L(
            n.contents,
            ({ type: m, content: _, loading: c, ref: f }, x) => (
              a(),
              u(
                "div",
                { key: x, ref_for: !0, ref: `letter-detail-item-${x}` },
                [
                  c
                    ? (a(), v(r, { key: 0, color: "#f44336", type: "cube" }))
                    : C("", !0),
                  M(
                    l(
                      "div",
                      null,
                      [
                        m === "text"
                          ? (a(),
                            u("p", { key: 0, ref_for: !0, ref: f }, null, 512))
                          : (a(),
                            u("div", pe, [
                              l(
                                "span",
                                { ref_for: !0, ref: f, innerHTML: _ },
                                null,
                                8,
                                ue
                              ),
                            ])),
                      ],
                      512
                    ),
                    [[b, !c]]
                  ),
                ]
              )
            )
          ),
          128
        )),
        M(
          l(
            "div",
            {
              class: "finish-action",
              onClick: t[0] || (t[0] = (m) => e.$emit("close")),
            },
            [g(p, { name: "chevron-left" }), de],
            512
          ),
          [[b, n.finish]]
        ),
      ]),
      l("div", he, [
        g(p, {
          name: "window-close",
          style: { "font-size": "25px" },
          onClick: t[1] || (t[1] = (m) => e.$emit("close")),
        }),
      ]),
      g(h, { style: { "z-index": "2000" }, duration: 300 }),
    ])
  );
}
var me = y(re, [["render", ge]]);
const _e = {
    props: { type: String, src: String },
    components: { LetterContent: me, LetterCover: E },
    data() {
      return {
        openTip: "",
        title: "",
        paragraphs: [],
        speed: 120,
        status: "cover",
      };
    },
    mounted() {
      setTimeout(() => {
        (this.status = "opening"),
          setTimeout(() => {
            this.status = "opened";
          }, 2500);
      }, 1e3);
    },
    created() {
      $.getJSON(
        this.src,
        ({ openTip: e, title: t, paragraphs: s, speed: i }) => {
          (this.openTip = e),
            (this.paragraphs = s),
            (this.title = t),
            (this.speed = i);
        }
      );
    },
  },
  fe = { class: "letter-cover-wapper" },
  ve = {
    key: 0,
    class: "letter-cover-wapper",
    style: { position: "relative", "z-index": "2200" },
  };
function ye(e, t, s, i, n, o) {
  const r = d("LetterCover"),
    p = d("LetterContent");
  return (
    a(),
    u(
      T,
      null,
      [
        l("div", fe, [
          g(r, { flap: n.status === "opening", openTip: n.openTip }, null, 8, [
            "flap",
            "openTip",
          ]),
        ]),
        n.status === "opened"
          ? (a(),
            u("div", ve, [
              g(
                p,
                {
                  onClose: t[0] || (t[0] = (h) => e.$emit("close")),
                  title: n.title,
                  paragraphs: n.paragraphs,
                  speed: n.speed,
                },
                null,
                8,
                ["title", "paragraphs", "speed"]
              ),
            ]))
          : C("", !0),
      ],
      64
    )
  );
}
var Te = y(_e, [["render", ye]]);
const $e = {
    props: { src: String },
    mounted() {
      this.$refs.vlogPlayer.play();
    },
  },
  Ce = { class: "vlog-cover-wapper" },
  xe = { class: "vlog-action" },
  Me = ["src"];
function be(e, t, s, i, n, o) {
  const r = d("var-icon");
  return (
    a(),
    u("div", Ce, [
      l("div", xe, [
        g(r, {
          name: "window-close",
          style: { "font-size": "25px" },
          onClick: t[0] || (t[0] = (p) => e.$emit("close")),
        }),
      ]),
      l(
        "video",
        {
          id: "vlogPlayer",
          ref: "vlogPlayer",
          class: "vlog-player",
          autoplay: "autoplay",
          playsinline: "true",
          "webkit-playsinline": "true",
          "x-webkit-airplay": "allow",
          airplay: "allow",
          loop: "loop",
          "x5-video-player-type": "h5",
          "x5-video-player-fullscreen": "true",
          "x5-video-orientation": "portrait",
          src: s.src,
        },
        null,
        8,
        Me
      ),
    ])
  );
}
var ke = y($e, [["render", be]]);
const we = {
  props: { type: String, options: Object },
  components: { LetterDetail: Te, VlogDetail: ke },
};
function Se(e, t, s, i, n, o) {
  const r = d("LetterDetail"),
    p = d("VlogDetail");
  return (
    a(),
    u(
      T,
      null,
      [
        s.type === "letter"
          ? (a(),
            v(
              r,
              A({ key: 0 }, s.options, {
                onClose: t[0] || (t[0] = (h) => e.$emit("close")),
              }),
              null,
              16
            ))
          : C("", !0),
        s.type === "vlog"
          ? (a(),
            v(
              p,
              A({ key: 1 }, s.options, {
                onClose: t[1] || (t[1] = (h) => e.$emit("close")),
              }),
              null,
              16
            ))
          : C("", !0),
      ],
      64
    )
  );
}
var Oe = y(we, [["render", Se]]);
const P = { AUTHOR: "author", ME: "me" },
  w = { USER_INPUT: "userInput", COMPONENT_CLOSE: "componentClose" },
  Ae = {
    components: { letter: E, vlog: ie, MessageDetail: Oe },
    props: { title: String, options: Array },
    computed: {
      sendBtnDisabled() {
        return this.status === "systemInput"
          ? !0
          : !(this.inputMessage && this.inputMessage.trim().length > 0);
      },
    },
    data() {
      return {
        messages: [],
        msgChain: Promise.resolve(),
        inputMessage: "",
        nextActionTrigger: null,
        status: "systemInput",
        currentOpenComponent: null,
        isTyping: !1,
        latestMsgContent: null,
      };
    },
    watch: {
      options() {
        this.buildMsgChain(this.options);
      },
      status(e, t) {
        e === w.USER_INPUT && this.setUserInputFoucus();
      },
    },
    methods: {
      buildMsgChain(e) {
        e.forEach(
          ({ msgs: t, msgInputSpeed: s, author: i, triggerNextAction: n }) => {
            this.msgChain = this.msgChain.then(() =>
              this.sendSysMsg(t, s, i, n)
            );
          }
        );
      },
      sendSysMsg(e, t = 150, s, i = null) {
        return new Promise((n) => {
          this.sendSysMsgInner(e, t, s).then(() => {
            if (i) {
              const o = () => S(500).then(() => n());
              (this.nextActionTrigger = {
                inputSpeed: t,
                triggerNextAction: i,
                trigger: o,
              }),
                console.log("set trigger", this.nextActionTrigger);
              const { type: r, options: p } = i;
              this.status = r;
            } else n();
          });
        });
      },
      sendSysMsgInner(e, t, s) {
        return new Promise((i) => {
          const n = Array.isArray(e) ? e[e.length - 1] : e,
            o = this.getMsgType(n);
          if (((this.status = "systemInput"), o === "text")) {
            let r = [""];
            Array.isArray(e) ? (r = r.concat(e)) : r.push(e);
            const p = new D(".system-input-element", {
              strings: r,
              typeSpeed: t,
              backSpeed: t,
              onComplete: () => {
                p.destroy(),
                  this.pushMsg(n, s || P.AUTHOR, o),
                  S(500).then(() => i());
              },
            });
          } else this.pushMsg(n, P.AUTHOR, o), S(500).then(() => i());
        });
      },
      sendUserMsg() {
        const e = this.inputMessage;
        if (
          ((this.inputMessage = ""),
          this.pushMsg(e, P.ME, "text"),
          !this.nextActionTrigger)
        )
          return;
        const {
            triggerNextAction: t,
            inputSpeed: s,
            tryCnt: i = 0,
          } = this.nextActionTrigger,
          { type: n, options: o } = t,
          { resolveKeyTexts: r, rejectKeyTexts: p, rejectHitTexts: h } = o;
        if (n === w.USER_INPUT)
          if (this.rejectNextMsg(e, r, p)) {
            const m = i >= h.length - 1,
              _ = h[Math.min(i, h.length - 1)];
            let c = Promise.resolve();
            Array.isArray(_)
              ? _.forEach((f) => {
                  c = c.then(() => this.sendSysMsg(f, s));
                })
              : (c = this.sendSysMsg(_, s)),
              c.then(() => {
                m
                  ? this.handleTriggerNextAction()
                  : (this.status = w.USER_INPUT);
              }),
              (this.nextActionTrigger.tryCnt = i + 1);
          } else this.handleTriggerNextAction();
      },
      handleComponentOpen({ type: e, props: t }) {
        this.currentOpenComponent = { type: e, props: t };
      },
      handleComponentClose() {
        if (((this.currentOpenComponent = null), !this.nextActionTrigger))
          return;
        const e = this.nextActionTrigger,
          { triggerNextAction: t } = e,
          { type: s, options: i } = t;
        s === w.COMPONENT_CLOSE && this.handleTriggerNextAction();
      },
      handleTriggerNextAction() {
        if (!this.nextActionTrigger) return;
        const e = this.nextActionTrigger,
          { trigger: t } = e;
        t(),
          (this.nextActionTrigger = null),
          console.log("remove trigger", this.nextActionTrigger);
      },
      setUserInputFoucus() {
        const e = () => {
          try {
            !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) &&
              this.$refs.userMsgInputRef.scrollIntoView(!0);
          } catch {}
        };
        setTimeout(() => {
          this.$nextTick(() => {
            e(), this.$refs.userMsgInputRef.focus();
          });
        }, 1e3);
      },
      rejectNextMsg(e, t = [], s = []) {
        return s.some((i) => e.indexOf(i) > -1)
          ? !0
          : !t.some((i) => e.indexOf(i) > -1);
      },
      pushMsg(e, t, s = "text") {
        this.messages.push({
          author: t,
          content: e,
          type: s,
          props: this.getProps(e, s),
        }),
          Pe();
      },
      getProps(e, t) {
        const s = {};
        if (t === "text") return s;
        const o = new DOMParser()
          .parseFromString(e, "text/html")
          .getElementsByTagName(t);
        if (o.length === 1) {
          const r = o[0];
          r.getAttributeNames().forEach((h) => (s[h] = r.getAttribute(h)));
        }
        return s;
      },
      getMsgType(e) {
        const t = /<img[^>]+>/.test(e),
          s = /<letter[^>]+>/.test(e),
          i = /<vlog[^>]+>/.test(e);
        return t ? "img" : s ? "letter" : i ? "vlog" : "text";
      },
      markMsgSize(e, t = null) {
        return (
          (this.latestMsgContent = t || e.content),
          S(0)
            .then(() => e.type === "img" && j($("#mock-msg img")))
            .then(() => {
              Object.assign(e, Ie()), (this.messages = [...this.messages]);
            })
        );
      },
    },
  };
function Pe() {
  setTimeout(() => {
    U();
    const e = $("#mobile-body-content .msg-row:last-child .msg");
    e.find("a").attr("target", "_blank"), j(e).then(U);
  });
}
function U() {
  const e = $("#mobile-body-content"),
    t = e[0].scrollHeight - e.height() - e.scrollTop(),
    s = 250,
    i = Date.now();
  requestAnimationFrame(function n() {
    const o = Math.min(1, (Date.now() - i) / s);
    e.scrollTop(e.scrollTop() + t * o), o < 1 && requestAnimationFrame(n);
  });
}
function S(e = 0) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function Ie() {
  const e = $("#mock-msg");
  return { width: e.width(), height: e.height() };
}
function j(e) {
  return new Promise((t) => {
    e.one("load", t).each((s, i) => {
      i.complete && $(i).trigger("load");
    });
  });
}
const De = { id: "mobile" },
  Le = { id: "mobile-head" },
  Ne = { id: "mobile-head-title" },
  Ee = { id: "mobile-body" },
  Ue = l("div", { id: "mobile-body-bg" }, null, -1),
  je = { id: "mobile-body-content" },
  Ve = { id: "mock-msg-row", class: "msg-row" },
  He = ["innerHTML"],
  Re = ["onClick"],
  ze = ["innerHTML"],
  Fe = { id: "mobile-foot" },
  Be = { id: "input-hint", class: "say-something" },
  Xe = {
    style: {
      background: "white",
      width: "100%",
      height: "32px",
      "line-height": "32px",
    },
  },
  qe = { style: { color: "black" }, class: "system-input-element" },
  Ke = R("\u53D1\u9001");
function Ge(e, t, s, i, n, o) {
  const r = d("var-input"),
    p = d("var-col"),
    h = d("var-button"),
    m = d("var-row"),
    _ = d("MessageDetail");
  return (
    a(),
    u(
      T,
      null,
      [
        l("div", De, [
          l("div", Le, [l("div", Ne, I(s.title), 1)]),
          l("div", Ee, [
            Ue,
            l("div", je, [
              l("div", Ve, [
                l(
                  "div",
                  {
                    id: "mock-msg",
                    class: "msg",
                    innerHTML: n.latestMsgContent,
                  },
                  null,
                  8,
                  He
                ),
              ]),
              (a(!0),
              u(
                T,
                null,
                L(
                  n.messages,
                  (c, f) => (
                    a(),
                    u(
                      "div",
                      {
                        class: O([
                          "msg-row",
                          c.author === "author" ? "msg-author" : "msg-me",
                        ]),
                        key: f,
                      },
                      [
                        l(
                          "div",
                          {
                            class: O([
                              "msg",
                              {
                                "msg-bounce-in-left": c.author === "author",
                                "msg-bounce-in-right": c.author === "me",
                                animate_breathe:
                                  f === n.messages.length - 1 &&
                                  n.status === "componentClose",
                              },
                            ]),
                            style: V(
                              c.width &&
                                c.height && {
                                  width: c.width - 26 + "px",
                                  height: c.height - 18 + "px",
                                }
                            ),
                            onClick: (x) => e.$emit("msg-click", c),
                          },
                          [
                            c.type === "text"
                              ? (a(),
                                u(
                                  "span",
                                  { key: 0, innerHTML: c.content },
                                  null,
                                  8,
                                  ze
                                ))
                              : (a(),
                                v(
                                  H(c.type),
                                  A({ key: 1 }, c.props, {
                                    onOpen: (x) => o.handleComponentOpen(c),
                                    onClose: o.handleComponentClose,
                                  }),
                                  null,
                                  16,
                                  ["onOpen", "onClose"]
                                )),
                          ],
                          14,
                          Re
                        ),
                      ],
                      2
                    )
                  )
                ),
                128
              )),
            ]),
          ]),
          l("div", Fe, [
            g(
              m,
              {
                gutter: 10,
                justify: "center",
                align: "center",
                style: { height: "100%" },
              },
              {
                default: k(() => [
                  g(
                    p,
                    { span: 20 },
                    {
                      default: k(() => [
                        l("div", Be, [
                          l("div", Xe, [
                            M(l("span", qe, null, 512), [
                              [b, n.status === "systemInput"],
                            ]),
                            M(
                              g(
                                r,
                                {
                                  ref: "userMsgInputRef",
                                  class: "animate_breathe",
                                  hint: !1,
                                  line: !1,
                                  modelValue: n.inputMessage,
                                  "onUpdate:modelValue":
                                    t[0] ||
                                    (t[0] = (c) => (n.inputMessage = c)),
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                              [[b, n.status === "userInput"]]
                            ),
                          ]),
                        ]),
                      ]),
                      _: 1,
                    }
                  ),
                  g(
                    p,
                    { span: 4, style: { padding: "0" } },
                    {
                      default: k(() => [
                        g(
                          h,
                          {
                            ref: "sendMsgBtnRef",
                            type: "success",
                            size: "small",
                            disabled: o.sendBtnDisabled,
                            onClick: o.sendUserMsg,
                          },
                          { default: k(() => [Ke]), _: 1 },
                          8,
                          ["disabled", "onClick"]
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              }
            ),
          ]),
        ]),
        n.currentOpenComponent
          ? (a(),
            v(
              _,
              {
                key: 0,
                type: n.currentOpenComponent.type,
                options: n.currentOpenComponent.props,
                onClose: o.handleComponentClose,
              },
              null,
              8,
              ["type", "options", "onClose"]
            ))
          : C("", !0),
      ],
      64
    )
  );
}
var Je = y(Ae, [["render", Ge]]);
const Ye = {
    props: { src: String, title: String },
    setup(e) {
      const t = e,
        s = z();
      F(() => {
        $.getJSON(t.src, (n) => {
          s.value = n;
        });
      });
      function i({ author: n, content: o, type: r }) {
        console.log(n, o, r);
      }
      return (n, o) => (
        a(),
        v(Je, { options: s.value, title: t.title, onMsgClick: i }, null, 8, [
          "options",
          "title",
        ])
      );
    },
  },
  Qe = {
    setup(e) {
      document.title = "Buat Kamu <3";
      const t = "options/preview/chat.json",
        s = "Buat Kamu <3";
      return (i, n) => (
        a(), v(Ye, { src: N(t), title: N(s) }, null, 8, ["src", "title"])
      );
    },
  };
B(Qe).use(X).mount("#app");
