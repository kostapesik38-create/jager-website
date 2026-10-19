/* =========================================================
   Jager — скрипт сайта.
   JavaScript отвечает за поведение: здесь он открывает
   и закрывает мобильное меню. Больше на сайте ничего не нужно.
   ========================================================= */

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
  // Нажатие на «гамбургер»: открыть или закрыть меню
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  // Нажатие на любой пункт меню: закрыть меню
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}
// Появление блоков при прокрутке
const revealItems = document.querySelectorAll('.info-card, #booking, .site-footer');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  revealItems.forEach((item, i) => {
    item.classList.add('reveal');
    // карточки появляются по очереди, с небольшой задержкой
    if (item.classList.contains('info-card')) {
      item.style.transitionDelay = (i * 0.15) + 's';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // показываем один раз
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
}