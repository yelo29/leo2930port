// Get form elements
const surveyForm = document.getElementById('survey-form');
const submitButton = document.getElementById('submit');

// Add form submission handling
surveyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state to submit button
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Collect form data
    const formData = new FormData(surveyForm);
    const surveyData = {};
    
    // Process regular form fields
    for (let [key, value] of formData.entries()) {
        if (surveyData[key]) {
            // Handle multiple values (like checkboxes)
            if (Array.isArray(surveyData[key])) {
                surveyData[key].push(value);
            } else {
                surveyData[key] = [surveyData[key], value];
            }
        } else {
            surveyData[key] = value;
        }
    }
    
    // Simulate form submission delay
    setTimeout(() => {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Log the collected data (in real app, this would be sent to server)
        console.log('Survey Data Submitted:', surveyData);
        
    }, 2000);
});

// Function to show success message
function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-in;
    `;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.4s ease-out;
    `;
    
    successMessage.innerHTML = `
        <div style="color: #28a745; font-size: 4rem; margin-bottom: 20px;">✓</div>
        <h2 style="color: #2c3e50; margin-bottom: 15px;">Thank You!</h2>
        <p style="color: #6c757d; margin-bottom: 25px;">Your survey response has been submitted successfully.</p>
        <button id="close-success" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        ">Close</button>
    `;
    
    overlay.appendChild(successMessage);
    document.body.appendChild(overlay);
    
    // Add close functionality
    document.getElementById('close-success').addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(overlay);
            // Reset form
            surveyForm.reset();
        }, 300);
    });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.getElementById('close-success').click();
        }
    });
}

// Add real-time validation feedback
const inputs = document.querySelectorAll('input[required]');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.validity.valid) {
            this.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '#dc3545';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = '#28a745';
        } else if (this.value) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#dee2e6';
        }
    });
});

// Add hover effects for interactive elements
const radioItems = document.querySelectorAll('.radio-item');
const checkboxItems = document.querySelectorAll('.checkbox-item');

radioItems.forEach(item => {
    item.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Update visual state for radio group
        const groupName = radio.name;
        document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
            r.parentElement.style.background = '#f8f9fa';
            r.parentElement.style.borderColor = '#dee2e6';
        });
        
        this.style.background = '#f8f9ff';
        this.style.borderColor = '#667eea';
    });
});

checkboxItems.forEach(item => {
    item.addEventListener('click', function() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        
        // Update visual state
        if (checkbox.checked) {
            this.style.background = '#f8f9ff';
            this.style.borderColor = '#667eea';
        } else {
            this.style.background = 'white';
            this.style.borderColor = '#dee2e6';
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0; 
            transform: translateY(30px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
`;
document.head.appendChild(style);

// Add smooth scrolling to form sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.form-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});