// Function to get URL parameters
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  // Function to display submitted review information
  function displayReviewDetails() {
    const reviewDetailsList = document.getElementById('reviewDetails');
    
    // Get form data from URL parameters
    const product = getParameterByName('product');
    const rating = getParameterByName('rating');
    const installDate = getParameterByName('installDate');
    const userName = getParameterByName('userName');
    const review = getParameterByName('review');
    
    // Get all selected features (may be multiple)
    const features = [];
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      if (key === 'feature') {
        features.push(value);
      }
    });
  
    // Create list items for each piece of data
    const detailsToShow = [
      { label: 'Product', value: product ? capitalizeWords(product) : 'Not provided' },
      { label: 'Rating', value: rating ? `${rating} stars` : 'Not provided' },
      { label: 'Installation Date', value: installDate ? formatDate(installDate) : 'Not provided' },
      { label: 'Useful Features', value: features.length > 0 ? features.join(', ') : 'None selected' },
      { label: 'Review', value: review ? review : 'Not provided' },
      { label: 'Name', value: userName ? userName : 'Anonymous' }
    ];
  
    // Add each detail to the list
    reviewDetailsList.innerHTML = '';
    detailsToShow.forEach(detail => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
      reviewDetailsList.appendChild(li);
    });
  }
  
  // Function to format date in a more readable format
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  // Function to capitalize first letter of each word
  function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }
  
  // Function to update the review counter
  function updateReviewCounter() {
    // Get current count from localStorage or initialize to 0
    let count = localStorage.getItem('reviewCount');
    
    // If no count exists yet, start at 0
    if (count === null) {
      count = 0;
    } else {
      count = parseInt(count);
    }
    
    // Increment the count
    count++;
    
    // Save back to localStorage
    localStorage.setItem('reviewCount', count);
    
    // Update the display
    document.getElementById('reviewCount').textContent = count;
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
  
  // Initialize the confirmation page
  function init() {
    displayReviewDetails();
    updateReviewCounter();
    setCurrentYear();
    setLastModified();
  }
  
  // Run initialization when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', init);