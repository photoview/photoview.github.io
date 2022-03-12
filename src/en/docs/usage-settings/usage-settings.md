---
title: Settings Page
group: Usage
translationKey: usage-settings
---

## Manage users

### Add and remove users

To add a new user, click the `New user` button and fill in the username and a media path for the new user.
After creating a new user, make sure to add a password to the account as well, by clicking on the `Change password` button, next to the user.

{% optimizedImage './add-user.png', 'screenshot of adding a new user', 'class="block w-full my-8"' %}

### Editing users

A user can be edited by clicking on the `Edit` button for the user.

**Photo path:** is the path on the file system of the server from where the media of the user is located.
Note if running Docker, that this refers to the file system of the container and not the host.
Multiple paths can be added, if the media for the user is spread across multiple directories.
For more information, see [File scanner](../usage-scanner).

**Admin:** if the user is marked as admin, they will be able to manually start the scanner and to manage and create new users.

{% optimizedImage './edit-user.png', 'screenshot of editing a user', 'class="block w-full my-8"' %}

## Scanner

### Periodic Scanner

When the periodic scanner is enabled,
Photoview will automatically scan all users for new media at a fixed time interval.

{% optimizedImage './periodic-scanner.png', 'screenshot of periodic scanner', 'class="block w-96 my-8"' %}

### Concurrent Workers

This setting specifies how many scanner jobs that are allowed to run in the background at once.
The lower the value, the longer time it will take to process all media, but the less system resources it will use at once.
If you are running Photoview on limited hardware such as a Raspberry Pi, it is recommended to keep this value at 1.
