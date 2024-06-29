---
title: Places
group: Usage
translationKey: usage-places
---

The **Places** tab is visible if enabled at installation time. Clicking it takes you to a map where your photos are grouped together, based on where they were taken. The map could look something like this:
{% optimizedImage 'src/assets/images/screenshot-maps.png', 'Maps in Photoview', 'class="block w-4/5 mx-auto my-6"' %}
This of course only works if your photos are geotagged, that is the camera/phone you used stored the coordinates as EXIF metadata to your photo. There is a number in a blue circle in the top right of the thumbnails of most thumbnails. This number represents the number of photos available from that location. 
### Viewing photos from a location ###
Clicking on one of the thumbnails allows you to view all the photos from that location, using left and right arrows to navigate between the photos. Clicking the "X" in the upper left corner takes you back to the map. 
### Zooming in and out ###
When you view the map, you can use the scroll wheel of your mouse (or a corresponding _gesture_ on your touchpad) to zoom in and out of the map. As you zoom in, you will see that some of the photos that were represented as being taken in one location will now split up and be shown in separate, nearby locations. Here is an example of a slightly zoomed-out view: {% optimizedImage 'src/assets/images/screenshot-map-oneset.png', 'Zoomed-out map', 'class="block w-4/5 mx-auto my-6"' %} Here you can see that 50 photos are available from one location on the Swedish east coast. Zooming in further, these 50 photos split up into two groups of 25 photos each like this: {% optimizedImage 'src/assets/images/screenshot-map-twoset.png', 'Zoomed-in map', 'class="block w-4/5 mx-auto my-6"' %}. This means that those 50 photos were taken at two slightly different locations. This is a way to narrow down how precise you want to be when viewing your photos. Zooming out a lot will perhaps allow you to view all photos from a particular country.
### Moving on the map ###
To move what part of the world you see on the map, just click and hold the left mouse button and drag, or use the corresponding gesture on your touchpad.  You can of course combine this by zooming in or out. Zooming out enough, the map will become a globe, spinning when you click and hold.
### What if photos are misplaced on the map or missing altogether? ###
Photoview places photos on the map according to the coordinates stored as metadata (EXIF) in the file of the photo. If these coordinates are wrong, the photos will end up in the wrong place on the map and there is nothing Photoview can do about it. Similarly if a photo does not have any coordinates in its metadata, it will not show up on the map at all. You will have to find another tool that can change the coordinates in the photo to remedy this. Google for "tool for editing GPS coordinates in EXIF data" to get suggestions for such tools. After making changes, you will have to re-scan the library. This is done on the **Settings** tab in the main menu.

