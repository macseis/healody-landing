/**
 * Healody Landing Page - Main JavaScript
 * Handles: Language switching, animations, smooth scroll, GDPR cookie banner.
 */

// ============================================
// GLOBAL STATE
// ============================================
let currentLang = 'it';

// Toggle this to true when adding any analytics or marketing script
// (Google Analytics, Meta Pixel, etc). The banner will appear automatically
// at first visit and remember the user's choice in localStorage.
const HAS_TRACKING_SCRIPTS = false;

const CONSENT_KEY = 'Healody_cookie_consent'; // values: 'accepted' | 'rejected'

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeNavbar();
    initializeLanguageSwitcher();
    initializeFAQ();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeCookieBanner();
});

// ============================================
// LANGUAGE SYSTEM
// ============================================
function initializeLanguage() {
    const savedLang = localStorage.getItem('Healody_lang');

    if (savedLang && ['it', 'en'].includes(savedLang)) {
        currentLang = savedLang;
    } else {
        const browserLang = navigator.language.slice(0, 2);
        currentLang = ['it', 'en'].includes(browserLang) ? browserLang : 'it';
        localStorage.setItem('Healody_lang', currentLang);
    }

    document.documentElement.lang = currentLang;
    applyTranslations();
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

    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function() {
        langDropdown.classList.remove('active');
    });

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

                // Notify modules that listen for language changes (e.g. shop.js
                // reloads the catalog so product copy comes back localized).
                document.dispatchEvent(new CustomEvent('healody:langchange', {
                    detail: { lang: currentLang }
                }));
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

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });

    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

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

            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// COOKIE BANNER (GDPR)
// Shown only if HAS_TRACKING_SCRIPTS is true AND no choice persisted yet.
// "Manage cookies" footer link always re-opens the banner regardless.
// ============================================
function initializeCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    const rejectBtn = document.getElementById('cookieRejectBtn');
    const manageBtn = document.getElementById('manageCookiesBtn');

    if (!banner) return;

    const stored = localStorage.getItem(CONSENT_KEY);

    if (HAS_TRACKING_SCRIPTS && !stored) {
        showCookieBanner();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            hideCookieBanner();
            applyConsent('accepted');
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'rejected');
            hideCookieBanner();
            applyConsent('rejected');
        });
    }

    if (manageBtn) {
        manageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCookieBanner();
        });
    }

    if (HAS_TRACKING_SCRIPTS && stored) {
        applyConsent(stored);
    }
}

function showCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.hidden = false;
    requestAnimationFrame(() => banner.classList.add('visible'));
}

function hideCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.classList.remove('visible');
    setTimeout(() => { banner.hidden = true; }, 300);
}

/**
 * Applies the stored consent choice. Called both on initial load (when a
 * choice already exists) and after the user clicks Accept/Reject.
 *
 * Hook your tracking-script loaders here. For example:
 *
 *   if (decision === 'accepted') {
 *       loadGoogleAnalytics();
 *       loadMetaPixel();
 *   }
 */
function applyConsent(decision) {
    if (decision === 'accepted') {
        // TODO: load analytics / marketing scripts here
        console.log('[Consent] User accepted analytics cookies');
    } else {
        console.log('[Consent] User rejected analytics cookies');
    }
}

// ============================================
// DEBUG MODE (Development only)
// ============================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🎵 Healody Landing Page - Debug Mode');
    console.log('Current Language:', currentLang);

    window.HealodyDebug = {
        changeLang: function(lang) {
            currentLang = lang;
            localStorage.setItem('Healody_lang', currentLang);
            applyTranslations();
            updateLanguageButton();
        },
        showCookieBanner: showCookieBanner,
        hideCookieBanner: hideCookieBanner,
        clearConsent: function() { localStorage.removeItem(CONSENT_KEY); }
    };
}
