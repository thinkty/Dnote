![Darc Logo][Logo]

# Darc

Darc is a web application for archiving your notes and references related to debugging. The ideal usage is to use Darc side by side as users learn a new language or work on a new type of project. I am currently developing on Darc and am open to any ideas on features and also feedbacks on my code.  
Darc is now being hosted on [Heroku]! It has the bare minimum, but it is something!  
Below is the main page of Darc. As you can see, I am trying to make it mobile friendly as well.  
![Darc_MainPage][MainPage]

## Core Features! (WIP)

  - Basic authentication (✔️) / registration (✔️) / profile management (🚧)
  - Create (✔️) / remove (🚧) / edit notes (🚧)
  - Search (🚧) / filter notes (⛔)
  - Export notes (⛔)
  - Encrypt everything (⛔)

## New Feature Plans

  - Add tags to the note (ex: name of the project, etc.)
  - Share your notes in read-only mode using a unique URL
  - Search not only for notes, but also on [Stackoverflow]
    - When the post that you have searched through Darc on [Stackoverflow] is interesting, 
      you can mark it as good and quickly make a note about it
  - Make the web application a Progressive Web Application
  - Link to [Github] to indicate which repo the note is related to

## Tech

Darc uses the following tools and frameworks :

* [ReactJS] - HTML enhanced for web apps!
* [Material-UI] - React UI framework
* [node.js], [Express], [Mongoose] - quick and easy backend server
* [MongoDB] - general purpose, document-based, distributed database

## Installation

Currently, Darc does not need any installation. However, I plan to make it into a PWA so that the app can be easily accessible on variable platforms.


License
----

GNU General Public License v3.0

Reference
----

This README was written with reference to the template in [Dillinger] : an online markdown editor

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
    
   [MainPage]: <https://imgur.com/5DAjneI.png>
   [Logo]: <https://i.imgur.com/nwSfy2D.png>
   [Heroku]: <https://thinkty-darc.herokuapp.com/>
   [Stackoverflow]: <https://api.stackexchange.com/docs/search>
   [ReactJS]: <https://reactjs.org/>
   [Material-UI]: <https://material-ui.com/>
   [node.js]: <https://nodejs.org/en/>
   [Express]: <https://expressjs.com/>
   [Mongoose]: <https://mongoosejs.com/>
   [MongoDB]: <https://www.mongodb.com/>
   [Dillinger]: <https://dillinger.io/>
   [Github]: <https://github.com/>
