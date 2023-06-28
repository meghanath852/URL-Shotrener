# URL Shortener 
Following features have been added
1) Frontend (index.ejs): index.ejs is an HTML file that serves as the homepage for a web application. It includes a Bootstrap stylesheet and custom CSS styles. The page has a header with a title and a navigation bar. The main content of the page is a centered heading with a gradient background and transparent text. Below the heading, there is a form for submitting a URL to be shortened. The form includes an input field and a submit button. The page also includes a script tag that loads a JavaScript file for handling form submission. Overall, index.ejs provides a simple and visually appealing interface for users to submit URLs to be shortened.

2) server.js is a Node.js file that defines the server-side logic for a web application. It uses the Express framework to handle HTTP requests and responses. The file defines routes for handling GET and POST requests to the server. The GET route renders the homepage using an EJS template. The POST route handles form submissions for creating shortened URLs. It checks if a note already exists for the URL and displays an error message if it does. If a note does not exist, it creates a new shortened URL and redirects the user to the homepage. Overall, server.js provides the backend functionality for creating and managing shortened URLs in the web application.

3) Mandatory tasks done: Shotrening and searching
   Optional tasks done: UI and Hosting (using Render)

4) Hosted at: https://url-shortener-k64f.onrender.com/

5) INSTALLATION: 1.if you want to run project locally on computer , change the code in server.js filemongoose.connect('####')

Change the url in above code. And type code “npm run devStart” in terminal. Install "dependencies": { "ejs": "^3.1.9", "express": "^4.18.2", "mongodb": "^5.6.0", "mongoose": "^7.3.0", "shortid": "^2.2.16" }, "devDependencies": { "nodemon": "^2.0.22" }
