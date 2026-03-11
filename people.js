
function toggleNav() {
  document.getElementById('navbar-links')?.classList.toggle('open');
}

const peopleData = [
  {
    id: 1, name: 'Janhavi Kendhale', age: 21, gender: 'Female',
    occ: 'Student', budget: 4000, image: 'https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=800', isNew: true,
    bio: 'Spontaneous. Can keep to myself but always down for some fun. Looking for a clean, friendly space.',
    loc: 'Navi Mumbai, Thane, Maharashtra',
    traits: ['Cafe Culture', 'Literature', 'Silence Protocol'],
    myTraits: ['Cafe Culture', 'Literature', 'Focus']
  },
  {
    id: 2, name: 'Akshay Viraj Deshmukh', age: 26, gender: 'Male',
    occ: 'Working with MNC', budget: 6000, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800', isNew: true,
    bio: "Friendly, responsible, and easygoing. We keep shared spaces clean, pay bills on time, and make sure everyone feels comfortable.",
    loc: 'Navi Mumbai, Mumbai Suburban, Maharashtra',
    traits: ['Cleanliness', 'Fiscale', 'Collaboration'],
    myTraits: ['Cleanliness', 'Fiscale', 'Music']
  },
  {
    id: 3, name: 'Najma Khan', age: 21, gender: 'Female',
    occ: 'BPO', budget: 5000, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800', isNew: true,
    bio: 'I am a 21 years old girl and I want to shift because I need some private space. Neat and quiet.',
    loc: 'Andheri West, Mumbai',
    traits: ['Quietude', 'Cleanliness', 'Nocturnal'],
    myTraits: ['Quietude', 'Cleanliness', 'Caffeine']
  },
  {
    id: 4, name: 'Rohan Mehta', age: 28, gender: 'Male',
    occ: 'Software Developer', budget: 15000, image: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=800', isNew: false,
    bio: 'Full-time remote worker. Love cooking on weekends. Looking for a calm, professional flatmate in Pune or Bengaluru.',
    loc: 'Koramangala Bengaluru, Aundh Pune',
    traits: ['Remote Work', 'Hygiene', 'Early Bird'],
    myTraits: ['Remote Work', 'Hygiene', 'Non-Smoker']
  },
  {
    id: 5, name: 'Priya Nair', age: 24, gender: 'Female',
    occ: 'Marketing Executive', budget: 12000, image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800', isNew: false,
    bio: 'Fun-loving but responsible. Work 9–6, come home and unwind with music or a book. Keep shared spaces clean.',
    loc: 'Bandra West, Juhu Mumbai',
    traits: ['Acoustics', 'Hygiene', 'Non-Smoker'],
    myTraits: ['Acoustics', 'Hygiene', 'Cafe Culture']
  },
  {
    id: 6, name: 'Kartik Sharma', age: 23, gender: 'Male',
    occ: 'CA Student', budget: 8000, image: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=800', isNew: true,
    bio: 'Preparing for CA finals. Need a quiet, focused environment. Neat, vegetarian, non-smoker.',
    loc: 'Hauz Khas, Lajpat Nagar Delhi',
    traits: ['Scholar', 'Plant-Based', 'Non-Smoker'],
    myTraits: ['Scholar', 'Plant-Based', 'Acoustics']
  }
];

let cardIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

