function convertToRoman(num) {
    const values = [
        1000, 900, 500, 400,
        100, 90, 50, 40,
        10, 9, 5, 4, 1
    ];
    
    const numerals = [
        'M', 'CM', 'D', 'CD',
        'C', 'XC', 'L', 'XL',
        'X', 'IX', 'V', 'IV', 'I'
    ];
    
    let result = '';
    
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            result += numerals[i];
            num -= values[i];
        }
    }
    
    return result;
}

function updateOutput(message, type = '') {
    const output = document.getElementById('output');
    output.textContent = message;
    output.className = type ? type : '';
    
    if (type) {
        output.classList.add('fade-in');
        setTimeout(() => {
            output.classList.remove('fade-in');
        }, 500);
    }
}

function handleConversion() {
    const input = document.getElementById('number');
    const value = input.value.trim();
    
    // Check if input is empty
    if (value === '') {
        updateOutput('Please enter a valid number', 'error');
        return;
    }
    
    const num = parseInt(value);
    
    // Check if it's a valid number
    if (isNaN(num)) {
        updateOutput('Please enter a valid number', 'error');
        return;
    }
    
    // Check if number is less than 1
    if (num < 1) {
        updateOutput('Please enter a number greater than or equal to 1', 'error');
        return;
    }
    
    // Check if number is greater than 3999
    if (num >= 4000) {
        updateOutput('Please enter a number less than or equal to 3999', 'error');
        return;
    }
    
    // Convert to Roman numeral
    const roman = convertToRoman(num);
    updateOutput(roman, 'success');
}

// Event listeners
document.getElementById('convert-btn').addEventListener('click', handleConversion);

document.getElementById('number').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleConversion();
    }
});

// Add input animation
document.getElementById('number').addEventListener('input', function() {
    const output = document.getElementById('output');
    if (output.classList.contains('error') || output.classList.contains('success')) {
        output.className = '';
        output.textContent = 'Enter a number and click convert';
    }
});