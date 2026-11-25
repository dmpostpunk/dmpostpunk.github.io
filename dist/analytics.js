(() => {
  if (typeof window.ym !== 'function') return;
  const id = 114676517;

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
