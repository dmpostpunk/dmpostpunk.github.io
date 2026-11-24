(() => {
  const questions = ['Что меня ждёт?', 'В чём смысл?', 'Как жить?', 'Куда мы идём?', 'Кто мы?', 'Откуда мы?', 'Что мне пора отпустить?', 'О чём я молчу?', 'Что я увижу, если остановлюсь?', 'Что взять с собой в завтра?', 'Где искать свой дом?'];
  const presaves = { 'Солнце': 'https://band.link/dm_sun_2026', 'Метель': 'https://band.link/dm_snowstorm' };
  const answers = window.SONG_ANSWERS.flatMap(entry => entry.quotes.map(lines => ({ entry, lines })));
  if (!answers.length) return;
  const dialog = byId('answer-dialog');
  const input = byId('song-question');
  const form = byId('answer-form');
  const loading = byId('answer-loading');
  const card = byId('answer-card');
  const links = byId('answer-links');
  const again = byId('another-question');
  let timer;
  let previous;
  const pick = items => items[Math.floor(Math.random() * items.length)];
  byId('ask-song').hidden = false;

  function reset() {
    clearTimeout(timer);
    form.hidden = false;
    card.hidden = loading.hidden = again.hidden = true;
    links.replaceChildren();
  }
  dialog.addEventListener('close', reset);
  again.onclick = () => { reset(); input.focus(); input.select(); };
  byId('random-question').onclick = () => {
    input.value = pick(questions.filter(q => q !== input.value));
    input.focus();
  };

  function addLinks(entry) {
    const presave = presaves[entry.song];
    const sections = [...cfg.albums, cfg.allSongs];
    const section = sections.find(album => album && (entry.album === album.title ||
      (album.tracks || (album === cfg.allSongs ? cfg.songs : []))?.some(t => t.song === entry.song)));
    const tracks = section?.tracks || (section === cfg.allSongs ? cfg.songs : []);
    const track = tracks?.find(t => t.song === entry.song);
    const src = embedUrl(track?.iframe || entry.iframe);
    if (!presave && section && (src || section.embed)) {
      const button = document.createElement('button');
      button.textContent = src ? 'Открыть в плеере' : 'Открыть альбом «' + section.title + '»';
      button.onclick = () => {
        dialog.close();
        const tab = [...tabs.querySelectorAll('button')].find(b => b.firstChild.textContent === section.title);
        tab?.click();
        const trackButton = trackButtons.get(src);
        if (trackButton) trackButton.click();
        else if (src) loadPlayer(entry.song, src, true);
        player.scrollIntoView({ block: 'center' });
      };
      links.append(button);
    }
    const external = { ...entry.links };
    if (presave) external['Пресейв'] = presave;
    else if (src && !external['Яндекс Музыка']) external['Яндекс Музыка'] = src.replace('/iframe/', '/');
    for (const [name, href] of Object.entries(external)) {
      if (!href.startsWith('https://')) continue;
      const a = document.createElement('a');
      Object.assign(a, { textContent: name, href, target: '_blank', rel: 'noopener' });
      links.append(a);
    }
  }
  form.onsubmit = event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) { input.value = ''; input.reportValidity(); return; }
    if (form.hidden) return;
    form.hidden = true;
    loading.hidden = false;
    timer = setTimeout(() => {
      const answer = pick(answers.length > 1 ? answers.filter(a => a !== previous) : answers);
      previous = answer;
      byId('answered-question').textContent = question;
      byId('answer-lines').textContent = answer.lines;
      byId('answer-song').textContent = 'Дворец молодежи — ' + answer.entry.song;
      loading.hidden = true;
      card.hidden = false;
      addLinks(answer.entry);
      again.hidden = false;
      again.focus({ preventScroll: true });
      dialog.scrollTop = 0;
    }, 3000);
  };
})();