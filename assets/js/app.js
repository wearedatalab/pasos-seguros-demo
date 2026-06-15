/* ============================================================
   PASOS SEGUROS — lógica del prototipo (vanilla JS)
   Router + onboarding + i18n en vivo + offline + TTS + backoffice
   ============================================================ */
(function () {
  "use strict";

  const DATA = window.PS_DATA;
  const I18N = window.PS_I18N;
  const app = document.getElementById("app");
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------------- Iconos (stroke 2px, universales) ---------------- */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    directory: '<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 9h4a1 1 0 0 1 1 1v11"/><path d="M2 21h20"/><path d="M8 8h3M8 12h3M8 16h3"/><path d="M12 4v3"/>',
    care: '<path d="M19 14c1.5-1.6 2.5-3.2 2.5-5A4 4 0 0 0 14 6a4 4 0 0 0-7.5 3c0 1.8 1 3.4 2.5 5"/><path d="M4 17.5h4l1.5-2.5 2 5 2-4 1 1.5H20"/>',
    emergency: '<path d="M12 3v18M3 12h18" transform="rotate(0 12 12)"/><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>',
    cross: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 7.5v9M7.5 12h9"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9.5A1.7 1.7 0 0 0 11 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.2a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
    back: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    pinoff: '<path d="M2 2l20 20"/><path d="M8.5 8.6A8 8 0 0 0 4 10c0 6 8 12 8 12a26 26 0 0 0 4-3.8"/><path d="M17.6 13.6A14 14 0 0 0 20 10a8 8 0 0 0-12.8-6.4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    shieldcheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    wifioff: '<path d="M1 1l22 22"/><path d="M16.7 13.9a5 5 0 0 0-7.4 0"/><path d="M5 12.6a10 10 0 0 1 4-2.3"/><path d="M2 8.8a15 15 0 0 1 5.2-3"/><path d="M22 8.8a15 15 0 0 0-5-3"/><path d="M12 20h.01"/>',
    wifi: '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 20h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkcircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    download: '<path d="M12 3v12"/><path d="m7 11 5 4 5-4"/><path d="M4 21h16"/>',
    listen: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    stop: '<rect x="5" y="5" width="14" height="14" rx="3"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6"/><path d="M10 11v6M14 11v6"/>',
    install: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M12 7v6"/><path d="m9.5 11 2.5 2.5 2.5-2.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    edit: '<path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    lang: '<path d="M5 8h10M9 4v2"/><path d="M11 8c0 4-3 7-7 9"/><path d="M7 11c1.5 2 3.5 3.5 6 4.5"/><path d="m13 20 4-9 4 9M14.5 17h5"/>',
    heart: '<path d="M19 14c1.5-1.6 2.5-3.2 2.5-5A4 4 0 0 0 14 6a4 4 0 0 0-2 .9A4 4 0 0 0 10 6a4 4 0 0 0-4.5 3c0 1.8 1 3.4 2.5 5l4 4 4-4Z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  };
  function icon(name, size = 22, cls = "") {
    const p = ICONS[name] || "";
    return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }

  /* ---------------- Estado + persistencia ---------------- */
  const LS = {
    get(k, d) { try { const v = localStorage.getItem("ps_" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("ps_" + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem("ps_" + k); } catch {} },
  };

  const detectLang = () => {
    const n = (navigator.language || "es").slice(0, 2);
    return ["es", "fr", "en", "ht"].includes(n) ? n : "es";
  };

  const state = {
    onboarded: LS.get("onboarded", false),
    lang: LS.get("lang", detectLang()),
    country: LS.get("country", null),
    avatar: LS.get("avatar", DATA.avatars[0]),
    mode: LS.get("mode", "light"),
    txt: LS.get("txt", 1),
    saved: new Set(LS.get("saved", [])),
    offlineSim: false,
    route: "home",
    params: {},
    ob: 0,
    dirCity: "all",
    dirQuery: "",
    speaking: false,
  };
  const OB_STEPS = ["intro", "language", "country", "avatar", "welcome"];

  /* ---------------- i18n ---------------- */
  function t(key) {
    const s = I18N.strings;
    return (s[state.lang] && s[state.lang][key]) || s.es[key] || key;
  }
  const country = () => DATA.countries.find(c => c.code === state.country) || null;
  // Indicador de país universal (pin) — sin banderas políticas, renderiza en todas las plataformas
  const cn = (c) => `${icon("pin", 14)} ${esc(c.name)}`;

  /* ---------------- Conexión ---------------- */
  const isOnline = () => !state.offlineSim && navigator.onLine;

  /* ---------------- Util ---------------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  function applyRoot() {
    app.setAttribute("data-mode", state.mode === "dark" ? "dark" : "light");
    app.style.setProperty("--txt-scale", state.txt === 3 ? 1.26 : state.txt === 2 ? 1.12 : 1);
  }

  /* ============================================================
     ONBOARDING
     ============================================================ */
  function renderOnboarding() {
    const step = OB_STEPS[state.ob];
    statusbarDark(true);
    updateExplain("ob-" + step);
    if (step === "intro") return obIntro();
    if (step === "welcome") return obWelcome();
    return obChoice(step);
  }

  function dots(active) {
    return `<div class="ob__steps">${[1, 2, 3].map(i => `<i class="${i <= active ? "on" : ""}"></i>`).join("")}</div>`;
  }
  const privacyLine = () => `<div class="ob__privacy">${icon("lock" in ICONS ? "shield" : "shield", 16)}<span>${esc(t("avatarHint"))} · ${state.lang === "es" ? "Sin documentos" : ""}</span></div>`;

  function obIntro() {
    app.innerHTML = `
      <div class="ob fade-enter">
        <div class="ob__body" style="display:flex;flex-direction:column;justify-content:center;text-align:center;align-items:center;padding-top:40px;">
          <img src="assets/img/logo-mark.svg" alt="" style="width:96px;height:96px;border-radius:26px;box-shadow:var(--shadow-lg);margin-bottom:24px;" class="pop"/>
          <div class="ob__kicker">Profamilia · ${esc(t("demoBadge"))}</div>
          <h1 class="ob__title" style="font-size:2.1rem;margin-top:10px;">${esc(t("appName"))}</h1>
          <p class="ob__sub" style="text-align:center;">${esc(t("tagline"))}</p>
          <div class="trust" style="margin-top:26px;text-align:left;max-width:320px;">
            ${icon("shieldcheck", 22)}
            <div><b>${esc(t("privacyTitle"))}</b><p>${esc(t("privacyBody"))}</p></div>
          </div>
        </div>
        <div class="ob__foot">
          <button class="btn" data-act="ob-next">${esc(t("continue"))}</button>
          <button class="btn btn--ghost-light" style="margin-top:10px" data-act="install">${icon("install", 18)} ${esc(t("installApp"))}</button>
        </div>
      </div>`;
  }

  function obChoice(step) {
    let body = "", title = "", sub = "", active = 1;
    if (step === "language") {
      active = 1; title = t("chooseLanguage"); sub = t("privacyBody");
      body = I18N.languages.map(l => optRow(l.native, l.label, "globe", state.lang === l.code, `lang:${l.code}`)).join("");
    } else if (step === "country") {
      active = 2; title = t("chooseCountry"); sub = t("openMap");
      body = DATA.regions.map(r => {
        const cs = DATA.countries.filter(c => c.regionId === r.id);
        return `<div class="ob__group"><h4>${esc(r.name)}</h4>${cs.map(c =>
          optRow(c.name, citiesPreview(c), "pin", state.country === c.code, `country:${c.code}`, null)).join("")}</div>`;
      }).join("");
    } else if (step === "avatar") {
      active = 3; title = t("chooseAvatar"); sub = t("avatarHint");
      body = `<div class="avatars">${DATA.avatars.map(a =>
        `<button class="avatar ${state.avatar === a ? "" : ""}" aria-pressed="${state.avatar === a}" data-act="avatar:${a}">${a}</button>`).join("")}</div>`;
    }
    const canContinue = step === "language" ? !!state.lang : step === "country" ? !!state.country : !!state.avatar;
    app.innerHTML = `
      <div class="ob">
        <div class="ob__top">
          ${dots(active)}
          <div class="ob__kicker">Paso ${active} / 3</div>
          <h1 class="ob__title">${esc(title)}</h1>
          <p class="ob__sub">${esc(sub)}</p>
        </div>
        <div class="ob__body anim">${body}</div>
        <div class="ob__foot">
          <button class="btn" data-act="ob-next" ${canContinue ? "" : "disabled"}>${esc(t("continue"))}</button>
          ${privacyLine()}
        </div>
      </div>`;
  }

  function citiesPreview(c) {
    const cities = [...new Set(c.sites.map(s => s.city))];
    return cities.slice(0, 2).join(" · ") + (cities.length > 2 ? "…" : "");
  }
  function optRow(title, sub, ic, pressed, act, flag) {
    return `<button class="opt" aria-pressed="${pressed}" data-act="${act}">
      <span class="opt__flag">${flag || (ic ? icon(ic, 26) : "")}</span>
      <span class="opt__txt"><b>${esc(title)}</b><span>${esc(sub || "")}</span></span>
      <span class="opt__check">${icon("check", 16)}</span>
    </button>`;
  }

  function obWelcome() {
    app.innerHTML = `
      <div class="ob fade-enter">
        <div class="ob__body" style="display:flex;flex-direction:column;justify-content:center;text-align:center;align-items:center;">
          <div class="avatar greet" aria-pressed="true" style="width:96px;height:96px;font-size:3rem;border-color:var(--action);background:rgba(120,190,35,.2);margin-bottom:20px;">${state.avatar}</div>
          <div class="ob__kicker">${country() ? cn(country()) : ""}</div>
          <h1 class="ob__title" style="font-size:1.9rem;">${state.lang === "es" ? "Todo listo" : state.lang === "fr" ? "Tout est prêt" : state.lang === "en" ? "All set" : "Tout pare"}</h1>
          <div class="trust" style="margin-top:22px;text-align:left;max-width:330px;">
            ${icon("shieldcheck", 22)}
            <div><b>${esc(t("privacyTitle"))}</b><p>${esc(t("privacyBody"))}</p></div>
          </div>
        </div>
        <div class="ob__foot">
          <button class="btn" data-act="ob-finish">${state.lang === "es" ? "Comenzar" : state.lang === "fr" ? "Commencer" : state.lang === "en" ? "Start" : "Kòmanse"}</button>
        </div>
      </div>`;
  }

  /* ============================================================
     APP PRINCIPAL — router
     ============================================================ */
  const VIEWS = {
    home: vHome, directory: vDirectory, venue: vVenue, selfcare: vSelfcare,
    articles: vArticles, article: vArticle, emergency: vEmergency, settings: vSettings, saved: vSaved,
  };

  function render() {
    applyRoot();
    if (!state.onboarded) { renderOnboarding(); updateNetBanner(); return; }
    const view = VIEWS[state.route] || vHome;
    const showNav = !["venue", "article"].includes(state.route);
    app.innerHTML = (showNav ? nav() : "") + view(state.params);
    const sc = $(".screen", app);
    if (sc) sc.classList.add("view-enter");
    if (state.route === "directory") bindDirectory();
    updateExplain(state.route);
    updateNetBanner();
  }

  function nav() {
    const items = [
      { r: "home", ic: "home", label: t("home") },
      { r: "directory", ic: "directory", label: t("directory") },
      { r: "selfcare", ic: "care", label: t("selfcare") },
      { r: "emergency", ic: "cross", label: t("emergency"), emg: true },
      { r: "settings", ic: "settings", label: t("settings") },
    ];
    return `<nav class="topnav">${items.map(it => {
      const cur = state.route === it.r
        || (it.r === "directory" && state.route === "venue")
        || (it.r === "selfcare" && ["articles", "article"].includes(state.route))
        || (it.r === "settings" && state.route === "saved");
      return `<button class="navbtn ${it.emg ? "navbtn--emg" : ""}" ${cur ? 'aria-current="page"' : ""} data-act="nav:${it.r}">
        ${icon(it.ic, 22)}<span>${esc(it.label)}</span></button>`;
    }).join("")}</nav>`;
  }

  function statusbarDark(on) {
    const sb = document.getElementById("statusbar");
    if (sb) sb.classList.toggle("on-paper", !on);
  }

  /* ---------------- HOME / HUB ---------------- */
  function vHome() {
    statusbarDark(true);
    const c = country();
    const savedCount = state.saved.size;
    const hi = state.lang === "es" ? "Hola" : state.lang === "fr" ? "Bonjour" : state.lang === "en" ? "Hello" : "Bonjou";
    const leadTxt = state.lang === "es" ? `¿Qué necesitas <span>hoy</span>?` :
      state.lang === "fr" ? `De quoi as-tu <span>besoin</span> ?` :
      state.lang === "en" ? `What do you <span>need</span>?` : `Kisa ou <span>bezwen</span>?`;
    const tip = state.lang === "es" ? "Tu información de salud es confidencial. En cualquier punto de atención puedes preguntar sin dar tu nombre."
      : state.lang === "fr" ? "Tes informations de santé sont confidentielles. Dans tout point d'accueil tu peux demander sans donner ton nom."
      : state.lang === "en" ? "Your health information is confidential. At any care point you can ask without giving your name."
      : "Enfòmasyon sante w konfidansyèl. Nan nenpòt pwen asistans ou ka mande san bay non w.";
    return `<div class="screen screen--dark"><div class="hub">
      <div class="hub__head">
        <div class="hub__avatar">${state.avatar}</div>
        <div>
          <div class="hub__hi">${esc(hi)}</div>
          <div class="hub__country">${c ? cn(c) : esc(t("chooseCountry"))}</div>
        </div>
      </div>
      <div class="hub__statusrow">
        ${offlineBadge(true)}
        <span class="badge badge--lang">${icon("globe", 14)} ${esc(I18N.languages.find(l => l.code === state.lang).native)}</span>
      </div>
      <div class="hub__lead">${leadTxt}</div>
      <div class="tiles stagger">
        <button class="tile tile--dir" data-act="nav:directory">
          <div class="tile__ic">${icon("directory", 26)}</div>
          <div><div class="tile__t">${esc(t("pointsNearby"))}</div><div class="tile__d">${countSites()} ${state.lang === "es" ? "sedes en " + (c ? c.name : "") : ""}</div></div>
        </button>
        <button class="tile tile--care" data-act="nav:selfcare">
          <div class="tile__ic">${icon("care", 26)}</div>
          <div><div class="tile__t">${esc(t("selfcare"))}</div><div class="tile__d">${DATA.articles.length} ${t("readingTime").includes("min") ? (state.lang === "es" ? "guías" : "guides") : ""}</div></div>
        </button>
        <button class="tile tile--saved" data-act="nav:saved">
          <div class="tile__ic">${icon("download", 26)}</div>
          <div><div class="tile__count">${savedCount}</div><div class="tile__d">${esc(t("savedForOffline"))}</div></div>
        </button>
        <button class="tile tile--info" data-act="nav:settings">
          <div class="tile__ic">${icon("info", 26)}</div>
          <div><div class="tile__t">${esc(t("about"))}</div><div class="tile__d">${state.lang === "es" ? "Privacidad e idioma" : ""}</div></div>
        </button>
      </div>
      <div class="hub__tipcard">
        <div class="eyebrow">${icon("sparkle", 13)} ${state.lang === "es" ? "Para tu tranquilidad" : state.lang === "fr" ? "Pour ta tranquillité" : state.lang === "en" ? "Peace of mind" : "Pou kè poze w"}</div>
        <p>${esc(tip)}</p>
      </div>
    </div></div>`;
  }
  const countSites = () => { const c = country(); return c ? c.sites.length : 0; };

  function offlineBadge(onDark) {
    const cls = onDark ? "offbadge offbadge--ondark" : "offbadge";
    if (isOnline()) return `<span class="${cls}">${icon("checkcircle", 14)} ${state.lang === "es" ? "Disponible sin señal" : state.lang === "fr" ? "Dispo hors ligne" : state.lang === "en" ? "Works offline" : "Disponib san siyal"}</span>`;
    return `<span class="${cls}">${icon("wifioff", 14)} ${state.lang === "es" ? "Sin conexión · viendo lo guardado" : state.lang === "fr" ? "Hors ligne" : state.lang === "en" ? "Offline · saved view" : "San koneksyon"}</span>`;
  }

  /* ---------------- DIRECTORIO ---------------- */
  function vDirectory() {
    statusbarDark(true);
    const c = country();
    if (!c) return wrapDark(`<div class="screen__pad">${emptyState(t("chooseCountry"))}</div>`);
    return `<div class="screen">
      <div class="hero">
        <div class="hero__top">
          <span class="hero__eyebrow">${icon("directory", 14)} ${esc(t("directory"))}</span>
          <span class="appbar__spacer"></span>
          <button class="chip" data-act="open-country" style="height:38px;background:rgba(252,255,221,.12);border-color:rgba(252,255,221,.2);color:var(--on-dark)">${cn(c)} ${icon("chevron", 14)}</button>
        </div>
        <h1 class="hero__title">${esc(t("pointsNearby"))}</h1>
        <p class="hero__sub">${esc(c.name)} · ${c.sites.length} ${state.lang === "es" ? "sedes de muestra" : "sites"}</p>
      </div>
      <div class="screen__pad">
        <div class="demo-ribbon">${icon("info", 16)} ${esc(t("demoBadge"))} · ${state.lang === "es" ? "datos de ejemplo, no reales" : state.lang === "fr" ? "données d'exemple" : state.lang === "en" ? "sample data" : "done egzanp"}</div>
        <div class="search">${icon("search", 20)}<input id="dir-search" type="search" placeholder="${esc(t("search"))}" value="${esc(state.dirQuery)}" /></div>
        <div class="chip__row" id="dir-cities">${cityChips(c)}</div>
        <div id="dir-list">${siteRows(c)}</div>
      </div>
    </div>`;
  }
  function cityChips(c) {
    const cities = [...new Set(c.sites.map(s => s.city))];
    const chip = (val, label) => `<button class="chip" aria-pressed="${state.dirCity === val}" data-city="${esc(val)}">${esc(label)}</button>`;
    return chip("all", t("allCities")) + cities.map(ci => chip(ci, ci)).join("");
  }
  function siteRows(c) {
    const q = state.dirQuery.trim().toLowerCase();
    let sites = c.sites.map((s, i) => ({ s, i }));
    if (state.dirCity !== "all") sites = sites.filter(x => x.s.city === state.dirCity);
    if (q) sites = sites.filter(x => (x.s.name + " " + x.s.city + " " + x.s.services.join(" ")).toLowerCase().includes(q));
    if (!sites.length) return emptyState(state.lang === "es" ? "No hay resultados." : "No results.");
    return sites.map(({ s, i }) => {
      const id = `site:${c.code}:${i}`;
      const sv = state.saved.has(id) ? "is-saved" : "";
      return `<button class="row ${sv}" data-act="venue:${c.code}:${i}">
        <span class="row__ic">${icon("directory", 22)}</span>
        <span class="row__body">
          <span class="row__title">${esc(s.name)}</span>
          <span class="row__meta"><span>${esc(s.org)}</span><span>${icon("pin", 13)} ${esc(s.city)}</span><span class="num">${icon("clock", 13)} ${esc(shortHours(s.hours))}</span></span>
        </span>
        <span class="row__chev">${icon("chevron", 20)}</span>
      </button>`;
    }).join("");
  }
  const shortHours = (h) => h.split("·")[0].trim();

  function bindDirectory() {
    const inp = $("#dir-search", app);
    if (inp) inp.addEventListener("input", e => { state.dirQuery = e.target.value; const c = country(); $("#dir-list", app).innerHTML = siteRows(c); });
  }

  /* ---------------- FICHA DE SEDE ---------------- */
  function vVenue(p) {
    statusbarDark(true);
    const c = DATA.countries.find(x => x.code === p.code);
    const s = c.sites[p.idx];
    const id = `site:${c.code}:${p.idx}`;
    const saved = state.saved.has(id);
    return `<div class="screen">
      <div class="hero">
        <div class="hero__top">
          <button class="backbtn backbtn--light" data-act="back">${icon("back", 18)} ${esc(t("back"))}</button>
        </div>
        <div class="hero__eyebrow">${esc(s.org)}</div>
        <h1 class="hero__title">${esc(s.name)}</h1>
        <p class="hero__sub">${icon("pin", 14)} ${esc(s.city)}</p>
      </div>
      <div class="screen__pad">
        <div class="demo-ribbon">${icon("info", 16)} ${esc(t("demoBadge"))} · ${state.lang === "es" ? "datos de ejemplo" : "sample"}</div>
        <div class="card" style="padding:4px 16px;">
          ${infoLine("pin", state.lang === "es" ? "Dirección" : "Address", esc(s.address))}
          ${infoLine("clock", t("hoursLabel"), esc(s.hours), true)}
          ${infoLine("phone", t("phoneLabel"), `<a href="tel:${s.phone.replace(/\s/g,'')}" style="color:var(--action-700);font-weight:700">${esc(s.phone)}</a>`, true)}
          ${infoLine("globe", t("servicesLabel"), `<div class="service-tags">${s.services.map(x => `<span class="service-tag">${esc(x)}</span>`).join("")}</div>`)}
          ${infoLine("users", state.lang === "es" ? "Idiomas de atención" : "Languages", esc(s.languages.join(" · ")))}
        </div>
        <div class="map-disabled">${icon("pinoff", 22)}<p>${esc(t("openMap"))}</p></div>
        <button class="save-toggle ${saved ? "is-saved" : ""}" data-act="save:${id}">
          <span class="save-toggle__ic">${icon(saved ? "checkcircle" : "download", 22)}</span>
          <span class="save-toggle__txt"><b>${esc(saved ? t("downloadedReady") : t("saveForOffline"))}</b><span>${state.lang === "es" ? "Disponible aunque te quedes sin señal" : ""}</span></span>
          <span class="switch ${saved ? "on" : ""}"></span>
        </button>
        <div class="sticky-actions">
          <a class="btn" href="tel:${s.phone.replace(/\s/g,'')}">${icon("phone", 20)} ${esc(t("callNow"))}</a>
        </div>
      </div>
    </div>`;
  }
  function infoLine(ic, k, v, num) {
    return `<div class="info-line"><span class="info-line__ic">${icon(ic, 20)}</span>
      <span><span class="info-line__k">${esc(k)}</span><div class="info-line__v ${num ? "num" : ""}">${v}</div></span></div>`;
  }

  /* ---------------- AUTOCUIDADO ---------------- */
  function vSelfcare() {
    statusbarDark(true);
    return `<div class="screen">
      <div class="hero">
        <div class="hero__top"><span class="hero__eyebrow">${icon("care", 14)} ${esc(t("selfcare"))}</span></div>
        <h1 class="hero__title">${state.lang === "es" ? "Cuidarte es tu derecho" : state.lang === "fr" ? "Prendre soin de toi est ton droit" : state.lang === "en" ? "Caring for yourself is your right" : "Pran swen tèt ou se dwa w"}</h1>
        <p class="hero__sub">${esc(t("categoriesTitle"))} · ${DATA.articles.length} ${state.lang === "es" ? "guías breves" : "guides"}</p>
      </div>
      <div class="screen__pad stagger">
        <div class="demo-ribbon">${icon("info", 16)} ${esc(t("demoBadge"))} · ${state.lang === "es" ? "contenido de ejemplo" : "sample content"}</div>
        ${DATA.categories.map(cat => {
          const n = DATA.articles.filter(a => a.categoryId === cat.id).length;
          return `<button class="row" data-act="articles:${cat.id}">
            <span class="row__ic row__ic--care">${icon("heart", 22)}</span>
            <span class="row__body"><span class="row__title">${esc(cat.name)}</span><span class="row__meta">${esc(cat.blurb)}</span></span>
            <span class="row__chev">${icon("chevron", 20)}</span></button>`;
        }).join("")}
      </div>
    </div>`;
  }

  function vArticles(p) {
    statusbarDark(true);
    const cat = DATA.categories.find(c => c.id === p.cat);
    const arts = DATA.articles.filter(a => a.categoryId === cat.id);
    return `<div class="screen">
      <div class="hero">
        <div class="hero__top"><button class="backbtn backbtn--light" data-act="back">${icon("back", 18)} ${esc(t("back"))}</button></div>
        <h1 class="hero__title">${esc(cat.name)}</h1>
        <p class="hero__sub">${esc(cat.blurb)}</p>
      </div>
      <div class="screen__pad stagger">
        ${arts.map(a => {
          const id = `art:${a.id}`;
          const ct = articleContent(a);
          return `<button class="row ${state.saved.has(id) ? "is-saved" : ""}" data-act="article:${a.id}">
            <span class="row__ic row__ic--care">${icon("file", 22)}</span>
            <span class="row__body"><span class="row__title">${esc(ct.title)}</span><span class="row__meta"><span class="num">${icon("clock", 13)} ${a.readingMinutes} ${esc(t("readingTime"))}</span>${state.saved.has(id) ? `<span style="color:var(--action-700);font-weight:700">${icon("checkcircle", 13)} ${esc(t("savedForOffline"))}</span>` : ""}</span></span>
            <span class="row__chev">${icon("chevron", 20)}</span></button>`;
        }).join("")}
      </div>
    </div>`;
  }

  function articleContent(a) {
    const tr = I18N.articleTranslations[a.id];
    if (state.lang !== "es" && tr && tr[state.lang]) return { title: tr[state.lang].title, body: tr[state.lang].body, translated: true };
    return { title: a.title, body: a.body, translated: state.lang === "es" };
  }

  function vArticle(p) {
    statusbarDark(false);
    const a = DATA.articles.find(x => x.id === p.id);
    const ct = articleContent(a);
    const id = `art:${a.id}`;
    const saved = state.saved.has(id);
    const note = !ct.translated ? `<div class="article-langnote">${icon("globe", 16)} ${state.lang === "fr" ? "Cette fiche n'est pas encore traduite ; affichée en espagnol." : state.lang === "en" ? "This guide is not translated yet; shown in Spanish." : state.lang === "ht" ? "Gid sa a poko tradui; li parèt an panyòl." : ""}</div>` : "";
    return `<div class="screen">
      <div class="appbar appbar--onpaper">
        <button class="backbtn" data-act="back">${icon("back", 18)} ${esc(t("back"))}</button>
        <span class="appbar__spacer"></span>
        <div class="txtsize onpaper">${[1, 2, 3].map(n => `<button class="${state.txt === n ? "on" : ""}" data-act="txt:${n}">A${n === 2 ? "+" : n === 3 ? "++" : ""}</button>`).join("")}</div>
      </div>
      <div class="screen__pad">
        <div class="article-head">
          <div class="eyebrow">${esc((DATA.categories.find(c => c.id === a.categoryId) || {}).name || "")}</div>
          <h1>${esc(ct.title)}</h1>
          <div class="meta"><span class="num">${icon("clock", 15)} ${a.readingMinutes} ${esc(t("readingTime"))}</span></div>
        </div>
        <div class="article-tools">
          <button class="btn btn--sm ${state.speaking ? "btn--ghost" : ""}" data-act="listen:${a.id}" id="btn-listen">${icon(state.speaking ? "stop" : "listen", 18)} ${state.speaking ? (state.lang === "es" ? "Detener" : "Stop") : (state.lang === "es" ? "Escuchar" : state.lang === "fr" ? "Écouter" : state.lang === "en" ? "Listen" : "Koute")}</button>
          <button class="btn btn--sm btn--ghost" data-act="save:${id}" style="width:auto">${icon(saved ? "checkcircle" : "download", 18)} ${esc(saved ? t("downloadedReady") : t("saveOffline"))}</button>
        </div>
        ${note}
        <div class="article-body">${ct.body.split(/\n\n+/).map(par => `<p>${esc(par)}</p>`).join("")}</div>
        <div class="demo-ribbon">${icon("info", 16)} ${esc(t("demoBadge"))} · ${state.lang === "es" ? "contenido orientativo de ejemplo" : "sample content"}</div>
      </div>
    </div>`;
  }

  function vSaved() {
    statusbarDark(true);
    const items = [...state.saved];
    const body = items.length ? items.map(id => savedRow(id)).join("") : emptyState(state.lang === "es" ? "Aún no guardaste nada para usar sin conexión. Toca \"Guardar\" en una sede o guía." : "Nothing saved yet.");
    return `<div class="screen">
      <div class="hero"><div class="hero__top"><button class="backbtn backbtn--light" data-act="back">${icon("back", 18)} ${esc(t("back"))}</button></div>
      <h1 class="hero__title">${esc(t("savedForOffline"))}</h1><p class="hero__sub">${items.length} ${state.lang === "es" ? "elementos disponibles sin señal" : "items offline"}</p></div>
      <div class="screen__pad stagger">${body}</div></div>`;
  }
  function savedRow(id) {
    if (id.startsWith("art:")) {
      const a = DATA.articles.find(x => x.id === id.slice(4));
      if (!a) return "";
      const ct = articleContent(a);
      return `<button class="row is-saved" data-act="article:${a.id}"><span class="row__ic row__ic--care">${icon("file", 22)}</span><span class="row__body"><span class="row__title">${esc(ct.title)}</span><span class="row__meta">${esc(t("selfcare"))}</span></span><span class="row__chev">${icon("chevron", 20)}</span></button>`;
    }
    const [, code, idx] = id.split(":");
    const c = DATA.countries.find(x => x.code === code); const s = c && c.sites[idx];
    if (!s) return "";
    return `<button class="row is-saved" data-act="venue:${code}:${idx}"><span class="row__ic">${icon("directory", 22)}</span><span class="row__body"><span class="row__title">${esc(s.name)}</span><span class="row__meta">${cn(c)} · ${esc(s.city)}</span></span><span class="row__chev">${icon("chevron", 20)}</span></button>`;
  }

  /* ---------------- EMERGENCIA ---------------- */
  function vEmergency() {
    statusbarDark(true);
    const c = country();
    const lines = c ? c.emergency : [];
    return `<div class="screen"><div class="emg-screen">
      <div class="emg-hero">
        <div class="emg-hero__ic">${icon("cross", 30)}</div>
        <h1>${esc(t("emergencyTitle"))}</h1>
        <p>${esc(t("emergencyBody"))}</p>
      </div>
      <div class="emg-list">
        ${lines.map(l => `<a class="emg-line" href="tel:${l.number.replace(/\s/g,'')}">
          <span class="emg-line__ic">${icon("phone", 24)}</span>
          <span class="emg-line__body"><b>${esc(l.label)}</b><span class="emg-line__num">${esc(l.number)}</span><br><span class="emg-line__note">${esc(l.note)}</span></span>
          <span class="emg-line__call">${icon("phone", 22)}</span>
        </a>`).join("")}
        ${c ? "" : emptyState(t("chooseCountry"))}
        <p style="font-size:.8rem;color:var(--on-dark-soft);margin-top:12px;line-height:1.5;">${icon("info", 14)} ${esc(t("demoBadge"))} · ${state.lang === "es" ? "Líneas públicas reales se muestran como ejemplo; las marcadas “demo” son ficticias." : state.lang === "fr" ? "Exemples ; les lignes « demo » sont fictives." : state.lang === "en" ? "Examples; “demo” lines are fictional." : "Egzanp; liy “demo” yo se fiksyon."}</p>
      </div>
    </div></div>`;
  }

  /* ---------------- AJUSTES ---------------- */
  function vSettings() {
    statusbarDark(true);
    const c = country();
    const lang = I18N.languages.find(l => l.code === state.lang);
    return `<div class="screen">
      <div class="hero"><div class="hero__top"><span class="hero__eyebrow">${icon("settings", 14)} ${esc(t("settings"))}</span></div>
        <h1 class="hero__title">${esc(t("settings"))}</h1></div>
      <div class="screen__pad stagger">
        <div class="privacy-card">
          <div class="ic">${icon("shieldcheck", 24)}</div>
          <h3>${esc(t("privacyTitle"))}</h3>
          <p>${esc(t("privacyBody"))}</p>
        </div>

        <div class="set-group">
          <button class="set-row" data-act="open-lang">
            <span class="set-row__ic">${icon("globe", 20)}</span>
            <span class="set-row__body"><b>${esc(t("changeLanguage"))}</b><span>${esc(t("chooseLanguage"))}</span></span>
            <span class="set-row__val">${esc(lang.native)} ${icon("chevron", 16)}</span>
          </button>
          <button class="set-row" data-act="open-country">
            <span class="set-row__ic">${icon("pin", 20)}</span>
            <span class="set-row__body"><b>${esc(t("changeCountry"))}</b><span>${esc(t("chooseCountry"))}</span></span>
            <span class="set-row__val">${c ? cn(c) : "—"} ${icon("chevron", 16)}</span>
          </button>
        </div>

        <div class="set-group">
          <button class="set-row" data-act="toggle-mode">
            <span class="set-row__ic">${icon(state.mode === "dark" ? "sun" : "sun", 20)}</span>
            <span class="set-row__body"><b>${state.lang === "es" ? "Modo ahorro / sol" : state.lang === "fr" ? "Mode éco / soleil" : state.lang === "en" ? "Save / sun mode" : "Mòd ekonomi"}</b><span>${state.lang === "es" ? "Más legible al sol y ahorra batería" : "Sun & battery"}</span></span>
            <span class="switch ${state.mode === "dark" ? "on" : ""}"></span>
          </button>
          <div class="set-row">
            <span class="set-row__ic">${icon("file", 20)}</span>
            <span class="set-row__body"><b>${state.lang === "es" ? "Tamaño del texto" : state.lang === "fr" ? "Taille du texte" : state.lang === "en" ? "Text size" : "Gwosè tèks"}</b></span>
            <span class="txtsize onpaper">${[1, 2, 3].map(n => `<button class="${state.txt === n ? "on" : ""}" data-act="txt:${n}">A${n === 2 ? "+" : n === 3 ? "++" : ""}</button>`).join("")}</span>
          </div>
        </div>

        <div class="set-group">
          <button class="set-row" data-act="install">
            <span class="set-row__ic">${icon("install", 20)}</span>
            <span class="set-row__body"><b>${esc(t("installApp"))}</b><span>${esc(t("installHint"))}</span></span>
            ${icon("chevron", 16)}
          </button>
          <button class="set-row" data-act="toggle-offline">
            <span class="set-row__ic">${icon("wifioff", 20)}</span>
            <span class="set-row__body"><b>${state.lang === "es" ? "Simular sin conexión" : "Simulate offline"}</b><span>${state.lang === "es" ? "Para probar el modo offline" : ""}</span></span>
            <span class="switch ${state.offlineSim ? "on" : ""}"></span>
          </button>
        </div>

        <div class="set-group">
          <button class="set-row set-row--danger" data-act="quick-exit">
            <span class="set-row__ic">${icon("trash", 20)}</span>
            <span class="set-row__body"><b>${state.lang === "es" ? "Borrar y salir" : state.lang === "fr" ? "Effacer et sortir" : state.lang === "en" ? "Erase and exit" : "Efase epi sòti"}</b><span>${state.lang === "es" ? "Borra tus preferencias de este teléfono" : ""}</span></span>
          </button>
        </div>

        <div class="card" style="background:transparent;border:none;box-shadow:none;padding:8px 4px;">
          <div class="eyebrow">${esc(t("about"))}</div>
          <p class="muted" style="margin:6px 0 0;font-size:.9rem;line-height:1.5;">${esc(t("aboutBody"))}</p>
        </div>
      </div>
    </div>`;
  }

  function emptyState(msg) {
    return `<div style="text-align:center;padding:34px 16px;color:var(--ink-soft);">
      <div style="width:56px;height:56px;border-radius:16px;background:var(--section-wash);display:grid;place-items:center;margin:0 auto 12px;">${icon("info", 26)}</div>
      <p style="margin:0;font-size:.95rem;line-height:1.5;">${esc(msg)}</p></div>`;
  }
  const wrapDark = (inner) => `<div class="screen screen--dark">${inner}</div>`;

  /* ============================================================
     SHEETS (idioma / país)
     ============================================================ */
  function openSheet(title, inner) {
    closeSheet();
    const scrim = document.createElement("div"); scrim.className = "sheet-scrim"; scrim.id = "ps-scrim";
    const sheet = document.createElement("div"); sheet.className = "sheet"; sheet.id = "ps-sheet";
    sheet.innerHTML = `<div class="sheet__grab"></div><h3>${esc(title)}</h3>${inner}`;
    $(".device__screen").appendChild(scrim); $(".device__screen").appendChild(sheet);
    scrim.addEventListener("click", closeSheet);
    requestAnimationFrame(() => { scrim.classList.add("show"); sheet.classList.add("show"); });
  }
  function closeSheet() {
    const s = $("#ps-sheet"), sc = $("#ps-scrim");
    if (s) { s.classList.remove("show"); setTimeout(() => s.remove(), 280); }
    if (sc) { sc.classList.remove("show"); setTimeout(() => sc.remove(), 280); }
  }
  function openLangSheet() {
    openSheet(t("chooseLanguage"), I18N.languages.map(l =>
      optRowPaper(l.native, l.label, state.lang === l.code, `setlang:${l.code}`, icon("globe", 22))).join(""));
  }
  function openCountrySheet() {
    const inner = DATA.regions.map(r => {
      const cs = DATA.countries.filter(c => c.regionId === r.id);
      return `<div class="ob__group"><h4 style="color:var(--ink-faint)">${esc(r.name)}</h4>${cs.map(c =>
        optRowPaper(c.name, citiesPreview(c), state.country === c.code, `setcountry:${c.code}`, icon("pin", 22), null)).join("")}</div>`;
    }).join("");
    openSheet(t("chooseCountry"), inner);
  }
  function optRowPaper(title, sub, pressed, act, ic, flag) {
    return `<button class="row" data-act="${act}" style="${pressed ? "border-color:var(--action);background:var(--action-wash)" : ""}">
      <span class="row__ic">${flag ? `<span style="font-size:1.4rem">${flag}</span>` : ic}</span>
      <span class="row__body"><span class="row__title">${esc(title)}</span><span class="row__meta">${esc(sub || "")}</span></span>
      ${pressed ? `<span style="color:var(--action-700)">${icon("checkcircle", 22)}</span>` : icon("chevron", 20)}
    </button>`;
  }

  /* ============================================================
     TTS (lectura por voz)
     ============================================================ */
  const VOICE = { es: "es-ES", fr: "fr-FR", en: "en-US", ht: "fr-FR" };
  function toggleListen(artId) {
    if (!("speechSynthesis" in window)) { toast(state.lang === "es" ? "Voz no disponible en este navegador" : "Voice not available"); return; }
    if (state.speaking) { window.speechSynthesis.cancel(); state.speaking = false; render(); return; }
    const a = DATA.articles.find(x => x.id === artId); const ct = articleContent(a);
    const u = new SpeechSynthesisUtterance(ct.title + ". " + ct.body);
    u.lang = VOICE[state.lang] || "es-ES"; u.rate = 0.96;
    u.onend = () => { state.speaking = false; const b = $("#btn-listen"); if (b) render(); };
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    state.speaking = true; render();
  }

  /* ============================================================
     OFFLINE / BANNER / TOAST
     ============================================================ */
  const netbanner = document.getElementById("netbanner");
  let bannerTimer = null;
  function updateNetBanner() {
    const sb = document.getElementById("statusbar"); const wifi = document.getElementById("sb-wifi");
    if (wifi) wifi.style.opacity = isOnline() ? "1" : ".3";
  }
  function flashBanner(online) {
    clearTimeout(bannerTimer);
    netbanner.className = "netbanner show " + (online ? "netbanner--on" : "netbanner--off");
    netbanner.innerHTML = `${icon(online ? "wifi" : "wifioff", 16)} ${esc(online ? t("onlineBanner") : t("offlineBanner"))}`;
    if (online) bannerTimer = setTimeout(() => netbanner.classList.remove("show"), 2600);
  }
  function toast(msg, ic = "checkcircle") {
    const el = document.getElementById("toast");
    el.innerHTML = `${icon(ic, 18)} ${esc(msg)}`;
    el.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ============================================================
     INSTALL PROMPT
     ============================================================ */
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; });
  async function doInstall() {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
    else toast(state.lang === "es" ? 'Abre el menú del navegador y elige "Añadir a pantalla de inicio"' : 'Use browser menu → "Add to Home screen"', "install");
  }

  /* ============================================================
     ACCIONES (delegación)
     ============================================================ */
  // Delegación en .device__screen (no en #app) para cubrir también las hojas inferiores,
  // que se montan como hermanas de #app dentro de la pantalla del dispositivo.
  document.querySelector(".device__screen").addEventListener("click", e => {
    const btn = e.target.closest("[data-act],[data-city]");
    if (!btn) return;
    const city = btn.getAttribute("data-city");
    if (city !== null) { state.dirCity = city; const c = country(); $("#dir-cities", app).innerHTML = cityChips(c); $("#dir-list", app).innerHTML = siteRows(c); return; }
    const act = btn.getAttribute("data-act");
    const [cmd, ...rest] = act.split(":");

    // Onboarding
    if (act === "ob-next") { state.ob++; persist(); renderOnboarding(); return; }
    if (act === "ob-finish") { state.onboarded = true; persist(); navStack = []; state.route = "home"; render(); return; }
    if (cmd === "lang") { state.lang = rest[0]; persist(); renderOnboarding(); return; }
    if (cmd === "country") { state.country = rest[0]; persist(); renderOnboarding(); return; }
    if (cmd === "avatar") { state.avatar = rest.join(":"); persist(); renderOnboarding(); return; }

    // Nav
    if (cmd === "nav") { go(rest[0]); return; }
    if (cmd === "venue") { go("venue", { code: rest[0], idx: +rest[1] }); return; }
    if (cmd === "articles") { go("articles", { cat: rest[0] }); return; }
    if (cmd === "article") { go("article", { id: rest.join(":") }); return; }
    if (act === "back" || act === "back-article") { back(); return; }

    // Acciones
    if (cmd === "save") { toggleSave(rest.join(":")); return; }
    if (cmd === "listen") { toggleListen(rest.join(":")); return; }
    if (cmd === "txt") { state.txt = +rest[0]; persist(); applyRoot(); render(); return; }
    if (act === "toggle-mode") { state.mode = state.mode === "dark" ? "light" : "dark"; persist(); render(); return; }
    if (act === "toggle-offline") { PS.toggleOfflineSim(); return; }
    if (act === "open-lang") { openLangSheet(); return; }
    if (act === "open-country") { openCountrySheet(); return; }
    if (cmd === "setlang") { state.lang = rest[0]; persist(); closeSheet(); render(); return; }
    if (cmd === "setcountry") { state.country = rest[0]; state.dirCity = "all"; persist(); closeSheet(); render(); return; }
    if (act === "install") { doInstall(); return; }
    if (act === "quick-exit") { PS.resetDemo(); return; }
  });

  function toggleSave(id) {
    if (state.saved.has(id)) { state.saved.delete(id); toast(state.lang === "es" ? "Quitado de guardados" : "Removed", "x"); }
    else { state.saved.add(id); toast(t("savedForOffline")); }
    persist(); render();
  }

  // Historial de navegación real: "Volver" siempre regresa a la pantalla anterior exacta.
  let navStack = [];
  function go(route, params = {}, isBack = false) {
    if (!isBack && state.onboarded && route !== state.route) {
      navStack.push({ route: state.route, params: state.params });
      if (navStack.length > 60) navStack.shift();
    }
    state.route = route; state.params = params;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    state.speaking = false;
    const sc = $(".screen", app); if (sc) sc.scrollTop = 0;
    render();
  }
  function back() {
    const prev = navStack.pop();
    go(prev ? prev.route : "home", prev ? prev.params : {}, true);
  }

  function persist() {
    LS.set("onboarded", state.onboarded); LS.set("lang", state.lang); LS.set("country", state.country);
    LS.set("avatar", state.avatar); LS.set("mode", state.mode); LS.set("txt", state.txt);
    LS.set("saved", [...state.saved]);
  }

  /* ============================================================
     EXPLICACIÓN CONTEXTUAL (panel izquierdo en escritorio)
     Se actualiza con cada pantalla para guiar la demo ante el cliente.
     ============================================================ */
  const explainEl = document.getElementById("explain");
  const EXPLAIN = {
    "ob-intro":    { tag: "Bienvenida", title: "Acceso e instalación", desc: "La persona abre la app desde un enlace y puede instalarla como acceso directo, sin tienda de aplicaciones. Lo primero que ve es el compromiso de privacidad.", points: ["Instalable sin App Store ni Play Store", "Privacidad explicada desde el inicio", "Sin registro ni datos personales"] },
    "ob-language": { tag: "Onboarding · 1 de 3", title: "Elección de idioma", desc: "Cada idioma aparece escrito en su propia lengua. Todo el flujo es solo con toques, sin teclado.", points: ["Español, francés, inglés y kreyòl", "Pensado para baja alfabetización digital", "Cero campos de texto"] },
    "ob-country":  { tag: "Onboarding · 2 de 3", title: "País de tránsito", desc: "Selección manual por regiones migratorias. No se usa GPS ni ubicación en vivo.", points: ["Mesoamérica · Andina · Cono Sur", "Filtra la información de esa ruta", "Sin geolocalización (privacidad)"] },
    "ob-avatar":   { tag: "Onboarding · 3 de 3", title: "Avatar anónimo", desc: "Un avatar reemplaza al nombre. La identidad nunca se solicita.", points: ["Sin nombre, correo ni documentos", "Todo se guarda solo en el teléfono"] },
    "ob-welcome":  { tag: "Listo", title: "Todo queda en el teléfono", desc: "Antes de entrar, se reafirma que la información es privada y local.", points: ["Confirmación de privacidad", "Experiencia personalizada al instante"] },
    home:      { tag: "Pantalla principal", title: "Inicio · el hub", desc: "Tablero simple con las acciones clave y el estado sin conexión siempre visible.", points: ["Accesos grandes a Directorio y Autocuidado", "Indicador “Disponible sin señal”", "Emergencia a un toque en la barra inferior"] },
    directory: { tag: "Puntos de atención", title: "Directorio por país", desc: "Sedes del consorcio filtrables por ciudad. Sin mapas ni GPS, por privacidad.", points: ["Filtro por país y ciudad", "Datos marcados como DEMO", "Disponible sin conexión"] },
    venue:     { tag: "Detalle", title: "Ficha de sede", desc: "Dirección, horarios, teléfono con llamada directa y servicios. Se puede guardar para usar sin señal.", points: ["Llamar con un toque (enlace tel:)", "Mapa deshabilitado por privacidad", "Guardar para usar offline"] },
    selfcare:  { tag: "Contenido", title: "Centro de autocuidado", desc: "Guías de salud sexual y reproductiva en lenguaje sencillo y universal.", points: ["Texto ligero, carga sin datos pesados", "Organizado por categorías"] },
    articles:  { tag: "Contenido", title: "Guías por categoría", desc: "Listado de guías breves dentro de una categoría.", points: ["Tiempo de lectura visible", "Guardables para leer sin conexión"] },
    article:   { tag: "Lectura", title: "Guía de autocuidado", desc: "Lectura cómoda, con voz y tamaño de letra ajustable. Disponible en varios idiomas.", points: ["Botón “Escuchar” (lectura por voz)", "Tamaño de letra A / A+ / A++", "Guardar para leer sin conexión"] },
    emergency: { tag: "Ayuda urgente", title: "Emergencia", desc: "Líneas de ayuda por país, a un toque. El color magenta se reserva solo para esto.", points: ["Llamada directa", "Cambia según el país elegido", "Visible desde cualquier pantalla"] },
    settings:  { tag: "Configuración", title: "Ajustes y privacidad", desc: "Cambio de idioma y país, modo ahorro/sol y borrado rápido de datos.", points: ["Cambiar idioma o país", "Modo ahorro / sol (legible al sol)", "“Borrar y salir” para contextos de riesgo"] },
    saved:     { tag: "Sin conexión", title: "Guardado sin conexión", desc: "Lo que la persona guardó para consultar sin señal durante la ruta.", points: ["Sedes y guías guardadas", "Disponible en zonas de frontera"] },
  };
  function updateExplain(key) {
    if (!explainEl) return;
    const e = EXPLAIN[key] || EXPLAIN.home;
    explainEl.innerHTML = `
      <div class="explain__eyebrow">Estás viendo · <span>${esc(e.tag)}</span></div>
      <h1 class="explain__title">${esc(e.title)}</h1>
      <p class="explain__desc">${esc(e.desc)}</p>
      <ul class="explain__points">${e.points.map(p => `<li>${icon("check", 16)}<span>${esc(p)}</span></li>`).join("")}</ul>`;
  }

  /* ============================================================
     API pública (panel de presentación)
     ============================================================ */
  window.PS = {
    toggleOfflineSim() {
      state.offlineSim = !state.offlineSim;
      flashBanner(!state.offlineSim ? true : false);
      if (state.offlineSim) { netbanner.className = "netbanner show netbanner--off"; netbanner.innerHTML = `${icon("wifioff", 16)} ${esc(t("offlineBanner"))}`; }
      render();
    },
    resetDemo() {
      ["onboarded", "lang", "country", "avatar", "mode", "txt", "saved"].forEach(LS.del);
      state.onboarded = false; state.ob = 0; state.lang = detectLang(); state.country = null;
      state.avatar = DATA.avatars[0]; state.mode = "light"; state.txt = 1; state.saved = new Set();
      state.offlineSim = false; state.route = "home"; navStack = []; render();
    },
  };

  /* ============================================================
     ENLACE PROFUNDO (?screen=…) — navegación directa / capturas / compartir
     No persiste: solo posiciona la vista en este arranque.
     ============================================================ */
  function bootQuery() {
    const q = new URLSearchParams(location.search);
    if (!q.has("screen") && !q.has("demo")) return;
    state.onboarded = true;
    if (["es", "fr", "en", "ht"].includes(q.get("lang"))) state.lang = q.get("lang");
    if (q.get("country")) state.country = q.get("country");
    if (!state.country) state.country = "co";
    if (q.get("mode") === "dark") state.mode = "dark";
    const sc = q.get("screen") || "home";
    if (sc === "venue") { state.route = "venue"; state.params = { code: state.country, idx: +(q.get("idx") || 0) }; }
    else if (sc === "articles") { state.route = "articles"; state.params = { cat: q.get("cat") || DATA.categories[0].id }; }
    else if (sc === "article") { state.route = "article"; state.params = { id: q.get("art") || DATA.articles[1].id, _from: "selfcare" }; }
    else state.route = sc;
  }

  /* ============================================================
     INIT
     ============================================================ */
  window.addEventListener("online", () => { if (!state.offlineSim) { flashBanner(true); render(); } });
  window.addEventListener("offline", () => { flashBanner(false); render(); });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}));
  }

  bootQuery();
  applyRoot();
  render();
})();
