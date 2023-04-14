============================================GROUP INFO=====================================================
http://webtech.science.uu.nl/group22/
Group 22
Authors:
Ruben de Groot: 4399307
Thijs Kanters: 2775131
=========================================SQL Tables====================================================

CREATE TABLE Movies (movieid INT UNIQUE, title TEXT NOT NULL UNIQUE, desc TEXT, image TEXT, trailer TEXT, trailerID TEXT, PRIMARY KEY(movieid))

CREATE TABLE Schedule (scheduleid INT, date TEXT, weekday TEXT, time TEXT, movieid INT, PRIMARY KEY(scheduleid), FOREIGN KEY(movieid) REFERENCES Movies(movieid))

CREATE TABLE Users (userid INT UNIQUE, fullname TEXT, username TEXT, password TEXT, email TEXT, street TEXT, streetno INT, creditcard INT, PRIMARY KEY(userid))

CREATE TABLE Orders (orderid INT UNIQUE, schedule INT, user INT, date TEXT, nroftickets INT, PRIMARY KEY(orderid), FOREIGN KEY(schedule) REFERENCES Schedule(scheduleid), FOREIGN KEY(user) REFERENCES User(userid))

=========================================LOGIN INFO=======================================================

======================================SITE EXPLANATION====================================================
Brief explanation: 
Our website is called Popcorn Cinema, at the home page you can 

Structure of application:
- The database folder contains all code that is related to making and filling the database
	-databaseManager.js has 2 lines that are commented, but you can uncomment these to regenerate the database.
	-dbfill.js fill the database
- node_modules contains all node modules, there is no code of our own in this file
- public folder contains the static files
	- images contain all the images we use for the cinema website(not the old spongebob site)
	- javascripts contains all of our javascrips files we use for DOM-generating and some other javascripts
	  like functions.js which is a small library we've made to make our lives easier.
    - spongebobwebsite is the website we have build for HW1 and HW2, you can access this website by clicking Spongebob Movies in the footer
    - stylesheets contains all of our css for the cinema website
- routes
    - databaserouter contains all the routes related to getting stuff from the database and putting/updating stuff into the database
    - descriptionrouter is the router for getting all the different description pages
    - indexrouter is the router for the index page and the order page
    - usersrouter is the router for all user related pages, like profile, signin and signup etc.
- views
    contains all of our pug files
- app.js
    main file for creating the server and connecting all the routes from the routes folder together this also includes the logger and the error handler

Structure of Database:
- Movies table includes all information about the 20 movies we have in our application: movie name, description, poster, trailer link and a trailer id,
  we needed a trailer id as well, because we needed it for looping the trailer in the description page(mandatory for youtube API).
- Schedule table includes all information about the schedule of the movies. As we did not want to make our own schedule we generate it randomly. 
  At the moment it has schedule data for the coming 2 weeks for 4 movies a day. 
  You can regenarate the database with databasemanager.js to refill it again for the coming 2 weeks.
- Users table contains all information from the users, like their name, street and creditcard info.
- Order table contains all information for our orders. Whenever you place an order it gets added to this table.















