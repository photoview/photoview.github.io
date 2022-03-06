---
title: Analyseur (scanneur) de fichiers
group: Utilisation
translationKey: usage-scanner
---

Chaque utilisateur de Photoview dispose d'un ensemble de répertoires (_Chemin des photos_ dans les réglages). Lorsque l'analyse est en cours, le scanner va chercher des médias dans chacun de ces répertoires.

Un utilisateur peut avoir plusieurs répertoires, mais un répertoire ne peut pas être contenu dans un autre déjà déclaré dans les paramètres.

Plusieurs utilisateurs peuvent utiliser les mêmes répertoires.
Lorsque c'est le cas, le scanner ne processera les médias qu'une seule fois, pour ne pas créer de doublons dans le cache.
Par contre, les partages publics sont individuels, de même que les favoris.

## Types de fichiers supportés

Photoview supporte de nombreux formats qui fonctionne nativement sur les navigateurs Web (comme JPEG, PNG, GIF, etc.). Mais pour les autres formats, Photoview utilise des outils pour les convertir en formats lisibles par les navigateurs.
Par exemple, [Darktable](https://www.darktable.org/) est utilisé pour processer les images RAW, et [Ffmpeg](https://www.ffmpeg.org/) pour les vidéos.

Une liste complète des formats de fichiers supportés est disponible sur la page : [media_type.go](https://github.com/photoview/photoview/blob/master/api/scanner/media_type/media_type.go).

## Génération des vignettes

Lorsque l'analyseur trouve une nouvelle image, il génère une vignette de petite taille qui est utilisée à l'écran sur les pages avec plusieurs images affichées (comme la page d'un album par exemple).
La vignette est enregistrée dans le répertoire de cache, identifié par la [variable d'environnement](/{{ locale }}/docs/installation-environment-variables/#general) `PHOTOVIEW_MEDIA_CACHE`.

En plus de la vignette, si le format de fichier ne peut pas être affiché par un navigateur Web, par exemple un fichier RAW, alors Photoview génère une version haute résolution JPEG.

## Ignorer des fichiers

Dans chaque répertoire, ou sous-répertoire, vous pouvez ajouter un fichier `.photoviewignore` avec des règles pour ignorer des fichiers ou des répertoires.
Les règles s'appliqueront au répertoire courant et à tous ses sous-répertoires.
Si un autre `.photoviewignore` est présent dans un sous-répertoire, alors les règles seront fusionnées.

Les règles pour ignorer suivent le [format des fichiers `.gitignore`](https://git-scm.com/docs/gitignore#_pattern_format).

```gitignore
# ignorer tous les répertoires avec le nom `directory_name`
directory_name/

# ignorer tous les fichiers avec l'extension .jpg
*.jpg

# faire une exception de la règle précédente pour les fichiers appelés `image.jpg`
!image.jpg
```
