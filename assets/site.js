/* TH / EN switch. The first choice is made by the inline script in <head> (?lang= > saved choice > browser
   language). This file wires the toggle, the page title and the header links. Without JS both documents show. */
(function () {
  var d = document.documentElement;

  function apply(lang) {
    d.lang = lang;
    d.setAttribute('data-lang', lang);
    var t = document.body.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    var sw = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < sw.length; i++) {
      if (sw[i].getAttribute('data-set-lang') === lang) sw[i].setAttribute('aria-current', 'true');
      else sw[i].removeAttribute('aria-current');
    }
    var nav = document.querySelectorAll('a[data-page]');
    for (var j = 0; j < nav.length; j++) {
      nav[j].setAttribute('href', nav[j].getAttribute('data-page') + '?lang=' + lang);
    }
  }

  function choose(lang) {
    try { localStorage.setItem('fang_lang', lang); } catch (e) { /* storage blocked: choice lasts for this page */ }
    apply(lang);
    try {
      var u = new URL(window.location.href);
      u.searchParams.set('lang', lang);
      u.hash = '';
      window.history.replaceState(null, '', u.toString());
    } catch (e) { /* file:// or old browser: URL stays as is */ }
  }

  apply(d.getAttribute('data-lang') === 'th' ? 'th' : 'en');

  document.addEventListener('click', function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest('[data-set-lang]') : null;
    if (!el) return;
    ev.preventDefault();
    choose(el.getAttribute('data-set-lang'));
  });
})();
