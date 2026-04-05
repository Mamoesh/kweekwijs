# 🌿 HerbalRoot

Persoonlijk kwekerijadvies voor kruiden, groenten en fruit — van zaad tot bloei.

Een **Progressive Web App (PWA)** die werkt als een native Android-app wanneer je hem toevoegt aan je startscherm.

---

## 🚀 Online zetten via GitHub Pages (gratis)

### Stap 1 — Repo aanmaken

1. Ga naar [github.com/new](https://github.com/new)
2. Geef de repo een naam, bijv. `herbalroot`
3. Zet op **Public**
4. Klik **Create repository**

### Stap 2 — Bestanden uploaden

Upload alle bestanden uit deze repo naar jouw nieuwe GitHub repo. Dat kan via de GitHub website (drag & drop) of via Git:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/JOUW-NAAM/herbalroot.git
git push -u origin main
```

### Stap 3 — GitHub Pages activeren

1. Ga naar je repo → **Settings** → **Pages**
2. Onder *Source* kies: **GitHub Actions**
3. De workflow (`.github/workflows/deploy.yml`) regelt de rest automatisch

Na een minuut is de app live op:
```
https://JOUW-NAAM.github.io/herbalroot/
```

---

## 📱 Installeren als Android-app

1. Open de URL hierboven in **Chrome** op je Android-toestel
2. Tik op de drie puntjes rechtsboven → **"Toevoegen aan startscherm"**
3. Bevestig → de app verschijnt op je startscherm als een echte app

De app werkt ook **offline** dankzij de service worker.

---

## 📁 Bestandsstructuur

```
herbalroot/
├── index.html          # De volledige app
├── manifest.json       # PWA manifest (naam, iconen, kleuren)
├── sw.js               # Service worker (offline support)
├── icons/              # App-iconen in alle formaten
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── .github/
    └── workflows/
        └── deploy.yml  # Automatische GitHub Pages deployment
```

---

## ✨ Features

- 🌿 **Kruidentuin** — 40+ kruiden met zaai-, oogst- en bewaringsinfo
- 🥦 **Moestuin** — volledige groentenbibliotheek
- 🍓 **Fruitgids** — fruit van aardbei tot vijg
- 🍳 **Recepten** — gerechten, drankjes, thee en desserts
- 🌍 **Community** — tips delen met andere kwekers
- 👤 **Profiel** — persoonlijke instellingen en plantendagboek
- 📴 **Offline** — werkt zonder internetverbinding
- 🌐 **Meertalig** — Nederlands, Engels en Frans

---

## 🔧 Lokaal testen

Een PWA vereist een webserver (niet gewoon `file://` openen). Gebruik bijv.:

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Open daarna `http://localhost:8080` in Chrome.
