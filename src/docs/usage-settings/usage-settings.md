---
title: Settings Page
group: Usage
---

## Manage users

### Add and remove users

> TODO: Write this section explaining how users are added and deleted and what the consequences are.<br/>
> Maybe also how to set a password for new users.

### Editing users

A user can be edited by clicking on the `Edit` button for the user.

> TODO: Update **Photo path** to explain how this is done in version 2.
> Also explain how paths can be shared across users.

**Photo path:** is the path on the file system of the server from where the media of the user is located.
Note if running Docker, that this refers to the file system of the container and not the host.

**Admin:** if the user is marked as admin, they will have access to the settings page.

> TODO: Update screen shot to reflect the settings in version 2.

{% optimizedImage './edit-user.png', 'screenshot of editing a user', 'class="block w-full my-8"' %}

## Scanner

### Periodic Scanner

When the periodic scanner is enabled,
Photoview will automatically scan all users for new media at a fixed time interval.

{% optimizedImage './periodic-scanner.png', 'screenshot of periodic scanner', 'class="block w-96 my-8"' %}

### Concurrent Workers

> TODO: Explain what the concurrent workers setting does
