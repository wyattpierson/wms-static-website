/* ────────────────────────────────────────────────────────────────
   Album of the Day — album data
   (selection logic lives in albums.js)

   DATA MODEL
   Each album is a plain object. All fields optional except title/artist.
     title:   "Album Title"
     artist:  "Artist / Band"
     year:    2019
     moods:   []  free-ish vocabulary, see TAG VOCAB below
     pace:    "slow" | "medium" | "fast"
     genre:   []
     seasons: []  "spring" | "summer" | "fall" | "winter"  (omit = any)
     spotifyId: "0abc..."   → https://open.spotify.com/album/<id>
       (override with spotifyType: "track" for a single track)
     cover: "img/<spotifyId>.jpg"  // local cover art in ./img (300x300)
     note:          optional one-liner, shown under the tags

   (highlight tracks are a possible future field — albums are meant to be
    listened start to finish, so there is no "start here" for now)

   TAG VOCABULARY (keep consistent; used by strategies + display)
     moods:   mellow, melancholy, upbeat, dreamy, cozy, energetic,
              nostalgic, dark, hopeful, chill, focused, romantic,
              loving, bouncy, melodic, breezy, haunting, scenic
     genre:   indie, rock, pop, electronic, synthwave, ambient, jazz,
              hip-hop, folk, metal, classical, r&b, post-rock
     seasons: spring, summer, fall, winter
   ──────────────────────────────────────────────────────────────── */

const ALBUMS = [
  {
    title: "Water Made Us",
    artist: "Jamila Woods",
    year: 2023,
    moods: ["loving", "mellow", "romantic"],
    pace: "slow",
    genre: ["r&b"],
    seasons: ["spring"],
    spotifyId: "5L24axiCil1SiY0kHV4S2T",
    cover: "img/5L24axiCil1SiY0kHV4S2T.jpg",
    note: "An intimate, emotional and sweet album about love. It will sweep you up in the joy and humanity of it. And she just sounds great.",
  },
  {
    title: "The Renaissance",
    artist: "Q-Tip",
    year: 2008,
    moods: ["upbeat", "bouncy"],
    pace: "medium",
    genre: ["hip-hop"],
    seasons: ["summer"],
    spotifyId: "0EMbzFBRoIt0fmTsowZ8Zv",
    cover: "img/0EMbzFBRoIt0fmTsowZ8Zv.jpg",
    note: "Some nice jazzy hip-hop with great melodies. Perfect for a drive on a sunny day.",
  },
  {
    title: "Flower Boy",
    artist: "Tyler, The Creator",
    year: 2017,
    moods: ["romantic"],
    pace: "medium",
    genre: ["hip-hop"],
    seasons: ["summer"],
    spotifyId: "2nkto6YNI4rUYTLqEwWJ3o",
    cover: "img/2nkto6YNI4rUYTLqEwWJ3o.jpg",
    note: "Other than Who Dat Boy, this album is perfect. It is interesting and thoughtful and suprising and fun. It shocked me this was good when I first listened, and I still remain pleasantly surprised every time I go back to it how good it is.",
  },
  {
    title: "Too High To Riot",
    artist: "Bas",
    year: 2016,
    moods: ["melancholy"],
    pace: "slow",
    genre: ["hip-hop"],
    seasons: ["fall"],
    spotifyId: "0djZBLLoZgWveXvSGQ6AHI",
    cover: "img/0djZBLLoZgWveXvSGQ6AHI.jpg",
    note: "Chill moody hip-hop with a good balance of raps and singy melodies that is a perfect sad laid-back vibe.",
  },
  {
    title: "99.9%",
    artist: "Kaytranada",
    year: 2016,
    moods: ["upbeat", "bouncy"],
    pace: "fast",
    genre: ["electronic"],
    seasons: ["summer"],
    spotifyId: "1dZZh7PvVgce1DDsDPzy8Z",
    cover: "img/1dZZh7PvVgce1DDsDPzy8Z.jpg",
    note: "A perfect bouncy electronic pop album for the summer. There are some true standout bops and it carries a great vibe throughout.",
  },
  {
    title: "Fuse",
    artist: "Everything But The Girl",
    year: 2023,
    moods: ["mellow", "melodic", "melancholy"],
    pace: "slow",
    genre: ["indie", "electronic"],
    seasons: ["winter"],
    spotifyId: "5FQMRfSunEA660c3dYU2Mx",
    cover: "img/5FQMRfSunEA660c3dYU2Mx.jpg",
    note: "A beautiful and haunting album that is lonely and sad with a nice melody.",
  },
  {
    title: "Suddenly",
    artist: "Caribou",
    year: 2020,
    moods: ["breezy", "bouncy"],
    pace: "medium",
    genre: ["electronic"],
    seasons: ["spring"],
    spotifyId: "2RX2Wc0r0n4ztThvRCY307",
    cover: "img/2RX2Wc0r0n4ztThvRCY307.jpg",
    note: "An album that is both a light-breeze of piano and vibes while also having heartfelt vocals that range from loving to lonely.",
  },
  {
    title: "Better Dreaming",
    artist: "Tune-Yards",
    year: 2025,
    moods: ["upbeat"],
    pace: "medium",
    genre: ["indie", "pop"],
    seasons: ["fall"],
    spotifyId: "0TmYypxPNSZe9UqAlQv8F3",
    cover: "img/0TmYypxPNSZe9UqAlQv8F3.jpg",
    note: "Tune-Yards at their best with her unique voice and dynamic instrumentation. It is somehow emotional and challening, while at the same time being a breezy easy-listen.",
  },
  {
    title: "Care For Me",
    artist: "Saba",
    year: 2018,
    moods: ["melancholy", "haunting"],
    pace: "slow",
    genre: ["hip-hop"],
    seasons: ["winter"],
    spotifyId: "1crhG7YecAj6ZN0AAYMYsb",
    cover: "img/1crhG7YecAj6ZN0AAYMYsb.jpg",
    note: "A heartbreaking album of loss and pain. Saba sounds great throughout and the album can be nice background vibes, but even if you aren't paying much attention, it'll hit you hard with the heartbreak of it.",
  },
  {
    title: "Swimming",
    artist: "Mac Miller",
    year: 2018,
    moods: ["chill", "dark", "hopeful"],
    pace: "slow",
    genre: ["hip-hop"],
    seasons: ["fall"],
    spotifyId: "5wtE5aLX5r7jOosmPhJhhk",
    cover: "img/5wtE5aLX5r7jOosmPhJhhk.jpg",
    note: "Mac at his best with nice beats and melodies and a good balance of rapping and singing/vibing.",
  },
  {
    title: "The Suburbs",
    artist: "Arcade Fire",
    year: 2010,
    moods: ["nostalgic", "scenic"],
    pace: "medium",
    genre: ["indie", "rock", "pop"],
    seasons: ["fall"],
    spotifyId: "3DrgM5X3yX1JP1liNLAOHI",
    cover: "img/3DrgM5X3yX1JP1liNLAOHI.jpg",
    note: "Every song sounds great on its own but also feels like it is part of something bigger. It is lush and interesting and scenic and the best version of what this era of indie rock has to offer.",
  },
];
