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
