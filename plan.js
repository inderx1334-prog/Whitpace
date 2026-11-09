let planList = document.getElementById('plan-list');
let buttonPrev = document.getElementById('button-prev');
let buttonNext = document.getElementById('button-next');
let slide = 0;


const EDGE_ZONE = 0.2;

function moveSlider() {
    const step = window.innerWidth <= 500 ? 321 : 472;
    planList.style.transform = `translateX(${slide * step}px)`;
}

function sliderNext() {
    if (slide >= 0) {
        slide = slide - 1;
        moveSlider();
    }
}

function sliderPrev() {
    if (slide < 1) {
        slide = slide + 1;
        moveSlider();
    }
}

buttonPrev.addEventListener('click', sliderPrev);
buttonNext.addEventListener('click', sliderNext);


document.addEventListener('click', (e) => {
    // Не мешаем кнопкам, ссылкам и полям ввода
    if (e.target.closest('button, a, input, textarea, select')) return;

    const x = e.clientX;
    const width = window.innerWidth;

    if (x <= width * EDGE_ZONE) {
        sliderPrev();       // левый край: назад
    } else if (x >= width * (1 - EDGE_ZONE)) {
        sliderNext();       // правый край: вперёд
    }
});