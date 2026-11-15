// rudy.chat: theme preview, the talking-bot demo, and screenshot slots.
(function () {
  'use strict';

  // Theme values copied from the app (TMessagesProj/.../ActionBar/RudyTheme.java and the rudy_*.attheme files).
  var ACCENTS = [
    { fa: 'مشکی', faDark: 'سفید', light: '#111113', dark: '#EDEDF0', bubble: '#3A3A3F' },
    { fa: 'صورتی', light: '#BF4277', dark: '#EC7FA9', bubble: '#8E3560' },
    { fa: 'بنفش', light: '#7450C4', dark: '#AC93EC', bubble: '#56419A' },
    { fa: 'قرمز', light: '#C8453F', dark: '#EE8079', bubble: '#953834' },
    { fa: 'اقیانوسی', light: '#2D6FB8', dark: '#73A9EA', bubble: '#285A93' },
    { fa: 'نعنایی', light: '#187A5E', dark: '#55C7A3', bubble: '#1A6A53' },
    { fa: 'کهربایی', light: '#9C6A17', dark: '#E2B35F', bubble: '#7E5B17' },
    { fa: 'گرافیتی', light: '#55555C', dark: '#AEAEB5', bubble: '#46464C' }
  ];

  var MODES = {
    light: {
      bar: '#ffffff', 'bar-fg': '#111113', 'bar-sub': '#8e8e93', 'wall-a': '#e9e9e5', 'wall-b': '#d9d9d4', pat: 'rgba(0,0,0,.07)',
      in: '#ffffff', 'in-fg': '#000000', 'in-time': '#939395', pill: 'rgba(70,70,72,.42)', panel: '#ffffff', hint: '#a0a0a3', icon: '#848485',
      list: '#ffffff', name: '#151515', msg: '#717172', time: '#818181', sep: '#ececec', mute: '#b7b7b8',
      kb: '#ececea', key: '#ffffff', 'key-fg': '#111113', 'key-shadow': 'rgba(0,0,0,.14)', shadow: 'rgba(0,0,0,.1)'
    },
    dark: {
      bar: '#1b1b1e', 'bar-fg': '#ffffff', 'bar-sub': '#8f8f95', 'wall-a': '#1c1c1f', 'wall-b': '#141416', pat: 'rgba(255,255,255,.035)',
      in: '#29292a', 'in-fg': '#fafafa', 'in-time': '#89898a', pill: 'rgba(60,60,61,.8)', panel: '#232326', hint: '#75757a', icon: '#8c8c8e',
      list: '#121214', name: '#f1f1f3', msg: '#8e8e93', time: '#7c7c82', sep: '#222225', mute: '#4a4a4f',
      kb: '#1f1f21', key: '#333336', 'key-fg': '#f2f2f4', 'key-shadow': 'rgba(0,0,0,.4)', shadow: 'rgba(0,0,0,.3)'
    },
    black: {
      bar: '#000000', 'bar-fg': '#ffffff', 'bar-sub': '#8f8f95', 'wall-a': '#000000', 'wall-b': '#000000', pat: 'rgba(255,255,255,0)',
      in: '#1c1c1e', 'in-fg': '#fafafa', 'in-time': '#8a8a8f', pill: 'rgba(40,40,42,.9)', panel: '#0b0b0c', hint: '#6f6f74', icon: '#8c8c8e',
      list: '#000000', name: '#f1f1f3', msg: '#8e8e93', time: '#7c7c82', sep: '#161618', mute: '#3e3e43',
      kb: '#0b0b0c', key: '#1c1c1e', 'key-fg': '#f2f2f4', 'key-shadow': 'rgba(0,0,0,.6)', shadow: 'rgba(0,0,0,.5)'
    }
  };

  // WCAG contrast, used like the app does: text on an accent fill is black or white, whichever reads better.
  function lum(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255].map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }).reduce(function (a, v, i) { return a + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function onColor(bg) { return contrast('#ffffff', bg) >= contrast('#111113', bg) ? '#ffffff' : '#111113'; }

  function themeVars(mode, i) {
    var m = MODES[mode], a = ACCENTS[i], vars = {};
    Object.keys(m).forEach(function (k) { vars[k] = m[k]; });
    var acc = mode === 'light' ? a.light : a.dark;
    var out = mode === 'light' ? a.light : a.bubble;
    vars.acc = acc;
    vars['on-acc'] = onColor(acc);
    vars.out = out;
    vars['on-out'] = onColor(out);
    vars['out-time'] = vars['on-out'] === '#ffffff' ? 'rgba(255,255,255,.62)' : 'rgba(17,17,19,.55)';
    return vars;
  }
  function paint(el, mode, i) {
    var vars = themeVars(mode, i);
    Object.keys(vars).forEach(function (k) { el.style.setProperty('--' + k, vars[k]); });
    el.dataset.mode = mode;
  }

  // ---- theme picker -------------------------------------------------------------------------------------
  var state = { mode: 'light', accent: 0 };
  try {
    var saved = JSON.parse(localStorage.getItem('rudy-theme') || 'null');
    if (saved && MODES[saved.mode] && ACCENTS[saved.accent]) state = saved;
  } catch (e) { /* storage unavailable: defaults are fine */ }

  var swatches = document.getElementById('swatches');
  var swatchName = document.getElementById('swatch-name');
  var segButtons = document.querySelectorAll('.seg button');
  var live = [document.getElementById('demo'), document.getElementById('prev-list'), document.getElementById('prev-chat')].filter(Boolean);

  ACCENTS.forEach(function (a, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'radio');
    b.dataset.i = i;
    swatches.appendChild(b);
  });

  function render() {
    live.forEach(function (el) { paint(el, state.mode, state.accent); });
    segButtons.forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.mode === state.mode)); });
    swatches.querySelectorAll('button').forEach(function (b, i) {
      var a = ACCENTS[i];
      b.style.setProperty('--c', state.mode === 'light' ? a.light : a.dark);
      var label = state.mode !== 'light' && a.faDark ? a.faDark : a.fa;
      b.setAttribute('aria-label', label);
      b.title = label;
      b.setAttribute('aria-checked', String(i === state.accent));
    });
    var cur = ACCENTS[state.accent];
    swatchName.textContent = (state.mode !== 'light' && cur.faDark ? cur.faDark : cur.fa);
    try { localStorage.setItem('rudy-theme', JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  segButtons.forEach(function (b) {
    b.addEventListener('click', function () { state.mode = b.dataset.mode; render(); });
  });
  swatches.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    state.accent = Number(b.dataset.i);
    render();
  });
  render();

  // ---- screenshot slots: a real screenshot if present, otherwise a mockup in that theme ------------------
  var listTemplate = document.getElementById('prev-list');
  document.querySelectorAll('#shots figure').forEach(function (fig) {
    var device = document.createElement('div');
    device.className = 'device';
    fig.insertBefore(device, fig.firstChild);
    var img = new Image();
    img.className = 'shot-img';
    img.alt = fig.querySelector('figcaption').textContent;
    img.onload = function () { device.appendChild(img); };
    img.onerror = function () {
      var mock = listTemplate.cloneNode(true);
      mock.removeAttribute('id');
      mock.setAttribute('aria-hidden', 'true');
      paint(mock, fig.dataset.mode, Number(fig.dataset.accent));
      device.appendChild(mock);
    };
    img.src = fig.dataset.src;
  });

  // ---- the talking-bot demo -----------------------------------------------------------------------------
  var feed = document.getElementById('feed');
  var status = document.getElementById('status');
  var kb = document.getElementById('kb');
  var fa = function (n) { return String(n).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; }); };
  var minute = 41;
  var now = function () { return fa('21:' + (minute < 10 ? '0' : '') + minute); };
  var CHECK = '<svg class="chk"><use href="assets/img/icons.svg#i-check"/></svg>';
  var answers = {
    what: ['یه پیام‌رسانم. چت، گروه، کانال، عکس، ویس، هرچی بخوای.', 'فقط حرف اضافه نمی‌زنم.'],
    safe: ['پیامات روی سرورهای خود رودی می‌مونه.', 'منم فضول نیستم. خیالت راحت.'],
    diff: ['مرتبم، سریعم، شلوغ‌بازی هم ندارم.', 'کت‌وشلوارمم که دیگه معلومه.'],
    color: ['هشت تا. یه پایین‌تر رو ببین.', 'ولی مشکی به من بیشتر میاد.'],
    smile: ['sticker', 'همین بود.']
  };
  var busy = false;

  function lastOf(side) {
    var els = feed.querySelectorAll('.msg, .sticker');
    var last = els[els.length - 1];
    return last && last.classList.contains('msg') && last.classList.contains(side) ? last : null;
  }
  function add(side, text) {
    var prev = lastOf(side);
    if (prev) prev.classList.remove('tail');
    var el;
    if (text === 'sticker') {
      el = document.createElement('div');
      el.className = 'sticker pop';
      el.innerHTML = '<span class="mascot" role="img" aria-label="استیکر رودی"></span>';
    } else {
      el = document.createElement('p');
      el.className = 'msg ' + side + ' tail pop' + (prev ? ' cont' : '');
      el.textContent = text;
      var t = document.createElement('span');
      t.className = 't';
      t.innerHTML = now() + (side === 'out' ? CHECK : '');
      el.appendChild(t);
    }
    feed.appendChild(el);
    feed.scrollTop = feed.scrollHeight;
  }
  function typing(on) {
    status.innerHTML = on ? '<span class="typing">داره می‌نویسه<i></i><i></i><i></i></span>' : 'ربات';
  }
  kb.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b || busy) return;
    busy = true;
    b.disabled = true;
    add('out', b.textContent);
    var lines = answers[b.dataset.q].slice();
    setTimeout(function () { typing(true); }, 500);
    (function next(delay) {
      setTimeout(function () {
        add('in', lines.shift());
        if (lines.length) {
          next(900);
        } else {
          typing(false);
          busy = false;
          minute = Math.min(minute + 1, 59);
          if (!kb.querySelector('button:not(:disabled)')) {
            kb.querySelectorAll('button').forEach(function (x) { x.disabled = false; });
          }
        }
      }, delay);
    })(1300);
  });
})();
