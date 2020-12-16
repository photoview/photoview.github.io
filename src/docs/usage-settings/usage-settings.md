---
title: Settings Page
group: Usage
---

## Manage users

### Editing users

A user can be edited by clicking on the `Edit` button for the user.

**Photo path:** is the path on the file system of the server from where the media of the user is located.
Note if running Docker, that this refers to the file system of the container and not the host.

**Admin:** if the user is marked as admin, they will have access to the settings page.

{% optimizedImage './edit-user.png', 'screenshot of editing a user', 'class="block w-full my-8"' %}

## Periodic Scanner

When the periodic scanner is enabled,
Photoview will automatically scan all users for new media at a fixed time interval.

{% optimizedImage './periodic-scanner.png', 'screenshot of periodic scanner', 'class="block w-96 my-8"' %}
