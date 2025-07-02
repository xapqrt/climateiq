// Carbon Footprint Calculator JavaScript
// Get all slider elements
const streamingSlider = document.getElementById('streaming');
const socialSlider = document.getElementById('social');
const gamingSlider = document.getElementById('gaming');

// Get display elements
const streamingValue = streamingSlider.parentElement.querySelector('.input-value');
const socialValue = socialSlider.parentElement.querySelector('.input-value');
const gamingValue = gamingSlider.parentElement.querySelector('.input-value');

// Get result elements
const resultValue = document.querySelector('.result-value');
const resultEquivalent = document.querySelector('.result-equivalent');

// Carbon emission rates (kg CO2 per hour)
const emissionRates = {
    streaming: 0.15, // 150g per hour
    social: 0.05,    // 50g per hour
    gaming: 0.22     // 220g per hour
};

function updateSliderValue(slider, valueElement, unit = 'hours') {
    const value = slider.value;
    valueElement.textContent = `${value} ${unit}`;
}

function calculateCarbonFootprint() {
    const streaming = parseInt(streamingSlider.value);
    const social = parseInt(socialSlider.value);
    const gaming = parseInt(gamingSlider.value);

    const totalKgCO2 = (
        streaming * emissionRates.streaming +
        social * emissionRates.social +
        gaming * emissionRates.gaming
    );

    // Update the result display
    resultValue.textContent = `~${totalKgCO2.toFixed(2)} kg CO₂`;
    
    // Calculate car equivalent (assuming 0.25 kg CO2 per km)
    const carKm = (totalKgCO2 / 0.25).toFixed(1);
    resultEquivalent.textContent = `Equivalent to driving ${carKm} km in a car`;
}

// Add event listeners for streaming slider
streamingSlider.addEventListener('input', function() {
    updateSliderValue(this, streamingValue);
    calculateCarbonFootprint();
});

// Add event listeners for social media slider
socialSlider.addEventListener('input', function() {
    updateSliderValue(this, socialValue);
    calculateCarbonFootprint();
});

// Add event listeners for gaming slider
gamingSlider.addEventListener('input', function() {
    updateSliderValue(this, gamingValue);
    calculateCarbonFootprint();
});

// Initialize the calculator with default values
calculateCarbonFootprint();

// Global Carbon Counter JavaScript
// Live counter animation and updates

// Counter elements
const dailyCO2Element = document.getElementById('daily-co2');
const yearlyCO2Element = document.getElementById('yearly-co2');
const tempRiseElement = document.getElementById('temp-rise');
const deforestationElement = document.getElementById('deforestation');

// Initial values (base values to start from)
let baseValues = {
    dailyCO2: 99847256,
    yearlyCO2: 36892451089,
    tempRise: 1.34,
    deforestation: 18739
};

// Counter rates (how much to increment per second)
const counterRates = {
    dailyCO2: 1150, // tons per second
    yearlyCO2: 1150, // tons per second (same as daily for year running total)
    tempRise: 0.000000001, // very slow temperature rise
    deforestation: 0.33 // hectares per second (29 football fields per minute / 60)
};

// Animation function for counting effect
function animateValue(element, start, end, duration, formatter) {
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        element.textContent = formatter(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Formatters for different counter types
const formatters = {
    dailyCO2: (value) => Math.floor(value).toLocaleString(),
    yearlyCO2: (value) => Math.floor(value).toLocaleString(),
    tempRise: (value) => value.toFixed(2),
    deforestation: (value) => Math.floor(value).toLocaleString()
};

// Update counters with animation
function updateCounters() {
    const now = Date.now() / 1000; // Current time in seconds
    
    // Calculate new values based on time elapsed and rates
    Object.keys(baseValues).forEach(key => {
        const element = document.getElementById(key.replace('CO2', '-co2').replace(/([A-Z])/g, '-$1').toLowerCase());
        if (element) {
            const currentValue = parseFloat(element.textContent.replace(/,/g, ''));
            const increment = counterRates[key];
            const newValue = currentValue + increment;
            
            // Animate to new value
            animateValue(element, currentValue, newValue, 800, formatters[key]);
        }
    });
}

// Start the live counter updates
function startCarbonCounter() {
    // Initial animation on page load
    setTimeout(() => {
        Object.keys(baseValues).forEach(key => {
            const element = document.getElementById(key.replace('CO2', '-co2').replace(/([A-Z])/g, '-$1').toLowerCase());
            if (element) {
                animateValue(element, 0, baseValues[key], 2000, formatters[key]);
            }
        });
    }, 500);
    
    // Update every second
    setInterval(updateCounters, 1000);
}

// Add random fluctuations to make it feel more real
function addRandomFluctuation() {
    setInterval(() => {
        // Add small random fluctuations to the rates
        counterRates.dailyCO2 = 1150 + (Math.random() - 0.5) * 100;
        counterRates.deforestation = 0.33 + (Math.random() - 0.5) * 0.1;
    }, 10000); // Every 10 seconds
}

// Pulse animation for warning elements
function addWarningPulse() {
    const warningElements = document.querySelectorAll('.counter-warning, .warning-icon');
    
    setInterval(() => {
        warningElements.forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = 'flash 2s infinite';
        });
    }, 30000); // Every 30 seconds
}

// Initialize carbon counter when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCarbonCounter();
    addRandomFluctuation();
    addWarningPulse();
});