function buildStack() {
  const stack = document.getElementById('card-stack');
  const counter = document.getElementById('cards-left');
  const remaining = peopleData.slice(cardIndex);

  if (counter) counter.textContent = remaining.length;

  if (!stack) return;

  if (remaining.length === 0) {
    stack.innerHTML = `
      <div class="empty-stack">
        <span class="es-icon">🎉</span>
        <h3>You've seen everyone!</h3>
        <p style="margin-top:6px;font-size:.88rem">Check back later or browse listings.</p>
        <button class="btn btn--primary" style="margin-top:18px" onclick="cardIndex=0;buildStack()">↩ Start Over</button>
      </div>`;
    return;
  }

  stack.innerHTML = remaining.slice(0, 3).map((p, i) => `
    <div class="swipe-card ${i === 0 ? 'is-top' : ''}"
         id="scard-${p.id}"
         data-id="${p.id}">

      <div class="scard-top" style="background-image: url('${p.image}')">
        ${p.isNew ? '<span class="scard-new">NEW</span>' : ''}
      </div>

      <div class="scard-body">
        <div class="scard-name">${p.name}</div>
        <div class="scard-meta">${p.age} · ${p.gender} · ${p.occ}</div>
        <div class="scard-budget">💰 ₹${p.budget.toLocaleString('en-IN')}/mo</div>
        <p class="scard-bio">${p.bio}</p>
        <div class="scard-loc">📍 ${p.loc}</div>
        <div class="scard-traits">
          ${p.traits.map(t => `<span class="scard-trait">${t}</span>`).join('')}
        </div>
      </div>

    </div>`).join('');

  const top = stack.querySelector('.is-top');
  if (top) attachDrag(top);
}

function attachDrag(card) {

  card.addEventListener('mousedown', e => onDragStart(e.clientX, card));
  document.addEventListener('mousemove', e => onDragMove(e.clientX, card));
  document.addEventListener('mouseup', () => onDragEnd(card));

  card.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX, card), { passive: true });
  document.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX, card), { passive: true });
  document.addEventListener('touchend', () => onDragEnd(card));
}

function onDragStart(x, card) {
  isDragging = true;
  startX = currentX = x;
  card.classList.add('dragging');
}

function onDragMove(x, card) {
  if (!isDragging) return;
  currentX = x;
  const dx = currentX - startX;
  const rot = dx * 0.08;
  card.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;

  if (dx > 100) { /* Potential future state for threshold */ }
}

function onDragEnd(card) {
  if (!isDragging) return;
  isDragging = false;
  card.classList.remove('dragging');
  const dx = currentX - startX;
  if (dx > 110) flyOut(card, 'right');
  else if (dx < -110) flyOut(card, 'left');
  else {

    card.style.transition = 'transform .4s cubic-bezier(.34,1.3,.64,1)';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 400);
  }
}

function swipeCard(dir) {
  const stack = document.getElementById('card-stack');
  const top = stack?.querySelector('.is-top');
  if (!top) return;
  if (dir === 'info') { showToast('Message sent! 💬'); return; }
  flyOut(top, dir);
}

function flyOut(card, dir) {
  const personId = parseInt(card.dataset.id, 10);
  card.style.transition = 'transform .45s cubic-bezier(.36,.07,.19,.97), opacity .45s ease';

  if (dir === 'right') {
    card.style.transform = 'translateX(120vw) rotate(25deg)';
    showToast('Liked! Running compatibility check… 🤝');

    setTimeout(() => openCompatModal(personId), 220);
  } else {
    card.style.transform = 'translateX(-120vw) rotate(-25deg)';
    showToast('Passed 👋');
  }

  card.style.opacity = '0';
  cardIndex++;
  setTimeout(buildStack, 460);
}

let activePerson = null;
let isMerged = false;

