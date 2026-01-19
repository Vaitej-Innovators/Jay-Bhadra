document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. HERO IMAGE SLIDER (ADDED)
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    const slideInterval = 5000; // Change image every 5 seconds
    let currentSlide = 0;

    function nextSlide() {
        // Only run if slides exist to avoid errors
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    // Start the slider timer
    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    /* =========================================
       2. PRELOADER
       ========================================= */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Slight delay to ensure smooth transition
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 800);
        });
    }

    /* =========================================
       3. MAGNETIC CURSOR
       ========================================= */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        // Move cursor
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .tech-card, input, select, textarea, .feature-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hovered');
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hovered');
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    /* =========================================
       4. SCROLL PROGRESS BAR
       ========================================= */
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }

    /* =========================================
       5. SCROLL REVEAL ANIMATION (Intersection Observer)
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       6. NUMBER COUNTER ANIMATION
       ========================================= */
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + "+"; // Add '+' sign at the end
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* =========================================
       7. MOBILE MENU TOGGLE
       ========================================= */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Toggle Flex display for mobile menu
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    /* =========================================
       8. HERO PARALLAX EFFECT
       ========================================= */
    const heroContent = document.getElementById('parallax-content');
    
    if (heroContent) {
        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY;
            // Move content up faster than scroll for depth effect
            heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. HERO IMAGE SLIDER
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    const slideInterval = 5000;
    let currentSlide = 0;

    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }
    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    /* =========================================
       2. MOBILE MENU TOGGLE (FIXED)
       ========================================= */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            // Toggle visibility class
            navLinks.classList.toggle('mobile-active');
            
            // Switch Icon (Bars <-> X)
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                menuBtn.style.transform = 'rotate(90deg)';
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                menuBtn.style.transform = 'rotate(0deg)';
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                menuBtn.style.transform = 'rotate(0deg)';
            });
        });
    }

    /* =========================================
       3. PRELOADER & SCROLL
       ========================================= */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 800);
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }
    
    // Parallax
    const heroContent = document.getElementById('parallax-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY;
            heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
        });
    }
});