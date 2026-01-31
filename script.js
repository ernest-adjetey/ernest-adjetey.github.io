// Navigation menu toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Mobile menu toggle
    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle navigation
            navLinks.classList.toggle('nav-active');
            
            // Burger animation
            burger.classList.toggle('toggle');
            
            // Toggle burger lines
            const lines = burger.querySelectorAll('div');
            lines.forEach(line => {
                line.classList.toggle('toggle');
            });
        });
    }
    
    // Close mobile menu when clicking a nav link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                // Remove toggle class from burger lines
                const lines = burger.querySelectorAll('div');
                lines.forEach(line => {
                    line.classList.remove('toggle');
                });
            }
            
            // Update active link
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Active navigation highlight based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active link
                navItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const formStatus = document.getElementById('form-status');
            
            // Simple validation
            if (!name || !email || !message) {
                formStatus.innerHTML = '<p class="form-error">Please fill in all required fields.</p>';
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.innerHTML = '<p class="form-error">Please enter a valid email address.</p>';
                return;
            }
            
            // Simulate form submission (in a real application, you would send this to a server)
            formStatus.innerHTML = '<p class="form-success">Thank you for your message! I\'ll get back to you soon.</p>';
            
            // Reset form
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
    }
    
    // Add animation on scroll for project cards
    const fadeInElements = document.querySelectorAll('.project-card, .activity-card, .timeline-item');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.classList.add('fade-element');
        fadeInObserver.observe(element);
    });
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Burger animation toggle
const burgerToggle = () => {
    const burger = document.querySelector('.burger');
    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('toggle');
        });
    }
};

// Initialize on page load
window.onload = function() {
    burgerToggle();
    
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
};