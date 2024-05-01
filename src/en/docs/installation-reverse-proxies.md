---
title: Reverse Proxy
group: Installation
translationKey: installation-reverse-proxies
---

## Using Traefic with Docker

Please read the Traefic documentation, as it provides more detailed and accurate info: [doc.traefik.io](https://doc.traefik.io/traefik/providers/docker/)

Here is an example of the configuration for the docker-compose file of Photoview:

Assumptions made in this config:
- Traefic runs in host network mode,
- Public hostname is photoview.foo.bar
- Certificate resolver is named "le"
- HTTPS entrypoint is named "websecure"

If you enable these labels, remove the ports section

```
photoview:
  ...
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.photoview.rule=Host(`photoview.foo.bar`)"
    - "traefik.http.routers.photoview.service=photoview"
    - "traefik.http.routers.photoview.tls=true"
    - "traefik.http.routers.photoview.tls.certresolver=le"
    - "traefik.http.routers.photoview.entrypoints=websecure"
    - "traefik.http.services.photoview.loadbalancer.server.port=80"
    - "traefik.http.services.photoview.loadbalancer.server.scheme=http"
  ...
```

## Using Caddy

Caddy is a great webserver written in go that automatically handles all SSL certificates without the need for certbot.

First setup Photoview via the regular docker-compose setup [here](/{{ locale }}/docs/getting-started/). Then after installing [Caddy](https://caddyserver.com/docs/install) it's time to setup your Caddyfile. Simply edit your caddyfile located at /etc/caddy/Caddyfile to the following (adjust to your domain).

```
photos.qpqp.dk {
reverse_proxy http://photos.qpqp.dk:8000
}
```

Then all we need to do now is `systemctl reload caddy` and then your photoview instance should now be accessible via https://photos.qpqp.dk with SSL and without the need of specifiying a port. That's it!

## Using Apache VirtualHosts

If you are running the docker for Photoview on the same machine that is hosting your Nextcloud/Owncloud setup, and want them both to be accessible via the standard web port 80 - you'll need to setup a reverse proxy on your owncloud webserver to achieve that. There are many guides online going into more detail on this general type of setup you can refer to, [like this one here](https://www.digitalocean.com/community/tutorials/how-to-use-apache-as-a-reverse-proxy-with-mod_proxy-on-ubuntu-16-04).

As a crash-course, though, you can achieve this type of setup by enabling the following on your machine running Nextcloud/Owncloud and the Photoview setup by doing the following.

First, enable the necessary Apache Modules by running the following:

```
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod lbmethod_byrequests
```

Then, restart Apache by running

```
sudo systemctl restart apache2
```

Now you'll need a VirtualHost entry for your photoview proxy. Here's an example below, of a virtual host file entry for Photoview. These are typically stored in /etc/apache2/sites-available.

You can create one with:

```
sudo nano /etc/apache2/sites-available/yoururl.ca.conf
```

You'll then want to populate it like below, changing the variables below to reflect your own domains:

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

_For more information on VirtualHosts, [take a look at this article.](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-18-04)_

Once you've created this VirtualHost entry, enable the entry with:

```
sudo a2ensite yoururl.ca.conf
```

restart your server once more with:

```
sudo systemctl restart apache2
```

and you should now be able to access your website on port 80, with Apache passing it through to the Photoview docker on port 8000.
