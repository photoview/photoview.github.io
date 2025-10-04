---
title: Introduction
group: root
priority: 1
translationKey: introduction

permalink: /{{ locale }}/docs/
---

{% optimizedImage './timeline.png', 'Screenshot of Photoview', 'class="block w-4/5 mx-auto my-6"' %}

Photoview is a simple and user-friendly photo gallery that's made for photographers and aims to provide an easy and fast way to navigate directories with thousands of high-resolution photos.

You configure Photoview to look for photos and videos within a directory on your file system.
The scanner will then automatically pick up your media and start to generate thumbnail images to make browsing really fast.
It's worth noting that Photoview never actually touches your media, it only needs read access and saves thumbnails to a cache independent of the original media.

Once scanned, the media will show up on the website being organised in the same way as on the filesystem.
From the website it is also possible to see your media on a world map, provided the image files have embedded location information.

## Aim and values

Photoview has been developed with a focused set of aims and values from the beginning.

**The file system is the _Source of Truth_**,
this is the most important value for the software.
There are two big advantages to letting the file system dictate the structure and organisation of the media.
Firstly, it provides a lot of flexibility for organisation, as it lets you use whatever tool that can modify the file system for organising the media,
let it be a simple file server like FTP or NTFS or a cloud service like [Nextcloud](/{{ locale }}/docs/usage-nextcloud/).
Secondly, it removes dependency; you can uninstall Photoview at any time and your photos are still organised.

**The original files are never touched**,
this hardens security significantly, as your media can be `read-only`, meaning that you don't have to trust Photoview to keep your media safe, you can guarantee it.

## Features

- **Closely tied to the file system**. The website presents the images found on the local filesystem of the server, directories are mapped to albums.
- **User management**. Each user is mapped to one or more paths on the local filesystem, photos within that path can be accessed by that user.
- **Sharing**. Albums, as well as individual media, can easily be shared with a public link, the link can optionally be password protected.
- **RAW support**. [Darktable](https://www.darktable.org/) is used to automatically convert RAW files from a large range of [supported cameras](https://www.darktable.org/resources/camera-support/).
- **EXIF parsing**. All media is scanned for EXIF data and shown next to the media when selected.
- **Duplication detection**. If a RAW and JPEG image pair is found next to each other, only one image shows up and the scanner will use the JPEG image, instead of generating a new in the cache.
- **Video support**. Many common video formats are supported. Videos will automatically be optimized for web.
- **Timeline**. Media will be shown on a timeline that sorts media by the day they were created and groups them by day.
- **World map**. Photos with embedded GPS coordinates are presented on a world map.
- **Face recognition**. Faces will automatically be detected in photos, and photos of the same person will be grouped together.
- **Performant**. Thumbnails are automatically generated and photos first load when they are visible on the screen. In full screen, thumbnails are displayed until the high resolution image has been fully loaded.
- **Secure**. All media resources are protected with a cookie-token, all passwords are properly hashed, and the API uses a strict [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) when necessary.
- **Database support**. Both MySQL, Postgres and Sqlite databases are supported.

## How do I get started?

- If you just want to get up and running as fast as possible, see [Getting Started](/{{ locale }}/docs/getting-started/).
- If you are interested in a more detailed guide instead, see [Setup with Docker](/{{ locale }}/docs/installation-docker/).
- If you prefer to install it manually without Docker, see [Manual Setup](/{{ locale }}/docs/installation-manual/) guide.
