(function () {
  "use strict";

  var G = window.GAME, Q = G.questions, T = G.traits, KEYS = Object.keys(T);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var screens = { intro: $("#intro"), quiz: $("#quiz"), result: $("#result") };

  var idx = 0, answers = [], name = "", locked = false, lastResult = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function show(which) {
    Object.keys(screens).forEach(function (k) { screens[k].classList.toggle("active", k === which); });
    document.body.dataset.screen = which;
    window.scrollTo(0, 0);
  }

  /* ---------------- quiz ---------------- */
  function renderQuestion() {
    var q = Q[idx], stage = $("#stage");
    var html = [q.a, q.b].map(function (o, i) {
      var tone = o.tone || (i === 0 ? "light" : "dark");
      var was = answers[idx] === i ? " was" : "";
      return '<button type="button" class="choice ' + tone + was + '" data-i="' + i + '">' +
        '<span class="word">' + esc(o.label) + '</span>' +
        '<span class="key" aria-hidden="true">' + (i === 0 ? "←" : "→") + '</span></button>';
    }).join("");
    stage.className = "stage enter";
    stage.innerHTML = html + '<div class="or" aria-hidden="true">or</div>';
    $("#counter").textContent = pad(idx + 1) + " / " + pad(Q.length);
    $("#bar").style.width = (idx / Q.length * 100) + "%";
  }

  function choose(i) {
    if (locked) return;
    locked = true;
    answers[idx] = i;
    var stage = $("#stage");
    stage.classList.add("locked");
    stage.querySelectorAll(".choice").forEach(function (el) {
      el.classList.add(+el.dataset.i === i ? "picked" : "dim");
    });
    $("#bar").style.width = ((idx + 1) / Q.length * 100) + "%";
    setTimeout(function () {
      locked = false;
      if (idx < Q.length - 1) { idx++; renderQuestion(); }
      else { showResult(); }
    }, 520);
  }

  function goBack() {
    if (locked) return;
    if (idx === 0) { show("intro"); return; }
    idx--;
    renderQuestion();
  }

  /* ---------------- analysis ---------------- */
  function analyse() {
    var tot = {}, min = {}, max = {};
    KEYS.forEach(function (k) { tot[k] = 0; min[k] = 0; max[k] = 0; });
    var bold = [], soft = [];

    Q.forEach(function (q, n) {
      var chosen = answers[n] === 0 ? q.a : q.b;
      KEYS.forEach(function (k) {
        var a = q.a.w[k] || 0, b = q.b.w[k] || 0;
        min[k] += Math.min(a, b);
        max[k] += Math.max(a, b);
        tot[k] += chosen.w[k] || 0;
      });
      if (chosen.side === "bold") bold.push(chosen.label);
      if (chosen.side === "soft") soft.push(chosen.label);
    });

    var pct = {};
    KEYS.forEach(function (k) {
      pct[k] = max[k] === min[k] ? 50 : Math.round((tot[k] - min[k]) / (max[k] - min[k]) * 100);
    });
    var ranked = KEYS.slice().sort(function (x, y) { return pct[y] - pct[x] || tot[y] - tot[x]; });

    var top = ranked[0], second = ranked[1], bottom = ranked[ranked.length - 1];
    var title = T[second].adj + " " + T[top].noun;

    var paras = [T[top].high];
    paras.push(T[second].high);
    if (pct[bottom] <= 45) paras.push(T[bottom].low);

    var total = bold.length + soft.length || 1, r = bold.length / total, dual;
    if (r >= 0.62) dual = "You lean bold. Most of your instincts run direct and high-energy. You act first and explain later, if at all.";
    else if (r <= 0.38) dual = "You lean soft. Beneath a steady surface, your instincts run toward comfort, depth and quiet connection.";
    else dual = "You are a true duality: fire in the day, stillness at night. The bold and the soft in you are almost evenly matched, and that is exactly what makes you hard to read.";

    paras.push("Put it together and you live boldly and love deeply, without needing a filter.");
    if (r <= 0.38) paras[paras.length - 1] = "Put it together and you love deeply and live quietly, without needing to prove it to anyone.";

    return { title: title, tagline: T[top].tag, paras: paras, pct: pct, ranked: ranked, bold: bold, soft: soft, dual: dual, top: top, second: second };
  }

  /* ---------------- result screen ---------------- */
  function showResult() {
    var res = lastResult = analyse();
    var words = res.title.split(" ");
    var last = words.pop();
    var titleHtml = esc(words.join(" ")) + (words.length ? " " : "") + "<em>" + esc(last) + "</em>";

    function chips(list) {
      return list.length
        ? "<ul>" + list.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul>"
        : '<p class="none">None this time</p>';
    }

    var traits = res.ranked.map(function (k) {
      return '<div class="trait"><span class="t-name">' + esc(T[k].label) + '</span>' +
        '<div class="track"><div class="fill" data-w="' + res.pct[k] + '"></div></div>' +
        '<span class="t-pct">' + res.pct[k] + '%</span></div>';
    }).join("");

    var recap = Q.map(function (q, n) {
      var c = answers[n] === 0 ? q.a : q.b, o = answers[n] === 0 ? q.b : q.a;
      return '<li><span class="in">' + esc(c.label) + '</span><span class="out">' + esc(o.label) + '</span></li>';
    }).join("");

    var who = name ? esc(name) + "'s reading" : "Your reading";

    $("#resultBody").innerHTML =
      '<div class="hero"><p class="eyebrow">' + who + '</p><h2>' + titleHtml + '</h2>' +
      '<p class="tagline">' + esc(res.tagline) + '</p></div>' +
      '<div class="story"><p class="section-title">Who you are</p>' +
        res.paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
      '<div><p class="section-title">Two sides of you</p>' +
        '<div class="duo"><div class="bold"><h3>Bold side</h3>' + chips(res.bold) + '</div>' +
        '<div><h3>Soft side</h3>' + chips(res.soft) + '</div></div>' +
        '<p class="duo-note">' + esc(res.dual) + '</p></div>' +
      '<div><p class="section-title">Your nature, measured</p><div class="traits">' + traits + '</div></div>' +
      '<div><p class="section-title">Your choices</p><ul class="recap">' + recap + '</ul></div>' +
      '<div class="actions"><button id="again" class="btn" type="button">Play again</button>' +
        '<button id="copy" class="btn outline" type="button">Copy result</button>' +
        '<button id="card" class="btn outline" type="button">Save as image</button></div>' +
      '<p class="foot">Just for fun. Not science. Go with your gut.</p>';

    show("result");
    requestAnimationFrame(function () {
      setTimeout(function () {
        document.querySelectorAll(".fill").forEach(function (f) { f.style.width = f.dataset.w + "%"; });
      }, 350);
    });
    $("#again").onclick = restart;
    $("#copy").onclick = copyResult;
    $("#card").onclick = downloadCard;
  }

  function restart() { idx = 0; answers = []; show("intro"); }

  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  function summaryText() {
    var r = lastResult;
    var lines = [(name ? name + " is " : "I am ") + "“" + r.title + "” — " + r.tagline, ""];
    r.ranked.forEach(function (k) { lines.push(T[k].label + ": " + r.pct[k] + "%"); });
    lines.push("", "Play Black & White: " + location.href.split("#")[0]);
    return lines.join("\n");
  }

  function copyResult() {
    var text = summaryText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast("Copied"); }, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); toast("Copied"); } catch (e) { toast("Couldn't copy"); }
      ta.remove();
    }
  }

  function downloadCard() {
    var r = lastResult, W = 1080, H = 1350;
    var c = document.createElement("canvas"); c.width = W; c.height = H;
    var x = c.getContext("2d");
    x.fillStyle = "#0a0a0a"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#f4f2ee"; x.fillRect(0, 0, W / 2, 14);
    x.textAlign = "center";

    x.fillStyle = "#8d8b86"; x.font = "500 26px Inter, Arial, sans-serif";
    x.fillText((name ? name.toUpperCase() + "  ·  " : "") + "BLACK & WHITE", W / 2, 120);

    x.fillStyle = "#f4f2ee"; x.font = "300 110px Fraunces, Georgia, serif";
    var parts = r.title.split(" "), l1 = parts.slice(0, -1).join(" "), l2 = parts[parts.length - 1];
    if (l1) { x.fillText(l1, W / 2, 300); x.font = "italic 300 130px Fraunces, Georgia, serif"; x.fillText(l2, W / 2, 440); }
    else { x.font = "italic 300 130px Fraunces, Georgia, serif"; x.fillText(l2, W / 2, 380); }

    x.fillStyle = "#8d8b86"; x.font = "italic 300 38px Fraunces, Georgia, serif";
    x.fillText(r.tagline, W / 2, 530);

    var y = 650, left = 150, barW = 520;
    x.textAlign = "left";
    r.ranked.forEach(function (k) {
      x.fillStyle = "#f4f2ee"; x.font = "500 30px Inter, Arial, sans-serif";
      x.fillText(T[k].label, left, y + 10);
      x.fillStyle = "rgba(244,242,238,.12)"; x.fillRect(left + 260, y - 8, barW - 100, 10);
      x.fillStyle = "#f4f2ee"; x.fillRect(left + 260, y - 8, (barW - 100) * r.pct[k] / 100, 10);
      x.fillStyle = "#8d8b86"; x.font = "400 28px Inter, Arial, sans-serif";
      x.fillText(r.pct[k] + "%", left + 260 + barW - 70, y + 10);
      y += 80;
    });

    x.textAlign = "center"; x.fillStyle = "#5d5b56"; x.font = "400 24px Inter, Arial, sans-serif";
    x.fillText("Just for fun. Not science.", W / 2, H - 70);

    var a = document.createElement("a");
    a.href = c.toDataURL("image/png"); a.download = "black-and-white-result.png";
    document.body.appendChild(a); a.click(); a.remove();
    toast("Saved");
  }

  /* ---------------- wiring ---------------- */
  function start() {
    name = $("#name").value.trim();
    idx = 0; answers = [];
    renderQuestion(); show("quiz");
  }
  $("#start").addEventListener("click", start);
  $("#name").addEventListener("keydown", function (e) { if (e.key === "Enter") start(); });
  $("#back").addEventListener("click", goBack);
  $("#stage").addEventListener("click", function (e) {
    var b = e.target.closest(".choice");
    if (b) choose(+b.dataset.i);
  });
  document.addEventListener("keydown", function (e) {
    if (document.body.dataset.screen !== "quiz") return;
    if (e.key === "ArrowLeft" || e.key === "1") choose(0);
    else if (e.key === "ArrowRight" || e.key === "2") choose(1);
    else if (e.key === "Backspace") goBack();
  });
})();
