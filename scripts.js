document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const overlayNav = document.querySelector('#overlay-nav');
    const closeBtn = document.querySelector('.close-btn');

    hamburgerMenu.addEventListener('click', () => {
        overlayNav.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        overlayNav.classList.remove('active');
    });

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel img');
    const totalSlides = slides.length;

    document.querySelector('.prev').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
        slides[currentSlide].classList.add('active');
    });

    document.querySelector('.next').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
        slides[currentSlide].classList.add('active');
    });

    // Initialize the first slide as active
    slides[currentSlide].classList.add('active');

    // Swipe functionality
    let startX, startY, endX, endY;

    document.querySelector('.carousel').addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    document.querySelector('.carousel').addEventListener('touchmove', (event) => {
        endX = event.touches[0].clientX;
        endY = event.touches[0].clientY;
    });

    document.querySelector('.carousel').addEventListener('touchend', () => {
        const diffX = endX - startX;
        const diffY = endY - startY;

        // Only consider horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                // Swipe right
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
                slides[currentSlide].classList.add('active');
            } else {
                // Swipe left
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
                slides[currentSlide].classList.add('active');
            }
        }
    });
});
