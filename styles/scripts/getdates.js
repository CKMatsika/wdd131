// Get current year for copyright
document.addEventListener('DOMContentLoaded', function() {
    // Set the current year in the footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    // Set the last modified date in the footer
    document.getElementById('lastModified').textContent = 'Last Modification: ' + document.lastModified;
});