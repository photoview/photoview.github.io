---
title: Installation avec Docker
group: Installation
priority: 1
translationKey: installation-docker
---

De loin la solution la plus facile et rapide pour installer Photoview est l'utilisation d'un container Docker.
Avec Docker, toutes les dépendances sont automatiquement installées et tout est prêt à être utilisé.
Si vous démarrez avec Docker et souhaitez en apprendre plus, vous pouvez vous référer à cet [article par FreeCodeCamp][docker-simplified].

Pour organiser au mieux les containers Docker, un outil appelé [Docker Compose][docker-compose] est utilisé.
Il vous permet de configurer les containers dans un fichier `yaml`, et démarrer rapidement tous les containers configurés en une seule commande.
Bien que cet outil ne puisse rien faire que vous ne puissiez déjà faire avec Docker seul, il simplifie le processus.

[docker-simplified]: https://www.freecodecamp.org/news/docker-simplified-96639a35ff36/
[docker-compose]: https://docs.docker.com/compose/

## Installation avec Docker Compose

> Prérequis : Docker Engine et Docker Compose doivent être installés sur votre serveur.
> Voir [Install Docker Engine][docker-install] et [Install Docker Compose][install-docker-compose] pour savoir comment les installer.

Pour configurer Photoview avec Docker Compose, copiez tout d'abord le contenu du fichier [docker-compose.example.yml][docker-compose.example.yml], et collez-le dans un nouveau fichier `docker-compose.yml`.

Dans ce fichier vous trouverez deux services : le serveur Photoview, appelé `photoview` et une base de données MariaDB database appelée `db`.
Le service Photoview est déjà configuré avec la base de données.

### Configurer le fichier docker-compose.yml

Le fichier compose est prévu pour fonctionner sans aucune modifications. Si vous voulez démarrer rapidement, vous pouvez passer directement à la section [Lancer docker-compose.yml](#lancer-docker-compose.yml).

Mais vous pouvez, si vous le souhaitez, faire quelques changements pour ajuster l'installation à votre configuration personnelle :

#### Port

Vous pouvez changer le port utilisé par Photoview avec la variable : `services.photoview.ports`.
Par défaut, la valeur est `8000:80`, cela signigie que le port `80` à l'intérieur du container est mappé sur le port `8000` de la machine hôte.
Par exemple, si vous souhaitez que votre instance tourne sur le port `1234`, changez la valeur pour mettre `1234:80`.
Remarquez que le port à l'intérieur du container, `80`, correspond à la valeur de `PHOTOVIEW_LISTEN_PORT=80` dans `services.photoview.environment`.

#### Variables d'environment

Dans `services.photoview.environment`, plusieurs variables sont définies pour configurer différentes parties de Photoview. Pour une description détaillée de toutes les variables d'environnement, voir la page : [Variables d'environnement](/{{ locale }}/docs/installation-environment-variables/).

Pour utiliser la fonctionnalité `Lieux` avec les photos qui s'affichent sur la carte du Monde, vous devez configurer la variable `MAPBOX_TOKEN`.
Pour générer un token, il vous faut créer un compte gratuit sur [le site Mapbox][mapbox-access-token].

#### Volumes

Pour que Photoview trouve vos médias, vos fichiers doivent être montés sur un volume à l'intérieur du container de Photoview avec un ou plusieurs [bind mounts][docker-bind-mount].
Ceci est configuré dans `services.photoview.volumes` dans le fichier `docker-compose.yml`.

Par défaut, le point de montage unique est : `./photos_path:/photos:ro`.

Cette ligne est interprétée comme `<HOST_PATH>:<CONTAINER_PATH>:ro`,
cela signifie que `<HOST_PATH>` sur votre machine sera accessible sous `<CONTAINER_PATH>` à l'intérieur du container Photoview.
Par la suite, lorsque vous configurerez le chemin des fichiers sur l'interface de Photoview, vous mettrez le chemin défini sous `<CONTAINER_PATH>`.

Le `:ro` à la fin signifie que les fichiers seront montés en lecteur seule (`read-only`) et qu'il sera bien impossible pour Photoview de modifier vos fichiers.
Ceci est optionnel, mais recommandé pour accroitre la sécurité de vos données.

Vous pouvez ajouter autant de points de montage que vous voulez. Par exemple, si vos médias sont stockés dans le répertoire `Pictures` de votre répertoire utilisateur de votre ordinateur, vous pourriez mettre : `/home/ben/Pictures:/bens_pictures`. A l'intérieur du container, le dossier des médias sera donc accessible sur `/bens_pictures`.

### Lancer docker-compose.yml

Pour démarrer les containers Docker déclarés dans le fichier `docker-compose.yml` executez la commande suivante :

```shell
$ docker-compose up -d
```

Cela démarrera les containers, l'option `-d` signifie que cela est fait en tâche de fond (en background).
Une fois que le système a démarré, vous pouvez accéder à l'application sur `http://localhost:8000`, à moins que vous n'ayez changé le port bien sûr.

Ci-dessous quelques commandes utiles avec Docker Compose.

```shell
$ docker-compose down # stop the containers
$ docker-compose logs # show the logs of the containers
$ docker-compose ps   # show status of the running containers
```

[docker-install]: https://docs.docker.com/engine/install/
[install-docker-compose]: https://docs.docker.com/compose/install/
[docker-bind-mount]: https://docs.docker.com/storage/bind-mounts/
[docker-compose.example.yml]: https://github.com/photoview/photoview/blob/master/docker-compose%20example/docker-compose.example.yml
[mapbox-access-token]: https://account.mapbox.com/access-tokens/

## Docker tags et versioning

Avec Docker, la version de Photoview peut être spécifiée en utilisant un tag.
Vous pouvez utiliser les tags suivants :

- `latest`, pour utiliser la dernière release.
- `edge`, cela correspond à la branche `master` et peut donc contenir des fonctionnalités non terminées. Il n'est donc pas conseillé de l'utiliser en production.

En plus de ces tags, vous pouvez également utiliser une version spécifique.
Pour cela, utilisez le formalisme suivant : `x.y.z` (ex : `2.3.12`) ou `x.y` (ex : `2.3`) ou `x` (ex `2`), avec :

- `x` est la version majeure, chaque version majeure n'est en général pas compatible avec la précédente.
- `y` est la version mineure, chaque version mineure inclut des fonctionnalités et des changements majeurs mais conserve la compatibilité.
- `z` est une version patch, un patch inclut uniquement des améliorations mineures et des résolutions de bugs.

Si vous spécifiez une version complète, par exemple `2.3.12`, alors cela correspond à cette release spécifique et l'image ne changera pas.
Mais si vous choisissez `2.3` par exemple, alors cela correspond au dernier patch `2.3.z`, donc si une version patch suivante est publiée, votre version `2.3` sera mise à jour.
Enfin, `2` permet d'obtenir la dernière version majeure à jour.

C'est recommandé d'utiliser version `2` dans la plupart des cas, ce qui vous permettra d'avoir toujours la dernière version à jour, tout en vous garantissant une compatibilité et donc aucun breaking change lors des mises à jour.

## Mise à jour

Pour mettre à jour Photoview dans un environnement docker-compose, utilisez simplement les commandes suivantes :

```bash
$ docker-compose pull    # Pull the latest images
$ docker-compose up -d   # Restart and update the containers whose images has changed
```
