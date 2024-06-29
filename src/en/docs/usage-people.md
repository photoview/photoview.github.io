---
title: Face recognition
group: Usage
translationKey: usage-people
---

## Face recognition - the People tab ##
Face recognition is an optional feature of Photoview that you can choose to enable at installation time. When enabled, a tab in the left-hand panel labeled "People" is present. Clicking on it will take you to the page where you can name the faces that Photoview has recognized.
### Labeling people ###
{% optimizedImage 'src/assets/images/screenshot-unlabelled-people.png', 'Unlabelled faces', 'class="block w-4/5 mx-auto my-6"' %}

The first time you click on the People tab, you will be presented with an array of faces that Photoview has detected in your photos. As Photoview has no way of knowing who these people are, you will have to name them. Under each face is a label. Initially, it says "`123` **Unlabeled**" where `123`is a number representing how many pictures this face was found in. Clicking on the text "Unlabeled" allows you to input a name for the person that this face belongs to. It is up to you if you want to state the full name, just the first name or a nickname. We recommend that you choose something unique for this person so that you can tell it apart from a different person who may have the same name. If you are unsure of who it is, you may want to see all of the pictures belonging to that person. To do this, simply click on the face. This will take you to a page similar to this 
{% optimizedImage 'src/assets/images/screenshot-manage-person.png', 'Manage Person', 'class="block w-4/5 mx-auto my-6"' %}
where you can see all the pictures of that person. At the top of that page is the text "Unlabeled person". Under that are some buttons you can click. The first reads "Change label". Click this to name the person. The "Unlabeled person" now has a name!

### Merging faces ###
After naming some persons, you may come across a picture that is from the same person that you have already named. This is because Photoview could not determine that it is the same person so you would have to tell Photoview that they are. To do this, click on the yet unnamed picture to see all the photos of this person. 
Instead of clicking the "Change Label" button, you should click "Merge face" to tell Photoview to merge the two sets of photos belonging to this person. Photoview will then display a list of all already named persons and ask you to select one of them. Click on the appropriate name or photo and then "Merge". Should you have a lot of named persons already, you may want to search for the name before you click it. There is a search box for this at the top of the list.

After you have clicked "Merge", Photoview will sort all the new photos under the label (person name) that you selected. This can take a while and be quite taxing for your server, so please be patient.

### Detaching faces ###
Sometimes Photoview will make a mistake and sort a face from a different person in the same group as the correctly sorted faces. In this case, you can click the "Detach face" button. You will then be presented with a list of all the pictures from the current group. On the right side of each photo is a checkbox and the filename of that photo. Check the checkboxes of the photos that have been incorrectly categorized and then click "Detach image faces". Doing so will put the detached photos in the group of "Unlabeled faces". Follow the instructions above "Labeling people" or "Merging faces" to put them under the correct label. 

### Moving faces ###
Moving faces is the same as first detaching them and then either labeling them (for new faces) or merging them (for already named faces). If a face has been incorrectly sorted and belongs to a person you have already named, you should click the "Move faces" button and then select the photo(s) of the person that was incorrectly sorted. After clicking "Next" you will be presented with the same list as when merging faces. Click the name of the person that you want the photos to belong to and you are done.

