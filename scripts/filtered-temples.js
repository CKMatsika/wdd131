// Filtered Temple Album JavaScript

// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add three more temple objects
    {
        templeName: "Harare Zimbabwe",
        location: "Harare, Zimbabwe",
        dedicated: "2021, August, 14",
        area: 17250,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/harare-zimbabwe-temple/harare-zimbabwe-temple-9603-main.jpg"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 14500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple-exterior-1136696-wallpaper.jpg"
    },
    {
        templeName: "Nauvoo Illinois",
        location: "Nauvoo, Illinois, United States",
        dedicated: "1846, April, 30",
        area: 54000,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/400x250/nauvoo-illinois-temple-exterior-1409537-wallpaper.jpg"
    }
];

// Function to create temple cards
function displayTemples(templeList) {
    const templeGrid = document.getElementById('temple-grid');
    templeGrid.innerHTML = ''; // Clear existing content
    
    templeList.forEach(temple => {
        // Create temple card elements
        const templeCard = document.createElement('div');
        templeCard.classList.add('temple-card');
        
        // Create temple image with lazy loading
        const templeImage = document.createElement('img');
        templeImage.src = temple.imageUrl;
        templeImage.alt = temple.templeName;
        templeImage.loading = 'lazy'; // Add lazy loading
        
        // Create temple info container
        const templeInfo = document.createElement('div');
        templeInfo.classList.add('temple-info');
        
        // Create and add temple name
        const templeName = document.createElement('h3');
        templeName.textContent = temple.templeName;
        
        // Create and add temple location
        const templeLocation = document.createElement('p');
        templeLocation.innerHTML = `<span class="temple-location-label">Location:</span> <span class="temple-location">${temple.location}</span>`;
        
        // Create and add temple dedication date
        const templeDedication = document.createElement('p');
        templeDedication.innerHTML = `<span class="temple-dedicated-label">Dedicated:</span> <span class="temple-dedicated">${temple.dedicated}</span>`;
        
        // Create and add temple area
        const templeArea = document.createElement('p');
        templeArea.innerHTML = `<span class="temple-area-label">Size:</span> <span class="temple-area">${temple.area.toLocaleString()} sq ft</span>`;
        
        // Assemble the temple card (info first, then image)
        templeInfo.appendChild(templeName);
        templeInfo.appendChild(templeLocation);
        templeInfo.appendChild(templeDedication);
        templeInfo.appendChild(templeArea);
        
        // Add info first, then image (to match the updated CSS)
        templeCard.appendChild(templeInfo);
        templeCard.appendChild(templeImage);
        
        // Add the temple card to the grid
        templeGrid.appendChild(templeCard);
    });
}

// Filter temples based on criteria
function filterTemples(filter) {
    let filteredTemples = [];
    
    switch(filter) {
        case 'old':
            // Temples built before 1900
            filteredTemples = temples.filter(temple => {
                const dedicationYear = parseInt(temple.dedicated.split(',')[0]);
                return dedicationYear < 1900;
            });
            break;
        
        case 'new':
            // Temples built after 2000
            filteredTemples = temples.filter(temple => {
                const dedicationYear = parseInt(temple.dedicated.split(',')[0]);
                return dedicationYear > 2000;
            });
            break;
        
        case 'large':
            // Temples larger than 90,000 square feet
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        
        case 'small':
            // Temples smaller than 10,000 square feet
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        
        default:
            // Home - display all temples
            filteredTemples = temples;
    }
    
    // Update the heading to reflect the filter
    document.querySelector('main h1').textContent = 
        filter.charAt(0).toUpperCase() + filter.slice(1);
    
    // Display the filtered temples
    displayTemples(filteredTemples);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add current year to footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add last modified date to footer
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
    
    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburgerBtn && navMenu) {
        // Toggle menu when hamburger button is clicked
        hamburgerBtn.addEventListener('click', function() {
            navMenu.classList.add('show');
        });
    }
    
    if (closeBtn && navMenu) {
        // Close menu when X button is clicked
        closeBtn.addEventListener('click', function() {
            navMenu.classList.remove('show');
        });
    }
    
    // Set up navigation filters
    setupNavigation();
    
    // Display all temples initially
    filterTemples('home');
});

// Function to set up navigation
function setupNavigation() {
    // Try using the navigation links that are currently in your HTML
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const linkText = this.textContent.trim().toLowerCase();
            setActiveLink(this);
            filterTemples(linkText);
        });
    });
}

// Function to set active link
function setActiveLink(clickedLink) {
    if (!clickedLink) return;
    
    // Remove active class from all links
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    clickedLink.classList.add('active');
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('show');
    }
}