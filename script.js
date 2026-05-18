// ===================================================
//             FUNÇÕES UTILITÁRIAS (SEGURANÇA)
// ===================================================
function escapeHTML(str) {
  if (!str) return '';
  return str.toString().replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// ---------- TABS ----------
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.panel;
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
    window.scrollTo({ top: document.querySelector('.tabs').offsetTop - 10, behavior: 'smooth' });
  });
});

// ---------- ACORDEÃO DE ARTIGOS ----------
document.querySelectorAll('.article-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});

// ---------- BUSCA NOS ARTIGOS ----------
const searchInput = document.getElementById('search');
if (searchInput) {
  const articles = document.querySelectorAll('.article');
  searchInput.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    articles.forEach(art => {
      art.classList.remove('dimmed', 'match');
      if (!q) { art.classList.remove('open'); return; }
      const text = art.textContent.toLowerCase();
      if (text.includes(q)) {
        art.classList.add('match', 'open');
      } else {
        art.classList.add('dimmed');
        art.classList.remove('open');
      }
    });
  });
}

// ===================================================
//                    GRUPOS
// ===================================================
const FLAGS = {
  'México':'MEX', 'África do Sul':'RSA', 'Coreia do Sul':'KOR', 'República Tcheca':'CZE',
  'Canadá':'CAN', 'Bósnia e Herzegovina':'BIH', 'Catar':'QAT', 'Suíça':'SUI',
  'Brasil':'BRA', 'Marrocos':'MAR', 'Haiti':'HAI', 'Escócia':'SCO',
  'Estados Unidos':'USA', 'Paraguai':'PAR', 'Austrália':'AUS', 'Turquia':'TUR',
  'Alemanha':'GER', 'Curaçau':'CUW', 'Costa do Marfim':'CIV', 'Equador':'ECU',
  'Holanda':'NED', 'Japão':'JPN', 'Suécia':'SWE', 'Tunísia':'TUN',
  'Bélgica':'BEL', 'Egito':'EGY', 'Irã':'IRN', 'Nova Zelândia':'NZL',
  'Espanha':'ESP', 'Cabo Verde':'CPV', 'Arábia Saudita':'KSA', 'Uruguai':'URU',
  'França':'FRA', 'Senegal':'SEN', 'Iraque':'IRQ', 'Noruega':'NOR',
  'Argentina':'ARG', 'Argélia':'ALG', 'Áustria':'AUT', 'Jordânia':'JOR',
  'Portugal':'POR', 'RD Congo':'COD', 'Uzbequistão':'UZB', 'Colômbia':'COL',
  'Inglaterra':'ENG', 'Croácia':'CRO', 'Gana':'GHA', 'Panamá':'PAN'
};
const GROUPS = {
  A: [['México',true,false],['África do Sul'],['Coreia do Sul'],['República Tcheca']],
  B: [['Canadá',true,false],['Bósnia e Herzegovina'],['Catar'],['Suíça']],
  C: [['Brasil',false,true],['Marrocos'],['Haiti'],['Escócia']],
  D: [['Estados Unidos',true,false],['Paraguai'],['Austrália'],['Turquia']],
  E: [['Alemanha',false,true],['Curaçau'],['Costa do Marfim'],['Equador']],
  F: [['Holanda'],['Japão'],['Suécia'],['Tunísia']],
  G: [['Bélgica'],['Egito'],['Irã'],['Nova Zelândia']],
  H: [['Espanha',false,true],['Cabo Verde'],['Arábia Saudita'],['Uruguai',false,true]],
  I: [['França',false,true],['Senegal'],['Iraque'],['Noruega']],
  J: [['Argentina',false,true],['Argélia'],['Áustria'],['Jordânia']],
  K: [['Portugal'],['RD Congo'],['Uzbequistão'],['Colômbia']],
  L: [['Inglaterra',false,true],['Croácia'],['Gana'],['Panamá']]
};

