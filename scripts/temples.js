// Temple Album JavaScript

// Add current year to footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Add last modified date to footer
document.getElementById('lastModified').textContent = document.lastModified;

// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const navMenu = document.getElementById('nav-menu');

// Toggle menu when hamburger button is clicked
hamburgerBtn.addEventListener('click', function() {
    navMenu.classList.add('show');
});

// Close menu when X button is clicked
closeBtn.addEventListener('click', function() {
    navMenu.classList.remove('show');
});

// Handle navigation links
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Prevent default link behavior
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Update the h1 heading to match the clicked link text
        document.querySelector('main h1').textContent = this.textContent;
        
        // Close the mobile menu if it's open
        navMenu.classList.remove('show');
    });
});