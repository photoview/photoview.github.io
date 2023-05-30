---
title: Environment Variables
group: Installation
translationKey: installation-environment-variable
---

The Photoview server can be configured through several environment variables.
This page presents an index of them all along with a description.

## Database related

Environment variables related to configuration of the database.

| Required           | Variable                    | Default | Notes                                                                                                                                                                                                            |
| ------------------ | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                    | `PHOTOVIEW_DATABASE_DRIVER` | `mysql` | Available options `mysql` <small>(default)</small>, `postgres` and `sqlite`. <br/> Defines what database backend is used. One of the following **MUST** be set in addition to this variable.                     |
| <center>✓</center> | `PHOTOVIEW_MYSQL_URL`       |         | Required if the driver is `mysql`. The URL of the MySQL database to connect to. See [formatting documentation](https://github.com/go-sql-driver/mysql#dsn-data-source-name).                                     |
| <center>✓</center> | `PHOTOVIEW_POSTGRES_URL`    |         | Required if the driver is `postgres`. The connection string of the Postgres database to connect to. See [formatting documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING). |
| <center>✓</center> | `PHOTOVIEW_SQLITE_PATH`     |         | Required if the driver is `sqlite`. Specifies the filepath for where the sqlite database should be saved. Example value: `/app/database/photoview.db`      |

## Server related

| Required           | Variable                 | Default     | Notes                                                                                              |
| ------------------ | ------------------------ | ----------- | -------------------------------------------------------------------------------------------------- |
|                    | `PHOTOVIEW_LISTEN_IP`    | `127.0.0.1` | The IP for the server to listen on. In most cases can be set to `localhost`.                       |
|                    | `PHOTOVIEW_LISTEN_PORT`  | `4001`      | The port for the server to listen on                                                               |
|                    | `PHOTOVIEW_SERVE_UI`     | `0`         | Set to `1` for the server to also serve the built static ui files.                                 |
|                    | `PHOTOVIEW_UI_PATH`      | `./ui`      | Specify where the built UI files are located if `PHOTOVIEW_SERVE_UI` is enabled.                   |
| <center>✓</center> | `PHOTOVIEW_API_ENDPOINT` |             | Used if `PHOTOVIEW_SERVE_UI` is disabled.<br/>The url from where the API can be accessed publicly. |
| <center>✓</center> | `PHOTOVIEW_UI_ENDPOINT`  |             | Used if `PHOTOVIEW_SERVE_UI` is disabled.<br/>The url from where the UI can be accessed publicly.  |

## General

| Required | Variable                | Default         | Notes                                                                                                                                                                                                                                                   |
| -------- | ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          | `PHOTOVIEW_MEDIA_CACHE` | `./photo_cache` | Filepath for where to store generated media such as thumbnails and optimized videos.                                                                                                                                                                    |
|          | `MAPBOX_TOKEN`          |                 | To enable map related features, you need to create a mapbox token. A token can be generated for free at https://account.mapbox.com/access-tokens/ It's a good idea to limit the scope of the token to your own domain, to prevent others from using it. |
|          | `PHOTOVIEW_DISABLE_FACE_RECOGNITION` | `0` | Completely disable face recognition and hide the icon from the side menu. |
|          | `PHOTOVIEW_DISABLE_VIDEO_ENCODING`   | `0` | Disable `ffmpeg` encoding, but still show web compatiable videos that doesn't need encoding. |
|          | `PHOTOVIEW_DISABLE_RAW_PROCESSING`   | `0` | disable processing of RAW photos using `darktable-cli`. |
