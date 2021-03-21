---
title: Reverse Proxy
group: Installation
priority: 1
---


## Playing nice with other webservers/accessing Photoview from port 80 on a server that already has another HTTP server running.

If you are running the docker for Photoview on the same machine that is hosting your Nextcloud/Owncloud setup, and want them both to be accessible via the standard web port 80 - you'll need to setup a reverse proxy on your owncloud webserver to achieve that. There are many guides online going into more detail on this general type of setup you can refer to, [like this one here](https://www.digitalocean.com/community/tutorials/how-to-use-apache-as-a-reverse-proxy-with-mod_proxy-on-ubuntu-16-04). 

As a crash-course, though, you can achieve this type of setup by enabling the following on your machine running Nextcloud/Owncloud and the Photoview setup by doing the following.

 ***Note:** This is written with the assumption you are using Apache on a Ubuntu box. Your mileage may vary.*
 
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
Now you'll need a VirtualHost entry for your photoview proxy. Here's an example below, of a virtual host file entry for Photoview.  These are typically stored in /etc/apache2/sites-available. 

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
*For more information on VirtualHosts, [take a look at this article.](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-18-04)*

Once you've created this VirtualHost entry, enable the entry with:

```
sudo a2ensite yoururl.ca.conf
```
restart your server once more with:
```
sudo systemctl restart apache2
```
and you should now be able to access your website on port 80, with Apache passing it through to the Photoview docker on port 8000.  


