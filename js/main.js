// ==================== 
// DOM Elements
// ====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Chat Widget
const chatButton = document.getElementById('chatButton');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// ==================== 
// Mobile Menu Toggle
// ====================

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !e.target.closest('.nav-wrapper')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== 
// Theme Toggle (Dark Mode)
// ====================

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
        themeToggle.innerHTML = html.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// ==================== 
// Smooth Scroll
// ====================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==================== 
// Portfolio Filtering
// ====================

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ==================== 
// Counter Animation
// ====================

function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Trigger counter when hero section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// ==================== 
// FAQ Accordion
// ====================

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const isActive = answer.classList.contains('active');

        // Close all other FAQs
        document.querySelectorAll('.faq-answer.active').forEach(activeAnswer => {
            activeAnswer.classList.remove('active');
            activeAnswer.previousElementSibling.classList.remove('active');
        });

        // Toggle current FAQ
        if (!isActive) {
            answer.classList.add('active');
            question.classList.add('active');
        }
    });
});

// ==================== 
// Chat Widget
// ====================

if (chatButton) {
    chatButton.addEventListener('click', () => {
        chatBox.classList.toggle('active');
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMsg = document.createElement('div');
            userMsg.classList.add('message', 'user-message');
            userMsg.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMsg);

            // Clear input
            chatInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.classList.add('message', 'bot-message');
                const responses = [
                    'Thanks for your message! Our team will respond soon.',
                    'Great question! Please contact us for more details.',
                    'We appreciate your interest in Tech-Done.',
                    'Let me help you with that. Can you provide more details?'
                ];
                botMsg.innerHTML = `<p>${responses[Math.floor(Math.random() * responses.length)]}</p>`;
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
}

// ==================== 
// Contact Form
// ====================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We will contact you soon.');
        contactForm.reset();
    });
}

// ==================== 
// Newsletter Form
// ====================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    });
}

// ==================== 
// Scroll Animations
// ====================

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.service-card, .portfolio-item, .team-member, .testimonial-card, .pricing-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(element);
});

// ==================== 
// Active Navigation Link
// ====================

window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== 
// Console Message
// ====================

console.log('%cTech-Done Website', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cWelcome! This website is built with HTML5, CSS3, and Vanilla JavaScript', 'color: #764ba2; font-size: 14px;');