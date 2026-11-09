let lists = [
    document.getElementById('clients-list'),
    document.getElementById('clients-sublist'),
];
let buttonLeft = document.getElementById('button-left');
let buttonRight = document.getElementById('button-right');

let activeList = null;
let index = 0;

let isCentered = (list) => getComputedStyle(list).justifyContent === 'center';

function render() {
    if (!activeList) return;

    let items = activeList.children;
    if (items.length < 2) return;

    // шаг = ширина карточки + gap
    let step = items[1].offsetLeft - items[0].offsetLeft;

    // у центрированного списка нулевое смещение соответствует средней карточке
    let shift = isCentered(activeList)
        ? ((items.length - 1) / 2 - index) * step
        : -index * step;

    activeList.style.transform = `translateX(${shift}px)`;

    buttonLeft.disabled = index <= 0;
    buttonRight.disabled = index >= items.length - 1;
}

function init() {
    lists.forEach((list) => (list.style.transform = ''));

    activeList = [...lists].find((list) => getComputedStyle(list).display !== 'none') || null;
    if (!activeList) return;

    let count = activeList.children.length;
    index = isCentered(activeList) ? Math.floor((count - 1) / 2) : 0;
    render();
}

buttonLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        render();
    }
});

buttonRight.addEventListener('click', () => {
    if (activeList && index < activeList.children.length - 1) {
        index++;
        render();
    }
});

window.addEventListener('resize', init);
init();