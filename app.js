/* ---- CONFIG: replace the UPI ID and names with your own ---- */
const CONFIG = {
  college: 'MITS Deemed to be University (MITS)',
  dept: 'Department of Artificial Intelligence and Machine Learning',
  fest: 'AMIX 2026',
  upiId: 'deptfest@upi',
  payee: 'AMIX 2026 Dept Fest'
};

const EVENTS = [
  {
    id: 'codestorm', name: 'CodeStorm', tag: 'Competitive coding',
    desc: 'Three hours, eight problems, one live leaderboard. Solo or in pairs.',
    date: '2026-10-10T11:30', venue: 'Lab 2', fee: 100, min: 1, max: 2,
    c: '#2B3AE7', on: '#fff',
    extra: { id: 'lang', label: 'Preferred language', type: 'select', opts: ['C++', 'Java', 'Python', 'Any'] }
  },
  {
    id: 'hackship', name: 'Hack and Ship', tag: 'Mini hackathon',
    desc: 'Build a working prototype in four hours around a theme revealed at kickoff.',
    date: '2026-10-10T09:30', venue: 'Seminar Hall', fee: 300, min: 2, max: 4,
    c: '#F2545B', on: '#fff',
    extra: { id: 'idea', label: 'Project idea (optional)', type: 'text', optional: true }
  },
  {
    id: 'quiz', name: 'Byte Me Tech Quiz', tag: 'Quiz',
    desc: 'Buzzers, rapid-fire rounds and a picture round nobody is ready for.',
    date: '2026-10-10T10:30', venue: 'Seminar Hall', fee: 50, min: 2, max: 3,
    c: '#FFC93C', on: '#10132B',
    extra: { id: 'team', label: 'Team name', type: 'text' }
  },
  {
    id: 'pixel', name: 'Pixel Clash', tag: 'Esports',
    desc: '5v5 knockout bracket on the lab PCs. Bring your own headset and mouse.',
    date: '2026-10-10T12:30', venue: 'Gaming Lab', fee: 200, min: 4, max: 5,
    c: '#0FA3B1', on: '#fff',
    extra: { id: 'ign', label: "Captain's in-game ID", type: 'text' }
  },
  {
    id: 'design', name: 'Design Sprint', tag: 'UI/UX',
    desc: 'Redesign a real campus app screen in ninety minutes, then pitch it to a jury.',
    date: '2026-10-10T15:00', venue: 'Lab 3', fee: 100, min: 1, max: 1,
    c: '#7A4DFF', on: '#fff',
    extra: { id: 'tool', label: 'Design tool you will use', type: 'select', opts: ['Figma', 'Adobe XD', 'Sketch on paper', 'Other'] }
  }
];

const DEPTS = ['Artificial Intelligence and Machine Learning', 'Computer Science', 'Information Technology', 'Electronics', 'Electrical', 'Mechanical', 'Civil', 'Other'];
const YEARS = ['1st year', '2nd year', '3rd year', '4th year'];
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let mem = [];
const store = {
  get() { try { const v = JSON.parse(localStorage.getItem('amix') || '[]'); mem = v; return v; } catch (e) { return mem; } },
  set(a) { mem = a; try { localStorage.setItem('amix', JSON.stringify(a)); } catch (e) {} }
};
const ev = id => EVENTS.find(e => e.id === id);
const fmtD = d => new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtT = d => new Date(d).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
const unit = e => e.max > 1 ? 'per team' : 'per person';
const teamTxt = e => e.max === 1 ? 'Solo' : e.min === 1 ? `Solo or teams up to ${e.max}` : `Teams of ${e.min}–${e.max}`;

function show(id) {
  document.querySelectorAll('.view').forEach(v => v.hidden = v.id !== id);
  $('#hero').hidden = id !== 'v-events';
  $('#cnt').textContent = store.get().length;
  window.scrollTo(0, 0);
  const h = $('#' + id + ' h1, #' + id + ' h2');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
}

function renderEvents() {
  $('#evList').innerHTML = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date)).map(e => {
    const d = new Date(e.date);
    return `<article class="ev" style="--c:${e.c};--on:${e.on}"><div class="stub"><b>${d.getDate()}</b><span>${d.toLocaleDateString('en-IN', { month: 'short' })}</span><span>${d.toLocaleDateString('en-IN', { weekday: 'short' })}</span></div><div class="body"><span class="tag">${e.tag}</span><h3>${e.name}</h3><p>${e.desc}</p><div class="chips"><span>${fmtT(e.date)}</span><span>${e.venue}</span><span>${teamTxt(e)}</span></div><div class="foot"><div class="price">₹${e.fee} <small>${unit(e)}</small></div><button class="btn sm" data-reg="${e.id}" aria-label="Register for ${e.name}">Register</button></div></div></article>`;
  }).join('');
}