function renderGroups() {
  const grid = document.getElementById('groups-grid');
  if (!grid) return;
  let html = '';
  for (const [letter, teams] of Object.entries(GROUPS)) {
    html += `<div class="group-card">
      <div class="group-header">Grupo ${letter}</div>
      <ul class="group-teams">`;
    for (const [name, host, champ] of teams) {
      const isHost = !!host, isChamp = !!champ;
      html += `<li class="${isHost?'host':''} ${isChamp?'champ':''}">
        <span class="flag">${FLAGS[name]||'🏳️'}</span>
        <span class="team-name"></span>
        <span class="markers">
          ${isHost?'<span class="m-host" title="País-sede">●</span>':''}
          ${isChamp?'<span class="m-champ" title="Campeão mundial">★</span>':''}
        </span>
      </li>`;
    }
    html += '</ul></div>';
  }
  grid.innerHTML = html;
}

// ===================================================
//                    JOGOS
// ===================================================
const ROUNDS = [
  {
    id: 'r1', label: '1ª Rodada', subtitle: '11 a 17 de junho de 2026',
    days: [
      { date: 'Quinta, 11 de junho de 2026', matches: [
        { group:'A', teams:['México','África do Sul'], time:'16h00', city:'Cidade do México 🇲🇽' },
        { group:'A', teams:['Coreia do Sul','República Tcheca'], time:'23h00', city:'Guadalajara 🇲🇽' }
      ]},
      { date: 'Sexta, 12 de junho de 2026', matches: [
        { group:'B', teams:['Canadá','Bósnia e Herzegovina'], time:'16h00', city:'Toronto 🇨🇦' },
        { group:'D', teams:['Estados Unidos','Paraguai'], time:'22h00', city:'Los Angeles 🇺🇸' }
      ]},
      { date: 'Sábado, 13 de junho de 2026', matches: [
        { group:'B', teams:['Catar','Suíça'], time:'16h00', city:'Santa Clara 🇺🇸' },
        { group:'C', teams:['Brasil','Marrocos'], time:'19h00', city:'Nova York/Nova Jersey 🇺🇸' },
        { group:'C', teams:['Haiti','Escócia'], time:'22h00', city:'Boston 🇺🇸' },
        { group:'D', teams:['Austrália','Turquia'], time:'01h00 (14/06)', city:'Vancouver 🇨🇦' }
      ]},
      { date: 'Domingo, 14 de junho de 2026', matches: [
        { group:'E', teams:['Alemanha','Curaçau'], time:'14h00', city:'Houston 🇺🇸' },
        { group:'F', teams:['Holanda','Japão'], time:'17h00', city:'Dallas 🇺🇸' },
        { group:'E', teams:['Costa do Marfim','Equador'], time:'20h00', city:'Filadélfia 🇺🇸' },
        { group:'F', teams:['Suécia','Tunísia'], time:'23h00', city:'Monterrey 🇲🇽' }
      ]},
      { date: 'Segunda, 15 de junho de 2026', matches: [
        { group:'H', teams:['Espanha','Cabo Verde'], time:'13h00', city:'Atlanta 🇺🇸' },
        { group:'G', teams:['Bélgica','Egito'], time:'16h00', city:'Seattle 🇺🇸' },
        { group:'H', teams:['Arábia Saudita','Uruguai'], time:'19h00', city:'Miami 🇺🇸' },
        { group:'G', teams:['Irã','Nova Zelândia'], time:'22h00', city:'Los Angeles 🇺🇸' }
      ]},
      { date: 'Terça, 16 de junho de 2026', matches: [
        { group:'I', teams:['França','Senegal'], time:'16h00', city:'Nova York/Nova Jersey 🇺🇸' },
        { group:'I', teams:['Iraque','Noruega'], time:'19h00', city:'Boston 🇺🇸' },
        { group:'J', teams:['Argentina','Argélia'], time:'22h00', city:'Kansas City 🇺🇸' },
        { group:'J', teams:['Áustria','Jordânia'], time:'01h00 (17/06)', city:'Santa Clara 🇺🇸' }
      ]},
      { date: 'Quarta, 17 de junho de 2026', matches: [
        { group:'K', teams:['Portugal','RD Congo'], time:'14h00', city:'Houston 🇺🇸' },
        { group:'L', teams:['Inglaterra','Croácia'], time:'17h00', city:'Dallas 🇺🇸' },
        { group:'L', teams:['Gana','Panamá'], time:'20h00', city:'Toronto 🇨🇦' },
        { group:'K', teams:['Uzbequistão','Colômbia'], time:'21h00', city:'Cidade do México 🇲🇽' }
      ]}
    ]
  },
  {
    id: 'r2', label: '2ª Rodada', subtitle: '18 a 23 de junho de 2026',
    days: [
      { date: 'Quinta, 18 de junho de 2026', matches: [
        { group:'A', teams:['República Tcheca','África do Sul'], time:'13h00', city:'Atlanta 🇺🇸' },
        { group:'B', teams:['Suíça','Bósnia e Herzegovina'], time:'16h00', city:'Los Angeles 🇺🇸' },
        { group:'B', teams:['Canadá','Catar'], time:'19h00', city:'Vancouver 🇨🇦' },
        { group:'A', teams:['México','Coreia do Sul'], time:'22h00', city:'Guadalajara 🇲🇽' }
      ]},
      { date: 'Sexta, 19 de junho de 2026', matches: [
        { group:'D', teams:['Turquia','Paraguai'], time:'00h00', city:'Santa Clara 🇺🇸' },
        { group:'D', teams:['Estados Unidos','Austrália'], time:'16h00', city:'Seattle 🇺🇸' },
        { group:'C', teams:['Escócia','Marrocos'], time:'19h00', city:'Boston 🇺🇸' },
        { group:'C', teams:['Brasil','Haiti'], time:'21h30', city:'Filadélfia 🇺🇸' }
      ]},
      { date: 'Sábado, 20 de junho de 2026', matches: [
        { group:'F', teams:['Holanda','Suécia'], time:'14h00', city:'Houston 🇺🇸' },
        { group:'E', teams:['Alemanha','Costa do Marfim'], time:'17h00', city:'Toronto 🇨🇦' },
        { group:'E', teams:['Equador','Curaçau'], time:'21h00', city:'Kansas City 🇺🇸' },
        { group:'F', teams:['Tunísia','Japão'], time:'23h00', city:'Monterrey 🇲🇽' }
      ]},
      { date: 'Domingo, 21 de junho de 2026', matches: [
        { group:'H', teams:['Espanha','Arábia Saudita'], time:'13h00', city:'Atlanta 🇺🇸' },
        { group:'G', teams:['Bélgica','Irã'], time:'16h00', city:'Los Angeles 🇺🇸' },
        { group:'H', teams:['Uruguai','Cabo Verde'], time:'19h00', city:'Miami 🇺🇸' },
        { group:'G', teams:['Nova Zelândia','Egito'], time:'22h00', city:'Vancouver 🇨🇦' }
      ]},
      { date: 'Segunda, 22 de junho de 2026', matches: [
        { group:'J', teams:['Argentina','Áustria'], time:'14h00', city:'Dallas 🇺🇸' },
        { group:'I', teams:['França','Iraque'], time:'18h00', city:'Filadélfia 🇺🇸' },
        { group:'I', teams:['Noruega','Senegal'], time:'21h00', city:'Nova York/Nova Jersey 🇺🇸' },
        { group:'J', teams:['Jordânia','Argélia'], time:'00h00 (23/06)', city:'Santa Clara 🇺🇸' }
      ]},
      { date: 'Terça, 23 de junho de 2026', matches: [
        { group:'K', teams:['Portugal','Uzbequistão'], time:'14h00', city:'Houston 🇺🇸' },
        { group:'L', teams:['Inglaterra','Gana'], time:'17h00', city:'Boston 🇺🇸' },
        { group:'L', teams:['Panamá','Croácia'], time:'20h00', city:'Toronto 🇨🇦' },
        { group:'K', teams:['Colômbia','RD Congo'], time:'23h00', city:'Guadalajara 🇲🇽' }
      ]}
    ]
  },
  {
    id: 'r3', label: '3ª Rodada', subtitle: '24 a 27 de junho de 2026',
    days: [
      { date: 'Quarta, 24 de junho de 2026', matches: [
        { group:'B', teams:['Suíça','Canadá'], time:'16h00', city:'Vancouver 🇨🇦' },
        { group:'B', teams:['Bósnia e Herzegovina','Catar'], time:'16h00', city:'Seattle 🇺🇸' },
        { group:'C', teams:['Escócia','Brasil'], time:'19h00', city:'Miami 🇺🇸' },
        { group:'C', teams:['Marrocos','Haiti'], time:'19h00', city:'Atlanta 🇺🇸' },
        { group:'A', teams:['República Tcheca','México'], time:'22h00', city:'Cidade do México 🇲🇽' },
        { group:'A', teams:['África do Sul','Coreia do Sul'], time:'22h00', city:'Monterrey 🇲🇽' }
      ]},
      { date: 'Quinta, 25 de junho de 2026', matches: [
        { group:'E', teams:['Equador','Alemanha'], time:'17h00', city:'Nova York/Nova Jersey 🇺🇸' },
        { group:'E', teams:['Curaçau','Costa do Marfim'], time:'17h00', city:'Filadélfia 🇺🇸' },
        { group:'F', teams:['Japão','Suécia'], time:'20h00', city:'Dallas 🇺🇸' },
        { group:'F', teams:['Tunísia','Holanda'], time:'20h00', city:'Kansas City 🇺🇸' },
        { group:'D', teams:['Turquia','Estados Unidos'], time:'23h00', city:'Los Angeles 🇺🇸' },
        { group:'D', teams:['Paraguai','Austrália'], time:'23h00', city:'Santa Clara 🇺🇸' }
      ]},
      { date: 'Sexta, 26 de junho de 2026', matches: [
        { group:'I', teams:['Noruega','França'], time:'16h00', city:'Boston 🇺🇸' },
        { group:'I', teams:['Senegal','Iraque'], time:'16h00', city:'Toronto 🇨🇦' },
        { group:'H', teams:['Cabo Verde','Arábia Saudita'], time:'21h00', city:'Houston 🇺🇸' },
        { group:'H', teams:['Uruguai','Espanha'], time:'21h00', city:'Guadalajara 🇲🇽' },
        { group:'G', teams:['Egito','Irã'], time:'00h00 (27/06)', city:'Seattle 🇺🇸' },
        { group:'G', teams:['Nova Zelândia','Bélgica'], time:'00h00 (27/06)', city:'Vancouver 🇨🇦' }
      ]},
      { date: 'Sábado, 27 de junho de 2026', matches: [
        { group:'L', teams:['Panamá','Inglaterra'], time:'18h00', city:'Nova York/Nova Jersey 🇺🇸' },
        { group:'L', teams:['Croácia','Gana'], time:'18h00', city:'Filadélfia 🇺🇸' },
        { group:'K', teams:['Colômbia','Portugal'], time:'20h30', city:'Miami 🇺🇸' },
        { group:'K', teams:['RD Congo','Uzbequistão'], time:'20h30', city:'Atlanta 🇺🇸' },
        { group:'J', teams:['Argélia','Áustria'], time:'23h00', city:'Kansas City 🇺🇸' },
        { group:'J', teams:['Jordânia','Argentina'], time:'23h00', city:'Dallas 🇺🇸' }
      ]}
    ]
  },
  {
    id: 'r32', label: 'Round of 32', subtitle: '28 de junho a 3 de julho de 2026',
    knockout: true,
    days: [
      { date: 'Domingo, 28 de junho de 2026', matches: [
        { code:'Jogo 73', desc:'2º Grupo A × 2º Grupo B', city:'Los Angeles 🇺🇸' }
      ]},
      { date: 'Segunda, 29 de junho de 2026', matches: [
        { code:'Jogo 74', desc:'1º Grupo E × 3º (A/B/C/D/F)', city:'Boston 🇺🇸' },
        { code:'Jogo 75', desc:'1º Grupo F × 2º Grupo C', city:'Monterrey 🇲🇽' },
        { code:'Jogo 76', desc:'1º Grupo C × 2º Grupo F', city:'Houston 🇺🇸' }
      ]},
      { date: 'Terça, 30 de junho de 2026', matches: [
        { code:'Jogo 77', desc:'1º Grupo I × 3º (C/D/F/G/H)', city:'Nova York/Nova Jersey 🇺🇸' },
        { code:'Jogo 78', desc:'2º Grupo E × 2º Grupo I', city:'Dallas 🇺🇸' },
        { code:'Jogo 79', desc:'1º Grupo A × 3º (C/E/F/H/I)', city:'Cidade do México 🇲🇽' }
      ]},
      { date: 'Quarta, 1 de julho de 2026', matches: [
        { code:'Jogo 80', desc:'1º Grupo L × 3º (E/H/I/J/K)', city:'Atlanta 🇺🇸' },
        { code:'Jogo 81', desc:'1º Grupo D × 3º (B/E/F/I/J)', city:'Santa Clara 🇺🇸' },
        { code:'Jogo 82', desc:'1º Grupo G × 3º (A/E/H/I/J)', city:'Seattle 🇺🇸' }
      ]},
      { date: 'Quinta, 2 de julho de 2026', matches: [
        { code:'Jogo 83', desc:'2º Grupo K × 2º Grupo L', city:'Toronto 🇨🇦' },
        { code:'Jogo 84', desc:'1º Grupo H × 2º Grupo J', city:'Los Angeles 🇺🇸' },
        { code:'Jogo 85', desc:'1º Grupo B × 3º (E/F/G/I/J)', city:'Vancouver 🇨🇦' }
      ]},
      { date: 'Sexta, 3 de julho de 2026', matches: [
        { code:'Jogo 86', desc:'1º Grupo J × 2º Grupo H', city:'Miami 🇺🇸' },
        { code:'Jogo 87', desc:'1º Grupo K × 3º (D/E/I/J/L)', city:'Kansas City 🇺🇸' },
        { code:'Jogo 88', desc:'2º Grupo D × 2º Grupo G', city:'Dallas 🇺🇸' }
      ]}
    ]
  },
  {
    id: 'r16', label: 'Oitavas', subtitle: '4 a 7 de julho de 2026',
    knockout: true,
    days: [
      { date: 'Sábado, 4 de julho de 2026', matches: [
        { code:'Jogo 89', desc:'Vencedor 74 × Vencedor 77', city:'Filadélfia 🇺🇸' },
        { code:'Jogo 90', desc:'Vencedor 73 × Vencedor 75', city:'Houston 🇺🇸' }
      ]},
      { date: 'Domingo, 5 de julho de 2026', matches: [
        { code:'Jogo 91', desc:'Vencedor 76 × Vencedor 78', city:'Nova York/Nova Jersey 🇺🇸' },
        { code:'Jogo 92', desc:'Vencedor 79 × Vencedor 80', city:'Cidade do México 🇲🇽' }
      ]},
      { date: 'Segunda, 6 de julho de 2026', matches: [
        { code:'Jogo 93', desc:'Vencedor 83 × Vencedor 84', city:'Dallas 🇺🇸' },
        { code:'Jogo 94', desc:'Vencedor 81 × Vencedor 82', city:'Seattle 🇺🇸' }
      ]},
      { date: 'Terça, 7 de julho de 2026', matches: [
        { code:'Jogo 95', desc:'Vencedor 86 × Vencedor 88', city:'Atlanta 🇺🇸' },
        { code:'Jogo 96', desc:'Vencedor 85 × Vencedor 87', city:'Vancouver 🇨🇦' }
      ]}
    ]
  },
  {
    id: 'qf', label: 'Quartas', subtitle: '9 a 12 de julho de 2026',
    knockout: true,
    days: [
      { date: 'Quinta, 9 de julho de 2026', matches: [
        { code:'Jogo 97', desc:'Vencedor 89 × Vencedor 90', city:'Boston 🇺🇸' }
      ]},
      { date: 'Sexta, 10 de julho de 2026', matches: [
        { code:'Jogo 98', desc:'Vencedor 93 × Vencedor 94', city:'Los Angeles 🇺🇸' }
      ]},
      { date: 'Sábado, 12 de julho de 2026', matches: [
        { code:'Jogo 99', desc:'Vencedor 91 × Vencedor 92', city:'Miami 🇺🇸' },
        { code:'Jogo 100', desc:'Vencedor 95 × Vencedor 96', city:'Kansas City 🇺🇸' }
      ]}
    ]
  },
  {
    id: 'sf', label: 'Semifinais', subtitle: '14 e 15 de julho de 2026',
    knockout: true,
    days: [
      { date: 'Terça, 14 de julho de 2026', matches: [
        { code:'Jogo 101', desc:'Vencedor 97 × Vencedor 98', city:'Dallas 🇺🇸' }
      ]},
      { date: 'Quarta, 15 de julho de 2026', matches: [
        { code:'Jogo 102', desc:'Vencedor 99 × Vencedor 100', city:'Atlanta 🇺🇸' }
      ]}
    ]
  },
  {
    id: 'final', label: '3º Lugar e Final', subtitle: '18 e 19 de julho de 2026',
    knockout: true,
    days: [
      { date: 'Sábado, 18 de julho de 2026 — Disputa de 3º Lugar', matches: [
        { code:'Jogo 103', desc:'Perdedor 101 × Perdedor 102', city:'Miami 🇺🇸' }
      ]},
      { date: 'Domingo, 19 de julho de 2026 — 🏆 GRANDE FINAL', matches: [
        { code:'Jogo 104', desc:'Vencedor 101 × Vencedor 102', city:'Nova York/Nova Jersey 🇺🇸' }
      ]}
    ]
  }
];

