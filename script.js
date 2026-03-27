// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = e.target.querySelector('.submit-btn');

  btn.disabled = true;
  btn.textContent = 'SENDING...';

  setTimeout(() => {
    status.textContent = "Message sent — I'll be in touch soon.";
    status.className = 'form-status success';
    e.target.reset();
    btn.disabled = false;
    btn.textContent = 'SEND MESSAGE →';

    setTimeout(() => {
      status.textContent = '';
      status.className = 'form-status';
    }, 5000);
  }, 1000);
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a:not(.nav-logo)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.style.color = isActive ? 'var(--black)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Subtle parallax on bleed text
const bleedEls = document.querySelectorAll('.bleed-text');

window.addEventListener('scroll', () => {
  bleedEls.forEach(el => {
    const parent = el.closest('section') || el.parentElement;
    const rect = parent.getBoundingClientRect();
    const progress = -rect.top / window.innerHeight;
    el.style.transform = `translateX(${progress * 40}px)`;
  });
}, { passive: true });
