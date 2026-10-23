/* Girl Talk – a small, private, offline-friendly web app.
   Everything is saved only in this browser (localStorage). No accounts, no tracking. */

/* ---------- Helpers ---------- */
const app = document.getElementById('app');
const KEY = 'girltalk-v1';
const DEFAULTS = { setup:false, name:'', avatar:'🦄', stars:0, earned:{}, strengths:[], ladderDone:[], customSteps:[], feelings:[], goals:[], worries:[] };

function loadState(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } }
let S = Object.assign(JSON.parse(JSON.stringify(DEFAULTS)), loadState());
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} updateStars(); }

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const lc = t => /^I\b/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1);
const pad = n => String(n).padStart(2,'0');
const dkey = (d=new Date()) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const $ = (sel, el=app) => el.querySelector(sel);
const $$ = (sel, el=app) => [...el.querySelectorAll(sel)];
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

function view(html){ app.innerHTML = `<div class="pop">${html}</div>`; }

let timers = [];
function later(fn, ms){ const t = setTimeout(fn, ms); timers.push(t); return t; }
function stopTimers(){ timers.forEach(clearTimeout); timers = []; try { speechSynthesis.cancel(); } catch(e){} }

function updateStars(){ document.getElementById('starcount').textContent = S.stars; }
function bumpStar(){ const el = document.getElementById('starbox'); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }

let toastT;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400);
}

// Give stars once per key (use a date in the key for "once a day" rewards)
function award(key, n=1, msg='Great job!'){
  if (S.earned[key]) return false;
  S.earned[key] = true; S.stars += n; save();
  toast(`+${n} ⭐ ${msg}`); bumpStar();
  return true;
}

function confetti(){
  if (reduceMotion) return;
  const bits = ['🎉','⭐','💖','🌟','🎊','✨'];
  for (let i=0;i<24;i++){
    const s = document.createElement('span');
    s.className = 'confetti';
    s.textContent = bits[i % bits.length];
    s.style.left = Math.random()*100 + 'vw';
    s.style.animationDelay = (Math.random()*0.6) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3200);
  }
}

