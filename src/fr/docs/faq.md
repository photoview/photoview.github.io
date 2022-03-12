---
title: FAQ
group: root
translationKey: faq
---

## Déplacer le cache vers un autre disque dur ?

Oui, c'est possible. Si vous utilisez docker-compose, vous pouvez modifier ou ajouter le volume monté qui pointe vers le cache pour le lier à un chemin sur votre autre disque dur.

```yml
volumes:
  # Change this:
  - api_cache:/app/cache
  # To this:
  - /path/to/hard-drive/photoview_cache:/app_cache
```

Si vous n'utilisez pas Docker, vous pouvez simplement modifier la variable d'environnement `PHOTOVIEW_MEDIA_CACHE` et mettre le chemin que vous souhaitez utiliser. Par exemple :

- Configurez la variable dans le `.env`,
- Ou bien utilisez : `export PHOTOVIEW_MEDIA_CACHE=/path/to/hard-drive/photoview_cache`

## Mon répertoire PHOTOVIEW_MEDIA_CACHE est très volumineux ! Est-ce que je peux le supprimer ?

La taille du cache dépend de la taille de votre bibliothèque de photos et vidéos, et donc sa taille peut devenir très grande.
Si vous supprimez le cache, il sera recréé si vous continuez à utiliser Photoview.
Un cas néanmoins peut justifier de supprimer le cache : lorsque vous changez complètement de bibliothèque.
Si vous souhaitez supprimer définitivement Photoview, vous pouvez supprimer le cache et vous devriez également supprimer la base de données.

## Je clique sur "Analyser", mais rien ne se passe

Si vous utilisez Docker, assurez-vous que votre disque est bien monté. En cas de doute, consultez la page [Installation avec Docker](/{{ locale }}/docs/installation-docker/).

Pour résoudre ce problème, vous pouvez entrer dans le _container_ et vérifier que le disque/répertoire est bien présent.
Pour cela, utilisez la commande suivante : `docker-compose exec -it photoview /bin/bash`, puis listez le répertoire du point de montage avec : `ls /photos`.

## L'analyseur semble fonctionner, mais s'arrête de manière aléatoire avant la fin

Vérifiez les logs avec `docker-compose logs` et cherchez une ligne contenant des erreurs comme `signal: killed`, comme par exemple :

```text
Failed to begin database transaction: failed to process photo: &lt;...&gt;: signal: killed
```

Cette erreur est générée lorsque le serveur n'a pas assez de ressources pour processer le média et que le système d'exploitation tue le process lié pour libérer des ressources.
Pour essayer de résoudre le problème, vous pouvez réduire le nombre de [_workers_ simultanés](/{{ locale }}/docs/usage-settings/#concurrent-workers).
Essayez de le mettre à `1` dans les paramètres et voyez si cela peut résoudre le problème.

## Où trouver les logs de l'application ?

Si vous utilisez Docker, utilisez la commande `docker-compose logs` depuis le répertoire dans lequel se trouve le fichier `docker-compose.yml`.

Pour les installations manuelles, les logs sont localisés dans le fichier `/var/log/photoview/photoview.log`

## J'ai oublié le mot de passe administrateur, y a-t-il un moyen de le réinitialiser ?

Oui, mais pour cela, vous devrez mettre à jour manuellement le mot de passe directement dans la base de données.

Si vous utilisez la configuration par défaut avec docker-compose, vous pouvez vous connecter à la base de données en utilisant la commande suivante :

```shell
$ docker-compose exec -it db mysql -uphotoview -pphotosecret photoview
```

Ensuite vous devrez créer un hash du nouveau mot de passe en utilisant l'algorithme `bcrypt`.
Le moyen le plus simple de le faire est d'utiliser un outil en ligne comme [bcrypt-generator.com](https://bcrypt-generator.com/).

Vous pouvez utiliser la requête SQL suivante pour afficher la table `users` :

```shell
> SELECT * FROM users;
```

Pour mettre à jour le mot de passe d'un des utilisateurs, utilisez la commande suivante, en remplaçant `$2a$12$APn0mVXrxjNnKencpxBFWe82SMzeaUInvJDidZButEI9CCk3x.UAO` par le hash que vous avez généré avec votre propre mot de passe, et en remplaçant `admin` par le nom de votre utilisateur.

```shell
> UPDATE users SET password='$2a$12$APn0mVXrxjNnKencpxBFWe82SMzeaUInvJDidZButEI9CCk3x.UAO' WHERE username='admin';
Query OK, 1 row affected (0.011 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```
