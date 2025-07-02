// fir calcuator tips page. pretty easy tbh

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.tip-checkbox');
    const resultValue = document.querySelector('.result-value');
    const resultEquivalent = document.querySelector('.result-equivalent');
    
    // Savings values for each category (in kg CO2/month)
    const savingsValues = {
        'streaming-tips': 2.4,
        'device-tips': 1.8,
        'cloud-tips': 1.2,
        'social-tips': 0.9
    };
    
    function updateCalculator() {
        let totalSavings = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalSavings += savingsValues[checkbox.id] || 0;
            }
        });
        
        // Update the display
        if (totalSavings === 0) {
            resultValue.textContent = '0 kg CO₂';
            resultEquivalent.textContent = 'Start selecting tips to see your impact!';
        } else {
            resultValue.textContent = `${totalSavings.toFixed(1)} kg CO₂`;
            
            // Calculate equivalent (rough approximation: 1 kg CO2 ≈ 4 km driving)
            const drivingEquivalent = (totalSavings * 4).toFixed(1);
            const yearlyReduction = (totalSavings * 12).toFixed(1);
            
            resultEquivalent.textContent = `Equivalent to avoiding ${drivingEquivalent} km of driving per month, or ${yearlyReduction} kg CO₂ annually!`;
        }
        
        // Add a subtle animation when values change
        resultValue.style.transform = 'scale(1.1)';
        setTimeout(() => {
            resultValue.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Add event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCalculator);
    });
    
    // Add smooth scrolling to internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to tip cards
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animate numbers on scroll (simple implementation)
    function animateOnScroll() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'countUp 1s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateOnScroll();
});

// Add CSS animation for count up effect
const style = document.createElement('style');
style.textContent = `
    @keyframes countUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .tip-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .result-value {
        transition: transform 0.15s ease;
    }
`;
document.head.appendChild(style);
