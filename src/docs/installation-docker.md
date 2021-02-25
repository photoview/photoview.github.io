---
title: Docker
group: Installation
---
> # Setup of Photoview in Docker


> ## Setting up Docker Compose

1. Editing Docker Compose 

**IMPORTANT: DOCKER COMPOSE WILL AUTOMATICALLY SETUP MYSQL AND DB**

**Things to Note:**
**When setting up the volumes where your media will be read. All images/videos have to be in a folders root to show!**
**So ie. **

`      - ./mnt/Win10-4TB-HDD/Google-Photos/GPhotos/Sons-Videos`

**All video that are going to be shown have to be in /Sons-videos for the volume to work correctly.**

1. Open the Home directory

`cd ~/`

2. Edit docker-compose.yml using your editor of choice

`sudo nano docker-compose.yml`

3. Find the comments starting with Change This:, and change the values, to properly match your setup. If you are just testing locally, you don't have to change the

```      
      - ./home/demonwarrior/photos:/photos:ro
      - ./mnt/Win10-4TB-HDD/Google-Photos/GPhotos/Sons-Videos
```

to the directories that have the images or videos that you would like to add from your system.

```
version: "3"

services:
  db:
    image: mariadb:10.5
    restart: always
    environment:
      - MYSQL_DATABASE=photoview
      - MYSQL_USER=photoview
      - MYSQL_PASSWORD=photosecret
      - MYSQL_RANDOM_ROOT_PASSWORD=1
    volumes:
      - db_data:/var/lib/mysql

  photoview:
    image: viktorstrate/photoview:2
    restart: always
    ports:
      - "8000:80"
    depends_on:
      - db

    environment:
      - PHOTOVIEW_DATABASE_DRIVER=mysql
      - PHOTOVIEW_MYSQL_URL=photoview:photosecret@tcp(db)/photoview
      - PHOTOVIEW_LISTEN_IP=photoview
      - PHOTOVIEW_LISTEN_PORT=80
      - PHOTOVIEW_MEDIA_CACHE=/app/cache

      # Change This: The publicly exposed url
      # For example if the server is available from the domain example.com,
      # change this value to http://example.com/
      - PHOTOVIEW_PUBLIC_ENDPOINT=http://localhost:8000/

      # Optional: To enable map related features, you need to create a mapbox token.
      # A token can be generated for free here https://account.mapbox.com/access-tokens/
      # It's a good idea to limit the scope of the token to your own domain, to prevent others from using it.
      # - MAPBOX_TOKEN=<YOUR TOKEN HERE>

    volumes:
      - api_cache:/app/cache

      # Change this to the directory where your photos are located on your server.
      # If the photos are located at `/home/user/photos`, then change this value
      # to the following: `/home/user/photos:/photos:ro`.
      # You can mount multiple paths, if your photos are spread across multiple directories.
      - ./home/demonwarrior/photos:/photos:ro
      - ./mnt/Win10-4TB-HDD/Google-Photos/GPhotos/Sons-Videos
volumes:
  db_data:
  api_cache:
```

4. Now save and exit docker-compose.yml

CTRL+O

ENTER

CTRL+X

5. Now run docker-compose

`docker-compose up -d`

6. Now loadup your browser of choice and type

`http://localhost:8000`

7. Rejoice and Enojy!

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
