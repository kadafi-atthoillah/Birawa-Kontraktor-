/**
 * BIRAWA KONTRAKTOR - Main JavaScript File
 * ==========================================
 * Features:
 * - Loading screen (Bug Fixed)
 * - Sticky navbar
 * - Mobile menu toggle
 * - Smooth scrolling
 * - Scroll animations (AOS)
 * - Counter animation
 * - Back to top button
 * - Form handling
 * - Active nav link on scroll
 * - Full View Portfolio Slider
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoadingScreen();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initAOS();
    initCounterAnimation();
    initBackToTop();
    initContactForm();
    initActiveNavOnScroll();
    initScrollReveal();
    initPortfolioSlider(); // Fungsi Portofolio Baru
});

/**
 * Loading Screen
 * Hides loading screen smoothly after 1.5 seconds safely
 */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Langsung jalankan hitung mundur setelah kerangka HTML siap
        // Tidak perlu nunggu seluruh gambar beres di-load (mencegah bug nyangkut)
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            
            // Hapus elemen dari background setelah animasi pudar selesai 
            // agar tidak menutupi tombol-tombol di halaman utama
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
            
        }, 1500); // 1500 = 1.5 detik waktu loading
    }
}

/**
 * Navbar
 * Adds scrolled class to navbar when scrolling
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu Toggle
 * Toggles mobile menu on hamburger click
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth Scrolling
 * Smooth scroll to section on nav link click
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * AOS Animation Library Initialization
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            mirror: false
        });
    }
}

/**
 * Counter Animation
 * Animates numbers counting up when in viewport
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * Back to Top Button
 * Shows/hides back to top button based on scroll position
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Contact Form Handling
 * Handles form submission and validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Simple validation
            if (!name || !email) {
                showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
                return;
            }
            
            showNotification('Terima kasih! Pesan Anda telah terkirim.', 'success');
            contactForm.reset();
        });
    }
}

/**
 * Notification System
 * Shows notification messages
 */
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Active Nav Link on Scroll
 */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

/**
 * New Portfolio Slider (Full View)
 */
function initPortfolioSlider() {
    const btnLihatSemua = document.getElementById('btnLihatSemua');
    const wrapper = document.getElementById('portfolioFullWrapper');
    const slider = document.getElementById('portfolioFullSlider');
    const slides = document.querySelectorAll('.full-slide');
    const prevBtn = document.getElementById('fullPrevBtn');
    const nextBtn = document.getElementById('fullNextBtn');
    
    if (!btnLihatSemua || !wrapper || !slider) return;

    // Buka slider saat "Lihat Semua" diklik
    btnLihatSemua.addEventListener('click', function() {
        wrapper.classList.add('active');
        
        // Scroll otomatis pelan-pelan ke area foto
        setTimeout(() => {
            wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
    });

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Geser Kanan
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    });

    // Geser Kiri
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Dukungan geser (swipe) di HP
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            // Swipe kiri (Next)
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        } else if (touchEndX - touchStartX > 50) {
            // Swipe kanan (Prev)
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
    }, { passive: true });
}

/**
 * Parallax Effect for Hero Section
 */
window.addEventListener('scroll', function() {
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

/**
 * Service Card Hover Effect Enhancement
 */
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/**
 * WhatsApp Float Button Animation
 */
const whatsappFloat = document.getElementById('whatsappFloat');
if (whatsappFloat) {
    setInterval(() => {
        whatsappFloat.style.animation = 'pulse 1s ease';
        setTimeout(() => {
            whatsappFloat.style.animation = '';
        }, 1000);
    }, 5000);
}
