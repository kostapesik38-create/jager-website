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
// Появление блоков при прокрутке (работает на всех страницах)
const revealItems = document.querySelectorAll(
  '.info-card, #booking, .price-group, .cta-box, .legal-section, .legal-row, .site-footer'
);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  revealItems.forEach((item) => {
    item.classList.add('reveal');
    // карточки и группы цен, стоящие рядом, появляются по очереди
    if (item.matches('.info-card, .price-group')) {
      const position = [...item.parentElement.children].indexOf(item);
      item.style.transitionDelay = (position * 0.15) + 's';
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
}// GSAP: колесо на главной медленно парит вверх-вниз
const wheel = document.querySelector('.hero-image svg');

if (window.gsap && wheel && !reduceMotion) {
  gsap.to(wheel, {
    y: -14,              // насколько поднимается (в пикселях)
    duration: 2.5,       // сколько секунд длится подъём
    ease: 'sine.inOut',  // плавный разгон и торможение
    yoyo: true,          // потом обратно вниз
    repeat: -1           // повторять бесконечно
  });
}