const F = (id, label, input, hint = '') => `<div class="f"><label for="${id}">${label}</label>${input}${hint ? `<small class="hint">${hint}</small>` : ''}<p class="err" id="${id}-e" role="alert"></p></div>`;
const sel = (id, opts, ph) => `<select id="${id}" name="${id}"><option value="">${ph}</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select>`;

function openForm(id) {
  const e = ev(id);
  const size = e.max > 1 ? F('size', 'Team size', `<select id="size" name="size">${Array.from({ length: e.max - e.min + 1 }, (_, i) => `<option>${e.min + i}</option>`).join('')}</select>`) : '';
  const members = e.max > 1 ? `<div id="membersWrap" hidden>${F('members', 'Other team members', '<textarea id="members" name="members" placeholder="One name and roll number per line"></textarea>')}</div>` : '';
  const x = e.extra;
  const extra = F(x.id, x.label, x.type === 'select' ? sel(x.id, x.opts, 'Choose one') : `<input id="${x.id}" name="${x.id}" type="text">`);
  $('#formBox').innerHTML = `<button class="back" data-go="events">← All events</button><div class="summary" style="--c:${e.c}"><h2>${e.name}</h2><p>${fmtD(e.date)} at ${fmtT(e.date)}, ${e.venue}</p></div><form id="regForm" novalidate>${F('name', 'Full name', '<input id="name" name="name" autocomplete="name">')}<div class="row2">${F('email', 'Email address', '<input id="email" name="email" type="email" autocomplete="email" inputmode="email">')}${F('phone', 'Phone number', '<input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="numeric" placeholder="10-digit mobile number">')}</div>${F('roll', 'Student ID / roll number', '<input id="roll" name="roll" autocapitalize="characters">')}<div class="row2">${F('dept', 'Department', sel('dept', DEPTS, 'Choose department'))}${F('year', 'Year', sel('year', YEARS, 'Choose year'))}</div>${size}${members}${extra}<div class="total"><span>Registration fee (${unit(e)})</span><span class="price">₹${e.fee}</span></div><button class="btn block" type="submit">Continue to payment</button></form>`;
  const s = $('#size');
  if (s) s.onchange = () => $('#membersWrap').hidden = +s.value < 2;
  $('#regForm').onsubmit = ev_ => { ev_.preventDefault(); submitForm(e); };
  show('v-form');
}

const rules = {
  name: v => v.trim().length >= 3 || 'Enter your full name.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email address, like name@college.edu.',
  phone: v => /^[6-9]\d{9}$/.test(v.replace(/[\s-]|^\+?91/g, '')) || 'Enter a 10-digit Indian mobile number.',
  roll: v => v.trim().length >= 3 || 'Enter your student ID or roll number.',
  dept: v => !!v || 'Choose your department.',
  year: v => !!v || 'Choose your year.'
};

function submitForm(e) {
  const f = $('#regForm'); const d = {}; const r = { ...rules };
  d.size = f.size ? +f.size.value : 1;
  if (d.size > 1) r.members = v => v.trim().length >= 3 || 'Add the names of your other team members.';
  if (!e.extra.optional) r[e.extra.id] = v => !!v.trim() || `Fill in: ${e.extra.label.toLowerCase()}.`;
  let first = null;
  Object.keys(r).forEach(k => { const el = f.elements[k]; const v = el.value; const res = r[k](v); $('#' + k + '-e').textContent = res === true ? '' : res; el.setAttribute('aria-invalid', res !== true); if (res !== true && !first) first = el; d[k] = v.trim(); });
  if (first) { first.focus(); return; }
  d.extraLabel = e.extra.label; d.extraValue = (f.elements[e.extra.id].value || '').trim(); d.phone = d.phone.replace(/[\s-]|^\+?91/g, '');
  const reg = { ...d, id: 'AMIX-' + Math.random().toString(36).slice(2, 7).toUpperCase(), eventId: e.id, fee: e.fee, status: 'Awaiting payment', at: Date.now() };
  store.set([reg, ...store.get()]); showPay(reg);
}

function upiLink(reg) { return `upi://pay?pa=${encodeURIComponent(CONFIG.upiId)}&pn=${encodeURIComponent(CONFIG.payee)}&am=${reg.fee}&cu=INR&tn=${encodeURIComponent(reg.id + ' ' + ev(reg.eventId).name)}`; }
function drawQR(el, text, size) { el.innerHTML = ''; try { new QRCode(el, { text, width: size, height: size, colorDark: '#10132B', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M }); } catch (err) { el.textContent = text; } }

