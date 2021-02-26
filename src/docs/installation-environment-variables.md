---
title: Environment Variables
group: Installation
---

The Photoview server can be configured through several environment variables.
This page presents an index of them all along with a description.

## Database related

Environment variables related to configuration of the database.
Required |Variable | Default | Notes 
---------|---------|---------|------
:heavy_check_mark: |`PHOTOVIEW_DATABASE_DRIVER` | mysql | Available options `mysql` <small>(default)</small>, `postgres` and `sqlite`. Defines what database backend is used.

### `PHOTOVIEW_MYSQL_URL`

Required if the driver is `mysql`.

The URL of the MySQL database to connect to.
See [formatting documentation](https://github.com/go-sql-driver/mysql#dsn-data-source-name).

### `PHOTOVIEW_POSTGRES_URL`

Required if the driver is `postgres`.

The connection string of the Postgres database to connect to.
See [formatting documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).

### `PHOTOVIEW_SQLITE_PATH`

Required if the driver is `sqlite`.

Specifies the filepath for where the sqlite database should be saved.

## Server related

### `PHOTOVIEW_LISTEN_IP` and `PHOTOVIEW_LISTEN_PORT`

The IP interface and Port for the server to listen on.
In most cases `PHOTOVIEW_LISTEN_IP` can be set to `localhost`.

### `PHOTOVIEW_SERVE_UI`

Set to `1` for the server to also serve the built static ui files.

### `PHOTOVIEW_UI_PATH`

Specify where the built UI files are located if `PHOTOVIEW_SERVE_UI` is enabled.
Defaults to `./ui`.

### `PHOTOVIEW_PUBLIC_ENDPOINT`

Used if `PHOTOVIEW_SERVE_UI` is enabled.

The URL from where the server can be accessed.

For example if the server is available from the domain example.com,
change this value to http://example.com/.

If the server is encrypted with SSL, make sure to update the url protocol to `https://`.

### `PHOTOVIEW_API_ENDPOINT` and `PHOTOVIEW_UI_ENDPOINT`

Used if `PHOTOVIEW_SERVE_UI` is disabled.

The url from where the API and the UI respectively can be accessed publicly.

## General

### `PHOTOVIEW_MEDIA_CACHE`

Filepath for where to store generated media such as thumbnails and optimized videos.
Defaults to `./photo_cache`.

### `MAPBOX_TOKEN`

To enable map related features, you need to create a mapbox token.
A token can be generated for free at https://account.mapbox.com/access-tokens/
It's a good idea to limit the scope of the token to your own domain, to prevent others from using it.
