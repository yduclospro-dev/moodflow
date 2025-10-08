# 🌈 MoodFlow

Une application de suivi d'humeur moderne et intuitive construite avec React et Vite.

## 1. Choix UX

- **Interface simple et intuitive** : La navigation entre la semaine et le mois est claire grâce aux flèches de navigation qui permettent à l'utilisateur de ses humeurs de la semaine dernière.  
- **Sélection de l’humeur** : Cliquer sur un jour ouvre un modal avec les choix d’émotion représentés par des emojis et des couleurs avec la possibilité d'en supprimer si nécessaire.  
- **Feedback visuel immédiat** : La couleur de fond s’adapte à l’humeur choisie, en version pastel pour ne pas fatiguer les yeux.  
- **Responsive design** : L’application est utilisable sur mobile, tablette et desktop.  
- **Dark mode** : Activation/désactivation possible via un toggle pour le confort visuel.
- **Interface Responsive** : Grâce à un responsive complet, le site peut être utilisé sur n'importe quel support. 

## 3. Bonus implémentés

- Thème sombre / clair automatique
- Vue calendrier mensuelle
- Génération automatique de phrase résumant la semaine
- Animation ou effet visuel original (ex: fond de couleur qui varie selon l’humeur moyenne)  


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
- **hostinger** pour le déploiement