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
  const download = byId('download-answer');
  download.onclick = () => {
    const canvas = drawSongCard(byId('answered-question').textContent,
      byId('answer-lines').textContent, byId('answer-song').textContent,
      card.querySelector('.answer-signature').textContent);
    const link = document.createElement('a');
    link.download = 'dmpostpunk-' + previous.entry.song + '.png';
    link.href = canvas.toDataURL('image/png');
    document.body.append(link);
    link.click();
    link.remove();
  };

  let timer;
  let previous;
  const pick = items => items[Math.floor(Math.random() * items.length)];
  byId('ask-song').hidden = false;

  function reset() {
    clearTimeout(timer);
    form.hidden = false;
    card.hidden = loading.hidden = again.hidden = download.hidden = true;
    links.replaceChildren();
  }
  dialog.addEventListener('close', reset);
  again.onclick = () => { reset(); input.focus(); input.select(); };
  byId('random-question').onclick = () => {
    input.value = pick(questions.filter(q => q !== input.value));
    input.focus();
  };

  function drawSongCard(question, quote, song, signature) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    const left = 80;
    const width = canvas.width - left * 2;
    ctx.fillStyle = '#f7efd9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#603526';
    ctx.fillRect(0, 0, canvas.width, 22);
    ctx.textBaseline = 'top';

    function linesFor(text) {
      const lines = [];
      for (const paragraph of text.split('\n')) {
        let line = '';
        for (const word of paragraph.split(/\s+/).filter(Boolean)) {
          if (line && ctx.measureText(line + ' ' + word).width > width) {
            lines.push(line);
            line = '';
          }
          if (line) line += ' ';
          for (const char of word) {
            if (line && ctx.measureText(line + char).width > width) {
              lines.push(line);
              line = '';
            }
            line += char;
          }
        }
        lines.push(line);
      }
      return lines;
    }
    function block(text, y, size, style, family, maxHeight) {
      let lines;
      let leading;
      do {
        ctx.font = style + ' ' + size + 'px ' + family;
        leading = Math.ceil(size * 1.23);
        lines = linesFor(text);
        if (lines.length * leading <= maxHeight) break;
        size -= 2;
      } while (size > 12);
      for (const line of lines) {
        ctx.fillText(line, left, y);
        y += leading;
      }
      return y;
    }
    ctx.fillStyle = '#603526';
    block('ДВОРЕЦ МОЛОДЕЖИ', 80, 34, 'bold', 'sans-serif', 60);
    ctx.fillRect(left, 161, width, 2);
    const end = block(question.replace(/\s+/g, ' ').trim(), 212, 43, 'normal', 'sans-serif', 300);
    ctx.fillStyle = '#38271e';
    const start = Math.max(440, end + 70);
    const bottom = block(quote, start, 76, 'italic', 'Georgia, serif', 1000 - start);
    ctx.fillStyle = '#603526';
    block(song, bottom + 38, 32, 'bold', 'sans-serif', 120);
    ctx.fillRect(left, 1180, width, 2);
    block(signature, 1225, 32, 'normal', 'sans-serif', 90);
    return canvas;
  }

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
      card.hidden = download.hidden = false;
      addLinks(answer.entry);
      again.hidden = false;
      download.focus({ preventScroll: true });
      dialog.scrollTop = 0;
    }, 3000);
  };
})();