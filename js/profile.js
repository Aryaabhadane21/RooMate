const BASE_UTILITIES = { electricity: 1800, internet: 800, water: 400, gas: 600 };

function updateUtilitySplit() {
  const n = parseInt(document.getElementById('num-roommates')?.value || '2', 10);
  const utilEls = {
    'util-electricity': BASE_UTILITIES.electricity,
    'util-internet': BASE_UTILITIES.internet
  };

  for (const [id, base] of Object.entries(utilEls)) {
    const el = document.getElementById(id);
    if (el) el.textContent = '₹' + Math.round(base / n).toLocaleString('en-IN');
  }

  const total = Object.values(BASE_UTILITIES).reduce((a, b) => a + b, 0);
  const totalEl = document.getElementById('util-total');
  if (totalEl) totalEl.textContent = '₹' + Math.round(total / n).toLocaleString('en-IN');
}

function toggleTag(el) {
  el.classList.toggle('active');
  const isActive = el.classList.contains('active');
  if (isActive) el.setAttribute('data-on', '1');
  else el.removeAttribute('data-on');
}

function saveProfile() {
  const btn = document.getElementById('save-btn');
  if (btn) {
    btn.textContent = 'Synchronizing...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Changes Committed';
      showToast('Profile parameters successfully updated.');
      setTimeout(() => {
        btn.textContent = 'Save Profile';
        btn.disabled = false;
      }, 2000);
    }, 800);
  }
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

document.addEventListener('DOMContentLoaded', () => {
  updateUtilitySplit();
  document.getElementById('save-btn')?.addEventListener('click', saveProfile);
  document.getElementById('num-roommates')?.addEventListener('change', updateUtilitySplit);
});
