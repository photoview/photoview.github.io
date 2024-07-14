---
title: Utilisation avec systemd
group: Installation
priority: 3
translationKey: installation-systemd
---

Vous pouvez, de manière optionnelle utiliser `systemd` pour gérer Photoview et démarrer le programme au démarrage du serveur.
Cela améliore encore la sécurité du process car le programme tourne alors avec son propre utilisateur système.


Pour démarrer, suivez le [Guide d'installation manuelle](/{{ locale }}/docs/installation-manual/).

Lorsque vous arrivez à la section _Copiez UI et back-end au bon endroit_, remplacez les étapes par les étapes décrites ci-après.

## Utilisation avec `systemd`

Les trois premiers fichiers des étapes suivantes permettent à `systemd` de faire tourner photoview avec `user:group` étant égal à `photoview:photoview`.
Cela limite les permissions du programme, ajoutant (un petit peu) de sécurité en limitant ses accès aux fichiers et répertoires auquels le process a explicitement accès.

Cela nécessite également que votre répertoire `PHOTOVIEW_MEDIA_CACHE` (et `PHOTOVIEW_SQLITE_PATH` si vous utilisez `sqlite`) soit accessible en lecture et en écriture à l'utilisateur `photoview`.
Si c'est la première fois que vous installez photoview, les permissions devraient être gérée automatiquement.
Si vous faites une mise à jour, et que des fichiers se trouvent déjà dans ce répertoire, vous devez vérifier les droits d'accès et éventuellement changer les droits de manière récursive avec la commande `chown`.

Enfin, `systemd` fonctionne généralement sur une hiérarchie de chemins système.
C'est à dire qu'au lieu d'installer tout ensemble sous `/opt/`, les fichiers du programme seront placés dans `/usr`, `/lib/`, et `/var`.
Ayez conscience que, quelque soit le chemin, les fichiers générés dans `PHOTOVIEW_MEDIA_CACHE`  peuvent prendre beaucoup de place si votre bibliothèque de médias est importante.
Si c'est un problème, vous pouvez changer facilement la localisation de ce répertoire.
Il faudra alors faire attention de répercuter ces changement dans les variables `photoview.service` et `photoview.tmpfiles` du fichier proposé ci-après.

> Rappel : Ces étapes remplacent celles de la rubrique _Copiez UI et back-end au bon endroit_ du guide d'installation manuelle.

1. Copiez les fichiers `systemd`:
   - `systemd/photoview.service` vers `/etc/systemd/system/multi-user.target/photoview.service`
   - `systemd/photoview.sysusers.conf` vers `/usr/lib/sysusers.d/photoview.conf`
   - `systemd/photoview.tmpfiles` vers `/usr/lib/tmpfiles.d/photoview.conf`
   > Si vous n'utilisez pas `sqlite`, supprimez la 2ème ligne de `systemd/photoview.tmpfiles` avant la copie.
1. Créez les répertoires dans lesquels les fichiers du programme seront placés :
   > A noter : la commande `install`, comme expliqué ci-dessous, crée les répertoires requis.
   - `/usr/share/webapps/photoview-ui`
   - `/usr/lib/photoview`
   - `/var/cache/photoview/media_cache`
   - `/var/lib/photoview` (pour le chemin sqlite, si utilisé)
1. Copiez les fichiers buildés vers les répertoires appropriés
1. Si vous mettez à jour à partir d'une version où vous n'utilisiez pas le service `systemd` :
   - Modifiez les droits du répertoire de cache des médias (et du répertoire sqlite, si utilisé)
     - `$ sudo chown -R photoview:photoview /var/cache/photoview`
     - `$ sudo chown -R photoview:photoview /var/lib/photoview`
1. S'il s'agit d'une _fresh install_, assurez-vous que les chemins des fichiers sont bien réglés pour être la propriété du user et du group `photoview` avec les droits de lecture et écriture.

Exemple de ce que donnent ces étapes :
```shell
$ cd /opt/photoview
$ sudo install -Dm0644 -t "/usr/lib/systemd/system" "/opt/photoview/systemd/photoview.service"
$ sudo install -Dm0644 "/opt/photoview/systemd/photoview.sysusers.conf" "/usr/lib/sysusers.d/photoview.conf"
$ sudo install -Dm0644 "/opt/photoview/systemd/photoview.tmpfiles" "/usr/lib/tmpfiles.d/photoview.conf"
$ sudo install -d "/var/cache/photoview/media_cache"
# The next line is if you plan to use `sqlite`
$ sudo install -d "/var/lib/photoview"
$ cd /opt/photoview/ui/dist
$ sudo find * -type f -exec install -Dm0644 "{}" "/usr/share/webapps/photoview-ui/{}" \;
$ cd /opt/photoview/api
$ sudo install -Dm0755 -t "/usr/lib/photoview" "/opt/photoview/api/photoview"
$ sudo ln -s /usr/lib/photoview/photoview /usr/bin/photoview
$ sudo find data -type f -exec install -Dm0644 "{}" "/usr/lib/photoview/{}" \;
$ sudo install -Dm0644 "/opt/photoview/api/example.env" "/etc/photoview.env"
```
### Utiliser le fichier `systemd`

- Pour démarrer (ou stopper) le service photoview :
  - `$ sudo systemctl <start/stop> photoview.service`
- Pour activer (ou désactiver) le fichier pour démarrer automatiquement (ou non) au démarrage du système :
  - `$ sudo systemctl <enable/disable> photoview.service`
- Pour visualiser le statut du process :
  - `$ sudo systemctl status photoview.service`
  > Utilisez ceci pour visualiser les messages d'erreurs si `photoview` s'arrête de fonctionner
- Pour suivre les logs du service photoview pendant le fonctionnement, utilisez la commande suivante :
  - `$ sudo journalctl -f -b0 -u photoview.service`
  > Utile pour débugguer en même temps que d'utiliser dans un autre terminal les commandes `start/stop`