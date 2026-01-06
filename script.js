 // Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1500);
});

// Navigation Scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Hero Particles
const particlesContainer = document.querySelector('.hero__particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = Math.random() * 20 + 10 + 's';
    particlesContainer.appendChild(particle);
}

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.textContent.trim();
       
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
       
        portfolioItems.forEach(item => {
            const category = item.querySelector('.portfolio-item__category').textContent;
           
            if (filter === 'All' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Details Data
const projectDetails = {
    0: {
        title: "Tech Startup Dashboard",
        category: "Web Design",
        duration: "3 Months",
        year: "2024",
        description: "A comprehensive dashboard solution for a growing tech startup. The project focused on creating an intuitive interface for managing complex data analytics, user management, and real-time reporting. We implemented a modern design system with dark mode support and responsive layouts.",
        features: [
            "Real-time data visualization",
            "Advanced analytics dashboard",
            "User role management",
            "Dark/Light mode toggle",
            "Responsive design",
            "API integration"
        ],
       },
    1: {
        title: "E-Commerce Platform",
        category: "E-Commerce",
        duration: "4 Months",
        year: "2024",
        description: "A full-featured e-commerce platform with advanced product filtering, secure payment integration, and inventory management. Built with scalability in mind to handle thousands of products and concurrent users.",
        features: [
            "Advanced product search & filtering",
            "Secure payment gateway integration",
            "Real-time inventory tracking",
            "Customer reviews & ratings",
            "Order management system",
            "Mobile-first design"
        ],
       },
    2: {
        title: "Mobile Banking App",
        category: "Mobile",
        duration: "6 Months",
        year: "2023",
        description: "A secure and user-friendly mobile banking application with biometric authentication, instant transfers, and comprehensive account management features. Designed to meet strict financial industry security standards.",
        
        features: [
            "Biometric authentication",
            "Instant money transfers",
            "Bill payment system",
            "Transaction history",
            "Budget tracking tools",
            "Push notifications"
        ],
        },
    3: {
        title: "In-App & In-Web Ads Campaign",
        category: "Ads",
        duration: "3 Months",
        year: "2024",
        description: "Integrated in-app and in-web advertising campaign combining creative ad units, targeted audience segmentation, and performance optimization to drive user acquisition and engagement.",
        
        features: [
            "Cross-platform ad creative",
            "Targeted audience segmentation",
            "A/B testing on creatives",
            "Real-time performance tracking",
            "Optimized bidding strategies",
            "Conversion tracking & attribution"
        ],
        results: "35% increase in CTR and 20% reduction in CPA",
        link: "#"
    },
    4: {
        title: "SaaS Landing Page",
        category: "Web Design",
        
        duration: "1 Month",
        year: "2024",
        description: "High-converting landing page for a SaaS product with focus on user acquisition and conversion optimization. Implemented A/B testing framework and analytics to continuously improve performance.",
       
        features: [
            "Conversion-optimized design",
            "Interactive product demos",
            "Pricing calculator",
            "Email capture forms",
            "Video integration",
            "Performance optimization"
        ],
       
    },
    5: {
        title: "Fashion E-Store",
        category: "E-Commerce",
        duration: "5 Months",
        year: "2023",
        description: "Luxury fashion e-commerce platform with virtual try-on features, personalized recommendations, and seamless checkout experience. Integrated with multiple payment providers and shipping carriers.",
        features: [
            "Virtual try-on with AR",
            "AI-powered recommendations",
            "Size guide calculator",
            "Wishlist & favorites",
            "Multi-currency support",
            "Express checkout"
        ],
      }
};

// Modal functionality
let currentModalIndex = 0;

// Create Modal HTML
const modalHTML = `
<div class="modal" id="projectModal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
        <button class="modal__close" id="closeModal">
            <i class="fas fa-times"></i>
        </button>
        <div class="modal__body">
            <div class="modal__header">
                <span class="modal__category"></span>
                <h2 class="modal__title"></h2>
                <div class="modal__meta">
                    <span class="modal__meta-item"><i class="fas fa-calendar"></i> <span class="modal__year"></span></span>
                    <span class="modal__meta-item"><i class="fas fa-clock"></i> <span class="modal__duration"></span></span>
                </div>
            </div>
           
            <div class="modal__grid">
                <div class="modal__section">
                    <h3>Project Overview</h3>
                    <p class="modal__description"></p>
                </div>
               
                <div class="modal__section">
                    <h3>Key Features</h3>
                    <ul class="modal__features"></ul>
                </div>
               
                <div class="modal__section">
                    <h3>Results Achieved</h3>
                    <p class="modal__results"></p>
                </div>
            </div>

            <div class="modal__actions">
                <button class="btn btn--secondary" id="closeModalBtn">Close</button>
            </div>
        </div>
    </div>
</div>
`;

// Insert modal into body
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Add View Details buttons to portfolio items
portfolioItems.forEach((item, index) => {
    const overlay = item.querySelector('.portfolio-item__overlay');
    const viewBtn = document.createElement('button');
    viewBtn.className = 'btn btn--primary btn--sm portfolio__view-btn';
    viewBtn.textContent = 'View Details';
    viewBtn.style.marginTop = '1rem';
    overlay.appendChild(viewBtn);
   
    viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(index);
    });
});

// Modal functions
function openModal(index) {
    currentModalIndex = index;
    const modal = document.getElementById('projectModal');
    const project = projectDetails[index] || {};
   
    // Populate modal with project data (safe defaults)
    const setText = (selector, value) => {
        const el = modal.querySelector(selector);
        if (el) el.textContent = value || '';
    };

    setText('.modal__category', project.category);
    setText('.modal__title', project.title);
    setText('.modal__year', project.year);
    setText('.modal__duration', project.duration);
    setText('.modal__description', project.description);
    setText('.modal__results', project.results);
   
    // Populate features (guard against missing arrays)
    const featuresContainer = modal.querySelector('.modal__features');
    const features = Array.isArray(project.features) ? project.features : [];
    if (featuresContainer) {
        featuresContainer.innerHTML = features.map(feature =>
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');
    }
   
    // Show modal
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal close events
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.querySelector('.modal__overlay').addEventListener('click', closeModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Counter Animation
const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.textContent;
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat__number');
            animateCounter(number);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Form Submission - open Gmail compose directly with fallback to mailto
document.querySelector('.contact__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value.trim();
    const message = form.querySelector('#message').value.trim();
    const to = 'pixellab608567@gmail.com';
    const subject = encodeURIComponent(`${name ? name + ' - ' : ''}Website Inquiry`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    // Try opening Gmail in a new tab; if blocked, fall back to mailto
    const win = window.open(gmailUrl, '_blank');
    if (!win) {
        // Popup blocked or blocked by browser policy; use mailto instead
        window.location.href = mailto;
    }

    form.reset();
});

// Smooth Scroll
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