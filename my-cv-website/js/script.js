// js/script.js
// Minimal JS: typing animation + dark-mode toggle + simple form handling

document.addEventListener('DOMContentLoaded', function () {
  // 1) typing animation (array of phrases)
  const typingEl = document.querySelector('.typing');
  const phrases = [
    'Web Developer • Problem Solver',
    'Learning: Full-stack & Databases',
    'Minimalist UI enthusiast'
  ];
  let pIndex = 0, charIndex = 0;
  let typingDelay = 40, erasingDelay = 30, nextDelay = 1200;

  function type() {
    if (charIndex < phrases[pIndex].length) {
      typingEl.textContent += phrases[pIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, nextDelay);
    }
  }
  function erase() {
    if (charIndex > 0) {
      typingEl.textContent = phrases[pIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      pIndex = (pIndex + 1) % phrases.length;
      setTimeout(type, 300);
    }
  }
  // start typing
  setTimeout(type, 600);

  // 2) dark mode toggle
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // restore theme preference from localStorage if available
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    htmlEl.classList.add('dark');
    toggleBtn.setAttribute('aria-pressed', 'true');
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.classList.toggle('dark');
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // 3) profile image click -> open CV (tooltip provided via title attribute)
  const profileImg = document.getElementById('profile-img');
  profileImg.addEventListener('click', () => {
    window.open('assets/Aiman_CV.pdf', '_blank');
  });

  // 4) simple contact form handling (client-side validation + message)
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const clearBtn = document.getElementById('clear-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all fields before sending.';
      return;
    }
    // very light email format check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      return;
    }

    // simulate successful send (for assignment; real app would POST to server)
    formMsg.textContent = 'Message sent — thank you! (Demo only)';
    form.reset();
  });

  clearBtn.addEventListener('click', () => {
    form.reset();
    formMsg.textContent = '';
  });

  // 5) footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
