document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('#hamburger-menu');
    const overlayNav = document.querySelector('#overlay-nav');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelectorAll('#overlay-nav-links a');

    hamburgerMenu.addEventListener('click', () => {
        overlayNav.classList.add('active');
        overlayNav.setAttribute('aria-hidden', 'false');
        hamburgerMenu.setAttribute('aria-expanded', 'true');
        closeBtn.focus(); // Move focus to the close button
    });

    closeBtn.addEventListener('click', () => {
        overlayNav.classList.remove('active');
        overlayNav.setAttribute('aria-hidden', 'true');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        hamburgerMenu.focus(); // Move focus back to the hamburger menu
    });

    // Close the overlay when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlayNav.classList.remove('active');
            overlayNav.setAttribute('aria-hidden', 'true');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Initialize the first slide as active
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
