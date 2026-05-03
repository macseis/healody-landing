# Healody Landing — AI Context

Auto-caricato da Claude Code all'apertura di una chat in questo repo.

## Contesto specifico

@PROJECT_CONTEXT.md

## Contesto di sistema (cross-repo)

@../healody-docs/SYSTEM_CONTEXT.md

## Note operative

- ⚠️ **Repo PUBBLICO** su GitHub. Niente credenziali, niente API keys, niente endpoint privati nel codice o nelle commit
- **Repo correlati:** la landing punta agli utenti verso la PWA ([`../healody-pwa`](../healody-pwa)) per l'installazione. Non chiama il backend ([`../healody-backend`](../healody-backend)) direttamente
- **Working directory di sviluppo:** `c:\laragon\www\healody-repos\healody-landing`
- **Multi-lingua:** ogni testo nuovo va aggiunto in IT e EN in `js/translations.js`
- **Service Worker:** se cambi asset cachati, bumpa la versione di cache in `sw.js`
