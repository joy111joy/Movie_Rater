const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


const apiRouter = require('./routes/api');
const uiRouter = require('./routes/ui');




app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api', apiRouter);
app.use('/', uiRouter);

app.use(express.json());










app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    });