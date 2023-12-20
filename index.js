const express = require('express');
const hbs = require('express-handlebars');
const { clientRouter } = require('./routers/client');
const { homeRouter } = require('./routers/home');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));
app.use(express.json());
app.engine(
  '.hbs',
  hbs.engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
  }),
);
app.set('view engine', '.hbs');

app.use('/client', clientRouter);

app.use('/', homeRouter);

app.listen(3000, 'localhost', () => {
  console.log('LISTENING ON PORT 3000');
});
