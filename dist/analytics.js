(() => {
  const id = Number(window.SITE?.metrikaId);
  if (!Number.isSafeInteger(id) || id <= 0 || location.hostname !== 'dmpostpunk.github.io') return;

  window.ym = window.ym || function () {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
  window.ym.l = Date.now();
  window.ym(id, 'init', { accurateTrackBounce: true, webvisor: false, trackLinks: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.append(script);

  document.addEventListener('click', event => {
    if (!event.isTrusted) return;
    const control = event.target.closest?.('button, a');
    if (!control) return;
    const goal = (name, params) => window.ym(id, 'reachGoal', name, params);
    if (control.id === 'ask-song') goal('quiz_open');
    else if (control.id === 'download-answer') goal('quote_image');
    else if (control.matches('#tabs button')) goal('album_select', { album: control.textContent.trim() });
    else if (control.matches('#song-list button')) goal('player_select', { choice: control.textContent.trim() });
    else if (control.matches('a[href^="https://"]') && control.hostname !== location.hostname) {
      goal('external_link', { domain: control.hostname });
    }
  });
})();
