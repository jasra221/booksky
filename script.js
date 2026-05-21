// Create floating parrot emojis in the background
function createFloatingParrots() {
    const parrotContainer = document.querySelector('.floating-parrots');
    const parrotEmojis = ['??', '??', '??', '??', '??', '??', '??', '??', '??', '??'];

    parrotEmojis.forEach((emoji) => {
        const parrot = document.createElement('div');
        parrot.className = 'floating-parrot';
        parrot.textContent = emoji;

        const randomX = Math.random() * 95;
        const randomY = Math.random() * 95;
        const randomDuration = 18 + Math.random() * 14;
        const randomDelay = Math.random() * 5;

        parrot.style.left = randomX + '%';
        parrot.style.top = randomY + '%';
        parrot.style.animationDuration = randomDuration + 's';
        parrot.style.animationDelay = randomDelay + 's';

        parrotContainer.appendChild(parrot);
    });
}

function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            event.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupPageOverlay() {
    const overlay = document.getElementById('pageOverlay');
    const closeButton = document.getElementById('closeOverlay');
    const overlayLinks = document.querySelectorAll('.overlay-link');
    const openButton = document.getElementById('openOverlayBtn');

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    overlayLinks.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            overlay.style.display = 'none';
        });
    });

    if (openButton) {
        openButton.addEventListener('click', () => {
            overlay.style.display = 'flex';
        });
    }
}

function setupScrollTopButton() {
    const scrollButton = document.getElementById('scrollTopBtn');

    const updateVisibility = () => {
        if (window.scrollY > 320) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', updateVisibility);
    updateVisibility();

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.feature-card, .product-card, .pros-box, .cons-box, .benefit-item, .about-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        observer.observe(el);
    });
}

function setupButtonRipples() {
    const buttons = document.querySelectorAll('.cta-button, .contact-button, .overlay-link, .close-overlay, .chatbot-toggle, #chatSend');
    buttons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
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
        return 'Oops! ?? Please type a question so I can help. ??';
    }

    if (/^hi$|^hello$|^hey$|^hai$|^helo$|salam|vanakkam|bonjour|namaste/.test(text)) {
        return 'Hey! ?? Nice to see you! Ask me about price, location, diet, health plan, or contact. ???';
    }

    if (/price|cost|rate|how much|padippu|vala/.test(text)) {
        return 'Prices start at ?1,999 for premium cages. ?? Food packs and accessories are available separately. ???';
    }

    if (/location|where|shop|address|vayathu/.test(text)) {
        return 'We are located in Chennai. ?? WhatsApp us for exact directions! ??';
    }

    if (/kind|type|species|which parrot|parrot type|varieties/.test(text)) {
        return 'We offer Macaws, African Greys, Cockatoos, Amazons, Parakeets, Conures, Lovebirds, Eclectus, and more. ???';
    }

    if (/subscription|health|vet|checkup|monthly|plan/.test(text)) {
        return 'Our health plan includes monthly vet visits, diet review, beak/nail care, and priority support. ????';
    }

    if (/food|diet|nutrition/.test(text)) {
        return 'Feed parrots with quality pellets, veggies, fruits, and nuts. Avoid avocado, chocolate, and caffeine. ????';
    }

    if (/contact|whatsapp|phone|call|book/.test(text)) {
        return 'Sure! Reach out on WhatsApp for quick help: https://wa.me/919791244634 ??';
    }

    return 'Hmm, I am not sure. ?? Try asking about price, location, diet, health plan, or contact. ??';
}

function setupChatbot() {
    const toggle = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const windowEl = document.getElementById('chatbotWindow');
    const sendButton = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');

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

    const submitChat = () => {
        if (!input || !input.value.trim()) return;
        const userText = input.value.trim();
        appendChatMessage(userText, 'user');
        const reply = getChatbotReply(userText);
        setTimeout(() => appendChatMessage(reply, 'bot'), 400);
        input.value = '';
    };

    if (sendButton) {
        sendButton.addEventListener('click', submitChat);
    }

    if (input) {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitChat();
            }
        });
    }
}

function setupWateryHover() {
    const interactiveElements = document.querySelectorAll('.feature-card, .product-card, .pros-box, .cons-box, .benefit-item, .about-block, .hero-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', (event) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            element.style.setProperty('--mx', x + 'px');
            element.style.setProperty('--my', y + 'px');
        });
    });
}

function setupInitialState() {
    const overlay = document.getElementById('pageOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createFloatingParrots();
    setupSmoothScrolling();
    setupPageOverlay();
    setupScrollTopButton();
    setupIntersectionObserver();
    setupButtonRipples();
    setupChatbot();
    setupWateryHover();
    setupInitialState();
});
