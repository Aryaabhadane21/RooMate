
function toggleNav() {
  document.getElementById('navbar-links')?.classList.toggle('open');
}

const quizQuestions = [
  {
    id: 1, type: 'single', question: 'Circadian Rhythm / Sleep Cycle',
    options: [{ emoji: '', label: 'Diurnal', sub: 'Sunrise activation, early rest', trait: 'early_bird' }, { emoji: '', label: 'Nocturnal', sub: 'Late night productivity', trait: 'night_owl' }, { emoji: '', label: 'Variable', sub: 'Fluid schedule', trait: 'flexible' }, { emoji: '', label: 'Adaptive', sub: 'Driven by professional demands', trait: 'adaptive' }]
  },
  {
    id: 2, type: 'single', question: 'Social Frequency & Engagement',
    options: [{ emoji: '', label: 'Collective', sub: 'Regular social interaction', trait: 'social' }, { emoji: '', label: 'Private', sub: 'Minimal domestic visitors', trait: 'private' }, { emoji: '', label: 'Regulated', sub: 'Scheduled guest policy', trait: 'planned' }, { emoji: '', label: 'Occasional', sub: 'Moderate engagement', trait: 'moderate' }]
  },
  {
    id: 3, type: 'single', question: 'Domestic Standards: Hygiene',
    options: [{ emoji: '', label: 'Meticulous', sub: 'Daily maintenance protocols', trait: 'neat' }, { emoji: '', label: 'Systematic', sub: 'Weekly structured cleaning', trait: 'tidy' }, { emoji: '', label: 'Functional', sub: 'Maintained as required', trait: 'relax' }, { emoji: '', label: 'Organic', sub: 'Relaxed spatial order', trait: 'messy' }]
  },
  {
    id: 4, type: 'single', question: 'Workplace Environment',
    options: [{ emoji: '', label: 'Remote', sub: 'Primary focus at residence', trait: 'wfh' }, { emoji: '', label: 'On-site', sub: 'Office-based activity', trait: 'office' }, { emoji: '', label: 'Hybrid', sub: 'Bimodal engagement', trait: 'hybrid' }, { emoji: '', label: 'Academic', sub: 'Study-focused residence', trait: 'student' }]
  },
  {
    id: 5, type: 'single', question: 'Domestic Animals',
    options: [{ emoji: '', label: 'Inclusive', sub: 'Pet residence preferred', trait: 'pet_yes' }, { emoji: '', label: 'Exclusive', sub: 'Animal-free environment', trait: 'no_pets' }, { emoji: '', label: 'Feline Specific', sub: 'Cats permitted', trait: 'cats' }, { emoji: '', label: 'Indifferent', sub: 'Neutral stance', trait: 'neutral' }]
  },
  {
    id: 6, type: 'single', question: 'Fiscal Coordination: Expenses',
    options: [{ emoji: '', label: 'Analytical', sub: 'Digital tracking and audit', trait: 'tracker' }, { emoji: '', label: 'Equalitarian', sub: 'Strict proportional split', trait: 'even' }, { emoji: '', label: 'Communicative', sub: 'Periodic fiscal reviews', trait: 'comm' }, { emoji: '', label: 'Informal', sub: 'Unstructured settlement', trait: 'casual' }]
  },
  { id: 7, type: 'budget', question: 'Fiscal Parameter: Monthly Budget (INR)', min: 3000, max: 50000, step: 500, defaultVal: 12000 }
];

const traitLabels = {
  early_bird: 'Diurnal', night_owl: 'Nocturnal', flexible: 'Variable', adaptive: 'Adaptive',
  social: 'Collective', private: 'Private', planned: 'Regulated', moderate: 'Moderate',
  neat: 'Meticulous', tidy: 'Systematic', relax: 'Functional', messy: 'Organic',
  wfh: 'Remote 100%', office: 'On-site 100%', hybrid: 'Hybrid', student: 'Academic',
  pet_yes: 'Pet Inclusive', no_pets: 'Pet Exclusive', cats: 'Feline-Friendly', neutral: 'Pet-Neutral',
  tracker: 'Fiscal Tracker', even: 'Proportional Split', comm: 'Communicative', casual: 'Informal'
};

let currentStep = 0, answers = {}, budgetValue = 12000;

function renderQuestion() {
  const q = quizQuestions[currentStep];
  const total = quizQuestions.length;
  const pct = Math.round((currentStep / total) * 100);

  const fillNode = document.getElementById('progress-fill');
  const textNode = document.getElementById('progress-text');
  const pctNode = document.getElementById('progress-pct');

  if (fillNode) fillNode.style.width = pct + '%';
  if (textNode) textNode.textContent = `Parameter ${currentStep + 1} of ${total}`;
  if (pctNode) pctNode.textContent = pct + '% Complete';

  let inner = `<p class="quiz-card__step">Phase 0${currentStep + 1}</p><h2 class="quiz-card__question">${q.question}</h2>`;

  if (q.type === 'single') {
    inner += '<div class="quiz-options">';
    q.options.forEach((opt, idx) => {
      inner += `<div class="quiz-option ${answers[q.id] === idx ? 'selected' : ''}"
        onclick="selectOption(${q.id},${idx},this)">
        <div class="selection-marker"></div>
        <div><div class="quiz-option__label">${opt.label}</div>
             <div class="quiz-option__sub">${opt.sub}</div></div>
      </div>`;
    });
    inner += '</div>';
  } else {
    inner += `<div class="budget-wrap">
      <input type="range" id="budget-slider"
             min="${q.min}" max="${q.max}" step="${q.step}" value="${budgetValue}"
             oninput="updateBudget(this.value)"/>
      <div class="budget-display" id="budget-display">₹${budgetValue.toLocaleString('en-IN')} / mo</div>
    </div>`;
  }

  const container = document.getElementById('quiz-container');
  if (container) container.innerHTML = `<div class="quiz-card">${inner}</div>`;

  const pb = document.getElementById('btn-prev');
  if (pb) pb.style.display = currentStep === 0 ? 'none' : 'inline-flex';

  const nb = document.getElementById('btn-next');
  if (nb) {
    if (currentStep === total - 1) {
      nb.textContent = 'Generate Profile';
      nb.className = 'btn btn--primary';
    } else {
      nb.textContent = 'Proceed';
      nb.className = 'btn btn--primary';
    }
  }
}

