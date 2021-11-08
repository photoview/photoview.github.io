---
title: FAQ
group: root
---

## Move cache to another hard drive?

Yes you can. If you are running Photoview using docker-compose, change/add the volume mount that points to the cache to bind it to a path on your other hard drive.

```yml
volumes:
  # Change this:
  - api_cache:/app/cache
  # To this:
  - /path/to/hard-drive/photoview_cache:/app_cache
```

If you are not using Docker, simply set the `PHOTOVIEW_MEDIA_CACHE` environment variable to the desired path. E.g.:

- Set the variable in `.env`,
- Or alternatively, `export PHOTOVIEW_MEDIA_CACHE=/path/to/hard-drive/photoview_cache`

## My PHOTOVIEW_MEDIA_CACHE is very large! Is it safe to delete it?

The size of the media cache will scale with the size of your photo library, and as such it can become very large.
If you delete it, it will be recreated if you continue to use Photoview.
As such it is not advisable to delete the cache if you are still using Photoview, unless, perhaps, if you are significantly changing the library of photos on disk.
If you want to permanently uninstall Photoview, then yes, feel free to remove/delete the directory so as not to waste storage space.
In this case, you will also likely want to remove your database.

## I click "Scan All" but nothing happens

If you are using Docker, make sure that your media is properly mounted. If you are unsure about that see [Setup with Docker](/docs/installation-docker/).

To troubleshoot this, you can enter the container and check that the media is present.
To do this execute the following command `docker-compose exec photoview /bin/bash`, then list the mounted directory with `ls /photos`.

## The scanner is mostly working but it randomly stops before it's finished

Check the server logs with `docker-compose logs` and look for `signal: killed` errors, similar to the one below:

```text
Failed to begin database transaction: failed to process photo: &lt;...&gt;: signal: killed
```

This error is thrown if the server doesn't have enough resources to process the media, and the operating system kills some worker processes to free up resources.
To circumvent that, you can reduce the number of [concurrent workers](/docs/usage-settings/#concurrent-workers).
Try setting it to `1` and see if that fixes the problem.

## Where do I find logging information

Navigate to the directory where your `docker-compose.yml` file lies, and execute `docker-compose logs`.

## I forgot the password to the admin user, is there a way to reset it?

Yes, but you will have to update the password manually in the database.

If you are using the default docker-compose setup, you can connect to the database by running the following command.

```shell
$ docker-compose exec db mysql -uphotoview -pphotosecret photoview
```

Next you will have to manually hash a new password using the `bcrypt` hashing algorithm.
The easiest way to do so it using an online tool like [bcrypt-generator.com](https://bcrypt-generator.com/).

You can run the following SQL query to get a table of users.

```shell
> SELECT * FROM users;
```

To update the password of one of the users, run the following. But replace `$2a$12$APn0mVXrxjNnKencpxBFWe82SMzeaUInvJDidZButEI9CCk3x.UAO` with your own generated password hash,
and `admin` with the username of your admin user.

```shell
> UPDATE users SET password='$2a$12$APn0mVXrxjNnKencpxBFWe82SMzeaUInvJDidZButEI9CCk3x.UAO' WHERE username='admin';
Query OK, 1 row affected (0.011 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```
