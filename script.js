const certificates = [
  ['Getting Started with Artificial Intelligence', 'IBM SkillsBuild', 'ibm.jpg'],
  ['Power BI for Beginners', 'Simplilearn', 'bi.jpg'],
  ['AGENTIC X: Next-Level AI with RAG and Generative Systems', 'BIET College', 'rag.jpg'],
  ['Generative AI', 'Google Cloud', 'ai.jpg'],
  ['MongoDB Node.js Developer Path', 'MongoDB', 'mongo.jpg'],
  ['DBMS Fundamentals and Advanced Concepts', 'Scaler', 'dbms.jpg'],
  ['Data Structures from C', 'Great Learning', 'dsa.jpg'],
  ['Acquiring Data', 'Nasscom Certification', 'acquring data.png']
];

const grid = document.querySelector('#cert-grid');
certificates.forEach(([title, issuer, filename]) => {
  const card = document.createElement('article');
  card.className = 'cert-card reveal visible';
  card.innerHTML = `<div class="cert-stamp">✓</div><p>${issuer}</p><h3>${title}</h3><label class="certificate-upload" aria-label="Replace proof for ${title}"><img class="cert-preview default-certificate" src="certificares/${filename}" alt="${title} certificate"><input type="file" accept="image/*,application/pdf"></label>`;

  const input = card.querySelector('input');
  const box = card.querySelector('.certificate-upload');
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    box.querySelectorAll('.cert-preview,.pdf-chip,.clear-upload').forEach(el => el.remove());
    const clear = document.createElement('button');
    clear.type = 'button'; clear.className = 'clear-upload'; clear.textContent = '×';
    clear.setAttribute('aria-label', 'Restore original certificate');
    clear.addEventListener('click', event => {
      event.preventDefault(); input.value = ''; box.style.aspectRatio = '';
      box.querySelectorAll('.cert-preview,.pdf-chip,.clear-upload').forEach(el => el.remove());
      box.insertAdjacentHTML('afterbegin', `<img class="cert-preview default-certificate" src="certificares/${filename}" alt="${title} certificate">`);
    });
    if (file.type.startsWith('image/')) {
      const image = document.createElement('img');
      image.className = 'cert-preview'; image.alt = 'Uploaded certificate preview';
      image.onload = () => { box.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`; };
      image.src = URL.createObjectURL(file); box.append(image);
    } else {
      const chip = document.createElement('span');
      chip.className = 'pdf-chip'; chip.textContent = `PDF · ${file.name}`; box.append(chip);
    }
    box.append(clear);
  });
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
