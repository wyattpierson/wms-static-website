// ── SEASON 1: DATA + RENDERING
// Everything in this file only affects Season 1.

// ── DATA ───────────────────────────────────────────────────────────────
const TEAMS = {
  eli:     { name:'Eli',     teamName:"Emerald City Empoleons",            pokemon:['charizard-mega-y','starmie','venusaur','kingambit','espathra','zoroark-hisui','rotom-wash','kangaskhan','tinkaton','gallade','vivillon'] },
  jake:    { name:'Jake',   teamName:"Motor City Mausholds",            pokemon:['froslass','glimmora','gyarados','rotom-frost','talonflame','dragapult','scovillain','gardevoir','maushold','liepard','ceruledge'] },
  deshans: { name:'Deshans',teamName:"C-City Charcadets",          pokemon:['sableye','golurk','lucario','oranguru','incineroar','hydrapple','primarina','aegislash','ninetales-alola','noivern','typhlosion-hisui'] },
  tim:     { name:'Tim',    teamName:"Taipei Taiphlosions",             pokemon:['garchomp','gengar','skarmory','whimsicott','farigiraf','rotom-heat','milotic','palafin','mamoswine','empoleon','excadrill'] },
  sam:     { name:'Sam',    teamName:"Big Apple Hydrapples", pokemon:['dragonite','aerodactyl','blastoise','sneasler','tsareena','klefki','sylveon','arcanine-hisui','meowscarada','corviknight','weavile'] },
  wyatt:   { name:'Wyatt',  teamName:'Sage Town Slows',        pokemon:['tyranitar','scizor','slowbro','sinistcha','basculegion-male','archaludon','meowstic-male','pelipper','mimikyu','hydreigon','volcarona'] },
};

const TRAINERS = {
  eli:     { name:'Eli',     championsId:'7609 7098 9181', switchId:'SW-1254-5136-0241', discord:'Eli | ThatsNoMun' },
  jake:    { name:'Jake',    championsId:null,              switchId:null,                discord:'ajaxislemons' },
  deshans: { name:'Deshans', championsId:'1845 5200 2383', switchId:'SW-2372-7344-3332', discord:'Aura' },
  tim:     { name:'Tim',     championsId:'6309 9377 9475', switchId:'SW-2498-4550-2900', discord:'Taymooth' },
  sam:     { name:'Sam',     championsId:'4234 1744 6458',  switchId:'SW-1425-0854-2900', discord:'Taffy Lee Fubbins' },
  wyatt:   { name:'Wyatt',   championsId:'0853 7544 9900',  switchId:'SW-0753-1737-4306', discord:'booerns' },
};

// Pokemon that need a different API slug than what we store
const API_SLUG = {
  'charizard-mega-y': 'charizard',
  'zoroark-hisui':    'zoroark-hisui',
  'rotom-wash':       'rotom-wash',
  'rotom-frost':      'rotom-frost',
  'rotom-heat':       'rotom-heat',
  'ninetales-alola':  'ninetales-alola',
  'typhlosion-hisui': 'typhlosion-hisui',
  'arcanine-hisui':   'arcanine-hisui',
  'maushold':         'maushold-family-of-four',
  'aegislash':        'aegislash-shield',
  'palafin':          'palafin-zero',
  'basculegion-male': 'basculegion-male',
  'meowstic-male':    'meowstic-male',
  'mimikyu':          'mimikyu-disguised',
};

const DISPLAY_NAMES = {
  'charizard-mega-y':'Charizard-Y','zoroark-hisui':'H-Zoroark','rotom-wash':'Rotom-W',
  'rotom-frost':'Rotom-F','rotom-heat':'Rotom-H','ninetales-alola':'A-Ninetales',
  'typhlosion-hisui':'H-Typhlosion','arcanine-hisui':'H-Arcanine','farigiraf':'Farigiraf',
  'palafin':'Palafin','palafin-zero':'Palafin','maushold':'Maushold','scovillain':'Scovillain',
  'basculegion-male':'Basculegion (M)','sinistcha':'Sinistcha','meowstic-male':'Meowstic (M)',
  'archaludon':'Archaludon','sneasler':'Sneasler','ceruledge':'Ceruledge',
  'hydrapple':'Hydrapple','meowscarada':'Meowscarada','corviknight':'Corviknight',
  'mimikyu':'Mimikyu','mimikyu-disguised':'Mimikyu','aegislash':'Aegislash',
  'aegislash-shield':'Aegislash',
};

// Pokemon with Mega evolutions (Champions-verified)
// apiSlug: use PokeAPI slug if available, null if Champions-only mega (hardcoded stats instead)
// Alternate forms (non-mega) — tab label → api slug
const ALT_FORMS = {
  'aegislash': [
    { label: 'Shield', apiSlug: 'aegislash-shield' },
    { label: 'Blade',  apiSlug: 'aegislash-blade'  },
  ],
  'palafin': [
    { label: 'Zero', apiSlug: 'palafin-zero' },
    { label: 'Hero', apiSlug: 'palafin-hero' },
  ],
};