function teamHTML(name) {
  return `<span class="match-team"><span class="flag">${FLAGS[name]||'🏳️'}</span></span>`;
}

function renderRound(round) {
  let html = `<div class="round-header"><h3>${escapeHTML(round.label)}</h3><p>${escapeHTML(round.subtitle)}</p></div>`;
  for (const day of round.days) {
    html += `<div class="day-block"><div class="day-date">📅 ${escapeHTML(day.date)}</div><div class="day-matches">`;
    for (const m of day.matches) {
      if (round.knockout) {
        html += `<div class="match-card knockout">
          <div class="match-code">${escapeHTML(m.code)}</div>
          <div class="match-desc">${escapeHTML(m.desc)}</div>
          <div class="match-city">📍 ${escapeHTML(m.city)}</div>
        </div>`;
      } else {
        html += `<div class="match-card">
          <div class="match-group">Grupo ${escapeHTML(m.group)}</div>
          <div class="sim-teams">
            <div class="sim-team">
              <span class="flag">${FLAGS[m.teams[0]]||'🏳️'}</span>
              <input type="number" min="0" class="sim-input" data-team="${escapeHTML(m.teams[0])}" data-group="${escapeHTML(m.group)}">
            </div>
            <span class="vs">×</span>
            <div class="sim-team">
              <input type="number" min="0" class="sim-input" data-team="${escapeHTML(m.teams[1])}" data-group="${escapeHTML(m.group)}">
              <span class="flag">${FLAGS[m.teams[1]]||'🏳️'}</span>
            </div>
          </div>
          <div class="match-meta">
            <span class="match-time">⏰ ${escapeHTML(m.time)} (BRT)</span>
            <span class="match-city">📍 ${escapeHTML(m.city)}</span>
          </div>
        </div>`;
      }
    }
    html += '</div></div>';
  }
  return html;
}

