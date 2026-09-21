// ── SEASON 2: DATA + RENDERING
// Everything in this file only affects Season 2.

// ── SEASON 2 DATA
const S2_TEAMS = {
  flick:     { name:'Flick',     teamName:"Flick's Team",     pokemon:['delphox','milotic','venusaur','typhlosion-hisui','meowstic-male','gliscor','weavile','samurott-hisui','tinkaton','araquanid'] },
  wyatt:     { name:'Wyatt',     teamName:'Sage Town Slows',  pokemon:['gholdengo','talonflame','blastoise','krookodile','klefki','pinsir','ceruledge','sceptile','tauros-paldea-aqua','altaria'] },
  jake:      { name:'Jake',      teamName:"Motor City Mausholds", pokemon:['metagross','ninetales-alola','blaziken','hydreigon','kangaskhan','tsareena','empoleon','arcanine-hisui','aegislash','toxicroak'] },
  sam:       { name:'Sam',       teamName:"Big Apple Hydrapples",  pokemon:['scrafty','froslass','clefable','armarouge','meowscarada','azumarill','jolteon','goodra-hisui','lopunny','arcanine'] },
  jackie:    { name:'Jackie',    teamName:"Jackie's Team",    pokemon:['tyranitar','primarina','mamoswine','gengar','corviknight','charizard','toxapex','gallade','mr-rime','wyrdeer'] },
  deshans:   { name:'Deshans',   teamName:"C-City Charcadets",pokemon:['eelektross','pelipper','lycanroc-dusk','excadrill','mimikyu','hatterene','skeledirge','drampa','espathra','abomasnow'] },
  montemole: { name:'MonteMole', teamName:"MonteMole's Team", pokemon:['sableye','aerodactyl','annihilape','mawile','torkoal','politoed','starmie','kommo-o','pyroar','vivillon'] },
  eli:       { name:'Eli',       teamName:"Emerald City Empoleons", pokemon:['malamar','volcarona','glimmora','meganium','oranguru','noivern','liepard','palafin','houndstone','hippowdon'] },
  tim:       { name:'Tim',       teamName:"Taipei Taiphlosions", pokemon:['maushold','dragonite','gardevoir','scizor','gyarados','dragapult','chandelure','raichu','chesnaught','golurk'] },
};

const S2_API_SLUG = {
  'typhlosion-hisui':   'typhlosion-hisui',
  'meowstic-male':      'meowstic-male',
  'samurott-hisui':     'samurott-hisui',
  'ninetales-alola':    'ninetales-alola',
  'tauros-paldea-aqua': 'tauros-paldea-aqua-breed',
  'arcanine-hisui':     'arcanine-hisui',
  'aegislash':          'aegislash-shield',
  'lycanroc-dusk':      'lycanroc-dusk',
  'goodra-hisui':       'goodra-hisui',
  'kommo-o':            'kommo-o',
  'mr-rime':            'mr-rime',
  'palafin':            'palafin-zero',
  'maushold':           'maushold-family-of-four',
  'mimikyu':            'mimikyu-disguised',
  'pyroar':             'pyroar-male',
  'wyrdeer':            'wyrdeer',
  'skeledirge':         'skeledirge',
  'houndstone':         'houndstone',
  'hippowdon':          'hippowdon',
  'eelektross':         'eelektross',
  'malamar':            'malamar',
};

const S2_ALT_FORMS = {
  'aegislash': [
    { label:'Shield', apiSlug:'aegislash-shield' },
    { label:'Blade',  apiSlug:'aegislash-blade'  },
  ],
  'palafin': [
    { label:'Zero', apiSlug:'palafin-zero' },
    { label:'Hero', apiSlug:'palafin-hero' },
  ],
};

