---
title: Manual Setup
group: Installation
---
## Index
- [Installing Dependencies](#installing-dependencies)    
    - [Installing and Setting Up MYSQL8](#installing-and-setting-up-mysql8)
    - [Configuring MYSQL 8](#configuring-mysql-8)
    - [Setting up MYSQL 8 Database and Users](#setting-up-mysql-8-database-and-users)
- [Installing Photoview and Configuring](#installing-photoview-and-configuring)
    - [Download and Configuring the Repo](#download-and-configuring-the-repo)
- [Daemonzing Systemd for Photoview](#daemonzing-systemd-for-photoview) 
    - [Systemd Setup](#systemd-setup)
    - 
> # Installing on Ubuntu 20.04

## Installing Dependencies

### Installing and Setting Up MYSQL8
If you have not installed MYSQL 9 yet please follow below instructions. If you have already installed MYSQL 8 please skip to setting up MYSQL 8

1. We need to install wget by running

`sudo apt-get wget`

2. Now we need to pull MYSQL by running 

`wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb`

3. Now we need to install MYSQL 8

`sudo dpkg -i mysql-apt-config_0.8.16-1_all.deb`

4. You should be brought up with a windows showing a GUI installer. Click on the default MYSQL 8 and hit ok or return

5. Then select MYSQL 8

6. You will be brough to a window that will say pick Secure Password (recommmneded) retain old.


**VERY IMPORTANT:**
**DO NOT SELECT THE RECOMMENDED (I WAS TRYING TO FIGURE OUT FOR OVER 3 DAYS WHY MYSQL 8 WAS NOT WORKING CORRECTLY)**
**SELECT RETAIN OLD MYDQL 5.X OR YOU WONT BE ABLE TO LOGIN TO MYSQL8 UNDER ANY USER.**)


7. Next update the repos.
 
`sudo apt-get update`

8. Now you have to make sure everything matches up.

`sudo apt-cache policy mysql-server`

It should look like this

```
mysql-server:
  Installed: (none)
  Candidate: 8.0.23-1ubuntu20.04
  Version table:
     8.0.23-1ubuntu20.04 500
        500 http://repo.mysql.com/apt/ubuntu focal/mysql-8.0 amd64 Packages
     8.0.23-0ubuntu0.20.04.1 500
        500 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages
        500 http://archive.ubuntu.com/ubuntu focal-updates/main i386 Packages
        500 http://security.ubuntu.com/ubuntu focal-security/main amd64 Packages
        500 http://security.ubuntu.com/ubuntu focal-security/main i386 Packages
        500 http://mirror.hetzner.de/ubuntu/packages focal-updates/main amd64 Packages
        500 http://mirror.hetzner.de/ubuntu/packages focal-updates/main i386 Packages
        500 http://mirror.hetzner.de/ubuntu/packages focal-security/main amd64 Packages
        500 http://mirror.hetzner.de/ubuntu/packages focal-security/main i386 Packages
     8.0.19-0ubuntu5 500
        500 http://archive.ubuntu.com/ubuntu focal/main amd64 Packages
        500 http://archive.ubuntu.com/ubuntu focal/main i386 Packages
        500 http://mirror.hetzner.de/ubuntu/packages focal/main amd64 Packages
        500 http://mirror.hetzner.de/ubuntu/packages focal/main i386 Packages
```

9. Now install MYSQL 8
`sudo apt install mysql-client mysql-community-server mysql-server`
10. Type Y for all the prompts and type whatever password you would like and will remember for your mysql root user
11. Now setup your root user and password.

`sudo mysql_secure_installation`

Follow the below prompts exactly:

```
Enter current password for root (enter for none): <Enter password>
VALIDATE PASSWORD PLUGIN can be used to test passwords 
and improve security. It checks the strength of password 
and allows the users to set only those passwords which are 
secure enough. Would you like to setup VALIDATE PASSWORD plugin? 

Press y|Y for Yes, any other key for No: Y 
```
```
There are three levels of password validation policy: 

LOW    Length >= 8 
MEDIUM Length >= 8, numeric, mixed case, and special characters 
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file 

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1 
ENTER: 0
password: <Your-Password>
```
```
Estimated strength of the password: 25  
Change the password for root ? ((Press y|Y for Yes, any other key for No) : d
```
```
Remove anonymous users? [Y/n] Y `
Disallow root login remotely? [Y/n] Y 
Remove test database and access to it? [Y/n] Y 
Reload privilege tables now? [Y/n] Y 
Thanks for using MariaDB!
```
12. Now clear the old session by

`clear`

13. Login to MYSQL

`mysql -u root -p`

14. Check the version

`SELECT VERSION();`

```
+-----------+
| VERSION() |
+-----------+
| 8.0.23    |
+-----------+
1 row in set (0.00 sec)
```

> ## Configuring MYSQL 8


> ### Setting up MYSQL 8 Database and Users

1. Create your user for localhost

**IMPORTANT: DO NOT USE !,?.#$%^&*`**

`CREATE USER 'demonwarrior'@'%' IDENTIFIED BY 'Passsword';`

2. Next we need to grant all privelages on the new user.

`GRANT ALL PRIVILEGES ON * . * TO 'demonwarrior'@'%';`

3. Now flush the privelaged

`FLUSH PRIVILEGES;`

4. Exit MYSQL8

`exit`

> ### Creating and Setting Up Database
1. Connect to MYSQL 8
`mysql -u root -p`
Enter password:
2. Create MYSQL 8 Database
`CREATE DATABASE photoview;`
3. Now check to make sure it is correctly installed.
`SHOW DATABASES;`
4. Granting Permissions of MYSQL Database
`GRANT ALL PRIVILEGES ON photoview.* TO 'demonwarrior'@'localhost';`
5. Exit out of MYSQL
`EXIT;`

All Done Now go to Installing and Setting up Photoview Document



> # Installing Photoview and Configuring
> ## Download and Configuring the Repo

1. Clone the repository

`git clone https://github.com/photoview/photoview.git`

2. Go to cloned repository

`cd ~/photoview`

3. Build the web UI

`cd ./ui && npm install && npm run build`

4. Go back to the photoview directory by

`cd ..`
   
5. Copy the built web UI to the api directory:

`cp -r ./ui/dist ./api/ui`

6. Build the back-end

` cd ./api && go build -v -o photoview . `
   
7. Set config environment variables in .env file

`cd ..`

7.1 Copy the ./api/example.env to api/.env

`cp ./api/example.env ./api/.env`

7.2 Change the following variables:
        
```
        MYSQL_URL to point to your mysql server
        API_LISTEN_PORT to the port you want the server to run on
        Comment outAPI_ENDPOINT and UI_ENDPOINT they will not be used
        Set SERVE_UI=1
        Uncomment PUBLIC_ENDPOINT and set it to the public url from which the server will be accessed, if it's only for your local network, set this to http://<the local ip of your server>:<the port specified in API_LISTEN_PORT>/
        Set DEVELOPMENT=0 to improve performance and security.

Your .env should look like below if you have followed the entire setup


```


```
# Copy this file to .env

PHOTOVIEW_DATABASE_DRIVER=mysql
PHOTOVIEW_MYSQL_URL=demonwarrior:Password@tcp(127.0.0.1)/photoview

# Specifies the connection string for the postgres database, if PHOTOVIEW_DATABASE_DRIVER is set to 'postgres'
# See https://www.postgresql.org/docs/current/libpq-ssl.html for possible ssl modes
# PHOTOVIEW_POSTGRES_URL=postgres://user:password@host:port/dbname?sslmode=(disable|allow|...)

# Specifies the filepath for the sqlite database, if PHOTOVIEW_DATABASE_DRIVER is set to 'sqlite'
# PHOTOVIEW_SQLITE_PATH=photoview.db

PHOTOVIEW_LISTEN_IP=localhost
PHOTOVIEW_LISTEN_PORT=4001

# The url from which the server can be accessed publicly
#PHOTOVIEW_API_ENDPOINT=http://localhost:4001/
#PHOTOVIEW_UI_ENDPOINT=http://localhost:1234/

# Path where media should be cached, defaults to ./media_cache
# PHOTOVIEW_MEDIA_CACHE=./media_cache

# Set to 1 for the server to also serve the built static ui files
PHOTOVIEW_SERVE_UI=1
# When PHOTOVIEW_SERVE_UI is 1, PHOTOVIEW_PUBLIC_ENDPOINT is used instead of PHOTOVIEW_API_ENDPOINT and PHOTOVIEW_UI_ENDPOINT
PHOTOVIEW_PUBLIC_ENDPOINT=http://localhost:4001/

# Enter a valid mapbox token, to enable maps feature
# A token can be created for free at https://mapbox.com
#MAPBOX_TOKEN=<insert mapbox token here>

# Set to 1 to set server in development mode, this enables graphql playground
# Remove this if running in production
PHOTOVIEW_DEVELOPMENT_MODE=0
```

8. Give the binary executable permissions by running

`chmod +x ./api/photoview`

9. Start the server

`cd ~/`

`cd ~/Downloads/photoview/api/`

`./photoview`

Now Photoview should be running succesfully
Terminal Should look like


```
demonwarrior@Gaming-Server:~/photoview/api$ ./photoview
2021/02/24 22:50:12 Connecting to MYSQL database: demonwarrior:Shaggers495@tcp(127.0.0.1)/photoview?multiStatements=true&parseTime=true

2021/02/24 22:50:12 /home/demonwarrior/photoview/api/database/database.go:156 SLOW SQL >= 200ms
[254.505ms] [rows:-] SELECT count(*) FROM information_schema.tables WHERE table_schema = 'photoview' AND table_name = 'users' AND table_type = 'BASE TABLE'
2021/02/24 22:50:12 Initializing scanner queue with 3 workers
2021/02/24 22:50:12 Queue waiting
2021/02/24 22:50:12 Periodic scan interval changed: disabled
2021/02/24 22:50:12 Scan interval runner: Waiting for signal
2021/02/24 22:50:12 Scan interval runner: New ticker detected
2021/02/24 22:50:12 Scan interval runner: Waiting for signal
2021/02/24 22:50:12 Executable worker not found: darktable
2021/02/24 22:50:12 Found executable worker: ffmpeg
2021/02/24 22:50:12 Photoview API endpoint listening at http://localhost:4001/api
2021/02/24 22:50:12 Photoview API public endpoint ready at http://localhost:4001/api
2021/02/24 22:50:12 Photoview UI public endpoint ready at http://localhost:4001/
```

10. Now go to any Browser and type

`http://localhost:4001` 

You Should be met with Photoview

> # Daemonzing Systemd for Photoview

> ## Systemd Setup

1. Copy the Binary over to the /usr/bin directory

`cd ~/Downloads/photoview/api/`

`sudo cp -r ./photoview /usr/bin`

2. Installing Systemd Service

`sudo nano /etc/systemd/system/photoview.service`

3. Paste below in the file we just opened to edit

```  
#!/bin/sh
[Unit]
Description=Photoview
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
WorkingDirectory=/home/demonwarrior/Downloads/photoview/api
ExecStart=/home/demonwarrior/Downloads/photoview/api/photoview
Restart=always

[Install]
WantedBy=multi-user.target

```

4. Now start the service

`sudo systemctl start photoview`

5. Check to make sure its running

`sudo systemctl status photoview`

6. If its correctly running enable it to run at startup

`sudo systemctl enabled photoview`

7. Enjoy Photoview

