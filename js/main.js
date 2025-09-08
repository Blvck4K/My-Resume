// Main JavaScript for Resume Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.fade-in');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this demo, we'll just show a success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                
                contactForm.appendChild(formMessage);
                contactForm.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            } else {
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all required fields correctly.';
                
                contactForm.appendChild(formMessage);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage;
        });
    }
    
    // Initialize skill bars animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
    
    // Typing effect for hero section
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroTitle.getAttribute('data-typed')) {
        const typed = heroTitle.getAttribute('data-typed').split(',');
        let currentTypedIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const currentText = typed[currentTypedIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                heroTitle.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTypedIndex = (currentTypedIndex + 1) % typed.length;
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start typing effect
        setTimeout(typeText, 1000);
    }
});