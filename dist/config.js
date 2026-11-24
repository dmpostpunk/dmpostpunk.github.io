window.SITE = {
  // Добавляйте альбомы в порядке показа. В embed вставьте весь iframe или его src.
  albums: [
    { title: 'ДМ', loader: 'cassettes/ДМ.jpg', background: 'backgrounds/01-evening.jpg', embed: 'https://music.yandex.ru/iframe/album/40051807' },
    {
      "title": "Мой компьютер", loader: 'cassettes/my-computer.jpg',
      "credit": "Дизайн карточек: Алексей Бусыгин",
      "background": "my-computer/monitor.png",
      "tracks": [
        {
          "song": "GOOD DAYS",
          "iframe": "https://music.yandex.ru/iframe/album/37730343/track/141719247",
          "cards": [
            "my-computer/track-1-1.jpg",
            "my-computer/track-1-2.jpg"
          ]
        },
        {
          "song": "MEMORIES",
          "iframe": "https://music.yandex.ru/iframe/album/37730343/track/141719282",
          "cards": [
            "my-computer/track-2-1.jpg",
            "my-computer/track-2-2.jpg"
          ]
        },
        {
          "song": "FRIENDS",
          "iframe": "https://music.yandex.ru/iframe/album/37730343/track/141719287",
          "cards": [
            "my-computer/track-3-1.jpg",
            "my-computer/track-3-2.jpg"
          ]
        },
        {
          "song": "CELLAR DOOR",
          "iframe": "https://music.yandex.ru/iframe/album/37730343/track/141719288",
          "cards": [
            "my-computer/track-4-1.jpg",
            "my-computer/track-4-2.jpg"
          ]
        }
      ],
      "questions": [
        {
          "question": "Почему альбом так называется?",
          "answer": "Идея такая: это 17-летний я, который сел за свой комп с большим пузатым монитором 20 лет назад. И каждый трек связан с занятием на компе. Плюс метафорично, что «My Computer» — это личное пространство в общем смысле: фотки и видео, переписки, развлечения, творчество.",
          "front": "my-computer/question-1-1.jpg",
          "back": "my-computer/question-1-2.jpg"
        },
        {
          "question": "Как долго работал над альбомом?",
          "answer": "Процесс записи занял примерно два месяца. Причем, демки сделал очень быстро, а вот довести их до текущего состояния заняло много времени и сил. Что-то упрощал по аранжировке, где-то полностью менял звук, иногда приходилось перезаписывать гитару.",
          "front": "my-computer/question-2-1.jpg",
          "back": "my-computer/question-2-2.jpg"
        },
        {
          "question": "Почему альбом, а не сингл?",
          "answer": "Мне нравится, когда несколько артефактов пронизывает единая мысль. Треки уже не просто сами по себе, а вместе рождают новые смыслы. Плюс это возможность наполнить релиз образами, которые так или иначе сопровождают тебя, пока пишешь музыку.",
          "front": "my-computer/question-3-1.jpg",
          "back": "my-computer/question-3-2.jpg"
        }
      ]
    },
    { title: 'Апрель', loader: 'cassettes/апрель.jpg', background: 'scenes/april.jpg', embed: 'https://music.yandex.ru/iframe/album/36070176' },
  ],
  // Для новой песни добавьте строку с названием и адресом или полным кодом iframe.
  allSongs: { title: 'Счастье мое, я здесь и я жду тебя', loader: 'cassettes/счастье.jpg', background: 'scenes/all-songs.png', credit: 'Автор фото: Алексей Бусыгин' },
  songs: [
    { song: 'Поезда', iframe: 'https://music.yandex.ru/iframe/album/42083980/track/136041767' },
    { song: 'Панельки', iframe: 'https://music.yandex.ru/iframe/album/39958696/track/146676507' },
    { song: 'Игра', iframe: 'https://music.yandex.ru/iframe/album/41171293/track/149306813' },
    { song: 'Наступит время', iframe: 'https://music.yandex.ru/iframe/album/44332770/track/156801465' },
    { song: 'Дурак', iframe: 'https://music.yandex.ru/iframe/album/41134913/track/149228786' },
    { song: 'Зачем мне это', iframe: 'https://music.yandex.ru/iframe/album/41437507/track/149931141' },
    { song: 'Автобусы', iframe: 'https://music.yandex.ru/iframe/album/41134916/track/149228792' },
    { song: 'Поезда 2', iframe: 'https://music.yandex.ru/iframe/album/40362146/track/147534275' },
    { song: 'С неба на землю', iframe: 'https://music.yandex.ru/iframe/album/41134296/track/149227410' },
    { song: 'Goodbye Forever', iframe: 'https://music.yandex.ru/iframe/album/37105051/track/140292437' },
    { song: 'Смех и соль', iframe: 'https://music.yandex.ru/iframe/album/41134637/track/149228136' },
    { song: 'По весне', iframe: 'https://music.yandex.ru/iframe/album/41806722/track/150778788' },
    { song: 'Разлука', iframe: 'https://music.yandex.ru/iframe/album/41134917/track/149228796' },
    { song: 'Черная вода', iframe: 'https://music.yandex.ru/iframe/album/41171301/track/149306835' },
  ],
  soonUrl: 'https://band.link/dm_horizon',
  about: 'Дворец молодежи - артист из России в жанре postpunk/new wave, попадал в Нитро Яндекса и многочисленные плейлисты',
  backgroundSeconds: 60,
  grain: { size: 1, fps: 9, opacity: 0.075 },
  links: {
    'Музыка': {
      'Яндекс Музыка': 'https://music.yandex.ru/artist/23365522',
      'VK Музыка': 'https://vk.ru/artist/dvoretsmolodezhi',
      'Spotify': 'https://open.spotify.com/artist/1V0YTOcM6BXFCO6xOmknYc',
      'Apple Music': 'https://music.apple.com/ru/artist/дворец-молодежи/1784722133'
    },
    'Соцсети': {
      'Telegram': 'https://t.me/dm_postpunk',
      'ВКонтакте': 'https://vk.com/dm_postpunk',
      'Instagram': 'https://www.instagram.com/dm_postpunk/',
      'YouTube': 'https://www.youtube.com/@dm_postpunk',
      'TikTok': 'https://www.tiktok.com/@dm_postpunk',
      'BandLink': 'https://band.link/dm_postpunk'
    }
  }
};