const S2_TRAINERS = {
  flick:     { name:'Flick',     championsId:null, switchId:null, discord:'Flick' },
  wyatt:     { name:'Wyatt',     championsId:'0853 7544 9900', switchId:'SW-0753-1737-4306', discord:'booerns' },
  jake:      { name:'Jake',      championsId:null, switchId:null, discord:'ajaxislemons' },
  sam:       { name:'Sam',       championsId:'4234 1744 6458', switchId:'SW-1425-0854-2900', discord:'Taffy Lee Fubbins' },
  jackie:    { name:'Jackie',    championsId:null, switchId:null, discord:'JackiePaper' },
  deshans:   { name:'Deshans',   championsId:'1845 5200 2383', switchId:'SW-2372-7344-3332', discord:'Aura' },
  montemole: { name:'MonteMole', championsId:null, switchId:null, discord:'MonteMole' },
  eli:       { name:'Eli',       championsId:'7609 7098 9181', switchId:'SW-1254-5136-0241', discord:'Eli | ThatsNoMun' },
  tim:       { name:'Tim',       championsId:'6309 9377 9475', switchId:'SW-2498-4550-2900', discord:'Taymooth' },
};

// ── SEASON 2 FREE AGENT MOVES
// The draft rosters above are the ORIGINAL picks. Each entry here is one
// free-agent transaction: the team drops `out` and picks up `in`.
// Active roster = draft - outs + ins. To log a new move, add one line.
const S2_FA = [
  { team:'sam',    week:2, out:'arcanine',  in:'kleavor' },
  { team:'jackie', week:2, out:'mr-rime',  in:'decidueye-hisui' },
];

const S2_CACHE = {};

async function fetchPokeS2(key) {
  if (S2_CACHE[key]) return S2_CACHE[key];
  const slug = S2_API_SLUG[key] || key;
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
    if (!r.ok) throw 0;
    const d = await r.json();
    const abilityData = await Promise.all(
      d.abilities.map(async a => {
        try {
          const ar = await fetch(a.ability.url);
          const ad = await ar.json();
          const engEntry = ad.effect_entries.find(e=>e.language.name==='en');
          return { name:a.ability.name.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase()), isHidden:a.is_hidden, desc:engEntry?.short_effect||'' };
        } catch { return { name:a.ability.name, isHidden:a.is_hidden, desc:'' }; }
      })
    );
    S2_CACHE[key] = { name:d.name, sprite:d.sprites.front_default, types:d.types.map(t=>t.type.name), stats:{hp:d.stats[0].base_stat,atk:d.stats[1].base_stat,def:d.stats[2].base_stat,spa:d.stats[3].base_stat,spd:d.stats[4].base_stat,spe:d.stats[5].base_stat}, abilities:abilityData };
  } catch { S2_CACHE[key] = { name:key, sprite:null, types:[], stats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, abilities:[] }; }
  return S2_CACHE[key];
}

