---
title: File scanner
group: Usage
translationKey: usage-scanner
---

Each user in Photoview is assigned a set of _file paths_, when the scanner runs it will search for media within each path.

A user can have multiple file paths but one cannot be contained within another one.

Two users can have overlapping file paths.
When this is done, each shared media will only be processed once by the scanner, such that the cache doesn't contain duplicates, but public shares will be individual to each user, and so will media favorites.

## Supported file types

Photoview supports the browser native image formats out of the box (JPEG, PNG, GIF etc.).
But for files not understood by the browser, Photoview can use tools to convert these files into browser supported types.
It can use [Darktable](https://www.darktable.org/) to process RAW image files and [Ffmpeg](https://www.ffmpeg.org/) to process video formats.

A complete list of supported file formats can be found in the [media_type.go](https://github.com/photoview/photoview/blob/master/api/scanner/media_type/media_type.go) source file.

## Thumbnail generation

When the scanner finds a new image it generates a small sized thumbnail to be used when many images are shown at once.
It saves this thumbnail to the media cache directory, as specified by the `PHOTOVIEW_MEDIA_CACHE` [environment variable](/{{ locale }}/docs/installation-environment-variables/#general).

In addition to the thumbnail, Photoview will also generate a high resolution version JPEG version of the image,
if the file format of the original image cannot be displayed in the browser, for example a RAW image.

## Ignorefiles

Inside any media directory a `.photoviewignore` file can be added with rules for files and directories to ignore.
The rules will be applied from the directory it is placed in and all its subdirectories.
If another ignore file is present in one of the subdirectories the rules will be merged.

Ignore rules follow the [format of `.gitignore` files](https://git-scm.com/docs/gitignore#_pattern_format).

```gitignore
# ignores all directories with the name `directory_name`
directory_name/

# ignore all files with the .jpg extension
*.jpg

# make an exception to the previous rule for files named `image.jpg`
!image.jpg
```
