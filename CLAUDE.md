# Healody Landing — AI Context

Auto-caricato da Claude Code all'apertura di una chat in questo repo.

## Contesto specifico

@PROJECT_CONTEXT.md

## Contesto di sistema (cross-repo)

@../healody-docs/SYSTEM_CONTEXT.md

## Contesto specifico landing (cross-repo, include spec shop)

@../healody-docs/contexts/landing.md

## Note operative

- ⚠️ **Repo PUBBLICO** su GitHub. Niente credenziali, niente API keys, niente endpoint privati nel codice o nelle commit
- **Repo correlati:** la landing punta agli utenti verso la PWA ([`../healody-pwa`](../healody-pwa)) per l'installazione. Per il nuovo **Shop** chiama il backend ([`../healody-backend`](../healody-backend)) tramite endpoint pubblici CORS-enabled (`/api/public/shop/*`) — vedi spec dettagliata in `contexts/landing.md` sezione 11
- **Working directory di sviluppo:** `c:\laragon\www\healody-repos\healody-landing`
- **Multi-lingua:** ogni testo nuovo va aggiunto in IT e EN in `js/translations.js`
- **Service Worker:** se cambi asset cachati, bumpa la versione di cache in `sw.js`

## Regole operative MUST

- **Git: niente azioni autonome.** L'AI **non** deve eseguire `git add`, `commit`, `push`, `reset`, `checkout`, `branch`, `merge`, `rebase` o qualsiasi altra operazione che modifichi lo stato del repository, **se non quando l'utente lo richiede esplicitamente in quel turno**. Comandi read-only (`status`, `log`, `diff`, `show`) sono permessi per orientarsi. L'utente gestisce personalmente l'history git e i messaggi di commit. Se l'AI crea o modifica file, deve **lasciarli nel working tree** e segnalarli; sarà l'utente a decidere cosa committare e come
