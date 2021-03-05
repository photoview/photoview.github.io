---
title: Manual Setup
group: Installation
priority: 2
---

This guide explains how to build, install and configure Photoview
on a fresh installation of `Ubuntu 20.02.2 LTS` to run directly on the system without using Docker.

## Preparation

Make sure your computer is up to date.

```shell
$ sudo apt update && sudo apt upgrade
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

Now install Node and NPM if you've not done so already.

```shell
$ sudo apt install nodejs npm
```

Next install the required dependencies needed to build and run Photoview.

```shell
# Dependencies needed for go-face
$ sudo apt install libdlib-dev libblas-dev liblapack-dev libjpeg-turbo8-dev
```

## Download and build Photoview

Navigate to [Photoview Releases](https://github.com/photoview/photoview/releases) and download the source code for the latest version, extract it and open the extracted directory in the terminal.

### Build the Web user-interface

```shell
$ cd ui/
$ npm install && npm run build
```

This builds the UI source code and saves it in the `ui/dist/` directory.

### Build the API back-end

```shell
$ cd api/
$ cd ./api && go build -v -o photoview .
```

This builds the server executable to `api/photoview`.

### Copy needed files

Make a new directory and move the needed files to it.

```shell
$ mkdir output
$ cp -r ui/dist/ output/ui/
$ cp api/photoview output/photoview
$ cp -r api/data/ output/data/
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
mysql> CREATE USER 'photoview'@'localhost' IDENTIFIED BY 'Photo_Secret12345';
# Create new database named 'photoview'
mysql> CREATE DATABASE photoview;
# Grant user full access to the newly created database
mysql> GRANT ALL PRIVILEGES ON photoview.* TO 'photoview'@'localhost';
```

This will create a new user `photoview` with the password `PhotoS#cret12345` and a new database named `photoview`.

When you're done you should have a running MySQL database with a new user identified by a username and password and an empty database.

## Configure Photoview

Photoview is configured through environment variables. It will also load environment variables from a `.env` file.
We will use that to configure Photoview.

Copy the `api/example.env` file to the output directory, and name it `.env`.

```shell
$ cp api/example.env output/.env
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

## Post installation

If you've made it this far, you should be able to start Photoview.

```shell
$ ./photoview
```

Once it has started it should print something like the following.

```
Photoview UI public endpoint ready at http://localhost:4001/
```

Navigate to [http://localhost:4001/](http://localhost:4001/) and you should be presented with the "Initial Setup" wizard.
From here enter a new username and password. For the `Photo Path` enter the filepath for your media, you can always change this later from the settings.

Next click `Setup Photoview` to create the new admin user.

Now navigate to the Settings page and click on Scan All. The scanner should now begin to scan for new media.