const SCHEDULE = [
  { key:'week1',  label:'Week 1',   dateRange:'June 1–7',       calWeek:1, matches:[['Eli','Wyatt'],['Jake','Sam'],['Deshans','Tim']] },
  { key:'week2',  label:'Week 2',   dateRange:'June 8–14',      calWeek:2, matches:[['Eli','Jake'],['Deshans','Wyatt'],['Tim','Sam']] },
  { key:'week3a', label:'Week 3-A', dateRange:'June 15–21',     calWeek:3, matches:[['Eli','Deshans'],['Jake','Tim'],['Sam','Wyatt']] },
  { key:'week3b', label:'Week 3-B', dateRange:'June 15–21',     calWeek:3, matches:[['Eli','Tim'],['Jake','Wyatt'],['Deshans','Sam']] },
  { key:'week4a', label:'Week 4-A', dateRange:'June 22–28',     calWeek:4, matches:[['Eli','Sam'],['Jake','Deshans'],['Tim','Wyatt']] },
  { key:'week4b', label:'Week 4-B', dateRange:'June 22–28',     calWeek:4, matches:[['Eli','Wyatt'],['Jake','Sam'],['Deshans','Tim']] },
  { key:'week5a', label:'Week 5-A', dateRange:'June 29–July 5', calWeek:5, matches:[['Eli','Jake'],['Deshans','Wyatt'],['Tim','Sam']] },
  { key:'week5b', label:'Week 5-B', dateRange:'June 29–July 5', calWeek:5, matches:[['Eli','Deshans'],['Jake','Tim'],['Sam','Wyatt']] },
  { key:'week6a', label:'Week 6-A', dateRange:'July 6–12',      calWeek:6, matches:[['Eli','Tim'],['Jake','Wyatt'],['Deshans','Sam']] },
  { key:'week6b', label:'Week 6-B', dateRange:'July 6–12',      calWeek:6, matches:[['Eli','Sam'],['Jake','Deshans'],['Tim','Wyatt']] },
  { key:'champ',  label:'🏆 Championship', dateRange:'July 13',  calWeek:7, matches:[['Wyatt','Sam']] },
];

// Results: key = {weekKey}-{matchIndex}, value = winner name
const RESULTS = {
  'week1-0': 'Wyatt',   // Wyatt def. Eli 2-1
  'week1-1': 'Sam',     // Sam def. Jake 2-1
  'week1-2': 'Tim',     // Tim def. Deshans 2-1
  'week2-0': 'Eli',     // Eli def. Jake 2-0
  'week2-1': 'Wyatt',   // Wyatt def. Deshans 2-0
  'week2-2': 'Tim',     // Tim def. Sam 2-0
  'week3a-0': 'Eli',    // Eli def. Deshans 2-0
  'week3a-1': 'Jake',   // Jake def. Tim 2-0
  'week3a-2': 'Wyatt',  // Wyatt def. Sam 2-1
  'week3b-0': 'Tim',    // Tim def. Eli 2-1
  'week3b-1': 'Wyatt',  // Wyatt def. Jake 2-1
  'week3b-2': 'Deshans',// Deshans def. Sam 2-1
  'week4a-0': 'Eli',    // Eli def. Sam 2-0
  'week4a-1': 'Jake',   // Jake def. Deshans 2-1
  'week4a-2': 'Wyatt',  // Wyatt def. Tim 2-0
  'week4b-0': 'Wyatt',  // Wyatt def. Eli 2-0
  'week4b-1': 'Sam',    // Sam def. Jake 2-0
  'week4b-2': 'Tim',    // Tim def. Deshans 2-1
  'week5a-0': 'Eli',    // Eli def. Jake 2-1
  'week5a-1': 'Deshans',// Deshans def. Wyatt 2-0
  'week5a-2': 'Sam',     // Sam def. Tim 2-0
  'week5b-0': 'Deshans',// Deshans def. Eli 2-0
  'week5b-1': 'Tim',    // Tim def. Jake 2-1
  'week5b-2': 'Sam',    // Sam def. Wyatt 2-0
  'week6a-0': 'Eli',    // Eli def. Tim 2-0
  'week6a-1': 'Wyatt',  // Wyatt def. Jake 2-1
  'week6a-2': 'Sam',    // Sam def. Deshans 2-1
  'week6b-0': 'Sam',    // Sam def. Eli 2-0
  'week6b-1': 'Deshans',// Deshans def. Jake 2-0
  'week6b-2': 'Wyatt',   // Wyatt def. Tim 2-1
  'champ-0':  'Wyatt',   // Wyatt def. Sam 2-0 🏆
};

// Scores: key = {weekKey}-{matchIndex}
const SCORES = {
  'week1-0': '2-1', 'week1-1': '2-1', 'week1-2': '2-1',
  'week2-0': '2-0', 'week2-1': '2-0', 'week2-2': '2-0',
  'week3a-0': '2-0', 'week3a-1': '2-0', 'week3a-2': '2-1',
  'week3b-0': '2-1', 'week3b-1': '2-1', 'week3b-2': '2-1',
  'week4a-0': '2-0', 'week4a-1': '2-1', 'week4a-2': '2-0',
  'week4b-0': '2-0', 'week4b-1': '2-0', 'week4b-2': '2-1',
  'week5a-0': '2-1', 'week5a-1': '2-0', 'week5a-2': '2-0',
  'week5b-0': '2-0', 'week5b-1': '2-1', 'week5b-2': '2-0',
  'week6a-0': '2-0', 'week6a-1': '2-0', 'week6a-2': '2-1',
  'week6b-0': '2-0', 'week6b-1': '2-0', 'week6b-2': '2-1',
  'champ-0':  '2-0',
};

