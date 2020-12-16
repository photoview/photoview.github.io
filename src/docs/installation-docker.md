---
title: Configuring Docker
group: Installation
---

## Environment variables

### `MYSQL_URL` <small>(required)</small>

The URL of the MYSQL database to connect to.
See [formatting](https://github.com/go-sql-driver/mysql#dsn-data-source-name).

### `API_LISTEN_IP` and `API_LISTEN_PORT` <small>(required)</small>

The IP and Port for the server to listen on

### `PUBLIC_ENDPOINT` <small>(required)</small>

The URL from where the server can be accessed.

For example if the server is available from the domain example.com,
change this value to http://example.com/.

If the server is encrypted with SSL, make sure to update the url protocol to `https://`.

### `PHOTO_CACHE` <small>(optional)</small>

Filepath for where to store generated media such as thumbnails and optimized videos.
Defaults to `./photo_cache`.

### `MAPBOX_TOKEN` <small>(optional)</small>

To enable map related features, you need to create a mapbox token.
A token can be generated for free at https://account.mapbox.com/access-tokens/
It's a good idea to limit the scope of the token to your own domain, to prevent others from using it.
