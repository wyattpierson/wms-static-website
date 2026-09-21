// ── LEAGUE CORE: SHARED DATA + LOGIC
// Type chart, megas, modals, speeds tab, season switching, init.

const MEGAS = {
  // ── S1 Eli ──
  'charizard-mega-y': { name:'Mega Charizard Y', apiSlug:null, types:['fire','flying'],
                        hardStats:{hp:78,atk:104,def:78,spa:159,spd:115,spe:100},
                        abilities:[{name:'Drought',isHidden:false,desc:'Summons harsh sunlight for 5 turns on entry. Boosts Fire moves and weakens Water moves.'}] },
  'venusaur':         { name:'Mega Venusaur',    apiSlug:'venusaur-mega', types:['grass','poison'],
                        abilities:[{name:'Thick Fat',isHidden:false,desc:'Fire- and Ice-type moves deal only ½ damage to this Pokémon.'}] },
  'kangaskhan':       { name:'Mega Kangaskhan',  apiSlug:'kangaskhan-mega', types:['normal'],
                        abilities:[{name:'Parental Bond',isHidden:false,desc:'The Pokémon attacks twice each turn. The second hit deals 25% damage.'}] },
  'gallade':          { name:'Mega Gallade',     apiSlug:'gallade-mega', types:['psychic','fighting'],
                        abilities:[{name:'Inner Focus',isHidden:false,desc:'Prevents flinching. Also protects against Intimidate.'}] },
  'starmie':          { name:'Mega Starmie',     apiSlug:null, types:['water','psychic'],
                        hardStats:{hp:60,atk:100,def:105,spa:130,spd:105,spe:120},
                        abilities:[{name:'Huge Power',isHidden:false,desc:'Doubles the Pokémon\'s Attack stat.'}] },
  // ── S1 Jake ──
  'froslass':         { name:'Mega Froslass',    apiSlug:null, types:['ice','ghost'],
                        hardStats:{hp:70,atk:80,def:70,spa:140,spd:100,spe:120},
                        abilities:[{name:'Ice Warning',isHidden:false,desc:'Summons Hail for 5 turns on entry.'}] },
  'glimmora':         { name:'Mega Glimmora',    apiSlug:null, types:['rock','poison'],
                        hardStats:{hp:83,atk:90,def:105,spa:150,spd:96,spe:101},
                        abilities:[{name:'Adaptability',isHidden:false,desc:'Powers up moves of the same type from 1.5× to 2×.'}] },
  'gyarados':         { name:'Mega Gyarados',    apiSlug:'gyarados-mega', types:['water','dark'],
                        abilities:[{name:'Mold Breaker',isHidden:false,desc:'Moves ignore abilities that hinder or prevent them.'}] },
  'gardevoir':        { name:'Mega Gardevoir',   apiSlug:'gardevoir-mega', types:['psychic','fairy'],
                        abilities:[{name:'Pixilate',isHidden:false,desc:'Normal-type moves become Fairy-type and deal 20% more damage.'}] },
  'scovillain':       { name:'Mega Scovillain',  apiSlug:null, types:['grass','fire'],
                        hardStats:{hp:65,atk:138,def:85,spa:138,spd:85,spe:75},
                        abilities:[{name:'Spicy Spray',isHidden:false,desc:'On entry, lowers the Speed of all adjacent opponents.'}] },
  // ── S1 Deshans ──
  'sableye':          { name:'Mega Sableye',     apiSlug:'sableye-mega', types:['dark','ghost'],
                        abilities:[{name:'Magic Bounce',isHidden:false,desc:'Reflects status moves back at the user.'}] },
  'golurk':           { name:'Mega Golurk',      apiSlug:null, types:['ground','ghost'],
                        hardStats:{hp:89,atk:159,def:105,spa:70,spd:105,spe:55},
                        abilities:[{name:'Unseen Fist',isHidden:false,desc:'Contact moves bypass Protect and similar effects.'}] },
  'lucario':          { name:'Mega Lucario',     apiSlug:'lucario-mega', types:['fighting','steel'],
                        abilities:[{name:'Adaptability',isHidden:false,desc:'Powers up moves of the same type from 1.5× to 2×.'}] },
  // ── S1 Tim ──
  'garchomp':         { name:'Mega Garchomp',    apiSlug:'garchomp-mega', types:['dragon','ground'],
                        abilities:[{name:'Sand Force',isHidden:false,desc:'In sandstorm, Rock-, Ground-, and Steel-type moves deal 30% more damage.'}] },
  'gengar':           { name:'Mega Gengar',      apiSlug:'gengar-mega', types:['ghost','poison'],
                        abilities:[{name:'Shadow Tag',isHidden:false,desc:'Prevents opposing Pokémon from switching out or fleeing.'}] },
  'skarmory':         { name:'Mega Skarmory',    apiSlug:null, types:['steel','flying'],
                        hardStats:{hp:65,atk:140,def:110,spa:40,spd:100,spe:110},
                        abilities:[{name:'Stalwart',isHidden:false,desc:'Ignores moves and abilities that redirect this Pokémon\'s moves to another target.'}] },
  'excadrill':        { name:'Mega Excadrill',   apiSlug:null, types:['ground','steel'],
                        hardStats:{hp:110,atk:165,def:100,spa:65,spd:65,spe:103},
                        abilities:[{name:'Piercing Drill',isHidden:false,desc:'Contact moves pierce through the target\'s Defense boosts.'}] },
  // ── S1 Sam ──
  'dragonite':        { name:'Mega Dragonite',   apiSlug:null, types:['dragon','flying'],
                        hardStats:{hp:91,atk:124,def:115,spa:145,spd:125,spe:100},
                        abilities:[{name:'Multiscale',isHidden:false,desc:'Reduces damage taken by 50% when at full HP.'}] },
  'aerodactyl':       { name:'Mega Aerodactyl',  apiSlug:'aerodactyl-mega', types:['rock','flying'],
                        abilities:[{name:'Tough Claws',isHidden:false,desc:'Boosts the power of contact moves by 30%.'}] },
  'blastoise':        { name:'Mega Blastoise',   apiSlug:'blastoise-mega', types:['water'],
                        abilities:[{name:'Mega Launcher',isHidden:false,desc:'Powers up aura and pulse moves by 50%.'}] },
  // ── S1 Wyatt ──
  'tyranitar':        { name:'Mega Tyranitar',   apiSlug:'tyranitar-mega', types:['rock','dark'],
                        abilities:[{name:'Sand Stream',isHidden:false,desc:'Summons a sandstorm for 5 turns on entry.'}] },
  'scizor':           { name:'Mega Scizor',      apiSlug:'scizor-mega', types:['bug','steel'],
                        abilities:[{name:'Technician',isHidden:false,desc:'Moves with 60 BP or less deal 50% more damage.'}] },
  'slowbro':          { name:'Mega Slowbro',     apiSlug:'slowbro-mega', types:['water','psychic'],
                        abilities:[{name:'Shell Armor',isHidden:false,desc:'Protects the Pokémon from critical hits.'}] },
  'meowstic-male':    { name:'Mega Meowstic',    apiSlug:null, types:['psychic'],
                        hardStats:{hp:74,atk:48,def:76,spa:143,spd:101,spe:124},
                        abilities:[{name:'Trace',isHidden:false,desc:'Copies the ability of one of the opposing Pokémon on entry.'}] },
  // ── S2 Flick ──
  'delphox':          { name:'Mega Delphox',     apiSlug:null, types:['fire','psychic'],
                        hardStats:{hp:75,atk:69,def:72,spa:159,spd:125,spe:134},
                        abilities:[{name:'Levitate',isHidden:false,desc:'Immune to Ground-type moves, spikes, and Arena Trap.'}] },
  // ── S2 Wyatt ──
  'sceptile':         { name:'Mega Sceptile',    apiSlug:null, types:['grass','dragon'],
                        hardStats:{hp:70,atk:110,def:75,spa:145,spd:85,spe:145},
                        abilities:[{name:'Lightning Rod',isHidden:false,desc:'Draws in all Electric-type moves. Instead of taking damage, its Sp. Atk is boosted by 1.'}] },
  'altaria':          { name:'Mega Altaria',     apiSlug:'altaria-mega', types:['dragon','fairy'],
                        abilities:[{name:'Pixilate',isHidden:false,desc:'Normal-type moves become Fairy-type and deal 20% more damage.'}] },
  'pinsir':           { name:'Mega Pinsir',      apiSlug:'pinsir-mega', types:['bug','flying'],
                        abilities:[{name:'Aerilate',isHidden:false,desc:'Normal-type moves become Flying-type and deal 20% more damage.'}] },
  // ── S2 Jake ──
  'metagross':        { name:'Mega Metagross',   apiSlug:null, types:['steel','psychic'],
                        hardStats:{hp:80,atk:145,def:150,spa:105,spd:110,spe:110},
                        abilities:[{name:'Tough Claws',isHidden:false,desc:'Boosts the power of contact moves by 30%.'}] },
  // ── S2 Sam ──
  'lopunny':          { name:'Mega Lopunny',     apiSlug:'lopunny-mega', types:['normal','fighting'],
                        abilities:[{name:'Scrappy',isHidden:false,desc:'Can hit Ghost-type Pokémon with Normal- and Fighting-type moves.'}] },
  'clefable':         { name:'Mega Clefable',    apiSlug:null, types:['fairy','flying'],
                        hardStats:{hp:95,atk:80,def:93,spa:135,spd:110,spe:70},
                        abilities:[{name:'Magic Bounce',isHidden:false,desc:'Reflects status moves back at the user.'}] },
  // ── S2 Jackie ──
  'gallade':          { name:'Mega Gallade',     apiSlug:'gallade-mega', types:['psychic','fighting'],
                        abilities:[{name:'Inner Focus',isHidden:false,desc:'Prevents flinching. Also protects against Intimidate.'}] },
  // ── S2 Deshans ──
  'abomasnow':        { name:'Mega Abomasnow',   apiSlug:'abomasnow-mega', types:['grass','ice'],
                        abilities:[{name:'Snow Warning',isHidden:false,desc:'Summons a hailstorm for 5 turns on entry.'}] },
  'drampa':           { name:'Mega Drampa',       apiSlug:null, types:['normal','dragon'],
                        hardStats:{hp:78,atk:85,def:110,spa:160,spd:116,spe:36},
                        abilities:[{name:'Berserk',isHidden:false,desc:'When HP drops below half, Sp. Atk rises by 1.'}] },
  'eelektross':       { name:'Mega Eelektross',  apiSlug:null, types:['electric'],
                        hardStats:{hp:85,atk:145,def:80,spa:135,spd:90,spe:80},
                        abilities:[{name:'Eelevate',isHidden:false,desc:'Grants Ground immunity and hazard immunity. Boosts highest stat by +1 each time this Pokémon knocks out a target.'}] },
  // ── S2 MonteMole ──
  'mawile':           { name:'Mega Mawile',      apiSlug:'mawile-mega', types:['steel','fairy'],
                        abilities:[{name:'Huge Power',isHidden:false,desc:'Doubles the Pokémon\'s Attack stat.'}] },
  'pyroar':           { name:'Mega Pyroar',       apiSlug:null, types:['normal','fire'],
                        hardStats:{hp:86,atk:88,def:92,spa:129,spd:86,spe:126},
                        abilities:[{name:'Fire Mane',isHidden:false,desc:'Fire-type moves always deal +50% damage, active at all times regardless of HP.'}] },
  // ── S2 Eli ──
  'meganium':         { name:'Mega Meganium',    apiSlug:null, types:['grass','fairy'],
                        hardStats:{hp:80,atk:92,def:115,spa:143,spd:115,spe:80},
                        abilities:[{name:'Mega Sol',isHidden:false,desc:'Summons harsh sunlight on entry and boosts Grass-type moves by an additional 30%.'}] },
  'malamar':          { name:'Mega Malamar',     apiSlug:null, types:['psychic','dark'],
                        hardStats:{hp:86,atk:102,def:88,spa:98,spd:120,spe:88},
                        abilities:[{name:'Contrary',isHidden:false,desc:'Stat changes are reversed — moves that lower stats raise them instead, and vice versa.'}] },
  // ── S2 Tim ──
  'chandelure':       { name:'Mega Chandelure',  apiSlug:null, types:['ghost','fire'],
                        hardStats:{hp:60,atk:75,def:110,spa:175,spd:110,spe:90},
                        abilities:[{name:'Infiltrator',isHidden:false,desc:'Bypasses the effects of Reflect, Light Screen, Safeguard, Mist, and Substitute.'}] },
  'chesnaught':       { name:'Mega Chesnaught',  apiSlug:null, types:['grass','fighting'],
                        hardStats:{hp:88,atk:137,def:172,spa:74,spd:115,spe:44},
                        abilities:[{name:'Bulletproof',isHidden:false,desc:'Protects from ball and bomb moves like Shadow Ball, Focus Blast, and Sludge Bomb.'}] },
  // ── S2 Raichu X / Charizard X / Blaziken (PokeAPI) ──
  'raichu':           { name:'Mega Raichu X',    apiSlug:'raichu-mega-x', types:['electric'],
                        abilities:[{name:'Electric Surge',isHidden:false,desc:'Changes the terrain to Electric Terrain on entry. Boosts Electric moves by 50% and prevents Electric-type Pokémon from sleeping.'}] },
  'charizard':        { name:'Mega Charizard X', apiSlug:'charizard-mega-x', types:['fire','dragon'],
                        abilities:[{name:'Tough Claws',isHidden:false,desc:'Boosts the power of contact moves by 33%.'}] },
  'blaziken':         { name:'Mega Blaziken',    apiSlug:'blaziken-mega', types:['fire','fighting'],
                        abilities:[{name:'Speed Boost',isHidden:false,desc:'Raises this Pokémon\'s Speed by 1 stage at the end of every turn.'}] },
};

