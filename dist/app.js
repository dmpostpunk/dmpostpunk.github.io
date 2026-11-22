const cfg = window.SITE;
const byId = id => document.getElementById(id);
byId('bio').textContent = cfg.about;
byId('soon').href = cfg.soonUrl;
byId('listen').href = cfg.links['Музыка']['Яндекс Музыка'];
for (const [name, links] of Object.entries(cfg.links)) {
  const group = document.createElement('section');
  const heading = document.createElement('h3');
  heading.textContent = name;
  group.append(heading);
  for (const [label, url] of Object.entries(links)) {
    const link = document.createElement('a');
    Object.assign(link, { textContent: label, href: url, target: '_blank', rel: 'noopener' });
    group.append(link);
  }
  byId('groups').append(group);
}
for (const button of document.querySelectorAll('[data-open]')) {
  button.onclick = () => byId(button.dataset.open).showModal();
}
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.close').onclick = () => dialog.close();
  dialog.onclick = event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  };
}
function embedUrl(value) {
  const input = String(value ?? '').trim();
  const src = input.startsWith('<')
    ? new DOMParser().parseFromString(input, 'text/html').querySelector('iframe')?.getAttribute('src')
    : input;
  try {
    const url = new URL(src);
    if (url.protocol === 'https:' && ['music.yandex.ru', 'music.yandex.com'].includes(url.hostname)) return url.href;
  } catch { return null; }
  return null;
}

function loadPlayer(title, src, isSong = false) {
  const frame = document.createElement('iframe');
  frame.src = src;
  frame.title = title + ' — Яндекс Музыка';
  frame.allow = 'autoplay; encrypted-media; clipboard-write';
  if (isSong) frame.className = 'song-player';
  byId('player').replaceChildren(frame);
}

function addChoice(group, label, select, before = null) {
  const button = document.createElement('button');
  button.textContent = label;
  button.setAttribute('aria-pressed', 'false');
  group.insertBefore(button, before);
  button.onclick = () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    for (const sibling of group.querySelectorAll('button')) {
      sibling.setAttribute('aria-pressed', String(sibling === button));
    }
    select();
  };
}

const tabs = byId('tabs');
const songList = document.createElement('div');
songList.id = 'song-list';
songList.setAttribute('role', 'group');
songList.setAttribute('aria-label', 'Выберите песню');
songList.hidden = true;
byId('player').before(songList);
const gallery = document.createElement('div');
gallery.id = 'album-cards';
byId('player').after(gallery);
function picture(src, alt) {
  const img = new Image();
  img.src = src;
  img.alt = alt;
  return img;
}
function trackCard(url, label) {
  const button = document.createElement('button');
  button.className = 'enlarge';
  button.setAttribute('aria-label', 'Увеличить: ' + label);
  button.append(picture(url, label));
  button.onclick = () => {
    const full = byId('full-card');
    full.src = url;
    full.alt = label;
    byId('card-view').showModal();
  };
  return button;
}
function questionCard(q) {
  const button = document.createElement('button');
  button.className = 'flip';
  const front = picture(q.front, '');
  const back = picture(q.back, '');
  const turn = opened => {
    button.setAttribute('aria-pressed', String(opened));
    button.setAttribute('aria-label', opened ? q.question + ' ' + q.answer : q.question + ' Показать ответ');
  };
  button.append(front, back);
  turn(false);
  button.onclick = () => turn(button.getAttribute('aria-pressed') !== 'true');
  return button;
}
function resetSection(album = {}) {
  songList.replaceChildren();
  songList.hidden = true;
  gallery.replaceChildren();
  setBackground(album.background, album.credit);
}
function showTracks(album) {
  songList.hidden = false;
  let currentTrack;
  for (const track of album.tracks) {
    const src = embedUrl(track.iframe);
    if (!src) continue;
    addChoice(songList, track.song, () => {
      if (currentTrack !== track) loadPlayer(track.song, src, true);
      currentTrack = track;
      gallery.className = 'track-cards';
      gallery.replaceChildren(...track.cards.map((url,i) => trackCard(url, track.song + (i ? ' — история трека' : ' — коллаж'))));
    });
  }
  const first = songList.firstElementChild;
  if (album.questions?.length) addChoice(songList, 'Об альбоме', () => {
    gallery.className = 'questions';
    gallery.replaceChildren(...album.questions.map(questionCard));
  });
  first?.click();
}
for (const album of cfg.albums) {
  const src = embedUrl(album.embed);
  if (src || album.tracks?.length) addChoice(tabs, album.title, () => {
    resetSection(album);
    if (album.tracks?.length) showTracks(album);
    else loadPlayer(album.title, src);
  }, byId('soon'));
}
if (cfg.songs?.length) addChoice(tabs, 'Все песни', () => {
  resetSection(cfg.allSongs);
  byId('player').replaceChildren();
  songList.hidden = false;
  for (const track of cfg.songs) {
    const src = embedUrl(track.iframe);
    if (src) addChoice(songList, track.song, () => loadPlayer(track.song, src, true));
  }
}, byId('soon'));

const grain = byId('grain');
const tile = document.createElement('canvas');
tile.width = tile.height = 128;
const ctx = tile.getContext('2d');
const dots = ctx.createImageData(128,128);
for (let i=0; i<dots.data.length; i+=4) {
  const value = Math.floor(Math.random()*256);
  dots.data.set([value,value,value,255],i);
}
ctx.putImageData(dots,0,0);
grain.style.backgroundImage = 'url('+tile.toDataURL()+')';
grain.style.backgroundSize = (128 * Math.max(0.25,cfg.grain.size))+'px';
grain.style.opacity = cfg.grain.opacity;
if (cfg.grain.fps > 0 && cfg.grain.opacity > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => { grain.style.backgroundPosition = Math.random()*128+'px '+Math.random()*128+'px'; },1000/Math.min(60,cfg.grain.fps));
}
const scenes = window.BACKGROUNDS;
let current = 0;
let pinnedBackground;
let request = 0;
function setBackground(path, credit = '') {
  pinnedBackground = path;
  const url = path || (scenes[current] && 'backgrounds/'+encodeURIComponent(scenes[current]));
  const token = ++request;
  if (!url) return byId('scene').replaceChildren();
  const img = new Image();
  img.alt = '';
  img.onload = () => {
    if (token !== request) return;
    const scene = byId('scene');
    const previous = [...scene.children];
    scene.append(img);
    byId('credit').textContent = credit;
    byId('credit').hidden = !credit;
    Promise.allSettled(img.getAnimations().map(animation => animation.finished))
      .then(() => previous.forEach(layer => layer.remove()));
  };
  img.src = url;
}
if (scenes.length > 1) setInterval(() => {
  if (pinnedBackground) return;
  current = (current+1)%scenes.length;
  setBackground();
}, Math.max(1,cfg.backgroundSeconds)*1000);
tabs.querySelector('button')?.click();
