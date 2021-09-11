---
title: Manual Setup
group: Installation
priority: 2
---

This guide explains how to build, install and configure Photoview
on a fresh installation of `Ubuntu 20.04 LTS` to run directly on the system without using Docker.

## Preparation

Make sure you got the necessary tools and libraries in order to build and run Photoview.

```shell
# Make sure your computer is up to date
$ sudo apt update
$ sudo apt upgrade

# Install tools used in this guide
$ sudo apt install git curl wget

# Install necessary repositories
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:strukturag/libheif
$ sudo add-apt-repository ppa:strukturag/libde265

# Install dependencies required to build and run Photoview
$ sudo apt install libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg-turbo8-dev build-essential \
  libdlib19 libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg-dev libheif-dev pkg-config gpg
```

Install Golang by following the instructions for Linux from their [Download and install Go](https://golang.org/doc/install) page, the steps should be something like the following.

```shell
# Download Go
$ wget https://golang.org/dl/go1.16.linux-amd64.tar.gz

# Install Go
$ sudo tar -C /usr/local -xzf go1.16.linux-amd64.tar.gz
$ rm go1.16.linux-amd64.tar.gz

# Add Go to the path of your user
$ echo 'export PATH=$PATH:/usr/local/go/bin' >> "$HOME/.bashrc" && source "$HOME/.bashrc"

# Verify that go is now installed
$ go version
# Expected output: go version go1.16 linux/amd64
```

Now install Node 16 and NPM if you've not done so already (it installs npm automatically)

```shell
$ curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
$ sudo apt install nodejs
```

## Download and build Photoview

Navigate to [Photoview Releases](https://github.com/photoview/photoview/releases) and download the source code for the latest version, extract it and open the extracted directory in the terminal.

```shell
$ cd /opt
$ git clone https://github.com/photoview/photoview.git
$ cd photoview/
```

### Build the Web user-interface

```shell
$ cd ui/
$ npm install
$ npm run build
```

This builds the UI source code and saves it in the `ui/build/` directory.

### Build the API back-end

```shell
$ cd api/
$ go build -v -o photoview .
```

This builds the server executable to `api/photoview`.

### Copy needed files

Make a new directory and move the needed files to it.

> Note: If you plan to use the `systemd` service, see [Using with systemd](#using-with-systemd) below.

```shell
$ cd /opt/photoview
$ mkdir app
$ cp -r ui/build/ app/ui/
$ cp api/photoview app/photoview
$ cp -r api/data/ app/data/
```

## Setup database

> It's highly recommended to configure a full database,
> but Sqlite is also supported though it might be substantially slower on big media libraries.
> If you decide to Sqlite you can skip this step.

If you don't already have a database you can configure one by following this guide on [installing MySQL on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04).

If you've not done already, configure a new database and user to use with Photoview.

```shell
$ sudo mysql
# Create new user named 'photoview'
mysql> CREATE USER 'photoview'@'localhost' IDENTIFIED BY 'Photo_Secret#12345';
# Create new database named 'photoview'
mysql> CREATE DATABASE photoview;
# Grant user full access to the newly created database
mysql> GRANT ALL PRIVILEGES ON photoview.* TO 'photoview'@'localhost';
```

This will create a new user `photoview` with the password `Photo_Secret#12345` and a new database named `photoview`.

When you're done you should have a running MySQL database with a new user identified by a username and password and an empty database.

## Configure Photoview

Photoview is configured through environment variables. It will also load environment variables from a `.env` file.
We will use that to configure Photoview.

Copy the `api/example.env` file to the output directory, and name it `.env`.

```shell
$ cp api/example.env app/.env
```

To configure the database to use our MySQL database, edit `PHOTOVIEW_MYSQL_URL` to match our database configuration.
Replace `user`, `password` and `dbname`.

```
PHOTOVIEW_DATABASE_DRIVER=mysql
PHOTOVIEW_MYSQL_URL=user:password@tcp(localhost)/dbname

PHOTOVIEW_SERVE_UI=1
PHOTOVIEW_PUBLIC_ENDPOINT=http://localhost:4001/
```

See [environment variables](/docs/installation-environment-variables/) for more details.

## Install optional dependencies

Photoview can use some external programs to do more advanced things,
these programs are not required to use Photoview but some functionality will only be avaliable with them installed.

### RAW photo support

Photoview can use [Darktable](https://www.darktable.org/) to convert RAW photos to JPEGS when scanning.
To enable this install Darktable and make sure the `darktable-cli` binary is in your `$PATH` environment variable.

```shell
$ sudo apt install darktable
```

### Video transcoding

Photoview can use `ffmpeg` to convert video files that cannot be played directly in the browser.

```shell
$ sudo apt install ffmpeg
```

### Exif parsing

Photoview can optionally use `exiftool` to parse EXIF metadata faster and more reliably. Without it it will use its internal exif parser.

```shell
$ sudo apt install exiftool
```

## Using with `systemd`

You can optionally use systemd to manage photoview and start the program at boot.

The first three files cause `systemd` to run photoview as the `user:group` equal to `photoview:photoview`. This limits the permissions of the program, enhancing (slightly) the security.

It also necessitates your `PHOTOVIEW_MEDIA_CACHE` (and `PHOTOVIEW_SQLITE_PATH` if you are using `sqlite`) directory(ies) to be read- and write-able by the photoview user. If this is the first time you are installing photoview, the permissions should be handled automatically. If you are upgrading, and there are already files in that directory, you need to change the ownership, recursively, of those directories and their contents using `chown`.

Finally, `systemd` typically operates on an hierarchy of system paths.
As such, instead of installing everything together in `/opt/`, the program files will be placed under `/usr`, `/lib/`, and `/var`.
Be aware that, regardless of the path, the cache files in `PHOTOVIEW_MEDIA_CACHE` can be very large.
If this will cause issues, you can change the installation location.
If you do so, the `photoview.service` and `photoview.tmpfiles` will need to be altered, as well, if you plan to use the `systemd` unit file.
Further, a by-product of the large cache is that you may want to ensure the media cache directory you use is deleted if you want to permanently uninstall photoview, so as not to waste storage space.
You will also likely want to remove your database.

> These steps replace [Copy needed files](#copy-needed-files) above:

1. Copy `systemd` files:
   - `systemd/photoview.service` to `/etc/systemd/system/multi-user.target/photoview.service`
   - `systemd/photoview.sysusers.conf` to `/usr/lib/sysusers.d/photoview.conf`
   - `systemd/photoview.tmpfiles` to `/usr/lib/tmpfiles.d/photoview.conf`
   > If you do not plan to use `sqlite`, remove the 2nd line from `systemd/photoview.tmpfiles` before copying.
1. Make the directories where the program files will be placed :
   > Note: The `install` command, as demonstrated below, creates these required directories for you.
   - `/usr/share/webapps/photoview-ui`
   - `/usr/lib/photoview`
   - `/var/cache/photoview/media_cache`
   - `/var/lib/photoview` (for sqlite path, if used)
1. Copy built program files into appropriate locations
1. If you are upgrading from a state where you were not using the `systemd` service:
   - Change ownership of the media cache directory (and sqlite path, if used)
     - `$ sudo chown -R photoview:photoview /var/cache/photoview`
     - `$ sudo chown -R photoview:photoview /var/lib/photoview`
1. If this is a fresh installation, ensure the paths are owned and read-/write-able by the photoview user and group

A synopsis of the previous steps by example:
```shell
$ cd /opt/photoview
$ sudo install -Dm0644 -t "/usr/lib/systemd/system" "/opt/photoview/systemd/photoview.service"
$ sudo install -Dm0644 "/opt/photoview/systemd/photoview.sysusers.conf" "/usr/lib/sysusers.d/photoview.conf"
$ sudo install -Dm0644 "/opt/photoview/systemd/photoview.tmpfiles" "/usr/lib/tmpfiles.d/photoview.conf"
$ sudo install -d "/var/cache/photoview/media_cache"
# The next line is if you plan to use `sqlite`
$ sudo install -d "/var/lib/photoview"
$ cd /opt/photoview/ui/build
$ sudo find * -type f -exec install -Dm0644 "{}" "/usr/share/webapps/photoview-ui/{}" \;
$ cd /opt/photoview/api
$ sudo install -Dm0755 -t "/usr/lib/photoview" "/opt/photoview/api/photoview"
$ sudo ln -s /usr/lib/photoview/photoview /usr/bin/photoview
$ sudo find data -type f -exec install -Dm0644 "{}" "/usr/lib/photoview/{}" \;
$ sudo install -Dm0644 "/opt/photoview/api/example.env" "/etc/photoview.env"
```
### Using the `systemd` unit file

- To start (or stop) the photoview service:
  - `$ sudo systemctl <start/stop> photoview.service`
- To enable (or disable) the unit file to (no longer) start automatically during boot:
  - `$ sudo systemctl <enable/disable> photoview.service`
- To view status of the unit file:
  - `$ sudo systemctl status photoview.service`
  > Use this to print error messages if your `photoview` instance fails at runtime
- To continuously print to screen (a.k.a. `follow`) all messages from the service while it is running:
  - `$ sudo journalctl -f -b0 -u photoview.service`
  > Useful in debugging while running consecutive `start/stop` commands in a separate terminal

## Post installation

If you've made it this far, you should be able to start Photoview.
(Skip this step if you are using the `systemd` unit file.)

```shell
$ ./photoview
```

Once it has started it should print something like the following.
(If using the `systemd` unit, this message should be visible in the output of the `systemctl status` command.)

```
Photoview UI public endpoint ready at http://localhost:4001/
```

Navigate to [http://localhost:4001/](http://localhost:4001/) and you should be presented with the "Initial Setup" wizard.
From here enter a new username and password. For the `Photo Path` enter the filepath for your media, you can always change this later from the settings.

Next click `Setup Photoview` to create the new admin user.

Now navigate to the Settings page and click on Scan All. The scanner should now begin to scan for new media.
