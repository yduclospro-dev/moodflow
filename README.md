# 🌈 MoodFlow

Une application de suivi d'humeur moderne et intuitive construite avec React et Vite.

## 🚀 Démarrage rapide

### Développement local
```bash
npm install
npm run dev
```

### Build de production
```bash
npm run build
npm run preview
```

## 🌐 Déploiement sur Netlify

### Méthode 1 : Déploiement automatique via Git

1. **Connectez votre repository GitHub à Netlify :**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Sélectionnez votre repository GitHub `moodflow`

2. **Configuration automatique :**
   - **Build command :** `npm run build` (déjà configuré dans `netlify.toml`)
   - **Publish directory :** `dist` (déjà configuré dans `netlify.toml`)
   - **Node version :** 18 (déjà configuré dans `netlify.toml`)

3. **Déployer :** Cliquez sur "Deploy site"

### Méthode 2 : Déploiement manuel

```bash
# Build le project
npm run build

# Installer Netlify CLI (une seule fois)
npm install -g netlify-cli

# Login Netlify
netlify login

# Déployer
netlify deploy --prod --dir=dist
```

## ⚙️ Configuration pour Netlify

Les fichiers suivants assurent le bon fonctionnement du routage client-side :

- **`netlify.toml`** : Configuration principale Netlify
- **`public/_redirects`** : Redirection pour React Router
- **`vite.config.js`** : Configuration du serveur de développement

## 🎯 Gestion des erreurs 404

L'application inclut une page 404 personnalisée qui :
- Respecte le thème sombre/clair de l'application
- Propose une navigation intuitive
- Affiche des messages adaptés au contexte de l'app

## 🛠️ Technologies utilisées

- **React 19** + **Vite 7** pour le développement rapide
- **React Router** pour la navigation
- **Tailwind CSS 4** pour le styling
- **Recharts** pour les graphiques
- **Lucide React** pour les icônes
