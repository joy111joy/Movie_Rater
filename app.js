//Importing the required modules
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

//Creating an instance of express and setting the port
const app = express();
const port = 3000;

//Setting up the middleware and view engine 
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//Setting up the static folder
app.use(express.static(path.join(__dirname, 'public')));

//Setting up the routes
const apiRouter = require('./routes/api');
const uiRouter = require('./routes/ui');

//Middleware to log the request method and URL used for testing and debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api', apiRouter);
app.use('/', uiRouter);
app.use(express.json());

//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    });