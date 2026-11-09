document.addEventListener('DOMContentLoaded', () => {
  const listMain = document.getElementById('clients-list');
  const listSub = document.getElementById('clients-sublist');
  const btnLeft = document.getElementById('button-left');
  const btnRight = document.getElementById('button-right');
  const mqTablet = window.matchMedia('(max-width: 768px)');
  const mqMobile = window.matchMedia('(max-width: 320px)');

  const EDGE_ZONE = 0.2; // 20% ширины экрана с каждой стороны

  let index = 0;

  function getActiveList() {
    if (!mqTablet.matches) return null;
    return mqMobile.matches ? listMain : listSub;
  }

  function getStartIndex(list) {
    if (list === listMain) return 0; // 320px и ниже: первая карточка
    return Math.floor(list.children.length / 2); // 321-768px: средняя
  }

  function update() {
    listMain.style.transform = '';
    listSub.style.transform = '';

    const list = getActiveList();
    if (!list) return;

    const items = Array.from(list.children);
    index = Math.min(Math.max(index, 0), items.length - 1);

    const item = items[index];
    const itemCenter = item.offsetLeft - list.offsetLeft + item.offsetWidth / 2;
    const viewCenter = list.clientWidth / 2;

    list.style.transform = `translateX(${viewCenter - itemCenter}px)`;

    btnLeft.disabled = index === 0;
    btnRight.disabled = index === items.length - 1;
  }

  function reset() {
    const list = getActiveList();
    index = list ? getStartIndex(list) : 0;
    update();
  }

  // Кнопки
  btnLeft.addEventListener('click', () => {
    index -= 1;
    update();
  });

  btnRight.addEventListener('click', () => {
    index += 1;
    update();
  });

  // Нажатие на край экрана или на карточку
  document.addEventListener('click', (e) => {
    const list = getActiveList();
    if (!list) return;

    if (e.target.closest('button, a, input, textarea, select')) return;

    const width = window.innerWidth;

    if (e.clientX <= width * EDGE_ZONE) {
      index -= 1;
      update();
      return;
    }
    if (e.clientX >= width * (1 - EDGE_ZONE)) {
      index += 1;
      update();
      return;
    }

    const item = e.target.closest('li');
    if (item && item.parentElement === list) {
      index = Array.from(list.children).indexOf(item);
      update();
    }
  });

  mqTablet.addEventListener('change', reset);
  mqMobile.addEventListener('change', reset);
  window.addEventListener('resize', update);
  window.addEventListener('load', update);

  reset();
});