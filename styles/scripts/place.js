// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set the current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Set the last modified date in the footer
    document.getElementById('last-modified').textContent = document.lastModified;
    
    // Get the temperature and wind speed values from the page
    const temperature = parseFloat(document.getElementById('temperature').textContent);
    const windSpeed = parseFloat(document.getElementById('wind-speed').textContent);
    
    // Calculate and display the wind chill
    displayWindChill(temperature, windSpeed);
});

/**
 * Calculates the wind chill factor using temperature in Celsius and wind speed in km/h
 * @param {number} temp - Temperature in Celsius
 * @param {number} speed - Wind speed in km/h
 * @returns {number} - Wind chill factor in Celsius
 */
function calculateWindChill(temp, speed) {
    // Wind chill formula for Celsius and km/h
    // Formula: 13.12 + 0.6215 * T - 11.37 * (V^0.16) + 0.3965 * T * (V^0.16)
    // Where T is temperature in Celsius and V is wind speed in km/h
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

/**
 * Checks if wind chill calculation is applicable and displays the result
 * @param {number} temp - Temperature in Celsius
 * @param {number} speed - Wind speed in km/h
 */
function displayWindChill(temp, speed) {
    const windChillElement = document.getElementById('wind-chill');
    
    // Check if conditions are met for wind chill calculation
    // For Celsius: temp <= 10°C and speed > 4.8 km/h
    if (temp <= 10 && speed > 4.8) {
        // Calculate wind chill and round to one decimal place
        const windChill = calculateWindChill(temp, speed).toFixed(1);
        windChillElement.textContent = `${windChill} °C`;
    } else {
        // If conditions are not met, display N/A
        windChillElement.textContent = "N/A";
    }
}