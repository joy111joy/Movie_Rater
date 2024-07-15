const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const apiRouter = require('./routes/api');
const uiRouter = require('./routes/ui');

app.use('/api', apiRouter);
app.use('/', uiRouter);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    });