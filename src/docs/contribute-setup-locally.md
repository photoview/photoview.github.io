---
title: Setup Development Environment
group: Contributing
---

How to set up a development environment locally.

### Local setup

1. Install a local mysql server, and make a new database
2. Rename `/api/example.env` to `.env` and update the `MYSQL_URL` field
3. Rename `/ui/example.env` to `.env`

### Start API server

Make sure [golang](https://golang.org/) is installed.

Some C libraries are needed to compile the API, see [go-face requirements](https://github.com/Kagami/go-face#requirements) for more details. They can be installed as shown below:

```bash
# Ubuntu
sudo add-apt-repository ppa:strukturag/libheif
sudo add-apt-repository ppa:strukturag/libde265
sudo apt-get update
sudo apt-get install libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg-turbo8-dev libheif-dev
# Debian
sudo apt-get install libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg62-turbo-dev libheif-dev
# macOS
brew install dlib libheif
```

Then run the following command to start the API server:

```bash
cd ./api && go run server.go
```

### Start UI server

Make sure [node](https://nodejs.org/en/) is installed.
In a new terminal window run the following commands:

```bash
cd ./ui && npm start
```

The site can now be accessed at [localhost:1234](http://localhost:1234).
And the graphql playground at [localhost:4001](http://localhost:4001)
