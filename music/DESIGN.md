# Album of the Day — design notes

Status: scaffold complete, converted from songs → albums.
Next real work: keep filling in actual albums in `js/data.js`, link the page from the main page.

## Files

- `index.html` — the page. Deliberately minimal: cover art / title / artist / year /
  tag chips / optional note / spotify link / pick-again. Cover sits to the right
  of the details on desktop, stacks on top for mobile. Styled to match
  the main site (dark theme, DM Mono + Playfair, grain + glows).
- `js/data.js` — the `ALBUMS` array + data model / tag vocab docs. The only
  file you touch to add albums.
- `js/albums.js` — selection logic (loaded after `data.js`). Plain JS (no
  build step, no JSON fetch, so it also works opened via `file://`).

## Data model (in `js/data.js` → `ALBUMS`)

```
{
  title: "Album Title",
  artist: "Artist / Band",
  year: 2019,
  moods: [],          // see tag vocabulary
  pace: "slow"|"medium"|"fast",
  genre: [],
  seasons: [],        // "spring"|"summer"|"fall"|"winter"; omit = any season
  spotifyId: "...",   // open.spotify.com/album/<id>
  spotifyType: "album", // optional, defaults to "album"; "track" for a single track
  note: "...",        // optional one-liner, shown under the tags
  cover: "img/<spotifyId>.jpg"  // local 300x300 cover in ./img
}

### Cover art

Stored locally in `img/`, named `<spotifyId>.jpg`. To fetch one for a new
album (Spotify's oEmbed endpoint is unauthenticated and returns the cover
URL as `thumbnail_url`):

```sh
curl -s "https://open.spotify.com/oembed?url=https://open.spotify.com/album/<id>" \
  | grep -o '"thumbnail_url":"[^"]*"' | sed 's/"thumbnail_url":"//;s/"$//' \
  | xargs curl -s -o img/<id>.jpg
```

No "start here" / favorite track — albums are meant to be listened start to
finish. Highlight tracks are a possible future field, not shown for now.
```

Albums without a `spotifyId` still get picked; the link renders as a
disabled "no spotify link yet" button.

### Tag vocabulary (keep consistent — strategies + display rely on it)

- **moods**: mellow, melancholy, upbeat, dreamy, cozy, energetic, nostalgic,
  dark, hopeful, chill, focused, romantic, loving, bouncy, melodic, breezy,
  haunting, scenic
- **genre**: indie, rock, pop, electronic, synthwave, ambient, jazz, hip-hop,
  folk, metal, classical, r&b, post-rock
- **pace**: slow / medium / fast
- **seasons**: spring / summer / fall / winter

Vocabulary is deliberately "free-ish" — new tags are fine, but reuse before
inventing so filtering stays meaningful.

## Selection strategies

Swapped via `CONFIG.strategy` at the top of `albums.js`.

| strategy | behavior |
|---|---|
| `deterministic` (default) | seeded PRNG (mulberry32) with `dayOfYear * 1000 + attempts`. Same pick for everyone all day — it's *the* album of the day. |
| `random` | fully random |
| `seasonal` | filter to albums tagged with the current season (falls back to all albums if none match), then deterministic within the pool |
| `weather` *(planned, not built)* | fetch Open-Meteo (free, no API key) → map conditions to moods/pace → filter → pick. Keep as its own function; ~20 lines when we get to it. |

### Pick again

- attempt counter in `localStorage`, keyed per day: `motd-attempts-YYYY-M-D`
- each click advances the seed → sequence stays deterministic per day but
  users can roll; resets naturally the next day
- footer shows "N re-rolls today" as a small touch

## Links

- Spotify only for now: `https://open.spotify.com/album/<id>`
  (or `/track/<id>` with `spotifyType: "track"`). No API keys needed; opens
  in-app for logged-in users.
- Future: Apple Music / YouTube — just add `appleMusicId` etc. and render
  extra buttons in the actions row of `index.html`.

## Possible later expansions (not committed)

- Spotify embed player (easy, but visually heavy — the link keeps it clean)
- "why" line could show the matched tags instead of a seed note
- curated moods mode: user picks a mood chip, page filters live
- highlight tracks (a few named tracks, no "start here" — albums play in order)

## TODO

- [ ] keep adding real albums to `js/data.js`
- [ ] add `music` link to main page (see `/SITE-PLAN.md`)
- [ ] decide: keep deterministic default, or make it seasonal by default?
