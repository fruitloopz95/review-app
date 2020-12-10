How to use

-When the app is started you will be directed to a login page .If you do not have a user account you can click on sign up and 
 will be prompted to enter and username and password. On successful creation you will be redirected to the login screen.
-Once you have logged in you will be directed to the home page where the latest reviews will be rendered.
-On the home page you will have the following options :
 * to search reviews
 * add review
 * view your reviews
-To search , enter a keyword in the searchbar and click search.If the keyword if blank it will return all reviews.
-To add review click the button at the bottom right of the screen and you will be redirected to the 'add review' page.
 There you will be prompted to fill in all the fields and submit and will then be redirected to the home page.
-To view your reviews click the 'my reviews' button on the top right of the screen.
 You will be redirected to a new page that will display all your reviews.
-On the 'my reviews' page you will be able to do the following :
 * search reviews
 * edit reviews
 * delete reviews
-To search , enter a keyword in the searchbar and click search.If the keyword if blank it will return all reviews.
-To edit , click the edit button on the review and you will be redirected to an edit screen. To save changes to the review 
 click 'update review' and will then be redirected to the my reviews page.
-To delete ,click on the delete button on the review.

Admin Access
-Once logged in , to gain access to all records click the admin button on the top right of the screen.
-To search , enter a keyword in the searchbar , select whether you want to view all reviews or users 
 and click search.If the keyword if blank it will return all records based on the selection you have specified.
-To edit , click the edit button on the review and you will be redirected to an edit screen. To save changes to the review 
 click 'update review' and will then be redirected to the admin page.
-To update users , click edit on the user you want to update .You will be redircted to an update screen.There you will be able 
 to update the users admin access.On update you will be redirected to the admin page.

Installation
-Open cmd and navigate to the projects directory .Run npm install in both the root directory of the project and in the reviews_app directory.
-To run the server open cmd in the root dir of the project and run command npm start.
-To start app open cmd in the reviews_app dir and rum npm start.


Preface

-version 1
-This document is create for all shareholders

Introduction

-The purpose of this application is to allow users to post views on multiple forms of entertainment on one platform.
 The application will allow users to create reviews for movies , series and anime. Users will also be able to update and delete their
 own reviews.
-This application will make use of Mongodb as a database to store information.


System requirements definition

*Functional requirements
 -User needs to be able to create , update and delete records.
 -Users must be able to login and logout.
 -Allow for admin users to monitor and make changes to the application.

*Non functional requirements
 -Data validation on all inputs to avoid conflicts/errors with database as well as to produce clean ,accurate data.
 -Handle and display user friendly errors to users.
 -Authenticate users when attempting to login.
 -Allow for asyncronous transactions to prevent delayed/hanging screens.

System architecture
 
-The MERN stack will be used  to develope the application as both client and server side code is built using javascript.
-The application will be hosted on heroku as it supports both frontend and backend parts of the application.
-The application will be built on the create react framework as it is quicker and easier for developers to work with
 also making it easier to maintain.
-Custom style classes will be used and bootstraps will be applied where necessary.
-The application will consist of 5 components namely : 
 * Login page 
 * home page 
 * reviews page 
 * add review page
 * my reviews page

-The reviews page will be used/reused to display reviews for all three categories by receiving props from the parent component(home page).

**Functions on each page
* Login page
 -Function to make callout to validate user and get JWT.
 -Function to create user in db and get JWT.

* Home page
 -function to get the last 3 reviews added and display on home page on load.
 -Reuseable functions/buttons to logout and to add reviews.

* reviews page
 -a search function that will make a callout to get all relevant reviews based on keyword entered. 
  If no keyword entered the function will return all reviews and ordered by rating.
 -Reuseable functions/buttons to logout and to add reviews.

* add reviews page
 -function to validate review and then add to database.

* my reviews page
 -function to return all reviews created by the logged in user on page load.
 -function to allow user search all reviews absed on keyword entered.
  If no keyword entered the function will return all reviews and ordered by rating.
 -Function to allow users to edit and delete reviews.

