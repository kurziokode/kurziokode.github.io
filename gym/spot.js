document.startViewTransition || document.getElementById("not-support").classList.remove("hidden");
document.addEventListener("astro:page-load", () => {
    for (const n of document.querySelectorAll(".el-to-fade")) n.classList.remove("scale-90")
});
const y = n => history.state && history.replaceState(n, ""),
    b = !!document.startViewTransition,
    p = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
    A = n => document.dispatchEvent(new Event(n)),
    S = () => A("astro:page-load"),
    d = "data-astro-transition-persist";
let u = 0;
history.state ? (u = history.state.index, scrollTo({
    left: 0,
    top: history.state.scrollY
})) : p() && history.replaceState({
    index: u,
    scrollY
}, "");
const k = (n, e) => {
    let t = !1,
        r = !1;
    return (...i) => {
        if (t) {
            r = !0;
            return
        }
        n(...i), t = !0, setTimeout(() => {
            r && (r = !1, n(...i)), t = !1
        }, e)
    }
};
async function x(n) {
    const e = await fetch(n),
        t = await e.text();
    return {
        ok: e.ok,
        html: t
    }
}

function v() {
    const n = document.querySelector('[name="astro-view-transitions-fallback"]');
    return n ? n.getAttribute("content") : "animate"
}

function T() {
    for (const n of document.scripts) n.dataset.astroExec = ""
}

function L() {
    let n = Promise.resolve();
    for (const e of Array.from(document.scripts)) {
        if (e.dataset.astroExec === "") continue;
        const t = document.createElement("script");
        t.innerHTML = e.innerHTML;
        for (const r of e.attributes) {
            if (r.name === "src") {
                const i = new Promise(m => {
                    t.onload = m
                });
                n = n.then(() => i)
            }
            t.setAttribute(r.name, r.value)
        }
        t.dataset.astroExec = "", e.replaceWith(t)
    }
    return n
}

function R(n) {
    const e = n.effect;
    return !e || !(e instanceof KeyframeEffect) || !e.target ? !1 : window.getComputedStyle(e.target, e.pseudoElement).animationIterationCount === "infinite"
}
const q = new DOMParser;
async function w(n, e, t, r) {
    const i = s => {
            const l = s.getAttribute(d),
                f = l && n.head.querySelector(`[${d}="${l}"]`);
            if (f) return f;
            if (s.matches("link[rel=stylesheet]")) {
                const a = s.getAttribute("href");
                return n.head.querySelector(`link[rel=stylesheet][href="${a}"]`)
            }
            if (s.tagName === "SCRIPT") {
                let a = s;
                for (const o of n.scripts)
                    if (a.textContent && a.textContent === o.textContent || a.type === o.type && a.src === o.src) return o
            }
            return null
        },
        m = () => {
            n.querySelectorAll("head noscript").forEach(o => o.remove());
            const s = document.documentElement,
                l = [...s.attributes].filter(({
                    name: o
                }) => (s.removeAttribute(o), o.startsWith("data-astro-")));
            [...n.documentElement.attributes, ...l].forEach(({
                name: o,
                value: c
            }) => s.setAttribute(o, c));
            for (const o of Array.from(document.head.children)) {
                const c = i(o);
                c ? c.remove() : o.remove()
            }
            document.head.append(...n.head.children);
            const f = document.body;
            document.body.replaceWith(n.body);
            for (const o of f.querySelectorAll(`[${d}]`)) {
                const c = o.getAttribute(d),
                    E = document.querySelector(`[${d}="${c}"]`);
                E && E.replaceWith(o)
            }
            scrollTo({
                left: 0,
                top: 0,
                behavior: "instant"
            });
            let a = 0;
            if (!t && e.hash) {
                const o = decodeURIComponent(e.hash.slice(1)),
                    c = document.getElementById(o);
                c && (a = c.offsetTop) && c.scrollIntoView()
            } else t && t.scrollY !== 0 && scrollTo(0, t.scrollY);
            !t && history.pushState({
                index: ++u,
                scrollY: a
            }, "", e.href), A("astro:after-swap")
        },
        h = [];
    for (const s of n.querySelectorAll("head link[rel=stylesheet]"))
        if (!document.querySelector(`[${d}="${s.getAttribute(d)}"], link[rel=stylesheet]`)) {
            const l = document.createElement("link");
            l.setAttribute("rel", "preload"), l.setAttribute("as", "style"), l.setAttribute("href", s.getAttribute("href")), h.push(new Promise(f => {
                ["load", "error"].forEach(a => l.addEventListener(a, f)), document.head.append(l)
            }))
        } if (h.length && await Promise.all(h), r === "animate") {
        const s = document.getAnimations();
        document.documentElement.dataset.astroTransitionFallback = "old";
        const l = document.getAnimations().filter(o => !s.includes(o) && !R(o)),
            f = Promise.all(l.map(o => o.finished)),
            a = () => {
                m(), document.documentElement.dataset.astroTransitionFallback = "new"
            };
        await f, a()
    } else m()
}
async function g(n, e, t) {
    let r;
    const i = e.href,
        {
            html: m,
            ok: h
        } = await x(i);
    if (!h) {
        location.href = i;
        return
    }
    const s = q.parseFromString(m, "text/html");
    if (!s.querySelector('[name="astro-view-transitions-enabled"]')) {
        location.href = i;
        return
    }
    document.documentElement.dataset.astroTransition = n, b ? r = document.startViewTransition(() => w(s, e, t)).finished : r = w(s, e, t, v());
    try {
        await r
    } finally {
        await L(), T(), S()
    }
}

