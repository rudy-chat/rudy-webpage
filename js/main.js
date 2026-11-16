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

  /* reveal on scroll */
  const revealables = $$(".section-head, .feature, .desk, .servers-art, .status, .install-in, .faq-list details");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealables.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
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
  const left = $("#left");
  let remaining = 3;

  const answers = [
    [/قیمت|پول|رایگان|مجانی|هزینه|free|price/i, "رودی رایگان است."],
    [/امن|امنیت|رمز|حریم|خصوصی|secure|privacy/i, "پیام‌های شما روی سرورهای خودِ رودی می‌ماند و در اختیار سرویس دیگری قرار نمی‌گیرد."],
    [/سرور|زیرساخت|server/i, "رودی روی زیرساخت خودش اجرا می‌شود و به سرویس خارجی وابسته نیست."],
    [/ایفون|آیفون|iphone|ios/i, "نسخه‌ی iOS در دست ساخت است."],
    [/ویندوز|لینوکس|دسکتاپ|کامپیوتر|رایانه|windows|linux|desktop/i, "نسخه‌های ویندوز و لینوکس به‌زودی منتشر می‌شوند."],
    [/اندروید|نصب|دانلود|دریافت|android|install|download/i, "نسخه‌ی اندروید را از بخش «دریافت» همین صفحه بگیرید."],
    [/رنگ|تم|پوسته|ظاهر|theme|color/i, "پوسته‌ی روشن، تیره یا مشکی با نُه رنگ؛ پوسته‌ی دلخواه هم می‌توانید بسازید."],
    [/حساب|ثبت|شماره|ورود|account|sign|login/i, "شماره‌تان را وارد کنید و کد تأییدی را که می‌رسد بزنید. همین."],
    [/گروه|کانال|group|channel/i, "بله، گفت‌وگوی گروهی و کانال هم دارد."],
    [/سلام|درود|hi|hello/i, "سلام. بفرمایید."],
  ];
  const fallback = "پاسخ این سؤال را ندارم. شاید در «پرسش‌های رایج» پایین صفحه پیدایش کنید.";

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
    const btn = form.querySelector("button");
    input.disabled = btn.disabled = true;

    const hit = answers.find(([re]) => re.test(q));
    setTimeout(() => {
      typing.remove();
      say("رودی", hit ? hit[1] : fallback, "rudy");
      if (remaining > 0) {
        input.disabled = btn.disabled = false;
        input.focus({ preventScroll: true });
      } else {
        input.placeholder = "سه سؤال‌تان را پرسیدید.";
        $("#hint").textContent = "برای سؤال‌های بیشتر، بخش پرسش‌های رایج را ببینید.";
      }
    }, 700 + Math.random() * 500);
  });

  /* the one secret: ↑ ↑ ↓ ↓ ← → ← → B A */
  const konami = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let kIdx = 0;
  addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    kIdx = k === konami[kIdx] ? kIdx + 1 : (k === konami[0] ? 1 : 0);
    if (kIdx === konami.length) {
      kIdx = 0;
      const on = document.documentElement.classList.toggle("black-tie");
      toast(on ? "مشکی و طلایی" : "حالت عادی");
    }
  });
})();
