// Particle Canvas Animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle system
const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenu.classList.remove('active');
    menuBtn.classList.remove('active');
}

// Modal functionality
let currentSlide = {};

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize slider for this modal
    initializeSlider(modalId);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initializeSlider(modalId) {
    currentSlide[modalId] = 0;
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    const slideContents = document.querySelectorAll(`#${modalId} .slide-content`);
    const indicatorsContainer = document.getElementById(`indicators-${modalId}`);
    
    // Create indicators
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.onclick = () => goToSlide(modalId, index);
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    showSlide(modalId, 0);
}

function changeSlide(modalId, direction) {
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    const totalSlides = slides.length;
    
    currentSlide[modalId] = (currentSlide[modalId] + direction + totalSlides) % totalSlides;
    showSlide(modalId, currentSlide[modalId]);
}

function goToSlide(modalId, slideIndex) {
    currentSlide[modalId] = slideIndex;
    showSlide(modalId, slideIndex);
}

function showSlide(modalId, slideIndex) {
    // Handle image slides
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
    
    // Handle content slides (for modals with separate content)
    const slideContents = document.querySelectorAll(`#${modalId} .slide-content`);
    slideContents.forEach((content, index) => {
        content.classList.toggle('active', index === slideIndex);
    });
    
    // Update indicators
    const indicators = document.querySelectorAll(`#indicators-${modalId} .indicator`);
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code can go here
    console.log('Drone Mapping Portfolio loaded successfully');
});