// Pokemon that can mega — keys used in TEAMS rosters
const CAN_MEGA = new Set(Object.keys(MEGAS));

// ── TYPE CHART ─────────────────────────────────────────────────────────
const TYPE_EFF = {
  normal:   {rock:0.5,ghost:0,steel:0.5},
  fire:     {fire:0.5,water:0.5,grass:2,ice:2,bug:2,rock:0.5,dragon:0.5,steel:2},
  water:    {fire:2,water:0.5,grass:0.5,ground:2,rock:2,dragon:0.5},
  electric: {water:2,electric:0.5,grass:0.5,ground:0,flying:2,dragon:0.5},
  grass:    {fire:0.5,water:2,grass:0.5,poison:0.5,ground:2,flying:0.5,bug:0.5,rock:2,dragon:0.5,steel:0.5},
  ice:      {fire:0.5,water:0.5,grass:2,ice:0.5,ground:2,flying:2,dragon:2,steel:0.5},
  fighting: {normal:2,ice:2,poison:0.5,rock:2,bug:0.5,ghost:0,steel:2,psychic:0.5,flying:0.5,dark:2,fairy:0.5},
  poison:   {grass:2,poison:0.5,ground:0.5,rock:0.5,steel:0,fairy:2},
  ground:   {fire:2,electric:2,grass:0.5,poison:2,flying:0,bug:0.5,rock:2,steel:2},
  flying:   {electric:0.5,grass:2,fighting:2,bug:2,rock:0.5,steel:0.5},
  psychic:  {fighting:2,poison:2,psychic:0.5,dark:0,steel:0.5},
  bug:      {fire:0.5,grass:2,fighting:0.5,poison:0.5,flying:0.5,steel:0.5,psychic:2,dark:2,fairy:0.5},
  rock:     {fire:2,ice:2,fighting:0.5,ground:0.5,flying:2,bug:2,steel:0.5},
  ghost:    {normal:0,psychic:2,ghost:2,dark:0.5},
  dragon:   {dragon:2,steel:0.5,fairy:0},
  dark:     {fighting:0.5,ghost:2,psychic:2,dark:0.5,fairy:0.5},
  steel:    {fire:0.5,water:0.5,electric:0.5,ice:2,rock:2,steel:0.5,fairy:2,fighting:0.5,ground:0.5},
  fairy:    {fire:0.5,fighting:2,poison:0.5,dragon:2,dark:2,steel:0.5},
};

