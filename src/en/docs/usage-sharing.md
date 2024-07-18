---
title: Share albums and media
group: Usage
translationKey: usage-sharing
---

Photoview allows you to share individual photos/videos and albums. A share is a link that allows the viewer to see only those photos and videos that the share points to. A share can be password protected and in the future it can have an expiry date (this feature is not yet implemented). 

*Note that in order for a share to function outside of your local network, you will have to make Photoview available from the Internet. How to set this up is outside the scope of this manual, but generally it involves providing a domain-name through your ISP or Registrar, then setting up a reverse proxy like Nginx, Traefik or Caddy to point that domain-name to the server in your local area network that provides the Photoview service.*

Provided that you have set up your Photoview app to be available from the Internet - here is how to create a share:
### Sharing a single photo or video ###
In **Timeline**, **Albums** or **People** view, click the &#9432; on the top right of a photo and scroll down to _Sharing options_ in the panel that appears. Unless you have previously created a share for this photo, the text _"No shares found"_ will be present. Press the **+ Add shares** link. _"No shares found"_ will now be replaced with a link symbol and the text _"Public link"_ followed by a sequence of letters and numbers (a hexadecimal hash). To the right, you have three icons: 
1. An icon that looks like two overlapping squares - this represents the "copy" action. Click this to copy the link so that you can paste it in an email or similar.
2. An icon that looks like a waste paper basket - this represents the "delete" action. Click this to remove the share/link.
3. Three dots - this represents "more actions". Clicking the three dots reveals a form that allows you to set a password to protect your share, and set an expiry date for the share. Setting an expiry date is a future feature of Photoview, it is currently not working. If you wish to password-protect the share, first enable this feature by clicking the checkbox next to the password field, then enter the password, and lastly click the little arrow to the right of the password field.

### Sharing an album ###
Sharing a complete album is similar to the above procedure. First, you need to select the album view. Do this by clicking the **Albums** tab in the left-hand menu and then selecting the album you wish to share. To the right of the title of the album, there is a gear button. Click it and a side panel will appear to the right. It has the title **"Sharing options"**. Follow the same procedure as for sharing a single photo or video above to create and optionally password-protect your share.
### Deleting a share ###
If you wish to delete a share, just navigate to the photo/video/album in question and click the waste paper basket icon next to the share link.
### Password protection ###
Shares can be protected by a password. This allows for a form of protection should the link to the share be spread to people who should not have access to your photos or videos. When protected by a password, the user clicking the link to the share will be presented with this form: {% optimizedImage '../../assets/images/screenshot-protected-share.png', 'Protected Share', 'class="block w-4/5 mx-auto my-6"' %} and need to enter the password before being allowed to view the photo/album/video. Should you change your mind about a password, you can disable it by navigating to the photo/album/video in question and unchecking the checkbox next to the password field.


