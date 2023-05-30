---
title: Variables d'environnement
group: Installation
translationKey: installation-environment-variable
---

Le serveur Photoview peut être configuré à l'aide de plusieurs variables d'environnement.
Cette page présente toutes ces variables avec une description.

## Variables liées à la base de données


| Requis           | Variable                    | Defaut | Notes                                                                                                                                                                                                            |
| ------------------ | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                    | `PHOTOVIEW_DATABASE_DRIVER` | `mysql` | Choix du driver de base de données : `mysql`<small>(par défaut)</small>, `postgres` et `sqlite`. <br/> Définit quelle base de données est utilisée. Une des variables ci-dessous **DOIT** être également renseignée pour que le système fonctionne.                     |
| <center>✓</center> | `PHOTOVIEW_MYSQL_URL`       |         | Requis si le driver est `mysql`. L'URL de la base de données MySQL à laquelle se connecter. Voir [formatting documentation](https://github.com/go-sql-driver/mysql#dsn-data-source-name).                                     |
| <center>✓</center> | `PHOTOVIEW_POSTGRES_URL`    |         | Requis si le driver est `postgres`. La chaine de connexion de la base Postgres à laquelle se connecter. Voir [formatting documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING). |
| <center>✓</center> | `PHOTOVIEW_SQLITE_PATH`     |         | Requis si le driver est `sqlite`. Spécifie le _filepath_ sur lequel la base de données sqlite doit être enregistrée. Valeur par exemple: `/app/database/photoview.db`                      |

## Variables liées au serveur

| Requis           | Variable                 | Defaut     | Notes                                                                                              |
| ------------------ | ------------------------ | ----------- | -------------------------------------------------------------------------------------------------- |
|                    | `PHOTOVIEW_LISTEN_IP`    | `127.0.0.1` | L'adresse IP d'écoute du serveur. Dans la plupart des cas, il s'agit de `localhost`.                       |
|                    | `PHOTOVIEW_LISTEN_PORT`  | `4001`      | Le port d'écoute du serveur                                                               |
|                    | `PHOTOVIEW_SERVE_UI`     | `0`         | Mettre à `1` pour que le serveur serve également les fichiers de l'UI.                                 |
|                    | `PHOTOVIEW_UI_PATH`      | `./ui`      | Spécifie où les fichiers de l'UI buildée sont localisés si `PHOTOVIEW_SERVE_UI` is activé.                   |
| <center>✓</center> | `PHOTOVIEW_API_ENDPOINT` |             | Utilisé si `PHOTOVIEW_SERVE_UI` est désactivé.<br/>L'URL depuis laquelle l'API est accessible publiquement. |
| <center>✓</center> | `PHOTOVIEW_UI_ENDPOINT`  |             | Utilisé si `PHOTOVIEW_SERVE_UI` est désactivé.<br/>L'URL depuis laquelle l'UI est accessible publiquement.  |

## Autres variables générales

| Requis | Variable                | Defaut         | Notes                                                                                                                                                                                                                                                   |
| -------- | ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          | `PHOTOVIEW_MEDIA_CACHE` | `./photo_cache` | Chemin du répertoire dans lequel seront stockés les vignettes et les vidéos optimisées.                                                                                                                                                                    |
|          | `MAPBOX_TOKEN`          |                 | Pour activer la fonctionnalité `Lieux`, avec la carte du Monde, vous devez créer un token Mapbox. Vous pouvez le faire gratuitement en créant un compte sur  https://account.mapbox.com/access-tokens/. En limitant le scope du token à votre propre domaine, cela permet d'éviter que quelqu'un d'autre utilise votre token. |
|          | `PHOTOVIEW_DISABLE_FACE_RECOGNITION` | `0` | Retire la fonctionnalité de reconnaissance faciale et retire l'icone du menu latéral. |
|          | `PHOTOVIEW_DISABLE_VIDEO_ENCODING`   | `0` | Désactive le transcoding de vidéos avec `ffmpeg`, mais conserve la visualisation des vidéos qui sont compatibles avec les navigateurs et qui n'ont pas besoin d'être transcodées. |
|          | `PHOTOVIEW_DISABLE_RAW_PROCESSING`   | `0` | Désactive le traitement des photos RAW (création d'une version JPEG) avec `darktable-cli`. |
