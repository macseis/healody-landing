/**
 * Healody Landing — Shop module
 * Talks to the public CORS-enabled backend endpoints under /api/public/shop/.
 *   - GET  /catalog.php           → render catalog cards
 *   - POST /checkout.php          → redirect to Stripe Checkout
 *   - POST /redeem-code.php       → show download link
 *
 * Public endpoints only — no secret keys live in this file (the repo is public).
 */

(function () {
    'use strict';

    // ============================================
    // CONFIG
    // ============================================
    function resolveApiBase() {
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            return 'http://localhost/healody-repos/healody-backend/api/public/shop';
        }
        return 'https://api.healody.com/api/public/shop';
    }

    const SHOP_API = resolveApiBase();
    const SHOP_SUCCESS_URL = SHOP_API + '/success.php';

    // Map backend category slug → emoji icon (purely cosmetic fallback when cover_url is null)
    const CATEGORY_ICON = {
        sleep: '🌙',
        focus: '🎯',
        calm: '🌊',
        energy: '⚡',
        meditation: '🧘',
        recovery: '💆'
    };

    // ============================================
    // STATE
    // ============================================
    let catalog = [];
    let activePackId = null;

    // ============================================
    // ENTRY
    // ============================================
    document.addEventListener('DOMContentLoaded', function () {
        const grid = document.getElementById('shopGrid');
        if (!grid) return; // Shop section not on this page

        bindModals();
        loadCatalog();
    });

    // bfcache restore: when the user clicks back from the backend success page,
    // browsers restore the landing as-is — including any open redeem modal with
    // its stale verify feedback (e.g. "5/5 left" while the real count is now 4/5).
    // Treat the restore as a fresh start: close & reset the modal.
    window.addEventListener('pageshow', function (event) {
        if (!event.persisted) return;
        const modal = document.getElementById('shopRedeemModal');
        if (modal && modal.classList.contains('active')) {
            closeRedeemModal();
        }
    });

    // ============================================
    // CATALOG
    // ============================================
    async function loadCatalog() {
        const status = document.getElementById('shopCatalogStatus');
        const grid = document.getElementById('shopGrid');

        try {
            const response = await fetch(SHOP_API + '/catalog.php', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }

            const data = await response.json();

            if (!data || data.success !== true || !Array.isArray(data.packs)) {
                throw new Error('Invalid response');
            }

            catalog = data.packs;

            if (catalog.length === 0) {
                showCatalogStatus(t('shop.empty'));
                return;
            }

            renderCatalog(catalog);
            status.hidden = true;
            grid.hidden = false;
        } catch (err) {
            console.error('[Shop] catalog load failed:', err);
            showCatalogStatus(t('shop.errorLoad'), true);
        }
    }

    function renderCatalog(packs) {
        const grid = document.getElementById('shopGrid');
        grid.innerHTML = '';

        packs.forEach(function (pack) {
            grid.appendChild(buildPackCard(pack));
        });

        // Re-apply translations to any data-i18n nodes injected
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        }
    }

    const DESCRIPTION_TRUNCATE_AT = 100;

    function buildPackCard(pack) {
        const card = document.createElement('article');
        card.className = 'shop-card fade-in-up visible';
        card.setAttribute('data-pack-id', String(pack.pack_id));

        const cover = pack.cover_url
            ? `<img class="shop-card-cover" src="${escapeAttr(pack.cover_url)}" alt="${escapeAttr(pack.name)}" loading="lazy">`
            : `<div class="shop-card-cover shop-card-cover-fallback" aria-hidden="true">
                   <span>${CATEGORY_ICON[pack.category] || '🎵'}</span>
               </div>`;

        const price = pack.price_eur != null
            ? formatPrice(pack.price_eur, pack.currency || 'EUR')
            : '—';

        const preview = pack.preview_url
            ? `<audio class="shop-card-preview" controls preload="none" src="${escapeAttr(pack.preview_url)}"></audio>`
            : '';

        const subtitle = (pack.short_description || '').trim();
        const fullDescription = (pack.description || '').trim();
        const descriptionMarkup = renderTruncatedDescription(fullDescription);

        const subtitleMarkup = subtitle
            ? `<p class="shop-card-subtitle">${escapeHtml(subtitle)}</p>`
            : '';

        const duration = pack.duration_minutes
            ? `<span class="shop-card-tag">⏱ ${Number(pack.duration_minutes)} min</span>`
            : '';

        card.innerHTML = `
            ${cover}
            <div class="shop-card-body">
                <h3 class="shop-card-title">${escapeHtml(pack.name)}</h3>
                ${subtitleMarkup}
                ${duration ? `<div class="shop-card-meta">${duration}</div>` : ''}
                ${descriptionMarkup}
                ${preview}
                <div class="shop-card-footer">
                    <span class="shop-card-price">${price}</span>
                    <div class="shop-card-actions">
                        <button type="button" class="btn btn-outline shop-btn-redeem" data-pack-id="${pack.pack_id}" data-pack-name="${escapeAttr(pack.name)}">
                            <span data-i18n="shop.action.redeem">🎟 Codice</span>
                        </button>
                        <button type="button" class="btn btn-primary shop-btn-buy" data-pack-id="${pack.pack_id}" data-pack-name="${escapeAttr(pack.name)}">
                            <span data-i18n="shop.action.buy">💳 Compra</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        card.querySelector('.shop-btn-buy').addEventListener('click', function () {
            startCheckout(pack.pack_id);
        });
        card.querySelector('.shop-btn-redeem').addEventListener('click', function () {
            openRedeemModal(pack.pack_id, pack.name);
        });

        const readMore = card.querySelector('.shop-card-readmore');
        if (readMore) {
            readMore.addEventListener('click', function (e) {
                e.preventDefault();
                const wrap = this.closest('.shop-card-desc');
                if (!wrap) return;
                wrap.classList.add('is-expanded');
                // Swap truncated text with full text and remove the link
                const full = wrap.getAttribute('data-full') || '';
                wrap.innerHTML = '<p class="shop-card-desc-text">' + escapeHtml(full) + '</p>';
            });
        }

        return card;
    }

    /**
     * Build the description markup. If the description is short enough, render it
     * inline. Otherwise emit a truncated preview (cut at the last word boundary
     * within DESCRIPTION_TRUNCATE_AT chars) followed by an inline "…leggi di più"
     * anchor; the click handler in buildPackCard expands the full text.
     */
    function renderTruncatedDescription(text) {
        if (!text) return '';
        if (text.length <= DESCRIPTION_TRUNCATE_AT) {
            return `<div class="shop-card-desc"><p class="shop-card-desc-text">${escapeHtml(text)}</p></div>`;
        }

        // Cut at last whitespace before the limit to avoid mid-word truncation.
        let cut = text.lastIndexOf(' ', DESCRIPTION_TRUNCATE_AT);
        if (cut < DESCRIPTION_TRUNCATE_AT * 0.6) cut = DESCRIPTION_TRUNCATE_AT;
        const preview = text.slice(0, cut).replace(/[.,;:\s]+$/, '');

        // Store the full text as a data attribute (escaped) so the click handler
        // can render it as plain text via textContent-equivalent escapeHtml.
        return `
            <div class="shop-card-desc" data-full="${escapeAttr(text)}">
                <p class="shop-card-desc-text">${escapeHtml(preview)}…<a href="#" class="shop-card-readmore" data-i18n="shop.card.readMore">leggi di più</a></p>
            </div>
        `;
    }

    function showCatalogStatus(message, isError) {
        const status = document.getElementById('shopCatalogStatus');
        const grid = document.getElementById('shopGrid');
        status.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'shop-status-text' + (isError ? ' shop-status-error' : '');
        p.textContent = message;
        status.appendChild(p);
        status.hidden = false;
        grid.hidden = true;
    }

    // ============================================
    // CHECKOUT (Stripe)
    // ============================================
    async function startCheckout(packId) {
        const buyBtn = document.querySelector('.shop-btn-buy[data-pack-id="' + packId + '"]');
        if (buyBtn) {
            buyBtn.disabled = true;
            buyBtn.classList.add('is-loading');
        }

        try {
            const response = await fetch(SHOP_API + '/checkout.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pack_id: packId })
            });

            const data = await response.json().catch(function () { return null; });

            if (!response.ok || !data || !data.success || !data.checkout_url) {
                const msg = (data && data.error) ? data.error : t('shop.errorCheckout');
                alert(msg);
                return;
            }

            window.location.href = data.checkout_url;
        } catch (err) {
            console.error('[Shop] checkout failed:', err);
            alert(t('shop.errorNetwork'));
        } finally {
            if (buyBtn) {
                buyBtn.disabled = false;
                buyBtn.classList.remove('is-loading');
            }
        }
    }

    // ============================================
    // REDEEM CODE
    // ============================================
    function bindModals() {
        const redeemModal = document.getElementById('shopRedeemModal');
        if (!redeemModal) return;

        redeemModal.querySelector('.modal-overlay').addEventListener('click', closeRedeemModal);
        document.getElementById('shopRedeemClose').addEventListener('click', closeRedeemModal);
        document.getElementById('shopRedeemCancel').addEventListener('click', closeRedeemModal);
        document.getElementById('shopRedeemForm').addEventListener('submit', handleRedeemSubmit);
        document.getElementById('shopRedeemVerify').addEventListener('click', handleVerifyClick);

        // Auto-format license code on input + reactivity for verify/redeem buttons
        const codeInput = document.getElementById('shopRedeemCode');
        codeInput.addEventListener('input', function () {
            const upper = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            const groups = upper.match(/.{1,4}/g) || [];
            this.value = groups.slice(0, 4).join('-');
            updateRedeemButtonsState();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && redeemModal.classList.contains('active')) {
                closeRedeemModal();
            }
        });
    }

    /**
     * Enable/disable Verify and Redeem based on current input state.
     * Verify enables when the code is formally valid.
     * Redeem enables only after a successful verification (verifiedCode tracked below).
     * Any change to the code field after verify resets the redeem-enabled state.
     */
    let lastVerifiedCode = null;

    function updateRedeemButtonsState() {
        const codeEl = document.getElementById('shopRedeemCode');
        const verifyBtn = document.getElementById('shopRedeemVerify');
        const submitBtn = document.getElementById('shopRedeemSubmit');
        const code = (codeEl.value || '').trim().toUpperCase();
        const formatOk = isValidLicenseCode(code);

        verifyBtn.disabled = !formatOk;

        // If user changed the code after a successful verify, lock redeem again
        if (code !== lastVerifiedCode) {
            submitBtn.disabled = true;
            clearVerifyFeedback();
        }
    }

    function openRedeemModal(packId, packName) {
        activePackId = packId;
        document.getElementById('shopRedeemPackName').textContent = packName;
        document.getElementById('shopRedeemEmail').value = '';
        document.getElementById('shopRedeemCode').value = '';
        lastVerifiedCode = null;
        clearRedeemError();
        clearVerifyFeedback();
        updateRedeemButtonsState();
        showModal('shopRedeemModal');
        setTimeout(function () {
            document.getElementById('shopRedeemEmail').focus();
        }, 50);
    }

    function closeRedeemModal() {
        hideModal('shopRedeemModal');
        activePackId = null;
        lastVerifiedCode = null;
    }

    // ============================================
    // VERIFY CODE (pre-redeem check)
    // ============================================
    async function handleVerifyClick() {
        const codeEl = document.getElementById('shopRedeemCode');
        const verifyBtn = document.getElementById('shopRedeemVerify');
        const submitBtn = document.getElementById('shopRedeemSubmit');
        const code = (codeEl.value || '').trim().toUpperCase();

        if (!isValidLicenseCode(code)) {
            showVerifyFeedback('error', t('shop.redeem.errorCodeFormat'));
            return;
        }

        clearRedeemError();
        clearVerifyFeedback();
        verifyBtn.disabled = true;
        verifyBtn.classList.add('is-loading');

        try {
            const url = SHOP_API + '/verify-code.php?license_code=' + encodeURIComponent(code);
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json().catch(function () { return null; });

            if (!data) {
                showVerifyFeedback('error', t('shop.errorNetwork'));
                return;
            }

            if (data.success === true && typeof data.bonus_remaining === 'number') {
                lastVerifiedCode = code;
                submitBtn.disabled = false;
                showVerifyFeedback('ok', formatRemainingMessage(data.bonus_remaining, data.bonus_count));
            } else {
                lastVerifiedCode = null;
                submitBtn.disabled = true;
                const msg = mapErrorCode(data.error_code, data.error)
                    || t('shop.redeem.errorVerifyGeneric');
                showVerifyFeedback('error', msg);
            }
        } catch (err) {
            console.error('[Shop] verify failed:', err);
            showVerifyFeedback('error', t('shop.errorNetwork'));
        } finally {
            verifyBtn.classList.remove('is-loading');
            // Re-evaluate enable state (in case user changed the code while loading)
            updateRedeemButtonsState();
        }
    }

    function showVerifyFeedback(kind, message) {
        const box = document.getElementById('shopRedeemVerifyFeedback');
        box.textContent = message;
        box.classList.remove('shop-verify-ok', 'shop-verify-error');
        box.classList.add(kind === 'ok' ? 'shop-verify-ok' : 'shop-verify-error');
        box.hidden = false;
    }

    function clearVerifyFeedback() {
        const box = document.getElementById('shopRedeemVerifyFeedback');
        box.textContent = '';
        box.classList.remove('shop-verify-ok', 'shop-verify-error');
        box.hidden = true;
    }

    function formatRemainingMessage(remaining, total) {
        const tpl = (remaining > 0)
            ? t('shop.redeem.verifyOk')
            : t('shop.redeem.verifyExhausted');
        return tpl
            .replace('{n}', String(remaining))
            .replace('{total}', String(total));
    }

    /**
     * Map stable backend error_code → localized message.
     * Falls back to the human-readable backend message if no mapping is found.
     */
    function mapErrorCode(code, fallbackMessage) {
        if (!code) return fallbackMessage || null;
        const key = 'shop.errorCode.' + code;
        const translated = t(key);
        // t() returns the key itself when missing — treat that as "no mapping".
        if (translated && translated !== key) return translated;
        return fallbackMessage || null;
    }

    async function handleRedeemSubmit(e) {
        e.preventDefault();
        clearRedeemError();

        const email = document.getElementById('shopRedeemEmail').value.trim();
        const code = document.getElementById('shopRedeemCode').value.trim().toUpperCase();
        const submitBtn = document.getElementById('shopRedeemSubmit');

        if (!isValidEmail(email)) {
            showRedeemError(t('shop.redeem.errorEmail'));
            return;
        }
        if (!isValidLicenseCode(code)) {
            showRedeemError(t('shop.redeem.errorCodeFormat'));
            return;
        }
        if (!activePackId) {
            showRedeemError(t('shop.errorGeneric'));
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');

        try {
            const response = await fetch(SHOP_API + '/redeem-code.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pack_id: activePackId,
                    email: email,
                    license_code: code
                })
            });

            const data = await response.json().catch(function () { return null; });

            if (!response.ok || !data || !data.success || !data.download_url || !data.order_id || !data.download_token) {
                const msg = (data && (mapErrorCode(data.error_code, data.error) || data.error)) || t('shop.errorGeneric');
                showRedeemError(msg);
                // If the backend tells us the code is exhausted/expired/invalid, also
                // re-disable Riscatta and surface in the verify feedback area for clarity.
                if (data && (data.error_code === 'license_exhausted'
                          || data.error_code === 'license_expired'
                          || data.error_code === 'license_inactive'
                          || data.error_code === 'license_not_found')) {
                    lastVerifiedCode = null;
                    document.getElementById('shopRedeemSubmit').disabled = true;
                    showVerifyFeedback('error', msg);
                }
                return;
            }

            // Redirect to the backend success page (same UX as Stripe checkout return —
            // server-side rendered counter + reload-after-download logic).
            const successUrl = SHOP_SUCCESS_URL
                + '?order_id=' + encodeURIComponent(data.order_id)
                + '&token=' + encodeURIComponent(data.download_token);
            window.location.href = successUrl;
        } catch (err) {
            console.error('[Shop] redeem failed:', err);
            showRedeemError(t('shop.errorNetwork'));
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
        }
    }

    function showRedeemError(message) {
        const box = document.getElementById('shopRedeemError');
        box.textContent = message;
        box.hidden = false;
    }

    function clearRedeemError() {
        const box = document.getElementById('shopRedeemError');
        box.textContent = '';
        box.hidden = true;
    }

    // ============================================
    // HELPERS
    // ============================================
    function showModal(id) {
        const m = document.getElementById(id);
        if (!m) return;
        m.classList.add('active');
        m.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function hideModal(id) {
        const m = document.getElementById(id);
        if (!m) return;
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function getCurrentLang() {
        try {
            // main.js declares `let currentLang` at script scope — reachable here.
            if (typeof currentLang === 'string') return currentLang;
        } catch (_) {}
        return document.documentElement.lang || 'it';
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidLicenseCode(value) {
        return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(value);
    }

    function formatPrice(amount, currency) {
        try {
            const lang = (getCurrentLang());
            return new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'it-IT', {
                style: 'currency',
                currency: currency
            }).format(amount);
        } catch (_) {
            return '€ ' + Number(amount).toFixed(2);
        }
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttr(s) {
        return escapeHtml(s);
    }

    function t(key) {
        if (typeof translations !== 'object' || !translations) return key;
        const lang = (getCurrentLang());
        const dict = translations[lang] || translations.it;
        const parts = key.split('.');
        let cur = dict;
        for (const p of parts) {
            if (cur && typeof cur === 'object') cur = cur[p];
            else return key;
        }
        return (typeof cur === 'string') ? cur : key;
    }

    // Expose for debugging
    if (window.HealodyDebug) {
        window.HealodyDebug.reloadShop = loadCatalog;
        window.HealodyDebug.showShopRedeem = function (id) { openRedeemModal(id || 1, 'Test pack'); };
    }
})();
