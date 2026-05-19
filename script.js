// Create floating parrots in background
function createFloatingParrots() {
    const parrotContainer = document.querySelector('.floating-parrots');
    const parrotEmojis = ['🦜', '🦜', '🦜', '🦜', '🦜', '🦜', '🦜', '🦜', '🦜', '🦜'];
    
    parrotEmojis.forEach((emoji, index) => {
        const parrot = document.createElement('div');
        parrot.className = 'floating-parrot';
        parrot.textContent = emoji;
        
        // Random position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDuration = 15 + Math.random() * 25;
        const randomDelay = Math.random() * 5;
        
        parrot.style.left = randomX + '%';
        parrot.style.top = randomY + '%';
        parrot.style.animationDuration = randomDuration + 's';
        parrot.style.animationDelay = randomDelay + 's';
        
        parrotContainer.appendChild(parrot);
    });
}

// Add ripple effect on click
function addRippleEffect(event) {
    const button = event.currentTarget;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    // Get button dimensions
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced watery effect on mouse move
function setupWateryHover() {
    const interactiveElements = document.querySelectorAll(
        '.product-card, .parrot-type-card, .pros-box, .cons-box, .benefit-item, .education-item, .parrot-education, .contact-section, .subscription-section, .about-section'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', (event) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Set CSS variables for the gradient position
            element.style.setProperty('--mx', x + 'px');
            element.style.setProperty('--my', y + 'px');
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const size = 40;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x - size / 2 + 'px';
            ripple.style.top = y - size / 2 + 'px';
            ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)';
            ripple.style.position = 'absolute';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            
            element.style.position = 'relative';
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Intersection Observer for fade-in animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

const CHAT_WHATSAPP_NUMBER = '919791244634';
const CHAT_WHATSAPP_URL = `https://wa.me/${CHAT_WHATSAPP_NUMBER}`;

// Setup click ripple effects for buttons
function setupButtonRipples() {
    const buttons = document.querySelectorAll('.cta-button, .whatsapp-btn, .phone-btn, .email-btn');
    buttons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
        button.addEventListener('mousemove', (event) => {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            button.style.setProperty('--mx', x + 'px');
            button.style.setProperty('--my', y + 'px');
        });
    });
}

function appendChatMessage(text, sender = 'bot') {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

function getChatbotReply(input) {
    const text = input.trim().toLowerCase();

    if (!text) {
        return 'Oru correct question kudunga, naanga help pannuvom.';
    }

    if (/hi|hello|hai|helo|salam|vanakkam|bonjour|namaste/.test(text)) {
        return 'Hi! Vanakkam! Ungaluku enna help venum? Price, location, cage, food, health plan, sollunga.';
    }

    if (/price|cost|rate|how much|vala/.test(text)) {
        return 'Price species mela depend pannum. Basic parrot cage 1,999 rupees la irukum. Food packs and accessories separate charge.';
    }

    if (/location|where|shop|address|vayathu/.test(text)) {
        return 'Namma shop Chennai-la iruku. Inimey exact address venumna WhatsApp la contact pannunga.';
    }

    if (/kind|type|species|which parrot|parrot type|varieties/.test(text)) {
        return 'Macaw, African Grey, Cockatoo, Amazon, Parakeet, Conure, Lovebird, Eclectus-vachu irukku. Eppo connect aagi detail sollunga.';
    }

    if (/subscription|health|vet|checkup|monthly/.test(text)) {
        return 'Monthly health checkups available. Vet monthly visit, diet review, nail/beak care and emergency support.';
    }

    if (/food|diet|nutrition/.test(text)) {
        return 'Parrots-ku good diet romba mukkiyam. Pellets, fresh veggies, fruits, nuts. Avoid avocado, chocolate, caffeine.';
    }

    if (/contact|whatsapp|phone|call|book/.test(text)) {
        return 'Sari! WhatsApp panni contact pannunga. https://wa.me/919791244634';
    }

    return 'Konjam confuse-a irukku. WhatsApp la contact panunga: https://wa.me/919791244634';
}

function setupChatbot() {
    const toggle = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const windowEl = document.getElementById('chatbotWindow');
    const sendButton = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');
    const whatsappLink = document.querySelector('.chat-whatsapp');

    if (whatsappLink) {
        whatsappLink.href = CHAT_WHATSAPP_URL;
    }

    if (toggle && windowEl) {
        toggle.addEventListener('click', () => {
            windowEl.classList.toggle('open');
        });
    }

    if (closeBtn && windowEl) {
        closeBtn.addEventListener('click', () => {
            windowEl.classList.remove('open');
        });
    }

    function submitChat() {
        if (!input || !input.value.trim()) return;
        const userText = input.value.trim();
        appendChatMessage(userText, 'user');
        const reply = getChatbotReply(userText);
        setTimeout(() => appendChatMessage(reply, 'bot'), 500);
        input.value = '';
    }

    if (sendButton) {
        sendButton.addEventListener('click', submitChat);
    }

    if (input) {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                submitChat();
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createFloatingParrots();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupButtonRipples();
    setupWateryHover();
    setupChatbot();
    
    // Add random parrot colors
    const parrots = document.querySelectorAll('.floating-parrot');
    const colors = ['🦜', '🦜', '🦜'];
    
    parrots.forEach((parrot, index) => {
        parrot.textContent = colors[index % colors.length];
    });
});

// Adjust parrot animation on scroll with parallax
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const parrots = document.querySelectorAll('.floating-parrot');
    
    parrots.forEach((parrot, index) => {
        // Subtle parallax effect based on scroll
        const speed = 0.5 + (index % 3) * 0.1;
        const yOffset = scrollTop * speed;
        
        // Create a floating effect that moves with scroll
        parrot.style.transform = `translateY(${yOffset}px) translateX(${Math.sin(scrollTop * 0.01) * 20}px)`;
    });
});
