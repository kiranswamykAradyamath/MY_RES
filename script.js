const certificates = [
  ['Getting Started with Artificial Intelligence', 'IBM SkillsBuild'],
  ['Power BI for Beginners', 'Simplilearn'],
  ['AGENTIC X: Next-Level AI with RAG and Generative Systems', 'BIET College'],
  ['Generative AI', 'Google Cloud'],
  ['MongoDB Node.js Developer Path', 'MongoDB'],
  ['DBMS Fundamentals and Advanced Concepts', 'Scaler'],
  ['Data Structures from C', 'Great Learning'],
  ['Acquiring Data', 'Nasscom Certification']
];

const grid = document.querySelector('#cert-grid');
certificates.forEach(([title, issuer]) => {
  const card = document.createElement('article');
  card.className = 'cert-card reveal visible';
  card.innerHTML = `<div class="cert-stamp">✓</div><p>${issuer}</p><h3>${title}</h3>`;
  grid.append(card);
});

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));

document.querySelector('.contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:kiranswamykaradyamath@gmail.com?subject=${subject}&body=${body}`;
  form.querySelector('.form-note').textContent = 'Opening your email app with the message addressed to Kiran.';
});
