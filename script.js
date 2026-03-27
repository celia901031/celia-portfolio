// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form handler
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = e.target.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Sending...';

  // Simulate sending (replace with real API call / Formspree / etc.)
  setTimeout(() => {
    status.textContent = 'Message sent! I\'ll get back to you soon.';
    status.className = 'form-status success';
    e.target.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message';

    setTimeout(() => {
      status.textContent = '';
      status.className = 'form-status';
    }, 5000);
  }, 1000);
}

// Animate skill bars when they scroll into view
const skillFills = document.querySelectorAll('.skill-fill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.style.width; // trigger reflow
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });

skillFills.forEach(el => observer.observe(el));

// Smooth active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#e2e8f0';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
