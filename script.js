const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('header__menu--open');
});