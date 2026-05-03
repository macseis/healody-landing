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

Sito vetrina del prodotto Healody. Funzioni:

- Presentazione del prodotto (chi siamo, cosa facciamo)
- Showcase delle features
- Sezione "How it works"
- Guida all'installazione della PWA
- Multi-lingua IT/EN (gestita via `js/translations.js`)

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
├── index.html              # Pagina principale
├── coming-soon.html        # (eventuale) pagina coming soon
├── manifest.json           # Web manifest
├── sw.js                   # Service Worker
├── PROJECT_CONTEXT.md      # ← questo file
├── README.md
├── ASSETS-README.md        # Note sugli asset
├── css/                    # Stili
├── js/                     # Logica + traduzioni
├── images/                 # Immagini hero/sezioni
└── assets/                 # Asset vari
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

## 11. Note operative per l'AI

- **Repo pubblico** → ogni commit è visibile. Mai inserire credenziali, link a endpoint admin, configurazioni interne
- **Niente integrazione diretta col backend** → non chiama `api.healody.com` direttamente. È un sito statico. Eventuali form di contatto devono usare servizi terzi (es. Formspree) oppure linkare al backend tramite endpoint pubblici dedicati
- **Link alla PWA:** la landing punta a `https://app.healody.com` o a `install.html` per l'installazione. Mantenere coerenza quando si rinominano file lato PWA
- **Multi-lingua:** ogni nuovo testo va aggiunto in tutte le lingue supportate, altrimenti la UI mostra chiavi grezze per gli utenti delle lingue mancanti
- **Service Worker:** anche la landing ha un suo SW. Se si aggiornano asset cachati, bumpare la versione di cache nel SW (analogo alla PWA)

---

**Versione documento:** 1.0
**Ultimo aggiornamento:** 2026-05-03
