---
title: Mettre en place l'environnement de développement
group: Contribuer
translationKey: contribute-setup-locally
---

Comment mettre en place l'environnement de développement en local.

### Installation en local

1. Installez un serveur MySQL et ajoutez une nouvelle base de données
2. Renommez `/api/example.env` en `.env` et mettez à jour le champs `MYSQL_URL`
3. Renommez `/ui/example.env` en `.env`

### Démarrer le serveur d'API

Assurez-vous que [golang](https://golang.org/) est installé.

Quelques bibliothèques C sont nécessaires pour compiler l'API, voir [go-face requirements](https://github.com/Kagami/go-face#requirements) pour plus de détails. On peut les installer en utilisant les commandes suivantes :

```bash
# Ubuntu
sudo add-apt-repository ppa:strukturag/libheif
sudo add-apt-repository ppa:strukturag/libde265
sudo apt-get update
sudo apt-get install libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg-turbo8-dev libheif-dev
# Debian
sudo apt-get install libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg62-turbo-dev libheif-dev
# macOS
brew install dlib libheif
```

Puis, executez la commande suivante pour démarrer le serveur d'API :

```bash
cd ./api && go run server.go
```

### Démarrer le serveur UI

Assurez-vous que [node](https://nodejs.org/en/) est installé.
Dans un nouveau Terminal, executez la commande suivante :

```bash
cd ./ui && npm start
```

Le site est désormais accessible à l'URL : [localhost:1234](http://localhost:1234).
Et le graphql à [localhost:4001](http://localhost:4001)
