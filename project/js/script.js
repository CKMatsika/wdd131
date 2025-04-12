/**
 * Betterlink Systems - Main JavaScript File
 * This file contains all JavaScript functionality for the Betterlink Systems website
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initMobileMenu();
    initLazyLoading();
    initTestimonialCarousel();
    initThemeSwitcher();
    initScrollAnimations();
    initFormValidation();
    
    // Load user preferences from localStorage
    loadUserPreferences();
});

/**
 * Mobile Menu Functionality
 * Handles the hamburger menu toggle for mobile devices
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Lazy Loading for Images
 * Implements lazy loading for better performance
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if (!lazyImages.length) return;
    
    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        function lazyLoad() {
            const scrollTop = window.pageYOffset;
            
            lazyImages.forEach(img => {
                if (img.offsetTop < window.innerHeight + scrollTop) {
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                }
            });
            
            // If all images are loaded, remove the scroll listener
            if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoad);
            }
        }
        
        // Load images initially
        lazyLoad();
        
        // Add scroll event to load images as user scrolls
        document.addEventListener('scroll', lazyLoad);
    }
}

/**
 * Testimonial Carousel
 * Creates an interactive carousel for testimonials
 */
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (!testimonials.length) return;
    
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected testimonial and update indicator
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Save the current index to localStorage
        localStorage.setItem('testimonialIndex', index);
    }
    
    // Navigate to the next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    }
    
    // Navigate to the previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentIndex);
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
    
    // Set up automatic rotation
    let intervalId;
    function startAutoRotation() {
        intervalId = setInterval(nextTestimonial, 5000);
    }
    
    function stopAutoRotation() {
        clearInterval(intervalId);
    }
    
    // Start automatic rotation
    startAutoRotation();
    
    // Pause rotation when user interacts
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', stopAutoRotation);
        testimonialCarousel.addEventListener('mouseleave', startAutoRotation);
    }
    
    // Load saved index from localStorage if available
    const savedIndex = localStorage.getItem('testimonialIndex');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex);
        showTestimonial(currentIndex);
    }
}

/**
 * Theme Switcher
 * Toggles between light and dark themes
 */
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (!themeToggle || !themeIcon) return;
    
    // Function to toggle theme
    function toggleTheme() {
        const isDarkTheme = document.body.classList.toggle('dark-theme');
        
        // Update icon
        if (isDarkTheme) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Save preference to localStorage
        localStorage.setItem('darkTheme', isDarkTheme);
    }
    
    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);
}

/**
 * Scroll Animations
 * Adds animation effects to elements as they scroll into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .case-study, .solution-feature, .testimonial');
    const sectionHeadings = document.querySelectorAll('.section-title, .case-study-detail h2');
    
    if (!animatedElements.length && !sectionHeadings.length) return;
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animation classes
    function animateOnScroll() {
        // Animate cards and features
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
        
        // Animate section headings
        sectionHeadings.forEach(heading => {
            if (isInViewport(heading) && !heading.classList.contains('animated')) {
                heading.classList.add('animated');
                heading.classList.add('fade-in');
            }
        });
    }
    
    // Initial check with a slight delay to ensure page is fully loaded
    setTimeout(animateOnScroll, 300);
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Also check on resize since viewport dimensions change
    window.addEventListener('resize', animateOnScroll);
}

/**
 * Form Validation
 * Validates form inputs and handles form submission
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form fields and error elements
    const formFields = [
        {
            input: document.getElementById('name'),
            error: document.getElementById('name-error'),
            required: true,
            validate: (value) => value.trim().length >= 2
        },
        {
            input: document.getElementById('email'),
            error: document.getElementById('email-error'),
            required: true,
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        {
            input: document.getElementById('organization'),
            error: document.getElementById('organization-error'),
            required: true,
            validate: (value) => value.trim().length >= 2
        },
        {
            input: document.getElementById('interest'),
            error: document.getElementById('interest-error'),
            required: true,
            validate: (value) => value.trim() !== ''
        },
        {
            input: document.getElementById('message'),
            error: document.getElementById('message-error'),
            required: true,
            validate: (value) => value.trim().length >= 10
        },
        {
            input: document.getElementById('consent'),
            error: document.getElementById('consent-error'),
            required: true,
            validate: (value) => value === true
        }
    ];
    
    // Form messages container
    const formMessages = document.getElementById('form-messages');
    
    // Function to validate a single field
    function validateField(field) {
        if (!field.input) return true;
        
        const value = field.input.type === 'checkbox' ? field.input.checked : field.input.value;
        
        // Check if required and empty
        if (field.required && (value === '' || value === false)) {
            field.error.textContent = `This field is required`;
            field.input.classList.add('error');
            return false;
        }
        
        // Run validation function if value exists
        if (value && !field.validate(value)) {
            field.error.textContent = getErrorMessage(field.input.id);
            field.input.classList.add('error');
            return false;
        }
        
        // Clear error if valid
        field.error.textContent = '';
        field.input.classList.remove('error');
        return true;
    }
    
    // Get specific error messages based on field ID
    function getErrorMessage(fieldId) {
        const errorMessages = {
            'name': 'Please enter a valid name (at least 2 characters)',
            'email': 'Please enter a valid email address',
            'organization': 'Please enter your organization name',
            'interest': 'Please select an area of interest',
            'message': 'Please enter a message (at least 10 characters)',
            'consent': 'You must agree to the privacy policy'
        };
        
        return errorMessages[fieldId] || 'Invalid input';
    }
    
    // Function to validate all fields
    function validateForm() {
        let isValid = true;
        
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Function to show form message
    function showFormMessage(message, type) {
        formMessages.innerHTML = `<div class="form-message ${type}">${message}</div>`;
        
        // Automatically clear message after 5 seconds
        setTimeout(() => {
            formMessages.innerHTML = '';
        }, 5000);
    }
    
    // Function to handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showFormMessage('Please correct the errors below.', 'error');
            return;
        }
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value,
            consent: document.getElementById('consent').checked
        };
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message and clear the form
        
        // Store the inquiry in localStorage for demonstration purposes
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        inquiries.push({
            ...formData,
            date: new Date().toISOString()
        });
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        
        // Show success message
        showFormMessage('Thank you for your message! We\'ll be in touch soon.', 'success');
        
        // Reset form
        contactForm.reset();
    }
    
    // Add event listeners for real-time validation
    formFields.forEach(field => {
        if (!field.input) return;
        
        field.input.addEventListener('blur', () => {
            validateField(field);
        });
        
        field.input.addEventListener('input', () => {
            if (field.input.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // Add form submission handler
    contactForm.addEventListener('submit', handleSubmit);
}

/**
 * Load User Preferences
 * Loads saved preferences from localStorage
 */
function loadUserPreferences() {
    // Load theme preference
    const darkTheme = localStorage.getItem('darkTheme');
    const themeIcon = document.querySelector('#theme-toggle i');
    
    if (darkTheme === 'true') {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Other preferences can be loaded here
}

/**
 * Event tracking and analytics (for demonstration)
 * This would be integrated with a real analytics service in production
 */
function trackEvent(category, action, label) {
    // Create an array to store events if it doesn't exist
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Add the new event
    events.push({
        category,
        action,
        label,
        timestamp: new Date().toISOString()
    });
    
    // Store back in localStorage
    localStorage.setItem('events', JSON.stringify(events));
    
    // In a real application, this would send data to an analytics service
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track page views
trackEvent('Page', 'View', document.title);

// Add click tracking to CTAs
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('CTA', 'Click', button.textContent.trim());
        });
    });
});