function renderMatches() {
  const tabsEl = document.getElementById('round-tabs');
  const cont = document.getElementById('matches-container');
  if (!tabsEl || !cont) return;
  tabsEl.innerHTML = ROUNDS.map((r,i) =>
    `<button class="round-tab ${i===0?'active':''}" data-round="${escapeHTML(r.id)}">${escapeHTML(r.label)}</button>`
  ).join('');
  cont.innerHTML = renderRound(ROUNDS[0]);

  tabsEl.querySelectorAll('.round-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.round-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const round = ROUNDS.find(r => r.id === btn.dataset.round);
      cont.innerHTML = renderRound(round);
    });
  });
}

renderGroups();
renderMatches();

// ===================================================
//              CONTAGEM REGRESSIVA
// ===================================================
function initCountdown() {
  const targetDate = new Date('2026-06-11T00:00:00').getTime();
  
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  const container = document.getElementById('countdown-container');

  if (!daysEl) return;

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      container.innerHTML = '<div class="cd-title" style="color: #4DD088;">A Copa do Mundo 2026 Começou! 🎉</div>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = hours.toString().padStart(2, '0');
    minsEl.innerText = minutes.toString().padStart(2, '0');
    secsEl.innerText = seconds.toString().padStart(2, '0');
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

initCountdown();

// ===================================================
//             SIMULADOR DE CLASSIFICAÇÃO
// ===================================================

function initGroupSelectors() {
  const container = document.getElementById('group-selectors');
  if (!container) return;
  
  const groups = Object.keys(GROUPS);
  container.innerHTML = groups.map(g => 
    `<button class="group-btn ${g === 'A' ? 'active' : ''}" data-group="${escapeHTML(g)}">Grupo ${escapeHTML(g)}</button>`
  ).join('');

  container.querySelectorAll('.group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      renderStandings(btn.dataset.group);
    });
  });
}