async function fetchAltFormS2(key) {
  const forms = S2_ALT_FORMS[key]; if (!forms) return;
  await Promise.allSettled(forms.map(async f => {
    const ck = `alt_${key}_${f.label}`;
    if (S2_CACHE[ck]) return;
    try {
      const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${f.apiSlug}`);
      if (!r.ok) throw 0;
      const d = await r.json();
      S2_CACHE[ck] = { name:d.name, sprite:d.sprites.front_default, types:d.types.map(t=>t.type.name), stats:{hp:d.stats[0].base_stat,atk:d.stats[1].base_stat,def:d.stats[2].base_stat,spa:d.stats[3].base_stat,spd:d.stats[4].base_stat,spe:d.stats[5].base_stat}, abilities:[] };
    } catch { S2_CACHE[`alt_${key}_${f.label}`] = null; }
  }));
}
// ── SEASON 2 FREE AGENT HELPERS ─────────────────────────────────────────
// Draft rosters (S2_TEAMS.pokemon) are the original picks. S2_FA logs every
// drop/pickup. The "active roster" (what actually plays, and what speeds and
// type coverage reflect) is derived: draft − drops + pickups.
function s2FaMoves(key) { return S2_FA.filter(f=>f.team===key); }
function s2Dropped(key) { return s2FaMoves(key).map(f=>f.out); }
function s2FaMoveFor(key, p) { return s2FaMoves(key).find(f=>f.out===p) || null; }
function s2IsFAPick(key, p) { return s2FaMoves(key).some(f=>f.in===p); }
function s2ActiveRoster(key) {
  const dropped = new Set(s2Dropped(key));
  const active = S2_TEAMS[key].pokemon.filter(p=>!dropped.has(p));
  for (const f of s2FaMoves(key)) if (!active.includes(f.in)) active.push(f.in);
  return active;
}

// ── SEASON 2 RENDER FUNCTIONS ──────────────────────────────────────────
function s2dn(name) {
  const overrides = {
    'typhlosion-hisui':'H-Typhlosion','meowstic-male':'Meowstic (M)','samurott-hisui':'H-Samurott',
    'ninetales-alola':'A-Ninetales','tauros-paldea-aqua':'Tauros (Aqua)','arcanine-hisui':'H-Arcanine',
    'aegislash':'Aegislash','lycanroc-dusk':'Lycanroc-Dusk','goodra-hisui':'H-Goodra',
    'kommo-o':'Kommo-o','mr-rime':'Mr. Rime','palafin':'Palafin','maushold':'Maushold',
    'decidueye-hisui':'H-Decidueye',
  };
  return overrides[name] || name.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase());
}

function renderS2Overview() {
  const cards = Object.entries(S2_TEAMS).map(([k,t])=>{
    const active = s2ActiveRoster(k);
    const types = active.flatMap(p=>S2_CACHE[p]?.types||[]);
    const tc={}; types.forEach(tp=>tc[tp]=(tc[tp]||0)+1);
    const topT = Object.entries(tc).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([tp])=>tpill(tp)).join('');
    const avg = active.length ? Math.round(active.reduce((s,p)=>{const d=S2_CACHE[p];return s+(d?bst(d.stats):0);},0)/active.length) : '–';
    const isCustom = t.teamName !== `${t.name}'s Team` && t.teamName !== `${t.name}' Team`;
    return `<div class="overview-card" onclick="setS2View('${k}')">
      <div class="ov-name">${t.teamName}</div>
      ${isCustom?`<div style="font-size:11px;color:var(--muted);margin-bottom:2px">${t.name}</div>`:''}
      <div class="ov-count" style="margin-bottom:8px">10 Pokémon</div>
      <div class="ov-types">${topT}</div>
      <div class="ov-bst">avg BST <strong>${avg}</strong></div>
    </div>`;
  }).join('');
  document.getElementById('view').innerHTML = `<div class="overview-grid">${cards}</div>`;
}

function renderS2Team(key) {
  const t = S2_TEAMS[key];
  const trainer = S2_TRAINERS[key] || {};
  const sub = rosterSubView['s2_'+key] || 'roster';
  const isCustom = t.teamName !== `${t.name}'s Team` && t.teamName !== `${t.name}' Team`;

  function idChip(label, val) {
    return `<div class="trainer-id-chip"><div class="trainer-id-label">${label}</div>${val?`<div class="trainer-id-val">${val}</div>`:`<div class="trainer-id-missing">Not set</div>`}</div>`;
  }

  document.getElementById('view').innerHTML = `
    <div class="trainer-card">
      <div class="trainer-avatar">🎮</div>
      <div class="trainer-main">
        <div class="trainer-team-name">${t.teamName}</div>
        ${isCustom?`<div class="trainer-owner-label">Owner: ${t.name}</div>`:`<div class="trainer-owner-label">${t.name}</div>`}
        <div class="trainer-ids">
          ${idChip('Champions ID', trainer.championsId)}
          ${idChip('Switch ID', trainer.switchId)}
          ${idChip('Discord', trainer.discord)}
        </div>
      </div>
    </div>
    <div class="roster-header" style="margin-top:0"><div style="display:flex;gap:6px">
      <button class="sub-tab${sub==='roster'?' active':''}" onclick="setS2SubView('${key}','roster')">Roster</button>
      <button class="sub-tab${sub==='typechart'?' active':''}" onclick="setS2SubView('${key}','typechart')">Type coverage</button>
      <button class="sub-tab${sub==='speeds'?' active':''}" onclick="setS2SubView('${key}','speeds')">Speeds</button>
    </div><div class="roster-hint">click card for full stats ↗</div></div>
    <div id="sub-content"></div>`;
  renderS2SubView(key, sub);
}

window.setS2SubView = function(key, sub) {
  rosterSubView['s2_'+key] = sub;
  document.querySelectorAll('.sub-tab').forEach(b=>b.classList.remove('active'));
  const label = sub==='roster'?'Roster':sub==='speeds'?'Speeds':'Type';
  document.querySelectorAll('.sub-tab').forEach(b=>{ if(b.textContent.includes(label)) b.classList.add('active'); });
  renderS2SubView(key, sub);
};

function renderS2SubView(key, sub) {
  const t = S2_TEAMS[key];
  const el = document.getElementById('sub-content');
  if (sub === 'roster') {
    const cards = s2ActiveRoster(key).map(p=>{
      const d = S2_CACHE[p];
      const sprite = d?.sprite?`<img class="poke-sprite" src="${d.sprite}" alt="">`:`<div class="poke-sprite-ph">◈</div>`;
      const types = (d?.types||[]).map(tp=>tpill(tp)).join('');
      const total = d?bst(d.stats):0;
      const canM = CAN_MEGA.has(p);
      const fa = s2IsFAPick(key,p) ? s2FaMoves(key).find(f=>f.in===p) : null;
      return `<div class="poke-card" onclick="showS2Modal('${p}')">
        ${canM?'<div class="mega-badge">Mega</div>':''}
        ${fa?`<div class="fa-badge" title="Picked up in week ${fa.week}">FA</div>`:''}
        ${sprite}<div class="poke-name">${s2dn(p)}</div>
        <div class="type-row">${types}</div>
        <div class="bst-num">BST ${total}</div>
      </div>`;
    }).join('');
    const dropped = s2Dropped(key).map(p=>{
      const d = S2_CACHE[p];
      const mv = s2FaMoveFor(key,p);
      const sprite = d?.sprite?`<img class="poke-sprite" src="${d.sprite}" alt="">`:`<div class="poke-sprite-ph">◈</div>`;
      const types = (d?.types||[]).map(tp=>tpill(tp)).join('');
      return `<div class="poke-card dropped" title="Dropped in week ${mv?.week??''}">
        <div class="fa-badge dropped-badge">Dropped</div>
        ${sprite}<div class="poke-name">${s2dn(p)}</div>
        <div class="type-row">${types}</div>
        <div class="bst-num">BST ${d?bst(d.stats):0}</div>
      </div>`;
    }).join('');
    el.innerHTML = `<div class="pokemon-grid">${cards}</div>${dropped?`<div class="dropped-section"><div class="dropped-label">Dropped (free agency)</div><div class="pokemon-grid">${dropped}</div></div>`:''}`;
  } else if (sub === 'typechart') {
    // Type chart — reuse same logic but with S2_CACHE
    const ALL_TYPES = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
    const typeData = ALL_TYPES.map(atk => {
      const perPoke = s2ActiveRoster(key).map(p => {
        const d = S2_CACHE[p]; if (!d||!d.types.length) return {p,mult:1};
        const eff = TYPE_EFF[atk]||{}; let m=1;
        d.types.forEach(def=>{if(eff[def]!==undefined) m*=eff[def];});
        return {p,mult:m};
      });
      const immunes=perPoke.filter(x=>x.mult===0), dblResist=perPoke.filter(x=>x.mult===0.25),
            resists=perPoke.filter(x=>x.mult===0.5), weaks=perPoke.filter(x=>x.mult===2), dblWeaks=perPoke.filter(x=>x.mult===4);
      const score=immunes.length*3+dblResist.length*2+resists.length*1-weaks.length*1-dblWeaks.length*2;
      return {atk,score,immunes,dblResist,resists,weaks,dblWeaks};
    }).sort((a,b)=>b.score-a.score);
    const maxAbs = Math.max(...typeData.map(x=>Math.abs(x.score)),1);
    function spriteRow(arr,label,color){
      if(!arr.length) return '';
      const icons=arr.map(({p})=>{const d=S2_CACHE[p];return d?.sprite?`<img src="${d.sprite}" title="${s2dn(p)}" style="width:28px;height:28px;image-rendering:pixelated;cursor:pointer" onclick="event.stopPropagation();showS2Modal('${p}')">`:''}).join('');
      return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px"><span style="font-size:9px;color:${color};width:54px;flex-shrink:0;text-align:right">${label}</span><div style="display:flex;gap:2px;flex-wrap:wrap">${icons}</div></div>`;
    }
    const rows = typeData.map(({atk,score,immunes,dblResist,resists,weaks,dblWeaks})=>{
      const pct=Math.round(Math.abs(score)/maxAbs*100);
      const barColor=score>3?'#1D9E75':score>0?'#5f8cff':score<-3?'#E24B4A':'#f0c832';
      const scoreLabel=score===0?'±0':(score>0?'+':'')+score;
      const tipId=`s2tc-${atk}-${key}`;
      const tooltipContent=[spriteRow(immunes,'0× immune','#c0b0e0'),spriteRow(dblResist,'¼× resist','#60d070'),spriteRow(resists,'½× resist','#70a8f0'),spriteRow(weaks,'2× weak','#f0c832'),spriteRow(dblWeaks,'4× weak','#f08060')].filter(Boolean).join('');
      return `<div class="tc-bar-row" onmouseenter="showTcTooltip(event,'${tipId}')" onmouseleave="hideTcTooltip()" onclick="toggleTcTooltip(event,'${tipId}')">
        <div class="tc-bar-type t-${atk}">${atk}</div>
        <div class="tc-bar-track"><div class="tc-bar-center"></div>
          <div style="position:absolute;top:0;${score>=0?'left:50%':'right:50%'};width:${Math.round(pct/2)}%;height:100%;background:${barColor};border-radius:${score>=0?'0 3px 3px 0':'3px 0 0 3px'}"></div>
        </div>
        <div class="tc-bar-score" style="color:${barColor}">${scoreLabel}</div>
        <div class="tc-tooltip" id="${tipId}" style="display:none">${tooltipContent||'<span style="font-size:11px;color:var(--muted)">All neutral</span>'}</div>
      </div>`;
    }).join('');
    el.innerHTML=`<div class="type-chart-wrap"><div class="tc-title">Defensive type coverage</div><div class="tc-sub">Positive score = team resists this type. Hover or tap a row to see which Pokémon are affected.</div><div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted);font-family:'Space Mono',monospace;margin-bottom:8px;padding:0 56px 0 72px"><span>← more weak</span><span>more resistant →</span></div>${rows}</div>`;
  } else if (sub === 'speeds') {
    el.innerHTML = renderSpeedsTab(s2ActiveRoster(key), S2_CACHE, MEGAS, CAN_MEGA, s2dn, 'showS2Modal');
  }
}

function renderS2All() {
  const blocks = Object.entries(S2_TEAMS).map(([key,t])=>{
    const rows = s2ActiveRoster(key).map(p=>{
      const d=S2_CACHE[p];
      const sprite=d?.sprite?`<img class="mini-sprite" src="${d.sprite}" alt="">`:`<div class="mini-sprite" style="display:flex;align-items:center;justify-content:center;opacity:0.3;font-size:18px">◈</div>`;
      const types=(d?.types||[]).map(tp=>tpill(tp)).join('');
      const fa=s2IsFAPick(key,p)?'<span class="fa-chip">FA</span>':'';
      return `<div class="mini-row" onclick="showS2Modal('${p}')">${sprite}<span class="mini-name">${s2dn(p)}${fa}</span><div class="mini-types">${types}</div></div>`;
    }).join('');
    const droppedRows = s2Dropped(key).map(p=>{
      const d=S2_CACHE[p];
      const sprite=d?.sprite?`<img class="mini-sprite" src="${d.sprite}" alt="" style="opacity:0.4">`:`<div class="mini-sprite" style="display:flex;align-items:center;justify-content:center;opacity:0.2;font-size:18px">◈</div>`;
      return `<div class="mini-row dropped-row" style="cursor:default"><span style="width:36px;flex-shrink:0;display:flex;justify-content:center">${sprite}</span><span class="mini-name" style="opacity:0.4;text-decoration:line-through">${s2dn(p)}</span><span class="dropped-chip">dropped</span></div>`;
    }).join('');
    const isCustom = t.teamName !== `${t.name}'s Team` && t.teamName !== `${t.name}' Team`;
    return `<div class="all-block"><div class="all-block-name">${t.teamName}${isCustom?`<span style="font-weight:400;color:var(--muted);font-size:11px;margin-left:6px">${t.name}</span>`:''}</div>${rows}${droppedRows}</div>`;
  }).join('');
  document.getElementById('view').innerHTML = `<div class="all-grid">${blocks}</div>`;
}

function showS2Modal(key) {
  const d = S2_CACHE[key]; if (!d) return;
  let owner = '';
  for (const [k,t] of Object.entries(S2_TEAMS)) { if(t.pokemon.includes(key)){owner=t.name;break;} }
  const faMove = owner ? null : S2_FA.find(f=>f.in===key);
  const altForms = S2_ALT_FORMS[key] || null;
  const hasMega = CAN_MEGA.has(key);
  const megaData = hasMega ? CACHE['mega_' + key] : null;
  const serebii = serebiiSlug(key);
  const pikalytics = pikalyticsUrl(key);
  let tabs=[], statBlocks='';
  if (altForms) {
    tabs = altForms.map(f=>f.label);
    statBlocks = altForms.map(f=>{ const fd=S2_CACHE[`alt_${key}_${f.label}`]; return buildStatBlock(fd,`s2alt_${f.label}`); }).join('');
  } else {
    tabs = ['Base'];
    statBlocks = buildStatBlock(d,'s2base');
    if (hasMega && megaData) {
      tabs.push('Mega');
      statBlocks += buildStatBlock(megaData,'s2mega');
    }
  }
  const firstTabId = altForms?`s2alt_${altForms[0].label}`:'s2base';
  const tabHTML = tabs.length>1?`<div class="stat-toggle" id="modal-tabs">${tabs.map((lbl,i)=>{const id=altForms?`s2alt_${lbl}`:lbl==='Base'?'s2base':'s2mega';return`<button class="stat-tab${i===0?' active':''}" onclick="switchModalTab('${id}',this)">${lbl}</button>`;}).join('')}</div>`:'';
  const displaySprite = altForms?(S2_CACHE[`alt_${key}_${altForms[0].label}`]?.sprite||d.sprite):d.sprite;
  const el = document.createElement('div');
  el.className='modal-overlay';
  el.innerHTML=`<div class="modal">
    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
    <img class="modal-sprite" id="modal-spr" src="${displaySprite||''}" alt="" ${displaySprite?'':'style="display:none"'}>
    <div class="modal-name">${s2dn(key)}</div>
    <div class="modal-links">
      <a class="modal-link" href="${serebii}" target="_blank">Serebii ↗</a>
      <a class="modal-link" href="${pikalytics}" target="_blank">Pikalytics ↗</a>
    </div>
    ${tabHTML}${statBlocks}
    <div class="owner-tag">${faMove?`Picked up by <strong>${S2_TEAMS[faMove.team].name}</strong> · free agent, week ${faMove.week}`:`Drafted by <strong>${owner}</strong>`}</div>
  </div>`;
  const firstBlock=el.querySelector(`#stats-${firstTabId}`);
  if(firstBlock) firstBlock.style.display='block';
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
  document.body.appendChild(el);
}

let s2CurrentView = 'overview';
function setS2View(v) {
  s2CurrentView = v;
  renderNav();
  if (v==='overview') renderS2Overview();
  else if (v==='all') renderS2All();
  else renderS2Team(v);
}