function showPay(reg) {
  const e = ev(reg.eventId); const link = upiLink(reg);
  $('#payBox').innerHTML = `<button class="back" data-edit="${e.id}">← Edit details</button><h2 tabindex="-1" style="font-size:28px">Pay for ${e.name}</h2><p style="color:var(--muted);margin:6px 0 0">Registration ${reg.id} for ${esc(reg.name)}. Scan with any UPI app.</p><div class="qrbox"><div class="amt">₹${reg.fee}</div><div class="qr" id="payQR" role="img" aria-label="UPI payment QR code for ₹${reg.fee}"></div><div style="color:var(--muted);font-size:14px">UPI ID: <b style="color:var(--ink)">${esc(CONFIG.upiId)}</b></div><a class="btn ghost sm" href="${link}">Open UPI app on this phone</a></div><ol class="steps"><li>Scan the QR or open your UPI app.</li><li>Pay exactly ₹${reg.fee}. The registration ID is filled in as the note.</li><li>Come back here and confirm.</li></ol><button class="btn block" id="paidBtn">I have paid</button>`;
  $('#paidBtn').onclick = () => { reg.status = 'Payment submitted, awaiting verification'; reg.paidAt = Date.now(); store.set(store.get().map(r => r.id === reg.id ? reg : r)); showDone(reg); };
  show('v-pay'); drawQR($('#payQR'), link, 200);
}

function showDone(reg, fresh = true) {
  const e = ev(reg.eventId);
  $('#doneBox').innerHTML = `${fresh ? `<div class="done-h"><div class="check" aria-hidden="true">✓</div><div><h1>You're registered</h1><p style="margin:4px 0 0;color:var(--muted)">A confirmation will be sent to ${esc(reg.email)} once your payment is verified.</p></div></div>` : `<div class="done-h"><h1>Your ticket</h1></div>`}<article class="ticket" style="--c:${e.c};--on:${e.on}"><div class="tk-head"><small>${e.tag}</small><h2>${e.name}</h2><div>${fmtD(e.date)} at ${fmtT(e.date)}, ${e.venue}</div></div><div class="tk-body"><dl class="kv"><dt>Name</dt><dd>${esc(reg.name)}</dd><dt>Roll no.</dt><dd>${esc(reg.roll)}</dd><dt>Class</dt><dd>${esc(reg.dept)}, ${esc(reg.year)}</dd><dt>Email</dt><dd>${esc(reg.email)}</dd><dt>Phone</dt><dd>${esc(reg.phone)}</dd>${e.max > 1 ? `<dt>Team size</dt><dd>${reg.size}</dd>` : ''}${reg.members ? `<dt>Team</dt><dd style="white-space:pre-line">${esc(reg.members)}</dd>` : ''}${reg.extraValue ? `<dt>${esc(reg.extraLabel)}</dt><dd>${esc(reg.extraValue)}</dd>` : ''}<dt>Fee</dt><dd>₹${reg.fee} (${unit(e)})</dd><dt>Status</dt><dd>${esc(reg.status)}</dd></dl></div><div class="cut"></div><div class="tk-foot"><div class="qr" id="tkQR" aria-label="Check-in QR code"></div><div><small style="color:var(--muted)">Registration ID</small><div class="tk-id">${reg.id}</div><small style="color:var(--muted)">Show this at the desk on the day.</small></div></div></article><div class="actions"><button class="btn" data-go="events">Register for another event</button><button class="btn ghost" data-go="mine">My tickets</button></div>`;
  show('v-done'); drawQR($('#tkQR'), `${reg.id}|${e.name}|${reg.roll}`, 96);
}

function showMine() {
  const list = store.get();
  $('#mineList').innerHTML = list.length ? list.map(r => { const e = ev(r.eventId); return `<div class="mine" style="--c:${e.c}"><div><b>${e.name}</b><span>${r.id}, ${esc(r.status)}</span></div><button class="btn ghost sm" data-ticket="${r.id}">View ticket</button></div>`; }).join('') : `<div class="panel" style="text-align:center"><p>You haven't registered for anything on this device yet.</p><button class="btn" data-go="events">Browse events</button></div>`;
  show('v-mine');
}

document.addEventListener('click', ev_ => {
  const t = ev_.target.closest('button'); if (!t) return;
  if (t.dataset.reg) openForm(t.dataset.reg);
  else if (t.dataset.go === 'events') show('v-events');
  else if (t.dataset.go === 'mine') showMine();
  else if (t.dataset.edit) openForm(t.dataset.edit);
  else if (t.dataset.ticket) showDone(store.get().find(r => r.id === t.dataset.ticket), false);
});

$('#home').onclick = () => show('v-events');
$('#mineBtn').onclick = showMine;
$('#fest').textContent = CONFIG.fest;
$('#college').textContent = CONFIG.dept;
$('#heroT').textContent = CONFIG.fest;
$('#foot').textContent = CONFIG.college;
renderEvents();
show('v-events');
