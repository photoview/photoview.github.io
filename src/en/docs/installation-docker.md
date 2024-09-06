---
title: Setup with Docker
group: Installation
priority: 1
translationKey: installation-docker
---

By far the easiest way to get up and running with Photoview is by running it inside a Docker container.
With Docker, all dependencies are automatically installed and ready to go.
If you are completeley new to Docker and want to learn more, check out this [article by FreeCodeCamp][docker-simplified].

To better organise the Docker containers, a tool called [Docker Compose][docker-compose] can be used.
This lets you configure containers in a `yaml` file, and quickly start all the configured containers at once.
Although this tool can't do anything you can't already to with Docker alone, it simplifes the process.

[docker-simplified]: https://www.freecodecamp.org/news/docker-simplified-96639a35ff36/
[docker-compose]: https://docs.docker.com/compose/

## Setup with Docker Compose

> Prerequisite: Docker Engine and Docker Compose is installed on your server.
> See [Install Docker Engine][docker-install] and [Install Docker Compose][install-docker-compose] on how to do so.

To configure Photoview using Docker Compose, first copy the contents of either the [docker-compose.example.yml][docker-compose.example.yml] or [docker-compose.minimal.example.yml][docker-compose.minimal.example.yml] ,
and save it to a file called `docker-compose.yml`. The minimal version uses MariaDB, while the full example also includes commented out Postgres and Watchtower containers.

Within the file you will find two services: the Photoview server itself named `photoview` and a MariaDB database named `db`.
The Photoview service is already configured with the database.

### Configuring docker-compose.yml

The compose file is setup to work without any modifications. If you just want to get started skip to the [next section](#running-docker-compose.yml).

But you might want to make a few changes to fit your setup:

#### Port

You can change the port that Photoview will be running on under `services.photoview.ports`.
By default the value is `8000:80`, this means that port `80` inside the container will be mapped to `8000` on the host machine.
Eg. if you want your instance to run on port `1234` instead, change the value to `1234:80`.
Notice that the port inside the container `80` matches the value of `PHOTOVIEW_LISTEN_PORT=80` under `services.photoview.environment`.

#### Environment variables

Under `services.photoview.environment` a number of environment variables are defined
to configure various parts of Photoview. For a detailed description of all available environment variables,
see [Environment variables](/{{ locale }}/docs/installation-environment-variables/).

One thing that you might want to configure here is the `MAPBOX_TOKEN` variable.
This is needed if you want to use map related features, like the Places page.
A token can be generated for free on [Mapbox's website][mapbox-access-token], after you create an account.

#### Volumes

For Photoview to find your media, your files must be mounted inside the Photoview container using one or more [bind mounts][docker-bind-mount].
This is configured under the `services.photoview.volumes` path in the `docker-compose.yml` file.

By default the only bind mount is: `./photos_path:/photos:ro`.

This line should be interpreted as `<HOST_PATH>:<CONTAINER_PATH>:ro`,
it means that `<HOST_PATH>` on your machine will be accessible as `<CONTAINER_PATH>` inside the Photoview container.
When you later have to configure where Photoview should look for your files, you should provide the path within the container, ie. the `<CONTAINER_PATH>`.

The `:ro` part at the end, means that the files will be mounted as `read-only` and it will not be possible for Photoview to change your files.
Although this part is optional, it is recommended to increase security.

You can add as many bind mounts as you'd like. For example if your media is stored in the `Pictures` directory of your home user,
you might want to add a bind mount like so: `/home/ben/Pictures:/bens_pictures`. Now the media will be accessible from `/bens_pictures` within the container.

### Running docker-compose.yml

To start the docker containers specified inside the `docker-compose.yml` file, run the following command:

```shell
$ docker-compose up -d
```

This will start the containers, `-d` means that it will do this in the background.
When the system has started, you can access it from `http://localhost:8000`, unless you specified a custom port.

Below are some other commonly used Docker Compose commands.

```shell
$ docker-compose down # stop the containers
$ docker-compose logs # show the logs of the containers
$ docker-compose ps   # show status of the running containers
```

[docker-install]: https://docs.docker.com/engine/install/
[install-docker-compose]: https://docs.docker.com/compose/install/
[docker-bind-mount]: https://docs.docker.com/storage/bind-mounts/
[docker-compose.example.yml]: https://github.com/photoview/photoview/blob/master/docker-compose%20example/docker-compose.example.yml
[docker-compose.minimal.example.yml]: https://github.com/photoview/photoview/blob/master/docker-compose%20example/docker-compose.minimal.example.yml
[mapbox-access-token]: https://account.mapbox.com/access-tokens/

## Docker tags and versioning

The version of Photoview, when running Docker, can be specified using a tag.
There exists the following tags:

- `latest`, this is the latest released version.
- `edge`, this reflects the master branch and thus might include unreleased and unfinished features. It is not recommended to use this in production.

Besides those tags, a particular version can be specified.
This is done using the following formatting: `x.y.z` (eg. `2.3.5`) or `x.y` (eg. `2.3`) or `x` (eg. `2`), where:

- `x` is the major version, each major version is not compatiable with the previous.
- `y` is the minor version, each minor version includes bigger features and changes, but it keeps compatibility.
- `z` is the patch version, a patch version only includes bug fixes and minor improvements.

If a full version is specified, for example `2.3.6`, then that corresponds with that specific release and that image will never change.
But if only `2.3` that represents the latest patch version for `2.3.z`, thus if a `2.3.7` is released, `2.3` will also be updated.
Lastly `2` would be the latest version within the major version.

It is recommended to use version `2` for most circumstances, as in that way you get the latest updates, but your system will not break after an automatic update.

## Updating

To update Photoview running in a docker-compose environment, simply run the following commands:

```bash
$ docker-compose pull    # Pull the latest images
$ docker-compose up -d   # Restart and update the containers whose images has changed
```