function P(n) {
    if (document.querySelector(`link[rel=prefetch][href="${n}"]`)) return;
    if (navigator.connection) {
        let t = navigator.connection;
        if (t.saveData || /(2|3)g/.test(t.effectiveType || "")) return
    }
    let e = document.createElement("link");
    e.setAttribute("rel", "prefetch"), e.setAttribute("href", n), document.head.append(e)
}
if (b || v() !== "none") {
    T(), document.addEventListener("click", e => {
        let t = e.target;
        if (t instanceof Element && t.tagName !== "A" && (t = t.closest("a")), !(!t || !(t instanceof HTMLAnchorElement) || t.dataset.astroReload !== void 0 || t.hasAttribute("download") || !t.href || t.target && t.target !== "_self" || t.origin !== location.origin || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented || !p())) {
            if (location.pathname === t.pathname && location.search === t.search) {
                if (t.hash) return;
                if (e.preventDefault(), y({
                        ...history.state,
                        scrollY
                    }), scrollTo({
                        left: 0,
                        top: 0,
                        behavior: "instant"
                    }), location.hash) {
                    const r = {
                        index: ++u,
                        scrollY: 0
                    };
                    history.pushState(r, "", t.href)
                }
                return
            }
            e.preventDefault(), y({
                index: u,
                scrollY
            }), g("forward", new URL(t.href))
        }
    }), addEventListener("popstate", e => {
        if (!p() && e.state) {
            history.scrollRestoration && (history.scrollRestoration = "manual"), location.reload();
            return
        }
        if (e.state === null) {
            history.scrollRestoration && (history.scrollRestoration = "auto");
            return
        }
        history.scrollRestoration && (history.scrollRestoration = "manual");
        const t = history.state,
            r = t.index,
            i = r > u ? "forward" : "back";
        u = r, g(i, new URL(location.href), t)
    }), ["mouseenter", "touchstart", "focus"].forEach(e => {
        document.addEventListener(e, t => {
            if (t.target instanceof HTMLAnchorElement) {
                let r = t.target;
                r.origin === location.origin && r.pathname !== location.pathname && p() && P(r.pathname)
            }
        }, {
            passive: !0,
            capture: !0
        })
    }), addEventListener("load", S);
    const n = () => {
        y({
            ...history.state,
            scrollY
        })
    };
    "onscrollend" in window ? addEventListener("scrollend", n) : addEventListener("scroll", k(n, 300))
}