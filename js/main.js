/* rudy.chat */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* toast */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg, ms = 2800) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* portrait: Rudy follows the cursor */
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

  /* the bow: a small tug */
  $("#bow")?.addEventListener("click", () => {
    cat.classList.remove("tug"); void cat.offsetWidth; cat.classList.add("tug");
  });

  /* ask Rudy: three questions, short answers */
  const transcript = $("#transcript");
  const form = $("#ask");
  const input = $("#q");

  const answers = [
    [/قیمت|پول|رایگان|مجانی|هزینه|free|price/i, "آره، رایگانه."],
    [/امن|امنیت|رمز|حریم|خصوصی|کجا|نگهداری|نگه‌داری|secure|privacy/i, "پیام‌ها روی سرورهای رودی نگهداری می‌شن."],
    [/سرور|زیرساخت|server/i, "رودی روی سرورهایی کار می‌کنه که خودمون راه انداختیم و نگهشون می‌داریم."],
    [/ایفون|آیفون|iphone|ios/i, "هنوز نه، ولی داریم روش کار می‌کنیم."],
    [/ویندوز|لینوکس|دسکتاپ|کامپیوتر|رایانه|لپ‌تاپ|windows|linux|desktop/i, "نسخه ویندوز و لینوکس هم تو راهه. فعلاً فقط اندروید آماده‌ست."],
    [/اندروید|نصب|دانلود|دریافت|android|install|download/i, "نسخه اندروید رو از بخش «رودی رو بگیر» همین صفحه دانلود کن."],
    [/حساب|ثبت|شماره|ورود|بسازم|account|sign|login/i, "رودی رو نصب کن، شماره‌ت رو وارد کن و مراحل ثبت‌نام رو ادامه بده."],
    [/گروه|کانال|group|channel/i, "آره، هم گروه داره هم کانال."],
    [/سلام|درود|hi|hello/i, "سلام. بپرس."],
  ];
  const fallback = "اینو نمی‌دونم. یکی از پیشنهادهای پایین رو بزن، یا سؤال‌های پرتکرار رو ببین.";

  function say(who, text, cls) {
    const p = document.createElement("p");
    p.className = "line " + cls;
    const w = document.createElement("span"); w.className = "who"; w.textContent = who;
    const s = document.createElement("span"); s.className = "said"; s.textContent = text;
    p.append(w, s);
    transcript.append(p);
    return p;
  }

  let busy = false;
  function ask(q) {
    q = q.trim();
    if (!q || busy) return;
    busy = true;
    say("شما", q, "you");
    const typing = say("رودی", "", "rudy");
    typing.querySelector(".said").outerHTML = '<span class="typing" aria-label="داره می‌نویسه"><i></i><i></i><i></i></span>';
    transcript.scrollTop = transcript.scrollHeight;
    const hit = answers.find(([re]) => re.test(q));
    setTimeout(() => {
      typing.replaceWith(say("رودی", hit ? hit[1] : fallback, "rudy"));
      transcript.scrollTop = transcript.scrollHeight;
      busy = false;
    }, 600 + Math.random() * 400);
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    ask(input.value);
    input.value = "";
  });
  $$("#chips button").forEach((b) => b.addEventListener("click", () => {
    if (busy) return;
    b.classList.add("used");
    ask(b.textContent);
  }));

  /* the one secret: ↑ ↑ ↓ ↓ ← → ← → B A */
  const konami = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let kIdx = 0;
  addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    kIdx = k === konami[kIdx] ? kIdx + 1 : (k === konami[0] ? 1 : 0);
    if (kIdx === konami.length) {
      kIdx = 0;
      const on = document.documentElement.classList.toggle("black-tie");
      toast(on ? "حالت مشکی‌طلایی روشن شد" : "برگشتیم به حالت عادی");
    }
  });
})();