// ── CACHE & FETCH ──────────────────────────────────────────────────────
const CACHE = {};
async function fetchMega(key) {
  const megaKey = 'mega_' + key;
  if (CACHE[megaKey]) return CACHE[megaKey];
  const mega = MEGAS[key];
  if (!mega) return null;

  // Champions-only mega or Charizard-Y (same slug as base): use hardcoded data entirely
  if (!mega.apiSlug || mega.hardStats) {
    CACHE[megaKey] = {
      name: mega.name,
      sprite: null,
      types: mega.types,
      stats: mega.hardStats || {hp:0,atk:0,def:0,spa:0,spd:0,spe:0},
      abilities: mega.abilities || [],
    };
    return CACHE[megaKey];
  }

  // Has a real PokeAPI slug — fetch sprite + stats, but use our hardcoded abilities
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${mega.apiSlug}`);
    if (!r.ok) throw 0;
    const d = await r.json();
    CACHE[megaKey] = {
      name: mega.name,
      sprite: d.sprites.front_default,
      types: d.types.map(t=>t.type.name),
      stats: { hp:d.stats[0].base_stat, atk:d.stats[1].base_stat, def:d.stats[2].base_stat, spa:d.stats[3].base_stat, spd:d.stats[4].base_stat, spe:d.stats[5].base_stat },
      abilities: mega.abilities || [],
    };
  } catch {
    CACHE[megaKey] = {
      name: mega.name, sprite: null, types: mega.types,
      stats: mega.hardStats || {hp:0,atk:0,def:0,spa:0,spd:0,spe:0},
      abilities: mega.abilities || [],
    };
  }
  return CACHE[megaKey];
}
function tpill(t) { return `<span class="type-pill t-${t}">${t}</span>`; }
function bst(s) { return Object.values(s).reduce((a,b)=>a+b,0); }
function scolor(v) { return v>=100?'#c8f053':v>=80?'#5f8cff':v>=60?'#f0c832':'#e05060'; }
function serebiiSlug(key) {
  // Champions dex: https://www.serebii.net/pokedex-champions/pokemonname/
  const overrides = {
    'charizard-mega-y':'charizard','zoroark-hisui':'hisuian-zoroark',
    'rotom-wash':'rotom-wash','rotom-frost':'rotom-frost','rotom-heat':'rotom-heat',
    'ninetales-alola':'alolan-ninetales','typhlosion-hisui':'hisuian-typhlosion',
    'arcanine-hisui':'hisuian-arcanine','maushold':'maushold','aegislash':'aegislash',
    'palafin':'palafin','basculegion-male':'basculegion','meowstic-male':'meowstic',
    'mimikyu':'mimikyu','archaludon':'archaludon','farigiraf':'farigiraf',
    'sinistcha':'sinistcha','hydrapple':'hydrapple','scovillain':'scovillain',
    'ceruledge':'ceruledge','meowscarada':'meowscarada','corviknight':'corviknight',
    'sneasler':'sneasler','gallade':'gallade','starmie':'starmie','froslass':'froslass',
    'glimmora':'glimmora','gyarados':'gyarados','gardevoir':'gardevoir','sableye':'sableye',
    'golurk':'golurk','lucario':'lucario','garchomp':'garchomp','gengar':'gengar',
    'skarmory':'skarmory','excadrill':'excadrill','dragonite':'dragonite',
    'aerodactyl':'aerodactyl','blastoise':'blastoise','tyranitar':'tyranitar',
    'scizor':'scizor','slowbro':'slowbro',
  };
  const slug = overrides[key] || key.replace(/-/g,'');
  return `https://www.serebii.net/pokedex-champions/${slug}/`;
}
function pikalyticsUrl(key) {
  // Champions pokedex: https://www.pikalytics.com/pokedex/championspreview/PokemonName
  const overrides = {
    'charizard-mega-y':'Charizard-Mega-Y','zoroark-hisui':'Hisuian-Zoroark',
    'ninetales-alola':'Alolan-Ninetales','typhlosion-hisui':'Hisuian-Typhlosion',
    'arcanine-hisui':'Hisuian-Arcanine','rotom-wash':'Rotom-Wash',
    'rotom-frost':'Rotom-Frost','rotom-heat':'Rotom-Heat',
    'basculegion-male':'Basculegion','meowstic-male':'Meowstic',
    'mimikyu':'Mimikyu','aegislash':'Aegislash','palafin':'Palafin',
    'froslass':'Froslass','glimmora':'Glimmora','scovillain':'Scovillain',
    'gallade':'Gallade','starmie':'Starmie','sableye':'Sableye','golurk':'Golurk',
    'skarmory':'Skarmory','excadrill':'Excadrill','dragonite':'Dragonite',
    'meowscarada':'Meowscarada','corviknight':'Corviknight','sneasler':'Sneasler',
    'archaludon':'Archaludon','farigiraf':'Farigiraf','sinistcha':'Sinistcha',
    'hydrapple':'Hydrapple','ceruledge':'Ceruledge',
  };
  const name = overrides[key] || key.replace(/-/g,'').replace(/\b\w/g,l=>l.toUpperCase());
  return `https://www.pikalytics.com/pokedex/championspreview/${name}`;
}

