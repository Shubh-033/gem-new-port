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

    // Scrollspy and Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Scrollspy logic
        let current = '';
        const scrollY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const documentHeight = document.body.offsetHeight;

        // Check if scrolled to the very bottom
        if (scrollY + viewportHeight >= documentHeight - 5) { // -5 for a small buffer
            current = sections[sections.length - 1].getAttribute('id'); // Force last section to be active
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                // Check if the top of the section is in view or past the top of the viewport
                // and if the bottom of the section is still in view or below the viewport
                if (scrollY >= sectionTop - 60 && scrollY < sectionTop + sectionHeight - 60) {
                    current = section.getAttribute('id');
                }
            });
        }

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

    // Initialize Typed.js for name
    const typedName = new Typed('#typed-name', {
        strings: ['Subham Singh Negi'],
        typeSpeed: 70,
        backSpeed: 50,
        loop: false,
        showCursor: true,
        cursorChar: '|'
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

    // AJAX Contact Form Submission
    const form = document.querySelector('#contact form');
    const formStatus = document.querySelector('#form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...`;
        submitButton.disabled = true;

        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.innerHTML = "Thank you for your message! I'll get back to you soon.";
                formStatus.classList.add('text-success');
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        formStatus.innerHTML = "Oops! There was a problem submitting your form";
                        formStatus.classList.add('text-danger');
                    }
                })
            }
        }).catch(error => {
            formStatus.innerHTML = "Oops! There was a problem submitting your form";
            formStatus.classList.add('text-danger');
        });
    }
    form.addEventListener("submit", handleSubmit);

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
