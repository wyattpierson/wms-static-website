/* ────────────────────────────────────────────────────────────────
   Album of the Day — selection logic
   (the ALBUMS data lives in data.js, loaded before this file)
   ────────────────────────────────────────────────────────────────

   STRATEGIES  (swap in CONFIG.strategy)
     "deterministic"  same pick for everyone on a given day.
                      seed = day-of-year
     "random"         fully random
     "seasonal"       filters by current season first, then deterministic
     "weather"        (planned) fetch Open-Meteo (free, no key) and map
                      conditions → moods/pace, filter, then pick.
                      Keep it a separate function so it's easy to add.

   ──────────────────────────────────────────────────────────────── */

const CONFIG = {
  strategy: "deterministic", // "deterministic" | "random" | "seasonal"
};

/* ── helpers ── */

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

function currentSeason() {
  const m = new Date().getMonth(); // 0-11
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
}

/* deterministic PRNG (mulberry32) so "the" pick is stable per seed */
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── strategies ── */

function filterBySeason(albums) {
  const season = currentSeason();
  const inSeason = albums.filter(a => a.seasons && a.seasons.includes(season));
  return inSeason.length ? inSeason : albums; // fall back to all if none tagged
}

function pickAlbum() {
  if (!ALBUMS.length) return null;

  let pool = ALBUMS;
  let why = [];

  if (CONFIG.strategy === "seasonal") {
    pool = filterBySeason(ALBUMS);
    why.push(`in season: ${currentSeason()}`);
  }

  if (CONFIG.strategy === "random") {
    const idx = Math.floor(Math.random() * pool.length);
    return { album: pool[idx], why: why.length ? why : ["just felt like it"] };
  }

  // "deterministic" (and "seasonal") — stable per day
  const seed = dayOfYear() * 1000;
  const rng = makeRng(seed);
  const idx = Math.floor(rng() * pool.length);
  return { album: pool[idx], why };
}