function openCompatModal(personId) {
  const person = peopleData.find(p => p.id === personId);
  if (!person) return;

  activePerson = person;
  isMerged = false;

  document.getElementById('modal-title').textContent =
    `Checking with ${person.name.split(' ')[0]}`;

  const ur = document.getElementById('user-room');
  ur.innerHTML = '<span class="compat-room__label">Your Space</span>';
  person.myTraits.forEach(emoji => {
    const t = document.createElement('div');
    t.className = 'compat-trait';
    t.textContent = emoji;
    ur.appendChild(t);
  });

  const mr = document.getElementById('match-room');
  mr.innerHTML = `<span class="compat-room__label">${person.name.split(' ')[0]}'s Space</span>`;
  person.traits.forEach(emoji => {
    const t = document.createElement('div');
    t.className = 'compat-trait';
    t.textContent = emoji;
    mr.appendChild(t);
  });

  document.getElementById('compat-stage').classList.remove('merged');
  document.querySelectorAll('.compat-trait').forEach(t => t.classList.remove('match', 'clash'));
  document.getElementById('compat-score-wrap').innerHTML = '';

  const btn = document.getElementById('compat-check-btn');
  btn.querySelector('span').textContent = 'Check Compatibility';
  btn.disabled = false;

  document.getElementById('compat-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCompatModal() {
  document.getElementById('compat-modal').classList.remove('open');
  document.body.style.overflow = '';
  activePerson = null;
  isMerged = false;
}

function triggerCompatCheck() {
  if (isMerged || !activePerson) return;
  isMerged = true;

  const btn = document.getElementById('compat-check-btn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Analysing…';

  document.getElementById('compat-stage').classList.add('merged');

  const userTiles = [...document.getElementById('user-room').querySelectorAll('.compat-trait')];
  const matchTiles = [...document.getElementById('match-room').querySelectorAll('.compat-trait')];
  let matchCount = 0;
  const total = Math.min(userTiles.length, matchTiles.length);

  userTiles.forEach((tile, i) => {
    if (i >= matchTiles.length) return;
    const ok = tile.textContent.trim() === matchTiles[i].textContent.trim();
    tile.classList.add(ok ? 'match' : 'clash');
    matchTiles[i].classList.add(ok ? 'match' : 'clash');
    if (ok) matchCount++;
  });

  const score = Math.round(60 + (matchCount / total) * 38);
  const colour = '#1A1A1A';
  const label = score >= 85 ? 'Systemic Alignment'
    : score >= 75 ? 'Functional Match'
      : score >= 65 ? 'Partial Overlap'
        : 'Low Compatibility';

  setTimeout(() => {
    document.getElementById('compat-score-wrap').innerHTML = `
      <div class="score-circle"
           style="background:var(--primary);
                  border: 1px solid var(--border);">
        ${score}%
      </div>
      <div class="score-label">${label} — ${activePerson.name.split(' ')[0]}</div>`;

    btn.querySelector('span').textContent = 'Recalibrate';
    btn.disabled = false;
  }, 950);
}

function resetMerge() {
  isMerged = false;
  document.getElementById('compat-stage').classList.remove('merged');
  document.querySelectorAll('.compat-trait').forEach(t => t.classList.remove('match', 'clash'));
  document.getElementById('compat-score-wrap').innerHTML = '';
  const btn = document.getElementById('compat-check-btn');
  if (btn) { btn.querySelector('span').textContent = 'Check Compatibility'; btn.disabled = false; }
}

document.addEventListener('click', e => {
  if (e.target.id === 'compat-modal') closeCompatModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCompatModal();
});

let obStep = 1;

const obSteps = [
  {
    icon: 'R',
    title: 'Welcome to RooMate.',
    sub: "Urban residential discovery platform. Methodology:",
    body() {
      return `
        <div class="ob-feature"><div><div class="ob-feature__label">Assessment</div><div class="ob-feature__sub">Systematic evaluation of potential resident profiles</div></div></div>
        <div class="ob-feature"><div><div class="ob-feature__label">Compatibility Engine</div><div class="ob-feature__sub">Data-driven analysis of habit alignment</div></div></div>
        <div class="ob-feature"><div><div class="ob-feature__label">Direct Channel</div><div class="ob-feature__sub">Established communication with approved matches</div></div></div>`;
    }
  },
  {
    icon: 'L',
    title: 'Spatial Parameters',
    sub: 'Define geographic focus and fiscal constraints:',
    body() {
      return `
        <div class="ob-chips">
          <span class="ob-chip sel" onclick="this.classList.toggle('sel')">Mumbai</span>
          <span class="ob-chip"    onclick="this.classList.toggle('sel')">Bengaluru</span>
          <span class="ob-chip"    onclick="this.classList.toggle('sel')">Delhi</span>
          <span class="ob-chip"    onclick="this.classList.toggle('sel')">Hyderabad</span>
          <span class="ob-chip"    onclick="this.classList.toggle('sel')">Pune</span>
          <span class="ob-chip"    onclick="this.classList.toggle('sel')">Chennai</span>
        </div>
        <label class="ob-range-label">Fiscal Limit (INR / mo)</label>
        <input type="range" min="3000" max="30000" step="1000" value="12000"
               oninput="document.getElementById('ob-budget-val').textContent='₹'+parseInt(this.value).toLocaleString('en-IN')"/>
        <div class="ob-range-val" id="ob-budget-val">₹12,000</div>`;
    }
  },
  {
    icon: 'A',
    title: 'Analysis Required',
    sub: 'Complete the lifestyle assessment to activate the matching algorithm.',
    body() {
      return `
        <div class="ob-quiz-block">
          <h3>Compatibility Assessment</h3>
          <p>Evaluation of 7 core residential variables</p>
        </div>
        <div class="ob-checklist">
          <div class="ob-check">Profile structured</div>
          <div class="ob-check">Parameters defined</div>
          <div class="ob-check highlight">Assessment pending</div>
        </div>`;
    }
  }
];

function renderObStep() {
  const step = obSteps[obStep - 1];
  document.getElementById('ob-body').innerHTML = `
    <span class="ob-icon">${step.icon}</span>
    <h2 class="ob-title">${step.title}</h2>
    <p class="ob-subtitle">${step.sub}</p>
    ${step.body()}`;

  document.getElementById('ob-count').textContent = `Step ${obStep} of 3`;

  const nextBtn = document.getElementById('ob-next-btn');
  nextBtn.textContent = obStep === 3 ? 'Start Swiping 🚀' : 'Next →';

  [1, 2, 3].forEach(i => {
    const dot = document.getElementById(`ob-dot-${i}`);
    if (dot) {
      dot.className = 'ob-step-dot' +
        (i < obStep ? ' done' : i === obStep ? ' active' : '');
    }
  });
}

function obNext() {
  if (obStep < 3) { obStep++; renderObStep(); }
  else closeOnboard();
}

function closeOnboard() {
  const overlay = document.getElementById('onboard-overlay');
  if (!overlay) return;
  overlay.style.transition = 'opacity .3s ease';
  overlay.style.opacity = '0';
  setTimeout(() => overlay.classList.add('hidden'), 320);
}


let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-panel').classList.toggle('open', chatOpen);

  const fab = document.getElementById('chat-fab');
  const unread = document.getElementById('chat-unread');

  if (chatOpen) {
    fab.textContent = '✕';
    if (unread) unread.style.display = 'none';
  } else {
    fab.innerHTML = '💬<span class="unread" id="chat-unread">3</span>';
  }
}

function sendMsg() {
  const input = document.getElementById('cp-input');
  const msgs = document.getElementById('cp-msgs');
  const txt = input.value.trim();
  if (!txt) return;

  const div = document.createElement('div');
  div.className = 'cp-msg me';
  div.textContent = txt;
  msgs.appendChild(div);
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  const replies = [
    "That sounds perfect! 😊",
    "I'm looking at Bandra too 🏠",
    "Let's set up a call this week?",
    "Great, I'm flexible on dates!",
    "What floor do you prefer?",
    "I'm vegetarian too, perfect! 🌿"
  ];
  setTimeout(() => {
    const r = document.createElement('div');
    r.className = 'cp-msg them';
    r.textContent = replies[Math.floor(Math.random() * replies.length)];
    msgs.appendChild(r);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendMsg();
}

function showToast(message) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', () => {

  buildStack();

  renderObStep();

  document.getElementById('cp-input')
    ?.addEventListener('keydown', handleChatKey);
});