// ── MODAL ──────────────────────────────────────────────────────────────
function buildAbilitiesHTML(abilities) {
  if (!abilities || !abilities.length) return '';
  const rows = abilities.map(a => `
    <div class="ability-row">
      <div class="ability-name">${a.name}${a.isHidden?'<span class="ability-hidden-tag">Hidden</span>':''}</div>
      ${a.desc ? `<div class="ability-desc">${a.desc}</div>` : ''}
    </div>`).join('');
  return `<div class="abilities-section"><div class="abilities-label">Abilities</div>${rows}</div>`;
}

function multLabel(m){ return m===0?'×0':m===0.25?'¼×':m===0.5?'½×':m===2?'2×':m===4?'4×':m+'×'; }
function buildTypeChartHTML(types) {
  if (!types || !types.length) return '';
  const chart = getDefenseChart(types);
  const groups = { immune: [], resist: [], weak: [] };
  Object.entries(chart).forEach(([t,m]) => {
    if (m === 0) groups.immune.push([t,m]);
    else if (m < 1) groups.resist.push([t,m]);
    else if (m > 1) groups.weak.push([t,m]);
  });
  if (!groups.immune.length && !groups.resist.length && !groups.weak.length) return '';
  const sortFn = (a,b) => a[1]-b[1] || a[0].localeCompare(b[0]);
  groups.weak = groups.weak.sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0]));
  groups.resist = groups.resist.sort(sortFn);
  const pill = ([t,m]) => `<span class="type-pill t-${t}">${t}<span class="tcs-mult ${m>1?'neg':m<1?'pos':'none'}">${multLabel(m)}</span></span>`;
  const row = (lbl, arr) => arr.length ? `<div class="tcs-row"><span class="tcs-label">${lbl}</span><div class="tcs-pills">${arr.map(pill).join('')}</div></div>` : '';
  return `<div class="typechart-section">
    <div class="abilities-label">Strengths &amp; weaknesses</div>
    ${row('Immune', groups.immune)}
    ${row('Resists', groups.resist)}
    ${row('Weak to', groups.weak)}
  </div>`;
}

