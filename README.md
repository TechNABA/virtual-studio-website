# NABA — Virtual Studio

Sito di presentazione del dipartimento R&D di NABA — Virtual Studio — replica statica del portale Productboard originale, costruita con [Astro](https://astro.build) e ospitata su GitHub Pages.

Zero servizi esterni, zero costi, zero manutenzione. Per aggiungere o modificare contenuti basta modificare file Markdown nel repository.

---

## Indice

1. [Come è fatto](#1-come-è-fatto)
2. [Setup iniziale: da zero a sito online](#2-setup-iniziale-da-zero-a-sito-online)
3. [Aggiungere un nuovo progetto](#3-aggiungere-un-nuovo-progetto)
4. [Modificare un progetto esistente](#4-modificare-un-progetto-esistente)
5. [Aggiungere le immagini](#5-aggiungere-le-immagini)
6. [Collegare il dominio `rd.naba.it`](#6-collegare-il-dominio-rdnabait)
7. [Sviluppo locale (facoltativo)](#7-sviluppo-locale-facoltativo)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Come è fatto

```
naba-xr-studio/
├── src/
│   ├── content/projects/      ← QUI stanno i progetti (un file .md per progetto)
│   │   ├── multi-user.md
│   │   ├── switchboard.md
│   │   └── _template.md.example  ← copia questo per creare un nuovo progetto
│   ├── pages/                 ← Le pagine del sito (non toccare a meno di modifiche strutturali)
│   ├── layouts/               ← Header, navigazione, footer
│   └── components/            ← Card, gruppi-categoria
├── public/
│   └── images/                ← QUI mettere le immagini dei progetti
├── .github/workflows/deploy.yml ← Build & deploy automatico su GitHub Pages
└── astro.config.mjs           ← Configurazione (dominio, base path)
```

**Due tab**, ciascuno è una pagina:
- `In-Camera VFX` → homepage (`/`)
- `Performance Capture` → `/performance-capture/`

All'interno di ogni tab i progetti sono raggruppati in **categorie** (es. "Media System", "Pipeline"). La categoria di un progetto è un campo del file Markdown — puoi usare quelle esistenti o crearne di nuove semplicemente scrivendole.

---

## 2. Setup iniziale: da zero a sito online

Da fare **una sola volta**, all'inizio.

### 2.1 Crea un repository su GitHub

1. Vai su [github.com/new](https://github.com/new)
2. Nome del repo: `naba-xr-studio` (o quello che preferisci — basta ricordarselo)
3. **Public** (necessario per GitHub Pages gratuito; alternativa: account GitHub Pro per repo privati con Pages)
4. NON aggiungere README, .gitignore, licenza — il progetto ne porta già di suoi
5. Clicca "Create repository"

### 2.2 Carica i file

Il modo più semplice, senza linea di comando:

1. Estrai lo zip che ti ho consegnato in una cartella sul tuo computer
2. Nel repo appena creato su GitHub, clicca "uploading an existing file"
3. Trascina **tutto il contenuto** della cartella estratta (NON la cartella intera — il contenuto: cartelle `src`, `public`, `.github`, e i file `package.json`, `astro.config.mjs`, ecc.)
4. Scrivi "Initial commit" nel messaggio e clicca "Commit changes"

> ⚠️ Le cartelle che iniziano con `.` (come `.github`) possono essere nascoste dal Finder/Esplora Risorse. Su macOS premi `Cmd+Shift+.` per mostrarle. Su Windows, in Esplora Risorse: Visualizza → Elementi nascosti.

### 2.3 Aggiorna `astro.config.mjs` con il tuo username

Nel file `astro.config.mjs` trovi queste righe:

```js
site: 'https://your-username.github.io',
base: '/naba-xr-studio',
```

Modificale così, sostituendo `tuousername` con il tuo username GitHub e `naba-xr-studio` col nome del repo (se l'hai chiamato diversamente):

```js
site: 'https://tuousername.github.io',
base: '/naba-xr-studio',
```

Puoi modificarlo direttamente dall'interfaccia web di GitHub (apri il file → icona matita → salva con "Commit changes").

### 2.4 Attiva GitHub Pages

1. Nel repo, vai su **Settings** (in alto a destra)
2. Nella barra laterale sinistra, clicca **Pages**
3. Alla voce **Source**, seleziona **GitHub Actions**
4. Fatto

### 2.5 Aspetta il primo deploy

1. Vai sul tab **Actions** del repo
2. Vedrai un workflow in esecuzione ("Deploy to GitHub Pages")
3. Dopo ~1-2 minuti diventa verde ✓
4. Il sito è online all'indirizzo: `https://tuousername.github.io/naba-xr-studio/`

Da qui in poi, **ogni volta che fai una modifica** (aggiungi un progetto, cambi un testo) GitHub rigenera automaticamente il sito.

---

## 3. Aggiungere un nuovo progetto

Ogni progetto è un file `.md` dentro `src/content/projects/`.

### Via interfaccia web GitHub (il modo consigliato)

1. Sul repo, naviga in `src/content/projects/`
2. Clicca **Add file → Create new file**
3. Nome del file: `nome-progetto.md` (tutto minuscolo, trattini al posto degli spazi — questo sarà anche l'URL)
4. Incolla questo template e modificalo:

```markdown
---
title: "Nome del Progetto"
tab: "in-camera-vfx"
category: "Media System"
order: 1
status: "active"
cover: "/images/nome-progetto.jpg"
---

- Primo bullet point di descrizione
- Secondo bullet
- Terzo bullet

Puoi anche scrivere paragrafi di testo normale. Supporta **grassetto**, *corsivo*, [link](https://esempio.com) e liste numerate.
```

5. Clicca **Commit changes** in fondo
6. Attendi 1-2 minuti e il progetto appare sul sito

### Spiegazione dei campi

| Campo | Obbligatorio | Valori validi |
|---|---|---|
| `title` | ✅ | Qualsiasi testo tra virgolette |
| `tab` | ✅ | `"in-camera-vfx"` \| `"performance-capture"` |
| `category` | ✅ | Testo libero (es. `"Media System"`, `"Pipeline"`, o nuove categorie a piacere) |
| `order` | ⚪ | Numero. Più basso = appare prima nella griglia |
| `status` | ⚪ | `"active"` (default) \| `"wip"` (mostra "(WIP)" nel titolo) \| `"planned"` (mostra "(Planned)") |
| `cover` | ⚪ | Percorso di un'immagine in `/public/images/...` oppure URL `https://...` |
| `youtubeId` | ⚪ | ID del video YouTube (la parte dopo `v=` nell'URL). Se presente, embedda il video sotto al testo del progetto |

I campi sono tra `---` in alto (si chiama "frontmatter"). Il **contenuto** del progetto va dopo il secondo `---` ed è Markdown standard.

---

## 4. Modificare un progetto esistente

1. Vai al file `.md` su GitHub (es. `src/content/projects/multi-user.md`)
2. Clicca l'icona matita (**Edit**) in alto a destra
3. Modifica quello che ti serve
4. Clicca **Commit changes**
5. Il sito si aggiorna in 1-2 minuti

Per **cancellare** un progetto: apri il file → icona cestino → commit.

---

## 5. Aggiungere le immagini

Il sito cerca automaticamente in `public/images/` un'immagine **con lo stesso nome del file Markdown del progetto**. Basta seguire questa convenzione e non devi modificare il campo `cover:`.

**Esempio concreto**: per il progetto `src/content/projects/multi-user.md`, il sito cerca automaticamente (in ordine):
- `public/images/multi-user.jpg`
- `public/images/multi-user.jpeg`
- `public/images/multi-user.png`
- `public/images/multi-user.gif`
- `public/images/multi-user.webp`

Usa la prima che trova. Se non ne trova nessuna, mostra il placeholder scuro.

### Come caricare le immagini

1. Nomina il file con lo stesso slug del progetto (es. `led-volume.png`, `brainbar.jpg`, `ocio.gif`)
2. Su GitHub, naviga in `public/images/` → **Add file → Upload files** → trascina i file → **Commit changes**
3. In 1-2 minuti il sito si aggiorna e le immagini compaiono

### Se per qualche motivo vuoi usare un nome o percorso diverso

Puoi forzare manualmente il percorso nel file `.md` del progetto con:
```yaml
cover: "/images/un-altro-nome.jpg"
```
o anche un URL esterno:
```yaml
cover: "https://example.com/image.jpg"
```

**Dimensioni consigliate**: 1600×900 px (rapporto 16:9) per una buona resa, file sotto 500 KB. Puoi comprimere con [squoosh.app](https://squoosh.app) prima di caricarli.

**GIF animate**: supportate. Appariranno animate sia sulla card della homepage che nella pagina di dettaglio.

---

## 6. Collegare il dominio `rd.naba.it`

Da fare **quando l'IT di NABA è pronto**. Prima il sito funziona sull'URL `tuousername.github.io/naba-xr-studio` — vai avanti a lavorarci tranquillamente.

### 6.1 Chiedi all'IT di NABA di aggiungere questo record DNS

Due opzioni:

**Opzione A — record CNAME (consigliata)**

```
Type:  CNAME
Name:  rd               (produce rd.naba.it)
Value: tuousername.github.io.
TTL:   3600
```

**Opzione B — record A multipli** (se per qualche motivo non possono fare CNAME)

```
Type: A   Name: rd   Value: 185.199.108.153
Type: A   Name: rd   Value: 185.199.109.153
Type: A   Name: rd   Value: 185.199.110.153
Type: A   Name: rd   Value: 185.199.111.153
```

### 6.2 Configura il dominio su GitHub

1. Sul repo: **Settings → Pages**
2. Alla voce **Custom domain** scrivi `rd.naba.it` e salva
3. Attendi che la verifica diventi verde (può richiedere qualche ora di propagazione DNS)
4. Spunta **Enforce HTTPS** quando disponibile

### 6.3 Aggiorna `astro.config.mjs`

Cambia il file così:

```js
site: 'https://rd.naba.it',
// base: '/naba-xr-studio',   ← rimuovi questa riga (o mettila a '/')
```

Commit → il sito torna online sul dominio custom in 1-2 minuti.

---

## 7. Sviluppo locale (facoltativo)

Se vuoi vedere le modifiche in anteprima sul tuo computer prima di committare:

**Prerequisiti**: [Node.js 20+](https://nodejs.org)

```bash
# Clona il repo (una volta)
git clone https://github.com/tuousername/naba-xr-studio.git
cd naba-xr-studio

# Installa le dipendenze (una volta)
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri `http://localhost:4321/naba-xr-studio/` nel browser. Le modifiche ai file vengono ricaricate istantaneamente.

---

## 8. Troubleshooting

**Il deploy su Actions fallisce**
- Vai su **Settings → Pages** e assicurati che "Source" sia impostato su **GitHub Actions** (non su "Deploy from a branch")
- Controlla il log su **Actions** → clic sul workflow fallito → leggi il messaggio di errore

**Il sito è online ma le immagini non si vedono**
- Verifica che il file sia davvero in `public/images/` (non in `src/`)
- Verifica che nel frontmatter il percorso inizi con `/images/...` (slash iniziale)
- Il nome del file è case-sensitive: `Foto.jpg` ≠ `foto.jpg`

**Un progetto non appare nella tab giusta**
- Controlla che il valore di `tab:` sia uno dei due esatti: `in-camera-vfx`, `performance-capture`
- Nessuna maiuscola, trattino (non underscore)

**Errore "Schema validation failed"**
- Un campo obbligatorio manca o ha un valore non valido nel frontmatter
- Il log di Actions ti dice quale file e quale campo

**Ho committato qualcosa di sbagliato, come torno indietro?**
- Su GitHub: vai in **Commits**, clicca sul commit precedente a quello sbagliato, copia l'hash, poi chiedi aiuto (o fammi scrivere il comando di revert la prossima volta)

---

## 9. Personalizzare tema e font

Il sito è in **dark mode** con font **IBM Plex Sans**. Se in futuro vuoi cambiare palette o tipografia, tutti i parametri sono in **`tailwind.config.mjs`**:

```js
colors: {
  'page-bg': '#0a0a0a',        // sfondo della pagina (nero profondo)
  'card-bg': '#141414',        // sfondo delle card e dell'header
  'card-bg-hover': '#191919',  // card al passaggio del mouse
  'border-subtle': '#262626',  // bordi e linee divisorie
  'text-primary': '#f4f4f5',   // testo principale
  'text-secondary': '#a1a1aa', // testo secondario
  'text-muted': '#52525b',     // testo attenuato (placeholder, date)
},
fontFamily: {
  sans: ['"IBM Plex Sans"', ...],
},
```

Cambiare palette è questione di modificare i codici esadecimali e fare commit — il sito si ripubblica automaticamente. Per cambiare font, sostituisci `"IBM Plex Sans"` con un altro font di Google Fonts e aggiorna anche il `<link>` in `src/layouts/BaseLayout.astro`.

---

## Note finali

- Il widget "How important is this to you?" del Productboard originale **è stato rimosso** — era un meccanismo di raccolta feedback interno a Productboard, non serve a un sito vetrina
- Le schede di dettaglio dei progetti sono **pagine autonome** (URL condivisibili) invece di modal — meglio per SEO e per mandare link diretti
- Il logo NABA in alto a sinistra è un placeholder: sostituiscilo con il logo reale modificando `src/layouts/BaseLayout.astro` (posso aiutarti quando avrai l'SVG ufficiale)
