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
To help others finding new travel destinations.

## UX
### Strategy
To present a large number of data from an external source in a visually appealing and informative way.

### Scope
Within the scope of the project I have an interactive map that displays markers based on latitude and longitude data from the database.
On moving the mouse over a marker it should display information in an infowindow and contain a link to an external site.
On clicking on the marker/marker cluster the map focuses on the selected elements.
This map is to be filtered by the type of the location; this is achieved by hiding markers displayed by default by using radio buttons.

#### Outside of scope:

- Authentication is not necessary as users can't contribute to the page or share information.
- Featuring personal or business details as the page is for non-commercial use.
- Image gallery as the UNESCO website already contains these and the links in the footer point to social media sites like Instagram which is more suitable for this purpose.

### Structure
The website consists of 2 pages:

-Homepage: gives the user a short introduction to the purpose of the website and the work of UNESCO. It contains a copyright notice from UNESCO and features a footer with UNESCO's social media links and reference to Icons8.

-Map page: features the map with a marker for each site and an option for the user to filter them by the type of the site. It also features the same footer and links as the Home page.

### Skeleton
Wireframes


### Surface

The colour scheme on both pages is similar to Unesco's with the exception of the header which is black in order to provide contrast to the white background of the body and the bright blue accents.
The body of the home page has an image on the left and text on the right hand side of the page. The copyright information is displayed on the bottom of the page right above the footer, but still clearly visible.


## User stories
As User 1 I am an experienced traveller and I would be looking for ideas for my next holiday. I am willing to travel far away to see something new and remarkable.

As User 2 I am a student and I am doing a research on the preservation of historic monuments for my thesis. I am looking for good examples I can use in my project.

As User 3 I am planning a short trip with some sightseeing combined with food and entertainment. I am looking for a location not too far from me and I want to see what restaurants, other places of interests and transport links are nearby that location.

## Features

### Existing Features

The main feature is the Google map on the “Map” page that contains markers (clustered where necessary) to display the geographical location of each site which is obtained from the main data source. On mouse hover some information pops up over the marker containing the site's name, why it's important and a link to the World Heritage Centre's website. On mouse leave this window disappears. On mouse click the map focuses on the marker/markers.

Another feature is the filtering of the markers, this is done by using the radio buttons whereby the user can decide if they want to see only places with natural or cultural or mixed values.

Header-contains navigation links and the website name. The navigation links change colour when they are active. By clicking on the website name the user is able to return to the main page from the map page.

Footer- Contains links to social media pages. This is currently the company's Facebook page only. The Facebook logo changes colour on mouse hover to indicate that there is an action available. Also contains copyright information.

### Features Left to Implement


## Technologies Used
HTML 
CSS 
Bootstrap v 4.5.0 for advanced styling and positioning. This includes the grid structure and parts of the navigation.
Javascript and Jquery for DOM manipulation.
LowDB to create local database, which was necessary due to the large number of data used.

## Testing
### Testing in different browsers
### Testing against the user stories
1.  User 1 can browse the entire map and check each information displayed when hovering over with the mouse  to see which one is of interest to them.
2.  User 2 the student can choose a preferred site type by using the radio buttons and following the link found in the info window appearing on mouse hover they can get to the site specific webpage of the UNESCO World Heritage Centre's website where they can get detailed information including history and significance.
3.  User 3 the person planning the short trip can focus the map on their own country and see what's nearby and what points of interests are also available in their area.
### Defensive testing

## Deployment
I built the html of the website and did the styling using CSS on Repl.it then created the repository on GitHub where I commited important development stages and stages of any progress.
My website is currently deployed on Github Pages - https://kittikovacs.github.io/milestone1/ directly from the master branch.

## Credits
Content
UNESCO kindly gave their permission to use their XML data available on their website.

## Media
Image sources: [Pexels] https://www.pexels.com/

Icons by Icons8 

Map by Google Maps

## Acknowledgements
Many thanks for the permission to UNESCO to use their name, logo and data.

My mentor Guido Cecilio Garcia Bernal had great suggestions and helped me manage the database.

Also a big thank you for the tutors at Code Institute especially Miklos and Johann.