function buildStatBlock(data, label) {
  if (!data) return '';
  const s = data.stats;
  const total = bst(s);
  const rows = [['HP',s.hp],['Atk',s.atk],['Def',s.def],['SpA',s.spa],['SpD',s.spd],['Spe',s.spe]]
    .map(([k,v])=>`<div class="stat-item"><span class="stat-key">${k}</span><div class="sbar-bg"><div class="sbar" style="width:${Math.round(v/255*100)}%;background:${scolor(v)}"></div></div><span class="stat-v">${v}</span></div>`).join('');
  return `<div class="modal-stat-block" id="stats-${label}" data-sprite="${data.sprite||''}" style="display:none">
    <div style="display:flex;gap:6px;justify-content:center;margin-bottom:10px" id="types-${label}">
      ${data.types.map(t=>tpill(t)).join('')}
    </div>
    ${rows}
    <div class="bst-total"><span>BST</span><strong>${total}</strong></div>
    ${buildTypeChartHTML(data.types)}
    ${buildAbilitiesHTML(data.abilities)}
  </div>`;
}
window.switchModalTab = function(tabId, btn) {
  document.querySelectorAll('.modal .modal-stat-block').forEach(b => b.style.display='none');
  document.querySelectorAll('#modal-tabs .stat-tab').forEach(b => b.classList.remove('active'));
  const block = document.getElementById('stats-' + tabId);
  if (block) block.style.display = 'block';
  btn.classList.add('active');
  // Swap sprite to match the selected form
  const typesDiv = document.getElementById('types-' + tabId);
  const spr = document.getElementById('modal-spr');
  // Try to find sprite from the block's data — stored in data attr
  if (spr && block) {
    const sprSrc = block.dataset.sprite;
    if (sprSrc) spr.src = sprSrc;
  }
};
// ── TYPE CHART TOOLTIP ─────────────────────────────────────────────────
let _tcOpenId = null;
window.showTcTooltip = function(e, id) {
  // Only show on desktop hover (not touch)
  if (window.matchMedia('(hover: none)').matches) return;
  hideTcTooltip();
  const el = document.getElementById(id);
  if (el) { el.style.display = 'block'; _tcOpenId = id; }
};
window.hideTcTooltip = function() {
  if (_tcOpenId) {
    const el = document.getElementById(_tcOpenId);
    if (el) el.style.display = 'none';
    _tcOpenId = null;
  }
};
window.toggleTcTooltip = function(e, id) {
  e.stopPropagation();
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.style.display !== 'none';
  hideTcTooltip();
  if (!isOpen) { el.style.display = 'block'; _tcOpenId = id; }
};
document.addEventListener('click', () => hideTcTooltip());

