# Healody Landing — Project Context

Documento di contesto da fornire a un assistente AI (es. claude.ai) per orchestrare il lavoro su questo progetto.

> **Nota:** questo file è il "gemello interno" di [`healody-docs/contexts/landing.md`](https://github.com/macseis/healody-docs). Quando aggiorni informazioni strutturali, mantieni allineati entrambi i file. Per la visione d'insieme dei 3 repo del sistema Healody (backend + PWA + landing) consulta [`healody-docs/SYSTEM_CONTEXT.md`](https://github.com/macseis/healody-docs).

---

## 1. Identità

- **Nome:** Healody Landing Page
- **Repo:** [`github.com/macseis/healody-landing`](https://github.com/macseis/healody-landing) (**pubblico**)
- **Dominio prod:** `https://healody.com` / `https://www.healody.com`
- **Path locale:** `c:\laragon\www\healody-repos\healody-landing`
- **URL locale:** `http://localhost/healody-repos/healody-landing/`
- **Versione:** 3.0
- **Stato:** Production Ready

> ⚠️ **Unico repo pubblico** del sistema Healody. Niente segreti, niente API keys, niente endpoint privati nel codice.

## 2. Cosa fa

Sito vetrina + e-commerce del prodotto Healody. Funzioni:

- Presentazione del prodotto (chi siamo, cosa facciamo)
- Showcase delle features
- Sezione "How it works"
- **Shop integrato** (sezione `#shop` in `index.html`) — catalogo dinamico Pack audio MP3 standalone, due path d'acquisto: 💳 Stripe Checkout e 🎟 riscatto Codice. Vedi §11.
- Guida all'arrivo della PWA (in fase di rilascio)
- Multi-lingua IT/EN (gestita via `js/translations.js`, anche per i contenuti dei pack via `?lang=` nelle API shop)

## 3. Stack

- HTML5
- CSS3 con animazioni
- Vanilla JavaScript
- Service Worker (per offline / caching base)
- SVG icons

**Nessun framework, nessun bundler, nessuna build.** File serviti staticamente.

## 4. Struttura cartelle

```
healody-landing/
├── index.html              # Pagina principale (con sezione #shop)
├── coming-soon.html        # (eventuale) pagina coming soon
├── privacy-policy.html     # Privacy GDPR (include riferimenti shop)
├── cookie-policy.html      # Cookie policy
├── terms.html              # Termini di vendita
├── manifest.json           # Web manifest
├── sw.js                   # Service Worker (bumpare CACHE_NAME quando si aggiornano asset cachati)
├── PROJECT_CONTEXT.md      # ← questo file
├── CLAUDE.md               # Auto-context AI
├── README.md
├── ASSETS-README.md        # Note sugli asset
├── css/
│   ├── styles.css          # Tema base + tutto il sito
│   ├── shop.css            # Sezione shop (card layout, modali, verify feedback)
│   └── legal.css           # Pagine privacy/cookie/terms
├── js/
│   ├── translations.js     # Tutte le stringhe IT/EN (incluso shop.* + shop.errorCode.*)
│   ├── main.js             # Bootstrap, language switcher, navbar, scroll, FAQ, cookie banner
│   └── shop.js             # IIFE — catalog/checkout/redeem/verify code
├── images/                 # Immagini hero/sezioni
└── assets/                 # Asset vari (icone categoria, ecc.)
```

## 5. Multi-lingua

Gestita via `js/translations.js` (vanilla JS). Lingue supportate:

- 🇮🇹 Italiano (default)
- 🇬🇧 English

Per aggiungere una lingua: estendere `translations.js` con la chiave nuova e aggiornare il selettore di lingua nella UI.

## 6. SEO

Il sito è ottimizzato SEO:

- Meta tag completi in `index.html`
- Open Graph + Twitter Card
- Sitemap (se presente in root)
- Performance ottimizzata (lazy loading immagini)

## 7. Deploy

**Manuale, NO CI/CD.**

1. Modifiche in locale (Laragon)
2. `git push origin main`
3. Upload statico al server di `healody.com` (FTP/SSH/git pull lato server)

**HTTPS** raccomandato (non strettamente obbligatorio come per la PWA, ma standard di fatto).

**CDN** opzionale (può essere aggiunto davanti per performance globale).

## 8. Documenti interni del repo

- `README.md` — overview
- `PROJECT_CONTEXT.md` — questo file
- `ASSETS-README.md` — note sugli asset (immagini, icone, font)

## 9. Branch correnti

- `main` — produzione

## 10. Repo correlati

- [`healody-backend`](https://github.com/macseis/healody-backend) — API REST (la landing NON la chiama direttamente)
- [`healody-pwa`](https://github.com/macseis/healody-pwa) — la PWA verso cui questa landing invita gli utenti
- [`healody-docs`](https://github.com/macseis/healody-docs) — overview di sistema e context per AI

## 11. Shop integrato (sezione `#shop` in `index.html`)

Stato: **integrato e funzionante** dal 2026-05-08. Il dettaglio architetturale completo (endpoint, schema, flow) è in [`healody-docs/contexts/landing.md` §11](https://github.com/macseis/healody-docs/blob/main/contexts/landing.md). Riassunto operativo qui:

- **API base** auto-rilevata in `js/shop.js` da `window.location.hostname`: dev → `http://localhost/healody-repos/healody-backend/api/public/shop`, prod → `https://api.healody.com/api/public/shop`
- **Endpoint usati**: `GET /catalog.php?lang=`, `GET /verify-code.php?license_code=`, `POST /checkout.php` (Stripe), `POST /redeem-code.php` (codici)
- **Success page**: server-rendered dal backend (`success.php`), NON in-page sulla landing. Il flow Codice fa redirect a `success.php?order_id=...&token=...&lang=...`
- **Codici licenza shop**: tabella backend `shop_codes` (separata da `licenses` PWA — vedi backend.md §12). Sistema "usa-e-getta", N riscatti per codice, email-bound al primo uso, no scadenza temporale.
- **Multi-lingua contenuti pack**: il backend espone `name_en/short_description_en/description_en` come fallback IT. La landing passa `?lang=` ad ogni chiamata e ricarica il catalogo al cambio lingua via evento `healody:langchange` dispatched da `main.js`.

## 12. Note operative per l'AI

- **Repo pubblico** → ogni commit è visibile. Mai inserire credenziali, link a endpoint admin, configurazioni interne
- **Integrazione backend solo via endpoint pubblici CORS** in `/api/public/shop/*` (mai endpoint admin/privati). La sezione shop è l'unica integrazione attiva al momento; altri form (contatti) devono restare su servizi terzi (Formspree).
- **Link alla PWA:** la landing punta a `https://app.healody.com`. Mantenere coerenza quando si rinominano file lato PWA
- **Multi-lingua:** ogni nuovo testo UI va aggiunto in IT + EN in `js/translations.js`. Per i contenuti dei pack (lato backend) compilare anche le colonne `*_en` nel pack-builder.
- **Service Worker:** se cambi `index.html`, `js/*`, `css/*` o asset cachati, bumpare `CACHE_NAME` in `sw.js`. Ora a `Healody-landing-v10`.
- **Errori shop**: il backend ritorna `error_code` stabili (es. `license_exhausted`, `invalid_format`); la landing li mappa via `shop.errorCode.*` in `translations.js`. Aggiungere nuovi codici sia lato backend sia in entrambe le lingue qui.
- **Privacy policy**: aggiornata 2026-05-08. Quando il flow shop cambia (nuovi dati raccolti, nuovi processori, ecc.) aggiornare anche `privacy-policy.html` sezioni 2.1, 3.2, 4, 6.
- **CORS**: il backend prod legge `ALLOWED_ORIGINS` (NON `CORS_ALLOWED_ORIGINS` — bug latente sistemato 2026-05-08). Verificare che includa `healody.com`/`www.healody.com`/`app.healody.com` prima del go-live.

---

**Versione documento:** 2.0
**Ultimo aggiornamento:** 2026-05-08
