// Array of product objects
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Function to capitalize first letter of each word
function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Populate the product select dropdown
function populateProductSelect() {
  const productSelect = document.getElementById('product');
  
  // Clear any existing options except the first one
  while (productSelect.options.length > 1) {
    productSelect.remove(1);
  }
  
  // Add product options
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;  // Use product ID as the value
    option.textContent = capitalizeWords(product.name);
    productSelect.appendChild(option);
  });
}

// Set current year in footer
function setCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Set last modified date in footer
function setLastModified() {
  const lastModifiedSpan = document.getElementById('lastModified');
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }
}

// Initialize the page
function init() {
  populateProductSelect();
  setCurrentYear();
  setLastModified();
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);