let rosterSubView = {};
// ── SPEEDS TAB ─────────────────────────────────────────────────────────
function renderSpeedsTab(pokemon, cache, megasMap, canMegaSet, displayNameFn, onClickFn) {
  const entries = [];

  pokemon.forEach(p => {
    const d = cache[p];
    if (!d) return;
    entries.push({
      name: displayNameFn(p),
      spe: d.stats.spe,
      sprite: d.sprite,
      key: p,
      isMega: false,
    });
    // Add mega if available — check both the passed cache and global CACHE
    if (canMegaSet && canMegaSet.has(p)) {
      const megaD = cache['mega_' + p] || CACHE['mega_' + p];
      if (megaD && megaD.stats.spe) {
        entries.push({
          name: megaD.name || `Mega ${displayNameFn(p)}`,
          spe: megaD.stats.spe,
          sprite: megaD.sprite || d.sprite,
          key: p,
          isMega: true,
        });
      }
    }
  });

  entries.sort((a, b) => b.spe - a.spe);

  const maxSpe = entries[0]?.spe || 1;

  const rows = entries.map(e => {
    const pct = Math.round(e.spe / maxSpe * 100);
    const barColor = e.spe >= 110 ? '#c8f053' : e.spe >= 90 ? '#5f8cff' : e.spe >= 70 ? '#f0c832' : '#e05060';
    const sprite = e.sprite
      ? `<img src="${e.sprite}" style="width:36px;height:36px;image-rendering:pixelated;flex-shrink:0;cursor:pointer" onclick="${onClickFn}('${e.key}')" alt="">`
      : `<div style="width:36px;height:36px;flex-shrink:0"></div>`;
    return `<div style="display:grid;grid-template-columns:40px 1fr 40px;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--border)">
      ${sprite}
      <div>
        <div style="font-size:12px;font-weight:500;color:var(--text);margin-bottom:4px">
          ${e.name}${e.isMega?` <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;background:rgba(200,240,83,0.15);color:var(--accent);border:1px solid rgba(200,240,83,0.3);border-radius:4px;padding:1px 5px">Mega</span>`:''}
        </div>
        <div style="height:5px;background:var(--bg3);border-radius:3px;overflow:hidden">
          <div style="width:${pct}%;height:100%;background:${barColor};border-radius:3px"></div>
        </div>
      </div>
      <div style="font-family:'Space Mono',monospace;font-size:13px;font-weight:700;color:${barColor};text-align:right">${e.spe}</div>
    </div>`;
  }).join('');

  return `<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--card-r);padding:20px">
    <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:4px">Speed tiers</div>
    <div style="font-size:12px;color:var(--muted);margin-bottom:16px">Fastest to slowest · Mega forms listed separately</div>
    ${rows}
  </div>`;
}
// ── SEASON SWITCHING ────────────────────────────────────────────────────
let activeSeason = 2;

function setSeason(s) {
  activeSeason = s;
  // Update header buttons
  const s1b = document.getElementById('s1-btn'), s2b = document.getElementById('s2-btn');
  s1b.style.background = s===1 ? 'var(--accent)' : 'transparent';
  s1b.style.color = s===1 ? '#0d0f14' : 'var(--muted)';
  s2b.style.background = s===2 ? 'var(--accent)' : 'transparent';
  s2b.style.color = s===2 ? '#0d0f14' : 'var(--muted)';
  document.getElementById('season-title').textContent = `Season ${s}`;
  // Update link
  const link = document.getElementById('league-link');
  link.href = s===1 ? 'https://poke.inhouseboyz.com/league/siebert1' : 'https://poke.inhouseboyz.com/league/3bffbe9bf515';
  // Reset to overview
  currentView = 'overview';
  renderNav();
  if (s===1) renderOverview();
  else renderS2Overview();
}
// ── UPDATED RENDER NAV (season-aware) ─────────────────────────────────
function renderNav() {
  if (activeSeason === 1) {
    const tabs = [['overview','Overview'],['schedule','Schedule'],['all','All teams'],['eli','Eli'],['jake','Jake'],['deshans','Deshans'],['tim','Tim'],['sam','Sam'],['wyatt','Wyatt']];
    document.getElementById('nav').innerHTML = tabs.map(([k,l])=>`<button class="nav-btn${currentView===k?' active':''}" onclick="setView('${k}')">${l}</button>`).join('');
  } else {
    const tabs = [['overview','Overview'],['all','All teams'],['flick','Flick'],['wyatt','Wyatt'],['jake','Jake'],['sam','Sam'],['jackie','Jackie'],['deshans','Deshans'],['montemole','MonteMole'],['eli','Eli'],['tim','Tim']];
    document.getElementById('nav').innerHTML = tabs.map(([k,l])=>`<button class="nav-btn${s2CurrentView===k?' active':''}" onclick="setS2View('${k}')">${l}</button>`).join('');
  }
}

// ── INIT ───────────────────────────────────────────────────────────────
async function init() {
  document.getElementById('view').innerHTML = '<div class="loading-msg">Loading league data...</div>';
  renderNav();
  // Load Season 2 first (default view)
  const allS2 = [...new Set([...Object.values(S2_TEAMS).flatMap(t=>t.pokemon), ...S2_FA.map(f=>f.in)])];
  await Promise.allSettled(allS2.map(p=>fetchPokeS2(p)));
  await Promise.allSettled(allS2.filter(p=>S2_ALT_FORMS[p]).map(p=>fetchAltFormS2(p)));
  await Promise.allSettled(allS2.filter(p=>CAN_MEGA.has(p)).map(p=>fetchMega(p)));
  renderS2Overview();
  // Load Season 1 in background
  const all = [...new Set(Object.values(TEAMS).flatMap(t=>t.pokemon))];
  Promise.allSettled(all.map(p=>fetchPoke(p))).then(()=>
    Promise.allSettled(all.filter(p=>CAN_MEGA.has(p)).map(p=>fetchMega(p))).then(()=>
      Promise.allSettled(all.filter(p=>ALT_FORMS[p]).map(p=>fetchAltForms(p)))
    )
  );
}

init();
