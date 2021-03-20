---
title: Using with Nextcloud
group: Usage
---

Photoview can be configured to grab media from [Nextcloud](https://nextcloud.com/).

## Locating Nextcloud files on the filesystem

All files uploaded to Nextcloud are located in the folder called `data/` at the location where Nextcloud is installed.
Inside that folder you will find another folder for each Nextcloud user.
All files uploaded by a user is located inside their respective folders.

Now find the path to where your Nextcloud media is located, and copy it as we will need it later.
The path could look somthing like this:

    ~/nextcloud/data/example_user/files/Photos

## Configure Photoview

The next step will be to add this path to the desired Photoview user.

### Adding path as a Docker volume

> If you are not running Photoview in Docker you can skip this step.

Before the Nextcloud files can be accessed by the Photoview container,
they must first be mounted as a [volume](https://docs.docker.com/storage/volumes/).

For docker-compose this can be done by adding the volume to the `docker-compose.yml` configuration file for Photoview.
Open it up and under `volumes:` add a new volume like so:

    - NEXTCLOUD_PATH:/nextcloud:ro

Replace `NEXTCLOUD_PATH` with the path you copied in step 1.
The `/nextcloud` path dictates where this mount can be accessed from within the container, this will be important for the next step.
The `:ro` in the end, instructs Docker to mount the folder in read-only mode.

Now restart the docker container.

## Add path to Photoview user

You can now add the new path the desired user from the Settings page,
by clicking on the `Edit` button next to the user.
From there you can add the new path.

If you mounted the volume like in the previous step, the path will be `/nextcloud`.
When the path has been added, you can click `Save`.
You can now scan the user and the pictures and videos from nextcloud will appear in Photoview.

## Keep Photoview updated automatically

If you don't want to press the `Scan` button manually each time you've added new files to Nextcloud, you can [configure a periodic scanner](/docs/usage-settings/#periodic-scanner) to automatically scan for changes.


# More to know...

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

Once you've created this VirtualHost entry, restart your server once more with:

```
sudo systemctl restart apache2
```
and you should now be able to access your website on port 80, with Apache passing it through to the Photoview docker on port 8000.  


