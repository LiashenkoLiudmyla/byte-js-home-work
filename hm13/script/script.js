//  I var ///////////////////////////////


//   /* цей код позначає картинки, для зручності розробки */
//   let i = 1;
//   for(let li of carousel.querySelectorAll('li')) {
//     li.style.position = 'relative';
//     li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
//     i++;
//   }

//   /* Конфігурація */
//   let width = 250; // ширина зображення
//   let count = 1; // видима кількість зображень

//   let list = carousel.querySelector('ul');
//   let listElems = carousel.querySelectorAll('li');

//   let position = 0; // початкова позиція каруселі

//   carousel.querySelector('.prev').onclick = function() {
//     // зсув ліворуч
//     position += width * count;
//     // останній зсув вліво може бути не на 3, а на 2 або 1 елемент
//     position = Math.min(position, 0)
//     list.style.marginLeft = position + 'px';
//   };

//   carousel.querySelector('.next').onclick = function() {
//     // зсув праворуч
//     position -= width * count;
//     // останнє пересування вправо може бути не на 3, а на 2 або 1 елемент
//     position = Math.max(position, -width * (listElems.length - count));
//     list.style.marginLeft = position + 'px';
//   };


//  II var ////////////////////////////


const slides = [...document.querySelectorAll('.slide')]; // повертає NodeList псевдомасив

const prevBth = document.getElementById('bth-prev');

const nextBth  = document.getElementById('bth-next');


let currentSlideIndex = 0;

//Сховаьт всі слайди окрім першого при повній загрузці DOM
const hideSlidesOnLoad = () => {
    const slidesToHide = slides.slice(1)

    slidesToHide.forEach((slide) => {
        slide.classList.add('hidden')
    })

}

window.addEventListener('DOMContentLoaded', hideSlidesOnLoad)

const showPrevSlide = () =>  {

    slides[currentSlideIndex].classList.add('hidden')

    if(currentSlideIndex === 0) {
        slides[slides.length - 1].classList.remove('hidden')
        currentSlideIndex = slides.length - 1
     }else{
        slides[currentSlideIndex -1].classList.remove('hidden')
        currentSlideIndex--
     }
}

const showNextSlide = () => {

    slides[currentSlideIndex].classList.add('hidden')

    if(currentSlideIndex === slides.length - 1){

        slides[0].classList.remove('hidden')
        currentSlideIndex = 0

    }else{

        slides[currentSlideIndex + 1].classList.remove('hidden')
        currentSlideIndex++
    }
}

prevBth.addEventListener('click', showPrevSlide)
nextBth.addEventListener('click', showNextSlide)