function renderStandings(groupLetter) {
  const tbody = document.getElementById('standings-body');
  const title = document.getElementById('standings-title');
  if (!tbody || !title || !GROUPS[groupLetter]) return;

  title.innerText = `Classificação - Grupo ${groupLetter}`;

  document.querySelectorAll('.group-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.group === groupLetter);
  });

  let stats = {};
  GROUPS[groupLetter].forEach(t => {
    stats[t[0]] = { name: t[0], pts: 0, pj: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };
  });

  const inputs = document.querySelectorAll(`.sim-input[data-group="${groupLetter}"]`);
  
  for (let i = 0; i < inputs.length; i += 2) {
    const in1 = inputs[i], in2 = inputs[i+1];
    if (in1 && in2 && in1.value !== '' && in2.value !== '') {
      const t1 = in1.dataset.team, g1 = parseInt(in1.value);
      const t2 = in2.dataset.team, g2 = parseInt(in2.value);

      stats[t1].pj++; stats[t2].pj++;
      stats[t1].gp += g1; stats[t1].gc += g2;
      stats[t2].gp += g2; stats[t2].gc += g1;
      stats[t1].sg = stats[t1].gp - stats[t1].gc;
      stats[t2].sg = stats[t2].gp - stats[t2].gc;

      if (g1 > g2) { stats[t1].pts += 3; stats[t1].v++; stats[t2].d++; }
      else if (g1 < g2) { stats[t2].pts += 3; stats[t2].v++; stats[t1].d++; }
      else { stats[t1].pts += 1; stats[t2].pts += 1; stats[t1].e++; stats[t2].e++; }
    }
  }

  const sorted = Object.values(stats).sort((a,b) => {
    if(b.pts !== a.pts) return b.pts - a.pts;
    if(b.sg !== a.sg) return b.sg - a.sg;
    return b.gp - a.gp;
  });

  tbody.innerHTML = sorted.map((s, i) => `
    <tr style="${i < 2 ? 'border-left: 3px solid var(--verde); background: rgba(0,168,89,0.05);' : ''}">
      <td>${i+1}º <span class="flag" style="margin-left: 8px;">${FLAGS[s.name]}</span></td>
      <td style="font-weight:bold; color:var(--amarelo);">${s.pts}</td>
      <td>${s.pj}</td><td>${s.v}</td><td>${s.e}</td><td>${s.d}</td><td>${s.sg}</td>
    </tr>
  `).join('');
}

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('sim-input')) {
    renderStandings(e.target.dataset.group);
  }
});

