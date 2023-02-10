

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