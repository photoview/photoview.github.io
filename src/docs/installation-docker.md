---
title: Setup with Docker
group: Installation
priority: 1
---

> TODO: A more detailed guide than getting started explaining how to configure with docker.
>
> - Setup with Docker directly, without docker-compose
> - Setup with docker-compose
> - Reverse proxy with [Traefik](https://doc.traefik.io/traefik/providers/docker/)

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
