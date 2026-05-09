// ── Project data ──────────────────────────────────────────────────────────
const projects = [
  {
    num: '01',
    title: 'Project One',
    category: 'Web Development',
    year: '2024',
    type: 'Full-Stack',
    color: '#0d0d0d',
    desc: 'A full-stack web application solving a real-world problem. Built with a focus on user experience, performance, and accessibility across all devices and contexts.',
    details: ['Research & Discovery', 'UI/UX Design', 'Frontend Development', 'Performance Optimisation', 'Accessibility Audit'],
    tags: ['HTML', 'CSS', 'JavaScript', 'REST API']
  },
  {
    num: '02',
    title: 'Project Two',
    category: 'Full-Stack App',
    year: '2024',
    type: 'Web Application',
    color: '#990021',
    desc: 'A responsive mobile-first application with a clean, minimal interface. Focused on fast load times, intuitive interactions, and delightful micro-animations.',
    details: ['User Research', 'Prototyping', 'React Development', 'API Integration', 'Testing & QA'],
    tags: ['React', 'Node.js', 'CSS', 'PostgreSQL']
  },
  {
    num: '03',
    title: 'Project Three',
    category: 'Open Source',
    year: '2023',
    type: 'Developer Tool',
    color: '#2a2a2a',
    desc: 'An open-source developer tool that streamlines workflow and reduces boilerplate. Used in production by hundreds of developers worldwide.',
    details: ['Architecture Design', 'Python Development', 'CLI Interface', 'Documentation', 'Community Growth'],
    tags: ['Python', 'REST API', 'CLI', 'Open Source']
  }
];

// ── DOM references ─────────────────────────────────────────────────────────
const navToggle  = document.getElementById('nav-toggle');
const navOverlay = document.getElementById('nav-overlay');
const pdOverlay  = document.getElementById('project-detail');
const pdClose    = document.getElementById('pd-close');

// ── Year ──────────────────────────────────────────────────────────────────
const y = new Date().getFullYear();
document.getElementById('hero-year').textContent = y;
document.getElementById('footer-year').textContent = y;

// ── Hero entrance reveal ──────────────────────────────────────────────────
let _revealed = false;
function triggerReveal() {
  if (_revealed) return;
  _revealed = true;
  requestAnimationFrame(() => document.body.classList.add('loaded'));
}
document.fonts.ready.then(triggerReveal);
setTimeout(triggerReveal, 1500);

// ── Nav toggle ─────────────────────────────────────────────────────────────
function openNav() {
  navToggle.classList.add('active');
  navOverlay.classList.add('open');
  navOverlay.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('nav-open');
}

function closeNav() {
  navToggle.classList.remove('active');
  navOverlay.classList.remove('open');
  navOverlay.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

navToggle.addEventListener('click', () => {
  navOverlay.classList.contains('open') ? closeNav() : openNav();
});

navOverlay.querySelectorAll('.ol-link').forEach(link => {
  link.addEventListener('click', () => { closeNav(); });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeNav(); closeProject(); }
});

// ── Project detail ─────────────────────────────────────────────────────────
function openProject(idx) {
  const p = projects[idx];
  document.getElementById('pd-num').textContent   = p.num;
  document.getElementById('pd-cat').textContent   = p.category;
  document.getElementById('pd-title').textContent = p.title;
  document.getElementById('pd-year').textContent  = p.year;
  document.getElementById('pd-type').textContent  = p.type;
  document.getElementById('pd-desc').textContent  = p.desc;
  document.getElementById('pd-hero-bg').style.background = p.color;

  const list = document.getElementById('pd-detail-list');
  list.innerHTML = p.details.map(d => `<li>${d}</li>`).join('');

  const tags = document.getElementById('pd-tags');
  tags.innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');

  document.querySelector('.pd-block--dark').style.background = p.color;

  pdOverlay.classList.add('open');
  pdOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  pdOverlay.scrollTop = 0;

  pdOverlay.querySelectorAll('.pd-row, .pd-stack-row, .pd-blocks').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s var(--ease), transform 0.6s var(--ease)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 450 + i * 100);
  });
}

function closeProject() {
  pdOverlay.classList.remove('open');
  pdOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.p-card').forEach(card => {
  card.addEventListener('click', () => openProject(parseInt(card.dataset.project)));
});

pdClose.addEventListener('click', closeProject);

// ── Scroll reveals ─────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = parseFloat(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay * 1000);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── Parallax on project detail hero ───────────────────────────────────────
pdOverlay.addEventListener('scroll', () => {
  const bg = document.getElementById('pd-hero-bg');
  if (bg) bg.style.transform = `translateY(${pdOverlay.scrollTop * 0.3}px)`;
}, { passive: true });

// ── Custom cursor ──────────────────────────────────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  document.body.classList.add('has-cursor');
  const cur = document.getElementById('cursor');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('cursor-lg'));
    el.addEventListener('mouseleave', () => cur.classList.remove('cursor-lg'));
  });

  (function tick() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    cur.style.transform = `translate(${cx - 10}px, ${cy - 10}px)`;
    requestAnimationFrame(tick);
  })();
}
