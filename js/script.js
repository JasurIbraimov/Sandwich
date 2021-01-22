window.addEventListener('DOMContentLoaded', () => {
    const slideDownBtn = document.getElementById('slideDown'),
            slideUpBtn = document.getElementById('slideUp'),
            slideToUpBtn = document.getElementById('slideToUp'),
            slideToDownBtn = document.getElementById('slideToDown'),
            slider = document.querySelector('.slider'),
            slides = document.querySelectorAll('.slide'),
            slideCount = document.getElementById('slideCount'),
            turnOnBtn = document.getElementById('turnOn'),
            turnOffBtn = document.getElementById('turnOff'),
            mainContainer = document.querySelector('.container'),
            cards = document.querySelectorAll('.card'),
            randomBtn = document.getElementById('random'),
            cookBtn = document.getElementById('cook'),
            resetBtn = document.getElementById('reset'),
            moreOptions = document.getElementById('moreOptions'),
            sliderSections = document.querySelectorAll('.slider .slide'),
            options = document.querySelector('.options'),
            optionsRight = document.querySelector('.options__right'),
            mealIngredientsImgs = document.querySelectorAll('.meal .meal__ingredient img')
    let i = 0,
        choice = {},
        popupShown = false

    const tipPopup = () => {
        document.querySelector('.more .tip').classList.add('tip__popup')
        setTimeout(() => {
            document.querySelector('.more .tip').classList.remove('tip__popup')
        }, 2000)
    }
    // App start
    turnOnBtn.addEventListener('click', () => {
        mainContainer.classList.remove('turnedOff') 
        if(!popupShown) {
            tipPopup()
        }
    })
    
    turnOffBtn.addEventListener('click', () => {
        mainContainer.classList.add('turnedOff')
        document.querySelector('.more .tip').classList.remove('tip__popup')
        popupShown = true
    })

    // Initialize function 
    const initialize = () => {
        i = 0
        slider.style.transform = `translateY(0%)`
        slideCount.innerHTML = `0${i + 1}`;
        slideUpBtn.setAttribute('disabled', true)
        slideDownBtn.removeAttribute('disabled')
        sliderSections.forEach(section => {
            section.removeAttribute('data-current')
        })
        sliderSections[i].setAttribute('data-current', true)
        choice = {
            bread: '',
            lettuce: '',
            sausage: '',
            cheese: '',
            tomato: ''
        }
        cookBtn.setAttribute('disabled', true)
        resetBtn.setAttribute('disabled', true)
        cards.forEach(card => {
            card.classList.remove('active')
        })
        options.classList.remove('cooked')
    }

    // Call it to set all initial params
    initialize()

    slideDownBtn.addEventListener('click', () => {
        i++
        slider.style.transform = `translateY(calc(-100% * ${i}))`
        slideCount.innerHTML = `0${i + 1}`;
        sliderSections.forEach(section => {
            section.removeAttribute('data-current')
        })
        sliderSections[i].setAttribute('data-current', true)
        if(i !== slides.length - 2) {
            slideUpBtn.removeAttribute('disabled')
            slideDownBtn.removeAttribute('disabled')
        } else {
            slideDownBtn.setAttribute('disabled', true)
            slideUpBtn.removeAttribute('disabled')
            console.log(choice)
        }
    })

    slideUpBtn.addEventListener('click', () => {
        slider.style.transform = `translateY(calc(-100% * ${i} + 100%))`
        i--
        slideCount.innerHTML = `0${i + 1}`;
        sliderSections.forEach(section => {
            section.removeAttribute('data-current')
        })
        sliderSections[i].setAttribute('data-current', true)
        if(i !== 0) {
            slideUpBtn.removeAttribute('disabled')
            slideDownBtn.removeAttribute('disabled')
        } else {
            slideUpBtn.setAttribute('disabled', true)
            slideDownBtn.removeAttribute('disabled')
        }
    })
    
    slideToUpBtn.addEventListener('click', () => {
        slider.style.transform = `translateY(0%)`
        i = 0
        slideCount.innerHTML = `0${i + 1}`;
        sliderSections.forEach(section => {
            section.removeAttribute('data-current')
        })
        sliderSections[i].setAttribute('data-current', true)
        slideUpBtn.setAttribute('disabled', true)
        slideDownBtn.removeAttribute('disabled')
    })

    slideToDownBtn.addEventListener('click', () => {
        slider.style.transform = `translateY(calc(-100% * ${slides.length - 2}))`
        i = slides.length - 2
        slideCount.innerHTML = `0${i + 1}`;
        sliderSections.forEach(section => {
            section.removeAttribute('data-current')
        })
        sliderSections[i].setAttribute('data-current', true)
        slideUpBtn.removeAttribute('disabled')
        slideDownBtn.setAttribute('disabled', true)

    })

    // Setting active card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            choice[card.getAttribute('data-choice')] = card.getAttribute('id')
            console.log(choice)
            cards.forEach(c => {
                if(c.getAttribute('data-choice') === card.getAttribute('data-choice')) {
                    c.classList.remove('active')
                }
            })
            card.classList.add('active')
            resetBtn.removeAttribute('disabled')
            if(Object.values(choice).every(el => el.length)) {
                cookBtn.removeAttribute('disabled')
                optionsRight.classList.add('options__popup')
            }
        })
    })

    // Random Btn
    randomBtn.addEventListener('click', () => {
        sliderSections.forEach(section => {
            if(section.getAttribute('data-current')) {
                const elements = section.querySelectorAll('.slide__cards .card')
                const rndElement = elements[Math.floor(Math.random() * elements.length)]
    
                elements.forEach(el => {
                    el.classList.remove('active')
                })
                rndElement.classList.add('active')
                choice[elements[0].getAttribute('data-choice')] = rndElement.getAttribute('id')
                console.log(choice)
            }
            resetBtn.removeAttribute('disabled')
            if(Object.values(choice).every(el => el.length)) {
                cookBtn.removeAttribute('disabled')
                optionsRight.classList.add('options__popup')
            }
        })
    })

    // Reset btn
    resetBtn.addEventListener('click', () => {
        initialize()
        document.querySelector('.options__right').classList.remove('options__popup')

    })

    // Cook btn
    cookBtn.addEventListener('click', () => {
        slider.style.transform = `translateY(calc(-100% * ${slides.length - 1}))`
        options.classList.add('cooked')
        mealIngredientsImgs.forEach(img => {
            if(choice[img.getAttribute('data-choice')] === 'none') {
                img.style.visibility = 'hidden'
            } else {
                img.style.visibility = 'visible'
                img.setAttribute('src', `img/cooked/${choice[img.getAttribute('data-choice')]}.png`)
            }
        })
    })

    // Show more options 
    moreOptions.addEventListener('click', () => {
        optionsRight.classList.toggle('options__popup')
        document.querySelector('.more .tip').classList.remove('tip__popup')
    })

})