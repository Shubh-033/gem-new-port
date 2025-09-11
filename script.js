document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section, header');

    // Function to remove 'active' class from all nav links
    function removeActiveClasses() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    // Function to add 'active' class to the current nav link
    function addActiveClass(id) {
        const link = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
        if (link) {
            link.classList.add('active');
        }
    }

    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            removeActiveClasses();
            this.classList.add('active');
        });
    });

    // Scrollspy logic
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) { // 60 is navbar height offset
                current = section.getAttribute('id');
            }
        });

        removeActiveClasses();
        addActiveClass(current);
    });

    // Set the 'Home' link as active by default on page load
    const homeLink = document.querySelector('a[href="#home"]');
    if(homeLink) {
        homeLink.classList.add('active');
    }

    // Initialize AOS
    AOS.init({
        duration: 1000, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
    });

    // Initialize Typed.js
    const typed = new Typed('#typed-name', {
        strings: ['Subham Singh Negi'],
        typeSpeed: 70,
        backSpeed: 50,
        loop: false,
        showCursor: true,
        cursorChar: '|',
    });

    // Custom Cursor
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate([
            {left: `${posX}px`, top: `${posY}px`}
        ], {
            duration: 500, 
            fill: "forwards"
        });
    });
});
