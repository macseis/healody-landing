/**
 * Healody™ Landing Page - Multilingual System
 * Supports: Italian (IT) and English (EN)
 */

const translations = {
    it: {
        // Navigation
        nav: {
            pack: "Pack",
            shop: "Shop",
            pwa: "App",
            science: "Scienza",
            faq: "FAQ"
        },

        // Hero Section
        hero: {
            badge: "Due modi per ritrovare il benessere",
            headline: "Frequenze terapeutiche, in due forme",
            subheadline: "Scarica i nostri Pack audio standalone in alta qualità e usali subito sul tuo dispositivo. Oppure aspetta l'arrivo della PWA Healody™ per l'esperienza completa: libreria, statistiche e modalità offline.",
            ctaPrimary: "Esplora lo shop",
            ctaSecondary: "Scopri la PWA"
        },

        // Healody™ Origin Story
        origin: {
            title: "Healody™ = Health + Melody",
            text: "Dietro ogni grande progetto c'è un'idea chiara. Healody™ unisce letteralmente \"Salute\" e \"Melodia\": un sistema strutturato che utilizza il potere delle frequenze terapeutiche scientificamente studiate per supportare il tuo benessere quotidiano. Perché prendersi cura di sé dovrebbe essere semplice e accessibile, anche nella frenetica vita di oggi."
        },

        // Problem → Solution
        problemSolution: {
            problemLabel: "Problema",
            problemHeadline: "Stress quotidiano? Difficoltà a concentrarti?",
            problemText: "Ansia e pensieri che non ti lasciano dormire? Viviamo in una società sovraccarica di stimoli.",
            solutionLabel: "Soluzione",
            solutionHeadline: "Il tuo angolo di benessere",
            solutionText: "Healody™ utilizza frequenze audio terapeutiche scientificamente provate per riportare equilibrio nella tua vita.",
            ctaDiscover: "Scopri Healody™"
        },

        // Two Products Overview
        products: {
            headline: "Due modi di vivere Healody™",
            subtitle: "Scegli il formato che preferisci. La scienza dietro è la stessa.",
            packBadge: "Disponibile",
            packTitle: "Pack Audio Standalone",
            packText: "File MP3 in alta qualità, scaricabili sul tuo dispositivo. Mix di frequenze binaurali e polinaurali con ambient sonoro studiato. Pronti all'uso, senza app, senza account.",
            packCta: "Esplora lo shop",
            pwaBadge: "Coming Soon",
            pwaTitle: "App Healody™",
            pwaText: "L'esperienza completa: libreria estesa di frequenze e protocolli, ascolto offline, statistiche personali e installazione come app sul tuo dispositivo. In arrivo.",
            pwaCta: "Scopri la PWA"
        },

        // Pack Standalone Section
        pack: {
            headline: "Pack Audio Standalone",
            subtitle: "Mixati a regola d'arte, normalizzati a -18 LUFS, pronti da scaricare",
            featuresTitle: "Cosa contiene ogni Pack",
            feature1Title: "Frequenze terapeutiche",
            feature1Desc: "Mix di frequenze binaurali e polinaurali sovrapposte ad ambient sonoro studiato per amplificarne l'effetto.",
            feature2Title: "Audio HD",
            feature2Desc: "MP3 a 320 kbps, masterizzato a -18 LUFS integrato e -1 dBFS true peak. Volume coerente tra tutti i pack.",
            feature3Title: "Loop senza tagli",
            feature3Desc: "Ogni pack è un singolo file in loop continuo, senza interruzioni o cambi bruschi durante la sessione.",
            feature4Title: "Pronto all'uso",
            feature4Desc: "Nessuna app richiesta. Scarica, riproduci sul tuo player preferito, indossa le cuffie.",
            catalogTitle: "Il catalogo",
            catalogSubtitle: "Pack tematici per ogni esigenza",
            sleep: {
                name: "Sleep Pack",
                description: "Frequenze delta e theta con ambient notturno. Per addormentarsi e mantenere il sonno profondo."
            },
            focus: {
                name: "Focus Pack",
                description: "Frequenze beta e gamma con ambient minimal. Per studio, lavoro e attività cognitive intense."
            },
            calm: {
                name: "Calm Pack",
                description: "Frequenze alpha con ambient naturale. Per ridurre ansia e tensione durante la giornata."
            },
            energy: {
                name: "Energy Pack",
                description: "Frequenze beta con ambient ritmico. Per ricarica energetica e inizio giornata."
            },
            meditation: {
                name: "Meditation Pack",
                description: "Frequenze theta con ambient meditativo. Per pratica meditativa e introspezione profonda."
            },
            recovery: {
                name: "Recovery Pack",
                description: "Frequenze delta con ambient avvolgente. Per recupero fisico e rigenerazione."
            },
            allInOne: {
                badge: "Bundle Completo",
                name: "All-in-One Bundle",
                description: "Tutti e 6 i pack in un'unica soluzione. Include in omaggio una guida PDF dedicata: come usare ogni pack, in quali momenti della giornata, abbinamenti consigliati e protocolli d'uso.",
                bonus: "+ Guida PDF in regalo"
            },
            duration: "Loop continuo",
            buyCta: "Acquista",
            comingSoon: "Disponibile a breve",
            footerNote: "I prezzi e i checkout saranno attivi al lancio dello shop. Catalogo in espansione."
        },

        // Shop (catalogo dinamico + checkout/codice)
        shop: {
            eyebrow: "Shop",
            headline: "Healody™ Shop — Pack audio professionali",
            subtitle: "Acquista con carta o riscatta un codice licenza. Download immediato via email.",
            loading: "Carico il catalogo…",
            empty: "Nessun pack disponibile al momento. Torna a trovarci presto.",
            errorLoad: "Impossibile caricare il catalogo. Riprova tra qualche istante.",
            errorCheckout: "Errore nell'avvio del checkout. Riprova tra qualche istante.",
            errorNetwork: "Connessione assente o server non raggiungibile. Riprova tra qualche istante.",
            errorGeneric: "Si è verificato un errore. Riprova.",
            disclaimer: "Inserendo l'email accetti che venga utilizzata per inviare il link di download, secondo la nostra Privacy Policy.",
            path: {
                stripeTitle: "Compra con carta",
                stripeDesc: "Pagamento sicuro via Stripe. Ricevi link di download per email entro pochi secondi.",
                codeTitle: "Hai un codice?",
                codeDesc: "Riscatta una licenza già attivata e ottieni subito il link al download."
            },
            action: {
                buy: "💳 Compra",
                redeem: "🎟 Codice"
            },
            card: {
                readMore: "leggi di più"
            },
            redeem: {
                title: "Riscatta il tuo codice",
                emailLabel: "Email",
                codeLabel: "Codice licenza",
                codeHint: "Formato: XXXX-XXXX-XXXX-XXXX. Premi Verifica per controllare i riscatti disponibili.",
                cancel: "Annulla",
                verify: "Verifica",
                submit: "Riscatta",
                errorEmail: "Inserisci un indirizzo email valido.",
                errorCodeFormat: "Codice licenza non valido (formato XXXX-XXXX-XXXX-XXXX).",
                errorVerifyGeneric: "Impossibile verificare il codice. Riprova.",
                verifyOk: "Hai ancora {n} di {total} riscatti su questo codice.",
                verifyExhausted: "Licenza esaurita: 0 di {total} riscatti disponibili."
            },
            errorCode: {
                invalid_format: "Codice licenza non valido (formato XXXX-XXXX-XXXX-XXXX).",
                license_not_found: "Codice licenza non trovato.",
                license_inactive: "Licenza non attiva.",
                license_expired: "Licenza scaduta.",
                license_exhausted: "Licenza esaurita: nessun riscatto disponibile.",
                email_mismatch: "Email non corrisponde a quella della licenza.",
                invalid_email: "Email non valida.",
                invalid_pack: "Pack non valido.",
                pack_unavailable: "Pack non disponibile.",
                pack_no_render: "Pack non ancora pronto al download.",
                race_condition: "Riprova: un'altra richiesta sta usando lo stesso credito.",
                internal_error: "Errore interno. Riprova più tardi.",
                method_not_allowed: "Metodo non consentito."
            }
        },

        // Categories
        categories: {
            headline: "Per quali esigenze",
            subtitle: "Le frequenze terapeutiche supportano molti aspetti del benessere quotidiano",
            cat1: {
                title: "Relax e Sonno",
                description: "Rilassamento profondo e riposo rigenerante. Ideale per la sera e prima di dormire."
            },
            cat2: {
                title: "Meditazione e Focus",
                description: "Concentrazione e chiarezza mentale. Perfetto per studio, lavoro e pratiche meditative."
            },
            cat3: {
                title: "Energia e Vitalità",
                description: "Ricarica energetica e benessere attivo. Ottimo per iniziare la giornata."
            },
            cat4: {
                title: "Rigenerazione e Salute",
                description: "Recupero fisico e rigenerazione cellulare. Ideale dopo l'attività fisica."
            },
            footerText: "+ Ansia, Creatività, Equilibrio Emotivo, Guarigione, e altre categorie in arrivo."
        },

        // Science Section
        science: {
            headline: "La Scienza del Benessere Sonoro",
            intro: "Le frequenze terapeutiche non sono magia — sono scienza. Ecco come funzionano.",
            block1: {
                title: "Il Tuo Cervello è un'Orchestra",
                text: "Il cervello umano produce costantemente onde elettriche che oscillano a diverse frequenze. Ogni frequenza corrisponde a uno stato mentale specifico: attenzione, rilassamento, sonno profondo o meditazione."
            },
            waves: {
                beta: "Stato di veglia e attenzione",
                alpha: "Rilassamento cosciente",
                theta: "Meditazione profonda, creatività",
                delta: "Sonno profondo, rigenerazione"
            },
            block2: {
                title: "Come le Frequenze Influenzano il Cervello",
                text: "Quando ascolti una frequenza specifica, il tuo cervello tende naturalmente a sincronizzarsi con essa — un fenomeno chiamato 'entrainment neurale'. Le frequenze binaurali e polinaurali sfruttano questo principio per guidare il cervello verso stati desiderati."
            },
            block3: {
                title: "Cosa Dice la Ricerca",
                intro: "Studi scientifici dimostrano che l'esposizione a frequenze terapeutiche può:",
                benefit1: "Ridurre i livelli di cortisolo (ormone dello stress)",
                benefit2: "Aumentare la produzione di melatonina (sonno)",
                benefit3: "Migliorare la neuroplasticità cerebrale",
                benefit4: "Favorire stati meditativi profondi",
                benefit5: "Ridurre ansia e sintomi depressivi"
            },
            disclaimer: "Le frequenze audio sono un supporto al benessere, non sostituiscono cure mediche professionali."
        },

        // PWA Coming Soon Section
        pwa: {
            badge: "Coming Soon",
            headline: "L'App Healody™",
            subtitle: "L'esperienza completa, in arrivo nelle prossime settimane",
            intro: "L'App Healody™ è una Progressive Web App: si installa sul tuo dispositivo come un'app nativa, funziona offline e ti dà accesso a tutta la libreria di frequenze e protocolli.",
            featuresTitle: "Cosa offrirà",
            feat1: {
                title: "Libreria estesa",
                description: "Decine di frequenze dirette, binaurali, polinaurali e protocolli sequenziali. Ogni contenuto studiato per uno scopo specifico."
            },
            feat2: {
                title: "Audio protetti",
                description: "Contenuti cifrati con AES-256. La tua esperienza di benessere è completamente privata e sicura."
            },
            feat3: {
                title: "Funziona offline",
                description: "Una volta installata e sincronizzata, l'App funziona anche senza connessione. Rilassati ovunque."
            },
            feat4: {
                title: "Statistiche personali",
                description: "Cronologia ascolti, sessioni, progressi nel tempo. Per capire cosa funziona meglio per te."
            },
            howTitle: "Come funzionerà",
            step1Title: "Installa e attiva",
            step1Desc: "Inserisci il tuo codice licenza e crea il tuo account in pochi secondi.",
            step2Title: "Scegli la frequenza",
            step2Desc: "Seleziona la frequenza o il protocollo adatto al tuo stato d'animo o obiettivo.",
            step3Title: "Rilassati",
            step3Desc: "Indossa le cuffie, premi play e lasciati guidare dal suono terapeutico.",
            installCta: "Installa l'App",
            installNote: "Disponibile a breve per iOS, Android e Desktop"
        },

        // Benefits
        benefits: {
            headline: "I Benefici delle Frequenze Healody™",
            subtitle: "Pack o App, gli effetti dell'ascolto sono gli stessi",
            benefit1: "Riduce stress e ansia",
            benefit2: "Migliora concentrazione e focus",
            benefit3: "Favorisce sonno profondo e ristoratore",
            benefit4: "Aumenta benessere mentale generale",
            benefit5: "Supporta meditazione e mindfulness",
            benefit6: "Non invasivo, 100% naturale"
        },

        // FAQ
        faq: {
            headline: "Domande Frequenti",
            q1: {
                question: "Cos'è una frequenza terapeutica?",
                answer: "Le frequenze terapeutiche sono onde sonore specifiche che interagiscono con le onde cerebrali per promuovere stati di rilassamento, concentrazione o benessere. Ogni frequenza ha uno scopo specifico supportato dalla ricerca scientifica."
            },
            q2: {
                question: "Qual è la differenza tra Pack Standalone e App?",
                answer: "I Pack Standalone sono file MP3 che acquisti una volta e scarichi sul tuo dispositivo: nessuna app, nessun account, riproduci con qualsiasi player. L'App Healody™ (in arrivo) sarà invece l'esperienza completa con libreria estesa, statistiche, modalità offline e installazione come app nativa. La scienza e la qualità audio sono le stesse."
            },
            q3: {
                question: "Cosa contiene esattamente un Pack?",
                answer: "Ogni Pack è un file MP3 a 320 kbps, mixato e normalizzato a -18 LUFS integrato (-1 dBFS true peak). Contiene un mix di frequenze binaurali e polinaurali sovrapposte a un ambient sonoro studiato per amplificarne l'effetto. È un loop continuo, senza interruzioni."
            },
            q4: {
                question: "Quando esce l'App Healody™?",
                answer: "L'App è in fase di testing finale e sarà disponibile nelle prossime settimane. Nel frattempo i Pack Standalone ti danno accesso immediato all'esperienza Healody™ senza dover aspettare."
            },
            q5: {
                question: "Devo usare le cuffie?",
                answer: "Sì, per un'esperienza ottimale consigliamo cuffie di buona qualità. Per le frequenze binaurali le cuffie sono essenziali, perché ogni orecchio deve ricevere una frequenza diversa. Per le polinaurali e l'ambient anche speaker stereo di qualità possono andare bene."
            },
            q6: {
                question: "Posso usarli mentre dormo?",
                answer: "Assolutamente sì. Lo Sleep Pack e il Recovery Pack sono progettati proprio per accompagnare il sonno, con frequenze delta e theta che favoriscono il riposo profondo. Imposta il loop sul tuo player e lasciati addormentare."
            },
            q7: {
                question: "È sicuro?",
                answer: "Sì, le frequenze audio sono completamente sicure e naturali. Non hanno effetti collaterali e possono essere utilizzate da chiunque. In caso di dubbi o condizioni mediche specifiche, consulta il tuo medico."
            },
            q8: {
                question: "Cos'è la guida PDF dell'All-in-One Bundle?",
                answer: "Una guida illustrata che ti accompagna nell'uso dei sei pack: in quali momenti della giornata usare ognuno, abbinamenti consigliati, protocolli per obiettivi specifici (riduzione stress, miglioramento sonno, concentrazione prolungata) e consigli pratici per la sessione. È inclusa solo nel Bundle."
            }
        },

        // Final CTA
        finalCta: {
            headline: "Inizia oggi il tuo percorso",
            subheadline: "Scarica un Pack adesso o aspetta l'arrivo dell'App. Scegli tu.",
            ctaPack: "Esplora lo shop",
            ctaPwa: "Scopri la PWA"
        },

        // Footer
        footer: {
            tagline: "Benessere attraverso il suono",
            privacy: "Privacy Policy",
            cookie: "Cookie Policy",
            terms: "Termini di Vendita",
            contact: "Contatti",
            manageCookies: "Gestisci cookie",
            copyright: "© 2026 Healody™ · Un prodotto di Protocollo Salute™. Tutti i diritti riservati."
        },

        // PWA Notify Modal
        modal: {
            title: "App Healody™ — In arrivo",
            text: "L'App Healody™ è in fase di testing finale e sarà disponibile nelle prossime settimane. Nel frattempo puoi già scaricare i Pack Standalone e iniziare subito.",
            ctaPack: "Vai allo shop",
            cancel: "Chiudi"
        },

        // Cookie banner (GDPR)
        cookieBanner: {
            title: "Rispettiamo la tua privacy",
            message: "Utilizziamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso, cookie analitici per migliorare l'esperienza. Puoi accettare tutto o limitare ai soli necessari.",
            policyLink: "Leggi la Cookie Policy",
            privacyLink: "Privacy Policy",
            accept: "Accetta tutto",
            reject: "Solo necessari"
        }
    },

    en: {
        // Navigation
        nav: {
            pack: "Packs",
            shop: "Shop",
            pwa: "App",
            science: "Science",
            faq: "FAQ"
        },

        // Hero Section
        hero: {
            badge: "Two ways to find your wellbeing",
            headline: "Therapeutic frequencies, in two forms",
            subheadline: "Download our standalone audio Packs in high quality and use them right away on any device. Or wait for the Healody™ PWA for the complete experience: full library, listening stats, and offline mode.",
            ctaPrimary: "Explore the shop",
            ctaSecondary: "Discover the PWA"
        },

        // Healody™ Origin Story
        origin: {
            title: "Healody™ = Health + Melody",
            text: "Behind every great project there is a clear idea. Healody™ literally combines \"Health\" and \"Melody\": a structured system that harnesses the power of scientifically studied therapeutic frequencies to support your daily wellbeing. Because taking care of yourself should be simple and accessible, even in today's fast-paced life."
        },

        // Problem → Solution
        problemSolution: {
            problemLabel: "Problem",
            problemHeadline: "Daily stress? Difficulty focusing?",
            problemText: "Anxiety and thoughts keeping you awake? We live in a society overloaded with stimuli.",
            solutionLabel: "Solution",
            solutionHeadline: "Your Wellness Corner",
            solutionText: "Healody™ uses scientifically proven therapeutic audio frequencies to bring balance back to your life.",
            ctaDiscover: "Discover Healody™"
        },

        // Two Products Overview
        products: {
            headline: "Two ways to live Healody™",
            subtitle: "Pick the format you prefer. The science behind is the same.",
            packBadge: "Available",
            packTitle: "Standalone Audio Packs",
            packText: "High-quality MP3 files you download to your device. A mix of binaural and polynaural frequencies layered with carefully designed ambient sound. Ready to use — no app, no account.",
            packCta: "Explore the shop",
            pwaBadge: "Coming Soon",
            pwaTitle: "Healody™ App",
            pwaText: "The full experience: extended library of frequencies and protocols, offline listening, personal stats, and installation as a native app on your device. Coming soon.",
            pwaCta: "Discover the PWA"
        },

        // Pack Standalone Section
        pack: {
            headline: "Standalone Audio Packs",
            subtitle: "Professionally mixed, normalized to -18 LUFS, ready to download",
            featuresTitle: "What's inside every Pack",
            feature1Title: "Therapeutic frequencies",
            feature1Desc: "A mix of binaural and polynaural frequencies layered over ambient sound carefully designed to amplify their effect.",
            feature2Title: "HD audio",
            feature2Desc: "320 kbps MP3, mastered at -18 LUFS integrated and -1 dBFS true peak. Consistent volume across all packs.",
            feature3Title: "Seamless loop",
            feature3Desc: "Each pack is a single, continuously looped file — no interruptions or abrupt changes during your session.",
            feature4Title: "Ready to use",
            feature4Desc: "No app required. Download, play in your favorite player, put on your headphones.",
            catalogTitle: "The catalog",
            catalogSubtitle: "Themed packs for every need",
            sleep: {
                name: "Sleep Pack",
                description: "Delta and theta frequencies with night ambient. To fall asleep and maintain deep sleep."
            },
            focus: {
                name: "Focus Pack",
                description: "Beta and gamma frequencies with minimal ambient. For study, work, and intense cognitive tasks."
            },
            calm: {
                name: "Calm Pack",
                description: "Alpha frequencies with natural ambient. To ease anxiety and tension during the day."
            },
            energy: {
                name: "Energy Pack",
                description: "Beta frequencies with rhythmic ambient. For energy boost and starting your day right."
            },
            meditation: {
                name: "Meditation Pack",
                description: "Theta frequencies with meditative ambient. For meditation practice and deep introspection."
            },
            recovery: {
                name: "Recovery Pack",
                description: "Delta frequencies with enveloping ambient. For physical recovery and regeneration."
            },
            allInOne: {
                badge: "Complete Bundle",
                name: "All-in-One Bundle",
                description: "All 6 packs in a single solution. Includes a free dedicated PDF guide: how to use each pack, when during the day, recommended pairings, and use protocols.",
                bonus: "+ Free PDF guide"
            },
            duration: "Continuous loop",
            buyCta: "Buy",
            comingSoon: "Available soon",
            footerNote: "Prices and checkout will go live at shop launch. Catalog growing."
        },

        // Shop (dynamic catalog + checkout/code)
        shop: {
            eyebrow: "Shop",
            headline: "Healody™ Shop — Professional audio packs",
            subtitle: "Buy with card or redeem a license code. Instant download via email.",
            loading: "Loading the catalog…",
            empty: "No packs available right now. Come back soon.",
            errorLoad: "Couldn't load the catalog. Please try again shortly.",
            errorCheckout: "Could not start checkout. Please try again shortly.",
            errorNetwork: "No connection or server unreachable. Please try again shortly.",
            errorGeneric: "Something went wrong. Please try again.",
            disclaimer: "By entering your email you agree it will be used to send the download link and purchase receipts, per our Privacy Policy.",
            path: {
                stripeTitle: "Buy with card",
                stripeDesc: "Secure payment via Stripe. Get the download link by email within seconds.",
                codeTitle: "Got a code?",
                codeDesc: "Redeem an already-activated license and get the download link right away."
            },
            action: {
                buy: "💳 Buy",
                redeem: "🎟 Code"
            },
            card: {
                readMore: "read more"
            },
            redeem: {
                title: "Redeem your code",
                emailLabel: "Email",
                codeLabel: "License code",
                codeHint: "Format: XXXX-XXXX-XXXX-XXXX. Click Verify to check available redemptions.",
                cancel: "Cancel",
                verify: "Verify",
                submit: "Redeem",
                errorEmail: "Please enter a valid email address.",
                errorCodeFormat: "Invalid license code (format XXXX-XXXX-XXXX-XXXX).",
                errorVerifyGeneric: "Could not verify the code. Please try again.",
                verifyOk: "You still have {n} of {total} redemptions left on this code.",
                verifyExhausted: "License exhausted: 0 of {total} redemptions left."
            },
            errorCode: {
                invalid_format: "Invalid license code (format XXXX-XXXX-XXXX-XXXX).",
                license_not_found: "License code not found.",
                license_inactive: "License is not active.",
                license_expired: "License has expired.",
                license_exhausted: "License exhausted: no redemptions left.",
                email_mismatch: "Email does not match the one bound to this license.",
                invalid_email: "Invalid email address.",
                invalid_pack: "Invalid pack.",
                pack_unavailable: "Pack unavailable.",
                pack_no_render: "Pack not yet ready for download.",
                race_condition: "Please retry: another request is using the same credit.",
                internal_error: "Internal error. Please try again later.",
                method_not_allowed: "Method not allowed."
            }
        },

        // Categories
        categories: {
            headline: "What it helps with",
            subtitle: "Therapeutic frequencies support many aspects of daily wellbeing",
            cat1: {
                title: "Relax and Sleep",
                description: "Deep relaxation and restorative rest. Ideal for evening and before bedtime."
            },
            cat2: {
                title: "Meditation and Focus",
                description: "Concentration and mental clarity. Perfect for study, work and meditative practices."
            },
            cat3: {
                title: "Energy and Vitality",
                description: "Energetic recharge and active wellness. Great for starting the day."
            },
            cat4: {
                title: "Regeneration and Health",
                description: "Physical recovery and cellular regeneration. Ideal after physical activity."
            },
            footerText: "+ Anxiety, Creativity, Emotional Balance, Healing, and more categories coming."
        },

        // Science Section
        science: {
            headline: "The Science of Sound Wellness",
            intro: "Therapeutic frequencies aren't magic — they're science. Here's how they work.",
            block1: {
                title: "Your Brain is an Orchestra",
                text: "The human brain constantly produces electrical waves oscillating at different frequencies. Each frequency corresponds to a specific mental state: attention, relaxation, deep sleep, or meditation."
            },
            waves: {
                beta: "Awake and attentive state",
                alpha: "Conscious relaxation",
                theta: "Deep meditation, creativity",
                delta: "Deep sleep, regeneration"
            },
            block2: {
                title: "How Frequencies Influence the Brain",
                text: "When you listen to a specific frequency, your brain naturally tends to synchronize with it — a phenomenon called 'neural entrainment'. Binaural and polynaural frequencies leverage this principle to guide the brain toward desired states."
            },
            block3: {
                title: "What Research Says",
                intro: "Scientific studies show exposure to therapeutic frequencies can:",
                benefit1: "Reduce cortisol levels (stress hormone)",
                benefit2: "Increase melatonin production (sleep)",
                benefit3: "Improve brain neuroplasticity",
                benefit4: "Promote deep meditative states",
                benefit5: "Reduce anxiety and depressive symptoms"
            },
            disclaimer: "Audio frequencies are a wellness support tool, not a replacement for professional medical care."
        },

        // PWA Coming Soon Section
        pwa: {
            badge: "Coming Soon",
            headline: "The Healody™ App",
            subtitle: "The complete experience, coming in the next few weeks",
            intro: "The Healody™ App is a Progressive Web App: it installs on your device like a native app, works offline, and gives you access to the entire library of frequencies and protocols.",
            featuresTitle: "What it will offer",
            feat1: {
                title: "Extended library",
                description: "Dozens of direct, binaural, polynaural frequencies and sequential protocols. Each one designed for a specific purpose."
            },
            feat2: {
                title: "Protected audio",
                description: "Content encrypted with AES-256. Your wellness experience is completely private and secure."
            },
            feat3: {
                title: "Works offline",
                description: "Once installed and synced, the App works without internet. Relax anytime, anywhere."
            },
            feat4: {
                title: "Personal stats",
                description: "Listening history, sessions, progress over time. To understand what works best for you."
            },
            howTitle: "How it will work",
            step1Title: "Install and activate",
            step1Desc: "Enter your license code and create your account in seconds.",
            step2Title: "Choose a frequency",
            step2Desc: "Pick the frequency or protocol that matches your mood or goal.",
            step3Title: "Relax",
            step3Desc: "Put on your headphones, hit play, and let the therapeutic sound guide you.",
            installCta: "Install the App",
            installNote: "Coming soon for iOS, Android, and Desktop"
        },

        // Benefits
        benefits: {
            headline: "The Benefits of Healody™ Frequencies",
            subtitle: "Pack or App, the listening effects are the same",
            benefit1: "Reduces stress and anxiety",
            benefit2: "Improves concentration and focus",
            benefit3: "Promotes deep, restorative sleep",
            benefit4: "Enhances overall mental wellbeing",
            benefit5: "Supports meditation and mindfulness",
            benefit6: "Non-invasive, 100% natural"
        },

        // FAQ
        faq: {
            headline: "Frequently Asked Questions",
            q1: {
                question: "What is a therapeutic frequency?",
                answer: "Therapeutic frequencies are specific sound waves that interact with brainwaves to promote states of relaxation, focus, or wellbeing. Each frequency has a specific purpose supported by scientific research."
            },
            q2: {
                question: "What's the difference between Standalone Packs and the App?",
                answer: "Standalone Packs are MP3 files you buy once and download to your device: no app, no account, plays in any audio player. The Healody™ App (coming soon) is the full experience with extended library, listening stats, offline mode, and native app installation. The science and audio quality are identical."
            },
            q3: {
                question: "What exactly does a Pack contain?",
                answer: "Each Pack is a 320 kbps MP3 file, mixed and normalized to -18 LUFS integrated (-1 dBFS true peak). It contains a mix of binaural and polynaural frequencies layered over carefully designed ambient sound. It's a continuous loop with no interruptions."
            },
            q4: {
                question: "When will the Healody™ App be released?",
                answer: "The App is in final testing and will be available in the next few weeks. Meanwhile, the Standalone Packs give you immediate access to the Healody™ experience without waiting."
            },
            q5: {
                question: "Do I need headphones?",
                answer: "Yes, for the optimal experience we recommend good-quality headphones. For binaural frequencies headphones are essential, since each ear must receive a different frequency. For polynaural and ambient, quality stereo speakers can also work."
            },
            q6: {
                question: "Can I use them while sleeping?",
                answer: "Absolutely. The Sleep Pack and Recovery Pack are designed exactly to accompany sleep, with delta and theta frequencies that promote deep rest. Set your player to loop and let yourself drift off."
            },
            q7: {
                question: "Is it safe?",
                answer: "Yes, audio frequencies are completely safe and natural. They have no side effects and can be used by anyone. If in doubt or with specific medical conditions, consult your doctor."
            },
            q8: {
                question: "What is the All-in-One Bundle PDF guide?",
                answer: "An illustrated guide that walks you through the six packs: when during the day to use each, recommended pairings, protocols for specific goals (stress reduction, sleep improvement, sustained focus), and practical session tips. Included only with the Bundle."
            }
        },

        // Final CTA
        finalCta: {
            headline: "Start your journey today",
            subheadline: "Download a Pack now or wait for the App launch. Your call.",
            ctaPack: "Explore the shop",
            ctaPwa: "Discover the PWA"
        },

        // Footer
        footer: {
            tagline: "Wellness through sound",
            privacy: "Privacy Policy",
            cookie: "Cookie Policy",
            terms: "Sales Terms",
            contact: "Contact",
            manageCookies: "Manage cookies",
            copyright: "© 2026 Healody™ · A product of Protocollo Salute™. All rights reserved."
        },

        // PWA Notify Modal
        modal: {
            title: "Healody™ App — Coming soon",
            text: "The Healody™ App is in final testing and will be available in the next few weeks. Meanwhile, you can already download the Standalone Packs and start right away.",
            ctaPack: "Go to shop",
            cancel: "Close"
        },

        // Cookie banner (GDPR)
        cookieBanner: {
            title: "We respect your privacy",
            message: "We use technical cookies essential to the site, and — with your consent — analytical cookies to improve the experience. You can accept all or keep only the essential ones.",
            policyLink: "Read the Cookie Policy",
            privacyLink: "Privacy Policy",
            accept: "Accept all",
            reject: "Essential only"
        }
    }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
