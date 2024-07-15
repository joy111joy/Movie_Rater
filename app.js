const express = require('express');
const methodOverride = require('method-override');
const { getAllMovies, createMovie, deleteMovie } = require('./dal/data');
const app = express();
const port = 3000;


const apiRouter = require('./routes/api');
const uiRouter = require('./routes/ui');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api', apiRouter);
app.use('/', uiRouter);

app.use(express.json());





app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const movies = await getAllMovies();
    res.render('index', { movies });
});

app.get('/new', (req, res) => {
    res.render('new');
  });


app.post('/movies', async (req, res) => {
    const { title, description, genre, rating } = req.body;
    await createMovie(title, description, genre, rating);
    res.redirect('/');
});

app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    await deleteMovie(id);
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    });