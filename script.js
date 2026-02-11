// Handle contact form submission
// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('resume-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle theme
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('resume-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Initialize theme on page load
initializeTheme();

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form fields
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Prepare the email
    const mailtoLink = `mailto:john.doe@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

    // Open the default email client
    window.location.href = mailtoLink;

    // Show success message
    showMessage('Email opened in your default email client. Please review and send the message.', 'success');

    // Reset form
    document.getElementById('contactForm').reset();

    // Clear message after 5 seconds
    setTimeout(() => {
        clearMessage();
    }, 5000);
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
}

function clearMessage() {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.style.display = 'none';
    messageDiv.className = 'form-message';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to tech items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.animation = 'slideIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
