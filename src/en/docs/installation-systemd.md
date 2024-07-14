---
title: Use with systemd
group: Installation
priority: 3
translationKey: installation-systemd
---

You can optionally use `systemd` to manage photoview and start the program at boot.
It also allows the program to run as its own system user, enhancing the security of the process.


To get started, follow the [Manual Setup Installation guide](/{{ locale }}/docs/installation-manual/).
When you get to the _Copy needed files_ section, replace those steps with the steps listed below.

## Using with `systemd`

The first three files in the steps below cause `systemd` to run photoview as the `user:group` equal to `photoview:photoview`.
This limits the permissions of the program, (slightly) enhancing security by limiting its access to files and directories to which the process has explicitly been given access.

It also necessitates your `PHOTOVIEW_MEDIA_CACHE` (and `PHOTOVIEW_SQLITE_PATH` if you are using `sqlite`) directory(ies) to be read- and write-able by the `photoview` user.
If this is the first time you are installing photoview, the permissions should be handled automatically.
If you are upgrading, and there are already files in that directory, you need to change the ownership, recursively, of those directories and their contents using `chown`.

Finally, `systemd` typically operates on an hierarchy of system paths.
As such, instead of installing everything together in `/opt/`, the program files will be placed under `/usr`, `/lib/`, and `/var`.
Be aware that, regardless of the path, the cache files in `PHOTOVIEW_MEDIA_CACHE` can be very large.
If this will cause issues, you can change the installation location.
If you do so, the `photoview.service` and `photoview.tmpfiles` will need to be altered, as well, if you plan to use the `systemd` unit file.

> Reminder: These steps replace [Copy needed files](#copy-needed-files) from the manual installation guide.

1. Create the `photoview` user and group
   - `$ sudo adduser photoview --system --group --no-create-home`
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
$ sudo adduser photoview --system --group --no-create-home
$ cd /opt/photoview
$ sudo install -Dm0644 -t "/usr/lib/systemd/system" "/opt/photoview/systemd/photoview.service"
$ sudo install -Dm0644 "/opt/photoview/systemd/photoview.sysusers.conf" "/usr/lib/sysusers.d/photoview.conf"
$ sudo install -Dm0644 "/opt/photoview/systemd/photoview.tmpfiles" "/usr/lib/tmpfiles.d/photoview.conf"
$ sudo install -d "/var/cache/photoview/media_cache"
$ sudo chown -R photoview:photoview /var/cache/photoview
$ cd /opt/photoview/ui/dist
$ sudo find * -type f -exec install -Dm0644 "{}" "/usr/share/webapps/photoview-ui/{}" \;
$ cd /opt/photoview/api
$ sudo install -Dm0755 -t "/usr/lib/photoview" "/opt/photoview/api/photoview"
$ sudo ln -s /usr/lib/photoview/photoview /usr/bin/photoview
$ sudo find data -type f -exec install -Dm0644 "{}" "/usr/lib/photoview/{}" \;
$ sudo install -Dm0644 "/opt/photoview/api/example.env" "/etc/photoview.env"
# The next two lines are if you plan to use `sqlite`
$ sudo install -d "/var/lib/photoview"
$ sudo chown -R photoview:photoview /var/lib/photoview
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
