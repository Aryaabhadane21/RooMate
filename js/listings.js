
function toggleNav() {
  const nav = document.getElementById('navbar-links');
  if (nav) nav.classList.toggle('open');
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2400;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(ease * target).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString('en-IN');
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const section = document.getElementById('stats-section');
  if (!section) return;
  let fired = false;

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !fired) {
        fired = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
      }
    });
  }, { threshold: 0.35 }).observe(section);
}

const listingsData = [
  {
    id: 1, title: 'Spacious 3BHK in Bandra West', location: 'Bandra West, Mumbai',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1024',
    avail: 'Available Now',
    perPerson: 18000, total: 54000, deposit: 36000, rooms: 3, baths: 2, safety: 91,
    tags: [{ i: '', l: 'No Smoking' }, { i: '', l: 'WFH Friendly' }, { i: '', l: 'Plant Lovers' }],
    rules: ['No Parties', 'Quiet 10 PM', 'Shared Chores'], util: '~₹800/person'
  },
  {
    id: 2, title: 'Cozy 2BHK near Koramangala', location: 'Koramangala, Bengaluru',
    image: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1024',
    avail: 'From Aug 1',
    perPerson: 12000, total: 24000, deposit: 24000, rooms: 2, baths: 1, safety: 78,
    tags: [{ i: '', l: 'Cat OK' }, { i: '', l: 'Creative' }, { i: '', l: 'Quiet Hours' }],
    rules: ['No Dogs', 'No Overnight Guests', 'Clean Kitchen'], util: 'Electricity included'
  },
  {
    id: 3, title: 'Modern 4BHK Villa – Hauz Khas', location: 'Hauz Khas, New Delhi',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1024',
    avail: 'Available Now',
    perPerson: 16000, total: 64000, deposit: 64000, rooms: 4, baths: 3, safety: 85,
    tags: [{ i: '', l: 'Mindful' }, { i: '', l: 'Vegan' }, { i: '', l: 'Cyclist' }],
    rules: ['No Smoking', 'Veg Kitchen', 'Shared Groceries'], util: '~₹600/person'
  },
  {
    id: 4, title: 'Luxury 2BHK with Terrace View', location: 'Jubilee Hills, Hyderabad',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1024',
    avail: 'From Sept 15',
    perPerson: 22000, total: 44000, deposit: 44000, rooms: 2, baths: 2, safety: 95,
    tags: [{ i: '', l: 'Music Lover' }, { i: '', l: 'Socialiser' }, { i: '', l: 'Pet Friendly' }],
    rules: ['Respectful Guests', 'No Loud Music 11PM+'], util: '~₹1,200/person'
  },
  {
    id: 5, title: 'Student-Friendly 3BHK Flat', location: 'Aundh, Pune',
    image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1024',
    avail: 'Available Now',
    perPerson: 8500, total: 25500, deposit: 12750, rooms: 3, baths: 1, safety: 73,
    tags: [{ i: '', l: 'Student' }, { i: '', l: 'Study Hours' }, { i: '', l: 'Food Sharer' }],
    rules: ['No Smoking', 'Quiet After 11 PM', 'Cleaning Rota'], util: '~₹500/person'
  },
  {
    id: 6, title: 'Sun-filled Room near OMR', location: 'Sholinganallur, Chennai',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1024',
    avail: 'From Jul 20',
    perPerson: 10000, total: 30000, deposit: 20000, rooms: 3, baths: 2, safety: 88,
    tags: [{ i: '', l: 'Nature Lover' }, { i: '', l: 'Pet Friendly' }, { i: '', l: 'Arts Fan' }],
    rules: ['Pet-Friendly', 'Terrace Shared', 'Respectful Guests'], util: '~₹700/person'
  }
];
const savedListings = new Set();