// Lineups: key = {weekKey}-{matchIndex}-{trainerName lowercase}
const LINEUPS = {
  // Week 1
  'week1-0-eli':      ['charizard-mega-y','kingambit','rotom-wash','venusaur','vivillon','zoroark-hisui'],
  'week1-0-wyatt':    ['archaludon','basculegion-male','pelipper','sinistcha','tyranitar','volcarona'],
  'week1-1-jake':     ['ceruledge','gardevoir','glimmora','gyarados','maushold','talonflame'],
  'week1-1-sam':      ['arcanine-hisui','blastoise','corviknight','klefki','meowscarada','sylveon'],
  'week1-2-deshans':  ['golurk','hydrapple','incineroar','lucario','oranguru','primarina'],
  'week1-2-tim':      ['empoleon','farigiraf','garchomp','gengar','rotom-heat','whimsicott'],
  // Week 2
  'week2-0-eli':      ['charizard-mega-y','gallade','kingambit','rotom-wash','vivillon','zoroark-hisui'],
  'week2-0-jake':     ['dragapult','froslass','glimmora','gyarados','scovillain','talonflame'],
  'week2-1-deshans':  ['golurk','hydrapple','incineroar','lucario','oranguru','primarina'],
  'week2-1-wyatt':    ['basculegion-male','hydreigon','pelipper','scizor','sinistcha','volcarona'],
  'week2-2-tim':      ['empoleon','gengar','mamoswine','milotic','rotom-heat','whimsicott'],
  'week2-2-sam':      ['blastoise','corviknight','dragonite','klefki','meowscarada','tsareena'],
  // Week 3-A
  'week3a-0-eli':     ['kangaskhan','kingambit','rotom-wash','venusaur','vivillon','zoroark-hisui'],
  'week3a-0-deshans': ['lucario','ninetales-alola','noivern','primarina','sableye','typhlosion-hisui'],
  'week3a-1-jake':    ['dragapult','froslass','gardevoir','glimmora','maushold','rotom-frost'],
  'week3a-1-tim':     ['empoleon','gengar','mamoswine','milotic','rotom-heat','whimsicott'],
  'week3a-2-sam':     ['aerodactyl','arcanine-hisui','dragonite','klefki','sylveon','weavile'],
  'week3a-2-wyatt':   ['archaludon','mimikyu','pelipper','scizor','sinistcha','slowbro'],
  // Week 3-B
  'week3b-0-eli':     ['charizard-mega-y','gallade','kingambit','rotom-wash','venusaur','vivillon'],
  'week3b-0-tim':     ['farigiraf','garchomp','gengar','mamoswine','rotom-heat','whimsicott'],
  'week3b-1-jake':    ['froslass','gardevoir','glimmora','maushold','rotom-frost','talonflame'],
  'week3b-1-wyatt':   ['archaludon','basculegion-male','hydreigon','pelipper','scizor','tyranitar'],
  'week3b-2-deshans': ['lucario','ninetales-alola','noivern','primarina','sableye','typhlosion-hisui'],
  'week3b-2-sam':     ['aerodactyl','blastoise','dragonite','klefki','sneasler','tsareena'],
  // Week 4-A
  'week4a-0-eli':     ['charizard-mega-y','espathra','kangaskhan','rotom-wash','venusaur','vivillon'],
  'week4a-0-sam':     ['aerodactyl','corviknight','dragonite','klefki','meowscarada','tsareena'],
  'week4a-1-jake':    ['froslass','glimmora','gyarados','rotom-frost','scovillain','talonflame'],
  'week4a-1-deshans': ['incineroar','lucario','ninetales-alola','noivern','primarina','typhlosion-hisui'],
  'week4a-2-wyatt':   ['archaludon','basculegion-male','hydreigon','meowstic-male','pelipper','scizor'],
  'week4a-2-tim':     ['farigiraf','garchomp','gengar','mamoswine','rotom-heat','whimsicott'],
  // Week 4-B
  'week4b-0-wyatt':   ['archaludon','meowstic-male','pelipper','sinistcha','slowbro','tyranitar'],
  'week4b-0-eli':     ['kangaskhan','kingambit','rotom-wash','venusaur','vivillon','zoroark-hisui'],
  'week4b-1-sam':     ['aerodactyl','arcanine-hisui','blastoise','dragonite','klefki','meowscarada'],
  'week4b-1-jake':    ['froslass','glimmora','gyarados','rotom-frost','scovillain','talonflame'],
  'week4b-2-deshans': ['incineroar','lucario','ninetales-alola','noivern','primarina','typhlosion-hisui'],
  'week4b-2-tim':     ['empoleon','farigiraf','gengar','palafin','rotom-heat','whimsicott'],
  // Week 5-A
  'week5a-0-eli':     ['charizard-mega-y','kingambit','rotom-wash','tinkaton','venusaur','zoroark-hisui'],
  'week5a-0-jake':    ['ceruledge','froslass','gardevoir','glimmora','maushold','talonflame'],
  'week5a-1-deshans': ['golurk','incineroar','lucario','ninetales-alola','oranguru','primarina'],
  'week5a-1-wyatt':   ['basculegion-male','meowstic-male','pelipper','scizor','slowbro','volcarona'],
  'week5a-2-tim':     ['farigiraf','garchomp','gengar','mamoswine','rotom-heat','whimsicott'],
  'week5a-2-sam':     ['aerodactyl','arcanine-hisui','blastoise','meowscarada','sneasler','sylveon'],
  // Week 5-B
  'week5b-0-deshans': ['golurk','incineroar','lucario','ninetales-alola','oranguru','primarina'],
  'week5b-0-eli':     ['kangaskhan','kingambit','rotom-wash','starmie','venusaur','zoroark-hisui'],
  'week5b-1-tim':     ['empoleon','excadrill','gengar','mamoswine','rotom-heat','whimsicott'],
  'week5b-1-jake':    ['froslass','glimmora','gyarados','rotom-frost','scovillain','talonflame'],
  'week5b-2-sam':     ['aerodactyl','dragonite','klefki','meowscarada','sneasler','sylveon'],
  'week5b-2-wyatt':   ['archaludon','basculegion-male','meowstic-male','pelipper','scizor','volcarona'],
  // Week 6-A
  'week6a-0-eli':     ['kangaskhan','kingambit','rotom-wash','starmie','vivillon','zoroark-hisui'],
  'week6a-0-tim':     ['excadrill','garchomp','gengar','rotom-heat','skarmory','whimsicott'],
  'week6a-1-jake':    ['ceruledge','froslass','gardevoir','glimmora','maushold','rotom-frost'],
  'week6a-1-wyatt':   ['archaludon','scizor','sinistcha','slowbro','tyranitar','volcarona'],
  'week6a-2-deshans': ['golurk','incineroar','lucario','ninetales-alola','oranguru','primarina'],
  'week6a-2-sam':     ['aerodactyl','arcanine-hisui','blastoise','klefki','meowscarada','sneasler'],
  // Week 6-B
  'week6b-0-sam':     ['aerodactyl','blastoise','corviknight','meowscarada','sneasler','sylveon'],
  'week6b-0-eli':     ['charizard-mega-y','rotom-wash','starmie','tinkaton','vivillon','zoroark-hisui'],
  'week6b-1-deshans': ['golurk','incineroar','lucario','ninetales-alola','oranguru','primarina'],
  'week6b-1-jake':    ['ceruledge','froslass','gardevoir','glimmora','gyarados','maushold'],
  'week6b-2-tim':     ['excadrill','farigiraf','mamoswine','milotic','palafin','skarmory'],
  'week6b-2-wyatt':   ['hydreigon','meowstic-male','mimikyu','slowbro','tyranitar','volcarona'],
  // Championship
  'champ-0-wyatt':    ['scizor','sinistcha','pelipper','basculegion-male','meowstic-male','archaludon'],
  'champ-0-sam':      ['meowscarada','arcanine-hisui','sylveon','klefki','sneasler','blastoise'],
};