function speak(text){
  try {
    const u = new SpeechSynthesisUtterance(text.replace(/[“”"]/g,''));
    u.lang = 'en-GB'; u.rate = 0.95; u.pitch = 1.1;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  } catch(e){ toast('Read it out loud yourself!'); }
}

/* ---------- Top bar & routing ---------- */
let backTo = null;
function setTop(title, back, theme){
  document.getElementById('title').textContent = title || '';
  const b = document.getElementById('back');
  backTo = back; b.hidden = !back;
  document.body.className = 't-' + (theme || 'home');
}
document.getElementById('back').addEventListener('click', () => { if (backTo) location.hash = backTo; });

const routes = {
  'home': home, 'setup': setup, 'grownups': grownups,
  'brave': braveHub, 'brave/strengths': strengths, 'brave/ladder': ladder, 'brave/selftalk': selfTalk,
  'calm': calmHub, 'calm/feelings': feelings, 'calm/breathe': breathe, 'calm/squeeze': squeeze,
  'calm/senses': senses, 'calm/worry': worry, 'calm/diary': diary,
  'goals': goalsHub, 'goals/new': goalNew, 'goals/view': goalView,
  'friends': friendsHub, 'friends/mmm': mmm, 'friends/stories': storiesList, 'friends/story': story,
  'friends/words': words, 'friends/sorter': sorter, 'friends/stt': stt, 'friends/help': help
};

function route(){
  stopTimers();
  const h = location.hash.replace(/^#\/?/, '');
  const [path, q] = h.split('?');
  const params = new URLSearchParams(q || '');
  window.scrollTo(0, 0);
  if (!S.setup && path !== 'grownups') return setup();
  (routes[path] || home)(params);
}
window.addEventListener('hashchange', route);

/* ---------- Setup & Home ---------- */
function setup(){
  setTop('Welcome!', null, 'friends');
  let pick = S.avatar || AVATARS[0];
  view(`
    <div class="bigemoji">💞</div>
    <h1 class="center">Welcome to Girl Talk</h1>
    <p class="intro center">A place to feel brave, calm and proud, and to get help with tricky friend stuff.</p>
    <div class="card">
      <label class="lbl" for="nm">What shall I call you?</label>
      <input id="nm" maxlength="20" placeholder="A nickname is fine" value="${esc(S.name)}" autocomplete="off">
      <label class="lbl">Pick your buddy</label>
      <div class="chips" id="av">${AVATARS.map(a => `<button class="chip ${a===pick?'on':''}" data-a="${a}" aria-label="${a}"><span class="e">${a}</span></button>`).join('')}</div>
    </div>
    <button class="btn block" id="go">Let's go! →</button>
    <a class="small-link" href="#/grownups">For grown-ups</a>
  `);
  $$('#av .chip').forEach(b => b.onclick = () => { pick = b.dataset.a; $$('#av .chip').forEach(x => x.classList.toggle('on', x === b)); });
  $('#go').onclick = () => {
    S.name = $('#nm').value.trim(); S.avatar = pick; S.setup = true; save();
    location.hash = '#/home'; route();
  };
}

function home(){
  setTop('Girl Talk', null, 'home');
  const g = GREETINGS[Math.floor(Math.random()*GREETINGS.length)];
  view(`
    <section class="hello">
      <a class="avatar" href="#/setup" aria-label="Change buddy">${S.avatar}</a>
      <div><h1>Hi${S.name ? ' ' + esc(S.name) : ''}!</h1><p>${g}</p></div>
    </section>
    <a class="checkin" href="#/calm/feelings">How are you feeling today? <span>→</span></a>
    <div class="islands">
      ${ISLANDS.map(i => `<a class="island ${i.id}" href="#/${i.id}"><span class="isl-emoji">${i.emoji}</span><span class="isl-name">${i.name}</span><span class="isl-sub">${i.sub}</span></a>`).join('')}
    </div>
    <a class="small-link" href="#/grownups">For grown-ups</a>
  `);
}

function hub(title, theme, emoji, intro, items){
  setTop(title, '#/home', theme);
  view(`
    <div class="bigemoji">${emoji}</div>
    <p class="intro center">${intro}</p>
    ${items.map(i => `<a class="tool" href="${i.href}"><span class="ic">${i.e}</span><span><b>${i.name}</b><small>${i.sub}</small></span>${i.done ? '<span class="tick">✅</span>' : ''}</a>`).join('')}
  `);
}

/* ---------- Brave Me ---------- */
function braveHub(){
  hub('Brave Me', 'brave', '🦁', 'Confidence grows a little bit at a time, every time you try.', [
    { e:'💪', name:'My super strengths', sub:'Find the things that make you, YOU', href:'#/brave/strengths', done:S.strengths.length >= 3 },
    { e:'🪜', name:'Brave steps ladder', sub:'Climb one small brave step at a time', href:'#/brave/ladder' },
    { e:'💬', name:'Kind voice game', sub:'Swap the worry voice for a kind voice', href:'#/brave/selftalk' }
  ]);
}

function strengths(){
  setTop('My super strengths', '#/brave', 'brave');
  const draw = () => {
    const mine = STRENGTHS.filter(s => S.strengths.includes(s.id));
    const prompt = mine.length ? mine[Math.floor(Math.random()*mine.length)] : null;
    view(`
      <p class="intro">Tap the strengths you have. Pick as many as you like. If you're stuck, ask a grown-up what they think yours are!</p>
      <div class="chips" id="st">${STRENGTHS.map(s => `<button class="chip ${S.strengths.includes(s.id)?'on':''}" data-id="${s.id}"><span class="e">${s.e}</span>${s.name}</button>`).join('')}</div>
      ${mine.length >= 3 ? `
        <div class="card soft" style="margin-top:16px">
          <h3>I am…</h3>
          <p style="font-size:22px;font-family:Fredoka">${mine.map(s => s.e + ' ' + s.name).join(' · ')}</p>
          <p><b>Think about it:</b> When was a time you were <b>${prompt.name.toLowerCase()}</b>? What happened?</p>
          <p class="muted">Tip: when you feel wobbly, remember these. They're still true on hard days.</p>
        </div>` : `<p class="muted center" style="margin-top:14px">Pick at least 3 to see your strengths card.</p>`}
    `);
    $$('#st .chip').forEach(b => b.onclick = () => {
      const id = b.dataset.id;
      S.strengths = S.strengths.includes(id) ? S.strengths.filter(x => x !== id) : [...S.strengths, id];
      save();
      if (S.strengths.length >= 3) award('strengths', 3, 'You know your strengths!');
      draw();
    });
  };
  draw();
}

function ladder(){
  setTop('Brave steps ladder', '#/brave', 'brave');
  const draw = () => {
    const steps = [...LADDER, ...S.customSteps];
    const done = steps.filter(s => S.ladderDone.includes(s)).length;
    view(`
      <p class="intro">Start at the bottom. When you've done a step, tap <b>I did it!</b> Feeling nervous is OK. It means you're being brave!</p>
      <div class="progress"><i style="width:${Math.round(done/steps.length*100)}%"></i></div>
      <p class="center muted" style="margin-top:-8px">${done} of ${steps.length} brave steps</p>
      <div class="ladder">
        ${steps.map((s,i) => {
          const d = S.ladderDone.includes(s);
          return `<div class="rung ${d?'done':''}"><span class="num">${d ? '⭐' : i+1}</span><span class="txt">${esc(s)}</span><button data-s="${esc(s)}">${d ? 'Done ✓' : 'I did it!'}</button></div>`;
        }).join('')}
      </div>
      <div class="card">
        <label class="lbl" for="ns" style="margin-top:0">Add your own brave step</label>
        <div class="row"><input id="ns" maxlength="70" placeholder="e.g. Order my own food at a café"><button class="btn" id="add" style="flex:none">Add</button></div>
      </div>
    `);
    $$('.rung button').forEach(b => b.onclick = () => {
      const s = b.dataset.s;
      if (S.ladderDone.includes(s)) { S.ladderDone = S.ladderDone.filter(x => x !== s); save(); }
      else { S.ladderDone.push(s); save(); award('ladder-' + s, 2, 'That was brave!'); confetti(); }
      draw();
    });
    $('#add').onclick = () => {
      const v = $('#ns').value.trim();
      if (v && !steps.includes(v)) { S.customSteps.push(v); save(); draw(); }
    };
  };
  draw();
}

function selfTalk(){
  setTop('Kind voice game', '#/brave', 'brave');
  let i = 0, score = 0;
  const intro = () => {
    view(`
      <div class="bigemoji">🌧️ ➜ 🌈</div>
      <div class="card">
        <p>Sometimes our brain has a <b>worry voice</b> that says unkind things, like "I'm rubbish" or "Nobody likes me".</p>
        <p>We can answer it with a <b>kind voice</b>: what you'd say to a friend. The kind voice is kind <b>and</b> true.</p>
      </div>
      <button class="btn block" id="start">Play the game</button>
    `);
    $('#start').onclick = q;
  };
  const q = () => {
    if (i >= SELF_TALK.length) return end();
    const c = SELF_TALK[i];
    const opts = shuffle(c.options);
    let answered = false;
    view(`
      <div class="dots">${SELF_TALK.map((_,k) => `<i class="${k<=i?'on':''}"></i>`).join('')}</div>
      <div class="card"><span class="pill">🌧️ Worry voice says</span><p class="scene"><b>"${esc(c.worry)}"</b></p></div>
      <p><b>Which one is the kind voice?</b></p>
      ${opts.map((o,k) => `<button class="option" data-k="${k}">${esc(o.t)}</button>`).join('')}
      <div id="fb"></div>
    `);
    $$('.option').forEach(b => b.onclick = () => {
      const o = opts[+b.dataset.k];
      if (o.kind){
        b.classList.add('right');
        $$('.option').forEach(x => { if (x !== b) x.classList.add('dim'); x.disabled = true; });
        if (!answered) score++;
        award('selftalk-' + i, 1, 'Kind voice!');
        $('#fb').innerHTML = `<div class="feedback good">🌈 Yes! That's kind and true. Try saying it to yourself.</div><button class="btn block" id="nx">Next →</button>`;
        $('#nx').onclick = () => { i++; q(); };
      } else {
        answered = true;
        b.classList.add('wrong'); b.disabled = true;
        $('#fb').innerHTML = `<div class="feedback bad">${esc(o.why)} Have another go.</div>`;
      }
    });
  };
  const end = () => {
    confetti();
    view(`
      <div class="bigemoji">🌈</div>
      <h2 class="center">You found ${score} out of ${SELF_TALK.length} first time!</h2>
      <div class="card soft"><p>Your kind voice is like having a good friend inside your head. The more you use it, the stronger it gets.</p>
      <p><b>Try this:</b> next time the worry voice pops up, ask yourself, "What would I say to my best friend?"</p></div>
      <div class="row"><button class="btn ghost" id="again">Play again</button><a class="btn" href="#/brave">Done</a></div>
    `);
    $('#again').onclick = () => { i = 0; score = 0; q(); };
  };
  intro();
}

/* ---------- Calm Corner ---------- */
function calmHub(){
  hub('Calm Corner', 'calm', '🌈', 'All feelings are OK. These tools help when feelings get big.', [
    { e:'💭', name:'How do I feel?', sub:'Name it to tame it', href:'#/calm/feelings' },
    { e:'🌸', name:'Flower & candle breathing', sub:'Slow breaths to calm your body', href:'#/calm/breathe' },
    { e:'🍋', name:'Squeeze & relax', sub:'Let the tight feelings go', href:'#/calm/squeeze' },
    { e:'👀', name:'5-4-3-2-1 senses game', sub:'Bring your mind back to right now', href:'#/calm/senses' },
    { e:'📦', name:'Worry sorter', sub:'Can I do something, or let it go?', href:'#/calm/worry' },
    { e:'📔', name:'My feelings diary', sub:'See how you\'ve been feeling', href:'#/calm/diary' }
  ]);
}

function toolButtons(ids){
  return ids.map(id => { const t = TOOL_LINKS[id]; return `<a class="tool" href="${t.href}"><span class="ic">${t.e}</span><span><b>${t.name}</b></span></a>`; }).join('');
}

function feelings(){
  setTop('How do I feel?', '#/calm', 'calm');
  let f = null, size = null;
  const pickFeeling = () => {
    view(`
      <p class="intro">Putting a feeling into words helps it feel smaller. Tap the one that fits best.</p>
      <div class="chips">${FEELINGS.map(x => `<button class="chip" data-id="${x.id}"><span class="e">${x.e}</span>${x.name}</button>`).join('')}</div>
    `);
    $$('.chip').forEach(b => b.onclick = () => { f = FEELINGS.find(x => x.id === b.dataset.id); pickSize(); });
  };
  const pickSize = () => {
    view(`
      <div class="bigemoji">${f.e}</div>
      <h2 class="center">${f.name}</h2>
      <p class="center"><b>How big is the feeling?</b></p>
      <div class="sizes">${SIZES.map(s => `<button class="size" data-n="${s.n}"><i style="width:${16+s.n*10}px;height:${16+s.n*10}px"></i>${s.name}</button>`).join('')}</div>
    `);
    $$('.size').forEach(b => b.onclick = () => { size = +b.dataset.n; result(); });
  };
  const result = () => {
    S.feelings.unshift({ d: new Date().toISOString(), id: f.id, size });
    S.feelings = S.feelings.slice(0, 100); save();
    award('checkin-' + dkey(), 1, 'Thanks for checking in!');
    let tools = f.tools.slice();
    const big = size >= 4 && !['happy','excited','calm','proud'].includes(f.id);
    if (big) tools = ['breathe', ...tools.filter(t => t !== 'breathe')];
    view(`
      <div class="bigemoji">${f.e}</div>
      <div class="say">I feel <b>${f.name.toLowerCase()}</b>. It's a <b>${SIZES[size-1].name.toLowerCase()}</b> feeling.</div>
      <div class="card" style="margin-top:14px">
        <p>${f.msg}</p>
        ${big ? '<p><b>That\'s a big feeling.</b> Calm your body first with some slow breaths. Then you can think about what to do.</p>' : ''}
        <p class="muted" style="margin:0">Thank you for noticing how you feel. That's a really useful skill.</p>
      </div>
      <h3>Things that might help</h3>
      ${toolButtons(tools)}
    `);
  };
  pickFeeling();
}

function breathe(){
  setTop('Flower & candle breathing', '#/calm', 'calm');
  const TOTAL = 5;
  view(`
    <p class="intro center">Breathe in slowly through your nose, like smelling a flower. Then breathe out slowly through your mouth, like blowing out a candle.</p>
    <div class="breath" id="ball">🌸</div>
    <div class="breath-text" id="bt">Ready when you are</div>
    <div class="dots" id="bd">${Array(TOTAL).fill('<i></i>').join('')}</div>
    <button class="btn block" id="go">Start</button>
  `);
  const ball = $('#ball'), bt = $('#bt');
  $('#go').onclick = () => {
    $('#go').hidden = true;
    let n = 0;
    const cycle = () => {
      if (n >= TOTAL){
        ball.className = 'breath'; ball.textContent = '😌';
        bt.innerHTML = 'Well done! How does your body feel now?';
        award('breathe-' + dkey(), 1, 'Calm breathing!');
        $('#go').hidden = false; $('#go').textContent = 'Do it again';
        return;
      }
      ball.textContent = '🌸'; ball.className = 'breath in';
      bt.innerHTML = 'Smell the flower…<br><small class="muted">in, 2, 3, 4</small>';
      later(() => {
        ball.textContent = '🕯️'; ball.className = 'breath out';
        bt.innerHTML = 'Blow out the candle…<br><small class="muted">out, 2, 3, 4, 5, 6</small>';
        later(() => { n++; $$('#bd i').forEach((d,k) => d.classList.toggle('on', k < n)); cycle(); }, 6000);
      }, 4000);
    };
    cycle();
  };
}

function squeeze(){
  setTop('Squeeze & relax', '#/calm', 'calm');
  let i = 0;
  const step = () => {
    if (i >= SQUEEZE.length){
      award('squeeze-' + dkey(), 1, 'Floppy and calm!');
      view(`<div class="bigemoji">😌</div><h2 class="center">All done!</h2>
        <div class="card soft"><p>Notice how your body feels now: softer, heavier, calmer. You can do any of these on your own, any time, even in class, and nobody will notice!</p></div>
        <div class="row"><button class="btn ghost" id="again">Again</button><a class="btn" href="#/calm">Done</a></div>`);
      $('#again').onclick = () => { i = 0; step(); };
      return;
    }
    const s = SQUEEZE[i];
    view(`
      <div class="dots">${SQUEEZE.map((_,k) => `<i class="${k<=i?'on':''}"></i>`).join('')}</div>
      <div class="bigemoji">${s.e}</div>
      <h2 class="center">${s.name}</h2>
      <div class="card"><p class="scene" id="txt">${s.squeeze}</p></div>
      <div class="breath-text" id="count"></div>
      <button class="btn block" id="go">Squeeze! 💪</button>
    `);
    $('#go').onclick = () => {
      $('#go').hidden = true;
      let c = 5;
      const tick = () => {
        if (c > 0){ $('#count').textContent = `Squeeze… ${c}`; c--; later(tick, 1000); }
        else {
          $('#txt').textContent = s.relax;
          $('#count').textContent = 'Aaaand relax… 😌';
          later(() => { $('#go').hidden = false; $('#go').textContent = i === SQUEEZE.length-1 ? 'Finish' : 'Next →'; $('#go').onclick = () => { i++; step(); }; }, 4000);
        }
      };
      tick();
    };
  };
  step();
}

function senses(){
  setTop('5-4-3-2-1 senses', '#/calm', 'calm');
  let i = 0;
  const step = () => {
    if (i >= SENSES.length){
      award('senses-' + dkey(), 1, 'Super noticing!');
      view(`<div class="bigemoji">🌟</div><h2 class="center">Brilliant noticing!</h2>
        <div class="card soft"><p>When worries are about the past or the future, noticing what's around you <b>right now</b> helps your brain calm down.</p></div>
        <a class="btn block" href="#/calm">Done</a>`);
      return;
    }
    const s = SENSES[i];
    let found = 0;
    view(`
      <div class="dots">${SENSES.map((_,k) => `<i class="${k<=i?'on':''}"></i>`).join('')}</div>
      <div class="bigemoji">${s.e}</div>
      <h2 class="center">Find ${s.n} ${s.t}</h2>
      <p class="intro center">Look around. Say each one out loud or in your head, then tap a circle.</p>
      <div class="sizes" style="justify-content:center;gap:12px">${Array(s.n).fill(0).map((_,k) => `<button class="size" data-k="${k}"><i style="width:48px;height:48px"></i></button>`).join('')}</div>
    `);
    $$('.size').forEach(b => b.onclick = () => {
      if (b.classList.contains('on')) return;
      b.classList.add('on'); found++;
      if (found >= s.n) later(() => { i++; step(); }, 600);
    });
  };
  step();
}

function worry(){
  setTop('Worry sorter', '#/calm', 'calm');
  const list = () => {
    const open = S.worries.filter(w => !w.gone);
    view(`
      <p class="intro">Getting a worry out of your head and into words makes it easier to deal with.</p>
      <div class="card">
        <label class="lbl" for="w" style="margin-top:0">What's worrying you?</label>
        <textarea id="w" maxlength="200" placeholder="e.g. I'm worried no one will sit with me at lunch"></textarea>
        <button class="btn block" id="next" style="margin-top:12px">Sort it →</button>
      </div>
      ${open.length ? `<h3>My worries</h3><div class="card">${open.map(w => `
        <div class="entry"><span class="e">${w.type === 'can' ? '💡' : '📦'}</span><span>${esc(w.text)}${w.plan ? `<small>Plan: ${esc(w.plan)}</small>` : ''}</span><button class="x" data-id="${w.id}">Gone! ✓</button></div>`).join('')}</div>
        <p class="muted center">Tap "Gone!" when a worry has got smaller or gone away.</p>` : ''}
    `);
    $('#next').onclick = () => { const t = $('#w').value.trim(); if (t) sort(t); };
    $$('.x').forEach(b => b.onclick = () => {
      const w = S.worries.find(x => x.id === b.dataset.id); w.gone = true; save();
      award('worrygone-' + w.id, 2, 'Worry gone!'); confetti(); list();
    });
  };
  const sort = (text) => {
    view(`
      <div class="card"><span class="pill">My worry</span><p class="scene">${esc(text)}</p></div>
      <p><b>Is there something I can do about it?</b></p>
      <button class="option" id="can">💡 Yes, there's something I can do</button>
      <button class="option" id="cant">📦 No, it's not in my control</button>
    `);
    $('#can').onclick = () => {
      view(`
        <div class="card"><span class="pill">My worry</span><p class="scene">${esc(text)}</p></div>
        <label class="lbl" for="p">What's one small thing you could do?</label>
        <div class="examples">${['Talk to a grown-up','Make a plan','Practise it','Use my brave words','Ask a friend'].map(e => `<button>${e}</button>`).join('')}</div>
        <input id="p" maxlength="120" placeholder="I could…">
        <button class="btn block" id="sv" style="margin-top:12px">Save my plan</button>
      `);
      $$('.examples button').forEach(b => b.onclick = () => { $('#p').value = b.textContent; });
      $('#sv').onclick = () => {
        S.worries.unshift({ id: Date.now().toString(36), text, type:'can', plan: $('#p').value.trim() }); save();
        award('worry-' + dkey(), 1, 'Worry sorted!'); list();
      };
    };
    $('#cant').onclick = () => {
      S.worries.unshift({ id: Date.now().toString(36), text, type:'cant' }); save();
      award('worry-' + dkey(), 1, 'Worry sorted!');
      view(`
        <div class="bigemoji">📦</div>
        <h2 class="center">Into the worry box it goes!</h2>
        <div class="card soft">
          <p>Some things aren't ours to fix. We can put them in the worry box and share them with a grown-up later.</p>
          <p><b>Now do something that makes you feel good:</b> draw, play, read, cuddle a pet, or have a dance!</p>
        </div>
        <a class="btn block" href="#/calm/worry">OK</a>
      `);
    };
  };
  list();
}

function diary(){
  setTop('My feelings diary', '#/calm', 'calm');
  const items = S.feelings.slice(0, 40);
  const fmt = iso => new Date(iso).toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
  view(`
    <p class="intro">Here's how you've been feeling. You could look at this with a grown-up you trust.</p>
    ${items.length ? `<div class="card">${items.map(x => { const f = FEELINGS.find(y => y.id === x.id) || {e:'❓',name:''};
      return `<div class="entry"><span class="e">${f.e}</span><span><b>${f.name}</b><small>${fmt(x.d)} · ${SIZES[x.size-1].name} feeling</small></span></div>`; }).join('')}</div>`
      : `<div class="card center"><p>Nothing here yet.</p><a class="btn" href="#/calm/feelings">Check in now</a></div>`}
  `);
}

/* ---------- Goals ---------- */
function goalsHub(){
  setTop('My Goals', '#/home', 'goals');
  const active = S.goals.filter(g => !g.done), done = S.goals.filter(g => g.done);
  view(`
    <div class="bigemoji">🚀</div>
    <div class="card soft">
      <p style="margin:0">We use the <b>WOOP</b> trick to reach goals:<br>
      <b>W</b>ish · <b>O</b>utcome · <b>O</b>bstacle · <b>P</b>lan</p>
    </div>
    <a class="btn block" href="#/goals/new">+ Make a new goal</a>
    ${active.length ? `<h3 style="margin-top:20px">Working on</h3>` + active.map(goalCard).join('') : ''}
    ${done.length ? `<h3 style="margin-top:20px">Achieved! 🏆</h3>` + done.map(goalCard).join('') : ''}
  `);
}
function goalCard(g){
  const tries = Object.keys(g.days || {}).length;
  return `<a class="tool" href="#/goals/view?id=${g.id}"><span class="ic">${g.done ? '🏆' : '🎯'}</span><span><b>${esc(g.wish)}</b><small>${tries} day${tries === 1 ? '' : 's'} of trying</small></span></a>`;
}

function goalNew(){
  setTop('New goal', '#/goals', 'goals');
  const g = { wish:'', outcome:'', obstacle:'', plan:'' };
  let i = 0;
  const step = () => {
    const s = WOOP_STEPS[i];
    const planLead = s.key === 'plan' ? `<div class="say" style="font-size:19px;margin-bottom:10px">If <b>${esc(lc(g.obstacle))}</b>, then I will…</div>` : '';
    view(`
      <div class="dots">${WOOP_STEPS.map((_,k) => `<i class="${k<=i?'on':''}"></i>`).join('')}</div>
      <div class="bigemoji" style="font-family:Fredoka;color:var(--goals)">${s.letter}</div>
      <h2 class="center">${s.name}</h2>
      <p class="center"><b>${s.q}</b></p>
      ${planLead}
      <textarea id="a" maxlength="140" placeholder="Type here, or tap an idea">${esc(g[s.key])}</textarea>
      <div class="examples">${s.ex.map(e => `<button>${esc(e)}</button>`).join('')}</div>
      <div class="row" style="margin-top:12px">
        ${i > 0 ? '<button class="btn ghost" id="bk">← Back</button>' : ''}
        <button class="btn" id="nx">${i === WOOP_STEPS.length-1 ? 'Save my goal' : 'Next →'}</button>
      </div>
    `);
    $$('.examples button').forEach(b => b.onclick = () => { $('#a').value = b.textContent; });
    if ($('#bk')) $('#bk').onclick = () => { g[s.key] = $('#a').value.trim(); i--; step(); };
    $('#nx').onclick = () => {
      const v = $('#a').value.trim();
      if (!v){ toast('Write something first!'); return; }
      g[s.key] = v;
      if (i < WOOP_STEPS.length-1){ i++; step(); return; }
      const goal = { id: Date.now().toString(36), ...g, days:{}, done:false, created: dkey() };
      S.goals.unshift(goal); save();
      award('goal-new-' + goal.id, 2, 'Goal set!');
      location.hash = '#/goals/view?id=' + goal.id;
    };
  };
  step();
}

function goalView(params){
  setTop('My goal', '#/goals', 'goals');
  const g = S.goals.find(x => x.id === params.get('id'));
  if (!g){ location.hash = '#/goals'; return; }
  const draw = () => {
    const now = new Date(); const dow = (now.getDay() + 6) % 7;
    const mon = new Date(now); mon.setDate(now.getDate() - dow);
    const week = [...Array(7)].map((_,k) => { const d = new Date(mon); d.setDate(mon.getDate() + k); return d; });
    const names = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const today = dkey();
    view(`
      <div class="card">
        <span class="pill">🌟 Wish</span><h2>${esc(g.wish)}</h2>
        <p><b>Best thing about it:</b> ${esc(g.outcome)}</p>
        <div class="say" style="font-size:20px">If <b>${esc(lc(g.obstacle))}</b>,<br>then I will <b>${esc(lc(g.plan))}</b>.</div>
      </div>
      ${g.done ? `<div class="card soft center"><div class="bigemoji">🏆</div><h2>You did it!</h2><p>You should be really proud.</p></div>` : `
      <div class="card">
        <h3>This week</h3>
        <p class="muted" style="margin:0">Tap a day when you tried. Trying counts, even if it didn't go perfectly!</p>
        <div class="week">${week.map((d,k) => { const key = dkey(d); const on = g.days[key]; const fut = key > today;
          return `<button class="day ${on?'on':''} ${key===today?'today':''} ${fut?'future':''}" data-k="${key}"><i>${on ? '⭐' : ''}</i>${names[k]}</button>`; }).join('')}</div>
      </div>
      <button class="btn block" id="achieved">I achieved my goal! 🎉</button>`}
      <button class="btn ghost block" id="del" style="margin-top:12px">Delete this goal</button>
    `);
    $$('.day').forEach(b => b.onclick = () => {
      const k = b.dataset.k;
      if (g.days[k]) delete g.days[k]; else { g.days[k] = true; award(`goal-${g.id}-${k}`, 1, 'You tried!'); }
      save(); draw();
    });
    if ($('#achieved')) $('#achieved').onclick = () => { g.done = true; save(); award('goal-done-' + g.id, 5, 'Goal achieved!'); confetti(); draw(); };
    $('#del').onclick = () => { if (confirm('Delete this goal?')){ S.goals = S.goals.filter(x => x !== g); save(); location.hash = '#/goals'; } };
  };
  draw();
}

/* ---------- Friendship Tools ---------- */
function friendsHub(){
  hub('Friendship Tools', 'friends', '💞', 'Friendships can be tricky sometimes. Here are some tools to help.', [
    { e:'🐭', name:'Mouse, Monster or Me?', sub:'Find the calm, strong way to answer', href:'#/friends/mmm' },
    { e:'📖', name:'Friendship stories', sub:'What would you do?', href:'#/friends/stories' },
    { e:'🗣️', name:'Brave words', sub:'Things to say in tricky moments', href:'#/friends/words' },
    { e:'💚', name:'Kind friend, or not?', sub:'Spot the signs of a good friend', href:'#/friends/sorter' },
    { e:'🚦', name:'Stop, Think, Do', sub:'Solve a friendship problem', href:'#/friends/stt' },
    { e:'🧡', name:'Who can help me?', sub:'When to tell a grown-up', href:'#/friends/help' }
  ]);
}

function mmm(){
  setTop('Mouse, Monster or Me?', '#/friends', 'friends');
  const qs = shuffle(MMM);
  let i = 0, score = 0;
  const intro = () => {
    view(`
      <div class="card">
        <p><b>🐭 Mouse</b> is too quiet. She keeps her feelings inside and lets people walk all over her.</p>
        <p><b>👹 Monster</b> is too loud. She shouts, is mean, or hurts people to get her way.</p>
        <p style="margin:0"><b>🌟 Me</b> is calm, kind and clear. She says what she needs <i>and</i> is respectful.</p>
      </div>
      <div class="card soft">
        <h3>Use your strong body</h3>
        <p style="margin:0">🧍‍♀️ Stand tall · 👀 Look at the person · 🗣️ Use a calm, steady voice</p>
      </div>
      <button class="btn block" id="start">Play</button>
    `);
    $('#start').onclick = q;
  };
  const q = () => {
    if (i >= qs.length) return end();
    const c = qs[i];
    const opts = shuffle([{ t:c.mouse, k:'mouse' }, { t:c.monster, k:'monster' }, { t:c.me, k:'me' }]);
    const label = { mouse:'🐭 Mouse', monster:'👹 Monster', me:'🌟 Me' };
    view(`
      <div class="progress"><i style="width:${Math.round(i/qs.length*100)}%"></i></div>
      <div class="card"><p class="scene">${esc(c.s)}</p></div>
      <p><b>Which is the 🌟 Me answer?</b></p>
      ${opts.map((o,k) => `<button class="option" data-k="${k}">${esc(o.t)}</button>`).join('')}
      <div id="fb"></div>
    `);
    $$('.option').forEach(b => b.onclick = () => {
      const pick = opts[+b.dataset.k];
      $$('.option').forEach((x,k) => { x.disabled = true; x.innerHTML += `<span class="tag">${label[opts[k].k]}</span>`; if (opts[k].k === 'me') x.classList.add('right'); });
      if (pick.k === 'me'){ score++; award('mmm-' + c.s, 1, 'Calm and strong!'); }
      else b.classList.add('wrong');
      const fb = pick.k === 'me' ? '<div class="feedback good">🌟 Yes! Calm, kind and clear.</div>'
        : pick.k === 'mouse' ? '<div class="feedback ok">🐭 That\'s the Mouse. Your feelings matter too, so it\'s OK to speak up!</div>'
        : '<div class="feedback bad">👹 That\'s the Monster. Being unkind back usually makes things worse.</div>';
      $('#fb').innerHTML = fb + `<button class="btn block" id="nx">Next →</button>`;
      $('#nx').onclick = () => { i++; q(); };
    });
  };
  const end = () => {
    confetti();
    view(`<div class="bigemoji">🌟</div><h2 class="center">You got ${score} out of ${qs.length}!</h2>
      <div class="card soft"><p style="margin:0">Being "Me" takes practice. Try saying the Me answers out loud in a strong, calm voice, maybe with a grown-up pretending to be the other person!</p></div>
      <div class="row"><button class="btn ghost" id="again">Play again</button><a class="btn" href="#/friends">Done</a></div>`);
    $('#again').onclick = () => mmm();
  };
  intro();
}

function storiesList(){
  setTop('Friendship stories', '#/friends', 'friends');
  view(`
    <p class="intro">Read each story and choose what you would do. There's often more than one good choice!</p>
    ${STORIES.map(s => `<a class="tool" href="#/friends/story?id=${s.id}"><span class="ic">${s.e}</span><span><b>${esc(s.title)}</b></span>${S.earned['story-' + s.id] ? '<span class="tick">✅</span>' : ''}</a>`).join('')}
  `);
}

function story(params){
  const s = STORIES.find(x => x.id === params.get('id'));
  if (!s){ location.hash = '#/friends/stories'; return; }
  setTop(s.title.replace(/"/g, ''), '#/friends/stories', 'friends');
  const idx = STORIES.indexOf(s);
  const ask = () => {
    view(`
      <div class="bigemoji">${s.e}</div>
      <div class="card"><p class="scene" style="margin:0">${esc(s.scene)}</p></div>
      <p><b>What would you do?</b></p>
      ${s.choices.map((c,k) => `<button class="option" data-k="${k}">${esc(c.t)}</button>`).join('')}
    `);
    $$('.option').forEach(b => b.onclick = () => show(s.choices[+b.dataset.k]));
  };
  const show = (c) => {
    const head = { good:'🌟 Great choice!', ok:'🤔 Hmm, maybe…', bad:'😬 Uh oh…' }[c.r];
    if (c.r === 'good') award('story-' + s.id, 2, 'Great thinking!');
    const nxt = STORIES[idx + 1];
    view(`
      <div class="card"><p style="margin:0"><b>You chose:</b> ${esc(c.t)}</p></div>
      <div class="feedback ${c.r}"><h3>${head}</h3><p style="margin:0">${esc(c.o)}</p></div>
      <div class="card soft"><span class="pill">💡 Remember</span><p style="margin:0">${esc(s.tip)}</p></div>
      <div class="row">
        <button class="btn ghost" id="again">Try another choice</button>
        ${nxt ? `<a class="btn" href="#/friends/story?id=${nxt.id}">Next story →</a>` : `<a class="btn" href="#/friends/stories">All stories</a>`}
      </div>
    `);
    $('#again').onclick = ask;
  };
  ask();
}

function words(){
  setTop('Brave words', '#/friends', 'friends');
  let cat = 0;
  const feelOpts = ['sad','cross','left out','hurt','worried','embarrassed','upset'];
  const draw = () => {
    const c = PHRASES[cat];
    view(`
      <div class="card">
        <h3>🧩 Build an "I feel" sentence</h3>
        <p class="muted">"I feel" sentences tell someone how you feel without being mean.</p>
        <label class="lbl">I feel…</label>
        <select id="f1">${feelOpts.map(f => `<option>${f}</option>`).join('')}</select>
        <label class="lbl" for="f2">when…</label>
        <input id="f2" maxlength="80" placeholder="you don't let me play">
        <label class="lbl" for="f3">Please could you…</label>
        <input id="f3" maxlength="80" placeholder="let me join in next time">
        <button class="btn block" id="mk" style="margin-top:14px">Make my sentence</button>
        <div id="out"></div>
      </div>
      <h3>Brave words to try</h3>
      <div class="tabs">${PHRASES.map((p,k) => `<button class="tab ${k===cat?'on':''}" data-k="${k}">${p.e} ${p.cat}</button>`).join('')}</div>
      ${c.list.map(p => `<div class="phrase"><span>${esc(p)}</span><button class="speak" data-t="${esc(p)}" aria-label="Hear it">🔊</button></div>`).join('')}
      <p class="muted center">Practise them out loud with a strong, calm voice.</p>
    `);
    $$('.tab').forEach(b => b.onclick = () => { cat = +b.dataset.k; draw(); });
    $$('.speak').forEach(b => b.onclick = () => speak(b.dataset.t));
    $('#mk').onclick = () => {
      const a = $('#f1').value, b = $('#f2').value.trim() || 'that happens', c2 = $('#f3').value.trim();
      const text = `I feel ${a} when ${b}.${c2 ? ' Please could you ' + c2 + '?' : ''}`;
      $('#out').innerHTML = `<div class="say" style="margin-top:14px">${esc(text)}</div><button class="btn ghost block" id="hear" style="margin-top:10px">🔊 Hear it</button>`;
      $('#hear').onclick = () => speak(text);
      award('ifeel', 2, 'Brave words!');
    };
  };
  draw();
}

function sorter(){
  setTop('Kind friend, or not?', '#/friends', 'friends');
  const cards = shuffle(FRIEND_SORT);
  let i = 0, score = 0;
  const q = () => {
    if (i >= cards.length){
      award('sorter', 3, 'Friendship detective!'); confetti();
      view(`<div class="bigemoji">🔍</div><h2 class="center">${score} out of ${cards.length}!</h2>
        <div class="card soft"><p>Everyone is unkind sometimes, even good friends. A good friend says sorry and tries again.</p>
        <p style="margin:0">But if a friend <b>often</b> makes you feel bad, worried or left out, talk to a grown-up you trust. You deserve kind friends.</p></div>
        <div class="row"><button class="btn ghost" id="again">Play again</button><a class="btn" href="#/friends">Done</a></div>`);
      $('#again').onclick = sorter;
      return;
    }
    const c = cards[i];
    view(`
      <div class="progress"><i style="width:${Math.round(i/cards.length*100)}%"></i></div>
      <p class="center"><b>A friend who…</b></p>
      <div class="say" style="min-height:120px;display:grid;place-items:center">${esc(c.t)}</div>
      <div class="row" style="margin-top:16px">
        <button class="btn" data-v="1" style="background:var(--good)">💚 Kind friend</button>
        <button class="btn" data-v="0" style="background:var(--bad)">🚩 Not kind</button>
      </div>
      <div id="fb"></div>
    `);
    $$('[data-v]').forEach(b => b.onclick = () => {
      const right = (b.dataset.v === '1') === c.kind;
      if (right) score++;
      $$('[data-v]').forEach(x => x.disabled = true);
      $('#fb').innerHTML = `<div class="feedback ${right ? 'good' : 'bad'}">${right ? 'Yes!' : 'Not quite.'} That's ${c.kind ? 'what a <b>kind friend</b> does 💚' : '<b>not kind</b> 🚩'}.</div><button class="btn block" id="nx">Next →</button>`;
      $('#nx').onclick = () => { i++; q(); };
    });
  };
  q();
}

function stt(){
  setTop('Stop, Think, Do', '#/friends', 'friends');
  const p = { problem:'', ideas:[], pick:'' };
  const stop = () => {
    view(`
      <div class="bigemoji">🔴</div><h2 class="center">STOP</h2>
      <div class="card"><p>First, notice how you feel. Take 3 slow breaths, like smelling a flower and blowing out a candle.</p>
      <label class="lbl" for="pr">What's the problem?</label>
      <textarea id="pr" maxlength="160" placeholder="e.g. My friend won't let me choose the game">${esc(p.problem)}</textarea></div>
      <button class="btn block" id="nx">I've calmed down →</button>
    `);
    $('#nx').onclick = () => { const v = $('#pr').value.trim(); if (!v){ toast('Write the problem first'); return; } p.problem = v; think(); };
  };
  const think = () => {
    view(`
      <div class="bigemoji">🟡</div><h2 class="center">THINK</h2>
      <div class="card"><p>What could you do? Tap <b>2 or more ideas</b>, or add your own.</p>
      <div class="chips" style="grid-template-columns:1fr 1fr" id="ids">${[...STT_IDEAS, ...p.ideas.filter(x => !STT_IDEAS.includes(x))].map(x => `<button class="chip ${p.ideas.includes(x)?'on':''}" data-t="${esc(x)}">${esc(x)}</button>`).join('')}</div>
      <div class="row" style="margin-top:12px"><input id="own" maxlength="60" placeholder="My own idea"><button class="btn" id="add" style="flex:none">Add</button></div></div>
      <button class="btn block" id="nx">Next →</button>
    `);
    $$('#ids .chip').forEach(b => b.onclick = () => { const t = b.dataset.t; p.ideas = p.ideas.includes(t) ? p.ideas.filter(x => x !== t) : [...p.ideas, t]; b.classList.toggle('on'); });
    $('#add').onclick = () => { const v = $('#own').value.trim(); if (v && !p.ideas.includes(v)){ p.ideas.push(v); think(); } };
    $('#nx').onclick = () => { if (p.ideas.length < 2){ toast('Pick at least 2 ideas'); return; } choose(); };
  };
  const choose = () => {
    view(`
      <div class="bigemoji">🟡</div><h2 class="center">Which idea is best?</h2>
      <p class="intro center">Think: Is it safe? Is it kind? Will it help?</p>
      ${p.ideas.map((x,k) => `<button class="option" data-k="${k}">${esc(x)}</button>`).join('')}
    `);
    $$('.option').forEach(b => b.onclick = () => { p.pick = p.ideas[+b.dataset.k]; doIt(); });
  };
  const doIt = () => {
    award('stt-' + dkey(), 2, 'Problem solver!');
    view(`
      <div class="bigemoji">🟢</div><h2 class="center">DO</h2>
      <div class="card"><span class="pill">My problem</span><p>${esc(p.problem)}</p>
      <span class="pill">My plan</span><div class="say">${esc(p.pick)}</div></div>
      <div class="card soft"><p style="margin:0">Give it a go! If it doesn't work, that's OK. Come back and try another idea, or ask a grown-up to help.</p></div>
      <a class="btn block" href="#/friends">Done</a>
    `);
  };
  stop();
}

function help(){
  setTop('Who can help me?', '#/friends', 'friends');
  view(`
    <div class="bigemoji">🧡</div>
    <div class="card">
      <h3>Tell a grown-up you trust if…</h3>
      ${HELP_LIST.map(h => `<div class="entry"><span class="e">✋</span><span>${esc(h)}</span></div>`).join('')}
    </div>
    <div class="card soft">
      <h3>Telling is NOT telling tales</h3>
      <p style="margin:0">Telling tales is trying to get someone into trouble. <b>Telling</b> is getting help when something isn't right. That's brave.</p>
    </div>
    <div class="card">
      <h3>My trusted grown-ups</h3>
      <p>Think of 5 grown-ups you could talk to, one for each finger on your hand ✋. Maybe a parent, a teacher, a grandparent, an aunt or a club leader.</p>
      <h3>Childline</h3>
      <p style="margin:0">If you ever need to talk to someone else, Childline is free and kind. Call <a href="tel:08001111"><b>0800 1111</b></a> or visit <a href="https://www.childline.org.uk" target="_blank" rel="noopener">childline.org.uk</a>.</p>
    </div>
  `);
}

/* ---------- Grown-ups ---------- */
function grownups(){
  setTop('For grown-ups', S.setup ? '#/home' : '#/setup', 'friends');
  view(`
    <div class="card gu">
      <h2>About Girl Talk</h2>
      <p>Girl Talk helps girls of about 8 to 10 build confidence, manage big feelings, set goals and handle tricky friendships. It works best when you explore it <b>together</b>: 10 minutes a few times a week, letting her lead.</p>
      <p><b>Privacy:</b> there are no accounts, no messaging and no tracking. Everything she enters is saved only on this device, in this browser.</p>
    </div>
    <div class="card gu">
      <h3>Emotion coaching: your part</h3>
      <ul>
        <li><b>Notice</b> the feeling, especially when it's small.</li>
        <li><b>Name it</b> with her: "You look really disappointed."</li>
        <li><b>Empathise</b> before fixing: "That would upset me too."</li>
        <li><b>Set limits</b> on behaviour, not feelings: "It's OK to be angry. It's not OK to hit."</li>
        <li><b>Problem-solve together</b>: "What could you try next time?"</li>
      </ul>
      <p class="ref">Gottman's emotion coaching; Havighurst et al., <i>Tuning in to Kids</i> randomised trials.</p>
    </div>
    <div class="card gu">
      <h3>What the app is based on</h3>
      <ul>
        <li><b>Feelings check-in:</b> putting feelings into words (affect labelling) reduces their intensity. <span class="ref">Lieberman et al., 2007.</span></li>
        <li><b>Brave steps, kind voice, worry sorter:</b> graded exposure, cognitive restructuring and problem-solving, the core parts of CBT programmes for anxious children such as Cool Kids and Coping Cat.</li>
        <li><b>Breathing, squeeze and relax, 5-4-3-2-1:</b> slow breathing, progressive muscle relaxation and grounding, as used in CBT and mindfulness programmes for children. Helpful for calming down, with more modest evidence on their own.</li>
        <li><b>Goals (WOOP):</b> mental contrasting with implementation intentions ("If… then I will…") improved schoolchildren's effort and outcomes in trials. <span class="ref">Oettingen; Duckworth et al., 2013.</span></li>
        <li><b>Strengths:</b> identifying character strengths, from positive-psychology programmes. Small but positive effects on wellbeing.</li>
        <li><b>"I can't do it yet":</b> growth-mindset language. Useful, though stand-alone mindset programmes show only small effects. <span class="ref">Sisk et al., 2018.</span></li>
        <li><b>Mouse, Monster or Me, brave words, Stop Think Do:</b> assertiveness and social problem-solving, from social-skills training.</li>
      </ul>
      <p class="ref">This is a supportive tool, not therapy. If you're worried about her mood, anxiety or bullying, speak to her school or GP.</p>
    </div>
    <div class="card gu">
      <h3>Reset</h3>
      <p>Clears her name, stars, goals, worries and diary from this device.</p>
      <button class="btn ghost block" id="reset">Reset all data</button>
    </div>
  `);
  $('#reset').onclick = () => {
    if (confirm('Delete everything saved in Girl Talk on this device?')){
      try { localStorage.removeItem(KEY); } catch(e){}
      S = JSON.parse(JSON.stringify(DEFAULTS)); updateStars(); location.hash = '#/setup'; route();
    }
  };
}

/* ---------- Start ---------- */
updateStars();
route();
