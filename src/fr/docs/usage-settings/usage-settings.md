---
title: Page des paramètres
group: Utilisation
translationKey: usage-settings
---

## Gestion des utilisateurs

### Ajouter et supprimer des utilisateurs

Pour ajouter un nouvel utilisateur, cliquez sur le bouton `Nouvel utilisateur` et renseignez un nom d'utilisateur et un chemin de fichier pour ce nouvel utilisateur.
Après avoir créé ce nouvel utilisateur, ajoutez un mot de passe en cliquant sur le bouton `Changer le mot de passe` sur la ligne de l'utilisateur dans le tableau des réglages.

{% optimizedImage './add-user.png', 'screenshot of adding a new user', 'class="block w-full my-8"' %}

### Modifier les utilisateurs

Utilisez le bouton `Editer` pour modifier les paramètres d'un utilisateur.

**Chemin des photos :** c'est le chemin système sur lequel se trouvent les fichiers des médias.
A noter que si vous utilisez Docker, cela se réfère au chemin à l'intérieur du container et non à celui de la machine hôte.
On peut ajouter plusieurs répertoires, si les médias de l'utilisateur sont répartis à différents endroit du système de fichiers.
Pour plus d'informations, voir la page [Analyseur (scanneur) de fichiers](../usage-scanner).

**Administrateur :** si l'utilisateur est marqué comme administrateur, il pourra gérer le scanneur de fichiers et gérer les utilisateurs.

{% optimizedImage './edit-user.png', 'screenshot of editing a user', 'class="block w-full my-8"' %}

## Scanneur

### Scan périodique

Lorsque le scan périodique est activé, Photoview analysera automatiquement tous les nouveaux médias de tous les utilisateurs avec l'intervalle de temps défini.

{% optimizedImage './periodic-scanner.png', 'screenshot of periodic scanner', 'class="block w-96 my-8"' %}

### Tâches simultanées

Ce paramètre permet de définir combien de tâches du scanner peuvent être executées en même temps, en tâche de fond.
Plus la valeur est petite, plus long sera le temps d'analyser tous les médias, mais moins cela utilisera de ressources système.
Par exemple, si vous faites tourner Photoview sur une machine avec peu de capacités comme un Raspberry Pi, il vaut mieux régler ce paramètre sur `1`.
