
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile Navigation Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
    });

    // Close menu when clicking any nav link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
      });
    });
  }

  /* ---------- Header Shadow on Scroll ---------- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  /* ---------- Interactive Price Calculator ---------- */
  const serviceButtons = document.querySelectorAll('#serviceOptions .select-btn');
  const carTypeButtons = document.querySelectorAll('#carTypeOptions .tab-btn');
  const calcPriceElem = document.getElementById('calcPrice');
  const calcTimeElem = document.getElementById('calcTime');

  let currentBasePrice = 150;
  let currentMultiplier = 1.0;
  let currentTime = '45 min';

  function updateCalculator() {
    if (!calcPriceElem || !calcTimeElem) return;

    const minPrice = Math.round(currentBasePrice * currentMultiplier);
    const maxPrice = Math.round(minPrice * 1.45);

    calcPriceElem.textContent = `${minPrice} – ${maxPrice} zł`;
    calcTimeElem.textContent = currentTime;
  }

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentBasePrice = parseFloat(btn.dataset.priceBase || 150);
      currentTime = btn.dataset.time || '45 min';
      updateCalculator();
    });
  });

  carTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      carTypeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentMultiplier = parseFloat(btn.dataset.multiplier || 1.0);
      updateCalculator();
    });
  });

  updateCalculator();
});
