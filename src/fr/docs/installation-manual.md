---
title: Installation manuelle
group: Installation
priority: 2
translationKey: installation-manual
---

Cette page explique comment builder, installer et configurer Photoview sur une _fresh install_ de `Ubuntu 20.04 LTS` pour lancer Photoview directement sans utiliser Docker.

## Préparation

Tout d'abord, commencez par installer les dépendances nécessaires pour faire tourner Photoview.

```shell
# Mise à jour de votre OS
$ sudo apt update
$ sudo apt upgrade

# Installation des outils utilisés dans ce guide
$ sudo apt install git curl wget

# Installation des répertoires de dépendances nécessaires
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:strukturag/libheif
$ sudo add-apt-repository ppa:strukturag/libde265

# Installation des dépendances nécessaires pour Photoview
$ sudo apt install libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg-turbo8-dev build-essential \
  libdlib19 libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg-dev libheif-dev pkg-config gpg zlib1g-dev
```

Installez ensuite Golang en suivant les instructions pour Linux depuis leur page [Download and install Go](https://golang.org/doc/install), cela devrait ressembler aux commandes suivantes :

```shell
# Download Go
$ wget https://golang.org/dl/go1.16.linux-amd64.tar.gz

# Install Go
$ sudo tar -C /usr/local -xzf go1.16.linux-amd64.tar.gz
$ rm go1.16.linux-amd64.tar.gz

# Add Go to the path of your user
$ echo 'export PATH=$PATH:/usr/local/go/bin' >> "$HOME/.bashrc" && source "$HOME/.bashrc"

# Verify that go is now installed
$ go version
# Expected output: go version go1.16 linux/amd64
```

Maintenant, installez Node 18 et NPM si vous ne les avez pas déjà installés sur votre système.

```shell
$ curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
$ sudo apt install nodejs
```

## Téléchargez et buildez Photoview

Rendez-vous sur la page [Photoview Releases](https://github.com/photoview/photoview/releases) et téléchargez la dernière version du code source, extrayez le répertoire et ouvrez le dans un Terminal.

```shell
$ cd /opt
$ git clone https://github.com/photoview/photoview.git
$ cd photoview/
```

### Buildez la partie front (la Web UI)

```shell
$ cd ui/
$ npm install
$ npm run build
```

Cela build le code source de l'UI et l'enregistre dans le répertoire `ui/dist/`.

### Buildez l'API back-end

```shell
$ cd api/
$ go build -v -o photoview .
```

Cela build l'executable côté serveur et l'enregistre dans `api/photoview`.

### Copiez UI et back-end au bon endroit

Créez un nouveau répertoire et deplacez les fichiers créés dedans.

```shell
$ cd /opt/photoview
$ mkdir app
$ cp -r ui/dist/ app/ui/
$ cp api/photoview app/photoview
$ cp -r api/data/ app/data/
```

## Configurez la base de données

> Nous vous recommandons fortement d'utiliser une base de données complète,
> mais Sqlite est aussi supporté bien qu'il soit bien plus lent en cas d'utilisation avec de grosses bibliothèques de médias.
> Si vous choisissez d'utiliser Sqlite, vous pouvez sauter cette étape.

Si vous n'avez pas encore installé MySQL sur votre système, vous pouvez le faire en suivant ce guide : [installing MySQL on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04).

Ensuite, créez une nouvelle base de données et un utilisateur avec les droits d'accès sur cette base.

```shell
$ sudo mysql
# Create new user named 'photoview'
mysql> CREATE USER 'photoview'@'localhost' IDENTIFIED BY 'Photo_Secret#12345';
# Create new database named 'photoview'
mysql> CREATE DATABASE photoview;
# Grant user full access to the newly created database
mysql> GRANT ALL PRIVILEGES ON photoview.* TO 'photoview'@'localhost';
```

Cela va créer un nouvel utilisateur `photoview` avec le mot de passe `Photo_Secret#12345` et une nouvelle base de données nommée `photoview`.

Une fois que c'est fait, vous devriez avoir une base MySQL qui tourne, vide pour le moment, et un nouvel utilisateur identifié par le `username` et le `password` choisis à cette étape.

## Configurez Photoview

Photoview est configuré à l'aide de variables d'environnement globales et/ou depuis les variables définies dans le fichier `.env` qui est chargé lorsque Photoview est executé.

Copiez le fichier `api/example.env` vers le répertoire de destination et nommez le `.env`.

```shell
$ cp api/example.env app/.env
```

Pour configurer la base de données MySQL, modifiez la variable `PHOTOVIEW_MYSQL_URL` pour mettre votre configuration. Remplacez `user`, `password` et `dbname`.

```
PHOTOVIEW_DATABASE_DRIVER=mysql
PHOTOVIEW_MYSQL_URL=user:password@tcp(localhost)/dbname

PHOTOVIEW_SERVE_UI=1
PHOTOVIEW_PUBLIC_ENDPOINT=http://localhost:4001/
```

Voir la page [Variables d'environnement](/{{ locale }}/docs/installation-environment-variables/) pour plus de détails.

## Installez les dépendances optionnelles

Photoview peut utiliser des programmes tiers pour faire des traitements plus avancés, 
ces programmes ne sont pas obligatoires pour utiliser Photoview, mais certaines fonctionnalités ne seront disponibles que si ces programmes sont installés.

### Support des photos au format RAW

Photoview peut utiliser [Darktable](https://www.darktable.org/) pour convertir les photos RAW vers le format JPEG lors de l'analyse de la bibliothèque.
Pour activer cette fonctionnalité, installez Darktable et assurez-vous que le binaire `darktable-cli` est bien dans votre `$PATH`.

```shell
$ sudo apt install darktable
```

### Transcoding des vidéos

Photoview peut utiliser `ffmpeg` pour convertir les fichiers vidéos ne pouvant être lus directement par les navigateurs.

```shell
$ sudo apt install ffmpeg
```

### Extraction des métadonnées Exif

Photoview peut, de manière optionnelle, utiliser `exiftool` pour parser les métadonnées EXIF plus rapidement et avec plus de fiabilité. Sans `exiftool`, un parser interne sera utilisé.

```shell
$ sudo apt install exiftool
```

## Post installation

Si vous êtez arrivé jusqu'ici, vous devriez déjà pouvoir démarrer Photoview.
(Sautez cette étape si vous utilisez le fichier `systemd`.)

```shell
$ ./photoview
```

Une fois démarré, le programme devrait afficher quelque chose comme :
(Avec `systemd`, le message devrait être visible depuis la sortie de la commande `systemctl status`.)

```
Photoview UI public endpoint ready at http://localhost:4001/
```

Vous pouvez alors naviguer sur l'URL [http://localhost:4001/](http://localhost:4001/) sur laquelle vous devriez voir l'écran "Initial Setup".
Entrez ici un nouveau `username` et `password`. Pour le `Photo Path`, saisissez le chemin vers le répertoire contenant vos médias, sachant que vous pourrez modifier ce paramètre par la suite depuis la page des Réglages.

Ensuite cliquez sur `Setup Photoview` pour créer votre utilisateur administrateur.

Naviguez ensuite vers la page Réglages et cliquez sur "Analyser". Le scanner démarre aussitôt le scan de vos répertoires et l'analyse des médias.

## Mise à jour

Téléchargement de la dernière version, rebuild, et copie des fichiers générés, comme indiqué plus haut au paragraphe "Téléchargez et buildez Photoview".

Si vous n'avez pas modifié la base de données, les répertoires contenant vos médias, ou les répertoires de cache, ça devrait être tout !
