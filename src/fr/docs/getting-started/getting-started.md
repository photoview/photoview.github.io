---
title: Démarrer
group: root
priority: 2
translationKey: getting-started
---

_Démarrez avec Photoview rapidement et simplement._

## Installation avec Docker

Le moyen le plus simple pour installer **Photoview** est d'utiliser Docker avec docker-compose.

### Configurer le fichier docker-compose

Commencez par créer un nouveau fichier `docker-compose.yml`, puis collez-y le contenu du fichier [docker-compose.example.yml](https://github.com/photoview/photoview/blob/master/docker-compose%20example/docker-compose.example.yml).

Ouvrez le fichier `docker-compose.yml`, trouvez les commentaires commençant par `Change This:`, puis modifiez les valeurs pour qu'elles correspondent à votre configuration.
Si vous faites simplement des tests sur votre machine en local, vous n'avez rien à modifier, laissez les valeurs telles quelles.

Pour plus de détails rendez-vous sur la page [Installation avec Docker](/fr/docs/installation-docker/)

## Démarrer le serveur

Lancez la commande suivante pour démarrer le serveur :

```bash
docker-compose up -d
```

Photoview est désormais accessible à l'URL [http://localhost:8000](http://localhost:8000) (sauf si vous avez modifié le port ou l'URL par défaut dans le fichier  `docker-compose.yml`).

## Assistant de configuration

Lorsque vous visitez le site pour la première fois, vous devriez voir le formulaire de configuration s'afficher.

{% optimizedImage './initial-setup.png', 'initial setup screen', 'class="block w-100 my-8"' %}

Entrez un nouveau **username** et **password**.

En ce qui concerne le **photo path**, entrez le chemin dans le conteneur Docker où se trouvent vos photos.
Cela peut être réglé depuis le fichier `docker-compose.yml` avec le paramètre `api` -> `volumes`.
La localisation par défaut est : `/photos`.

Un nouvel utilisateur administrateur sera ainsi créé, avec accès à toutes les photos se trouvant dans le répertoire précisé dans le _path_ que vous avez défini.

Avant que les photos s'affichent, elles doivent être scannées. Pour démarrer manuellement le scanner, rendez-vous dans la rubriques `Paramètres` puis cliquez sur `Analyser`
