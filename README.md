# Milestone_2
## WonderList

An interactive website utilizing the Google Maps API, Javascript,Jquery and data in XML format from UNESCO. The website enables users to find all 1121 World Heritage Sites, find out more information about them and plan their visit.

## My aim with the project

I wanted to learn how to use Google Maps for something interesting, and while looking for ideas I came across UNESCO's World Heritage website. I found it a bit clumsy and overwhelming so I wanted to create a concise and user-friendly map to make these remarkable places known to a wider audience as I found the map on.

### External user's goal

To find potential new holiday destinations that are less widely known.

To learn more about the UNESCO, more specifically the World Heritage Centre and the List.

To find out what's nearby these attractions and start travel planning.

### Site owner's goal

To support an organization and a cause they agree with.

To help others finding new travel destinations and learn more about the world.

## UX
### Strategy
To present a large number and type of data from an external source on Google Maps in a visually appealing and informative way.

### Scope
Within the scope of the project I have an interactive map that displays markers based on latitude and longitude data from the database.
On moving the mouse over a marker it should display information in an infowindow and contain a link to an external site.
On clicking on the marker/marker cluster the map focuses on the selected elements.
This map is filtered by the type of the location; this is achieved by using radio buttons to reveal relevant markers.

#### Outside of scope:

- Authentication is not necessary as users can't contribute to the page or share information.

- Featuring personal or business details as the page is for non-commercial use.

- Image gallery as the UNESCO website already contains these and the links in the footer point to social media sites like Instagram which is more suitable for this purpose.

### Structure
The website consists of 2 pages:

- Homepage: gives the user a short introduction to the purpose of the website and the work of UNESCO. It contains a copyright notice from UNESCO and features a footer with social media links and reference to Icons8.

- Map page: features the map with a marker for each site and an option for the user to filter them by the type of the site. It also features the same footer and links as the Home page.

### Skeleton
Wireframes

![Homepage](/assets/images/Home.png "Homepage on large screen size")

![Homepage on mobile](/assets/images/Home_mobile.png "Homepage on small screen size")

![Map page](/assets/images/Map.png "Map on large screen size")

![Map on mobile](/assets/images/Map_mobile.png "Map on small screen size")

### Surface

Both pages have a white background with a black header to provide contrast,the bright blue colour used throughout is the same that's used on the World Heritage Centre website.
On the left side of the header are the two menu items, on the right the site's name.
The body of the home page has an image on the left and the intro text on the right hand side of the page. The copyright information is displayed on the bottom of the page.
On small viewports the image is hidden and replaced by the WHC logo and the menu items become a hamburger button.

The map page has the same header and footer as the home page. The body is divided into two parts: the search feature with the radio buttons and the map itself. The map has unique styling and colour scheme that highlights points of interests and transport links and the markers have been replaced by the Unesco logo.
On small viewports the contents shrink to fit the viewport and aligns to the centre.


## User stories

As User 1 I am an experienced traveller and I am looking for ideas for my next holiday. I am willing to travel far away to see something new and remarkable.

As User 2 I am a student and I am doing a research on the preservation of historic monuments for my thesis. I am looking for good examples I can use in my project.

As User 3 I am planning a short trip with some sightseeing combined with food and entertainment. I am looking for a location not too far from me and I want to see what restaurants, other places of interests and transport links are nearby that location.

## Features

### Existing Features

The main feature is the Google map on the Map page that contains markers (clustered where necessary) to display the geographical location of each site which is obtained from the main data source. On mouse hover a window pops up over the marker containing the site's name, a short description and a link to the site's own page on the World Heritage Centre's website. On mouse leave this window disappears. On mouse click the map focuses on the marker/markers.

Another feature is the filtering of the markers, this is done by using the radio buttons whereby the user can decide if they want to see only places with natural or cultural or mixed values, or all of them.

Header-contains navigation links and the website name. The navigation links change colour when they are active. By clicking on the website name the user is able to return to the main page from the map page.

Footer- Contains links to the social media pages of the UNESCO World Heritage Center and Google. Also contains copyright information.

### Features left to implement

- More filter options, by region and/or country.

- Allow users to create a profile where they can save places, comment and upload their own photos.


## Technologies Used

HTML 

CSS 

Bootstrap v 4.5.0 for advanced styling and positioning. This includes the grid structure and the navigation.

Javascript and Jquery for DOM manipulation.

LowDB to create local database.

Google Maps API

## Testing
### Testing in different browsers
### Testing against the user stories
1.  User 1 can browse the entire map and check each information displayed when hovering over with the mouse  to see which one is of interest to them.
2.  User 2 the student can choose a preferred site type by using the radio buttons and following the link found in the info window appearing on mouse hover they can get to the site specific webpage of the UNESCO World Heritage Centre's website where they can get detailed information including history and significance.
3.  User 3 the person planning the short trip can focus the map on their own country and see what's nearby and what points of interests are also available in their area.

### Validation

HTML validation: https://validator.w3.org/  was used to validate the HTML code.

CSS validation: https://jigsaw.w3.org/css-validator/ was used to validate the CSS code.

JavaScript validation: https://jshint.com/ was used to check the JavaScript code.

## Problems encountered

1. Large number of data used from external source, which caused delays in loading the site. This was overcome by creating local storage.
2. Understanding and using the data structure was a challenge overall and proved to be the most time-consuming part of the process.
2. Google maps infowindow's contents were not displaying the correct information, used each location's id number to access the required data string.

## Deployment
I started building the HTML of the website and did the styling using CSS on Repl.it then created the repository https://github.com/KittiKovacs/Milestone_2 on GitHub where I created the file structure and added the code created on the Repl.it platform.
I commited important development stages and any progress by using git commit and pushed them to the master branch.
As a next step I published the website on GitHub pages at https://kittikovacs.github.io/Milestone_2/ .
I split my JavaScript file into modules and stored them in a separate folder.
All commits after every important update has been added to my site on GitHub pages where my project is currently deployed.

## Content

UNESCO kindly gave their permission to use their XML data available on their website.

## Media

Image source: ![Pexels](https://www.pexels.com/)

Fonts from ![Google Fonts](https://fonts.google.com/)

Icons by ![Icons8](https://icons8.com/)

Maps API by ![Google Maps](https://cloud.google.com/maps-platform/)

Map styling from ![Snazzymaps](https://snazzymaps.com/)

## Acknowledgements

Many thanks for the permission to UNESCO to use their name, logo and data.

My mentor Guido Cecilio Garcia Bernal had great suggestions and helped me manage the database.

Also a big thank you for the tutors at Code Institute especially Miklos and Johann.
