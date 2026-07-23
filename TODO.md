# TODO — Portfolio 2026

Liste des points à améliorer, classés par priorité.

## 🔴 Bloquant

- [ ] **Node.js obsolète (v16.20.2)** — Vite exige Node ≥20.19 ou ≥22.12. Impossible de lancer `npm run dev` / `npm run build` en local tant que Node n'est pas mis à jour. C'est la priorité n°1 : sans ça, impossible de vérifier visuellement le mode sombre et la traduction ajoutés récemment.
- [ ] **Tester en vrai dans un navigateur** une fois Node à jour : bascule clair/sombre, bascule FR/EN, menu mobile, contraste des textes (notamment le orange sur fond sombre).

## 🟠 SEO / Référencement

- [ ] **Favicon manquant** — aucun favicon dans `public/`, ni de `<link rel="icon">` dans `__root.tsx`. Un onglet sans icône fait "amateur".
- [ ] **`robots.txt` et `sitemap.xml` absents** de `public/` — impacte l'indexation Google.
- [ ] **`og:image` cassée/générique** — pointe vers une URL de preview `lovable.app`, pas une vraie capture du site. À remplacer par une vraie image (screenshot du hero par ex.) hébergée avec le site.
- [ ] **Meta title/description non traduits** — `__root.tsx` sert toujours le même `<title>`/`<meta description>` en SSR quelle que soit la langue choisie ; seul `document.title` est mis à jour côté client après montage (donc invisible pour Google et pour le premier affichage/onglet).
- [ ] Nettoyer les doublons dans les meta tags de `__root.tsx` (plusieurs `name="description"` / `og:description` redondants).

## 🟡 Contenu / Fonctionnalités

- [ ] **CV uniquement en français** (`hamza-moussaif-cv.pdf`) — le bouton "Download CV" pointe vers le même fichier peu importe la langue choisie. Prévoir une version anglaise si tu cibles aussi le marché international.
- [ ] **Aucun visuel de projets** — les 5 projets n'ont que du texte, pas de screenshot/mockup. Un visuel augmente nettement la crédibilité perçue.
- [ ] **Pas de vrai formulaire de contact** — uniquement des liens `mailto:`/`tel:`. À voir si tu veux capter les messages directement (formulaire + email de notification).
- [ ] **Année codée en dur ("2026")** dans le footer et les meta — à automatiser (`new Date().getFullYear()`) pour ne pas l'oublier l'an prochain.

## 🟢 Qualité / Maintenance

- [ ] **Aucun test** (unitaire ou e2e) dans le projet — au minimum un test de rendu des sections et un test de bascule thème/langue.
- [ ] **Pas d'analytics** — aucun moyen de savoir si le portfolio est consulté, par qui, depuis où.
- [ ] `package.json` a un nom générique (`tanstack_start_ts`) — à renommer pour refléter le projet réel.
- [ ] Vérifier l'accessibilité au clavier (Tab) sur toute la page une fois testable en local — le curseur personnalisé masque le curseur natif, donc le focus clavier doit rester bien visible partout (déjà ajouté un style `:focus-visible`, à valider visuellement).

## ⚪ Idées (optionnel, pas urgent)

- [ ] Ajouter l'arabe comme 3e langue (cohérent avec la section "langues parlées" qui liste français/arabe/anglais).
- [ ] Ajouter un bouton "copier l'email" à côté du lien mailto.
- [ ] Ajouter une petite transition de page/scroll-progress bar pour renforcer l'effet "fluide".
