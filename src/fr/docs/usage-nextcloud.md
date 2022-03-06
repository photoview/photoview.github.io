---
title: Utilisation avec Nextcloud
group: Utilisation
translationKey: usage-nextcloud
---

Photoview peut être configuré pour utiliser les médias depuis une instance [Nextcloud](https://nextcloud.com/).

## Localiser les fichiers Nextcloud sur le système de fichiers

Tous les fichiers ajoutés à Nextcloud sont localisés dans le répertoire `data/` à l'endroit où Nextcloud est installé.
Dans ce répertoire, il y a un répertoire pour chaque utilisateur Nextcloud qui contient tous les fichiers uploadés par chaque utilisateur.

Ensuite, trouvez le chemin du répertoire dans lequel se trouvent vos médias et copiez-le, vous en aurez besoin par la suite. Par exemple, le chemin peut ressembler à :

    ~/nextcloud/data/example_user/files/Photos

## Configurer Photoview

L'étape suivante sera d'ajouter ce chemin dans les paramètres de l'utilisateur Photoview.

### Ajouter le chemin comme volume Docker

> Si vous n'utilisez pas Docker pour faire marcher Photoview, vous pouvez sauter cette étape.

Avant que les fichiers Nextcloud ne soient accessibles par le container Photoview, ils doivent être montés comme un [volume](https://docs.docker.com/storage/volumes/).

Pour faire cela, ouvrez le fichier de configuration `docker-compose.yml` et ajoutez sous `volumes:` le nouveau volume, comme ceci :

    - NEXTCLOUD_PATH:/nextcloud:ro

Remplacez `NEXTCLOUD_PATH` par le chemin que vous avez copié à l'étape 1.
Le chemin `/nextcloud` indique au container le point de montage à utiliser, ce qui sera important pour l'étape suivante.
Le `:ro` à la fin, indique à Docker de monter le répertoire en mode lecture seule (`read-only`).

Maintenant vous pouvez redémarrer le container Docker.

## Ajouter le chemin de fichiers à l'utilisateur Photoview

Vous pouvez maintenant ajouter le chemin à l'utilisateur depuis la page des Réglages, en cliquant sur le bouton `Editer` dans le tableau d'action, sur la ligne de l'utilisateur.

Si vous avez monté le volume comme indiqué dans les étapes précédentes, vous devez utiliser le chemin `/nextcloud`.
Une fois ajouté, cliquez sur `Sauvegarder` pour enregistrer ce paramètre.
Cliquez ensuite sur `Analyser` pour que les photos et vidéos présentes dans votre répertoire Nextcloud apparaissent dans Photoview.

## Garder Photoview à jour automatiquement

Pour ne pas avoir à cliquer sur `Analyser`à chaque fois que vous ajoutez des fichiers à Nextcloud, vous pouvez [configurer une analyse périodique](/{{ locale }}/docs/usage-settings/#scan-périodique) pour scanner les changements automatiquement.