initGroupSelectors();
renderStandings('A');

// ===================================================
//             FILTROS DE JOGOS
// ===================================================

function initFilters() {
  const teamSelect = document.getElementById('filter-team');
  const citySelect = document.getElementById('filter-city');
  const clearBtn = document.getElementById('clear-filters');
  if (!teamSelect || !citySelect) return;

  const teams = Object.keys(FLAGS).sort();
  teamSelect.innerHTML += teams.map(t => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join('');

  const cities = new Set();
  ROUNDS.forEach(r => {
    r.days.forEach(d => d.matches.forEach(m => cities.add(m.city)));
  });
  citySelect.innerHTML += Array.from(cities).sort().map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');

  const applyFilters = () => {
    const team = teamSelect.value;
    const city = citySelect.value;
    const tabsEl = document.getElementById('round-tabs');
    const cont = document.getElementById('matches-container');

    if (!team && !city) {
      tabsEl.style.display = 'flex';
      const activeTab = tabsEl.querySelector('.round-tab.active');
      if (activeTab) {
        const round = ROUNDS.find(r => r.id === activeTab.dataset.round);
        cont.innerHTML = renderRound(round);
      }
      return;
    }

    tabsEl.style.display = 'none';
    let matchCount = 0;
    let html = `<div class="round-header"><h3>Resultados do Filtro</h3><p>Jogos encontrados para sua pesquisa</p></div><div class="day-matches">`;

    ROUNDS.forEach(round => {
      round.days.forEach(day => {
        day.matches.forEach(m => {
          
          let matchTeam = true;
          if (team) {
             matchTeam = m.teams ? m.teams.includes(team) : false;
          }
          
          let matchCity = true;
          if (city) matchCity = m.city === city;

          if (matchTeam && matchCity) {
            matchCount++;
            const shortDate = escapeHTML(day.date.split(',').slice(0, 2).join(','));
            
            if (round.knockout) {
              html += `<div class="match-card knockout">
                <div class="match-group" style="color:var(--amarelo)">${escapeHTML(round.label)}</div>
                <div class="match-code">${escapeHTML(m.code)}</div>
                <div class="match-desc">${escapeHTML(m.desc)}</div>
                <div class="match-city" style="margin-top: 8px;">📅 ${shortDate} • 📍 ${escapeHTML(m.city)}</div>
              </div>`;
            } else {
              html += `<div class="match-card">
                <div class="match-group">${escapeHTML(round.label)} • Grupo ${escapeHTML(m.group)}</div>
                <div class="sim-teams">
                  <div class="sim-team">
                    <span class="flag">${FLAGS[m.teams[0]]||'🏳️'}</span>
                    <input type="number" min="0" class="sim-input" data-team="${escapeHTML(m.teams[0])}" data-group="${escapeHTML(m.group)}">
                  </div>
                  <span class="vs">×</span>
                  <div class="sim-team">
                    <input type="number" min="0" class="sim-input" data-team="${escapeHTML(m.teams[1])}" data-group="${escapeHTML(m.group)}">
                    <span class="flag">${FLAGS[m.teams[1]]||'🏳️'}</span>
                  </div>
                </div>
                <div class="match-meta">
                  <span class="match-time">📅 ${shortDate} • ⏰ ${escapeHTML(m.time)}</span>
                  <span class="match-city">📍 ${escapeHTML(m.city)}</span>
                </div>
              </div>`;
            }
          }
        });
      });
    });

    html += `</div>`;

    if (matchCount === 0) {
      cont.innerHTML = `<div class="highlight-box">Nenhum jogo encontrado com os filtros selecionados.</div>`;
    } else {
      cont.innerHTML = html;
    }
  };

  teamSelect.addEventListener('change', applyFilters);
  citySelect.addEventListener('change', applyFilters);
  
  clearBtn.addEventListener('click', () => {
    teamSelect.value = '';
    citySelect.value = '';
    applyFilters();
  });
}

initFilters();