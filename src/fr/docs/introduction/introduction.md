---
title: Introduction
group: root
priority: 1
translationKey: introduction

permalink: /{{ locale }}/docs/
---

{% optimizedImage './timeline.png', 'Screenshot of Photoview', 'class="block w-4/5 mx-auto my-6"' %}


Photoview est une galerie photo simple et conviviale conçue pour les photographes
et qui vise à fournir un moyen simple et rapide de naviguer dans vos répertoires photos, avec des milliers de photos haute résolution.

Sélectionnez simplement un (ou plusieurs) répertoire de votre système de fichiers et Photoview recherchera toutes les photos et vidéos.
Le scanner analysera alors automatiquement vos médias et commencera à générer des images miniatures pour rendre la navigation très rapide.
Il convient de noter que Photoview ne touchera JAMAIS réellement vos médias, il n'a besoin que d'un accès en lecture et il enregistre les vignettes dans un cache indépendant du média d'origine.

Lorsque les médias ont été scannés, ils apparaissent sur le site Web, organisés de la même manière que sur votre système de fichiers.
À partir du site Web, il est également possible de voir vos médias sur une carte du monde, si les fichiers contiennent des informations de localisation intégrées.

## Objectifs et valeurs

Depuis son origine, Photoview est développé avec des objectifs et des valeurs précises.

**Le système de fichier est _LA référence unique_**,
c'est le point le plus important du logiciel.
Il y a deux avantages très importants au fait de laisser l'organisation de vos médias à votre système de fichiers :
- Premièrement, cela permet une plus grande flexibilité pour organiser vos photos, puisque vous pouvez utiliser n'importe quel outil pour organiser et classer vos photos et vidéos, que ce soit un simple serveur de fichiers comme FTP ou NTFS ou bien un service cloud comme [Nextcloud](/{{ locale }}/docs/usage-nextcloud/) ou autre.
- Deuxièmement, cela supprime toute dépendance au logiciel de photos, en effet si vous choisissez de désinstaller Photoview, vos fichiers resteront inchangés et toujours organisés comme vous le souhaitez.

**Les fichiers originaux ne sont JAMAIS modifiés**,
cela renforce considérablement la sécurité car vos médias peuvent rester en lecture seule (`read-only`). Cela signifie que c'est vous qui pouvez garantir la sécurité de vos photos et vidéos, pas besoin de _faire confiance_ au logiciel Photoview pour cela.

## Fonctionnalités

- **Lié au système de fichiers**. L'application Web Photoview montre toutes les images et vidéos trouvées sur le système de fichier local du serveur (selon votre configuration), ainsi, les albums représentent directement les répertoires trouvés.
- **Gestion par utilisateur**. Chaque utilisateur peut ajouter un ou plusieurs chemins de répertoires sur le système de fichiers local, Photoview analyse alors ces répertoires et les photos sont rendues accessibles sur le site, pour cet utilisateur.
- **Partage**. Les albums, comme les médias de manière individuelle, peuvent être facilement partagés publiquement grâce à un lien de partage, qui peut être optionnellement protégé par un mot de passe.
- **Support des formats RAW**. [Darktable](https://www.darktable.org/) est utilisé pour convertir automatiquement des fichiers RAW, et ce depuis une grande variété d'[appareils photo supportés](https://www.darktable.org/resources/camera-support/).
- **Analyse des données EXIF**. Photoview analyse les données EXIF de chaque média et les affiche dans le panneau d'informations lorsque vous cliquez sur le (i) sur la vignette du média.
- **Détection des doublons**. Si l'analyseur trouve une paire d'images RAW et JPEG l'une à côté de l'autre, une seule image sera affichée et l'image JPEG sera utilisée au lieu de générer une nouvelle image dans le cache.
- **Support des vidéos**. La plupart des formats vidéos sont pris en charge. Les vidéos seront automatiquement optimisées pour le Web.
- **Timeline (Photos)**. La vue par défaut affiche les médias par jour, par ordre de création, et les groupe jour par jour.
- **Lieux**. Les photos contenant des coordonnées GPS sont affichées sur la carte du Monde.
- **Reconnaissance faciale**. Les visages sont automatiquement détéctés (sauf si vous désactivez cette fonctionnalité), et les photos d'une même personne sont groupées.
L'onglet _Personnes_ vous permet de gérer cette fonctionnalité avec beaucoup de souplesse.
- **Performance**. Des vignettes sont générées automatiquement pour accélérer la navigation. D'autre part, les photos ne sont chargées que lorsqu'elles sont visibles à l'écran ce qui accélère également la navigation dans votre bibliothèque de médias. En plein écran, la vignette est affichée puis remplacée par l'image originale en haute résolution dès que celle-ci est chargée par le navigateur.
- **Securisé**. Toutes les ressources, pages Web comme médias, sont protégées en accès par un token présent dans un cookie vous assurant que seul un utilisateur connecté peut y accéder. Un algorithme de chiffrement est utilisé pour encoder les mots de passe. Enfin, l'API utilise, lorsque c'est nécessaire une stricte [politique CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS).
- **Support des bases de données**. MySQL, Postgres et Sqlite databases sont supportés.

## Comment démarrer ?

- Pour démarrer le plus rapidement possible avec Photoview, rendez-vous sur la rubrique [Démarrer](/{{ locale }}/docs/getting-started/).
- Pour plus de détails, voir la rubrique [Installation avec Docker](/{{ locale }}/docs/installation-docker/).
- Pour une installation manuelle sans Docker, lisez le guide [Installation manuelle](/{{ locale }}/docs/installation-manual/).
