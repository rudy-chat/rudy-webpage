/* rudy.chat · small manners and a few secrets. */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  /* toast */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg, ms = 2800) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* reveal on scroll */
  const revealables = $$(".section-head, .rule-list li, .desk, .servers-art, .status, .install-in, .faq-list details");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealables.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
  }

  /* portrait: Rudy keeps an eye on the cursor */
  const cat = $("#cat");
  const frame = $(".frame");
  if (cat && frame && !reduced && matchMedia("(pointer: fine)").matches) {
    let raf = 0;
    addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = frame.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        cat.style.transform = `rotateY(${(dx * 14).toFixed(2)}deg) rotateX(${(-dy * 10).toFixed(2)}deg)`;
      });
    }, { passive: true });
  }

  /* egg: the bow is not a button. (It is.) */
  const bowLines = ["پاپیون رو صاف نکن، صافه.", "لطفاً به پاپیون دست نزنید.", "جدی می‌گم.", "آخرین اخطار."];
  let bowCount = 0;
  $("#bow")?.addEventListener("click", () => {
    bowCount++;
    cat.classList.remove("tug"); void cat.offsetWidth; cat.classList.add("tug");
    if (bowCount >= 5) {
      toast("پاپیونمو ول کن.");
      cat.classList.add("frown");
      setTimeout(() => cat.classList.remove("frown"), 3000);
      bowCount = 0;
    } else {
      toast(bowLines[bowCount - 1]);
    }
  });

  /* audience: three questions, then the secretary closes the door */
  const transcript = $("#transcript");
  const form = $("#ask");
  const input = $("#q");
  const left = $("#left");
  let remaining = 3;

  const answers = [
    [/تلگرام|telegram/i, ["اسمشو این‌جا نیار.", "کی؟ نمی‌شناسم."]],
    [/آبی|blue/i, ["آبی؟ جدی؟", "رنگ دیگه‌ای بلد نیستی؟"]],
    [/قیمت|پول|رایگان|مجانی|free|price/i, ["رایگانه. کت‌وشلوار رو خودم خریدم."]],
    [/امن|امنیت|رمز|حریم|secure|privacy/i, ["پیامت مال خودته. من حتی نگاهشم نمی‌کنم."]],
    [/سرور|server/i, ["سرورها حالشون خوبه. خودم بالای سرشونم."]],
    [/ایفون|آیفون|iphone|ios/i, ["دارم براش کراوات انتخاب می‌کنم."]],
    [/ویندوز|لینوکس|دسکتاپ|windows|linux|desktop/i, ["داره اتو می‌خوره. به‌زودی."]],
    [/اسم|کی هستی|کی‌ای|who/i, ["رودی. فقط رودی."]],
    [/دوست|عشق|love/i, ["احساساتمو فقط با سرورها در میون می‌ذارم."]],
    [/گربه|میو|meow|cat/i, ["میو. حالا برو."]],
    [/سلام|درود|hi|hello/i, ["سلام. سؤالت؟"]],
    [/چرا/i, ["چون این‌طوری مرتب‌تره."]],
  ];
  const fallback = ["سؤال خوبیه. جوابش نه.", "بعداً بهت خبر می‌دم. یعنی نه.", "منشی‌م یادداشتش کرد.", "رودی به این سؤال با سکوت جواب می‌ده."];

  function say(who, text, cls) {
    const p = document.createElement("p");
    p.className = "line " + cls;
    const w = document.createElement("span"); w.className = "who"; w.textContent = who;
    const s = document.createElement("span"); s.className = "said"; s.textContent = text;
    p.append(w, s);
    transcript.append(p);
    return p;
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q || remaining <= 0) return;
    input.value = "";
    say("شما", q, "you");
    remaining--;
    left.textContent = fa(remaining);

    const typing = document.createElement("p");
    typing.className = "line rudy";
    typing.innerHTML = '<span class="who">رودی</span><span class="typing" aria-label="در حال نوشتن"><i></i><i></i><i></i></span>';
    transcript.append(typing);
    input.disabled = true;
    form.querySelector("button").disabled = true;

    const hit = answers.find(([re]) => re.test(q));
    setTimeout(() => {
      typing.remove();
      say("رودی", pick(hit ? hit[1] : fallback), "rudy");
      if (remaining > 0) {
        input.disabled = false;
        form.querySelector("button").disabled = false;
        input.focus({ preventScroll: true });
      } else {
        setTimeout(() => {
          say("منشی", "وقت ملاقات تموم شد. فردا تشریف بیارید.", "sys");
          input.placeholder = "در بسته‌ست.";
          $("#hint").textContent = "رودی رفت جلسه‌ی بعدی.";
        }, 700);
      }
    }, 900 + Math.random() * 700);
  });

  /* servers: uptime of this very page */
  const uptime = $("#uptime");
  const t0 = Date.now();
  function tickUptime() {
    const s = Math.floor((Date.now() - t0) / 1000);
    const m = Math.floor(s / 60);
    uptime.textContent = m ? `${fa(m)} دقیقه و ${fa(s % 60)} ثانیه` : `${fa(s)} ثانیه`;
  }
  setInterval(tickUptime, 1000);

  /* egg: poke the servers seven times */
  const servers = $("#servers");
  const statusText = $("#status-text");
  const dot = $(".status .dot");
  let pokes = 0, pokeTimer;
  servers?.addEventListener("click", () => {
    pokes++;
    clearTimeout(pokeTimer);
    pokeTimer = setTimeout(() => (pokes = 0), 2500);
    if (pokes === 3) toast("به سرورها دست نزن.");
    if (pokes >= 7) {
      pokes = 0;
      servers.classList.add("hot");
      dot.classList.add("bad");
      statusText.textContent = "سرور ۳ رفت چایی بیاره.";
      toast("آفرین. حالا خوشحالی؟");
      setTimeout(() => {
        servers.classList.remove("hot");
        dot.classList.remove("bad");
        statusText.textContent = "برگشت. با دو تا چایی.";
        setTimeout(() => (statusText.textContent = "آروم. مثل همیشه."), 4000);
      }, 5000);
    }
  });

  /* egg: things you type anywhere (outside inputs) */
  const konami = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let kIdx = 0, buffer = "";
  addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    kIdx = k === konami[kIdx] ? kIdx + 1 : (k === konami[0] ? 1 : 0);
    if (kIdx === konami.length) {
      kIdx = 0;
      const on = document.documentElement.classList.toggle("black-tie");
      toast(on ? "شب رسمی. لطفاً کراوات بزنید." : "مهمونی تموم شد.");
      return;
    }
    if (e.target.closest("input, textarea") || e.key.length !== 1) return;
    buffer = (buffer + k).slice(-16);
    if (/telegram$|تلگرام$/.test(buffer)) {
      buffer = "";
      document.body.classList.remove("shake"); void document.body.offsetWidth;
      document.body.classList.add("shake");
      toast("اینجا اسم اونو نمیاریم.");
    } else if (/blue$|آبی$/.test(buffer)) {
      buffer = "";
      toast("آبی؟ جدی؟");
    } else if (/rudy$|رودی$/.test(buffer)) {
      buffer = "";
      toast("بله؟ صدام کردی؟");
    }
  });

  /* egg: the year */
  const yearLines = ["رودی سال رو با تاریخ تأسیس خودش حساب می‌کنه.", "سال ۱۴۰۵. سال گربه، طبیعتاً.", "قبل از رودی، تاریخ وجود نداشت."];
  let yIdx = 0;
  $("#year")?.addEventListener("click", () => toast(yearLines[yIdx++ % yearLines.length]));

  /* egg: idle visitor */
  let idleTimer;
  const resetIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => toast("هنوز اینجایی؟ رودی رفت قهوه بیاره.", 4200), 45000);
  };
  ["pointermove", "keydown", "scroll", "touchstart"].forEach((ev) => addEventListener(ev, resetIdle, { passive: true }));
  resetIdle();

  /* egg: tab title when you leave */
  const title = document.title;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "رودی منتظره…" : title;
  });

  /* egg: for the people who open devtools */
  console.log(
    "%cرودی%c\nکد رو می‌خونی؟ مؤدب باش.\nپیشنهاد: ↑ ↑ ↓ ↓ ← → ← → B A",
    "font: 48px Lalezar, serif; color: #800000;",
    "font: 14px Vazirmatn, sans-serif; color: inherit;"
  );
})();
