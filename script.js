const slidesContainer = document.getElementById('slides-container')
const slides = slidesContainer.children
const indicatorContainer = document.getElementById('indicator-container')
const nextButton = document.getElementById('next-button')
const prevButton = document.getElementById('prev-button')

const slideWidth = slides[0].offsetWidth

let loopRight = false
let loopLeft = false
let clickCount = 0

const insertSlidesClones = () => {
    slidesContainer.style.transform = `translate(${-slideWidth}px)`
    const cloneFirst = slides[0].cloneNode(true)
    const cloneLast = slides[slides.length - 1].cloneNode(true)
    slidesContainer.prepend(cloneLast)
    slidesContainer.appendChild(cloneFirst)
}

const populateIndicator = (() => {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span')
        dot.className = 'indicator-dot'
        indicatorContainer.appendChild(dot)
    }
    let firstDot = indicatorContainer.children[0]
    firstDot.classList.add('active')
    slidesWithoutClones = slides
    insertSlidesClones()
})()

const updateIndicator = (currentSlide) => {
    const indicatorDots = document.getElementsByClassName('indicator-dot')

    for (let i = 0; i < indicatorDots.length; i++) {
        if (i === currentSlide) {
            indicatorDots[i].classList.add('active')
        } else {
            indicatorDots[i].classList.remove('active')
        }
    }
}

nextButton.addEventListener('click', () => {
    clickCount++
    slidesContainer.style.transform = `translate(${(-slideWidth * clickCount) - slideWidth}px)`

    if (clickCount === slides.length - 2) {
        loopRight = true
        loopLeft = false
        clickCount = 0
    } else {
        loopRight = false
    }
    slidesContainer.style.transition = 'all 0.5s'
    updateIndicator(clickCount)
})

prevButton.addEventListener('click', () => {
    clickCount--
    slidesContainer.style.transform = `translate(${(-slideWidth * clickCount) - slideWidth}px)`

    if (clickCount === -1) {
        loopLeft = true
        loopRight = false
        clickCount = slides.length - 3
    } else {
        loopLeft = false
    }

    slidesContainer.style.transition = 'all 0.5s'
    updateIndicator(clickCount)
})

slidesContainer.addEventListener('transitionend', () => {
    if (loopRight) {
        slidesContainer.style.transition = 'none'
        slidesContainer.style.transform = `translate(${-slideWidth}px)`
    } else if (loopLeft) {
        slidesContainer.style.transition = 'none'
        slidesContainer.style.transform = `translate(${(-slideWidth * (slides.length - 2))}px)`
    }
})