function selectOption(qid, idx, el) {
  el.parentElement.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  answers[qid] = idx;
}

function updateBudget(val) {
  budgetValue = parseInt(val, 10);
  const d = document.getElementById('budget-display');
  if (d) d.textContent = `₹${budgetValue.toLocaleString('en-IN')} / mo`;
  answers[7] = budgetValue;
}

function prevQuestion() { if (currentStep > 0) { currentStep--; renderQuestion(); } }

function nextQuestion() {
  const q = quizQuestions[currentStep];
  if (q.type === 'single' && answers[q.id] === undefined) { showToast('Specific selection required.'); return; }
  if (q.type === 'budget') answers[q.id] = budgetValue;
  if (currentStep < quizQuestions.length - 1) { currentStep++; renderQuestion(); }
  else showResults();
}

function showResults() {
  const score = 65 + (Object.values(answers).reduce((a, v) => a + (typeof v === 'number' && v < 10 ? v : 0), 0) % 33);
  const traits = quizQuestions.filter(q => q.type === 'single' && answers[q.id] !== undefined)
    .map(q => traitLabels[q.options[answers[q.id]].trait]).filter(Boolean);
  const budget = answers[7] || budgetValue;
  const matches = [
    { av: 'P', name: 'Priya K.', detail: `₹${(budget - 1000).toLocaleString('en-IN')} / mo · Student`, score: 96 },
    { av: 'R', name: 'Rohit M.', detail: `₹${(budget + 500).toLocaleString('en-IN')} / mo · Remote Worker`, score: 91 },
    { av: 'S', name: 'Sneha P.', detail: `₹${(budget - 500).toLocaleString('en-IN')} / mo · Office Worker`, score: 87 }
  ];

  const fillNode = document.getElementById('progress-fill');
  const textNode = document.getElementById('progress-text');
  const pctNode = document.getElementById('progress-pct');

  if (fillNode) fillNode.style.width = '100%';
  if (textNode) textNode.textContent = 'Assessment Complete';
  if (pctNode) pctNode.textContent = '100%';

  const pb = document.getElementById('btn-prev');
  if (pb) pb.style.display = 'none';
  const nb = document.getElementById('btn-next');
  if (nb) nb.style.display = 'none';

  const container = document.getElementById('quiz-container');
  if (container) {
    container.innerHTML = `
      <div class="quiz-results">
        <h2>Resident Compatibility Profile</h2>
        <p style="color:var(--muted);margin-top:0.5rem;font-size:.9rem; line-height: 1.6;">A diagnostic analysis based on your lifestyle parameters. This score reflects your alignment with the current residential ecosystem.</p>
        
        <div class="results-score" style="margin: 3rem 0;">
          <span class="results-score__number" style="font-size: 4rem; color: var(--primary);">${score}%</span>
          <span style="display: block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.5rem;">Alignment Index</span>
        </div>

        <div class="results-traits">${traits.map(t => `<span class="results-trait">${t}</span>`).join('')}</div>
        
        <div style="border: 1px solid var(--border); padding:1.5rem; margin:2rem 0; font-size:.85rem; text-align: left;">
          <span style="font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); margin-bottom: 0.5rem; display: block;">Fiscal Parameter</span>
          Monthly Allocation: <strong style="color:var(--primary)">₹${budget.toLocaleString('en-IN')} / person</strong>
        </div>

        <h3 style="margin-bottom:1.5rem; font-size:1rem; text-transform: uppercase; letter-spacing: 1px;">High-Alignment Profiles</h3>
        <div class="match-list">
          ${matches.map(m => `
            <div class="match-item" style="border: 1px solid var(--border); margin-bottom: 0.5rem; padding: 1rem;">
              <div class="match-item__avatar" style="background: var(--primary); color: white; border-radius: 0;">${m.av}</div>
              <div class="match-item__info">
                <div class="match-item__name">${m.name}</div>
                <div class="match-item__detail">${m.detail}</div>
              </div>
              <div class="match-item__score">${m.score}%</div>
            </div>`).join('')}
        </div>

        <div style="display:flex; flex-direction: column; gap:0.5rem; margin-top:3rem;">
          <a href="listings.html" class="btn btn--primary">View Residences</a>
          <a href="people.html"   class="btn btn--outline">View Resident Network</a>
          <button class="btn btn--outline btn--sm" style="margin-top: 1rem; border: none; text-decoration: underline;" onclick="restartQuiz()">Recalibrate Assessment</button>
        </div>
      </div>`;
  }
}

function restartQuiz() {
  currentStep = 0; answers = {}; budgetValue = 12000;
  const nb = document.getElementById('btn-next');
  if (nb) { nb.style.display = 'inline-flex'; nb.textContent = 'Proceed'; nb.className = 'btn btn--primary'; }
  renderQuestion();
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', renderQuestion);
