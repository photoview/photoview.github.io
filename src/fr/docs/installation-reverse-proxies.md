---
title: Reverse Proxy
group: Installation
translationKey: installation-reverse-proxies
---

> TODO : Reverse proxy avec [Traefik](https://doc.traefik.io/traefik/providers/docker/) + Docker
> TODO : Reverse proxy avec [Nginx](https://nginx.org/en/)

## Utilisation de Caddy

Caddy est un excellent serveur Web écrit en go, qui gère automatiquement tous les certificats SSL sans avoir besoin d'utiliser Certbot.

Tout d'abord, installez et configurez Photoview, voir la page [Installation avec Docker](/{{ locale }}/docs/getting-started/).
Ensuite, après installation de [Caddy](https://caddyserver.com/docs/install), configurez votre fichier `caddyfile`. Editez pour cela le fichier /etc/caddy/Caddyfile et ajoutez ceci : (en mettant votre domaine).

```
photos.qpqp.dk {
reverse_proxy http://photos.qpqp.dk:8000
}
```

Ensuite, tout ce dont on a besoin est de faire `systemctl reload caddy` et votre instance Photoview sera accessible sur votre domaine (https://photos.qpqp.dk dans cet exemple) avec SSL et sans besoin de spécifier un port. Et voilà, c'est tout !

## Utiliser Apache VirtualHosts

Si vous souhaitez utiliser Apache, par exemple sur une machine qui contient également une installation de Nextcloud/Owncloud, il faut que vous configuriez un reverse proxy. De nombreux tutoriels sont disponibles avec des détails pour ce type de configuration, [comme ici](https://www.digitalocean.com/community/tutorials/how-to-use-apache-as-a-reverse-proxy-with-mod_proxy-on-ubuntu-16-04).

Pour faire simple, on peut utiliser les configurations suivantes sur une machine déjà installée avec Nextcloud/Owncloud.

Tout d'abord, activez les modules Apaches nécessaires en exécutant les commandes suivantes :

```
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod lbmethod_byrequests
```

Ensuite, redémarrez Apache avec :

```
sudo systemctl restart apache2
```

Maintenant, vous devez configurer un VirtualHost pour votre proxy pour Photoview. Voici ci-dessous un exemple de fichier de VirtualHost. En général ces fichiers sont localisés dans /etc/apache2/sites-available.

Créez un nouveau fichier avec la commande :

```
sudo nano /etc/apache2/sites-available/yoururl.ca.conf
```

Ensuite, vous pouvez le remplir avec cet exemple, en modifiant les variables pour que cela corresponde à vos noms de domaine :

```
<VirtualHost *:80>
        ServerAdmin admin@yoururl.ca
        ServerName photos.yoururl.ca
        ServerAlias www.photos.yoururl.ca
        ProxyRequests Off
                ProxyPreserveHost On
                ProxyPass / http://photos.yoururl.ca:8000/
                ProxyPassReverse / http://photos.yoururl.ca:8000/
</VirtualHost>
```

_Pour plus d'informations sur les VirtualHosts, vous pouvez lire [cet article.](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-18-04)_

Une fois que vous avez créé ce VirtualHost, activez le avec la commande suivante :

```
sudo a2ensite yoururl.ca.conf
```

Redémarrez votre serveur Apache avec :

```
sudo systemctl restart apache2
```

Et vous devriez désormais pouvoir accéder à votre site Web avec Photoview sur le port 80, avec Apache qui fera la pont vers le port 8000 de Photoview.

> TODO : Configuration Apache avec certbot pour accès en HTTPS

