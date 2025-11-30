/**
 * Healody Landing Page - Main JavaScript
 * Handles: Language switching, animations, modals, device detection
 */

// ============================================
// GLOBAL STATE
// ============================================
let currentLang = 'it';
const APP_URL = 'https://app.Healody.net';
let deferredPrompt = null; // Store PWA install prompt

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initializeLanguage();

    // Initialize UI components
    initializeNavbar();
    initializeLanguageSwitcher();
    initializeFAQ();
    initializeScrollAnimations();
    initializeCTAButtons();
    initializeModal();
    initializeSmoothScroll();

    // Initialize PWA install prompt
    initializePWAInstall();
});

// ============================================
// LANGUAGE SYSTEM
// ============================================
function initializeLanguage() {
    // Check localStorage first
    const savedLang = localStorage.getItem('Healody_lang');

    if (savedLang && ['it', 'en'].includes(savedLang)) {
        currentLang = savedLang;
    } else {
        // Auto-detect from browser
        const browserLang = navigator.language.slice(0, 2);
        currentLang = ['it', 'en'].includes(browserLang) ? browserLang : 'it';
        localStorage.setItem('Healody_lang', currentLang);
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Apply translations
    applyTranslations();

    // Update language button
    updateLanguageButton();
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(key);

        if (translation) {
            element.textContent = translation;
        }
    });
}

function getNestedTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLang];

    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return null;
        }
    }

    return value;
}

function updateLanguageButton() {
    const currentLangEl = document.getElementById('currentLang');
    if (currentLangEl) {
        currentLangEl.textContent = currentLang.toUpperCase();
    }
}

// ============================================
// LANGUAGE SWITCHER
// ============================================
function initializeLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    if (!langBtn || !langDropdown) return;

    // Toggle dropdown
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        langDropdown.classList.remove('active');
    });

    // Language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');

            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('Healody_lang', currentLang);
                document.documentElement.lang = currentLang;

                applyTranslations();
                updateLanguageButton();
            }

            langDropdown.classList.remove('active');
        });
    });
}

// ============================================
// NAVBAR
// ============================================
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// FAQ ACCORDION
// ============================================
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current FAQ
            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// CTA BUTTONS & INSTALL MODAL
// ============================================
function initializeCTAButtons() {
    const ctaButtons = [
        document.getElementById('ctaInstallHero'),
        document.getElementById('ctaInstallFinal')
    ];

    ctaButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                openInstallModal();
            });
        }
    });
}

function initializeModal() {
    const modal = document.getElementById('installModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Close modal handlers
    [modalClose, modalCancel, modalOverlay].forEach(el => {
        if (el) {
            el.addEventListener('click', closeInstallModal);
        }
    });

    // Confirm button
    if (modalConfirm) {
        modalConfirm.addEventListener('click', function() {
            window.open(APP_URL, '_blank');
            closeInstallModal();
        });
    }

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeInstallModal();
        }
    });
}

async function openInstallModal() {
    // Check if PWA is already installed
    if (isPWAInstalled()) {
        console.log('✅ PWA already installed, redirecting to app');
        window.open(APP_URL, '_blank');
        return;
    }

    // Try native PWA install first (for Android and desktop Chrome)
    if (deferredPrompt) {
        console.log('🚀 Triggering native PWA install');
        const installed = await triggerPWAInstall();

        if (installed) {
            console.log('✅ User accepted PWA installation');
            return;
        } else {
            console.log('❌ User declined PWA installation');
            // Continue to show modal with instructions
        }
    }

    // For iOS or when native prompt is not available, show modal with instructions
    const modal = document.getElementById('installModal');
    const deviceInfo = detectDevice();

    // Populate modal with device-specific info
    populateModalContent(deviceInfo);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInstallModal() {
    const modal = document.getElementById('installModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) {
        return {
            type: 'ios',
            name: 'iOS'
        };
    } else if (/android/.test(userAgent)) {
        return {
            type: 'android',
            name: 'Android'
        };
    } else {
        return {
            type: 'desktop',
            name: 'Desktop'
        };
    }
}

function populateModalContent(deviceInfo) {
    const modalDeviceInfo = document.getElementById('modalDeviceInfo');
    const modalInstructions = document.getElementById('modalInstructions');

    if (!modalDeviceInfo || !modalInstructions) return;

    const deviceType = deviceInfo.type;
    const modalData = translations[currentLang].modal[deviceType];

    // Set device info
    modalDeviceInfo.textContent = modalData.detected;

    // Set instructions
    let instructionsHTML = '<ol>';
    modalData.instructions.forEach(instruction => {
        instructionsHTML += `<li>${instruction}</li>`;
    });
    instructionsHTML += '</ol>';

    modalInstructions.innerHTML = instructionsHTML;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit execution rate
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// ANALYTICS (Optional - for future)
// ============================================

/**
 * Track CTA clicks
 */
function trackCTAClick(ctaLocation) {
    // Placeholder for analytics
    console.log('CTA clicked:', ctaLocation);

    // Future: Send to analytics service
    // gtag('event', 'cta_click', { location: ctaLocation });
}

/**
 * Track language change
 */
function trackLanguageChange(fromLang, toLang) {
    // Placeholder for analytics
    console.log('Language changed:', fromLang, '→', toLang);

    // Future: Send to analytics service
    // gtag('event', 'language_change', { from: fromLang, to: toLang });
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

/**
 * Lazy load images (if needed in future)
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PWA INSTALL FUNCTIONALITY
// ============================================

/**
 * Initialize PWA install prompt handling
 */
function initializePWAInstall() {
    // Capture the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('💾 PWA install prompt available');
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Store the event so it can be triggered later
        deferredPrompt = e;
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA installed successfully');
        deferredPrompt = null;
    });
}

/**
 * Trigger PWA installation
 */
async function triggerPWAInstall() {
    if (!deferredPrompt) {
        console.log('❌ PWA install prompt not available');
        // Fallback: redirect to app
        window.open(APP_URL, '_blank');
        return false;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    // Clear the deferred prompt
    deferredPrompt = null;

    return outcome === 'accepted';
}

/**
 * Check if PWA is already installed
 */
function isPWAInstalled() {
    // Check if running in standalone mode (PWA is installed)
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

// ============================================
// DEBUG MODE (Development only)
// ============================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🎵 Healody Landing Page - Debug Mode');
    console.log('Current Language:', currentLang);
    console.log('Device:', detectDevice());
    console.log('PWA Installed:', isPWAInstalled());

    // Expose functions to window for debugging
    window.HealodyDebug = {
        changeLang: function(lang) {
            currentLang = lang;
            applyTranslations();
            updateLanguageButton();
        },
        showModal: openInstallModal,
        detectDevice: detectDevice,
        installPWA: triggerPWAInstall,
        isPWAInstalled: isPWAInstalled
    };
}