function renderListings(data) {
  const grid = document.getElementById('listings-grid');
  const count = document.getElementById('listing-count');
  if (count) count.textContent = `${data.length} rooms found`;
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:50px 20px;color:var(--muted)">
        <div style="font-size:2.5rem;margin-bottom:10px">🔍</div>
        <h3>No listings match your filters</h3>
      </div>`;
    return;
  }

  grid.innerHTML = data.map(l => `
    <article class="listing-card">
      <div class="card-image">
        <img src="${l.image}" alt="${l.title}" class="card-img-asset">
        <span class="card-badge">${l.avail}</span>
        <button class="card-save" onclick="toggleSave(${l.id},this)" aria-label="Save listing">
          ${savedListings.has(l.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${l.title}</h3>
        <p class="card-location">📍 ${l.location} &nbsp;·&nbsp; 🛏 ${l.rooms} BHK &nbsp;·&nbsp; 🚿 ${l.baths} Bath</p>
        <div class="card-pricing">
          <div class="price-per">
            <span class="amount">₹${l.perPerson.toLocaleString('en-IN')}</span>
            <span class="label">per person / mo</span>
          </div>
          <div class="price-total">
            Total: <strong>₹${l.total.toLocaleString('en-IN')}</strong>
            <div class="price-deposit">Deposit: ₹${l.deposit.toLocaleString('en-IN')}</div>
            <div style="font-size:.7rem;margin-top:1px;color:var(--muted)">${l.util}</div>
          </div>
        </div>
        <div class="lifestyle-tags">
          ${l.tags.map(t => `<span class="lifestyle-tag">${t.i} ${t.l}</span>`).join('')}
        </div>
        <div class="house-rules">
          <div class="house-rules__title">Site Protocols</div>
          <div class="house-rules__list">
            ${l.rules.map(r => `<span class="house-rules__item">${r}</span>`).join('')}
          </div>
        </div>
        <div class="safety-score">
          <span class="safety-score__label">Network Safety</span>
          <div class="safety-bar">
            <div class="safety-bar__fill" style="width:0%" data-target="${l.safety}%"></div>
          </div>
          <span class="safety-score__value">${l.safety} / 100</span>
        </div>
      </div>
      <div class="card-footer">
        <a href="property.html?id=${l.id}" class="btn btn--primary btn--sm" style="flex:1;justify-content:center">View Property</a>
        <a href="quiz.html"    class="btn btn--outline btn--sm" style="flex:1;justify-content:center">Check Match</a>
      </div>
    </article>`).join('');

  animateSafetyBars();
}

function animateSafetyBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.width = e.target.dataset.target; obs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.safety-bar__fill').forEach(f => obs.observe(f));
}

function toggleSave(id, btn) {
  if (savedListings.has(id)) {
    savedListings.delete(id);
    btn.textContent = 'Save';
    showToast('Asset removed from saved items.');
  } else {
    savedListings.add(id);
    btn.textContent = 'Saved';
    showToast('Asset added to saved items.');
  }
}

function applyFilters() {
  const loc = (document.getElementById('filter-location')?.value || '').toLowerCase().trim();
  const budget = parseInt(document.getElementById('filter-budget')?.value || '0', 10);
  const rooms = parseInt(document.getElementById('filter-rooms')?.value || '0', 10);

  renderListings(listingsData.filter(l => {
    if (loc && !l.location.toLowerCase().includes(loc)) return false;
    if (budget && l.perPerson > budget) return false;
    if (rooms && l.rooms < rooms) return false;
    return true;
  }));
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}


document.addEventListener('DOMContentLoaded', () => {
  renderListings(listingsData);
  initCounters();

  const homeSearch = localStorage.getItem('roomate_search');
  if (homeSearch) {
    const { location, budget, rooms } = JSON.parse(homeSearch);

    const filtered = listingsData.filter(l => {
      if (location && !l.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (budget && l.perPerson > parseInt(budget)) return false;
      if (rooms && l.rooms < parseInt(rooms)) return false;
      return true;
    });

    renderListings(filtered);
    localStorage.removeItem('roomate_search');
  }

  document.getElementById('search-btn')?.addEventListener('click', applyFilters);
  document.getElementById('filter-location')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') applyFilters();
  });

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;

      if (filter === 'all') {
        renderListings(listingsData);
      } else {
        const filtered = listingsData.filter(l =>
          l.tags.some(t => t.l.includes(filter))
        );
        renderListings(filtered);
      }
    });
  });
});