function getDefenseChart(types) {
  const mults = {};
  const allTypes = Object.keys(TYPE_EFF);
  allTypes.forEach(atk => {
    let m = 1;
    types.forEach(def => {
      const eff = TYPE_EFF[atk] || {};
      if (eff[def] !== undefined) m *= eff[def];
    });
    if (m !== 1) mults[atk] = m;
  });
  return mults;
}

function getTeamDefChart(teamKey) {
  const team = TEAMS[teamKey];
  const combined = {};
  team.pokemon.forEach(p => {
    const d = CACHE[p];
    if (!d) return;
    const chart = getDefenseChart(d.types);
    Object.entries(chart).forEach(([atk, m]) => {
      combined[atk] = (combined[atk] || { immunes:0, resists:0, weaks:0, dblWeaks:0 });
      if (m === 0) combined[atk].immunes++;
      else if (m <= 0.5) combined[atk].resists++;
      else if (m === 2) combined[atk].weaks++;
      else if (m >= 4) combined[atk].dblWeaks++;
    });
  });
  return combined;
}
async function fetchPoke(key) {
  if (CACHE[key]) return CACHE[key];
  const slug = API_SLUG[key] || key;
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
    if (!r.ok) throw 0;
    const d = await r.json();
    // Fetch ability descriptions in parallel
    const abilityData = await Promise.all(
      d.abilities.map(async a => {
        try {
          const ar = await fetch(a.ability.url);
          const ad = await ar.json();
          const engEntry = ad.effect_entries.find(e=>e.language.name==='en');
          const shortEntry = ad.flavor_text_entries?.filter(e=>e.language.name==='en').pop();
          return {
            name: a.ability.name.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase()),
            isHidden: a.is_hidden,
            desc: engEntry?.short_effect || shortEntry?.flavor_text || 'No description available.'
          };
        } catch { return { name: a.ability.name, isHidden: a.is_hidden, desc: '' }; }
      })
    );
    CACHE[key] = {
      name: d.name, sprite: d.sprites.front_default,
      types: d.types.map(t=>t.type.name),
      stats: { hp:d.stats[0].base_stat, atk:d.stats[1].base_stat, def:d.stats[2].base_stat, spa:d.stats[3].base_stat, spd:d.stats[4].base_stat, spe:d.stats[5].base_stat },
      abilities: abilityData,
    };
  } catch {
    CACHE[key] = { name:key, sprite:null, types:[], stats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, abilities:[] };
  }
  return CACHE[key];
}
async function fetchAltForms(key) {
  const forms = ALT_FORMS[key];
  if (!forms) return;
  await Promise.allSettled(forms.map(async f => {
    const cacheKey = `alt_${key}_${f.label}`;
    if (CACHE[cacheKey]) return;
    try {
      const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${f.apiSlug}`);
      if (!r.ok) throw 0;
      const d = await r.json();
      CACHE[cacheKey] = {
        name: d.name, sprite: d.sprites.front_default,
        types: d.types.map(t=>t.type.name),
        stats: { hp:d.stats[0].base_stat, atk:d.stats[1].base_stat, def:d.stats[2].base_stat, spa:d.stats[3].base_stat, spd:d.stats[4].base_stat, spe:d.stats[5].base_stat }
      };
    } catch { CACHE[`alt_${key}_${f.label}`] = null; }
  }));
}

function dn(n) { return DISPLAY_NAMES[n] || n.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase()); }
// ── STANDINGS ──────────────────────────────────────────────────────────
function calcStandings() {
  const stats = {};
  Object.values(TEAMS).forEach(t => { stats[t.name] = { w:0, l:0, pts:0 }; });
  SCHEDULE.forEach((wk,wi) => {
    wk.matches.forEach((m,mi) => {
      const winner = RESULTS[`${wk.key}-${mi}`];
      if (!winner) return;
      const loser = m[0]===winner ? m[1] : m[0];
      if (stats[winner]) { stats[winner].w++; stats[winner].pts += 3; }
      if (stats[loser]) stats[loser].l++;
    });
  });
  return Object.entries(stats).map(([name,s])=>({name,...s})).sort((a,b)=>b.pts-a.pts||b.w-a.w);
}

function currentWeek() {
  // Find the first schedule entry with any unplayed match
  for (const wk of SCHEDULE) {
    const anyUnplayed = wk.matches.some((_,mi)=>!RESULTS[`${wk.key}-${mi}`]);
    if (anyUnplayed) return wk.calWeek;
  }
  return SCHEDULE[SCHEDULE.length-1].calWeek;
}
function showModal(key) {
  const d = CACHE[key]; if (!d) return;
  let owner = '';
  for (const [k,t] of Object.entries(TEAMS)) {
    if (t.pokemon.includes(key)) { owner = t.name; break; }
  }

  const hasMega = CAN_MEGA.has(key) || key === 'charizard-mega-y';
  const megaData = hasMega ? CACHE['mega_' + key] : null;
  const altForms = ALT_FORMS[key] || null;

  const serebii = serebiiSlug(key);
  const pikalytics = pikalyticsUrl(key);

  let tabs = [];
  let statBlocks = '';

  if (altForms) {
    tabs = altForms.map(f => f.label);
    statBlocks = altForms.map(f => {
      const fd = CACHE[`alt_${key}_${f.label}`];
      return buildStatBlock(fd, `alt_${f.label}`);
    }).join('');
  } else {
    tabs = ['Base'];
    statBlocks = buildStatBlock(d, 'base');
    if (hasMega && megaData) {
      tabs.push('Mega');
      statBlocks += buildStatBlock(megaData, 'mega');
    }
  }

  const firstTabId = altForms ? `alt_${altForms[0].label}` : 'base';
  const tabHTML = tabs.length > 1 ? `<div class="stat-toggle" id="modal-tabs">
    ${tabs.map((lbl,i) => {
      const id = altForms ? `alt_${lbl}` : (lbl==='Base'?'base':'mega');
      return `<button class="stat-tab${i===0?' active':''}" onclick="switchModalTab('${id}',this)">${lbl}</button>`;
    }).join('')}
  </div>` : '';

  const displaySprite = altForms
    ? (CACHE[`alt_${key}_${altForms[0].label}`]?.sprite || d.sprite)
    : d.sprite;

  const el = document.createElement('div');
  el.className = 'modal-overlay';
  el.innerHTML = `<div class="modal">
    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
    <img class="modal-sprite" id="modal-spr" src="${displaySprite||''}" alt="" ${displaySprite?'':'style="display:none"'}>
    <div class="modal-name">${dn(key)}</div>
    <div class="modal-links">
      <a class="modal-link" href="${serebii}" target="_blank">Serebii ↗</a>
      <a class="modal-link" href="${pikalytics}" target="_blank">Pikalytics ↗</a>
    </div>
    ${tabHTML}
    ${statBlocks}
    <div class="owner-tag">Drafted by <strong>${owner}</strong></div>
  </div>`;

  const firstBlock = el.querySelector(`#stats-${firstTabId}`);
  if (firstBlock) firstBlock.style.display = 'block';

  el.addEventListener('click', e => { if (e.target===el) el.remove(); });
  document.body.appendChild(el);
}

let currentView = 'overview';
function renderOverview() {
  const standings = calcStandings();
  const cards = Object.entries(TEAMS).map(([k,t])=>{
    const types = t.pokemon.flatMap(p=>CACHE[p]?.types||[]);
    const tc={};types.forEach(tp=>tc[tp]=(tc[tp]||0)+1);
    const topT = Object.entries(tc).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([tp])=>tpill(tp)).join('');
    const avg = t.pokemon.length ? Math.round(t.pokemon.reduce((s,p)=>{const d=CACHE[p];return s+(d?bst(d.stats):0);},0)/t.pokemon.length) : '–';
    const rec = standings.find(s=>s.name===t.name);
    const isCustomName = t.teamName !== `${t.name}'s Team` && t.teamName !== `${t.name}' Team`;
    return `<div class="overview-card" onclick="setView('${k}')">
      <div class="ov-name">${t.teamName}</div>
      ${isCustomName ? `<div style="font-size:11px;color:var(--muted);margin-bottom:2px">${t.name}</div>` : ''}
      <div class="ov-count" style="margin-bottom:8px">${rec?rec.w+'-'+rec.l:'0-0'}</div>
      <div class="ov-types">${topT}</div>
      <div class="ov-bst">avg BST <strong>${avg}</strong></div>
    </div>`;
  }).join('');
  const cur = currentWeek();
  const curWeekEntries = SCHEDULE.filter(w => w.calWeek === cur);
  let weekSection = '';
  if (curWeekEntries.length) {
    const dateRange = curWeekEntries[0].dateRange;

    function ovMatchRows(wk) {
      return wk.matches.map((m, mi) => {
        const rk = `${wk.key}-${mi}`;
        const winner = RESULTS[rk];
        const score = SCORES[rk];
        const t1win = winner === m[0], t2win = winner === m[1];
        const vsOrResult = winner
          ? `<div style="text-align:center"><span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--muted)">●</span>${score?`<div style="font-family:'Space Mono',monospace;font-size:10px;color:var(--muted)">${t1win?score:score.split('-').reverse().join('-')}</div>`:''}</div>`
          : `<span style="font-family:'Space Mono',monospace;font-size:10px;color:var(--muted)">vs</span>`;
        const lk1 = `${rk}-${m[0].toLowerCase()}`;
        const lk2 = `${rk}-${m[1].toLowerCase()}`;
        const lu1 = LINEUPS[lk1], lu2 = LINEUPS[lk2];
        function ovSprites(pokes, right) {
          if (!pokes) return '<div></div>';
          return `<div class="lineup-sprites${right?' right':''}">${pokes.map(p=>{const d=CACHE[p];return d?.sprite?`<img class="lineup-sprite" src="${d.sprite}" title="${dn(p)}" onclick="showModal('${p}')" alt="">`:''}).join('')}</div>`;
        }
        const hasLineup = lu1 || lu2;
        const lineupRow = hasLineup ? `<div class="match-lineup-row">${ovSprites(lu1,false)}<div></div>${ovSprites(lu2,true)}</div>` : '';
        return `<div class="match-row" style="${hasLineup?'border-bottom:none;padding-bottom:4px':''}">
          <div class="match-team" style="cursor:pointer;${t1win?'color:var(--accent)':t2win?'opacity:0.45':''}" onclick="setView('${m[0].toLowerCase()}')">${m[0]}</div>
          ${vsOrResult}
          <div class="match-team right" style="cursor:pointer;${t2win?'color:var(--accent)':t1win?'opacity:0.45':''}" onclick="setView('${m[1].toLowerCase()}')">${m[1]}</div>
        </div>${lineupRow}`;
      }).join('');
    }

    const blocks = curWeekEntries.map(wk => `
      <div class="week-block week-current" style="margin-bottom:10px">
        <div class="week-label">${wk.label} <span style="font-weight:400;color:var(--muted)">${wk.dateRange}</span></div>
        ${ovMatchRows(wk)}
      </div>`).join('');

    weekSection = `
      <div style="margin-top:28px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent);font-family:'Space Mono',monospace;margin-bottom:12px">
          Current matchups · ${dateRange}
        </div>
        ${blocks}
      </div>`;
  }

  document.getElementById('view').innerHTML = `<div class="overview-grid">${cards}</div>${weekSection}`;
}

function renderTeam(key) {
  const t = TEAMS[key];
  const sub = rosterSubView[key] || 'roster';
  const trainer = TRAINERS[key] || {};
  const isCustomName = t.teamName !== `${t.name}'s Team` && t.teamName !== `${t.name}' Team`;

  function idChip(label, val) {
    return `<div class="trainer-id-chip">
      <div class="trainer-id-label">${label}</div>
      ${val
        ? `<div class="trainer-id-val">${val}</div>`
        : `<div class="trainer-id-missing">Not set</div>`}
    </div>`;
  }

  document.getElementById('view').innerHTML = `
    <div class="trainer-card">
      <div class="trainer-avatar">🎮</div>
      <div class="trainer-main">
        <div class="trainer-team-name">${t.teamName}</div>
        ${isCustomName ? `<div class="trainer-owner-label">Owner: ${t.name}</div>` : `<div class="trainer-owner-label">${t.name}</div>`}
        <div class="trainer-ids">
          ${idChip('Champions ID', trainer.championsId)}
          ${idChip('Switch ID', trainer.switchId)}
          ${idChip('Discord', trainer.discord)}
        </div>
      </div>
    </div>
    <div class="roster-header" style="margin-top:0"><div style="display:flex;gap:6px">
      <button class="sub-tab${sub==='roster'?' active':''}" onclick="setSubView('${key}','roster')">Roster</button>
      <button class="sub-tab${sub==='typechart'?' active':''}" onclick="setSubView('${key}','typechart')">Type coverage</button>
      <button class="sub-tab${sub==='speeds'?' active':''}" onclick="setSubView('${key}','speeds')">Speeds</button>
    </div><div class="roster-hint">click card for full stats ↗</div></div>
    <div id="sub-content"></div>`;
  renderSubView(key, sub);
}

window.setSubView = function(key, sub) {
  rosterSubView[key] = sub;
  document.querySelectorAll('.sub-tab').forEach(b=>b.classList.remove('active'));
  const label = sub==='roster'?'Roster':sub==='speeds'?'Speeds':'Type';
  document.querySelectorAll('.sub-tab').forEach(b=>{ if(b.textContent.includes(label)) b.classList.add('active'); });
  renderSubView(key, sub);
};

function renderSubView(key, sub) {
  const t = TEAMS[key];
  const el = document.getElementById('sub-content');
  if (sub === 'roster') {
    const cards = t.pokemon.map(p=>{
      const d = CACHE[p];
      const sprite = d?.sprite ? `<img class="poke-sprite" src="${d.sprite}" alt="">` : `<div class="poke-sprite-ph">◈</div>`;
      const types = (d?.types||[]).map(tp=>tpill(tp)).join('');
      const total = d ? bst(d.stats) : 0;
      const canM = CAN_MEGA.has(p);
      return `<div class="poke-card" onclick="showModal('${p}')">
        ${canM?'<div class="mega-badge">Mega</div>':''}
        ${sprite}
        <div class="poke-name">${dn(p)}</div>
        <div class="type-row">${types}</div>
        <div class="bst-num">BST ${total}</div>
      </div>`;
    }).join('');
    el.innerHTML = `<div class="pokemon-grid">${cards}</div>`;
  } else if (sub === 'typechart') {
    // ── TYPE COVERAGE BAR CHART ─────────────────────────────────────
    const ALL_TYPES = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];

    // For each attacking type, compute per-pokemon effectiveness and net score
    const typeData = ALL_TYPES.map(atk => {
      const perPoke = t.pokemon.map(p => {
        const d = CACHE[p]; if (!d || !d.types.length) return {p, mult:1};
        const eff = TYPE_EFF[atk] || {};
        let m = 1;
        d.types.forEach(def => { if (eff[def] !== undefined) m *= eff[def]; });
        return {p, mult:m};
      });
      const immunes   = perPoke.filter(x=>x.mult===0);
      const dblResist = perPoke.filter(x=>x.mult===0.25);
      const resists   = perPoke.filter(x=>x.mult===0.5);
      const neutral   = perPoke.filter(x=>x.mult===1);
      const weaks     = perPoke.filter(x=>x.mult===2);
      const dblWeaks  = perPoke.filter(x=>x.mult===4);
      // Score: positive = team resists well, negative = team is weak
      const score = immunes.length*3 + dblResist.length*2 + resists.length*1
                  - weaks.length*1 - dblWeaks.length*2;
      return { atk, score, immunes, dblResist, resists, neutral, weaks, dblWeaks };
    }).sort((a,b) => b.score - a.score);

    const maxAbs = Math.max(...typeData.map(x=>Math.abs(x.score)), 1);

    function spriteRow(arr, label, color) {
      if (!arr.length) return '';
      const icons = arr.map(({p}) => {
        const d = CACHE[p];
        return d?.sprite
          ? `<img src="${d.sprite}" title="${dn(p)}" style="width:28px;height:28px;image-rendering:pixelated;cursor:pointer" onclick="event.stopPropagation();showModal('${p}')">`
          : `<span style="font-size:10px;color:var(--muted)">${dn(p)}</span>`;
      }).join('');
      return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
        <span style="font-size:9px;color:${color};width:54px;flex-shrink:0;text-align:right">${label}</span>
        <div style="display:flex;gap:2px;flex-wrap:wrap">${icons}</div>
      </div>`;
    }

    const rows = typeData.map(({atk,score,immunes,dblResist,resists,neutral,weaks,dblWeaks}) => {
      const pct = Math.round(Math.abs(score)/maxAbs*100);
      const isGood = score >= 0;
      const barColor = score > 3 ? '#1D9E75' : score > 0 ? '#5f8cff' : score < -3 ? '#E24B4A' : '#f0c832';
      const barStyle = isGood
        ? `width:${pct}%;background:${barColor};height:100%;border-radius:0 3px 3px 0;`
        : `width:${pct}%;background:${barColor};height:100%;border-radius:3px 0 0 3px;margin-left:auto;`;

      // Tooltip content (shown on hover)
      const tooltipContent = [
        spriteRow(immunes,   '0× immune',  '#c0b0e0'),
        spriteRow(dblResist, '¼× resist',  '#60d070'),
        spriteRow(resists,   '½× resist',  '#70a8f0'),
        spriteRow(weaks,     '2× weak',    '#f0c832'),
        spriteRow(dblWeaks,  '4× weak',    '#f08060'),
      ].filter(Boolean).join('');

      const scoreLabel = score === 0 ? '±0' : (score > 0 ? '+' : '') + score;

      return `<div class="tc-bar-row" onmouseenter="showTcTooltip(event,'tc-tip-${atk}')" onmouseleave="hideTcTooltip()" onclick="toggleTcTooltip(event,'tc-tip-${atk}')">
        <div class="tc-bar-type t-${atk}">${atk}</div>
        <div class="tc-bar-track">
          <div class="tc-bar-center"></div>
          <div style="position:absolute;top:0;${isGood?'left:50%':'right:50%'};width:${Math.round(pct/2)}%;height:100%;background:${barColor};border-radius:${isGood?'0 3px 3px 0':'3px 0 0 3px'}"></div>
        </div>
        <div class="tc-bar-score" style="color:${barColor}">${scoreLabel}</div>
        <div class="tc-tooltip" id="tc-tip-${atk}" style="display:none">
          ${tooltipContent || '<span style="font-size:11px;color:var(--muted)">All neutral</span>'}
        </div>
      </div>`;
    }).join('');

    el.innerHTML = `
      <div class="type-chart-wrap">
        <div class="tc-title">Defensive type coverage</div>
        <div class="tc-sub">Positive score = team resists this type. Hover or tap a row to see which Pokémon are affected.</div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted);font-family:'Space Mono',monospace;margin-bottom:8px;padding:0 56px 0 72px">
          <span>← more weak</span><span>more resistant →</span>
        </div>
        ${rows}
      </div>`;
  } else if (sub === 'speeds') {
    el.innerHTML = renderSpeedsTab(t.pokemon, CACHE, MEGAS, CAN_MEGA, dn, 'showModal');
  }
}

function renderAll() {
  const blocks = Object.entries(TEAMS).map(([key,t])=>{
    const rows = t.pokemon.map(p=>{
      const d = CACHE[p];
      const sprite = d?.sprite ? `<img class="mini-sprite" src="${d.sprite}" alt="">` : `<div class="mini-sprite" style="display:flex;align-items:center;justify-content:center;opacity:0.3;font-size:18px">◈</div>`;
      const types = (d?.types||[]).map(tp=>tpill(tp)).join('');
      const canM = CAN_MEGA.has(p);
      return `<div class="mini-row" onclick="showModal('${p}')">${sprite}<span class="mini-name">${dn(p)}${canM?' <span style="font-size:9px;color:var(--accent)">[M]</span>':''}</span><div class="mini-types">${types}</div></div>`;
    }).join('');
    const isCustomName = t.teamName !== `${t.name}'s Team` && t.teamName !== `${t.name}' Team`;
    return `<div class="all-block">
      <div class="all-block-name">${t.teamName}${isCustomName?`<span style="font-weight:400;color:var(--muted);font-size:11px;margin-left:6px">${t.name}</span>`:''}</div>
      ${rows}
    </div>`;
  }).join('');
  document.getElementById('view').innerHTML = `<div class="all-grid">${blocks}</div>`;
}

function renderSchedule() {
  const standings = calcStandings();
  const cur = currentWeek();

  const standingRows = standings.map((s,i)=>{
    const teamKey = Object.keys(TEAMS).find(k=>TEAMS[k].name===s.name);
    const teamName = teamKey ? TEAMS[teamKey].teamName : s.name;
    const isCustom = teamName !== `${s.name}'s Team` && teamName !== `${s.name}' Team`;
    return `<div class="standings-row">
      <div class="standings-rank">${i+1}</div>
      <div class="standings-name" style="cursor:pointer" onclick="setView('${teamKey||s.name.toLowerCase()}')">
        <div>${teamName}</div>
        ${isCustom?`<div style="font-size:10px;color:var(--muted)">${s.name}</div>`:''}
      </div>
      <div class="standings-rec">${s.w}-${s.l}</div>
      <div class="standings-pts">${s.pts}</div>
    </div>`;
  }).join('');

  const weeks = SCHEDULE.map(wk=>{
    const isCurrent = wk.calWeek === cur;
    const allComplete = wk.matches.every((_,mi)=>RESULTS[`${wk.key}-${mi}`]);
    const inProgress = !allComplete && wk.calWeek < cur;
    const matchRows = wk.matches.map((m,mi)=>{
      const rk = `${wk.key}-${mi}`;
      const winner = RESULTS[rk];
      const score = SCORES[rk];
      let resultHtml = `<span class="match-result result-pending">vs</span>`;
      if (winner) {
        const t1win = winner===m[0];
        resultHtml = `<div style="text-align:center">
          <div class="match-result">${t1win?'<span class="result-win">W</span>':'<span class="result-loss">L</span>'} / ${t1win?'<span class="result-loss">L</span>':'<span class="result-win">W</span>'}</div>
          ${score?`<div style="font-family:'Space Mono',monospace;font-size:10px;color:var(--muted)">${t1win?score:score.split('-').reverse().join('-')}</div>`:''}
        </div>`;
      }

      const lk1 = `${rk}-${m[0].toLowerCase()}`;
      const lk2 = `${rk}-${m[1].toLowerCase()}`;
      const lu1 = LINEUPS[lk1];
      const lu2 = LINEUPS[lk2];

      function lineupSprites(pokes, alignRight) {
        if (!pokes) return '<div></div>';
        const sprites = pokes.map(p => {
          const d = CACHE[p];
          if (!d?.sprite) return '';
          return `<img class="lineup-sprite" src="${d.sprite}" title="${dn(p)}" onclick="showModal('${p}')" alt="${dn(p)}">`;
        }).join('');
        return `<div class="lineup-sprites${alignRight?' right':''}">${sprites}</div>`;
      }

      const hasLineup = lu1 || lu2;
      const lineupRow = hasLineup ? `
        <div class="match-lineup-row">
          ${lineupSprites(lu1, false)}
          <div></div>
          ${lineupSprites(lu2, true)}
        </div>` : '';

      return `<div class="match-row" style="${hasLineup?'border-bottom:none;padding-bottom:4px':''}">
        <div class="match-team" style="${winner===m[0]?'color:var(--accent)':winner&&winner!==m[0]?'opacity:0.5':''}">
          ${m[0]}
        </div>
        ${resultHtml}
        <div class="match-team right" style="${winner===m[1]?'color:var(--accent)':winner&&winner!==m[1]?'opacity:0.5':''}">
          ${m[1]}
        </div>
      </div>${lineupRow}`;
    }).join('');

    const statusTag = isCurrent ? ' · current' : inProgress ? ' · in progress' : '';
    const isChamp = wk.key === 'champ';
    return `<div class="week-block${isCurrent?' week-current':''}${isChamp?' champ-block':''}">
      <div class="week-label" style="${isChamp?'color:#ffd700;font-size:13px':''}">
        ${wk.label}
        <span style="font-weight:400;color:var(--muted);margin-left:6px">${wk.dateRange}</span>
        ${statusTag?`<span style="color:var(--accent)">${statusTag}</span>`:''}
      </div>
      ${matchRows}
    </div>`;
  }).join('');

  document.getElementById('view').innerHTML = `
    <div class="sched-layout">
      <div>${weeks}</div>
      <div>
        <div class="standings-box">
          <div class="standings-title">Standings</div>
          <div class="standings-row header">
            <div></div><div>Team</div><div style="text-align:center">W-L</div><div style="text-align:center">Pts</div>
          </div>
          ${standingRows}
        </div>
      </div>
    </div>`;
}

function setView(v) {
  currentView = v;
  renderNav();
  if (v==='overview') renderOverview();
  else if (v==='schedule') renderSchedule();
  else if (v==='all') renderAll();
  else renderTeam(v);
}
